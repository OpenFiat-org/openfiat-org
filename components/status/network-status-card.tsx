"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import type { Dictionary } from "@/lib/i18n";
import {
  type ChainStatus,
  fetchNetworkStatus,
  NODE_URL,
} from "@/lib/status/node-client";

const POLL_MS = 15_000;

function formatAge(ms: number): string {
  if (ms < 1000) return `${ms} ms`;
  return `${(ms / 1000).toFixed(1)} s`;
}

function formatClock(ms: number, locale: string): string {
  return new Intl.DateTimeFormat(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(ms));
}

function Stat({
  label,
  value,
  stale,
}: {
  label: string;
  value: string;
  stale?: boolean;
}) {
  return (
    <div>
      <p className="stat-label text-faint">{label}</p>
      <p
        className={
          stale
            ? "tnum mt-2 text-2xl font-extrabold tracking-[-0.01em] text-faint"
            : "tnum mt-2 text-2xl font-extrabold tracking-[-0.01em] text-ink"
        }
      >
        {value}
      </p>
    </div>
  );
}

/**
 * Live network status, read straight from a public node's RPC.
 *
 * Polls `NODE_URL` every `POLL_MS`. A read that fails — network error,
 * timeout, node down — never clears the last-known figures; it only flips
 * the badge to offline and dims them, so a blip in the node doesn't make
 * the page flash to a blank state.
 */
export function NetworkStatusCard({
  t,
  locale,
}: {
  t: Dictionary["pages"]["status"];
  locale: string;
}) {
  const [online, setOnline] = useState<boolean | null>(null);
  const [checkedAt, setCheckedAt] = useState<number | null>(null);
  // A ref, not state: it only ever needs to be read on the render that a
  // `checkedAt` update already triggers, so a second state slot purely to
  // force that same re-render would be redundant.
  const lastKnown = useRef<ChainStatus | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function poll() {
      const result = await fetchNetworkStatus(controller.signal);
      if (cancelled) return;
      if (result.online) lastKnown.current = result.status;
      setOnline(result.online);
      setCheckedAt(result.checkedAt);
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      controller.abort();
      clearInterval(id);
    };
  }, []);

  const status = lastKnown.current;
  const checking = online === null;
  const stale = online === false;

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <Badge tone={online ? "teal" : "neutral"}>
          {checking ? t.checkingLabel : online ? t.online : t.offline}
        </Badge>
        <span className="font-mono text-xs text-faint">{NODE_URL}</span>
      </div>

      <div className="mt-8 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
        <Stat
          label={t.slotLabel}
          value={status ? status.slot.toLocaleString(locale) : "—"}
          stale={stale}
        />
        <Stat
          label={t.modeLabel}
          value={status ? status.mode : "—"}
          stale={stale}
        />
        <Stat
          label={t.ageLabel}
          value={status ? formatAge(status.ageMs) : "—"}
          stale={stale}
        />
        <Stat
          label={t.lastCheckedLabel}
          value={checkedAt ? formatClock(checkedAt, locale) : "—"}
        />
      </div>

      <p className="mt-8 max-w-2xl text-body-sm text-muted">
        {stale && status ? t.lastKnownNote : null}
        {stale && !status ? t.neverReachedNote : null}
        {!stale ? t.autoRefreshNote : null}
      </p>
    </div>
  );
}
