import React from 'react';
import { Home, Grid, Heart, ShoppingBag, Sun, Moon } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useTheme } from '../context/ThemeContext';

export const MobileBottomNav: React.FC = () => {
  const {
    currentPage,
    setCurrentPage,
    setSelectedCategory,
    totalItemsCount,
    wishlist,
    setIsCartDrawerOpen,
  } = useShop();

  const { isDark, toggleTheme } = useTheme();

  return (
    <div
      id="mobile-bottom-dock"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 px-3 pb-3 pt-2 bg-gradient-to-t from-white/95 via-white/90 to-transparent dark:from-[#121212]/95 dark:via-[#121212]/90 pointer-events-none"
    >
      <nav
        className="max-w-md mx-auto bg-white/90 dark:bg-[#1e1e1e]/90 backdrop-blur-xl border border-gray-200/90 dark:border-neutral-800 rounded-full shadow-2xl px-2 py-1.5 flex items-center justify-around pointer-events-auto transition-all"
        aria-label="Mobile Navigation"
      >
        {/* Home */}
        <button
          id="mobile-nav-home"
          onClick={() => setCurrentPage('home')}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] rounded-full transition-all cursor-pointer ${
            currentPage === 'home'
              ? 'text-[#2563EB] dark:text-blue-400 font-extrabold bg-blue-50/80 dark:bg-blue-950/40'
              : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Home"
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Home</span>
        </button>

        {/* Shop */}
        <button
          id="mobile-nav-shop"
          onClick={() => {
            setSelectedCategory('All');
            setCurrentPage('shop');
          }}
          className={`flex flex-col items-center justify-center min-w-[54px] min-h-[46px] rounded-full transition-all cursor-pointer ${
            currentPage === 'shop'
              ? 'text-[#2563EB] dark:text-blue-400 font-extrabold bg-blue-50/80 dark:bg-blue-950/40'
              : 'text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white'
          }`}
          aria-label="Shop Catalog"
        >
          <Grid className="w-5 h-5" />
          <span className="text-[10px] tracking-tight mt-0.5">Shop</span>
        </button>

        {/* Wishlist */}
        <button
          id="mobile-nav-wishlist"
          onClick={() => {
            setSelectedCategory('All');
            setCurrentPage('shop');
          }}
          className="relative flex flex-col items-center justify-center min-w-[54px] min-h-[46px] rounded-full text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
          aria-label="Wishlist"
        >
          <div className="relative">
            <Heart className="w-5 h-5" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-0.5 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Saved</span>
        </button>

        {/* Cart Bag */}
        <button
          id="mobile-nav-cart"
          onClick={() => setIsCartDrawerOpen(true)}
          className="relative flex flex-col items-center justify-center min-w-[54px] min-h-[46px] rounded-full text-[#2563EB] dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 font-bold transition-all cursor-pointer active:scale-95 shadow-2xs"
          aria-label="Open Cart Bag"
        >
          <div className="relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute -top-1 -right-2 min-w-3.5 h-3.5 px-1 bg-[#2563EB] dark:bg-blue-500 text-white rounded-full text-[9px] font-black flex items-center justify-center shadow-xs">
              {totalItemsCount}
            </span>
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Bag</span>
        </button>

        {/* Theme Mode Toggle */}
        <button
          id="mobile-nav-theme"
          onClick={toggleTheme}
          className="flex flex-col items-center justify-center min-w-[54px] min-h-[46px] rounded-full text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-white transition-all cursor-pointer"
          aria-label={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {isDark ? (
            <Sun className="w-5 h-5 text-amber-400" />
          ) : (
            <Moon className="w-5 h-5 text-neutral-700" />
          )}
          <span className="text-[10px] tracking-tight mt-0.5">{isDark ? 'Light' : 'Dark'}</span>
        </button>
      </nav>
    </div>
  );
};
