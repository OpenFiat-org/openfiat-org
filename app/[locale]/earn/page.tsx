import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EarningsModel } from "@/components/earn/earnings-model";
import { EmissionField } from "@/components/earn/emission-field";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
import {
  AVAILABILITY_BUCKETS,
  BOOTSTRAP_BUCKET,
  BOOTSTRAP_EPOCHS,
  CONNECTIVITY_GOSSIP_BPS,
  CONNECTIVITY_RPC_BPS,
  formatMultiplier,
  formatOpen,
  MIN_STAKE_OPEN,
  PER_EPOCH_EMISSION,
  PINNING_ABSENT_BPS,
  PINNING_SERVING_BPS,
  QUALITY_MATRIX,
} from "@/lib/rewards";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.earn.title,
    description: t.earn.intro,
    alternates: { canonical: `/${raw}/earn` },
    openGraph: {
      title: `${t.earn.title} · ${SITE.name}`,
      description: t.earn.intro,
      url: `/${raw}/earn`,
    },
  };
}

/**
 * The four terms of the reward formula, in the order `schedule.rs` applies
 * them.
 *
 * Labelled by their real identifiers in `crates/rewards` rather than by
 * prose names. That is not decoration: it means a reader who goes to check
 * this page against the source has the search term already, and it quietly
 * marks the whole section as a description of code that exists rather than
 * of an intention.
 */
const TERMS = [
  { id: "effective_stake", key: "termStake" },
  { id: "connectivity_bps", key: "termConnectivity" },
  { id: "availability_bps", key: "termAvailability" },
  { id: "pinning_bps", key: "termPinning" },
] as const;

export default async function EarnPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  const connectivityLabel = {
    rpc: t.earn.connectivityRpc,
    gossip: t.earn.connectivityGossip,
  };
  const pinningLabel = {
    serving: t.earn.pinningServing,
    absent: t.earn.pinningAbsent,
  };

  return (
    <>
      <PageHero
        title={t.earn.title}
        lede={t.earn.intro}
        field={<EmissionField />}
        actions={
          <>
            <Button href={l("/run-a-node")} size="lg">
              {t.earn.ctaRunNode}
            </Button>
            <Button href={l("/fees")} variant="secondary" size="lg">
              {t.earn.ctaFees}
            </Button>
          </>
        }
        meta={t.earn.heroMeta}
      />

      {/* The formula ---------------------------------------------------- */}
      <Section title={t.earn.modelTitle} subtitle={t.earn.modelIntro}>
        {/*
         * The formula as one line before the terms are explained. Scrolls
         * inside its own box on narrow viewports rather than widening the
         * page — it is the one piece of content here that cannot wrap
         * without becoming harder to read.
         */}
        <div className="overflow-x-auto rounded-card border border-line bg-code-bg p-6 md:p-8">
          <p className="w-max min-w-full font-mono text-sm leading-relaxed text-code-text">
            <span className="text-accent-mid">share</span> = emission ×{" "}
            <span className="text-teal-mid">
              (stake × connectivity × availability × pinning)
            </span>{" "}
            ÷ <span className="text-teal-mid">Σ</span>
            <span className="text-faint">
              {" "}
              (the same, for every eligible node)
            </span>
          </p>
        </div>

        <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {TERMS.map((term) => (
            <div key={term.id} className="border-t border-line pt-5">
              <p className="font-mono text-xs tracking-[0.04em] text-accent-mid">
                {term.id}
              </p>
              <h3 className="mt-3 font-semibold text-ink">
                {t.earn[`${term.key}Title`]}
              </h3>
              <p className="mt-3 text-body-sm text-body">
                {t.earn[`${term.key}Body`]}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl border-l-2 border-accent pl-5 text-body-sm text-muted">
          {t.earn.pinningAheadOfSpec}
        </p>
      </Section>

      {/* The ceiling ---------------------------------------------------- */}
      {/* Placed before the calculator on purpose. It is the single fact that
          decides whether any figure further down can be believed, and a
          reader who reaches the sliders without it will read the output as a
          projection. */}
      <Section className="border-t border-line" title={t.earn.ceilingTitle}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
          <div className="max-w-xl space-y-5">
            <p className="text-lg leading-relaxed text-ink">
              {t.earn.ceilingLede}
            </p>
            <p className="text-body">{t.earn.ceilingBody}</p>
            <p className="text-body-sm text-muted">{t.earn.ceilingPenalty}</p>
          </div>

          {/*
           * Every value the two switches can take, at full availability.
           * A table rather than four cards, because the point is a
           * comparison across two axes and a grid of cards loses the axes.
           */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[22rem] border-collapse text-left">
              <caption className="mb-5 text-left text-body-sm text-muted">
                {t.earn.matrixCaption}
              </caption>
              <thead>
                <tr>
                  <th scope="col" className="stat-label pb-3 text-faint">
                    {t.earn.connectivityLabel}
                  </th>
                  <th scope="col" className="stat-label pb-3 text-faint">
                    {t.earn.pinningLabel}
                  </th>
                  <th
                    scope="col"
                    className="stat-label pb-3 text-right text-faint"
                  >
                    {t.earn.matrixQuality}
                  </th>
                </tr>
              </thead>
              <tbody>
                {QUALITY_MATRIX.map((row) => (
                  <tr
                    key={`${row.connectivity}-${row.pinning}`}
                    className="border-t border-line"
                  >
                    <td className="py-4 pe-4 text-body-sm text-body">
                      {connectivityLabel[row.connectivity]}
                    </td>
                    <td className="py-4 pe-4 text-body-sm text-body">
                      {pinningLabel[row.pinning]}
                    </td>
                    <td className="py-4 text-right font-mono tabular-nums text-ink">
                      {formatMultiplier(row.bps)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-md text-body-sm text-faint">
              {t.earn.matrixNote
                .replace(
                  "{gossipPin}",
                  formatMultiplier(
                    (CONNECTIVITY_GOSSIP_BPS * PINNING_SERVING_BPS) / 10_000n,
                  ),
                )
                .replace(
                  "{rpcNoPin}",
                  formatMultiplier(
                    (CONNECTIVITY_RPC_BPS * PINNING_ABSENT_BPS) / 10_000n,
                  ),
                )}
            </p>
          </div>
        </div>
      </Section>

      {/* The model, adjustable ------------------------------------------ */}
      <Section
        id="calculator"
        className="border-t border-line"
        title={t.earn.calcTitle}
        subtitle={t.earn.calcIntro}
      >
        <EarningsModel t={t.earn} />
      </Section>

      {/* The pool is finite --------------------------------------------- */}
      <Section className="border-t border-line" title={t.earn.emissionTitle}>
        <div className="max-w-3xl space-y-5">
          <p className="text-lg leading-relaxed text-ink">
            {t.earn.emissionLede}
          </p>
          <p className="text-body">{t.earn.emissionBody}</p>
        </div>

        <dl className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-3">
          <div className="border-t border-line pt-5">
            <dd className="stat-num tnum text-ink">
              {formatOpen(BOOTSTRAP_BUCKET, 0)}
            </dd>
            <dt className="stat-label mt-2 text-faint">
              {t.earn.emissionBucket}
            </dt>
            <p className="mt-3 text-body-sm text-muted">
              {t.earn.emissionBucketNote}
            </p>
          </div>
          <div className="border-t border-line pt-5">
            <dd className="stat-num tnum text-ink">
              {formatOpen(PER_EPOCH_EMISSION, 0)}
            </dd>
            <dt className="stat-label mt-2 text-faint">
              {t.earn.emissionPerEpoch}
            </dt>
            <p className="mt-3 text-body-sm text-muted">
              {t.earn.emissionPerEpochNote}
            </p>
          </div>
          <div className="border-t border-line pt-5">
            <dd className="stat-num tnum text-ink">
              {BOOTSTRAP_EPOCHS.toLocaleString("en-US")}
            </dd>
            <dt className="stat-label mt-2 text-faint">
              {t.earn.emissionEpochs}
            </dt>
            <p className="mt-3 text-body-sm text-muted">
              {t.earn.emissionEpochsNote}
            </p>
          </div>
        </dl>
      </Section>

      {/* The refusals --------------------------------------------------- */}
      {/* Stated as a section rather than a footnote. A reader arriving from a
          token-return page is looking for figures that are not here, and the
          page owes them the reason rather than letting them conclude it was
          forgotten. */}
      <Section className="border-t border-line" title={t.earn.refusalTitle}>
        <div className="max-w-3xl">
          <p className="text-lg leading-relaxed text-ink">
            {t.earn.refusalLede}
          </p>
          <ul className="mt-10 space-y-8">
            {(["refusalPrice", "refusalYield", "refusalTotal"] as const).map(
              (key) => (
                <li key={key} className="border-t border-line pt-5">
                  <h3 className="font-semibold text-ink">
                    {t.earn[`${key}Title`]}
                  </h3>
                  <p className="mt-3 text-body">{t.earn[`${key}Body`]}</p>
                </li>
              ),
            )}
          </ul>
        </div>
      </Section>

      {/* What is actually running --------------------------------------- */}
      <Section className="border-t border-line" title={t.earn.statusTitle}>
        <div className="max-w-3xl space-y-6">
          <Badge tone="accent">{t.earn.statusBadge}</Badge>
          <p className="text-lg leading-relaxed text-ink">
            {t.earn.statusLede}
          </p>
          <p className="text-body">{t.earn.statusBody}</p>
          <p className="text-body-sm text-muted">
            {t.earn.statusParams
              .replace("{min}", MIN_STAKE_OPEN.toLocaleString("en-US"))
              .replace("{buckets}", String(AVAILABILITY_BUCKETS))}
          </p>
          <p className="text-body-sm text-faint">{t.earn.sourceNote}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button
              href={`${SITE.githubOrg}/openfiat-core/tree/main/crates/rewards`}
              variant="secondary"
              external
            >
              {t.earn.sourceLink}
            </Button>
            <Button href={l("/specs/ofs-4100")} variant="secondary">
              {t.earn.specLink}
            </Button>
          </div>
        </div>
      </Section>

      <CtaBand
        title={t.earn.ctaTitle}
        lede={t.earn.ctaBody}
        actions={
          <>
            <Button href={l("/run-a-node")} size="lg">
              {t.earn.ctaRunNode}
            </Button>
            <Button
              href={l("/participate/node-operators")}
              variant="secondary"
              size="lg"
            >
              {t.actors.readMore}
            </Button>
          </>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t.earn.title,
          description: t.earn.intro,
          url: `${SITE.url}/${locale}/earn`,
        }}
      />
    </>
  );
}
