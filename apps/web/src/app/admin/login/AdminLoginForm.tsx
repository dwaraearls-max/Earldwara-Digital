"use client";

import { createClient } from "@/lib/supabase/client";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function messageFromErrorParam(err: string | null) {
  if (err === "forbidden") {
    return "You are signed in but this account is not an admin.";
  }
  if (err === "config") {
    return "Server could not load Supabase. Check .env.local and restart the dev server.";
  }
  return null;
}

export function AdminLoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") ?? "/admin";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const urlMessage = messageFromErrorParam(searchParams.get("error"));
  const message = formMessage ?? urlMessage;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormMessage(null);
    setPending(true);
    const supabase = createClient();
    const emailNorm = email.trim().toLowerCase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: emailNorm,
      password,
    });
    if (error) {
      const msg = error.message?.includes("Invalid login credentials")
        ? "Invalid email or password. Reset the password in Supabase (Authentication → Users) or run npm run bootstrap-admin with BOOTSTRAP_ADMIN_PASSWORD."
        : error.message;
      setFormMessage(msg);
      setPending(false);
      return;
    }
    if (!data.session) {
      setFormMessage(
        "Sign-in returned no session. Allow cookies for this site, disable blockers, and use the same host every time (either localhost or 127.0.0.1 — not both).",
      );
      setPending(false);
      return;
    }
    const { data: check } = await supabase.auth.getSession();
    if (!check.session) {
      setFormMessage(
        "Session was not stored. Try clearing site data for this address, then sign in again.",
      );
      setPending(false);
      return;
    }
    const target = next.startsWith("/") ? next : "/admin";
    await new Promise((r) => setTimeout(r, 100));
    window.location.assign(target);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {message ? (
        <p className="rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">
          {message}
        </p>
      ) : null}
      <div>
        <label htmlFor="admin-email" className="block text-xs font-medium text-muted">
          Email
        </label>
        <input
          id="admin-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg outline-none ring-accent focus:ring-2"
        />
      </div>
      <div>
        <label
          htmlFor="admin-password"
          className="block text-xs font-medium text-muted"
        >
          Password
        </label>
        <input
          id="admin-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2 text-sm text-fg outline-none ring-accent focus:ring-2"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
