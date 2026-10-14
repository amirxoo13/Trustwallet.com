import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { F as ChartLine, I as ArrowUpRight, O as CreditCard, V as ArrowDownLeft, l as Shield, z as ArrowLeftRight } from "../_libs/lucide-react.mjs";
import { _ as useSite } from "./router-BAAEt4at.mjs";
import { t as MarketingShell } from "./marketing-shell-CmvEZP0Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/features-CC1xtk_9.js
var import_jsx_runtime = require_jsx_runtime();
function FeaturesScreen() {
	const copy = t();
	const featuresTitle = useSite((s) => s.featuresTitle);
	const featuresSub = useSite((s) => s.featuresSub);
	const items = [
		{
			icon: ArrowUpRight,
			t: copy.wallet.send,
			d: "Send crypto to any compatible address. Network fees are shown before you confirm."
		},
		{
			icon: ArrowDownLeft,
			t: copy.wallet.receive,
			d: "Share your address or QR code to receive funds on the selected network."
		},
		{
			icon: ArrowLeftRight,
			t: copy.wallet.swap,
			d: "Swap at a live market rate with a 0.3% fee, both balances update immediately."
		},
		{
			icon: CreditCard,
			t: copy.wallet.buy,
			d: "Buy crypto with a card. The amount is credited to this wallet."
		},
		{
			icon: ChartLine,
			t: copy.markets.title,
			d: "Live prices and charts from public market APIs."
		},
		{
			icon: Shield,
			t: copy.profile.title,
			d: "Keep your identity details with this wallet: name, address, phone, ID photo."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-6xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: featuresTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-xl text-muted",
				children: featuresSub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
				children: items.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-6 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-lg font-semibold",
							children: item.t
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm leading-relaxed text-muted",
							children: item.d
						})
					]
				}, item.t))
			})
		]
	}) });
}
var SplitComponent = FeaturesScreen;
//#endregion
export { SplitComponent as component };
