/**
 * Normalizes the openfiat-specs markdown into something publishable.
 *
 * The source corpus was authored as standalone documents and has several
 * defects that make a naive markdown -> HTML pass unusable on the web.
 * Each transform below corresponds to a confirmed defect, not a preference.
 *
 * Written as .mjs on purpose: CI runs Node 20, which cannot strip types,
 * and this runs in prebuild before any bundler is involved.
 */

/**
 * Trailing first-person authoring commentary that was never meant to ship.
 * Confirmed in OFS-0000 (from "I would make one structural improvement"
 * through EOF, after the "13. Summary" section). These artifacts are always
 * trailing, so we truncate from the marker to the end of the document.
 */
const ARTIFACT_MARKERS = [
  /^I would make one structural improvement/i,
  /^(As an AI|I cannot|I should note that I)/i,
  /^(Here is|Here's) (the|a) (revised|updated|improved) (version|draft)/i,
];

/** Splits into lines while tracking fenced-code regions. */
function mapOutsideFences(source, fn) {
  const lines = source.split("\n");
  let inFence = false;
  let fenceMarker = "";
  const out = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const fenceMatch = line.match(/^(\s*)(`{3,}|~{3,})/);

    if (fenceMatch) {
      const marker = fenceMatch[2];
      if (!inFence) {
        inFence = true;
        fenceMarker = marker[0];
      } else if (marker[0] === fenceMarker) {
        inFence = false;
      }
      out.push(line);
      continue;
    }

    out.push(inFence ? line : fn(line, i, lines));
  }

  return out.filter((line) => line !== null).join("\n");
}

/**
 * Removes trailing authoring commentary. Returns the cleaned source plus a
 * report so the build can log loudly rather than silently dropping content.
 */
export function stripArtifacts(source, label) {
  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    for (const marker of ARTIFACT_MARKERS) {
      if (marker.test(lines[i].trim())) {
        return {
          source: lines.slice(0, i).join("\n").trimEnd(),
          removed: { label, line: i + 1, text: lines[i].trim().slice(0, 80) },
        };
      }
    }
  }
  return { source, removed: null };
}

/**
 * "01 - Executive Summary.md" uses 23 literal bullet characters at line
 * start instead of markdown list syntax, so they render as paragraphs.
 * That file is the most-read page in the corpus.
 */
export function normalizeBullets(source) {
  return mapOutsideFences(source, (line) =>
    line.replace(/^(\s*)•[ \t]+/, "$1- "),
  );
}

/**
 * The chapters contain 499 thematic breaks, nearly all of them immediately
 * before a heading where they act as authoring separators rather than
 * content. Rendering those as visible rules looks broken. Standalone rules
 * that genuinely separate prose are kept.
 */
export function stripRulesBeforeHeadings(source) {
  return mapOutsideFences(source, (line, i, lines) => {
    if (!/^\s*(-{3,}|\*{3,}|_{3,})\s*$/.test(line)) return line;

    // Look ahead past blank lines: drop the rule if a heading follows,
    // or if nothing but whitespace remains until EOF.
    for (let j = i + 1; j < lines.length; j++) {
      const next = lines[j].trim();
      if (next === "") continue;
      return next.startsWith("#") ? null : line;
    }
    return null;
  });
}

/** Pulls the leading H1 out of the body; the page renders it as the title. */
export function extractTitle(source) {
  const lines = source.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const match = lines[i].match(/^#\s+(.+?)\s*$/);
    if (match) {
      lines.splice(0, i + 1);
      return { title: match[1].trim(), body: lines.join("\n").trimStart() };
    }
    if (lines[i].trim() !== "") break;
  }
  return { title: null, body: source };
}

/**
 * Rebuilds the heading hierarchy.
 *
 * Chapters open with an H1 title, use H2 for section N.1, then revert to H1
 * for N.2 onward -- so a typical chapter carries 15-27 H1 elements and one
 * H2. Specs do the same. Rather than shifting every level blindly (which
 * would place the one well-formed chapter's sections a level deeper than
 * everyone else's), depth is derived from the section numbering the authors
 * actually used, falling back to the source level for unnumbered headings.
 *
 * Every section lands at H2 and every named sub-block at H3, uniformly.
 */
export function normalizeHeadings(source) {
  return mapOutsideFences(source, (line) => {
    const match = line.match(/^(#{1,6})\s+(.+?)\s*$/);
    if (!match) return line;

    const sourceLevel = match[1].length;
    const text = match[2];

    // "3.2 Principle One" and "1. Introduction" are both chapter sections
    // regardless of whether the author wrote # or ##.
    const isSection = /^\d+\.(\d+)?(\s|$)/.test(text);
    const isSubSection = /^\d+\.\d+\.\d+/.test(text);

    let depth;
    if (isSubSection) depth = 3;
    else if (isSection) depth = 2;
    else if (sourceLevel <= 2) depth = 2;
    else depth = Math.min(sourceLevel, 6);

    return `${"#".repeat(depth)} ${text}`;
  });
}

/**
 * Each spec opens with a machine-readable metadata block. Parsed into
 * structured fields and removed from the body so it can render as a header
 * card instead of a wall of bold labels.
 */
export function extractSpecMeta(body) {
  const lines = body.split("\n");
  const meta = {};
  let consumedTo = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line === "") continue;
    if (line.startsWith("#")) break;

    const match = line.match(/^\*\*([^:*]+):\*\*\s*(.*)$/);
    if (!match) break;

    const key = match[1].trim().toLowerCase().replace(/\s+/g, "");
    meta[key] = match[2].trim();
    consumedTo = i + 1;
  }

  if (consumedTo === 0) return { meta: null, body };

  return {
    meta: {
      documentId: meta.documentid ?? null,
      title: meta.title ?? null,
      version: meta.version ?? null,
      status: meta.status ?? null,
      category: meta.category ?? null,
      dependsOn: meta.dependson
        ? meta.dependson
            .split(",")
            .map((d) => d.trim())
            .filter((d) => /^OFS-\d{4}$/.test(d))
        : [],
    },
    body: lines.slice(consumedTo).join("\n").trimStart(),
  };
}

function slugifyTitle(title) {
  return title
    .toLowerCase()
    .replace(/[’']/g, "")
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** First real sentence of prose, for meta descriptions and index cards. */
function firstParagraph(body) {
  const lines = body.split("\n");
  let inFence = false;
  for (const line of lines) {
    if (/^\s*(`{3,}|~{3,})/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const text = line.trim();
    if (text === "" || text.startsWith("#") || text.startsWith(">")) continue;
    if (/^[-*]\s/.test(text)) continue;
    return text.replace(/\*\*/g, "").replace(/\*/g, "");
  }
  return "";
}

function truncate(text, max = 158) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${cut.slice(0, lastSpace > 0 ? lastSpace : max).trimEnd()}…`;
}

const SHARED_PASSES = (raw, label) => {
  const { source, removed } = stripArtifacts(raw, label);
  let body = normalizeBullets(source);
  body = stripRulesBeforeHeadings(body);
  return { body, removed };
};

/**
 * Normalizes one chapter. Filenames are "NN - Title.md", which gives both
 * reading order and title deterministically.
 */
export function normalizeChapter(filename, raw) {
  // Filenames separate the number from the title with a hyphen or an em dash.
  const nameMatch = filename.match(/^(\d+)\s*[-\u2013\u2014]\s*(.+)\.md$/);
  if (!nameMatch) {
    throw new Error(
      `Unexpected chapter filename "${filename}". Expected "NN - Title.md".`,
    );
  }

  const order = Number.parseInt(nameMatch[1], 10);
  const fileTitle = nameMatch[2].trim();

  const { body: cleaned, removed } = SHARED_PASSES(raw, filename);
  const { title: h1, body: withoutTitle } = extractTitle(cleaned);
  const body = normalizeHeadings(withoutTitle);

  return {
    kind: "chapter",
    order,
    slug: `${nameMatch[1]}-${slugifyTitle(fileTitle)}`,
    /** The H1 carries "Chapter 3 — Design Philosophy"; keep both forms. */
    title: fileTitle,
    heading: h1 ?? fileTitle,
    description: truncate(firstParagraph(body)),
    body,
    removedArtifact: removed,
  };
}

/** Normalizes one specification. Filenames are "OFS-NNNN - Title.md". */
export function normalizeSpec(filename, raw) {
  const nameMatch = filename.match(
    /^(OFS-(\d{4}))\s*[-\u2013\u2014]\s*(.+)\.md$/,
  );
  if (!nameMatch) {
    throw new Error(
      `Unexpected spec filename "${filename}". Expected "OFS-NNNN - Title.md".`,
    );
  }

  const id = nameMatch[1];
  const number = Number.parseInt(nameMatch[2], 10);
  const fileTitle = nameMatch[3].trim();

  const { body: cleaned, removed } = SHARED_PASSES(raw, filename);
  const { title: h1, body: withoutTitle } = extractTitle(cleaned);
  const { meta, body: withoutMeta } = extractSpecMeta(withoutTitle);
  const body = normalizeHeadings(withoutMeta);

  return {
    kind: "spec",
    id,
    number,
    slug: id.toLowerCase(),
    title: fileTitle,
    heading: h1 ?? `${id} — ${fileTitle}`,
    meta,
    description: truncate(firstParagraph(body)),
    body,
    removedArtifact: removed,
  };
}

/** The layer taxonomy is stated in OFS-0000 section 4, not invented here. */
export const SPEC_FAMILIES = [
  { floor: 0, ceiling: 999, name: "Core", blurb: "Suite-level definitions" },
  {
    floor: 1000,
    ceiling: 1999,
    name: "Network",
    blurb: "Transport, discovery, gossip and synchronization",
  },
  {
    floor: 2000,
    ceiling: 2999,
    name: "Marketplace",
    blurb: "Advertisement, reservation, settlement and disputes",
  },
  {
    floor: 3000,
    ceiling: 3999,
    name: "Reputation",
    blurb: "Observable trading history",
  },
  {
    floor: 4000,
    ceiling: 4999,
    name: "Governance",
    blurb: "Proposals and protocol evolution",
  },
  {
    floor: 5000,
    ceiling: 5999,
    name: "Identity",
    blurb: "Control verification, not identity verification",
  },
  {
    floor: 6000,
    ceiling: 6999,
    name: "Notifications",
    blurb: "Gateway delivery",
  },
  {
    floor: 7000,
    ceiling: 7999,
    name: "Oracle & Risk",
    blurb: "External data and wallet intelligence",
  },
  {
    floor: 8000,
    ceiling: 8999,
    name: "Extensions",
    blurb: "Cross-cutting registries and future protocol families",
  },
];

export function familyFor(number) {
  return (
    SPEC_FAMILIES.find((f) => number >= f.floor && number <= f.ceiling) ?? null
  );
}
