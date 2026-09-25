import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle, ArrowRight, Lock, User } from 'lucide-react';

export default function LoginPage() {
  const navigate = useNavigate();
  const [identifier, setIdentifier] = useState('linh@lune-atelier.com');
  const [password, setPassword] = useState('secret123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim() || !password.trim()) {
      setErrorMsg('Please enter both your Email/Username and Password.');
      return;
    }

    setIsLoading(true);

    // Simulate mock login behavior (Phase 1 Frontend only)
    setTimeout(() => {
      setIsLoading(false);
      setLoginSuccess(true);
      // Store simple mock login flag
      try {
        localStorage.setItem('lune_user_authenticated', 'true');
        localStorage.setItem('lune_user_name', identifier.split('@')[0] || 'Linh Nguyen');
      } catch (err) {
        // ignore storage errors
      }

      setTimeout(() => {
        navigate('/');
      }, 1200);
    }, 800);
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
            <span className="auth-visual-tag">LUNE ATELIER MEMBER</span>
            <h3>"Simplicity is the keynote of all true elegance."</h3>
            <p>Access your curated wishlists, bespoke fittings, and private seasonal previews.</p>
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
                <span className="brand-tagline">PARIS · STUDIO</span>
              </Link>
              <h1 className="auth-heading">Client Sign In</h1>
              <p className="auth-subheading">
                Welcome back. Sign in to experience your personalized wardrobe.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="auth-alert error">
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Feedback */}
            {loginSuccess && (
              <div className="auth-alert success">
                <CheckCircle size={18} />
                <span>Sign in successful! Redirecting to Home...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleLogin} className="auth-actual-form">
              {/* Email / Username */}
              <div className="form-group">
                <label htmlFor="identifier">Email or Username</label>
                <div className="input-with-icon">
                  <User size={16} className="input-field-icon" />
                  <input
                    id="identifier"
                    type="text"
                    placeholder="name@example.com"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <div className="label-with-action">
                  <label htmlFor="password">Password</label>
                  <button 
                    type="button" 
                    className="forgot-pass-btn"
                    onClick={() => alert('Demo: Password recovery will be supported in Phase 2.')}
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
                    onChange={(e) => setPassword(e.target.value)}
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

              {/* Google Sign In */}
              <button 
                type="button" 
                className="auth-google-btn"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    setLoginSuccess(true);
                    try {
                      localStorage.setItem('lune_user_authenticated', 'true');
                      localStorage.setItem('lune_user_name', 'Google Client');
                    } catch (err) {}
                    setTimeout(() => navigate('/'), 1200);
                  }, 700);
                }}
                disabled={isLoading || loginSuccess}
              >
                <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>
            </form>

            {/* Switch to Register */}
            <div className="auth-footer-prompt">
              <span>Don't have a LUNE account?</span>{' '}
              <Link to="/register" className="auth-accent-link">
                Register an atelier account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
