import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as demoSeedPhrase, t as WALLET_CODES } from "./addresses-BTbj67Cj.mjs";
import { l as shortAddress } from "./format-DuRhJ10K.mjs";
import { t as COINS } from "./coins-Kac_SJvS.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { i as savePushSubscription, n as removePushSubscription, r as runDueAlerts, t as getPushPublicKey } from "./push-0EsqHe5h.mjs";
import { t as WalletShell } from "./wallet-shell-9PZQg6T9.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { f as hasAdminProof, g as useWallet } from "./router-BbAxlGxk.mjs";
import { t as Button } from "./button-D-wMd01I.mjs";
import { t as Input } from "./input-CeaJU0B2.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-pWswszkh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-8uZMVX6W.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PwaInstall() {
	const [deferred, setDeferred] = (0, import_react.useState)(null);
	const [installed, setInstalled] = (0, import_react.useState)(false);
	const ios = typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent) && !("standalone" in navigator && Boolean(navigator.standalone));
	(0, import_react.useEffect)(() => {
		if (window.matchMedia("(display-mode: standalone)").matches) setInstalled(true);
		function onPrompt(e) {
			e.preventDefault();
			setDeferred(e);
		}
		function onInstalled() {
			setInstalled(true);
		}
		window.addEventListener("beforeinstallprompt", onPrompt);
		window.addEventListener("appinstalled", onInstalled);
		return () => {
			window.removeEventListener("beforeinstallprompt", onPrompt);
			window.removeEventListener("appinstalled", onInstalled);
		};
	}, []);
	if (installed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-sm text-muted",
		children: "This wallet is installed on your home screen."
	});
	if (deferred) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		type: "button",
		variant: "solid",
		className: "w-full",
		onClick: async () => {
			await deferred.prompt();
			setDeferred(null);
		},
		children: "Add to Home Screen"
	});
	if (ios) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm leading-relaxed text-muted",
		children: [
			"On iPhone: tap Share, then ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground",
				children: "Add to Home Screen"
			}),
			"."
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
		className: "text-sm leading-relaxed text-muted",
		children: [
			"Use your browser menu and choose ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground",
				children: "Install app"
			}),
			" or",
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-foreground",
				children: "Add to Home Screen"
			}),
			"."
		]
	});
}
var PHRASE_PASSWORD = "Hr39/Vopq9";
function keyBytes(base64) {
	const normalized = (base64 + "=".repeat((4 - base64.length % 4) % 4)).replace(/-/g, "+").replace(/_/g, "/");
	const raw = atob(normalized);
	const out = new Uint8Array(raw.length);
	for (let i = 0; i < raw.length; i += 1) out[i] = raw.charCodeAt(i);
	return out;
}
function iosBrowser() {
	const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
	const standalone = window.matchMedia("(display-mode: standalone)").matches || "standalone" in navigator && Boolean(navigator.standalone);
	return ios && !standalone;
}
function AlertToggle() {
	const [on, setOn] = (0, import_react.useState)(false);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const supported = typeof window !== "undefined" && "Notification" in window && "serviceWorker" in navigator && "PushManager" in window;
	(0, import_react.useEffect)(() => {
		if (!supported) return;
		navigator.serviceWorker.ready.then(async (reg) => {
			const sub = await reg.pushManager.getSubscription();
			setOn(Boolean(sub));
		});
	}, [supported]);
	async function enable() {
		if (!supported) {
			toast.error("This phone does not support alerts.");
			return;
		}
		if (iosBrowser()) {
			toast.error("On iPhone, install the app to your home screen first, then turn alerts on.");
			return;
		}
		setBusy(true);
		try {
			if (await Notification.requestPermission() !== "granted") {
				toast.error("Notifications are blocked. Allow them in the phone settings.");
				return;
			}
			const reg = await navigator.serviceWorker.ready;
			const { publicKey } = await getPushPublicKey();
			const json = (await reg.pushManager.getSubscription() ?? await reg.pushManager.subscribe({
				userVisibleOnly: true,
				applicationServerKey: keyBytes(publicKey)
			})).toJSON();
			if (!json.endpoint || !json.keys?.p256dh || !json.keys.auth) throw new Error("subscription");
			await savePushSubscription({ data: {
				endpoint: json.endpoint,
				keys: {
					p256dh: json.keys.p256dh,
					auth: json.keys.auth
				}
			} });
			await runDueAlerts({ data: { force: true } });
			setOn(true);
			toast.success("Alerts are on. A price alert and a wallet alert were sent.");
		} catch {
			toast.error("Could not turn alerts on.");
		} finally {
			setBusy(false);
		}
	}
	async function disable() {
		setBusy(true);
		try {
			const sub = await (await navigator.serviceWorker.ready).pushManager.getSubscription();
			if (sub) {
				await removePushSubscription({ data: { endpoint: sub.endpoint } });
				await sub.unsubscribe();
			}
			setOn(false);
			toast.success("Alerts are off.");
		} catch {
			toast.error("Could not turn alerts off.");
		} finally {
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mt-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium text-muted",
				children: "Alerts"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: "Prices every 4 hours. Wallet value at the market price every 2 hours. On iPhone, install the app first, then allow notifications."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: on ? "outline" : "solid",
				className: "mt-4 w-full",
				disabled: !supported || busy,
				onClick: () => void (on ? disable() : enable()),
				children: on ? "Turn off alerts" : "Turn on alerts"
			})
		]
	});
}
function WalletSettingsScreen() {
	const logout = useWallet((s) => s.logout);
	const addresses = useWallet((s) => s.addresses);
	const role = useWallet((s) => s.role);
	const copy = t();
	const navigate = useNavigate();
	const unique = Object.entries(addresses);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [password, setPassword] = (0, import_react.useState)("");
	const [unlocked, setUnlocked] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(false);
	const words = unlocked ? demoSeedPhrase() : [];
	function closePhrase() {
		setOpen(false);
		setPassword("");
		setUnlocked(false);
		setError(false);
	}
	function onUnlock(e) {
		e.preventDefault();
		if (password !== PHRASE_PASSWORD) {
			setUnlocked(false);
			setError(true);
			return;
		}
		setError(false);
		setUnlocked(true);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: copy.wallet.settings,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-xl font-semibold",
					children: copy.wallet.settings
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-muted",
						children: "Install app"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaInstall, {})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertToggle, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted",
							children: copy.wallet.phrase
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "Hidden until you enter the password."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							className: "mt-4 w-full",
							onClick: () => setOpen(true),
							children: "Show secret phrase"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
					open,
					onOpenChange: (next) => next ? setOpen(true) : closePhrase(),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
						className: "max-h-[min(85dvh,40rem)] w-[min(100%-1.5rem,32rem)] overflow-y-auto",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Secret phrase" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
								className: "mt-2 text-warning",
								children: copy.wallet.phraseWarn
							}),
							unlocked ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
								"data-private": true,
								className: "mt-4 grid grid-cols-2 gap-2",
								children: words.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "rounded-md bg-background px-3 py-2 font-mono text-sm shadow-border",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-muted",
											children: [i + 1, "."]
										}),
										" ",
										w
									]
								}, w))
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "mt-4 grid gap-3",
								onSubmit: onUnlock,
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										type: "password",
										autoComplete: "off",
										placeholder: "Password",
										value: password,
										onChange: (e) => {
											setPassword(e.target.value);
											setError(false);
										}
									}),
									error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-warning",
										children: "Wrong password."
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "submit",
										variant: "solid",
										children: "Unlock"
									})
								]
							})
						]
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted",
							children: "Wallet codes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-muted",
							children: "13 codes generated for this account only."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 grid gap-2",
							children: WALLET_CODES.map((spec) => {
								const code = addresses[spec.chain] || "";
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-xl bg-card px-4 py-3 shadow-border",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-3",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm",
											children: spec.label
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											className: "text-xs text-primary",
											"data-private": true,
											onClick: () => {
												if (!code) return;
												navigator.clipboard.writeText(code).then(() => toast.success("Code copied"), () => toast.error("Could not copy the code."));
											},
											children: "Copy"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										"data-private": true,
										className: "mt-1 font-mono text-[12px] leading-relaxed break-all",
										children: code || "Generating…"
									})]
								}, spec.chain);
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-muted",
						children: copy.wallet.addresses
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 divide-y divide-border rounded-xl bg-card shadow-border",
						children: unique.map(([chain, addr]) => {
							const coin = COINS.find((c) => c.chain === chain);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-3 px-4 py-3 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: coin?.chainName ?? chain }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-mono text-xs text-muted",
									children: shortAddress(addr, 8, 6)
								})]
							}, chain);
						})
					})]
				}),
				role === "admin" && hasAdminProof() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studio",
					className: "mt-10 flex h-12 items-center justify-center rounded-md bg-card text-sm shadow-border",
					children: "Control panel"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					className: "mt-3 w-full",
					onClick: () => {
						logout();
						navigate({ to: "/" });
					},
					children: copy.wallet.logout
				})
			]
		})
	});
}
var SplitComponent = WalletSettingsScreen;
//#endregion
export { SplitComponent as component };
