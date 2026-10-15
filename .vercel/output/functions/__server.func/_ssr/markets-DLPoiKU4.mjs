import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as formatUsd, r as formatPct } from "./format-DuRhJ10K.mjs";
import { i as getCoin } from "./coins-Kac_SJvS.mjs";
import { r as cn } from "./logo-B62MTmeK.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { t as CoinIcon } from "./coin-icon-C4QmQwF8.mjs";
import { r as useMarkets } from "./use-markets-BrK58dAT.mjs";
import { t as MarketingShell } from "./marketing-shell-CTVHMlh8.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/markets-DLPoiKU4.js
var import_jsx_runtime = require_jsx_runtime();
function MarketsScreen({ embedded = false }) {
	const copy = t();
	const q = useMarkets();
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: embedded ? "px-4 py-6 md:px-8" : "mx-auto max-w-6xl px-4 py-12",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-3xl font-semibold tracking-tight",
					children: copy.markets.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted",
					children: copy.markets.sub
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-primary",
					children: q.isFetching ? "…" : copy.markets.live
				})]
			}),
			q.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: copy.markets.error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 overflow-hidden rounded-xl bg-card shadow-border",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden grid-cols-[1.4fr_1fr_1fr_1fr] gap-3 border-b border-border px-4 py-3 text-xs text-muted sm:grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Asset" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-end",
								children: copy.markets.price
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-end",
								children: copy.markets.change
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-end",
								children: copy.markets.cap
							})
						]
					}),
					(q.data ?? []).map((m) => {
						const up = m.change24h >= 0;
						const meta = getCoin(m.id);
						const name = m.id === "tether" ? meta?.name ?? "Tether TRC20" : m.name;
						const symbol = m.id === "tether" ? "USDT · TRC20" : m.symbol;
						const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-3 sm:grid-cols-[1.4fr_1fr_1fr_1fr]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
										id: m.id,
										symbol: m.symbol,
										image: m.image
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: symbol
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-end text-sm tabular",
									children: formatUsd(m.price, true)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: cn("hidden text-end text-sm tabular sm:block", up ? "text-success" : "text-danger"),
									children: formatPct(m.change24h)
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "hidden text-end text-sm text-muted tabular sm:block",
									children: formatUsd(m.marketCap)
								})
							]
						});
						return embedded ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wallet/asset/$id",
							params: { id: m.id },
							className: "block border-b border-border last:border-b-0 hover:bg-card-elevated",
							children: inner
						}, m.id) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "border-b border-border last:border-b-0",
							children: inner
						}, m.id);
					}),
					q.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "space-y-3 p-4",
						children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-12 animate-pulse rounded-md bg-card-elevated" }, i))
					}) : null
				]
			})
		]
	});
	if (embedded) return body;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: body });
}
var SplitComponent = MarketsScreen;
//#endregion
export { SplitComponent as component };
