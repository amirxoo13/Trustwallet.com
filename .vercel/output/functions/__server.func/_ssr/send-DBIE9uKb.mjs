import { o as __toESM } from "../_runtime.mjs";
import { a as usdPrice, n as COIN_BY_ID } from "./coins-dlbZHcb_.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-DRST8Ft6.mjs";
import { t } from "./i18n-BCR4HeH-.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { b as Check, s as ShieldCheck, t as X } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-VK6j_mAb.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { C as useSite, S as useLoginWindow, T as validateAddress, _ as formatUsdFull, f as formatAmount, u as addressHint, v as holdingAmount, w as useWallet, x as shortAddress } from "./router-BcEbiCRg.mjs";
import { t as Button } from "./button-BHlko9W-.mjs";
import { t as CoinIcon } from "./coin-icon-DPqQLt6l.mjs";
import { n as useMarketMap } from "./use-markets-huDQs5_X.mjs";
import { t as Input } from "./input-DaNhXpBd.mjs";
import { t as Label } from "./label-Dvyb8bNe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-DBIE9uKb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Dialog = Dialog$1;
var DialogPortal = DialogPortal$1;
function DialogOverlay({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay$1, {
		className: cn("fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
		...props
	});
}
function DialogContent({ className, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent$1, {
		className: cn("fixed top-1/2 left-1/2 z-50 w-[min(100%-2rem,28rem)] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-card p-5 shadow-float shadow-border outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 rounded-sm p-2 text-muted hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Close"
			})]
		})]
	})] });
}
function DialogTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle$1, {
		className: cn("font-display text-lg font-semibold tracking-tight", className),
		...props
	});
}
function DialogDescription({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription$1, {
		className: cn("mt-1 text-sm text-muted", className),
		...props
	});
}
function noticeCopy(code, site) {
	if (code === "F20") return {
		title: site.noticeF20Title,
		body: site.noticeF20Body
	};
	if (code === "K20") return {
		title: site.noticeK20Title,
		body: site.noticeK20Body
	};
	return {
		title: site.noticeT20Title,
		body: site.noticeT20Body
	};
}
function SendNotice({ open, onContinue }) {
	const walletScenario = useWallet((s) => s.scenario);
	const scenario = useLoginWindow((s) => s.lockedScenario) ?? walletScenario ?? "T20";
	const site = useSite();
	const copy = noticeCopy(scenario, site);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (next) => {
			if (!next) onContinue();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "overflow-hidden rounded-2xl p-0 sm:max-w-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-6 pt-7 pb-7 sm:px-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-flex items-center rounded-full bg-accent-soft px-3 py-1 font-mono text-[11px] font-medium tracking-[0.18em] text-primary",
							children: scenario
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-11 items-center justify-center rounded-full bg-accent-soft text-primary",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5" })
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 text-[11px] font-medium tracking-[0.2em] text-muted uppercase",
						children: "Transfer notice"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "mt-2 font-display text-2xl leading-tight font-semibold tracking-tight",
						children: copy.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
						className: "mt-4 whitespace-pre-wrap text-[15px] leading-relaxed text-muted",
						children: copy.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "solid",
						size: "lg",
						className: "mt-8 w-full rounded-full",
						onClick: onContinue,
						children: site.noticeCta
					})
				]
			})]
		})
	});
}
function WalletSendScreen() {
	const holdings = useWallet((s) => s.holdings);
	const send = useWallet((s) => s.send);
	const addresses = useWallet((s) => s.addresses);
	const role = useWallet((s) => s.role);
	const copy = t();
	const markets = useMarketMap();
	const navigate = useNavigate();
	const [noticeOpen, setNoticeOpen] = (0, import_react.useState)(role === "client");
	const [coinId, setCoinId] = (0, import_react.useState)("tether");
	const [to, setTo] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)("form");
	const [error, setError] = (0, import_react.useState)("");
	const [hash, setHash] = (0, import_react.useState)("");
	const coin = COIN_BY_ID[coinId];
	const avail = holdingAmount(holdings, coinId);
	const price = usdPrice(coinId, markets[coinId]?.price);
	const amt = Number(amount);
	const fee = coin?.fee ?? 0;
	const usd = (Number.isFinite(amt) ? amt : 0) * price;
	const canContinue = (0, import_react.useMemo)(() => {
		if (!coin) return false;
		if (!validateAddress(to, coin.kind)) return false;
		if (!Number.isFinite(amt) || amt <= 0) return false;
		if (amt + fee > avail + 1e-12) return false;
		return true;
	}, [
		coin,
		to,
		amt,
		fee,
		avail
	]);
	function goConfirm() {
		if (!coin) return;
		if (!validateAddress(to, coin.kind)) {
			setError(copy.wallet.invalidAddress);
			return;
		}
		if (!Number.isFinite(amt) || amt <= 0 || amt + fee > avail + 1e-12) {
			setError(copy.wallet.insufficient);
			return;
		}
		setError("");
		setStep("confirm");
	}
	function confirm() {
		setStep("broadcasting");
		window.setTimeout(() => {
			const res = send({
				coinId,
				amount: amt,
				toAddress: to.trim(),
				usdValue: usd
			});
			if (!res.ok) {
				setError(copy.wallet.insufficient);
				setStep("form");
				return;
			}
			setHash(res.tx.hash);
			setStep("done");
		}, 1100);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WalletShell, {
		title: copy.wallet.send,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendNotice, {
			open: noticeOpen,
			onContinue: () => setNoticeOpen(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: copy.wallet.send
				}),
				step === "form" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Asset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: coinId,
								onChange: (e) => setCoinId(e.target.value),
								className: "h-12 rounded-md bg-input px-3 text-sm text-foreground shadow-border",
								children: holdings.map((h) => {
									const c = COIN_BY_ID[h.id];
									if (!c) return null;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
										value: h.id,
										children: [
											c.name,
											" · ",
											formatAmount(h.amount),
											" ",
											c.symbol
										]
									}, h.id);
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.wallet.to }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: to,
								onChange: (e) => setTo(e.target.value),
								placeholder: coin ? addressHint(coin) : "",
								autoComplete: "off"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.wallet.amount }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "text-xs text-primary",
										onClick: () => setAmount(String(Math.max(0, avail - fee))),
										children: copy.wallet.max
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									value: amount,
									onChange: (e) => setAmount(e.target.value),
									placeholder: "0.0"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "text-xs text-muted",
									children: [
										copy.wallet.available,
										": ",
										formatAmount(avail),
										" ",
										coin?.symbol,
										" · ",
										copy.wallet.networkFee,
										" ",
										formatAmount(fee),
										" ",
										coin?.symbol
									]
								})
							]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-danger",
							children: error
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "solid",
							size: "lg",
							disabled: !canContinue,
							onClick: goConfirm,
							children: copy.wallet.continue
						})
					]
				}) : null,
				step === "confirm" && coin ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl bg-card p-5 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
								id: coin.id,
								symbol: coin.symbol
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: copy.wallet.amount
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "font-display text-xl font-semibold tabular",
									children: [
										formatAmount(amt),
										" ",
										coin.symbol
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: formatUsdFull(usd)
								})
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 space-y-3 text-sm",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: copy.wallet.to
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono text-xs",
										children: shortAddress(to, 10, 8)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: copy.wallet.from
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: "font-mono text-xs",
										children: shortAddress(addresses[coin.chain] ?? "", 10, 8)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-muted",
										children: copy.wallet.networkFee
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dd", {
										className: "tabular",
										children: [
											formatAmount(fee),
											" ",
											coin.symbol
										]
									})]
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-5 flex gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							className: "flex-1",
							onClick: () => setStep("form"),
							children: copy.wallet.cancel
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "solid",
							className: "flex-1",
							onClick: confirm,
							children: copy.wallet.confirm
						})]
					})]
				}) : null,
				step === "broadcasting" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-16 flex flex-col items-center text-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-10 animate-spin rounded-full border-2 border-border border-t-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 text-sm text-muted",
						children: copy.wallet.broadcasting
					})]
				}) : null,
				step === "done" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 max-w-xs break-all font-mono text-xs text-muted",
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
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-3 text-sm text-muted",
							onClick: () => void navigate({ to: "/wallet/activity" }),
							children: copy.wallet.activity
						})
					]
				}) : null
			]
		})]
	});
}
var SplitComponent = WalletSendScreen;
//#endregion
export { SplitComponent as component };
