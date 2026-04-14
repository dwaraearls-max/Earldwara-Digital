import type { ReactNode } from "react";

/** Legal / policy content wrapper (no @tailwindcss/typography dependency). */
export function LegalProse({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-6 text-sm leading-7 text-muted [&_h2]:mt-10 [&_h2]:text-lg [&_h2]:font-extrabold [&_h2]:text-fg [&_h2]:first:mt-0 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:font-semibold [&_a]:text-accent-gold [&_a]:underline-offset-4 hover:[&_a]:underline [&_strong]:text-fg">
      {children}
    </div>
  );
}
