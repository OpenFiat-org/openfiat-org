import Link from "next/link";
import { Container } from "@/components/ui/container";
import { DEFAULT_LOCALE, getDictionary, localePath } from "@/lib/i18n";

/**
 * Rendered for unmatched paths inside a locale. It cannot read params (Next
 * does not pass them to not-found), so it uses the default locale's strings.
 */
export default function NotFound() {
  const t = getDictionary(DEFAULT_LOCALE);

  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-xl">
        <h1 className="text-h1 text-ink">{t.common.notFoundTitle}</h1>
        <p className="mt-4 text-body-lg text-body">{t.common.notFoundBody}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={localePath("/", DEFAULT_LOCALE)}
            className="inline-flex h-12 items-center rounded-pill bg-accent px-6 text-base font-semibold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-accent-hover"
          >
            {t.common.goHome}
          </Link>
          <Link
            href={localePath("/whitepaper", DEFAULT_LOCALE)}
            className="inline-flex h-12 items-center rounded-pill border border-line bg-surface px-6 text-base font-semibold text-ink transition-colors hover:border-line-strong"
          >
            {t.common.readWhitepaper}
          </Link>
        </div>
      </div>
    </Container>
  );
}
