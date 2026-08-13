import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ECOMMERCE_TEMPLATES } from '../data/templates';
import { 
  X, 
  Sliders, 
  Monitor, 
  Tablet, 
  Smartphone, 
  RotateCcw, 
  Check, 
  Sparkles, 
  Palette, 
  Layout, 
  Type, 
  Grid, 
  BarChart3, 
  Eye, 
  ExternalLink,
  Wand2,
  Shield
} from 'lucide-react';

export const WixStudioEditorModal: React.FC = () => {
  const { 
    isStudioEditorOpen, 
    setIsStudioEditorOpen, 
    themeSettings, 
    updateThemeSettings, 
    activeTemplate, 
    applyTemplate,
    setCurrentPage,
    showToast
  } = useShop();

  const [viewportMode, setViewportMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [activeTab, setActiveTab] = useState<'branding' | 'colors' | 'layout' | 'features'>('branding');

  if (!isStudioEditorOpen) return null;

  const colorPresets = [
    { label: 'Google Blue', hex: '#2563EB' },
    { label: 'Android Green', hex: '#16A34A' },
    { label: 'Dark Charcoal', hex: '#111827' },
    { label: 'Pixel Coral', hex: '#EA4335' },
    { label: 'Deep Indigo', hex: '#4F46E5' },
    { label: 'Amber Conversion', hex: '#D97706' },
  ];

  const handlePublish = () => {
    setIsStudioEditorOpen(false);
    setCurrentPage('home');
    showToast(`Published theme updates for "${activeTemplate.name}" to live store!`, 'success');
  };

  const handleReset = () => {
    updateThemeSettings(activeTemplate.themeSettings);
    showToast('Reset theme to template default settings', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col overflow-hidden animate-fade-in">
      {/* Top Studio Toolbar */}
      <div className="bg-[#111827] text-white border-b border-gray-800 px-4 py-3 flex items-center justify-between gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 bg-[#2563EB] rounded-full flex items-center justify-center font-black text-xs text-white">
            W
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-white">Wix Studio Editor</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-extrabold border border-blue-500/30">
                LIVE CUSTOMIZER
              </span>
            </div>
            <p className="text-[11px] text-gray-400 truncate max-w-xs sm:max-w-md">
              Editing: <strong className="text-white">{activeTemplate.name}</strong>
            </p>
          </div>
        </div>

        {/* Viewport Controls */}
        <div className="hidden md:flex items-center bg-slate-900 border border-gray-800 rounded-full p-1 gap-1">
          <button
            onClick={() => setViewportMode('desktop')}
            className={`p-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewportMode === 'desktop' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Monitor className="w-3.5 h-3.5" />
            <span>Desktop</span>
          </button>
          <button
            onClick={() => setViewportMode('tablet')}
            className={`p-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewportMode === 'tablet' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Tablet className="w-3.5 h-3.5" />
            <span>Tablet</span>
          </button>
          <button
            onClick={() => setViewportMode('mobile')}
            className={`p-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              viewportMode === 'mobile' ? 'bg-[#2563EB] text-white shadow-xs' : 'text-gray-400 hover:text-white'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>Mobile</span>
          </button>
        </div>

        {/* Save / Publish / Close Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleReset}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
            title="Reset Settings"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={handlePublish}
            className="py-2 px-5 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Check className="w-4 h-4" />
            <span>Publish to Store</span>
          </button>

          <button
            onClick={() => setIsStudioEditorOpen(false)}
            className="p-2 text-gray-400 hover:text-white rounded-full hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Studio Body */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar Controls */}
        <div className="w-full sm:w-80 md:w-96 bg-white border-r border-gray-200 flex flex-col shrink-0 overflow-y-auto">
          {/* Template Switcher Dropdown */}
          <div className="p-4 bg-slate-50 border-b border-gray-200 space-y-1.5">
            <label className="text-[10px] font-extrabold text-[#6B7280] uppercase tracking-wider block">
              Active Template Base
            </label>
            <select
              value={activeTemplate.id}
              onChange={(e) => applyTemplate(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-full px-3.5 py-2 text-xs font-bold text-[#111827] focus:outline-none focus:border-[#2563EB]"
            >
              {ECOMMERCE_TEMPLATES.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.name} ({t.style})
                </option>
              ))}
            </select>
          </div>

          {/* Sidebar Tab Navigation */}
          <div className="grid grid-cols-4 border-b border-gray-200 bg-gray-50 text-[11px] font-bold text-[#6B7280]">
            <button
              onClick={() => setActiveTab('branding')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'branding' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent hover:text-[#111827]'
              }`}
            >
              <Type className="w-4 h-4" />
              <span>Copy</span>
            </button>
            <button
              onClick={() => setActiveTab('colors')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'colors' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent hover:text-[#111827]'
              }`}
            >
              <Palette className="w-4 h-4" />
              <span>Colors</span>
            </button>
            <button
              onClick={() => setActiveTab('layout')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'layout' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent hover:text-[#111827]'
              }`}
            >
              <Layout className="w-4 h-4" />
              <span>Layout</span>
            </button>
            <button
              onClick={() => setActiveTab('features')}
              className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'features' ? 'border-[#2563EB] text-[#2563EB] bg-white' : 'border-transparent hover:text-[#111827]'
              }`}
            >
              <BarChart3 className="w-4 h-4" />
              <span>Features</span>
            </button>
          </div>

          {/* Sidebar Tab Content */}
          <div className="p-5 space-y-6 flex-1 overflow-y-auto">
            {activeTab === 'branding' && (
              <div className="space-y-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-[#111827] block">Hero Badge Text</label>
                  <input
                    type="text"
                    value={themeSettings.heroBadge}
                    onChange={(e) => updateThemeSettings({ heroBadge: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-full border border-gray-200 focus:outline-none focus:border-[#2563EB] font-semibold text-[#111827]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#111827] block">Main Hero Headline</label>
                  <textarea
                    rows={2}
                    value={themeSettings.heroTitle}
                    onChange={(e) => updateThemeSettings({ heroTitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#2563EB] font-bold text-[#111827]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-[#111827] block">Hero Subtitle</label>
                  <textarea
                    rows={3}
                    value={themeSettings.heroSubtitle}
                    onChange={(e) => updateThemeSettings({ heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-[#2563EB] font-medium text-[#6B7280]"
                  />
                </div>
              </div>
            )}

            {activeTab === 'colors' && (
              <div className="space-y-5 text-xs">
                <div className="space-y-2">
                  <label className="font-bold text-[#111827] block">Primary Accent Color</label>
                  <div className="grid grid-cols-3 gap-2">
                    {colorPresets.map((preset) => (
                      <button
                        key={preset.hex}
                        onClick={() => updateThemeSettings({ primaryColor: preset.hex })}
                        className={`p-2.5 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                          themeSettings.primaryColor === preset.hex
                            ? 'border-[#2563EB] bg-blue-50 ring-2 ring-blue-100 font-bold text-[#2563EB]'
                            : 'border-gray-200 text-[#111827] hover:border-gray-300'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full border border-gray-200 shadow-2xs" style={{ backgroundColor: preset.hex }} />
                        <span className="text-[10px] text-center leading-tight">{preset.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="font-bold text-[#111827] block">Background Surface</label>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      onClick={() => updateThemeSettings({ bgStyle: 'white' })}
                      className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                        themeSettings.bgStyle === 'white' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-gray-200 text-[#111827]'
                      }`}
                    >
                      Off-White
                    </button>
                    <button
                      onClick={() => updateThemeSettings({ bgStyle: 'cream' })}
                      className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                        themeSettings.bgStyle === 'cream' ? 'border-[#2563EB] bg-amber-50 text-amber-900' : 'border-gray-200 text-[#111827]'
                      }`}
                    >
                      Soft Cream
                    </button>
                    <button
                      onClick={() => updateThemeSettings({ bgStyle: 'slate' })}
                      className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                        themeSettings.bgStyle === 'slate' ? 'border-[#2563EB] bg-slate-900 text-white' : 'border-gray-200 text-[#111827]'
                      }`}
                    >
                      Slate Dark
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'layout' && (
              <div className="space-y-5 text-xs">
                <div className="space-y-2">
                  <label className="font-bold text-[#111827] block">Header Navigation Style</label>
                  <div className="space-y-2">
                    <button
                      onClick={() => updateThemeSettings({ headerStyle: 'pill' })}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between font-bold transition-all cursor-pointer ${
                        themeSettings.headerStyle === 'pill' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-gray-200 text-[#111827]'
                      }`}
                    >
                      <span>Floating Pill Header</span>
                      {themeSettings.headerStyle === 'pill' && <Check className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => updateThemeSettings({ headerStyle: 'solid' })}
                      className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between font-bold transition-all cursor-pointer ${
                        themeSettings.headerStyle === 'solid' ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-gray-200 text-[#111827]'
                      }`}
                    >
                      <span>Solid Top Banner Header</span>
                      {themeSettings.headerStyle === 'solid' && <Check className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <label className="font-bold text-[#111827] block">Catalog Grid Columns</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[2, 3, 4].map((cols) => (
                      <button
                        key={cols}
                        onClick={() => updateThemeSettings({ gridColumns: cols })}
                        className={`p-3 rounded-2xl border text-center font-bold transition-all cursor-pointer ${
                          themeSettings.gridColumns === cols ? 'border-[#2563EB] bg-blue-50 text-[#2563EB]' : 'border-gray-200 text-[#111827]'
                        }`}
                      >
                        {cols} Columns
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'features' && (
              <div className="space-y-4 text-xs">
                <div className="p-4 rounded-2xl border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#111827] block">GA4 Conversion Ticker</span>
                      <span className="text-[11px] text-[#6B7280]">Display real-time order notifications</span>
                    </div>
                    <input
                      type="checkbox"
                      checked={themeSettings.enableGA4Ticker}
                      onChange={(e) => updateThemeSettings({ enableGA4Ticker: e.target.checked })}
                      className="w-4 h-4 text-[#2563EB] rounded focus:ring-blue-500 cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Sidebar Action Footer */}
          <div className="p-4 bg-gray-50 border-t border-gray-200 flex items-center gap-2">
            <button
              onClick={handlePublish}
              className="w-full py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Apply Changes to Live Shop</span>
            </button>
          </div>
        </div>

        {/* Right Live Interactive Canvas Preview */}
        <div className="flex-1 bg-slate-900 p-4 sm:p-8 flex items-center justify-center overflow-auto">
          <div
            className={`transition-all duration-300 bg-white rounded-[28px] shadow-2xl overflow-hidden flex flex-col ${
              viewportMode === 'desktop' ? 'w-full max-w-5xl h-[85vh]' : ''
            } ${viewportMode === 'tablet' ? 'w-[768px] h-[80vh]' : ''} ${
              viewportMode === 'mobile' ? 'w-[375px] h-[700px] border-8 border-slate-800 rounded-[40px]' : ''
            }`}
          >
            {/* Live Store Preview Banner inside Canvas */}
            <div className="bg-[#111827] text-white px-4 py-2 text-[10px] flex items-center justify-between border-b border-gray-800 shrink-0">
              <span className="font-extrabold text-blue-400">
                LIVE CANVAS PREVIEW
              </span>
              <span className="text-gray-400">
                Theme: {activeTemplate.name}
              </span>
            </div>

            {/* Preview Frame Mock Canvas */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ backgroundColor: themeSettings.bgStyle === 'slate' ? '#0F172A' : themeSettings.bgStyle === 'cream' ? '#FFFBEB' : '#FFFFFF' }}>
              {/* Custom Hero Mock */}
              <div 
                className="p-8 rounded-[32px] text-white space-y-3 relative overflow-hidden shadow-xs"
                style={{ backgroundColor: themeSettings.primaryColor }}
              >
                <span className="px-3 py-1 bg-white/20 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full inline-block">
                  {themeSettings.heroBadge}
                </span>
                <h1 className="text-2xl font-black leading-tight">
                  {themeSettings.heroTitle}
                </h1>
                <p className="text-xs text-white/80 max-w-md">
                  {themeSettings.heroSubtitle}
                </p>
                <button className="py-2.5 px-6 bg-white text-[#111827] font-extrabold text-xs rounded-full shadow-xs cursor-pointer">
                  Shop Storefront Catalog
                </button>
              </div>

              {/* Grid Preview Mock */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Featured Product Catalog ({themeSettings.gridColumns} Columns)
                </h3>
                <div className={`grid grid-cols-2 md:grid-cols-${themeSettings.gridColumns} gap-4`}>
                  {[1, 2, 3, 4].slice(0, themeSettings.gridColumns).map((idx) => (
                    <div key={idx} className="p-4 bg-white rounded-2xl border border-gray-200/80 space-y-2 shadow-2xs">
                      <div className="aspect-4/3 bg-gray-100 rounded-xl" />
                      <div className="h-3 bg-gray-200 rounded-full w-3/4" />
                      <div className="h-3 bg-blue-100 rounded-full w-1/2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
