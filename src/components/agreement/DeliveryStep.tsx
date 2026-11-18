import React from 'react';
import { Clock, Archive, AlertCircle } from 'lucide-react';
import { DeliveryData } from '../../types/document';

interface DeliveryStepProps {
  delivery: DeliveryData;
  onChange: (patch: Partial<DeliveryData>) => void;
}

export const DeliveryStep: React.FC<DeliveryStepProps> = ({ delivery, onChange }) => {
  return (
    <div className="space-y-8">
      <div className="border-b border-[#EAE3D9] pb-4">
        <h3 className="text-lg font-serif font-medium text-[#221F20]">Delivery, Revisions & Archival</h3>
        <p className="text-xs text-[#78716C] mt-1">
          Configure production timelines, revision limits, and data retention policies according to the Parva standard.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Timeline */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Expected Delivery Timeline
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Clock className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={delivery.expectedTimeline}
              onChange={(e) => onChange({ expectedTimeline: e.target.value })}
              placeholder="e.g. 4 to 6 weeks from photograph selection"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all"
            />
          </div>
          <p className="text-[11px] text-[#78716C]">
            Preliminary teasers or sample previews do not constitute final deliverable delivery.
          </p>
        </div>

        {/* Photography Revisions */}
        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
              Photography Revisions
            </label>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF2F4] text-[#581825] font-semibold">
              Spec Default: 2
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              max="5"
              value={delivery.photographyRevisions}
              onChange={(e) => onChange({ photographyRevisions: Number(e.target.value) })}
              className="w-20 px-3 py-2 text-sm font-semibold bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
            <span className="text-xs text-[#78716C]">rounds of reasonable editing adjustments</span>
          </div>
          <p className="text-[11px] text-[#78716C] leading-relaxed">
            Includes color, exposure, or minor cropping. Does not include complete re-edits or changing agreed artistic style.
          </p>
        </div>

        {/* Film Revisions */}
        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-3">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
              Film Revisions
            </label>
            <span className="text-[10px] px-2 py-0.5 rounded bg-[#FAF2F4] text-[#581825] font-semibold">
              Spec Default: 1
            </span>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min="0"
              max="3"
              value={delivery.filmRevisions}
              onChange={(e) => onChange({ filmRevisions: Number(e.target.value) })}
              className="w-20 px-3 py-2 text-sm font-semibold bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
            <span className="text-xs text-[#78716C]">round of reasonable edit adjustments</span>
          </div>
          <p className="text-[11px] text-[#78716C] leading-relaxed">
            Reasonable adjustments to sequencing, titling, or music. Does not include complete restructuring or re-shooting.
          </p>
        </div>

        {/* Archival Duration */}
        <div className="p-5 rounded-xl bg-white border border-[#E7DFD5] space-y-3 md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
              <Archive className="w-4 h-4 text-[#581825]" />
              <span>Data Retention & Archival Period</span>
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => onChange({ archivalPeriod: '3 months for smaller shoots/events' })}
              className={`p-3 rounded-lg border text-left transition-all ${
                delivery.archivalPeriod.includes('3 months')
                  ? 'bg-[#FAF2F4] border-[#581825] text-[#581825]'
                  : 'bg-[#FAF8F5] border-[#D8CEBE] text-[#4A4646] hover:bg-[#F3EDE5]'
              }`}
            >
              <p className="text-xs font-semibold">3 Months (Standard Shoot / Event)</p>
              <p className="text-[10px] text-[#78716C] mt-0.5">Portraits, fashion, single-day sessions</p>
            </button>

            <button
              type="button"
              onClick={() => onChange({ archivalPeriod: '3 months for smaller shoots/events, 6 months for weddings and larger productions' })}
              className={`p-3 rounded-lg border text-left transition-all ${
                delivery.archivalPeriod.includes('6 months')
                  ? 'bg-[#FAF2F4] border-[#581825] text-[#581825]'
                  : 'bg-[#FAF8F5] border-[#D8CEBE] text-[#4A4646] hover:bg-[#F3EDE5]'
              }`}
            >
              <p className="text-xs font-semibold">6 Months (Weddings / Large Productions)</p>
              <p className="text-[10px] text-[#78716C] mt-0.5">Comprehensive multi-day wedding stories</p>
            </button>
          </div>

          <div className="pt-2">
            <label className="block text-[11px] text-[#78716C] mb-1">Custom Archival Term Note</label>
            <input
              type="text"
              value={delivery.archivalPeriod}
              onChange={(e) => onChange({ archivalPeriod: e.target.value })}
              className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>

          <div className="p-3 rounded-lg bg-[#FAF8F5] border border-[#EAE3D9] text-xs text-[#78716C] leading-relaxed flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-[#581825] shrink-0 mt-0.5" />
            <span>
              Per Section 6 of the Master Agreement, files may be permanently removed following expiry of the archival window. The client is responsible for downloading and preserving their own long-term backup.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
