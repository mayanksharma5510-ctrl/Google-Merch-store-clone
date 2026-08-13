import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Check, Star, ShieldCheck, Truck, RotateCcw, Flame, Tag, Layers, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, FEATURED_BUNDLE, SAMPLE_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, navigateToProduct, addToCart, setIsGA4ModalOpen } = useShop();

  const bestSellers = PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.badge === 'GA4 Pick').slice(0, 4);

  return (
    <div className="space-y-12 pb-16 pt-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Editorial Main Grid Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Primary Hero Card */}
        <section className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-xs border border-gray-100">
          <div className="relative z-10 space-y-6">
            <span className="inline-block px-3.5 py-1 bg-blue-50 text-[#2563EB] text-[10px] font-extrabold uppercase tracking-wider rounded-full">
              Official Google Merch • GA4 Ready
            </span>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-[#111827]">
              Smart merch.<br />Faster <span className="text-[#2563EB]">checkout.</span>
            </h1>

            <p className="text-[#6B7280] text-sm sm:text-base max-w-md leading-relaxed">
              Premium essentials designed for creators, tech-savvy professionals, and modern shoppers. High-conversion UX engineered with 3-click product discovery.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage('shop');
                }}
                className="px-7 py-3.5 bg-[#2563EB] text-white text-xs sm:text-sm font-bold rounded-full hover:shadow-lg hover:shadow-blue-200 transition-all cursor-pointer flex items-center gap-2"
              >
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Smart Tech');
                  setCurrentPage('shop');
                }}
                className="px-7 py-3.5 bg-white border border-gray-200 text-[#111827] text-xs sm:text-sm font-bold rounded-full hover:bg-gray-50 transition-all cursor-pointer"
              >
                Explore Best Sellers
              </button>
            </div>
          </div>

          <div className="pt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-3 text-left relative z-10">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>3-Click Discovery</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free Express Ship over $75</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>1-Click Google Pay</span>
            </div>
          </div>

          {/* Background Ambient Glow */}
          <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
        </section>

        {/* Right Aside Feature Cards */}
        <aside className="lg:col-span-5 flex flex-col gap-6">
          {/* Top Weekly Bundle Card */}
          <div className="flex-1 bg-white rounded-[32px] p-6 shadow-xs border border-gray-100 flex items-center justify-between group hover:border-gray-200 transition-all">
            <div className="space-y-2">
              <span className="text-[10px] uppercase tracking-widest text-[#6B7280] font-bold block">
                Weekly Bundle Deal
              </span>
              <h3 className="text-lg font-bold text-[#111827]">The Developer Pack</h3>
              <p className="text-xs text-[#6B7280]">{FEATURED_BUNDLE.tagline}</p>
              <div className="flex items-baseline gap-2 pt-1">
                <span className="text-lg font-extrabold text-[#2563EB]">
                  ${FEATURED_BUNDLE.bundlePrice.toFixed(2)}
                </span>
                <span className="text-xs text-[#6B7280] line-through">
                  ${FEATURED_BUNDLE.originalTotalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={() => FEATURED_BUNDLE.items.forEach((p) => addToCart(p))}
                className="mt-2 text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
              >
                Add Creator Bundle to Bag <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="w-28 h-28 sm:w-32 sm:h-32 bg-gray-100 rounded-2xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform relative">
              <img
                src={FEATURED_BUNDLE.items[0].images[0]}
                alt="Bundle item"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Bottom Dark Accent Limited Edition Card */}
          <div className="h-52 bg-[#111827] rounded-[32px] p-8 text-white flex flex-col justify-center relative overflow-hidden shadow-sm">
            <span className="text-xs text-blue-300 font-bold uppercase tracking-widest mb-1">
              GA4 Optimized Feature
            </span>
            <h3 className="text-xl font-bold leading-tight max-w-xs">
              Instant Analytics Improvement Strategy
            </h3>
            <p className="text-xs text-gray-400 mt-1 max-w-xs">
              4-step optimization blueprint solving cart abandonments & mobile leaks.
            </p>
            <button
              onClick={() => setIsGA4ModalOpen(true)}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-white hover:text-blue-300 transition-all cursor-pointer"
            >
              <span>Explore Analytics Blueprint</span>
              <ArrowRight className="w-4 h-4 text-[#2563EB]" />
            </button>

            <div className="absolute -right-4 -top-4 w-28 h-28 bg-[#2563EB] rounded-full blur-2xl opacity-40 pointer-events-none" />
          </div>
        </aside>
      </div>

      {/* Trending Categories */}
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
              Curated Collections
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
              Browse Categories
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage('shop');
            }}
            className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
          >
            View All Catalog <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              name: 'Apparel',
              desc: 'Heavyweight organic fleece & tees',
              image: PRODUCTS[0].images[0],
              category: 'Apparel',
            },
            {
              name: 'Smart Tech',
              desc: 'Precision temp mugs & ANC buds',
              image: PRODUCTS[1].images[0],
              category: 'Smart Tech',
            },
            {
              name: 'Desk Essentials',
              desc: 'Tactile keyboards & ambient lighting',
              image: PRODUCTS[2].images[0],
              category: 'Desk Essentials',
            },
            {
              name: 'Drinkware',
              desc: 'Insulated flasks & barista cups',
              image: PRODUCTS[6].images[0],
              category: 'Drinkware',
            },
          ].map((cat) => (
            <div
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.category as any);
                setCurrentPage('shop');
              }}
              className="group relative h-48 rounded-[28px] overflow-hidden cursor-pointer border border-gray-100 shadow-xs hover:shadow-md transition-all"
            >
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/30 to-transparent p-5 flex flex-col justify-end text-white">
                <h3 className="text-base font-bold group-hover:text-blue-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-gray-300 mt-0.5">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Best Selling Products */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="w-5 h-5 text-amber-500 fill-amber-500" />
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#111827] tracking-tight">
                Best Sellers
              </h2>
              <p className="text-xs text-[#6B7280]">
                Top conversion picks chosen by tech creators
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage('shop');
            }}
            className="text-xs font-bold text-[#2563EB] hover:underline cursor-pointer"
          >
            Explore Catalog →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="space-y-6 pt-4">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
            Community Reviews
          </span>
          <h2 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Loved by Developers & Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-6 bg-white rounded-[28px] border border-gray-100 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-[#111827]">{rev.title}</h4>
                <p className="text-xs text-[#6B7280] leading-relaxed">{rev.comment}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#111827]">{rev.userName}</span>
                    <HeartHandshake className="w-3.5 h-3.5 text-[#2563EB]" />
                  </div>
                  <span className="text-[10px] text-[#6B7280]">Verified Buyer • {rev.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
