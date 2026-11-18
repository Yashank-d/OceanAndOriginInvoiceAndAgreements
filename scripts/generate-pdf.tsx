import React from 'react';
import ReactPDF from '@react-pdf/renderer';
import path from 'path';
import { fileURLToPath } from 'url';
import { AgreementPdfDocument } from '../src/components/preview/AgreementPdfDocument';
import { SAMPLE_AGREEMENT_FIXTURE } from '../src/utils/defaults';
import { registerPdfFonts } from '../src/lib/pdfFonts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function run() {
  const outputPath = path.resolve(__dirname, '../public/Parva_Master_Agreement_Generated.pdf');
  const watermarkPath = path.resolve(__dirname, '../public/logo3.png');
  registerPdfFonts(path.resolve(__dirname, '../public/fonts'));

  console.log('Rendering Master Agreement PDF to:', outputPath);
  await ReactPDF.renderToFile(
    <AgreementPdfDocument
      document={SAMPLE_AGREEMENT_FIXTURE}
      watermarkSrc={watermarkPath}
    />,
    outputPath
  );
  console.log('PDF successfully generated at:', outputPath);
}

run().catch(console.error);
