import { SavedDocumentRecord, DocumentType, DocumentStatus } from '../types/storage';
import { SAMPLE_AGREEMENT_FIXTURE, SAMPLE_INVOICE_FIXTURE } from './defaults';
import { BookingDocumentData, InvoiceDocumentData } from '../types/document';
import { QuoteDocumentData } from '../types/quote';
import { isTursoConfigured, tursoListDocuments, tursoUpsertDocument, tursoDeleteDocument, tursoWasSeeded, tursoMarkSeeded } from '../lib/turso';

const STORAGE_KEY = 'parva_saved_documents_v3';
/** Set once on first run. Distinguishes "never opened" (seed) from "user deleted all" (stay empty). */
const LOCAL_SEED_FLAG = 'parva_seed_initialized_v3';

export type ConnectionMode = 'cloud' | 'local';

/** Which store is active right now. Cloud only when `.env` tokens are set. */
export function getConnectionMode(): ConnectionMode {
  return isTursoConfigured() ? 'cloud' : 'local';
}

function getInitialSeedDocuments(): SavedDocumentRecord[] {
  const now = new Date().toISOString();
  const scheduleData: BookingDocumentData = {
    ...SAMPLE_AGREEMENT_FIXTURE,
    documentType: 'Booking Schedule',
  };

  return [
    {
      id: 'doc-seed-agreement-1',
      documentType: 'Agreement',
      title: 'Master Client Booking Agreement - Meera & Aditya',
      clientName: SAMPLE_AGREEMENT_FIXTURE.client.name,
      bookingId: SAMPLE_AGREEMENT_FIXTURE.booking.bookingId,
      date: SAMPLE_AGREEMENT_FIXTURE.booking.bookingDate,
      status: 'Final',
      createdAt: now,
      updatedAt: now,
      data: SAMPLE_AGREEMENT_FIXTURE,
    },
    {
      id: 'doc-seed-schedule-1',
      documentType: 'Booking Schedule',
      title: 'Booking Schedule & Production Itinerary - Meera & Aditya',
      clientName: SAMPLE_AGREEMENT_FIXTURE.client.name,
      bookingId: SAMPLE_AGREEMENT_FIXTURE.booking.bookingId,
      date: SAMPLE_AGREEMENT_FIXTURE.booking.bookingDate,
      status: 'Final',
      createdAt: now,
      updatedAt: now,
      data: scheduleData,
    },
    {
      id: 'doc-seed-invoice-1',
      documentType: 'Invoice',
      title: 'Commercial Invoice #INV-2026-112 - Meera Krishnan',
      clientName: SAMPLE_INVOICE_FIXTURE.client.name,
      bookingId: SAMPLE_INVOICE_FIXTURE.booking.bookingId,
      date: SAMPLE_INVOICE_FIXTURE.invoiceDate,
      status: 'Partially Paid' as DocumentStatus,
      createdAt: now,
      updatedAt: now,
      data: SAMPLE_INVOICE_FIXTURE,
    },
  ];
}

// ── Local (localStorage) primitives — always available offline ──────────────

/**
 * Empty array is a valid state (user deleted everything) — it must NOT
 * trigger a reseed. Only `null` (key never written) means first run.
 */
function readLocal(): SavedDocumentRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw !== null) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
      return [];
    }
    // First run ever on this device → seed sample docs once.
    if (localStorage.getItem(LOCAL_SEED_FLAG)) return [];
    const initial = getInitialSeedDocuments();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initial));
    localStorage.setItem(LOCAL_SEED_FLAG, '1');
    return initial;
  } catch (err) {
    console.error('Failed to read saved documents from localStorage:', err);
    return [];
  }
}

function writeLocal(docs: SavedDocumentRecord[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
  } catch (err) {
    console.error('Failed to write documents to localStorage:', err);
  }
}

function buildRecord(
  params: {
    id?: string;
    documentType: DocumentType;
    title?: string;
    clientName?: string;
    bookingId?: string;
    status?: DocumentStatus;
    data: BookingDocumentData | InvoiceDocumentData | QuoteDocumentData;
  },
  existing?: SavedDocumentRecord,
): SavedDocumentRecord {
  const now = new Date().toISOString();
  const clientName =
    params.clientName ||
    params.data.client.name ||
    'Unnamed Client';
  const bookingId =
    params.bookingId ||
    ('booking' in params.data
      ? params.data.booking.bookingId
      : 'quoteNumber' in params.data
      ? params.data.quoteNumber
      : 'PARVA-2026');
  const date =
    ('quoteDate' in params.data && params.data.quoteDate) ||
    ('invoiceDate' in params.data && params.data.invoiceDate) ||
    ('booking' in params.data && params.data.booking.bookingDate) ||
    new Date().toISOString().split('T')[0];
  const title = params.title || `${params.documentType} - ${clientName}`;
  if (existing) {
    return {
      ...existing,
      documentType: params.documentType,
      title,
      clientName,
      bookingId,
      date,
      status: params.status || existing.status,
      updatedAt: now,
      data: params.data,
    };
  }
  return {
    id: params.id ?? `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    documentType: params.documentType,
    title,
    clientName,
    bookingId,
    date,
    status: params.status || 'Draft',
    createdAt: now,
    updatedAt: now,
    data: params.data,
  };
}

// ── Sync API (local) — kept for existing views ──────────────────────────────

export function clearAllSavedDocuments(): SavedDocumentRecord[] {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('parva_saved_documents_v1');
    localStorage.removeItem('parva_saved_documents_v2');
  }
  // Explicit restore (user action) — reseed is intended here.
  const fresh = getInitialSeedDocuments();
  if (typeof window !== 'undefined') {
    writeLocal(fresh);
    localStorage.setItem(LOCAL_SEED_FLAG, '1');
  }
  return fresh;
}

export function getSavedDocuments(): SavedDocumentRecord[] {
  return readLocal();
}

export function saveDocument(params: {
  id?: string;
  documentType: DocumentType;
  title?: string;
  clientName?: string;
  bookingId?: string;
  status?: DocumentStatus;
  data: BookingDocumentData | InvoiceDocumentData | QuoteDocumentData;
}): SavedDocumentRecord {
  const docs = readLocal();
  if (params.id) {
    const idx = docs.findIndex((d) => d.id === params.id);
    if (idx !== -1) {
      const updated = buildRecord(params, docs[idx]);
      docs[idx] = updated;
      writeLocal(docs);
      return updated;
    }
  }
  const rec = buildRecord(params);
  writeLocal([rec, ...docs]);
  return rec;
}

export function deleteDocument(id: string): void {
  writeLocal(readLocal().filter((d) => d.id !== id));
}

export function duplicateDocument(id: string): SavedDocumentRecord | null {
  const docs = readLocal();
  const existing = docs.find((d) => d.id === id);
  if (!existing) return null;
  const now = new Date().toISOString();
  const clone: SavedDocumentRecord = {
    ...existing,
    id: `doc-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${existing.title} (Copy)`,
    status: 'Draft',
    createdAt: now,
    updatedAt: now,
  };
  writeLocal([clone, ...docs]);
  return clone;
}

export function getDocumentById(id: string): SavedDocumentRecord | null {
  return readLocal().find((d) => d.id === id) || null;
}

// ── Async API (Turso-first, local fallback) — used by new simplified UX ─────

export type SaveDocumentParams = {
  id?: string;
  documentType: DocumentType;
  title?: string;
  clientName?: string;
  bookingId?: string;
  status?: DocumentStatus;
  data: BookingDocumentData | InvoiceDocumentData | QuoteDocumentData;
};

async function ensureCloudSeededOnce(): Promise<void> {
  if (await tursoWasSeeded()) return;
  const cloudDocs = await tursoListDocuments(1);
  if (cloudDocs.length > 0) {
    // Pre-existing DB from before the seed flag existed — adopt it, don't duplicate.
    await tursoMarkSeeded();
    return;
  }
  // Cloud is empty. Respect local state:
  // - first run (no flag, no cache) → seed samples to cloud + local
  // - user deleted everything OR has own docs → push local as-is (even if []), never sample-seed.
  const raw = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
  const flag = typeof window !== 'undefined' ? localStorage.getItem(LOCAL_SEED_FLAG) : '1';
  if (flag && raw !== null) {
    const localDocs = readLocal();
    for (const doc of localDocs) await tursoUpsertDocument(doc);
    await tursoMarkSeeded();
    return;
  }
  const seeds = getInitialSeedDocuments();
  for (const seed of seeds) await tursoUpsertDocument(seed);
  if (typeof window !== 'undefined') {
    writeLocal(seeds);
    localStorage.setItem(LOCAL_SEED_FLAG, '1');
  }
  await tursoMarkSeeded();
}

/** List documents: Turso cloud when configured, else localStorage. */
export async function getSavedDocumentsAsync(): Promise<{ docs: SavedDocumentRecord[]; mode: ConnectionMode }> {
  if (!isTursoConfigured()) return { docs: readLocal(), mode: 'local' };
  try {
    await ensureCloudSeededOnce();
    const docs = await tursoListDocuments();
    writeLocal(docs); // mirror cache exactly, including [] so deletes stay deleted
    return { docs, mode: 'cloud' };
  } catch (err) {
    console.warn('Turso read failed, falling back to local:', err);
    return { docs: readLocal(), mode: 'local' };
  }
}

/** Save (create/update): writes to Turso when configured, always mirrors local. */
export async function saveDocumentAsync(params: SaveDocumentParams): Promise<{ record: SavedDocumentRecord; mode: ConnectionMode }> {
  const docs = readLocal();
  const existing = params.id ? docs.find((d) => d.id === params.id) : undefined;
  const record = buildRecord(params, existing);
  if (existing) {
    const idx = docs.findIndex((d) => d.id === existing.id);
    docs[idx] = record;
    writeLocal(docs);
  } else {
    writeLocal([record, ...docs]);
  }
  if (!isTursoConfigured()) return { record, mode: 'local' };
  try {
    await tursoUpsertDocument(record);
    return { record, mode: 'cloud' };
  } catch (err) {
    console.warn('Turso save failed, kept locally:', err);
    return { record, mode: 'local' };
  }
}

export async function deleteDocumentAsync(id: string): Promise<ConnectionMode> {
  deleteDocument(id);
  if (!isTursoConfigured()) return 'local';
  try {
    await tursoDeleteDocument(id);
    return 'cloud';
  } catch (err) {
    console.warn('Turso delete failed, deleted locally:', err);
    return 'local';
  }
}

export async function duplicateDocumentAsync(id: string): Promise<{ record: SavedDocumentRecord | null; mode: ConnectionMode }> {
  const clone = duplicateDocument(id);
  if (!clone) return { record: null, mode: getConnectionMode() };
  if (!isTursoConfigured()) return { record: clone, mode: 'local' };
  try {
    await tursoUpsertDocument(clone);
    return { record: clone, mode: 'cloud' };
  } catch (err) {
    console.warn('Turso duplicate failed, kept locally:', err);
    return { record: clone, mode: 'local' };
  }
}

export async function clearAllSavedDocumentsAsync(): Promise<{ docs: SavedDocumentRecord[]; mode: ConnectionMode }> {
  // Explicit user-triggered restore — the ONLY path that reseeds.
  const fresh = getInitialSeedDocuments();
  writeLocal(fresh);
  if (typeof window !== 'undefined') localStorage.setItem(LOCAL_SEED_FLAG, '1');
  if (!isTursoConfigured()) return { docs: fresh, mode: 'local' };
  try {
    for (const seed of fresh) await tursoUpsertDocument(seed);
    await tursoMarkSeeded();
    return { docs: fresh, mode: 'cloud' };
  } catch (err) {
    console.warn('Turso reset failed, reset locally:', err);
    return { docs: fresh, mode: 'local' };
  }
}
