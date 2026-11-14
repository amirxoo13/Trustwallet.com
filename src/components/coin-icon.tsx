import { cn } from "@/lib/utils";

type CoinIconProps = { id?: string; symbol: string; image?: string; size?: number; className?: string };
const inks = ["#245142", "#76442c", "#604566", "#354e71", "#645323"];
const papers = ["#d8e8d0", "#f4dcbd", "#ebdeeb", "#d7e4ee", "#ece3bd"];

export function CoinIcon({symbol, size = 36, className}: CoinIconProps) {
  const ticker = symbol.toUpperCase().split(/[ ·]/)[0] || "?";
  const index = Array.from(ticker).reduce((n, c) => n + c.charCodeAt(0), 0) % inks.length;
  return <span aria-hidden="true" className={cn("rv-coin", className)} style={{
    width:size,height:size,color:inks[index],backgroundColor:papers[index],fontSize: Math.max(8, size / (ticker.length > 3 ? 3.8 : 3.1)),
  }}>{ticker.slice(0,5)}</span>;
}
