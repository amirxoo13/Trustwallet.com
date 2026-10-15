import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as registerAccount } from "./accounts-DQQJ4uAk.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { E as EyeOff, T as Eye } from "../_libs/lucide-react.mjs";
import { a as track, c as setHoldPush, g as useWallet, h as useSite, o as refreshCloud } from "./router-CGZycW4i.mjs";
import { t as Button } from "./button-qvMo8MB4.mjs";
import { t as Input } from "./input-CYxudbNd.mjs";
import { t as Label } from "./label-BAZToL4V.mjs";
import { t as MarketingShell } from "./marketing-shell-DY8hiX1D.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-JaT7Crui.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginScreen() {
	const login = useWallet((s) => s.login);
	const copy = t();
	const brandName = useSite((s) => s.brandName);
	const loginTitle = useSite((s) => s.loginTitle);
	const loginSub = useSite((s) => s.loginSub);
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [confirm, setConfirm] = (0, import_react.useState)("");
	const [show, setShow] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	async function onSubmit(e) {
		e.preventDefault();
		setError("");
		if (mode === "signup") {
			if (password.length < 8) {
				setError("Use at least 8 characters.");
				return;
			}
			if (password !== confirm) {
				setError("Passwords do not match.");
				return;
			}
		}
		setBusy(true);
		setHoldPush(true);
		try {
			if (mode === "signup") {
				const created = await registerAccount({ data: {
					email,
					password
				} });
				if (!created.ok) {
					track("action", "Signup failed");
					setError(created.error === "taken" ? "That email is already registered." : created.error === "weak" ? "Use at least 8 characters." : "Enter a valid email.");
					return;
				}
				track("action", `Created account ${email.trim().toLowerCase()}`);
			}
			if (!(await login(email, password)).ok) {
				track("action", "Login failed");
				setError(copy.login.error);
				return;
			}
			track("action", useWallet.getState().role === "admin" ? "Signed in as admin" : `Signed in as ${email.trim().toLowerCase()}`);
			await refreshCloud();
			navigate({ to: "/wallet" });
		} catch {
			setError("Could not reach the server. Try again.");
		} finally {
			setHoldPush(false);
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MarketingShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
				children: brandName
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-2xl font-semibold tracking-tight",
				children: mode === "signup" ? "Create account" : loginTitle
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: mode === "signup" ? "Use any email. No code is required." : loginSub
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
								autoComplete: mode === "signup" ? "new-password" : "current-password",
								value: password,
								onChange: (e) => setPassword(e.target.value),
								className: "pe-12",
								required: true,
								minLength: mode === "signup" ? 8 : 1
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "absolute top-0 end-0 inline-flex size-12 items-center justify-center text-muted",
								onClick: () => setShow((v) => !v),
								"aria-label": show ? "Hide password" : "Show password",
								children: show ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" })
							})]
						})]
					}),
					mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
							htmlFor: "confirm",
							children: "Confirm password"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							id: "confirm",
							type: show ? "text" : "password",
							autoComplete: "new-password",
							value: confirm,
							onChange: (e) => setConfirm(e.target.value),
							required: true
						})]
					}) : null,
					error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-danger",
						children: error
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						variant: "solid",
						size: "lg",
						disabled: busy,
						children: mode === "signup" ? "Create account" : copy.login.submit
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "mt-4 text-sm text-muted hover:text-foreground",
				onClick: () => {
					setMode((m) => m === "signin" ? "signup" : "signin");
					setError("");
				},
				children: mode === "signup" ? "Already have an account? Sign in" : "Create an account with another email"
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
