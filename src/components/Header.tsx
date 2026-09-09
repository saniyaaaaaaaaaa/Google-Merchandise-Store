import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ChevronRight, ChevronDown, Sparkles } from 'lucide-react';
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
  onOpenDataHub?: () => void;
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
  cartCount,
  wishlistCount
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const [brandsOpen, setBrandsOpen] = useState(false);

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
    setCollectionsOpen(false);
    setBrandsOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 w-full transition-all duration-300">
      {/* Top Value Banner */}
      <div className="bg-[#111315] text-[#BDC1C6] text-xs py-2 px-4 border-b border-[#2A2E33]">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="flex h-2 w-2 rounded-full bg-[#34A853] animate-pulse shrink-0" />
            <span className="font-medium text-[#E8EAED] truncate">
              <strong className="text-white font-semibold">1998 Retro Drop Live:</strong> Free US shipping on orders $50+ • Mountain View campus merchandise
            </span>
          </div>

          <div className="hidden md:flex items-center gap-4 text-[11px] text-[#9AA0A6]">
            <button
              onClick={() => {
                trackSelectPromotion('1998 Retro Top Banner', 'top_announcement');
                onNavigate('campaign');
              }}
              className="hover:text-white transition-colors underline underline-offset-2 flex items-center gap-1 cursor-pointer"
            >
              <span>Explore 1998 Retro</span>
              <ChevronRight className="w-3 h-3" />
            </button>
            <span>•</span>
            <span className="text-[#34A853] font-medium">Authentic Campus Collection</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`w-full transition-all duration-300 border-b ${
          isScrolled
            ? 'bg-[#0B0D0F]/95 backdrop-blur-md shadow-lg border-[#2A2E33] py-3'
            : 'bg-[#0B0D0F] border-[#2A2E33] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          {/* Mobile Menu Trigger & Logo */}
          <div className="flex items-center gap-3">
            <button
              id="mobile-menu-trigger"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-xl text-[#9AA0A6] hover:text-white hover:bg-[#17191C] lg:hidden cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            {/* Official Google Merchandise Store Branding */}
            <div
              id="brand-logo"
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer group select-none"
            >
              {/* Official Full Multicolor Google Wordmark */}
              <div className="flex items-center group-hover:opacity-90 transition-opacity shrink-0">
                <svg
                  viewBox="0 0 74 24"
                  width="84"
                  height="28"
                  className="h-6 sm:h-7 w-auto shrink-0"
                  aria-label="Google"
                  role="img"
                >
                  <path fill="#4285F4" d="M9.24 8.19v2.46h5.88c-.18 1.38-.64 2.39-1.34 3.1-.86.86-2.2 1.8-4.54 1.8-3.62 0-6.45-2.92-6.45-6.54s2.83-6.54 6.45-6.54c1.95 0 3.38.77 4.43 1.76L15.4 2.5C13.94 1.08 11.98 0 9.24 0 4.28 0 .11 4.04.11 9s4.17 9 9.13 9c2.68 0 4.7-.88 6.28-2.52 1.62-1.62 2.13-3.91 2.13-5.75 0-.57-.04-1.1-.13-1.54H9.24z"/>
                  <path fill="#EA4335" d="M25 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"/>
                  <path fill="#FBBC05" d="M38 6.19c-3.21 0-5.83 2.44-5.83 5.81 0 3.34 2.62 5.81 5.83 5.81s5.83-2.46 5.83-5.81c0-3.37-2.62-5.81-5.83-5.81zm0 9.33c-1.76 0-3.28-1.45-3.28-3.52 0-2.09 1.52-3.52 3.28-3.52s3.28 1.43 3.28 3.52c0 2.07-1.52 3.52-3.28 3.52z"/>
                  <path fill="#4285F4" d="M53.58 7.49h-.09c-.57-.68-1.67-1.3-3.06-1.3C47.53 6.19 45 8.72 45 12c0 3.26 2.53 5.81 5.43 5.81 1.39 0 2.49-.62 3.06-1.32h.09v.81c0 2.22-1.19 3.41-3.1 3.41-1.56 0-2.53-1.12-2.93-2.07l-2.22.92c.64 1.54 2.33 3.43 5.15 3.43 2.99 0 5.52-1.76 5.52-6.05V6.49h-2.42v1zm-2.93 8.03c-1.76 0-3.1-1.5-3.1-3.52 0-2.05 1.34-3.52 3.1-3.52 1.74 0 3.1 1.5 3.1 3.54.01 2.03-1.36 3.5-3.1 3.5z"/>
                  <path fill="#34A853" d="M58 .24h2.51v17.57H58z"/>
                  <path fill="#EA4335" d="M68.26 15.52c-1.3 0-2.22-.59-2.82-1.76l7.77-3.21-.26-.66c-.48-1.3-1.96-3.7-4.97-3.7-2.99 0-5.48 2.35-5.48 5.81 0 3.26 2.46 5.81 5.76 5.81 2.66 0 4.2-1.63 4.84-2.57l-1.98-1.32c-.66.96-1.56 1.6-2.86 1.6zm-.18-7.15c1.03 0 1.91.53 2.2 1.28l-5.25 2.17c0-2.44 1.73-3.45 3.05-3.45z"/>
                </svg>
              </div>

              {/* Vertical divider and Store Subtitle */}
              <div className="flex flex-col border-l border-[#2A2E33] pl-2.5 sm:pl-3">
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#F1F3F4] leading-tight">
                  Merchandise Store
                </span>
                <span className="text-[10px] text-[#34A853] font-medium tracking-wide">
                  Official Shop
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links - ONLY: Apparel, Lifestyle, Stationery, Collections, Shop by Brand */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#BDC1C6]">
            {/* Apparel */}
            <button
              id="nav-apparel"
              onClick={() => handleNavClick('plp', undefined, 'Apparel')}
              className="hover:text-white hover:text-[#4285F4] transition-colors cursor-pointer"
            >
              Apparel
            </button>

            {/* Lifestyle */}
            <button
              id="nav-lifestyle"
              onClick={() => handleNavClick('plp', undefined, 'Lifestyle')}
              className="hover:text-white hover:text-[#4285F4] transition-colors cursor-pointer"
            >
              Lifestyle
            </button>

            {/* Stationery */}
            <button
              id="nav-stationery"
              onClick={() => handleNavClick('plp', undefined, 'Stationery')}
              className="hover:text-white hover:text-[#4285F4] transition-colors cursor-pointer"
            >
              Stationery
            </button>

            {/* Collections Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCollectionsOpen(true)}
              onMouseLeave={() => setCollectionsOpen(false)}
            >
              <button
                id="nav-collections"
                onClick={() => setCollectionsOpen(prev => !prev)}
                className="flex items-center gap-1 hover:text-white hover:text-[#4285F4] transition-colors py-1 cursor-pointer"
              >
                <span>Collections</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#9AA0A6]" />
              </button>

              {collectionsOpen && (
                <div className="absolute top-full left-0 w-56 pt-2 z-50 animate-fade-in">
                  <div className="bg-[#17191C] rounded-2xl shadow-2xl border border-[#2A2E33] p-2 space-y-1 backdrop-blur-xl">
                    <button
                      id="nav-col-1998-retro"
                      onClick={() => handleNavClick('plp', '1998 Retro')}
                      className="w-full text-left px-3 py-2 text-xs font-semibold rounded-xl hover:bg-[#EA4335]/15 text-[#EA4335] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>1998 Retro</span>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EA4335]/20 text-[#EA4335] font-bold">Iconic</span>
                    </button>
                    <button
                      id="nav-col-gemini"
                      onClick={() => handleNavClick('plp', 'Gemini')}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#4285F4]/15 text-[#F1F3F4] hover:text-[#4285F4] flex items-center justify-between cursor-pointer transition-colors"
                    >
                      <span>Gemini AI</span>
                      <Sparkles className="w-3 h-3 text-[#4285F4]" />
                    </button>
                    <button
                      id="nav-col-chrome-dino"
                      onClick={() => handleNavClick('plp', 'Chrome Dino')}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#2A2E33] text-[#F1F3F4] cursor-pointer transition-colors"
                    >
                      Chrome Dino
                    </button>
                    <button
                      id="nav-col-campus-essentials"
                      onClick={() => handleNavClick('plp', 'Campus Essentials')}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#2A2E33] text-[#F1F3F4] cursor-pointer transition-colors"
                    >
                      Campus Essentials
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Shop by Brand Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setBrandsOpen(true)}
              onMouseLeave={() => setBrandsOpen(false)}
            >
              <button
                id="nav-brands"
                onClick={() => setBrandsOpen(prev => !prev)}
                className="flex items-center gap-1 hover:text-white hover:text-[#4285F4] transition-colors py-1 cursor-pointer"
              >
                <span>Shop by Brand</span>
                <ChevronDown className="w-3.5 h-3.5 text-[#9AA0A6]" />
              </button>

              {brandsOpen && (
                <div className="absolute top-full left-0 w-52 pt-2 z-50 animate-fade-in">
                  <div className="bg-[#17191C] rounded-2xl shadow-2xl border border-[#2A2E33] p-2 space-y-1 backdrop-blur-xl">
                    <button
                      onClick={() => handleNavClick('plp', undefined, 'Apparel')}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#2A2E33] text-[#F1F3F4] cursor-pointer transition-colors"
                    >
                      Google
                    </button>
                    <button
                      onClick={() => handleNavClick('plp', '1998 Retro')}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#2A2E33] text-[#F1F3F4] cursor-pointer transition-colors"
                    >
                      Marine Layer
                    </button>
                    <button
                      onClick={() => handleNavClick('plp', undefined, 'Drinkware')}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#2A2E33] text-[#F1F3F4] cursor-pointer transition-colors"
                    >
                      Nalgene
                    </button>
                    <button
                      onClick={() => handleNavClick('plp', 'Gemini')}
                      className="w-full text-left px-3 py-2 text-xs font-medium rounded-xl hover:bg-[#2A2E33] text-[#F1F3F4] cursor-pointer transition-colors"
                    >
                      DeepMind
                    </button>
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action Icons: Clean Search + Wishlist + Cart */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Clean Minimal Search Field - Strictly "Search products..." */}
            <button
              id="header-search-trigger"
              onClick={onOpenSearch}
              className="flex items-center gap-2.5 py-2 px-4 rounded-full bg-[#17191C] hover:bg-[#202428] text-[#9AA0A6] hover:text-white text-xs sm:text-sm font-medium transition-colors border border-[#2A2E33] cursor-pointer"
              aria-label="Search products"
            >
              <Search className="w-4 h-4 text-[#9AA0A6] shrink-0" />
              <span className="text-[#9AA0A6]">Search products…</span>
            </button>

            {/* Wishlist Icon with Live Count */}
            <button
              id="header-wishlist-btn"
              onClick={onOpenWishlist}
              className="p-2.5 rounded-full text-[#BDC1C6] hover:text-white hover:bg-[#17191C] transition-colors relative cursor-pointer"
              aria-label="View saved items"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#EA4335] text-white text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Bag Icon with Live Count */}
            <button
              id="header-cart-btn"
              onClick={onOpenCart}
              className="flex items-center gap-2 py-2 px-4 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-[#4285F4]/20 cursor-pointer"
              aria-label="View shopping bag"
            >
              <div className="relative">
                <ShoppingBag className="w-4 h-4" />
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-2 w-4 h-4 rounded-full bg-[#EA4335] text-white text-[9px] font-bold flex items-center justify-center">
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
          <div className="lg:hidden border-t border-[#2A2E33] bg-[#0B0D0F] px-4 py-4 space-y-3 animate-fade-in">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => handleNavClick('plp', '1998 Retro')}
                className="p-3 rounded-xl bg-[#EA4335]/10 border border-[#EA4335]/20 text-left font-bold text-[#EA4335] text-sm flex items-center justify-between cursor-pointer"
              >
                <span>1998 Retro</span>
                <ChevronRight className="w-4 h-4 text-[#EA4335]" />
              </button>
              <button
                onClick={() => handleNavClick('plp', 'Gemini')}
                className="p-3 rounded-xl bg-[#4285F4]/10 border border-[#4285F4]/20 text-left font-bold text-[#4285F4] text-sm flex items-center justify-between cursor-pointer"
              >
                <span>Gemini AI</span>
                <ChevronRight className="w-4 h-4 text-[#4285F4]" />
              </button>
            </div>

            <div className="flex flex-col divide-y divide-[#2A2E33] text-sm font-medium text-[#E8EAED]">
              <button
                onClick={() => handleNavClick('plp', undefined, 'Apparel')}
                className="py-3 text-left flex items-center justify-between cursor-pointer hover:text-[#4285F4] transition-colors"
              >
                <span>Apparel</span>
                <ChevronRight className="w-4 h-4 text-[#9AA0A6]" />
              </button>
              <button
                onClick={() => handleNavClick('plp', undefined, 'Lifestyle')}
                className="py-3 text-left flex items-center justify-between cursor-pointer hover:text-[#4285F4] transition-colors"
              >
                <span>Lifestyle & Drinkware</span>
                <ChevronRight className="w-4 h-4 text-[#9AA0A6]" />
              </button>
              <button
                onClick={() => handleNavClick('plp', undefined, 'Stationery')}
                className="py-3 text-left flex items-center justify-between cursor-pointer hover:text-[#4285F4] transition-colors"
              >
                <span>Stationery & Office</span>
                <ChevronRight className="w-4 h-4 text-[#9AA0A6]" />
              </button>
              <button
                onClick={() => handleNavClick('plp', 'Chrome Dino')}
                className="py-3 text-left flex items-center justify-between cursor-pointer hover:text-[#4285F4] transition-colors"
              >
                <span>Chrome Dino</span>
                <ChevronRight className="w-4 h-4 text-[#9AA0A6]" />
              </button>
              <button
                onClick={() => handleNavClick('plp', 'Campus Essentials')}
                className="py-3 text-left flex items-center justify-between cursor-pointer hover:text-[#4285F4] transition-colors"
              >
                <span>Campus Essentials</span>
                <ChevronRight className="w-4 h-4 text-[#9AA0A6]" />
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
