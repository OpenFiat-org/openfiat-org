/**
 * Locale configuration.
 *
 * Every locale is prefixed, including the default. That keeps hreflang
 * unambiguous and means adding a language later never changes an existing
 * URL. `/` negotiates and redirects in middleware.
 */
export const LOCALES = ["en", "zh"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export type Direction = "ltr" | "rtl";

export const LOCALE_META: Record<
  Locale,
  {
    label: string;
    englishLabel: string;
    htmlLang: string;
    ogLocale: string;
    dir: Direction;
  }
> = {
  en: {
    label: "English",
    englishLabel: "English",
    htmlLang: "en",
    ogLocale: "en_US",
    dir: "ltr",
  },
  zh: {
    label: "简体中文",
    englishLabel: "Chinese (Simplified)",
    htmlLang: "zh-Hans",
    ogLocale: "zh_CN",
    dir: "ltr",
  },
};

/**
 * Sidebars sit on the start side, so they render left in left-to-right
 * languages and right in right-to-left ones. Layouts express this by putting
 * the sidebar first in DOM order and letting `dir` on <html> drive the flow,
 * rather than hard-coding a side.
 */
export function directionFor(locale: Locale): Direction {
  return LOCALE_META[locale].dir;
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** Prefixes a path with a locale, e.g. ("/specs", "zh") -> "/zh/specs". */
export function localePath(path: string, locale: Locale): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  return `/${locale}${clean}`;
}

/**
 * Strips the locale prefix from a pathname, returning the locale-independent
 * path. Used by the language switcher to stay on the current page.
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}
