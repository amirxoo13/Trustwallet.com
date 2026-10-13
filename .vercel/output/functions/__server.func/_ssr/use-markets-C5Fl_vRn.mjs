import { r as COINS } from "./auth-config-CmLBU8rx.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-markets-C5Fl_vRn.js
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
			change1h: num(r.price_change_percentage_1h_in_currency),
			change7d: num(r.price_change_percentage_7d_in_currency),
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
			change1h: change,
			change7d: change,
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
var BOARD_MS = 6e4;
var boardCache = /* @__PURE__ */ new Map();
async function geckoMarkets(params) {
	const hit = boardCache.get(params);
	if (hit && Date.now() - hit.at < BOARD_MS) return hit.data;
	const parsed = fromCoinGecko(await getJson(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&sparkline=true&price_change_percentage=1h,24h,7d&${params}`)) ?? [];
	boardCache.set(params, {
		at: Date.now(),
		data: parsed
	});
	return parsed;
}
function fetchTopTraded() {
	return geckoMarkets("order=volume_desc&per_page=12&page=1");
}
function fetchCategoryMarkets(category) {
	return geckoMarkets(`category=${encodeURIComponent(category)}&order=volume_desc&per_page=40&page=1`);
}
async function fetchTrendingMarkets() {
	const key = "trending";
	const hit = boardCache.get(key);
	if (hit && Date.now() - hit.at < BOARD_MS) return hit.data;
	const rec = asRecord(await getJson("https://api.coingecko.com/api/v3/search/trending"));
	const coins = Array.isArray(rec?.coins) ? rec.coins : [];
	const ids = [];
	for (const item of coins) {
		const coin = asRecord(asRecord(item)?.item);
		if (typeof coin?.id === "string") ids.push(coin.id);
	}
	if (!ids.length) return [];
	const list = await geckoMarkets(`ids=${ids.join(",")}&order=market_cap_desc&per_page=20&page=1`);
	boardCache.set(key, {
		at: Date.now(),
		data: list
	});
	return list;
}
async function fetchSearchMarkets(query) {
	const q = query.trim();
	if (q.length < 2) return [];
	const key = `search:${q.toLowerCase()}`;
	const hit = boardCache.get(key);
	if (hit && Date.now() - hit.at < BOARD_MS) return hit.data;
	const rec = asRecord(await getJson(`https://api.coingecko.com/api/v3/search?query=${encodeURIComponent(q)}`));
	const coins = Array.isArray(rec?.coins) ? rec.coins : [];
	const ids = [];
	for (const item of coins) {
		const row = asRecord(item);
		if (typeof row?.id === "string") ids.push(row.id);
		if (ids.length >= 15) break;
	}
	if (!ids.length) {
		boardCache.set(key, {
			at: Date.now(),
			data: []
		});
		return [];
	}
	const list = await geckoMarkets(`ids=${ids.join(",")}&order=market_cap_desc&per_page=15&page=1`);
	boardCache.set(key, {
		at: Date.now(),
		data: list
	});
	return list;
}
async function fetchCoinMarket(id) {
	return (await geckoMarkets(`ids=${encodeURIComponent(id)}&order=market_cap_desc&per_page=1&page=1`))[0] ?? null;
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
export { fetchTrendingMarkets as a, useMarkets as c, fetchTopTraded as i, fetchCoinMarket as n, useChart as o, fetchSearchMarkets as r, useMarketMap as s, fetchCategoryMarkets as t };
