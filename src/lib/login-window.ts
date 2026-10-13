import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { LOGIN_WINDOW_MS, type ScenarioCode } from "@/lib/auth-config";

interface LoginWindowState {
  hydrated: boolean;
  startedAt: number | null;
  lockedScenario: ScenarioCode | null;
  ensureStarted: () => void;
  reset: () => void;
  lockScenario: (code: ScenarioCode) => void;
  clearLockedScenario: () => void;
}

export const useLoginWindow = create<LoginWindowState>()(
  persist(
    (set, get) => ({
      hydrated: false,
      startedAt: null,
      lockedScenario: null,
      ensureStarted: () => {
        if (!get().startedAt) set({ startedAt: Date.now() });
      },
      reset: () => set({ startedAt: Date.now() }),
      lockScenario: (code) => set({ lockedScenario: code }),
      clearLockedScenario: () => set({ lockedScenario: null }),
    }),
    {
      name: "aurex-login-window",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      merge: (persisted, current) => ({
        ...current,
        ...((persisted as object) ?? {}),
      }),
      partialize: (s) => ({ startedAt: s.startedAt, lockedScenario: s.lockedScenario }),
      onRehydrateStorage: () => () => {
        /* hydrated is set after cloud sync */
      },
    },
  ),
);

export function remainingMs(startedAt: number | null, now = Date.now()) {
  if (!startedAt) return LOGIN_WINDOW_MS;
  return Math.max(0, LOGIN_WINDOW_MS - (now - startedAt));
}

export function formatCountdown(ms: number) {
  const total = Math.ceil(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}
