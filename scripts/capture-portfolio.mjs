import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const outputDir = path.resolve(__dirname, '../public/portfolio_assets');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function run() {
  console.log('🚀 Launching Chromium for high-res portfolio capture...');
  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2, // 2x Retina resolution
  });

  const page = await context.newPage();

  console.log('🌐 Navigating to http://localhost:3000...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // 1. Dashboard View
  console.log('📸 1. Capturing Dashboard Overview...');
  await page.screenshot({
    path: path.join(outputDir, '01_dashboard.png'),
    fullPage: false,
  });

  // 2. Quote Generator View
  console.log('📸 2. Capturing Studio Quoting & Pricing Engine...');
  const quoteNav = page.locator('nav button', { hasText: 'Quote Generator' });
  if (await quoteNav.count() > 0) {
    await quoteNav.click();
    await page.waitForTimeout(1500);

    // Fill sample client info in Quote if empty
    const clientNameInput = page.locator('input[placeholder*="Client"], input[placeholder*="Bride"], input[placeholder*="Name"]').first();
    if (await clientNameInput.count() > 0) {
      await clientNameInput.fill('Ananya Sharma & Kabir Mehra');
    }

    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(outputDir, '02_quote_engine.png'),
      fullPage: false,
    });
  }

  // 3. New Booking Workspace
  console.log('📸 3. Capturing Booking Workspace (Client & Booking)...');
  const bookingNav = page.locator('nav button', { hasText: 'New Booking' });
  await bookingNav.click();
  await page.waitForTimeout(1500);

  // Click "Load Sample Agreement" to populate rich realistic studio booking data
  const sampleBtn = page.locator('button', { hasText: 'Load Sample Agreement' });
  if (await sampleBtn.count() > 0) {
    await sampleBtn.click();
    await page.waitForTimeout(1200);
  }

  await page.screenshot({
    path: path.join(outputDir, '03_booking_workspace.png'),
    fullPage: false,
  });

  // 4. Services & Delivery Step
  console.log('📸 4. Capturing Services & Deliverables Matrix...');
  const step2Btn = page.locator('button', { hasText: 'Services & Delivery' });
  if (await step2Btn.count() > 0) {
    await step2Btn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(outputDir, '04_services_matrix.png'),
      fullPage: false,
    });
  }

  // 5. Money & Invoice Step
  console.log('📸 5. Capturing Commercial Milestone & Financial Ledger...');
  const step3Btn = page.locator('button', { hasText: 'Money & Invoice' });
  if (await step3Btn.count() > 0) {
    await step3Btn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({
      path: path.join(outputDir, '05_commercial_ledger.png'),
      fullPage: false,
    });
  }

  // 6. Review & Save - Master Agreement Live Preview
  console.log('📸 6. Capturing Master Agreement Live Vector Preview...');
  const step4Btn = page.locator('button', { hasText: 'Review & Save' });
  if (await step4Btn.count() > 0) {
    await step4Btn.click();
    await page.waitForTimeout(2000); // Allow react-pdf / preview to render
    await page.screenshot({
      path: path.join(outputDir, '06_agreement_preview.png'),
      fullPage: false,
    });

    // 7. Review & Save - Booking Schedule Preview
    console.log('📸 7. Capturing Production Booking Schedule Preview...');
    const scheduleBtn = page.locator('button', { hasText: 'Schedule' }).first();
    if (await scheduleBtn.count() > 0) {
      await scheduleBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: path.join(outputDir, '07_booking_schedule.png'),
        fullPage: false,
      });
    }

    // 8. Review & Save - Invoice Preview
    console.log('📸 8. Capturing Formal Tax Invoice Preview...');
    const invoiceBtn = page.locator('button', { hasText: 'Invoice' }).first();
    if (await invoiceBtn.count() > 0) {
      await invoiceBtn.click();
      await page.waitForTimeout(2000);
      await page.screenshot({
        path: path.join(outputDir, '08_invoice_milestones.png'),
        fullPage: false,
      });
    }
  }

  // 9. Document Repository / Hub
  console.log('📸 9. Capturing Document Repository & Client Archive...');
  const docsNav = page.locator('nav button', { hasText: 'Documents' });
  if (await docsNav.count() > 0) {
    await docsNav.click();
    await page.waitForTimeout(1500);
    await page.screenshot({
      path: path.join(outputDir, '09_document_hub.png'),
      fullPage: false,
    });
  }

  // 10. Settings & Info
  console.log('📸 10. Capturing Studio Entity & Operational Settings...');
  const settingsBtn = page.locator('button', { hasText: 'Settings & Info' });
  if (await settingsBtn.count() > 0) {
    await settingsBtn.click();
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: path.join(outputDir, '10_settings_profile.png'),
      fullPage: false,
    });
  }

  await browser.close();
  console.log('🎉 All high-resolution retina screenshots captured successfully into public/portfolio_assets!');
}

run().catch((err) => {
  console.error('❌ Capture failed:', err);
  process.exit(1);
});
