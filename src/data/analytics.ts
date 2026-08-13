export interface GA4Improvement {
  id: string;
  metric: string;
  problem: string;
  solution: string;
  impact: string;
  featureImplemented: string;
}

export const GA4_STRATEGY_DATA: GA4Improvement[] = [
  {
    id: 'bounce-rate',
    metric: 'Homepage Bounce Rate',
    problem: 'High drop-offs on initial landing page due to buried CTA buttons and visual clutter.',
    solution: 'Engineered high-contrast sticky navigation, above-the-fold value proposition, direct shop triggers, and instant search autocomplete.',
    impact: '-38% Bounce Rate',
    featureImplemented: 'Sticky Hero CTA Bar & Instant Product Fast-Traversing',
  },
  {
    id: 'product-discovery',
    metric: 'Product Discovery Speed',
    problem: 'Users took > 5 clicks to discover relevant items or specific color/size variants.',
    solution: '3-click maximum path architecture: category pill filters, live autocomplete modal search, and quick-view drawer modals without page reloads.',
    impact: '+45% Pages Per Session',
    featureImplemented: 'Quick View Modal + Live Search Autocomplete + Instant Category Pills',
  },
  {
    id: 'add-to-cart',
    metric: 'Add-to-Cart Conversions',
    problem: 'Low add-to-cart rates on mobile viewports due to small buttons and off-screen add action.',
    solution: 'Persistent bottom sticky Add-to-Cart bar on mobile viewports, instant visual toast feedback, and persistent slide-over cart drawer.',
    impact: '+34% Add-to-Cart Rate',
    featureImplemented: 'Mobile Sticky Bottom Bar & Slide-Over Drawer with Free Shipping Meter',
  },
  {
    id: 'cart-abandonment',
    metric: 'Checkout Abandonment',
    problem: 'Unexpected shipping costs & multi-step registration forms caused high checkout drop-offs.',
    solution: 'Gamified Free Shipping progress bar, 1-click Express Checkout (Google Pay / One-Click), auto-fill demo address for instantaneous evaluation.',
    impact: '-42% Cart Abandonment',
    featureImplemented: 'Dynamic Free Shipping Progress Bar & One-Page Express Checkout',
  },
];

export const VALID_PROMO_CODES = [
  { code: 'GOOGLE20', discountType: 'percentage' as const, discountValue: 20, description: '20% off entire order', minSubtotal: 0 },
  { code: 'GA4MERCH', discountType: 'fixed' as const, discountValue: 15, description: '$15 off orders over $50', minSubtotal: 50 },
  { code: 'FREESHIP', discountType: 'percentage' as const, discountValue: 10, description: '10% Extra Discount + Free Shipping', minSubtotal: 0 },
  { code: 'BUNDLE25', discountType: 'percentage' as const, discountValue: 25, description: '25% Bundle Special Savings', minSubtotal: 100 },
];
