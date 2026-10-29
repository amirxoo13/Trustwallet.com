import { useEffect, useState } from "react";
import { toast } from "sonner";
import {
  enrollFingerprint,
  getPasscode,
  hasFingerprint,
  setPasscode,
  useDeviceAuth,
  verifyFingerprint,
} from "@/lib/device-lock";

export function DeviceLockHost() {
  const pending = useDeviceAuth((s) => s.pending);
  const finish = useDeviceAuth((s) => s.finish);
  const [phase, setPhase] = useState<"enter" | "create" | "confirm">("enter");
  const [code, setCode] = useState("");
  const [first, setFirst] = useState("");
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (!pending) return;
    setCode("");
    setFirst("");
    setShake(false);
    setPhase(getPasscode() && pending.purpose !== "setup" ? "enter" : "create");
  }, [pending]);

  if (!pending) return null;

  function fail(message: string) {
    setShake(true);
    setCode("");
    window.setTimeout(() => setShake(false), 400);
    toast.error(message);
  }

  function finishCode(next: string) {
    if (phase === "create") {
      setFirst(next);
      setCode("");
      setPhase("confirm");
      return;
    }
    if (phase === "confirm") {
      if (next !== first) {
        fail("Passcodes do not match. Try again.");
        return;
      }
      setPasscode(next);
      finish(true);
      return;
    }
    if (next !== getPasscode()) {
      fail("Wrong passcode.");
      return;
    }
    finish(true);
  }

  function press(digit: string) {
    setCode((current) => {
      if (current.length >= 6) return current;
      const next = current + digit;
      if (next.length === 6) window.setTimeout(() => finishCode(next), 80);
      return next;
    });
  }

  async function fingerprint() {
    try {
      const ok = hasFingerprint() ? await verifyFingerprint() : await enrollFingerprint();
      if (!ok) {
        toast.error("Fingerprint was not accepted. Use your passcode.");
        return;
      }
      if (!getPasscode()) {
        toast.success("Fingerprint is on. Finish the 6-digit passcode.");
        return;
      }
      finish(true);
    } catch {
      toast.error("Fingerprint is not available on this phone. Use your passcode.");
    }
  }

  const title =
    phase === "confirm" ? "Confirm passcode" : phase === "create" ? "Create passcode" : pending.purpose === "transaction" ? "Confirm transaction" : "Unlock";
  const hint =
    phase === "confirm"
      ? "Re-enter the 6-digit passcode."
      : phase === "create"
        ? "Choose a 6-digit passcode. You can also use fingerprint."
        : "Use fingerprint or your 6-digit passcode.";

  return (
    <div
      className="fixed inset-0 z-[80] flex flex-col text-white"
      style={{
        background: "linear-gradient(180deg, #08184f 0%, #0d267c 50%, #0a1d68 100%)",
        paddingTop: "calc(var(--safe-top) + 18px)",
        paddingBottom: "calc(var(--safe-bottom) + 16px)",
      }}
    >
      <p className="text-center text-xs font-medium tracking-[0.16em] text-white/70 uppercase">Trust Wallet</p>
      <h1 className="mt-8 text-center text-[1.55rem] font-semibold tracking-tight">{title}</h1>
      <div className={`mt-8 flex justify-center gap-2 px-4 ${shake ? "animate-pulse" : ""}`}>
        {Array.from({ length: 6 }, (_, i) => (
          <span
            key={i}
            className="flex size-11 items-center justify-center rounded-lg border text-xl font-semibold"
            style={{ borderColor: "rgb(170 198 255 / 0.85)" }}
          >
            {code[i] ? "•" : ""}
          </span>
        ))}
      </div>
      <p className="mx-auto mt-6 max-w-[18rem] text-center text-sm leading-snug text-white/85">{hint}</p>
      <div className="mt-auto grid grid-cols-3 gap-y-2 px-6 text-center text-[1.8rem] font-medium">
        {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((digit) => (
          <button key={digit} type="button" className="h-14" onClick={() => press(digit)}>
            {digit}
          </button>
        ))}
        <button type="button" className="flex h-14 items-center justify-center" onClick={() => void fingerprint()} aria-label="Fingerprint">
          <svg viewBox="0 0 48 48" className="size-9" fill="none" stroke="#7eb0ff" strokeWidth="2.2">
            <path d="M16 20c0-4.4 3.6-8 8-8s8 3.6 8 8" />
            <path d="M14 24c.4 6 2.2 10 4.6 13" />
            <path d="M24 18v14c0 3.2-1.2 6.2-2.6 8" />
            <path d="M30 20c1 6 .2 11-2 16" />
            <path d="M20 24c.3 5 .2 9-1.2 13" />
            <path d="M18 16c1.6-2.2 4-3.4 6.6-3.4 4.6 0 8.4 3.6 8.4 8.2 0 4.2-.6 7.4-1.8 11" />
          </svg>
        </button>
        <button type="button" className="h-14" onClick={() => press("0")}>
          0
        </button>
        <button type="button" className="flex h-14 items-center justify-center" onClick={() => setCode((c) => c.slice(0, -1))} aria-label="Delete">
          <span className="flex h-9 w-12 items-center justify-center rounded-md text-base" style={{ background: "#3d6dff" }}>
            ⌫
          </span>
        </button>
      </div>
      {pending.purpose === "transaction" ? (
        <button type="button" className="mt-3 text-sm text-white/75" onClick={() => finish(false)}>
          Cancel
        </button>
      ) : pending.purpose === "unlock" ? (
        <button type="button" className="mt-3 text-sm text-white/75" onClick={() => finish(false)}>
          Switch account
        </button>
      ) : (
        <div className="mt-3 h-5" />
      )}
    </div>
  );
}
