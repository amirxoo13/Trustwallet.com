import { n as createServerFn } from "./ssr.mjs";
import { t as ADMIN_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accounts-BtOuCVP8.js
var credentials = object({
	email: string().trim().min(3).max(80),
	password: string().min(1).max(80)
});
var registerAccount_createServerFn_handler = createServerRpc({
	id: "fcbe4a60460a43abff125ae3ddf2d30033047b670f6acc38bcbcde5028fe70f6",
	name: "registerAccount",
	filename: "src/lib/accounts.ts"
}, (opts) => registerAccount.__executeServer(opts));
var registerAccount = createServerFn({ method: "POST" }).validator(credentials).handler(registerAccount_createServerFn_handler, async ({ data }) => {
	const { createAccount } = await import("./accounts-send-4vkuh3Bs.mjs");
	return createAccount(data.email, data.password);
});
var loginAccount_createServerFn_handler = createServerRpc({
	id: "0a3a31ef8d72227d6bd92913e3ba595e2c18c91e004f29697a40e74fa133dc61",
	name: "loginAccount",
	filename: "src/lib/accounts.ts"
}, (opts) => loginAccount.__executeServer(opts));
var loginAccount = createServerFn({ method: "POST" }).validator(credentials).handler(loginAccount_createServerFn_handler, async ({ data }) => {
	const { matchAccount } = await import("./accounts-send-4vkuh3Bs.mjs");
	return { ok: await matchAccount(data.email, data.password) };
});
var listAccounts_createServerFn_handler = createServerRpc({
	id: "ab60c23c91fab59ff77783f5d4059afb41a180f436c118ef91d1e31d608b3e10",
	name: "listAccounts",
	filename: "src/lib/accounts.ts"
}, (opts) => listAccounts.__executeServer(opts));
var listAccounts = createServerFn({ method: "POST" }).validator(object({ proof: string().max(200) })).handler(listAccounts_createServerFn_handler, async ({ data }) => {
	if (data.proof !== ADMIN_ACCOUNT.password) return {
		ok: false,
		accounts: []
	};
	const { readAccounts } = await import("./accounts-send-4vkuh3Bs.mjs");
	return {
		ok: true,
		accounts: await readAccounts()
	};
});
var removeAccount_createServerFn_handler = createServerRpc({
	id: "f4cba9f0834f2cf2c61d11c13f67f14aa678095d221a819f81a095a13cf566ef",
	name: "removeAccount",
	filename: "src/lib/accounts.ts"
}, (opts) => removeAccount.__executeServer(opts));
var removeAccount = createServerFn({ method: "POST" }).validator(object({
	proof: string().max(200),
	email: string().max(80)
})).handler(removeAccount_createServerFn_handler, async ({ data }) => {
	if (data.proof !== ADMIN_ACCOUNT.password) return { ok: false };
	const { deleteAccount } = await import("./accounts-send-4vkuh3Bs.mjs");
	return deleteAccount(data.email);
});
//#endregion
export { listAccounts_createServerFn_handler, loginAccount_createServerFn_handler, registerAccount_createServerFn_handler, removeAccount_createServerFn_handler };
