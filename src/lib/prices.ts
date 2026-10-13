import { COINS, type CoinMeta } from "@/lib/coins";

export interface MarketCoin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  price: number;
  change24h: number;
  change1h: number;
  change7d: number;
  marketCap: number;
  volume24h: number;
  sparkline: number[];
  high24h: number;
  low24h: number;
  rank: number;
}

export interface ChartPoint {
  t: number;
  p: number;
}

const CACHE_MS = 45_000;

interface CacheEntry<T> {
  at: number;
  data: T;
}

let marketsCache: CacheEntry<MarketCoin[]> | null = null;
const chartCache = new Map<string, CacheEntry<ChartPoint[]>>();

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { headers: { accept: "application/json" } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v !== null && typeof v === "object" ? (v as Record<string, unknown>) : null;
}

function num(v: unknown, fallback = 0): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : fallback;
}

function fromCoinGecko(raw: unknown): MarketCoin[] | null {
  if (!Array.isArray(raw) || raw.length === 0) return null;
  const out: MarketCoin[] = [];
  for (const item of raw) {
    const r = asRecord(item);
    if (!r) continue;
    const spark = asRecord(r.sparkline_in_7d);
    const sparkline = Array.isArray(spark?.price)
      ? (spark.price as unknown[]).map((x) => num(x)).filter((n) => n > 0)
      : [];
    out.push({
      id: String(r.id ?? ""),
      symbol: String(r.symbol ?? "").toUpperCase(),
      name: String(r.name ?? ""),
      image: String(r.image ?? ""),
      price: num(r.current_price),
      change24h: num(r.price_change_percentage_24h),
      change1h: num(r.price_change_percentage_1h_in_currency),
      change7d: num(r.price_change_percentage_7d_in_currency),
      marketCap: num(r.market_cap),
      volume24h: num(r.total_volume),
      sparkline,
      high24h: num(r.high_24h),
      low24h: num(r.low_24h),
      rank: num(r.market_cap_rank),
    });
  }
  return out.length ? out : null;
}

function fromBinance(raw: unknown, catalog: CoinMeta[]): MarketCoin[] | null {
  if (!Array.isArray(raw)) return null;
  const bySymbol = new Map<string, Record<string, unknown>>();
  for (const item of raw) {
    const r = asRecord(item);
    if (!r) continue;
    bySymbol.set(String(r.symbol ?? ""), r);
  }
  const out: MarketCoin[] = [];
  catalog.forEach((coin, i) => {
    const pair = coin.binance && coin.binance !== "USDTTRY" ? coin.binance : `${coin.symbol}USDT`;
    const row = bySymbol.get(pair) ?? (coin.symbol === "USDT" ? null : bySymbol.get(`${coin.symbol}USDT`));
    const price = coin.symbol === "USDT" || coin.symbol === "USDC" ? 1 : num(row?.lastPrice, 0);
    const change = coin.symbol === "USDT" || coin.symbol === "USDC" ? 0 : num(row?.priceChangePercent, 0);
    if (price <= 0 && coin.symbol !== "USDT" && coin.symbol !== "USDC") return;
    out.push({
      id: coin.id,
      symbol: coin.symbol,
      name: coin.name,
      image: coin.image,
      price: price || 1,
      change24h: change,
      change1h: change,
      change7d: change,
      marketCap: 0,
      volume24h: num(row?.quoteVolume),
      sparkline: [],
      high24h: num(row?.highPrice, price),
      low24h: num(row?.lowPrice, price),
      rank: i + 1,
    });
  });
  return out.length ? out : null;
}

export async function fetchMarkets(): Promise<MarketCoin[]> {
  if (marketsCache && Date.now() - marketsCache.at < CACHE_MS) {
    return marketsCache.data;
  }
  const ids = COINS.map((c) => c.id).join(",");
  try {
    const gecko = await getJson(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`,
    );
    const parsed = fromCoinGecko(gecko);
    if (parsed) {
      marketsCache = { at: Date.now(), data: parsed };
      return parsed;
    }
  } catch {
    /* fall through */
  }
  try {
    const binance = await getJson("https://api.binance.com/api/v3/ticker/24hr");
    const parsed = fromBinance(binance, COINS);
    if (parsed) {
      marketsCache = { at: Date.now(), data: parsed };
      return parsed;
    }
  } catch {
    /* fall through */
  }
  if (marketsCache) return marketsCache.data;
  throw new Error("Price APIs are unavailable right now.");
}

export async function fetchChart(id: string, days: number): Promise<ChartPoint[]> {
  const key = `${id}:${days}`;
  const hit = chartCache.get(key);
  if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;

  try {
    const raw = await getJson(
      `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`,
    );
    const rec = asRecord(raw);
    const prices = rec && Array.isArray(rec.prices) ? rec.prices : [];
    const points: ChartPoint[] = [];
    for (const row of prices) {
      if (!Array.isArray(row) || row.length < 2) continue;
      points.push({ t: num(row[0]), p: num(row[1]) });
    }
    if (points.length) {
      chartCache.set(key, { at: Date.now(), data: points });
      return points;
    }
  } catch {
    /* fall through */
  }

  const coin = COINS.find((c) => c.id === id);
  const symbol = coin?.binance ?? (coin ? `${coin.symbol}USDT` : null);
  if (symbol && symbol !== "USDTTRY") {
    const interval = days <= 1 ? "15m" : days <= 7 ? "1h" : days <= 30 ? "4h" : "1d";
    const limit = days <= 1 ? 96 : days <= 7 ? 168 : days <= 30 ? 180 : 180;
    try {
      const raw = await getJson(
        `https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`,
      );
      if (Array.isArray(raw)) {
        const points: ChartPoint[] = [];
        for (const row of raw) {
          if (!Array.isArray(row)) continue;
          points.push({ t: num(row[0]), p: num(row[4]) });
        }
        if (points.length) {
          chartCache.set(key, { at: Date.now(), data: points });
          return points;
        }
      }
    } catch {
      /* ignore */
    }
  }

  const prev = chartCache.get(key);
  if (prev) return prev.data;
  throw new Error("Chart data is unavailable.");
}

export function marketMap(list: MarketCoin[]): Record<string, MarketCoin> {
  const map: Record<string, MarketCoin> = {};
  for (const m of list) {
    map[m.id] = m;
    map[m.symbol.toUpperCase()] = m;
  }
  return map;
}

const BOARD_MS = 60_000;
const boardCache = new Map<string, CacheEntry<MarketCoin[]>>();

async function geckoMarkets(params: string): Promise<MarketCoin[]> {
  const hit = boardCache.get(params);
  if (hit && Date.now() - hit.at < BOARD_MS) return hit.data;
  const raw = await getJson(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,24h,7d&${params}`,
  );
  const parsed = fromCoinGecko(raw) ?? [];
  boardCache.set(params, { at: Date.now(), data: parsed });
  return parsed;
}

export function fetchTopTraded(): Promise<MarketCoin[]> {
  return geckoMarkets("order=volume_desc&per_page=12&page=1");
}

export function fetchCategoryMarkets(category: string): Promise<MarketCoin[]> {
  return geckoMarkets(`category=${encodeURIComponent(category)}&order=volume_desc&per_page=40&page=1`);
}

export async function fetchTrendingMarkets(): Promise<MarketCoin[]> {
  const key = "trending";
  const hit = boardCache.get(key);
  if (hit && Date.now() - hit.at < BOARD_MS) return hit.data;
  const raw = await getJson("https://api.coingecko.com/api/v3/search/trending");
  const rec = asRecord(raw);
  const coins = Array.isArray(rec?.coins) ? rec.coins : [];
  const ids: string[] = [];
  for (const item of coins) {
    const row = asRecord(item);
    const coin = asRecord(row?.item);
    if (typeof coin?.id === "string") ids.push(coin.id);
  }
  if (!ids.length) return [];
  const list = await geckoMarkets(`ids=${ids.join(",")}&order=market_cap_desc&per_page=20&page=1`);
  boardCache.set(key, { at: Date.now(), data: list });
  return list;
}

export async function fetchSearchMarkets(query: string): Promise<MarketCoin[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const key = `search:${q.toLowerCase()}`;
  const hit = boardCache.get(key);
  if (hit && Date.now() - hit.at < BOARD_MS) return hit.data;
  const raw = await getJson(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(q)}`);
  const rec = asRecord(raw);
  const coins = Array.isArray(rec?.coins) ? rec.coins : [];
  const ids: string[] = [];
  for (const item of coins) {
    const row = asRecord(item);
    if (typeof row?.id === "string") ids.push(row.id);
    if (ids.length >= 15) break;
  }
  if (!ids.length) {
    boardCache.set(key, { at: Date.now(), data: [] });
    return [];
  }
  const list = await geckoMarkets(`ids=${ids.join(",")}&order=market_cap_desc&per_page=15&page=1`);
  boardCache.set(key, { at: Date.now(), data: list });
  return list;
}

export async function fetchCoinMarket(id: string): Promise<MarketCoin | null> {
  const list = await geckoMarkets(`ids=${encodeURIComponent(id)}&order=market_cap_desc&per_page=1&page=1`);
  return list[0] ?? null;
}
