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
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && currentUser.role !== 'admin') {
    // If not admin, redirect to home
    alert("Quyền truy cập bị từ chối: Trang này chỉ dành cho Quản trị viên (Admin).");
    return <Navigate to="/" replace />;
  }

  return children;
}
