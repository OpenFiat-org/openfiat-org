import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { getSpec } from "@/lib/content";
import { getContent, isLocale, type Locale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

const TITLE = { en: "Glossary", zh: "术语表" } as const;
const INTRO = {
  en: "The protocol's vocabulary in one place, with the specification that defines each term.",
  zh: "协议术语集中于此，并标注定义各术语的规范。",
} as const;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return {
    title: TITLE[raw],
    description: INTRO[raw],
    alternates: { canonical: `/${raw}/glossary` },
    openGraph: {
      title: `${TITLE[raw]} · ${SITE.name}`,
      description: INTRO[raw],
      url: `/${raw}/glossary`,
    },
  };
}

export default async function GlossaryPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  return (
    <>
      <PageHero title={TITLE[locale]} lede={INTRO[locale]} />

      <Container className="py-16 md:py-20">
        <dl className="max-w-3xl border-t border-line">
          {c.glossary.map((entry) => (
            <div
              key={entry.term}
              className="grid gap-2 border-b border-line py-6 md:grid-cols-[13rem_minmax(0,1fr)] md:gap-8"
            >
              <dt>
                <span className="font-semibold text-ink">{entry.term}</span>
                {entry.expansion && (
                  <span className="mt-1 block text-body-sm text-faint">
                    {entry.expansion}
                  </span>
                )}
              </dt>
              <dd>
                <p className="text-body">{entry.definition}</p>
                {entry.specs.length > 0 && (
                  <p className="mt-2 flex flex-wrap gap-x-4 font-mono text-xs">
                    {entry.specs.map((id) => {
                      const spec = getSpec(id.toLowerCase());
                      return spec ? (
                        <Link
                          key={id}
                          href={l(`/specs/${spec.slug}`)}
                          className="text-accent-mid hover:text-accent-hover"
                        >
                          {id}
                        </Link>
                      ) : (
                        <span key={id} className="text-faint">
                          {id}
                        </span>
                      );
                    })}
                  </p>
                )}
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "DefinedTermSet",
          name: TITLE[locale],
          description: INTRO[locale],
          url: `${SITE.url}/${locale}/glossary`,
          hasDefinedTerm: c.glossary.map((entry) => ({
            "@type": "DefinedTerm",
            name: entry.term,
            description: entry.definition,
          })),
        }}
      />
    </>
  );
}
