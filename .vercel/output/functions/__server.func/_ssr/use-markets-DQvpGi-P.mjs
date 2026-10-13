import { t as COINS } from "./coins-BwlI4zoK.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-markets-DQvpGi-P.js
var CACHE_MS = 45e3;
var marketsCache = null;
var chartCache = /* @__PURE__ */ new Map();
async function getJson(url) {
	const res = await fetch(url, { headers: { accept: "application/json" } });
	if (!res.ok) throw new Error(`HTTP ${res.status}`);
	return res.json();
}
function asRecord(v) {
	return v !== null && typeof v === "object" ? v : null;
}
function num(v, fallback = 0) {
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : fallback;
}
function fromCoinGecko(raw) {
	if (!Array.isArray(raw) || raw.length === 0) return null;
	const out = [];
	for (const item of raw) {
		const r = asRecord(item);
		if (!r) continue;
		const spark = asRecord(r.sparkline_in_7d);
		const sparkline = Array.isArray(spark?.price) ? spark.price.map((x) => num(x)).filter((n) => n > 0) : [];
		out.push({
			id: String(r.id ?? ""),
			symbol: String(r.symbol ?? "").toUpperCase(),
			name: String(r.name ?? ""),
			image: String(r.image ?? ""),
			price: num(r.current_price),
			change24h: num(r.price_change_percentage_24h),
			marketCap: num(r.market_cap),
			volume24h: num(r.total_volume),
			sparkline,
			high24h: num(r.high_24h),
			low24h: num(r.low_24h),
			rank: num(r.market_cap_rank)
		});
	}
	return out.length ? out : null;
}
function fromBinance(raw, catalog) {
	if (!Array.isArray(raw)) return null;
	const bySymbol = /* @__PURE__ */ new Map();
	for (const item of raw) {
		const r = asRecord(item);
		if (!r) continue;
		bySymbol.set(String(r.symbol ?? ""), r);
	}
	const out = [];
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
			marketCap: 0,
			volume24h: num(row?.quoteVolume),
			sparkline: [],
			high24h: num(row?.highPrice, price),
			low24h: num(row?.lowPrice, price),
			rank: i + 1
		});
	});
	return out.length ? out : null;
}
async function fetchMarkets() {
	if (marketsCache && Date.now() - marketsCache.at < CACHE_MS) return marketsCache.data;
	const ids = COINS.map((c) => c.id).join(",");
	try {
		const parsed = fromCoinGecko(await getJson(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${ids}&order=market_cap_desc&sparkline=true&price_change_percentage=24h`));
		if (parsed) {
			marketsCache = {
				at: Date.now(),
				data: parsed
			};
			return parsed;
		}
	} catch {}
	try {
		const parsed = fromBinance(await getJson("https://api.binance.com/api/v3/ticker/24hr"), COINS);
		if (parsed) {
			marketsCache = {
				at: Date.now(),
				data: parsed
			};
			return parsed;
		}
	} catch {}
	if (marketsCache) return marketsCache.data;
	throw new Error("Price APIs are unavailable right now.");
}
async function fetchChart(id, days) {
	const key = `${id}:${days}`;
	const hit = chartCache.get(key);
	if (hit && Date.now() - hit.at < CACHE_MS) return hit.data;
	try {
		const rec = asRecord(await getJson(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}`));
		const prices = rec && Array.isArray(rec.prices) ? rec.prices : [];
		const points = [];
		for (const row of prices) {
			if (!Array.isArray(row) || row.length < 2) continue;
			points.push({
				t: num(row[0]),
				p: num(row[1])
			});
		}
		if (points.length) {
			chartCache.set(key, {
				at: Date.now(),
				data: points
			});
			return points;
		}
	} catch {}
	const coin = COINS.find((c) => c.id === id);
	const symbol = coin?.binance ?? (coin ? `${coin.symbol}USDT` : null);
	if (symbol && symbol !== "USDTTRY") {
		const interval = days <= 1 ? "15m" : days <= 7 ? "1h" : days <= 30 ? "4h" : "1d";
		const limit = days <= 1 ? 96 : days <= 7 ? 168 : days <= 30 ? 180 : 180;
		try {
			const raw = await getJson(`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}`);
			if (Array.isArray(raw)) {
				const points = [];
				for (const row of raw) {
					if (!Array.isArray(row)) continue;
					points.push({
						t: num(row[0]),
						p: num(row[4])
					});
				}
				if (points.length) {
					chartCache.set(key, {
						at: Date.now(),
						data: points
					});
					return points;
				}
			}
		} catch {}
	}
	const prev = chartCache.get(key);
	if (prev) return prev.data;
	throw new Error("Chart data is unavailable.");
}
function marketMap(list) {
	const map = {};
	for (const m of list) {
		map[m.id] = m;
		map[m.symbol.toUpperCase()] = m;
	}
	return map;
}
function useMarkets() {
	return useQuery({
		queryKey: ["markets"],
		queryFn: fetchMarkets,
		staleTime: 3e4,
		refetchInterval: 6e4,
		retry: 2
	});
}
function useMarketMap() {
	const q = useMarkets();
	return q.data ? marketMap(q.data) : {};
}
function useChart(id, days) {
	return useQuery({
		queryKey: [
			"chart",
			id,
			days
		],
		queryFn: () => fetchChart(id, days),
		enabled: Boolean(id),
		staleTime: 6e4,
		retry: 1
	});
}
//#endregion
export { useMarketMap as n, useMarkets as r, useChart as t };
