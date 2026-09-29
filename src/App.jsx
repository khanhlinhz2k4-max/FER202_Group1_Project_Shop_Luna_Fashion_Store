import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider } from './context/ShopContext';

// Components & Layouts
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import ProtectedRoute from './components/ProtectedRoute';
import AdminLayout from './layouts/AdminLayout';

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

import './App.css';

// Automatically scroll to top on every route transition
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
    </div>
  );
}

function AppContent() {
  return (
    <>
      <ScrollToTop />
      {/* Global Slide-in Cart Drawer */}
      <CartDrawer />

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
    <BrowserRouter>
      <ShopProvider>
        <AppContent />
      </ShopProvider>
    </BrowserRouter>
  );
}
