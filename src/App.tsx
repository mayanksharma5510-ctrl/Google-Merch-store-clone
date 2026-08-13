import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { GA4StrategyModal } from './components/GA4StrategyModal';
import { Toast } from './components/Toast';
import { WixStudioEditorModal } from './components/WixStudioEditorModal';
import { WixAIWizardModal } from './components/WixAIWizardModal';
import { DevicePreviewModal } from './components/DevicePreviewModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { OurStoryPage } from './pages/OurStoryPage';
import { ContactFaqPage } from './pages/ContactFaqPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';

const MainContent: React.FC = () => {
  const { currentPage } = useShop();

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F4F6] dark:bg-[#0B0F17] font-sans text-[#111827] dark:text-[#F3F4F6] antialiased selection:bg-[#2563EB] selection:text-white transition-colors duration-300">
      <Navbar />

      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'shop' && <ShopPage />}
        {currentPage === 'our-story' && <OurStoryPage />}
        {currentPage === 'contact-faq' && <ContactFaqPage />}
        {currentPage === 'product-detail' && <ProductDetailPage />}
        {currentPage === 'cart' && <CartPage />}
        {currentPage === 'checkout' && <CheckoutPage />}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <QuickViewModal />
      <CartDrawer />
      <GA4StrategyModal />
      <WixStudioEditorModal />
      <WixAIWizardModal />
      <DevicePreviewModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ShopProvider>
        <MainContent />
      </ShopProvider>
    </ThemeProvider>
  );
}

