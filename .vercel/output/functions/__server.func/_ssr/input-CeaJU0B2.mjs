import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-B62MTmeK.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/input-CeaJU0B2.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	ref,
	className: cn("flex h-12 w-full rounded-md bg-input px-3 text-sm text-foreground shadow-border outline-none transition-[box-shadow] duration-150 placeholder:text-muted focus-visible:shadow-[0_0_0_1px_var(--color-primary)] disabled:opacity-40", className),
	...props
}));
Input.displayName = "Input";
//#endregion
export { Input as t };
