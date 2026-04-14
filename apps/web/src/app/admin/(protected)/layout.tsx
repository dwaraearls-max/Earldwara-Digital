import { AdminAppShell } from "@/components/admin/AdminAppShell";
import { requireAdmin } from "@/lib/admin/auth";

export default async function ProtectedAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await requireAdmin();
  return (
    <AdminAppShell email={session.user.email ?? ""}>
      {children}
    </AdminAppShell>
  );
}
