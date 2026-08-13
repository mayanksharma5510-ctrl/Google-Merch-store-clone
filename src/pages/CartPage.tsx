import React, { useState } from 'react';
import { ShoppingBag, Trash2, ArrowRight, Tag, Truck, ShieldCheck, ArrowLeft, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    discountAmount,
    amountNeededForFreeShipping,
    freeShippingThreshold,
    appliedPromo,
    applyPromoCode,
    removePromoCode,
    estimatedShipping,
    estimatedTax,
    cartTotal,
    setCurrentPage,
    navigateToProduct,
    addToCart,
  } = useShop();

  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');

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

  const crossSellProducts = PRODUCTS.slice(0, 2);

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 bg-blue-50 dark:bg-blue-950/60 text-[#2563EB] dark:text-blue-400 rounded-full flex items-center justify-center mx-auto shadow-xs">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-2xl font-extrabold text-[#111827] dark:text-white">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-[#6B7280] dark:text-gray-400 max-w-md mx-auto">
          Explore our collection of modern developer merchandise, smart mugs, and sustainable organic apparel.
        </p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="py-3.5 px-8 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-xs transition-colors cursor-pointer"
        >
          Explore Catalog Now
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-4">
        <button
          onClick={() => setCurrentPage('shop')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#6B7280] dark:text-gray-400 hover:text-[#111827] dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Continue Shopping</span>
        </button>

        <h1 className="text-xl font-extrabold text-[#111827] dark:text-white">
          Shopping Bag ({cart.length} item{cart.length === 1 ? '' : 's'})
        </h1>
      </div>

      {/* Free Shipping Meter */}
      <div className="p-5 bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 shadow-xs space-y-2">
        <div className="flex items-center justify-between text-xs font-bold text-[#111827] dark:text-white">
          <span className="flex items-center gap-2">
            <Truck className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
            {amountNeededForFreeShipping === 0 ? (
              <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Free Express Shipping Unlocked!
              </span>
            ) : (
              <span>Add ${amountNeededForFreeShipping.toFixed(2)} more to qualify for Free Express Shipping</span>
            )}
          </span>
          <span className="text-[#2563EB] dark:text-blue-400 font-extrabold">{Math.round(freeShippingPercentage)}%</span>
        </div>
        <div className="w-full h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              amountNeededForFreeShipping === 0 ? 'bg-emerald-500' : 'bg-[#2563EB] dark:bg-blue-500'
            }`}
            style={{ width: `${freeShippingPercentage}%` }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Item List */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="p-5 bg-white dark:bg-gray-900 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-xs flex flex-col sm:flex-row items-center gap-4 hover:border-gray-200 dark:hover:border-gray-700 transition-all"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-2xl object-cover bg-gray-100 dark:bg-gray-800 shrink-0"
              />

              <div className="flex-1 text-center sm:text-left space-y-1 min-w-0">
                <h3
                  onClick={() => navigateToProduct(item.product)}
                  className="text-sm font-bold text-[#111827] dark:text-white hover:text-[#2563EB] dark:hover:text-blue-400 cursor-pointer truncate"
                >
                  {item.product.name}
                </h3>
                <p className="text-xs text-[#6B7280] dark:text-gray-400">
                  Color: <strong className="text-[#111827] dark:text-gray-200">{item.selectedColor}</strong> • Size: <strong className="text-[#111827] dark:text-gray-200">{item.selectedSize}</strong>
                </p>
                <span className="text-xs font-bold text-[#111827] dark:text-gray-200 block">
                  ${item.product.price.toFixed(2)} each
                </span>
              </div>

              {/* Quantity Controls & Total */}
              <div className="flex items-center gap-4">
                <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-700 p-1 bg-gray-50 dark:bg-gray-800">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 shadow-xs text-[#111827] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-[#111827] dark:text-white">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-full bg-white dark:bg-gray-700 shadow-xs text-[#111827] dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 flex items-center justify-center font-bold text-xs cursor-pointer"
                  >
                    +
                  </button>
                </div>

                <span className="text-sm font-extrabold text-[#111827] dark:text-white w-20 text-right">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </span>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-full hover:bg-rose-50 dark:hover:bg-rose-950/60 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          {/* Frequently Bought Together / Add-Ons */}
          <div className="pt-6 border-t border-gray-200 dark:border-gray-800 space-y-4">
            <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider">Add Popular Accessories</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {crossSellProducts.map((prod) => (
                <div key={prod.id} className="p-3.5 bg-white dark:bg-gray-900 rounded-[24px] border border-gray-100 dark:border-gray-800 flex items-center gap-3 shadow-xs">
                  <img src={prod.images[0]} alt="" className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-gray-800" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#111827] dark:text-white truncate">{prod.name}</h4>
                    <span className="text-xs font-extrabold text-[#2563EB] dark:text-blue-400">${prod.price.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addToCart(prod)}
                    className="px-3.5 py-1.5 bg-gray-100 dark:bg-gray-800 hover:bg-[#2563EB] dark:hover:bg-blue-600 hover:text-white text-[#111827] dark:text-gray-200 font-bold text-xs rounded-full transition-colors cursor-pointer"
                  >
                    + Add
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:col-span-4 space-y-6">
          <div className="p-6 bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 shadow-xs space-y-4 sticky top-24">
            <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider pb-3 border-b border-gray-100 dark:border-gray-800">
              Order Summary
            </h3>

            {/* Promo Code Input */}
            {appliedPromo ? (
              <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 rounded-full text-xs">
                <div className="flex items-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold">
                  <Tag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>Promo "{appliedPromo.code}"</span>
                </div>
                <button onClick={removePromoCode} className="text-rose-600 dark:text-rose-400 font-bold hover:underline cursor-pointer">
                  Remove
                </button>
              </div>
            ) : (
              <form onSubmit={handleApplyPromo} className="space-y-1">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Promo Code (GOOGLE20)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    className="flex-1 px-4 py-2.5 text-xs rounded-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:border-[#2563EB] text-[#111827] dark:text-white placeholder:text-gray-400 uppercase font-semibold"
                  />
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#111827] dark:bg-blue-600 text-white text-xs font-bold rounded-full hover:bg-black dark:hover:bg-blue-700 cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
                {promoError && <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold pl-2">{promoError}</p>}
              </form>
            )}

            {/* Breakdown */}
            <div className="space-y-2 text-xs text-[#6B7280] dark:text-gray-400 pt-2 border-t border-gray-100 dark:border-gray-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#111827] dark:text-white">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Estimated Shipping</span>
                <span className="font-bold text-[#111827] dark:text-white">
                  {amountNeededForFreeShipping === 0 ? 'FREE' : `${estimatedShipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax (8%)</span>
                <span className="font-bold text-[#111827] dark:text-white">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#111827] dark:text-white pt-3 border-t border-gray-100 dark:border-gray-800">
                <span>Order Total</span>
                <span className="text-[#2563EB] dark:text-blue-400">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => setCurrentPage('checkout')}
              className="w-full py-3.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-[#6B7280] dark:text-gray-400 pt-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Google Verified 256-bit Encrypted Checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
