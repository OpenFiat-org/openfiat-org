/**
 * Pulls the whitepaper and specifications out of openfiat-specs and writes a
 * normalized content bundle for the build to consume.
 *
 * Content lives in a separate repository, so this runs in prebuild. Two
 * guards keep a network dependency from becoming a liability:
 *
 *   - The ref is pinned to a commit by default, not a branch, so a given
 *     checkout of this site always builds the same words.
 *   - Every successful fetch is cached on disk and reused when the network
 *     is unavailable, so offline `pnpm dev` works.
 *
 * If both the network and the cache are unavailable it fails loudly rather
 * than emitting a site with missing chapters.
 */

import { existsSync } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import {
  familyFor,
  normalizeChapter,
  normalizeSpec,
} from "./lib/normalize.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const REPO = process.env.OPENFIAT_SPECS_REPO ?? "OpenFiat-org/openfiat-specs";
/** Pinned commit. Bump deliberately when the whitepaper changes. */
const REF =
  process.env.OPENFIAT_SPECS_REF ?? "501fa1f7e23664792f357dfc01b7fa8b0755c235";

/**
 * Read from a local checkout instead of GitHub. Useful offline, and for
 * previewing specification changes before they are pushed.
 */
const LOCAL_PATH = process.env.OPENFIAT_SPECS_PATH ?? null;

const CHAPTERS_DIR = "Whitepaper/Chapters";
const SPECS_DIR = "Whitepaper/Specifications";

const OUT_FILE = join(ROOT, "content/.generated/content.json");
const CACHE_FILE = join(ROOT, `.content-cache/${REF}.json`);

const EXPECTED_CHAPTERS = 28;
const EXPECTED_SPECS = 26;

function ghHeaders() {
  const headers = {
    accept: "application/vnd.github+json",
    "user-agent": "openfiat-org-build",
  };
  const token = process.env.GITHUB_TOKEN ?? process.env.GH_TOKEN;
  if (token) headers.authorization = `Bearer ${token}`;
  return headers;
}

async function listDir(path) {
  const url = `https://api.github.com/repos/${REPO}/contents/${encodeURI(path)}?ref=${REF}`;
  const res = await fetch(url, { headers: ghHeaders() });
  if (!res.ok) {
    throw new Error(
      `GitHub listing failed for ${path}: ${res.status} ${res.statusText}`,
    );
  }
  const entries = await res.json();
  return entries
    .filter((e) => e.type === "file" && e.name.endsWith(".md"))
    .map((e) => ({ name: e.name, downloadUrl: e.download_url }));
}

async function fetchFile(entry) {
  const res = await fetch(entry.downloadUrl, {
    headers: { "user-agent": "openfiat-org-build" },
  });
  if (!res.ok) {
    throw new Error(`Download failed for ${entry.name}: ${res.status}`);
  }
  return { name: entry.name, raw: await res.text() };
}

/** Fetches with a small concurrency cap so we do not hammer the API. */
async function fetchAll(entries, limit = 8) {
  const results = [];
  for (let i = 0; i < entries.length; i += limit) {
    const batch = entries.slice(i, i + limit);
    results.push(...(await Promise.all(batch.map(fetchFile))));
  }
  return results;
}

async function readFromDisk(root) {
  const { readdir } = await import("node:fs/promises");
  async function load(dir) {
    const names = await readdir(join(root, dir));
    return Promise.all(
      names
        .filter((name) => name.endsWith(".md"))
        .map(async (name) => ({
          name,
          raw: await readFile(join(root, dir, name), "utf8"),
        })),
    );
  }
  const [chapters, specs] = await Promise.all([
    load(CHAPTERS_DIR),
    load(SPECS_DIR),
  ]);
  return { ref: `local:${root}`, chapters, specs };
}

async function fetchFromGitHub() {
  const [chapterEntries, specEntries] = await Promise.all([
    listDir(CHAPTERS_DIR),
    listDir(SPECS_DIR),
  ]);
  const [chapters, specs] = await Promise.all([
    fetchAll(chapterEntries),
    fetchAll(specEntries),
  ]);
  return { ref: REF, chapters, specs };
}

async function readCache() {
  if (!existsSync(CACHE_FILE)) return null;
  try {
    return JSON.parse(await readFile(CACHE_FILE, "utf8"));
  } catch {
    return null;
  }
}

async function writeJson(file, data) {
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, JSON.stringify(data), "utf8");
}

function buildBundle(rawBundle) {
  const artifacts = [];

  const chapters = rawBundle.chapters
    .map((f) => normalizeChapter(f.name, f.raw))
    .sort((a, b) => a.order - b.order);

  const specs = rawBundle.specs
    .map((f) => normalizeSpec(f.name, f.raw))
    .sort((a, b) => a.number - b.number);

  // Collect the artifact reports, then drop the field from what ships.
  const strip = (doc) => {
    const { removedArtifact, ...rest } = doc;
    if (removedArtifact) artifacts.push(removedArtifact);
    return rest;
  };
  const cleanChapters = chapters.map(strip);
  const cleanSpecs = specs.map(strip);

  for (const spec of cleanSpecs) {
    const family = familyFor(spec.number);
    spec.family = family ? family.name : "Uncategorized";
  }

  return {
    ref: rawBundle.ref,
    chapters: cleanChapters,
    specs: cleanSpecs,
    artifacts,
  };
}

function verify(bundle) {
  const problems = [];

  if (bundle.chapters.length !== EXPECTED_CHAPTERS) {
    problems.push(
      `expected ${EXPECTED_CHAPTERS} chapters, got ${bundle.chapters.length}`,
    );
  }
  if (bundle.specs.length !== EXPECTED_SPECS) {
    problems.push(
      `expected ${EXPECTED_SPECS} specs, got ${bundle.specs.length}`,
    );
  }

  for (const doc of [...bundle.chapters, ...bundle.specs]) {
    if (/^#\s/m.test(doc.body)) {
      problems.push(`${doc.slug}: an H1 survived heading normalization`);
    }
    if (/^•/m.test(doc.body)) {
      problems.push(`${doc.slug}: a literal bullet character survived`);
    }
    if (!doc.heading) problems.push(`${doc.slug}: no heading`);
  }

  const duplicateSlugs = new Set();
  const seen = new Set();
  for (const doc of [...bundle.chapters, ...bundle.specs]) {
    if (seen.has(doc.slug)) duplicateSlugs.add(doc.slug);
    seen.add(doc.slug);
  }
  for (const slug of duplicateSlugs) problems.push(`duplicate slug: ${slug}`);

  return problems;
}

async function main() {
  let rawBundle = null;
  let source = "network";

  if (LOCAL_PATH) {
    const bundle = buildBundle(await readFromDisk(LOCAL_PATH));
    const problems = verify(bundle);
    if (problems.length > 0) {
      console.error("\n  Content verification failed:");
      for (const problem of problems) console.error(`    - ${problem}`);
      process.exit(1);
    }
    await writeJson(OUT_FILE, bundle);
    console.log(
      `  content: ${bundle.chapters.length} chapters, ${bundle.specs.length} specs (local ${LOCAL_PATH})`,
    );
    return;
  }

  try {
    rawBundle = await fetchFromGitHub();
    await writeJson(CACHE_FILE, rawBundle);
  } catch (error) {
    const cached = await readCache();
    if (!cached) {
      console.error(
        [
          "",
          "  Could not fetch whitepaper content, and no cache is available.",
          "",
          `  repo: ${REPO}`,
          `  ref:  ${REF}`,
          `  cause: ${error.message}`,
          "",
          "  Fixes:",
          "    - check network access to api.github.com",
          "    - set GITHUB_TOKEN if the repository is private",
          "    - override OPENFIAT_SPECS_REPO / OPENFIAT_SPECS_REF",
          "",
        ].join("\n"),
      );
      process.exit(1);
    }
    rawBundle = cached;
    source = "cache";
    console.warn(`  ! network fetch failed (${error.message}); using cache`);
  }

  const bundle = buildBundle(rawBundle);
  const problems = verify(bundle);

  if (problems.length > 0) {
    console.error("\n  Content verification failed:");
    for (const problem of problems) console.error(`    - ${problem}`);
    console.error("");
    process.exit(1);
  }

  await writeJson(OUT_FILE, bundle);

  const words = [...bundle.chapters, ...bundle.specs].reduce(
    (sum, d) => sum + d.body.split(/\s+/).length,
    0,
  );

  console.log(
    `  content: ${bundle.chapters.length} chapters, ${bundle.specs.length} specs, ` +
      `~${Math.round(words / 1000)}k words (${source}, ref ${REF.slice(0, 7)})`,
  );

  for (const artifact of bundle.artifacts) {
    console.warn(
      `  ! stripped authoring artifact from ${artifact.label}:${artifact.line} — "${artifact.text}"`,
    );
    console.warn("    report upstream so it is fixed at source");
  }
}

await main();
