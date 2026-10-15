import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { a as number, o as object, s as string } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transfer-lMSidJKX.js
var access = object({
	email: string().trim().min(3).max(80),
	token: string().min(20).max(80)
});
var issueWalletSession_createServerFn_handler = createServerRpc({
	id: "3dee6476152c38f1435eddd896b5154e8ed38f5c7ee3a3f33f74bfcac718aa69",
	name: "issueWalletSession",
	filename: "src/lib/transfer.ts"
}, (opts) => issueWalletSession.__executeServer(opts));
var issueWalletSession = createServerFn({ method: "POST" }).validator(object({
	email: string().trim().min(3).max(80),
	password: string().min(1).max(80)
})).handler(issueWalletSession_createServerFn_handler, async ({ data }) => {
	const { issueWalletSession: issue } = await import("./transfer-send-Bq6Rh4Qk.mjs");
	return issue(data.email, data.password);
});
var lookupPlatformUser_createServerFn_handler = createServerRpc({
	id: "9f7996a86d1dc6dd8ab2ee38cdddf1769cf93bc61df7bb2ef416f4d8d20ea0f9",
	name: "lookupPlatformUser",
	filename: "src/lib/transfer.ts"
}, (opts) => lookupPlatformUser.__executeServer(opts));
var lookupPlatformUser = createServerFn({ method: "POST" }).validator(access.extend({ to: string().trim().min(3).max(160) })).handler(lookupPlatformUser_createServerFn_handler, async ({ data }) => {
	const { lookupPlatformUser: lookup } = await import("./transfer-send-Bq6Rh4Qk.mjs");
	return lookup(data.email, data.token, data.to);
});
var transferToUser_createServerFn_handler = createServerRpc({
	id: "b0b1e34be4928d63f3b3111376d761b38bb40dc323f5ed92e44aa94a1c38b0ff",
	name: "transferToUser",
	filename: "src/lib/transfer.ts"
}, (opts) => transferToUser.__executeServer(opts));
var transferToUser = createServerFn({ method: "POST" }).validator(access.extend({
	coinId: string().min(1).max(80),
	amount: number().positive().max(0xe8d4a51000),
	to: string().trim().min(3).max(160),
	usdValue: number().min(0).max(0x38d7ea4c68000).optional()
})).handler(transferToUser_createServerFn_handler, async ({ data }) => {
	const { transferToUser: send } = await import("./transfer-send-Bq6Rh4Qk.mjs");
	return send({
		actorEmail: data.email,
		token: data.token,
		coinId: data.coinId,
		amount: data.amount,
		to: data.to,
		usdValue: data.usdValue ?? 0
	});
});
//#endregion
export { issueWalletSession_createServerFn_handler, lookupPlatformUser_createServerFn_handler, transferToUser_createServerFn_handler };
