import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { PAYMENT_ASSETS, paymentAsset } from "@/lib/sale/assets";
import { RAISE_GOAL_USDC, SALE, solscanTxUrl } from "@/lib/sale/config";
import { OPEN_PER_USDC, openFor } from "@/lib/sale/presale-client";
import {
  ALLOCATIONS,
  allocationTotal,
  presaleTokens,
} from "@/lib/sale/tokenomics";

const PUBLIC_DIR = join(process.cwd(), "public");

describe("payment assets", () => {
  it("has a logo file on disk for every asset", () => {
    for (const asset of PAYMENT_ASSETS) {
      // A missing file renders as a broken image with no build error, so the
      // only place this can be caught is here.
      expect(
        existsSync(join(PUBLIC_DIR, asset.logo)),
        `${asset.symbol}: ${asset.logo}`,
      ).toBe(true);
    }
  });

  it("resolves the symbols the sale can actually be paid in", () => {
    expect(paymentAsset("USDC")?.name).toBe("USD Coin");
    expect(paymentAsset("SOL")?.name).toBe("Solana");
    // Case-insensitive, since symbols arrive from config and from the chain.
    expect(paymentAsset("usdt")?.symbol).toBe("USDT");
  });

  it("returns null for an unknown symbol rather than throwing", () => {
    expect(paymentAsset("DOGE")).toBeNull();
  });

  it("carries no mint addresses", () => {
    // Mints belong to config.ts alone. If one ever lands here there would be
    // two sources of truth for where contributions go.
    for (const asset of PAYMENT_ASSETS) {
      expect(Object.keys(asset).sort()).toEqual(["logo", "name", "symbol"]);
    }
  });
});

describe("OPEN entitlement", () => {
  it("is 1:1 with USDC, matching the program", () => {
    // `SaleConfig::open_entitlement_for` in openfiat-core scales by the mints'
    // decimal difference and applies no other rate. If that ever changes, the
    // "you receive" figure on the page silently becomes a lie.
    expect(OPEN_PER_USDC).toBe(1);
    expect(openFor(1000)).toBe(1000);
    expect(openFor(0.5)).toBe(0.5);
  });
});

describe("solscan links", () => {
  const SIGNATURE = "5Nq".padEnd(88, "x");

  it("carries the cluster for a non-mainnet sale", () => {
    // Without it Solscan defaults to mainnet, finds nothing, and a confirmed
    // purchase reads as a failed one.
    expect(solscanTxUrl(SIGNATURE)).toBe(
      `https://solscan.io/tx/${SIGNATURE}?cluster=${SALE.cluster}`,
    );
    expect(SALE.cluster).not.toBe("mainnet-beta");
  });
});

describe("presale terms", () => {
  it("targets $20M", () => {
    // OFS-4100 §3. A goal, not a cap: the presale keeps selling out of the
    // full 200,000,000 OPEN bucket past this figure rather than stopping.
    expect(RAISE_GOAL_USDC).toBe(20_000_000);
  });

  it("keeps the goal distinct from the enforced hard cap", () => {
    // The goal is editorial; the hard cap is what the program enforces on this
    // cluster. Conflating them would show a devnet test figure as the target.
    expect(RAISE_GOAL_USDC).not.toBe(SALE.hardCapUsdc);
  });

  it("allocates exactly 100% of supply", () => {
    expect(allocationTotal()).toBe(100);
  });

  it("offers the whole community presale allocation", () => {
    const presale = ALLOCATIONS.find((a) => a.id === "presale");
    expect(presale).toBeDefined();
    expect(presaleTokens()).toBe(
      1_000_000_000 * ((presale?.sharePct ?? 0) / 100),
    );
  });
});
