/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Coffee, Flame, Users, Sparkles, MapPin, Clock, Calendar, ArrowLeft } from 'lucide-react';

export const CourtyardSpaceSection: React.FC = () => {
  const [activeSpot, setActiveSpot] = useState<number>(0);

  const spots = [
    {
      id: 'courtyard',
      titleFa: 'حیاط دوری و میزهای نارنجی',
      titleEn: 'The Courtyard & Orange Tables',
      descFa: 'قلب تپنده دوری؛ حیاطی با درختان کهنسال، میزهای نارنجی سرزنده و هوای تازه که محل دورهمی روزانه طراحان، معماران و عاشقان هنر است.',
      image: '/src/assets/images/dowri_courtyard_cafe_1793451781553.jpg',
      tag: 'فضای باز و کافه'
    },
    {
      id: 'ceramics',
      titleFa: 'آتلیه و کارگاه سفالگری',
      titleEn: 'Ceramics Atelier & Kiln',
      descFa: 'کارگاه تولیدی فعال در دل مجموعه که ظروف و دست‌سازه‌های اختصاصی دوری در آن با دست ساخته شده و آخر هفته‌ها میزبان علاقه‌مندان به چرخ‌کاری و لعاب است.',
      image: '/src/assets/images/dowri_ceramic_studio_1793451781336.jpg',
      tag: 'کارگاه زنده'
    },
    {
      id: 'art-shop',
      titleFa: 'فروشگاه آثار و پرینت‌ها با نئون قرمز',
      titleEn: 'Concept Store & Red Neon Space',
      descFa: 'فضای داخلی پر از گیاهان طبیعی مونسترا و سانسوریا با نور گرم نئون قرمز که مجموعه‌ای گلچین شده از آرت پرینت‌ها، استیکرها، زیورآلات و پوشیدنی‌های طراحان را نمایش می‌دهد.',
      image: '/src/assets/images/dowri_art_prints_lifestyle_1793451782166.jpg',
      tag: 'کانسپت استور'
    },
    {
      id: 'craft-jewelry',
      titleFa: 'میز طراحی و زیورآلات معاصر',
      titleEn: 'Contemporary Jewelry Studio',
      descFa: 'همنشینی نقره خالص با لعاب‌های رنگی، طراحی‌های هندسی و اکسسوری‌های مینیمال شهری که توسط طراحان جوان پلتفرم خلق می‌شوند.',
      image: '/src/assets/images/dowri_jewelry_artisan_1793451781849.jpg',
      tag: 'طراحی زیورآلات'
    }
  ];

  return (
    <section id="courtyard-section" className="py-16 lg:py-24 bg-[#F5F2EB]/60 border-y border-black/[0.04] scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2.5">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#E31C23]">
              <span className="w-2 h-2 rounded-full bg-[#E31C23]" />
              <span>هاب خلاق شهری</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>کافه، حیاط و استودیو</span>
            </div>
            
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              زندگی در حیاط دوری؛ فراتر از یک فروشگاه آنلاین
            </h2>

            <p className="text-sm sm:text-base text-slate-600 font-normal max-w-2xl leading-relaxed">
              دوری یک اکوسیستم زنده و آلترناتیو است؛ جایی برای نشستن پشت میزهای نارنجی، لمس رگه‌های خاک رس خیس در کارگاه، نوشیدن اسپرسو زیر سایه برگ‌ها و گفتگو درباره ایده‌های تازه.
            </p>
          </div>

          {/* Quick Space Spec Tags */}
          <div className="flex flex-wrap gap-2 text-xs text-slate-600 shrink-0">
            <div className="px-3 py-2 bg-white rounded-xl border border-black/[0.06] flex items-center gap-2 shadow-xs">
              <Clock className="w-4 h-4 text-[#0055FF]" />
              <span>همه‌روزه ۹:۰۰ الی ۲۳:۰۰</span>
            </div>
            <div className="px-3 py-2 bg-white rounded-xl border border-black/[0.06] flex items-center gap-2 shadow-xs">
              <MapPin className="w-4 h-4 text-[#E31C23]" />
              <span>تهران، حیاط فرهنگی دوری</span>
            </div>
          </div>
        </div>

        {/* Interactive Space Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Visual Display (7 cols) */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden shadow-xl border border-black/[0.08] bg-slate-950 aspect-[16/10] sm:aspect-[16/9] group">
              <img
                src={spots[activeSpot].image}
                alt={spots[activeSpot].titleFa}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              
              {/* Contrast Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />

              {/* Information Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 sm:p-8 text-white space-y-2">
                <div className="flex items-center gap-2 text-xs font-semibold text-[#C5C8F0]">
                  <span>{spots[activeSpot].tag}</span>
                  <span aria-hidden="true">·</span>
                  <span className="font-mono">{spots[activeSpot].titleEn}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
                  {spots[activeSpot].titleFa}
                </h3>
                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed max-w-xl">
                  {spots[activeSpot].descFa}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive Spot Selector List (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {spots.map((spot, idx) => {
              const isSelected = activeSpot === idx;
              return (
                <div
                  key={spot.id}
                  onClick={() => setActiveSpot(idx)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer text-right flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-white border-[#0055FF] shadow-md -translate-x-1'
                      : 'bg-white/70 hover:bg-white border-black/[0.04] hover:border-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-[11px] font-medium text-slate-500">
                      <span className={isSelected ? 'text-[#0055FF] font-bold' : ''}>بخش ۰{idx + 1}</span>
                      <span aria-hidden="true">·</span>
                      <span>{spot.tag}</span>
                    </div>
                    <h4 className={`text-sm font-bold ${isSelected ? 'text-[#0055FF]' : 'text-slate-900'}`}>
                      {spot.titleFa}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-1 font-normal">
                      {spot.descFa}
                    </p>
                  </div>

                  <div className={`w-3 h-3 rounded-full shrink-0 ${isSelected ? 'bg-[#0055FF]' : 'bg-slate-200'}`} />
                </div>
              );
            })}
          </div>

        </div>

        {/* Real Brand Atmosphere Details: Plants, Neon, Ceramics, Coffee */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 pt-6">
          <div className="p-5 bg-white rounded-2xl border border-black/[0.04] space-y-2 text-right shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#FF6200]/10 text-[#FF6200] flex items-center justify-center font-bold">
              🍊
            </div>
            <h4 className="text-sm font-bold text-slate-900">میزهای نارنجی حیاط</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              نماد بصری گرما و نشاط در حیاط دوری که همه روزه میزبان کار، گپ‌وگفت و مطالعه جمعی است.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-black/[0.04] space-y-2 text-right shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#0055FF]/10 text-[#0055FF] flex items-center justify-center font-bold">
              🌿
            </div>
            <h4 className="text-sm font-bold text-slate-900">فضای پر از گیاه و نور</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              ترکیب معماری مدرن و گیاهان شاداب آپارتمانی و درختان چنار، فضایی به دور از هیاهوی شلوغ شهر.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-black/[0.04] space-y-2 text-right shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#E31C23]/10 text-[#E31C23] flex items-center justify-center font-bold">
              ⚡
            </div>
            <h4 className="text-sm font-bold text-slate-900">نور گرم نئون قرمز</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              تابلوهای نئونی قرمز و نورپردازی ملایم در سالن داخلی که حس شب‌های پرانرژی و آلترناتیو را بازمی‌آفریند.
            </p>
          </div>

          <div className="p-5 bg-white rounded-2xl border border-black/[0.04] space-y-2 text-right shadow-xs">
            <div className="w-9 h-9 rounded-xl bg-[#1E3A8A]/10 text-[#1E3A8A] flex items-center justify-center font-bold">
              ☕
            </div>
            <h4 className="text-sm font-bold text-slate-900">کافه تخصصی و آرتیزان</h4>
            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              دم‌آوری با دانه‌های دست‌چین و سرو قهوه در ماگ‌های سرامیکی ساخته‌شده در همین استودیو.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
