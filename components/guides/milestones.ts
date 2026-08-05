import type { PathMilestone, StandaloneKey } from "@/lib/guides";
import { getGuide } from "@/lib/guides";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath, localize } from "@/lib/i18n";

/**
 * Turns a path milestone into everything a page needs to render it: title,
 * locale-prefixed href, one line of meta, and the progress-tracking key.
 * Shared by the index (milestone chains) and the detail page (path strip,
 * prev/next) so the two never disagree about what a stop is called.
 */

const STANDALONE: Record<StandaloneKey, { href: string }> = {
  runNode: { href: "/run-a-node" },
  becomeArbitrator: { href: "/become-an-arbitrator" },
};

export type ResolvedMilestone = {
  key: string;
  title: string;
  /** Locale-prefixed site path. */
  href: string;
  /** "8 steps" for a guide, "Standalone page" otherwise. */
  meta: string;
  /** Present only for guides — the localStorage progress key. */
  slug?: string;
  stepIds: string[];
};

export function resolveMilestone(
  milestone: PathMilestone,
  t: Dictionary,
  locale: Locale,
): ResolvedMilestone {
  if (milestone.kind === "standalone") {
    return {
      key: milestone.key,
      title: t.guides.standalone[milestone.key].title,
      href: localePath(STANDALONE[milestone.key].href, locale),
      meta: t.guides.standalonePage,
      stepIds: [],
    };
  }
  const guide = getGuide(milestone.slug);
  // A path naming a slug that does not exist is a authoring error; fail the
  // build loudly rather than rendering a broken stop.
  if (!guide)
    throw new Error(`Path milestone names unknown guide "${milestone.slug}"`);
  return {
    key: guide.slug,
    title: localize(guide.title, locale),
    href: localePath(`/guides/${guide.slug}`, locale),
    meta: t.guides.stepsMeta(guide.steps.length),
    slug: guide.slug,
    stepIds: guide.steps.map((step) => step.id),
  };
}
