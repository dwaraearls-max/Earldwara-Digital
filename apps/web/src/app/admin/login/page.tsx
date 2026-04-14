import { redirect } from "next/navigation";
import { Suspense } from "react";
import { getSessionWithProfile } from "@/lib/admin/auth";
import { getSupabaseBrowserEnv } from "@/lib/supabase/env";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage() {
  const supabaseReady = !!getSupabaseBrowserEnv();

  if (supabaseReady) {
    const session = await getSessionWithProfile();
    if (session?.profile?.role === "admin") {
      redirect("/admin");
    }
    if (session?.user && session.profile?.role !== "admin") {
      redirect("/admin/forbidden");
    }
  }

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-bg px-4 text-fg">
      <div className="w-full max-w-md rounded-2xl border border-border bg-bg-muted/30 p-8">
        <h1 className="text-xl font-semibold">Admin sign in</h1>
        <p className="mt-1 text-sm text-muted">
          Sign in with the email and password for an account that has been
          granted admin access. Use the same URL host you always use (e.g. only{" "}
          <code className="rounded bg-bg px-1 py-0.5 text-xs">localhost</code>{" "}
          or only{" "}
          <code className="rounded bg-bg px-1 py-0.5 text-xs">127.0.0.1</code>
          ) so cookies stay valid.
        </p>
        {!supabaseReady ? (
          <p className="mt-6 rounded-lg border border-blue-400/45 bg-blue-500/10 px-3 py-2 text-sm text-fg">
            Supabase is not configured. Add{" "}
            <code className="rounded bg-bg px-1 py-0.5 text-xs">
              NEXT_PUBLIC_SUPABASE_URL
            </code>{" "}
            and{" "}
            <code className="rounded bg-bg px-1 py-0.5 text-xs">
              NEXT_PUBLIC_SUPABASE_ANON_KEY
            </code>{" "}
            (or{" "}
            <code className="rounded bg-bg px-1 py-0.5 text-xs">
              NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
            </code>
            ) to <code className="rounded bg-bg px-1 py-0.5 text-xs">.env.local</code>,
            then restart the dev server.
          </p>
        ) : (
          <Suspense fallback={<p className="mt-6 text-sm text-muted">Loading…</p>}>
            <AdminLoginForm />
          </Suspense>
        )}
      </div>
    </div>
  );
}
