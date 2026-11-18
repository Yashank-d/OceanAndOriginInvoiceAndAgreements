import { BookingDocumentData, InvoiceDocumentData, ValidationResult, ValidationIssue } from '../types/document';

/**
 * Validates the core BookingDocumentData
 * Source: docs/parva-document-generator/07_DATA_MODEL.md
 */
export function validateBookingDocument(data: BookingDocumentData): ValidationResult {
  const errors: ValidationIssue[] = [];

  // Client validation
  if (!data.client.name?.trim()) {
    errors.push({ field: 'client.name', message: 'Client name is required.' });
  }
  if (!data.client.phone?.trim()) {
    errors.push({ field: 'client.phone', message: 'Client phone number is required.' });
  }

  // Booking details
  if (!data.booking.eventType?.trim()) {
    errors.push({ field: 'booking.eventType', message: 'Event / Shoot type is required.' });
  }
  if (!data.booking.eventDate?.trim()) {
    errors.push({ field: 'booking.eventDate', message: 'Event date is required.' });
  }
  if (!data.booking.location?.trim()) {
    errors.push({ field: 'booking.location', message: 'Event location is required.' });
  }

  // Commercial
  if (data.commercial.totalFee <= 0) {
    errors.push({ field: 'commercial.totalFee', message: 'Total agreed fee must be greater than zero.' });
  }
  const sumMilestones = 
    data.commercial.bookingAdvance + 
    data.commercial.preEventPayment + 
    data.commercial.finalPayment;

  if (Math.abs(sumMilestones - data.commercial.totalFee) > 1) {
    errors.push({ 
      field: 'commercial.milestones', 
      message: `Milestones sum (₹ ${sumMilestones}) does not match Total Fee (₹ ${data.commercial.totalFee}).` 
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates invoice-specific fields
 */
export function validateInvoiceDocument(data: InvoiceDocumentData): ValidationResult {
  const baseValidation = validateBookingDocument(data);
  const errors = [...baseValidation.errors];

  if (!data.invoiceNumber?.trim()) {
    errors.push({ field: 'invoiceNumber', message: 'Invoice number is required.' });
  }
  if (!data.invoiceDate?.trim()) {
    errors.push({ field: 'invoiceDate', message: 'Invoice date is required.' });
  }
  if (!data.lineItems || data.lineItems.length === 0) {
    errors.push({ field: 'lineItems', message: 'At least one line item is required.' });
  } else {
    data.lineItems.forEach((item, index) => {
      if (!item.description?.trim()) {
        errors.push({ field: `lineItems[${index}].description`, message: `Item #${index + 1} description is required.` });
      }
      if (item.quantity <= 0) {
        errors.push({ field: `lineItems[${index}].quantity`, message: `Item #${index + 1} quantity must be greater than 0.` });
      }
      if (item.rate <= 0) {
        errors.push({ field: `lineItems[${index}].rate`, message: `Item #${index + 1} rate must be greater than 0.` });
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}
