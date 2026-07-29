import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import { GUIDE_GROUPS, guidesInGroup } from "@/lib/guides";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.guides.title,
    description: t.guides.intro,
    alternates: { canonical: `/${raw}/guides` },
    openGraph: {
      title: `${t.guides.title} · ${SITE.name}`,
      description: t.guides.intro,
      url: `/${raw}/guides`,
    },
  };
}

/**
 * The two guides that predate `lib/guides` keep their own top-level URLs but
 * belong in this list — a reader looking for "how do I run a node" should not
 * have to know which ones happen to be built from the shared renderer.
 */
const STANDALONE = [
  { href: "/run-a-node", group: "operate" as const, key: "runNode" as const },
  {
    href: "/become-an-arbitrator",
    group: "operate" as const,
    key: "becomeArbitrator" as const,
  },
];

export default async function GuidesIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  return (
    <>
      <PageHero
        variant="mesh"
        title={t.guides.title}
        lede={t.guides.intro}
        meta={t.guides.accuracyNote}
      />

      {GUIDE_GROUPS.map((group) => {
        const guides = guidesInGroup(group);
        const standalone = STANDALONE.filter((item) => item.group === group);
        if (guides.length === 0 && standalone.length === 0) return null;

        return (
          <Section
            key={group}
            className="border-t border-line"
            title={t.guides.groups[group].title}
            subtitle={t.guides.groups[group].blurb}
          >
            <div className="max-w-3xl">
              <Rows>
                {standalone.map((item) => (
                  <Row
                    key={item.href}
                    href={l(item.href)}
                    title={t.guides.standalone[item.key].title}
                    subtitle={t.guides.standalone[item.key].summary}
                  />
                ))}
                {guides.map((guide) => (
                  <Row
                    key={guide.slug}
                    href={l(`/guides/${guide.slug}`)}
                    title={guide.title[locale]}
                    subtitle={guide.summary[locale]}
                  />
                ))}
              </Rows>
            </div>
          </Section>
        );
      })}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: t.guides.title,
          description: t.guides.intro,
          url: `${SITE.url}/${locale}/guides`,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        }}
      />
    </>
  );
}
