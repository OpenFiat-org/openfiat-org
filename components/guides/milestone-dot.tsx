"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { isGuideDone, readProgress, subscribeToProgress } from "./progress";

/**
 * The dot marking a path milestone. Server renders it empty; on mount it
 * fills teal once the guide's steps are all marked done. Standalone pages
 * have no steps to track, so their dots stay empty — pass no `slug`.
 */
export function MilestoneDot({
  slug,
  stepIds = [],
  current = false,
  className,
}: {
  slug?: string;
  stepIds?: string[];
  current?: boolean;
  className?: string;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!slug || stepIds.length === 0) return;
    const update = () => setDone(isGuideDone(readProgress(), slug, stepIds));
    update();
    return subscribeToProgress(update);
    // stepIds is rebuilt per render by the server parent; its contents are
    // stable, and re-subscribing on identity change is cheaper than a deep
    // compare at these sizes (≤ 8 ids).
  }, [slug, stepIds]);

  return (
    <span
      aria-hidden="true"
      className={cn(
        "block shrink-0 rounded-full border-2",
        done
          ? "border-teal bg-teal"
          : current
            ? "border-accent bg-bg shadow-[0_0_0_3px_var(--color-accent-soft)]"
            : "border-line-strong bg-bg",
        className,
      )}
    />
  );
}
