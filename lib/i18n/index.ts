import { type Locale, localePath } from "./config";
import { type Dictionary, en } from "./dictionaries/en";
import { type ContentDictionary, enContent } from "./dictionaries/en-content";
import { zh } from "./dictionaries/zh";
import { zhContent } from "./dictionaries/zh-content";

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

const DICTIONARIES: Record<Locale, Dictionary> = { en, zh };
const CONTENT: Record<Locale, ContentDictionary> = {
  en: enContent,
  zh: zhContent,
};

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
