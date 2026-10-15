import { n as CLIENT_ACCOUNT, t as ADMIN_ACCOUNT } from "./auth-config-BPsn-XvC.mjs";
import { t as getSql } from "./db-je3bFDRl.mjs";
import { n as sessionMatches } from "./accounts-send-JRTfZ1c1.mjs";
import { n as COIN_BY_ID } from "./coins-Kac_SJvS.mjs";
import { t as SEND_PIPELINE_MS } from "./send-pipeline-D1Vhbklw.mjs";
import { ensureUserWallet, listUserWallets, loadUserWallet, putUserWallet } from "./user-wallet-send-C2gh4U3F.mjs";
import { randomBytes, timingSafeEqual } from "node:crypto";
//#region node_modules/.nitro/vite/services/ssr/assets/transfer-send-BVfwYnIh.js
var PRIMARY = CLIENT_ACCOUNT.email.toLowerCase();
var ADMIN = ADMIN_ACCOUNT.email.toLowerCase();
var ROW_ID = "aurex";
async function ensureSessions() {
	await (await getSql()).query(`create table if not exists wallet_sessions (
      email text primary key,
      token text not null,
      wallet_email text not null
    )`);
}
function sameToken(stored, token) {
	if (!stored || stored.length !== token.length) return false;
	return timingSafeEqual(Buffer.from(stored), Buffer.from(token));
}
async function issueWalletSession(email, password) {
	const normalized = email.trim().toLowerCase();
	if (!(normalized === PRIMARY && password === CLIENT_ACCOUNT.password || normalized === ADMIN && password === ADMIN_ACCOUNT.password)) return { ok: false };
	await ensureSessions();
	const token = randomBytes(24).toString("hex");
	await (await getSql()).query(`insert into wallet_sessions (email, token, wallet_email) values ($1, $2, $3)
     on conflict (email) do update set token = excluded.token, wallet_email = excluded.wallet_email`, [
		normalized,
		token,
		PRIMARY
	]);
	return {
		ok: true,
		token
	};
}
async function walletEmailFor(actorEmail, token) {
	const email = actorEmail.trim().toLowerCase();
	if (!token || token.length < 20) return null;
	if (await sessionMatches(email, token)) return email;
	await ensureSessions();
	const rows = await (await getSql()).query("select token, wallet_email from wallet_sessions where email = $1", [email]);
	if (!rows[0] || !sameToken(rows[0].token, token)) return null;
	return rows[0].wallet_email;
}
async function loadShared() {
	const rows = await (await getSql()).query("select wallet_json from app_state where id = $1", [ROW_ID]);
	if (!rows[0]) return null;
	try {
		return JSON.parse(rows[0].wallet_json);
	} catch {
		return null;
	}
}
async function saveShared(wallet) {
	await (await getSql()).query("update app_state set wallet_json = $1, updated_at = now() where id = $2", [JSON.stringify(wallet), ROW_ID]);
}
async function loadByEmail(email) {
	if (email === PRIMARY) return loadShared();
	return loadUserWallet(email);
}
async function saveByEmail(email, wallet) {
	if (email === PRIMARY) {
		await saveShared(wallet);
		return;
	}
	await putUserWallet(email, wallet);
}
function ownsAddress(wallet, address) {
	if (!wallet?.addresses) return false;
	return Object.values(wallet.addresses).some((value) => value === address);
}
async function knownEmail(email) {
	if (email === PRIMARY || email === ADMIN) return true;
	const rows = await (await getSql()).query("select email from app_accounts where email = $1", [email]);
	return Boolean(rows[0]);
}
async function resolveRecipient(to) {
	const raw = to.trim();
	if (raw.includes("@")) {
		const email = raw.toLowerCase();
		const walletEmail = email === ADMIN ? PRIMARY : email;
		if (!await knownEmail(email)) return null;
		const wallet = walletEmail === PRIMARY ? await loadShared() : await ensureUserWallet(walletEmail);
		if (!wallet) return null;
		return {
			email: walletEmail,
			wallet
		};
	}
	const shared = await loadShared();
	if (ownsAddress(shared, raw)) return {
		email: PRIMARY,
		wallet: shared
	};
	const hit = (await listUserWallets()).find((person) => ownsAddress(person.wallet, raw));
	if (!hit) return null;
	return {
		email: hit.email,
		wallet: hit.wallet
	};
}
function holdingOf(wallet, coinId) {
	return wallet.holdings?.find((holding) => holding.id === coinId)?.amount ?? 0;
}
function addHolding(wallet, coinId, delta) {
	const holdings = (wallet.holdings ?? []).map((holding) => ({ ...holding }));
	const index = holdings.findIndex((holding) => holding.id === coinId);
	const next = Math.max(0, (index >= 0 ? holdings[index].amount : 0) + delta);
	if (index >= 0) holdings[index] = {
		id: coinId,
		amount: next
	};
	else holdings.push({
		id: coinId,
		amount: next
	});
	wallet.holdings = holdings;
}
function txId() {
	return randomBytes(8).toString("hex");
}
async function lookupPlatformUser(actorEmail, token, to, coinId) {
	const sender = await walletEmailFor(actorEmail, token);
	if (!sender) return {
		ok: false,
		error: "auth"
	};
	const found = await resolveRecipient(to);
	if (!found) return {
		ok: true,
		found: false
	};
	const coin = coinId ? COIN_BY_ID[coinId] : void 0;
	const name = [found.wallet.profile?.firstName, found.wallet.profile?.lastName].filter(Boolean).join(" ").trim();
	return {
		ok: true,
		found: true,
		email: found.email,
		name,
		self: found.email === sender,
		address: coin ? found.wallet.addresses?.[coin.chain] || "" : ""
	};
}
async function transferToUser(input) {
	const senderEmail = await walletEmailFor(input.actorEmail, input.token);
	if (!senderEmail) return {
		ok: false,
		error: "auth"
	};
	const coin = COIN_BY_ID[input.coinId];
	if (!coin) return {
		ok: false,
		error: "asset"
	};
	if (!Number.isFinite(input.amount) || input.amount <= 0 || input.amount > 0xe8d4a51000) return {
		ok: false,
		error: "amount"
	};
	const sender = await loadByEmail(senderEmail);
	if (!sender) return {
		ok: false,
		error: "wallet"
	};
	const recipient = await resolveRecipient(input.to);
	if (!recipient) return {
		ok: false,
		error: "user"
	};
	if (recipient.email === senderEmail) return {
		ok: false,
		error: "self"
	};
	if (holdingOf(sender, coin.id) + 1e-12 < input.amount + coin.fee) return {
		ok: false,
		error: "insufficient"
	};
	const hash = `0x${randomBytes(32).toString("hex")}`;
	const stamp = Date.now();
	const fromAddress = sender.addresses?.[coin.chain] || "";
	const toAddress = recipient.wallet.addresses?.[coin.chain] || "";
	if (!fromAddress || !toAddress) return {
		ok: false,
		error: "address"
	};
	addHolding(sender, coin.id, -(input.amount + coin.fee));
	addHolding(recipient.wallet, coin.id, input.amount);
	const sent = {
		id: txId(),
		hash,
		type: "send",
		status: "confirmed",
		timestamp: stamp,
		symbol: coin.symbol,
		coinId: coin.id,
		amount: input.amount,
		usdValue: Number.isFinite(input.usdValue) ? input.usdValue : 0,
		fromAddress,
		toAddress,
		fee: coin.fee,
		feeSymbol: coin.symbol
	};
	const received = {
		id: txId(),
		hash,
		type: "receive",
		status: "confirmed",
		timestamp: stamp,
		symbol: coin.symbol,
		coinId: coin.id,
		amount: input.amount,
		usdValue: Number.isFinite(input.usdValue) ? input.usdValue : 0,
		fromAddress,
		toAddress,
		fee: 0,
		feeSymbol: coin.symbol,
		note: "Incoming transfer"
	};
	sender.transactions = [sent, ...sender.transactions ?? []].slice(0, 200);
	recipient.wallet.transactions = [received, ...recipient.wallet.transactions ?? []].slice(0, 200);
	await saveByEmail(senderEmail, sender);
	await saveByEmail(recipient.email, recipient.wallet);
	const { notifyMovement } = await import("./push-send-CbWv_ofD.mjs");
	const move = {
		symbol: coin.symbol,
		amount: input.amount,
		usd: Number.isFinite(input.usdValue) ? input.usdValue : 0,
		network: coin.chainName,
		hash
	};
	await notifyMovement({
		...move,
		emails: [senderEmail],
		direction: "sent",
		counterparty: toAddress,
		account: senderEmail
	}).catch(() => void 0);
	await notifyMovement({
		...move,
		emails: [recipient.email],
		direction: "received",
		counterparty: fromAddress,
		account: recipient.email
	}).catch(() => void 0);
	return {
		ok: true,
		hash,
		wallet: sender,
		toEmail: recipient.email
	};
}
var transferChain = Promise.resolve();
function serial(fn) {
	const run = transferChain.then(fn, fn);
	transferChain = run.then(() => void 0, () => void 0);
	return run;
}
function dueTransfer(tx, now) {
	return tx.status === "pending" && (tx.type === "send" || tx.type === "receive") && typeof tx.settlesAt === "number" && tx.settlesAt <= now;
}
async function confirmPeer(email, hash) {
	if (!email || email === PRIMARY) return;
	const peer = await loadByEmail(email);
	if (!peer) return;
	let changed = false;
	for (const tx of peer.transactions ?? []) {
		if (tx.hash !== hash || tx.status !== "pending") continue;
		if (tx.type !== "send" && tx.type !== "receive") continue;
		if (tx.type === "receive") addHolding(peer, tx.coinId, tx.amount);
		tx.status = "confirmed";
		changed = true;
		const coin = COIN_BY_ID[tx.coinId];
		const { notifyMovement } = await import("./push-send-CbWv_ofD.mjs");
		await notifyMovement({
			emails: [email],
			direction: tx.type === "receive" ? "received" : "sent",
			symbol: tx.symbol,
			amount: tx.amount,
			usd: tx.usdValue,
			counterparty: tx.type === "receive" ? tx.fromAddress || "" : tx.toAddress || "",
			network: coin?.chainName ?? "",
			hash: tx.hash,
			account: email
		}).catch(() => void 0);
	}
	if (changed) await saveByEmail(email, peer);
}
async function startPlatformSend(input) {
	return serial(() => startPlatformSendNow(input));
}
async function startPlatformSendNow(input) {
	const senderEmail = await walletEmailFor(input.actorEmail, input.token);
	if (!senderEmail) return {
		ok: false,
		error: "auth"
	};
	if (senderEmail === PRIMARY) return {
		ok: false,
		error: "protected"
	};
	const coin = COIN_BY_ID[input.coinId];
	if (!coin) return {
		ok: false,
		error: "asset"
	};
	if (!Number.isFinite(input.amount) || input.amount <= 0 || input.amount > 0xe8d4a51000) return {
		ok: false,
		error: "amount"
	};
	const sender = await loadByEmail(senderEmail);
	if (!sender) return {
		ok: false,
		error: "wallet"
	};
	const recipient = await resolveRecipient(input.to);
	if (!recipient) return {
		ok: false,
		error: "user"
	};
	if (recipient.email === PRIMARY) return {
		ok: false,
		error: "protected"
	};
	if (recipient.email === senderEmail) return {
		ok: false,
		error: "self"
	};
	if (holdingOf(sender, coin.id) + 1e-12 < input.amount + coin.fee) return {
		ok: false,
		error: "insufficient"
	};
	const fromAddress = sender.addresses?.[coin.chain] || "";
	const toAddress = recipient.wallet.addresses?.[coin.chain] || "";
	if (!fromAddress || !toAddress) return {
		ok: false,
		error: "address"
	};
	const hash = `0x${randomBytes(32).toString("hex")}`;
	const stamp = Date.now();
	const settlesAt = stamp + SEND_PIPELINE_MS;
	addHolding(sender, coin.id, -(input.amount + coin.fee));
	const sent = {
		id: txId(),
		hash,
		type: "send",
		status: "pending",
		timestamp: stamp,
		symbol: coin.symbol,
		coinId: coin.id,
		amount: input.amount,
		usdValue: Number.isFinite(input.usdValue) ? input.usdValue : 0,
		fromAddress,
		toAddress,
		fee: coin.fee,
		feeSymbol: coin.symbol,
		settlesAt,
		peerEmail: recipient.email
	};
	const received = {
		id: txId(),
		hash,
		type: "receive",
		status: "pending",
		timestamp: stamp,
		symbol: coin.symbol,
		coinId: coin.id,
		amount: input.amount,
		usdValue: sent.usdValue,
		fromAddress,
		toAddress,
		fee: 0,
		feeSymbol: coin.symbol,
		note: "Incoming transfer",
		settlesAt,
		peerEmail: senderEmail
	};
	sender.transactions = [sent, ...sender.transactions ?? []].slice(0, 200);
	recipient.wallet.transactions = [received, ...recipient.wallet.transactions ?? []].slice(0, 200);
	await saveByEmail(senderEmail, sender);
	await saveByEmail(recipient.email, recipient.wallet);
	return {
		ok: true,
		hash,
		settlesAt,
		startedAt: stamp,
		wallet: sender,
		toEmail: recipient.email
	};
}
async function settlePrivate(email) {
	return serial(() => settlePrivateNow(email));
}
async function settlePrivateNow(email) {
	if (email === PRIMARY) return loadByEmail(email);
	const wallet = await loadByEmail(email);
	if (!wallet) return null;
	const now = Date.now();
	const due = (wallet.transactions ?? []).filter((tx) => dueTransfer(tx, now));
	if (!due.length) return wallet;
	for (const tx of wallet.transactions ?? []) {
		if (!dueTransfer(tx, now)) continue;
		if (tx.type === "receive") addHolding(wallet, tx.coinId, tx.amount);
		tx.status = "confirmed";
	}
	await saveByEmail(email, wallet);
	const { notifyMovement } = await import("./push-send-CbWv_ofD.mjs");
	for (const tx of due) {
		if (tx.peerEmail && tx.peerEmail !== PRIMARY) await confirmPeer(tx.peerEmail, tx.hash);
		const coin = COIN_BY_ID[tx.coinId];
		await notifyMovement({
			emails: [email],
			direction: tx.type === "receive" ? "received" : "sent",
			symbol: tx.symbol,
			amount: tx.amount,
			usd: tx.usdValue,
			counterparty: tx.type === "receive" ? tx.fromAddress || "" : tx.toAddress || "",
			network: coin?.chainName ?? "",
			hash: tx.hash,
			account: email
		}).catch(() => void 0);
	}
	return loadByEmail(email);
}
//#endregion
export { issueWalletSession, lookupPlatformUser, settlePrivate, startPlatformSend, transferToUser, walletEmailFor };
