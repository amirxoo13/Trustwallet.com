import { o as __toESM } from "../_runtime.mjs";
import { a as usdPrice, n as COIN_BY_ID } from "./coins-dlbZHcb_.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-DRST8Ft6.mjs";
import { t } from "./i18n-BCR4HeH-.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as ArrowDownLeft, S as ArrowUpRight, T as ArrowLeftRight, g as EyeOff, h as Eye, u as Plus } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-VK6j_mAb.mjs";
import { C as useSite, _ as formatUsdFull, f as formatAmount, m as formatPct, w as useWallet } from "./router-BcEbiCRg.mjs";
import { t as CoinIcon } from "./coin-icon-DPqQLt6l.mjs";
import { n as useMarketMap, r as useMarkets } from "./use-markets-huDQs5_X.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/wallet-fcARHaB_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WalletHomeScreen() {
	const holdings = useWallet((s) => s.holdings);
	const hide = useWallet((s) => s.hideBalances);
	const toggle = useWallet((s) => s.toggleHideBalances);
	const profile = useWallet((s) => s.profile);
	const site = useSite();
	const walletName = site.walletName;
	const copy = t();
	const markets = useMarketMap();
	const q = useMarkets();
	const [qtext, setQtext] = (0, import_react.useState)("");
	const kycIncomplete = !profile.firstName || !profile.lastName || !profile.phone || !profile.nationalId || !profile.licensePhoto;
	const rows = (0, import_react.useMemo)(() => {
		return holdings.map((h) => {
			const meta = COIN_BY_ID[h.id];
			const m = markets[h.id];
			const price = usdPrice(h.id, m?.price);
			return {
				...h,
				meta,
				price,
				usd: h.amount * price,
				change: m?.change24h ?? 0,
				image: m?.image ?? meta?.image
			};
		}).filter((r) => r.meta).sort((a, b) => b.usd - a.usd || a.meta.symbol.localeCompare(b.meta.symbol));
	}, [holdings, markets]);
	const total = rows.reduce((s, r) => s + r.usd, 0);
	const changeUsd = rows.reduce((s, r) => s + r.usd * (r.change / 100), 0);
	const changePct = total > 0 ? changeUsd / (total - changeUsd) * 100 : 0;
	const filtered = rows.filter((r) => {
		const tq = qtext.trim().toLowerCase();
		if (!tq) return true;
		return r.meta.name.toLowerCase().includes(tq) || r.meta.symbol.toLowerCase().includes(tq);
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: walletName,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-xl px-4 py-8 md:max-w-2xl md:py-10",
			children: [
				kycIncomplete ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/wallet/profile",
					className: "mb-6 flex items-center justify-between gap-3 rounded-xl bg-accent-soft px-4 py-3 text-sm text-primary",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: copy.wallet.kycBanner }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 font-medium",
						children: copy.wallet.kycCta
					})]
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs tracking-wide text-muted uppercase",
							children: walletName
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 font-display text-4xl font-semibold tracking-tight tabular",
							children: hide ? "••••••" : q.isLoading && total === 0 ? "—" : formatUsdFull(total)
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: cn("mt-2 text-sm tabular", changePct >= 0 ? "text-success" : "text-danger"),
							children: hide ? "" : `${changePct >= 0 ? "+" : ""}${formatUsdFull(changeUsd)} (${formatPct(changePct)})`
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: toggle,
						className: "inline-flex size-11 items-center justify-center rounded-full text-muted shadow-border",
						"aria-label": hide ? copy.wallet.show : copy.wallet.hide,
						children: hide ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 grid grid-cols-4 gap-2",
					children: [
						{
							to: "/wallet/send",
							icon: ArrowUpRight,
							label: site.actionSend
						},
						{
							to: "/wallet/receive",
							icon: ArrowDownLeft,
							label: site.actionReceive
						},
						{
							to: "/wallet/swap",
							icon: ArrowLeftRight,
							label: site.tabSwap
						},
						{
							to: "/wallet/buy",
							icon: Plus,
							label: site.actionBuy
						}
					].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: a.to,
						className: "flex flex-col items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-14 items-center justify-center rounded-full bg-card-elevated shadow-border",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "size-5" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: a.label
						})]
					}, a.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex items-center justify-between",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-base font-semibold",
						children: copy.wallet.assets
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: qtext,
					onChange: (e) => setQtext(e.target.value),
					placeholder: copy.wallet.search,
					className: "mt-3 h-11 w-full rounded-md bg-card px-3 text-sm shadow-border outline-none placeholder:text-muted"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 divide-y divide-border",
					children: filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "py-10 text-center text-sm text-muted",
						children: copy.wallet.empty
					}) : filtered.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/wallet/asset/$id",
						params: { id: r.id },
						className: "flex items-center gap-3 py-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
							id: r.id,
							symbol: r.meta.symbol,
							image: r.image
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: r.meta.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "tabular",
									children: hide ? "••" : formatUsdFull(r.usd)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-0.5 flex items-center justify-between text-xs text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "tabular",
									children: [
										hide ? "••" : formatAmount(r.amount),
										" ",
										r.meta.symbol
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: r.change >= 0 ? "text-success" : "text-danger",
									children: formatPct(r.change)
								})]
							})]
						})]
					}, r.id))
				})
			]
		})
	});
}
var SplitComponent = WalletHomeScreen;
//#endregion
export { SplitComponent as component };
