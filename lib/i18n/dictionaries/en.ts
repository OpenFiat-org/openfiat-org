/**
 * English is the source of truth: the Dictionary type is derived from this
 * object, so every other locale must supply exactly the same keys or the build
 * fails. Adding a string here forces every translation to account for it.
 */
export const en = {
  meta: {
    tagline: "Decentralized peer-to-peer fiat exchange",
    description:
      "OpenFiat is an open protocol for exchanging stablecoins for local fiat currency, peer to peer, with no centralized exchange operator. Settlement on Solana; coordination on an open network.",
  },

  nav: {
    howItWorks: "How it works",
    trust: "Trust & safety",
    whitepaper: "Whitepaper",
    specs: "Specs",
    actors: "Participate",
    sale: "Token sale",
    runNode: "Run a node",
    launchApp: "Launch app",
    preview: "Preview",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    primaryLabel: "Primary",
    skipToContent: "Skip to content",
    language: "Language",
  },

  footer: {
    blurb:
      "An open protocol for exchanging stablecoins and local fiat currency, peer to peer. Settlement on Solana, coordination on an open network.",
    columns: {
      protocol: "Protocol",
      participate: "Participate",
      project: "Project",
      resources: "Resources",
    },
    links: {
      overview: "Protocol",
      howItWorks: "How it works",
      trust: "Trust & safety",
      whitepaper: "Whitepaper",
      specifications: "Specifications",
      glossary: "Glossary",
      roadmap: "Roadmap",
      sale: "Token sale",
      actors: "All roles",
      merchants: "Merchants",
      nodeOperators: "Node operators",
      runNode: "Run a node",
      developers: "Developers",
      downloads: "Downloads",
      foundation: "Foundation",
      community: "Community",
      blog: "Blog",
      press: "Press",
      careers: "Careers",
      documentation: "Documentation",
      status: "Status",
      github: "GitHub",
      contact: "Contact",
      privacy: "Privacy",
      terms: "Terms",
    },
    siteLicense: "This site is open source under Apache-2.0.",
    notice:
      "OpenFiat is an open protocol, not a financial service. Nothing on this site is an offer to sell securities or financial advice. OPEN token supply, allocation and sale terms are not final and remain subject to community review and economic modelling.",
  },

  home: {
    headlineLead: "Turn stablecoins into",
    headlineAccent: "cash in your own currency",
    headlineTail: ".",
    lede: "Trade directly with people in your country — bank transfer, mobile money or cash. Your crypto is locked in escrow before you send a single shilling, peso or naira, and no company sits in the middle taking a cut or deciding who is allowed to trade.",
    ctaHowItWorks: "See how a trade works",
    readWhitepaper: "Read the whitepaper",
    tokenSale: "Token sale",
    corpusNote: (chapters: number, specs: number) =>
      `Fully documented: ${chapters} whitepaper chapters and ${specs} open specifications`,

    steps: {
      title: "How a trade works",
      subtitle:
        "Four steps, and the money is protected from the second step onward.",
    },

    safety: {
      title: "Why you can trade with a stranger",
      subtitle: "No company vouches for anyone here. These do instead.",
      more: "How trust works",
    },

    scenarios: {
      title: "What people use it for",
      subtitle:
        "Rent, salaries, suppliers, family abroad. Stablecoins are easy to hold; local currency is what daily life actually costs.",
      railsLabel: "Pay and get paid with",
    },

    roles: {
      title: "Buyers, merchants, arbitrators, node operators",
      subtitle: "Nobody grants permission to take any of them.",
      seeAll: "See every role",
    },

    builders: {
      title: "Built as an open protocol",
      subtitle:
        "Settlement runs on Solana. Everything else runs on an open network anyone can join — so no single company can shut the marketplace down, censor it, or lock you into their app.",
      runNode: "Run a node",
      specs: "Read the specifications",
    },

    finalCta: {
      title: "Your money, your currency, no middleman.",
      body: "Start with a five-minute overview, or read the whole thing.",
      start: "See how a trade works",
    },
  },

  whitepaper: {
    title: "The OpenFiat protocol, in full",
    intro:
      "Every chapter is published here as a web page — no download required, nothing behind a form. It assumes no prior blockchain experience and builds up from what money is.",
    chapters: (n: number) => `${n} chapters`,
    words: (n: string) => `~${n} words`,
    readTime: (h: number, m: number) => `~${h}h ${m}m read`,
    startReading: "Start reading",
    downloadPdfs: "Download PDFs",
    frontMatter: "Front matter",
    chapter: (n: number) => `Chapter ${n}`,
    expandsChapter: (n: number) => `expands ch. ${n}`,
    englishOnlyTitle: "Published in English",
    englishOnlyBody:
      "The whitepaper and specifications have not been translated yet. Translation is listed as a community contribution area in Chapter 25; this page's navigation is localized but the document text is the original English.",
  },

  specsPage: {
    title: "The OpenFiat Protocol Suite",
    intro: (count: number) =>
      `${count} numbered specifications. The number encodes the layer: the 1000s are networking, the 2000s are the marketplace, and so on up through oracles and risk intelligence.`,
    published: (n: number) => `${n} published`,
    layers: (n: number) => `${n} layers`,
    draft: "Version 1.0.0 · Draft",
    reservedTitle: "Reserved ranges",
    notWritten: "Not yet written",
    reservedNote:
      "Specifications in reserved ranges are cited by published documents but have not been drafted. References to them appear as plain text rather than links.",
  },

  reader: {
    onThisPage: "On this page",
    minRead: (n: number) => `${n} min read`,
    wordCount: (n: string) => `${n} words`,
    sections: (n: number) => `${n} sections`,
    relatedChapter: "Related chapter",
    revisitsGround: "This chapter revisits ground covered in",
    canonicalTreatment: ", which is the canonical treatment.",
    coversOverlapping: "covers overlapping material from a second angle.",
    dependsOn: "Depends on",
    dependedOnBy: "Depended on by",
    navLabel: "Document navigation",
    specifications: "Specifications",
    whitepaper: "Whitepaper",
    layer: (name: string) => `${name} layer`,
  },

  actors: {
    title: "Buyers, merchants, arbitrators, node operators",
    intro:
      "Ten roles keep OpenFiat running — some you take just by trading, others by running infrastructure. Nobody grants permission for any of them.",
    whatTheyDo: "What they do",
    whatTheyStake: "Stake",
    howTheyEarn: "How they earn",
    requirements: "Requirements",
    repositories: "Repositories",
    governedBy: "Governed by",
    noStake: "No stake required",
    noStakeStated: "Not specified in the whitepaper",
    notStated: "Not specified in the whitepaper",
    readMore: "Read more",
    otherRoles: "Other roles",
    permissionless: "Permissionless",
    stakeNote:
      "Stake demonstrates economic commitment to the ecosystem. It is not a payment. Participants retain ownership of their stake unless protocol-defined penalties apply.",
  },

  howItWorks: {
    title: "How a trade works",
    lede: "Four steps. Your counterparty's crypto is locked before you part with any money, and it stays locked until you both agree the payment landed.",
    flowTitle: "The four steps",
    needTitle: "What you need",
    need: [
      "A wallet you control — no account, no sign-up, no KYC",
      "Stablecoins to sell, or local currency to buy with",
      "A payment method you already use",
    ],
    railsTitle: "Ways to pay",
    railsLede:
      "The fiat side moves on the rails you already use. OpenFiat standardizes how a payment method is described and confirmed, not how it operates.",
    safetyTitle: "If something goes wrong",
    safetyLede:
      "Either side can open a dispute, and independent arbitrators decide it with their own stake at risk.",
    safetyMore: "How trust works",
  },

  trust: {
    title: "Trust, without anyone to trust",
    lede: "A stranger is about to send you money in a currency no blockchain can see. Four mechanisms make that safe, and none of them is a company promising to be fair.",
    flowTitle: "What protects a single trade",
    pillarsTitle: "What trust is built from",
    disputeTitle: "When a trade goes wrong",
    disputeLede:
      "Either side can open a dispute. It is decided by independent arbitrators who stake their own OPEN on getting it right, and who cannot see the evidence until they have committed.",
    noAppeal:
      "There is no appeal in version 1. The commit-and-reveal vote, the staked arbitrators and the moderate penalties are the safeguards, rather than a second hearing.",
    readChapter: "Read the dispute protocol",
    readReputation: "Read the reputation engine",
  },

  protocolPage: {
    title: "OpenFiat is not a blockchain",
    lede: "It is a coordination layer that sits on top of one. Solana holds the money and executes escrow; OpenFiat carries everything a marketplace needs that has no business being on a chain — listings, reputation, messaging, discovery.",
    layersTitle: "Two layers, each doing what it is good at",
    layersLede:
      "The split is the whole design. Decentralize what benefits from it, and leave the rest where it works better.",
    settlement: "Settlement layer",
    coordination: "Coordination layer",
    principlesTitle: "The reasoning behind it",
    principlesLede:
      "Chapter 3 sets out twelve principles the whole protocol is derived from. These six do the most work.",
    suiteTitle: "A numbered specification suite",
    suiteLede: (count: number) =>
      `${count} formal specifications, grouped into layers. The number tells you which layer a document belongs to.`,
    browseSpecs: "Browse the specifications",
    readAll: "Read all twelve principles",
  },

  runNode: {
    title: "Running an OpenFiat node",
    intro:
      "Node operators maintain the decentralized marketplace that sits above the blockchain. Solana validators secure the chain and execute the OpenFiat programs; nodes carry the listings, reputation, messaging and discovery.",
    neverCustody:
      "Nodes never custody user funds. All financial operations remain under the control of Solana smart contracts.",
    requirementsTitle: "Hardware",
    installTitle: "Installing it",
    referenceNote:
      "Commands below use the reference deployment: the openfiat-node service, /etc/openfiat for configuration and /var/lib/openfiat for data.",
    portsTitle: "Ports",
    portPublic: "Must be reachable",
    portPrivate: "Keep private",
    troubleshootingTitle: "When something is wrong",
    copy: "Copy",
    copied: "Copied",
    minimum: "Minimum",
    recommended: "Recommended for production",
    lifecycleTitle: "Bringing a node online",
    lifecycleNote:
      "Work through these in order. Each step below carries the command it needs.",
    monitoringTitle: "What a node should expose",
    stakingBody:
      "A node stakes OPEN to become an active participant. Stake does not buy reputation, though: an operator with poor performance cannot compensate by staking more. Effective priority combines reputation, stake and measured network performance.",
    hostUiTitle: "Hosting the user interface",
    hostUiIntro:
      "OpenFiat separates the protocol from its interfaces. Anyone may host a web interface, a mobile gateway, an enterprise portal or a regional marketplace, and every one of them reaches the same marketplace.",
    hostUiQuote:
      "Regardless of which interface is used, every participant interacts with the same decentralized marketplace.",
    hostUiConnect: "What an interface connects to",
    hostUiConnectBody:
      "Interfaces do not talk to the chain directly. They connect to one or more nearby OpenFiat nodes, and fail over to another node if one becomes unavailable.",
    apiTitle: "Node API surface",
    apiNote:
      "Every compliant node exposes the same API surface, so an interface written against one node works against all of them.",
  },

  sale: {
    title: "The OPEN community presale",
    notLiveTitle: "The sale is not open",
    notLiveBody:
      "No sale contract has been deployed and no terms are final. You can connect a wallet to check readiness, but there is nothing to purchase yet.",
    connectWallet: "Connect wallet",
    disconnect: "Disconnect",
    connected: "Connected",
    purchase: "Purchase OPEN",
    purchaseDisabled: "Purchase opens when the sale goes live",
    amount: "Amount",
    youReceive: "You receive",
    reviewing: "Simulating transaction…",
    submitting: "Awaiting wallet signature…",
    confirming: "Confirming…",
    done: "Purchase confirmed",
    txFailed: "The transaction was not sent",
    txSuccess: "Confirmed",
    claim: "Claim OPEN",
    swapNotice:
      "Converted to USDC atomically at the confirmed price before crediting your OPEN allocation. Refunds (if the soft cap is missed) are paid in USDC, not the original asset.",
    whatIsOpen: "What OPEN is",
    whatIsOpenBody:
      "OPEN is the protocol's utility and governance token. It is not the asset being traded — marketplace settlements happen in stablecoins such as USDC. OPEN is staked by merchants, arbitrators, node operators and service providers as economic accountability, and it carries governance rights.",
    supplyTitle: "Fixed supply",
    supplyBody:
      "OPEN is minted once at genesis with a fixed maximum supply, and every initial allocation is publicly verifiable on chain.",
    allocationTitle: "Allocation categories",
    allocationNote:
      "Allocation percentages are set out in the OPEN Tokenomics Paper.",
    useOfFundsTitle: "What the presale funds",
    vestingTitle: "Vesting and protections",
    whatVests: "What vests",
    vestingNote:
      "Long-term allocations unlock on published schedules rather than all at once, and every release is visible on chain.",
    protectionsTitle: "Protections",
    riskTitle: "Risk",
    riskBody:
      "Nothing here is an offer to sell securities or financial advice. Terms may change. Participating in a token sale can result in total loss.",
  },

  /**
   * Pages that are genuinely placeholders. Kept honest: each says what will be
   * there rather than pretending to have content.
   */
  pages: {
    roadmap: {
      eyebrow: "roadmap",
      title: "Roadmap",
      intro:
        "Version 1.0 of the specifications is the starting point, not the finish. Chapter 26 sets out the phases; every item below is a milestone rather than a shipped feature.",
    },
    downloads: {
      eyebrow: "downloads",
      title: "Downloads",
      intro:
        "Per-chapter PDF renders of the whitepaper. There are no PDFs of the OFS specifications — read those on the site or in the specifications repository.",
    },
    documentation: {
      eyebrow: "documentation",
      title: "Documentation",
      intro:
        "Developer documentation lives at docs.openfiat.org. The specifications themselves are the authoritative reference and are published in full here.",
    },
    foundation: {
      eyebrow: "governance",
      title: "Foundation",
      intro:
        "The whitepaper refers to both AllenHark and an OpenFiat Foundation without defining the relationship between them. This page will describe the stewardship structure once it is settled.",
    },
    community: {
      eyebrow: "community",
      title: "Community",
      intro:
        "Contribution areas named in Chapter 25: software development, documentation, security research, bug reports, infrastructure services, educational material, localization and developer tools.",
    },
    blog: {
      eyebrow: "blog",
      title: "Blog",
      intro: "Protocol updates and engineering notes will be published here.",
    },
    press: {
      eyebrow: "press",
      title: "Press",
      intro:
        "Brand assets and press enquiries. For anything factual about the protocol, the whitepaper and specifications are the source.",
    },
    careers: {
      eyebrow: "careers",
      title: "Careers",
      intro: "Open roles will be listed here.",
    },
    status: {
      eyebrow: "status",
      title: "Status",
      intro:
        "Network and service status. No public network is running yet, so there is nothing to report.",
    },
    contact: {
      eyebrow: "contact",
      title: "Contact",
      intro:
        "For protocol questions, open a discussion in the specifications repository so the answer is public and searchable.",
    },
    privacy: {
      eyebrow: "legal",
      title: "Privacy Policy",
      intro:
        "This page needs review by counsel before launch and is not final.",
    },
    terms: {
      eyebrow: "legal",
      title: "Terms of Use",
      intro:
        "This page needs review by counsel before launch and is not final.",
    },
  },

  tokenomics: {
    supplyLabel: "Maximum supply",
    supplyPending: "Set at genesis",
    allocationAria: "OPEN allocation",
    provisional:
      "Allocation percentages are provisional and will be finalized in the OPEN Tokenomics Paper.",
    proceedsTitle: "What the presale funds",
  },

  common: {
    readWhitepaper: "Read the whitepaper",
    notFoundTitle: "Page not found",
    notFoundBody:
      "That page does not exist. It may have moved, or the link may be wrong.",
    goHome: "Go to the homepage",
    errorTitle: "Something went wrong",
    errorBody:
      "This page failed to render. Reloading may fix it; if it does not, the problem is on our side.",
    tryAgain: "Try again",
  },
};

/**
 * Deliberately not `as const`: string types must widen so a translation can
 * supply different text while still being checked for completeness.
 */
export type Dictionary = typeof en;
