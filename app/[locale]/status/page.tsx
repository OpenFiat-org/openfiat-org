import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NetworkStatusCard } from "@/components/status/network-status-card";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { getDictionary, isLocale, type Locale } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const page = getDictionary(raw).pages.status;
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/${raw}/status` },
    openGraph: {
      title: `${page.title} · ${SITE.name}`,
      description: page.intro,
      url: `/${raw}/status`,
    },
  };
}

export default async function StatusPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).pages.status;

  return (
    <>
      <PageHero title={t.title} lede={t.intro} />
      <Section>
        <NetworkStatusCard t={t} locale={locale} />
      </Section>
    </>
  );
}
