import type { Metadata } from "next";

export const metadata: Metadata = { title: "Downloads" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">
        Get OpenFiat
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Downloads
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        The OpenFiat wallet and reference node builds will be published here
        once releases are cut. Track progress on the roadmap.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>
          Wallet (Android, iOS, Linux, macOS, Windows, Web) — in development
        </li>
        <li>Reference node (openfiat-core) — pre-release</li>
      </ul>
    </section>
  );
}
