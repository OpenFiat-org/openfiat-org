import { ACTORS } from "@/lib/actors";
import {
  DEFAULT_LOCALE,
  LOCALES,
  LOCALE_META,
  getContent,
  getDictionary,
  isLocale,
  localePath,
  stripLocale,
} from "@/lib/i18n";
import { allRoutes } from "@/lib/routes";
import { describe, expect, it } from "vitest";

/** Walks two objects in parallel, collecting mismatched key paths. */
function compareShape(
  reference: unknown,
  candidate: unknown,
  path = "",
  problems: string[] = [],
): string[] {
  if (typeof reference === "function") {
    if (typeof candidate !== "function") {
      problems.push(`${path}: expected a function`);
    }
    return problems;
  }

  if (Array.isArray(reference)) {
    if (!Array.isArray(candidate)) {
      problems.push(`${path}: expected an array`);
      return problems;
    }
    if (reference.length !== candidate.length) {
      problems.push(
        `${path}: length ${candidate.length}, expected ${reference.length}`,
      );
    }
    reference.forEach((item, index) => {
      if (candidate[index] !== undefined) {
        compareShape(item, candidate[index], `${path}[${index}]`, problems);
      }
    });
    return problems;
  }

  if (reference !== null && typeof reference === "object") {
    if (candidate === null || typeof candidate !== "object") {
      problems.push(`${path}: expected an object`);
      return problems;
    }
    for (const key of Object.keys(reference as Record<string, unknown>)) {
      const next = path ? `${path}.${key}` : key;
      if (!(key in (candidate as Record<string, unknown>))) {
        problems.push(`${next}: missing`);
        continue;
      }
      compareShape(
        (reference as Record<string, unknown>)[key],
        (candidate as Record<string, unknown>)[key],
        next,
        problems,
      );
    }
    return problems;
  }

  if (typeof reference === "string") {
    if (typeof candidate !== "string") {
      problems.push(`${path}: expected a string`);
    } else if (candidate.trim() === "") {
      problems.push(`${path}: empty`);
    }
  }

  return problems;
}

describe("locale configuration", () => {
  it("includes the default locale", () => {
    expect(LOCALES).toContain(DEFAULT_LOCALE);
  });

  it("describes every locale", () => {
    for (const locale of LOCALES) {
      const meta = LOCALE_META[locale];
      expect(meta.label, locale).toBeTruthy();
      expect(meta.htmlLang, locale).toBeTruthy();
      expect(meta.ogLocale, locale).toBeTruthy();
      expect(["ltr", "rtl"]).toContain(meta.dir);
    }
  });

  it("round-trips paths through the locale prefix", () => {
    for (const locale of LOCALES) {
      expect(localePath("/", locale)).toBe(`/${locale}`);
      expect(localePath("/specs", locale)).toBe(`/${locale}/specs`);
      expect(stripLocale(localePath("/specs/ofs-1000", locale))).toBe(
        "/specs/ofs-1000",
      );
      expect(stripLocale(localePath("/", locale))).toBe("/");
    }
    expect(isLocale("klingon")).toBe(false);
  });
});

describe("translations", () => {
  it("every locale supplies the full UI dictionary", () => {
    const reference = getDictionary(DEFAULT_LOCALE);
    for (const locale of LOCALES) {
      if (locale === DEFAULT_LOCALE) continue;
      const problems = compareShape(reference, getDictionary(locale));
      expect(problems, `${locale}: ${problems.join(", ")}`).toEqual([]);
    }
  });

  it("every locale supplies the full content dictionary", () => {
    const reference = getContent(DEFAULT_LOCALE);
    for (const locale of LOCALES) {
      if (locale === DEFAULT_LOCALE) continue;
      const problems = compareShape(reference, getContent(locale));
      expect(problems, `${locale}: ${problems.join(", ")}`).toEqual([]);
    }
  });

  it("actually translates rather than copying English", () => {
    const english = getDictionary("en");
    const chinese = getDictionary("zh");
    // A handful of load-bearing strings must differ between locales.
    expect(chinese.meta.tagline).not.toBe(english.meta.tagline);
    expect(chinese.nav.whitepaper).not.toBe(english.nav.whitepaper);
    expect(chinese.actors.title).not.toBe(english.actors.title);
    expect(chinese.runNode.stakingBody).not.toBe(english.runNode.stakingBody);
  });

  it("describes every actor in every locale", () => {
    for (const locale of LOCALES) {
      const content = getContent(locale);
      for (const actor of ACTORS) {
        const copy = content.actors[actor.slug];
        expect(copy, `${locale}/${actor.slug}`).toBeDefined();
        expect(copy.name.trim(), `${locale}/${actor.slug}`).not.toBe("");
        expect(
          copy.responsibilities.length,
          `${locale}/${actor.slug}`,
        ).toBeGreaterThan(1);
        expect(copy.stake.trim(), `${locale}/${actor.slug}`).not.toBe("");
        expect(copy.earns.trim(), `${locale}/${actor.slug}`).not.toBe("");
      }
    }
  });
});

describe("routes", () => {
  it("lists each path once, with a sane priority", () => {
    const routes = allRoutes();
    const paths = routes.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    for (const route of routes) {
      expect(route.priority, route.path).toBeGreaterThan(0);
      expect(route.priority, route.path).toBeLessThanOrEqual(1);
      expect(route.path.startsWith("/"), route.path).toBe(true);
    }
  });

  it("covers every actor page and every document", () => {
    const paths = new Set(allRoutes().map((route) => route.path));
    for (const actor of ACTORS) {
      expect(paths.has(`/participate/${actor.slug}`), actor.slug).toBe(true);
    }
    expect(paths.has("/run-a-node")).toBe(true);
    expect(paths.has("/glossary")).toBe(true);
    expect(paths.has("/sale")).toBe(true);
  });
});
