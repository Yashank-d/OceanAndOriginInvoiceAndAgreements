export type PackageTier = {
  id: string;
  name: string;
  tagline: string;
  originalPrice: number;
  price: number;
  discountPct: number;
  coverage: string;
  crew: string;
  deliverables: string[];
};

export type PackageAddon = {
  id: string;
  name: string;
  price: number;
  unit?: string;
  category?: string;
};

export type BrandPackages = {
  brand: string;
  emoji: string;
  tagline: string;
  tiers: PackageTier[];
  addons: PackageAddon[];
  notes?: string[];
};

export interface QuoteLineItem {
  id: string;
  name: string;
  description?: string;
  unitPrice: number;
  quantity: number;
  total: number;
  isAddon?: boolean;
}

export interface QuoteClientInfo {
  name: string;
  phone: string;
  email: string;
  eventDate?: string;
  eventType?: string;
  location?: string;
}

export interface QuoteDocumentData {
  quoteNumber: string;
  quoteDate: string;
  validUntil: string;
  brand: string;
  client: QuoteClientInfo;
  selectedTier: PackageTier | null;
  lineItems: QuoteLineItem[];
  customDeliverables: string[];
  basePrice: number;
  addonsTotal: number;
  calculatedTotal: number;
  negotiatedTotal?: number;
  discountAmount?: number;
  specialNotes?: string;
}
