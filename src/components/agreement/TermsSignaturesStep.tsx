import React from 'react';
import { FileText, PenTool, ShieldCheck, User } from 'lucide-react';
import { SpecialTermsData, SignaturesData } from '../../types/document';

interface TermsSignaturesStepProps {
  specialTerms: SpecialTermsData;
  signatures: SignaturesData;
  defaultClientName: string;
  onSpecialTermsChange: (patch: Partial<SpecialTermsData>) => void;
  onSignaturesChange: (patch: Partial<SignaturesData>) => void;
}

export const TermsSignaturesStep: React.FC<TermsSignaturesStepProps> = ({
  specialTerms,
  signatures,
  defaultClientName,
  onSpecialTermsChange,
  onSignaturesChange,
}) => {
  const activeClientName = signatures.clientName || defaultClientName;

  return (
    <div className="space-y-8">
      <div className="border-b border-[#EAE3D9] pb-4">
        <h3 className="text-lg font-serif font-medium text-[#221F20]">Special Terms & Execution</h3>
        <p className="text-xs text-[#78716C] mt-1">
          Specify customized booking riders and signatory details for both contracting parties.
        </p>
      </div>

      {/* Special Terms Free Text */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#581825]" />
            <span>Special Terms & Conditions (Optional Rider)</span>
          </label>
          <span className="text-[11px] text-[#78716C]">Overrides standard clauses where specified</span>
        </div>
        <textarea
          rows={4}
          value={specialTerms.text}
          onChange={(e) => onSpecialTermsChange({ text: e.target.value })}
          placeholder="Enter any booking-specific exceptions, special creative requests, NDA requirements, or payment customizations..."
          className="w-full p-3.5 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-xl focus:outline-none focus:border-[#581825] focus:bg-white transition-all leading-relaxed"
        />
        <div className="p-3 rounded-lg bg-white border border-[#EAE3D9] text-[11px] text-[#78716C]">
          <span className="font-semibold text-[#581825]">Standard Note: </span>
          By default, RAW/unedited/rejected/duplicate/test files are strictly excluded from deliverables. Creative composition, editing style, and color grading remain under Parva's editorial discretion.
        </div>
      </div>

      {/* Signatures & Execution Section */}
      <div className="space-y-4 pt-2">
        <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
          <PenTool className="w-4 h-4 text-[#581825]" />
          <span>Execution & Signature Details</span>
        </label>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Service Provider Block */}
          <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
              <span className="text-xs font-semibold text-[#581825]">SERVICE PROVIDER</span>
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
            </div>

            <div className="text-xs space-y-1">
              <p className="font-semibold text-[#221F20]">OCEAN AND ORIGIN</p>
              <p className="text-[11px] text-[#78716C]">Operating brand: The House of Parva</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-[#4A4646]">Authorised Signatory / Designated Partner</label>
              <input
                type="text"
                value={signatures.representativeName}
                onChange={(e) => onSignaturesChange({ representativeName: e.target.value })}
                placeholder="Designated Partner / Authorised Signatory"
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-[#4A4646]">Execution Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={signatures.representativeSignatureDate}
                  onChange={(e) => onSignaturesChange({ representativeSignatureDate: e.target.value })}
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
                />
              </div>
            </div>
          </div>

          {/* Client Signatory Block */}
          <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-4">
            <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
              <span className="text-xs font-semibold text-[#581825]">CLIENT SIGNATORY</span>
              <User className="w-4 h-4 text-[#78716C]" />
            </div>

            <div className="text-xs space-y-1">
              <p className="font-semibold text-[#221F20]">{activeClientName || 'Client Name Pending'}</p>
              <p className="text-[11px] text-[#78716C]">Primary Contracting Client</p>
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-[#4A4646]">Client Signatory Name</label>
              <input
                type="text"
                value={signatures.clientName}
                onChange={(e) => onSignaturesChange({ clientName: e.target.value })}
                placeholder={defaultClientName || 'e.g. Rohan Sharma'}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[11px] font-medium text-[#4A4646]">Signing Date</label>
              <input
                type="date"
                value={signatures.clientSignatureDate}
                onChange={(e) => onSignaturesChange({ clientSignatureDate: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
