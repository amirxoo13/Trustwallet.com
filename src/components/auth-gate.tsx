import { useEffect, type ReactNode } from "react";
import { useNavigate } from "@tanstack/react-router";
import { LogoMark } from "@/components/logo";
import { useWallet } from "@/lib/store";

export function AuthGate({ children }: { children: ReactNode }) {
  const hydrated = useWallet((s) => s.hydrated);
  const authenticated = useWallet((s) => s.authenticated);
  const navigate = useNavigate();

  useEffect(() => {
    if (hydrated && !authenticated) {
      void navigate({ to: "/login" });
    }
  }, [hydrated, authenticated, navigate]);

  if (!hydrated || !authenticated) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background">
        <LogoMark size={40} />
        <p className="text-sm text-muted">Trust</p>
      </div>
    );
  }

  return <>{children}</>;
}
