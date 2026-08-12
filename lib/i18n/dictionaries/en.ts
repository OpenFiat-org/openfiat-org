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
      network: "Network",
      project: "Project",
      community: "Community",
    },
    links: {
      // "Protocol overview" rather than "Protocol", which would repeat the
      // heading above it and tell a reader nothing about where it goes.
      overview: "Protocol overview",
      howItWorks: "How it works",
      trust: "Trust & safety",
      whitepaper: "Whitepaper",
      specifications: "Specifications",
      glossary: "Glossary",
      roadmap: "Roadmap",
      fees: "Fees",
      actors: "All roles",
      merchants: "Merchants",
      nodeOperators: "Node operators",
      developers: "Developers",
      guides: "Guides",
      becomeArbitrator: "Become an arbitrator",
      earn: "How you earn",
      sale: "Token sale",
      runNode: "Run a node",
      downloads: "Downloads",
      documentation: "Documentation",
      developerDocs: "Developer docs",
      status: "Status",
      app: "Launch app",
      foundation: "Foundation",
      blog: "Blog",
      press: "Press",
      careers: "Careers",
      contact: "Contact",
      // The page lists contribution areas, so the link says so.
      contribute: "Ways to contribute",
      github: "GitHub",
      discussions: "Discussions",
      discord: "Discord",
      reddit: "Reddit",
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
      bodyLive:
        "OPEN is the stake behind every role that keeps the marketplace honest — merchants, arbitrators, nodes, oracles. The presale offers the community allocation at a fixed rate before any public sale. The presale is live on devnet; connecting a wallet lets you contribute today.",
      presaleRate: "Presale rate",
      publicRate: "Public sale after",
      publicRateValue: "1 USDC = 80 OPEN",
      supply: "Supply",
      supplyValue: "100,000,000,000 · mint authority unset",
      status: "Status",
      statusLive: "Live on devnet",
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

  /*
   * The earnings page, written under one rule: nothing here may imply a
   * return. Every figure it shows is either computed from the reader's own
   * inputs or labelled as resting on an assumption they set themselves, and
   * the sections explaining what is deliberately absent carry as much weight
   * as the ones explaining what is there.
   */
  earn: {
    title: "How you earn",
    intro:
      "A node's reward is a share of one day's emission, decided by what it staked and by three measurements of what it did with that stake. This is the formula the software actually runs, with the parts it cannot know marked as such.",
    heroMeta:
      "Every constant on this page is read from crates/rewards in openfiat-core. No node has been paid yet.",

    modelTitle: "What decides your share",
    modelIntro:
      "Emission per epoch is fixed. Your reward is your weight over every eligible node's weight, and weight is a stake multiplied by three measurements of service — each of which is at most 1.0.",
    termStakeTitle: "What you staked",
    termStakeBody:
      "Read from your on-chain stake account, never from a figure your node reports about itself. One stake backs one node: if two nodes name the same account, both are excluded for the epoch.",
    termConnectivityTitle: "Whether you bridge to Solana",
    termConnectivityBody:
      "1.0 if the network saw your node originate a Solana blockhash announcement, 0.4 if it only ever saw you gossip. A bridging node does strictly more work, and the difference shows in its own signed announcements rather than in a claim.",
    termAvailabilityTitle: "How much of the day you were up",
    termAvailabilityBody:
      "The share of the epoch's 24 one-hour slices your node was heard in at all. Being heard once in a slice scores it and being heard five hundred times scores the same, so flooding the network earns nothing.",
    termPinningTitle: "Whether you serve content",
    termPinningBody:
      "1.0 if your node returned bytes matching a content address when challenged, 0.7 if it was never challenged or failed. This is the only one of the three that is proven rather than plausible — bytes that hash to a CID cannot be produced without holding them.",
    pinningAheadOfSpec:
      "One caveat on that fourth term. OFS-4100 §9.2's confirmed table lists three factors — stake, connectivity, availability — and does not mention pinning. The crate applies it anyway. Where the specification and the code disagree this page follows the code, because the code is what would compute a schedule; but read the pinning multiplier as running ahead of the specification rather than settled by it.",

    ceilingTitle: "Nothing here can exceed 1.0",
    ceilingLede:
      "Every multiplier is a fraction of one, and the software refuses to start with a parameter set where one is not.",
    ceilingBody:
      "That is not caution, it is the only arrangement that adds up. The pool for an epoch is a fixed number of tokens, and the multipliers decide how that pool is divided. A multiplier above 1.0 would not pay a good node extra out of somewhere — it would apportion tokens the Infrastructure bucket does not contain. RewardParams::validate rejects such a set outright rather than letting the shortfall surface on payout day.",
    ceilingPenalty:
      "It is also why the reward for serving content is built as a penalty on nodes that do not. “Nodes that pin earn more” and “nodes that do not pin earn less” describe the same outcome, and only the second can be implemented without inventing tokens. A pinning node keeps its whole share; a node that pins nothing yields three tenths of its own.",
    matrixCaption:
      "Every value the two switches can take, at full availability.",
    matrixQuality: "Multiplier",
    matrixNote:
      "Read the middle two rows together: a gossip-only node that serves content ({gossipPin}) still earns less than a bridging node that serves none ({rpcNoPin}). Serving content is a premium on top of a chain connection, never a substitute for one.",

    calcTitle: "Try your own numbers",
    calcIntro:
      "The left column is what you control. The right splits the result in two: what your inputs settle exactly, and what depends on a network that has not formed yet.",
    yourNode: "Your node",
    stakeLabel: "Stake",
    stakeHint:
      "Below 1,000 OPEN a node is not weighted at all. It is not paid a smaller share — it is skipped.",
    availabilityLabel: "Hours heard in",
    availabilityHint:
      "Of the epoch's 24 one-hour slices. A slice counts once, however much traffic you send during it.",
    connectivityLabel: "Connectivity",
    connectivityRpc: "Bridging to Solana",
    connectivityGossip: "Gossip only",
    pinningLabel: "Content",
    pinningServing: "Answered a challenge",
    pinningAbsent: "Not challenged, or failed",

    determinedTitle: "Settled by your inputs",
    qualityCeiling: "of a possible 1.00",
    qualityLabel:
      "Your quality multiplier — the three service factors, collapsed the way the schedule collapses them.",
    factorConnectivity: "connectivity",
    factorAvailability: "availability",
    factorPinning: "pinning",
    factorProduct: "quality",
    ineligibleBelowFloor:
      "At this stake the node earns nothing. {min} OPEN is the floor, and a node beneath it is left out of the weighting entirely.",
    ineligibleOffline:
      "A node heard in no slice of the epoch scores zero availability, which zeroes the whole weight. It earns nothing, whatever it staked.",

    assumedTitle: "Depends on the rest of the network",
    assumedNote:
      "Your share is your weight divided by every eligible node's weight, so it cannot be computed from your inputs alone. There is no live total to substitute — this page reads no chain state, and no reward has ever been distributed. So the total is a guess, you set it, and both figures below rest on it and on nothing firmer.",
    peersLabel: "Other eligible nodes",
    peerStakeLabel: "Staked by each of them",
    shareLabel: "Your share of the epoch's pool",
    perEpochLabel: "OPEN per epoch, under that assumption",
    poolReminder:
      "The whole pool is {pool} OPEN per epoch, split across every eligible node. Both figures move the moment anyone else stakes, and neither is a forecast.",

    emissionTitle: "The pool is finite",
    emissionLede: "Bootstrap emission is a bucket, not a rate. It empties.",
    emissionBody:
      "120,000,000 OPEN — 12% of supply — is set aside to pay nodes while protocol revenue is too small to matter, spread evenly across roughly four years of daily epochs. On the day it runs out the reward pool becomes exactly the Infrastructure treasury's share of settlement fees: what the network earned, and nothing more. Anyone sizing a node against the figures above should size it against that day too.",
    emissionBucket: "OPEN in the bucket",
    emissionBucketNote:
      "The Infrastructure / Node Bootstrap genesis allocation, 12% of total supply.",
    emissionPerEpoch: "OPEN per epoch",
    emissionPerEpochNote:
      "Shared by every eligible node, and capped by whatever is left in the bucket.",
    emissionEpochs: "Daily epochs",
    emissionEpochsNote:
      "About four years, after which emission is whatever protocol revenue funds.",

    refusalTitle: "What this page will not tell you",
    refusalLede: "Three figures are missing, and each is missing on purpose.",
    refusalPriceTitle: "What it is worth in your currency",
    refusalPriceBody:
      "OPEN has no market and therefore no price. A figure in dollars, euro or renminbi here would be a number this project invented about its own token and then handed you with the authority of a calculator. There is no honest rate to convert at, so there is no conversion.",
    refusalYieldTitle: "A yield, an APR, or a return",
    refusalYieldBody:
      "A percentage return reads as a promise, and this is not something the protocol can promise. The emission behind it empties in four years, the share is divided with every node that joins, and none of the parameters is fixed — §9 makes all of them governance-updatable. One annualised number would hide all three.",
    refusalTotalTitle: "What the network has staked today",
    refusalTotalBody:
      "This page reads no chain state. Your share depends on the total staked across every eligible node, and rather than substitute a plausible-looking figure the calculator makes that total an assumption you set, then labels everything resting on it.",

    statusTitle: "What is actually running",
    statusBadge: "Devnet · nothing paid",
    statusLede: "The calculation exists. The payment does not.",
    statusBody:
      "Nodes observe each other's liveness and publish what they saw, and the schedule that turns those observations into amounts is implemented and tested — deterministically, so anyone holding the same observations derives the same answer and the paying node can be checked rather than trusted. What is missing is the last step: nothing submits a schedule on chain, and the rewards vault is empty. No node has ever been paid.",
    statusParams:
      "Every value here is a governance parameter rather than a constant: the {min} OPEN floor, the {buckets} availability slices and all four multipliers can be changed by a vote without a code change. These are today's defaults.",
    sourceNote:
      "Constants read from crates/rewards/src/params.rs; the arithmetic mirrors schedule.rs, including where it truncates.",
    sourceLink: "Read the source",
    specLink: "Read OFS-4100",

    ctaTitle: "Run one and find out",
    ctaBody:
      "The reward model is the smaller half of the decision. The larger half is whether the machine, the bandwidth and the attention are worth it to you — the operator guide has the real hardware, the real commands, and the parts that are not built yet.",
    ctaRunNode: "Run a node",
    ctaFees: "Every fee and payout",
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
      "Whatever remains unsold from the Community Presale allocation when the presale closes will be offered afterward in a public sale at 1 USDC = 80 OPEN.",
    purchase: "Purchase OPEN",
    purchaseDisabled: "Purchase opens when the sale goes live",
    amount: "You pay",
    youReceive: "You receive",
    /** The presale price is fixed in the program, not quoted per trade. */
    rateNote: "1 USDC = 100 OPEN",
    estimated: "estimated",
    reviewing: "Simulating transaction…",
    submitting: "Awaiting wallet signature…",
    confirming: "Confirming…",
    done: "Purchase confirmed",
    txFailed: "The transaction was not sent",
    txSuccess: "Confirmed",
    /*
     * Failure messages, keyed by `SaleErrorKey` in lib/sale/errors.ts. Every
     * one is a sentence about what the person can do next; the chain's own
     * text is kept behind `detailsLabel` rather than shown as the message,
     * because "custom program error: 0x1" tells a visitor nothing.
     *
     * `{placeholder}`s are substituted by the panel — same reason as
     * `limitNote` above: this crosses into a client component, so it can't
     * be a function.
     */
    errors: {
      amountRequired: "Enter an amount to contribute.",
      amountInvalid: "Enter an amount greater than zero.",
      insufficientBalance:
        "You have {balance} {symbol}. Enter an amount your balance covers.",
      belowMinimum:
        "A wallet's first contribution must be at least {min} USDC.",
      aboveMaximum: "A wallet can contribute at most {max} USDC in total.",
      hardCapReached: "The sale has reached its cap and can't accept more.",
      saleNotOpen: "The sale isn't open right now.",
      claimsNotOpen: "Claims open once the sale has been finalized.",
      nothingToClaim: "You have no OPEN left to claim.",
      walletBanned: "This wallet isn't able to take part in the sale.",
      walletRejected: "You cancelled the request in your wallet.",
      notEnoughSol: "You don't have enough SOL to cover the network fee.",
      expired: "The request expired before it confirmed. Please try again.",
      slippage:
        "The price moved too much while the swap was routed. Try again.",
      network: "Couldn't reach the network. Check your connection and retry.",
      generic: "Something went wrong and the purchase wasn't made.",
      detailsLabel: "Technical details",
    },
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
        "Software releases from GitHub — node binaries, SDKs and the app — plus the whitepaper as PDF. There are no PDFs of the OFS specifications — read those on the site or in the specifications repository.",
      releasesTitle: "Software releases",
      releasesIntro:
        "Each project publishes its own tagged releases on GitHub. These links always point at the latest.",
      nodeTitle: "Node",
      nodeBody:
        "The reference node binary and source — the software that runs the network in run-a-node.",
      sdkTitle: "SDKs",
      sdkBody:
        "Client libraries for building against OpenFiat: TypeScript and Rust packages, published alongside their source.",
      appTitle: "App",
      appBody:
        "The reference wallet and trading interface. A preview build — see the app's own releases for what has shipped.",
      viewReleases: "View releases",
      whitepaperTitle: "Whitepaper",
      whitepaperBody:
        "Per-chapter PDF renders are not published yet — read the whitepaper on the site, or download the full specifications from the specifications repository.",
      whitepaperCta: "Read the whitepaper",
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
        "Live status of the OpenFiat devnet, read directly from a public node's RPC. Devnet only — there is no mainnet deployment.",
      online: "Online",
      offline: "Offline",
      slotLabel: "Current slot",
      modeLabel: "Chain mode",
      ageLabel: "Block age",
      lastCheckedLabel: "Last checked",
      checkingLabel: "Checking…",
      lastKnownNote:
        "Showing the last known values; the node is not responding right now.",
      neverReachedNote: "This node has not responded yet.",
      rpcLabel: "RPC endpoint",
      autoRefreshNote: "Refreshes automatically every 15 seconds.",
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
