"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Dictionary, Locale } from "@/lib/i18n";
import { localePath, stripLocale } from "@/lib/i18n/config";
import { PRIMARY_NAV } from "@/lib/nav";
import { cn } from "@/lib/utils";

export function NavLinks({
  locale,
  nav,
}: {
  locale: Locale;
  nav: Dictionary["nav"];
}) {
  const pathname = stripLocale(usePathname());

  return (
    <nav aria-label={nav.primaryLabel} className="flex items-center gap-1">
      {PRIMARY_NAV.map((item) => {
        const active =
          pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={localePath(item.href, locale)}
            aria-current={active ? "page" : undefined}
            className={cn(
              "whitespace-nowrap rounded-pill px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]",
              active ? "bg-surface-alt text-ink" : "text-muted hover:text-ink",
            )}
          >
            {nav[item.key]}
          </Link>
        );
      })}
    </nav>
  );
}
