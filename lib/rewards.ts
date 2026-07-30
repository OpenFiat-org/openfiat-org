/**
 * The node reward model, ported from `openfiat-core/crates/rewards`.
 *
 * # Why this is a port and not a summary
 *
 * A page that tells someone what they will earn is making a claim they may
 * spend money on. The only defensible version of that claim is one that
 * computes what the software computes, so every constant below is copied
 * from `crates/rewards/src/params.rs` with its source named, and the
 * arithmetic reproduces `crates/rewards/src/schedule.rs::compute` term for
 * term — including where that function truncates.
 *
 * Where OFS-4100 §9.2 and the crate disagree, the crate wins, because the
 * crate is what runs. There is exactly one such disagreement and it matters:
 * §9.2 states the per-node share as proportional to
 * `effective_stake × connectivity × availability`, three factors. The crate
 * applies a fourth — content pinning — which the specification's table does
 * not mention. See {@link PINNING_SERVING_BPS}.
 *
 * # BigInt, not number
 *
 * The crate works in base units (1 OPEN = 1e9) and truncates at two points:
 * once when the three quality multipliers collapse into one basis-point
 * factor, and once when emission is apportioned by weight. A `number` would
 * round where the crate floors, and would lose precision entirely past 2^53 —
 * which a stake in base units reaches at ~9 million OPEN. Both would produce
 * a figure this page cannot stand behind, so the money path is BigInt and
 * only the final presentation converts.
 */

/**
 * Basis-point denominator. `params.rs`'s `BPS_DENOMINATOR`, which in turn
 * matches the on-chain programs' own constant so one convention covers both.
 */
export const BPS_DENOMINATOR = 10_000n;

/** OPEN's decimal precision, per OFS-4100 §1. */
export const OPEN_DECIMALS = 9;
const OPEN = 1_000_000_000n;

/**
 * Every figure below is `RewardParams::default()` in `params.rs`, which is
 * the specification's §9.2 starting point expressed in the units the
 * arithmetic actually uses. They are governance parameters, not constants —
 * §9's own preamble says so — and this page says so too rather than
 * presenting them as fixed properties of the protocol.
 */

/** 24 hours. One reward epoch, and the window liveness is measured over. */
export const EPOCH_HOURS = 24;

/**
 * How many slices the epoch is divided into for availability. A node scores a
 * slice by being heard from at all during it, so 24 slices means availability
 * moves in whole hours and nothing finer — a node down for twenty minutes
 * loses nothing, and a node down for an hour loses 1/24th.
 */
export const AVAILABILITY_BUCKETS = 24n;

/**
 * Bootstrap emission per epoch, in base units: 82,192 OPEN.
 *
 * This is the whole pool for one day, shared by every eligible node on the
 * network. It is not a per-node figure and this page must never let it read
 * as one.
 */
export const PER_EPOCH_EMISSION = 82_192n * OPEN;

/** The Infrastructure / Node Bootstrap genesis bucket: 12% of supply. */
export const BOOTSTRAP_BUCKET = 120_000_000n * OPEN;

/**
 * How many epochs the bucket funds: 120,000,000 / 82,192 ≈ 1,460 daily
 * epochs, which is the four years OFS-4100 §9.1 spreads it over.
 *
 * Stated because it is the single most load-bearing fact about these
 * rewards and the easiest one to leave out. Bootstrap emission is finite. On
 * the day it runs out the pool becomes exactly the Infrastructure
 * sub-account's share of settlement fees — that is, whatever the network
 * actually earned — and every figure this page computes drops with it.
 */
export const BOOTSTRAP_EPOCHS = 1_460;

/** A node observed bridging to Solana: 1.0. */
export const CONNECTIVITY_RPC_BPS = 10_000n;

/** A node observed only gossiping: 0.4. */
export const CONNECTIVITY_GOSSIP_BPS = 4_000n;

/**
 * A node that answered a retrievability challenge: 1.0.
 *
 * The crate applies this factor; OFS-4100 §9.2's parameter table does not
 * list it. The crate is what computes a schedule, so this page shows four
 * factors and flags the fourth as ahead of the specification rather than
 * quietly presenting it as signed off.
 */
export const PINNING_SERVING_BPS = 10_000n;

/** A node that did not: 0.7. */
export const PINNING_ABSENT_BPS = 7_000n;

/**
 * Stake at or below which a node earns nothing: 1,000 OPEN. Mirrors the
 * on-chain `min_stake_by_role[NodeOperator]`; the staking program is what
 * enforces it, and the paying side declines anyone who has since fallen
 * under it.
 */
export const MIN_STAKE_OPEN = 1_000n;

/**
 * No multiplier may exceed 1.0, and `RewardParams::validate` rejects a
 * parameter set where one does.
 *
 * This is the invariant the page is built around, so it is worth stating
 * plainly: emission per epoch is fixed, and these multipliers decide how it
 * is *divided*. A bonus above 1.0 would not pay a good node extra out of
 * nowhere, it would apportion emission the Infrastructure bucket does not
 * contain. Which is why the pinning premium is implemented as a penalty on
 * nodes that do not pin — same relative outcome, no invented tokens.
 *
 * Any figure this page shows that implies a multiplier over 1.0, or a share
 * that could grow without another node's shrinking, is wrong by
 * construction.
 */
export const MAX_QUALITY_BPS = BPS_DENOMINATOR;

export type Connectivity = "rpc" | "gossip";
export type Pinning = "serving" | "absent";

/** What an operator controls, in the units an operator thinks in. */
export type NodeProfile = {
  /** Whole OPEN staked. */
  stakeOpen: number;
  connectivity: Connectivity;
  /** Slices of the epoch the node was heard in, 0..=24. */
  slicesLive: number;
  pinning: Pinning;
};

/**
 * The assumption a share depends on and this page cannot know.
 *
 * A node's share is its weight over the sum of every eligible node's weight,
 * so it is not computable from one operator's inputs alone — no arrangement
 * of the arithmetic makes it so. The choice is to invent a network size and
 * present the result as a forecast, or to make the assumption the reader's
 * own and label every figure derived from it. This type exists so the second
 * is the only option the UI has.
 */
export type NetworkAssumption = {
  /** Eligible nodes besides yours. */
  peerCount: number;
  /** What each of them is assumed to have staked, in whole OPEN. */
  peerStakeOpen: number;
  /** The quality multiplier assumed for each of them, in basis points. */
  peerQualityBps: bigint;
};

/** `PeerLiveness::availability_bps`: the share of slices, floored. */
export function availabilityBps(slicesLive: number): bigint {
  const seen = BigInt(
    Math.max(0, Math.min(slicesLive, Number(AVAILABILITY_BUCKETS))),
  );
  return (seen * BPS_DENOMINATOR) / AVAILABILITY_BUCKETS;
}

export function connectivityBps(connectivity: Connectivity): bigint {
  return connectivity === "rpc"
    ? CONNECTIVITY_RPC_BPS
    : CONNECTIVITY_GOSSIP_BPS;
}

export function pinningBps(pinning: Pinning): bigint {
  return pinning === "serving" ? PINNING_SERVING_BPS : PINNING_ABSENT_BPS;
}

/**
 * The three service multipliers collapsed into one, exactly as
 * `schedule.rs::compute` does it:
 *
 *     quality_bps = c * a * p / (BPS_DENOMINATOR * BPS_DENOMINATOR)
 *
 * Collapsing before the stake is met is not a rearrangement for readability
 * in the crate — a raw four-way product of a stake and three basis-point
 * terms overflows u128 once emission is applied. Reproduced here in the same
 * order so this page and the crate floor at the same places and agree to the
 * base unit.
 *
 * The result is always in `0..=BPS_DENOMINATOR`, which is the invariant
 * described on {@link MAX_QUALITY_BPS}.
 */
export function qualityBps(profile: NodeProfile): bigint {
  return (
    (connectivityBps(profile.connectivity) *
      availabilityBps(profile.slicesLive) *
      pinningBps(profile.pinning)) /
    (BPS_DENOMINATOR * BPS_DENOMINATOR)
  );
}

/** Whether `schedule.rs` would let this node into the weighting at all. */
export function isEligible(profile: NodeProfile): boolean {
  return BigInt(Math.floor(profile.stakeOpen)) >= MIN_STAKE_OPEN;
}

/** `effective_stake * quality_bps`, in base units × bps. */
export function weightOf(profile: NodeProfile): bigint {
  if (!isEligible(profile)) return 0n;
  return BigInt(Math.floor(profile.stakeOpen)) * OPEN * qualityBps(profile);
}

export type EpochOutcome = {
  /** This node's collapsed quality multiplier, in basis points. */
  qualityBps: bigint;
  /** Its weight, and the whole network's, so a reader can check the ratio. */
  weight: bigint;
  totalWeight: bigint;
  /** Base units of OPEN for one epoch, under the stated assumption. */
  amount: bigint;
  /**
   * False when the node is below the stake floor, unregistered, or scored
   * zero quality — in which case it earns nothing at all rather than a small
   * amount, and the UI has to say which.
   */
  eligible: boolean;
};

/**
 * One epoch's outcome for one node, under an explicit network assumption.
 *
 * `emission` is `min(per_epoch_emission, bootstrap_remaining)` in the crate.
 * Here it is always the full per-epoch figure: this page models a network
 * during the bootstrap, and the day the bucket empties is a change of régime
 * the page states in words rather than a slider position.
 */
export function computeEpoch(
  profile: NodeProfile,
  network: NetworkAssumption,
): EpochOutcome {
  const quality = qualityBps(profile);
  const weight = weightOf(profile);

  const peerWeight =
    BigInt(Math.max(0, Math.floor(network.peerCount))) *
    BigInt(Math.max(0, Math.floor(network.peerStakeOpen))) *
    OPEN *
    network.peerQualityBps;
  const totalWeight = weight + peerWeight;

  if (weight === 0n || totalWeight === 0n) {
    return {
      qualityBps: quality,
      weight,
      totalWeight,
      amount: 0n,
      eligible: false,
    };
  }

  return {
    qualityBps: quality,
    weight,
    totalWeight,
    amount: (PER_EPOCH_EMISSION * weight) / totalWeight,
    eligible: true,
  };
}

/**
 * The four quality outcomes at full availability, which is the whole of what
 * the two binary factors can do.
 *
 * Worth showing as a matrix rather than prose because it carries a result
 * that is not obvious from the individual numbers: a gossip-only node that
 * pins (0.40) still earns less than an RPC node that pins nothing (0.70).
 * Pinning is a premium on top of a chain connection, never a substitute for
 * one. `schedule.rs` asserts exactly this.
 */
export const QUALITY_MATRIX: {
  connectivity: Connectivity;
  pinning: Pinning;
  bps: bigint;
}[] = (["rpc", "gossip"] as const).flatMap((connectivity) =>
  (["serving", "absent"] as const).map((pinning) => ({
    connectivity,
    pinning,
    bps:
      (connectivityBps(connectivity) * BPS_DENOMINATOR * pinningBps(pinning)) /
      (BPS_DENOMINATOR * BPS_DENOMINATOR),
  })),
);

/** Basis points as a plain multiplier, e.g. 7000n -> "0.70". */
export function formatMultiplier(bps: bigint): string {
  return (Number(bps) / Number(BPS_DENOMINATOR)).toFixed(2);
}

/** Basis points as a percentage, e.g. 4583n -> "45.8%". */
export function formatBpsPercent(bps: bigint): string {
  return `${(Number(bps) / 100).toFixed(1)}%`;
}

/**
 * Base units as OPEN, at a precision that matches how much the figure can be
 * trusted. Two decimals on a daily amount; none once it is annualised, where
 * the assumption behind it is worth far more than a hundredth of a token.
 */
export function formatOpen(baseUnits: bigint, fractionDigits = 2): string {
  const scale = 10 ** OPEN_DECIMALS;
  return (Number(baseUnits) / scale).toLocaleString("en-US", {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

/** A node's share of the epoch's pool, in basis points of that pool. */
export function shareBps(outcome: EpochOutcome): bigint {
  if (outcome.totalWeight === 0n) return 0n;
  return (outcome.weight * BPS_DENOMINATOR) / outcome.totalWeight;
}
