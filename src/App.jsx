import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';
import { LanguageProvider } from './context/LanguageContext';

// Components & Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import WishlistToast from './components/WishlistToast';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import AdminLayout from './layouts/AdminLayout';
import ChatBot from './components/ChatBot';

// Public & Client Pages
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage';
import WishlistPage from './pages/WishlistPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderSuccessPage from './pages/OrderSuccessPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProfilePage from './pages/ProfilePage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminUsers from './pages/admin/AdminUsers';
import AdminVouchers from './pages/admin/AdminVouchers';

import './App.css';

// Automatically scroll to top on route change or smoothly scroll to hash target
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Delay slightly to ensure destination DOM elements have mounted
      const timer = setTimeout(() => {
        try {
          const target = document.querySelector(hash);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (e) {
          window.scrollTo(0, 0);
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}

// Client Storefront Layout Wrapper
function StorefrontLayout({ children }) {
  return (
    <div className="lune-app-wrapper">
      <Navbar />
      <main className="main-content">
        {children}
      </main>
      <Footer />
      {/* 24/7 Atelier Stylist Chatbot */}
      <ChatBot />
    </div>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      {/* Global Slide-in Cart Drawer */}
      <CartDrawer />
      {/* Global Non-blocking Wishlist Toast */}
      <WishlistToast />

      <Routes>
        {/* ================= ADMIN PORTAL ROUTES ================= */}
        <Route 
          path="/admin" 
          element={
            <ProtectedRoute requireAdmin={true}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="vouchers" element={<AdminVouchers />} />
        </Route>

        {/* ================= CLIENT STOREFRONT ROUTES ================= */}
        <Route path="/" element={<StorefrontLayout><HomePage /></StorefrontLayout>} />
        <Route path="/shop" element={<StorefrontLayout><ShopPage /></StorefrontLayout>} />
        <Route path="/product/:id" element={<StorefrontLayout><ProductDetailPage /></StorefrontLayout>} />
        <Route path="/wishlist" element={<StorefrontLayout><WishlistPage /></StorefrontLayout>} />
        <Route path="/checkout" element={<StorefrontLayout><CheckoutPage /></StorefrontLayout>} />
        <Route path="/order-success" element={<StorefrontLayout><OrderSuccessPage /></StorefrontLayout>} />
        <Route path="/login" element={<StorefrontLayout><LoginPage /></StorefrontLayout>} />
        <Route path="/register" element={<StorefrontLayout><RegisterPage /></StorefrontLayout>} />
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <StorefrontLayout><ProfilePage /></StorefrontLayout>
            </ProtectedRoute>
          } 
        />

        {/* Fallback to Home */}
        <Route path="*" element={<StorefrontLayout><HomePage /></StorefrontLayout>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <LanguageProvider>
          <ShopProvider>
            <AppContent />
          </ShopProvider>
        </LanguageProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
