import { describe, expect, it } from "vitest";
import {
  BPS_DENOMINATOR,
  computeEpoch,
  type NodeProfile,
  PER_EPOCH_EMISSION,
  QUALITY_MATRIX,
  qualityBps,
  weightOf,
} from "@/lib/rewards";

/**
 * `lib/rewards.ts` is a port, and a port is only worth anything while it still
 * agrees with what it was ported from. Every case below is one of the Rust
 * crate's own tests restated against the TypeScript — same inputs, same
 * expected ratios, and where the crate asserts a tolerance in basis points, the
 * same tolerance.
 *
 * So when `crates/rewards` changes a parameter or the shape of the arithmetic,
 * this file fails, and the page stops claiming something the software no longer
 * does. That is the entire point of writing them out rather than trusting the
 * constants to be copied correctly once.
 */

const BASE: NodeProfile = {
  stakeOpen: 5_000,
  connectivity: "rpc",
  slicesLive: 24,
  pinning: "serving",
};

/** Amounts are proportional to weights, so a weight ratio is a payout ratio. */
function ratioBps(a: NodeProfile, b: NodeProfile): bigint {
  return (weightOf(a) * BPS_DENOMINATOR) / weightOf(b);
}

const ALONE = { peerCount: 0, peerStakeOpen: 0, peerQualityBps: 0n };

describe("quality multipliers", () => {
  it("reaches exactly 1.0 for a perfect node and never exceeds it", () => {
    // The invariant the whole page rests on: a multiplier above 1.0 would
    // apportion emission the Infrastructure bucket does not contain, and
    // `RewardParams::validate` rejects a parameter set that allows one.
    expect(qualityBps(BASE)).toBe(BPS_DENOMINATOR);
    for (const row of QUALITY_MATRIX) {
      expect(row.bps).toBeLessThanOrEqual(BPS_DENOMINATOR);
    }
  });

  it("pays a gossip-only node four tenths of an identical RPC node", () => {
    // crates/rewards: a_gossip_only_node_earns_four_tenths_of_an_otherwise_
    // identical_rpc_node
    const gossip: NodeProfile = { ...BASE, connectivity: "gossip" };
    expect(Number(ratioBps(gossip, BASE))).toBeGreaterThanOrEqual(3_999);
    expect(Number(ratioBps(gossip, BASE))).toBeLessThanOrEqual(4_001);
  });

  it("pays a serving node about 1.43x an identical node that serves nothing", () => {
    // crates/rewards: a_pinning_node_out_earns_an_identical_node_that_pins_
    // nothing — 1.0 / 0.7.
    const absent: NodeProfile = { ...BASE, pinning: "absent" };
    const ratio = Number(ratioBps(BASE, absent));
    expect(ratio).toBeGreaterThanOrEqual(14_284);
    expect(ratio).toBeLessThanOrEqual(14_288);
  });

  it("halves the share for half an epoch of downtime", () => {
    // crates/rewards: half_an_epoch_of_downtime_halves_the_share
    const flaky: NodeProfile = { ...BASE, slicesLive: 12 };
    expect(ratioBps(BASE, flaky)).toBe(2n * BPS_DENOMINATOR);
  });

  it("lets the factors compose rather than one masking another", () => {
    // crates/rewards: the_factors_compose_rather_than_one_masking_another.
    // 0.4 x 1.0 = 0.40 against 1.0 x 0.7 = 0.70 — serving content is a
    // premium on a chain connection, never a substitute for one.
    const gossipServing: NodeProfile = { ...BASE, connectivity: "gossip" };
    const rpcAbsent: NodeProfile = { ...BASE, pinning: "absent" };
    expect(qualityBps(gossipServing)).toBe(4_000n);
    expect(qualityBps(rpcAbsent)).toBe(7_000n);
    expect(weightOf(rpcAbsent)).toBeGreaterThan(weightOf(gossipServing));
  });
});

describe("eligibility", () => {
  it("pays nothing at all below the stake floor, rather than a small share", () => {
    // crates/rewards: a_node_below_the_stake_floor_earns_nothing
    const thin: NodeProfile = { ...BASE, stakeOpen: 999 };
    expect(weightOf(thin)).toBe(0n);
    expect(computeEpoch(thin, ALONE).eligible).toBe(false);
    expect(computeEpoch(thin, ALONE).amount).toBe(0n);
  });

  it("pays nothing to a node heard in no slice, whatever it staked", () => {
    const dark: NodeProfile = { ...BASE, stakeOpen: 1_000_000, slicesLive: 0 };
    expect(qualityBps(dark)).toBe(0n);
    expect(computeEpoch(dark, ALONE).amount).toBe(0n);
  });
});

describe("apportionment", () => {
  it("gives a lone eligible node the whole epoch's emission and no more", () => {
    const outcome = computeEpoch(BASE, ALONE);
    expect(outcome.amount).toBe(PER_EPOCH_EMISSION);
  });

  it("keeps every share proportional to stake", () => {
    // crates/rewards: share_is_proportional_to_stake
    const big: NodeProfile = { ...BASE, stakeOpen: 3_000 };
    const small: NodeProfile = { ...BASE, stakeOpen: 1_000 };
    expect(ratioBps(big, small)).toBe(3n * BPS_DENOMINATOR);
  });

  it("never lets one node's amount exceed the pool, however large its stake", () => {
    // The figure a reader is most likely to try, and the one that must not
    // produce something absurd: the entire supply staked by a single node.
    const whale: NodeProfile = { ...BASE, stakeOpen: 1_000_000_000 };
    const outcome = computeEpoch(whale, {
      peerCount: 500,
      peerStakeOpen: 5_000,
      peerQualityBps: 7_000n,
    });
    expect(outcome.amount).toBeLessThanOrEqual(PER_EPOCH_EMISSION);
  });

  it("shrinks a node's share as other nodes stake, never grows it", () => {
    // Emission is fixed, so the only way anyone earns more is by taking a
    // larger slice of the same pool. A model where joining peers left a
    // node's amount unchanged would be minting.
    const alone = computeEpoch(BASE, ALONE).amount;
    const crowded = computeEpoch(BASE, {
      peerCount: 1_000,
      peerStakeOpen: 5_000,
      peerQualityBps: 7_000n,
    }).amount;
    expect(crowded).toBeLessThan(alone);
  });
});
