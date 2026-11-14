import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight, ChevronLeft, Fingerprint as FingerprintIcon } from "lucide-react";
import { LogoWord } from "@/components/logo";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { enrollFingerprint, hasFingerprint, verifyFingerprint } from "@/lib/device-lock";

const PASSCODE_KEY = "trust-passcode";

export function WelcomeScreen() {
  const navigate = useNavigate();
  const [step, setStep] = useState<"home" | "create" | "confirm">("home");
  const [first, setFirst] = useState("");
  const [code, setCode] = useState("");
  const [shake, setShake] = useState(false);

  function press(digit: string) {
    setCode((current) => {
      if (current.length >= 6) return current;
      const next = current + digit;
      if (next.length === 6) window.setTimeout(() => finish(next), 120);
      return next;
    });
  }

  function finish(next: string) {
    if (step === "create") {
      setFirst(next);
      setCode("");
      setStep("confirm");
      return;
    }
    if (next !== first) {
      setShake(true);
      setCode("");
      window.setTimeout(() => setShake(false), 400);
      toast.error("Passcodes do not match. Try again.");
      return;
    }
    localStorage.setItem(PASSCODE_KEY, next);
    sessionStorage.setItem("trust-after-passcode", "1");
    void navigate({ to: "/login" });
  }

  async function fingerprint() {
    try {
      const ok = hasFingerprint() ? await verifyFingerprint() : await enrollFingerprint();
      if (!ok) {
        toast.error("Fingerprint was not accepted.");
        return;
      }
      toast.success(hasFingerprint() ? "Fingerprint is ready." : "Fingerprint saved on this phone.");
    } catch {
      toast.error("This phone has no fingerprint unlock. Use the 6-digit passcode.");
    }
  }

  if (step === "home") {
    return (
      <main className="rv-intro">
        <header><LogoWord /><Link to="/security">Account controls <ArrowUpRight size={15} /></Link></header>
        <div className="rv-cover">
          <div className="rv-cover-art" aria-hidden="true"><img src={import.meta.env.BASE_URL + "rivak-engraving.svg"} alt="" /></div>
          <div className="rv-cover-text">
            <span className="rv-kicker">Campus wallet simulator</span>
            <h1>The practice<br /><em>ledger.</em></h1>
            <p>Move practice assets between accounts and follow each transfer through your campus ledger.</p>
            <div className="rv-cover-actions">
              <button onClick={() => { setStep("create"); setCode(""); setFirst(""); }}>Create a wallet <ArrowUpRight size={19} /></button>
              <button onClick={() => void navigate({ to: "/login" })}>Sign in</button>
            </div>
          </div>
        </div>
        <footer><span>Internal transfers · Practice assets only</span><Link to="/markets">Market directory ↗</Link></footer>
      </main>
    );
  }

  const title = step === "confirm" ? "Confirm passcode" : "Create passcode";
  const hint =
    step === "confirm"
      ? "Re-enter your passcode to confirm."
      : "Enter your passcode. Be sure to remember it so you can unlock your wallet.";

  return (
    <main
      className="rv-pin flex min-h-dvh flex-col"
      style={{
        background: "var(--color-background)",
        paddingTop: "calc(var(--safe-top) + 8px)",
        paddingBottom: "calc(var(--safe-bottom) + 16px)",
      }}
    >
      <button type="button" className="ms-2 inline-flex size-11 items-center justify-center" onClick={() => setStep("home")} aria-label="Back">
        <ChevronLeft className="size-7" />
      </button>
      <h1 className="mt-8 text-center text-[1.65rem] font-semibold tracking-tight" style={{ textShadow: "0 0 18px rgb(255 255 255 / 0.35)" }}>
        {title}
      </h1>
      <div className={`mt-8 flex justify-center gap-2.5 px-4 ${shake ? "animate-pulse" : ""}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className="flex size-12 items-center justify-center rounded-lg border text-xl font-semibold"
            style={{ borderColor: "var(--color-border-strong)" }}
          >
            {code[i] ? "•" : ""}
          </span>
        ))}
      </div>
      <p className="mx-auto mt-7 max-w-[20rem] text-center text-[15px] leading-snug font-medium">{hint}</p>
      <div className="mt-auto grid grid-cols-3 gap-y-2 px-6 pt-8 text-center text-[2rem] font-medium">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
          <button key={digit} type="button" className="h-16" style={{ textShadow: "0 0 12px rgb(255 255 255 / 0.55)" }} onClick={() => press(digit)}>
            {digit}
          </button>
        ))}
        <button type="button" className="flex h-16 items-center justify-center" onClick={() => void fingerprint()} aria-label="Fingerprint">
          <FingerprintIcon size={28} />
        </button>
        <button type="button" className="h-16" style={{ textShadow: "0 0 12px rgb(255 255 255 / 0.55)" }} onClick={() => press("0")}>
          0
        </button>
        <button type="button" className="flex h-16 items-center justify-center" onClick={() => setCode((c) => c.slice(0, -1))} aria-label="Delete">
          <span className="flex h-10 w-14 items-center justify-center rounded-md text-lg" style={{ background: "var(--color-accent-soft)" }}>
            ⌫
          </span>
        </button>
      </div>
    </main>
  );
}
