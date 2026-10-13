import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Mail, 
  Check, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Sparkles,
  AlertCircle,
  X,
  CheckCircle2
} from 'lucide-react';
import './Footer.css';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subscribed, setSubscribed] = useState(() => {
    try {
      return Boolean(localStorage.getItem('lune_newsletter_subscriber'));
    } catch {
      return false;
    }
  });
  const [showToast, setShowToast] = useState(false);
  const [toastEmail, setToastEmail] = useState('');
  const [policyModalOpen, setPolicyModalOpen] = useState(false);
  const [activePolicyTab, setActivePolicyTab] = useState('exchange'); // 'exchange' | 'warranty'

  // Auto-hide toast after 5 seconds
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const validateEmail = (val) => {
    const trimmed = val.trim();
    if (!trimmed) {
      return 'Please enter your email address.';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return 'Please enter a valid email address (e.g., name@domain.com).';
    }
    return '';
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (emailError) {
      setEmailError('');
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    const error = validateEmail(email);
    if (error) {
      setEmailError(error);
      return;
    }

    // Success subscription
    const submittedEmail = email.trim();
    setSubscribed(true);
    setToastEmail(submittedEmail);
    setShowToast(true);
    setEmail('');
    setEmailError('');

    try {
      localStorage.setItem('lune_newsletter_subscriber', submittedEmail);
    } catch {
      // localStorage fallback
    }
  };

  const openPolicyModal = (type = 'exchange') => {
    setActivePolicyTab(type);
    setPolicyModalOpen(true);
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

            <div 
              className="pillar-item pillar-clickable"
              onClick={() => openPolicyModal('exchange')}
              title="Click to view our 30-Day Exchange & Return Policy"
            >
              <div className="pillar-icon-wrap">
                <RotateCcw size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Atelier Exchanges
                  <span style={{ fontSize: '0.65rem', color: '#CAA072', fontWeight: 400 }}>[INFO]</span>
                </h4>
                <p>Seamless 30-day returns and bespoke fittings</p>
              </div>
            </div>

            <div 
              className="pillar-item pillar-clickable"
              onClick={() => openPolicyModal('warranty')}
              title="Click to view our Garment Warranty & Seam Care Guarantee"
            >
              <div className="pillar-icon-wrap">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4 style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  Verified Authenticity
                  <span style={{ fontSize: '0.65rem', color: '#CAA072', fontWeight: 400 }}>[INFO]</span>
                </h4>
                <p>Lifetime seam warranty & serialized tags</p>
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
                <li><Link to="/shop?category=women">Women's Wardrobe</Link></li>
                <li><Link to="/shop?category=men">Men's Collection</Link></li>
                <li><Link to="/shop">All Collections</Link></li>
                <li><a href="/#categories">Product Categories</a></li>
                <li><a href="/#about">About LUNE</a></li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Policies */}
            <div className="footer-col">
              <h4 className="footer-heading">Customer Care</h4>
              <ul className="footer-links">
                <li>
                  <button 
                    type="button" 
                    onClick={() => openPolicyModal('exchange')}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                  >
                    30-Day Return & Exchange Policy
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => openPolicyModal('warranty')}
                    style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer', textAlign: 'left' }}
                  >
                    Garment Warranty & Care
                  </button>
                </li>
                <li><Link to="/login">Client Sign In</Link></li>
                <li><Link to="/register">Create Account</Link></li>
                <li><a href="/#about">Our Atelier Story</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="footer-col newsletter-col">
              <h4 className="footer-heading">The LUNE Journal</h4>
              <p className="newsletter-desc">
                Subscribe for seasonal lookbooks, new silhouettes, and an exclusive 10% welcome invitation.
              </p>

              {subscribed ? (
                <div className="subscribe-success-box">
                  <CheckCircle2 size={20} className="subscribe-success-icon" />
                  <div>
                    <div className="subscribe-success-title">Welcome to The Journal</div>
                    <div className="subscribe-success-desc">
                      Your invitation and complimentary 10% welcome code have been activated.
                    </div>
                    <span className="subscribe-promo-code">PROMO: LUNE10</span>
                  </div>
                </div>
              ) : (
                <div className="newsletter-form-container">
                  <form 
                    onSubmit={handleSubscribe} 
                    className={`newsletter-form ${emailError ? 'has-error' : ''}`}
                    noValidate
                  >
                    <div className="newsletter-input-wrap">
                      <Mail size={16} className="mail-icon" />
                      <input 
                        type="email" 
                        placeholder="Enter your email address"
                        value={email}
                        onChange={handleEmailChange}
                        aria-label="Email for newsletter subscription"
                      />
                    </div>
                    <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
                      <span>JOIN</span>
                      <ArrowRight size={14} />
                    </button>
                  </form>

                  {emailError && (
                    <div className="newsletter-error-message" role="alert">
                      <AlertCircle size={14} />
                      <span>{emailError}</span>
                    </div>
                  )}
                </div>
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
            <button 
              type="button" 
              onClick={() => openPolicyModal('exchange')}
              style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
            >
              30-Day Guarantee
            </button>
            <span className="dot">·</span>
            <button 
              type="button" 
              onClick={() => openPolicyModal('warranty')}
              style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
            >
              Lifetime Warranty
            </button>
            <span className="dot">·</span>
            <Link to="/register">Membership</Link>
            <span className="dot">·</span>
            <a href="/#about">About Us</a>
          </div>
        </div>
      </div>

      {/* Floating Success Toast Notification */}
      {showToast && (
        <div className="footer-toast" role="status" aria-live="polite">
          <div className="toast-icon-wrap">
            <Check size={18} />
          </div>
          <div className="toast-content">
            <div className="toast-title">Subscription Successful</div>
            <div className="toast-message">
              Welcome to <strong>The LUNE Journal</strong>. Your 10% welcome coupon <code>LUNE10</code> has been sent to <strong>{toastEmail}</strong>.
            </div>
          </div>
          <button 
            type="button" 
            className="toast-close-btn" 
            onClick={() => setShowToast(false)}
            aria-label="Dismiss toast"
          >
            <X size={16} />
          </button>
        </div>
      )}

      {/* Policy Details Modal */}
      {policyModalOpen && (
        <div 
          className="policy-modal-overlay"
          onClick={() => setPolicyModalOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="policy-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="policy-modal-header">
              <div>
                <span className="policy-modal-eyebrow">LUNE ATELIER STANDARDS</span>
                <h2 className="policy-modal-title">
                  {activePolicyTab === 'exchange' ? '30-Day Exchange & Return Policy' : 'Garment Warranty & Care Commitment'}
                </h2>
              </div>
              <button 
                type="button"
                className="policy-modal-close"
                onClick={() => setPolicyModalOpen(false)}
                aria-label="Close policy dialog"
              >
                <X size={20} />
              </button>
            </div>

            {activePolicyTab === 'exchange' ? (
              <div className="policy-body">
                <div className="policy-section-block">
                  <h3>
                    <RotateCcw size={18} />
                    Seamless 30-Day Exchanges
                  </h3>
                  <p>
                    At LUNE Fashion Store, your satisfaction with fit and silhouette is paramount. We provide a 30-day window from receipt of delivery to request a complimentary size exchange or return.
                  </p>
                </div>

                <div className="policy-steps-grid">
                  <div className="policy-step-card">
                    <div className="policy-step-num">01. Request</div>
                    <div className="policy-step-text">
                      Contact our customer concierge with your order code (e.g., LUNE-1049) to indicate your desired replacement size or return.
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">02. Doorstep Pickup</div>
                    <div className="policy-step-text">
                      Our premium courier coordinates a complimentary doorstep collection at your convenience.
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">03. Swift Fulfillment</div>
                    <div className="policy-step-text">
                      Your replacement garment is dispatched immediately upon pickup verification.
                    </div>
                  </div>
                </div>

                <div className="policy-section-block">
                  <h4 style={{ fontSize: '0.92rem', color: '#775B3F', marginBottom: '0.35rem' }}>Eligibility Guidelines:</h4>
                  <p style={{ fontSize: '0.82rem', color: '#5C4A3A' }}>
                    • Garments must remain unwashed, unworn, and unaltered.<br />
                    • All serialized atelier tags and protective dust bags must be intact.<br />
                    • Complimentary for all domestic orders within 30 days.
                  </p>
                </div>
              </div>
            ) : (
              <div className="policy-body">
                <div className="policy-section-block">
                  <h3>
                    <ShieldCheck size={18} />
                    Lifetime Craftsmanship Warranty
                  </h3>
                  <p>
                    Every LUNE creation is constructed with single-origin textiles and French reinforced seams designed to transcend seasonal trends.
                  </p>
                </div>

                <div className="policy-steps-grid">
                  <div className="policy-step-card">
                    <div className="policy-step-num">Seam Integrity</div>
                    <div className="policy-step-text">
                      Complimentary atelier re-stitching and button replacement for the entire lifetime of your garment.
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">Natural Fibers</div>
                    <div className="policy-step-text">
                      Certified pure mulberry silks, organic French linens, and ethically sourced Mongolian cashmere.
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">Bespoke Adjustments</div>
                    <div className="policy-step-text">
                      Sleeve and hem tailoring adjustments available for VIP members and tailored suits.
                    </div>
                  </div>
                </div>

                <div className="policy-section-block">
                  <h4 style={{ fontSize: '0.92rem', color: '#775B3F', marginBottom: '0.35rem' }}>Textile Care Recommendations:</h4>
                  <p style={{ fontSize: '0.82rem', color: '#5C4A3A' }}>
                    • Mulberry Silk: Dry clean or cold hand wash with neutral silk detergent.<br />
                    • Mongolian Cashmere: Flat air dry away from direct sunlight; gentle steam only.<br />
                    • French Washed Linen: Machine wash delicate at 30°C; embrace natural organic texture.
                  </p>
                </div>
              </div>
            )}

            <div className="policy-modal-footer">
              <button 
                type="button" 
                className="btn-primary"
                onClick={() => setPolicyModalOpen(false)}
              >
                <span>UNDERSTOOD</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
