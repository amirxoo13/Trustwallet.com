import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as LogoMark } from "./logo-zPchK5wD.mjs";
import { g as Outlet, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { v as useWallet } from "./router-CsPoWHrR.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/route-PegAZhsN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AuthGate({ children }) {
	const hydrated = useWallet((s) => s.hydrated);
	const authenticated = useWallet((s) => s.authenticated);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (hydrated && !authenticated) navigate({ to: "/login" });
	}, [
		hydrated,
		authenticated,
		navigate
	]);
	if (!hydrated || !authenticated) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { size: 40 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Trust"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function WalletLayout() {
	const settleDueSwaps = useWallet((s) => s.settleDueSwaps);
	(0, import_react.useEffect)(() => {
		settleDueSwaps();
		const id = window.setInterval(settleDueSwaps, 1e3);
		return () => window.clearInterval(id);
	}, [settleDueSwaps]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { WalletLayout as component };
