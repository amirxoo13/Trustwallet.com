import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn, t as LogoMark } from "./logo-zPchK5wD.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { S as useRouter, b as Link, p as useRouterState, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as runDueAlerts } from "./push-DUP21K8s.mjs";
import { A as Clock3, C as House, R as ArrowLeft, S as Infinity$1, a as TrendingUp, c as SlidersHorizontal, d as Settings, f as Search, r as UserRound, y as LogOut } from "../_libs/lucide-react.mjs";
import { _ as useSite, m as hasAdminProof, v as useWallet } from "./router-BAAEt4at.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-shell-DUOd2QiC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Ask the server to send any alert that is already due while this phone is open. */
function AlertScheduler() {
	(0, import_react.useEffect)(() => {
		const tick = () => {
			if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
			runDueAlerts({ data: { force: false } }).catch(() => void 0);
		};
		tick();
		const id = window.setInterval(tick, 9e5);
		const onShow = () => {
			if (document.visibilityState === "visible") tick();
		};
		document.addEventListener("visibilitychange", onShow);
		window.addEventListener("focus", tick);
		return () => {
			window.clearInterval(id);
			document.removeEventListener("visibilitychange", onShow);
			window.removeEventListener("focus", tick);
		};
	}, []);
	return null;
}
function WalletShell({ children, title, home = false }) {
	const logout = useWallet((s) => s.logout);
	const copy = t();
	const site = useSite();
	const role = useWallet((s) => s.role);
	const navigate = useNavigate();
	const router = useRouter();
	const path = useRouterState({ select: (s) => s.location.pathname });
	const isHome = path === "/wallet" || path === "/wallet/";
	const backTo = isHome ? "/" : "/wallet";
	function goBack() {
		const idx = window.history.state?.idx;
		if (typeof idx === "number" && idx > 0) {
			router.history.back();
			return;
		}
		navigate({ to: backTo });
	}
	function openSearch() {
		sessionStorage.setItem("aurex-open-find", "1");
		if (!isHome) {
			navigate({ to: "/wallet" });
			return;
		}
		window.dispatchEvent(new Event("aurex-find"));
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
			to: "/wallet/perps",
			icon: Infinity$1,
			label: "Perps",
			match: (p) => p.startsWith("/wallet/perps")
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
	const dock = [
		{
			to: "/wallet",
			kind: "home",
			label: site.tabHome,
			match: (p) => p === "/wallet" || p === "/wallet/"
		},
		{
			to: "/wallet/markets",
			kind: "chart",
			label: site.tabMarkets,
			match: (p) => p.startsWith("/wallet/markets")
		},
		{
			to: "/wallet/perps",
			kind: "infinity",
			label: "Perps",
			match: (p) => p.startsWith("/wallet/perps")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertScheduler, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
						role === "admin" && hasAdminProof() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
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
					className: "flex min-w-0 flex-1 flex-col pb-24 md:pb-0",
					children: [!home && title ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "sticky top-[var(--safe-top)] z-20 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/95 px-4 backdrop-blur-md",
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
						}), role === "admin" && hasAdminProof() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
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
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "pointer-events-none fixed inset-x-0 bottom-0 z-30 flex items-center justify-center gap-2 px-3 pb-[max(0.6rem,env(safe-area-inset-bottom))] md:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pointer-events-auto flex h-14 min-w-0 flex-1 max-w-xs items-center justify-around rounded-full bg-card/95 px-1 shadow-border backdrop-blur-xl",
					children: dock.map((item) => {
						const active = item.match(path);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: item.to,
							"aria-label": item.label,
							className: cn("flex h-11 w-12 items-center justify-center rounded-full text-muted", active && "bg-foreground/10 text-foreground"),
							children: item.kind === "home" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeMark, { solid: active }) : item.kind === "chart" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, {
								className: "size-5",
								strokeWidth: 1.75
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Infinity$1, {
								className: "size-5",
								strokeWidth: 1.75
							})
						}, item.to);
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: openSearch,
					"aria-label": copy.wallet.search,
					className: "pointer-events-auto flex size-14 shrink-0 items-center justify-center rounded-full bg-card/95 text-foreground shadow-border backdrop-blur-xl",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
						className: "size-5",
						strokeWidth: 1.75
					})
				})]
			})
		]
	});
}
function HomeMark({ solid }) {
	if (!solid) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {
		className: "size-5",
		strokeWidth: 1.75
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 24 24",
		className: "size-5",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			fill: "currentColor",
			d: "M12 3.15 3.4 10.1c-.25.2-.4.5-.4.82V20a1.6 1.6 0 0 0 1.6 1.6h4.7v-6.1h5.4v6.1h4.7A1.6 1.6 0 0 0 21 20v-9.08c0-.32-.15-.62-.4-.82L12 3.15Z"
		})
	});
}
//#endregion
export { WalletShell as t };
