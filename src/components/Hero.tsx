import React from 'react';
import { motion } from 'motion/react';
import { Eye, Sparkles } from 'lucide-react';
import { trackSelectPromotion } from '../services/analytics';
import { Product } from '../types';
import campaignModelImg from '../assets/images/retro_hoodie_campaign_model_1788981883869.jpg';

interface HeroProps {
  onExploreRetro: () => void;
  onShopBestsellers: () => void;
  featuredProducts?: Product[];
  onSelectProduct?: (product: Product) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreRetro,
  onShopBestsellers,
  featuredProducts = [],
  onSelectProduct
}) => {
  // 1998 Marine Layer Pullover Hoodie
  const mainPullover = featuredProducts.find(p => p.id === 'google-marine-layer-1998-pullover') || featuredProducts[0];

  return (
    <section className="relative w-full bg-[#0B0D0F] pt-4 sm:pt-6 pb-12 sm:pb-16 border-b border-[#2A2E33] overflow-hidden">
      {/* ========================================================= */}
      {/* Background Google-Color Ambient Lights with Subtle Motion */}
      {/* Charcoal base with soft 4-color ambient fields            */}
      {/* ========================================================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Google Blue glow */}
        <motion.div
          animate={{
            scale: [1, 1.08, 1],
            opacity: [0.18, 0.26, 0.18],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-16 -left-16 w-[560px] h-[560px] bg-[#4285F4] rounded-full blur-[150px]"
        />

        {/* Google Red subtle accent */}
        <motion.div
          animate={{
            scale: [1, 1.12, 1],
            opacity: [0.12, 0.2, 0.12],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-1/4 left-1/3 w-[420px] h-[420px] bg-[#EA4335] rounded-full blur-[140px]"
        />

        {/* Google Yellow highlight */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.18, 0.1],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-12 right-1/4 w-[460px] h-[460px] bg-[#FBBC05] rounded-full blur-[140px]"
        />

        {/* Google Green secondary glow */}
        <motion.div
          animate={{
            scale: [1, 1.06, 1],
            opacity: [0.12, 0.22, 0.12],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -bottom-24 right-10 w-[480px] h-[480px] bg-[#34A853] rounded-full blur-[150px]"
        />

        {/* Precision Architectural Dot Matrix */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(#FFFFFF 1.2px, transparent 1.2px)',
            backgroundSize: '28px 28px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main Hero Container */}
        <div className="bg-[#111315]/85 backdrop-blur-2xl rounded-3xl border border-[#2A2E33] p-6 sm:p-8 lg:p-12 shadow-2xl shadow-black/80 relative overflow-hidden">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">

            {/* ========================================================= */}
            {/* LEFT: Hero Typography, Value Highlights & CTAs            */}
            {/* High-contrast Space Grotesk + Inter editorial typography  */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 space-y-6 order-1">
              
              {/* 1998 RETRO Tag Badge with 4-Color Accents */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 rounded-full bg-[#EA4335] text-white text-xs font-mono font-bold uppercase tracking-widest shadow-md shadow-[#EA4335]/30">
                    1998 RETRO
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#4285F4]" />
                    <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                    <span className="w-2 h-2 rounded-full bg-[#FBBC05]" />
                    <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                  </div>
                </div>
                <p className="text-xs font-mono tracking-widest uppercase font-semibold text-[#9AA0A6]">
                  THE ARCHIVE IS OPEN.
                </p>
              </motion.div>

              {/* Campaign Headline in Space Grotesk */}
              <div className="space-y-3">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.06]"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  EYECONIC SINCE '98.
                </motion.h1>

                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.15 }}
                  className="text-xl sm:text-2xl lg:text-3xl font-bold tracking-tight text-[#FBBC05] leading-snug"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  THE ORIGINAL GOOGLE ENERGY.<br />
                  <span className="text-white">BACK IN THE FRAME.</span>
                </motion.h2>

                {/* Clean Supporting Text in Inter */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-base sm:text-lg text-[#BDC1C6] leading-relaxed max-w-lg"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  A throwback to the colours, confidence and creativity that started it all — now made for today.
                </motion.p>
              </div>

              {/* Graphic Google 4-Color Micro Bar */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="w-24 h-1 rounded-full bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC05] to-[#34A853] origin-left"
              />

              {/* Minimal Archival Highlights */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1"
              >
                <div className="flex items-center gap-2.5 bg-[#17191C]/90 border border-[#2A2E33] px-3.5 py-2.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-[#4285F4] shrink-0" />
                  <span className="text-xs text-[#E8EAED] font-medium">Mountain View Heritage</span>
                </div>
                <div className="flex items-center gap-2.5 bg-[#17191C]/90 border border-[#2A2E33] px-3.5 py-2.5 rounded-xl">
                  <span className="w-2 h-2 rounded-full bg-[#34A853] shrink-0" />
                  <span className="text-xs text-[#E8EAED] font-medium">Archival Stitch & Sleeve Bands</span>
                </div>
              </motion.div>

              {/* Campaign Call-to-Action */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="pt-2 flex flex-wrap items-center gap-3.5"
              >
                <button
                  id="hero-explore-products-cta"
                  onClick={() => {
                    trackSelectPromotion('Hero: Explore the collection', 'hero_editorial_campaign');
                    onExploreRetro();
                  }}
                  className="py-3.5 px-6 rounded-full bg-[#17191C] hover:bg-[#202428] text-white font-semibold text-sm transition-colors border border-[#2A2E33] cursor-pointer tracking-wide"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  EXPLORE THE COLLECTION
                </button>
              </motion.div>

            </div>

            {/* ========================================================= */}
            {/* RIGHT: Art-Directed Editorial Campaign Stage              */}
            {/* Multi-layered depth:                                      */}
            {/* 1. BACKGROUND: Google colour graphic shapes & glows       */}
            {/* 2. MIDDLE: Large clear model image in rounded frame       */}
            {/* 3. FOREGROUND: Floating 1998 Retro product card           */}
            {/* ========================================================= */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end order-2 pt-4 lg:pt-0">
              <div className="relative w-full max-w-[460px] sm:max-w-[490px] lg:max-w-[500px]">

                {/* ----------------------------------------------------- */}
                {/* 1. BACKGROUND: Google 4-Color Graphic Shapes & Glows */}
                {/* ----------------------------------------------------- */}
                <div className="absolute inset-0 -m-6 sm:-m-10 pointer-events-none">
                  {/* Google Blue gradient shape */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.42, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-6 -right-6 w-64 sm:w-72 h-64 sm:h-72 rounded-full bg-[#4285F4]/30 blur-[80px]"
                  />

                  {/* Google Red curved shape glow */}
                  <motion.div
                    animate={{ scale: [1, 1.08, 1], opacity: [0.22, 0.32, 0.22] }}
                    transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-1/2 -left-8 w-56 sm:w-64 h-56 sm:h-64 rounded-full bg-[#EA4335]/25 blur-[85px]"
                  />

                  {/* Google Yellow accent glow */}
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], opacity: [0.18, 0.28, 0.18] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute -bottom-6 right-10 w-52 sm:w-60 h-52 sm:h-60 rounded-full bg-[#FBBC05]/20 blur-[75px]"
                  />

                  {/* Google Green edge accent glow */}
                  <motion.div
                    animate={{ scale: [1, 1.04, 1], opacity: [0.22, 0.3, 0.22] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-4 -left-6 w-48 sm:w-52 h-48 sm:h-52 rounded-full bg-[#34A853]/25 blur-[70px]"
                  />

                  {/* Precision Graphic SVG Arc in Google Blue */}
                  <svg className="absolute -top-6 -right-6 w-40 sm:w-48 h-40 sm:h-48 text-[#4285F4]/25 pointer-events-none hidden sm:block" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 8" />
                  </svg>

                  {/* Precision Graphic SVG Arc in Google Red */}
                  <svg className="absolute -bottom-6 -left-6 w-36 sm:w-44 h-36 sm:h-44 text-[#EA4335]/20 pointer-events-none hidden sm:block" viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 6" />
                  </svg>
                </div>

                {/* ----------------------------------------------------- */}
                {/* 2. MIDDLE: Large Lifestyle Model Campaign Image       */}
                {/* Clear, art-directed, stylish model wearing the hoodie */}
                {/* ----------------------------------------------------- */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.94, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className="relative z-10 rounded-[28px] sm:rounded-[36px] overflow-hidden border border-[#2A2E33] bg-[#17191C] shadow-[0_25px_60px_rgba(0,0,0,0.85)] group"
                >
                  {/* Subtle Google-colour ambient glow framing the frame */}
                  <div className="absolute -inset-0.5 bg-gradient-to-tr from-[#4285F4]/30 via-transparent to-[#FBBC05]/20 rounded-[30px] sm:rounded-[38px] blur-sm opacity-50 group-hover:opacity-80 transition-opacity duration-700 pointer-events-none" />

                  {/* High-Resolution Model Visual Container */}
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#17191C]">
                    <img
                      src={campaignModelImg}
                      alt="Campaign model wearing the authentic Google 1998 Retro black pullover hoodie with four-color rainbow sleeve stripes"
                      className="w-full h-full object-cover object-top sm:object-center group-hover:scale-[1.02] transition-transform duration-700 ease-out"
                      loading="eager"
                    />

                    {/* Subtle Cinematic Vignette at Base for depth */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D0F]/80 via-[#0B0D0F]/15 to-transparent pointer-events-none" />

                    {/* Archival Lookbook Badge Top-Right */}
                    <div className="absolute top-3.5 sm:top-5 right-3.5 sm:right-5 px-3 py-1.5 rounded-full bg-[#0B0D0F]/80 backdrop-blur-md border border-white/15 text-[10px] sm:text-xs font-mono font-medium text-white flex items-center gap-1.5 shadow-md">
                      <span className="w-2 h-2 rounded-full bg-[#EA4335]" />
                      <span className="tracking-wide">Archival Lookbook</span>
                    </div>

                    {/* Campaign Studio Tag at Bottom-Right */}
                    <div className="absolute bottom-3.5 sm:bottom-5 right-3.5 sm:right-5 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0B0D0F]/85 backdrop-blur-md border border-white/10 text-[10px] sm:text-[11px] font-mono text-[#E8EAED] pointer-events-none shadow-md">
                      <Sparkles className="w-3.5 h-3.5 text-[#FBBC05]" />
                      <span>California Studio Drop</span>
                    </div>
                  </div>
                </motion.div>

                {/* ----------------------------------------------------- */}
                {/* 3. FOREGROUND: Floating 1998 Retro Product Card       */}
                {/* Overlapping the bottom-left of the model frame        */}
                {/* ----------------------------------------------------- */}
                {mainPullover && (
                  <motion.div
                    initial={{ opacity: 0, y: 25, x: -15, scale: 0.92 }}
                    animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                    transition={{ delay: 0.35, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    onClick={() => onSelectProduct && onSelectProduct(mainPullover)}
                    className="absolute -bottom-5 sm:-bottom-7 -left-3 sm:-left-6 z-20 w-[185px] sm:w-[220px] md:w-[235px] rounded-2xl sm:rounded-3xl bg-[#111315]/95 backdrop-blur-xl border border-[#4285F4]/40 hover:border-[#4285F4] p-3 sm:p-3.5 shadow-[0_20px_50px_rgba(0,0,0,0.9)] hover:scale-103 transition-all duration-300 cursor-pointer group"
                    title="View 1998 Marine Layer Pullover Hoodie product details"
                  >
                    {/* Category & Price Badge Header */}
                    <div className="flex items-center justify-between mb-2 sm:mb-2.5">
                      <span className="px-2 py-0.5 rounded-full bg-[#4285F4]/15 border border-[#4285F4]/30 text-[#8AB4F8] text-[10px] sm:text-[11px] font-semibold tracking-wide">
                        1998 Retro Drop
                      </span>
                      <span className="text-[11px] sm:text-xs font-mono font-bold text-white bg-[#4285F4] px-2 py-0.5 rounded-md shadow-sm">
                        ${mainPullover.price}
                      </span>
                    </div>

                    {/* Clean White Product Inset Stage */}
                    <div className="w-full aspect-square rounded-xl sm:rounded-2xl bg-white p-2.5 sm:p-3 flex items-center justify-center overflow-hidden relative mb-2 sm:mb-2.5">
                      <img
                        src={mainPullover.image}
                        alt={mainPullover.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-contain group-hover:scale-106 transition-transform duration-500 ease-out"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                        <span className="px-2.5 py-1 rounded-full bg-[#0B0D0F]/90 text-white text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-xs">
                          <Eye className="w-3 h-3 text-[#4285F4]" />
                          Quick View
                        </span>
                      </div>
                    </div>

                    {/* Product Card Title & Details */}
                    <div className="space-y-0.5">
                      <h3 className="text-xs sm:text-sm font-bold text-white tracking-tight group-hover:text-[#4285F4] transition-colors truncate">
                        {mainPullover.name}
                      </h3>
                      <p className="text-[10px] sm:text-[11px] text-[#9AA0A6] truncate">
                        Supima Micro-Modal • Knit Stripe
                      </p>
                    </div>
                  </motion.div>
                )}

              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
