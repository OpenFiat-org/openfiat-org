"use client";

import { Connection, clusterApiUrl } from "@solana/web3.js";
import { useEffect, useMemo, useState } from "react";
import type { Dictionary } from "@/lib/i18n";
import { RAISE_GOAL_USDC, RPC_ENDPOINT, SALE } from "@/lib/sale/config";
import { fetchSaleSnapshot } from "@/lib/sale/presale-client";
import { formatTokens, presaleTokens } from "@/lib/sale/tokenomics";

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
      {/* Sized below `.stat-num` so three of these sit on one row inside the
          hero's measure. At 2.5rem "$2,000,000" alone forces a wrap, and a
          figure orphaned onto its own line reads as a separate statement. */}
      <p
        className="tnum mt-2 font-extrabold tracking-[-0.01em] text-ink"
        style={{ fontSize: "clamp(1.5rem, 2.4vw, 2rem)", lineHeight: 1.1 }}
      >
        {value}
      </p>
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
    fetchSaleSnapshot(connection).then((value) => {
      if (!cancelled) setRaised(value?.totalRaisedUsdc ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [connection]);

  const offered = presaleTokens();
  const pct = raised === null ? 0 : (raised / RAISE_GOAL_USDC) * 100;
  // A real contribution should leave a visible mark. Against a $2M target the
  // first few thousand dollars round to a bar of zero width, which reads as
  // "nothing raised" rather than "barely started".
  const barPct = raised && raised > 0 ? Math.max(pct, 0.6) : pct;

  return (
    <div>
      <div className="grid grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-3">
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
            width: `${Math.min(barPct, 100)}%`,
            transition: "width 900ms cubic-bezier(0.2,0.7,0.2,1)",
          }}
        />
      </div>

      <p className="mt-6 max-w-2xl text-body-sm text-muted">{sale.goalNote}</p>
      <p className="mt-2 max-w-2xl text-body-sm text-muted">
        {sale.publicSaleNote}
      </p>
    </div>
  );
}
