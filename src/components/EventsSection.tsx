/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CommunityEvent } from '../types/index.ts';
import { Calendar, Clock, User, ArrowLeft, CheckCircle2, Ticket } from 'lucide-react';

interface EventsSectionProps {
  events: CommunityEvent[];
  onOpenAuth: () => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({ events, onOpenAuth }) => {
  const [registeredEvents, setRegisteredEvents] = useState<string[]>([]);
  const [successEvent, setSuccessEvent] = useState<string | null>(null);

  const formatToman = (num: number) => {
    if (num === 0) return 'رایگان (نیاز به رزرو)';
    return new Intl.NumberFormat('fa-IR').format(num) + ' تومان';
  };

  const handleRegister = (eventId: string) => {
    if (registeredEvents.includes(eventId)) return;
    setRegisteredEvents([...registeredEvents, eventId]);
    setSuccessEvent(eventId);
    setTimeout(() => setSuccessEvent(null), 3000);
  };

  return (
    <section id="workshops-section" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-20">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-black/[0.06]">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#0055FF]">
            <span>جامعه خلاق و تعامل حضوری</span>
            <span aria-hidden="true">·</span>
            <span>تقویم برنامه‌های حیاط</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            کارگاه‌ها، دورهمی‌ها و رویدادهای زنده
          </h2>
          <p className="text-sm text-slate-600 max-w-xl">
            تجربه ملموس ساختن و هم‌نشینی با هنرمندان؛ از کار با چرخ سفالگری تا شب‌های موسیقی آلترناتیو.
          </p>
        </div>

        <div className="text-xs text-slate-500 bg-white px-4 py-2 rounded-xl border border-slate-200/80 shadow-xs">
          ظرفیت کارگاه‌ها به دلیل ماهیت عملی، محدود است.
        </div>
      </div>

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pt-8">
        {events.map((evt) => {
          const isRegistered = registeredEvents.includes(evt.id);
          const isJustSuccess = successEvent === evt.id;

          return (
            <div
              key={evt.id}
              className="bg-white rounded-3xl overflow-hidden border border-black/[0.06] hover:border-black/[0.12] shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={evt.image}
                    alt={evt.titleFa}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-[11px] font-semibold text-[#0055FF]">
                    {evt.typeFa}
                  </div>
                </div>

                <div className="p-6 pt-2 space-y-3 text-right">
                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {evt.titleFa}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {evt.descriptionFa}
                  </p>

                  <div className="pt-2 space-y-1.5 text-xs text-slate-500 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3.5 h-3.5 text-[#0055FF]" />
                      <span>{evt.dateFa} · {evt.timeFa}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>مدرس / میزبان: {evt.instructorFa}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action & Fee Footer */}
              <div className="p-6 pt-0 border-t border-slate-100 mt-4 space-y-3">
                <div className="flex items-center justify-between text-xs pt-3">
                  <span className="text-slate-500">هزینه ثبت‌نام:</span>
                  <span className="font-bold text-slate-900 tabular-nums">
                    {formatToman(evt.price)}
                  </span>
                </div>

                <button
                  onClick={() => handleRegister(evt.id)}
                  disabled={isRegistered}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isRegistered
                      ? 'bg-emerald-600 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                  }`}
                >
                  {isRegistered ? (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>نام‌نویسی با موفقیت انجام شد</span>
                    </>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>رزرو صندلی در رویداد</span>
                    </>
                  )}
                </button>

                {isJustSuccess && (
                  <p className="text-[11px] text-emerald-600 font-medium text-center">
                    پیامک هماهنگی ظرف ۲۴ ساعت برای شما ارسال خواهد شد.
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
