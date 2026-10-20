import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { ShieldCheck, ArrowLeft, CheckCircle2, QrCode, Copy, Check, MapPin, Plus, CreditCard, Lock, Globe } from 'lucide-react';

/**
 * CheckoutPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 * Nâng cấp: Thành viên 1 (Leader - Tích hợp Đa ngôn ngữ song ngữ EN/VI, VietQR Tự Động & Sổ Địa Chỉ Profile)
 * Harmonized with LUNE Warm Luxury Brand Guidelines
 */
export default function CheckoutPage() {
  const { cart, cartTotal, addOrder, currentUser, vouchers } = useShop();
  const { t, tp, language } = useLanguage();
  const navigate = useNavigate();

  // Load saved destinations from Profile Address Book
  const savedAddresses = useMemo(() => {
    if (!currentUser) return [];
    try {
      const saved = localStorage.getItem(`lune_addresses_${currentUser.email}`);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}

    // Fallback default address matching ProfilePage's default
    return [
      {
        id: 'addr-default',
        label: language === 'vi' ? 'Địa chỉ chính (Nhà riêng)' : 'Primary Residence (Home)',
        recipient: currentUser.name || 'Valued Member',
        phone: currentUser.phone || '+84 987 654 321',
        detail: currentUser.address || '789 Nguyen Hue Boulevard, District 1, Ho Chi Minh City',
        isDefault: true
      }
    ];
  }, [currentUser, language]);

  const defaultAddr = savedAddresses.find(a => a.isDefault) || savedAddresses[0];

  const [selectedAddressId, setSelectedAddressId] = useState(() => defaultAddr ? defaultAddr.id : 'custom');
  const [useCustomAddress, setUseCustomAddress] = useState(() => savedAddresses.length === 0);
  const [saveToProfile, setSaveToProfile] = useState(false);

  const [formData, setFormData] = useState(() => {
    if (defaultAddr && savedAddresses.length > 0) {
      return {
        name: defaultAddr.recipient || currentUser?.name || '',
        phone: defaultAddr.phone || currentUser?.phone || '',
        email: currentUser?.email || '',
        address: defaultAddr.detail || currentUser?.address || '',
        city: 'TP. Ho Chi Minh',
        paymentMethod: 'CARD', // CARD is primary for luxury USD boutique
        promoCode: ''
      };
    }
    return {
      name: currentUser?.name || '',
      phone: currentUser?.phone || '',
      email: currentUser?.email || '',
      address: currentUser?.address || '',
      city: 'TP. Ho Chi Minh',
      paymentMethod: 'CARD', // CARD is primary for luxury USD boutique
      promoCode: ''
    };
  });

  const handleSelectAddress = (addr) => {
    setSelectedAddressId(addr.id);
    setUseCustomAddress(false);
    setFormData(prev => ({
      ...prev,
      name: addr.recipient || prev.name,
      phone: addr.phone || prev.phone,
      address: addr.detail || prev.address
    }));
    setErrors(prev => ({ ...prev, name: '', phone: '', address: '' }));
  };

  const handleUseCustomAddress = () => {
    setSelectedAddressId('custom');
    setUseCustomAddress(true);
    setFormData(prev => ({
      ...prev,
      address: ''
    }));
  };

  const [selectedVoucherId, setSelectedVoucherId] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [orderMemo] = useState(() => `LUNE${Math.floor(100000 + Math.random() * 900000)}`);
  const [copiedField, setCopiedField] = useState(null);
  const [cardDetails, setCardDetails] = useState({
    number: '4242 •••• •••• 4242',
    name: currentUser?.name ? currentUser.name.toUpperCase() : 'VALUED CLIENT',
    expiry: '12/28',
    cvv: '888'
  });

  const handleCopy = (text, field) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }
  };

  const now = new Date();
  const eligibleVouchers = (vouchers || []).filter(voucher => {
    if (!voucher.isActive) return false;
    if (voucher.startsAt && new Date(voucher.startsAt) > now) return false;
    if (voucher.expiresAt && new Date(voucher.expiresAt) < now) return false;
    return cartTotal >= (Number(voucher.minSubtotal) || 0);
  });
  const lockedVouchers = (vouchers || []).filter(voucher => {
    if (!voucher.isActive) return false;
    if (voucher.startsAt && new Date(voucher.startsAt) > now) return false;
    if (voucher.expiresAt && new Date(voucher.expiresAt) < now) return false;
    return cartTotal < (Number(voucher.minSubtotal) || 0);
  });
  const selectedVoucher = eligibleVouchers.find(voucher => voucher.id === selectedVoucherId);

  const getDiscountLabel = () => {
    const prefix = t('checkout.privilegeDiscount', 'Ưu đãi đặc quyền');
    const matchedV = selectedVoucher || (vouchers || []).find(v => v.id === selectedVoucherId || (formData.promoCode && v.code.toUpperCase() === formData.promoCode.trim().toUpperCase()));
    
    if (matchedV) {
      const discountText = matchedV.discountType === 'percent'
        ? `${matchedV.discountValue}%`
        : `-$${matchedV.discountValue}`;
      return `${prefix} ${matchedV.code} (${discountText})`;
    }
    
    const code = formData.promoCode ? formData.promoCode.trim().toUpperCase() : '';
    if (code === 'LUNE10') {
      return `${prefix} LUNE10 (10%)`;
    }
    if (code) {
      return `${prefix} ${code}`;
    }
    return t('checkout.discount10', 'Ưu đãi đặc quyền');
  };

  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-h2)', color: '#2C2117' }}>{t('checkout.emptyCartTitle', 'Your shopping bag is empty')}</h2>
        <p style={{ color: '#5C4A3A', marginBottom: '24px' }}>{t('checkout.emptyCartDesc', 'Add items to your bag before proceeding to checkout.')}</p>
        <Link to="/shop" style={{ color: '#775B3F', fontWeight: 600, textDecoration: 'underline' }}>{t('checkout.returnToShop', 'Return to Shop')}</Link>
      </div>
    );
  }

  const handleVoucherSelect = (voucherId) => {
    setSelectedVoucherId(voucherId);
    if (!voucherId) {
      setAppliedDiscount(0);
      setPromoMessage('');
      return;
    }
    const v = eligibleVouchers.find(item => item.id === voucherId);
    if (v) {
      const discount = v.discountType === 'percent'
        ? Math.round(cartTotal * Number(v.discountValue) / 100)
        : Math.min(cartTotal, Number(v.discountValue));
      setAppliedDiscount(discount);
      setFormData(prev => ({ ...prev, promoCode: v.code }));
      setPromoMessage(t('checkout.voucherAppliedMsg', `Voucher ${v.code} applied: -${v.discountType === 'percent' ? `${v.discountValue}%` : `$${v.discountValue}`}!`));
    }
  };

  const handleApplyPromo = () => {
    const code = formData.promoCode.trim().toUpperCase();
    if (!code) return;

    // Check in vouchers list
    const matchedVoucher = (vouchers || []).find(v => v.code.toUpperCase() === code);
    if (matchedVoucher) {
      if (!matchedVoucher.isActive) {
        setAppliedDiscount(0);
        setSelectedVoucherId('');
        setPromoMessage(t('checkout.invalidPromoMsg', 'This voucher is currently inactive.'));
        return;
      }
      const curTime = new Date();
      if (matchedVoucher.startsAt && new Date(matchedVoucher.startsAt) > curTime) {
        setAppliedDiscount(0);
        setSelectedVoucherId('');
        setPromoMessage(t('checkout.upcomingVoucherMsg', 'This voucher is not active yet.'));
        return;
      }
      if (matchedVoucher.expiresAt && new Date(matchedVoucher.expiresAt) < curTime) {
        setAppliedDiscount(0);
        setSelectedVoucherId('');
        setPromoMessage(t('checkout.expiredVoucherMsg', 'This voucher has expired.'));
        return;
      }
      if (cartTotal < (Number(matchedVoucher.minSubtotal) || 0)) {
        setAppliedDiscount(0);
        setSelectedVoucherId('');
        const diff = Number(matchedVoucher.minSubtotal) - cartTotal;
        setPromoMessage(`${t('checkout.minSubtotalMsg', `Minimum order for this voucher is $${matchedVoucher.minSubtotal}.`)} ${t('checkout.upsellMsg', `Add $${diff} more to unlock this voucher!`).replace('${amount}', diff)}`);
        return;
      }
      setSelectedVoucherId(matchedVoucher.id);
      const discount = matchedVoucher.discountType === 'percent'
        ? Math.round(cartTotal * Number(matchedVoucher.discountValue) / 100)
        : Math.min(cartTotal, Number(matchedVoucher.discountValue));
      setAppliedDiscount(discount);
      setPromoMessage(t('checkout.voucherAppliedMsg', `Voucher ${matchedVoucher.code} applied: -${matchedVoucher.discountType === 'percent' ? `${matchedVoucher.discountValue}%` : `$${matchedVoucher.discountValue}`}!`));
    } else if (code === 'LUNE10') {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount(discount);
      setPromoMessage(t('checkout.appliedPromoMsg', 'Promo code LUNE10 applied: 10% OFF!'));
    } else {
      setAppliedDiscount(0);
      setSelectedVoucherId('');
      setPromoMessage(t('checkout.invalidPromoMsg', 'Invalid promo code.'));
    }
  };

  const shippingFee = cartTotal >= 250 ? 0 : 15;
  const finalTotal = Math.max(0, cartTotal - appliedDiscount + shippingFee);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const errs = {};
    if (!formData.name.trim()) errs.name = t('checkout.errName', 'Full name is required');
    if (!formData.phone.trim()) errs.phone = t('checkout.errPhone', 'Phone number is required');
    if (!formData.address.trim()) errs.address = t('checkout.errAddress', 'Delivery address is required');

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    // Save to Profile Address Book if requested
    if (useCustomAddress && saveToProfile && currentUser) {
      try {
        const newAddr = {
          id: `addr-${Date.now()}`,
          label: language === 'vi' ? 'Địa chỉ đơn hàng mới' : 'New Order Destination',
          recipient: formData.name,
          phone: formData.phone,
          detail: formData.address,
          isDefault: false
        };
        const currentSaved = JSON.parse(localStorage.getItem(`lune_addresses_${currentUser.email}`) || '[]');
        localStorage.setItem(`lune_addresses_${currentUser.email}`, JSON.stringify([...currentSaved, newAddr]));
      } catch (e) {}
    }

    const newOrder = addOrder({
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}, ${formData.city}`
      },
      items: cart,
      totalAmount: finalTotal,
      discount: appliedDiscount,
      voucherCode: selectedVoucher?.code || (appliedDiscount > 0 ? formData.promoCode.trim().toUpperCase() : ''),
      shippingFee: shippingFee,
      paymentMethod: formData.paymentMethod === 'COD' 
        ? (language === 'vi' ? 'Tiền mặt khi nhận hàng (COD)' : 'Cash on Delivery (COD)')
        : formData.paymentMethod === 'VIETQR'
          ? (language === 'vi' ? 'Chuyển khoản Ngân hàng Việt Nam (VietQR - VND)' : 'Vietnam Domestic Transfer (VietQR - VND)')
          : (language === 'vi' ? 'Thẻ tín dụng / Ghi nợ Quốc tế (Visa / Mastercard)' : 'Credit / Debit Card (Visa / Mastercard)')
    });

    navigate('/order-success', { state: { order: newOrder } });
  };

  const amountVnd = Math.round(finalTotal * 25400);

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#5C4A3A', textDecoration: 'none', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> {t('orderSuccess.continueShoppingBtn', 'Continue Shopping')}
        </Link>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-h1)', fontWeight: 500, margin: '12px 0 4px', color: '#2C2117' }}>{t('checkout.title', 'ORDER CHECKOUT')}</h1>
        <p style={{ color: '#5C4A3A', fontSize: 'var(--text-body)' }}>{t('checkout.deliveryInfoTitle', 'Please enter your delivery details and choose your payment method.')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>
        {/* Left: Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', padding: '36px', border: '1px solid #E7DDCE', borderRadius: '4px', boxShadow: '0 2px 8px rgba(44, 33, 23, 0.03)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '8px' }}>
            <h2 style={{ fontSize: 'var(--text-h4)', fontWeight: 600, letterSpacing: '0.04em', margin: 0, color: '#2C2117' }}>
              1. {t('checkout.deliveryInfoTitle', 'DELIVERY INFORMATION')}
            </h2>
            {currentUser && (
              <Link 
                to="/profile" 
                style={{ fontSize: '0.78rem', color: '#775B3F', textDecoration: 'underline', fontWeight: 600 }}
              >
                {t('checkout.manageAddressBookLink', 'Manage Address Book')} →
              </Link>
            )}
          </div>

          {/* Sổ địa chỉ đã lưu (Profile Address Book) */}
          {savedAddresses.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <p style={{ margin: '0 0 12px', fontSize: '0.82rem', color: '#5C4A3A' }}>
                {t('checkout.savedAddressesDesc', 'Select a saved destination from your account for 1-click checkout:')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '12px', marginBottom: '14px' }}>
                {savedAddresses.map(addr => {
                  const isSelected = !useCustomAddress && selectedAddressId === addr.id;
                  return (
                    <div
                      key={addr.id}
                      onClick={() => handleSelectAddress(addr)}
                      style={{
                        padding: '16px',
                        backgroundColor: isSelected ? '#FAF7F2' : '#FFFFFF',
                        border: isSelected ? '1.5px solid #775B3F' : '1px solid #E7DDCE',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        position: 'relative',
                        boxShadow: isSelected ? '0 4px 14px rgba(119, 91, 63, 0.08)' : 'none'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ 
                            width: '14px', 
                            height: '14px', 
                            borderRadius: '50%', 
                            border: isSelected ? '4px solid #775B3F' : '1px solid #A8A29E',
                            backgroundColor: '#FFFFFF',
                            display: 'inline-block' 
                          }} />
                          <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.06em', color: '#775B3F', textTransform: 'uppercase' }}>
                            {addr.label || 'Destination'}
                          </span>
                        </div>
                        {addr.isDefault && (
                          <span style={{ fontSize: '0.65rem', padding: '2px 6px', backgroundColor: '#EDE4D4', color: '#5C4A3A', borderRadius: '2px', fontWeight: 600 }}>
                            {t('checkout.defaultBadge', 'Default')}
                          </span>
                        )}
                      </div>

                      <strong style={{ display: 'block', color: '#2C2117', fontSize: '0.9rem', marginBottom: '2px' }}>
                        {addr.recipient}
                      </strong>
                      <span style={{ display: 'block', color: '#775B3F', fontSize: '0.8rem', marginBottom: '4px' }}>
                        {addr.phone}
                      </span>
                      <p style={{ margin: 0, color: '#5C4A3A', fontSize: '0.82rem', lineHeight: 1.4 }}>
                        {addr.detail}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Nút chuyển đổi giao đến địa chỉ mới */}
              {!useCustomAddress ? (
                <button
                  type="button"
                  onClick={handleUseCustomAddress}
                  style={{
                    background: 'none',
                    border: '1px dashed #C8AE84',
                    borderRadius: '3px',
                    padding: '10px 14px',
                    width: '100%',
                    color: '#775B3F',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    transition: 'background-color 0.2s ease'
                  }}
                  onMouseEnter={e => e.currentTarget.style.backgroundColor = '#FAF7F2'}
                  onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <Plus size={14} /> {t('checkout.addNewAddressBtn', '+ Giao đến địa chỉ mới')}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSelectAddress(defaultAddr)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#775B3F',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textDecoration: 'underline',
                    padding: '4px 0'
                  }}
                >
                  {t('checkout.useSavedAddressBtn', '← Chọn lại từ Sổ địa chỉ đã lưu')}
                </button>
              )}
            </div>
          )}

          {/* Form nhập tay (Chỉ hiện khi khách bấm giao địa chỉ mới HOẶC chưa có địa chỉ lưu) */}
          {(useCustomAddress || savedAddresses.length === 0) && (
            <div style={{ padding: savedAddresses.length > 0 ? '16px' : 0, backgroundColor: savedAddresses.length > 0 ? '#FCFAF7' : 'transparent', borderRadius: '4px', border: savedAddresses.length > 0 ? '1px solid #E7DDCE' : 'none', marginBottom: '16px' }}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>{t('checkout.fullNameLabel', 'Full Name')} *</label>
                <input 
                  type="text" 
                  value={formData.name} 
                  onChange={e => setFormData({ ...formData, name: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }}
                  placeholder="e.g. Nguyen Van A"
                />
                {errors.name && <span style={{ color: '#B91C1C', fontSize: '0.78rem' }}>{errors.name}</span>}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>{t('checkout.phoneLabel', 'Phone Number')} *</label>
                  <input 
                    type="text" 
                    value={formData.phone} 
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }}
                    placeholder="0912 345 678"
                  />
                  {errors.phone && <span style={{ color: '#B91C1C', fontSize: '0.78rem' }}>{errors.phone}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>{t('checkout.emailLabel', 'Email')}</label>
                  <input 
                    type="email" 
                    value={formData.email} 
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>{t('checkout.addressLabel', 'Street Address')} *</label>
                <input 
                  type="text" 
                  value={formData.address} 
                  onChange={e => setFormData({ ...formData, address: e.target.value })}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }}
                  placeholder="House number, Street, Ward, District"
                />
                {errors.address && <span style={{ color: '#B91C1C', fontSize: '0.78rem' }}>{errors.address}</span>}
              </div>

              {currentUser && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: '#5C4A3A' }}>
                  <input 
                    type="checkbox" 
                    checked={saveToProfile} 
                    onChange={e => setSaveToProfile(e.target.checked)} 
                  />
                  <span>{t('checkout.saveAddressToProfile', 'Save this address to your Profile Address Book for future orders')}</span>
                </label>
              )}
            </div>
          )}

          {/* Email nhận hóa đơn (Khi đã chọn địa chỉ lưu sẵn) */}
          {!useCustomAddress && savedAddresses.length > 0 && (
            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>
                {t('checkout.emailLabel', 'Email Address (For receipt)')}
              </label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117', backgroundColor: '#FAF7F2' }}
                placeholder="your.email@example.com"
              />
            </div>
          )}

          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.04em', margin: '32px 0 20px', color: '#2C2117' }}>2. {t('checkout.paymentMethodTitle', 'PAYMENT METHOD')}</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
            {/* 1. Credit / Debit Card Option (PRIMARY FOR USD LUXURY BRAND) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between', 
                gap: '12px', 
                padding: '16px', 
                border: formData.paymentMethod === 'CARD' ? '1.5px solid #775B3F' : '1px solid #C8AE84', 
                borderRadius: '3px', 
                cursor: 'pointer', 
                backgroundColor: formData.paymentMethod === 'CARD' ? '#FAF7F2' : '#FFFFFF', 
                transition: 'all 0.2s ease' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={formData.paymentMethod === 'CARD'} 
                    onChange={() => setFormData({ ...formData, paymentMethod: 'CARD' })} 
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#2C2117', fontSize: '0.92rem' }}>{t('checkout.cardOption', 'Credit / Debit Card (Visa, Mastercard, AMEX)')}</strong>
                      <span style={{ fontSize: '0.68rem', fontWeight: 700, padding: '2px 8px', backgroundColor: '#775B3F', color: '#FFFFFF', borderRadius: '10px', letterSpacing: '0.04em' }}>
                        {language === 'vi' ? 'KHUYÊN DÙNG' : 'RECOMMENDED'}
                      </span>
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#5C4A3A' }}>{t('checkout.cardDesc', 'Instant global USD settlement via 256-bit encrypted gateway')}</p>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid #D5C3A5', borderRadius: '3px', color: '#1A365D' }}>VISA</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid #D5C3A5', borderRadius: '3px', color: '#C53030' }}>MC</span>
                  <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '2px 6px', backgroundColor: '#FFFFFF', border: '1px solid #D5C3A5', borderRadius: '3px', color: '#2B6CB0' }}>AMEX</span>
                </div>
              </label>

              {/* Card Simulation Panel */}
              {formData.paymentMethod === 'CARD' && (
                <div
                  style={{
                    padding: '20px',
                    backgroundColor: '#FAF7F2',
                    border: '1.5px solid #C8AE84',
                    borderRadius: '4px',
                    boxShadow: '0 4px 16px rgba(119, 91, 63, 0.06)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CreditCard size={18} color="#775B3F" />
                      <span style={{ fontSize: '0.86rem', fontWeight: 600, color: '#2C2117', letterSpacing: '0.03em' }}>
                        {language === 'vi' ? 'THÔNG TIN THẺ QUỐC TẾ (USD)' : 'GLOBAL CARD DETAILS (USD)'}
                      </span>
                    </div>
                    <span style={{ fontSize: '0.76rem', color: '#775B3F', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                      <Lock size={12} /> 256-bit SSL
                    </span>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 600, color: '#6B5645', marginBottom: '5px' }}>
                      {t('checkout.cardNumberLabel', 'Card Number')}
                    </label>
                    <input
                      type="text"
                      value={cardDetails.number}
                      onChange={e => setCardDetails({ ...cardDetails, number: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        border: '1px solid #C8AE84',
                        borderRadius: '3px',
                        backgroundColor: '#FFFFFF',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        color: '#2C2117'
                      }}
                      placeholder="4000 1234 5678 9010"
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 0.8fr', gap: '12px', marginBottom: '14px', alignItems: 'end' }}>
                    <div>
                      <label style={{ display: 'flex', alignItems: 'flex-end', minHeight: '1.85rem', fontSize: '0.76rem', fontWeight: 600, color: '#6B5645', marginBottom: '6px' }}>
                        {t('checkout.cardHolderLabel', 'Cardholder Name')}
                      </label>
                      <input
                        type="text"
                        value={cardDetails.name}
                        onChange={e => setCardDetails({ ...cardDetails, name: e.target.value.toUpperCase() })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #C8AE84',
                          borderRadius: '3px',
                          backgroundColor: '#FFFFFF',
                          fontSize: '0.85rem',
                          color: '#2C2117'
                        }}
                        placeholder="CARDHOLDER NAME"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'flex', alignItems: 'flex-end', minHeight: '1.85rem', fontSize: '0.76rem', fontWeight: 600, color: '#6B5645', marginBottom: '6px', whiteSpace: 'nowrap' }}>
                        {t('checkout.cardExpiryLabel', 'Expires (MM/YY)')}
                      </label>
                      <input
                        type="text"
                        value={cardDetails.expiry}
                        onChange={e => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #C8AE84',
                          borderRadius: '3px',
                          backgroundColor: '#FFFFFF',
                          fontFamily: 'monospace',
                          fontSize: '0.85rem',
                          color: '#2C2117'
                        }}
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label style={{ display: 'flex', alignItems: 'flex-end', minHeight: '1.85rem', fontSize: '0.76rem', fontWeight: 600, color: '#6B5645', marginBottom: '6px', whiteSpace: 'nowrap' }}>
                        {t('checkout.cardCvvLabel', 'CVV / CVC')}
                      </label>
                      <input
                        type="text"
                        value={cardDetails.cvv}
                        onChange={e => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                        style={{
                          width: '100%',
                          padding: '10px 12px',
                          border: '1px solid #C8AE84',
                          borderRadius: '3px',
                          backgroundColor: '#FFFFFF',
                          fontFamily: 'monospace',
                          fontSize: '0.85rem',
                          color: '#2C2117'
                        }}
                        placeholder="123"
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.74rem', color: '#775B3F', backgroundColor: '#F0E8DC', padding: '8px 12px', borderRadius: '3px' }}>
                    <ShieldCheck size={14} />
                    <span>{t('checkout.cardSecurityNotice', 'Card details are end-to-end encrypted following PCI-DSS Level 1 security standard.')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Vietnam Domestic Bank Transfer (VietQR - VND) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between',
                gap: '12px', 
                padding: '16px', 
                border: formData.paymentMethod === 'VIETQR' ? '1.5px solid #775B3F' : '1px solid #C8AE84', 
                borderRadius: '3px', 
                cursor: 'pointer', 
                backgroundColor: formData.paymentMethod === 'VIETQR' ? '#FAF7F2' : '#FFFFFF', 
                transition: 'all 0.2s ease' 
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <input 
                    type="radio" 
                    name="payment" 
                    checked={formData.paymentMethod === 'VIETQR'} 
                    onChange={() => setFormData({ ...formData, paymentMethod: 'VIETQR' })} 
                  />
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                      <strong style={{ color: '#2C2117', fontSize: '0.92rem' }}>{t('checkout.vietqrOption', 'Vietnam Domestic Bank Transfer (VietQR - VND)')}</strong>
                      <span style={{ fontSize: '0.68rem', fontWeight: 600, padding: '2px 8px', backgroundColor: '#F2ECE1', color: '#775B3F', border: '1px solid #D5C3A5', borderRadius: '10px' }}>
                        {language === 'vi' ? 'DÀNH CHO VNĐ' : 'VIETNAM ONLY (VND)'}
                      </span>
                    </div>
                    <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#5C4A3A' }}>{t('checkout.vietqrDesc', 'For local customers in Vietnam using domestic banking apps (Converted at live rate)')}</p>
                  </div>
                </div>

                <span style={{ fontSize: '0.74rem', color: '#775B3F', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Globe size={14} /> VND
                </span>
              </label>

              {/* VietQR Clean Quiet-Luxury Panel */}
              {formData.paymentMethod === 'VIETQR' && (
                <div 
                  style={{
                    padding: '22px',
                    backgroundColor: '#FAF7F2',
                    border: '1.5px solid #C8AE84',
                    borderRadius: '4px',
                    boxShadow: '0 4px 16px rgba(119, 91, 63, 0.08)'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <QrCode size={18} color="#775B3F" />
                    <h3 style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: '#2C2117', letterSpacing: '0.04em' }}>
                      {t('checkout.vietqrScanTitle', 'VIETNAM DOMESTIC BANK TRANSFER (VIETQR - VND)')}
                    </h3>
                  </div>

                  {/* Guaranteed Exchange Rate Disclosure */}
                  <div style={{ 
                    margin: '10px 0 16px', 
                    padding: '10px 14px', 
                    backgroundColor: '#EDE4D4', 
                    borderRadius: '3px', 
                    borderLeft: '3px solid #775B3F',
                    fontSize: '0.78rem', 
                    color: '#4A3B2C',
                    lineHeight: 1.5
                  }}>
                    <strong>💱 {t('checkout.vietqrRateNotice', 'Guaranteed Exchange Rate: $1.00 USD ≈ 25,400 VND (Converted total:')} {new Intl.NumberFormat('vi-VN').format(amountVnd)} ₫)</strong>
                    <div style={{ fontSize: '0.74rem', color: '#6B5645', marginTop: '2px' }}>
                      {language === 'vi' 
                        ? 'Áp dụng cho thanh toán nội địa tại Việt Nam qua Mobile Banking.' 
                        : 'Applicable for domestic payments in Vietnam via local Mobile Banking apps.'}
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '20px', alignItems: 'center' }}>
                    <div style={{ backgroundColor: '#FFFFFF', padding: '12px', border: '1px solid #D5C3A5', borderRadius: '4px', textAlign: 'center', maxWidth: '210px', margin: '0 auto', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <img 
                        src={`https://api.vietqr.io/image/970422-0988888888-qr_only.png?amount=${amountVnd}&addInfo=${encodeURIComponent(orderMemo)}&accountName=LUNE%20ATELIER%20STORE`}
                        alt="VietQR Domestic Payment Code"
                        style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '2px' }}
                      />
                      <div style={{ fontSize: '0.68rem', color: '#775B3F', fontWeight: 700, letterSpacing: '0.05em', marginTop: '8px', borderTop: '1px solid #E7DDCE', paddingTop: '6px' }}>
                        MB BANK · NAPAS 24/7
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '9px', fontSize: '0.82rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px dashed #E7DDCE' }}>
                        <span style={{ color: '#775B3F' }}>{t('checkout.bankLabel', 'Beneficiary Bank:')}</span>
                        <strong style={{ color: '#2C2117' }}>MB Bank (Vietnam)</strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6px', borderBottom: '1px dashed #E7DDCE' }}>
                        <span style={{ color: '#775B3F' }}>{t('checkout.accountNoLabel', 'Account Number:')}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#2C2117', fontFamily: 'monospace', fontSize: '0.92rem' }}>0988888888</strong>
                          <button
                            type="button"
                            onClick={() => handleCopy('0988888888', 'acc')}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#775B3F', padding: '2px', display: 'inline-flex' }}
                            title={t('checkout.copyTooltip', 'Copy')}
                          >
                            {copiedField === 'acc' ? <Check size={14} color="#15803D" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px dashed #E7DDCE' }}>
                        <span style={{ color: '#775B3F' }}>{t('checkout.accountNameLabel', 'Account Holder:')}</span>
                        <strong style={{ color: '#2C2117' }}>LUNE ATELIER STORE</strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '6px', borderBottom: '1px dashed #E7DDCE' }}>
                        <span style={{ color: '#775B3F' }}>{t('checkout.amountLabel', 'Exact Amount (VND):')}</span>
                        <strong style={{ color: '#775B3F', fontSize: '0.94rem' }}>
                          {new Intl.NumberFormat('vi-VN').format(amountVnd)} ₫ <span style={{ fontSize: '0.78rem', color: '#8C6D53', fontWeight: 500 }}>(${finalTotal} USD)</span>
                        </strong>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span style={{ color: '#775B3F' }}>{t('checkout.memoLabel', 'Transfer Memo:')}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <strong style={{ color: '#2C2117', fontFamily: 'monospace', fontSize: '0.88rem', backgroundColor: '#EDE4D4', padding: '2px 6px', borderRadius: '2px' }}>
                            {orderMemo}
                          </strong>
                          <button
                            type="button"
                            onClick={() => handleCopy(orderMemo, 'memo')}
                            style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#775B3F', padding: '2px', display: 'inline-flex' }}
                            title={t('checkout.copyTooltip', 'Copy')}
                          >
                            {copiedField === 'memo' ? <Check size={14} color="#15803D" /> : <Copy size={14} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: '14px', padding: '8px 12px', backgroundColor: '#F0E8DC', borderRadius: '3px', fontSize: '0.74rem', color: '#5C4A3A', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={15} color="#775B3F" />
                    <span>{t('checkout.vietqrAutoNotice', 'The system will automatically reconcile and confirm your order as soon as payment arrives.')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Cash On Delivery (COD) Option */}
            <label style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px', 
              padding: '16px', 
              border: formData.paymentMethod === 'COD' ? '1.5px solid #775B3F' : '1px solid #C8AE84', 
              borderRadius: '3px', 
              cursor: 'pointer', 
              backgroundColor: formData.paymentMethod === 'COD' ? '#FAF7F2' : '#FFFFFF', 
              transition: 'all 0.2s ease' 
            }}>
              <input 
                type="radio" 
                name="payment" 
                checked={formData.paymentMethod === 'COD'} 
                onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })} 
              />
              <div>
                <strong style={{ color: '#2C2117', fontSize: '0.92rem' }}>{t('checkout.codOption', 'Cash On Delivery (COD)')}</strong>
                <p style={{ margin: '3px 0 0', fontSize: '0.8rem', color: '#5C4A3A' }}>{t('checkout.codDesc', 'Pay cash when your order is delivered to your address')}</p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#775B3F',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              fontWeight: 600,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'background-color 0.2s ease'
            }}
          >
            {t('checkout.placeOrderBtn', 'CONFIRM & PLACE ORDER')} (${finalTotal})
          </button>
        </form>

        {/* Right: Order Summary */}
        <aside style={{ backgroundColor: '#FAF7F2', padding: '36px', border: '1px solid #E7DDCE', borderRadius: '4px', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '20px', color: '#2C2117' }}>{t('checkout.orderSummaryTitle', 'ORDER SUMMARY')} ({cart.length})</h2>

          <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '24px' }}>
            {cart.map(item => (
              <div key={item.cartItemId || item.id} style={{ display: 'flex', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #E7DDCE' }}>
                <img src={item.image} alt={tp(item, 'name')} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '2px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 2px', fontSize: '0.85rem', color: '#2C2117' }}>{tp(item, 'name')}</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#5C4A3A' }}>{t('checkout.qty')} {item.quantity} | {t('checkout.size')} {item.selectedSize}</p>
                  <p style={{ margin: '2px 0 0', fontWeight: 600, fontSize: '0.85rem', color: '#775B3F' }}>${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Voucher selection & Promo code */}
          <div style={{ marginBottom: '20px' }}>
            {eligibleVouchers.length > 0 && (
              <div style={{ marginBottom: '12px' }}>
                <label 
                  htmlFor="checkout-voucher" 
                  style={{ display: 'block', marginBottom: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#5C4A3A', textTransform: 'uppercase', letterSpacing: '0.04em' }}
                >
                  {t('checkout.selectVoucherLabel', 'Available Boutique Vouchers')}
                </label>
                <select
                  id="checkout-voucher"
                  value={selectedVoucherId}
                  onChange={e => handleVoucherSelect(e.target.value)}
                  style={{ 
                    width: '100%', 
                    padding: '9px 12px', 
                    border: '1px solid #C8AE84', 
                    borderRadius: '2px', 
                    backgroundColor: '#FFFFFF', 
                    fontSize: '0.85rem', 
                    color: '#2C2117',
                    outline: 'none',
                    cursor: 'pointer' 
                  }}
                >
                  <option value="">{t('checkout.noVoucher', '-- Select a Voucher --')}</option>
                  {eligibleVouchers.map(voucher => (
                    <option key={voucher.id} value={voucher.id}>
                      {voucher.code} - {voucher.discountType === 'percent' ? `${voucher.discountValue}% OFF` : `$${voucher.discountValue} OFF`}
                      {Number(voucher.minSubtotal) > 0 ? ` (Min. $${voucher.minSubtotal})` : ''}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {lockedVouchers.length > 0 && (
              <div style={{ marginBottom: '12px', padding: '8px 10px', backgroundColor: '#FDFBF7', border: '1px dashed #D5C3A5', borderRadius: '3px', fontSize: '0.78rem', color: '#775B3F' }}>
                ✨ {lockedVouchers.slice(0, 2).map(v => `${v.code} (${v.discountType === 'percent' ? `${v.discountValue}%` : `$${v.discountValue}`} OFF - Min. $${v.minSubtotal})`).join(' • ')}
              </div>
            )}

            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder={t('checkout.promoPlaceholder', 'Promo Code (e.g. LUNE10)')} 
                value={formData.promoCode}
                onChange={e => setFormData({ ...formData, promoCode: e.target.value })}
                style={{ flex: 1, padding: '8px 12px', border: '1px solid #C8AE84', borderRadius: '2px', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FFFFFF', color: '#2C2117' }}
              />
              <button 
                type="button" 
                onClick={handleApplyPromo}
                style={{ padding: '8px 18px', backgroundColor: '#775B3F', color: '#FFFFFF', border: 'none', borderRadius: '2px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
              >
                {t('checkout.applyBtn', 'Apply')}
              </button>
            </div>
            {promoMessage && (
              <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: appliedDiscount > 0 ? '#16A34A' : '#B91C1C' }}>
                {promoMessage}
              </p>
            )}
          </div>

          {/* Calculations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', borderTop: '1px solid #E7DDCE', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5C4A3A' }}>
              <span>{t('cart.subtotalLabel', 'Subtotal')}</span>
              <span>${cartTotal}</span>
            </div>
            {appliedDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
                <span>{getDiscountLabel()}</span>
                <span>-${appliedDiscount}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5C4A3A' }}>
              <span>{t('checkout.shippingFeeLabel')}</span>
              <span>{shippingFee === 0 ? t('common.free').toUpperCase() : `$${shippingFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, borderTop: '1px solid #E7DDCE', paddingTop: '12px', marginTop: '4px', color: '#2C2117' }}>
              <span>{t('checkout.totalLabel')}</span>
              <span style={{ color: '#775B3F' }}>${finalTotal}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

