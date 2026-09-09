import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Flame, Layers, Award, Terminal, Coffee, Gamepad2 } from 'lucide-react';
import { trackSelectPromotion } from '../services/analytics';

interface NewHereEssentialsProps {
  onSelectCollection: (collection: string) => void;
  onSelectCategory: (category: string) => void;
  onSelectFilter: (type: string, value: string) => void;
}

interface StarterPath {
  id: string;
  title: string;
  subtitle: string;
  count: string;
  badge: string;
  badgeColor: string;
  image: string;
  icon: React.ReactNode;
  action: () => void;
  bgGradient: string;
  borderColor: string;
}

export const NewHereEssentials: React.FC<NewHereEssentialsProps> = ({
  onSelectCollection,
  onSelectCategory,
  onSelectFilter
}) => {
  const starterPaths: StarterPath[] = [
    {
      id: 'bestsellers',
      title: 'Top Bestsellers',
      subtitle: 'Most-loved hoodies, tumblers & collectibles',
      count: '10 Items',
      badge: 'TOP RATED',
      badgeColor: 'bg-[#FBBC05] text-[#202124]',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX0888.jpg',
      icon: <Award className="w-4 h-4 text-[#FBBC05]" />,
      bgGradient: 'bg-gradient-to-br from-[#FFF8D9]/40 via-white to-[#FFF8D9]/20',
      borderColor: 'hover:border-[#FBBC05]',
      action: () => onSelectFilter('bestsellers', 'true')
    },
    {
      id: '1998-retro',
      title: '1998 Retro Drop',
      subtitle: 'Old-school energy, 90s palette & collabs',
      count: '7 Items',
      badge: '9.5% BOUNCE',
      badgeColor: 'bg-[#EA4335] text-white',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGCXB263099.jpg',
      icon: <Flame className="w-4 h-4 text-[#EA4335]" />,
      bgGradient: 'bg-gradient-to-br from-[#EA4335]/5 via-white to-[#EA4335]/10',
      borderColor: 'hover:border-[#EA4335]',
      action: () => onSelectCollection('1998 Retro')
    },
    {
      id: 'apparel',
      title: 'Everyday Apparel',
      subtitle: 'Supima pullovers, zip hoodies & organic tees',
      count: '12 Items',
      badge: 'PREMIUM FITS',
      badgeColor: 'bg-[#34A853] text-white',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX2632.jpg',
      icon: <Layers className="w-4 h-4 text-[#34A853]" />,
      bgGradient: 'bg-gradient-to-br from-[#EAF8F0]/50 via-white to-[#EAF8F0]/30',
      borderColor: 'hover:border-[#34A853]',
      action: () => onSelectCategory('Apparel')
    },
    {
      id: 'gemini-ai',
      title: 'Gemini AI Studio',
      subtitle: 'Generative developer tees & neural journals',
      count: '4 Items',
      badge: 'NEW ERA',
      badgeColor: 'bg-[#4285F4] text-white',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGXXX1358.jpg',
      icon: <Terminal className="w-4 h-4 text-[#4285F4]" />,
      bgGradient: 'bg-gradient-to-br from-[#EAF2FF]/60 via-white to-[#EAF2FF]/30',
      borderColor: 'hover:border-[#4285F4]',
      action: () => onSelectCollection('Gemini')
    },
    {
      id: 'chrome-dino',
      title: 'Chrome Dino Series',
      subtitle: 'Figurines, Game Over mugs & LED bottles',
      count: '5 Items',
      badge: 'FAN FAVORITE',
      badgeColor: 'bg-[#34A853] text-white',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GGOEGABJ125299.jpg',
      icon: <Gamepad2 className="w-4 h-4 text-[#34A853]" />,
      bgGradient: 'bg-gradient-to-br from-[#EAF8F0]/40 via-white to-[#EAF8F0]/20',
      borderColor: 'hover:border-[#34A853]',
      action: () => onSelectCollection('Chrome Dino')
    },
    {
      id: 'drinkware-accessories',
      title: 'Drinkware & EDC',
      subtitle: 'Nalgene bottles, speckled mugs & rope clips',
      count: '13 Items',
      badge: 'CAMPUS READY',
      badgeColor: 'bg-[#202124] text-white',
      image: 'https://ik.imagekit.io/RM/store/20160512512/assets/items/largeimages/GMSSGDHB106799.jpg',
      icon: <Coffee className="w-4 h-4 text-[#202124]" />,
      bgGradient: 'bg-gradient-to-br from-[#F8F7F4] via-white to-[#E8EAED]',
      borderColor: 'hover:border-[#202124]',
      action: () => onSelectCategory('Drinkware')
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-[#F8F7F4] border-b border-[#E5E0D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#4285F4] mb-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>For First-Time Visitors (75K New Shoppers)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#202124] tracking-tight font-display">
              New here? Start with the essentials.
            </h2>
            <p className="text-sm sm:text-base text-[#5F6368] max-w-2xl mt-1">
              Skip the guesswork. We curated the store into 6 intuitive starter paths based on real developer and campus customer favorites.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs text-[#5F6368] bg-white px-3 py-1.5 rounded-full border border-[#DADCE0] font-mono shadow-xs">
            <span className="w-2 h-2 rounded-full bg-[#34A853]" />
            <span>Reduces 67% bounce drop-off</span>
          </div>
        </div>

        {/* 6 Starter Path Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {starterPaths.map((path, idx) => (
            <motion.div
              key={path.id}
              id={`starter-path-${path.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.3 }}
              whileHover={{ y: -4 }}
              onClick={() => {
                trackSelectPromotion(`Starter Card: ${path.title}`, 'homepage_essentials');
                path.action();
              }}
              className={`group relative rounded-2xl p-5 sm:p-6 border border-[#E5E0D8] ${path.bgGradient} ${path.borderColor} shadow-xs hover:shadow-xl hover:shadow-[#202124]/5 transition-all duration-300 cursor-pointer flex items-center justify-between overflow-hidden`}
            >
              {/* Left Details */}
              <div className="space-y-2 max-w-[60%] z-10">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2 py-0.5 rounded-md font-mono shadow-xs ${path.badgeColor}`}>
                    {path.badge}
                  </span>
                  <span className="text-xs text-[#70757A] font-mono">
                    {path.count}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-[#202124] font-display group-hover:text-[#4285F4] transition-colors leading-tight">
                  {path.title}
                </h3>

                <p className="text-xs text-[#5F6368] line-clamp-2 leading-relaxed">
                  {path.subtitle}
                </p>

                <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-[#202124] group-hover:text-[#4285F4] transition-colors">
                  <span>Explore items</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>

              {/* Right Merchandise Thumbnail */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-white p-2.5 shadow-xs border border-[#E5E0D8] flex items-center justify-center shrink-0 group-hover:scale-108 transition-transform duration-300">
                <img
                  src={path.image}
                  alt={path.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
