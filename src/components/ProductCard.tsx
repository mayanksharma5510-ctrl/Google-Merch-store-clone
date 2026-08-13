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
      className="group relative bg-white dark:bg-gray-900 rounded-[28px] border border-gray-100 dark:border-gray-800 shadow-xs hover:shadow-md hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300 flex flex-col overflow-hidden"
    >
      {/* Top Image Container */}
      <div 
        onClick={() => navigateToProduct(product)}
        className="relative aspect-4/3 w-full bg-gray-100 dark:bg-gray-800 overflow-hidden cursor-pointer"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Red Discount Tag */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="px-2.5 py-0.5 bg-red-600 text-white text-[10px] font-black uppercase tracking-wider rounded-full shadow-xs">
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
          className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
            inWishlist
              ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 shadow-sm scale-105'
              : 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-md text-[#6B7280] dark:text-gray-300 hover:text-[#111827] dark:hover:text-white shadow-xs'
          }`}
          aria-label={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Hover Quick Action Overlay (Desktop) */}
        <div className="absolute inset-x-3 bottom-3 z-10 hidden sm:flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              openQuickView(product);
            }}
            className="flex-1 py-2 px-3 bg-white/90 dark:bg-gray-800/90 hover:bg-white dark:hover:bg-gray-700 backdrop-blur-md text-[#111827] dark:text-white text-xs font-bold rounded-full shadow-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
          
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`py-2 px-4 text-xs font-bold rounded-full shadow-sm flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-[#2563EB] hover:bg-blue-700 text-white'
            }`}
          >
            {addedAnimation ? <Check className="w-3.5 h-3.5" /> : <ShoppingBag className="w-3.5 h-3.5" />}
            <span>{addedAnimation ? 'Added' : 'Add'}</span>
          </button>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mb-2">
              {product.colors.map((col) => (
                <button
                  key={col.name}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedColor(col.name);
                  }}
                  className={`w-3.5 h-3.5 rounded-full border transition-all ${
                    selectedColor === col.name
                      ? 'ring-2 ring-[#2563EB] ring-offset-1 border-gray-400 scale-110'
                      : 'border-gray-300 dark:border-gray-600 opacity-80 hover:opacity-100'
                  }`}
                  style={{ backgroundColor: col.hex }}
                  title={col.name}
                />
              ))}
              <span className="text-[11px] text-[#6B7280] dark:text-gray-400 font-medium ml-1">
                {product.colors.length} color{product.colors.length > 1 ? 's' : ''}
              </span>
            </div>
          )}

          {/* Title */}
          <h3
            onClick={() => navigateToProduct(product)}
            className="text-sm sm:text-base font-bold text-[#111827] dark:text-gray-100 group-hover:text-[#2563EB] dark:group-hover:text-blue-400 transition-colors line-clamp-1 cursor-pointer"
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#6B7280] dark:text-gray-400 line-clamp-1 mt-0.5">
            {product.subtitle}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-2">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-[#111827] dark:text-gray-200">{product.rating}</span>
            <span className="text-xs text-[#6B7280] dark:text-gray-400">({product.reviewCount})</span>
          </div>
        </div>

        {/* Price & Action Footer */}
        <div className="pt-3 mt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-extrabold text-[#111827] dark:text-white">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#6B7280] dark:text-gray-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </div>

          {/* Mobile Quick Add Button */}
          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`p-2.5 rounded-full text-xs font-medium transition-all ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-100 dark:bg-gray-800 hover:bg-[#2563EB] dark:hover:bg-[#2563EB] hover:text-white text-[#111827] dark:text-gray-200'
            }`}
            title="Quick Add to Cart"
          >
            {addedAnimation ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </motion.div>
  );
};
