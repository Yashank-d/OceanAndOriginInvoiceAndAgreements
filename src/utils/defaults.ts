import { BookingDocumentData, InvoiceDocumentData, BankDetails } from '../types/document';
import { calculateMilestones } from './calculations';

export interface CompanyProfile {
  legalEntity: string;
  operatingBrand: string;
  tagline: string;
  address: {
    line1: string;
    line2: string;
    city: string;
    state: string;
    pincode: string;
  };
  phones: string[];
  email: string;
  website: string;
  cityFooter: string;
  bankDetails: BankDetails;
}

export const COMPANY_PROFILE: CompanyProfile = {
  legalEntity: 'OCEAN AND ORIGIN',
  operatingBrand: 'The House of Parva',
  tagline: 'Photography • Films • Stories',
  address: {
    line1: '2043/C, 1st Main, 3rd Cross',
    line2: 'Sanjeevininagar, Mudalapalaya',
    city: 'Bangalore',
    state: 'Karnataka',
    pincode: '560072',
  },
  phones: ['+91 7892524833', '+91 9739585818'],
  email: 'hello@thehouseofparva.in',
  website: 'thehouseofparva.in',
  cityFooter: 'Bangalore, Karnataka • Worldwide assignments welcome',
  bankDetails: {
    beneficiaryName: 'OCEAN AND ORIGIN',
    bankName: 'HDFC Bank',
    accountNumber: '50200012345678',
    ifscCode: 'HDFC0001234',
    branch: 'Bengaluru Main Branch',
    upiId: 'thehouseofparva@hdfcbank',
  },
};

const COMPANY_PROFILE_STORAGE_KEY = 'parva_company_profile_v1';

export function getStoredCompanyProfile(): CompanyProfile {
  if (typeof window === 'undefined') return COMPANY_PROFILE;
  try {
    const raw = localStorage.getItem(COMPANY_PROFILE_STORAGE_KEY);
    if (!raw) return COMPANY_PROFILE;
    const parsed = JSON.parse(raw);
    return {
      ...COMPANY_PROFILE,
      ...parsed,
      address: { ...COMPANY_PROFILE.address, ...(parsed.address || {}) },
      bankDetails: { ...COMPANY_PROFILE.bankDetails, ...(parsed.bankDetails || {}) },
    };
  } catch (err) {
    console.error('Failed to read company profile from storage:', err);
    return COMPANY_PROFILE;
  }
}

export function saveStoredCompanyProfile(profile: Partial<CompanyProfile>): CompanyProfile {
  const current = getStoredCompanyProfile();
  const updated: CompanyProfile = {
    ...current,
    ...profile,
    address: { ...current.address, ...(profile.address || {}) },
    bankDetails: { ...current.bankDetails, ...(profile.bankDetails || {}) },
  };
  try {
    localStorage.setItem(COMPANY_PROFILE_STORAGE_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error('Failed to save company profile to storage:', err);
  }
  return updated;
}

/**
 * Creates an empty default booking document
 */
export function createDefaultBookingData(type: 'Agreement' | 'Booking Schedule' | 'Invoice' = 'Agreement'): BookingDocumentData {
  const totalFee = 150000;
  const milestones = calculateMilestones(totalFee);

  return {
    id: `DOC-${Date.now()}`,
    documentType: type,
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0],
    client: {
      name: '',
      address: '',
      phone: '',
      email: '',
    },
    booking: {
      bookingId: `PARVA-${new Date().getFullYear()}-001`,
      bookingDate: new Date().toISOString().split('T')[0],
      eventType: 'Wedding Photography & Film',
      eventDate: '',
      location: 'Bangalore, Karnataka',
      coverageStart: '08:00 AM',
      coverageEnd: '10:00 PM',
    },
    services: {
      packageName: 'Comprehensive Wedding Story',
      selectedServices: [
        'Candid Photography',
        'Cinematic Wedding Film',
        'Traditional / Stage Coverage',
      ],
      additionalServices: [],
      teamDetails: '4-person creative crew (2 photographers, 2 cinematographers)',
    },
    deliverables: {
      items: [
        'Curated selection of 400+ high-resolution edited photographs',
        'Cinematic Wedding Film (4–6 minutes)',
        'Full ceremony documentary cut (45–60 minutes)',
        'Handcrafted 12x12 Premium Fine-Art Wedding Album (40 pages)',
        'Private cloud gallery with high-speed download access',
      ],
    },
    commercial: {
      ...milestones,
      advanceDueDate: 'Upon signing of agreement',
      preEventDueDate: '7 days prior to event',
      finalDueDate: 'Before release of final deliverables',
      additionalCharges: [],
      travelAccommodation: {
        included: true,
        details: 'Local Bangalore travel included. Outstation travel billed at actuals.',
      },
      invoiceReference: 'INV-2026-001',
    },
    delivery: {
      expectedTimeline: '4 to 6 weeks from photograph selection',
      photographyRevisions: 2, // Specification default
      filmRevisions: 1,        // Specification default
      archivalPeriod: '3 months for smaller shoots/events, 6 months for weddings and larger productions',
    },
    specialTerms: {
      text: 'RAW and unedited source files remain excluded unless expressly agreed in writing. High-resolution edited JPEGs will be provided via private gallery.',
    },
    signatures: {
      clientName: '',
      clientSignatureDate: '',
      representativeName: 'Designated Partner',
      representativeSignatureDate: new Date().toISOString().split('T')[0],
    },
  };
}

/**
 * Pre-populated fixture with real-world luxury wedding production data
 * Client: Meera Krishnan & Aditya Singhania
 */
export const SAMPLE_AGREEMENT_FIXTURE: BookingDocumentData = {
  ...createDefaultBookingData('Agreement'),
  id: 'AGR-PARVA-2026-112',
  client: {
    name: 'Meera Krishnan & Aditya Singhania',
    address: 'Villa 14, Prestige Golfshire, Nandi Hills Road, Devanahalli, Bengaluru, Karnataka 560085',
    phone: '+91 98450 67890',
    email: 'meera.aditya@gmail.com',
  },
  booking: {
    bookingId: 'PARVA-2026-112',
    bookingDate: '2026-04-10',
    eventType: 'Three-Day Destination Wedding & Sangeet Gala',
    eventDate: '2026-12-04 to 2026-12-06',
    location: 'Taj West End & Palace Grounds, Bengaluru',
    coverageStart: '06:30 AM',
    coverageEnd: '11:30 PM',
  },
  services: {
    packageName: 'Grand Royal Editorial Wedding Collection (3 Days)',
    selectedServices: [
      'Candid & Editorial Fine-Art Photography',
      'Cinematic 4K Wedding Feature Film & Teaser Trailer',
      'Traditional Ceremony Documentation & Live Archival Feed',
      'Pre-Wedding Sunrise Couple Conceptual Portraiture',
    ],
    additionalServices: [],
    teamDetails: '6-Person Dedicated Creative Crew (3 Editorial Photographers, 2 Cinematographers, 1 Drone Pilot)',
  },
  deliverables: {
    items: [
      'Curated selection of 650+ master-graded, high-resolution digital photographs',
      'Cinematic 4K Wedding Teaser (3 to 5 minutes) delivered within 21 days',
      'Extended Full Ceremony Feature Documentary Film (45 to 60 minutes)',
      'Two Handcrafted 12x12 Premium Italian Leather Fine-Art Wedding Albums (50 pages each)',
      'Two 8x8 Mini-Duplicates for Parents (Fine-Art Archival Paper)',
      'Private Password-Protected Cloud Gallery with 1-Year Ultra-HD Streaming & Archival Downloads',
    ],
  },
  commercial: {
    totalFee: 450000,
    bookingAdvance: 225000, // 50%
    preEventPayment: 135000, // 30%
    finalPayment: 90000,    // 20%
    advanceDueDate: '2026-04-18',
    preEventDueDate: '2026-11-13',
    finalDueDate: 'Upon delivery of cinematic teaser preview',
    additionalCharges: [
      { id: 'c1', description: 'Licensed Dual-Operator 4K Drone Aerial Cinematography', amount: 35000 },
      { id: 'c2', description: 'Heirloom Parent Albums (2x 8x8 Fine-Art Copies)', amount: 25000 },
    ],
    travelAccommodation: {
      included: true,
      details: 'Included in fee for all Bengaluru & Devanahalli locations. Dedicated crew transit provided by Parva.',
    },
    invoiceReference: 'INV-2026-112',
  },
  delivery: {
    expectedTimeline: '4 to 6 weeks from photograph selection',
    photographyRevisions: 2,
    filmRevisions: 1,
    archivalPeriod: '3 months for smaller shoots/events, 6 months for weddings and larger productions',
  },
  specialTerms: {
    text: 'RAW and unedited source files remain excluded unless expressly agreed in writing. High-resolution edited JPEGs will be provided via private gallery. Drone flight subject to venue clearances and DGCA local airspace regulations.',
  },
  signatures: {
    clientName: 'Meera Krishnan',
    clientSignatureDate: '2026-04-12',
    representativeName: 'Designated Partner',
    representativeSignatureDate: '2026-04-12',
  },
};

/**
 * Pre-populated fixture for Invoice
 */
export const SAMPLE_INVOICE_FIXTURE: InvoiceDocumentData = {
  ...SAMPLE_AGREEMENT_FIXTURE,
  documentType: 'Invoice',
  invoiceNumber: 'INV-2026-112',
  invoiceDate: '2026-04-10',
  dueDate: '2026-04-18',
  commercial: {
    ...SAMPLE_AGREEMENT_FIXTURE.commercial,
    additionalCharges: [],
  },
  lineItems: [
    {
      id: 'item-1',
      description: 'Grand Royal Editorial Wedding Collection (3 Days Coverage)',
      quantity: 1,
      rate: 450000,
      amount: 450000,
    },
    {
      id: 'item-2',
      description: 'Licensed Dual-Operator 4K Drone Aerial Cinematography',
      quantity: 1,
      rate: 35000,
      amount: 35000,
    },
    {
      id: 'item-3',
      description: 'Heirloom Parent Albums (2x 8x8 Fine-Art Copies)',
      quantity: 2,
      rate: 12500,
      amount: 25000,
    },
  ],
  discount: 20000,
  taxEnabled: false, // Optional GST per spec
  taxRate: 18,
  paymentStatus: 'Partially Paid',
  amountPaid: 245000, // = advancePaid below (50% of ₹4,90,000 invoice total)
  advancePaid: 245000, // 50% advance received
  preEventPaid: 0,
  finalPaid: 0,
  paymentMethod: 'Bank Transfer (NEFT/RTGS)',
  bankDetails: {
    beneficiaryName: 'OCEAN AND ORIGIN',
    bankName: 'HDFC Bank',
    accountNumber: '50200012345678',
    ifscCode: 'HDFC0001234',
    branch: 'Bengaluru Main Branch',
    upiId: 'thehouseofparva@hdfcbank',
  },
  notes: 'All payments should be remitted to the designated account of OCEAN AND ORIGIN. Deliverables will be released upon full payment of balance due.',
};
