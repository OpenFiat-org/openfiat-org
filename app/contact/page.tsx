import type { Metadata } from "next";

export const metadata: Metadata = { title: "Contact" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
        Get in touch
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Contact
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        General inquiries: hello@openfiat.org. Security reports: see SECURITY.md
        in any repository.
      </p>
    </section>
  );
}
