import { o as __toESM } from "../_runtime.mjs";
import { r as COINS, s as getCoin } from "./auth-config-CmLBU8rx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { D as Check, w as Copy } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-C6Mv8xRa.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { y as useWallet } from "./router-CtBuL6ap.mjs";
import { t as Button } from "./button-D59sT0rf.mjs";
import { t as CoinIcon } from "./coin-icon-C9R6tnwz.mjs";
import { t as require_lib } from "../_libs/qrcode.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/receive-C2PYs8Nn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var import_lib = /* @__PURE__ */ __toESM(require_lib());
function AddressQr({ value, size = 220 }) {
	const [src, setSrc] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		import_lib.toDataURL(value, {
			width: size * 2,
			margin: 1,
			color: {
				dark: "#07080a",
				light: "#f4f6f8"
			}
		}).then((url) => {
			if (!cancelled) setSrc(url);
		});
		return () => {
			cancelled = true;
		};
	}, [value, size]);
	if (!src) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "rounded-lg bg-foreground",
		style: {
			width: size,
			height: size
		}
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		src,
		alt: "Receive QR",
		width: size,
		height: size,
		className: "rounded-lg"
	});
}
function WalletReceiveScreen() {
	const addresses = useWallet((s) => s.addresses);
	const copy = t();
	const [coinId, setCoinId] = (0, import_react.useState)("tether");
	const [copied, setCopied] = (0, import_react.useState)(false);
	const coin = getCoin(coinId) ?? COINS[1];
	const address = addresses[coin.chain] ?? "";
	const uniqueChains = (0, import_react.useMemo)(() => {
		const seen = /* @__PURE__ */ new Set();
		return COINS.filter((c) => {
			if (seen.has(c.chain)) return false;
			seen.add(c.chain);
			return true;
		}).sort((a, b) => Number(b.id === "tether") - Number(a.id === "tether"));
	}, []);
	async function copyAddr() {
		try {
			await navigator.clipboard.writeText(address);
			setCopied(true);
			toast.success(copy.wallet.copied);
			setTimeout(() => setCopied(false), 1500);
		} catch {
			toast.error("Clipboard unavailable");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: copy.wallet.receive,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: copy.wallet.receive
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "mt-6 block",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-xs font-medium text-muted",
						children: "Network"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
						value: coinId,
						onChange: (e) => setCoinId(e.target.value),
						className: "mt-2 h-12 w-full rounded-md bg-input px-3 text-sm text-foreground shadow-border",
						children: uniqueChains.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: c.id,
							children: [
								c.chainName,
								" · ",
								c.symbol
							]
						}, c.chain))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-col items-center rounded-xl bg-card px-5 py-8 shadow-border",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2 text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
								id: coin.id,
								symbol: coin.symbol,
								size: 24
							}), coin.chainName]
						}),
						address ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AddressQr, {
							value: address,
							size: 200
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-5 text-center text-xs text-muted",
							children: [
								copy.wallet.qrHint,
								" ",
								coin.chainName
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-full break-all text-center font-mono text-xs leading-relaxed",
							children: address
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-5 flex w-full gap-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "solid",
								className: "flex-1",
								onClick: () => void copyAddr(),
								children: [copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, { className: "size-4" }), copied ? copy.wallet.copied : copy.wallet.copy]
							})
						})
					]
				})
			]
		})
	});
}
var SplitComponent = WalletReceiveScreen;
//#endregion
export { SplitComponent as component };
