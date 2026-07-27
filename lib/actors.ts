/**
 * The ten participant roles, in the order a reader should meet them:
 * the two anyone starts as, then the provider roles, then builders.
 *
 * Spec references are the documents that actually govern each role. Stake
 * facts are deliberately per-role because they differ — node staking is
 * optional per OFS-1600, and risk intelligence providers have no stated stake
 * at all. Nothing here assumes a uniform "everyone stakes" story.
 */
export type ActorSlug =
  | "buyers"
  | "merchants"
  | "node-operators"
  | "arbitrators"
  | "notification-gateways"
  | "oracle-providers"
  | "snapshot-providers"
  | "risk-intelligence-providers"
  | "bootstrap-nodes"
  | "developers";

export type StakeKind =
  | "required"
  | "optional"
  | "per-case"
  | "none"
  | "unstated";

export type Actor = {
  slug: ActorSlug;
  /** Which OFS documents govern this role. */
  specs: string[];
  stakeKind: StakeKind;
  /** Groups the role on the hub page. */
  group: "participants" | "providers" | "builders";
};

export const ACTORS: Actor[] = [
  {
    slug: "buyers",
    specs: ["OFS-2000", "OFS-2200", "OFS-2300", "OFS-2400", "OFS-5000"],
    stakeKind: "none",
    group: "participants",
  },
  {
    slug: "merchants",
    specs: ["OFS-2100", "OFS-2000", "OFS-2200", "OFS-2300", "OFS-3000"],
    stakeKind: "required",
    group: "participants",
  },
  {
    slug: "node-operators",
    specs: [
      "OFS-1000",
      "OFS-1100",
      "OFS-1200",
      "OFS-1300",
      "OFS-1500",
      "OFS-1600",
    ],
    stakeKind: "required",
    group: "providers",
  },
  {
    slug: "arbitrators",
    specs: ["OFS-2400", "OFS-3000", "OFS-4000"],
    stakeKind: "per-case",
    group: "providers",
  },
  {
    slug: "notification-gateways",
    specs: ["OFS-6000", "OFS-1500"],
    stakeKind: "required",
    group: "providers",
  },
  {
    slug: "oracle-providers",
    specs: ["OFS-7000", "OFS-1500", "OFS-2100"],
    stakeKind: "required",
    group: "providers",
  },
  {
    slug: "snapshot-providers",
    specs: ["OFS-1300", "OFS-1500"],
    stakeKind: "required",
    group: "providers",
  },
  {
    slug: "risk-intelligence-providers",
    specs: ["OFS-7100", "OFS-1500"],
    stakeKind: "unstated",
    group: "providers",
  },
  {
    slug: "bootstrap-nodes",
    specs: ["OFS-1100", "OFS-1000", "OFS-1500"],
    stakeKind: "none",
    group: "providers",
  },
  {
    slug: "developers",
    specs: ["OFS-0000"],
    stakeKind: "none",
    group: "builders",
  },
];

export function getActor(slug: string): Actor | null {
  return ACTORS.find((actor) => actor.slug === slug) ?? null;
}

export const ACTOR_GROUPS = ["participants", "providers", "builders"] as const;
