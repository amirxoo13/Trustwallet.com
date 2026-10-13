import { a as object, c as unknown, n as boolean, t as _enum } from "../_libs/zod.mjs";
import { n as TSS_SERVER_FUNCTION, r as getServerFnById, t as createServerFn } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cloud-state-CPgOTPVq.js
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var loadAppState = createServerFn({ method: "POST" }).handler(createSsrRpc("9fcca3163816af2ce2dafcfcf836be156d292364a4cbfec3b98eb73d828abcbc"));
var saveInput = object({
	actor: _enum([
		"admin",
		"client",
		"public"
	]),
	site: unknown().optional(),
	wallet: unknown().optional(),
	login: unknown().optional(),
	forceLogin: boolean().optional()
});
var loadAppStateMeta = createServerFn({ method: "POST" }).handler(createSsrRpc("aba863cbc688183602b1be638b3b33024a9854be43db61e6965193981c2ea8a8"));
var saveAppState = createServerFn({ method: "POST" }).validator(saveInput).handler(createSsrRpc("f6c8836b3c3e7799e8b55ef81110225243a1e240e9bae5adbdadee48470f5e6c"));
//#endregion
export { loadAppState, loadAppStateMeta, saveAppState };
