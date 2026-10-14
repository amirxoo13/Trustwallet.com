import { o as __toESM } from "../_runtime.mjs";
import { o as formatUsdFull, t as formatAmount } from "./format-DuRhJ10K.mjs";
import { t as COINS } from "./coins-Kac_SJvS.mjs";
import { i as fetchMarkets } from "./prices-7icuP-SQ.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { t as require_src } from "../_libs/web-push.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/push-send-BUz0jXCU.js
var import_src = /* @__PURE__ */ __toESM(require_src());
var PRICE_MS = 144e5;
var BALANCE_MS = 108e5;
var ROW = "aurex";
async function ensureSchema() {
	const sql = await getSql();
	await sql.query(`create table if not exists push_config (
      id text primary key,
      public_key text not null,
      private_key text not null,
      last_price_at bigint not null default 0,
      last_balance_at bigint not null default 0
    )`);
	await sql.query(`create table if not exists push_subs (
      endpoint text primary key,
      p256dh text not null,
      auth text not null,
      created_at timestamptz not null default now()
    )`);
}
async function keys() {
	await ensureSchema();
	const sql = await getSql();
	const existing = await sql.query("select public_key, private_key from push_config where id = $1", [ROW]);
	if (existing[0]) return {
		publicKey: existing[0].public_key,
		privateKey: existing[0].private_key
	};
	const made = import_src.generateVAPIDKeys();
	await sql.query("insert into push_config (id, public_key, private_key) values ($1, $2, $3) on conflict (id) do nothing", [
		ROW,
		made.publicKey,
		made.privateKey
	]);
	const again = await sql.query("select public_key, private_key from push_config where id = $1", [ROW]);
	return {
		publicKey: again[0].public_key,
		privateKey: again[0].private_key
	};
}
function arm(publicKey, privateKey) {
	import_src.setVapidDetails("https://gem-island-cap-daisy.vercel.app", publicKey, privateKey);
}
async function publicPushKey() {
	return { publicKey: (await keys()).publicKey };
}
async function saveSub(data) {
	await keys();
	await (await getSql()).query(`insert into push_subs (endpoint, p256dh, auth)
     values ($1, $2, $3)
     on conflict (endpoint) do update set p256dh = excluded.p256dh, auth = excluded.auth`, [
		data.endpoint,
		data.keys.p256dh,
		data.keys.auth
	]);
	return { ok: true };
}
async function removeSub(endpoint) {
	await (await getSql()).query("delete from push_subs where endpoint = $1", [endpoint]);
	return { ok: true };
}
async function readHoldings() {
	const raw = (await (await getSql()).query("select wallet_json from app_state where id = $1", [ROW]))[0]?.wallet_json;
	if (!raw) return [];
	try {
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed.holdings)) return [];
		const out = [];
		for (const item of parsed.holdings) {
			if (!item || typeof item !== "object") continue;
			const row = item;
			const amount = typeof row.amount === "number" ? row.amount : Number(row.amount);
			if (typeof row.id !== "string" || !Number.isFinite(amount) || amount <= 0) continue;
			out.push({
				id: row.id,
				amount
			});
		}
		return out;
	} catch {
		return [];
	}
}
function pct(n) {
	const v = n.toFixed(2);
	return n > 0 ? `+${v}%` : `${v}%`;
}
function priceNote(markets, holdings) {
	const byId = new Map(markets.map((m) => [m.id, m]));
	const order = [
		"bitcoin",
		"ethereum",
		...holdings.map((h) => h.id),
		"solana",
		"binancecoin",
		"tether"
	];
	const picked = [];
	for (const id of order) {
		const m = byId.get(id);
		if (!m || picked.some((p) => p.id === m.id)) continue;
		picked.push(m);
		if (picked.length === 4) break;
	}
	return {
		title: "Prices",
		body: picked.map((m) => `${m.symbol} ${formatUsdFull(m.price)} ${pct(m.change24h)}`).join(" · ") || "Prices are unavailable."
	};
}
function balanceNote(markets, holdings) {
	const byId = new Map(markets.map((m) => [m.id, m]));
	const coinById = new Map(COINS.map((c) => [c.id, c]));
	let total = 0;
	const parts = [];
	for (const h of holdings) {
		const coin = coinById.get(h.id);
		const price = byId.get(h.id)?.price ?? (h.id === "tether" || h.id === "usd-coin" ? 1 : 0);
		total += h.amount * price;
		parts.push(`${coin?.symbol ?? h.id} ${formatAmount(h.amount)}`);
	}
	return {
		title: `Wallet ${formatUsdFull(total)}`,
		body: parts.slice(0, 4).join(" · ") || "No tokens in the wallet."
	};
}
async function claim(column, waitMs, force) {
	const sql = await getSql();
	const now = Date.now();
	if (force) {
		await sql.query(`update push_config set ${column} = $1 where id = $2`, [now, ROW]);
		return true;
	}
	return (await sql.query(`update push_config set ${column} = $1 where id = $2 and ${column} <= $3 returning id`, [
		now,
		ROW,
		now - waitMs
	])).length > 0;
}
async function release(column) {
	await (await getSql()).query(`update push_config set ${column} = 0 where id = $1`, [ROW]);
}
async function broadcast(note) {
	const sql = await getSql();
	const subs = await sql.query("select endpoint, p256dh, auth from push_subs");
	const k = await keys();
	arm(k.publicKey, k.privateKey);
	const payload = JSON.stringify({
		...note,
		url: "/wallet"
	});
	let sent = 0;
	for (const sub of subs) try {
		await import_src.sendNotification({
			endpoint: sub.endpoint,
			keys: {
				p256dh: sub.p256dh,
				auth: sub.auth
			}
		}, payload, { TTL: 43200 });
		sent += 1;
	} catch (err) {
		const status = err.statusCode;
		if (status === 404 || status === 410) await sql.query("delete from push_subs where endpoint = $1", [sub.endpoint]);
	}
	return {
		devices: subs.length,
		sent
	};
}
async function dispatchAlerts(force = false) {
	await keys();
	const count = await (await getSql()).query("select count(*)::int as n from push_subs");
	if (!count[0] || Number(count[0].n) === 0) return {
		price: false,
		balance: false,
		sent: 0
	};
	const sendPrice = await claim("last_price_at", PRICE_MS, force);
	const sendBalance = await claim("last_balance_at", BALANCE_MS, force);
	if (!sendPrice && !sendBalance) return {
		price: false,
		balance: false,
		sent: 0
	};
	let markets;
	try {
		markets = await fetchMarkets();
	} catch {
		if (sendPrice) await release("last_price_at");
		if (sendBalance) await release("last_balance_at");
		return {
			price: false,
			balance: false,
			sent: 0
		};
	}
	const holdings = await readHoldings();
	let sent = 0;
	if (sendPrice) {
		const res = await broadcast({
			...priceNote(markets, holdings),
			tag: "trust-prices"
		});
		sent += res.sent;
	}
	if (sendBalance) {
		const res = await broadcast({
			...balanceNote(markets, holdings),
			tag: "trust-balance"
		});
		sent += res.sent;
	}
	return {
		price: sendPrice,
		balance: sendBalance,
		sent
	};
}
//#endregion
export { dispatchAlerts, publicPushKey, removeSub, saveSub };
