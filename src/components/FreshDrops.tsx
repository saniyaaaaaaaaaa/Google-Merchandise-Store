import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Product } from '../types';
import { Bell, Clock, CheckCircle2, ArrowRight, ShieldCheck, Mail, Sparkles } from 'lucide-react';
import { trackNewsletterSignup } from '../services/analytics';

interface FreshDropsProps {
  newDropProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const FreshDrops: React.FC<FreshDropsProps> = ({
  newDropProducts,
  onSelectProduct
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15
  });

  // Countdown timer simulation for the next limited drop
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      trackNewsletterSignup(email.trim(), 'fresh_drops_section');
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const displayDrops = newDropProducts.slice(0, 4);

  return (
    <section className="py-14 sm:py-20 bg-[#0B0D0F] border-b border-[#2A2E33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Countdown & VIP Notification Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-3xl bg-gradient-to-br from-[#17191C] via-[#111315] to-[#17191C] border border-[#2A2E33] text-white p-8 sm:p-12 lg:p-14 shadow-2xl relative overflow-hidden"
        >
          {/* Accent Google 4-Color Top Border */}
          <div className="absolute top-0 inset-x-0 h-1 flex">
            <div className="flex-1 bg-[#4285F4]" />
            <div className="flex-1 bg-[#EA4335]" />
            <div className="flex-1 bg-[#FBBC05]" />
            <div className="flex-1 bg-[#34A853]" />
          </div>

          {/* Subtle Accent Glows */}
          <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#4285F4]/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute -left-20 -top-20 w-96 h-96 bg-[#EA4335]/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10">
            {/* Left: Drop Schedule & Countdown */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs font-mono text-[#E8EAED]">
                <Clock className="w-3.5 h-3.5 text-[#FBBC05]" />
                <span>NEXT CAPSULE DROP IN</span>
              </div>

              <div className="space-y-2">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display leading-tight text-white">
                  From the screen to the street.
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC05]">
                    Limited drops every Thursday.
                  </span>
                </h2>
                <p className="text-[#9AA0A6] text-sm sm:text-base leading-relaxed max-w-xl">
                  Tech culture, made wearable. Never miss an archival revival or developer capsule with 1-hour early access and VIP restock alerts.
                </p>
              </div>

              {/* Countdown Display Units */}
              <div className="grid grid-cols-4 gap-2 sm:gap-4 max-w-md pt-2">
                <div className="bg-[#0B0D0F]/80 backdrop-blur-md border border-[#2A2E33] rounded-2xl p-3 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {String(timeLeft.days).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#9AA0A6] mt-1">Days</div>
                </div>
                <div className="bg-[#0B0D0F]/80 backdrop-blur-md border border-[#2A2E33] rounded-2xl p-3 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#9AA0A6] mt-1">Hours</div>
                </div>
                <div className="bg-[#0B0D0F]/80 backdrop-blur-md border border-[#2A2E33] rounded-2xl p-3 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#9AA0A6] mt-1">Mins</div>
                </div>
                <div className="bg-[#0B0D0F]/80 backdrop-blur-md border border-[#2A2E33] rounded-2xl p-3 text-center">
                  <div className="text-2xl sm:text-3xl font-extrabold font-mono text-[#FBBC05]">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-[10px] uppercase font-bold text-[#9AA0A6] mt-1">Secs</div>
                </div>
              </div>

              {/* Retention Explanation Pill */}
              <div className="text-xs text-[#9AA0A6] font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#34A853]" />
                <span>Limited batches released weekly • Exclusively at Google Merchandise Store</span>
              </div>
            </div>

            {/* Right: Interactive Drop Alert Capture Box */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl bg-[#17191C] text-white p-6 sm:p-8 shadow-2xl border border-[#2A2E33]">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#4285F4] font-mono mb-2">
                  <Bell className="w-4 h-4" />
                  <span>VIP Drop Notification</span>
                </div>

                <h3 className="text-xl font-bold font-display text-white">
                  Get drop alerts in your inbox
                </h3>
                <p className="text-xs text-[#9AA0A6] mt-1 mb-5">
                  Join 45,000+ Googlers, alumni, and tech enthusiasts. No spam, ever.
                </p>

                {subscribed ? (
                  <div className="p-4 rounded-xl bg-[#34A853]/15 border border-[#34A853]/40 text-[#81C995] flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#34A853] shrink-0" />
                    <div className="text-xs">
                      <strong className="font-bold block text-white">You’re on the VIP list!</strong>
                      Check your inbox for your 15% welcome code: <code className="font-mono font-bold text-[#FBBC05]">RETRO1998</code>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubscribe} className="space-y-3">
                    <div className="relative">
                      <Mail className="w-5 h-5 text-[#9AA0A6] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="developer@company.com"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#2A2E33] text-sm focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:border-transparent text-white placeholder:text-[#5F6368] bg-[#0B0D0F]"
                      />
                    </div>

                    <motion.button
                      type="submit"
                      id="subscribe-drops-btn"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-3.5 px-4 rounded-xl bg-[#4285F4] hover:bg-[#3367D6] text-white text-sm font-bold shadow-lg shadow-[#4285F4]/20 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Notify Me First</span>
                      <ArrowRight className="w-4 h-4" />
                    </motion.button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#9AA0A6] pt-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#34A853]" />
                      <span>Instant 1-click unsubscribe at any time</span>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dedicated Upcoming Drops Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase font-bold tracking-wider text-[#34A853] mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Upcoming Capsule Lineup</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                Preview this week’s arrivals
              </h3>
            </div>
            <div className="text-xs font-mono text-[#9AA0A6] hidden sm:block">
              Exclusive Non-Repeating Release
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {displayDrops.map((product) => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => onSelectProduct(product)}
                className="bg-[#111315] rounded-2xl p-4 border border-[#2A2E33] hover:border-[#4285F4]/60 shadow-lg transition-all flex flex-col justify-between cursor-pointer group"
              >
                <div>
                  <div className="relative aspect-square w-full rounded-xl bg-gradient-to-b from-[#FFFFFF] to-[#F1F3F4] p-4 flex items-center justify-center overflow-hidden mb-3">
                    <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#34A853] text-white uppercase tracking-wider shadow-xs">
                      {product.badge || 'NEW DROP'}
                    </span>
                    <img
                      src={product.image}
                      alt={product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain filter drop-shadow-sm transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="text-[11px] font-mono uppercase text-[#9AA0A6] tracking-wider">
                    {product.collection || product.category}
                  </div>
                  <h4 className="font-bold text-sm text-white mt-0.5 line-clamp-2 leading-snug group-hover:text-[#4285F4] transition-colors">
                    {product.name}
                  </h4>
                </div>

                <div className="mt-4 pt-3 border-t border-[#2A2E33] flex items-center justify-between">
                  <span className="text-base font-extrabold font-mono text-white">
                    ${product.price}
                  </span>
                  <span className="text-xs font-semibold text-[#8AB4F8] group-hover:text-[#4285F4] group-hover:translate-x-0.5 transition-all flex items-center gap-1">
                    <span>View Piece</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
