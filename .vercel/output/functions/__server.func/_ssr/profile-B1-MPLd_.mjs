import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as WalletShell } from "./wallet-shell-CVGFt8iw.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { b as useWallet } from "./router-BGBTbSuk.mjs";
import { t as Button } from "./button-fib134dJ.mjs";
import { t as Input } from "./input-BuOvXFyv.mjs";
import { t as Label } from "./label-fCxTcUED.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-B1-MPLd_.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var EXPLORERS = [
	{
		name: "Blockchain.com",
		href: "https://www.blockchain.com/explorer/addresses/btc/bc1q2edayg4fecpvxnu88vwrewuw32klc4f2gqxfq6"
	},
	{
		name: "Blockstream",
		href: "https://blockstream.info/address/bc1q2edayg4fecpvxnu88vwrewuw32klc4f2gqxfq6"
	},
	{
		name: "mempool.space",
		href: "https://mempool.space/address/bc1q2edayg4fecpvxnu88vwrewuw32klc4f2gqxfq6"
	}
];
function readImage(file) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			const scale = Math.min(1, 900 / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.round(img.width * scale);
			canvas.height = Math.round(img.height * scale);
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				reject(/* @__PURE__ */ new Error("canvas"));
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", .82));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("image"));
		};
		img.src = url;
	});
}
function WalletProfileScreen() {
	const profile = useWallet((s) => s.profile);
	const setProfile = useWallet((s) => s.setProfile);
	const logout = useWallet((s) => s.logout);
	const copy = t();
	const navigate = useNavigate();
	const fileRef = (0, import_react.useRef)(null);
	const [form, setForm] = (0, import_react.useState)(profile);
	(0, import_react.useEffect)(() => {
		setForm(profile);
	}, [profile]);
	function set(key, value) {
		setForm((s) => ({
			...s,
			[key]: value
		}));
	}
	async function onFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			set("licensePhoto", await readImage(file));
		} catch {
			toast.error("Could not read that image.");
		}
	}
	function onSubmit(e) {
		e.preventDefault();
		if (!form.firstName.trim() || !form.lastName.trim() || !form.email.trim() || !form.address.trim() || !form.phone.trim() || !form.nationalId.trim() || !form.licensePhoto) {
			toast.error(copy.profile.required);
			return;
		}
		setProfile(form);
		toast.success(copy.profile.saved);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: copy.profile.title,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
			onSubmit,
			className: "mx-auto w-full max-w-lg px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display text-xl font-semibold",
							children: copy.profile.title
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-sm text-muted",
							children: copy.profile.sub
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "outline",
						size: "sm",
						onClick: () => {
							logout();
							navigate({ to: "/" });
						},
						children: copy.wallet.logout
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 flex flex-col gap-3",
					children: EXPLORERS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						size: "lg",
						className: "w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: item.href,
							target: "_blank",
							rel: "noopener noreferrer",
							children: item.name
						})
					}, item.name))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium text-muted",
						children: "Second account"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "solid",
						size: "lg",
						className: "mt-3 w-full",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/wallet/ethereum",
							children: "Ethereum"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.profile.first }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.firstName,
							onChange: (e) => set("firstName", e.target.value),
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.profile.last }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.lastName,
							onChange: (e) => set("lastName", e.target.value),
							required: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.profile.email }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						type: "email",
						value: form.email,
						onChange: (e) => set("email", e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-4 flex flex-col gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.profile.address }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: form.address,
						onChange: (e) => set("address", e.target.value),
						required: true
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 sm:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.profile.phone }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.phone,
							onChange: (e) => set("phone", e.target.value),
							required: true
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.profile.nationalId }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.nationalId,
							onChange: (e) => set("nationalId", e.target.value),
							required: true
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.profile.license }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted",
							children: copy.profile.licenseHint
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => void onFile(e)
						}),
						form.licensePhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 overflow-hidden rounded-xl bg-card shadow-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: form.licensePhoto,
								alt: "ID document",
								className: "max-h-56 w-full object-contain"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex gap-2 p-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "outline",
									size: "sm",
									onClick: () => fileRef.current?.click(),
									children: "Replace"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "button",
									variant: "ghost",
									size: "sm",
									onClick: () => set("licensePhoto", null),
									children: copy.profile.remove
								})]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => fileRef.current?.click(),
							className: "mt-3 flex h-36 w-full items-center justify-center rounded-xl border border-dashed border-border-strong text-sm text-muted",
							children: "Upload photo"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "submit",
					variant: "solid",
					size: "lg",
					className: "mt-8 w-full",
					children: copy.profile.save
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					type: "button",
					variant: "outline",
					size: "lg",
					className: "mt-3 w-full",
					onClick: () => {
						logout();
						navigate({ to: "/" });
					},
					children: copy.wallet.logout
				})
			]
		})
	});
}
var SplitComponent = WalletProfileScreen;
//#endregion
export { SplitComponent as component };
