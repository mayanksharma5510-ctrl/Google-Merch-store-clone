import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Eye, Heart, Check } from 'lucide-react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateToProduct, openQuickView, addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedColor, setSelectedColor] = useState(
    product.colors.length > 0 ? product.colors[0].name : ''
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const inWishlist = isInWishlist(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedColor, product.sizes[0] || 'Standard', 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      className="group relative bg-white dark:bg-[#181818] rounded-[28px] border border-gray-100 dark:border-neutral-800 shadow-xs hover:shadow-md hover:border-gray-200 dark:hover:border-neutral-700 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Top Image Container */}
      <div 
        onClick={() => navigateToProduct(product)}
        className="relative aspect-square sm:aspect-4/3 w-full bg-gray-100 dark:bg-[#202020] overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Red Discount Tag */}
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 z-10 flex flex-col gap-1 pointer-events-none">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-red-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-1.5 right-1.5 sm:top-2.5 sm:right-2.5 z-10 min-w-[38px] min-h-[38px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center rounded-full transition-all duration-200 cursor-pointer active:scale-95 ${
            inWishlist
              ? 'bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 shadow-sm scale-105'
              : 'bg-white/90 dark:bg-[#262626]/90 backdrop-blur-md text-[#6B7280] dark:text-neutral-300 hover:text-[#111827] dark:hover:text-white shadow-xs'
          }`}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 sm:w-4.5 sm:h-4.5 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Overlay (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 min-h-[48px] py-2.5 px-3 bg-white/90 dark:bg-[#262626]/90 hover:bg-white dark:hover:bg-[#303030] backdrop-blur-md text-[#111827] dark:text-white text-xs font-bold rounded-full shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-4 h-4" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`min-h-[48px] py-2.5 px-4 text-xs font-bold rounded-full shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#2563EB] hover:bg-blue-700 text-white'
            }`}
          >
            {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
            <span>{addedAnimation ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Color Swatches - Desktop & Tablet */}
          {product.colors && product.colors.length > 0 && (
            <div className="hidden sm:flex items-center gap-1 mb-2 -ml-1">
              {product.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col.name);
                  }}
                  className="min-w-[32px] min-h-[32px] sm:min-w-[36px] sm:min-h-[36px] flex items-center justify-center rounded-full cursor-pointer transition-transform active:scale-95"
                  aria-label={`Select color ${col.name}`}
                  title={col.name}
                >
                  <span
                    className={`w-4 h-4 rounded-full border transition-all ${
                      selectedColor === col.name
                        ? 'ring-2 ring-[#2563EB] ring-offset-1 dark:ring-offset-[#181818] border-transparent scale-110'
                        : 'border-gray-300 dark:border-neutral-600 opacity-80 hover:opacity-100'
                    }`}
                    style={{ backgroundColor: col.hex }}
                  />
                </button>
              ))}
              <span className="text-[11px] text-[#6B7280] dark:text-neutral-400 font-medium ml-1">
                {product.colors.length} color{product.colors.length > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Title - Clamped cleanly to 2 lines on mobile with uniform min-height */}
          <h3
            onClick={() => navigateToProduct(product)}
            className="text-xs sm:text-base font-bold text-[#111827] dark:text-neutral-100 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors line-clamp-2 min-h-[2.2rem] sm:min-h-0 cursor-pointer leading-snug"
          >
            {product.name}
          </h3>

          <p className="hidden sm:block text-xs text-[#6B7280] dark:text-neutral-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 sm:gap-1.5 mt-1.5 sm:mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
            </div>
            <span className="text-[11px] sm:text-xs font-bold text-[#111827] dark:text-neutral-200">{product.rating}</span>
            <span className="text-[10px] sm:text-xs text-[#6B7280] dark:text-neutral-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-2 sm:pt-3 mt-2 sm:mt-3 border-t border-gray-100 dark:border-neutral-800 flex items-center justify-between gap-1">
          <div className="min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-1.5">
              <span className="text-sm sm:text-lg font-extrabold text-[#111827] dark:text-white truncate">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-[10px] sm:text-xs text-[#6B7280] dark:text-neutral-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Mobile & Desktop Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`min-w-[38px] min-h-[38px] sm:min-w-[48px] sm:min-h-[48px] flex items-center justify-center p-2 sm:p-3 rounded-full text-xs font-medium transition-all cursor-pointer active:scale-95 shrink-0 ${
              addedAnimation
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-gray-100 dark:bg-[#262626] hover:bg-[#2563EB] dark:hover:bg-[#2563EB] hover:text-white text-[#111827] dark:text-neutral-200 shadow-2xs'
            }`}
            title="Quick Add to Bag"
            aria-label="Quick Add to Bag"
          >
            {addedAnimation ? (
              <Check className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            ) : (
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
