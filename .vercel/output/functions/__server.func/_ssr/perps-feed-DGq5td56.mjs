import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perps-feed-DGq5td56.js
function num(v) {
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : 0;
}
async function info(body) {
	const res = await fetch("https://api.hyperliquid.xyz/info", {
		method: "POST",
		headers: {
			"content-type": "application/json",
			accept: "application/json"
		},
		body: JSON.stringify(body)
	});
	if (!res.ok) throw new Error(`Perps HTTP ${res.status}`);
	return res.json();
}
function readBook(raw, dex) {
	if (!Array.isArray(raw) || raw.length < 2) return [];
	const meta = raw[0];
	const ctxs = raw[1];
	const universe = Array.isArray(meta?.universe) ? meta.universe : [];
	const out = [];
	universe.forEach((u, i) => {
		const ctx = ctxs[i];
		if (!u?.name || !ctx) return;
		const mark = num(ctx.markPx);
		const prev = num(ctx.prevDayPx);
		if (mark <= 0) return;
		const name = u.name;
		const symbol = name.includes(":") ? name.slice(name.indexOf(":") + 1) : name;
		out.push({
			coin: dex ? name : name,
			symbol,
			maxLeverage: Math.max(1, Math.round(num(u.maxLeverage) || 1)),
			mark,
			change24h: prev > 0 ? (mark - prev) / prev * 100 : 0,
			volume: num(ctx.dayNtlVlm),
			spark: []
		});
	});
	return out;
}
async function spark(coin) {
	const end = Date.now();
	const start = end - 864e5;
	try {
		const raw = await info({
			type: "candleSnapshot",
			req: {
				coin,
				interval: "1h",
				startTime: start,
				endTime: end
			}
		});
		if (!Array.isArray(raw)) return [];
		return raw.map((row) => num(row.c)).filter((n) => n > 0);
	} catch {
		return [];
	}
}
var loadPerpMarkets_createServerFn_handler = createServerRpc({
	id: "11ec7de365bdde6f12d22455d07d0d753573eda0ecb113d397b0b368b4a6e3a7",
	name: "loadPerpMarkets",
	filename: "src/lib/perps-feed.ts"
}, (opts) => loadPerpMarkets.__executeServer(opts));
var loadPerpMarkets = createServerFn({ method: "GET" }).handler(loadPerpMarkets_createServerFn_handler, async () => {
	const [main, xyz] = await Promise.all([info({ type: "metaAndAssetCtxs" }), info({
		type: "metaAndAssetCtxs",
		dex: "xyz"
	})]);
	const markets = [...readBook(main, ""), ...readBook(xyz, "xyz")].sort((a, b) => b.volume - a.volume);
	const top = markets.slice(0, 8);
	const lines = await Promise.all(top.map((m) => spark(m.coin)));
	const byCoin = new Map(top.map((m, i) => [m.coin, lines[i]]));
	return markets.map((m) => ({
		...m,
		spark: byCoin.get(m.coin) ?? []
	}));
});
var loadPerpMids_createServerFn_handler = createServerRpc({
	id: "89f56e9d5bd7a0a623c2945f0f7c9bdfbf92d6a8f76109971d9056f82e1f90f8",
	name: "loadPerpMids",
	filename: "src/lib/perps-feed.ts"
}, (opts) => loadPerpMids.__executeServer(opts));
var loadPerpMids = createServerFn({ method: "GET" }).handler(loadPerpMids_createServerFn_handler, async () => {
	const [main, xyz] = await Promise.all([info({ type: "allMids" }), info({
		type: "allMids",
		dex: "xyz"
	})]);
	const out = {};
	for (const book of [main, xyz]) {
		if (!book || typeof book !== "object") continue;
		for (const [key, value] of Object.entries(book)) {
			const price = num(value);
			if (price > 0) out[key] = price;
		}
	}
	return out;
});
//#endregion
export { loadPerpMarkets_createServerFn_handler, loadPerpMids_createServerFn_handler };
