import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { ACTOR_GROUPS, ACTORS } from "@/lib/actors";
import {
  getContent,
  getDictionary,
  isLocale,
  type Locale,
  localePath,
} from "@/lib/i18n";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.actors.title,
    description: t.actors.intro,
    alternates: { canonical: `/${raw}/participate` },
    openGraph: {
      title: `${t.actors.title} · ${SITE.name}`,
      description: t.actors.intro,
      url: `/${raw}/participate`,
    },
  };
}

export default async function ActorsPage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  return (
    <>
      <PageHero
        title={t.actors.title}
        lede={t.actors.intro}
        actions={
          <>
            <Button href={l("/run-a-node")} size="lg">
              {t.nav.runNode}
            </Button>
            <Button href={l("/sale")} variant="secondary" size="lg">
              {t.nav.sale}
            </Button>
          </>
        }
      />

      <Container className="py-16 md:py-20">
        <div className="space-y-16">
          {ACTOR_GROUPS.map((group) => {
            const actors = ACTORS.filter((actor) => actor.group === group);
            const groupCopy = c.actorGroups[group];
            return (
              <section key={group}>
                <h2 className="text-h3 text-ink">{groupCopy.title}</h2>
                <p className="mt-2 max-w-xl text-body-sm text-muted">
                  {groupCopy.blurb}
                </p>
                <div className="mt-6">
                  <Rows>
                    {actors.map((actor) => (
                      <Row
                        key={actor.slug}
                        href={l(`/participate/${actor.slug}`)}
                        title={c.actors[actor.slug].name}
                        subtitle={c.actors[actor.slug].summary}
                      />
                    ))}
                  </Rows>
                </div>
              </section>
            );
          })}
        </div>
      </Container>
    </>
  );
}
