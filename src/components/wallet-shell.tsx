import type { ReactNode } from "react";
import { Link, useNavigate, useRouter, useRouterState } from "@tanstack/react-router";
import { ArrowLeft, BookOpen, ChartNoAxesCombined, Fingerprint, ListTree, LogOut, PanelsTopLeft, ScanSearch, Settings2, SlidersHorizontal, Waves } from "lucide-react";
import { LogoWord } from "@/components/logo";
import { AlertScheduler } from "@/components/alert-scheduler";
import { SendSettler } from "@/components/send-settler";
import { t } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";
import { hasAdminProof } from "@/lib/admin-proof";
import { useWallet } from "@/lib/store";

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
    { to: "/wallet", icon: PanelsTopLeft, label: site.tabHome },
    { to: "/wallet/activity", icon: ListTree, label: site.tabActivity },
    { to: "/wallet/markets", icon: ChartNoAxesCombined, label: site.tabMarkets },
    { to: "/wallet/perps", icon: Waves, label: "Perps" },
    { to: "/wallet/profile", icon: Fingerprint, label: site.tabProfile },
  ] as const;

  return (
    <div className="rv-workspace">
      <AlertScheduler />
      <SendSettler />
      <header className="rv-mast">
        <div className="rv-mast-inner">
          <Link to="/wallet" aria-label="Portfolio"><LogoWord /></Link>
          <span className="rv-edition"><BookOpen size={15} /> Campus simulator</span>
          <div className="rv-tools">
            <button onClick={openSearch} aria-label={copy.wallet.search}><ScanSearch /></button>
            {role === "admin" && hasAdminProof() && <Link to="/studio" aria-label="Control panel"><SlidersHorizontal /></Link>}
            <Link to="/wallet/settings" aria-label={copy.wallet.settings}><Settings2 /></Link>
            <button aria-label={copy.wallet.logout} onClick={() => { logout(); void navigate({ to: "/login" }); }}><LogOut /></button>
          </div>
        </div>
      </header>
      <nav className="rv-tabs" aria-label="Wallet navigation"><div>
        {items.map(({to,icon: Icon,label}) => (
          <Link key={to} to={to} aria-current={(to === "/wallet" ? isHome : path.startsWith(to)) ? "page" : undefined}>
            <Icon size={17} /><span>{label}</span>
          </Link>
        ))}
      </div></nav>
      <main className="rv-content">
        {!home && title && <div className="rv-crumb"><button type="button" onClick={goBack}><ArrowLeft size={15} /> Back</button><span>/</span>{title}</div>}
        {children}
      </main>
    </div>
  );
}
