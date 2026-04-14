"use client";

import { useTransition } from "react";
import { updateNewsletterActive } from "@/app/actions/admin-newsletter";

export function NewsletterActiveToggle({
  id,
  unsubscribedAt,
}: {
  id: string;
  unsubscribedAt: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const active = unsubscribedAt == null;

  return (
    <label className="inline-flex cursor-pointer items-center gap-2">
      <input
        type="checkbox"
        checked={active}
        disabled={pending}
        onChange={(e) => {
          const next = e.target.checked;
          startTransition(async () => {
            await updateNewsletterActive(id, next);
          });
        }}
        className="h-4 w-4 rounded border-border text-accent-gold focus:ring-accent-emerald"
      />
      <span className="text-xs text-muted">{active ? "Yes" : "No"}</span>
    </label>
  );
}
