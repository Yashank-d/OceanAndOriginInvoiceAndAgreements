import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { QuoteDocumentData } from '../../types/quote';
import { formatPdfINR } from '../../utils/calculations';
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
    paddingTop: 32,
    paddingBottom: 32,
    paddingLeft: 36,
    paddingRight: 36,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Parva Sans',
    fontSize: 8.5,
    lineHeight: 1.35,
    color: INK,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  contentContainer: { flex: 1 },

  // Header
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    borderBottomWidth: 1.5,
    borderBottomColor: WINE,
    paddingBottom: 10,
    marginBottom: 10,
  },
  headerLeft: { flexDirection: 'row', alignItems: 'center' },
  logo: { height: 32, marginRight: 10 },
  brandEyebrow: {
    fontSize: 7.5,
    fontWeight: 'bold',
    letterSpacing: 1.2,
    color: WINE,
    textTransform: 'uppercase',
  },
  brandCompany: { fontSize: 10, fontWeight: 'bold', color: INK, marginTop: 1 },
  brandTagline: { fontSize: 8, color: MUTED },
  headerRight: { alignItems: 'flex-end' },
  quoteTitle: {
    fontSize: 16,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
    letterSpacing: 0.5,
  },
  quoteSubtitle: { fontSize: 8, color: MUTED, marginTop: 1 },

  // Metadata Ribbon
  metaRibbon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
  metaText: { fontSize: 8, color: BODY },
  metaBold: { fontWeight: 'bold', color: WINE },

  // Info Cards (Client & Assignment)
  infoGrid: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  infoCard: {
    flex: 1,
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: HAIRLINE,
    borderRadius: 3,
    padding: 7,
  },
  cardTitle: {
    fontSize: 7.5,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    color: WINE,
    marginBottom: 3,
  },
  clientName: {
    fontSize: 9.5,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: INK,
  },
  cardLine: { fontSize: 8, color: BODY, marginTop: 1 },

  // Section Header
  sectionTitle: {
    fontSize: 8.5,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    paddingBottom: 2,
    marginBottom: 5,
    marginTop: 4,
  },

  // Base Package Box
  packageBox: {
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 3,
    padding: 8,
    marginBottom: 8,
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    paddingBottom: 4,
    marginBottom: 4,
  },
  packageName: {
    fontSize: 9.5,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
  },
  packageCoverage: { fontSize: 8, color: MUTED, marginTop: 1 },
  packagePrice: { fontSize: 10, fontWeight: 'bold', color: INK },
  deliverablesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 2,
  },
  deliverableItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 1,
  },
  bullet: { fontSize: 7, color: WINE, marginRight: 3 },
  deliverableText: { fontSize: 7.5, color: BODY, flex: 1 },

  // Table
  tableContainer: {
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: IVORY,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    paddingVertical: 4,
    paddingHorizontal: 6,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    paddingVertical: 3.5,
    paddingHorizontal: 6,
  },
  colDesc: { flex: 5, fontSize: 8 },
  colQty: { flex: 1, textAlign: 'center', fontSize: 8 },
  colRate: { flex: 2, textAlign: 'right', fontSize: 8 },
  colAmount: { flex: 2, textAlign: 'right', fontSize: 8, fontWeight: 'bold' },

  // Commercial Summary Box
  summaryBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 3,
    padding: 8,
    marginBottom: 6,
  },
  milestonesCol: { flex: 3, paddingRight: 10 },
  milestoneTitle: { fontSize: 8, fontWeight: 'bold', color: WINE, marginBottom: 2 },
  milestoneLine: { fontSize: 7.5, color: BODY, marginVertical: 0.5 },
  totalsCol: {
    flex: 2,
    borderLeftWidth: 0.5,
    borderLeftColor: BORDER,
    paddingLeft: 8,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 1,
  },
  totalLabel: { fontSize: 7.5, color: MUTED },
  totalValue: { fontSize: 7.5, color: INK },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: BORDER,
    paddingTop: 3,
    marginTop: 2,
  },
  grandTotalLabel: { fontSize: 8.5, fontWeight: 'bold', color: WINE },
  grandTotalValue: { fontSize: 9.5, fontWeight: 'bold', color: WINE },

  // Footer
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 0.5,
    borderTopColor: BORDER,
    paddingTop: 6,
    marginTop: 4,
  },
  footerText: { fontSize: 7, color: FAINT },
});

interface QuotePdfDocumentProps {
  quote: QuoteDocumentData;
  logoSrc?: string;
}

export const QuotePdfDocument: React.FC<QuotePdfDocumentProps> = ({
  quote,
  logoSrc = '/logo2.png',
}) => {
  const company = getStoredCompanyProfile();
  const {
    quoteNumber,
    quoteDate,
    validUntil,
    brand,
    client,
    selectedTier,
    lineItems,
    customDeliverables,
    basePrice,
    addonsTotal,
    calculatedTotal,
    negotiatedTotal,
    discountAmount,
    specialNotes,
  } = quote;

  const finalTotal = negotiatedTotal !== undefined && negotiatedTotal > 0 ? negotiatedTotal : calculatedTotal;

  // 50 / 30 / 20 milestone calculations
  const advance = Math.round(finalTotal * 0.5);
  const preEvent = Math.round(finalTotal * 0.3);
  const finalBal = finalTotal - advance - preEvent;

  return (
    <Document
      title={`Quotation_${quoteNumber || 'Estimate'}_${client.name || 'Client'}`}
      author="Ocean and Origin"
      subject={`Quotation & Estimate for ${client.name}`}
      keywords="Quotation, Estimate, Photography, The House of Parva"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.contentContainer}>
          {/* Header */}
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              {logoSrc ? <Image src={logoSrc} style={styles.logo} /> : null}
              <View>
                <Text style={styles.brandEyebrow}>OCEAN & ORIGIN • {brand.toUpperCase()}</Text>
                <Text style={styles.brandCompany}>{company.legalEntity}</Text>
                <Text style={styles.brandTagline}>{company.tagline}</Text>
              </View>
            </View>

            <View style={styles.headerRight}>
              <Text style={styles.quoteTitle}>COMMERCIAL ESTIMATE</Text>
              <Text style={styles.quoteSubtitle}>Photography & Film Quotation</Text>
            </View>
          </View>

          {/* Ribbon */}
          <View style={styles.metaRibbon}>
            <Text style={styles.metaText}>
              ESTIMATE NO: <Text style={styles.metaBold}>{quoteNumber || 'QT-2026-084'}</Text>
            </Text>
            <Text style={styles.metaText}>
              DATE: <Text style={styles.metaBold}>{formatDocumentDate(quoteDate)}</Text>
            </Text>
            <Text style={styles.metaText}>
              VALID UNTIL: <Text style={styles.metaBold}>{formatDocumentDate(validUntil)}</Text>
            </Text>
          </View>

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>PREPARED FOR</Text>
              <Text style={styles.clientName}>{client.name || 'Valued Client'}</Text>
              <Text style={styles.cardLine}>{client.phone || 'Phone not specified'}</Text>
              <Text style={styles.cardLine}>{client.email || 'Email not specified'}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>ASSIGNMENT SPECIFICATION</Text>
              <Text style={styles.cardLine}>
                Event: <Text style={{ fontWeight: 'bold', color: INK }}>{client.eventType || 'Event / Shoot'}</Text>
              </Text>
              <Text style={styles.cardLine}>
                Date(s): {client.eventDate ? formatDocumentDate(client.eventDate) : 'To be confirmed'}
              </Text>
              <Text style={styles.cardLine}>
                Venue: {client.location || 'Bengaluru Venue'}
              </Text>
            </View>
          </View>

          {/* Section 1: Base Package */}
          {selectedTier && (
            <View>
              <Text style={styles.sectionTitle}>1. Base Package & Production Scope</Text>
              <View style={styles.packageBox}>
                <View style={styles.packageHeader}>
                  <View>
                    <Text style={styles.packageName}>{selectedTier.name}</Text>
                    <Text style={styles.packageCoverage}>
                      Coverage: {selectedTier.coverage} • Crew: {selectedTier.crew}
                    </Text>
                  </View>
                  <Text style={styles.packagePrice}>{formatPdfINR(basePrice)}</Text>
                </View>

                <View style={styles.deliverablesGrid}>
                  {selectedTier.deliverables.map((item, idx) => (
                    <View key={idx} style={styles.deliverableItem}>
                      <Text style={styles.bullet}>•</Text>
                      <Text style={styles.deliverableText}>{item}</Text>
                    </View>
                  ))}
                  {customDeliverables.map((item, idx) => (
                    <View key={`c-${idx}`} style={styles.deliverableItem}>
                      <Text style={[styles.bullet, { color: WINE }]}>+</Text>
                      <Text style={[styles.deliverableText, { color: WINE, fontWeight: 'bold' }]}>
                        {item}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* Section 2: Line Items */}
          {lineItems.length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>2. Additional Services & Deliverables</Text>
              <View style={styles.tableContainer}>
                <View style={styles.tableHeader}>
                  <Text style={[styles.colDesc, { fontWeight: 'bold', color: WINE }]}>Service / Deliverable</Text>
                  <Text style={[styles.colQty, { fontWeight: 'bold', color: WINE }]}>Qty</Text>
                  <Text style={[styles.colRate, { fontWeight: 'bold', color: WINE }]}>Rate</Text>
                  <Text style={[styles.colAmount, { fontWeight: 'bold', color: WINE }]}>Amount</Text>
                </View>

                {lineItems.map((item) => (
                  <View key={item.id} style={styles.tableRow}>
                    <Text style={styles.colDesc}>{item.name}</Text>
                    <Text style={styles.colQty}>{item.quantity}</Text>
                    <Text style={styles.colRate}>{formatPdfINR(item.unitPrice)}</Text>
                    <Text style={styles.colAmount}>{formatPdfINR(item.total)}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* Section 3: Commercial Summary */}
          <Text style={styles.sectionTitle}>3. Commercial Terms & Payment Schedule</Text>
          <View style={styles.summaryBox}>
            <View style={styles.milestonesCol}>
              <Text style={styles.milestoneTitle}>Payment Schedule</Text>
              <Text style={styles.milestoneLine}>
                • <Text style={{ fontWeight: 'bold' }}>50% Advance:</Text> {formatPdfINR(advance)} (to confirm dates)
              </Text>
              <Text style={styles.milestoneLine}>
                • <Text style={{ fontWeight: 'bold' }}>30% Pre-Event:</Text> {formatPdfINR(preEvent)} (prior to event day)
              </Text>
              <Text style={styles.milestoneLine}>
                • <Text style={{ fontWeight: 'bold' }}>20% Final:</Text> {formatPdfINR(finalBal)} (before release of files)
              </Text>
              <Text style={{ fontSize: 6.5, color: MUTED, marginTop: 4 }}>
                GST is currently not charged. Travel outside Bengaluru is billed at actuals.
              </Text>
            </View>

            <View style={styles.totalsCol}>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Base Package:</Text>
                <Text style={styles.totalValue}>{formatPdfINR(basePrice)}</Text>
              </View>
              {addonsTotal > 0 && (
                <View style={styles.totalRow}>
                  <Text style={styles.totalLabel}>Add-ons Total:</Text>
                  <Text style={styles.totalValue}>{formatPdfINR(addonsTotal)}</Text>
                </View>
              )}
              {discountAmount && discountAmount > 0 ? (
                <View style={styles.totalRow}>
                  <Text style={[styles.totalLabel, { color: '#16a34a' }]}>Courtesy Discount:</Text>
                  <Text style={[styles.totalValue, { color: '#16a34a' }]}>- {formatPdfINR(discountAmount)}</Text>
                </View>
              ) : null}
              <View style={styles.grandTotalRow}>
                <Text style={styles.grandTotalLabel}>Total:</Text>
                <Text style={styles.grandTotalValue}>{formatPdfINR(finalTotal)}</Text>
              </View>
            </View>
          </View>

          {/* Notes */}
          {specialNotes && (
            <View style={{ backgroundColor: IVORY, padding: 5, borderWidth: 0.5, borderColor: HAIRLINE, borderRadius: 2, marginTop: 3 }}>
              <Text style={{ fontSize: 7, fontStyle: 'italic', color: BODY }}>
                Note: {specialNotes}
              </Text>
            </View>
          )}
        </View>

        {/* Running Footer */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>
            {company.legalEntity} • {company.address.line1}, {company.address.city} {company.address.pincode}
          </Text>
          <Text style={styles.footerText}>
            {company.email} • {company.phones[0]} • {company.website}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
