import React, { useEffect, useMemo, useState } from 'react';
import { FilePlus2, FileSpreadsheet, ArrowUpRight, FolderArchive, FolderOpen, Trash2, Edit3, Cloud, HardDrive, Loader2, Download } from 'lucide-react';
import { NavigationTab } from '../types/navigation';
import { SavedDocumentRecord } from '../types/storage';
import { getSavedDocumentsAsync, deleteDocumentAsync, getConnectionMode } from '../utils/storage';
import { groupByBooking } from '../utils/bookingGroups';

interface DashboardViewProps {
  onNavigate: (tab: NavigationTab) => void;
  onOpenDocument?: (record: SavedDocumentRecord) => void;
  onOpenBooking?: (records: SavedDocumentRecord[]) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate, onOpenDocument, onOpenBooking }) => {
  const [documents, setDocuments] = useState<SavedDocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [mode, setMode] = useState<'cloud' | 'local'>(() => getConnectionMode());

  const loadDocs = async () => {
    setLoading(true);
    try {
      const { docs, mode: m } = await getSavedDocumentsAsync();
      setDocuments(docs);
      setMode(m);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDocs();
  }, []);

  const folders = useMemo(() => groupByBooking(documents).slice(0, 5), [documents]);

  const openFolder = (docs: SavedDocumentRecord[]) => {
    if (onOpenBooking) onOpenBooking(docs);
    else if (docs[0] && onOpenDocument) onOpenDocument(docs[0]);
  };

  const handleDeleteFolder = async (clientName: string, ids: string[]) => {
    if (!window.confirm(`Delete the "${clientName}" folder with all ${ids.length} documents?`)) return;
    for (const id of ids) await deleteDocumentAsync(id);
    loadDocs();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Hero — one action */}
      <div className="rounded-2xl bg-gradient-to-br from-[#FAF8F5] via-[#FFFFFF] to-[#F5EFE6] border border-[#E7DFD5] p-8 sm:p-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#581825]">The House of Parva</span>
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-[#D8CEBE] text-[11px] font-medium text-[#4A4646]">
                {mode === 'cloud' ? <Cloud className="w-3 h-3 text-emerald-700" /> : <HardDrive className="w-3 h-3 text-[#78716C]" />}
                {mode === 'cloud' ? 'Turso cloud connected' : 'Local mode — add .env for cloud'}
              </span>
            </div>
            <h2 className="mt-2 text-3xl sm:text-4xl font-serif text-[#221F20] tracking-tight">One booking, all documents</h2>
            <p className="mt-2 text-xs sm:text-sm text-[#78716C] leading-relaxed">
              Enter client details once — Agreement, Booking Schedule & Invoice generate together and save into one client folder.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={() => onNavigate('quotes')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-[#D8CEBE] text-[#581825] text-sm font-semibold hover:bg-[#FAF8F5] transition-all"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Create Quote</span>
            </button>
            <button
              onClick={() => onNavigate('booking')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#581825] text-white text-sm font-semibold hover:bg-[#6E1F36] transition-all shadow-xs"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Start new booking</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent folders */}
      <div className="bg-[#FFFFFF] border border-[#E7DFD5] rounded-2xl p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#EAE3D9]">
          <div>
            <h3 className="font-serif text-xl text-[#221F20]">Recent client folders</h3>
            <p className="text-xs text-[#78716C] mt-0.5">Each folder holds that booking's Agreement, Schedule & Invoice</p>
          </div>
          <button onClick={() => onNavigate('saved-documents')}
            className="text-xs font-semibold text-[#581825] inline-flex items-center gap-1">
            <span>View all</span><ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {loading ? (
          <div className="py-10 flex items-center justify-center gap-2 text-xs text-[#78716C]">
            <Loader2 className="w-4 h-4 animate-spin" /> Loading {mode === 'cloud' ? 'from Turso cloud…' : 'from this device…'}
          </div>
        ) : folders.length === 0 ? (
          <div className="py-14 text-center border border-dashed border-[#D8CEBE] rounded-xl bg-[#FAF8F5]/60">
            <div className="w-12 h-12 rounded-full bg-[#FAF2F4] text-[#581825] flex items-center justify-center mx-auto mb-3">
              <FolderArchive className="w-5 h-5" />
            </div>
            <h4 className="text-sm font-serif text-[#221F20]">No bookings yet</h4>
            <p className="text-xs text-[#78716C] mt-1 mb-5">Start your first booking — it takes about 2 minutes.</p>
            <button onClick={() => onNavigate('booking')}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#581825] text-white text-xs font-medium">
              <FilePlus2 className="w-3.5 h-3.5" /><span>Create first booking</span>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            {folders.map((folder) => (
              <div key={folder.key} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-[#EAE3D9] hover:border-[#581825]/30 hover:bg-[#FAF8F5]/60 transition-all">
                <span className="p-2 rounded-lg bg-[#FAF2F4] border border-[#ECC7D0]/60 text-[#581825] shrink-0">
                  <FolderOpen className="w-4 h-4" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-serif text-[#221F20] truncate">{folder.clientName}</p>
                  <p className="text-[11px] text-[#78716C] font-mono truncate">
                    {folder.bookingId} • {folder.docs.map((d) => d.documentType).join(' + ')}
                  </p>
                </div>
                <span className="hidden sm:inline-block text-[11px] text-[#78716C] shrink-0">{folder.docs.length} docs</span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button onClick={() => openFolder(folder.docs)}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36]">
                    <Edit3 className="w-3.5 h-3.5" /><span>Open</span>
                  </button>
                  <button
                    onClick={() => handleDeleteFolder(folder.clientName, folder.docs.map((d) => d.id))}
                    className="p-1.5 text-stone-400 hover:text-red-700" title="Delete folder">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Hint */}
      {folders.length > 0 && (
        <p className="text-[11px] text-[#78716C] flex items-center gap-1.5 px-1">
          <Download className="w-3.5 h-3.5" />
          Tip: open Documents → expand a client folder → “download” icon on the folder header grabs all 3 PDFs at once.
        </p>
      )}
    </div>
  );
};
