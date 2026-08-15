import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Star, ShoppingBag, Check, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, closeQuickView, addToCart, navigateToProduct } = useShop();

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const [addedSuccess, setAddedSuccess] = useState(false);

  if (!quickViewProduct) return null;

  const colorToUse = selectedColor || (quickViewProduct.colors[0]?.name ?? 'Standard');
  const sizeToUse = selectedSize || (quickViewProduct.sizes[0] ?? 'Standard');

  const handleAddToCart = () => {
    addToCart(quickViewProduct, colorToUse, sizeToUse, quantity);
    setAddedSuccess(true);
    setTimeout(() => {
      setAddedSuccess(false);
      closeQuickView();
    }, 1000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeQuickView}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white dark:bg-[#181818] rounded-3xl shadow-2xl border border-gray-100 dark:border-neutral-800 overflow-hidden z-10 text-gray-900 dark:text-neutral-100"
        >
          {/* Close Button */}
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-gray-100 dark:bg-[#262626] hover:bg-gray-200 dark:hover:bg-[#303030] text-gray-600 dark:text-neutral-300 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Image Gallery Column */}
            <div className="bg-gray-50 dark:bg-[#202020] p-6 flex flex-col items-center justify-between">
              <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white dark:bg-[#181818] shadow-xs mb-4">
                <img
                  src={quickViewProduct.images[activeImageIdx] || quickViewProduct.images[0]}
                  alt={quickViewProduct.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center"
                />
              </div>

              {/* Thumbnails */}
              {quickViewProduct.images.length > 1 && (
                <div className="flex items-center gap-2">
                  {quickViewProduct.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                        activeImageIdx === idx ? 'border-blue-600 ring-2 ring-blue-100 dark:ring-neutral-700' : 'border-gray-200 dark:border-neutral-700 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details Column */}
            <div className="p-6 md:p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-[#262626] text-blue-700 dark:text-blue-400">
                    {quickViewProduct.category}
                  </span>
                  {quickViewProduct.stockLeft && (
                    <span className="text-xs font-medium text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-[#262626] px-2.5 py-0.5 rounded-full">
                      Only {quickViewProduct.stockLeft} left
                    </span>
                  )}
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-tight">
                  {quickViewProduct.name}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center text-amber-400">
                    <Star className="w-4 h-4 fill-current" />
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">{quickViewProduct.rating}</span>
                  <span className="text-xs text-gray-500 dark:text-neutral-400">({quickViewProduct.reviewCount} reviews)</span>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-2 mt-4">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${quickViewProduct.price.toFixed(2)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-sm text-gray-400 dark:text-neutral-500 line-through">
                      ${quickViewProduct.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                <p className="text-xs text-gray-600 dark:text-neutral-300 mt-3 line-clamp-3 leading-relaxed">
                  {quickViewProduct.description}
                </p>

                {/* Color Selector */}
                {quickViewProduct.colors.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                      Color: <span className="font-normal text-gray-900 dark:text-white">{colorToUse}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.colors.map((col) => (
                        <button
                          key={col.name}
                          onClick={() => setSelectedColor(col.name)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-2 transition-all cursor-pointer ${
                            colorToUse === col.name
                              ? 'border-blue-600 bg-blue-50/50 dark:bg-[#2a2a2a] text-blue-900 dark:text-blue-300 font-semibold'
                              : 'border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:border-gray-300 dark:hover:border-neutral-600'
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
                {quickViewProduct.sizes.length > 0 && (
                  <div className="mt-4">
                    <label className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-2">
                      Size: <span className="font-normal text-gray-900 dark:text-white">{sizeToUse}</span>
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((sz) => (
                        <button
                          key={sz}
                          onClick={() => setSelectedSize(sz)}
                          className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            sizeToUse === sz
                              ? 'border-blue-600 bg-blue-600 text-white font-semibold shadow-xs'
                              : 'border-gray-200 dark:border-neutral-700 text-gray-700 dark:text-neutral-300 hover:border-gray-300 dark:hover:border-neutral-600 bg-white dark:bg-[#222222]'
                          }`}
                        >
                          {sz}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div className="mt-4">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-neutral-300 mb-2">Quantity</label>
                  <div className="inline-flex items-center rounded-xl border border-gray-200 dark:border-neutral-700 p-1 bg-gray-50 dark:bg-[#222222]">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-[#181818] shadow-xs text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-10 text-center font-semibold text-sm text-gray-900 dark:text-white">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-[#181818] shadow-xs text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-[#2a2a2a] flex items-center justify-center font-bold text-sm cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-neutral-800 space-y-3">
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-3 px-4 rounded-xl text-sm font-semibold shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    addedSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-[#2563EB] hover:bg-blue-700 text-white'
                  }`}
                >
                  {addedSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Cart!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Cart (${(quickViewProduct.price * quantity).toFixed(2)})</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => {
                    closeQuickView();
                    navigateToProduct(quickViewProduct);
                  }}
                  className="w-full text-center text-xs font-semibold text-[#2563EB] dark:text-blue-400 hover:text-blue-700 hover:underline py-1 cursor-pointer"
                >
                  View Full Product Details & Reviews →
                </button>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-gray-500 dark:text-neutral-400 border-t border-gray-100 dark:border-neutral-800">
                  <div className="flex items-center justify-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
                    <span>2-Day Delivery</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Google Guarantee</span>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <RefreshCw className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                    <span>30-Day Returns</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
