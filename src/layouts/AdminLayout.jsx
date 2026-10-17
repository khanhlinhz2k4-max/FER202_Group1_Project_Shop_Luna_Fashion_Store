import React, { useState } from 'react';
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { LayoutDashboard, ShoppingBag, ClipboardList, Users, LogOut, ExternalLink, Shield, Menu, Globe, Ticket } from 'lucide-react';
import '../pages/admin/Admin.css';

export default function AdminLayout() {
  const { currentUser, logout } = useShop();
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { to: '/admin', label: t('admin.sidebar.dashboard', 'Dashboard'), icon: LayoutDashboard, end: true },
    { to: '/admin/products', label: t('admin.sidebar.products', 'Products'), icon: ShoppingBag },
    { to: '/admin/orders', label: t('admin.sidebar.orders', 'Orders'), icon: ClipboardList },
    { to: '/admin/vouchers', label: t('admin.sidebar.vouchers', 'Vouchers'), icon: Ticket },
    { to: '/admin/users', label: t('admin.sidebar.users', 'Users'), icon: Users },
  ];

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
            <Shield size={22} color="#CAA072" />
            <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', fontWeight: 600, letterSpacing: '0.08em', color: '#FAF7F2' }}>
              {t('admin.sidebar.title', 'LUNE ADMIN')}
            </span>
          </div>
          <span style={{ fontSize: '0.75rem', color: '#C8AE84', display: 'block', marginTop: '4px' }}>
            {t('admin.sidebar.version', 'Store Management v1.0')}
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

        <div style={{ padding: '16px', borderTop: '1px solid #483526' }}>
          <Link
            to="/"
            style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#C8AE84', textDecoration: 'none', fontSize: '0.85rem', marginBottom: '12px' }}
          >
            <ExternalLink size={16} /> {t('admin.sidebar.viewStorefront', 'View Storefront')}
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
              backgroundColor: '#483526',
              color: '#FAF7F2',
              border: '1px solid #5A4331',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 500,
            }}
          >
            <LogOut size={16} /> {t('admin.sidebar.signOut', 'Sign Out')}
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
            <div style={{ fontSize: '0.9rem', color: '#5C4A3A' }}>
              <span>{t('admin.topbar.portal', 'Admin Portal')}</span> / <strong style={{ color: '#2C2117' }}>Lune Fashion Store</strong>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Minimal Luxury Bilingual Switcher */}
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px',
              fontSize: '0.78rem',
              color: '#8F7965',
              padding: '4px 8px',
              borderRadius: '20px',
              backgroundColor: '#FAF7F2'
            }}>
              <Globe size={13} color="#8F7965" />
              <button
                type="button"
                onClick={() => setLanguage('vi')}
                style={{
                  border: 'none',
                  background: 'none',
                  color: language === 'vi' ? '#2C2117' : '#8F7965',
                  fontWeight: language === 'vi' ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  textDecoration: language === 'vi' ? 'underline' : 'none',
                  textUnderlineOffset: '3px'
                }}
              >
                VI
              </button>
              <span style={{ color: '#D9C3A8', fontSize: '0.7rem' }}>•</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                style={{
                  border: 'none',
                  background: 'none',
                  color: language === 'en' ? '#2C2117' : '#8F7965',
                  fontWeight: language === 'en' ? 700 : 500,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  padding: '2px 4px',
                  borderRadius: '3px',
                  textDecoration: language === 'en' ? 'underline' : 'none',
                  textUnderlineOffset: '3px'
                }}
              >
                EN
              </button>
            </div>

            <div style={{ width: '1px', height: '18px', backgroundColor: '#E7DDCE' }} />

            {/* Streamlined User Profile without redundant badge */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div className="admin-avatar notranslate" translate="no">{initials}</div>
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#2C2117', letterSpacing: '0.01em' }}>
                {displayName}
              </span>
            </div>
          </div>
        </header>

        <div className="admin-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}