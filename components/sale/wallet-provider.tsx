"use client";

import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
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
 * Backpack and other Wallet Standard wallets are discovered automatically —
 * no adapter needed, desktop or mobile-in-app-browser alike, since they
 * inject themselves into the page. Phantom and Solflare are listed
 * explicitly anyway, because Wallet Standard auto-detection alone doesn't
 * help on a plain mobile browser (Safari/Chrome, not the wallet's own
 * in-app browser): there's no extension to inject anything, so with an
 * empty wallets array the modal shows "no wallet detected" even though the
 * wallet app is installed on the phone. `PhantomWalletAdapter` and
 * `SolflareWalletAdapter` both fall back to a universal-link redirect into
 * the installed app in that case, which is the only way mobile web
 * connects to either wallet at all.
 *
 * The two standalone packages are used instead of the
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
  const wallets = useMemo(
    () => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
    [],
  );

  return (
    <ConnectionProvider endpoint={endpoint}>
      {/* autoConnect off: connecting a wallet should be a deliberate act, so a
          remembered wallet never reconnects on page load. SalePanel connects
          in response to the modal selection instead. */}
      <WalletProvider wallets={wallets} autoConnect={false}>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
