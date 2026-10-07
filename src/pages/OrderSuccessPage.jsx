import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

/**
 * OrderSuccessPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 * Harmonized with LUNE Warm Luxury Brand Guidelines
 */
export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ maxWidth: '720px', margin: '60px auto', padding: '48px 32px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E7DDCE', borderRadius: '4px', boxShadow: '0 4px 16px rgba(44, 33, 23, 0.04)' }}>
      <CheckCircle2 size={64} color="#775B3F" style={{ margin: '0 auto 16px' }} />
      <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 500, margin: '0 0 8px', color: '#2C2117' }}>THANK YOU FOR YOUR ORDER</h1>
      <p style={{ color: '#5C4A3A', fontSize: '0.95rem', marginBottom: '28px' }}>
        We have received your order and our ateliers are currently preparing your items for delivery.
      </p>

      {/* Order info badge */}
      <div style={{ backgroundColor: '#FAF7F2', padding: '24px', borderRadius: '4px', textAlign: 'left', marginBottom: '36px', border: '1px solid #E7DDCE' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #E7DDCE', paddingBottom: '10px' }}>
          <span style={{ color: '#5C4A3A', fontSize: '0.85rem' }}>Order Reference:</span>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2C2117' }}>{order.id}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#5C4A3A' }}>Recipient:</span>
          <span style={{ color: '#2C2117' }}>{order.customer.name} ({order.customer.phone})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#5C4A3A' }}>Shipping to:</span>
          <span style={{ color: '#2C2117' }}>{order.customer.address}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#5C4A3A' }}>Payment Method:</span>
          <span style={{ color: '#2C2117' }}>{order.paymentMethod}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 700, borderTop: '1px solid #E7DDCE', paddingTop: '10px', marginTop: '10px', color: '#2C2117' }}>
          <span>Total Paid:</span>
          <span style={{ color: '#775B3F' }}>${order.totalAmount}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link 
          to="/shop" 
          style={{
            padding: '12px 32px',
            backgroundColor: '#775B3F',
            color: '#FFFFFF',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            borderRadius: '2px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            letterSpacing: '0.04em',
            transition: 'background-color 0.2s ease'
          }}
        >
          CONTINUE SHOPPING <ArrowRight size={16} />
        </Link>
        <Link 
          to="/profile" 
          style={{
            padding: '12px 28px',
            backgroundColor: '#FAF7F2',
            color: '#2C2117',
            border: '1px solid #C8AE84',
            borderRadius: '2px',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.04em'
          }}
        >
          VIEW MY ORDERS
        </Link>
      </div>
    </div>
  );
}
