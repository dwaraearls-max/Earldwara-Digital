import Link from "next/link";

export default function AdminForbiddenPage() {
  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center bg-bg px-4 text-fg">
      <div className="max-w-md rounded-2xl border border-border bg-bg-muted/30 p-8 text-center">
        <h1 className="text-xl font-semibold">Access denied</h1>
        <p className="mt-2 text-sm text-muted">
          You are signed in, but <code className="text-xs">profiles.role</code> is
          not <code className="text-xs">admin</code>. Promote your user in Supabase
          (SQL editor):{" "}
          <code className="mt-2 block break-all rounded bg-bg px-2 py-1.5 text-left text-[11px] text-muted">
            update public.profiles set role = &apos;admin&apos; where email =
            &apos;you@example.com&apos;;
          </code>
          or run <code className="text-xs">npm run bootstrap-admin</code> from{" "}
          <code className="text-xs">apps/web</code>.
        </p>
        <Link
          href="/admin/login"
          className="mt-4 inline-block text-sm text-accent underline-offset-2 hover:underline"
        >
          Back to admin sign in
        </Link>
        <Link
          href="/"
          className="mt-6 block rounded-full border border-border px-5 py-2 text-sm font-medium transition-colors hover:bg-bg-muted"
        >
          Back to site
        </Link>
      </div>
    </div>
  );
}
