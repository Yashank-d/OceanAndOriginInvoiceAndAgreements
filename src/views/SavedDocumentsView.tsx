import React, { useMemo, useState, useEffect } from 'react';
import {
  FolderArchive,
  FolderOpen,
  Search,
  FileText,
  Receipt,
  CalendarDays,
  Copy,
  Trash2,
  Download,
  Edit3,
  CheckCircle2,
  Loader2,
  FilePlus2,
  Cloud,
  HardDrive,
  ChevronDown,
  FileSpreadsheet,
} from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { SavedDocumentRecord, DocumentType } from '../types/storage';
import {
  getSavedDocumentsAsync,
  deleteDocumentAsync,
  duplicateDocumentAsync,
  clearAllSavedDocumentsAsync,
  getConnectionMode,
} from '../utils/storage';
import { groupByBooking } from '../utils/bookingGroups';
import { AgreementPdfDocument } from '../components/preview/AgreementPdfDocument';
import { BookingSchedulePdfDocument } from '../components/booking-schedule/BookingSchedulePdfDocument';
import { InvoicePdfDocument } from '../components/invoice/InvoicePdfDocument';
import { QuotePdfDocument } from '../components/quote/QuotePdfDocument';
import { BookingDocumentData, InvoiceDocumentData } from '../types/document';
import { QuoteDocumentData } from '../types/quote';
import { NavigationTab } from '../types/navigation';

interface SavedDocumentsViewProps {
  onOpenDocument: (record: SavedDocumentRecord) => void;
  onOpenBooking?: (records: SavedDocumentRecord[]) => void;
  onNavigate: (tab: NavigationTab) => void;
}

export const SavedDocumentsView: React.FC<SavedDocumentsViewProps> = ({
  onOpenDocument,
  onOpenBooking,
  onNavigate,
}) => {
  const [documents, setDocuments] = useState<SavedDocumentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [generatingPdfId, setGeneratingPdfId] = useState<string | null>(null);
  const [downloadingFolder, setDownloadingFolder] = useState<string | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);
  const [mode, setMode] = useState<'cloud' | 'local'>(() => getConnectionMode());

  const loadDocuments = async () => {
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
    loadDocuments();
  }, []);

  const openFolder = (docs: SavedDocumentRecord[]) => {
    if (onOpenBooking) onOpenBooking(docs);
    else if (docs[0]) onOpenDocument(docs[0]);
  };

  const handleDelete = async (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      await deleteDocumentAsync(id);
      loadDocuments();
    }
  };

  const handleDeleteFolder = async (folderKey: string, clientName: string, count: number) => {
    if (!window.confirm(`Delete the "${clientName}" folder with all ${count} documents? This cannot be undone.`)) return;
    const ids = documents.filter((d) => (d.bookingId || d.clientName || d.id) === folderKey).map((d) => d.id);
    for (const id of ids) await deleteDocumentAsync(id);
    loadDocuments();
  };

  const handleDuplicate = async (id: string) => {
    await duplicateDocumentAsync(id);
    loadDocuments();
  };

  const buildPdfElement = (doc: SavedDocumentRecord): React.ReactElement => {
    if (doc.documentType === 'Invoice') {
      return <InvoicePdfDocument invoice={doc.data as InvoiceDocumentData} />;
    } else if (doc.documentType === 'Booking Schedule') {
      return <BookingSchedulePdfDocument document={doc.data as BookingDocumentData} />;
    } else if (doc.documentType === 'Quotation') {
      return <QuotePdfDocument quote={doc.data as QuoteDocumentData} />;
    }
    return <AgreementPdfDocument document={doc.data as BookingDocumentData} />;
  };

  const downloadSingle = async (doc: SavedDocumentRecord, clientSlug: string) => {
    const blob = await pdf(buildPdfElement(doc)).toBlob();
    const url = URL.createObjectURL(blob);
    const link = window.document.createElement('a');
    link.href = url;
    link.download = `Parva_${doc.documentType.replace(/\s+/g, '_')}_${clientSlug}.pdf`;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDownloadPdf = async (doc: SavedDocumentRecord) => {
    try {
      setGeneratingPdfId(doc.id);
      await downloadSingle(doc, (doc.clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_'));
      setDownloadSuccessId(doc.id);
      setTimeout(() => setDownloadSuccessId(null), 3000);
    } catch (err) {
      console.error('Error downloading PDF:', err);
      alert('Failed to generate PDF for this saved record.');
    } finally {
      setGeneratingPdfId(null);
    }
  };

  const handleDownloadFolder = async (folderKey: string, clientName: string) => {
    const folderDocs = documents.filter((d) => (d.bookingId || d.clientName || d.id) === folderKey);
    if (folderDocs.length === 0) return;
    try {
      setDownloadingFolder(folderKey);
      const slug = (clientName || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
      for (const doc of folderDocs) {
        await downloadSingle(doc, slug);
        await new Promise((r) => setTimeout(r, 300));
      }
    } catch (err) {
      console.error('Error downloading folder:', err);
      alert('Failed to download all PDFs for this folder.');
    } finally {
      setDownloadingFolder(null);
    }
  };

  const toggleFolder = (key: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const folders = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    const groups = groupByBooking(documents);
    return groups
      .map((f) => {
        const matchingDocs = f.docs.filter((doc) => {
          const matchesType = selectedType === 'All' || doc.documentType === selectedType;
          const matchesSearch =
            !query ||
            doc.title.toLowerCase().includes(query) ||
            doc.clientName.toLowerCase().includes(query) ||
            doc.bookingId.toLowerCase().includes(query);
          return matchesType && matchesSearch;
        });
        const folderMatchesSearch =
          !query ||
          f.clientName.toLowerCase().includes(query) ||
          f.bookingId.toLowerCase().includes(query) ||
          matchingDocs.length > 0;
        const folderMatchesType =
          selectedType === 'All' || f.docs.some((d) => d.documentType === selectedType);
        if (!folderMatchesSearch || !folderMatchesType) return null;
        // When filtering by type, show only matching docs inside; otherwise all.
        const visibleDocs = selectedType === 'All' && !query ? f.docs : f.docs.filter((doc) => {
          const matchesType = selectedType === 'All' || doc.documentType === selectedType;
          const matchesSearch =
            !query ||
            doc.title.toLowerCase().includes(query) ||
            doc.clientName.toLowerCase().includes(query) ||
            doc.bookingId.toLowerCase().includes(query) ||
            f.clientName.toLowerCase().includes(query) ||
            f.bookingId.toLowerCase().includes(query);
          return matchesType && matchesSearch;
        });
        return { ...f, visibleDocs };
      })
      .filter((f): f is NonNullable<typeof f> => f !== null);
  }, [documents, searchQuery, selectedType]);

  const getTypeIcon = (type: DocumentType) => {
    switch (type) {
      case 'Agreement':
        return <FileText className="w-4 h-4 text-[#581825]" />;
      case 'Invoice':
        return <Receipt className="w-4 h-4 text-emerald-800" />;
      case 'Booking Schedule':
        return <CalendarDays className="w-4 h-4 text-amber-800" />;
      case 'Quotation':
        return <FileSpreadsheet className="w-4 h-4 text-purple-800" />;
    }
  };

  const getTypeBadge = (type: DocumentType) => {
    switch (type) {
      case 'Agreement':
        return 'bg-[#FAF2F4] text-[#581825] border-[#ECC7D0]';
      case 'Invoice':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      case 'Booking Schedule':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'Quotation':
        return 'bg-purple-50 text-purple-800 border-purple-200';
    }
  };

  const totalDocs = documents.length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="bg-[#FCFBF9] border border-[#E7DFD5] rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#581825]">The House of Parva</span>
            <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-white border border-[#D8CEBE] text-[11px] font-medium text-[#4A4646]">
              {mode === 'cloud' ? <Cloud className="w-3 h-3 text-emerald-700" /> : <HardDrive className="w-3 h-3 text-[#78716C]" />}
              {loading ? 'Loading…' : mode === 'cloud' ? `Turso cloud • ${folders.length} folders • ${totalDocs} docs` : `Local • ${folders.length} folders • ${totalDocs} docs`}
            </span>
          </div>
          <h1 className="text-2xl font-serif text-[#221F20] mt-1">Documents</h1>
          <p className="text-xs text-[#78716C] mt-0.5">One folder per client booking — Quotations, Agreements, Schedules & Invoices</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => onNavigate('quotes')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-white border border-[#D8CEBE] text-[#581825] text-xs font-semibold hover:bg-[#FAF8F5] shrink-0"
          >
            <FileSpreadsheet className="w-4 h-4" /><span>New Quote</span>
          </button>
          <button
            onClick={() => onNavigate('booking')}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] shrink-0"
          >
            <FilePlus2 className="w-4 h-4" /><span>New booking</span>
          </button>
        </div>
      </div>

      <div className="bg-white border border-[#E7DFD5] rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
          {['All', 'Quotation', 'Agreement', 'Invoice', 'Booking Schedule'].map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium shrink-0 ${
                selectedType === type ? 'bg-[#581825] text-white' : 'bg-[#FAF8F5] text-[#78716C] hover:text-[#221F20]'
              }`}
            >
              {type === 'All' ? 'All' : `${type}s`}
            </button>
          ))}
        </div>
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-[#78716C] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search client, title, or ID..."
            className="w-full pl-9 pr-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs focus:outline-none focus:border-[#581825]"
          />
        </div>
      </div>

      {loading ? (
        <div className="py-16 flex items-center justify-center gap-2 text-xs text-[#78716C]">
          <Loader2 className="w-4 h-4 animate-spin" /> Loading documents…
        </div>
      ) : folders.length === 0 ? (
        <div className="py-16 text-center border border-dashed border-[#D8CEBE] rounded-2xl bg-white p-8">
          <div className="w-12 h-12 rounded-full bg-[#FAF2F4] text-[#581825] flex items-center justify-center mx-auto mb-3">
            <FolderArchive className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-base text-[#221F20]">No folders found</h3>
          <p className="text-xs text-[#78716C] mt-1">Try a different search, or start a new booking.</p>
          {documents.length === 0 && (
            <button
              onClick={async () => {
                if (window.confirm('Restore the 3 sample documents?')) {
                  await clearAllSavedDocumentsAsync();
                  loadDocuments();
                }
              }}
              className="mt-4 px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-xs font-medium text-[#4A4646] hover:bg-[#FAF8F5]"
            >
              Restore sample data
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          {folders.map((folder) => {
            const isOpen = expanded.has(folder.key);
            const Icon = isOpen ? FolderOpen : FolderArchive;
            return (
              <div key={folder.key} className="bg-white border border-[#E7DFD5] rounded-2xl overflow-hidden">
                {/* Folder header */}
                <div className="flex items-center gap-3 px-4 sm:px-5 py-4 hover:bg-[#FAF8F5]/60 transition-colors">
                  <button onClick={() => toggleFolder(folder.key)} className="flex items-center gap-3 flex-1 min-w-0 text-left">
                    <span className="p-2 rounded-lg bg-[#FAF2F4] border border-[#ECC7D0]/60 text-[#581825] shrink-0">
                      <Icon className="w-5 h-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-serif text-base text-[#221F20] truncate">{folder.clientName}</span>
                      <span className="block text-[11px] text-[#78716C] font-mono truncate">
                        {folder.bookingId} • {folder.docs.length} document{folder.docs.length === 1 ? '' : 's'} • {folder.date}
                      </span>
                      <span className="mt-1 flex flex-wrap gap-1">
                        {folder.docs.map((d) => (
                          <span key={d.id} className={`inline-block px-1.5 py-px rounded text-[10px] font-semibold border ${getTypeBadge(d.documentType)}`}>
                            {d.documentType}
                          </span>
                        ))}
                      </span>
                    </span>
                  </button>
                  <ChevronDown
                    className={`w-4 h-4 text-[#78716C] shrink-0 transition-transform cursor-pointer ${isOpen ? 'rotate-180' : ''}`}
                    onClick={() => toggleFolder(folder.key)}
                  />
                  <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                    <button onClick={() => openFolder(folder.docs)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white border border-[#D8CEBE] text-[#581825] text-xs font-semibold hover:bg-[#FAF8F5]"
                      title="Open full booking in workspace">
                      <Edit3 className="w-3.5 h-3.5" /><span>Open</span>
                    </button>
                    <button onClick={() => handleDownloadFolder(folder.key, folder.clientName)} disabled={downloadingFolder === folder.key}
                      className="p-2 rounded-lg bg-white border border-[#D8CEBE] text-[#4A4646] hover:text-[#581825] disabled:opacity-50" title="Download all PDFs in folder">
                      {downloadingFolder === folder.key ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={() => handleDeleteFolder(folder.key, folder.clientName, folder.docs.length)}
                      className="p-2 rounded-lg bg-white border border-[#D8CEBE] text-stone-400 hover:text-red-700" title="Delete whole folder">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {/* Mobile actions */}
                <div className="flex sm:hidden items-center gap-1.5 px-4 pb-3">
                  <button onClick={() => openFolder(folder.docs)}
                    className="flex-1 inline-flex items-center justify-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#581825] text-white text-xs font-semibold">
                    <Edit3 className="w-3.5 h-3.5" /><span>Open folder</span>
                  </button>
                  <button onClick={() => handleDownloadFolder(folder.key, folder.clientName)} disabled={downloadingFolder === folder.key}
                    className="p-2 rounded-lg bg-white border border-[#D8CEBE] text-[#4A4646] disabled:opacity-50" title="Download all">
                    {downloadingFolder === folder.key ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                  </button>
                  <button onClick={() => handleDeleteFolder(folder.key, folder.clientName, folder.docs.length)}
                    className="p-2 rounded-lg bg-white border border-[#D8CEBE] text-stone-400" title="Delete folder">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Folder contents */}
                {isOpen && (
                  <div className="border-t border-[#F5EFEB]">
                    {folder.visibleDocs.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-[#F5EFEB] last:border-0 hover:bg-[#FAF8F5]/50">
                        <span className="p-1.5 rounded bg-[#FAF8F5] border border-[#EAE3D9] shrink-0">
                          {getTypeIcon(doc.documentType)}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-medium text-[#221F20] truncate">{doc.title}</p>
                          <p className="text-[11px] text-[#78716C]">{doc.documentType} • {doc.date} • {doc.status}</p>
                        </div>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button onClick={() => onOpenDocument(doc)}
                            className="p-1.5 rounded bg-white border border-[#D8CEBE] text-[#581825] hover:bg-[#FAF8F5]" title="Open this document">
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDownloadPdf(doc)} disabled={generatingPdfId === doc.id}
                            className="p-1.5 rounded bg-white border border-[#D8CEBE] text-[#4A4646] hover:text-[#581825]" title="Download PDF">
                            {generatingPdfId === doc.id ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                              : downloadSuccessId === doc.id ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                              : <Download className="w-3.5 h-3.5" />}
                          </button>
                          <button onClick={() => handleDuplicate(doc.id)}
                            className="p-1.5 rounded bg-white border border-[#D8CEBE] text-[#4A4646] hover:text-[#581825]" title="Duplicate">
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => handleDelete(doc.id, doc.title)}
                            className="p-1.5 rounded bg-white border border-[#D8CEBE] text-stone-400 hover:text-red-700" title="Delete">
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
