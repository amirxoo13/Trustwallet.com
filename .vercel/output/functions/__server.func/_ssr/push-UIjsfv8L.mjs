import { t as ADMIN_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { a as object, n as boolean, o as string } from "../_libs/zod.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/push-UIjsfv8L.js
var subInput = object({
	endpoint: string().min(8).max(2e3),
	keys: object({
		p256dh: string().min(1).max(255),
		auth: string().min(1).max(255)
	})
});
var getPushPublicKey_createServerFn_handler = createServerRpc({
	id: "bb83a3388a34406be3a228ce59d18d083e79149f0cd8b08b6c14ed9dfc1c9c3b",
	name: "getPushPublicKey",
	filename: "src/lib/push.ts"
}, (opts) => getPushPublicKey.__executeServer(opts));
var getPushPublicKey = createServerFn({ method: "GET" }).handler(getPushPublicKey_createServerFn_handler, async () => {
	const { publicPushKey } = await import("./push-send-DvsmPMQ3.mjs");
	return publicPushKey();
});
var savePushSubscription_createServerFn_handler = createServerRpc({
	id: "7e73b1979e547dc226f32cbf3eeb8b22a3851282d4879544abad7e331e9ae7f2",
	name: "savePushSubscription",
	filename: "src/lib/push.ts"
}, (opts) => savePushSubscription.__executeServer(opts));
var savePushSubscription = createServerFn({ method: "POST" }).validator(subInput).handler(savePushSubscription_createServerFn_handler, async ({ data }) => {
	const { saveSub } = await import("./push-send-DvsmPMQ3.mjs");
	return saveSub(data);
});
var removePushSubscription_createServerFn_handler = createServerRpc({
	id: "88daadcad0c6b5d7f6620937b66be98e9129c194d26ab757bdca4d694d46a07e",
	name: "removePushSubscription",
	filename: "src/lib/push.ts"
}, (opts) => removePushSubscription.__executeServer(opts));
var removePushSubscription = createServerFn({ method: "POST" }).validator(object({ endpoint: string().min(8).max(2e3) })).handler(removePushSubscription_createServerFn_handler, async ({ data }) => {
	const { removeSub } = await import("./push-send-DvsmPMQ3.mjs");
	return removeSub(data.endpoint);
});
var runDueAlerts_createServerFn_handler = createServerRpc({
	id: "3d2051cb90a55435d54f5847d45a670477b6c41405b57a4cad07c56b867c46b3",
	name: "runDueAlerts",
	filename: "src/lib/push.ts"
}, (opts) => runDueAlerts.__executeServer(opts));
var runDueAlerts = createServerFn({ method: "POST" }).validator(object({ force: boolean().optional() })).handler(runDueAlerts_createServerFn_handler, async ({ data }) => {
	const { dispatchAlerts } = await import("./push-send-DvsmPMQ3.mjs");
	return dispatchAlerts(Boolean(data.force));
});
var sendAdminNotice_createServerFn_handler = createServerRpc({
	id: "d258fb2db446f6583589f06c6f2b5a7e52784aba518fae400f553c5845fb815d",
	name: "sendAdminNotice",
	filename: "src/lib/push.ts"
}, (opts) => sendAdminNotice.__executeServer(opts));
var sendAdminNotice = createServerFn({ method: "POST" }).validator(object({
	proof: string().max(200),
	title: string().max(80),
	body: string().min(1).max(240)
})).handler(sendAdminNotice_createServerFn_handler, async ({ data }) => {
	if (data.proof !== ADMIN_ACCOUNT.password) return {
		ok: false,
		error: "denied",
		sent: 0,
		devices: 0
	};
	const { sendCustomNotice } = await import("./push-send-DvsmPMQ3.mjs");
	return {
		ok: true,
		...await sendCustomNotice(data.title, data.body)
	};
});
//#endregion
export { getPushPublicKey_createServerFn_handler, removePushSubscription_createServerFn_handler, runDueAlerts_createServerFn_handler, savePushSubscription_createServerFn_handler, sendAdminNotice_createServerFn_handler };
