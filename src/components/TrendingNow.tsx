import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { Flame, ArrowRight } from 'lucide-react';
import { trackSelectPromotion } from '../services/analytics';

interface TrendingNowProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onViewAll: () => void;
}

export const TrendingNow: React.FC<TrendingNowProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onViewAll
}) => {
  const [activeTab, setActiveTab] = useState<'all' | 'apparel' | 'collectibles' | 'lifestyle'>('all');

  const filteredProducts = products.filter(p => {
    if (activeTab === 'all') return true;
    if (activeTab === 'apparel') return p.category === 'Apparel';
    if (activeTab === 'collectibles') return p.category === 'Collectibles' || p.collection === 'Chrome Dino';
    if (activeTab === 'lifestyle') return p.category === 'Bags' || p.category === 'Drinkware';
    return true;
  }).slice(0, 8);

  return (
    <section className="py-12 sm:py-16 bg-[#0B0D0F] border-b border-[#2A2E33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header & Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#EA4335] mb-1.5">
              <Flame className="w-3.5 h-3.5 fill-current" />
              <span>Community Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
              Trending right now.
            </h2>
            <p className="text-sm sm:text-base text-[#9AA0A6] max-w-xl mt-1">
              The most active items across Mountain View, New York, and global tech hubs.
            </p>
          </div>

          {/* Filter Pills with Google Color Accents */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'all'
                  ? 'bg-[#4285F4] text-white shadow-md shadow-[#4285F4]/20'
                  : 'bg-[#17191C] text-[#9AA0A6] hover:text-white hover:bg-[#202428] border border-[#2A2E33]'
              }`}
            >
              All Trending
            </button>
            <button
              onClick={() => setActiveTab('apparel')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'apparel'
                  ? 'bg-[#34A853] text-white shadow-md shadow-[#34A853]/20'
                  : 'bg-[#17191C] text-[#9AA0A6] hover:text-white hover:bg-[#202428] border border-[#2A2E33]'
              }`}
            >
              Apparel & Fleece
            </button>
            <button
              onClick={() => setActiveTab('collectibles')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'collectibles'
                  ? 'bg-[#FBBC05] text-[#202124] shadow-md shadow-[#FBBC05]/20'
                  : 'bg-[#17191C] text-[#9AA0A6] hover:text-white hover:bg-[#202428] border border-[#2A2E33]'
              }`}
            >
              Collectibles & Dino
            </button>
            <button
              onClick={() => setActiveTab('lifestyle')}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'lifestyle'
                  ? 'bg-[#EA4335] text-white shadow-md shadow-[#EA4335]/20'
                  : 'bg-[#17191C] text-[#9AA0A6] hover:text-white hover:bg-[#202428] border border-[#2A2E33]'
              }`}
            >
              Bags & Drinkware
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onSelectProduct={onSelectProduct}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                isWishlisted={wishlistIds.has(product.id)}
                onToggleWishlist={onToggleWishlist}
                listName="Trending Now Section"
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Bottom View All Link */}
        <div className="mt-10 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => {
              trackSelectPromotion('View All Trending Products', 'trending_bottom');
              onViewAll();
            }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#17191C] hover:bg-[#202428] border border-[#2A2E33] text-white hover:text-[#4285F4] text-sm font-bold shadow-lg transition-all group cursor-pointer"
          >
            <span>View Full Catalog ({products.length} Products)</span>
            <ArrowRight className="w-4 h-4 text-[#9AA0A6] group-hover:text-[#4285F4] group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>
    </section>
  );
};
