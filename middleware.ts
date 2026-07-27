import { type NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE, isLocale, LOCALES } from "@/lib/i18n/config";

/**
 * Sends locale-less URLs to a locale.
 *
 * Preference order: an explicit choice remembered in a cookie, then the
 * browser's Accept-Language, then English. The cookie is set by the language
 * switcher, so a visitor who picks a language keeps it.
 */
const COOKIE = "openfiat-locale";

function negotiate(request: NextRequest) {
  const chosen = request.cookies.get(COOKIE)?.value;
  if (chosen && isLocale(chosen)) return chosen;

  const header = request.headers.get("accept-language");
  if (header) {
    const ranked = header
      .split(",")
      .map((part) => {
        const [tag, q] = part.trim().split(";q=");
        return { tag: tag.toLowerCase(), q: q ? Number(q) : 1 };
      })
      .sort((a, b) => b.q - a.q);

    for (const { tag } of ranked) {
      // Match zh, zh-CN, zh-Hans-CN and so on against our locale list.
      const base = tag.split("-")[0];
      const match = LOCALES.find((locale) => locale === base);
      if (match) return match;
    }
  }

  return DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const first = pathname.split("/").filter(Boolean)[0];
  if (first && isLocale(first)) return NextResponse.next();

  const locale = negotiate(request);
  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  url.search = search;

  return NextResponse.redirect(url);
}

export const config = {
  // Everything except Next internals, the metadata routes and public files.
  matcher: [
    "/((?!_next/|api/|sitemap.xml|robots.txt|favicon|apple-touch-icon|android-chrome|logo|site.webmanifest|.*\\.(?:png|jpg|jpeg|svg|ico|webp|txt|xml|pdf)).*)",
  ],
};
