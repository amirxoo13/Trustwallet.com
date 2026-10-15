import { t as createServerFn } from "./ssr.mjs";
import { o as object, s as string } from "../_libs/zod.mjs";
import { r as createSsrRpc } from "./addresses-B9c12vyu.mjs";
import { _ as __exportAll } from "./router-B9Cliijw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/accounts-Cina8G8o.js
var accounts_exports = /* @__PURE__ */ __exportAll({
	listAccounts: () => listAccounts,
	loginAccount: () => loginAccount,
	registerAccount: () => registerAccount,
	removeAccount: () => removeAccount
});
var credentials = object({
	email: string().trim().min(3).max(80),
	password: string().min(1).max(80)
});
var registerAccount = createServerFn({ method: "POST" }).validator(credentials).handler(createSsrRpc("fcbe4a60460a43abff125ae3ddf2d30033047b670f6acc38bcbcde5028fe70f6"));
var loginAccount = createServerFn({ method: "POST" }).validator(credentials).handler(createSsrRpc("0a3a31ef8d72227d6bd92913e3ba595e2c18c91e004f29697a40e74fa133dc61"));
var listAccounts = createServerFn({ method: "POST" }).validator(object({ proof: string().max(200) })).handler(createSsrRpc("ab60c23c91fab59ff77783f5d4059afb41a180f436c118ef91d1e31d608b3e10"));
var removeAccount = createServerFn({ method: "POST" }).validator(object({
	proof: string().max(200),
	email: string().max(80)
})).handler(createSsrRpc("f4cba9f0834f2cf2c61d11c13f67f14aa678095d221a819f81a095a13cf566ef"));
//#endregion
export { removeAccount as i, listAccounts as n, registerAccount as r, accounts_exports as t };
