import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: {
    default: "OpenFiat — Decentralized Peer-to-Peer Fiat Exchange",
    template: "%s · OpenFiat",
  },
  description:
    "OpenFiat is an open, decentralized peer-to-peer protocol for exchanging stablecoins for local fiat currency, built on Solana.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
