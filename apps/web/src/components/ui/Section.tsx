import { cn } from "@/lib/cn";
import type { ReactNode } from "react";

export function Section({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <section className={cn("py-10 sm:py-16", className)}>{children}</section>;
}

