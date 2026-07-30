import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { getDictionary, type Locale, localePath } from "@/lib/i18n";
import {
  FOOTER_COLUMNS,
  LEGAL_NAV,
  SOCIAL_LINKS,
  type SocialLinkKey,
} from "@/lib/nav";
import { SITE } from "@/lib/site";

const linkClass =
  "rounded-sm text-sm text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]";

const socialLinkClass =
  "inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-alt hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]";

/** GitHub's own mark, not a house icon — this is a link to a third-party site. */
function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="currentColor"
    >
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
    </svg>
  );
}

/** A discussion thread — matches the language switcher's line-icon weight. */
function DiscussionsIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 16 16"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path
        d="M2.5 3.75h8.5a1 1 0 0 1 1 1v4.5a1 1 0 0 1-1 1H7l-2.75 2.25v-2.25H2.5a1 1 0 0 1-1-1v-4.5a1 1 0 0 1 1-1Z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const SOCIAL_ICONS: Record<SocialLinkKey, () => React.JSX.Element> = {
  github: GitHubIcon,
  discussions: DiscussionsIcon,
};

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
            <ul className="mt-5 flex gap-1">
              {SOCIAL_LINKS.map((link) => {
                const Icon = SOCIAL_ICONS[link.key];
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={t.footer.links[link.key]}
                      className={socialLinkClass}
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
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
