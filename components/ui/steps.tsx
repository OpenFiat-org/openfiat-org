/**
 * A numbered sequence, laid out as a grid rather than a single tall column.
 *
 * A ten-step procedure in one narrow column left most of the page empty and
 * read as a sparse list. Flowing the steps across columns fills the measure,
 * keeps each step short, and still reads in order — numbering is real here,
 * because the order is the procedure.
 */
export function Steps({ items }: { items: string[] }) {
  return (
    <ol className="grid gap-x-10 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <li
          key={item}
          className="flex items-baseline gap-4 border-b border-line py-4"
        >
          <span className="w-6 shrink-0 font-mono text-xs tabular-nums text-accent-mid">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-body">{item}</span>
        </li>
      ))}
    </ol>
  );
}
