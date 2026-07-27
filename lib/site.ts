/** Canonical site constants. Imported by metadata, sitemap and JSON-LD. */
export const SITE = {
  name: "OpenFiat",
  url: "https://openfiat.org",
  appUrl: "https://app.openfiat.org",
  docsUrl: "https://docs.openfiat.org",
  githubOrg: "https://github.com/OpenFiat-org",
  specsRepo: "https://github.com/OpenFiat-org/openfiat-specs",
  tagline: "Decentralized peer-to-peer fiat exchange",
  description:
    "OpenFiat is an open protocol for exchanging stablecoins for local fiat currency, peer to peer, with no centralized exchange operator. Settlement on Solana; coordination on an open network.",
  /** The app is a preview build; every link to it is labelled as such. */
  appIsPreview: true,
} as const;
