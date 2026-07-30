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
    guides: "Guides",
    fees: "Fees",
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
      guides: "Guides",
      fees: "Fees",
      runNode: "Run a node",
      becomeArbitrator: "Become an arbitrator",
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
    headlineLead: "A marketplace that",
    headlineAccent: "no country or company can switch off",
    headlineTail: ".",
    lede: "OpenFiat is an open protocol for exchanging stablecoins for local currency, peer to peer. Escrow settles on Solana; discovery, reputation and communication run on a network anyone can join. No government can censor it and no company can suspend you — there is no operator to pressure, only participants.",
    ctaJoinSale: "Join the community presale",
    ctaHowItWorks: "See how a trade works",
    readWhitepaper: "Read the whitepaper",
    tokenSale: "Token sale",

    telemetry: {
      layers: "layers",
      stakedRoles: "staked roles",
      specifications: "specifications",
      repositories: "repositories",
      centralOperators: "central operators",
    },

    problem: {
      title: "Every P2P exchange today has the same architecture.",
      subtitle:
        "The cryptocurrency is decentralized. The marketplace is not. Behind almost every peer-to-peer exchange:",
      company: "A single company",
      actions: [
        "owns the servers",
        "controls the database",
        "decides which advertisements appear",
        "resolves disputes",
        "stores reputation scores",
        "may suspend or remove users",
        "decides which countries are supported",
        "can be shut down, hacked, or pressured",
      ],
      verdict:
        "If the operator fails — technically, financially, legally — the marketplace disappears, even though the blockchain underneath never stopped. OpenFiat eliminates the dependency.",
    },

    layers: {
      title: "Two layers, each doing what it does best.",
      subtitle:
        "The architecture minimizes on-chain cost while preserving decentralized ownership and transparency.",
      coordination: {
        label: "Coordination layer · OpenFiat network",
        title: "Fast communication between people",
        body: "Runs on an open peer-to-peer network anyone can join — no company in the middle, no server to seize.",
        items: [
          "Advertisement discovery",
          "Trade coordination",
          "Reputation",
          "Encrypted communication",
          "Notifications & search",
          "Marketplace indexing",
        ],
      },
      settlement: {
        label: "Settlement layer · Solana",
        title: "What blockchains do exceptionally well",
        body: "Assets are locked and released by audited smart contracts — never by an operator's goodwill.",
        items: [
          "Secure asset custody",
          "Escrow management",
          "Staking",
          "Treasury management",
          "Governance execution",
        ],
      },
    },

    flow: {
      title: "One trade, four moves",
      subtitle:
        "Protected from the second move onward — nobody in the middle can take the funds, and nobody has to trust the other side's goodwill.",
      stages: ["Network", "On-chain", "Fiat rail", "On-chain"],
      pathsNote: "then keep going: trader, operator and builder guide paths",
    },

    read: {
      title: "Read the protocol",
      subtitle:
        "Every chapter published as a web page — no download, nothing behind a form. It assumes no prior blockchain experience and builds up from what money is. The numbered specifications sit alongside for implementers.",
      startHere: "start here",
      moreChapters: (n: number) => `${n} more chapters`,
      specsCta: (n: number) => `${n} specifications`,
    },

    contribute: {
      title: "Build it with us",
      subtitle:
        "Every layer is open source under Apache-2.0, and the specs repo accepts prose and translations — contributing does not have to mean code.",
    },

    saleBand: {
      body: "OPEN is the stake behind every role that keeps the marketplace honest — merchants, arbitrators, nodes, oracles. The presale offers the community allocation at a fixed rate before any public sale. No sale contract is deployed yet; connecting a wallet today only checks readiness.",
      presaleRate: "Presale rate",
      publicRate: "Public sale after",
      publicRateValue: "1 OPEN = 1.25 USDC",
      supply: "Supply",
      supplyValue: "1,000,000,000 · mint authority unset",
      status: "Status",
      termsCta: "Sale terms & allocation",
    },

    safety: {
      more: "How trust works",
    },

    roles: {
      seeAll: "See every role",
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
    releasesLink: "GitHub Releases",
    referenceNote:
      "Commands below use the reference deployment: the openfiat-node service, /etc/openfiat for configuration and /var/lib/openfiat for data.",
    serveRpcTitle: "Serve the network, not just yourself",
    serveRpc:
      "A node that only reads is a guest. A node the public can reach is infrastructure — wallets, explorers and web apps have to talk to *somebody*, and today too few of those somebodies exist. Every operator who puts their node behind TLS and sets --public-rpc-url widens that set, which is the difference between a network with several independent front doors and one with a single point of failure that everyone quietly depends on. It costs a certificate and a reverse proxy. It is also paid: a reachable node is one peers can challenge and reward, and OpenFiat's own applications will use yours alongside every other.",
    serveRpcHonest:
      "Two things worth knowing before you do it. Serving the public means real traffic, so size the machine for it and watch the metrics endpoint. And a public node is a public commitment — people will build against the URL you publish, so take it down deliberately rather than quietly.",
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

    /* AllenHark's hosting offer. Written without prices or plan names — see
       lib/hosting.ts for why. `{pct}` is substituted from HOSTING. */
    hostingTitle: "Where to run it",
    hostingIntro:
      "AllenHark leads initial development of the protocol and sells the two things a node needs: a server and Solana RPC access. Node operators get {pct}% off both, as part of the OpenFiat program.",
    hostingVps: "Server hosting",
    hostingVpsBody:
      "NVMe storage on 10 Gbps uplinks, in Frankfurt, Amsterdam and Chicago. Size it against the hardware above — storage is what a full node grows into, so say what you are running and it can be specified for you.",
    hostingRpc: "Solana RPC and gRPC",
    hostingRpcBody:
      "Staked connections, so transactions your node submits are not queued behind everyone else's. Access is granted by IP allowlist rather than an API key. Yellowstone gRPC is available for streaming account and slot updates.",
    hostingViewPricing: "See pricing",
    hostingClaimTitle: "Claiming the discount",
    hostingClaimBody:
      "There is no code to enter. Ask on Discord or in the chat on allenhark.com, say you are running an OpenFiat node, and the discount is applied to your order.",
    hostingDiscord: "Ask on Discord",
    hostingChat: "Open a chat",
  },

  /* Shell copy for /guides and the shared guide renderer. Each guide's own
     words live in its module under lib/guides, in every locale. */
  fees: {
    title: "Fees",
    intro:
      "Every fee the protocol charges and everything it pays out. Most of what follows is decided and documented but not yet collected or paid, and each row says which it is — a fees page that read as if it were all live would be the most consequential kind of wrong.",
    accuracyNote:
      "Devnet only. Every fee is a governance parameter, never a constant.",
    payTitle: "What you pay",
    payIntro:
      "Three fees, and they do not fall on the same party. A buyer pays only on a completed trade and nothing to raise a dispute; a merchant carries the standing costs of advertising and being arbitrated.",
    receiveTitle: "What each role receives",
    receiveIntro:
      "Consumption and compensation are separate questions. A service can be free to consume and still be paid for by the protocol — that is exactly how oracle rates work.",
    permissionedTitle: "The one permissioned role",
    permissionedBody:
      "Risk intelligence is the only role that requires governance approval before operating. AllenHark is the default provider.",
    defaultProviderLabel: "Default service key",
    governanceTitle: "Every fee is a parameter",
    governanceBody:
      "No amount here is a constant. Each one is governance-updatable, because fees denominated in a token have to move as that token's price does. The figures shown are current defaults, and those marked as proposed have not been signed off.",
    columnPayer: "Payer",
    columnAmount: "Amount",
    columnConsumer: "Consumer pays",
    columnReceives: "Provider receives",
    status: {
      live: "Charged today",
      specified: "Specified, not yet active",
      none: "Nothing, by decision",
    },
  },

  guides: {
    title: "Guides",
    intro:
      "Step-by-step, with the real commands. Every guide is written against the software as it exists today, so where something is not built yet, the guide says so instead of describing what it would look like.",
    accuracyNote:
      "Devnet only. Program ids and endpoints on these pages are devnet artifacts; there is no mainnet deployment.",
    allGuides: "All guides",
    requirementsTitle: "Before you start",
    stepsTitle: "Steps",
    relatedTitle: "Related",
    copy: "Copy",
    copied: "Copied",
    standalonePage: "Standalone page",
    azTitle: "All guides, A–Z",
    progressNote:
      "Progress lives in this browser only — no account, nothing sent anywhere.",
    completedLabel: "completed",
    milestonesMeta: (count: number) =>
      `${count} milestone${count === 1 ? "" : "s"}`,
    stepsMeta: (count: number) => `${count} step${count === 1 ? "" : "s"}`,
    milestoneOf: (position: number, total: number) =>
      `Milestone ${position} of ${total}`,
    markStepDone: "Mark step done",
    stepDoneLabel: "Done",
    prevOnPath: "Previous on path",
    nextOnPath: "Next on path",
    groups: {
      trade: {
        title: "Trading",
        blurb:
          "Buying and selling, and putting up the liquidity others trade against.",
      },
      operate: {
        title: "Running infrastructure",
        blurb:
          "The roles that keep the network up. Protocol revenue is meant to pay for it; none of it is flowing yet.",
      },
      build: {
        title: "Building on OpenFiat",
        blurb:
          "Writing software against the protocol rather than using an app someone else wrote.",
      },
    },
    standalone: {
      runNode: {
        title: "Run a node",
        summary:
          "Install, configure and operate an OpenFiat node, from hardware to monitoring.",
      },
      becomeArbitrator: {
        title: "Become an arbitrator",
        summary:
          "Bond OPEN, take a dispute case, and cast the commit-reveal vote that decides it.",
      },
    },
  },

  becomeArbitrator: {
    title: "Become an OpenFiat arbitrator",
    intro:
      "Arbitrators decide disputes with their own OPEN at risk, not their reputation. This walks through bonding, finding a case, and casting the commit-then-reveal vote that actually pays out.",
    neverCustody:
      "Arbitrators never hold trade funds. A ruling only ever moves money the escrow program itself already locked before the dispute opened.",
    requirementsTitle: "What you need",
    bondCta: "Bond {amount} OPEN on openfiat-app",
    lifecycleTitle: "Working a case",
    lifecycleNote:
      "Work through these in order, for one case at a time. Each step carries the command or code it needs.",
    copy: "Copy",
    copied: "Copied",
  },

  sale: {
    title: "The OPEN community presale",
    notLiveTitle: "The sale is not open",
    notLiveBody:
      "No sale contract has been deployed and no terms are final. You can connect a wallet to check readiness, but there is nothing to purchase yet.",
    connectWallet: "Connect wallet",
    disconnect: "Disconnect",
    connected: "Connected",
    verifyWallet: "Verify wallet",
    verifying: "Waiting for signature…",
    verified: "Verified",
    verifyNote:
      "Sign a message (no transaction, no fee) to confirm you control this wallet before purchasing.",
    verifyUnsupported:
      "This wallet doesn't support message signing — you can still purchase; wallet ownership is proven by the transaction signature itself.",
    balance: "Balance",
    max: "Max",
    /*
     * `{min}` / `{max}` placeholders rather than a function, because this
     * string is handed to a client component and functions cannot cross that
     * boundary. Fragments composed in JSX were the other option, but word
     * order differs by language and this keeps each locale one sentence.
     */
    limitNote:
      "{min}–{max} USDC per wallet. Max fills the lower of your balance and that limit.",
    raisedLabel: "Raised",
    goalLabel: "Target",
    offeredLabel: "Offered",
    goalNote:
      "The target is a goal, not a cap. The presale offers the entire Community Presale allocation, so it can keep selling past the target if demand goes further.",
    publicSaleNote:
      "Whatever remains unsold from the Community Presale allocation when the presale closes will be offered afterward in a public sale at 1 OPEN = 1.25 USDC.",
    purchase: "Purchase OPEN",
    purchaseDisabled: "Purchase opens when the sale goes live",
    amount: "You pay",
    youReceive: "You receive",
    /** The presale price is fixed in the program, not quoted per trade. */
    rateNote: "1 OPEN = 1 USDC",
    estimated: "estimated",
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
    rewardsTitle: "Your OPEN rewards",
    rewardsSubtitle: "Connect the wallet you contributed with.",
    rewardsConnectPrompt:
      "Connect your wallet to check what you've earned in the presale.",
    rewardsContributed: "You contributed",
    rewardsEntitlement: "OPEN reward",
    rewardsNoContribution: "No contribution found for this wallet.",
    rewardsNoContributionCta: "Join the presale",
    rewardsPendingNote:
      "Counted once the sale finalizes — check back after it closes.",
    rewardsClaimedNote: "Already claimed to this wallet.",
    rewardsRefundableNote:
      "The soft cap wasn't met — this contribution is refundable in USDC on the sale page.",
    rewardsGoToSale: "Go to the sale page",
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
        "Developer documentation lives at docs.openfiat.network. The specifications themselves are the authoritative reference and are published in full here.",
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
