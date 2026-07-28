"use client";

import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import { TokenLogo } from "@/components/sale/token-logo";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import { SALE, SALE_LIVE, solscanTxUrl, TOKEN_SYMBOL } from "@/lib/sale/config";
import {
  buildAndSignVersionedTx,
  buildClaimIx,
  buildContributeUsdcIx,
  buildContributeWithSwapPlan,
  estimateUsdcOut,
  fetchSaleSnapshot,
  fetchTokenBalance,
  getProgram,
  openFor,
  type SaleSnapshot,
  swapEligibleAssets,
} from "@/lib/sale/presale-client";
import { cn } from "@/lib/utils";

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

/**
 * Grouped, at most two decimals. The entitlement is 1:1 with USDC so whole
 * contributions give whole OPEN, and a long fractional tail would only be
 * noise in what is meant to be the panel's headline number.
 */
function formatOpen(value: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
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
  const [quotedUsdc, setQuotedUsdc] = useState<number | null>(null);
  const [quoting, setQuoting] = useState(false);

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

  /*
   * OPEN the entered amount buys.
   *
   * Direct USDC is exact — the program's `open_entitlement_for` is a 1:1 scale
   * by decimals and nothing else, so no quote is needed or possible to get
   * wrong. Everything else swaps to USDC first, so the figure is whatever
   * Jupiter says that swap realizes, and is shown as an estimate.
   */
  const amountNumber = Number(amount);
  const validAmount = Number.isFinite(amountNumber) && amountNumber > 0;

  useEffect(() => {
    if (assetIndex === 0 || !selectedAsset.mint || !validAmount) {
      setQuotedUsdc(null);
      return;
    }
    const base = BigInt(
      Math.round(amountNumber * 10 ** selectedAsset.decimals),
    );
    let cancelled = false;
    setQuoting(true);
    // Debounced: a quote per keystroke would hammer Jupiter and the last one
    // to land, not the last one asked for, could win.
    const timer = setTimeout(() => {
      estimateUsdcOut(
        selectedAsset.mint as string,
        base,
        DEFAULT_SLIPPAGE_BPS,
      ).then((value) => {
        if (cancelled) return;
        setQuotedUsdc(value);
        setQuoting(false);
      });
    }, 400);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [assetIndex, selectedAsset, amountNumber, validAmount]);

  const receiveOpen = !validAmount
    ? null
    : assetIndex === 0
      ? openFor(amountNumber)
      : quotedUsdc === null
        ? null
        : openFor(quotedUsdc);

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
        const ixs = await buildContributeUsdcIx(program, publicKey, amountNum);
        const { blockhash } = await connection.getLatestBlockhash("confirmed");
        const message = new TransactionMessage({
          payerKey: publicKey,
          recentBlockhash: blockhash,
          instructions: ixs,
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
      const ixs = await buildClaimIx(program, publicKey);
      const { blockhash } = await connection.getLatestBlockhash("confirmed");
      const message = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions: ixs,
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
    /*
     * Translucent over the hero canvas rather than opaque, so the animation
     * behind it stays visible and the panel reads as glass on top of the page
     * instead of a hole cut into it. The inset ring is a light top edge — one
     * hairline of lift, no drop-shadow stack.
     */
    <div className="rounded-card border border-line bg-surface/80 p-5 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-xl sm:p-7">
      {/*
       * One line: network, wallet, Disconnect. It carried four separate labels
       * before and ran out of room in this column, wrapping *inside* them — the
       * check mark on one line and "Verified" on the next, the address broken
       * across its own ellipsis. Wrapping the group as a whole fixed the break
       * but left the network badge stranded on a line of its own.
       *
       * So the verified state is a mark on the address rather than a fourth
       * label. It is what the tick means anyway — this address signed — and it
       * keeps its meaning for a screen reader through the visually hidden text.
       */}
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-faint">
          <span
            aria-hidden
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              connected ? "bg-teal" : "bg-line-strong",
            )}
          />
          {SALE.cluster}
        </span>

        {connected && publicKey && (
          <span className="inline-flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 whitespace-nowrap font-mono text-body-sm text-ink">
              {verified && (
                <span className="text-teal" title={sale.verified}>
                  <span aria-hidden>✓</span>
                  <span className="sr-only">{sale.verified}</span>
                </span>
              )}
              {truncate(publicKey.toBase58())}
            </span>
            <button
              type="button"
              onClick={() => {
                setPendingConnect(false);
                void disconnect();
              }}
              className="cursor-pointer whitespace-nowrap font-medium text-body-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
            >
              {sale.disconnect}
            </button>
          </span>
        )}
      </div>

      {!SALE_LIVE && (
        <div className="mt-6 border-s-2 border-copper ps-4">
          <p className="text-sm font-semibold text-ink">{sale.notLiveTitle}</p>
          <p className="mt-1 text-body-sm text-body">{sale.notLiveBody}</p>
        </div>
      )}

      {/* Pay. Input and asset picker share one surface so they read as a single
          control rather than two adjacent boxes. */}
      <div className={cn("mt-6", !SALE_LIVE && "opacity-60")}>
        <div className="flex items-baseline justify-between">
          <label htmlFor="sale-amount" className="stat-label text-faint">
            {sale.amount}
          </label>
          {connected && balance !== null && (
            <span className="tnum font-mono text-body-sm text-muted">
              {sale.balance}{" "}
              {balance.toLocaleString(undefined, { maximumFractionDigits: 4 })}{" "}
              {selectedAsset.symbol}
            </span>
          )}
        </div>

        {/*
         * A hairline row rather than an inset box. The box had its own 1rem of
         * inner padding, so the amount sat indented from the label above it and
         * from the OPEN figure below — the one number you are asked to read
         * against the one number you type was the only thing out of line. This
         * also matches the rest of the site, which separates with rules instead
         * of nesting surfaces.
         */}
        <div className="mt-1 flex items-center gap-3 border-b border-line pb-3 transition-colors focus-within:border-accent">
          <input
            id="sale-amount"
            type="text"
            inputMode="decimal"
            disabled={!SALE_LIVE}
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="tnum h-11 min-w-0 flex-1 bg-transparent font-mono text-2xl text-ink placeholder:text-faint focus-visible:outline-none disabled:cursor-not-allowed"
          />

          <div className="relative shrink-0">
            <button
              type="button"
              disabled={!SALE_LIVE}
              onClick={() => setAssetPicking((v) => !v)}
              aria-expanded={assetPicking}
              className="flex h-10 cursor-pointer items-center gap-2 rounded-pill border border-line bg-surface px-3 font-mono text-sm text-ink transition-colors hover:border-line-strong disabled:cursor-not-allowed"
            >
              <TokenLogo symbol={selectedAsset.symbol} />
              {selectedAsset.symbol}
              <span aria-hidden className="text-faint">
                ▾
              </span>
            </button>
            {assetPicking && (
              <ul className="absolute end-0 z-20 mt-2 w-44 space-y-1 rounded-sm border border-line bg-surface p-1.5 shadow-[0_20px_40px_-16px_rgba(0,0,0,0.8)]">
                {assetOptions.map((asset, i) => (
                  <li key={asset.symbol}>
                    <button
                      type="button"
                      onClick={() => {
                        setAssetIndex(i);
                        setAssetPicking(false);
                        setAmount("");
                      }}
                      className={cn(
                        "flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-2.5 py-2 text-start font-mono text-sm transition-colors hover:bg-surface-alt",
                        i === assetIndex ? "text-ink" : "text-body",
                      )}
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
          <div className="mt-2.5 flex gap-1.5">
            {QUICK_FRACTIONS.map((fraction) => (
              <button
                key={fraction}
                type="button"
                disabled={!SALE_LIVE}
                onClick={() => applyQuickFraction(fraction)}
                className="flex-1 cursor-pointer rounded-pill border border-line py-1.5 font-mono text-xs text-muted transition-colors hover:border-line-strong hover:text-ink disabled:cursor-not-allowed"
              >
                {fraction === 1 ? sale.max : `${fraction * 100}%`}
              </button>
            ))}
          </div>
        )}

        {/* Receive. The point of the whole panel, so it carries the weight. */}
        <div className="mt-6">
          <div className="flex items-baseline justify-between gap-4">
            <span className="stat-label text-faint">{sale.youReceive}</span>
            <span className="tnum font-mono text-body-sm text-muted">
              {sale.rateNote}
            </span>
          </div>
          <p className="mt-2 flex items-baseline gap-2">
            {/* Sans, not mono, to match the Raised/Target figures beside the
                panel — and because JetBrains Mono's dotted zero reads as a
                glyph error at this size. The editable field above stays mono,
                where fixed-width digits stop the number shifting as it's
                typed. */}
            <span
              className={cn(
                "tnum text-3xl font-extrabold tracking-[-0.01em]",
                receiveOpen === null ? "text-faint" : "text-ink",
              )}
            >
              {receiveOpen === null
                ? quoting
                  ? "…"
                  : "0"
                : formatOpen(receiveOpen)}
            </span>
            <span className="font-mono text-sm text-muted">{TOKEN_SYMBOL}</span>
            {assetIndex !== 0 && receiveOpen !== null && (
              <span className="text-body-sm text-faint">{sale.estimated}</span>
            )}
          </p>
        </div>

        {/* Why "Max" can be less than the balance. The cap is denominated in
            USDC and enforced on chain, so it applies to a SOL contribution
            just as much — hence no per-asset condition here. */}
        {contributionLimit && (
          <p className="mt-4 text-body-sm text-muted">{contributionLimit}</p>
        )}

        {assetIndex !== 0 && (
          <p className="mt-2 text-body-sm text-muted">{sale.swapNotice}</p>
        )}

        {connected && !verified ? (
          <div className="mt-6">
            <Button
              size="lg"
              className="w-full"
              disabled={verifying}
              onClick={() => void verify()}
            >
              {verifying ? sale.verifying : sale.verifyWallet}
            </Button>
            <p className="mt-3 text-body-sm text-muted">
              {signMessage ? sale.verifyNote : sale.verifyUnsupported}
            </p>
          </div>
        ) : connected ? (
          <Button
            size="lg"
            className="mt-6 w-full"
            disabled={!canPurchase || tx.status === "pending"}
            onClick={() => void purchase()}
          >
            {tx.status === "pending"
              ? sale.confirming
              : SALE_LIVE
                ? sale.purchase
                : sale.purchaseDisabled}
          </Button>
        ) : (
          <Button
            size="lg"
            className="mt-6 w-full"
            onClick={openWalletModal}
            disabled={connecting}
          >
            {connecting ? sale.confirming : sale.connectWallet}
          </Button>
        )}

        {SALE_LIVE && connected && verified && (
          <button
            type="button"
            disabled={tx.status === "pending"}
            onClick={() => void claim()}
            className="mt-4 w-full cursor-pointer text-center font-medium text-body-sm text-muted transition-colors hover:text-ink disabled:cursor-not-allowed"
          >
            {sale.claim}
          </button>
        )}
      </div>

      {tx.status === "success" && (
        <p className="mt-5 border-t border-line pt-5 text-body-sm text-body">
          {sale.txSuccess}{" "}
          <a
            href={solscanTxUrl(tx.signature)}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-accent-mid underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
          >
            {truncate(tx.signature)} ↗
          </a>
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
