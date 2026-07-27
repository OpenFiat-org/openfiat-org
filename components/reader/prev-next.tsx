import Link from "next/link";

type Target = { href: string; label: string; title: string } | null;

export function PrevNext({
  previous,
  next,
  label,
}: {
  previous: Target;
  next: Target;
  /** Localized landmark name for the navigation region. */
  label: string;
}) {
  if (!previous && !next) return null;

  return (
    <nav
      aria-label={label}
      className="mt-16 grid gap-4 border-t border-line pt-8 sm:grid-cols-2"
    >
      {previous ? (
        <Link
          href={previous.href}
          rel="prev"
          className="group rounded-card border border-line bg-surface p-5 transition-colors hover:border-line-strong"
        >
          <span className="stat-label text-faint">← {previous.label}</span>
          <span className="mt-2 block font-semibold text-ink">
            {previous.title}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={next.href}
          rel="next"
          className="group rounded-card border border-line bg-surface p-5 text-right transition-colors hover:border-line-strong sm:col-start-2"
        >
          <span className="stat-label text-faint">{next.label} →</span>
          <span className="mt-2 block font-semibold text-ink">
            {next.title}
          </span>
        </Link>
      )}
    </nav>
  );
}
