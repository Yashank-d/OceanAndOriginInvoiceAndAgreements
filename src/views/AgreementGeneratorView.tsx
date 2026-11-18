import React, { useState } from 'react';
import { 
  User, 
  Calendar, 
  Camera, 
  CreditCard, 
  Clock, 
  PenTool, 
  CheckSquare, 
  ArrowLeft, 
  ArrowRight, 
  Sparkles, 
  RefreshCw, 
  FileText,
  CheckCircle2
} from 'lucide-react';
import { useDocument } from '../context/DocumentContext';
import { ClientStep } from '../components/agreement/ClientStep';
import { BookingStep } from '../components/agreement/BookingStep';
import { ServicesStep } from '../components/agreement/ServicesStep';
import { CommercialStep } from '../components/agreement/CommercialStep';
import { DeliveryStep } from '../components/agreement/DeliveryStep';
import { TermsSignaturesStep } from '../components/agreement/TermsSignaturesStep';
import { ReviewSummaryStep } from '../components/agreement/ReviewSummaryStep';

interface AgreementGeneratorViewProps {
  onBackToDashboard?: () => void;
  onProceedToPreview?: () => void;
}

const STEPS = [
  { id: 'client', label: 'Client', icon: User, desc: 'Client contracting info' },
  { id: 'booking', label: 'Booking', icon: Calendar, desc: 'Dates, shoot type & venue' },
  { id: 'services', label: 'Services', icon: Camera, desc: 'Services & deliverables' },
  { id: 'commercial', label: 'Commercial', icon: CreditCard, desc: 'Fee & 50/30/20 milestones' },
  { id: 'delivery', label: 'Delivery', icon: Clock, desc: 'Revisions & archival' },
  { id: 'terms', label: 'Execution', icon: PenTool, desc: 'Special terms & signatories' },
  { id: 'review', label: 'Review', icon: CheckSquare, desc: 'Audit & verify configuration' },
];

import { Bookmark, BookmarkCheck } from 'lucide-react';
import { saveDocument } from '../utils/storage';

export const AgreementGeneratorView: React.FC<AgreementGeneratorViewProps> = ({
  onBackToDashboard,
  onProceedToPreview,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const {
    document,
    updateClient,
    updateBooking,
    updateServices,
    updateDeliverables,
    updateCommercial,
    updateDelivery,
    updateSpecialTerms,
    updateSignatures,
    documentValidation,
    loadSampleAgreement,
    resetDocument,
  } = useDocument();

  // Convert validation errors array to map for fast lookup
  const errorsMap = React.useMemo(() => {
    const map: Record<string, string> = {};
    documentValidation.errors.forEach((err) => {
      map[err.field] = err.message;
    });
    return map;
  }, [documentValidation]);

  // Step specific error checks
  const stepErrors: Record<string, boolean> = {
    client: Boolean(errorsMap['client.name'] || errorsMap['client.phone']),
    booking: Boolean(errorsMap['booking.eventType'] || errorsMap['booking.eventDate'] || errorsMap['booking.location']),
    commercial: Boolean(errorsMap['commercial.totalFee'] || errorsMap['commercial.milestones']),
  };

  const handleNext = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderCurrentStep = () => {
    switch (currentStepIndex) {
      case 0:
        return (
          <ClientStep
            client={document.client}
            onChange={updateClient}
            errors={errorsMap}
          />
        );
      case 1:
        return (
          <BookingStep
            booking={document.booking}
            onChange={updateBooking}
            errors={errorsMap}
          />
        );
      case 2:
        return (
          <ServicesStep
            services={document.services}
            deliverables={document.deliverables}
            onServicesChange={updateServices}
            onDeliverablesChange={updateDeliverables}
          />
        );
      case 3:
        return (
          <CommercialStep
            commercial={document.commercial}
            onChange={updateCommercial}
            errors={errorsMap}
          />
        );
      case 4:
        return (
          <DeliveryStep
            delivery={document.delivery}
            onChange={updateDelivery}
          />
        );
      case 5:
        return (
          <TermsSignaturesStep
            specialTerms={document.specialTerms}
            signatures={document.signatures}
            defaultClientName={document.client.name}
            onSpecialTermsChange={updateSpecialTerms}
            onSignaturesChange={updateSignatures}
          />
        );
      case 6:
        return (
          <ReviewSummaryStep
            document={document}
            validation={documentValidation}
            onNavigateStep={(step) => setCurrentStepIndex(step)}
            onProceedToPreview={onProceedToPreview}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Top Controls Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {onBackToDashboard && (
            <button
              onClick={onBackToDashboard}
              className="p-2 rounded-lg bg-white border border-[#E7DFD5] text-[#78716C] hover:text-[#221F20] hover:bg-[#FAF8F5] transition-colors"
              title="Back to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#581825]">
                Master Agreement Generator
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FAF2F4] text-[#581825] font-semibold border border-[#ECC7D0]/60">
                8 Core Clauses
              </span>
            </div>
            <h2 className="text-2xl font-serif text-[#221F20] mt-0.5">
              Client Service Agreement Form
            </h2>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 flex-wrap">
          {onProceedToPreview && (
            <button
              onClick={onProceedToPreview}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#581825]/30 text-[#581825] text-xs font-semibold hover:bg-[#FAF2F4] transition-all shadow-xs"
            >
              <FileText className="w-3.5 h-3.5 text-[#581825]" />
              <span>Preview Document</span>
            </button>
          )}
          <button
            onClick={loadSampleAgreement}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[#581825] text-white text-xs font-medium hover:bg-[#6E1F36] transition-all shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5DCE2]" />
            <span>Load Sample Data</span>
          </button>
          <button
            onClick={() => {
              saveDocument({
                documentType: 'Agreement',
                title: `Master Agreement - ${document.client.name || 'Draft'}`,
                clientName: document.client.name,
                bookingId: document.booking.bookingId,
                status: 'Draft',
                data: document,
              });
              setIsSaved(true);
              setTimeout(() => setIsSaved(false), 3000);
            }}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#221F20] text-xs font-medium hover:bg-[#FAF8F5] transition-all shadow-xs"
          >
            {isSaved ? (
              <>
                <BookmarkCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">Draft Saved!</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-[#78716C]" />
                <span>Save Draft</span>
              </>
            )}
          </button>
          <button
            onClick={resetDocument}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white border border-[#D8CEBE] text-[#221F20] text-xs font-medium hover:bg-[#FAF8F5] transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5 text-[#78716C]" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {/* Stepper Navigation Bar */}
      <div className="bg-white border border-[#E7DFD5] rounded-2xl p-3 shadow-xs overflow-x-auto">
        <div className="flex items-center justify-between min-w-[650px] gap-1">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            const isActive = currentStepIndex === idx;
            const isCompleted = currentStepIndex > idx;
            const hasError = stepErrors[step.id];

            return (
              <button
                key={step.id}
                onClick={() => setCurrentStepIndex(idx)}
                className={`flex-1 py-2.5 px-2 rounded-xl flex items-center justify-center gap-2 text-left transition-all ${
                  isActive
                    ? 'bg-[#581825] text-white shadow-xs'
                    : isCompleted
                    ? 'bg-[#FAF8F5] text-[#221F20] hover:bg-[#F3EDE5]'
                    : 'text-[#78716C] hover:bg-[#FAF8F5]'
                }`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium shrink-0 ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : isCompleted
                    ? 'bg-[#FAF2F4] text-[#581825]'
                    : 'bg-[#EAE3D9] text-[#78716C]'
                }`}>
                  {isCompleted ? <CheckCircle2 className="w-4 h-4 text-[#581825]" /> : <Icon className="w-3.5 h-3.5" />}
                </div>
                <div className="truncate">
                  <p className={`text-xs font-semibold leading-none truncate ${isActive ? 'text-white' : 'text-[#221F20]'}`}>
                    {step.label}
                  </p>
                </div>
                {hasError && (
                  <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" title="Missing required fields" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Step Form Container */}
      <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 sm:p-10 shadow-xs">
        {renderCurrentStep()}

        {/* Footer Navigation Buttons */}
        <div className="mt-10 pt-6 border-t border-[#EAE3D9] flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStepIndex === 0}
            className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold border transition-all ${
              currentStepIndex === 0
                ? 'opacity-40 cursor-not-allowed bg-[#FAF8F5] border-[#EAE3D9] text-[#78716C]'
                : 'bg-white border-[#D8CEBE] text-[#221F20] hover:bg-[#FAF8F5]'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Previous Step</span>
          </button>

          <div className="text-xs text-[#78716C] font-medium hidden sm:block">
            Step {currentStepIndex + 1} of {STEPS.length}: <span className="text-[#221F20] font-semibold">{STEPS[currentStepIndex].label}</span>
          </div>

          {currentStepIndex < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={handleNext}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-[#581825] text-white hover:bg-[#6E1F36] transition-all shadow-xs"
            >
              <span>Continue</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={onProceedToPreview}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[#581825] text-white text-xs font-semibold hover:bg-[#6E1F36] transition-all shadow-xs"
            >
              <span>Generate & Preview Document</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
