import React from 'react';
import { BookingDocumentData } from '../../types/document';
import { formatINR } from '../../utils/calculations';
import { formatDocumentDate } from '../../utils/formatters';
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

interface AgreementDocumentPreviewProps {
  document: BookingDocumentData;
}

export const AgreementDocumentPreview: React.FC<AgreementDocumentPreviewProps> = ({
  document: doc,
}) => {
  const { client, booking, commercial, delivery, specialTerms, signatures } = doc;

  const renderBottom = (pageStr: string, showInitials = true) => (
    <div className="mt-auto pt-4 print:pt-2">
      {showInitials && (
        <div className="flex justify-end gap-6 text-[10px] text-[#78716C] mb-2.5 print:mb-1.5">
          <span>Client initials: <span className="inline-block w-20 border-b border-[#78716C]"></span></span>
          <span>The House of Parva, Designated Partner: <span className="inline-block w-20 border-b border-[#78716C]"></span></span>
        </div>
      )}
      <div className="pt-3 border-t border-[#EAE3D9] flex justify-between text-[9px] text-[#8E867E] tracking-wider uppercase font-sans">
        <span>THE HOUSE OF PARVA | CLIENT SERVICE AGREEMENT</span>
        <span>{pageStr}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 print:space-y-0 print:m-0">
      {/* ========================================================================= */}
      {/* PAGE 1: COVER                                                             */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between print:border-none print:shadow-none print:p-12 print:page-break-after-always">
        <div className="text-center pt-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#581825] font-semibold">
            THE HOUSE OF PARVA
          </p>
          <h1 className="text-3xl font-serif text-[#581825] tracking-tight mt-3 mb-1">
            CLIENT SERVICE AGREEMENT
          </h1>
          <p className="text-xs text-[#78716C] tracking-wide">
            Photography & Filmmaking
          </p>
        </div>

        <div className="text-center my-auto py-12">
          <img
            src="/logo3.png"
            alt="The House of Parva Emblem"
            className="h-32 w-auto mx-auto opacity-35 object-contain mb-8"
          />
          <p className="text-sm font-serif italic text-[#581825] max-w-sm mx-auto leading-relaxed">
            A clear agreement for the work, care and creative process behind your story.
          </p>
        </div>

        <div>
          <div className="grid grid-cols-2 border border-[#D8CEBE] bg-[#FAF8F5] mb-6 divide-x divide-[#D8CEBE]">
            <div className="p-4 text-xs leading-relaxed">
              <p className="text-[10px] font-semibold uppercase text-[#581825] tracking-wider mb-1">Service Provider</p>
              <p className="font-semibold text-[#221F20]">OCEAN AND ORIGIN</p>
              <p className="text-[#4A4646]">Operating under The House of Parva</p>
            </div>
            <div className="p-4 text-xs leading-relaxed">
              <p className="text-[10px] font-semibold uppercase text-[#581825] tracking-wider mb-1">Client</p>
              <p className="text-[#221F20]"><span className="text-[#78716C]">Name:</span> {client.name || '_________________________'}</p>
              <p className="text-[#221F20]"><span className="text-[#78716C]">Event / Shoot:</span> {booking.eventType || '_________________________'}</p>
            </div>
          </div>

          <p className="text-center text-[10.5px] text-[#78716C] tracking-wide mb-6">
            Bangalore, Karnataka • Worldwide assignments welcome
          </p>

          {renderBottom('01', false)}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PAGE 2: SECTIONS 1 & 2                                                    */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between text-xs leading-relaxed text-[#221F20] print:border-none print:shadow-none print:p-12 print:page-break-after-always">
        <div>
          <h2 className="text-base font-serif font-semibold text-[#581825] mb-2">
            1. Parties & Booking Details
          </h2>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {LEGAL_PREAMBLE}
          </p>

          <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px] mb-4">
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Client name</div>
              <div className="col-span-8 px-3 py-1.5">{client.name || '—'}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Address</div>
              <div className="col-span-8 px-3 py-1.5">{client.address || '—'}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Phone</div>
              <div className="col-span-8 px-3 py-1.5">{client.phone || '—'}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Email</div>
              <div className="col-span-8 px-3 py-1.5">{client.email || '—'}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Event / Shoot</div>
              <div className="col-span-8 px-3 py-1.5">{booking.eventType || '—'}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Date(s)</div>
              <div className="col-span-8 px-3 py-1.5">{formatDocumentDate(booking.eventDate)}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Location(s)</div>
              <div className="col-span-8 px-3 py-1.5">{booking.location || '—'}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Package / Services</div>
              <div className="col-span-8 px-3 py-1.5">{doc.services.packageName || 'Standard Creative Coverage'}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Agreement date</div>
              <div className="col-span-8 px-3 py-1.5">{formatDocumentDate(booking.bookingDate)}</div>
            </div>
          </div>

          <p className="text-[11px] text-[#555] mb-6">
            {SECTION_1_FOOTER}
          </p>

          <h2 className="text-base font-serif font-semibold text-[#581825] mb-2">
            2. Services, Deliverables & Creative Approach
          </h2>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_2_TEXT.intro}
          </p>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            <strong className="text-[#221F20]">Coverage & deliverables. </strong>
            {SECTION_2_TEXT.coverage.replace('Coverage & deliverables. ', '')}
          </p>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            <strong className="text-[#221F20]">Creative approach. </strong>
            {SECTION_2_TEXT.creativeApproach.replace('Creative approach. ', '')}
          </p>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            <strong className="text-[#221F20]">Additional work. </strong>
            {SECTION_2_TEXT.additionalWork.replace('Additional work. ', '')}
          </p>

          <h3 className="text-xs font-serif font-semibold text-[#221F20] mb-2">Revisions</h3>
          <p className="text-[11px] text-[#4A4646] mb-2 text-justify">
            <strong className="text-[#221F20]">Photography: </strong>
            up to two (2) rounds of reasonable revisions to the delivered photographic selection and editing. These may include colour, exposure, cropping or minor editing adjustments. They do not include a complete re-edit, a substantially different editing style, replacement of Parva’s artistic selection, addition of photographs outside the agreed selection, or substantial alteration/recreation of photographs.
          </p>
          <p className="text-[11px] text-[#4A4646] mb-2 text-justify">
            <strong className="text-[#221F20]">Films: </strong>
            one (1) round of reasonable revisions to the delivered film, such as reasonable changes to editing, sequencing, text, music or similar elements where technically and creatively feasible. It does not include completely recreating or restructuring the film or changing the agreed creative direction.
          </p>
          <p className="text-[11px] text-[#4A4646] mb-2 text-justify">
            <strong className="text-[#221F20]">Revision window: </strong>
            all revision requests must be submitted together and in writing within 7 days of delivery. Requests after this period may be treated as final approval. Additional revision rounds may be charged separately.
          </p>
        </div>

        {renderBottom('02')}
      </div>

      {/* ========================================================================= */}
      {/* PAGE 3: SECTION 3                                                         */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between text-xs leading-relaxed text-[#221F20] print:border-none print:shadow-none print:p-12 print:page-break-after-always">
        <div>
          <h2 className="text-base font-serif font-semibold text-[#581825] mb-2">
            3. Fees, Payment & Booking Confirmation
          </h2>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_3_TEXT.intro}
          </p>

          <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px] mb-5">
            <div className="grid grid-cols-12 p-2.5">
              <div className="col-span-4 font-semibold text-[#581825]">50% • Booking advance</div>
              <div className="col-span-8 text-[#4A4646]">Payable at booking to reserve the agreed date(s).</div>
            </div>
            <div className="grid grid-cols-12 p-2.5">
              <div className="col-span-4 font-semibold text-[#581825]">30% • Pre-event payment</div>
              <div className="col-span-8 text-[#4A4646]">Payable before the event / shoot, on the date stated in the Booking Schedule or invoice.</div>
            </div>
            <div className="grid grid-cols-12 p-2.5">
              <div className="col-span-4 font-semibold text-[#581825]">20% • Final payment</div>
              <div className="col-span-8 text-[#4A4646]">Payable before release of the final deliverables.</div>
            </div>
          </div>

          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            <strong className="text-[#221F20]">Booking confirmation. </strong>
            {SECTION_3_TEXT.bookingConfirmation.replace('Booking confirmation. ', '')}
          </p>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            <strong className="text-[#221F20]">Payment methods. </strong>
            {SECTION_3_TEXT.paymentMethods.replace('Payment methods. ', '')}
          </p>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            <strong className="text-[#221F20]">Final payment and release of work. </strong>
            {SECTION_3_TEXT.releaseOfWork.replace('Final payment and release of work. ', '')}
          </p>
          <p className="text-[11.5px] text-[#555] mb-3 text-justify">
            {SECTION_3_TEXT.previewsNote}
          </p>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            <strong className="text-[#221F20]">Late payment. </strong>
            {SECTION_3_TEXT.latePayment.replace('Late payment. ', '')}
          </p>
          <p className="text-[11.5px] text-[#3D3A3A] mb-6 text-justify">
            <strong className="text-[#221F20]">Additional charges. </strong>
            {SECTION_3_TEXT.additionalCharges.replace('Additional charges. ', '')}
          </p>

          <h3 className="text-xs font-serif font-semibold text-[#221F20] uppercase tracking-wider mb-2">
            BOOKING SCHEDULE / COMMERCIAL SUMMARY
          </h3>
          <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px]">
            <div className="grid grid-cols-12">
              <div className="col-span-5 bg-[#FAF8F5] px-3 py-2 font-semibold text-[#581825] border-r border-[#EAE3D9]">Total agreed fee</div>
              <div className="col-span-7 px-3 py-2 font-medium">{formatINR(commercial.totalFee)}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-5 bg-[#FAF8F5] px-3 py-2 font-semibold text-[#581825] border-r border-[#EAE3D9]">50% advance received</div>
              <div className="col-span-7 px-3 py-2 font-medium">{formatINR(commercial.bookingAdvance)}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-5 bg-[#FAF8F5] px-3 py-2 font-semibold text-[#581825] border-r border-[#EAE3D9]">30% due by</div>
              <div className="col-span-7 px-3 py-2">{formatDocumentDate(commercial.preEventDueDate, '7 days prior to event')}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-5 bg-[#FAF8F5] px-3 py-2 font-semibold text-[#581825] border-r border-[#EAE3D9]">20% due before final delivery</div>
              <div className="col-span-7 px-3 py-2">{formatDocumentDate(commercial.finalDueDate, 'Before release of final deliverables')}</div>
            </div>
            <div className="grid grid-cols-12">
              <div className="col-span-5 bg-[#FAF8F5] px-3 py-2 font-semibold text-[#581825] border-r border-[#EAE3D9]">Invoice / reference</div>
              <div className="col-span-7 px-3 py-2 font-mono">{commercial.invoiceReference || 'INV-2026'}</div>
            </div>
          </div>
        </div>

        {renderBottom('03')}
      </div>

      {/* ========================================================================= */}
      {/* PAGE 4: SECTION 4                                                         */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between text-xs leading-relaxed text-[#221F20] print:border-none print:shadow-none print:p-12 print:page-break-after-always">
        <div>
          <h2 className="text-base font-serif font-semibold text-[#581825] mb-4">
            4. Cancellation, Rescheduling & Unforeseen Circumstances
          </h2>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Client cancellation</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_4_TEXT.clientCancellation.replace('Client cancellation. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Rescheduling</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_4_TEXT.rescheduling.replace('Rescheduling. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Service Provider or team emergency</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_4_TEXT.emergency.replace('Service Provider or team emergency. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Force majeure</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_4_TEXT.forceMajeure.replace('Force majeure. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Service Provider cancellation</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_4_TEXT.providerCancellation.replace('Service Provider cancellation. ', '')}
          </p>
        </div>

        {renderBottom('04')}
      </div>

      {/* ========================================================================= */}
      {/* PAGE 5: SECTION 5                                                         */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between text-xs leading-relaxed text-[#221F20] print:border-none print:shadow-none print:p-12 print:page-break-after-always">
        <div>
          <h2 className="text-base font-serif font-semibold text-[#581825] mb-4">
            5. Event, Client & Team Responsibilities
          </h2>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Parva responsibilities</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_5_TEXT.parvaResponsibilities.replace('Parva responsibilities. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Client responsibilities</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_5_TEXT.clientResponsibilities.replace('Client responsibilities. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Timings, delays & additional coverage</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_5_TEXT.timingsDelays.replace('Timings, delays & additional coverage. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Venue and event restrictions</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_5_TEXT.venueRestrictions.replace('Venue and event restrictions. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Client & guest conduct</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_5_TEXT.conduct.replace('Client & guest conduct. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Travel & accommodation</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_5_TEXT.travelAccommodation.replace('Travel & accommodation. ', '')}
          </p>
        </div>

        {renderBottom('05')}
      </div>

      {/* ========================================================================= */}
      {/* PAGE 6: SECTIONS 6 & 7                                                       */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between text-xs leading-relaxed text-[#221F20] print:border-none print:shadow-none print:p-12 print:page-break-after-always">
        <div>
          <h2 className="text-base font-serif font-semibold text-[#581825] mb-4">
            6. Delivery, Albums & Data
          </h2>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Delivery</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {delivery.expectedTimeline ? `Final deliverables will be provided within ${delivery.expectedTimeline}. ` : ''}
            {SECTION_6_TEXT.delivery.replace('Delivery. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">RAW and unedited files</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_6_TEXT.rawFiles.replace('RAW and unedited files. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Albums & physical products</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_6_TEXT.albums.replace('Albums & physical products. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Data protection & backup</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_6_TEXT.dataProtection.replace('Data protection & backup. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Archival</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-6 text-justify">
            {SECTION_6_TEXT.archival.replace('Archival. ', '')}
          </p>

          <h2 className="text-base font-serif font-semibold text-[#581825] mb-4">
            7. Copyright, Privacy & Portfolio Usage
          </h2>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Copyright & client use</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_7_TEXT.copyright.replace('Copyright & client use. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Portfolio & promotional usage</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_7_TEXT.portfolio.replace('Portfolio & promotional usage. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Client opt-out</h3>
          <p className="text-[11.5px] text-[#3D3A3A] text-justify">
            {SECTION_7_TEXT.optOut.replace('Client opt-out. ', '')}
          </p>
        </div>

        {renderBottom('06')}
      </div>

      {/* ========================================================================= */}
      {/* PAGE 7: PRIVACY, SPECIAL TERMS, SECTION 8 & SIGNATURES (FINAL)          */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between text-xs leading-relaxed text-[#221F20] print:border-none print:shadow-none print:p-12 print:page-break-after-always">
        <div>
          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Privacy</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-6 text-justify">
            {SECTION_7_TEXT.privacy.replace('Privacy. ', '')}
          </p>

          {specialTerms.text && (
            <div className="mb-8">
              <h2 className="text-base font-serif font-semibold text-[#581825] mb-3">
                Special Terms & Booking Rider
              </h2>
              <div className="p-4 rounded-lg bg-[#FAF8F5] border border-[#D8CEBE] text-[11.5px] font-serif italic text-[#333] leading-relaxed">
                {specialTerms.text}
              </div>
            </div>
          )}

          <h2 className="text-base font-serif font-semibold text-[#581825] mb-4">
            8. General Terms
          </h2>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Entire agreement</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_8_TEXT.entireAgreement.replace('Entire agreement. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Changes</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_8_TEXT.changes.replace('Changes. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Communication</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_8_TEXT.communication.replace('Communication. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Liability</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_8_TEXT.liability.replace('Liability. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Governing law</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-3 text-justify">
            {SECTION_8_TEXT.governingLaw.replace('Governing law. ', '')}
          </p>

          <h3 className="text-xs font-semibold text-[#221F20] mb-1">Execution</h3>
          <p className="text-[11.5px] text-[#3D3A3A] mb-4 text-justify">
            {SECTION_8_TEXT.execution.replace('Execution. ', '')}
          </p>

          <p className="text-[11.5px] text-[#221F20] font-semibold">
            {SECTION_8_TEXT.confirmationStatement}
          </p>

          <h2 className="text-base font-serif font-semibold text-[#581825] mt-4 mb-2">
            Signatures
          </h2>

          {/* Signature Block Table */}
          <div className="border border-[#D8CEBE] divide-x divide-[#D8CEBE] grid grid-cols-2 mt-2 mb-4">
            <div className="p-4 text-xs">
              <p className="font-semibold text-[#581825] uppercase tracking-wider text-[11px]">FOR OCEAN AND ORIGIN</p>
              <p className="text-[#78716C] mb-4">The House of Parva (Designated Partner)</p>

              <div className="mb-3">
                <span className="text-[#78716C] text-[11px]">Signature:</span>
                <div className="w-4/5 border-b border-[#221F20] mt-6 mb-3"></div>
              </div>

              <p className="text-[#221F20] mb-1"><span className="text-[#78716C]">Name:</span> {signatures.representativeName || 'Designated Partner'}</p>
              <p className="text-[#221F20] mb-1"><span className="text-[#78716C]">Date:</span> {formatDocumentDate(signatures.representativeSignatureDate, '_______________________')}</p>
              <p className="text-[#78716C] text-[10px] mt-2">Phone / Email: hello@thehouseofparva.in</p>
            </div>

            <div className="p-4 text-xs">
              <p className="font-semibold text-[#581825] uppercase tracking-wider text-[11px]">CLIENT</p>
              <p className="text-[#78716C] mb-4">Authorised Representative / Client</p>

              <div className="mb-3">
                <span className="text-[#78716C] text-[11px]">Signature:</span>
                <div className="w-4/5 border-b border-[#221F20] mt-6 mb-3"></div>
              </div>

              <p className="text-[#221F20] mb-1"><span className="text-[#78716C]">Name:</span> {signatures.clientName || client.name || '_______________________'}</p>
              <p className="text-[#221F20] mb-1"><span className="text-[#78716C]">Date:</span> {formatDocumentDate(signatures.clientSignatureDate, '_______________________')}</p>
              <p className="text-[#78716C] text-[10px] mt-2">Phone / Email: {client.phone || '_______________________'}</p>
            </div>
          </div>
        </div>

        {renderBottom('07', false)}
      </div>

      {/* ========================================================================= */}
      {/* PAGE 8: CLOSE                                                             */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-14 flex flex-col justify-between print:border-none print:shadow-none print:p-12">
        <div className="my-auto text-center">
          <p className="font-serif italic text-lg text-[#581825]">
            Thank you for trusting us with your story.
          </p>
          <p className="text-[11px] uppercase tracking-[0.25em] text-[#581825] font-semibold mt-4">
            THE HOUSE OF PARVA • PHOTOGRAPHY • FILMS • STORIES
          </p>
        </div>

        {renderBottom('08', false)}
      </div>
    </div>
  );
};
