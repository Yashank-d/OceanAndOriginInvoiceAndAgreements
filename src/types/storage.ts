import { BookingDocumentData, InvoiceDocumentData } from './document';
import { QuoteDocumentData } from './quote';

export type DocumentType = 'Agreement' | 'Invoice' | 'Booking Schedule' | 'Quotation';
export type DocumentStatus = 'Draft' | 'Final';

export interface SavedDocumentRecord {
  id: string;
  documentType: DocumentType;
  title: string;
  clientName: string;
  bookingId: string;
  date: string;
  status: DocumentStatus;
  createdAt: string;
  updatedAt: string;
  data: BookingDocumentData | InvoiceDocumentData | QuoteDocumentData;
}
