import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { DashboardView } from './views/DashboardView';
import { BookingWorkspaceView } from './views/BookingWorkspaceView';
import { AgreementGeneratorView } from './views/AgreementGeneratorView';
import { AgreementPreviewView } from './views/AgreementPreviewView';
import { BookingScheduleView } from './views/BookingScheduleView';
import { InvoiceView } from './views/InvoiceView';
import { SavedDocumentsView } from './views/SavedDocumentsView';
import { SettingsView } from './views/SettingsView';
import { QuoteGeneratorView } from './views/QuoteGeneratorView';
import { PlaceholderView } from './views/PlaceholderView';
import { DocumentProvider, useDocument } from './context/DocumentContext';
import { NavigationTab } from './types/navigation';
import { SavedDocumentRecord } from './types/storage';
import { BookingDocumentData, InvoiceDocumentData } from './types/document';
import { QuoteDocumentData } from './types/quote';

export function AppContent() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeQuote, setActiveQuote] = useState<QuoteDocumentData | undefined>(undefined);
  const { setDocument, setInvoice } = useDocument();

  const handleOpenDocument = (record: SavedDocumentRecord) => {
    if (record.documentType === 'Quotation') {
      setActiveQuote(record.data as QuoteDocumentData);
      setCurrentTab('quotes');
      return;
    }
    handleOpenBooking([record]);
  };

  /** Open a whole client folder — loads the full Agreement + Invoice with no data loss. */
  const handleOpenBooking = (records: SavedDocumentRecord[]) => {
    const inv = records.find((r) => r.documentType === 'Invoice');
    const agreement =
      records.find((r) => r.documentType === 'Agreement') ??
      records.find((r) => r.documentType !== 'Invoice');
    if (agreement) {
      setDocument(agreement.data as BookingDocumentData);
    }
    if (inv) {
      setInvoice(inv.data as InvoiceDocumentData);
      if (!agreement) {
        const invData = inv.data as InvoiceDocumentData;
        setDocument((prev) => ({
          ...prev,
          client: invData.client,
          booking: invData.booking,
          commercial: { ...prev.commercial, invoiceReference: invData.invoiceNumber },
        }));
      }
    } else if (agreement) {
      const doc = agreement.data as BookingDocumentData;
      setInvoice((prev) => ({
        ...prev,
        client: doc.client,
        booking: doc.booking,
        commercial: { ...doc.commercial },
      }));
    }
    setCurrentTab('booking');
  };

  const renderContent = () => {
    switch (currentTab) {
      case 'dashboard':
        return (
          <DashboardView
            onNavigate={(tab) => setCurrentTab(tab)}
            onOpenDocument={handleOpenDocument}
            onOpenBooking={handleOpenBooking}
          />
        );
      case 'booking':
        return <BookingWorkspaceView />;
      case 'quotes':
        return (
          <QuoteGeneratorView
            onNavigate={(tab) => setCurrentTab(tab)}
            initialQuoteData={activeQuote}
          />
        );
      // Legacy deep-links now resolve into the unified workspace (seamless).
      case 'agreements':
        return (
          <AgreementGeneratorView
            onBackToDashboard={() => setCurrentTab('dashboard')}
            onProceedToPreview={() => setCurrentTab('agreement-preview')}
          />
        );
      case 'agreement-preview':
        return (
          <AgreementPreviewView
            onBackToForm={() => setCurrentTab('booking')}
          />
        );
      case 'booking-schedules':
        return <BookingScheduleView />;
      case 'invoices':
        return <InvoiceView />;
      case 'saved-documents':
        return (
          <SavedDocumentsView
            onOpenDocument={handleOpenDocument}
            onOpenBooking={handleOpenBooking}
            onNavigate={(tab) => setCurrentTab(tab)}
          />
        );
      case 'settings':
        return <SettingsView />;
      default:
        return <PlaceholderView tab={currentTab} />;
    }
  };

  return (
    <div className="h-screen overflow-hidden bg-[#FAF8F5] flex print:h-auto print:overflow-visible">
      {/* Sidebar Navigation */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => setCurrentTab(tab)}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden print:h-auto print:overflow-visible">
        <Header
          currentTab={currentTab}
          onOpenMobileSidebar={() => setIsMobileSidebarOpen(true)}
        />

        <main className="flex-1 p-6 sm:p-8 lg:p-10 overflow-y-auto print:p-0 print:overflow-visible">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export function App() {
  return (
    <DocumentProvider>
      <AppContent />
    </DocumentProvider>
  );
}

export default App;
