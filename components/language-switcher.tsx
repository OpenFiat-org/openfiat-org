"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  LOCALE_META,
  LOCALES,
  type Locale,
  localePath,
  stripLocale,
} from "@/lib/i18n/config";
import { cn } from "@/lib/utils";

/**
 * Switches locale while staying on the same page, and remembers the choice in
 * a cookie so middleware honours it on later locale-less visits.
 */
export function LanguageSwitcher({
  locale,
  label,
}: {
  locale: Locale;
  label: string;
}) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    function onPointerDown(event: PointerEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function choose(next: Locale) {
    // Max-age one year; Lax is enough for a display preference.
    document.cookie = `openfiat-locale=${next}; path=/; max-age=31536000; samesite=lax`;
    setOpen(false);
    router.push(localePath(stripLocale(pathname), next));
  }

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
        className="inline-flex h-10 items-center gap-1.5 rounded-pill px-2.5 text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <title>Language</title>
          <circle cx="8" cy="8" r="6.25" />
          <path d="M1.75 8h12.5M8 1.75c1.6 1.7 2.5 3.9 2.5 6.25S9.6 12.55 8 14.25c-1.6-1.7-2.5-3.9-2.5-6.25S6.4 3.45 8 1.75Z" />
        </svg>
        {locale.toUpperCase()}
      </button>

      {/*
        A plain list of buttons rather than a listbox/option pattern: the
        buttons are natively focusable and announce themselves correctly,
        whereas the ARIA roles would need keyboard handling this does not have.
      */}
      {open && (
        <ul
          aria-label={label}
          className="absolute end-0 top-12 z-50 min-w-44 overflow-hidden rounded-card border border-line bg-surface py-1 shadow-[var(--shadow-hover)]"
        >
          {LOCALES.map((option) => (
            <li key={option}>
              <button
                type="button"
                aria-current={option === locale ? "true" : undefined}
                onClick={() => choose(option)}
                className={cn(
                  "block w-full px-4 py-2 text-start text-sm transition-colors hover:bg-surface-alt",
                  option === locale ? "text-ink" : "text-muted",
                )}
              >
                <span className="font-medium">{LOCALE_META[option].label}</span>
                {LOCALE_META[option].englishLabel !==
                  LOCALE_META[option].label && (
                  <span className="ms-2 text-faint">
                    {LOCALE_META[option].englishLabel}
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
