import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ArrowRight,
  LogOut 
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [wishlistCount, setWishlistCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync wishlist count from localStorage and listen to real-time updates
  useEffect(() => {
    const syncWishlist = () => {
      try {
        const stored = JSON.parse(localStorage.getItem('lune_wishlist') || '[]');
        setWishlistCount(stored.length);
      } catch (e) {
        setWishlistCount(0);
      }
    };

    syncWishlist();
    window.addEventListener('lune_wishlist_updated', syncWishlist);
    return () => window.removeEventListener('lune_wishlist_updated', syncWishlist);
  }, []);

  // Sync user state and close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
    setUserMenuOpen(false);

    try {
      const isAuth = localStorage.getItem('lune_user_authenticated') === 'true';
      const userName = localStorage.getItem('lune_user_name');
      if (isAuth && userName) {
        setCurrentUser(userName);
      } else {
        setCurrentUser(null);
      }
    } catch (e) {
      setCurrentUser(null);
    }
  }, [location]);

  const getDisplayName = (name) => {
    if (!name) return 'ACCOUNT';
    const clean = name.trim();
    if (
      clean.toLowerCase().includes('apple') || 
      clean.toLowerCase().includes('google') || 
      clean.toLowerCase().includes('client') ||
      clean.toLowerCase().includes('member')
    ) {
      return 'ACCOUNT';
    }
    return clean.split(' ')[0].toUpperCase();
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem('lune_user_authenticated');
      localStorage.removeItem('lune_user_name');
      localStorage.removeItem('lune_user_email');
    } catch (e) {}
    setCurrentUser(null);
    setUserMenuOpen(false);
  };

  // Clean navigation anchors for Home page + routes for Login/Register
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/#categories' },
    { name: 'New Collection', path: '/#new-arrivals' },
    { name: 'About LUNE', path: '/#about' },
  ];

  return (
    <header className={`lune-header ${isScrolled ? 'scrolled' : ''}`}>
      {/* Editorial Announcement Bar */}
      <div className="announcement-bar">
        <p>
          <span>SPRING / SUMMER 2026</span>
          <span className="announcement-divider">/</span>
          <span>COMPLIMENTARY SHIPPING ON ORDERS OVER $150</span>
          <span className="announcement-divider">/</span>
          <a href="/#new-arrivals" className="announcement-link">DISCOVER THE RUNWAY</a>
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
              const isHome = location.pathname === '/' && link.path === '/';
              return (
                <li key={link.name} className="nav-item">
                  {link.path.startsWith('/#') ? (
                    <a href={link.path} className="nav-link">
                      {link.name}
                    </a>
                  ) : (
                    <Link 
                      to={link.path} 
                      className={`nav-link ${isHome ? 'active' : ''}`}
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

          {/* Wishlist with live dynamic badge */}
          <button 
            className="action-btn" 
            aria-label="Wishlist"
            title={`Wishlist: ${wishlistCount} saved item${wishlistCount === 1 ? '' : 's'}`}
          >
            <Heart size={19} strokeWidth={1.75} />
            {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
          </button>

          {/* Shopping Bag / Cart */}
          <button 
            className="action-btn bag-btn" 
            aria-label="Shopping Bag"
            onClick={() => alert('Shopping Bag is planned for Phase 2 development.')}
          >
            <ShoppingBag size={19} strokeWidth={1.75} />
            <span className="action-badge">2</span>
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
                <span className="login-text">{getDisplayName(currentUser)}</span>
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
                      <span className="dropdown-tag">LUNE MEMBER</span>
                      <span className="dropdown-name">{currentUser}</span>
                    </div>
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

      {/* Expandable Search Drawer */}
      {searchOpen && (
        <div className="search-bar-dropdown">
          <div className="search-inner container">
            <Search size={18} className="search-input-icon" />
            <input 
              type="text" 
              placeholder="Search by piece, fabric, or collection..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
            <button 
              className="search-close-btn"
              onClick={() => setSearchOpen(false)}
              aria-label="Close search"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay & Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-content">
          <div className="mobile-nav-header">
            <div className="brand-logo">
              <span className="brand-name">LUNE</span>
            </div>
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="close-drawer-btn"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          <ul className="mobile-nav-list">
            {navLinks.map((link) => (
              <li key={link.name}>
                {link.path.startsWith('/#') ? (
                  <a 
                    href={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-link"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={16} />
                  </a>
                ) : (
                  <Link 
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="mobile-nav-link"
                  >
                    <span>{link.name}</span>
                    <ArrowRight size={16} />
                  </Link>
                )}
              </li>
            ))}
            <li>
              <Link 
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <span>Client Sign In</span>
                <ArrowRight size={16} />
              </Link>
            </li>
            <li>
              <Link 
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-nav-link"
              >
                <span>Create Account</span>
                <ArrowRight size={16} />
              </Link>
            </li>
          </ul>

          <div className="mobile-nav-footer">
            <p className="mobile-contact-line">Customer Care: support@lune-fashion.com</p>
            <p className="mobile-tagline">LUNE Fashion Store — Edition 2026</p>
          </div>
        </div>
      </div>
    </header>
  );
}
