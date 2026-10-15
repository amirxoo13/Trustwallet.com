import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { j as ChevronLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Cg3zre7H.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PASSCODE_KEY = "trust-passcode";
function WelcomeScreen() {
	const navigate = useNavigate();
	const [step, setStep] = (0, import_react.useState)("home");
	const [first, setFirst] = (0, import_react.useState)("");
	const [code, setCode] = (0, import_react.useState)("");
	const [shake, setShake] = (0, import_react.useState)(false);
	function press(digit) {
		setCode((current) => {
			if (current.length >= 6) return current;
			const next = current + digit;
			if (next.length === 6) window.setTimeout(() => finish(next), 120);
			return next;
		});
	}
	function finish(next) {
		if (step === "create") {
			setFirst(next);
			setCode("");
			setStep("confirm");
			return;
		}
		if (next !== first) {
			setShake(true);
			setCode("");
			window.setTimeout(() => setShake(false), 400);
			toast.error("Passcodes do not match. Try again.");
			return;
		}
		localStorage.setItem(PASSCODE_KEY, next);
		sessionStorage.setItem("trust-after-passcode", "1");
		navigate({ to: "/login" });
	}
	async function fingerprint() {
		const supported = window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable;
		if (!supported) {
			toast.error("This phone has no fingerprint unlock.");
			return;
		}
		if (!await supported.call(window.PublicKeyCredential).catch(() => false)) {
			toast.error("This phone has no fingerprint unlock.");
			return;
		}
		toast.message("Create the 6-digit passcode first. Fingerprint can unlock it after the wallet exists.");
	}
	if (step === "home") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col px-6 text-white",
		style: {
			background: "linear-gradient(180deg, #07184f 0%, #0c2478 42%, #0a1c62 100%)",
			paddingTop: "calc(var(--safe-top) + 12px)",
			paddingBottom: "calc(var(--safe-bottom) + 18px)"
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: "/welcome-cube.jpg",
			alt: "",
			className: "mx-auto mt-6 w-full max-w-[22rem] object-contain"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-auto",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "max-w-[18rem] text-[2.05rem] leading-[1.12] font-semibold tracking-tight",
					children: [
						"Your one-stop",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Web3 wallet"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-8 h-14 w-full rounded-full text-[17px] font-semibold",
					style: { background: "linear-gradient(180deg, #4b7dff 0%, #2f62f6 100%)" },
					onClick: () => {
						setStep("create");
						setCode("");
						setFirst("");
					},
					children: "Create a wallet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "mt-3 h-14 w-full rounded-full text-[17px] font-semibold",
					style: { background: "#1d3f9e" },
					onClick: () => void navigate({ to: "/login" }),
					children: "I already have a wallet"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-4 text-center text-[13px] leading-relaxed text-white/80",
					children: [
						"By tapping any button, you agree and consent to our",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/security",
							className: "text-[#8eb0ff]",
							children: "Terms of Service"
						}),
						" ",
						"and",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/security",
							className: "text-[#8eb0ff]",
							children: "Privacy Policy"
						}),
						"."
					]
				})
			]
		})]
	});
	const title = step === "confirm" ? "Confirm passcode" : "Create passcode";
	const hint = step === "confirm" ? "Re-enter your passcode to confirm." : "Enter your passcode. Be sure to remember it so you can unlock your wallet.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col text-white",
		style: {
			background: "linear-gradient(180deg, #08184f 0%, #0d267c 50%, #0a1d68 100%)",
			paddingTop: "calc(var(--safe-top) + 8px)",
			paddingBottom: "calc(var(--safe-bottom) + 16px)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "ms-2 inline-flex size-11 items-center justify-center",
				onClick: () => setStep("home"),
				"aria-label": "Back",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-8 text-center text-[1.65rem] font-semibold tracking-tight",
				style: { textShadow: "0 0 18px rgb(255 255 255 / 0.35)" },
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: `mt-8 flex justify-center gap-2.5 px-4 ${shake ? "animate-pulse" : ""}`,
				children: Array.from({ length: 6 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "flex size-12 items-center justify-center rounded-lg border text-xl font-semibold",
					style: { borderColor: "rgb(170 198 255 / 0.85)" },
					children: code[i] ? "•" : ""
				}, i))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mx-auto mt-7 max-w-[20rem] text-center text-[15px] leading-snug font-medium",
				children: hint
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-auto grid grid-cols-3 gap-y-2 px-6 pt-8 text-center text-[2rem] font-medium",
				children: [
					[
						"1",
						"2",
						"3",
						"4",
						"5",
						"6",
						"7",
						"8",
						"9"
					].map((digit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-16",
						style: { textShadow: "0 0 12px rgb(255 255 255 / 0.55)" },
						onClick: () => press(digit),
						children: digit
					}, digit)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex h-16 items-center justify-center",
						onClick: () => void fingerprint(),
						"aria-label": "Fingerprint",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Fingerprint, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "h-16",
						style: { textShadow: "0 0 12px rgb(255 255 255 / 0.55)" },
						onClick: () => press("0"),
						children: "0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "flex h-16 items-center justify-center",
						onClick: () => setCode((c) => c.slice(0, -1)),
						"aria-label": "Delete",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex h-10 w-14 items-center justify-center rounded-md text-lg",
							style: { background: "#3d6dff" },
							children: "⌫"
						})
					})
				]
			})
		]
	});
}
function Fingerprint() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 48 48",
		className: "size-10",
		fill: "none",
		stroke: "#7eb0ff",
		strokeWidth: "2.2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 24c.4 6 2.2 10 4.6 13" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 18v14c0 3.2-1.2 6.2-2.6 8" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M30 20c1 6 .2 11-2 16" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 24c.3 5 .2 9-1.2 13" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M18 16c1.6-2.2 4-3.4 6.6-3.4 4.6 0 8.4 3.6 8.4 8.2 0 4.2-.6 7.4-1.8 11" })
		]
	});
}
var SplitComponent = WelcomeScreen;
//#endregion
export { SplitComponent as component };
