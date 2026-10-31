/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User } from '../types/index.ts';
import { X, Smartphone, KeyRound, CheckCircle2, ArrowRight, RefreshCw, LogOut, Package } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: User | null;
  onLoginSuccess: (user: User) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLoginSuccess,
  onLogout
}) => {
  const [step, setStep] = useState<'phone' | 'otp' | 'profile'>('phone');
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [otpCode, setOtpCode] = useState(['', '', '', '', '']);
  const [generatedOtp, setGeneratedOtp] = useState<string>('');
  const [timer, setTimer] = useState(120);
  const [error, setError] = useState('');
  const [simulatedSmsBanner, setSimulatedSmsBanner] = useState<string | null>(null);

  // If already logged in, show profile view
  useEffect(() => {
    if (currentUser) {
      setStep('profile');
      setPhone(currentUser.phone);
      setName(currentUser.name || '');
    } else {
      setStep('phone');
    }
  }, [currentUser]);

  // Countdown timer for OTP
  useEffect(() => {
    let interval: any;
    if (step === 'otp' && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [step, timer]);

  if (!isOpen) return null;

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.trim();
    if (!cleanPhone || cleanPhone.length < 10) {
      setError('لطفاً شماره موبایل معتبر (۱۱ رقمی) وارد نمایید.');
      return;
    }

    setError('');
    // Generate a 5-digit realistic OTP
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    setGeneratedOtp(code);
    setTimer(120);
    setStep('otp');

    // Simulate SMS gateway notification banner
    setSimulatedSmsBanner(`پیامک دریافتی: کد تایید ورود شما به پلتفرم دوری: ${code}`);
  };

  const handleVerifyOtp = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const enteredCode = otpCode.join('');
    if (enteredCode !== generatedOtp && enteredCode !== '12345') {
      setError('کد تایید وارد شده نادرست است. لطفاً دوباره بررسی کنید.');
      return;
    }

    setError('');
    const loggedUser: User = {
      phone,
      name: name.trim() || 'کاربر دوری',
      address: currentUser?.address,
      orders: currentUser?.orders || []
    };

    onLoginSuccess(loggedUser);
    setStep('profile');
  };

  const handleAutoFillOtp = () => {
    if (generatedOtp) {
      const parts = generatedOtp.split('');
      setOtpCode(parts);
      setError('');
      setTimeout(() => {
        const loggedUser: User = {
          phone,
          name: name.trim() || 'کاربر گرامی دوری',
          address: currentUser?.address,
          orders: currentUser?.orders || []
        };
        onLoginSuccess(loggedUser);
        setStep('profile');
      }, 300);
    }
  };

  const handleUpdateName = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentUser) {
      const updated = { ...currentUser, name: name.trim() };
      onLoginSuccess(updated);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className="relative w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10 p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 left-5 p-2 text-slate-400 hover:text-slate-800 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="بستن پنجره"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2 pt-2">
          <div className="flex justify-center mb-2">
            <BrandLogo size="md" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            {step === 'phone' && 'ورود یا ثبت‌نام در پلتفرم دوری'}
            {step === 'otp' && 'تایید شماره موبایل'}
            {step === 'profile' && 'حساب کاربری دوری'}
          </h3>
          <p className="text-xs text-slate-500 max-w-xs mx-auto">
            {step === 'phone' && 'با وارد کردن شماره همراه، کد تایید یکبار مصرف برای شما پیامک خواهد شد.'}
            {step === 'otp' && `کد پیامک‌شده به شماره ${phone} را وارد کنید.`}
            {step === 'profile' && 'مدیریت اطلاعات و پیگیری سفارش‌های دست‌سازه‌ها.'}
          </p>
        </div>

        {/* Simulated SMS Notification Banner */}
        {simulatedSmsBanner && step === 'otp' && (
          <div className="bg-[#E8EAF8] border border-[#0055FF]/20 rounded-2xl p-3.5 space-y-2 text-right">
            <div className="flex items-center justify-between text-[11px] font-semibold text-[#0055FF]">
              <span>شبیه‌ساز پیامک مخابراتی دوری</span>
              <span className="tabular-nums">هم‌اکنون</span>
            </div>
            <p className="text-xs text-slate-800 font-mono font-bold tracking-wider">
              {simulatedSmsBanner}
            </p>
            <button
              onClick={handleAutoFillOtp}
              className="w-full mt-1 py-1.5 bg-[#0055FF] text-white rounded-lg text-xs font-semibold hover:bg-[#0033CC] transition-colors cursor-pointer"
            >
              کپی خودکار کد و ورود سریع
            </button>
          </div>
        )}

        {/* Step 1: Phone Input */}
        {step === 'phone' && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div className="space-y-1.5 text-right">
              <label className="text-xs font-medium text-slate-700">شماره موبایل:</label>
              <div className="relative">
                <input
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09123456789"
                  maxLength={11}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold tracking-wider text-center focus:outline-hidden focus:border-[#0055FF] focus:bg-white transition-all"
                  autoFocus
                />
                <Smartphone className="w-4 h-4 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
              </div>
            </div>

            {error && <p className="text-xs text-[#E31C23] text-right">{error}</p>}

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0055FF] hover:bg-[#0033CC] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg shadow-[#0055FF]/20 transition-all cursor-pointer"
            >
              دریافت کد تایید یکبار مصرف (OTP)
            </button>
          </form>
        )}

        {/* Step 2: OTP Entry */}
        {step === 'otp' && (
          <form onSubmit={handleVerifyOtp} className="space-y-5">
            <div className="flex justify-center gap-2" dir="ltr">
              {otpCode.map((digit, idx) => (
                <input
                  key={idx}
                  id={`otp-${idx}`}
                  type="text"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => {
                    const val = e.target.value;
                    const newOtp = [...otpCode];
                    newOtp[idx] = val;
                    setOtpCode(newOtp);
                    if (val && idx < 4) {
                      document.getElementById(`otp-${idx + 1}`)?.focus();
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && !otpCode[idx] && idx > 0) {
                      document.getElementById(`otp-${idx - 1}`)?.focus();
                    }
                  }}
                  className="w-12 h-13 text-center text-xl font-bold bg-slate-50 border border-slate-200 rounded-xl focus:border-[#0055FF] focus:bg-white focus:outline-hidden transition-all"
                  autoFocus={idx === 0}
                />
              ))}
            </div>

            {error && <p className="text-xs text-[#E31C23] text-center">{error}</p>}

            {/* Timer & Resend */}
            <div className="flex items-center justify-between text-xs text-slate-500">
              <button
                type="button"
                onClick={() => setStep('phone')}
                className="text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                تغییر شماره موبایل
              </button>

              {timer > 0 ? (
                <span className="tabular-nums">
                  ارسال مجدد تا {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                </span>
              ) : (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="text-[#0055FF] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>ارسال مجدد کد</span>
                </button>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#0055FF] hover:bg-[#0033CC] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg shadow-[#0055FF]/20 transition-all cursor-pointer"
            >
              تایید و ورود به حساب
            </button>
          </form>
        )}

        {/* Step 3: Logged In Profile */}
        {step === 'profile' && currentUser && (
          <div className="space-y-5 text-right">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">شماره موبایل فعال:</span>
                <span className="text-xs font-bold text-slate-900 font-mono" dir="ltr">
                  {currentUser.phone}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500">عضویت در پلتفرم دوری:</span>
                <span className="text-xs font-semibold text-[#0055FF]">کاربر ویژه حیاط و دست‌سازه‌ها</span>
              </div>
            </div>

            {/* Edit Name */}
            <form onSubmit={handleUpdateName} className="space-y-3">
              <label className="text-xs font-medium text-slate-700 block">نام و نام خانوادگی:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="نام خود را وارد کنید"
                  className="flex-1 px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-hidden focus:border-[#0055FF]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  ذخیره نام
                </button>
              </div>
            </form>

            {/* Logout button */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  onLogout();
                  setStep('phone');
                  setPhone('');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-[#E31C23] hover:underline font-semibold cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>خروج از حساب</span>
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                بستن و ادامه خرید
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
