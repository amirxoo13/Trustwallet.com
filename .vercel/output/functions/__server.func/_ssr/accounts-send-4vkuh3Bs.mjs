import { n as CLIENT_ACCOUNT, t as ADMIN_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
//#region node_modules/.nitro/vite/services/ssr/assets/accounts-send-4vkuh3Bs.js
var scrypt$1 = promisify(scrypt);
async function ensureSchema() {
	await (await getSql()).query(`create table if not exists app_accounts (
      email text primary key,
      password_hash text not null,
      created_at bigint not null
    )`);
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
	if (reserved(normalized)) return false;
	await ensureSchema();
	const rows = await (await getSql()).query("select password_hash from app_accounts where email = $1", [normalized]);
	if (!rows[0]) return false;
	return verifyPassword(password, rows[0].password_hash);
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
export { createAccount, deleteAccount, matchAccount, readAccounts };
