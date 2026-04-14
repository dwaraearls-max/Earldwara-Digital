"use client";

import { useState, useTransition } from "react";

function downloadCsv(csv: string, filename: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function AdminCsvExportButton({
  label,
  exportAction,
}: {
  label: string;
  exportAction: () => Promise<
    { csv: string; filename: string } | { error: string }
  >;
}) {
  const [pending, startTransition] = useTransition();
  const [err, setErr] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() => {
          setErr(null);
          startTransition(async () => {
            const r = await exportAction();
            if ("error" in r) {
              setErr(r.error);
              return;
            }
            downloadCsv(r.csv, r.filename);
          });
        }}
        className="rounded-full border border-accent-gold/40 bg-accent-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-neon transition-colors hover:border-accent-emerald/45 hover:bg-accent-emerald/10 disabled:opacity-50"
      >
        {pending ? "Exporting…" : label}
      </button>
      {err ? <span className="max-w-xs text-right text-[11px] text-rose-500">{err}</span> : null}
    </div>
  );
}
