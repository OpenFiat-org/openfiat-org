import type { Metadata } from "next";

export const metadata: Metadata = { title: "Protocol" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">
        How it works
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        The OpenFiat protocol
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        OpenFiat is not a blockchain. It is a decentralized peer-to-peer
        protocol built on top of Solana, which provides secure, transparent, and
        highly performant on-chain settlement through audited smart contracts.
      </p>
      <p className="mt-4 max-w-3xl text-gray-300">
        OpenFiat itself coordinates the marketplace layer: peer discovery,
        advertisements, trade reservations, encrypted communication, reputation,
        dispute resolution, and governance — all without centralized servers.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>
          Network layer (OFNP): peer discovery, gossip, snapshot and session
          sync, service registry.
        </li>
        <li>
          Trade layer (OFTP): advertisements, reservations, settlement,
          disputes.
        </li>
        <li>
          Trust layer: identity claims, reputation engine, risk intelligence.
        </li>
        <li>Coordination layer: governance, notifications, oracles.</li>
      </ul>
    </section>
  );
}
