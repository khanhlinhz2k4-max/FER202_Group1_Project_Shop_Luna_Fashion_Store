import React from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, LogOut, ExternalLink, Shield } from 'lucide-react';
import '../pages/admin/Admin.css';

/**
 * AdminLayout Component
 * Phụ trách: Thành viên 6 (Phân hệ Quản trị viên)
 */
export default function AdminLayout() {
  const { currentUser, logout } = useShop();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="admin-sidebar-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={22} color="#D4AF37" />
            <span style={{ fontSize: '1.1rem', fontWeight: 700, letterSpacing: '0.08em', color: '#FFF' }}>
              LUNE ADMIN
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
            Store Management v1.0
          </span>
        </div>

        <nav className="admin-nav">
          <NavLink to="/admin" end className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <LayoutDashboard size={18} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink to="/admin/products" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <ShoppingBag size={18} />
            <span>Products (CRUD)</span>
          </NavLink>

          <NavLink to="/admin/orders" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <ClipboardList size={18} />
            <span>Orders</span>
          </NavLink>

          <NavLink to="/admin/users" className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}>
            <Users size={18} />
            <span>Users</span>
          </NavLink>
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #1E293B' }}>
          <Link 
            to="/" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '12px' }}
          >
            <ExternalLink size={16} /> View Storefront
          </Link>
          <button 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '10px',
              backgroundColor: '#1E293B',
              color: '#F87171',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Main content with Topbar */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ fontSize: '0.9rem', color: '#64748B' }}>
            Admin Portal / <strong>FER202 Final Project</strong>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{currentUser?.name || "Administrator"}</span>
            <span style={{ padding: '3px 8px', backgroundColor: '#FEF3C7', color: '#92400E', fontSize: '0.75rem', borderRadius: '4px', fontWeight: 600 }}>
              ADMIN
            </span>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
