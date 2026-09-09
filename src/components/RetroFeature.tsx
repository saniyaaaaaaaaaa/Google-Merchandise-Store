import React from 'react';
import { motion } from 'motion/react';
import { Product, ProductColor } from '../types';
import { Flame, ArrowRight, CheckCircle2, History } from 'lucide-react';
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
  const topRetroItems = retroProducts.slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-[#202124] text-white relative overflow-hidden border-b border-[#3C4043]">
      {/* Background Google Color Gradient Halos */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#EA4335]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-[#4285F4]/12 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-10 right-1/3 w-80 h-80 bg-[#FBBC05]/8 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Precision Grid Lines */}
      <div
        className="absolute inset-0 opacity-8 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#FFFFFF 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Editorial Narrative */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-[#EA4335] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-xs">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>ARCHIVAL DROP</span>
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 border border-white/10 text-[#BDC1C6] text-xs font-mono">
                9.5% Bounce Rate in GA4
              </span>
            </div>

            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight">
                1998 Retro.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
                  Old-school energy, reimagined.
                </span>
              </h2>
              <p className="text-[#BDC1C6] text-sm sm:text-base leading-relaxed">
                Before the clean minimalist sans-serifs, Google had an exclamation mark, garage desks, and vibrant primary color optimism. This capsule brings back that founding spirit in heavyweight premium fabrics and modern sport gear.
              </p>
            </div>

            {/* Archival Highlights Checklist */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#E8EAED]">
                <CheckCircle2 className="w-4 h-4 text-[#34A853] shrink-0 mt-0.5" />
                <span>Original 1998 Serif & Exclamation logo embroidery</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#E8EAED]">
                <CheckCircle2 className="w-4 h-4 text-[#FBBC05] shrink-0 mt-0.5" />
                <span>Marine Layer custom Supima blend & USAPA tournament pickleball set</span>
              </div>
              <div className="flex items-start gap-3 text-xs sm:text-sm text-[#E8EAED]">
                <CheckCircle2 className="w-4 h-4 text-[#4285F4] shrink-0 mt-0.5" />
                <span>Sustainably recycled amber Nalgene bottles & climbing-grade rope wristlets</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-4 flex flex-wrap items-center gap-3">
              <motion.button
                id="retro-feature-campaign-btn"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  trackSelectPromotion('Retro Feature: Explore Campaign', 'retro_feature_block');
                  onExploreCampaign();
                }}
                className="px-6 py-3.5 rounded-2xl bg-[#EA4335] hover:bg-[#D93025] text-white text-sm sm:text-base font-bold shadow-lg shadow-[#EA4335]/25 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <span>Explore Full 1998 Drop</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-[#BDC1C6]">
                <History className="w-3.5 h-3.5 text-[#FBBC05]" />
                <span>Limited Garage Run</span>
              </div>
            </div>
          </motion.div>

          {/* Right Product Grid (2x2 Layout of Key 1998 Pieces) */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {topRetroItems.map((product) => (
                <div key={product.id} className="text-[#202124]">
                  <ProductCard
                    product={product}
                    onSelectProduct={onSelectProduct}
                    onQuickView={onQuickView}
                    onAddToCart={onAddToCart}
                    isWishlisted={wishlistIds.has(product.id)}
                    onToggleWishlist={onToggleWishlist}
                    listName="1998 Retro Split Feature"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
