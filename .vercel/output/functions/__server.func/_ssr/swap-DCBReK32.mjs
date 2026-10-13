import { o as __toESM } from "../_runtime.mjs";
import { c as usdPrice, i as COIN_BY_ID, r as COINS } from "./auth-config-CmLBU8rx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Check, L as ArrowDown } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-B853SSJ4.mjs";
import { b as useWallet, g as holdingAmount, l as formatAmount, m as formatUsdFull, u as formatDuration } from "./router-BsfzO6fi.mjs";
import { t as Button } from "./button-npk6vMbG.mjs";
import { t as CoinIcon } from "./coin-icon-CuBLUK_9.mjs";
import { n as useMarketMap } from "./use-markets-TxqhgRCg.mjs";
import { t as Input } from "./input-CFzomzSe.mjs";
import { t as SwapMarkets } from "./swap-markets-B2Cs5-jE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/swap-DCBReK32.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WalletSwapScreen() {
	const holdings = useWallet((s) => s.holdings);
	const transactions = useWallet((s) => s.transactions);
	const swap = useWallet((s) => s.swap);
	const copy = t();
	const markets = useMarketMap();
	const [fromId, setFromId] = (0, import_react.useState)("tether");
	const [toId, setToId] = (0, import_react.useState)("bitcoin");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)("form");
	const [error, setError] = (0, import_react.useState)("");
	const [hash, setHash] = (0, import_react.useState)("");
	const [pendingId, setPendingId] = (0, import_react.useState)(null);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	const [view, setView] = (0, import_react.useState)("trade");
	const from = COIN_BY_ID[fromId];
	const to = COIN_BY_ID[toId];
	const avail = holdingAmount(holdings, fromId);
	const fromPx = usdPrice(fromId, markets[fromId]?.price);
	const toPx = usdPrice(toId, markets[toId]?.price);
	const pay = Number(amount) || 0;
	const fee = pay * .003;
	const usd = pay * fromPx;
	const receive = toPx > 0 ? usd * .997 / toPx : 0;
	const rate = fromPx && toPx ? fromPx / toPx : 0;
	const ethToBtc = fromId === "ethereum" && toId === "bitcoin";
	const pendingSwaps = transactions.filter((tx) => tx.type === "swap" && tx.status === "pending" && tx.coinId === "ethereum" && tx.toCoinId === "bitcoin");
	const activePending = transactions.find((tx) => tx.id === pendingId);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 1e3);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (step === "pending" && activePending?.status === "confirmed") setStep("done");
	}, [step, activePending?.status]);
	const canSwap = (0, import_react.useMemo)(() => {
		return from && to && fromId !== toId && pay > 0 && pay <= avail + 1e-12 && receive > 0;
	}, [
		from,
		to,
		fromId,
		toId,
		pay,
		avail,
		receive
	]);
	function pickFrom(id) {
		setFromId(id);
		if (id === toId) {
			const next = COINS.find((c) => c.id !== id);
			if (next) setToId(next.id);
		}
	}
	function pickTo(id) {
		setToId(id);
		if (id === fromId) {
			const next = COINS.find((c) => c.id !== id);
			if (next) setFromId(next.id);
		}
	}
	function flip() {
		setFromId(toId);
		setToId(fromId);
		setAmount("");
	}
	function confirm() {
		if (!canSwap) {
			setError(copy.wallet.insufficient);
			return;
		}
		const res = swap({
			fromId,
			toId,
			fromAmount: pay,
			toAmount: receive,
			usdValue: usd
		});
		if (!res.ok) {
			setError(copy.wallet.insufficient);
			return;
		}
		setHash(res.tx.hash);
		if (res.tx.status === "pending") {
			setPendingId(res.tx.id);
			setStep("pending");
			return;
		}
		setStep("done");
	}
	const assetOptions = COINS;
	if (view === "markets") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		home: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwapMarkets, { onSwap: () => setView("trade") })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: copy.wallet.swap,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setView("markets"),
					className: "text-sm text-muted",
					children: "Markets"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: copy.wallet.swap
				}),
				step === "form" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-card p-4 shadow-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.wallet.youPay }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "text-primary",
									onClick: () => setAmount(String(avail)),
									children: [
										copy.wallet.max,
										" ",
										formatAmount(avail),
										" ",
										from?.symbol
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									className: "h-14 min-w-0 flex-1 border-0 bg-transparent text-2xl shadow-none",
									placeholder: "0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: fromId,
									onChange: (e) => pickFrom(e.target.value),
									className: "h-11 max-w-[7.5rem] shrink-0 rounded-full bg-card-elevated px-3 text-sm text-foreground shadow-border",
									children: assetOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.id,
										children: c.symbol
									}, c.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative z-10 -my-3 flex justify-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: flip,
								className: "flex size-11 items-center justify-center rounded-full bg-card-elevated shadow-border",
								"aria-label": "Flip",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowDown, { className: "size-4" })
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-card p-4 shadow-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: copy.wallet.youReceive
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "h-14 min-w-0 flex-1 truncate text-2xl leading-[3.5rem] tabular",
									children: receive ? formatAmount(receive, 6) : "0"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
									value: toId,
									onChange: (e) => pickTo(e.target.value),
									className: "h-11 max-w-[7.5rem] shrink-0 rounded-full bg-card-elevated px-3 text-sm text-foreground shadow-border",
									children: assetOptions.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: c.id,
										children: c.symbol
									}, c.id))
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 space-y-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: copy.wallet.rate }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "tabular text-foreground",
										children: [
											"1 ",
											from?.symbol,
											" ≈ ",
											rate ? formatAmount(rate, 6) : "—",
											" ",
											to?.symbol
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dt", { children: [copy.wallet.fee, " (0.3%)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "tabular text-foreground",
										children: [
											formatAmount(fee),
											" ",
											from?.symbol
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: copy.wallet.slippage }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "text-foreground",
										children: "0.50%"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between text-muted",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", { children: "USD" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "tabular text-foreground",
										children: formatUsdFull(usd)
									})]
								})
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-danger",
							children: error
						}) : null,
						ethToBtc ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted",
							children: "Ethereum to Bitcoin takes 21 real days. This applies to one token or the full balance. Bitcoin is added only when the timer reaches zero."
						}) : null,
						pendingSwaps.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4 space-y-2",
							children: pendingSwaps.map((tx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "rounded-xl bg-card px-4 py-3 text-sm shadow-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium",
										children: "Swap in progress"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1 text-muted",
										children: [
											formatAmount(tx.amount),
											" ",
											tx.symbol,
											" → ",
											formatAmount(tx.toAmount ?? 0, 6),
											" ",
											tx.toSymbol
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 font-mono text-base text-foreground",
										children: formatDuration((tx.settlesAt ?? now + 18144e5) - now)
									})
								]
							}, tx.id))
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "solid",
							size: "lg",
							className: "mt-6 w-full",
							disabled: !canSwap,
							onClick: confirm,
							children: [
								copy.wallet.confirm,
								" ",
								from && to ? `${from.symbol} → ${to.symbol}` : ""
							]
						})
					]
				}) : step === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl font-semibold",
							children: "Swap in progress"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xs text-sm text-muted",
							children: "Ethereum is locked now. Bitcoin is credited after 21 real days, counted from the moment you confirmed."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 font-mono text-3xl tabular",
							children: formatDuration((activePending?.settlesAt ?? now + 18144e5) - now)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: fromId,
									symbol: from?.symbol ?? "",
									size: 24
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									formatAmount(pay),
									" ",
									from?.symbol
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "→"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: toId,
									symbol: to?.symbol ?? "",
									size: 24
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									formatAmount(receive, 6),
									" ",
									to?.symbol
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xs break-all font-mono text-xs text-muted",
							children: hash
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "solid",
							className: "mt-8 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/wallet",
								children: copy.wallet.done
							})
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-16 items-center justify-center rounded-full bg-success/15 text-success",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 font-display text-xl font-semibold",
							children: copy.wallet.success
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex items-center gap-2 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: fromId,
									symbol: from?.symbol ?? "",
									size: 24
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									formatAmount(pay),
									" ",
									from?.symbol
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: "→"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: toId,
									symbol: to?.symbol ?? "",
									size: 24
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									formatAmount(receive, 6),
									" ",
									to?.symbol
								] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 max-w-xs break-all font-mono text-xs text-muted",
							children: hash
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "solid",
							className: "mt-8 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/wallet",
								children: copy.wallet.done
							})
						})
					]
				})
			]
		})
	});
}
var SplitComponent = WalletSwapScreen;
//#endregion
export { SplitComponent as component };
