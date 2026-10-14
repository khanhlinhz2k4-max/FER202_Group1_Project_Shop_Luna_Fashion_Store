import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { 
  ShieldCheck, 
  ArrowLeft, 
  ShoppingBag, 
  CreditCard, 
  Banknote, 
  CheckCircle, 
  AlertCircle,
  Truck
} from 'lucide-react';
import './CheckoutPage.css';

/**
 * CheckoutPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 * Tích hợp Đa ngôn ngữ (i18n): Song ngữ VI / EN
 */
export default function CheckoutPage() {
  const { cart, cartTotal, addOrder, currentUser } = useShop();
  const { t, tp } = useLanguage();
  const navigate = useNavigate();

  // Form State with pre-fill from logged-in user
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    city: 'TP. Hồ Chí Minh',
    notes: '',
    paymentMethod: 'COD', // 'COD' or 'CARD'
    promoCode: ''
  });

  // Simulated Card State
  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8829',
    expiry: '12/28',
    cvv: '888',
    cardHolder: currentUser?.name || 'LUNE CLIENT VIP'
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [appliedCode, setAppliedCode] = useState('');
  const [promoMessage, setPromoMessage] = useState({ type: '', text: '' });
  const [errors, setErrors] = useState({});

  // If shopping bag is empty, display boutique empty state
  if (cart.length === 0) {
    return (
      <div className="checkout-container">
        <div className="checkout-empty-state">
          <ShoppingBag size={56} strokeWidth={1.2} className="checkout-empty-icon" />
          <h2 className="checkout-empty-title">{t('checkout.emptyCartTitle', 'Giỏ hàng của bạn đang trống')}</h2>
          <p className="checkout-empty-desc">
            {t('checkout.emptyCartDesc', 'Vui lòng thêm sản phẩm vào giỏ trước khi tiến hành thanh toán.')}
          </p>
          <Link to="/shop" className="checkout-empty-btn">
            {t('checkout.returnToShop', 'Khám Phá Cửa Hàng')}
          </Link>
        </div>
      </div>
    );
  }

  // Shipping Fee calculation (Free shipping threshold = $200, otherwise $15)
  const shippingFee = cartTotal >= 200 ? 0 : 15;
  const finalTotal = Math.max(0, cartTotal - appliedDiscount + shippingFee);

  // Apply Promo Code
  const handleApplyPromo = () => {
    const code = formData.promoCode.trim().toUpperCase();
    if (!code) return;

    if (code === 'LUNE10') {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount(discount);
      setAppliedCode('LUNE10');
      setPromoMessage({
        type: 'success',
        text: t('checkout.appliedPromoMsg', 'Đã áp dụng mã LUNE10: Giảm ngay 10%!')
      });
    } else {
      setAppliedDiscount(0);
      setAppliedCode('');
      setPromoMessage({
        type: 'error',
        text: t('checkout.invalidPromoMsg', 'Mã khuyến mại không hợp lệ hoặc đã hết hạn. Hãy thử mã LUNE10')
      });
    }
  };

  // Remove Promo Code
  const handleRemovePromo = () => {
    setAppliedDiscount(0);
    setAppliedCode('');
    setFormData(prev => ({ ...prev, promoCode: '' }));
    setPromoMessage({ type: '', text: '' });
  };

  // Validate form inputs (TC-CHK-04: kiểm tra bắt buộc & định dạng số điện thoại)
  const validateForm = () => {
    const errs = {};

    // 1. Full name validation
    if (!formData.name.trim()) {
      errs.name = t('checkout.errName', 'Vui lòng nhập họ và tên');
    }

    // 2. Phone validation (check empty and valid phone format)
    const cleanedPhone = formData.phone.trim();
    if (!cleanedPhone) {
      errs.phone = t('checkout.errPhone', 'Vui lòng nhập số điện thoại');
    } else {
      // Must contain only digits, plus, spaces or hyphens, length 9-11 digits
      const digitsOnly = cleanedPhone.replace(/\D/g, '');
      const hasInvalidChars = /[a-zA-Z]/.test(cleanedPhone);
      if (hasInvalidChars || digitsOnly.length < 9 || digitsOnly.length > 11) {
        errs.phone = t('checkout.errPhoneFormat', 'Số điện thoại không hợp lệ (Vui lòng nhập 9-11 chữ số, không chứa chữ cái)');
      }
    }

    // 3. Email validation (if filled, check standard pattern)
    if (formData.email.trim()) {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(formData.email.trim())) {
        errs.email = t('checkout.errEmailFormat', 'Địa chỉ email không đúng định dạng');
      }
    }

    // 4. Street address validation
    if (!formData.address.trim()) {
      errs.address = t('checkout.errAddress', 'Vui lòng nhập địa chỉ nhận hàng');
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  // Handle Order Placement
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const newOrder = addOrder({
      customer: {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        address: `${formData.address.trim()}, ${formData.city}`
      },
      items: cart,
      totalAmount: finalTotal,
      discount: appliedDiscount,
      shippingFee: shippingFee,
      paymentMethod: formData.paymentMethod === 'COD' 
        ? 'Cash on Delivery (COD)' 
        : 'Credit Card (Simulated)',
      promoCode: appliedCode || null,
      notes: formData.notes.trim() || undefined
    });

    // Cache order in sessionStorage so refreshing OrderSuccessPage retains the order
    try {
      sessionStorage.setItem('lune_last_order', JSON.stringify(newOrder));
    } catch (e) {
      // Storage quota or private mode fallback
    }

    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div className="checkout-container">
      {/* Top Navigation */}
      <div className="checkout-nav-bar">
        <Link to="/shop" className="checkout-back-link">
          <ArrowLeft size={16} /> {t('orderSuccess.continueShoppingBtn', 'Tiếp Tục Mua Sắm')}
        </Link>
        <h1 className="checkout-header-title">{t('checkout.title', 'THANH TOÁN ĐƠN HÀNG')}</h1>
        <p className="checkout-header-subtitle">
          {t('checkout.deliveryInfoTitle', 'Vui lòng cung cấp thông tin giao hàng và chọn hình thức thanh toán thuận tiện nhất.')}
        </p>
      </div>

      <div className="checkout-grid-layout">
        {/* Left Column: Form */}
        <form onSubmit={handleSubmit} className="checkout-form-card" noValidate>
          {/* Section 1: Delivery Information */}
          <div className="checkout-section-title">
            <span className="checkout-section-badge">1</span>
            <span>{t('checkout.deliveryInfoTitle', 'THÔNG TIN GIAO HÀNG')}</span>
          </div>

          {/* Full Name */}
          <div className="checkout-form-group">
            <label className="checkout-label">
              {t('checkout.fullNameLabel', 'Họ và tên người nhận')}
              <span className="checkout-label-required">*</span>
            </label>
            <input 
              type="text" 
              name="name"
              className={`checkout-input ${errors.name ? 'has-error' : ''}`}
              value={formData.name} 
              onChange={e => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: '' });
              }}
              placeholder="Nguyễn Văn A / Alexander Vance"
            />
            {errors.name && <span className="checkout-error-text">{errors.name}</span>}
          </div>

          {/* Phone & Email Row */}
          <div className="checkout-form-row">
            <div className="checkout-form-group">
              <label className="checkout-label">
                {t('checkout.phoneLabel', 'Số điện thoại')}
                <span className="checkout-label-required">*</span>
              </label>
              <input 
                type="tel" 
                name="phone"
                className={`checkout-input ${errors.phone ? 'has-error' : ''}`}
                value={formData.phone} 
                onChange={e => {
                  setFormData({ ...formData, phone: e.target.value });
                  if (errors.phone) setErrors({ ...errors, phone: '' });
                }}
                placeholder="0912 345 678"
              />
              {errors.phone && <span className="checkout-error-text">{errors.phone}</span>}
            </div>

            <div className="checkout-form-group">
              <label className="checkout-label">
                {t('checkout.emailLabel', 'Email (Nhận hóa đơn điện tử)')}
              </label>
              <input 
                type="email" 
                name="email"
                className={`checkout-input ${errors.email ? 'has-error' : ''}`}
                value={formData.email} 
                onChange={e => {
                  setFormData({ ...formData, email: e.target.value });
                  if (errors.email) setErrors({ ...errors, email: '' });
                }}
                placeholder="client@example.com"
              />
              {errors.email && <span className="checkout-error-text">{errors.email}</span>}
            </div>
          </div>

          {/* Street Address */}
          <div className="checkout-form-group">
            <label className="checkout-label">
              {t('checkout.addressLabel', 'Địa chỉ giao hàng chi tiết')}
              <span className="checkout-label-required">*</span>
            </label>
            <input 
              type="text" 
              name="address"
              className={`checkout-input ${errors.address ? 'has-error' : ''}`}
              value={formData.address} 
              onChange={e => {
                setFormData({ ...formData, address: e.target.value });
                if (errors.address) setErrors({ ...errors, address: '' });
              }}
              placeholder="Số nhà, tên đường, Phường/Xã, Quận/Huyện"
            />
            {errors.address && <span className="checkout-error-text">{errors.address}</span>}
          </div>

          {/* City / Province */}
          <div className="checkout-form-group">
            <label className="checkout-label">
              {t('checkout.cityLabel', 'Tỉnh / Thành phố')}
            </label>
            <select 
              className="checkout-select"
              value={formData.city}
              onChange={e => setFormData({ ...formData, city: e.target.value })}
            >
              <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
              <option value="Hà Nội">Hà Nội</option>
              <option value="Đà Nẵng">Đà Nẵng</option>
              <option value="Hải Phòng">Hải Phòng</option>
              <option value="Cần Thơ">Cần Thơ</option>
              <option value="Tỉnh / Thành phố khác">Tỉnh / Thành phố khác</option>
            </select>
          </div>

          {/* Delivery Notes */}
          <div className="checkout-form-group">
            <label className="checkout-label">
              {t('checkout.notesLabel', 'Ghi chú đơn hàng (Tùy chọn)')}
            </label>
            <textarea 
              className="checkout-textarea"
              value={formData.notes}
              onChange={e => setFormData({ ...formData, notes: e.target.value })}
              placeholder={t('checkout.notesPlaceholder', 'Ví dụ: Giao giờ hành chính, gọi trước khi giao...')}
            />
          </div>

          {/* Section 2: Payment Method */}
          <div className="checkout-section-title" style={{ marginTop: '36px' }}>
            <span className="checkout-section-badge">2</span>
            <span>{t('checkout.paymentMethodTitle', 'PHƯƠNG THỨC THANH TOÁN')}</span>
          </div>

          <div className="checkout-payment-options">
            {/* COD Option */}
            <label className={`checkout-payment-card ${formData.paymentMethod === 'COD' ? 'is-selected' : ''}`}>
              <input 
                type="radio" 
                name="paymentMethod"
                className="checkout-payment-radio"
                checked={formData.paymentMethod === 'COD'}
                onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })}
              />
              <div className="checkout-payment-content">
                <div className="checkout-payment-title">
                  <span>{t('checkout.codOption', 'Thanh toán khi nhận hàng (COD)')}</span>
                  <Banknote size={18} color="#775B3F" />
                </div>
                <p className="checkout-payment-desc">
                  {t('checkout.codDesc', 'Thanh toán tiền mặt cho nhân viên giao vận khi nhận kiện hàng')}
                </p>
              </div>
            </label>

            {/* Simulated Card Option */}
            <label className={`checkout-payment-card ${formData.paymentMethod === 'CARD' ? 'is-selected' : ''}`}>
              <input 
                type="radio" 
                name="paymentMethod"
                className="checkout-payment-radio"
                checked={formData.paymentMethod === 'CARD'}
                onChange={() => setFormData({ ...formData, paymentMethod: 'CARD' })}
              />
              <div className="checkout-payment-content">
                <div className="checkout-payment-title">
                  <span>{t('checkout.cardOption', 'Chuyển khoản / Thẻ ngân hàng (Mô phỏng)')}</span>
                  <CreditCard size={18} color="#775B3F" />
                </div>
                <p className="checkout-payment-desc">
                  {t('checkout.cardDesc', 'Hỗ trợ thẻ Visa, MasterCard, JCB và QR Napas247')}
                </p>

                {/* Simulated Card Interactive Subform */}
                {formData.paymentMethod === 'CARD' && (
                  <div className="checkout-card-simulation-box" onClick={e => e.stopPropagation()}>
                    <div className="checkout-simulated-badges">
                      <span className="checkout-badge-pill">VISA</span>
                      <span className="checkout-badge-pill">MASTERCARD</span>
                      <span className="checkout-badge-pill">JCB</span>
                      <span className="checkout-badge-pill">NAPAS</span>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: '8px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#7A6B5D', marginBottom: '2px' }}>
                          {t('checkout.cardNumberLabel', 'Số thẻ')}
                        </label>
                        <input 
                          type="text" 
                          value={cardData.cardNumber}
                          onChange={e => setCardData({ ...cardData, cardNumber: e.target.value })}
                          style={{ width: '100%', padding: '6px 8px', fontSize: '0.8rem', border: '1px solid #C8AE84', borderRadius: '2px', backgroundColor: '#FFFFFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#7A6B5D', marginBottom: '2px' }}>
                          {t('checkout.cardExpiryLabel', 'Hạn thẻ')}
                        </label>
                        <input 
                          type="text" 
                          value={cardData.expiry}
                          onChange={e => setCardData({ ...cardData, expiry: e.target.value })}
                          style={{ width: '100%', padding: '6px 8px', fontSize: '0.8rem', border: '1px solid #C8AE84', borderRadius: '2px', backgroundColor: '#FFFFFF' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 600, color: '#7A6B5D', marginBottom: '2px' }}>
                          CVV
                        </label>
                        <input 
                          type="password" 
                          value={cardData.cvv}
                          maxLength={3}
                          onChange={e => setCardData({ ...cardData, cvv: e.target.value })}
                          style={{ width: '100%', padding: '6px 8px', fontSize: '0.8rem', border: '1px solid #C8AE84', borderRadius: '2px', backgroundColor: '#FFFFFF' }}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </label>
          </div>

          {/* Submit Button */}
          <button type="submit" className="checkout-submit-btn">
            <span>{t('checkout.placeOrderBtn', 'XÁC NHẬN ĐẶT HÀNG')}</span>
            <span>(${finalTotal})</span>
          </button>

          <p className="checkout-trust-guarantee">
            <ShieldCheck size={14} color="#775B3F" />
            <span>{t('checkout.secureNotice', 'Giao dịch được mã hóa và bảo vệ an toàn 100%')}</span>
          </p>
        </form>

        {/* Right Column: Order Summary Aside */}
        <aside className="checkout-summary-card">
          <div className="checkout-summary-header">
            <h2 className="checkout-summary-title">{t('checkout.orderSummaryTitle', 'TÓM TẮT ĐƠN HÀNG')}</h2>
            <span className="checkout-summary-count">
              {cart.reduce((sum, item) => sum + (item.quantity || 1), 0)} {t('wishlist.piecePlural', 'món')}
            </span>
          </div>

          {/* Mini Items List */}
          <div className="checkout-item-list">
            {cart.map((item) => (
              <div 
                key={item.cartItemId || `${item.id}-${item.selectedSize}-${item.selectedColor}`} 
                className="checkout-summary-item"
              >
                <div className="checkout-item-thumb-wrap">
                  <img 
                    src={item.image} 
                    alt={tp(item, 'name') || item.name} 
                    className="checkout-item-thumb" 
                  />
                  <span className="checkout-item-thumb-qty">{item.quantity}</span>
                </div>
                <div className="checkout-summary-item-info">
                  <h4 className="checkout-item-name">{tp(item, 'name') || item.name}</h4>
                  <p className="checkout-item-meta">
                    {t('checkout.size', 'Size:')} {item.selectedSize}
                    {item.selectedColor && ` | ${t('cart.color', 'Màu:')} ${item.selectedColor}`}
                  </p>
                  <p className="checkout-item-line-price">${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo Code Input */}
          <div className="checkout-promo-box">
            <label className="checkout-promo-label">
              {t('checkout.promoTitle', 'MÃ ƯU ĐÃI ĐẶC QUYỀN')}
            </label>
            <div className="checkout-promo-input-group">
              <input 
                type="text" 
                className="checkout-promo-input"
                placeholder={t('checkout.promoPlaceholder', 'Ví dụ: LUNE10')}
                value={formData.promoCode}
                onChange={e => setFormData({ ...formData, promoCode: e.target.value })}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleApplyPromo();
                  }
                }}
              />
              <button 
                type="button" 
                className="checkout-promo-btn"
                onClick={handleApplyPromo}
              >
                {t('checkout.applyBtn', 'Áp dụng')}
              </button>
            </div>

            {promoMessage.text && (
              <div className={`checkout-promo-status is-${promoMessage.type}`}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  {promoMessage.type === 'success' ? <CheckCircle size={14} /> : <AlertCircle size={14} />}
                  {promoMessage.text}
                </span>
                {appliedDiscount > 0 && (
                  <button 
                    type="button" 
                    className="checkout-remove-promo-btn"
                    onClick={handleRemovePromo}
                  >
                    {t('checkout.removePromoBtn', 'Gỡ mã')}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Transparent Cost Breakdown */}
          <div className="checkout-breakdown-list">
            <div className="checkout-breakdown-row">
              <span>{t('cart.subtotalLabel', 'Tạm tính')}</span>
              <span style={{ fontWeight: 600 }}>${cartTotal}</span>
            </div>

            {appliedDiscount > 0 && (
              <div className="checkout-breakdown-row is-discount">
                <span>{t('checkout.discount10', 'Ưu đãi LUNE10 (10%)')}</span>
                <span>-${appliedDiscount}</span>
              </div>
            )}

            <div className="checkout-breakdown-row">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '5px' }}>
                <Truck size={14} />
                {t('checkout.shippingFeeLabel', 'Phí vận chuyển')}
              </span>
              <span>
                {shippingFee === 0 ? (
                  <span className="checkout-shipping-free-badge">
                    {t('common.free', 'MIỄN PHÍ')}
                  </span>
                ) : (
                  `$${shippingFee}`
                )}
              </span>
            </div>

            <div className="checkout-total-row">
              <span className="checkout-total-label">{t('checkout.totalLabel', 'Tổng thanh toán')}</span>
              <span className="checkout-total-amount">${finalTotal}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
