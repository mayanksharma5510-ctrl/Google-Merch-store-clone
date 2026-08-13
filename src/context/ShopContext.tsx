import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ViewPage, Category, PromoCode, Order, ShippingAddress, PaymentDetails } from '../types';
import { PRODUCTS } from '../data/products';
import { VALID_PROMO_CODES } from '../data/analytics';
import { StoreTemplate, ECOMMERCE_TEMPLATES } from '../data/templates';

interface ToastInfo {
  id: number;
  message: string;
  type: 'success' | 'info' | 'error';
}

export interface CustomThemeSettings {
  primaryColor: string;
  bgStyle: 'white' | 'cream' | 'slate';
  headerStyle: 'pill' | 'solid' | 'minimal';
  heroTitle: string;
  heroSubtitle: string;
  heroBadge: string;
  gridColumns: number;
  enableGA4Ticker: boolean;
  cardRadius: 'full' | 'curved' | 'modern';
}

interface ShopContextType {
  currentPage: ViewPage;
  selectedProduct: Product;
  quickViewProduct: Product | null;
  cart: CartItem[];
  wishlist: string[];
  searchQuery: string;
  selectedCategory: Category;
  sortBy: string;
  priceRange: [number, number];
  inStockOnly: boolean;
  appliedPromo: PromoCode | null;
  isCartDrawerOpen: boolean;
  isGA4ModalOpen: boolean;
  activeToast: ToastInfo | null;
  latestOrder: Order | null;

  // Template & Studio State
  activeTemplate: StoreTemplate;
  themeSettings: CustomThemeSettings;
  isStudioEditorOpen: boolean;
  isAIWizardOpen: boolean;
  previewDeviceTemplate: StoreTemplate | null;

  // Template Actions
  applyTemplate: (templateId: string) => void;
  updateThemeSettings: (newSettings: Partial<CustomThemeSettings>) => void;
  setIsStudioEditorOpen: (open: boolean) => void;
  setIsAIWizardOpen: (open: boolean) => void;
  setPreviewDeviceTemplate: (template: StoreTemplate | null) => void;
  
  // Navigation & UI Actions
  setCurrentPage: (page: ViewPage) => void;
  navigateToProduct: (product: Product) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  setIsCartDrawerOpen: (open: boolean) => void;
  setIsGA4ModalOpen: (open: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (cat: Category) => void;
  setSortBy: (sort: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setInStockOnly: (val: boolean) => void;
  
  // Cart Actions
  addToCart: (product: Product, selectedColor?: string, selectedSize?: string, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  applyPromoCode: (codeStr: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  
  // Wishlist Actions
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Calculations
  cartSubtotal: number;
  discountAmount: number;
  freeShippingThreshold: number;
  amountNeededForFreeShipping: number;
  estimatedShipping: number;
  estimatedTax: number;
  cartTotal: number;
  totalItemsCount: number;
  
  // Checkout & Order
  placeOrder: (address: ShippingAddress, payment: PaymentDetails) => Order;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const FREE_SHIPPING_THRESHOLD = 75; // $75 for free express shipping

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPageState] = useState<ViewPage>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Cart stored in localStorage if available
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('merchflow_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('merchflow_wishlist');
      return saved ? JSON.parse(saved) : ['pixel-smart-mug', 'tensor-mechanical-keyboard'];
    } catch {
      return [];
    }
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 250]);
  const [inStockOnly, setInStockOnly] = useState(false);

  // UI Modals & Drawers
  const [appliedPromo, setAppliedPromo] = useState<PromoCode | null>(null);
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isGA4ModalOpen, setIsGA4ModalOpen] = useState(false);
  const [activeToast, setActiveToast] = useState<ToastInfo | null>(null);
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Template & Studio Customizer States
  const [activeTemplate, setActiveTemplate] = useState<StoreTemplate>(ECOMMERCE_TEMPLATES[0]);
  const [themeSettings, setThemeSettings] = useState<CustomThemeSettings>(ECOMMERCE_TEMPLATES[0].themeSettings);
  const [isStudioEditorOpen, setIsStudioEditorOpen] = useState(false);
  const [isAIWizardOpen, setIsAIWizardOpen] = useState(false);
  const [previewDeviceTemplate, setPreviewDeviceTemplate] = useState<StoreTemplate | null>(null);

  const applyTemplate = (templateId: string) => {
    const found = ECOMMERCE_TEMPLATES.find((t) => t.id === templateId) || ECOMMERCE_TEMPLATES[0];
    setActiveTemplate(found);
    setThemeSettings(found.themeSettings);
    showToast(`Applied "${found.name}" template to your Google Merch Shop!`, 'success');
  };

  const updateThemeSettings = (newSettings: Partial<CustomThemeSettings>) => {
    setThemeSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Persistence
  useEffect(() => {
    try {
      localStorage.setItem('merchflow_cart', JSON.stringify(cart));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('merchflow_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.warn('LocalStorage error', e);
    }
  }, [wishlist]);

  // Toast Helper
  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    setActiveToast({ id: Date.now(), message, type });
  };

  const setCurrentPage = (page: ViewPage) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product-detail');
  };

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Cart Management
  const addToCart = (
    product: Product,
    selectedColor?: string,
    selectedSize?: string,
    quantity: number = 1
  ) => {
    const color = selectedColor || (product.colors.length > 0 ? product.colors[0].name : 'Standard');
    const size = selectedSize || (product.sizes.length > 0 ? product.sizes[0] : 'Standard');
    const uniqueId = `${product.id}-${color}-${size}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === uniqueId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        const newItem: CartItem = {
          id: uniqueId,
          productId: product.id,
          product,
          selectedColor: color,
          selectedSize: size,
          quantity,
          addedAt: Date.now(),
        };
        return [newItem, ...prevCart];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to cart`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    const itemToRemove = cart.find((i) => i.id === cartItemId);
    setCart((prev) => prev.filter((i) => i.id !== cartItemId));
    if (itemToRemove) {
      showToast(`Removed "${itemToRemove.product.name}" from cart`, 'info');
    }
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const applyPromoCode = (codeStr: string) => {
    const cleanCode = codeStr.trim().toUpperCase();
    const found = VALID_PROMO_CODES.find((p) => p.code === cleanCode);
    if (!found) {
      return { success: false, message: 'Invalid promo code. Try "GOOGLE20" or "GA4MERCH"' };
    }
    if (found.minSubtotal && cartSubtotal < found.minSubtotal) {
      return {
        success: false,
        message: `This promo code requires a minimum subtotal of $${found.minSubtotal}`,
      };
    }
    setAppliedPromo(found);
    showToast(`Promo code "${found.code}" applied successfully!`, 'success');
    return { success: true, message: `Promo code applied! ${found.description}` };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
    showToast('Promo code removed', 'info');
  };

  // Wishlist
  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed item from wishlist', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Added item to wishlist', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.discountType === 'percentage') {
      discountAmount = (cartSubtotal * appliedPromo.discountValue) / 100;
    } else {
      discountAmount = appliedPromo.discountValue;
    }
  }

  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - cartSubtotal);
  const estimatedShipping = cartSubtotal === 0 ? 0 : cartSubtotal >= FREE_SHIPPING_THRESHOLD ? 0 : 5.99;
  const estimatedTax = (cartSubtotal - discountAmount) * 0.08; // 8% sales tax estimate
  const cartTotal = Math.max(0, cartSubtotal - discountAmount + estimatedShipping + estimatedTax);

  // Place Order Simulation
  const placeOrder = (address: ShippingAddress, payment: PaymentDetails): Order => {
    const orderId = `ORD-GMS-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      id: orderId,
      items: [...cart],
      subtotal: cartSubtotal,
      discount: discountAmount,
      shipping: estimatedShipping,
      tax: estimatedTax,
      total: cartTotal,
      shippingAddress: address,
      paymentMethod: payment.method.toUpperCase(),
      createdAt: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      }),
      status: 'Processing',
      trackingNumber: `TRK-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
    };

    setLatestOrder(newOrder);
    clearCart();
    setAppliedPromo(null);
    showToast(`Order #${orderId} confirmed!`, 'success');
    return newOrder;
  };

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        selectedProduct,
        quickViewProduct,
        cart,
        wishlist,
        searchQuery,
        selectedCategory,
        sortBy,
        priceRange,
        inStockOnly,
        appliedPromo,
        isCartDrawerOpen,
        isGA4ModalOpen,
        activeToast,
        latestOrder,

        activeTemplate,
        themeSettings,
        isStudioEditorOpen,
        isAIWizardOpen,
        previewDeviceTemplate,

        applyTemplate,
        updateThemeSettings,
        setIsStudioEditorOpen,
        setIsAIWizardOpen,
        setPreviewDeviceTemplate,

        setCurrentPage,
        navigateToProduct,
        openQuickView,
        closeQuickView,
        setIsCartDrawerOpen,
        setIsGA4ModalOpen,
        setSearchQuery,
        setSelectedCategory,
        setSortBy,
        setPriceRange,
        setInStockOnly,

        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        applyPromoCode,
        removePromoCode,

        toggleWishlist,
        isInWishlist,

        cartSubtotal,
        discountAmount,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        amountNeededForFreeShipping,
        estimatedShipping,
        estimatedTax,
        cartTotal,
        totalItemsCount,

        placeOrder,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
