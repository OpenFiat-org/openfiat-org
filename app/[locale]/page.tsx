import { NetworkField } from "@/components/network-field";
import { RewardsCard } from "@/components/sale/rewards-card";
import { SolanaProvider } from "@/components/sale/wallet-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { CtaBand } from "@/components/ui/cta-band";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import { ACTORS } from "@/lib/actors";
import { getChapters, getSpecs } from "@/lib/content";
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
    title: `${SITE.name} — ${t.meta.tagline}`,
    description: t.meta.description,
    alternates: { canonical: `/${raw}` },
  };
}

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  const chapters = getChapters();
  const specCount = getSpecs().length;

  return (
    <>
      {/* Hero — the only place on the page with motion or ornament. */}
      <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dotted opacity-30 lg:start-1/2 lg:opacity-90"
        />
        <NetworkField />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-14">
            <div className="max-w-[680px]">
              <h1
                className="font-extrabold tracking-[-0.02em] text-ink"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  lineHeight: 1.04,
                }}
              >
                {t.home.headlineLead}{" "}
                <span className="text-accent-mid">{t.home.headlineAccent}</span>
                {t.home.headlineTail}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-body">
                {t.home.lede}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={l("/trust")} size="lg">
                  {t.home.ctaHowItWorks}
                </Button>
                <Button href={l("/participate")} variant="secondary" size="lg">
                  {t.home.roles.seeAll}
                </Button>
              </div>
            </div>

            {/* Wallet context mounts only here, same reasoning as /sale:
                no other page pays for the web3 bundle. */}
            <SolanaProvider>
              <RewardsCard sale={t.sale} />
            </SolanaProvider>
          </div>
        </Container>
      </section>

      {/* How a trade works — the first thing a buyer or merchant needs. */}
      <Section
        className="border-t border-line"
        title={t.home.steps.title}
        subtitle={t.home.steps.subtitle}
      >
        <ol className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {c.trust.flow.map((step, index) => (
            <li key={step.title}>
              <span className="font-mono text-xs tabular-nums text-accent-mid">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 text-h3 text-ink">{step.title}</h3>
              <p className="mt-3 max-w-prose text-body">{step.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* Why it is safe. */}
      <Section
        className="border-t border-line"
        title={t.home.safety.title}
        subtitle={t.home.safety.subtitle}
      >
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          {c.trust.pillars.map((pillar) => (
            <div key={pillar.title}>
              <h3 className="text-h3 text-ink">{pillar.title}</h3>
              <p className="mt-3 max-w-prose text-body">{pillar.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <Button href={l("/trust")} variant="secondary">
            {t.home.safety.more}
          </Button>
        </div>
      </Section>

      {/* What people actually use it for. */}
      <Section
        className="border-t border-line"
        title={t.home.scenarios.title}
        subtitle={t.home.scenarios.subtitle}
      >
        <Rows>
          {c.home.scenarios.map((scenario) => (
            <Row
              key={scenario.code}
              lead={scenario.code}
              title={scenario.text}
            />
          ))}
        </Rows>
        <p className="mt-8 max-w-2xl text-body-sm text-muted">
          <span className="text-faint">{t.home.scenarios.railsLabel}: </span>
          {c.home.rails.join(", ")}
        </p>
      </Section>

      {/* Roles, for the minority who want to run something. */}
      <Section
        className="border-t border-line"
        title={t.home.roles.title}
        subtitle={t.home.roles.subtitle}
      >
        <Rows>
          {ACTORS.map((actor) => (
            <Row
              key={actor.slug}
              href={l(`/participate/${actor.slug}`)}
              title={c.actors[actor.slug].name}
              subtitle={c.actors[actor.slug].summary}
            />
          ))}
        </Rows>
      </Section>

      {/* The protocol story, kept short and last. */}
      <Section
        className="border-t border-line"
        title={t.home.builders.title}
        subtitle={t.home.builders.subtitle}
      >
        <div className="flex flex-wrap gap-3">
          <Button href={l("/run-a-node")} variant="secondary">
            {t.home.builders.runNode}
          </Button>
          <Button href={l("/specs")} variant="secondary">
            {t.home.builders.specs}
          </Button>
          <Button href={l("/whitepaper")} variant="secondary">
            {t.home.readWhitepaper}
          </Button>
        </div>
        <p className="mt-8 text-body-sm text-faint">
          {t.home.corpusNote(chapters.length, specCount)}
        </p>
      </Section>

      <CtaBand
        title={t.home.finalCta.title}
        lede={t.home.finalCta.body}
        actions={
          <>
            <Button href={l("/trust")} size="lg">
              {t.home.finalCta.start}
            </Button>
            <Button href={l("/sale")} variant="secondary" size="lg">
              {t.home.tokenSale}
            </Button>
          </>
        }
      />
    </>
  );
}
