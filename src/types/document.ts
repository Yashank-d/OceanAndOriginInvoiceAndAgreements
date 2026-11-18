/**
 * Shared Booking & Document Data Model
 * Source of Truth: docs/parva-document-generator/07_DATA_MODEL.md
 */

export interface ClientData {
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface BookingDetails {
  bookingId: string;
  bookingDate: string;
  eventType: string;
  eventDate: string;
  location: string;
  coverageStart: string;
  coverageEnd: string;
}

export interface ServicesData {
  packageName: string;
  selectedServices: string[];
  additionalServices: string[];
  teamDetails: string;
}

export interface DeliverablesData {
  items: string[];
}

export interface AdditionalCharge {
  id: string;
  description: string;
  amount: number;
}

export interface TravelAccommodation {
  included: boolean;
  details: string;
}

export interface PaymentMilestones {
  totalFee: number;
  bookingAdvance: number;   // 50% default
  preEventPayment: number;  // 30% default
  finalPayment: number;     // 20% default
  advanceDueDate?: string;
  preEventDueDate?: string;
  finalDueDate?: string;
}

export interface CommercialData extends PaymentMilestones {
  additionalCharges: AdditionalCharge[];
  travelAccommodation: TravelAccommodation;
  invoiceReference?: string;
}

export interface DeliveryData {
  expectedTimeline: string;
  photographyRevisions: number; // default: 2 rounds
  filmRevisions: number;        // default: 1 round
  archivalPeriod: string;       // default: "3 months for smaller shoots/events, 6 months for weddings"
}

export interface SpecialTermsData {
  text: string;
}

export interface SignaturesData {
  clientName: string;
  clientSignatureDate: string;
  representativeName: string;
  representativeSignatureDate: string;
}

/**
 * The Core Unified Booking & Document Data Model
 * Shared across Agreement, Booking Schedule, and Invoice
 */
export interface BookingDocumentData {
  id: string;
  documentType: 'Agreement' | 'Booking Schedule' | 'Invoice';
  createdAt: string;
  updatedAt: string;
  client: ClientData;
  booking: BookingDetails;
  services: ServicesData;
  deliverables: DeliverablesData;
  commercial: CommercialData;
  delivery: DeliveryData;
  specialTerms: SpecialTermsData;
  signatures: SignaturesData;
}

/**
 * Invoice Line Item
 */
export interface InvoiceLineItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
}

export interface BankDetails {
  beneficiaryName: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  branch?: string;
  upiId?: string;
}

/**
 * Invoice-specific Extension of the Shared Model
 * Source: docs/parva-document-generator/05_INVOICE_SPEC.md & 07_DATA_MODEL.md
 */
export interface InvoiceDocumentData extends BookingDocumentData {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  lineItems: InvoiceLineItem[];
  discount: number;
  taxEnabled: boolean; // Optional tax, never forced
  taxRate: number;    // e.g., 18 for 18% GST
  paymentStatus: 'Unpaid' | 'Partially Paid' | 'Paid';
  amountPaid: number;
  /** Per-milestone amounts received (50/30/20 of the invoice total). Optional for backward compat. */
  advancePaid?: number;
  preEventPaid?: number;
  finalPaid?: number;
  paymentMethod: string;
  bankDetails?: BankDetails;
  notes: string;
}

export interface ValidationIssue {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationIssue[];
}
