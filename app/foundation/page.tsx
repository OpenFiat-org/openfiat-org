import type { Metadata } from "next";

export const metadata: Metadata = { title: "Foundation" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">
        Stewardship
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        The OpenFiat Foundation
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        AllenHark is leading the initial development of OpenFiat and intends to
        fund the protocol's early growth. The long-term objective is progressive
        decentralization: infrastructure, governance, and protocol evolution are
        expected to transition to a diverse global community of participants
        over time.
      </p>
    </section>
  );
}
