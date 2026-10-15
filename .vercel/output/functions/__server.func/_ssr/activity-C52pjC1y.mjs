import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as formatTime, n as formatDuration, o as formatUsdFull, t as formatAmount } from "./format-DuRhJ10K.mjs";
import { r as cn } from "./logo-BVDERzqx.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { B as ArrowDownLeft, I as ArrowUpRight, R as ArrowLeftRight, _ as Plus } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-Bausdpod.mjs";
import { v as useWallet } from "./router-BULegCzg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity-C52pjC1y.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	send: ArrowUpRight,
	receive: ArrowDownLeft,
	swap: ArrowLeftRight,
	buy: Plus
};
function WalletActivityScreen() {
	const txs = useWallet((s) => s.transactions);
	const copy = t();
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: copy.wallet.activity,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-semibold",
					children: copy.wallet.activity
				}),
				txs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-16 text-center text-sm text-muted",
					children: copy.wallet.historyEmpty
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 divide-y divide-border",
					children: txs.map((tx) => {
						const Icon = icons[tx.type];
						const positive = tx.type === "receive" || tx.type === "buy";
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start gap-3 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-10 items-center justify-center rounded-full bg-card-elevated",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0 flex-1",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "capitalize",
											children: tx.type
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: cn("tabular", positive ? "text-success" : "text-foreground"),
											children: [
												positive ? "+" : "−",
												formatAmount(tx.amount),
												" ",
												tx.symbol
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-1 flex items-center justify-between text-xs text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatTime(tx.timestamp) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUsdFull(tx.usdValue) })]
									}),
									tx.type === "swap" && tx.toSymbol ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: [
											"→ ",
											formatAmount(tx.toAmount ?? 0, 6),
											" ",
											tx.toSymbol,
											tx.status === "pending" && tx.settlesAt ? ` · Pending ${formatDuration(tx.settlesAt - now)}` : tx.status === "failed" ? " · Cancelled" : ""
										]
									}) : null,
									tx.status === "pending" && tx.settlesAt && tx.type !== "swap" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: ["Pending · ", formatDuration(Math.max(0, tx.settlesAt - now))]
									}) : null,
									tx.type === "receive" && tx.fromAddress ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 font-mono text-[11px] break-all text-muted",
										children: ["From ", tx.fromAddress]
									}) : tx.toAddress ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-[11px] break-all text-muted",
										children: tx.toAddress
									}) : null,
									tx.fee ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-[11px] text-muted",
										children: [
											"Fee ",
											formatAmount(tx.fee),
											" ",
											tx.feeSymbol || tx.symbol
										]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 break-all font-mono text-[10px] text-muted",
										children: tx.hash
									})
								]
							})]
						}, tx.id);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-8 text-center text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/wallet",
						className: "text-muted hover:text-foreground",
						children: ["← ", copy.wallet.home]
					})
				})
			]
		})
	});
}
var SplitComponent = WalletActivityScreen;
//#endregion
export { SplitComponent as component };
