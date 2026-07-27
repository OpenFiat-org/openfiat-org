import { cn } from "@/lib/utils";

type Tone = "neutral" | "accent" | "teal";

const tones: Record<Tone, string> = {
  neutral: "border-line bg-surface-alt text-muted",
  accent: "border-accent/40 bg-accent-soft text-accent-mid",
  teal: "border-teal/40 bg-teal/10 text-teal-mid",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill border px-2.5 py-0.5 font-mono text-[0.6875rem] font-medium uppercase tracking-[0.08em]",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
