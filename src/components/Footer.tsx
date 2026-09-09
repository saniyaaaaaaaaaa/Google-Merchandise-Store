import React from 'react';
import { Sparkles, BarChart3, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { trackSelectPromotion } from '../services/analytics';

interface FooterProps {
  onOpenResearchHub: () => void;
  onSelectCategory: (category: string) => void;
  onSelectCollection: (collection: string) => void;
  onNavigateHome: () => void;
  onNavigateCampaign: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenResearchHub,
  onSelectCategory,
  onSelectCollection,
  onNavigateHome,
  onNavigateCampaign
}) => {
  return (
    <footer className="bg-[#242220] text-stone-300 border-t border-[#383531] pt-14 pb-8">
      {/* Google 4-Color Strip Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] -mt-14 mb-14" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Academic Statement */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#34A853]" />
              </div>
              <span className="text-xl font-extrabold text-white font-display tracking-tight">
                Google Merchandise Store
              </span>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              Official merchandise reimagined for developers, campus culture, and tech enthusiasts. Data-driven redesign solving the discovery funnel leak.
            </p>

            {/* Academic Badge */}
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#E0B56A]">
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Academic Redesign Project</span>
              </div>
              <p className="text-[11px] text-stone-400">
                Built with real GA4 engagement telemetry, verified Google Merchandise SKUs, and data-backed UX architecture.
              </p>
              <button
                onClick={onOpenResearchHub}
                className="text-xs font-bold text-[#E0B56A] hover:underline pt-1 inline-flex items-center gap-1 cursor-pointer"
              >
                <span>View Full Data Research Report & Event Stream</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>

          {/* Col 2: Featured Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li>
                <button
                  onClick={() => {
                    trackSelectPromotion('Footer Link: 1998 Retro', 'footer');
                    onNavigateCampaign();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C85A32]" />
                  <span>1998 Retro Drop (9.5% Bounce)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCollection('Campus Essentials')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Campus Essentials
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCollection('Chrome Dino')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Chrome Dino Offline
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCollection('Gemini')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Gemini & AI Studio
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Categories
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-medium">
              <li>
                <button onClick={() => onSelectCategory('Apparel')} className="hover:text-white transition-colors cursor-pointer">
                  Apparel & Fleeces
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Drinkware')} className="hover:text-white transition-colors cursor-pointer">
                  Drinkware & Nalgene
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Accessories')} className="hover:text-white transition-colors cursor-pointer">
                  Accessories & Bags
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Stationery')} className="hover:text-white transition-colors cursor-pointer">
                  Stationery & Moleskine
                </button>
              </li>
              <li>
                <button onClick={() => onSelectCategory('Collectibles')} className="hover:text-white transition-colors cursor-pointer">
                  Collectibles & Sports
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Campus & Fulfillment */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Campus Hub
            </h4>
            <div className="text-xs text-stone-400 space-y-2 leading-relaxed">
              <p>
                <strong className="text-stone-200">HQ Campus:</strong>
                <br />1600 Amphitheatre Pkwy
                <br />Mountain View, CA 94043
              </p>
              <p className="text-[11px] text-stone-400 font-mono">
                Fulfillment Centers in Sunnyvale CA & New York City.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[#88C496] text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL 256-Bit Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-[#383531] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div>
            © {new Date().getFullYear()} Google Merchandise Store (Academic Redesign Project). All brand trademarks belong to Google LLC.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onOpenResearchHub} className="hover:text-stone-200 transition-colors cursor-pointer">
              GA4 Analytics Hub
            </button>
            <span className="text-stone-600">•</span>
            <button onClick={onNavigateHome} className="hover:text-stone-200 transition-colors cursor-pointer">
              Storefront
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
