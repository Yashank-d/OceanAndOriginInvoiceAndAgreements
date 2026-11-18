import React from 'react';
import { 
  User, 
  Calendar, 
  Camera, 
  CreditCard, 
  Clock, 
  Plane, 
  PenTool
} from 'lucide-react';
import { useDocument } from '../../context/DocumentContext';
import { formatINR } from '../../utils/calculations';

export const BookingScheduleForm: React.FC = () => {
  const { 
    document, 
    updateClient, 
    updateBooking, 
    updateServices, 
    updateCommercial, 
    updateDelivery, 
    updateSpecialTerms,
    updateSignatures
  } = useDocument();

  return (
    <div className="space-y-8">
      {/* Client Information */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-3">
          <User className="w-4 h-4" />
          <h3 className="font-serif text-base font-semibold text-[#221F20]">1. Client Information</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Client Name *</label>
            <input
              type="text"
              value={document.client.name}
              onChange={(e) => updateClient({ name: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Phone Number *</label>
            <input
              type="text"
              value={document.client.phone}
              onChange={(e) => updateClient({ phone: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Email Address</label>
            <input
              type="email"
              value={document.client.email}
              onChange={(e) => updateClient({ email: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Residence / Address</label>
            <input
              type="text"
              value={document.client.address}
              onChange={(e) => updateClient({ address: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
        </div>
      </div>

      {/* Booking & Itinerary */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-3">
          <Calendar className="w-4 h-4" />
          <h3 className="font-serif text-base font-semibold text-[#221F20]">2. Assignment Itinerary</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Schedule / Booking ID</label>
            <input
              type="text"
              value={document.booking.bookingId}
              onChange={(e) => updateBooking({ bookingId: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] font-mono"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Event Date(s) *</label>
            <input
              type="text"
              value={document.booking.eventDate}
              onChange={(e) => updateBooking({ eventDate: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Event / Shoot Type *</label>
            <input
              type="text"
              value={document.booking.eventType}
              onChange={(e) => updateBooking({ eventType: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Venue / Location *</label>
            <input
              type="text"
              value={document.booking.location}
              onChange={(e) => updateBooking({ location: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Reporting / Start Time</label>
            <input
              type="text"
              value={document.booking.coverageStart}
              onChange={(e) => updateBooking({ coverageStart: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Wrap / End Time</label>
            <input
              type="text"
              value={document.booking.coverageEnd}
              onChange={(e) => updateBooking({ coverageEnd: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
        </div>
      </div>

      {/* Services & Scope */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-3">
          <Camera className="w-4 h-4" />
          <h3 className="font-serif text-base font-semibold text-[#221F20]">3. Services & Crew Scope</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Package Name</label>
            <input
              type="text"
              value={document.services.packageName}
              onChange={(e) => updateServices({ packageName: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
          <div>
            <label className="block font-semibold text-[#4A4646] uppercase tracking-wider text-[11px] mb-1">Assigned Team / Crew Details</label>
            <input
              type="text"
              value={document.services.teamDetails}
              onChange={(e) => updateServices({ teamDetails: e.target.value })}
              className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825]"
            />
          </div>
        </div>
      </div>

      {/* Commercial Milestones */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#F5EFEB] pb-3">
          <div className="flex items-center gap-2 text-[#581825]">
            <CreditCard className="w-4 h-4" />
            <h3 className="font-serif text-base font-semibold text-[#221F20]">4. Fees & Payment Milestones</h3>
          </div>
          <span className="text-xs font-semibold text-[#581825]">{formatINR(document.commercial.totalFee)}</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="p-3 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg">
            <p className="font-semibold text-[#581825]">50% Booking Advance</p>
            <p className="text-sm font-semibold my-1">{formatINR(document.commercial.bookingAdvance)}</p>
            <input
              type="text"
              value={document.commercial.advanceDueDate || ''}
              onChange={(e) => updateCommercial({ advanceDueDate: e.target.value }, false)}
              placeholder="Due date / condition"
              className="w-full px-2 py-1 text-xs bg-white border border-[#D8CEBE] rounded focus:outline-none"
            />
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg">
            <p className="font-semibold text-[#581825]">30% Pre-Event Payment</p>
            <p className="text-sm font-semibold my-1">{formatINR(document.commercial.preEventPayment)}</p>
            <input
              type="text"
              value={document.commercial.preEventDueDate || ''}
              onChange={(e) => updateCommercial({ preEventDueDate: e.target.value }, false)}
              placeholder="Due date / condition"
              className="w-full px-2 py-1 text-xs bg-white border border-[#D8CEBE] rounded focus:outline-none"
            />
          </div>

          <div className="p-3 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg">
            <p className="font-semibold text-[#581825]">20% Final Payment</p>
            <p className="text-sm font-semibold my-1">{formatINR(document.commercial.finalPayment)}</p>
            <input
              type="text"
              value={document.commercial.finalDueDate || ''}
              onChange={(e) => updateCommercial({ finalDueDate: e.target.value }, false)}
              placeholder="Due date / condition"
              className="w-full px-2 py-1 text-xs bg-white border border-[#D8CEBE] rounded focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Travel, Revisions & Signatures */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-2">
            <Plane className="w-4 h-4" />
            <h4 className="font-serif text-sm font-semibold text-[#221F20]">Travel & Accommodation</h4>
          </div>
          <div className="space-y-2 text-xs">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={document.commercial.travelAccommodation.included}
                onChange={(e) => updateCommercial({
                  travelAccommodation: {
                    ...document.commercial.travelAccommodation,
                    included: e.target.checked
                  }
                }, false)}
                className="text-[#581825]"
              />
              <span className="font-medium text-[#221F20]">Included in fee</span>
            </label>
            <input
              type="text"
              value={document.commercial.travelAccommodation.details}
              onChange={(e) => updateCommercial({
                travelAccommodation: {
                  ...document.commercial.travelAccommodation,
                  details: e.target.value
                }
              }, false)}
              placeholder="Travel details..."
              className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded focus:outline-none text-xs"
            />
          </div>
        </div>

        <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-2">
            <Clock className="w-4 h-4" />
            <h4 className="font-serif text-sm font-semibold text-[#221F20]">Delivery & Revisions</h4>
          </div>
          <div className="space-y-2 text-xs">
            <input
              type="text"
              value={document.delivery.expectedTimeline}
              onChange={(e) => updateDelivery({ expectedTimeline: e.target.value })}
              placeholder="Expected delivery timeline"
              className="w-full px-3 py-1.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded focus:outline-none text-xs"
            />
            <p className="text-[11px] text-[#78716C]">
              Photo: {document.delivery.photographyRevisions} rounds • Film: {document.delivery.filmRevisions} round • Archival: {document.delivery.archivalPeriod.split(',')[0]}
            </p>
          </div>
        </div>
      </div>

      {/* Special Terms & Signatories */}
      <div className="bg-white border border-[#E7DFD5] rounded-xl p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#581825] border-b border-[#F5EFEB] pb-2">
          <PenTool className="w-4 h-4" />
          <h4 className="font-serif text-sm font-semibold text-[#221F20]">Special Terms & Signatories</h4>
        </div>
        <div className="space-y-3 text-xs">
          <textarea
            rows={2}
            value={document.specialTerms.text}
            onChange={(e) => updateSpecialTerms({ text: e.target.value })}
            placeholder="Special terms or specific shoot rider..."
            className="w-full p-2.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none text-xs"
          />
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] text-[#78716C] mb-1">Designated Partner / Authorised Signatory</label>
              <input
                type="text"
                value={document.signatures.representativeName}
                onChange={(e) => updateSignatures({ representativeName: e.target.value })}
                className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded text-xs"
              />
            </div>
            <div>
              <label className="block text-[11px] text-[#78716C] mb-1">Client Signatory</label>
              <input
                type="text"
                value={document.signatures.clientName}
                onChange={(e) => updateSignatures({ clientName: e.target.value })}
                placeholder={document.client.name || 'Client Name'}
                className="w-full px-2.5 py-1.5 bg-[#FAF8F5] border border-[#D8CEBE] rounded text-xs"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
