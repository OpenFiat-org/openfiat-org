/**
 * Transaction-building for the OPEN presale (OFS-4200 §3).
 *
 * This talks directly to the deployed `openfiat-presale` Anchor program via
 * its IDL (`presale-idl.json`, copied from `openfiat-core/programs/target/idl`
 * — keep the two in sync until Phase 7 gives this a proper SDK package to
 * depend on instead of a copied file).
 *
 * Two contribution paths exist, mirroring the on-chain program:
 *  - `buildContributeUsdcIx`: direct USDC, no swap, no external API call.
 *  - `buildContributeWithSwapIx`: SOL or a whitelisted stablecoin, converted
 *    to USDC atomically via CPI into `SALE.swapProgram` (Jupiter in
 *    production). This function calls Jupiter's public, no-API-key "lite"
 *    tier (see JUPITER_API_BASE) to get a route and raw instructions, then
 *    forwards them into our own instruction's `remainingAccounts` — the
 *    on-chain program never trusts anything about Jupiter's account layout,
 *    only that the resulting USDC vault balance increased enough (see that
 *    instruction's doc comment in the Rust source for the full argument).
 */
import { AnchorProvider, BN, Program } from "@anchor-lang/core";
import {
  createAssociatedTokenAccountIdempotentInstruction,
  getAssociatedTokenAddressSync,
  TOKEN_2022_PROGRAM_ID,
} from "@solana/spl-token";
import {
  type AddressLookupTableAccount,
  type Connection,
  PublicKey,
  type Transaction,
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import { JUPITER_API_BASE, SALE, WSOL_MINT } from "./config";
import presaleIdl from "./presale-idl.json";
import type { Presale } from "./presale-types";

/**
 * Matches `@solana/wallet-adapter-react`'s `useAnchorWallet()` return shape
 * and `AnchorProvider`'s expected `Wallet` interface — defined locally since
 * `@anchor-lang/core`'s top-level `Wallet` export is a concrete Node-only
 * class (keypair-backed), not the interface a browser wallet satisfies.
 */
export type AnchorWallet = {
  publicKey: PublicKey;
  signTransaction<T extends Transaction | VersionedTransaction>(
    tx: T,
  ): Promise<T>;
  signAllTransactions<T extends Transaction | VersionedTransaction>(
    txs: T[],
  ): Promise<T[]>;
};

const USDC_DECIMALS = 6;

export function usdcToBaseUnits(amount: number): BN {
  return new BN(Math.round(amount * 10 ** USDC_DECIMALS));
}

export function getProgram(connection: Connection, wallet: AnchorWallet) {
  if (!SALE.programId) {
    throw new Error("Sale is not live: no program id configured.");
  }
  const provider = new AnchorProvider(connection, wallet, {
    commitment: "confirmed",
  });
  return new Program<Presale>(presaleIdl as Presale, provider);
}

/**
 * Narrows `SALE`'s nullable fields once, so every function below can use
 * plain non-null values instead of `!`-asserting the same fields repeatedly.
 * Throws if called while the sale isn't live — callers gate all of this
 * behind `SALE_LIVE` already, so that should never happen in practice.
 */
function requireLive() {
  if (
    !SALE.programId ||
    SALE.saleNonce === null ||
    !SALE.usdcMint ||
    !SALE.openMint
  ) {
    throw new Error("Sale is not live: config is incomplete.");
  }
  return {
    programId: new PublicKey(SALE.programId),
    saleNonce: SALE.saleNonce,
    usdcMint: new PublicKey(SALE.usdcMint),
    openMint: new PublicKey(SALE.openMint),
  };
}

function nonceBytes(saleNonce: number): Buffer {
  return new BN(saleNonce).toArrayLike(Buffer, "le", 8);
}

export function saleConfigPda(
  programId: PublicKey,
  saleNonce: number,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("sale_config"), nonceBytes(saleNonce)],
    programId,
  )[0];
}

export function usdcVaultPda(
  programId: PublicKey,
  saleNonce: number,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("sale_usdc_vault"), nonceBytes(saleNonce)],
    programId,
  )[0];
}

export function contributionPda(
  programId: PublicKey,
  saleConfig: PublicKey,
  buyer: PublicKey,
): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("contribution"), saleConfig.toBuffer(), buyer.toBuffer()],
    programId,
  )[0];
}

export function presaleVaultAuthorityPda(programId: PublicKey): PublicKey {
  return PublicKey.findProgramAddressSync(
    [Buffer.from("presale_vault")],
    programId,
  )[0];
}

/** Live on-chain sale state — total raised, current SaleState, etc. */
export async function fetchSaleConfig(program: ReturnType<typeof getProgram>) {
  const { programId, saleNonce } = requireLive();
  return program.account.saleConfig.fetch(saleConfigPda(programId, saleNonce));
}

/**
 * A wallet that can read and cannot sign.
 *
 * `AnchorProvider` insists on a wallet even for an account fetch, so this
 * satisfies the interface with a zero pubkey and signing methods that throw.
 * Throwing rather than silently no-op'ing matters: it guarantees a coding
 * mistake surfaces as an error here instead of producing an unsigned
 * transaction that gets sent and fails at the cluster.
 */
const READ_ONLY_WALLET: AnchorWallet = {
  publicKey: PublicKey.default,
  signTransaction() {
    return Promise.reject(new Error("Read-only connection cannot sign."));
  },
  signAllTransactions() {
    return Promise.reject(new Error("Read-only connection cannot sign."));
  },
};

/** The live terms and totals, in whole USDC rather than base units. */
export type SaleSnapshot = {
  totalRaisedUsdc: number;
  minContributionUsdc: number;
  maxContributionUsdc: number;
  hardCapUsdc: number;
  softCapUsdc: number;
};

/**
 * The sale as the program itself sees it — or null if the sale isn't
 * configured, the account doesn't exist yet, or the RPC read fails.
 *
 * Worth reading rather than trusting the mirror in `config.ts`: the limits
 * here are the ones actually enforced, so a UI driven by them can never invite
 * a contribution the program will reject. Callers fall back to the configured
 * figures when this returns null — a flaky RPC must not be able to claim that
 * nothing has been raised, or that the limits are something they aren't.
 */
export async function fetchSaleSnapshot(
  connection: Connection,
): Promise<SaleSnapshot | null> {
  if (!SALE.programId || SALE.saleNonce === null) return null;
  try {
    const program = getProgram(connection, READ_ONLY_WALLET);
    const saleConfig = await fetchSaleConfig(program);
    const unit = 10 ** saleConfig.usdcDecimals;
    return {
      totalRaisedUsdc: saleConfig.totalRaised.toNumber() / unit,
      minContributionUsdc: saleConfig.minContribution.toNumber() / unit,
      maxContributionUsdc: saleConfig.maxContribution.toNumber() / unit,
      hardCapUsdc: saleConfig.hardCap.toNumber() / unit,
      softCapUsdc: saleConfig.softCap.toNumber() / unit,
    };
  } catch {
    return null;
  }
}

/**
 * One wallet's presale standing: what it contributed, what it's owed, and
 * whether that's actually claimable yet. `saleState` mirrors the program's
 * own `SaleState`, which as of the 2026-08-09 re-baseline has only two
 * variants — `soft_cap` is forced to zero at `initialize_sale` and there is
 * no refund path or `SoftCapMissed` state to reach.
 *
 * `claimedOpen`/`unclaimedOpen` split what `claimed` used to collapse into a
 * bool: `claim` now pays out the delta since the last claim (a monotonic
 * high-water mark, not a one-shot flag — see `Contribution::claimed_open` in
 * `openfiat-core`), so a wallet that contributes again after claiming has
 * more to claim without `claimed` ever having been false again.
 */
export type MyPresaleStatus = {
  saleState: "active" | "finalized";
  hasContributed: boolean;
  amountUsdc: number;
  openEntitlement: number;
  claimedOpen: number;
  unclaimedOpen: number;
  /** True once every OPEN entitled so far has been claimed. */
  claimed: boolean;
  canClaim: boolean;
};

/**
 * Null covers three cases the caller doesn't need to tell apart: the sale
 * isn't configured, the RPC read failed, or (most commonly) this wallet
 * just hasn't contributed — `hasContributed: false` on a *resolved* result
 * is what signals "connected fine, nothing here," so null itself always
 * means "couldn't determine," never "definitely none."
 */
export async function fetchMyPresaleStatus(
  connection: Connection,
  buyer: PublicKey,
): Promise<MyPresaleStatus | null> {
  const { programId, saleNonce } = requireLive();
  try {
    const program = getProgram(connection, READ_ONLY_WALLET);
    const saleConfig = await fetchSaleConfig(program);
    const saleState = Object.keys(saleConfig.state)[0] as
      | "active"
      | "finalized";

    const saleConfigPubkey = saleConfigPda(programId, saleNonce);
    const contributionPubkey = contributionPda(
      programId,
      saleConfigPubkey,
      buyer,
    );

    let amountUsdc = 0;
    let openEntitlement = 0;
    let claimedOpen = 0;
    let hasContributed = false;
    try {
      const acc = await program.account.contribution.fetch(contributionPubkey);
      hasContributed = true;
      amountUsdc = acc.amountUsdc.toNumber() / 10 ** saleConfig.usdcDecimals;
      openEntitlement =
        acc.openEntitlement.toNumber() / 10 ** saleConfig.openDecimals;
      claimedOpen = acc.claimedOpen.toNumber() / 10 ** saleConfig.openDecimals;
    } catch {
      // No contribution account for this wallet — not an error, just none yet.
    }

    const unclaimedOpen = Math.max(0, openEntitlement - claimedOpen);

    return {
      saleState,
      hasContributed,
      amountUsdc,
      openEntitlement,
      claimedOpen,
      unclaimedOpen,
      claimed: hasContributed && unclaimedOpen === 0,
      // No finalize gate on-chain (see `handle_claim`): OPEN is claimable
      // while the sale is Active or Finalized, on the oversell invariant
      // that `presale_vault` always holds exactly `hard_cap`'s worth.
      canClaim: hasContributed && unclaimedOpen > 0,
    };
  } catch {
    return null;
  }
}

/**
 * OPEN base units credited per 1 USDC base unit's worth of contribution —
 * the re-baselined presale rate (OFS-4100 §3, deployed 2026-08-09):
 * 1 USDC = 100 OPEN. Mirrors `SALE`'s live `devnet_sale.openPerUsdc` rather
 * than a value this module invents; `fetchSaleSnapshot`'s on-chain read is
 * still the source of truth once the sale account is reachable, this is
 * only the pre-connect estimate.
 */
export const OPEN_PER_USDC = 100;

/** OPEN a contribution of `usdc` whole USDC entitles the buyer to. */
export function openFor(usdc: number): number {
  return usdc * OPEN_PER_USDC;
}

/** A Jupiter route, used both to quote and to build the swap instructions. */
async function fetchJupiterQuote(
  inputMint: string,
  outputMint: string,
  amountInBaseUnits: bigint,
  slippageBps: number,
): Promise<{ outAmount: string }> {
  const quoteUrl = new URL(`${JUPITER_API_BASE}/quote`);
  quoteUrl.searchParams.set("inputMint", inputMint);
  quoteUrl.searchParams.set("outputMint", outputMint);
  quoteUrl.searchParams.set("amount", amountInBaseUnits.toString());
  quoteUrl.searchParams.set("slippageBps", String(slippageBps));
  const response = await fetch(quoteUrl.toString());
  if (!response.ok) {
    throw new Error(
      `Jupiter quote failed: ${response.status} ${await response.text()}`,
    );
  }
  return response.json();
}

/**
 * USDC a non-USDC contribution would realize, for the "you receive" estimate —
 * or null if no route exists (devnet has no liquidity for a test mint) or the
 * quote fails. An estimate that can't be had should read as unknown, never as
 * zero.
 *
 * Deliberately quote-only: no instructions are built and nothing is signed, so
 * this is safe to call on every keystroke.
 */
export async function estimateUsdcOut(
  inputMint: string,
  amountInBaseUnits: bigint,
  slippageBps: number,
): Promise<number | null> {
  if (!SALE.usdcMint || amountInBaseUnits <= 0n) return null;
  try {
    const quote = await fetchJupiterQuote(
      inputMint,
      SALE.usdcMint,
      amountInBaseUnits,
      slippageBps,
    );
    return Number(quote.outAmount) / 10 ** USDC_DECIMALS;
  } catch {
    return null;
  }
}

/**
 * Both functions below return an instruction *array*: the buyer's
 * destination token account (USDC for a contribution, OPEN for a claim)
 * may not exist yet — most wallets have never held either — so an
 * idempotent create-ATA instruction is always prepended. Idempotent means
 * it's a safe no-op if the account already exists, so callers never need
 * to check first.
 */
export async function buildContributeUsdcIx(
  program: ReturnType<typeof getProgram>,
  buyer: PublicKey,
  amountUsdc: number,
): Promise<TransactionInstruction[]> {
  const { programId, saleNonce, usdcMint } = requireLive();
  const saleConfig = saleConfigPda(programId, saleNonce);
  const usdcVault = usdcVaultPda(programId, saleNonce);
  const contribution = contributionPda(programId, saleConfig, buyer);
  const buyerUsdc = getAssociatedTokenAddressSync(
    usdcMint,
    buyer,
    false,
    TOKEN_2022_PROGRAM_ID,
  );

  const createAtaIx = createAssociatedTokenAccountIdempotentInstruction(
    buyer,
    buyerUsdc,
    buyer,
    usdcMint,
    TOKEN_2022_PROGRAM_ID,
  );
  const contributeIx = await program.methods
    .contributeUsdc(new BN(saleNonce), usdcToBaseUnits(amountUsdc))
    .accountsPartial({
      buyer,
      saleConfig,
      buyerUsdc,
      usdcVault,
      usdcMint,
      contribution,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
    })
    .instruction();
  return [createAtaIx, contributeIx];
}

export async function buildClaimIx(
  program: ReturnType<typeof getProgram>,
  buyer: PublicKey,
): Promise<TransactionInstruction[]> {
  const { programId, saleNonce, openMint } = requireLive();
  const saleConfig = saleConfigPda(programId, saleNonce);
  const presaleVaultAuthority = presaleVaultAuthorityPda(programId);
  const contribution = contributionPda(programId, saleConfig, buyer);
  const buyerOpen = getAssociatedTokenAddressSync(
    openMint,
    buyer,
    false,
    TOKEN_2022_PROGRAM_ID,
  );

  // presale_vault is SaleConfig.presale_vault on-chain; fetched rather than
  // re-derived since it's the Phase 2 genesis bucket account, not a PDA
  // this instruction derives itself.
  const saleConfigAccount = await fetchSaleConfig(program);

  const createAtaIx = createAssociatedTokenAccountIdempotentInstruction(
    buyer,
    buyerOpen,
    buyer,
    openMint,
    TOKEN_2022_PROGRAM_ID,
  );
  const claimIx = await program.methods
    .claim(new BN(saleNonce))
    .accountsPartial({
      buyer,
      saleConfig,
      openMint,
      presaleVaultAuthority,
      presaleVault: saleConfigAccount.presaleVault,
      contribution,
      buyerOpen,
      tokenProgram: TOKEN_2022_PROGRAM_ID,
    })
    .instruction();
  return [createAtaIx, claimIx];
}

type JupiterInstruction = {
  programId: string;
  accounts: { pubkey: string; isSigner: boolean; isWritable: boolean }[];
  data: string;
};

function toTransactionInstruction(
  ix: JupiterInstruction,
): TransactionInstruction {
  return new TransactionInstruction({
    programId: new PublicKey(ix.programId),
    keys: ix.accounts.map((a) => ({
      pubkey: new PublicKey(a.pubkey),
      isSigner: a.isSigner,
      isWritable: a.isWritable,
    })),
    data: Buffer.from(ix.data, "base64"),
  });
}

/**
 * Builds the full instruction set + address lookup tables for a
 * SOL/stablecoin-via-Jupiter contribution. Returns everything the caller
 * needs to assemble and sign a VersionedTransaction — this function does
 * not itself send anything.
 */
export async function buildContributeWithSwapPlan(
  connection: Connection,
  program: ReturnType<typeof getProgram>,
  buyer: PublicKey,
  inputMint: string,
  amountInBaseUnits: bigint,
  slippageBps: number,
): Promise<{
  instructions: TransactionInstruction[];
  lookupTables: AddressLookupTableAccount[];
}> {
  const { programId, saleNonce, usdcMint } = requireLive();
  const saleConfig = saleConfigPda(programId, saleNonce);
  const usdcVault = usdcVaultPda(programId, saleNonce);
  const contribution = contributionPda(programId, saleConfig, buyer);

  const quoteResponse = await fetchJupiterQuote(
    inputMint,
    usdcMint.toBase58(),
    amountInBaseUnits,
    slippageBps,
  );

  const swapRes = await fetch(`${JUPITER_API_BASE}/swap-instructions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      quoteResponse,
      userPublicKey: buyer.toBase58(),
      // Route the swap's output directly into our USDC escrow vault rather
      // than the buyer's own wallet — this is why destinationTokenAccount
      // exists in Jupiter's API: composability for a third-party program
      // that needs the swap proceeds to land somewhere specific.
      destinationTokenAccount: usdcVault.toBase58(),
      useSharedAccounts: true,
    }),
  });
  if (!swapRes.ok) {
    throw new Error(
      `Jupiter swap-instructions failed: ${swapRes.status} ${await swapRes.text()}`,
    );
  }
  const swapData = await swapRes.json();

  const setupIxs: TransactionInstruction[] = (
    swapData.computeBudgetInstructions ?? []
  )
    .concat(swapData.setupInstructions ?? [])
    .map(toTransactionInstruction);

  const swapIx = toTransactionInstruction(swapData.swapInstruction);

  const expectedUsdcOut = new BN(quoteResponse.outAmount);
  const contributeIx = await program.methods
    .contributeWithSwap(new BN(saleNonce), expectedUsdcOut, swapIx.data)
    .accountsPartial({
      buyer,
      saleConfig,
      sourceMint: new PublicKey(inputMint),
      usdcVault,
      contribution,
      swapProgram: swapIx.programId,
    })
    .remainingAccounts(swapIx.keys)
    .instruction();

  const cleanupIxs: TransactionInstruction[] = swapData.cleanupInstruction
    ? [toTransactionInstruction(swapData.cleanupInstruction)]
    : [];

  const lookupTables = await Promise.all(
    (swapData.addressLookupTableAddresses ?? []).map(
      async (address: string) => {
        const res = await connection.getAddressLookupTable(
          new PublicKey(address),
        );
        if (!res.value) {
          throw new Error(`Address lookup table not found: ${address}`);
        }
        return res.value;
      },
    ),
  );

  return {
    instructions: [...setupIxs, contributeIx, ...cleanupIxs],
    lookupTables,
  };
}

export async function buildAndSignVersionedTx(
  connection: Connection,
  payer: PublicKey,
  instructions: TransactionInstruction[],
  lookupTables: AddressLookupTableAccount[],
  signTransaction: AnchorWallet["signTransaction"],
): Promise<VersionedTransaction> {
  const { blockhash } = await connection.getLatestBlockhash("confirmed");
  const message = new TransactionMessage({
    payerKey: payer,
    recentBlockhash: blockhash,
    instructions,
  }).compileToV0Message(lookupTables);
  const tx = new VersionedTransaction(message);
  return signTransaction(tx);
}

/** SOL is always accepted; stablecoins beyond USDC come from the whitelist. */
export function swapEligibleAssets(): {
  symbol: string;
  mint: string;
  decimals: number;
}[] {
  return [
    { symbol: "SOL", mint: WSOL_MINT, decimals: 9 },
    ...SALE.acceptedStablecoins,
  ];
}

/**
 * Human-readable SPL token balance for `owner`, or 0 if the mint is native
 * SOL, the token account doesn't exist yet, or any other read failure —
 * a missing balance should show as 0, not break the page.
 */
export async function fetchTokenBalance(
  connection: Connection,
  mint: string,
  decimals: number,
  owner: PublicKey,
): Promise<number> {
  if (mint === WSOL_MINT) {
    const lamports = await connection.getBalance(owner, "confirmed");
    return lamports / 10 ** decimals;
  }
  try {
    const ata = getAssociatedTokenAddressSync(
      new PublicKey(mint),
      owner,
      false,
      TOKEN_2022_PROGRAM_ID,
    );
    const { value } = await connection.getTokenAccountBalance(ata, "confirmed");
    return value.uiAmount ?? 0;
  } catch {
    return 0;
  }
}
