import React, { useState, useEffect, useRef } from 'react';
import { Product } from '../types';
import { Search, X, TrendingUp, Sparkles, ArrowRight, Star } from 'lucide-react';
import { trackSearch, trackSelectItem } from '../services/analytics';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onSelectCollection: (collection: string) => void;
  onSelectCategory: (category: string) => void;
}

const TRENDING_SEARCHES = [
  '1998 Retro Socks',
  'Marine Layer Pullover',
  'Chrome Dino Figurine',
  'Nano Banana Sweatshirt',
  'Pickleball Set',
  'Nalgene Bottle',
  'Campus Backpack',
  'Gemini Tee'
];

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
  onSelectCollection,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const normalizedQuery = query.toLowerCase().trim();
  const results = normalizedQuery
    ? products.filter(p =>
        p.name.toLowerCase().includes(normalizedQuery) ||
        p.category.toLowerCase().includes(normalizedQuery) ||
        p.collection.toLowerCase().includes(normalizedQuery) ||
        p.brand.toLowerCase().includes(normalizedQuery) ||
        p.tags.some(t => t.toLowerCase().includes(normalizedQuery))
      )
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      trackSearch(query.trim(), results.length);
    }
  };

  const handleTrendingClick = (term: string) => {
    setQuery(term);
    const matched = products.filter(p =>
      p.name.toLowerCase().includes(term.toLowerCase()) ||
      p.tags.some(t => t.toLowerCase().includes(term.toLowerCase()))
    );
    trackSearch(term, matched.length);
  };

  const handleProductClick = (product: Product) => {
    trackSelectItem(product, 'Live Search Modal');
    onSelectProduct(product);
    onClose();
  };

  return (
    <div
      id="search-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 overflow-y-auto animate-fade-in"
      onClick={onClose}
    >
      <div
        id="search-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl bg-[#FAF8F5] rounded-3xl shadow-2xl border border-[#E5E0D8] overflow-hidden flex flex-col max-h-[85vh]"
      >
        {/* Search Input Header */}
        <form
          onSubmit={handleSearchSubmit}
          className="relative flex items-center px-6 py-5 border-b border-[#E5E0D8] bg-white"
        >
          <Search className="w-5 h-5 text-[#4285F4] shrink-0 mr-3.5" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full text-base sm:text-lg text-[#202124] placeholder:text-[#5F6368] bg-transparent outline-none font-medium"
          />
          {query ? (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1.5 rounded-full hover:bg-[#FAF8F5] text-stone-400 hover:text-[#1A1A1A] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          ) : (
            <kbd className="hidden sm:inline-block px-2 py-1 text-xs font-mono text-stone-400 bg-[#FAF8F5] border border-[#E5E0D8] rounded-md">
              ESC
            </kbd>
          )}
        </form>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Active Search Results */}
          {query.trim() ? (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 font-mono">
                  Results for &ldquo;{query}&rdquo; ({results.length})
                </h4>
                {results.length > 0 && (
                  <span className="text-xs text-stone-500 font-medium">
                    Click an item to view details
                  </span>
                )}
              </div>

              {results.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {results.map((product) => (
                    <div
                      key={product.id}
                      id={`search-result-${product.id}`}
                      onClick={() => handleProductClick(product)}
                      className="group flex items-center gap-4 p-3 rounded-2xl bg-white hover:bg-white border border-[#E5E0D8] hover:border-[#C85A32] shadow-2xs hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#FAF8F5] p-2 flex items-center justify-center shrink-0 border border-[#EFECE6]">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase font-bold tracking-wider text-[#C85A32]">
                            {product.collection}
                          </span>
                          {product.badge && (
                            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#FAF8F5] text-stone-700 font-semibold border border-[#EFECE6]">
                              {product.badge}
                            </span>
                          )}
                        </div>
                        <h5 className="font-semibold text-[#1A1A1A] text-sm truncate group-hover:text-[#C85A32] transition-colors">
                          {product.name}
                        </h5>
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-1 text-xs text-[#C99436]">
                            <Star className="w-3 h-3 fill-current" />
                            <span className="font-semibold text-stone-700">{product.rating}</span>
                          </div>
                          <span className="font-bold text-[#1A1A1A] text-sm font-mono">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-12 text-center">
                  <p className="text-stone-600 text-sm">
                    No products found matching &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-xs text-stone-400 mt-1">
                    Try searching for &ldquo;1998&rdquo;, &ldquo;Socks&rdquo;, &ldquo;Hoodie&rdquo;, or &ldquo;Dino&rdquo;.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Trending Searches */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 font-mono mb-3">
                  <TrendingUp className="w-4 h-4 text-[#C85A32]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {TRENDING_SEARCHES.map((term) => (
                    <button
                      key={term}
                      onClick={() => handleTrendingClick(term)}
                      className="px-3.5 py-2 rounded-xl bg-white hover:bg-[#FAF8F5] text-stone-700 border border-[#E5E0D8] text-xs sm:text-sm font-medium transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <span>{term}</span>
                      <ArrowRight className="w-3 h-3 text-stone-400" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Popular Curated Collections */}
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-stone-500 font-mono mb-3">
                  <Sparkles className="w-4 h-4 text-[#C99436]" />
                  <span>Explore Featured Collections</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    onClick={() => {
                      onSelectCollection('1998 Retro');
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] text-left hover:border-[#C85A32] hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#EA4335] uppercase tracking-wider block">
                      ARCHIVAL CAPSULE
                    </span>
                    <span className="font-bold text-[#202124] text-sm mt-0.5 block group-hover:text-[#EA4335]">
                      1998 Retro
                    </span>
                    <span className="text-xs text-[#5F6368] mt-1 block">
                      8 products • Mountain View drop
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCollection('Gemini');
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] text-left hover:border-[#C85A32] hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#4A6B53] uppercase tracking-wider block">
                      AI & DEV
                    </span>
                    <span className="font-bold text-[#1A1A1A] text-sm mt-0.5 block group-hover:text-[#C85A32]">
                      Gemini Studio
                    </span>
                    <span className="text-xs text-stone-500 mt-1 block">
                      4 products • New drops
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCollection('Chrome Dino');
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] text-left hover:border-[#C85A32] hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-[#C99436] uppercase tracking-wider block">
                      ICONIC
                    </span>
                    <span className="font-bold text-[#1A1A1A] text-sm mt-0.5 block group-hover:text-[#C85A32]">
                      Chrome Dino
                    </span>
                    <span className="text-xs text-stone-500 mt-1 block">
                      5 products • Vinyl & Mugs
                    </span>
                  </button>

                  <button
                    onClick={() => {
                      onSelectCategory('Apparel');
                      onClose();
                    }}
                    className="p-3.5 rounded-2xl bg-white border border-[#E5E0D8] text-left hover:border-[#C85A32] hover:shadow-md transition-all group cursor-pointer"
                  >
                    <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                      DAILY ESSENTIALS
                    </span>
                    <span className="font-bold text-[#1A1A1A] text-sm mt-0.5 block group-hover:text-[#C85A32]">
                      All Apparel
                    </span>
                    <span className="text-xs text-stone-500 mt-1 block">
                      12 products • Premium fits
                    </span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
