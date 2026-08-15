import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check, ArrowLeft, Share2, Sparkles, AlertCircle, Clock, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, SAMPLE_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { selectedProduct, setCurrentPage, addToCart, toggleWishlist, isInWishlist, showToast } = useShop();

  const [activeImgIdx, setActiveImgIdx] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors[0]?.name || 'Standard'
  );
  const [selectedSize, setSelectedSize] = useState(
    selectedProduct.sizes[0] || 'Standard'
  );
  const [quantity, setQuantity] = useState(1);
  const [addedSuccess, setAddedSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState<'features' | 'specs' | 'delivery'>('features');

  useEffect(() => {
    setActiveImgIdx(0);
    setSelectedColor(selectedProduct.colors[0]?.name || 'Standard');
    setSelectedSize(selectedProduct.sizes[0] || 'Standard');
    setQuantity(1);
  }, [selectedProduct]);

  const inWishlist = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const scrollToReviews = () => {
    const el = document.getElementById('customer-reviews-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 pb-28 sm:pb-12">
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop Catalog</span>
      </button>

      {/* Main Product Stage - Optimized for immediate CTA visibility without unnecessary scrolling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery Column - Larger, High Impact Images */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square w-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] bg-white dark:bg-[#181818] rounded-[32px] overflow-hidden border border-gray-200/80 dark:border-neutral-800 shadow-xs group">
            <img
              src={selectedProduct.images[activeImgIdx] || selectedProduct.images[0]}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Wishlist Icon */}
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-md cursor-pointer ${
                inWishlist
                  ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 scale-105'
                  : 'bg-white/90 dark:bg-[#262626]/90 backdrop-blur-md text-gray-500 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Badge */}
            {selectedProduct.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-[#111827] dark:bg-[#2563EB] text-white font-extrabold text-[11px] uppercase tracking-wider rounded-full shadow-md">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          {/* Larger Image Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                    activeImgIdx === idx
                      ? 'border-[#2563EB] ring-4 ring-blue-100 dark:ring-neutral-700 scale-102 shadow-xs'
                      : 'border-gray-200 dark:border-neutral-700 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Column - Tight vertical hierarchy so CTA is above fold */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 dark:bg-[#262626] text-[#2563EB] dark:text-blue-400">
                {selectedProduct.category}
              </span>
              {selectedProduct.stockLeft && (
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 border border-red-200/80 dark:border-red-900/50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-red-600 dark:text-red-400" />
                  Only {selectedProduct.stockLeft} left in stock
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white leading-tight">
              {selectedProduct.name}
            </h1>

            <p className="text-xs sm:text-sm font-medium text-gray-500 dark:text-neutral-400 mt-1">
              {selectedProduct.subtitle}
            </p>

            {/* Ratings and Reviews Header */}
            <div className="flex items-center gap-2.5 mt-2.5">
              <button
                onClick={scrollToReviews}
                className="flex items-center gap-1.5 hover:opacity-80 transition-opacity cursor-pointer"
              >
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(selectedProduct.rating)
                          ? 'fill-current'
                          : 'fill-amber-100 text-amber-300 dark:fill-neutral-800 dark:text-neutral-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-[#111827] dark:text-white">{selectedProduct.rating}</span>
                <span className="text-xs font-semibold text-[#2563EB] dark:text-blue-400 underline">
                  ({selectedProduct.reviewCount} reviews)
                </span>
              </button>
              <span className="text-gray-300 dark:text-neutral-700">•</span>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full">
                Verified Product
              </span>
            </div>

            {/* Price Block */}
            <div className="flex flex-wrap items-center gap-3 mt-3">
              <span className="text-3xl font-black text-[#111827] dark:text-white">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <>
                  <span className="text-base text-gray-400 dark:text-neutral-500 line-through font-semibold">
                    ${selectedProduct.originalPrice.toFixed(2)}
                  </span>
                  <span className="px-2.5 py-1 bg-red-600 text-white font-black text-[11px] uppercase tracking-wider rounded-full shadow-2xs">
                    SAVE ${(selectedProduct.originalPrice - selectedProduct.price).toFixed(2)} ({Math.round(((selectedProduct.originalPrice - selectedProduct.price) / selectedProduct.originalPrice) * 100)}% OFF)
                  </span>
                </>
              )}
            </div>

            {/* Delivery & Return Info Box Directly Near Price */}
            <div className="mt-3 p-3.5 bg-blue-50/60 dark:bg-[#202020] rounded-2xl border border-blue-100/60 dark:border-neutral-800 text-xs text-[#111827] dark:text-neutral-200 space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Truck className="w-4 h-4 text-[#2563EB] dark:text-blue-400 shrink-0" />
                <span>
                  <strong>Free Express Delivery</strong> on orders over $75 (Arrives in 2–3 business days)
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-500 dark:text-neutral-400">
                <RotateCcw className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>
                  <strong>30-Day Returns:</strong> Easy hassle-free returns & instant store exchange.
                </span>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          {selectedProduct.colors.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827] dark:text-neutral-200 block">
                Color: <span className="font-bold text-[#2563EB] dark:text-blue-400">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                      selectedColor === col.name
                        ? 'border-[#2563EB] bg-blue-50 dark:bg-[#2a2a2a] text-[#2563EB] dark:text-blue-300 ring-2 ring-blue-100 dark:ring-neutral-700'
                        : 'border-gray-200 dark:border-neutral-700 text-[#111827] dark:text-neutral-200 hover:border-gray-300 dark:hover:border-neutral-600 bg-white dark:bg-[#202020]'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-gray-300 dark:border-neutral-600" style={{ backgroundColor: col.hex }} />
                    {col.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {selectedProduct.sizes.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#111827] dark:text-neutral-200">
                <span>Size</span>
                <button
                  onClick={() => showToast('Standard US Retail Fit. Fits true to size.', 'info')}
                  className="text-[#2563EB] dark:text-blue-400 hover:underline font-bold cursor-pointer text-[11px]"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer ${
                      selectedSize === sz
                        ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-xs'
                        : 'border-gray-200 dark:border-neutral-700 text-[#111827] dark:text-neutral-200 hover:border-gray-300 dark:hover:border-neutral-600 bg-white dark:bg-[#202020]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Immediate CTA Section (Add to Bag + Express Checkout) - Directly Visible */}
          <div className="space-y-2.5 pt-1">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-neutral-700 p-1 bg-gray-50 dark:bg-[#202020] shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#2c2c2c] shadow-xs text-[#111827] dark:text-white hover:bg-gray-100 dark:hover:bg-[#383838] flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-[#111827] dark:text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white dark:bg-[#2c2c2c] shadow-xs text-[#111827] dark:text-white hover:bg-gray-100 dark:hover:bg-[#383838] flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={!selectedProduct.inStock}
                className={`flex-1 py-3.5 px-6 rounded-full font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2563EB] hover:bg-blue-700 text-white hover:shadow-lg active:scale-98'
                }`}
              >
                {addedSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag (${(selectedProduct.price * quantity).toFixed(2)})</span>
                  </>
                )}
              </button>
            </div>

            {/* Express Checkout Fast Button */}
            <button
              onClick={() => {
                handleAddToCart();
                setCurrentPage('checkout');
              }}
              className="w-full py-3.5 bg-gray-900 dark:bg-[#2563EB] hover:bg-black dark:hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Buy Now with Express Checkout</span>
            </button>
          </div>

          {/* Short Description */}
          <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed pt-2 border-t border-gray-100 dark:border-neutral-800">
            {selectedProduct.description}
          </p>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-gray-500 dark:text-neutral-400">
            <div className="p-2.5 bg-white dark:bg-[#181818] rounded-2xl border border-gray-100 dark:border-neutral-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 mx-auto mb-0.5" />
              <span className="font-bold text-[#111827] dark:text-white block text-[10px]">100% Authentic</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-[#181818] rounded-2xl border border-gray-100 dark:border-neutral-800">
              <Truck className="w-4 h-4 text-[#2563EB] dark:text-blue-400 mx-auto mb-0.5" />
              <span className="font-bold text-[#111827] dark:text-white block text-[10px]">Tracked Order</span>
            </div>
            <div className="p-2.5 bg-white dark:bg-[#181818] rounded-2xl border border-gray-100 dark:border-neutral-800">
              <RefreshCw className="w-4 h-4 text-indigo-600 dark:text-indigo-400 mx-auto mb-0.5" />
              <span className="font-bold text-[#111827] dark:text-white block text-[10px]">Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Features / Specifications / Delivery */}
      <div className="bg-white dark:bg-[#181818] rounded-[32px] border border-gray-200/80 dark:border-neutral-800 shadow-xs overflow-hidden">
        <div className="flex border-b border-gray-100 dark:border-neutral-800 bg-gray-50/50 dark:bg-[#202020]">
          <button
            onClick={() => setActiveTab('features')}
            className={`py-4 px-6 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'features' ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white dark:bg-[#181818]' : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Product Features
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-4 px-6 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'specs' ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white dark:bg-[#181818]' : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`py-4 px-6 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'delivery' ? 'border-[#2563EB] text-[#2563EB] dark:text-blue-400 bg-white dark:bg-[#181818]' : 'border-transparent text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            Shipping & Returns Details
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'features' && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#111827] dark:text-neutral-200">
              {selectedProduct.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 bg-gray-50 dark:bg-[#202020] p-3.5 rounded-2xl border border-gray-100 dark:border-neutral-800">
                  <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3.5 bg-gray-50 dark:bg-[#202020] rounded-2xl border border-gray-100 dark:border-neutral-800">
                  <span className="font-semibold text-gray-500 dark:text-neutral-400">{key}</span>
                  <span className="font-bold text-[#111827] dark:text-white">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3 text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
              <p>
                <strong className="text-[#111827] dark:text-white">Express Delivery:</strong> Orders placed before 2 PM EST ship same-day with live tracking. Free standard delivery on orders over $75.
              </p>
              <p>
                <strong className="text-[#111827] dark:text-white">30-Day Return Guarantee:</strong> Items in original condition with tags intact can be returned within 30 days for a full refund or instant store exchange.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="customer-reviews-section" className="space-y-6 pt-2 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 dark:border-neutral-800 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] dark:text-blue-400">
              Community Ratings
            </span>
            <h2 className="text-2xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              Verified Customer Reviews
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white dark:bg-[#181818] px-4 py-2 rounded-2xl border border-gray-200 dark:border-neutral-800 shadow-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-lg font-black text-[#111827] dark:text-white">{selectedProduct.rating} out of 5</span>
            <span className="text-xs text-gray-500 dark:text-neutral-400">Based on {selectedProduct.reviewCount} reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-6 bg-white dark:bg-[#181818] rounded-[28px] border border-gray-200/80 dark:border-neutral-800 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-[#111827] dark:text-white">{rev.title}</h4>
              <p className="text-xs text-gray-500 dark:text-neutral-300 leading-relaxed">{rev.comment}</p>
              <div className="pt-2 text-[11px] text-gray-500 dark:text-neutral-400 font-bold flex items-center gap-2">
                <img src={rev.userAvatar} alt="" className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
                <span>{rev.userName} • {rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-gray-200 dark:border-neutral-800">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Always Visible Sticky Mobile Add-to-Cart Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 dark:bg-[#181818]/95 backdrop-blur-md border-t border-gray-200 dark:border-neutral-800 p-3 shadow-2xl z-50 sm:hidden flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-gray-900 dark:text-white truncate">{selectedProduct.name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-extrabold text-[#2563EB] dark:text-blue-400">${selectedProduct.price.toFixed(2)}</span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-1.5 py-0.5 rounded">Free Return</span>
          </div>
        </div>
        <button
          onClick={handleAddToCart}
          className="py-3 px-5 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-extrabold rounded-full shadow-md flex items-center gap-1.5 shrink-0 active:scale-95 transition-all"
        >
          <ShoppingBag className="w-4 h-4" />
          <span>Add to Bag</span>
        </button>
      </div>
    </div>
  );
};
