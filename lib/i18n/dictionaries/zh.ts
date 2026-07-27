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
      runNode: "运行节点",
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
    headlineLead: "把稳定币换成",
    headlineAccent: "你所在国家的现金",
    headlineTail: "。",
    lede: "直接与本国的人交易——银行转账、移动支付或现金。在你付出第一分钱之前，对方的加密资产已被锁入履约托管；中间没有任何公司抽成，也没有任何公司决定谁可以交易。",
    ctaHowItWorks: "看交易如何进行",
    readWhitepaper: "阅读白皮书",
    tokenSale: "代币销售",
    corpusNote: (chapters: number, specs: number) =>
      `文档完备：${chapters} 章白皮书与 ${specs} 份开放规范`,

    steps: {
      title: "一笔交易如何完成",
      subtitle: "共四步，从第二步开始资金就已受到保护。",
    },

    safety: {
      title: "为什么你可以放心与陌生人交易",
      subtitle: "这里没有任何公司为谁作担保，取而代之的是以下机制。",
      more: "信任机制如何运作",
    },

    scenarios: {
      title: "人们用它来做什么",
      subtitle:
        "房租、工资、货款、汇给家人。稳定币便于持有，但日常开销是以当地货币计价的。",
      railsLabel: "支持的收付方式",
    },

    roles: {
      title: "买方、商户、仲裁者、节点运营者",
      subtitle: "担任其中任何一种都无需任何人批准。",
      seeAll: "查看所有角色",
    },

    builders: {
      title: "以开放协议构建",
      subtitle:
        "结算运行在 Solana 上，其余部分运行在任何人都可加入的开放网络中——因此没有任何单一公司能够关闭市场、施加审查，或把你锁定在它的应用里。",
      runNode: "运行节点",
      specs: "阅读协议规范",
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
        "开发者文档位于 docs.openfiat.org。规范本身是权威参考，并已在本站全文发布。",
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
