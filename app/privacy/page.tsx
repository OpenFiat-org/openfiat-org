import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
        Legal
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Privacy Policy
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        OpenFiat the protocol does not collect personal data — it is
        peer-to-peer software. This page covers data handling for openfiat.org
        itself and will be finalized before public launch.
      </p>
    </section>
  );
}
