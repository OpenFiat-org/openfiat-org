import type { ActorSlug } from "@/lib/actors";

/**
 * Long-form page content, kept apart from the UI dictionary so the two can be
 * reviewed separately. English is the source of truth for both types.
 *
 * Everything here is drawn from the whitepaper. Where the whitepaper is silent
 * — reward formulas, stake minimums, licensing — the copy says so rather than
 * filling the gap.
 */

export type ActorCopy = {
  name: string;
  /** One line, in the whitepaper's own terms. */
  definition: string;
  /** Short label for cards and navigation. */
  summary: string;
  responsibilities: string[];
  stake: string;
  earns: string;
  requirements: string[];
};

export const enContent = {
  home: {
    scenarios: [
      {
        code: "KES",
        text: "A freelancer receives payment in USDC and converts it to Kenyan Shillings to pay rent.",
      },
      {
        code: "USDC",
        text: "A business converts local currency into stablecoins to pay an overseas supplier.",
      },
      {
        code: "PHP",
        text: "A traveler exchanges stablecoins for local currency while visiting another country.",
      },
      {
        code: "NGN",
        text: "Someone sends stablecoins internationally, and the recipient converts them into local cash.",
      },
    ],
    rails: [
      "Bank transfer",
      "Mobile money",
      "ACH",
      "SEPA",
      "Faster Payments",
      "PIX",
      "Cash deposit",
      "Regional instant payment networks",
    ],
  },

  trust: {
    flow: [
      {
        title: "You pick an offer",
        body: "Offers show the rate, the payment methods accepted, the limits, and how the other side has performed on past trades. Nothing is committed yet.",
      },
      {
        title: "Their crypto goes into escrow",
        body: "Before any money moves, the seller's stablecoins are locked in an on-chain escrow. The seller cannot take them back and the buyer cannot take them early. This is the step that makes the rest safe.",
      },
      {
        title: "You pay the way you normally pay",
        body: "Bank transfer, mobile money, an instant payment network, or cash. The payment happens on your usual rails, not on a blockchain, and you mark it as sent when it is done.",
      },
      {
        title: "Escrow releases",
        body: "The seller confirms the money arrived and the escrow releases automatically. If they do not confirm, or something is wrong, either side can open a dispute.",
      },
    ],

    pillars: [
      {
        title: "Escrow comes first",
        body: "Funds are locked before fiat moves, every time. A buyer never sends money hoping the other side will honour it, and a seller never releases coins hoping payment turns up.",
      },
      {
        title: "Reputation is earned, not bought",
        body: "Every completed trade, every dispute and every response time is part of a public record tied to a wallet. Someone cannot buy a good reputation, and cannot leave a bad one behind by opening a new account.",
      },
      {
        title: "Your identity stays yours",
        body: "There is no KYC. Instead of asking who you are, the protocol lets you prove what you control — an email, a phone, a Telegram account — and it never establishes your nationality or legal status.",
      },
      {
        title: "Known-bad wallets get flagged",
        body: "Independent providers publish signed risk information about wallets tied to fraud or sanctions. It is advisory: your app can warn you, ask for confirmation, or ignore it entirely. Nobody is banned by a central list.",
      },
    ],

    dispute: [
      {
        title: "Either side opens a case",
        body: "The person opening it pays a small fee in OPEN, refunded if the dispute was raised in good faith and forfeited if it was frivolous. Both sides submit evidence: receipts, payment confirmations, the trade conversation.",
      },
      {
        title: "Arbitrators stake to take the case",
        body: "Qualified arbitrators choose cases rather than being assigned, and must commit their own OPEN before they are allowed to see the evidence. Because the evidence is hidden until they commit, there is nothing to bribe them over in advance.",
      },
      {
        title: "They vote without seeing each other",
        body: "Each arbitrator publishes a sealed commitment first and reveals their decision later, so no one can follow the crowd. The number of arbitrators on a case is not published, which keeps anyone from guessing how much is at stake.",
      },
      {
        title: "The escrow settles the outcome",
        body: "The decision executes on chain. Arbitrators in the majority earn a reward; those outside it lose part of their stake. Penalties are deliberately moderate — the aim is to deter negligence and collusion, not to punish honest disagreement.",
      },
    ],
  },

  protocol: {
    solanaBlurb:
      "Audited on-chain programs hold the assets. Custody does not depend on OpenFiat being online, reachable, or even still maintained.",
    solanaItems: [
      "Asset custody",
      "Escrow execution",
      "Staking",
      "Treasury",
      "Governance execution",
    ],
    openfiatBlurb:
      "An open peer-to-peer network carries the marketplace. Anyone can run a piece of it, and no single operator can take it down.",
    openfiatItems: [
      "Advertisement discovery",
      "Trade coordination",
      "Reputation",
      "Encrypted messaging",
      "Service discovery",
      "Notifications",
      "Session recovery",
    ],
    principles: [
      {
        title: "Verify control, not identity",
        body: "Instead of determining who someone is, OpenFiat verifies what they control. It establishes no nationality, citizenship or legal status, and requires no KYC.",
      },
      {
        title: "Protocol, not platform",
        body: "No company owns email. Thousands of independent providers implement a common standard. OpenFiat is built the same way.",
      },
      {
        title: "Reputation is earned",
        body: "A newly verified user has less observable history than an anonymous merchant who has completed thousands of trades over years.",
      },
      {
        title: "Decentralize only what benefits from it",
        body: "Escrow benefits from on-chain execution. Advertisement listings do not. The test is whether decentralizing improves security, resilience, transparency or ownership.",
      },
      {
        title: "Not another blockchain",
        body: "OpenFiat introduces no competing consensus algorithm. Rather than replacing existing chains, it extends them.",
      },
      {
        title: "Designed to outlive its creators",
        body: "AllenHark leads initial development and is designed to become unnecessary. No single participant should be indispensable.",
      },
    ],
  },

  actorGroups: {
    participants: {
      title: "Anyone can be these",
      blurb: "Trading needs no registration and no stake. Advertising does.",
    },
    providers: {
      title: "Infrastructure and service roles",
      blurb: "Operate part of the network, and earn from protocol revenue.",
    },
    builders: {
      title: "Building on the protocol",
      blurb: "One protocol, many implementations.",
    },
  },

  actors: {
    buyers: {
      name: "Buyers and sellers",
      definition:
        "A buyer is any participant who accepts an existing advertisement.",
      summary: "Buy and sell stablecoins for local currency.",
      responsibilities: [
        "Browse advertisements and filter by country, currency, payment method and amount",
        "Reserve a trade, which moves stablecoins into escrow before any fiat is sent",
        "Send or receive the fiat payment through the agreed rail",
        "Mark payment as sent, and confirm receipt as the counterparty",
        "File a dispute with evidence if something goes wrong",
      ],
      stake:
        "None. Buyers do not publish advertisements and stake nothing. The only OPEN at risk is the dispute filing fee, which may be refunded if the dispute was filed in good faith and forfeited if it was frivolous.",
      earns:
        "Nothing directly. The benefit is competition between merchants and no dependence on a single operator staying online.",
      requirements: [
        "A self-custody wallet",
        "No KYC and no centralized identity verification",
        "Optionally, voluntary identity claims proving control of an email, Telegram or other channel",
      ],
    },
    merchants: {
      name: "Merchants",
      definition:
        "Merchants are participants who continuously provide liquidity to the marketplace.",
      summary: "Provide liquidity and publish advertisements.",
      responsibilities: [
        "Publish digitally signed advertisements to buy or sell stablecoins for local fiat",
        "Choose fixed pricing or floating pricing against an oracle reference rate",
        "Support one or more countries and payment methods",
        "Manage availability across online, offline and vacation states",
        "Verify that fiat payment arrived, then release escrow",
        "Renew advertisements before they expire",
      ],
      stake:
        "Merchant registration requires staking OPEN. It discourages spam, provides economic accountability, and sets the merchant's initial advertisement capacity. Importantly, merchant stake does not back individual trades — settlement is secured by the escrow vault. Staking also does not grant reputation, which must be earned through completed trades.",
      earns:
        "The spread on their own pricing. Merchants pay rather than receive protocol fees: each active advertisement requires a listing fee denominated in OPEN.",
      requirements: [
        "Register a merchant profile before advertising",
        "Stake OPEN; capacity scales with stake, reputation, account age, trade history and dispute rate",
        "Declare supported countries and payment methods",
      ],
    },
    "node-operators": {
      name: "Node operators",
      definition:
        "Node operators are the backbone of the OpenFiat network. Solana validators secure the blockchain and execute the OpenFiat programs; node operators maintain the decentralized marketplace that exists above it.",
      summary: "Run the peer-to-peer marketplace layer.",
      responsibilities: [
        "Maintain peer-to-peer connections and participate in gossip propagation",
        "Synchronize marketplace state and host advertisement indexes",
        "Distribute reputation and risk vectors",
        "Broadcast trade lifecycle events",
        "Maintain the provider directory and publish node health",
        "Serve client applications",
      ],
      stake:
        "Required to be an active participant. Stake alone does not determine reputation, though — an operator with poor performance cannot compensate by staking more. Effective priority combines reputation, stake and measured network performance, and staked nodes are eligible for protocol rewards.",
      earns:
        "Compensation comes from protocol revenue rather than token inflation, weighted by stake, reputation, availability, synchronization success, peer connectivity and service quality. No formula or rate is published.",
      requirements: [
        "Commodity server hardware — 4 cores, 16 GB RAM and 250 GB NVMe at minimum",
        "A stable connection and a generated node identity",
        "No approval from anyone: any participant meeting protocol requirements may run a node",
      ],
    },
    arbitrators: {
      name: "Arbitrators",
      definition:
        "OpenFiat distributes dispute resolution across independent arbitrators who are economically incentivized to reach honest decisions.",
      summary: "Resolve disputes under economic accountability.",
      responsibilities: [
        "Discover published cases and voluntarily join, rather than being assigned",
        "Commit case-specific stake in order to gain access to the evidence",
        "Review receipts, payment confirmations and trade communication",
        "Vote using a commit-and-reveal scheme, then reveal before the deadline",
      ],
      stake:
        "Per case. An arbitrator commits additional stake for each case they join, and that case stays economically secured until resolution. Arbitrators whose revealed vote falls outside the final consensus may lose part of that stake. Penalties are intentionally moderate: the goal is to discourage negligence and collusion, not to punish good-faith disagreement.",
      earns:
        "Rewards funded by dispute fees, filing fees and future governance-defined incentive pools, distributed automatically after settlement.",
      requirements: [
        "A minimum OPEN stake and minimum arbitrator reputation",
        "Sufficient protocol age and no active arbitration penalties",
        "Current protocol compatibility",
      ],
    },
    "notification-gateways": {
      name: "Notification gateways",
      definition:
        "A Notification Gateway is any service that implements the OpenFiat Notification Gateway Specification.",
      summary: "Deliver optional notifications on users' behalf.",
      responsibilities: [
        "Accept notification events from the protocol and deliver them over any transport",
        "Return delivery receipts",
        "Verify user contact endpoints through one-time codes or bot challenges",
        "Register supported channels, regions and pricing in the service registry",
      ],
      stake:
        "Required before becoming eligible to receive notification traffic, for economic accountability, Sybil resistance and service quality. Persistent service failures can reduce reward eligibility or trigger governance-defined penalties.",
      earns:
        "A share of the small fixed OPEN fee a participant pays to enable notifications on a trade. The rest is split between the treasury and ecosystem allocations. Gateways are rewarded for successfully delivering, not merely for being online.",
      requirements: [
        "Implement the published notification specification",
        "Register gateway metadata: channels, protocol version, pricing, endpoints",
        "Accept that gateways receive only the minimum information needed to deliver — never balances, dispute evidence or unrelated marketplace state",
      ],
    },
    "oracle-providers": {
      name: "Oracle providers",
      definition: "Anyone may operate an Oracle Provider.",
      summary: "Publish signed exchange-rate and regional data.",
      responsibilities: [
        "Publish signed exchange rates such as USD/KES and USDC/USD",
        "Publish stablecoin metadata: decimals, issuer, supported networks, contract addresses",
        "Publish payment infrastructure data: supported rails, banking holidays, outages",
        "Publish regional metadata: supported currencies, country identifiers, locale information",
      ],
      stake:
        "Required before publishing pricing information. Providers who consistently publish incorrect or unavailable data may lose reward eligibility and face governance-defined penalties; proven oracle misconduct is a stated cause for slashing.",
      earns:
        "Named as a recipient of protocol revenue. No formula, fee or rate is published.",
      requirements: [
        "Register through the service registry with supported pairs and update frequency",
        "Sign every record — unsigned oracle updates must be rejected",
        "Accept that oracle data never forces a trade price; it is a reference only",
      ],
    },
    "snapshot-providers": {
      name: "Snapshot providers",
      definition:
        "Snapshot hosting is itself a protocol service. Any qualified participant may become a snapshot provider.",
      summary: "Publish state snapshots so new nodes can sync fast.",
      responsibilities: [
        "Generate compressed snapshots without interrupting marketplace operation",
        "Publish integrity hashes, a state root and signed metadata",
        "Maintain download availability and high bandwidth",
        "Retain multiple historical snapshots",
      ],
      stake:
        "Required, as an infrastructure commitment. Publishing corrupted snapshots is listed among malicious behaviours subject to governance-approved slashing.",
      earns:
        "Additional protocol rewards when selected by governance-approved reward formulas. The formulas are not published.",
      requirements: [
        "Advertise the capability through the service registry",
        "Publish complete snapshot metadata including snapshot height and state root",
        "Sign every snapshot; clients verify signature, compatibility and state root before importing",
      ],
    },
    "risk-intelligence-providers": {
      name: "Risk intelligence providers",
      definition: "Any qualified organization may become a provider.",
      summary: "Publish advisory wallet risk information.",
      responsibilities: [
        "Publish signed risk records naming wallet address, category, severity and confidence",
        "Cover blockchain analytics, fraud intelligence, compliance signals or community reports",
        "Support multi-provider consensus and false-positive handling",
      ],
      stake:
        "Not specified. This is the one provider role the whitepaper's staking table omits, and no staking requirement appears for it anywhere. The site does not claim one.",
      earns: "Not specified. No reward mechanism is described for this role.",
      requirements: [
        "Register through the service registry",
        "Accept that records are advisory: applications may reject deposits, warn, require confirmation or ignore the advisory entirely",
      ],
    },
    "bootstrap-nodes": {
      name: "Bootstrap nodes",
      definition:
        "Bootstrap nodes have only one responsibility: introduce newly joined nodes to the existing network. They are directories, not centralized coordinators.",
      summary: "Introduce new nodes to the network, then step aside.",
      responsibilities: [
        "Answer first-contact requests with a list of peers",
        "Nothing else — they do not approve peers, hold exclusive state, coordinate, or route protocol decisions",
      ],
      stake: "Not specified for this role.",
      earns: "Not specified for this role.",
      requirements: [
        "Registered as a bootstrap service in the service registry",
        "Governance may approve additional community-operated bootstrap nodes over time",
        "Once discovery completes, bootstrap nodes become optional",
      ],
    },
    developers: {
      name: "Developers",
      definition:
        "Anyone may build compatible software without asking permission.",
      summary: "Build clients, nodes, tools and integrations.",
      responsibilities: [
        "Build independent implementations: embedded nodes, gateway software, research implementations, custom clients",
        "Host user interfaces — web, mobile, enterprise portals, regional marketplaces",
        "Submit improvement proposals and review specifications",
        "Contribute code, documentation, security research and localization",
      ],
      stake: "None. Developers stake nothing.",
      earns:
        "Ecosystem grants from the Ecosystem Treasury, which funds grants, partnerships, education, hackathons and developer incentives.",
      requirements: [
        "Specification conformance only — the protocol is language independent",
        "An engineer should be able to build a fully compatible implementation from the specifications alone",
      ],
    },
  } satisfies Record<ActorSlug, ActorCopy>,

  repos: {
    "openfiat-specs":
      "The canonical protocol specifications and the whitepaper. Everything on this site is generated from it.",
    "openfiat-core":
      "The reference node, in Rust. Peer-to-peer networking, gossip, marketplace state, snapshots and the node APIs.",
    "openfiat-sdks":
      "Official SDKs for Rust, TypeScript and Python, plus the shared reference data they depend on.",
    "openfiat-app":
      "The default web application: trading, network view, staking, governance, disputes and history.",
    "openfiat-apps":
      "Additional applications — merchant dashboard and network explorer.",
    "openfiat-devtools":
      "Test networks, protocol conformance vectors, benchmarks and fuzzing.",
    "openfiat-infra":
      "Container images, Helm charts, Terraform modules and the monitoring stack.",
    "openfiat-docs": "The developer documentation site.",
    "openfiat-org": "This website.",
    "awesome-openfiat":
      "A community-curated list of OpenFiat projects, tools and resources.",
  },

  runNode: {
    minimumSpecs: [
      "4 CPU cores",
      "16 GB RAM",
      "250 GB NVMe SSD",
      "Stable broadband connection",
    ],
    recommendedSpecs: [
      "8–16 CPU cores",
      "32 GB RAM or more",
      "1 TB NVMe SSD",
      "High-bandwidth, low-latency network",
      "UPS power protection",
      "Redundant internet connectivity",
    ],
    /** One line on what is compiled into the node, not things to install. */
    internals:
      "The node is a single Rust binary. libp2p (QUIC, Noise, Yamux) and RocksDB are compiled in — there is nothing to install separately.",

    install: [
      {
        id: "docker",
        title: "Docker",
        note: "An official image is published for each release. This is the recommended path: the image carries the binary and its runtime, so the only host requirements are Docker and a data volume.",
      },
      {
        id: "binary",
        title: "Prebuilt binary",
        note: "Static builds for x86-64 and arm64 Linux, published with detached signatures. Verify the signature, drop the binary in /usr/local/bin, and run it under systemd.",
      },
      {
        id: "source",
        title: "Build from source",
        note: "Needs the Rust toolchain and a C toolchain for RocksDB. Use this to run an unreleased commit, to build for an unsupported platform, or to audit what you run.",
      },
    ],

    ports: {
      p2pQuic:
        "Peer-to-peer traffic. QUIC is the primary transport, so this UDP port must be reachable.",
      p2pTcp: "TCP fallback for peers that cannot use QUIC.",
      api: "The API clients and interfaces connect to. Open it only if you serve applications.",
      metrics:
        "Prometheus metrics. Keep this on loopback or a private network.",
    },

    troubleshooting: {
      noPeers: {
        symptom: "No peers connect",
        cause:
          "UDP 7400 is blocked, or the announced address does not match how peers can actually reach the host.",
      },
      stuckSync: {
        symptom: "Synchronization never completes",
        cause:
          "The snapshot import did not finish. A node does not join the network until import succeeds.",
      },
      snapshotMismatch: {
        symptom: "Snapshot rejected",
        cause:
          "A state-root or signature mismatch invalidates the snapshot. Fetch a fresh one, ideally from a different provider.",
      },
      highDisk: {
        symptom: "Disk usage keeps growing",
        cause:
          "RocksDB has not compacted, or old snapshots were retained after import.",
      },
      clockSkew: {
        symptom: "Signatures or expiries rejected",
        cause:
          "Clock drift. Records carry timestamps and expiry, so the host clock has to be correct.",
      },
    },

    /**
     * The runbook. Each step says in plain language what it does and why,
     * because "replay recent gossip" means nothing on its own.
     */
    walkthrough: [
      {
        id: "prepare",
        title: "Prepare the machine",
        body: "A current Debian or Ubuntu server, a firewall, and an accurate clock. The clock matters more than it looks: records carry timestamps and expiry times, and a drifting clock makes a node reject valid data.",
      },
      {
        id: "install",
        title: "Install the node",
        body: "Pick one of the three options above. The Docker image is the shortest path and is what most operators should use.",
      },
      {
        id: "identity",
        title: "Create the node's identity",
        body: "The node signs everything it publishes with its own key, and its peer id is derived from that key. Keep the file — if you lose it the node rejoins as a stranger and starts building reputation again from zero.",
      },
      {
        id: "configure",
        title: "Write the configuration",
        body: "One file sets where data lives, which addresses to listen on, which address to advertise to peers, and where to find the bootstrap hosts. Behind NAT the advertised address is the one that matters.",
      },
      {
        id: "firewall",
        title: "Open the right ports",
        body: "Peers reach the node over UDP because QUIC is the primary transport — that is the port people most often forget. Metrics stay private.",
      },
      {
        id: "service",
        title: "Run it as a service",
        body: "Under systemd the node restarts after a crash or reboot, and gets a long enough shutdown grace period that the database flushes cleanly instead of being killed mid-write.",
      },
      {
        id: "sync",
        title: "Let it catch up",
        body: "Rather than replaying all history, a new node downloads a signed snapshot of current marketplace state and verifies it — signature, protocol version, compression and state root all have to match. Then it replays the events since. Until that finishes the node does not serve the network.",
      },
      {
        id: "verify",
        title: "Check that it is healthy",
        body: "One request tells you whether it is synchronized, how many peers it has, and how fresh its snapshot is. Peers climbing and a small snapshot age mean it is working.",
      },
      {
        id: "register",
        title: "Announce it to the network",
        body: "Registration gossips your endpoint and capabilities to other nodes, and nobody approves it. Staking is the separate step that makes the node an active participant, and it sets reward eligibility and traffic priority.",
      },
      {
        id: "monitor",
        title: "Watch it",
        body: "The metrics that actually predict trouble are connected peers, snapshot age, and synchronization state. Alert on those three and you will know before your users do.",
      },
      {
        id: "upgrade",
        title: "Keep it current",
        body: "Verify the release signature, stop, replace, start. Nodes upgrade one at a time, so the network never needs a coordinated outage, and missed events replay on startup.",
      },
      {
        id: "backup",
        title: "Back up what cannot be regenerated",
        body: "Marketplace state can always be re-synced from a snapshot. The node key and wallet cannot. Balances and escrow live on Solana, not on your disk.",
      },
    ],

    monitoring: [
      {
        group: "Infrastructure",
        items: ["CPU", "Memory", "Disk", "Network throughput"],
      },
      {
        group: "Protocol",
        items: [
          "Connected peers",
          "Gossip propagation rate",
          "Active advertisements",
          "Active trade sessions",
          "Snapshot age",
          "Synchronization state",
        ],
      },
      {
        group: "Service",
        items: [
          "API request volume",
          "Notification processing",
          "Risk intelligence updates",
          "Oracle updates",
        ],
      },
    ],

    apis: [
      {
        group: "Marketplace",
        items: [
          "Search advertisements",
          "Create advertisements",
          "Update advertisements",
          "Remove advertisements",
        ],
      },
      {
        group: "Trading",
        items: [
          "Reserve advertisements",
          "Synchronize trade sessions",
          "Submit payment confirmations",
        ],
      },
      {
        group: "Infrastructure",
        items: [
          "Peer discovery",
          "Gateway discovery",
          "Snapshot information",
          "Risk intelligence",
        ],
      },
      {
        group: "Governance",
        items: [
          "Proposal discovery",
          "Vote submission",
          "Treasury information",
        ],
      },
    ],

    interfaces: [
      "Official web interface",
      "Community interfaces",
      "Merchant interfaces",
      "Regional marketplaces",
      "Enterprise portals",
    ],
  },

  sale: {
    allocationLabels: {
      presale: "Community presale",
      allenhark: "AllenHark treasury",
      ecosystem: "Ecosystem treasury",
      infrastructure: "Infrastructure bootstrap",
      incentives: "Community incentives",
      liquidity: "Liquidity programs",
      reserve: "Strategic reserve",
    },
    allocationVesting: {
      presale: "Partial unlock at genesis, remainder vested",
      allenhark: "Cliff, then long linear vesting",
      ecosystem: "Released against grants and partnerships",
      infrastructure: "Released as node operators come online",
      incentives: "Released against protocol participation",
      liquidity: "Unlocked at genesis to seed markets",
      reserve: "Held; release requires governance",
    },
    useOfFunds: [
      "Core protocol engineering",
      "Independent security audits",
      "Infrastructure deployment",
      "Documentation",
      "Community growth",
      "Developer tooling",
      "Education and marketing",
      "Legal and operational launch expenses",
    ],
    vesting: [
      "Founders",
      "Team members",
      "Advisors",
      "Strategic partners",
      "Certain presale allocations, where applicable",
    ],
    protections: [
      "Allocations publicly documented",
      "Vesting schedules transparent",
      "Treasury wallets publicly known",
      "Release schedules predictable",
      "Governance cannot secretly mint new supply",
    ],
  },

  /**
   * There is no glossary anywhere in the corpus, and the vocabulary is dense
   * with acronyms, so this fills a real gap rather than restating content.
   */
  glossary: [
    {
      term: "OPEN",
      expansion: null,
      definition:
        "The protocol's utility and governance token. It is not the asset being traded — settlements use stablecoins such as USDC. OPEN is staked as economic accountability and carries governance rights. Minted once at genesis with a fixed maximum supply.",
      specs: [],
    },
    {
      term: "OFS",
      expansion: "OpenFiat Protocol Suite",
      definition:
        "The numbered specification series. The number encodes the layer: 1000s networking, 2000s marketplace, 3000s reputation, 4000s governance, 5000s identity, 6000s notifications, 7000s oracle and risk.",
      specs: ["OFS-0000"],
    },
    {
      term: "OFNP",
      expansion: "OpenFiat Network Protocol",
      definition:
        "The peer-to-peer transport layer every compliant node implements, built on libp2p with QUIC, Noise and Yamux.",
      specs: ["OFS-1000"],
    },
    {
      term: "OFTP",
      expansion: "OpenFiat Trade Protocol",
      definition:
        "The trade lifecycle: reservation, escrow funding, fiat payment, confirmation, settlement. A trade may never skip a mandatory state.",
      specs: ["OFS-2000"],
    },
    {
      term: "OFIP",
      expansion: "OpenFiat Improvement Proposal",
      definition:
        "The governance vehicle for changing the protocol — the equivalent of an RFC or EIP.",
      specs: ["OFS-4000"],
    },
    {
      term: "SWQoS",
      expansion: "Stake-Weighted Quality of Service",
      definition:
        "How nodes are prioritized. Effective priority combines reputation, stake and measured network performance; staking more cannot compensate for poor performance.",
      specs: ["OFS-1600"],
    },
    {
      term: "Advertisement",
      expansion: null,
      definition:
        "A publicly signed statement expressing a merchant's willingness to trade, with asset, direction, currency, limits, pricing model and payment methods.",
      specs: ["OFS-2100"],
    },
    {
      term: "Reservation",
      expansion: null,
      definition:
        "The step that claims a portion of an advertisement for a specific buyer, before escrow is funded.",
      specs: ["OFS-2200"],
    },
    {
      term: "Escrow",
      expansion: null,
      definition:
        "On-chain custody of the stablecoins for the duration of a trade. Stablecoins enter escrow before fiat payment begins, so a buyer never sends fiat without funds already secured.",
      specs: ["OFS-2300"],
    },
    {
      term: "Liquidity vault",
      expansion: null,
      definition:
        "The on-chain architecture holding trade funds. Trade settlement is secured here rather than by merchant stake.",
      specs: [],
    },
    {
      term: "Gossip",
      expansion: null,
      definition:
        "How state-changing events propagate across the network, so no node depends on a central feed.",
      specs: ["OFS-1200"],
    },
    {
      term: "Snapshot",
      expansion: null,
      definition:
        "A signed, compressed copy of marketplace state with a state root, letting a new node synchronize quickly instead of replaying all history.",
      specs: ["OFS-1300"],
    },
    {
      term: "Bootstrap node",
      expansion: null,
      definition:
        "A directory that introduces a newly started node to peers, then becomes optional. It approves nothing and coordinates nothing.",
      specs: ["OFS-1100"],
    },
    {
      term: "Service registry",
      expansion: null,
      definition:
        "The directory where providers publish what they offer and where. It is a directory, not a marketplace: it makes no recommendations, and clients choose for themselves.",
      specs: ["OFS-1500"],
    },
    {
      term: "Identity claim",
      expansion: null,
      definition:
        "A voluntary, signed proof that a wallet controls a communication channel such as an email or Telegram account. It establishes control, never legal identity, nationality or regulatory status.",
      specs: ["OFS-5000"],
    },
    {
      term: "Commit-reveal",
      expansion: null,
      definition:
        "The two-phase arbitrator vote: publish a commitment first, reveal the vote and secret later, so no arbitrator can see others' votes before casting their own.",
      specs: ["OFS-2400"],
    },
    {
      term: "Slashing",
      expansion: null,
      definition:
        "Loss of part of a stake for protocol violations. Rules are deterministic and publicly documented; ordinary outages affect reputation and reward eligibility rather than triggering slashing.",
      specs: [],
    },
    {
      term: "Progressive decentralization",
      expansion: null,
      definition:
        "The most-repeated commitment in the whitepaper: AllenHark leads initial development, and responsibility for infrastructure and governance is designed to transfer to the community.",
      specs: [],
    },
    {
      term: "AllenHark",
      expansion: null,
      definition:
        "The company leading initial development. It operates bootstrap infrastructure during launch and competes with every other provider under identical protocol rules. It is designed to become unnecessary.",
      specs: [],
    },
  ],
};

/**
 * Deliberately not `as const`, for the same reason as the UI dictionary: a
 * translation must be able to supply different text while still being checked
 * for completeness against this shape.
 */
export type ContentDictionary = typeof enContent;
