import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { getSpecs, specsByFamily } from "@/lib/content";
import { type Locale, getDictionary, isLocale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  const description = t.specsPage.intro(getSpecs().length);
  return {
    title: t.specsPage.title,
    description,
    alternates: { canonical: `/${raw}/specs` },
    openGraph: {
      title: `${t.specsPage.title} · ${SITE.name}`,
      description,
      url: `/${raw}/specs`,
    },
  };
}

/* Stated in OFS-0000 section 4. The 8000 range now has documents. */
const RESERVED = ["OFS-9000"];

export default async function SpecsIndex({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  const families = specsByFamily();
  const specs = getSpecs();

  return (
    <>
      <PageHero
        variant="layers"
        title={t.specsPage.title}
        lede={t.specsPage.intro(specs.length)}
        aside={
          <p className="mt-8 text-body-sm text-faint">
            {t.specsPage.published(specs.length)} ·{" "}
            {t.specsPage.layers(families.length)} · {t.specsPage.draft}
          </p>
        }
      />

      <Container className="py-16 md:py-20">
        <div className="space-y-14">
          {families.map((family) => (
            <section key={family.family}>
              <h2 className="text-h3 text-ink">{family.family}</h2>
              <div className="mt-6">
                <Rows>
                  {family.specs.map((spec) => (
                    <Row
                      key={spec.id}
                      href={l(`/specs/${spec.slug}`)}
                      lead={spec.id}
                      title={spec.title}
                      subtitle={spec.description}
                    />
                  ))}
                </Rows>
              </div>
            </section>
          ))}

          <section>
            <h2 className="text-h3 text-ink">{t.specsPage.reservedTitle}</h2>
            <div className="mt-6">
              <Rows>
                {RESERVED.map((range) => (
                  <Row
                    key={range}
                    lead={range}
                    title={t.specsPage.notWritten}
                  />
                ))}
              </Rows>
            </div>
            <p className="mt-6 max-w-2xl text-body-sm text-faint">
              {t.specsPage.reservedNote}
            </p>
          </section>
        </div>
      </Container>
    </>
  );
}
