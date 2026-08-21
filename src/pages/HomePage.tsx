import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Check, Star, Flame, ShoppingBag, Sparkles, ShieldCheck, Truck, RotateCcw, HeartHandshake } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS, FEATURED_BUNDLE, SAMPLE_REVIEWS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import bundleMerchPackImg from '../assets/images/bundle_merch_pack_1786790680490.jpg';
import merchAccessoriesStudioImg from '../assets/images/merch_accessories_studio_1786791040545.jpg';
import googleDeveloperHoodieImg from '../assets/images/google_developer_hoodie_1786792435016.jpg';
import merchDrinkwareStudioImg from '../assets/images/merch_drinkware_studio_1786792507825.jpg';
import cloudBackpackImg from '../assets/images/cloud_backpack_1786792472768.jpg';

export const HomePage: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, navigateToProduct, addToCart, setIsGA4ModalOpen } = useShop();

  const targetBestSellerIds = [
    'google-pen-red',
    'google-gray-cotton-cap',
    'google-ombre-pen-purple',
    'nano-banana-tee',
    'chrome-dino-dark-mode-collection',
  ];

  const bestSellers = targetBestSellerIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter((p): p is typeof PRODUCTS[0] => !!p);

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
    <div className="space-y-8 sm:space-y-12 pb-16 pt-2 max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
      {/* 1. Strong Animated Hero Section */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-stretch"
      >
        {/* Left Hero Main Card */}
        <motion.section
          variants={itemVariants}
          className="lg:col-span-7 bg-white dark:bg-[#181818] rounded-[24px] sm:rounded-[32px] p-6 sm:p-12 flex flex-col justify-between relative overflow-hidden shadow-xs border border-gray-200/80 dark:border-neutral-800 group"
        >
          <div className="relative z-10 space-y-4 sm:space-y-6">
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-tight text-[#111827] dark:text-white"
            >
              Smart Merch<br />
              <span className="text-[#2563EB]">Designed For Creators.</span>
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[#6B7280] dark:text-neutral-300 text-xs sm:text-base max-w-lg leading-relaxed font-normal"
            >
              Elevate your daily workflow with official Google organic apparel, smart temperature drinkware, modular tech bags, and tactile desktop accessories.
            </motion.p>

            {/* Clear CTA Buttons with hover scale */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-2"
            >
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleShopNewArrivals}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-[#2563EB] text-white text-xs sm:text-sm font-extrabold rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-200/50 transition-all cursor-pointer flex items-center justify-center gap-2.5"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Shop New Arrivals</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={scrollToBestSellers}
                className="w-full sm:w-auto px-6 sm:px-7 py-3 sm:py-3.5 bg-gray-50 dark:bg-[#242424] border border-gray-300 dark:border-neutral-700 text-[#111827] dark:text-white text-xs sm:text-sm font-bold rounded-full hover:bg-white dark:hover:bg-[#2c2c2c] hover:border-gray-400 transition-all cursor-pointer flex items-center justify-center gap-2"
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
            className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-gray-100 dark:border-neutral-800 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 text-left relative z-10"
          >
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#6B7280] dark:text-neutral-300">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>Free Ship Over $75</span>
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#6B7280] dark:text-neutral-300">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>30-Day Easy Returns</span>
            </div>
            <div className="hidden sm:flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-semibold text-[#6B7280] dark:text-neutral-300">
              <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <span>100% Organic & Ethically Made</span>
            </div>
          </motion.div>
        </motion.section>

        {/* Right Hero Feature Bundle Card */}
        <motion.aside variants={itemVariants} className="lg:col-span-5 flex flex-col gap-6">
          <motion.div
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
            className="flex-1 bg-white dark:bg-[#181818] rounded-[24px] sm:rounded-[32px] p-5 sm:p-8 text-[#111827] dark:text-white flex flex-col justify-between relative overflow-hidden shadow-xs dark:shadow-md border border-gray-200/80 dark:border-neutral-800 transition-colors"
          >
            <div className="space-y-3 sm:space-y-4 relative z-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500/10 border border-amber-500/30 dark:bg-amber-400/10 dark:border-amber-400/20 text-amber-700 dark:text-amber-300 text-[10px] font-extrabold uppercase tracking-wider rounded-full">
                <Flame className="w-3 h-3 text-amber-600 dark:text-amber-400 fill-amber-600 dark:fill-amber-400" />
                <span>Weekly Bundle Deal</span>
              </div>

              <div>
                <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                  The Developer Starter Pack
                </h3>
                <p className="text-xs text-gray-600 dark:text-neutral-300 mt-1 max-w-xs leading-relaxed">
                  Heavyweight organic hoodie + Insulated water bottle + Cotton cap + Enamel keychain.
                </p>
              </div>

              <div className="flex items-baseline gap-2 sm:gap-3 pt-1">
                <span className="text-2xl sm:text-3xl font-black text-[#2563EB] dark:text-blue-400">
                  ${FEATURED_BUNDLE.bundlePrice.toFixed(2)}
                </span>
                <span className="text-xs sm:text-sm text-gray-400 dark:text-neutral-400 line-through">
                  ${FEATURED_BUNDLE.originalTotalPrice.toFixed(2)}
                </span>
                <span className="px-2 py-0.5 sm:px-2.5 sm:py-0.5 bg-red-600 text-white font-black text-[9px] sm:text-[10px] uppercase tracking-wider rounded-full shadow-xs">
                  SAVE ${FEATURED_BUNDLE.savings.toFixed(0)} OFF
                </span>
              </div>
            </div>

            {/* Single Bundle Collection Cover Image */}
            <div className="pt-4 relative z-10 space-y-3 sm:space-y-4 flex-1 flex flex-col justify-end">
              <motion.div
                whileHover={{ scale: 1.015 }}
                className="w-full h-44 sm:h-64 lg:h-60 xl:h-64 rounded-2xl bg-gray-50 dark:bg-[#242424] border border-black/90 dark:border-neutral-600 overflow-hidden relative group shadow-sm"
              >
                <img
                  src={bundleMerchPackImg}
                  alt="Google Developer Starter Bundle with hoodie, bottle, cap, and keychain"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent opacity-70 pointer-events-none" />
                <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-xs font-bold text-white drop-shadow-sm">
                  <span>4-Piece Premium Set</span>
                  <span className="bg-black/75 backdrop-blur-xs px-2.5 py-0.5 rounded-md border border-white/20 text-[11px]">All-in-One</span>
                </div>
              </motion.div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => FEATURED_BUNDLE.items.forEach((p) => addToCart(p))}
                className="w-full py-3 sm:py-3.5 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-95"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Starter Bundle to Bag</span>
              </motion.button>
            </div>
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
        className="space-y-4 sm:space-y-6 pt-2 scroll-mt-24"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 sm:gap-4 border-b border-gray-200/80 dark:border-gray-800 pb-3 sm:pb-4">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="p-1 sm:p-1.5 bg-amber-100 dark:bg-amber-900/40 rounded-lg text-amber-600 dark:text-amber-400">
                <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-500 animate-pulse" />
              </span>
              <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#2563EB] dark:text-blue-400">
                Top Customer Favorites
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              Best Sellers
            </h2>
            <p className="text-xs sm:text-sm text-[#6B7280] dark:text-gray-400">
              Highest-rated merchandise chosen by tech enthusiasts & creators worldwide.
            </p>
          </div>

          <button
            onClick={handleShopNewArrivals}
            className="px-4 sm:px-5 py-2 sm:py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600 text-[#111827] dark:text-white text-xs font-bold rounded-full transition-all cursor-pointer flex items-center gap-2 self-start sm:self-auto hover:bg-gray-50 dark:hover:bg-gray-700 active:scale-95"
          >
            <span>View Full Catalog</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          </button>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } },
          }}
          className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-2.5 sm:gap-5"
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
        className="space-y-4 sm:space-y-6 pt-4"
      >
        <div className="flex items-end justify-between border-b border-gray-200/80 dark:border-gray-800 pb-3 sm:pb-4">
          <div>
            <span className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#2563EB] dark:text-blue-400">
              Shop By Category
            </span>
            <h2 className="text-xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
              Curated Collections
            </h2>
          </div>
          <button
            onClick={handleShopNewArrivals}
            className="text-xs font-bold text-[#2563EB] dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>All Categories</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
          {[
            {
              name: 'Apparel',
              desc: 'Heavyweight organic hoodies, tees, & embroidered caps',
              image: googleDeveloperHoodieImg,
              category: 'Apparel' as const,
              ctaText: 'Shop Apparel',
            },
            {
              name: 'Accessories',
              desc: 'Magnetic power banks, active noise buds, & desk pads',
              image: merchAccessoriesStudioImg,
              category: 'Accessories' as const,
              ctaText: 'Shop Accessories',
            },
            {
              name: 'Drinkware',
              desc: 'Smart temperature mugs & insulated flasks',
              image: merchDrinkwareStudioImg,
              category: 'Drinkware' as const,
              ctaText: 'Explore Drinkware',
            },
            {
              name: 'Bags',
              desc: 'Modular tech backpacks & weatherproof travel vaults',
              image: cloudBackpackImg,
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
              className="group relative h-52 sm:h-80 rounded-[20px] sm:rounded-[28px] overflow-hidden border border-gray-200/80 dark:border-gray-800 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-end p-3.5 sm:p-6"
            >
              {/* Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                referrerPolicy="no-referrer"
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              {/* Dark Overlay Solid */}
              <div className="absolute inset-0 bg-black/60 transition-opacity" />

              {/* Card Content & Actionable CTA Button */}
              <div className="relative z-10 space-y-2 sm:space-y-3">
                <div>
                  <h3 className="text-base sm:text-xl font-extrabold text-white group-hover:text-blue-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="hidden sm:block text-xs text-neutral-300 mt-1 leading-relaxed">
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
                  className="w-full py-2 sm:py-2.5 px-3 sm:px-4 bg-white hover:bg-neutral-100 text-[#111827] hover:text-[#2563EB] font-extrabold text-[11px] sm:text-xs rounded-xl transition-all cursor-pointer flex items-center justify-between shadow-sm"
                >
                  <span>{cat.ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#2563EB]" />
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
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#2563EB] dark:text-blue-400">
            Verified Community Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111827] dark:text-white tracking-tight">
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
              className="p-6 bg-white dark:bg-[#181818] rounded-[28px] border border-gray-200/80 dark:border-neutral-800 shadow-xs space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <h4 className="text-sm font-bold text-[#111827] dark:text-white">{rev.title}</h4>
                <p className="text-xs text-[#6B7280] dark:text-neutral-300 leading-relaxed">{rev.comment}</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-neutral-800">
                <img
                  src={rev.userAvatar}
                  alt={rev.userName}
                  referrerPolicy="no-referrer"
                  className="w-9 h-9 rounded-full object-cover shrink-0"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-[#111827] dark:text-white">{rev.userName}</span>
                    <HeartHandshake className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
                  </div>
                  <span className="text-[10px] text-[#6B7280] dark:text-neutral-400">Verified Buyer • {rev.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

