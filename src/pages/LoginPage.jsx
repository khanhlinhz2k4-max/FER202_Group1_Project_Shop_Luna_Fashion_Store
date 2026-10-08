import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  User, 
  AlertCircle, 
  KeyRound, 
  X, 
  Mail
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export default function LoginPage() {
  const { login: contextLogin, users: contextUsers } = useShop();
  const navigate = useNavigate();
  const location = useLocation();

  // Prefill if redirected from Register or Remember Me
  const prefillEmail = location.state?.registeredEmail || '';
  const rememberedId = localStorage.getItem('lune_remembered_identifier') || '';

  const [identifier, setIdentifier] = useState(prefillEmail || rememberedId || '');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(Boolean(rememberedId));
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [loggedInName, setLoggedInName] = useState('');
  const [errorMsg, setErrorMsg] = useState(location.state?.error || '');
  const [fieldErrors, setFieldErrors] = useState({});

  // Registration notice if user was redirected from RegisterPage or ProtectedRoute
  const [registeredNotice, setRegisteredNotice] = useState(
    location.state?.justRegistered ? `Account registered! Sign in to access your LUNE account.` : (location.state?.notice || '')
  );

  // Forgot password modal
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  // Seed default demo accounts (Customer & Admin) in 'lune_users' if missing
  useEffect(() => {
    try {
      const existing = localStorage.getItem('lune_users');
      let usersList = existing ? JSON.parse(existing) : [];
      if (!Array.isArray(usersList)) usersList = [];

      let modified = false;

      // 1. Demo Customer
      if (!usersList.some(u => u.email?.toLowerCase() === 'customer@lune.com' || u.username === 'linhnguyen')) {
        usersList.push({
          id: 'user-demo',
          name: 'Linh Nguyen',
          fullName: 'Linh Nguyen',
          email: 'customer@lune.com',
          username: 'linhnguyen',
          password: 'Password@123',
          role: 'user',
          phone: '+84 987 654 321',
          address: '789 Nguyen Hue, District 1, HCMC',
          createdAt: new Date().toISOString()
        });
        modified = true;
      }

      // 2. Demo Admin
      if (!usersList.some(u => u.email?.toLowerCase() === 'admin@lune.com' || u.username === 'admin')) {
        usersList.push({
          id: 'user-admin',
          name: 'Lune Administrator',
          fullName: 'Lune Administrator',
          email: 'admin@lune.com',
          username: 'admin',
          password: 'Admin@123',
          role: 'admin',
          phone: '+84 900 000 001',
          address: 'Lune Fashion HQ, 01 Le Duan, District 1, HCMC',
          createdAt: new Date().toISOString()
        });
        modified = true;
      }

      if (modified || !existing) {
        localStorage.setItem('lune_users', JSON.stringify(usersList));
        localStorage.setItem('lune_registered_users', JSON.stringify(usersList));
      }
    } catch (e) {
      console.error('Error seeding users:', e);
    }
  }, []);


  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setRegisteredNotice('');

    const errors = {};
    if (!identifier.trim()) {
      errors.identifier = 'Email or Username is required.';
    }
    if (!password) {
      errors.password = 'Password is required.';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setErrorMsg('Please enter both your Email/Username and Password.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = contextLogin(identifier, password);

      if (!result.success) {
        setIsLoading(false);
        setErrorMsg('Invalid email/username or password. Please verify your credentials.');
        setFieldErrors({
          identifier: ' ',
          password: ' '
        });
        return;
      }

      const matchedUser = result.user;

      // Authentication Success
      setIsLoading(false);
      setLoginSuccess(true);
      const displayName = matchedUser.fullName || matchedUser.name || 'Valued Member';
      setLoggedInName(displayName);

      try {
        localStorage.setItem('lune_user_authenticated', 'true');
        localStorage.setItem('lune_user_name', displayName);
        localStorage.setItem('lune_user_email', matchedUser.email);
        
        if (rememberMe) {
          localStorage.setItem('lune_remembered_identifier', identifier.trim());
        } else {
          localStorage.removeItem('lune_remembered_identifier');
        }
      } catch (e) {
        console.error('Error saving session:', e);
      }

      setTimeout(() => {
        if (matchedUser.role === 'admin' || matchedUser.email === 'admin@lune.com') {
          navigate('/admin');
        } else {
          navigate(location.state?.from?.pathname || '/');
        }
      }, 1000);
    }, 600);
  };

  const handleForgotSubmit = (e) => {
    e.preventDefault();
    if (!forgotEmail.trim()) return;
    setForgotSent(true);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-container">
        {/* Left Column: Fashion Editorial Visual */}
        <div className="auth-visual-column">
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=1200" 
            alt="LUNE Fashion Editorial" 
            className="auth-visual-img"
          />
          <div className="auth-visual-scrim"></div>
          
          <div className="auth-visual-quote">
            <span className="auth-visual-tag">LUNE FASHION STORE</span>
            <h3>"Simplicity is the keynote of all true elegance."</h3>
            <p>Access your curated wishlists, seasonal lookbooks, and private member promotions.</p>
          </div>
        </div>

        {/* Right Column: Login Form */}
        <div className="auth-form-column">
          <div className="auth-form-inner">
            {/* Back to Home Link */}
            <Link to="/" className="auth-back-link">
              <ArrowLeft size={16} />
              <span>Back to LUNE Home</span>
            </Link>

            {/* Brand Header */}
            <div className="auth-brand-header">
              <Link to="/" className="brand-logo">
                <span className="brand-name">LUNE</span>
                <span className="brand-tagline">FASHION STORE</span>
              </Link>
              <h1 className="auth-heading">Client Sign In</h1>
              <p className="auth-subheading">
                Welcome back. Sign in to experience your personalized wardrobe.
              </p>
            </div>


            {/* Registered Redirect Notice */}
            {registeredNotice && (
              <div className="auth-alert success">
                <CheckCircle size={18} />
                <span>{registeredNotice}</span>
              </div>
            )}

            {/* Error Message */}
            {errorMsg && (
              <div className="auth-alert error">
                <AlertCircle size={18} className="alert-icon-error" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Feedback */}
            {loginSuccess && (
              <div className="auth-alert success">
                <CheckCircle size={18} />
                <span>Welcome back, {loggedInName}! Entering atelier...</span>
              </div>
            )}

            {/* Quick Fill Demo */}
            <div className="demo-accounts" style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              <button 
                type="button" 
                className="btn-secondary"
                style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: '4px' }}
                onClick={() => {
                  setIdentifier('admin@lune.com');
                  setPassword('Admin@123');
                }}
              >
                Demo Admin
              </button>
              <button 
                type="button" 
                className="btn-secondary"
                style={{ flex: 1, padding: '0.5rem', fontSize: '0.8rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', backgroundColor: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)', cursor: 'pointer', borderRadius: '4px' }}
                onClick={() => {
                  setIdentifier('customer@lune.com');
                  setPassword('Password@123');
                }}
              >
                Demo Customer
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="auth-actual-form" noValidate>
              {/* Email / Username */}
              <div className={`form-group ${fieldErrors.identifier ? 'has-error' : ''}`}>
                <label htmlFor="identifier">Email or Username</label>
                <div className="input-with-icon">
                  <User size={16} className="input-field-icon" />
                  <input
                    id="identifier"
                    type="text"
                    placeholder="name@example.com or username"
                    value={identifier}
                    onChange={(e) => {
                      setIdentifier(e.target.value);
                      if (fieldErrors.identifier) setFieldErrors(prev => ({ ...prev, identifier: '' }));
                    }}
                    required
                  />
                </div>
                {fieldErrors.identifier && fieldErrors.identifier.trim() && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {fieldErrors.identifier}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className={`form-group ${fieldErrors.password ? 'has-error' : ''}`}>
                <div className="label-with-action">
                  <label htmlFor="password">Password</label>
                  <button 
                    type="button" 
                    className="forgot-pass-btn"
                    onClick={() => {
                      setShowForgotModal(true);
                      setForgotEmail(identifier.includes('@') ? identifier : '');
                      setForgotSent(false);
                    }}
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="input-with-icon">
                  <Lock size={16} className="input-field-icon" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: '' }));
                    }}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {fieldErrors.password && fieldErrors.password.trim() && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {fieldErrors.password}
                  </span>
                )}
              </div>

              {/* Remember Me */}
              <div className="remember-row">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">Remember my login</span>
                </label>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="btn-primary auth-submit-button"
                disabled={isLoading || loginSuccess}
              >
                {isLoading ? (
                  <span>AUTHENTICATING...</span>
                ) : (
                  <>
                    <span>SIGN IN</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="auth-divider">
                <span>or continue with</span>
              </div>

              {/* Social Buttons */}
              <div className="auth-social-buttons">
                {/* Google Sign In */}
                <button 
                  type="button" 
                  className="auth-social-btn"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setLoginSuccess(true);
                      setLoggedInName('Atelier Member');
                      try {
                        localStorage.setItem('lune_user_authenticated', 'true');
                        localStorage.setItem('lune_user_name', 'Atelier Member');
                        localStorage.setItem('lune_current_user', JSON.stringify({
                          id: 'user-demo',
                          name: 'Atelier Member',
                          email: 'customer@lune.com',
                          role: 'user'
                        }));
                      } catch {}
                      setTimeout(() => navigate('/'), 1000);
                    }, 600);
                  }}
                  disabled={isLoading || loginSuccess}
                >
                  <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Google</span>
                </button>

                {/* Apple Sign In */}
                <button 
                  type="button" 
                  className="auth-social-btn"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setLoginSuccess(true);
                      setLoggedInName('Atelier Member');
                      try {
                        localStorage.setItem('lune_user_authenticated', 'true');
                        localStorage.setItem('lune_user_name', 'Atelier Member');
                        localStorage.setItem('lune_current_user', JSON.stringify({
                          id: 'user-demo',
                          name: 'Atelier Member',
                          email: 'customer@lune.com',
                          role: 'user'
                        }));
                      } catch {}
                      setTimeout(() => navigate('/'), 1000);
                    }, 600);
                  }}
                  disabled={isLoading || loginSuccess}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.92 1.07.08 2.13-.52 2.79-1.32z"/>
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>
            </form>

            {/* Switch to Register */}
            <div className="auth-footer-prompt">
              <span>Don't have a LUNE account?</span>{' '}
              <Link to="/register" className="auth-accent-link">
                Create a LUNE account
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="auth-modal-overlay" onClick={() => setShowForgotModal(false)}>
          <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="modal-title-with-icon">
                <KeyRound size={20} className="modal-title-icon" />
                <h3>Reset Your Password</h3>
              </div>
              <button 
                type="button" 
                className="auth-modal-close" 
                onClick={() => setShowForgotModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className="auth-modal-body">
              {!forgotSent ? (
                <form onSubmit={handleForgotSubmit}>
                  <p style={{ marginBottom: '1.25rem', color: 'var(--text-secondary)', fontSize: '0.86rem', lineHeight: '1.6' }}>
                    Enter the email associated with your LUNE account. We will send a secure link to reset your password.
                  </p>
                  <div className="form-group">
                    <label htmlFor="forgotEmail">Account Email</label>
                    <div className="input-with-icon">
                      <Mail size={16} className="input-field-icon" />
                      <input 
                        id="forgotEmail"
                        type="email" 
                        placeholder="client@lune-atelier.com"
                        value={forgotEmail}
                        onChange={(e) => setForgotEmail(e.target.value)}
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.75rem' }}>
                    <button 
                      type="button" 
                      className="btn-secondary" 
                      style={{ flex: 1, padding: '0.75rem' }}
                      onClick={() => setShowForgotModal(false)}
                    >
                      CANCEL
                    </button>
                    <button 
                      type="submit" 
                      className="btn-primary modal-action-btn"
                      style={{ flex: 1.5 }}
                    >
                      SEND RECOVERY LINK
                    </button>
                  </div>
                </form>
              ) : (
                <div className="forgot-success-box">
                  <CheckCircle size={36} color="#0E6245" style={{ margin: '0 auto 1rem auto', display: 'block' }} />
                  <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.15rem', color: 'var(--text-primary)', marginBottom: '0.5rem', textAlign: 'center' }}>
                    Instructions Dispatched
                  </h4>
                  <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                    A temporary recovery code has been sent to <strong>{forgotEmail}</strong> (Simulated demo mode).
                  </p>
                  <button 
                    type="button" 
                    className="btn-primary modal-action-btn"
                    style={{ width: '100%', marginTop: '1.5rem' }}
                    onClick={() => setShowForgotModal(false)}
                  >
                    RETURN TO SIGN IN
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
