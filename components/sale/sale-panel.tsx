"use client";

import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import { SALE, SALE_LIVE, TOKEN_SYMBOL } from "@/lib/sale/config";
import { cn } from "@/lib/utils";
import { WalletReadyState } from "@solana/wallet-adapter-base";
import { useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

/**
 * Wallet connection and, once the sale is live, the purchase flow.
 *
 * Today `SALE_LIVE` is false, so connecting works and the purchase control is
 * disabled with the reason stated. When the program is deployed and the
 * config filled in, the same component drives the real transaction.
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
  const [picking, setPicking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const installed = wallets.filter(
    (wallet) => wallet.readyState === WalletReadyState.Installed,
  );

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
          a program id, price and opening time exist in the config. */}
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
            className="h-11 w-full rounded-sm border border-line bg-bg px-3 font-mono text-sm text-ink placeholder:text-faint focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)] disabled:cursor-not-allowed"
          />
          <span className="font-mono text-sm text-muted">
            {SALE.acceptedMints[0]?.symbol ?? "—"}
          </span>
        </div>

        <div className="mt-4 flex items-baseline justify-between">
          <span className="stat-label text-faint">{sale.youReceive}</span>
          <span className="font-mono text-sm text-ink">— {TOKEN_SYMBOL}</span>
        </div>

        <Button className="mt-5 w-full" disabled={!SALE_LIVE || !connected}>
          {SALE_LIVE ? sale.purchase : sale.purchaseDisabled}
        </Button>
      </div>

      {error && (
        <p className="mt-4 text-body-sm text-copper">
          {sale.txFailed}: {error}
        </p>
      )}
    </div>
  );
}
