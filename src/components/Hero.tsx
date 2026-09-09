import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, Flame, ShieldCheck, Truck, RefreshCw, Eye, Sparkle } from 'lucide-react';
import { trackSelectPromotion, trackViewCollection } from '../services/analytics';
import { Product } from '../types';

interface HeroProps {
  onExploreRetro: () => void;
  onShopBestsellers: () => void;
  featuredProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreRetro,
  onShopBestsellers,
  featuredProducts,
  onSelectProduct
}) => {
  // Find the 3 exclusive Hero pieces
  const heroPieces = [
    featuredProducts.find(p => p.id === 'google-marine-layer-1998-pullover'),
    featuredProducts.find(p => p.id === 'google-1998-socks'),
    featuredProducts.find(p => p.id === 'google-1998-nalgene-bottle')
  ].filter(Boolean) as Product[];

  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const activeProduct = heroPieces[activeHeroIndex] || heroPieces[0];

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#F8F7F4] via-[#F1EFEA] to-[#EAE6DF] pt-4 pb-12 sm:pb-16 border-b border-[#E5E0D8]">
      {/* Decorative Google Primary Color Ambient Halos */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#4285F4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#EA4335]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-20 left-1/3 w-64 h-64 bg-[#34A853]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-10 w-72 h-72 bg-[#FBBC05]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Editorial Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative rounded-3xl bg-[#1E2022] text-white p-6 sm:p-10 lg:p-14 overflow-hidden shadow-2xl border border-[#3C4043]"
        >
          {/* Background Radial Pattern */}
          <div
            className="absolute inset-0 opacity-10 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
              backgroundSize: '24px 24px'
            }}
          />

          {/* Google 4-Color Architectural Top Accent Strip */}
          <div className="absolute top-0 inset-x-0 h-1 flex">
            <div className="flex-1 bg-[#4285F4]" />
            <div className="flex-1 bg-[#EA4335]" />
            <div className="flex-1 bg-[#FBBC05]" />
            <div className="flex-1 bg-[#34A853]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center relative z-10">
            {/* Left Column: Editorial Campaign Copy & Strategy */}
            <div className="lg:col-span-6 space-y-6">
              {/* Campaign Eyebrow & Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EA4335] text-white text-xs font-bold uppercase tracking-wider shadow-xs"
                >
                  <Flame className="w-3.5 h-3.5 fill-current" />
                  <span>1998 ARCHIVAL RETRO</span>
                </motion.div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-[#E8EAED] text-xs font-mono font-medium border border-white/10">
                  <span className="w-2 h-2 rounded-full bg-[#34A853] animate-pulse" />
                  <span>GA4 Top Performer (9.5% Bounce)</span>
                </div>
              </div>

              {/* Display Headline */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="space-y-3"
              >
                <div className="text-xs uppercase tracking-widest text-[#BDC1C6] font-mono">
                  Menlo Park Garage Series • 25 Year Tribute
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display leading-[1.08]">
                  RETRO IS BACK.
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
                    Original 1998 Energy.
                  </span>
                </h1>
                <p className="text-base sm:text-lg text-[#BDC1C6] max-w-xl leading-relaxed font-normal pt-1">
                  A high-craft tribute to Google’s founding year. Featuring San Francisco’s Marine Layer custom modal fleece, archival exclamation logos, and authentic four-color heritage accents.
                </p>
              </motion.div>

              {/* Featured Key Attributes */}
              <div className="grid grid-cols-2 gap-3 max-w-lg text-xs font-mono text-[#D2D6DC] pt-1">
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <Sparkle className="w-3.5 h-3.5 text-[#FBBC05] shrink-0" />
                  <span>Custom Modal Cotton Blend</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-2 rounded-xl">
                  <Sparkle className="w-3.5 h-3.5 text-[#4285F4] shrink-0" />
                  <span>Archival Exclamation Crest</span>
                </div>
              </div>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.4 }}
                className="flex flex-wrap items-center gap-3.5 pt-2"
              >
                <motion.button
                  id="hero-explore-retro-btn"
                  onClick={() => {
                    trackSelectPromotion('Hero 1998 Retro CTA', 'hero_primary');
                    trackViewCollection('1998 Retro');
                    onExploreRetro();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 rounded-2xl bg-[#EA4335] hover:bg-[#D93025] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#EA4335]/25 transition-all flex items-center gap-2 hover:gap-3 group cursor-pointer"
                >
                  <span>Explore 1998 Retro</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </motion.button>

                <motion.button
                  id="hero-shop-bestsellers-btn"
                  onClick={() => {
                    trackSelectPromotion('Hero Bestsellers CTA', 'hero_secondary');
                    onShopBestsellers();
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 backdrop-blur-md text-[#F8F9FA] font-semibold text-sm sm:text-base border border-white/20 hover:border-white/40 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-[#FBBC05]" />
                  <span>Shop Bestsellers</span>
                </motion.button>
              </motion.div>

              {/* Trust Value Bar */}
              <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-3 text-xs text-[#9AA0A6]">
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span className="truncate">Free US Ship $50+</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#FBBC05] shrink-0" />
                  <span className="truncate">Official Merch</span>
                </div>
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-[#4285F4] shrink-0" />
                  <span className="truncate">30-Day Returns</span>
                </div>
              </div>
            </div>

            {/* Right Column: Split-Screen Editorial Showcase */}
            <div className="lg:col-span-6 space-y-4">
              {/* Product Showcase Stage */}
              <div className="relative aspect-4/3 sm:aspect-square w-full rounded-2xl bg-gradient-to-b from-white/10 to-white/5 backdrop-blur-md p-6 border border-white/15 flex flex-col justify-between overflow-hidden group">
                {/* Micro Badge Top Row */}
                <div className="flex items-center justify-between w-full relative z-20">
                  <span className="text-[11px] font-mono uppercase px-2.5 py-1 rounded-full bg-[#202124]/90 border border-white/20 text-[#FBBC05] font-bold">
                    {activeProduct?.badge || '1998 ARCHIVE'}
                  </span>
                  <span className="text-[11px] font-mono text-[#D2D6DC] bg-white/10 px-2 py-0.5 rounded">
                    {activeProduct?.stockCount ? `${activeProduct.stockCount} in stock` : 'In Stock'}
                  </span>
                </div>

                {/* Animated Product Display */}
                <div
                  onClick={() => activeProduct && onSelectProduct(activeProduct)}
                  className="relative flex-1 w-full flex items-center justify-center cursor-pointer my-2"
                >
                  <AnimatePresence mode="wait">
                    {activeProduct && (
                      <motion.img
                        key={activeProduct.id}
                        src={activeProduct.image}
                        alt={activeProduct.name}
                        referrerPolicy="no-referrer"
                        initial={{ opacity: 0, scale: 0.92 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.92 }}
                        transition={{ duration: 0.3 }}
                        className="max-h-[82%] max-w-[85%] object-contain filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                  </AnimatePresence>
                </div>

                {/* Bottom Product Details Bar */}
                {activeProduct && (
                  <div className="relative z-20 bg-[#17191C]/95 backdrop-blur-md border border-white/20 p-3.5 rounded-xl flex items-center justify-between shadow-xl">
                    <div className="min-w-0 pr-3">
                      <div className="text-[10px] uppercase font-bold text-[#EA4335] font-mono">
                        {activeProduct.brand}
                      </div>
                      <div className="font-bold text-sm text-white truncate">
                        {activeProduct.name}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                      <div className="font-mono font-bold text-base text-white bg-white/10 px-2.5 py-1 rounded-lg">
                        ${activeProduct.price}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProduct(activeProduct);
                        }}
                        className="p-2 rounded-lg bg-[#EA4335] hover:bg-[#D93025] text-white transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Capsule Piece Switcher Pills */}
              <div className="grid grid-cols-3 gap-2">
                {heroPieces.map((piece, index) => {
                  const isSelected = activeHeroIndex === index;
                  return (
                    <button
                      key={piece.id}
                      onClick={() => setActiveHeroIndex(index)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer flex items-center gap-2.5 ${
                        isSelected
                          ? 'bg-white/20 border-white/50 shadow-md ring-1 ring-white/50'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      }`}
                    >
                      <div className="w-9 h-9 rounded-lg bg-white/10 p-0.5 shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={piece.image}
                          alt={piece.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="text-[10px] text-[#BDC1C6] font-mono truncate">
                          {index === 0 ? 'Pullover' : index === 1 ? 'Socks' : 'Bottle'}
                        </div>
                        <div className="text-xs font-bold text-white truncate font-mono">
                          ${piece.price}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
