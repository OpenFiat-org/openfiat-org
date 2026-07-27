import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ReaderLayout } from "@/components/reader/layout";
import { PrevNext } from "@/components/reader/prev-next";
import { ReadingProgress } from "@/components/reader/progress";
import {
  getChapter,
  getChapters,
  neighbours,
  renderChapter,
  twinFor,
} from "@/lib/content";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getChapters().map((chapter) => ({ slug: chapter.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const chapter = getChapter(slug);
  if (!chapter) return {};

  const twin = twinFor(chapter);
  const path = `/${raw}/whitepaper/${chapter.slug}`;

  return {
    title: chapter.title,
    description: chapter.description,
    // Where two chapters cover the same ground, the weaker one points at the
    // stronger so search engines consolidate rather than split the signal.
    alternates: {
      canonical: twin.canonical
        ? `/${raw}/whitepaper/${twin.canonical.slug}`
        : path,
    },
    openGraph: {
      title: `${chapter.title} · ${SITE.name}`,
      description: chapter.description,
      url: path,
      type: "article",
    },
  };
}

export default async function ChapterPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const chapter = getChapter(slug);
  if (!chapter) notFound();

  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  const chapters = getChapters();
  const { html, toc, words, readingMinutes } = await renderChapter(chapter);
  const { previous, next } = neighbours(chapters, chapter.slug);
  const twin = twinFor(chapter);

  const chapterLabel = (order: number) =>
    order === 0 ? t.whitepaper.frontMatter : t.whitepaper.chapter(order);

  return (
    <>
      <ReadingProgress />
      <ReaderLayout
        eyebrow={
          <>
            <Link
              href={l("/whitepaper")}
              className="stat-label text-accent-mid hover:text-accent-hover"
            >
              {t.reader.whitepaper}
            </Link>
            <span className="stat-label text-faint">
              {chapterLabel(chapter.order)}
            </span>
          </>
        }
        title={chapter.title}
        standfirst={chapter.description}
        meta={
          <>
            <span className="stat-label text-faint">
              {t.reader.minRead(readingMinutes)}
            </span>
            <span className="stat-label text-faint">
              {t.reader.wordCount(words.toLocaleString("en-US"))}
            </span>
            <span className="stat-label text-faint">
              {t.reader.sections(toc.length)}
            </span>
          </>
        }
        aside={
          twin.canonical || twin.deferring ? (
            <aside className="mt-8 max-w-[68ch] rounded-card border border-line bg-surface-alt p-5">
              <p className="stat-label text-faint">{t.reader.relatedChapter}</p>
              {twin.canonical && (
                <p className="mt-2 text-body-sm text-body">
                  {t.reader.revisitsGround}{" "}
                  <Link
                    href={l(`/whitepaper/${twin.canonical.slug}`)}
                    className="text-accent-mid underline underline-offset-2"
                  >
                    {chapterLabel(twin.canonical.order)} —{" "}
                    {twin.canonical.title}
                  </Link>
                  {t.reader.canonicalTreatment}
                </p>
              )}
              {twin.deferring && (
                <p className="mt-2 text-body-sm text-body">
                  <Link
                    href={l(`/whitepaper/${twin.deferring.slug}`)}
                    className="text-accent-mid underline underline-offset-2"
                  >
                    {chapterLabel(twin.deferring.order)} —{" "}
                    {twin.deferring.title}
                  </Link>{" "}
                  {t.reader.coversOverlapping}
                </p>
              )}
            </aside>
          ) : null
        }
        toc={toc}
        tocLabel={t.reader.onThisPage}
        footer={
          <PrevNext
            label={t.reader.navLabel}
            previous={
              previous
                ? {
                    href: l(`/whitepaper/${previous.slug}`),
                    label: chapterLabel(previous.order),
                    title: previous.title,
                  }
                : null
            }
            next={
              next
                ? {
                    href: l(`/whitepaper/${next.slug}`),
                    label: chapterLabel(next.order),
                    title: next.title,
                  }
                : null
            }
          />
        }
      >
        {/* Content comes from our own pinned repository and the pipeline never
            enables raw HTML, so there is no untrusted markup here. */}
        <div
          // biome-ignore lint/security/noDangerouslySetInnerHtml: trusted, pinned content with raw HTML disabled in the pipeline
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </ReaderLayout>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "TechArticle",
          headline: chapter.heading,
          description: chapter.description,
          url: `${SITE.url}/${locale}/whitepaper/${chapter.slug}`,
          isPartOf: {
            "@type": "Book",
            name: "OpenFiat Whitepaper",
            url: `${SITE.url}/${locale}/whitepaper`,
          },
          wordCount: words,
          inLanguage: "en",
          publisher: { "@type": "Organization", name: "AllenHark" },
        }}
      />
    </>
  );
}
