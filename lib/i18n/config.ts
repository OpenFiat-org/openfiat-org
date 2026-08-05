/**
 * Locale configuration.
 *
 * Every locale is prefixed, including the default. That keeps hreflang
 * unambiguous and means adding a language later never changes an existing
 * URL. `/` negotiates and redirects in middleware.
 */
export const LOCALES = [
  "en",
  "zh",
  "es",
  "hi",
  "pt-BR",
  "bn",
  "ru",
  "ja",
  "vi",
  "tr",
  "mr",
  "te",
  "ko",
  "fr",
  "ta",
  "de",
  "it",
  "gu",
  "pa",
  "th",
  "id",
  "pl",
  "uk",
  "kn",
  "ar",
  "ur",
  "fa",
] as const;

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
  es: {
    label: "Español",
    englishLabel: "Spanish",
    htmlLang: "es",
    ogLocale: "es_ES",
    dir: "ltr",
  },
  hi: {
    label: "हिन्दी",
    englishLabel: "Hindi",
    htmlLang: "hi",
    ogLocale: "hi_IN",
    dir: "ltr",
  },
  "pt-BR": {
    label: "Português (Brasil)",
    englishLabel: "Portuguese (Brazil)",
    htmlLang: "pt-BR",
    ogLocale: "pt_BR",
    dir: "ltr",
  },
  bn: {
    label: "বাংলা",
    englishLabel: "Bengali",
    htmlLang: "bn",
    ogLocale: "bn_BD",
    dir: "ltr",
  },
  ru: {
    label: "Русский",
    englishLabel: "Russian",
    htmlLang: "ru",
    ogLocale: "ru_RU",
    dir: "ltr",
  },
  ja: {
    label: "日本語",
    englishLabel: "Japanese",
    htmlLang: "ja",
    ogLocale: "ja_JP",
    dir: "ltr",
  },
  vi: {
    label: "Tiếng Việt",
    englishLabel: "Vietnamese",
    htmlLang: "vi",
    ogLocale: "vi_VN",
    dir: "ltr",
  },
  tr: {
    label: "Türkçe",
    englishLabel: "Turkish",
    htmlLang: "tr",
    ogLocale: "tr_TR",
    dir: "ltr",
  },
  mr: {
    label: "मराठी",
    englishLabel: "Marathi",
    htmlLang: "mr",
    ogLocale: "mr_IN",
    dir: "ltr",
  },
  te: {
    label: "తెలుగు",
    englishLabel: "Telugu",
    htmlLang: "te",
    ogLocale: "te_IN",
    dir: "ltr",
  },
  ko: {
    label: "한국어",
    englishLabel: "Korean",
    htmlLang: "ko",
    ogLocale: "ko_KR",
    dir: "ltr",
  },
  fr: {
    label: "Français",
    englishLabel: "French",
    htmlLang: "fr",
    ogLocale: "fr_FR",
    dir: "ltr",
  },
  ta: {
    label: "தமிழ்",
    englishLabel: "Tamil",
    htmlLang: "ta",
    ogLocale: "ta_IN",
    dir: "ltr",
  },
  de: {
    label: "Deutsch",
    englishLabel: "German",
    htmlLang: "de",
    ogLocale: "de_DE",
    dir: "ltr",
  },
  it: {
    label: "Italiano",
    englishLabel: "Italian",
    htmlLang: "it",
    ogLocale: "it_IT",
    dir: "ltr",
  },
  gu: {
    label: "ગુજરાતી",
    englishLabel: "Gujarati",
    htmlLang: "gu",
    ogLocale: "gu_IN",
    dir: "ltr",
  },
  pa: {
    label: "ਪੰਜਾਬੀ",
    englishLabel: "Punjabi",
    htmlLang: "pa",
    ogLocale: "pa_IN",
    dir: "ltr",
  },
  th: {
    label: "ไทย",
    englishLabel: "Thai",
    htmlLang: "th",
    ogLocale: "th_TH",
    dir: "ltr",
  },
  id: {
    label: "Bahasa Indonesia",
    englishLabel: "Indonesian",
    htmlLang: "id",
    ogLocale: "id_ID",
    dir: "ltr",
  },
  pl: {
    label: "Polski",
    englishLabel: "Polish",
    htmlLang: "pl",
    ogLocale: "pl_PL",
    dir: "ltr",
  },
  uk: {
    label: "Українська",
    englishLabel: "Ukrainian",
    htmlLang: "uk",
    ogLocale: "uk_UA",
    dir: "ltr",
  },
  kn: {
    label: "ಕನ್ನಡ",
    englishLabel: "Kannada",
    htmlLang: "kn",
    ogLocale: "kn_IN",
    dir: "ltr",
  },
  ar: {
    label: "العربية",
    englishLabel: "Arabic",
    htmlLang: "ar",
    ogLocale: "ar_AR",
    dir: "rtl",
  },
  ur: {
    label: "اردو",
    englishLabel: "Urdu",
    htmlLang: "ur",
    ogLocale: "ur_PK",
    dir: "rtl",
  },
  fa: {
    label: "فارسی",
    englishLabel: "Persian",
    htmlLang: "fa",
    ogLocale: "fa_IR",
    dir: "rtl",
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
