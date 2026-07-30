import type { Guide } from "./types";

/**
 * The developer quickstart. Every command and symbol here was checked
 * against real source: the SDK entry points (`openfiat-sdks/{rust,typescript}
 * /src`), the node's own router (`openfiat-core/crates/{rpc,api}/src/server.rs`)
 * and its method table (`crates/rpc/src/methods/*.rs`).
 *
 * Two things this guide states that a reader would otherwise assume wrongly:
 * neither SDK is published to crates.io or npm (the reference app depends on
 * a pinned GitHub commit, and the repo has no publish workflow), and the
 * TypeScript SDK covers far fewer domains than the Rust one.
 */
export const buildOnOpenfiat: Guide = {
  slug: "build-on-openfiat",
  group: "build",

  title: {
    en: "Build on OpenFiat",
    zh: "在 OpenFiat 之上开发",
  },
  summary: {
    en: "Point a client at a node, read marketplace state, and submit your first signed write.",
    zh: "把客户端指向一个节点，读取市场状态，并提交你的第一个签名写入。",
  },
  intro: {
    en: "There are two surfaces to build against, and they work differently. The peer-to-peer marketplace — advertisements, reservations, reputation, oracles — is JSON-RPC against any node. Money movement is Anchor programs on Solana. This walks through the first surface, then shows where the second one starts.",
    zh: "可供开发的接口有两套，运作方式并不相同。点对点市场——挂单、预订、信誉、预言机——通过 JSON-RPC 访问任意节点即可。而资金流转则由 Solana 上的 Anchor 程序负责。本指南先讲清第一套接口，再说明第二套从哪里开始。",
  },

  requirements: {
    en: [
      "A node to talk to — run one locally, or use any node whose JSON-RPC endpoint you can reach",
      "Rust, or Node.js 20+ for TypeScript — those are the two SDKs that actually work today",
      "No API key, and no account. Writes authenticate with your own signature, so nobody issues you credentials",
      "A Solana wallet only if you plan to touch the on-chain programs; the marketplace surface does not need one",
    ],
    zh: [
      "一个可以对话的节点——在本地跑一个，或使用任意一个你能访问其 JSON-RPC 端点的节点",
      "Rust，或用于 TypeScript 的 Node.js 20+——目前真正可用的只有这两个 SDK",
      "不需要 API key，也不需要账号。写入操作靠你自己的签名来验证身份，因此没有人会给你发放凭证",
      "只有在需要操作链上程序时才需要 Solana 钱包；市场接口本身并不需要",
    ],
  },

  steps: [
    {
      id: "node",
      title: {
        en: "Get a node to talk to",
        zh: "先准备一个可对话的节点",
      },
      body: {
        en: "Everything a client does goes through a node. One process serves the whole surface on a single HTTP port: JSON-RPC at POST /rpc, a WebSocket event stream at GET /ws, plus /health, /metrics, /openrpc.json and /docs. Note that you give an SDK the base URL — it appends /rpc itself, so passing a URL that already ends in /rpc will not work.",
        zh: "客户端的所有操作都要经由节点完成。一个进程在同一个 HTTP 端口上提供全部接口：POST /rpc 提供 JSON-RPC，GET /ws 提供 WebSocket 事件流，另有 /health、/metrics、/openrpc.json 与 /docs。请注意：传给 SDK 的是基础 URL，SDK 会自行追加 /rpc，因此传入已经以 /rpc 结尾的地址是行不通的。",
      },
      code: [
        {
          code: `# From a clone of openfiat-core. The package is openfiat-cli;
# the binary it produces is openfiat-node.
cargo run -p openfiat-cli -- --rpc-bind-address 127.0.0.1:7080

# In another shell:
curl -s http://localhost:7080/health
# ok`,
        },
      ],
    },
    {
      id: "explore",
      title: {
        en: "See what the node can actually do",
        zh: "查看节点实际支持哪些方法",
      },
      body: {
        en: "Before writing any code, read the node's own description of itself. It serves an OpenRPC document generated from its live method table, so it lists exactly the methods that this build of the node implements — it cannot drift from the code the way a hand-written API page does. There is also a self-contained reference page that loads that document and runs methods against /rpc in the browser.",
        zh: "在动手写代码之前，先读一下节点对自身的描述。它提供的 OpenRPC 文档是由运行中的方法表实时生成的，因此列出的正是该版本节点真正实现的方法——不会像手写的 API 页面那样与代码脱节。此外还有一个独立的参考页面，它会加载该文档，并可直接在浏览器中针对 /rpc 调用这些方法。",
      },
      code: [
        {
          code: `# Every method this node serves, straight from its own method table.
curl -s http://localhost:7080/openrpc.json | jq '.methods[].name'

# The same document, rendered as an interactive reference you can
# call methods from — browse to:
#   http://localhost:7080/docs`,
        },
      ],
    },
    {
      id: "install",
      title: {
        en: "Add an SDK",
        zh: "引入 SDK",
      },
      body: {
        en: "Neither SDK is published to crates.io or npm yet — the repository has no publish workflow, so depend on it from Git and pin a commit. That is exactly what the reference web app does. You can also just clone the monorepo and run its examples in place, which is the fastest way to see a real round trip.",
        zh: "两个 SDK 目前都尚未发布到 crates.io 或 npm——仓库中没有任何发布流程，因此请直接以 Git 依赖的方式引入，并锁定到某个提交。官方参考网页应用用的正是这种方式。你也可以直接克隆这个 monorepo 并就地运行其中的示例，这是看到一次真实往返调用的最快途径。",
      },
      code: [
        {
          filename: "Cargo.toml",
          code: `[dependencies]
openfiat-sdk = { git = "https://github.com/OpenFiat-org/openfiat-sdks", rev = "<commit>", package = "openfiat-sdk" }
tokio = { version = "1", features = ["macros", "rt-multi-thread"] }`,
        },
        {
          filename: "package.json",
          code: `{
  "dependencies": {
    "@openfiat/sdk": "github:OpenFiat-org/openfiat-sdks#<commit>&path:typescript"
  }
}`,
        },
        {
          filename: "Or run the examples in place",
          code: `git clone https://github.com/OpenFiat-org/openfiat-sdks
cd openfiat-sdks

# Rust: registers a service provider and publishes a signed rate.
(cd rust && cargo run --example oracle_provider)

# TypeScript: the same example, same default endpoint.
(cd typescript && pnpm install && pnpm tsx examples/oracle_provider.ts)`,
        },
      ],
    },
    {
      id: "read",
      title: {
        en: "Make a read call",
        zh: "发起一次读取调用",
      },
      body: {
        en: "Reads need no key and no signature. The two SDKs shape this differently: in Rust the typed methods hang off Client itself, while in TypeScript they are functions in a per-domain namespace that take the client as their first argument.",
        zh: "读取操作既不需要密钥也不需要签名。两个 SDK 在写法上有所不同：Rust 中这些类型化方法直接挂在 Client 上，而 TypeScript 中它们是按领域划分的命名空间下的函数，并以 client 作为第一个参数。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_sdk::{Client, ClientConfig};

// The base URL — the SDK appends /rpc itself.
let client = Client::new(ClientConfig {
    endpoint: "http://localhost:7080".to_string(),
    ..ClientConfig::default()
});

println!("node version: {}", client.get_version().await?);

let ads = client.get_advertisements().await?;
println!("{} advertisements on this node", ads.len());`,
        },
        {
          filename: "TypeScript",
          code: `import { Client, advertisements, node } from "@openfiat/sdk";

const client = new Client({ endpoint: "http://localhost:7080", timeoutMs: 30_000 });

console.log("node version:", await node.getVersion(client));

const ads = await advertisements.getAdvertisements(client);
console.log(ads.length, "advertisements on this node");`,
        },
      ],
    },
    {
      id: "write",
      title: {
        en: "Submit a signed write",
        zh: "提交一次签名写入",
      },
      body: {
        en: "Every write follows one model: you build the domain's unsigned event, the SDK signs it with your Ed25519 key, JSON-encodes it, and submits it as a sendX call. The node verifies that signature itself, which is why there is no API key anywhere — authority comes from the key, not from an account someone granted you. Use a persistent wallet.json rather than a fresh key each run: reputation attaches to the key, so a new one starts from nothing.",
        zh: "所有写入都遵循同一套模型：你构造该领域的未签名事件，SDK 用你的 Ed25519 密钥签名、编码为 JSON，再作为 sendX 调用提交。节点会自行校验这个签名——这正是整套流程中不存在 API key 的原因：权限来自密钥本身，而不是别人给你开通的账号。请使用一份持久化的 wallet.json，而不要每次运行都生成新密钥：信誉是绑定在密钥上的，换新密钥就等于从零开始。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_sdk::wallet::{keypair_from_wallet, solana_keyfile};

// Solana CLI wallet.json format — the same file the node itself uses.
let wallet = solana_keyfile::load("/etc/openfiat/wallet.json")?;
let keypair = keypair_from_wallet(&wallet);

// Every send_* takes the domain's unsigned event plus your keypair.
// See the merchant guide for how to fill in an AdvertisementCreate.
let id = client.send_advertisement_create(create, &keypair).await?;`,
        },
        {
          filename: "TypeScript",
          code: `import { advertisements } from "@openfiat/sdk";
// File I/O lives in a separate entry point, so the main one stays
// browser- and edge-safe.
import { loadWalletFile } from "@openfiat/sdk/node";

const wallet = await loadWalletFile("/etc/openfiat/wallet.json");

const id = await advertisements.sendAdvertisementCreate(client, create, wallet.keypair);`,
        },
      ],
    },
    {
      id: "onchain",
      title: {
        en: "Where the second surface starts",
        zh: "第二套接口从哪里开始",
      },
      body: {
        en: "Anything that moves money is an Anchor program on Solana, not a node call: escrow, staking, governance. The SDKs give you typed instruction builders for all three, with PDA derivation and Anchor's wire format handled for you — but they deliberately stop there. They never construct, sign or submit a Solana transaction on your behalf. You assemble the instructions, sign with your own Solana keypair, and relay the transaction through a node so it reaches the chain the same way whether that node has its own Solana RPC connection or only gossip.",
        zh: "凡是涉及资金流转的部分，都由 Solana 上的 Anchor 程序负责，而不是节点调用：履约托管、质押、治理都是如此。两个 SDK 都为这三者提供了类型化的指令构造器，PDA 推导与 Anchor 的编码格式都已处理好——但它们有意只做到这一步，绝不会替你构造、签名或提交 Solana 交易。你需要自己组装指令、用自己的 Solana 密钥签名，再通过节点转发该交易；无论该节点自身是否连接了 Solana RPC，还是只有 gossip，转发行为都是一致的。",
      },
      code: [
        {
          filename: "Rust",
          code: `use openfiat_sdk::onchain::{Role, staking};

// Returns a plain solana_instruction::Instruction — nothing is signed
// or submitted here.
let ix = staking::stake_ix(&owner, Role::Arbitrator, &mint, &from, amount);

// Build a transaction with this blockhash, sign it yourself, then relay:
let blockhash = client.get_latest_blockhash().await?.blockhash;
client.send_transaction(&signed_tx).await?;`,
        },
        {
          filename: "Devnet program ids",
          code: `# Deployed to devnet only — there is no mainnet deployment.
escrow      HaPpM1QYM3dKp3sX7zhEdft9hB6ncu6xfALAbkyQChQP
staking     HYEXk8XQukBkZbiYB33JyVefQDxqyCpPudad3wBCyYmx
governance  AVJfKUjHsizkGGUy8sdz4Xma2hVgmgvgg8GmUMs8E4eE`,
        },
      ],
    },
    {
      id: "pick-a-language",
      title: {
        en: "Pick a language with your eyes open",
        zh: "在了解现状的前提下选择语言",
      },
      body: {
        en: "The two SDKs are not at parity, and the gap will decide your language for you. Rust has typed methods for every domain the node serves — sixteen of them, including disputes, governance, settlement, trade, reputation and identity. TypeScript covers seven: advertisements, chain, node, notifications, oracles, providers and reservations, plus the on-chain instruction builders. Anything outside those seven still works from TypeScript, but you call it through the client's generic call method and type the result yourself. Python is a typed stub whose one method raises NotImplementedYetError, and the Go, Swift, Kotlin and C# directories contain a README and nothing else. Neither SDK wraps the WebSocket stream at /ws, so use a plain WebSocket client if you want live events.",
        zh: "两个 SDK 的完成度并不一致，而这一差距很可能直接决定你的语言选择。Rust 为节点提供的每一个领域都实现了类型化方法——共十六个，涵盖争议、治理、结算、交易、信誉与身份。TypeScript 覆盖其中七个：挂单、链桥、节点、通知、预言机、服务提供方与预订，另加链上指令构造器。这七个之外的方法在 TypeScript 中依然可用，但需要通过客户端的通用 call 方法调用，并自行声明返回类型。Python 目前是一个类型化的占位实现，其唯一的方法会抛出 NotImplementedYetError；而 Go、Swift、Kotlin 与 C# 目录下除了一个 README 之外别无他物。两个 SDK 都没有封装 /ws 的 WebSocket 事件流，如需实时事件，请使用普通的 WebSocket 客户端。",
      },
      code: [
        {
          filename: "TypeScript — a domain without a typed module",
          code: `// getDisputes has no typed wrapper in the TypeScript SDK yet.
// call() reaches any method the node serves; you supply the types.
const disputes = await client.call<Record<string, never>, unknown[]>(
  "getDisputes",
  {},
);`,
        },
      ],
    },
  ],

  related: [
    {
      href: "/participate/developers",
      label: { en: "The developer role", zh: "开发者这一角色" },
    },
    {
      href: "/guides/run-an-oracle-provider",
      label: {
        en: "A complete worked example: run an oracle provider",
        zh: "一个完整的实例：运行预言机提供方",
      },
    },
    {
      href: "/run-a-node",
      label: { en: "Run your own node", zh: "运行你自己的节点" },
    },
    {
      href: "/specs/ofs-8000",
      label: {
        en: "OFS-8000 — error code registry",
        zh: "OFS-8000——错误码登记表",
      },
    },
  ],
};
