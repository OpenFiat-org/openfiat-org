import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Section } from "@/components/ui/section";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const page = getDictionary(raw).pages.downloads;
  return {
    title: page.title,
    description: page.intro,
    alternates: { canonical: `/${raw}/downloads` },
    openGraph: {
      title: `${page.title} · ${SITE.name}`,
      description: page.intro,
      url: `/${raw}/downloads`,
    },
  };
}

export default async function DownloadsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale).pages.downloads;
  const l = (path: string) => localePath(path, locale);

  /* Each repo publishes its own tagged GitHub Releases — there is no
     unified downloads service, so this is three links, not one. */
  const releases = [
    {
      id: "node",
      title: t.nodeTitle,
      body: t.nodeBody,
      href: `${SITE.githubOrg}/openfiat-core/releases`,
    },
    {
      id: "sdk",
      title: t.sdkTitle,
      body: t.sdkBody,
      href: `${SITE.githubOrg}/openfiat-sdks/releases`,
    },
    {
      id: "app",
      title: t.appTitle,
      body: t.appBody,
      href: `${SITE.githubOrg}/openfiat-app/releases`,
    },
  ];

  return (
    <>
      <PageHero title={t.title} lede={t.intro} />

      <Section title={t.releasesTitle} subtitle={t.releasesIntro}>
        <div className="grid max-w-4xl gap-x-12 gap-y-10 sm:grid-cols-3">
          {releases.map((release) => (
            <div key={release.id} className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">{release.title}</h3>
              <p className="mt-3 text-body-sm text-body">{release.body}</p>
              <div className="mt-5">
                <Button href={release.href} variant="secondary" size="md">
                  {t.viewReleases}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="border-t border-line" title={t.whitepaperTitle}>
        <div className="max-w-2xl">
          <p className="text-body">{t.whitepaperBody}</p>
          <div className="mt-6">
            <Button href={l("/whitepaper")} variant="secondary" size="md">
              {t.whitepaperCta}
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
