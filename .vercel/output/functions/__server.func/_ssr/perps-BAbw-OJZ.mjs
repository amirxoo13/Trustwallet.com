import { o as __toESM } from "../_runtime.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-9FmVdWSd.mjs";
import { d as Settings, f as Search, j as ChevronRight, w as History } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-CVGFt8iw.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { b as useWallet, d as formatPct, g as holdingAmount, m as formatUsdFull, p as formatUsd } from "./router-BGBTbSuk.mjs";
import { t as Button } from "./button-fib134dJ.mjs";
import { t as CoinIcon } from "./coin-icon-CCRd0Azh.mjs";
import { t as Input } from "./input-BuOvXFyv.mjs";
import { n as loadPerpMids, t as loadPerpMarkets } from "./perps-feed-DonpCXk-.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/perps-BAbw-OJZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var FEE = 45e-5;
function id() {
	const a = /* @__PURE__ */ new Uint8Array(6);
	crypto.getRandomValues(a);
	return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}
function liqPrice(entry, leverage, side) {
	const move = 1 / leverage * .9;
	return side === "long" ? entry * (1 - move) : entry * (1 + move);
}
function positionPnl(p, price) {
	return p.side === "long" ? (price - p.entry) * p.size : (p.entry - price) * p.size;
}
var usePerps = create()(persist((set, get) => ({
	balance: 0,
	positions: [],
	deposit: (amount) => {
		if (!(amount > 0) || !Number.isFinite(amount)) return {
			ok: false,
			error: "amount"
		};
		if (!useWallet.getState().debit("tether", amount)) return {
			ok: false,
			error: "insufficient"
		};
		set((s) => ({ balance: s.balance + amount }));
		return { ok: true };
	},
	withdraw: (amount) => {
		if (!(amount > 0) || !Number.isFinite(amount)) return {
			ok: false,
			error: "amount"
		};
		if (get().balance + 1e-8 < amount) return {
			ok: false,
			error: "insufficient"
		};
		set((s) => ({ balance: Math.max(0, s.balance - amount) }));
		useWallet.getState().credit("tether", amount);
		return { ok: true };
	},
	open: ({ coin, symbol, side, leverage, margin, price, maxLeverage }) => {
		if (!(margin > 0) || !Number.isFinite(margin)) return {
			ok: false,
			error: "amount"
		};
		if (!(price > 0)) return {
			ok: false,
			error: "price"
		};
		const lev = Math.min(Math.max(1, Math.round(leverage)), Math.max(1, maxLeverage));
		const notional = margin * lev;
		const fee = notional * FEE;
		if (get().balance + 1e-8 < margin + fee) return {
			ok: false,
			error: "insufficient"
		};
		const size = notional / price;
		const row = {
			id: id(),
			coin,
			symbol,
			side,
			leverage: lev,
			margin,
			entry: price,
			size,
			liq: liqPrice(price, lev, side),
			openedAt: Date.now(),
			status: "open"
		};
		set((s) => ({
			balance: s.balance - margin - fee,
			positions: [row, ...s.positions].slice(0, 100)
		}));
		return {
			ok: true,
			id: row.id
		};
	},
	close: (pid, price) => {
		const row = get().positions.find((p) => p.id === pid && p.status === "open");
		if (!row) return {
			ok: false,
			error: "missing"
		};
		if (!(price > 0)) return {
			ok: false,
			error: "price"
		};
		const pnl = Math.max(-row.margin, positionPnl(row, price));
		set((s) => ({
			balance: s.balance + row.margin + pnl,
			positions: s.positions.map((p) => p.id === pid ? {
				...p,
				status: "closed",
				closedAt: Date.now(),
				closePrice: price,
				pnl,
				reason: "closed"
			} : p)
		}));
		return {
			ok: true,
			pnl
		};
	},
	mark: (mids) => {
		set((s) => {
			let changed = false;
			const positions = s.positions.map((p) => {
				if (p.status !== "open") return p;
				const price = mids[p.coin];
				if (!(price > 0)) return p;
				if (!(p.side === "long" ? price <= p.liq : price >= p.liq)) return p;
				changed = true;
				return {
					...p,
					status: "closed",
					closedAt: Date.now(),
					closePrice: p.liq,
					pnl: -p.margin,
					reason: "liquidated"
				};
			});
			return changed ? { positions } : s;
		});
	}
}), {
	name: "trust-perps",
	storage: createJSONStorage(() => localStorage),
	partialize: (s) => ({
		balance: s.balance,
		positions: s.positions
	})
}));
var PERP_FEE = FEE;
function Spark({ points, up }) {
	const sample = points.length > 24 ? points.filter((_, i) => i % Math.ceil(points.length / 24) === 0) : points;
	if (sample.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-8 w-16" });
	const min = Math.min(...sample);
	const span = Math.max(...sample) - min || 1;
	const d = sample.map((p, i) => {
		const x = i / (sample.length - 1) * 64;
		const y = 26 - (p - min) / span * 22;
		return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
	}).join(" ");
	const color = up ? "#3dcf8e" : "#ef5b6a";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 64 32",
		className: "h-7 w-12 shrink-0",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: `${d} L64 32 L0 32 Z`,
			fill: color,
			opacity: "0.18"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: color,
			strokeWidth: "2"
		})]
	});
}
function InfinityMark() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 88 48",
		className: "h-11 w-16 shrink-0",
		"aria-hidden": true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
			id: "perp-inf",
			x1: "0",
			y1: "0",
			x2: "1",
			y2: "1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "#8ec5ff"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "55%",
					stopColor: "#3b6bff"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "#6d4dff"
				})
			]
		}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d: "M22 24c0-7 4.8-12 11-12 8 0 11.5 7 11.5 12S41 36 33 36c-6.2 0-11-5-11-12Zm22 0c0-7 3.5-12 11.5-12 6.2 0 11 5 11 12s-4.8 12-11 12c-8 0-11.5-7-11.5-12Z",
			fill: "none",
			stroke: "url(#perp-inf)",
			strokeWidth: "7"
		})]
	});
}
function PerpsScreen() {
	const holdings = useWallet((s) => s.holdings);
	const balance = usePerps((s) => s.balance);
	const positions = usePerps((s) => s.positions);
	const deposit = usePerps((s) => s.deposit);
	const withdraw = usePerps((s) => s.withdraw);
	const open = usePerps((s) => s.open);
	const close = usePerps((s) => s.close);
	const mark = usePerps((s) => s.mark);
	const [view, setView] = (0, import_react.useState)("list");
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [all, setAll] = (0, import_react.useState)(false);
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [ticket, setTicket] = (0, import_react.useState)(null);
	const [depositOpen, setDepositOpen] = (0, import_react.useState)(false);
	const [amount, setAmount] = (0, import_react.useState)("");
	const [leverage, setLeverage] = (0, import_react.useState)(1);
	const [error, setError] = (0, import_react.useState)("");
	const markets = useQuery({
		queryKey: ["perp-markets"],
		queryFn: () => loadPerpMarkets(),
		staleTime: 3e4,
		refetchInterval: 3e4
	});
	const mids = useQuery({
		queryKey: ["perp-mids"],
		queryFn: () => loadPerpMids(),
		staleTime: 8e3,
		refetchInterval: 8e3
	});
	(0, import_react.useEffect)(() => {
		if (mids.data) mark(mids.data);
	}, [mids.data, mark]);
	const usdt = holdingAmount(holdings, "tether");
	const q = query.trim().toLowerCase();
	const rows = (0, import_react.useMemo)(() => {
		const list = (markets.data ?? []).filter((m) => !q || `${m.symbol} ${m.coin}`.toLowerCase().includes(q));
		return all || q ? list : list.slice(0, 12);
	}, [
		markets.data,
		q,
		all
	]);
	const live = (coin, fallback) => mids.data?.[coin] ?? fallback;
	function start(side) {
		const market = (markets.data ?? []).find((m) => m.coin === selected);
		if (!market) return;
		setLeverage(market.maxLeverage);
		setAmount("");
		setError("");
		setTicket({
			market,
			side
		});
	}
	function submitDeposit() {
		const n = Number(amount);
		const res = deposit(n);
		if (!res.ok) {
			setError(res.error === "insufficient" ? "Not enough USDT in the wallet." : "Enter an amount.");
			return;
		}
		setDepositOpen(false);
		setAmount("");
		setError("");
	}
	function submitWithdraw() {
		const n = Number(amount);
		const res = withdraw(n);
		if (!res.ok) {
			setError(res.error === "insufficient" ? "Not enough free margin." : "Enter an amount.");
			return;
		}
		setAmount("");
		setError("");
	}
	function submitOrder() {
		if (!ticket) return;
		const price = live(ticket.market.coin, ticket.market.mark);
		const res = open({
			coin: ticket.market.coin,
			symbol: ticket.market.symbol,
			side: ticket.side,
			leverage,
			margin: Number(amount),
			price,
			maxLeverage: ticket.market.maxLeverage
		});
		if (!res.ok) {
			setError(res.error === "insufficient" ? "Not enough free margin for this size and fee." : res.error === "price" ? "Live price is unavailable." : "Enter a margin amount.");
			return;
		}
		setTicket(null);
		setSelected(null);
		setAmount("");
		setError("");
	}
	const openPositions = positions.filter((p) => p.status === "open");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		home: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md overflow-x-clip px-4 pt-3 pb-36",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "History",
								onClick: () => setView(view === "history" ? "list" : "history"),
								className: "flex size-11 items-center justify-center rounded-full bg-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(History, { className: "size-5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Settings",
								onClick: () => setView(view === "settings" ? "list" : "settings"),
								className: "flex size-11 items-center justify-center rounded-full bg-card",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-xl font-semibold",
							children: "Perps"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Search",
							onClick: () => {
								setSearchOpen((v) => !v);
								setView("list");
								if (searchOpen) setQuery("");
							},
							className: "flex size-11 items-center justify-center rounded-full bg-card",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
						})
					]
				}),
				searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search market",
					className: "mt-3 h-11 w-full rounded-full bg-card px-4 text-sm outline-none"
				}) : null,
				view === "history" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Positions"
						}),
						positions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 text-sm text-muted",
							children: "No positions yet."
						}) : null,
						positions.map((p) => {
							const price = p.status === "open" ? live(p.coin, p.entry) : p.closePrice ?? p.entry;
							const pnl = p.status === "open" ? positionPnl(p, price) : p.pnl ?? 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 rounded-2xl bg-card p-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-semibold",
											children: [
												p.symbol,
												" ",
												p.side === "long" ? "Long" : "Short",
												" ",
												p.leverage,
												"x"
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: cn("tabular", pnl >= 0 ? "text-success" : "text-danger"),
											children: formatUsdFull(pnl)
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-xs text-muted",
										children: [
											"Entry ",
											formatUsd(p.entry, true),
											" · ",
											p.status === "open" ? `Mark ${formatUsd(price, true)}` : p.reason === "liquidated" ? "Liquidated" : "Closed"
										]
									}),
									p.status === "open" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "outline",
										className: "mt-3 w-full",
										onClick: () => close(p.id, price),
										children: "Close"
									}) : null
								]
							}, p.id);
						})
					]
				}) : null,
				view === "settings" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-lg font-semibold",
							children: "Margin"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								"Free margin ",
								formatUsdFull(balance),
								". Open fee is ",
								(PERP_FEE * 100).toFixed(3),
								"% of position size. Wallet USDT ",
								formatUsdFull(usdt),
								"."
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block text-sm",
							children: ["Withdraw to wallet", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								className: "mt-2",
								placeholder: "0"
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "solid",
							className: "mt-4 w-full",
							onClick: submitWithdraw,
							children: "Withdraw"
						})
					]
				}) : null,
				view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex min-w-0 items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "min-w-0 flex-1 font-display text-2xl font-semibold leading-tight",
							children: balance > 0 ? `${formatUsdFull(balance)} free margin` : "Deposit to fund your first position"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfinityMark, {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => {
							setDepositOpen(true);
							setAmount("");
							setError("");
						},
						className: "mt-4 h-12 w-full rounded-full bg-[#5b4dff] text-sm font-semibold text-white",
						children: "Deposit"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setAll((v) => !v),
						className: "mt-8 flex items-center gap-1 text-lg font-semibold",
						children: [
							all ? "All markets" : "Popular",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "size-5" })
						]
					}),
					markets.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm text-danger",
						children: "Live perp markets are unavailable right now."
					}) : null,
					markets.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 space-y-3",
						children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-xl bg-card" }, i))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2",
						children: [rows.map((m) => {
							const price = live(m.coin, m.mark);
							const denom = 1 + m.change24h / 100;
							const prev = denom > .05 ? m.mark / denom : m.mark;
							const pct = prev > 0 ? (price - prev) / prev * 100 : 0;
							const up = pct >= 0;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelected((cur) => cur === m.coin ? null : m.coin),
								className: cn("flex w-full min-w-0 items-center gap-2 border-b border-border py-2.5 text-left", selected === m.coin && "bg-card/60"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
										symbol: m.symbol,
										size: 36
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "min-w-0 flex-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "truncate text-sm font-semibold",
												children: m.symbol
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "shrink-0 rounded-full bg-card px-1.5 py-0.5 text-[11px] text-muted",
												children: [m.maxLeverage, "x"]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "block truncate text-[11px] text-muted",
											children: [formatUsd(m.volume), " Vol"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
										points: m.spark.length ? m.spark : [m.mark, price],
										up
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "w-[4.5rem] shrink-0 overflow-hidden text-right",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "block truncate text-sm font-semibold tabular",
											children: formatUsd(price, true)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: cn("block truncate text-xs tabular", up ? "text-success" : "text-danger"),
											children: formatPct(pct)
										})]
									})
								]
							}, m.coin);
						}), rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "py-8 text-center text-sm text-muted",
							children: "No markets matched."
						}) : null]
					})
				] }) : null,
				selected && view === "list" && !ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "fixed inset-x-0 bottom-[4.75rem] z-30 flex gap-2 px-4 md:bottom-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => start("long"),
						className: "h-12 flex-1 rounded-full bg-[#3dcf8e] text-sm font-semibold text-[#062116]",
						children: "Long ↗"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => start("short"),
						className: "h-12 flex-1 rounded-full bg-[#ef5b6a] text-sm font-semibold text-white",
						children: "Short ↘"
					})]
				}) : null,
				depositOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50 px-4 pb-8",
					onClick: () => setDepositOpen(false),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-md rounded-2xl bg-card p-4",
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "font-semibold",
								children: "Deposit USDT"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: ["Wallet balance ", formatUsdFull(usdt)]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: amount,
								onChange: (e) => setAmount(e.target.value),
								className: "mt-3",
								placeholder: "0"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "mt-2 text-sm text-primary",
								onClick: () => setAmount(String(usdt)),
								children: "Max"
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "solid",
								className: "mt-4 w-full",
								onClick: submitDeposit,
								children: "Confirm deposit"
							})
						]
					})
				}) : null,
				ticket ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "fixed inset-0 z-40 flex items-end justify-center bg-black/50 px-4 pb-8",
					onClick: () => setTicket(null),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "w-full max-w-md rounded-2xl bg-card p-4",
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
								className: "font-semibold",
								children: [
									ticket.side === "long" ? "Long" : "Short",
									" ",
									ticket.market.symbol
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-1 text-sm text-muted",
								children: [
									"Mark ",
									formatUsd(live(ticket.market.coin, ticket.market.mark), true),
									" · Free margin ",
									formatUsdFull(balance)
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block text-sm",
								children: ["Margin (USDT)", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									className: "mt-2",
									placeholder: "0"
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "mt-3 block text-sm",
								children: [
									"Leverage ",
									leverage,
									"x",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "range",
										min: 1,
										max: ticket.market.maxLeverage,
										value: leverage,
										onChange: (e) => setLeverage(Number(e.target.value)),
										className: "mt-2 w-full"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs text-muted",
								children: [
									"Size ",
									formatUsd((Number(amount) || 0) * leverage),
									" · Fee ",
									formatUsdFull((Number(amount) || 0) * leverage * PERP_FEE),
									" · Liq",
									" ",
									formatUsd(ticket.side === "long" ? live(ticket.market.coin, ticket.market.mark) * (1 - .9 / leverage) : live(ticket.market.coin, ticket.market.mark) * (1 + .9 / leverage), true)
								]
							}),
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-danger",
								children: error
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "solid",
								className: "mt-4 w-full",
								onClick: submitOrder,
								children: ["Confirm ", ticket.side]
							})
						]
					})
				}) : null,
				openPositions.length && view === "list" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-xs text-muted",
					children: [openPositions.length, " open. History has live PnL and close."]
				}) : null
			]
		})
	});
}
var SplitComponent = PerpsScreen;
//#endregion
export { SplitComponent as component };
