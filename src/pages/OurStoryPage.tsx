import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ShieldCheck, Heart, Users, Award, ArrowRight, ShoppingBag, Globe, Leaf } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const OurStoryPage: React.FC = () => {
  const { setCurrentPage, setSelectedCategory } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto space-y-6"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-blue-50 dark:bg-[#202020] text-[#2563EB] dark:text-blue-400 text-xs font-bold rounded-full border border-blue-100 dark:border-neutral-800">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB] dark:text-blue-400" />
          <span>Our Mission & Craft</span>
        </div>

        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-[#111827] dark:text-white">
          Merch Designed for the <span className="text-[#2563EB] dark:text-blue-400">Creator Generation</span>
        </h1>

        <p className="text-base sm:text-lg text-gray-500 dark:text-neutral-300 leading-relaxed">
          The Google Merch Shop creates premium, sustainable apparel, smart workspace accessories, and durable everyday carry gear built for developers, designers, and innovators around the globe.
        </p>

        <div className="flex justify-center gap-4 pt-2">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setCurrentPage('shop');
            }}
            className="px-7 py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-extrabold text-xs sm:text-sm rounded-full shadow-md flex items-center gap-2 cursor-pointer transition-all active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Explore Official Merch</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.section>

      {/* Core Values Grid */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        <div className="p-8 bg-white dark:bg-[#181818] rounded-[32px] border border-gray-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-blue-50 dark:bg-[#242424] text-[#2563EB] dark:text-blue-400 rounded-2xl flex items-center justify-center font-bold">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#111827] dark:text-white">100% Organic & Ethically Made</h3>
          <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
            All apparel is woven from 100% GOTS-certified organic cotton and recycled poly-blends. Zero harsh chemicals, transparent supply chains, and fair wage production.
          </p>
        </div>

        <div className="p-8 bg-white dark:bg-[#181818] rounded-[32px] border border-gray-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-emerald-50 dark:bg-[#242424] text-emerald-600 dark:text-emerald-400 rounded-2xl flex items-center justify-center font-bold">
            <Globe className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#111827] dark:text-white">Built for Work & Travel</h3>
          <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
            Every thread, zipper, and smart circuit is tested for seamless transitions between home studios, office campuses, and global tech conferences.
          </p>
        </div>

        <div className="p-8 bg-white dark:bg-[#181818] rounded-[32px] border border-gray-200/80 dark:border-neutral-800 shadow-xs space-y-4">
          <div className="w-12 h-12 bg-indigo-50 dark:bg-[#242424] text-indigo-600 dark:text-indigo-400 rounded-2xl flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-extrabold text-[#111827] dark:text-white">Official Google Quality</h3>
          <p className="text-xs text-gray-500 dark:text-neutral-400 leading-relaxed">
            Authentic Google Merchandise Shop products adhere to strict durability standards, precision stitching, colorfastness, and eco-friendly packaging.
          </p>
        </div>
      </motion.section>

      {/* Story Narrative Banner */}
      <section className="bg-[#181818] rounded-[36px] p-8 sm:p-14 text-white grid grid-cols-1 lg:grid-cols-2 gap-10 items-center border border-neutral-800">
        <div className="space-y-6">
          <span className="text-xs font-extrabold uppercase tracking-widest text-blue-400">
            Behind the Brand
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            From Simple Ideas to Global Creator Culture
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            What started as internal gear for Google I/O developers evolved into an official lifestyle line for creators worldwide. We believe merchandise should be as thoughtfully engineered as the software you write every day.
          </p>

          <div className="grid grid-cols-2 gap-6 pt-2 border-t border-neutral-800">
            <div>
              <span className="text-3xl font-black text-blue-400 block">500K+</span>
              <span className="text-xs text-neutral-400">Creators Geared Up</span>
            </div>
            <div>
              <span className="text-3xl font-black text-emerald-400 block">100%</span>
              <span className="text-xs text-neutral-400">Carbon Neutral Shipping</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-neutral-700 aspect-4/3">
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&auto=format&fit=crop&q=80"
            alt="Google Merch Design Team"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>
      </section>
    </div>
  );
};
