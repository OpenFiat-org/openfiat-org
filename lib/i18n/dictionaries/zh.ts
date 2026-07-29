import type { Dictionary } from "./en";

/**
 * Simplified Chinese.
 *
 * Typed as Dictionary, so this file cannot compile unless it supplies every
 * key English defines — a missing translation is a build failure, not a
 * silent fallback to English at runtime.
 *
 * Protocol identifiers (OPEN, OFS-2300, OFNP, USDC, Solana, libp2p, RocksDB)
 * are left untranslated because they are names, not words.
 */
export const zh: Dictionary = {
  meta: {
    tagline: "去中心化的点对点法币交易",
    description:
      "OpenFiat 是一个开放协议，用于在没有中心化交易运营方的情况下，点对点地将稳定币兑换为当地法币。资产结算在 Solana 上完成，市场协调由开放网络承担。",
  },

  nav: {
    howItWorks: "使用方式",
    trust: "信任与安全",
    whitepaper: "白皮书",
    specs: "规范",
    actors: "参与方式",
    guides: "操作指南",
    fees: "费用",
    sale: "代币销售",
    runNode: "运行节点",
    launchApp: "打开应用",
    preview: "预览版",
    openMenu: "打开菜单",
    closeMenu: "关闭菜单",
    primaryLabel: "主导航",
    skipToContent: "跳到主要内容",
    language: "语言",
  },

  footer: {
    blurb:
      "一个用于点对点兑换稳定币与当地法币的开放协议。资产结算在 Solana 上完成，市场协调由开放网络承担。",
    columns: {
      protocol: "协议",
      participate: "参与",
      project: "项目",
      resources: "资源",
    },
    links: {
      overview: "协议",
      howItWorks: "使用方式",
      trust: "信任与安全",
      whitepaper: "白皮书",
      specifications: "协议规范",
      glossary: "术语表",
      roadmap: "路线图",
      sale: "代币销售",
      actors: "全部角色",
      merchants: "商户",
      nodeOperators: "节点运营者",
      guides: "操作指南",
      fees: "费用",
      runNode: "运行节点",
      becomeArbitrator: "成为仲裁者",
      developers: "开发者",
      downloads: "下载",
      foundation: "基金会",
      community: "社区",
      blog: "博客",
      press: "媒体",
      careers: "招聘",
      documentation: "文档",
      status: "服务状态",
      github: "GitHub",
      contact: "联系我们",
      privacy: "隐私政策",
      terms: "使用条款",
    },
    siteLicense: "本网站以 Apache-2.0 协议开源。",
    notice:
      "OpenFiat 是一个开放协议，而非金融服务。本网站的任何内容均不构成证券销售要约或投资建议。OPEN 代币的总量、分配与销售条款尚未确定，仍需经过社区评议与经济模型测算。",
  },

  home: {
    headlineLead: "一个",
    headlineAccent: "任何国家或公司都无法关停",
    headlineTail: "的市场。",
    lede: "OpenFiat 是一个开放的协议，用于以点对点方式将稳定币兑换为当地货币。托管结算在 Solana 上完成；发现、信誉与通信运行在任何人都可以加入的网络之上。没有任何政府能审查它，也没有任何公司能封禁你——因为没有可以被施压的运营方，只有参与者。",
    ctaJoinSale: "加入社区预售",
    ctaHowItWorks: "看交易如何进行",
    readWhitepaper: "阅读白皮书",
    tokenSale: "代币销售",

    telemetry: {
      layers: "层架构",
      stakedRoles: "个质押角色",
      specifications: "份协议规范",
      repositories: "个代码仓库",
      centralOperators: "中心化运营方",
    },

    problem: {
      title: "今天每一个 P2P 交易所都有着相同的架构。",
      subtitle:
        "加密货币是去中心化的，市场却不是。几乎每一个点对点交易所的背后：",
      company: "一家公司",
      actions: [
        "拥有服务器",
        "控制数据库",
        "决定哪些广告得以展示",
        "裁决争议",
        "保存信誉评分",
        "可以暂停或封禁用户",
        "决定支持哪些国家与支付方式",
        "可能被关停、攻击或施压",
      ],
      verdict:
        "一旦运营方出问题——无论是技术上、资金上还是法律上——市场就会随之消失，尽管底层的区块链从未停止运转。OpenFiat 要消除的正是这种依赖。",
    },

    layers: {
      title: "两层架构，各司其职。",
      subtitle:
        "这一架构在保持去中心化所有权与透明度的同时，把链上成本降到最低。",
      coordination: {
        label: "协调层 · OpenFiat 网络",
        title: "人与人之间的高速通信",
        body: "运行在任何人都可以加入的开放点对点网络上——中间没有公司，也没有可被查封的服务器。",
        items: [
          "广告发现",
          "交易协调",
          "信誉",
          "加密通信",
          "通知与搜索",
          "市场索引",
        ],
      },
      settlement: {
        label: "结算层 · Solana",
        title: "区块链最擅长的事",
        body: "资产由经过审计的智能合约锁定与释放——而不是靠运营方的善意。",
        items: [
          "安全的资产托管",
          "履约托管管理",
          "质押",
          "国库管理",
          "治理执行",
        ],
      },
    },

    flow: {
      title: "一笔交易，四个动作",
      subtitle:
        "从第二个动作开始资金就受到保护——中间没有人能拿走这笔钱，任何一方也无需信任对方的善意。",
      stages: ["网络", "链上", "法币渠道", "链上"],
      pathsNote: "然后继续深入：交易者、运营者与开发者指南路径",
    },

    read: {
      title: "阅读协议",
      subtitle:
        "每一章都以网页形式发布——无需下载，也没有任何表单门槛。它不要求任何区块链基础，从「钱是什么」讲起。编号规范则并列提供给实现者。",
      startHere: "从这里开始",
      moreChapters: (n: number) => `还有 ${n} 章`,
      specsCta: (n: number) => `${n} 份协议规范`,
    },

    contribute: {
      title: "与我们一起构建",
      subtitle:
        "每一层都以 Apache-2.0 开源，规范仓库也接受文档与翻译贡献——贡献不一定意味着写代码。",
    },

    saleBand: {
      body: "OPEN 是维系市场诚信的每一种角色——商户、仲裁者、节点、预言机——背后的质押品。预售在任何公开销售之前，以固定价格提供社区分配额度。目前尚未部署任何销售合约；今天连接钱包只能用于检查准备状态。",
      presaleRate: "预售价格",
      publicRate: "后续公开销售",
      publicRateValue: "1 OPEN = 1.25 USDC",
      supply: "供应量",
      supplyValue: "1,000,000,000 · 铸造权限已移除",
      status: "状态",
      termsCta: "销售条款与分配",
    },

    safety: {
      more: "信任机制如何运作",
    },

    roles: {
      seeAll: "查看所有角色",
    },

    finalCta: {
      title: "你的钱，你的货币，没有中间人。",
      body: "先用五分钟了解全貌，或者读完整份文档。",
      start: "看交易如何进行",
    },
  },

  whitepaper: {
    title: "OpenFiat 协议全文",
    intro:
      "每一章都以网页形式发布——无需下载，也不需要填写任何表单。全文不预设区块链知识，从「什么是货币」讲起。",
    chapters: (n: number) => `${n} 章`,
    words: (n: string) => `约 ${n} 词`,
    readTime: (h: number, m: number) => `约需 ${h} 小时 ${m} 分`,
    startReading: "开始阅读",
    downloadPdfs: "下载 PDF",
    frontMatter: "前言部分",
    chapter: (n: number) => `第 ${n} 章`,
    expandsChapter: (n: number) => `延伸自第 ${n} 章`,
    englishOnlyTitle: "本文以英文发布",
    englishOnlyBody:
      "白皮书与协议规范尚未翻译。第 25 章将翻译列为社区贡献方向之一；本页导航已本地化，但文档正文仍为英文原文。",
  },

  specsPage: {
    title: "OpenFiat 协议套件",
    intro: (count: number) =>
      `${count} 份编号规范。编号即层级：1000 段是网络层，2000 段是市场层，依此类推直到预言机与风险情报。`,
    published: (n: number) => `已发布 ${n} 份`,
    layers: (n: number) => `${n} 个层级`,
    draft: "1.0.0 版本 · 草案",
    reservedTitle: "预留编号段",
    notWritten: "尚未撰写",
    reservedNote:
      "预留编号段中的规范已被现有文档引用，但尚未起草。文中对它们的引用以纯文本显示，不会生成链接。",
  },

  reader: {
    onThisPage: "本页目录",
    minRead: (n: number) => `阅读约 ${n} 分钟`,
    wordCount: (n: string) => `${n} 词`,
    sections: (n: number) => `${n} 节`,
    relatedChapter: "相关章节",
    revisitsGround: "本章重新讨论了以下章节涵盖的内容：",
    canonicalTreatment: "，该章为权威版本。",
    coversOverlapping: "从另一个角度讨论了重叠的内容。",
    dependsOn: "依赖于",
    dependedOnBy: "被以下规范依赖",
    navLabel: "文档导航",
    specifications: "协议规范",
    whitepaper: "白皮书",
    layer: (name: string) => `${name}层`,
  },

  actors: {
    title: "买方、商户、仲裁者、节点运营者",
    intro:
      "十种角色支撑着 OpenFiat 的运行——有些只要参与交易即可担任，有些则需要运行基础设施。担任其中任何一种都无需任何人批准。",
    whatTheyDo: "职责",
    whatTheyStake: "质押",
    howTheyEarn: "收益来源",
    requirements: "参与条件",
    repositories: "代码仓库",
    governedBy: "适用规范",
    noStake: "无需质押",
    noStakeStated: "白皮书未作规定",
    notStated: "白皮书未作规定",
    readMore: "了解更多",
    otherRoles: "其他角色",
    permissionless: "无需许可",
    stakeNote:
      "质押体现的是对生态的经济承诺，而不是一笔付费。除触发协议规定的处罚外，参与者始终保有其质押资产的所有权。",
  },

  howItWorks: {
    title: "一笔交易如何完成",
    lede: "共四步。在你付出任何款项之前，对方的加密资产已被锁定，并且会一直锁定到双方都确认款项到账为止。",
    flowTitle: "四个步骤",
    needTitle: "你需要准备什么",
    need: [
      "一个由你自己掌控的钱包——无需账号、无需注册、无需 KYC",
      "用于出售的稳定币，或用于买入的当地货币",
      "一种你本来就在使用的支付方式",
    ],
    railsTitle: "收付方式",
    railsLede:
      "法币一侧仍走你惯用的通道。OpenFiat 统一的是支付方式如何被描述与确认，而不是它如何运作。",
    safetyTitle: "如果出现问题",
    safetyLede:
      "任何一方都可以发起争议，由独立仲裁者裁决，而他们自己的质押也承担着风险。",
    safetyMore: "信任机制如何运作",
  },

  trust: {
    title: "无需信任任何人的信任机制",
    lede: "一个陌生人即将用区块链看不见的货币向你付款。有四套机制保障这一过程的安全，而其中没有任何一套依赖某家公司承诺公平。",
    flowTitle: "单笔交易如何得到保护",
    pillarsTitle: "信任由什么构成",
    disputeTitle: "交易出现问题时",
    disputeLede:
      "任何一方都可以发起争议。争议由独立仲裁者裁决，他们以自己的 OPEN 质押为判断结果背书，并且在完成质押之前无法查看证据。",
    noAppeal:
      "1.0 版本没有申诉流程。承诺—揭示投票、需质押的仲裁者以及温和的处罚构成了保障机制，而不是再来一次听证。",
    readChapter: "阅读争议解决协议",
    readReputation: "阅读信誉引擎",
  },

  protocolPage: {
    title: "OpenFiat 不是区块链",
    lede: "它是构建在区块链之上的协调层。Solana 负责保管资金并执行履约托管；OpenFiat 则承载市场所需、却本不该放在链上的一切——挂单、信誉、通讯与发现。",
    layersTitle: "两层架构，各司其职",
    layersLede:
      "这一划分就是整个设计的核心：只对确有收益的部分做去中心化，其余则留在更适合它的位置。",
    settlement: "结算层",
    coordination: "协调层",
    principlesTitle: "背后的设计推理",
    principlesLede:
      "第 3 章提出了整个协议所依据的十二条原则，其中这六条最为关键。",
    suiteTitle: "编号化的规范套件",
    suiteLede: (count: number) =>
      `${count} 份正式规范，按层级分组。编号本身就说明了文档属于哪一层。`,
    browseSpecs: "浏览协议规范",
    readAll: "阅读全部十二条原则",
  },

  runNode: {
    title: "运行 OpenFiat 节点",
    intro:
      "节点运营者维护位于区块链之上的去中心化市场。Solana 验证者负责保障链的安全并执行 OpenFiat 程序；节点则承载挂单、信誉、通讯与发现。",
    neverCustody:
      "节点从不托管用户资金。所有资金操作始终由 Solana 智能合约控制。",
    requirementsTitle: "硬件要求",
    installTitle: "安装方式",
    releasesLink: "GitHub Releases 页面",
    referenceNote:
      "以下命令基于参考部署方案：服务名为 openfiat-node，配置位于 /etc/openfiat，数据位于 /var/lib/openfiat。",
    portsTitle: "端口",
    portPublic: "必须可达",
    portPrivate: "保持内部可见",
    troubleshootingTitle: "出现问题时",
    copy: "复制",
    copied: "已复制",
    minimum: "最低配置",
    recommended: "生产环境推荐配置",
    lifecycleTitle: "让节点上线",
    lifecycleNote: "请按顺序完成以下步骤，每一步都附有所需的命令。",
    monitoringTitle: "节点应当暴露的信息",
    stakingBody:
      "节点需质押 OPEN 才能成为活跃参与者。但质押买不到信誉：表现不佳的运营者无法靠多质押来弥补。有效优先级由信誉、质押与实测网络表现共同决定。",
    hostUiTitle: "自行托管用户界面",
    hostUiIntro:
      "OpenFiat 将协议与界面分离。任何人都可以托管网页界面、移动网关、企业门户或区域市场，而它们访问的都是同一个市场。",
    hostUiQuote: "无论使用哪个界面，每位参与者面对的都是同一个去中心化市场。",
    hostUiConnect: "界面连接的对象",
    hostUiConnectBody:
      "界面并不直接与链通讯。它连接到一个或多个邻近的 OpenFiat 节点，并在某个节点不可用时自动切换到另一个。",
    apiTitle: "节点 API 范围",
    apiNote:
      "所有合规节点暴露的 API 完全一致，因此针对某个节点开发的界面同样适用于其他节点。",

    hostingTitle: "在哪里运行节点",
    hostingIntro:
      "AllenHark 主导协议的早期开发，同时提供运行节点所需的两样东西：服务器与 Solana RPC 接入。作为 OpenFiat 计划的一部分，节点运营者可享两者 {pct}% 的折扣。",
    hostingVps: "服务器托管",
    hostingVpsBody:
      "NVMe 存储、10 Gbps 上行，位于法兰克福、阿姆斯特丹与芝加哥。请按上方硬件要求选型——存储是全节点增长最快的部分，说明你要运行的内容即可获得配置建议。",
    hostingRpc: "Solana RPC 与 gRPC",
    hostingRpcBody:
      "提供质押连接，你的节点提交的交易不必与其他人排在同一队列中。接入通过 IP 白名单授权，而非 API 密钥。如需流式获取账户与区块槽更新，也提供 Yellowstone gRPC。",
    hostingViewPricing: "查看价格",
    hostingClaimTitle: "如何获得折扣",
    hostingClaimBody:
      "无需输入优惠码。在 Discord 或 allenhark.com 的在线聊天中说明你正在运行 OpenFiat 节点，折扣即会应用到你的订单。",
    hostingDiscord: "在 Discord 询问",
    hostingChat: "开始在线聊天",
  },

  fees: {
    title: "费用",
    intro:
      "协议收取的每一项费用，以及它支付出去的每一笔款项。以下大部分内容都已确定并写入文档，但尚未实际收取或发放，每一行都会标明其真实状态——一个让人误以为全部已经生效的费用页面，会是最具误导性的错误。",
    accuracyNote: "仅限 devnet。每一项费用都是治理参数，而非固定常量。",
    payTitle: "你需要支付什么",
    payIntro:
      "共三项费用，且并非由同一方承担。买方只在交易完成时付费，提出争议则无需付费；商户承担的是发布挂单与接受仲裁这两项持续性成本。",
    receiveTitle: "各角色能获得什么",
    receiveIntro:
      "「使用是否付费」与「谁来补偿提供方」是两个不同的问题。一项服务完全可以对使用者免费，同时由协议出资供养——预言机汇率正是如此。",
    permissionedTitle: "唯一需要许可的角色",
    permissionedBody:
      "风险情报是唯一需要先获得治理批准才能开展服务的角色。AllenHark 为默认提供方。",
    defaultProviderLabel: "默认服务公钥",
    governanceTitle: "每一项费用都是参数",
    governanceBody:
      "此处没有任何金额是固定常量。每一项都可由治理调整，因为以代币计价的费用必须随该代币价格变化而变化。页面所示为当前默认值，其中标注为提案的部分尚未获得最终确认。",
    columnPayer: "支付方",
    columnAmount: "金额",
    columnConsumer: "使用者支付",
    columnReceives: "提供方所得",
    status: {
      live: "目前已收取",
      specified: "已定义，尚未生效",
      none: "按决定不予支付",
    },
  },

  guides: {
    title: "操作指南",
    intro:
      "分步骤说明，并附有真实可用的命令。每篇指南都以软件当前的实际状态撰写，因此凡是尚未实现的部分，指南都会直接说明，而不是描述它将来的样子。",
    accuracyNote:
      "仅限 devnet。本页中的程序 ID 与端点均为 devnet 上的产物；目前不存在主网部署。",
    allGuides: "全部指南",
    requirementsTitle: "开始之前",
    stepsTitle: "操作步骤",
    relatedTitle: "相关内容",
    copy: "复制",
    copied: "已复制",
    standalonePage: "独立页面",
    azTitle: "全部指南",
    progressNote: "进度仅保存在此浏览器中——无需账户，也不会上传到任何地方。",
    completedLabel: "已完成",
    milestonesMeta: (count: number) => `${count} 个里程碑`,
    stepsMeta: (count: number) => `${count} 个步骤`,
    milestoneOf: (position: number, total: number) =>
      `里程碑 ${position} / ${total}`,
    markStepDone: "标记本步为已完成",
    stepDoneLabel: "已完成",
    prevOnPath: "路径上的上一篇",
    nextOnPath: "路径上的下一篇",
    groups: {
      trade: {
        title: "交易",
        blurb: "买入与卖出，以及为他人提供可供交易的流动性。",
      },
      operate: {
        title: "运行基础设施",
        blurb:
          "维持网络运转的各类角色。协议收入本应为此付费，但目前尚未有任何款项发放。",
      },
      build: {
        title: "在 OpenFiat 之上构建",
        blurb: "面向协议本身开发软件，而不是使用他人编写的应用。",
      },
    },
    standalone: {
      runNode: {
        title: "运行节点",
        summary:
          "从硬件准备到监控告警，完整安装、配置并运维一个 OpenFiat 节点。",
      },
      becomeArbitrator: {
        title: "成为仲裁者",
        summary:
          "质押 OPEN、接手争议案件，并投出决定结果的「先承诺后揭示」投票。",
      },
    },
  },

  becomeArbitrator: {
    title: "成为 OpenFiat 仲裁者",
    intro:
      "仲裁者用自己质押的 OPEN 承担风险来裁决争议，而不是靠信誉。本指南将带你完成质押、寻找案件，以及投出真正决定结果的「先承诺后揭示」投票。",
    neverCustody:
      "仲裁者从不托管交易资金。裁决只会调动履约托管程序在争议发生前就已经锁定的资金。",
    requirementsTitle: "你需要准备什么",
    bondCta: "在 openfiat-app 质押 {amount} OPEN",
    lifecycleTitle: "处理一个案件",
    lifecycleNote:
      "按顺序处理单个案件的这些步骤。每一步都附有所需的命令或代码。",
    copy: "复制",
    copied: "已复制",
  },

  sale: {
    title: "OPEN 社区预售",
    notLiveTitle: "销售尚未开放",
    notLiveBody:
      "销售合约尚未部署，条款也尚未确定。你可以连接钱包检查准备情况，但目前没有可购买的内容。",
    connectWallet: "连接钱包",
    disconnect: "断开连接",
    connected: "已连接",
    verifyWallet: "验证钱包",
    verifying: "等待签名……",
    verified: "已验证",
    verifyNote:
      "签署一条消息（无需交易、无手续费）以确认你拥有该钱包，然后再购买。",
    verifyUnsupported:
      "该钱包不支持消息签名——你仍然可以购买；交易本身的签名即可证明钱包所有权。",
    balance: "余额",
    max: "最大",
    limitNote:
      "每个钱包 {min}–{max} USDC。「最大」将填入余额与该上限中较小的一方。",
    raisedLabel: "已募集",
    goalLabel: "目标",
    offeredLabel: "发售数量",
    goalNote:
      "该目标是募集目标，而非上限。预售发售的是全部社区预售份额，因此在需求持续的情况下，募集额可以超过目标继续销售。",
    publicSaleNote:
      "预售结束时，社区预售份额中尚未售出的部分，将在其后的公开发售中以 1 OPEN = 1.25 USDC 的价格发售。",
    purchase: "购买 OPEN",
    purchaseDisabled: "销售开放后即可购买",
    amount: "你支付",
    youReceive: "你将获得",
    rateNote: "1 OPEN = 1 USDC",
    estimated: "预估",
    reviewing: "正在模拟交易……",
    submitting: "等待钱包签名……",
    confirming: "正在确认……",
    done: "购买已确认",
    txFailed: "交易未发送",
    txSuccess: "已确认",
    claim: "领取 OPEN",
    swapNotice:
      "将在确认价格下原子化兑换为 USDC，再计入你的 OPEN 份额。若未达到最低目标而退款，退款将以 USDC 支付，而非原始资产。",
    whatIsOpen: "OPEN 是什么",
    whatIsOpenBody:
      "OPEN 是协议的实用与治理代币。它不是被交易的标的——市场结算使用 USDC 等稳定币完成。商户、仲裁者、节点运营者与服务提供方以质押 OPEN 作为经济担保，同时 OPEN 附带治理权。",
    supplyTitle: "固定总量",
    supplyBody:
      "OPEN 在创世时一次性铸造，总量上限固定，所有初始分配均可在链上公开验证。",
    allocationTitle: "分配类别",
    allocationNote: "具体分配比例载于《OPEN 代币经济文件》。",
    useOfFundsTitle: "预售资金用途",
    vestingTitle: "解锁安排与保障",
    whatVests: "哪些份额设有解锁期",
    vestingNote:
      "长期份额按公布的时间表逐步解锁，而非一次性释放，每一次释放都可在链上查验。",
    protectionsTitle: "投资者保障",
    riskTitle: "风险提示",
    riskBody:
      "本页任何内容均不构成证券销售要约或投资建议。条款可能变更。参与代币销售可能导致全部本金损失。",
    rewardsTitle: "你的 OPEN 奖励",
    rewardsSubtitle: "连接你用于参与预售的钱包。",
    rewardsConnectPrompt: "连接钱包以查看你在预售中获得的份额。",
    rewardsContributed: "已认购",
    rewardsEntitlement: "OPEN 奖励",
    rewardsNoContribution: "未在该钱包下找到任何认购记录。",
    rewardsNoContributionCta: "参与预售",
    rewardsPendingNote: "销售结束后统计——请在结束后回来查看。",
    rewardsClaimedNote: "已领取至该钱包。",
    rewardsRefundableNote: "未达到最低目标——该笔认购可在销售页面以 USDC 退款。",
    rewardsGoToSale: "前往销售页面",
  },

  pages: {
    roadmap: {
      eyebrow: "路线图",
      title: "路线图",
      intro:
        "规范 1.0 版本只是起点，而非终点。第 26 章列出了各个阶段；下列每一项都是里程碑，而非已交付的功能。",
    },
    downloads: {
      eyebrow: "下载",
      title: "下载",
      intro:
        "白皮书各章节的 PDF 版本。OFS 协议规范没有 PDF——请在本站或规范仓库中阅读。",
    },
    documentation: {
      eyebrow: "文档",
      title: "文档",
      intro:
        "开发者文档位于 docs.openfiat.network。规范本身是权威参考，并已在本站全文发布。",
    },
    foundation: {
      eyebrow: "治理",
      title: "基金会",
      intro:
        "白皮书同时提到 AllenHark 与 OpenFiat 基金会，但未说明两者关系。待此事明确后，本页将描述相应的治理结构。",
    },
    community: {
      eyebrow: "社区",
      title: "社区",
      intro:
        "第 25 章列出的贡献方向：软件开发、文档、安全研究、缺陷报告、基础设施服务、教育材料、本地化与开发者工具。",
    },
    blog: {
      eyebrow: "博客",
      title: "博客",
      intro: "协议更新与工程笔记将发布于此。",
    },
    press: {
      eyebrow: "媒体",
      title: "媒体",
      intro:
        "品牌素材与媒体咨询。关于协议的任何事实性内容，请以白皮书与规范为准。",
    },
    careers: {
      eyebrow: "招聘",
      title: "招聘",
      intro: "开放职位将在此列出。",
    },
    status: {
      eyebrow: "服务状态",
      title: "服务状态",
      intro: "网络与服务状态。目前尚无公开网络运行，因此没有可报告的内容。",
    },
    contact: {
      eyebrow: "联系",
      title: "联系我们",
      intro:
        "如有协议相关问题，请在规范仓库中发起讨论，以便答复公开且可被检索。",
    },
    privacy: {
      eyebrow: "法律",
      title: "隐私政策",
      intro: "本页在上线前需经法律顾问审核，目前尚非最终版本。",
    },
    terms: {
      eyebrow: "法律",
      title: "使用条款",
      intro: "本页在上线前需经法律顾问审核，目前尚非最终版本。",
    },
  },

  tokenomics: {
    supplyLabel: "总量上限",
    supplyPending: "于创世时确定",
    allocationAria: "OPEN 分配",
    provisional: "分配比例为暂定值，最终以《OPEN 代币经济文件》为准。",
    proceedsTitle: "预售资金用途",
  },

  common: {
    readWhitepaper: "阅读白皮书",
    notFoundTitle: "页面不存在",
    notFoundBody: "该页面不存在。它可能已被移动，或者链接有误。",
    goHome: "返回首页",
    errorTitle: "出现了问题",
    errorBody:
      "此页面渲染失败。重新加载可能可以解决；如果仍然失败，问题在我们这边。",
    tryAgain: "重试",
  },
};
