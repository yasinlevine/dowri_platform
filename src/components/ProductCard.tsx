/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Product } from '../types/index.ts';
import { ShoppingBag, Check, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelect,
  onAddToCart
}) => {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1600);
  };

  // Helper to format Persian currency numbers
  const formatToman = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
  };

  return (
    <div
      onClick={() => onSelect(product)}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-black/[0.06] hover:border-black/[0.12] shadow-xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
    >
      {/* Product Image Stage (65%-70% visual prominence) */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F7F5F0]">
        <img
          src={product.images[0]}
          alt={product.titleFa}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Subtle Tag (max 1 tag, unboxed or minimal hairline) */}
        {product.isLimitedRun && (
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#0055FF] shadow-xs border border-black/[0.04]">
            تک‌نسخه کارگاهی
          </div>
        )}

        {/* Quick View Button on Hover */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/95 text-slate-800 text-xs font-semibold rounded-lg shadow-sm backdrop-blur-xs">
            <Eye className="w-3.5 h-3.5 text-[#0055FF]" />
            <span>مشاهده جزئیات</span>
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-1 p-5 justify-between space-y-4">
        
        {/* Unboxed Metadata & Category */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
            <span>{product.categoryFa}</span>
            <span aria-hidden="true">·</span>
            <span className="text-slate-400">{product.artisan.nameFa}</span>
          </div>

          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0055FF] transition-colors line-clamp-1">
            {product.titleFa}
          </h3>

          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {product.subtitleFa}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            {product.originalPrice && (
              <span className="text-xs text-slate-400 line-through tabular-nums">
                {formatToman(product.originalPrice)}
              </span>
            )}
            <span className="text-sm font-bold text-slate-900 tabular-nums">
              {formatToman(product.price)}
            </span>
          </div>

          {/* Quick Add to Cart Button */}
          <button
            onClick={handleAddClick}
            className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-[#0055FF] hover:bg-[#0033CC] text-white shadow-xs active:scale-95'
            }`}
            aria-label={`افزودن ${product.titleFa} به سبد خرید`}
          >
            {isAdded ? (
              <>
                <Check className="w-4 h-4" />
                <span>افزوده شد</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-4 h-4" />
                <span>افزودن</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
