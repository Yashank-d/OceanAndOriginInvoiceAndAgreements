import React from 'react';
import { 
  Receipt, 
  User, 
  Plus, 
  Trash2, 
  CreditCard, 
  FileText, 
  Building2,
  RefreshCw,
  Percent
} from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';
import { InvoiceLineItem, AdditionalCharge } from '../../types/document';
import { calculateLineItemAmount, calculateMilestoneSchedule, formatINR } from '../../utils/calculations';
import { useState, useMemo } from 'react';
import { MilestonePaymentTracker } from './MilestonePaymentTracker';

export const InvoiceForm: React.FC = () => {
  const { invoice, updateInvoice, updateBankDetails, updateMilestonePayment, syncInvoiceFromBooking } = useDocument();
  const [syncedSuccess, setSyncedSuccess] = useState(false);

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

  // Helper for updating nested client in invoice
  const handleClientChange = (field: string, value: string) => {
    updateInvoice({
      client: {
        ...invoice.client,
        [field]: value,
      },
    });
  };

  // Line item helpers
  const handleLineItemChange = (id: string, field: keyof InvoiceLineItem, value: string | number) => {
    const updated = invoice.lineItems.map((item) => {
      if (item.id !== id) return item;
      const updatedItem = { ...item, [field]: value };
      if (field === 'quantity' || field === 'rate') {
        const qty = field === 'quantity' ? Number(value) : item.quantity;
        const rate = field === 'rate' ? Number(value) : item.rate;
        updatedItem.amount = calculateLineItemAmount(qty, rate);
      }
      return updatedItem;
    });
    updateInvoice({ lineItems: updated });
  };

  const addLineItem = () => {
    const newItem: InvoiceLineItem = {
      id: `item-${Date.now()}`,
      description: 'New Service Item',
      quantity: 1,
      rate: 25000,
      amount: 25000,
    };
    updateInvoice({ lineItems: [...invoice.lineItems, newItem] });
  };

  const removeLineItem = (id: string) => {
    if (invoice.lineItems.length <= 1) {
      alert('Invoice must contain at least one line item.');
      return;
    }
    updateInvoice({ lineItems: invoice.lineItems.filter((item) => item.id !== id) });
  };

  // Additional charges helpers
  const handleAddChargeChange = (id: string, field: keyof AdditionalCharge, value: string | number) => {
    const updated = invoice.commercial.additionalCharges.map((charge) => {
      if (charge.id !== id) return charge;
      return { ...charge, [field]: field === 'amount' ? Number(value) : value };
    });
    updateInvoice({
      commercial: {
        ...invoice.commercial,
        additionalCharges: updated,
      },
    });
  };

  const addAdditionalCharge = () => {
    const newCharge: AdditionalCharge = {
      id: `charge-${Date.now()}`,
      description: 'Crew Travel / Outstation Allowance',
      amount: 15000,
    };
    updateInvoice({
      commercial: {
        ...invoice.commercial,
        additionalCharges: [...invoice.commercial.additionalCharges, newCharge],
      },
    });
  };

  const removeAdditionalCharge = (id: string) => {
    updateInvoice({
      commercial: {
        ...invoice.commercial,
        additionalCharges: invoice.commercial.additionalCharges.filter((c) => c.id !== id),
      },
    });
  };

  return (
    <div className="space-y-8">
      {/* Quick Sync Banner */}
      <div className="bg-[#FAF2F4] border border-[#ECC7D0] rounded-xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#581825] text-white flex items-center justify-center shrink-0">
            <RefreshCw className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-[#581825]">Unified Data Model Link</h4>
            <p className="text-[11px] text-[#78716C]">
              Sync client details, booking ID, and services fee directly from the active Agreement.
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            syncInvoiceFromBooking();
            setSyncedSuccess(true);
            setTimeout(() => setSyncedSuccess(false), 3000);
          }}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D8CEBE] text-[#581825] text-xs font-semibold hover:bg-[#FAF8F5] transition-all shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${syncedSuccess ? 'text-emerald-600 animate-spin' : ''}`} />
          <span>{syncedSuccess ? '✓ Synced with Agreement!' : 'Sync from Agreement'}</span>
        </button>
      </div>

      {/* 1. Invoice Metadata */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-3">
          <Receipt className="w-4 h-4" />
          <h3 className="font-serif text-base font-semibold text-[#221F20]">1. Invoice Metadata</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Invoice Number *
            </label>
            <input
              type="text"
              value={invoice.invoiceNumber}
              onChange={(e) => updateInvoice({ invoiceNumber: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Invoice Date *
            </label>
            <input
              type="date"
              value={invoice.invoiceDate}
              onChange={(e) => updateInvoice({ invoiceDate: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Due Date *
            </label>
            <input
              type="date"
              value={invoice.dueDate}
              onChange={(e) => updateInvoice({ dueDate: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Payment Status
            </label>
            <div
              className={`w-full px-3 py-2 rounded-lg border text-xs font-semibold ${
                schedule.status === 'Paid'
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                  : schedule.status === 'Partially Paid'
                    ? 'bg-sky-50 border-sky-200 text-sky-800'
                    : 'bg-amber-50 border-amber-200 text-amber-800'
              }`}
              title="Auto-updated from milestone payments below"
            >
              {schedule.status} (auto)
            </div>
          </div>
        </div>
      </div>

      {/* 2. Client ("Bill To") Information */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-3">
          <User className="w-4 h-4" />
          <h3 className="font-serif text-base font-semibold text-[#221F20]">2. Client Information (Bill To)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Client Name *
            </label>
            <input
              type="text"
              value={invoice.client.name}
              onChange={(e) => handleClientChange('name', e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Phone Number
            </label>
            <input
              type="text"
              value={invoice.client.phone}
              onChange={(e) => handleClientChange('phone', e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={invoice.client.email}
              onChange={(e) => handleClientChange('email', e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Billing Address
            </label>
            <input
              type="text"
              value={invoice.client.address}
              onChange={(e) => handleClientChange('address', e.target.value)}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
        </div>
      </div>

      {/* 3. Items & Services Table */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
          <div className="flex items-center gap-2 text-[#581825]">
            <FileText className="w-4 h-4" />
            <h3 className="font-serif text-base font-semibold text-[#221F20]">3. Services & Line Items</h3>
          </div>
          <button
            type="button"
            onClick={addLineItem}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Item</span>
          </button>
        </div>

        <div className="space-y-3">
          {invoice.lineItems.map((item, idx) => (
            <div key={item.id || idx} className="grid grid-cols-12 gap-3 items-center bg-[#FAF8F5] p-3 rounded-lg border border-[#EAE3D9] text-xs">
              <div className="col-span-12 sm:col-span-6">
                <label className="block text-[10.5px] font-semibold text-[#78716C] mb-1">Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleLineItemChange(item.id, 'description', e.target.value)}
                  placeholder="e.g. Candid Photography & Cinematic Film"
                  className="w-full px-2.5 py-1.5 bg-white border border-[#D8CEBE] rounded focus:outline-none"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label className="block text-[10.5px] font-semibold text-[#78716C] mb-1">Qty</label>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) => handleLineItemChange(item.id, 'quantity', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#D8CEBE] rounded text-right focus:outline-none"
                />
              </div>

              <div className="col-span-4 sm:col-span-2">
                <label className="block text-[10.5px] font-semibold text-[#78716C] mb-1">Rate (₹)</label>
                <input
                  type="number"
                  min="0"
                  step="500"
                  value={item.rate}
                  onChange={(e) => handleLineItemChange(item.id, 'rate', e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-white border border-[#D8CEBE] rounded text-right focus:outline-none"
                />
              </div>

              <div className="col-span-3 sm:col-span-1 text-right">
                <label className="block text-[10.5px] font-semibold text-[#78716C] mb-1">Total</label>
                <span className="font-semibold text-[#221F20] inline-block py-1.5">
                  {formatINR(item.amount)}
                </span>
              </div>

              <div className="col-span-1 text-right">
                <label className="block text-[10.5px] text-transparent mb-1">Del</label>
                <button
                  type="button"
                  onClick={() => removeLineItem(item.id)}
                  className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Additional Charges */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
          <div className="flex items-center gap-2 text-[#581825]">
            <Building2 className="w-4 h-4" />
            <h3 className="font-serif text-base font-semibold text-[#221F20]">4. Additional Charges</h3>
          </div>
          <button
            type="button"
            onClick={addAdditionalCharge}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-[#D8CEBE] text-[#581825] text-xs font-semibold hover:bg-[#FAF8F5] transition-all shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Charge</span>
          </button>
        </div>

        {invoice.commercial.additionalCharges.length === 0 ? (
          <p className="text-xs text-[#78716C] italic">No additional charges added. Click "Add Charge" if travel, accommodation, or extra crew applies.</p>
        ) : (
          <div className="space-y-3">
            {invoice.commercial.additionalCharges.map((charge) => (
              <div key={charge.id} className="grid grid-cols-12 gap-3 items-center bg-[#FAF8F5] p-3 rounded-lg border border-[#EAE3D9] text-xs">
                <div className="col-span-8">
                  <input
                    type="text"
                    value={charge.description}
                    onChange={(e) => handleAddChargeChange(charge.id, 'description', e.target.value)}
                    placeholder="Description (e.g. Drone Cinematography / Outstation Travel)"
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D8CEBE] rounded focus:outline-none"
                  />
                </div>
                <div className="col-span-3">
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={charge.amount}
                    onChange={(e) => handleAddChargeChange(charge.id, 'amount', e.target.value)}
                    className="w-full px-2.5 py-1.5 bg-white border border-[#D8CEBE] rounded text-right focus:outline-none font-medium"
                  />
                </div>
                <div className="col-span-1 text-right">
                  <button
                    type="button"
                    onClick={() => removeAdditionalCharge(charge.id)}
                    className="p-1.5 text-stone-400 hover:text-red-700 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 5. Adjustments: Discount & Optional Tax */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-3">
          <Percent className="w-4 h-4" />
          <h3 className="font-serif text-base font-semibold text-[#221F20]">5. Adjustments (Discount & Optional Tax)</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Discount Amount (₹)
            </label>
            <input
              type="number"
              min="0"
              step="500"
              value={invoice.discount || 0}
              onChange={(e) => updateInvoice({ discount: Math.max(0, Number(e.target.value)) })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
            <p className="text-[11px] text-[#78716C] mt-1">Direct deduction applied before tax.</p>
          </div>

          <div className="space-y-2">
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Tax / GST Configuration
            </label>
            <div className="p-3 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={invoice.taxEnabled}
                  onChange={(e) => updateInvoice({ taxEnabled: e.target.checked })}
                  className="w-4 h-4 text-[#581825] rounded border-[#D8CEBE]"
                />
                <span className="font-medium text-[#221F20]">Enable GST / Tax (Per spec: Never forced)</span>
              </label>

              {invoice.taxEnabled && (
                <div className="flex items-center gap-2 pt-2 border-t border-[#EAE3D9]">
                  <span className="text-[#78716C]">Tax Rate:</span>
                  <input
                    type="number"
                    min="0"
                    max="28"
                    value={invoice.taxRate || 18}
                    onChange={(e) => updateInvoice({ taxRate: Number(e.target.value) })}
                    className="w-20 px-2 py-1 bg-white border border-[#D8CEBE] rounded text-right"
                  />
                  <span className="text-[#78716C] font-semibold">% GST</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 6. Milestone Payments & Remittance Instructions */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-3">
          <CreditCard className="w-4 h-4" />
          <h3 className="font-serif text-base font-semibold text-[#221F20]">6. Milestone Payments & Remittance</h3>
        </div>

        <MilestonePaymentTracker invoice={invoice} onPaidChange={updateMilestonePayment} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2">
          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Payment Method
            </label>
            <input
              type="text"
              value={invoice.paymentMethod || 'Bank Transfer (NEFT/RTGS)'}
              onChange={(e) => updateInvoice({ paymentMethod: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">
              Payment Terms / Notes
            </label>
            <textarea
              rows={2}
              value={invoice.notes}
              onChange={(e) => updateInvoice({ notes: e.target.value })}
              className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none text-xs"
            />
          </div>
        </div>

        {/* Bank & Remittance Info */}
        <div className="border-t border-[#EAE3D9] pt-4 mt-2 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-serif font-semibold text-[#581825] uppercase tracking-wider">
              Bank Account & Remittance Details (Printed on Invoice)
            </h4>
            <span className="text-[10px] text-[#78716C]">Defaults from Settings • Override per invoice</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <label className="space-y-1">
              <span className="font-semibold text-[#4A4646] text-[11px]">Beneficiary Name</span>
              <input
                value={invoice.bankDetails?.beneficiaryName ?? ''}
                onChange={(e) => updateBankDetails({ beneficiaryName: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
              />
            </label>
            <label className="space-y-1">
              <span className="font-semibold text-[#4A4646] text-[11px]">Bank Name</span>
              <input
                value={invoice.bankDetails?.bankName ?? ''}
                onChange={(e) => updateBankDetails({ bankName: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
              />
            </label>
            <label className="space-y-1">
              <span className="font-semibold text-[#4A4646] text-[11px]">Account Number</span>
              <input
                value={invoice.bankDetails?.accountNumber ?? ''}
                onChange={(e) => updateBankDetails({ accountNumber: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
              />
            </label>
            <label className="space-y-1">
              <span className="font-semibold text-[#4A4646] text-[11px]">IFSC Code</span>
              <input
                value={invoice.bankDetails?.ifscCode ?? ''}
                onChange={(e) => updateBankDetails({ ifscCode: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
              />
            </label>
            <label className="space-y-1">
              <span className="font-semibold text-[#4A4646] text-[11px]">Branch</span>
              <input
                value={invoice.bankDetails?.branch ?? ''}
                onChange={(e) => updateBankDetails({ branch: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
              />
            </label>
            <label className="space-y-1">
              <span className="font-semibold text-[#4A4646] text-[11px]">UPI ID (Optional)</span>
              <input
                value={invoice.bankDetails?.upiId ?? ''}
                onChange={(e) => updateBankDetails({ upiId: e.target.value })}
                className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
              />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
