import type { Metadata } from "next";

export const metadata: Metadata = { title: "Community" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">
        Get involved
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Community
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        OpenFiat is built in the open. Discussions, RFCs, and issue trackers
        live across the OpenFiat-org GitHub organization.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>GitHub Discussions</li>
        <li>RFC process (see CONTRIBUTING.md in any repository)</li>
        <li>awesome-openfiat — curated community resources</li>
      </ul>
    </section>
  );
}
