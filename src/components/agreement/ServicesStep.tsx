import React, { useState } from 'react';
import { Plus, Trash2, Camera, Film, Users, PackageCheck } from 'lucide-react';
import { ServicesData, DeliverablesData } from '../../types/document';

interface ServicesStepProps {
  services: ServicesData;
  deliverables: DeliverablesData;
  onServicesChange: (patch: Partial<ServicesData>) => void;
  onDeliverablesChange: (items: string[]) => void;
}

const COMMON_SERVICES = [
  'Candid Photography',
  'Cinematic Wedding Film',
  'Traditional Photography',
  'Traditional Videography',
  'Aerial / Drone Cinematography',
  'Pre-Wedding Creative Shoot',
  'Teaser & Reel Highlights',
];

const COMMON_DELIVERABLES = [
  'Curated selection of 400+ high-resolution color graded photographs',
  'Cinematic Wedding Feature Film (4–6 minutes)',
  'Full Ceremony Documentary Film (45–60 minutes)',
  'Handcrafted 12x12 Premium Fine-Art Album (40 pages)',
  'Private cloud gallery access with full resolution downloads',
  'Social media teaser reel delivered within 7 working days',
];

export const ServicesStep: React.FC<ServicesStepProps> = ({
  services,
  deliverables,
  onServicesChange,
  onDeliverablesChange,
}) => {
  const [newServiceInput, setNewServiceInput] = useState('');
  const [newDeliverableInput, setNewDeliverableInput] = useState('');

  const handleAddService = (service: string) => {
    const trimmed = service.trim();
    if (!trimmed || services.selectedServices.includes(trimmed)) return;
    onServicesChange({
      selectedServices: [...services.selectedServices, trimmed],
    });
    setNewServiceInput('');
  };

  const handleRemoveService = (index: number) => {
    const updated = services.selectedServices.filter((_, i) => i !== index);
    onServicesChange({ selectedServices: updated });
  };

  const handleAddDeliverable = (item: string) => {
    const trimmed = item.trim();
    if (!trimmed || deliverables.items.includes(trimmed)) return;
    onDeliverablesChange([...deliverables.items, trimmed]);
    setNewDeliverableInput('');
  };

  const handleRemoveDeliverable = (index: number) => {
    const updated = deliverables.items.filter((_, i) => i !== index);
    onDeliverablesChange(updated);
  };

  return (
    <div className="space-y-8">
      <div className="border-b border-[#EAE3D9] pb-4">
        <h3 className="text-lg font-serif font-medium text-[#221F20]">Services, Deliverables & Creative Scope</h3>
        <p className="text-xs text-[#78716C] mt-1">
          Specify the creative services, team composition, and expected physical / digital deliverables.
        </p>
      </div>

      {/* Package Name & Team Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Package Name / Title
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Camera className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={services.packageName}
              onChange={(e) => onServicesChange({ packageName: e.target.value })}
              placeholder="e.g. Comprehensive Wedding Story"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider">
            Team & Crew Details
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#78716C]">
              <Users className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={services.teamDetails}
              onChange={(e) => onServicesChange({ teamDetails: e.target.value })}
              placeholder="e.g. 4-person crew (2 Photographers, 2 Cinematographers)"
              className="w-full pl-9 pr-3 py-2.5 text-sm bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white transition-all"
            />
          </div>
        </div>
      </div>

      {/* Selected Services Builder */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
            <Film className="w-4 h-4 text-[#581825]" />
            <span>Selected Creative Services ({services.selectedServices.length})</span>
          </label>
        </div>

        {/* Quick add suggestions */}
        <div className="flex flex-wrap gap-1.5">
          {COMMON_SERVICES.map((s) => {
            const isSelected = services.selectedServices.includes(s);
            return (
              <button
                key={s}
                type="button"
                onClick={() => isSelected ? handleRemoveService(services.selectedServices.indexOf(s)) : handleAddService(s)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                  isSelected 
                    ? 'bg-[#581825] text-white border-[#581825]' 
                    : 'bg-[#FAF8F5] text-[#4A4646] border-[#D8CEBE] hover:border-[#581825]/60'
                }`}
              >
                {isSelected ? '✓ ' : '+ '}{s}
              </button>
            );
          })}
        </div>

        {/* Custom Service Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newServiceInput}
            onChange={(e) => setNewServiceInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddService(newServiceInput))}
            placeholder="Add custom service..."
            className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white"
          />
          <button
            type="button"
            onClick={() => handleAddService(newServiceInput)}
            className="px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] text-[#581825] rounded-lg hover:bg-[#F3EDE5] text-xs font-medium inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Active list */}
        <div className="divide-y divide-[#F5EFEB] border border-[#EAE3D9] rounded-lg bg-white overflow-hidden">
          {services.selectedServices.length === 0 ? (
            <p className="text-xs text-[#78716C] p-4 text-center italic">No services added yet.</p>
          ) : (
            services.selectedServices.map((service, idx) => (
              <div key={idx} className="flex items-center justify-between px-3.5 py-2.5 text-xs hover:bg-[#FAF8F5]/80">
                <span className="font-medium text-[#221F20]">{idx + 1}. {service}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveService(idx)}
                  className="text-[#78716C] hover:text-red-600 p-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Deliverables Builder */}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-semibold text-[#4A4646] uppercase tracking-wider flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-[#581825]" />
            <span>Agreed Deliverables ({deliverables.items.length})</span>
          </label>
        </div>

        {/* Quick add suggestions */}
        <div className="flex flex-wrap gap-1.5">
          {COMMON_DELIVERABLES.slice(0, 4).map((d) => {
            const isSelected = deliverables.items.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => isSelected ? handleRemoveDeliverable(deliverables.items.indexOf(d)) : handleAddDeliverable(d)}
                className={`px-2.5 py-1 text-xs rounded-full border transition-all ${
                  isSelected 
                    ? 'bg-[#581825] text-white border-[#581825]' 
                    : 'bg-[#FAF8F5] text-[#4A4646] border-[#D8CEBE] hover:border-[#581825]/60'
                }`}
              >
                {isSelected ? '✓ Added' : `+ ${d.split('(')[0].slice(0, 30)}...`}
              </button>
            );
          })}
        </div>

        {/* Custom Deliverable Input */}
        <div className="flex gap-2">
          <input
            type="text"
            value={newDeliverableInput}
            onChange={(e) => setNewDeliverableInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDeliverable(newDeliverableInput))}
            placeholder="Type custom deliverable and press Enter..."
            className="flex-1 px-3 py-2 text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg focus:outline-none focus:border-[#581825] focus:bg-white"
          />
          <button
            type="button"
            onClick={() => handleAddDeliverable(newDeliverableInput)}
            className="px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] text-[#581825] rounded-lg hover:bg-[#F3EDE5] text-xs font-medium inline-flex items-center gap-1"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>

        {/* Deliverables List */}
        <div className="divide-y divide-[#F5EFEB] border border-[#EAE3D9] rounded-lg bg-white overflow-hidden">
          {deliverables.items.length === 0 ? (
            <p className="text-xs text-[#78716C] p-4 text-center italic">No deliverables added yet.</p>
          ) : (
            deliverables.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between px-3.5 py-2.5 text-xs hover:bg-[#FAF8F5]/80">
                <span className="font-medium text-[#221F20]">{idx + 1}. {item}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveDeliverable(idx)}
                  className="text-[#78716C] hover:text-red-600 p-1 transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
