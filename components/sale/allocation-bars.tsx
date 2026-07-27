"use client";

import { useEffect, useRef, useState } from "react";
import {
  ALLOCATIONS,
  type AllocationId,
  formatTokens,
  tokensFor,
} from "@/lib/sale/tokenomics";
import { cn } from "@/lib/utils";

/**
 * Allocation as one full-width stacked bar over open hairline rows.
 *
 * Not a donut in a card: a single bar shows relative share at a glance, and
 * the rows carry the detail without boxing anything. Segment widths sweep in
 * when the bar scrolls into view, and stay put under reduced motion.
 */
export function AllocationBars({
  labels,
  vesting,
  ariaLabel,
}: {
  labels: Record<AllocationId, string>;
  vesting: Record<AllocationId, string>;
  ariaLabel: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div>
      <div
        ref={ref}
        role="img"
        aria-label={`${ariaLabel}: ${ALLOCATIONS.map(
          (a) => `${labels[a.id]} ${a.sharePct}%`,
        ).join(", ")}`}
        className="flex h-3.5 w-full gap-[3px] overflow-hidden rounded-pill"
      >
        {ALLOCATIONS.map((allocation, index) => (
          <div
            key={allocation.id}
            className="h-full rounded-sm"
            style={{
              background: allocation.color,
              width: shown ? `${allocation.sharePct}%` : "0%",
              transition: `width 900ms cubic-bezier(0.2,0.7,0.2,1) ${index * 80}ms`,
            }}
          />
        ))}
      </div>

      <dl className="mt-8">
        {ALLOCATIONS.map((allocation) => {
          const tokens = tokensFor(allocation.sharePct);
          return (
            <div
              key={allocation.id}
              className={cn(
                "grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 border-t border-line py-4",
                // A column of em dashes is noise; drop it until supply is set.
                tokens === null
                  ? "sm:grid-cols-[1.4fr_0.4fr_1.6fr]"
                  : "sm:grid-cols-[1.4fr_0.4fr_0.5fr_1.3fr]",
              )}
            >
              <dt className="flex items-center gap-3 font-medium text-ink">
                <span
                  aria-hidden="true"
                  className="h-2.5 w-2.5 flex-none rounded-[3px]"
                  style={{ background: allocation.color }}
                />
                {labels[allocation.id]}
              </dt>
              <dd className="tnum text-right font-mono text-sm text-body sm:text-left">
                {allocation.sharePct}%
              </dd>
              {tokens !== null && (
                <dd className="tnum font-mono text-sm text-muted">
                  {formatTokens(tokens)}
                </dd>
              )}
              <dd className="text-body-sm text-muted">
                {vesting[allocation.id]}
              </dd>
            </div>
          );
        })}
      </dl>
    </div>
  );
}
