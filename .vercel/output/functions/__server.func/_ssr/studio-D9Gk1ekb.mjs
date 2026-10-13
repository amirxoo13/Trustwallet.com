import { o as __toESM } from "../_runtime.mjs";
import { n as CLIENT_ACCOUNT, r as COINS } from "./auth-config-Cgu_dNm0.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as LogoWord, t as LogoMark } from "./logo-onkM7cXt.mjs";
import { b as Link, x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useCloud, b as useWallet, g as holdingAmount, h as hasAdminProof, i as saveCloudNow, o as SITE_TEXT_FIELDS, y as useSite } from "./router-CBKnuIek.mjs";
import { t as Button } from "./button-1kai-bts.mjs";
import { t as CoinIcon } from "./coin-icon-BJEiOmq2.mjs";
import { t as Input } from "./input-JnakcaQL.mjs";
import { t as Label } from "./label-Ot07rSMe.mjs";
import { t as PageBack } from "./page-back-DpDP8gjJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/studio-D9Gk1ekb.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AdminGate({ children }) {
	const hydrated = useWallet((s) => s.hydrated);
	const authenticated = useWallet((s) => s.authenticated);
	const role = useWallet((s) => s.role);
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		if (!authenticated) {
			navigate({ to: "/login" });
			return;
		}
		if (role !== "admin" || !hasAdminProof()) navigate({ to: "/wallet" });
	}, [
		hydrated,
		authenticated,
		role,
		navigate
	]);
	if (!hydrated || !authenticated || role !== "admin" || !hasAdminProof()) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoMark, { size: 40 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm text-muted",
			children: "Trust"
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function readImageFile(file, max = 1100) {
	return new Promise((resolve, reject) => {
		const img = new Image();
		const url = URL.createObjectURL(file);
		img.onload = () => {
			const scale = Math.min(1, max / Math.max(img.width, img.height));
			const canvas = document.createElement("canvas");
			canvas.width = Math.max(1, Math.round(img.width * scale));
			canvas.height = Math.max(1, Math.round(img.height * scale));
			const ctx = canvas.getContext("2d");
			if (!ctx) {
				URL.revokeObjectURL(url);
				reject(/* @__PURE__ */ new Error("canvas"));
				return;
			}
			ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
			URL.revokeObjectURL(url);
			resolve(canvas.toDataURL("image/jpeg", .8));
		};
		img.onerror = () => {
			URL.revokeObjectURL(url);
			reject(/* @__PURE__ */ new Error("image"));
		};
		img.src = url;
	});
}
function Field({ label, value, onChange, multiline }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center justify-between gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-xs text-muted hover:text-foreground",
				onClick: () => onChange(""),
				children: "Clear"
			}) : null]
		}), multiline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
			value,
			onChange: (e) => onChange(e.target.value),
			rows: 3,
			className: "w-full rounded-md bg-input px-3 py-2 text-sm text-foreground shadow-border outline-none focus-visible:shadow-[0_0_0_1px_var(--color-primary)]"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			value,
			onChange: (e) => onChange(e.target.value)
		})]
	});
}
function ImagePick({ label, value, onChange }) {
	async function onFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			onChange(await readImageFile(file));
			toast.success("Image saved");
		} catch {
			toast.error("Could not read that image");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
		value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: value,
			alt: "",
			className: "mt-2 max-h-40 w-full rounded-lg object-contain bg-card"
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted",
			children: "No image yet — default artwork is used."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-2 flex gap-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "inline-flex h-10 cursor-pointer items-center rounded-md bg-card px-3 text-sm shadow-border",
				children: ["Upload", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					accept: "image/*",
					className: "hidden",
					onChange: (e) => void onFile(e)
				})]
			}), value ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "button",
				variant: "ghost",
				size: "sm",
				onClick: () => onChange(null),
				children: "Remove"
			}) : null]
		})
	] });
}
function TextGroup({ group, fields, site, set }) {
	const rows = fields.filter((f) => f.group === group);
	if (!rows.length) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "font-display text-lg font-semibold",
			children: group
		}), rows.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
			label: f.label,
			value: String(site[f.key] ?? ""),
			multiline: f.multiline,
			onChange: (v) => set(f.key, v)
		}, f.key))]
	});
}
function StudioScreen() {
	const [tab, setTab] = (0, import_react.useState)("brand");
	const [query, setQuery] = (0, import_react.useState)("");
	const site = useSite();
	const patch = useSite((s) => s.patch);
	const reset = useSite((s) => s.reset);
	const cloudPhase = useCloud((s) => s.phase);
	const lastSaved = useCloud((s) => s.lastSaved);
	const profile = useWallet((s) => s.profile);
	const setProfile = useWallet((s) => s.setProfile);
	const holdings = useWallet((s) => s.holdings);
	const setHolding = useWallet((s) => s.setHolding);
	const simulateIncoming = useWallet((s) => s.simulateIncoming);
	const [creditId, setCreditId] = (0, import_react.useState)("ethereum");
	const [creditAmt, setCreditAmt] = (0, import_react.useState)("0.05");
	function set(key, value) {
		patch({ [key]: value });
		saveCloudNow();
	}
	const q = query.trim().toLowerCase();
	const matches = (0, import_react.useMemo)(() => {
		if (!q) return [];
		return SITE_TEXT_FIELDS.filter((f) => {
			const val = String(site[f.key] ?? "").toLowerCase();
			return f.label.toLowerCase().includes(q) || f.group.toLowerCase().includes(q) || val.includes(q);
		});
	}, [q, site]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageBack, { to: "/wallet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogoWord, {})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/wallet",
					className: "text-muted hover:text-foreground",
					children: "Wallet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "text-muted hover:text-foreground",
					children: "Site"
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-3xl px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: "Control panel"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: cloudPhase === "local" ? "Could not reach the shared copy. Edits are only on this device until it reconnects." : cloudPhase === "boot" ? "Connecting to the shared copy…" : lastSaved ? "Saved for every browser and phone. Other devices pick it up within a few seconds." : "Edits save for every browser. Phones and other computers load the same text, images, profile, and balances."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Search all site text…",
					className: "mt-5"
				}),
				q ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6 grid gap-4",
					children: matches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: "No matching fields."
					}) : matches.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: `${f.group} · ${f.label}`,
						value: String(site[f.key] ?? ""),
						multiline: f.multiline,
						onChange: (v) => set(f.key, v)
					}, f.key))
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-wrap gap-2",
						children: [
							{
								id: "brand",
								label: "Brand"
							},
							{
								id: "pages",
								label: "Page text"
							},
							{
								id: "images",
								label: "Images"
							},
							{
								id: "profile",
								label: "Client"
							},
							{
								id: "balances",
								label: "Balances"
							},
							{
								id: "notices",
								label: "T20 / F20 / K20"
							}
						].map((x) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setTab(x.id),
							className: tab === x.id ? "h-10 rounded-full bg-foreground px-4 text-sm text-background" : "h-10 rounded-full px-4 text-sm text-muted shadow-border",
							children: x.label
						}, x.id))
					}),
					tab === "brand" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-6",
						children: [
							["Brand"].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextGroup, {
								group: g,
								fields: SITE_TEXT_FIELDS,
								site,
								set
							}, g)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePick, {
								label: "Logo",
								value: site.logo,
								onChange: (v) => set("logo", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => {
									reset();
									saveCloudNow();
								},
								children: "Reset brand & page text to defaults"
							})
						]
					}) : null,
					tab === "pages" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-6",
						children: [
							"Homepage hero",
							"Stats",
							"Assets + security + footer",
							"Login + inner pages"
						].map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextGroup, {
							group: g,
							fields: SITE_TEXT_FIELDS,
							site,
							set
						}, g))
					}) : null,
					tab === "images" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePick, {
								label: "Logo",
								value: site.logo,
								onChange: (v) => set("logo", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePick, {
								label: "Hero photo (replaces the phone mockup if set)",
								value: site.heroImage,
								onChange: (v) => set("heroImage", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePick, {
								label: "Assets / about photo",
								value: site.aboutImage,
								onChange: (v) => set("aboutImage", v)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ImagePick, {
								label: "Security photo",
								value: site.securityImage,
								onChange: (v) => set("securityImage", v)
							})
						]
					}) : null,
					tab === "profile" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-8 text-sm text-muted",
						children: [
							"Client wallet — ",
							CLIENT_ACCOUNT.email,
							". Every field and photo saves immediately. The client sees this on their profile."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProfileEditor, {
						profile,
						onSave: setProfile
					})] }) : null,
					tab === "balances" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-4",
						children: [COINS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: c.id,
									symbol: c.symbol,
									size: 28
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "w-24 text-sm leading-tight",
									children: [c.symbol, c.id === "tether" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-[10px] text-muted",
										children: "TRC20"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									inputMode: "decimal",
									className: "flex-1",
									defaultValue: String(holdingAmount(holdings, c.id)),
									onBlur: (e) => setHolding(c.id, Number(e.target.value) || 0)
								}, `${c.id}-${holdingAmount(holdings, c.id)}`)
							]
						}, c.id)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 rounded-xl bg-card p-4 shadow-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Credit incoming (Receive)"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
										value: creditId,
										onChange: (e) => setCreditId(e.target.value),
										className: "h-11 rounded-md bg-input px-3 text-sm text-foreground shadow-border",
										children: COINS.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: c.id,
											children: c.symbol
										}, c.id))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										className: "w-28",
										inputMode: "decimal",
										value: creditAmt,
										onChange: (e) => setCreditAmt(e.target.value)
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										type: "button",
										variant: "solid",
										onClick: () => {
											const n = Number(creditAmt);
											if (!n) return;
											simulateIncoming(creditId, n);
											toast.success("Incoming transfer added");
										},
										children: "Credit"
									})
								]
							})]
						})]
					}) : null,
					tab === "notices" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 grid gap-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextGroup, {
								group: "Send notices",
								fields: SITE_TEXT_FIELDS,
								site,
								set
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TextGroup, {
								group: "Send confirmation",
								fields: SITE_TEXT_FIELDS,
								site,
								set
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "text-xs text-muted",
								children: [
									"T20, F20, or K20 opens when the client taps Send, using the code from their first login. After they confirm the wallet address, confirmations run for the minutes you set. The code box opens on the last confirmation. Use ",
									"{current}",
									" and ",
									"{total}",
									" in the confirming line."
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "outline",
								onClick: () => {
									useWallet.getState().clearScenario();
									saveCloudNow(true);
									toast.success("T20 / F20 / K20 will show again on next client login");
								},
								children: "Show T20 / F20 / K20 on next client login"
							})
						]
					}) : null
				] })
			]
		})]
	});
}
function ProfileEditor({ profile, onSave }) {
	const [form, setForm] = (0, import_react.useState)(profile);
	(0, import_react.useEffect)(() => {
		setForm(profile);
	}, [profile]);
	function set(key, value) {
		setForm((s) => {
			const next = {
				...s,
				[key]: value
			};
			queueMicrotask(() => {
				onSave(next);
				saveCloudNow();
			});
			return next;
		});
	}
	async function onFile(e) {
		const file = e.target.files?.[0];
		if (!file) return;
		try {
			set("licensePhoto", await readImageFile(file));
			toast.success("Photo saved");
		} catch {
			toast.error("Could not read that image");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
		className: "mt-8 grid gap-4",
		onSubmit: (e) => {
			e.preventDefault();
			onSave(form);
			toast.success("Profile saved");
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "First name",
				value: form.firstName,
				onChange: (v) => set("firstName", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Last name",
				value: form.lastName,
				onChange: (v) => set("lastName", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Email",
				value: form.email,
				onChange: (v) => set("email", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Address",
				value: form.address,
				onChange: (v) => set("address", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Phone",
				value: form.phone,
				onChange: (v) => set("phone", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Citizenship / national ID",
				value: form.nationalId,
				onChange: (v) => set("nationalId", v)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "ID / license photo" }),
				form.licensePhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: form.licensePhoto,
					alt: "",
					className: "mt-2 max-h-48 rounded-lg object-contain"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-2 flex gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "inline-flex h-10 cursor-pointer items-center rounded-md bg-card px-3 text-sm shadow-border",
						children: ["Upload", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "file",
							accept: "image/*",
							className: "hidden",
							onChange: (e) => void onFile(e)
						})]
					}), form.licensePhoto ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						variant: "ghost",
						size: "sm",
						onClick: () => set("licensePhoto", null),
						children: "Remove"
					}) : null]
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				type: "submit",
				variant: "solid",
				children: "Save profile"
			})
		]
	});
}
var SplitComponent = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminGate, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StudioScreen, {}) });
//#endregion
export { SplitComponent as component };
