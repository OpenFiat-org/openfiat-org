"use client";

import { TokenLogo } from "@/components/sale/token-logo";
import { Button } from "@/components/ui/button";
import type { Dictionary } from "@/lib/i18n";
import { SALE_LIVE, TOKEN_SYMBOL, solscanTxUrl } from "@/lib/sale/config";
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
export function RewardsCard({
  sale,
  saleHref,
}: {
  sale: Dictionary["sale"];
  /** Locale-prefixed, since a client component can't derive it. A bare
   *  "/sale" would bounce a zh reader through the locale negotiator. */
  saleHref: string;
}) {
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
    /*
     * Same treatment as `SalePanel`: one card, hairline border, translucent
     * over the hero canvas. Deliberately not a glow-plus-gradient-rule stack —
     * two panels doing the same job on two pages should look like the same
     * component, and the page has exactly one decorative layer already.
     */
    <div className="rounded-card border border-line bg-surface/80 p-6 shadow-[0_30px_70px_-30px_rgba(0,0,0,0.85)] ring-1 ring-inset ring-white/[0.04] backdrop-blur-xl sm:p-7">
      <div className="flex items-start gap-3">
        <TokenLogo symbol={TOKEN_SYMBOL} size={36} className="mt-0.5" />
        <div>
          <h2 className="text-h3 text-ink">{sale.rewardsTitle}</h2>
          <p className="mt-1 text-body-sm text-muted">{sale.rewardsSubtitle}</p>
        </div>
      </div>

      <div className="mt-6 border-t border-line pt-6">
        {!connected ? (
          <>
            <p className="text-body-sm text-body">
              {sale.rewardsConnectPrompt}
            </p>
            <Button
              size="lg"
              className="mt-5 w-full"
              onClick={openWalletModal}
              disabled={connecting}
            >
              {connecting ? sale.confirming : sale.connectWallet}
            </Button>
          </>
        ) : (
          <div>
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-sm text-ink">
                {truncate(publicKey?.toBase58() ?? "")}
              </p>
              <button
                type="button"
                onClick={() => void disconnect()}
                className="cursor-pointer font-medium text-body-sm text-muted underline decoration-line-strong underline-offset-4 transition-colors hover:text-ink"
              >
                {sale.disconnect}
              </button>
            </div>

            {loading && (
              <div className="mt-6 space-y-3" aria-hidden>
                <div className="h-3 w-1/3 animate-pulse rounded-sm bg-line" />
                <div className="h-9 w-2/3 animate-pulse rounded-sm bg-line" />
              </div>
            )}

            {!loading && (!status || !status.hasContributed) && (
              <div className="mt-6">
                <p className="text-body-sm text-body">
                  {sale.rewardsNoContribution}
                </p>
                <Button
                  href={saleHref}
                  variant="secondary"
                  size="lg"
                  className="mt-5 w-full"
                >
                  {sale.rewardsNoContributionCta}
                </Button>
              </div>
            )}

            {!loading && status?.hasContributed && (
              <div className="mt-6">
                {/* Secondary datum, so a label/value row is fine. */}
                <div className="flex items-baseline justify-between gap-4">
                  <span className="stat-label text-faint">
                    {sale.rewardsContributed}
                  </span>
                  <span className="tnum font-mono text-sm text-ink">
                    {status.amountUsdc.toLocaleString()} USDC
                  </span>
                </div>

                {/* The answer to the question the card asks, so it is stacked
                    and left-aligned rather than squeezed opposite its own
                    label — at display size that row wraps both the label and
                    the figure. Solid ink, matching every other headline number
                    on the site; clipped-gradient text reads as decoration on a
                    number people came to check. */}
                <div className="mt-5">
                  <p className="stat-label text-faint">
                    {sale.rewardsEntitlement}
                  </p>
                  <p className="mt-2 flex items-baseline gap-2">
                    <span className="tnum text-3xl font-extrabold tracking-[-0.01em] text-ink">
                      {status.openEntitlement.toLocaleString()}
                    </span>
                    <span className="font-mono text-sm text-muted">
                      {TOKEN_SYMBOL}
                    </span>
                  </p>
                </div>

                {status.canClaim && (
                  <Button
                    size="lg"
                    className="mt-6 w-full"
                    disabled={claim.status === "pending"}
                    onClick={() => void handleClaim()}
                  >
                    {claim.status === "pending" ? sale.confirming : sale.claim}
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
                  <div className="mt-5 border-s-2 border-copper ps-4">
                    <p className="text-body-sm text-body">
                      {sale.rewardsRefundableNote}
                    </p>
                    <Button
                      href={saleHref}
                      variant="secondary"
                      className="mt-4"
                    >
                      {sale.rewardsGoToSale}
                    </Button>
                  </div>
                )}

                {claim.status === "success" && (
                  <p className="mt-5 text-body-sm text-body">
                    {sale.txSuccess}{" "}
                    <a
                      href={solscanTxUrl(claim.signature)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-accent-mid underline decoration-accent/40 underline-offset-4 transition-colors hover:text-accent-hover hover:decoration-accent"
                    >
                      {truncate(claim.signature)} ↗
                    </a>
                  </p>
                )}
                {claim.status === "error" && (
                  <p className="mt-5 text-body-sm text-copper">
                    {sale.txFailed}: {claim.message}
                  </p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
