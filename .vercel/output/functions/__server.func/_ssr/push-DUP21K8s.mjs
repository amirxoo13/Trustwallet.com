import { n as createServerFn } from "./ssr.mjs";
import { o as object, r as boolean, s as string } from "../_libs/zod.mjs";
import { l as createSsrRpc } from "./router-B6P5sC19.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/push-DUP21K8s.js
var subInput = object({
	endpoint: string().min(8).max(2e3),
	keys: object({
		p256dh: string().min(1).max(255),
		auth: string().min(1).max(255)
	})
});
var getPushPublicKey = createServerFn({ method: "GET" }).handler(createSsrRpc("bb83a3388a34406be3a228ce59d18d083e79149f0cd8b08b6c14ed9dfc1c9c3b"));
var savePushSubscription = createServerFn({ method: "POST" }).validator(subInput).handler(createSsrRpc("7e73b1979e547dc226f32cbf3eeb8b22a3851282d4879544abad7e331e9ae7f2"));
var removePushSubscription = createServerFn({ method: "POST" }).validator(object({ endpoint: string().min(8).max(2e3) })).handler(createSsrRpc("88daadcad0c6b5d7f6620937b66be98e9129c194d26ab757bdca4d694d46a07e"));
var runDueAlerts = createServerFn({ method: "POST" }).validator(object({ force: boolean().optional() })).handler(createSsrRpc("3d2051cb90a55435d54f5847d45a670477b6c41405b57a4cad07c56b867c46b3"));
var sendAdminNotice = createServerFn({ method: "POST" }).validator(object({
	proof: string().max(200),
	title: string().max(80),
	body: string().min(1).max(240)
})).handler(createSsrRpc("d258fb2db446f6583589f06c6f2b5a7e52784aba518fae400f553c5845fb815d"));
//#endregion
export { sendAdminNotice as a, savePushSubscription as i, removePushSubscription as n, runDueAlerts as r, getPushPublicKey as t };
