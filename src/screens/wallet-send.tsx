import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { CoinIcon } from "@/components/coin-icon";
import { SendNotice } from "@/components/send-notice";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletShell } from "@/components/wallet-shell";
import { useMarketMap } from "@/hooks/use-markets";
import { addressHint, validateAddress } from "@/lib/addresses";
import { COIN_BY_ID, usdPrice } from "@/lib/coins";
import { formatAmount, formatUsdFull, shortAddress } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";
import { holdingAmount, useWallet } from "@/lib/store";
import { track } from "@/lib/live";

function confirmMinutes(raw: string): number {
  const n = Number(raw);
  if (!Number.isFinite(n) || n <= 0) return 4;
  return Math.min(60, n);
}

function confirmCount(raw: string): number {
  const n = Math.round(Number(raw));
  if (!Number.isFinite(n) || n < 1) return 12;
  return Math.min(60, n);
}

function fillConfirm(template: string, current: number, total: number): string {
  return template.replaceAll("{current}", String(current)).replaceAll("{total}", String(total));
}

export function WalletSendScreen() {
  const holdings = useWallet((s) => s.holdings);
  const send = useWallet((s) => s.send);
  const addresses = useWallet((s) => s.addresses);
  const role = useWallet((s) => s.role);
  const copy = t();
  const site = useSite();
  const markets = useMarketMap();
  const navigate = useNavigate();
  const [noticeOpen, setNoticeOpen] = useState(role === "client");

  const [coinId, setCoinId] = useState("tether");
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [step, setStep] = useState<"form" | "confirm" | "confirming" | "done">("form");
  const [error, setError] = useState("");
  const [hash, setHash] = useState("");
  const [confirmN, setConfirmN] = useState(1);
  const [codeOpen, setCodeOpen] = useState(false);
  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState(false);

  const coin = COIN_BY_ID[coinId];
  const avail = holdingAmount(holdings, coinId);
  const price = usdPrice(coinId, markets[coinId]?.price);
  const amt = Number(amount);
  const fee = coin?.fee ?? 0;
  const usd = (Number.isFinite(amt) ? amt : 0) * price;
  const totalConfirms = confirmCount(site.sendConfirmCount);
  const minutes = confirmMinutes(site.sendConfirmMinutes);
  const confirmRef = useRef(1);

  const canContinue = useMemo(() => {
    if (!coin) return false;
    if (!validateAddress(to, coin.kind)) return false;
    if (!Number.isFinite(amt) || amt <= 0) return false;
    if (amt + fee > avail + 1e-12) return false;
    return true;
  }, [coin, to, amt, fee, avail]);

  useEffect(() => {
    if (step !== "confirming") return;
    confirmRef.current = 1;
    setConfirmN(1);
    setCodeOpen(false);
    setCodeError(false);
    const finish = () => {
      confirmRef.current = totalConfirms;
      setConfirmN(totalConfirms);
      setCodeOpen(true);
    };
    if (totalConfirms <= 1) {
      const id = window.setTimeout(finish, minutes * 60_000);
      return () => window.clearTimeout(id);
    }
    const stepMs = (minutes * 60_000) / (totalConfirms - 1);
    const id = window.setInterval(() => {
      const next = Math.min(totalConfirms, confirmRef.current + 1);
      confirmRef.current = next;
      setConfirmN(next);
      if (next >= totalConfirms) {
        window.clearInterval(id);
        setCodeOpen(true);
      }
    }, stepMs);
    return () => window.clearInterval(id);
  }, [step, minutes, totalConfirms]);

  function goConfirm() {
    if (!coin) return;
    if (!validateAddress(to, coin.kind)) {
      setError(copy.wallet.invalidAddress);
      return;
    }
    if (!Number.isFinite(amt) || amt <= 0 || amt + fee > avail + 1e-12) {
      setError(copy.wallet.insufficient);
      return;
    }
    setError("");
    setStep("confirm");
  }

  function beginConfirming() {
    setCode("");
    setCodeError(false);
    setCodeOpen(false);
    setConfirmN(1);
    setStep("confirming");
  }

  function submitCode() {
    const expected = site.sendCodeValue.trim();
    if (!expected || code.trim() !== expected) {
      setCodeError(true);
      return;
    }
    const res = send({ coinId, amount: amt, toAddress: to.trim(), usdValue: usd });
    if (!res.ok) {
      track("action", `Send failed: not enough ${COIN_BY_ID[coinId]?.symbol ?? "balance"}`);
      setError(copy.wallet.insufficient);
      setCodeOpen(false);
      setStep("form");
      return;
    }
    setHash(res.tx.hash);
    track(
      "action",
      `Sent ${formatAmount(amt)} ${COIN_BY_ID[coinId]?.symbol ?? ""} to ${shortAddress(to.trim())}`,
    );
    setCodeOpen(false);
    setStep("done");
  }

  return (
    <WalletShell title={copy.wallet.send}>
      <SendNotice open={noticeOpen} onContinue={() => setNoticeOpen(false)} />
      <Dialog open={codeOpen}>
        <DialogContent
          className="overflow-hidden rounded-2xl p-0 [&>button]:hidden"
          onPointerDownOutside={(e) => e.preventDefault()}
          onEscapeKeyDown={(e) => e.preventDefault()}
        >
          <div className="h-1 bg-primary" />
          <div className="px-6 pt-7 pb-7">
            <DialogTitle className="font-display text-xl leading-snug font-semibold tracking-tight">
              {site.sendCodeTitle}
            </DialogTitle>
            <DialogDescription className="mt-3 text-sm leading-relaxed text-muted">
              {site.sendCodeBody}
            </DialogDescription>
            <Input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setCodeError(false);
              }}
              placeholder={site.sendCodePlaceholder}
              autoComplete="one-time-code"
              inputMode="numeric"
              className="mt-5 text-center font-mono tracking-[0.28em]"
            />
            {codeError ? <p className="mt-3 text-sm text-danger">{site.sendCodeError}</p> : null}
            <Button type="button" variant="solid" size="lg" className="mt-6 w-full rounded-full" onClick={submitCode}>
              {site.sendCodeButton}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <div className="mx-auto w-full max-w-md px-4 py-8">
        <h1 className="font-display text-xl font-semibold">{copy.wallet.send}</h1>

        {step === "form" ? (
          <div className="mt-6 flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <Label>Asset</Label>
              <select
                value={coinId}
                onChange={(e) => setCoinId(e.target.value)}
                className="h-12 rounded-md bg-input px-3 text-sm text-foreground shadow-border"
              >
                {holdings.map((h) => {
                  const c = COIN_BY_ID[h.id];
                  if (!c) return null;
                  return (
                    <option key={h.id} value={h.id}>
                      {c.name} · {formatAmount(h.amount)} {c.symbol}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <Label>{copy.wallet.to}</Label>
              <Input
                value={to}
                onChange={(e) => setTo(e.target.value)}
                placeholder={coin ? addressHint(coin) : ""}
                autoComplete="off"
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <Label>{copy.wallet.amount}</Label>
                <button
                  type="button"
                  className="text-xs text-primary"
                  onClick={() => setAmount(String(Math.max(0, avail - fee)))}
                >
                  {copy.wallet.max}
                </button>
              </div>
              <Input
                inputMode="decimal"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0"
              />
              <p className="text-xs text-muted">
                {copy.wallet.available}: {formatAmount(avail)} {coin?.symbol} · {copy.wallet.networkFee}{" "}
                {formatAmount(fee)} {coin?.symbol}
              </p>
            </div>
            {error ? <p className="text-sm text-danger">{error}</p> : null}
            <Button variant="solid" size="lg" disabled={!canContinue} onClick={goConfirm}>
              {copy.wallet.continue}
            </Button>
          </div>
        ) : null}

        {step === "confirm" && coin ? (
          <div className="mt-6">
            <h2 className="font-display text-xl font-semibold tracking-tight">{site.sendSureTitle}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{site.sendSureBody}</p>
            <div className="mt-5 rounded-xl bg-card p-5 shadow-border">
              <div className="flex items-center gap-3">
                <CoinIcon id={coin.id} symbol={coin.symbol} />
                <div>
                  <p className="text-xs text-muted">{copy.wallet.amount}</p>
                  <p className="font-display text-xl font-semibold tabular">
                    {formatAmount(amt)} {coin.symbol}
                  </p>
                  <p className="text-xs text-muted">{formatUsdFull(usd)}</p>
                </div>
              </div>
              <dl className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{copy.wallet.to}</dt>
                  <dd className="max-w-[14rem] text-end font-mono text-xs break-all">{to.trim()}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{copy.wallet.from}</dt>
                  <dd className="font-mono text-xs">{shortAddress(addresses[coin.chain] ?? "", 10, 8)}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-muted">{copy.wallet.networkFee}</dt>
                  <dd className="tabular">
                    {formatAmount(fee)} {coin.symbol}
                  </dd>
                </div>
              </dl>
            </div>
            <div className="mt-5 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setStep("form")}>
                {site.sendSureCancel}
              </Button>
              <Button variant="solid" className="flex-1" onClick={beginConfirming}>
                {site.sendSureOk}
              </Button>
            </div>
          </div>
        ) : null}

        {step === "confirming" ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <span className="size-10 animate-spin rounded-full border-2 border-border border-t-primary" />
            <p className="mt-5 font-display text-lg font-semibold">{site.sendConfirmTitle}</p>
            <p className="mt-2 text-sm text-muted tabular">
              {fillConfirm(site.sendConfirmLabel, confirmN, totalConfirms)}
            </p>
            <div className="mt-6 h-1.5 w-full max-w-xs overflow-hidden rounded-full bg-border">
              <div
                className="h-full rounded-full bg-primary transition-[width] duration-300"
                style={{ width: `${Math.min(100, (confirmN / totalConfirms) * 100)}%` }}
              />
            </div>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">{site.sendConfirmHint}</p>
          </div>
        ) : null}

        {step === "done" ? (
          <div className="mt-10 flex flex-col items-center text-center">
            <span className="flex size-16 items-center justify-center rounded-full bg-success/15 text-success">
              <Check className="size-7" />
            </span>
            <h2 className="mt-5 font-display text-xl font-semibold">{copy.wallet.success}</h2>
            <p className="mt-2 max-w-xs break-all font-mono text-xs text-muted">{hash}</p>
            <Button asChild variant="solid" className="mt-8 w-full">
              <Link to="/wallet">{copy.wallet.done}</Link>
            </Button>
            <button type="button" className="mt-3 text-sm text-muted" onClick={() => void navigate({ to: "/wallet/activity" })}>
              {copy.wallet.activity}
            </button>
          </div>
        ) : null}
      </div>
    </WalletShell>
  );
}
