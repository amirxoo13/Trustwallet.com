import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-DRST8Ft6.mjs";
import { t } from "./i18n-BCR4HeH-.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as EyeOff, h as Eye } from "../_libs/lucide-react.mjs";
import { C as useSite, S as useLoginWindow, b as remainingMs, c as SCENARIO_CODES, i as saveCloudNow, p as formatCountdown, r as refreshCloud, s as LOGIN_WINDOW_MS, w as useWallet, y as isClientEmail } from "./router-BcEbiCRg.mjs";
import { t as Button } from "./button-BHlko9W-.mjs";
import { t as Input } from "./input-DaNhXpBd.mjs";
import { t as Label } from "./label-Dvyb8bNe.mjs";
import { t as MarketingShell } from "./marketing-shell-CaT6kS-_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-D1kj3NjI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginTimer({ arm }) {
	const startedAt = useLoginWindow((s) => s.startedAt);
	const hydrated = useLoginWindow((s) => s.hydrated);
	const ensureStarted = useLoginWindow((s) => s.ensureStarted);
	const [now, setNow] = (0, import_react.useState)(() => Date.now());
	(0, import_react.useEffect)(() => {
		if (!hydrated || !arm) return;
		const before = useLoginWindow.getState().startedAt;
		ensureStarted();
		if (!before) saveCloudNow(true);
	}, [
		hydrated,
		arm,
		ensureStarted
	]);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setNow(Date.now()), 200);
		return () => window.clearInterval(id);
	}, []);
	if (!hydrated) return null;
	if (!startedAt && !arm) return null;
	const left = remainingMs(startedAt, now);
	const expired = Boolean(startedAt) && left <= 0;
	const pct = Math.min(100, left / LOGIN_WINDOW_MS * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-card px-5 py-4 shadow-border",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium tracking-[0.18em] text-muted uppercase",
					children: expired ? "Access window closed" : "Access window"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("font-mono text-2xl font-medium tabular tracking-tight", expired ? "text-danger" : left > 0 && left <= 3e4 ? "text-warning" : "text-foreground"),
					children: formatCountdown(left)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 h-1 overflow-hidden rounded-full bg-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: cn("h-full rounded-full transition-[width] duration-200", expired ? "bg-danger" : "bg-primary"),
					style: { width: `${pct}%` }
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 text-xs leading-relaxed text-muted",
				children: expired ? "The 3-minute sign-in window has ended. Ask the admin to reset the timer." : "You have 3 minutes to unlock this wallet."
			})
		]
	});
}
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
	const clientArm = isClientEmail(email);
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
	const errorText = error === "expired" ? "The access window has closed. Ask the admin to reset the 3-minute timer." : error === "scenario" ? "Select T20, F20 or K20 to continue." : error ? copy.login.error : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoginTimer, { arm: clientArm }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: brandName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-3xl font-semibold tracking-tight",
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
