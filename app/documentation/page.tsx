import type { Metadata } from "next";

export const metadata: Metadata = { title: "Documentation" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">
        Learn the protocol
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Documentation
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        In-depth guides, API references, and tutorials are published at
        docs.openfiat.org, maintained in the openfiat-docs repository.
      </p>
    </section>
  );
}
