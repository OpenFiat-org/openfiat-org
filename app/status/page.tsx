import type { Metadata } from "next";

export const metadata: Metadata = { title: "Status" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
        Network health
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Status
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        Live network status for OpenFiat infrastructure will be published here
        once the public testnet is live.
      </p>
    </section>
  );
}
