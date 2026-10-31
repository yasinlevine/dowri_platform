/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'white';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  showSubtitle = false,
  className = '',
  onClick,
  variant = 'default'
}) => {
  const sizeMap = {
    sm: { img: 'h-10 w-auto', text: 'text-2xl', sub: 'text-xs' },
    md: { img: 'h-14 w-auto', text: 'text-3xl', sub: 'text-sm' },
    lg: { img: 'h-20 w-auto', text: 'text-4xl', sub: 'text-base' },
    xl: { img: 'h-28 w-auto', text: 'text-5xl', sub: 'text-lg' }
  };

  const isWhite = variant === 'white';

  return (
    <div
      onClick={onClick}
      className={`inline-flex items-center gap-2.5 select-none transition-transform active:scale-95 ${onClick ? 'cursor-pointer' : ''} ${className}`}
      aria-label="Dowri Platform - پلتفرم دوری"
    >
      {/* Official Dowri Logo Image */}
      <div className="relative flex items-center justify-center shrink-0">
        <img
          src="/assets/aistudio/photo_2026-10-22_20-20-53_copy_ea6c5469.png"
          alt="Dowri Platform Logo"
          className={`${sizeMap[size].img} object-contain transition-all hover:scale-105 ${
            isWhite ? 'brightness-0 invert' : 'mix-blend-multiply'
          }`}
          onError={(e) => {
            // Elegant SVG Calligraphic Fallback if asset isn't resolved in some contexts
            (e.currentTarget as HTMLElement).style.display = 'none';
            const fallback = e.currentTarget.parentElement?.querySelector('.logo-fallback') as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />

        {/* CSS/SVG Vector Fallback */}
        <div
          className="logo-fallback hidden flex-col items-center justify-center leading-none text-center"
          style={{ display: 'none' }}
        >
          <span
            className={`font-bold tracking-tight ${isWhite ? 'text-white' : 'text-[#0055FF]'}`}
            style={{ fontFamily: "'Yekan Bakh', 'Vazirmatn', sans-serif" }}
          >
            دوری
          </span>
          <span
            className={`font-handwritten -mt-1 tracking-wider ${isWhite ? 'text-white' : 'text-[#E31C23]'}`}
            style={{ fontFamily: "'Caveat', cursive" }}
          >
            Platform
          </span>
        </div>
      </div>

      {showSubtitle && (
        <div className="flex flex-col text-right">
          <span className="text-xs font-semibold text-slate-800 tracking-tight">پلتفرم دوری</span>
          <span className="text-[10px] text-slate-500 font-normal">فضای خلاق و دست‌سازه‌ها</span>
        </div>
      )}
    </div>
  );
};
