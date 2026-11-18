import React from 'react';
import {
  LayoutDashboard,
  FolderArchive,
  Settings,
  X,
  FilePlus2,
  FileSpreadsheet
} from 'lucide-react';
import { NavigationTab } from '../../types/navigation';

interface SidebarProps {
  currentTab: NavigationTab;
  onSelectTab: (tab: NavigationTab) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: NavigationTab;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'quotes', label: 'Quote Generator', icon: FileSpreadsheet },
  { id: 'booking', label: 'New Booking', icon: FilePlus2 },
  { id: 'saved-documents', label: 'Documents', icon: FolderArchive },
];

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  // Legacy generator tabs all live inside the unified booking workspace now.
  const activeId: NavigationTab =
    currentTab === 'agreements' ||
    currentTab === 'agreement-preview' ||
    currentTab === 'invoices' ||
    currentTab === 'booking-schedules'
      ? 'booking'
      : currentTab;

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-xs z-40 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`
          fixed top-0 bottom-0 left-0 z-50 w-72 bg-[#FCFBF9] border-r border-[#E7DFD5] flex flex-col
          transition-transform duration-200 ease-in-out lg:static lg:translate-x-0
          ${isOpenMobile ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        {/* Brand Header */}
        <div className="pt-7 pb-6 px-6 border-b border-[#EAE3D9] flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3">
              <img 
                src="/logo2.png" 
                alt="The House of Parva" 
                className="h-10 w-auto object-contain"
              />
            </div>
            <p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#581825] font-semibold">
              Document Generator
            </p>
          </div>

          <button
            onClick={onCloseMobile}
            className="p-1 rounded-md text-[#78716C] hover:text-[#221F20] lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-[#9E9486] uppercase">
            Menu
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onSelectTab(item.id);
                  onCloseMobile();
                }}
                className={`
                  w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left
                  ${isActive 
                    ? 'bg-[#581825] text-white shadow-xs font-semibold' 
                    : 'text-[#4A4646] hover:bg-[#F3EDE5] hover:text-[#221F20]'
                  }
                `}
              >
                <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-[#F5DCE2]' : 'text-[#78716C]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom Settings & Entity Info */}
        <div className="p-3 border-t border-[#EAE3D9] space-y-3">
          <button
            onClick={() => {
              onSelectTab('settings');
              onCloseMobile();
            }}
            className={`
              w-full flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all text-left
              ${currentTab === 'settings' 
                ? 'bg-[#581825] text-white shadow-xs font-semibold' 
                : 'text-[#4A4646] hover:bg-[#F3EDE5] hover:text-[#221F20]'
              }
            `}
          >
            <Settings className={`w-4 h-4 transition-colors ${currentTab === 'settings' ? 'text-[#F5DCE2]' : 'text-[#78716C]'}`} />
            <span>Settings & Info</span>
          </button>

          <div className="px-3.5 py-2 rounded-lg bg-[#FAF8F5] border border-[#EAE3D9]/60 text-[11px] text-[#78716C] leading-relaxed">
            <p className="font-semibold text-[#581825] tracking-wide">OCEAN AND ORIGIN</p>
            <p className="text-[10px] text-[#8E867E]">Bangalore, Karnataka</p>
          </div>
        </div>
      </aside>
    </>
  );
};
