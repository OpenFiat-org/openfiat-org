import { DEFAULT_LOCALE, LOCALES, LOCALE_META } from "@/lib/i18n/config";
import { allRoutes } from "@/lib/routes";
import { SITE } from "@/lib/site";
import type { MetadataRoute } from "next";

/**
 * One entry per locale per route, each declaring its alternates so crawlers
 * can see the translations rather than treating them as duplicates.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = allRoutes();

  return routes.flatMap((route) =>
    LOCALES.map((locale) => {
      const languages: Record<string, string> = {};
      for (const other of LOCALES) {
        languages[LOCALE_META[other].htmlLang] =
          `${SITE.url}/${other}${route.path === "/" ? "" : route.path}`;
      }
      languages["x-default"] =
        `${SITE.url}/${DEFAULT_LOCALE}${route.path === "/" ? "" : route.path}`;

      return {
        url: `${SITE.url}/${locale}${route.path === "/" ? "" : route.path}`,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
        alternates: { languages },
      };
    }),
  );
}
