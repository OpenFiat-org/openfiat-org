/**
 * OPEN supply and allocation, from OFS-4100 (OpenFiat Tokenomics
 * Specification) §1–2.
 *
 * The shares below are the specification's own proposal, no longer the
 * placeholders that stood here while Chapter 14 deferred the split. Every
 * bucket is marked `[PROPOSED — NEEDS SIGN-OFF]` in OFS-4100 §2, so
 * TOKENOMICS_CONFIRMED stays false and the page keeps its provisional note;
 * total supply is `[CONFIRMED]`.
 *
 * The Community Presale bucket is deliberately the entire 20% (200,000,000
 * OPEN) — this is not a raise-ceiling sizing choice, because the presale
 * itself has no hard cap on demand. Per OFS-4100 §3:
 *
 *  - Presale: 1 OPEN = 1 USDC, target $20,000,000 (a goal, not a cap — see
 *    `RAISE_GOAL_USDC` in ./config). If demand exceeds the target, the sale
 *    keeps selling out of the same 200M bucket rather than stopping.
 *  - Public Sale: whatever of the 200M bucket remains unsold when the
 *    presale closes is offered afterward at 1 OPEN = 1.25 USDC.
 *
 * The other six buckets absorb the resulting reduction proportionally to
 * their prior share (each roughly ×0.825, individually rounded to the
 * nearest whole percent via largest-remainder so the split sums to exactly
 * 100 — see OFS-4100 §2 for the full derivation).
 */

export type AllocationId =
  | "presale"
  | "allenhark"
  | "ecosystem"
  | "infrastructure"
  | "incentives"
  | "liquidity"
  | "reserve";

export type Allocation = {
  id: AllocationId;
  /** Share of the fixed maximum supply, 0-100. Must total 100. */
  sharePct: number;
  /** Colour for the bar segment and row swatch. */
  color: string;
};

/** Fixed maximum supply, minted once at genesis. */
export const TOTAL_SUPPLY: number | null = 1_000_000_000;

/** Flip to true when the figures below are final. */
export const TOKENOMICS_CONFIRMED = false;

/*
 * Literal values, not var(--color-*): Tailwind v4 only emits a theme variable
 * when some utility references it, so a colour used exclusively here would be
 * tree-shaken away and the segment would render invisible. Chosen for
 * distinguishability on the dark ground, walking blue to teal with copper and
 * grey for the tail.
 */
const SEGMENT = {
  blue: "#0070f8",
  indigo: "#5b8def",
  teal: "#00b098",
  tealLight: "#4fd1c5",
  paleBlue: "#8ec4ff",
  copper: "#c6743e",
  grey: "#6b7787",
} as const;

/* Ordered largest to smallest rather than in OFS-4100 §2's table order, so the
   stacked bar reads as a descending scale. The presale also happens to be the
   largest bucket now, and keeps the brand blue regardless: it is the one
   people are here to buy. */
export const ALLOCATIONS: Allocation[] = [
  { id: "presale", sharePct: 20, color: SEGMENT.blue },
  { id: "ecosystem", sharePct: 17, color: SEGMENT.teal },
  { id: "incentives", sharePct: 17, color: SEGMENT.tealLight },
  { id: "allenhark", sharePct: 14, color: SEGMENT.indigo },
  { id: "infrastructure", sharePct: 12, color: SEGMENT.paleBlue },
  { id: "liquidity", sharePct: 12, color: SEGMENT.copper },
  { id: "reserve", sharePct: 8, color: SEGMENT.grey },
];

/** Guards against a split that no longer adds up after an edit. */
export function allocationTotal(): number {
  return ALLOCATIONS.reduce((sum, a) => sum + a.sharePct, 0);
}

/**
 * OPEN offered in the presale — the entire Community Presale bucket.
 *
 * This is the real ceiling on the sale, and it is what makes the $2M target
 * (RAISE_GOAL_USDC) a goal rather than a cap: the bucket is fixed, the amount
 * raised against it is not.
 */
export function presaleTokens(): number | null {
  const presale = ALLOCATIONS.find((a) => a.id === "presale");
  return presale ? tokensFor(presale.sharePct) : null;
}

export function tokensFor(sharePct: number): number | null {
  return TOTAL_SUPPLY === null
    ? null
    : Math.round((TOTAL_SUPPLY * sharePct) / 100);
}

/** Full grouped figure, for the headline supply number. */
export function formatSupply(amount: number, locale: string): string {
  return new Intl.NumberFormat(locale === "zh" ? "zh-CN" : "en-US").format(
    amount,
  );
}

/** Compact form, for the allocation rows. */
export function formatTokens(amount: number): string {
  if (amount >= 1_000_000_000) return `${amount / 1_000_000_000}B`;
  if (amount >= 1_000_000) return `${amount / 1_000_000}M`;
  if (amount >= 1_000) return `${amount / 1_000}K`;
  return String(amount);
}
