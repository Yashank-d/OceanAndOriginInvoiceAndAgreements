import { AdditionalCharge, InvoiceLineItem } from '../types/document';

/**
 * Deterministic milestone calculation for standard 50% / 30% / 20% structure.
 * Guaranteed to have sum(milestones) === totalFee without penny leakage.
 */
export function calculateMilestones(
  totalFee: number, 
  customPercentages?: { advancePct?: number; preEventPct?: number; finalPct?: number }
): {
  totalFee: number;
  bookingAdvance: number;
  preEventPayment: number;
  finalPayment: number;
} {
  const cleanTotal = Math.max(0, Math.round(totalFee || 0));

  const advancePct = customPercentages?.advancePct ?? 0.50;
  const preEventPct = customPercentages?.preEventPct ?? 0.30;

  const bookingAdvance = Math.round(cleanTotal * advancePct);
  const preEventPayment = Math.round(cleanTotal * preEventPct);
  // Final payment absorbs remainder to guarantee exact total matching
  const finalPayment = Math.max(0, cleanTotal - bookingAdvance - preEventPayment);

  return {
    totalFee: cleanTotal,
    bookingAdvance,
    preEventPayment,
    finalPayment,
  };
}

/**
 * Calculates line item total amount
 */
export function calculateLineItemAmount(quantity: number, rate: number): number {
  const qty = Math.max(0, quantity || 0);
  const r = Math.max(0, rate || 0);
  return Math.round(qty * r);
}

export interface InvoiceCalculatedTotals {
  itemsSubtotal: number;
  additionalChargesSubtotal: number;
  subtotal: number;
  discount: number;
  taxableAmount: number;
  taxEnabled: boolean;
  taxRate: number;
  taxAmount: number;
  totalAmount: number;
  amountPaid: number;
  balanceDue: number;
}

/**
 * Deterministic calculation of invoice totals
 * Source: docs/parva-document-generator/05_INVOICE_SPEC.md
 * GST/tax is optional and never forced.
 */
export function calculateInvoiceTotals(params: {
  lineItems: InvoiceLineItem[];
  additionalCharges: AdditionalCharge[];
  discount?: number;
  taxEnabled?: boolean;
  taxRate?: number;
  amountPaid?: number;
}): InvoiceCalculatedTotals {
  const itemsSubtotal = (params.lineItems || []).reduce(
    (sum, item) => sum + calculateLineItemAmount(item.quantity, item.rate), 
    0
  );

  const additionalChargesSubtotal = (params.additionalCharges || []).reduce(
    (sum, charge) => sum + Math.max(0, charge.amount || 0), 
    0
  );

  const subtotal = itemsSubtotal + additionalChargesSubtotal;
  const discount = Math.min(subtotal, Math.max(0, params.discount || 0));
  const taxableAmount = Math.max(0, subtotal - discount);

  const taxEnabled = Boolean(params.taxEnabled);
  const taxRate = taxEnabled ? Math.max(0, params.taxRate ?? 18) : 0;
  const taxAmount = taxEnabled ? Math.round((taxableAmount * taxRate) / 100) : 0;

  const totalAmount = taxableAmount + taxAmount;
  const amountPaid = Math.max(0, params.amountPaid || 0);
  const balanceDue = Math.max(0, totalAmount - amountPaid);

  return {
    itemsSubtotal,
    additionalChargesSubtotal,
    subtotal,
    discount,
    taxableAmount,
    taxEnabled,
    taxRate,
    taxAmount,
    totalAmount,
    amountPaid,
    balanceDue,
  };
}

/**
 * Formats a numeric amount in standard Indian Currency notation (₹ X,XX,XXX)
 */
export function formatINR(amount: number): string {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return '₹ 0';
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * PDF-safe INR formatting identical to the on-screen formatINR
 * (₹4,90,000). Works once a ₹-capable font (Parva Sans/Serif) is
 * registered — see src/lib/pdfFonts.ts.
 */
export function formatPdfINR(amount: number): string {
  return formatINR(amount);
}

// ── Invoice milestone (Advance / Pre-event / Final) payment handling ────────

export type MilestoneKey = 'advance' | 'preEvent' | 'final';

export interface MilestonePaid {
  advancePaid: number;
  preEventPaid: number;
  finalPaid: number;
}

export interface MilestoneDues {
  advanceDue: number;
  preEventDue: number;
  finalDue: number;
}

export interface MilestoneScheduleRow {
  key: MilestoneKey;
  label: string;
  shortLabel: string;
  pct: number;
  due: number;
  paid: number;
  balance: number;
  isPaid: boolean;
  dueDate?: string;
}

export interface MilestoneSchedule {
  rows: MilestoneScheduleRow[];
  totalDue: number;
  totalPaid: number;
  totalBalance: number;
  status: 'Unpaid' | 'Partially Paid' | 'Paid';
}

export function derivePaymentStatus(totalAmount: number, amountPaid: number): 'Unpaid' | 'Partially Paid' | 'Paid' {
  const total = Math.max(0, Math.round(totalAmount || 0));
  const paid = Math.max(0, Math.round(amountPaid || 0));
  if (total <= 0) return 'Unpaid';
  if (paid <= 0) return 'Unpaid';
  if (paid >= total) return 'Paid';
  return 'Partially Paid';
}

function num(v: unknown): number {
  const n = Number(v);
  return isNaN(n) ? 0 : Math.max(0, Math.round(n));
}

/**
 * Resolves per-milestone paid amounts for an invoice.
 * New data stores advancePaid/preEventPaid/finalPaid explicitly.
 * Legacy data (only amountPaid) is allocated waterfall: advance → pre-event → final.
 */
export function resolveMilestonePaid(
  invoice: { advancePaid?: number; preEventPaid?: number; finalPaid?: number; amountPaid?: number },
  dues: MilestoneDues,
): MilestonePaid {
  const hasExplicit =
    invoice.advancePaid !== undefined ||
    invoice.preEventPaid !== undefined ||
    invoice.finalPaid !== undefined;
  if (hasExplicit) {
    return {
      advancePaid: Math.min(num(invoice.advancePaid), dues.advanceDue),
      preEventPaid: Math.min(num(invoice.preEventPaid), dues.preEventDue),
      finalPaid: Math.min(num(invoice.finalPaid), dues.finalDue),
    };
  }
  let remaining = num(invoice.amountPaid);
  const advancePaid = Math.min(remaining, dues.advanceDue);
  remaining -= advancePaid;
  const preEventPaid = Math.min(remaining, dues.preEventDue);
  remaining -= preEventPaid;
  const finalPaid = Math.min(remaining, dues.finalDue);
  return { advancePaid, preEventPaid, finalPaid };
}

/**
 * Full milestone schedule for an invoice: dues are always 50/30/20 of the
 * invoice's own total (line items + charges − discount + tax), so they sum
 * exactly to what the client owes. Pass the invoice's commercial due dates
 * for display via `dueDates`.
 */
export function calculateMilestoneSchedule(params: {
  lineItems: InvoiceLineItem[];
  additionalCharges: AdditionalCharge[];
  discount?: number;
  taxEnabled?: boolean;
  taxRate?: number;
  advancePaid?: number;
  preEventPaid?: number;
  finalPaid?: number;
  amountPaid?: number;
  dueDates?: { advanceDueDate?: string; preEventDueDate?: string; finalDueDate?: string };
}): MilestoneSchedule {
  const totals = calculateInvoiceTotals({
    lineItems: params.lineItems,
    additionalCharges: params.additionalCharges,
    discount: params.discount,
    taxEnabled: params.taxEnabled,
    taxRate: params.taxRate,
    amountPaid: 0,
  });
  const m = calculateMilestones(totals.totalAmount);
  const dues: MilestoneDues = {
    advanceDue: m.bookingAdvance,
    preEventDue: m.preEventPayment,
    finalDue: m.finalPayment,
  };
  const paid = resolveMilestonePaid(
    { advancePaid: params.advancePaid, preEventPaid: params.preEventPaid, finalPaid: params.finalPaid, amountPaid: params.amountPaid },
    dues,
  );
  const rows: MilestoneScheduleRow[] = [
    {
      key: 'advance',
      label: 'Booking Advance',
      shortLabel: 'Advance',
      pct: 50,
      due: dues.advanceDue,
      paid: paid.advancePaid,
      balance: Math.max(0, dues.advanceDue - paid.advancePaid),
      isPaid: paid.advancePaid >= dues.advanceDue && dues.advanceDue > 0,
      dueDate: params.dueDates?.advanceDueDate,
    },
    {
      key: 'preEvent',
      label: 'Pre-Event Payment',
      shortLabel: 'Pre-event',
      pct: 30,
      due: dues.preEventDue,
      paid: paid.preEventPaid,
      balance: Math.max(0, dues.preEventDue - paid.preEventPaid),
      isPaid: paid.preEventPaid >= dues.preEventDue && dues.preEventDue > 0,
      dueDate: params.dueDates?.preEventDueDate,
    },
    {
      key: 'final',
      label: 'Final Payment',
      shortLabel: 'Final',
      pct: 20,
      due: dues.finalDue,
      paid: paid.finalPaid,
      balance: Math.max(0, dues.finalDue - paid.finalPaid),
      isPaid: paid.finalPaid >= dues.finalDue && dues.finalDue > 0,
      dueDate: params.dueDates?.finalDueDate,
    },
  ];
  const totalPaid = paid.advancePaid + paid.preEventPaid + paid.finalPaid;
  return {
    rows,
    totalDue: totals.totalAmount,
    totalPaid,
    totalBalance: Math.max(0, totals.totalAmount - totalPaid),
    status: derivePaymentStatus(totals.totalAmount, totalPaid),
  };
}
