/**
 * The single seam for sale mechanics.
 *
 * The on-chain presale program (OFS-4200 §3, `openfiat-core/programs/presale`)
 * is deployed and initialized on devnet (program id below) — see
 * `openfiat-core/programs/devnet-addresses.json`'s `devnet_sale` entry and
 * `openfiat-core/programs/scripts/init-devnet-sale.ts` for how it was set up.
 *
 * The terms below (hard/soft cap, min/max) are small, practical numbers for
 * browser click-through testing — NOT OFS-4100 §3's proposed production
 * figures (a real $30M hard cap has nothing to test against on devnet).
 * `usdcMint` is a devnet-only test mint (Token-2022, 6 decimals) with its
 * mint authority deliberately left live, since there is no canonical devnet
 * USDC — OFS-4100 §3 anticipates exactly this ("devnet equivalents/test
 * mints during the devnet phase of this build").
 *
 * Only the direct-USDC contribution path is wired for real testing right
 * now — the SOL/stablecoin-via-Jupiter path's on-chain logic is proven via
 * the deterministic mock-jupiter test suite, but Jupiter has no live
 * liquidity/routing on devnet for a custom test mint, so it isn't
 * practically exercisable end-to-end here yet.
 *
 * Values are read only from this module — never from a URL parameter, form
 * field or anything else a visitor controls — so a link cannot redirect a
 * purchase at a different program or mint.
 *
 * **Devnet only.** `cluster` defaults to "devnet" and must never be changed
 * to "mainnet-beta" until the mainnet gate clears (external audit + final
 * tokenomics sign-off — see OFS-4200's status banner). This default is
 * itself a safety property: if `programId` were ever accidentally filled in
 * before this constant were updated, defaulting to "mainnet-beta" would be
 * actively dangerous, not just wrong.
 */

export type StablecoinOption = {
  symbol: string;
  mint: string;
  decimals: number;
};

export type SaleConfig = {
  /** Base58 program id of the deployed presale program. */
  programId: string | null;
  /** `sale_nonce` used at `initialize_sale` — namespaces this sale's PDAs. */
  saleNonce: number | null;
  /** Base58 mint address of the OPEN token (fixed supply — see Phase 2). */
  openMint: string | null;
  /** Base58 mint address of USDC on this cluster. */
  usdcMint: string | null;
  /** The swap-aggregator program CPI'd into for non-USDC contributions —
   *  Jupiter's real, independently verified program id in production. */
  swapProgram: string | null;
  /** USDC-equivalent, human units (not base units). */
  hardCapUsdc: number | null;
  softCapUsdc: number | null;
  minContributionUsdc: number | null;
  maxContributionUsdc: number | null;
  /** ISO 8601 instants. */
  opensAt: string | null;
  closesAt: string | null;
  /** Non-USDC stablecoins accepted via the Jupiter swap path (OFS-4100 §3).
   *  SOL is always accepted via the same path and isn't listed here. */
  acceptedStablecoins: StablecoinOption[];
  /** "mainnet-beta" | "devnet" | "testnet" — pinned, never guessed. */
  cluster: "mainnet-beta" | "devnet" | "testnet";
};

export const SALE: SaleConfig = {
  programId: "75rJ9MRAaSnAc8tg4AfeTFVDCVrN6jdD5CqeyE4UoUw7",
  /* Nonce 0 was initialized against the old (incorrect, 3%-presale-bucket)
     mint and left in place on devnet — PDAs are namespaced by nonce, so this
     points at nonce 1's fresh SaleConfig against the corrected 20% mint
     rather than the stale nonce-0 sale. */
  saleNonce: 1,
  openMint: "29w8TroBTYoaqrXBDcpv5L54VZRA8Kf7kU5U1cakvFdj",
  usdcMint: "SK1JEbfsjjTG2WELNirmM7iJVcdnwerqfF32kCnoWsM",
  swapProgram: "JUP6LkbZbjS1jKKwapdHNy74zcZ3tLUZoi5QNyVTaV4",
  /* Mirrors what nonce 1 actually enforces on devnet as of the OFS-4100 §3
     conformance fix: the full 200,000,000-OPEN Community Presale bucket as
     the cap, and no soft cap at all. Zero is how "no minimum to raise" is
     expressed on chain — it is not a missing value. */
  hardCapUsdc: 200_000_000,
  softCapUsdc: 0,
  minContributionUsdc: 1,
  /* Published per-wallet limit. The UI prefers the value the program actually
     enforces (see `fetchSaleSnapshot`) and only falls back to this one when
     that read fails, so a figure here that hasn't reached the chain yet cannot
     invite a contribution the program will reject. */
  maxContributionUsdc: 10_000_000,
  opensAt: "2026-07-27T18:16:07.000Z",
  closesAt: "2026-08-26T18:17:07.000Z",
  acceptedStablecoins: [],
  cluster: "devnet",
};

/**
 * The sale is live only when a program, a nonce and an opening time all
 * exist. Any one of them missing keeps the purchase path disabled.
 */
export const SALE_LIVE: boolean =
  SALE.programId !== null && SALE.saleNonce !== null && SALE.opensAt !== null;

/**
 * Published fundraising target for the community presale, in USD.
 *
 * A target, not a ceiling. The presale offers the whole Community Presale
 * allocation (see `presaleTokens()` in ./tokenomics), so if demand exceeds
 * $2M the sale can keep selling into that bucket rather than stopping at the
 * goal. Two separate numbers therefore matter and must not be conflated:
 *
 *  - `RAISE_GOAL_USDC` — what we are aiming to raise. Public, editorial.
 *  - `SALE.hardCapUsdc` — the limit the on-chain program actually enforces on
 *    this cluster. On devnet that is a small click-through test figure, so it
 *    is deliberately not shown as the goal.
 */
export const RAISE_GOAL_USDC = 20_000_000;

/**
 * Read-only RPC endpoint. Pinned via env rather than falling back to a random
 * public endpoint, so a misconfigured deploy fails visibly instead of quietly
 * talking to somebody else's node.
 */
export const RPC_ENDPOINT: string | null =
  process.env.NEXT_PUBLIC_SOLANA_RPC ?? null;

export const TOKEN_SYMBOL = "OPEN";

/**
 * Solscan link for a confirmed signature.
 *
 * The cluster comes from `SALE.cluster`, never from the page — a receipt that
 * silently pointed at mainnet while the transaction landed on devnet would
 * show "not found" and read as a failed purchase.
 */
export function solscanTxUrl(signature: string): string {
  const query =
    SALE.cluster === "mainnet-beta" ? "" : `?cluster=${SALE.cluster}`;
  return `https://solscan.io/tx/${signature}${query}`;
}

/** Jupiter's free, no-API-key "lite" tier — see lib/sale/presale-client.ts. */
export const JUPITER_API_BASE = "https://lite-api.jup.ag/swap/v1";

/** Native SOL, always accepted alongside `acceptedStablecoins`. */
export const WSOL_MINT = "So11111111111111111111111111111111111111112";
