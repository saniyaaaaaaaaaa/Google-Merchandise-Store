import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LOOKBOOK_ITEMS } from '../data/products';
import { Product } from '../types';
import { Camera, MapPin, ShoppingBag, Eye, ArrowRight } from 'lucide-react';
import { trackSelectPromotion, trackSelectItem } from '../services/analytics';

interface CommunityLookbookProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const CommunityLookbook: React.FC<CommunityLookbookProps> = ({
  products,
  onSelectProduct,
  onQuickView
}) => {
  const [activeLookIndex, setActiveLookIndex] = useState(0);
  const currentLook = LOOKBOOK_ITEMS[activeLookIndex];

  // Resolve tagged products for this look
  const taggedProductItems = currentLook.taggedProducts
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => Boolean(p));

  return (
    <section className="py-14 sm:py-20 bg-[#F8F7F4] border-b border-[#E5E0D8] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#34A853] mb-1.5">
              <Camera className="w-3.5 h-3.5" />
              <span>Campus & Community Style</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
              See it in the wild.
            </h2>
            <p className="text-sm sm:text-base text-[#5F6368] max-w-xl mt-1">
              Real outfits and setups spotted across Google offices, tech meetups, and city streets.
            </p>
          </div>

          {/* Look Selector Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0">
            {LOOKBOOK_ITEMS.map((look, idx) => (
              <button
                key={look.id}
                onClick={() => {
                  setActiveLookIndex(idx);
                  trackSelectPromotion(`Lookbook Tab: ${look.title}`, 'lookbook_tabs');
                }}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeLookIndex === idx
                    ? 'bg-[#202124] text-white shadow-xs'
                    : 'bg-white hover:bg-[#F8F7F4] text-[#5F6368] border border-[#DADCE0]'
                }`}
              >
                <MapPin className={`w-3 h-3 ${activeLookIndex === idx ? 'text-[#EA4335]' : 'text-[#70757A]'}`} />
                <span>{look.city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Split Editorial Lookbook Canvas */}
        <div className="rounded-3xl bg-white border border-[#E5E0D8] p-6 sm:p-8 lg:p-10 shadow-xs">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLook.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left: Big Lifestyle Photo Stage */}
              <div className="lg:col-span-7 relative rounded-2xl overflow-hidden aspect-4/3 sm:aspect-16/10 shadow-md group">
                <img
                  src={currentLook.lifestyleImage}
                  alt={currentLook.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Gradient Overlay & Tag */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent pointer-events-none" />

                <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-auto">
                  <div className="flex items-center gap-2 text-xs font-mono text-[#E8EAED] mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#EA4335]" />
                    <span>{currentLook.city}</span>
                    <span>•</span>
                    <span>{currentLook.subtitle}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold font-display">
                    {currentLook.title}
                  </h3>
                </div>
              </div>

              {/* Right: Tagged Merchandise Cards ("Shop The Look") */}
              <div className="lg:col-span-5 space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-[#E5E0D8]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#4285F4]" />
                    <span className="text-xs font-bold uppercase tracking-wider text-[#202124] font-mono">
                      Shop The Outfit ({taggedProductItems.length} Pieces)
                    </span>
                  </div>
                  <span className="text-xs text-[#70757A] font-medium">
                    Click to inspect
                  </span>
                </div>

                <div className="space-y-3">
                  {taggedProductItems.map((product) => (
                    <motion.div
                      key={product.id}
                      id={`lookbook-tag-${product.id}`}
                      whileHover={{ x: 3 }}
                      onClick={() => {
                        trackSelectItem(product, `Lookbook: ${currentLook.title}`);
                        onSelectProduct(product);
                      }}
                      className="group flex items-center justify-between p-3.5 rounded-2xl bg-[#F8F7F4] border border-[#E5E0D8] hover:border-[#4285F4] hover:bg-white hover:shadow-md transition-all cursor-pointer"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="w-14 h-14 rounded-xl bg-white p-1.5 flex items-center justify-center shrink-0 border border-[#EFECE6]">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-contain group-hover:scale-108 transition-transform"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-[#4285F4] font-mono">
                            {product.collection}
                          </span>
                          <h4 className="text-sm font-semibold text-[#202124] group-hover:text-[#4285F4] transition-colors line-clamp-1">
                            {product.name}
                          </h4>
                          <div className="text-xs font-bold text-[#202124] font-mono mt-0.5">
                            ${product.price.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onQuickView(product);
                        }}
                        className="p-2 rounded-xl bg-white hover:bg-[#4285F4] hover:text-white text-[#5F6368] border border-[#DADCE0] transition-colors cursor-pointer"
                        title="Quick View"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Instant Look Bundle CTA */}
                <div className="pt-2">
                  <div className="p-4 rounded-2xl bg-gradient-to-r from-[#EAF2FF] to-[#F1F6FF] border border-[#D2E3FC] flex items-center justify-between">
                    <div>
                      <div className="text-xs font-bold text-[#4285F4]">
                        Bundle Total
                      </div>
                      <div className="text-base font-bold font-mono text-[#202124]">
                        ${taggedProductItems.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
                      </div>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (taggedProductItems[0]) onSelectProduct(taggedProductItems[0]);
                      }}
                      className="px-4 py-2 rounded-xl bg-[#202124] hover:bg-[#4285F4] text-white text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>View Outfit Pieces</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
