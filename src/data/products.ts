import { Product, BundlePack, Review } from '../types';

export const SAMPLE_REVIEWS: Review[] = [
  {
    id: 'r1',
    userName: 'Alex Chen',
    userAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '2 days ago',
    title: 'Absolute premium build quality!',
    comment: 'The stitching on the Developer Hoodie is top-notch. It fits perfectly and keeps me cozy during long coding sprints. Express delivery took only 24 hours!',
    verified: true,
    helpfulCount: 42,
  },
  {
    id: 'r2',
    userName: 'Maya Lin',
    userAvatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    rating: 5,
    date: '1 week ago',
    title: 'Minimalist aesthetic & super functional',
    comment: 'The Pixel Smart Temperature Mug keeps my matcha warm all morning right on my desk. Love the subtle LED temperature gauge.',
    verified: true,
    helpfulCount: 28,
  },
  {
    id: 'r3',
    userName: 'David Miller',
    userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    rating: 4,
    date: '2 weeks ago',
    title: 'Great cloud backpack for tech commuters',
    comment: 'Fits my 16-inch laptop, tablet, power bank, and water bottle comfortably with anti-theft compartments. High quality zippers.',
    verified: true,
    helpfulCount: 19,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'google-dev-hoodie',
    name: 'Google Developer Heavyweight Hoodie',
    subtitle: 'Ultra-soft organic fleece with tailored modern drop-shoulder fit',
    tagline: 'The ultimate staple for late-night coding sessions and office comfort.',
    price: 78.00,
    originalPrice: 98.00,
    category: 'Apparel',
    rating: 4.9,
    reviewCount: 342,
    badge: 'Best Seller',
    inStock: true,
    stockLeft: 8,
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Charcoal Black', hex: '#111827' },
      { name: 'Google Blue', hex: '#2563EB' },
      { name: 'Fog White', hex: '#F3F4F6' },
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Crafted from 480 GSM combed organic cotton, this hoodie delivers structured drape, brushed interior softness, and subtle micro-embroidered Google Developer icon branding.',
    features: [
      '480 GSM 100% Organic Heavyweight Cotton',
      'Double-lined fleece hood with metal-tipped drawstrings',
      'Ribbed cuffs and hem reinforced with Lycra',
      'Discreet zipped side pocket for card and keys'
    ],
    specifications: {
      'Material': '100% Organic Heavyweight Cotton',
      'Fit': 'Relaxed Modern Drop-Shoulder',
      'Care': 'Machine wash cold, tumble dry low',
      'Origin': 'Ethically manufactured in Portugal'
    }
  },
  {
    id: 'pixel-smart-mug',
    name: 'Pixel Smart Precision Temperature Mug',
    subtitle: 'Keep drinks at your exact preferred temperature for up to 3 hours',
    tagline: 'Never drink lukewarm coffee during back-to-back video calls again.',
    price: 119.00,
    originalPrice: 139.00,
    category: 'Smart Tech',
    rating: 4.8,
    reviewCount: 215,
    badge: 'GA4 Pick',
    inStock: true,
    stockLeft: 12,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1577937927133-66ef06acdf18?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534653299134-96a171b61581?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Obsidian', hex: '#1F2937' },
      { name: 'Porcelain White', hex: '#F9FAFB' },
      { name: 'Hazel Grey', hex: '#6B7280' },
    ],
    sizes: ['12 oz (355ml)', '16 oz (473ml)'],
    description: 'Controlled directly via smartphone app or subtle capacitive touch rim. Built with scratch-resistant matte ceramic coating and Qi wireless charging coaster base.',
    features: [
      'Precision temperature control (120°F – 145°F)',
      'All-day battery life on included charging coaster',
      'Auto-sleep motion sensor detects when empty',
      'IPX7 fully submersible waterproof for easy washing'
    ],
    specifications: {
      'Capacity': '12 oz / 355 ml',
      'Battery': 'Built-in Lithium-Ion (3 hour cordless)',
      'Connectivity': 'Bluetooth 5.2 LE',
      'In the Box': 'Smart Mug, Qi Coaster, Power Adapter'
    }
  },
  {
    id: 'tensor-mechanical-keyboard',
    name: 'Tensor AI Wireless Mechanical Keyboard',
    subtitle: 'Hot-swappable tactile switches with dedicated AI copilot key',
    tagline: 'Precision tactile response housed in an anodized aluminum frame.',
    price: 149.00,
    originalPrice: 179.00,
    category: 'Desk Essentials',
    rating: 4.95,
    reviewCount: 412,
    badge: 'Best Seller',
    inStock: true,
    stockLeft: 5,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Space Grey', hex: '#374151' },
      { name: 'Chalk Silver', hex: '#E5E7EB' },
    ],
    sizes: ['75% Compact', '100% Full Size'],
    description: 'Designed for high-speed typing and productivity. Features hot-swappable custom lubricated linear switches, per-key RGB backlight, and multi-device Bluetooth switching.',
    features: [
      'CNC milled solid aluminum chassis',
      'Hot-swappable 5-pin key switch sockets',
      'Multi-device pairing across 3 Bluetooth devices + 2.4GHz dongle',
      '4000 mAh battery offering 200 hours typing time'
    ],
    specifications: {
      'Layout': '75% ANSI layout (82 keys)',
      'Keycaps': 'Double-shot PBT OEM profile',
      'Weight': '980 grams',
      'Compatibility': 'macOS, Windows, Android, iOS, ChromeOS'
    }
  },
  {
    id: 'cloud-architect-backpack',
    name: 'Google Cloud Ergonomic Modular Backpack',
    subtitle: 'Waterproof Cordura nylon with dedicated 16-inch suspended tech vault',
    tagline: 'Built for modern tech nomads who demand weather resistance and organization.',
    price: 128.00,
    originalPrice: 150.00,
    category: 'Bags',
    rating: 4.85,
    reviewCount: 189,
    badge: 'New',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Stealth Navy', hex: '#1E3A8A' },
      { name: 'Midnight Charcoal', hex: '#111827' },
    ],
    sizes: ['22L Standard', '28L Travel'],
    description: 'Features a floating tech sleeve that protects laptop edges from ground impacts, magnetic Fidlock key tether, hideaway water bottle pocket, and luggage pass-through strap.',
    features: [
      'Water-repellent Cordura® 1000D ballistic shell',
      'Suspended laptop compartment fits up to 16-inch MacBook',
      'Ergonomic breathable EVA molded back panel',
      'YKK AquaGuard weather-sealed zippers'
    ],
    specifications: {
      'Capacity': '22 Liters',
      'Dimensions': '46 x 30 x 18 cm',
      'Weight': '1.1 kg',
      'Warranty': 'Lifetime Guarantee against manufacturing defects'
    }
  },
  {
    id: 'gemini-neon-desk-light',
    name: 'Gemini AI Gradient Ambient Light Bar',
    subtitle: 'Smart desk light strip with screen sync and color accent aura',
    tagline: 'Transform your workstation lighting with customizable gradient presets.',
    price: 89.00,
    originalPrice: 109.00,
    category: 'Desk Essentials',
    rating: 4.7,
    reviewCount: 156,
    badge: 'GA4 Pick',
    inStock: true,
    stockLeft: 15,
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Anodized Silver', hex: '#D1D5DB' },
      { name: 'Matte Black', hex: '#111827' }
    ],
    sizes: ['Dual Screen 45cm', 'Ultra-Wide 60cm'],
    description: 'No screen glare backlighting designed to eliminate eye fatigue during long desk sessions. Syncs with screen colors or music rhythm via USB-C.',
    features: [
      'Asymmetric optical design prevents screen reflection',
      'Wireless desktop magnetic touch dial for dimming',
      'High Color Rendering Index (CRI > 95)',
      'Dynamic RGB ambient backlighting'
    ],
    specifications: {
      'Power Input': 'USB-C 5V/2A',
      'Color Temp': '2700K - 6500K tunable white',
      'Control': 'Wireless Rotary Dial + Mobile App',
      'Lifespan': '50,000 hours'
    }
  },
  {
    id: 'eco-organic-cotton-tee',
    name: 'Google Minimalist Eco Organic Tee',
    subtitle: 'Pre-shrunk ring-spun organic cotton with ultra-soft hand feel',
    tagline: 'Breathable, timeless daily essential with understated logo detail.',
    price: 34.00,
    originalPrice: 42.00,
    category: 'Apparel',
    rating: 4.9,
    reviewCount: 520,
    badge: 'Save 20%',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Chalk White', hex: '#F9FAFB' },
      { name: 'Deep Royal', hex: '#1D4ED8' },
      { name: 'Sage Green', hex: '#047857' },
      { name: 'Obsidian', hex: '#111827' }
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    description: 'Made from 100% GOTS certified organic combed ring-spun cotton. Cut in a tailored retail fit with durable double-needle stitching.',
    features: [
      '180 GSM mid-weight premium jersey fabric',
      '100% GOTS & Fair Trade Certified Cotton',
      'Tagless neck label for frictionless comfort',
      'Pre-shrunk to retain shape wash after wash'
    ],
    specifications: {
      'Material': '100% Organic Cotton',
      'Fit': 'True to Size Retail Fit',
      'Certifications': 'GOTS, Fair Trade, OEKO-TEX Standard 100',
      'Care': 'Machine wash cold inside out'
    }
  },
  {
    id: 'chrome-stainless-water-bottle',
    name: 'Chrome OS Vacuum Insulated Stainless Flask',
    subtitle: 'Triple-wall copper lining keeps ice cold for 24 hours or hot for 12 hours',
    tagline: 'Leakproof, sweat-free powder coat finish with silicone bottom bumper.',
    price: 38.00,
    originalPrice: 45.00,
    category: 'Drinkware',
    rating: 4.9,
    reviewCount: 280,
    badge: 'Best Seller',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Electric Blue', hex: '#2563EB' },
      { name: 'Matte Jet Black', hex: '#111827' },
      { name: 'Pure Stainless', hex: '#E5E7EB' }
    ],
    sizes: ['24 oz (710ml)', '32 oz (950ml)'],
    description: 'Constructed from food-grade 18/8 stainless steel. Features an integrated magnetic cap holder so your lid stays put while drinking.',
    features: [
      'Triple-wall TempShield™ vacuum insulation',
      '100% leakproof wide-mouth lid with carry handle',
      'BPA-free & Phthalate-free food grade materials',
      'Protective removable silicone bumper'
    ],
    specifications: {
      'Capacity': '24 oz / 710 ml',
      'Steel Grade': '18/8 Pro-Grade Stainless Steel',
      'Dishwasher Safe': 'Yes, top rack recommended',
      'Height': '27.5 cm'
    }
  },
  {
    id: 'noise-cancelling-tech-buds',
    name: 'Google Pixel Active Noise Cancelling Buds Pro',
    subtitle: 'SilentSeal active noise cancellation with Spatial Audio & crystal voice calls',
    tagline: 'Immersion redefined. Seamless automatic switching between devices.',
    price: 189.00,
    originalPrice: 219.00,
    category: 'Smart Tech',
    rating: 4.88,
    reviewCount: 640,
    badge: 'GA4 Pick',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Bay Blue', hex: '#3B82F6' },
      { name: 'Charcoal Black', hex: '#1F2937' },
      { name: 'Porcelain White', hex: '#F9FAFB' }
    ],
    sizes: ['One Size (3 Tip Sizes Included)'],
    description: 'Custom 11mm speaker drivers designed with dynamic bass response. SilentSeal™ technology adapts to your ear canal shape to block maximum noise.',
    features: [
      'Active Noise Cancellation with Transparency Mode',
      '31 hours total listening time with Qi charging case',
      'Multipoint connectivity pairs with 2 devices simultaneously',
      'IPX4 water resistance for workouts'
    ],
    specifications: {
      'Battery': 'Up to 11 hours earbud battery life (ANC off)',
      'Bluetooth': 'Version 5.0 LE',
      'Microphones': '3 mics per earbud with wind-blocking mesh',
      'Weight': '6.2g per earbud'
    }
  },
  {
    id: 'minimalist-desk-mat',
    name: 'MerchFlow Vegan Leather Desk Pad',
    subtitle: 'Dual-sided water-resistant desk protector with integrated magnetic cable organizer',
    tagline: 'Sleek, spill-proof foundation that elevates any home or office workspace.',
    price: 44.00,
    originalPrice: 55.00,
    category: 'Desk Essentials',
    rating: 4.82,
    reviewCount: 230,
    badge: 'New',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Cognac Tan', hex: '#92400E' },
      { name: 'Slate Grey', hex: '#4B5563' },
      { name: 'Midnight Navy', hex: '#1E3A8A' }
    ],
    sizes: ['Medium (80 x 30 cm)', 'Large (90 x 40 cm)'],
    description: 'Crafted from premium eco-friendly PU leather on one side and natural felt on the reverse. Includes a magnetic cable holder to keep charging cords neat.',
    features: [
      'Dual-sided texture (Smooth PU leather / Natural felt)',
      'Waterproof & easy to clean with a damp cloth',
      'Non-slip grip backing keeps keyboard anchored',
      'Includes magnetic cable clip accessory'
    ],
    specifications: {
      'Dimensions': '900 x 400 x 2.5 mm',
      'Material': 'Waterproof PU Leather & Recycled Felt',
      'Warranty': '2 Year Replacement Guarantee'
    }
  },
  {
    id: 'google-ai-ceramic-coffee-cup',
    name: 'Google AI Studio Ceramic Barista Cup',
    subtitle: 'Double-walled thermal insulation ceramic cup with spill-resistant lid',
    tagline: 'Pour morning espresso in a cup built for focus and aesthetic satisfaction.',
    price: 28.00,
    originalPrice: 35.00,
    category: 'Drinkware',
    rating: 4.75,
    reviewCount: 114,
    badge: 'Limited Edition',
    inStock: true,
    stockLeft: 9,
    images: [
      'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Matte Clay', hex: '#B45309' },
      { name: 'Chalk White', hex: '#F3F4F6' },
      { name: 'Midnight Black', hex: '#111827' }
    ],
    sizes: ['10 oz (300ml)'],
    description: 'Tactile textured exterior provides secure non-slip hold. Double-wall ceramic prevents exterior heat transfer while preserving beverage flavor profile.',
    features: [
      '100% natural ceramic body with food-grade silicone sleeve',
      'Double-walled thermal barrier keeps coffee hot for 2 hours',
      'Spill-resistant splash guard press lid',
      'Microwave and dishwasher safe'
    ],
    specifications: {
      'Capacity': '10 oz / 300 ml',
      'Weight': '380g',
      'Material': 'Vitreous Ceramic & Food-Grade Silicone'
    }
  },
  {
    id: 'fast-charge-power-bank',
    name: 'Google Pixel Power Core 10,000mAh Magnetic Power Bank',
    subtitle: 'Snap-and-charge MagSafe compatible 20W USB-C PD ultra-slim portable charger',
    tagline: 'Slim wireless power for long travels, hackathons, and outdoor work.',
    price: 59.00,
    originalPrice: 69.00,
    category: 'Smart Tech',
    rating: 4.86,
    reviewCount: 310,
    badge: 'Best Seller',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1609592424074-124b42385c34?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Graphite', hex: '#374151' },
      { name: 'Sage Green', hex: '#059669' }
    ],
    sizes: ['10,000 mAh Slim'],
    description: 'Built-in N52 neodymium magnets align perfectly for fast 15W wireless magnetic charging. Features simultaneous pass-through charging.',
    features: [
      '15W Fast Magnetic Wireless + 20W Wired USB-C PD',
      'Ultra-slim 14mm aerospace aluminum casing',
      'Charge up to 2 devices at once',
      'LED precision battery status readout'
    ],
    specifications: {
      'Capacity': '10,000 mAh / 38.5Wh',
      'Outputs': 'USB-C (PD 20W), Qi Wireless (15W)',
      'Dimensions': '105 x 66 x 14 mm',
      'Weight': '185 grams'
    }
  },
  {
    id: 'developer-embroidered-cap',
    name: 'Google Merch Low-Profile Unstructured Dad Cap',
    subtitle: '100% organic chino cotton twill with brass strap slider buckle',
    tagline: 'Classic 6-panel design with understated tonal logo embroidery.',
    price: 29.00,
    originalPrice: 35.00,
    category: 'Apparel',
    rating: 4.8,
    reviewCount: 165,
    badge: 'Save 20%',
    inStock: true,
    images: [
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=800&auto=format&fit=crop&q=80'
    ],
    colors: [
      { name: 'Navy Blue', hex: '#1E3A8A' },
      { name: 'Washed Black', hex: '#1F2937' },
      { name: 'Sand Khaki', hex: '#D97706' }
    ],
    sizes: ['One Size (Adjustable Strap)'],
    description: 'Relaxed unstructured crown for comfortable everyday wear. Pre-curved visor with 6 embroidered ventilation eyelets.',
    features: [
      '100% Washed Organic Cotton Twill',
      'Antique brass tri-glide buckle closure',
      'Moisture-wicking internal cotton sweatband',
      'One size fits most (55-61 cm circumference)'
    ],
    specifications: {
      'Material': '100% Cotton Twill',
      'Visor': 'Pre-curved 7 cm',
      'Crown': 'Low Profile 6-Panel Unstructured'
    }
  }
];

export const FEATURED_BUNDLE: BundlePack = {
  id: 'developer-starter-pack',
  title: 'Google Cloud Developer Starter Bundle',
  tagline: 'Everything you need for maximum productivity at a 25% bundle discount',
  originalTotalPrice: 270.00,
  bundlePrice: 199.00,
  savings: 71.00,
  badge: 'Save $71.00',
  items: [
    PRODUCTS[0], // Heavyweight Hoodie
    PRODUCTS[2], // Mechanical Keyboard
    PRODUCTS[6]  // Water Flask
  ]
};
