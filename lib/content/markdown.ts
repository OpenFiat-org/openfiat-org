import type { Element, Root as HastRoot } from "hast";
import { toString as hastToString } from "hast-util-to-string";
import type { Root as MdastRoot, Parent, RootContent, Text } from "mdast";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeSlug from "rehype-slug";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype, {
  type Options as RemarkRehypeOptions,
} from "remark-rehype";
import { unified } from "unified";
import { visit } from "unist-util-visit";
import { figureGraphToHast, figurePreToHast } from "./figure-hast";
import { captionFromId, parseFigure } from "./figures";
import type { TocEntry } from "./types";

/**
 * Resolvers let the caller decide what a cross-reference points at, so the
 * pipeline never has to know about routing.
 */
export type CrossRefResolver = {
  /** Returns a href for a written spec, or null if it was never written. */
  spec: (id: string) => string | null;
  /** Returns a href for a chapter by its number. */
  chapter: (order: number) => string | null;
};

/** Normative keywords carry meaning in the specs; RFC 2119 order matters. */
const NORMATIVE = /\b(MUST NOT|SHALL NOT|SHOULD NOT|MUST|SHALL|SHOULD|MAY)\b/g;

const CROSS_REF = /\b(OFS-\d{4})\b|\bChapter\s+(\d{1,2})\b/g;

/**
 * The corpus contains no markdown links at all, but 250+ plaintext OFS-NNNN
 * references and 27 "Chapter N" mentions. Linking them turns the whole
 * whitepaper into a navigable document.
 *
 * Specs that are cited but never written (OFS-1700/1800/1900 and the
 * reserved 8000 block) render as inert abbreviations rather than links to
 * pages that would 404.
 */
function remarkCrossReferences(resolver: CrossRefResolver) {
  return (tree: MdastRoot) => {
    visit(tree, "text", (node: Text, index, parent) => {
      if (!parent || index === undefined) return;
      // Never rewrite inside an existing link or a heading anchor.
      if (parent.type === "link" || parent.type === "linkReference") return;

      const value = node.value;
      CROSS_REF.lastIndex = 0;
      if (!CROSS_REF.test(value)) return;
      CROSS_REF.lastIndex = 0;

      const out: RootContent[] = [];
      let cursor = 0;
      let match = CROSS_REF.exec(value);

      while (match !== null) {
        const [full, specId, chapterNo] = match;
        if (match.index > cursor) {
          out.push({ type: "text", value: value.slice(cursor, match.index) });
        }

        const href = specId
          ? resolver.spec(specId)
          : resolver.chapter(Number.parseInt(chapterNo, 10));

        if (href) {
          out.push({
            type: "link",
            url: href,
            children: [{ type: "text", value: full }],
          });
        } else if (specId) {
          // Cited but unwritten: mark it, do not link it.
          out.push({
            type: "emphasis",
            data: {
              hName: "abbr",
              hProperties: {
                "data-unwritten": "true",
                title: `${specId} is referenced by the specifications but has not been published yet.`,
              },
            },
            children: [{ type: "text", value: full }],
          });
        } else {
          out.push({ type: "text", value: full });
        }

        cursor = match.index + full.length;
        match = CROSS_REF.exec(value);
      }

      if (cursor < value.length) {
        out.push({ type: "text", value: value.slice(cursor) });
      }

      (parent as Parent).children.splice(index, 1, ...out);
      return index + out.length;
    });
  };
}

/**
 * Every fenced block in the corpus is a box-drawing diagram rather than code,
 * and 90 of them carry an `id="..."` fence attribute with a stable name.
 *
 * The diagrams are parsed into structured graphs and laid out properly rather
 * than reproduced as characters, because the source alignment is hand-drawn
 * and does not survive rendering. Shapes the parser cannot account for fall
 * back to a preformatted block.
 *
 * The node is converted to hast by a handler registered on remark-rehype,
 * which is the only place arbitrary element trees can be built cleanly.
 */
const FIGURE_NODE = "openfiatFigure";

type FigureData = {
  raw: string;
  id: string | null;
  caption: string | null;
};

function remarkAsciiFigures() {
  return (tree: MdastRoot) => {
    visit(tree, "code", (node, index, parent) => {
      if (!parent || index === undefined) return;

      const idMatch = node.meta?.match(/\bid="([^"]+)"/);
      const figureId = idMatch ? idMatch[1] : null;

      const data: FigureData = {
        raw: node.value,
        id: figureId,
        caption: figureId ? captionFromId(figureId) : null,
      };

      (parent as Parent).children.splice(index, 1, {
        type: FIGURE_NODE,
        data,
      } as never);
      return index + 1;
    });
  };
}

const figureHandler = (
  _state: unknown,
  node: { data: FigureData },
): Element => {
  const { raw, id, caption } = node.data;
  const graph = parseFigure(raw);
  return graph
    ? figureGraphToHast(graph, { id, caption })
    : figurePreToHast(raw, { id, caption });
};

/**
 * remark-rehype's handler map is typed against mdast's known node types, so
 * registering a handler for our own node type needs one cast at the boundary.
 */
const REHYPE_OPTIONS = {
  handlers: { [FIGURE_NODE]: figureHandler },
} as unknown as RemarkRehypeOptions;

/** Wraps RFC 2119 keywords so they read as normative, not shouted. */
function rehypeNormativeKeywords() {
  return (tree: HastRoot) => {
    visit(tree, "text", (node, index, parent) => {
      if (!parent || index === undefined) return;
      const element = parent as Element;
      if (element.type === "element") {
        const tag = element.tagName;
        if (tag === "code" || tag === "pre" || tag === "abbr") return;
      }

      const value = node.value;
      NORMATIVE.lastIndex = 0;
      if (!NORMATIVE.test(value)) return;
      NORMATIVE.lastIndex = 0;

      const out: (Element | { type: "text"; value: string })[] = [];
      let cursor = 0;
      let match = NORMATIVE.exec(value);

      while (match !== null) {
        if (match.index > cursor) {
          out.push({ type: "text", value: value.slice(cursor, match.index) });
        }
        out.push({
          type: "element",
          tagName: "span",
          properties: { className: ["normative"] },
          children: [{ type: "text", value: match[0] }],
        });
        cursor = match.index + match[0].length;
        match = NORMATIVE.exec(value);
      }

      if (cursor < value.length) {
        out.push({ type: "text", value: value.slice(cursor) });
      }

      element.children.splice(index, 1, ...(out as never[]));
      return index + out.length;
    });
  };
}

/** Collects the heading tree for the sticky table of contents. */
function rehypeCollectToc(sink: TocEntry[]) {
  return (tree: HastRoot) => {
    visit(tree, "element", (node: Element) => {
      if (node.tagName !== "h2" && node.tagName !== "h3") return;
      const id = node.properties?.id;
      if (typeof id !== "string") return;
      sink.push({
        id,
        text: hastToString(node).replace(/#$/, "").trim(),
        depth: node.tagName === "h2" ? 2 : 3,
      });
    });
  };
}

export type RenderResult = {
  html: string;
  toc: TocEntry[];
  words: number;
  readingMinutes: number;
};

export async function renderMarkdown(
  body: string,
  options: { resolver: CrossRefResolver; normative?: boolean },
): Promise<RenderResult> {
  const toc: TocEntry[] = [];

  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkCrossReferences, options.resolver)
    .use(remarkAsciiFigures)
    // No allowDangerousHtml: raw HTML in the source is dropped rather than
    // trusted, which removes the need for a sanitizer pass afterwards.
    .use(remarkRehype, REHYPE_OPTIONS)
    .use(rehypeSlug)
    .use(rehypeCollectToc, toc);

  if (options.normative) processor.use(rehypeNormativeKeywords);

  const file = await processor
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: { "data-anchor": "true", ariaHidden: "true", tabIndex: -1 },
      content: { type: "text", value: "#" },
    })
    .use(rehypeStringify)
    .process(body);

  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    html: String(file),
    toc,
    words,
    readingMinutes: Math.max(1, Math.round(words / 200)),
  };
}
