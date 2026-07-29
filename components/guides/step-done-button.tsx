"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  isStepDone,
  readProgress,
  subscribeToProgress,
  toggleStepDone,
} from "./progress";

/**
 * Per-step check-off on a guide page. Toggling writes localStorage and every
 * other progress-aware component on the page (dots, the path strip) updates
 * through the shared change event.
 */
export function StepDoneButton({
  slug,
  stepId,
  label,
  doneLabel,
}: {
  slug: string;
  stepId: string;
  label: string;
  doneLabel: string;
}) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const update = () => setDone(isStepDone(readProgress(), slug, stepId));
    update();
    return subscribeToProgress(update);
  }, [slug, stepId]);

  return (
    <button
      type="button"
      aria-pressed={done}
      onClick={() => toggleStepDone(slug, stepId)}
      className={cn(
        "inline-flex items-center gap-2 rounded-pill border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-[0.08em] transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]",
        done
          ? "border-teal/60 bg-teal/10 text-teal-mid"
          : "border-line-strong text-faint hover:border-teal/60 hover:text-teal-mid",
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          "block h-2 w-2 rounded-full border",
          done ? "border-teal bg-teal" : "border-current",
        )}
      />
      {done ? doneLabel : label}
    </button>
  );
}
