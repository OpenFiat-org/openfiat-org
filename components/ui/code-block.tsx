"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * A copyable command or config block.
 *
 * Deliberately not a syntax highlighter: these are shell commands and TOML,
 * and colouring them adds noise without adding meaning. What an operator
 * actually needs is to copy the thing without missing a line.
 */
export function CodeBlock({
  code,
  filename,
  copyLabel = "Copy",
  copiedLabel = "Copied",
  className,
}: {
  code: string;
  filename?: string;
  copyLabel?: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the text is selectable either way.
    }
  }

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-card border border-line bg-code-bg",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-4 border-b border-line/70 px-4 py-2">
        <span className="font-mono text-xs text-faint">
          {filename ?? "shell"}
        </span>
        <button
          type="button"
          onClick={copy}
          className="rounded-pill px-2 py-1 font-mono text-[0.6875rem] uppercase tracking-[0.08em] text-muted transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-[color:var(--accent-ring)]"
        >
          {copied ? copiedLabel : copyLabel}
        </button>
      </div>
      <pre className="overflow-x-auto px-4 py-4">
        <code className="block w-max min-w-full font-mono text-[0.8125rem] leading-relaxed text-code-text">
          {code}
        </code>
      </pre>
    </div>
  );
}
