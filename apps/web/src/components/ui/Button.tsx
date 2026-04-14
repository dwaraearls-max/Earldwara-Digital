import Link from "next/link";
import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

type BaseProps = {
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

type ButtonAsButton = BaseProps & {
  href?: undefined;
};

type ButtonAsLink = BaseProps & {
  href: string;
};

export function Button(props: ButtonAsButton | ButtonAsLink) {
  const variant = props.variant ?? "primary";
  const size = props.size ?? "md";

  const base =
    "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-transform hover:no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-neon";
  const primary =
    "bg-fg text-bg shadow-[0_20px_60px_rgba(15,23,42,0.18)] hover:-translate-y-[1px] focus-visible:ring-accent-neon";
  const secondary =
    "border border-border bg-card/40 text-fg hover:bg-card hover:-translate-y-[1px]";
  const sm = "px-4 py-2 text-sm";
  const md = "px-6 py-3 text-sm";

  const className = cn(
    base,
    variant === "primary" ? primary : secondary,
    size === "sm" ? sm : md,
    props.className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className} aria-label={typeof props.children === "string" ? props.children : undefined}>
        {props.children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled ?? false}
      className={className}
    >
      {props.children}
    </button>
  );
}

