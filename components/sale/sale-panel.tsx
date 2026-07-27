"use client";

import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import { SALE, SALE_LIVE, TOKEN_SYMBOL } from "@/lib/sale/config";
import {
  buildAndSignVersionedTx,
  buildClaimIx,
  buildContributeUsdcIx,
  buildContributeWithSwapPlan,
  getProgram,
  swapEligibleAssets,
} from "@/lib/sale/presale-client";
import { cn } from "@/lib/utils";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { useMemo, useState } from "react";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

const USDC_SYMBOL = "USDC";
const DEFAULT_SLIPPAGE_BPS = 100; // 1% — matches OFS-4100 §3's proposed default

type TxState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; signature: string }
  | { status: "error"; message: string };

/**
 * Wallet connection and, once the sale is live, the purchase + claim flow.
 *
 * Today `SALE_LIVE` is false (the presale program is built and tested — see
 * OFS-4200 §3 / Phase 3 — but not yet deployed to devnet, pending a faucet
 * rate limit), so connecting works and the purchase control is disabled with
 * the reason stated. Every code path below is real and will start working
 * the moment `lib/sale/config.ts` is filled in — no further code change.
 */
export function SalePanel({ sale }: { sale: Dictionary["sale"] }) {
  const {
    wallets,
    select,
    connect,
    disconnect,
    connected,
    connecting,
    publicKey,
  } = useWallet();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [amount, setAmount] = useState("");
  const [assetIndex, setAssetIndex] = useState(0);
  const [tx, setTx] = useState<TxState>({ status: "idle" });

  const installed = wallets.filter(
    (wallet) => wallet.readyState === WalletReadyState.Installed,
  );

  // Index 0 is always direct USDC (no swap); the rest come from
  // swapEligibleAssets() (SOL + the stablecoin whitelist, via Jupiter CPI).
  const assetOptions = useMemo(
    () => [
      { symbol: USDC_SYMBOL, mint: SALE.usdcMint, decimals: 6 },
      ...swapEligibleAssets(),
    ],
    [],
  );
  const selectedAsset = assetOptions[assetIndex];

  async function choose(name: string) {
    setError(null);
    try {
      // select() only sets the adapter; connect() opens the wallet.
      select(name as Parameters<typeof select>[0]);
      setPicking(false);
      await connect();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause));
    }
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

  return (
    <div className="rounded-card border border-line bg-surface p-6">
      {!SALE_LIVE && (
        <div className="mb-6 rounded-sm border border-copper/40 bg-surface-alt p-4">
          <p className="text-sm font-semibold text-ink">{sale.notLiveTitle}</p>
          <p className="mt-1 text-body-sm text-body">{sale.notLiveBody}</p>
        </div>
      )}

      {connected && publicKey ? (
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="stat-label text-faint">{sale.connected}</p>
            <p className="mt-1 font-mono text-sm text-ink">
              {truncate(publicKey.toBase58())}
            </p>
          </div>
          <Button variant="secondary" onClick={() => void disconnect()}>
            {sale.disconnect}
          </Button>
        </div>
      ) : (
        <div>
          <Button
            onClick={() => setPicking((value) => !value)}
            disabled={connecting}
          >
            {connecting ? sale.confirming : sale.connectWallet}
          </Button>

          {picking && (
            <ul className="mt-4 space-y-2">
              {installed.length === 0 && (
                <li className="text-body-sm text-muted">
                  No Solana wallet was detected in this browser.
                </li>
              )}
              {installed.map((wallet) => (
                <li key={wallet.adapter.name}>
                  <button
                    type="button"
                    onClick={() => void choose(wallet.adapter.name)}
                    className="flex w-full items-center gap-3 rounded-sm border border-line bg-surface-alt px-4 py-3 text-start transition-colors hover:border-line-strong"
                  >
                    {wallet.adapter.icon && (
                      // Wallet icons are data URIs supplied by the extension.
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={wallet.adapter.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="h-5 w-5"
                      />
                    )}
                    <span className="text-sm font-medium text-ink">
                      {wallet.adapter.name}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}

      {/* Purchase controls. Present so the flow is reviewable, disabled until
          a program id, sale nonce and opening time exist in the config. */}
      <div
        className={cn(
          "mt-6 border-t border-line pt-6",
          !SALE_LIVE && "opacity-60",
        )}
      >
        <label htmlFor="sale-amount" className="stat-label block text-faint">
          {sale.amount}
        </label>
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
          <select
            disabled={!SALE_LIVE}
            value={assetIndex}
            onChange={(e) => setAssetIndex(Number(e.target.value))}
            className="h-11 rounded-sm border border-line bg-bg px-2 font-mono text-sm text-ink disabled:cursor-not-allowed"
          >
            {assetOptions.map((asset, i) => (
              <option key={asset.symbol} value={i}>
                {asset.symbol}
              </option>
            ))}
          </select>
        </div>
        {assetIndex !== 0 && (
          <p className="mt-2 text-body-sm text-muted">{sale.swapNotice}</p>
        )}

        <div className="mt-4 flex items-baseline justify-between">
          <span className="stat-label text-faint">{sale.youReceive}</span>
          <span className="font-mono text-sm text-ink">— {TOKEN_SYMBOL}</span>
        </div>

        <Button
          className="mt-5 w-full"
          disabled={!SALE_LIVE || !connected || tx.status === "pending"}
          onClick={() => void purchase()}
        >
          {tx.status === "pending"
            ? sale.confirming
            : SALE_LIVE
              ? sale.purchase
              : sale.purchaseDisabled}
        </Button>

        {SALE_LIVE && connected && (
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
