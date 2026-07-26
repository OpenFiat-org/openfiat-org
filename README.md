<div align="center">

# openfiat-org

**Official public website for the OpenFiat project.**

[![CI](https://github.com/OpenFiat-org/openfiat-org/actions/workflows/ci.yml/badge.svg)](https://github.com/OpenFiat-org/openfiat-org/actions/workflows/ci.yml)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](LICENSE)
[![Discussions](https://img.shields.io/github/discussions/OpenFiat-org/openfiat-org)](https://github.com/orgs/OpenFiat-org/discussions)

[Website](https://openfiat.org) · [Docs](https://docs.openfiat.org) · [Specs](https://github.com/OpenFiat-org/openfiat-specs) · [Contributing](CONTRIBUTING.md)

</div>

---

## About

`openfiat-org` is part of the [OpenFiat](https://github.com/OpenFiat-org)
ecosystem — an open, decentralized peer-to-peer protocol for exchanging
stablecoins for local fiat currency. Solana secures asset settlement through
audited smart contracts; OpenFiat coordinates the peer-to-peer marketplace
layer (discovery, advertisements, reputation, governance, notifications, and
more) without centralized infrastructure.

This repository (Infrastructure) — official public website for the openfiat project.

For the full protocol motivation and design, see the
[whitepaper](https://github.com/OpenFiat-org/openfiat-specs) and the
[protocol specifications](https://github.com/OpenFiat-org/openfiat-specs/tree/main/Whitepaper/Specifications).

## Repository layout

```
.
├── app/
│   ├── layout.tsx, page.tsx, globals.css
│   └── <route>/page.tsx     # protocol, developers, merchants, documentation,
│                             # downloads, roadmap, community, foundation,
│                             # blog, privacy, terms, contact, press, careers, status
├── components/               # Nav, Footer
├── public/
├── tests/
└── docs/
```


## Quick start

```bash
pnpm install
pnpm dev
```

Open http://localhost:3000.


## Development

Requires Node.js 20+ and [pnpm](https://pnpm.io). Styling uses Tailwind CSS v4;
linting/formatting uses [Biome](https://biomejs.dev).

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
