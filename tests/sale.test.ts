import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, vi } from "vitest";
import { getDictionary } from "@/lib/i18n";
import { PAYMENT_ASSETS, paymentAsset } from "@/lib/sale/assets";
import {
  RAISE_GOAL_USDC,
  SALE,
  SALE_LIVE,
  solscanTxUrl,
} from "@/lib/sale/config";
import { OPEN_PER_USDC, openFor } from "@/lib/sale/presale-client";
import {
  ALLOCATIONS,
  allocationTotal,
  presaleTokens,
  TOTAL_SUPPLY,
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
  it("is 100 OPEN per USDC, matching the re-baselined program", () => {
    // `SaleConfig::open_entitlement_for` in openfiat-core scales the USDC
    // amount by the mints' decimal difference and the configured
    // `open_per_usdc` rate (100, re-baselined 2026-08-09 — OFS-4100 §3). If
    // that ever changes, the "you receive" figure on the page silently
    // becomes a lie.
    expect(OPEN_PER_USDC).toBe(100);
    expect(openFor(1000)).toBe(100_000);
    expect(openFor(0.5)).toBe(50);
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
    // full 20,000,000,000 OPEN bucket past this figure rather than stopping.
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

  it("has the re-baselined 100,000,000,000 total supply", () => {
    expect(TOTAL_SUPPLY).toBe(100_000_000_000);
  });

  it("offers the whole community presale allocation", () => {
    const presale = ALLOCATIONS.find((a) => a.id === "presale");
    expect(presale).toBeDefined();
    expect(presaleTokens()).toBe(
      (TOTAL_SUPPLY ?? 0) * ((presale?.sharePct ?? 0) / 100),
    );
  });
});

describe("sale band copy", () => {
  // Regression test for a real bug: the homepage's status pill was gated on
  // `SALE_LIVE` but the paragraph beside it was hardcoded, so a closed sale
  // would show a "not open" pill next to a "contribute today" paragraph.
  // `saleBandCopy` is the fix — both read the same gate — and this proves
  // it actually responds to `SALE_LIVE` rather than just having the right
  // dictionary keys sitting next to unused logic.
  const t = getDictionary("en");

  it("matches the live config today: SALE_LIVE is true on devnet", () => {
    // Ground truth for the assertion below — if this ever flips, the
    // "resolves both fields from the gate" test still holds either way,
    // but this documents which branch production actually renders.
    expect(SALE_LIVE).toBe(true);
  });

  it("resolves both fields from the same SALE_LIVE gate, in both directions", async () => {
    vi.resetModules();
    vi.doMock("@/lib/sale/config", async (importOriginal) => {
      const actual = await importOriginal<typeof import("@/lib/sale/config")>();
      return { ...actual, SALE_LIVE: true };
    });
    const { saleBandCopy: whenLive } = await import("@/lib/sale/copy");
    expect(whenLive(t)).toEqual({
      body: t.home.saleBand.bodyLive,
      status: t.home.saleBand.statusLive,
    });

    vi.resetModules();
    vi.doMock("@/lib/sale/config", async (importOriginal) => {
      const actual = await importOriginal<typeof import("@/lib/sale/config")>();
      return { ...actual, SALE_LIVE: false };
    });
    const { saleBandCopy: whenNotLive } = await import("@/lib/sale/copy");
    expect(whenNotLive(t)).toEqual({
      body: t.home.saleBand.body,
      status: t.sale.notLiveTitle,
    });

    vi.doUnmock("@/lib/sale/config");
    vi.resetModules();
  });

  it("the live and not-live strings actually differ, so the test above isn't vacuous", () => {
    expect(t.home.saleBand.bodyLive).not.toBe(t.home.saleBand.body);
    expect(t.home.saleBand.statusLive).not.toBe(t.sale.notLiveTitle);
  });
});
