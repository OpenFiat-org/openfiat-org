/** Canonical site constants. Imported by metadata, sitemap and JSON-LD. */
export const SITE = {
  name: "OpenFiat",
  url: "https://openfiat.network",
  appUrl: "https://app.openfiat.network",
  docsUrl: "https://docs.openfiat.network",
  githubOrg: "https://github.com/OpenFiat-org",
  specsRepo: "https://github.com/OpenFiat-org/openfiat-specs",
  /**
   * Org-wide GitHub Discussions (github.com/orgs/OpenFiat-org/discussions) is
   * not enabled, so this points at the specs repo's own Discussions tab —
   * the destination the Contact page already tells visitors to use.
   */
  specsDiscussionsUrl:
    "https://github.com/OpenFiat-org/openfiat-specs/discussions",
  tagline: "Decentralized peer-to-peer fiat exchange",
  description:
    "OpenFiat is an open protocol for exchanging stablecoins for local fiat currency, peer to peer, with no centralized exchange operator. Settlement on Solana; coordination on an open network.",
  /** The app is a preview build; every link to it is labelled as such. */
  appIsPreview: true,
} as const;
