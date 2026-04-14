import { AdminCsvExportButton } from "@/components/admin/AdminCsvExportButton";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { exportNewsletterCsv } from "@/app/actions/admin-export";
import { createClient } from "@/lib/supabase/server";
import { NewsletterActiveToggle } from "./NewsletterActiveToggle";

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const [rowsRes, totalRes, activeRes] = await Promise.all([
    supabase
      .from("newsletter_subscribers")
      .select("id, created_at, email, source, unsubscribed_at")
      .order("created_at", { ascending: false }),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .is("unsubscribed_at", null),
  ]);

  const { data: rows, error } = rowsRes;

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-300">
          Could not load subscribers: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div>
      <AdminPageHeader
        eyebrow="CRM"
        title="Newsletter"
        description="Subscriber rows from the site signup flow. Active means no unsubscribe timestamp. Export is GDPR-sensitive — store files securely."
        actions={
          <AdminCsvExportButton label="Export CSV" exportAction={exportNewsletterCsv} />
        }
      />
      <div className="px-8 pb-12">
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <AdminStatCard label="Total rows" value={totalRes.count ?? 0} />
          <AdminStatCard
            label="Active"
            value={activeRes.count ?? 0}
            hint="unsubscribed_at is null"
          />
          <AdminStatCard
            label="Opted out"
            value={Math.max(0, (totalRes.count ?? 0) - (activeRes.count ?? 0))}
          />
        </div>
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead className="border-b border-border bg-bg-elevated/50 text-[10px] font-extrabold uppercase tracking-wider text-muted2">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Email</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 font-medium">Active</th>
              </tr>
            </thead>
            <tbody>
              {(rows ?? []).length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-muted">
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                (rows ?? []).map((row) => (
                  <tr key={row.id} className="border-b border-border/60 last:border-0">
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">
                      {new Date(row.created_at).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <a
                        href={`mailto:${row.email}`}
                        className="text-accent-neon underline-offset-2 hover:underline"
                      >
                        {row.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted">{row.source ?? "—"}</td>
                    <td className="px-4 py-3">
                      <NewsletterActiveToggle
                        id={row.id}
                        unsubscribedAt={row.unsubscribed_at}
                      />
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
