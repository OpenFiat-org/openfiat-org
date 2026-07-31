import Image from "next/image";
import Link from "next/link";
import { FOOTER_ICONS } from "@/components/footer-icons";
import { Container } from "@/components/ui/container";
import {
  type Dictionary,
  getDictionary,
  type Locale,
  localePath,
} from "@/lib/i18n";
import { FOOTER_COLUMNS, type FooterLink, LEGAL_NAV } from "@/lib/nav";
import { SITE } from "@/lib/site";

const linkClass =
  "group inline-flex items-center gap-2 rounded-sm text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]";

/** The site's established micro-label: mono, tracked, quiet. */
const headingClass =
  "font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-faint";

function FooterLinkItem({
  link,
  locale,
  t,
}: {
  link: FooterLink;
  locale: Locale;
  t: Dictionary;
}) {
  const Icon = link.icon ? FOOTER_ICONS[link.icon] : null;

  const body = (
    <>
      {Icon && <Icon />}
      <span>{t.footer.links[link.key]}</span>
      {/* The leading space is load-bearing: without it the accessible name
          runs the two spans together as "Launch apppreview". */}
      {link.preview && (
        <span className="text-xs text-faint">{` ${t.nav.preview.toLowerCase()}`}</span>
      )}
      {link.external && (
        <span aria-hidden="true" className="text-faint">
          ↗
        </span>
      )}
    </>
  );

  return (
    <li>
      {link.external ? (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {body}
        </a>
      ) : (
        <Link href={localePath(link.href, locale)} className={linkClass}>
          {body}
        </Link>
      )}
    </li>
  );
}

/**
 * Five columns, one heading each, defined by `FOOTER_COLUMNS`.
 *
 * The shape is the point: the site keeps gaining pages, and a flat row of
 * links stops being readable at exactly the width where it starts being
 * useful. Adding a link now means one entry in `lib/nav.ts` and one string in
 * each dictionary — never a layout change.
 *
 * Each column's heading sits on its own hairline with a dot at the left end,
 * so the row of headings reads as peers on a bus rather than as five
 * unrelated lists. It is the one flourish here; everything else is quiet.
 */
export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-line bg-bg">
      <Container>
        <div className="py-12 md:py-16">
          <div className="max-w-md">
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
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {t.footer.blurb}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
            {FOOTER_COLUMNS.map((column) => {
              const headingId = `footer-${column.titleKey}`;
              return (
                <nav
                  key={column.titleKey}
                  aria-labelledby={headingId}
                  className="relative min-w-0 border-t border-line pt-5"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -top-[3px] left-0 h-1.5 w-1.5 rounded-full bg-accent-mid"
                  />
                  <h2 id={headingId} className={headingClass}>
                    {t.footer.columns[column.titleKey]}
                  </h2>
                  <ul className="mt-4 space-y-3">
                    {column.links.map((link) => (
                      <FooterLinkItem
                        key={link.href}
                        link={link}
                        locale={locale}
                        t={t}
                      />
                    ))}
                  </ul>
                </nav>
              );
            })}
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
