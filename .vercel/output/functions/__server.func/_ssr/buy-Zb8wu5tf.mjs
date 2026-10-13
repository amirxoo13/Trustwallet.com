import { o as __toESM } from "../_runtime.mjs";
import { c as usdPrice, r as COINS, s as getCoin } from "./auth-config-CmLBU8rx.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t } from "./i18n-CodmchUZ.mjs";
import { b as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Check } from "../_libs/lucide-react.mjs";
import { t as WalletShell } from "./wallet-shell-C6Mv8xRa.mjs";
import { l as formatAmount, p as formatUsdFull, y as useWallet } from "./router-Do_8wGde.mjs";
import { t as Button } from "./button-D59sT0rf.mjs";
import { t as CoinIcon } from "./coin-icon-C9R6tnwz.mjs";
import { n as useMarketMap } from "./use-markets-DkkllXXT.mjs";
import { t as Input } from "./input-D390Vonp.mjs";
import { t as Label } from "./label-CHDQPO2c.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/buy-Zb8wu5tf.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function WalletBuyScreen() {
	const buy = useWallet((s) => s.buy);
	const copy = t();
	const markets = useMarketMap();
	const [coinId, setCoinId] = (0, import_react.useState)("bitcoin");
	const [usd, setUsd] = (0, import_react.useState)("100");
	const [card, setCard] = (0, import_react.useState)("4242 4242 4242 4242");
	const [expiry, setExpiry] = (0, import_react.useState)("12/28");
	const [cvc, setCvc] = (0, import_react.useState)("123");
	const [step, setStep] = (0, import_react.useState)("form");
	const [got, setGot] = (0, import_react.useState)(0);
	const coin = getCoin(coinId) ?? COINS[0];
	const price = usdPrice(coinId, markets[coinId]?.price);
	const spend = Number(usd) || 0;
	const receive = price > 0 ? spend * .9851 / price : 0;
	function confirm() {
		if (spend < 10 || receive <= 0) return;
		if (!buy({
			coinId,
			amount: receive,
			usdValue: spend
		}).ok) return;
		setGot(receive);
		setStep("done");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletShell, {
		title: copy.wallet.buy,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto w-full max-w-md px-4 py-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display text-2xl font-semibold",
					children: copy.wallet.buyTitle
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm text-muted",
					children: copy.wallet.buySub
				}),
				step === "form" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-col gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: "Asset" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								value: coinId,
								onChange: (e) => setCoinId(e.target.value),
								className: "h-12 rounded-md bg-input px-3 text-sm text-foreground shadow-border",
								children: COINS.filter((c) => c.symbol !== "USDT").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c.id,
									children: c.name
								}, c.id))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Label, { children: [copy.wallet.spend, " (USD)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								inputMode: "decimal",
								value: usd,
								onChange: (e) => setUsd(e.target.value)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-xl bg-card p-4 text-sm shadow-border",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted",
									children: copy.wallet.receiveAmt
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "flex items-center gap-2 tabular",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CoinIcon, {
											id: coin.id,
											symbol: coin.symbol,
											size: 20
										}),
										formatAmount(receive, 8),
										" ",
										coin.symbol
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-2 flex justify-between text-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [copy.wallet.fee, " (1.49%)"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: formatUsdFull(spend * .0149) })]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex flex-col gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.wallet.card }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: card,
								onChange: (e) => setCard(e.target.value),
								inputMode: "numeric"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid grid-cols-2 gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.wallet.expiry }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: expiry,
									onChange: (e) => setExpiry(e.target.value)
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: copy.wallet.cvc }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: cvc,
									onChange: (e) => setCvc(e.target.value)
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "solid",
							size: "lg",
							disabled: spend < 10 || receive <= 0,
							onClick: confirm,
							children: [
								copy.wallet.confirm,
								" · ",
								formatUsdFull(spend)
							]
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10 flex flex-col items-center text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "flex size-16 items-center justify-center rounded-full bg-success/15 text-success",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-7" })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-5 font-display text-xl font-semibold",
							children: copy.wallet.success
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-2 text-sm text-muted",
							children: [
								"+",
								formatAmount(got, 8),
								" ",
								coin.symbol
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "solid",
							className: "mt-8 w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/wallet",
								children: copy.wallet.done
							})
						})
					]
				})
			]
		})
	});
}
var SplitComponent = WalletBuyScreen;
//#endregion
export { SplitComponent as component };
