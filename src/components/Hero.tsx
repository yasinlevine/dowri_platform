/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowLeft, Sparkles, MapPin, Coffee, Flame } from 'lucide-react';

interface HeroProps {
  onExploreShop: () => void;
  onExploreWorkshops: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreShop, onExploreWorkshops }) => {
  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:py-20 bg-gradient-to-b from-[#FAF8F5] via-[#FAF8F5] to-[#F3EFEA]/50">
      {/* Subtle organic light accent behind the hero */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C5C8F0]/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FF6200]/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Column 1: Editorial Headline & Actions (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-7">
            
            {/* Quiet Unboxed Kicker Metadata with subtle dot separator */}
            <div className="flex items-center gap-2.5 text-xs text-slate-600 font-medium">
              <span className="text-[#0055FF] font-semibold">پلتفرم دوری</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>کافه، حیاط و استودیو دیزاین</span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span>دست‌سازه‌های محدود</span>
            </div>

            {/* Main Editorial Headline */}
            <div className="space-y-3">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 leading-[1.25] tracking-tight" style={{ textWrap: 'balance' }}>
                امتداد دیجیتالِ یک <span className="text-[#0055FF]">فضای خلاق شهری</span>؛ از حیاط تا دست‌سازه‌ها
              </h1>
              
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal max-w-2xl">
                دوری فقط یک فروشگاه نیست؛ انعکاس زنده حیاطی پر از درخت، میزهای نارنجی، گیاهان سرسبز، آتلیه سرامیک و دورهمی طراحان مستقل است. دست‌سازه‌هایی که روح همین فضا را در خود دارند.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreShop}
                className="inline-flex items-center gap-3 px-6 py-3.5 bg-[#0055FF] hover:bg-[#0033CC] text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-lg shadow-[#0055FF]/20 active:scale-98 cursor-pointer"
              >
                <span>خرید آثار و دست‌سازه‌ها</span>
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
              </button>

              <button
                onClick={onExploreWorkshops}
                className="inline-flex items-center gap-2 px-5 py-3.5 bg-white hover:bg-slate-50 border border-slate-200 text-slate-800 text-sm font-medium rounded-xl transition-colors cursor-pointer hover:border-slate-300"
              >
                <span>رویدادها و کارگاه‌ها</span>
              </button>
            </div>

            {/* Clean Proof Adjacency Metrics */}
            <div className="pt-6 border-t border-black/[0.06] grid grid-cols-2 gap-6 text-right max-w-xs">
              <div>
                <span className="block text-2xl font-bold text-slate-900 tabular-nums">۱۰۰٪</span>
                <span className="text-xs text-slate-500 font-normal">دست‌ساز و تولید محدود</span>
              </div>
              <div>
                <span className="block text-2xl font-bold text-[#0055FF] tabular-nums">۲۴+</span>
                <span className="text-xs text-slate-500 font-normal">هنرمند و طراح مستقل</span>
              </div>
            </div>
          </div>

          {/* Column 2: Authentic Photographic Anchor (5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-black/[0.08] bg-white group">
              <img
                src="/src/assets/images/dowri_courtyard_cafe_1793451781553.webp"
                alt="حیاط و کافه دوری با میزهای نارنجی و درختان سرسبز"
                referrerPolicy="no-referrer"
                className="w-full h-[400px] sm:h-[460px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              
              {/* Measured contrast scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

              {/* Atmospheric Hotspots Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-6 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white/90">
                    <span className="w-2 h-2 rounded-full bg-[#FF6200]" />
                    <span>میزهای نارنجی و درختان حیاط دوری</span>
                  </div>
                  <span className="text-[11px] text-white/70">عکس مستند از فضا</span>
                </div>
                <p className="text-xs text-slate-200 font-normal line-clamp-2">
                  جایی که صبح‌ها با عطر اسپرسو آغاز می‌شود و عصرها به گپ‌وگفت و ورکشاپ‌های سرامیک گره می‌خورد.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
