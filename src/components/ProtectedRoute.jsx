import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

/**
 * ProtectedRoute component
 * Role: Member 5 (Xác thực, phân quyền)
 * Usage:
 *   <ProtectedRoute requireAdmin>
 *     <AdminLayout />
 *   </ProtectedRoute>
 */
export default function ProtectedRoute({ children, requireAdmin = false }) {
  const { currentUser } = useShop();
  const location = useLocation();

  if (!currentUser) {
    // Redirect unauthenticated user to login with return url
    return <Navigate to="/login" state={{ from: location, notice: 'Please log in to continue.' }} replace />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    // Redirect non-admin user trying to access admin portal
    return (
      <Navigate 
        to="/login" 
        state={{ 
          from: location, 
          error: 'Access denied: Administrator privileges required.' 
        }} 
        replace 
      />
    );
  }

  return children;
}
