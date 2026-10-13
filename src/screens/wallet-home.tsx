import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  Eye,
  EyeOff,
  History,
  LogOut,
  Plus,
  RefreshCw,
  Scan,
  Settings,
  SlidersHorizontal,
  UserRound,
  Wallet,
  X,
} from "lucide-react";
import { CoinIcon } from "@/components/coin-icon";
import { WalletShell } from "@/components/wallet-shell";
import { useMarketMap, useMarkets } from "@/hooks/use-markets";
import { COIN_BY_ID, usdPrice } from "@/lib/coins";
import { formatAmount, formatUsdFull } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";
import { useWallet } from "@/lib/store";
import { cn } from "@/lib/utils";

const PINNED = ["tether", "tron", "bitcoin", "ethereum"];

function rowTitle(id: string, name: string) {
  if (id === "tether") return "Tether USDT";
  if (id === "tron") return "Tron";
  return name;
}

function formatMove(value: number): { text: string; tone: "up" | "down" | "flat" } {
  if (!Number.isFinite(value) || Math.abs(value) < 1e-6) return { text: "$0.00", tone: "flat" };
  const abs = Math.abs(value);
  const digits = abs >= 1 ? 2 : abs >= 0.01 ? 4 : 6;
  const body = abs.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: digits,
  });
  return { text: `${value > 0 ? "+" : "-"}${body}`, tone: value > 0 ? "up" : "down" };
}

function formatHeaderMove(usd: number, pct: number): string {
  const money =
    Math.abs(usd) < 0.005 ? "$0.00" : `${usd < 0 ? "-" : ""}${formatUsdFull(Math.abs(usd))}`;
  const pctText = `${pct < 0 ? "-" : ""}${Math.abs(pct).toFixed(2)}%`;
  return `${money} (${pctText})`;
}

export function WalletHomeScreen() {
  const holdings = useWallet((s) => s.holdings);
  const hide = useWallet((s) => s.hideBalances);
  const toggle = useWallet((s) => s.toggleHideBalances);
  const role = useWallet((s) => s.role);
  const logout = useWallet((s) => s.logout);
  const site = useSite();
  const navigate = useNavigate();
  const copy = t();
  const markets = useMarketMap();
  const q = useMarkets();
  const [qtext, setQtext] = useState("");
  const [banner, setBanner] = useState(true);
  const [showAll, setShowAll] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const findRef = useRef<HTMLInputElement>(null);

  const walletLabel = site.walletName.trim() === "Main Wallet" ? "Main Wallet 1" : site.walletName;

  useEffect(() => {
    function open() {
      setSearchOpen(true);
      setShowAll(true);
      queueMicrotask(() => findRef.current?.focus());
    }
    if (sessionStorage.getItem("aurex-open-find") === "1") {
      sessionStorage.removeItem("aurex-open-find");
      open();
    }
    window.addEventListener("aurex-find", open);
    return () => window.removeEventListener("aurex-find", open);
  }, []);

  const rows = useMemo(() => {
    const list = holdings
      .map((h) => {
        const meta = COIN_BY_ID[h.id];
        const m = markets[h.id];
        const price = usdPrice(h.id, m?.price);
        const usd = h.amount * price;
        const change = m?.change24h ?? 0;
        return {
          ...h,
          meta,
          price,
          usd,
          change,
          delta: h.amount === 0 ? 0 : (usd * change) / 100,
          image: m?.image ?? meta?.image,
        };
      })
      .filter((r) => r.meta);
    const rank = (id: string) => {
      const i = PINNED.indexOf(id);
      return i === -1 ? 100 : i;
    };
    return list.sort((a, b) => rank(a.id) - rank(b.id) || b.usd - a.usd || a.meta!.symbol.localeCompare(b.meta!.symbol));
  }, [holdings, markets]);

  const total = rows.reduce((s, r) => s + r.usd, 0);
  const changeUsd = rows.reduce((s, r) => s + r.delta, 0);
  const base = total - changeUsd;
  const changePct = base !== 0 ? (changeUsd / base) * 100 : 0;
  const query = qtext.trim().toLowerCase();
  const filtered = query
    ? rows.filter(
        (r) => r.meta!.name.toLowerCase().includes(query) || r.meta!.symbol.toLowerCase().includes(query),
      )
    : rows;
  const visible = query || showAll ? filtered : filtered.slice(0, 4);

  const actions = [
    { to: "/wallet/send", icon: ArrowUpRight, label: site.actionSend, hot: false },
    { to: "/wallet/receive", icon: ArrowDown, label: site.actionReceive, hot: false },
    { to: "/wallet/swap", icon: RefreshCw, label: site.tabSwap, hot: true },
    { to: "/wallet/buy", icon: Plus, label: site.actionBuy, hot: false },
  ] as const;

  return (
    <WalletShell home>
      <div className="mx-auto w-full max-w-md px-5 pt-3 pb-4">
        <div className="flex items-center justify-between gap-3">
          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              className="flex h-12 max-w-full items-center gap-2 rounded-full bg-card-elevated ps-1.5 pe-4 shadow-border"
              aria-expanded={menu}
              aria-label={walletLabel}
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg">
                <Wallet className="size-4" strokeWidth={2.2} />
              </span>
              <span className="truncate text-sm font-semibold">{walletLabel}</span>
            </button>
            {menu ? (
              <>
                <button type="button" className="fixed inset-0 z-40 cursor-default" aria-label="Close menu" onClick={() => setMenu(false)} />
                <div className="absolute top-14 left-0 z-50 w-56 rounded-xl bg-card p-1.5 shadow-float shadow-border">
                  <Link to="/wallet/profile" onClick={() => setMenu(false)} className="flex h-11 items-center gap-2 rounded-lg px-3 text-sm">
                    <UserRound className="size-4 text-muted" />
                    {site.tabProfile}
                  </Link>
                  <Link to="/wallet/settings" onClick={() => setMenu(false)} className="flex h-11 items-center gap-2 rounded-lg px-3 text-sm">
                    <Settings className="size-4 text-muted" />
                    {copy.wallet.settings}
                  </Link>
                  <button type="button" onClick={toggle} className="flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm">
                    {hide ? <Eye className="size-4 text-muted" /> : <EyeOff className="size-4 text-muted" />}
                    {hide ? copy.wallet.show : copy.wallet.hide}
                  </button>
                  {role === "admin" ? (
                    <Link to="/studio" onClick={() => setMenu(false)} className="flex h-11 items-center gap-2 rounded-lg px-3 text-sm">
                      <SlidersHorizontal className="size-4 text-muted" />
                      Control panel
                    </Link>
                  ) : null}
                  <button
                    type="button"
                    className="flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm text-danger"
                    onClick={() => {
                      logout();
                      void navigate({ to: "/" });
                    }}
                  >
                    <LogOut className="size-4" />
                    {copy.wallet.logout}
                  </button>
                </div>
              </>
            ) : null}
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/wallet/activity"
              aria-label={copy.wallet.activity}
              className="flex size-12 items-center justify-center rounded-full bg-card-elevated shadow-border"
            >
              <History className="size-5" strokeWidth={1.75} />
            </Link>
            <Link
              to="/wallet/receive"
              aria-label={site.actionReceive}
              className="flex size-12 items-center justify-center rounded-full bg-card-elevated shadow-border"
            >
              <Scan className="size-5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        {banner ? (
          <div className="mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 shadow-border">
            <span className="h-7 w-1 shrink-0 rounded-full bg-foreground/25" />
            <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-promo text-promo-fg">
              <PromoLeaf />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">Robinhood Stock Tokens Campaign</p>
              <p className="truncate text-xs text-muted">200 winners. $50K USDG rewards. Enter now</p>
            </div>
            <button
              type="button"
              onClick={() => setBanner(false)}
              aria-label="Dismiss"
              className="flex size-11 shrink-0 items-center justify-center text-muted"
            >
              <X className="size-4" />
            </button>
          </div>
        ) : null}

        <p className="mt-5 text-5xl leading-none font-bold tracking-tight tabular">
          {hide ? "••••••" : q.isLoading && total === 0 ? "—" : formatUsdFull(total)}
        </p>
        <p className="mt-3 text-base text-muted tabular">{hide ? "" : formatHeaderMove(changeUsd, changePct)}</p>

        <div className="mt-6 grid grid-cols-4 gap-3">
          {actions.map((a) => (
            <Link key={a.to} to={a.to} className="flex flex-col items-center gap-2.5">
              <span
                className={cn(
                  "flex aspect-square w-full items-center justify-center rounded-xl",
                  a.hot ? "bg-primary text-primary-fg" : "bg-card-elevated text-foreground",
                )}
              >
                <a.icon className="size-6" strokeWidth={2.15} />
              </span>
              <span className="text-sm font-medium">{a.label}</span>
            </Link>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          className="mt-6 flex items-center gap-1 text-lg font-semibold"
        >
          Tokens
          <ChevronRight className="size-5" />
        </button>

        {searchOpen ? (
          <input
            ref={findRef}
            value={qtext}
            onChange={(e) => setQtext(e.target.value)}
            placeholder={copy.wallet.search}
            className="mt-3 h-11 w-full rounded-full bg-card-elevated px-4 text-sm shadow-border outline-none placeholder:text-muted"
          />
        ) : null}

        <div className="mt-3">
          {visible.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">{copy.wallet.empty}</p>
          ) : (
            visible.map((r) => {
              const move = formatMove(r.delta);
              return (
                <Link
                  key={r.id}
                  to="/wallet/asset/$id"
                  params={{ id: r.id }}
                  className="flex items-center gap-4 py-1.5"
                >
                  <CoinIcon id={r.id} symbol={r.meta!.symbol} image={r.image} size={44} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{rowTitle(r.id, r.meta!.name)}</p>
                    <p className="text-sm text-muted tabular">
                      {hide ? "••" : formatAmount(r.amount)} {r.meta!.symbol}
                    </p>
                  </div>
                  <div className="text-end">
                    <p className="font-semibold tabular">{hide ? "••" : formatUsdFull(r.usd)}</p>
                    <p
                      className={cn(
                        "text-sm tabular",
                        move.tone === "up" && "text-success",
                        move.tone === "down" && "text-danger",
                        move.tone === "flat" && "text-muted",
                      )}
                    >
                      {hide ? "" : move.text}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {!query && !showAll && filtered.length > 4 ? (
          <button
            type="button"
            onClick={() => setShowAll(true)}
            className="mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-card-elevated px-5 text-base font-medium"
          >
            View all
            <ChevronRight className="size-4" />
          </button>
        ) : null}
      </div>
    </WalletShell>
  );
}

function PromoLeaf() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden>
      <path
        fill="currentColor"
        d="M5.2 16.2C6.2 9.4 11.4 4.8 19.6 4c.4 7.2-2.2 12.4-8.2 14.2-2.4.7-4.8.2-6.2-2Zm3.6-.2c2.2-1.6 4.6-2.6 7.6-3.1-1.5 2-3.4 3.3-5.8 3.8-1 .2-1.6-.1-1.8-.7Z"
      />
    </svg>
  );
}
