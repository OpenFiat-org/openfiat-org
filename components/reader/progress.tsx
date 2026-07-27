"use client";

import { useEffect, useRef } from "react";

/**
 * A hairline reading-progress bar pinned under the header.
 *
 * Writes straight to a CSS transform inside rAF rather than to React state,
 * so scrolling never triggers a re-render.
 */
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mounted = barRef.current;
    if (!mounted) return;
    // Explicitly typed: the hoisted closures below would otherwise lose the
    // null-narrowing performed here.
    const bar: HTMLDivElement = mounted;

    let frame = 0;

    function update() {
      frame = 0;
      const scrollable =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="sticky top-16 z-40 h-px w-full bg-transparent"
    >
      <div
        ref={barRef}
        className="h-px w-full origin-left bg-accent"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
