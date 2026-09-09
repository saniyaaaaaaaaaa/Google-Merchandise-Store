import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, BarChart3, Sparkles, Flame, Menu, X, ChevronRight } from 'lucide-react';
import { trackPageView, trackSelectPromotion } from '../services/analytics';
import { ViewMode } from '../types';

interface HeaderProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
  onSelectCollection: (collection: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenDataHub: () => void;
  cartCount: number;
  wishlistCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onNavigate,
  onSelectCollection,
  onSelectCategory,
  onOpenSearch,
  onOpenCart,
  onOpenWishlist,
  onOpenDataHub,
  cartCount,
  wishlistCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: ViewMode, collection?: string, category?: string) => {
    if (collection) {
      onSelectCollection(collection);
    } else if (category) {
      onSelectCategory(category);
    } else {
      onNavigate(view);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Value Banner */}
      <div className="bg-[#242220] text-[#E5E0D8] text-xs py-2 px-4 border-b border-[#383531]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 rounded-full bg-[#4A6B53] animate-pulse shrink-0" />
            <span className="font-medium text-[#D5D0C7] truncate">
              <strong className="text-white font-semibold">1998 Retro Drop Live:</strong> Free shipping on US orders $50+ • Fast delivery to Mountain View, NYC & SF
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#C5C0B7]">
            <button
              onClick={() => {
                trackSelectPromotion('Retro Rewind Banner', 'top_announcement');
                onNavigate('campaign');
              }}
              className="hover:text-white transition-colors underline underline-offset-2 flex items-center gap-1"
            >
              <span>Explore Retro Rewind</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <span>•</span>
            <button
              onClick={onOpenDataHub}
              className="text-[#C85A32] hover:text-white font-mono flex items-center gap-1 font-semibold"
            >
              <BarChart3 className="w-3.5 h-3.5" />
              <span>GA4 Research Mode</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-xs border-[#E5E0D8] py-3'
            : 'bg-[#FAF8F5] border-[#E8E4DC] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-xl text-gray-700 hover:bg-gray-100 lg:hidden"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Brand Logo */}
            <div
              id="brand-logo"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              {/* Google Primary Colored Dots */}
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] group-hover:scale-125 transition-transform" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] group-hover:scale-125 transition-transform delay-75" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] group-hover:scale-125 transition-transform delay-150" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] group-hover:scale-125 transition-transform delay-200" />
              </div>

              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-display font-bold text-gray-900 text-lg tracking-tight group-hover:text-[#4285F4] transition-colors">
                    Google
                  </span>
                  <span className="text-xs uppercase tracking-widest font-semibold text-gray-400">
                    Store
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            <button
              id="nav-1998-retro"
              onClick={() => handleNavClick('plp', '1998 Retro')}
              className="text-sm font-semibold text-gray-800 hover:text-[#EA4335] transition-colors flex items-center gap-1.5"
            >
              <Flame className="w-3.5 h-3.5 text-[#EA4335]" />
              <span>1998 Retro</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-red-100 text-[#EA4335] font-bold">
                HOT
              </span>
            </button>

            <button
              id="nav-gemini"
              onClick={() => handleNavClick('plp', 'Gemini')}
              className="text-sm font-semibold text-gray-800 hover:text-[#4285F4] transition-colors flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#4285F4]" />
              <span>Gemini AI</span>
            </button>

            <button
              id="nav-chrome-dino"
              onClick={() => handleNavClick('plp', 'Chrome Dino')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Chrome Dino
            </button>

            <button
              id="nav-apparel"
              onClick={() => handleNavClick('plp', undefined, 'Apparel')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Apparel
            </button>

            <button
              id="nav-drinkware"
              onClick={() => handleNavClick('plp', undefined, 'Drinkware')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Drinkware
            </button>

            <button
              id="nav-accessories"
              onClick={() => handleNavClick('plp', undefined, 'Accessories')}
              className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
            >
              Accessories
            </button>

            <button
              id="nav-campaign-retro"
              onClick={() => handleNavClick('campaign')}
              className="text-sm font-bold text-[#EA4335] hover:text-[#C5221F] transition-colors underline decoration-2 underline-offset-4"
            >
              Retro Rewind
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Trigger Bar / Button */}
            <button
              id="header-search-trigger"
              onClick={onOpenSearch}
              className="flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#EFECE6] hover:bg-[#E5E0D8] text-[#2D2B28] text-xs sm:text-sm font-medium transition-all border border-[#E0DBD2]"
              aria-label="Search merchandise"
            >
              <Search className="w-4 h-4 text-stone-500" />
              <span className="hidden sm:inline text-stone-500">Search products...</span>
              <kbd className="hidden md:inline-block px-1.5 py-0.5 text-[10px] font-mono text-stone-500 bg-white rounded shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* GA4 Research Dashboard Quick Trigger Button */}
            <button
              id="ga4-research-trigger-btn"
              onClick={onOpenDataHub}
              title="Open GA4 Research Insights & Live Telemetry"
              className="p-2.5 rounded-full bg-[#EFECE6] text-[#C85A32] hover:bg-[#C85A32] hover:text-white transition-all duration-200 relative group border border-[#E0DBD2]"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="sr-only">GA4 Research</span>
              <span className="absolute -bottom-8 right-0 whitespace-nowrap text-[11px] font-mono font-semibold bg-[#1A1A1A] text-white px-2 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                GA4 Insights
              </span>
            </button>

            {/* Wishlist Icon with Live Count */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2.5 rounded-full text-[#2D2B28] hover:bg-[#EFECE6] transition-colors relative"
              aria-label="View saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#C85A32] text-white text-[10px] font-bold flex items-center justify-center animate-scale-in">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag Icon with Live Count & Ripple */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 py-2 px-3.5 rounded-full bg-[#1A1A1A] hover:bg-[#C85A32] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs"
              aria-label="View shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#C85A32] text-white text-[9px] font-bold flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline">Bag</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('plp', '1998 Retro')}
                className="p-3 rounded-xl bg-red-50 text-left font-bold text-[#EA4335] text-sm flex items-center justify-between"
              >
                <span>🔥 1998 Retro</span>
                <ChevronRight className="w-4 h-4 text-[#EA4335]" />
              </button>
              <button
                onClick={() => handleNavClick('plp', 'Gemini')}
                className="p-3 rounded-xl bg-blue-50 text-left font-bold text-[#4285F4] text-sm flex items-center justify-between"
              >
                <span>✦ Gemini AI</span>
                <ChevronRight className="w-4 h-4 text-[#4285F4]" />
              </button>
            </div>

            <div className="flex flex-col divide-y divide-gray-100 text-sm font-medium text-gray-800">
              <button
                onClick={() => handleNavClick('plp', 'Chrome Dino')}
                className="py-2.5 text-left flex items-center justify-between"
              >
                <span>Chrome Dino Collection</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleNavClick('plp', undefined, 'Apparel')}
                className="py-2.5 text-left flex items-center justify-between"
              >
                <span>Apparel & Hoodies</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleNavClick('plp', undefined, 'Drinkware')}
                className="py-2.5 text-left flex items-center justify-between"
              >
                <span>Drinkware & Bottles</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleNavClick('plp', undefined, 'Accessories')}
                className="py-2.5 text-left flex items-center justify-between"
              >
                <span>Accessories & Bags</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
              <button
                onClick={() => handleNavClick('campaign')}
                className="py-2.5 text-left font-bold text-[#EA4335] flex items-center justify-between"
              >
                <span>Retro Rewind Campaign</span>
                <ChevronRight className="w-4 h-4 text-[#EA4335]" />
              </button>
              <button
                onClick={() => {
                  onOpenDataHub();
                  setMobileMenuOpen(false);
                }}
                className="py-2.5 text-left font-bold text-[#4285F4] flex items-center justify-between"
              >
                <span>📊 View GA4 Data Research Hub</span>
                <ChevronRight className="w-4 h-4 text-[#4285F4]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
