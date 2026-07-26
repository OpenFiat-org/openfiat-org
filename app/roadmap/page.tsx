import type { Metadata } from "next";

export const metadata: Metadata = { title: "Roadmap" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
        What's next
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Roadmap
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        The release of OpenFiat Version 1.0 is the beginning, not the end, of a
        long-term effort to build a decentralized financial marketplace. See the
        full roadmap chapter in the whitepaper for details.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>
          Phase 1 — Protocol specification and reference implementation
          (current)
        </li>
        <li>Phase 2 — Public testnet</li>
        <li>Phase 3 — Mainnet launch and progressive decentralization</li>
      </ul>
    </section>
  );
}
