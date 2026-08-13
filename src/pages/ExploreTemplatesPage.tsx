import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ECOMMERCE_TEMPLATES, StoreTemplate } from '../data/templates';
import { 
  Search, 
  Sparkles, 
  Eye, 
  SlidersHorizontal, 
  Star, 
  Check, 
  ExternalLink, 
  Smartphone, 
  Monitor, 
  Layout, 
  ArrowRight,
  Filter,
  CheckCircle2,
  Wand2,
  ShieldCheck,
  Zap,
  ShoppingBag,
  TrendingUp,
  Sliders
} from 'lucide-react';

export const ExploreTemplatesPage: React.FC = () => {
  const { 
    applyTemplate, 
    setCurrentPage, 
    setIsStudioEditorOpen, 
    setIsAIWizardOpen,
    setPreviewDeviceTemplate,
    activeTemplate,
    showToast
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStyle, setSelectedStyle] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'recommended' | 'popular' | 'rating' | 'newest'>('recommended');

  const categories = [
    'All',
    'Tech & Hardware',
    'Apparel & Hoodies',
    'Accessories & Mugs',
    'Creator & Limited',
    'Employee & Campus',
    'GA4 & Conversion'
  ];

  const styles = ['All', 'Editorial', 'Tech Dark', 'Playful & Vibrant', 'Minimalist Light', 'Dark Luxury'];

  // Filter and Sort Logic
  const filteredTemplates = useMemo(() => {
    return ECOMMERCE_TEMPLATES.filter((template) => {
      const matchesSearch = 
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      const matchesStyle = selectedStyle === 'All' || template.style === selectedStyle;

      return matchesSearch && matchesCategory && matchesStyle;
    }).sort((a, b) => {
      if (sortBy === 'popular') return b.storesCreated - a.storesCreated;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return b.id.localeCompare(a.id);
      return 0; // recommended
    });
  }, [searchQuery, selectedCategory, selectedStyle, sortBy]);

  const handleLiveDemo = (template: StoreTemplate) => {
    applyTemplate(template.id);
    setCurrentPage('home');
    showToast(`Switched to "${template.name}" Live Storefront`, 'success');
  };

  const handleCustomizeInStudio = (template: StoreTemplate) => {
    applyTemplate(template.id);
    setIsStudioEditorOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24 text-[#111827]">
      {/* Wix Explore Header Bar */}
      <div className="bg-[#111827] text-white border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-gray-400">
            <span className="font-bold text-white flex items-center gap-1.5">
              <span className="w-5 h-5 bg-[#2563EB] rounded-full flex items-center justify-center text-[10px] text-white font-extrabold">W</span>
              Wix Explore
            </span>
            <span>/</span>
            <span className="hover:text-white cursor-pointer" onClick={() => setSelectedCategory('All')}>eCommerce Templates</span>
            <span>/</span>
            <span className="text-[#3B82F6] font-semibold">Google Merch Shop Edition</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-500/20 text-emerald-400 px-2.5 py-1 rounded-full text-[11px] font-bold border border-emerald-500/30 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              10+ Active Store Templates
            </span>
            <button
              onClick={() => setIsAIWizardOpen(true)}
              className="px-3.5 py-1.5 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-full flex items-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              <Wand2 className="w-3.5 h-3.5 text-amber-300" />
              <span>AI Store Generator</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Showcase Section */}
      <div className="relative bg-gradient-to-b from-white via-slate-50 to-[#F8FAFC] border-b border-gray-200/80 pt-10 pb-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-extrabold uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-[#2563EB]" />
            <span>Wix eCommerce Showcase for Google Merch Shop</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black text-[#111827] tracking-tight max-w-4xl mx-auto leading-tight">
            Pick the E-Commerce Template You Love for <span className="text-[#2563EB]">Google Merch Shop</span>
          </h1>

          <p className="text-sm sm:text-base text-[#6B7280] max-w-2xl mx-auto leading-relaxed">
            Select from professionally designed, high-converting Google Merch storefront templates. Customize themes live in our Studio Editor or launch immediately into the live shopping store.
          </p>

          {/* Search & Main Action Controls */}
          <div className="max-w-3xl mx-auto pt-2 space-y-4">
            <div className="relative flex items-center">
              <Search className="w-5 h-5 text-gray-400 absolute left-4" />
              <input
                type="text"
                placeholder="Search Google Merch templates (e.g., Editorial, Pixel, Dark Mode, GA4, Developer)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-32 py-4 rounded-full bg-white border border-gray-200 shadow-sm focus:outline-none focus:border-[#2563EB] focus:ring-4 focus:ring-blue-50 text-xs sm:text-sm text-[#111827] placeholder-gray-400 font-medium"
              />
              <button
                onClick={() => setIsAIWizardOpen(true)}
                className="absolute right-2.5 py-2.5 px-5 bg-[#111827] hover:bg-black text-white font-bold text-xs rounded-full flex items-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Wand2 className="w-4 h-4 text-amber-400" />
                <span className="hidden sm:inline">Build with AI</span>
              </button>
            </div>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#6B7280] pt-2">
              <span className="flex items-center gap-1.5 font-semibold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                100% Mobile Responsive
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-4 h-4 text-[#2563EB]" />
                GA4 Analytics Integrated
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Zap className="w-4 h-4 text-amber-500" />
                Sub-Second Page Speed
              </span>
              <span className="flex items-center gap-1.5 font-semibold">
                <ShoppingBag className="w-4 h-4 text-purple-600" />
                1-Click GPay & Express Bag
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Catalog Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        {/* Category Tabs & Filter Bar */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-gray-200 pb-3 overflow-x-auto gap-4">
            <div className="flex items-center gap-2 shrink-0">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-[#2563EB] text-white shadow-xs'
                      : 'bg-white text-[#6B7280] hover:text-[#111827] hover:bg-gray-100 border border-gray-200/80'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
                <SlidersHorizontal className="w-4 h-4 text-[#2563EB]" />
                <span className="hidden sm:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-white border border-gray-200 text-[#111827] text-xs font-bold py-1.5 px-3 rounded-full focus:outline-none focus:border-[#2563EB]"
                >
                  <option value="recommended">Recommended</option>
                  <option value="popular">Most Popular</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest Releases</option>
                </select>
              </div>
            </div>
          </div>

          {/* Secondary Design Style Filter */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#6B7280] font-bold mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5 text-gray-400" />
              Design Style:
            </span>
            {styles.map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStyle(st)}
                className={`px-3 py-1 rounded-full text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedStyle === st
                    ? 'bg-[#111827] text-white'
                    : 'bg-gray-100 text-[#6B7280] hover:bg-gray-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Templates Count Header */}
        <div className="flex items-center justify-between text-xs text-[#6B7280]">
          <p>
            Showing <strong className="text-[#111827] font-bold">{filteredTemplates.length}</strong> Google Merch store templates
          </p>
          {activeTemplate && (
            <div className="flex items-center gap-2 bg-blue-50 text-[#2563EB] px-3 py-1 rounded-full border border-blue-100 font-bold">
              <span>Active Template: {activeTemplate.name}</span>
              <button 
                onClick={() => handleCustomizeInStudio(activeTemplate)}
                className="hover:underline font-extrabold flex items-center gap-1 ml-1"
              >
                <Sliders className="w-3 h-3" /> Edit in Studio
              </button>
            </div>
          )}
        </div>

        {/* Template Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => {
            const isActive = activeTemplate.id === template.id;

            return (
              <div
                key={template.id}
                className={`bg-white rounded-[32px] border transition-all duration-300 flex flex-col overflow-hidden group shadow-xs hover:shadow-xl ${
                  isActive 
                    ? 'border-[#2563EB] ring-2 ring-blue-100' 
                    : 'border-gray-200/80 hover:border-gray-300'
                }`}
              >
                {/* Template Image Preview Frame */}
                <div className="relative aspect-16/10 w-full overflow-hidden bg-slate-900">
                  <img
                    src={template.previewImage}
                    alt={template.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                  />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2 z-10">
                    <span className="px-3 py-1 bg-[#111827]/90 backdrop-blur-md text-white font-extrabold text-[10px] uppercase tracking-wider rounded-full shadow-xs">
                      {template.style}
                    </span>

                    {template.badge && (
                      <span className="px-3 py-1 bg-[#2563EB] text-white font-black text-[10px] uppercase tracking-wider rounded-full shadow-xs flex items-center gap-1">
                        <Sparkles className="w-3 h-3 text-amber-300" />
                        {template.badge}
                      </span>
                    )}
                  </div>

                  {/* Active Indicator Ribbon */}
                  {isActive && (
                    <div className="absolute inset-0 bg-[#2563EB]/10 border-4 border-[#2563EB] rounded-[32px] pointer-events-none flex items-center justify-center">
                      <span className="bg-[#2563EB] text-white text-xs font-black px-4 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                        <Check className="w-4 h-4" /> ACTIVE STORE TEMPLATE
                      </span>
                    </div>
                  )}

                  {/* Hover Action Overlay */}
                  <div className="absolute inset-0 bg-slate-950/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-6 backdrop-blur-xs">
                    <button
                      onClick={() => handleLiveDemo(template)}
                      className="w-full py-3 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Live Demo</span>
                    </button>

                    <button
                      onClick={() => handleCustomizeInStudio(template)}
                      className="w-full py-3 bg-white hover:bg-gray-100 text-[#111827] font-extrabold text-xs rounded-full shadow-md flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer"
                    >
                      <Sliders className="w-4 h-4 text-[#2563EB]" />
                      <span>Edit in Studio</span>
                    </button>

                    <button
                      onClick={() => setPreviewDeviceTemplate(template)}
                      className="text-white hover:text-gray-200 text-xs font-bold underline flex items-center gap-1 pt-1 cursor-pointer"
                    >
                      <Monitor className="w-3.5 h-3.5" />
                      <span>Responsive Device Preview</span>
                    </button>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                        {template.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 font-bold">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{template.rating}</span>
                        <span className="text-gray-400 font-normal">({template.reviewsCount})</span>
                      </div>
                    </div>

                    <h3 className="text-base font-extrabold text-[#111827] group-hover:text-[#2563EB] transition-colors leading-snug">
                      {template.name}
                    </h3>

                    <p className="text-xs text-[#6B7280] mt-1 line-clamp-2 leading-relaxed">
                      {template.tagline}
                    </p>
                  </div>

                  {/* Color Palette Dots */}
                  <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#6B7280] font-bold mr-1">Palette:</span>
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-2xs" style={{ backgroundColor: template.colorPalette.primary }} title="Primary Color" />
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-2xs" style={{ backgroundColor: template.colorPalette.secondary }} title="Secondary Accent" />
                      <span className="w-3.5 h-3.5 rounded-full border border-gray-200 shadow-2xs" style={{ backgroundColor: template.colorPalette.surface }} title="Surface Neutral" />
                    </div>

                    <span className="text-[11px] text-gray-400 font-semibold">
                      {template.storesCreated.toLocaleString()} stores created
                    </span>
                  </div>

                  {/* Features Highlights */}
                  <div className="space-y-1.5 pt-1">
                    {template.features.slice(0, 2).map((feat, i) => (
                      <div key={i} className="flex items-center gap-2 text-[11px] text-[#111827] font-medium">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer Card Buttons */}
                  <div className="pt-3 flex items-center gap-2">
                    <button
                      onClick={() => handleLiveDemo(template)}
                      className="flex-1 py-2.5 px-4 bg-[#2563EB] hover:bg-blue-600 text-white font-bold text-xs rounded-full shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>View Demo</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleCustomizeInStudio(template)}
                      className="py-2.5 px-4 bg-gray-100 hover:bg-gray-200 text-[#111827] font-bold text-xs rounded-full transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty Search State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 bg-white rounded-[32px] border border-gray-200 p-8 space-y-4">
            <Layout className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-lg font-extrabold text-[#111827]">No templates found matching "{searchQuery}"</h3>
            <p className="text-xs text-[#6B7280]">Try clearing search filters or generate a custom store layout with AI.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
                setSelectedStyle('All');
              }}
              className="py-2.5 px-6 bg-[#2563EB] text-white font-bold text-xs rounded-full cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Bottom AI Callout Banner */}
        <div className="bg-gradient-to-r from-[#111827] via-slate-900 to-[#1E3A8A] text-white rounded-[32px] p-8 sm:p-12 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="space-y-3 max-w-2xl relative z-10 text-center lg:text-left">
            <span className="px-3 py-1 bg-amber-400/20 text-amber-300 font-extrabold text-xs uppercase tracking-wider rounded-full inline-flex items-center gap-1">
              <Wand2 className="w-3.5 h-3.5" /> Wix AI Site Builder
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight leading-tight">
              Want a Completely Custom Google Merch Store?
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Answer 3 quick questions about your merchandise catalog and brand aesthetic, and Wix AI will instantly synthesize a custom storefront theme, hero banner, and color palette.
            </p>
          </div>

          <button
            onClick={() => setIsAIWizardOpen(true)}
            className="py-4 px-8 bg-[#2563EB] hover:bg-blue-600 text-white font-extrabold text-sm rounded-full shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 shrink-0 hover:scale-105"
          >
            <Wand2 className="w-5 h-5 text-amber-300" />
            <span>Launch Wix AI Store Wizard</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </div>
  );
};
