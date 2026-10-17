import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { translations, productTranslations } from '../data/translations';

const LanguageContext = createContext(null);

export const STORAGE_KEY_LANGUAGE = 'lune_language';

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_LANGUAGE);
      return saved === 'en' ? 'en' : 'vi'; // Default to 'vi'
    } catch {
      return 'vi';
    }
  });

  const setLanguage = useCallback((lang) => {
    const validLang = lang === 'en' ? 'en' : 'vi';
    setLanguageState(validLang);
    document.documentElement.lang = validLang;
    try {
      localStorage.setItem(STORAGE_KEY_LANGUAGE, validLang);
    } catch (e) {
      console.warn('Unable to persist language to localStorage', e);
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = useCallback(() => {
    setLanguage(language === 'vi' ? 'en' : 'vi');
  }, [language, setLanguage]);

  /**
   * Helper function to get translation by dot-path
   * e.g., t('nav.home') or t('common.addToBag')
   */
  const t = useCallback((path, fallback = '') => {
    if (!path) return fallback;
    const parts = path.split('.');
    
    // 1. Try current language
    let current = translations[language];
    for (const part of parts) {
      if (current && typeof current === 'object' && part in current) {
        current = current[part];
      } else {
        current = undefined;
        break;
      }
    }
    if (typeof current === 'string') return current;

    // 2. Fallback to Vietnamese if English missing
    let fallbackObj = translations.vi;
    for (const part of parts) {
      if (fallbackObj && typeof fallbackObj === 'object' && part in fallbackObj) {
        fallbackObj = fallbackObj[part];
      } else {
        fallbackObj = undefined;
        break;
      }
    }
    if (typeof fallbackObj === 'string') return fallbackObj;

    return fallback || path;
  }, [language]);

  /**
   * Helper to get translated product text
   * e.g. tp(product, 'name') or tp(product, 'description')
   */
  const tp = useCallback((product, field) => {
    if (!product) return '';
    const localized = productTranslations[product.id]?.[language]?.[field];
    if (localized) return localized;
    return product[field] || '';
  }, [language]);

  const value = {
    language,
    isVietnamese: language === 'vi',
    isEnglish: language === 'en',
    setLanguage,
    toggleLanguage,
    t,
    tp
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
