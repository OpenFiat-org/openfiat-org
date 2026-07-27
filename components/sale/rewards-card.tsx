"use client";

import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import { SALE_LIVE, TOKEN_SYMBOL } from "@/lib/sale/config";
import {
  type MyPresaleStatus,
  buildClaimIx,
  fetchMyPresaleStatus,
  getProgram,
} from "@/lib/sale/presale-client";
import {
  useAnchorWallet,
  useConnection,
  useWallet,
} from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import { TransactionMessage, VersionedTransaction } from "@solana/web3.js";
import { useEffect, useState } from "react";

function truncate(address: string) {
  return `${address.slice(0, 4)}…${address.slice(-4)}`;
}

type ClaimState =
  | { status: "idle" }
  | { status: "pending" }
  | { status: "success"; signature: string }
  | { status: "error"; message: string };

/**
 * "Have I got any OPEN coming?" — the one question a past contributor lands
 * on the homepage wanting answered, so it gets the hero's other half rather
 * than living only on /sale.
 *
 * Deliberately lighter than `SalePanel`: no message-signing verification
 * step, since the only action here (claim) is itself a signed transaction —
 * that signature is the proof of ownership. This widget is read-mostly.
 */
export function RewardsCard({ sale }: { sale: Dictionary["sale"] }) {
  const { wallet, connect, disconnect, connected, connecting, publicKey } =
    useWallet();
  const { setVisible } = useWalletModal();
  const { connection } = useConnection();
  const anchorWallet = useAnchorWallet();
  const [pendingConnect, setPendingConnect] = useState(false);
  const [status, setStatus] = useState<MyPresaleStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [claim, setClaim] = useState<ClaimState>({ status: "idle" });

  useEffect(() => {
    if (!pendingConnect || !wallet || connected || connecting) return;
    setPendingConnect(false);
    connect().catch(() => {
      // Surfaced nowhere specific — this card has no error strip, and a
      // failed/cancelled connect just leaves the Connect button in place.
    });
  }, [pendingConnect, wallet, connected, connecting, connect]);

  useEffect(() => {
    if (!connected || !publicKey || !SALE_LIVE) {
      setStatus(null);
      return;
    }
    let cancelled = false;
    setLoading(true);
    fetchMyPresaleStatus(connection, publicKey).then((value) => {
      if (cancelled) return;
      setStatus(value);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [connected, publicKey, connection]);

  function openWalletModal() {
    setPendingConnect(true);
    if (!wallet) setVisible(true);
  }

  async function handleClaim() {
    if (!publicKey || !anchorWallet) return;
    setClaim({ status: "pending" });
    try {
      const program = getProgram(connection, anchorWallet);
      const ixs = await buildClaimIx(program, publicKey);
      const { blockhash } = await connection.getLatestBlockhash("confirmed");
      const message = new TransactionMessage({
        payerKey: publicKey,
        recentBlockhash: blockhash,
        instructions: ixs,
      }).compileToV0Message([]);
      const signed = await anchorWallet.signTransaction(
        new VersionedTransaction(message),
      );
      const signature = await connection.sendTransaction(signed);
      await connection.confirmTransaction(signature, "confirmed");
      setClaim({ status: "success", signature });
      setStatus((prev) => (prev ? { ...prev, claimed: true } : prev));
    } catch (cause) {
      setClaim({
        status: "error",
        message: cause instanceof Error ? cause.message : String(cause),
      });
    }
  }

  return (
    <div className="relative">
      {/* Soft brand-gradient glow behind the card — the one place on the
          homepage besides the network canvas that isn't flat surface,
          reserved for the thing worth a second look. */}
      <div
        aria-hidden
        className="-inset-4 absolute rounded-[calc(var(--radius-card)+16px)] opacity-60 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, color-mix(in srgb, var(--color-accent) 35%, transparent), transparent)",
        }}
      />
      <div className="relative overflow-hidden rounded-card border border-line bg-surface shadow-[var(--shadow-glow)]">
        <div
          aria-hidden
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--color-accent), var(--color-teal), transparent)",
          }}
        />
        <div className="p-6 sm:p-7">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-xs font-bold text-white"
              style={{
                background:
                  "linear-gradient(135deg, var(--color-accent), var(--color-teal))",
              }}
            >
              {TOKEN_SYMBOL[0]}
            </span>
            <div>
              <h2 className="text-h3 text-ink">{sale.rewardsTitle}</h2>
              <p className="text-body-sm text-faint">{sale.rewardsSubtitle}</p>
            </div>
          </div>

          <div className="mt-6">
            {!connected ? (
              <>
                <p className="text-body-sm text-body">
                  {sale.rewardsConnectPrompt}
                </p>
                <Button
                  className="mt-4 w-full"
                  onClick={openWalletModal}
                  disabled={connecting}
                >
                  {connecting ? sale.confirming : sale.connectWallet}
                </Button>
              </>
            ) : (
              <div>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-sm text-ink">
                    {truncate(publicKey?.toBase58() ?? "")}
                  </p>
                  <button
                    type="button"
                    onClick={() => void disconnect()}
                    className="text-body-sm text-faint underline-offset-4 hover:text-muted hover:underline"
                  >
                    {sale.disconnect}
                  </button>
                </div>

                {loading && (
                  <div className="mt-5 space-y-3" aria-hidden>
                    <div className="h-4 w-2/3 animate-pulse rounded-sm bg-line" />
                    <div className="h-8 w-1/2 animate-pulse rounded-sm bg-line" />
                  </div>
                )}

                {!loading && (!status || !status.hasContributed) && (
                  <div className="mt-5">
                    <p className="text-body-sm text-body">
                      {sale.rewardsNoContribution}
                    </p>
                    <Button
                      href="/sale"
                      variant="secondary"
                      className="mt-4 w-full"
                    >
                      {sale.rewardsNoContributionCta}
                    </Button>
                  </div>
                )}

                {!loading && status?.hasContributed && (
                  <div className="mt-5">
                    <div className="flex items-baseline justify-between">
                      <span className="stat-label text-faint">
                        {sale.rewardsContributed}
                      </span>
                      <span className="font-mono text-sm text-ink">
                        {status.amountUsdc.toLocaleString()} USDC
                      </span>
                    </div>
                    <div className="mt-3 flex items-baseline justify-between">
                      <span className="stat-label text-faint">
                        {sale.rewardsEntitlement}
                      </span>
                      <span
                        className="stat-num tnum bg-clip-text font-bold text-transparent"
                        style={{
                          backgroundImage:
                            "linear-gradient(90deg, var(--color-accent-mid), var(--color-teal-mid))",
                        }}
                      >
                        {status.openEntitlement.toLocaleString()} {TOKEN_SYMBOL}
                      </span>
                    </div>

                    {status.canClaim && (
                      <Button
                        className="mt-5 w-full"
                        disabled={claim.status === "pending"}
                        onClick={() => void handleClaim()}
                      >
                        {claim.status === "pending"
                          ? sale.confirming
                          : sale.claim}
                      </Button>
                    )}

                    {status.claimed && (
                      <p className="mt-5 text-body-sm text-teal-mid">
                        ✓ {sale.rewardsClaimedNote}
                      </p>
                    )}

                    {!status.claimed &&
                      !status.canClaim &&
                      status.saleState === "active" && (
                        <p className="mt-5 text-body-sm text-muted">
                          {sale.rewardsPendingNote}
                        </p>
                      )}

                    {status.canRefund && (
                      <div className="mt-5">
                        <p className="text-body-sm text-copper">
                          {sale.rewardsRefundableNote}
                        </p>
                        <Button
                          href="/sale"
                          variant="secondary"
                          className="mt-3 w-full"
                        >
                          {sale.rewardsGoToSale}
                        </Button>
                      </div>
                    )}

                    {claim.status === "success" && (
                      <p className="mt-3 text-body-sm text-body">
                        {sale.txSuccess}: {truncate(claim.signature)}
                      </p>
                    )}
                    {claim.status === "error" && (
                      <p className="mt-3 text-body-sm text-copper">
                        {sale.txFailed}: {claim.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
