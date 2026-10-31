/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CartItem, User, Order, UserAddress } from '../types/index.ts';
import { X, CheckCircle, ShieldCheck, CreditCard, Truck, MapPin, ArrowLeft, ArrowRight, Printer, Share2 } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currentUser: User | null;
  discount: number;
  onOrderSuccess: (order: Order) => void;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currentUser,
  discount,
  onOrderSuccess,
  onClearCart
}) => {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [address, setAddress] = useState<UserAddress>({
    fullName: currentUser?.name || '',
    phone: currentUser?.phone || '',
    province: 'تهران',
    city: 'تهران',
    streetAddress: currentUser?.address?.streetAddress || '',
    postalCode: currentUser?.address?.postalCode || '',
    notes: ''
  });

  const [paymentMethod, setPaymentMethod] = useState<'online' | 'cod' | 'card_transfer'>('online');
  const [isProcessing, setIsProcessing] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const formatToman = (num: number) => {
    return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
  };

  const rawSubtotal = items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const discountAmount = Math.round(rawSubtotal * discount);
  const isFreeShipping = rawSubtotal >= 1500000;
  const shippingFee = items.length === 0 ? 0 : isFreeShipping ? 0 : 55000;
  const finalTotal = Math.max(0, rawSubtotal - discountAmount + shippingFee);

  const validateAddress = () => {
    const errs: Record<string, string> = {};
    if (!address.fullName.trim()) errs.fullName = 'لطفاً نام و نام خانوادگی را وارد نمایید.';
    if (!address.phone.trim() || address.phone.length < 10) errs.phone = 'لطفاً شماره تماس معتبر وارد کنید.';
    if (!address.streetAddress.trim() || address.streetAddress.length < 10) errs.streetAddress = 'لطفاً آدرس دقیق پستی را بنویسید.';
    if (!address.postalCode.trim() || address.postalCode.length < 5) errs.postalCode = 'کد پستی الزامی است.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateAddress()) {
      setStep('payment');
    }
  };

  const handleCompleteOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const newOrder: Order = {
        id: `ord_${Date.now()}`,
        orderNumber: `DOWRI-${Math.floor(1000 + Math.random() * 9000)}`,
        date: new Intl.DateTimeFormat('fa-IR', { dateStyle: 'long', timeStyle: 'short' }).format(new Date()),
        items: [...items],
        totalAmount: rawSubtotal,
        discount: discountAmount,
        shippingFee,
        finalAmount: finalTotal,
        address,
        paymentMethod,
        status: 'confirmed'
      };

      setPlacedOrder(newOrder);
      onOrderSuccess(newOrder);
      onClearCart();
      setStep('success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 my-8 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-black/[0.06] bg-[#FAF8F5] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BrandLogo size="sm" />
            <h3 className="text-base font-bold text-slate-900">
              {step === 'address' && 'مرحله ۱ از ۲: اطلاعات ارسال سفارش'}
              {step === 'payment' && 'مرحله ۲ از ۲: انتخاب شیوه پرداخت'}
              {step === 'success' && 'سفارش شما با موفقیت ثبت شد'}
            </h3>
          </div>

          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-200/50 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        <div className="p-6 sm:p-8">
          
          {/* Step 1: Delivery Address Form */}
          {step === 'address' && (
            <form onSubmit={handleProceedToPayment} className="space-y-5 text-right">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">نام و نام خانوادگی تحویل‌گیرنده *</label>
                  <input
                    type="text"
                    value={address.fullName}
                    onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                    placeholder="مثال: سهراب حسینی"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF] focus:bg-white"
                  />
                  {errors.fullName && <p className="text-[11px] text-[#E31C23]">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">شماره موبایل جهت هماهنگی *</label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={address.phone}
                    onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                    placeholder="09123456789"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF] focus:bg-white text-right"
                  />
                  {errors.phone && <p className="text-[11px] text-[#E31C23]">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">استان</label>
                  <select
                    value={address.province}
                    onChange={(e) => setAddress({ ...address, province: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF] focus:bg-white cursor-pointer"
                  >
                    <option value="تهران">تهران</option>
                    <option value="اصفهان">اصفهان</option>
                    <option value="فارس">فارس (شیراز)</option>
                    <option value="خراسان رضوی">خراسان رضوی (مشهد)</option>
                    <option value="البرز">البرز (کرج)</option>
                    <option value="سایر استان‌ها">سایر استان‌ها</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">شهرستان / منطقه</label>
                  <input
                    type="text"
                    value={address.city}
                    onChange={(e) => setAddress({ ...address, city: e.target.value })}
                    placeholder="مثال: تهران - منطقه ۶"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF] focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">نشانی پستی دقیق (خیابان، کوچه، پلاک، واحد) *</label>
                <textarea
                  rows={2}
                  value={address.streetAddress}
                  onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
                  placeholder="آدرس دقیق جهت تحویل بسته ایمن دست‌سازه‌ها"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF] focus:bg-white leading-relaxed"
                />
                {errors.streetAddress && <p className="text-[11px] text-[#E31C23]">{errors.streetAddress}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">کد پستی ۱۰ رقمی *</label>
                  <input
                    type="text"
                    dir="ltr"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    placeholder="1234567890"
                    maxLength={10}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF] focus:bg-white text-right"
                  />
                  {errors.postalCode && <p className="text-[11px] text-[#E31C23]">{errors.postalCode}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700">توضیحات تحویل (اختیاری)</label>
                  <input
                    type="text"
                    value={address.notes || ''}
                    onChange={(e) => setAddress({ ...address, notes: e.target.value })}
                    placeholder="مثال: زنگ طبقه سوم، تحویل در ساعات بعدازظهر"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF] focus:bg-white"
                  />
                </div>
              </div>

              {/* Order Mini-Recap */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                <div>
                  <span className="font-semibold text-slate-800">مجموع قابل پرداخت:</span>
                  <span className="text-slate-500 mr-2">({items.length} کالا)</span>
                </div>
                <span className="text-sm font-bold text-[#0055FF] tabular-nums">
                  {formatToman(finalTotal)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#0055FF] hover:bg-[#0033CC] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg shadow-[#0055FF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>ادامه به انتخاب شیوه پرداخت</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* Step 2: Payment Method Choice */}
          {step === 'payment' && (
            <div className="space-y-6 text-right">
              <div className="space-y-3">
                <label className="text-xs font-semibold text-slate-700 block">روش پرداخت را انتخاب نمایید:</label>

                {/* Option 1: Online Shitab Gateway */}
                <div
                  onClick={() => setPaymentMethod('online')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'online'
                      ? 'border-[#0055FF] bg-[#0055FF]/5 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0055FF]/10 text-[#0055FF] flex items-center justify-center">
                      <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">پرداخت اینترنتی امن (شتابی)</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">اتصال مستقیم به کلیه کارت‌های عضو شبکه شتاب</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'online'}
                    onChange={() => setPaymentMethod('online')}
                    className="accent-[#0055FF] w-4 h-4 cursor-pointer"
                  />
                </div>

                {/* Option 2: Cash / Card on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'cod'
                      ? 'border-[#0055FF] bg-[#0055FF]/5 shadow-xs'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FF6200]/10 text-[#FF6200] flex items-center justify-center">
                      <Truck className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">پرداخت در محل (تهران)</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">تسویه نقدی یا با کارتخوان هنگام دریافت بسته</p>
                    </div>
                  </div>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === 'cod'}
                    onChange={() => setPaymentMethod('cod')}
                    className="accent-[#0055FF] w-4 h-4 cursor-pointer"
                  />
                </div>
              </div>

              {/* Order Summary & Final Total */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>مجموع ارزش دست‌سازه‌ها:</span>
                  <span className="font-semibold text-slate-900 tabular-nums">{formatToman(rawSubtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>تخفیف پلتفرم دوری:</span>
                    <span className="tabular-nums">- {formatToman(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>هزینه بسته‌بندی ایمن و ارسال:</span>
                  <span className="font-semibold tabular-nums">
                    {isFreeShipping ? <span className="text-emerald-600">رایگان</span> : formatToman(shippingFee)}
                  </span>
                </div>
                <div className="flex justify-between pt-2 border-t border-slate-200 text-sm font-bold text-slate-900">
                  <span>مبلغ نهایی قابل پرداخت:</span>
                  <span className="text-[#0055FF] text-base tabular-nums">{formatToman(finalTotal)}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep('address')}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  بازگشت
                </button>

                <button
                  type="button"
                  onClick={handleCompleteOrder}
                  disabled={isProcessing}
                  className="flex-1 py-3.5 bg-[#0055FF] hover:bg-[#0033CC] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg shadow-[#0055FF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isProcessing ? (
                    <span>در حال برقراری ارتباط با سامانه پرداخت...</span>
                  ) : (
                    <>
                      <span>ثبت نهایی و پرداخت {formatToman(finalTotal)}</span>
                      <ShieldCheck className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Success Confirmation Receipt */}
          {step === 'success' && placedOrder && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl font-extrabold text-slate-900">
                  سفارش شما با موفقیت ثبت شد
                </h3>
                <p className="text-xs text-slate-500">
                  پیامک تایید سفارش و کد رهگیری به شماره {placedOrder.address.phone} ارسال شد.
                </p>
              </div>

              {/* Receipt Box */}
              <div className="bg-[#FAF8F5] rounded-2xl p-5 border border-black/[0.06] text-right space-y-3 text-xs">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500">شماره پیگیری سفارش:</span>
                  <span className="font-bold text-[#0055FF] font-mono text-sm">{placedOrder.orderNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">تاریخ و زمان ثبت:</span>
                  <span className="font-medium text-slate-800">{placedOrder.date}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">تحویل‌گیرنده:</span>
                  <span className="font-medium text-slate-800">{placedOrder.address.fullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">آدرس مقصد:</span>
                  <span className="font-medium text-slate-800 max-w-xs truncate">{placedOrder.address.city}، {placedOrder.address.streetAddress}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">مبلغ پرداخت شده:</span>
                  <span className="font-bold text-slate-900 tabular-nums">{formatToman(placedOrder.finalAmount)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>چاپ فاکتور رسمی</span>
                </button>

                <button
                  onClick={onClose}
                  className="flex-1 py-3 px-4 bg-[#0055FF] hover:bg-[#0033CC] text-white rounded-xl text-xs font-bold transition-all cursor-pointer shadow-xs"
                >
                  بازگشت به صفحه اصلی
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
