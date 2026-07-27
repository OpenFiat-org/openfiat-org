import { Container } from "@/components/ui/container";
import { type Locale, getDictionary, localePath } from "@/lib/i18n";
import { FOOTER_COLUMNS, LEGAL_NAV } from "@/lib/nav";
import { SITE } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

const linkClass =
  "rounded-sm text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <Container>
        <div className="grid gap-10 py-12 md:py-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="inline-flex items-center gap-2">
              <Image
                src="/logo-mark.png"
                alt=""
                width={28}
                height={28}
                className="h-7 w-7"
              />
              <span className="text-lg font-bold tracking-tight text-ink">
                {SITE.name}
              </span>
            </span>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              {t.footer.blurb}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 lg:col-span-8 lg:grid-cols-4">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.titleKey}>
                <h2 className="text-sm font-semibold tracking-tight text-ink">
                  {t.footer.columns[column.titleKey]}
                </h2>
                <ul className="mt-4 space-y-3">
                  {column.links.map((link) =>
                    link.external ? (
                      <li key={link.href}>
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={linkClass}
                        >
                          {t.footer.links[link.key]}
                        </a>
                      </li>
                    ) : (
                      <li key={link.href}>
                        <Link
                          href={localePath(link.href, locale)}
                          className={linkClass}
                        >
                          {t.footer.links[link.key]}
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-line py-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <ul className="flex gap-5">
              {LEGAL_NAV.map((item) => (
                <li key={item.href}>
                  <Link
                    href={localePath(item.href, locale)}
                    className={linkClass}
                  >
                    {t.footer.links[item.key]}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">
              &copy; {year} AllenHark · {t.footer.siteLicense}
            </p>
          </div>
          <p className="mt-6 max-w-3xl text-xs leading-relaxed text-faint">
            {t.footer.notice}
          </p>
        </div>
      </Container>
    </footer>
  );
}
