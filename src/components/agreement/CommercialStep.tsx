import React, { useState } from 'react';
import { 
  Calculator, 
  Plus, 
  Trash2, 
  Plane, 
  AlertCircle,
  FileText
} from 'lucide-react';
import { CommercialData } from '../../types/document';
import { formatINR } from '../../utils/calculations';

interface CommercialStepProps {
  commercial: CommercialData;
  onChange: (patch: Partial<CommercialData>, autoRecalculate?: boolean) => void;
  errors: Record<string, string>;
}

export const CommercialStep: React.FC<CommercialStepProps> = ({
  commercial,
  onChange,
  errors,
}) => {
  const [chargeDesc, setChargeDesc] = useState('');
  const [chargeAmount, setChargeAmount] = useState<number | ''>('');

  const handleAddCharge = () => {
    if (!chargeDesc.trim() || !chargeAmount || chargeAmount <= 0) return;
    const newCharge = {
      id: `chg-${Date.now()}`,
      description: chargeDesc.trim(),
      amount: Number(chargeAmount),
    };
    onChange({
      additionalCharges: [...commercial.additionalCharges, newCharge],
    });
    setChargeDesc('');
    setChargeAmount('');
  };

  const handleRemoveCharge = (id: string) => {
    onChange({
      additionalCharges: commercial.additionalCharges.filter((c) => c.id !== id),
    });
  };

  const milestoneSum = 
    commercial.bookingAdvance + 
    commercial.preEventPayment + 
    commercial.finalPayment;

  const isMilestoneMatching = Math.abs(milestoneSum - commercial.totalFee) <= 1;

  return (
    <div className="space-y-8">
      <div className="border-b border-[#EAE3D9] pb-4">
        <h3 className="text-lg font-serif font-medium text-[#221F20]">Fees, Payment & Commercial Structure</h3>
        <p className="text-xs text-[#78716C] mt-1">
          Define the total fee, default 50% / 30% / 20% payment milestones, and travel/extra provisions.
        </p>
      </div>

      {/* Total Fee & Milestone Breakdown Card */}
      <div className="bg-[#FAF8F5] border border-[#E7DFD5] rounded-xl p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
              Total Agreed Fee (₹) <span className="text-[#581825]">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#581825] font-semibold text-sm">
                ₹
              </div>
              <input
                type="number"
                min="0"
                step="1000"
                value={commercial.totalFee || ''}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  onChange({ totalFee: val }, true);
                }}
                className={`w-full pl-8 pr-3 py-2.5 text-base font-semibold bg-white border rounded-lg focus:outline-none transition-all ${
                  errors['commercial.totalFee'] 
                    ? 'border-red-400 focus:border-red-600' 
                    : 'border-[#D8CEBE] focus:border-[#581825]'
                }`}
                placeholder="250000"
              />
            </div>
            {errors['commercial.totalFee'] && (
              <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>{errors['commercial.totalFee']}</span>
              </p>
            )}
          </div>

          <div className="p-3 rounded-lg bg-white border border-[#EAE3D9] flex items-center justify-between">
            <div className="text-xs text-[#78716C]">
              <span>Agreed Fee In Words:</span>
              <p className="text-sm font-semibold text-[#581825] mt-0.5">
                {formatINR(commercial.totalFee)}
              </p>
            </div>
            <span className="text-[11px] px-2 py-0.5 rounded bg-[#FAF2F4] text-[#581825] font-semibold">
              Fixed Structure
            </span>
          </div>
        </div>

        {/* Milestone Calculation Cards */}
        <div className="space-y-3 pt-2 border-t border-[#EAE3D9]">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
              <Calculator className="w-4 h-4 text-[#581825]" />
              <span>Standard 50% / 30% / 20% Milestones</span>
            </label>
            <span className="text-[11px] text-[#78716C]">Automated Deterministic Breakdown</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 50% Advance */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD5] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#581825]">50% Advance</span>
                <span className="text-[10px] text-[#78716C]">At Booking</span>
              </div>
              <p className="text-lg font-serif font-medium text-[#221F20]">
                {formatINR(commercial.bookingAdvance)}
              </p>
              <div className="pt-2 border-t border-[#F5EFEB]">
                <label className="block text-[10px] text-[#78716C] mb-1">Due Date / Condition</label>
                <input
                  type="text"
                  value={commercial.advanceDueDate || ''}
                  onChange={(e) => onChange({ advanceDueDate: e.target.value }, false)}
                  placeholder="Upon signing agreement"
                  className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded focus:outline-none focus:border-[#581825]"
                />
              </div>
            </div>

            {/* 30% Pre-Event */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD5] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#581825]">30% Pre-Event</span>
                <span className="text-[10px] text-[#78716C]">Prior to Shoot</span>
              </div>
              <p className="text-lg font-serif font-medium text-[#221F20]">
                {formatINR(commercial.preEventPayment)}
              </p>
              <div className="pt-2 border-t border-[#F5EFEB]">
                <label className="block text-[10px] text-[#78716C] mb-1">Due Date / Condition</label>
                <input
                  type="text"
                  value={commercial.preEventDueDate || ''}
                  onChange={(e) => onChange({ preEventDueDate: e.target.value }, false)}
                  placeholder="7 days prior to event"
                  className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded focus:outline-none focus:border-[#581825]"
                />
              </div>
            </div>

            {/* 20% Final */}
            <div className="p-4 rounded-xl bg-white border border-[#E7DFD5] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#581825]">20% Final Payment</span>
                <span className="text-[10px] text-[#78716C]">Before Delivery</span>
              </div>
              <p className="text-lg font-serif font-medium text-[#221F20]">
                {formatINR(commercial.finalPayment)}
              </p>
              <div className="pt-2 border-t border-[#F5EFEB]">
                <label className="block text-[10px] text-[#78716C] mb-1">Due Date / Condition</label>
                <input
                  type="text"
                  value={commercial.finalDueDate || ''}
                  onChange={(e) => onChange({ finalDueDate: e.target.value }, false)}
                  placeholder="Before release of final deliverables"
                  className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded focus:outline-none focus:border-[#581825]"
                />
              </div>
            </div>
          </div>

          {!isMilestoneMatching && (
            <p className="text-xs text-red-600 flex items-center gap-1.5 pt-1">
              <AlertCircle className="w-4 h-4" />
              <span>Milestone sum ({formatINR(milestoneSum)}) does not match Total Fee ({formatINR(commercial.totalFee)}).</span>
            </p>
          )}
        </div>
      </div>

      {/* Additional Charges & Invoice Ref */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Additional Charges */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
            <Plus className="w-4 h-4 text-[#581825]" />
            <span>Additional Charges ({commercial.additionalCharges.length})</span>
          </label>

          <div className="flex gap-2">
            <input
              type="text"
              value={chargeDesc}
              onChange={(e) => setChargeDesc(e.target.value)}
              placeholder="Description (e.g. Drone pilot)"
              className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
            <input
              type="number"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Amount (₹)"
              className="w-28 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
            <button
              type="button"
              onClick={handleAddCharge}
              className="px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] text-[#581825] rounded-lg hover:bg-[#F3EDE5] text-xs font-medium"
            >
              Add
            </button>
          </div>

          <div className="divide-y divide-[#F5EFEB] border border-[#EAE3D9] rounded-lg bg-white overflow-hidden">
            {commercial.additionalCharges.length === 0 ? (
              <p className="text-xs text-[#78716C] p-3 text-center italic">No additional charges.</p>
            ) : (
              commercial.additionalCharges.map((chg) => (
                <div key={chg.id} className="flex items-center justify-between px-3.5 py-2 text-xs">
                  <span className="text-[#221F20]">{chg.description}</span>
                  <div className="flex items-center gap-3">
                    <span className="font-semibold text-[#581825]">{formatINR(chg.amount)}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCharge(chg.id)}
                      className="text-[#78716C] hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Invoice Reference & Payment Meta */}
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#581825]" />
            <span>Invoice Reference / Cross-Link</span>
          </label>

          <div className="space-y-1.5">
            <label className="block text-[11px] text-[#78716C]">Referenced Invoice Number</label>
            <input
              type="text"
              value={commercial.invoiceReference || ''}
              onChange={(e) => onChange({ invoiceReference: e.target.value }, false)}
              placeholder="e.g. INV-2026-084"
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
            />
          </div>

          <div className="p-3.5 rounded-lg bg-[#FAF8F5] border border-[#EAE3D9] text-xs text-[#4A4646] space-y-1">
            <p className="font-semibold text-[#581825]">Standard Payment Methods:</p>
            <p className="text-[11px] text-[#78716C]">
              NEFT / RTGS / IMPS Bank Transfer, UPI, or Official Company Cheque to OCEAN AND ORIGIN.
            </p>
          </div>
        </div>
      </div>

      {/* Travel & Accommodation Section */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
          <Plane className="w-4 h-4 text-[#581825]" />
          <span>Travel & Accommodation Policy</span>
        </label>

        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="travelIncluded"
              checked={commercial.travelAccommodation.included}
              onChange={(e) => onChange({
                travelAccommodation: {
                  ...commercial.travelAccommodation,
                  included: e.target.checked,
                }
              }, false)}
              className="w-4 h-4 rounded text-[#581825] focus:ring-[#581825]"
            />
            <label htmlFor="travelIncluded" className="text-xs font-semibold text-[#221F20] cursor-pointer">
              Travel & accommodation included in standard package fee
            </label>
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] text-[#78716C]">Policy Details / Specifics</label>
            <input
              type="text"
              value={commercial.travelAccommodation.details}
              onChange={(e) => onChange({
                travelAccommodation: {
                  ...commercial.travelAccommodation,
                  details: e.target.value,
                }
              }, false)}
              placeholder="e.g. Local Bangalore travel included. Outstation flights and hotel billed at actuals."
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
