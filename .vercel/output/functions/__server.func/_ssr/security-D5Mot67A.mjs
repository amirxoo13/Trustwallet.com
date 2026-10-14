import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { f as useSite } from "./router-UneqD-en.mjs";
import { t as MarketingShell } from "./marketing-shell-CmvEZP0Y.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/security-D5Mot67A.js
var import_jsx_runtime = require_jsx_runtime();
function SecurityScreen() {
	const site = useSite();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-3xl px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-3xl font-semibold tracking-tight",
				children: site.securityPageTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-muted",
				children: site.securityPageSub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-4",
				children: [[
					{
						t: site.security1t,
						d: site.security1d
					},
					{
						t: site.security2t,
						d: site.security2d
					},
					{
						t: site.security3t,
						d: site.security3d
					}
				].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl bg-card p-6 shadow-border",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg font-semibold",
						children: item.t
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted",
						children: item.d
					})]
				}, item.t)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pt-4 text-sm text-muted",
					children: site.footerLegal
				})]
			})
		]
	}) });
}
var SplitComponent = SecurityScreen;
//#endregion
export { SplitComponent as component };
