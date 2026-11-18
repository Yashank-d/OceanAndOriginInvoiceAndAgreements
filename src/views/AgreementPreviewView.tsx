import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download, 
  Printer, 
  ZoomIn, 
  ZoomOut, 
  Sparkles, 
  CheckCircle2, 
  Loader2,
  Bookmark,
  BookmarkCheck
} from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { useDocument } from '../context/DocumentContext';
import { AgreementPdfDocument } from '../components/preview/AgreementPdfDocument';
import { AgreementDocumentPreview } from '../components/preview/AgreementDocumentPreview';
import { saveDocument } from '../utils/storage';

interface AgreementPreviewViewProps {
  onBackToForm: () => void;
}

export const AgreementPreviewView: React.FC<AgreementPreviewViewProps> = ({
  onBackToForm,
}) => {
  const { document } = useDocument();
  const [zoomScale, setZoomScale] = useState<number>(100);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      const blob = await pdf(<AgreementPdfDocument document={document} />).toBlob();
      const url = URL.createObjectURL(blob);
      const link = window.document.createElement('a');
      link.href = url;
      const filename = `Parva_Agreement_${(document.client.name || 'Client').replace(/[^a-zA-Z0-9]/g, '_')}_${document.booking.bookingId}.pdf`;
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
      {/* Top Floating Action Bar (Hidden during print) */}
      <div className="sticky top-20 z-40 bg-[#FCFBF9]/95 backdrop-blur-md border border-[#E7DFD5] rounded-2xl p-4 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 print:hidden">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToForm}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#221F20] text-xs font-semibold hover:bg-[#FAF8F5] transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Edit Form</span>
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#581825]">
                Master Agreement Preview
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 font-semibold border border-emerald-200">
                Official Contract
              </span>
            </div>
            <p className="text-xs text-[#78716C]">
              {document.client.name || 'Client Agreement'} • {document.booking.bookingId}
            </p>
          </div>
        </div>

        {/* Zoom and Export Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Zoom controls */}
          <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-white border border-[#D8CEBE] rounded-lg text-xs text-[#4A4646]">
            <button
              onClick={() => setZoomScale((prev) => Math.max(60, prev - 10))}
              className="p-1 hover:text-[#581825]"
              title="Zoom out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="font-mono text-[11px] px-1">{zoomScale}%</span>
            <button
              onClick={() => setZoomScale((prev) => Math.min(140, prev + 10))}
              className="p-1 hover:text-[#581825]"
              title="Zoom in"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => {
              saveDocument({
                documentType: 'Agreement',
                title: `Master Agreement - ${document.client.name || 'Client'}`,
                clientName: document.client.name,
                bookingId: document.booking.bookingId,
                status: 'Final',
                data: document,
              });
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 3000);
            }}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#221F20] text-xs font-semibold hover:bg-[#FAF8F5] transition-all shadow-xs"
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
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#221F20] text-xs font-semibold hover:bg-[#FAF8F5] transition-all shadow-xs"
          >
            <Printer className="w-4 h-4 text-[#78716C]" />
            <span>Print / Save as PDF</span>
          </button>

          <button
            onClick={handleDownloadPdf}
            disabled={isGeneratingPdf}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] transition-all shadow-xs disabled:opacity-50"
          >
            {isGeneratingPdf ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#F5DCE2]" />
                <span>Rendering Vector PDF...</span>
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

      {/* Quality Badge Strip (Hidden during print) */}
      <div className="bg-[#FFFFFF] border border-[#E7DFD5] rounded-xl p-3.5 text-xs text-[#4A4646] flex items-center justify-between flex-wrap gap-2 print:hidden">
        <div className="flex items-center gap-2 text-[#581825]">
          <Sparkles className="w-4 h-4" />
          <span className="font-semibold">Parva Vector Document Standard</span>
        </div>
        <div className="flex items-center gap-4 text-[11px] text-[#78716C]">
          <span>✓ Selectable Vector Text</span>
          <span>✓ 8 A4 Editorial Pages</span>
          <span>✓ Initial & Signature Blocks</span>
          <span>✓ Approved Parva Legal Terms</span>
        </div>
      </div>

      {/* Document Pages Container */}
      <div 
        className="border border-[#E7DFD5] rounded-xl h-[calc(100vh-270px)] min-h-[500px] overflow-y-auto overflow-x-auto overscroll-contain bg-[#78716C]/10 p-4 sm:p-6 shadow-inner focus:outline-none print:h-auto print:overflow-visible print:border-none print:p-0 print:bg-transparent"
        style={{ overscrollBehavior: 'contain' }}
        tabIndex={0}
      >
        <div 
          className="pb-12 transition-transform origin-top min-w-fit mx-auto"
          style={{ transform: zoomScale === 100 ? undefined : `scale(${zoomScale / 100})` }}
        >
          <AgreementDocumentPreview document={document} />
        </div>
      </div>
    </div>
  );
};
