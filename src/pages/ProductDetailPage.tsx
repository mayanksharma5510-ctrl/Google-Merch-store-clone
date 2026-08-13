import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Heart, ShieldCheck, Truck, RefreshCw, Check, ArrowLeft, Share2, Sparkles, AlertCircle } from 'lucide-react';
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
  const [showStickyBar, setShowStickyBar] = useState(false);

  useEffect(() => {
    setActiveImgIdx(0);
    setSelectedColor(selectedProduct.colors[0]?.name || 'Standard');
    setSelectedSize(selectedProduct.sizes[0] || 'Standard');
    setQuantity(1);
  }, [selectedProduct]);

  // Monitor scroll for mobile sticky add to cart bar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const inWishlist = isInWishlist(selectedProduct.id);

  const handleAddToCart = () => {
    addToCart(selectedProduct, selectedColor, selectedSize, quantity);
    setAddedSuccess(true);
    setTimeout(() => setAddedSuccess(false), 2000);
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === selectedProduct.category && p.id !== selectedProduct.id
  ).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Back Button */}
      <button
        onClick={() => setCurrentPage('shop')}
        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] hover:text-[#111827] transition-colors cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Shop Catalog</span>
      </button>

      {/* Main Product Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Gallery Column */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-4/3 w-full bg-white rounded-[32px] overflow-hidden border border-gray-100 shadow-xs group">
            <img
              src={selectedProduct.images[activeImgIdx] || selectedProduct.images[0]}
              alt={selectedProduct.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Wishlist Icon */}
            <button
              onClick={() => toggleWishlist(selectedProduct.id)}
              className={`absolute top-4 right-4 p-3 rounded-full transition-all shadow-xs ${
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
              <span className="absolute top-4 left-4 px-3 py-1 bg-[#111827] text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-xs">
                {selectedProduct.badge}
              </span>
            )}
          </div>

          {/* Thumbnails */}
          {selectedProduct.images.length > 1 && (
            <div className="flex items-center gap-3">
              {selectedProduct.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImgIdx(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all cursor-pointer ${
                    activeImgIdx === idx
                      ? 'border-[#2563EB] ring-4 ring-blue-50 scale-105'
                      : 'border-gray-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Details Column */}
        <div className="lg:col-span-5 space-y-6">
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

            <p className="text-xs sm:text-sm text-[#6B7280] mt-1">
              {selectedProduct.subtitle}
            </p>

            {/* Rating */}
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center text-amber-400">
                <Star className="w-4 h-4 fill-current" />
              </div>
              <span className="text-sm font-bold text-[#111827]">{selectedProduct.rating}</span>
              <span className="text-xs text-[#6B7280]">({selectedProduct.reviewCount} reviews)</span>
              <span className="text-gray-300">•</span>
              <span className="text-xs text-emerald-600 font-bold">Official Merch</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3 mt-4">
              <span className="text-3xl font-extrabold text-[#111827]">
                ${selectedProduct.price.toFixed(2)}
              </span>
              {selectedProduct.originalPrice && (
                <span className="text-base text-[#6B7280] line-through">
                  ${selectedProduct.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-[#6B7280] leading-relaxed">
            {selectedProduct.description}
          </p>

          {/* Color Selector */}
          {selectedProduct.colors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-[#111827] block">
                Selected Color: <span className="font-semibold text-[#2563EB]">{selectedColor}</span>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {selectedProduct.colors.map((col) => (
                  <button
                    key={col.name}
                    onClick={() => setSelectedColor(col.name)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border flex items-center gap-2 transition-all cursor-pointer ${
                      selectedColor === col.name
                        ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100'
                        : 'border-gray-200 text-[#111827] hover:border-gray-300 bg-white'
                    }`}
                  >
                    <span className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: col.hex }} />
                    {col.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          {selectedProduct.sizes.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
                <span>Select Size</span>
                <button
                  onClick={() => showToast('Size Guide: Standard US Retail Fit. Order your usual size.', 'info')}
                  className="text-[#2563EB] hover:underline font-bold cursor-pointer"
                >
                  Size Chart
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {selectedProduct.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all cursor-pointer ${
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

          {/* Quantity & Main Add to Cart CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center rounded-full border border-gray-200 p-1 bg-gray-50">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full bg-white shadow-xs text-[#111827] hover:bg-gray-100 flex items-center justify-center font-bold text-sm cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-[#111827]">{quantity}</span>
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
                className={`flex-1 py-3.5 px-6 rounded-full font-bold text-xs shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  addedSuccess
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#2563EB] hover:bg-blue-700 text-white'
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
              className="w-full py-3.5 bg-[#111827] hover:bg-black text-white font-bold text-xs rounded-full shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Buy Now with One-Click Express Checkout</span>
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100 text-center text-[11px] text-[#6B7280]">
            <div className="p-3 bg-white rounded-2xl border border-gray-100">
              <Truck className="w-4 h-4 text-[#2563EB] mx-auto mb-1" />
              <span className="font-bold text-[#111827] block">Free Shipping</span>
              <span className="text-[10px] text-[#6B7280]">Orders $75+</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-gray-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
              <span className="font-bold text-[#111827] block">Official Guarantee</span>
              <span className="text-[10px] text-[#6B7280]">100% Authentic</span>
            </div>
            <div className="p-3 bg-white rounded-2xl border border-gray-100">
              <RefreshCw className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
              <span className="font-bold text-[#111827] block">30 Days Return</span>
              <span className="text-[10px] text-[#6B7280]">Hassle-free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Section: Features / Specifications / Delivery */}
      <div className="bg-white rounded-[32px] border border-gray-100 shadow-xs overflow-hidden">
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
            Shipping & Returns
          </button>
        </div>

        <div className="p-8">
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
                <strong className="text-[#111827]">Express Delivery:</strong> Orders placed before 2 PM EST ship same-day with tracking. Free standard delivery on orders over $75.
              </p>
              <p>
                <strong className="text-[#111827]">30-Day Return Guarantee:</strong> Items in original condition with tags intact can be returned within 30 days for a full refund or exchange.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Customer Reviews */}
      <section className="space-y-6">
        <h2 className="text-xl font-extrabold text-[#111827] tracking-tight">Verified Customer Reviews</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div key={rev.id} className="p-6 bg-white rounded-[28px] border border-gray-100 shadow-xs space-y-3">
              <div className="flex items-center gap-1 text-amber-400">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <h4 className="text-xs font-bold text-[#111827]">{rev.title}</h4>
              <p className="text-xs text-[#6B7280] leading-relaxed">{rev.comment}</p>
              <div className="pt-2 text-[11px] text-[#6B7280] font-bold">
                {rev.userName} • {rev.date}
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

      {/* Sticky Mobile Add-to-Cart Bar */}
      {showStickyBar && (
        <div className="fixed bottom-0 inset-x-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 shadow-2xl z-40 lg:hidden flex items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{selectedProduct.name}</h4>
            <span className="text-xs font-extrabold text-blue-600">${selectedProduct.price.toFixed(2)}</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md flex items-center gap-1.5 shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Add to Cart</span>
          </button>
        </div>
      )}
    </div>
  );
};
