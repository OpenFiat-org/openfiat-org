import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import {
  DEFAULT_RISK_PROVIDER_KEY,
  type FeeStatus,
  PARTICIPANT_FEES,
  PROVIDER_PAY,
} from "@/lib/fees";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.fees.title,
    description: t.fees.intro,
    alternates: { canonical: `/${raw}/fees` },
    openGraph: {
      title: `${t.fees.title} · ${SITE.name}`,
      description: t.fees.intro,
      url: `/${raw}/fees`,
    },
  };
}

/**
 * Live is the only status that gets the accent. The other two read as quiet
 * neutral text on purpose — nothing on this page should look active unless
 * the protocol actually moves the money.
 */
const STATUS_TONE: Record<FeeStatus, "accent" | "neutral"> = {
  live: "accent",
  specified: "neutral",
  none: "neutral",
};

/** One fee or one role. Two labelled facts, a status, and the caveat. */
function FeeRow({
  name,
  status,
  statusLabel,
  facts,
  note,
}: {
  name: string;
  status: FeeStatus;
  statusLabel: string;
  facts: { label: string; value: string }[];
  note: string;
}) {
  return (
    <li className="border-b border-line py-6 first:border-t">
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
        <h3 className="font-semibold text-ink">{name}</h3>
        <Badge tone={STATUS_TONE[status]}>{statusLabel}</Badge>
      </div>
      <dl className="mt-3 grid gap-x-10 gap-y-2 sm:grid-cols-2">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dt className="stat-label text-faint">{fact.label}</dt>
            <dd className="mt-1 text-body-sm text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
      <p className="mt-3 max-w-3xl text-body-sm text-muted">{note}</p>
    </li>
  );
}

export default async function FeesPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const statusLabel = (s: FeeStatus) => t.fees.status[s];

  return (
    <>
      <PageHero
        variant="layers"
        title={t.fees.title}
        lede={t.fees.intro}
        meta={t.fees.accuracyNote}
      />

      <Section
        className="border-t border-line"
        title={t.fees.payTitle}
        subtitle={t.fees.payIntro}
      >
        <ul className="max-w-4xl">
          {PARTICIPANT_FEES.map((fee) => (
            <FeeRow
              key={fee.id}
              name={fee.name[locale]}
              status={fee.status}
              statusLabel={statusLabel(fee.status)}
              facts={[
                { label: t.fees.columnPayer, value: fee.payer[locale] },
                { label: t.fees.columnAmount, value: fee.amount[locale] },
              ]}
              note={fee.note[locale]}
            />
          ))}
        </ul>
      </Section>

      <Section
        className="border-t border-line"
        title={t.fees.receiveTitle}
        subtitle={t.fees.receiveIntro}
      >
        <ul className="max-w-4xl">
          {PROVIDER_PAY.map((row) => (
            <FeeRow
              key={row.id}
              name={row.role[locale]}
              status={row.status}
              statusLabel={statusLabel(row.status)}
              facts={[
                {
                  label: t.fees.columnConsumer,
                  value: row.consumerPays[locale],
                },
                { label: t.fees.columnReceives, value: row.receives[locale] },
              ]}
              note={row.note[locale]}
            />
          ))}
        </ul>
      </Section>

      <Section
        className="border-t border-line"
        title={t.fees.permissionedTitle}
      >
        <div className="max-w-2xl">
          <p className="text-body">{t.fees.permissionedBody}</p>
          <p className="mt-5 stat-label text-faint">
            {t.fees.defaultProviderLabel}
          </p>
          {/* Wraps rather than truncates: a partly shown key is worse than a
              long one, because it looks checkable and is not. */}
          <p className="mt-1 break-all font-mono text-body-sm text-ink">
            {DEFAULT_RISK_PROVIDER_KEY}
          </p>
        </div>
      </Section>

      <Section className="border-t border-line" title={t.fees.governanceTitle}>
        <p className="max-w-2xl text-body">{t.fees.governanceBody}</p>
      </Section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: t.fees.title,
          description: t.fees.intro,
          url: `${SITE.url}/${locale}/fees`,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        }}
      />
    </>
  );
}
