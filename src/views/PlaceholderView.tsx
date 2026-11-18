import React from 'react';
import { FileText, Compass } from 'lucide-react';
import { NavigationTab } from '../types/navigation';

interface PlaceholderViewProps {
  tab: NavigationTab;
}

export const PlaceholderView: React.FC<PlaceholderViewProps> = ({ tab }) => {
  return (
    <div className="max-w-2xl mx-auto py-16 text-center">
      <div className="bg-[#FFFFFF] border border-[#E7DFD5] rounded-2xl p-10 sm:p-12 shadow-xs space-y-6">
        <div className="w-16 h-16 rounded-2xl bg-[#FAF2F4] border border-[#ECC7D0]/60 text-[#581825] flex items-center justify-center mx-auto shadow-xs">
          <FileText className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF2F4] text-[#581825] text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-3.5 h-3.5" />
          <span>Section View</span>
        </div>

        <div>
          <h2 className="text-2xl font-serif text-[#221F20] capitalize">{tab.replace('-', ' ')}</h2>
          <p className="mt-2 text-sm text-[#78716C] max-w-md mx-auto leading-relaxed">
            Please use the navigation menu on the left to access your documents, booking workspace, schedules, invoices, or company settings.
          </p>
        </div>
      </div>
    </div>
  );
};
