import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        align === "center" && "sm:flex-col sm:items-center sm:text-center"
      )}
    >
      <div className={cn("max-w-3xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="text-[11px] font-extrabold uppercase tracking-[0.28em] text-accent-neon">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display mt-3 text-3xl font-semibold leading-[1.1] tracking-tight text-fg sm:text-4xl lg:text-5xl">
          <span className="relative inline-block">
            {title}
            <span
              className="absolute -bottom-2 left-0 h-px w-16 bg-gradient-to-r from-accent-gold via-accent-emerald/80 to-transparent sm:w-24"
              aria-hidden
            />
          </span>
        </h2>
        {description ? (
          <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
