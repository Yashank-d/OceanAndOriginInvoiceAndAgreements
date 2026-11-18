import React from 'react';
import { QuoteDocumentData } from '../../types/quote';
import { formatINR } from '../../utils/calculations';
import { formatDocumentDate } from '../../utils/formatters';
import { getStoredCompanyProfile } from '../../utils/defaults';

interface QuoteDocumentPreviewProps {
  quote: QuoteDocumentData;
}

export const QuoteDocumentPreview: React.FC<QuoteDocumentPreviewProps> = ({ quote }) => {
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
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-10 sm:p-12 flex flex-col justify-between text-xs text-[#221F20] leading-relaxed print:border-none print:shadow-none print:p-8">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between pb-6 border-b border-[#D8CEBE]">
          <div>
            <span className="text-[10px] tracking-[0.25em] uppercase font-semibold text-[#581825] font-sans">
              OCEAN & ORIGIN • {brand.toUpperCase()}
            </span>
            <h1 className="text-2xl font-serif text-[#221F20] mt-1 font-bold">
              COMMERCIAL ESTIMATE
            </h1>
            <p className="text-xs text-[#78716C] mt-0.5">
              Photography • Cinematography • Visual Production
            </p>
          </div>

          <div className="text-right">
            <img
              src="/logo2.png"
              alt="The House of Parva"
              className="h-10 w-auto object-contain ml-auto mb-1.5"
            />
            <p className="text-[10px] font-semibold text-[#581825]">{company.legalEntity}</p>
            <p className="text-[9.5px] text-[#78716C]">{company.email} • {company.phones[0]}</p>
          </div>
        </div>

        {/* Metadata Ribbon */}
        <div className="mt-4 bg-[#FAF8F5] border border-[#E7DFD5] rounded px-4 py-2 flex items-center justify-between text-[11px]">
          <div>
            <span className="text-[#78716C]">Quotation No:</span>{' '}
            <span className="font-mono font-bold text-[#581825]">{quoteNumber || 'QT-2026-084'}</span>
          </div>
          <div>
            <span className="text-[#78716C]">Date:</span>{' '}
            <span className="font-medium text-[#221F20]">{formatDocumentDate(quoteDate)}</span>
          </div>
          <div>
            <span className="text-[#78716C]">Valid Until:</span>{' '}
            <span className="font-medium text-[#581825]">{formatDocumentDate(validUntil)}</span>
          </div>
        </div>

        {/* Client & Assignment Information */}
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="p-3.5 rounded bg-[#FAF8F5] border border-[#EAE3D9] space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#581825]">
              Prepared For
            </p>
            <p className="text-sm font-serif font-bold text-[#221F20]">{client.name || 'Valued Client'}</p>
            <p className="text-[11px] text-[#4A4646]">{client.phone || 'Phone not specified'}</p>
            <p className="text-[11px] text-[#4A4646]">{client.email || 'Email not specified'}</p>
          </div>

          <div className="p-3.5 rounded bg-[#FAF8F5] border border-[#EAE3D9] space-y-1">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-[#581825]">
              Assignment Details
            </p>
            <p className="text-xs font-semibold text-[#221F20]">
              Event: <span className="font-normal">{client.eventType || 'Event / Shoot'}</span>
            </p>
            <p className="text-xs font-semibold text-[#221F20]">
              Date(s): <span className="font-normal">{client.eventDate ? formatDocumentDate(client.eventDate) : 'Dates to be confirmed'}</span>
            </p>
            <p className="text-xs font-semibold text-[#221F20]">
              Venue: <span className="font-normal">{client.location || 'Bengaluru Venue'}</span>
            </p>
          </div>
        </div>

        {/* Selected Package Details */}
        {selectedTier && (
          <div className="mt-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-2 border-b border-[#D8CEBE] pb-1">
              1. Base Package & Production Scope
            </h2>

            <div className="p-3.5 rounded border border-[#D8CEBE] bg-[#FAF8F5]">
              <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#581825]">
                    {selectedTier.name}
                  </h3>
                  <p className="text-[11px] text-[#78716C] mt-0.5">
                    Coverage: {selectedTier.coverage} • Crew: {selectedTier.crew}
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-serif font-bold text-[#221F20]">
                    {formatINR(basePrice)}
                  </span>
                </div>
              </div>

              {/* Deliverables List */}
              <div className="mt-2.5">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#78716C] mb-1.5">
                  Included Deliverables:
                </p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-[#333]">
                  {selectedTier.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#581825] font-bold">•</span>
                      <span>{item}</span>
                    </div>
                  ))}
                  {customDeliverables.map((item, idx) => (
                    <div key={`c-${idx}`} className="flex items-start gap-1.5 font-medium text-[#581825]">
                      <span>+</span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add-ons and Line Items */}
        {lineItems.length > 0 && (
          <div className="mt-5">
            <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-2 border-b border-[#D8CEBE] pb-1">
              2. Additional Services & Deliverables
            </h2>

            <table className="w-full border-collapse border border-[#D8CEBE] text-[11px]">
              <thead>
                <tr className="bg-[#FAF8F5] text-[#581825] border-b border-[#D8CEBE]">
                  <th className="py-1.5 px-3 text-left font-semibold">Service / Deliverable</th>
                  <th className="py-1.5 px-3 text-center font-semibold w-16">Qty</th>
                  <th className="py-1.5 px-3 text-right font-semibold w-24">Rate</th>
                  <th className="py-1.5 px-3 text-right font-semibold w-28">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EAE3D9]">
                {lineItems.map((item) => (
                  <tr key={item.id}>
                    <td className="py-1.5 px-3">
                      <span className="font-medium text-[#221F20]">{item.name}</span>
                      {item.description && (
                        <p className="text-[10px] text-[#78716C]">{item.description}</p>
                      )}
                    </td>
                    <td className="py-1.5 px-3 text-center font-mono">{item.quantity}</td>
                    <td className="py-1.5 px-3 text-right font-mono">{formatINR(item.unitPrice)}</td>
                    <td className="py-1.5 px-3 text-right font-mono font-medium text-[#221F20]">
                      {formatINR(item.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Commercial Investment Summary */}
        <div className="mt-5">
          <h2 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider mb-2 border-b border-[#D8CEBE] pb-1">
            3. Commercial Investment Summary
          </h2>

          <div className="border border-[#D8CEBE] rounded p-3.5 bg-[#FAF8F5] flex flex-col sm:flex-row justify-between gap-4">
            <div className="space-y-1.5 text-[11px] text-[#4A4646]">
              <p className="font-semibold text-[#581825] text-xs">Recommended Commercial Terms</p>
              <p>• <strong>50% Booking Advance:</strong> {formatINR(advance)} (to lock the production dates)</p>
              <p>• <strong>30% Pre-Event Payment:</strong> {formatINR(preEvent)} (prior to event day)</p>
              <p>• <strong>20% Final Balance:</strong> {formatINR(finalBal)} (before release of final files)</p>
              <p className="text-[10px] text-[#78716C] pt-1">
                GST is currently not charged. Travel outside Bengaluru is billed at actuals.
              </p>
            </div>

            <div className="w-full sm:w-60 border-t sm:border-t-0 sm:border-l border-[#D8CEBE] sm:pl-4 pt-3 sm:pt-0 space-y-1.5 text-xs">
              <div className="flex justify-between text-[#78716C]">
                <span>Base Package:</span>
                <span className="font-mono">{formatINR(basePrice)}</span>
              </div>
              {addonsTotal > 0 && (
                <div className="flex justify-between text-[#78716C]">
                  <span>Add-ons Total:</span>
                  <span className="font-mono">{formatINR(addonsTotal)}</span>
                </div>
              )}
              {discountAmount && discountAmount > 0 ? (
                <div className="flex justify-between text-[#16a34a] font-medium">
                  <span>Special Courtesy Discount:</span>
                  <span className="font-mono">- {formatINR(discountAmount)}</span>
                </div>
              ) : null}
              <div className="pt-2 border-t border-[#D8CEBE] flex justify-between font-serif font-bold text-sm text-[#581825]">
                <span>Total Investment:</span>
                <span>{formatINR(finalTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Notes & Riders */}
        {specialNotes && (
          <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#E7DFD5] rounded text-[11px] text-[#4A4646]">
            <p className="font-semibold text-[#581825] text-[10px] uppercase mb-0.5">Notes & Custom Riders</p>
            <p className="italic">{specialNotes}</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-[#D8CEBE] flex flex-col sm:flex-row items-center justify-between text-[9.5px] text-[#78716C]">
        <div>
          <span className="font-semibold text-[#581825]">{company.legalEntity}</span>
          <span className="mx-2">•</span>
          <span>{company.address.line1}, {company.address.city} {company.address.pincode}</span>
        </div>
        <div className="mt-1 sm:mt-0 font-medium">
          <span>{company.email}</span>
          <span className="mx-2">•</span>
          <span>{company.website}</span>
        </div>
      </div>
    </div>
  );
};
