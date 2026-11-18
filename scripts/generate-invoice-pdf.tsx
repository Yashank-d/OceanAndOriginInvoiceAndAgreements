import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import { InvoicePdfDocument } from '../src/components/invoice/InvoicePdfDocument';
import { SAMPLE_INVOICE_FIXTURE } from '../src/utils/defaults';
import { registerPdfFonts } from '../src/lib/pdfFonts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const outputPath = path.resolve(__dirname, '../public/Parva_Invoice_Generated.pdf');
  const logoPath = path.resolve(__dirname, '../public/logo2.png');
  registerPdfFonts(path.resolve(__dirname, '../public/fonts'));

  console.log('Rendering Invoice PDF to:', outputPath);
  await ReactPDF.renderToFile(
    <InvoicePdfDocument
      invoice={SAMPLE_INVOICE_FIXTURE}
      logoSrc={logoPath}
    />,
    outputPath
  );
  console.log('Invoice PDF successfully generated at:', outputPath);
}

run().catch(console.error);
