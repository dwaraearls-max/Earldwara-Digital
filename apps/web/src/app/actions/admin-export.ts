"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { logAdminAudit } from "@/lib/admin/audit";

function csvEscape(s: string) {
  if (/[",\n\r]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

async function requireAdminExport() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { supabase: null, user: null };
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  if (profile?.role !== "admin") return { supabase, user: null };

  const { data: sec } = await supabase
    .from("site_settings")
    .select("payload")
    .eq("category", "security")
    .maybeSingle();
  const requireReauth = Boolean(
    (sec?.payload as { requireReauthForExports?: boolean } | undefined)
      ?.requireReauthForExports,
  );
  if (requireReauth) {
    return { supabase, user, blocked: true as const };
  }
  return { supabase, user, blocked: false as const };
}

export async function exportLeadsCsv() {
  const ctx = await requireAdminExport();
  if (!ctx.supabase || !ctx.user) return { error: "Unauthorized" };
  if ("blocked" in ctx && ctx.blocked) {
    return {
      error:
        "Exports are restricted in Security settings. Turn off “Require re-auth for exports” or export from Supabase directly.",
    };
  }

  const { data, error } = await ctx.supabase
    .from("contact_submissions")
    .select(
      "created_at, name, email, company, service_interest, message, status, source",
    )
    .order("created_at", { ascending: false });
  if (error) return { error: error.message };

  const headers = [
    "created_at",
    "name",
    "email",
    "company",
    "service_interest",
    "message",
    "status",
    "source",
  ];
  const lines = [
    headers.join(","),
    ...(data ?? []).map((r) =>
      [
        r.created_at,
        r.name,
        r.email,
        r.company ?? "",
        r.service_interest ?? "",
        r.message ?? "",
        r.status ?? "",
        r.source ?? "",
      ]
        .map((v) => csvEscape(String(v)))
        .join(","),
    ),
  ];
  const csv = lines.join("\r\n");

  await logAdminAudit(ctx.supabase, ctx.user.id, {
    action: "export.leads_csv",
    details: { rows: data?.length ?? 0 },
  });

  revalidatePath("/admin/activity");
  return { csv, filename: `leads-${new Date().toISOString().slice(0, 10)}.csv` };
}

export async function exportNewsletterCsv() {
  const ctx = await requireAdminExport();
  if (!ctx.supabase || !ctx.user) return { error: "Unauthorized" };
  if ("blocked" in ctx && ctx.blocked) {
    return {
      error:
        "Exports are restricted in Security settings. Turn off “Require re-auth for exports” or export from Supabase directly.",
    };
  }

  const { data, error } = await ctx.supabase
    .from("newsletter_subscribers")
    .select("created_at, email, source, unsubscribed_at")
    .order("created_at", { ascending: false });
  if (error) return { error: error.message };

  const headers = ["created_at", "email", "source", "unsubscribed_at"];
  const lines = [
    headers.join(","),
    ...(data ?? []).map((r) =>
      [r.created_at, r.email, r.source ?? "", r.unsubscribed_at ?? ""]
        .map((v) => csvEscape(String(v)))
        .join(","),
    ),
  ];
  const csv = lines.join("\r\n");

  await logAdminAudit(ctx.supabase, ctx.user.id, {
    action: "export.newsletter_csv",
    details: { rows: data?.length ?? 0 },
  });

  revalidatePath("/admin/activity");
  return {
    csv,
    filename: `newsletter-${new Date().toISOString().slice(0, 10)}.csv`,
  };
}
