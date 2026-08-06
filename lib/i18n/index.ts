import { LOCALES, type Locale, localePath } from "./config";
import { mergeContent, mergeDictionary } from "./deep-merge";
import { ar } from "./dictionaries/ar";
import { arContent } from "./dictionaries/ar-content";
import { type Dictionary, en } from "./dictionaries/en";
import { type ContentDictionary, enContent } from "./dictionaries/en-content";
import { es } from "./dictionaries/es";
import { esContent } from "./dictionaries/es-content";
import { fr } from "./dictionaries/fr";
import { frContent } from "./dictionaries/fr-content";
import { UI_PARTIALS } from "./dictionaries/partials";
import { ptBR } from "./dictionaries/pt-BR";
import { ptBRContent } from "./dictionaries/pt-BR-content";
import { zh } from "./dictionaries/zh";
import { zhContent } from "./dictionaries/zh-content";

/**
 * Locales with a complete, hand-written dictionary (not a partial merged over
 * English). These are the "full coverage" languages; a locale absent here uses
 * its `UI_PARTIALS` entry merged onto English, or plain English if it has none.
 */
const FULL_DICTIONARIES: Partial<Record<Locale, Dictionary>> = {
  en,
  zh,
  es,
  ar,
  fr,
  "pt-BR": ptBR,
};

/** Locales with complete long-form content. Absent here → English content. */
const FULL_CONTENT: Partial<Record<Locale, ContentDictionary>> = {
  en: enContent,
  zh: zhContent,
  es: esContent,
  ar: arContent,
  fr: frContent,
  "pt-BR": ptBRContent,
};

export {
  DEFAULT_LOCALE,
  type Direction,
  directionFor,
  isLocale,
  LOCALE_META,
  LOCALES,
  type Locale,
  localePath,
  stripLocale,
} from "./config";
export type { Dictionary } from "./dictionaries/en";
export type { ActorCopy, ContentDictionary } from "./dictionaries/en-content";

/**
 * Every locale's dictionary, resolved once at module load. English and Chinese
 * are complete and used as-is; every other locale is English with its partial
 * translations (`UI_PARTIALS`) merged on top, so a missing key renders in
 * English rather than crashing the build. Long-form content is not yet
 * translated for the new locales, so it falls back wholesale to English.
 */
const DICTIONARIES = Object.fromEntries(
  LOCALES.map((locale) => {
    const full = FULL_DICTIONARIES[locale];
    if (full) return [locale, full];
    return [locale, mergeDictionary(en, UI_PARTIALS[locale] ?? {})];
  }),
) as Record<Locale, Dictionary>;

const CONTENT = Object.fromEntries(
  LOCALES.map((locale) => {
    const full = FULL_CONTENT[locale];
    if (full) return [locale, full];
    return [locale, mergeContent(enContent, {})];
  }),
) as Record<Locale, ContentDictionary>;

/**
 * Dictionaries are plain modules rather than dynamic imports: the whole set is
 * a few kilobytes of strings, every page is statically rendered anyway, and
 * synchronous access keeps server components simple.
 */
export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}

/** Long-form page content: role descriptions, node guide, sale details. */
export function getContent(locale: Locale): ContentDictionary {
  return CONTENT[locale];
}

/**
 * Returns a locale-aware link builder. Passing this down is more reliable than
 * a context, because most pages here are server components.
 */
export function linker(locale: Locale) {
  return (path: string) => localePath(path, locale);
}

/**
 * Reads a per-locale value, falling back to English for a locale it does not
 * carry — the page-data analogue of the dictionary's per-key fallback. Data
 * like the fee tables and guides is typed as `{ en: T } & Partial<...>`, so a
 * locale that has not translated a row still renders its English text rather
 * than `undefined`.
 */
export function localize<T>(
  value: { en: T } & Partial<Record<Locale, T>>,
  locale: Locale,
): T {
  return value[locale] ?? value.en;
}
