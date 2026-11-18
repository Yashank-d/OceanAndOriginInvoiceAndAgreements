import React, { useState } from 'react';
import {
  X,
  Upload,
  Download,
  RotateCcw,
  CheckCircle2,
  FileCode,
  Sliders,
  Plus,
  Trash2,
} from 'lucide-react';
import { BrandPackages, PackageTier, PackageAddon } from '../../types/quote';
import {
  getStoredRawPricesMd,
  saveStoredRawPricesMd,
  saveStoredPricingCatalog,
  resetPricingCatalog,
} from '../../utils/pricingParser';

interface PricesEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  packages: BrandPackages[];
  onCatalogueUpdated: (updated: BrandPackages[]) => void;
}

export const PricesEditorModal: React.FC<PricesEditorModalProps> = ({
  isOpen,
  onClose,
  packages,
  onCatalogueUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<'markdown' | 'visual'>('markdown');
  const [markdownText, setMarkdownText] = useState(() => getStoredRawPricesMd());
  const [editablePackages, setEditablePackages] = useState<BrandPackages[]>(() =>
    JSON.parse(JSON.stringify(packages))
  );
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const showToast = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (content) {
        setMarkdownText(content);
        const parsed = saveStoredRawPricesMd(content);
        setEditablePackages(JSON.parse(JSON.stringify(parsed)));
        onCatalogueUpdated(parsed);
        showToast(`Successfully uploaded and parsed "${file.name}"!`);
      }
    };
    reader.readAsText(file);
  };

  const handleSaveMarkdown = () => {
    const parsed = saveStoredRawPricesMd(markdownText);
    setEditablePackages(JSON.parse(JSON.stringify(parsed)));
    onCatalogueUpdated(parsed);
    showToast('Markdown parsed and pricing catalog updated successfully!');
  };

  const handleSaveVisual = () => {
    saveStoredPricingCatalog(editablePackages);
    onCatalogueUpdated(editablePackages);
    showToast('Visual pricing changes saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all prices back to default Prices.md? Any custom edits will be lost.')) {
      const res = resetPricingCatalog();
      setMarkdownText(res.rawMd);
      setEditablePackages(JSON.parse(JSON.stringify(res.packages)));
      onCatalogueUpdated(res.packages);
      showToast('Reset to default studio prices!');
    }
  };

  const handleDownloadMd = () => {
    const blob = new Blob([markdownText], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Prices.md';
    link.click();
    URL.revokeObjectURL(url);
  };

  // Helper for updating tier fields visually
  const handleUpdateTier = (
    brandIdx: number,
    tierIdx: number,
    field: keyof PackageTier,
    val: any
  ) => {
    const updated = [...editablePackages];
    const tier = { ...updated[brandIdx].tiers[tierIdx], [field]: val };
    if (field === 'price') {
      tier.originalPrice = Number(val) || 0;
    }
    updated[brandIdx].tiers[tierIdx] = tier;
    setEditablePackages(updated);
  };

  // Helper for updating addon fields visually
  const handleUpdateAddon = (
    brandIdx: number,
    addonIdx: number,
    field: keyof PackageAddon,
    val: any
  ) => {
    const updated = [...editablePackages];
    updated[brandIdx].addons[addonIdx] = {
      ...updated[brandIdx].addons[addonIdx],
      [field]: field === 'price' ? Number(val) || 0 : val,
    };
    setEditablePackages(updated);
  };

  const handleAddAddon = (brandIdx: number) => {
    const updated = [...editablePackages];
    updated[brandIdx].addons.push({
      id: `addon-custom-${Date.now()}`,
      name: 'New Custom Add-on',
      price: 5000,
    });
    setEditablePackages(updated);
  };

  const handleRemoveAddon = (brandIdx: number, addonIdx: number) => {
    const updated = [...editablePackages];
    updated[brandIdx].addons.splice(addonIdx, 1);
    setEditablePackages(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 sm:p-6 overflow-y-auto">
      <div className="bg-[#FFFFFF] border border-[#E7DFD5] w-full max-w-4xl rounded-2xl shadow-xl flex flex-col max-h-[90vh] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-[#EAE3D9] flex items-center justify-between bg-[#FCFBF9]">
          <div>
            <h2 className="font-serif text-lg font-semibold text-[#221F20]">
              Pricing & Catalog Manager
            </h2>
            <p className="text-xs text-[#78716C]">
              Sync with your CRM <code className="text-[#581825] font-mono">Prices.md</code>, upload new files, or edit rates inline.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#78716C] hover:text-[#221F20] hover:bg-[#F3EDE5] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher & Actions */}
        <div className="px-6 py-2.5 bg-[#FAF8F5] border-b border-[#EAE3D9] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-1.5 p-1 bg-[#EFE9E0] rounded-lg">
            <button
              onClick={() => setActiveTab('markdown')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'markdown'
                  ? 'bg-white text-[#581825] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#221F20]'
              }`}
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>Prices.md (Markdown)</span>
            </button>
            <button
              onClick={() => setActiveTab('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md font-medium transition-all ${
                activeTab === 'visual'
                  ? 'bg-white text-[#581825] shadow-xs font-semibold'
                  : 'text-[#78716C] hover:text-[#221F20]'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Visual Price Editor</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[#78716C] hover:text-[#221F20] hover:bg-[#EFE9E0] transition-colors"
              title="Reset back to default Prices.md"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Defaults</span>
            </button>
            <button
              onClick={handleDownloadMd}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-md text-[#78716C] hover:text-[#221F20] hover:bg-[#EFE9E0] transition-colors"
              title="Download Prices.md file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export .md</span>
            </button>
          </div>
        </div>

        {/* Toast alert */}
        {statusMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a] shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {activeTab === 'markdown' ? (
            <div className="space-y-4">
              {/* File Upload Box */}
              <div className="p-4 rounded-xl border border-dashed border-[#D8CEBE] bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FAF2F4] border border-[#ECC7D0] text-[#581825] flex items-center justify-center shrink-0">
                    <Upload className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-[#221F20]">Upload New Prices.md</p>
                    <p className="text-[11px] text-[#78716C]">
                      Drop or select your updated CRM Markdown file to populate packages and add-ons.
                    </p>
                  </div>
                </div>

                <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-[#581825] hover:bg-[#43121C] rounded-lg cursor-pointer transition-colors shadow-xs">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose .md File</span>
                  <input
                    type="file"
                    accept=".md,.txt"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {/* Textarea for Direct Markdown Editing */}
              <div>
                <div className="flex items-center justify-between mb-1.5 text-xs">
                  <label className="font-semibold text-[#4A4646]">
                    Markdown Content (Prices.md)
                  </label>
                  <span className="text-[11px] text-[#78716C]">
                    Directly editable — includes Parva Weddings, Origins, and PBO tables
                  </span>
                </div>
                <textarea
                  value={markdownText}
                  onChange={(e) => setMarkdownText(e.target.value)}
                  rows={15}
                  className="w-full p-4 font-mono text-xs bg-[#FAF8F5] border border-[#D8CEBE] rounded-xl text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825] leading-relaxed"
                  placeholder="# OCEAN & ORIGIN | LAUNCH PRICING..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleSaveMarkdown}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#581825] hover:bg-[#43121C] rounded-lg shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Apply & Save Changes</span>
                </button>
              </div>
            </div>
          ) : (
            /* Visual Price Editor */
            <div className="space-y-8">
              {editablePackages.map((brand, bIdx) => (
                <div
                  key={brand.brand}
                  className="p-5 rounded-xl bg-[#FAF8F5] border border-[#E7DFD5] space-y-4"
                >
                  <div className="flex items-center gap-2 pb-2 border-b border-[#EAE3D9]">
                    <span className="text-xl">{brand.emoji}</span>
                    <div>
                      <h3 className="text-sm font-serif font-bold text-[#581825]">
                        {brand.brand}
                      </h3>
                      <p className="text-[11px] text-[#78716C]">{brand.tagline}</p>
                    </div>
                  </div>

                  {/* Tiers */}
                  <div className="space-y-3">
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A4646]">
                      Package Tiers
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {brand.tiers.map((tier, tIdx) => (
                        <div
                          key={tier.id}
                          className="p-3.5 rounded-lg bg-white border border-[#D8CEBE] space-y-2 text-xs"
                        >
                          <div>
                            <label className="block text-[10px] text-[#78716C] mb-0.5">Tier Name</label>
                            <input
                              type="text"
                              value={tier.name}
                              onChange={(e) =>
                                handleUpdateTier(bIdx, tIdx, 'name', e.target.value)
                              }
                              className="w-full px-2 py-1 border border-[#D8CEBE] rounded text-xs font-semibold text-[#221F20]"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-[#78716C] mb-0.5">Price (₹ INR)</label>
                            <input
                              type="number"
                              value={tier.price}
                              onChange={(e) =>
                                handleUpdateTier(bIdx, tIdx, 'price', e.target.value)
                              }
                              className="w-full px-2 py-1 border border-[#D8CEBE] rounded text-xs font-mono text-[#581825] font-bold"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] text-[#78716C] mb-0.5">Coverage / Hours</label>
                            <input
                              type="text"
                              value={tier.coverage}
                              onChange={(e) =>
                                handleUpdateTier(bIdx, tIdx, 'coverage', e.target.value)
                              }
                              className="w-full px-2 py-1 border border-[#D8CEBE] rounded text-xs text-[#221F20]"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Add-ons */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold uppercase tracking-wider text-[#4A4646]">
                        Studio Add-ons & Upgrades
                      </h4>
                      <button
                        onClick={() => handleAddAddon(bIdx)}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#581825] hover:underline"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Add Service</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {brand.addons.map((addon, aIdx) => (
                        <div
                          key={addon.id || aIdx}
                          className="p-2.5 rounded-lg bg-white border border-[#D8CEBE] flex items-center justify-between gap-2"
                        >
                          <input
                            type="text"
                            value={addon.name}
                            onChange={(e) =>
                              handleUpdateAddon(bIdx, aIdx, 'name', e.target.value)
                            }
                            className="flex-1 px-2 py-1 border border-[#D8CEBE] rounded text-xs text-[#221F20]"
                          />
                          <div className="flex items-center gap-1 w-28 shrink-0">
                            <span className="text-[11px] text-[#78716C]">₹</span>
                            <input
                              type="number"
                              value={addon.price}
                              onChange={(e) =>
                                handleUpdateAddon(bIdx, aIdx, 'price', e.target.value)
                              }
                              className="w-full px-2 py-1 border border-[#D8CEBE] rounded text-xs font-mono font-medium text-[#221F20]"
                            />
                          </div>
                          <button
                            onClick={() => handleRemoveAddon(bIdx, aIdx)}
                            className="p-1 text-[#9E9486] hover:text-[#A82B3E] transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={handleSaveVisual}
                  className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-[#581825] hover:bg-[#43121C] rounded-lg shadow-sm transition-colors"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Save Pricing Adjustments</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
