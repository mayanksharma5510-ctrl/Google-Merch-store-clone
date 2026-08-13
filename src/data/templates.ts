export interface StoreTemplate {
  id: string;
  name: string;
  category: 'Tech & Hardware' | 'Apparel & Hoodies' | 'Accessories & Mugs' | 'Creator & Limited' | 'Employee & Campus' | 'GA4 & Conversion';
  style: 'Editorial' | 'Tech Dark' | 'Playful & Vibrant' | 'Minimalist Light' | 'Dark Luxury';
  rating: number;
  reviewsCount: number;
  storesCreated: number;
  badge?: 'POPULAR' | 'GA4 READY' | 'BEST SELLER' | 'HOT' | 'FEATURED' | 'NEW' | 'HIGH CONVERSION' | 'MOBILE FIRST';
  tagline: string;
  description: string;
  previewImage: string;
  colorPalette: {
    primary: string;
    secondary: string;
    surface: string;
    text: string;
  };
  features: string[];
  themeSettings: {
    primaryColor: string;
    bgStyle: 'white' | 'cream' | 'slate';
    headerStyle: 'pill' | 'solid' | 'minimal';
    heroTitle: string;
    heroSubtitle: string;
    heroBadge: string;
    gridColumns: number;
    enableGA4Ticker: boolean;
    cardRadius: 'full' | 'curved' | 'modern';
  };
}

export const ECOMMERCE_TEMPLATES: StoreTemplate[] = [
  {
    id: 'editorial-minimal',
    name: 'Google Editorial Storefront',
    category: 'Apparel & Hoodies',
    style: 'Editorial',
    rating: 4.92,
    reviewsCount: 318,
    storesCreated: 1420,
    badge: 'POPULAR',
    tagline: 'High-contrast display typography with spacious warm canvas and Google Blue accents.',
    description: 'Designed for high-end developer apparel, organic hoodies, and minimalist desk gear with subtle borders and pill controls.',
    previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#2563EB',
      secondary: '#1E40AF',
      surface: '#F3F4F6',
      text: '#111827',
    },
    features: [
      'Warm Off-White Editorial Background',
      'Pill-Shaped Rounded Buttons & Badges',
      'GA4 Conversion Tracking Modal',
      'Instant Quick View & Cart Drawer',
    ],
    themeSettings: {
      primaryColor: '#2563EB',
      bgStyle: 'white',
      headerStyle: 'pill',
      heroTitle: 'Official Google Developer Apparel & Tech Essentials',
      heroSubtitle: 'Sustainably crafted hoodies, smart mugs, and precision desk accessories engineered for software builders.',
      heroBadge: 'Google Merch Editorial Collection 2026',
      gridColumns: 3,
      enableGA4Ticker: true,
      cardRadius: 'full',
    },
  },
  {
    id: 'pixel-tech-dark',
    name: 'Pixel & Wearables Dark Studio',
    category: 'Tech & Hardware',
    style: 'Dark Luxury',
    rating: 4.96,
    reviewsCount: 245,
    storesCreated: 980,
    badge: 'GA4 READY',
    tagline: 'Sleek dark mode atmosphere with glowing Google quad-color accents.',
    description: 'Tailored for Pixel Smart Mugs, Tensor Mechanical Keyboards, and Bluetooth hardware with high-contrast dark surfaces.',
    previewImage: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#3B82F6',
      secondary: '#10B981',
      surface: '#0F172A',
      text: '#F8FAFC',
    },
    features: [
      'Dark Mode Hardware Showcase Layout',
      'Quad-Color Accent Highlights',
      'Hardware Spec Sheet Grid',
      'Express One-Touch GPay Drawer',
    ],
    themeSettings: {
      primaryColor: '#3B82F6',
      bgStyle: 'slate',
      headerStyle: 'solid',
      heroTitle: 'Pixel & Hardware Innovation Merch',
      heroSubtitle: 'Next-gen desk devices, haptic mechanical keyboards, and temperature-controlled Pixel smart mugs.',
      heroBadge: 'Google Hardware & Wearables',
      gridColumns: 3,
      enableGA4Ticker: true,
      cardRadius: 'curved',
    },
  },
  {
    id: 'developer-hub',
    name: 'Developer & Open Source Hub',
    category: 'Tech & Hardware',
    style: 'Tech Dark',
    rating: 4.89,
    reviewsCount: 512,
    storesCreated: 2100,
    badge: 'BEST SELLER',
    tagline: 'Terminal-inspired grid layouts, mono typography, and code snippet promos.',
    description: 'Built for open-source enthusiasts, Google Cloud engineers, and Android developers seeking functional, tech-forward gear.',
    previewImage: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#10B981',
      secondary: '#059669',
      surface: '#111827',
      text: '#F9FAFB',
    },
    features: [
      'Monospace Terminal Promo Banners',
      'Developer Bundle Savings Calculator',
      'Verified Code Snippet Coupon Bar',
      'GitHub & Cloud Integration Ready',
    ],
    themeSettings: {
      primaryColor: '#10B981',
      bgStyle: 'slate',
      headerStyle: 'pill',
      heroTitle: 'Gear Built for Code. Designed for Engineers.',
      heroSubtitle: 'High-performance mechanical keyboards, code-printed hoodies, and ergonomic workstation essentials.',
      heroBadge: 'Google Open Source Edition',
      gridColumns: 4,
      enableGA4Ticker: false,
      cardRadius: 'modern',
    },
  },
  {
    id: 'android-bugdroid',
    name: 'Android & Bugdroid Fan Shop',
    category: 'Creator & Limited',
    style: 'Playful & Vibrant',
    rating: 4.94,
    reviewsCount: 189,
    storesCreated: 1450,
    badge: 'HOT',
    tagline: 'Energetic Android green aesthetics with collectible sticker pack grids.',
    description: 'Celebrates Android culture with vibrant green branding, bugdroid plushies, collectible pins, and limited edition drops.',
    previewImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#16A34A',
      secondary: '#15803D',
      surface: '#F0FDF4',
      text: '#14532D',
    },
    features: [
      'Android Green Brand Palette',
      'Limited Drop Countdown Timer',
      'Interactive Collectibles Filter',
      'Bugdroid Mascot Badges',
    ],
    themeSettings: {
      primaryColor: '#16A34A',
      bgStyle: 'cream',
      headerStyle: 'pill',
      heroTitle: 'Official Android & Bugdroid Collector Store',
      heroSubtitle: 'Limited-run vinyl bugdroid figures, custom developer sticker packs, and eco-organic tees.',
      heroBadge: 'Android 15 Collector Series',
      gridColumns: 3,
      enableGA4Ticker: true,
      cardRadius: 'full',
    },
  },
  {
    id: 'google-campus',
    name: 'Google Mountain View Campus Store',
    category: 'Employee & Campus',
    style: 'Minimalist Light',
    rating: 4.88,
    reviewsCount: 167,
    storesCreated: 980,
    badge: 'FEATURED',
    tagline: 'Collegiate Google campus branding with automatic employee badge discounts.',
    description: 'Designed after the official Mountain View Visitor Center and employee stores, with clean white cards and Google quad-color accents.',
    previewImage: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#EA4335',
      secondary: '#4285F4',
      surface: '#FFFFFF',
      text: '#1F2937',
    },
    features: [
      'Official Campus Visitor Center Layout',
      'Employee Badge Discount Input',
      'Mountain View Exclusive Tagging',
      'Quad-Color Google Border System',
    ],
    themeSettings: {
      primaryColor: '#EA4335',
      bgStyle: 'white',
      headerStyle: 'solid',
      heroTitle: 'Google Mountain View Headquarters Store',
      heroSubtitle: 'Exclusive campus merchandise, heritage Google logo apparel, and visitor collectibles.',
      heroBadge: 'Official Campus Gear',
      gridColumns: 3,
      enableGA4Ticker: false,
      cardRadius: 'curved',
    },
  },
  {
    id: 'sustainable-eco',
    name: 'Eco-Friendly Sustainable Merch',
    category: 'Accessories & Mugs',
    style: 'Minimalist Light',
    rating: 4.91,
    reviewsCount: 142,
    storesCreated: 760,
    badge: 'NEW',
    tagline: 'Earthy organic neutrals showcasing recycled materials and zero-waste tumblers.',
    description: 'Focused on environmental responsibility with carbon-neutral badges, organic cotton callouts, and bamboo drinkware.',
    previewImage: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#059669',
      secondary: '#047857',
      surface: '#F9FAFB',
      text: '#064E3B',
    },
    features: [
      'Eco Carbon-Offset Calculator',
      'Recycled Materials Origin Labels',
      'Zero-Plastic Shipping Guarantee',
      'Clean Organic Color Scheme',
    ],
    themeSettings: {
      primaryColor: '#059669',
      bgStyle: 'cream',
      headerStyle: 'minimal',
      heroTitle: '100% Sustainable Google Eco Merchandise',
      heroSubtitle: 'GOTS-certified organic cotton, bamboo insulated tumblers, and ocean-bound plastic recycled totes.',
      heroBadge: 'Zero-Waste Initiative',
      gridColumns: 3,
      enableGA4Ticker: false,
      cardRadius: 'full',
    },
  },
  {
    id: 'ga4-powerhouse',
    name: 'GA4 Analytics Conversion Store',
    category: 'GA4 & Conversion',
    style: 'Editorial',
    rating: 4.98,
    reviewsCount: 620,
    storesCreated: 3120,
    badge: 'HIGH CONVERSION',
    tagline: 'Built-in real-time GA4 event ticker, funnel strategy overlay, and instant GPay.',
    description: 'Designed specifically to demonstrate real-time Google Analytics 4 tracking events, conversion goal optimization, and seamless 1-page checkout.',
    previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#D97706',
      secondary: '#B45309',
      surface: '#FFFBEB',
      text: '#78350F',
    },
    features: [
      'Live GA4 Event Stream Banner',
      'Conversion Heatmap Indicator',
      'One-Click Express Checkout',
      'Dynamic Bundle Cross-Selling',
    ],
    themeSettings: {
      primaryColor: '#D97706',
      bgStyle: 'white',
      headerStyle: 'pill',
      heroTitle: 'Data-Driven Google Merch Store with GA4 Analytics',
      heroSubtitle: 'Optimized for peak conversion rates with integrated e-commerce telemetry, bundle incentives, and 1-click payment.',
      heroBadge: 'Google Analytics 4 Enhanced E-commerce',
      gridColumns: 3,
      enableGA4Ticker: true,
      cardRadius: 'full',
    },
  },
  {
    id: 'express-mobile',
    name: 'One-Touch Mobile Express Store',
    category: 'GA4 & Conversion',
    style: 'Playful & Vibrant',
    rating: 4.87,
    reviewsCount: 94,
    storesCreated: 620,
    badge: 'MOBILE FIRST',
    tagline: 'Ultra-fast single screen layout with sticky bottom bag bar and instant quick views.',
    description: 'Optimized for high-speed mobile shopping, event pop-ups, and social media traffic with sub-second quick buy drawer.',
    previewImage: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80',
    colorPalette: {
      primary: '#7C3AED',
      secondary: '#6D28D9',
      surface: '#F5F3FF',
      text: '#4C1D95',
    },
    features: [
      'Mobile-First Sticky Bottom Bag Bar',
      'Sub-100ms Instant Quick View Modal',
      'Swipeable Product Gallery Cards',
      'Apple Pay & Google Pay Express',
    ],
    themeSettings: {
      primaryColor: '#7C3AED',
      bgStyle: 'white',
      headerStyle: 'pill',
      heroTitle: 'Express Google Merch Mobile Kiosk',
      heroSubtitle: 'Instant checkout for event attendees, Google I/O pop-ups, and developer summits.',
      heroBadge: 'Mobile Express 1-Touch',
      gridColumns: 2,
      enableGA4Ticker: true,
      cardRadius: 'full',
    },
  },
];
