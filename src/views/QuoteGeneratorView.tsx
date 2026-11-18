import React, { useState, useMemo } from 'react';
import {
  FileText,
  Upload,
  Sparkles,
  RotateCcw,
  Download,
  Printer,
  Copy,
  ArrowRight,
  Check,
  Plus,
  Trash2,
  CheckCircle2,
  FileSpreadsheet,
} from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import {
  BrandPackages,
  PackageTier,
  QuoteDocumentData,
  QuoteLineItem,
  QuoteClientInfo,
} from '../types/quote';
import { NavigationTab } from '../types/navigation';
import { getStoredPricingCatalog } from '../utils/pricingParser';
import { formatINR } from '../utils/calculations';
import { formatDocumentDate } from '../utils/formatters';
import { useDocument } from '../context/DocumentContext';
import { saveDocumentAsync } from '../utils/storage';
import { PricesEditorModal } from '../components/quote/PricesEditorModal';
import { QuoteDocumentPreview } from '../components/quote/QuoteDocumentPreview';
import { QuotePdfDocument } from '../components/quote/QuotePdfDocument';

interface QuoteGeneratorViewProps {
  onNavigate?: (tab: NavigationTab) => void;
  initialQuoteData?: QuoteDocumentData;
}

export const QuoteGeneratorView: React.FC<QuoteGeneratorViewProps> = ({
  onNavigate,
  initialQuoteData,
}) => {
  const { setDocument, setInvoice } = useDocument();

  // Pricing Catalog State
  const [catalog, setCatalog] = useState<BrandPackages[]>(() => getStoredPricingCatalog());
  const [isPricesModalOpen, setIsPricesModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Selected Brand
  const [selectedBrandName, setSelectedBrandName] = useState<string>(
    initialQuoteData?.brand || 'Parva Weddings'
  );

  const activeBrand = useMemo(() => {
    return (
      catalog.find((b) => b.brand.toLowerCase() === selectedBrandName.toLowerCase()) ||
      catalog[0]
    );
  }, [catalog, selectedBrandName]);

  // Client and Meta Information
  const [client, setClient] = useState<QuoteClientInfo>(() => ({
    name: initialQuoteData?.client.name || '',
    phone: initialQuoteData?.client.phone || '',
    email: initialQuoteData?.client.email || '',
    eventDate: initialQuoteData?.client.eventDate || '',
    eventType: initialQuoteData?.client.eventType || 'Wedding & Reception',
    location: initialQuoteData?.client.location || 'Bangalore, Karnataka',
  }));

  const [quoteNumber, setQuoteNumber] = useState<string>(() => {
    if (initialQuoteData?.quoteNumber) return initialQuoteData.quoteNumber;
    return `QT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;
  });

  const [quoteDate, setQuoteDate] = useState<string>(() => {
    if (initialQuoteData?.quoteDate) return initialQuoteData.quoteDate;
    return new Date().toISOString().split('T')[0];
  });

  const [validUntil, setValidUntil] = useState<string>(() => {
    if (initialQuoteData?.validUntil) return initialQuoteData.validUntil;
    const d = new Date();
    d.setDate(d.getDate() + 15);
    return d.toISOString().split('T')[0];
  });

  // Selected Tier
  const [selectedTier, setSelectedTier] = useState<PackageTier | null>(() => {
    if (initialQuoteData?.selectedTier) return initialQuoteData.selectedTier;
    return activeBrand.tiers[0] || null;
  });

  // Line items (Addons & Custom items)
  const [lineItems, setLineItems] = useState<QuoteLineItem[]>(() => {
    if (initialQuoteData?.lineItems) return initialQuoteData.lineItems;
    return [];
  });

  // Custom Deliverable bullets
  const [customDeliverables, setCustomDeliverables] = useState<string[]>(() => {
    return initialQuoteData?.customDeliverables || [];
  });
  const [newDeliverableInput, setNewDeliverableInput] = useState('');

  // Negotiated total override
  const [manualOverride, setManualOverride] = useState<string>(() => {
    if (initialQuoteData?.negotiatedTotal) return initialQuoteData.negotiatedTotal.toString();
    return '';
  });

  const [specialNotes, setSpecialNotes] = useState<string>(() => {
    return initialQuoteData?.specialNotes || '';
  });

  const [isDownloading, setIsDownloading] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Calculations
  const basePrice = selectedTier ? selectedTier.price : 0;
  const addonsTotal = lineItems.reduce((sum, item) => sum + item.total, 0);
  const calculatedTotal = basePrice + addonsTotal;

  const overrideNum = parseFloat(manualOverride);
  const isOverridden = !isNaN(overrideNum) && overrideNum > 0 && manualOverride.trim() !== '';
  const finalTotal = isOverridden ? overrideNum : calculatedTotal;
  const discountAmount = isOverridden && overrideNum < calculatedTotal ? calculatedTotal - overrideNum : 0;

  // Complete Quote Document Object
  const quoteDocumentData: QuoteDocumentData = useMemo(() => {
    return {
      quoteNumber,
      quoteDate,
      validUntil,
      brand: activeBrand.brand,
      client,
      selectedTier,
      lineItems,
      customDeliverables,
      basePrice,
      addonsTotal,
      calculatedTotal,
      negotiatedTotal: isOverridden ? overrideNum : undefined,
      discountAmount,
      specialNotes,
    };
  }, [
    quoteNumber,
    quoteDate,
    validUntil,
    activeBrand.brand,
    client,
    selectedTier,
    lineItems,
    customDeliverables,
    basePrice,
    addonsTotal,
    calculatedTotal,
    isOverridden,
    overrideNum,
    discountAmount,
    specialNotes,
  ]);

  // Handlers
  const handleBrandChange = (brandName: string) => {
    setSelectedBrandName(brandName);
    const targetBrand = catalog.find((b) => b.brand.toLowerCase() === brandName.toLowerCase());
    if (targetBrand && targetBrand.tiers.length > 0) {
      setSelectedTier(targetBrand.tiers[0]);
    }
  };

  const handleAddAddon = (addon: { name: string; price: number; unit?: string }) => {
    const existing = lineItems.find((i) => i.name === addon.name);
    if (existing) {
      setLineItems(
        lineItems.map((i) =>
          i.id === existing.id
            ? { ...i, quantity: i.quantity + 1, total: (i.quantity + 1) * i.unitPrice }
            : i
        )
      );
      showToast(`Updated quantity for ${addon.name}`);
    } else {
      const newItem: QuoteLineItem = {
        id: `item-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
        name: addon.name + (addon.unit ? ` (${addon.unit})` : ''),
        unitPrice: addon.price,
        quantity: 1,
        total: addon.price,
        isAddon: true,
      };
      setLineItems([...lineItems, newItem]);
      showToast(`Added ${addon.name}`);
    }
  };

  const handleAddCustomItem = () => {
    const newItem: QuoteLineItem = {
      id: `custom-${Date.now()}`,
      name: 'Custom Service / Deliverable',
      unitPrice: 5000,
      quantity: 1,
      total: 5000,
      isAddon: false,
    };
    setLineItems([...lineItems, newItem]);
  };

  const handleUpdateLineItem = (id: string, field: 'name' | 'unitPrice' | 'quantity', val: any) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, [field]: val };
        if (field === 'unitPrice' || field === 'quantity') {
          const price = field === 'unitPrice' ? Number(val) || 0 : item.unitPrice;
          const qty = field === 'quantity' ? Number(val) || 1 : item.quantity;
          updated.total = price * qty;
        }
        return updated;
      })
    );
  };

  const handleRemoveLineItem = (id: string) => {
    setLineItems(lineItems.filter((i) => i.id !== id));
  };

  const handleAddDeliverable = () => {
    if (!newDeliverableInput.trim()) return;
    setCustomDeliverables([...customDeliverables, newDeliverableInput.trim()]);
    setNewDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    setCustomDeliverables(customDeliverables.filter((_, idx) => idx !== index));
  };

  const handleLoadSample = () => {
    setClient({
      name: 'Ananya Rao & Siddharth Varma',
      phone: '+91 98450 12345',
      email: 'ananya.siddharth@gmail.com',
      eventDate: '2026-11-20',
      eventType: 'Wedding & Sangeet Celebrations',
      location: 'The Leela Palace, Bengaluru',
    });
    setSelectedBrandName('Parva Weddings');
    const parvaBrand = catalog.find((b) => b.brand.includes('Wedding')) || catalog[0];
    if (parvaBrand) {
      setSelectedTier(parvaBrand.tiers[1] || parvaBrand.tiers[0]); // Mini Wedding
    }
    setLineItems([
      {
        id: 'sample-addon-1',
        name: 'Drone Coverage',
        unitPrice: 8000,
        quantity: 1,
        total: 8000,
        isAddon: true,
      },
      {
        id: 'sample-addon-2',
        name: 'Additional Instagram Reel',
        unitPrice: 4000,
        quantity: 2,
        total: 8000,
        isAddon: true,
      },
    ]);
    setCustomDeliverables(['1 Dedicated Teaser for WhatsApp invitation']);
    setManualOverride('80000');
    setSpecialNotes('Local venue travel within Bengaluru included. Sunset portrait session requested.');
    showToast('Loaded sample wedding lead!');
  };

  const handleStartFresh = () => {
    if (window.confirm('Reset all fields in this quotation?')) {
      setClient({
        name: '',
        phone: '',
        email: '',
        eventDate: '',
        eventType: 'Wedding & Reception',
        location: 'Bangalore, Karnataka',
      });
      setLineItems([]);
      setCustomDeliverables([]);
      setManualOverride('');
      setSpecialNotes('');
      showToast('Form cleared.');
    }
  };

  const handleSaveQuote = async () => {
    if (!client.name.trim()) {
      alert('Please enter a Client Name before saving.');
      return;
    }

    try {
      await saveDocumentAsync({
        documentType: 'Quotation',
        title: `Estimate #${quoteNumber} - ${client.name}`,
        clientName: client.name,
        bookingId: quoteNumber,
        status: 'Final',
        data: quoteDocumentData,
      });
      showToast('Quotation saved to Saved Documents archive!');
    } catch (err: any) {
      alert('Failed to save quote: ' + err.message);
    }
  };

  const handleDownloadPdf = async () => {
    setIsDownloading(true);
    try {
      const doc = <QuotePdfDocument quote={quoteDocumentData} />;
      const blob = await pdf(doc).toBlob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Quotation_${quoteNumber}_${client.name || 'Estimate'}.pdf`;
      link.click();
      URL.revokeObjectURL(url);
      showToast('Quotation PDF downloaded!');
    } catch (err: any) {
      console.error(err);
      alert('Failed to generate PDF: ' + err.message);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleCopySummary = () => {
    const lines = [
      `*${activeBrand.brand.toUpperCase()} | QUOTATION ESTIMATE*`,
      `*Estimate No:* ${quoteNumber}`,
      `*Prepared For:* ${client.name || 'Valued Client'}`,
      client.eventDate ? `*Date:* ${formatDocumentDate(client.eventDate)}` : '',
      client.location ? `*Venue:* ${client.location}` : '',
      '',
      selectedTier ? `*Package:* ${selectedTier.name} (${formatINR(basePrice)})` : '',
      selectedTier ? `• Coverage: ${selectedTier.coverage}` : '',
      selectedTier ? `• Crew: ${selectedTier.crew}` : '',
      selectedTier?.deliverables ? `• Deliverables: ${selectedTier.deliverables.slice(0, 4).join(', ')}` : '',
      '',
      lineItems.length > 0 ? '*Additional Services:*' : '',
      ...lineItems.map((item) => `• ${item.name} (${item.quantity}x): ${formatINR(item.total)}`),
      lineItems.length > 0 ? '' : '',
      `*Total Investment:* ${formatINR(finalTotal)}`,
      discountAmount > 0 ? `_(Includes courtesy adjustment of ${formatINR(discountAmount)})_` : '',
      '',
      `*Payment Schedule:*`,
      `• 50% Advance on Booking: ${formatINR(Math.round(finalTotal * 0.5))}`,
      `• 30% Prior to Event: ${formatINR(Math.round(finalTotal * 0.3))}`,
      `• 20% Before File Release: ${formatINR(finalTotal - Math.round(finalTotal * 0.5) - Math.round(finalTotal * 0.3))}`,
      '',
      `Valid for 15 days from issue. GST currently not charged.`,
      `The House of Parva • Ocean and Origin`,
    ].filter(Boolean);

    navigator.clipboard.writeText(lines.join('\n'));
    showToast('Quotation summary copied to clipboard for WhatsApp/Email!');
  };

  const handleConvertToBooking = () => {
    if (!client.name.trim()) {
      alert('Please specify a Client Name before converting to booking.');
      return;
    }

    // Populate Master Agreement & Schedule in DocumentContext
    setDocument((prev) => {
      const allDeliverables = [
        ...(selectedTier?.deliverables || []),
        ...customDeliverables,
        ...lineItems.map((i) => `${i.name} (x${i.quantity})`),
      ];

      return {
        ...prev,
        client: {
          ...prev.client,
          name: client.name,
          phone: client.phone || prev.client.phone,
          email: client.email || prev.client.email,
        },
        booking: {
          ...prev.booking,
          eventType: client.eventType || prev.booking.eventType,
          eventDate: client.eventDate || prev.booking.eventDate,
          location: client.location || prev.booking.location,
        },
        services: {
          ...prev.services,
          packageName: selectedTier?.name || prev.services.packageName,
          teamDetails: selectedTier?.crew || prev.services.teamDetails,
        },
        deliverables: {
          items: allDeliverables.length > 0 ? allDeliverables : prev.deliverables.items,
        },
        commercial: {
          ...prev.commercial,
          totalFee: finalTotal,
          bookingAdvance: Math.round(finalTotal * 0.5),
          preEventPayment: Math.round(finalTotal * 0.3),
          finalPayment: finalTotal - Math.round(finalTotal * 0.5) - Math.round(finalTotal * 0.3),
          invoiceReference: `INV-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        },
        specialTerms: {
          text: specialNotes || prev.specialTerms.text,
        },
      };
    });

    // Populate Invoice in DocumentContext
    setInvoice((prev) => {
      const invoiceItems = [];
      if (selectedTier) {
        invoiceItems.push({
          id: 'inv-base-pkg',
          description: `Package: ${selectedTier.name} (${selectedTier.coverage})`,
          quantity: 1,
          rate: basePrice,
          amount: basePrice,
        });
      }
      lineItems.forEach((li, idx) => {
        invoiceItems.push({
          id: `inv-addon-${idx}`,
          description: li.name,
          quantity: li.quantity,
          rate: li.unitPrice,
          amount: li.total,
        });
      });

      return {
        ...prev,
        client: {
          ...prev.client,
          name: client.name,
          phone: client.phone || prev.client.phone,
          email: client.email || prev.client.email,
        },
        booking: {
          ...prev.booking,
          eventType: client.eventType || prev.booking.eventType,
          eventDate: client.eventDate || prev.booking.eventDate,
          location: client.location || prev.booking.location,
        },
        lineItems: invoiceItems.length > 0 ? invoiceItems : prev.lineItems,
        discount: discountAmount,
      };
    });

    showToast('Transferred quote into Booking Workspace!');
    if (onNavigate) {
      onNavigate('booking');
    }
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-16">
      {/* Top Banner */}
      <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#581825]">
            <FileSpreadsheet className="w-5 h-5" />
            <span className="text-xs uppercase tracking-widest font-semibold font-serif">
              Studio Quoting Engine
            </span>
          </div>
          <h1 className="font-serif text-2xl text-[#221F20] mt-1 font-bold">
            Quotation & Commercial Estimate Generator
          </h1>
          <p className="text-xs text-[#78716C] mt-0.5">
            Select studio packages, add production services, and generate editorial quotes linked to Prices.md.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => setIsPricesModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#581825] bg-[#FAF2F4] hover:bg-[#F3E2E6] border border-[#ECC7D0] rounded-lg transition-colors shadow-2xs"
            title="Upload Prices.md or edit rates"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Upload / Edit Prices.md</span>
          </button>

          <button
            onClick={handleLoadSample}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#78716C] hover:text-[#221F20] bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Sample Lead</span>
          </button>

          <button
            onClick={handleStartFresh}
            className="p-2 text-[#78716C] hover:text-[#221F20] bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg transition-colors"
            title="Clear form"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Toast */}
      {toastMessage && (
        <div className="p-3.5 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs flex items-center justify-between shadow-xs animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
            <span className="font-medium">{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Main Two-Column Work Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Form (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Card 1: Brand Selection */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-4">
            <label className="text-xs uppercase tracking-wider font-semibold font-serif text-[#581825] block">
              1. Brand Catalog
            </label>
            <div className="grid grid-cols-3 gap-3">
              {catalog.map((brand) => {
                const isSelected =
                  selectedBrandName.toLowerCase() === brand.brand.toLowerCase();
                return (
                  <button
                    key={brand.brand}
                    type="button"
                    onClick={() => handleBrandChange(brand.brand)}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? 'border-[#581825] bg-[#FAF2F4] ring-1 ring-[#581825] shadow-xs'
                        : 'border-[#E7DFD5] bg-[#FAF8F5] hover:bg-[#F3EDE5] hover:border-[#D8CEBE]'
                    }`}
                  >
                    <span className="text-xl block mb-1">{brand.emoji}</span>
                    <p className="text-xs font-serif font-bold text-[#221F20]">
                      {brand.brand}
                    </p>
                    <p className="text-[10px] text-[#78716C] line-clamp-1 mt-0.5">
                      {brand.tiers.length} packages
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Card 2: Client & Assignment Info */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-4">
            <label className="text-xs uppercase tracking-wider font-semibold font-serif text-[#581825] block">
              2. Client & Assignment Details
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Client Name(s) *
                </label>
                <input
                  type="text"
                  value={client.name}
                  onChange={(e) => setClient({ ...client, name: e.target.value })}
                  placeholder="e.g. Priya Sharma & Rahul Verma"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] font-medium focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Event / Assignment Type
                </label>
                <input
                  type="text"
                  value={client.eventType}
                  onChange={(e) => setClient({ ...client, eventType: e.target.value })}
                  placeholder="e.g. Wedding & Sangeet"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={client.phone}
                  onChange={(e) => setClient({ ...client, phone: e.target.value })}
                  placeholder="+91 98450 12345"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] font-mono focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={client.email}
                  onChange={(e) => setClient({ ...client, email: e.target.value })}
                  placeholder="client@example.com"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Shoot Date(s)
                </label>
                <input
                  type="date"
                  value={client.eventDate}
                  onChange={(e) => setClient({ ...client, eventDate: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Venue / Location
                </label>
                <input
                  type="text"
                  value={client.location}
                  onChange={(e) => setClient({ ...client, location: e.target.value })}
                  placeholder="e.g. Bangalore, Karnataka"
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Quotation / Estimate Ref
                </label>
                <input
                  type="text"
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Issue Date
                  </label>
                  <input
                    type="date"
                    value={quoteDate}
                    onChange={(e) => setQuoteDate(e.target.value)}
                    className="w-full px-2 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-2 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Base Package Tier Selection */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#EAE3D9]">
              <label className="text-xs uppercase tracking-wider font-semibold font-serif text-[#581825]">
                3. Base Package ({activeBrand.brand})
              </label>
              <span className="text-[11px] text-[#78716C]">Choose 1 core tier</span>
            </div>

            <div className="space-y-3">
              {activeBrand.tiers.map((tier) => {
                const isSelected = selectedTier?.id === tier.id;
                return (
                  <div
                    key={tier.id}
                    onClick={() => setSelectedTier(tier)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#581825] bg-[#FAF2F4] ring-1 ring-[#581825] shadow-xs'
                        : 'border-[#E7DFD5] bg-[#FAF8F5] hover:bg-[#F3EDE5]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-full border mt-0.5 flex items-center justify-center shrink-0 ${
                            isSelected
                              ? 'border-[#581825] bg-[#581825] text-white'
                              : 'border-[#D8CEBE] bg-white'
                          }`}
                        >
                          {isSelected && <Check className="w-2.5 h-2.5 stroke-[3]" />}
                        </div>
                        <div>
                          <p className="font-serif text-sm font-bold text-[#221F20]">
                            {tier.name}
                          </p>
                          <p className="text-[11px] text-[#78716C] mt-0.5">
                            {tier.coverage} • Crew: {tier.crew}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="font-serif text-base font-bold text-[#581825]">
                          {formatINR(tier.price)}
                        </span>
                      </div>
                    </div>

                    {/* Deliverables snippet */}
                    {tier.deliverables && tier.deliverables.length > 0 && (
                      <div className="mt-2.5 pt-2.5 border-t border-[#EAE3D9] flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-[#4A4646]">
                        {tier.deliverables.map((item, idx) => (
                          <span key={idx} className="flex items-center gap-1">
                            <span className="text-[#581825]">•</span>
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 4: Add-ons & Production Extras */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-1 border-b border-[#EAE3D9]">
              <label className="text-xs uppercase tracking-wider font-semibold font-serif text-[#581825]">
                4. Studio Add-ons & Extra Services
              </label>
              <button
                type="button"
                onClick={handleAddCustomItem}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#581825] hover:underline"
              >
                <Plus className="w-3 h-3" />
                <span>Custom Item</span>
              </button>
            </div>

            {/* Quick-add Addon Badges */}
            {activeBrand.addons.length > 0 && (
              <div>
                <p className="text-[11px] text-[#78716C] mb-2 font-medium">
                  Click to add from {activeBrand.brand} price catalogue:
                </p>
                <div className="flex flex-wrap gap-2">
                  {activeBrand.addons.map((addon) => (
                    <button
                      key={addon.id || addon.name}
                      type="button"
                      onClick={() => handleAddAddon(addon)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF8F5] border border-[#D8CEBE] hover:border-[#581825] hover:bg-[#FAF2F4] text-xs transition-colors group"
                    >
                      <Plus className="w-3 h-3 text-[#78716C] group-hover:text-[#581825]" />
                      <span className="font-medium text-[#221F20]">{addon.name}</span>
                      <span className="font-mono text-[#581825] font-semibold">
                        {formatINR(addon.price)}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Line Items Table */}
            {lineItems.length > 0 ? (
              <div className="space-y-2 pt-2">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-[#4A4646]">
                  Selected Extra Line Items ({lineItems.length})
                </p>
                <div className="border border-[#D8CEBE] rounded-xl overflow-hidden divide-y divide-[#EAE3D9] text-xs">
                  {lineItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-3 bg-white flex items-center justify-between gap-3"
                    >
                      <div className="flex-1">
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleUpdateLineItem(item.id, 'name', e.target.value)}
                          className="w-full font-medium text-xs text-[#221F20] bg-transparent border-b border-transparent hover:border-[#D8CEBE] focus:border-[#581825] focus:outline-none"
                        />
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-1">
                          <label className="text-[10px] text-[#78716C]">Qty:</label>
                          <input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) =>
                              handleUpdateLineItem(item.id, 'quantity', e.target.value)
                            }
                            className="w-12 px-1.5 py-0.5 border border-[#D8CEBE] rounded font-mono text-center text-xs"
                          />
                        </div>

                        <div className="flex items-center gap-1">
                          <label className="text-[10px] text-[#78716C]">Rate:</label>
                          <input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) =>
                              handleUpdateLineItem(item.id, 'unitPrice', e.target.value)
                            }
                            className="w-20 px-1.5 py-0.5 border border-[#D8CEBE] rounded font-mono text-right text-xs"
                          />
                        </div>

                        <div className="w-20 text-right font-mono font-bold text-[#581825]">
                          {formatINR(item.total)}
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemoveLineItem(item.id)}
                          className="p-1 text-[#9E9486] hover:text-[#A82B3E] transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <p className="text-[11px] text-[#78716C] italic pt-1">
                No add-ons added yet. Click any badge above or "Custom Item" to add extras.
              </p>
            )}
          </div>

          {/* Card 5: Custom Deliverable Notes & Riders */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-4">
            <label className="text-xs uppercase tracking-wider font-semibold font-serif text-[#581825] block">
              5. Notes, Terms & Custom Deliverable Bullets
            </label>

            {/* Custom Deliverable list */}
            <div>
              <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                Extra Deliverable Bullets (Appears in quotation checklist):
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newDeliverableInput}
                  onChange={(e) => setNewDeliverableInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDeliverable())}
                  placeholder="e.g. 1 60-second vertical teaser for Instagram"
                  className="flex-1 px-3 py-1.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20]"
                />
                <button
                  type="button"
                  onClick={handleAddDeliverable}
                  className="px-3 py-1.5 text-xs font-semibold text-[#581825] bg-[#FAF2F4] border border-[#ECC7D0] rounded-lg hover:bg-[#F3E2E6]"
                >
                  Add Bullet
                </button>
              </div>

              {customDeliverables.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {customDeliverables.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#FAF8F5] border border-[#D8CEBE] text-[11px] text-[#221F20]"
                    >
                      <span>{item}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveDeliverable(idx)}
                        className="text-[#9E9486] hover:text-[#A82B3E]"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                Special Notes / Travel Riders (Printed on estimate):
              </label>
              <textarea
                value={specialNotes}
                onChange={(e) => setSpecialNotes(e.target.value)}
                rows={2}
                placeholder="e.g. Travel and stay within Bangalore venue covered. Sunset couple portrait session scheduled."
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825]"
              />
            </div>
          </div>
        </div>

        {/* Right Sticky Preview & Commercial Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-6">
          {/* Commercial Calculation Summary Card */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-4">
            <h2 className="text-xs uppercase tracking-wider font-semibold font-serif text-[#581825] pb-2 border-b border-[#EAE3D9]">
              Commercial Summary & Final Total
            </h2>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#78716C]">
                <span>Base Package ({selectedTier?.name || 'None'}):</span>
                <span className="font-mono font-medium">{formatINR(basePrice)}</span>
              </div>
              <div className="flex justify-between text-[#78716C]">
                <span>Add-ons & Extras ({lineItems.length}):</span>
                <span className="font-mono font-medium">{formatINR(addonsTotal)}</span>
              </div>
              <div className="pt-2 border-t border-[#EAE3D9] flex justify-between text-sm font-semibold text-[#221F20]">
                <span>Calculated Total:</span>
                <span className="font-mono">{formatINR(calculatedTotal)}</span>
              </div>

              {/* Negotiated Override */}
              <div className="pt-3 border-t border-dashed border-[#D8CEBE]">
                <label className="block text-[11px] font-medium text-[#581825] mb-1">
                  Negotiated Total / Courtesy Adjustment (Optional)
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-[#78716C]">₹</span>
                  <input
                    type="number"
                    value={manualOverride}
                    onChange={(e) => setManualOverride(e.target.value)}
                    placeholder={`e.g. ${calculatedTotal > 0 ? calculatedTotal : 50000}`}
                    className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono font-bold text-[#581825] focus:outline-none focus:border-[#581825]"
                  />
                  {manualOverride && (
                    <button
                      type="button"
                      onClick={() => setManualOverride('')}
                      className="text-[10px] text-[#78716C] hover:underline shrink-0"
                    >
                      Clear
                    </button>
                  )}
                </div>
                {discountAmount > 0 && (
                  <p className="text-[10px] text-[#16a34a] font-medium mt-1">
                    Special Courtesy Discount applied: -{formatINR(discountAmount)}
                  </p>
                )}
              </div>

              {/* Final Payable */}
              <div className="pt-3 border-t border-[#581825] flex justify-between items-baseline">
                <span className="font-serif text-sm font-bold text-[#221F20]">
                  Final Quoted Total:
                </span>
                <span className="font-serif text-xl font-bold text-[#581825]">
                  {formatINR(finalTotal)}
                </span>
              </div>

              {/* Milestones */}
              <div className="p-3 bg-[#FAF8F5] border border-[#E7DFD5] rounded-xl text-[10.5px] space-y-1 text-[#4A4646]">
                <p className="font-semibold text-[#581825]">Suggested Payment Terms (50/30/20):</p>
                <div className="flex justify-between">
                  <span>50% Advance (Booking lock):</span>
                  <span className="font-mono font-medium">{formatINR(Math.round(finalTotal * 0.5))}</span>
                </div>
                <div className="flex justify-between">
                  <span>30% Pre-Event:</span>
                  <span className="font-mono font-medium">{formatINR(Math.round(finalTotal * 0.3))}</span>
                </div>
                <div className="flex justify-between">
                  <span>20% Final (On file delivery):</span>
                  <span className="font-mono font-medium">
                    {formatINR(finalTotal - Math.round(finalTotal * 0.5) - Math.round(finalTotal * 0.3))}
                  </span>
                </div>
              </div>
            </div>

            {/* Main Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleConvertToBooking}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#581825] hover:bg-[#43121C] rounded-xl shadow-xs transition-colors"
              >
                <span>Convert to Booking Agreement & Invoice</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPdf}
                  disabled={isDownloading}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#221F20] bg-[#FAF8F5] hover:bg-[#F3EDE5] border border-[#D8CEBE] rounded-lg transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#581825]" />
                  <span>{isDownloading ? 'Generating...' : 'Download PDF'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopySummary}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#221F20] bg-[#FAF8F5] hover:bg-[#F3EDE5] border border-[#D8CEBE] rounded-lg transition-colors"
                  title="Copy formatted quotation for WhatsApp or Email"
                >
                  <Copy className="w-3.5 h-3.5 text-[#581825]" />
                  <span>Copy WhatsApp</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleSaveQuote}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#78716C] hover:text-[#221F20] bg-white border border-[#D8CEBE] rounded-lg transition-colors"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Save Quotation</span>
                </button>

                <button
                  type="button"
                  onClick={() => window.print()}
                  className="inline-flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-medium text-[#78716C] hover:text-[#221F20] bg-white border border-[#D8CEBE] rounded-lg transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print</span>
                </button>
              </div>
            </div>
          </div>

          {/* Live Document Preview Box (Isolated Scroll Canvas) */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-4 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-[#EAE3D9]">
              <span className="text-xs font-serif font-bold text-[#581825]">
                Quotation Preview
              </span>
              <span className="text-[10px] text-[#78716C]">
                Official Editorial Document
              </span>
            </div>

            {/* Scrollable preview canvas */}
            <div className="h-[60vh] min-h-[460px] max-h-[720px] overflow-y-auto overflow-x-auto overscroll-contain bg-[#EFE9E0]/40 p-4 rounded-xl border border-[#E7DFD5]">
              <div className="origin-top scale-[0.62] sm:scale-[0.72] w-fit mx-auto transition-transform">
                <QuoteDocumentPreview quote={quoteDocumentData} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Prices.md Upload & Editor Modal */}
      <PricesEditorModal
        isOpen={isPricesModalOpen}
        onClose={() => setIsPricesModalOpen(false)}
        packages={catalog}
        onCatalogueUpdated={(updated) => {
          setCatalog(updated);
          const currentBrandObj = updated.find(
            (b) => b.brand.toLowerCase() === selectedBrandName.toLowerCase()
          );
          if (currentBrandObj && currentBrandObj.tiers.length > 0) {
            setSelectedTier(currentBrandObj.tiers[0]);
          }
        }}
      />
    </div>
  );
};
