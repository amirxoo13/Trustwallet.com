import { n as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/predictions-3u7wyltC.js
function num(v) {
	const n = typeof v === "number" ? v : Number(v);
	return Number.isFinite(n) ? n : 0;
}
function asRecord(v) {
	return v !== null && typeof v === "object" ? v : null;
}
var loadPredictions_createServerFn_handler = createServerRpc({
	id: "923316848a73f3c6da76600f9c08fb58f605d967b2be44a94c0f4a90be87473e",
	name: "loadPredictions",
	filename: "src/lib/predictions.ts"
}, (opts) => loadPredictions.__executeServer(opts));
var loadPredictions = createServerFn({ method: "GET" }).handler(loadPredictions_createServerFn_handler, async () => {
	const res = await fetch("https://gamma-api.polymarket.com/markets?closed=false&limit=40", { headers: { accept: "application/json" } });
	if (!res.ok) throw new Error(`Predictions HTTP ${res.status}`);
	const raw = await res.json();
	if (!Array.isArray(raw)) return [];
	const out = [];
	for (const item of raw) {
		const row = asRecord(item);
		if (!row || row.active === false || row.closed === true) continue;
		const question = typeof row.question === "string" ? row.question : "";
		if (!question) continue;
		let yes = num(row.lastTradePrice);
		if (!yes && typeof row.outcomePrices === "string") try {
			const prices = JSON.parse(row.outcomePrices);
			if (Array.isArray(prices)) yes = num(prices[0]);
		} catch {
			yes = 0;
		}
		const event = asRecord((Array.isArray(row.events) ? row.events : [])[0]);
		const slug = typeof event?.slug === "string" ? event.slug : typeof row.slug === "string" ? row.slug : "";
		if (!slug) continue;
		out.push({
			id: String(row.id ?? slug),
			question,
			slug,
			image: typeof row.image === "string" ? row.image : typeof row.icon === "string" ? row.icon : "",
			yes,
			volume24h: num(row.volume24hr),
			volume7d: num(row.volume1wk),
			volume30d: num(row.volume1mo),
			change1d: num(row.oneDayPriceChange) * 100,
			change1w: num(row.oneWeekPriceChange) * 100
		});
	}
	return out.sort((a, b) => b.volume24h - a.volume24h).slice(0, 30);
});
//#endregion
export { loadPredictions_createServerFn_handler };
