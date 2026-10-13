import { o as __toESM } from "../_runtime.mjs";
import { c as usdPrice, i as COIN_BY_ID } from "./auth-config-CmLBU8rx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-fUdwjYeW.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Eye, L as ArrowDown, N as ArrowUpRight, O as ChevronRight, S as History, f as Scan, g as Plus, h as RefreshCw, n as Wallet, r as UserRound, s as SlidersHorizontal, t as X, u as Settings, v as LogOut, w as EyeOff } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-B853SSJ4.mjs";
import { b as useWallet, h as hasAdminProof, l as formatAmount, m as formatUsdFull, y as useSite } from "./router-BsfzO6fi.mjs";
import { t as CoinIcon } from "./coin-icon-CuBLUK_9.mjs";
import { n as useMarketMap, r as useMarkets } from "./use-markets-TxqhgRCg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-CgUDlQ7x.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function rowTitle(id, name) {
	if (id === "tether") return "Tether USDT";
	if (id === "tron") return "Tron";
	return name;
}
function formatMove(value) {
	if (!Number.isFinite(value) || Math.abs(value) < 1e-6) return {
		text: "$0.00",
		tone: "flat"
	};
	const abs = Math.abs(value);
	const digits = abs >= 1 ? 2 : abs >= .01 ? 4 : 6;
	const body = abs.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 2,
		maximumFractionDigits: digits
	});
	return {
		text: `${value > 0 ? "+" : "-"}${body}`,
		tone: value > 0 ? "up" : "down"
	};
}
function formatHeaderMove(usd, pct) {
	return `${Math.abs(usd) < .005 ? "$0.00" : `${usd < 0 ? "-" : ""}${formatUsdFull(Math.abs(usd))}`} (${`${pct < 0 ? "-" : ""}${Math.abs(pct).toFixed(2)}%`})`;
}
function WalletHomeScreen() {
	const holdings = useWallet((s) => s.holdings);
	const hide = useWallet((s) => s.hideBalances);
	const toggle = useWallet((s) => s.toggleHideBalances);
	const role = useWallet((s) => s.role);
	const logout = useWallet((s) => s.logout);
	const site = useSite();
	const navigate = useNavigate();
	const copy = t();
	const markets = useMarketMap();
	const q = useMarkets();
	const [qtext, setQtext] = (0, import_react.useState)("");
	const [banner, setBanner] = (0, import_react.useState)(true);
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const findRef = (0, import_react.useRef)(null);
	const walletLabel = site.walletName.trim() === "Main Wallet" ? "Main Wallet 1" : site.walletName;
	(0, import_react.useEffect)(() => {
		function open() {
			setSearchOpen(true);
			setShowAll(true);
			queueMicrotask(() => findRef.current?.focus());
		}
		if (sessionStorage.getItem("aurex-open-find") === "1") {
			sessionStorage.removeItem("aurex-open-find");
			open();
		}
		window.addEventListener("aurex-find", open);
		return () => window.removeEventListener("aurex-find", open);
	}, []);
	const rows = (0, import_react.useMemo)(() => {
		const list = holdings.map((h) => {
			const meta = COIN_BY_ID[h.id];
			const m = markets[h.id];
			const price = usdPrice(h.id, m?.price);
			const usd = h.amount * price;
			const change = m?.change24h ?? 0;
			return {
				...h,
				meta,
				price,
				usd,
				change,
				delta: h.amount === 0 ? 0 : usd * change / 100,
				image: m?.image ?? meta?.image
			};
		}).filter((r) => r.meta);
		const rankOf = (id) => {
			const rank = markets[id]?.rank;
			return rank && rank > 0 ? rank : 1e5;
		};
		const bucket = (id, amount) => {
			if (id === "bitcoin") return 0;
			if (id === "ethereum") return 1;
			return amount > 1e-12 ? 2 : 3;
		};
		return list.sort((a, b) => {
			const byPin = bucket(a.id, a.amount) - bucket(b.id, b.amount);
			if (byPin !== 0) return byPin;
			const byMarket = rankOf(a.id) - rankOf(b.id);
			if (byMarket !== 0) return byMarket;
			return b.usd - a.usd || a.meta.symbol.localeCompare(b.meta.symbol);
		});
	}, [holdings, markets]);
	const total = rows.reduce((s, r) => s + r.usd, 0);
	const changeUsd = rows.reduce((s, r) => s + r.delta, 0);
	const base = total - changeUsd;
	const changePct = base !== 0 ? changeUsd / base * 100 : 0;
	const query = qtext.trim().toLowerCase();
	const filtered = query ? rows.filter((r) => r.meta.name.toLowerCase().includes(query) || r.meta.symbol.toLowerCase().includes(query)) : rows;
	const visible = query || showAll ? filtered : filtered.slice(0, 4);
	const actions = [
		{
			to: "/wallet/send",
			icon: ArrowUpRight,
			label: site.actionSend,
			hot: false
		},
		{
			to: "/wallet/receive",
			icon: ArrowDown,
			label: site.actionReceive,
			hot: false
		},
		{
			to: "/wallet/swap",
			icon: RefreshCw,
			label: site.tabSwap,
			hot: true
		},
		{
			to: "/wallet/buy",
			icon: Plus,
			label: site.actionBuy,
			hot: false
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		home: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md px-5 pt-3 pb-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setMenu((v) => !v),
							className: "flex h-12 max-w-full items-center gap-2 rounded-full bg-card-elevated ps-1.5 pe-4 shadow-border",
							"aria-expanded": menu,
							"aria-label": walletLabel,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-primary text-primary-fg",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
									className: "size-4",
									strokeWidth: 2.2
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate text-sm font-semibold",
								children: walletLabel
							})]
						}), menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "fixed inset-0 z-40 cursor-default",
							"aria-label": "Close menu",
							onClick: () => setMenu(false)
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "absolute top-14 left-0 z-50 w-56 rounded-xl bg-card p-1.5 shadow-float shadow-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/wallet/profile",
									onClick: () => setMenu(false),
									className: "flex h-11 items-center gap-2 rounded-lg px-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { className: "size-4 text-muted" }), site.tabProfile]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/wallet/settings",
									onClick: () => setMenu(false),
									className: "flex h-11 items-center gap-2 rounded-lg px-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-4 text-muted" }), copy.wallet.settings]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: toggle,
									className: "flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm",
									children: [hide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4 text-muted" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4 text-muted" }), hide ? copy.wallet.show : copy.wallet.hide]
								}),
								role === "admin" && hasAdminProof() ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/studio",
									onClick: () => setMenu(false),
									className: "flex h-11 items-center gap-2 rounded-lg px-3 text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4 text-muted" }), "Control panel"]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "flex h-11 w-full items-center gap-2 rounded-lg px-3 text-sm text-danger",
									onClick: () => {
										logout();
										navigate({ to: "/" });
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), copy.wallet.logout]
								})
							]
						})] }) : null]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex shrink-0 items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wallet/activity",
							"aria-label": copy.wallet.activity,
							className: "flex size-12 items-center justify-center rounded-full bg-card-elevated shadow-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
								className: "size-5",
								strokeWidth: 1.75
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wallet/receive",
							"aria-label": site.actionReceive,
							className: "flex size-12 items-center justify-center rounded-full bg-card-elevated shadow-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, {
								className: "size-5",
								strokeWidth: 1.75
							})
						})]
					})]
				}),
				banner ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 flex items-center gap-3 rounded-xl px-3 py-2.5 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-7 w-1 shrink-0 rounded-full bg-foreground/25" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 shrink-0 items-center justify-center rounded-lg bg-promo text-promo-fg",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PromoLeaf, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-sm font-semibold",
								children: "Robinhood Stock Tokens Campaign"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "truncate text-xs text-muted",
								children: "200 winners. $50K USDG rewards. Enter now"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setBanner(false),
							"aria-label": "Dismiss",
							className: "flex size-11 shrink-0 items-center justify-center text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
						})
					]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 text-5xl leading-none font-bold tracking-tight tabular",
					children: hide ? "••••••" : q.isLoading && total === 0 ? "—" : formatUsdFull(total)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-base text-muted tabular",
					children: hide ? "" : formatHeaderMove(changeUsd, changePct)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid grid-cols-4 gap-3",
					children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: a.to,
						className: "flex flex-col items-center gap-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("flex aspect-square w-full items-center justify-center rounded-xl", a.hot ? "bg-primary text-primary-fg" : "bg-card-elevated text-foreground"),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, {
								className: "size-6",
								strokeWidth: 2.15
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm font-medium",
							children: a.label
						})]
					}, a.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowAll((v) => !v),
					className: "mt-6 flex items-center gap-1 text-lg font-semibold",
					children: ["Tokens", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })]
				}),
				searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					ref: findRef,
					value: qtext,
					onChange: (e) => setQtext(e.target.value),
					placeholder: copy.wallet.search,
					className: "mt-3 h-11 w-full rounded-full bg-card-elevated px-4 text-sm shadow-border outline-none placeholder:text-muted"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3",
					children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: copy.wallet.empty
					}) : visible.map((r) => {
						const move = formatMove(r.delta);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/wallet/asset/$id",
							params: { id: r.id },
							className: "flex items-center gap-4 py-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: r.id,
									symbol: r.meta.symbol,
									image: r.image,
									size: 44
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-semibold",
										children: rowTitle(r.id, r.meta.name)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-sm text-muted tabular",
										children: [
											hide ? "••" : formatAmount(r.amount),
											" ",
											r.meta.symbol
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-end",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-semibold tabular",
										children: hide ? "••" : formatUsdFull(r.usd)
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: cn("text-sm tabular", move.tone === "up" && "text-success", move.tone === "down" && "text-danger", move.tone === "flat" && "text-muted"),
										children: hide ? "" : move.text
									})]
								})
							]
						}, r.id);
					})
				}),
				!query && !showAll && filtered.length > 4 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setShowAll(true),
					className: "mt-2 inline-flex h-12 items-center gap-2 rounded-full bg-card-elevated px-5 text-base font-medium",
					children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
				}) : null
			]
		})
	});
}
function PromoLeaf() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-6",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M5.2 16.2C6.2 9.4 11.4 4.8 19.6 4c.4 7.2-2.2 12.4-8.2 14.2-2.4.7-4.8.2-6.2-2Zm3.6-.2c2.2-1.6 4.6-2.6 7.6-3.1-1.5 2-3.4 3.3-5.8 3.8-1 .2-1.6-.1-1.8-.7Z"
		})
	});
}
var SplitComponent = WalletHomeScreen;
//#endregion
export { SplitComponent as component };
