import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";
import { getSupabaseBrowserEnv } from "@/lib/supabase/env";

export type AdminSession = {
  user: { id: string; email?: string | null };
  profile: { role: string; full_name: string | null } | null;
};

/** Safe for public routes: never throws; returns null if env/session is unavailable. */
export async function getSessionWithProfile(): Promise<AdminSession | null> {
  if (!getSupabaseBrowserEnv()) return null;

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) return null;

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role, full_name")
      .eq("id", user.id)
      .maybeSingle();

    if (profileError) {
      console.error("[admin] profiles select:", profileError.message);
    }

    return {
      user: { id: user.id, email: user.email },
      profile: profile ?? null,
    };
  } catch (e: unknown) {
    if (
      typeof e === "object" &&
      e !== null &&
      "digest" in e &&
      (e as { digest?: string }).digest === "DYNAMIC_SERVER_USAGE"
    ) {
      throw e;
    }
    console.error("[admin] getSessionWithProfile:", e);
    return null;
  }
}

export async function requireAdmin(): Promise<AdminSession> {
  if (!getSupabaseBrowserEnv()) {
    redirect("/admin/login?error=config");
  }

  const session = await getSessionWithProfile();
  if (!session) redirect("/admin/login");
  if (session.profile?.role !== "admin") redirect("/admin/forbidden");
  return session;
}
