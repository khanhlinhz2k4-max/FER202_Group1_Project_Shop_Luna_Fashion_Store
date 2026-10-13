import React, { useState } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Printer } from 'lucide-react';
import OrderTimeline from '../components/OrderTimeline';
import InvoiceModal from '../components/InvoiceModal';
import { useLanguage } from '../context/LanguageContext';

/**
 * OrderSuccessPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 * Nâng cấp: Thành viên 1 (Leader - Tích hợp Timeline & In Hóa Đơn Boutique & Đa ngôn ngữ)
 * Harmonized with LUNE Warm Luxury Brand Guidelines
 */
export default function OrderSuccessPage() {
  const location = useLocation();
  const order = location.state?.order;
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);
  const { t } = useLanguage();

  if (!order) {
    return <Navigate to="/" replace />;
  }

  return (
    <div style={{ maxWidth: '720px', margin: '60px auto', padding: '48px 32px', textAlign: 'center', backgroundColor: '#FFFFFF', border: '1px solid #E7DDCE', borderRadius: '4px', boxShadow: '0 4px 16px rgba(44, 33, 23, 0.04)' }}>
      <CheckCircle2 size={64} color="#775B3F" style={{ margin: '0 auto 16px' }} />
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-h1)', fontWeight: 500, margin: '0 0 8px', color: '#2C2117' }}>
        {t('orderSuccess.title', 'THANK YOU FOR YOUR ORDER')}
      </h1>
      <p style={{ color: '#5C4A3A', fontSize: 'var(--text-body)', marginBottom: '28px' }}>
        {t('orderSuccess.desc', 'We have received your order and our ateliers are currently preparing your items for delivery.')}
      </p>

      {/* Order info badge */}
      <div style={{ backgroundColor: '#FAF7F2', padding: '24px', borderRadius: '4px', textAlign: 'left', marginBottom: '36px', border: '1px solid #E7DDCE' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #E7DDCE', paddingBottom: '10px' }}>
          <span style={{ color: '#5C4A3A', fontSize: '0.85rem' }}>{t('orderSuccess.orderReference', 'Order Reference:')}</span>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: '#2C2117' }}>{order.id}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#5C4A3A' }}>{t('orderSuccess.recipient', 'Recipient:')}</span>
          <span style={{ color: '#2C2117' }}>{order.customer.name} ({order.customer.phone})</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#5C4A3A' }}>{t('orderSuccess.shippingTo', 'Shipping to:')}</span>
          <span style={{ color: '#2C2117' }}>{order.customer.address}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
          <span style={{ color: '#5C4A3A' }}>{t('orderSuccess.paymentMethod', 'Payment Method:')}</span>
          <span style={{ color: '#2C2117' }}>{order.paymentMethod}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.05rem', fontWeight: 700, borderTop: '1px solid #E7DDCE', paddingTop: '10px', marginTop: '10px', color: '#2C2117' }}>
          <span>{t('orderSuccess.totalPaid', 'Total Paid:')}</span>
          <span style={{ color: '#775B3F' }}>${order.totalAmount}</span>
        </div>
      </div>

      {/* Real-time Order Fulfillment Tracker */}
      <div style={{ marginBottom: '32px' }}>
        <OrderTimeline status={order.status || 'Pending'} />
      </div>

      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <button 
          type="button" 
          onClick={() => setIsInvoiceOpen(true)}
          style={{
            padding: '12px 24px',
            backgroundColor: '#FAF7F2',
            color: '#2C2117',
            border: '1px solid #C8AE84',
            borderRadius: '2px',
            fontSize: '0.85rem',
            fontWeight: 600,
            letterSpacing: '0.04em',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'background-color 0.2s'
          }}
        >
          <Printer size={16} /> {t('orderSuccess.printReceiptBtn', 'PRINT BOUTIQUE RECEIPT')}
        </button>
        <Link 
          to="/shop" 
          style={{
            padding: '12px 28px',
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
          {t('orderSuccess.continueShoppingBtn', 'CONTINUE SHOPPING')} <ArrowRight size={16} />
        </Link>
        <Link 
          to="/profile" 
          style={{
            padding: '12px 24px',
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
          {t('orderSuccess.viewOrdersBtn', 'VIEW MY ORDERS')}
        </Link>
      </div>

      {/* Luxury Printable Invoice Modal */}
      <InvoiceModal
        order={order}
        isOpen={isInvoiceOpen}
        onClose={() => setIsInvoiceOpen(false)}
      />
    </div>
  );
}

