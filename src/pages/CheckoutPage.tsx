import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Truck, Lock, CreditCard, Check, ArrowLeft, Sparkles, CheckCircle2, Download, Printer, PackageCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { ShippingAddress, PaymentDetails, Order } from '../types';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    estimatedShipping,
    estimatedTax,
    cartTotal,
    placeOrder,
    latestOrder,
    setCurrentPage,
  } = useShop();

  const [address, setAddress] = useState<ShippingAddress>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const [paymentMethod, setPaymentMethod] = useState<'gpay' | 'card' | 'applepay' | 'paypal'>('gpay');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExp, setCardExp] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express' | 'overnight'>('express');
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  // Auto-Fill Demo Address
  const handleAutoFill = () => {
    setAddress({
      fullName: 'Alex Chen',
      email: 'alex.chen@google.com',
      phone: '+1 (555) 019-2834',
      addressLine1: '1600 Amphitheatre Parkway',
      city: 'Mountain View',
      state: 'CA',
      postalCode: '94043',
      country: 'United States',
    });
    setCardNumber('4242 •••• •••• 4242');
    setCardExp('12/28');
    setCardCvc('888');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!address.fullName || !address.email || !address.addressLine1) {
      alert('Please fill in required shipping fields or click "Auto-Fill Sample Data".');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const payDetails: PaymentDetails = {
        method: paymentMethod,
        cardNumber,
        cardExp,
        cardCvc,
      };
      const newOrd = placeOrder(address, payDetails);
      setIsProcessing(false);
      setConfirmedOrder(newOrd);
    }, 1500);
  };

  if (cart.length === 0 && !confirmedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4">
        <h2 className="text-xl font-extrabold text-[#111827] dark:text-white">Your bag is empty</h2>
        <p className="text-xs text-gray-500 dark:text-neutral-400">Add items to cart before proceeding to checkout.</p>
        <button
          onClick={() => setCurrentPage('shop')}
          className="py-3 px-8 bg-[#2563EB] text-white font-bold text-xs rounded-full shadow-xs cursor-pointer"
        >
          Return to Shop
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 dark:border-neutral-800 pb-4">
        <button
          onClick={() => setCurrentPage('cart')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Bag</span>
        </button>

        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <h1 className="text-lg font-extrabold text-[#111827] dark:text-white">Google Secure One-Page Checkout</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Checkout Form Column */}
        <form onSubmit={handlePlaceOrder} className="lg:col-span-7 space-y-6">
          {/* Quick Demo Auto-Fill Banner */}
          <div className="p-5 bg-blue-50/70 dark:bg-[#1f1f1f] border border-blue-100 dark:border-neutral-800 rounded-[24px] flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-[#111827] dark:text-white flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
                <span>Evaluation Quick Mode</span>
              </h3>
              <p className="text-[11px] text-gray-500 dark:text-neutral-400 mt-0.5">
                Click auto-fill to instantly populate sample Google employee address and testing payment.
              </p>
            </div>
            <button
              type="button"
              onClick={handleAutoFill}
              className="py-2.5 px-4 bg-[#2563EB] hover:bg-blue-700 text-white text-xs font-bold rounded-full shadow-xs transition-colors shrink-0 cursor-pointer"
            >
              Auto-Fill Sample Data
            </button>
          </div>

          {/* Shipping Address Form */}
          <div className="p-6 bg-white dark:bg-[#181818] rounded-[32px] border border-gray-100 dark:border-neutral-800 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800 pb-3">
              1. Shipping Address
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-[#111827] dark:text-neutral-200">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Chen"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#111827] dark:text-neutral-200">Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={address.email}
                  onChange={(e) => setAddress({ ...address, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#111827] dark:text-neutral-200">Phone Number</label>
                <input
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1 sm:col-span-2">
                <label className="font-bold text-[#111827] dark:text-neutral-200">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="1600 Amphitheatre Pkwy"
                  value={address.addressLine1}
                  onChange={(e) => setAddress({ ...address, addressLine1: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-[#111827] dark:text-neutral-200">City *</label>
                <input
                  type="text"
                  required
                  placeholder="Mountain View"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-[#111827] dark:text-neutral-200">State *</label>
                  <input
                    type="text"
                    required
                    placeholder="CA"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-[#111827] dark:text-neutral-200">Postal Code *</label>
                  <input
                    type="text"
                    required
                    placeholder="94043"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Method */}
          <div className="p-6 bg-white dark:bg-[#181818] rounded-[32px] border border-gray-100 dark:border-neutral-800 shadow-xs space-y-3">
            <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800 pb-3">
              2. Delivery Method
            </h3>

            <div className="space-y-2 text-xs">
              <label
                onClick={() => setShippingMethod('express')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-[#2563EB] bg-blue-50/50 dark:bg-[#202020] text-[#111827] dark:text-white font-bold ring-2 ring-blue-500/20'
                    : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#2563EB] dark:text-blue-400" />
                  <div>
                    <span className="font-bold block text-[#111827] dark:text-white">Express 2-Day Delivery</span>
                    <span className="text-[11px] text-gray-500 dark:text-neutral-400">Delivered in 2 business days</span>
                  </div>
                </div>
                <span className="font-extrabold text-[#2563EB] dark:text-blue-400">FREE</span>
              </label>

              <label
                onClick={() => setShippingMethod('overnight')}
                className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'overnight'
                    ? 'border-[#2563EB] bg-blue-50/50 dark:bg-[#202020] text-[#111827] dark:text-white font-bold ring-2 ring-blue-500/20'
                    : 'border-gray-200 dark:border-neutral-700 hover:border-gray-300 dark:hover:border-neutral-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <div>
                    <span className="font-bold block text-[#111827] dark:text-white">Overnight Priority Express</span>
                    <span className="text-[11px] text-gray-500 dark:text-neutral-400">Delivered tomorrow before 10:30 AM</span>
                  </div>
                </div>
                <span className="font-extrabold text-[#111827] dark:text-white">$14.99</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div className="p-6 bg-white dark:bg-[#181818] rounded-[32px] border border-gray-100 dark:border-neutral-800 shadow-xs space-y-4">
            <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800 pb-3">
              3. Payment Method
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              {[
                { id: 'gpay', label: 'Google Pay', icon: 'G' },
                { id: 'card', label: 'Credit Card', icon: '💳' },
                { id: 'applepay', label: 'Apple Pay', icon: '' },
                { id: 'paypal', label: 'PayPal', icon: 'P' },
              ].map((m) => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id as any)}
                  className={`p-3.5 rounded-2xl border font-bold text-center transition-all cursor-pointer ${
                    paymentMethod === m.id
                      ? 'border-[#2563EB] bg-[#2563EB] text-white shadow-xs'
                      : 'border-gray-200 dark:border-neutral-700 text-[#111827] dark:text-neutral-200 hover:border-gray-300 dark:hover:border-neutral-600 bg-white dark:bg-[#222222]'
                  }`}
                >
                  <span className="block text-sm mb-0.5">{m.icon}</span>
                  <span>{m.label}</span>
                </button>
              ))}
            </div>

            {paymentMethod === 'card' && (
              <div className="space-y-3 pt-2 text-xs border-t border-gray-100 dark:border-neutral-800">
                <div className="space-y-1">
                  <label className="font-bold text-[#111827] dark:text-neutral-200">Card Number</label>
                  <input
                    type="text"
                    placeholder="4242 4242 4242 4242"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="font-bold text-[#111827] dark:text-neutral-200">Expiry</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      value={cardExp}
                      onChange={(e) => setCardExp(e.target.value)}
                      className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-bold text-[#111827] dark:text-neutral-200">CVC</label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => setCardCvc(e.target.value)}
                      className="w-full px-4 py-3 rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827] dark:text-white placeholder:text-gray-400"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Order Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full py-4 px-6 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-full shadow-md hover:shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-98"
          >
            {isProcessing ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing Order Payment...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Check className="w-4 h-4" />
                <span>Complete Order (${cartTotal.toFixed(2)})</span>
              </span>
            )}
          </button>
        </form>

        {/* Right Order Summary Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-white dark:bg-[#181818] rounded-[32px] border border-gray-100 dark:border-neutral-800 shadow-xs space-y-4 sticky top-24">
            <h3 className="text-xs font-extrabold text-[#111827] dark:text-white uppercase tracking-wider border-b border-gray-100 dark:border-neutral-800 pb-3">
              Order Items ({cart.length})
            </h3>

            <div className="space-y-3 max-h-64 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <img
                    src={item.product.images[0]}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="w-12 h-12 rounded-xl object-cover bg-gray-100 dark:bg-[#242424] shrink-0"
                  />
                  <div className="flex-1 min-w-0 text-xs">
                    <h4 className="font-bold text-[#111827] dark:text-white truncate">{item.product.name}</h4>
                    <p className="text-[11px] text-gray-500 dark:text-neutral-400">
                      Qty: {item.quantity} • {item.selectedColor}
                    </p>
                  </div>
                  <span className="text-xs font-bold text-[#111827] dark:text-white">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-xs text-gray-500 dark:text-neutral-400 pt-3 border-t border-gray-100 dark:border-neutral-800">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-[#111827] dark:text-white">${cartSubtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-bold">
                  <span>Savings</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-bold text-[#111827] dark:text-white">FREE</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span className="font-bold text-[#111827] dark:text-white">${estimatedTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#111827] dark:text-white pt-3 border-t border-gray-100 dark:border-neutral-800">
                <span>Total Due</span>
                <span className="text-[#2563EB] dark:text-blue-400">${cartTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3.5 bg-gray-50 dark:bg-[#202020] rounded-2xl space-y-1 text-[11px] text-gray-500 dark:text-neutral-400">
              <div className="flex items-center gap-1.5 font-bold text-[#111827] dark:text-white">
                <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Google Verified Store Protection</span>
              </div>
              <p>Carbon-neutral shipping & 30-day money back guarantee included.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Receipt Modal Confirmation */}
      {confirmedOrder && (
        <AnimatePresence>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="fixed inset-0 bg-black/75 backdrop-blur-xs"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#181818] rounded-[32px] shadow-2xl p-6 sm:p-8 space-y-6 z-10 text-center my-8 border border-gray-100 dark:border-neutral-800 text-gray-900 dark:text-gray-100"
            >
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-xs">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-[10px] font-extrabold text-[#2563EB] dark:text-blue-400 uppercase tracking-wider block">
                  Order Successfully Placed!
                </span>
                <h2 className="text-2xl font-extrabold text-[#111827] dark:text-white mt-1">
                  Thank You, {confirmedOrder.shippingAddress.fullName}!
                </h2>
                <p className="text-xs text-gray-500 dark:text-neutral-400 mt-1">
                  Confirmation receipt sent to <strong className="text-[#111827] dark:text-white">{confirmedOrder.shippingAddress.email}</strong>
                </p>
              </div>

              {/* Receipt Details Box */}
              <div className="p-5 bg-gray-50 dark:bg-[#202020] rounded-[24px] border border-gray-100 dark:border-neutral-700 text-left space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-200 dark:border-neutral-700 pb-2">
                  <span className="text-gray-500 dark:text-neutral-400">Order Reference:</span>
                  <strong className="text-[#111827] dark:text-white">{confirmedOrder.id}</strong>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-neutral-700 pb-2">
                  <span className="text-gray-500 dark:text-neutral-400">Tracking Number:</span>
                  <strong className="text-[#2563EB] dark:text-blue-400">{confirmedOrder.trackingNumber}</strong>
                </div>
                <div className="flex justify-between border-b border-gray-200 dark:border-neutral-700 pb-2">
                  <span className="text-gray-500 dark:text-neutral-400">Est. Delivery:</span>
                  <strong className="text-emerald-700 dark:text-emerald-400">{confirmedOrder.estimatedDelivery}</strong>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-bold text-[#111827] dark:text-white">Total Charged:</span>
                  <strong className="text-base font-extrabold text-[#111827] dark:text-white">${confirmedOrder.total.toFixed(2)}</strong>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => {
                    setConfirmedOrder(null);
                    setCurrentPage('home');
                  }}
                  className="flex-1 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs rounded-full shadow-xs cursor-pointer"
                >
                  Return to Store
                </button>
                <button
                  onClick={() => window.print()}
                  className="py-3.5 px-6 bg-gray-100 dark:bg-[#282828] hover:bg-gray-200 dark:hover:bg-[#343434] text-[#111827] dark:text-white font-bold text-xs rounded-full flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
              </div>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
};
