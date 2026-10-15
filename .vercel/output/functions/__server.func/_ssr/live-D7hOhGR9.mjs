import { n as createServerFn } from "./ssr.mjs";
import { t as ADMIN_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { t as createServerRpc } from "./createServerRpc-A6pJPYTF.mjs";
import { a as number, n as array, o as object, s as string, t as _enum } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-D7hOhGR9.js
var eventInput = object({
	kind: _enum([
		"open",
		"tap",
		"action"
	]),
	label: string().min(1).max(600)
});
var pushInput = object({
	sessionId: string().min(4).max(40),
	role: _enum([
		"guest",
		"client",
		"admin"
	]),
	who: string().min(1).max(80),
	path: string().min(1).max(200),
	device: string().min(1).max(40),
	browser: string().max(40).default(""),
	os: string().max(40).default(""),
	viewport: string().max(24).default(""),
	lang: string().max(20).default(""),
	mode: string().max(24).default(""),
	startedAt: number().min(0).max(9e15).default(0),
	pageAt: number().min(0).max(9e15).default(0),
	scenario: string().max(8).default(""),
	email: string().max(80).default(""),
	events: array(eventInput).max(20)
});
var pushLive_createServerFn_handler = createServerRpc({
	id: "688c0e3af0c7303246e9b191db7eaa9de817b0331cc83a042f6d8af51927109e",
	name: "pushLive",
	filename: "src/lib/live.ts"
}, (opts) => pushLive.__executeServer(opts));
var pushLive = createServerFn({ method: "POST" }).validator(pushInput).handler(pushLive_createServerFn_handler, async ({ data }) => {
	const { writeLive } = await import("./live-send-CvM5DtFF.mjs");
	return writeLive(data);
});
var loadLive_createServerFn_handler = createServerRpc({
	id: "6c4641be08904b21c4612714c98ee50a0e780f6ce071fb8b854fa3aa54ed7434",
	name: "loadLive",
	filename: "src/lib/live.ts"
}, (opts) => loadLive.__executeServer(opts));
var loadLive = createServerFn({ method: "POST" }).validator(object({ proof: string().max(200) })).handler(loadLive_createServerFn_handler, async ({ data }) => {
	if (data.proof !== ADMIN_ACCOUNT.password) return {
		ok: false,
		error: "denied",
		now: Date.now(),
		online: [],
		recent: [],
		events: [],
		hour: {
			actions: 0,
			opens: 0,
			taps: 0,
			sessions: 0
		}
	};
	const { readLive } = await import("./live-send-CvM5DtFF.mjs");
	return readLive();
});
//#endregion
export { loadLive_createServerFn_handler, pushLive_createServerFn_handler };
