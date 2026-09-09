import React, { useEffect } from 'react';
import { Product, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { Flame, Sparkles, History, ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import { trackViewCollection, trackSelectPromotion } from '../services/analytics';

interface CampaignLandingViewProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, color: ProductColor, size?: string) => void;
  wishlistIds: Set<string>;
  onToggleWishlist: (product: Product) => void;
  onNavigateHome: () => void;
}

export const CampaignLandingView: React.FC<CampaignLandingViewProps> = ({
  products,
  onSelectProduct,
  onQuickView,
  onAddToCart,
  wishlistIds,
  onToggleWishlist,
  onNavigateHome
}) => {
  const retroProducts = products.filter(p => p.collection === '1998 Retro');

  useEffect(() => {
    trackViewCollection('1998 Retro (Retro Rewind Campaign)');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-[#14171A] text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs text-gray-400 font-medium mb-8">
          <button onClick={onNavigateHome} className="hover:text-white transition-colors">
            Home
          </button>
          <span>/</span>
          <span>Campaigns</span>
          <span>/</span>
          <span className="text-white font-semibold">Retro Rewind 1998</span>
        </nav>

        {/* Campaign Hero Banner */}
        <div className="relative rounded-3xl bg-gradient-to-br from-[#1E232A] via-[#2D1B22] to-[#171B22] p-8 sm:p-14 border border-red-500/20 shadow-2xl overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#EA4335]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#4285F4]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3.5 py-1 rounded-full bg-[#EA4335] text-white text-xs font-mono font-bold tracking-wider uppercase flex items-center gap-1.5 shadow-md">
                <Flame className="w-3.5 h-3.5 fill-current" />
                <span>LIMITED CAPSULE RELEASE</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-mono text-gray-300 border border-white/10">
                Archival Menlo Park Series
              </span>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl sm:text-6xl font-extrabold font-display leading-[1.05] tracking-tight">
                RETRO REWIND.
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#EA4335] via-[#FBBC05] to-[#4285F4]">
                  Retro Vibes in Full Color.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-300 leading-relaxed font-normal">
                Before Google indexed the world, it was run from Susan Wojcicki&rsquo;s garage with Lego server racks, ping pong tables, and colorful CRT monitors. We re-engineered the original look with modern sustainable craft.
              </p>
            </div>

            {/* Campaign Metrics & Value Badges */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase">Founding Era</span>
                <span className="font-bold text-white text-sm">Fall 1998</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase">Quality Standard</span>
                <span className="font-bold text-white text-sm">Supima & Marine Layer</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase">Production Run</span>
                <span className="font-bold text-[#FBBC05] text-sm">Limited Drop</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-gray-400 block text-[10px] uppercase">GA4 Engagement</span>
                <span className="font-bold text-[#34A853] text-sm">9.5% Bounce Rate</span>
              </div>
            </div>
          </div>
        </div>

        {/* 1998 Archive Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#EA4335]/20 text-[#EA4335] flex items-center justify-center font-bold font-mono">
              01
            </div>
            <h3 className="font-bold text-lg font-display">The Exclamation Mark</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              In 1998, Google briefly experimented with an exclamation mark on its homepage doodle logo, celebrating playful optimism in early internet design.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#4285F4]/20 text-[#4285F4] flex items-center justify-center font-bold font-mono">
              02
            </div>
            <h3 className="font-bold text-lg font-display">The Four Core Colors</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Larry & Sergey picked primary colors but made the &lsquo;l&rsquo; green to prove Google didn&rsquo;t strictly follow traditional corporate rules.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#34A853]/20 text-[#34A853] flex items-center justify-center font-bold font-mono">
              03
            </div>
            <h3 className="font-bold text-lg font-display">Crafted in California</h3>
            <p className="text-xs text-gray-300 leading-relaxed">
              Co-designed with Bay Area artisans, featuring Marine Layer micro-modal pullovers and tournament-grade paddle gear.
            </p>
          </div>
        </div>

        {/* Campaign Products Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <h2 className="text-2xl font-bold font-display text-white">
                Shop the 1998 Capsule ({retroProducts.length} Items)
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Authentic archival pieces with free US shipping on orders $50+.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {retroProducts.map((product) => (
              <div key={product.id} className="text-gray-900">
                <ProductCard
                  product={product}
                  onSelectProduct={onSelectProduct}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  isWishlisted={wishlistIds.has(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  listName="Retro Rewind Campaign Page"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
