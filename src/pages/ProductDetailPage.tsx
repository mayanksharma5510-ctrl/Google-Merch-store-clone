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
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop Catalog</span>
      </button>

      {/* Main Product Stage - Optimized for immediate CTA visibility without unnecessary scrolling */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Gallery Column - Larger, High Impact Images */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-square sm:aspect-4/3 lg:aspect-square w-full min-h-[380px] sm:min-h-[480px] lg:min-h-[560px] bg-white rounded-[32px] overflow-hidden border border-gray-200/80 shadow-sm group">
            <img
              src={selectedProduct.images[activeImgIdx] || selectedProduct.images[0]}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Wishlist Icon */}
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-md ${
                inWishlist
                  ? 'bg-rose-50 text-rose-600 scale-105'
                  : 'bg-white/90 backdrop-blur-md text-[#6B7280] hover:text-[#111827]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
            </button>

            {/* Badge */}
            {selectedProduct.badge && (
              <span className="absolute top-4 left-4 px-3.5 py-1.5 bg-[#111827] text-white font-extrabold text-[11px] uppercase tracking-wider rounded-full shadow-md">
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
                      ? 'border-[#2563EB] ring-4 ring-blue-100 scale-102 shadow-sm'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
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
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-[#2563EB]">
                {selectedProduct.category}
              </span>
              {selectedProduct.stockLeft && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <AlertCircle className="w-3 h-3 text-amber-600" />
                  Only {selectedProduct.stockLeft} left
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] leading-tight">
              {selectedProduct.name}
            </h1>

            <p className="text-xs sm:text-sm font-medium text-[#6B7280] mt-1">
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
                          : 'fill-amber-100 text-amber-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm font-black text-[#111827]">{selectedProduct.rating}</span>
                <span className="text-xs font-semibold text-[#2563EB] underline">
                  ({selectedProduct.reviewCount} reviews)
                </span>
              </button>
              <span className="text-gray-300">•</span>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Verified Product
              </span>
            </div>

            {/* Price Block */}
            <div className="flex items-baseline gap-3 mt-3">
              <span className="text-3xl font-black text-[#111827]">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-base text-[#6B7280] line-through font-semibold">
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>

            {/* Delivery & Return Info Box Directly Near Price */}
            <div className="mt-3 p-3.5 bg-blue-50/60 rounded-2xl border border-blue-100 text-xs text-[#111827] space-y-2">
              <div className="flex items-center gap-2 font-semibold">
                <Truck className="w-4 h-4 text-[#2563EB] shrink-0" />
                <span>
                  <strong>Free Express Delivery</strong> on orders over $75 (Arrives in 2–3 business days)
                </span>
              </div>
              <div className="flex items-center gap-2 text-[#6B7280]">
                <RotateCcw className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  <strong>30-Day Returns:</strong> Easy hassle-free returns & instant store exchange.
                </span>
              </div>
            </div>
          </div>

          {/* Color Selector */}
          {selectedProduct.colors.length > 0 && (
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-[#111827] block">
                Color: <span className="font-bold text-[#2563EB]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                      selectedColor === col.name
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100'
                        : 'border-gray-200 text-[#111827] hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: col.hex }} />
                    {col.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {selectedProduct.sizes.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                <span>Size</span>
                <button
                  onClick={() => showToast('Standard US Retail Fit. Fits true to size.', 'info')}
                  className="text-[#2563EB] hover:underline font-bold cursor-pointer text-[11px]"
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
                        : 'border-gray-200 text-[#111827] hover:border-gray-300 bg-white'
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
              <div className="inline-flex items-center rounded-full border border-gray-200 p-1 bg-gray-50 shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white shadow-xs text-[#111827] hover:bg-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="w-8 text-center font-bold text-xs text-[#111827]">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full bg-white shadow-xs text-[#111827] hover:bg-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer"
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
              className="w-full py-3.5 bg-[#111827] hover:bg-black text-white font-extrabold text-xs sm:text-sm rounded-full shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Buy Now with Express Checkout</span>
            </button>
          </div>

          {/* Short Description */}
          <p className="text-xs text-[#6B7280] leading-relaxed pt-2 border-t border-gray-100">
            {selectedProduct.description}
          </p>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[11px] text-[#6B7280]">
            <div className="p-2.5 bg-white rounded-2xl border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-0.5" />
              <span className="font-bold text-[#111827] block text-[10px]">100% Authentic</span>
            </div>
            <div className="p-2.5 bg-white rounded-2xl border border-gray-100">
              <Truck className="w-4 h-4 text-[#2563EB] mx-auto mb-0.5" />
              <span className="font-bold text-[#111827] block text-[10px]">Tracked Order</span>
            </div>
            <div className="p-2.5 bg-white rounded-2xl border border-gray-100">
              <RefreshCw className="w-4 h-4 text-indigo-600 mx-auto mb-0.5" />
              <span className="font-bold text-[#111827] block text-[10px]">Free Returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Features / Specifications / Delivery */}
      <div className="bg-white rounded-[32px] border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="flex border-b border-gray-100 bg-gray-50/50">
          <button
            onClick={() => setActiveTab('features')}
            className={`py-4 px-6 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'features' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Product Features
          </button>
          <button
            onClick={() => setActiveTab('specs')}
            className={`py-4 px-6 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'specs' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Specifications
          </button>
          <button
            onClick={() => setActiveTab('delivery')}
            className={`py-4 px-6 text-xs font-bold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'delivery' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent text-[#6B7280] hover:text-[#111827]'
            }`}
          >
            Shipping & Returns Details
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {activeTab === 'features' && (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-[#111827]">
              {selectedProduct.features.map((feat, i) => (
                <li key={i} className="flex items-start gap-2.5 bg-gray-50 p-3.5 rounded-2xl border border-gray-100">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span className="font-medium">{feat}</span>
                </li>
              ))}
            </ul>
          )}

          {activeTab === 'specs' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {Object.entries(selectedProduct.specifications).map(([key, val]) => (
                <div key={key} className="flex justify-between p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="font-semibold text-[#6B7280]">{key}</span>
                  <span className="font-bold text-[#111827]">{val}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3 text-xs text-[#6B7280] leading-relaxed">
              <p>
                <strong className="text-[#111827]">Express Delivery:</strong> Orders placed before 2 PM EST ship same-day with live tracking. Free standard delivery on orders over $75.
              </p>
              <p>
                <strong className="text-[#111827]">30-Day Return Guarantee:</strong> Items in original condition with tags intact can be returned within 30 days for a full refund or instant store exchange.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <section id="customer-reviews-section" className="space-y-6 pt-2 scroll-mt-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
              Community Ratings
            </span>
            <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">
              Verified Customer Reviews
            </h2>
          </div>

          <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-gray-200 shadow-xs">
            <div className="flex items-center text-amber-400">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-lg font-black text-[#111827]">{selectedProduct.rating} out of 5</span>
            <span className="text-xs text-[#6B7280]">Based on {selectedProduct.reviewCount} reviews</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-6 bg-white rounded-[28px] border border-gray-200/80 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <h4 className="text-sm font-bold text-[#111827]">{rev.title}</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">{rev.comment}</p>
              <div className="pt-2 text-[11px] text-[#6B7280] font-bold flex items-center gap-2">
                <img src={rev.userAvatar} alt="" className="w-6 h-6 rounded-full object-cover" referrerPolicy="no-referrer" />
                <span>{rev.userName} • {rev.date}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="space-y-6 pt-6 border-t border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">You Might Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}

      {/* Always Visible Sticky Mobile Add-to-Cart Bottom Bar */}
      <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl z-50 sm:hidden flex items-center justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h4 className="text-xs font-bold text-gray-900 truncate">{selectedProduct.name}</h4>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs font-extrabold text-[#2563EB]">${selectedProduct.price.toFixed(2)}</span>
            <span className="text-[10px] text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">Free Return</span>
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
