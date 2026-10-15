import { n as createServerFn } from "./ssr.mjs";
import { t as ADMIN_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { l as unknown, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { r as STARTER_HOLDINGS } from "./coins-Kac_SJvS.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cloud-state-B6fzTsbF.js
var ROW_ID = "aurex";
function parseObj(raw) {
	if (!raw || raw === "{}") return {};
	try {
		const v = JSON.parse(raw);
		return v && typeof v === "object" && !Array.isArray(v) ? v : {};
	} catch {
		return {};
	}
}
function stamp(v) {
	if (!v) return null;
	if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v.toISOString();
	return String(v) || null;
}
function fail(e) {
	const msg = e instanceof Error ? e.message : String(e);
	throw new Error(msg.replace(/\s+/g, " ").slice(0, 240));
}
var schemaReady = false;
async function ensureSchema() {
	if (schemaReady) return;
	const sql = await getSql();
	await sql.query(`
    create table if not exists app_state (
      id          text primary key,
      site_json   text not null default '{}',
      wallet_json text not null default '{}',
      login_json  text not null default '{}',
      updated_at  timestamptz not null default now()
    )
  `);
	await sql.query("insert into app_state (id) values ($1) on conflict (id) do nothing", [ROW_ID]);
	schemaReady = true;
}
async function migrateWallet(row) {
	const wallet = parseObj(row.wallet_json);
	if (Object.keys(wallet).length === 0 || wallet.balanceEpoch === 2) return row;
	wallet.holdings = STARTER_HOLDINGS.map((h) => ({
		id: h.id,
		amount: h.amount
	}));
	wallet.balanceEpoch = 2;
	const walletJson = JSON.stringify(wallet);
	const updated = await (await getSql()).query("update app_state set wallet_json = $1, updated_at = now() where id = $2 returning updated_at", [walletJson, ROW_ID]);
	return {
		...row,
		wallet_json: walletJson,
		updated_at: updated[0]?.updated_at ?? row.updated_at
	};
}
async function readRow() {
	await ensureSchema();
	const sql = await getSql();
	const rows = await sql.query("select site_json, wallet_json, login_json, updated_at from app_state where id = $1", [ROW_ID]);
	if (!rows[0]) {
		await sql.query("insert into app_state (id) values ($1) on conflict (id) do nothing", [ROW_ID]);
		return {
			site_json: "{}",
			wallet_json: "{}",
			login_json: "{}",
			updated_at: null
		};
	}
	return migrateWallet(rows[0]);
}
var loadAppState_createServerFn_handler = createServerRpc({
	id: "9fcca3163816af2ce2dafcfcf836be156d292364a4cbfec3b98eb73d828abcbc",
	name: "loadAppState",
	filename: "src/lib/cloud-state.ts"
}, (opts) => loadAppState.__executeServer(opts));
var loadAppState = createServerFn({ method: "POST" }).handler(loadAppState_createServerFn_handler, async () => {
	try {
		const row = await readRow();
		const site = parseObj(row.site_json);
		const wallet = parseObj(row.wallet_json);
		const login = parseObj(row.login_json);
		return {
			empty: Object.keys(site).length === 0 && Object.keys(wallet).length === 0,
			updatedAt: stamp(row.updated_at),
			site: Object.keys(site).length ? site : null,
			wallet: Object.keys(wallet).length ? wallet : null,
			login: Object.keys(login).length ? login : null
		};
	} catch (e) {
		fail(e);
	}
});
var saveInput = object({
	actor: _enum([
		"admin",
		"client",
		"public"
	]),
	proof: string().max(200).optional(),
	site: unknown().optional(),
	wallet: unknown().optional(),
	login: unknown().optional(),
	forceLogin: boolean().optional()
});
function provenAdmin(proof) {
	return typeof proof === "string" && proof === ADMIN_ACCOUNT.password;
}
var emptyProfile = () => ({
	firstName: "",
	lastName: "",
	email: "",
	address: "",
	phone: "",
	nationalId: "",
	licensePhoto: null
});
function asRecord(v) {
	return v !== null && typeof v === "object" && !Array.isArray(v) ? v : null;
}
function readProfile(raw, prev) {
	const src = asRecord(raw);
	if (!src) return prev;
	const text = (key, max) => typeof src[key] === "string" ? src[key].slice(0, max) : prev[key];
	const photo = src.licensePhoto;
	return {
		firstName: text("firstName", 120),
		lastName: text("lastName", 120),
		email: text("email", 200),
		address: text("address", 400),
		phone: text("phone", 40),
		nationalId: text("nationalId", 40),
		licensePhoto: typeof photo === "string" ? photo.slice(0, 18e5) : photo === null ? null : prev.licensePhoto
	};
}
function readHoldings(raw) {
	if (!Array.isArray(raw)) return null;
	const out = [];
	for (const item of raw) {
		const row = asRecord(item);
		if (!row || typeof row.id !== "string") continue;
		const amount = typeof row.amount === "number" ? row.amount : Number(row.amount);
		if (!Number.isFinite(amount)) continue;
		out.push({
			id: row.id.slice(0, 80),
			amount: Math.min(0x38d7ea4c68000, Math.max(0, amount))
		});
	}
	return out;
}
function readTx(raw) {
	const row = asRecord(raw);
	if (!row) return null;
	const type = row.type;
	if (type !== "send" && type !== "swap" && type !== "buy" && type !== "receive") return null;
	if (typeof row.id !== "string" || typeof row.coinId !== "string") return null;
	const amount = typeof row.amount === "number" ? row.amount : Number(row.amount);
	if (!Number.isFinite(amount) || amount < 0 || amount > 0x38d7ea4c68000) return null;
	const fee = typeof row.fee === "number" && Number.isFinite(row.fee) ? Math.max(0, row.fee) : 0;
	const toAmount = typeof row.toAmount === "number" && Number.isFinite(row.toAmount) ? Math.max(0, row.toAmount) : void 0;
	const timestamp = typeof row.timestamp === "number" && Number.isFinite(row.timestamp) ? row.timestamp : Date.now();
	return {
		id: row.id.slice(0, 80),
		hash: typeof row.hash === "string" ? row.hash.slice(0, 80) : "",
		type,
		status: row.status === "pending" || row.status === "failed" ? row.status : "confirmed",
		timestamp,
		symbol: typeof row.symbol === "string" ? row.symbol.slice(0, 16) : "",
		coinId: row.coinId.slice(0, 80),
		amount,
		usdValue: typeof row.usdValue === "number" && Number.isFinite(row.usdValue) ? row.usdValue : 0,
		fromAddress: typeof row.fromAddress === "string" ? row.fromAddress.slice(0, 160) : void 0,
		toAddress: typeof row.toAddress === "string" ? row.toAddress.slice(0, 160) : void 0,
		toSymbol: typeof row.toSymbol === "string" ? row.toSymbol.slice(0, 16) : void 0,
		toCoinId: typeof row.toCoinId === "string" ? row.toCoinId.slice(0, 80) : void 0,
		toAmount,
		fee,
		feeSymbol: typeof row.feeSymbol === "string" ? row.feeSymbol.slice(0, 16) : "",
		note: typeof row.note === "string" ? row.note.slice(0, 200) : void 0,
		settlesAt: typeof row.settlesAt === "number" && Number.isFinite(row.settlesAt) ? row.settlesAt : void 0
	};
}
function addHolding(holdings, id, delta) {
	const next = holdings.map((h) => ({ ...h }));
	const i = next.findIndex((h) => h.id === id);
	const cur = i >= 0 ? next[i].amount : 0;
	const amount = Math.min(0x38d7ea4c68000, Math.max(0, cur + delta));
	if (i >= 0) next[i] = {
		id,
		amount
	};
	else next.push({
		id,
		amount
	});
	return next;
}
function applyClientTx(holdings, tx) {
	if (tx.type === "send") {
		const fee = !tx.feeSymbol || tx.feeSymbol === tx.symbol ? tx.fee : 0;
		return addHolding(holdings, tx.coinId, -(tx.amount + fee));
	}
	if (tx.type === "swap") {
		const debited = addHolding(holdings, tx.coinId, -tx.amount);
		if (tx.status === "pending") return debited;
		return tx.toCoinId && tx.toAmount ? addHolding(debited, tx.toCoinId, tx.toAmount) : debited;
	}
	if (tx.type === "buy") return addHolding(holdings, tx.coinId, tx.amount);
	return holdings;
}
function baseHoldings(stored) {
	if (stored.balanceEpoch === 2) {
		const parsed = readHoldings(stored.holdings);
		if (parsed && parsed.length) return parsed;
	}
	return STARTER_HOLDINGS.map((h) => ({ ...h }));
}
/** Client may update their profile and apply send/swap/buy. They cannot rewrite balances or site content. */
function mergeClientWallet(storedRaw, incoming) {
	const stored = parseObj(storedRaw);
	const next = asRecord(incoming);
	const prevProfile = readProfile(stored.profile, emptyProfile());
	const profile = readProfile(next?.profile, prevProfile);
	let holdings = baseHoldings(stored);
	const prevTxs = Array.isArray(stored.transactions) ? stored.transactions.map(readTx).filter((t) => Boolean(t)) : [];
	const known = new Set(prevTxs.map((t) => t.id));
	const incomingTxs = (Array.isArray(next?.transactions) ? next.transactions : []).map(readTx).filter((t) => Boolean(t));
	const incomingById = new Map(incomingTxs.map((t) => [t.id, t]));
	const fresh = incomingTxs.filter((t) => !known.has(t.id) && (t.type === "send" || t.type === "swap" || t.type === "buy")).slice(0, 30).sort((a, b) => a.timestamp - b.timestamp);
	for (const tx of fresh) holdings = applyClientTx(holdings, tx);
	const updatedPrev = prevTxs.map((prev) => {
		const incoming = incomingById.get(prev.id);
		if (!incoming) return prev;
		if (prev.status === "pending" && incoming.status === "confirmed" && prev.type === "swap" && prev.toCoinId && prev.toAmount) {
			holdings = addHolding(holdings, prev.toCoinId, prev.toAmount);
			return {
				...prev,
				status: "confirmed"
			};
		}
		return prev;
	});
	const transactions = [...fresh, ...updatedPrev].sort((a, b) => b.timestamp - a.timestamp).slice(0, 200);
	const prevAddresses = asRecord(stored.addresses) ?? {};
	const incomingAddresses = asRecord(next?.addresses) ?? {};
	const addresses = {};
	const source = Object.keys(prevAddresses).length ? prevAddresses : incomingAddresses;
	for (const [chain, addr] of Object.entries(source)) if (typeof addr === "string" && addr.length > 0 && addr.length < 200) addresses[chain.slice(0, 40)] = addr;
	const scenario = stored.scenario === "T20" || stored.scenario === "F20" || stored.scenario === "K20" ? stored.scenario : null;
	return {
		profile,
		holdings,
		transactions,
		addresses,
		scenario,
		balanceEpoch: 2
	};
}
var loadAppStateMeta_createServerFn_handler = createServerRpc({
	id: "aba863cbc688183602b1be638b3b33024a9854be43db61e6965193981c2ea8a8",
	name: "loadAppStateMeta",
	filename: "src/lib/cloud-state.ts"
}, (opts) => loadAppStateMeta.__executeServer(opts));
var loadAppStateMeta = createServerFn({ method: "POST" }).handler(loadAppStateMeta_createServerFn_handler, async () => {
	try {
		const row = await readRow();
		const site = parseObj(row.site_json);
		const wallet = parseObj(row.wallet_json);
		return {
			empty: Object.keys(site).length === 0 && Object.keys(wallet).length === 0,
			updatedAt: stamp(row.updated_at)
		};
	} catch (e) {
		fail(e);
	}
});
var saveAppState_createServerFn_handler = createServerRpc({
	id: "f6c8836b3c3e7799e8b55ef81110225243a1e240e9bae5adbdadee48470f5e6c",
	name: "saveAppState",
	filename: "src/lib/cloud-state.ts"
}, (opts) => saveAppState.__executeServer(opts));
var saveAppState = createServerFn({ method: "POST" }).validator(saveInput).handler(saveAppState_createServerFn_handler, async ({ data }) => {
	try {
		const row = await readRow();
		let siteJson = row.site_json;
		let walletJson = row.wallet_json;
		let loginJson = row.login_json;
		const admin = provenAdmin(data.proof);
		let changed = false;
		let merged = null;
		if (data.site != null && admin) {
			siteJson = JSON.stringify(data.site);
			changed = true;
		}
		if (data.wallet != null && admin) {
			walletJson = JSON.stringify(data.wallet);
			changed = true;
		} else if (data.wallet != null && data.actor === "client") {
			merged = mergeClientWallet(row.wallet_json, data.wallet);
			const next = JSON.stringify(merged);
			if (next !== walletJson) {
				walletJson = next;
				changed = true;
			}
		}
		if (data.login != null) {
			const incoming = data.login;
			const prev = parseObj(loginJson);
			const nextLogin = admin && data.forceLogin ? {
				startedAt: incoming.startedAt ?? null,
				lockedScenario: incoming.lockedScenario ?? null
			} : {
				startedAt: prev.startedAt ?? incoming.startedAt ?? null,
				lockedScenario: prev.lockedScenario ?? incoming.lockedScenario ?? null
			};
			const nextJson = JSON.stringify(nextLogin);
			if (nextJson !== loginJson) {
				loginJson = nextJson;
				changed = true;
			}
		}
		if (!changed) return {
			ok: true,
			updatedAt: stamp(row.updated_at),
			wallet: merged
		};
		return {
			ok: true,
			updatedAt: stamp((await (await getSql()).query("update app_state set site_json = $1, wallet_json = $2, login_json = $3, updated_at = now() where id = $4 returning updated_at", [
				siteJson,
				walletJson,
				loginJson,
				ROW_ID
			]))[0]?.updated_at),
			wallet: merged
		};
	} catch (e) {
		fail(e);
	}
});
//#endregion
export { loadAppStateMeta_createServerFn_handler, loadAppState_createServerFn_handler, saveAppState_createServerFn_handler };
