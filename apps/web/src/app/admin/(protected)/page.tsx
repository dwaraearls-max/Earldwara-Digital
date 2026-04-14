import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminStatCard } from "@/components/admin/AdminStatCard";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const [
    totalLeads,
    newLeads,
    totalSubs,
    activeSubs,
    recentLeads,
    recentAudit,
  ] = await Promise.all([
    supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
    supabase
      .from("contact_submissions")
      .select("*", { count: "exact", head: true })
      .eq("status", "new"),
    supabase.from("newsletter_subscribers").select("*", { count: "exact", head: true }),
    supabase
      .from("newsletter_subscribers")
      .select("*", { count: "exact", head: true })
      .is("unsubscribed_at", null),
    supabase
      .from("contact_submissions")
      .select("id, created_at, name, email, status")
      .order("created_at", { ascending: false })
      .limit(6),
    supabase
      .from("admin_audit_log")
      .select("id, created_at, action, entity_type, details")
      .order("created_at", { ascending: false })
      .limit(8),
  ]);

  const auditError = recentAudit.error;
  const auditRows = auditError ? [] : (recentAudit.data ?? []);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard"
        description="Pipeline health across inbound leads, subscribers, and recent admin activity. Data updates in real time from your Supabase project."
        actions={
          <Link
            href="/admin/settings"
            className="rounded-full border border-accent-gold/35 bg-accent-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-neon transition-colors hover:border-accent-emerald/40 hover:bg-accent-emerald/10"
          >
            Settings
          </Link>
        }
      />
      <div className="px-8 py-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard
            label="Total leads"
            value={totalLeads.count ?? 0}
            hint="All contact submissions"
          />
          <AdminStatCard
            label="New / open"
            value={newLeads.count ?? 0}
            hint="Status: new"
            trend="Prioritize follow-up"
          />
          <AdminStatCard
            label="Newsletter rows"
            value={totalSubs.count ?? 0}
            hint="Including opted out"
          />
          <AdminStatCard
            label="Active subscribers"
            value={activeSubs.count ?? 0}
            hint="No unsubscribe timestamp"
          />
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-2">
          <section className="rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-fg">Recent leads</h2>
              <Link
                href="/admin/leads"
                className="text-xs font-semibold text-accent-neon underline-offset-2 hover:underline"
              >
                View all
              </Link>
            </div>
            <ul className="mt-4 divide-y divide-border/60">
              {(recentLeads.data ?? []).length === 0 ? (
                <li className="py-6 text-center text-sm text-muted">No leads yet.</li>
              ) : (
                (recentLeads.data ?? []).map((r) => (
                  <li key={r.id} className="flex flex-wrap items-center justify-between gap-2 py-3 text-sm">
                    <div>
                      <p className="font-medium text-fg">{r.name}</p>
                      <p className="text-xs text-muted">{r.email}</p>
                    </div>
                    <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                      {r.status}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="rounded-2xl border border-border bg-card/50 p-6">
            <div className="flex items-center justify-between gap-2">
              <h2 className="font-display text-lg font-semibold text-fg">Activity</h2>
              <Link
                href="/admin/activity"
                className="text-xs font-semibold text-accent-neon underline-offset-2 hover:underline"
              >
                Full log
              </Link>
            </div>
            {auditError ? (
              <p className="mt-4 text-sm text-muted">
                Activity feed needs the latest database migration (
                <code className="text-xs">admin_audit_log</code>). Run SQL migrations, then
                refresh.
              </p>
            ) : (
              <ul className="mt-4 divide-y divide-border/60">
                {auditRows.length === 0 ? (
                  <li className="py-6 text-center text-sm text-muted">
                    No events logged yet. Updates to leads, newsletter, settings, and exports
                    appear here.
                  </li>
                ) : (
                  auditRows.map((row) => (
                    <li key={row.id} className="py-3 text-sm">
                      <p className="font-medium text-fg">{row.action}</p>
                      <p className="text-xs text-muted">
                        {new Date(row.created_at).toLocaleString()}
                        {row.entity_type ? ` · ${row.entity_type}` : ""}
                      </p>
                    </li>
                  ))
                )}
              </ul>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
