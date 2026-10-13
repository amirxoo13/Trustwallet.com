import { ArrowDown, ArrowUpRight, ChevronRight, History, Plus, RefreshCw, Scan, Wallet } from "lucide-react";
import { CoinIcon } from "@/components/coin-icon";

const rows = [
  { id: "tether", symbol: "USDT", name: "Tether USDT", amt: "37,500", usd: "$37,500.00" },
  { id: "tron", symbol: "TRX", name: "Tron", amt: "0", usd: "$0.00" },
  { id: "bitcoin", symbol: "BTC", name: "Bitcoin", amt: "0", usd: "$0.00" },
  { id: "ethereum", symbol: "ETH", name: "Ethereum", amt: "0", usd: "$0.00" },
];

export function PhonePreview() {
  return (
    <div className="phone-frame relative mx-auto w-[300px] shrink-0">
      <div className="absolute -inset-8 rounded-[3rem] bg-primary/10 blur-3xl" />
      <div className="relative overflow-hidden rounded-[2.2rem] bg-background shadow-float ring-1 ring-white/12">
        <div className="mx-auto mt-2 h-4 w-20 rounded-full bg-background" />
        <div className="px-4 pt-3 pb-5">
          <div className="flex items-center justify-between">
            <div className="flex h-8 items-center gap-1.5 rounded-full bg-card-elevated ps-1 pe-2.5 shadow-border">
              <span className="flex size-6 items-center justify-center rounded-full bg-primary text-primary-fg">
                <Wallet className="size-3" />
              </span>
              <span className="text-[10px] font-semibold">Main Wallet 1</span>
            </div>
            <div className="flex gap-1.5">
              <span className="flex size-8 items-center justify-center rounded-full bg-card-elevated shadow-border">
                <History className="size-3.5" />
              </span>
              <span className="flex size-8 items-center justify-center rounded-full bg-card-elevated shadow-border">
                <Scan className="size-3.5" />
              </span>
            </div>
          </div>
          <p className="mt-4 text-[28px] leading-none font-bold tracking-tight tabular">$37,500.00</p>
          <p className="mt-1.5 text-[11px] text-muted tabular">$0.00 (0.00%)</p>
          <div className="mt-4 grid grid-cols-4 gap-1.5">
            {[
              { icon: ArrowUpRight, label: "Send", hot: false },
              { icon: ArrowDown, label: "Receive", hot: false },
              { icon: RefreshCw, label: "Swap", hot: true },
              { icon: Plus, label: "Buy", hot: false },
            ].map((a) => (
              <div key={a.label} className="flex flex-col items-center gap-1">
                <div
                  className={
                    a.hot
                      ? "flex size-11 items-center justify-center rounded-lg bg-primary text-primary-fg"
                      : "flex size-11 items-center justify-center rounded-lg bg-card-elevated"
                  }
                >
                  <a.icon className="size-4" />
                </div>
                <span className="text-[10px] font-medium">{a.label}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 flex items-center gap-0.5 text-xs font-semibold">
            Tokens <ChevronRight className="size-3" />
          </p>
          <div className="mt-2 space-y-2.5">
            {rows.map((r) => (
              <div key={r.symbol} className="flex items-center gap-2">
                <CoinIcon id={r.id} symbol={r.symbol} size={28} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-[12px] font-semibold">{r.name}</p>
                  <p className="text-[10px] text-muted tabular">
                    {r.amt} {r.symbol}
                  </p>
                </div>
                <div className="text-end">
                  <p className="text-[12px] font-semibold tabular">{r.usd}</p>
                  <p className="text-[10px] text-muted tabular">$0.00</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
