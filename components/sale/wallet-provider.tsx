"use client";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";
import { RPC_ENDPOINT, SALE } from "@/lib/sale/config";

/*
 * The adapter's own modal stylesheet, then ours on top of it. Order matters:
 * `wallet-modal.css` overrides single-class selectors from the file above, so
 * it has to be imported second. Both land in this route's CSS chunk rather
 * than the global one, since the provider mounts only on /sale.
 */
import "@solana/wallet-adapter-react-ui/styles.css";
import "./wallet-modal.css";

/**
 * Solana wallet context.
 *
 * The wallets array is intentionally empty: Phantom, Solflare, Backpack and
 * others register through the Wallet Standard, and wallet-adapter discovers
 * them automatically. Listing adapters explicitly would pull in the
 * `@solana/wallet-adapter-wallets` bundle, which still declares React 16
 * peers via its Trezor and QR-reader dependencies.
 *
 * `WalletModalProvider` supplies the standard wallet-selection modal — the
 * dialog users already know from every other Solana app, including its
 * detected/installed split and its "no wallet yet" path. `SalePanel` opens it
 * through `useWalletModal()`.
 */
export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const endpoint = useMemo(
    () => RPC_ENDPOINT ?? clusterApiUrl(SALE.cluster),
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* autoConnect off: connecting a wallet should be a deliberate act, so a
          remembered wallet never reconnects on page load. SalePanel connects
          in response to the modal selection instead. */}
      <WalletProvider wallets={[]} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
