import { t as createServerFn } from "./ssr.mjs";
import { c as string, o as object, u as unknown } from "../_libs/zod.mjs";
import { n as createSsrRpc } from "./addresses-BTbj67Cj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/user-wallet-_ZuKfiyz.js
var access = object({
	email: string().trim().min(3).max(80),
	token: string().min(20).max(80)
});
var loadPrivateWallet = createServerFn({ method: "POST" }).validator(access).handler(createSsrRpc("6603960311799039959ec4798f963eec073d7f063e137fb243639220cbe56851"));
var savePrivateWallet = createServerFn({ method: "POST" }).validator(access.extend({ wallet: unknown() })).handler(createSsrRpc("f8756a4396611e96f9afaa78d95ec562ca08a184a111bce0a5c44bb03dc7b136"));
//#endregion
export { loadPrivateWallet, savePrivateWallet };
