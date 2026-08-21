import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X, RotateCcw, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const CATEGORIES: Category[] = ['All', 'Apparel', 'Smart Tech', 'Desk Essentials', 'Drinkware', 'Accessories', 'Bags'];

export const ShopPage: React.FC = () => {
  const {
    searchQuery,
    setSearchQuery,
    selectedCategory,
    setSelectedCategory,
    sortBy,
    setSortBy,
    priceRange,
    setPriceRange,
    inStockOnly,
    setInStockOnly,
  } = useShop();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Filter Logic
  const filteredProducts = PRODUCTS.filter((product) => {
    // Category
    if (selectedCategory !== 'All' && product.category !== selectedCategory) {
      return false;
    }
    // Search Query
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const matches =
        product.name.toLowerCase().includes(query) ||
        product.subtitle.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);
      if (!matches) return false;
    }
    // Price Range
    if (product.price < priceRange[0] || product.price > priceRange[1]) {
      return false;
    }
    // In Stock Only
    if (inStockOnly && !product.inStock) {
      return false;
    }
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'newest') return b.id.localeCompare(a.id);
    return 0; // default featured
  });

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSortBy('featured');
    setPriceRange([0, 250]);
    setInStockOnly(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 py-4 sm:py-8 space-y-5 sm:space-y-8">
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-b border-gray-200 dark:border-neutral-800 pb-4 sm:pb-6">
        <div>
          <span className="text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#2563EB] dark:text-blue-400 block mb-1">
            Curated Collection
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#111827] dark:text-white tracking-tight">
            Google Merch Catalog
          </h1>
          <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 mt-0.5 sm:mt-1">
            Showing {filteredProducts.length} curated items • Fast checkout & global shipping
          </p>
        </div>

        {/* Category Pills Bar (Edge-to-edge Horizontal Scroll on Mobile & Desktop) */}
        <div className="-mx-2.5 px-2.5 sm:mx-0 sm:px-0 flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 sm:pb-2 scrollbar-none snap-x">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-[44px] sm:min-h-[48px] px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold shrink-0 transition-all cursor-pointer inline-flex items-center justify-center active:scale-95 ${
                selectedCategory === cat
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 text-[#111827] dark:text-neutral-200 hover:bg-gray-50 dark:hover:bg-[#2a2a2a]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-6 bg-white dark:bg-[#181818] rounded-[28px] border border-gray-200/80 dark:border-neutral-800 shadow-xs h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-neutral-800">
            <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="min-h-[40px] px-2 text-xs font-medium text-gray-500 dark:text-neutral-400 hover:text-[#2563EB] dark:hover:text-blue-400 inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-gray-700 dark:text-neutral-200">Search Keywords</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full min-h-[48px] pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-full bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 focus:outline-none focus:border-[#2563EB] focus:bg-white dark:focus:bg-[#222222] text-gray-900 dark:text-white placeholder:text-gray-400 transition-all"
              />
              <Search className="w-4 h-4 text-gray-400 dark:text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-semibold text-gray-700 dark:text-neutral-200">
              <span>Max Price</span>
              <span className="text-[#2563EB] dark:text-blue-400 font-bold">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#2563EB] cursor-pointer min-h-[32px]"
            />
          </div>

          {/* Availability Toggle */}
          <div className="pt-2">
            <label className="min-h-[48px] flex items-center gap-3 text-xs sm:text-sm font-medium text-gray-700 dark:text-neutral-200 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-gray-300 dark:border-neutral-700 text-[#2563EB] focus:ring-[#2563EB] w-5 h-5 cursor-pointer"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-4 sm:space-y-6">
          {/* Top Sort Controls Bar */}
          <div className="flex items-center justify-between gap-3 bg-white dark:bg-[#181818] p-3 sm:p-4 rounded-[24px] sm:rounded-[28px] border border-gray-200/80 dark:border-neutral-800 shadow-xs">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden min-h-[48px] px-4 py-2.5 bg-gray-100 dark:bg-[#242424] text-gray-900 dark:text-white text-xs sm:text-sm font-semibold rounded-full cursor-pointer hover:bg-gray-200 dark:hover:bg-neutral-700 inline-flex items-center gap-2 active:scale-95 transition-all"
              aria-label="Open filter settings"
            >
              <Filter className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs font-semibold text-gray-500 dark:text-neutral-400 hidden sm:inline">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="min-h-[48px] px-4 py-2.5 text-xs sm:text-sm font-medium bg-gray-50 dark:bg-[#222222] border border-gray-200 dark:border-neutral-700 rounded-full focus:outline-none focus:border-[#2563EB] text-gray-900 dark:text-white cursor-pointer"
              >
                <option value="featured">Featured Items</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Product Cards Grid */}
          {filteredProducts.length === 0 ? (
            <div className="p-8 sm:p-12 text-center bg-white dark:bg-[#181818] rounded-[28px] sm:rounded-[32px] border border-gray-100 dark:border-neutral-800 shadow-xs space-y-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-[#242424] text-[#6B7280] dark:text-neutral-400 rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#111827] dark:text-white">No items found</h3>
              <p className="text-xs sm:text-sm text-[#6B7280] dark:text-neutral-400 max-w-sm mx-auto">
                Try resetting your filters or searching for another keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="min-h-[48px] mt-2 py-3 px-6 bg-[#2563EB] text-white text-xs sm:text-sm font-bold rounded-full shadow-xs hover:bg-blue-700 cursor-pointer inline-flex items-center justify-center active:scale-95 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 sm:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer Overlay */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div
            onClick={() => setIsMobileFilterOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xs bg-white dark:bg-[#181818] h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10 text-gray-900 dark:text-neutral-100">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-neutral-800">
                <h3 className="text-base font-bold text-gray-900 dark:text-white">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="min-w-[48px] min-h-[48px] flex items-center justify-center -mr-2 text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 rounded-full cursor-pointer"
                  aria-label="Close filter drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Range */}
              <div className="space-y-3">
                <label className="text-xs font-bold text-gray-700 dark:text-neutral-300">Max Price: ${priceRange[1]}</label>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-[#2563EB] cursor-pointer min-h-[36px]"
                />
              </div>

              {/* In Stock */}
              <label className="min-h-[48px] flex items-center gap-3 text-xs sm:text-sm font-semibold text-gray-700 dark:text-neutral-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-[#2563EB] focus:ring-[#2563EB] w-5 h-5"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-neutral-800">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full min-h-[48px] py-3.5 bg-[#2563EB] hover:bg-blue-700 text-white font-bold text-xs sm:text-sm rounded-full shadow-md cursor-pointer flex items-center justify-center active:scale-95 transition-all"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full min-h-[48px] py-3 bg-gray-100 dark:bg-[#262626] text-gray-700 dark:text-neutral-300 font-semibold text-xs sm:text-sm rounded-full cursor-pointer flex items-center justify-center active:scale-95 transition-all"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

