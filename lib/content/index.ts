import { readFileSync } from "node:fs";
import { join } from "node:path";
import { type CrossRefResolver, renderMarkdown } from "./markdown";
import type { Chapter, ContentBundle, Spec } from "./types";

export type { Chapter, Spec, SpecMeta, TocEntry } from "./types";

const BUNDLE_PATH = join(process.cwd(), "content/.generated/content.json");

let cached: ContentBundle | null = null;

function bundle(): ContentBundle {
  if (cached) return cached;
  try {
    cached = JSON.parse(readFileSync(BUNDLE_PATH, "utf8")) as ContentBundle;
  } catch (error) {
    throw new Error(
      `Whitepaper content is missing. Run "pnpm run content" first. (${(error as Error).message})`,
    );
  }
  return cached;
}

export function getChapters(): Chapter[] {
  return bundle().chapters;
}

export function getSpecs(): Spec[] {
  return bundle().specs;
}

export function getChapter(slug: string): Chapter | null {
  return getChapters().find((c) => c.slug === slug) ?? null;
}

export function getSpec(slug: string): Spec | null {
  return getSpecs().find((s) => s.slug === slug) ?? null;
}

export function contentRef(): string {
  return bundle().ref;
}

/**
 * Three pairs of chapters cover substantially the same ground. Both stay
 * readable, but each pair declares one canonical URL so search engines
 * consolidate on a single page instead of splitting signal between two.
 *
 * Keyed by the duplicate's chapter number, valued by the canonical's.
 */
const CANONICAL_TWINS: Record<number, number> = {
  23: 13, // "The OPEN Token Economy" -> "The OpenFiat Token Economy"
  17: 5, // "The OpenFiat Network" -> "The OpenFiat Network Protocol (OFNP)"
  24: 12, // "Governance & Protocol Evolution" -> "The OpenFiat Governance Protocol"
};

export type TwinRelation = {
  /** The chapter this one defers to, if any. */
  canonical: Chapter | null;
  /** The chapter that defers to this one, if any. */
  deferring: Chapter | null;
};

export function twinFor(chapter: Chapter): TwinRelation {
  const canonicalOrder = CANONICAL_TWINS[chapter.order];
  const deferringOrder = Object.entries(CANONICAL_TWINS).find(
    ([, target]) => target === chapter.order,
  )?.[0];

  return {
    canonical: canonicalOrder ? chapterByOrder(canonicalOrder) : null,
    deferring: deferringOrder
      ? chapterByOrder(Number.parseInt(deferringOrder, 10))
      : null,
  };
}

export function chapterByOrder(order: number): Chapter | null {
  return getChapters().find((c) => c.order === order) ?? null;
}

export function chapterHref(chapter: Chapter): string {
  return `/whitepaper/${chapter.slug}`;
}

export function specHref(spec: Spec): string {
  return `/specs/${spec.slug}`;
}

/** Chapters read in order; specs are ordered by number. */
export function neighbours<T extends { slug: string }>(
  list: T[],
  slug: string,
): { previous: T | null; next: T | null } {
  const index = list.findIndex((item) => item.slug === slug);
  if (index === -1) return { previous: null, next: null };
  return {
    previous: list[index - 1] ?? null,
    next: list[index + 1] ?? null,
  };
}

/** Resolves plaintext cross-references, guarding against unwritten specs. */
export function resolver(): CrossRefResolver {
  const specSlugs = new Set(getSpecs().map((s) => s.id));
  return {
    spec: (id) => (specSlugs.has(id) ? `/specs/${id.toLowerCase()}` : null),
    chapter: (order) => {
      const chapter = chapterByOrder(order);
      return chapter ? chapterHref(chapter) : null;
    },
  };
}

export async function renderChapter(chapter: Chapter) {
  return renderMarkdown(chapter.body, { resolver: resolver() });
}

export async function renderSpec(spec: Spec) {
  return renderMarkdown(spec.body, { resolver: resolver(), normative: true });
}

/** Groups specs by the layer families declared in OFS-0000. */
export function specsByFamily(): { family: string; specs: Spec[] }[] {
  const groups = new Map<string, Spec[]>();
  for (const spec of getSpecs()) {
    const list = groups.get(spec.family) ?? [];
    list.push(spec);
    groups.set(spec.family, list);
  }
  return [...groups.entries()].map(([family, specs]) => ({ family, specs }));
}
