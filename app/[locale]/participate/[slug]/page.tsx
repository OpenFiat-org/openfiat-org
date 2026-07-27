import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { ACTORS, getActor } from "@/lib/actors";
import { getSpec } from "@/lib/content";
import {
  getContent,
  getDictionary,
  isLocale,
  type Locale,
  localePath,
} from "@/lib/i18n";
import { REPOS, repoUrl } from "@/lib/repos";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return ACTORS.map((actor) => ({ slug: actor.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) return {};
  const actor = getActor(slug);
  if (!actor) return {};

  const copy = getContent(raw).actors[actor.slug];
  return {
    title: copy.name,
    description: copy.definition,
    alternates: { canonical: `/${raw}/participate/${slug}` },
    openGraph: {
      title: `${copy.name} · ${SITE.name}`,
      description: copy.definition,
      url: `/${raw}/participate/${slug}`,
    },
  };
}

/** A heading with a plain list under it. No box. */
function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="stat-label text-faint">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

export default async function ActorPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  if (!isLocale(raw)) notFound();
  const actor = getActor(slug);
  if (!actor) notFound();

  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const copy = c.actors[actor.slug];
  const l = (path: string) => localePath(path, locale);

  return (
    <>
      <PageHero
        title={copy.name}
        lede={copy.definition}
        actions={
          actor.slug === "node-operators" ? (
            <Button href={l("/run-a-node")} size="lg">
              {t.nav.runNode}
            </Button>
          ) : undefined
        }
      />

      <Container className="py-16 md:py-20">
        <div className="max-w-2xl space-y-10">
          <Block title={t.actors.whatTheyDo}>
            <ul className="space-y-3">
              {copy.responsibilities.map((item) => (
                <li key={item} className="flex gap-3 text-body">
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          <Block title={t.actors.whatTheyStake}>
            <p className="text-body">{copy.stake}</p>
          </Block>

          <Block title={t.actors.howTheyEarn}>
            <p className="text-body">{copy.earns}</p>
          </Block>

          <Block title={t.actors.requirements}>
            <ul className="space-y-3">
              {copy.requirements.map((item) => (
                <li key={item} className="flex gap-3 text-body">
                  <span aria-hidden="true" className="font-mono text-faint">
                    →
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Block>

          {actor.slug === "developers" && (
            <Block title={t.actors.repositories}>
              <Rows>
                {REPOS.map((repo) => (
                  <Row
                    key={repo.id}
                    href={repoUrl(repo.id)}
                    title={repo.id}
                    subtitle={c.repos[repo.id]}
                    trailing={repo.language}
                  />
                ))}
              </Rows>
            </Block>
          )}

          <Block title={t.actors.governedBy}>
            <Rows>
              {actor.specs.map((id) => {
                const spec = getSpec(id.toLowerCase());
                return (
                  <Row
                    key={id}
                    href={spec ? l(`/specs/${spec.slug}`) : undefined}
                    lead={id}
                    title={spec ? spec.title : id}
                  />
                );
              })}
            </Rows>
          </Block>
        </div>

        <div className="mt-16 border-t border-line pt-8">
          <h2 className="text-h3 text-ink">{t.actors.otherRoles}</h2>
          <ul className="mt-5 flex flex-wrap gap-x-8 gap-y-3">
            {ACTORS.filter((other) => other.slug !== actor.slug).map(
              (other) => (
                <li key={other.slug}>
                  <Link
                    href={l(`/participate/${other.slug}`)}
                    className="text-body text-muted transition-colors hover:text-accent-mid"
                  >
                    {c.actors[other.slug].name}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </div>
      </Container>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: copy.name,
          description: copy.definition,
          url: `${SITE.url}/${locale}/participate/${actor.slug}`,
          isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
        }}
      />
    </>
  );
}
