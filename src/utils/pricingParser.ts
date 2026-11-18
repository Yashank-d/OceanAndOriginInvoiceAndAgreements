import { BrandPackages, PackageTier } from '../types/quote';
import { DEFAULT_BRAND_PACKAGES, DEFAULT_PRICES_MARKDOWN } from '../data/defaultPrices';

const PRICING_STORAGE_KEY = 'parva_pricing_catalog_v1';
const RAW_MD_STORAGE_KEY = 'parva_prices_markdown_v1';

/**
 * Extracts a numeric INR price from strings like "₹25,000", "₹1,50,000", "25000", etc.
 */
export function extractPrice(str: string): number {
  const cleaned = str.replace(/[₹,\s/day/hour/image/min]/g, '').trim();
  const match = cleaned.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

/**
 * Parses markdown text into BrandPackages.
 * Handles the structure of Prices.md (Headers ##, ###, bullet points, and markdown tables).
 */
export function parsePricesMarkdown(md: string): BrandPackages[] {
  if (!md || md.trim().length === 0) {
    return DEFAULT_BRAND_PACKAGES;
  }

  try {
    const lines = md.split('\n');
    const brands: BrandPackages[] = [];
    let currentBrand: BrandPackages | null = null;
    let currentTier: Partial<PackageTier> | null = null;
    let inTable = false;
    let tableType: 'addons' | 'shooting' | 'deliverables' | 'none' = 'none';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();

      // Brand headers: ## PARVA WEDDINGS
      if (line.startsWith('## ') && !line.startsWith('### ')) {
        // Save previous tier if active
        if (currentBrand && currentTier && currentTier.name) {
          currentBrand.tiers.push(finalizeTier(currentTier, currentBrand.brand));
          currentTier = null;
        }

        const brandTitle = line.replace('##', '').trim();
        const emoji = brandTitle.toLowerCase().includes('wedding')
          ? '💍'
          : brandTitle.toLowerCase().includes('origin')
          ? '🌿'
          : '🔥';

        const matchedDefault = DEFAULT_BRAND_PACKAGES.find(b => 
          b.brand.toLowerCase() === brandTitle.toLowerCase() ||
          brandTitle.toLowerCase().includes(b.brand.toLowerCase())
        );

        currentBrand = {
          brand: matchedDefault ? matchedDefault.brand : brandTitle,
          emoji,
          tagline: matchedDefault ? matchedDefault.tagline : 'Professional Studio Services',
          tiers: [],
          addons: [],
          notes: matchedDefault ? [...matchedDefault.notes || []] : [],
        };
        brands.push(currentBrand);
        inTable = false;
        tableType = 'none';
        continue;
      }

      if (!currentBrand) continue;

      // Table headers: | Add-on | Price | or | Shoot | Price | or | Deliverable | Price |
      if (line.startsWith('|') && line.includes('|')) {
        const lower = line.toLowerCase();
        if (lower.includes('add-on') || lower.includes('addon')) {
          inTable = true;
          tableType = 'addons';
          continue;
        } else if (lower.includes('shoot')) {
          inTable = true;
          tableType = 'shooting';
          continue;
        } else if (lower.includes('deliverable')) {
          inTable = true;
          tableType = 'deliverables';
          continue;
        }

        // Table divider: |---|---:|
        if (line.includes('---')) {
          continue;
        }

        // Table row: | Additional Photographer | ₹12,000/day |
        if (inTable) {
          const cells = line
            .split('|')
            .map(c => c.trim())
            .filter(c => c.length > 0);

          if (cells.length >= 2) {
            const name = cells[0];
            const priceStr = cells[1];
            const price = extractPrice(priceStr);
            const unit = priceStr.includes('/day')
              ? '/day'
              : priceStr.includes('/hour')
              ? '/hour'
              : priceStr.includes('/image')
              ? '/image'
              : priceStr.includes('/min')
              ? '/min'
              : undefined;

            if (tableType === 'shooting') {
              // Shoot tier (e.g. Hourly, Half Day, Full Day in PBO)
              currentBrand.tiers.push({
                id: `tier-${slugify(currentBrand.brand)}-${slugify(name)}`,
                name: name.includes('Shooting') ? name : `${name} Shooting`,
                tagline: priceStr,
                originalPrice: price,
                price: price,
                discountPct: 0,
                coverage: name.toLowerCase().includes('half') ? '4 Hours' : name.toLowerCase().includes('full') ? '8 Hours' : 'Per Hour',
                crew: name.toLowerCase().includes('hourly') ? 'As per brief' : '1 Photographer + 1 Videographer',
                deliverables: name.toLowerCase().includes('hourly')
                  ? ['Pay-as-you-go — ideal for quick tests and pick-ups']
                  : [`${name} shoot with standard team included`],
              });
            } else {
              // Add-on or Deliverable
              currentBrand.addons.push({
                id: `addon-${slugify(currentBrand.brand)}-${slugify(name)}`,
                name,
                price,
                unit,
                category: tableType === 'deliverables' ? 'Deliverables' : undefined,
              });
            }
          }
          continue;
        }
      } else {
        inTable = false;
      }

      // Subheader: ### Pre-Wedding, ### Mini Wedding, etc.
      if (line.startsWith('### ')) {
        if (currentTier && currentTier.name) {
          currentBrand.tiers.push(finalizeTier(currentTier, currentBrand.brand));
        }

        const tierName = line.replace('###', '').trim();
        // Ignore headers like "Parva Weddings Add-ons" or "Third-party costs"
        if (tierName.toLowerCase().includes('add-on') || tierName.toLowerCase().includes('cost') || tierName.toLowerCase().includes('approach')) {
          currentTier = null;
          continue;
        }

        currentTier = {
          id: `tier-${slugify(currentBrand.brand)}-${slugify(tierName)}`,
          name: tierName,
          deliverables: [],
        };
        continue;
      }

      // Price and coverage line: **₹25,000 | Up to 5 Hours**
      if (currentTier && line.includes('**₹') && line.includes('|')) {
        const parts = line.replace(/\*\*/g, '').split('|');
        if (parts.length >= 2) {
          const price = extractPrice(parts[0]);
          const coverage = parts[1].trim();
          currentTier.price = price;
          currentTier.originalPrice = price;
          currentTier.coverage = coverage;
          currentTier.tagline = coverage;
        }
        continue;
      }

      // Bullet points: - 1 Photographer, - 150+ edited photographs
      if (currentTier && line.startsWith('- ')) {
        const bullet = line.replace(/^-\s*/, '').trim();
        if (bullet.toLowerCase().includes('photographer') || bullet.toLowerCase().includes('cinematographer')) {
          currentTier.crew = currentTier.crew ? `${currentTier.crew} + ${bullet}` : bullet;
        }
        currentTier.deliverables = currentTier.deliverables || [];
        currentTier.deliverables.push(bullet);
        continue;
      }
    }

    // Finalize last tier
    if (currentBrand && currentTier && currentTier.name) {
      currentBrand.tiers.push(finalizeTier(currentTier, currentBrand.brand));
    }

    // If any parsed brands are empty or missing tiers, fallback to defaults
    if (brands.length === 0 || brands.every(b => b.tiers.length === 0)) {
      return DEFAULT_BRAND_PACKAGES;
    }

    // Merge in defaults if any default brand is completely missing
    for (const defaultBrand of DEFAULT_BRAND_PACKAGES) {
      const found = brands.find(b => b.brand.toLowerCase() === defaultBrand.brand.toLowerCase());
      if (!found) {
        brands.push(defaultBrand);
      } else if (found.tiers.length === 0) {
        found.tiers = defaultBrand.tiers;
      }
    }

    return brands;
  } catch (err) {
    console.error('Failed to parse Prices.md:', err);
    return DEFAULT_BRAND_PACKAGES;
  }
}

function finalizeTier(tier: Partial<PackageTier>, brandName: string): PackageTier {
  return {
    id: tier.id || `tier-${slugify(brandName)}-${slugify(tier.name || 'custom')}`,
    name: tier.name || 'Standard Package',
    tagline: tier.tagline || tier.coverage || '',
    originalPrice: tier.originalPrice || tier.price || 0,
    price: tier.price || 0,
    discountPct: 0,
    coverage: tier.coverage || 'As per booking',
    crew: tier.crew || '1 Photographer',
    deliverables: tier.deliverables && tier.deliverables.length > 0 ? tier.deliverables : ['Standard documentation'],
  };
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Retrieves the stored pricing catalog from localStorage, or returns default.
 */
export function getStoredPricingCatalog(): BrandPackages[] {
  if (typeof window === 'undefined') return DEFAULT_BRAND_PACKAGES;
  try {
    const raw = localStorage.getItem(PRICING_STORAGE_KEY);
    if (!raw) return DEFAULT_BRAND_PACKAGES;
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed) && parsed.length > 0) {
      return parsed;
    }
  } catch (err) {
    console.error('Error reading pricing catalog from storage:', err);
  }
  return DEFAULT_BRAND_PACKAGES;
}

/**
 * Persists the pricing catalog to localStorage.
 */
export function saveStoredPricingCatalog(packages: BrandPackages[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PRICING_STORAGE_KEY, JSON.stringify(packages));
  } catch (err) {
    console.error('Error saving pricing catalog:', err);
  }
}

/**
 * Retrieves the raw Markdown text from localStorage, or returns default.
 */
export function getStoredRawPricesMd(): string {
  if (typeof window === 'undefined') return DEFAULT_PRICES_MARKDOWN;
  try {
    const raw = localStorage.getItem(RAW_MD_STORAGE_KEY);
    if (raw && raw.trim().length > 0) return raw;
  } catch (err) {
    console.error('Error reading raw prices markdown:', err);
  }
  return DEFAULT_PRICES_MARKDOWN;
}

/**
 * Persists raw Markdown text and re-parses the catalog.
 */
export function saveStoredRawPricesMd(rawMd: string): BrandPackages[] {
  if (typeof window === 'undefined') return DEFAULT_BRAND_PACKAGES;
  try {
    localStorage.setItem(RAW_MD_STORAGE_KEY, rawMd);
    const parsedPackages = parsePricesMarkdown(rawMd);
    saveStoredPricingCatalog(parsedPackages);
    return parsedPackages;
  } catch (err) {
    console.error('Error saving raw prices markdown:', err);
    return DEFAULT_BRAND_PACKAGES;
  }
}

/**
 * Resets pricing catalog and markdown to default Prices.md.
 */
export function resetPricingCatalog(): { packages: BrandPackages[]; rawMd: string } {
  if (typeof window !== 'undefined') {
    try {
      localStorage.removeItem(PRICING_STORAGE_KEY);
      localStorage.removeItem(RAW_MD_STORAGE_KEY);
    } catch (err) {
      console.error('Error resetting pricing storage:', err);
    }
  }
  return {
    packages: DEFAULT_BRAND_PACKAGES,
    rawMd: DEFAULT_PRICES_MARKDOWN,
  };
}
