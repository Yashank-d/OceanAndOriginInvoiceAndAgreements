export type NavigationTab =
  | 'dashboard'
  | 'booking'
  | 'quotes'
  | 'agreements'
  | 'agreement-preview'
  | 'invoices'
  | 'booking-schedules'
  | 'saved-documents'
  | 'settings';

export interface RecentDocument {
  id: string;
  name: string;
  client: string;
  date: string;
  type: 'Agreement' | 'Invoice' | 'Booking Schedule' | 'Quotation';
  status: 'Draft' | 'Final' | 'Paid' | 'Unpaid';
}
