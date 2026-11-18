import React from 'react';
import { Menu } from 'lucide-react';
import { NavigationTab } from '../../types/navigation';

interface HeaderProps {
  currentTab: NavigationTab;
  onOpenMobileSidebar: () => void;
}

const tabTitles: Record<NavigationTab, { title: string; subtitle: string }> = {
  dashboard: {
    title: 'Dashboard',
    subtitle: 'Overview & one-click booking',
  },
  booking: {
    title: 'New Booking',
    subtitle: 'Client → Services → Money → All documents',
  },
  quotes: {
    title: 'Quote Generator',
    subtitle: 'Studio package pricing and commercial estimates',
  },
  agreements: {
    title: 'Agreement Generator',
    subtitle: 'Master Client Booking Agreement form builder',
  },
  'agreement-preview': {
    title: 'Agreement Preview & PDF',
    subtitle: 'Official 8-page vector document & PDF export',
  },
  invoices: {
    title: 'Invoices',
    subtitle: 'Commercial tax & standard invoice generator',
  },
  'booking-schedules': {
    title: 'Booking Schedules',
    subtitle: 'Client booking timeline & scope schedules',
  },
  'saved-documents': {
    title: 'Documents',
    subtitle: 'All bookings — search, open, download',
  },
  settings: {
    title: 'Settings & Company Profile',
    subtitle: 'Ocean and Origin business configuration',
  },
};

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onOpenMobileSidebar,
}) => {
  const current = tabTitles[currentTab] || { title: 'Parva', subtitle: '' };

  return (
    <header className="sticky top-0 z-30 bg-[#FCFBF9]/90 backdrop-blur-md border-b border-[#E7DFD5] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={onOpenMobileSidebar}
          className="p-2 -ml-2 rounded-lg text-[#581825] hover:bg-[#F3EDE5] lg:hidden"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-xl font-serif text-[#221F20] tracking-tight">
            {current.title}
          </h1>
          <p className="text-xs text-[#78716C]">
            {current.subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F3EDE5] text-[#581825] text-xs font-medium border border-[#E7DFD5]">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse"></span>
          <span>Parva V1 Ready</span>
        </div>
      </div>
    </header>
  );
};
