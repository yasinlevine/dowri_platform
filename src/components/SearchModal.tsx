/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { Search, X, ArrowLeft, Tag } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSetSearchQuery: (query: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSetSearchQuery
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const formatToman = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
  };

  const results = products.filter((p) => {
    if (!query.trim()) return false;
    const q = query.trim().toLowerCase();
    return (
      p.titleFa.toLowerCase().includes(q) ||
      p.subtitleFa.toLowerCase().includes(q) ||
      p.descriptionFa.toLowerCase().includes(q) ||
      p.categoryFa.toLowerCase().includes(q) ||
      p.artisan.nameFa.toLowerCase().includes(q)
    );
  });

  const popularSearches = ['ماگ سرامیکی', 'گردنبند نقره', 'پوستر سیلک', 'استیکر', 'قهوه حیاط', 'لعاب آبی'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 transition-all text-right"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-black/[0.06] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#0055FF] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="جستجو در دست‌سازه‌ها، آثار، سرامیک یا نام هنرمند..."
            className="flex-1 bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-hidden"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-700 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold text-slate-500 hover:text-slate-900 px-2.5 py-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
          >
            انصراف
          </button>
        </div>

        {/* Quick Tag Suggestions */}
        {!query && (
          <div className="p-6 space-y-4">
            <span className="text-xs font-bold text-slate-500 block">جستجوهای پرطرفدار:</span>
            <div className="flex flex-wrap gap-2">
              {popularSearches.map((tag) => (
                <button
                  key={tag}
                  onClick={() => setQuery(tag)}
                  className="px-3.5 py-1.5 bg-[#FAF8F5] hover:bg-[#E8EAF8] text-slate-700 hover:text-[#0055FF] text-xs font-medium rounded-xl border border-slate-200 transition-colors cursor-pointer"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Search Results List */}
        {query && (
          <div className="max-h-96 overflow-y-auto p-4 space-y-2">
            {results.length > 0 ? (
              results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-[#FAF8F5] transition-colors cursor-pointer border border-transparent hover:border-black/[0.04]"
                >
                  <img
                    src={product.images[0]}
                    alt={product.titleFa}
                    className="w-14 h-14 rounded-xl object-cover bg-slate-100 shrink-0"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <span>{product.categoryFa}</span>
                      <span aria-hidden="true">·</span>
                      <span>{product.artisan.nameFa}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                      {product.titleFa}
                    </h4>
                  </div>
                  <div className="text-left">
                    <span className="text-xs font-bold text-[#0055FF] tabular-nums">
                      {formatToman(product.price)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-xs text-slate-500">
                هیچ اثری مطابق با «{query}» پیدا نشد.
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
};
