import React, { useState } from 'react';
import { ShieldCheck, Truck, RotateCcw, Mail, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, showToast } = useShop();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid email address', 'error');
      return;
    }
    setSubscribed(true);
    showToast('Subscribed! Use promo code "GOOGLE20" for 20% off!', 'success');
  };

  return (
    <footer className="bg-white border-t border-gray-200 text-[#111827] pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Value Proposition Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-10 border-b border-gray-100">
          <div className="flex items-center gap-4 p-4 rounded-[24px] bg-[#F3F4F6] border border-gray-100">
            <div className="p-3 bg-blue-50 text-[#2563EB] rounded-2xl shrink-0">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">Free Express Shipping</h4>
              <p className="text-xs text-[#6B7280]">On all orders over $75 with tracking</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-[24px] bg-[#F3F4F6] border border-gray-100">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">Google Guarantee</h4>
              <p className="text-xs text-[#6B7280]">Verified authentic official merch</p>
            </div>
          </div>

          <div className="flex items-center gap-4 p-4 rounded-[24px] bg-[#F3F4F6] border border-gray-100">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl shrink-0">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">30-Day Easy Returns</h4>
              <p className="text-xs text-[#6B7280]">Hassle-free replacement guarantee</p>
            </div>
          </div>
        </div>

        {/* Trending Categories Pill Ribbon */}
        <div className="space-y-3">
          <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#6B7280]">
            Trending Collections
          </h4>
          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Pixel Wearables', cat: 'Apparel' },
              { label: 'Sustainable Gear', cat: 'Apparel' },
              { label: 'Workspace Decor', cat: 'Desk Essentials' },
              { label: 'Smart Temp Mugs', cat: 'Smart Tech' },
              { label: 'Limited Drops', cat: 'All' },
            ].map((pill) => (
              <span
                key={pill.label}
                onClick={() => {
                  setSelectedCategory(pill.cat as any);
                  setCurrentPage('shop');
                }}
                className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold text-[#111827] hover:bg-gray-200 cursor-pointer transition-colors"
              >
                {pill.label}
              </span>
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pt-4">
          {/* Brand Info & Newsletter */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-white border border-gray-200/80 p-1.5 flex items-center justify-center shadow-xs">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
              </div>
              <span className="text-lg font-extrabold text-[#111827] tracking-tight">
                Google <span className="text-[#2563EB]">Merch Shop</span>
              </span>
            </div>

            <p className="text-xs text-[#6B7280] max-w-sm leading-relaxed">
              Smart merch. Faster checkout. Premium developer apparel, smart desk tech, and sustainable lifestyle essentials designed for creators.
            </p>

            {/* Newsletter Form */}
            <div className="pt-2">
              <p className="text-xs font-bold text-[#6B7280] mb-2">Subscribe to MerchFlow Insider</p>
              {subscribed ? (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-full text-xs text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Subscribed! Use code <strong className="underline">GOOGLE20</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-full text-xs flex-1 focus:outline-none focus:border-[#2563EB] text-[#111827]"
                  />
                  <button
                    type="submit"
                    className="bg-[#111827] hover:bg-black text-white px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-colors shrink-0"
                  >
                    Join
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">Categories</h5>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Apparel');
                    setCurrentPage('shop');
                  }}
                  className="hover:text-[#111827] transition-colors cursor-pointer"
                >
                  Apparel & Hoodies
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Smart Tech');
                    setCurrentPage('shop');
                  }}
                  className="hover:text-[#111827] transition-colors cursor-pointer"
                >
                  Smart Tech & Mugs
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Desk Essentials');
                    setCurrentPage('shop');
                  }}
                  className="hover:text-[#111827] transition-colors cursor-pointer"
                >
                  Desk Gear & Mats
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    setSelectedCategory('Drinkware');
                    setCurrentPage('shop');
                  }}
                  className="hover:text-[#111827] transition-colors cursor-pointer"
                >
                  Stainless Drinkware
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">Customer Care</h5>
            <ul className="space-y-2 text-xs text-[#6B7280]">
              <li><a href="#shipping" className="hover:text-[#111827] transition-colors">Shipping Rates & Policy</a></li>
              <li><a href="#returns" className="hover:text-[#111827] transition-colors">Track Order & Returns</a></li>
              <li><a href="#size-guide" className="hover:text-[#111827] transition-colors">Size & Fit Guide</a></li>
              <li><a href="#faq" className="hover:text-[#111827] transition-colors">Merch FAQ & Support</a></li>
            </ul>
          </div>

          {/* Conversion Tech */}
          <div className="space-y-3">
            <h5 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider">GA4 Strategy</h5>
            <p className="text-xs text-[#6B7280] leading-relaxed">
              Designed with 3-click max discovery, mobile bottom sticky actions, and gamified free shipping meters.
            </p>
            <div className="pt-1">
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#2563EB] rounded-full text-[10px] font-bold uppercase tracking-wider">
                GA4 Optimized Conversion Engine
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-[#6B7280]">
          <p>© 2026 MerchFlow. All rights reserved. Official Google Merch Shop.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-[#111827]">Privacy Policy</a>
            <a href="#" className="hover:text-[#111827]">Terms of Service</a>
            <a href="#" className="hover:text-[#111827]">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
