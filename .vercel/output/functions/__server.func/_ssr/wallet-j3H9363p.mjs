import { o as __toESM } from "../_runtime.mjs";
import { a as formatUsd, o as formatUsdFull, r as formatPct, t as formatAmount } from "./format-DuRhJ10K.mjs";
import { n as COIN_BY_ID, o as usdPrice, t as COINS } from "./coins-Kac_SJvS.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-zPchK5wD.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as ArrowDown, D as DollarSign, E as EyeOff, I as ArrowUpRight, T as Eye, _ as Plus, c as SlidersHorizontal, d as Settings, g as RefreshCw, j as ChevronRight, n as Wallet, p as Scan, r as UserRound, s as Sparkles, w as History, x as Info, y as LogOut } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-DUOd2QiC.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { m as useWallet, p as useSite, u as hasAdminProof } from "./router-C3pfGoyi.mjs";
import { t as CoinIcon } from "./coin-icon-DTtCkdcR.mjs";
import { n as useMarketMap, r as useMarkets } from "./use-markets-BrK58dAT.mjs";
import { t as loadPerpMarkets } from "./perps-feed-DonpCXk-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-j3H9363p.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var WATCH_KEY = "trust-home-watch";
var DEFAULT_WATCH = [
	"solana",
	"binancecoin",
	"bitcoin",
	"ethereum"
];
function rowTitle(id, name) {
	if (id === "tether") return "Tether USDT";
	if (id === "tron") return "Tron";
	return name;
}
function readWatch() {
	try {
		const raw = JSON.parse(localStorage.getItem(WATCH_KEY) || "null");
		const ids = Array.isArray(raw) ? raw.filter((id) => typeof id === "string" && Boolean(COIN_BY_ID[id])) : [];
		return ids.length ? ids : DEFAULT_WATCH;
	} catch {
		return DEFAULT_WATCH;
	}
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
	const perps = useQuery({
		queryKey: ["home-perps"],
		queryFn: () => loadPerpMarkets(),
		staleTime: 3e4
	});
	const [qtext, setQtext] = (0, import_react.useState)("");
	const [showAll, setShowAll] = (0, import_react.useState)(false);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [askOpen, setAskOpen] = (0, import_react.useState)(false);
	const [question, setQuestion] = (0, import_react.useState)("");
	const [answer, setAnswer] = (0, import_react.useState)("");
	const [watch, setWatch] = (0, import_react.useState)(DEFAULT_WATCH);
	const [editingWatch, setEditingWatch] = (0, import_react.useState)(false);
	const findRef = (0, import_react.useRef)(null);
	const walletLabel = site.walletName.trim() === "Main Wallet" ? "Main Wallet 1" : site.walletName;
	(0, import_react.useEffect)(() => {
		setWatch(readWatch());
	}, []);
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
		const pin = (id) => id === "bitcoin" ? 0 : id === "ethereum" ? 1 : 2;
		return list.sort((a, b) => {
			const aHeld = a.amount > 1e-12 ? 0 : 1;
			const bHeld = b.amount > 1e-12 ? 0 : 1;
			if (aHeld !== bHeld) return aHeld - bHeld;
			if (aHeld === 0 && b.usd !== a.usd) return b.usd - a.usd;
			const byPin = pin(a.id) - pin(b.id);
			if (byPin !== 0) return byPin;
			return a.meta.symbol.localeCompare(b.meta.symbol);
		});
	}, [holdings, markets]);
	const total = rows.reduce((s, r) => s + r.usd, 0);
	const changeUsd = rows.reduce((s, r) => s + r.delta, 0);
	const base = total - changeUsd;
	const changePct = base !== 0 ? changeUsd / base * 100 : 0;
	const query = qtext.trim().toLowerCase();
	const filtered = query ? rows.filter((r) => r.meta.name.toLowerCase().includes(query) || r.meta.symbol.toLowerCase().includes(query)) : rows;
	const visible = query || showAll ? filtered : filtered.slice(0, 4);
	const balanceText = hide ? "••••" : q.isLoading && total === 0 ? "—" : formatUsdFull(total);
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
	function ask() {
		const s = question.trim().toLowerCase();
		if (!s) {
			setAnswer("Ask about your balance, a token, swap fees, or perps.");
			return;
		}
		if (s.includes("balance") || s.includes("total") || s.includes("worth") || s.includes("wallet")) {
			setAnswer(`${walletLabel} is worth ${formatUsdFull(total)}. 24h change ${formatHeaderMove(changeUsd, changePct)}.`);
			return;
		}
		const hit = rows.find((r) => s.includes(r.meta.symbol.toLowerCase()) || s.includes(r.meta.name.toLowerCase()));
		if (hit) {
			setAnswer(`${rowTitle(hit.id, hit.meta.name)}: ${formatAmount(hit.amount)} ${hit.meta.symbol} · ${formatUsdFull(hit.usd)}. Price ${formatUsd(hit.price, true)}. 24h ${formatPct(hit.change)}.`);
			return;
		}
		if (s.includes("fee") || s.includes("swap")) {
			setAnswer("Swap fee is 0.3%. Stablecoins on the same chain are 0%. Ethereum to Bitcoin settles after 21 real days.");
			return;
		}
		if (s.includes("send")) {
			setAnswer("Open Send, choose the asset, paste the destination address, then confirm.");
			return;
		}
		if (s.includes("perp") || s.includes("long") || s.includes("short")) {
			setAnswer("Perps uses USDT margin from this wallet. Deposit, then long or short at the live mark price.");
			return;
		}
		setAnswer(`Total is ${formatUsdFull(total)}. Ask for a coin symbol, swap fees, send, or perps.`);
	}
	function toggleWatch(id) {
		setWatch((prev) => {
			const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
			const saved = next.length ? next : DEFAULT_WATCH;
			localStorage.setItem(WATCH_KEY, JSON.stringify(saved));
			return saved;
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WalletShell, {
		home: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-md overflow-x-clip px-4 pt-3 pb-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setMenu((v) => !v),
								className: "flex h-11 max-w-full items-center gap-2 rounded-full bg-[#1a1d24] ps-1 pe-3.5",
								"aria-expanded": menu,
								"aria-label": `${walletLabel} ${balanceText}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-8 shrink-0 items-center justify-center rounded-full bg-[#ff5d5d] text-white",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {
										className: "size-4",
										strokeWidth: 2.2
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm font-semibold tabular",
									children: balanceText
								})]
							}), menu ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "fixed inset-0 z-40 cursor-default",
								"aria-label": "Close menu",
								onClick: () => setMenu(false)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute top-12 left-0 z-50 w-56 rounded-xl bg-card p-1.5 shadow-float shadow-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "px-3 py-2 text-sm font-semibold",
										children: walletLabel
									}),
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
								className: "flex size-11 items-center justify-center rounded-full bg-[#1a1d24]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, {
									className: "size-5",
									strokeWidth: 1.75
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/wallet/receive",
								"aria-label": site.actionReceive,
								className: "flex size-11 items-center justify-center rounded-full bg-[#1a1d24]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scan, {
									className: "size-5",
									strokeWidth: 1.75
								})
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/wallet/swap",
						className: "mt-4 flex items-center gap-3 rounded-2xl border border-white/10 px-3 py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, { className: "size-4 shrink-0 text-muted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "flex size-9 shrink-0 items-center justify-center rounded-full bg-[#143226] text-success",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DollarSign, { className: "size-4" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-semibold",
									children: "0% swap fees on selected stables"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-muted",
									children: "Applicable to same-chain swaps only"
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-full overflow-hidden text-[clamp(2.1rem,11vw,2.8rem)] leading-none font-bold tracking-tight text-ellipsis tabular",
						children: balanceText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 max-w-full truncate text-base text-muted tabular",
						children: hide ? "" : formatHeaderMove(changeUsd, changePct)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 grid grid-cols-4 gap-2.5",
						children: actions.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: a.to,
							className: "flex min-w-0 flex-col items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: cn("flex aspect-square w-full items-center justify-center rounded-2xl", a.hot ? "bg-[#5b57f5] text-white" : "bg-[#1a1d24] text-foreground"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, {
									className: "size-6",
									strokeWidth: 2.1
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "max-w-full truncate text-sm",
								children: a.label
							})]
						}, a.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setShowAll((v) => !v),
						className: "mt-7 flex items-center gap-1 text-lg font-semibold",
						children: ["Tokens", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })]
					}),
					searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: findRef,
						value: qtext,
						onChange: (e) => setQtext(e.target.value),
						placeholder: copy.wallet.search,
						className: "mt-3 h-11 w-full rounded-full bg-[#1a1d24] px-4 text-sm outline-none placeholder:text-muted"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2",
						children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-10 text-center text-sm text-muted",
							children: copy.wallet.empty
						}) : visible.map((r) => {
							const move = formatMove(r.delta);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/wallet/asset/$id",
								params: { id: r.id },
								className: "flex min-w-0 items-center gap-3 py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
										id: r.id,
										symbol: r.meta.symbol,
										image: r.image,
										size: 42
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate font-semibold",
											children: rowTitle(r.id, r.meta.name)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-sm text-muted tabular",
											children: [
												hide ? "••" : formatAmount(r.amount),
												" ",
												r.meta.symbol
											]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "shrink-0 text-end",
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
						className: "mt-2 inline-flex h-11 items-center gap-1 rounded-full bg-[#1a1d24] px-4 text-sm font-medium",
						children: ["View all", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/wallet/perps",
						className: "mt-8 flex items-center gap-1 text-lg font-semibold",
						children: ["Perps", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "scroll-x mt-3 flex gap-3 pb-1",
						children: (perps.data ?? []).slice(0, 8).map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/wallet/perps",
							className: "w-[9.25rem] shrink-0 rounded-2xl bg-[#1a1d24] p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									symbol: m.symbol,
									size: 36
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-3 flex items-center gap-1.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-semibold",
										children: m.symbol
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "rounded-full bg-black/30 px-1.5 py-0.5 text-[11px] text-muted",
										children: [m.maxLeverage, "x"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted",
									children: [formatUsd(m.volume), " Vol"]
								})
							]
						}, m.coin))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAskOpen(true),
						className: "mt-4 flex w-full items-center gap-3 rounded-2xl bg-[#1a1d24] p-2 pe-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex min-w-0 flex-1 items-center gap-2 px-2 text-sm font-semibold",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "truncate",
								children: "Trust Wallet AI"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex h-10 shrink-0 items-center gap-1 rounded-full bg-[#12141a] px-4 text-sm",
							children: ["Ask anything", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-4" })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex items-center justify-between",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setEditingWatch(true),
							className: "flex items-center gap-1 text-lg font-semibold",
							children: ["Watchlist", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1",
						children: watch.map((id) => {
							const meta = COIN_BY_ID[id];
							const m = markets[id];
							if (!meta) return null;
							const price = usdPrice(id, m?.price);
							const up = (m?.change24h ?? 0) >= 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/wallet/asset/$id",
								params: { id },
								className: "flex min-w-0 items-center gap-3 py-2.5",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
										id,
										symbol: meta.symbol,
										image: m?.image ?? meta.image,
										size: 40
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-semibold",
											children: meta.symbol
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm text-muted",
											children: m?.marketCap ? `${formatUsd(m.marketCap)} MCap` : "Live price"
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "shrink-0 text-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block font-semibold tabular",
											children: formatUsd(price, true)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-sm tabular", up ? "text-success" : "text-danger"),
											children: formatPct(m?.change24h ?? 0)
										})]
									})
								]
							}, id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex justify-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => setEditingWatch(true),
							className: "inline-flex h-11 items-center gap-2 rounded-full bg-[#1a1d24] px-5 text-sm font-medium",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-4" }), "Customize"]
						})
					})
				]
			}),
			askOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50 px-4 pb-8",
				onClick: () => setAskOpen(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "w-full max-w-md rounded-2xl bg-card p-4",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Trust Wallet AI"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: "Answers use this wallet and live prices."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "mt-3 flex gap-2",
							onSubmit: (e) => {
								e.preventDefault();
								ask();
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: question,
								onChange: (e) => setQuestion(e.target.value),
								placeholder: "Ask anything",
								className: "h-11 min-w-0 flex-1 rounded-full bg-[#12141a] px-4 text-sm outline-none"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "submit",
								className: "h-11 shrink-0 rounded-full bg-[#5b57f5] px-4 text-sm font-semibold text-white",
								children: "Ask"
							})]
						}),
						answer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed",
							children: answer
						}) : null
					]
				})
			}) : null,
			editingWatch ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50 px-4 pb-8",
				onClick: () => setEditingWatch(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-h-[70dvh] w-full max-w-md overflow-y-auto rounded-2xl bg-card p-4",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-semibold",
							children: "Customize watchlist"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3",
							children: COINS.map((coin) => {
								const on = watch.includes(coin.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => toggleWatch(coin.id),
									className: "flex w-full items-center gap-3 py-2 text-left",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
											id: coin.id,
											symbol: coin.symbol,
											image: coin.image,
											size: 32
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "min-w-0 flex-1 truncate",
											children: coin.symbol
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("text-sm", on ? "text-success" : "text-muted"),
											children: on ? "On" : "Off"
										})
									]
								}, coin.id);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setEditingWatch(false),
							className: "mt-3 h-11 w-full rounded-full bg-[#5b57f5] text-sm font-semibold text-white",
							children: "Done"
						})
					]
				})
			}) : null
		]
	});
}
var SplitComponent = WalletHomeScreen;
//#endregion
export { SplitComponent as component };
