/**
 * Presentational registry for the assets the presale accepts.
 *
 * Deliberately holds no mint addresses and no decimals. Those are transaction
 * inputs and live in `config.ts` alone (`SALE.usdcMint`,
 * `SALE.acceptedStablecoins`), pinned per cluster, so a logo file can never
 * become the thing that decides where money goes. This module only answers
 * "what does USDT look like and what is it called".
 *
 * The logos are the issuers' own marks, used to identify the asset a
 * contributor is paying with — the same nominative use every exchange and
 * wallet makes of them.
 */

export type PaymentAssetSymbol = "OPEN" | "USDC" | "USDT" | "USD1" | "SOL";

export type PaymentAsset = {
  symbol: PaymentAssetSymbol;
  /** Issuer's name for the asset. A proper noun — not translated. */
  name: string;
  /** Path under `public/`. 64×64 PNG with transparency. */
  logo: string;
};

/**
 * Every asset we hold a mark for. Not a list of what the sale accepts — that
 * comes from the on-chain whitelist via `swapEligibleAssets()`, so adding a row
 * here makes a logo available without implying the asset is selectable.
 */
const ASSETS: PaymentAsset[] = [
  // Our own token. Listed here so OPEN gets its real mark wherever it appears
  // as a currency, rather than a letter badge standing in for one.
  { symbol: "OPEN", name: "OpenFiat", logo: "/logo-mark.png" },
  { symbol: "USDC", name: "USD Coin", logo: "/currencies/usdc.png" },
  { symbol: "USDT", name: "Tether USD", logo: "/currencies/usdt.png" },
  { symbol: "USD1", name: "World Liberty USD", logo: "/currencies/usd1.png" },
  { symbol: "SOL", name: "Solana", logo: "/currencies/sol.png" },
];

/**
 * Lookup by symbol. Returns null for an asset we have no mark for, so the
 * caller can fall back rather than render a broken image.
 */
export function paymentAsset(symbol: string): PaymentAsset | null {
  return ASSETS.find((asset) => asset.symbol === symbol.toUpperCase()) ?? null;
}

/** Public asset list, for tests and for anything that needs to enumerate. */
export const PAYMENT_ASSETS: readonly PaymentAsset[] = ASSETS;
