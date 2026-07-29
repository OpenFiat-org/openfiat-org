/**
 * Concrete commands for the arbitrator walkthrough — kept in sync with what
 * actually exists: `openfiat-app`'s Stake page (bonding), the Rust SDK's
 * typed dispute methods (`openfiat-sdks/rust/src/methods/disputes.rs`,
 * the only SDK with typed helpers for the off-chain gossip calls today),
 * and the TypeScript SDK's on-chain instruction builders
 * (`openfiat-sdks/typescript/src/onchain/{staking,escrow}.ts`).
 *
 * Two commit-reveal votes, not one. The off-chain vote (`sendVoteCommit`/
 * `sendVoteReveal`, gossiped between nodes) drives the marketplace's own
 * `Dispute` record and reputation. The on-chain vote
 * (`commit_dispute_vote`/`reveal_dispute_vote` on `openfiat-escrow`) is
 * the one that actually determines the stake-weighted outcome and who
 * gets slashed — it reads your `Arbitrator`-role `StakeAccount` directly
 * at reveal time, no CPI. They're independent instances of the same
 * decision, not one relayed from the other, so a real arbitrator client
 * casts both with the same outcome and salt.
 *
 * DEVNET ONLY, same as every other program reference on this site.
 */

export const DEVNET_PROGRAM_IDS = {
  escrow: "HaPpM1QYM3dKp3sX7zhEdft9hB6ncu6xfALAbkyQChQP",
  staking: "HYEXk8XQukBkZbiYB33JyVefQDxqyCpPudad3wBCyYmx",
};

/** Read from the deployed devnet `StakingConfig` (`min_stake_arbitrator`
 *  = 10_000 OPEN), which matches OFS-4100 §4. Governance can change it. */
export const ARBITRATOR_MIN_BOND = 10_000;

export const CODE = {
  discover: `# Any node will do — arbitrators pick a case, nobody assigns one.
curl -s -X POST http://localhost:7080/rpc -H 'content-type: application/json' \\
  -d '{"jsonrpc":"2.0","id":1,"method":"getDisputes","params":{}}'
# Filter the result for status: "Open" and arbitrators.length < required_arbitrators`,

  bond: `import { PublicKey, Transaction } from "@solana/web3.js";
import { getAssociatedTokenAddressSync, TOKEN_2022_PROGRAM_ID } from "@solana/spl-token";
import { onchain } from "@openfiat/sdk";

// Role.Arbitrator = 1 — same instruction pair openfiat-app's Stake page
// submits when you connect a wallet and bond there directly.
const from = getAssociatedTokenAddressSync(mint, owner, false, TOKEN_2022_PROGRAM_ID);
const amount = 10_000n * 1_000_000_000n; // OPEN has 9 decimals (OFS-4100 §1)

const instructions = [
  onchain.staking.initializeStakeAccountIx(owner, onchain.Role.Arbitrator),
  onchain.staking.stakeIx(owner, mint, onchain.Role.Arbitrator, from, amount),
];
const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
const tx = new Transaction({ feePayer: owner, blockhash, lastValidBlockHeight }).add(...instructions);
const { signature } = await wallet.signAndSendTransaction(tx);`,

  join: `use openfiat_disputes::events::ArbitratorJoin;
use openfiat_sdk::wallet::Keypair;
use openfiat_sdk::{Client, ClientConfig};

// Joining is what unlocks the case's evidence for you — buyer/seller
// submissions and the trade's own message log become visible once you're
// in \`dispute.arbitrators\`.
let client = Client::new(ClientConfig { endpoint: node_url, ..Default::default() });
client
    .send_arbitrator_join(
        ArbitratorJoin {
            dispute_id: dispute.id.clone(),
            arbitrator: peer_id(&keypair),
            arbitrator_public_key: keypair.public_key(),
            timestamp: Timestamp::now(),
        },
        &keypair,
    )
    .await?;`,

  commit: `// Off-chain (marketplace record + reputation) — Rust SDK
let secret: [u8; 32] = rand::random();
let commitment = openfiat_disputes::commitment::compute(vote, &secret); // sha256(vote || secret)
client.send_vote_commit(VoteCommit { dispute_id, arbitrator: peer_id(&keypair), commitment, timestamp: Timestamp::now() }, &keypair).await?;
// keep \`secret\` — you need it again at reveal, and it must never be guessable before then

// On-chain (the stake-weighted vote that actually pays out) — TypeScript SDK
import { onchain } from "@openfiat/sdk";
import { createHash } from "node:crypto";

const commitment = createHash("sha256").update(Buffer.from([onchain.DisputeOutcome.BuyerWins])).update(salt).digest();
const ix = onchain.escrow.commitDisputeVoteIx(arbitrator, reservationId, commitment);`,

  reveal: `// Off-chain — Rust SDK
client.send_vote_reveal(VoteReveal { dispute_id, arbitrator: peer_id(&keypair), vote, secret, timestamp: Timestamp::now() }, &keypair).await?;

// On-chain — reads your Arbitrator StakeAccount directly (no CPI) to weight this vote
import { onchain } from "@openfiat/sdk";

const [arbitratorStake] = onchain.staking.stakeAccountPda(arbitrator, onchain.Role.Arbitrator);
const ix = onchain.escrow.revealDisputeVoteIx(
  arbitrator,
  reservationId,
  onchain.DisputeOutcome.BuyerWins,
  salt,
  arbitratorStake,
);`,

  resolve: `import { onchain } from "@openfiat/sdk";

// Permissionless — it only tallies votes the reveal step above already
// recorded on-chain, so anyone (the buyer, the seller, either arbitrator,
// or an unrelated crank bot) can call it once the reveal window closes.
const ix = onchain.escrow.executeDisputeOutcomeIx(mint, seller, reservationId, destinations);`,
} as const;
