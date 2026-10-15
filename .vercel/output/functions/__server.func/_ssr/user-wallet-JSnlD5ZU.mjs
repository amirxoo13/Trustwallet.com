import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { c as string, o as object, u as unknown } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-wallet-JSnlD5ZU.js
var access = object({
	email: string().trim().min(3).max(80),
	token: string().min(20).max(80)
});
var loadPrivateWallet_createServerFn_handler = createServerRpc({
	id: "6603960311799039959ec4798f963eec073d7f063e137fb243639220cbe56851",
	name: "loadPrivateWallet",
	filename: "src/lib/user-wallet.ts"
}, (opts) => loadPrivateWallet.__executeServer(opts));
var loadPrivateWallet = createServerFn({ method: "POST" }).validator(access).handler(loadPrivateWallet_createServerFn_handler, async ({ data }) => {
	const { readPrivateWallet } = await import("./user-wallet-send-C2gh4U3F.mjs");
	return readPrivateWallet(data.email, data.token);
});
var savePrivateWallet_createServerFn_handler = createServerRpc({
	id: "f8756a4396611e96f9afaa78d95ec562ca08a184a111bce0a5c44bb03dc7b136",
	name: "savePrivateWallet",
	filename: "src/lib/user-wallet.ts"
}, (opts) => savePrivateWallet.__executeServer(opts));
var savePrivateWallet = createServerFn({ method: "POST" }).validator(access.extend({ wallet: unknown() })).handler(savePrivateWallet_createServerFn_handler, async ({ data }) => {
	const { writePrivateWallet } = await import("./user-wallet-send-C2gh4U3F.mjs");
	return writePrivateWallet(data.email, data.token, data.wallet);
});
//#endregion
export { loadPrivateWallet_createServerFn_handler, savePrivateWallet_createServerFn_handler };
