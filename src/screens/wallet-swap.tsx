import { useEffect, useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, Check } from "lucide-react";
import { CoinIcon } from "@/components/coin-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WalletShell } from "@/components/wallet-shell";
import { useMarketMap } from "@/hooks/use-markets";
import { COIN_BY_ID, COINS, usdPrice } from "@/lib/coins";
import { formatAmount, formatDuration, formatUsdFull } from "@/lib/format";
import { t } from "@/lib/i18n";
import { ETH_BTC_SWAP_MS, holdingAmount, useWallet } from "@/lib/store";
import { SwapMarkets } from "@/screens/swap-markets";

export function WalletSwapScreen() {
  const holdings = useWallet((s) => s.holdings);
  const transactions = useWallet((s) => s.transactions);
  const swap = useWallet((s) => s.swap);
  const copy = t();
  const markets = useMarketMap();

  const [fromId, setFromId] = useState("tether");
  const [toId, setToId] = useState("bitcoin");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"form" | "pending" | "done">("form");
  const [error, setError] = useState("");
  const [hash, setHash] = useState("");
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const [view, setView] = useState<"markets" | "trade">("markets");

  const from = COIN_BY_ID[fromId];
  const to = COIN_BY_ID[toId];
  const avail = holdingAmount(holdings, fromId);
  const fromPx = usdPrice(fromId, markets[fromId]?.price);
  const toPx = usdPrice(toId, markets[toId]?.price);
  const pay = Number(amount) || 0;
  const fee = pay * 0.003;
  const usd = pay * fromPx;
  const receive = toPx > 0 ? (usd * 0.997) / toPx : 0;
  const rate = fromPx && toPx ? fromPx / toPx : 0;
  const ethToBtc = fromId === "ethereum" && toId === "bitcoin";
  const pendingSwaps = transactions.filter(
    (tx) => tx.type === "swap" && tx.status === "pending" && tx.coinId === "ethereum" && tx.toCoinId === "bitcoin",
  );
  const activePending = transactions.find((tx) => tx.id === pendingId);

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (step === "pending" && activePending?.status === "confirmed") setStep("done");
  }, [step, activePending?.status]);

  const canSwap = useMemo(() => {
    return from && to && fromId !== toId && pay > 0 && pay <= avail + 1e-12 && receive > 0;
  }, [from, to, fromId, toId, pay, avail, receive]);

  function pickFrom(id: string) {
    setFromId(id);
    if (id === toId) {
      const next = COINS.find((c) => c.id !== id);
      if (next) setToId(next.id);
    }
  }

  function pickTo(id: string) {
    setToId(id);
    if (id === fromId) {
      const next = COINS.find((c) => c.id !== id);
      if (next) setFromId(next.id);
    }
  }

  function flip() {
    setFromId(toId);
    setToId(fromId);
    setAmount("");
  }

  function confirm() {
    if (!canSwap) {
      setError(copy.wallet.insufficient);
      return;
    }
    const res = swap({ fromId, toId, fromAmount: pay, toAmount: receive, usdValue: usd });
    if (!res.ok) {
      setError(copy.wallet.insufficient);
      return;
    }
    setHash(res.tx.hash);
    if (res.tx.status === "pending") {
      setPendingId(res.tx.id);
      setStep("pending");
      return;
    }
    setStep("done");
  }

  const assetOptions = COINS;

  if (view === "markets") {
    return (
      <WalletShell home>
        <SwapMarkets onSwap={() => setView("trade")} />
      </WalletShell>
    );
  }

  return (
    <WalletShell title={copy.wallet.swap}>
      <div className="mx-auto w-full max-w-md px-4 py-8">
        <button type="button" onClick={() => setView("markets")} className="text-sm text-muted">
          Markets
        </button>
        <h1 className="font-display text-2xl font-semibold">{copy.wallet.swap}</h1>
        {step === "form" ? (
          <div className="mt-6">
            <div className="rounded-xl bg-card p-4 shadow-border">
              <div className="flex items-center justify-between text-xs text-muted">
                <span>{copy.wallet.youPay}</span>
                <button type="button" className="text-primary" onClick={() => setAmount(String(avail))}>
                  {copy.wallet.max} {formatAmount(avail)} {from?.symbol}
                </button>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Input
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="h-14 min-w-0 flex-1 border-0 bg-transparent text-2xl shadow-none"
                  placeholder="0"
                />
                <select
                  value={fromId}
                  onChange={(e) => pickFrom(e.target.value)}
                  className="h-11 max-w-[7.5rem] shrink-0 rounded-full bg-card-elevated px-3 text-sm text-foreground shadow-border"
                >
                  {assetOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative z-10 -my-3 flex justify-center">
              <button
                type="button"
                onClick={flip}
                className="flex size-11 items-center justify-center rounded-full bg-card-elevated shadow-border"
                aria-label="Flip"
              >
                <ArrowDown className="size-4" />
              </button>
            </div>

            <div className="rounded-xl bg-card p-4 shadow-border">
              <p className="text-xs text-muted">{copy.wallet.youReceive}</p>
              <div className="mt-3 flex items-center gap-3">
                <p className="h-14 min-w-0 flex-1 truncate text-2xl leading-[3.5rem] tabular">
                  {receive ? formatAmount(receive, 6) : "0"}
                </p>
                <select
                  value={toId}
                  onChange={(e) => pickTo(e.target.value)}
                  className="h-11 max-w-[7.5rem] shrink-0 rounded-full bg-card-elevated px-3 text-sm text-foreground shadow-border"
                >
                  {assetOptions.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.symbol}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <dl className="mt-5 space-y-2 text-sm">
              <div className="flex justify-between text-muted">
                <dt>{copy.wallet.rate}</dt>
                <dd className="tabular text-foreground">
                  1 {from?.symbol} ≈ {rate ? formatAmount(rate, 6) : "—"} {to?.symbol}
                </dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>{copy.wallet.fee} (0.3%)</dt>
                <dd className="tabular text-foreground">
                  {formatAmount(fee)} {from?.symbol}
                </dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>{copy.wallet.slippage}</dt>
                <dd className="text-foreground">0.50%</dd>
              </div>
              <div className="flex justify-between text-muted">
                <dt>USD</dt>
                <dd className="tabular text-foreground">{formatUsdFull(usd)}</dd>
              </div>
            </dl>
            {error ? <p className="mt-3 text-sm text-danger">{error}</p> : null}
            {ethToBtc ? (
              <p className="mt-4 text-sm text-muted">
                Ethereum to Bitcoin takes 21 real days. This applies to one token or the full balance. Bitcoin is added
                only when the timer reaches zero.
              </p>
            ) : null}
            {pendingSwaps.length ? (
              <div className="mt-4 space-y-2">
                {pendingSwaps.map((tx) => (
                  <div key={tx.id} className="rounded-xl bg-card px-4 py-3 text-sm shadow-border">
                    <p className="font-medium">Swap in progress</p>
                    <p className="mt-1 text-muted">
                      {formatAmount(tx.amount)} {tx.symbol} → {formatAmount(tx.toAmount ?? 0, 6)} {tx.toSymbol}
                    </p>
                    <p className="mt-2 font-mono text-base text-foreground">
                      {formatDuration((tx.settlesAt ?? now + ETH_BTC_SWAP_MS) - now)}
                    </p>
                  </div>
                ))}
              </div>
            ) : null}
            <Button variant="solid" size="lg" className="mt-6 w-full" disabled={!canSwap} onClick={confirm}>
              {copy.wallet.confirm} {from && to ? `${from.symbol} → ${to.symbol}` : ""}
            </Button>
          </div>
        ) : step === "pending" ? (
          <div className="mt-10 flex flex-col items-center text-center">
            <h2 className="font-display text-xl font-semibold">Swap in progress</h2>
            <p className="mt-2 max-w-xs text-sm text-muted">
              Ethereum is locked now. Bitcoin is credited after 21 real days, counted from the moment you confirmed.
            </p>
            <p className="mt-6 font-mono text-3xl tabular">
              {formatDuration((activePending?.settlesAt ?? now + ETH_BTC_SWAP_MS) - now)}
            </p>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <CoinIcon id={fromId} symbol={from?.symbol ?? ""} size={24} />
              <span>
                {formatAmount(pay)} {from?.symbol}
              </span>
              <span className="text-muted">→</span>
              <CoinIcon id={toId} symbol={to?.symbol ?? ""} size={24} />
              <span>
                {formatAmount(receive, 6)} {to?.symbol}
              </span>
            </div>
            <p className="mt-3 max-w-xs break-all font-mono text-xs text-muted">{hash}</p>
            <Button asChild variant="solid" className="mt-8 w-full">
              <Link to="/wallet">{copy.wallet.done}</Link>
            </Button>
          </div>
        ) : (
          <div className="mt-10 flex flex-col items-center text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="size-7" />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold">{copy.wallet.success}</h2>
            <div className="mt-4 flex items-center gap-2 text-sm">
              <CoinIcon id={fromId} symbol={from?.symbol ?? ""} size={24} />
              <span>
                {formatAmount(pay)} {from?.symbol}
              </span>
              <span className="text-muted">→</span>
              <CoinIcon id={toId} symbol={to?.symbol ?? ""} size={24} />
              <span>
                {formatAmount(receive, 6)} {to?.symbol}
              </span>
            </div>
            <p className="mt-3 max-w-xs break-all font-mono text-xs text-muted">{hash}</p>
            <Button asChild variant="solid" className="mt-8 w-full">
              <Link to="/wallet">{copy.wallet.done}</Link>
            </Button>
          </div>
        )}
      </div>
    </WalletShell>
  );
}
