import { t as createServerFn } from "./ssr.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { a as number, c as string, o as object } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/transfer-csalG00-.js
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
	const { issueWalletSession: issue } = await import("./transfer-send-BVfwYnIh.mjs");
	return issue(data.email, data.password);
});
var lookupPlatformUser_createServerFn_handler = createServerRpc({
	id: "9f7996a86d1dc6dd8ab2ee38cdddf1769cf93bc61df7bb2ef416f4d8d20ea0f9",
	name: "lookupPlatformUser",
	filename: "src/lib/transfer.ts"
}, (opts) => lookupPlatformUser.__executeServer(opts));
var lookupPlatformUser = createServerFn({ method: "POST" }).validator(access.extend({
	to: string().trim().min(3).max(160),
	coinId: string().max(80).optional()
})).handler(lookupPlatformUser_createServerFn_handler, async ({ data }) => {
	const { lookupPlatformUser: lookup } = await import("./transfer-send-BVfwYnIh.mjs");
	return lookup(data.email, data.token, data.to, data.coinId);
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
	const { transferToUser: send } = await import("./transfer-send-BVfwYnIh.mjs");
	return send({
		actorEmail: data.email,
		token: data.token,
		coinId: data.coinId,
		amount: data.amount,
		to: data.to,
		usdValue: data.usdValue ?? 0
	});
});
var startPlatformSend_createServerFn_handler = createServerRpc({
	id: "8e8863c674f68005aabeb0ff1b1cf3540dff6fad78c4d125586d1e86ee9932f3",
	name: "startPlatformSend",
	filename: "src/lib/transfer.ts"
}, (opts) => startPlatformSend.__executeServer(opts));
var startPlatformSend = createServerFn({ method: "POST" }).validator(access.extend({
	coinId: string().min(1).max(80),
	amount: number().positive().max(0xe8d4a51000),
	to: string().trim().min(3).max(160),
	usdValue: number().min(0).max(0x38d7ea4c68000).optional()
})).handler(startPlatformSend_createServerFn_handler, async ({ data }) => {
	const { startPlatformSend: send } = await import("./transfer-send-BVfwYnIh.mjs");
	return send({
		actorEmail: data.email,
		token: data.token,
		coinId: data.coinId,
		amount: data.amount,
		to: data.to,
		usdValue: data.usdValue ?? 0
	});
});
var settlePlatformSend_createServerFn_handler = createServerRpc({
	id: "a433f61275c2aa6f2fcecdf0abcd59865b412ce664dbc28a806509347fe9699a",
	name: "settlePlatformSend",
	filename: "src/lib/transfer.ts"
}, (opts) => settlePlatformSend.__executeServer(opts));
var settlePlatformSend = createServerFn({ method: "POST" }).validator(access).handler(settlePlatformSend_createServerFn_handler, async ({ data }) => {
	const { walletEmailFor, settlePrivate } = await import("./transfer-send-BVfwYnIh.mjs");
	const email = await walletEmailFor(data.email, data.token);
	if (!email) return {
		ok: false,
		error: "auth"
	};
	const wallet = await settlePrivate(email);
	if (!wallet) return {
		ok: false,
		error: "wallet"
	};
	return {
		ok: true,
		wallet
	};
});
//#endregion
export { issueWalletSession_createServerFn_handler, lookupPlatformUser_createServerFn_handler, settlePlatformSend_createServerFn_handler, startPlatformSend_createServerFn_handler, transferToUser_createServerFn_handler };
