import { NetworkField } from "@/components/network-field";
import { AllocationBars } from "@/components/sale/allocation-bars";
import { RaiseProgress } from "@/components/sale/raise-progress";
import { SalePanel } from "@/components/sale/sale-panel";
import { SolanaProvider } from "@/components/sale/wallet-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import {
  type Locale,
  getContent,
  getDictionary,
  isLocale,
  localePath,
} from "@/lib/i18n";
import {
  TOKENOMICS_CONFIRMED,
  TOTAL_SUPPLY,
  formatSupply,
} from "@/lib/sale/tokenomics";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.sale.title,
    description: t.sale.whatIsOpenBody,
    alternates: { canonical: `/${raw}/sale` },
    openGraph: {
      title: `${t.sale.title} · ${SITE.name}`,
      description: t.sale.whatIsOpenBody,
      url: `/${raw}/sale`,
    },
  };
}

function Listing({ label, items }: { label: string; items: string[] }) {
  return (
    <div>
      <h3 className="stat-label text-faint">{label}</h3>
      <ul className="mt-4 space-y-2">
        {items.map((item) => (
          <li key={item} className="text-body">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default async function SalePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  return (
    <>
      {/* The hero band every other page has, with the escrow field: nodes
          circling a held centre, which is what a presale vault is. The canvas
          is lazily loaded and never in the server payload, so the LCP element
          stays the h1. */}
      <section className="relative overflow-hidden border-b border-line">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dotted opacity-30 lg:opacity-70"
        />
        <NetworkField variant="escrow" />
        <Container className="relative z-10 pt-16 pb-12 md:pt-24 md:pb-16">
          <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_23rem]">
            <div className="max-w-2xl">
              <h1
                className="font-extrabold tracking-[-0.02em] text-ink"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.25rem)",
                  lineHeight: 1.06,
                }}
              >
                {t.sale.title}
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-body">
                {t.sale.whatIsOpenBody}
              </p>

              <div className="mt-12">
                <RaiseProgress sale={t.sale} locale={locale} />
              </div>
            </div>

            <div>
              {/* Wallet context mounts only on this route, so no other page
                pays for the web3 bundle. */}
              <SolanaProvider>
                <SalePanel sale={t.sale} />
              </SolanaProvider>
            </div>
          </div>
        </Container>
      </section>

      <Section title={t.sale.supplyTitle} subtitle={t.sale.supplyBody}>
        <div className="mb-10 flex flex-wrap items-baseline gap-x-4">
          <span className="stat-label text-faint">
            {t.tokenomics.supplyLabel}
          </span>
          <span className="stat-num tnum text-ink">
            {TOTAL_SUPPLY === null
              ? t.tokenomics.supplyPending
              : `${formatSupply(TOTAL_SUPPLY, locale)} OPEN`}
          </span>
        </div>

        <AllocationBars
          labels={c.sale.allocationLabels}
          vesting={c.sale.allocationVesting}
          ariaLabel={t.tokenomics.allocationAria}
        />

        {!TOKENOMICS_CONFIRMED && (
          <p className="mt-8 max-w-2xl text-body-sm text-faint">
            {t.tokenomics.provisional}
          </p>
        )}

        <div className="mt-16">
          <h3 className="text-h3 text-ink">{t.tokenomics.proceedsTitle}</h3>
          <ul className="mt-8 grid gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {c.sale.useOfFunds.map((item, index) => (
              <li key={item} className="border-t border-line pt-5">
                <p className="font-mono text-xs tabular-nums text-accent-mid">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-body">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section
        className="border-t border-line"
        title={t.sale.vestingTitle}
        subtitle={t.sale.vestingNote}
      >
        <div className="grid max-w-3xl gap-12 sm:grid-cols-2">
          <Listing label={t.sale.whatVests} items={c.sale.vesting} />
          <Listing label={t.sale.protectionsTitle} items={c.sale.protections} />
        </div>

        <div className="mt-14 max-w-2xl border-t border-line pt-8">
          <h3 className="stat-label text-faint">{t.sale.riskTitle}</h3>
          <p className="mt-3 text-body">{t.sale.riskBody}</p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <Button href={l("/whitepaper/14-genesis-and-token-distribution")}>
            {t.common.readWhitepaper}
          </Button>
          <Button
            href={l("/whitepaper/13-the-openfiat-token-economy")}
            variant="secondary"
          >
            {t.sale.whatIsOpen}
          </Button>
        </div>
      </Section>
    </>
  );
}
