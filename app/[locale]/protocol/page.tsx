import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import { getSpecs, specsByFamily } from "@/lib/content";
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
    title: t.protocolPage.title,
    description: t.protocolPage.lede,
    alternates: { canonical: `/${raw}/protocol` },
    openGraph: {
      title: `${t.protocolPage.title} · ${SITE.name}`,
      description: t.protocolPage.lede,
      url: `/${raw}/protocol`,
    },
  };
}

export default async function ProtocolPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  const families = specsByFamily();
  const specCount = getSpecs().length;

  return (
    <>
      <PageHero
        title={t.protocolPage.title}
        lede={t.protocolPage.lede}
        actions={
          <>
            <Button href={l("/whitepaper")} size="lg">
              {t.common.readWhitepaper}
            </Button>
            <Button href={l("/specs")} variant="secondary" size="lg">
              {t.protocolPage.browseSpecs}
            </Button>
          </>
        }
      />

      {/* The two layers — the core architectural claim. */}
      <Section
        title={t.protocolPage.layersTitle}
        subtitle={t.protocolPage.layersLede}
      >
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h3 className="text-h3 text-ink">Solana</h3>
            <p className="stat-label mt-1 text-accent-mid">
              {t.protocolPage.settlement}
            </p>
            <p className="mt-4 text-body">{c.protocol.solanaBlurb}</p>
            <p className="mt-4 text-body-sm text-muted">
              {c.protocol.solanaItems.join(" · ")}
            </p>
          </div>
          <div>
            <h3 className="text-h3 text-ink">OpenFiat</h3>
            <p className="stat-label mt-1 text-accent-mid">
              {t.protocolPage.coordination}
            </p>
            <p className="mt-4 text-body">{c.protocol.openfiatBlurb}</p>
            <p className="mt-4 text-body-sm text-muted">
              {c.protocol.openfiatItems.join(" · ")}
            </p>
          </div>
        </div>
      </Section>

      {/* The reasoning. */}
      <Section
        className="border-t border-line"
        title={t.protocolPage.principlesTitle}
        subtitle={t.protocolPage.principlesLede}
      >
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {c.protocol.principles.map((principle) => (
            <div key={principle.title}>
              <h3 className="text-h3 text-ink">{principle.title}</h3>
              <p className="mt-3 max-w-prose text-body">{principle.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button
            href={l("/whitepaper/03-design-philosophy")}
            variant="secondary"
          >
            {t.protocolPage.readAll}
          </Button>
        </div>
      </Section>

      {/* The suite, from the real specification data. */}
      <Section
        className="border-t border-line"
        title={t.protocolPage.suiteTitle}
        subtitle={t.protocolPage.suiteLede(specCount)}
      >
        <Rows>
          {families.map((family) => (
            <Row
              key={family.family}
              href={l("/specs")}
              lead={family.specs[0]?.id.replace(/\d{3}$/, "xxx")}
              title={family.family}
              subtitle={family.specs.map((spec) => spec.title).join(" · ")}
              trailing={String(family.specs.length)}
            />
          ))}
        </Rows>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={l("/specs")} variant="secondary">
            {t.protocolPage.browseSpecs}
          </Button>
          <Button href={l("/run-a-node")} variant="secondary">
            {t.nav.runNode}
          </Button>
        </div>
      </Section>

      <CtaBand
        title={t.home.finalCta.title}
        lede={t.home.finalCta.body}
        actions={
          <>
            <Button href={l("/trust")} size="lg">
              {t.home.ctaHowItWorks}
            </Button>
            <Button href={l("/participate")} variant="secondary" size="lg">
              {t.home.roles.seeAll}
            </Button>
          </>
        }
      />
    </>
  );
}
