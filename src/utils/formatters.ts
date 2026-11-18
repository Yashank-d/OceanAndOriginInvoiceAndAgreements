/**
 * Date and presentation formatters for Parva documents.
 */

const MONTHS_LONG = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const MONTHS_SHORT = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
];

/**
 * Converts an ISO date string (YYYY-MM-DD) into an elegant editorial document date:
 * e.g. "2026-04-10" -> "10 April 2026".
 *
 * If the input is already freeform text (e.g. "18th & 19th November 2026" or
 * "7 days prior to event"), it is safely returned as-is.
 * If empty or null/undefined, returns the specified fallback (default "—").
 */
export function formatDocumentDate(dateStr?: string | null, fallback = '—'): string {
  if (!dateStr || typeof dateStr !== 'string') return fallback;
  const trimmed = dateStr.trim();
  if (!trimmed) return fallback;

  // Check for ISO format YYYY-MM-DD
  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIdx = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    if (monthIdx >= 0 && monthIdx < 12 && day >= 1 && day <= 31) {
      return `${day} ${MONTHS_LONG[monthIdx]} ${year}`;
    }
  }

  // Already human-readable or custom string
  return trimmed;
}

/**
 * Converts an ISO date string (YYYY-MM-DD) into a concise editorial date:
 * e.g. "2026-04-10" -> "10 Apr 2026".
 */
export function formatShortDate(dateStr?: string | null, fallback = '—'): string {
  if (!dateStr || typeof dateStr !== 'string') return fallback;
  const trimmed = dateStr.trim();
  if (!trimmed) return fallback;

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (isoMatch) {
    const year = isoMatch[1];
    const monthIdx = parseInt(isoMatch[2], 10) - 1;
    const day = parseInt(isoMatch[3], 10);
    if (monthIdx >= 0 && monthIdx < 12 && day >= 1 && day <= 31) {
      return `${day} ${MONTHS_SHORT[monthIdx]} ${year}`;
    }
  }

  return trimmed;
}
