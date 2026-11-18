import type { BookingDocumentData, InvoiceDocumentData } from '../types/document';
import { calculateInvoiceTotals, derivePaymentStatus } from './calculations';

/**
 * Pure builder: rebuilds the invoice's auto-generated content (client,
 * booking, main line item, charges, commercial) from the booking document.
 * User-owned invoice data — milestone payments, discount, tax, dates,
 * payment method, notes, invoice number (unless the booking links one) —
 * is always preserved.
 */
export function buildSyncedInvoice(
  doc: BookingDocumentData,
  prev: InvoiceDocumentData,
): InvoiceDocumentData {
  const mainDesc = `${doc.services.packageName || 'Comprehensive Wedding Story'} - Coverage for ${doc.booking.eventType || 'Assignment'} (${doc.booking.eventDate || 'Scheduled Dates'})`;
  const lineItems: InvoiceDocumentData['lineItems'] = [
    {
      id: 'item-1',
      description: mainDesc,
      quantity: 1,
      rate: doc.commercial.totalFee,
      amount: doc.commercial.totalFee,
    },
    ...doc.commercial.additionalCharges.map((c, idx) => ({
      id: c.id || `c-${idx}`,
      description: c.description,
      quantity: 1,
      rate: c.amount,
      amount: c.amount,
    })),
  ];
  const totals = calculateInvoiceTotals({
    lineItems,
    additionalCharges: doc.commercial.additionalCharges,
    discount: prev.discount,
    taxEnabled: prev.taxEnabled,
    taxRate: prev.taxRate,
    amountPaid: 0,
  });
  const hasExplicitMilestonePaid =
    prev.advancePaid !== undefined || prev.preEventPaid !== undefined || prev.finalPaid !== undefined;
  const effectivePaid = hasExplicitMilestonePaid
    ? (prev.advancePaid ?? 0) + (prev.preEventPaid ?? 0) + (prev.finalPaid ?? 0)
    : (prev.amountPaid || 0);
  return {
    ...prev,
    client: { ...doc.client },
    booking: { ...doc.booking },
    invoiceNumber: doc.commercial.invoiceReference || prev.invoiceNumber,
    lineItems,
    commercial: { ...doc.commercial },
    paymentStatus: derivePaymentStatus(totals.totalAmount, effectivePaid),
    updatedAt: new Date().toISOString(),
  };
}
