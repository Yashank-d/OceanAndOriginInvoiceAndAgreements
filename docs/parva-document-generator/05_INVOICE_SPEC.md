# Invoice Generator Specification

Create a simple branded invoice generator.

## Invoice fields
- Invoice number
- Invoice date
- Due date

## Client
- Name
- Address
- Phone
- Email

## Items
- Description
- Quantity
- Rate
- Amount

Automatically calculate line amounts.

## Additional charges
- Travel
- Accommodation
- Additional coverage
- Other

## Adjustments
- Discount
- Optional tax

GST/tax must NOT be forced.
Allow tax to be enabled manually when applicable.

## Totals
- Subtotal
- Additional charges
- Discount
- Tax when enabled
- Total

## Payment
- Status: Unpaid / Partially Paid / Paid
- Amount paid
- Balance due
- Payment method
- Notes

Do not build full accounting functionality.

## PDF
Use the same Parva visual system but keep the document unmistakably an invoice.

Header:
THE HOUSE OF PARVA
INVOICE
Invoice number/date/due date

Then:
Bill To
Services table
Totals
Payment information
Notes/terms

Footer:
OCEAN AND ORIGIN
The House of Parva
Address
Phone
Email
Website
