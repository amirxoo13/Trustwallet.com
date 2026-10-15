import { r as __exportAll } from "../_runtime.mjs";
import { n as CLIENT_ACCOUNT, t as ADMIN_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { t as __exportAll$1 } from "./rolldown-runtime-D7D4PA-g.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
//#region node_modules/.nitro/vite/services/ssr/assets/accounts-send-QqjBe02A.js
var accounts_send_QqjBe02A_exports = /* @__PURE__ */ __exportAll({
	n: () => sessionMatches,
	t: () => accounts_send_exports
});
var accounts_send_exports = /* @__PURE__ */ __exportAll$1({
	createAccount: () => createAccount,
	deleteAccount: () => deleteAccount,
	hashPassword: () => hashPassword,
	matchAccount: () => matchAccount,
	readAccounts: () => readAccounts,
	sessionMatches: () => sessionMatches,
	verifyPassword: () => verifyPassword
});
var scrypt$1 = promisify(scrypt);
async function ensureSchema() {
	const sql = await getSql();
	await sql.query(`create table if not exists app_accounts (
      email text primary key,
      password_hash text not null,
      created_at bigint not null
    )`);
	await sql.query(`alter table app_accounts add column if not exists session_token text not null default ''`);
}
function reserved(email) {
	return email === ADMIN_ACCOUNT.email.toLowerCase() || email === CLIENT_ACCOUNT.email.toLowerCase();
}
async function hashPassword(password) {
	const salt = randomBytes(16).toString("hex");
	return `scrypt$${salt}$${(await scrypt$1(password, salt, 32)).toString("hex")}`;
}
async function verifyPassword(password, stored) {
	const [kind, salt, hex] = stored.split("$");
	if (kind !== "scrypt" || !salt || !hex) return false;
	const expected = Buffer.from(hex, "hex");
	const hash = await scrypt$1(password, salt, 32);
	if (hash.length !== expected.length) return false;
	return timingSafeEqual(hash, expected);
}
async function createAccount(email, password) {
	const normalized = email.trim().toLowerCase();
	if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) return {
		ok: false,
		error: "invalid"
	};
	if (password.length < 8 || password.length > 80) return {
		ok: false,
		error: "weak"
	};
	if (reserved(normalized)) return {
		ok: false,
		error: "taken"
	};
	await ensureSchema();
	const sql = await getSql();
	if ((await sql.query("select email from app_accounts where email = $1", [normalized])).length) return {
		ok: false,
		error: "taken"
	};
	await sql.query("insert into app_accounts (email, password_hash, created_at) values ($1, $2, $3)", [
		normalized,
		await hashPassword(password),
		Date.now()
	]);
	return { ok: true };
}
async function matchAccount(email, password) {
	const normalized = email.trim().toLowerCase();
	if (reserved(normalized)) return { ok: false };
	await ensureSchema();
	const sql = await getSql();
	const rows = await sql.query("select password_hash from app_accounts where email = $1", [normalized]);
	if (!rows[0]) return { ok: false };
	if (!await verifyPassword(password, rows[0].password_hash)) return { ok: false };
	const token = randomBytes(24).toString("hex");
	await sql.query("update app_accounts set session_token = $1 where email = $2", [token, normalized]);
	return {
		ok: true,
		token
	};
}
async function sessionMatches(email, token) {
	if (!token || token.length < 20) return false;
	await ensureSchema();
	const stored = (await (await getSql()).query("select session_token from app_accounts where email = $1", [email.trim().toLowerCase()]))[0]?.session_token || "";
	if (!stored || stored.length !== token.length) return false;
	return timingSafeEqual(Buffer.from(stored), Buffer.from(token));
}
async function readAccounts() {
	await ensureSchema();
	return (await (await getSql()).query("select email, created_at from app_accounts order by created_at desc")).map((row) => ({
		email: row.email,
		createdAt: Number(row.created_at) || 0
	}));
}
async function deleteAccount(email) {
	const normalized = email.trim().toLowerCase();
	await ensureSchema();
	await (await getSql()).query("delete from app_accounts where email = $1", [normalized]);
	return { ok: true };
}
//#endregion
export { sessionMatches as n, accounts_send_QqjBe02A_exports as t };
