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
  const [activeSegment, setActiveSegment] = useState<'campus' | 'developer' | 'classics' | 'recent'>('campus');

  // Filter recommendations based on active discovery segment with strict non-duplication
  const getSegmentProducts = (): Product[] => {
    if (activeSegment === 'recent' && recentlyViewed.length > 0) {
      return recentlyViewed.slice(0, 4);
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

    if (activeSegment === 'developer') {
      const predefined = RECOMMENDED_SEGMENTS.developer;
      const extras = products.filter(
        p => !excludeProductIds.has(p.id) &&
             !predefined.some(item => item.id === p.id) &&
             (p.collection === 'Gemini' || p.collection === 'Chrome Dino')
      );
      return [...predefined, ...extras].slice(0, 4);
    }

    if (activeSegment === 'classics') {
      const predefined = RECOMMENDED_SEGMENTS.classics;
      const extras = products.filter(
        p => !excludeProductIds.has(p.id) &&
             !predefined.some(item => item.id === p.id) &&
             (p.category === 'Apparel' || p.category === 'Stationery')
      );
      return [...predefined, ...extras].slice(0, 4);
    }

    return products.filter(p => !excludeProductIds.has(p.id)).slice(0, 4);
  };

  const discoveryProducts = getSegmentProducts();

  return (
    <section className="py-12 sm:py-16 bg-[#F8F7F4] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Segment Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#4285F4] mb-1.5">
              <Compass className="w-3.5 h-3.5" />
              <span>Smart Recommendation Engine</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
              Made for your next scroll.
            </h2>
            <p className="text-sm sm:text-base text-[#5F6368] max-w-xl mt-1">
              Curated based on active regional trends across Mountain View, San Francisco, and New York.
            </p>
          </div>

          {/* Segment Filter Switcher */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => {
                setActiveSegment('campus');
                trackViewRecommendation('Campus Commuter Picks', 4);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSegment === 'campus'
                  ? 'bg-white text-[#202124] shadow-xs border border-[#DADCE0]'
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-white/60'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-[#34A853]" />
              <span>Silicon Valley Commuter</span>
            </button>

            <button
              onClick={() => {
                setActiveSegment('developer');
                trackViewRecommendation('Developer & AI Studio Picks', 4);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSegment === 'developer'
                  ? 'bg-white text-[#202124] shadow-xs border border-[#DADCE0]'
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-white/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
              <span>Developer & AI Tech</span>
            </button>

            <button
              onClick={() => {
                setActiveSegment('classics');
                trackViewRecommendation('Everyday Classics', 4);
              }}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                activeSegment === 'classics'
                  ? 'bg-white text-[#202124] shadow-xs border border-[#DADCE0]'
                  : 'text-[#5F6368] hover:text-[#202124] hover:bg-white/60'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
              <span>Everyday Classics</span>
            </button>

            {recentlyViewed.length > 0 && (
              <button
                onClick={() => {
                  setActiveSegment('recent');
                  trackViewRecommendation('Recently Viewed Shelf', recentlyViewed.length);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  activeSegment === 'recent'
                    ? 'bg-white text-[#202124] shadow-xs border border-[#DADCE0]'
                    : 'text-[#5F6368] hover:text-[#202124] hover:bg-white/60'
                }`}
              >
                <History className="w-3.5 h-3.5 text-[#70757A]" />
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
