import React, { useMemo } from 'react';
import { InvoiceDocumentData } from '../../types/document';
import { calculateInvoiceTotals, calculateMilestoneSchedule, formatINR } from '../../utils/calculations';
import { getStoredCompanyProfile } from '../../utils/defaults';
import { formatDocumentDate } from '../../utils/formatters';

interface InvoiceDocumentPreviewProps {
  invoice: InvoiceDocumentData;
}

export const InvoiceDocumentPreview: React.FC<InvoiceDocumentPreviewProps> = ({ invoice }) => {
  const company = getStoredCompanyProfile();
  const bank = invoice.bankDetails || company.bankDetails;

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
    notes
  } = invoice;

  const schedule = useMemo(
    () =>
      calculateMilestoneSchedule({
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
      }),
    [invoice],
  );

  const totals = calculateInvoiceTotals({
    lineItems,
    additionalCharges: commercial.additionalCharges,
    discount,
    taxEnabled,
    taxRate,
    amountPaid: schedule.totalPaid,
  });

  const paymentStatus = schedule.status;

  const getStatusBadge = () => {
    switch (paymentStatus) {
      case 'Paid':
        return (
          <span className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-300">
            PAID
          </span>
        );
      case 'Partially Paid':
        return (
          <span className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-sky-100 text-sky-800 border border-sky-300">
            PARTIALLY PAID
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 rounded-md text-xs font-semibold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
            UNPAID
          </span>
        );
    }
  };

  return (
    <div className="w-[210mm] min-h-[297mm] mx-auto bg-white border border-[#E7DFD5] shadow-md p-12 flex flex-col justify-between text-xs text-[#221F20] leading-relaxed print:border-none print:shadow-none print:p-10 print:min-h-0 print:h-auto">
      <div>
        {/* Header */}
        <div className="border-b-2 border-[#581825] pb-4 mb-4 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo2.png" alt="Parva" className="h-12 w-auto object-contain" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#581825]">THE HOUSE OF PARVA</p>
              <h2 className="text-sm font-semibold text-[#221F20]">OCEAN AND ORIGIN</h2>
              <p className="text-[11px] text-[#78716C]">Fine-Art Wedding Photography & Cinematic Films</p>
            </div>
          </div>

          <div className="text-right">
            <h1 className="text-2xl font-serif font-bold text-[#581825] tracking-tight">
              {taxEnabled ? 'TAX INVOICE' : 'INVOICE'}
            </h1>
            <div className="mt-1 flex justify-end">
              {getStatusBadge()}
            </div>
          </div>
        </div>

        {/* Metadata Ribbon */}
        <div className="grid grid-cols-4 gap-2 bg-[#FAF8F5] border border-[#EAE3D9] p-3 rounded mb-5 text-xs">
          <div>
            <span className="block text-[10px] uppercase text-[#78716C] font-semibold">Invoice No</span>
            <span className="font-mono font-bold text-[#581825] text-sm">{invoiceNumber || 'INV-2026'}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-[#78716C] font-semibold">Invoice Date</span>
            <span className="font-medium text-[#221F20]">{formatDocumentDate(invoiceDate)}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-[#78716C] font-semibold">Due Date</span>
            <span className="font-medium text-[#221F20]">{formatDocumentDate(dueDate)}</span>
          </div>
          <div>
            <span className="block text-[10px] uppercase text-[#78716C] font-semibold">Booking ID</span>
            <span className="font-mono text-[#221F20]">{booking.bookingId || '—'}</span>
          </div>
        </div>

        {/* Parties Grid: Issued By & Bill To */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div className="border border-[#D8CEBE] rounded p-3 text-[11px]">
            <h3 className="text-xs font-serif font-bold text-[#581825] uppercase tracking-wider border-b border-[#EAE3D9] pb-1 mb-2">
              Issued By
            </h3>
            <p className="font-bold text-[#221F20]">{company.legalEntity}</p>
            <p className="text-[#4A4646]">{company.operatingBrand}</p>
            <p className="text-[#4A4646]">{company.address.line1}, {company.address.line2}</p>
            <p className="text-[#4A4646]">{company.address.city}, {company.address.state} {company.address.pincode}</p>
            <p className="text-[#78716C] mt-1">{company.email} • {company.phones.join(' • ')}</p>
          </div>

          <div className="border border-[#D8CEBE] rounded p-3 text-[11px]">
            <h3 className="text-xs font-serif font-bold text-[#581825] uppercase tracking-wider border-b border-[#EAE3D9] pb-1 mb-2">
              Bill To (Client)
            </h3>
            <p className="font-bold text-[#221F20] text-xs">{client.name || 'Valued Client'}</p>
            <p className="text-[#4A4646]">{client.address || 'Address not specified'}</p>
            <p className="text-[#78716C] mt-0.5">Phone: {client.phone || '—'}</p>
            <p className="text-[#78716C]">Email: {client.email || '—'}</p>
            {booking.eventType && (
              <p className="text-[#581825] font-medium mt-0.5">Assignment: {booking.eventType}</p>
            )}
          </div>
        </div>

        {/* Services & Line Items Table */}
        <div className="border border-[#D8CEBE] rounded overflow-hidden mb-5">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF8F5] border-b border-[#D8CEBE] text-[10.5px] uppercase tracking-wider text-[#581825]">
                <th className="py-2 px-3 w-10 text-center">#</th>
                <th className="py-2 px-3">Description / Service Specification</th>
                <th className="py-2 px-3 w-16 text-right">Qty</th>
                <th className="py-2 px-3 w-28 text-right">Rate</th>
                <th className="py-2 px-3 w-28 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D9] text-[11px]">
              {lineItems.map((item, idx) => (
                <tr key={item.id || idx}>
                  <td className="py-2 px-3 text-center text-[#78716C]">{idx + 1}</td>
                  <td className="py-2 px-3 font-medium text-[#221F20]">{item.description}</td>
                  <td className="py-2 px-3 text-right">{item.quantity}</td>
                  <td className="py-2 px-3 text-right">{formatINR(item.rate)}</td>
                  <td className="py-2 px-3 text-right font-semibold text-[#221F20]">{formatINR(item.amount)}</td>
                </tr>
              ))}

              {commercial.additionalCharges && commercial.additionalCharges.map((charge, idx) => (
                <tr key={charge.id || `charge-${idx}`} className="bg-[#FCFBF9]">
                  <td className="py-2 px-3 text-center text-[#78716C]">{lineItems.length + idx + 1}</td>
                  <td className="py-2 px-3 text-[#221F20]">Additional: {charge.description}</td>
                  <td className="py-2 px-3 text-right">1</td>
                  <td className="py-2 px-3 text-right">{formatINR(charge.amount)}</td>
                  <td className="py-2 px-3 text-right font-semibold text-[#221F20]">{formatINR(charge.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Split: Bank Details & Totals Breakdown */}
        <div className="grid grid-cols-12 gap-5 mb-5">
          {/* Left: Bank Information */}
          <div className="col-span-7 bg-[#FAF8F5] border border-[#D8CEBE] rounded p-3.5 text-xs flex flex-col justify-between">
            <div>
              <h3 className="font-serif font-bold text-xs text-[#581825] uppercase tracking-wider border-b border-[#EAE3D9] pb-1 mb-2">
                Bank & Remittance Details
              </h3>
              <div className="space-y-1 text-[11px]">
                <div className="flex">
                  <span className="w-28 text-[#78716C] font-semibold">Beneficiary:</span>
                  <span className="font-medium text-[#221F20]">{bank.beneficiaryName}</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-[#78716C] font-semibold">Bank Name:</span>
                  <span className="font-medium text-[#221F20]">{bank.bankName}</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-[#78716C] font-semibold">Account No:</span>
                  <span className="font-mono font-bold text-[#221F20]">{bank.accountNumber}</span>
                </div>
                <div className="flex">
                  <span className="w-28 text-[#78716C] font-semibold">IFSC Code:</span>
                  <span className="font-mono font-bold text-[#221F20]">{bank.ifscCode}</span>
                </div>
                {bank.branch && (
                  <div className="flex">
                    <span className="w-28 text-[#78716C] font-semibold">Branch:</span>
                    <span className="text-[#221F20]">{bank.branch}</span>
                  </div>
                )}
                {bank.upiId && (
                  <div className="flex">
                    <span className="w-28 text-[#78716C] font-semibold">UPI ID:</span>
                    <span className="font-mono text-[#221F20]">{bank.upiId}</span>
                  </div>
                )}
                <div className="flex">
                  <span className="w-28 text-[#78716C] font-semibold">Payment Method:</span>
                  <span className="text-[#221F20]">{paymentMethod || 'Bank Transfer (NEFT/RTGS)'}</span>
                </div>
              </div>
            </div>

            <div className="mt-2 pt-2 border-t border-[#EAE3D9] text-[10.5px] text-[#78716C]">
              Please quote <strong className="text-[#581825]">{invoiceNumber || 'INV-2026'}</strong> in transaction remarks.
            </div>
          </div>

          {/* Right: Totals Breakdown */}
          <div className="col-span-5 border border-[#D8CEBE] rounded overflow-hidden text-xs">
            <div className="divide-y divide-[#EAE3D9] text-[11px]">
              <div className="flex justify-between py-1.5 px-3">
                <span className="text-[#78716C]">Services Subtotal</span>
                <span className="font-medium">{formatINR(totals.itemsSubtotal)}</span>
              </div>

              {totals.additionalChargesSubtotal > 0 && (
                <div className="flex justify-between py-1.5 px-3">
                  <span className="text-[#78716C]">Additional Charges</span>
                  <span className="font-medium">{formatINR(totals.additionalChargesSubtotal)}</span>
                </div>
              )}

              {totals.discount > 0 && (
                <div className="flex justify-between py-1.5 px-3 text-red-700 font-medium">
                  <span>Discount</span>
                  <span>- {formatINR(totals.discount)}</span>
                </div>
              )}

              {totals.taxEnabled && (
                <div className="flex justify-between py-1.5 px-3">
                  <span className="text-[#78716C]">GST ({totals.taxRate}%)</span>
                  <span className="font-medium">{formatINR(totals.taxAmount)}</span>
                </div>
              )}

              <div className="flex justify-between py-2 px-3 bg-[#581825] text-white font-serif font-bold text-sm">
                <span>TOTAL</span>
                <span>{formatINR(totals.totalAmount)}</span>
              </div>

              <div className="flex justify-between py-1.5 px-3">
                <span className="text-[#78716C]">Amount Paid</span>
                <span className="font-semibold text-emerald-800">{formatINR(totals.amountPaid)}</span>
              </div>

              <div className="flex justify-between py-2 px-3 bg-[#FAF8F5] text-[#581825] font-bold text-xs">
                <span>BALANCE DUE</span>
                <span>{formatINR(totals.balanceDue)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Schedule: Advance / Pre-event / Final */}
        <div className="border border-[#D8CEBE] rounded overflow-hidden mb-5">
          <div className="bg-[#FAF8F5] border-b border-[#D8CEBE] px-3 py-1.5 text-[10.5px] uppercase tracking-wider font-semibold text-[#581825]">
            Payment Schedule — 50 / 30 / 20
          </div>
          <table className="w-full text-left text-[11px]">
            <thead>
              <tr className="border-b border-[#EAE3D9] text-[10px] uppercase tracking-wider text-[#78716C]">
                <th className="py-1.5 px-3">Milestone</th>
                <th className="py-1.5 px-3">Due date</th>
                <th className="py-1.5 px-3 text-right">Due</th>
                <th className="py-1.5 px-3 text-right">Received</th>
                <th className="py-1.5 px-3 text-right">Balance</th>
                <th className="py-1.5 px-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE3D9]">
              {schedule.rows.map((row) => (
                <tr key={row.key}>
                  <td className="py-1.5 px-3 font-medium text-[#221F20]">
                    {row.pct}% {row.label}
                  </td>
                  <td className="py-1.5 px-3 text-[#78716C]">{formatDocumentDate(row.dueDate)}</td>
                  <td className="py-1.5 px-3 text-right">{formatINR(row.due)}</td>
                  <td className="py-1.5 px-3 text-right font-medium text-emerald-800">{formatINR(row.paid)}</td>
                  <td className="py-1.5 px-3 text-right font-semibold text-[#581825]">{formatINR(row.balance)}</td>
                  <td className="py-1.5 px-3 text-right">
                    <span className={`inline-block px-1.5 py-px rounded text-[10px] font-semibold ${
                      row.isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-50 text-amber-800'
                    }`}>
                      {row.isPaid ? 'Paid' : 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Notes & Terms Box */}
        <div className="border border-[#EAE3D9] rounded p-2.5 bg-[#FFFFFF] text-[10.5px] text-[#666666]">
          <p className="font-semibold text-[#581825] uppercase text-[10px] mb-0.5">Notes & Terms:</p>
          <p>{notes || 'All payments should be remitted to the designated account of OCEAN AND ORIGIN. Deliverables will be released upon full payment of balance due.'}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[#D8CEBE] pt-3 mt-4 flex items-center justify-between text-[10px] text-[#8E867E]">
        <span>{company.legalEntity} • {company.address.line2}, {company.address.city} • {company.email} • {company.phones.join(' • ')} • {company.website}</span>
        <span className="font-semibold uppercase tracking-wider text-[#581825]">THE HOUSE OF PARVA</span>
      </div>
    </div>
  );
};
