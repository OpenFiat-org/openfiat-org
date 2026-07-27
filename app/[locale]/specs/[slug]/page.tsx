import { JsonLd } from "@/components/json-ld";
import { ReaderLayout } from "@/components/reader/layout";
import { PrevNext } from "@/components/reader/prev-next";
import { ReadingProgress } from "@/components/reader/progress";
import { Badge } from "@/components/ui/badge";
import { getSpec, getSpecs, neighbours, renderSpec } from "@/lib/content";
import { type Locale, getDictionary, isLocale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return getSpecs().map((spec) => ({ slug: spec.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const spec = getSpec(slug);
  if (!spec) return {};

  const title = `${spec.id} — ${spec.title}`;
  const path = `/${raw}/specs/${spec.slug}`;

  return {
    title,
    description: spec.description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} · ${SITE.name}`,
      description: spec.description,
      url: path,
      type: "article",
    },
  };
}

export default async function SpecPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const spec = getSpec(slug);
  if (!spec) notFound();

  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  const specs = getSpecs();
  const { html, toc, words, readingMinutes } = await renderSpec(spec);
  const { previous, next } = neighbours(specs, spec.slug);

  const dependents = specs.filter((other) =>
    other.meta?.dependsOn.includes(spec.id),
  );

  return (
    <>
      <ReadingProgress />
      <ReaderLayout
        eyebrow={
          <>
            <Link
              href={l("/specs")}
              className="stat-label text-accent-mid hover:text-accent-hover"
            >
              {t.reader.specifications}
            </Link>
            <span className="stat-label text-faint">
              {t.reader.layer(spec.family)}
            </span>
            <span className="font-mono text-sm text-ink">{spec.id}</span>
          </>
        }
        title={spec.title}
        standfirst={spec.description}
        meta={
          <>
            {spec.meta?.status && (
              <Badge tone="accent">{spec.meta.status}</Badge>
            )}
            {spec.meta?.version && (
              <span className="stat-label text-faint">
                v{spec.meta.version.replace(/^v/i, "")}
              </span>
            )}
            <span className="stat-label text-faint">
              {t.reader.minRead(readingMinutes)}
            </span>
            <span className="stat-label text-faint">
              {t.reader.wordCount(words.toLocaleString("en-US"))}
            </span>
          </>
        }
        aside={
          spec.meta &&
          (spec.meta.dependsOn.length > 0 || dependents.length > 0) ? (
            <aside className="mt-8 grid max-w-[68ch] gap-4 sm:grid-cols-2">
              {spec.meta.dependsOn.length > 0 && (
                <div className="rounded-card border border-line bg-surface-alt p-5">
                  <p className="stat-label text-faint">{t.reader.dependsOn}</p>
                  <ul className="mt-3 space-y-1.5">
                    {spec.meta.dependsOn.map((dependency) => {
                      const target = getSpec(dependency.toLowerCase());
                      return (
                        <li key={dependency}>
                          {target ? (
                            <>
                              <Link
                                href={l(`/specs/${target.slug}`)}
                                className="font-mono text-sm text-accent-mid hover:text-accent-hover"
                              >
                                {dependency}
                              </Link>
                              <span className="ms-2 text-body-sm text-muted">
                                {target.title}
                              </span>
                            </>
                          ) : (
                            <span className="font-mono text-sm text-faint">
                              {dependency}
                            </span>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              {dependents.length > 0 && (
                <div className="rounded-card border border-line bg-surface-alt p-5">
                  <p className="stat-label text-faint">
                    {t.reader.dependedOnBy}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {dependents.map((dependent) => (
                      <li key={dependent.id}>
                        <Link
                          href={l(`/specs/${dependent.slug}`)}
                          className="font-mono text-sm text-accent-mid hover:text-accent-hover"
                        >
                          {dependent.id}
                        </Link>
                        <span className="ms-2 text-body-sm text-muted">
                          {dependent.title}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
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
                    href: l(`/specs/${previous.slug}`),
                    label: previous.id,
                    title: previous.title,
                  }
                : null
            }
            next={
              next
                ? {
                    href: l(`/specs/${next.slug}`),
                    label: next.id,
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
          headline: `${spec.id} — ${spec.title}`,
          description: spec.description,
          url: `${SITE.url}/${locale}/specs/${spec.slug}`,
          isPartOf: {
            "@type": "CreativeWorkSeries",
            name: "OpenFiat Protocol Suite",
            url: `${SITE.url}/${locale}/specs`,
          },
          version: spec.meta?.version ?? undefined,
          wordCount: words,
          inLanguage: "en",
          publisher: { "@type": "Organization", name: "AllenHark" },
        }}
      />
    </>
  );
}
