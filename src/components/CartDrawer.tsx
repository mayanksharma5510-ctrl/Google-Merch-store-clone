import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ShoppingBag, Trash2, ArrowRight, Tag, Truck, Sparkles, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    cartTotal,
    setCurrentPage,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingPercentage = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const res = applyPromoCode(promoInput);
    if (!res.success) {
      setPromoError(res.message);
    } else {
      setPromoInput('');
    }
  };

  const handleCheckoutClick = () => {
    setIsCartDrawerOpen(false);
    setCurrentPage('checkout');
  };

  const handleViewCartClick = () => {
    setIsCartDrawerOpen(false);
    setCurrentPage('cart');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartDrawerOpen(false)}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="relative w-full max-w-md bg-white dark:bg-[#181818] h-full shadow-2xl flex flex-col justify-between z-10 overflow-hidden text-gray-900 dark:text-neutral-100"
        >
          {/* Header */}
          <div className="p-5 border-b border-gray-100 dark:border-neutral-800 flex items-center justify-between bg-white dark:bg-[#181818] sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-blue-50 dark:bg-[#242424] text-blue-600 dark:text-blue-400 rounded-xl">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-base font-bold text-gray-900 dark:text-white">Your Cart</h2>
                <p className="text-xs text-gray-500 dark:text-neutral-400">
                  {cart.length} item{cart.length === 1 ? '' : 's'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartDrawerOpen(false)}
              className="p-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#262626] rounded-full transition-colors cursor-pointer"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Meter */}
          <div className="px-5 py-3 bg-blue-50/60 dark:bg-[#202020] border-b border-blue-100/60 dark:border-neutral-800">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-900 dark:text-neutral-100 mb-1.5">
              <span className="flex items-center gap-1.5 text-blue-900 dark:text-blue-300">
                <Truck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> Free Express Shipping Unlocked!
                  </span>
                ) : (
                  <span>
                    Add <strong className="text-blue-700 dark:text-blue-400">${amountNeededForFreeShipping.toFixed(2)}</strong> for Free Express Shipping
                  </span>
                )}
              </span>
              <span className="text-blue-700 dark:text-blue-400 font-bold">{Math.round(freeShippingPercentage)}%</span>
            </div>

            <div className="w-full h-2 bg-blue-100/80 dark:bg-[#2a2a2a] rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${freeShippingPercentage}%` }}
                transition={{ duration: 0.5 }}
                className={`h-full rounded-full transition-all ${
                  amountNeededForFreeShipping === 0 ? 'bg-emerald-500' : 'bg-blue-600 dark:bg-blue-500'
                }`}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-[#242424] text-gray-400 flex items-center justify-center mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Your cart is empty</h3>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1 max-w-xs">
                  Discover modern tech apparel, smart desk gear, and exclusive developer merchandise.
                </p>
                <button
                  onClick={() => {
                    setIsCartDrawerOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="mt-5 py-2.5 px-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-xl shadow-md transition-colors cursor-pointer"
                >
                  Explore Products
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 bg-gray-50/80 dark:bg-[#202020] rounded-2xl border border-gray-100/80 dark:border-neutral-800 group hover:bg-white dark:hover:bg-[#262626] hover:shadow-xs transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-18 h-18 rounded-xl object-cover bg-white dark:bg-[#181818] border border-gray-200 dark:border-neutral-700 shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-gray-400 hover:text-rose-500 p-1 transition-colors shrink-0 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5">
                        {item.selectedColor} • {item.selectedSize}
                      </p>
                    </div>

                    {/* Quantity & Price */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="inline-flex items-center rounded-lg border border-gray-200 dark:border-neutral-700 bg-white dark:bg-[#181818] p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-md text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-[#262626] flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-6 text-center text-xs font-semibold text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-6 h-6 rounded-md text-gray-600 dark:text-neutral-300 hover:bg-gray-100 dark:hover:bg-[#262626] flex items-center justify-center font-bold text-xs cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-gray-900 dark:text-white">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-gray-100 dark:border-neutral-800 bg-white dark:bg-[#181818] space-y-3.5">
              {/* Promo Code Input */}
              {appliedPromo ? (
                <div className="flex items-center justify-between px-3 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 rounded-xl text-xs">
                  <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-medium">
                    <Tag className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    <span>Promo "<strong>{appliedPromo.code}</strong>" applied</span>
                  </div>
                  <button
                    onClick={removePromoCode}
                    className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="space-y-1">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Promo Code (e.g. GOOGLE20)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="flex-1 px-3 py-2 text-xs rounded-xl border border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-[#222222] text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                    />
                    <button
                      type="submit"
                      className="px-3 py-2 bg-gray-900 dark:bg-[#2563EB] hover:bg-black dark:hover:bg-blue-700 text-white text-xs font-semibold rounded-xl transition-colors shrink-0 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {promoError && (
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 font-medium pl-1">{promoError}</p>
                  )}
                </form>
              )}

              {/* Subtotal breakdown */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>Subtotal</span>
                  <span className="font-semibold text-gray-900 dark:text-white">${cartSubtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount Savings</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark:text-neutral-400">
                  <span>Shipping</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {amountNeededForFreeShipping === 0 ? 'FREE' : '$5.99'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-gray-900 dark:text-white pt-2 border-t border-gray-100 dark:border-neutral-800">
                  <span>Estimated Total</span>
                  <span className="text-blue-600 dark:text-blue-400">${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckoutClick}
                  className="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handleViewCartClick}
                    className="py-2.5 px-3 bg-gray-100 dark:bg-[#242424] hover:bg-gray-200 dark:hover:bg-[#2e2e2e] text-gray-800 dark:text-neutral-200 text-xs font-semibold rounded-xl text-center transition-colors cursor-pointer"
                  >
                    View Full Cart
                  </button>
                  <button
                    onClick={() => setIsCartDrawerOpen(false)}
                    className="py-2.5 px-3 bg-white dark:bg-[#181818] border border-gray-200 dark:border-neutral-700 hover:bg-gray-50 dark:hover:bg-[#242424] text-gray-700 dark:text-neutral-300 text-xs font-semibold rounded-xl text-center transition-colors cursor-pointer"
                  >
                    Keep Shopping
                  </button>
                </div>
              </div>

              {/* Trust Badge */}
              <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-400 pt-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>256-bit Encrypted Express Checkout</span>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
