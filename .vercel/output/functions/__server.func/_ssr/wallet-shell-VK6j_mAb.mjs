import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn, t as LogoMark } from "./logo-DRST8Ft6.mjs";
import { t } from "./i18n-BCR4HeH-.mjs";
import { S as useRouter, b as Link, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { T as ArrowLeftRight, a as SlidersHorizontal, c as Settings, f as LogOut, i as TrendingUp, m as House, n as UserRound, w as ArrowLeft, y as Clock3 } from "../_libs/lucide-react.mjs";
import { C as useSite, w as useWallet } from "./router-BcEbiCRg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-shell-VK6j_mAb.js
var import_jsx_runtime = require_jsx_runtime();
function WalletShell({ children, title }) {
	const logout = useWallet((s) => s.logout);
	const copy = t();
	const site = useSite();
	const role = useWallet((s) => s.role);
	const navigate = useNavigate();
	const router = useRouter();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const backTo = path === "/wallet" || path === "/wallet/" ? "/" : "/wallet";
	function goBack() {
		const idx = window.history.state?.idx;
		if (typeof idx === "number" && idx > 0) {
			router.history.back();
			return;
		}
		navigate({ to: backTo });
	}
	const items = [
		{
			to: "/wallet",
			icon: House,
			label: site.tabHome,
			match: (p) => p === "/wallet" || p === "/wallet/"
		},
		{
			to: "/wallet/markets",
			icon: TrendingUp,
			label: site.tabMarkets,
			match: (p) => p.startsWith("/wallet/markets")
		},
		{
			to: "/wallet/swap",
			icon: ArrowLeftRight,
			label: site.tabSwap,
			match: (p) => p.startsWith("/wallet/swap")
		},
		{
			to: "/wallet/activity",
			icon: Clock3,
			label: site.tabActivity,
			match: (p) => p.startsWith("/wallet/activity")
		},
		{
			to: "/wallet/profile",
			icon: UserRound,
			label: site.tabProfile,
			match: (p) => p.startsWith("/wallet/profile")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "sticky top-0 hidden h-dvh w-[88px] shrink-0 flex-col items-center border-e border-border py-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/wallet",
						className: "mb-6",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { size: 32 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1",
						children: items.map((item) => {
							const active = item.match(path);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex size-14 flex-col items-center justify-center gap-1 rounded-lg text-[10px] text-muted transition-colors duration-150", active && "bg-card text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
							}, item.to);
						})
					}),
					role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: cn("flex size-14 items-center justify-center rounded-lg text-muted", path.startsWith("/studio") && "bg-card text-foreground"),
						"aria-label": "Control panel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-5" })
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/wallet/settings",
						className: cn("flex size-14 items-center justify-center rounded-lg text-muted", path.startsWith("/wallet/settings") && "bg-card text-foreground"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Settings, { className: "size-5" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "mt-1 flex size-14 items-center justify-center rounded-lg text-muted",
						onClick: () => {
							logout();
							navigate({ to: "/" });
						},
						"aria-label": copy.wallet.logout,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-5" })
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col pb-20 md:pb-0",
				children: [title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 z-20 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: goBack,
							className: "inline-flex size-11 shrink-0 items-center justify-center rounded-md text-muted",
							"aria-label": "Back",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "truncate font-display text-sm font-semibold",
							children: title
						})]
					}), role === "admin" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/studio",
						className: "inline-flex size-11 items-center justify-center rounded-md text-muted",
						"aria-label": "Control panel",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "size-5" })
					}) : null]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex-1",
					children
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden",
			children: items.map((item) => {
				const active = item.match(path);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: item.to,
					className: cn("flex min-h-16 flex-col items-center justify-center gap-1 text-[10px] text-muted", active && "text-foreground"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5" }), item.label]
				}, item.to);
			})
		})]
	});
}
//#endregion
export { WalletShell as t };
