import React from 'react';
import { motion } from 'motion/react';
import { CATEGORIES, COLLECTIONS } from '../data/products';
import { ArrowRight, Layers } from 'lucide-react';
import { trackSelectPromotion, trackViewCollection } from '../services/analytics';

interface ShopByCategoryProps {
  onSelectCategory: (category: string) => void;
  onSelectCollection: (collection: string) => void;
}

export const ShopByCategory: React.FC<ShopByCategoryProps> = ({
  onSelectCategory,
  onSelectCollection
}) => {
  return (
    <section className="py-12 sm:py-16 bg-[#F8F7F4] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#4285F4] mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Visual Taxonomy</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
              Shop by category & collection.
            </h2>
            <p className="text-sm sm:text-base text-[#5F6368] max-w-xl mt-1">
              Browse our complete catalog engineered for developers, fans, and campus culture.
            </p>
          </div>
        </div>

        {/* Categories Grid (5 Core Categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORIES.map((cat, idx) => (
            <motion.div
              key={cat.id}
              id={`cat-card-${cat.id.toLowerCase()}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                trackSelectPromotion(`Category Tile: ${cat.name}`, 'category_grid');
                onSelectCategory(cat.id);
              }}
              className="group relative rounded-2xl bg-white border border-[#E5E0D8] p-4 sm:p-5 flex flex-col justify-between hover:border-[#4285F4]/40 hover:shadow-xl hover:shadow-[#202124]/5 transition-shadow duration-300 cursor-pointer shadow-xs"
            >
              <div className="w-full aspect-square rounded-xl bg-[#F8F7F4] border border-[#EFECE6] p-3 flex items-center justify-center mb-3 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-400 ease-out"
                  loading="lazy"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-[#202124] text-sm sm:text-base group-hover:text-[#4285F4] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] font-mono text-[#70757A] font-semibold">
                    {cat.count}
                  </span>
                </div>
                <p className="text-xs text-[#5F6368] line-clamp-2 leading-tight">
                  {cat.description}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-[#EFECE6] flex items-center justify-between text-xs font-bold text-[#202124] group-hover:text-[#4285F4] transition-colors">
                <span>Browse</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Featured Curated Franchise Banners (1998, Gemini, Dino) */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {COLLECTIONS.filter(c => c.id !== 'Campus Essentials').map((col) => {
            const bgClass =
              col.id === '1998 Retro'
                ? 'bg-[#202124] border-[#EA4335]/30'
                : col.id === 'Gemini'
                ? 'bg-[#202124] border-[#4285F4]/30'
                : 'bg-[#202124] border-[#34A853]/30';

            const accentColor =
              col.id === '1998 Retro' ? 'group-hover:text-[#EA4335]' : col.id === 'Gemini' ? 'group-hover:text-[#4285F4]' : 'group-hover:text-[#34A853]';

            const badgeBg =
              col.id === '1998 Retro' ? 'bg-[#EA4335]' : col.id === 'Gemini' ? 'bg-[#4285F4]' : 'bg-[#34A853]';

            return (
              <motion.div
                key={col.id}
                id={`collection-banner-${col.id.toLowerCase().replace(/\s+/g, '-')}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.25 }}
                onClick={() => {
                  trackSelectPromotion(`Collection Banner: ${col.name}`, 'curated_banners');
                  trackViewCollection(col.id);
                  onSelectCollection(col.id);
                }}
                className={`group relative rounded-2xl ${bgClass} border text-white p-6 overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer flex flex-col justify-between min-h-[195px]`}
              >
                {/* Accent Top Line */}
                <div
                  className={`absolute top-0 inset-x-0 h-1 ${
                    col.id === '1998 Retro' ? 'bg-[#EA4335]' : col.id === 'Gemini' ? 'bg-[#4285F4]' : 'bg-[#34A853]'
                  }`}
                />

                {/* Subtle Grid overlay */}
                <div
                  className="absolute inset-0 opacity-10 pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
                    backgroundSize: '16px 16px'
                  }}
                />

                {/* Background Product Image with Gradient Mask */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 p-2 opacity-30 group-hover:opacity-45 transition-opacity duration-300">
                  <img
                    src={col.image}
                    alt={col.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain filter drop-shadow-md group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                <div className="relative z-10 space-y-2 max-w-[70%]">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${badgeBg} text-white shadow-xs`}>
                      {col.badge}
                    </span>
                  </div>
                  <h4 className={`text-xl font-bold font-display leading-tight ${accentColor} transition-colors`}>
                    {col.name}
                  </h4>
                  <p className="text-xs text-[#BDC1C6] line-clamp-2">
                    {col.tagline}
                  </p>
                </div>

                <div className={`relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-white ${accentColor} transition-colors`}>
                  <span>Explore {col.count} items</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
