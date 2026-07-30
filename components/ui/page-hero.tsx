import type { FieldVariant } from "@/components/network-canvas";
import { NetworkField } from "@/components/network-field";
import { Container } from "./container";

/**
 * The opening band on every page, matching the homepage: the drifting node
 * field over a dotted grid, one headline, one sentence, at most two actions.
 *
 * The canvas is the same lazily-loaded component the homepage uses — never in
 * the server payload, paused when scrolled out of view, and reduced to a
 * single static frame under prefers-reduced-motion.
 */
export function PageHero({
  title,
  lede,
  actions,
  aside,
  meta,
  variant = "mesh",
  field,
}: {
  title: string;
  lede?: string;
  actions?: React.ReactNode;
  aside?: React.ReactNode;
  /** Quiet single line under the actions: counts, versions, reading time. */
  meta?: React.ReactNode;
  /** Which field animation represents this page. */
  variant?: FieldVariant;
  /**
   * Replaces the node field with a canvas of the page's own.
   *
   * Only worth reaching for when a page's subject has a shape the shared
   * field cannot express — the earnings page draws a fixed pool dividing,
   * which is an allocation rather than a drift. Everything else should use a
   * `variant`, so the site keeps one visual language rather than accumulating
   * a bespoke hero per page.
   */
  field?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dotted opacity-30 lg:start-1/2 lg:opacity-90"
      />
      {field ?? <NetworkField variant={variant} />}
      <Container className="relative z-10 pt-20 pb-20 md:pt-28 md:pb-24">
        <div className="max-w-[680px]">
          <h1
            className="font-extrabold tracking-[-0.02em] text-ink"
            style={{
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              lineHeight: 1.05,
            }}
          >
            {title}
          </h1>
          {lede && (
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-body">
              {lede}
            </p>
          )}
          {actions && (
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              {actions}
            </div>
          )}
          {meta && <p className="mt-8 text-body-sm text-faint">{meta}</p>}
          {aside}
        </div>
      </Container>
    </section>
  );
}
