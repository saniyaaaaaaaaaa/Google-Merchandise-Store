import React from 'react';
import { motion } from 'motion/react';
import { Product, ProductColor } from '../types';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { trackSelectPromotion } from '../services/analytics';
import { ProductCard } from './ProductCard';

interface RetroFeatureProps {
  retroProducts: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onExploreCampaign: () => void;
}

export const RetroFeature: React.FC<RetroFeatureProps> = ({
  retroProducts,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onExploreCampaign
}) => {
  // Select distinct non-repeating retro items
  const trackJacket = retroProducts.find(p => p.id === 'google-1998-colorblock-track-jacket');
  const tumbler = retroProducts.find(p => p.id === 'google-lucky-green-straw-tumbler');
  const woolSocks = retroProducts.find(p => p.id === 'google-1998-heritage-wool-socks');
  const postcardSet = retroProducts.find(p => p.id === 'google-1998-postcard-set');

  const complementaryItems = [trackJacket, tumbler, woolSocks, postcardSet].filter(Boolean) as Product[];

  return (
    <section className="py-12 sm:py-16 bg-[#0B0D0F] text-white relative overflow-hidden border-b border-[#2A2E33]">
      {/* Google 4-Color Ambient Lights */}
      <div className="absolute top-1/4 -left-20 w-[450px] h-[450px] bg-[#EA4335]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-[450px] h-[450px] bg-[#4285F4]/12 rounded-full blur-[130px] pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-80 h-80 bg-[#FBBC05]/10 rounded-full blur-[110px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-[#34A853]/10 rounded-full blur-[110px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* ============================================================ */}
        {/* HIGH-IMPACT CAMPAIGN BANNER: 1998 RETRO — “1998. REIMAGINED.” */}
        {/* Layered Merchandise Composition: Hoodie + Socks + Nalgene     */}
        {/* ============================================================ */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#17191C] via-[#111315] to-[#17191C] border border-[#2A2E33] p-8 sm:p-12 lg:p-14 overflow-hidden shadow-2xl">
          {/* Top 4-Color Brand Accent Bar */}
          <div className="absolute top-0 inset-x-0 h-1 flex">
            <div className="flex-1 bg-[#4285F4]" />
            <div className="flex-1 bg-[#EA4335]" />
            <div className="flex-1 bg-[#FBBC05]" />
            <div className="flex-1 bg-[#34A853]" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-[#EA4335] text-white text-xs font-mono font-bold tracking-widest uppercase shadow-md shadow-[#EA4335]/30">
                  1998 RETRO
                </span>
                <span className="text-xs text-[#9AA0A6] font-mono">
                  Menlo Park Heritage
                </span>
              </div>

              <div className="space-y-2">
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.05]">
                  BORN IN THE EARLY WEB.<br />
                  <span className="text-[#FBBC05]">MADE FOR NOW.</span>
                </h2>
                <p className="text-sm sm:text-base text-[#9AA0A6] leading-relaxed max-w-lg pt-2">
                  Old-school energy, engineered for the modern wardrobe. Featuring collaborative Marine Layer micro-modal fleece, heavy cotton crew socks, and shatterproof Tritan Nalgene drinkware in original primary colors.
                </p>
              </div>

              {/* Feature Highlights */}
              <div className="space-y-2.5 pt-1 text-xs text-[#E8EAED]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#4285F4] shrink-0" />
                  <span>Heavyweight micro-modal pullover with archival chest embroidery</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#EA4335] shrink-0" />
                  <span>Throwback athletic ribbed crew socks with four-color cuff stripes</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0" />
                  <span>BPA-free USA-made Nalgene wide mouth with vintage measurement scale</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-2">
                <button
                  id="retro-explore-campaign-btn"
                  onClick={() => {
                    trackSelectPromotion('1998 Retro: Born in the Early Web', 'campaign_banner');
                    onExploreCampaign();
                  }}
                  className="py-3.5 px-8 rounded-full bg-[#4285F4] hover:bg-[#3367D6] text-white text-xs sm:text-sm font-semibold transition-all shadow-lg shadow-[#4285F4]/30 flex items-center gap-2.5 group cursor-pointer"
                >
                  <span>Shop the collection</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right: Layered Merchandise Editorial Composition (Hoodie + Socks + Nalgene) */}
            <div className="lg:col-span-6 relative h-80 sm:h-96 flex items-center justify-center">
              {/* Google 4-Color Abstract Backdrops */}
              <div className="absolute w-48 h-48 bg-[#4285F4]/15 rounded-3xl -rotate-12 blur-md pointer-events-none" />
              <div className="absolute w-44 h-44 bg-[#EA4335]/15 rounded-3xl rotate-12 blur-md pointer-events-none translate-x-12 -translate-y-6" />
              <div className="absolute w-40 h-40 bg-[#FBBC05]/15 rounded-3xl -rotate-6 blur-md pointer-events-none -translate-x-12 translate-y-8" />
              <div className="absolute w-36 h-36 bg-[#34A853]/15 rounded-3xl rotate-6 blur-md pointer-events-none translate-x-8 translate-y-12" />

              {/* Item 1: 1998 Socks (Left Background, Overlapping) */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -left-2 sm:left-4 bottom-4 w-36 sm:w-44 aspect-square rounded-2xl bg-[#17191C] p-3 border border-[#2A2E33] shadow-2xl -rotate-8 hover:rotate-0 transition-transform duration-300 cursor-pointer z-10 group"
                onClick={onExploreCampaign}
              >
                <div className="w-full h-full rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGCXB263099.jpg"
                    alt="Google 1998 Socks"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-white bg-[#111315]/90 backdrop-blur-xs py-0.5 rounded shadow-sm">
                  1998 Socks • $18
                </span>
              </motion.div>

              {/* Item 2: Marine Layer 1998 Pullover Hoodie (Center Foreground, Overlapping Centerpiece) */}
              <motion.div
                animate={{ y: [4, -4, 4] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                className="relative z-20 w-52 sm:w-64 aspect-square rounded-2xl bg-[#17191C] p-3.5 border border-[#4285F4]/40 shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:scale-103 transition-transform duration-300 cursor-pointer group"
                onClick={onExploreCampaign}
              >
                <div className="w-full h-full rounded-xl bg-white p-3 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2631.jpg"
                    alt="Google Marine Layer 1998 Pullover"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="absolute bottom-2.5 left-2.5 right-2.5 text-center text-[11px] font-mono font-bold text-white bg-[#4285F4] py-1 rounded-lg shadow-md">
                  1998 Pullover Hoodie • $125
                </span>
              </motion.div>

              {/* Item 3: 1998 Nalgene Bottle (Right Background, Overlapping) */}
              <motion.div
                animate={{ y: [-4, 4, -4] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -right-2 sm:right-4 top-4 w-36 sm:w-44 aspect-square rounded-2xl bg-[#17191C] p-3 border border-[#2A2E33] shadow-2xl rotate-8 hover:rotate-0 transition-transform duration-300 cursor-pointer z-10 group"
                onClick={onExploreCampaign}
              >
                <div className="w-full h-full rounded-xl bg-white p-2 flex items-center justify-center overflow-hidden">
                  <img
                    src="https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GMSSGDHB106799.jpg"
                    alt="Google 1998 Nalgene Bottle"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="absolute bottom-2 left-2 right-2 text-center text-[10px] font-mono text-white bg-[#111315]/90 backdrop-blur-xs py-0.5 rounded shadow-sm">
                  1998 Nalgene • $32
                </span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Archival Pieces Showcase (Complementary, Non-Repeating) */}
        {complementaryItems.length > 0 && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#FBBC05] block">
                  Archival Merchandise Shelf
                </span>
                <h3 className="text-xl sm:text-2xl font-bold font-display text-white mt-1">
                  More 1998 Heritage Items
                </h3>
              </div>
              <button
                onClick={onExploreCampaign}
                className="text-xs font-semibold text-[#8AB4F8] hover:text-[#4285F4] transition-colors flex items-center gap-1 cursor-pointer"
              >
                <span>View all 1998 items</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {complementaryItems.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlistIds.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  listName="1998 Retro Collection Feature"
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
