import type { Metadata } from "next";

export const metadata: Metadata = { title: "Blog" };

export default function Page() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-brand-hover">
        News & updates
      </p>
      <h1 className="mt-2 text-4xl font-bold tracking-tight text-white sm:text-5xl">
        Blog
      </h1>
      <p className="mt-4 max-w-3xl text-gray-300">
        Announcements and technical write-ups will be published here.
      </p>
    </section>
  );
}
