import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { getChapters, twinFor } from "@/lib/content";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.whitepaper.title,
    description: t.whitepaper.intro,
    alternates: { canonical: `/${raw}/whitepaper` },
    openGraph: {
      title: `${t.whitepaper.title} · ${SITE.name}`,
      description: t.whitepaper.intro,
      url: `/${raw}/whitepaper`,
      type: "article",
    },
  };
}

export default async function WhitepaperIndex({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  const chapters = getChapters();
  const words = chapters.reduce(
    (sum, chapter) => sum + chapter.body.split(/\s+/).length,
    0,
  );
  const minutes = Math.round(words / 200);

  return (
    <>
      <PageHero
        variant="layers"
        title={t.whitepaper.title}
        lede={t.whitepaper.intro}
        actions={
          <>
            <Button href={l(`/whitepaper/${chapters[0].slug}`)} size="lg">
              {t.whitepaper.startReading}
            </Button>
            <Button href={l("/downloads")} variant="secondary" size="lg">
              {t.whitepaper.downloadPdfs}
            </Button>
          </>
        }
        aside={
          <>
            <p className="mt-8 text-body-sm text-faint">
              {t.whitepaper.chapters(chapters.length)} ·{" "}
              {t.whitepaper.words(`${Math.round(words / 1000)}k`)} ·{" "}
              {t.whitepaper.readTime(Math.floor(minutes / 60), minutes % 60)}
            </p>
            {/* The corpus is not translated; say so rather than implying it. */}
            {locale !== "en" && (
              <div className="mt-8 border-s-2 border-line ps-5">
                <h2 className="text-base font-semibold text-ink">
                  {t.whitepaper.englishOnlyTitle}
                </h2>
                <p className="mt-2 max-w-2xl text-body-sm text-body">
                  {t.whitepaper.englishOnlyBody}
                </p>
              </div>
            )}
          </>
        }
      />

      <Container className="py-16 md:py-20">
        <Rows>
          {chapters.map((chapter) => {
            const twin = twinFor(chapter);
            return (
              <Row
                key={chapter.slug}
                href={l(`/whitepaper/${chapter.slug}`)}
                lead={String(chapter.order).padStart(2, "0")}
                title={chapter.title}
                subtitle={chapter.description}
                trailing={
                  twin.canonical
                    ? t.whitepaper.expandsChapter(twin.canonical.order)
                    : undefined
                }
              />
            );
          })}
        </Rows>
      </Container>
    </>
  );
}
