import React, { createContext, useContext, useState, useMemo, useEffect } from 'react';
import { 
  BookingDocumentData, 
  InvoiceDocumentData, 
  ClientData, 
  BookingDetails, 
  ServicesData, 
  CommercialData, 
  DeliveryData, 
  SpecialTermsData, 
  SignaturesData,
  BankDetails,
  ValidationResult
} from '../types/document';
import { 
  createDefaultBookingData, 
  SAMPLE_AGREEMENT_FIXTURE, 
  SAMPLE_INVOICE_FIXTURE,
  getStoredCompanyProfile
} from '../utils/defaults';
import { calculateMilestones, calculateInvoiceTotals, derivePaymentStatus, type MilestoneKey } from '../utils/calculations';
import { buildSyncedInvoice } from '../utils/invoiceSync';
import { validateBookingDocument, validateInvoiceDocument } from '../utils/validation';

const DRAFT_STORAGE_KEY = 'parva_active_draft_v1';

function readStoredDraft(): { document?: BookingDocumentData; invoice?: InvoiceDocumentData } | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') return parsed;
  } catch (err) {
    console.error('Failed to read active draft from storage:', err);
  }
  return null;
}

interface DocumentContextType {
  document: BookingDocumentData;
  invoice: InvoiceDocumentData;
  setDocument: React.Dispatch<React.SetStateAction<BookingDocumentData>>;
  setInvoice: React.Dispatch<React.SetStateAction<InvoiceDocumentData>>;
  updateClient: (patch: Partial<ClientData>) => void;
  updateBooking: (patch: Partial<BookingDetails>) => void;
  updateServices: (patch: Partial<ServicesData>) => void;
  updateDeliverables: (items: string[]) => void;
  updateCommercial: (patch: Partial<CommercialData>, autoRecalculateMilestones?: boolean) => void;
  updateDelivery: (patch: Partial<DeliveryData>) => void;
  updateSpecialTerms: (patch: Partial<SpecialTermsData>) => void;
  updateSignatures: (patch: Partial<SignaturesData>) => void;
  updateInvoice: (patch: Partial<InvoiceDocumentData>) => void;
  updateBankDetails: (patch: Partial<BankDetails>) => void;
  updateMilestonePayment: (which: MilestoneKey, amount: number) => void;
  syncInvoiceFromBooking: () => void;
  syncBookingFromInvoice: () => void;
  documentValidation: ValidationResult;
  invoiceValidation: ValidationResult;
  loadSampleAgreement: () => void;
  loadSampleInvoice: () => void;
  resetDocument: () => void;
  resetAllData: () => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Initialize from active draft if available, or fall back to luxury wedding fixtures
  const [document, setDocument] = useState<BookingDocumentData>(() => {
    const draft = readStoredDraft();
    return draft?.document || SAMPLE_AGREEMENT_FIXTURE;
  });
  const [invoice, setInvoice] = useState<InvoiceDocumentData>(() => {
    const draft = readStoredDraft();
    if (draft?.invoice) return draft.invoice;
    const profile = getStoredCompanyProfile();
    return {
      ...SAMPLE_INVOICE_FIXTURE,
      bankDetails: { ...profile.bankDetails },
    };
  });

  // Debounced auto-save active draft to localStorage
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const handle = setTimeout(() => {
      try {
        localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify({ document, invoice }));
      } catch (err) {
        console.error('Failed to auto-save active draft:', err);
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [document, invoice]);

  // Synchronized client updater: edits in Agreement or Schedule auto-propagate to Invoice
  const updateClient = (patch: Partial<ClientData>) => {
    setDocument((prev) => ({ ...prev, client: { ...prev.client, ...patch }, updatedAt: new Date().toISOString() }));
    setInvoice((prev) => ({ ...prev, client: { ...prev.client, ...patch }, updatedAt: new Date().toISOString() }));
  };

  // Synchronized booking updater: dates, venue, and IDs auto-propagate across all documents
  const updateBooking = (patch: Partial<BookingDetails>) => {
    setDocument((prev) => ({ ...prev, booking: { ...prev.booking, ...patch }, updatedAt: new Date().toISOString() }));
    setInvoice((prev) => ({ ...prev, booking: { ...prev.booking, ...patch }, updatedAt: new Date().toISOString() }));
  };

  const updateServices = (patch: Partial<ServicesData>) => {
    setDocument((prev) => ({ ...prev, services: { ...prev.services, ...patch }, updatedAt: new Date().toISOString() }));
  };

  const updateDeliverables = (items: string[]) => {
    setDocument((prev) => ({ ...prev, deliverables: { items }, updatedAt: new Date().toISOString() }));
  };

  // Commercial updater: recalculates 50/30/20 milestones and syncs commercial charges
  const updateCommercial = (patch: Partial<CommercialData>, autoRecalculateMilestones: boolean = true) => {
    setDocument((prev) => {
      const nextCommercial = { ...prev.commercial, ...patch };
      if (autoRecalculateMilestones && patch.totalFee !== undefined) {
        const milestones = calculateMilestones(patch.totalFee);
        nextCommercial.bookingAdvance = milestones.bookingAdvance;
        nextCommercial.preEventPayment = milestones.preEventPayment;
        nextCommercial.finalPayment = milestones.finalPayment;
      }
      return { ...prev, commercial: nextCommercial, updatedAt: new Date().toISOString() };
    });

    setInvoice((prev) => {
      const nextCommercial = { ...prev.commercial, ...patch };
      // Keep the invoice's main (auto-generated) line item in step with the
      // agreed fee, so the invoice total — and therefore the invoice milestone
      // dues (50/30/20 of that total) — reflect fee changes immediately.
      // Custom line items the user added themselves are never touched.
      let lineItems = prev.lineItems;
      if (patch.totalFee !== undefined && lineItems.some((li) => li.id === 'item-1')) {
        const fee = Math.max(0, Math.round(patch.totalFee || 0));
        lineItems = lineItems.map((li) =>
          li.id === 'item-1' ? { ...li, rate: fee, amount: fee } : li,
        );
      }
      // Re-derive status against the (possibly new) invoice total so it never
      // goes stale when dues move. Received amounts are preserved.
      const totals = calculateInvoiceTotals({
        lineItems,
        additionalCharges: nextCommercial.additionalCharges,
        discount: prev.discount,
        taxEnabled: prev.taxEnabled,
        taxRate: prev.taxRate,
        amountPaid: 0,
      });
      const hasExplicitMilestonePaid =
        prev.advancePaid !== undefined || prev.preEventPaid !== undefined || prev.finalPaid !== undefined;
      const effectivePaid = hasExplicitMilestonePaid
        ? (prev.advancePaid ?? 0) + (prev.preEventPaid ?? 0) + (prev.finalPaid ?? 0)
        : (prev.amountPaid || 0);
      return {
        ...prev,
        commercial: nextCommercial,
        lineItems,
        paymentStatus: derivePaymentStatus(totals.totalAmount, effectivePaid),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const updateDelivery = (patch: Partial<DeliveryData>) => {
    setDocument((prev) => ({ ...prev, delivery: { ...prev.delivery, ...patch }, updatedAt: new Date().toISOString() }));
  };

  const updateSpecialTerms = (patch: Partial<SpecialTermsData>) => {
    setDocument((prev) => ({ ...prev, specialTerms: { ...prev.specialTerms, ...patch }, updatedAt: new Date().toISOString() }));
  };

  const updateSignatures = (patch: Partial<SignaturesData>) => {
    setDocument((prev) => ({ ...prev, signatures: { ...prev.signatures, ...patch }, updatedAt: new Date().toISOString() }));
  };

  const updateInvoice = (patch: Partial<InvoiceDocumentData>) => {
    setInvoice((prev) => ({ ...prev, ...patch, updatedAt: new Date().toISOString() }));
  };

  /**
   * Records a payment against one invoice milestone (Advance / Pre-event / Final).
   * Clamps to that milestone's due share of the invoice total, then keeps
   * amountPaid + paymentStatus in sync automatically.
   */
  const updateMilestonePayment = (which: MilestoneKey, amount: number) => {
    setInvoice((prev) => {
      const totals = calculateInvoiceTotals({
        lineItems: prev.lineItems,
        additionalCharges: prev.commercial.additionalCharges,
        discount: prev.discount,
        taxEnabled: prev.taxEnabled,
        taxRate: prev.taxRate,
        amountPaid: 0,
      });
      const dues = calculateMilestones(totals.totalAmount);
      const dueFor: Record<MilestoneKey, number> = {
        advance: dues.bookingAdvance,
        preEvent: dues.preEventPayment,
        final: dues.finalPayment,
      };
      const fieldFor: Record<MilestoneKey, 'advancePaid' | 'preEventPaid' | 'finalPaid'> = {
        advance: 'advancePaid',
        preEvent: 'preEventPaid',
        final: 'finalPaid',
      };
      const clean = Math.max(0, Math.min(Math.round(amount || 0), dueFor[which]));
      const next = {
        advancePaid: prev.advancePaid ?? 0,
        preEventPaid: prev.preEventPaid ?? 0,
        finalPaid: prev.finalPaid ?? 0,
      };
      // Migrate legacy amountPaid-only invoices on first milestone edit.
      if (prev.advancePaid === undefined && prev.preEventPaid === undefined && prev.finalPaid === undefined && (prev.amountPaid || 0) > 0) {
        let remaining = Math.max(0, Math.round(prev.amountPaid));
        next.advancePaid = Math.min(remaining, dueFor.advance);
        remaining -= next.advancePaid;
        next.preEventPaid = Math.min(remaining, dueFor.preEvent);
        remaining -= next.preEventPaid;
        next.finalPaid = Math.min(remaining, dueFor.final);
      }
      next[fieldFor[which]] = clean;
      const totalPaid = next.advancePaid + next.preEventPaid + next.finalPaid;
      return {
        ...prev,
        ...next,
        amountPaid: totalPaid,
        paymentStatus: derivePaymentStatus(totals.totalAmount, totalPaid),
        updatedAt: new Date().toISOString(),
      };
    });
  };

  // Full manual sync: copies package name, totalFee, and additional charges into invoice line items
  const syncInvoiceFromBooking = () => {
    setInvoice((prev) => buildSyncedInvoice(document, prev));
  };

  const syncBookingFromInvoice = () => {
    setDocument((prev) => ({
      ...prev,
      client: { ...invoice.client },
      booking: { ...invoice.booking },
      commercial: {
        ...prev.commercial,
        invoiceReference: invoice.invoiceNumber,
      },
      updatedAt: new Date().toISOString(),
    }));
  };

  const documentValidation = useMemo(() => validateBookingDocument(document), [document]);
  const invoiceValidation = useMemo(() => validateInvoiceDocument(invoice), [invoice]);

  const loadSampleAgreement = () => {
    setDocument(SAMPLE_AGREEMENT_FIXTURE);
    setInvoice((prev) => ({
      ...prev,
      client: { ...SAMPLE_AGREEMENT_FIXTURE.client },
      booking: { ...SAMPLE_AGREEMENT_FIXTURE.booking },
      commercial: { ...SAMPLE_AGREEMENT_FIXTURE.commercial },
    }));
  };

  const loadSampleInvoice = () => {
    setInvoice(SAMPLE_INVOICE_FIXTURE);
    setDocument((prev) => ({
      ...prev,
      client: { ...SAMPLE_INVOICE_FIXTURE.client },
      booking: { ...SAMPLE_INVOICE_FIXTURE.booking },
    }));
  };

  const updateBankDetails = (patch: Partial<BankDetails>) => {
    setInvoice((prev) => {
      const current = prev.bankDetails || getStoredCompanyProfile().bankDetails;
      return {
        ...prev,
        bankDetails: {
          ...current,
          ...patch,
        },
        updatedAt: new Date().toISOString(),
      };
    });
  };

  const resetDocument = () => {
    setDocument(createDefaultBookingData('Agreement'));
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {}
    }
  };

  const resetAllData = () => {
    setDocument(SAMPLE_AGREEMENT_FIXTURE);
    setInvoice({
      ...SAMPLE_INVOICE_FIXTURE,
      bankDetails: { ...getStoredCompanyProfile().bankDetails },
    });
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {}
    }
  };

  return (
    <DocumentContext.Provider
      value={{
        document,
        invoice,
        setDocument,
        setInvoice,
        updateClient,
        updateBooking,
        updateServices,
        updateDeliverables,
        updateCommercial,
        updateDelivery,
        updateSpecialTerms,
        updateSignatures,
        updateInvoice,
        updateBankDetails,
        updateMilestonePayment,
        syncInvoiceFromBooking,
        syncBookingFromInvoice,
        documentValidation,
        invoiceValidation,
        loadSampleAgreement,
        loadSampleInvoice,
        resetDocument,
        resetAllData,
      }}
    >
      {children}
    </DocumentContext.Provider>
  );
};

export function useDocument() {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocument must be used within a DocumentProvider');
  }
  return context;
}
