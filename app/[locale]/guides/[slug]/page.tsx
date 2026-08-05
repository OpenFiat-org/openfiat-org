import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { resolveMilestone } from "@/components/guides/milestones";
import { PathStrip } from "@/components/guides/path-strip";
import { StepDoneButton } from "@/components/guides/step-done-button";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import { GUIDES, getGuide, pathForMilestone } from "@/lib/guides";
import {
  getDictionary,
  isLocale,
  type Locale,
  localePath,
  localize,
} from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title[raw],
    description: guide.summary[raw],
    alternates: { canonical: `/${raw}/guides/${slug}` },
    openGraph: {
      title: `${guide.title[raw]} · ${SITE.name}`,
      description: guide.summary[raw],
      url: `/${raw}/guides/${slug}`,
    },
  };
}

export default async function GuidePage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const guide = getGuide(slug);
  if (!guide) notFound();

  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  /*
   * Where this guide sits on its path drives three things: the sticky strip
   * under the site nav, the "milestone N of M" line in the hero, and the
   * prev/next links after the steps. A guide no path claims simply gets none
   * of them.
   */
  const pathInfo = pathForMilestone(guide.slug);
  const milestones =
    pathInfo?.path.milestones.map((milestone) =>
      resolveMilestone(milestone, t, locale),
    ) ?? [];
  const previous = pathInfo ? milestones[pathInfo.index - 1] : undefined;
  const next = pathInfo ? milestones[pathInfo.index + 1] : undefined;

  return (
    <>
      {pathInfo && (
        <PathStrip
          path={pathInfo.path}
          currentIndex={pathInfo.index}
          t={t}
          locale={locale}
        />
      )}

      <PageHero
        variant="layers"
        title={localize(guide.title, locale)}
        lede={localize(guide.intro, locale)}
        actions={
          <Button href={l("/guides")} variant="secondary" size="lg">
            {t.guides.allGuides}
          </Button>
        }
        meta={
          pathInfo
            ? `${t.guides.milestoneOf(pathInfo.index + 1, milestones.length)} · ${localize(pathInfo.path.title, locale)}`
            : undefined
        }
      />

      <Section
        className="border-t border-line"
        title={t.guides.requirementsTitle}
      >
        <ul className="max-w-2xl space-y-3">
          {localize(guide.requirements, locale).map((item) => (
            <li key={item} className="flex gap-3 text-body">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section className="border-t border-line" title={t.guides.stepsTitle}>
        <ol className="space-y-14">
          {guide.steps.map((step, index) => (
            <li key={step.id} className="scroll-mt-32" id={step.id}>
              <div className="grid gap-6 lg:grid-cols-[4.5rem_18rem_minmax(0,1fr)] lg:gap-10">
                {/*
                 * The outlined numeral rides alongside long steps instead of
                 * scrolling away with the heading — the same wayfinding job
                 * the small inline number does on narrow screens.
                 */}
                <span
                  aria-hidden="true"
                  className="hidden select-none font-mono text-[3.5rem] font-semibold leading-none text-transparent [-webkit-text-stroke:1px_var(--color-line-strong)] lg:sticky lg:top-32 lg:block lg:self-start"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <span className="font-mono text-xs tabular-nums text-accent-mid lg:hidden">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-h3 text-ink lg:mt-0">
                    {localize(step.title, locale)}
                  </h3>
                  <p className="mt-3 text-body-sm text-body">
                    {localize(step.body, locale)}
                  </p>
                  <div className="mt-4">
                    <StepDoneButton
                      slug={guide.slug}
                      stepId={step.id}
                      label={t.guides.markStepDone}
                      doneLabel={t.guides.stepDoneLabel}
                    />
                  </div>
                </div>
                {/*
                 * `min-w-0` overrides the grid item's default `min-width: auto`,
                 * whose content-based minimum is the longest line in the block —
                 * without it a wide command drags the section past the viewport
                 * instead of scrolling inside its own box.
                 */}
                <div className="min-w-0 space-y-4">
                  {step.code?.map((block) => (
                    <CodeBlock
                      key={block.code.slice(0, 40)}
                      code={block.code}
                      filename={block.filename}
                      copyLabel={t.guides.copy}
                      copiedLabel={t.guides.copied}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {(previous || next) && (
        <Section className="border-t border-line">
          <nav className="flex items-start justify-between gap-6">
            {previous ? (
              <Link href={previous.href} className="group max-w-xs">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-faint">
                  ← {t.guides.prevOnPath}
                </span>
                <span className="mt-2 block font-semibold text-ink transition-colors group-hover:text-accent-mid">
                  {previous.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link href={next.href} className="group max-w-xs text-right">
                <span className="font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-faint">
                  {t.guides.nextOnPath} →
                </span>
                <span className="mt-2 block font-semibold text-ink transition-colors group-hover:text-accent-mid">
                  {next.title}
                </span>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        </Section>
      )}

      {guide.related && guide.related.length > 0 && (
        <Section className="border-t border-line" title={t.guides.relatedTitle}>
          <div className="max-w-3xl">
            <Rows>
              {guide.related.map((link) => (
                <Row
                  key={link.href}
                  href={link.external ? link.href : l(link.href)}
                  title={localize(link.label, locale)}
                />
              ))}
            </Rows>
          </div>
        </Section>
      )}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: localize(guide.title, locale),
          description: localize(guide.summary, locale),
          url: `${SITE.url}/${locale}/guides/${guide.slug}`,
          step: guide.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: localize(step.title, locale),
            text: localize(step.body, locale),
            url: `${SITE.url}/${locale}/guides/${guide.slug}#${step.id}`,
          })),
        }}
      />
    </>
  );
}
