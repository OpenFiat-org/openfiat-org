import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { parseFigure } from "@/lib/content/figures";
import type { ContentBundle } from "@/lib/content/types";

const bundle = JSON.parse(
  readFileSync(join(process.cwd(), "content/.generated/content.json"), "utf8"),
) as ContentBundle;

type Figure = { doc: string; id: string | null; body: string };

function collectFigures(): Figure[] {
  const figures: Figure[] = [];
  for (const doc of [...bundle.chapters, ...bundle.specs]) {
    const pattern = /```text([^\n]*)\n([\s\S]*?)```/g;
    let match = pattern.exec(doc.body);
    while (match !== null) {
      const idMatch = match[1].match(/id="([^"]+)"/);
      figures.push({
        doc: doc.slug,
        id: idMatch ? idMatch[1] : null,
        body: match[2].replace(/\n$/, ""),
      });
      match = pattern.exec(doc.body);
    }
  }
  return figures;
}

describe("ASCII figure parsing", () => {
  const figures = collectFigures();

  it("finds the figures in the corpus", () => {
    expect(figures.length).toBeGreaterThan(100);
  });

  it("converts a clear majority into structured graphs", () => {
    const parsed = figures.filter((f) => parseFigure(f.body) !== null);
    const ratio = parsed.length / figures.length;
    // Report so a regression in the parser is visible, not just failing.
    console.log(
      `  figures: ${parsed.length}/${figures.length} structured (${Math.round(ratio * 100)}%)`,
    );
    expect(ratio).toBeGreaterThan(0.6);
  });

  it("never loses a label when it does parse", () => {
    for (const figure of figures) {
      const graph = parseFigure(figure.body);
      if (!graph) continue;

      const collected = graph.blocks.flatMap((block) => {
        if (block.kind === "chain")
          return block.nodes.flatMap((n) => [n.edgeLabel ?? "", n.label]);
        if (block.kind === "fan") return block.children.map((n) => n.label);
        if (block.kind === "stack") return block.layers;
        return [block.root ?? "", ...block.items];
      });

      /*
       * Compares sorted characters, not sequence. Multi-row fan-outs are read
       * column-wise (each child owns a column) while the source text reads
       * row-major, so the orders legitimately differ. What matters here is
       * that nothing is dropped; the two structural tests below pin ordering
       * down for known inputs.
       */
      const chars = (value: string) =>
        [...value.replace(/[^\p{L}\p{N}]+/gu, "")].sort().join("");

      expect(
        chars(collected.join(" ")),
        `${figure.doc} ${figure.id ?? ""}`,
      ).toBe(chars(figure.body));
    }
  });

  it("parses a vertical chain with edge labels", () => {
    const graph = parseFigure(
      [
        "User Wallet",
        "      │",
        "      │ Cryptographic Signatures",
        "      ▼",
        "OpenFiat Protocol",
        "      │",
        "      │ Smart Contracts",
        "      ▼",
        "Solana Blockchain",
      ].join("\n"),
    );

    expect(graph).not.toBeNull();
    if (!graph) return;
    expect(graph.blocks).toHaveLength(1);
    const block = graph.blocks[0];
    expect(block.kind).toBe("chain");
    if (block.kind !== "chain") return;
    expect(block.nodes.map((n) => n.label)).toEqual([
      "User Wallet",
      "OpenFiat Protocol",
      "Solana Blockchain",
    ]);
    expect(block.nodes[1].edgeLabel).toBe("Cryptographic Signatures");
    expect(block.nodes[2].edgeLabel).toBe("Smart Contracts");
  });

  it("parses a fan-out with a shared tail", () => {
    const graph = parseFigure(
      [
        "               OFS-1200",
        "            Gossip Protocol",
        "                    │",
        "     ┌──────────────┼──────────────┐",
        "     ▼              ▼              ▼",
        "OFS-2000       OFS-3000      OFS-7000",
        "Trade          Reputation     Oracle",
        "                    │",
        "                    ▼",
        "             All Protocol Events",
      ].join("\n"),
    );

    expect(graph).not.toBeNull();
    if (!graph) return;
    expect(graph.blocks.map((b) => b.kind)).toEqual(["chain", "fan", "chain"]);
    const [head, middle, tail] = graph.blocks;
    if (head.kind !== "chain" || middle.kind !== "fan" || tail.kind !== "chain")
      return;
    expect(head.nodes.map((n) => n.label)).toEqual([
      "OFS-1200 Gossip Protocol",
    ]);
    expect(middle.children.map((n) => n.label)).toEqual([
      "OFS-2000 Trade",
      "OFS-3000 Reputation",
      "OFS-7000 Oracle",
    ]);
    expect(tail.nodes.map((n) => n.label)).toEqual(["All Protocol Events"]);
  });

  it("parses a figure that branches, merges, then branches again", () => {
    const graph = parseFigure(
      [
        "          OFS-1000",
        "      Network Foundation",
        "               │",
        "     ┌─────────┴─────────┐",
        "     ▼                   ▼",
        " OFS-1100           OFS-1200",
        " Discovery           Gossip",
        "     │                   │",
        "     └─────────┬─────────┘",
        "               ▼",
        "          OFS-1400",
        "         Sessions",
      ].join("\n"),
    );

    expect(graph).not.toBeNull();
    if (!graph) return;
    // chain -> fan -> (merge, which is a connector) -> chain
    expect(graph.blocks.map((b) => b.kind)).toEqual(["chain", "fan", "chain"]);
    const fan = graph.blocks[1];
    if (fan.kind !== "fan") return;
    expect(fan.children.map((n) => n.label)).toEqual([
      "OFS-1100 Discovery",
      "OFS-1200 Gossip",
    ]);
  });

  it("declines figures drawn as full rectangles", () => {
    const graph = parseFigure(
      ["┌────────────┐", "│  Some box  │", "└────────────┘"].join("\n"),
    );
    expect(graph).toBeNull();
  });
});
