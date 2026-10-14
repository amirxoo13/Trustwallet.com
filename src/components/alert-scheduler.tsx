import { useEffect } from "react";
import { runDueAlerts } from "@/lib/push";

/** While the wallet is open, ask the server to send any alert that is already due. */
export function AlertScheduler() {
  useEffect(() => {
    if (typeof Notification === "undefined" || Notification.permission !== "granted") return;
    const tick = () => {
      void runDueAlerts({ data: { force: false } }).catch(() => undefined);
    };
    tick();
    const id = window.setInterval(tick, 15 * 60 * 1000);
    return () => window.clearInterval(id);
  }, []);
  return null;
}
