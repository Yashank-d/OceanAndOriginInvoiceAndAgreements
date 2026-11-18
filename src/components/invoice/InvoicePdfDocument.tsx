import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { InvoiceDocumentData } from '../../types/document';
import { calculateInvoiceTotals, calculateMilestoneSchedule, formatPdfINR } from '../../utils/calculations';
import { getStoredCompanyProfile } from '../../utils/defaults';
import { formatDocumentDate } from '../../utils/formatters';
import '../../lib/pdfFonts';

const WINE = '#581825';
const INK = '#221F20';
const BODY = '#4A4646';
const MUTED = '#78716C';
const FAINT = '#8E867E';
const IVORY = '#FAF8F5';
const BORDER = '#D8CEBE';
const HAIRLINE = '#EAE3D9';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 36,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Parva Sans',
    fontSize: 9,
    lineHeight: 1.4,
    color: INK,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: { flex: 1 },

  // Header — mirrors InvoiceDocumentPreview header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    borderBottomColor: WINE,
    paddingBottom: 12,
    marginBottom: 12,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { height: 36, marginRight: 12 },
  brandEyebrow: {
    fontSize: 7.5,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: WINE,
    textTransform: 'uppercase',
  },
  brandCompany: { fontSize: 10.5, fontWeight: 'bold', color: INK, marginTop: 2 },
  brandTagline: { fontSize: 8.25, color: MUTED },
  headerRight: { alignItems: 'flex-end' },
  invoiceTitle: {
    fontSize: 18,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
    letterSpacing: 0,
    lineHeight: 1.25,
  },
  statusBadge: {
    marginTop: 4,
    paddingVertical: 3,
    paddingHorizontal: 9,
    borderRadius: 4,
    borderWidth: 0.75,
  },
  statusText: { fontSize: 8, fontWeight: 'bold', letterSpacing: 0.8, textTransform: 'uppercase' },

  // Metadata ribbon — Invoice No / Invoice Date / Due Date / Booking ID
  metaRibbon: {
    flexDirection: 'row',
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: HAIRLINE,
    paddingVertical: 6,
    paddingHorizontal: 9,
    marginBottom: 12,
  },
  metaCol: { flex: 1, flexDirection: 'column' },
  metaLabel: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: MUTED,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 1,
  },
  metaValue: { fontSize: 8.5, color: INK },
  metaValueMono: { fontSize: 8.5, fontFamily: 'Courier', fontWeight: 'bold', color: INK },
  metaValueWine: { fontSize: 10.5, fontFamily: 'Courier', fontWeight: 'bold', color: WINE },

  // Parties
  partiesRow: { flexDirection: 'row', gap: 10, marginBottom: 12 },
  partyCard: { flex: 1, borderWidth: 0.5, borderColor: BORDER, padding: 8 },
  partyTitle: {
    fontSize: 8.5,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    paddingBottom: 3,
    marginBottom: 5,
  },
  partyName: { fontSize: 9, fontWeight: 'bold', color: INK, marginBottom: 2 },
  partyText: { fontSize: 8, color: BODY, lineHeight: 1.35 },
  partyMuted: { fontSize: 8, color: MUTED, lineHeight: 1.35 },
  partyAccent: { fontSize: 8, color: WINE, marginTop: 2 },

  // Line items table
  table: { width: '100%', borderWidth: 0.5, borderColor: BORDER, marginBottom: 10 },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: IVORY,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  tableHeaderCol: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: WINE,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    paddingVertical: 4,
    paddingHorizontal: 7,
    alignItems: 'center',
  },
  tableRowAlt: { backgroundColor: '#FCFBF9' },
  colIndex: { width: '7%', textAlign: 'center', fontSize: 8, color: MUTED },
  colDesc: { width: '51%', fontSize: 8.25, color: INK },
  colQty: { width: '12%', textAlign: 'right', fontSize: 8.25, color: INK },
  colRate: { width: '15%', textAlign: 'right', fontSize: 8.25, color: INK },
  colAmount: { width: '15%', textAlign: 'right', fontSize: 8.25, fontWeight: 'bold', color: INK },

  // Bottom split: bank (7) + totals (5)
  summaryContainer: { flexDirection: 'row', gap: 10, marginBottom: 10 },
  bankBox: {
    width: '58.333%',
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: BORDER,
    padding: 9,
  },
  bankTitle: {
    fontSize: 8.5,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    paddingBottom: 3,
    marginBottom: 5,
  },
  bankRow: { flexDirection: 'row', marginBottom: 2.5 },
  bankLabel: { width: '34%', fontSize: 8, fontWeight: 'bold', color: MUTED },
  bankValue: { width: '66%', fontSize: 8.25, color: INK },
  bankNote: {
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 0.5,
    borderTopColor: HAIRLINE,
    fontSize: 8,
    color: MUTED,
  },
  totalsBox: { width: '41.667%', borderWidth: 0.5, borderColor: BORDER },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
  },
  totalsLabel: { fontSize: 8.25, color: MUTED },
  totalsValue: { fontSize: 8.25, color: INK },
  totalsDiscount: { fontSize: 8.25, color: '#B91C1C', fontWeight: 'bold' },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: WINE,
  },
  grandTotalLabel: { fontSize: 9, fontFamily: 'Parva Serif', fontWeight: 'bold', color: '#FFFFFF', letterSpacing: 0.5 },
  grandTotalValue: { fontSize: 10.5, fontFamily: 'Parva Serif', fontWeight: 'bold', color: '#FFFFFF' },
  paidRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
    paddingHorizontal: 8,
    backgroundColor: IVORY,
  },
  balanceLabel: { fontSize: 8.5, fontWeight: 'bold', color: WINE },
  balanceValue: { fontSize: 9, fontWeight: 'bold', color: WINE },

  // Payment schedule — mirrors preview milestone table
  msTable: { width: '100%', borderWidth: 0.5, borderColor: BORDER, marginBottom: 10 },
  msTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: WINE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    backgroundColor: IVORY,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  msHeadRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    paddingVertical: 3,
    paddingHorizontal: 8,
  },
  msHeadCol: { fontSize: 7, fontWeight: 'bold', color: MUTED, textTransform: 'uppercase', letterSpacing: 0.4 },
  msRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    paddingVertical: 3.5,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  msLabel: { width: '26%', fontSize: 8, fontWeight: 'bold', color: INK },
  msDueDate: { width: '18%', fontSize: 7.5, color: MUTED },
  msMoney: { width: '14%', textAlign: 'right', fontSize: 8, color: INK },
  msMoneyPaid: { width: '14%', textAlign: 'right', fontSize: 8, fontWeight: 'bold', color: '#065F46' },
  msBalance: { width: '14%', textAlign: 'right', fontSize: 8, fontWeight: 'bold', color: WINE },
  msStatusWrap: { width: '14%', alignItems: 'flex-end' },
  msChip: { paddingVertical: 1.5, paddingHorizontal: 5, borderRadius: 3, borderWidth: 0.5 },
  msChipText: { fontSize: 7, fontWeight: 'bold' },

  // Notes
  notesBox: { borderWidth: 0.5, borderColor: HAIRLINE, padding: 7, marginBottom: 8, backgroundColor: '#FFFFFF' },
  notesTitle: { fontSize: 7.5, fontWeight: 'bold', color: WINE, textTransform: 'uppercase', marginBottom: 2 },
  notesText: { fontSize: 8, color: '#666666', lineHeight: 1.35 },

  // Footer
  footerContainer: {
    borderTopWidth: 0.5,
    borderTopColor: BORDER,
    paddingTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  footerLegalText: { fontSize: 7, color: FAINT, flex: 1, marginRight: 10 },
  footerBrandText: { fontSize: 7.5, fontWeight: 'bold', color: WINE, letterSpacing: 0.8, textTransform: 'uppercase' },
});

interface InvoicePdfDocumentProps {
  invoice: InvoiceDocumentData;
  logoSrc?: string;
}

export const InvoicePdfDocument: React.FC<InvoicePdfDocumentProps> = ({
  invoice,
  logoSrc = '/logo2.png',
}) => {
  const {
    client,
    booking,
    commercial,
    invoiceNumber,
    invoiceDate,
    dueDate,
    lineItems,
    discount,
    taxEnabled,
    taxRate,
    amountPaid,
    paymentMethod,
    notes,
  } = invoice;

  const schedule = calculateMilestoneSchedule({
    lineItems,
    additionalCharges: commercial.additionalCharges,
    discount,
    taxEnabled,
    taxRate,
    advancePaid: invoice.advancePaid,
    preEventPaid: invoice.preEventPaid,
    finalPaid: invoice.finalPaid,
    amountPaid,
    dueDates: {
      advanceDueDate: commercial.advanceDueDate,
      preEventDueDate: commercial.preEventDueDate,
      finalDueDate: commercial.finalDueDate,
    },
  });

  const totals = calculateInvoiceTotals({
    lineItems,
    additionalCharges: commercial.additionalCharges,
    discount,
    taxEnabled,
    taxRate,
    amountPaid: schedule.totalPaid,
  });

  const paymentStatus = schedule.status;

  const badge =
    paymentStatus === 'Paid'
      ? { bg: '#D1FAE5', border: '#6EE7B7', text: '#065F46' }
      : paymentStatus === 'Partially Paid'
        ? { bg: '#E0F2FD', border: '#7DD3FC', text: '#075985' }
        : { bg: '#FEF3C7', border: '#FCD34D', text: '#92400E' };

  const company = getStoredCompanyProfile();
  const bank = invoice.bankDetails || company.bankDetails;

  return (
    <Document
      title={`Invoice ${invoiceNumber || 'INV-2026'} - ${client.name || 'Parva'}`}
      author={`The House of Parva (${company.legalEntity})`}
      subject="Commercial Invoice"
      keywords="Invoice, Photography, The House of Parva"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              {logoSrc ? <Image src={logoSrc} style={styles.logo} /> : null}
              <View>
                <Text style={styles.brandEyebrow}>{company.operatingBrand.toUpperCase()}</Text>
                <Text style={styles.brandCompany}>{company.legalEntity}</Text>
                <Text style={styles.brandTagline}>{company.tagline}</Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.invoiceTitle}>{taxEnabled ? 'TAX INVOICE' : 'INVOICE'}</Text>
              <View style={[styles.statusBadge, { backgroundColor: badge.bg, borderColor: badge.border }]}>
                <Text style={[styles.statusText, { color: badge.text }]}>{paymentStatus}</Text>
              </View>
            </View>
          </View>

          {/* Metadata ribbon */}
          <View style={styles.metaRibbon}>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Invoice No</Text>
              <Text style={styles.metaValueWine}>{invoiceNumber || 'INV-2026'}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Invoice Date</Text>
              <Text style={styles.metaValue}>{formatDocumentDate(invoiceDate)}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Due Date</Text>
              <Text style={styles.metaValue}>{formatDocumentDate(dueDate)}</Text>
            </View>
            <View style={styles.metaCol}>
              <Text style={styles.metaLabel}>Booking ID</Text>
              <Text style={styles.metaValueMono}>{booking.bookingId || '—'}</Text>
            </View>
          </View>

          {/* Issued By & Bill To */}
          <View style={styles.partiesRow}>
            <View style={styles.partyCard}>
              <Text style={styles.partyTitle}>Issued By</Text>
              <Text style={styles.partyName}>{company.legalEntity}</Text>
              <Text style={styles.partyText}>{company.operatingBrand}</Text>
              <Text style={styles.partyText}>{company.address.line1}, {company.address.line2}</Text>
              <Text style={styles.partyText}>{company.address.city}, {company.address.state} {company.address.pincode}</Text>
              <Text style={styles.partyMuted}>{company.email} • {company.phones.join(' • ')}</Text>
            </View>

            <View style={styles.partyCard}>
              <Text style={styles.partyTitle}>Bill To (Client)</Text>
              <Text style={styles.partyName}>{client.name || 'Valued Client'}</Text>
              <Text style={styles.partyText}>{client.address || 'Address not specified'}</Text>
              <Text style={styles.partyMuted}>Phone: {client.phone || '—'}</Text>
              <Text style={styles.partyMuted}>Email: {client.email || '—'}</Text>
              {booking.eventType ? (
                <Text style={styles.partyAccent}>Assignment: {booking.eventType}</Text>
              ) : null}
            </View>
          </View>

          {/* Line items */}
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCol, styles.colIndex]}>#</Text>
              <Text style={[styles.tableHeaderCol, styles.colDesc]}>Description / Service Specification</Text>
              <Text style={[styles.tableHeaderCol, styles.colQty]}>Qty</Text>
              <Text style={[styles.tableHeaderCol, styles.colRate]}>Rate</Text>
              <Text style={[styles.tableHeaderCol, styles.colAmount]}>Amount</Text>
            </View>

            {lineItems.map((item, idx) => (
              <View key={item.id || idx} style={styles.tableRow}>
                <Text style={styles.colIndex}>{idx + 1}</Text>
                <Text style={styles.colDesc}>{item.description}</Text>
                <Text style={styles.colQty}>{item.quantity}</Text>
                <Text style={styles.colRate}>{formatPdfINR(item.rate)}</Text>
                <Text style={styles.colAmount}>{formatPdfINR(item.amount)}</Text>
              </View>
            ))}

            {commercial.additionalCharges && commercial.additionalCharges.map((charge, idx) => (
              <View key={charge.id || `c-${idx}`} style={[styles.tableRow, styles.tableRowAlt]}>
                <Text style={styles.colIndex}>{lineItems.length + idx + 1}</Text>
                <Text style={styles.colDesc}>Additional: {charge.description}</Text>
                <Text style={styles.colQty}>1</Text>
                <Text style={styles.colRate}>{formatPdfINR(charge.amount)}</Text>
                <Text style={styles.colAmount}>{formatPdfINR(charge.amount)}</Text>
              </View>
            ))}
          </View>

          {/* Bank + totals */}
          <View style={styles.summaryContainer}>
            <View style={styles.bankBox}>
              <Text style={styles.bankTitle}>Bank & Remittance Details</Text>
              <View style={styles.bankRow}>
                <Text style={styles.bankLabel}>Beneficiary:</Text>
                <Text style={[styles.bankValue, { fontWeight: 'bold' }]}>{bank.beneficiaryName}</Text>
              </View>
              <View style={styles.bankRow}>
                <Text style={styles.bankLabel}>Bank Name:</Text>
                <Text style={styles.bankValue}>{bank.bankName}</Text>
              </View>
              <View style={styles.bankRow}>
                <Text style={styles.bankLabel}>Account No:</Text>
                <Text style={[styles.bankValue, { fontFamily: 'Courier', fontWeight: 'bold' }]}>{bank.accountNumber}</Text>
              </View>
              <View style={styles.bankRow}>
                <Text style={styles.bankLabel}>IFSC Code:</Text>
                <Text style={[styles.bankValue, { fontFamily: 'Courier', fontWeight: 'bold' }]}>{bank.ifscCode}</Text>
              </View>
              {bank.branch ? (
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>Branch:</Text>
                  <Text style={styles.bankValue}>{bank.branch}</Text>
                </View>
              ) : null}
              {bank.upiId ? (
                <View style={styles.bankRow}>
                  <Text style={styles.bankLabel}>UPI ID:</Text>
                  <Text style={[styles.bankValue, { fontFamily: 'Courier' }]}>{bank.upiId}</Text>
                </View>
              ) : null}
              <View style={styles.bankRow}>
                <Text style={styles.bankLabel}>Payment Method:</Text>
                <Text style={styles.bankValue}>{paymentMethod || 'Bank Transfer (NEFT/RTGS)'}</Text>
              </View>
              <Text style={styles.bankNote}>
                Please quote <Text style={{ fontWeight: 'bold', color: WINE }}>{invoiceNumber || 'INV-2026'}</Text> in transaction remarks.
              </Text>
            </View>

            <View style={styles.totalsBox}>
              <View style={styles.totalsRow}>
                <Text style={styles.totalsLabel}>Services Subtotal</Text>
                <Text style={styles.totalsValue}>{formatPdfINR(totals.itemsSubtotal)}</Text>
              </View>

              {totals.additionalChargesSubtotal > 0 && (
                <View style={styles.totalsRow}>
                  <Text style={styles.totalsLabel}>Additional Charges</Text>
                  <Text style={styles.totalsValue}>{formatPdfINR(totals.additionalChargesSubtotal)}</Text>
                </View>
              )}

              {totals.discount > 0 && (
                <View style={styles.totalsRow}>
                  <Text style={styles.totalsLabel}>Discount</Text>
                  <Text style={styles.totalsDiscount}>- {formatPdfINR(totals.discount)}</Text>
                </View>
              )}

              {totals.taxEnabled && (
                <View style={styles.totalsRow}>
                  <Text style={styles.totalsLabel}>GST ({totals.taxRate}%)</Text>
                  <Text style={styles.totalsValue}>{formatPdfINR(totals.taxAmount)}</Text>
                </View>
              )}

              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>TOTAL</Text>
                <Text style={styles.grandTotalValue}>{formatPdfINR(totals.totalAmount)}</Text>
              </View>

              <View style={styles.paidRow}>
                <Text style={styles.totalsLabel}>Amount Paid</Text>
                <Text style={[styles.totalsValue, { color: '#065F46', fontWeight: 'bold' }]}>
                  {formatPdfINR(totals.amountPaid)}
                </Text>
              </View>

              <View style={styles.balanceRow}>
                <Text style={styles.balanceLabel}>BALANCE DUE</Text>
                <Text style={styles.balanceValue}>{formatPdfINR(totals.balanceDue)}</Text>
              </View>
            </View>
          </View>

          {/* Payment schedule */}
          <View style={styles.msTable}>
            <Text style={styles.msTitle}>Payment Schedule — 50 / 30 / 20</Text>
            <View style={styles.msHeadRow}>
              <Text style={[styles.msHeadCol, styles.msLabel]}>Milestone</Text>
              <Text style={[styles.msHeadCol, styles.msDueDate]}>Due date</Text>
              <Text style={[styles.msHeadCol, styles.msMoney]}>Due</Text>
              <Text style={[styles.msHeadCol, styles.msMoneyPaid]}>Received</Text>
              <Text style={[styles.msHeadCol, styles.msBalance]}>Balance</Text>
              <Text style={[styles.msHeadCol, styles.msStatusWrap]}>Status</Text>
            </View>
            {schedule.rows.map((row) => (
              <View key={row.key} style={styles.msRow}>
                <Text style={styles.msLabel}>{row.pct}% {row.label}</Text>
                <Text style={styles.msDueDate}>{formatDocumentDate(row.dueDate)}</Text>
                <Text style={styles.msMoney}>{formatPdfINR(row.due)}</Text>
                <Text style={styles.msMoneyPaid}>{formatPdfINR(row.paid)}</Text>
                <Text style={styles.msBalance}>{formatPdfINR(row.balance)}</Text>
                <View style={styles.msStatusWrap}>
                  <View
                    style={[
                      styles.msChip,
                      row.isPaid
                        ? { backgroundColor: '#D1FAE5', borderColor: '#6EE7B7' }
                        : { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' },
                    ]}
                  >
                    <Text
                      style={[styles.msChipText, { color: row.isPaid ? '#065F46' : '#92400E' }]}
                    >
                      {row.isPaid ? 'Paid' : 'Pending'}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          {/* Notes */}
          <View style={styles.notesBox}>
            <Text style={styles.notesTitle}>Notes & Terms:</Text>
            <Text style={styles.notesText}>
              {notes || 'All payments should be remitted to the designated account of OCEAN AND ORIGIN. Deliverables will be released upon full payment of balance due.'}
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerLegalText}>
            {company.legalEntity} • {company.address.line2}, {company.address.city} • {company.email} • {company.phones.join(' • ')} • {company.website}
          </Text>
          <Text style={styles.footerBrandText}>THE HOUSE OF PARVA</Text>
        </View>
      </Page>
    </Document>
  );
};
