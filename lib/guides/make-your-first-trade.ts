import type { Guide } from "./types";

/**
 * The buyer's path through OFS-2100 → 2200 → 2300, and OFS-2400 when it
 * goes wrong.
 *
 * Two honest constraints shape this guide, both verified rather than
 * assumed:
 *
 *  - The reference web app's trading screens are still a simulation.
 *    `openfiat-app/lib/data/ads.ts` and `trades.ts` describe themselves as
 *    "Simulated"; only `/staking`, `/governance`, `/explorer` and
 *    `/providers` have `lib/live-*.ts` behind them. So there is no
 *    click-through browser flow to document yet, and this guide does not
 *    pretend otherwise.
 *
 *  - The off-chain `EscrowLocked` reservation state is node bookkeeping,
 *    not proof of an on-chain vault. `ReservationRegistry::apply_request`
 *    only verifies a signature, checks the ad, and decrements the ad's
 *    `available_liquidity` — it never touches Solana. The real vault is
 *    created and funded by the seller's own wallet via the escrow
 *    program. A buyer who does not know that could pay fiat against
 *    nothing, so the guide says it plainly and gives them the check.
 */
export const makeYourFirstTrade: Guide = {
  slug: "make-your-first-trade",
  group: "trade",

  title: {
    en: "Make your first trade",
    zh: "完成你的第一笔交易",
  },
  summary: {
    en: "Buy or sell stablecoins for local currency, with the crypto held in escrow before you pay.",
    zh: "用当地货币买卖稳定币；在你付款之前，加密资产已被锁入履约托管。",
  },
  intro: {
    en: "A trade is four moves: you reserve part of a merchant's advertisement, the stablecoin goes into an on-chain escrow vault, you pay through your ordinary bank or mobile-money rail, and the merchant confirms — at which point the escrow releases to you. Nobody in the middle can take the funds, and nobody has to trust the other side's goodwill.",
    zh: "一笔交易包含四个动作：你预订商户挂单中的一部分，稳定币进入链上履约托管，你通过平时使用的银行或移动支付渠道付款，商户确认后履约托管即释放给你。中间没有任何人能拿走这笔资金，双方也都不需要信任对方的善意。",
  },

  requirements: {
    en: [
      "A Solana wallet you control, holding the token account the escrow will pay into",
      "Local currency and a payment method the merchant accepts, or the stablecoin if you are selling",
      "Access to an OpenFiat node's JSON-RPC endpoint — your own, or one run by someone you trust to relay your signed events",
      "A client that can sign protocol events: the Rust SDK covers every step below; the TypeScript SDK covers browsing and reserving, and the rest go through raw JSON-RPC calls",
      "Note: the reference web app's trading screens are still simulated data, so the steps below are the real path today, not a browser click-through",
    ],
    zh: [
      "一个你自己掌控的 Solana 钱包，其中包含履约托管将要打款到的代币账户",
      "当地货币以及商户接受的付款方式；如果你是卖方，则需要相应的稳定币",
      "可访问某个 OpenFiat 节点的 JSON-RPC 端点——可以是你自己的节点，也可以是你信任其代为转发签名事件的他人节点",
      "一个能够签署协议事件的客户端：Rust SDK 覆盖下面的每一个步骤；TypeScript SDK 覆盖浏览挂单与预订，其余步骤需要通过原始 JSON-RPC 调用完成",
      "请注意：参考网页应用的交易界面目前仍使用模拟数据，因此下面这些步骤才是当前真实可行的路径，而不是在浏览器里点几下就能完成",
    ],
  },

  steps: [
    {
      id: "what-protects-you",
      title: {
        en: "Understand what actually protects you",
        zh: "先弄清楚究竟是什么在保护你",
      },
      body: {
        en: "Two separate layers are involved, and confusing them is the one mistake that can cost you money. The peer-to-peer layer coordinates the trade: it records that you reserved part of an advertisement and marks the reservation EscrowLocked. That state is bookkeeping across nodes — it does not by itself prove anything exists on Solana. What actually holds the stablecoin is a trade escrow vault created on-chain by the seller's wallet, keyed by your reservation id. Before you send any fiat, check that the vault exists and is funded.",
        zh: "这里涉及两个彼此独立的层，把它们混为一谈是唯一可能让你蒙受损失的错误。点对点层负责协调交易：它记录你预订了某个挂单的一部分，并把该预订标记为 EscrowLocked。这个状态只是各节点之间的账目记录——它本身并不能证明 Solana 上真的存在什么。真正锁住稳定币的，是由卖方钱包在链上创建、并以你的预订 ID 为索引的交易履约托管金库。在你汇出任何法币之前，请先确认该金库确实存在且已注资。",
      },
    },
    {
      id: "find-an-ad",
      title: {
        en: "Find an advertisement",
        zh: "寻找一个挂单",
      },
      body: {
        en: "Ask any node for the advertisements it has synchronized. The method takes no filters and returns the whole book, so narrow it down yourself: match fiat_currency to your currency, direction to the side you want, payment_methods to a rail you can actually use, and check your amount sits between min_trade and max_trade with enough available_liquidity behind it. Only ads with status Active can be reserved.",
        zh: "向任意节点查询它已同步的挂单。该方法不接受任何筛选参数，会返回整个挂单簿，因此需要你自行筛选：用 fiat_currency 匹配你的货币，用 direction 匹配你想要的交易方向，用 payment_methods 匹配你实际能使用的支付渠道，并确认你的金额落在 min_trade 与 max_trade 之间、且背后有足够的 available_liquidity。只有 status 为 Active 的挂单才能被预订。",
      },
      code: [
        {
          code: `curl -s -X POST http://localhost:7080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getAdvertisements","params":{}}'

# Returns every synchronized ad. Filter client-side on fiat_currency,
# direction, payment_methods, min_trade/max_trade and available_liquidity.`,
        },
      ],
    },
    {
      id: "reserve",
      title: {
        en: "Reserve the amount you want",
        zh: "预订你想要的金额",
      },
      body: {
        en: "A reservation is a signed request naming the advertisement and the amount. The node validates it against the ad's limits and remaining liquidity, and either stores it as EscrowLocked or rejects it outright — nothing is recorded for a request that fails validation. From this moment you have 30 minutes: if the trade has not progressed by then, the reservation expires automatically on every node and the liquidity returns to the advertisement. You can also cancel it yourself while it is still in EscrowLocked.",
        zh: "预订是一条经过签名的请求，其中指明挂单与金额。节点会依据挂单的限额与剩余流动性进行校验，要么将其存储为 EscrowLocked，要么直接拒绝——校验失败的请求不会留下任何记录。从这一刻起你有 30 分钟：若届时交易仍未推进，该预订会在每个节点上自动过期，流动性也会退回挂单。在预订仍处于 EscrowLocked 状态期间，你也可以自行取消。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_reservations::events::ReservationRequest;
use openfiat_reservations::ReservationId;
use openfiat_types::{Amount, Timestamp};

let request = ReservationRequest {
    id: ReservationId::new("res-1"),
    advertisement_id: ad.id.clone(),
    requester: my_peer_id.clone(),
    requester_public_key: keypair.public_key(),
    // Base units and decimals must match the advertised asset.
    amount: Amount::new(2_000_000, 6),
    timestamp: Timestamp::now(),
};
let reservation_id = client.send_reservation_request(request, &keypair).await?;`,
        },
        {
          filename: "TypeScript",
          code: `import { reservations, toBytes, type ReservationRequest } from "@openfiat/sdk";

const request: ReservationRequest = {
  id: "res-1",
  advertisement_id: ad.id,
  requester: toBytes(peerId),
  requester_public_key: toBytes(keypair.publicKey),
  amount: { base_units: 2_000_000, decimals: 6 },
  timestamp: Date.now(),
};
const reservationId = await reservations.sendReservationRequest(client, request, keypair);`,
        },
      ],
    },
    {
      id: "check-escrow",
      title: {
        en: "Check the escrow before you pay",
        zh: "付款前先确认履约托管",
      },
      body: {
        en: "This is the step that protects you, and the one no software can take on your behalf. The seller creates the trade escrow vault and funds it from their liquidity vault — two instructions on the escrow program, both signed by their wallet, with the vault address derived from your reservation id. Read that account on Solana and confirm it holds the amount you expect. If it does not exist or is empty, do not send fiat: cancel the reservation, or simply let it expire.",
        zh: "这一步正是保护你的关键，也是任何软件都无法代你完成的一步。卖方会创建交易履约托管金库，并从其流动性金库中为之注资——这是履约托管程序上的两条指令，均由其钱包签名，而金库地址是由你的预订 ID 推导出来的。请在 Solana 上读取该账户，确认其中确实持有你预期的金额。如果账户不存在或余额为零，就不要汇出法币：取消预订，或者干脆让它自然过期。",
      },
      code: [
        {
          code: `# The vault is a PDA of the escrow program, derived from your reservation id.
# Devnet escrow program: HaPpM1QYM3dKp3sX7zhEdft9hB6ncu6xfALAbkyQChQP
#
# The node's own read-only join over reservation + settlement:
curl -s -X POST http://localhost:7080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getTrade","params":{"id":"res-1"}}'`,
        },
      ],
    },
    {
      id: "pay",
      title: {
        en: "Pay through the agreed rail, then declare it",
        zh: "通过约定渠道付款，然后声明已付款",
      },
      body: {
        en: "Send the local currency exactly as the advertisement specifies — same method, same account, and any reference the merchant asked for. Pay from an account in your own name where you can, because that is the evidence an arbitrator will look at if this goes wrong. Then tell the network you have paid, attaching the transfer's reference so the merchant can find it. You have 30 minutes from escrow lock to declare payment, and the merchant then has 30 minutes to approve or reject.",
        zh: "严格按照挂单指定的方式汇出当地货币——相同的付款方式、相同的收款账户，以及商户要求的任何附言。尽可能使用你本人名下的账户付款，因为一旦出现问题，这正是仲裁者会审阅的证据。随后向网络声明你已付款，并附上转账凭证号，以便商户查找。从履约托管锁定起你有 30 分钟时间声明付款，之后商户有 30 分钟时间批准或拒绝。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_settlement::events::PaymentSubmitted;

let payment = PaymentSubmitted {
    settlement_id: settlement_id.clone(),
    buyer: my_peer_id.clone(),
    // Whatever lets the merchant find the transfer on their side.
    payment_reference: Some("MPESA-QK12345678".to_string()),
    timestamp: Timestamp::now(),
};
client.send_payment_submitted(payment, &keypair).await?;`,
        },
        {
          filename: "TypeScript",
          code: `// The TypeScript SDK has no typed settlement helper yet, so sign and
// send the event through the client's own signed-call path.
const action = {
  settlement_id: settlementId,
  buyer: toBytes(peerId),
  payment_reference: "MPESA-QK12345678",
  timestamp: Date.now(),
};
const bytes = new TextEncoder().encode(JSON.stringify(action));
const signature = await sign(keypair, bytes);
await client.sendSigned("sendPaymentSubmitted", { action, signature: toBytes(signature) });`,
        },
      ],
    },
    {
      id: "release",
      title: {
        en: "The merchant approves and escrow releases",
        zh: "商户批准，履约托管随即释放",
      },
      body: {
        en: "Once the merchant sees the money arrive they approve the settlement, which flips the on-chain vault to approved. Release is permissionless from that point: the merchant never hands you the stablecoin themselves, and cannot withhold it after approving — you, a relaying node, or anyone else can trigger release_escrow, and the program pays your token account and takes the protocol fee. Watch getTrade until the settlement reaches Completed, which is recorded only once the release transaction is confirmed on-chain.",
        zh: "商户看到款项到账后即批准结算，链上金库随之转为已批准状态。从这一刻起，释放是无需许可的：商户从来不会亲手把稳定币交给你，批准之后也无法再扣留——你自己、某个转发节点，或任何其他人都可以触发 release_escrow，程序会向你的代币账户打款并扣除协议费用。持续查询 getTrade，直到结算状态变为 Completed；只有在释放交易于链上确认之后，这一状态才会被记录。",
      },
    },
    {
      id: "dispute",
      title: {
        en: "If it goes wrong, open a dispute",
        zh: "如果出了问题，发起争议",
      },
      body: {
        en: "Only the buyer or the seller of that settlement can open a dispute — the node rejects anyone else. State plainly what happened and keep your payment evidence. Three arbitrators then stake their own OPEN to take the case, vote by commit-and-reveal so none can follow another's lead, and the outcome executes on-chain against the same escrow vault. One gap worth knowing: the crate supports both sides agreeing a mutual settlement instead, but that path is not exposed over JSON-RPC yet, so today a dispute means arbitration.",
        zh: "只有该结算的买方或卖方才能发起争议——节点会拒绝其他任何人。请如实说明发生了什么，并保留好你的付款凭证。随后会有三名仲裁者质押自己的 OPEN 来接手该案件，以「先承诺后揭示」的方式投票，因此没有人能跟风他人，裁决结果最终在链上针对同一个履约托管金库执行。有一个值得了解的缺口：相关 crate 支持双方协商达成和解，但该路径尚未通过 JSON-RPC 暴露，因此目前发起争议就意味着走仲裁流程。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_disputes::events::DisputeOpen;
use openfiat_disputes::DisputeId;

let open = DisputeOpen {
    id: DisputeId::new("dsp-1"),
    settlement_id: settlement_id.clone(),
    opener: my_peer_id.clone(),
    opener_public_key: keypair.public_key(),
    reason: "Paid in full on 12 March, reference MPESA-QK12345678; not released.".to_string(),
    timestamp: Timestamp::now(),
};
client.send_dispute_open(open, &keypair).await?;`,
        },
      ],
    },
  ],

  related: [
    {
      href: "/how-it-works",
      label: { en: "How a trade works", zh: "一笔交易如何完成" },
    },
    {
      href: "/participate/buyers",
      label: { en: "The buyer role", zh: "买方这一角色" },
    },
    {
      href: "/specs/ofs-2200",
      label: { en: "OFS-2200 — reservations", zh: "OFS-2200——预订" },
    },
    {
      href: "/specs/ofs-2300",
      label: { en: "OFS-2300 — settlement", zh: "OFS-2300——结算" },
    },
    {
      href: "/specs/ofs-2400",
      label: { en: "OFS-2400 — disputes", zh: "OFS-2400——争议" },
    },
  ],
};
