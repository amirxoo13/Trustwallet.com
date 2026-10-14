//#region node_modules/.nitro/vite/services/ssr/assets/format-DuRhJ10K.js
var usd = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 2
});
var usdFine = new Intl.NumberFormat("en-US", {
	style: "currency",
	currency: "USD",
	maximumFractionDigits: 6
});
function formatUsd(value, fine = false) {
	if (!Number.isFinite(value)) return "$0.00";
	if (fine && Math.abs(value) < 1) return usdFine.format(value);
	if (Math.abs(value) >= 0xe8d4a51000) return `$${(value / 0xe8d4a51000).toFixed(2)}T`;
	if (Math.abs(value) >= 1e9) return `$${(value / 1e9).toFixed(2)}B`;
	if (Math.abs(value) >= 1e6) return `$${(value / 1e6).toFixed(2)}M`;
	return usd.format(value);
}
function formatUsdFull(value) {
	if (!Number.isFinite(value)) return "$0.00";
	if (Math.abs(value) < .01 && value !== 0) return usdFine.format(value);
	return usd.format(value);
}
function formatAmount(value, max = 8) {
	if (!Number.isFinite(value)) return "0";
	if (value === 0) return "0";
	if (Math.abs(value) >= 1e3) return value.toLocaleString("en-US", { maximumFractionDigits: 4 });
	return value.toFixed(max).replace(/\.?0+$/, "");
}
function formatDuration(ms) {
	const total = Math.max(0, Math.floor(ms / 1e3));
	const days = Math.floor(total / 86400);
	const hours = Math.floor(total % 86400 / 3600);
	const minutes = Math.floor(total % 3600 / 60);
	const seconds = total % 60;
	const pad = (n) => String(n).padStart(2, "0");
	return `${days}d ${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
}
function formatPct(value) {
	if (!Number.isFinite(value)) return "0.00%";
	return `${value > 0 ? "+" : ""}${value.toFixed(2)}%`;
}
function shortAddress(address, left = 6, right = 4) {
	if (address.length <= left + right + 3) return address;
	return `${address.slice(0, left)}…${address.slice(-right)}`;
}
function formatTime(ts) {
	return new Date(ts).toLocaleString(void 0, {
		month: "short",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function randomHex(bytes) {
	const arr = new Uint8Array(bytes);
	crypto.getRandomValues(arr);
	return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
}
function randomBase58(length) {
	const alphabet = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
	const arr = new Uint8Array(length);
	crypto.getRandomValues(arr);
	let out = "";
	for (const n of arr) out += alphabet[n % 58];
	return out;
}
//#endregion
export { formatUsd as a, randomHex as c, formatTime as i, shortAddress as l, formatDuration as n, formatUsdFull as o, formatPct as r, randomBase58 as s, formatAmount as t };
