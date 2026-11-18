import React, { useMemo, useState } from 'react';
import {
  User, Camera, CreditCard, CheckSquare, ArrowLeft, ArrowRight,
  Download, Loader2, CheckCircle2, RefreshCw, Cloud, HardDrive,
} from 'lucide-react';
import { pdf } from '@react-pdf/renderer';
import { useDocument } from '../context/DocumentContext';
import { ClientStep } from '../components/agreement/ClientStep';
import { BookingStep } from '../components/agreement/BookingStep';
import { ServicesStep } from '../components/agreement/ServicesStep';
import { DeliveryStep } from '../components/agreement/DeliveryStep';
import { TermsSignaturesStep } from '../components/agreement/TermsSignaturesStep';
import { CommercialStep } from '../components/agreement/CommercialStep';
import { AgreementDocumentPreview } from '../components/preview/AgreementDocumentPreview';
import { AgreementPdfDocument } from '../components/preview/AgreementPdfDocument';
import { BookingSchedulePreview } from '../components/booking-schedule/BookingSchedulePreview';
import { BookingSchedulePdfDocument } from '../components/booking-schedule/BookingSchedulePdfDocument';
import { InvoiceDocumentPreview } from '../components/invoice/InvoiceDocumentPreview';
import { InvoicePdfDocument } from '../components/invoice/InvoicePdfDocument';
import { saveDocumentAsync, getConnectionMode, type ConnectionMode } from '../utils/storage';
import { buildSyncedInvoice } from '../utils/invoiceSync';
import { calculateInvoiceTotals, calculateMilestoneSchedule, formatINR } from '../utils/calculations';
import { MilestonePaymentTracker } from '../components/invoice/MilestonePaymentTracker';

const STEPS = [
  { id: 'details', label: 'Client & Booking', icon: User },
  { id: 'services', label: 'Services & Delivery', icon: Camera },
  { id: 'money', label: 'Money & Invoice', icon: CreditCard },
  { id: 'review', label: 'Review & Save', icon: CheckSquare },
];

type PreviewKind = 'agreement' | 'schedule' | 'invoice';

export const BookingWorkspaceView: React.FC = () => {
  const [step, setStep] = useState(0);
  const [preview, setPreview] = useState<PreviewKind>('agreement');
  const [saving, setSaving] = useState(false);
  const [savedMode, setSavedMode] = useState<ConnectionMode | null>(null);
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [downloading, setDownloading] = useState<PreviewKind | null>(null);

  const {
    document, invoice,
    updateClient, updateBooking, updateServices, updateDeliverables,
    updateCommercial, updateDelivery, updateSpecialTerms, updateSignatures,
    updateInvoice, updateBankDetails, updateMilestonePayment, syncInvoiceFromBooking, setInvoice,
    documentValidation, invoiceValidation,
    loadSampleAgreement, resetDocument,
  } = useDocument();

  const errorsMap = useMemo(() => {
    const map: Record<string, string> = {};
    for (const e of [...documentValidation.errors, ...invoiceValidation.errors]) map[e.field] = e.message;
    return map;
  }, [documentValidation, invoiceValidation]);

  const totals = useMemo(
    () =>
      calculateInvoiceTotals({
        lineItems: invoice.lineItems,
        additionalCharges: invoice.commercial.additionalCharges,
        discount: invoice.discount,
        taxEnabled: invoice.taxEnabled,
        taxRate: invoice.taxRate,
        amountPaid: (invoice.advancePaid ?? 0) + (invoice.preEventPaid ?? 0) + (invoice.finalPaid ?? 0) || invoice.amountPaid,
      }),
    [invoice],
  );

  const schedule = useMemo(
    () =>
      calculateMilestoneSchedule({
        lineItems: invoice.lineItems,
        additionalCharges: invoice.commercial.additionalCharges,
        discount: invoice.discount,
        taxEnabled: invoice.taxEnabled,
        taxRate: invoice.taxRate,
        advancePaid: invoice.advancePaid,
        preEventPaid: invoice.preEventPaid,
        finalPaid: invoice.finalPaid,
        amountPaid: invoice.amountPaid,
      }),
    [invoice],
  );

  const handleSaveAll = async () => {
    setSaving(true);
    try {
      // Build the synced invoice purely (no stale-closure race with setState).
      const syncedInvoice = buildSyncedInvoice(document, invoice);
      setInvoice(syncedInvoice);
      const bookingId = document.booking.bookingId || 'PARVA-2026';
      const client = document.client.name || 'Client';
      let mode: ConnectionMode = getConnectionMode();
      const a = await saveDocumentAsync({
        documentType: 'Agreement',
        title: `Agreement — ${client} (${bookingId})`,
        clientName: document.client.name,
        bookingId,
        status: 'Final',
        data: document,
      });
      mode = a.mode;
      const s = await saveDocumentAsync({
        documentType: 'Booking Schedule',
        title: `Schedule — ${client} (${bookingId})`,
        clientName: document.client.name,
        bookingId,
        status: 'Final',
        data: { ...document, documentType: 'Booking Schedule' },
      });
      mode = s.mode;
      const inv = await saveDocumentAsync({
        documentType: 'Invoice',
        title: `Invoice ${syncedInvoice.invoiceNumber || ''} — ${client}`.trim(),
        clientName: syncedInvoice.client.name || document.client.name,
        bookingId,
        status: 'Final',
        data: syncedInvoice,
      });
      mode = inv.mode;
      setSavedMode(mode);
      setSavedAt(new Date().toLocaleString());
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = async (kind: PreviewKind) => {
    try {
      setDownloading(kind);
      const el =
        kind === 'agreement' ? (
          <AgreementPdfDocument document={document} />
        ) : kind === 'schedule' ? (
          <BookingSchedulePdfDocument document={document} />
        ) : (
          <InvoicePdfDocument invoice={invoice} />
        );
      const blob = await pdf(el).toBlob();
      const url = URL.createObjectURL(blob);
      const a = window.document.createElement('a');
      a.href = url;
      a.download = `Parva_${kind}_${(document.client.name || 'Client').replace(/[^a-zA-Z0-9]/g, '_')}.pdf`;
      window.document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF failed:', err);
      alert('PDF failed — use Print / Save as PDF instead.');
    } finally {
      setDownloading(null);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header: one primary action, one save state */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#581825]">Single booking workspace</span>
          <h2 className="text-2xl font-serif text-[#221F20]">New Booking — one flow, all documents</h2>
          <p className="text-xs text-[#78716C] mt-0.5">
            Fill once. Agreement, Schedule & Invoice stay in sync and save together
            {savedMode && savedAt && (
              <span className="ml-2 inline-flex items-center gap-1 font-semibold text-emerald-700">
                <CheckCircle2 className="w-3.5 h-3.5" /> Saved to {savedMode === 'cloud' ? 'Turso cloud' : 'this device'} • {savedAt}
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-[#D8CEBE] text-[11px] font-medium text-[#4A4646]">
            {getConnectionMode() === 'cloud' ? <Cloud className="w-3.5 h-3.5 text-emerald-700" /> : <HardDrive className="w-3.5 h-3.5 text-[#78716C]" />}
            {getConnectionMode() === 'cloud' ? 'Turso cloud' : 'Local — add .env for cloud'}
          </span>
          <button onClick={loadSampleAgreement} className="px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-xs font-medium hover:bg-[#FAF8F5]">
            Sample
          </button>
          <button onClick={resetDocument} className="px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-xs font-medium hover:bg-[#FAF8F5]">
            Clear
          </button>
        </div>
      </div>

      {/* 4-step stepper */}
      <div className="bg-white border border-[#E7DFD5] rounded-2xl p-2 flex gap-1 overflow-x-auto">
        {STEPS.map((s, i) => {
          const Icon = s.icon;
          const active = step === i;
          const done = step > i;
          return (
            <button
              key={s.id}
              onClick={() => setStep(i)}
              className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-semibold transition-all ${
                active ? 'bg-[#581825] text-white' : done ? 'bg-[#FAF8F5] text-[#221F20]' : 'text-[#78716C] hover:bg-[#FAF8F5]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{i + 1}. {s.label}</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 sm:p-8 shadow-xs space-y-10">
        {step === 0 && (
          <div className="space-y-10">
            <ClientStep client={document.client} onChange={updateClient} errors={errorsMap} />
            <div className="border-t border-[#EAE3D9] pt-8">
              <BookingStep booking={document.booking} onChange={updateBooking} errors={errorsMap} />
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-10">
            <ServicesStep services={document.services} deliverables={document.deliverables} onServicesChange={updateServices} onDeliverablesChange={updateDeliverables} />
            <div className="border-t border-[#EAE3D9] pt-8">
              <DeliveryStep delivery={document.delivery} onChange={updateDelivery} />
            </div>
            <div className="border-t border-[#EAE3D9] pt-8">
              <TermsSignaturesStep
                specialTerms={document.specialTerms}
                signatures={document.signatures}
                defaultClientName={document.client.name}
                onSpecialTermsChange={updateSpecialTerms}
                onSignaturesChange={updateSignatures}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-10">
            <CommercialStep commercial={document.commercial} onChange={updateCommercial} errors={errorsMap} />
            <div className="border-t border-[#EAE3D9] pt-8 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-serif text-[#221F20]">Invoice basics</h3>
                  <p className="text-xs text-[#78716C]">Client & fee auto-sync from above. Total due: <strong className="text-[#581825]">{formatINR(totals.totalAmount)}</strong> • Balance: <strong>{formatINR(totals.balanceDue)}</strong></p>
                </div>
                <button
                  onClick={syncInvoiceFromBooking}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#FAF2F4] border border-[#ECC7D0] text-[#581825] text-xs font-semibold hover:bg-[#F5E0E6]"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Sync invoice from booking
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                <label className="space-y-1">
                  <span className="font-semibold text-[#4A4646] uppercase text-[11px]">Invoice no.</span>
                  <input value={invoice.invoiceNumber} onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono" />
                </label>
                <label className="space-y-1">
                  <span className="font-semibold text-[#4A4646] uppercase text-[11px]">Invoice date</span>
                  <input type="date" value={invoice.invoiceDate} onChange={(e) => updateInvoice({ invoiceDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]" />
                </label>
                <label className="space-y-1">
                  <span className="font-semibold text-[#4A4646] uppercase text-[11px]">Due date</span>
                  <input type="date" value={invoice.dueDate} onChange={(e) => updateInvoice({ dueDate: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]" />
                </label>
                <div className="space-y-1">
                  <span className="font-semibold text-[#4A4646] uppercase text-[11px]">Status (auto)</span>
                  <div className={`w-full px-3 py-2 rounded-lg border text-xs font-semibold ${
                    schedule.status === 'Paid' ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                    : schedule.status === 'Partially Paid' ? 'bg-sky-50 border-sky-200 text-sky-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
                  }`}>
                    {schedule.status}
                  </div>
                </div>
                <label className="space-y-1">
                  <span className="font-semibold text-[#4A4646] uppercase text-[11px]">Discount (₹)</span>
                  <input type="number" min={0} value={invoice.discount || 0} onChange={(e) => updateInvoice({ discount: Math.max(0, Number(e.target.value)) })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]" />
                </label>
                <label className="space-y-1 col-span-2">
                  <span className="font-semibold text-[#4A4646] uppercase text-[11px]">Notes / terms</span>
                  <input value={invoice.notes} onChange={(e) => updateInvoice({ notes: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]" />
                </label>
              </div>

              {/* Bank Remittance Details */}
              <div className="bg-[#FAF8F5] border border-[#E7DFD5] rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider">
                    Bank & Remittance Details (Printed on Invoice)
                  </h4>
                  <span className="text-[10px] text-[#78716C]">Defaults from Settings • Editable here</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <label className="space-y-1">
                    <span className="font-semibold text-[#4A4646] text-[11px]">Beneficiary Name</span>
                    <input
                      value={invoice.bankDetails?.beneficiaryName ?? ''}
                      onChange={(e) => updateBankDetails({ beneficiaryName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="font-semibold text-[#4A4646] text-[11px]">Bank Name</span>
                    <input
                      value={invoice.bankDetails?.bankName ?? ''}
                      onChange={(e) => updateBankDetails({ bankName: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="font-semibold text-[#4A4646] text-[11px]">Account Number</span>
                    <input
                      value={invoice.bankDetails?.accountNumber ?? ''}
                      onChange={(e) => updateBankDetails({ accountNumber: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="font-semibold text-[#4A4646] text-[11px]">IFSC Code</span>
                    <input
                      value={invoice.bankDetails?.ifscCode ?? ''}
                      onChange={(e) => updateBankDetails({ ifscCode: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-white border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="font-semibold text-[#4A4646] text-[11px]">Branch</span>
                    <input
                      value={invoice.bankDetails?.branch ?? ''}
                      onChange={(e) => updateBankDetails({ branch: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
                    />
                  </label>
                  <label className="space-y-1">
                    <span className="font-semibold text-[#4A4646] text-[11px]">UPI ID (Optional)</span>
                    <input
                      value={invoice.bankDetails?.upiId ?? ''}
                      onChange={(e) => updateBankDetails({ upiId: e.target.value })}
                      className="w-full px-3 py-2 bg-white border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
                    />
                  </label>
                </div>
              </div>

              <MilestonePaymentTracker invoice={invoice} onPaidChange={updateMilestonePayment} compact />
              <label className="flex items-center gap-2 text-xs cursor-pointer">
                <input type="checkbox" checked={invoice.taxEnabled} onChange={(e) => updateInvoice({ taxEnabled: e.target.checked })}
                  className="w-4 h-4 rounded text-[#581825]" />
                <span>Add GST {invoice.taxEnabled && (
                  <span className="inline-flex items-center gap-1 ml-1">
                    <input type="number" min={0} max={28} value={invoice.taxRate} onClick={(e) => e.stopPropagation()}
                      onChange={(e) => updateInvoice({ taxRate: Number(e.target.value) })}
                      className="w-16 px-2 py-1 bg-white border border-[#D8CEBE] rounded" /> %
                  </span>
                )}</span>
              </label>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            {!documentValidation.isValid || !invoiceValidation.isValid ? (
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900">
                <p className="font-semibold mb-1">Almost there — {documentValidation.errors.length + invoiceValidation.errors.length} thing(s) to check:</p>
                <ul className="list-disc ml-4 space-y-0.5">
                  {[...documentValidation.errors, ...invoiceValidation.errors].slice(0, 8).map((e, i) => (
                    <li key={i}>{e.message}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> Ready — {document.client.name || 'booking'} • {formatINR(document.commercial.totalFee)} • Invoice {formatINR(totals.totalAmount)}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2 sticky top-0 z-10 bg-[#FAF8F5]/95 backdrop-blur-xs py-1 print:static print:bg-transparent">
              {(['agreement', 'schedule', 'invoice'] as PreviewKind[]).map((k) => (
                <button key={k} onClick={() => setPreview(k)}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${preview === k ? 'bg-[#581825] text-white shadow-xs' : 'bg-white border border-[#D8CEBE] text-[#4A4646] hover:bg-[#FAF8F5]'}`}>
                  {k === 'agreement' ? 'Agreement' : k === 'schedule' ? 'Schedule' : 'Invoice'}
                </button>
              ))}
              <div className="flex-1" />
              <button onClick={() => handleDownload(preview)} disabled={downloading !== null}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-xs font-semibold hover:bg-[#FAF8F5] disabled:opacity-50">
                {downloading === preview ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
                Download {preview} PDF
              </button>
              <button onClick={handleSaveAll} disabled={saving}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] disabled:opacity-50 shadow-xs">
                {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                {saving ? 'Saving…' : 'Save all 3 documents'}
              </button>
            </div>

            <div 
              className="border border-[#E7DFD5] rounded-xl h-[65vh] min-h-[500px] max-h-[820px] overflow-y-auto overflow-x-auto overscroll-contain bg-[#78716C]/10 p-4 sm:p-6 shadow-inner focus:outline-none print:h-auto print:overflow-visible print:border-none print:p-0 print:bg-transparent"
              style={{ overscrollBehavior: 'contain' }}
              tabIndex={0}
            >
              <div className="min-w-fit mx-auto">
                {preview === 'agreement' && <AgreementDocumentPreview document={document} />}
                {preview === 'schedule' && <BookingSchedulePreview document={document} />}
                {preview === 'invoice' && <InvoiceDocumentPreview invoice={invoice} />}
              </div>
            </div>
          </div>
        )}

        {/* Footer nav */}
        <div className="pt-6 border-t border-[#EAE3D9] flex items-center justify-between">
          <button onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border ${step === 0 ? 'opacity-40 cursor-not-allowed bg-[#FAF8F5]' : 'bg-white border-[#D8CEBE] hover:bg-[#FAF8F5]'}`}>
            <ArrowLeft className="w-4 h-4" /> Back
          </button>
          <span className="text-xs text-[#78716C]">Step {step + 1} of {STEPS.length}</span>
          {step < STEPS.length - 1 ? (
            <button onClick={() => { setStep((s) => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); window.document.querySelector('main')?.scrollTo({ top: 0, behavior: 'smooth' }); }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#581825] text-white hover:bg-[#6E1F36]">
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button onClick={() => window.print()}
              className="px-5 py-2.5 rounded-lg text-xs font-semibold bg-white border border-[#D8CEBE] hover:bg-[#FAF8F5]">
              Print / Save as PDF
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
