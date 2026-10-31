/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { MapPin, Phone, Mail, Instagram, ArrowLeft, Heart, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setNewsletterEmail('');
    }
  };

  return (
    <footer className="bg-[#171923] text-white pt-16 pb-12 border-t border-black/10">
      
      {/* Brand Story Section before links */}
      <div id="story-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-white/10 scroll-mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3 text-right">
            <span className="text-xs font-semibold text-[#C5C8F0] tracking-wider uppercase">
              مانیفست پلتفرم دوری (درباره ما)
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">
              هنر معاصر، لمس خاک و زندگی در جریان حیاط
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal max-w-3xl">
              دوری پاسخی به میل بازگشت به اشیای بااصالت، فضاهای گرم و پیوندهای انسانی در عصر دیجیتال است. ما فضایی خلق کردیم که در آن طراحی خوب، صدای چرخ سفالگری، قهوه تازه و گفتگو پیرامون میزهای نارنجی در یک هماهنگی پویا کنار هم قرار می‌گیرند. هر سفارشی که در این پلتفرم ثبت می‌کنید، مستقیماً از کارگاه و دستان هنرمندان مستقل دوری به خانه شما راه می‌یابد.
            </p>
          </div>

          <div className="lg:col-span-4 bg-white/5 rounded-2xl p-6 border border-white/10 text-right space-y-3">
            <h4 className="text-xs font-bold text-white flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#0055FF]" />
              <span>بازدید حضوری از حیاط و کافه دوری</span>
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              تهران، خیابان کریمخان، کوچه ماهشهر، پلاک ۱۲ (حیاط فرهنگی و کافه دوری)
            </p>
            <div className="text-[11px] text-slate-400 space-y-1 pt-1">
              <p>ساعت کاری کافه: همه‌روزه ۹:۰۰ تا ۲۳:۰۰</p>
              <p>کارگاه و شو روم: سه‌شنبه تا جمعه ۱۲:۰۰ تا ۲۱:۰۰</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          
          {/* Col 1: Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4 text-right">
            <div className="inline-block">
              <BrandLogo size="md" variant="white" />
            </div>
            
            <p className="text-xs text-slate-300 leading-relaxed font-normal max-w-sm">
              پلتفرم دوری؛ هاب خلاق، کافه حیاط، آتلیه سرامیک و فروشگاه اختصاصی دست‌سازه‌های معاصر.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs text-slate-400">
              <a href="tel:02188990011" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Phone className="w-3.5 h-3.5 text-[#0055FF]" />
                <span dir="ltr">۰۲۱-۸۸۹۹۰۰۱۱</span>
              </a>
              <span aria-hidden="true">·</span>
              <a href="mailto:info@dowri.space" className="hover:text-white flex items-center gap-1.5 transition-colors">
                <Mail className="w-3.5 h-3.5 text-[#E31C23]" />
                <span>info@dowri.space</span>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3 text-right">
            <h4 className="text-xs font-bold text-white tracking-wider">
              دسترسی سریع
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#shop-section" className="hover:text-[#C5C8F0] transition-colors">دست‌سازه‌های سرامیکی</a>
              </li>
              <li>
                <a href="#shop-section" className="hover:text-[#C5C8F0] transition-colors">زیورآلات معاصر نقره</a>
              </li>
              <li>
                <a href="#shop-section" className="hover:text-[#C5C8F0] transition-colors">آرت پرینت و استیکرها</a>
              </li>
              <li>
                <a href="#workshops-section" className="hover:text-[#C5C8F0] transition-colors">تقویم کارگاه‌های آخر هفته</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Newsletter for Limited Drops (4 cols) */}
          <div className="md:col-span-4 space-y-3 text-right">
            <h4 className="text-xs font-bold text-white tracking-wider">
              خبرنامه دراپ‌های اختصاصی
            </h4>
            <p className="text-xs text-slate-400 font-normal leading-relaxed">
              برای اطلاع از ارائه تک‌نسخه‌های سرامیک، ثبت‌نام ورکشاپ‌ها و دراپ‌های جدید ایمیل خود را ثبت کنید.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2 pt-1">
              <input
                type="email"
                dir="ltr"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="flex-1 px-3.5 py-2.5 bg-white/10 border border-white/10 rounded-xl text-xs placeholder:text-slate-500 focus:outline-hidden focus:border-[#0055FF] text-left text-white"
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-[#0055FF] hover:bg-[#0033CC] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer whitespace-nowrap"
              >
                ثبت‌نام
              </button>
            </form>

            {subscribed && (
              <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>ایمیل شما با موفقیت ثبت شد.</span>
              </p>
            )}
          </div>

        </div>

        {/* Quiet Sub-Footer */}
        <div className="mt-12 pt-6 border-t border-white/10 flex items-center justify-between text-xs text-slate-500">
          <p>© {new Date().getFullYear()} پلتفرم دوری (Dowri Platform). کلیه حقوق محفوظ است.</p>
        </div>

      </div>

    </footer>
  );
};
