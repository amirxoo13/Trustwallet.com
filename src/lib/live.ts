import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { ADMIN_ACCOUNT } from "@/lib/auth-config";
import { useWallet } from "@/lib/store";

const eventInput = z.object({
  kind: z.enum(["open", "tap", "action"]),
  label: z.string().min(1).max(140),
});

const pushInput = z.object({
  sessionId: z.string().min(4).max(40),
  role: z.enum(["guest", "client", "admin"]),
  who: z.string().min(1).max(80),
  path: z.string().min(1).max(200),
  device: z.string().min(1).max(40),
  events: z.array(eventInput).max(20),
});

export const pushLive = createServerFn({ method: "POST" })
  .validator(pushInput)
  .handler(async ({ data }) => {
    const { writeLive } = await import("./live-send");
    return writeLive(data);
  });

export const loadLive = createServerFn({ method: "POST" })
  .validator(z.object({ proof: z.string().max(200) }))
  .handler(async ({ data }) => {
    if (data.proof !== ADMIN_ACCOUNT.password) {
      return { ok: false as const, error: "denied" as const, now: Date.now(), online: [], events: [] };
    }
    const { readLive } = await import("./live-send");
    return readLive();
  });

const PAGE_NAMES: Record<string, string> = {
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
  "/wallet/ethereum": "Ethereum account",
};

export function pageName(path: string) {
  if (path.startsWith("/wallet/asset/")) {
    const id = path.split("/").pop() || "asset";
    return `Asset ${id}`;
  }
  return PAGE_NAMES[path] ?? path;
}

type Queued = { kind: "open" | "tap" | "action"; label: string };

const queue: Queued[] = [];
let sending = false;

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

function identity(path: string) {
  const wallet = useWallet.getState();
  const role: "admin" | "client" | "guest" =
    wallet.role === "admin" ? "admin" : wallet.role === "client" ? "client" : "guest";
  const who = role === "admin" ? "Admin" : role === "client" ? wallet.profile.email || "Client" : "Guest";
  const ua = navigator.userAgent;
  const device = /iphone/i.test(ua) ? "iPhone" : /ipad/i.test(ua) ? "iPad" : /android/i.test(ua) ? "Android" : "Desktop";
  return {
    sessionId: sessionId(),
    role,
    who: who.slice(0, 80),
    path: path.slice(0, 200) || "/",
    device,
  };
}

async function flush(path: string) {
  if (typeof window === "undefined" || sending) return;
  sending = true;
  const events = queue.splice(0, 20);
  try {
    await pushLive({ data: { ...identity(path), events } });
  } catch {
    // The next heartbeat tries again with whatever happens next.
  } finally {
    sending = false;
  }
}

export function track(kind: Queued["kind"], label: string) {
  if (typeof window === "undefined") return;
  const text = label.replace(/\s+/g, " ").trim().slice(0, 140);
  if (!text) return;
  const last = queue[queue.length - 1];
  if (last && last.kind === kind && last.label === text) return;
  queue.push({ kind, label: text });
  if (queue.length >= 8) void flush(window.location.pathname || "/");
}

export function beat(path: string) {
  void flush(path || "/");
}
