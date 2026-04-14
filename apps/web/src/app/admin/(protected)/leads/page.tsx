import { AdminCsvExportButton } from "@/components/admin/AdminCsvExportButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { exportLeadsCsv } from "@/app/actions/admin-export";
import { createClient } from "@/lib/supabase/server";
import { LeadStatusSelect } from "./LeadStatusSelect";

export default async function AdminLeadsPage() {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("contact_submissions")
    .select(
      "id, created_at, name, email, company, service_interest, message, status, source",
    )
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-300">Could not load leads: {error.message}</p>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="CRM"
        title="Leads"
        description="Inbound contact submissions from the marketing site. Status drives your follow-up workflow; exports respect Security → re-auth for CSV when enabled."
        actions={<AdminCsvExportButton label="Export CSV" exportAction={exportLeadsCsv} />}
      />
      <div className="px-8 pb-12">
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead className="border-b border-border bg-bg-elevated/50 text-[10px] font-extrabold uppercase tracking-wider text-muted2">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Name</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Company</th>
                <th className="px-4 py-3 font-medium">Service</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Message</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted">
                    No submissions yet.
                  </td>
                </tr>
              ) : (
                (rows ?? []).map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3 font-medium text-fg">{row.name}</td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${row.email}`}
                        className="text-accent-neon underline-offset-2 hover:underline"
                      >
                        {row.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted">{row.company ?? "—"}</td>
                    <td className="max-w-[140px] truncate px-4 py-3 text-muted" title={row.service_interest}>
                      {row.service_interest ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-muted2">{row.source ?? "—"}</td>
                    <td className="max-w-xs truncate px-4 py-3 text-muted" title={row.message}>
                      {row.message}
                    </td>
                    <td className="px-4 py-3">
                      <LeadStatusSelect id={row.id} status={row.status} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
