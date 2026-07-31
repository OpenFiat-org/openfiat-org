import { describe, expect, it } from "vitest";
import { getDictionary, LOCALES } from "@/lib/i18n";
import { FOOTER_COLUMNS, LEGAL_NAV } from "@/lib/nav";
import { allRoutes } from "@/lib/routes";
import { SITE } from "@/lib/site";

const allLinks = [
  ...FOOTER_COLUMNS.flatMap((column) => column.links),
  ...LEGAL_NAV,
];

/**
 * The external destinations the footer is allowed to name, each one checked
 * by hand before it was added here.
 *
 * A footer is among the most-crawled parts of a site, which makes it the
 * worst place to guess. Adding a URL to the footer without adding it here —
 * or adding one here without opening it — is what this list exists to make
 * awkward.
 */
const VERIFIED_EXTERNAL = new Set<string>([
  SITE.githubOrg, // the public org
  SITE.specsDiscussionsUrl, // repo Discussions; the org-level tab is not enabled
  SITE.docsUrl, // Docusaurus site, "OpenFiat Docs"
  SITE.appUrl, // the preview app
  SITE.discord, // invite resolves to a guild named OpenFiat
  SITE.subreddit, // r/openfiat
]);

describe("footer links", () => {
  it("points every internal link at a route the site publishes", () => {
    const published = new Set(allRoutes().map((route) => route.path));
    for (const link of allLinks) {
      if ("external" in link && link.external) continue;
      expect(published.has(link.href), link.href).toBe(true);
    }
  });

  it("names only external destinations that have been checked", () => {
    for (const link of allLinks) {
      if (!("external" in link) || !link.external) continue;
      expect(link.href.startsWith("https://"), link.href).toBe(true);
      expect(VERIFIED_EXTERNAL.has(link.href), link.href).toBe(true);
    }
  });

  it("keeps the OpenFiat Discord distinct from the hosting one", async () => {
    const { HOSTING } = await import("@/lib/hosting");
    expect(SITE.discord).not.toBe(HOSTING.discordUrl);
  });

  it("labels every link in every locale", () => {
    for (const locale of LOCALES) {
      const t = getDictionary(locale);
      for (const link of allLinks) {
        expect(
          t.footer.links[link.key]?.trim(),
          `${locale}/${link.key}`,
        ).toBeTruthy();
      }
      for (const column of FOOTER_COLUMNS) {
        expect(
          t.footer.columns[column.titleKey]?.trim(),
          `${locale}/${column.titleKey}`,
        ).toBeTruthy();
      }
    }
  });

  it("lists each destination once", () => {
    const hrefs = allLinks.map((link) => link.href);
    expect(new Set(hrefs).size).toBe(hrefs.length);
  });

  it("gives the app link the qualifier the rest of the site uses", () => {
    const app = allLinks.filter((link) => link.href === SITE.appUrl);
    expect(app, "the footer should link the app once").toHaveLength(1);
    expect(
      app.every((link) => "preview" in link && link.preview === true),
    ).toBe(SITE.appIsPreview);
  });
});
