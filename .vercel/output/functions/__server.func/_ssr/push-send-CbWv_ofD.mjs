import { o as __toESM } from "../_runtime.mjs";
import { t as ADMIN_ACCOUNT } from "./auth-config-BPsn-XvC.mjs";
import { l as shortAddress, o as formatUsdFull, t as formatAmount } from "./format-DuRhJ10K.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { t as COINS } from "./coins-Kac_SJvS.mjs";
import { i as fetchMarkets } from "./prices-7icuP-SQ.mjs";
import { t as require_src } from "../_libs/web-push.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/push-send-CbWv_ofD.js
var import_src = /* @__PURE__ */ __toESM(require_src());
var PRICE_MS = 144e5;
var BALANCE_MS = 72e5;
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
	await sql.query("alter table push_subs add column if not exists email text");
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
	import_src.setVapidDetails("mailto:amir.behi2333@gmail.com", publicKey, privateKey);
}
async function publicPushKey() {
	return { publicKey: (await keys()).publicKey };
}
async function saveSub(data) {
	await keys();
	const sql = await getSql();
	const email = (data.email ?? "").trim().toLowerCase();
	await sql.query(`insert into push_subs (endpoint, p256dh, auth, email)
     values ($1, $2, $3, $4)
     on conflict (endpoint) do update set p256dh = excluded.p256dh, auth = excluded.auth, email = case when excluded.email = '' then push_subs.email else excluded.email end`, [
		data.endpoint,
		data.keys.p256dh,
		data.keys.auth,
		email
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
async function deliver(subs, note) {
	if (!subs.length) return {
		devices: 0,
		sent: 0,
		failed: 0,
		lastStatus: 0
	};
	const sql = await getSql();
	const k = await keys();
	arm(k.publicKey, k.privateKey);
	const payload = JSON.stringify({
		...note,
		url: note.url || "/wallet/activity"
	});
	let sent = 0;
	let failed = 0;
	let lastStatus = 0;
	for (const sub of subs) try {
		await import_src.sendNotification({
			endpoint: sub.endpoint,
			keys: {
				p256dh: sub.p256dh,
				auth: sub.auth
			}
		}, payload, {
			TTL: 43200,
			urgency: "high"
		});
		sent += 1;
	} catch (err) {
		failed += 1;
		const status = err.statusCode ?? 0;
		lastStatus = status;
		if (status === 404 || status === 410) await sql.query("delete from push_subs where endpoint = $1", [sub.endpoint]);
	}
	return {
		devices: subs.length,
		sent,
		failed,
		lastStatus
	};
}
async function subsFor(emails) {
	const sql = await getSql();
	const want = new Set(emails.map((email) => email.trim().toLowerCase()).filter(Boolean));
	return (await sql.query("select endpoint, p256dh, auth, email from push_subs")).filter((row) => row.email && want.has(row.email.toLowerCase()));
}
async function broadcast(note) {
	return deliver(await (await getSql()).query("select endpoint, p256dh, auth, email from push_subs"), note);
}
async function notifyMovement(input) {
	await keys();
	const amount = formatAmount(input.amount);
	const title = input.direction === "sent" ? `Sent ${amount} ${input.symbol}` : `Received ${amount} ${input.symbol}`;
	const who = input.direction === "sent" ? "To" : "From";
	const party = input.counterparty.includes("@") ? input.counterparty : shortAddress(input.counterparty, 8, 6);
	const body = [
		input.usd > 0 ? formatUsdFull(input.usd) : "",
		`${who} ${party}`,
		input.network
	].filter(Boolean).join(" · ");
	const tag = `trust-${input.direction}-${input.hash || Date.now()}`;
	const own = await deliver(await subsFor(input.emails), {
		title,
		body,
		tag,
		url: "/wallet/activity"
	});
	const admin = ADMIN_ACCOUNT.email.toLowerCase();
	if (input.emails.some((email) => email.trim().toLowerCase() === admin)) return own;
	const adminBody = [input.account, body].filter(Boolean).join(" · ");
	const copy = await deliver(await subsFor([admin]), {
		title,
		body: adminBody,
		tag: `${tag}-admin`,
		url: "/wallet/activity"
	});
	return {
		devices: own.devices + copy.devices,
		sent: own.sent + copy.sent,
		failed: own.failed + copy.failed,
		lastStatus: own.lastStatus || copy.lastStatus
	};
}
async function sendCustomNotice(title, body) {
	await keys();
	return broadcast({
		title: title.trim() || "Trust",
		body: body.trim(),
		tag: `trust-note-${Date.now()}`
	});
}
async function dispatchAlerts(force = false) {
	await keys();
	const count = await (await getSql()).query("select count(*)::int as n from push_subs");
	const devices = Number(count[0]?.n ?? 0);
	if (!devices) return {
		price: false,
		balance: false,
		sent: 0,
		devices: 0,
		failed: 0,
		lastStatus: 0
	};
	const sendPrice = await claim("last_price_at", PRICE_MS, force);
	const sendBalance = await claim("last_balance_at", BALANCE_MS, force);
	if (!sendPrice && !sendBalance) return {
		price: false,
		balance: false,
		sent: 0,
		devices,
		failed: 0,
		lastStatus: 0
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
			sent: 0,
			devices,
			failed: 0,
			lastStatus: 0
		};
	}
	const holdings = await readHoldings();
	let sent = 0;
	let failed = 0;
	let lastStatus = 0;
	if (sendPrice) {
		const res = await broadcast({
			...priceNote(markets, holdings),
			tag: "trust-prices"
		});
		sent += res.sent;
		failed += res.failed;
		lastStatus = res.lastStatus || lastStatus;
		if (res.sent === 0) await release("last_price_at");
	}
	if (sendBalance) {
		const res = await broadcast({
			...balanceNote(markets, holdings),
			tag: "trust-balance"
		});
		sent += res.sent;
		failed += res.failed;
		lastStatus = res.lastStatus || lastStatus;
		if (res.sent === 0) await release("last_balance_at");
	}
	return {
		price: sendPrice,
		balance: sendBalance,
		sent,
		devices,
		failed,
		lastStatus
	};
}
//#endregion
export { dispatchAlerts, notifyMovement, publicPushKey, removeSub, saveSub, sendCustomNotice };
