import { cn } from "@/lib/utils";
import { Container } from "./container";

export function Section({
  id,
  title,
  subtitle,
  children,
  className,
  centered,
}: {
  id?: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  centered?: boolean;
}) {
  return (
    <section id={id} className={cn("py-14 md:py-20", className)}>
      <Container>
        {(title || subtitle) && (
          <div
            className={cn("mb-10 max-w-2xl", centered && "mx-auto text-center")}
          >
            {title && <h2 className="text-h2 text-ink">{title}</h2>}
            {subtitle && (
              <p className="mt-4 text-body-lg text-body">{subtitle}</p>
            )}
          </div>
        )}
        {children}
      </Container>
    </section>
  );
}
