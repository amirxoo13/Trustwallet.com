import { useEffect, useState } from "react";
import { adminProof } from "@/lib/admin-proof";
import { loadLive, pageName } from "@/lib/live";

type Online = {
  sessionId: string;
  at: number;
  role: string;
  who: string;
  path: string;
  device: string;
};

type Item = Online & { id: number; kind: string; label: string };

function clock(at: number) {
  return new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

function ago(at: number, now: number) {
  const seconds = Math.max(0, Math.round((now - at) / 1000));
  if (seconds < 5) return "now";
  if (seconds < 60) return `${seconds}s ago`;
  return `${Math.floor(seconds / 60)}m ago`;
}

export function LiveBoard() {
  const [online, setOnline] = useState<Online[]>([]);
  const [events, setEvents] = useState<Item[]>([]);
  const [now, setNow] = useState(() => Date.now());
  const [error, setError] = useState("");

  useEffect(() => {
    let stop = false;
    const pull = async () => {
      try {
        const res = await loadLive({ data: { proof: adminProof() } });
        if (stop) return;
        if (!res.ok) {
          setError("Only the admin can watch the platform.");
          return;
        }
        setError("");
        setNow(res.now);
        setOnline(res.online);
        setEvents(res.events);
      } catch {
        if (!stop) setError("Could not reach the live view.");
      }
    };
    void pull();
    const id = window.setInterval(() => void pull(), 2000);
    return () => {
      stop = true;
      window.clearInterval(id);
    };
  }, []);

  return (
    <div className="mt-8 grid gap-8">
      <div className="flex items-center gap-2 text-sm">
        <span className="h-2 w-2 rounded-full bg-primary" />
        <span>Live. This list refreshes every 2 seconds.</span>
      </div>
      <p className="text-xs text-muted">
        Passwords and the secret phrase are never shown. You see who is on the platform, which page they are on, and what they tap.
      </p>
      {error ? <p className="text-sm text-warning">{error}</p> : null}

      <section>
        <h2 className="text-sm font-medium">On the platform now ({online.length})</h2>
        {online.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Nobody is here right now.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {online.map((person) => (
              <li key={person.sessionId} className="rounded-lg bg-input px-3 py-3 shadow-border">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate text-sm font-medium">
                    {person.who} · {person.device}
                  </p>
                  <span className="shrink-0 text-xs text-muted">{ago(person.at, now)}</span>
                </div>
                <p className="mt-1 text-sm text-muted">{pageName(person.path)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-sm font-medium">What they are doing</h2>
        {events.length === 0 ? (
          <p className="mt-3 text-sm text-muted">No actions yet.</p>
        ) : (
          <ul className="mt-3 grid gap-2">
            {events.map((item) => (
              <li key={item.id} className="rounded-lg px-3 py-2 shadow-border">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="min-w-0 text-sm">
                    <span className="text-muted">{item.who}</span> {item.label}
                  </p>
                  <span className="shrink-0 font-mono text-[11px] text-muted">{clock(item.at)}</span>
                </div>
                <p className="mt-0.5 text-xs text-muted">{pageName(item.path)}</p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
