import type { Metadata } from "next";

export const metadata: Metadata = { title: "Developers" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
        Build on OpenFiat
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Developer resources
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        OpenFiat is an open protocol, not a single application. Official SDKs
        are published for Rust, TypeScript, and Python, with additional language
        SDKs planned.
      </p>
      <p className="mt-4 max-w-3xl text-gray-300">
        The reference node implementation, protocol specifications, and
        conformance test vectors are all public under the Apache License 2.0.
      </p>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-gray-300">
        <li>openfiat-core — reference node implementation (Rust)</li>
        <li>
          openfiat-sdk-rust / openfiat-sdk-typescript / openfiat-sdk-python —
          official SDKs
        </li>
        <li>openfiat-specs — whitepaper and protocol specifications</li>
        <li>openfiat-conformance — protocol test vectors for implementers</li>
      </ul>
    </section>
  );
}
