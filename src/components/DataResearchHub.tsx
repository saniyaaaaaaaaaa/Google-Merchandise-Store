import React, { useState, useEffect } from 'react';
import { GA4_RESEARCH_DATA, getEventStream, subscribeToAnalytics } from '../services/analytics';
import { GA4Event } from '../types';
import {
  BarChart3,
  TrendingUp,
  Activity,
  Users,
  Globe,
  Flame,
  ArrowDownRight,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Clock,
  Layers,
  Zap,
  RotateCcw,
  X
} from 'lucide-react';

interface DataResearchHubProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DataResearchHub: React.FC<DataResearchHubProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'decisions' | 'events' | 'funnel'>('overview');
  const [events, setEvents] = useState<GA4Event[]>([]);

  useEffect(() => {
    setEvents(getEventStream());
    const unsubscribe = subscribeToAnalytics((allEvents) => {
      setEvents(allEvents);
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  return (
    <div
      id="research-hub-backdrop"
      className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
    >
      <div
        id="research-hub-container"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#242220] text-[#EFECE6] rounded-3xl max-w-5xl w-full p-6 sm:p-10 shadow-2xl border border-[#383531] relative max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-[#383531]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C85A32]/20 text-[#C85A32] flex items-center justify-center">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#C85A32]">
                  Academic Redesign Report
                </span>
                <span className="px-2 py-0.5 rounded-full bg-[#4A6B53]/20 text-[#6B9E78] text-[10px] font-mono font-bold">
                  GA4 Live Telemetry Active
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#FAF8F5] font-display">
                Google Merchandise Store — Data-Backed Redesign
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[#383531] text-stone-400 hover:text-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-4 sm:gap-6 border-b border-[#383531] pt-4 pb-2 overflow-x-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview' ? 'text-[#C85A32] border-b-2 border-[#C85A32]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>GA4 Baseline Metrics</span>
          </button>

          <button
            onClick={() => setActiveTab('funnel')}
            className={`pb-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'funnel' ? 'text-[#C85A32] border-b-2 border-[#C85A32]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Funnel Leak Analysis</span>
          </button>

          <button
            onClick={() => setActiveTab('decisions')}
            className={`pb-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'decisions' ? 'text-[#C85A32] border-b-2 border-[#C85A32]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>10 Data-Backed UX Solutions</span>
          </button>

          <button
            onClick={() => setActiveTab('events')}
            className={`pb-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'events' ? 'text-[#6B9E78] border-b-2 border-[#6B9E78]' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Live Event Inspector ({events.length})</span>
          </button>
        </div>

        {/* TAB 1: GA4 Baseline Metrics */}
        {activeTab === 'overview' && (
          <div className="py-6 space-y-6 animate-fade-in">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-[#1E1D1B] border border-[#383531]">
                <span className="text-[11px] uppercase font-mono text-stone-400 block">Active Users (28 Days)</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-white">
                  {GA4_RESEARCH_DATA.activeUsers.toLocaleString()}
                </span>
                <span className="text-[11px] text-stone-400 block mt-1">75K new (88.2%)</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#1E1D1B] border border-[#383531]">
                <span className="text-[11px] uppercase font-mono text-stone-400 block">Avg. Engagement</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#C99436]">
                  {GA4_RESEARCH_DATA.avgEngagementTimeSec}s
                </span>
                <span className="text-[11px] text-stone-400 block mt-1">High drop-off velocity</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#1E1D1B] border border-[#383531]">
                <span className="text-[11px] uppercase font-mono text-stone-400 block">Homepage Bounce</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#C85A32]">
                  {(GA4_RESEARCH_DATA.homepageBounceRate * 100).toFixed(0)}%
                </span>
                <span className="text-[11px] text-stone-400 block mt-1">Immediate visitor exit</span>
              </div>

              <div className="p-4 rounded-2xl bg-[#1E1D1B] border border-[#383531]">
                <span className="text-[11px] uppercase font-mono text-stone-400 block">Completed Purchases</span>
                <span className="text-2xl sm:text-3xl font-extrabold font-mono text-[#6B9E78]">
                  1,029
                </span>
                <span className="text-[11px] text-stone-400 block mt-1">69% cart-to-buy rate</span>
              </div>
            </div>

            {/* Traffic & Geographic Distribution */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Traffic Sources */}
              <div className="p-5 rounded-2xl bg-[#1E1D1B] border border-[#383531] space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Globe className="w-4 h-4 text-[#C85A32]" />
                  <span>Session Traffic Acquisition</span>
                </h3>
                <div className="space-y-2 text-xs font-mono">
                  <div>
                    <div className="flex justify-between text-stone-300">
                      <span>Direct</span>
                      <span>64,000 sessions (64%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#383531] rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-[#C85A32]" style={{ width: '64%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-stone-300">
                      <span>Organic Search</span>
                      <span>25,000 sessions (25%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#383531] rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-[#4A6B53]" style={{ width: '25%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-stone-300">
                      <span>Paid Search</span>
                      <span>11,000 sessions (11%)</span>
                    </div>
                    <div className="w-full h-2 bg-[#383531] rounded-full mt-1 overflow-hidden">
                      <div className="h-full bg-[#C99436]" style={{ width: '11%' }} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Metro Hubs */}
              <div className="p-5 rounded-2xl bg-[#1E1D1B] border border-[#383531] space-y-3">
                <h3 className="font-bold text-white text-sm flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#4A6B53]" />
                  <span>Tech Metro Concentrations</span>
                </h3>
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-xl bg-[#2D2B28] border border-[#383531]">
                    <span className="text-[10px] text-stone-400 uppercase font-mono block">New York</span>
                    <span className="text-base font-bold text-white font-mono">7,400</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#2D2B28] border border-[#383531]">
                    <span className="text-[10px] text-stone-400 uppercase font-mono block">Mountain View</span>
                    <span className="text-base font-bold text-white font-mono">5,300</span>
                  </div>
                  <div className="p-3 rounded-xl bg-[#2D2B28] border border-[#383531]">
                    <span className="text-[10px] text-stone-400 uppercase font-mono block">San Francisco</span>
                    <span className="text-base font-bold text-white font-mono">3,400</span>
                  </div>
                </div>
                <p className="text-[11px] text-stone-400 italic">
                  Key Insight: Strongest demand is concentrated among tech hubs, developers, and campus visitors who value authentic Google heritage.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Funnel Leak Analysis */}
        {activeTab === 'funnel' && (
          <div className="py-6 space-y-6 animate-fade-in">
            <div className="p-5 rounded-2xl bg-red-950/30 border border-red-800/40 text-red-200 text-xs sm:text-sm leading-relaxed">
              <strong className="font-bold text-red-100 block mb-1">The Critical Funnel Leak:</strong>
              The data proves checkout is healthy (69.1% of cart additions convert to purchase!). The massive failure happens at the very beginning: 85,000 visitors arrive, 67% bounce immediately, and only 3% ever reach a product page.
            </div>

            {/* Visual Funnel Step Sequence */}
            <div className="space-y-3 font-mono text-xs">
              <div className="p-4 rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Step 1: Visitors Arrive</span>
                  <span className="font-bold text-white text-base">85,000 Active Users</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-blue-500/20 text-[#4285F4] font-bold">100% Baseline</span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-between border-l-4 border-l-[#EA4335]">
                <div>
                  <span className="text-[#EA4335] block text-[10px] uppercase font-bold">⚠️ The Discovery Cliff (67% Bounce)</span>
                  <span className="font-bold text-white text-base">~28,000 Engaged Visitors</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-red-500/20 text-[#EA4335] font-bold">-67% Drop-off</span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Step 3: Cart Additions</span>
                  <span className="font-bold text-white text-base">2,561 Items Added to Bag</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-amber-500/20 text-[#FBBC05] font-bold">3.0% Rate</span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-between">
                <div>
                  <span className="text-gray-400 block text-[10px] uppercase">Step 4: Began Checkout</span>
                  <span className="font-bold text-white text-base">1,488 Initiated Checkout</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-400 font-bold">58.1% of Cart</span>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/80 border border-gray-700 flex items-center justify-between border-l-4 border-l-[#34A853]">
                <div>
                  <span className="text-[#34A853] block text-[10px] uppercase font-bold">✓ High Conversion at End</span>
                  <span className="font-bold text-white text-base">1,029 Completed Purchases</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-[#34A853] font-bold">69.1% of Checkout</span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: 10 Data-Backed UX Solutions */}
        {activeTab === 'decisions' && (
          <div className="py-6 space-y-4 animate-fade-in max-h-[500px] overflow-y-auto pr-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#EA4335] font-mono">
                  <span>01. 1998 Retro Hero Spotlight</span>
                </div>
                <p className="text-xs text-gray-300">
                  <strong>Data:</strong> &ldquo;Retro Vibes in Full Color&rdquo; had only 9.5% bounce rate vs. 42% on generic banners.
                  <br /><strong>UX:</strong> Dedicated hero feature, archival story, and instant capsule entry.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4285F4] font-mono">
                  <span>02. &ldquo;New Here? Start Here.&rdquo; Matrix</span>
                </div>
                <p className="text-xs text-gray-300">
                  <strong>Data:</strong> 88% of visitors are 1st-time users with 53s engagement window.
                  <br /><strong>UX:</strong> Segmented 4-pathway gateway immediately below hero for instant orientation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#34A853] font-mono">
                  <span>03. Zero-Click Quick Add & Flip</span>
                </div>
                <p className="text-xs text-gray-300">
                  <strong>Data:</strong> Shoppers bounced before opening PDPs.
                  <br /><strong>UX:</strong> Cards show color swatches, hover angle flip, ratings, and instant 1-click add.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#FBBC05] font-mono">
                  <span>04. Silicon Valley & NYC Hub Filters</span>
                </div>
                <p className="text-xs text-gray-300">
                  <strong>Data:</strong> Over 16K sessions come from Bay Area and New York tech employees.
                  <br /><strong>UX:</strong> Personalized commuter and developer recommendation algorithms.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4285F4] font-mono">
                  <span>05. Instant Algolia-Style Discovery</span>
                </div>
                <p className="text-xs text-gray-300">
                  <strong>Data:</strong> 25K organic/direct search visitors with high intent.
                  <br /><strong>UX:</strong> Full keyboard shortcut (Cmd+K), instant predictive results, and tag filtering.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-800/50 border border-gray-700 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#EA4335] font-mono">
                  <span>06. Limited Drops & VIP Countdown</span>
                </div>
                <p className="text-xs text-gray-300">
                  <strong>Data:</strong> Only 16% returning users due to static store experience.
                  <br /><strong>UX:</strong> Weekly drop schedule, countdown timer, and newsletter VIP alert capture.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Live Event Inspector */}
        {activeTab === 'events' && (
          <div className="py-6 space-y-4 animate-fade-in">
            <div className="flex items-center justify-between text-xs font-mono text-gray-400">
              <span>Real-Time GA4 Event Stream</span>
              <span>{events.length} Events Captured</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/80 font-mono text-xs border border-gray-800 space-y-2 max-h-96 overflow-y-auto">
              {events.map((ev, i) => (
                <div key={i} className="pb-2 border-b border-gray-800/60 last:border-0">
                  <div className="flex items-center justify-between text-[#34A853]">
                    <span className="font-bold">event: {ev.eventName}</span>
                    <span className="text-gray-500 text-[10px]">{new Date(ev.timestamp).toLocaleTimeString()}</span>
                  </div>
                  <pre className="text-gray-300 text-[11px] overflow-x-auto mt-1">
                    {JSON.stringify(ev.params, null, 2)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t border-gray-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-gray-800 hover:bg-gray-700 text-white text-xs font-bold transition-colors"
          >
            Close Research Panel
          </button>
        </div>
      </div>
    </div>
  );
};
