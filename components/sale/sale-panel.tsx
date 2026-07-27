"use client";

import { TokenLogo } from "@/components/sale/token-logo";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import { SALE, SALE_LIVE, TOKEN_SYMBOL } from "@/lib/sale/config";
import {
  type SaleSnapshot,
  buildAndSignVersionedTx,
  buildClaimIx,
  buildContributeUsdcIx,
  buildContributeWithSwapPlan,
  fetchSaleSnapshot,
  fetchTokenBalance,
  getProgram,
  swapEligibleAssets,
} from "@/lib/sale/presale-client";
import { cn } from "@/lib/utils";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

/**
 * Fixed to the asset's precision, then stripped of trailing zeros — a whole
 * amount should read "500", not "500.000000". Never scientific notation, since
 * the string goes straight into the amount field.
 */
function trimZeros(value: number, decimals: number): string {
  const fixed = value.toFixed(Math.min(decimals, 6));
  return fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : fixed;
}

const USDC_SYMBOL = "USDC";
const DEFAULT_SLIPPAGE_BPS = 100; // 1% — matches OFS-4100 §3's proposed default
const QUICK_FRACTIONS = [0.25, 0.5, 0.75, 1];

type Asset = { symbol: string; mint: string | null; decimals: number };

type TxState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; signature: string }
  | { status: "error"; message: string };

/**
 * Wallet connection (with a sign-in verification step), asset selection with
 * balance + quick amounts, and the purchase + claim flow.
 *
 * The presale program is deployed and initialized on devnet (Phase 3) — see
 * `lib/sale/config.ts` — so every code path below is live and real.
 */
export function SalePanel({ sale }: { sale: Dictionary["sale"] }) {
  const {
    wallet,
    connect,
    disconnect,
    connected,
    connecting,
    publicKey,
    signMessage,
  } = useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const [pendingConnect, setPendingConnect] = useState(false);
  const [assetPicking, setAssetPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [assetIndex, setAssetIndex] = useState(0);
  const [tx, setTx] = useState<TxState>({ status: "idle" });
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [snapshot, setSnapshot] = useState<SaleSnapshot | null>(null);

  // The enforced terms, read once. Until this lands (or if it fails) the
  // configured figures stand in — see `fetchSaleSnapshot`.
  useEffect(() => {
    let cancelled = false;
    fetchSaleSnapshot(connection).then((value) => {
      if (!cancelled) setSnapshot(value);
    });
    return () => {
      cancelled = true;
    };
  }, [connection]);

  const minContribution =
    snapshot?.minContributionUsdc ?? SALE.minContributionUsdc;
  const maxContribution =
    snapshot?.maxContributionUsdc ?? SALE.maxContributionUsdc;

  // Index 0 is always direct USDC (no swap); the rest come from
  // swapEligibleAssets() (SOL + the stablecoin whitelist, via Jupiter CPI).
  const assetOptions: Asset[] = useMemo(
    () => [
      { symbol: USDC_SYMBOL, mint: SALE.usdcMint, decimals: 6 },
      ...swapEligibleAssets(),
    ],
    [],
  );
  const selectedAsset = assetOptions[assetIndex];

  // Reset per-wallet state on disconnect, and refetch balance whenever the
  // connected wallet or selected asset changes.
  useEffect(() => {
    if (!connected) {
      setVerified(false);
      setBalance(null);
      return;
    }
    if (!publicKey || !selectedAsset.mint) {
      setBalance(null);
      return;
    }
    let cancelled = false;
    fetchTokenBalance(
      connection,
      selectedAsset.mint,
      selectedAsset.decimals,
      publicKey,
    ).then((value) => {
      if (!cancelled) setBalance(value);
    });
    return () => {
      cancelled = true;
    };
  }, [connected, publicKey, selectedAsset, connection]);

  /*
   * The standard modal only *selects* a wallet — it deliberately leaves
   * connecting to the app — and `autoConnect` is off so a remembered wallet
   * never reconnects on page load. So connect here, once a wallet is selected.
   *
   * `pendingConnect` scopes that to a click on Connect. Without it, the effect
   * would fire on the still-selected wallet the moment someone disconnects,
   * making Disconnect impossible.
   */
  function openWalletModal() {
    setError(null);
    setPendingConnect(true);
    // A wallet chosen on an earlier visit is still selected; asking again would
    // be a pointless second click.
    if (!wallet) setVisible(true);
  }

  useEffect(() => {
    if (!pendingConnect || !wallet || connected || connecting) return;
    setPendingConnect(false);
    connect().catch((cause) => {
      setError(cause instanceof Error ? cause.message : String(cause));
    });
  }, [pendingConnect, wallet, connected, connecting, connect]);

  async function verify() {
    if (!publicKey) return;
    if (!signMessage) {
      // No signMessage support (e.g. some hardware-wallet adapters) — the
      // purchase transaction's own signature proves ownership regardless.
      setVerified(true);
      return;
    }
    setVerifying(true);
    setError(null);
    try {
      const message = `Sign in to the OpenFiat presale\n\nWallet: ${publicKey.toBase58()}\nIssued: ${new Date().toISOString()}\n\nThis request will not trigger a transaction or cost any fees.`;
      await signMessage(new TextEncoder().encode(message));
      setVerified(true);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    } finally {
      setVerifying(false);
    }
  }

  /*
   * The fractions are of the most that can actually be contributed, which is
   * the balance or the per-wallet cap, whichever is lower — so "Max" on a
   * 1,000 USDC balance under a 500 cap fills 500, not 1,000. The cap is stated
   * next to the field (see `limitNote` below) so that isn't a surprise.
   */
  function applyQuickFraction(fraction: number) {
    if (balance === null) return;
    const cap =
      selectedAsset.symbol === USDC_SYMBOL && maxContribution
        ? Math.min(balance, maxContribution)
        : balance;
    const value = cap * fraction;
    setAmount(value > 0 ? trimZeros(value, selectedAsset.decimals) : "");
  }

  async function purchase() {
    if (!publicKey || !anchorWallet || !SALE.programId) return;
    const amountNum = Number(amount);
    if (!Number.isFinite(amountNum) || amountNum <= 0) {
      setTx({ status: "error", message: "Enter a valid amount." });
      return;
    }
    setTx({ status: "pending" });
    try {
      const program = getProgram(connection, anchorWallet);
      let signed: VersionedTransaction;

      if (assetIndex === 0) {
        // Direct USDC — no swap, no external API call.
        const ix = await buildContributeUsdcIx(program, publicKey, amountNum);
        const { blockhash } = await connection.getLatestBlockhash("confirmed");
        const message = new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: blockhash,
          instructions: [ix],
        }).compileToV0Message([]);
        signed = await anchorWallet.signTransaction(
          new VersionedTransaction(message),
        );
      } else {
        // SOL or a whitelisted stablecoin, converted via Jupiter CPI. Only
        // index 0 (direct USDC) can have a null mint, and that's handled in
        // the branch above, but the array's element type is shared — assert
        // it here with a clear message rather than a bare `!`.
        if (!selectedAsset.mint) {
          throw new Error("No mint configured for the selected asset.");
        }
        const decimals = selectedAsset.decimals;
        const amountBaseUnits = BigInt(Math.round(amountNum * 10 ** decimals));
        const plan = await buildContributeWithSwapPlan(
          connection,
          program,
          publicKey,
          selectedAsset.mint,
          amountBaseUnits,
          DEFAULT_SLIPPAGE_BPS,
        );
        signed = await buildAndSignVersionedTx(
          connection,
          publicKey,
          plan.instructions,
          plan.lookupTables,
          anchorWallet.signTransaction,
        );
      }

      const signature = await connection.sendTransaction(signed);
      await connection.confirmTransaction(signature, "confirmed");
      setTx({ status: "success", signature });
      if (selectedAsset.mint) {
        fetchTokenBalance(
          connection,
          selectedAsset.mint,
          selectedAsset.decimals,
          publicKey,
        ).then(setBalance);
      }
    } catch (cause) {
      setTx({
        status: "error",
        message: cause instanceof Error ? cause.message : String(cause),
      });
    }
  }

  async function claim() {
    if (!publicKey || !anchorWallet) return;
    setTx({ status: "pending" });
    try {
      const program = getProgram(connection, anchorWallet);
      const ix = await buildClaimIx(program, publicKey);
      const { blockhash } = await connection.getLatestBlockhash("confirmed");
      const message = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions: [ix],
      }).compileToV0Message([]);
      const signed = await anchorWallet.signTransaction(
        new VersionedTransaction(message),
      );
      const signature = await connection.sendTransaction(signed);
      await connection.confirmTransaction(signature, "confirmed");
      setTx({ status: "success", signature });
    } catch (cause) {
      setTx({
        status: "error",
        message: cause instanceof Error ? cause.message : String(cause),
      });
    }
  }

  const canPurchase = SALE_LIVE && connected && verified;

  // Both bounds are set together at `initialize_sale`, so either one being
  // absent means the terms aren't configured and there is nothing to state.
  const contributionLimit =
    minContribution !== null && maxContribution !== null
      ? sale.limitNote
          .replace("{min}", minContribution.toLocaleString())
          .replace("{max}", maxContribution.toLocaleString())
      : null;

  return (
    <div className="rounded-card border border-line bg-surface p-6">
      {!SALE_LIVE && (
        <div className="mb-6 rounded-sm border border-copper/40 bg-surface-alt p-4">
          <p className="text-sm font-semibold text-ink">{sale.notLiveTitle}</p>
          <p className="mt-1 text-body-sm text-body">{sale.notLiveBody}</p>
        </div>
      )}

      {connected && publicKey ? (
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="stat-label text-faint">{sale.connected}</p>
              <p className="mt-1 font-mono text-sm text-ink">
                {truncate(publicKey.toBase58())}
              </p>
            </div>
            <Button
              variant="secondary"
              onClick={() => {
                setPendingConnect(false);
                void disconnect();
              }}
            >
              {sale.disconnect}
            </Button>
          </div>

          {!verified && (
            <div className="mt-4 rounded-sm border border-line bg-surface-alt p-4">
              <p className="text-body-sm text-body">
                {signMessage ? sale.verifyNote : sale.verifyUnsupported}
              </p>
              <Button
                className="mt-3 w-full"
                disabled={verifying}
                onClick={() => void verify()}
              >
                {verifying ? sale.verifying : sale.verifyWallet}
              </Button>
            </div>
          )}
          {verified && (
            <p className="mt-3 text-body-sm text-body">✓ {sale.verified}</p>
          )}
        </div>
      ) : (
        <Button onClick={openWalletModal} disabled={connecting}>
          {connecting ? sale.confirming : sale.connectWallet}
        </Button>
      )}

      {/* Purchase controls. Present so the flow is reviewable, disabled until
          a program id, sale nonce and opening time exist in the config. */}
      <div
        className={cn(
          "mt-6 border-t border-line pt-6",
          !SALE_LIVE && "opacity-60",
        )}
      >
        <div className="flex items-baseline justify-between">
          <label htmlFor="sale-amount" className="stat-label text-faint">
            {sale.amount}
          </label>
          {connected && balance !== null && (
            <span className="font-mono text-body-sm text-muted">
              {sale.balance}:{" "}
              {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
              {selectedAsset.symbol}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-3">
          <input
            id="sale-amount"
            type="text"
            inputMode="decimal"
            disabled={!SALE_LIVE}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="h-11 w-full rounded-sm border border-line bg-bg px-3 font-mono text-sm text-ink placeholder:text-faint focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)] disabled:cursor-not-allowed"
          />

          <div className="relative">
            <button
              type="button"
              disabled={!SALE_LIVE}
              onClick={() => setAssetPicking((v) => !v)}
              className="flex h-11 items-center gap-2 rounded-sm border border-line bg-bg px-3 font-mono text-sm text-ink disabled:cursor-not-allowed"
            >
              <TokenLogo symbol={selectedAsset.symbol} />
              {selectedAsset.symbol}
              <span aria-hidden className="text-faint">
                ▾
              </span>
            </button>
            {assetPicking && (
              <ul className="absolute right-0 z-10 mt-1 w-40 space-y-1 rounded-sm border border-line bg-surface p-1 shadow-lg">
                {assetOptions.map((asset, i) => (
                  <li key={asset.symbol}>
                    <button
                      type="button"
                      onClick={() => {
                        setAssetIndex(i);
                        setAssetPicking(false);
                        setAmount("");
                      }}
                      className="flex w-full items-center gap-2 rounded-sm px-2 py-2 text-start text-sm text-ink hover:bg-surface-alt"
                    >
                      <TokenLogo symbol={asset.symbol} />
                      {asset.symbol}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {connected && balance !== null && balance > 0 && (
          <div className="mt-2 flex gap-2">
            {QUICK_FRACTIONS.map((fraction) => (
              <button
                key={fraction}
                type="button"
                disabled={!SALE_LIVE}
                onClick={() => applyQuickFraction(fraction)}
                className="rounded-sm border border-line px-2 py-1 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-ink disabled:cursor-not-allowed"
              >
                {fraction === 1 ? sale.max : `${fraction * 100}%`}
              </button>
            ))}
          </div>
        )}

        {/* Why "Max" can be less than the balance. The cap is denominated in
            USDC and enforced on chain, so it applies to a SOL contribution
            just as much — hence no per-asset condition here. */}
        {contributionLimit && (
          <p className="mt-3 text-body-sm text-muted">{contributionLimit}</p>
        )}

        {assetIndex !== 0 && (
          <p className="mt-2 text-body-sm text-muted">{sale.swapNotice}</p>
        )}

        <div className="mt-4 flex items-baseline justify-between">
          <span className="stat-label text-faint">{sale.youReceive}</span>
          <span className="font-mono text-sm text-ink">— {TOKEN_SYMBOL}</span>
        </div>

        <Button
          className="mt-5 w-full"
          disabled={!canPurchase || tx.status === "pending"}
          onClick={() => void purchase()}
        >
          {tx.status === "pending"
            ? sale.confirming
            : SALE_LIVE
              ? sale.purchase
              : sale.purchaseDisabled}
        </Button>

        {SALE_LIVE && connected && verified && (
          <Button
            variant="secondary"
            className="mt-3 w-full"
            disabled={tx.status === "pending"}
            onClick={() => void claim()}
          >
            {sale.claim}
          </Button>
        )}
      </div>

      {tx.status === "success" && (
        <p className="mt-4 text-body-sm text-body">
          {sale.txSuccess}: {truncate(tx.signature)}
        </p>
      )}
      {(error || tx.status === "error") && (
        <p className="mt-4 text-body-sm text-copper">
          {sale.txFailed}: {error ?? (tx.status === "error" ? tx.message : "")}
        </p>
      )}
    </div>
  );
}
