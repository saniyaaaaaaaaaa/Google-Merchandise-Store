import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { Compass, Sparkles, MapPin, History, Check } from 'lucide-react';
import { trackViewRecommendation, trackClickRecommendation } from '../services/analytics';
import { RECOMMENDED_SEGMENTS } from '../data/products';

interface PersonalizedDiscoveryProps {
  products: Product[];
  recentlyViewed: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  excludeProductIds?: Set<string>;
}

export const PersonalizedDiscovery: React.FC<PersonalizedDiscoveryProps> = ({
  products,
  recentlyViewed,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  excludeProductIds = new Set()
}) => {
  const [activeSegment, setActiveSegment] = useState<'mensUnisex' | 'developer' | 'campus' | 'recent'>('mensUnisex');

  // Filter recommendations based on active discovery segment with strict non-duplication
  const getSegmentProducts = (): Product[] => {
    if (activeSegment === 'recent' && recentlyViewed.length > 0) {
      return recentlyViewed.slice(0, 4);
    }

    if (activeSegment === 'mensUnisex') {
      const predefined = RECOMMENDED_SEGMENTS.mensUnisex;
      const extras = products.filter(
        p => !excludeProductIds.has(p.id) &&
             !predefined.some(item => item.id === p.id) &&
             (p.category === 'Apparel' || p.tags.includes('hoodie') || p.tags.includes('pullover') || p.tags.includes('jacket'))
      );
      return [...predefined, ...extras].slice(0, 4);
    }

    if (activeSegment === 'developer') {
      const predefined = RECOMMENDED_SEGMENTS.developer;
      const extras = products.filter(
        p => !excludeProductIds.has(p.id) &&
             !predefined.some(item => item.id === p.id) &&
             (p.collection === 'Gemini' || p.collection === 'Chrome Dino')
      );
      return [...predefined, ...extras].slice(0, 4);
    }

    if (activeSegment === 'campus') {
      const predefined = RECOMMENDED_SEGMENTS.campus;
      const extras = products.filter(
        p => !excludeProductIds.has(p.id) &&
             !predefined.some(item => item.id === p.id) &&
             (p.collection === 'Campus Essentials' || p.category === 'Bags' || p.category === 'Drinkware')
      );
      return [...predefined, ...extras].slice(0, 4);
    }

    return products.filter(p => !excludeProductIds.has(p.id)).slice(0, 4);
  };

  const discoveryProducts = getSegmentProducts();

  return (
    <section className="py-12 sm:py-16 bg-[#0B0D0F] border-b border-[#2A2E33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Segment Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#4285F4] mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Men's & Unisex Picks</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
              Built for Everyday.
            </h2>
            <p className="text-sm sm:text-base text-[#9AA0A6] max-w-xl mt-1">
              Tech culture, made wearable. Street-ready Google classics and everyday essentials designed for the curious and thinkers in motion.
            </p>
          </div>

          {/* Segment Filter Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveSegment('mensUnisex');
                trackViewRecommendation("Men's & Unisex Picks", 4);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSegment === 'mensUnisex'
                  ? 'bg-[#17191C] text-white shadow-md border border-[#4285F4]'
                  : 'text-[#9AA0A6] hover:text-white hover:bg-[#17191C] border border-[#2A2E33]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span>Men's & Unisex</span>
            </button>

            <button
              onClick={() => {
                setActiveSegment('developer');
                trackViewRecommendation('Developer & AI Studio Picks', 4);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSegment === 'developer'
                  ? 'bg-[#17191C] text-white shadow-md border border-[#FBBC05]'
                  : 'text-[#9AA0A6] hover:text-white hover:bg-[#17191C] border border-[#2A2E33]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
              <span>Developer & AI Tech</span>
            </button>

            <button
              onClick={() => {
                setActiveSegment('campus');
                trackViewRecommendation('Campus Commuter Picks', 4);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSegment === 'campus'
                  ? 'bg-[#17191C] text-white shadow-md border border-[#34A853]'
                  : 'text-[#9AA0A6] hover:text-white hover:bg-[#17191C] border border-[#2A2E33]'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#34A853]" />
              <span>Campus & Commuter</span>
            </button>

            {recentlyViewed.length > 0 && (
              <button
                onClick={() => {
                  setActiveSegment('recent');
                  trackViewRecommendation('Recently Viewed Shelf', recentlyViewed.length);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSegment === 'recent'
                    ? 'bg-[#17191C] text-white shadow-md border border-[#EA4335]'
                    : 'text-[#9AA0A6] hover:text-white hover:bg-[#17191C] border border-[#2A2E33]'
                }`}
              >
                <History className="w-3.5 h-3.5 text-[#EA4335]" />
                <span>Recently Viewed ({recentlyViewed.length})</span>
              </button>
            )}
          </div>
        </div>

        {/* 4 Recommendations Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <AnimatePresence mode="popLayout">
            {discoveryProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => trackClickRecommendation(product, 'personalized_discovery_grid')}
              >
                <ProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlistIds.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  listName="Personalized Discovery"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
