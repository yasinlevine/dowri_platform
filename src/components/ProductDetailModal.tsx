/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product } from '../types/index.ts';
import { X, ShoppingBag, Check, ShieldCheck, Truck, Sparkles, User, Info } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onInstantBuy: (product: Product, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onInstantBuy
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [isAdded, setIsAdded] = useState<boolean>(false);

  useEffect(() => {
    if (product && product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
      setQuantity(1);
    }
  }, [product]);

  if (!product) return null;

  const formatToman = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
  };

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    onInstantBuy(product, quantity);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 z-20 p-2.5 bg-white/90 hover:bg-slate-100 rounded-full text-slate-700 transition-colors shadow-xs cursor-pointer"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          
          {/* Gallery Column (7 cols) */}
          <div className="md:col-span-6 bg-[#F7F5F0] p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-white shadow-xs border border-black/[0.04]">
              <img
                src={selectedImage}
                alt={product.titleFa}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
              {product.isLimitedRun && (
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-xs px-3 py-1 rounded-md text-xs font-semibold text-[#0055FF]">
                  تولید محدود کارگاه
                </div>
              )}
            </div>

            {/* Thumbnails if multiple */}
            {product.images.length > 1 && (
              <div className="flex items-center gap-3">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(img)}
                    className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      selectedImage === img ? 'border-[#0055FF] shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="نمای محصول" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Artisan Spotlight Card */}
            <div className="bg-white/90 backdrop-blur-xs rounded-xl p-4 border border-black/[0.04] space-y-2 text-right">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-800">
                <User className="w-3.5 h-3.5 text-[#0055FF]" />
                <span>سازنده اثر: {product.artisan.nameFa}</span>
                <span className="text-slate-400 font-normal">({product.artisan.roleFa})</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {product.artisan.bioFa}
              </p>
            </div>
          </div>

          {/* Contiguous Purchase Module Column (6 cols) */}
          <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div className="space-y-5 text-right">
              
              {/* Category & Tags */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <span className="text-[#0055FF] font-semibold">{product.categoryFa}</span>
                <span aria-hidden="true">·</span>
                <span>کد اثر: {product.id}</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-medium">موجود در آتلیه ({product.stock} عدد)</span>
              </div>

              {/* Title & Subtitle */}
              <div className="space-y-1">
                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                  {product.titleFa}
                </h2>
                <p className="text-xs text-slate-500 font-normal">
                  {product.title}
                </p>
              </div>

              {/* Pricing Display */}
              <div className="flex items-baseline gap-3">
                <span className="text-2xl font-extrabold text-[#0055FF] tabular-nums">
                  {formatToman(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through tabular-nums">
                    {formatToman(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Story & Description */}
              <div className="space-y-3 pt-2 text-sm leading-relaxed text-slate-700">
                <p>{product.descriptionFa}</p>
                <div className="p-3 bg-[#FAF8F5] rounded-xl text-xs text-slate-600 border border-black/[0.04]">
                  <span className="font-semibold text-slate-800 block mb-1">داستان ساخت:</span>
                  {product.storyFa}
                </div>
              </div>

              {/* Technical Specifications */}
              <div className="pt-2 space-y-2 text-xs text-slate-600 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">متریال و ساخت:</span>
                  <span className="font-medium text-slate-800">{product.materialsFa}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">ابعاد و مشخصات:</span>
                  <span className="font-medium text-slate-800">{product.dimensionsFa}</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600">
                  <Truck className="w-4 h-4 text-[#0055FF] shrink-0" />
                  <span>ارسال سریع و بسته‌بندی ایمن ضدضربه</span>
                </div>
                <div className="flex items-center gap-2 p-2.5 bg-slate-50 rounded-xl text-[11px] text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-[#E31C23] shrink-0" />
                  <span>تضمین اصالت اثر و ساخت دست</span>
                </div>
              </div>
            </div>

            {/* Quantity Stepper & Buy CTAs */}
            <div className="space-y-3 pt-4 border-t border-slate-100">
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs text-slate-600 font-medium">تعداد:</span>
                
                <div className="flex items-center border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                    className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-bold text-slate-900 tabular-nums">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    disabled={quantity >= product.stock}
                    className="px-3 py-1.5 text-slate-700 hover:bg-slate-200 disabled:opacity-30 transition-colors cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={handleAdd}
                  className={`w-full py-3.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isAdded
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white border-2 border-[#0055FF] text-[#0055FF] hover:bg-[#0055FF]/5'
                  }`}
                >
                  {isAdded ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>به سبد اضافه شد</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>افزودن به سبد</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleBuyNow}
                  className="w-full py-3.5 px-4 bg-[#0055FF] hover:bg-[#0033CC] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg shadow-[#0055FF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                >
                  <span>تسویه حساب سریع</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
