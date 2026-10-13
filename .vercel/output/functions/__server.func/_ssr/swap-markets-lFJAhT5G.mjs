import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as cn } from "./logo-onkM7cXt.mjs";
import { x as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { M as ChevronDown, P as ChartColumn, f as Search, h as Rocket, o as Star } from "../_libs/lucide-react.mjs";
import { t as useQuery } from "../_libs/tanstack__react-query.mjs";
import { d as formatPct, p as formatUsd } from "./router-DwIgdOrv.mjs";
import { t as CoinIcon } from "./coin-icon-BJEiOmq2.mjs";
import { a as fetchSearchMarkets, o as fetchTopTraded, s as fetchTrendingMarkets, t as fetchCategoryMarkets } from "./prices-CmqijxtN.mjs";
import { n as createServerFn } from "./ssr.mjs";
import { t as createSsrRpc } from "./createSsrRpc-C1p7zOu_.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/swap-markets-lFJAhT5G.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var loadPredictions = createServerFn({ method: "GET" }).handler(createSsrRpc("923316848a73f3c6da76600f9c08fb58f605d967b2be44a94c0f4a90be87473e"));
var STAR_KEY = "trust-market-stars";
var NETWORKS = [
	{
		id: "all",
		label: "All networks",
		category: null
	},
	{
		id: "bitcoin",
		label: "Bitcoin",
		category: "bitcoin-ecosystem"
	},
	{
		id: "ethereum",
		label: "Ethereum",
		category: "ethereum-ecosystem"
	},
	{
		id: "bnb",
		label: "BNB Chain",
		category: "binance-smart-chain"
	},
	{
		id: "solana",
		label: "Solana",
		category: "solana-ecosystem"
	},
	{
		id: "tron",
		label: "Tron",
		category: "tron-ecosystem"
	}
];
var MEME_NETWORK = {
	bitcoin: "bitcoin-meme",
	bnb: "four-meme-ecosystem",
	solana: "solana-meme-coins",
	tron: "tron-meme"
};
var BOARDS = [
	{
		id: "trending",
		label: "Trending",
		category: null
	},
	{
		id: "bstocks",
		label: "bStocks",
		category: "bstocks-ecosystem"
	},
	{
		id: "stocks",
		label: "Stock tokens",
		category: "tokenized-stock"
	},
	{
		id: "ondo",
		label: "Ondo",
		category: "ondo-tokenized-assets"
	}
];
function readStars() {
	try {
		const raw = JSON.parse(localStorage.getItem(STAR_KEY) || "[]");
		return Array.isArray(raw) ? raw.filter((x) => typeof x === "string") : [];
	} catch {
		return [];
	}
}
function changeOf(coin, windowKey) {
	if (windowKey === "1h") return coin.change1h;
	if (windowKey === "7d") return coin.change7d;
	return coin.change24h;
}
function Spark({ points, up }) {
	const sample = points.length > 24 ? points.filter((_, i) => i % Math.ceil(points.length / 24) === 0) : points;
	if (sample.length < 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "inline-block h-8 w-16" });
	const min = Math.min(...sample);
	const span = Math.max(...sample) - min || 1;
	const d = sample.map((p, i) => {
		const x = i / (sample.length - 1) * 64;
		const y = 28 - (p - min) / span * 24;
		return `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`;
	}).join(" ");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		viewBox: "0 0 64 32",
		className: "h-7 w-12 shrink-0",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
			d,
			fill: "none",
			stroke: up ? "#3dd68c" : "#ef5b6a",
			strokeWidth: "2",
			strokeLinejoin: "round"
		})
	});
}
async function loadBoard(board, network) {
	if (board === "meme") {
		const memeChain = network !== "all" ? MEME_NETWORK[network] : null;
		return fetchCategoryMarkets(memeChain ?? "meme-token");
	}
	if (network !== "all") {
		const category = NETWORKS.find((n) => n.id === network)?.category;
		if (category) return fetchCategoryMarkets(category);
	}
	if (board === "trending") return fetchTrendingMarkets();
	const category = BOARDS.find((b) => b.id === board)?.category;
	return fetchCategoryMarkets(category ?? "meme-token");
}
function SwapMarkets({ onSwap }) {
	const navigate = useNavigate();
	const [board, setBoard] = (0, import_react.useState)("trending");
	const [network, setNetwork] = (0, import_react.useState)("all");
	const [windowKey, setWindowKey] = (0, import_react.useState)("24h");
	const [volumeAsc, setVolumeAsc] = (0, import_react.useState)(false);
	const [starsOnly, setStarsOnly] = (0, import_react.useState)(false);
	const [stars, setStars] = (0, import_react.useState)([]);
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [menu, setMenu] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		setStars(readStars());
	}, []);
	const top = useQuery({
		queryKey: ["top-traded"],
		queryFn: fetchTopTraded,
		staleTime: 6e4
	});
	const searching = query.trim().length >= 2;
	const coins = useQuery({
		queryKey: [
			"swap-board",
			board,
			network
		],
		queryFn: () => loadBoard(board, network),
		enabled: board !== "predictions" && !searching,
		staleTime: 6e4
	});
	const found = useQuery({
		queryKey: ["swap-search", query.trim().toLowerCase()],
		queryFn: () => fetchSearchMarkets(query),
		enabled: searching && board !== "predictions",
		staleTime: 3e4
	});
	const predictions = useQuery({
		queryKey: ["predictions"],
		queryFn: () => loadPredictions(),
		enabled: board === "predictions",
		staleTime: 6e4
	});
	function toggleStar(id) {
		setStars((prev) => {
			const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
			localStorage.setItem(STAR_KEY, JSON.stringify(next));
			return next;
		});
	}
	const rows = (0, import_react.useMemo)(() => {
		const source = searching ? found.data ?? [] : coins.data ?? [];
		const q = query.trim().toLowerCase();
		let list = source.filter((c) => {
			if (starsOnly && !stars.includes(c.id)) return false;
			if (!searching && q && !`${c.name} ${c.symbol}`.toLowerCase().includes(q)) return false;
			return true;
		});
		list = [...list].sort((a, b) => volumeAsc ? a.volume24h - b.volume24h : b.volume24h - a.volume24h);
		return list;
	}, [
		searching,
		found.data,
		coins.data,
		query,
		starsOnly,
		stars,
		volumeAsc
	]);
	const predictionRows = (0, import_react.useMemo)(() => {
		let list = predictions.data ?? [];
		const q = query.trim().toLowerCase();
		if (q) list = list.filter((p) => p.question.toLowerCase().includes(q));
		if (starsOnly) list = list.filter((p) => stars.includes(p.id));
		const volume = (p) => windowKey === "7d" ? p.volume7d : windowKey === "1h" ? p.volume24h : p.volume24h;
		return [...list].sort((a, b) => volumeAsc ? volume(a) - volume(b) : volume(b) - volume(a));
	}, [
		predictions.data,
		query,
		starsOnly,
		stars,
		volumeAsc,
		windowKey
	]);
	function openCoin(id) {
		navigate({
			to: "/wallet/asset/$id",
			params: { id }
		});
	}
	const loading = board === "predictions" ? predictions.isLoading : searching ? found.isLoading : coins.isLoading;
	const error = board === "predictions" ? predictions.isError : searching ? found.isError : coins.isError;
	const networkLabel = NETWORKS.find((n) => n.id === network)?.label ?? "Network";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto w-full max-w-md overflow-x-clip px-4 pt-3 pb-36",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "size-11" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "font-display text-xl font-semibold",
						children: "Markets"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"aria-label": "Search",
						onClick: () => {
							setSearchOpen((v) => !v);
							if (searchOpen) setQuery("");
						},
						className: "flex size-11 items-center justify-center rounded-full bg-card text-foreground",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "size-5" })
					})
				]
			}),
			searchOpen ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				autoFocus: true,
				value: query,
				onChange: (e) => setQuery(e.target.value),
				placeholder: "Search name or symbol",
				className: "mt-3 h-11 w-full rounded-full bg-card px-4 text-sm outline-none"
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setBoard("predictions");
						setNetwork("all");
						setMenu(null);
					},
					className: cn("flex h-14 items-center justify-center gap-2 rounded-2xl bg-card text-sm font-medium", board === "predictions" && "ring-1 ring-primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, { className: "size-5" }), "Predictions"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => {
						setBoard("meme");
						setMenu(null);
					},
					className: cn("flex h-14 items-center justify-center gap-2 rounded-2xl bg-card text-sm font-medium", board === "meme" && "ring-1 ring-primary"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rocket, { className: "size-5" }), "Meme Rush"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-6 text-lg font-semibold",
				children: "Top traded (24h)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-x mt-3 flex gap-3 pb-1",
				children: [(top.data ?? []).slice(0, 8).map((coin) => {
					const up = coin.change24h >= 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => openCoin(coin.id),
						className: "w-36 shrink-0 rounded-2xl bg-card p-3 text-left",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "truncate text-sm",
									children: coin.name
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: coin.id,
									symbol: coin.symbol,
									image: coin.image,
									size: 28
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-lg font-semibold tabular",
								children: formatUsd(coin.price, true)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: cn("mt-1 text-sm tabular", up ? "text-success" : "text-danger"),
								children: formatPct(coin.change24h)
							})
						]
					}, coin.id);
				}), top.isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-36 w-40 shrink-0 animate-pulse rounded-2xl bg-card" }) : null]
			}),
			top.isError ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-danger",
				children: "Live prices are unavailable right now."
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "scroll-x mt-4 flex gap-2 pb-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					"aria-label": "Favorites",
					onClick: () => setStarsOnly((v) => !v),
					className: cn("flex size-10 shrink-0 items-center justify-center rounded-full bg-card", starsOnly && "bg-primary text-primary-fg"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", starsOnly && "fill-current") })
				}), BOARDS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setBoard(item.id);
						setNetwork("all");
						setMenu(null);
					},
					className: cn("h-10 shrink-0 rounded-full bg-card px-4 text-sm", board === item.id && "bg-[#3a3f72] text-foreground"),
					children: item.label
				}, item.id))]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mt-3 flex max-w-full flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMenu((m) => m === "network" ? null : "network"),
						className: "flex h-9 items-center gap-1 rounded-full bg-card px-3 text-sm",
						children: [network === "all" ? "Network" : networkLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setVolumeAsc((v) => !v),
						className: "flex h-9 items-center gap-1 rounded-full bg-card px-3 text-sm",
						children: ["Volume ", volumeAsc ? "↑" : "↓"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setMenu((m) => m === "window" ? null : "window"),
						className: "flex h-9 items-center gap-1 rounded-full bg-card px-3 text-sm",
						children: [windowKey, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "size-4" })]
					}),
					menu === "network" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-11 left-0 z-20 w-44 rounded-xl bg-card p-1 shadow-border",
						children: NETWORKS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setNetwork(item.id);
								if (item.id !== "all" && board !== "meme" && board !== "predictions") setBoard("trending");
								setMenu(null);
							},
							className: cn("block w-full rounded-lg px-3 py-2 text-left text-sm", network === item.id && "bg-card-elevated"),
							children: item.label
						}, item.id))
					}) : null,
					menu === "window" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "absolute top-11 right-0 z-20 w-28 rounded-xl bg-card p-1 shadow-border",
						children: [
							"1h",
							"24h",
							"7d"
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => {
								setWindowKey(item);
								setMenu(null);
							},
							className: cn("block w-full rounded-lg px-3 py-2 text-left text-sm", windowKey === item && "bg-card-elevated"),
							children: item
						}, item))
					}) : null
				]
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-sm text-danger",
				children: "Could not load live market data."
			}) : null,
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 space-y-3",
				children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-16 animate-pulse rounded-xl bg-card" }, i))
			}) : board === "predictions" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: predictionRows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "py-10 text-center text-sm text-muted",
					children: starsOnly ? "No starred predictions yet." : "No open prediction markets matched."
				}) : predictionRows.map((item) => {
					const change = windowKey === "7d" ? item.change1w : item.change1d;
					const up = change >= 0;
					const volume = windowKey === "7d" ? item.volume7d : windowKey === "1h" ? item.volume24h : item.volume24h;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2 border-b border-border py-2.5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-label": "Star",
							onClick: () => toggleStar(item.id),
							className: "text-muted",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", stars.includes(item.id) && "fill-current text-foreground") })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: `https://polymarket.com/event/${item.slug}`,
							target: "_blank",
							rel: "noopener noreferrer",
							className: "flex min-w-0 flex-1 items-center gap-3",
							children: [
								item.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: item.image,
									alt: "",
									className: "size-10 rounded-full object-cover"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-10 rounded-full bg-card" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate font-medium",
										children: item.question
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block text-xs text-muted",
										children: [
											"Yes ",
											Math.round(item.yes * 100),
											"% · Vol ",
											formatUsd(volume)
										]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("text-sm tabular", up ? "text-success" : "text-danger"),
									children: formatPct(change)
								})
							]
						})]
					}, item.id);
				})
			}) : rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "py-10 text-center text-sm text-muted",
				children: starsOnly ? "No starred assets yet. Star a coin to keep it here." : "No assets matched."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: rows.map((coin) => {
					const change = changeOf(coin, windowKey);
					const up = change >= 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 items-center gap-2 border-b border-border py-2.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openCoin(coin.id),
								className: "flex min-w-0 flex-1 items-center gap-2 text-left",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
									id: coin.id,
									symbol: coin.symbol,
									image: coin.image,
									size: 36
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block truncate text-sm font-semibold",
										children: coin.symbol
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "block truncate text-[11px] text-muted",
										children: [
											formatUsd(coin.marketCap),
											" MCap · ",
											formatUsd(coin.volume24h),
											" Vol"
										]
									})]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spark, {
								points: coin.sparkline,
								up
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => openCoin(coin.id),
								className: "w-[4.5rem] shrink-0 overflow-hidden text-right",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-sm font-semibold tabular",
									children: formatUsd(coin.price, true)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: cn("block truncate text-xs tabular", up ? "text-success" : "text-danger"),
									children: formatPct(change)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": `Star ${coin.symbol}`,
								onClick: () => toggleStar(coin.id),
								className: "shrink-0 text-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Star, { className: cn("size-4", stars.includes(coin.id) && "fill-current text-foreground") })
							})
						]
					}, coin.id);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fixed inset-x-0 bottom-[4.75rem] z-30 px-4 md:bottom-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onSwap,
					className: "mx-auto block h-12 w-full max-w-md rounded-full bg-[#5b4dff] text-sm font-semibold text-white",
					children: "Swap"
				})
			})
		]
	});
}
//#endregion
export { SwapMarkets as t };
