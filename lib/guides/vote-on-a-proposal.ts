import type { Guide } from "./types";

/**
 * Written against the real `openfiat-governance` program
 * (`openfiat-core/programs/programs/governance`) and the real off-chain
 * governance RPC path (`crates/rpc/src/methods/governance.rs` plus
 * `actor::poll_vote_verifications`). Two separate mechanisms exist and the
 * guide keeps them separate: the on-chain vote is the authoritative tally,
 * the off-chain one is a gossiped mirror whose weight is independently
 * re-derived from chain state before anything is recorded.
 */
export const voteOnAProposal: Guide = {
  slug: "vote-on-a-proposal",
  group: "operate",

  title: {
    en: "Vote on a proposal",
    zh: "对提案进行投票",
  },
  summary: {
    en: "Stake-weighted governance: create an OFIP, vote on one, and see how quorum and threshold are settled.",
    zh: "按质押加权的治理：创建 OFIP、对提案投票，并了解法定人数与通过门槛如何结算。",
  },
  intro: {
    en: "Protocol changes are decided by OpenFiat Improvement Proposals — OFIPs — and voting weight comes from stake you have actually bonded, never from what a client claims. This walks through creating a proposal, casting a vote, and how the result is tallied. It is also honest about the part that is not finished: an accepted proposal is recorded as authorized, but the programs it would change cannot yet be changed by it.",
    zh: "协议变更通过 OpenFiat 改进提案（OFIP）决定，投票权重来自你实际质押的资产，而绝不取决于客户端声称的数字。本指南讲解如何创建提案、如何投票，以及结果如何计票。同时也会如实说明尚未完成的部分：被通过的提案会被记录为已授权，但它想要修改的程序目前还无法真正被它修改。",
  },

  requirements: {
    en: [
      "A Solana wallet with some devnet SOL for transaction fees",
      "OPEN bonded under at least one role — voting weight is read from that stake account, so a wallet with no stake has no vote",
      "OPEN to cover the proposal deposit, if you intend to create a proposal rather than only vote",
      "The devnet OPEN mint's mint authority is permanently unset, so nobody can mint OPEN — any OPEN you stake has to be OPEN you already hold",
    ],
    zh: [
      "一个持有少量 devnet SOL 用于支付交易手续费的 Solana 钱包",
      "至少在一种角色下质押了 OPEN——投票权重取自该质押账户，因此没有质押的钱包没有投票权",
      "若你打算创建提案而不只是投票，还需要足够的 OPEN 来支付提案保证金",
      "devnet 上 OPEN 铸币权限已被永久移除，任何人都无法增发 OPEN——你质押的 OPEN 必须是你已经持有的",
    ],
  },

  steps: [
    {
      id: "what-governance-decides",
      title: {
        en: "Know what a vote can and cannot change",
        zh: "了解投票能改变什么、不能改变什么",
      },
      body: {
        en: "Every proposal carries one of six categories: Informational, Standards, Parameter, Treasury, ProtocolUpgrade and Constitutional. The category is not a label — it selects the quorum and approval threshold the proposal will be held to, with ProtocolUpgrade and Constitutional held to the highest bar and Treasury to its own. Be aware of a real limitation before you write one: for an accepted Parameter or Treasury proposal, the program marks the proposal executed and stops there. It does not yet reach into the escrow or staking programs to change a value, and governance holds no treasury vault to disburse from. Both are honest gaps, not oversights — the target programs are still admin-gated and do not recognise the governance PDA as an authority.",
        zh: "每个提案都属于六个类别之一：Informational（信息性）、Standards（标准）、Parameter（参数）、Treasury（国库）、ProtocolUpgrade（协议升级）与 Constitutional（宪章性）。类别不只是一个标签——它决定了该提案适用的法定人数与通过门槛，其中 ProtocolUpgrade 与 Constitutional 适用最高标准，Treasury 则有自己的门槛。在撰写提案前请注意一个真实的限制：对于已通过的 Parameter 或 Treasury 提案，程序只会把提案标记为已执行，然后就结束了。它目前不会真的去修改履约托管或质押程序中的数值，治理本身也没有可供支出的国库金库。这两点都是如实存在的缺口，而非疏漏——目标程序仍由 admin 控制，尚未将治理 PDA 识别为有效授权方。",
      },
    },
    {
      id: "stake-first",
      title: {
        en: "Bond stake before you vote",
        zh: "先质押，再投票",
      },
      body: {
        en: "Voting weight is the effective stake on your stake account for the role you vote under — the bonded amount, excluding anything you have already requested to unbond. Requesting an unstake therefore reduces your weight immediately, not when the unbonding period ends. A wallet may hold independent stakes under several roles, but the vote record is keyed by proposal and voter only, so you still get exactly one vote per proposal no matter how many roles you hold.",
        zh: "投票权重等于你所使用角色对应质押账户上的有效质押量——即已锁定的数额，不包含你已申请解绑的部分。因此，一旦申请解绑，你的权重会立即下降，而不是等到解绑期结束才下降。一个钱包可以在多个角色下分别持有质押，但投票记录仅以提案与投票者为键，所以无论你持有多少种角色，每个提案你都只有一票。",
      },
    },
    {
      id: "create-a-proposal",
      title: {
        en: "Create a proposal",
        zh: "创建提案",
      },
      body: {
        en: "Creating a proposal transfers a deposit from your token account into the program's deposit vault, and snapshots this category's quorum and threshold onto the proposal itself — so a later config change never moves the goalposts on a vote already under way. Only hashes of the title and summary go on chain; the readable text travels over the off-chain governance layer instead. That split is why a client reading chain state alone can show a proposal's id, category and tallies but not its title.",
        zh: "创建提案会把一笔保证金从你的代币账户转入程序的保证金金库，同时把该类别的法定人数与通过门槛快照到提案本身——这样即使之后修改配置，也不会改变一个正在进行中的投票的标准。链上只保存标题与摘要的哈希；可读的正文则通过链下治理层传播。正因为这种拆分，仅读取链上状态的客户端能显示提案的编号、类别与票数，却无法显示它的标题。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

// Category selects the quorum and threshold this proposal is judged by.
const ix = onchain.governance.createProposalIx(
  proposer,
  mint,
  from,                                 // your OPEN token account, funds the deposit
  42n,                                  // proposal id
  onchain.ProposalCategory.Parameter,
  titleHash,                            // sha256 of the title, 32 bytes
  summaryHash,                          // sha256 of the summary, 32 bytes
  604_800n,                             // voting period, in seconds
);`,
        },
        {
          filename: "Publishing the readable text",
          code: `# The on-chain proposal stores only hashes. Publish the actual title and
# summary to the off-chain governance layer so people can read what they
# are voting on.
curl -s -X POST http://localhost:7080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getProposals","params":{}}'`,
        },
      ],
    },
    {
      id: "cast-a-vote",
      title: {
        en: "Cast your vote",
        zh: "投出你的票",
      },
      body: {
        en: "The vote instruction takes only your choice and which role's stake you are voting with — it never takes a weight. The program reads your stake account itself and records that number, so there is nothing a client could inflate. Creating the vote record is also what prevents a second vote: the account already exists, and the transaction fails. The reference app has a working wallet-signed version of this on its governance page, which lists the roles you actually hold stake under.",
        zh: "投票指令只接受你的选择以及你使用哪种角色的质押来投票——它从不接受权重参数。程序会自行读取你的质押账户并记录该数值，因此客户端没有任何可以虚报的空间。创建投票记录本身也起到了防止重复投票的作用：该账户已存在，交易就会失败。参考应用在其治理页面上提供了可用的钱包签名版本，并会列出你实际持有质押的角色。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

// No weight argument exists — cast_vote reads your StakeAccount directly.
const ix = onchain.governance.castVoteIx(
  voter,
  42n,                            // proposal id
  true,                           // in favour
  onchain.Role.NodeOperator,      // which role's stake to vote with
);`,
        },
      ],
    },
    {
      id: "off-chain-mirror",
      title: {
        en: "Understand the off-chain mirror",
        zh: "理解链下镜像机制",
      },
      body: {
        en: "Nodes also carry votes over the peer-to-peer governance layer, and this is where a subtle trust question lives. A gossiped vote does carry a self-reported weight field, and no node ever believes it. When a vote arrives, the node checks the signature, then queues the vote rather than applying it. On a later tick it fetches the stake account the vote names, confirms that account is genuinely owned by the staking program, confirms the account's owner field matches the voter who signed, and only then records the vote using the amount it decoded itself. A node that has no staking program id configured leaves such votes queued indefinitely rather than trusting any of them — which is the safe failure, but does mean an unconfigured node silently counts nothing.",
        zh: "节点同时也会通过点对点治理层传播投票，而微妙的信任问题正出在这里。被 gossip 传播的投票确实带有一个自报的权重字段，但没有任何节点会相信它。当一票到达时，节点先校验签名，然后把该票排入队列而不是直接应用。在之后的某个周期里，它会去读取该票所指明的质押账户，确认该账户确实由质押程序拥有，确认账户中的 owner 字段与签名的投票者一致，只有到这时才会用它自己解码出的数额记录这一票。如果节点没有配置质押程序 ID，这类投票会被无限期地留在队列中，而不会被信任——这是安全的失败方式，但也意味着一个未配置的节点实际上不会计入任何票。",
      },
      code: [
        {
          filename: "/etc/openfiat/node.env",
          code: `# Without this, a node queues every gossiped vote forever and never
# trusts one. It is the address of the deployed staking program, which
# is what the node checks a claimed stake account against.
CLI_STAKING_PROGRAM_ID=HYEXk8XQukBkZbiYB33JyVefQDxqyCpPudad3wBCyYmx`,
        },
      ],
    },
    {
      id: "tally",
      title: {
        en: "Finalize the result",
        zh: "结算最终结果",
      },
      body: {
        en: "Once the voting period has passed, anyone can finalize — you, the proposer, or an unrelated bot. There is no privileged closer and no discretion in the outcome. Quorum is met when the total weight cast reaches the proposal's snapshotted quorum, measured against total OPEN supply rather than against turnout. If quorum is met, the proposal passes when votes in favour reach its snapshotted threshold as a share of the votes actually cast. A missed quorum and an exact tie both resolve to rejected, deterministically.",
        zh: "投票期结束后，任何人都可以执行结算——你、提案人，或是一个无关的自动化脚本。这里没有特权关闭者，结果也不存在任何自由裁量空间。当投出的总权重达到该提案快照的法定人数时，即视为达到法定人数，其衡量基准是 OPEN 总供应量，而非投票参与量。在达到法定人数的前提下，若赞成票占实际投出票数的比例达到快照的通过门槛，提案即获通过。未达法定人数与恰好平票这两种情况，都会被确定性地判定为否决。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

// Permissionless: this instruction takes no signer at all.
const ix = onchain.governance.tallyAndFinalizeIx(42n);`,
        },
      ],
    },
    {
      id: "deposit",
      title: {
        en: "Settle the deposit",
        zh: "结算保证金",
      },
      body: {
        en: "The deposit exists to make a proposal cost something if nobody turns up, not to punish losing. So it comes back whenever quorum was met, whether the proposal passed or was rejected on its merits; it is forfeited only when the vote failed to draw quorum at all. Settlement is a separate permissionless call after finalization, and it can only run once.",
        zh: "保证金的作用是让无人问津的提案付出代价，而不是惩罚失败的一方。因此，只要达到了法定人数，保证金就会退还，无论提案最终是通过还是被实质性否决；只有当投票根本没有达到法定人数时，保证金才会被没收。结算是在最终确定之后的一次独立的、无需许可的调用，并且只能执行一次。",
      },
      code: [
        {
          filename: "TypeScript",
          code: `import { onchain } from "@openfiat/sdk";

// Refunded to the proposer if quorum was met, forfeited otherwise.
const ix = onchain.governance.refundOrForfeitDepositIx(
  mint,
  42n,                    // proposal id
  proposerTokenAccount,
  forfeitDestination,
);`,
        },
      ],
    },
  ],

  related: [
    {
      href: "/whitepaper/12-the-openfiat-governance-protocol",
      label: {
        en: "Chapter 12 — the governance protocol",
        zh: "第 12 章——治理协议",
      },
    },
    {
      href: "/specs/ofs-4000",
      label: { en: "OFS-4000 — governance", zh: "OFS-4000——治理" },
    },
    {
      href: "/specs/ofs-4100",
      label: {
        en: "OFS-4100 — tokenomics, quorum and deposits",
        zh: "OFS-4100——代币经济、法定人数与保证金",
      },
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
