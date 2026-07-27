/**
 * OPEN supply and allocation.
 *
 * ────────────────────────────────────────────────────────────────────────
 *  THE PERCENTAGES BELOW ARE PLACEHOLDERS AND MUST BE REPLACED.
 *
 *  The whitepaper names the seven allocation categories but publishes no
 *  split — Chapter 14 defers it to the Tokenomics Paper. The shares here
 *  exist so the allocation chart can be designed and reviewed; they are not
 *  a proposal. Replace them with the real figures, set TOTAL_SUPPLY, then
 *  flip TOKENOMICS_CONFIRMED to true to drop the provisional note from the
 *  page.
 * ────────────────────────────────────────────────────────────────────────
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

export const ALLOCATIONS: Allocation[] = [
  { id: "presale", sharePct: 20, color: SEGMENT.blue },
  { id: "allenhark", sharePct: 20, color: SEGMENT.indigo },
  { id: "ecosystem", sharePct: 18, color: SEGMENT.teal },
  { id: "incentives", sharePct: 15, color: SEGMENT.tealLight },
  { id: "infrastructure", sharePct: 12, color: SEGMENT.paleBlue },
  { id: "liquidity", sharePct: 10, color: SEGMENT.copper },
  { id: "reserve", sharePct: 5, color: SEGMENT.grey },
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
