import { useEffect } from "react";
import { runDueAlerts } from "@/lib/push";

/** Ask the server to send any alert that is already due while this phone is open. */
export function AlertScheduler() {
  useEffect(() => {
    const tick = () => {
      if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
      void runDueAlerts({ data: { force: false } }).catch(() => undefined);
    };
    tick();
    const id = window.setInterval(tick, 15 * 60 * 1000);
    const onShow = () => {
      if (document.visibilityState === "visible") tick();
    };
    document.addEventListener("visibilitychange", onShow);
    window.addEventListener("focus", tick);
    return () => {
      window.clearInterval(id);
      document.removeEventListener("visibilitychange", onShow);
      window.removeEventListener("focus", tick);
    };
  }, []);
  return null;
}