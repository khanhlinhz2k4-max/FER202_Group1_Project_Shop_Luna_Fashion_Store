import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles 
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="lune-footer">
      {/* Brand Value Pillars */}
      <div className="footer-pillars">
        <div className="container">
          <div className="pillars-grid">
            <div className="pillar-item">
              <div className="pillar-icon-wrap">
                <Truck size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4>Complimentary Delivery</h4>
                <p>On all domestic purchases exceeding $150</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-wrap">
                <Sparkles size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4>Sustainable Luxury</h4>
                <p>Natural silks, organic linens, ethical ateliers</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-wrap">
                <RotateCcw size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4>Atelier Exchanges</h4>
                <p>Seamless 30-day returns and bespoke fittings</p>
              </div>
            </div>

            <div className="pillar-item">
              <div className="pillar-icon-wrap">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4>Verified Authenticity</h4>
                <p>Single-origin craftsmanship with serialized tags</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="footer-main">
        <div className="container">
          <div className="footer-grid">
            {/* Column 1: Brand Info */}
            <div className="footer-col brand-col">
              <Link to="/" className="footer-logo">
                <span className="logo-text">LUNE</span>
                <span className="logo-sub">FASHION STORE</span>
              </Link>
              <p className="brand-statement">
                Curating timeless silhouettes with modern precision. Tailored for the individual who values subtle luxury, tactile natural fabrics, and enduring grace.
              </p>
              <div className="social-links">
                <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram" className="social-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                  </svg>
                </a>
                <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook" className="social-icon">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a href="https://pinterest.com" target="_blank" rel="noreferrer" aria-label="Pinterest" className="social-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.171-2.911 1.024 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026l.032-.026z"/>
                  </svg>
                </a>
              </div>
            </div>

            {/* Column 2: Runway Collections */}
            <div className="footer-col">
              <h4 className="footer-heading">Collections</h4>
              <ul className="footer-links">
                <li><a href="/#new-arrivals">Women's Wardrobe</a></li>
                <li><a href="/#new-arrivals">Men's Collection</a></li>
                <li><a href="/#new-arrivals">New Arrivals</a></li>
                <li><a href="/#categories">Product Categories</a></li>
                <li><a href="/#about">About LUNE</a></li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Account */}
            <div className="footer-col">
              <h4 className="footer-heading">Customer Care</h4>
              <ul className="footer-links">
                <li><Link to="/login">Client Sign In</Link></li>
                <li><Link to="/register">Create Account</Link></li>
                <li><a href="/#about">Our Story</a></li>
                <li><a href="/#about">Size & Fit Policy</a></li>
                <li><Link to="/">Home Store</Link></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="footer-col newsletter-col">
              <h4 className="footer-heading">The LUNE Journal</h4>
              <p className="newsletter-desc">
                Subscribe for seasonal lookbooks, new drops, and exclusive member promotions.
              </p>

              {subscribed ? (
                <div className="subscribe-success">
                  <Check size={18} className="success-icon" />
                  <span>Welcome to LUNE. Your invitation is on its way.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="newsletter-form">
                  <div className="newsletter-input-wrap">
                    <Mail size={16} className="mail-icon" />
                    <input 
                      type="email" 
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="newsletter-btn">
                    <span>JOIN</span>
                    <ArrowRight size={14} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="copyright">
            © 2026 LUNE Fashion Store. All rights reserved.
          </p>
          <div className="footer-legal">
            <Link to="/login">Client Portal</Link>
            <span className="dot">·</span>
            <Link to="/register">Membership</Link>
            <span className="dot">·</span>
            <a href="/#about">About Us</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
