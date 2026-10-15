import { n as CLIENT_ACCOUNT } from "./auth-config-BPsn-XvC.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { r as STARTER_HOLDINGS, t as COINS } from "./coins-Kac_SJvS.mjs";
import { ensureUserWallet, putUserWallet } from "./user-wallet-send-DVTEPw_Z.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-wallet-send-Bn7odZuX.js
var PRIMARY = CLIENT_ACCOUNT.email.toLowerCase();
var ROW_ID = "aurex";
var emptyProfile = (email) => ({
	firstName: "",
	lastName: "",
	email,
	address: "",
	phone: "",
	nationalId: "",
	licensePhoto: null
});
function cleanProfile(raw, email) {
	const text = (value, max) => value.trim().slice(0, max);
	return {
		firstName: text(raw.firstName || "", 120),
		lastName: text(raw.lastName || "", 120),
		email: text(raw.email || email, 120),
		address: text(raw.address || "", 240),
		phone: text(raw.phone || "", 40),
		nationalId: text(raw.nationalId || "", 40),
		licensePhoto: typeof raw.licensePhoto === "string" && raw.licensePhoto.startsWith("data:image/") ? raw.licensePhoto.slice(0, 15e5) : null
	};
}
function cleanHoldings(raw) {
	const map = new Map(raw.map((row) => [row.id, Number(row.amount)]));
	return COINS.map((coin) => {
		const amount = map.get(coin.id);
		return {
			id: coin.id,
			amount: Number.isFinite(amount) ? Math.min(0x38d7ea4c68000, Math.max(0, amount)) : 0
		};
	});
}
function cleanAddresses(raw) {
	const out = {};
	for (const [chain, addr] of Object.entries(raw)) if (typeof addr === "string" && addr.trim()) out[chain.slice(0, 40)] = addr.trim().slice(0, 180);
	return out;
}
async function loadShared() {
	const rows = await (await getSql()).query("select wallet_json from app_state where id = $1", [ROW_ID]);
	if (!rows[0]) return null;
	try {
		return JSON.parse(rows[0].wallet_json);
	} catch {
		return null;
	}
}
async function saveShared(wallet) {
	await (await getSql()).query("update app_state set wallet_json = $1, updated_at = now() where id = $2", [JSON.stringify(wallet), ROW_ID]);
}
async function adminReadWallet(email) {
	const normalized = email.trim().toLowerCase();
	if (normalized === PRIMARY) return await loadShared() ?? {
		profile: emptyProfile(PRIMARY),
		holdings: STARTER_HOLDINGS.map((row) => ({ ...row })),
		transactions: [],
		addresses: { btc: "bc1q2edayg4fecpvxnu88vwrewuw32klc4f2gqxfq6" },
		scenario: null,
		balanceEpoch: 2
	};
	return ensureUserWallet(normalized);
}
async function adminWriteWallet(email, patch) {
	const normalized = email.trim().toLowerCase();
	const current = normalized === PRIMARY ? await loadShared() ?? await adminReadWallet(PRIMARY) : await ensureUserWallet(normalized);
	const next = {
		...current,
		profile: cleanProfile(patch.profile, normalized),
		holdings: cleanHoldings(patch.holdings),
		addresses: {
			...current.addresses,
			...cleanAddresses(patch.addresses)
		},
		scenario: patch.scenario,
		balanceEpoch: 2,
		restoreMark: 1
	};
	if (normalized === PRIMARY) await saveShared(next);
	else await putUserWallet(normalized, next);
	return next;
}
//#endregion
export { adminReadWallet, adminWriteWallet };
