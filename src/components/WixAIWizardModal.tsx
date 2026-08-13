import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ECOMMERCE_TEMPLATES } from '../data/templates';
import { 
  X, 
  Wand2, 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  ShoppingBag, 
  Cpu, 
  Smartphone, 
  Leaf, 
  Building2, 
  Palette, 
  ShieldCheck, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export const WixAIWizardModal: React.FC = () => {
  const { isAIWizardOpen, setIsAIWizardOpen, applyTemplate, updateThemeSettings, setCurrentPage, showToast } = useShop();

  const [step, setStep] = useState<number>(1);
  const [selectedFocus, setSelectedFocus] = useState<string>('apparel');
  const [selectedVibe, setSelectedVibe] = useState<string>('editorial');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(['ga4', 'gpay', 'shipping']);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  if (!isAIWizardOpen) return null;

  const focusOptions = [
    { id: 'apparel', label: 'Developer Apparel & Hoodies', icon: ShoppingBag, templateId: 'editorial-minimal' },
    { id: 'hardware', label: 'Pixel Tech & Smart Hardware', icon: Cpu, templateId: 'pixel-tech-dark' },
    { id: 'android', label: 'Android & Bugdroid Collectibles', icon: Smartphone, templateId: 'android-bugdroid' },
    { id: 'eco', label: '100% Sustainable Organic Merch', icon: Leaf, templateId: 'sustainable-eco' },
    { id: 'campus', label: 'Mountain View Campus Visitor Gear', icon: Building2, templateId: 'google-campus' },
  ];

  const vibeOptions = [
    { id: 'editorial', label: 'Minimalist Editorial', desc: 'High-contrast display typography, off-white canvas, blue accents.' },
    { id: 'dark', label: 'Dark Tech Luxury', desc: 'Sleek dark mode atmosphere, glowing quad-color highlights.' },
    { id: 'vibrant', label: 'Playful & Vibrant', desc: 'Energetic Android Green branding, bold badges, fun sticker grids.' },
    { id: 'ga4', label: 'High-Conversion GA4 Powerhouse', desc: 'Data-driven layout with live order ticker and 1-click checkout.' },
  ];

  const toggleFeature = (id: string) => {
    setSelectedFeatures(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleGenerate = () => {
    setIsGenerating(true);

    setTimeout(() => {
      // Find matching template base
      const matched = focusOptions.find(f => f.id === selectedFocus) || focusOptions[0];
      applyTemplate(matched.templateId);

      // Customize theme according to wizard choices
      let primaryHex = '#2563EB';
      let bgStyle: 'white' | 'cream' | 'slate' = 'white';

      if (selectedVibe === 'dark') {
        primaryHex = '#3B82F6';
        bgStyle = 'slate';
      } else if (selectedVibe === 'vibrant') {
        primaryHex = '#16A34A';
        bgStyle = 'cream';
      } else if (selectedVibe === 'ga4') {
        primaryHex = '#D97706';
        bgStyle = 'white';
      }

      updateThemeSettings({
        primaryColor: primaryHex,
        bgStyle: bgStyle,
        enableGA4Ticker: selectedFeatures.includes('ga4'),
        heroBadge: `Wix AI Custom Generated • 2026`,
        heroTitle: `Custom Google Merch Shop for ${matched.label}`,
      });

      setIsGenerating(false);
      setIsAIWizardOpen(false);
      setStep(1);
      setCurrentPage('home');
      showToast('Wix AI generated your custom Google Merch Shop!', 'success');
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
      <div className="relative w-full max-w-2xl bg-white rounded-[32px] shadow-2xl overflow-hidden border border-gray-100 flex flex-col my-8">
        {/* Header */}
        <div className="bg-[#111827] text-white p-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#2563EB] rounded-full flex items-center justify-center text-white">
              <Wand2 className="w-4 h-4 text-amber-300" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-white flex items-center gap-1.5">
                <span>Wix AI Store Generator</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-extrabold border border-amber-400/30">
                  ADI 2.0
                </span>
              </h3>
              <p className="text-xs text-gray-400">Step {step} of 3 • Custom Google Merch Setup</p>
            </div>
          </div>

          <button
            onClick={() => setIsAIWizardOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wizard Content */}
        <div className="p-6 sm:p-8 space-y-6">
          {isGenerating ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 bg-blue-50 text-[#2563EB] rounded-full flex items-center justify-center mx-auto shadow-md animate-spin">
                <Wand2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#111827]">Synthesizing Storefront...</h3>
              <p className="text-xs text-[#6B7280] max-w-md mx-auto">
                Wix AI is generating your custom color palette, layout structure, hero typography, and GA4 telemetry configuration.
              </p>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">Question 1</span>
                    <h2 className="text-xl font-extrabold text-[#111827]">What is the primary focus of your Google Merch Store?</h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {focusOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = selectedFocus === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() => setSelectedFocus(opt.id)}
                          className={`p-4 rounded-2xl border text-left flex items-center gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 font-bold'
                              : 'border-gray-200 text-[#111827] hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div className={`p-2.5 rounded-xl ${isSelected ? 'bg-[#2563EB] text-white' : 'bg-gray-100 text-gray-600'}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold">{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">Question 2</span>
                    <h2 className="text-xl font-extrabold text-[#111827]">Choose your preferred visual design vibe</h2>
                  </div>

                  <div className="space-y-2.5">
                    {vibeOptions.map((vibe) => {
                      const isSelected = selectedVibe === vibe.id;
                      return (
                        <button
                          key={vibe.id}
                          onClick={() => setSelectedVibe(vibe.id)}
                          className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                            isSelected
                              ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 font-bold'
                              : 'border-gray-200 text-[#111827] hover:border-gray-300 bg-white'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-bold block text-[#111827]">{vibe.label}</span>
                            <span className="text-[11px] text-[#6B7280] font-normal">{vibe.desc}</span>
                          </div>
                          {isSelected && <CheckCircle2 className="w-5 h-5 text-[#2563EB] shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider block">Question 3</span>
                    <h2 className="text-xl font-extrabold text-[#111827]">Select features to enable on startup</h2>
                  </div>

                  <div className="space-y-2.5">
                    <button
                      onClick={() => toggleFeature('ga4')}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        selectedFeatures.includes('ga4')
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 font-bold'
                          : 'border-gray-200 text-[#111827] bg-white'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-[#111827]">GA4 Event Telemetry Banner</span>
                        <span className="text-[11px] text-[#6B7280] font-normal">Shows real-time purchase event stream</span>
                      </div>
                      <input type="checkbox" checked={selectedFeatures.includes('ga4')} readOnly className="w-4 h-4 text-[#2563EB]" />
                    </button>

                    <button
                      onClick={() => toggleFeature('gpay')}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between gap-3 transition-all cursor-pointer ${
                        selectedFeatures.includes('gpay')
                          ? 'border-[#2563EB] bg-blue-50 text-[#2563EB] ring-2 ring-blue-100 font-bold'
                          : 'border-gray-200 text-[#111827] bg-white'
                      }`}
                    >
                      <div>
                        <span className="text-xs font-bold block text-[#111827]">1-Click Google Pay Express Drawer</span>
                        <span className="text-[11px] text-[#6B7280] font-normal">Enable instant mobile checkout</span>
                      </div>
                      <input type="checkbox" checked={selectedFeatures.includes('gpay')} readOnly className="w-4 h-4 text-[#2563EB]" />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer Buttons */}
        {!isGenerating && (
          <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center justify-between">
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                className="py-3 px-6 bg-white border border-gray-200 text-[#111827] font-bold text-xs rounded-full hover:bg-gray-100 cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                onClick={() => setStep(step + 1)}
                className="py-3 px-8 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-xs cursor-pointer flex items-center gap-1.5"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleGenerate}
                className="py-3.5 px-8 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-md cursor-pointer flex items-center gap-2"
              >
                <Wand2 className="w-4 h-4 text-amber-300" />
                <span>Generate Storefront Now</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
