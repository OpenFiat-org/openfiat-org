import type { Guide } from "./types";

/**
 * Every figure in this guide was read off the deployed devnet
 * `StakingConfig` (min_stake 1,000 OPEN, min_stake_arbitrator 10,000 OPEN,
 * unbonding 604,800s, slash_bps 1000), not copied from a design document —
 * and the guide says plainly that the program does not currently enforce
 * those two minimums, because nothing in
 * `openfiat-core/programs/programs/staking` reads them.
 */
export const stakeOpen: Guide = {
  slug: "stake-open",
  group: "operate",

  title: {
    en: "Stake OPEN for a role",
    zh: "为某个角色质押 OPEN",
  },
  summary: {
    en: "Bond OPEN to a protocol role, unbond it, and understand what can be slashed.",
    zh: "为某个协议角色质押 OPEN、解除质押，并了解哪些情况会被罚没。",
  },
  intro: {
    en: "Almost every role beyond buying does something that could hurt somebody else if done carelessly, so those roles put OPEN at risk before they get to do it. Staking is that deposit. It stays yours, and it can be cut if you misbehave. It does not pay you anything today. The reward calculation now exists and nodes publish the liveness observations it runs on, but nobody is running the submission step on devnet and the rewards vault is empty, so no stake has yet earned a token.",
    zh: "除买方之外，几乎每一种角色所做的事，一旦草率行事都可能损害他人，因此这些角色必须先让自己的 OPEN 承担风险，才能获得相应权限。质押就是这笔保证金。它仍归你所有，在你行为不当时可能被削减；但目前它不会带来任何收益。奖励的计算逻辑现已实现，节点也会公布其所依据的存活性观测数据，但 devnet 上尚无人执行提交环节，且奖励金库为空，因此还没有任何质押真正获得过一枚代币。",
  },

  requirements: {
    en: [
      "A Solana wallet on devnet, holding some SOL for transaction fees",
      "OPEN in that wallet as a Token-2022 account — see the step below on where OPEN comes from",
      "The role you intend to take: one stake account per (wallet, role), so decide before you open one",
      "For anything past staking itself — unbonding, withdrawing, claiming rewards — a script using the SDK, since only staking has a browser flow today",
    ],
    zh: [
      "一个 devnet 上的 Solana 钱包，并持有少量 SOL 用于支付交易手续费",
      "该钱包中持有 OPEN，且为 Token-2022 账户——OPEN 从何而来请见下文对应步骤",
      "明确你要担任的角色：每个（钱包，角色）组合对应一个独立的质押账户，因此请先确定再创建",
      "除质押本身之外的操作——解除质押、提取、领取奖励——都需要用 SDK 编写脚本，因为目前只有质押提供了浏览器操作界面",
    ],
  },

  steps: [
    {
      id: "what-stake-is",
      title: {
        en: "What stake is, and what it is not",
        zh: "质押是什么，又不是什么",
      },
      body: {
        en: "Stake is a deposit you keep ownership of, not a fee you pay to anyone. It is not reputation either, and it cannot be turned into reputation: an operator who performs badly cannot make up for it by staking more, because reputation is earned from completed work and tracked separately. What stake actually buys is skin in the game — a number the protocol can reduce if you break a rule, which is what makes strangers willing to rely on you.",
        zh: "质押是一笔你仍然拥有所有权的保证金，而不是付给谁的费用。它也不是信誉，更无法转化为信誉：表现糟糕的运营者无法靠多质押来弥补，因为信誉来自已完成的工作，并且是单独记录的。质押真正带来的是「利益绑定」——一个在你违规时协议可以削减的数字，正是它让陌生人愿意信任你。",
      },
    },
    {
      id: "choose-a-role",
      title: {
        en: "Choose the role you are staking for",
        zh: "选择你要质押的角色",
      },
      body: {
        en: "There are seven staked roles, and a stake account is keyed by (owner, role) — so one wallet can hold completely independent stakes under several roles at once, each with its own balance and its own unbonding timer. The role is fixed when you open the account; to move stake between roles you unbond from one and stake into the other.",
        zh: "共有七种需要质押的角色，质押账户以（所有者，角色）为键——因此同一个钱包可以同时持有多个角色下彼此完全独立的质押，各自拥有独立的余额与解押计时。角色在创建账户时即确定；若要在角色之间转移质押，需要先从一个角色解押，再质押到另一个角色。",
      },
      code: [
        {
          filename: "The seven roles, and their on-chain values",
          code: `Merchant                  = 0
Arbitrator                = 1
NodeOperator              = 2
NotificationProvider      = 3
OracleProvider            = 4
RiskIntelligenceProvider  = 5
SnapshotProvider          = 6

// The stake account's address is derived from the pair, so the role is
// part of the account's identity rather than a field you can change:
//     seeds = ["stake", owner_pubkey, role_as_u8]`,
        },
      ],
    },
    {
      id: "get-open",
      title: {
        en: "Get OPEN into your wallet",
        zh: "先让钱包持有 OPEN",
      },
      body: {
        en: "The devnet OPEN mint's mint authority is permanently unset — the full billion-token supply was minted once at genesis and nobody, including the project, can ever create more. So there is no faucet and no way to mint yourself test OPEN: on devnet it has to be sent to you by someone already holding it from the genesis distribution. Your wallet also needs a Token-2022 account for the mint before it can receive any.",
        zh: "devnet 上 OPEN 铸币的铸造权限已被永久移除——十亿枚的全部供应量在创世时一次性铸造完成，此后包括项目方在内的任何人都无法再增发。因此这里没有水龙头，你也无法自行铸造测试用的 OPEN：在 devnet 上，只能由已从创世分配中持有 OPEN 的人转给你。此外，你的钱包必须先拥有该铸币对应的 Token-2022 账户，才能接收 OPEN。",
      },
      code: [
        {
          code: `# The devnet OPEN mint. Note "Mint authority: (not set)" — the supply
# is fixed at 1,000,000,000 OPEN (9 decimals) and cannot grow.
spl-token display 29w8TroBTYoaqrXBDcpv5L54VZRA8Kf7kU5U1cakvFdj --url devnet

# Your own balance for that mint, once somebody has sent you some.
spl-token balance 29w8TroBTYoaqrXBDcpv5L54VZRA8Kf7kU5U1cakvFdj --url devnet`,
        },
      ],
    },
    {
      id: "open-and-fund",
      title: {
        en: "Open a stake account and fund it",
        zh: "创建质押账户并注入资金",
      },
      body: {
        en: "Two instructions: one creates the account for your (wallet, role) pair, the other moves OPEN from your token account into the program's vault. The account only needs creating once, so a real client checks whether it already exists and sends just the stake instruction if so. The easiest route is the Stake page in the OpenFiat app, which connects your wallet and does exactly this — though its form currently offers only merchant, node operator, arbitrator and notification provider, so the other three roles need the SDK.",
        zh: "需要两条指令：一条为你的（钱包，角色）组合创建账户，另一条把 OPEN 从你的代币账户转入程序金库。账户只需创建一次，因此实际的客户端会先检查它是否已存在，若已存在则只发送质押指令。最简单的方式是使用 OpenFiat 应用中的质押页面，连接钱包后它执行的正是上述操作——不过该表单目前只提供商户、节点运营者、仲裁者与通知提供方四种角色，其余三种角色仍需通过 SDK 操作。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { onchain } from "@openfiat/sdk";

const mint = new PublicKey("29w8TroBTYoaqrXBDcpv5L54VZRA8Kf7kU5U1cakvFdj");
const role = onchain.Role.NodeOperator;

// Where your OPEN actually sits. Token-2022, not the older token program.
const from = getAssociatedTokenAddressSync(mint, owner, false, TOKEN_2022_PROGRAM_ID);

// OPEN has 9 decimals, so amounts are in units of 1e-9 OPEN.
const amount = 1_000n * 1_000_000_000n;

// Skip initializeStakeAccountIx if this (wallet, role) already has one —
// the instruction creates the account and will fail if it exists.
const instructions = [
  onchain.staking.initializeStakeAccountIx(owner, role),
  onchain.staking.stakeIx(owner, mint, role, from, amount),
];

const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
const tx = new Transaction({ feePayer: owner, blockhash, lastValidBlockHeight }).add(...instructions);
const { signature } = await wallet.signAndSendTransaction(tx);
await connection.confirmTransaction({ signature, blockhash, lastValidBlockHeight }, "confirmed");`,
        },
        {
          filename: "Rust — note the argument order differs from TypeScript",
          code: `use openfiat_sdk::onchain::{staking, Role};

let role = Role::NodeOperator;
let amount = 1_000 * 1_000_000_000u64; // 1,000 OPEN, 9 decimals

let instructions = vec![
    staking::initialize_stake_account_ix(&owner, role),
    staking::stake_ix(&owner, role, &mint, &from, amount),
];`,
        },
      ],
    },
    {
      id: "check-the-limits",
      title: {
        en: "Read the real limits, do not trust a number in a document",
        zh: "读取真实参数，而不要相信文档中的数字",
      },
      body: {
        en: "Minimums, the unbonding period and the slash percentage all live in a single on-chain StakingConfig account, and governance can change them — so the authoritative values are the ones you read, not the ones written here. Worth knowing: the program stores both minimums but does not currently enforce either, so a stake below the stated minimum will be accepted on-chain today. Treat them as the bar you are expected to meet, not a guard rail that will stop you.",
        zh: "最低质押量、解押周期与罚没比例都保存在链上唯一的 StakingConfig 账户中，且治理机制可以修改它们——因此以你实际读取到的数值为准，而不是本文写下的数字。需要特别注意：程序虽然存储了两项最低质押量，但目前并不对其做任何强制校验，因此当前质押低于所述最低值仍会被链上接受。请把它们视为你应当达到的标准，而不是会拦住你的护栏。",
      },
      code: [
        {
          filename: "The values deployed on devnet at the time of writing",
          code: `min_stake              1,000 OPEN     # all roles
min_stake_arbitrator  10,000 OPEN     # arbitrators, a higher bar
unbonding_period_secs   604,800       # 7 days
slash_bps                  1,000      # 10% of the active stake

# Read them yourself rather than trusting the above — the account is a
# singleton PDA, so its address is fixed:
#     seeds = ["staking_config"]   program HYEXk8XQukBkZbiYB33JyVefQDxqyCpPudad3wBCyYmx`,
        },
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

const [stakingConfig] = onchain.staking.stakingConfigPda();
const account = await connection.getAccountInfo(stakingConfig);

// The SDK builds instructions but does not decode accounts yet. The
// layout after the 8-byte discriminator is:
//   admin(32) mint(32) min_stake(8) min_stake_arbitrator(8)
//   unbonding_period_secs(8) slash_bps(2) ...
// openfiat-app's lib/onchain-decode.ts has a working decoder to copy.`,
        },
      ],
    },
    {
      id: "unbond",
      title: {
        en: "Unbond when you want out",
        zh: "需要退出时解除质押",
      },
      body: {
        en: "Requesting an unstake moves the amount out of your active stake immediately, before you get the tokens back — deliberately, so nobody can request an unbond and keep voting with, or claiming eligibility from, stake they are already withdrawing. The tokens themselves stay locked until the unbonding period elapses. One catch worth planning around: a stake account tracks a single unbonding batch, so a second request merges into the first and pushes the release time out to a fresh full period from that moment.",
        zh: "发起解押请求会立即把相应金额从你的有效质押中扣除，早于你实际拿回代币——这是刻意设计的，以防有人一边申请解押、一边仍用这笔即将撤出的质押去投票或主张资格。代币本身则会一直锁定到解押周期结束。有一点需要提前规划：每个质押账户只跟踪一批解押，因此第二次请求会并入第一批，并把释放时间重新推迟为从该时刻起的完整周期。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

// There is no browser flow for this yet — unbonding, withdrawing and
// claiming rewards are SDK-only today.
const ix = onchain.staking.requestUnstakeIx(owner, role, 500n * 1_000_000_000n);`,
        },
        {
          filename: "Rust",
          code: `use openfiat_sdk::onchain::staking;

let ix = staking::request_unstake_ix(&owner, role, 500 * 1_000_000_000u64);`,
        },
      ],
    },
    {
      id: "withdraw",
      title: {
        en: "Withdraw once the period is up",
        zh: "周期结束后提取",
      },
      body: {
        en: "Withdrawing takes no amount: it returns the whole unbonding balance at once, and only once the release time has passed — earlier attempts fail rather than paying out partially. You choose the destination token account, which must be for the OPEN mint.",
        zh: "提取操作不需要指定金额：它会一次性返还全部处于解押状态的余额，且必须在释放时间到达之后才能执行——过早尝试会直接失败，而不会部分支付。你可以指定接收的代币账户，但它必须对应 OPEN 铸币。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `const ix = onchain.staking.withdrawUnstakedIx(owner, mint, role, destinationTokenAccount);`,
        },
        {
          filename: "Rust",
          code: `let ix = staking::withdraw_unstaked_ix(&owner, role, &mint, &destination_token_account);`,
        },
      ],
    },
    {
      id: "rewards-and-slashing",
      title: {
        en: "Rewards accrue; slashing subtracts",
        zh: "奖励会累积，罚没则会扣减",
      },
      body: {
        en: "No rewards have been distributed to anyone yet, though the gap is narrower than it was. The calculation is real: a node records which peers it heard from across an epoch, and a share is computed from stake weighted by connectivity and availability, paying a node genuinely connected to Solana RPC more than one only gossiping. What is missing is the last two steps — nobody runs the submission on devnet, and no instruction funds the rewards vault, whose balance is zero. So every pending balance is zero and claiming fails. Treat staking as something you do to be allowed to act, not to earn. When rewards do arrive they sit as a pending balance until claimed, so they never quietly change the stake figure your role eligibility is measured against. Slashing runs the other way: a slashing authority can cut a fixed percentage of your active stake, the forfeited tokens go to a treasury rather than being burned, and the total is recorded permanently on your account. Only your active stake is exposed — anything already unbonding is not.",
        zh: "目前仍未向任何人发放过奖励，但差距已经缩小。计算部分是真实存在的：节点会记录在一个周期内听到过哪些对等节点，并据此按质押量乘以连通性与可用性来计算份额，真正连接 Solana RPC 的节点收益高于仅参与 gossip 的节点。缺的是最后两步——devnet 上无人执行提交，且没有任何指令为奖励金库注资，其余额为零。因此所有待领取余额均为零，领取操作会失败。请把质押视为获得行为资格的前提，而不是收益来源。将来奖励到账后会以待领取余额的形式存在，直到你主动领取，因此不会悄悄改变用于衡量角色资格的质押数额。罚没的方向则相反：罚没授权方可以按固定比例削减你的有效质押，被没收的代币会进入国库而非被销毁，累计罚没额会永久记录在你的账户上。只有有效质押会承担这一风险——已进入解押状态的部分不会。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `// Claiming pays out the whole pending balance. Today that balance is always
// zero for everyone, because nothing distributes rewards yet, so this fails.
const ix = onchain.staking.claimRewardsIx(owner, mint, role, destinationTokenAccount);`,
        },
        {
          filename: "Rust",
          code: `let ix = staking::claim_rewards_ix(&owner, role, &mint, &destination_token_account);`,
        },
      ],
    },
  ],

  related: [
    {
      href: "https://app.openfiat.network/staking",
      label: {
        en: "Stake in the OpenFiat app",
        zh: "在 OpenFiat 应用中质押",
      },
      external: true,
    },
    {
      href: "/become-an-arbitrator",
      label: {
        en: "Become an arbitrator — the role with the higher bar",
        zh: "成为仲裁者——门槛更高的角色",
      },
    },
    {
      href: "/specs/ofs-4100",
      label: { en: "OFS-4100 — tokenomics", zh: "OFS-4100——代币经济模型" },
    },
    {
      href: "/specs/ofs-4200",
      label: {
        en: "OFS-4200 — on-chain program architecture",
        zh: "OFS-4200——链上程序架构",
      },
    },
  ],
};
