import type { Locale } from "@/lib/i18n";

/**
 * Every fee the protocol charges, and everything it pays out, in one place.
 *
 * Self-contained per the `lib/guides` pattern: its own copy in every locale,
 * so a missing translation fails the build rather than falling back to
 * English.
 *
 * The `status` field carries the weight here. Most of what this file
 * describes is specified and not yet collected or paid, and a fees page that
 * presented the whole table as live would be the most consequential kind of
 * wrong — somebody decides to become a merchant or run an oracle on the
 * strength of it. Status travels with each row rather than sitting in a
 * footnote.
 *
 * Source of truth: OFS-4100 §6 (fees), §9.2 (node rewards), §9.3 (arbitrator
 * rewards), §9.5-§9.7 (provider compensation).
 */
export type Localized<T> = Record<Locale, T>;

/**
 * - `live`: the protocol moves this money today.
 * - `specified`: decided and documented, but no code collects or pays it.
 * - `none`: deliberately nothing, and nothing planned.
 */
export type FeeStatus = "live" | "specified" | "none";

export type ParticipantFee = {
  id: string;
  name: Localized<string>;
  payer: Localized<string>;
  amount: Localized<string>;
  status: FeeStatus;
  note: Localized<string>;
};

export type ProviderPay = {
  id: string;
  role: Localized<string>;
  consumerPays: Localized<string>;
  receives: Localized<string>;
  status: FeeStatus;
  note: Localized<string>;
};

/** What a participant pays. */
export const PARTICIPANT_FEES: ParticipantFee[] = [
  {
    id: "settlement",
    name: { en: "Settlement fee", zh: "结算费" },
    payer: { en: "Buyer", zh: "买方" },
    amount: {
      en: "0.85% of the traded amount, in the stablecoin traded",
      zh: "成交金额的 0.85%，以交易所用的稳定币计价",
    },
    status: "live",
    note: {
      en: "Deducted from the stablecoin released to the buyer, so it is paid only when a trade actually completes. It splits 40/30/20/10 across the development, ecosystem, infrastructure and emergency-reserve treasuries. This is the one fee the protocol charges today, and it has been proven end to end on devnet.",
      zh: "从释放给买方的稳定币中扣除，因此只有交易真正完成时才会产生。该费用按 40/30/20/10 分配至开发、生态、基础设施与应急储备四个国库。这是目前协议唯一实际收取的费用，并已在 devnet 上完成端到端验证。",
    },
  },
  {
    id: "ad-listing",
    name: { en: "Ad-listing fee", zh: "挂单费" },
    payer: {
      en: "Merchant, from their liquidity vault",
      zh: "商户，从其流动性金库支付",
    },
    amount: { en: "1 OPEN (proposed)", zh: "1 OPEN（提案中）" },
    status: "specified",
    note: {
      en: "Not charged yet. The field exists on-chain and is read by no instruction, so publishing an advertisement currently costs nothing. If you are planning merchant economics, treat this as a cost that is coming rather than one you are paying.",
      zh: "目前尚未收取。该字段虽已存在于链上，但没有任何指令会读取它，因此当前发布挂单不产生任何费用。若你正在测算商户成本，请将其视为即将产生的费用，而非已在支付的费用。",
    },
  },
  {
    id: "arbitration-deposit",
    name: { en: "Arbitration deposit", zh: "仲裁保证金" },
    payer: {
      en: "Merchant, from their liquidity vault — whoever opened the dispute",
      zh: "商户，从其流动性金库支付——无论争议由哪一方发起",
    },
    amount: { en: "20 OPEN (proposed)", zh: "20 OPEN（提案中）" },
    status: "specified",
    note: {
      en: "Forfeited to the arbitration pool only if the outcome goes against the merchant; otherwise it returns to their vault. The asymmetry is deliberate: a buyer is often a one-time participant, and making them fund a deposit to be heard would price the dispute mechanism out of reach of the party it exists to protect. Not charged yet — stored on-chain, read by no instruction.",
      zh: "仅当裁决结果对商户不利时，保证金才会被没收并转入仲裁资金池；否则将退回其金库。这一不对称是刻意设计：买方往往只交易一次，若要求其先出资才能提出争议，等于把争议机制的门槛抬高到它本要保护的那一方之外。目前尚未收取——虽存储于链上，但没有任何指令会读取它。",
    },
  },
];

/** What each role receives, and what its consumers pay. */
export const PROVIDER_PAY: ProviderPay[] = [
  {
    id: "node-operator",
    role: { en: "Node operator", zh: "节点运营者" },
    consumerPays: { en: "—", zh: "—" },
    receives: {
      en: "A protocol reward proportional to stake × connectivity × availability",
      zh: "按 质押量 × 连通性 × 可用性 计算的协议奖励",
    },
    status: "specified",
    note: {
      en: "A node bridging to Solana counts 1.0 against 0.4 for one only gossiping, because it does strictly more work and the difference is externally observable rather than self-reported. The calculation exists and nodes publish the liveness observations it runs on, but nothing submits the result and the rewards vault is empty — so no node has been paid.",
      zh: "接入 Solana 的节点计为 1.0，仅参与 gossip 的节点计为 0.4：前者承担的工作确实更多，且这一差异可由外部观测得出，而非依赖节点自报。计算逻辑已经实现，节点也会公布其所依据的存活性观测数据，但尚无程序提交计算结果，且奖励金库为空——因此没有任何节点获得过报酬。",
    },
  },
  {
    id: "arbitrator",
    role: { en: "Arbitrator", zh: "仲裁者" },
    consumerPays: { en: "—", zh: "—" },
    receives: {
      en: "A share of the arbitration pool, pro-rata by revealed weight, for voting with consensus",
      zh: "投票与共识一致者，按揭示权重的比例从仲裁资金池中分得份额",
    },
    status: "specified",
    note: {
      en: "Not built. Today voting costs transaction fees and returns nothing, while voting against consensus carries no penalty either — the incentive the commit-reveal design assumes is not yet in place.",
      zh: "尚未实现。目前投票需要支付交易手续费却没有任何回报，而投出与共识相悖的票也不会受到惩罚——「先承诺后揭示」设计所依赖的激励机制尚未落地。",
    },
  },
  {
    id: "notification-gateway",
    role: { en: "Notification gateway", zh: "通知网关" },
    consumerPays: {
      en: "Per delivery, by the participant who enabled notifications",
      zh: "由启用通知的参与者按每次投递支付",
    },
    receives: { en: "That fee", zh: "该笔费用" },
    status: "specified",
    note: {
      en: "Not metered. Nothing counts deliveries, so nothing can be charged or paid. The mechanism to receive it exists; the meter in front of it does not.",
      zh: "尚未计量。没有任何程序统计投递次数，因此既无法收费也无法结算。收款机制已经具备，但前置的计量环节尚不存在。",
    },
  },
  {
    id: "oracle-provider",
    role: { en: "Oracle provider", zh: "预言机提供方" },
    consumerPays: { en: "Nothing — reads are free", zh: "无需付费——读取免费" },
    receives: {
      en: "Paid by the protocol, scaled by currency coverage and uptime",
      zh: "由协议支付，并按货币覆盖范围与在线率进行加权",
    },
    status: "specified",
    note: {
      en: "Reads are free by decision, not by omission: a priced rate feed gets consulted less, which makes the median it contributes to thinner and easier to move. The provider is paid by the protocol instead, so the rate stays free at the point of use while its supply is still funded. The formula is proposed and not final, and nothing pays it yet.",
      zh: "读取免费是一项明确决定，而非疏漏：一旦对汇率数据收费，查询就会减少，从而使其参与构成的中位数样本变薄、更易被操纵。取而代之的是由协议向提供方付费，使汇率在使用端保持免费，同时其供给仍能获得资金支持。计算公式仍属提案、尚未定稿，目前也没有任何款项发放。",
    },
  },
  {
    id: "snapshot-provider",
    role: { en: "Snapshot provider", zh: "快照提供方" },
    consumerPays: {
      en: "Nothing — downloads are free",
      zh: "无需付费——下载免费",
    },
    receives: { en: "Nothing", zh: "没有报酬" },
    status: "none",
    note: {
      en: "No revenue, and none planned. Serving a snapshot is a marginal cost on infrastructure a node operator already runs and is already compensated for. Anyone weighing a standalone snapshot service should read this as: there is nothing to earn here.",
      zh: "没有收入，也没有相关计划。提供快照只是节点运营者既有基础设施之上的边际成本，而这部分基础设施本身已获得补偿。若你正在考虑独立运营快照服务，请明确：这里没有任何收益可言。",
    },
  },
  {
    id: "risk-intelligence",
    role: { en: "Risk intelligence provider", zh: "风险情报提供方" },
    consumerPays: { en: "Nothing directly", zh: "无需直接付费" },
    receives: {
      en: "1,000 USDC per month from the treasury, scaled by uptime",
      zh: "每月从国库支付 1,000 USDC，并按在线率加权",
    },
    status: "specified",
    note: {
      en: "The only permissioned role: a provider must be approved by governance before operating. Every other role is permissionless because a bad actor's cost is bounded — a useless oracle is outvoted by the median, a dead gateway simply fails to deliver. A standing subscription drawn from the treasury has no such bound, so gating who may receive it is the condition that lets a paid slot exist at all. Neither the payment nor the approval gate is built yet.",
      zh: "这是唯一需要许可的角色：提供方必须先获得治理批准才能开展服务。其他角色之所以无需许可，是因为作恶者造成的损失有上限——无用的预言机会被中位数排除，失效的网关只是投递失败而已。而从国库持续支取的订阅费用没有这样的上限，因此限定谁有资格领取，正是这一有偿名额得以存在的前提。目前付款机制与审批机制均尚未实现。",
    },
  },
];

/** AllenHark's default service key, per OFS-4100 §9.7. */
export const DEFAULT_RISK_PROVIDER_KEY =
  "ALLENLMtV1zEAHT3xpVryqcbdPCB8c9JhM1Jdbe5XHg5";
