import { NetworkField } from "@/components/network-field";
import { Toc } from "@/components/reader/toc";
import { Container } from "@/components/ui/container";
import type { TocEntry } from "@/lib/content/types";

/**
 * Shared shell for chapters and specifications.
 *
 * The document opens with the same hero band every other page uses, then the
 * body sits in a column capped near 68 characters. The corpus is written in
 * very short paragraphs — often one sentence each — and a wide measure makes
 * that read like a slide deck rather than a document.
 */
export function ReaderLayout({
  eyebrow,
  title,
  standfirst,
  meta,
  aside,
  toc,
  tocLabel,
  children,
  footer,
}: {
  eyebrow: React.ReactNode;
  title: string;
  standfirst?: string;
  meta?: React.ReactNode;
  aside?: React.ReactNode;
  toc: TocEntry[];
  tocLabel: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
}) {
  return (
    <>
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dotted opacity-30 lg:start-1/2 lg:opacity-90"
        />
        <NetworkField variant="layers" />
        <Container className="relative z-10 pt-16 pb-16 md:pt-20 md:pb-18">
          <div className="max-w-3xl">
            <div className="mb-5 flex flex-wrap items-center gap-3">
              {eyebrow}
            </div>
            <h1
              className="font-extrabold tracking-[-0.02em] text-ink"
              style={{
                fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
                lineHeight: 1.08,
              }}
            >
              {title}
            </h1>
            {standfirst && (
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-body">
                {standfirst}
              </p>
            )}
            {meta && (
              <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2">
                {meta}
              </div>
            )}
          </div>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        {/*
          The table of contents is first in DOM order and the grid flows from
          the start edge, so it sits on the left in left-to-right languages and
          automatically moves to the right under dir="rtl". No side is hardcoded.
        */}
        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12">
          <aside className="hidden lg:block">
            <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pb-8">
              <Toc entries={toc} label={tocLabel} />
            </div>
          </aside>

          <div className="min-w-0">
            {aside}
            <div className="reader max-w-[68ch]">{children}</div>
            {footer}
          </div>
        </div>
      </Container>
    </>
  );
}
