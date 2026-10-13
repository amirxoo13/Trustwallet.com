import type { ReactNode } from "react";
import { Link, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowLeftRight,
  Clock3,
  Home,
  Infinity as InfinityIcon,
  LogOut,
  Search,
  Settings,
  SlidersHorizontal,
  TrendingUp,
  UserRound,
} from "lucide-react";
import { LogoMark } from "@/components/logo";
import { t } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";
import { hasAdminProof } from "@/lib/admin-proof";
import { useWallet } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WalletShell({
  children,
  title,
  home = false,
}: {
  children: ReactNode;
  title?: string;
  home?: boolean;
}) {
  const logout = useWallet((s) => s.logout);
  const copy = t();
  const site = useSite();
  const role = useWallet((s) => s.role);
  const navigate = useNavigate();
  const router = useRouter();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const isHome = path === "/wallet" || path === "/wallet/";
  const backTo = isHome ? "/" : "/wallet";

  function goBack() {
    const idx = (window.history.state as { idx?: number } | null)?.idx;
    if (typeof idx === "number" && idx > 0) {
      router.history.back();
      return;
    }
    void navigate({ to: backTo });
  }

  function openSearch() {
    sessionStorage.setItem("aurex-open-find", "1");
    if (!isHome) {
      void navigate({ to: "/wallet" });
      return;
    }
    window.dispatchEvent(new Event("aurex-find"));
  }

  const items = [
    { to: "/wallet", icon: Home, label: site.tabHome, match: (p: string) => p === "/wallet" || p === "/wallet/" },
    { to: "/wallet/markets", icon: TrendingUp, label: site.tabMarkets, match: (p: string) => p.startsWith("/wallet/markets") },
    { to: "/wallet/swap", icon: ArrowLeftRight, label: site.tabSwap, match: (p: string) => p.startsWith("/wallet/swap") },
    { to: "/wallet/activity", icon: Clock3, label: site.tabActivity, match: (p: string) => p.startsWith("/wallet/activity") },
    { to: "/wallet/profile", icon: UserRound, label: site.tabProfile, match: (p: string) => p.startsWith("/wallet/profile") },
  ];

  const dock = [
    { to: "/wallet", kind: "home" as const, label: site.tabHome, match: (p: string) => p === "/wallet" || p === "/wallet/" },
    { to: "/wallet/markets", kind: "chart" as const, label: site.tabMarkets, match: (p: string) => p.startsWith("/wallet/markets") },
    { to: "/wallet/swap", kind: "infinity" as const, label: site.tabSwap, match: (p: string) => p.startsWith("/wallet/swap") },
  ];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh max-w-6xl">
        <aside className="sticky top-0 hidden h-dvh w-[88px] shrink-0 flex-col items-center border-e border-border py-5 md:flex">
          <Link to="/wallet" className="mb-6">
            <LogoMark size={32} />
          </Link>
          <nav className="flex flex-1 flex-col gap-1">
            {items.map((item) => {
              const active = item.match(path);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex size-14 flex-col items-center justify-center gap-1 rounded-lg text-[10px] text-muted transition-colors duration-150",
                    active && "bg-card text-foreground",
                  )}
                >
                  <item.icon className="size-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          {role === "admin" && hasAdminProof() ? (
            <Link
              to="/studio"
              className={cn(
                "flex size-14 items-center justify-center rounded-lg text-muted",
                path.startsWith("/studio") && "bg-card text-foreground",
              )}
              aria-label="Control panel"
            >
              <SlidersHorizontal className="size-5" />
            </Link>
          ) : null}
          <Link
            to="/wallet/settings"
            className={cn(
              "flex size-14 items-center justify-center rounded-lg text-muted",
              path.startsWith("/wallet/settings") && "bg-card text-foreground",
            )}
          >
            <Settings className="size-5" />
          </Link>
          <button
            type="button"
            className="mt-1 flex size-14 items-center justify-center rounded-lg text-muted"
            onClick={() => {
              logout();
              void navigate({ to: "/" });
            }}
            aria-label={copy.wallet.logout}
          >
            <LogOut className="size-5" />
          </button>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col pb-28 md:pb-0">
          {!home && title ? (
            <div className="sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md">
              <div className="flex min-w-0 flex-1 items-center gap-1">
                <button type="button" onClick={goBack} className="inline-flex size-11 shrink-0 items-center justify-center rounded-md text-muted" aria-label="Back">
                  <ArrowLeft className="size-5" />
                </button>
                <p className="truncate font-display text-sm font-semibold">{title}</p>
              </div>
              {role === "admin" && hasAdminProof() ? (
                <Link to="/studio" className="inline-flex size-11 items-center justify-center rounded-md text-muted" aria-label="Control panel">
                  <SlidersHorizontal className="size-5" />
                </Link>
              ) : null}
            </div>
          ) : null}
          <div className="flex-1">{children}</div>
        </div>
      </div>

      <nav className="pointer-events-none fixed inset-x-0 bottom-0 z-30 flex items-center justify-center gap-3 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <div className="pointer-events-auto flex h-16 w-full max-w-xs items-center justify-around rounded-full bg-card/95 px-2 shadow-border backdrop-blur-xl">
          {dock.map((item) => {
            const active = item.match(path);
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-label={item.label}
                className={cn(
                  "flex h-12 w-14 items-center justify-center rounded-full text-muted",
                  active && "bg-foreground/10 text-foreground",
                )}
              >
                {item.kind === "home" ? (
                  <HomeMark solid={active} />
                ) : item.kind === "chart" ? (
                  <TrendingUp className="size-6" strokeWidth={1.75} />
                ) : (
                  <InfinityIcon className="size-6" strokeWidth={1.75} />
                )}
              </Link>
            );
          })}
        </div>
        <button
          type="button"
          onClick={openSearch}
          aria-label={copy.wallet.search}
          className="pointer-events-auto flex size-16 shrink-0 items-center justify-center rounded-full bg-card/95 text-foreground shadow-border backdrop-blur-xl"
        >
          <Search className="size-6" strokeWidth={1.75} />
        </button>
      </nav>
    </div>
  );
}

function HomeMark({ solid }: { solid: boolean }) {
  if (!solid) return <Home className="size-6" strokeWidth={1.75} />;
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path
        fill="currentColor"
        d="M12 3.15 3.4 10.1c-.25.2-.4.5-.4.82V20a1.6 1.6 0 0 0 1.6 1.6h4.7v-6.1h5.4v6.1h4.7A1.6 1.6 0 0 0 21 20v-9.08c0-.32-.15-.62-.4-.82L12 3.15Z"
      />
    </svg>
  );
}
