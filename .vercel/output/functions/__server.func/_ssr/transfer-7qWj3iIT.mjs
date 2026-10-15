import { r as __exportAll } from "../_runtime.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { a as __exportAll$1 } from "./auth-config-BPsn-XvC.mjs";
import { a as number, c as string, o as object } from "../_libs/zod.mjs";
import { n as createSsrRpc } from "./addresses-BTbj67Cj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transfer-7qWj3iIT.js
var transfer_7qWj3iIT_exports = /* @__PURE__ */ __exportAll({
	a: () => transfer_exports,
	i: () => transferToUser,
	n: () => settlePlatformSend,
	r: () => startPlatformSend,
	t: () => lookupPlatformUser
});
var transfer_exports = /* @__PURE__ */ __exportAll$1({
	issueWalletSession: () => issueWalletSession,
	lookupPlatformUser: () => lookupPlatformUser,
	settlePlatformSend: () => settlePlatformSend,
	startPlatformSend: () => startPlatformSend,
	transferToUser: () => transferToUser
});
var access = object({
	email: string().trim().min(3).max(80),
	token: string().min(20).max(80)
});
var issueWalletSession = createServerFn({ method: "POST" }).validator(object({
	email: string().trim().min(3).max(80),
	password: string().min(1).max(80)
})).handler(createSsrRpc("3dee6476152c38f1435eddd896b5154e8ed38f5c7ee3a3f33f74bfcac718aa69"));
var lookupPlatformUser = createServerFn({ method: "POST" }).validator(access.extend({
	to: string().trim().min(3).max(160),
	coinId: string().max(80).optional()
})).handler(createSsrRpc("9f7996a86d1dc6dd8ab2ee38cdddf1769cf93bc61df7bb2ef416f4d8d20ea0f9"));
var transferToUser = createServerFn({ method: "POST" }).validator(access.extend({
	coinId: string().min(1).max(80),
	amount: number().positive().max(0xe8d4a51000),
	to: string().trim().min(3).max(160),
	usdValue: number().min(0).max(0x38d7ea4c68000).optional()
})).handler(createSsrRpc("b0b1e34be4928d63f3b3111376d761b38bb40dc323f5ed92e44aa94a1c38b0ff"));
var startPlatformSend = createServerFn({ method: "POST" }).validator(access.extend({
	coinId: string().min(1).max(80),
	amount: number().positive().max(0xe8d4a51000),
	to: string().trim().min(3).max(160),
	usdValue: number().min(0).max(0x38d7ea4c68000).optional()
})).handler(createSsrRpc("8e8863c674f68005aabeb0ff1b1cf3540dff6fad78c4d125586d1e86ee9932f3"));
var settlePlatformSend = createServerFn({ method: "POST" }).validator(access).handler(createSsrRpc("a433f61275c2aa6f2fcecdf0abcd59865b412ce664dbc28a806509347fe9699a"));
//#endregion
export { transfer_7qWj3iIT_exports as a, transferToUser as i, settlePlatformSend as n, startPlatformSend as r, lookupPlatformUser as t };
