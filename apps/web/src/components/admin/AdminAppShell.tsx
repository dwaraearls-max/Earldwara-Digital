"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoutButton } from "./LogoutButton";

type NavItem = { href: string; label: string; icon: "dash" | "leads" | "mail" | "users" | "pos" | "pulse" | "gear" };

const groups: { title: string; items: NavItem[] }[] = [
  {
    title: "Overview",
    items: [{ href: "/admin", label: "Dashboard", icon: "dash" }],
  },
  {
    title: "CRM",
    items: [
      { href: "/admin/leads", label: "Leads", icon: "leads" },
      { href: "/admin/newsletter", label: "Newsletter", icon: "mail" },
      { href: "/admin/customers", label: "Customers", icon: "users" },
    ],
  },
  {
    title: "Operations",
    items: [{ href: "/admin/pos", label: "POS", icon: "pos" }],
  },
  {
    title: "System",
    items: [
      { href: "/admin/activity", label: "Activity", icon: "pulse" },
      { href: "/admin/settings", label: "Settings", icon: "gear" },
    ],
  },
];

function Icon({ name }: { name: NavItem["icon"] }) {
  const cls = "h-4 w-4 shrink-0 text-accent-neon/90";
  switch (name) {
    case "dash":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 5a1 1 0 011-1h4a1 1 0 011 1v5a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM14 5a1 1 0 011-1h4a1 1 0 011 1v2a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM4 16a1 1 0 011-1h4a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM14 13a1 1 0 011-1h4a1 1 0 011 1v6a1 1 0 01-1 1h-4a1 1 0 01-1-1v-6z" />
        </svg>
      );
    case "leads":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "mail":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      );
    case "users":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      );
    case "pos":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      );
    case "pulse":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    case "gear":
      return (
        <svg className={cls} fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    default:
      return null;
  }
}

export function AdminAppShell({
  email,
  children,
}: {
  email: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function active(href: string) {
    if (href === "/admin") return pathname === "/admin";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <div className="fixed inset-0 z-[250] flex bg-bg text-fg">
      <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-bg-elevated/95 backdrop-blur-xl">
        <div className="border-b border-border px-4 py-5">
          <Link
            href="/admin"
            className="font-display text-lg font-semibold tracking-tight text-fg transition-colors hover:text-accent-neon"
          >
            Earlsdwara
          </Link>
          <p className="mt-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-muted2">
            Command center
          </p>
        </div>
        <nav className="flex flex-1 flex-col gap-6 overflow-y-auto p-3">
          {groups.map((g) => (
            <div key={g.title}>
              <p className="mb-2 px-2 text-[10px] font-extrabold uppercase tracking-wider text-muted2">
                {g.title}
              </p>
              <div className="flex flex-col gap-0.5">
                {g.items.map((item) => {
                  const on = active(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                        on
                          ? "bg-accent-neon/10 text-accent-neon shadow-[inset_0_0_0_1px_rgba(37,99,235,0.22)]"
                          : "text-muted hover:bg-card hover:text-fg"
                      }`}
                    >
                      <Icon name={item.icon} />
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
        <div className="border-t border-border p-3">
          <p className="truncate px-1 text-xs text-muted" title={email}>
            {email || "—"}
          </p>
          <LogoutButton />
        </div>
      </aside>
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border bg-bg/90 px-6 py-3 backdrop-blur-md">
          <p className="hidden text-xs text-muted sm:block">
            Signed in as administrator ·{" "}
            <span className="text-muted2">Leads & newsletter sync from the public site</span>
          </p>
          <div className="flex items-center gap-2">
            <Link
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors hover:border-accent-gold/40 hover:text-fg"
            >
              View site
            </Link>
            <span className="rounded-full border border-accent-emerald/30 bg-accent-emerald/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-emerald">
              Live
            </span>
          </div>
        </header>
        <main className="min-h-0 flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
