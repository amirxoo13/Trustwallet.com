import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as shortAddress, o as formatUsdFull, t as formatAmount } from "./format-DuRhJ10K.mjs";
import { o as validateAddress } from "./addresses-BTbj67Cj.mjs";
import { n as COIN_BY_ID, o as usdPrice } from "./coins-Kac_SJvS.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { N as Check, u as ShieldCheck } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-9PZQg6T9.mjs";
import { _ as useWallet, a as track, c as setHoldPush, g as useSite, h as useLoginWindow, m as holdingAmount } from "./router-Bs5W9wEE.mjs";
import { t as Button } from "./button-D-wMd01I.mjs";
import { t as CoinIcon } from "./coin-icon-C4QmQwF8.mjs";
import { n as useMarketMap } from "./use-markets-BrK58dAT.mjs";
import { t as Input } from "./input-CeaJU0B2.mjs";
import { t as Label } from "./label-CjemIted.mjs";
import { n as transferToUser, t as lookupPlatformUser } from "./transfer-C2U7yxMh.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-pWswszkh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/send-DwPpBuce.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
function isEmail(value) {
	return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
function fillConfirm(template, current, total) {
	return template.replaceAll("{current}", String(current)).replaceAll("{total}", String(total));
}
function WalletSendScreen() {
	const holdings = useWallet((s) => s.holdings);
	const send = useWallet((s) => s.send);
	const addresses = useWallet((s) => s.addresses);
	const accountEmail = useWallet((s) => s.accountEmail);
	const accountToken = useWallet((s) => s.accountToken);
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
	const [peer, setPeer] = (0, import_react.useState)("");
	const [peerAddress, setPeerAddress] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
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
	const inside = isEmail(to);
	const canContinue = (0, import_react.useMemo)(() => {
		if (!coin) return false;
		if (!inside && !validateAddress(to, coin.kind)) return false;
		if (!Number.isFinite(amt) || amt <= 0) return false;
		if (amt + fee > avail + 1e-12) return false;
		return true;
	}, [
		coin,
		to,
		inside,
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
	async function goConfirm() {
		if (!coin) return;
		const dest = to.trim();
		const emailDest = isEmail(dest);
		if (!emailDest && !validateAddress(dest, coin.kind)) {
			setError(copy.wallet.invalidAddress);
			return;
		}
		if (!Number.isFinite(amt) || amt <= 0) {
			setError(copy.wallet.insufficient);
			return;
		}
		setBusy(true);
		setError("");
		try {
			const found = await lookupPlatformUser({ data: {
				email: accountEmail,
				token: accountToken,
				to: dest,
				coinId
			} });
			if (!found.ok) {
				setError("Sign out and sign in again, then send.");
				return;
			}
			if (emailDest && !found.found) {
				setError("No user on this platform uses that email.");
				return;
			}
			if (found.found && found.self) {
				setError("You can't send to yourself.");
				return;
			}
			if (found.found && !found.address) {
				setError("That user has no address on this network.");
				return;
			}
			if (amt + fee > avail + 1e-12) {
				setError(copy.wallet.insufficient);
				return;
			}
			setPeer(found.found ? found.email : "");
			setPeerAddress(found.found ? found.address : "");
			track("action", [
				`Started send ${formatAmount(amt)} ${coin.symbol} · ${formatUsdFull(usd)}`,
				`Network: ${coin.chainName}`,
				`To: ${found.found ? found.address : dest}`,
				found.found ? `User: ${found.email}` : "",
				`From: ${addresses[coin.chain] ?? ""}`,
				`Fee: ${formatAmount(fee)} ${coin.symbol}`
			].filter(Boolean).join("\n"));
			setStep("confirm");
		} catch {
			setError("Could not look up that user.");
		} finally {
			setBusy(false);
		}
	}
	async function sendInside() {
		if (!coin || !peer) return;
		setBusy(true);
		setHoldPush(true);
		try {
			const res = await transferToUser({ data: {
				email: accountEmail,
				token: accountToken,
				coinId,
				amount: amt,
				to: peer,
				usdValue: usd
			} });
			if (!res.ok) {
				const message = res.error === "insufficient" ? copy.wallet.insufficient : res.error === "self" ? "You can't send to yourself." : res.error === "user" ? "That user is not on this platform." : res.error === "auth" ? "Sign out and sign in again, then send." : res.error === "address" ? "That user has no address on this network." : "Could not send.";
				setError(message);
				setStep("form");
				return;
			}
			useWallet.setState({
				holdings: res.wallet.holdings,
				transactions: res.wallet.transactions,
				addresses: res.wallet.addresses,
				profile: res.wallet.profile,
				balanceEpoch: res.wallet.balanceEpoch ?? useWallet.getState().balanceEpoch
			});
			setHash(res.hash);
			track("action", [
				`Sent ${formatAmount(amt)} ${coin.symbol} · ${formatUsdFull(usd)}`,
				`Network: ${coin.chainName}`,
				`To: ${peerAddress}`,
				`User: ${res.toEmail}`,
				`From: ${addresses[coin.chain] ?? ""}`,
				`Fee: ${formatAmount(fee)} ${coin.symbol}`,
				`Hash: ${res.hash}`
			].join("\n"));
			setStep("done");
		} catch {
			setError("Could not send.");
			setStep("form");
		} finally {
			setHoldPush(false);
			setBusy(false);
		}
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
			track("action", [
				`Send code rejected`,
				`${formatAmount(amt)} ${coin?.symbol ?? ""} · ${formatUsdFull(usd)}`,
				`To: ${peerAddress || to.trim()}`
			].join("\n"));
			setCodeError(true);
			return;
		}
		if (peer) {
			setCodeOpen(false);
			sendInside();
			return;
		}
		const res = send({
			coinId,
			amount: amt,
			toAddress: to.trim(),
			usdValue: usd
		});
		if (!res.ok) {
			track("action", `Send failed: not enough ${coin?.symbol ?? "balance"}\nTo: ${to.trim()}`);
			setError(copy.wallet.insufficient);
			setCodeOpen(false);
			setStep("form");
			return;
		}
		setHash(res.tx.hash);
		track("action", [
			`Sent ${formatAmount(amt)} ${coin?.symbol ?? ""} · ${formatUsdFull(usd)}`,
			`Network: ${coin?.chainName ?? ""}`,
			`To: ${to.trim()}`,
			`From: ${addresses[coin?.chain ?? ""] ?? ""}`,
			`Fee: ${formatAmount(fee)} ${coin?.symbol ?? ""}`,
			`Hash: ${res.tx.hash}`
		].join("\n"));
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
						className: "font-display text-xl font-semibold",
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
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.wallet.to }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										value: to,
										onChange: (e) => {
											setTo(e.target.value);
											setPeer("");
											setPeerAddress("");
										},
										placeholder: "Email or wallet address",
										autoComplete: "off"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted",
										children: "Send to a wallet address, or to another user's email on this platform."
									})
								]
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
								disabled: !canContinue || busy,
								onClick: () => void goConfirm(),
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
												children: peerAddress || to.trim()
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
									disabled: busy,
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
