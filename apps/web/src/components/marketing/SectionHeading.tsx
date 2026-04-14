import { cn } from "@/lib/cn";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn(className)}>
      {eyebrow ? (
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/40 px-4 py-2 text-xs font-semibold text-muted2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent-gold" aria-hidden="true" />
          {eyebrow}
        </div>
      ) : null}
      <h2 className="mt-4 text-2xl font-[800] tracking-tight sm:text-3xl">{title}</h2>
      {description ? <p className="mt-2 max-w-2xl text-muted">{description}</p> : null}
    </div>
  );
}

