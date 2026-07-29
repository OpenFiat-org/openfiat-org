import { becomeAMerchant } from "./become-a-merchant";
import { buildOnOpenfiat } from "./build-on-openfiat";
import { makeYourFirstTrade } from "./make-your-first-trade";
import { runANotificationGateway } from "./run-a-notification-gateway";
import { runAnOracleProvider } from "./run-an-oracle-provider";
import { stakeOpen } from "./stake-open";
import type { Guide, GuideGroup } from "./types";
import { voteOnAProposal } from "./vote-on-a-proposal";

export type { Guide, GuideGroup, GuideStep } from "./types";

/**
 * Every guide rendered under `/guides/<slug>`, in the order they appear on the
 * index within their group.
 *
 * `/run-a-node` and `/become-an-arbitrator` are deliberately not here: both
 * predate this module, live at their own top-level URLs, and carry
 * page-specific sections (hosting offers, a ports table) that the generic
 * renderer has no business growing a special case for. The index links to
 * them alongside these, so a reader sees one list either way.
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

export const GUIDE_GROUPS: GuideGroup[] = ["trade", "operate", "build"];

export function getGuide(slug: string): Guide | undefined {
  return GUIDES.find((guide) => guide.slug === slug);
}

export function guidesInGroup(group: GuideGroup): Guide[] {
  return GUIDES.filter((guide) => guide.group === group);
}
