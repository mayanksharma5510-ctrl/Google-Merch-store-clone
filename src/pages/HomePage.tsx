import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, Flame, ShoppingBag, Sparkles, ShieldCheck, Truck, RotateCcw, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, FEATURED_BUNDLE, SAMPLE_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, navigateToProduct, addToCart, setIsGA4ModalOpen } = useShop();

  const bestSellers = PRODUCTS.filter((p) => p.badge === 'Best Seller' || p.badge === 'GA4 Pick').slice(0, 4);

  const scrollToBestSellers = () => {
    const el = document.getElementById('best-sellers-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else {
      setSelectedCategory('All');
      setCurrentPage('shop');
    }
  };

  const handleShopNewArrivals = () => {
    setSelectedCategory('All');
    setCurrentPage('shop');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
  };

  return (
    <div className="space-y-12 pb-16 pt-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* 1. Strong Animated Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        {/* Left Hero Main Card */}
        <motion.section
          variants={itemVariants}
          className="lg:col-span-7 bg-white rounded-[32px] p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-xs border border-gray-200/80 group"
        >
          <div className="relative z-10 space-y-6">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 text-[#2563EB] text-xs font-bold rounded-full border border-blue-100"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB] animate-pulse" />
              <span>Official Google Merch Collection</span>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-[#111827]"
            >
              Smart Merch.<br />
              <span className="text-[#2563EB]">Designed for Creators.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[#6B7280] text-sm sm:text-base max-w-lg leading-relaxed font-normal"
            >
              Elevate your daily workflow with official Google organic apparel, smart temperature drinkware, modular tech bags, and tactile desktop accessories.
            </motion.p>

            {/* Clear CTA Buttons with hover scale */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-wrap gap-3 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShopNewArrivals}
                className="px-7 py-3.5 bg-[#2563EB] text-white text-xs sm:text-sm font-extrabold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200/50 transition-all cursor-pointer flex items-center gap-2.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToBestSellers}
                className="px-7 py-3.5 bg-gray-50 border border-gray-300 text-[#111827] text-xs sm:text-sm font-bold rounded-full hover:bg-white hover:border-gray-400 transition-all cursor-pointer flex items-center gap-2"
              >
                <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-bounce" />
                <span>Explore Best Sellers</span>
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="pt-8 mt-8 border-t border-gray-100 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left relative z-10"
          >
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Free Ship Over $75</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>30-Day Easy Returns</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Organic & Ethically Made</span>
            </div>
          </motion.div>

          {/* Animated Background Glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.5, 0.7, 0.5],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -right-12 -bottom-12 w-72 h-72 bg-blue-100/80 rounded-full blur-3xl pointer-events-none"
          />
        </motion.section>

        {/* Right Hero Feature Bundle Card */}
        <motion.aside variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex-1 bg-gradient-to-br from-gray-900 via-gray-900 to-[#111827] rounded-[32px] p-8 text-white flex flex-col justify-between relative overflow-hidden shadow-md border border-gray-800"
          >
            <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-400/20 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                <Flame className="w-3 h-3 text-amber-400 fill-amber-400" />
                <span>Weekly Bundle Deal</span>
              </div>

              <div>
                <h3 className="text-2xl font-extrabold tracking-tight text-white">
                  The Developer Starter Pack
                </h3>
                <p className="text-xs text-gray-300 mt-1 max-w-xs leading-relaxed">
                  Heavyweight organic hoodie + Tensor mechanical keyboard + Insulated water flask.
                </p>
              </div>

              <div className="flex items-baseline gap-3 pt-1">
                <span className="text-3xl font-black text-blue-400">
                  ${FEATURED_BUNDLE.bundlePrice.toFixed(2)}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ${FEATURED_BUNDLE.originalTotalPrice.toFixed(2)}
                </span>
                <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold rounded-full">
                  Save ${FEATURED_BUNDLE.savings.toFixed(0)}
                </span>
              </div>
            </div>

            {/* Interactive Bundle Image Preview */}
            <div className="pt-6 relative z-10 space-y-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {FEATURED_BUNDLE.items.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ scale: 1.08 }}
                    className="w-16 h-16 rounded-xl bg-gray-800/80 border border-gray-700/80 overflow-hidden shrink-0"
                  >
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </motion.div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => FEATURED_BUNDLE.items.forEach((p) => addToCart(p))}
                className="w-full py-3.5 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Starter Bundle to Bag</span>
              </motion.button>
            </div>

            <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-blue-600 rounded-full blur-3xl opacity-30 pointer-events-none" />
          </motion.div>
        </motion.aside>
      </motion.div>

      {/* 2. Best-Selling Products Section */}
      <motion.section
        id="best-sellers-section"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="space-y-6 pt-2 scroll-mt-24"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200/80 pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-amber-100 rounded-lg text-amber-600">
                <Flame className="w-4 h-4 fill-amber-500 animate-pulse" />
              </span>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
                Top Customer Favorites
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280]">
              Highest-rated merchandise chosen by tech enthusiasts & creators worldwide.
            </p>
          </div>

          <button
            onClick={handleShopNewArrivals}
            className="px-5 py-2.5 bg-white border border-gray-300 hover:border-gray-400 text-[#111827] text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto hover:bg-gray-50 active:scale-95"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#2563EB]" />
          </button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {bestSellers.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 3. Category Cards */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="space-y-6 pt-4"
      >
        <div className="flex items-end justify-between border-b border-gray-200/80 pb-4">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
              Shop By Category
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
              Curated Collections
            </h2>
          </div>
          <button
            onClick={handleShopNewArrivals}
            className="text-xs font-bold text-[#2563EB] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: 'Apparel',
              desc: 'Heavyweight organic hoodies, tees, & embroidered caps',
              image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80',
              category: 'Apparel' as const,
              ctaText: 'Shop Apparel',
            },
            {
              name: 'Accessories',
              desc: 'Magnetic power banks, active noise buds, & desk pads',
              image: 'https://images.unsplash.com/photo-1609592424074-124b42385c34?w=800&auto=format&fit=crop&q=80',
              category: 'Accessories' as const,
              ctaText: 'Shop Accessories',
            },
            {
              name: 'Drinkware',
              desc: 'Smart temperature mugs & insulated flasks',
              image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
              category: 'Drinkware' as const,
              ctaText: 'Explore Drinkware',
            },
            {
              name: 'Bags',
              desc: 'Modular tech backpacks & weatherproof travel vaults',
              image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80',
              category: 'Bags' as const,
              ctaText: 'Browse Bags',
            },
          ].map((cat, idx) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative h-80 rounded-[28px] overflow-hidden border border-gray-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-6"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/95 via-[#111827]/50 to-transparent transition-opacity" />

              {/* Card Content & Actionable CTA Button */}
              <div className="relative z-10 space-y-3">
                <div>
                  <h3 className="text-xl font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-gray-300 mt-1 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedCategory(cat.category);
                    setCurrentPage('shop');
                  }}
                  className="w-full py-2.5 px-4 bg-white/90 hover:bg-white text-[#111827] hover:text-[#2563EB] font-extrabold text-xs rounded-xl transition-all cursor-pointer flex items-center justify-between shadow-sm"
                >
                  <span>{cat.ctaText}</span>
                  <ArrowRight className="w-4 h-4 text-[#2563EB]" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 4. Customer Testimonials */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.6 }}
        className="space-y-6 pt-4"
      >
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB]">
            Verified Community Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Loved by Developers & Tech Creators
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SAMPLE_REVIEWS.map((rev, i) => (
            <motion.div
              key={rev.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="p-6 bg-white rounded-[28px] border border-gray-200/80 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
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
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

