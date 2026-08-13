import React, { useState } from 'react';
import { Search, Filter, SlidersHorizontal, X, RotateCcw } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Category } from '../types';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';

const CATEGORIES: Category[] = ['All', 'Apparel', 'Smart Tech', 'Desk Essentials', 'Drinkware', 'Accessories'];

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Page Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-200 pb-6">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#6B7280]">
            Curated Catalog
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#111827] tracking-tight">
            Google Merch Catalog
          </h1>
          <p className="text-xs text-[#6B7280] mt-0.5">
            Showing {filteredProducts.length} items • Fast 3-click checkout
          </p>
        </div>

        {/* Category Pills Bar (Horizontal Scroll Mobile & Desktop) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2563EB] text-white shadow-xs'
                  : 'bg-white border border-gray-200 text-[#111827] hover:bg-gray-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid & Filters Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block space-y-6 p-6 bg-white rounded-[28px] border border-gray-100 shadow-xs h-fit sticky top-24">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="text-xs font-extrabold text-[#111827] uppercase tracking-wider flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
              <span>Filters</span>
            </h3>
            <button
              onClick={handleResetFilters}
              className="text-[11px] font-bold text-[#6B7280] hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          </div>

          {/* Search Box */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-[#111827]">Search Keywords</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-xs rounded-full bg-gray-50 border border-gray-200 focus:outline-none focus:border-[#2563EB] text-[#111827]"
              />
              <Search className="w-3.5 h-3.5 text-[#6B7280] absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Price Range */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#111827]">
              <span>Max Price</span>
              <span className="text-[#2563EB]">${priceRange[1]}</span>
            </div>
            <input
              type="range"
              min="10"
              max="250"
              step="5"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full accent-[#2563EB] cursor-pointer"
            />
          </div>

          {/* Availability Toggle */}
          <div className="pt-2">
            <label className="flex items-center gap-2 text-xs font-semibold text-[#111827] cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB] w-4 h-4"
              />
              <span>In Stock Only</span>
            </label>
          </div>
        </aside>

        {/* Product Grid Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Top Sort Controls Bar */}
          <div className="flex items-center justify-between bg-white p-4 rounded-[28px] border border-gray-100 shadow-xs">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 px-4 py-2 bg-gray-100 text-[#111827] text-xs font-bold rounded-full cursor-pointer"
            >
              <Filter className="w-3.5 h-3.5" />
              <span>Filters</span>
            </button>

            <div className="flex items-center gap-2 ml-auto">
              <label className="text-xs font-bold text-[#6B7280] hidden sm:inline">Sort By:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 text-xs font-bold bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:border-[#2563EB] text-[#111827] cursor-pointer"
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
            <div className="p-12 text-center bg-white rounded-[32px] border border-gray-100 shadow-xs space-y-3">
              <div className="w-12 h-12 bg-gray-100 text-[#6B7280] rounded-full flex items-center justify-center mx-auto">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-[#111827]">No items found</h3>
              <p className="text-xs text-[#6B7280] max-w-sm mx-auto">
                Try resetting your filters or searching for another keyword.
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 py-2.5 px-6 bg-[#2563EB] text-white text-xs font-bold rounded-full shadow-xs hover:bg-blue-700 cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
            className="fixed inset-0 bg-gray-900/50 backdrop-blur-xs"
          />
          <div className="relative w-full max-w-xs bg-white h-full p-6 space-y-6 shadow-2xl flex flex-col justify-between overflow-y-auto z-10">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <h3 className="text-base font-bold text-gray-900">Filter Products</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Price Range */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-700">Max Price: ${priceRange[1]}</label>
                <input
                  type="range"
                  min="10"
                  max="250"
                  step="5"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* In Stock */}
              <label className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="rounded text-blue-600 w-4 h-4"
                />
                <span>In Stock Only</span>
              </label>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-200">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md"
              >
                Apply Filters ({filteredProducts.length})
              </button>
              <button
                onClick={handleResetFilters}
                className="w-full py-2.5 bg-gray-100 text-gray-700 font-semibold text-xs rounded-xl"
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
