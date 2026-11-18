# PARVA DOCUMENT GENERATOR
## Build Rules and Source of Truth

This document controls how Antigravity must build the project.

### Core rule
Build ONE feature at a time.

Never implement multiple major modules in one pass.

Required order:
1. App shell and navigation
2. Shared booking/document data model
3. Agreement form
4. Agreement preview and PDF
5. Booking Schedule
6. Invoice Generator
7. DOCX export
8. Saved Drafts/Documents
9. Final QA

After each phase:
- Run the application.
- Check for errors.
- Test the feature just built.
- Fix issues before continuing.
- Stop and wait for review.

### Anti-overengineering rules
Do not build a CRM.
Do not build contacts, leads, pipelines, communication, analytics, accounting, project management, calendars, or unrelated settings.
Do not redesign existing project architecture unless required.
Do not create a giant form or giant component.
Do not write hundreds of lines of unrelated code in one pass.
Do not add unrequested features.

### Completion rule
A phase is complete only when its UI, data flow, validation and basic error states work.

The visual PDF output is a first-class requirement, not an afterthought.
