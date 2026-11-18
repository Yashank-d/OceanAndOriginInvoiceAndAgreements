# Shared Data Model

Use one shared data model for all document generators.

Suggested logical structure:

BookingDocumentData
- client
- booking
- services
- deliverables
- commercial
- delivery
- specialTerms

Client:
- name
- address
- phone
- email

Booking:
- bookingId
- bookingDate
- eventType
- eventDate
- location
- coverageStart
- coverageEnd

Services:
- packageName
- selectedServices[]
- additionalServices[]
- teamDetails

Deliverables:
- items[]

Commercial:
- totalFee
- bookingAdvance
- preEventPayment
- finalPayment
- paymentDates
- additionalCharges
- travelAccommodation

Delivery:
- expectedTimeline
- photographyRevisions
- filmRevisions
- archivalPeriod

SpecialTerms:
- text

Invoice-specific data can extend the shared structure with:
- invoiceNumber
- invoiceDate
- dueDate
- lineItems[]
- discount
- taxEnabled
- taxRate
- paymentStatus
- amountPaid
- paymentMethod
- notes

The exact implementation can follow the existing project architecture.

Validation is required.
Money calculations must be deterministic and accurate.
