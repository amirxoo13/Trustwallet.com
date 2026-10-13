import { o as __toESM } from "../_runtime.mjs";
import { a as SCENARIO_CODES } from "./auth-config-Cgu_dNm0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-onkM7cXt.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as EyeOff, T as Eye } from "../_libs/lucide-react.mjs";
import { b as useWallet, r as refreshCloud, v as useLoginWindow, y as useSite } from "./router-DwIgdOrv.mjs";
import { t as Button } from "./button-1kai-bts.mjs";
import { t as Input } from "./input-JnakcaQL.mjs";
import { t as Label } from "./label-Ot07rSMe.mjs";
import { t as MarketingShell } from "./marketing-shell-CYUztN6a.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-BkWJHqnM.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginScreen() {
	const login = useWallet((s) => s.login);
	const savedScenario = useWallet((s) => s.scenario);
	const walletHydrated = useWallet((s) => s.hydrated);
	const lockedScenario = useLoginWindow((s) => s.lockedScenario);
	const windowHydrated = useLoginWindow((s) => s.hydrated);
	const copy = t();
	const brandName = useSite((s) => s.brandName);
	const loginTitle = useSite((s) => s.loginTitle);
	const loginSub = useSite((s) => s.loginSub);
	const navigate = useNavigate();
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [scenario, setScenario] = (0, import_react.useState)(null);
	const firstChoice = lockedScenario ?? savedScenario;
	const showCodes = walletHydrated && windowHydrated && !firstChoice;
	function onSubmit(e) {
		e.preventDefault();
		setBusy(true);
		const res = login(email, password, firstChoice ?? scenario);
		setBusy(false);
		if (!res.ok) {
			setError(res.error);
			return;
		}
		setError(null);
		refreshCloud();
		navigate({ to: "/wallet" });
	}
	const errorText = error === "scenario" ? "Select T20, F20 or K20 to continue." : error ? copy.login.error : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: brandName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-2xl font-semibold tracking-tight",
				children: loginTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: loginSub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit,
				className: "mt-8 flex flex-col gap-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "email",
							children: copy.login.email
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "email",
							type: "email",
							autoComplete: "username",
							value: email,
							onChange: (e) => setEmail(e.target.value),
							required: true
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "password",
							children: copy.login.password
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								id: "password",
								type: show ? "text" : "password",
								autoComplete: "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "pe-12",
								required: true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute top-0 end-0 inline-flex size-12 items-center justify-center text-muted",
								onClick: () => setShow((v) => !v),
								"aria-label": show ? "Hide password" : "Show password",
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						})]
					}),
					showCodes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs font-medium text-muted",
						children: "Select a code"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-3 gap-2",
						children: SCENARIO_CODES.map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setScenario(code),
							className: cn("flex h-12 items-center justify-center rounded-md font-mono text-sm tracking-wide shadow-border", scenario === code ? "bg-foreground text-background" : "bg-card text-foreground hover:bg-card-elevated"),
							children: code
						}, code))
					})] }) : null,
					errorText ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: errorText
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "solid",
						size: "lg",
						disabled: busy,
						children: copy.login.submit
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-6 text-center text-sm text-muted",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "hover:text-foreground",
					children: ["← ", brandName]
				})
			})
		]
	}) });
}
var SplitComponent = LoginScreen;
//#endregion
export { SplitComponent as component };
