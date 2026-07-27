"use client";

import { Container } from "@/components/ui/container";
import { DEFAULT_LOCALE, getDictionary } from "@/lib/i18n";
import { useEffect } from "react";

export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = getDictionary(DEFAULT_LOCALE);

  useEffect(() => {
    // Surface the digest so a report can be matched to a server log entry.
    console.error("Render failed", error.digest ?? error.message);
  }, [error]);

  return (
    <Container className="py-24 md:py-32">
      <div className="max-w-xl">
        <h1 className="text-h1 text-ink">{t.common.errorTitle}</h1>
        <p className="mt-4 text-body-lg text-body">{t.common.errorBody}</p>
        <button
          type="button"
          onClick={reset}
          className="mt-8 inline-flex h-12 items-center rounded-pill bg-accent px-6 text-base font-semibold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-accent-hover"
        >
          {t.common.tryAgain}
        </button>
        {error.digest && (
          <p className="mt-6 font-mono text-xs text-faint">{error.digest}</p>
        )}
      </div>
    </Container>
  );
}
