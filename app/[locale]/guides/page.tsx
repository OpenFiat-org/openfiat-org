import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MilestoneDot } from "@/components/guides/milestone-dot";
import { resolveMilestone } from "@/components/guides/milestones";
import { JsonLd } from "@/components/json-ld";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import { GUIDE_PATHS, GUIDES, type PathId } from "@/lib/guides";
import { getDictionary, isLocale, type Locale, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

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

const PATH_TONES: Record<PathId, "teal" | "accent" | "neutral"> = {
  trader: "teal",
  operator: "accent",
  builder: "neutral",
};

export default async function GuidesIndexPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const l = (path: string) => localePath(path, locale);

  /*
   * The A–Z list underneath the paths is the same nine stops in flat form:
   * the two standalone pages included, sorted by their localized title so the
   * order is alphabetical in whichever language the reader is looking at.
   */
  const allGuides = [
    ...GUIDES.map((guide) => ({
      href: l(`/guides/${guide.slug}`),
      title: guide.title[locale],
      subtitle: guide.summary[locale],
      meta: `${t.guides.groups[guide.group].title} · ${t.guides.stepsMeta(guide.steps.length)}`,
    })),
    {
      href: l("/run-a-node"),
      title: t.guides.standalone.runNode.title,
      subtitle: t.guides.standalone.runNode.summary,
      meta: `${t.guides.groups.operate.title} · ${t.guides.standalonePage}`,
    },
    {
      href: l("/become-an-arbitrator"),
      title: t.guides.standalone.becomeArbitrator.title,
      subtitle: t.guides.standalone.becomeArbitrator.summary,
      meta: `${t.guides.groups.operate.title} · ${t.guides.standalonePage}`,
    },
  ].sort((a, b) => a.title.localeCompare(b.title, locale));

  return (
    <>
      <PageHero
        variant="mesh"
        title={t.guides.title}
        lede={t.guides.intro}
        meta={t.guides.accuracyNote}
      />

      <section className="py-14 md:py-20">
        <Container>
          <div className="space-y-6">
            {GUIDE_PATHS.map((path) => (
              <section
                key={path.id}
                className="rounded-lg border border-line bg-surface p-6 transition-colors hover:border-line-strong md:p-8"
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <Badge tone={PATH_TONES[path.id]}>{path.role[locale]}</Badge>
                  <h2 className="text-h3 text-ink">{path.title[locale]}</h2>
                  <span className="ms-auto font-mono text-xs text-faint">
                    {t.guides.milestonesMeta(path.milestones.length)}
                  </span>
                </div>
                <p className="mt-3 max-w-2xl text-body-sm text-muted">
                  {path.pitch[locale]}
                </p>

                <ol className="mt-8 flex overflow-x-auto pb-1">
                  {path.milestones.map((milestone, index) => {
                    const resolved = resolveMilestone(milestone, t, locale);
                    const isFirst = index === 0;
                    const isLast = index === path.milestones.length - 1;
                    return (
                      <li
                        key={resolved.key}
                        className="relative min-w-40 flex-1 pt-6"
                      >
                        {/*
                         * The connector runs edge to edge through each stop;
                         * the first and last trim it so the line starts and
                         * ends at a dot rather than dangling past one.
                         */}
                        {path.milestones.length > 1 && (
                          <span
                            aria-hidden="true"
                            className={cn(
                              "absolute top-[9px] h-px bg-line-strong",
                              isFirst && "left-3 right-0",
                              isLast && "left-0 w-3",
                              !isFirst && !isLast && "left-0 right-0",
                            )}
                          />
                        )}
                        <Link href={resolved.href} className="group block">
                          <MilestoneDot
                            slug={resolved.slug}
                            stepIds={resolved.stepIds}
                            className="absolute left-3 top-[9px] h-3 w-3 -translate-y-1/2"
                          />
                          <span className="font-mono text-[0.625rem] tracking-[0.08em] text-faint">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="mt-1 block pr-5 text-body-sm font-semibold text-ink transition-colors group-hover:text-accent-mid">
                            {resolved.title}
                          </span>
                          <span className="mt-1 block pr-5 font-mono text-[0.625rem] text-faint">
                            {resolved.meta}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ol>
              </section>
            ))}
          </div>

          <p className="mt-6 flex items-center gap-2 font-mono text-xs text-faint">
            <span
              aria-hidden="true"
              className="inline-block h-2 w-2 shrink-0 rounded-full bg-teal"
            />
            {t.guides.completedLabel} — {t.guides.progressNote}
          </p>
        </Container>
      </section>

      <Section className="border-t border-line" title={t.guides.azTitle}>
        <div className="max-w-3xl">
          <Rows>
            {allGuides.map((entry) => (
              <Row
                key={entry.href}
                href={entry.href}
                title={entry.title}
                subtitle={entry.subtitle}
                trailing={entry.meta}
              />
            ))}
          </Rows>
        </div>
      </Section>

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
