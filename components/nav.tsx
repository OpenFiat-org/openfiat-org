import { AppLink } from "@/components/app-link";
import { LanguageSwitcher } from "@/components/language-switcher";
import { MobileNav } from "@/components/mobile-nav";
import { NavLinks } from "@/components/nav-links";
import { Container } from "@/components/ui/container";
import { type Locale, getDictionary, localePath } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

function Wordmark({ locale }: { locale: Locale }) {
  return (
    <Link
      href={localePath("/", locale)}
      className="inline-flex shrink-0 items-center gap-2 rounded-sm focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]"
      aria-label={`${SITE.name} home`}
    >
      <Image
        src="/logo-mark.png"
        alt=""
        width={28}
        height={28}
        priority
        className="h-7 w-7"
      />
      <span className="text-lg font-bold tracking-tight text-ink">
        {SITE.name}
      </span>
    </Link>
  );
}

export function Nav({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);

  // translateZ(0) promotes the sticky header to its own layer so the blur
  // composites stably as content scrolls beneath it.
  return (
    <header className="sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur [transform:translateZ(0)]">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Wordmark locale={locale} />

          {/* Six primary destinations plus two actions need the wider
              breakpoint; below xl everything collapses into the menu. */}
          <div className="hidden xl:flex xl:items-center xl:gap-2">
            <NavLinks locale={locale} nav={t.nav} />
            <div className="ms-2 flex items-center gap-2">
              <LanguageSwitcher locale={locale} label={t.nav.language} />
              <AppLink nav={t.nav} />
              <Link
                href={localePath("/sale", locale)}
                className="inline-flex h-10 items-center whitespace-nowrap rounded-pill bg-accent px-4 text-sm font-semibold text-white shadow-[var(--shadow-glow)] transition-colors hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]"
              >
                {t.nav.sale}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-2 xl:hidden">
            <LanguageSwitcher locale={locale} label={t.nav.language} />
            <MobileNav locale={locale} />
          </div>
        </div>
      </Container>
    </header>
  );
}
