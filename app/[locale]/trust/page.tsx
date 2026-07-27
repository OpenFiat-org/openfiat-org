import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import {
  type Locale,
  getContent,
  getDictionary,
  isLocale,
  localePath,
} from "@/lib/i18n";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.trust.title,
    description: t.trust.lede,
    alternates: { canonical: `/${raw}/trust` },
    openGraph: {
      title: `${t.trust.title} · ${SITE.name}`,
      description: t.trust.lede,
      url: `/${raw}/trust`,
    },
  };
}

/** A numbered sequence where each step needs room to explain itself. */
function Numbered({
  items,
}: {
  items: { title: string; body: string }[];
}) {
  return (
    <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
      {items.map((item, index) => (
        <li key={item.title}>
          <span className="font-mono text-xs tabular-nums text-accent-mid">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-2 text-h3 text-ink">{item.title}</h3>
          <p className="mt-3 max-w-prose text-body">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export default async function TrustPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  return (
    <>
      <PageHero
        variant="escrow"
        title={t.trust.title}
        lede={t.trust.lede}
        actions={
          <>
            <Button href={l("/how-it-works")} size="lg">
              {t.home.ctaHowItWorks}
            </Button>
            <Button href={l("/participate")} variant="secondary" size="lg">
              {t.home.roles.seeAll}
            </Button>
          </>
        }
      />

      <Section className="border-t border-line" title={t.trust.pillarsTitle}>
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {c.trust.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="text-h3 text-ink">{pillar.title}</h3>
              <p className="mt-3 max-w-prose text-body">{pillar.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        className="border-t border-line"
        title={t.trust.disputeTitle}
        subtitle={t.trust.disputeLede}
      >
        <Numbered items={c.trust.dispute} />
        <p className="mt-12 max-w-2xl border-s-2 border-accent ps-5 text-lg leading-relaxed text-ink">
          {t.trust.noAppeal}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            href={l("/whitepaper/11-the-openfiat-dispute-resolution-protocol")}
            variant="secondary"
          >
            {t.trust.readChapter}
          </Button>
          <Button
            href={l("/whitepaper/09-the-openfiat-reputation-engine")}
            variant="secondary"
          >
            {t.trust.readReputation}
          </Button>
        </div>
      </Section>

      <CtaBand
        title={t.home.finalCta.title}
        lede={t.home.finalCta.body}
        actions={
          <>
            <Button href={l("/")} size="lg">
              {t.home.ctaHowItWorks}
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
          "@type": "FAQPage",
          mainEntity: [...c.trust.pillars, ...c.trust.dispute].map((item) => ({
            "@type": "Question",
            name: item.title,
            acceptedAnswer: { "@type": "Answer", text: item.body },
          })),
        }}
      />
    </>
  );
}
