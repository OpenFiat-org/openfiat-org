"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { getDictionary, type Locale } from "@/lib/i18n";
import { localePath, stripLocale } from "@/lib/i18n/config";
import { LEGAL_NAV, PRIMARY_NAV } from "@/lib/nav";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function MobileNav({ locale }: { locale: Locale }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const current = stripLocale(pathname);
  const t = getDictionary(locale);

  // Close on navigation. pathname is the change trigger rather than a
  // value read inside the effect, which is exactly what this needs.
  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the trigger
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape, and stop the page scrolling behind the panel.
  useEffect(() => {
    if (!open) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
        className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-surface text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]"
      >
        <span aria-hidden="true" className="relative block h-3 w-4">
          <span
            className={cn(
              "absolute start-0 block h-[1.5px] w-4 bg-current transition-transform duration-150",
              open ? "top-1.5 rotate-45" : "top-0",
            )}
          />
          <span
            className={cn(
              "absolute start-0 top-1.5 block h-[1.5px] w-4 bg-current transition-opacity duration-150",
              open && "opacity-0",
            )}
          />
          <span
            className={cn(
              "absolute start-0 block h-[1.5px] w-4 bg-current transition-transform duration-150",
              open ? "top-1.5 -rotate-45" : "top-3",
            )}
          />
        </span>
      </button>

      {open &&
        createPortal(
          // Rendered into document.body rather than in place: the header
          // above has `transform: translateZ(0)` (for stable blur
          // compositing), and a `transform` on an ancestor makes it the
          // containing block for `position: fixed` descendants per the CSS
          // spec — this panel would otherwise be clipped to the header's
          // own (64px) box instead of spanning the viewport.
          <div
            id="mobile-menu"
            className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto border-t border-line bg-bg px-6 py-6"
          >
            <ul className="space-y-1">
              {PRIMARY_NAV.map((item) => {
                const active =
                  current === item.href || current.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={localePath(item.href, locale)}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "block rounded-sm px-3 py-3 text-base font-semibold transition-colors",
                        active
                          ? "bg-surface-alt text-ink"
                          : "text-body hover:text-ink",
                      )}
                    >
                      {t.nav[item.key]}
                    </Link>
                  </li>
                );
              })}
            </ul>

            <div className="mt-6 flex flex-col gap-3 border-t border-line pt-6">
              <Link
                href={localePath("/sale", locale)}
                className="inline-flex h-12 items-center justify-center rounded-pill bg-accent px-6 text-base font-semibold text-white shadow-[var(--shadow-glow)]"
              >
                {t.nav.sale}
              </Link>
              <a
                href={SITE.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-pill border border-line bg-surface px-6 text-base font-semibold text-ink"
              >
                {t.nav.launchApp} ↗
                {SITE.appIsPreview && (
                  <span className="rounded-pill bg-accent-soft px-2 py-0.5 font-mono text-[0.625rem] uppercase tracking-[0.08em] text-accent-mid">
                    {t.nav.preview}
                  </span>
                )}
              </a>
            </div>

            <ul className="mt-6 flex gap-4 border-t border-line pt-6">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(item.href, locale)}
                    className="text-sm text-muted hover:text-ink"
                  >
                    {t.footer.links[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>,
          document.body,
        )}
    </>
  );
}
