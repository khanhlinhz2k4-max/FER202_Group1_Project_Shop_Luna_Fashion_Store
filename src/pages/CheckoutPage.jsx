import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ArrowLeft } from 'lucide-react';

/**
 * CheckoutPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 */
export default function CheckoutPage() {
  const { cart, cartTotal, addOrder, currentUser, vouchers } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    city: 'TP. Ho Chi Minh',
    paymentMethod: 'COD' // COD or Card
  });

  const [selectedVoucherId, setSelectedVoucherId] = useState('');
  const [errors, setErrors] = useState({});

  const today = new Date().toISOString().slice(0, 10);
  const eligibleVouchers = vouchers.filter(voucher =>
    voucher.isActive &&
    (!voucher.expiresAt || voucher.expiresAt >= today) &&
    cartTotal >= (Number(voucher.minSubtotal) || 0)
  );
  const selectedVoucher = eligibleVouchers.find(voucher => voucher.id === selectedVoucherId);
  const appliedDiscount = selectedVoucher
    ? Math.min(
        cartTotal,
        selectedVoucher.discountType === 'percent'
          ? Math.round(cartTotal * Number(selectedVoucher.discountValue) / 100)
          : Number(selectedVoucher.discountValue)
      )
    : 0;

  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Your shopping bag is empty</h2>
        <p style={{ color: '#78716C', marginBottom: '20px' }}>Add items to your bag before proceeding to checkout.</p>
        <Link to="/shop" style={{ color: '#775B3F', textDecoration: 'underline' }}>Return to Shop</Link>
      </div>
    );
  }

  const handleVoucherChange = (voucherId) => {
    setSelectedVoucherId(voucherId);
  };

  const shippingFee = cartTotal >= 250 ? 0 : 15;
  const finalTotal = Math.max(0, cartTotal - appliedDiscount + shippingFee);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    const errs = {};
    if (!formData.name.trim()) errs.name = "Full name is required";
    if (!formData.phone.trim()) errs.phone = "Phone number is required";
    if (!formData.address.trim()) errs.address = "Delivery address is required";

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const newOrder = addOrder({
      customer: {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        address: `${formData.address}, ${formData.city}`
      },
      items: cart,
      subtotal: cartTotal,
      discount: appliedDiscount,
      voucherCode: selectedVoucher?.code || '',
      shippingFee: shippingFee,
      totalAmount: finalTotal,
      paymentMethod: formData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit / Debit Card'
    });

    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#78716C', textDecoration: 'none', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
        <h1 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 500, margin: '12px 0 4px' }}>CHECKOUT</h1>
        <p style={{ color: '#78716C', fontSize: '0.9rem' }}>Please enter your delivery details and choose your payment method.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>
        {/* Left: Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#fff', padding: '32px', border: '1px solid #E7E5E4' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '20px' }}>1. SHIPPING ADDRESS</h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>Full Name *</label>
            <input 
              type="text" 
              value={formData.name} 
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              style={{ width: '100%', padding: '10px', border: '1px solid #D6D3D1', outline: 'none' }}
              placeholder="e.g. Nguyen Van A"
            />
            {errors.name && <span style={{ color: '#E11D48', fontSize: '0.78rem' }}>{errors.name}</span>}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>Phone Number *</label>
              <input 
                type="text" 
                value={formData.phone} 
                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #D6D3D1', outline: 'none' }}
                placeholder="0912 345 678"
              />
              {errors.phone && <span style={{ color: '#E11D48', fontSize: '0.78rem' }}>{errors.phone}</span>}
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>Email</label>
              <input 
                type="email" 
                value={formData.email} 
                onChange={e => setFormData({ ...formData, email: e.target.value })}
                style={{ width: '100%', padding: '10px', border: '1px solid #D6D3D1', outline: 'none' }}
                placeholder="your.email@example.com"
              />
            </div>
          </div>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>Street Address *</label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', padding: '10px', border: '1px solid #D6D3D1', outline: 'none' }}
              placeholder="House number, Street, Ward, District"
            />
            {errors.address && <span style={{ color: '#E11D48', fontSize: '0.78rem' }}>{errors.address}</span>}
          </div>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em', margin: '32px 0 20px' }}>2. PAYMENT METHOD</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #D6D3D1', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="payment" 
                checked={formData.paymentMethod === 'COD'} 
                onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })} 
              />
              <div>
                <strong>Cash On Delivery (COD)</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#78716C' }}>Pay cash when your order is delivered</p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px solid #D6D3D1', cursor: 'pointer' }}>
              <input 
                type="radio" 
                name="payment" 
                checked={formData.paymentMethod === 'CARD'} 
                onChange={() => setFormData({ ...formData, paymentMethod: 'CARD' })} 
              />
              <div>
                <strong>Credit / Debit Card (Simulated)</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#78716C' }}>Visa, MasterCard, JCB instant confirmation</p>
              </div>
            </label>
          </div>

          <button
            type="submit"
            style={{
              width: '100%',
              padding: '16px',
              backgroundColor: '#1C1917',
              color: '#fff',
              border: 'none',
              fontWeight: 600,
              letterSpacing: '0.05em',
              cursor: 'pointer'
            }}
          >
            CONFIRM & PLACE ORDER (${finalTotal})
          </button>
        </form>

        {/* Right: Order Summary */}
        <aside style={{ backgroundColor: '#FAF8F5', padding: '32px', border: '1px solid #E7E5E4', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '20px' }}>ORDER SUMMARY ({cart.length})</h2>

          <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '24px' }}>
            {cart.map(item => (
              <div key={item.cartItemId || item.id} style={{ display: 'flex', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #E7E5E4' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '65px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 2px', fontSize: '0.85rem' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#78716C' }}>Qty: {item.quantity} | Size: {item.selectedSize}</p>
                  <p style={{ margin: '2px 0 0', fontWeight: 600, fontSize: '0.85rem' }}>${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Voucher selection */}
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="checkout-voucher" style={{ display: 'block', marginBottom: '7px', fontSize: '0.85rem', fontWeight: 600 }}>Choose a voucher</label>
            <select
              id="checkout-voucher"
              value={selectedVoucher?.id || ''}
              onChange={e => handleVoucherChange(e.target.value)}
              style={{ width: '100%', padding: '9px 12px', border: '1px solid #D6D3D1', backgroundColor: '#fff', fontSize: '0.85rem', outline: 'none' }}
            >
              <option value="">No voucher</option>
              {eligibleVouchers.map(voucher => (
                <option key={voucher.id} value={voucher.id}>
                  {voucher.code} - {voucher.discountType === 'percent' ? `${voucher.discountValue}% off` : `$${voucher.discountValue} off`}
                  {Number(voucher.minSubtotal) > 0 ? ` (min. $${voucher.minSubtotal})` : ''}
                </option>
              ))}
            </select>
            {eligibleVouchers.length === 0 && (
              <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#78716C' }}>No vouchers are available for this order.</p>
            )}
            {selectedVoucher && (
              <p style={{ margin: '6px 0 0', fontSize: '0.8rem', color: '#16A34A' }}>
                Voucher {selectedVoucher.code} applied.
              </p>
            )}
          </div>

          {/* Calculations */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem', borderTop: '1px solid #E7E5E4', paddingTop: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#57534E' }}>
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            {appliedDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
                <span>Discount ({selectedVoucher?.code})</span>
                <span>-${appliedDiscount}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#57534E' }}>
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, borderTop: '1px solid #E7E5E4', paddingTop: '12px', marginTop: '4px' }}>
              <span>Total</span>
              <span>${finalTotal}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
