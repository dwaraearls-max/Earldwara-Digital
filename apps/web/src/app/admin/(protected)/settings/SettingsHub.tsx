"use client";

import {
  updateAdminProfile,
  updateIntegrationNotes,
  updateSiteSettingsCategory,
} from "@/app/actions/admin-settings";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

type Profile = {
  full_name: string;
  company: string;
  phone: string;
  bio: string;
  email: string;
  role: string;
};

type SettingsBundle = {
  workspace: Record<string, unknown>;
  notifications: Record<string, unknown>;
  security: Record<string, unknown>;
  appearance: Record<string, unknown>;
  integrations: Record<string, unknown>;
};

type Flags = ReturnType<
  typeof import("@/lib/admin/integration-flags").getAdminIntegrationFlags
>;

function Panel({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-8 rounded-2xl border border-border bg-card/40 p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04)]"
    >
      <h2 className="font-display text-lg font-semibold text-fg">{title}</h2>
      <p className="mt-1 text-sm text-muted">{subtitle}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function FieldLabel({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) {
  return (
    <label
      htmlFor={htmlFor}
      className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted2"
    >
      {children}
    </label>
  );
}

function TextInput({
  id,
  name,
  defaultValue,
  placeholder,
  type = "text",
}: {
  id: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      defaultValue={defaultValue}
      placeholder={placeholder}
      className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none ring-accent-emerald focus:ring-2"
    />
  );
}

function SaveRow({ message, pending }: { message: string | null; pending: boolean }) {
  return (
    <div className="mt-4 flex flex-wrap items-center gap-3">
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-accent-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Saving…" : "Save changes"}
      </button>
      {message ? <span className="text-xs text-accent-emerald">{message}</span> : null}
    </div>
  );
}

const nav = [
  { id: "profile", label: "Profile" },
  { id: "workspace", label: "Workspace" },
  { id: "notifications", label: "Notifications" },
  { id: "security", label: "Security" },
  { id: "appearance", label: "Appearance" },
  { id: "integrations", label: "Integrations" },
];

export function SettingsHub({
  profile,
  settings,
  integrationFlags,
}: {
  profile: Profile;
  settings: SettingsBundle;
  integrationFlags: Flags;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [msgProfile, setMsgProfile] = useState<string | null>(null);
  const [msgWorkspace, setMsgWorkspace] = useState<string | null>(null);
  const [msgNotif, setMsgNotif] = useState<string | null>(null);
  const [msgSec, setMsgSec] = useState<string | null>(null);
  const [msgAppear, setMsgAppear] = useState<string | null>(null);
  const [msgInt, setMsgInt] = useState<string | null>(null);

  const w = settings.workspace;
  const n = settings.notifications;
  const s = settings.security;
  const a = settings.appearance;
  const i = settings.integrations;

  return (
    <div className="px-8 pb-16">
      <nav className="sticky top-0 z-10 -mx-2 mb-8 flex flex-wrap gap-2 border-b border-border bg-bg/95 py-3 backdrop-blur-md">
        {nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className="rounded-full border border-border px-3 py-1.5 text-xs font-semibold text-muted transition-colors hover:border-accent-gold/40 hover:text-fg"
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="mx-auto flex max-w-4xl flex-col gap-8">
        <Panel
          id="profile"
          title="Operator profile"
          subtitle="Your public profile fields (RLS: you can only edit your own row). Email is managed in Supabase Auth."
        >
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                setMsgProfile(null);
                const r = await updateAdminProfile({
                  full_name: (fd.get("full_name") as string) || null,
                  company: (fd.get("company") as string) || null,
                  phone: (fd.get("phone") as string) || null,
                  bio: (fd.get("bio") as string) || null,
                });
                setMsgProfile(r.error ?? "Saved.");
                router.refresh();
              });
            }}
          >
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="email-ro">Email (read only)</FieldLabel>
              <TextInput id="email-ro" name="_email" defaultValue={profile.email} />
              <p className="mt-1 text-[11px] text-muted2">Change via Supabase Auth or your IdP.</p>
            </div>
            <div>
              <FieldLabel htmlFor="full_name">Full name</FieldLabel>
              <TextInput id="full_name" name="full_name" defaultValue={profile.full_name} />
            </div>
            <div>
              <FieldLabel htmlFor="role-ro">Role</FieldLabel>
              <TextInput id="role-ro" name="_role" defaultValue={profile.role} />
            </div>
            <div>
              <FieldLabel htmlFor="company">Company</FieldLabel>
              <TextInput id="company" name="company" defaultValue={profile.company} />
            </div>
            <div>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <TextInput id="phone" name="phone" defaultValue={profile.phone} />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="bio">Bio</FieldLabel>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                defaultValue={profile.bio}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none ring-accent-emerald focus:ring-2"
              />
            </div>
            <div className="sm:col-span-2">
              <SaveRow message={msgProfile} pending={pending} />
            </div>
          </form>
        </Panel>

        <Panel
          id="workspace"
          title="Workspace & brand"
          subtitle="Defaults for exports, internal labels, and how the team refers to this deployment."
        >
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                setMsgWorkspace(null);
                const r = await updateSiteSettingsCategory("workspace", {
                  businessName: fd.get("businessName") as string,
                  tagline: fd.get("tagline") as string,
                  defaultTimezone: fd.get("defaultTimezone") as string,
                  defaultLocale: fd.get("defaultLocale") as string,
                  supportEmail: fd.get("supportEmail") as string,
                  phone: fd.get("ws_phone") as string,
                  websiteUrl: fd.get("websiteUrl") as string,
                });
                setMsgWorkspace(r.error ?? "Saved.");
                router.refresh();
              });
            }}
          >
            <div>
              <FieldLabel htmlFor="businessName">Business name</FieldLabel>
              <TextInput
                id="businessName"
                name="businessName"
                defaultValue={String(w.businessName ?? "")}
              />
            </div>
            <div>
              <FieldLabel htmlFor="tagline">Tagline</FieldLabel>
              <TextInput id="tagline" name="tagline" defaultValue={String(w.tagline ?? "")} />
            </div>
            <div>
              <FieldLabel htmlFor="defaultTimezone">Default timezone</FieldLabel>
              <TextInput
                id="defaultTimezone"
                name="defaultTimezone"
                defaultValue={String(w.defaultTimezone ?? "Africa/Accra")}
                placeholder="Africa/Accra"
              />
            </div>
            <div>
              <FieldLabel htmlFor="defaultLocale">Locale</FieldLabel>
              <TextInput
                id="defaultLocale"
                name="defaultLocale"
                defaultValue={String(w.defaultLocale ?? "en-GH")}
              />
            </div>
            <div>
              <FieldLabel htmlFor="supportEmail">Support email (display)</FieldLabel>
              <TextInput
                id="supportEmail"
                name="supportEmail"
                type="email"
                defaultValue={String(w.supportEmail ?? "")}
              />
            </div>
            <div>
              <FieldLabel htmlFor="ws_phone">Phone (display)</FieldLabel>
              <TextInput id="ws_phone" name="ws_phone" defaultValue={String(w.phone ?? "")} />
            </div>
            <div className="sm:col-span-2">
              <FieldLabel htmlFor="websiteUrl">Website URL</FieldLabel>
              <TextInput
                id="websiteUrl"
                name="websiteUrl"
                defaultValue={String(w.websiteUrl ?? "")}
                placeholder="https://"
              />
            </div>
            <div className="sm:col-span-2">
              <SaveRow message={msgWorkspace} pending={pending} />
            </div>
          </form>
        </Panel>

        <Panel
          id="notifications"
          title="Notifications"
          subtitle="Preferences for operational alerts. Delivery still depends on Resend / webhooks configured in env."
        >
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                setMsgNotif(null);
                const r = await updateSiteSettingsCategory("notifications", {
                  emailDigest: fd.get("emailDigest") as string,
                  leadAlerts: fd.get("leadAlerts") === "on",
                  newsletterWeeklySummary: fd.get("newsletterWeeklySummary") === "on",
                  marketingEmails: fd.get("marketingEmails") === "on",
                  slackWebhookUrl: fd.get("slackWebhookUrl") as string,
                });
                setMsgNotif(r.error ?? "Saved.");
                router.refresh();
              });
            }}
          >
            <div>
              <FieldLabel htmlFor="emailDigest">Email digest</FieldLabel>
              <select
                id="emailDigest"
                name="emailDigest"
                defaultValue={String(n.emailDigest ?? "off")}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none ring-accent-emerald focus:ring-2"
              >
                <option value="off">Off</option>
                <option value="daily">Daily summary</option>
                <option value="weekly">Weekly summary</option>
              </select>
            </div>
            <div>
              <FieldLabel htmlFor="slackWebhookUrl">Slack / webhook URL (optional)</FieldLabel>
              <TextInput
                id="slackWebhookUrl"
                name="slackWebhookUrl"
                defaultValue={String(n.slackWebhookUrl ?? "")}
                placeholder="https://hooks.slack.com/..."
              />
            </div>
            <div className="flex flex-col gap-3 sm:col-span-2">
              <label className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  name="leadAlerts"
                  defaultChecked={Boolean(n.leadAlerts ?? true)}
                  className="h-4 w-4 rounded border-border text-accent-gold"
                />
                Instant lead alerts (when wired to automation)
              </label>
              <label className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  name="newsletterWeeklySummary"
                  defaultChecked={Boolean(n.newsletterWeeklySummary)}
                  className="h-4 w-4 rounded border-border text-accent-gold"
                />
                Weekly newsletter growth summary
              </label>
                           <label className="flex items-center gap-2 text-sm text-muted">
                <input
                  type="checkbox"
                  name="marketingEmails"
                  defaultChecked={Boolean(n.marketingEmails)}
                  className="h-4 w-4 rounded border-border text-accent-gold"
                />
                Product updates from vendors (internal)
              </label>
            </div>
            <div className="sm:col-span-2">
              <SaveRow message={msgNotif} pending={pending} />
            </div>
          </form>
        </Panel>

        <Panel
          id="security"
          title="Security & compliance"
          subtitle="Guardrails for exports and session hygiene. Keys and secrets never belong in this UI."
        >
          <form
            className="grid gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                setMsgSec(null);
                const r = await updateSiteSettingsCategory("security", {
                  requireReauthForExports: fd.get("requireReauthForExports") === "on",
                  sessionReminderHours: Number(fd.get("sessionReminderHours") || 72),
                  ipAllowlistEnabled: fd.get("ipAllowlistEnabled") === "on",
                  ipAllowlist: fd.get("ipAllowlist") as string,
                });
                setMsgSec(r.error ?? "Saved.");
                router.refresh();
              });
            }}
          >
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                name="requireReauthForExports"
                defaultChecked={Boolean(s.requireReauthForExports)}
                className="h-4 w-4 rounded border-border text-accent-gold"
              />
              Require re-authentication for CSV exports (blocks server exports until disabled)
            </label>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <FieldLabel htmlFor="sessionReminderHours">Session reminder (hours)</FieldLabel>
                <TextInput
                  id="sessionReminderHours"
                  name="sessionReminderHours"
                  type="number"
                  defaultValue={String(s.sessionReminderHours ?? 72)}
                />
              </div>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                name="ipAllowlistEnabled"
                defaultChecked={Boolean(s.ipAllowlistEnabled)}
                className="h-4 w-4 rounded border-border text-accent-gold"
              />
              Enable IP allowlist (documentation only — enforce at edge / VPN)
            </label>
            <div>
              <FieldLabel htmlFor="ipAllowlist">Allowlist (CIDR / IPs, one per line)</FieldLabel>
              <textarea
                id="ipAllowlist"
                name="ipAllowlist"
                rows={3}
                defaultValue={String(s.ipAllowlist ?? "")}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 font-mono text-xs text-fg outline-none ring-accent-emerald focus:ring-2"
              />
            </div>
            <div>
              <SaveRow message={msgSec} pending={pending} />
            </div>
          </form>
        </Panel>

        <Panel
          id="appearance"
          title="Appearance"
          subtitle="Density and accent presets for this admin shell (stored server-side for future theming)."
        >
          <form
            className="grid gap-4 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                setMsgAppear(null);
                const r = await updateSiteSettingsCategory("appearance", {
                  density: fd.get("density") as string,
                  accentPreset: fd.get("accentPreset") as string,
                  showSidebarLabels: fd.get("showSidebarLabels") === "on",
                });
                setMsgAppear(r.error ?? "Saved.");
                router.refresh();
              });
            }}
          >
            <div>
              <FieldLabel htmlFor="density">Density</FieldLabel>
              <select
                id="density"
                name="density"
                defaultValue={String(a.density ?? "comfortable")}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none ring-accent-emerald focus:ring-2"
              >
                <option value="comfortable">Comfortable</option>
                <option value="compact">Compact</option>
              </select>
            </div>
            <div>
              <FieldLabel htmlFor="accentPreset">Accent preset</FieldLabel>
              <select
                id="accentPreset"
                name="accentPreset"
                defaultValue={String(a.accentPreset ?? "gold")}
                className="w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none ring-accent-emerald focus:ring-2"
              >
                <option value="gold">Blue / frost (default)</option>
                <option value="emerald">Sky accent</option>
                <option value="violet">Violet</option>
              </select>
            </div>
            <label className="flex items-center gap-2 text-sm text-muted sm:col-span-2">
              <input
                type="checkbox"
                name="showSidebarLabels"
                defaultChecked={Boolean(a.showSidebarLabels ?? true)}
                className="h-4 w-4 rounded border-border text-accent-gold"
              />
              Show sidebar section labels
            </label>
            <div className="sm:col-span-2">
              <SaveRow message={msgAppear} pending={pending} />
            </div>
          </form>
        </Panel>

        <Panel
          id="integrations"
          title="Integrations health"
          subtitle="Live checks against environment variables on this Next.js deployment. Values are never shown."
        >
          <div className="grid gap-3 sm:grid-cols-2">
            {(
              [
                ["NEXT_PUBLIC_SUPABASE_URL", integrationFlags.supabaseUrl],
                ["Anon / publishable key", integrationFlags.supabaseAnon],
                ["SUPABASE_SERVICE_ROLE_KEY", integrationFlags.serviceRole],
                ["NEXT_PUBLIC_SITE_URL", integrationFlags.nextPublicSiteUrl],
                ["RESEND_API_KEY", integrationFlags.resend],
                ["RESEND_FROM_EMAIL", integrationFlags.resendFrom],
                ["NEXT_PUBLIC_SANITY_PROJECT_ID", integrationFlags.sanityProject],
                ["NEXT_PUBLIC_SANITY_DATASET", integrationFlags.sanityDataset],
              ] as const
            ).map(([label, ok]) => (
              <div
                key={label}
                className="flex items-center justify-between rounded-xl border border-border bg-bg/60 px-3 py-2.5 text-xs"
              >
                <span className="font-mono text-muted">{label}</span>
                <span
                  className={
                    ok ? "font-bold text-accent-emerald" : "font-bold text-rose-500"
                  }
                >
                  {ok ? "OK" : "Missing"}
                </span>
              </div>
            ))}
          </div>
          <form
            className="mt-6"
            onSubmit={(e) => {
              e.preventDefault();
              const fd = new FormData(e.currentTarget);
              startTransition(async () => {
                setMsgInt(null);
                const r = await updateIntegrationNotes((fd.get("notes") as string) ?? "");
                setMsgInt(r.error ?? "Notes saved.");
                router.refresh();
              });
            }}
          >
            <FieldLabel htmlFor="int-notes">Internal runbook / notes</FieldLabel>
            <textarea
              id="int-notes"
              name="notes"
              rows={5}
              defaultValue={String(i.notes ?? "")}
              className="mt-1 w-full rounded-xl border border-border bg-bg px-3 py-2.5 text-sm text-fg outline-none ring-accent-emerald focus:ring-2"
            />
            <SaveRow message={msgInt} pending={pending} />
          </form>
        </Panel>
      </div>
    </div>
  );
}
