import type { Localized } from "./types";

/**
 * Paths are how the guides section organises its material: instead of topic
 * shelves, every guide sits at an ordered position on a role journey, so a
 * reader answers "I want to be an operator" rather than guessing which of a
 * flat list applies to them. A path is a small piece of data plus its own
 * copy in every locale — same rule as the guides themselves: adding one is a
 * new entry here, not an edit to the shared dictionaries.
 *
 * The two standalone pages (`/run-a-node`, `/become-an-arbitrator`) sit on
 * the operator path as milestones without becoming `Guide`s — a reader
 * following the path should not have to know which stops happen to be built
 * from the shared renderer.
 */
export type PathId = "trader" | "operator" | "builder";

/** Keys into the dictionaries' `guides.standalone` entries. */
export type StandaloneKey = "runNode" | "becomeArbitrator";

export type PathMilestone =
  | { kind: "guide"; slug: string }
  | { kind: "standalone"; key: StandaloneKey; href: string };

export type GuidePath = {
  id: PathId;
  /** Short chip label — the role the path is for. */
  role: Localized<string>;
  title: Localized<string>;
  /** One line under the title on the index card. */
  pitch: Localized<string>;
  /** Ordered stops. Order is the curriculum; it is not alphabetical. */
  milestones: PathMilestone[];
};

export const GUIDE_PATHS: GuidePath[] = [
  {
    id: "trader",
    role: { en: "Trader", zh: "交易者" },
    title: { en: "Make and take offers", zh: "挂单与吃单" },
    pitch: {
      en: "From zero to a completed escrow trade, then the other side of the book if you want it.",
      zh: "从零完成第一笔托管交易；如果你愿意，再站到订单簿的另一侧。",
    },
    milestones: [
      { kind: "guide", slug: "make-your-first-trade" },
      { kind: "guide", slug: "become-a-merchant" },
    ],
  },
  {
    id: "operator",
    role: { en: "Operator", zh: "运营者" },
    title: { en: "Run the infrastructure", zh: "运行基础设施" },
    pitch: {
      en: "Stake first — everything here needs it — then run a node and take on the staked responsibilities: governance, arbitration, oracles, notifications.",
      zh: "先质押——这里的一切都以它为前提——然后运行节点，并承担需要质押的职责：治理、仲裁、预言机与通知。",
    },
    milestones: [
      { kind: "guide", slug: "stake-open" },
      { kind: "standalone", key: "runNode", href: "/run-a-node" },
      { kind: "guide", slug: "vote-on-a-proposal" },
      {
        kind: "standalone",
        key: "becomeArbitrator",
        href: "/become-an-arbitrator",
      },
      { kind: "guide", slug: "run-an-oracle-provider" },
      { kind: "guide", slug: "run-a-notification-gateway" },
    ],
  },
  {
    id: "builder",
    role: { en: "Builder", zh: "开发者" },
    title: { en: "Integrate the protocol", zh: "集成协议" },
    pitch: {
      en: "One end-to-end integration guide today; more paths as the SDK surface grows.",
      zh: "目前是一篇端到端的集成指南；随着 SDK 能力的扩展，会有更多路径。",
    },
    milestones: [{ kind: "guide", slug: "build-on-openfiat" }],
  },
];

/**
 * Where a milestone sits on its path: the path and its zero-based index.
 * Accepts either a guide slug or a standalone key, so the shared guide
 * renderer and the standalone pages (`/run-a-node`, `/become-an-arbitrator`)
 * can draw the same path strip. Returns undefined for a key no path claims —
 * callers treat that as "no strip, no prev/next" rather than an error.
 */
export function pathForMilestone(
  key: string,
): { path: GuidePath; index: number } | undefined {
  for (const path of GUIDE_PATHS) {
    const index = path.milestones.findIndex((milestone) =>
      milestone.kind === "guide"
        ? milestone.slug === key
        : milestone.key === key,
    );
    if (index !== -1) return { path, index };
  }
  return undefined;
}
