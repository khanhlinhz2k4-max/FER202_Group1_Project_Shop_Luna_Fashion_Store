import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff, CheckCircle, ArrowRight, Lock, Mail, User, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!fullName.trim() || !email.trim() || !username.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMsg('Vui lòng điền đầy đủ tất cả các trường thông tin.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg('Mật khẩu và xác nhận mật khẩu không khớp. Vui lòng kiểm tra lại.');
      return;
    }

    if (password.length < 6) {
      setErrorMsg('Mật khẩu phải có độ dài tối thiểu từ 6 ký tự.');
      return;
    }

    if (!agreeTerms) {
      setErrorMsg('Vui lòng tích đồng ý với Điều khoản & Chính sách của LUNE.');
      return;
    }

    setIsLoading(true);

    // Simulate mock registration behavior (Phase 1 Frontend only)
    setTimeout(() => {
      setIsLoading(false);
      setRegisterSuccess(true);

      setTimeout(() => {
        navigate('/login');
      }, 1500);
    }, 800);
  };

  return (
    <div className="auth-page-wrapper">
      <div className="auth-split-container">
        {/* Left Column: Fashion Editorial Visual */}
        <div className="auth-visual-column">
          <img 
            src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=85&w=1200" 
            alt="LUNE Runway Editorial" 
            className="auth-visual-img"
          />
          <div className="auth-visual-scrim"></div>
          
          <div className="auth-visual-quote">
            <span className="auth-visual-tag">BECOME A CLIENT</span>
            <h3>"Fashion changes, but style endures."</h3>
            <p>Join the LUNE private circle to receive early drops, tailored recommendations, and seasonal runway invitations.</p>
          </div>
        </div>

        {/* Right Column: Register Form */}
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
              <h1 className="auth-heading">Join The Atelier</h1>
              <p className="auth-subheading">
                Create your membership account to begin your curated journey.
              </p>
            </div>

            {/* Error Message */}
            {errorMsg && (
              <div className="auth-alert error">
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Feedback */}
            {registerSuccess && (
              <div className="auth-alert success">
                <CheckCircle size={18} />
                <span>Đăng ký thành công! Đang chuyển sang trang Đăng nhập...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegister} className="auth-actual-form">
              {/* Full Name */}
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-field-icon" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="Linh Nguyen"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-field-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="client@lune-atelier.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Username */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <div className="input-with-icon">
                  <User size={16} className="input-field-icon" />
                  <input
                    id="username"
                    type="text"
                    placeholder="linhnguyen2026"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-field-icon" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="At least 6 characters"
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

              {/* Confirm Password */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-field-icon" />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Terms Agreement */}
              <div className="remember-row">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I agree to the LUNE Privacy Policy & Terms of Service
                  </span>
                </label>
              </div>

              {/* Submit CTA */}
              <button 
                type="submit" 
                className="btn-primary auth-submit-button"
                disabled={isLoading || registerSuccess}
              >
                {isLoading ? (
                  <span>CREATING ACCOUNT...</span>
                ) : (
                  <>
                    <span>REGISTER ACCOUNT</span>
                    <ArrowRight size={15} />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="auth-divider">
                <span>or register with</span>
              </div>

              {/* Google Sign Up */}
              <button 
                type="button" 
                className="auth-google-btn"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    setIsLoading(false);
                    setRegisterSuccess(true);
                    setTimeout(() => navigate('/login'), 1500);
                  }, 700);
                }}
                disabled={isLoading || registerSuccess}
              >
                <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Sign up with Google</span>
              </button>
            </form>

            {/* Switch to Login */}
            <div className="auth-footer-prompt">
              <span>Already have an atelier account?</span>{' '}
              <Link to="/login" className="auth-accent-link">
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
