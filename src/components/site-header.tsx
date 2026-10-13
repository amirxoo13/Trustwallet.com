import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LogoWord } from "@/components/logo";
import { hasAdminProof } from "@/lib/admin-proof";
import { useSite } from "@/lib/site-store";
import { useWallet } from "@/lib/store";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const authenticated = useWallet((s) => s.authenticated);
  const hydrated = useWallet((s) => s.hydrated);
  const role = useWallet((s) => s.role);
  const site = useSite();
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });

  const links = [
    { to: "/markets", label: site.navMarkets },
    { to: "/features", label: site.navFeatures },
    { to: "/security", label: site.navSecurity },
  ];

  return (
    <header className="sticky top-[var(--safe-top)] z-40 border-b border-border bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-4">
        <Link to="/" className="min-w-0">
          <LogoWord className="truncate" />
        </Link>
        <nav className="hidden items-center gap-7 text-sm text-muted md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "transition-colors duration-150 hover:text-foreground",
                path === l.to && "text-foreground",
              )}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          {hydrated && authenticated && role === "admin" && hasAdminProof() ? (
            <Link to="/studio" className="hidden h-9 items-center rounded-full px-3 text-xs text-muted shadow-border sm:inline-flex">
              Panel
            </Link>
          ) : null}
          <Button asChild size="sm" variant="solid" className="rounded-full px-4">
            <Link to={hydrated && authenticated ? "/wallet" : "/login"}>
              {hydrated && authenticated ? site.navOpenWallet : site.navLogin}
            </Link>
          </Button>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-md md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t border-border px-4 py-3 md:hidden">
          <div className="flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-sm text-foreground"
              >
                {l.label}
              </Link>
            ))}
            {hydrated && authenticated && role === "admin" && hasAdminProof() ? (
              <Link to="/studio" onClick={() => setOpen(false)} className="rounded-md px-3 py-3 text-sm text-foreground">
                Control panel
              </Link>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  );
}
