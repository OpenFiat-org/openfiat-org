"use client";

import type { Dictionary } from "@/lib/i18n";
import { RAISE_GOAL_USDC, RPC_ENDPOINT, SALE } from "@/lib/sale/config";
import { fetchTotalRaisedUsdc } from "@/lib/sale/presale-client";
import {
  TOKENOMICS_CONFIRMED,
  formatTokens,
  presaleTokens,
} from "@/lib/sale/tokenomics";
import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";

function money(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function Figure({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="stat-label text-faint">{label}</p>
      <p className="stat-num tnum mt-2 text-ink">{value}</p>
    </div>
  );
}

/**
 * Progress toward the presale target.
 *
 * `raised` is read from the program's own `SaleConfig` account rather than
 * from anything we store, so the number on the page is the number on the
 * chain. It stays null until that read lands — and if the read fails, the
 * target and the amount offered still render. An unreachable RPC must not be
 * able to display "$0 raised".
 *
 * Its own `Connection`, not `useConnection()`: this is a read-only display and
 * shouldn't require the wallet provider to be mounted around it.
 */
export function RaiseProgress({
  sale,
  locale,
}: {
  sale: Dictionary["sale"];
  locale: string;
}) {
  const [raised, setRaised] = useState<number | null>(null);
  const connection = useMemo(
    () =>
      new Connection(RPC_ENDPOINT ?? clusterApiUrl(SALE.cluster), "confirmed"),
    [],
  );

  useEffect(() => {
    let cancelled = false;
    fetchTotalRaisedUsdc(connection).then((value) => {
      if (!cancelled) setRaised(value);
    });
    return () => {
      cancelled = true;
    };
  }, [connection]);

  /*
   * The size of the presale bucket is only quotable once the split is signed
   * off — the shares in tokenomics.ts are still placeholders, and printing a
   * placeholder next to a real target would read as a commitment. Until then
   * `goalNote` says the ceiling is the whole bucket in words, and this figure
   * appears on its own the moment TOKENOMICS_CONFIRMED flips.
   */
  const offered = TOKENOMICS_CONFIRMED ? presaleTokens() : null;
  const pct = raised === null ? 0 : (raised / RAISE_GOAL_USDC) * 100;

  return (
    <div>
      <div className="flex flex-wrap gap-x-16 gap-y-8">
        <Figure
          label={sale.raisedLabel}
          value={raised === null ? "—" : money(raised, locale)}
        />
        <Figure label={sale.goalLabel} value={money(RAISE_GOAL_USDC, locale)} />
        {offered !== null && (
          <Figure
            label={sale.offeredLabel}
            value={`${formatTokens(offered)} OPEN`}
          />
        )}
      </div>

      {/* Decorative: raised and target are both stated as text above, so a
          `progressbar` role here would only make a screen reader announce the
          same two numbers a second time. */}
      <div
        aria-hidden
        className="mt-10 h-1.5 w-full overflow-hidden rounded-pill bg-surface-alt"
      >
        <div
          className="h-full rounded-pill bg-linear-to-r from-accent to-teal"
          style={{
            width: `${Math.min(pct, 100)}%`,
            transition: "width 900ms cubic-bezier(0.2,0.7,0.2,1)",
          }}
        />
      </div>

      <p className="mt-6 max-w-2xl text-body-sm text-muted">{sale.goalNote}</p>
    </div>
  );
}
