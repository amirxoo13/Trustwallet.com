import { n as createServerFn } from "./ssr.mjs";
import { l as unknown, o as object, r as boolean, s as string, t as _enum } from "../_libs/zod.mjs";
import { l as createSsrRpc } from "./router-BAAEt4at.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cloud-state-Dkf4UzHB.js
var loadAppState = createServerFn({ method: "POST" }).handler(createSsrRpc("9fcca3163816af2ce2dafcfcf836be156d292364a4cbfec3b98eb73d828abcbc"));
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
/** Client may update their profile and apply send/swap/buy. They cannot rewrite balances or site content. */
var loadAppStateMeta = createServerFn({ method: "POST" }).handler(createSsrRpc("aba863cbc688183602b1be638b3b33024a9854be43db61e6965193981c2ea8a8"));
var saveAppState = createServerFn({ method: "POST" }).validator(saveInput).handler(createSsrRpc("f6c8836b3c3e7799e8b55ef81110225243a1e240e9bae5adbdadee48470f5e6c"));
//#endregion
export { loadAppState, loadAppStateMeta, saveAppState };
