import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LogoMark } from "@/components/logo";
import { hasAdminProof } from "@/lib/admin-proof";
import { useWallet } from "@/lib/store";

export function AdminGate({ children }: { children: ReactNode }) {
  const hydrated = useWallet((s) => s.hydrated);
  const authenticated = useWallet((s) => s.authenticated);
  const role = useWallet((s) => s.role);
  const navigate = useNavigate();

  useEffect(() => {
    if (!hydrated) return;
    if (!authenticated) {
      void navigate({ to: "/login" });
      return;
    }
    if (role !== "admin" || !hasAdminProof()) {
      void navigate({ to: "/wallet" });
    }
  }, [hydrated, authenticated, role, navigate]);

  if (!hydrated || !authenticated || role !== "admin" || !hasAdminProof()) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background">
        <LogoMark size={40} />
        <p className="text-sm text-muted">Aurex</p>
      </div>
    );
  }

  return <>{children}</>;
}
