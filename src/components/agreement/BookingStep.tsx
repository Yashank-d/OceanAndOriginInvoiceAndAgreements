import React from 'react';
import { Calendar, MapPin, Clock, Hash, AlertCircle } from 'lucide-react';
import { BookingDetails } from '../../types/document';

interface BookingStepProps {
  booking: BookingDetails;
  onChange: (patch: Partial<BookingDetails>) => void;
  errors: Record<string, string>;
}

export const BookingStep: React.FC<BookingStepProps> = ({ booking, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#EAE3D9] pb-4">
        <h3 className="text-lg font-serif font-medium text-[#221F20]">Booking Details</h3>
        <p className="text-xs text-[#78716C] mt-1">
          Specify the assignment itinerary, dates, venue, and operational timings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Booking ID */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Booking ID / Reference
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Hash className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={booking.bookingId}
              onChange={(e) => onChange({ bookingId: e.target.value })}
              placeholder="e.g. PARVA-2026-084"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all font-mono"
            />
          </div>
        </div>

        {/* Agreement / Booking Date */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Booking / Agreement Date
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="date"
              value={booking.bookingDate}
              onChange={(e) => onChange({ bookingDate: e.target.value })}
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Event / Shoot Type */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Event / Shoot Type <span className="text-[#581825]">*</span>
          </label>
          <input
            type="text"
            value={booking.eventType}
            onChange={(e) => onChange({ eventType: e.target.value })}
            placeholder="e.g. Two-Day Wedding & Reception / Pre-Wedding Shoot / Editorial"
            className={`w-full px-3 py-2.5 text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none transition-all ${
              errors['booking.eventType'] 
                ? 'border-red-400 focus:border-red-600 bg-red-50/20' 
                : 'border-[#D8CEBE] focus:border-[#581825] focus:bg-white'
            }`}
          />
          {errors['booking.eventType'] && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors['booking.eventType']}</span>
            </p>
          )}
        </div>

        {/* Event Date(s) */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Event Date(s) <span className="text-[#581825]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Calendar className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={booking.eventDate}
              onChange={(e) => onChange({ eventDate: e.target.value })}
              placeholder="e.g. 2026-11-20 to 2026-11-21"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none transition-all ${
                errors['booking.eventDate'] 
                  ? 'border-red-400 focus:border-red-600 bg-red-50/20' 
                  : 'border-[#D8CEBE] focus:border-[#581825] focus:bg-white'
              }`}
            />
          </div>
          {errors['booking.eventDate'] && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors['booking.eventDate']}</span>
            </p>
          )}
        </div>

        {/* Location / Venue */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Location(s) / Venue <span className="text-[#581825]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={booking.location}
              onChange={(e) => onChange({ location: e.target.value })}
              placeholder="e.g. The Tamarind Tree, Kanakapura Road, Bengaluru"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none transition-all ${
                errors['booking.location'] 
                  ? 'border-red-400 focus:border-red-600 bg-red-50/20' 
                  : 'border-[#D8CEBE] focus:border-[#581825] focus:bg-white'
              }`}
            />
          </div>
          {errors['booking.location'] && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors['booking.location']}</span>
            </p>
          )}
        </div>

        {/* Coverage Start Time */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Coverage Start Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Clock className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={booking.coverageStart}
              onChange={(e) => onChange({ coverageStart: e.target.value })}
              placeholder="e.g. 07:00 AM"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Coverage End Time */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Coverage End Time
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Clock className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={booking.coverageEnd}
              onChange={(e) => onChange({ coverageEnd: e.target.value })}
              placeholder="e.g. 11:00 PM"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
