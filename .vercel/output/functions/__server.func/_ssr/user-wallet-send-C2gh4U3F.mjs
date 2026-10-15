import { a as generateWalletCodes, i as generateAddress } from "./addresses-BTbj67Cj.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { n as sessionMatches } from "./accounts-send-JRTfZ1c1.mjs";
import { t as COINS } from "./coins-Kac_SJvS.mjs";
import { n as mergeClientWallet } from "./cloud-state-Bj5Vcsaw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-wallet-send-C2gh4U3F.js
async function ensureSchema() {
	await (await getSql()).query(`create table if not exists user_wallets (
      email text primary key,
      wallet_json text not null,
      updated_at timestamptz not null default now()
    )`);
}
function freshWallet(email) {
	const addresses = { ...generateWalletCodes() };
	for (const coin of COINS) if (!addresses[coin.chain]) addresses[coin.chain] = generateAddress(coin.kind);
	return {
		profile: {
			firstName: "",
			lastName: "",
			email,
			address: "",
			phone: "",
			nationalId: "",
			licensePhoto: null
		},
		holdings: COINS.map((coin) => ({
			id: coin.id,
			amount: 0
		})),
		transactions: [],
		addresses,
		scenario: null,
		balanceEpoch: 2
	};
}
async function loadUserWallet(email) {
	const normalized = email.trim().toLowerCase();
	await ensureSchema();
	const rows = await (await getSql()).query("select wallet_json from user_wallets where email = $1", [normalized]);
	if (!rows[0]) return null;
	try {
		return JSON.parse(rows[0].wallet_json);
	} catch {
		return null;
	}
}
async function putUserWallet(email, wallet) {
	const normalized = email.trim().toLowerCase();
	await ensureSchema();
	const sql = await getSql();
	const json = JSON.stringify(wallet);
	if ((await sql.query("select email from user_wallets where email = $1", [normalized]))[0]) await sql.query("update user_wallets set wallet_json = $1, updated_at = now() where email = $2", [json, normalized]);
	else await sql.query("insert into user_wallets (email, wallet_json) values ($1, $2)", [normalized, json]);
}
async function listUserWallets() {
	await ensureSchema();
	const rows = await (await getSql()).query("select email, wallet_json from user_wallets");
	const out = [];
	for (const row of rows) try {
		out.push({
			email: row.email,
			wallet: JSON.parse(row.wallet_json)
		});
	} catch {}
	return out;
}
async function ensureUserWallet(email) {
	const existing = await loadUserWallet(email);
	if (existing) return existing;
	const created = freshWallet(email.trim().toLowerCase());
	await putUserWallet(email, created);
	return created;
}
async function readPrivateWallet(email, token) {
	const normalized = email.trim().toLowerCase();
	if (!await sessionMatches(normalized, token)) return {
		ok: false,
		wallet: null
	};
	await ensureSchema();
	const sql = await getSql();
	const rows = await sql.query("select wallet_json from user_wallets where email = $1", [normalized]);
	if (!rows[0]) {
		const created = freshWallet(normalized);
		await sql.query("insert into user_wallets (email, wallet_json) values ($1, $2)", [normalized, JSON.stringify(created)]);
		return {
			ok: true,
			wallet: created
		};
	}
	const wallet = JSON.parse(rows[0].wallet_json);
	const { settlePrivate } = await import("./transfer-send-BVfwYnIh.mjs");
	return {
		ok: true,
		wallet: await settlePrivate(normalized) ?? wallet
	};
}
async function writePrivateWallet(email, token, incoming) {
	const normalized = email.trim().toLowerCase();
	if (!await sessionMatches(normalized, token)) return {
		ok: false,
		wallet: null
	};
	await ensureSchema();
	const sql = await getSql();
	const rows = await sql.query("select wallet_json from user_wallets where email = $1", [normalized]);
	const base = rows[0]?.wallet_json ?? JSON.stringify(freshWallet(normalized));
	const wallet = mergeClientWallet(base, incoming);
	wallet.profile = {
		...wallet.profile,
		email: wallet.profile.email || normalized
	};
	wallet.holdings = wallet.holdings.map((holding) => ({
		...holding,
		amount: Math.max(0, holding.amount)
	}));
	const json = JSON.stringify(wallet);
	if (rows[0]) await sql.query("update user_wallets set wallet_json = $1, updated_at = now() where email = $2", [json, normalized]);
	else await sql.query("insert into user_wallets (email, wallet_json) values ($1, $2)", [normalized, json]);
	return {
		ok: true,
		wallet
	};
}
//#endregion
export { ensureUserWallet, listUserWallets, loadUserWallet, putUserWallet, readPrivateWallet, writePrivateWallet };
