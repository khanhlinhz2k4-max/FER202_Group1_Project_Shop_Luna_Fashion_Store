import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  LogOut,
  Shield,
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function Navbar() {
  const { cartCount, openCart, wishlist, currentUser, logout, products } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);
  }, [location]);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  // Live search matched products preview (max 4)
  const searchResults = searchQuery.trim()
    ? products.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase())).slice(0, 4)
    : [];

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  // Clean navigation links
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'Categories', path: '/#categories' },
    { name: 'New Collection', path: '/#new-arrivals' },
    { name: 'About LUNE', path: '/#about' },
  ];

  return (
    <>
      <header className={`lune-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Editorial Announcement Bar */}
      <div className="announcement-bar">
        <p>
          <span>SPRING / SUMMER 2026</span>
          <span className="announcement-divider">/</span>
          <span>COMPLIMENTARY SHIPPING ON ORDERS OVER $250</span>
          <span className="announcement-divider">/</span>
          <Link to="/shop" className="announcement-link">DISCOVER THE RUNWAY</Link>
        </p>
      </div>

      {/* Main Navigation Bar */}
      <div className="navbar-container">
        {/* Mobile Menu Toggle */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

        {/* Brand Logo */}
        <Link to="/" className="brand-logo">
          <span className="brand-name">LUNE</span>
          <span className="brand-tagline">FASHION STORE</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          <ul className="nav-list">
            {navLinks.map((link) => {
              const isCurrent = location.pathname === link.path;
              return (
                <li key={link.name} className="nav-item">
                  {link.path.startsWith('/#') ? (
                    <a href={link.path} className="nav-link">
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`nav-link ${isCurrent ? 'active' : ''}`}
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Header Actions */}
        <div className="header-actions">
          {/* Search Trigger */}
          <button 
            className="action-btn" 
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search collection"
          >
            <Search size={19} strokeWidth={1.75} />
          </button>

          {/* Wishlist Link */}
          <Link 
            to="/wishlist" 
            className="action-btn" 
            aria-label="Wishlist"
            title={`Wishlist: ${wishlist.length} saved items`}
          >
            <Heart size={19} strokeWidth={1.75} />
            {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
          </Link>

          {/* Shopping Bag / Cart Trigger */}
          <button 
            className="action-btn bag-btn" 
            aria-label="Shopping Bag"
            onClick={openCart}
          >
            <ShoppingBag size={19} strokeWidth={1.75} />
            {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
          </button>

          {/* User Account / Login or Profile */}
          {currentUser ? (
            <div className="user-menu-container">
              <button 
                type="button" 
                className="action-btn login-action"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                aria-label="User Account Menu"
              >
                <User size={19} strokeWidth={1.75} />
                <span className="login-text">
                  {currentUser.role === 'admin' ? 'ADMIN' : currentUser.name.split(' ')[0].toUpperCase()}
                </span>
              </button>

              {userMenuOpen && (
                <>
                  <div 
                    className="dropdown-backdrop" 
                    onClick={() => setUserMenuOpen(false)}
                    style={{ position: 'fixed', inset: 0, zIndex: 90 }}
                  />
                  <div className="user-account-dropdown">
                    <div className="dropdown-user-info">
                      <span className="dropdown-tag">
                        {currentUser.role === 'admin' ? '🛡️ STORE ADMINISTRATOR' : 'LUNE MEMBER'}
                      </span>
                      <span className="dropdown-name">{currentUser.name}</span>
                    </div>

                    <div className="dropdown-divider"></div>

                    {/* Admin Portal Link */}
                    {currentUser.role === 'admin' && (
                      <Link 
                        to="/admin" 
                        className="dropdown-link"
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#B45309', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <Shield size={16} /> Admin Portal
                      </Link>
                    )}

                    <Link 
                      to="/profile" 
                      className="dropdown-link"
                      style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#1C1917', textDecoration: 'none', fontSize: '0.85rem' }}
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package size={16} /> My Account & Orders
                    </Link>

                    <div className="dropdown-divider"></div>

                    <button 
                      type="button" 
                      className="dropdown-logout-btn"
                      onClick={handleLogout}
                    >
                      <LogOut size={14} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <Link to="/login" className="action-btn login-action" aria-label="User Account">
              <User size={19} strokeWidth={1.75} />
              <span className="login-text">LOGIN</span>
            </Link>
          )}
        </div>
      </div>

      {/* Expandable Live Search Drawer */}
      {searchOpen && (
        <div className="search-bar-dropdown">
          <div className="search-inner container" style={{ position: 'relative' }}>
            <Search size={18} className="search-input-icon" />
            <input 
              type="text" 
              placeholder="Search products by title or category (Press Enter to view all)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleSearchSubmit}
              autoFocus
            />
            <button 
              className="search-close-btn"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={18} />
            </button>

            {/* Live Search Quick Results */}
            {searchResults.length > 0 && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: '#fff',
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                border: '1px solid #E7E5E4',
                marginTop: '8px',
                padding: '12px 16px',
                zIndex: 99
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#78716C', marginBottom: '8px', textTransform: 'uppercase' }}>
                  Quick Suggestions ({searchResults.length})
                </div>
                {searchResults.map(p => (
                  <Link
                    key={p.id}
                    to={`/product/${p.id}`}
                    onClick={() => setSearchOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '8px 0',
                      borderBottom: '1px solid #F5EFE6',
                      textDecoration: 'none',
                      color: '#1C1917'
                    }}
                  >
                    <img src={p.image} alt={p.name} style={{ width: '40px', height: '48px', objectFit: 'cover' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: 500 }}>{p.name}</div>
                      <div style={{ fontSize: '0.78rem', color: '#78716C' }}>${p.price} • {p.category}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

    </header>

    {/* Mobile Menu Backdrop Overlay (Independent element to prevent backdrop-filter bleeding bug) */}
    <div 
      className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
      onClick={() => setMobileMenuOpen(false)}
    />

    {/* Mobile Menu Content Drawer */}
    <div 
      className={`mobile-nav-content ${mobileMenuOpen ? 'open' : ''}`}
      onClick={(e) => e.stopPropagation()}
    >
        {/* Drawer Header with Brand Gold Glow */}
        <div className="mobile-nav-header">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="brand-logo">
            <span className="brand-name">LUNE</span>
            <span className="brand-tagline">FASHION STORE</span>
          </Link>
          <button 
            onClick={() => setMobileMenuOpen(false)} 
            className="close-drawer-btn"
            aria-label="Close menu"
          >
            <X size={22} />
          </button>
        </div>

        {/* Section 1: Main Navigation & Collections */}
        <div className="mobile-group-label">EXPLORE COLLECTIONS</div>
        <ul className="mobile-nav-list">
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Home</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Shop All</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <Link to="/shop?category=women" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Women's Collection</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <Link to="/shop?category=men" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>Men's Collection</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <a href="/#new-arrivals" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>New Collection</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </a>
          </li>
          <li>
            <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>About LUNE</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </a>
          </li>
        </ul>

        {/* Section 2: Personal Wardrobe & Wishlist */}
        <div className="mobile-group-label">WARDROBE & ACCOUNT</div>
        <ul className="mobile-nav-list">
          <li>
            <button 
              onClick={() => { setMobileMenuOpen(false); openCart(); }} 
              className="mobile-nav-link"
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left', fontFamily: 'inherit', padding: '16px 20px', cursor: 'pointer' }}
            >
              <span className="link-text-wrap">
                <ShoppingBag size={16} className="inline-icon-gold" />
                Shopping Bag
                {cartCount > 0 && (
                  <span className="mobile-badge-count">{cartCount}</span>
                )}
              </span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </button>
          </li>
          <li>
            <Link to="/wishlist" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span className="link-text-wrap">
                <Heart size={16} className="inline-icon-gold" />
                Saved Wishlist
                {wishlist.length > 0 && (
                  <span className="mobile-badge-count">{wishlist.length}</span>
                )}
              </span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          {currentUser && (
            <li>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                <span className="link-text-wrap">
                  <User size={16} className="inline-icon-gold" />
                  My Profile ({currentUser.name.split(' ')[0]})
                </span>
                <ArrowRight size={16} className="nav-arrow-icon" />
              </Link>
            </li>
          )}
        </ul>

        {/* Section 3: Auth CTA Buttons */}
        <div className="mobile-auth-section">
          {currentUser ? (
            <button 
              type="button" 
              className="mobile-cta-secondary mobile-cta-logout"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>SIGN OUT ({currentUser.role.toUpperCase()})</span>
            </button>
          ) : (
            <div className="mobile-cta-group">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-cta-primary"
              >
                <span>Sign In</span>
                <ArrowRight size={15} />
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-cta-secondary"
              >
                <span>Register</span>
              </Link>
            </div>
          )}
        </div>

        <div className="mobile-nav-footer">
          <div className="mobile-footer-info">
            <span className="mobile-contact-line">Care: support@lune-fashion.com</span>
            <span className="mobile-footer-divider">·</span>
            <span className="mobile-tagline">LUNE © 2026</span>
          </div>
        </div>
      </div>
    </>
  );
}
