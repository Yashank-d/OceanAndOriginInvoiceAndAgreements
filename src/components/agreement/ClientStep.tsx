import React from 'react';
import { User, Phone, Mail, MapPin, AlertCircle } from 'lucide-react';
import { ClientData } from '../../types/document';

interface ClientStepProps {
  client: ClientData;
  onChange: (patch: Partial<ClientData>) => void;
  errors: Record<string, string>;
}

export const ClientStep: React.FC<ClientStepProps> = ({ client, onChange, errors }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-[#EAE3D9] pb-4">
        <h3 className="text-lg font-serif font-medium text-[#221F20]">Client Information</h3>
        <p className="text-xs text-[#78716C] mt-1">
          Enter the primary client contracting with Ocean and Origin (The House of Parva).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Full Client Name / Couple Names <span className="text-[#581825]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={client.name}
              onChange={(e) => onChange({ name: e.target.value })}
              placeholder="e.g. Rohan Sharma & Ananya Verma"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none transition-all ${
                errors['client.name'] 
                  ? 'border-red-400 focus:border-red-600 bg-red-50/20' 
                  : 'border-[#D8CEBE] focus:border-[#581825] focus:bg-white'
              }`}
            />
          </div>
          {errors['client.name'] && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors['client.name']}</span>
            </p>
          )}
        </div>

        {/* Phone Number */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Phone Number <span className="text-[#581825]">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={client.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              placeholder="+91 98860 12345"
              className={`w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border rounded-lg focus:outline-none transition-all ${
                errors['client.phone'] 
                  ? 'border-red-400 focus:border-red-600 bg-red-50/20' 
                  : 'border-[#D8CEBE] focus:border-[#581825] focus:bg-white'
              }`}
            />
          </div>
          {errors['client.phone'] && (
            <p className="text-[11px] text-red-600 flex items-center gap-1 mt-1">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>{errors['client.phone']}</span>
            </p>
          )}
        </div>

        {/* Email Address */}
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={client.email}
              onChange={(e) => onChange({ email: e.target.value })}
              placeholder="client@example.com"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all"
            />
          </div>
        </div>

        {/* Full Postal Address */}
        <div className="space-y-1.5 md:col-span-2">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Postal / Residence Address
          </label>
          <div className="relative">
            <div className="absolute top-3 left-3 flex items-start pointer-events-none text-[#78716C]">
              <MapPin className="w-4 h-4" />
            </div>
            <textarea
              rows={3}
              value={client.address}
              onChange={(e) => onChange({ address: e.target.value })}
              placeholder="Enter full postal address for formal agreement records..."
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all resize-y"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
