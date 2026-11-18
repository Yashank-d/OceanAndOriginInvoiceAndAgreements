import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { BookingDocumentData } from '../../types/document';
import { formatPdfINR } from '../../utils/calculations';
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
    paddingBottom: 44,
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Parva Sans',
    fontSize: 9,
    lineHeight: 1.4,
    color: INK,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    left: 40,
    right: 40,
  },
  bottomInitialsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: 5,
  },
  initialText: { fontSize: 7.5, color: MUTED },
  runningFooterLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: HAIRLINE,
    paddingTop: 5,
  },
  footerText: { fontSize: 7, color: FAINT, letterSpacing: 0.5, textTransform: 'uppercase' },

  // Header banner — mirrors BookingSchedulePreview
  headerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: WINE,
    paddingBottom: 9,
    marginBottom: 12,
  },
  headerTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  brandName: {
    fontSize: 7.5,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    color: WINE,
    textTransform: 'uppercase',
  },
  documentTitle: {
    fontSize: 18,
    fontFamily: 'Parva Serif',
    color: WINE,
    letterSpacing: 0,
    lineHeight: 1.25,
    marginTop: 3,
  },
  documentSubtitle: { fontSize: 9, color: MUTED, marginTop: 2 },
  logo: { height: 30 },
  metaRibbon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: HAIRLINE,
    borderRadius: 3,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginTop: 8,
  },
  metaRibbonText: { fontSize: 8, fontWeight: 'bold', color: WINE },

  // Sections — numbered serif headings with hairline rule
  sectionBlock: { marginBottom: 10 },
  sectionTitle: {
    fontSize: 9,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    paddingBottom: 3,
    marginBottom: 5,
  },

  // Label/value tables
  tableContainer: { width: '100%', borderWidth: 0.5, borderColor: BORDER, marginVertical: 4 },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    minHeight: 17,
    alignItems: 'center',
  },
  tableCellLabel: {
    width: '33.333%',
    paddingVertical: 4,
    paddingHorizontal: 7,
    fontSize: 8,
    fontWeight: 'bold',
    color: WINE,
    backgroundColor: IVORY,
    borderRightWidth: 0.5,
    borderRightColor: HAIRLINE,
  },
  tableCellValue: {
    width: '66.667%',
    paddingVertical: 4,
    paddingHorizontal: 7,
    fontSize: 8.25,
    color: INK,
  },
  tableCellValueStrong: {
    width: '66.667%',
    paddingVertical: 4,
    paddingHorizontal: 7,
    fontSize: 8.25,
    fontWeight: 'bold',
    color: INK,
  },
  tableCellValueWine: {
    width: '66.667%',
    paddingVertical: 4,
    paddingHorizontal: 7,
    fontSize: 8.25,
    fontWeight: 'bold',
    color: WINE,
  },
  tableCellMono: {
    width: '66.667%',
    paddingVertical: 4,
    paddingHorizontal: 7,
    fontSize: 8.25,
    fontFamily: 'Courier',
    color: INK,
  },

  // Package box + bullets
  packageBox: {
    backgroundColor: IVORY,
    padding: 8,
    borderRadius: 3,
    borderWidth: 0.5,
    borderColor: HAIRLINE,
    marginBottom: 5,
  },
  packageName: { fontSize: 8.5, fontWeight: 'bold', color: WINE },
  packageCrew: { fontSize: 8, color: MUTED, marginTop: 2 },
  listItem: { flexDirection: 'row', marginBottom: 2.5, paddingLeft: 5 },
  bullet: { width: 10, fontSize: 8, color: WINE },
  listText: { flex: 1, fontSize: 8.25, color: '#333333' },
  italicBox: {
    padding: 8,
    backgroundColor: IVORY,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 3,
  },
  italicText: { fontSize: 8.25, fontFamily: 'Parva Serif', fontStyle: 'italic', color: '#333333' },
  confirmNote: { fontSize: 8, color: BODY, marginBottom: 5 },

  // Milestone cards
  milestoneGrid: { flexDirection: 'row', gap: 8, marginVertical: 6 },
  milestoneCard: {
    flex: 1,
    borderWidth: 0.5,
    borderColor: BORDER,
    borderRadius: 3,
    backgroundColor: IVORY,
    padding: 7,
  },
  milestoneCardTitle: { fontSize: 7.5, fontWeight: 'bold', color: WINE },
  milestoneCardAmount: {
    fontSize: 10.5,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: INK,
    marginVertical: 2,
  },
  milestoneCardDue: { fontSize: 7.5, color: MUTED },

  // Signatures
  signatureTable: { width: '100%', borderWidth: 0.5, borderColor: BORDER, marginTop: 6 },
  signatureCol: { width: '50%', padding: 10 },
  signatureLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: INK,
    marginVertical: 14,
    width: '80%',
  },
});

interface BookingSchedulePdfDocumentProps {
  document: BookingDocumentData;
  logoSrc?: string;
}

export const BookingSchedulePdfDocument: React.FC<BookingSchedulePdfDocumentProps> = ({
  document: doc,
  logoSrc = '/logo2.png',
}) => {
  const { client, booking, services, deliverables, commercial, delivery, specialTerms, signatures } = doc;

  const renderBottom = (pageNumber: string, showInitials = true) => (
    <View style={styles.bottomContainer} fixed>
      {showInitials && (
        <View style={styles.bottomInitialsRow}>
          <Text style={styles.initialText}>Client initials: _________</Text>
          <Text style={styles.initialText}>The House of Parva, Designated Partner: _________</Text>
        </View>
      )}
      <View style={styles.runningFooterLine}>
        <Text style={styles.footerText}>THE HOUSE OF PARVA | BOOKING SCHEDULE</Text>
        <Text style={styles.footerText}>{pageNumber}</Text>
      </View>
    </View>
  );

  return (
    <Document
      title={`Booking Schedule - ${client.name || 'Parva'}`}
      author="The House of Parva (OCEAN AND ORIGIN)"
      subject="Client Booking Schedule & Service Specification"
      keywords="Booking Schedule, Photography, The House of Parva"
    >
      {/* PAGE 1 */}
      <Page size="A4" style={styles.page}>
        <View style={styles.headerContainer}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.brandName}>THE HOUSE OF PARVA</Text>
              <Text style={styles.documentTitle}>BOOKING SCHEDULE</Text>
              <Text style={styles.documentSubtitle}>Service Specification & Production Itinerary</Text>
            </View>
            {logoSrc ? <Image src={logoSrc} style={styles.logo} /> : null}
          </View>

          <View style={styles.metaRibbon}>
            <Text style={styles.metaRibbonText}>ID: {booking.bookingId || 'PARVA-2026-084'}</Text>
            <Text style={styles.metaRibbonText}>DATE: {formatDocumentDate(booking.bookingDate, '2026-03-15')}</Text>
            <Text style={styles.metaRibbonText}>ENTITY: OCEAN AND ORIGIN</Text>
          </View>
        </View>

        {/* 1. Client */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>1. Client Information</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Client Name(s)</Text>
              <Text style={styles.tableCellValueStrong}>{client.name || '—'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Contact Phone</Text>
              <Text style={styles.tableCellValue}>{client.phone || '—'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Email Address</Text>
              <Text style={styles.tableCellValue}>{client.email || '—'}</Text>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.tableCellLabel}>Residence / Address</Text>
              <Text style={styles.tableCellValue}>{client.address || '—'}</Text>
            </View>
          </View>
        </View>

        {/* 2. Assignment & Itinerary */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>2. Assignment & Itinerary</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Event / Shoot Type</Text>
              <Text style={styles.tableCellValueStrong}>{booking.eventType || '—'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Event Date(s)</Text>
              <Text style={styles.tableCellValue}>{formatDocumentDate(booking.eventDate, '—')}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Venue / Location</Text>
              <Text style={styles.tableCellValue}>{booking.location || '—'}</Text>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.tableCellLabel}>Operational Timings</Text>
              <Text style={styles.tableCellValue}>
                {booking.coverageStart || '08:00 AM'} to {booking.coverageEnd || '10:00 PM'}
              </Text>
            </View>
          </View>
        </View>

        {/* 3. Services */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>3. Services & Creative Scope</Text>
          <View style={styles.packageBox}>
            <Text style={styles.packageName}>Package: {services.packageName}</Text>
            <Text style={styles.packageCrew}>Crew Details: {services.teamDetails}</Text>
          </View>
          {services.selectedServices.map((service, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{service}</Text>
            </View>
          ))}
        </View>

        {/* 4. Deliverables */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>4. Agreed Deliverables</Text>
          {deliverables.items.map((item, idx) => (
            <View key={idx} style={styles.listItem}>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        {renderBottom('01')}
      </Page>

      {/* PAGE 2 */}
      <Page size="A4" style={styles.page}>
        {/* 5. Commercial */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>5. Fees & Commercial Milestones</Text>

          <View style={styles.milestoneGrid}>
            <View style={styles.milestoneCard}>
              <Text style={styles.milestoneCardTitle}>50% ADVANCE</Text>
              <Text style={styles.milestoneCardAmount}>{formatPdfINR(commercial.bookingAdvance)}</Text>
              <Text style={styles.milestoneCardDue}>{formatDocumentDate(commercial.advanceDueDate, 'At booking confirmation')}</Text>
            </View>
            <View style={styles.milestoneCard}>
              <Text style={styles.milestoneCardTitle}>30% PRE-EVENT</Text>
              <Text style={styles.milestoneCardAmount}>{formatPdfINR(commercial.preEventPayment)}</Text>
              <Text style={styles.milestoneCardDue}>{formatDocumentDate(commercial.preEventDueDate, 'Prior to event shoot')}</Text>
            </View>
            <View style={styles.milestoneCard}>
              <Text style={styles.milestoneCardTitle}>20% FINAL</Text>
              <Text style={styles.milestoneCardAmount}>{formatPdfINR(commercial.finalPayment)}</Text>
              <Text style={styles.milestoneCardDue}>{formatDocumentDate(commercial.finalDueDate, 'Before release of files')}</Text>
            </View>
          </View>

          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Total Agreed Fee</Text>
              <Text style={styles.tableCellValueWine}>{formatPdfINR(commercial.totalFee)}</Text>
            </View>
            {commercial.additionalCharges.length > 0 && (
              <View style={styles.tableRow}>
                <Text style={styles.tableCellLabel}>Additional Charges</Text>
                <Text style={styles.tableCellValue}>
                  {commercial.additionalCharges.map(c => `${c.description} (${formatPdfINR(c.amount)})`).join(' • ')}
                </Text>
              </View>
            )}
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.tableCellLabel}>Invoice Reference</Text>
              <Text style={styles.tableCellMono}>{commercial.invoiceReference || 'INV-2026-084'}</Text>
            </View>
          </View>
        </View>

        {/* 6. Travel */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>6. Travel & Accommodation</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Package Status</Text>
              <Text style={styles.tableCellValueStrong}>
                {commercial.travelAccommodation.included ? 'Included in total agreed fee' : 'Not included (Billed at actuals)'}
              </Text>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.tableCellLabel}>Arrangement Details</Text>
              <Text style={styles.tableCellValue}>{commercial.travelAccommodation.details || 'Local Bangalore venue travel included.'}</Text>
            </View>
          </View>
        </View>

        {/* 7. Delivery */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>7. Delivery Timelines & Retention</Text>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Expected Delivery</Text>
              <Text style={styles.tableCellValue}>{delivery.expectedTimeline || '4 to 6 weeks from selection'}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableCellLabel}>Revision Limits</Text>
              <Text style={styles.tableCellValue}>
                Photography: {delivery.photographyRevisions} rounds • Film: {delivery.filmRevisions} round (7-day window)
              </Text>
            </View>
            <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
              <Text style={styles.tableCellLabel}>Archival Retention</Text>
              <Text style={styles.tableCellValue}>{delivery.archivalPeriod}</Text>
            </View>
          </View>
        </View>

        {/* 8. Special terms */}
        {specialTerms.text ? (
          <View style={styles.sectionBlock}>
            <Text style={styles.sectionTitle}>8. Special Terms & Riders</Text>
            <View style={styles.italicBox}>
              <Text style={styles.italicText}>{specialTerms.text}</Text>
            </View>
          </View>
        ) : null}

        {/* 9. Signatures */}
        <View style={styles.sectionBlock}>
          <Text style={styles.sectionTitle}>9. Confirmation & Authorisation</Text>
          <Text style={styles.confirmNote}>
            By signing below, both parties confirm the scope, deliverables, and payment schedule set forth in this document.
          </Text>

          <View style={styles.signatureTable}>
            <View style={{ flexDirection: 'row' }}>
              <View style={[styles.signatureCol, { borderRightWidth: 0.5, borderRightColor: BORDER }]}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: WINE, marginBottom: 1 }}>
                  FOR OCEAN AND ORIGIN
                </Text>
                <Text style={{ fontSize: 7.5, color: MUTED, marginBottom: 12 }}>The House of Parva (Designated Partner)</Text>

                <Text style={{ fontSize: 7.5, color: MUTED }}>Signature:</Text>
                <View style={styles.signatureLine} />

                <Text style={{ fontSize: 7.5, color: INK }}>
                  Name: {signatures.representativeName || 'Designated Partner'}
                </Text>
                <Text style={{ fontSize: 7.5, color: INK, marginTop: 2 }}>
                  Date: {formatDocumentDate(signatures.representativeSignatureDate, '_______________________')}
                </Text>
              </View>

              <View style={styles.signatureCol}>
                <Text style={{ fontSize: 8, fontWeight: 'bold', color: WINE, marginBottom: 1 }}>
                  CLIENT
                </Text>
                <Text style={{ fontSize: 7.5, color: MUTED, marginBottom: 12 }}>Authorised Signatory / Client</Text>

                <Text style={{ fontSize: 7.5, color: MUTED }}>Signature:</Text>
                <View style={styles.signatureLine} />

                <Text style={{ fontSize: 7.5, color: INK }}>
                  Name: {signatures.clientName || client.name || '_______________________'}
                </Text>
                <Text style={{ fontSize: 7.5, color: INK, marginTop: 2 }}>
                  Date: {formatDocumentDate(signatures.clientSignatureDate, '_______________________')}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {renderBottom('02', false)}
      </Page>
    </Document>
  );
};
