import { cn } from "@/lib/utils";
import Link from "next/link";

/**
 * A list of things, separated by hairlines rather than wrapped in cards.
 *
 * Card grids turned out to be the wrong default here: a box around every item
 * plus a badge plus a row of tags gave four competing elements per item and
 * made a simple list read as dense. A row carries a name and one line, and
 * detail lives on the item's own page.
 */
export function Rows({ children }: { children: React.ReactNode }) {
  return <ul className="border-t border-line">{children}</ul>;
}

export function Row({
  href,
  title,
  subtitle,
  lead,
  trailing,
}: {
  href?: string;
  title: string;
  subtitle?: string;
  /** Small fixed-width marker at the start: a number or an identifier. */
  lead?: string;
  /** Quiet text at the end of the row. */
  trailing?: string;
}) {
  const inner = (
    <>
      {lead && (
        <span className="w-20 shrink-0 pt-0.5 font-mono text-sm tabular-nums text-faint">
          {lead}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "font-semibold text-ink",
            href && "group-hover:text-accent-mid",
          )}
        >
          {title}
        </span>
        {subtitle && (
          <span className="mt-1 block text-body-sm text-muted">{subtitle}</span>
        )}
      </span>
      {trailing && (
        <span className="shrink-0 pt-0.5 font-mono text-xs text-faint">
          {trailing}
        </span>
      )}
    </>
  );

  return (
    <li className="border-b border-line">
      {href ? (
        <Link
          href={href}
          className="group flex gap-5 py-5 transition-colors hover:bg-surface-alt/40 focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)] sm:gap-8"
        >
          {inner}
        </Link>
      ) : (
        <div className="flex gap-5 py-5 sm:gap-8">{inner}</div>
      )}
    </li>
  );
}
