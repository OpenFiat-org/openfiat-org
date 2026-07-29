import type { Dictionary } from "./i18n";
import { SITE } from "./site";

/**
 * Navigation is defined by dictionary key rather than literal label, so a new
 * locale never has to touch this file.
 */
export type NavKey = keyof Dictionary["nav"];
export type FooterLinkKey = keyof Dictionary["footer"]["links"];

export const PRIMARY_NAV: { key: NavKey; href: string }[] = [
  { key: "howItWorks", href: "/how-it-works" },
  { key: "trust", href: "/trust" },
  { key: "actors", href: "/participate" },
  { key: "whitepaper", href: "/whitepaper" },
  { key: "runNode", href: "/run-a-node" },
];

export const FOOTER_COLUMNS: {
  titleKey: keyof Dictionary["footer"]["columns"];
  links: { key: FooterLinkKey; href: string; external?: boolean }[];
}[] = [
  {
    titleKey: "protocol",
    links: [
      { key: "howItWorks", href: "/how-it-works" },
      { key: "trust", href: "/trust" },
      { key: "overview", href: "/protocol" },
      { key: "whitepaper", href: "/whitepaper" },
      { key: "specifications", href: "/specs" },
      { key: "glossary", href: "/glossary" },
      { key: "roadmap", href: "/roadmap" },
    ],
  },
  {
    titleKey: "participate",
    links: [
      { key: "actors", href: "/participate" },
      { key: "merchants", href: "/participate/merchants" },
      { key: "nodeOperators", href: "/participate/node-operators" },
      { key: "runNode", href: "/run-a-node" },
      { key: "becomeArbitrator", href: "/become-an-arbitrator" },
      { key: "sale", href: "/sale" },
    ],
  },
  {
    titleKey: "project",
    links: [
      { key: "foundation", href: "/foundation" },
      { key: "community", href: "/community" },
      { key: "blog", href: "/blog" },
      { key: "press", href: "/press" },
      { key: "careers", href: "/careers" },
    ],
  },
  {
    titleKey: "resources",
    links: [
      { key: "documentation", href: "/documentation" },
      { key: "developers", href: "/participate/developers" },
      { key: "downloads", href: "/downloads" },
      { key: "status", href: "/status" },
      { key: "github", href: SITE.githubOrg, external: true },
      { key: "contact", href: "/contact" },
    ],
  },
];

export const LEGAL_NAV: { key: FooterLinkKey; href: string }[] = [
  { key: "privacy", href: "/privacy" },
  { key: "terms", href: "/terms" },
];
