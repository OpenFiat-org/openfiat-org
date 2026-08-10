import type { Dictionary } from "@/lib/i18n";
import { SALE_LIVE } from "./config";

/**
 * The homepage sale-band's paragraph and status pill, resolved together.
 *
 * Both read off the same `SALE_LIVE` gate on purpose: the pill and the
 * paragraph two lines below it are shown side by side, so picking one from
 * `SALE_LIVE` and the other from a hardcoded key let them disagree — a live
 * pill next to a "no sale contract deployed" paragraph, or the reverse once
 * a live sale eventually closes. Routing both through this one function is
 * what makes that impossible rather than merely unlikely.
 */
export function saleBandCopy(t: Pick<Dictionary, "home" | "sale">): {
  body: string;
  status: string;
} {
  return {
    body: SALE_LIVE ? t.home.saleBand.bodyLive : t.home.saleBand.body,
    status: SALE_LIVE ? t.home.saleBand.statusLive : t.sale.notLiveTitle,
  };
}
