<div align="center">

# openfiat-org

**Official public website for the OpenFiat project.**

[![CI](https://github.com/OpenFiat-org/openfiat-org/actions/workflows/ci.yml/badge.svg)](https://github.com/OpenFiat-org/openfiat-org/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Discussions](https://img.shields.io/github/discussions/OpenFiat-org/openfiat-org)](https://github.com/orgs/OpenFiat-org/discussions)

[Website](https://openfiat.network) · [Docs](https://docs.openfiat.network) · [Specs](https://github.com/OpenFiat-org/openfiat-specs) · [Contributing](CONTRIBUTING.md)

</div>

---

## About

`openfiat-org` is the marketing/documentation site at
[openfiat.network](https://openfiat.network) — a Next.js App Router site,
statically generated for every route in both supported locales (English and
Simplified Chinese, via an `app/[locale]/...` segment). Whitepaper chapters
and protocol specifications are not authored here: `pnpm content` (run
automatically before `dev`/`build`/`test`) pulls the real Markdown from
[openfiat-specs](https://github.com/OpenFiat-org/openfiat-specs) so this site
always reflects that repository's current text rather than a stale copy.

Beyond static content, the site carries a growing set of **actionable
guides** with real commands and code, not just prose — see [Guides](#guides)
below.

## Guides

- [`/run-a-node`](https://openfiat.network/en/run-a-node) — installing,
  configuring, and operating `openfiat-node` (the real
  [openfiat-core](https://github.com/OpenFiat-org/openfiat-core) binary):
  hardware, the actual `CLI_*` environment variables, ports, snapshot sync,
  and troubleshooting. Backing data lives in [`lib/node-guide.ts`](lib/node-guide.ts).
- [`/become-an-arbitrator`](https://openfiat.network/en/become-an-arbitrator) —
  bonding OPEN, discovering and joining a dispute case, and casting the
  off-chain and on-chain commit-reveal votes that decide it. Backing data
  lives in [`lib/arbitrator-guide.ts`](lib/arbitrator-guide.ts).
- [`/participate/[slug]`](app/[locale]/participate/[slug]/page.tsx) — one page
  per protocol role (buyer, merchant, node operator, arbitrator, and six
  more), generated from [`lib/actors.ts`](lib/actors.ts).

Guide code samples are checked against the real interfaces they describe
(`openfiat-core`'s CLI/RPC surface, the `@openfiat/sdk` Rust and TypeScript
packages) rather than written from memory of the design — see each guide's
own source file for exactly which repo/line backs each command.

## Repository layout

```
.
├── app/
│   ├── layout.tsx, globals.css, opengraph-image.tsx
│   └── [locale]/                  # en | zh — every route is generated per locale
│       ├── run-a-node/            # actionable node-operator guide
│       ├── become-an-arbitrator/  # actionable arbitrator guide
│       ├── participate/[slug]/    # one page per protocol role
│       ├── whitepaper/[slug]/     # chapters, synced from openfiat-specs
│       ├── specs/[slug]/          # OFS specifications, synced from openfiat-specs
│       └── ...                    # protocol, sale, roadmap, community, etc.
├── components/                    # Nav, Footer, PageHero, CodeBlock, JsonLd, ...
├── lib/
│   ├── i18n/                      # dictionaries (labels) + content (prose) per locale
│   ├── actors.ts, node-guide.ts, arbitrator-guide.ts, hosting.ts, nav.ts, site.ts
│   └── content/                   # loader/renderer for the synced whitepaper/spec Markdown below
├── content/.generated/            # content.json pulled from openfiat-specs — generated, not hand-edited
├── scripts/fetch-content.mjs      # does the pulling; runs before dev/build/test, cached in .content-cache/
├── public/
└── tests/
```


## Quick start

```bash
pnpm install
pnpm dev
```

`predev` runs `pnpm content` automatically, pulling the latest whitepaper/spec
Markdown from `openfiat-specs` before the dev server starts. Open
http://localhost:3000.


## Development

Requires Node.js 20+ and [pnpm](https://pnpm.io). Styling uses Tailwind CSS v4;
linting/formatting uses [Biome](https://biomejs.dev). `en.ts`/`en-content.ts`
are each locale's source of truth — the `Dictionary`/`ContentDictionary`
types are derived from them, so `zh.ts`/`zh-content.ts` must supply exactly
the same keys or the build fails.

```bash
pnpm lint
pnpm typecheck
pnpm build
```


## Testing

```bash
pnpm test
```


## Contributing

Contributions are welcome! Please read [CONTRIBUTING.md](CONTRIBUTING.md) and
our [Code of Conduct](CODE_OF_CONDUCT.md) before opening a pull request.
Security issues should be reported per [SECURITY.md](SECURITY.md), not as
public issues.

See [ROADMAP.md](ROADMAP.md) for current priorities and
[CHANGELOG.md](CHANGELOG.md) for release history.

## License

Licensed under the [Apache License, Version 2.0](LICENSE).
