import Link from "next/link";
import { Fragment } from "react";
import { Container } from "@/components/ui/container";
import type { GuidePath } from "@/lib/guides";
import type { Dictionary, Locale } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { MilestoneDot } from "./milestone-dot";
import { resolveMilestone } from "./milestones";

/**
 * The sticky strip under the site nav showing where the current page sits on
 * its guide path. The shared guide renderer and the two standalone milestone
 * pages (`/run-a-node`, `/become-an-arbitrator`) all render it, so following
 * a path never loses the journey when a stop happens to live at its own URL.
 */
export function PathStrip({
  path,
  currentIndex,
  t,
  locale,
}: {
  path: GuidePath;
  currentIndex: number;
  t: Dictionary;
  locale: Locale;
}) {
  const milestones = path.milestones.map((milestone) =>
    resolveMilestone(milestone, t, locale),
  );

  return (
    <div className="sticky top-16 z-40 border-b border-line bg-bg/90 backdrop-blur">
      <Container>
        <nav
          aria-label={path.title[locale]}
          className="flex items-center gap-3 overflow-x-auto py-3"
        >
          <span className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-accent-mid">
            {path.role[locale]}
          </span>
          <span
            aria-hidden="true"
            className="h-3 w-px shrink-0 bg-line-strong"
          />
          {milestones.map((milestone, index) => {
            const isCurrent = index === currentIndex;
            return (
              <Fragment key={milestone.key}>
                {index > 0 && (
                  <span
                    aria-hidden="true"
                    className="h-px w-5 shrink-0 bg-line-strong"
                  />
                )}
                <Link
                  href={milestone.href}
                  aria-current={isCurrent ? "page" : undefined}
                  className={cn(
                    "flex shrink-0 items-center gap-2 whitespace-nowrap text-xs transition-colors",
                    isCurrent
                      ? "font-semibold text-ink"
                      : "text-faint hover:text-body",
                  )}
                >
                  <MilestoneDot
                    slug={milestone.slug}
                    stepIds={milestone.stepIds}
                    current={isCurrent}
                    className="h-2.5 w-2.5"
                  />
                  {milestone.title}
                </Link>
              </Fragment>
            );
          })}
        </nav>
      </Container>
    </div>
  );
}
