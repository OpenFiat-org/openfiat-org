import { Container } from "./container";

/**
 * The closing band on a page.
 *
 * Laid out across the full measure — statement on the start side, actions on
 * the end side — rather than stacked in a narrow left column. Stacked, it
 * left most of the width empty and read as a floating box between two rules,
 * which is the opposite of what a closing call to action should feel like.
 */
export function CtaBand({
  title,
  lede,
  actions,
}: {
  title: string;
  lede?: string;
  actions: React.ReactNode;
}) {
  return (
    <section className="border-t border-line py-20 md:py-28">
      <Container>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div className="max-w-2xl">
            <h2 className="text-h2 text-ink">{title}</h2>
            {lede && <p className="mt-5 text-body-lg text-body">{lede}</p>}
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            {actions}
          </div>
        </div>
      </Container>
    </section>
  );
}
