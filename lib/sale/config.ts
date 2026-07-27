/**
 * The single seam for sale mechanics.
 *
 * Nothing about the OPEN sale exists yet: no program has been deployed, no
 * price or cap has been set, and the whitepaper defers every figure to a
 * Tokenomics Paper that has not been published. So the UI is complete and the
 * numbers live here. Fill these in when the program ships and the sale page
 * activates with no code change.
 *
 * Values are read only from this module — never from a URL parameter, form
 * field or anything else a visitor controls — so a link cannot redirect a
 * purchase at a different program or mint.
 */

export type SaleConfig = {
  /** Base58 program id of the deployed sale program. */
  programId: string | null;
  /** Price of one OPEN, in lamports of the accepted mint's base unit. */
  priceLamports: number | null;
  hardCapLamports: number | null;
  /** ISO 8601 instants. */
  opensAt: string | null;
  closesAt: string | null;
  /** Base58 mint addresses accepted as payment, e.g. USDC. */
  acceptedMints: { symbol: string; mint: string; decimals: number }[];
  /** "mainnet-beta" | "devnet" | "testnet" — pinned, never guessed. */
  cluster: "mainnet-beta" | "devnet" | "testnet";
};

export const SALE: SaleConfig = {
  programId: null,
  priceLamports: null,
  hardCapLamports: null,
  opensAt: null,
  closesAt: null,
  acceptedMints: [],
  cluster: "mainnet-beta",
};

/**
 * The sale is live only when a program, a price and an opening time all exist.
 * Any one of them missing keeps the purchase path disabled.
 */
export const SALE_LIVE: boolean =
  SALE.programId !== null &&
  SALE.priceLamports !== null &&
  SALE.opensAt !== null;

/**
 * Read-only RPC endpoint. Pinned via env rather than falling back to a random
 * public endpoint, so a misconfigured deploy fails visibly instead of quietly
 * talking to somebody else's node.
 */
export const RPC_ENDPOINT: string | null =
  process.env.NEXT_PUBLIC_SOLANA_RPC ?? null;

export const TOKEN_SYMBOL = "OPEN";
