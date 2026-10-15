import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as getCoin } from "./coins-Kac_SJvS.mjs";
import { r as cn } from "./logo-BZNAHviC.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/coin-icon-CBsybbTq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CoinIcon({ id, symbol, image, size = 36, className }) {
	const coin = id ? getCoin(id) : getCoin(symbol);
	const local = coin?.image?.startsWith("/") ? coin.image : void 0;
	const src = local || image || coin?.image;
	const [failed, setFailed] = (0, import_react.useState)(false);
	const color = coin?.color ?? "#2e6bff";
	const letter = (symbol || "?").slice(0, 1).toUpperCase();
	if (!src || failed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex shrink-0 items-center justify-center rounded-full font-display text-xs font-semibold text-foreground", className),
		style: {
			width: size,
			height: size,
			background: color
		},
		children: letter
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "",
		width: size,
		height: size,
		className: cn("shrink-0", local ? "bg-transparent" : "rounded-full bg-card-elevated outline outline-1 -outline-offset-1 outline-white/10", className),
		style: {
			width: size,
			height: size
		},
		onError: () => setFailed(true)
	});
}
//#endregion
export { CoinIcon as t };
