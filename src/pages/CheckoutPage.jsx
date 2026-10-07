import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

/**
 * CheckoutPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 * Harmonized with LUNE Warm Luxury Brand Guidelines
 */
export default function CheckoutPage() {
  const { cart, cartTotal, addOrder, currentUser } = useShop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    city: 'TP. Ho Chi Minh',
    paymentMethod: 'COD', // COD or Card
    promoCode: ''
  });

  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [errors, setErrors] = useState({});

  if (cart.length === 0) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', color: '#2C2117' }}>Your shopping bag is empty</h2>
        <p style={{ color: '#5C4A3A', marginBottom: '24px' }}>Add items to your bag before proceeding to checkout.</p>
        <Link to="/shop" style={{ color: '#775B3F', fontWeight: 600, textDecoration: 'underline' }}>Return to Shop</Link>
      </div>
    );
  }

  const handleApplyPromo = () => {
    if (formData.promoCode.trim().toUpperCase() === 'LUNE10') {
      const discount = Math.round(cartTotal * 0.1);
      setAppliedDiscount(discount);
      setPromoMessage('Promo code LUNE10 applied: 10% OFF!');
    } else {
      setAppliedDiscount(0);
      setPromoMessage('Invalid promo code. Try LUNE10');
    }
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
      totalAmount: finalTotal,
      discount: appliedDiscount,
      shippingFee: shippingFee,
      paymentMethod: formData.paymentMethod === 'COD' ? 'Cash on Delivery' : 'Credit Card (Simulated)'
    });

    navigate('/order-success', { state: { order: newOrder } });
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ marginBottom: '32px' }}>
        <Link to="/shop" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#5C4A3A', textDecoration: 'none', fontSize: '0.85rem' }}>
          <ArrowLeft size={16} /> Continue Shopping
        </Link>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 500, margin: '12px 0 4px', color: '#2C2117' }}>CHECKOUT</h1>
        <p style={{ color: '#5C4A3A', fontSize: '0.92rem' }}>Please enter your delivery details and choose your payment method.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px' }}>
        {/* Left: Form */}
        <form onSubmit={handleSubmit} style={{ backgroundColor: '#FFFFFF', padding: '36px', border: '1px solid #E7DDCE', borderRadius: '4px', boxShadow: '0 2px 8px rgba(44, 33, 23, 0.03)' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '20px', color: '#2C2117' }}>1. SHIPPING ADDRESS</h2>

          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>Full Name *</label>
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
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>Phone Number *</label>
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
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>Email</label>
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
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>Street Address *</label>
            <input 
              type="text" 
              value={formData.address} 
              onChange={e => setFormData({ ...formData, address: e.target.value })}
              style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }}
              placeholder="House number, Street, Ward, District"
            />
            {errors.address && <span style={{ color: '#B91C1C', fontSize: '0.78rem' }}>{errors.address}</span>}
          </div>

          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.04em', margin: '32px 0 20px', color: '#2C2117' }}>2. PAYMENT METHOD</h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', border: '1px solid #C8AE84', borderRadius: '3px', cursor: 'pointer', backgroundColor: formData.paymentMethod === 'COD' ? '#FAF7F2' : '#FFFFFF' }}>
              <input 
                type="radio" 
                name="payment" 
                checked={formData.paymentMethod === 'COD'} 
                onChange={() => setFormData({ ...formData, paymentMethod: 'COD' })} 
              />
              <div>
                <strong style={{ color: '#2C2117' }}>Cash On Delivery (COD)</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#5C4A3A' }}>Pay cash when your order is delivered</p>
              </div>
            </label>

            <label style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px', border: '1px solid #C8AE84', borderRadius: '3px', cursor: 'pointer', backgroundColor: formData.paymentMethod === 'CARD' ? '#FAF7F2' : '#FFFFFF' }}>
              <input 
                type="radio" 
                name="payment" 
                checked={formData.paymentMethod === 'CARD'} 
                onChange={() => setFormData({ ...formData, paymentMethod: 'CARD' })} 
              />
              <div>
                <strong style={{ color: '#2C2117' }}>Credit / Debit Card (Simulated)</strong>
                <p style={{ margin: 0, fontSize: '0.8rem', color: '#5C4A3A' }}>Visa, MasterCard, JCB instant confirmation</p>
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
            CONFIRM & PLACE ORDER (${finalTotal})
          </button>
        </form>

        {/* Right: Order Summary */}
        <aside style={{ backgroundColor: '#FAF7F2', padding: '36px', border: '1px solid #E7DDCE', borderRadius: '4px', height: 'fit-content' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '20px', color: '#2C2117' }}>ORDER SUMMARY ({cart.length})</h2>

          <div style={{ maxHeight: '280px', overflowY: 'auto', marginBottom: '24px' }}>
            {cart.map(item => (
              <div key={item.cartItemId || item.id} style={{ display: 'flex', gap: '12px', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid #E7DDCE' }}>
                <img src={item.image} alt={item.name} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '2px' }} />
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 2px', fontSize: '0.85rem', color: '#2C2117' }}>{item.name}</h4>
                  <p style={{ margin: 0, fontSize: '0.78rem', color: '#5C4A3A' }}>Qty: {item.quantity} | Size: {item.selectedSize}</p>
                  <p style={{ margin: '2px 0 0', fontWeight: 600, fontSize: '0.85rem', color: '#775B3F' }}>${item.price * item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Promo code */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input 
                type="text" 
                placeholder="Promo Code (e.g. LUNE10)" 
                value={formData.promoCode}
                onChange={e => setFormData({ ...formData, promoCode: e.target.value })}
                style={{ flex: 1, padding: '8px 12px', border: '1px solid #C8AE84', borderRadius: '2px', fontSize: '0.85rem', outline: 'none', backgroundColor: '#FFFFFF', color: '#2C2117' }}
              />
              <button 
                type="button" 
                onClick={handleApplyPromo}
                style={{ padding: '8px 18px', backgroundColor: '#775B3F', color: '#FFFFFF', border: 'none', borderRadius: '2px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}
              >
                Apply
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
              <span>Subtotal</span>
              <span>${cartTotal}</span>
            </div>
            {appliedDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16A34A' }}>
                <span>Discount (10%)</span>
                <span>-${appliedDiscount}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#5C4A3A' }}>
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee}`}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: 700, borderTop: '1px solid #E7DDCE', paddingTop: '12px', marginTop: '4px', color: '#2C2117' }}>
              <span>Total</span>
              <span style={{ color: '#775B3F' }}>${finalTotal}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
