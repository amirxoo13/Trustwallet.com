import { t as COINS } from "./coins-dlbZHcb_.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ArrowRight, D as ArrowDownLeft, S as ArrowUpRight, T as ArrowLeftRight, l as ScanSearch, p as LockKeyhole, s as ShieldCheck, u as Plus } from "../_libs/lucide-react.mjs";
import { C as useSite, w as useWallet } from "./router-BcEbiCRg.mjs";
import { t as Button } from "./button-BHlko9W-.mjs";
import { t as CoinIcon } from "./coin-icon-DPqQLt6l.mjs";
import { t as MarketingShell } from "./marketing-shell-CaT6kS-_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Ij3Tz01-.js
var import_jsx_runtime = require_jsx_runtime();
var rows = [
	{
		id: "tether",
		symbol: "USDT",
		name: "Tether TRC20",
		amt: "37,500",
		usd: "$37,500.00",
		ch: "0.00%",
		up: true
	},
	{
		id: "bitcoin",
		symbol: "BTC",
		name: "Bitcoin",
		amt: "0",
		usd: "$0.00",
		ch: "0.00%",
		up: true
	},
	{
		id: "ethereum",
		symbol: "ETH",
		name: "Ethereum",
		amt: "0",
		usd: "$0.00",
		ch: "0.00%",
		up: true
	},
	{
		id: "solana",
		symbol: "SOL",
		name: "Solana",
		amt: "0",
		usd: "$0.00",
		ch: "0.00%",
		up: true
	}
];
function PhonePreview() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "phone-frame relative mx-auto w-[300px] shrink-0",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute -inset-8 rounded-[3rem] bg-primary/10 blur-3xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden rounded-[2.2rem] bg-background shadow-float ring-1 ring-white/12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-x-0 top-0 h-6 bg-background/50" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-2 h-5 w-24 rounded-full bg-background" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "px-5 pt-5 pb-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between text-[11px] text-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Main Wallet" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "rounded-full bg-accent-soft px-2 py-0.5 text-primary",
								children: "Live"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-5 font-display text-[11px] tracking-wide text-muted uppercase",
							children: "Total balance"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-[34px] leading-none font-semibold tracking-tight tabular",
							children: "$37,500.00"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-xs font-medium text-success tabular",
							children: "+$0.00 (24h)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 grid grid-cols-4 gap-2",
							children: [
								{
									icon: ArrowUpRight,
									label: "Send"
								},
								{
									icon: ArrowDownLeft,
									label: "Receive"
								},
								{
									icon: ArrowLeftRight,
									label: "Swap"
								},
								{
									icon: Plus,
									label: "Buy"
								}
							].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex size-11 items-center justify-center rounded-full bg-card-elevated shadow-border",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(a.icon, { className: "size-4" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-[10px] text-muted",
									children: a.label
								})]
							}, a.label))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 space-y-3",
							children: rows.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: r.id,
									symbol: r.symbol,
									size: 32
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between text-[13px]",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "font-medium",
											children: r.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular",
											children: r.usd
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-0.5 flex items-center justify-between text-[11px] text-muted",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "tabular",
											children: [
												r.amt,
												" ",
												r.symbol
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: r.up ? "text-success" : "text-danger",
											children: r.ch
										})]
									})]
								})]
							}, r.symbol))
						})
					]
				})
			]
		})]
	});
}
var featured = [
	"bitcoin",
	"ethereum",
	"solana",
	"binancecoin",
	"sui"
];
function LandingScreen() {
	const authenticated = useWallet((s) => s.authenticated);
	const hydrated = useWallet((s) => s.hydrated);
	const site = useSite();
	const walletTo = hydrated && authenticated ? "/wallet" : "/login";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(MarketingShell, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(900px_circle_at_20%_-10%,rgb(46_107_255/0.16),transparent_55%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-6xl items-center gap-12 px-4 pt-16 pb-20 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "stagger-in",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs font-medium tracking-[0.18em] text-primary uppercase",
							children: site.heroKicker
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "mt-4 font-display text-4xl leading-[1.05] font-semibold tracking-tight sm:text-6xl",
							children: [site.heroTitleA, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mt-1 block text-muted",
								children: site.heroTitleB
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg",
							children: site.heroSub
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-8 flex flex-wrap gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "solid",
								size: "lg",
								className: "rounded-full px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: walletTo,
									children: [site.heroCta, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								size: "lg",
								className: "rounded-full px-6",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/markets",
									children: site.heroSecondary
								})
							})]
						})
					]
				}), site.heroImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: site.heroImage,
					alt: "",
					className: "mx-auto w-full max-w-md rounded-2xl object-cover shadow-float outline outline-1 -outline-offset-1 outline-white/10"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhonePreview, {})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "border-y border-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 py-10 sm:grid-cols-4",
				children: [
					{
						n: site.statUsersN,
						l: site.statUsersL
					},
					{
						n: site.statChainsN,
						l: site.statChainsL
					},
					{
						n: site.statAssetsN,
						l: site.statAssetsL
					},
					{
						n: site.statAuditsN,
						l: site.statAuditsL
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-2xl font-semibold tracking-tight sm:text-3xl",
					children: s.n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: s.l
				})] }, s.l))
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-6xl px-4 py-20",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
						children: site.assetsTitle
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-muted",
						children: site.assetsSub
					})]
				}),
				site.aboutImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: site.aboutImage,
					alt: "",
					className: "mt-8 max-h-80 w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-white/10"
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 overflow-hidden rounded-xl bg-card shadow-border",
					children: featured.map((id) => {
						const coin = COINS.find((c) => c.id === id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-4 last:border-b-0 sm:px-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex min-w-0 items-center gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: coin.id,
									symbol: coin.symbol
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-medium",
									children: coin.chainName
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: coin.symbol
								})] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex flex-wrap gap-2",
								children: [
									"Buy",
									"Send",
									"Swap",
									"Earn"
								].map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "rounded-full px-3 py-1.5 text-xs text-muted shadow-border",
									children: a
								}, a))
							})]
						}, id);
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "bg-card",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-6xl px-4 py-20",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
						children: site.securityTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted",
						children: site.securitySub
					}),
					site.securityImage ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: site.securityImage,
						alt: "",
						className: "mt-8 max-h-72 w-full rounded-xl object-cover outline outline-1 -outline-offset-1 outline-white/10"
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-10 grid gap-4 md:grid-cols-3",
						children: [
							{
								icon: ShieldCheck,
								t: site.security1t,
								d: site.security1d
							},
							{
								icon: LockKeyhole,
								t: site.security2t,
								d: site.security2d
							},
							{
								icon: ScanSearch,
								t: site.security3t,
								d: site.security3d
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-card-elevated p-6 shadow-border",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, { className: "size-5 text-primary" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "mt-4 font-display text-lg font-semibold",
									children: item.t
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm leading-relaxed text-muted",
									children: item.d
								})
							]
						}, item.t))
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "mx-auto max-w-6xl px-4 py-20",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-2xl bg-card px-6 py-12 shadow-border sm:px-12",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold tracking-tight sm:text-4xl",
						children: site.onestopTitle
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-xl text-muted",
						children: site.onestopSub
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "solid",
							size: "lg",
							className: "rounded-full px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: walletTo,
								children: site.heroCta
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "lg",
							className: "rounded-full px-6",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/features",
								children: "Features"
							})
						})]
					})
				]
			})
		})
	] });
}
var SplitComponent = LandingScreen;
//#endregion
export { SplitComponent as component };
