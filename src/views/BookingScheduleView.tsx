import React, { useState } from 'react';
import { 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  CheckCircle2, 
  Loader2, 
  Edit3, 
  Eye, 
  RotateCcw,
  FileCheck,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { useDocument } from '../context/DocumentContext';
import { BookingScheduleForm } from '../components/booking-schedule/BookingScheduleForm';
import { BookingSchedulePreview } from '../components/booking-schedule/BookingSchedulePreview';
import { BookingSchedulePdfDocument } from '../components/booking-schedule/BookingSchedulePdfDocument';
import { saveDocument } from '../utils/storage';

export const BookingScheduleView: React.FC = () => {
  const { document, loadSampleAgreement } = useDocument();
  const [activeTab, setActiveTab] = useState<'form' | 'preview'>('form');
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const blob = await pdf(<BookingSchedulePdfDocument document={document} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      const clientSlug = (document.client.name || 'Client').replace(/[^a-zA-Z0-9]/g, '_');
      const filename = `Parva_Booking_Schedule_${clientSlug}_${document.booking.bookingId || '2026'}.pdf`;
      link.download = filename;
      window.document.body.appendChild(link);
      link.click();
      window.document.body.removeChild(link);
      URL.revokeObjectURL(url);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch (err) {
      console.error('Error generating PDF:', err);
      alert('Unable to generate PDF programmatically. You can use the "Print / Save as PDF" button as a high-fidelity alternative.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Floating Action Bar */}
      <div className="bg-[#FCFBF9]/95 backdrop-blur-md border border-[#E7DFD5] rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4 print:hidden">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#581825]">
              The House of Parva
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-50 text-amber-900 font-semibold border border-amber-200">
              2-Page Schedule
            </span>
          </div>
          <h1 className="text-xl font-serif text-[#221F20] tracking-tight mt-1">
            Client Booking Schedule
          </h1>
          <p className="text-xs text-[#78716C] mt-0.5">
            2-Page Service Specification, Deliverables, Milestones & Authorisation
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={loadSampleAgreement}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#4A4646] text-xs font-semibold hover:bg-[#FAF8F5] transition-all shadow-xs"
            title="Load sample demo values"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#78716C]" />
            <span>Load Sample Data</span>
          </button>

          <button
            onClick={() => {
              saveDocument({
                documentType: 'Booking Schedule',
                title: `Booking Schedule - ${document.client.name || 'Client'}`,
                clientName: document.client.name,
                bookingId: document.booking.bookingId,
                status: 'Final',
                data: document,
              });
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 3000);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#221F20] text-xs font-semibold hover:bg-[#FAF8F5] transition-all shadow-xs"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                <span className="text-emerald-700">Saved!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-4 h-4 text-[#78716C]" />
                <span>Save Record</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#221F20] text-xs font-semibold hover:bg-[#FAF8F5] transition-all shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#78716C]" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] transition-all shadow-xs disabled:opacity-50"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#F5DCE2]" />
                <span>Generating Vector PDF...</span>
              </>
            ) : downloadSuccess ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                <span>Downloaded!</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4 text-[#F5DCE2]" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="flex items-center justify-between border-b border-[#E7DFD5] pb-2 print:hidden">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('form')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'form'
                ? 'bg-[#581825] text-white shadow-xs'
                : 'bg-white text-[#4A4646] border border-[#D8CEBE] hover:bg-[#FAF8F5]'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Schedule Details</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
              activeTab === 'preview'
                ? 'bg-[#581825] text-white shadow-xs'
                : 'bg-white text-[#4A4646] border border-[#D8CEBE] hover:bg-[#FAF8F5]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Live 2-Page Preview</span>
          </button>
        </div>

        {activeTab === 'preview' && (
          <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-white border border-[#D8CEBE] rounded-lg text-xs text-[#4A4646]">
            <button
              onClick={() => setZoomScale((prev) => Math.max(60, prev - 10))}
              className="p-1 hover:text-[#581825]"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1">{zoomScale}%</span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(130, prev + 10))}
              className="p-1 hover:text-[#581825]"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Quality Badge Strip (Hidden during print) */}
      <div className="bg-[#FFFFFF] border border-[#E7DFD5] rounded-xl p-3.5 text-xs text-[#4A4646] flex items-center justify-between flex-wrap gap-2 print:hidden">
        <div className="flex items-center gap-2 text-[#581825]">
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold">Parva Document Specification</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[#78716C]">
          <span>✓ 2-Page Compact Layout</span>
          <span>✓ Selectable Vector PDF</span>
          <span>✓ 50/30/20 Milestones</span>
          <span>✓ Signatures & Initial Rows</span>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'form' ? (
        <div className="space-y-6">
          <BookingScheduleForm />

          {/* Bottom Bar to proceed to preview */}
          <div className="bg-white border border-[#E7DFD5] rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-[#78716C]">
              <FileCheck className="w-4 h-4 text-emerald-600" />
              <span>All changes automatically sync with the live document preview and vector PDF.</span>
            </div>
            <button
              onClick={() => setActiveTab('preview')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] transition-all shadow-xs"
            >
              <span>View Generated Schedule (2 Pages) →</span>
            </button>
          </div>
        </div>
      ) : (
        <div 
          className="border border-[#E7DFD5] rounded-xl h-[calc(100vh-270px)] min-h-[500px] overflow-y-auto overflow-x-auto overscroll-contain bg-[#78716C]/10 p-4 sm:p-6 shadow-inner focus:outline-none print:h-auto print:overflow-visible print:border-none print:p-0 print:bg-transparent"
          style={{ overscrollBehavior: 'contain' }}
          tabIndex={0}
        >
          <div 
            className="pb-12 transition-transform origin-top min-w-fit mx-auto"
            style={{ transform: zoomScale === 100 ? undefined : `scale(${zoomScale / 100})` }}
          >
            <BookingSchedulePreview document={document} />
          </div>
        </div>
      )}
    </div>
  );
};
