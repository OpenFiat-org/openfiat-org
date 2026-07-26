import type { Metadata } from "next";

export const metadata: Metadata = { title: "Careers" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-cyan-400">
        Join us
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Careers
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        OpenFiat is an open protocol maintained by a growing community. Open
        roles, when available, will be listed here.
      </p>
    </section>
  );
}
