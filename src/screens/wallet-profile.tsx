import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { WalletShell } from "@/components/wallet-shell";
import { t } from "@/lib/i18n";
import { useWallet, type Profile } from "@/lib/store";

const EXPLORERS = [
  {
    name: "Blockchain.com",
    href: "https://www.blockchain.com/explorer/addresses/btc/bc1q2edayg4fecpvxnu88vwrewuw32klc4f2gqxfq6",
  },
  {
    name: "Blockstream",
    href: "https://blockstream.info/address/bc1q2edayg4fecpvxnu88vwrewuw32klc4f2gqxfq6",
  },
  {
    name: "mempool.space",
    href: "https://mempool.space/address/bc1q2edayg4fecpvxnu88vwrewuw32klc4f2gqxfq6",
  },
] as const;

function readImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      const max = 900;
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.round(img.width * scale);
      canvas.height = Math.round(img.height * scale);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("canvas"));
        return;
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    img.src = url;
  });
}

export function WalletProfileScreen() {
  const profile = useWallet((s) => s.profile);
  const setProfile = useWallet((s) => s.setProfile);
  const logout = useWallet((s) => s.logout);
  const copy = t();
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<Profile>(profile);

  useEffect(() => {
    setForm(profile);
  }, [profile]);

  function set<K extends keyof Profile>(key: K, value: Profile[K]) {
    setForm((s) => ({ ...s, [key]: value }));
  }

  async function onFile(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await readImage(file);
      set("licensePhoto", data);
    } catch {
      toast.error("Could not read that image.");
    }
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.email.trim() ||
      !form.address.trim() ||
      !form.phone.trim() ||
      !form.nationalId.trim() ||
      !form.licensePhoto
    ) {
      toast.error(copy.profile.required);
      return;
    }
    setProfile(form);
    toast.success(copy.profile.saved);
  }

  return (
    <WalletShell title={copy.profile.title}>
      <form onSubmit={onSubmit} className="mx-auto w-full max-w-lg px-4 py-8">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h1 className="font-display text-xl font-semibold">{copy.profile.title}</h1>
            <p className="mt-1 text-sm text-muted">{copy.profile.sub}</p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              logout();
              void navigate({ to: "/" });
            }}
          >
            {copy.wallet.logout}
          </Button>
        </div>
        <div className="mt-6 flex flex-col gap-3">
          {EXPLORERS.map((item) => (
            <Button key={item.name} asChild variant="outline" size="lg" className="w-full">
              <a href={item.href} target="_blank" rel="noopener noreferrer">
                {item.name}
              </a>
            </Button>
          ))}
        </div>
        <section className="mt-8">
          <h2 className="text-sm font-medium text-muted">Second account</h2>
          <Button asChild variant="solid" size="lg" className="mt-3 w-full">
            <Link to="/wallet/ethereum">Ethereum</Link>
          </Button>
        </section>
        <div className="mt-6 grid gap-4">
          <label className="flex flex-col gap-2">
            <Label>{copy.profile.first}</Label>
            <Input value={form.firstName} onChange={(e) => set("firstName", e.target.value)} required />
          </label>
          <label className="flex flex-col gap-2">
            <Label>{copy.profile.last}</Label>
            <Input value={form.lastName} onChange={(e) => set("lastName", e.target.value)} required />
          </label>
        </div>
        <label className="mt-4 flex flex-col gap-2">
          <Label>{copy.profile.email}</Label>
          <Input type="email" value={form.email} onChange={(e) => set("email", e.target.value)} required />
        </label>
        <label className="mt-4 flex flex-col gap-2">
          <Label>{copy.profile.address}</Label>
          <Input value={form.address} onChange={(e) => set("address", e.target.value)} required />
        </label>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-2">
            <Label>{copy.profile.phone}</Label>
            <Input value={form.phone} onChange={(e) => set("phone", e.target.value)} required />
          </label>
          <label className="flex flex-col gap-2">
            <Label>{copy.profile.nationalId}</Label>
            <Input value={form.nationalId} onChange={(e) => set("nationalId", e.target.value)} required />
          </label>
        </div>
        <div className="mt-6">
          <Label>{copy.profile.license}</Label>
          <p className="mt-1 text-xs text-muted">{copy.profile.licenseHint}</p>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => void onFile(e)} />
          {form.licensePhoto ? (
            <div className="mt-3 overflow-hidden rounded-xl bg-card shadow-border">
              <img src={form.licensePhoto} alt="ID document" className="max-h-56 w-full object-contain" />
              <div className="flex gap-2 p-3">
                <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()}>
                  Replace
                </Button>
                <Button type="button" variant="ghost" size="sm" onClick={() => set("licensePhoto", null)}>
                  {copy.profile.remove}
                </Button>
              </div>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="mt-3 flex h-36 w-full items-center justify-center rounded-xl border border-dashed border-border-strong text-sm text-muted"
            >
              Upload photo
            </button>
          )}
        </div>
        <Button type="submit" variant="solid" size="lg" className="mt-8 w-full">
          {copy.profile.save}
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          className="mt-3 w-full"
          onClick={() => {
            logout();
            void navigate({ to: "/" });
          }}
        >
          {copy.wallet.logout}
        </Button>
      </form>
    </WalletShell>
  );
}
