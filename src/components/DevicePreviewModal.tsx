import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { StoreTemplate } from '../data/templates';
import { 
  X, 
  Monitor, 
  Tablet, 
  Smartphone, 
  Eye, 
  Sliders, 
  ExternalLink,
  Sparkles,
  Check
} from 'lucide-react';

export const DevicePreviewModal: React.FC = () => {
  const { previewDeviceTemplate, setPreviewDeviceTemplate, applyTemplate, setCurrentPage, setIsStudioEditorOpen, showToast } = useShop();

  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  if (!previewDeviceTemplate) return null;

  const handleApplyAndGo = () => {
    applyTemplate(previewDeviceTemplate.id);
    setPreviewDeviceTemplate(null);
    setCurrentPage('home');
    showToast(`Loaded "${previewDeviceTemplate.name}" in live storefront!`, 'success');
  };

  const handleApplyAndEdit = () => {
    applyTemplate(previewDeviceTemplate.id);
    setPreviewDeviceTemplate(null);
    setIsStudioEditorOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col overflow-hidden animate-fade-in">
      {/* Device Toolbar */}
      <div className="bg-[#111827] text-white border-b border-gray-800 px-4 py-3 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white flex items-center gap-1.5">
            <Monitor className="w-4 h-4 text-[#2563EB]" />
            Template Preview: <strong className="text-blue-400">{previewDeviceTemplate.name}</strong>
          </span>
        </div>

        {/* Device Mode Switcher */}
        <div className="flex items-center bg-slate-900 border border-gray-800 rounded-full p-1 gap-1">
          <button
            onClick={() => setDevice('desktop')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              device === 'desktop' ? 'bg-[#2563EB] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              device === 'tablet' ? 'bg-[#2563EB] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              device === 'mobile' ? 'bg-[#2563EB] text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleApplyAndGo}
            className="py-2 px-4 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Use This Template</span>
          </button>

          <button
            onClick={handleApplyAndEdit}
            className="py-2 px-4 bg-white hover:bg-gray-100 text-[#111827] font-extrabold text-xs rounded-full cursor-pointer flex items-center gap-1.5"
          >
            <Sliders className="w-3.5 h-3.5 text-[#2563EB]" />
            <span>Customize</span>
          </button>

          <button
            onClick={() => setPreviewDeviceTemplate(null)}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Frame Canvas */}
      <div className="flex-1 bg-slate-900 p-6 flex items-center justify-center overflow-auto">
        <div
          className={`transition-all duration-300 bg-white shadow-2xl overflow-hidden flex flex-col ${
            device === 'desktop' ? 'w-full max-w-6xl h-[85vh] rounded-[32px]' : ''
          } ${device === 'tablet' ? 'w-[768px] h-[80vh] rounded-[32px] border-8 border-slate-800' : ''} ${
            device === 'mobile' ? 'w-[375px] h-[720px] rounded-[48px] border-[12px] border-slate-800' : ''
          }`}
        >
          {/* Top Mock Window Bar */}
          <div className="bg-slate-100 border-b border-gray-200 px-4 py-2 flex items-center gap-2 shrink-0">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            </div>
            <div className="flex-1 text-center bg-white rounded-full px-3 py-0.5 text-[10px] text-gray-500 font-mono border border-gray-200 truncate">
              https://google-merch-shop.wix.com/{previewDeviceTemplate.id}
            </div>
          </div>

          {/* Rendered Preview Mock */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50">
            <div 
              className="p-8 sm:p-12 rounded-[32px] text-white space-y-4 shadow-lg"
              style={{ backgroundColor: previewDeviceTemplate.colorPalette.primary }}
            >
              <span className="px-3 py-1 bg-white/20 text-white font-black text-xs uppercase tracking-wider rounded-full inline-block">
                {previewDeviceTemplate.themeSettings.heroBadge}
              </span>
              <h1 className="text-2xl sm:text-4xl font-black leading-tight">
                {previewDeviceTemplate.themeSettings.heroTitle}
              </h1>
              <p className="text-xs sm:text-sm text-white/90 max-w-lg leading-relaxed">
                {previewDeviceTemplate.themeSettings.heroSubtitle}
              </p>
              <button className="py-3 px-8 bg-white text-[#111827] font-black text-xs rounded-full shadow-md cursor-pointer">
                Explore Storefront
              </button>
            </div>

            {/* Features List */}
            <div className="bg-white p-6 rounded-[28px] border border-gray-200 space-y-3">
              <h3 className="text-sm font-extrabold text-[#111827]">Included Storefront Features</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {previewDeviceTemplate.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-700">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
