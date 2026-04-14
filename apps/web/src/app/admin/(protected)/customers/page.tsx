import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { createClient } from "@/lib/supabase/server";

type Agg = {
  email: string;
  name: string;
  company: string | null;
  lastAt: string;
  count: number;
  lastStatus: string | null;
};

export default async function AdminCustomersPage() {
  const supabase = await createClient();
  const { data: rows, error } = await supabase
    .from("contact_submissions")
    .select("email, name, company, created_at, status")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="p-8">
        <p className="text-sm text-red-300">Could not load data: {error.message}</p>
      </div>
    );
  }

  const byEmail = new Map<string, Agg>();
  for (const r of rows ?? []) {
    const key = r.email.trim().toLowerCase();
    const cur = byEmail.get(key);
    if (!cur) {
      byEmail.set(key, {
        email: r.email,
        name: r.name,
        company: r.company,
        lastAt: r.created_at,
        count: 1,
        lastStatus: r.status,
      });
    } else {
      cur.count += 1;
      if (new Date(r.created_at) > new Date(cur.lastAt)) {
        cur.lastAt = r.created_at;
        cur.name = r.name;
        cur.company = r.company;
        cur.lastStatus = r.status;
      }
    }
  }

  const customers = Array.from(byEmail.values()).sort(
    (a, b) => new Date(b.lastAt).getTime() - new Date(a.lastAt).getTime(),
  );

  return (
    <div>
      <AdminPageHeader
        eyebrow="CRM"
        title="Customers"
        description="Derived from unique lead emails — a lightweight CRM layer until dedicated customer accounts and orders are modeled. Each row aggregates every contact submission from that address."
        actions={
          <Link
            href="/admin/leads"
            className="rounded-full border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted transition-colors hover:border-accent-gold/40 hover:text-fg"
          >
            Raw leads
          </Link>
        }
      />
      <div className="px-8 pb-12">
        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border bg-bg-elevated/50 text-[10px] font-extrabold uppercase tracking-wider text-muted2">
              <tr>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Company</th>
                <th className="px-4 py-3">Touchpoints</th>
                <th className="px-4 py-3">Last activity</th>
                <th className="px-4 py-3">Latest status</th>
              </tr>
            </thead>
            <tbody>
              {customers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center text-muted">
                    No contacts yet. Leads will appear here automatically.
                  </td>
                </tr>
              ) : (
                customers.map((c) => (
                  <tr key={c.email} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3">
                      <p className="font-medium text-fg">{c.name}</p>
                      <a
                        href={`mailto:${c.email}`}
                        className="text-xs text-accent-neon underline-offset-2 hover:underline"
                      >
                        {c.email}
                      </a>
                    </td>
                    <td className="px-4 py-3 text-muted">{c.company ?? "—"}</td>
                    <td className="px-4 py-3 tabular-nums text-muted">{c.count}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-xs text-muted">
                      {new Date(c.lastAt).toLocaleString()}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted">
                        {c.lastStatus ?? "—"}
                      </span>
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
