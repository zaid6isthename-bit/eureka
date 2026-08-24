import { AppShell } from "@/components/app/AppShell";
import { AuthGuard } from "@/components/app/AuthGuard";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard>
      <AppShell>{children}</AppShell>
    </AuthGuard>
  );
}
