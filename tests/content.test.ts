import {
  getChapters,
  getSpec,
  getSpecs,
  renderChapter,
  renderSpec,
  twinFor,
} from "@/lib/content";
import { describe, expect, it } from "vitest";

const EXPECTED_CHAPTERS = 28;
const EXPECTED_SPECS = 24;

/** The authoring artifact that must never reach a published page. */
const ARTIFACT = "I would make one structural improvement";

describe("content pipeline", () => {
  it("loads every chapter and specification", () => {
    expect(getChapters()).toHaveLength(EXPECTED_CHAPTERS);
    expect(getSpecs()).toHaveLength(EXPECTED_SPECS);
  });

  it("orders chapters by their number and gives each a unique slug", () => {
    const chapters = getChapters();
    const orders = chapters.map((c) => c.order);
    expect(orders).toEqual([...orders].sort((a, b) => a - b));
    expect(new Set(chapters.map((c) => c.slug)).size).toBe(chapters.length);
  });

  it("leaves no H1 in any body, so each page has exactly one", () => {
    // The source uses # for section headings from N.2 onward, which would put
    // 15-27 H1 elements on a page without the normalization pass.
    for (const doc of [...getChapters(), ...getSpecs()]) {
      expect(doc.body, doc.slug).not.toMatch(/^#\s/m);
    }
  });

  it("has no literal bullet characters left", () => {
    // The Executive Summary used 23 of these instead of markdown lists.
    for (const doc of [...getChapters(), ...getSpecs()]) {
      expect(doc.body, doc.slug).not.toMatch(/^•/m);
    }
  });

  it("strips the authoring artifact from OFS-0000", () => {
    for (const doc of [...getChapters(), ...getSpecs()]) {
      expect(doc.body, doc.slug).not.toContain(ARTIFACT);
    }
  });

  it("removes the thematic breaks that preceded headings", () => {
    const stray = getChapters().reduce(
      (total, chapter) =>
        total + (chapter.body.match(/^---\s*$/gm) ?? []).length,
      0,
    );
    // There were 499 in the source.
    expect(stray).toBe(0);
  });

  it("parses the metadata block on every specification", () => {
    for (const spec of getSpecs()) {
      expect(spec.meta, spec.slug).not.toBeNull();
      expect(spec.meta?.documentId, spec.slug).toBe(spec.id);
      expect(spec.meta?.status, spec.slug).toBeTruthy();
      // The block must not survive in the rendered body.
      expect(spec.body, spec.slug).not.toContain("**Document ID:**");
    }
  });

  it("resolves every declared dependency to a published spec", () => {
    for (const spec of getSpecs()) {
      for (const dependency of spec.meta?.dependsOn ?? []) {
        expect(
          getSpec(dependency.toLowerCase()),
          `${spec.id} depends on ${dependency}`,
        ).not.toBeNull();
      }
    }
  });

  it("gives every document a description", () => {
    for (const doc of [...getChapters(), ...getSpecs()]) {
      expect(doc.description.length, doc.slug).toBeGreaterThan(20);
    }
  });

  it("pairs each duplicate chapter with its canonical twin", () => {
    const pairs: [number, number][] = [
      [23, 13],
      [17, 5],
      [24, 12],
    ];
    for (const [duplicate, canonical] of pairs) {
      const chapter = getChapters().find((c) => c.order === duplicate);
      expect(chapter, `chapter ${duplicate}`).toBeDefined();
      if (!chapter) continue;
      expect(twinFor(chapter).canonical?.order).toBe(canonical);
    }
  });
});

describe("rendered output", () => {
  it("links cross-references and never links an unwritten spec", async () => {
    const spec = getSpec("ofs-2300");
    expect(spec).not.toBeNull();
    if (!spec) return;

    const { html } = await renderSpec(spec);
    expect(html).toContain('href="/specs/ofs-');
    // Nothing may link to a specification that was never written. The
    // 1700/1800/1900 and 8000 ranges have since been published, so only the
    // genuinely absent documents belong here.
    for (const missing of ["3200", "5100", "9000"]) {
      expect(html).not.toContain(`href="/specs/ofs-${missing}"`);
    }
  });

  it("marks cited but unwritten specs as inert", async () => {
    // OFS-0000 cites the reserved blocks, so it should carry abbreviations.
    const spec = getSpec("ofs-0000");
    expect(spec).not.toBeNull();
    if (!spec) return;
    const { html } = await renderSpec(spec);
    expect(html).toContain("data-unwritten");
  });

  it("emits a single H1-free document with a heading tree", async () => {
    const chapter = getChapters().find((c) => c.order === 3);
    expect(chapter).toBeDefined();
    if (!chapter) return;

    const { html, toc, readingMinutes } = await renderChapter(chapter);
    expect(html).not.toContain("<h1");
    expect(toc.length).toBeGreaterThan(5);
    expect(toc.every((entry) => entry.id.length > 0)).toBe(true);
    expect(readingMinutes).toBeGreaterThan(0);
  });

  it("styles normative keywords in specs but not in chapters", async () => {
    const spec = getSpec("ofs-2000");
    const chapter = getChapters().find((c) => c.order === 2);
    expect(spec).not.toBeNull();
    expect(chapter).toBeDefined();
    if (!spec || !chapter) return;

    const specHtml = (await renderSpec(spec)).html;
    const chapterHtml = (await renderChapter(chapter)).html;
    expect(specHtml).toContain('class="normative"');
    expect(chapterHtml).not.toContain('class="normative"');
  });

  it("renders diagrams as graphs, not preformatted characters", async () => {
    const spec = getSpec("ofs-1200");
    expect(spec).not.toBeNull();
    if (!spec) return;

    const { html } = await renderSpec(spec);
    expect(html).toContain('class="g-figure"');
    expect(html).toContain('class="g-node"');
    // The fan-out in the gossip architecture figure must be structural.
    expect(html).toContain('class="g-fan"');
    expect(html).toContain('id="gossip-architecture"');
  });

  it("never emits raw HTML from the source", async () => {
    // remark-rehype runs without allowDangerousHtml, so any script or iframe
    // in the markdown is dropped rather than trusted.
    for (const spec of getSpecs().slice(0, 5)) {
      const { html } = await renderSpec(spec);
      expect(html).not.toContain("<script");
      expect(html).not.toContain("<iframe");
    }
  });
});
