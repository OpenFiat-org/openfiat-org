import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { ARBITRATOR_MIN_BOND, CODE } from "@/lib/arbitrator-guide";
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
    title: t.becomeArbitrator.title,
    description: t.becomeArbitrator.intro,
    alternates: { canonical: `/${raw}/become-an-arbitrator` },
    openGraph: {
      title: `${t.becomeArbitrator.title} · ${SITE.name}`,
      description: t.becomeArbitrator.intro,
      url: `/${raw}/become-an-arbitrator`,
    },
  };
}

/** Which command belongs to which step of the walkthrough. */
const STEP_CODE: Record<string, { code: string; filename?: string }[]> = {
  bond: [{ code: CODE.bond, filename: "stake.ts" }],
  discover: [{ code: CODE.discover }],
  join: [{ code: CODE.join, filename: "join.rs" }],
  commit: [{ code: CODE.commit, filename: "commit.rs + commit.ts" }],
  reveal: [{ code: CODE.reveal, filename: "reveal.rs + reveal.ts" }],
  resolve: [{ code: CODE.resolve, filename: "resolve.ts" }],
};

export default async function BecomeAnArbitratorPage({ params }: Props) {
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
        title={t.becomeArbitrator.title}
        lede={t.becomeArbitrator.intro}
        actions={
          <Button
            href={l("/participate/arbitrators")}
            variant="secondary"
            size="lg"
          >
            {t.actors.readMore}
          </Button>
        }
      />

      <Section
        className="border-t border-line"
        title={t.becomeArbitrator.requirementsTitle}
      >
        <ul className="max-w-2xl space-y-3">
          {c.becomeArbitrator.requirements.map((item) => (
            <li key={item} className="flex gap-3 text-body">
              <span
                aria-hidden="true"
                className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <Button href={`${SITE.appUrl}/staking`} external>
            {t.becomeArbitrator.bondCta.replace(
              "{amount}",
              ARBITRATOR_MIN_BOND.toLocaleString(locale),
            )}
          </Button>
        </div>
      </Section>

      <Section
        className="border-t border-line"
        title={t.becomeArbitrator.lifecycleTitle}
        subtitle={t.becomeArbitrator.lifecycleNote}
      >
        <ol className="space-y-14">
          {c.becomeArbitrator.walkthrough.map((step, index) => (
            <li key={step.id} className="scroll-mt-24" id={step.id}>
              <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
                <div>
                  <span className="font-mono text-xs tabular-nums text-accent-mid">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-h3 text-ink">{step.title}</h3>
                  <p className="mt-3 text-body-sm text-body">{step.body}</p>
                </div>
                <div className="space-y-4">
                  {STEP_CODE[step.id]?.map((block) => (
                    <CodeBlock
                      key={block.code.slice(0, 40)}
                      code={block.code}
                      filename={block.filename}
                      copyLabel={t.becomeArbitrator.copy}
                      copiedLabel={t.becomeArbitrator.copied}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <CtaBand
        title={t.becomeArbitrator.neverCustody}
        actions={
          <>
            <Button
              href={l(
                "/whitepaper/11-the-openfiat-dispute-resolution-protocol",
              )}
              size="lg"
            >
              {t.common.readWhitepaper}
            </Button>
            <Button href={l("/participate")} variant="secondary" size="lg">
              {t.home.roles.seeAll}
            </Button>
          </>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t.becomeArbitrator.title,
          description: t.becomeArbitrator.intro,
          url: `${SITE.url}/${locale}/become-an-arbitrator`,
          step: c.becomeArbitrator.walkthrough.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.body,
            url: `${SITE.url}/${locale}/become-an-arbitrator#${step.id}`,
          })),
        }}
      />
    </>
  );
}
