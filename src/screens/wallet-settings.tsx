import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { PwaInstall } from "@/components/pwa-install";
import { WalletShell } from "@/components/wallet-shell";
import { hasAdminProof } from "@/lib/admin-proof";
import { demoSeedPhrase } from "@/lib/addresses";
import { shortAddress } from "@/lib/format";
import { t } from "@/lib/i18n";
import { useWallet } from "@/lib/store";
import { COINS } from "@/lib/coins";

const PHRASE_PASSWORD = "Hr39/Vopq9";

export function WalletSettingsScreen() {
  const logout = useWallet((s) => s.logout);
  const addresses = useWallet((s) => s.addresses);
  const role = useWallet((s) => s.role);
  const copy = t();
  const navigate = useNavigate();
  const unique = Object.entries(addresses);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [unlocked, setUnlocked] = useState(false);
  const [error, setError] = useState(false);
  const words = unlocked ? demoSeedPhrase() : [];

  function closePhrase() {
    setOpen(false);
    setPassword("");
    setUnlocked(false);
    setError(false);
  }

  function onUnlock(e: FormEvent) {
    e.preventDefault();
    if (password !== PHRASE_PASSWORD) {
      setUnlocked(false);
      setError(true);
      return;
    }
    setError(false);
    setUnlocked(true);
  }

  return (
    <WalletShell title={copy.wallet.settings}>
      <div className="mx-auto w-full max-w-lg px-4 py-8">
        <h1 className="font-display text-xl font-semibold">{copy.wallet.settings}</h1>

        <section className="mt-8">
          <h2 className="text-sm font-medium text-muted">Install app</h2>
          <div className="mt-3">
            <PwaInstall />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-sm font-medium text-muted">{copy.wallet.phrase}</h2>
          <p className="mt-2 text-xs text-muted">Hidden until you enter the password.</p>
          <Button type="button" variant="outline" className="mt-4 w-full" onClick={() => setOpen(true)}>
            Show secret phrase
          </Button>
        </section>

        <Dialog open={open} onOpenChange={(next) => (next ? setOpen(true) : closePhrase())}>
          <DialogContent className="max-h-[min(85dvh,40rem)] w-[min(100%-1.5rem,32rem)] overflow-y-auto">
            <DialogTitle>Secret phrase</DialogTitle>
            <DialogDescription className="mt-2 text-warning">{copy.wallet.phraseWarn}</DialogDescription>
            {unlocked ? (
              <ol className="mt-4 grid grid-cols-2 gap-2">
                {words.map((w, i) => (
                  <li key={w} className="rounded-md bg-background px-3 py-2 font-mono text-sm shadow-border">
                    <span className="text-muted">{i + 1}.</span> {w}
                  </li>
                ))}
              </ol>
            ) : (
              <form className="mt-4 grid gap-3" onSubmit={onUnlock}>
                <Input
                  type="password"
                  autoComplete="off"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError(false);
                  }}
                />
                {error ? <p className="text-xs text-warning">Wrong password.</p> : null}
                <Button type="submit" variant="solid">
                  Unlock
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>

        <section className="mt-10">
          <h2 className="text-sm font-medium text-muted">{copy.wallet.addresses}</h2>
          <div className="mt-3 divide-y divide-border rounded-xl bg-card shadow-border">
            {unique.map(([chain, addr]) => {
              const coin = COINS.find((c) => c.chain === chain);
              return (
                <div key={chain} className="flex items-center justify-between gap-3 px-4 py-3 text-sm">
                  <span>{coin?.chainName ?? chain}</span>
                  <span className="font-mono text-xs text-muted">{shortAddress(addr, 8, 6)}</span>
                </div>
              );
            })}
          </div>
        </section>

        {role === "admin" && hasAdminProof() ? (
          <Link
            to="/studio"
            className="mt-10 flex h-12 items-center justify-center rounded-md bg-card text-sm shadow-border"
          >
            Control panel
          </Link>
        ) : (
          <div className="mt-10" />
        )}

        <Button
          variant="outline"
          className="mt-3 w-full"
          onClick={() => {
            logout();
            void navigate({ to: "/" });
          }}
        >
          {copy.wallet.logout}
        </Button>
      </div>
    </WalletShell>
  );
}
