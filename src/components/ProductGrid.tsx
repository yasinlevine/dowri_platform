/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Product } from '../types/index.ts';
import { ProductCard } from './ProductCard.tsx';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  searchQuery: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onSelectProduct,
  onAddToCart,
  searchQuery
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const categories = [
    { id: 'all', label: 'همه دست‌سازه‌ها' },
    { id: 'ceramics', label: 'سرامیک و سفال' },
    { id: 'jewelry', label: 'زیورآلات معاصر' },
    { id: 'art', label: 'آرت پرینت و پوستر' },
    { id: 'lifestyle', label: 'اکسسوری و استیکر' },
    { id: 'cafe', label: 'محصولات کافه' },
  ];

  // Filtering & Sorting
  const filteredProducts = useMemo(() => {
    return products
      .filter((item) => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const query = searchQuery.trim().toLowerCase();
        const matchesSearch = !query || 
          item.titleFa.toLowerCase().includes(query) ||
          item.subtitleFa.toLowerCase().includes(query) ||
          item.descriptionFa.toLowerCase().includes(query) ||
          item.artisan.nameFa.toLowerCase().includes(query);
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <section id="shop-section" className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24">
      
      {/* Section Header with Human Editorial Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.06]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0055FF]">
            <span>فروشگاه پلتفرم دوری</span>
            <span aria-hidden="true">·</span>
            <span>طراحی مستقل و تولید محدود</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            مجموعه دست‌سازه‌های آتلیه و هنرمندان
          </h2>
          <p className="text-sm text-slate-600 max-w-xl">
            هر اثر در کارگاه‌های دوری با دست ساخته شده یا حاصل همکاری با دیزاینرهای مستقل شهری است.
          </p>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-xl border border-slate-200 text-xs text-slate-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            <span className="text-slate-500">مرتب‌سازی:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent font-medium text-slate-900 focus:outline-hidden cursor-pointer"
            >
              <option value="featured">برگزیده و محبوب‌ترین</option>
              <option value="price-asc">ارزان‌ترین به گران‌ترین</option>
              <option value="price-desc">گران‌ترین به ارزان‌ترین</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Segmented Controls (Functional buttons, clean styling) */}
      <div className="py-6 flex items-center gap-2 overflow-x-auto no-scrollbar">
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-medium rounded-xl whitespace-nowrap shrink-0 transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#0055FF] text-white shadow-xs font-semibold'
                  : 'bg-white text-slate-700 border border-slate-200/80 hover:border-slate-300 hover:text-slate-900'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Product Grid (3 cols desktop, 2 cols tablet, 1 col mobile) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onSelect={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 text-center space-y-3 bg-white rounded-2xl border border-slate-200/80 p-8">
          <p className="text-base font-semibold text-slate-800">
            محصولی با این مشخصات یافت نشد
          </p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            می‌توانید دسته‌بندی دیگری را انتخاب کنید یا عبارت جستجو را پاک نمایید.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
            }}
            className="inline-flex items-center gap-2 px-4 py-2 mt-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium rounded-lg transition-colors cursor-pointer"
          >
            نمایش همه محصولات
          </button>
        </div>
      )}

    </section>
  );
};
