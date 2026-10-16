import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import './CartDrawer.css';

/**
 * CartDrawer Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 * Tích hợp Đa ngôn ngữ (i18n): Song ngữ VI / EN
 */
export default function CartDrawer() {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, cartTotal, products } = useShop();
  const { t, tp } = useLanguage();
  const navigate = useNavigate();

  // Close on Escape key press and prevent background scrolling
  useEffect(() => {
    if (!isCartOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeCart();
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  // Free shipping threshold matching TC-CART-04 ($140 + $60 = $200)
  const freeShippingThreshold = 200;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);
  const shippingProgress = Math.min(100, Math.round((cartTotal / freeShippingThreshold) * 100));

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    closeCart();
    navigate('/shop');
  };

  return (
    <div 
      className="cart-drawer-overlay" 
      onClick={closeCart}
      role="dialog"
      aria-modal="true"
      aria-label={t('cart.title')}
    >
      <div 
        className="cart-drawer-panel"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="cart-drawer-header">
          <div className="cart-header-title-wrap">
            <ShoppingBag size={20} className="cart-header-icon" />
            <h2 className="cart-drawer-title">{t('cart.title')}</h2>
            <span className="cart-header-badge">{cart.reduce((sum, item) => sum + (item.quantity || 1), 0)}</span>
          </div>
          <button 
            type="button"
            className="cart-drawer-close-btn"
            onClick={closeCart}
            aria-label={t('common.close', 'Close')}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Progress Meter */}
        <div className="cart-shipping-meter">
          <div className="cart-shipping-info">
            {remainingForFreeShipping > 0 ? (
              <span className="cart-shipping-text">
                {t('cart.freeShippingMeterPrefix', 'Mua thêm')}{' '}
                <strong>${remainingForFreeShipping}</strong>{' '}
                {t('cart.freeShippingMeterSuffix', 'nữa để nhận')}{' '}
                <strong>{t('cart.freeShippingLabel', 'Miễn Phí Vận Chuyển')}</strong>
              </span>
            ) : (
              <span className="cart-shipping-unlocked">
                <Truck size={16} />
                {t('cart.freeShippingUnlocked', '🎉 Quý khách được Miễn Phí Vận Chuyển Hỏa Tốc!')}
              </span>
            )}
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#775B3F' }}>
              {shippingProgress}%
            </span>
          </div>
          <div className="cart-shipping-bar">
            <div 
              className={`cart-shipping-fill ${remainingForFreeShipping === 0 ? 'is-complete' : ''}`}
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Item List */}
        <div className="cart-drawer-body">
          {cart.length === 0 ? (
            <div className="cart-empty-state">
              <ShoppingBag size={52} strokeWidth={1.2} className="cart-empty-icon" />
              <h3 className="cart-empty-title">{t('cart.emptyTitle')}</h3>
              <p className="cart-empty-desc">{t('cart.emptyDesc')}</p>
              <button 
                type="button"
                className="cart-continue-btn"
                onClick={handleContinueShopping}
              >
                {t('common.continueShopping', 'Khám Phá Cửa Hàng')}
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const matchedProd = products?.find((p) => p.id === item.id);
              const maxStock = matchedProd?.stock !== undefined ? Number(matchedProd.stock) : 99;
              const isAtMaxStock = item.quantity >= maxStock;

              return (
                <div 
                  key={item.cartItemId || `${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                  className="cart-item-card"
                >
                  <div className="cart-item-image-wrap">
                    <img 
                      src={item.image} 
                      alt={tp(item, 'name') || item.name} 
                      className="cart-item-image"
                      loading="lazy"
                    />
                  </div>

                  <div className="cart-item-info">
                    <div className="cart-item-top">
                      <h4 className="cart-item-name">{tp(item, 'name') || item.name}</h4>
                      <div className="cart-item-variants">
                        {item.selectedSize && (
                          <span className="cart-variant-tag">
                            {t('cart.size', 'Size')}: {item.selectedSize}
                          </span>
                        )}
                        {item.selectedColor && (
                          <span className="cart-variant-tag">
                            {t('cart.color', 'Màu')}: {item.selectedColor}
                          </span>
                        )}
                      </div>
                      <p className="cart-item-price">${item.price}</p>
                    </div>

                    <div className="cart-item-bottom">
                      {/* Quantity Selector */}
                      <div className="cart-quantity-selector">
                        <button 
                          type="button"
                          className="cart-qty-btn"
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                          aria-label="Decrease quantity"
                        >
                          <Minus size={13} />
                        </button>
                        <span className="cart-qty-display">{item.quantity}</span>
                        <button 
                          type="button"
                          className="cart-qty-btn"
                          disabled={isAtMaxStock}
                          title={isAtMaxStock ? 'Đã đạt giới hạn tồn kho' : ''}
                          onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                          aria-label="Increase quantity"
                        >
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button 
                        type="button"
                        className="cart-delete-btn"
                        onClick={() => removeFromCart(item.cartItemId || item.id)}
                        aria-label="Remove item"
                        title={t('wishlist.removeBtn', 'Xóa khỏi giỏ')}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer (when cart is not empty) */}
        {cart.length > 0 && (
          <div className="cart-drawer-footer">
            <div className="cart-summary-line">
              <span className="cart-subtotal-text">{t('cart.subtotalLabel')}</span>
              <span className="cart-subtotal-price">${cartTotal}</span>
            </div>
            <button 
              type="button"
              className="cart-checkout-action-btn"
              onClick={handleCheckout}
            >
              <span>{t('cart.checkoutBtn')}</span>
              <ArrowRight size={17} />
            </button>
            <p className="cart-footer-security">
              <ShieldCheck size={13} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              {t('checkout.secureNotice', 'Bảo mật thanh toán 256-bit SSL tiêu chuẩn')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
