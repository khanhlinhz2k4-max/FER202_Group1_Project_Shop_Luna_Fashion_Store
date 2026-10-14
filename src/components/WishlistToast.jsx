import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, X, Check, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import './WishlistToast.css';

export default function WishlistToast() {
  const { wishlistToast, closeWishlistToast, currentUser } = useShop();
  const { t } = useLanguage();
  const location = useLocation();

  if (!wishlistToast || !wishlistToast.show) {
    return null;
  }

  const { isAdded, productName, message } = wishlistToast;

  return (
    <div className="wishlist-toast-container" role="status" aria-live="polite">
      <div className="wishlist-toast-content">
        <div className="wishlist-toast-icon-wrap">
          {isAdded ? (
            <Heart size={18} className="wishlist-toast-heart-active" />
          ) : (
            <Check size={18} className="wishlist-toast-check" />
          )}
        </div>

        <div className="wishlist-toast-text-wrap">
          <div className="wishlist-toast-title">
            {isAdded ? t('toast.addedWishlistTitle', "Added to Lookbook") : t('toast.removedWishlistTitle', "Removed from Lookbook")}
          </div>
          <div className="wishlist-toast-desc">
            {productName ? <strong>{productName} </strong> : null}
            {message || (isAdded ? t('toast.addedWishlistDesc', "Saved to your wishlist.") : t('toast.removedWishlistDesc', "Updated your saved styles."))}
          </div>
          
          {/* Subtle sign in prompt if currently a guest */}
          {!currentUser && isAdded && (
            <div className="wishlist-toast-auth-prompt">
              <Link 
                to="/login" 
                state={{ redirect: location.pathname }}
                className="wishlist-toast-auth-link"
                onClick={closeWishlistToast}
              >
                <span>{t('toast.signInSyncPrompt', "Sign in to sync across devices")}</span>
                <ArrowRight size={12} />
              </Link>
            </div>
          )}
        </div>

        <button 
          type="button" 
          className="wishlist-toast-close-btn" 
          onClick={closeWishlistToast}
          aria-label="Dismiss notification"
        >
          <X size={15} />
        </button>
      </div>
    </div>
  );
}

