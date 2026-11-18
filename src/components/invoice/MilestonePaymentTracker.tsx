import React, { useMemo } from 'react';
import { CheckCircle2, Circle, Landmark } from 'lucide-react';
import type { InvoiceDocumentData } from '../../types/document';
import { calculateMilestoneSchedule, formatINR, type MilestoneKey } from '../../utils/calculations';

interface MilestonePaymentTrackerProps {
  invoice: InvoiceDocumentData;
  onPaidChange: (which: MilestoneKey, amount: number) => void;
  /** Compact mode for the booking workspace money step. */
  compact?: boolean;
}

/**
 * Handles Advance (50%) / Pre-event (30%) / Final (20%) payments directly
 * inside the invoice. Dues always derive from the invoice's own total, so
 * they sum exactly to what the client owes. Status + total paid update
 * automatically as amounts are entered.
 */
export const MilestonePaymentTracker: React.FC<MilestonePaymentTrackerProps> = ({
  invoice,
  onPaidChange,
  compact = false,
}) => {
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
        dueDates: {
          advanceDueDate: invoice.commercial.advanceDueDate,
          preEventDueDate: invoice.commercial.preEventDueDate,
          finalDueDate: invoice.commercial.finalDueDate,
        },
      }),
    [invoice],
  );

  const statusStyle =
    schedule.status === 'Paid'
      ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
      : schedule.status === 'Partially Paid'
        ? 'bg-sky-50 text-sky-800 border-sky-200'
        : 'bg-amber-50 text-amber-800 border-amber-200';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-2 text-[#581825]">
          <Landmark className="w-4 h-4" />
          <h4 className={`font-serif font-semibold text-[#221F20] ${compact ? 'text-sm' : 'text-base'}`}>
            Milestone Payments
          </h4>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF2F4] text-[#581825] font-semibold border border-[#ECC7D0]/60">
            50 / 30 / 20 of invoice total
          </span>
        </div>
        <span className={`inline-block px-2.5 py-1 rounded-full text-[11px] font-semibold border ${statusStyle}`}>
          {schedule.status} • {formatINR(schedule.totalPaid)} / {formatINR(schedule.totalDue)}
        </span>
      </div>

      <div className={`grid gap-3 ${compact ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
        {schedule.rows.map((row) => {
          const pctPaid = row.due > 0 ? Math.min(100, Math.round((row.paid / row.due) * 100)) : 0;
          return (
            <div
              key={row.key}
              className={`p-4 rounded-xl border space-y-2.5 ${
                row.isPaid ? 'bg-emerald-50/50 border-emerald-200' : 'bg-white border-[#E7DFD5]'
              }`}
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#581825]">
                  {row.pct}% {row.shortLabel}
                </span>
                {row.isPaid ? (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Paid
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[10px] font-medium text-[#78716C]">
                    <Circle className="w-3.5 h-3.5" /> {formatINR(row.balance)} left
                  </span>
                )}
              </div>

              <p className="text-lg font-serif font-medium text-[#221F20]">
                {formatINR(row.due)}
              </p>
              {row.dueDate && (
                <p className="text-[10.5px] text-[#78716C] -mt-1">Due: {row.dueDate}</p>
              )}

              {/* Progress */}
              <div className="h-1.5 rounded-full bg-[#F5EFEB] overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all ${row.isPaid ? 'bg-emerald-500' : 'bg-[#581825]'}`}
                  style={{ width: `${pctPaid}%` }}
                />
              </div>

              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-[#581825] font-semibold text-xs pointer-events-none">
                    ₹
                  </span>
                  <input
                    type="number"
                    min={0}
                    max={row.due}
                    step={500}
                    value={row.paid || ''}
                    placeholder="0"
                    onChange={(e) => onPaidChange(row.key, Math.max(0, Number(e.target.value)))}
                    className="w-full pl-7 pr-2 py-1.5 text-xs font-semibold bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
                    aria-label={`${row.label} amount received`}
                  />
                </div>
                {!row.isPaid && row.due > 0 && (
                  <button
                    type="button"
                    onClick={() => onPaidChange(row.key, row.due)}
                    className="px-2.5 py-1.5 rounded-lg bg-[#FAF2F4] border border-[#ECC7D0] text-[#581825] text-[11px] font-semibold hover:bg-[#F5E0E6] shrink-0"
                    title={`Mark full ${row.shortLabel.toLowerCase()} received`}
                  >
                    Full
                  </button>
                )}
              </div>
              <p className="text-[10.5px] text-[#78716C]">Received of {formatINR(row.due)} due</p>
            </div>
          );
        })}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2 px-3.5 py-2.5 rounded-lg bg-[#FAF8F5] border border-[#EAE3D9] text-xs">
        <span className="text-[#78716C]">
          Total received <strong className="text-emerald-800">{formatINR(schedule.totalPaid)}</strong>
        </span>
        <span className="font-semibold text-[#581825]">
          Balance due {formatINR(schedule.totalBalance)}
        </span>
      </div>
    </div>
  );
};
