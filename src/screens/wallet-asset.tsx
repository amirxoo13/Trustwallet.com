import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDownLeft } from "lucide-react";
import { CoinIcon } from "@/components/coin-icon";
import { PriceChart } from "@/components/price-chart";
import { Button } from "@/components/ui/button";
import { WalletShell } from "@/components/wallet-shell";
import { useChart, useMarketMap } from "@/hooks/use-markets";
import { getCoin, usdPrice } from "@/lib/coins";
import { formatAmount, formatPct, formatUsd, formatUsdFull } from "@/lib/format";
import { t } from "@/lib/i18n";
import { holdingAmount, useWallet } from "@/lib/store";
import { cn } from "@/lib/utils";

export function WalletAssetScreen({ id }: { id: string }) {
  const holdings = useWallet((s) => s.holdings);
  const copy = t();
  const coin = getCoin(id);
  const markets = useMarketMap();
  const market = markets[id];
  const [days, setDays] = useState(7);
  const chart = useChart(id, days);
  const amount = holdingAmount(holdings, id);
  const price = usdPrice(id, market?.price);
  const usd = amount * price;
  const up = (market?.change24h ?? 0) >= 0;
  const points = chart.data ?? [];
  const chartUp = points.length >= 2 ? points[points.length - 1].p >= points[0].p : up;

  if (!coin) {
    return (
      <WalletShell title="Asset">
        <p className="p-8 text-sm text-muted">Unknown asset.</p>
      </WalletShell>
    );
  }

  return (
    <WalletShell title={coin.symbol}>
      <div className="mx-auto w-full max-w-xl px-4 py-8">
        <div className="flex items-center gap-3">
          <CoinIcon id={coin.id} symbol={coin.symbol} image={market?.image} size={48} />
          <div>
            <h1 className="font-display text-xl font-semibold">{coin.name}</h1>
            <p className="text-sm text-muted">{coin.chainName}</p>
          </div>
        </div>
        <p className="mt-6 font-display text-3xl font-semibold tabular">{price ? formatUsdFull(price) : "—"}</p>
        <p className={cn("mt-1 text-sm tabular", up ? "text-success" : "text-danger")}>
          {formatPct(market?.change24h ?? 0)}
        </p>

        <div className="mt-6">
          {chart.isLoading ? (
            <div className="h-56 animate-pulse rounded-xl bg-card" />
          ) : points.length ? (
            <PriceChart data={points} positive={chartUp} />
          ) : (
            <p className="py-10 text-center text-sm text-muted">No chart data.</p>
          )}
          <div className="mt-3 flex gap-2">
            {[
              { d: 1, l: copy.asset.d1 },
              { d: 7, l: copy.asset.d7 },
              { d: 30, l: copy.asset.d30 },
              { d: 90, l: copy.asset.d90 },
            ].map((x) => (
              <button
                key={x.d}
                type="button"
                onClick={() => setDays(x.d)}
                className={cn(
                  "h-9 rounded-full px-3 text-xs shadow-border",
                  days === x.d && "bg-card text-foreground",
                  days !== x.d && "text-muted",
                )}
              >
                {x.l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 rounded-xl bg-card p-4 shadow-border">
          <p className="text-xs text-muted">{copy.asset.hold}</p>
          <p className="mt-1 text-lg font-medium tabular">
            {formatAmount(amount)} {coin.symbol}
          </p>
          <p className="text-sm text-muted">{formatUsdFull(usd)}</p>
        </div>

        {market ? (
          <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-card p-4 shadow-border">
              <dt className="text-xs text-muted">{copy.markets.cap}</dt>
              <dd className="mt-1 tabular">{formatUsd(market.marketCap)}</dd>
            </div>
            <div className="rounded-xl bg-card p-4 shadow-border">
              <dt className="text-xs text-muted">{copy.markets.vol}</dt>
              <dd className="mt-1 tabular">{formatUsd(market.volume24h)}</dd>
            </div>
          </dl>
        ) : null}

        <div className="mt-8 grid grid-cols-2 gap-3">
          <Button asChild variant="solid">
            <Link to="/wallet/send">{copy.wallet.send}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/wallet/receive">
              <ArrowDownLeft className="size-4" />
              {copy.wallet.receive}
            </Link>
          </Button>
        </div>
        <p className="mt-6 text-center">
          <Link to="/wallet" className="text-sm text-muted hover:text-foreground">
            ← {copy.wallet.home}
          </Link>
        </p>
      </div>
    </WalletShell>
  );
}
