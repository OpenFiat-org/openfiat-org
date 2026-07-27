"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/content/types";
import { cn } from "@/lib/utils";

/**
 * Sticky table of contents with scroll-spy.
 *
 * Chapters run 15-27 sections, so a reader needs to see where they are. The
 * observer uses a top-biased root margin so a heading counts as "current"
 * once it reaches the upper third of the viewport rather than the very top.
 */
export function Toc({
  entries,
  label,
}: {
  entries: TocEntry[];
  label: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(
    entries[0]?.id ?? null,
  );

  useEffect(() => {
    if (entries.length === 0) return;

    const headings = entries
      .map((entry) => document.getElementById(entry.id))
      .filter((element): element is HTMLElement => element !== null);

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (records) => {
        const visible = records
          .filter((record) => record.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-88px 0px -66% 0px", threshold: 0 },
    );

    for (const heading of headings) observer.observe(heading);
    return () => observer.disconnect();
  }, [entries]);

  /*
   * Smooth scrolling lives here rather than in `html { scroll-behavior }`,
   * because the global rule also animates the router's scroll reset and makes
   * every navigation look like a flash. Reduced-motion preferences fall back
   * to an instant jump, and the URL hash is still updated so the link can be
   * copied.
   */
  function jumpTo(event: React.MouseEvent<HTMLAnchorElement>, id: string) {
    const target = document.getElementById(id);
    if (!target) return;
    event.preventDefault();
    const reduce = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    target.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  if (entries.length === 0) return null;

  return (
    <nav aria-label={label} className="text-sm">
      <p className="stat-label mb-4 text-faint">{label}</p>
      <ul className="space-y-1 border-l border-line">
        {entries.map((entry) => (
          <li key={entry.id}>
            <a
              href={`#${entry.id}`}
              onClick={(event) => jumpTo(event, entry.id)}
              aria-current={activeId === entry.id ? "location" : undefined}
              className={cn(
                "-ml-px block border-l py-1 pl-3 transition-colors",
                entry.depth === 3 && "pl-6",
                activeId === entry.id
                  ? "border-accent text-ink"
                  : "border-transparent text-muted hover:border-line-strong hover:text-body",
              )}
            >
              {entry.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
