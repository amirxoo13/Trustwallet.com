import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SCENARIO_CODES, type ScenarioCode } from "@/lib/auth-config";
import { t } from "@/lib/i18n";
import { useLoginWindow } from "@/lib/login-window";
import { useSite } from "@/lib/site-store";
import { useWallet, type LoginError } from "@/lib/store";
import { refreshCloud } from "@/lib/cloud-sync";
import { cn } from "@/lib/utils";

export function LoginScreen() {
  const login = useWallet((s) => s.login);
  const savedScenario = useWallet((s) => s.scenario);
  const walletHydrated = useWallet((s) => s.hydrated);
  const lockedScenario = useLoginWindow((s) => s.lockedScenario);
  const windowHydrated = useLoginWindow((s) => s.hydrated);
  const copy = t();
  const brandName = useSite((s) => s.brandName);
  const loginTitle = useSite((s) => s.loginTitle);
  const loginSub = useSite((s) => s.loginSub);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState<LoginError | null>(null);
  const [busy, setBusy] = useState(false);
  const [scenario, setScenario] = useState<ScenarioCode | null>(null);

  const firstChoice = lockedScenario ?? savedScenario;
  const showCodes = walletHydrated && windowHydrated && !firstChoice;

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    const res = login(email, password, firstChoice ?? scenario);
    setBusy(false);
    if (!res.ok) {
      setError(res.error);
      return;
    }
    setError(null);
    refreshCloud();
    void navigate({ to: "/wallet" });
  }

  const errorText = error === "scenario" ? "Select T20, F20 or K20 to continue." : error ? copy.login.error : null;

  return (
    <MarketingShell>
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">{brandName}</p>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">{loginTitle}</h1>
        <p className="mt-2 text-sm text-muted">{loginSub}</p>

        <form onSubmit={onSubmit} className="mt-8 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">{copy.login.email}</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">{copy.login.password}</Label>
            <div className="relative">
              <Input
                id="password"
                type={show ? "text" : "password"}
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pe-12"
                required
              />
              <button
                type="button"
                className="absolute top-0 end-0 inline-flex size-12 items-center justify-center text-muted"
                onClick={() => setShow((v) => !v)}
                aria-label={show ? "Hide password" : "Show password"}
              >
                {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
          </div>

          {showCodes ? (
          <div>
            <p className="mb-2 text-xs font-medium text-muted">Select a code</p>
            <div className="grid grid-cols-3 gap-2">
              {SCENARIO_CODES.map((code) => (
                <button
                  key={code}
                  type="button"
                  onClick={() => setScenario(code)}
                  className={cn(
                    "flex h-12 items-center justify-center rounded-md font-mono text-sm tracking-wide shadow-border",
                    scenario === code ? "bg-foreground text-background" : "bg-card text-foreground hover:bg-card-elevated",
                  )}
                >
                  {code}
                </button>
              ))}
            </div>
          </div>
          ) : null}

          {errorText ? <p className="text-sm text-danger">{errorText}</p> : null}
          <Button type="submit" variant="solid" size="lg" disabled={busy}>
            {copy.login.submit}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/" className="hover:text-foreground">
            ← {brandName}
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
