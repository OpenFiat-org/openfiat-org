"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

/**
 * Gates the WebGL hero behind two separate deferrals.
 *
 * `ssr: false` keeps three.js out of the server render, so it is its own
 * chunk and the LCP element stays the hero heading. That much matches
 * `network-field.tsx`.
 *
 * The intersection gate is the addition. three.js is by a wide margin the
 * largest dependency this route pulls, and a `dynamic()` import alone starts
 * fetching it the moment the component mounts — which on a page whose hero is
 * one screen tall means it competes with the content for bandwidth whether or
 * not anyone ever sees it. Holding the import until the host element actually
 * intersects the viewport costs a frame on a normal visit and costs nothing
 * at all to a visitor who lands deep-linked further down the page, or who
 * bounces before the hero paints.
 *
 * The observer disconnects on first intersection: this is a load trigger, not
 * a visibility state. Pausing the animation when the hero scrolls away is the
 * canvas's own job and it has its own observer for it.
 */
const EmissionCanvas = dynamic(
  () => import("./emission-canvas").then((m) => m.EmissionCanvas),
  { ssr: false },
);

export function EmissionField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setInView(true);
          observer.disconnect();
        }
      },
      // A little ahead of the fold, so the chunk is in flight by the time the
      // hero is actually looked at.
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0"
    >
      {inView && <EmissionCanvas className={className} />}
    </div>
  );
}
