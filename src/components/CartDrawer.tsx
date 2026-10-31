/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem } from '../types/index.ts';
import { X, Trash2, ArrowLeft, ShoppingBag, ShieldCheck, Tag } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  discount: number;
  onApplyPromo: (code: string) => boolean;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discount,
  onApplyPromo
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  if (!isOpen) return null;

  const formatToman = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
  };

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * discount);
  const freeShippingThreshold = 1500000;
  const isFreeShipping = rawSubtotal >= freeShippingThreshold;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 55000;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const ok = onApplyPromo(promoInput.trim().toUpperCase());
    if (ok) {
      setPromoSuccess('کد تخفیف با موفقیت اعمال شد!');
      setPromoError('');
    } else {
      setPromoError('کد تخفیف نامعتبر یا منقضی شده است (کد تستی: DOWRI)');
      setPromoSuccess('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 left-0 max-w-full flex">
        <div className="w-screen max-w-md bg-[#FAF8F5] shadow-2xl flex flex-col border-r border-black/10">
          
          {/* Drawer Header */}
          <div className="px-6 py-5 border-b border-black/[0.06] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#0055FF]" />
              <h3 className="text-base font-bold text-slate-900">
                سبد خرید دست‌سازه‌ها
              </h3>
              <span className="text-xs text-slate-500 font-normal">
                ({items.reduce((sum, item) => sum + item.quantity, 0)} مورد)
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
              aria-label="بستن سبد"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          {items.length > 0 && (
            <div className="bg-[#E8EAF8] px-6 py-3 border-b border-[#0055FF]/10 text-xs text-slate-700">
              <div className="flex items-center justify-between font-medium mb-1.5">
                <span>
                  {isFreeShipping
                    ? 'تبریک! ارسال برای سفارش شما رایگان است.'
                    : `برای ارسال رایگان، ${formatToman(freeShippingThreshold - rawSubtotal)} دیگر خرید کنید.`}
                </span>
                <span className="text-[#0055FF] font-bold tabular-nums">
                  {Math.min(100, Math.round((rawSubtotal / freeShippingThreshold) * 100))}%
                </span>
              </div>
              <div className="w-full bg-white/70 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0055FF] h-full rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(100, (rawSubtotal / freeShippingThreshold) * 100)}%` }}
                />
              </div>
            </div>
          )}

          {/* Itemized Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <p className="text-base font-bold text-slate-800">سبد خرید شما خالی است</p>
                  <p className="text-xs text-slate-500 max-w-xs">
                    از بین دست‌سازه‌های آتلیه و محصولات کافه دوری قطعه مورد علاقه‌تان را انتخاب کنید.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-5 py-2.5 bg-[#0055FF] hover:bg-[#0033CC] text-white text-xs font-semibold rounded-xl transition-all cursor-pointer"
                >
                  دیدن محصولات فروشگاه
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3.5 bg-white rounded-2xl border border-black/[0.04] shadow-xs"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.titleFa}
                    className="w-20 h-20 rounded-xl object-cover bg-slate-100 shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-bold text-slate-900 line-clamp-1">
                          {item.product.titleFa}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-[#E31C23] p-1 transition-colors cursor-pointer"
                          aria-label="حذف اثر"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {item.product.categoryFa} · {item.product.artisan.nameFa}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer text-xs"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-bold text-slate-900 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          disabled={item.quantity >= item.product.stock}
                          className="px-2 py-0.5 text-slate-600 hover:bg-slate-200 disabled:opacity-30 transition-colors cursor-pointer text-xs"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-bold text-slate-900 tabular-nums">
                        {formatToman(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer with Calculation & Promo */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-black/[0.06] space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handlePromoSubmit} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="کد تخفیف (مثال: DOWRI)"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs placeholder:text-slate-400 focus:outline-hidden focus:border-[#0055FF] text-left uppercase"
                  />
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5 pointer-events-none" />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
                >
                  اعمال
                </button>
              </form>
              {promoSuccess && <p className="text-[11px] text-emerald-600 font-medium">{promoSuccess}</p>}
              {promoError && <p className="text-[11px] text-[#E31C23] font-medium">{promoError}</p>}

              {/* Price Calculation Breakdown */}
              <div className="space-y-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                <div className="flex justify-between">
                  <span>مجموع کالاها:</span>
                  <span className="font-medium text-slate-900 tabular-nums">{formatToman(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>تخفیف ویژه دوری:</span>
                    <span className="tabular-nums">- {formatToman(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>هزینه بسته‌بندی و ارسال:</span>
                  <span className="font-medium tabular-nums">
                    {isFreeShipping ? <span className="text-emerald-600 font-semibold">رایگان</span> : formatToman(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                  <span>مبلغ قابل پرداخت:</span>
                  <span className="text-[#0055FF] text-base tabular-nums">{formatToman(finalTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout CTA */}
              <button
                onClick={onProceedToCheckout}
                className="w-full py-3.5 bg-[#0055FF] hover:bg-[#0033CC] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg shadow-[#0055FF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>تکمیل سفارش و تسویه حساب</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-500">
                <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
                <span>پرداخت امن شتابی با درگاه معتبر بانکی و تضمین تحویل کالا</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
