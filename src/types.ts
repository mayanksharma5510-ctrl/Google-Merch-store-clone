export type Category = 'All' | 'Apparel' | 'Smart Tech' | 'Desk Essentials' | 'Drinkware' | 'Accessories' | 'Bags';

export interface ProductOption {
  color?: string;
  colorHex?: string;
  size?: string;
}

export interface Review {
  id: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  helpfulCount: number;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  price: number;
  originalPrice?: number;
  category: Category;
  rating: number;
  reviewCount: number;
  badge?: 'Best Seller' | 'New' | 'GA4 Pick' | 'Limited Edition' | 'Save 20%';
  inStock: boolean;
  stockLeft?: number;
  images: string[];
  colors: { name: string; hex: string; imageIndex?: number }[];
  sizes: string[];
  description: string;
  features: string[];
  specifications: Record<string, string>;
  isBundleItem?: boolean;
}

export interface CartItem {
  id: string; // unique cart item id (product.id + color + size)
  productId: string;
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  addedAt: number;
}

export interface BundlePack {
  id: string;
  title: string;
  tagline: string;
  originalTotalPrice: number;
  bundlePrice: number;
  savings: number;
  badge: string;
  items: Product[];
}

export interface PromoCode {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number; // e.g. 20 for 20% or 15 for $15
  description: string;
  minSubtotal?: number;
}

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface PaymentDetails {
  method: 'card' | 'gpay' | 'applepay' | 'paypal';
  cardNumber?: string;
  cardExp?: string;
  cardCvc?: string;
  cardName?: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  createdAt: string;
  estimatedDelivery: string;
  status: 'Processing' | 'Shipped' | 'Delivered';
  trackingNumber: string;
}

export type ViewPage = 'home' | 'shop' | 'product-detail' | 'cart' | 'checkout' | 'templates-explore';
