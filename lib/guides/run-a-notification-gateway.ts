import type { Guide } from "./types";

/**
 * Mirrors `openfiat-sdks`' own `examples/notification_provider.{rs,ts}`,
 * which are runnable against a local node — the snippets below are that
 * example's real calls.
 *
 * Two gaps are stated in the guide rather than papered over, because both
 * change what an operator should expect: no channel adapter ships in
 * `openfiat-notifications` (its own `provider.rs` says so), and nothing
 * on- or off-chain currently reads a gateway's stake — `StakingConfig`
 * stores `min_stake` but no instruction enforces it, and neither
 * `crates/notifications` nor `crates/registry` reference staking at all.
 */
export const runANotificationGateway: Guide = {
  slug: "run-a-notification-gateway",
  group: "operate",

  title: {
    en: "Run a notification gateway",
    zh: "运行通知网关",
  },
  summary: {
    en: "Deliver opt-in trade and governance notifications over email, SMS, Telegram, push or a webhook.",
    zh: "通过邮件、短信、Telegram、推送或 Webhook，投递用户主动订阅的交易与治理通知。",
  },
  intro: {
    en: "A trade moves on a timer: a reservation expires, a payment gets marked sent, an escrow releases. People who are not staring at the app need telling. Notification gateways do that — you register the channels you can deliver on, deliver what a wallet has opted into, and report back what happened to each attempt.",
    zh: "一笔交易是有时限的：预订会过期、付款会被标记为已发送、履约托管会释放。没有一直盯着应用的人需要被告知。通知网关做的正是这件事——你注册自己能够投递的渠道，投递钱包已订阅的内容，并回报每一次投递尝试的结果。",
  },

  requirements: {
    en: [
      "An account with whatever you deliver through — an SMTP or email API, an SMS provider, a Telegram bot, a push service — the protocol supplies none of these",
      "A publicly reachable endpoint for applications to send you delivery requests, if you register a webhook channel",
      "Reachable access to an OpenFiat node's JSON-RPC endpoint, your own or someone else's",
      "A persistent wallet.json for the gateway's identity — delivery reports are signed with it and your operational reputation accrues to it",
    ],
    zh: [
      "一个可用于实际投递的账号——SMTP 或邮件 API、短信服务商、Telegram 机器人、推送服务等，协议本身不提供任何一种",
      "如果你注册的是 Webhook 渠道，还需要一个公网可达的端点，供应用向你发送投递请求",
      "可访问某个 OpenFiat 节点的 JSON-RPC 端点，可以是你自己的节点，也可以是他人的",
      "一份持久化的 wallet.json 作为网关身份——投递回执用它签名，你的运营信誉也绑定在它上面",
    ],
  },

  steps: [
    {
      id: "identity",
      title: {
        en: "Create the gateway's identity",
        zh: "创建网关身份",
      },
      body: {
        en: "A gateway is identified by an Ed25519 keypair in Solana CLI wallet.json format, the same as every other provider. Generate it once and keep it: every delivery report you publish is signed with it, and §18's provider reputation is derived from those reports.",
        zh: "网关由一对 Ed25519 密钥标识，采用 Solana CLI 的 wallet.json 格式，与其他各类提供方相同。生成一次后请妥善保存：你发布的每一条投递回执都用它签名，§18 中的提供方信誉也正是由这些回执推导而来。",
      },
      code: [
        {
          code: `solana-keygen new --outfile /etc/openfiat/gateway-wallet.json
chmod 600 /etc/openfiat/gateway-wallet.json`,
        },
      ],
    },
    {
      id: "register",
      title: {
        en: "Register the channels you deliver on",
        zh: "注册你所支持的投递渠道",
      },
      body: {
        en: "Notification gateways have no registration event of their own — you register through the ordinary service registry (OFS-1500) with a Notifications service type, naming one channel: Email, Telegram, Sms, Push or Webhook. `endpoints` is where applications actually reach you, so for a webhook gateway that is the URL you serve. Nobody approves the registration; you publish it and the network gossips it.",
        zh: "通知网关没有专属的注册事件——你通过通用的服务注册表（OFS-1500）注册，服务类型为 Notifications，并指明一个渠道：Email、Telegram、Sms、Push 或 Webhook。`endpoints` 是应用实际联系你的地址，因此对 Webhook 网关而言就是你对外提供的 URL。注册无需任何人批准；你发布它，网络会通过 gossip 传播。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_registry::Registration;
use openfiat_sdk::{Client, ClientConfig};
use openfiat_types::{NotificationChannel, ServiceId, ServiceType, Timestamp};

let client = Client::new(ClientConfig {
    endpoint: "http://localhost:7080".to_string(),
    ..ClientConfig::default()
});

let registration = Registration {
    service_id: ServiceId::new("my-notification-gateway-1"),
    service_type: ServiceType::Notifications(NotificationChannel::Webhook),
    provider: provider_peer_id.clone(),
    provider_public_key: provider.public_key(),
    // Where applications send you delivery requests.
    endpoints: vec!["https://notify.example.com/openfiat".to_string()],
    supported_ofs: vec![1500, 6000],
    region: None,
    capabilities: vec!["Webhook".to_string()],
    pricing: None,
    timestamp: Timestamp::now(),
};
client.send_provider_register(registration, &provider).await?;`,
        },
        {
          filename: "TypeScript",
          code: `import { Client, providers, toBytes, type Registration } from "@openfiat/sdk";

const client = new Client({ endpoint: "http://localhost:7080", timeoutMs: 30_000 });

const registration: Registration = {
  service_id: "my-notification-gateway-1",
  service_type: { Notifications: "Webhook" },
  provider: toBytes(providerId),
  provider_public_key: toBytes(provider.publicKey),
  endpoints: ["https://notify.example.com/openfiat"],
  supported_ofs: [1500, 6000],
  region: null,
  capabilities: ["Webhook"],
  pricing: null,
  timestamp: Date.now(),
};
await providers.sendProviderRegister(client, registration, provider);`,
        },
      ],
    },
    {
      id: "subscriptions",
      title: {
        en: "Deliver only what a wallet asked for",
        zh: "只投递钱包主动订阅的内容",
      },
      body: {
        en: "Subscriptions belong to the wallet, not to you — a wallet publishes one signed record listing the categories it wants, and the latest one fully replaces the previous. There are five categories (Trading, Marketplace, Disputes, Governance, Infrastructure) and sixteen triggers grouped under them, so a wallet that enabled Trading gets ReservationCreated through TradeCompleted, and nothing from Governance. Read the subscription before delivering rather than assuming.",
        zh: "订阅属于钱包，而不属于你——钱包会发布一条经签名的记录，列出它希望接收的类别，最新一条会完全覆盖此前的记录。共有五个类别（Trading、Marketplace、Disputes、Governance、Infrastructure），下辖十六种触发事件；因此一个只启用了 Trading 的钱包，会收到从 ReservationCreated 到 TradeCompleted 的通知，而不会收到任何 Governance 相关内容。投递前请先读取订阅信息，不要凭假设行事。",
      },
      code: [
        {
          filename: "Rust",
          code: `// What has this wallet opted into?
let subscription = client.get_subscription(&recipient_wallet).await?;

// \`Subscription::wants\` maps a trigger to its category for you.
if let Some(subscription) = subscription {
    if subscription.wants(NotificationTrigger::TradeCompleted) {
        // ... deliver
    }
}`,
        },
      ],
    },
    {
      id: "deliver",
      title: {
        en: "Write the channel adapter",
        zh: "编写渠道适配器",
      },
      body: {
        en: "This is the part you supply. `openfiat-notifications` defines the plugin interface and ships no adapters for any channel — email, SMS, Telegram and the rest are all expected to be implemented externally against the trait. Two rules constrain what you write: a gateway never creates protocol events, it only delivers ones already verified upstream (§17); and it receives only what delivery requires — a destination and rendered content, never the trade details that produced it, balances, or dispute evidence (§19).",
        zh: "这一部分需要你自己实现。`openfiat-notifications` 只定义了插件接口，并未附带任何渠道的适配器——邮件、短信、Telegram 等都需要你在该 trait 之上自行实现。有两条规则约束着你的实现：网关从不创建协议事件，只负责投递已在上游完成验证的事件（§17）；网关只会收到投递所必需的信息——目标地址与已渲染的内容，绝不包括产生该通知的交易详情、账户余额或争议证据（§19）。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_notifications::{NotificationPayload, NotificationProvider};
use openfiat_notifications::NotificationError;
use openfiat_types::NotificationChannel;

struct EmailGateway { /* your SMTP or API client */ }

impl NotificationProvider for EmailGateway {
    fn channel(&self) -> NotificationChannel {
        NotificationChannel::Email
    }

    fn send(&self, payload: &NotificationPayload) -> Result<(), NotificationError> {
        // \`destination\` is the address; \`subject\` and \`body\` are already
        // rendered. Nothing else about the trade is available here, by design.
        self.deliver(&payload.destination, &payload.subject, &payload.body)
    }
}`,
        },
      ],
    },
    {
      id: "report",
      title: {
        en: "Report what happened",
        zh: "回报投递结果",
      },
      body: {
        en: "Every attempt gets a signed delivery report. The status is one of Queued, Sent, Delivered, Read, Failed, Retried or Expired, and each maps to its own gossip event — reporting a Failed honestly is what lets applications route around you, and it is how §18 provider reputation stays meaningful. Reports are keyed by notification id and the latest one wins, so you can report Sent and later Delivered for the same id.",
        zh: "每一次投递尝试都要提交一条经签名的投递回执。状态取值为 Queued、Sent、Delivered、Read、Failed、Retried 或 Expired 之一，每种状态对应各自的 gossip 事件——如实上报 Failed，才能让应用绕开出问题的网关，也才能让 §18 的提供方信誉保持其意义。回执以通知 ID 为键，最新一条生效，因此你可以先上报 Sent，随后再为同一个 ID 上报 Delivered。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_notifications::events::DeliveryReport;
use openfiat_notifications::{DeliveryStatus, NotificationId, NotificationTrigger};

let report = DeliveryReport {
    notification_id: NotificationId::new("notification-1"),
    service_id: service_id.clone(),
    provider: provider_peer_id.clone(),
    provider_public_key: provider.public_key(),
    recipient_wallet: recipient_wallet.clone(),
    trigger: NotificationTrigger::TradeCompleted,
    status: DeliveryStatus::Delivered,
    timestamp: Timestamp::now(),
};
client.send_delivery_report(report, &provider).await?;`,
        },
        {
          filename: "TypeScript",
          code: `import { notifications, type DeliveryReport } from "@openfiat/sdk";

const report: DeliveryReport = {
  notification_id: "notification-1",
  service_id: serviceId,
  provider: toBytes(providerId),
  provider_public_key: toBytes(provider.publicKey),
  recipient_wallet: toBytes(walletId),
  trigger: "TradeCompleted",
  status: "Delivered",
  timestamp: Date.now(),
};
await notifications.sendDeliveryReport(client, report, provider);`,
        },
      ],
    },
    {
      id: "verify",
      title: {
        en: "Check the receipts came back",
        zh: "确认回执已被记录",
      },
      body: {
        en: "Reading receipts back for a wallet is the quickest confirmation that your reports were accepted and propagated. Applications choose providers on reputation, latency, proximity, channel and cost — the protocol deliberately does not mandate a routing algorithm — so a clean, honest receipt history is the whole of your visible track record.",
        zh: "按钱包读取回执，是确认你的上报已被接受并完成传播的最快方式。应用会依据信誉、投递延迟、地理邻近度、支持渠道与成本来选择提供方——协议刻意不规定具体的路由算法——因此一份干净、如实的回执记录，就是你全部对外可见的履约记录。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `const receipts = await notifications.getDeliveryReceiptsByWallet(client, walletId);
console.log(\`delivery receipts for this wallet: \${receipts.length}\`);`,
        },
      ],
    },
    {
      id: "stake-and-earnings",
      title: {
        en: "What is not wired up yet",
        zh: "目前尚未打通的部分",
      },
      body: {
        en: "The design has gateways stake OPEN to be eligible for traffic and earn a share of a per-trade notification fee. None of that is enforced by code today: a NotificationProvider role exists in the staking program and you can stake against it, but StakingConfig's minimum is stored and never checked, nothing in the registry or notification crates reads stake at all, and no notification fee is implemented anywhere. Registering and delivering work regardless. Contact-handle verification is the same story — the identity crate defines the claim and its Verified status, but there is no protocol OTP flow, so the wallet application runs that externally and publishes the result.",
        zh: "按照设计，网关需要质押 OPEN 才有资格接收通知流量，并从每笔交易的通知费中分成。但目前这些都尚未由代码强制实施：质押程序中确实存在 NotificationProvider 角色，你也可以为其质押，但 StakingConfig 中的最低质押额只是被存储、从未被校验，注册表与通知相关的 crate 完全没有读取质押数据，通知费也未在任何地方实现。因此注册与投递不受影响，照常可用。联系方式验证同理——身份 crate 定义了声明及其 Verified 状态，但协议层并没有 OTP 流程，实际验证由钱包应用在协议之外完成，再发布结果。",
      },
    },
  ],

  related: [
    {
      href: "/participate/notification-gateways",
      label: {
        en: "The notification gateway role",
        zh: "通知网关这一角色",
      },
    },
    {
      href: "/specs/ofs-6000",
      label: {
        en: "OFS-6000 — notification protocol",
        zh: "OFS-6000——通知协议",
      },
    },
    {
      href: "/specs/ofs-1500",
      label: { en: "OFS-1500 — service registry", zh: "OFS-1500——服务注册表" },
    },
  ],
};
