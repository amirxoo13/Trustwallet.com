import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getSql } from "@/lib/db";
import { BALANCE_EPOCH, STARTER_HOLDINGS } from "@/lib/coins";
import type { ScenarioCode } from "@/lib/auth-config";
import type { Holding, Profile, Transaction, WalletAddresses } from "@/lib/store";
import type { SiteContent } from "@/lib/site-store";

const ROW_ID = "aurex";

export type CloudWallet = {
  profile: Profile;
  holdings: Holding[];
  transactions: Transaction[];
  addresses: WalletAddresses;
  scenario: ScenarioCode | null;
  balanceEpoch?: number;
};

export type CloudLogin = {
  startedAt: number | null;
  lockedScenario: ScenarioCode | null;
};

export type CloudSnapshot = {
  empty: boolean;
  updatedAt: string | null;
  site: Partial<SiteContent> | null;
  wallet: CloudWallet | null;
  login: CloudLogin | null;
};

type Row = {
  site_json: string;
  wallet_json: string;
  login_json: string;
  updated_at: string | Date | null;
};

function parseObj(raw: string | null | undefined): Record<string, unknown> {
  if (!raw || raw === "{}") return {};
  try {
    const v = JSON.parse(raw) as unknown;
    return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : {};
  } catch {
    return {};
  }
}

function stamp(v: string | Date | null | undefined): string | null {
  if (!v) return null;
  if (v instanceof Date) return Number.isNaN(v.getTime()) ? null : v.toISOString();
  const s = String(v);
  return s || null;
}

function isEmptyJson(raw: string | null | undefined) {
  return !raw || raw === "{}" || Object.keys(parseObj(raw)).length === 0;
}

function fail(e: unknown): never {
  const msg = e instanceof Error ? e.message : String(e);
  throw new Error(msg.replace(/\s+/g, " ").slice(0, 240));
}

let schemaReady = false;

async function ensureSchema() {
  if (schemaReady) return;
  const sql = await getSql();
  await sql.query(`
    create table if not exists app_state (
      id          text primary key,
      site_json   text not null default '{}',
      wallet_json text not null default '{}',
      login_json  text not null default '{}',
      updated_at  timestamptz not null default now()
    )
  `);
  await sql.query("insert into app_state (id) values ($1) on conflict (id) do nothing", [ROW_ID]);
  schemaReady = true;
}

async function migrateWallet(row: Row): Promise<Row> {
  const wallet = parseObj(row.wallet_json);
  if (Object.keys(wallet).length === 0 || wallet.balanceEpoch === BALANCE_EPOCH) return row;
  wallet.holdings = STARTER_HOLDINGS.map((h) => ({ id: h.id, amount: h.amount }));
  wallet.balanceEpoch = BALANCE_EPOCH;
  const walletJson = JSON.stringify(wallet);
  const sql = await getSql();
  const updated = await sql.query<{ updated_at: string | Date | null }>(
    "update app_state set wallet_json = $1, updated_at = now() where id = $2 returning updated_at",
    [walletJson, ROW_ID],
  );
  return {
    ...row,
    wallet_json: walletJson,
    updated_at: updated[0]?.updated_at ?? row.updated_at,
  };
}

async function readRow() {
  await ensureSchema();
  const sql = await getSql();
  const rows = await sql.query<Row>(
    "select site_json, wallet_json, login_json, updated_at from app_state where id = $1",
    [ROW_ID],
  );
  if (!rows[0]) {
    await sql.query("insert into app_state (id) values ($1) on conflict (id) do nothing", [ROW_ID]);
    return { site_json: "{}", wallet_json: "{}", login_json: "{}", updated_at: null } satisfies Row;
  }
  return migrateWallet(rows[0]);
}

export const loadAppState = createServerFn({ method: "POST" }).handler(async (): Promise<CloudSnapshot> => {
  try {
    const row = await readRow();
    const site = parseObj(row.site_json);
    const wallet = parseObj(row.wallet_json);
    const login = parseObj(row.login_json);
    const empty = Object.keys(site).length === 0 && Object.keys(wallet).length === 0;
    return {
      empty,
      updatedAt: stamp(row.updated_at),
      site: Object.keys(site).length ? (site as Partial<SiteContent>) : null,
      wallet: Object.keys(wallet).length ? (wallet as unknown as CloudWallet) : null,
      login: Object.keys(login).length ? (login as CloudLogin) : null,
    };
  } catch (e) {
    fail(e);
  }
});

const saveInput = z.object({
  actor: z.enum(["admin", "client", "public"]),
  site: z.unknown().optional(),
  wallet: z.unknown().optional(),
  login: z.unknown().optional(),
  forceLogin: z.boolean().optional(),
});

export const loadAppStateMeta = createServerFn({ method: "POST" }).handler(
  async (): Promise<{ empty: boolean; updatedAt: string | null }> => {
    try {
      const row = await readRow();
      const site = parseObj(row.site_json);
      const wallet = parseObj(row.wallet_json);
      return {
        empty: Object.keys(site).length === 0 && Object.keys(wallet).length === 0,
        updatedAt: stamp(row.updated_at),
      };
    } catch (e) {
      fail(e);
    }
  },
);

export const saveAppState = createServerFn({ method: "POST" })
  .validator(saveInput)
  .handler(async ({ data }): Promise<{ ok: true; updatedAt: string | null }> => {
    try {
      const row = await readRow();
      let siteJson = row.site_json;
      let walletJson = row.wallet_json;
      let loginJson = row.login_json;
      const vacant = isEmptyJson(row.site_json) && isEmptyJson(row.wallet_json);

      if (data.site != null) {
        if (data.actor !== "admin" && !vacant) throw new Error("forbidden");
        siteJson = JSON.stringify(data.site);
      }
      if (data.wallet != null) {
        if (data.actor !== "admin" && data.actor !== "client" && !vacant) throw new Error("forbidden");
        walletJson = JSON.stringify(data.wallet);
      }
      if (data.login != null) {
        const incoming = data.login as CloudLogin;
        const prev = parseObj(loginJson) as CloudLogin;
        if (data.actor === "admin" && data.forceLogin) {
          loginJson = JSON.stringify({
            startedAt: incoming.startedAt ?? null,
            lockedScenario: incoming.lockedScenario ?? null,
          });
        } else {
          loginJson = JSON.stringify({
            startedAt: prev.startedAt ?? incoming.startedAt ?? null,
            lockedScenario: prev.lockedScenario ?? incoming.lockedScenario ?? null,
          });
        }
      }

      const sql = await getSql();
      const updated = await sql.query<{ updated_at: string | Date | null }>(
        "update app_state set site_json = $1, wallet_json = $2, login_json = $3, updated_at = now() where id = $4 returning updated_at",
        [siteJson, walletJson, loginJson, ROW_ID],
      );
      return { ok: true, updatedAt: stamp(updated[0]?.updated_at) };
    } catch (e) {
      fail(e);
    }
  });
