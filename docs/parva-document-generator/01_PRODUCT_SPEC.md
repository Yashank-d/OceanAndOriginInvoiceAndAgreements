# Product Specification

## Product
PARVA DOCUMENT GENERATOR

## Purpose
A small internal tool whose only job is:

INFORMATION → DOCUMENTS

It is not a CRM.

## V1 modules
- Dashboard
- Agreement Generator
- Invoice Generator
- Booking Schedule
- Saved Drafts / Documents
- PDF export
- DOCX export

## Main workflow
Create document → enter information → review → generate → export → save.

Actions:
- Save as Draft
- Edit
- Preview
- Generate PDF
- Generate DOCX
- Download
- Delete
- Duplicate

## Dashboard
Keep it minimal.

Show:
- PARVA DOCUMENT GENERATOR
- New Agreement
- New Invoice
- New Booking Schedule
- Recent Documents

Recent documents show:
- Document name
- Client
- Date
- Type
- Status
- Open/Edit

No analytics or unnecessary widgets.

## Shared information
Agreement, Booking Schedule and Invoice should reuse one shared booking/document data structure.

Groups:
- Client
- Booking
- Services
- Deliverables
- Commercial
- Delivery
- Special Terms

Saved information exists for document generation and drafts only.
