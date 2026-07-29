import type { Guide } from "./types";

/**
 * Verified against real source, not the app's display data:
 *   - staking minimums: `programs/programs/staking/src/state.rs` (there is
 *     only a flat `min_stake` plus `min_stake_arbitrator` — no per-role
 *     merchant figure on chain) and OFS-4100 §4's proposed values, which
 *     `programs/devnet-addresses.json` records as the ones actually
 *     deployed.
 *   - vault + settlement instructions: `programs/programs/escrow/src/
 *     instructions/*.rs` and the builders in `openfiat-sdks/typescript/
 *     src/onchain/escrow.ts`.
 *   - advertisement payload: `openfiat-sdks`' runnable
 *     `examples/trading_bot.ts`, whose Sell-ad literal the publish step
 *     reproduces.
 *
 * Two gaps are documented rather than papered over: no JSON-RPC method
 * submits `AdvertisementDisable`/`AdvertisementPriceUpdate` (only
 * `sendAdvertisementCreate` is registered in
 * `crates/rpc/src/methods/advertisements.rs`), and `PricingModel::Floating`
 * carries configuration but no live price resolution yet
 * (`crates/advertisements/src/record.rs` says so itself).
 */
export const becomeAMerchant: Guide = {
  slug: "become-a-merchant",
  group: "trade",

  title: {
    en: "Become a merchant",
    zh: "成为商户",
  },
  summary: {
    en: "Put up stablecoin liquidity, publish an advertisement, and settle trades against it.",
    zh: "投入稳定币流动性、发布挂单，并据此完成交易结算。",
  },
  intro: {
    en: "Merchants are the supply side of the marketplace: you park stablecoins in a vault the escrow program controls, advertise a price and the payment methods you accept, and release funds once the fiat lands. Your coins move only through the program's own instructions — no counterparty, and no node, can take them.",
    zh: "商户是市场的供给方：你把稳定币存入由履约托管程序控制的资金库，公布价格与你接受的支付方式，并在法币到账后释放资金。你的币只会通过程序自身的指令流转——无论是交易对手还是节点，都无法拿走它们。",
  },

  requirements: {
    en: [
      "A Solana wallet, plus enough SOL on devnet to pay transaction fees and account rent",
      "OPEN to bond. The devnet OPEN mint's authority is permanently unset, so nobody can mint more — on devnet it has to come from the presale allocation or an existing holder",
      "The stablecoin you intend to sell, held in a Token-2022 account owned by that same wallet",
      "Reachable access to an OpenFiat node's JSON-RPC endpoint, to publish the advertisement itself",
      "For publishing and managing ads: a script using the OpenFiat SDK. Only the bond has a browser flow today",
    ],
    zh: [
      "一个 Solana 钱包，以及 devnet 上足够支付交易手续费与账户租金的 SOL",
      "用于质押的 OPEN。devnet 上 OPEN 铸币权限已被永久移除，任何人都无法再增发——在 devnet 上只能来自预售份额或某个已持有者",
      "你打算出售的稳定币，存放在由同一钱包持有的 Token-2022 账户中",
      "可访问某个 OpenFiat 节点的 JSON-RPC 端点，用于发布挂单本身",
      "发布与管理挂单需要一个使用 OpenFiat SDK 的脚本；目前只有质押环节提供浏览器操作界面",
    ],
  },

  steps: [
    {
      id: "bond",
      title: {
        en: "Bond OPEN as a merchant",
        zh: "以商户身份质押 OPEN",
      },
      body: {
        en: "The bond is what makes spamming the order book expensive and gives the protocol something to slash for misconduct. On chain the staking program keeps a single flat minimum for every role except arbitrator, deployed with OFS-4100 §4's proposed 1,000 OPEN — the 5,000 figure in the reference app's staking page is simulated display data, not the deployed config. Read the StakingConfig account if you need the number that is actually enforced. Bonding is the one step with a real browser flow: the app's staking page builds and submits exactly the two instructions below.",
        zh: "质押的作用是让刷单变得昂贵，并让协议在出现不当行为时有东西可以罚没。在链上，质押程序对除仲裁者以外的所有角色只设一个统一的最低额，部署时采用 OFS-4100 §4 建议的 1,000 OPEN——参考应用质押页面上显示的 5,000 是模拟展示数据，并非实际部署的配置。如果你需要真正被强制执行的数值，请直接读取 StakingConfig 账户。质押是唯一提供真实浏览器操作流程的环节：应用的质押页面构建并提交的正是下面这两条指令。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { onchain } from "@openfiat/sdk";

// OPEN has 9 decimals (OFS-4100 §1).
const amount = 1_000n * 1_000_000_000n;
const from = getAssociatedTokenAddressSync(openMint, owner, false, TOKEN_2022_PROGRAM_ID);

// The stake account is per (wallet, role): one wallet can hold separate
// merchant and node-operator stakes, each its own PDA.
const instructions = [
  onchain.staking.initializeStakeAccountIx(owner, onchain.Role.Merchant),
  onchain.staking.stakeIx(owner, openMint, onchain.Role.Merchant, from, amount),
];

const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
const tx = new Transaction({ feePayer: owner, blockhash, lastValidBlockHeight }).add(...instructions);
await wallet.signAndSendTransaction(tx);`,
        },
      ],
    },
    {
      id: "vault",
      title: {
        en: "Open a liquidity vault and fund it",
        zh: "开设流动性资金库并注资",
      },
      body: {
        en: "The vault is one account per (merchant, stablecoin) whose token balance only the escrow program's own instructions can move. It tracks total, reserved, available, pending_settlement and settled separately, so a reservation can hold inventory against your advertisement without any tokens leaving yet — they move only when a trade escrow is actually funded. Note the vault and the bond are independent on chain: depositing does not check that you have staked, so bond first if you intend to advertise.",
        zh: "资金库是按（商户，稳定币）一一对应的账户，其代币余额只能由履约托管程序自身的指令来变动。它分别记录 total、reserved、available、pending_settlement 与 settled，因此一笔预订可以先占用你挂单对应的库存，而代币尚未真正转出——只有在交易履约托管被实际注资时才会转移。请注意，资金库与质押在链上是相互独立的：存入资金时并不会检查你是否已质押，所以如果你打算发布挂单，请先完成质押。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

// One vault per stablecoin you sell. Creating it also creates the
// program-owned token account that actually holds the balance.
const create = onchain.escrow.createLiquidityVaultIx(merchant, usdcMint);

// \`from\` is your own Token-2022 account for that mint.
const deposit = onchain.escrow.depositLiquidityIx(
  merchant,
  usdcMint,
  from,
  200_000n * 1_000_000n, // 200,000 USDC, 6 decimals
);`,
        },
      ],
    },
    {
      id: "publish",
      title: {
        en: "Publish the advertisement",
        zh: "发布挂单",
      },
      body: {
        en: "The advertisement is an off-chain, gossiped record: you sign it and submit it to any node, and the network propagates it. Fixed pricing works today. Floating pricing accepts an oracle provider and a premium in basis points, but the record only carries that configuration — resolving it against a live oracle mid-price is not implemented yet, so quote Fixed unless you are deliberately testing the unfinished path.",
        zh: "挂单是一条链下、通过 gossip 传播的记录：由你签名后提交给任意节点，网络会负责传播。固定价格目前可以正常使用。浮动价格可以填写预言机提供方与以基点表示的溢价，但这条记录只承载该项配置——根据实时预言机中间价进行价格解析尚未实现，因此除非你是有意测试这条尚未完成的路径，否则请使用固定价格。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { Client, advertisements, peerIdFromPublicKey, toBytes, type AdvertisementCreate } from "@openfiat/sdk";

const client = new Client({ endpoint: "http://localhost:7080", timeoutMs: 30_000 });

const create: AdvertisementCreate = {
  id: "my-usdt-kes-sell-1",
  merchant: toBytes(peerIdFromPublicKey(keypair.publicKey)),
  merchant_public_key: toBytes(keypair.publicKey),
  asset: "USDT",
  direction: "Sell",
  fiat_currency: "KES",
  // Amounts are { base_units, decimals } — 10.00 to 500.00 KES-priced trades.
  min_trade: { base_units: 1_000, decimals: 2 },
  max_trade: { base_units: 50_000, decimals: 2 },
  initial_liquidity: { base_units: 200_000, decimals: 2 },
  pricing: { Fixed: { price: { base_units: 12_950, decimals: 2 } } },
  payment_methods: ["M-Pesa"],
  timestamp: Date.now(),
};

const adId = await advertisements.sendAdvertisementCreate(client, create, keypair);`,
        },
        {
          filename: "Verify it propagated",
          code: `curl -s -X POST http://localhost:7080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getAdvertisements","params":{}}'`,
        },
      ],
    },
    {
      id: "manage",
      title: {
        en: "Changing price or pausing — not wired up yet",
        zh: "改价与暂停——目前尚未打通",
      },
      body: {
        en: "Be aware of this before you build against it. The advertisements crate defines signed AdvertisementDisable and AdvertisementPriceUpdate events, and the record has Active, Disabled, Vacation and Deleted states — but no JSON-RPC method submits either event. sendAdvertisementCreate is the only advertisement mutation a node accepts today, so in practice an ad is publish-only. Available liquidity is the exception: it is adjusted automatically by reservation and settlement activity, never by a fresh signature from you per trade.",
        zh: "在基于此开发之前请先了解这一点。advertisements crate 中定义了带签名的 AdvertisementDisable 与 AdvertisementPriceUpdate 事件，记录本身也具备 Active、Disabled、Vacation 与 Deleted 四种状态——但目前没有任何 JSON-RPC 方法可以提交这两类事件。sendAdvertisementCreate 是节点当前唯一接受的挂单变更操作，因此实际上挂单只能发布、无法修改。可用流动性是个例外：它由预订与结算活动自动调整，而不需要你为每笔交易重新签名。",
      },
    },
    {
      id: "settle",
      title: {
        en: "Confirm the fiat, then approve",
        zh: "确认法币到账后再批准",
      },
      body: {
        en: "When a buyer marks payment sent, check your own bank or mobile-money account — never the counterparty's word, and never a screenshot. Approval happens in two places: the signed off-chain event that moves the settlement's own state machine, and the on-chain approve_settlement that flips the escrow's approved flag. Approving does not move money; release_escrow is the only instruction that does, and it computes and routes the fee split at the same time.",
        zh: "当买方标记已付款时，请核对你自己的银行或移动支付账户——绝不要仅凭对方的说法，也不要凭截图。批准发生在两个地方：一是推动结算自身状态机的链下签名事件，二是链上的 approve_settlement，它会将履约托管的 approved 标志置为真。批准本身并不转移资金；release_escrow 是唯一会转移资金的指令，并会在同一步骤中计算并分配手续费。",
      },
      code: [
        {
          filename: "Off-chain — the settlement state machine",
          code: `curl -s -X POST http://localhost:7080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getSettlements","params":{}}'

# Then submit a signed SettlementApproved for the one you have verified —
# see the SDK's send_settlement_approved / sendSettlementApproved.`,
        },
        {
          filename: "On-chain — approve, then release",
          code: `import { onchain } from "@openfiat/sdk";

// Only valid while the escrow is AwaitingFiatSettlement, and only from
// the seller's own wallet — both are enforced by the program.
const approve = onchain.escrow.approveSettlementIx(merchant, reservationId);

// Permissionless once approved: it pays the buyer and splits the
// settlement fee across the four treasuries in FeeConfig.
const release = onchain.escrow.releaseEscrowIx(usdcMint, merchant, reservationId, {
  buyerTokenAccount,
  devTreasury,
  ecosystemTreasury,
  infraTreasury,
  emergencyReserve,
});`,
        },
      ],
    },
    {
      id: "withdraw",
      title: {
        en: "Taking liquidity back out",
        zh: "取回流动性",
      },
      body: {
        en: "Withdrawing only draws against the vault's available balance, so anything reserved against an open trade stays put until that trade settles, cancels or expires. Unbonding the stake is separate and deliberately slower: you request it, wait out the unbonding period, then withdraw. Effective stake drops the moment you request, not when the timer ends — so unbonding costs you eligibility immediately.",
        zh: "提取资金只能动用资金库中 available 的余额，因此任何已被未完成交易占用的部分都会保留在库中，直到该交易完成结算、被取消或过期。解除质押是另一回事，而且有意设计得更慢：先发起申请，等待解绑期结束，再提取。有效质押在你发起申请的那一刻就会减少，而不是等到计时结束——因此一旦开始解绑，你会立即失去相应资格。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

const pullOut = onchain.escrow.withdrawLiquidityIx(merchant, usdcMint, to, 50_000n * 1_000_000n);

// Unbonding: request, wait out StakingConfig.unbonding_period_secs, withdraw.
const request = onchain.staking.requestUnstakeIx(owner, onchain.Role.Merchant, 1_000n * 1_000_000_000n);
const collect = onchain.staking.withdrawUnstakedIx(owner, openMint, onchain.Role.Merchant, to);`,
        },
      ],
    },
  ],

  related: [
    {
      href: "/participate/merchants",
      label: { en: "The merchant role", zh: "商户这一角色" },
    },
    {
      href: "/specs/ofs-2100",
      label: { en: "OFS-2100 — advertisements", zh: "OFS-2100——挂单" },
    },
    {
      href: "/specs/ofs-2300",
      label: { en: "OFS-2300 — settlement", zh: "OFS-2300——结算" },
    },
    {
      href: "/specs/ofs-4200",
      label: {
        en: "OFS-4200 — on-chain programs",
        zh: "OFS-4200——链上程序",
      },
    },
  ],
};
