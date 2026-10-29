import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import {
  ArrowDown,
  ArrowUpRight,
  ChevronRight,
  DollarSign,
  Eye,
  EyeOff,
  History,
  Info,
  LogOut,
  Plus,
  RefreshCw,
  Scan,
  Settings,
  SlidersHorizontal,
  Sparkles,
  UserRound,
  Wallet,
} from "lucide-react";
import { CoinIcon } from "@/components/coin-icon";
import { WalletShell } from "@/components/wallet-shell";
import { useMarketMap, useMarkets } from "@/hooks/use-markets";
import { COINS, COIN_BY_ID, usdPrice } from "@/lib/coins";
import { formatAmount, formatPct, formatUsd, formatUsdFull } from "@/lib/format";
import { t } from "@/lib/i18n";
import { hasAdminProof } from "@/lib/admin-proof";
import { loadPerpMarkets } from "@/lib/perps-feed";
import { useSite } from "@/lib/site-store";
import { useWallet } from "@/lib/store";
import { cn } from "@/lib/utils";

const WATCH_KEY = "trust-home-watch";
const DEFAULT_WATCH = ["solana", "binancecoin", "bitcoin", "ethereum"];

function rowTitle(id: string, name: string) {
  if (id === "tether") return "Tether USDT";
  if (id === "tron") return "Tron";
  return name;
}

function readWatch(): string[] {
  try {
    const raw = JSON.parse(localStorage.getItem(WATCH_KEY) || "null") as unknown;
    const ids = Array.isArray(raw) ? raw.filter((id): id is string => typeof id === "string" && Boolean(COIN_BY_ID[id])) : [];
    return ids.length ? ids : DEFAULT_WATCH;
  } catch {
    return DEFAULT_WATCH;
  }
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
  const money = Math.abs(usd) < 0.005 ? "$0.00" : `${usd < 0 ? "-" : ""}${formatUsdFull(Math.abs(usd))}`;
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
  const perps = useQuery({ queryKey: ["home-perps"], queryFn: () => loadPerpMarkets(), staleTime: 30_000 });
  const [qtext, setQtext] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [watch, setWatch] = useState<string[]>(DEFAULT_WATCH);
  const [editingWatch, setEditingWatch] = useState(false);
  const findRef = useRef<HTMLInputElement>(null);

  const walletLabel = site.walletName.trim() === "Main Wallet" ? "Main Wallet 1" : site.walletName;

  useEffect(() => {
    setWatch(readWatch());
  }, []);

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
    const pin = (id: string) => (id === "bitcoin" ? 0 : id === "ethereum" ? 1 : 2);
    return list.sort((a, b) => {
      const aHeld = a.amount > 1e-12 ? 0 : 1;
      const bHeld = b.amount > 1e-12 ? 0 : 1;
      if (aHeld !== bHeld) return aHeld - bHeld;
      if (aHeld === 0 && b.usd !== a.usd) return b.usd - a.usd;
      const byPin = pin(a.id) - pin(b.id);
      if (byPin !== 0) return byPin;
      return a.meta!.symbol.localeCompare(b.meta!.symbol);
    });
  }, [holdings, markets]);

  const total = rows.reduce((s, r) => s + r.usd, 0);
  const changeUsd = rows.reduce((s, r) => s + r.delta, 0);
  const base = total - changeUsd;
  const changePct = base !== 0 ? (changeUsd / base) * 100 : 0;
  const query = qtext.trim().toLowerCase();
  const filtered = query
    ? rows.filter((r) => r.meta!.name.toLowerCase().includes(query) || r.meta!.symbol.toLowerCase().includes(query))
    : rows;
  const visible = query || showAll ? filtered : filtered.slice(0, 4);
  const balanceText = hide ? "••••" : q.isLoading && total === 0 ? "—" : formatUsdFull(total);

  const actions = [
    { to: "/wallet/send", icon: ArrowUpRight, label: site.actionSend, hot: false },
    { to: "/wallet/receive", icon: ArrowDown, label: site.actionReceive, hot: false },
    { to: "/wallet/swap", icon: RefreshCw, label: site.tabSwap, hot: true },
    { to: "/wallet/buy", icon: Plus, label: site.actionBuy, hot: false },
  ] as const;

  function ask() {
    const s = question.trim().toLowerCase();
    if (!s) {
      setAnswer("Ask about your balance, a token, swap fees, or perps.");
      return;
    }
    if (s.includes("balance") || s.includes("total") || s.includes("worth") || s.includes("wallet")) {
      setAnswer(`${walletLabel} is worth ${formatUsdFull(total)}. 24h change ${formatHeaderMove(changeUsd, changePct)}.`);
      return;
    }
    const hit = rows.find((r) => s.includes(r.meta!.symbol.toLowerCase()) || s.includes(r.meta!.name.toLowerCase()));
    if (hit) {
      setAnswer(
        `${rowTitle(hit.id, hit.meta!.name)}: ${formatAmount(hit.amount)} ${hit.meta!.symbol} · ${formatUsdFull(hit.usd)}. Price ${formatUsd(hit.price, true)}. 24h ${formatPct(hit.change)}.`,
      );
      return;
    }
    if (s.includes("fee") || s.includes("swap")) {
      setAnswer("Swap fee is 0.3%. Stablecoins on the same chain are 0%. Ethereum to Bitcoin settles after 21 real days.");
      return;
    }
    if (s.includes("send")) {
      setAnswer("Open Send, choose the asset, paste the destination address, then confirm.");
      return;
    }
    if (s.includes("perp") || s.includes("long") || s.includes("short")) {
      setAnswer("Perps uses USDT margin from this wallet. Deposit, then long or short at the live mark price.");
      return;
    }
    setAnswer(`Total is ${formatUsdFull(total)}. Ask for a coin symbol, swap fees, send, or perps.`);
  }

  function toggleWatch(id: string) {
    setWatch((prev) => {
      const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
      const saved = next.length ? next : DEFAULT_WATCH;
      localStorage.setItem(WATCH_KEY, JSON.stringify(saved));
      return saved;
    });
  }

  return (
    <WalletShell home>
      <div className="mx-auto w-full max-w-md overflow-x-clip px-4 pt-3 pb-6">
        <div className="flex items-center justify-between gap-2">
          <div className="relative min-w-0">
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              className="flex h-11 max-w-full items-center gap-2 rounded-full bg-[#1a1d24] ps-1 pe-3.5"
              aria-expanded={menu}
              aria-label={`${walletLabel} ${balanceText}`}
            >
              <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ff5d5d] text-white">
                <Wallet className="size-4" strokeWidth={2.2} />
              </span>
              <span className="truncate text-sm font-semibold tabular">{balanceText}</span>
            </button>
            {menu ? (
              <>
                <button type="button" className="fixed inset-0 z-40 cursor-default" aria-label="Close menu" onClick={() => setMenu(false)} />
                <div className="absolute top-12 left-0 z-50 w-56 rounded-xl bg-card p-1.5 shadow-float shadow-border">
                  <p className="px-3 py-2 text-sm font-semibold">{walletLabel}</p>
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
                  {role === "admin" && hasAdminProof() ? (
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
                      void navigate({ to: "/login" });
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
            <Link to="/wallet/activity" aria-label={copy.wallet.activity} className="flex size-11 items-center justify-center rounded-full bg-[#1a1d24]">
              <History className="size-5" strokeWidth={1.75} />
            </Link>
            <Link to="/wallet/receive" aria-label={site.actionReceive} className="flex size-11 items-center justify-center rounded-full bg-[#1a1d24]">
              <Scan className="size-5" strokeWidth={1.75} />
            </Link>
          </div>
        </div>

        <Link to="/wallet/swap" className="mt-4 flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-2.5">
          <Info className="size-4 shrink-0 text-muted" />
          <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#143226] text-success">
            <DollarSign className="size-4" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-sm font-semibold">0% swap fees on selected stables</span>
            <span className="block truncate text-xs text-muted">Applicable to same-chain swaps only</span>
          </span>
        </Link>

        <p className="mt-6 max-w-full overflow-hidden text-[clamp(2.1rem,11vw,2.8rem)] leading-none font-bold tracking-tight text-ellipsis tabular">
          {balanceText}
        </p>
        <p className="mt-2 max-w-full truncate text-base text-muted tabular">{hide ? "" : formatHeaderMove(changeUsd, changePct)}</p>

        <div className="mt-6 grid grid-cols-4 gap-2.5">
          {actions.map((a) => (
            <Link key={a.to} to={a.to} className="flex min-w-0 flex-col items-center gap-2">
              <span
                className={cn(
                  "flex aspect-square w-full items-center justify-center rounded-2xl",
                  a.hot ? "bg-[#5b57f5] text-white" : "bg-[#1a1d24] text-foreground",
                )}
              >
                <a.icon className="size-6" strokeWidth={2.1} />
              </span>
              <span className="max-w-full truncate text-sm">{a.label}</span>
            </Link>
          ))}
        </div>

        <button type="button" onClick={() => setShowAll((v) => !v)} className="mt-7 flex items-center gap-1 text-lg font-semibold">
          Tokens
          <ChevronRight className="size-5" />
        </button>

        {searchOpen ? (
          <input
            ref={findRef}
            value={qtext}
            onChange={(e) => setQtext(e.target.value)}
            placeholder={copy.wallet.search}
            className="mt-3 h-11 w-full rounded-full bg-[#1a1d24] px-4 text-sm outline-none placeholder:text-muted"
          />
        ) : null}

        <div className="mt-2">
          {visible.length === 0 ? (
            <p className="py-10 text-center text-sm text-muted">{copy.wallet.empty}</p>
          ) : (
            visible.map((r) => {
              const move = formatMove(r.delta);
              return (
                <Link key={r.id} to="/wallet/asset/$id" params={{ id: r.id }} className="flex min-w-0 items-center gap-3 py-2.5">
                  <CoinIcon id={r.id} symbol={r.meta!.symbol} image={r.image} size={42} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold">{rowTitle(r.id, r.meta!.name)}</p>
                    <p className="truncate text-sm text-muted tabular">
                      {hide ? "••" : formatAmount(r.amount)} {r.meta!.symbol}
                    </p>
                  </div>
                  <div className="shrink-0 text-end">
                    <p className="font-semibold tabular">{hide ? "••" : formatUsdFull(r.usd)}</p>
                    <p className={cn("text-sm tabular", move.tone === "up" && "text-success", move.tone === "down" && "text-danger", move.tone === "flat" && "text-muted")}>
                      {hide ? "" : move.text}
                    </p>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {!query && !showAll && filtered.length > 4 ? (
          <button type="button" onClick={() => setShowAll(true)} className="mt-2 inline-flex h-11 items-center gap-1 rounded-full bg-[#1a1d24] px-4 text-sm font-medium">
            View all
            <ChevronRight className="size-4" />
          </button>
        ) : null}

        <Link to="/wallet/perps" className="mt-8 flex items-center gap-1 text-lg font-semibold">
          Perps
          <ChevronRight className="size-5" />
        </Link>
        <div className="scroll-x mt-3 flex gap-3 pb-1">
          {(perps.data ?? []).slice(0, 8).map((m) => (
            <Link key={m.coin} to="/wallet/perps" className="w-[9.25rem] shrink-0 rounded-2xl bg-[#1a1d24] p-3">
              <CoinIcon symbol={m.symbol} size={36} />
              <p className="mt-3 flex items-center gap-1.5">
                <span className="font-semibold">{m.symbol}</span>
                <span className="rounded-full bg-black/30 px-1.5 py-0.5 text-[11px] text-muted">{m.maxLeverage}x</span>
              </p>
              <p className="mt-1 text-xs text-muted">{formatUsd(m.volume)} Vol</p>
            </Link>
          ))}
        </div>

        <button type="button" onClick={() => setAskOpen(true)} className="mt-4 flex w-full items-center gap-3 rounded-2xl bg-[#1a1d24] p-2 pe-2">
          <span className="flex min-w-0 flex-1 items-center gap-2 px-2 text-sm font-semibold">
            <Sparkles className="size-4 shrink-0" />
            <span className="truncate">Trust Wallet AI</span>
          </span>
          <span className="flex h-10 shrink-0 items-center gap-1 rounded-full bg-[#12141a] px-4 text-sm">
            Ask anything
            <ChevronRight className="size-4" />
          </span>
        </button>

        <div className="mt-6 flex items-center justify-between">
          <button type="button" onClick={() => setEditingWatch(true)} className="flex items-center gap-1 text-lg font-semibold">
            Watchlist
            <ChevronRight className="size-5" />
          </button>
        </div>
        <div className="mt-1">
          {watch.map((id) => {
            const meta = COIN_BY_ID[id];
            const m = markets[id];
            if (!meta) return null;
            const price = usdPrice(id, m?.price);
            const up = (m?.change24h ?? 0) >= 0;
            return (
              <Link key={id} to="/wallet/asset/$id" params={{ id }} className="flex min-w-0 items-center gap-3 py-2.5">
                <CoinIcon id={id} symbol={meta.symbol} image={m?.image ?? meta.image} size={40} />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{meta.symbol}</span>
                  <span className="block truncate text-sm text-muted">{m?.marketCap ? `${formatUsd(m.marketCap)} MCap` : "Live price"}</span>
                </span>
                <span className="shrink-0 text-end">
                  <span className="block font-semibold tabular">{formatUsd(price, true)}</span>
                  <span className={cn("text-sm tabular", up ? "text-success" : "text-danger")}>{formatPct(m?.change24h ?? 0)}</span>
                </span>
              </Link>
            );
          })}
        </div>
        <div className="mt-3 flex justify-center">
          <button type="button" onClick={() => setEditingWatch(true)} className="inline-flex h-11 items-center gap-2 rounded-full bg-[#1a1d24] px-5 text-sm font-medium">
            <SlidersHorizontal className="size-4" />
            Customize
          </button>
        </div>
      </div>

      {askOpen ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 px-4 pb-8" onClick={() => setAskOpen(false)}>
          <div className="w-full max-w-md rounded-2xl bg-card p-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold">Trust Wallet AI</h3>
            <p className="mt-1 text-sm text-muted">Answers use this wallet and live prices.</p>
            <form
              className="mt-3 flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                ask();
              }}
            >
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask anything"
                className="h-11 min-w-0 flex-1 rounded-full bg-[#12141a] px-4 text-sm outline-none"
              />
              <button type="submit" className="h-11 shrink-0 rounded-full bg-[#5b57f5] px-4 text-sm font-semibold text-white">
                Ask
              </button>
            </form>
            {answer ? <p className="mt-3 text-sm leading-relaxed">{answer}</p> : null}
          </div>
        </div>
      ) : null}

      {editingWatch ? (
        <div className="fixed inset-0 z-40 flex items-end justify-center bg-black/50 px-4 pb-8" onClick={() => setEditingWatch(false)}>
          <div className="max-h-[70dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-card p-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-semibold">Customize watchlist</h3>
            <div className="mt-3">
              {COINS.map((coin) => {
                const on = watch.includes(coin.id);
                return (
                  <button key={coin.id} type="button" onClick={() => toggleWatch(coin.id)} className="flex w-full items-center gap-3 py-2 text-left">
                    <CoinIcon id={coin.id} symbol={coin.symbol} image={coin.image} size={32} />
                    <span className="min-w-0 flex-1 truncate">{coin.symbol}</span>
                    <span className={cn("text-sm", on ? "text-success" : "text-muted")}>{on ? "On" : "Off"}</span>
                  </button>
                );
              })}
            </div>
            <button type="button" onClick={() => setEditingWatch(false)} className="mt-3 h-11 w-full rounded-full bg-[#5b57f5] text-sm font-semibold text-white">
              Done
            </button>
          </div>
        </div>
      ) : null}
    </WalletShell>
  );
}
