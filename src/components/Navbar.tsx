/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { ShoppingBag, Search, User as UserIcon, Menu, X, ArrowLeft, Phone } from 'lucide-react';
import { User } from '../types/index.ts';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenAuth: () => void;
  onOpenSearch: () => void;
  user: User | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenAuth,
  onOpenSearch,
  user,
  activeTab,
  setActiveTab,
  onNavigateSection
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'shop', label: 'فروشگاه دست‌سازه‌ها', target: 'shop-section' },
    { id: 'workshops', label: 'رویدادها و کارگاه‌ها', target: 'workshops-section' },
    { id: 'story', label: 'داستان کالکتیو', target: 'story-section' },
  ];

  const handleNavClick = (link: typeof navLinks[0]) => {
    setActiveTab(link.id);
    onNavigateSection(link.target);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-black/[0.06] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        
        {/* Zone 1: Brand Wordmark (Strict one-line brand anchor) */}
        <div className="flex items-center gap-3 shrink-0">
          <BrandLogo
            size="md"
            onClick={() => {
              setActiveTab('shop');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        </div>

        {/* Zone 2: 4 Clean Single-Line Text Nav Links (Strict single-line, whitespace-nowrap) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-700">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className={`relative py-1 whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  isActive ? 'text-[#0055FF] font-semibold' : 'hover:text-[#0055FF] text-slate-700'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#0055FF] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Interactive Affordances (Search, Cart, User Auth) */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            className="p-2 text-slate-700 hover:text-[#0055FF] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="جستجوی محصولات"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Cart Trigger with Active Count */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-slate-700 hover:text-[#0055FF] hover:bg-slate-100 rounded-full transition-colors cursor-pointer"
            aria-label="سبد خرید"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#E31C23] text-white text-[11px] font-bold rounded-full flex items-center justify-center tabular-nums shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Auth CTA */}
          <button
            onClick={onOpenAuth}
            className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer bg-white border border-slate-200 text-slate-900 hover:border-[#0055FF] hover:text-[#0055FF] shadow-xs active:scale-95 whitespace-nowrap shrink-0"
          >
            <UserIcon className="w-4 h-4 text-[#0055FF]" />
            <span className="hidden sm:inline">
              {user ? (user.name || user.phone) : 'ورود با شماره موبایل'}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-700 hover:text-black rounded-lg transition-colors cursor-pointer"
            aria-label="منوی اصلی"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-200/80 bg-[#FAF8F5] px-5 py-4 space-y-3">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link)}
                className="text-right py-2.5 px-3 rounded-lg text-sm font-medium text-slate-800 hover:bg-white hover:text-[#0055FF] transition-colors cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </nav>
          <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
            <span>کافه و حیاط دوری: همه‌روزه ۹ صبح الی ۲۳</span>
            <span className="text-[#0055FF] font-semibold">تهران</span>
          </div>
        </div>
      )}
    </header>
  );
};
