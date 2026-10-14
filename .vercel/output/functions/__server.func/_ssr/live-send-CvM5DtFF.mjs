import { t as getSql } from "./db-je3bFDRl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-send-CvM5DtFF.js
async function ensureSchema() {
	const sql = await getSql();
	await sql.query(`create table if not exists activity_presence (
      session_id text primary key,
      at bigint not null,
      role text not null,
      who text not null,
      path text not null,
      device text not null
    )`);
	await sql.query(`create table if not exists activity_log (
      id integer generated always as identity primary key,
      at bigint not null,
      session_id text not null,
      role text not null,
      who text not null,
      path text not null,
      kind text not null,
      label text not null
    )`);
	for (const col of [
		"browser text not null default ''",
		"os text not null default ''",
		"viewport text not null default ''",
		"lang text not null default ''",
		"mode text not null default ''",
		"started_at bigint not null default 0",
		"page_at bigint not null default 0",
		"scenario text not null default ''",
		"email text not null default ''"
	]) await sql.query(`alter table activity_presence add column if not exists ${col}`);
	await sql.query(`alter table activity_log add column if not exists device text not null default ''`);
}
async function writeLive(data) {
	await ensureSchema();
	const sql = await getSql();
	const now = Date.now();
	await sql.query(`insert into activity_presence (
       session_id, at, role, who, path, device, browser, os, viewport, lang, mode, started_at, page_at, scenario, email
     ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
     on conflict (session_id) do update set
       at = excluded.at,
       role = excluded.role,
       who = excluded.who,
       path = excluded.path,
       device = excluded.device,
       browser = excluded.browser,
       os = excluded.os,
       viewport = excluded.viewport,
       lang = excluded.lang,
       mode = excluded.mode,
       started_at = excluded.started_at,
       page_at = excluded.page_at,
       scenario = excluded.scenario,
       email = excluded.email`, [
		data.sessionId,
		now,
		data.role,
		data.who,
		data.path,
		data.device,
		data.browser,
		data.os,
		data.viewport,
		data.lang,
		data.mode,
		data.startedAt,
		data.pageAt,
		data.scenario,
		data.email
	]);
	for (const event of data.events) await sql.query(`insert into activity_log (at, session_id, role, who, path, kind, label, device)
       values ($1, $2, $3, $4, $5, $6, $7, $8)`, [
		now,
		data.sessionId,
		data.role,
		data.who,
		data.path,
		event.kind,
		event.label,
		data.device
	]);
	await sql.query("delete from activity_presence where at < $1", [now - 864e5]);
	await sql.query(`delete from activity_log where id in (select id from activity_log order by id desc offset 600)`);
	return { ok: true };
}
function mapPresence(row) {
	return {
		sessionId: row.session_id,
		at: Number(row.at),
		role: row.role,
		who: row.who,
		path: row.path,
		device: row.device,
		browser: row.browser || "",
		os: row.os || "",
		viewport: row.viewport || "",
		lang: row.lang || "",
		mode: row.mode || "",
		startedAt: Number(row.started_at) || 0,
		pageAt: Number(row.page_at) || 0,
		scenario: row.scenario || "",
		email: row.email || ""
	};
}
var PRESENCE_COLS = `session_id, at, role, who, path, device, browser, os, viewport, lang, mode, started_at, page_at, scenario, email`;
async function readLive() {
	await ensureSchema();
	const sql = await getSql();
	const now = Date.now();
	const onlineCutoff = now - 15e3;
	const recentCutoff = now - 18e5;
	const hourCutoff = now - 36e5;
	const online = await sql.query(`select ${PRESENCE_COLS} from activity_presence where at > $1 order by at desc`, [onlineCutoff]);
	const recent = await sql.query(`select ${PRESENCE_COLS} from activity_presence where at <= $1 and at > $2 order by at desc limit 12`, [onlineCutoff, recentCutoff]);
	const events = await sql.query(`select id, at, session_id, role, who, path, kind, label, device
     from activity_log
     order by id desc
     limit 180`);
	const kinds = await sql.query(`select kind, count(*)::int as n from activity_log where at > $1 group by kind`, [hourCutoff]);
	const sessions = await sql.query(`select count(distinct session_id)::int as n from activity_log where at > $1`, [hourCutoff]);
	const hour = {
		actions: 0,
		opens: 0,
		taps: 0,
		sessions: Number(sessions[0]?.n ?? 0)
	};
	for (const row of kinds) {
		const n = Number(row.n) || 0;
		if (row.kind === "action") hour.actions = n;
		else if (row.kind === "open") hour.opens = n;
		else if (row.kind === "tap") hour.taps = n;
	}
	return {
		ok: true,
		now,
		online: online.map(mapPresence),
		recent: recent.map(mapPresence),
		hour,
		events: events.map((row) => ({
			id: Number(row.id),
			at: Number(row.at),
			sessionId: row.session_id,
			role: row.role,
			who: row.who,
			path: row.path,
			device: row.device || "",
			kind: row.kind,
			label: row.label
		}))
	};
}
//#endregion
export { readLive, writeLive };
