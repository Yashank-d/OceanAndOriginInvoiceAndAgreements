import React from 'react';
import { Document, Page, Text, View, StyleSheet, Image } from '@react-pdf/renderer';
import { BookingDocumentData } from '../../types/document';
import { formatPdfINR } from '../../utils/calculations';
import { formatDocumentDate } from '../../utils/formatters';
import '../../lib/pdfFonts';
import {
  LEGAL_PREAMBLE,
  SECTION_1_FOOTER,
  SECTION_2_TEXT,
  SECTION_3_TEXT,
  SECTION_4_TEXT,
  SECTION_5_TEXT,
  SECTION_6_TEXT,
  SECTION_7_TEXT,
  SECTION_8_TEXT,
} from '../../content/legalAgreementText';

const WINE = '#581825';
const INK = '#221F20';
const BODY = '#3D3A3A';
const MUTED = '#78716C';
const FAINT = '#8E867E';
const IVORY = '#FAF8F5';
const BORDER = '#D8CEBE';
const HAIRLINE = '#EAE3D9';

const styles = StyleSheet.create({
  page: {
    paddingTop: 36,
    paddingBottom: 54, // Leave generous space for bottom initial boxes & footer
    paddingLeft: 44,
    paddingRight: 44,
    backgroundColor: '#FFFFFF',
    fontFamily: 'Parva Sans',
    fontSize: 8.5,
    lineHeight: 1.45,
    color: INK,
  },
  // Running Bottom Container: Initials + Footer Rule + Page Number
  bottomContainer: {
    position: 'absolute',
    bottom: 22,
    left: 44,
    right: 44,
  },
  bottomInitialsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 20,
    marginBottom: 6,
  },
  initialText: {
    fontSize: 7.5,
    color: MUTED,
  },
  runningFooterLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 0.5,
    borderTopColor: BORDER,
    paddingTop: 5,
  },
  footerText: {
    fontSize: 7.5,
    color: FAINT,
    letterSpacing: 0.5,
  },

  // Cover Page Styles — mirrors AgreementDocumentPreview cover
  coverContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingVertical: 16,
    alignItems: 'center',
    textAlign: 'center',
  },
  coverBrandHeader: {
    fontSize: 9,
    letterSpacing: 2,
    color: WINE,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  coverTitle: {
    fontSize: 22.5,
    fontFamily: 'Parva Serif',
    color: WINE,
    letterSpacing: 0,
    lineHeight: 1.25,
    marginBottom: 4,
  },
  coverSubtitle: {
    fontSize: 9,
    color: MUTED,
    letterSpacing: 0.4,
    lineHeight: 1.5,
    marginBottom: 30,
  },
  watermarkImage: {
    // Height only — width auto-preserves the portrait aspect (1018×1607),
    // exactly like the preview's `h-32 w-auto`. Never force a square box.
    height: 96,
    marginVertical: 24,
    opacity: 0.35,
    alignSelf: 'center',
  },
  coverTagline: {
    fontSize: 10.5,
    fontFamily: 'Parva Serif',
    fontStyle: 'italic',
    color: WINE,
    maxWidth: 320,
    lineHeight: 1.5,
    marginVertical: 20,
  },
  coverSummaryBox: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: BORDER,
    backgroundColor: IVORY,
    flexDirection: 'row',
    marginVertical: 18,
  },
  coverSummaryCol: {
    flex: 1,
    padding: 10,
    textAlign: 'left',
  },
  coverSummaryColBorder: {
    borderRightWidth: 0.5,
    borderRightColor: BORDER,
  },
  coverSummaryHeader: {
    fontSize: 7.5,
    fontWeight: 'bold',
    color: WINE,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  coverSummaryText: {
    fontSize: 8.5,
    color: BODY,
    lineHeight: 1.4,
  },
  coverLocationFooter: {
    fontSize: 8,
    color: MUTED,
    letterSpacing: 0.4,
  },

  // Section Headings — h2 serif wine, h3 sans ink (mirrors preview)
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Parva Serif',
    fontWeight: 'bold',
    color: WINE,
    marginBottom: 8,
    marginTop: 4,
  },
  subSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: INK,
    marginTop: 6,
    marginBottom: 2,
  },
  paragraph: {
    marginBottom: 6,
    textAlign: 'justify',
    color: BODY,
  },
  clauseBold: {
    fontWeight: 'bold',
    color: INK,
  },
  // Denser variants used only on the final page
  denseParagraph: {
    marginBottom: 4,
    textAlign: 'justify',
    color: BODY,
  },
  denseSubSectionTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: INK,
    marginTop: 3,
    marginBottom: 2,
  },

  // Boxed Details Table
  tableContainer: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: BORDER,
    marginVertical: 8,
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: HAIRLINE,
    minHeight: 18,
    alignItems: 'center',
  },
  tableCellLabel: {
    width: '33.333%',
    paddingVertical: 3,
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
    paddingVertical: 3,
    paddingHorizontal: 7,
    fontSize: 8,
    color: INK,
  },

  // Milestone Schedule Table
  milestoneRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: BORDER,
    paddingVertical: 4,
    paddingHorizontal: 7,
  },
  milestonePct: {
    width: '35%',
    fontSize: 8,
    fontWeight: 'bold',
    color: WINE,
  },
  milestoneCondition: {
    width: '65%',
    fontSize: 8,
    color: BODY,
  },

  // Signature Block Table
  signatureTable: {
    width: '100%',
    borderWidth: 0.5,
    borderColor: BORDER,
    marginTop: 8,
    marginBottom: 8,
  },
  signatureCol: {
    width: '50%',
    padding: 8,
  },
  signatureLine: {
    borderBottomWidth: 0.5,
    borderBottomColor: INK,
    marginVertical: 8,
    width: '90%',
  },
});

interface AgreementPdfDocumentProps {
  document: BookingDocumentData;
  logoSrc?: string;
  watermarkSrc?: string;
}

export const AgreementPdfDocument: React.FC<AgreementPdfDocumentProps> = ({
  document: doc,
  watermarkSrc = '/logo3.png',
}) => {
  const { client, booking, commercial, delivery, specialTerms, signatures } = doc;

  // Render bottom area containing initials (pages 2–6) and running footer
  const renderBottom = (pageNumber: string, showInitials = true) => (
    <View style={styles.bottomContainer} fixed>
      {showInitials && (
        <View style={styles.bottomInitialsRow}>
          <Text style={styles.initialText}>Client initials: _________</Text>
          <Text style={styles.initialText}>The House of Parva, Designated Partner: _________</Text>
        </View>
      )}
      <View style={styles.runningFooterLine}>
        <Text style={styles.footerText}>THE HOUSE OF PARVA | CLIENT SERVICE AGREEMENT</Text>
        <Text style={styles.footerText}>{pageNumber}</Text>
      </View>
    </View>
  );

  return (
    <Document
      title={`Agreement - ${client.name || 'Parva'}`}
      author="The House of Parva (OCEAN AND ORIGIN)"
      subject="Master Client Booking Agreement"
      keywords="Photography, Film, Contract, The House of Parva"
    >
      {/* PAGE 1: COVER */}
      <Page size="A4" style={styles.page}>
        <View style={styles.coverContainer}>
          <View>
            <Text style={styles.coverBrandHeader}>THE HOUSE OF PARVA</Text>
            <Text style={styles.coverTitle}>CLIENT SERVICE AGREEMENT</Text>
            <Text style={styles.coverSubtitle}>Photography & Filmmaking</Text>
          </View>

          <View style={{ alignItems: 'center' }}>
            {watermarkSrc && (
              <Image src={watermarkSrc} style={styles.watermarkImage} />
            )}
            <Text style={styles.coverTagline}>
              A clear agreement for the work, care and creative process behind your story.
            </Text>
          </View>

          <View style={{ width: '100%' }}>
            <View style={styles.coverSummaryBox}>
              <View style={[styles.coverSummaryCol, styles.coverSummaryColBorder]}>
                <Text style={styles.coverSummaryHeader}>Service Provider</Text>
                <Text style={[styles.coverSummaryText, { fontWeight: 'bold', color: INK }]}>OCEAN AND ORIGIN</Text>
                <Text style={styles.coverSummaryText}>Operating under The House of Parva</Text>
              </View>
              <View style={styles.coverSummaryCol}>
                <Text style={styles.coverSummaryHeader}>Client</Text>
                <Text style={styles.coverSummaryText}>Name: {client.name || '__________________________'}</Text>
                <Text style={styles.coverSummaryText}>Event / Shoot: {booking.eventType || '__________________________'}</Text>
              </View>
            </View>

            <Text style={styles.coverLocationFooter}>
              Bangalore, Karnataka • Worldwide assignments welcome
            </Text>
          </View>
        </View>

        {renderBottom('01', false)}
      </Page>

      {/* PAGE 2: SECTIONS 1 & 2 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>1. Parties & Booking Details</Text>
        <Text style={styles.paragraph}>{LEGAL_PREAMBLE}</Text>

        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Client name</Text>
            <Text style={styles.tableCellValue}>{client.name || '—'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Address</Text>
            <Text style={styles.tableCellValue}>{client.address || '—'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Phone</Text>
            <Text style={styles.tableCellValue}>{client.phone || '—'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Email</Text>
            <Text style={styles.tableCellValue}>{client.email || '—'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Event / Shoot</Text>
            <Text style={styles.tableCellValue}>{booking.eventType || '—'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Date(s)</Text>
            <Text style={styles.tableCellValue}>{formatDocumentDate(booking.eventDate)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Location(s)</Text>
            <Text style={styles.tableCellValue}>{booking.location || '—'}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Package / Services</Text>
            <Text style={styles.tableCellValue}>{doc.services.packageName || 'Standard Creative Coverage'}</Text>
          </View>
          <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.tableCellLabel}>Agreement date</Text>
            <Text style={styles.tableCellValue}>{formatDocumentDate(booking.bookingDate)}</Text>
          </View>
        </View>

        <Text style={[styles.paragraph, { marginBottom: 10 }]}>{SECTION_1_FOOTER}</Text>

        <Text style={styles.sectionTitle}>2. Services, Deliverables & Creative Approach</Text>
        <Text style={styles.paragraph}>{SECTION_2_TEXT.intro}</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Coverage & deliverables. </Text>
          {SECTION_2_TEXT.coverage.replace('Coverage & deliverables. ', '')}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Creative approach. </Text>
          {SECTION_2_TEXT.creativeApproach.replace('Creative approach. ', '')}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Additional work. </Text>
          {SECTION_2_TEXT.additionalWork.replace('Additional work. ', '')}
        </Text>

        <Text style={styles.subSectionTitle}>Revisions</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Photography: </Text>
          up to two (2) rounds of reasonable revisions to the delivered photographic selection and editing. These may include colour, exposure, cropping or minor editing adjustments. They do not include a complete re-edit, a substantially different editing style, replacement of Parva’s artistic selection, addition of photographs outside the agreed selection, or substantial alteration/recreation of photographs.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Films: </Text>
          one (1) round of reasonable revisions to the delivered film, such as reasonable changes to editing, sequencing, text, music or similar elements where technically and creatively feasible. It does not include completely recreating or restructuring the film or changing the agreed creative direction.
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Revision window: </Text>
          all revision requests must be submitted together and in writing within 7 days of delivery. Requests after this period may be treated as final approval. Additional revision rounds may be charged separately.
        </Text>

        {renderBottom('02')}
      </Page>

      {/* PAGE 3: SECTION 3 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>3. Fees, Payment & Booking Confirmation</Text>
        <Text style={styles.paragraph}>{SECTION_3_TEXT.intro}</Text>

        <View style={styles.tableContainer}>
          <View style={styles.milestoneRow}>
            <Text style={styles.milestonePct}>50% • Booking advance</Text>
            <Text style={styles.milestoneCondition}>Payable at booking to reserve the agreed date(s).</Text>
          </View>
          <View style={styles.milestoneRow}>
            <Text style={styles.milestonePct}>30% • Pre-event payment</Text>
            <Text style={styles.milestoneCondition}>Payable before the event / shoot, on the date stated in the Booking Schedule or invoice.</Text>
          </View>
          <View style={[styles.milestoneRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.milestonePct}>20% • Final payment</Text>
            <Text style={styles.milestoneCondition}>Payable before release of the final deliverables.</Text>
          </View>
        </View>

        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Booking confirmation. </Text>
          {SECTION_3_TEXT.bookingConfirmation.replace('Booking confirmation. ', '')}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Payment methods. </Text>
          {SECTION_3_TEXT.paymentMethods.replace('Payment methods. ', '')}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Final payment and release of work. </Text>
          {SECTION_3_TEXT.releaseOfWork.replace('Final payment and release of work. ', '')}
        </Text>
        <Text style={styles.paragraph}>{SECTION_3_TEXT.previewsNote}</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Late payment. </Text>
          {SECTION_3_TEXT.latePayment.replace('Late payment. ', '')}
        </Text>
        <Text style={styles.paragraph}>
          <Text style={styles.clauseBold}>Additional charges. </Text>
          {SECTION_3_TEXT.additionalCharges.replace('Additional charges. ', '')}
        </Text>

        <Text style={[styles.subSectionTitle, { marginTop: 8 }]}>BOOKING SCHEDULE / COMMERCIAL SUMMARY</Text>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>Total agreed fee</Text>
            <Text style={styles.tableCellValue}>{formatPdfINR(commercial.totalFee)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>50% advance received</Text>
            <Text style={styles.tableCellValue}>{formatPdfINR(commercial.bookingAdvance)}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>30% due by</Text>
            <Text style={styles.tableCellValue}>{formatDocumentDate(commercial.preEventDueDate, '7 days prior to event')}</Text>
          </View>
          <View style={styles.tableRow}>
            <Text style={styles.tableCellLabel}>20% due before final delivery</Text>
            <Text style={styles.tableCellValue}>{formatDocumentDate(commercial.finalDueDate, 'Before release of final deliverables')}</Text>
          </View>
          <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
            <Text style={styles.tableCellLabel}>Invoice / reference</Text>
            <Text style={[styles.tableCellValue, { fontFamily: 'Courier' }]}>{commercial.invoiceReference || 'INV-2026'}</Text>
          </View>
        </View>

        {renderBottom('03')}
      </Page>

      {/* PAGE 4: SECTION 4 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>4. Cancellation, Rescheduling & Unforeseen Circumstances</Text>

        <Text style={styles.subSectionTitle}>Client cancellation</Text>
        <Text style={styles.paragraph}>{SECTION_4_TEXT.clientCancellation.replace('Client cancellation. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Rescheduling</Text>
        <Text style={styles.paragraph}>{SECTION_4_TEXT.rescheduling.replace('Rescheduling. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Service Provider or team emergency</Text>
        <Text style={styles.paragraph}>{SECTION_4_TEXT.emergency.replace('Service Provider or team emergency. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Force majeure</Text>
        <Text style={styles.paragraph}>{SECTION_4_TEXT.forceMajeure.replace('Force majeure. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Service Provider cancellation</Text>
        <Text style={styles.paragraph}>{SECTION_4_TEXT.providerCancellation.replace('Service Provider cancellation. ', '')}</Text>

        {renderBottom('04')}
      </Page>

      {/* PAGE 5: SECTION 5 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>5. Event, Client & Team Responsibilities</Text>

        <Text style={styles.subSectionTitle}>Parva responsibilities</Text>
        <Text style={styles.paragraph}>{SECTION_5_TEXT.parvaResponsibilities.replace('Parva responsibilities. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Client responsibilities</Text>
        <Text style={styles.paragraph}>{SECTION_5_TEXT.clientResponsibilities.replace('Client responsibilities. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Timings, delays & additional coverage</Text>
        <Text style={styles.paragraph}>{SECTION_5_TEXT.timingsDelays.replace('Timings, delays & additional coverage. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Venue and event restrictions</Text>
        <Text style={styles.paragraph}>{SECTION_5_TEXT.venueRestrictions.replace('Venue and event restrictions. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Client & guest conduct</Text>
        <Text style={styles.paragraph}>{SECTION_5_TEXT.conduct.replace('Client & guest conduct. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Travel & accommodation</Text>
        <Text style={styles.paragraph}>{SECTION_5_TEXT.travelAccommodation.replace('Travel & accommodation. ', '')}</Text>

        {renderBottom('05')}
      </Page>

      {/* PAGE 6: SECTION 6 & 7 */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>6. Delivery, Albums & Data</Text>

        <Text style={styles.subSectionTitle}>Delivery</Text>
        <Text style={styles.paragraph}>
          {delivery.expectedTimeline ? `Final deliverables will be provided within ${delivery.expectedTimeline}. ` : ''}
          {SECTION_6_TEXT.delivery.replace('Delivery. ', '')}
        </Text>

        <Text style={styles.subSectionTitle}>RAW and unedited files</Text>
        <Text style={styles.paragraph}>{SECTION_6_TEXT.rawFiles.replace('RAW and unedited files. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Albums & physical products</Text>
        <Text style={styles.paragraph}>{SECTION_6_TEXT.albums.replace('Albums & physical products. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Data protection & backup</Text>
        <Text style={styles.paragraph}>{SECTION_6_TEXT.dataProtection.replace('Data protection & backup. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Archival</Text>
        <Text style={styles.paragraph}>{SECTION_6_TEXT.archival.replace('Archival. ', '')}</Text>

        <Text style={[styles.sectionTitle, { marginTop: 8 }]}>7. Copyright, Privacy & Portfolio Usage</Text>

        <Text style={styles.subSectionTitle}>Copyright & client use</Text>
        <Text style={styles.paragraph}>{SECTION_7_TEXT.copyright.replace('Copyright & client use. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Portfolio & promotional usage</Text>
        <Text style={styles.paragraph}>{SECTION_7_TEXT.portfolio.replace('Portfolio & promotional usage. ', '')}</Text>

        <Text style={styles.subSectionTitle}>Client opt-out</Text>
        <Text style={styles.paragraph}>{SECTION_7_TEXT.optOut.replace('Client opt-out. ', '')}</Text>

        {renderBottom('06')}
      </Page>

      {/* PAGE 7: PRIVACY, SPECIAL TERMS, SECTION 8 & SIGNATURES (FINAL) */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.denseSubSectionTitle}>Privacy</Text>
        <Text style={[styles.denseParagraph, { marginBottom: 6 }]}>{SECTION_7_TEXT.privacy.replace('Privacy. ', '')}</Text>

        {specialTerms.text ? (
          <View style={{ marginBottom: 6 }}>
            <Text style={[styles.sectionTitle, { marginTop: 2, marginBottom: 4 }]}>Special Terms & Booking Rider</Text>
            <View style={[styles.tableContainer, { padding: 8, backgroundColor: IVORY, marginVertical: 4 }]}>
              <Text style={[styles.denseParagraph, { fontFamily: 'Parva Serif', fontStyle: 'italic', marginBottom: 0 }]}>
                {specialTerms.text}
              </Text>
            </View>
          </View>
        ) : null}

        <Text style={[styles.sectionTitle, { marginTop: 2, marginBottom: 4 }]}>8. General Terms</Text>

        <Text style={styles.denseSubSectionTitle}>Entire agreement</Text>
        <Text style={styles.denseParagraph}>{SECTION_8_TEXT.entireAgreement.replace('Entire agreement. ', '')}</Text>

        <Text style={styles.denseSubSectionTitle}>Changes</Text>
        <Text style={styles.denseParagraph}>{SECTION_8_TEXT.changes.replace('Changes. ', '')}</Text>

        <Text style={styles.denseSubSectionTitle}>Communication</Text>
        <Text style={styles.denseParagraph}>{SECTION_8_TEXT.communication.replace('Communication. ', '')}</Text>

        <Text style={styles.denseSubSectionTitle}>Liability</Text>
        <Text style={styles.denseParagraph}>{SECTION_8_TEXT.liability.replace('Liability. ', '')}</Text>

        <Text style={styles.denseSubSectionTitle}>Governing law</Text>
        <Text style={styles.denseParagraph}>{SECTION_8_TEXT.governingLaw.replace('Governing law. ', '')}</Text>

        <Text style={styles.denseSubSectionTitle}>Execution</Text>
        <Text style={styles.denseParagraph}>{SECTION_8_TEXT.execution.replace('Execution. ', '')}</Text>

        <Text style={[styles.denseParagraph, { marginTop: 4, fontWeight: 'bold' }]}>
          {SECTION_8_TEXT.confirmationStatement}
        </Text>

        <Text style={[styles.sectionTitle, { marginTop: 6, marginBottom: 0 }]}>Signatures</Text>

        {/* Signature Block Table */}
        <View style={styles.signatureTable} wrap={false}>
          <View style={{ flexDirection: 'row' }}>
            {/* Service Provider Block */}
            <View style={[styles.signatureCol, { borderRightWidth: 0.5, borderRightColor: BORDER }]}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: WINE, marginBottom: 2 }}>
                FOR OCEAN AND ORIGIN
              </Text>
              <Text style={{ fontSize: 8, color: MUTED, marginBottom: 8 }}>The House of Parva (Designated Partner)</Text>

              <Text style={{ fontSize: 8, color: MUTED }}>Signature:</Text>
              <View style={styles.signatureLine} />

              <Text style={{ fontSize: 8, color: INK, marginBottom: 3 }}>
                Name: {signatures.representativeName || 'Designated Partner'}
              </Text>
              <Text style={{ fontSize: 8, color: INK, marginBottom: 3 }}>
                Date: {formatDocumentDate(signatures.representativeSignatureDate, '_______________________')}
              </Text>
              <Text style={{ fontSize: 8, color: MUTED }}>
                Phone / Email: hello@thehouseofparva.in
              </Text>
            </View>

            {/* Client Block */}
            <View style={styles.signatureCol}>
              <Text style={{ fontSize: 8.5, fontWeight: 'bold', color: WINE, marginBottom: 2 }}>
                CLIENT
              </Text>
              <Text style={{ fontSize: 8, color: MUTED, marginBottom: 8 }}>Authorized Representative / Client</Text>

              <Text style={{ fontSize: 8, color: MUTED }}>Signature:</Text>
              <View style={styles.signatureLine} />

              <Text style={{ fontSize: 8, color: INK, marginBottom: 3 }}>
                Name: {signatures.clientName || client.name || '_______________________'}
              </Text>
              <Text style={{ fontSize: 8, color: INK, marginBottom: 3 }}>
                Date: {formatDocumentDate(signatures.clientSignatureDate, '_______________________')}
              </Text>
              <Text style={{ fontSize: 8, color: MUTED }}>
                Phone / Email: {client.phone || '_______________________'}
              </Text>
            </View>
          </View>
        </View>

        {renderBottom('07', false)}
      </Page>

      {/* PAGE 8: CLOSE */}
      <Page size="A4" style={styles.page}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 9.5, fontFamily: 'Parva Serif', fontStyle: 'italic', textAlign: 'center', color: WINE }}>
            Thank you for trusting us with your story.
          </Text>
          <Text style={{ fontSize: 8.5, textAlign: 'center', color: WINE, letterSpacing: 2, textTransform: 'uppercase', marginTop: 10 }}>
            THE HOUSE OF PARVA • PHOTOGRAPHY • FILMS • STORIES
          </Text>
        </View>

        {renderBottom('08', false)}
      </Page>
    </Document>
  );
};
