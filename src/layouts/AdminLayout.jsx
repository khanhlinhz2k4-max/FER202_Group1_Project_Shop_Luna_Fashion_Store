import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, LogOut, ExternalLink, Shield, Menu } from 'lucide-react';
import '../pages/admin/Admin.css';

const navItems = [
  { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/admin/products', label: 'Products (CRUD)', icon: ShoppingBag },
  { to: '/admin/orders', label: 'Orders', icon: ClipboardList },
  { to: '/admin/users', label: 'Users', icon: Users },
];

export default function AdminLayout() {
  const { currentUser, logout } = useShop();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const displayName = currentUser?.name || 'Administrator';
  const initials = displayName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const closeSidebar = () => setIsSidebarOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="admin-container">
      {isSidebarOpen && <div className="admin-overlay" onClick={closeSidebar} />}

      <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
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
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                onClick={closeSidebar}
                className={({ isActive }) => `admin-nav-item ${isActive ? 'active' : ''}`}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div style={{ padding: '16px', borderTop: '1px solid #1E293B' }}>
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#94A3B8', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '12px' }}
          >
            <ExternalLink size={16} /> View Storefront
          </Link>
          <button
            type="button"
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
              fontWeight: 500,
            }}
          >
            <LogOut size={16} /> Sign Out
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              type="button"
              className="admin-hamburger"
              aria-label="Open menu"
              onClick={() => setIsSidebarOpen((open) => !open)}
            >
              <Menu size={20} />
            </button>
            <div style={{ fontSize: '0.9rem', color: '#64748B' }}>
              Admin Portal / <strong>FER202 Final Project</strong>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div className="admin-avatar">{initials}</div>
            <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>{displayName}</span>
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