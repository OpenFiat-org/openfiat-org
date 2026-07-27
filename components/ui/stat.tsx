import { cn } from "@/lib/utils";

export function Stat({
  value,
  label,
  hint,
  className,
}: {
  value: string;
  label: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={cn("", className)}>
      <p className="stat-num tnum text-ink">{value}</p>
      <p className="stat-label mt-2 text-faint">{label}</p>
      {hint && <p className="mt-1 text-body-sm text-muted">{hint}</p>}
    </div>
  );
}
