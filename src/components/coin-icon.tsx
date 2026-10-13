import { useState } from "react";
import { cn } from "@/lib/utils";
import { getCoin } from "@/lib/coins";

export function CoinIcon({
  id,
  symbol,
  image,
  size = 36,
  className,
}: {
  id?: string;
  symbol: string;
  image?: string;
  size?: number;
  className?: string;
}) {
  const coin = id ? getCoin(id) : getCoin(symbol);
  const local = coin?.image?.startsWith("/") ? coin.image : undefined;
  const src = local || image || coin?.image;
  const [failed, setFailed] = useState(false);
  const color = coin?.color ?? "#2e6bff";
  const letter = (symbol || "?").slice(0, 1).toUpperCase();

  if (!src || failed) {
    return (
      <span
        className={cn(
          "inline-flex shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold text-foreground",
          className,
        )}
        style={{ width: size, height: size, background: color }}
      >
        {letter}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width={size}
      height={size}
      className={cn(
        "shrink-0",
        local ? "bg-transparent" : "rounded-full bg-card-elevated outline outline-1 -outline-offset-1 outline-white/10",
        className,
      )}
      style={{ width: size, height: size }}
      onError={() => setFailed(true)}
    />
  );
}
