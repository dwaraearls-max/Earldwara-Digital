import { cn } from "@/lib/cn";
import { Button } from "@/components/ui/Button";

export function PageHeader({
  eyebrow,
  title,
  description,
  ctaHref,
  ctaLabel,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border bg-card/25 p-6 sm:p-10">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-[-10%] top-[-35%] h-72 w-72 rounded-full bg-accent-gold/15 blur-2xl" />
        <div className="absolute right-[-20%] top-[-20%] h-72 w-72 rounded-full bg-accent-blue/10 blur-2xl" />
      </div>

      <div className={cn("flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between")}>
        <div className="max-w-2xl">
          {eyebrow ? (
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs font-semibold text-muted2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
              {eyebrow}
            </div>
          ) : null}

          <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</h1>
          {description ? <p className="mt-3 text-muted">{description}</p> : null}
        </div>

        {ctaHref && ctaLabel ? (
          <div className="sm:justify-self-end">
            <Button href={ctaHref} variant="primary">
              {ctaLabel}
            </Button>
          </div>
        ) : null}
      </div>
    </div>
  );
}

