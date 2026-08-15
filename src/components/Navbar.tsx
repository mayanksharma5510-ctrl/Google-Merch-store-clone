import React, { useState, useRef, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, BarChart2, ArrowRight, Sparkles, Layout, Sliders, Wand2, Sun, Moon } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';
import { PRODUCTS } from '../data/products';

export const Navbar: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    totalItemsCount,
    wishlist,
    setIsCartDrawerOpen,
    setIsGA4ModalOpen,
    setIsStudioEditorOpen,
    setIsAIWizardOpen,
    navigateToProduct,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    activeTemplate,
  } = useShop();

  const { theme, toggleTheme, isDark } = useTheme();

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

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setScrollDirection('down');
      } else {
        setScrollDirection('up');
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 pt-3 pb-1 px-4 sm:px-6 lg:px-8 transition-all duration-300 pointer-events-none ${
        scrollDirection === 'down' ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto backdrop-blur-md border rounded-2xl sm:rounded-full px-4 sm:px-6 lg:px-8 pointer-events-auto transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 dark:bg-[#181818]/90 shadow-md border-gray-300/80 dark:border-neutral-800 scale-[0.99] py-0.5'
            : 'bg-white/80 dark:bg-[#181818]/80 shadow-xs border-gray-200/80 dark:border-neutral-800'
        }`}
      >
        <div className="flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Brand Logo */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => setCurrentPage('home')}
              className="flex items-center gap-2.5 text-left group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full bg-white dark:bg-[#242424] border border-gray-200/80 dark:border-neutral-700 p-2 flex items-center justify-center shadow-xs group-hover:scale-105 group-hover:border-blue-300 transition-all">
                <svg className="w-full h-full" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
              </div>
              <div>
                <span className="text-base sm:text-lg font-extrabold text-[#111827] dark:text-white tracking-tight block leading-none">
                  Google <span className="text-[#2563EB]">Merch Shop</span>
                </span>
              </div>
            </button>

            {/* Desktop Nav Links */}
            <nav className="hidden lg:flex items-center gap-1 sm:gap-2 text-xs font-bold text-[#6B7280] dark:text-neutral-300">
              <button
                onClick={() => setCurrentPage('home')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentPage === 'home'
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-2xs font-extrabold'
                    : 'hover:text-[#2563EB] hover:bg-gray-100/80 dark:hover:bg-[#262626]'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setCurrentPage('shop');
                }}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentPage === 'shop'
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-2xs font-extrabold'
                    : 'hover:text-[#2563EB] hover:bg-gray-100/80 dark:hover:bg-[#262626]'
                }`}
              >
                Shop Catalog
              </button>

              <button
                onClick={() => setCurrentPage('our-story')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentPage === 'our-story'
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-2xs font-extrabold'
                    : 'hover:text-[#2563EB] hover:bg-gray-100/80 dark:hover:bg-[#262626]'
                }`}
              >
                Our Story
              </button>

              <button
                onClick={() => setCurrentPage('contact-faq')}
                className={`px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  currentPage === 'contact-faq'
                    ? 'bg-[#111827] dark:bg-white text-white dark:text-[#111827] shadow-2xs font-extrabold'
                    : 'hover:text-[#2563EB] hover:bg-gray-100/80 dark:hover:bg-[#262626]'
                }`}
              >
                Contact & FAQ
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
                className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-gray-100 dark:bg-[#222222] text-[#111827] dark:text-neutral-100 border border-transparent focus:border-gray-300 dark:focus:border-neutral-600 focus:outline-none focus:bg-white dark:focus:bg-[#1c1c1c] transition-all placeholder:text-[#6B7280] dark:placeholder:text-neutral-400"
              />
              <Search className="w-4 h-4 text-[#6B7280] dark:text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280] dark:text-neutral-400 hover:text-[#111827] dark:hover:text-white text-xs p-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Instant Autocomplete Dropdown */}
            {isSearchFocused && searchQuery.trim().length > 0 && (
              <div className="absolute top-full mt-2 left-0 right-0 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-xl border border-gray-200 dark:border-neutral-800 overflow-hidden z-50 p-2 space-y-1">
                {searchMatches.length > 0 ? (
                  searchMatches.map((product) => (
                    <div
                      key={product.id}
                      onClick={() => handleSelectSearchResult(product)}
                      className="p-2.5 rounded-xl hover:bg-gray-50 dark:hover:bg-[#282828] flex items-center gap-3 cursor-pointer transition-colors"
                    >
                      <img
                        src={product.images[0]}
                        alt=""
                        className="w-10 h-10 rounded-lg object-cover bg-gray-100 dark:bg-[#222222] shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-semibold text-gray-900 dark:text-neutral-100 truncate">
                          {product.name}
                        </h4>
                        <p className="text-[11px] text-gray-500 dark:text-neutral-400 truncate">{product.subtitle}</p>
                      </div>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">
                        ${product.price.toFixed(2)}
                      </span>
                    </div>
                  ))
                ) : (
                  <div className="p-4 text-center text-xs text-gray-500 dark:text-neutral-400">
                    No merch found matching "{searchQuery}"
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl text-gray-600 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] transition-all cursor-pointer active:scale-90 flex items-center justify-center"
              aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
              title={isDark ? "Switch to light theme" : "Switch to dark theme"}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-90" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-800 transition-transform duration-300 rotate-0 hover:-rotate-12" />
              )}
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentPage('shop');
              }}
              className="relative p-2.5 rounded-xl text-gray-600 dark:text-neutral-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-[#262626] transition-colors cursor-pointer"
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
              className="relative px-3 py-2 rounded-full bg-white/80 dark:bg-[#262626] hover:bg-white dark:hover:bg-[#303030] text-[#111827] dark:text-white border border-gray-200/90 dark:border-neutral-700 shadow-2xs flex items-center gap-2 transition-all cursor-pointer active:scale-95"
              aria-label="Open Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#2563EB] dark:text-blue-400" />
              <span className="hidden sm:inline text-xs font-bold">Bag</span>
              <span className="min-w-4 h-4 px-1 bg-[#2563EB] text-white rounded-full text-[10px] font-black flex items-center justify-center">
                {totalItemsCount}
              </span>
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl text-gray-700 dark:text-neutral-200 hover:bg-gray-100 dark:hover:bg-[#262626] md:hidden transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-neutral-800 bg-white dark:bg-[#181818] p-4 space-y-4 shadow-xl rounded-b-2xl mt-1">
          {/* Search Input Mobile */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-100 dark:bg-[#242424] text-gray-900 dark:text-neutral-100 border border-gray-200 dark:border-neutral-700 placeholder:text-gray-400"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>

          <nav className="flex flex-col space-y-1 text-sm font-semibold text-gray-800 dark:text-neutral-200">
            <button
              onClick={() => {
                setCurrentPage('home');
                setIsMobileMenuOpen(false);
              }}
              className={`py-2.5 px-3.5 rounded-xl text-left transition-colors flex items-center justify-between ${
                currentPage === 'home' ? 'bg-neutral-100 dark:bg-[#2a2a2a] text-[#2563EB] dark:text-blue-400 font-bold' : 'hover:bg-gray-50 dark:hover:bg-[#242424]'
              }`}
            >
              <span>Home</span>
            </button>

            <button
              onClick={() => {
                setSelectedCategory('All');
                setCurrentPage('shop');
                setIsMobileMenuOpen(false);
              }}
              className={`py-2.5 px-3.5 rounded-xl text-left transition-colors flex items-center justify-between ${
                currentPage === 'shop' ? 'bg-neutral-100 dark:bg-[#2a2a2a] text-[#2563EB] dark:text-blue-400 font-bold' : 'hover:bg-gray-50 dark:hover:bg-[#242424]'
              }`}
            >
              <span>Shop Catalog</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </button>

            <button
              onClick={() => {
                setCurrentPage('our-story');
                setIsMobileMenuOpen(false);
              }}
              className={`py-2.5 px-3.5 rounded-xl text-left transition-colors flex items-center justify-between ${
                currentPage === 'our-story' ? 'bg-neutral-100 dark:bg-[#2a2a2a] text-[#2563EB] dark:text-blue-400 font-bold' : 'hover:bg-gray-50 dark:hover:bg-[#242424]'
              }`}
            >
              <span>Our Story</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('contact-faq');
                setIsMobileMenuOpen(false);
              }}
              className={`py-2.5 px-3.5 rounded-xl text-left transition-colors flex items-center justify-between ${
                currentPage === 'contact-faq' ? 'bg-neutral-100 dark:bg-[#2a2a2a] text-[#2563EB] dark:text-blue-400 font-bold' : 'hover:bg-gray-50 dark:hover:bg-[#242424]'
              }`}
            >
              <span>Contact & FAQ</span>
            </button>

            {/* Theme Toggle Mobile Row */}
            <div className="pt-2 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between px-3.5 py-2">
              <span className="text-xs text-gray-500 dark:text-neutral-400">Appearance Mode</span>
              <button
                onClick={toggleTheme}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-[#262626] text-xs font-bold text-gray-800 dark:text-neutral-200"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Light Mode</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-neutral-800" />
                    <span>Dark Mode</span>
                  </>
                )}
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

