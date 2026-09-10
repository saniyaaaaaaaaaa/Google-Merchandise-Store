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
    <section className="py-12 sm:py-16 bg-[#0B0D0F] border-b border-[#2A2E33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#4285F4] mb-1.5">
              <Layers className="w-3.5 h-3.5" />
              <span>Catalog Explorer</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight font-display">
              Shop by category & collection.
            </h2>
            <p className="text-sm sm:text-base text-[#9AA0A6] max-w-xl mt-1">
              Tech culture, made wearable. Explore Google merchandise engineered for developers, creators, and everyday thinkers.
            </p>
          </div>
        </div>

        {/* Categories Grid (Core Categories) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-5">
          {CATEGORIES.map((cat, idx) => {
            const colorAccents = [
              { border: 'hover:border-[#4285F4]/60', glow: 'hover:shadow-[#4285F4]/15', text: 'group-hover:text-[#4285F4]' },
              { border: 'hover:border-[#EA4335]/60', glow: 'hover:shadow-[#EA4335]/15', text: 'group-hover:text-[#EA4335]' },
              { border: 'hover:border-[#FBBC05]/60', glow: 'hover:shadow-[#FBBC05]/15', text: 'group-hover:text-[#FBBC05]' },
              { border: 'hover:border-[#34A853]/60', glow: 'hover:shadow-[#34A853]/15', text: 'group-hover:text-[#34A853]' },
              { border: 'hover:border-[#4285F4]/60', glow: 'hover:shadow-[#4285F4]/15', text: 'group-hover:text-[#4285F4]' }
            ];
            const accent = colorAccents[idx % colorAccents.length];

            return (
              <motion.div
                key={cat.id}
                id={`cat-card-${cat.id.toLowerCase()}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05, duration: 0.3 }}
                whileHover={{ y: -5 }}
                onClick={() => {
                  trackSelectPromotion(`Category Tile: ${cat.name}`, 'category_grid');
                  onSelectCategory(cat.id);
                }}
                className={`group relative rounded-2xl bg-[#111315] border border-[#2A2E33] p-4 sm:p-5 flex flex-col justify-between ${accent.border} hover:shadow-2xl ${accent.glow} transition-all duration-300 cursor-pointer shadow-lg`}
              >
                <div className="w-full aspect-square rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#F1F3F4] border border-[#2A2E33] p-3 flex items-center justify-center mb-3 overflow-hidden shadow-inner">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out drop-shadow-md"
                    loading="lazy"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className={`font-bold text-white text-sm sm:text-base ${accent.text} transition-colors`}>
                      {cat.name}
                    </h3>
                    <span className="text-[11px] font-mono text-[#9AA0A6] font-semibold">
                      {cat.count}
                    </span>
                  </div>
                  <p className="text-xs text-[#9AA0A6] line-clamp-2 leading-tight">
                    {cat.description}
                  </p>
                </div>

                <div className={`pt-3 mt-3 border-t border-[#2A2E33] flex items-center justify-between text-xs font-bold text-white ${accent.text} transition-colors`}>
                  <span>Browse</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Featured Curated Franchise Banners (1998, Gemini, Dino) with Art-Directed Styles */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* BANNER 1: 1998 RETRO */}
          <motion.div
            id="collection-banner-1998-retro"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              trackSelectPromotion('Collection Banner: 1998 Retro', 'curated_banners');
              trackViewCollection('1998 Retro');
              onSelectCollection('1998 Retro');
            }}
            className="group relative rounded-2xl bg-gradient-to-br from-[#17191C] via-[#111315] to-[#17191C] border border-[#EA4335]/40 text-white p-6 overflow-hidden shadow-2xl hover:border-[#EA4335] hover:shadow-[#EA4335]/20 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            {/* Ambient Red/Yellow Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#EA4335]/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FBBC05]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]" />

            {/* Real Product Artwork */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 p-2 opacity-40 group-hover:opacity-65 transition-opacity duration-300 pointer-events-none">
              <img
                src="https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2631.jpg"
                alt="1998 Retro"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10 space-y-2 max-w-[70%]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#EA4335] text-white shadow-sm">
                  BORN IN '98. MADE FOR NOW.
                </span>
              </div>
              <h4 className="text-xl font-bold font-display leading-tight text-white group-hover:text-[#EA4335] transition-colors">
                1998 Retro
              </h4>
              <p className="text-xs text-[#BDC1C6] line-clamp-2">
                Vintage silhouettes, embroidered exclamation logos & classic colorblocking.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#EA4335] transition-colors">
              <span>Explore collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* BANNER 2: GEMINI */}
          <motion.div
            id="collection-banner-gemini"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              trackSelectPromotion('Collection Banner: Gemini', 'curated_banners');
              trackViewCollection('Gemini');
              onSelectCollection('Gemini');
            }}
            className="group relative rounded-2xl bg-gradient-to-br from-[#17191C] via-[#111315] to-[#17191C] border border-[#4285F4]/40 text-white p-6 overflow-hidden shadow-2xl hover:border-[#4285F4] hover:shadow-[#4285F4]/20 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            {/* Ambient Blue/Green Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#4285F4]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#34A853]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#4285F4] via-[#8AB4F8] to-[#34A853]" />

            {/* Real Product Artwork */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 p-2 opacity-40 group-hover:opacity-65 transition-opacity duration-300 pointer-events-none">
              <img
                src="https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX1358.jpg"
                alt="Gemini AI"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10 space-y-2 max-w-[70%]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#4285F4] text-white shadow-sm">
                  BUILT FOR THE NEXT IDEA.
                </span>
              </div>
              <h4 className="text-xl font-bold font-display leading-tight text-white group-hover:text-[#4285F4] transition-colors">
                Gemini AI Studio
              </h4>
              <p className="text-xs text-[#BDC1C6] line-clamp-2">
                Minimal generative graphics, iridescent finishes & neural notebook drops.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#4285F4] transition-colors">
              <span>Explore collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* BANNER 3: CHROME DINO */}
          <motion.div
            id="collection-banner-chrome-dino"
            whileHover={{ y: -5 }}
            transition={{ duration: 0.25 }}
            onClick={() => {
              trackSelectPromotion('Collection Banner: Chrome Dino', 'curated_banners');
              trackViewCollection('Chrome Dino');
              onSelectCollection('Chrome Dino');
            }}
            className="group relative rounded-2xl bg-gradient-to-br from-[#17191C] via-[#111315] to-[#17191C] border border-[#34A853]/40 text-white p-6 overflow-hidden shadow-2xl hover:border-[#34A853] hover:shadow-[#34A853]/20 transition-all duration-300 cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            {/* Ambient Green/Yellow/Red Glow */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-[#34A853]/25 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#FBBC05]/15 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#34A853] via-[#FBBC05] to-[#EA4335]" />

            {/* Real Product Artwork */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 p-2 opacity-40 group-hover:opacity-65 transition-opacity duration-300 pointer-events-none">
              <img
                src="https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGABJ125299.jpg"
                alt="Chrome Dino"
                referrerPolicy="no-referrer"
                className="w-full h-full object-contain filter drop-shadow-xl group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="relative z-10 space-y-2 max-w-[70%]">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#34A853] text-white shadow-sm">
                  NO INTERNET. STILL ICONIC.
                </span>
              </div>
              <h4 className="text-xl font-bold font-display leading-tight text-white group-hover:text-[#34A853] transition-colors">
                Chrome Dino
              </h4>
              <p className="text-xs text-[#BDC1C6] line-clamp-2">
                Pixel art desk toys, cactus mugs & enamel keychains for disconnected adventures.
              </p>
            </div>

            <div className="relative z-10 pt-4 flex items-center justify-between text-xs font-bold text-white group-hover:text-[#34A853] transition-colors">
              <span>Explore collection</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
