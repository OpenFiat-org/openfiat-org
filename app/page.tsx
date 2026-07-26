import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className="mx-auto max-w-6xl px-6 py-24 text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
          Version 1.0 — Draft Specification
        </p>
        <h1 className="mx-auto mt-4 max-w-3xl text-5xl font-bold tracking-tight text-white sm:text-6xl">
          A decentralized protocol for peer-to-peer fiat exchange
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-300">
          OpenFiat separates asset settlement from marketplace coordination.
          Solana secures assets through audited smart contracts; OpenFiat
          coordinates advertisements, trade discovery, reputation, and
          governance without centralized infrastructure.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/protocol"
            className="rounded-md bg-brand px-5 py-3 text-sm font-semibold text-black hover:bg-brand-hover"
          >
            Read the protocol
          </Link>
          <Link
            href="/developers"
            className="rounded-md border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:border-brand-hover"
          >
            Start building
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            [
              "Permissionless",
              "Anyone can run infrastructure, build clients, or participate in governance without asking OpenFiat-org or AllenHark for permission.",
            ],
            [
              "Verifiable",
              "Every important marketplace action is cryptographically verifiable rather than dependent on a centralized administrator's word.",
            ],
            [
              "Progressively decentralized",
              "AllenHark leads initial development, but responsibility for infrastructure and governance is designed to transition to the community.",
            ],
          ].map(([title, body]) => (
            <div
              key={title}
              className="rounded-lg border border-white/10 bg-white/5 p-6"
            >
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm text-gray-400">{body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
