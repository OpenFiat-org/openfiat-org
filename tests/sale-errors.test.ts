import { describe, expect, it } from "vitest";
import { describeSaleError, validateContribution } from "@/lib/sale/errors";

/** A contribution that passes every rule, for tests to vary one field of. */
const OK = {
  amount: "10",
  decimals: 6,
  balance: 100,
  symbol: "USDC",
  usdcValue: 10,
  minUsdc: 1,
  maxUsdc: 500,
  contributedUsdc: 0,
};

describe("validateContribution", () => {
  it("accepts a contribution inside every bound", () => {
    expect(validateContribution(OK)).toBeNull();
  });

  /*
   * The bug this whole module exists for: the panel let a wallet holding no
   * test USDC submit a purchase, and the only feedback was a raw Token-2022
   * simulation dump ("custom program error: 0x1").
   */
  it("blocks an amount larger than the balance", () => {
    const problem = validateContribution({ ...OK, amount: "10", balance: 3 });
    expect(problem?.key).toBe("insufficientBalance");
    expect(problem?.values).toMatchObject({ balance: "3", symbol: "USDC" });
  });

  it("blocks any amount at all when the balance is zero", () => {
    expect(validateContribution({ ...OK, balance: 0 })?.key).toBe(
      "insufficientBalance",
    );
  });

  it("allows spending the balance exactly", () => {
    expect(validateContribution({ ...OK, amount: "100", balance: 100 })).toBe(
      null,
    );
  });

  /*
   * Compared in base units, the same rounding `usdcToBaseUnits` applies when
   * building the transfer. Comparing the floats directly would reject a
   * "max" click whose decimal expansion lands a fraction above the balance.
   */
  it("does not reject a balance-equal amount over float representation", () => {
    expect(
      validateContribution({ ...OK, amount: "0.3", balance: 0.1 + 0.2 }),
    ).toBeNull();
  });

  it("asks for an amount before anything else", () => {
    expect(validateContribution({ ...OK, amount: "" })?.key).toBe(
      "amountRequired",
    );
    expect(validateContribution({ ...OK, amount: "   " })?.key).toBe(
      "amountRequired",
    );
  });

  it("rejects text and non-positive numbers", () => {
    expect(validateContribution({ ...OK, amount: "abc" })?.key).toBe(
      "amountInvalid",
    );
    expect(validateContribution({ ...OK, amount: "0" })?.key).toBe(
      "amountInvalid",
    );
    expect(validateContribution({ ...OK, amount: "-5" })?.key).toBe(
      "amountInvalid",
    );
  });

  it("enforces the minimum only on a wallet's first contribution", () => {
    expect(
      validateContribution({ ...OK, amount: "0.5", usdcValue: 0.5 })?.key,
    ).toBe("belowMinimum");
    // Already contributed: the program checks the minimum under
    // `is_first_contribution`, so a top-up below it is legitimate.
    expect(
      validateContribution({
        ...OK,
        amount: "0.5",
        usdcValue: 0.5,
        contributedUsdc: 25,
      }),
    ).toBeNull();
  });

  it("enforces the per-wallet maximum cumulatively, as the program does", () => {
    expect(
      validateContribution({
        ...OK,
        amount: "100",
        usdcValue: 100,
        balance: 1000,
        contributedUsdc: 450,
      })?.key,
    ).toBe("aboveMaximum");
    // 450 + 50 == the 500 cap exactly, which the program allows (`<=`).
    expect(
      validateContribution({
        ...OK,
        amount: "50",
        usdcValue: 50,
        balance: 1000,
        contributedUsdc: 450,
      }),
    ).toBeNull();
  });

  /*
   * On the swap path the bounds are USDC-denominated but the amount is in
   * SOL, so the two are never compared to each other.
   */
  it("checks bounds against the USDC value, not the amount paid", () => {
    const sol = {
      ...OK,
      symbol: "SOL",
      decimals: 9,
      amount: "0.01",
      balance: 1,
      usdcValue: 0.4,
    };
    expect(validateContribution(sol)?.key).toBe("belowMinimum");
    expect(validateContribution({ ...sol, usdcValue: 40 })).toBeNull();
  });

  it("withholds a bounds verdict while the swap quote is still pending", () => {
    // Balance is still checked — that needs no quote.
    expect(
      validateContribution({ ...OK, amount: "0.5", usdcValue: null }),
    ).toBeNull();
    expect(
      validateContribution({ ...OK, amount: "500", usdcValue: null })?.key,
    ).toBe("insufficientBalance");
  });

  it("skips the balance check when the balance has not loaded", () => {
    expect(validateContribution({ ...OK, balance: null })).toBeNull();
  });
});

describe("describeSaleError", () => {
  /** The exact failure the user hit, trimmed to the parts that matter. */
  const TOKEN_INSUFFICIENT = new Error(
    "Transaction simulation failed: Error processing Instruction 3: custom program error: 0x1. " +
      'Logs: ["Program log: Instruction: ContributeUsdc", ' +
      '"Program TokenzQdBNbLqP5VEhdkAS6EPFLC1PHnBqCXEpPxuEb invoke [2]", ' +
      '"Program log: Instruction: TransferChecked", ' +
      '"Program log: Error: insufficient funds"]',
  );

  it("reads a Token-2022 insufficient-funds failure as a balance problem", () => {
    expect(describeSaleError(TOKEN_INSUFFICIENT).key).toBe(
      "insufficientBalance",
    );
  });

  it("keeps the raw text as a detail rather than discarding it", () => {
    expect(describeSaleError(TOKEN_INSUFFICIENT).detail).toContain(
      "custom program error: 0x1",
    );
  });

  /*
   * `SendTransactionError` keeps the program logs in a `logs` array, not in
   * the message — so a matcher that only read the message would miss the one
   * line that names the cause.
   */
  it("reads logs carried alongside the message, not just the message", () => {
    const withLogs = Object.assign(new Error("Transaction simulation failed"), {
      logs: [
        "Program log: Instruction: ContributeUsdc",
        "Program log: Instruction: TransferChecked",
        "Program log: Error: insufficient funds",
      ],
    });
    expect(describeSaleError(withLogs).key).toBe("insufficientBalance");
    // The logs inform the verdict but are not what gets shown.
    expect(describeSaleError(withLogs).detail).toBe(
      "Transaction simulation failed",
    );
  });

  it("maps the presale program's own Anchor codes", () => {
    // 6000 + declaration index, and the enum only ever appends.
    expect(describeSaleError(anchorError(6006)).key).toBe("saleNotOpen");
    expect(describeSaleError(anchorError(6007)).key).toBe("saleNotOpen");
    expect(describeSaleError(anchorError(6008)).key).toBe("saleNotOpen");
    expect(describeSaleError(anchorError(6011)).key).toBe("belowMinimum");
    expect(describeSaleError(anchorError(6012)).key).toBe("aboveMaximum");
    expect(describeSaleError(anchorError(6013)).key).toBe("hardCapReached");
    expect(describeSaleError(anchorError(6023)).key).toBe("walletBanned");
    expect(describeSaleError(anchorError(6025)).key).toBe("nothingToClaim");
  });

  it("recognises a wallet rejection rather than blaming the network", () => {
    expect(describeSaleError(new Error("User rejected the request.")).key).toBe(
      "walletRejected",
    );
    expect(describeSaleError({ code: 4001, message: "nope" }).key).toBe(
      "walletRejected",
    );
  });

  it("distinguishes having no SOL for fees from having no USDC", () => {
    expect(
      describeSaleError(
        new Error(
          "Attempt to debit an account but found no record of a prior credit.",
        ),
      ).key,
    ).toBe("notEnoughSol");
  });

  it("treats an expired blockhash as retryable", () => {
    expect(describeSaleError(new Error("Blockhash not found")).key).toBe(
      "expired",
    );
    expect(describeSaleError(new Error("block height exceeded")).key).toBe(
      "expired",
    );
  });

  it("reports an unreachable RPC as a connection problem", () => {
    expect(describeSaleError(new TypeError("Failed to fetch")).key).toBe(
      "network",
    );
  });

  it("falls back to a generic message, never to an empty one", () => {
    const problem = describeSaleError(new Error("something exotic"));
    expect(problem.key).toBe("generic");
    expect(problem.detail).toBe("something exotic");
  });

  it("survives being handed something that is not an Error", () => {
    expect(describeSaleError(null).key).toBe("generic");
    expect(describeSaleError(undefined).key).toBe("generic");
    expect(describeSaleError("plain string").key).toBe("generic");
  });
});

/** An Anchor failure as it actually reaches the browser: hex, in the message. */
function anchorError(code: number): Error {
  return new Error(
    `Transaction simulation failed: Error processing Instruction 1: custom program error: 0x${code.toString(16)}`,
  );
}
