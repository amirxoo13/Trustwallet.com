import { o as __toESM } from "../_runtime.mjs";
import { r as COINS } from "./auth-config-CmLBU8rx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as WalletShell } from "./wallet-shell-B853SSJ4.mjs";
import { _ as shortAddress, b as useWallet, c as demoSeedPhrase, h as hasAdminProof } from "./router-BsfzO6fi.mjs";
import { t as Button } from "./button-npk6vMbG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-BAS5S4st.js
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
function WalletSettingsScreen() {
	const logout = useWallet((s) => s.logout);
	const addresses = useWallet((s) => s.addresses);
	const role = useWallet((s) => s.role);
	const copy = t();
	const navigate = useNavigate();
	const words = demoSeedPhrase();
	const unique = Object.entries(addresses);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: copy.wallet.settings,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
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
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "text-sm font-medium text-muted",
							children: copy.wallet.phrase
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs text-warning",
							children: copy.wallet.phraseWarn
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3",
							children: words.map((w, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "rounded-md bg-card px-3 py-2 font-mono text-sm shadow-border",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "text-muted",
										children: [i + 1, "."]
									}),
									" ",
									w
								]
							}, w))
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
