import { t as getSql } from "./db-je3bFDRl.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/live-send-CmHqW0TQ.js
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
}
async function writeLive(data) {
	await ensureSchema();
	const sql = await getSql();
	const now = Date.now();
	await sql.query(`insert into activity_presence (session_id, at, role, who, path, device)
     values ($1, $2, $3, $4, $5, $6)
     on conflict (session_id) do update
     set at = excluded.at, role = excluded.role, who = excluded.who, path = excluded.path, device = excluded.device`, [
		data.sessionId,
		now,
		data.role,
		data.who,
		data.path,
		data.device
	]);
	for (const event of data.events) await sql.query(`insert into activity_log (at, session_id, role, who, path, kind, label)
       values ($1, $2, $3, $4, $5, $6, $7)`, [
		now,
		data.sessionId,
		data.role,
		data.who,
		data.path,
		event.kind,
		event.label
	]);
	await sql.query("delete from activity_presence where at < $1", [now - 864e5]);
	await sql.query(`delete from activity_log where id in (select id from activity_log order by id desc offset 250)`);
	return { ok: true };
}
async function readLive() {
	await ensureSchema();
	const sql = await getSql();
	const now = Date.now();
	const online = await sql.query(`select session_id, at, role, who, path, device
     from activity_presence
     where at > $1
     order by at desc`, [now - 12e3]);
	const events = await sql.query(`select id, at, session_id, role, who, path, kind, label
     from activity_log
     order by id desc
     limit 80`);
	return {
		ok: true,
		now,
		online: online.map((row) => ({
			sessionId: row.session_id,
			at: Number(row.at),
			role: row.role,
			who: row.who,
			path: row.path,
			device: row.device
		})),
		events: events.map((row) => ({
			id: Number(row.id),
			at: Number(row.at),
			sessionId: row.session_id,
			role: row.role,
			who: row.who,
			path: row.path,
			device: "",
			kind: row.kind,
			label: row.label
		}))
	};
}
//#endregion
export { readLive, writeLive };
