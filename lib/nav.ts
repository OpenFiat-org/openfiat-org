import type { Dictionary } from "./i18n";
import { SITE } from "./site";

/**
 * Navigation is defined by dictionary key rather than literal label, so a new
 * locale never has to touch this file.
 */
export type NavKey = keyof Dictionary["nav"];
export type FooterLinkKey = keyof Dictionary["footer"]["links"];
export type FooterColumnKey = keyof Dictionary["footer"]["columns"];

export const PRIMARY_NAV: { key: NavKey; href: string }[] = [
  { key: "howItWorks", href: "/how-it-works" },
  { key: "trust", href: "/trust" },
  { key: "actors", href: "/participate" },
  { key: "guides", href: "/guides" },
  { key: "fees", href: "/fees" },
  { key: "whitepaper", href: "/whitepaper" },
  { key: "runNode", href: "/run-a-node" },
];

/** Keys that render with a mark — see components/footer-icons.tsx. */
export type FooterIconKey = "github" | "discussions" | "discord" | "reddit";

export type FooterLink = {
  key: FooterLinkKey;
  href: string;
  /** Leaves the site: opens in a new tab and shows an outbound arrow. */
  external?: boolean;
  /** Draws the destination's own mark before the label. */
  icon?: FooterIconKey;
  /** Appends the "preview" qualifier, for destinations that are one. */
  preview?: boolean;
};

/**
 * The footer's columns.
 *
 * The same five headings order the footer of the app at app.openfiat.network,
 * so a link added to either site has an obvious home in the other: Protocol
 * is what the system is, Participate is how a person takes part, Network is
 * what is running, Project is who is behind it, Community is where people
 * talk.
 *
 * Every destination is a page that exists — an internal route with a file
 * under `app/[locale]`, or an external URL that has been requested and
 * answered. Nothing is listed because it is planned.
 */
export const FOOTER_COLUMNS: {
  titleKey: FooterColumnKey;
  links: FooterLink[];
}[] = [
  {
    titleKey: "protocol",
    links: [
      { key: "overview", href: "/protocol" },
      { key: "howItWorks", href: "/how-it-works" },
      { key: "trust", href: "/trust" },
      { key: "whitepaper", href: "/whitepaper" },
      { key: "specifications", href: "/specs" },
      { key: "glossary", href: "/glossary" },
      { key: "roadmap", href: "/roadmap" },
      { key: "fees", href: "/fees" },
    ],
  },
  {
    titleKey: "participate",
    links: [
      { key: "actors", href: "/participate" },
      { key: "merchants", href: "/participate/merchants" },
      { key: "nodeOperators", href: "/participate/node-operators" },
      { key: "developers", href: "/participate/developers" },
      { key: "guides", href: "/guides" },
      { key: "becomeArbitrator", href: "/become-an-arbitrator" },
      { key: "earn", href: "/earn" },
      { key: "sale", href: "/sale" },
    ],
  },
  {
    titleKey: "network",
    links: [
      { key: "runNode", href: "/run-a-node" },
      { key: "downloads", href: "/downloads" },
      { key: "documentation", href: "/documentation" },
      { key: "developerDocs", href: SITE.docsUrl, external: true },
      { key: "status", href: "/status" },
      // Every other link to the app is labelled a preview; so is this one.
      { key: "app", href: SITE.appUrl, external: true, preview: true },
    ],
  },
  {
    titleKey: "project",
    links: [
      { key: "foundation", href: "/foundation" },
      { key: "contribute", href: "/community" },
      { key: "blog", href: "/blog" },
      { key: "press", href: "/press" },
      { key: "careers", href: "/careers" },
      { key: "contact", href: "/contact" },
    ],
  },
  {
    /**
     * Four external destinations, not a row of every platform that exists.
     * OpenFiat holds no account on X, Telegram, YouTube or LinkedIn, so none
     * is listed — a footer link to a handle nobody owns is an invitation to
     * whoever registers it first.
     *
     * This replaces the separate icon row that sat under the wordmark: the
     * same destinations, once, with their names visible rather than left to
     * a glyph.
     */
    titleKey: "community",
    links: [
      { key: "github", href: SITE.githubOrg, external: true, icon: "github" },
      {
        key: "discussions",
        href: SITE.specsDiscussionsUrl,
        external: true,
        icon: "discussions",
      },
      { key: "discord", href: SITE.discord, external: true, icon: "discord" },
      { key: "reddit", href: SITE.subreddit, external: true, icon: "reddit" },
    ],
  },
];

export const LEGAL_NAV: { key: FooterLinkKey; href: string }[] = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
];
