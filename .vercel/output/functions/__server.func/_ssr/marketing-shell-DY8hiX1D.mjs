import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, p as useRouterState } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as LogoWord, r as cn } from "./logo-BZNAHviC.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { t as X, v as Menu } from "../_libs/lucide-react.mjs";
import { f as hasAdminProof, g as useWallet, h as useSite } from "./router-CGZycW4i.mjs";
import { t as Button } from "./button-qvMo8MB4.mjs";
import { t as PageBack } from "./page-back-Bf4s3mGy.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/marketing-shell-DY8hiX1D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	const copy = t();
	const site = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "border-t border-border",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoWord, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-sm text-sm leading-relaxed text-muted",
						children: site.tagline
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: copy.footer.product
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex flex-col gap-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/markets",
							className: "hover:text-foreground",
							children: site.navMarkets
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/features",
							className: "hover:text-foreground",
							children: site.navFeatures
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/security",
							className: "hover:text-foreground",
							children: site.navSecurity
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium tracking-wide text-muted uppercase",
					children: copy.footer.company
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex flex-col gap-2 text-sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						className: "hover:text-foreground",
						children: site.navOpenWallet
					})
				})] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto max-w-6xl px-4 py-5 text-xs text-muted",
				children: site.footerLegal
			})
		})]
	});
}
function SiteHeader() {
	const authenticated = useWallet((s) => s.authenticated);
	const hydrated = useWallet((s) => s.hydrated);
	const role = useWallet((s) => s.role);
	const site = useSite();
	const [open, setOpen] = (0, import_react.useState)(false);
	const path = useRouterState({ select: (s) => s.location.pathname });
	const links = [
		{
			to: "/markets",
			label: site.navMarkets
		},
		{
			to: "/features",
			label: site.navFeatures
		},
		{
			to: "/security",
			label: site.navSecurity
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "sticky top-[var(--safe-top)] z-40 border-b border-border bg-background/95 backdrop-blur-md",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-14 max-w-6xl items-center justify-between gap-2 px-3 sm:h-16 sm:px-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "min-w-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoWord, { className: "truncate" })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-7 text-sm text-muted md:flex",
					children: links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: l.to,
						className: cn("transition-colors duration-150 hover:text-foreground", path === l.to && "text-foreground"),
						children: l.label
					}, l.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2",
					children: [
						hydrated && authenticated && role === "admin" && hasAdminProof() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/studio",
							className: "hidden h-9 items-center rounded-full px-3 text-xs text-muted shadow-border sm:inline-flex",
							children: "Panel"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							size: "sm",
							variant: "solid",
							className: "rounded-full px-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: hydrated && authenticated ? "/wallet" : "/login",
								children: hydrated && authenticated ? site.navOpenWallet : site.navLogin
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "inline-flex size-11 items-center justify-center rounded-md md:hidden",
							onClick: () => setOpen((v) => !v),
							"aria-label": "Menu",
							children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-5" })
						})
					]
				})
			]
		}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "border-t border-border px-4 py-3 md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-col gap-1",
				children: [links.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: l.to,
					onClick: () => setOpen(false),
					className: "rounded-md px-3 py-3 text-sm text-foreground",
					children: l.label
				}, l.to)), hydrated && authenticated && role === "admin" && hasAdminProof() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/studio",
					onClick: () => setOpen(false),
					className: "rounded-md px-3 py-3 text-sm text-foreground",
					children: "Control panel"
				}) : null]
			})
		}) : null]
	});
}
function MarketingShell({ children }) {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			path !== "/" && path !== "" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto max-w-6xl px-4 pt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBack, { to: "/" })
			}) : null,
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { MarketingShell as t };
