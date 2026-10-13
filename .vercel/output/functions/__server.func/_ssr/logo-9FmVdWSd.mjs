import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { y as useSite } from "./router-BGBTbSuk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/logo-9FmVdWSd.js
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
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src: "/logo.png",
		alt: "",
		width: size,
		height: size,
		className: cn("shrink-0 rounded-md object-cover", className),
		style: {
			width: size,
			height: size
		}
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
