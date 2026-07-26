import type { Metadata } from "next";

export const metadata: Metadata = { title: "Merchants" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
        Accept and settle trades
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        For merchants
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        The OpenFiat merchant dashboard lets merchants publish advertisements,
        manage reservations and settlements, and monitor analytics — all backed
        by a decentralized coordination network rather than a single company's
        servers.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>Advertisement management</li>
        <li>Settlement tracking</li>
        <li>Dispute visibility</li>
        <li>Analytics</li>
      </ul>
    </section>
  );
}
