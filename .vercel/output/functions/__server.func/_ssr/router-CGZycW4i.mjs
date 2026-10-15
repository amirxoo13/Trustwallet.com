import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { S as useRouter, _ as lazyRouteComponent, d as Scripts, f as HeadContent, g as Outlet, h as createRouter, p as useRouterState, v as createFileRoute, y as createRootRoute } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as createServerFn } from "./ssr.mjs";
import { n as CLIENT_ACCOUNT, t as ADMIN_ACCOUNT } from "./auth-config-4kiC0rE-.mjs";
import { a as number, c as union, i as literal, n as array, o as object, s as string, t as _enum } from "../_libs/zod.mjs";
import { i as generateAddress, n as createSsrRpc, s as __exportAll } from "./addresses-BTbj67Cj.mjs";
import { a as swapFeeRate, i as getCoin, r as STARTER_HOLDINGS, t as COINS } from "./coins-Kac_SJvS.mjs";
import { n as persist, r as create, t as createJSONStorage } from "../_libs/zustand.mjs";
import { i as TriangleAlert } from "../_libs/lucide-react.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { n as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/store-D-8taaQe.js
var KEY = "aurex-admin-proof";
/** Set only after the admin password is typed correctly. Not derived from the client role flag. */
function grantAdminProof(password) {
	if (typeof window === "undefined") return;
	localStorage.setItem(KEY, password);
}
function clearAdminProof() {
	if (typeof window === "undefined") return;
	localStorage.removeItem(KEY);
}
function adminProof() {
	if (typeof window === "undefined") return "";
	try {
		return localStorage.getItem(KEY) ?? "";
	} catch {
		return "";
	}
}
function hasAdminProof() {
	return adminProof() === ADMIN_ACCOUNT.password;
}
function renameAurexToTrust(value) {
	if (typeof value === "string") return value.replaceAll("Aurex", "Trust");
	if (!value || typeof value !== "object" || Array.isArray(value)) return value;
	const out = { ...value };
	for (const key of Object.keys(out)) {
		const item = out[key];
		if (typeof item === "string" && item.includes("Aurex")) out[key] = item.replaceAll("Aurex", "Trust");
	}
	return out;
}
var SITE_DEFAULTS = {
	brandName: "Trust",
	tagline: "One wallet. Every chain. Your keys.",
	logo: null,
	heroKicker: "Self-custody · 100+ blockchains",
	heroTitleA: "True crypto ownership.",
	heroTitleB: "In your hands.",
	heroSub: "Trust is a free self-custody wallet. Buy, send, swap and hold assets across Bitcoin, Ethereum, Solana and 100+ chains — only you control the keys.",
	heroCta: "Open your wallet",
	heroSecondary: "Live markets",
	statUsersN: "12M+",
	statUsersL: "Active wallets",
	statChainsN: "100+",
	statChainsL: "Blockchains",
	statAssetsN: "10M+",
	statAssetsL: "Assets tracked",
	statAuditsN: "ISO",
	statAuditsL: "Independent audits",
	assetsTitle: "One platform. Millions of assets.",
	assetsSub: "Bitcoin, Ethereum, Solana, Cosmos, BNB Smart Chain and more — buy, send, swap and earn from a single home screen.",
	securityTitle: "Stay private and secure",
	securitySub: "Keys live on your device. We never hold, track, or recover what only you should own.",
	security1t: "Encrypted by default",
	security1d: "Seed and keys are stored locally, encrypted at rest on this device.",
	security2t: "Zero personal tracking",
	security2d: "No IP harvesting, no balance surveillance, no account servers.",
	security3t: "Clear transaction review",
	security3d: "Every send, swap and receive is itemized before it is signed.",
	onestopTitle: "Your one-stop Web3 wallet",
	onestopSub: "Send, receive, swap, buy, and track live markets — all in one place.",
	footerLegal: "Trust is a self-custody wallet. You control your keys.",
	loginTitle: "Welcome back",
	loginSub: "Sign in to unlock your wallet.",
	featuresTitle: "Everything a real wallet does",
	featuresSub: "Send, receive, swap, buy, and track live markets from one home screen.",
	securityPageTitle: "Stay private and secure",
	securityPageSub: "Self-custody by design. Keys never leave this device.",
	walletName: "Main Wallet",
	tabHome: "Home",
	tabMarkets: "Markets",
	tabSwap: "Swap",
	tabActivity: "Activity",
	tabProfile: "Profile",
	actionSend: "Send",
	actionReceive: "Receive",
	actionBuy: "Buy",
	heroImage: null,
	securityImage: null,
	aboutImage: null,
	navMarkets: "Markets",
	navFeatures: "Features",
	navSecurity: "Security",
	navLogin: "Log in",
	navOpenWallet: "Open wallet",
	noticeT20Title: "Transfer held for review",
	noticeT20Body: "This outgoing transfer is paused for a compliance check.\n\nConfirm the destination address belongs to the intended recipient. Network fees are not refundable once the transfer is signed.",
	noticeF20Title: "Additional verification required",
	noticeF20Body: "A second verification step is required before this send can proceed.\n\nReview the amount, asset, and network fee. Continue only if you initiated this transfer on this device.",
	noticeK20Title: "Destination flagged",
	noticeK20Body: "The destination wallet is marked for extra scrutiny.\n\nDouble-check every character of the address. Continue only if you recognize the recipient and accept the risk.",
	noticeCta: "I understand, continue",
	sendSureTitle: "Are you sure this wallet address is correct?",
	sendSureBody: "Check the destination wallet carefully. Sent funds cannot be recovered if the address is wrong.",
	sendSureOk: "OK",
	sendSureCancel: "Cancel",
	sendConfirmMinutes: "4",
	sendConfirmCount: "12",
	sendConfirmTitle: "Confirming",
	sendConfirmLabel: "Confirmation {current} of {total}",
	sendConfirmHint: "The network is confirming this transfer. Keep this screen open until it finishes.",
	sendCodeTitle: "Enter the verification code sent to your number",
	sendCodeBody: "A verification code was sent to your phone number. Enter it to complete this transfer.",
	sendCodePlaceholder: "Verification code",
	sendCodeButton: "Confirm",
	sendCodeError: "That code is incorrect. Try again.",
	sendCodeValue: "739214"
};
var SITE_TEXT_FIELDS = [
	{
		key: "brandName",
		label: "Site name",
		group: "Brand"
	},
	{
		key: "tagline",
		label: "Tagline",
		group: "Brand",
		multiline: true
	},
	{
		key: "walletName",
		label: "Wallet name (inside the app)",
		group: "Brand"
	},
	{
		key: "navMarkets",
		label: "Nav — Markets",
		group: "Brand"
	},
	{
		key: "navFeatures",
		label: "Nav — Features",
		group: "Brand"
	},
	{
		key: "navSecurity",
		label: "Nav — Security",
		group: "Brand"
	},
	{
		key: "navLogin",
		label: "Button — Log in",
		group: "Brand"
	},
	{
		key: "navOpenWallet",
		label: "Button — Open wallet",
		group: "Brand"
	},
	{
		key: "tabHome",
		label: "Wallet tab — Home",
		group: "Brand"
	},
	{
		key: "tabMarkets",
		label: "Wallet tab — Markets",
		group: "Brand"
	},
	{
		key: "tabSwap",
		label: "Wallet tab — Swap",
		group: "Brand"
	},
	{
		key: "tabActivity",
		label: "Wallet tab — Activity",
		group: "Brand"
	},
	{
		key: "tabProfile",
		label: "Wallet tab — Profile",
		group: "Brand"
	},
	{
		key: "actionSend",
		label: "Action — Send",
		group: "Brand"
	},
	{
		key: "actionReceive",
		label: "Action — Receive",
		group: "Brand"
	},
	{
		key: "actionBuy",
		label: "Action — Buy",
		group: "Brand"
	},
	{
		key: "heroKicker",
		label: "Kicker",
		group: "Homepage hero"
	},
	{
		key: "heroTitleA",
		label: "Title line 1",
		group: "Homepage hero"
	},
	{
		key: "heroTitleB",
		label: "Title line 2",
		group: "Homepage hero"
	},
	{
		key: "heroSub",
		label: "Subtitle",
		group: "Homepage hero",
		multiline: true
	},
	{
		key: "heroCta",
		label: "Primary button",
		group: "Homepage hero"
	},
	{
		key: "heroSecondary",
		label: "Secondary button",
		group: "Homepage hero"
	},
	{
		key: "statUsersN",
		label: "Stat 1 number",
		group: "Stats"
	},
	{
		key: "statUsersL",
		label: "Stat 1 label",
		group: "Stats"
	},
	{
		key: "statChainsN",
		label: "Stat 2 number",
		group: "Stats"
	},
	{
		key: "statChainsL",
		label: "Stat 2 label",
		group: "Stats"
	},
	{
		key: "statAssetsN",
		label: "Stat 3 number",
		group: "Stats"
	},
	{
		key: "statAssetsL",
		label: "Stat 3 label",
		group: "Stats"
	},
	{
		key: "statAuditsN",
		label: "Stat 4 number",
		group: "Stats"
	},
	{
		key: "statAuditsL",
		label: "Stat 4 label",
		group: "Stats"
	},
	{
		key: "assetsTitle",
		label: "Assets title",
		group: "Assets + security + footer"
	},
	{
		key: "assetsSub",
		label: "Assets subtitle",
		group: "Assets + security + footer",
		multiline: true
	},
	{
		key: "securityTitle",
		label: "Security title",
		group: "Assets + security + footer"
	},
	{
		key: "securitySub",
		label: "Security subtitle",
		group: "Assets + security + footer",
		multiline: true
	},
	{
		key: "security1t",
		label: "Card 1 title",
		group: "Assets + security + footer"
	},
	{
		key: "security1d",
		label: "Card 1 text",
		group: "Assets + security + footer",
		multiline: true
	},
	{
		key: "security2t",
		label: "Card 2 title",
		group: "Assets + security + footer"
	},
	{
		key: "security2d",
		label: "Card 2 text",
		group: "Assets + security + footer",
		multiline: true
	},
	{
		key: "security3t",
		label: "Card 3 title",
		group: "Assets + security + footer"
	},
	{
		key: "security3d",
		label: "Card 3 text",
		group: "Assets + security + footer",
		multiline: true
	},
	{
		key: "onestopTitle",
		label: "Bottom title",
		group: "Assets + security + footer"
	},
	{
		key: "onestopSub",
		label: "Bottom subtitle",
		group: "Assets + security + footer",
		multiline: true
	},
	{
		key: "footerLegal",
		label: "Footer line",
		group: "Assets + security + footer",
		multiline: true
	},
	{
		key: "loginTitle",
		label: "Login title",
		group: "Login + inner pages"
	},
	{
		key: "loginSub",
		label: "Login subtitle",
		group: "Login + inner pages",
		multiline: true
	},
	{
		key: "featuresTitle",
		label: "Features title",
		group: "Login + inner pages"
	},
	{
		key: "featuresSub",
		label: "Features subtitle",
		group: "Login + inner pages",
		multiline: true
	},
	{
		key: "securityPageTitle",
		label: "Security page title",
		group: "Login + inner pages"
	},
	{
		key: "securityPageSub",
		label: "Security page subtitle",
		group: "Login + inner pages",
		multiline: true
	},
	{
		key: "noticeT20Title",
		label: "T20 popup title",
		group: "Send notices"
	},
	{
		key: "noticeT20Body",
		label: "T20 popup text",
		group: "Send notices",
		multiline: true
	},
	{
		key: "noticeF20Title",
		label: "F20 popup title",
		group: "Send notices"
	},
	{
		key: "noticeF20Body",
		label: "F20 popup text",
		group: "Send notices",
		multiline: true
	},
	{
		key: "noticeK20Title",
		label: "K20 popup title",
		group: "Send notices"
	},
	{
		key: "noticeK20Body",
		label: "K20 popup text",
		group: "Send notices",
		multiline: true
	},
	{
		key: "noticeCta",
		label: "Popup button",
		group: "Send notices"
	},
	{
		key: "sendSureTitle",
		label: "Address check title",
		group: "Send confirmation"
	},
	{
		key: "sendSureBody",
		label: "Address check text",
		group: "Send confirmation",
		multiline: true
	},
	{
		key: "sendSureOk",
		label: "Address check OK button",
		group: "Send confirmation"
	},
	{
		key: "sendSureCancel",
		label: "Address check cancel button",
		group: "Send confirmation"
	},
	{
		key: "sendConfirmMinutes",
		label: "Minutes until the last confirmation",
		group: "Send confirmation"
	},
	{
		key: "sendConfirmCount",
		label: "How many confirmations",
		group: "Send confirmation"
	},
	{
		key: "sendConfirmTitle",
		label: "Confirming title",
		group: "Send confirmation"
	},
	{
		key: "sendConfirmLabel",
		label: "Confirming line (use {current} and {total})",
		group: "Send confirmation"
	},
	{
		key: "sendConfirmHint",
		label: "Confirming note",
		group: "Send confirmation",
		multiline: true
	},
	{
		key: "sendCodeTitle",
		label: "Code box title",
		group: "Send confirmation"
	},
	{
		key: "sendCodeBody",
		label: "Code box text",
		group: "Send confirmation",
		multiline: true
	},
	{
		key: "sendCodePlaceholder",
		label: "Code box placeholder",
		group: "Send confirmation"
	},
	{
		key: "sendCodeButton",
		label: "Code box button",
		group: "Send confirmation"
	},
	{
		key: "sendCodeError",
		label: "Wrong code message",
		group: "Send confirmation"
	},
	{
		key: "sendCodeValue",
		label: "Code the client must enter",
		group: "Send confirmation"
	}
];
var useSite = create()(persist((set) => ({
	...SITE_DEFAULTS,
	hydrated: false,
	patch: (partial) => {
		if (!hasAdminProof()) return;
		set(partial);
	},
	reset: () => {
		if (!hasAdminProof()) return;
		set({ ...SITE_DEFAULTS });
	}
}), {
	name: "aurex-site-en",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	merge: (persisted, current) => ({
		...current,
		...persisted ?? {}
	}),
	partialize: (s) => {
		const { hydrated, patch, reset, ...rest } = s;
		return rest;
	},
	onRehydrateStorage: () => () => {
		const cur = useSite.getState();
		useSite.setState(renameAurexToTrust({
			...SITE_DEFAULTS,
			...cur
		}));
	}
}));
var useLoginWindow = create()(persist((set) => ({
	hydrated: false,
	startedAt: null,
	lockedScenario: null,
	lockScenario: (code) => set({ lockedScenario: code }),
	clearLockedScenario: () => set({ lockedScenario: null })
}), {
	name: "aurex-login-window",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	merge: (persisted, current) => ({
		...current,
		...persisted ?? {}
	}),
	partialize: (s) => ({
		startedAt: s.startedAt,
		lockedScenario: s.lockedScenario
	}),
	onRehydrateStorage: () => () => {}
}));
/** Real wall-clock wait before an Ethereum → Bitcoin swap settles. */
var ETH_BTC_SWAP_MS = 18144e5;
function ensureWalletAddresses(addresses) {
	let missing = false;
	for (const coin of COINS) if (!addresses[coin.chain]) {
		missing = true;
		break;
	}
	if (!missing) return addresses;
	const out = { ...addresses };
	for (const coin of COINS) if (!out[coin.chain]) out[coin.chain] = generateAddress(coin.kind);
	return out;
}
function hexId() {
	const a = /* @__PURE__ */ new Uint8Array(8);
	crypto.getRandomValues(a);
	return Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("");
}
function txHash() {
	const a = /* @__PURE__ */ new Uint8Array(32);
	crypto.getRandomValues(a);
	return `0x${Array.from(a, (b) => b.toString(16).padStart(2, "0")).join("")}`;
}
var emptyProfile = (email = "") => ({
	firstName: "",
	lastName: "",
	email,
	address: "",
	phone: "",
	nationalId: "",
	licensePhoto: null
});
var useWallet = create()(persist((set, get) => ({
	hydrated: false,
	authenticated: false,
	role: null,
	scenario: null,
	accountEmail: "",
	accountToken: "",
	hideBalances: false,
	addresses: {},
	holdings: STARTER_HOLDINGS.map((h) => ({ ...h })),
	transactions: [],
	profile: emptyProfile(),
	balanceEpoch: 0,
	login: async (email, password) => {
		const e = email.trim().toLowerCase();
		const p = password;
		if (e === ADMIN_ACCOUNT.email.toLowerCase() && p === ADMIN_ACCOUNT.password) {
			grantAdminProof(p);
			const { issueWalletSession } = await import("./transfer-CCkMJQod.mjs").then((n) => n.r);
			const session = await issueWalletSession({ data: {
				email: e,
				password: p
			} }).catch(() => null);
			set((s) => ({
				authenticated: true,
				role: "admin",
				accountEmail: e,
				accountToken: session?.ok ? session.token : "",
				addresses: ensureWalletAddresses(s.addresses)
			}));
			return { ok: true };
		}
		if (e === CLIENT_ACCOUNT.email.toLowerCase() && p === CLIENT_ACCOUNT.password) {
			clearAdminProof();
			const { issueWalletSession } = await import("./transfer-CCkMJQod.mjs").then((n) => n.r);
			const session = await issueWalletSession({ data: {
				email: e,
				password: p
			} }).catch(() => null);
			set((s) => ({
				authenticated: true,
				role: "client",
				accountEmail: e,
				accountToken: session?.ok ? session.token : "",
				addresses: ensureWalletAddresses(s.addresses),
				profile: {
					...s.profile,
					email: s.profile.email || CLIENT_ACCOUNT.email
				}
			}));
			return { ok: true };
		}
		const { loginAccount } = await import("./accounts-DQQJ4uAk.mjs").then((n) => n.t);
		const registered = await loginAccount({ data: {
			email: e,
			password: p
		} });
		if (registered.ok) {
			clearAdminProof();
			set({
				authenticated: true,
				role: "client",
				accountEmail: e,
				accountToken: registered.token,
				scenario: null,
				holdings: COINS.map((coin) => ({
					id: coin.id,
					amount: 0
				})),
				transactions: [],
				addresses: {},
				profile: emptyProfile(e),
				balanceEpoch: 2
			});
			return { ok: true };
		}
		return {
			ok: false,
			error: "invalid"
		};
	},
	logout: () => {
		clearAdminProof();
		set({
			authenticated: false,
			role: null,
			accountToken: ""
		});
	},
	toggleHideBalances: () => set((s) => ({ hideBalances: !s.hideBalances })),
	setProfile: (profile) => set({ profile }),
	clearScenario: () => {
		if (!hasAdminProof()) return;
		useLoginWindow.getState().clearLockedScenario();
		set({ scenario: null });
	},
	setHolding: (coinId, amount) => {
		if (!hasAdminProof()) return;
		const n = Number(amount);
		const value = Number.isFinite(n) && n > 0 ? n : 0;
		set((s) => {
			return { holdings: s.holdings.some((h) => h.id === coinId) ? s.holdings.map((h) => h.id === coinId ? {
				...h,
				amount: value
			} : h) : [...s.holdings, {
				id: coinId,
				amount: value
			}] };
		});
	},
	credit: (coinId, amount) => {
		if (amount <= 0) return;
		set((s) => {
			const holdings = s.holdings.map((h) => ({ ...h }));
			const i = holdings.findIndex((h) => h.id === coinId);
			if (i >= 0) holdings[i] = {
				...holdings[i],
				amount: holdings[i].amount + amount
			};
			else holdings.push({
				id: coinId,
				amount
			});
			return { holdings };
		});
	},
	debit: (coinId, amount) => {
		const h = get().holdings.find((x) => x.id === coinId);
		if (!h || h.amount + 1e-12 < amount) return false;
		set((s) => ({ holdings: s.holdings.map((x) => x.id === coinId ? {
			...x,
			amount: Math.max(0, x.amount - amount)
		} : x) }));
		return true;
	},
	addTx: (partial) => {
		const tx = {
			...partial,
			id: hexId(),
			hash: txHash(),
			timestamp: Date.now(),
			status: partial.status ?? "confirmed"
		};
		set((s) => ({ transactions: [tx, ...s.transactions].slice(0, 200) }));
		return tx;
	},
	simulateIncoming: (coinId, amount) => {
		if (!hasAdminProof()) return null;
		const coin = getCoin(coinId);
		if (!coin || amount <= 0) return null;
		get().credit(coinId, amount);
		return get().addTx({
			type: "receive",
			coinId,
			symbol: coin.symbol,
			amount,
			usdValue: 0,
			toAddress: get().addresses[coin.chain],
			fromAddress: generateAddress(coin.kind),
			fee: 0,
			feeSymbol: coin.symbol,
			note: "Incoming transfer"
		});
	},
	send: ({ coinId, amount, toAddress, usdValue }) => {
		const coin = getCoin(coinId);
		if (!coin) return {
			ok: false,
			error: "unknown_asset"
		};
		const fee = coin.fee;
		const total = amount + fee;
		const holding = get().holdings.find((h) => h.id === coinId);
		if (!holding || holding.amount < total) return {
			ok: false,
			error: "insufficient"
		};
		get().debit(coinId, total);
		return {
			ok: true,
			tx: get().addTx({
				type: "send",
				coinId,
				symbol: coin.symbol,
				amount,
				usdValue,
				fromAddress: get().addresses[coin.chain],
				toAddress,
				fee,
				feeSymbol: coin.symbol
			})
		};
	},
	swap: ({ fromId, toId, fromAmount, toAmount, usdValue }) => {
		const from = getCoin(fromId);
		const to = getCoin(toId);
		if (!from || !to) return {
			ok: false,
			error: "unknown_asset"
		};
		if (fromId === toId) return {
			ok: false,
			error: "same_asset"
		};
		const fee = fromAmount * swapFeeRate(fromId, toId);
		const holding = get().holdings.find((h) => h.id === fromId);
		if (!holding || holding.amount + 1e-12 < fromAmount) return {
			ok: false,
			error: "insufficient"
		};
		get().debit(fromId, fromAmount);
		const delayed = fromId === "ethereum" && toId === "bitcoin";
		if (!delayed) get().credit(toId, toAmount);
		return {
			ok: true,
			tx: get().addTx({
				type: "swap",
				coinId: fromId,
				symbol: from.symbol,
				amount: fromAmount,
				usdValue,
				toCoinId: toId,
				toSymbol: to.symbol,
				toAmount,
				fee,
				feeSymbol: from.symbol,
				status: delayed ? "pending" : "confirmed",
				settlesAt: delayed ? Date.now() + ETH_BTC_SWAP_MS : void 0,
				note: delayed ? "Settles in 21 days" : void 0
			})
		};
	},
	settleDueSwaps: () => {
		const now = Date.now();
		set((s) => {
			const due = s.transactions.filter((t) => t.type === "swap" && t.status === "pending" && typeof t.settlesAt === "number" && t.settlesAt <= now && t.toCoinId && t.toAmount);
			if (!due.length) return s;
			const holdings = s.holdings.map((h) => ({ ...h }));
			for (const tx of due) {
				const id = tx.toCoinId;
				const amount = tx.toAmount;
				const i = holdings.findIndex((h) => h.id === id);
				if (i >= 0) holdings[i] = {
					...holdings[i],
					amount: holdings[i].amount + amount
				};
				else holdings.push({
					id,
					amount
				});
			}
			const ids = new Set(due.map((t) => t.id));
			return {
				holdings,
				transactions: s.transactions.map((t) => ids.has(t.id) ? {
					...t,
					status: "confirmed"
				} : t)
			};
		});
	},
	cancelSwap: (id) => {
		if (!hasAdminProof()) return {
			ok: false,
			error: "forbidden"
		};
		const tx = get().transactions.find((t) => t.id === id && t.type === "swap");
		if (!tx) return {
			ok: false,
			error: "missing"
		};
		if (tx.status === "failed") return {
			ok: false,
			error: "already"
		};
		if (tx.status === "confirmed" && tx.toCoinId && (tx.toAmount ?? 0) > 0) {
			const dest = get().holdings.find((h) => h.id === tx.toCoinId);
			if (!dest || dest.amount + 1e-8 < (tx.toAmount ?? 0)) return {
				ok: false,
				error: "spent"
			};
		}
		set((s) => {
			const row = s.transactions.find((t) => t.id === id && t.type === "swap" && t.status !== "failed");
			if (!row) return s;
			let holdings = s.holdings.map((h) => ({ ...h }));
			const credit = (coinId, amount) => {
				const i = holdings.findIndex((h) => h.id === coinId);
				if (i >= 0) holdings[i] = {
					...holdings[i],
					amount: holdings[i].amount + amount
				};
				else holdings.push({
					id: coinId,
					amount
				});
			};
			const debit = (coinId, amount) => {
				holdings = holdings.map((h) => h.id === coinId ? {
					...h,
					amount: Math.max(0, h.amount - amount)
				} : h);
			};
			credit(row.coinId, row.amount);
			if (row.status === "confirmed" && row.toCoinId && row.toAmount) debit(row.toCoinId, row.toAmount);
			return {
				holdings,
				transactions: s.transactions.map((t) => t.id === id ? {
					...t,
					status: "failed",
					settlesAt: void 0,
					note: "Cancelled by admin"
				} : t)
			};
		});
		return { ok: true };
	},
	buy: ({ coinId, amount, usdValue }) => {
		const coin = getCoin(coinId);
		if (!coin) return {
			ok: false,
			error: "unknown_asset"
		};
		get().credit(coinId, amount);
		return {
			ok: true,
			tx: get().addTx({
				type: "buy",
				coinId,
				symbol: coin.symbol,
				amount,
				usdValue,
				fee: usdValue * .0149,
				feeSymbol: "USD",
				note: "Card purchase"
			})
		};
	}
}), {
	name: "aurex-wallet",
	storage: createJSONStorage(() => localStorage),
	skipHydration: true,
	merge: (persisted, current) => ({
		...current,
		...persisted ?? {}
	}),
	partialize: (s) => ({
		authenticated: s.authenticated,
		role: s.role,
		scenario: s.scenario,
		accountEmail: s.accountEmail,
		accountToken: s.accountToken,
		hideBalances: s.hideBalances,
		addresses: s.addresses,
		holdings: s.holdings,
		transactions: s.transactions,
		profile: s.profile,
		balanceEpoch: s.balanceEpoch
	}),
	onRehydrateStorage: () => () => {
		const s = useWallet.getState();
		let role = s.role;
		let authenticated = s.authenticated;
		if (role === "admin" && !hasAdminProof()) {
			role = null;
			authenticated = false;
		} else if (authenticated && !role) role = hasAdminProof() ? "admin" : "client";
		const stale = s.balanceEpoch !== 2;
		useWallet.setState({
			role,
			authenticated,
			balanceEpoch: 2,
			addresses: ensureWalletAddresses(s.addresses),
			...stale ? { holdings: STARTER_HOLDINGS.map((h) => ({ ...h })) } : {}
		});
		useWallet.getState().settleDueSwaps();
	}
}));
function holdingAmount(holdings, coinId) {
	return holdings.find((h) => h.id === coinId)?.amount ?? 0;
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-CGZycW4i.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-screen flex-col items-center justify-center gap-3 px-6 text-center bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-50",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-red-500",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "text-lg font-semibold",
				children: "Something went wrong"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-zinc-500 dark:text-zinc-400",
				children: error.message || "An unexpected error occurred. Try reloading the page."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
var useCloud = create(() => ({
	phase: "boot",
	lastSaved: null
}));
var ready = false;
var applying = false;
var pushing = false;
var pendingForce = false;
var timer;
var unsubSite;
var unsubWallet;
var unsubLogin;
var visBound = false;
var onVis;
var lastSiteKey = "";
var lastWalletKey = "";
var lastLoginKey = "";
var lastUpdatedAt = null;
var quietUntil = 0;
var inflight = null;
var holdPush = false;
function setHoldPush(next) {
	holdPush = next;
}
function isPrivateClient() {
	const wallet = useWallet.getState();
	return wallet.role === "client" && Boolean(wallet.accountEmail) && wallet.accountEmail !== CLIENT_ACCOUNT.email.toLowerCase();
}
function blankPrivateState() {
	const email = useWallet.getState().accountEmail;
	useWallet.setState({
		holdings: STARTER_HOLDINGS.map((holding) => ({
			id: holding.id,
			amount: 0
		})),
		transactions: [],
		addresses: {},
		scenario: null,
		profile: {
			firstName: "",
			lastName: "",
			email,
			address: "",
			phone: "",
			nationalId: "",
			licensePhoto: null
		},
		balanceEpoch: 2
	});
}
async function pullPrivateWallet() {
	const wallet = useWallet.getState();
	if (!wallet.accountToken) {
		useWallet.setState({
			authenticated: false,
			role: null,
			accountToken: ""
		});
		blankPrivateState();
		return;
	}
	const { loadPrivateWallet } = await import("./user-wallet-_ZuKfiyz.mjs");
	const res = await loadPrivateWallet({ data: {
		email: wallet.accountEmail,
		token: wallet.accountToken
	} });
	if (!res.ok || !res.wallet) return;
	applying = true;
	try {
		useWallet.setState({
			profile: res.wallet.profile,
			holdings: res.wallet.holdings,
			transactions: res.wallet.transactions,
			addresses: ensureWalletAddresses(res.wallet.addresses),
			scenario: null,
			balanceEpoch: 2
		});
		lastWalletKey = JSON.stringify(walletSnapshot());
	} finally {
		applying = false;
	}
}
function siteSnapshot() {
	const { hydrated, patch, reset, ...rest } = useSite.getState();
	return rest;
}
function walletSnapshot() {
	const s = useWallet.getState();
	return {
		profile: s.profile,
		holdings: s.holdings,
		transactions: s.transactions,
		addresses: s.addresses,
		scenario: s.scenario,
		balanceEpoch: s.balanceEpoch
	};
}
function loginSnapshot() {
	const s = useLoginWindow.getState();
	return {
		startedAt: s.startedAt,
		lockedScenario: s.lockedScenario
	};
}
function isDefaultSite(site) {
	return site.brandName === SITE_DEFAULTS.brandName && !site.logo && !site.heroImage && site.heroTitleA === SITE_DEFAULTS.heroTitleA && site.heroSub === SITE_DEFAULTS.heroSub;
}
function holdingsLookStarter(holdings) {
	if (holdings.length !== STARTER_HOLDINGS.length) return false;
	const map = new Map(holdings.map((h) => [h.id, h.amount]));
	return STARTER_HOLDINGS.every((h) => map.get(h.id) === h.amount);
}
function hasCustomWallet(w) {
	const p = w.profile;
	return Boolean(p.firstName || p.lastName || p.licensePhoto || p.nationalId || p.phone || p.address || w.transactions && w.transactions.length || w.holdings.length > 0 && !holdingsLookStarter(w.holdings));
}
function hasMeaningfulWallet(w) {
	return hasCustomWallet(w) || Boolean(w.scenario);
}
function actorOf() {
	if (hasAdminProof()) return "admin";
	return useWallet.getState().role === "client" ? "client" : "public";
}
async function cloudApi() {
	return import("./cloud-state-D68y-2Xi.mjs").then((n) => n.t).then((n) => n.t);
}
function withTimeout(p, ms) {
	return new Promise((resolve, reject) => {
		const id = setTimeout(() => reject(/* @__PURE__ */ new Error("timeout")), ms);
		p.then((v) => {
			clearTimeout(id);
			resolve(v);
		}, (e) => {
			clearTimeout(id);
			reject(e);
		});
	});
}
function rememberLocal() {
	lastSiteKey = JSON.stringify(siteSnapshot());
	lastWalletKey = JSON.stringify(walletSnapshot());
	lastLoginKey = JSON.stringify(loginSnapshot());
}
async function pushToCloud(forceLogin = false) {
	if (forceLogin) pendingForce = true;
	if (!ready || applying || pushing || holdPush) return;
	pushing = true;
	const force = pendingForce;
	pendingForce = false;
	try {
		const actor = actorOf();
		const site = siteSnapshot();
		const wallet = walletSnapshot();
		const login = loginSnapshot();
		const siteKey = JSON.stringify(site);
		const walletKey = JSON.stringify(wallet);
		const loginKey = JSON.stringify(login);
		const siteChanged = siteKey !== lastSiteKey;
		const walletChanged = walletKey !== lastWalletKey;
		const loginChanged = loginKey !== lastLoginKey || force;
		if (!siteChanged && !walletChanged && !loginChanged) return;
		if (isPrivateClient()) {
			if (!walletChanged) return;
			const { savePrivateWallet } = await import("./user-wallet-_ZuKfiyz.mjs");
			const current = useWallet.getState();
			const saved = await savePrivateWallet({ data: {
				email: current.accountEmail,
				token: current.accountToken,
				wallet
			} });
			if (saved.ok && saved.wallet) {
				applying = true;
				try {
					useWallet.setState({
						profile: saved.wallet.profile,
						holdings: saved.wallet.holdings,
						transactions: saved.wallet.transactions,
						addresses: ensureWalletAddresses(saved.wallet.addresses),
						balanceEpoch: 2
					});
				} finally {
					applying = false;
				}
			}
			lastWalletKey = JSON.stringify(walletSnapshot());
			useCloud.setState({
				phase: "live",
				lastSaved: Date.now()
			});
			return;
		}
		const canSite = actor === "admin" && siteChanged;
		const canWallet = actor === "admin" && walletChanged || actor === "client" && walletChanged && hasCustomWallet(wallet);
		if (!canSite && !canWallet && !loginChanged) return;
		const res = await (await cloudApi()).saveAppState({ data: {
			actor,
			proof: actor === "admin" ? adminProof() : void 0,
			site: canSite ? site : void 0,
			wallet: canWallet ? wallet : void 0,
			login: loginChanged ? login : void 0,
			forceLogin: force && actor === "admin"
		} });
		if (res.wallet && actor !== "admin") {
			applying = true;
			try {
				useWallet.setState({
					profile: res.wallet.profile,
					holdings: res.wallet.holdings,
					transactions: res.wallet.transactions,
					addresses: ensureWalletAddresses(res.wallet.addresses),
					scenario: res.wallet.scenario ?? useWallet.getState().scenario,
					balanceEpoch: typeof res.wallet.balanceEpoch === "number" ? res.wallet.balanceEpoch : 2
				});
			} finally {
				applying = false;
			}
		}
		lastSiteKey = siteKey;
		lastWalletKey = JSON.stringify(walletSnapshot());
		lastLoginKey = loginKey;
		if (res.updatedAt) lastUpdatedAt = res.updatedAt;
		quietUntil = Date.now() + 1500;
		useCloud.setState({
			phase: "live",
			lastSaved: Date.now()
		});
	} catch (err) {
		console.warn("[aurex] cloud save failed", err);
		useCloud.setState({ phase: "local" });
	} finally {
		pushing = false;
		if (pendingForce) pushToCloud(true);
	}
}
function schedulePush() {
	if (!ready || applying) return;
	if (timer) clearTimeout(timer);
	timer = setTimeout(() => {
		pushToCloud();
	}, 250);
}
function applyRemote(site, wallet, login) {
	applying = true;
	try {
		if (site && Object.keys(site).length) useSite.setState(renameAurexToTrust({
			...SITE_DEFAULTS,
			...site
		}));
		if (wallet) {
			const next = {
				holdings: (typeof wallet.balanceEpoch === "number" ? wallet.balanceEpoch : 0) === 2 && Array.isArray(wallet.holdings) ? wallet.holdings : STARTER_HOLDINGS.map((h) => ({ ...h })),
				balanceEpoch: 2,
				addresses: ensureWalletAddresses({
					...useWallet.getState().addresses,
					...wallet.addresses ?? {}
				})
			};
			if (wallet.profile) next.profile = wallet.profile;
			if (Array.isArray(wallet.transactions)) next.transactions = wallet.transactions;
			if ("scenario" in wallet) next.scenario = wallet.scenario ?? null;
			useWallet.setState(next);
		}
		if (login) useLoginWindow.setState({
			startedAt: login.startedAt ?? null,
			lockedScenario: login.lockedScenario ?? null
		});
		rememberLocal();
	} finally {
		applying = false;
	}
}
function subscribe() {
	if (!unsubSite) unsubSite = useSite.subscribe(schedulePush);
	if (!unsubWallet) unsubWallet = useWallet.subscribe(schedulePush);
	if (!unsubLogin) unsubLogin = useLoginWindow.subscribe(schedulePush);
}
function startListeners() {
	subscribe();
	if (typeof window === "undefined" || visBound) return;
	visBound = true;
	onVis = () => {
		if (document.visibilityState === "visible") pullFromCloud(true);
	};
	window.addEventListener("focus", onVis);
	document.addEventListener("visibilitychange", onVis);
	window.setInterval(() => {
		pullFromCloud();
	}, 4e3);
}
function stopListeners() {}
async function pullFromCloud(force = false) {
	if (!ready || applying || pushing) return;
	if (!force && (timer || Date.now() < quietUntil)) return;
	if (!force && typeof document !== "undefined" && document.visibilityState === "hidden") return;
	try {
		const api = await cloudApi();
		if (isPrivateClient()) {
			const meta = await withTimeout(api.loadAppStateMeta(), 8e3);
			if (!(meta.updatedAt && meta.updatedAt === lastUpdatedAt)) {
				const remote = await withTimeout(api.loadAppState(), 8e3);
				lastUpdatedAt = remote.updatedAt ?? meta.updatedAt;
				if (remote.site) applyRemote(remote.site, null, null);
			}
			await pullPrivateWallet();
			useCloud.setState({ phase: "live" });
			return;
		}
		const meta = await withTimeout(api.loadAppStateMeta(), 8e3);
		if (meta.empty) return;
		if (meta.updatedAt && meta.updatedAt === lastUpdatedAt) return;
		const remote = await withTimeout(api.loadAppState(), 8e3);
		if (remote.empty) return;
		lastUpdatedAt = remote.updatedAt ?? meta.updatedAt;
		applyRemote(remote.site, remote.wallet, remote.login);
		useCloud.setState({ phase: "live" });
	} catch (err) {
		console.warn("[aurex] cloud pull failed", err);
	}
}
async function syncFromCloud() {
	if (ready) {
		startListeners();
		return stopListeners;
	}
	if (inflight) {
		await inflight;
		startListeners();
		return stopListeners;
	}
	inflight = (async () => {
		try {
			const api = await cloudApi();
			const remote = await withTimeout(api.loadAppState(), 12e3);
			if (isPrivateClient()) {
				blankPrivateState();
				if (!remote.empty && remote.site) applyRemote(remote.site, null, null);
				await pullPrivateWallet();
				ready = true;
				quietUntil = Date.now() + 800;
				useCloud.setState({ phase: "live" });
				startListeners();
				return;
			}
			if (remote.empty) {
				rememberLocal();
				const site = siteSnapshot();
				const wallet = walletSnapshot();
				const shouldSeed = !isDefaultSite(site) || hasMeaningfulWallet(wallet) || Boolean(loginSnapshot().startedAt);
				ready = true;
				if (shouldSeed) {
					const actor = actorOf();
					try {
						const res = await api.saveAppState({ data: {
							actor,
							proof: actor === "admin" ? adminProof() : void 0,
							site: actor === "admin" && !isDefaultSite(site) ? site : void 0,
							wallet: hasMeaningfulWallet(wallet) && actor !== "public" ? wallet : void 0,
							login: loginSnapshot(),
							forceLogin: actor === "admin"
						} });
						if (res.updatedAt) lastUpdatedAt = res.updatedAt;
						rememberLocal();
						useCloud.setState({
							phase: "live",
							lastSaved: Date.now()
						});
					} catch (err) {
						console.warn("[aurex] cloud seed failed", err);
						useCloud.setState({ phase: "local" });
					}
				} else useCloud.setState({ phase: "live" });
				quietUntil = Date.now() + 800;
				startListeners();
				return;
			}
			lastUpdatedAt = remote.updatedAt;
			applyRemote(remote.site, remote.wallet, remote.login);
			ready = true;
			quietUntil = Date.now() + 800;
			useCloud.setState({ phase: "live" });
			startListeners();
		} catch (err) {
			console.warn("[aurex] cloud load failed", err);
			ready = true;
			rememberLocal();
			useCloud.setState({ phase: "local" });
			startListeners();
		}
	})();
	try {
		await inflight;
		return stopListeners;
	} finally {
		inflight = null;
	}
}
async function refreshCloud() {
	await pullFromCloud(true);
}
function saveCloudNow(forceLogin = false) {
	if (!ready) return;
	if (timer) {
		clearTimeout(timer);
		timer = void 0;
	}
	pushToCloud(forceLogin);
}
function markHydrated() {
	useWallet.setState({ hydrated: true });
	useSite.setState({ hydrated: true });
	useLoginWindow.setState({ hydrated: true });
}
function PersistHydrate() {
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		(async () => {
			try {
				await Promise.all([
					useWallet.persist.rehydrate(),
					useSite.persist.rehydrate(),
					useLoginWindow.persist.rehydrate()
				]);
				if (cancelled) return;
				await syncFromCloud();
			} catch {} finally {
				if (!cancelled) markHydrated();
			}
		})();
		return () => {
			cancelled = true;
		};
	}, []);
	return null;
}
function PwaRegister() {
	(0, import_react.useEffect)(() => {
		if (!("serviceWorker" in navigator)) return;
		navigator.serviceWorker.register(`/sw.js?v=6`).then((reg) => {
			navigator.serviceWorker.addEventListener("controllerchange", () => {
				if (sessionStorage.getItem("aurex-sw-reloaded") === "1") return;
				sessionStorage.setItem("aurex-sw-reloaded", "1");
				window.location.reload();
			});
			reg.update();
		}).catch(() => void 0);
	}, []);
	return null;
}
var eventInput = object({
	kind: _enum([
		"open",
		"tap",
		"action"
	]),
	label: string().min(1).max(600)
});
var pushInput = object({
	sessionId: string().min(4).max(40),
	role: _enum([
		"guest",
		"client",
		"admin"
	]),
	who: string().min(1).max(80),
	path: string().min(1).max(200),
	device: string().min(1).max(40),
	browser: string().max(40).default(""),
	os: string().max(40).default(""),
	viewport: string().max(24).default(""),
	lang: string().max(20).default(""),
	mode: string().max(24).default(""),
	startedAt: number().min(0).max(9e15).default(0),
	pageAt: number().min(0).max(9e15).default(0),
	scenario: string().max(8).default(""),
	email: string().max(80).default(""),
	events: array(eventInput).max(20)
});
var pushLive = createServerFn({ method: "POST" }).validator(pushInput).handler(createSsrRpc("688c0e3af0c7303246e9b191db7eaa9de817b0331cc83a042f6d8af51927109e"));
var loadLive = createServerFn({ method: "POST" }).validator(object({ proof: string().max(200) })).handler(createSsrRpc("6c4641be08904b21c4612714c98ee50a0e780f6ce071fb8b854fa3aa54ed7434"));
var PAGE_NAMES = {
	"/": "Home",
	"/login": "Login",
	"/features": "Features",
	"/security": "Security",
	"/markets": "Markets",
	"/studio": "Control panel",
	"/wallet": "Wallet",
	"/wallet/": "Wallet",
	"/wallet/send": "Send",
	"/wallet/receive": "Receive",
	"/wallet/swap": "Swap",
	"/wallet/markets": "Markets",
	"/wallet/perps": "Perps",
	"/wallet/buy": "Buy",
	"/wallet/activity": "Activity",
	"/wallet/profile": "Profile",
	"/wallet/settings": "Settings",
	"/wallet/ethereum": "Ethereum account"
};
function pageName(path) {
	if (path.startsWith("/wallet/asset/")) return `Asset ${path.split("/").pop() || "asset"}`;
	return PAGE_NAMES[path] ?? path;
}
var queue = [];
var sending = false;
var lastPath = "";
var pageAt = 0;
function sessionId() {
	const key = "trust-live-sid";
	try {
		const existing = sessionStorage.getItem(key);
		if (existing) return existing;
		const id = crypto.randomUUID().replace(/-/g, "").slice(0, 16);
		sessionStorage.setItem(key, id);
		return id;
	} catch {
		return "guest-session";
	}
}
function startedAt() {
	const key = "trust-live-started";
	try {
		const existing = Number(sessionStorage.getItem(key));
		if (existing) return existing;
		const now = Date.now();
		sessionStorage.setItem(key, String(now));
		return now;
	} catch {
		return Date.now();
	}
}
function browserName(ua) {
	if (/edg\//i.test(ua)) return "Edge";
	if (/opr\/|opera/i.test(ua)) return "Opera";
	if (/crios/i.test(ua)) return "Chrome";
	if (/fxios/i.test(ua)) return "Firefox";
	if (/samsungbrowser/i.test(ua)) return "Samsung";
	if (/chrome|chromium/i.test(ua)) return "Chrome";
	if (/firefox/i.test(ua)) return "Firefox";
	if (/safari/i.test(ua)) return "Safari";
	return "Browser";
}
function osName(ua) {
	if (/iphone|ipad|ipod/i.test(ua)) return "iOS";
	if (/android/i.test(ua)) return "Android";
	if (/mac os/i.test(ua)) return "macOS";
	if (/windows/i.test(ua)) return "Windows";
	if (/linux/i.test(ua)) return "Linux";
	return "Unknown";
}
function deviceName(ua) {
	if (/ipad/i.test(ua)) return "iPad";
	if (/iphone/i.test(ua)) return "iPhone";
	if (/android/i.test(ua)) return /mobile/i.test(ua) ? "Android" : "Android tablet";
	return "Desktop";
}
function identity(path) {
	const wallet = useWallet.getState();
	const role = wallet.role === "admin" ? "admin" : wallet.role === "client" ? "client" : "guest";
	const name = [wallet.profile.firstName, wallet.profile.lastName].filter(Boolean).join(" ").trim();
	const email = role === "client" ? wallet.accountEmail || wallet.profile.email || "" : "";
	const who = role === "admin" ? "Admin" : role === "client" ? email || name || "Client" : "Guest";
	const cleanPath = path.slice(0, 200) || "/";
	if (cleanPath !== lastPath) {
		lastPath = cleanPath;
		pageAt = Date.now();
	} else if (!pageAt) pageAt = Date.now();
	const ua = navigator.userAgent;
	const standalone = window.matchMedia("(display-mode: standalone)").matches || "standalone" in navigator && Boolean(navigator.standalone);
	return {
		sessionId: sessionId(),
		role,
		who: who.slice(0, 80),
		path: cleanPath,
		device: deviceName(ua),
		browser: browserName(ua),
		os: osName(ua),
		viewport: `${window.innerWidth}×${window.innerHeight}`,
		lang: (navigator.language || "").slice(0, 20),
		mode: standalone ? "Installed app" : "Browser",
		startedAt: startedAt(),
		pageAt,
		scenario: role === "client" ? wallet.scenario || "" : "",
		email: email.slice(0, 80)
	};
}
async function flush(path) {
	if (typeof window === "undefined" || sending) return;
	sending = true;
	const events = queue.splice(0, 20);
	try {
		await pushLive({ data: {
			...identity(path),
			events
		} });
	} catch {} finally {
		sending = false;
	}
}
function track(kind, label) {
	if (typeof window === "undefined") return;
	const text = label.replace(/[ \t]+/g, " ").trim().slice(0, 600);
	if (!text) return;
	const last = queue[queue.length - 1];
	if (last && last.kind === kind && last.label === text) return;
	queue.push({
		kind,
		label: text
	});
	if (queue.length >= 8) flush(window.location.pathname || "/");
}
function beat(path) {
	flush(path || "/");
}
/** Reports the current page and taps so the control panel can show them live. */
function LiveWatch() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	(0, import_react.useEffect)(() => {
		track("open", `Opened ${pageName(path)}`);
		beat(path);
	}, [path]);
	(0, import_react.useEffect)(() => {
		const onClick = (event) => {
			const target = event.target;
			if (!target || target.closest("[data-private]")) return;
			const el = target.closest("a,button,[role='button']");
			if (!el || el.closest("[data-private]")) return;
			const label = (el.getAttribute("aria-label") || el.textContent || "").replace(/\s+/g, " ").trim();
			if (!label || label.length > 80) return;
			track("tap", label);
		};
		document.addEventListener("click", onClick, true);
		return () => document.removeEventListener("click", onClick, true);
	}, []);
	(0, import_react.useEffect)(() => {
		const tick = () => {
			if (document.visibilityState === "visible") beat(path);
		};
		const id = window.setInterval(tick, 4e3);
		return () => window.clearInterval(id);
	}, [path]);
	(0, import_react.useEffect)(() => {
		const onHide = () => {
			track("action", document.visibilityState === "hidden" ? "Backgrounded the app" : "Returned to the app");
			if (document.visibilityState === "visible") beat(path);
		};
		document.addEventListener("visibilitychange", onHide);
		return () => document.removeEventListener("visibilitychange", onHide);
	}, [path]);
	return null;
}
function BrandHead() {
	const name = useSite((s) => s.brandName);
	const tagline = useSite((s) => s.tagline);
	(0, import_react.useEffect)(() => {
		document.title = name;
		const apple = document.querySelector("meta[name=\"apple-mobile-web-app-title\"]");
		if (apple) apple.setAttribute("content", name);
		const desc = document.querySelector("meta[name=\"description\"]");
		if (desc) desc.setAttribute("content", `${name} — ${tagline}`);
	}, [name, tagline]);
	return null;
}
var styles_default = "/assets/styles-D4EbaGFv.css";
var APP_NAME = "Trust";
var queryClient = new QueryClient({ defaultOptions: { queries: { refetchOnWindowFocus: false } } });
var Route$20 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "description",
				content: "Trust — one wallet, every chain, your keys."
			},
			{
				name: "theme-color",
				content: "#07080A"
			},
			{
				name: "apple-mobile-web-app-capable",
				content: "yes"
			},
			{
				name: "apple-mobile-web-app-status-bar-style",
				content: "black-translucent"
			},
			{
				name: "apple-mobile-web-app-title",
				content: APP_NAME
			},
			{
				name: "mobile-web-app-capable",
				content: "yes"
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/png",
				href: "/favicon.png"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/manifest.webmanifest"
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/apple-touch-icon.png"
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&family=Sora:wght@500;600;700&display=swap"
			}
		]
	}),
	component: RootDocument
});
function RootDocument() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthProvider, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(QueryClientProvider, {
				client: queryClient,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersistHydrate, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandHead, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PwaRegister, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveWatch, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
						theme: "dark",
						position: "top-center",
						offset: { top: "calc(var(--safe-top) + 12px)" },
						toastOptions: { style: {
							background: "#181b22",
							color: "#f4f6f8",
							border: "1px solid rgb(244 246 248 / 0.1)"
						} }
					})
				]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$18 = () => import("./routes-CKZR2hAZ.mjs");
var Route$19 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$18, "component") });
var $$splitComponentImporter$17 = () => import("./features-AdL8Pr00.mjs");
var Route$18 = createFileRoute("/features")({ component: lazyRouteComponent($$splitComponentImporter$17, "component") });
var $$splitComponentImporter$16 = () => import("./login-JaT7Crui.mjs");
var Route$17 = createFileRoute("/login")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
var $$splitComponentImporter$15 = () => import("./markets-C8B0xJR2.mjs");
var Route$16 = createFileRoute("/markets")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
var $$splitComponentImporter$14 = () => import("./security-DRzP3qpf.mjs");
var Route$15 = createFileRoute("/security")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
var $$splitComponentImporter$13 = () => import("./studio-BX_OEoD2.mjs");
var Route$14 = createFileRoute("/studio")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
var $$splitComponentImporter$12 = () => import("./route-BY7cBHgG.mjs");
var Route$13 = createFileRoute("/wallet")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
async function tick() {
	try {
		const { dispatchAlerts } = await import("./push-send-DvsmPMQ3.mjs");
		const result = await dispatchAlerts(false);
		return Response.json({
			ok: true,
			...result
		});
	} catch (err) {
		console.error("[alerts]", err);
		return Response.json({ ok: false }, { status: 500 });
	}
}
var Route$12 = createFileRoute("/api/notify")({ server: { handlers: {
	GET: () => tick(),
	POST: () => tick()
} } });
var $$splitComponentImporter$11 = () => import("./wallet-Wprn63XF.mjs");
var Route$11 = createFileRoute("/wallet/")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./activity-2NctJ2US.mjs");
var Route$10 = createFileRoute("/wallet/activity")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./buy-Cu4R59rc.mjs");
var Route$9 = createFileRoute("/wallet/buy")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./ethereum-BcjITN0P.mjs");
var Route$8 = createFileRoute("/wallet/ethereum")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./markets-CYyzKX3i.mjs");
var Route$7 = createFileRoute("/wallet/markets")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./perps-CyVfy4QH.mjs");
var Route$6 = createFileRoute("/wallet/perps")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./profile-soSR_3GO.mjs");
var Route$5 = createFileRoute("/wallet/profile")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./receive-l4Gjpyxx.mjs");
var Route$4 = createFileRoute("/wallet/receive")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
var $$splitComponentImporter$3 = () => import("./send-lRWVjxol.mjs");
var Route$3 = createFileRoute("/wallet/send")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./settings-CRsinwYZ.mjs");
var Route$2 = createFileRoute("/wallet/settings")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./swap-fPP5kKJm.mjs");
var Route$1 = createFileRoute("/wallet/swap")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./asset._id-Dd1spFcg.mjs");
var Route = createFileRoute("/wallet/asset/$id")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$19.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$20
});
var FeaturesRoute = Route$18.update({
	id: "/features",
	path: "/features",
	getParentRoute: () => Route$20
});
var LoginRoute = Route$17.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$20
});
var MarketsRoute = Route$16.update({
	id: "/markets",
	path: "/markets",
	getParentRoute: () => Route$20
});
var SecurityRoute = Route$15.update({
	id: "/security",
	path: "/security",
	getParentRoute: () => Route$20
});
var StudioRoute = Route$14.update({
	id: "/studio",
	path: "/studio",
	getParentRoute: () => Route$20
});
var WalletRouteRoute = Route$13.update({
	id: "/wallet",
	path: "/wallet",
	getParentRoute: () => Route$20
});
var ApiNotifyRoute = Route$12.update({
	id: "/api/notify",
	path: "/api/notify",
	getParentRoute: () => Route$20
});
var WalletIndexRoute = Route$11.update({
	id: "/",
	path: "/",
	getParentRoute: () => WalletRouteRoute
});
var WalletRouteRouteChildren = {
	WalletActivityRoute: Route$10.update({
		id: "/activity",
		path: "/activity",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletBuyRoute: Route$9.update({
		id: "/buy",
		path: "/buy",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletEthereumRoute: Route$8.update({
		id: "/ethereum",
		path: "/ethereum",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletMarketsRoute: Route$7.update({
		id: "/markets",
		path: "/markets",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletPerpsRoute: Route$6.update({
		id: "/perps",
		path: "/perps",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletProfileRoute: Route$5.update({
		id: "/profile",
		path: "/profile",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletReceiveRoute: Route$4.update({
		id: "/receive",
		path: "/receive",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletSendRoute: Route$3.update({
		id: "/send",
		path: "/send",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletSettingsRoute: Route$2.update({
		id: "/settings",
		path: "/settings",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletSwapRoute: Route$1.update({
		id: "/swap",
		path: "/swap",
		getParentRoute: () => WalletRouteRoute
	}),
	WalletIndexRoute,
	WalletAssetIdRoute: Route.update({
		id: "/asset/$id",
		path: "/asset/$id",
		getParentRoute: () => WalletRouteRoute
	})
};
var rootRouteChildren = {
	IndexRoute,
	WalletRouteRoute: WalletRouteRoute._addFileChildren(WalletRouteRouteChildren),
	FeaturesRoute,
	LoginRoute,
	MarketsRoute,
	SecurityRoute,
	StudioRoute,
	ApiNotifyRoute
};
var routeTree = Route$20._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { track as a, setHoldPush as c, adminProof as d, hasAdminProof as f, useWallet as g, useSite as h, pageName as i, useCloud as l, useLoginWindow as m, Route as n, refreshCloud as o, holdingAmount as p, loadLive as r, saveCloudNow as s, router_exports as t, SITE_TEXT_FIELDS as u };
