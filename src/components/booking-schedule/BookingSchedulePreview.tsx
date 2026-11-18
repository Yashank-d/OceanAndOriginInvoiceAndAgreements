import React from 'react';
import { BookingDocumentData } from '../../types/document';
import { formatINR } from '../../utils/calculations';
import { formatDocumentDate } from '../../utils/formatters';

interface BookingSchedulePreviewProps {
  document: BookingDocumentData;
}

export const BookingSchedulePreview: React.FC<BookingSchedulePreviewProps> = ({
  document: doc,
}) => {
  const { client, booking, services, deliverables, commercial, delivery, specialTerms, signatures } = doc;

  const renderBottom = (pageStr: string, showInitials = true) => (
    <div className="mt-auto pt-4 print:pt-2">
      {showInitials && (
        <div className="flex justify-end gap-6 text-[10px] text-[#78716C] mb-2 print:mb-1">
          <span>Client initials: <span className="inline-block w-16 border-b border-[#78716C]"></span></span>
          <span>The House of Parva, Designated Partner: <span className="inline-block w-16 border-b border-[#78716C]"></span></span>
        </div>
      )}
      <div className="pt-2 border-t border-[#EAE3D9] flex justify-between text-[9px] text-[#8E867E] tracking-wider uppercase font-sans">
        <span>THE HOUSE OF PARVA | BOOKING SCHEDULE</span>
        <span>{pageStr}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8 print:space-y-0 print:m-0">
      {/* ========================================================================= */}
      {/* PAGE 1: CLIENT, ITINERARY, SERVICES, DELIVERABLES                         */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-12 flex flex-col justify-between text-xs text-[#221F20] leading-relaxed print:border-none print:shadow-none print:p-10 print:page-break-after-always">
        <div>
          {/* Header Banner */}
          <div className="border-b border-[#581825] pb-3 mb-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#581825]">THE HOUSE OF PARVA</p>
                <h1 className="text-2xl font-serif text-[#581825] tracking-tight mt-1">BOOKING SCHEDULE</h1>
                <p className="text-xs text-[#78716C]">Service Specification & Production Itinerary</p>
              </div>
              <img src="/logo2.png" alt="Parva" className="h-10 w-auto object-contain" />
            </div>

            <div className="flex items-center justify-between bg-[#FAF8F5] border border-[#EAE3D9] px-3 py-1.5 rounded mt-3 text-[11px] font-medium text-[#581825]">
              <span>ID: {booking.bookingId || 'PARVA-2026-084'}</span>
              <span>DATE: {formatDocumentDate(booking.bookingDate)}</span>
              <span>ENTITY: OCEAN AND ORIGIN</span>
            </div>
          </div>

          {/* 1. Client Details */}
          <div className="mb-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              1. Client Information
            </h2>
            <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px]">
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Client Name(s)</div>
                <div className="col-span-8 px-3 py-1.5 font-medium">{client.name || '—'}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Contact Phone</div>
                <div className="col-span-8 px-3 py-1.5">{client.phone || '—'}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Email Address</div>
                <div className="col-span-8 px-3 py-1.5">{client.email || '—'}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Residence / Address</div>
                <div className="col-span-8 px-3 py-1.5">{client.address || '—'}</div>
              </div>
            </div>
          </div>

          {/* 2. Assignment & Itinerary */}
          <div className="mb-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              2. Assignment & Itinerary
            </h2>
            <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px]">
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Event / Shoot Type</div>
                <div className="col-span-8 px-3 py-1.5 font-medium">{booking.eventType || '—'}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Event Date(s)</div>
                <div className="col-span-8 px-3 py-1.5">{formatDocumentDate(booking.eventDate)}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Venue / Location</div>
                <div className="col-span-8 px-3 py-1.5">{booking.location || '—'}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Operational Timings</div>
                <div className="col-span-8 px-3 py-1.5">{booking.coverageStart || '08:00 AM'} to {booking.coverageEnd || '10:00 PM'}</div>
              </div>
            </div>
          </div>

          {/* 3. Services & Creative Scope */}
          <div className="mb-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              3. Services & Creative Scope
            </h2>
            <div className="bg-[#FAF8F5] p-3 rounded border border-[#EAE3D9] mb-2 text-xs">
              <p className="font-semibold text-[#581825]">Package: {services.packageName}</p>
              <p className="text-[11px] text-[#78716C] mt-0.5">Crew Details: {services.teamDetails}</p>
            </div>
            <ul className="space-y-1 text-xs text-[#333] pl-2">
              {services.selectedServices.map((s, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#581825]"></span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Deliverables Specification */}
          <div className="mb-4">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              4. Agreed Deliverables
            </h2>
            <ul className="space-y-1.5 text-xs text-[#333] pl-2">
              {deliverables.items.map((d, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#581825] mt-1.5 flex-shrink-0"></span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {renderBottom('01')}
      </div>

      {/* ========================================================================= */}
      {/* PAGE 2: FEES, TRAVEL, REVISIONS, RIDERS & CONFIRMATION                     */}
      {/* ========================================================================= */}
      <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-12 flex flex-col justify-between text-xs text-[#221F20] leading-relaxed print:border-none print:shadow-none print:p-10 print:page-break-after-always">
        <div>
          {/* 5. Commercial Schedule */}
          <div className="mb-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              5. Fees & Commercial Milestones
            </h2>

            <div className="grid grid-cols-3 gap-3 my-2.5">
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#D8CEBE]">
                <p className="text-[10px] font-semibold text-[#581825]">50% ADVANCE</p>
                <p className="text-sm font-serif font-semibold text-[#221F20] mt-0.5">{formatINR(commercial.bookingAdvance)}</p>
                <p className="text-[10px] text-[#78716C] mt-0.5">{formatDocumentDate(commercial.advanceDueDate, 'At booking confirmation')}</p>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#D8CEBE]">
                <p className="text-[10px] font-semibold text-[#581825]">30% PRE-EVENT</p>
                <p className="text-sm font-serif font-semibold text-[#221F20] mt-0.5">{formatINR(commercial.preEventPayment)}</p>
                <p className="text-[10px] text-[#78716C] mt-0.5">{formatDocumentDate(commercial.preEventDueDate, 'Prior to event shoot')}</p>
              </div>
              <div className="p-2.5 rounded bg-[#FAF8F5] border border-[#D8CEBE]">
                <p className="text-[10px] font-semibold text-[#581825]">20% FINAL</p>
                <p className="text-sm font-serif font-semibold text-[#221F20] mt-0.5">{formatINR(commercial.finalPayment)}</p>
                <p className="text-[10px] text-[#78716C] mt-0.5">{formatDocumentDate(commercial.finalDueDate, 'Before release of files')}</p>
              </div>
            </div>

            <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px]">
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Total Agreed Fee</div>
                <div className="col-span-8 px-3 py-1.5 font-semibold text-[#581825]">{formatINR(commercial.totalFee)}</div>
              </div>
              {commercial.additionalCharges.length > 0 && (
                <div className="grid grid-cols-12">
                  <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Additional Charges</div>
                  <div className="col-span-8 px-3 py-1.5">
                    {commercial.additionalCharges.map(c => `${c.description} (${formatINR(c.amount)})`).join(' • ')}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Invoice Reference</div>
                <div className="col-span-8 px-3 py-1.5 font-mono">{commercial.invoiceReference || 'INV-2026-084'}</div>
              </div>
            </div>
          </div>

          {/* 6. Travel & Accommodation */}
          <div className="mb-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              6. Travel & Accommodation
            </h2>
            <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px]">
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Package Status</div>
                <div className="col-span-8 px-3 py-1.5 font-medium">
                  {commercial.travelAccommodation.included ? 'Included in total agreed fee' : 'Not included (Billed at actuals)'}
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Arrangement Details</div>
                <div className="col-span-8 px-3 py-1.5">{commercial.travelAccommodation.details || 'Local Bangalore venue travel included.'}</div>
              </div>
            </div>
          </div>

          {/* 7. Delivery & Revisions */}
          <div className="mb-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              7. Delivery Timelines & Retention
            </h2>
            <div className="border border-[#D8CEBE] divide-y divide-[#EAE3D9] text-[11px]">
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Expected Delivery</div>
                <div className="col-span-8 px-3 py-1.5">{delivery.expectedTimeline || '4 to 6 weeks from selection'}</div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Revision Limits</div>
                <div className="col-span-8 px-3 py-1.5">
                  Photography: {delivery.photographyRevisions} rounds • Film: {delivery.filmRevisions} round (7-day window)
                </div>
              </div>
              <div className="grid grid-cols-12">
                <div className="col-span-4 bg-[#FAF8F5] px-3 py-1.5 font-semibold text-[#581825] border-r border-[#EAE3D9]">Archival Retention</div>
                <div className="col-span-8 px-3 py-1.5">{delivery.archivalPeriod}</div>
              </div>
            </div>
          </div>

          {/* 8. Special Terms */}
          {specialTerms.text && (
            <div className="mb-5">
              <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
                8. Special Terms & Riders
              </h2>
              <div className="p-3 bg-[#FAF8F5] border border-[#D8CEBE] rounded text-[11px] font-serif italic text-[#333]">
                {specialTerms.text}
              </div>
            </div>
          )}

          {/* 9. Confirmation & Signatures */}
          <div className="mb-4">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-1.5 border-b border-[#D8CEBE] pb-1">
              9. Confirmation & Authorisation
            </h2>
            <p className="text-[10.5px] text-[#78716C] mb-2">
              By signing below, both parties confirm the scope, deliverables, and payment schedule set forth in this document.
            </p>

            <div className="border border-[#D8CEBE] divide-x divide-[#D8CEBE] grid grid-cols-2">
              <div className="p-4 text-xs">
                <p className="font-semibold text-[#581825] text-[10.5px] uppercase">FOR OCEAN AND ORIGIN</p>
                <p className="text-[#78716C] text-[10px] mb-6">The House of Parva (Designated Partner)</p>
                <span className="text-[#78716C] text-[10px]">Signature:</span>
                <div className="w-4/5 border-b border-[#221F20] mt-6 mb-3"></div>
                <p className="text-[#221F20] text-[11px]"><span className="text-[#78716C]">Name:</span> {signatures.representativeName || 'Designated Partner'}</p>
                <p className="text-[#221F20] text-[11px]"><span className="text-[#78716C]">Date:</span> {formatDocumentDate(signatures.representativeSignatureDate, '________________')}</p>
              </div>

              <div className="p-4 text-xs">
                <p className="font-semibold text-[#581825] text-[10.5px] uppercase">CLIENT</p>
                <p className="text-[#78716C] text-[10px] mb-6">Authorised Signatory / Client</p>
                <span className="text-[#78716C] text-[10px]">Signature:</span>
                <div className="w-4/5 border-b border-[#221F20] mt-6 mb-3"></div>
                <p className="text-[#221F20] text-[11px]"><span className="text-[#78716C]">Name:</span> {signatures.clientName || client.name || '________________'}</p>
                <p className="text-[#221F20] text-[11px]"><span className="text-[#78716C]">Date:</span> {formatDocumentDate(signatures.clientSignatureDate, '________________')}</p>
              </div>
            </div>
          </div>
        </div>

        {renderBottom('02', false)}
      </div>
    </div>
  );
};
