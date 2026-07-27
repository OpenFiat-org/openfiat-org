/**
 * Turns the corpus's ASCII diagrams into structured graphs.
 *
 * Every fenced block in the whitepaper is a hand-drawn box-drawing diagram,
 * and the hand-drawn alignment does not survive contact with a browser: in the
 * gossip-architecture figure the three child labels start at columns 0, 15 and
 * 29 while their arrows sit at 5, 20 and 35. Any faithful monospace rendering
 * therefore reproduces sloppy alignment.
 *
 * So the structure is parsed and laid out properly instead. Four shapes occur
 * in the corpus and each gets a block type:
 *
 *   chain  a vertical sequence of nodes
 *   fan    a branch into parallel nodes, which may later merge
 *   stack  a layer diagram drawn as stacked boxes
 *   tree   a field listing drawn with the branch glyphs
 *
 * The parser is strict: if any line cannot be accounted for it returns null
 * and the caller falls back to a preformatted block. A wrong diagram on a
 * protocol specification is far worse than a plain one.
 */

const VERTICAL = /^[│|┃╏┇]+$/;
const ARROW_DOWN = /^[▼▽↓⇓v]+$/;
const VERTICAL_LABELLED = /^[│|┃]\s+(\S.*)$/;
const ARROW_LABELLED = /^[▼▽↓]\s+(\S.*)$/;
/** Any structural glyph that means a line is not a plain label. */
const STRUCTURAL = /[┌┐└┘├┤┬┴┼─═║╔╗╚╝╠╣╦╩╬]/;
/** A row of arrowheads, or of bare verticals, under a branch bar. */
const ARROW_ROW = /^[\s▼▽↓]*[▼▽↓][\s▼▽↓]*$/;
const CONNECTOR_ROW = /^[\s│|┃]*[│|┃][\s│|┃]*$/;
/** A stacked-box rule: the top, a divider, or the bottom of a layer diagram. */
const BOX_RULE = /^\s*[┌├└][─┬┴┼]*[┐┤┘]\s*$/;
const BOX_ROW = /^\s*│(.*)│\s*$/;
/** A branch in a field listing. */
const TREE_ITEM = /^\s*[├└]──\s*(.+?)\s*$/;

export type FigureNode = {
  label: string;
  /** Label written on the edge entering this node, if the author gave one. */
  edgeLabel?: string;
};

export type FigureBlock =
  | { kind: "chain"; nodes: FigureNode[] }
  | { kind: "fan"; children: FigureNode[] }
  | { kind: "stack"; layers: string[] }
  | { kind: "tree"; root: string | null; items: string[] };

export type FigureGraph = { type: "flow"; blocks: FigureBlock[] };

/**
 * A horizontal rule that splits a flow apart or joins it back together.
 * Some carry a label in the middle ("└──── libp2p ────┘"), so this is a
 * predicate rather than one expression.
 */
function branchBar(line: string): { isBar: boolean; label?: string } {
  const text = line.trim();
  if (!/^[┌├└]/.test(text)) return { isBar: false };
  if (!/[┐┘┤┼┬┴─]$/.test(text)) return { isBar: false };
  if ((text.match(/─/g) ?? []).length < 4) return { isBar: false };

  // Some bars name the thing they join over: "└──── libp2p Gossip ────┘".
  const label = text.replace(/[┌┐└┘├┤┬┴┼─]/g, " ").trim();
  return { isBar: true, ...(label ? { label } : {}) };
}

type ChainParse = { nodes: FigureNode[]; ok: boolean };

function parseChainLines(lines: string[]): ChainParse {
  const nodes: FigureNode[] = [];
  let buffer: string[] = [];
  let pendingEdge: string | undefined;

  function flush() {
    if (buffer.length === 0) return;
    nodes.push({
      label: buffer.join(" "),
      ...(pendingEdge ? { edgeLabel: pendingEdge } : {}),
    });
    buffer = [];
    pendingEdge = undefined;
  }

  for (const line of lines) {
    const text = line.trim();

    if (text === "") {
      flush();
      continue;
    }
    if (VERTICAL.test(text) || ARROW_DOWN.test(text)) {
      flush();
      continue;
    }

    const labelled =
      text.match(VERTICAL_LABELLED) ?? text.match(ARROW_LABELLED);
    if (labelled) {
      flush();
      pendingEdge = labelled[1].trim();
      continue;
    }

    if (STRUCTURAL.test(text)) return { nodes, ok: false };

    buffer.push(text);
  }

  flush();
  return { nodes, ok: true };
}

/**
 * Splits a row of side-by-side labels into exactly `count` cells.
 *
 * Two or more spaces is the reliable separator and is tried first, so a label
 * containing a single space ("Risk Intelligence") stays intact. Some rows are
 * packed tightly enough that only single spaces remain, so a whitespace split
 * is accepted as a fallback when it yields the right shape.
 */
function splitCells(text: string, count: number): string[] | null {
  const wide = text
    .trim()
    .split(/\s{2,}/)
    .map((cell) => cell.trim());
  if (wide.length === count) return wide;

  const narrow = text.trim().split(/\s+/);
  if (narrow.length === count) return narrow;

  return null;
}

/** A layer diagram: stacked boxes separated by divider rules. */
function parseStack(lines: string[]): FigureBlock | null {
  const layers: string[] = [];
  let sawRule = false;

  for (const line of lines) {
    if (line.trim() === "") continue;
    if (BOX_RULE.test(line)) {
      sawRule = true;
      continue;
    }
    const row = line.match(BOX_ROW);
    if (!row) return null;
    const label = row[1].trim();
    if (label) layers.push(label);
  }

  return sawRule && layers.length >= 2 ? { kind: "stack", layers } : null;
}

/** A field listing: a title, then branch entries. */
function parseTree(lines: string[]): FigureBlock | null {
  const items: string[] = [];
  const heading: string[] = [];

  for (const line of lines) {
    if (line.trim() === "") continue;
    const item = line.match(TREE_ITEM);
    if (item) {
      items.push(item[1]);
      continue;
    }
    // Groups within a listing are separated by a bare connector line.
    if (VERTICAL.test(line.trim())) continue;
    // Anything before the first branch is the root label.
    if (items.length > 0) return null;
    if (STRUCTURAL.test(line)) return null;
    heading.push(line.trim());
  }

  if (items.length < 2) return null;
  return {
    kind: "tree",
    root: heading.length > 0 ? heading.join(" ") : null,
    items,
  };
}

export function parseFigure(text: string): FigureGraph | null {
  const trimmed = text.replace(/\s+$/, "");
  if (trimmed.trim() === "") return null;

  const lines = trimmed.split("\n");

  // Whole-figure shapes are recognized before the flow parser, because their
  // glyphs would otherwise read as branch bars.
  const stack = parseStack(lines);
  if (stack) return { type: "flow", blocks: [stack] };

  const tree = parseTree(lines);
  if (tree) return { type: "flow", blocks: [tree] };

  const blocks: FigureBlock[] = [];
  let pending: string[] = [];
  let cursor = 0;

  function flushChain(): boolean {
    if (pending.length === 0) return true;
    const parsed = parseChainLines(pending);
    pending = [];
    if (!parsed.ok) return false;
    if (parsed.nodes.length > 0) {
      blocks.push({ kind: "chain", nodes: parsed.nodes });
    }
    return true;
  }

  while (cursor < lines.length) {
    const bar = branchBar(lines[cursor]);

    if (!bar.isBar) {
      pending.push(lines[cursor]);
      cursor++;
      continue;
    }

    // A bar either splits the flow or joins it back. Which one is decided by
    // the row beneath it: one marker is a merge, several are a fan. The
    // markers are arrowheads in most figures and bare verticals in some.
    if (!flushChain()) return null;
    cursor++;

    while (cursor < lines.length && lines[cursor].trim() === "") cursor++;
    if (cursor >= lines.length) return null;

    const marker = lines[cursor];
    const isArrows = ARROW_ROW.test(marker);
    const isConnectors = CONNECTOR_ROW.test(marker);
    if (!isArrows && !isConnectors) return null;

    const count = (marker.match(isArrows ? /[▼▽↓]/g : /[│|┃]/g) ?? []).length;
    cursor++;

    if (count < 2) {
      // A merge: the chain carries on. If the bar was labelled, hand the
      // label to the next node as its incoming edge label rather than
      // dropping it.
      if (bar.label) pending.push(`│ ${bar.label}`);
      continue;
    }

    const rows: string[][] = [];
    while (cursor < lines.length) {
      const candidate = lines[cursor];
      const text_ = candidate.trim();
      if (text_ === "") break;
      if (VERTICAL.test(text_) || ARROW_DOWN.test(text_)) break;
      if (STRUCTURAL.test(text_)) break;

      const cells = splitCells(candidate, count);
      if (!cells) break;
      // Parallel branches carry their own connector line ("│      │"), which
      // splits into the right number of cells but is not a label row.
      if (cells.every((cell) => /^[│|┃▼▽↓]+$/.test(cell))) break;
      rows.push(cells);
      cursor++;
    }

    if (rows.length === 0) return null;

    blocks.push({
      kind: "fan",
      children: Array.from({ length: count }, (_, i) => ({
        label: rows.map((row) => row[i]).join(" "),
      })),
    });
  }

  if (!flushChain()) return null;

  const total = blocks.reduce((sum, block) => {
    if (block.kind === "chain") return sum + block.nodes.length;
    if (block.kind === "fan") return sum + block.children.length;
    if (block.kind === "stack") return sum + block.layers.length;
    return sum + block.items.length;
  }, 0);
  if (total < 2) return null;

  return { type: "flow", blocks };
}

/**
 * Human caption from the fence's id attribute.
 *
 * Roughly a third of the ids are terse internal codes — "arbgd1", "ofiplife",
 * "deploy01" — which produce captions like "Arbgd1" that say less than no
 * caption at all. Only multi-word slugs become captions; the id still anchors
 * the figure either way.
 */
export function captionFromId(id: string): string | null {
  if (!/[-_]/.test(id)) return null;

  const words = id
    .replace(/[-_]+/g, " ")
    .trim()
    .split(" ")
    .map((word) => (word === "ofs" ? "OFS" : word));

  const first = words[0];
  words[0] =
    first === "OFS" ? first : first.charAt(0).toUpperCase() + first.slice(1);
  return words.join(" ");
}
