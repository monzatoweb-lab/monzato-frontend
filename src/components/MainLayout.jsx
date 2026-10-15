import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { Newsletter } from './Newsletter';
import { AuthModal } from './AuthModal';
import { CartDrawer } from './CartDrawer';
import { QuickViewModal } from './QuickViewModal';
import { ToastNotification } from './ToastNotification';
import { HomePage } from './HomePage';
import { CartPage } from './CartPage';
import { AccountPage } from './AccountPage';
import { ProductDetailPage } from './ProductDetailPage';
import { ContactUsPage } from './ContactUsPage';
import { DynamicPage } from './DynamicPage';

export const MainLayout = () => (
  <div className="min-h-screen bg-white text-neutral-900 flex flex-col font-sans selection:bg-black selection:text-white">

    <Navbar />

    <main className="flex-grow">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/product" element={<ProductDetailPage />} />
        <Route path="/contact" element={<ContactUsPage />} />
        <Route path="/the-story" element={<DynamicPage slug="the-story" fallbackTitle="The Monzato Story" />} />
        <Route path="/delivery-returns" element={<DynamicPage slug="delivery-returns" fallbackTitle="Delivery & Returns" />} />
        <Route path="/privacy-policy" element={<DynamicPage slug="privacy-policy" fallbackTitle="Privacy Policy" />} />
        <Route path="/pages/:slug" element={<DynamicPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </main>

    {/* Newsletter Section */}
    <Newsletter />

    {/* Footer */}
    <Footer />

    {/* Modals & Overlays */}
    <AuthModal />
    <CartDrawer />
    <QuickViewModal />
    <ToastNotification />

  </div>
);
