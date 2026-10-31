/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, User, Order } from './types/index.ts';
import { DOWRI_PRODUCTS, DOWRI_EVENTS } from './data/products.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { ProductGrid } from './components/ProductGrid.tsx';
import { ProductDetailModal } from './components/ProductDetailModal.tsx';
import { CartDrawer } from './components/CartDrawer.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { CheckoutModal } from './components/CheckoutModal.tsx';
import { SearchModal } from './components/SearchModal.tsx';
import { EventsSection } from './components/EventsSection.tsx';
import { Footer } from './components/Footer.tsx';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Persistence for cart and user state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('dowri_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [user, setUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem('dowri_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [discount, setDiscount] = useState<number>(0);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('shop');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync cart to local storage
  useEffect(() => {
    try {
      localStorage.setItem('dowri_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  // Sync user to local storage
  useEffect(() => {
    try {
      if (user) {
        localStorage.setItem('dowri_user', JSON.stringify(user));
      } else {
        localStorage.removeItem('dowri_user');
      }
    } catch (e) {
      console.error(e);
    }
  }, [user]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Cart Handlers
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
            : item
        );
      } else {
        return [...prev, { product, quantity }];
      }
    });
    showToast(`«${product.titleFa}» به سبد خرید اضافه شد.`);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleApplyPromo = (code: string) => {
    if (code === 'DOWRI' || code === 'DOWRI10') {
      setDiscount(0.10); // 10% discount
      return true;
    }
    return false;
  };

  const handleInstantBuy = (product: Product, quantity = 1) => {
    handleAddToCart(product, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderSuccess = (order: Order) => {
    if (user) {
      const updatedUser: User = {
        ...user,
        orders: [...(user.orders || []), order]
      };
      setUser(updatedUser);
    }
  };

  const handleNavigateSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-900 selection:bg-[#0055FF] selection:text-white">
      
      {/* Top Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNavigateSection={handleNavigateSection}
      />

      {/* Main Content Flow */}
      <main className="flex-1">
        {/* Campaign Hero Section */}
        <Hero
          onExploreShop={() => handleNavigateSection('shop-section')}
          onExploreWorkshops={() => handleNavigateSection('workshops-section')}
        />

        {/* E-Commerce Product Catalog */}
        <ProductGrid
          products={DOWRI_PRODUCTS}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={(product) => handleAddToCart(product, 1)}
          searchQuery={searchQuery}
        />

        {/* Community Events & Ceramic Workshops */}
        <EventsSection
          events={DOWRI_EVENTS}
          onOpenAuth={() => setIsAuthOpen(true)}
        />
      </main>

      {/* Brand Manifesto & Footer */}
      <Footer />

      {/* Modals & Overlays */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantBuy={handleInstantBuy}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={handleProceedToCheckout}
        discount={discount}
        onApplyPromo={handleApplyPromo}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        currentUser={user}
        onLoginSuccess={(loggedUser) => setUser(loggedUser)}
        onLogout={() => setUser(null)}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cart}
        currentUser={user}
        discount={discount}
        onOrderSuccess={handleOrderSuccess}
        onClearCart={() => setCart([])}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={DOWRI_PRODUCTS}
        onSelectProduct={(p) => setSelectedProduct(p)}
        onSetSearchQuery={(q) => setSearchQuery(q)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 text-xs font-semibold animate-slide-up border border-white/10">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

    </div>
  );
}
