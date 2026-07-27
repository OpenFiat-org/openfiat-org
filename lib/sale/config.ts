/**
 * The single seam for sale mechanics.
 *
 * The on-chain presale program (OFS-4200 §3, `openfiat-core/programs/presale`)
 * exists and is fully tested against a local validator (Phase 3) — see
 * `presale-idl.json` in this directory. What's still pending is the actual
 * devnet deployment + `initialize_sale` call (blocked on devnet SOL faucet
 * rate-limiting in the build environment; documented in
 * `openfiat-core/programs/README.md`). So the UI and transaction-building
 * code are complete and real, and the addresses/numbers below are what get
 * filled in once that deployment happens — no code change needed then.
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
  programId: null,
  saleNonce: null,
  openMint: null,
  usdcMint: null,
  swapProgram: null,
  hardCapUsdc: null,
  softCapUsdc: null,
  minContributionUsdc: null,
  maxContributionUsdc: null,
  opensAt: null,
  closesAt: null,
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
 * Read-only RPC endpoint. Pinned via env rather than falling back to a random
 * public endpoint, so a misconfigured deploy fails visibly instead of quietly
 * talking to somebody else's node.
 */
export const RPC_ENDPOINT: string | null =
  process.env.NEXT_PUBLIC_SOLANA_RPC ?? null;

export const TOKEN_SYMBOL = "OPEN";

/** Jupiter's free, no-API-key "lite" tier — see lib/sale/presale-client.ts. */
export const JUPITER_API_BASE = "https://lite-api.jup.ag/swap/v1";

/** Native SOL, always accepted alongside `acceptedStablecoins`. */
export const WSOL_MINT = "So11111111111111111111111111111111111111112";
