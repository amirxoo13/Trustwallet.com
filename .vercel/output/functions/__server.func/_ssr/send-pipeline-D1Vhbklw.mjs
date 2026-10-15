//#region node_modules/.nitro/vite/services/ssr/assets/send-pipeline-D1Vhbklw.js
/** Wall-clock length of a real send. Each step does one part of the transfer. */
var SEND_PIPELINE_MS = 21e3;
var SEND_STEPS = [
	"Checking the destination",
	"Calculating the network fee",
	"Reserving the amount and fee",
	"Signing the transfer",
	"Broadcasting to the network",
	"Confirming on the network",
	"Delivering to the recipient"
];
var notified = /* @__PURE__ */ new Set();
function claimNotice(hash) {
	if (!hash || notified.has(hash)) return false;
	notified.add(hash);
	return true;
}
function sendStepIndex(started, ends, now) {
	if (!started || !ends || ends <= started) return 0;
	if (now >= ends) return SEND_STEPS.length;
	const ratio = (now - started) / (ends - started);
	return Math.min(SEND_STEPS.length - 1, Math.floor(ratio * SEND_STEPS.length));
}
//#endregion
export { sendStepIndex as i, SEND_STEPS as n, claimNotice as r, SEND_PIPELINE_MS as t };
