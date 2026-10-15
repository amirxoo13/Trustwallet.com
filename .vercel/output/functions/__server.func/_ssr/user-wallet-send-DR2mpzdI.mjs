import { a as generateAddress, o as generateWalletCodes } from "./addresses-B9c12vyu.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { sessionMatches } from "./accounts-send-CMJBzbpi.mjs";
import { t as COINS } from "./coins-Kac_SJvS.mjs";
import { mergeClientWallet } from "./cloud-state-Bg1Xw5fm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-wallet-send-DR2mpzdI.js
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
	return {
		ok: true,
		wallet: mergeClientWallet(rows[0].wallet_json, JSON.parse(rows[0].wallet_json))
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
export { readPrivateWallet, writePrivateWallet };
