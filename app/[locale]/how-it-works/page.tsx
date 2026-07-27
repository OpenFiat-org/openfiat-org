import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import {
  getContent,
  getDictionary,
  isLocale,
  type Locale,
  localePath,
} from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.howItWorks.title,
    description: t.howItWorks.lede,
    alternates: { canonical: `/${raw}/how-it-works` },
    openGraph: {
      title: `${t.howItWorks.title} · ${SITE.name}`,
      description: t.howItWorks.lede,
      url: `/${raw}/how-it-works`,
    },
  };
}

export default async function HowItWorksPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  return (
    <>
      <PageHero
        title={t.howItWorks.title}
        lede={t.howItWorks.lede}
        actions={
          <>
            <Button href={l("/trust")} size="lg">
              {t.home.safety.more}
            </Button>
            <Button href={l("/participate")} variant="secondary" size="lg">
              {t.home.roles.seeAll}
            </Button>
          </>
        }
      />

      {/* The trade itself, one step per row so each has room to explain. */}
      <Section title={t.howItWorks.flowTitle}>
        <ol className="space-y-12">
          {c.trust.flow.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-4 border-t border-line pt-8 lg:grid-cols-[4rem_minmax(0,26rem)_minmax(0,1fr)] lg:gap-10"
            >
              <span className="font-mono text-sm tabular-nums text-accent-mid">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="text-h3 text-ink">{step.title}</h3>
              <p className="max-w-prose text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* What a first-time trader actually needs. */}
      <Section className="border-t border-line" title={t.howItWorks.needTitle}>
        <div className="max-w-3xl">
          <Rows>
            {t.howItWorks.need.map((item, index) => (
              <Row
                key={item}
                lead={String(index + 1).padStart(2, "0")}
                title={item}
              />
            ))}
          </Rows>
        </div>
      </Section>

      <Section
        className="border-t border-line"
        title={t.howItWorks.railsTitle}
        subtitle={t.howItWorks.railsLede}
      >
        <ul className="grid gap-x-12 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {c.home.rails.map((rail) => (
            <li key={rail} className="border-t border-line pt-4 text-body">
              {rail}
            </li>
          ))}
        </ul>
      </Section>

      <Section
        className="border-t border-line"
        title={t.howItWorks.safetyTitle}
        subtitle={t.howItWorks.safetyLede}
      >
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {c.trust.dispute.slice(0, 2).map((step) => (
            <div key={step.title}>
              <h3 className="text-h3 text-ink">{step.title}</h3>
              <p className="mt-3 max-w-prose text-body">{step.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={l("/trust")} variant="secondary">
            {t.howItWorks.safetyMore}
          </Button>
        </div>
      </Section>

      <CtaBand
        title={t.home.finalCta.title}
        lede={t.home.finalCta.body}
        actions={
          <>
            <Button href={l("/sale")} size="lg">
              {t.home.tokenSale}
            </Button>
            <Button href={l("/whitepaper")} variant="secondary" size="lg">
              {t.home.readWhitepaper}
            </Button>
          </>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t.howItWorks.title,
          description: t.howItWorks.lede,
          url: `${SITE.url}/${locale}/how-it-works`,
          step: c.trust.flow.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.body,
          })),
        }}
      />
    </>
  );
}
