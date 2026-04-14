import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";

export default async function AdminActivityPage() {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("admin_audit_log")
    .select("id, created_at, action, entity_type, entity_id, details, actor_id")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <div>
      <AdminPageHeader
        eyebrow="System"
        title="Activity log"
        description="Immutable trail of exports, CRM updates, and settings changes performed in this admin. Rows are written by server actions only."
      />
      <div className="px-8 pb-12">
        {error ? (
          <p className="rounded-xl border border-blue-400/35 bg-blue-500/10 px-4 py-3 text-sm text-fg">
            Could not load audit log: {error.message}. Apply migration{" "}
            <code className="text-xs">20260415150000_admin_settings_audit.sql</code> if missing.
          </p>
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[800px] text-left text-sm">
              <thead className="border-b border-border bg-bg-elevated/60 text-[10px] font-extrabold uppercase tracking-wider text-muted2">
                <tr>
                  <th className="px-4 py-3">When</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Entity</th>
                  <th className="px-4 py-3">Id</th>
                  <th className="px-4 py-3">Details</th>
                </tr>
              </thead>
              <tbody>
                {(rows ?? []).length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-10 text-center text-muted">
                      No activity recorded yet.
                    </td>
                  </tr>
                ) : (
                  (rows ?? []).map((r) => (
                    <tr key={r.id} className="border-b border-border/50 last:border-0">
                      <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">
                        {new Date(r.created_at).toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-fg">{r.action}</td>
                      <td className="px-4 py-3 text-muted">{r.entity_type ?? "—"}</td>
                      <td className="max-w-[140px] truncate px-4 py-3 font-mono text-xs text-muted2">
                        {r.entity_id ?? "—"}
                      </td>
                      <td className="max-w-md truncate px-4 py-3 font-mono text-xs text-muted2">
                        {JSON.stringify(r.details)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
