import { createClient, type Client } from '@libsql/client';
import type { SavedDocumentRecord } from '../types/storage';

const SCHEMA_SQL = `
CREATE TABLE IF NOT EXISTS documents (
  id TEXT PRIMARY KEY,
  document_type TEXT NOT NULL,
  title TEXT NOT NULL,
  client_name TEXT NOT NULL,
  booking_id TEXT NOT NULL,
  date TEXT NOT NULL,
  status TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  data_json TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_documents_booking ON documents(booking_id);
CREATE INDEX IF NOT EXISTS idx_documents_updated ON documents(updated_at DESC);
CREATE TABLE IF NOT EXISTS app_meta (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);
`;

/** True only when the user filled both vars in `.env`. */
export function isTursoConfigured(): boolean {
  const url = (import.meta.env.VITE_TURSO_DATABASE_URL as string | undefined)?.trim();
  const token = (import.meta.env.VITE_TURSO_AUTH_TOKEN as string | undefined)?.trim();
  return Boolean(url && token);
}

export function tursoStatus(): { configured: boolean; urlHost: string | null } {
  const url = (import.meta.env.VITE_TURSO_DATABASE_URL as string | undefined)?.trim() ?? '';
  if (!isTursoConfigured()) return { configured: false, urlHost: null };
  try {
    const host = url.replace(/^libsql:\/\//, '').split('/')[0];
    return { configured: true, urlHost: host };
  } catch {
    return { configured: true, urlHost: null };
  }
}

let client: Client | null = null;
let schemaReady = false;

export function getTursoClient(): Client | null {
  if (!isTursoConfigured()) return null;
  if (client) return client;
  const url = (import.meta.env.VITE_TURSO_DATABASE_URL as string).trim();
  const authToken = (import.meta.env.VITE_TURSO_AUTH_TOKEN as string).trim();
  client = createClient({ url, authToken });
  return client;
}

export async function initTursoSchema(): Promise<void> {
  const db = getTursoClient();
  if (!db || schemaReady) return;
  // libSQL batch: split statements, exec sequentially for compat
  for (const stmt of SCHEMA_SQL.split(';').map((s) => s.trim()).filter(Boolean)) {
    await db.execute(stmt);
  }
  schemaReady = true;
}

function rowToRecord(row: Record<string, unknown>): SavedDocumentRecord {
  return {
    id: String(row.id),
    documentType: row.document_type as SavedDocumentRecord['documentType'],
    title: String(row.title),
    clientName: String(row.client_name),
    bookingId: String(row.booking_id),
    date: String(row.date),
    status: row.status as SavedDocumentRecord['status'],
    createdAt: String(row.created_at),
    updatedAt: String(row.updated_at),
    data: JSON.parse(String(row.data_json)) as SavedDocumentRecord['data'],
  };
}

export async function tursoListDocuments(limit = 200): Promise<SavedDocumentRecord[]> {
  const db = getTursoClient();
  if (!db) throw new Error('Turso not configured');
  await initTursoSchema();
  const rs = await db.execute({
    sql: 'SELECT * FROM documents ORDER BY updated_at DESC LIMIT ?',
    args: [limit],
  });
  return rs.rows.map((r) => rowToRecord(r as unknown as Record<string, unknown>));
}

export async function tursoUpsertDocument(record: SavedDocumentRecord): Promise<void> {
  const db = getTursoClient();
  if (!db) throw new Error('Turso not configured');
  await initTursoSchema();
  await db.execute({
    sql: `INSERT INTO documents (id, document_type, title, client_name, booking_id, date, status, created_at, updated_at, data_json)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            document_type=excluded.document_type, title=excluded.title,
            client_name=excluded.client_name, booking_id=excluded.booking_id,
            date=excluded.date, status=excluded.status,
            updated_at=excluded.updated_at, data_json=excluded.data_json`,
    args: [
      record.id,
      record.documentType,
      record.title,
      record.clientName,
      record.bookingId,
      record.date,
      record.status,
      record.createdAt,
      record.updatedAt,
      JSON.stringify(record.data),
    ],
  });
}

export async function tursoDeleteDocument(id: string): Promise<void> {
  const db = getTursoClient();
  if (!db) throw new Error('Turso not configured');
  await initTursoSchema();
  await db.execute({ sql: 'DELETE FROM documents WHERE id = ?', args: [id] });
}

export async function tursoClearAll(): Promise<void> {
  const db = getTursoClient();
  if (!db) throw new Error('Turso not configured');
  await initTursoSchema();
  await db.execute('DELETE FROM documents');
}

/** One-time seed marker so "delete everything" stays deleted after refresh. */
const SEED_META_KEY = 'seeded_v1';

export async function tursoWasSeeded(): Promise<boolean> {
  const db = getTursoClient();
  if (!db) return false;
  await initTursoSchema();
  const rs = await db.execute({ sql: 'SELECT value FROM app_meta WHERE key = ?', args: [SEED_META_KEY] });
  return rs.rows.length > 0;
}

export async function tursoMarkSeeded(): Promise<void> {
  const db = getTursoClient();
  if (!db) return;
  await initTursoSchema();
  await db.execute({
    sql: 'INSERT INTO app_meta (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value=excluded.value',
    args: [SEED_META_KEY, new Date().toISOString()],
  });
}
