import React, { useState } from 'react';
import { usePantry } from '../context/PantryContext';
import { ActiveTab } from '../types';
import {
  UtensilsCrossed,
  ChefHat,
  Refrigerator,
  ShoppingCart,
  CalendarDays,
  RotateCcw,
  Menu,
  X,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    activeTab,
    setActiveTab,
    readyRecipesCount,
    availableIngredientsCount,
    pendingShoppingCount,
    resetDemoData,
  } = usePantry();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: number | string; badgeColor?: string }[] = [
    {
      id: 'dashboard',
      label: 'Bosh sahifa',
      icon: <UtensilsCrossed className="w-4 h-4" />,
    },
    {
      id: 'recipes',
      label: 'Retseptlar',
      icon: <ChefHat className="w-4 h-4" />,
      badge: readyRecipesCount > 0 ? `${readyRecipesCount} tayyor` : undefined,
      badgeColor: 'bg-emerald-500 text-white',
    },
    {
      id: 'ingredients',
      label: 'Mening masalliqlarim',
      icon: <Refrigerator className="w-4 h-4" />,
      badge: availableIngredientsCount > 0 ? availableIngredientsCount : undefined,
      badgeColor: 'bg-stone-200 text-stone-800',
    },
    {
      id: 'shopping',
      label: 'Xarid ro‘yxati',
      icon: <ShoppingCart className="w-4 h-4" />,
      badge: pendingShoppingCount > 0 ? pendingShoppingCount : undefined,
      badgeColor: 'bg-amber-500 text-white',
    },
    {
      id: 'planner',
      label: 'Haftalik reja',
      icon: <CalendarDays className="w-4 h-4" />,
    },
  ];

  const handleNavClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-cream-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 py-3">
            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => handleNavClick('dashboard')}
            >
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-forest-800 to-forest-600 flex items-center justify-center text-white shadow-soft group-hover:scale-105 transition-transform duration-200">
                <ChefHat className="w-6 h-6 text-cream-100" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-forest-900" data-testid="app-name">
                    Smart Pantry
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-forest-100 text-forest-800 border border-forest-200">
                    MVP
                  </span>
                </div>
                <p className="text-xs text-stone-500 hidden sm:block font-medium" data-testid="app-tagline">
                  Uyda bor masalliqlardan mazali taomlar toping.
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    data-testid={`nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold transition-all duration-150 relative ${
                      isActive
                        ? 'bg-forest-800 text-white shadow-sm'
                        : 'text-stone-600 hover:text-forest-900 hover:bg-cream-100'
                    }`}
                  >
                    <span>{item.icon}</span>
                    <span>{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[11px] px-2 py-0.5 rounded-full font-bold transition-transform ${item.badgeColor || 'bg-stone-200 text-stone-700'}`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Header Right Action */}
            <div className="hidden sm:flex items-center gap-2">
              <button
                data-testid="reset-demo-button"
                onClick={() => setShowResetConfirm(true)}
                title="Namuna holatiga qaytarish"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-cream-300 text-stone-600 text-xs font-medium hover:bg-cream-200 hover:text-stone-900 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-stone-500" />
                <span>Demo tiklash</span>
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center gap-2">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-xl text-stone-600 hover:bg-cream-200 transition-colors"
                aria-label="Menyu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-cream-200 bg-white/95 px-4 pt-3 pb-5 space-y-1 shadow-lg animate-fade-in">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-forest-800 text-white font-semibold'
                      : 'text-stone-700 hover:bg-cream-100'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span
                      className={`text-xs px-2.5 py-0.5 rounded-full font-bold ${item.badgeColor || 'bg-stone-200 text-stone-700'}`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-2 border-t border-cream-200 flex justify-between items-center px-1">
              <button
                onClick={() => {
                  resetDemoData();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center gap-2 text-xs text-stone-500 hover:text-forest-800 font-medium py-2"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Namunaviy holatni tiklash</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Bottom Navigation Bar for easy one-hand usage */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-cream-200 lg:hidden flex justify-around items-center px-2 py-2 safe-area-pb shadow-soft-lg">
        {navItems.slice(0, 4).map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
                isActive ? 'text-forest-800 font-bold' : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              <div className="relative">
                {item.icon}
                {item.badge && (
                  <span className="absolute -top-1 -right-2 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white" />
                )}
              </div>
              <span className="text-[10px] mt-1 truncate max-w-[70px]">{item.label}</span>
            </button>
          );
        })}
        <button
          onClick={() => handleNavClick('planner')}
          className={`flex flex-col items-center justify-center flex-1 py-1 relative ${
            activeTab === 'planner' ? 'text-forest-800 font-bold' : 'text-stone-500 hover:text-stone-800'
          }`}
        >
          <CalendarDays className="w-4 h-4" />
          <span className="text-[10px] mt-1 truncate max-w-[70px]">Reja</span>
        </button>
      </nav>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-xl border border-cream-200">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-stone-900 mb-1">Demo holatiga qaytarilsinmi?</h3>
            <p className="text-sm text-stone-600 mb-6">
              Barcha o‘zgartirishlar bekor qilinib, boshlang‘ich namunaviy masalliqlar va haftalik taomnoma tiklanadi.
            </p>
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Bekor qilish
              </button>
              <button
                onClick={() => {
                  resetDemoData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-2 rounded-xl text-sm font-semibold bg-forest-800 text-white hover:bg-forest-900 transition-colors shadow-sm"
              >
                Ha, tiklash
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
