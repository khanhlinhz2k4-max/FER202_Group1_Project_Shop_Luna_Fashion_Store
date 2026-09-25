import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  Heart, 
  ShoppingBag, 
  User, 
  Menu, 
  X, 
  ArrowRight 
} from 'lucide-react';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [location]);

  // Clean navigation anchors for Home page + routes for Login/Register
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Categories', path: '/#categories' },
    { name: 'New Collection', path: '/#new-arrivals' },
    { name: 'Philosophy', path: '/#philosophy' },
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
          <span className="brand-tagline">PARIS · STUDIO</span>
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

          {/* Wishlist */}
          <button 
            className="action-btn" 
            aria-label="Wishlist"
            onClick={() => alert('Wishlist is planned for Phase 2 development.')}
          >
            <Heart size={19} strokeWidth={1.75} />
            <span className="action-badge">1</span>
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

          {/* User Account / Login */}
          <Link to="/login" className="action-btn login-action" aria-label="User Account">
            <User size={19} strokeWidth={1.75} />
            <span className="login-text">LOGIN</span>
          </Link>
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
                <span>Join The Atelier</span>
                <ArrowRight size={16} />
              </Link>
            </li>
          </ul>

          <div className="mobile-nav-footer">
            <p className="mobile-contact-line">Private Client Services: atelier@lune-studio.com</p>
            <p className="mobile-tagline">Timeless With A Twist — Edition 2026</p>
          </div>
        </div>
      </div>
    </header>
  );
}
