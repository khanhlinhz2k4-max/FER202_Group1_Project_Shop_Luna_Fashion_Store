import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  ArrowRight, 
  Lock, 
  Mail, 
  User, 
  ShieldCheck, 
  AlertCircle, 
  Check, 
  X,
  FileText
} from 'lucide-react';

export default function RegisterPage() {
  const navigate = useNavigate();

  // Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);

  // Status & Validation states
  const [fieldErrors, setFieldErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [generalError, setGeneralError] = useState('');
  const [showTermsModal, setShowTermsModal] = useState(false);

  // Password validation rules
  const passwordCriteria = {
    length: password.length >= 8,
    case: /[A-Z]/.test(password) && /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password),
  };

  const passedCriteriaCount = Object.values(passwordCriteria).filter(Boolean).length;

  const getStrengthMeta = () => {
    if (password.length === 0) return { label: '', color: '', percent: 0, tone: '' };
    if (passedCriteriaCount <= 1) return { label: 'Weak', color: '#DC2626', percent: 25, tone: 'weak' };
    if (passedCriteriaCount <= 3) return { label: 'Medium', color: '#D97706', percent: 65, tone: 'medium' };
    return { label: 'Strong & Secure', color: '#057A55', percent: 100, tone: 'strong' };
  };

  const strength = getStrengthMeta();

  // Helper validation for each field
  const validateField = (fieldName, value) => {
    let err = '';
    if (fieldName === 'fullName') {
      if (!value.trim()) err = 'Full name is required.';
      else if (value.trim().length < 2) err = 'Full name must be at least 2 characters.';
    } else if (fieldName === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) err = 'Email address is required.';
      else if (!emailRegex.test(value.trim())) err = 'Please enter a valid email format (e.g. name@domain.com).';
    } else if (fieldName === 'username') {
      if (!value.trim()) err = 'Username is required.';
      else if (value.trim().length < 3) err = 'Username must be at least 3 characters.';
      else if (/\s/.test(value)) err = 'Username cannot contain spaces.';
    } else if (fieldName === 'password') {
      if (!value) err = 'Password is required.';
      else if (value.length < 8) err = 'Password must be at least 8 characters.';
      else if (!passwordCriteria.case) err = 'Password must include both uppercase and lowercase letters.';
      else if (!passwordCriteria.number && !passwordCriteria.special) err = 'Password must include at least one number or special symbol.';
    } else if (fieldName === 'confirmPassword') {
      if (!value) err = 'Please confirm your password.';
      else if (value !== password) err = 'Passwords do not match.';
    }
    return err;
  };

  const handleBlur = (field, val) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const err = validateField(field, val);
    setFieldErrors(prev => ({ ...prev, [field]: err }));
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setGeneralError('');

    // Mark all as touched
    setTouched({
      fullName: true,
      email: true,
      username: true,
      password: true,
      confirmPassword: true,
    });

    // Validate all
    const nameErr = validateField('fullName', fullName);
    const emailErr = validateField('email', email);
    const userErr = validateField('username', username);
    const passErr = validateField('password', password);
    const confErr = validateField('confirmPassword', confirmPassword);

    const allErrors = {
      fullName: nameErr,
      email: emailErr,
      username: userErr,
      password: passErr,
      confirmPassword: confErr,
    };
    setFieldErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) {
      setGeneralError('Please review and resolve the errors highlighted below.');
      return;
    }

    if (!agreeTerms) {
      setGeneralError('Please review and accept our Terms of Service & Privacy Policy.');
      return;
    }

    // Check existing accounts in localStorage
    let registeredUsers = [];
    try {
      const stored = localStorage.getItem('lune_registered_users');
      registeredUsers = stored ? JSON.parse(stored) : [];
    } catch (err) {
      registeredUsers = [];
    }

    const emailExisted = registeredUsers.some(
      u => u.email?.toLowerCase() === email.trim().toLowerCase()
    );
    if (emailExisted) {
      setFieldErrors(prev => ({ ...prev, email: 'This email is already associated with an atelier account.' }));
      setGeneralError('An account with this email already exists. Please sign in instead.');
      return;
    }

    const userExisted = registeredUsers.some(
      u => u.username?.toLowerCase() === username.trim().toLowerCase()
    );
    if (userExisted) {
      setFieldErrors(prev => ({ ...prev, username: 'This username is already taken. Please choose another.' }));
      setGeneralError('This username is already taken. Please choose another.');
      return;
    }

    setIsLoading(true);

    // Save new account into localStorage
    const newUser = {
      id: Date.now(),
      fullName: fullName.trim(),
      email: email.trim(),
      username: username.trim(),
      password: password,
      createdAt: new Date().toISOString()
    };

    setTimeout(() => {
      try {
        registeredUsers.push(newUser);
        localStorage.setItem('lune_registered_users', JSON.stringify(registeredUsers));
      } catch (err) {
        console.error('Storage error:', err);
      }

      setIsLoading(false);
      setRegisterSuccess(true);

      // Redirect to login with prefilled email
      setTimeout(() => {
        navigate('/login', { 
          state: { 
            registeredEmail: email.trim(),
            justRegistered: true,
            accountName: fullName.trim()
          } 
        });
      }, 1500);
    }, 700);
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
            <span className="auth-visual-tag">LUNE FASHION STORE</span>
            <h3>"Fashion changes, but style endures."</h3>
            <p>Join LUNE Fashion Store to receive seasonal lookbooks, new drops, and exclusive member promotions.</p>
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
                <span className="brand-tagline">FASHION STORE</span>
              </Link>
              <h1 className="auth-heading">Create Account</h1>
              <p className="auth-subheading">
                Create your membership account to begin your curated journey.
              </p>
            </div>

            {/* Error Message */}
            {generalError && (
              <div className="auth-alert error">
                <AlertCircle size={18} className="alert-icon-error" />
                <span>{generalError}</span>
              </div>
            )}

            {/* Success Feedback */}
            {registerSuccess && (
              <div className="auth-alert success">
                <CheckCircle size={18} />
                <span>Account registered successfully! Redirecting to Sign In...</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleRegister} className="auth-actual-form" noValidate>
              {/* Full Name */}
              <div className={`form-group ${touched.fullName && fieldErrors.fullName ? 'has-error' : ''}`}>
                <label htmlFor="fullName">Full Name</label>
                <div className="input-with-icon">
                  <User size={16} className="input-field-icon" />
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Linh Nguyen"
                    value={fullName}
                    onChange={(e) => {
                      setFullName(e.target.value);
                      if (touched.fullName) {
                        setFieldErrors(prev => ({ ...prev, fullName: validateField('fullName', e.target.value) }));
                      }
                    }}
                    onBlur={(e) => handleBlur('fullName', e.target.value)}
                    required
                  />
                </div>
                {touched.fullName && fieldErrors.fullName && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {fieldErrors.fullName}
                  </span>
                )}
              </div>

              {/* Email Address */}
              <div className={`form-group ${touched.email && fieldErrors.email ? 'has-error' : ''}`}>
                <label htmlFor="email">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={16} className="input-field-icon" />
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. linh@lune-atelier.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (touched.email) {
                        setFieldErrors(prev => ({ ...prev, email: validateField('email', e.target.value) }));
                      }
                    }}
                    onBlur={(e) => handleBlur('email', e.target.value)}
                    required
                  />
                </div>
                {touched.email && fieldErrors.email && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {fieldErrors.email}
                  </span>
                )}
              </div>

              {/* Username */}
              <div className={`form-group ${touched.username && fieldErrors.username ? 'has-error' : ''}`}>
                <label htmlFor="username">Username</label>
                <div className="input-with-icon">
                  <User size={16} className="input-field-icon" />
                  <input
                    id="username"
                    type="text"
                    placeholder="e.g. linhnguyen"
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                      if (touched.username) {
                        setFieldErrors(prev => ({ ...prev, username: validateField('username', e.target.value) }));
                      }
                    }}
                    onBlur={(e) => handleBlur('username', e.target.value)}
                    required
                  />
                </div>
                {touched.username && fieldErrors.username && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {fieldErrors.username}
                  </span>
                )}
              </div>

              {/* Password */}
              <div className={`form-group ${touched.password && fieldErrors.password ? 'has-error' : ''}`}>
                <label htmlFor="password">Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-field-icon" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (touched.password) {
                        setFieldErrors(prev => ({ ...prev, password: validateField('password', e.target.value) }));
                      }
                      if (confirmPassword) {
                        setFieldErrors(prev => ({ 
                          ...prev, 
                          confirmPassword: e.target.value === confirmPassword ? '' : 'Passwords do not match.' 
                        }));
                      }
                    }}
                    onBlur={(e) => handleBlur('password', e.target.value)}
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

                {/* Password Strength Meter */}
                {password.length > 0 && (
                  <div className="password-strength-widget">
                    <div className="strength-header">
                      <span className="strength-caption">Password strength:</span>
                      <span className={`strength-value ${strength.tone}`}>{strength.label}</span>
                    </div>
                    <div className="strength-bar-track">
                      <div 
                        className={`strength-bar-fill ${strength.tone}`} 
                        style={{ width: `${strength.percent}%` }}
                      ></div>
                    </div>

                    {/* Interactive Checklist */}
                    <div className="password-criteria-list">
                      <div className={`criteria-item ${passwordCriteria.length ? 'valid' : ''}`}>
                        {passwordCriteria.length ? <Check size={13} /> : <span className="criteria-bullet"></span>}
                        <span>At least 8 characters</span>
                      </div>
                      <div className={`criteria-item ${passwordCriteria.case ? 'valid' : ''}`}>
                        {passwordCriteria.case ? <Check size={13} /> : <span className="criteria-bullet"></span>}
                        <span>Uppercase & lowercase</span>
                      </div>
                      <div className={`criteria-item ${passwordCriteria.number ? 'valid' : ''}`}>
                        {passwordCriteria.number ? <Check size={13} /> : <span className="criteria-bullet"></span>}
                        <span>At least 1 number (0-9)</span>
                      </div>
                      <div className={`criteria-item ${passwordCriteria.special ? 'valid' : ''}`}>
                        {passwordCriteria.special ? <Check size={13} /> : <span className="criteria-bullet"></span>}
                        <span>Special symbol (!@#$...)</span>
                      </div>
                    </div>
                  </div>
                )}

                {touched.password && fieldErrors.password && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {fieldErrors.password}
                  </span>
                )}
              </div>

              {/* Confirm Password */}
              <div className={`form-group ${touched.confirmPassword && fieldErrors.confirmPassword ? 'has-error' : ''}`}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <div className="input-with-icon">
                  <Lock size={16} className="input-field-icon" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder="Repeat your password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      if (touched.confirmPassword || e.target.value.length > 0) {
                        setFieldErrors(prev => ({ 
                          ...prev, 
                          confirmPassword: e.target.value === password ? '' : 'Passwords do not match.' 
                        }));
                      }
                    }}
                    onBlur={(e) => handleBlur('confirmPassword', e.target.value)}
                    required
                  />
                  <button 
                    type="button" 
                    className="toggle-password-btn"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    aria-label="Toggle confirm password visibility"
                  >
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {/* Live Match feedback */}
                {confirmPassword.length > 0 && password.length > 0 && (
                  <div className={`password-match-indicator ${confirmPassword === password ? 'match' : 'mismatch'}`}>
                    {confirmPassword === password ? (
                      <>
                        <Check size={13} />
                        <span>Passwords match</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle size={13} />
                        <span>Passwords do not match</span>
                      </>
                    )}
                  </div>
                )}
                {touched.confirmPassword && fieldErrors.confirmPassword && (
                  <span className="field-error-text">
                    <AlertCircle size={13} /> {fieldErrors.confirmPassword}
                  </span>
                )}
              </div>

              {/* Terms Agreement */}
              <div className="remember-row terms-row">
                <label className="checkbox-container">
                  <input 
                    type="checkbox" 
                    checked={agreeTerms}
                    onChange={(e) => setAgreeTerms(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-label">
                    I agree to the LUNE{' '}
                    <button 
                      type="button" 
                      className="terms-link-inline"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowTermsModal(true);
                      }}
                    >
                      Privacy Policy & Terms of Service
                    </button>
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

              {/* Social Buttons */}
              <div className="auth-social-buttons">
                {/* Google Sign Up */}
                <button 
                  type="button" 
                  className="auth-social-btn"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setRegisterSuccess(true);
                      setTimeout(() => navigate('/login'), 1200);
                    }, 600);
                  }}
                  disabled={isLoading || registerSuccess}
                >
                  <svg className="google-icon" width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                    <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                    <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                    <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                  </svg>
                  <span>Google</span>
                </button>

                {/* Apple Sign Up */}
                <button 
                  type="button" 
                  className="auth-social-btn"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      setRegisterSuccess(true);
                      setTimeout(() => navigate('/login'), 1200);
                    }, 600);
                  }}
                  disabled={isLoading || registerSuccess}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.6.69-1.12 1.83-.98 2.92 1.07.08 2.13-.52 2.79-1.32z"/>
                  </svg>
                  <span>Apple ID</span>
                </button>
              </div>
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

      {/* Terms & Privacy Modal */}
      {showTermsModal && (
        <div className="auth-modal-overlay" onClick={() => setShowTermsModal(false)}>
          <div className="auth-modal-content" onClick={e => e.stopPropagation()}>
            <div className="auth-modal-header">
              <div className="modal-title-with-icon">
                <ShieldCheck size={20} className="modal-title-icon" />
                <h3>LUNE Privacy & Membership Terms</h3>
              </div>
              <button 
                type="button" 
                className="auth-modal-close" 
                onClick={() => setShowTermsModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
            <div className="auth-modal-body">
              <p>
                <strong>1. Client Confidentiality:</strong> Your profile details, wishlist selections, and styling preferences remain strictly confidential under our private client protocol.
              </p>
              <p>
                <strong>2. Exclusive Access:</strong> Atelier membership provides privileged previews of seasonal collections, invitations to private studio drops, and tailored fitting consultations.
              </p>
              <p>
                <strong>3. Data Protection:</strong> We do not sell or monetize personal client data. All credentials are encrypted and stored in compliance with European privacy standards.
              </p>
            </div>
            <div className="auth-modal-footer">
              <button 
                type="button" 
                className="btn-primary modal-action-btn"
                onClick={() => setShowTermsModal(false)}
              >
                I UNDERSTAND & AGREE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
