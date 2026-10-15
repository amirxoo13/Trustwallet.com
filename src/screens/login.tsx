import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { MarketingShell } from "@/components/marketing-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { t } from "@/lib/i18n";
import { useSite } from "@/lib/site-store";
import { useWallet } from "@/lib/store";
import { refreshCloud, setHoldPush } from "@/lib/cloud-sync";
import { registerAccount } from "@/lib/accounts";
import { track } from "@/lib/live";

export function LoginScreen() {
  const login = useWallet((s) => s.login);
  const copy = t();
  const brandName = useSite((s) => s.brandName);
  const loginTitle = useSite((s) => s.loginTitle);
  const loginSub = useSite((s) => s.loginSub);
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">(() =>
    typeof sessionStorage !== "undefined" && sessionStorage.getItem("trust-after-passcode") === "1" ? "signup" : "signin",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    sessionStorage.removeItem("trust-after-passcode");
  }, []);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (mode === "signup") {
      if (password.length < 8) {
        setError("Use at least 8 characters.");
        return;
      }
      if (password !== confirm) {
        setError("Passwords do not match.");
        return;
      }
    }
    setBusy(true);
    setHoldPush(true);
    try {
      if (mode === "signup") {
        const created = await registerAccount({ data: { email, password } });
        if (!created.ok) {
          track("action", "Signup failed");
          setError(
            created.error === "taken"
              ? "That email is already registered."
              : created.error === "weak"
                ? "Use at least 8 characters."
                : "Enter a valid email.",
          );
          return;
        }
        track("action", `Created account ${email.trim().toLowerCase()}`);
      }
      const res = await login(email, password);
      if (!res.ok) {
        track("action", "Login failed");
        setError(copy.login.error);
        return;
      }
      track("action", useWallet.getState().role === "admin" ? "Signed in as admin" : `Signed in as ${email.trim().toLowerCase()}`);
      await refreshCloud();
      void navigate({ to: "/wallet" });
    } catch {
      setError("Could not reach the server. Try again.");
    } finally {
      setHoldPush(false);
      setBusy(false);
    }
  }

  return (
    <MarketingShell>
      <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16">
        <p className="text-xs font-medium tracking-[0.18em] text-primary uppercase">{brandName}</p>
        <h1 className="mt-3 font-display text-2xl font-semibold tracking-tight">
          {mode === "signup" ? "Create account" : loginTitle}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {mode === "signup" ? "Use any email. No code is required." : loginSub}
        </p>

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
                autoComplete={mode === "signup" ? "new-password" : "current-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pe-12"
                required
                minLength={mode === "signup" ? 8 : 1}
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
          {mode === "signup" ? (
            <div className="flex flex-col gap-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <Input
                id="confirm"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
            </div>
          ) : null}

          {error ? <p className="text-sm text-danger">{error}</p> : null}
          <Button type="submit" variant="solid" size="lg" disabled={busy}>
            {mode === "signup" ? "Create account" : copy.login.submit}
          </Button>
        </form>
        <button
          type="button"
          className="mt-4 text-sm text-muted hover:text-foreground"
          onClick={() => {
            setMode((m) => (m === "signin" ? "signup" : "signin"));
            setError("");
          }}
        >
          {mode === "signup" ? "Already have an account? Sign in" : "Create an account with another email"}
        </button>
        <p className="mt-6 text-center text-sm text-muted">
          <Link to="/" className="hover:text-foreground">
            ← {brandName}
          </Link>
        </p>
      </div>
    </MarketingShell>
  );
}
