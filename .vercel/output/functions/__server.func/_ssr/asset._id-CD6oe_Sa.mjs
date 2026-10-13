import { o as __toESM } from "../_runtime.mjs";
import { c as usdPrice, s as getCoin } from "./auth-config-CmLBU8rx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-fUdwjYeW.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { R as ArrowDownLeft } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-B853SSJ4.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as useWallet, d as formatPct, g as holdingAmount, l as formatAmount, m as formatUsdFull, n as Route, p as formatUsd } from "./router-BsfzO6fi.mjs";
import { t as Button } from "./button-npk6vMbG.mjs";
import { t as CoinIcon } from "./coin-icon-CuBLUK_9.mjs";
import { r as fetchCoinMarket } from "./prices-BvAkPWEU.mjs";
import { n as useMarketMap, t as useChart } from "./use-markets-TxqhgRCg.mjs";
import { a as ResponsiveContainer, i as Area, n as YAxis, o as Tooltip, r as XAxis, t as AreaChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/asset._id-CD6oe_Sa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PriceChart({ data, positive }) {
	const stroke = positive ? "var(--color-success)" : "var(--color-danger)";
	const rows = data.map((d) => ({
		t: d.t,
		p: d.p
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "h-56 w-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
			width: "100%",
			height: "100%",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
				data: rows,
				margin: {
					top: 8,
					right: 0,
					left: 0,
					bottom: 0
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
						id: "px",
						x1: "0",
						y1: "0",
						x2: "0",
						y2: "1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "0%",
							stopColor: stroke,
							stopOpacity: .28
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
							offset: "100%",
							stopColor: stroke,
							stopOpacity: 0
						})]
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
						dataKey: "t",
						hide: true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
						dataKey: "p",
						hide: true,
						domain: ["auto", "auto"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { content: ({ active, payload }) => {
						if (!active || !payload?.[0]) return null;
						const row = payload[0].payload;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-md bg-card-elevated px-3 py-2 text-xs shadow-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "tabular font-medium",
								children: formatUsdFull(row.p)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-0.5 text-muted",
								children: new Date(row.t).toLocaleString()
							})]
						});
					} }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						type: "monotone",
						dataKey: "p",
						stroke,
						strokeWidth: 2,
						fill: "url(#px)"
					})
				]
			})
		})
	});
}
function WalletAssetScreen({ id }) {
	const holdings = useWallet((s) => s.holdings);
	const copy = t();
	const coin = getCoin(id);
	const listed = useMarketMap()[id];
	const extra = useQuery({
		queryKey: ["coin-market", id],
		queryFn: () => fetchCoinMarket(id),
		enabled: !listed,
		staleTime: 6e4
	});
	const market = listed ?? extra.data ?? void 0;
	const [days, setDays] = (0, import_react.useState)(7);
	const chart = useChart(id, days);
	const amount = holdingAmount(holdings, id);
	const price = usdPrice(id, market?.price);
	const usd = amount * price;
	const up = (market?.change24h ?? 0) >= 0;
	const points = chart.data ?? [];
	const chartUp = points.length >= 2 ? points[points.length - 1].p >= points[0].p : up;
	if (!coin && extra.isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: "Asset",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mx-auto max-w-xl px-4 py-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-xl bg-card" })
		})
	});
	if (!coin && !market) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: "Asset",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "p-8 text-sm text-muted",
			children: "This asset is not on the market feed."
		})
	});
	if (!coin && market) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: market.symbol,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
						id: market.id,
						symbol: market.symbol,
						image: market.image,
						size: 48
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold",
						children: market.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: market.symbol
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-3xl font-semibold tabular",
					children: formatUsdFull(market.price)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 text-sm tabular", up ? "text-success" : "text-danger"),
					children: formatPct(market.change24h)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: chart.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56 animate-pulse rounded-xl bg-card" }) : points.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, {
						data: points,
						positive: chartUp
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: "No chart data."
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 grid grid-cols-2 gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card p-4 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: copy.markets.cap
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 tabular",
							children: formatUsd(market.marketCap)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card p-4 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: copy.markets.vol
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 tabular",
							children: formatUsd(market.volume24h)
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-sm text-muted",
					children: "Live market data. This token is not in the wallet, so it cannot be sent from here."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "solid",
					className: "mt-4 w-full",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/wallet/swap",
						children: "Swap"
					})
				})
			]
		})
	});
	if (!coin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: coin.symbol,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
						id: coin.id,
						symbol: coin.symbol,
						image: market?.image,
						size: 48
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold",
						children: coin.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: coin.chainName
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 font-display text-3xl font-semibold tabular",
					children: price ? formatUsdFull(price) : "—"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1 text-sm tabular", up ? "text-success" : "text-danger"),
					children: formatPct(market?.change24h ?? 0)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [chart.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-56 animate-pulse rounded-xl bg-card" }) : points.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriceChart, {
						data: points,
						positive: chartUp
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: "No chart data."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex gap-2",
						children: [
							{
								d: 1,
								l: copy.asset.d1
							},
							{
								d: 7,
								l: copy.asset.d7
							},
							{
								d: 30,
								l: copy.asset.d30
							},
							{
								d: 90,
								l: copy.asset.d90
							}
						].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setDays(x.d),
							className: cn("h-9 rounded-full px-3 text-xs shadow-border", days === x.d && "bg-card text-foreground", days !== x.d && "text-muted"),
							children: x.l
						}, x.d))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 rounded-xl bg-card p-4 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: copy.asset.hold
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-lg font-medium tabular",
							children: [
								formatAmount(amount),
								" ",
								coin.symbol
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted",
							children: formatUsdFull(usd)
						})
					]
				}),
				market ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-6 grid grid-cols-2 gap-3 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card p-4 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: copy.markets.cap
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 tabular",
							children: formatUsd(market.marketCap)
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card p-4 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-xs text-muted",
							children: copy.markets.vol
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-1 tabular",
							children: formatUsd(market.volume24h)
						})]
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "solid",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wallet/send",
							children: copy.wallet.send
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/wallet/receive",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDownLeft, { className: "size-4" }), copy.wallet.receive]
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/wallet",
						className: "text-sm text-muted hover:text-foreground",
						children: ["← ", copy.wallet.home]
					})
				})
			]
		})
	});
}
function AssetPage() {
	const { id } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletAssetScreen, { id });
}
//#endregion
export { AssetPage as component };
