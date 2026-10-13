import { o as __toESM } from "../_runtime.mjs";
import { c as usdPrice, i as COIN_BY_ID } from "./auth-config-CmLBU8rx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-p8tLCT9U.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Check, c as ShieldCheck, t as X } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-Cn3TuXwa.mjs";
import { a as DialogOverlay$1, i as DialogDescription$1, n as DialogClose, o as DialogPortal$1, r as DialogContent$1, s as DialogTitle$1, t as Dialog$1 } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { _ as useLoginWindow, b as validateAddress, g as shortAddress, h as holdingAmount, l as formatAmount, p as formatUsdFull, s as addressHint, v as useSite, y as useWallet } from "./router-C_tHHoKp.mjs";
import { t as Button } from "./button-CyeXN8LC.mjs";
import { t as CoinIcon } from "./coin-icon-BTbi4q07.mjs";
import { n as useMarketMap } from "./use-markets-DkkllXXT.mjs";
import { t as Input } from "./input-B5AnLOWr.mjs";
import { t as Label } from "./label-B6Ri7CTH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-EDqczsub.js
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
function confirmMinutes(raw) {
	const n = Number(raw);
	if (!Number.isFinite(n) || n <= 0) return 4;
	return Math.min(60, n);
}
function confirmCount(raw) {
	const n = Math.round(Number(raw));
	if (!Number.isFinite(n) || n < 1) return 12;
	return Math.min(60, n);
}
function fillConfirm(template, current, total) {
	return template.replaceAll("{current}", String(current)).replaceAll("{total}", String(total));
}
function WalletSendScreen() {
	const holdings = useWallet((s) => s.holdings);
	const send = useWallet((s) => s.send);
	const addresses = useWallet((s) => s.addresses);
	const role = useWallet((s) => s.role);
	const copy = t();
	const site = useSite();
	const markets = useMarketMap();
	const navigate = useNavigate();
	const [noticeOpen, setNoticeOpen] = (0, import_react.useState)(role === "client");
	const [coinId, setCoinId] = (0, import_react.useState)("tether");
	const [to, setTo] = (0, import_react.useState)("");
	const [amount, setAmount] = (0, import_react.useState)("");
	const [step, setStep] = (0, import_react.useState)("form");
	const [error, setError] = (0, import_react.useState)("");
	const [hash, setHash] = (0, import_react.useState)("");
	const [confirmN, setConfirmN] = (0, import_react.useState)(1);
	const [codeOpen, setCodeOpen] = (0, import_react.useState)(false);
	const [code, setCode] = (0, import_react.useState)("");
	const [codeError, setCodeError] = (0, import_react.useState)(false);
	const coin = COIN_BY_ID[coinId];
	const avail = holdingAmount(holdings, coinId);
	const price = usdPrice(coinId, markets[coinId]?.price);
	const amt = Number(amount);
	const fee = coin?.fee ?? 0;
	const usd = (Number.isFinite(amt) ? amt : 0) * price;
	const totalConfirms = confirmCount(site.sendConfirmCount);
	const minutes = confirmMinutes(site.sendConfirmMinutes);
	const confirmRef = (0, import_react.useRef)(1);
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
	(0, import_react.useEffect)(() => {
		if (step !== "confirming") return;
		confirmRef.current = 1;
		setConfirmN(1);
		setCodeOpen(false);
		setCodeError(false);
		const finish = () => {
			confirmRef.current = totalConfirms;
			setConfirmN(totalConfirms);
			setCodeOpen(true);
		};
		if (totalConfirms <= 1) {
			const id = window.setTimeout(finish, minutes * 6e4);
			return () => window.clearTimeout(id);
		}
		const stepMs = minutes * 6e4 / (totalConfirms - 1);
		const id = window.setInterval(() => {
			const next = Math.min(totalConfirms, confirmRef.current + 1);
			confirmRef.current = next;
			setConfirmN(next);
			if (next >= totalConfirms) {
				window.clearInterval(id);
				setCodeOpen(true);
			}
		}, stepMs);
		return () => window.clearInterval(id);
	}, [
		step,
		minutes,
		totalConfirms
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
	function beginConfirming() {
		setCode("");
		setCodeError(false);
		setCodeOpen(false);
		setConfirmN(1);
		setStep("confirming");
	}
	function submitCode() {
		const expected = site.sendCodeValue.trim();
		if (!expected || code.trim() !== expected) {
			setCodeError(true);
			return;
		}
		const res = send({
			coinId,
			amount: amt,
			toAddress: to.trim(),
			usdValue: usd
		});
		if (!res.ok) {
			setError(copy.wallet.insufficient);
			setCodeOpen(false);
			setStep("form");
			return;
		}
		setHash(res.tx.hash);
		setCodeOpen(false);
		setStep("done");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(WalletShell, {
		title: copy.wallet.send,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SendNotice, {
				open: noticeOpen,
				onContinue: () => setNoticeOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
				open: codeOpen,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
					className: "overflow-hidden rounded-2xl p-0 [&>button]:hidden",
					onPointerDownOutside: (e) => e.preventDefault(),
					onEscapeKeyDown: (e) => e.preventDefault(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-1 bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "px-6 pt-7 pb-7",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
								className: "font-display text-xl leading-snug font-semibold tracking-tight",
								children: site.sendCodeTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "mt-3 text-sm leading-relaxed text-muted",
								children: site.sendCodeBody
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: code,
								onChange: (e) => {
									setCode(e.target.value);
									setCodeError(false);
								},
								placeholder: site.sendCodePlaceholder,
								autoComplete: "one-time-code",
								inputMode: "numeric",
								className: "mt-5 text-center font-mono tracking-[0.28em]"
							}),
							codeError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-danger",
								children: site.sendCodeError
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "solid",
								size: "lg",
								className: "mt-6 w-full rounded-full",
								onClick: submitCode,
								children: site.sendCodeButton
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "font-display text-xl font-semibold tracking-tight",
								children: site.sendSureTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted",
								children: site.sendSureBody
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 rounded-xl bg-card p-5 shadow-border",
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
												className: "max-w-[14rem] text-end font-mono text-xs break-all",
												children: to.trim()
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
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 flex gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									className: "flex-1",
									onClick: () => setStep("form"),
									children: site.sendSureCancel
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "solid",
									className: "flex-1",
									onClick: beginConfirming,
									children: site.sendSureOk
								})]
							})
						]
					}) : null,
					step === "confirming" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-16 flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-10 animate-spin rounded-full border-2 border-border border-t-primary" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-5 font-display text-lg font-semibold",
								children: site.sendConfirmTitle
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted tabular",
								children: fillConfirm(site.sendConfirmLabel, confirmN, totalConfirms)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-primary transition-[width] duration-300",
									style: { width: `${Math.min(100, confirmN / totalConfirms * 100)}%` }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-xs text-xs leading-relaxed text-muted",
								children: site.sendConfirmHint
							})
						]
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
			})
		]
	});
}
var SplitComponent = WalletSendScreen;
//#endregion
export { SplitComponent as component };
