import type { SavedDocumentRecord } from '../types/storage';

export interface BookingFolder {
  /** Stable folder key — bookingId when present, else client name. */
  key: string;
  clientName: string;
  bookingId: string;
  date: string;
  updatedAt: string;
  docs: SavedDocumentRecord[];
}

const TYPE_ORDER: Record<string, number> = {
  Agreement: 0,
  'Booking Schedule': 1,
  Invoice: 2,
};

/**
 * Groups individual document rows into one folder per booking,
 * so Agreement + Schedule + Invoice for the same client live together.
 * Folder title uses the client name; key uses bookingId for stability.
 */
export function groupByBooking(docs: SavedDocumentRecord[]): BookingFolder[] {
  const map = new Map<string, BookingFolder>();
  for (const doc of docs) {
    const bookingId = (doc.bookingId || '').trim() || (doc.clientName || 'Untitled').trim() || doc.id;
    const existing = map.get(bookingId);
    if (!existing) {
      map.set(bookingId, {
        key: bookingId,
        clientName: doc.clientName || 'Unnamed Client',
        bookingId,
        date: doc.date,
        updatedAt: doc.updatedAt,
        docs: [doc],
      });
    } else {
      existing.docs.push(doc);
      // Prefer the most informative client name (longest non-empty).
      if ((doc.clientName || '').length > (existing.clientName || '').length) {
        existing.clientName = doc.clientName;
      }
      if (doc.updatedAt > existing.updatedAt) {
        existing.updatedAt = doc.updatedAt;
        existing.date = doc.date;
      }
    }
  }
  const folders = [...map.values()];
  for (const f of folders) {
    f.docs.sort((a, b) => (TYPE_ORDER[a.documentType] ?? 9) - (TYPE_ORDER[b.documentType] ?? 9));
  }
  folders.sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1));
  return folders;
}
