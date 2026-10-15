import { t as createServerFn } from "./ssr.mjs";
import { t as ADMIN_ACCOUNT } from "./auth-config-BPsn-XvC.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { a as number, c as string, n as array, o as object, s as record, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-wallet-Cy2ZH-Gf.js
var proof = object({ proof: string().max(200) });
var walletPatch = proof.extend({
	email: string().trim().min(3).max(80),
	profile: object({
		firstName: string().max(120),
		lastName: string().max(120),
		email: string().max(120),
		address: string().max(240),
		phone: string().max(40),
		nationalId: string().max(40),
		licensePhoto: string().max(15e5).nullable()
	}),
	holdings: array(object({
		id: string().max(80),
		amount: number().min(0).max(0x38d7ea4c68000)
	})).max(40),
	addresses: record(string().max(40), string().max(180)),
	scenario: _enum([
		"T20",
		"F20",
		"K20"
	]).nullable()
});
function allowed(value) {
	return value === ADMIN_ACCOUNT.password;
}
var loadAdminWallet_createServerFn_handler = createServerRpc({
	id: "1c15a5c5667081ae84ffa05af6c4066c1de02ea3ac3497387430fd3b67128158",
	name: "loadAdminWallet",
	filename: "src/lib/admin-wallet.ts"
}, (opts) => loadAdminWallet.__executeServer(opts));
var loadAdminWallet = createServerFn({ method: "POST" }).validator(proof.extend({ email: string().trim().min(3).max(80) })).handler(loadAdminWallet_createServerFn_handler, async ({ data }) => {
	if (!allowed(data.proof)) return {
		ok: false,
		wallet: null
	};
	const { adminReadWallet } = await import("./admin-wallet-send-Bn7odZuX.mjs");
	return {
		ok: true,
		wallet: await adminReadWallet(data.email)
	};
});
var saveAdminWallet_createServerFn_handler = createServerRpc({
	id: "d423e255b3d01c44e3cafa0e88ba9e5358844b7c5b967c3594f2bdca0f65ddf0",
	name: "saveAdminWallet",
	filename: "src/lib/admin-wallet.ts"
}, (opts) => saveAdminWallet.__executeServer(opts));
var saveAdminWallet = createServerFn({ method: "POST" }).validator(walletPatch).handler(saveAdminWallet_createServerFn_handler, async ({ data }) => {
	if (!allowed(data.proof)) return {
		ok: false,
		wallet: null
	};
	const { adminWriteWallet } = await import("./admin-wallet-send-Bn7odZuX.mjs");
	return {
		ok: true,
		wallet: await adminWriteWallet(data.email, {
			profile: data.profile,
			holdings: data.holdings,
			addresses: data.addresses,
			scenario: data.scenario
		})
	};
});
//#endregion
export { loadAdminWallet_createServerFn_handler, saveAdminWallet_createServerFn_handler };
