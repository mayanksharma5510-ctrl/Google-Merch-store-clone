import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, TrendingUp, Zap, MousePointerClick, Smartphone, ShoppingCart, CheckCircle, BarChart3, HelpCircle } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { GA4_STRATEGY_DATA } from '../data/analytics';

export const GA4StrategyModal: React.FC = () => {
  const { isGA4ModalOpen, setIsGA4ModalOpen } = useShop();
  const [activeTab, setActiveTab] = useState<'overview' | 'simulator'>('overview');
  const [isOptimized, setIsOptimized] = useState(true);

  if (!isGA4ModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsGA4ModalOpen(false)}
          className="fixed inset-0 bg-gray-900/60 backdrop-blur-xs"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden z-10 my-8"
        >
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-gray-900 via-blue-950 to-gray-900 text-white flex items-center justify-between relative overflow-hidden">
            <div className="relative z-10 flex items-center gap-3">
              <div className="p-3 bg-blue-600/30 border border-blue-400/30 rounded-2xl text-blue-400 backdrop-blur-md">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800/50">
                    GA4 Analytics Blueprint
                  </span>
                </div>
                <h2 className="text-xl font-bold tracking-tight text-white mt-1">
                  MerchFlow Conversion Engine
                </h2>
                <p className="text-xs text-gray-300">
                  UX strategy & architectural solutions solving Google Merch Shop GA4 bounce issues.
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsGA4ModalOpen(false)}
              className="p-2 text-gray-400 hover:text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50/80 px-6">
            <button
              onClick={() => setActiveTab('overview')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <Zap className="w-4 h-4" />
              <span>4 Core UX Fixes</span>
            </button>
            <button
              onClick={() => setActiveTab('simulator')}
              className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors ${
                activeTab === 'simulator'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Live Metric Simulator</span>
            </button>
          </div>

          {/* Content Body */}
          <div className="p-6 max-h-[70vh] overflow-y-auto">
            {activeTab === 'overview' ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                  <div className="p-3 bg-blue-50/60 rounded-2xl border border-blue-100">
                    <span className="block text-xl font-bold text-blue-600">-38%</span>
                    <span className="text-[11px] font-medium text-gray-600">Bounce Rate</span>
                  </div>
                  <div className="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100">
                    <span className="block text-xl font-bold text-emerald-600">+45%</span>
                    <span className="text-[11px] font-medium text-gray-600">Pages/Session</span>
                  </div>
                  <div className="p-3 bg-indigo-50/60 rounded-2xl border border-indigo-100">
                    <span className="block text-xl font-bold text-indigo-600">+34%</span>
                    <span className="text-[11px] font-medium text-gray-600">Add-to-Cart</span>
                  </div>
                  <div className="p-3 bg-purple-50/60 rounded-2xl border border-purple-100">
                    <span className="block text-xl font-bold text-purple-600">-42%</span>
                    <span className="text-[11px] font-medium text-gray-600">Abandonment</span>
                  </div>
                </div>

                <div className="space-y-4">
                  {GA4_STRATEGY_DATA.map((item, idx) => (
                    <div
                      key={item.id}
                      className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2 hover:bg-white hover:border-gray-300 transition-all shadow-2xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-blue-600 text-white text-xs font-bold flex items-center justify-center">
                            0{idx + 1}
                          </span>
                          <h3 className="text-sm font-bold text-gray-900">{item.metric}</h3>
                        </div>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-extrabold bg-emerald-100 text-emerald-800">
                          {item.impact}
                        </span>
                      </div>

                      <div className="text-xs text-gray-600 grid grid-cols-1 md:grid-cols-2 gap-2 pt-1">
                        <div className="bg-rose-50/80 p-2.5 rounded-xl border border-rose-100">
                          <strong className="text-rose-900 block mb-0.5">GA4 Problem Identified:</strong>
                          <p className="text-rose-800">{item.problem}</p>
                        </div>
                        <div className="bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-100">
                          <strong className="text-emerald-900 block mb-0.5">Architecture Solution:</strong>
                          <p className="text-emerald-800">{item.solution}</p>
                        </div>
                      </div>

                      <div className="pt-1 flex items-center gap-1.5 text-[11px] text-gray-500 font-medium">
                        <CheckCircle className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>Live Feature: <strong>{item.featureImplemented}</strong></span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-blue-950">Compare Store Performance</h3>
                    <p className="text-xs text-blue-800">
                      Toggle between the legacy baseline shop and the GA4-optimized MerchFlow experience.
                    </p>
                  </div>
                  <button
                    onClick={() => setIsOptimized(!isOptimized)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                      isOptimized
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'bg-gray-200 text-gray-800'
                    }`}
                  >
                    {isOptimized ? '✨ GA4 Optimized Mode' : '⚠️ Legacy Baseline'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 bg-white border border-gray-200 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Avg Session Duration
                    </span>
                    <p className="text-3xl font-extrabold text-gray-900">
                      {isOptimized ? '3m 42s' : '1m 12s'}
                    </p>
                    <span className={`text-xs font-semibold ${isOptimized ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isOptimized ? '+208% increase in engagement' : 'High bounce early drop-off'}
                    </span>
                  </div>

                  <div className="p-5 bg-white border border-gray-200 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Add-to-Cart Rate
                    </span>
                    <p className="text-3xl font-extrabold text-gray-900">
                      {isOptimized ? '8.4%' : '2.1%'}
                    </p>
                    <span className={`text-xs font-semibold ${isOptimized ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isOptimized ? '4x higher conversion rate' : 'Burying add-to-cart controls'}
                    </span>
                  </div>

                  <div className="p-5 bg-white border border-gray-200 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Mobile Checkout Drop-Off
                    </span>
                    <p className="text-3xl font-extrabold text-gray-900">
                      {isOptimized ? '18%' : '64%'}
                    </p>
                    <span className={`text-xs font-semibold ${isOptimized ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isOptimized ? 'Optimized mobile bottom bar' : 'High friction form fields'}
                    </span>
                  </div>

                  <div className="p-5 bg-white border border-gray-200 rounded-2xl space-y-3">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                      Cart Value (AOV)
                    </span>
                    <p className="text-3xl font-extrabold text-gray-900">
                      {isOptimized ? '$114.50' : '$62.00'}
                    </p>
                    <span className={`text-xs font-semibold ${isOptimized ? 'text-emerald-600' : 'text-rose-600'}`}>
                      {isOptimized ? 'Driven by Bundle Offers & Free Ship Bar' : 'Single item checkouts'}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <p className="text-xs text-gray-500">
              Built for Google Merch Shop • Responsive Front-End Architecture
            </p>
            <button
              onClick={() => setIsGA4ModalOpen(false)}
              className="px-4 py-2 bg-gray-900 hover:bg-black text-white text-xs font-semibold rounded-xl transition-colors"
            >
              Back to Shopping
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
