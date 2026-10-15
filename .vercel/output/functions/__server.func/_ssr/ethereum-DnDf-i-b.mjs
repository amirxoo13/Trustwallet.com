import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as CLIENT_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { t as WalletShell } from "./wallet-shell-9PZQg6T9.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { _ as useWallet } from "./router-Bs5W9wEE.mjs";
import { t as Button } from "./button-D-wMd01I.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ethereum-DnDf-i-b.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADDRESS = "0x7a91e803Db0E58b6Fecc4E42c86B366778475E3c";
var ETH_BALANCE = "80,001.289956746261423 ETH";
var ETH_VALUE = "$201,520,849.36";
var ETH_PRICE = "@ $2,518.97/ETH";
function EthAccountScreen() {
	const accountEmail = useWallet((s) => s.accountEmail);
	const allowed = useWallet((s) => s.role) === "admin" || accountEmail === CLIENT_ACCOUNT.email.toLowerCase();
	const [copied, setCopied] = (0, import_react.useState)(false);
	if (!allowed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: "Ethereum",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Ethereum"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-sm text-muted",
					children: "This account is empty."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					variant: "outline",
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/wallet",
						children: "Back"
					})
				})
			]
		})
	});
	async function copyAddress() {
		try {
			await navigator.clipboard.writeText(ADDRESS);
			setCopied(true);
			toast.success("Address copied");
			window.setTimeout(() => setCopied(false), 1600);
		} catch {
			toast.error("Could not copy the address.");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: "Ethereum",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-lg px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: "Second account"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-2xl font-semibold",
					children: "Ethereum"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 rounded-2xl bg-card p-4 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-11 place-items-center rounded-full bg-[#627EEA] text-sm font-semibold text-white",
								children: "ETH"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm text-muted",
								children: "Address"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Ethereum"
							})] })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 break-all font-mono text-sm leading-relaxed",
							children: ADDRESS
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							variant: "outline",
							size: "sm",
							className: "mt-3",
							onClick: () => void copyAddress(),
							children: copied ? "Copied" : "Copy address"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 rounded-xl bg-card px-4 py-3 text-sm shadow-border",
					children: "5 unread messages"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-muted",
						children: "Overview"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 divide-y divide-border rounded-2xl bg-card shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "ETH Balance"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 break-all font-mono text-base font-medium",
								children: ETH_BALANCE
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "px-4 py-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "ETH Value"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xl font-semibold tracking-tight",
									children: ETH_VALUE
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted",
									children: ETH_PRICE
								})
							]
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-muted",
						children: "Token Holdings"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex items-center justify-between gap-3 rounded-2xl bg-card px-4 py-4 shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "grid size-10 place-items-center rounded-full bg-[#627EEA] text-xs font-semibold text-white",
								children: "ETH"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-medium",
								children: "Ethereum"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: "ETH"
							})] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "font-mono text-sm",
								children: "80,001.28995675"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted",
								children: ETH_VALUE
							})]
						})]
					})]
				})
			]
		})
	});
}
var SplitComponent = EthAccountScreen;
//#endregion
export { SplitComponent as component };
