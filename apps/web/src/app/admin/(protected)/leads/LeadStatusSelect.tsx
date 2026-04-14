"use client";

import { useTransition } from "react";
import { updateLeadStatus } from "@/app/actions/admin-leads";

const STATUSES = ["new", "read", "replied", "archived"] as const;

export function LeadStatusSelect({
  id,
  status,
}: {
  id: string;
  status: string | null;
}) {
  const [pending, startTransition] = useTransition();
  const value = status && STATUSES.includes(status as (typeof STATUSES)[number])
    ? status
    : "new";

  return (
    <select
      value={value}
      disabled={pending}
      onChange={(e) => {
        const next = e.target.value;
        startTransition(async () => {
          await updateLeadStatus(id, next);
        });
      }}
      className="rounded-lg border border-border bg-bg px-2 py-1.5 text-xs text-fg outline-none ring-accent-emerald focus:ring-2 disabled:opacity-50"
    >
      {STATUSES.map((s) => (
        <option key={s} value={s}>
          {s}
        </option>
      ))}
    </select>
  );
}
