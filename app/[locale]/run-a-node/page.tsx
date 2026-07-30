import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PathStrip } from "@/components/guides/path-strip";
import { JsonLd } from "@/components/json-ld";
import { Button } from "@/components/ui/button";
import { CodeBlock } from "@/components/ui/code-block";
import { CtaBand } from "@/components/ui/cta-band";
import { PageHero } from "@/components/ui/page-hero";
import { Row, Rows } from "@/components/ui/rows";
import { Section } from "@/components/ui/section";
import { pathForMilestone } from "@/lib/guides";
import { HOSTING, HOSTING_OFFERS } from "@/lib/hosting";
import {
  getContent,
  getDictionary,
  isLocale,
  type Locale,
  localePath,
} from "@/lib/i18n";
import { CODE, PORTS, TROUBLESHOOTING } from "@/lib/node-guide";
import { SITE } from "@/lib/site";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const t = getDictionary(raw);
  return {
    title: t.runNode.title,
    description: t.runNode.intro,
    alternates: { canonical: `/${raw}/run-a-node` },
    openGraph: {
      title: `${t.runNode.title} · ${SITE.name}`,
      description: t.runNode.intro,
      url: `/${raw}/run-a-node`,
    },
  };
}

/** Which command belongs to which step of the runbook. */
const STEP_CODE: Record<string, { code: string; filename?: string }[]> = {
  prepare: [{ code: CODE.prereqs }],
  install: [],
  identity: [{ code: CODE.identity }],
  configure: [{ code: CODE.config }],
  firewall: [{ code: CODE.firewall }],
  // Reachability from a browser: nginx first over plain HTTP, then
  // certbot adds TLS. The order is load-bearing — see CODE.reverseProxy.
  reachable: [
    { code: CODE.reverseProxy, filename: "/etc/nginx/sites-available/openfiat-node" },
    { code: CODE.tls },
  ],
  service: [
    { code: CODE.systemd, filename: "openfiat-node.service" },
    { code: CODE.serviceUp },
  ],
  sync: [{ code: CODE.snapshotManual }],
  verify: [{ code: CODE.verify }],
  register: [],
  monitor: [{ code: CODE.prometheus, filename: "prometheus.yml" }],
  upgrade: [{ code: CODE.upgrade }],
  backup: [{ code: CODE.backup }],
};

export default async function RunANodePage({ params }: Props) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const t = getDictionary(locale);
  const c = getContent(locale);
  const l = (path: string) => localePath(path, locale);

  const installCode: Record<string, { code: string; filename?: string }[]> = {
    docker: [
      { code: CODE.dockerCompose, filename: "compose.yaml" },
      { code: CODE.dockerUp },
    ],
    binary: [{ code: CODE.serviceUp }],
    source: [{ code: CODE.fromSource }],
  };

  /* This page is milestone 02 on the operator path — keep the strip so the
     journey survives the hop away from the shared guide renderer. */
  const pathInfo = pathForMilestone("runNode");

  return (
    <>
      {pathInfo && (
        <PathStrip
          path={pathInfo.path}
          currentIndex={pathInfo.index}
          t={t}
          locale={locale}
        />
      )}
      <PageHero
        variant="layers"
        title={t.runNode.title}
        lede={t.runNode.intro}
        actions={
          <Button
            href={l("/participate/node-operators")}
            variant="secondary"
            size="lg"
          >
            {t.actors.readMore}
          </Button>
        }
        meta={t.runNode.referenceNote}
      />

      {/* Hardware ------------------------------------------------------ */}
      <Section title={t.runNode.requirementsTitle}>
        <div className="grid max-w-3xl gap-10 sm:grid-cols-2">
          <div>
            <h3 className="stat-label text-faint">{t.runNode.minimum}</h3>
            <p className="mt-3 text-body">
              {c.runNode.minimumSpecs.join(" · ")}
            </p>
          </div>
          <div>
            <h3 className="stat-label text-faint">{t.runNode.recommended}</h3>
            <p className="mt-3 text-body">
              {c.runNode.recommendedSpecs.join(" · ")}
            </p>
          </div>
        </div>
        <p className="mt-8 max-w-2xl text-body-sm text-muted">
          {c.runNode.internals}
        </p>
      </Section>

      {/* Hosting ------------------------------------------------------- */}
      {/* Placed straight after the hardware it has to satisfy: the question
          "where do I run this" arrives the moment someone reads the specs. */}
      <Section
        className="border-t border-line"
        title={t.runNode.hostingTitle}
        subtitle={t.runNode.hostingIntro.replace(
          "{pct}",
          String(HOSTING.discountPct),
        )}
      >
        <div className="grid max-w-4xl gap-x-12 gap-y-10 sm:grid-cols-2">
          {HOSTING_OFFERS.map((offer) => (
            <div key={offer.id} className="border-t border-line pt-5">
              <h3 className="font-semibold text-ink">
                {offer.id === "vps"
                  ? t.runNode.hostingVps
                  : t.runNode.hostingRpc}
              </h3>
              <p className="mt-3 text-body">
                {offer.id === "vps"
                  ? t.runNode.hostingVpsBody
                  : t.runNode.hostingRpcBody}
              </p>
              <a
                href={offer.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 font-medium text-accent-mid transition-colors hover:text-accent-hover"
              >
                {t.runNode.hostingViewPricing}
                <span aria-hidden>↗</span>
              </a>
            </div>
          ))}
        </div>

        <div className="mt-14 max-w-2xl border-t border-line pt-8">
          <h3 className="stat-label text-faint">
            {t.runNode.hostingClaimTitle}
          </h3>
          <p className="mt-3 text-body">{t.runNode.hostingClaimBody}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href={HOSTING.discordUrl} external>
              {t.runNode.hostingDiscord}
            </Button>
            <Button href={HOSTING.chatUrl} external variant="secondary">
              {t.runNode.hostingChat}
            </Button>
          </div>
        </div>
      </Section>

      {/* Install options ----------------------------------------------- */}
      {/* Why an operator should make their node public, placed before the
          install steps: it is the decision that shapes how they set the
          node up, not an afterthought once it is already running. */}
      <Section
        className="border-t border-line"
        title={t.runNode.serveRpcTitle}
      >
        <div className="max-w-3xl space-y-6">
          <p className="text-body">{t.runNode.serveRpc}</p>
          <p className="text-body text-faint">{t.runNode.serveRpcHonest}</p>
        </div>
      </Section>

      <Section className="border-t border-line" title={t.runNode.installTitle}>
        <div className="space-y-12">
          {c.runNode.install.map((option) => (
            <div
              key={option.id}
              className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10"
            >
              <div>
                <h3 className="text-h3 text-ink">{option.title}</h3>
                <p className="mt-3 text-body-sm text-body">{option.note}</p>
                {option.id === "binary" && (
                  <a
                    href={`${SITE.githubOrg}/openfiat-core/releases`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-body-sm font-medium text-accent-mid transition-colors hover:text-accent-hover"
                  >
                    {t.runNode.releasesLink}
                    <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
              {/*
               * `min-w-0` overrides a grid item's default `min-width: auto`,
               * whose content-based minimum here is the longest command line
               * inside the block. Without it the cell inflates to ~510px in a
               * 342px track and drags the whole section past the viewport —
               * the block already scrolls sideways on its own, so nothing
               * needs that width.
               */}
              <div className="min-w-0 space-y-4">
                {installCode[option.id]?.map((block) => (
                  <CodeBlock
                    key={block.code.slice(0, 40)}
                    code={block.code}
                    filename={block.filename}
                    copyLabel={t.runNode.copy}
                    copiedLabel={t.runNode.copied}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Ports ---------------------------------------------------------- */}
      <Section className="border-t border-line" title={t.runNode.portsTitle}>
        <div className="max-w-3xl">
          <Rows>
            {PORTS.map((port) => (
              <Row
                key={`${port.port}-${port.protocol}`}
                lead={`${port.port}/${port.protocol}`}
                title={c.runNode.ports[port.key]}
                trailing={
                  port.public ? t.runNode.portPublic : t.runNode.portPrivate
                }
              />
            ))}
          </Rows>
        </div>
      </Section>

      {/* The runbook ---------------------------------------------------- */}
      <Section
        className="border-t border-line"
        title={t.runNode.lifecycleTitle}
        subtitle={t.runNode.lifecycleNote}
      >
        <ol className="space-y-14">
          {c.runNode.walkthrough.map((step, index) => (
            <li key={step.id} className="scroll-mt-24" id={step.id}>
              <div className="grid gap-6 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10">
                <div>
                  <span className="font-mono text-xs tabular-nums text-accent-mid">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-h3 text-ink">{step.title}</h3>
                  <p className="mt-3 text-body-sm text-body">{step.body}</p>
                  {step.id === "register" && (
                    <div className="mt-5">
                      <p className="text-body-sm text-muted">
                        {t.runNode.stakingBody}
                      </p>
                    </div>
                  )}
                </div>
                {/*
                 * `min-w-0` overrides a grid item's default `min-width: auto`,
                 * whose content-based minimum here is the longest command line
                 * inside the block. Without it the cell inflates to ~510px in a
                 * 342px track and drags the whole section past the viewport —
                 * the block already scrolls sideways on its own, so nothing
                 * needs that width.
                 */}
                <div className="min-w-0 space-y-4">
                  {STEP_CODE[step.id]?.map((block) => (
                    <CodeBlock
                      key={block.code.slice(0, 40)}
                      code={block.code}
                      filename={block.filename}
                      copyLabel={t.runNode.copy}
                      copiedLabel={t.runNode.copied}
                    />
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Troubleshooting ------------------------------------------------ */}
      <Section
        className="border-t border-line"
        title={t.runNode.troubleshootingTitle}
      >
        <div className="space-y-8">
          {TROUBLESHOOTING.map((entry) => {
            const copy = c.runNode.troubleshooting[entry.key];
            return (
              <div
                key={entry.key}
                className="grid gap-4 border-b border-line pb-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10"
              >
                <div>
                  <h3 className="font-semibold text-ink">{copy.symptom}</h3>
                  <p className="mt-2 text-body-sm text-muted">{copy.cause}</p>
                </div>
                <CodeBlock
                  className="min-w-0"
                  code={entry.command}
                  copyLabel={t.runNode.copy}
                  copiedLabel={t.runNode.copied}
                />
              </div>
            );
          })}
        </div>
      </Section>

      {/* Monitoring + hosting the UI ------------------------------------ */}
      <Section
        className="border-t border-line"
        title={t.runNode.monitoringTitle}
        subtitle={c.runNode.monitoringNote}
      >
        <div className="grid max-w-4xl gap-10 md:grid-cols-3">
          {c.runNode.monitoring.map((group) => (
            <div key={group.group}>
              <h3 className="stat-label text-faint">{group.group}</h3>
              <p className="mt-3 text-body-sm text-body">
                {group.items.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        className="border-t border-line"
        title={t.runNode.hostUiTitle}
        subtitle={t.runNode.hostUiIntro}
      >
        <div className="max-w-2xl">
          <p className="text-lg leading-relaxed text-ink">
            {t.runNode.hostUiQuote}
          </p>
          <p className="mt-6 text-body-sm text-muted">
            {c.runNode.interfaces.join(" · ")}
          </p>

          <h3 className="mt-12 text-h3 text-ink">{t.runNode.hostUiConnect}</h3>
          <p className="mt-4 text-body">{t.runNode.hostUiConnectBody}</p>

          <h3 className="mt-12 text-h3 text-ink">{t.runNode.apiTitle}</h3>
        </div>
        <div className="mt-6 max-w-3xl">
          <Rows>
            {c.runNode.apis.map((group) => (
              <Row
                key={group.group}
                title={group.group}
                subtitle={group.items.join(" · ")}
              />
            ))}
          </Rows>
        </div>
        <p className="mt-6 max-w-2xl text-body-sm text-faint">
          {t.runNode.apiNote}
        </p>
      </Section>

      <CtaBand
        title={t.runNode.neverCustody}
        actions={
          <>
            <Button href={l("/whitepaper/18-node-operators")} size="lg">
              {t.common.readWhitepaper}
            </Button>
            <Button href={l("/participate")} variant="secondary" size="lg">
              {t.home.roles.seeAll}
            </Button>
          </>
        }
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: t.runNode.title,
          description: t.runNode.intro,
          url: `${SITE.url}/${locale}/run-a-node`,
          step: c.runNode.walkthrough.map((step, index) => ({
            "@type": "HowToStep",
            position: index + 1,
            name: step.title,
            text: step.body,
            url: `${SITE.url}/${locale}/run-a-node#${step.id}`,
          })),
        }}
      />
    </>
  );
}
