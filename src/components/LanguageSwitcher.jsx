import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';
import './LanguageSwitcher.css';

/**
 * LanguageSwitcher Component
 * Elegant, minimalist toggle between Vietnamese (VI) and English (EN)
 * Harmonized with LUNE Warm Luxury aesthetic
 */
export default function LanguageSwitcher({ showIcon = false, className = '' }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`lune-lang-switcher ${className}`} aria-label="Language Selector">
      {showIcon && <Globe size={14} className="lune-lang-globe-icon" />}
      <button
        type="button"
        className={`lang-btn ${language === 'vi' ? 'active' : ''}`}
        onClick={() => setLanguage('vi')}
        aria-label="Chuyển sang Tiếng Việt"
        title="Tiếng Việt (VI)"
      >
        VI
      </button>
      <span className="lang-divider">/</span>
      <button
        type="button"
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
        title="English (EN)"
      >
        EN
      </button>
    </div>
  );
}
