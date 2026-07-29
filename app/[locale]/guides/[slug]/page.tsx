import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import { GUIDES, getGuide } from "@/lib/guides";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
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

  return (
    <>
      <PageHero
        variant="layers"
        title={guide.title[locale]}
        lede={guide.intro[locale]}
        actions={
          <Button href={l("/guides")} variant="secondary" size="lg">
            {t.guides.allGuides}
          </Button>
        }
      />

      <Section
        className="border-t border-line"
        title={t.guides.requirementsTitle}
      >
        <ul className="max-w-2xl space-y-3">
          {guide.requirements[locale].map((item) => (
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
            <li key={step.id} className="scroll-mt-24" id={step.id}>
              <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
                <div>
                  <span className="font-mono text-xs tabular-nums text-accent-mid">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-h3 text-ink">
                    {step.title[locale]}
                  </h3>
                  <p className="mt-3 text-body-sm text-body">
                    {step.body[locale]}
                  </p>
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

      {guide.related && guide.related.length > 0 && (
        <Section className="border-t border-line" title={t.guides.relatedTitle}>
          <div className="max-w-3xl">
            <Rows>
              {guide.related.map((link) => (
                <Row
                  key={link.href}
                  href={link.external ? link.href : l(link.href)}
                  title={link.label[locale]}
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
          name: guide.title[locale],
          description: guide.summary[locale],
          url: `${SITE.url}/${locale}/guides/${guide.slug}`,
          step: guide.steps.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title[locale],
            text: step.body[locale],
            url: `${SITE.url}/${locale}/guides/${guide.slug}#${step.id}`,
          })),
        }}
      />
    </>
  );
}
