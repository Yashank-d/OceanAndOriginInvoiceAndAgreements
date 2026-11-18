import { Font } from '@react-pdf/renderer';

/**
 * Brand fonts shared by all Parva vector PDFs so the downloaded file uses
 * the exact same typefaces as the on-screen preview:
 *  - Parva Serif = Playfair Display (headings, taglines, riders)
 *  - Parva Sans  = Plus Jakarta Sans (body, tables, labels)
 *
 * Browser: TTFs are served from /public/fonts (auto-registered on import).
 * Node scripts: call registerPdfFonts('<abs path to public/fonts>') first.
 */
let registeredBase: string | null = null;

export function registerPdfFonts(base = '/fonts'): void {
  if (registeredBase === base) return;
  Font.register({
    family: 'Parva Sans',
    fonts: [
      { src: `${base}/JakartaSans-Regular.ttf`, fontWeight: 400 },
      { src: `${base}/JakartaSans-Medium.ttf`, fontWeight: 500 },
      { src: `${base}/JakartaSans-Bold.ttf`, fontWeight: 700 },
    ],
  });
  Font.register({
    family: 'Parva Serif',
    fonts: [
      { src: `${base}/PlayfairDisplay-Regular.ttf`, fontWeight: 400 },
      { src: `${base}/PlayfairDisplay-Bold.ttf`, fontWeight: 700 },
      { src: `${base}/PlayfairDisplay-Italic.ttf`, fontStyle: 'italic' },
    ],
  });
  registeredBase = base;
}

if (typeof window !== 'undefined') {
  registerPdfFonts();
}
