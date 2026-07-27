import type { Element, ElementContent, Properties } from "hast";
import type { FigureGraph, FigureNode } from "./figures";

/**
 * Renders a parsed figure as real markup instead of preformatted text.
 *
 * HTML rather than SVG on purpose: the labels stay selectable, translatable
 * and screen-reader accessible, the boxes inherit the site's type and colour
 * tokens, and a wide fan-out can wrap on a narrow viewport instead of forcing
 * a horizontal scroll.
 */

function element(
  tagName: string,
  properties: Properties,
  children: ElementContent[] = [],
): Element {
  return { type: "element", tagName, properties, children };
}

function text(value: string) {
  return { type: "text" as const, value };
}

function node(figureNode: FigureNode): Element {
  return element("div", { className: ["g-node"] }, [
    element("span", { className: ["g-node-label"] }, [text(figureNode.label)]),
  ]);
}

/** A downward connector, optionally carrying the author's edge label. */
function edge(label?: string): Element {
  const children: ElementContent[] = [
    element("span", { className: ["g-edge-line"], ariaHidden: "true" }, []),
  ];
  if (label) {
    children.push(
      element("span", { className: ["g-edge-label"] }, [text(label)]),
    );
  }
  return element("div", { className: ["g-edge"] }, children);
}

function chain(nodes: FigureNode[]): ElementContent[] {
  const out: ElementContent[] = [];
  nodes.forEach((item, index) => {
    if (index > 0) out.push(edge(item.edgeLabel));
    out.push(node(item));
  });
  return out;
}

/** A layer diagram: full-width bands, top layer first. */
function stack(layers: string[]): Element {
  return element(
    "div",
    { className: ["g-stack"] },
    layers.map((layer) =>
      element("div", { className: ["g-stack-layer"] }, [text(layer)]),
    ),
  );
}

/** A field listing: a root label over its branches. */
function tree(root: string | null, items: string[]): Element {
  const children: ElementContent[] = [];
  if (root) {
    children.push(element("p", { className: ["g-tree-root"] }, [text(root)]));
  }
  children.push(
    element(
      "ul",
      { className: ["g-tree-items"] },
      items.map((item) => element("li", {}, [text(item)])),
    ),
  );
  return element("div", { className: ["g-tree"] }, children);
}

function fan(children: FigureNode[]): Element {
  return element("div", { className: ["g-fan"] }, [
    element("span", { className: ["g-fan-bar"], ariaHidden: "true" }, []),
    element(
      "div",
      { className: ["g-fan-children"] },
      children.map((child) => node(child)),
    ),
  ]);
}

export function figureGraphToHast(
  graph: FigureGraph,
  options: { id: string | null; caption: string | null },
): Element {
  const parts: ElementContent[] = [];

  graph.blocks.forEach((block, index) => {
    // Blocks are stacked vertically, joined by the same connector used
    // between nodes, so a branch reads as part of one continuous flow.
    if (index > 0) parts.push(edge());
    if (block.kind === "chain") {
      parts.push(...chain(block.nodes));
    } else if (block.kind === "fan") {
      parts.push(fan(block.children));
    } else if (block.kind === "stack") {
      parts.push(stack(block.layers));
    } else {
      parts.push(tree(block.root, block.items));
    }
  });

  const children: ElementContent[] = [
    element("div", { className: ["g-graph", "g-flow"] }, parts),
  ];
  if (options.caption) {
    children.push(element("figcaption", {}, [text(options.caption)]));
  }

  return element(
    "figure",
    {
      ...(options.id ? { id: options.id } : {}),
      className: ["g-figure"],
      role: "group",
      ...(options.caption ? { ariaLabel: options.caption } : {}),
    },
    children,
  );
}

/** Fallback for figures whose shape was not confidently recognized. */
export function figurePreToHast(
  raw: string,
  options: { id: string | null; caption: string | null },
): Element {
  const children: ElementContent[] = [
    element("pre", {}, [element("code", {}, [text(raw)])]),
  ];
  if (options.caption) {
    children.push(element("figcaption", {}, [text(options.caption)]));
  }
  return element(
    "figure",
    {
      ...(options.id ? { id: options.id } : {}),
      className: ["g-figure", "g-figure-raw"],
    },
    children,
  );
}
