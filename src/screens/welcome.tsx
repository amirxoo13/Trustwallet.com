import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ChevronLeft } from "lucide-react";
import { toast } from "sonner";

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
    const supported = window.PublicKeyCredential?.isUserVerifyingPlatformAuthenticatorAvailable;
    if (!supported) {
      toast.error("This phone has no fingerprint unlock.");
      return;
    }
    const available = await supported.call(window.PublicKeyCredential).catch(() => false);
    if (!available) {
      toast.error("This phone has no fingerprint unlock.");
      return;
    }
    toast.message("Create the 6-digit passcode first. Fingerprint can unlock it after the wallet exists.");
  }

  if (step === "home") {
    return (
      <main
        className="flex min-h-dvh flex-col px-6 text-white"
        style={{
          background: "linear-gradient(180deg, #07184f 0%, #0c2478 42%, #0a1c62 100%)",
          paddingTop: "calc(var(--safe-top) + 12px)",
          paddingBottom: "calc(var(--safe-bottom) + 18px)",
        }}
      >
        <img src="/welcome-cube.jpg" alt="" className="mx-auto mt-6 w-full max-w-[22rem] object-contain" />
        <div className="mt-auto">
          <h1 className="max-w-[18rem] text-[2.05rem] leading-[1.12] font-semibold tracking-tight">
            Your one-stop
            <br />
            Web3 wallet
          </h1>
          <button
            type="button"
            className="mt-8 h-14 w-full rounded-full text-[17px] font-semibold"
            style={{ background: "linear-gradient(180deg, #4b7dff 0%, #2f62f6 100%)" }}
            onClick={() => {
              setStep("create");
              setCode("");
              setFirst("");
            }}
          >
            Create a wallet
          </button>
          <button
            type="button"
            className="mt-3 h-14 w-full rounded-full text-[17px] font-semibold"
            style={{ background: "#1d3f9e" }}
            onClick={() => void navigate({ to: "/login" })}
          >
            I already have a wallet
          </button>
          <p className="mt-4 text-center text-[13px] leading-relaxed text-white/80">
            By tapping any button, you agree and consent to our{" "}
            <a href="/security" className="text-[#8eb0ff]">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/security" className="text-[#8eb0ff]">
              Privacy Policy
            </a>
            .
          </p>
        </div>
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
      className="flex min-h-dvh flex-col text-white"
      style={{
        background: "linear-gradient(180deg, #08184f 0%, #0d267c 50%, #0a1d68 100%)",
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
            style={{ borderColor: "rgb(170 198 255 / 0.85)" }}
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
          <Fingerprint />
        </button>
        <button type="button" className="h-16" style={{ textShadow: "0 0 12px rgb(255 255 255 / 0.55)" }} onClick={() => press("0")}>
          0
        </button>
        <button type="button" className="flex h-16 items-center justify-center" onClick={() => setCode((c) => c.slice(0, -1))} aria-label="Delete">
          <span className="flex h-10 w-14 items-center justify-center rounded-md text-lg" style={{ background: "#3d6dff" }}>
            ⌫
          </span>
        </button>
      </div>
    </main>
  );
}

function Fingerprint() {
  return (
    <svg viewBox="0 0 48 48" className="size-10" fill="none" stroke="#7eb0ff" strokeWidth="2.2">
      <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      <path d="M14 24c.4 6 2.2 10 4.6 13" />
      <path d="M24 18v14c0 3.2-1.2 6.2-2.6 8" />
      <path d="M30 20c1 6 .2 11-2 16" />
      <path d="M20 24c.3 5 .2 9-1.2 13" />
      <path d="M18 16c1.6-2.2 4-3.4 6.6-3.4 4.6 0 8.4 3.6 8.4 8.2 0 4.2-.6 7.4-1.8 11" />
    </svg>
  );
}
