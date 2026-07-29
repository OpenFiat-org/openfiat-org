import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { NetworkField } from "@/components/network-field";
import { RewardsCard } from "@/components/sale/rewards-card";
import { SolanaProvider } from "@/components/sale/wallet-provider";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Section } from "@/components/ui/section";
import { getChapters, getSpecs } from "@/lib/content";
import {
  getContent,
  getDictionary,
  isLocale,
  type Locale,
  localePath,
} from "@/lib/i18n";
import { REPOS, repoUrl } from "@/lib/repos";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: `${SITE.name} — ${t.meta.tagline}`,
    description: t.meta.description,
    alternates: { canonical: `/${raw}` },
  };
}

/*
 * The on-chain staking `Role` enum defines seven staked roles (Merchant
 * through SnapshotProvider — see the stake-open guide, which lists their
 * values). Nothing in this repo imports the IDL, so the telemetry count
 * lives here next to this comment; if the enum grows, update both.
 */
const STAKED_ROLES = 7;

/** Chapters the homepage lists before collapsing into "N more chapters". */
const CHAPTER_PREVIEW = 6;

export default async function Home({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  const chapters = getChapters();
  const specCount = getSpecs().length;

  const telemetry = [
    { num: "2", cap: t.home.telemetry.layers },
    { num: String(STAKED_ROLES), cap: t.home.telemetry.stakedRoles },
    { num: String(specCount), cap: t.home.telemetry.specifications },
    { num: String(REPOS.length), cap: t.home.telemetry.repositories },
    { num: "0", cap: t.home.telemetry.centralOperators, accent: true },
  ];

  const layerCards = [
    { layer: t.home.layers.coordination, tone: "accent" as const },
    { layer: t.home.layers.settlement, tone: "teal" as const },
  ];

  const saleFacts: Array<[string, string]> = [
    [t.home.saleBand.presaleRate, t.sale.rateNote],
    [t.home.saleBand.publicRate, t.home.saleBand.publicRateValue],
    [t.home.saleBand.supply, t.home.saleBand.supplyValue],
    [t.home.saleBand.status, t.sale.notLiveTitle],
  ];

  return (
    <>
      {/* Hero — the only place on the page with motion or ornament. */}
      <section className="relative overflow-hidden pt-20 pb-20 sm:pt-28 sm:pb-28">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-dotted opacity-30 lg:start-1/2 lg:opacity-90"
        />
        <NetworkField />
        <Container className="relative z-10">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-center lg:gap-14">
            <div className="max-w-[680px]">
              <h1
                className="font-extrabold tracking-[-0.02em] text-ink"
                style={{
                  fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
                  lineHeight: 1.04,
                }}
              >
                {t.home.headlineLead}{" "}
                <span className="text-accent-mid">{t.home.headlineAccent}</span>
                {t.home.headlineTail}
              </h1>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-body">
                {t.home.lede}
              </p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Button href={l("/sale")} size="lg">
                  {t.home.ctaJoinSale}
                </Button>
                <Button href={l("/trust")} variant="secondary" size="lg">
                  {t.home.ctaHowItWorks}
                </Button>
              </div>
            </div>

            {/* Wallet context mounts only here, same reasoning as /sale:
                no other page pays for the web3 bundle. */}
            <SolanaProvider>
              <RewardsCard sale={t.sale} saleHref={l("/sale")} />
            </SolanaProvider>
          </div>
        </Container>
      </section>

      {/* Telemetry — structural facts about the network, not vanity metrics. */}
      <section className="border-y border-line bg-surface-alt">
        <Container className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 lg:grid-cols-5">
          {telemetry.map((stat) => (
            <div key={stat.cap}>
              <p
                className={cn(
                  "font-mono text-2xl font-semibold",
                  stat.accent ? "text-teal-mid" : "text-ink",
                )}
              >
                {stat.num}
              </p>
              <p className="mt-1 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-faint">
                {stat.cap}
              </p>
            </div>
          ))}
        </Container>
      </section>

      {/* The problem, from whitepaper ch. 1: the marketplace is not decentralized. */}
      <Section title={t.home.problem.title} subtitle={t.home.problem.subtitle}>
        <ul className="gap-x-12 sm:columns-2">
          {t.home.problem.actions.map((action) => (
            <li
              key={action}
              className="break-inside-avoid border-b border-line py-3.5 text-muted"
            >
              <b className="font-semibold text-ink">
                <s className="decoration-teal decoration-2">
                  {t.home.problem.company}
                </s>
              </b>{" "}
              {action}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl border-s-2 border-accent ps-5 text-lg text-ink">
          {t.home.problem.verdict}
        </p>
      </Section>

      {/* The answer: the two-layer split. */}
      <Section
        className="border-t border-line"
        title={t.home.layers.title}
        subtitle={t.home.layers.subtitle}
      >
        <div className="grid gap-4 lg:grid-cols-2">
          {layerCards.map(({ layer, tone }) => (
            <div
              key={layer.label}
              className="rounded-card border border-line bg-surface p-7"
            >
              <p
                className={cn(
                  "font-mono text-[0.6875rem] uppercase tracking-[0.1em]",
                  tone === "accent" ? "text-accent-mid" : "text-teal-mid",
                )}
              >
                {layer.label}
              </p>
              <h3 className="mt-2.5 text-h3 text-ink">{layer.title}</h3>
              <p className="mt-2 text-body-sm text-muted">{layer.body}</p>
              <ul className="mt-5 space-y-2">
                {layer.items.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-[1px]",
                        tone === "accent" ? "bg-accent" : "bg-teal",
                      )}
                    />
                    <span className="text-body-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      {/* One trade, four moves — the same steps /trust tells, as a timeline. */}
      <Section
        className="border-t border-line"
        title={t.home.flow.title}
        subtitle={t.home.flow.subtitle}
      >
        <ol className="flex overflow-x-auto pb-1">
          {c.trust.flow.map((step, index) => {
            const isFirst = index === 0;
            const isLast = index === c.trust.flow.length - 1;
            return (
              <li key={step.title} className="relative min-w-52 flex-1 pt-6">
                {c.trust.flow.length > 1 && (
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
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute left-3 top-[9px] h-3 w-3 -translate-y-1/2 rounded-full border-2 bg-bg",
                    index === 2 ? "border-teal" : "border-accent",
                  )}
                />
                <span className="font-mono text-[0.625rem] tracking-[0.08em] text-faint">
                  {String(index + 1).padStart(2, "0")} ·{" "}
                  {(t.home.flow.stages[index] ?? "").toUpperCase()}
                </span>
                <h3 className="mt-1.5 pr-5 text-base font-bold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 pr-5 text-body-sm text-muted">
                  {step.body}
                </p>
              </li>
            );
          })}
        </ol>
        <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Button href={l("/trust")} variant="secondary">
            {t.home.ctaHowItWorks}
          </Button>
          <Link
            href={l("/guides")}
            className="font-mono text-xs text-faint transition-colors hover:text-accent-mid"
          >
            {t.home.flow.pathsNote} →
          </Link>
        </div>
      </Section>

      {/* Read the protocol — the whitepaper as a chapter index. */}
      <section className="border-t border-line py-14 md:py-20">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
            <div>
              <h2 className="text-h2 text-ink">{t.home.read.title}</h2>
              <p className="mt-4 text-body-lg text-body">
                {t.home.read.subtitle}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href={l(`/whitepaper/${chapters[0].slug}`)}>
                  {t.whitepaper.startReading}
                </Button>
                <Button href={l("/specs")} variant="secondary">
                  {t.home.read.specsCta(specCount)}
                </Button>
                <Button href={l("/downloads")} variant="secondary">
                  {t.whitepaper.downloadPdfs}
                </Button>
              </div>
            </div>
            <ol className="border-t border-line">
              {chapters.slice(0, CHAPTER_PREVIEW).map((chapter) => (
                <li key={chapter.slug} className="border-b border-line">
                  <Link
                    href={l(`/whitepaper/${chapter.slug}`)}
                    className="group flex items-baseline gap-4 py-2.5"
                  >
                    <span className="w-7 shrink-0 font-mono text-[0.6875rem] text-faint">
                      {String(chapter.order).padStart(2, "0")}
                    </span>
                    <span className="text-body-sm font-medium text-ink transition-colors group-hover:text-accent-mid">
                      {chapter.title}
                    </span>
                    {chapter.order === 1 && (
                      <span className="ms-auto shrink-0 font-mono text-[0.625rem] text-faint">
                        {t.home.read.startHere}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
              <li className="border-b border-line">
                <Link
                  href={l("/whitepaper")}
                  className="group flex items-baseline gap-4 py-2.5"
                >
                  <span className="w-7 shrink-0 font-mono text-[0.6875rem] text-faint">
                    …
                  </span>
                  <span className="text-body-sm font-medium text-muted transition-colors group-hover:text-accent-mid">
                    {t.home.read.moreChapters(
                      chapters.length - CHAPTER_PREVIEW,
                    )}
                  </span>
                </Link>
              </li>
            </ol>
          </div>
        </Container>
      </section>

      {/* Contribute code — the real repositories, with what each one is. */}
      <Section
        className="border-t border-line"
        title={t.home.contribute.title}
        subtitle={t.home.contribute.subtitle}
      >
        <div className="grid gap-px overflow-hidden rounded-card border border-line bg-line sm:grid-cols-2">
          {REPOS.map((repo) => (
            <a
              key={repo.id}
              href={repoUrl(repo.id)}
              className="group bg-surface p-5 transition-colors hover:bg-surface-alt"
            >
              <span className="font-mono text-sm font-semibold text-ink transition-colors group-hover:text-accent-mid">
                {repo.id}
              </span>
              <span className="mt-1.5 block text-body-sm text-muted">
                {c.repos[repo.id]}
              </span>
              <span className="mt-2 block font-mono text-[0.6875rem] text-faint">
                {repo.language}
              </span>
            </a>
          ))}
        </div>
      </Section>

      {/* The presale closes the page: pitch on one side, fixed terms on the other. */}
      <section className="border-t border-line py-14 md:py-20">
        <Container>
          <div className="grid items-center gap-10 rounded-card border border-accent/40 bg-linear-to-br from-accent-soft to-surface p-8 md:p-12 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <h2 className="text-h2 text-ink">{t.sale.title}</h2>
              <p className="mt-4 max-w-xl text-body-lg text-body">
                {t.home.saleBand.body}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={l("/sale")} size="lg">
                  {t.sale.connectWallet}
                </Button>
                <Button href={l("/sale")} variant="secondary" size="lg">
                  {t.home.saleBand.termsCta}
                </Button>
              </div>
            </div>
            <dl className="grid gap-px overflow-hidden rounded-sm border border-line bg-line">
              {saleFacts.map(([fact, value]) => (
                <div
                  key={fact}
                  className="flex items-baseline justify-between gap-4 bg-bg/60 px-5 py-3.5"
                >
                  <dt className="shrink-0 font-mono text-[0.6875rem] uppercase tracking-[0.06em] text-muted">
                    {fact}
                  </dt>
                  <dd className="text-right font-mono text-xs font-semibold text-ink">
                    {value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>
    </>
  );
}
