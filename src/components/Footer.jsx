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
import { useLanguage } from '../context/LanguageContext';
import './Footer.css';

export default function Footer() {
  const { t } = useLanguage();
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
      return t('footer.emailRequired', 'Please enter your email address.');
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return t('footer.emailInvalid', 'Please enter a valid email address (e.g., name@domain.com).');
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
            <div 
              className="pillar-item pillar-clickable"
              onClick={() => openPolicyModal('delivery')}
              title={t('footer.pillarDeliveryTooltip', 'Click to view our Complimentary Delivery & Packaging Standards')}
            >
              <div className="pillar-icon-wrap">
                <Truck size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">
                  {t('footer.pillarDeliveryTitle', 'Complimentary Delivery')}
                </h4>
                <p>{t('footer.pillarDeliveryDesc', 'On all domestic purchases exceeding $150')}</p>
              </div>
            </div>

            <div 
              className="pillar-item pillar-clickable"
              onClick={() => openPolicyModal('sustainable')}
              title={t('footer.pillarSustainableTooltip', 'Click to view our Sustainable Sourcing & Eco Ethics')}
            >
              <div className="pillar-icon-wrap">
                <Sparkles size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">
                  {t('footer.pillarSustainableTitle', 'Sustainable Luxury')}
                </h4>
                <p>{t('footer.pillarSustainableDesc', 'Natural silks, organic linens, ethical ateliers')}</p>
              </div>
            </div>

            <div 
              className="pillar-item pillar-clickable"
              onClick={() => openPolicyModal('exchange')}
              title={t('footer.pillarExchangeTooltip', 'Click to view our 30-Day Exchange & Return Policy')}
            >
              <div className="pillar-icon-wrap">
                <RotateCcw size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">
                  {t('footer.pillarExchangeTitle', 'Atelier Exchanges')}
                </h4>
                <p>{t('footer.pillarExchangeDesc', 'Seamless 30-day returns and bespoke fittings')}</p>
              </div>
            </div>

            <div 
              className="pillar-item pillar-clickable"
              onClick={() => openPolicyModal('warranty')}
              title={t('footer.pillarAuthTooltip', 'Click to view our Garment Warranty & Seam Care Guarantee')}
            >
              <div className="pillar-icon-wrap">
                <ShieldCheck size={20} strokeWidth={1.5} />
              </div>
              <div className="pillar-text">
                <h4 className="pillar-title">
                  {t('footer.pillarAuthTitle', 'Verified Authenticity')}
                </h4>
                <p>{t('footer.pillarAuthDesc', 'Lifetime seam warranty & serialized tags')}</p>
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
                {t('footer.brandDesc')}
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
              <h4 className="footer-heading">{t('footer.categoriesHeading', 'CATEGORIES')}</h4>
              <ul className="footer-links">
                <li><Link to="/shop?category=women">{t('footer.womenLink', "Women's Collection")}</Link></li>
                <li><Link to="/shop?category=men">{t('footer.menLink', "Men's Collection")}</Link></li>
                <li><Link to="/shop">{t('footer.shopAllLink', 'Shop All Garments')}</Link></li>
                <li><a href="/#categories">{t('footer.curatedLink', 'Curated Silhouettes')}</a></li>
                <li><a href="/#new-arrivals">{t('footer.newCollectionLink', 'New Arrivals')}</a></li>
              </ul>
            </div>

            {/* Column 3: Customer Care & Policies */}
            <div className="footer-col">
              <h4 className="footer-heading">{t('footer.clientCareTitle', 'CUSTOMER CARE')}</h4>
              <ul className="footer-links">
                <li>
                  <button 
                    type="button" 
                    onClick={() => openPolicyModal('exchange')}
                    className="footer-link-btn"
                  >
                    {t('footer.returnPolicy', '30-Day Exchange Policy')}
                  </button>
                </li>
                <li>
                  <button 
                    type="button" 
                    onClick={() => openPolicyModal('warranty')}
                    className="footer-link-btn"
                  >
                    {t('footer.shippingPolicy', 'Garment Warranty & Care')}
                  </button>
                </li>
                <li><Link to="/login">{t('footer.loginLink', 'Client Login')}</Link></li>
                <li><Link to="/register">{t('footer.registerLink', 'Member Registration')}</Link></li>
                <li><a href="/#about">{t('footer.aboutLink', 'About LUNE Atelier')}</a></li>
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="footer-col newsletter-col">
              <h4 className="footer-heading">{t('footer.newsletterTitle')}</h4>
              <p className="newsletter-desc">
                {t('footer.newsletterDesc')}
              </p>

              {subscribed ? (
                <div className="subscribe-success-box">
                  <CheckCircle2 size={20} className="subscribe-success-icon" />
                  <div>
                    <div className="subscribe-success-title">{t('footer.welcomeTitle', 'Welcome to Atelier Lune')}</div>
                    <div className="subscribe-success-desc">
                      {t('footer.subscribedSuccess')}
                    </div>
                    <span className="subscribe-promo-code">{t('footer.promoCodeLabel', 'PROMO: LUNE10')}</span>
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
                        placeholder={t('footer.newsletterPlaceholder', 'Enter your email address')}
                        value={email}
                        onChange={handleEmailChange}
                        aria-label="Email for newsletter subscription"
                      />
                    </div>
                    <button type="submit" className="newsletter-btn" aria-label="Subscribe to newsletter">
                      <span>{t('footer.newsletterBtn', 'JOIN')}</span>
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
            {t('footer.copyright')}
          </p>
          <div className="footer-legal">
            <button 
              type="button" 
              onClick={() => openPolicyModal('exchange')}
              style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
            >
              {t('footer.guaranteeLegal', '30-Day Guarantee')}
            </button>
            <span className="dot">·</span>
            <button 
              type="button" 
              onClick={() => openPolicyModal('warranty')}
              style={{ background: 'none', border: 'none', color: 'inherit', font: 'inherit', padding: 0, cursor: 'pointer' }}
            >
              {t('footer.warrantyLegal', 'Lifetime Warranty')}
            </button>
            <span className="dot">·</span>
            <Link to="/register">{t('footer.membershipLegal', 'Membership')}</Link>
            <span className="dot">·</span>
            <a href="/#about">{t('footer.aboutLegal', 'About Us')}</a>
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
            <div className="toast-title">{t('footer.toastTitle', 'Subscription Successful')}</div>
            <div className="toast-message">
              {t('footer.toastMsgWelcome', 'Welcome to')} <strong>{t('footer.toastMsgJournal', 'The LUNE Journal')}</strong>{t('footer.toastMsgCoupon', '. Your 10% welcome coupon')} <code>LUNE10</code> {t('footer.toastMsgSent', 'has been sent to')} <strong>{toastEmail}</strong>.
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
                <span className="policy-modal-eyebrow">{t('footer.standardsEyebrow', 'LUNE ATELIER STANDARDS')}</span>
                <h2 className="policy-modal-title">
                  {activePolicyTab === 'delivery' && t('footer.deliveryModalTitle', 'Complimentary Delivery & White-Glove Standards')}
                  {activePolicyTab === 'sustainable' && t('footer.sustainableModalTitle', 'Sustainable Sourcing & Ecological Ethics')}
                  {activePolicyTab === 'exchange' && t('footer.exchangeModalTitle', '30-Day Exchange & Return Policy')}
                  {activePolicyTab === 'warranty' && t('footer.warrantyModalTitle', 'Garment Warranty & Care Commitment')}
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

            {/* Modal Quick Tabs Navigation */}
            <div className="policy-tabs-nav">
              <button
                type="button"
                className={`policy-tab-btn ${activePolicyTab === 'delivery' ? 'active' : ''}`}
                onClick={() => setActivePolicyTab('delivery')}
              >
                <Truck size={14} />
                <span>{t('footer.tabDelivery', 'Delivery')}</span>
              </button>
              <button
                type="button"
                className={`policy-tab-btn ${activePolicyTab === 'sustainable' ? 'active' : ''}`}
                onClick={() => setActivePolicyTab('sustainable')}
              >
                <Sparkles size={14} />
                <span>{t('footer.tabSustainable', 'Sustainability')}</span>
              </button>
              <button
                type="button"
                className={`policy-tab-btn ${activePolicyTab === 'exchange' ? 'active' : ''}`}
                onClick={() => setActivePolicyTab('exchange')}
              >
                <RotateCcw size={14} />
                <span>{t('footer.tabExchange', 'Exchanges')}</span>
              </button>
              <button
                type="button"
                className={`policy-tab-btn ${activePolicyTab === 'warranty' ? 'active' : ''}`}
                onClick={() => setActivePolicyTab('warranty')}
              >
                <ShieldCheck size={14} />
                <span>{t('footer.tabWarranty', 'Warranty')}</span>
              </button>
            </div>

            {activePolicyTab === 'delivery' && (
              <div className="policy-body">
                <div className="policy-section-block">
                  <h3>
                    <Truck size={18} />
                    {t('footer.deliveryHeading', 'White-Glove Express Fulfillment & Presentation')}
                  </h3>
                  <p>
                    {t('footer.deliveryDesc', 'Every LUNE creation is prepared under our private client protocol: meticulously hand-steamed, wrapped in archival tissue paper, boxed in our signature linen gift case, and wax sealed.')}
                  </p>
                </div>

                <div className="policy-steps-grid">
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.dStep1Title', '01. Atelier Curation')}</div>
                    <div className="policy-step-text">
                      {t('footer.dStep1Desc', 'Each garment undergoes inspection, gentle vertical steam treatment, and professional boutique folding.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.dStep2Title', '02. Signature Packaging')}</div>
                    <div className="policy-step-text">
                      {t('footer.dStep2Desc', 'Housed in our bespoke linen presentation box with ribbon closure and hand-stamped gold wax seal.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.dStep3Title', '03. Express Transit')}</div>
                    <div className="policy-step-text">
                      {t('footer.dStep3Desc', 'Dispatched via premium couriers: 2-4 hours urban express and 24-48 hours nationwide with live tracking.')}
                    </div>
                  </div>
                </div>

                <div className="policy-section-block">
                  <h4 style={{ fontSize: '0.92rem', color: '#775B3F', marginBottom: '0.35rem' }}>{t('footer.deliveryGuidelinesTitle', 'Delivery Privileges:')}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#5C4A3A' }}>
                    {t('footer.dGuide1', '• Complimentary nationwide delivery on all purchases exceeding $150.')}<br />
                    {t('footer.dGuide2', '• White-glove doorstep inspection and fitting verification available upon delivery.')}<br />
                    {t('footer.dGuide3', '• Specialized protective garment bags ensure impeccable silhouette retention in transit.')}
                  </p>
                </div>
              </div>
            )}

            {activePolicyTab === 'sustainable' && (
              <div className="policy-body">
                <div className="policy-section-block">
                  <h3>
                    <Sparkles size={18} />
                    {t('footer.sustainableHeading', 'Conscious Luxury & Ethical Natural Fibers')}
                  </h3>
                  <p>
                    {t('footer.sustainableDesc', 'Lune rejects synthetic petroleum-based textiles. All collections utilize certified single-origin natural fibers harvested under strict fair-trade and regenerative agriculture protocols.')}
                  </p>
                </div>

                <div className="policy-steps-grid">
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.sStep1Title', 'Pure Mulberry Silk')}</div>
                    <div className="policy-step-text">
                      {t('footer.sStep1Desc', 'Long-filament mulberry silk woven at slow loom speeds for unrivaled drape, breathability, and skin comfort.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.sStep2Title', 'Organic French Flax Linen')}</div>
                    <div className="policy-step-text">
                      {t('footer.sStep2Desc', 'Rain-fed Normandy flax grown without chemical pesticides, reducing fresh water consumption by 80%.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.sStep3Title', 'Ethical Mongolian Cashmere')}</div>
                    <div className="policy-step-text">
                      {t('footer.sStep3Desc', 'Cruelty-free hand-combed underfleece gathered during spring molting, preserving grasslands and pastoral communities.')}
                    </div>
                  </div>
                </div>

                <div className="policy-section-block">
                  <h4 style={{ fontSize: '0.92rem', color: '#775B3F', marginBottom: '0.35rem' }}>{t('footer.sustainableGuidelinesTitle', 'Atelier Ecological Commitments:')}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#5C4A3A' }}>
                    {t('footer.sGuide1', '• 100% recyclable FSC-certified presentation boxes, compostable garment mailers, and plastic-free trims.')}<br />
                    {t('footer.sGuide2', '• Low-impact certified vegetable and botanical dye processes meeting European Oeko-Tex standards.')}<br />
                    {t('footer.sGuide3', '• Timeless architecture silhouettes tailored to endure across generations rather than fast-fashion cycles.')}
                  </p>
                </div>
              </div>
            )}

            {activePolicyTab === 'exchange' && (
              <div className="policy-body">
                <div className="policy-section-block">
                  <h3>
                    <RotateCcw size={18} />
                    {t('footer.exchangeHeading', 'Seamless 30-Day Exchanges')}
                  </h3>
                  <p>
                    {t('footer.exchangeDesc', 'At LUNE Fashion Store, your satisfaction with fit and silhouette is paramount. We provide a 30-day window from receipt of delivery to request a complimentary size exchange or return.')}
                  </p>
                </div>

                <div className="policy-steps-grid">
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.step1Title', '01. Request')}</div>
                    <div className="policy-step-text">
                      {t('footer.step1Desc', 'Contact our customer concierge with your order code (e.g., LUNE-1049) to indicate your desired replacement size or return.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.step2Title', '02. Doorstep Pickup')}</div>
                    <div className="policy-step-text">
                      {t('footer.step2Desc', 'Our premium courier coordinates a complimentary doorstep collection at your convenience.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.step3Title', '03. Swift Fulfillment')}</div>
                    <div className="policy-step-text">
                      {t('footer.step3Desc', 'Your replacement garment is dispatched immediately upon pickup verification.')}
                    </div>
                  </div>
                </div>

                <div className="policy-section-block">
                  <h4 style={{ fontSize: '0.92rem', color: '#775B3F', marginBottom: '0.35rem' }}>{t('footer.guidelinesTitle', 'Eligibility Guidelines:')}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#5C4A3A' }}>
                    {t('footer.guide1', '• Garments must remain unwashed, unworn, and unaltered.')}<br />
                    {t('footer.guide2', '• All serialized atelier tags and protective dust bags must be intact.')}<br />
                    {t('footer.guide3', '• Complimentary for all domestic orders within 30 days.')}
                  </p>
                </div>
              </div>
            )}

            {activePolicyTab === 'warranty' && (
              <div className="policy-body">
                <div className="policy-section-block">
                  <h3>
                    <ShieldCheck size={18} />
                    {t('footer.warrantyHeading', 'Lifetime Craftsmanship Warranty')}
                  </h3>
                  <p>
                    {t('footer.warrantyDesc', 'Every LUNE creation is constructed with single-origin textiles and French reinforced seams designed to transcend seasonal trends.')}
                  </p>
                </div>

                <div className="policy-steps-grid">
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.wStep1Title', 'Seam Integrity')}</div>
                    <div className="policy-step-text">
                      {t('footer.wStep1Desc', 'Complimentary atelier re-stitching and button replacement for the entire lifetime of your garment.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.wStep2Title', 'Natural Fibers')}</div>
                    <div className="policy-step-text">
                      {t('footer.wStep2Desc', 'Certified pure mulberry silks, organic French linens, and ethically sourced Mongolian cashmere.')}
                    </div>
                  </div>
                  <div className="policy-step-card">
                    <div className="policy-step-num">{t('footer.wStep3Title', 'Bespoke Adjustments')}</div>
                    <div className="policy-step-text">
                      {t('footer.wStep3Desc', 'Sleeve and hem tailoring adjustments available for VIP members and tailored suits.')}
                    </div>
                  </div>
                </div>

                <div className="policy-section-block">
                  <h4 style={{ fontSize: '0.92rem', color: '#775B3F', marginBottom: '0.35rem' }}>{t('footer.careTitle', 'Textile Care Recommendations:')}</h4>
                  <p style={{ fontSize: '0.82rem', color: '#5C4A3A' }}>
                    {t('footer.careSilk', '• Mulberry Silk: Dry clean or cold hand wash with neutral silk detergent.')}<br />
                    {t('footer.careCashmere', '• Mongolian Cashmere: Flat air dry away from direct sunlight; gentle steam only.')}<br />
                    {t('footer.careLinen', '• French Washed Linen: Machine wash delicate at 30°C; embrace natural organic texture.')}
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
                <span>{t('footer.understoodBtn', 'UNDERSTOOD')}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}
