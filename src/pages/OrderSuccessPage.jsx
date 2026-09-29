import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, Package, ArrowRight } from 'lucide-react';

/**
 * OrderSuccessPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 */
export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ maxWidth: '700px', margin: '60px auto', padding: '40px 24px', textAlign: 'center', backgroundColor: '#fff', border: '1px solid #E7E5E4' }}>
      <CheckCircle2 size={64} color="#16A34A" style={{ margin: '0 auto 16px' }} />
      <h1 style={{ fontFamily: 'serif', fontSize: '2.2rem', fontWeight: 500, margin: '0 0 8px' }}>THANK YOU FOR YOUR ORDER</h1>
      <p style={{ color: '#78716C', fontSize: '0.95rem', marginBottom: '24px' }}>
        We have received your order and our ateliers are currently preparing your items for delivery.
      </p>

      {/* Order info badge */}
      <div style={{ backgroundColor: '#FAF8F5', padding: '20px', borderRadius: '4px', textAlign: 'left', marginBottom: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #E7E5E4', paddingBottom: '8px' }}>
          <span style={{ color: '#78716C', fontSize: '0.85rem' }}>Order Reference:</span>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1C1917' }}>{order.id}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#78716C' }}>Recipient:</span>
          <span>{order.customer.name} ({order.customer.phone})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#78716C' }}>Shipping to:</span>
          <span>{order.customer.address}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#78716C' }}>Payment Method:</span>
          <span>{order.paymentMethod}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 700, borderTop: '1px solid #E7E5E4', paddingTop: '8px', marginTop: '8px' }}>
          <span>Total Paid:</span>
          <span>${order.totalAmount}</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link 
          to="/shop" 
          style={{
            padding: '12px 28px',
            backgroundColor: '#1C1917',
            color: '#fff',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          CONTINUE SHOPPING <ArrowRight size={16} />
        </Link>
        <Link 
          to="/profile" 
          style={{
            padding: '12px 28px',
            backgroundColor: '#FAF8F5',
            color: '#1C1917',
            border: '1px solid #D6D3D1',
            textDecoration: 'none',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          VIEW MY ORDERS
        </Link>
      </div>
    </div>
  );
}
