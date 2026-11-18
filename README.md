# Ocean & Origin — Document Generator & Studio Quoting Suite

An editorial-grade commercial document generation suite and quoting engine built for **Ocean and Origin** and its operating brand **The House of Parva** (including *Parva Weddings*, *Parva Origins*, and *Project Burnt Ocean*).

Generates print-ready vector PDFs, interactive client agreements, production booking schedules, commercial invoices, and instant estimates from a unified client data model.

---

## ✨ Features & Modules

### 📑 1. Master Client Booking Agreement
- **Verbatim 8-Clause Legal Framework**: Clauses covering Services & Creative Scope, Fees & Payment Milestones, Cancellation & Rescheduling, Event Responsibilities, Delivery & Archival Retention, Copyright & Portfolio Usage, and General Execution.
- **Dedicated Cover & Execution Pages**: Visual summary card, registered address, and anchored client & partner signature sections.
- **Page Numbering & Initials**: Running footers with initials blocks anchored above running footers on intermediate pages.

### 📅 2. Client Booking Schedule
- **Editorial 2-Page Production Itinerary**: Condensed specification covering client information, shoot dates, venue locations, crew allocations, package deliverables, travel policies, and revision parameters.
- **Standalone or Linked**: Can be generated alongside the master agreement or exported as an independent contract rider.

### 🧾 3. Commercial Invoices & Milestone Tracker
- **Itemized Billing**: Dynamic line items with real-time `qty × rate = amount` calculations.
- **Optional Tax / GST**: Flexible tax toggle (never forced) with customizable GST percentages.
- **50% / 30% / 20% Commercial Milestones**: Automated tracking for Booking Advance, Pre-Event Payment, and Final Delivery Balance.
- **Remittance Box**: Bank beneficiary, bank name, account number, IFSC code, branch, and UPI VPA.

### 💬 4. Studio Quote Generator (`Prices.md` Integration)
- **Live Markdown Sync**: Directly connected to `Prices.md` from the studio CRM.
- **Brand Catalogues**:
  - 💍 **Parva Weddings**: Pre-Wedding, Mini Wedding, Destination Wedding + 11 add-ons.
  - 🌿 **Parva Origins**: The Moment, The Story, The Legacy + 11 add-ons.
  - 🔥 **Project Burnt Ocean**: Hourly, Half Day, Full Day shooting rates + production add-ons & a la carte deliverables.
- **Interactive Markdown & Visual Price Editor**: Upload a new `.md` file, edit raw markdown in-app, or adjust rates visually.
- **1-Click Actions**:
  - **Convert to Booking**: Instantly transfers quotation scope, client details, and agreed totals into the Booking Workspace.
  - **Copy WhatsApp**: Generates formatted markdown text ready to paste directly into WhatsApp or client emails.
  - **Download PDF**: Produces a clean, single-page vector PDF estimate.

### 📁 5. Unified Documents Archive & Cloud Sync
- **Client Folders**: Automatically groups Agreements, Booking Schedules, Invoices, and Quotations under that client's booking ID.
- **Dual Storage Engine**:
  - **Local-First**: Runs offline using browser `localStorage` with debounced active-draft recovery.
  - **Turso Cloud DB**: Optional libSQL / Turso cloud database connection for synchronized team storage.

### ⚙️ 6. Company Profile & Settings
- Manage the registered legal entity (**Ocean and Origin**), brand tagline, registered Bangalore address, contact numbers, official email, website, and default bank details in one place.

---

## 🎨 Brand Design System

Built in accordance with House of Parva's editorial identity:

| Token | Value | Description |
|---|---|---|
| **Deep Burgundy** | `#581825` | Primary brand accent & headers |
| **Warm Ivory** | `#FAF8F5` | Background canvas |
| **Sandstone Border** | `#E7DFD5` | Card outlines & dividers |
| **Ink Text** | `#221F20` | Primary typography |
| **Serif Font** | Playfair Display | Editorial headlines & document titles |
| **Sans Font** | Plus Jakarta Sans | Body text, data tables & forms |

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/) (with Rollup manual chunking for PDF performance)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Vector PDF Engine**: [@react-pdf/renderer](https://react-pdf.org/) (custom TTF font embedding, selectable text, and clean page-breaks)
- **Database (Optional)**: [@libsql/client](https://github.com/tursodatabase/libsql-client-ts) (Turso SQLite)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
- **Node.js** v18.0.0 or higher
- **npm** v9.0.0 or higher

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/Yashank-d/OceanAndOriginInvoiceAndAgreements.git
cd OceanAndOriginInvoiceAndAgreements

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The application will launch at **`http://localhost:3000/`**.

### 4. Build for Production
```bash
npm run build
```
Type-checks TypeScript and compiles production assets into `dist/` with split vendor chunks.

### 5. Preview Production Build
```bash
npm run preview
```

---

## ⚙️ Environment Variables (Optional)

The application works completely offline with zero setup required. If you wish to connect Turso cloud database synchronization, copy `.env.example` to `.env`:

```bash
cp .env.example .env
```

Fill in your Turso credentials:
```env
VITE_TURSO_DATABASE_URL=libsql://your-database-name.turso.io
VITE_TURSO_AUTH_TOKEN=your-turso-token
```

---

## 📂 Project Architecture

```
├── Prices.md                    # Single source of truth for studio package pricing
├── docs/                        # Complete product, legal, and brand specifications
│   └── parva-document-generator/
├── public/                      # Static assets, logos, and typography fonts
│   ├── fonts/                   # Playfair Display & Plus Jakarta Sans TTFs
│   └── logo1.png ... logo4.png
├── src/
│   ├── components/
│   │   ├── agreement/           # 7-step agreement form wizard
│   │   ├── booking-schedule/    # Booking schedule form, preview & PDF renderer
│   │   ├── invoice/             # Invoice form, preview & PDF renderer
│   │   ├── quote/               # Quote preview, PDF document & Prices.md editor
│   │   ├── preview/             # Master agreement document preview & PDF
│   │   └── layout/              # Sidebar & Header navigation chrome
│   ├── content/                 # Verbatim legal contract text clauses
│   ├── context/                 # Reactive DocumentContext & draft auto-saver
│   ├── data/                    # Default pricing catalog seed data
│   ├── lib/                     # Font registration & Turso database client
│   ├── types/                   # TypeScript schemas for documents, quotes, & storage
│   ├── utils/                   # Milestone calculators, date formatters & pricing parser
│   ├── views/                   # Main top-level dashboard and generator screens
│   ├── App.tsx                  # Root navigation & tab router
│   └── main.tsx                 # React entry point
└── vite.config.ts               # Vite configuration with @react-pdf code splitting
```

---

## 📄 License & Ownership

Proprietary. © **Ocean and Origin** • All rights reserved.
Operating under **The House of Parva**.
