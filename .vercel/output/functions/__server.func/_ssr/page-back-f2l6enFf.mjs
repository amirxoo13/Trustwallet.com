import { S as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-B62MTmeK.mjs";
import { R as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/page-back-f2l6enFf.js
var import_jsx_runtime = require_jsx_runtime();
function PageBack({ to, label = "Back", className }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: () => {
			const idx = window.history.state?.idx;
			if (typeof idx === "number" && idx > 0) {
				router.history.back();
				return;
			}
			router.navigate({ to });
		},
		className: cn("inline-flex h-11 items-center gap-2 text-sm text-muted transition-colors duration-150 hover:text-foreground", className),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), label]
	});
}
//#endregion
export { PageBack as t };
