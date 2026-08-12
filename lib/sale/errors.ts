/**
 * Turning sale failure states into something a person can act on.
 *
 * Two halves of one job. `validateContribution` runs *before* a transaction
 * is built, so an amount that cannot possibly succeed never reaches a wallet;
 * `describeSaleError` runs *after* one fails anyway, and converts whatever the
 * RPC threw into a sentence.
 *
 * Both return a message *key* rather than a string. The panel is rendered in
 * nine locales, and a module that returned English would either be untranslated
 * or would need the dictionary passed into it — so the key and its
 * substitutions travel together and the component does the lookup.
 *
 * Neither function talks to the network or to React, which is what makes the
 * rules testable without a browser or a chain.
 */

/** A key under `Dictionary["sale"]["errors"]`. */
export type SaleErrorKey =
  | "amountRequired"
  | "amountInvalid"
  | "insufficientBalance"
  | "belowMinimum"
  | "aboveMaximum"
  | "hardCapReached"
  | "saleNotOpen"
  | "claimsNotOpen"
  | "nothingToClaim"
  | "walletBanned"
  | "walletRejected"
  | "notEnoughSol"
  | "expired"
  | "slippage"
  | "network"
  | "generic";

export type SaleMessage = {
  key: SaleErrorKey;
  /** `{placeholder}` substitutions for the localized string. */
  values?: Record<string, string>;
  /**
   * The original text, kept for a "technical details" disclosure. A friendly
   * message that *replaced* the underlying error would leave anyone reporting
   * a bug with nothing to paste.
   */
  detail?: string;
};

export type ContributionCheck = {
  /** Raw contents of the amount field, exactly as typed. */
  amount: string;
  /** Decimals of the asset being paid with — the unit the transfer uses. */
  decimals: number;
  /** Balance of that asset in human units, or null if it hasn't loaded. */
  balance: number | null;
  /** Symbol of that asset, for the message. */
  symbol: string;
  /**
   * What this contribution is worth in USDC: the amount itself on the direct
   * path, the swap quote otherwise. Null while a quote is in flight — the
   * USDC-denominated bounds simply aren't knowable yet.
   */
  usdcValue: number | null;
  minUsdc: number | null;
  maxUsdc: number | null;
  /** USDC this wallet has already contributed to this sale. */
  contributedUsdc: number;
};

const USDC_DECIMALS = 6;

/**
 * Amounts are compared as integers of the smallest unit, the same rounding
 * the transaction builder applies. Comparing the floats instead would reject
 * a "Max" click whose decimal expansion lands a hair above the balance it was
 * derived from.
 */
function baseUnits(value: number, decimals: number): number {
  return Math.round(value * 10 ** decimals);
}

function trim(value: number, decimals: number): string {
  return value.toLocaleString(undefined, { maximumFractionDigits: decimals });
}

/**
 * The reason this contribution cannot be submitted, or null if it can.
 *
 * Rules are checked cheapest-and-most-obvious first, so someone who has typed
 * nothing is told to enter an amount rather than that their balance is too
 * low. Each mirrors a constraint `contribute_usdc` enforces on chain, and the
 * comparisons match it exactly — the minimum applies only to a wallet's first
 * contribution, and the maximum applies to its running total, both `<=`.
 */
export function validateContribution(
  check: ContributionCheck,
): SaleMessage | null {
  const { amount, decimals, balance, symbol, usdcValue } = check;

  if (amount.trim() === "") return { key: "amountRequired" };

  const value = Number(amount);
  if (!Number.isFinite(value) || value <= 0) return { key: "amountInvalid" };

  if (
    balance !== null &&
    baseUnits(value, decimals) > baseUnits(balance, decimals)
  ) {
    return {
      key: "insufficientBalance",
      values: { balance: trim(balance, decimals), symbol },
    };
  }

  // Everything below is denominated in USDC, so on the swap path it waits for
  // the quote. The balance check above needed no quote and has already run.
  if (usdcValue === null) return null;

  const { minUsdc, maxUsdc, contributedUsdc } = check;
  const usdcBase = baseUnits(usdcValue, USDC_DECIMALS);

  if (
    contributedUsdc === 0 &&
    minUsdc !== null &&
    usdcBase < baseUnits(minUsdc, USDC_DECIMALS)
  ) {
    return {
      key: "belowMinimum",
      values: { min: trim(minUsdc, USDC_DECIMALS) },
    };
  }

  if (
    maxUsdc !== null &&
    baseUnits(contributedUsdc, USDC_DECIMALS) + usdcBase >
      baseUnits(maxUsdc, USDC_DECIMALS)
  ) {
    return {
      key: "aboveMaximum",
      values: { max: trim(maxUsdc, USDC_DECIMALS) },
    };
  }

  return null;
}

/**
 * Anchor numbers custom errors from 6000 in declaration order, and the
 * presale's `ErrorCode` is documented as append-only, so these stay stable.
 * Only the variants a visitor can actually provoke are mapped; the rest are
 * configuration mistakes that would have failed at `initialize_sale`, and
 * fall through to the generic message with the raw text attached.
 */
const ANCHOR_CODES: Record<number, SaleErrorKey> = {
  6006: "saleNotOpen", // SaleNotStarted
  6007: "saleNotOpen", // SaleEnded
  6008: "saleNotOpen", // SaleNotActive
  6011: "belowMinimum", // BelowMinimumContribution
  6012: "aboveMaximum", // AboveMaximumContribution
  6013: "hardCapReached", // HardCapExceeded
  6015: "slippage", // SlippageExceeded
  6018: "claimsNotOpen", // SaleNotFinalized
  6019: "nothingToClaim", // AlreadyClaimed
  6023: "walletBanned", // WalletBanned
  6025: "nothingToClaim", // NothingToClaim
};

/**
 * Patterns are ordered most-specific first: a failure that mentions both a
 * missing lamport balance and "insufficient funds" is about fees, not USDC.
 */
const PATTERNS: [RegExp, SaleErrorKey][] = [
  [
    /user rejected|user declined|request rejected|rejected the request/i,
    "walletRejected",
  ],
  [
    /attempt to debit an account but found no record of a prior credit|insufficient lamports|insufficient funds for (rent|fee)/i,
    "notEnoughSol",
  ],
  [/insufficient funds/i, "insufficientBalance"],
  [/blockhash not found|block height exceeded|transaction expired/i, "expired"],
  [
    /failed to fetch|fetch failed|network ?error|network request failed/i,
    "network",
  ],
];

/**
 * What to show: the failure's own message, from an Error, an RPC object, or a
 * bare string. Deliberately not the stack — someone pasting "technical
 * details" into a bug report should be pasting the chain's account of what
 * happened, not this file's call frames.
 */
function messageOf(cause: unknown): string {
  if (typeof cause === "string") return cause;
  if (cause instanceof Error) return cause.message;
  if (cause && typeof cause === "object" && "message" in cause) {
    return String((cause as { message: unknown }).message);
  }
  return "";
}

/**
 * What to match against: the message plus any simulation logs hanging off it.
 * `SendTransactionError` carries the program logs in a `logs` array rather
 * than in the message, and those logs are where `Instruction: TransferChecked`
 * and `Error: insufficient funds` actually appear.
 */
function matchTextOf(cause: unknown, message: string): string {
  const logs =
    cause &&
    typeof cause === "object" &&
    Array.isArray((cause as { logs?: unknown }).logs)
      ? ((cause as { logs: unknown[] }).logs as unknown[]).join("\n")
      : "";
  return logs ? `${message}\n${logs}` : message;
}

/** Every `custom program error: 0x…` in the text, innermost CPI included. */
function customErrorCodes(text: string): number[] {
  const codes: number[] = [];
  for (const match of text.matchAll(/custom program error: 0x([0-9a-f]+)/gi)) {
    codes.push(Number.parseInt(match[1], 16));
  }
  return codes;
}

/**
 * A human-readable account of why a sale transaction failed.
 *
 * Always returns a message — an unrecognized failure becomes `generic` with
 * the original text in `detail`, never an empty string or a raw dump shown as
 * the primary message.
 */
export function describeSaleError(cause: unknown): SaleMessage {
  const message = messageOf(cause).trim();
  const detail = message || undefined;
  const matchText = matchTextOf(cause, message);

  // Wallet adapters signal a user cancellation with EIP-1193's 4001 and a
  // message that varies by wallet, so the code is checked before any text.
  if (
    cause &&
    typeof cause === "object" &&
    (cause as { code?: unknown }).code === 4001
  ) {
    return { key: "walletRejected", detail };
  }

  if (!matchText) return { key: "generic" };

  // The presale program's own errors outrank the SPL error its CPI raised:
  // both appear in the same log, but only the outer one names the cause.
  const anchorCode = customErrorCodes(matchText).find(
    (code) => code in ANCHOR_CODES,
  );
  if (anchorCode !== undefined) {
    return { key: ANCHOR_CODES[anchorCode], detail };
  }

  for (const [pattern, key] of PATTERNS) {
    if (pattern.test(matchText)) return { key, detail };
  }

  return { key: "generic", detail };
}
