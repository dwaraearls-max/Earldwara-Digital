import Link from "next/link";
import { AdminPageHeader } from "@/components/admin/AdminPageHeader";
import { AdminPlaceholder } from "@/components/admin/AdminPlaceholder";

const phases = [
  {
    phase: "Phase 0 — Foundation",
    done: true,
    items: ["SKU / product catalog model", "Tax & currency rules (GHS)", "Receipt templates"],
  },
  {
    phase: "Phase 1 — Counter mode",
    done: false,
    items: ["Barcode / quick search", "Cart + line-item discounts", "Print / PDF receipt"],
  },
  {
    phase: "Phase 2 — Money",
    done: false,
    items: ["Mobile money + card capture (per gateway)", "Shift open / close + cash drawer"],
  },
  {
    phase: "Phase 3 — Intelligence",
    done: false,
    items: ["Offline-tolerant queue", "Staff roles & PINs", "Nightly sync to analytics"],
  },
];

export default function AdminPosPage() {
  return (
    <div>
      <AdminPageHeader
        eyebrow="Operations"
        title="Point of sale"
        description="Blueprint for in-person and assisted selling: same catalog truth as the web, hardened payments, and operator-grade reporting. Nothing here charges cards yet — this is your implementation runway."
        actions={
          <Link
            href="/admin/settings"
            className="rounded-full border border-accent-gold/35 bg-accent-gold/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-accent-neon transition-colors hover:border-accent-emerald/40 hover:bg-accent-emerald/10"
          >
            Integrations
          </Link>
        }
      />
      <AdminPlaceholder
        title="POS control plane"
        description="When you connect inventory and a payment provider, this area becomes the live register. Until then, use it as the single source of truth for what must ship before you put hardware on a counter."
        bullets={[
          "Shared product graph with the storefront (no double entry)",
          "Role-based cashier vs. manager flows",
          "Exports feed the same admin audit log as CRM tools",
        ]}
        cta={{ href: "/admin/activity", label: "View activity log" }}
      />
      <div className="px-8 pb-16">
        <h2 className="font-display text-lg font-semibold text-fg">Delivery phases</h2>
        <p className="mt-1 text-sm text-muted">
          Tick these off with engineering — each phase unlocks the next level of operational safety.
        </p>
        <ol className="mt-6 space-y-4">
          {phases.map((p) => (
            <li
              key={p.phase}
              className="rounded-2xl border border-border bg-card/30 p-5"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                    p.done
                      ? "bg-accent-emerald/20 text-accent-emerald"
                      : "bg-white/5 text-muted2"
                  }`}
                >
                  {p.done ? "Ready" : "Queued"}
                </span>
                <h3 className="font-medium text-fg">{p.phase}</h3>
              </div>
              <ul className="mt-3 space-y-1.5 text-sm text-muted">
                {p.items.map((i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-accent-gold" aria-hidden>
                      ▸
                    </span>
                    {i}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
