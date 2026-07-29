import type { Locale } from "@/lib/i18n";

/**
 * A guide is one self-contained module rather than another block in the
 * locale dictionaries.
 *
 * The dictionaries are shared by every page, so adding a guide there means
 * editing four large files that nothing else about the guide touches — and
 * two guides being written at once collide in exactly those files. Keeping
 * each guide's own copy, in every locale, next to its own commands means a
 * new guide is one new file plus one line in `index.ts`.
 *
 * Localization keeps the same guarantee the dictionaries give: `Localized`
 * requires every locale, so a guide that forgets a translation fails the
 * build rather than silently falling back to English.
 */
export type Localized<T> = Record<Locale, T>;

export type GuideCode = {
  code: string;
  /** Shown as the block's header — a real path or filename, not a language. */
  filename?: string;
};

export type GuideStep = {
  /** Anchor id; also the JSON-LD step url fragment. Keep it stable. */
  id: string;
  title: Localized<string>;
  body: Localized<string>;
  /** Commands are language-independent, so they are not localized. */
  code?: GuideCode[];
};

/** Which shelf a guide sits on in the index. */
export type GuideGroup = "trade" | "operate" | "build";

export type GuideLink = {
  /** Locale-relative site path (`/participate/merchants`) or absolute URL. */
  href: string;
  label: Localized<string>;
  external?: boolean;
};

export type Guide = {
  /** URL segment under `/guides/`. */
  slug: string;
  group: GuideGroup;
  title: Localized<string>;
  /** One line, shown on the index card. */
  summary: Localized<string>;
  /** The hero lede. */
  intro: Localized<string>;
  /** What a reader needs before starting. */
  requirements: Localized<string[]>;
  steps: GuideStep[];
  /** Where to go next: the role page, the governing spec, the app. */
  related?: GuideLink[];
};
