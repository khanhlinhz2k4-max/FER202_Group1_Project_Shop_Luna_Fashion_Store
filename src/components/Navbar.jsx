import React, { useState, useEffect, useMemo, useRef } from 'react';
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
  Package,
  TrendingUp 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import './Navbar.css';

const TRENDING_SEARCHES_EN = [
  "Linen Blazer",
  "Silk Dress",
  "Cashmere Cardigan",
  "Wide-Leg Trousers",
  "Leather Bag",
  "Trench Coat",
  "Overshirt"
];

const TRENDING_SEARCHES_VI = [
  "Áo Blazer Linen",
  "Đầm Lụa Dạ Hội",
  "Cardigan Cashmere",
  "Quần Âu Ống Rộng",
  "Túi Da Thủ Công",
  "Áo Khoác Trench",
  "Áo Sơ Mi Overshirt"
];

export default function Navbar() {
  const { cartCount, openCart, wishlist, currentUser, logout, products } = useShop();
  const { t, language } = useLanguage();
  const trendingList = language === 'vi' ? TRENDING_SEARCHES_VI : TRENDING_SEARCHES_EN;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const searchInputRef = useRef(null);
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
  }, [location.pathname]);

  // Execute search and redirect to /shop?search=<query>
  const executeSearch = (customQuery) => {
    const q = (customQuery !== undefined ? customQuery : searchQuery).trim();
    if (q) {
      navigate(`/shop?search=${encodeURIComponent(q)}`);
      setSearchOpen(false);
    }
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      executeSearch();
    } else if (e.key === 'Escape') {
      setSearchOpen(false);
    }
  };

  const handleTrendingClick = (tag) => {
    setSearchQuery(tag);
    executeSearch(tag);
  };

  // Live search matched products preview (max 6)
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return (products || []).filter(p => {
      const matchName = p.name?.toLowerCase().includes(q);
      const matchCat = p.category?.toLowerCase().includes(q);
      const matchType = p.garmentType?.toLowerCase().includes(q);
      return matchName || matchCat || matchType;
    }).slice(0, 6);
  }, [searchQuery, products]);

  const handleLogout = () => {
    logout();
    setUserMenuOpen(false);
    navigate('/');
  };

  // Navigation links
  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.shopAll'), path: '/shop' },
    { name: t('nav.categories'), path: '/#categories' },
    { name: t('nav.newCollection'), path: '/#new-arrivals' },
    { name: t('nav.about'), path: '/#about' },
  ];

  return (
    <>
      <header className={`lune-header ${isScrolled ? 'scrolled' : ''}`}>
        {/* Editorial Announcement Bar */}
        <div className="announcement-bar">
          <p>
            <span>{t('nav.springSummer')}</span>
            <span className="announcement-divider">/</span>
            <span>{t('nav.freeShippingPromo')}</span>
            <span className="announcement-divider">/</span>
            <Link to="/shop" className="announcement-link">{t('nav.discoverRunway')}</Link>
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
            {/* Language Switcher (VI | EN) */}
            <LanguageSwitcher showIcon={true} />

            {/* Search Trigger */}
            <button 
              className={`action-btn ${searchOpen ? 'active' : ''}`} 
              onClick={() => setSearchOpen(!searchOpen)}
              aria-label="Search collection"
            >
              <Search size={19} strokeWidth={1.75} />
            </button>

            {/* Wishlist Link (Customers & Guests only) */}
            {currentUser?.role !== 'admin' && (
              <Link 
                to="/wishlist" 
                className="action-btn" 
                aria-label="Wishlist"
                title={`Wishlist: ${wishlist.length} saved items`}
              >
                <Heart size={19} strokeWidth={1.75} />
                {wishlist.length > 0 && <span className="action-badge">{wishlist.length}</span>}
              </Link>
            )}

            {/* Shopping Bag / Cart Trigger (Customers & Guests only) */}
            {currentUser?.role !== 'admin' && (
              <button 
                className="action-btn bag-btn" 
                aria-label="Shopping Bag"
                onClick={openCart}
              >
                <ShoppingBag size={19} strokeWidth={1.75} />
                {cartCount > 0 && <span className="action-badge">{cartCount}</span>}
              </button>
            )}

            {/* Quick Admin Portal Button on Topbar (Admin only) */}
            {currentUser?.role === 'admin' && (
              <Link
                to="/admin"
                className="action-btn"
                title="Go to Admin Portal"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 12px',
                  backgroundColor: '#F9F2E7',
                  border: '1px solid #C8AE84',
                  borderRadius: '4px',
                  color: '#775B3F',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  textDecoration: 'none',
                  letterSpacing: '0.04em'
                }}
              >
                <Shield size={14} color="#775B3F" />
                <span>{t('nav.dashboard')}</span>
              </Link>
            )}

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
                          {currentUser.role === 'admin' ? t('nav.storeAdmin') : t('nav.luneMember')}
                        </span>
                        <span className="dropdown-name">{currentUser.name}</span>
                      </div>

                      <div className="dropdown-divider"></div>

                      {/* Role-based Navigation: Admin vs Customer */}
                      {currentUser.role === 'admin' ? (
                        <Link 
                          to="/admin" 
                          className="dropdown-link"
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#B45309', textDecoration: 'none', fontSize: '0.85rem', fontWeight: 600 }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Shield size={16} /> {t('nav.adminPortal')}
                        </Link>
                      ) : (
                        <Link 
                          to="/profile" 
                          className="dropdown-link"
                          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', color: '#1C1917', textDecoration: 'none', fontSize: '0.85rem' }}
                          onClick={() => setUserMenuOpen(false)}
                        >
                          <Package size={16} /> {t('nav.myAccount')}
                        </Link>
                      )}

                      <div className="dropdown-divider"></div>

                      <button 
                        type="button" 
                        className="dropdown-logout-btn"
                        onClick={handleLogout}
                      >
                        <LogOut size={14} />
                        <span>{t('nav.signOut')}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="action-btn login-action" aria-label="User Account">
                <User size={19} strokeWidth={1.75} />
                <span className="login-text">{t('nav.login')}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Expandable Live Search Drawer */}
        {searchOpen && (
          <div className="search-bar-dropdown">
            <div className="container">
              <div className="search-inner-wrapper">
                <div className="search-input-box">
                  <Search size={18} className="search-input-icon" />
                  <input 
                    ref={searchInputRef}
                    type="text" 
                    placeholder={t('nav.searchPlaceholder')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    autoFocus
                  />
                  {searchQuery ? (
                    <button 
                      type="button" 
                      className="search-clear-btn" 
                      onClick={() => {
                        setSearchQuery('');
                        searchInputRef.current?.focus();
                      }}
                      aria-label="Clear search query"
                      title={language === 'vi' ? 'Xóa từ khóa tìm kiếm' : 'Clear search query'}
                    >
                      <X size={16} />
                    </button>
                  ) : (
                    <button 
                      type="button" 
                      className="search-close-btn"
                      onClick={() => setSearchOpen(false)}
                      aria-label="Close search drawer"
                      title={language === 'vi' ? 'Đóng tìm kiếm' : 'Close search drawer'}
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Trending Searches Section (Active when input is empty) */}
                {!searchQuery.trim() && (
                  <div className="search-trending-section">
                    <div className="search-trending-label">
                      <TrendingUp size={13} />
                      <span>{t('nav.trendingSearches')}</span>
                    </div>
                    <div className="trending-chips-wrap">
                      {trendingList.map(tag => (
                        <button
                          key={tag}
                          type="button"
                          className="trending-chip"
                          onClick={() => handleTrendingClick(tag)}
                        >
                          <span>{tag}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Live Search Suggestions Dropdown */}
                {searchQuery.trim() && searchResults.length > 0 && (
                  <div className="search-results-panel">
                    <div className="search-results-header">
                      <span>{t('nav.quickSuggestions')} ({searchResults.length})</span>
                      <span>{t('nav.pressEnterToView')}</span>
                    </div>
                    <div className="search-results-list">
                      {searchResults.map(p => (
                        <Link
                          key={p.id}
                          to={`/product/${p.id}`}
                          onClick={() => setSearchOpen(false)}
                          className="search-result-item"
                        >
                          <img 
                            src={p.image} 
                            alt={p.name} 
                            className="search-result-thumb" 
                          />
                          <div className="search-result-info">
                            <div className="search-result-name">{p.name}</div>
                            <div className="search-result-meta">
                              <span className="search-result-category">{p.category}</span>
                              {p.garmentType && <span>• {p.garmentType}</span>}
                            </div>
                          </div>
                          <div className="search-result-pricing">
                            <span className="search-result-price">${p.price}</span>
                            {p.originalPrice && (
                              <span className="search-result-orig-price">${p.originalPrice}</span>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="search-results-footer">
                      <button
                        type="button"
                        className="search-view-all-btn"
                        onClick={() => executeSearch()}
                      >
                        <span>{t('nav.viewAllResults')} "{searchQuery.trim()}"</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Empty State when no items match */}
                {searchQuery.trim() && searchResults.length === 0 && (
                  <div className="search-results-panel">
                    <div className="search-empty-state">
                      <h4 className="search-empty-title">{t('nav.noResultsFound')}</h4>
                      <p className="search-empty-desc">
                        {t('nav.noResultsDescPrefix')} "{searchQuery.trim()}"{t('nav.noResultsDescSuffix')}
                      </p>
                      <div className="trending-chips-wrap" style={{ justifyContent: 'center' }}>
                        {trendingList.map(tag => (
                          <button
                            key={tag}
                            type="button"
                            className="trending-chip"
                            onClick={() => handleTrendingClick(tag)}
                          >
                            <span>{tag}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Search Drawer Backdrop Overlay */}
      {searchOpen && (
        <div 
          className="search-nav-overlay"
          onClick={() => setSearchOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Backdrop Overlay */}
      <div 
        className={`mobile-nav-overlay ${mobileMenuOpen ? 'open' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
      />

      {/* Mobile Menu Content Drawer */}
      <div 
        className={`mobile-nav-content ${mobileMenuOpen ? 'open' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="mobile-nav-header">
          <Link to="/" onClick={() => setMobileMenuOpen(false)} className="brand-logo">
            <span className="brand-name">LUNE</span>
            <span className="brand-tagline">FASHION STORE</span>
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <LanguageSwitcher />
            <button 
              onClick={() => setMobileMenuOpen(false)} 
              className="close-drawer-btn"
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Section 1: Main Navigation & Collections */}
        <div className="mobile-group-label">{t('nav.menuCollections')}</div>
        <ul className="mobile-nav-list">
          <li>
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>{t('nav.home')}</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <Link to="/shop" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>{t('nav.shopAll')}</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <Link to="/shop?category=women" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>{t('nav.women')}</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <Link to="/shop?category=men" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>{t('nav.men')}</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </Link>
          </li>
          <li>
            <a href="/#new-arrivals" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>{t('nav.newCollection')}</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </a>
          </li>
          <li>
            <a href="/#about" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
              <span>{t('nav.about')}</span>
              <ArrowRight size={16} className="nav-arrow-icon" />
            </a>
          </li>
        </ul>

        {/* Section 2: Personal Wardrobe (Customer) vs Administration (Admin) */}
        {currentUser?.role === 'admin' ? (
          <>
            <div className="mobile-group-label">{t('nav.adminPortal')}</div>
            <ul className="mobile-nav-list">
              <li>
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="mobile-nav-link">
                  <span className="link-text-wrap">
                    <Shield size={16} className="inline-icon-gold" />
                    {t('nav.adminPortal')}
                  </span>
                  <ArrowRight size={16} className="nav-arrow-icon" />
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <>
            <div className="mobile-group-label">{t('nav.menuAccount')}</div>
            <ul className="mobile-nav-list">
              <li>
                <button 
                  type="button"
                  onClick={() => { setMobileMenuOpen(false); openCart(); }} 
                  className="mobile-nav-link"
                >
                  <span className="link-text-wrap">
                    <ShoppingBag size={16} className="inline-icon-gold" />
                    {t('nav.bag')}
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
                    {t('nav.wishlist')}
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
                      {t('nav.myAccount')}
                    </span>
                    <ArrowRight size={16} className="nav-arrow-icon" />
                  </Link>
                </li>
              )}
            </ul>
          </>
        )}

        {/* Section 3: Auth CTA Buttons */}
        <div className="mobile-auth-section">
          {currentUser ? (
            <button 
              type="button" 
              className="mobile-cta-secondary mobile-cta-logout"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span>{t('nav.signOut')}</span>
            </button>
          ) : (
            <div className="mobile-cta-group">
              <Link 
                to="/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-cta-primary"
              >
                <span>{t('nav.login')}</span>
                <ArrowRight size={15} />
              </Link>
              <Link 
                to="/register" 
                onClick={() => setMobileMenuOpen(false)}
                className="mobile-cta-secondary"
              >
                <span>{t('nav.register')}</span>
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
