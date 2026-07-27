"use client";

import { RPC_ENDPOINT, SALE } from "@/lib/sale/config";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import { useMemo } from "react";

/**
 * Solana wallet context.
 *
 * The wallets array is intentionally empty: Phantom, Solflare, Backpack and
 * others register through the Wallet Standard, and wallet-adapter discovers
 * them automatically. Listing adapters explicitly would pull in the
 * `@solana/wallet-adapter-wallets` bundle, which still declares React 16
 * peers via its Trezor and QR-reader dependencies.
 */
export function SolanaProvider({ children }: { children: React.ReactNode }) {
  const endpoint = useMemo(
    () => RPC_ENDPOINT ?? clusterApiUrl(SALE.cluster),
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* autoConnect off: connecting a wallet should be a deliberate act. */}
      <WalletProvider wallets={[]} autoConnect={false}>
        {children}
      </WalletProvider>
    </ConnectionProvider>
  );
}
