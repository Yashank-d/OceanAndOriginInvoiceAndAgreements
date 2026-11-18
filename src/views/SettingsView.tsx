import React, { useState } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Landmark,
  Save,
  RotateCcw,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import {
  CompanyProfile,
  COMPANY_PROFILE,
  getStoredCompanyProfile,
  saveStoredCompanyProfile,
} from '../utils/defaults';
import { useDocument } from '../context/DocumentContext';

export const SettingsView: React.FC = () => {
  const { updateBankDetails } = useDocument();
  const [profile, setProfile] = useState<CompanyProfile>(() => getStoredCompanyProfile());
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Settings saved successfully');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredCompanyProfile(profile);
    updateBankDetails(profile.bankDetails);
    setToastMessage('Settings and default bank details saved successfully');
    setShowSavedToast(true);
    setTimeout(() => setShowSavedToast(false), 3500);
  };

  const handleReset = () => {
    if (window.confirm('Reset all company and banking settings back to default factory values?')) {
      const resetProfile = saveStoredCompanyProfile(COMPANY_PROFILE);
      setProfile(resetProfile);
      updateBankDetails(resetProfile.bankDetails);
      setToastMessage('Settings reset to system defaults');
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 3500);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-12">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border border-[#E7DFD5] rounded-2xl p-6 sm:p-8 shadow-xs">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-[#FAF2F4] border border-[#ECC7D0] flex items-center justify-center text-[#581825] shrink-0">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-2xl text-[#221F20]">Company & Operational Settings</h1>
            <p className="text-xs text-[#78716C] mt-0.5">
              Manage your legal entity, contact channels, and default remittance bank details.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-[#78716C] hover:text-[#221F20] bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg hover:bg-[#F3EFEA] transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#581825] hover:bg-[#43121C] rounded-lg shadow-xs transition-colors"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </div>

      {/* Success Notification */}
      {showSavedToast && (
        <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] text-[#166534] text-xs flex items-center justify-between shadow-xs transition-all animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#16a34a]" />
            <span className="font-medium">{toastMessage}</span>
          </div>
          <span className="text-[11px] text-[#15803d]">Applied to all documents</span>
        </div>
      )}

      <form onSubmit={handleSave} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column: Legal Entity & Address */}
        <div className="space-y-8">
          {/* Card 1: Legal Entity & Branding */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#EAE3D9] text-[#581825]">
              <Sparkles className="w-4 h-4" />
              <h2 className="text-xs uppercase tracking-wider font-semibold font-serif">Legal & Operating Brand</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Registered Legal Entity Name
                </label>
                <input
                  type="text"
                  value={profile.legalEntity}
                  onChange={(e) => setProfile({ ...profile, legalEntity: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-semibold text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  placeholder="e.g. OCEAN AND ORIGIN"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Operating Brand
                  </label>
                  <input
                    type="text"
                    value={profile.operatingBrand}
                    onChange={(e) => setProfile({ ...profile, operatingBrand: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="e.g. The House of Parva"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Brand Tagline
                  </label>
                  <input
                    type="text"
                    value={profile.tagline}
                    onChange={(e) => setProfile({ ...profile, tagline: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="e.g. Photography • Films • Stories"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Footer Territory / Worldwide Scope Note
                </label>
                <input
                  type="text"
                  value={profile.cityFooter}
                  onChange={(e) => setProfile({ ...profile, cityFooter: e.target.value })}
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  placeholder="e.g. Bangalore, Karnataka • Worldwide assignments welcome"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Registered Address */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#EAE3D9] text-[#581825]">
              <MapPin className="w-4 h-4" />
              <h2 className="text-xs uppercase tracking-wider font-semibold font-serif">Registered Office Address</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Address Line 1
                </label>
                <input
                  type="text"
                  value={profile.address.line1}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      address: { ...profile.address, line1: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  placeholder="e.g. 2043/C, 1st Main, 3rd Cross"
                />
              </div>

              <div>
                <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                  Address Line 2 (Locality / Area)
                </label>
                <input
                  type="text"
                  value={profile.address.line2}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      address: { ...profile.address, line2: e.target.value },
                    })
                  }
                  className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  placeholder="e.g. Sanjeevininagar, Mudalapalaya"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">City</label>
                  <input
                    type="text"
                    value={profile.address.city}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, city: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">State</label>
                  <input
                    type="text"
                    value={profile.address.state}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, state: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">Pincode</label>
                  <input
                    type="text"
                    value={profile.address.pincode}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        address: { ...profile.address, pincode: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Bank Details & Communication */}
        <div className="space-y-8">
          {/* Card 3: Default Bank & Remittance */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#EAE3D9] text-[#581825]">
              <Landmark className="w-4 h-4" />
              <h2 className="text-xs uppercase tracking-wider font-semibold font-serif">Default Bank & Remittance</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Beneficiary Name
                  </label>
                  <input
                    type="text"
                    value={profile.bankDetails.beneficiaryName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bankDetails: { ...profile.bankDetails, beneficiaryName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-medium text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="OCEAN AND ORIGIN"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    value={profile.bankDetails.bankName}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bankDetails: { ...profile.bankDetails, bankName: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="e.g. HDFC Bank"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={profile.bankDetails.accountNumber}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bankDetails: { ...profile.bankDetails, accountNumber: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="e.g. 50200012345678"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    value={profile.bankDetails.ifscCode}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bankDetails: { ...profile.bankDetails, ifscCode: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono uppercase text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="e.g. HDFC0001234"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Branch Name
                  </label>
                  <input
                    type="text"
                    value={profile.bankDetails.branch}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bankDetails: { ...profile.bankDetails, branch: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="e.g. Bengaluru Main Branch"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    UPI ID / VPA
                  </label>
                  <input
                    type="text"
                    value={profile.bankDetails.upiId}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        bankDetails: { ...profile.bankDetails, upiId: e.target.value },
                      })
                    }
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="e.g. thehouseofparva@hdfcbank"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Contact & Online Channels */}
          <div className="bg-white border border-[#E7DFD5] rounded-2xl p-6 shadow-xs space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#EAE3D9] text-[#581825]">
              <Phone className="w-4 h-4" />
              <h2 className="text-xs uppercase tracking-wider font-semibold font-serif">Contact & Communication</h2>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Primary Phone
                  </label>
                  <input
                    type="text"
                    value={profile.phones[0] || ''}
                    onChange={(e) => {
                      const updated = [...profile.phones];
                      updated[0] = e.target.value;
                      setProfile({ ...profile, phones: updated });
                    }}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="+91 7892524833"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Secondary Phone
                  </label>
                  <input
                    type="text"
                    value={profile.phones[1] || ''}
                    onChange={(e) => {
                      const updated = [...profile.phones];
                      updated[1] = e.target.value;
                      setProfile({ ...profile, phones: updated });
                    }}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs font-mono text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="+91 9739585818"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Official Email
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="hello@thehouseofparva.in"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-medium text-[#4A4646] mb-1">
                    Website URL
                  </label>
                  <input
                    type="text"
                    value={profile.website}
                    onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#D8CEBE] rounded-lg text-xs text-[#221F20] focus:outline-none focus:border-[#581825] focus:ring-1 focus:ring-[#581825]"
                    placeholder="thehouseofparva.in"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Bar */}
        <div className="lg:col-span-2 pt-4 flex items-center justify-between border-t border-[#EAE3D9]">
          <p className="text-xs text-[#78716C]">
            Changes are saved locally and immediately populate newly drafted Agreements, Schedules, and Invoices.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-xs font-medium text-[#78716C] hover:text-[#221F20] bg-white border border-[#D8CEBE] rounded-lg transition-colors"
            >
              Reset to Defaults
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2 text-xs font-semibold text-white bg-[#581825] hover:bg-[#43121C] rounded-lg shadow-sm transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
