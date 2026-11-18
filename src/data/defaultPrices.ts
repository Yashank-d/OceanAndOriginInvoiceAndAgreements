import { BrandPackages } from '../types/quote';

export const DEFAULT_PRICES_MARKDOWN = `# OCEAN & ORIGIN | LAUNCH PRICING

## PARVA WEDDINGS

### Pre-Wedding
**₹25,000 | Up to 5 Hours**

- 1 Photographer
- 150+ edited photographs
- 1 short cinematic film
- 1 Instagram reel
- Private online gallery

Optional cinematographer: ₹10,000

### Mini Wedding
**₹65,000 | Up to 8 Hours**

- 1 Photographer
- 1 Cinematographer
- 300+ edited photographs
- 60 to 90 sec cinematic teaser
- 3 min cinematic wedding film
- 1 Instagram reel
- Private online gallery

Ideal for: Temple weddings, register weddings, court weddings, intimate celebrations.

### Destination Wedding
**₹1,50,000 | 2 to 3 Days**

- 2 Photographers
- 2 Cinematographers
- 700+ edited photographs
- 60 to 90 sec cinematic teaser
- 4 to 5 min cinematic wedding film
- 2 Instagram reels
- 20-sheet premium album
- Private online gallery

Travel and accommodation: charged separately at actuals.

### Parva Weddings Add-ons

| Add-on | Price |
|---|---:|
| Additional Photographer | ₹12,000/day |
| Additional Cinematographer | ₹15,000/day |
| Extra Event, up to 6 hrs | ₹30,000 |
| Extra Event, up to 8 hrs | ₹40,000 |
| Pre-Wedding Photo + Film | ₹35,000 |
| Additional Instagram Reel | ₹4,000 |
| Extended Wedding Film | ₹15,000 |
| Drone Coverage | ₹8,000 |
| 20-sheet Premium Album | ₹15,000 |
| 30-sheet Premium Album | ₹20,000 |
| Rush Delivery | ₹12,000 |

---

## PARVA ORIGINS

### The Moment
**₹18,000 | Up to 4 Hours**

- 1 Photographer
- 150+ edited photographs
- Candid and documentary coverage
- Essential family portraits
- Private online gallery

### The Story
**₹32,000 | Up to 6 Hours**

- 1 Photographer
- 1 Cinematographer
- 250+ edited photographs
- 60 to 90 sec cinematic film
- 1 Instagram reel
- Family portrait session
- Private online gallery

### The Legacy
**₹50,000 | Up to 8 Hours**

- 2 Photographers
- 1 Cinematographer
- 400+ edited photographs
- 60 to 90 sec cinematic teaser
- 3 to 4 min cinematic film
- 1 Instagram reel
- 20-sheet premium album
- Family portrait session
- Private online gallery

### Parva Origins Add-ons

| Add-on | Price |
|---|---:|
| Additional Hour | ₹3,000 |
| Additional Photographer | ₹10,000/day |
| Additional Cinematographer | ₹12,000/day |
| Additional Instagram Reel | ₹3,500 |
| Extended Film | ₹10,000 |
| Drone Coverage | ₹8,000 |
| 20-sheet Premium Album | ₹15,000 |
| 30-sheet Premium Album | ₹20,000 |
| Parent Album | ₹8,000 |
| Family Portrait Session | ₹8,000 |
| Rush Delivery | ₹8,000 |

---

## PROJECT BURNT OCEAN

### Shooting

| Shoot | Price |
|---|---:|
| Hourly | ₹5,000/hour |
| Half Day | ₹20,000 / 4 hours |
| Full Day | ₹35,000 / 8 hours |

**Standard team for half-day and full-day:** 1 Photographer + 1 Videographer.

### Deliverables

| Deliverable | Price |
|---|---:|
| 10 Edited Photographs | ₹4,000 |
| Premium Retouched Photograph | ₹750/image |
| 1 Minute Edited Video | ₹7,500 |
| Vertical Reel | ₹4,000 |
| Advanced Colour Grade | ₹3,000/min |

### Production Add-ons

| Add-on | Price |
|---|---:|
| Additional Photographer | ₹10,000/day |
| Additional Videographer | ₹12,000/day |
| Assistant | ₹3,000/day |
| Gimbal Coverage | ₹5,000/day |
| Drone Coverage | ₹8,000/day |

### What We Shoot

**Portfolio:** Models, actors, creators, personal branding

**Content:** UGC, social media, creator content, short-form video

**Brands:** Fashion, products, campaign content, brand visuals

### Third-party costs

Studio, models/creators, makeup, hair, styling, props, locations, equipment rentals and travel are charged separately at actuals.

### PBO Approach

**You bring the brief. We shoot it.**

No mandatory creative consultation, storyboard, moodboard or pre-production.

---

## GENERAL NOTES

- All prices are in INR.
- GST is currently not included or charged.
- Travel outside Bengaluru is charged separately where applicable.
- Applicable third-party expenses are additional.
- Final quotation is based on the confirmed scope and requirements.
`;

export const DEFAULT_BRAND_PACKAGES: BrandPackages[] = [
  {
    brand: 'Parva Weddings',
    emoji: '💍',
    tagline: 'Intimate moments, cinematic storytelling, and timeless wedding archives.',
    tiers: [
      {
        id: 'pw-pre-wedding',
        name: 'Pre-Wedding',
        tagline: 'Up to 5 Hours',
        originalPrice: 25000,
        price: 25000,
        discountPct: 0,
        coverage: 'Up to 5 Hours',
        crew: '1 Photographer',
        deliverables: [
          '150+ edited photographs',
          '1 short cinematic film',
          '1 Instagram reel',
          'Private online gallery',
          'Optional cinematographer: ₹10,000',
        ],
      },
      {
        id: 'pw-mini-wedding',
        name: 'Mini Wedding',
        tagline: 'Up to 8 Hours',
        originalPrice: 65000,
        price: 65000,
        discountPct: 0,
        coverage: 'Up to 8 Hours',
        crew: '1 Photographer + 1 Cinematographer',
        deliverables: [
          '300+ edited photographs',
          '60 to 90 sec cinematic teaser',
          '3 min cinematic wedding film',
          '1 Instagram reel',
          'Private online gallery',
          'Ideal for: Temple weddings, register weddings, court weddings, intimate celebrations',
        ],
      },
      {
        id: 'pw-destination-wedding',
        name: 'Destination Wedding',
        tagline: '2 to 3 Days',
        originalPrice: 150000,
        price: 150000,
        discountPct: 0,
        coverage: '2 to 3 Days',
        crew: '2 Photographers + 2 Cinematographers',
        deliverables: [
          '700+ edited photographs',
          '60 to 90 sec cinematic teaser',
          '4 to 5 min cinematic wedding film',
          '2 Instagram reels',
          '20-sheet premium album',
          'Private online gallery',
          'Travel and accommodation: charged separately at actuals',
        ],
      },
    ],
    addons: [
      { id: 'pw-add-photographer', name: 'Additional Photographer', price: 12000, unit: '/day' },
      { id: 'pw-add-cinematographer', name: 'Additional Cinematographer', price: 15000, unit: '/day' },
      { id: 'pw-extra-event-6h', name: 'Extra Event, up to 6 hrs', price: 30000 },
      { id: 'pw-extra-event-8h', name: 'Extra Event, up to 8 hrs', price: 40000 },
      { id: 'pw-prewed-photo-film', name: 'Pre-Wedding Photo + Film', price: 35000 },
      { id: 'pw-add-reel', name: 'Additional Instagram Reel', price: 4000 },
      { id: 'pw-extended-film', name: 'Extended Wedding Film', price: 15000 },
      { id: 'pw-drone', name: 'Drone Coverage', price: 8000 },
      { id: 'pw-album-20', name: '20-sheet Premium Album', price: 15000 },
      { id: 'pw-album-30', name: '30-sheet Premium Album', price: 20000 },
      { id: 'pw-rush-delivery', name: 'Rush Delivery', price: 12000 },
    ],
    notes: [
      'Travel and accommodation outside Bengaluru charged separately at actuals.',
      'Raw unedited files are preserved in high-speed cloud archives for 6 months.',
      'Delivery timeline: 4 to 6 weeks from client selection.',
    ],
  },
  {
    brand: 'Parva Origins',
    emoji: '🌿',
    tagline: 'Lifestyle, portraits, and milestones. Documenting life as it happens.',
    tiers: [
      {
        id: 'po-the-moment',
        name: 'The Moment',
        tagline: 'Up to 4 Hours',
        originalPrice: 18000,
        price: 18000,
        discountPct: 0,
        coverage: 'Up to 4 Hours',
        crew: '1 Photographer',
        deliverables: [
          '150+ edited photographs',
          'Candid and documentary coverage',
          'Essential family portraits',
          'Private online gallery',
        ],
      },
      {
        id: 'po-the-story',
        name: 'The Story',
        tagline: 'Up to 6 Hours',
        originalPrice: 32000,
        price: 32000,
        discountPct: 0,
        coverage: 'Up to 6 Hours',
        crew: '1 Photographer + 1 Cinematographer',
        deliverables: [
          '250+ edited photographs',
          '60 to 90 sec cinematic film',
          '1 Instagram reel',
          'Family portrait session',
          'Private online gallery',
        ],
      },
      {
        id: 'po-the-legacy',
        name: 'The Legacy',
        tagline: 'Up to 8 Hours',
        originalPrice: 50000,
        price: 50000,
        discountPct: 0,
        coverage: 'Up to 8 Hours',
        crew: '2 Photographers + 1 Cinematographer',
        deliverables: [
          '400+ edited photographs',
          '60 to 90 sec cinematic teaser',
          '3 to 4 min cinematic film',
          '1 Instagram reel',
          '20-sheet premium album',
          'Family portrait session',
          'Private online gallery',
        ],
      },
    ],
    addons: [
      { id: 'po-add-hour', name: 'Additional Hour', price: 3000 },
      { id: 'po-add-photographer', name: 'Additional Photographer', price: 10000, unit: '/day' },
      { id: 'po-add-cinematographer', name: 'Additional Cinematographer', price: 12000, unit: '/day' },
      { id: 'po-add-reel', name: 'Additional Instagram Reel', price: 3500 },
      { id: 'po-extended-film', name: 'Extended Film', price: 10000 },
      { id: 'po-drone', name: 'Drone Coverage', price: 8000 },
      { id: 'po-album-20', name: '20-sheet Premium Album', price: 15000 },
      { id: 'po-album-30', name: '30-sheet Premium Album', price: 20000 },
      { id: 'po-parent-album', name: 'Parent Album', price: 8000 },
      { id: 'po-family-portrait', name: 'Family Portrait Session', price: 8000 },
      { id: 'po-rush-delivery', name: 'Rush Delivery', price: 8000 },
    ],
    notes: [
      'Ideal for maternity, newborn, birthdays, anniversaries, and family milestones.',
      'Delivery timeline: 2 to 3 weeks.',
    ],
  },
  {
    brand: 'Project Burnt Ocean',
    emoji: '🔥',
    tagline: 'You bring the brief. We shoot it.',
    tiers: [
      {
        id: 'pbo-hourly',
        name: 'Hourly Shooting',
        tagline: '₹5,000 / hour',
        originalPrice: 5000,
        price: 5000,
        discountPct: 0,
        coverage: 'Per Hour',
        crew: 'As per brief',
        deliverables: [
          'Pay-as-you-go — ideal for quick tests and pick-ups',
          'Standard team for half/full day not included at this rate',
        ],
      },
      {
        id: 'pbo-half-day',
        name: 'Half Day Shooting',
        tagline: '₹20,000 / 4 hours',
        originalPrice: 20000,
        price: 20000,
        discountPct: 0,
        coverage: '4 Hours',
        crew: '1 Photographer + 1 Videographer',
        deliverables: [
          '4-hour studio or location shoot',
          'Standard team included (1 Photo + 1 Video)',
        ],
      },
      {
        id: 'pbo-full-day',
        name: 'Full Day Shooting',
        tagline: '₹35,000 / 8 hours',
        originalPrice: 35000,
        price: 35000,
        discountPct: 0,
        coverage: '8 Hours',
        crew: '1 Photographer + 1 Videographer',
        deliverables: [
          '8-hour studio or location shoot',
          'Standard team included (1 Photo + 1 Video)',
        ],
      },
    ],
    addons: [
      // Deliverables
      { id: 'pbo-10-photos', name: '10 Edited Photographs', price: 4000, category: 'Deliverables' },
      { id: 'pbo-retouched-photo', name: 'Premium Retouched Photograph', price: 750, unit: '/image', category: 'Deliverables' },
      { id: 'pbo-1min-video', name: '1 Minute Edited Video', price: 7500, category: 'Deliverables' },
      { id: 'pbo-vertical-reel', name: 'Vertical Reel', price: 4000, category: 'Deliverables' },
      { id: 'pbo-color-grade', name: 'Advanced Colour Grade', price: 3000, unit: '/min', category: 'Deliverables' },
      // Production
      { id: 'pbo-add-photographer', name: 'Additional Photographer', price: 10000, unit: '/day', category: 'Production' },
      { id: 'pbo-add-videographer', name: 'Additional Videographer', price: 12000, unit: '/day', category: 'Production' },
      { id: 'pbo-assistant', name: 'Assistant', price: 3000, unit: '/day', category: 'Production' },
      { id: 'pbo-gimbal', name: 'Gimbal Coverage', price: 5000, unit: '/day', category: 'Production' },
      { id: 'pbo-drone', name: 'Drone Coverage', price: 8000, unit: '/day', category: 'Production' },
    ],
    notes: [
      'Portfolio: Models, actors, creators, personal branding.',
      'Content: UGC, social media, creator content, short-form video.',
      'Brands: Fashion, products, campaign content, brand visuals.',
      'Studio, models/creators, makeup, hair, styling, props, locations, equipment rentals and travel are charged separately at actuals.',
      'You bring the brief. We shoot it.',
    ],
  },
];
