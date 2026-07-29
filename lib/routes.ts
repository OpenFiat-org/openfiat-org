import { ACTORS } from "./actors";
import { getChapters, getSpecs } from "./content";
import { GUIDES } from "./guides";

/**
 * Every locale-relative path the site publishes, with a crawl priority.
 * The sitemap is generated from this, so a new page is one edit away from
 * being indexed rather than being forgotten.
 */
export type SiteRoute = {
  path: string;
  priority: number;
  changeFrequency: "daily" | "weekly" | "monthly" | "yearly";
};

const STATIC_ROUTES: SiteRoute[] = [
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/how-it-works", priority: 0.95, changeFrequency: "monthly" },
  { path: "/trust", priority: 0.9, changeFrequency: "monthly" },
  { path: "/protocol", priority: 0.7, changeFrequency: "monthly" },
  { path: "/whitepaper", priority: 0.9, changeFrequency: "monthly" },
  { path: "/specs", priority: 0.9, changeFrequency: "monthly" },
  { path: "/participate", priority: 0.8, changeFrequency: "monthly" },
  { path: "/guides", priority: 0.85, changeFrequency: "monthly" },
  { path: "/run-a-node", priority: 0.8, changeFrequency: "monthly" },
  { path: "/become-an-arbitrator", priority: 0.8, changeFrequency: "monthly" },
  { path: "/sale", priority: 0.8, changeFrequency: "weekly" },
  { path: "/glossary", priority: 0.6, changeFrequency: "monthly" },
  { path: "/roadmap", priority: 0.6, changeFrequency: "monthly" },
  { path: "/downloads", priority: 0.5, changeFrequency: "monthly" },
  { path: "/documentation", priority: 0.5, changeFrequency: "monthly" },
  { path: "/foundation", priority: 0.4, changeFrequency: "yearly" },
  { path: "/community", priority: 0.4, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.4, changeFrequency: "weekly" },
  { path: "/press", priority: 0.3, changeFrequency: "yearly" },
  { path: "/careers", priority: 0.3, changeFrequency: "monthly" },
  { path: "/status", priority: 0.3, changeFrequency: "weekly" },
  { path: "/contact", priority: 0.3, changeFrequency: "yearly" },
  { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
  { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
];

export function allRoutes(): SiteRoute[] {
  return [
    ...STATIC_ROUTES,
    ...ACTORS.map((actor) => ({
      path: `/participate/${actor.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...GUIDES.map((guide) => ({
      path: `/guides/${guide.slug}`,
      priority: 0.8,
      changeFrequency: "monthly" as const,
    })),
    ...getChapters().map((chapter) => ({
      path: `/whitepaper/${chapter.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
    ...getSpecs().map((spec) => ({
      path: `/specs/${spec.slug}`,
      priority: 0.7,
      changeFrequency: "monthly" as const,
    })),
  ];
}
