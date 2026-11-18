import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import { BookingSchedulePdfDocument } from '../src/components/booking-schedule/BookingSchedulePdfDocument';
import { SAMPLE_AGREEMENT_FIXTURE } from '../src/utils/defaults';
import { registerPdfFonts } from '../src/lib/pdfFonts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const outputPath = path.resolve(__dirname, '../public/Parva_Booking_Schedule_Generated.pdf');
  const logoPath = path.resolve(__dirname, '../public/logo2.png');
  registerPdfFonts(path.resolve(__dirname, '../public/fonts'));

  console.log('Rendering Booking Schedule PDF to:', outputPath);
  await ReactPDF.renderToFile(
    <BookingSchedulePdfDocument
      document={SAMPLE_AGREEMENT_FIXTURE}
      logoSrc={logoPath}
    />,
    outputPath
  );
  console.log('Booking Schedule PDF successfully generated at:', outputPath);
}

run().catch(console.error);
