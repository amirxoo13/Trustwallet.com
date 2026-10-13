import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { C as useSite } from "./router-BcEbiCRg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-DRST8Ft6.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function LogoMark({ className, size = 28 }) {
	const logo = useSite((s) => s.logo);
	if (logo) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: logo,
		alt: "",
		width: size,
		height: size,
		className: cn("shrink-0 rounded-md object-cover", className),
		style: {
			width: size,
			height: size
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		width: size,
		height: size,
		viewBox: "0 0 32 32",
		className: cn("shrink-0", className),
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				width: "32",
				height: "32",
				rx: "8",
				fill: "#2E6BFF"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 6.5 7.5 10.2v5.4c0 6 3.7 9.4 8.5 10.9 4.8-1.5 8.5-4.9 8.5-10.9v-5.4L16 6.5Z",
				fill: "#07080A"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 11.2v10.2",
				stroke: "#F4F6F8",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M12.2 14.2h7.6",
				stroke: "#F4F6F8",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			})
		]
	});
}
function LogoWord({ className }) {
	const brandName = useSite((s) => s.brandName);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("flex items-center gap-2 font-display text-[15px] font-semibold tracking-tight", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, {}), brandName]
	});
}
//#endregion
export { LogoWord as n, cn as r, LogoMark as t };
