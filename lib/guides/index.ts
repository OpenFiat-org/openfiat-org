import { becomeAMerchant } from "./become-a-merchant";
import { buildOnOpenfiat } from "./build-on-openfiat";
import { makeYourFirstTrade } from "./make-your-first-trade";
import { runANotificationGateway } from "./run-a-notification-gateway";
import { runAnOracleProvider } from "./run-an-oracle-provider";
import { stakeOpen } from "./stake-open";
import type { Guide } from "./types";
import { voteOnAProposal } from "./vote-on-a-proposal";

export type {
  GuidePath,
  PathId,
  PathMilestone,
  StandaloneKey,
} from "./paths";
export { GUIDE_PATHS, pathForMilestone } from "./paths";
export type { Guide, GuideGroup, GuideStep } from "./types";

/**
 * Every guide rendered under `/guides/<slug>`.
 *
 * `/run-a-node` and `/become-an-arbitrator` are deliberately not here: both
 * predate this module, live at their own top-level URLs, and carry
 * page-specific sections (hosting offers, a ports table) that the generic
 * renderer has no business growing a special case for. The paths in
 * `paths.ts` place them as milestones alongside these, so a reader sees one
 * journey either way.
 */
export const GUIDES: Guide[] = [
  makeYourFirstTrade,
  becomeAMerchant,
  stakeOpen,
  voteOnAProposal,
  runAnOracleProvider,
  runANotificationGateway,
  buildOnOpenfiat,
];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}
