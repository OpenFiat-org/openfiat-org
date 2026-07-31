import type { Metadata, Viewport } from "next";
import { JetBrains_Mono, Plus_Jakarta_Sans } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import {
  DEFAULT_LOCALE,
  directionFor,
  getDictionary,
  isLocale,
  LOCALE_META,
  LOCALES,
  type Locale,
} from "@/lib/i18n";
import { SITE } from "@/lib/site";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-plus-jakarta",
  weight: ["400", "500", "600", "700", "800"],
});

/* Needs full box-drawing coverage for the figures the parser declines. */
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

/**
 * Matches --color-bg so mobile browser chrome does not flash light, and
 * declares the dark scheme before any CSS parses.
 */
export const viewport: Viewport = {
  themeColor: "#0a0e14",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : DEFAULT_LOCALE;
  const t = getDictionary(locale);

  // hreflang for every locale plus x-default, so crawlers can choose.
  const languages: Record<string, string> = {};
  for (const other of LOCALES) {
    languages[LOCALE_META[other].htmlLang] = `/${other}`;
  }
  languages["x-default"] = `/${DEFAULT_LOCALE}`;

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} — ${t.meta.tagline}`,
      template: `%s · ${SITE.name}`,
    },
    description: t.meta.description,
    applicationName: SITE.name,
    alternates: { canonical: `/${locale}`, languages },
    openGraph: {
      type: "website",
      siteName: SITE.name,
      url: `/${locale}`,
      title: `${SITE.name} — ${t.meta.tagline}`,
      description: t.meta.description,
      locale: LOCALE_META[locale].ogLocale,
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE.name} — ${t.meta.tagline}`,
      description: t.meta.description,
    },
    robots: { index: true, follow: true },
    icons: {
      icon: [
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
        { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
        { url: "/favicon.ico", sizes: "any" },
      ],
      apple: "/apple-touch-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);

  /*
   * Inline background on <html> and <body>: the globals.css rule only
   * applies once the external stylesheet has arrived, and not every
   * engine paints a dark pre-CSS canvas from the color-scheme meta
   * (WebKit keeps it white). An inline style applies the moment the
   * parser creates the element, so no white frame can appear between
   * navigations or before first paint on a cold load.
   */
  return (
    <html
      lang={LOCALE_META[locale].htmlLang}
      dir={directionFor(locale)}
      className={`${plusJakarta.variable} ${jetbrainsMono.variable} h-full antialiased`}
      style={{ backgroundColor: "#0a0e14", colorScheme: "dark" }}
    >
      <body
        className="min-h-full bg-bg antialiased"
        style={{ backgroundColor: "#0a0e14" }}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:z-50 focus:rounded-sm focus:bg-surface focus:px-4 focus:py-2 focus:font-mono focus:text-sm focus:text-ink focus:start-4"
        >
          {t.nav.skipToContent}
        </a>
        <Nav locale={locale} />
        <main id="main">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
