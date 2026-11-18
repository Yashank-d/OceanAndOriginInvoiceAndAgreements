import React from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  User, 
  CreditCard, 
  ShieldCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { BookingDocumentData, ValidationResult } from '../../types/document';
import { formatINR } from '../../utils/calculations';

interface ReviewSummaryStepProps {
  document: BookingDocumentData;
  validation: ValidationResult;
  onNavigateStep: (stepIndex: number) => void;
  onProceedToPreview?: () => void;
}

export const ReviewSummaryStep: React.FC<ReviewSummaryStepProps> = ({
  document,
  validation,
  onNavigateStep,
  onProceedToPreview,
}) => {
  return (
    <div className="space-y-8">
      <div className="border-b border-[#EAE3D9] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg font-serif font-medium text-[#221F20]">Review Agreement Configuration</h3>
          <p className="text-xs text-[#78716C] mt-1">
            Verify all variable data before proceeding to Agreement Preview & PDF generation.
          </p>
        </div>

        {onProceedToPreview && (
          <button
            onClick={onProceedToPreview}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] transition-all shadow-xs shrink-0"
          >
            <span>Preview & Generate PDF</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Validation Banner */}
      <div className={`p-4 rounded-xl border flex items-center justify-between flex-wrap gap-3 ${
        validation.isValid 
          ? 'bg-emerald-50/80 border-emerald-200 text-emerald-900' 
          : 'bg-amber-50/80 border-amber-200 text-amber-900'
      }`}>
        <div className="flex items-center gap-2.5">
          {validation.isValid ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
          )}
          <div>
            <p className="text-xs font-semibold">
              {validation.isValid ? 'Form Ready for Preview & Export' : `Missing Required Fields (${validation.errors.length})`}
            </p>
            <p className="text-[11px] opacity-85">
              {validation.isValid 
                ? 'All mandatory legal and commercial constraints are satisfied.' 
                : validation.errors.map(e => e.message).join(' • ')
              }
            </p>
          </div>
        </div>
        {!validation.isValid && (
          <button
            onClick={() => onNavigateStep(0)}
            className="text-xs font-semibold text-amber-900 underline hover:no-underline"
          >
            Fix Required Fields
          </button>
        )}
      </div>

      {/* Summary Matrix Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Client & Booking Summary */}
        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
            <span className="text-xs font-semibold text-[#581825] uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Parties & Assignment</span>
            </span>
            <button 
              onClick={() => onNavigateStep(0)}
              className="text-[11px] font-semibold text-[#581825] hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div>
              <span className="text-[#78716C]">Client:</span>
              <p className="font-semibold text-[#221F20] mt-0.5">{document.client.name || 'Not provided'}</p>
            </div>
            <div>
              <span className="text-[#78716C]">Contact:</span>
              <p className="text-[#4A4646]">{document.client.phone} {document.client.email && `• ${document.client.email}`}</p>
            </div>
            <div>
              <span className="text-[#78716C]">Event / Shoot:</span>
              <p className="font-semibold text-[#221F20] mt-0.5">{document.booking.eventType}</p>
            </div>
            <div>
              <span className="text-[#78716C]">Date & Venue:</span>
              <p className="text-[#4A4646]">{document.booking.eventDate} at {document.booking.location}</p>
            </div>
          </div>
        </div>

        {/* Commercial Summary */}
        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
            <span className="text-xs font-semibold text-[#581825] uppercase tracking-wider flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              <span>Commercial Structure</span>
            </span>
            <button 
              onClick={() => onNavigateStep(3)}
              className="text-[11px] font-semibold text-[#581825] hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-[#F5EFEB]">
              <span className="text-[#78716C]">Total Agreed Fee:</span>
              <span className="font-semibold text-[#581825] text-sm">{formatINR(document.commercial.totalFee)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#78716C]">50% Advance Booking:</span>
              <span className="font-medium text-[#221F20]">{formatINR(document.commercial.bookingAdvance)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#78716C]">30% Pre-Event Payment:</span>
              <span className="font-medium text-[#221F20]">{formatINR(document.commercial.preEventPayment)}</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#78716C]">20% Final Deliverables:</span>
              <span className="font-medium text-[#221F20]">{formatINR(document.commercial.finalPayment)}</span>
            </div>
            {document.commercial.additionalCharges.length > 0 && (
              <div className="flex justify-between py-1 text-[11px] text-[#78716C]">
                <span>Additional Charges ({document.commercial.additionalCharges.length}):</span>
                <span>+{formatINR(document.commercial.additionalCharges.reduce((a, c) => a + c.amount, 0))}</span>
              </div>
            )}
          </div>
        </div>

        {/* Scope & Deliverables */}
        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
            <span className="text-xs font-semibold text-[#581825] uppercase tracking-wider flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>Services & Deliverables</span>
            </span>
            <button 
              onClick={() => onNavigateStep(2)}
              className="text-[11px] font-semibold text-[#581825] hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <p className="font-medium text-[#221F20]">Package: {document.services.packageName}</p>
            <p className="text-[11px] text-[#78716C]">{document.services.selectedServices.join(', ')}</p>
            <div className="pt-2 border-t border-[#F5EFEB]">
              <span className="text-[11px] font-semibold text-[#581825]">
                {document.deliverables.items.length} Agreed Deliverables
              </span>
              <ul className="mt-1 space-y-1 text-[11px] text-[#4A4646] list-disc list-inside">
                {document.deliverables.items.slice(0, 3).map((item, i) => (
                  <li key={i} className="truncate">{item}</li>
                ))}
                {document.deliverables.items.length > 3 && (
                  <li className="text-[#78716C] italic">+ {document.deliverables.items.length - 3} more items</li>
                )}
              </ul>
            </div>
          </div>
        </div>

        {/* Revisions & Signatures */}
        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-4">
          <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
            <span className="text-xs font-semibold text-[#581825] uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4" />
              <span>Terms & Archival</span>
            </span>
            <button 
              onClick={() => onNavigateStep(4)}
              className="text-[11px] font-semibold text-[#581825] hover:underline"
            >
              Edit
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="flex justify-between py-1">
              <span className="text-[#78716C]">Photography Revisions:</span>
              <span className="font-medium text-[#221F20]">{document.delivery.photographyRevisions} rounds</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#78716C]">Film Revisions:</span>
              <span className="font-medium text-[#221F20]">{document.delivery.filmRevisions} round</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-[#78716C]">Archival Retention:</span>
              <span className="font-medium text-[#221F20] text-right truncate max-w-[200px]">{document.delivery.archivalPeriod}</span>
            </div>
            <div className="pt-2 border-t border-[#F5EFEB]">
              <span className="text-[#78716C]">Signatories:</span>
              <p className="text-[11px] font-medium text-[#221F20] mt-0.5">
                {document.signatures.clientName || document.client.name} & {document.signatures.representativeName}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA */}
      <div className="p-6 rounded-xl bg-[#FAF2F4] border border-[#ECC7D0] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#581825] uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Generate Official Master Agreement</span>
          </div>
          <p className="text-xs text-[#78716C] leading-relaxed">
            Proceed to preview all 8 pages with exact Parva typography, running headers, and export your vector PDF.
          </p>
        </div>
        {onProceedToPreview && (
          <button
            onClick={onProceedToPreview}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] transition-all shadow-xs shrink-0"
          >
            <span>Proceed to Preview</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
