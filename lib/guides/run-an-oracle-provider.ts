import type { Guide } from "./types";

/**
 * Mirrors `openfiat-sdks`' own `examples/oracle_provider.{rs,ts}`, which are
 * runnable against a local node — the snippets below are that example's real
 * calls, not a sketch of the API.
 */
export const runAnOracleProvider: Guide = {
  slug: "run-an-oracle-provider",
  group: "operate",

  title: {
    en: "Run an oracle provider",
    zh: "运行预言机提供方",
  },
  summary: {
    en: "Publish signed exchange rates that merchants price their advertisements against.",
    zh: "发布经签名的汇率，供商户为挂单定价时参考。",
  },
  intro: {
    en: "Merchants can price an advertisement at a margin against a reference rate instead of a fixed number — which only works if somebody publishes rates. Oracle providers do that: sign a rate, publish it to the network, and the protocol takes the median across every provider rather than trusting any single one.",
    zh: "商户可以选择以参考汇率为基准、按一定浮动比例为挂单定价，而不是写死一个固定价格——但这需要有人来发布汇率。预言机提供方正是做这件事：签署一个汇率并发布到网络，协议再取所有提供方的中位数，而不是信任其中任何一家。",
  },

  requirements: {
    en: [
      "A rate source you trust and are allowed to redistribute — the protocol does not supply one",
      "Reachable access to an OpenFiat node's JSON-RPC endpoint, your own or someone else's",
      "A persistent wallet.json for the provider's identity — reputation accrues to the key, so a fresh key each restart starts from zero",
      "OPEN staked as an oracle provider, to be eligible for a share of protocol revenue",
    ],
    zh: [
      "一个你信任且有权再分发的汇率数据源——协议本身不提供数据源",
      "可访问某个 OpenFiat 节点的 JSON-RPC 端点，可以是你自己的节点，也可以是他人的",
      "一份持久化的 wallet.json 作为提供方身份——信誉绑定在密钥上，每次重启都换新密钥会让信誉从零开始",
      "以预言机提供方身份质押 OPEN，才有资格分享协议收入",
    ],
  },

  steps: [
    {
      id: "identity",
      title: {
        en: "Create the provider's identity",
        zh: "创建提供方身份",
      },
      body: {
        en: "A provider is identified by an Ed25519 keypair in Solana CLI wallet.json format — the same file solana-keygen produces, and the same format the node itself uses. Generate it once and keep it: every record you publish is signed with it, and your reputation is attached to it.",
        zh: "提供方由一对 Ed25519 密钥标识，采用 Solana CLI 的 wallet.json 格式——与 solana-keygen 生成的文件相同，也与节点自身使用的格式一致。生成一次后请妥善保存：你发布的每条记录都用它签名，你的信誉也绑定在它上面。",
      },
      code: [
        {
          code: `solana-keygen new --outfile /etc/openfiat/oracle-wallet.json
chmod 600 /etc/openfiat/oracle-wallet.json`,
        },
      ],
    },
    {
      id: "register",
      title: {
        en: "Register in the service registry",
        zh: "在服务注册表中注册",
      },
      body: {
        en: "Registration (OFS-1500) is how other participants discover you: it advertises which service you provide, which currency pairs you cover, and which region you serve. Nobody approves it — you publish the registration and the network gossips it.",
        zh: "注册（OFS-1500）是其他参与者发现你的方式：它公布你提供哪种服务、覆盖哪些货币对、服务哪个地区。无需任何人批准——你发布注册信息，网络会通过 gossip 传播它。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_registry::Registration;
use openfiat_sdk::{Client, ClientConfig};
use openfiat_types::{MarketDataService, ServiceId, ServiceType, Timestamp};

let client = Client::new(ClientConfig {
    endpoint: "http://localhost:7080".to_string(),
    ..ClientConfig::default()
});

let registration = Registration {
    service_id: ServiceId::new("my-oracle-1"),
    service_type: ServiceType::MarketData(MarketDataService::FxOracle),
    provider: provider_peer_id.clone(),
    provider_public_key: keypair.public_key(),
    endpoints: vec!["/ip4/203.0.113.10/udp/4001/quic-v1".to_string()],
    supported_ofs: vec![1500, 7000],
    region: Some("Kenya".to_string()),
    capabilities: vec!["USDC/KES".to_string()],
    pricing: None,
    timestamp: Timestamp::now(),
};
client.send_provider_register(registration, &keypair).await?;`,
        },
        {
          filename: "TypeScript",
          code: `import { Client, providers, toBytes, type Registration } from "@openfiat/sdk";

const client = new Client({ endpoint: "http://localhost:7080", timeoutMs: 30_000 });

const registration: Registration = {
  service_id: "my-oracle-1",
  service_type: { MarketData: "FxOracle" },
  provider: toBytes(peerId),
  provider_public_key: toBytes(keypair.publicKey),
  endpoints: ["/ip4/203.0.113.10/udp/4001/quic-v1"],
  supported_ofs: [1500, 7000],
  region: "Kenya",
  capabilities: ["USDC/KES"],
  pricing: null,
  timestamp: Date.now(),
};
await providers.sendProviderRegister(client, registration, keypair);`,
        },
      ],
    },
    {
      id: "publish",
      title: {
        en: "Publish a signed rate",
        zh: "发布经签名的汇率",
      },
      body: {
        en: "Every record carries an explicit expiry, so a provider that goes quiet stops influencing prices rather than leaving a stale rate behind. Publish on whatever interval your source updates — and keep the expiry close to that interval rather than far beyond it.",
        zh: "每条记录都带有明确的过期时间，因此一旦提供方停止更新，它就不再影响价格，而不会留下一个陈旧的汇率。你可以按数据源的更新频率发布——并让过期时间贴近这个间隔，而不要设得过长。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_oracles::events::OraclePublish;
use openfiat_oracles::record::OracleData;
use openfiat_oracles::OracleId;

let now = Timestamp::now();
let publish = OraclePublish {
    id: OracleId::new("usdc-kes"),
    provider: provider_peer_id.clone(),
    provider_public_key: keypair.public_key(),
    data: OracleData::ExchangeRate {
        base: "USDC".to_string(),
        quote: "KES".to_string(),
        rate: 129.52,
    },
    version: 1,
    timestamp: now,
    // One minute: publish at least this often, or the rate stops counting.
    expires_at: Timestamp::from_millis(now.as_millis() + 60_000),
};
client.send_oracle_publish(publish, &keypair).await?;`,
        },
        {
          filename: "TypeScript",
          code: `import { oracles, type OraclePublish } from "@openfiat/sdk";

const now = Date.now();
const publish: OraclePublish = {
  id: "usdc-kes",
  provider: toBytes(peerId),
  provider_public_key: toBytes(keypair.publicKey),
  data: { ExchangeRate: { base: "USDC", quote: "KES", rate: 129.52 } },
  version: 1,
  timestamp: now,
  expires_at: now + 60_000,
};
await oracles.sendOraclePublish(client, publish, keypair);`,
        },
      ],
    },
    {
      id: "verify",
      title: {
        en: "Check your rate is counted",
        zh: "确认你的汇率已被计入",
      },
      body: {
        en: "The protocol takes the median across providers, so no single one moves the price on its own. Reading the median back is the quickest confirmation that your record was accepted, propagated, and is still inside its expiry window.",
        zh: "协议会取所有提供方的中位数，因此任何单一提供方都无法独自左右价格。读取中位数是最快的确认方式，可以验证你的记录已被接受、已传播，并且仍在有效期内。",
      },
      code: [
        {
          code: `curl -s -X POST http://localhost:7080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getMedianExchangeRate","params":{"base":"USDC","quote":"KES"}}'`,
        },
      ],
    },
    {
      id: "keep-running",
      title: {
        en: "Keep it publishing",
        zh: "保持持续发布",
      },
      body: {
        en: "Run the publisher as a service so it restarts with the machine, and alert on your own source failing rather than on the node — a provider that publishes a confidently wrong rate is worse than one that publishes nothing, because the median only protects against a minority of bad inputs.",
        zh: "把发布程序作为服务运行，使其随机器一起重启；并且要针对你自己的数据源故障告警，而不是针对节点——一个自信地发布错误汇率的提供方，比什么都不发布的提供方更糟糕，因为中位数只能防御少数错误输入。",
      },
    },
  ],

  related: [
    {
      href: "/participate/oracle-providers",
      label: { en: "The oracle provider role", zh: "预言机提供方这一角色" },
    },
    {
      href: "/specs/ofs-7000",
      label: { en: "OFS-7000 — oracles", zh: "OFS-7000——预言机" },
    },
    {
      href: "/specs/ofs-1500",
      label: { en: "OFS-1500 — service registry", zh: "OFS-1500——服务注册表" },
    },
  ],
};
