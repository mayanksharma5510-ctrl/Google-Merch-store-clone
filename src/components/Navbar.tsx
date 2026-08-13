import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, BarChart2, ArrowRight, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    totalItemsCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsGA4ModalOpen,
    navigateToProduct,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  } = useShop();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  // Filter search matches for quick dropdown
  const searchMatches = searchQuery.trim().length > 0
    ? PRODUCTS.filter((p) =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 5)
    : [];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setIsSearchFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectSearchResult = (product: typeof PRODUCTS[0]) => {
    navigateToProduct(product);
    setSearchQuery('');
    setIsSearchFocused(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/80 shadow-xs transition-all">
      {/* Top Value Banner */}
      <div className="bg-[#111827] text-white text-[11px] font-medium py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 bg-blue-500/20 border border-blue-400/30 px-2 py-0.5 rounded-full text-[10px] text-blue-300">
          <Sparkles className="w-3 h-3 text-amber-400" /> GA4 Blueprint Ready
        </span>
        <span>Smart merch. Faster checkout. Free Express Shipping on orders over $75!</span>
        <button
          onClick={() => setIsGA4ModalOpen(true)}
          className="underline hover:text-blue-300 ml-1 font-semibold transition-colors"
        >
          See Analytics Strategy
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-8">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2.5 text-left group"
            >
              <div className="w-10 h-10 rounded-full bg-[#2563EB] text-white flex items-center justify-center font-black text-lg shadow-sm group-hover:scale-105 transition-transform">
                G
              </div>
              <div>
                <span className="text-base sm:text-lg font-extrabold text-[#111827] tracking-tight block leading-none">
                  Google <span className="text-[#2563EB]">Merch Shop</span>
                </span>
                <span className="text-[10px] font-bold text-[#6B7280] block tracking-widest uppercase mt-0.5">
                  Powered by MerchFlow
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[#6B7280]">
              <button
                onClick={() => setCurrentPage('home')}
                className={`hover:text-[#2563EB] transition-colors ${
                  currentPage === 'home' ? 'text-[#111827] font-bold' : ''
                }`}
              >
                Home
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage('shop');
                }}
                className={`hover:text-[#2563EB] transition-colors ${
                  currentPage === 'shop' ? 'text-[#111827] font-bold' : ''
                }`}
              >
                Shop All
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Apparel');
                  setCurrentPage('shop');
                }}
                className="hover:text-[#2563EB] transition-colors"
              >
                Apparel
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Smart Tech');
                  setCurrentPage('shop');
                }}
                className="hover:text-[#2563EB] transition-colors"
              >
                Smart Tech
              </button>
              <button
                onClick={() => {
                  setSelectedCategory('Desk Essentials');
                  setCurrentPage('shop');
                }}
                className="hover:text-[#2563EB] transition-colors"
              >
                Desk Gear
              </button>
            </nav>
          </div>

          {/* Instant Search Bar (Desktop/Tablet) */}
          <div ref={searchRef} className="relative flex-1 max-w-md hidden sm:block">
            <div className="relative">
              <input
                type="text"
                placeholder="Search Developer Hoodie, Pixel Mug, Keyboard..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-gray-100 text-[#111827] border border-transparent focus:border-gray-300 focus:outline-none focus:bg-white transition-all placeholder:text-[#6B7280]"
              />
              <Search className="w-4 h-4 text-[#6B7280] absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#111827] text-xs p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden z-50 p-2 space-y-1">
                {searchMatches.length > 0 ? (
                  searchMatches.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectSearchResult(product)}
                      className="p-2.5 rounded-xl hover:bg-gray-50 flex items-center gap-3 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100 shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 truncate">{product.subtitle}</p>
                      </div>
                      <span className="text-xs font-bold text-blue-600">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500">
                    No merch found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* GA4 Strategy Button */}
            <button
              onClick={() => setIsGA4ModalOpen(true)}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200/60 text-xs font-semibold transition-colors"
              title="View GA4 Analytics Improvement Strategy"
            >
              <BarChart2 className="w-3.5 h-3.5" />
              <span>GA4 Insights</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentPage('shop');
              }}
              className="relative p-2.5 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="Wishlist"
              title="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <span className="absolute top-1.5 right-1.5 w-4 h-4 bg-rose-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button with Count */}
            <button
              onClick={() => setIsCartDrawerOpen(true)}
              className="relative p-2 sm:px-3 sm:py-2 rounded-full bg-[#111827] hover:bg-black text-white shadow-xs flex items-center gap-2 transition-colors cursor-pointer"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline text-xs font-semibold">Bag</span>
              <span className="w-4 h-4 bg-[#2563EB] text-white rounded-full text-[10px] font-bold flex items-center justify-center">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-700 hover:bg-gray-100 md:hidden transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white p-4 space-y-4 shadow-xl">
          {/* Search Input Mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-100 border border-gray-200"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <nav className="flex flex-col space-y-2 text-sm font-semibold text-gray-800">
            <button
              onClick={() => {
                setCurrentPage('home');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-left hover:bg-gray-50"
            >
              Home Page
            </button>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentPage('shop');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-left hover:bg-gray-50 flex items-center justify-between"
            >
              <span>Shop All Merch</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Apparel');
                setCurrentPage('shop');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-left hover:bg-gray-50 text-gray-600 pl-6"
            >
              Apparel & Hoodies
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Smart Tech');
                setCurrentPage('shop');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-left hover:bg-gray-50 text-gray-600 pl-6"
            >
              Smart Tech & Mugs
            </button>
            <button
              onClick={() => {
                setSelectedCategory('Desk Essentials');
                setCurrentPage('shop');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg text-left hover:bg-gray-50 text-gray-600 pl-6"
            >
              Desk Gear & Mats
            </button>
            <button
              onClick={() => {
                setIsGA4ModalOpen(true);
                setIsMobileMenuOpen(false);
              }}
              className="py-2.5 px-3 rounded-xl bg-blue-50 text-blue-700 font-bold text-xs flex items-center gap-2 mt-2"
            >
              <BarChart2 className="w-4 h-4" />
              <span>GA4 Analytics Improvement Strategy</span>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
