import type { Dictionary } from "@/lib/i18n";
import { SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Link to app.openfiat.org.
 *
 * Every route in the app is still a placeholder waiting on a node connection,
 * so the link is prominent as intended but labelled, and a visitor is not
 * surprised by empty views.
 */
export function AppLink({
  nav,
  className,
}: {
  nav: Dictionary["nav"];
  className?: string;
}) {
  return (
    <a
      href={SITE.appUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex h-10 items-center gap-1.5 whitespace-nowrap rounded-pill px-3 text-sm font-medium text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]",
        className,
      )}
    >
      {nav.launchApp}
      <span aria-hidden="true" className="text-muted">
        ↗
      </span>
      {/* Still honest that the app is a preview, without a chip in the bar. */}
      {SITE.appIsPreview && (
        <span className="text-xs text-faint">{nav.preview.toLowerCase()}</span>
      )}
    </a>
  );
}
