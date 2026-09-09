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
    <footer className="bg-[#0B0D0F] text-[#9AA0A6] border-t border-[#2A2E33] pt-14 pb-8">
      {/* Google 4-Color Strip Top Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] -mt-14 mb-14" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Col 1: Brand & Authenticity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              {/* Google G Logo */}
              <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                />
              </svg>
              <span className="text-lg font-bold text-white font-display tracking-tight">
                Google Merchandise Store
              </span>
            </div>

            <p className="text-xs text-[#9AA0A6] leading-relaxed max-w-sm">
              Official merchandise created for tech enthusiasts, developers, and campus culture worldwide. Authenticity guaranteed.
            </p>

            {/* Authenticity Guarantee */}
            <div className="p-3.5 rounded-2xl bg-[#17191C] border border-[#2A2E33] space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#8AB4F8]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                <span>Official Merchandise Guarantee</span>
              </div>
              <p className="text-[11px] text-[#9AA0A6]">
                100% genuine Google brand apparel and campus gear. Mountain View, CA certified sustainability and ethical production.
              </p>
            </div>
          </div>

          {/* Col 2: Featured Collections */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#9AA0A6] font-medium">
              <li>
                <button
                  onClick={() => {
                    trackSelectPromotion('Footer Link: 1998 Retro', 'footer');
                    onNavigateCampaign();
                  }}
                  className="hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                  <span>1998 Retro Capsule</span>
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
            <ul className="space-y-2 text-xs text-[#9AA0A6] font-medium">
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
            <div className="text-xs text-[#9AA0A6] space-y-2 leading-relaxed">
              <p>
                <strong className="text-white">HQ Campus:</strong>
                <br />1600 Amphitheatre Pkwy
                <br />Mountain View, CA 94043
              </p>
              <p className="text-[11px] text-[#9AA0A6] font-mono">
                Fulfillment Centers in Sunnyvale CA & New York City.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[#34A853] text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>SSL 256-Bit Encrypted</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 border-t border-[#2A2E33] flex flex-col sm:flex-row items-center justify-between text-xs text-[#9AA0A6] gap-4">
          <div>
            © {new Date().getFullYear()} Google Merchandise Store. All brand trademarks belong to Google LLC.
          </div>

          <div className="flex items-center gap-6">
            <button onClick={onNavigateHome} className="hover:text-white transition-colors cursor-pointer">
              Storefront
            </button>
            <span className="text-[#2A2E33]">•</span>
            <span className="text-[#9AA0A6]">Mountain View, California</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
