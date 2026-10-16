import React, { useState, useMemo } from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Printer, User } from 'lucide-react';
import OrderTimeline from '../components/OrderTimeline';
import InvoiceModal from '../components/InvoiceModal';
import { useLanguage } from '../context/LanguageContext';
import { useShop } from '../context/ShopContext';
import './OrderSuccess.css';

/**
 * OrderSuccessPage Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 * Nâng cấp: Tích hợp Timeline & In Hóa Đơn Boutique & Đa ngôn ngữ (i18n)
 */
export default function OrderSuccessPage() {
  const location = useLocation();
  const { orders } = useShop();
  const { t, tp, language } = useLanguage();
  const [isInvoiceOpen, setIsInvoiceOpen] = useState(false);

  // Retrieve order from location state, or fallback to cached last order
  const order = useMemo(() => {
    if (location.state?.order) {
      return location.state.order;
    }
    try {
      const cached = sessionStorage.getItem('lune_last_order');
      if (cached) {
        return JSON.parse(cached);
      }
    } catch (e) {
      // Fallback
    }
    // Final fallback: latest order from shop context if available
    if (orders && orders.length > 0) {
      return orders[0];
    }
    return null;
  }, [location.state, orders]);

  if (!order) {
    return <Navigate to="/" replace />;
  }

  // Format order date
  const dateLocale = language === 'vi' ? 'vi-VN' : 'en-US';
  const formattedDate = order.createdAt 
    ? new Date(order.createdAt).toLocaleDateString(dateLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : new Date().toLocaleDateString(dateLocale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

  return (
    <div className="order-success-container">
      <div className="order-success-card">
        {/* Animated Success Badge */}
        <div className="order-success-icon-wrap">
          <CheckCircle2 size={42} strokeWidth={2.2} />
        </div>

        {/* Title & Appreciation */}
        <h1 className="order-success-title">
          {t('orderSuccess.title', 'CHÂN THÀNH CẢM ƠN QUÝ KHÁCH')}
        </h1>
        <p className="order-success-desc">
          {t('orderSuccess.desc', 'Chúng tôi đã tiếp nhận đơn hàng. Các nghệ nhân tại xưởng may đang chuẩn bị trang phục để gửi đến Quý khách sớm nhất.')}
        </p>

        {/* Order Receipt Overview */}
        <div className="order-receipt-card">
          <div className="order-receipt-header">
            <span className="order-receipt-label">{t('orderSuccess.orderReference', 'Mã đơn hàng')}</span>
            <span className="order-receipt-id">{order.id}</span>
          </div>

          <div className="order-receipt-grid">
            <div className="order-receipt-row">
              <span className="order-receipt-key">{t('invoice.orderDate', 'Ngày đặt hàng:')}</span>
              <span className="order-receipt-val">{formattedDate}</span>
            </div>

            <div className="order-receipt-row">
              <span className="order-receipt-key">{t('orderSuccess.recipient', 'Người nhận:')}</span>
              <span className="order-receipt-val">
                {order.customer?.name} ({order.customer?.phone})
              </span>
            </div>

            <div className="order-receipt-row">
              <span className="order-receipt-key">{t('orderSuccess.shippingTo', 'Địa chỉ giao:')}</span>
              <span className="order-receipt-val">{order.customer?.address}</span>
            </div>

            <div className="order-receipt-row">
              <span className="order-receipt-key">{t('orderSuccess.paymentMethod', 'Phương thức thanh toán:')}</span>
              <span className="order-receipt-val">{order.paymentMethod}</span>
            </div>
          </div>

          {/* Purchased Items Snapshot */}
          {Array.isArray(order.items) && order.items.length > 0 && (
            <div className="order-items-snapshot">
              <h3 className="order-items-title">
                {t('checkout.orderSummaryTitle', 'Chi tiết trang phục đã chọn')} ({order.items.length})
              </h3>
              <div className="order-items-scroll">
                {order.items.map((item, idx) => (
                  <div key={item.cartItemId || idx} className="order-item-row">
                    {item.image && (
                      <img 
                        src={item.image} 
                        alt={tp(item, 'name') || item.name} 
                        className="order-item-mini-img" 
                      />
                    )}
                    <div className="order-item-mini-info">
                      <p className="order-item-mini-name">{tp(item, 'name') || item.name}</p>
                      <p className="order-item-mini-meta">
                        {t('checkout.size', 'Size')}: {item.selectedSize || 'Standard'} 
                        {item.selectedColor && ` | ${t('cart.color', 'Màu')}: ${item.selectedColor}`} 
                        {' • '}{t('checkout.qty', 'SL')}: {item.quantity || 1}
                      </p>
                    </div>
                    <span className="order-item-mini-price">
                      ${(Number(item.price) || 0) * (Number(item.quantity) || 1)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Total Amount Paid */}
          <div className="order-receipt-total-row">
            <span className="order-total-key">{t('orderSuccess.totalPaid', 'Tổng thanh toán:')}</span>
            <span className="order-total-val">${order.totalAmount}</span>
          </div>
        </div>

        {/* Real-time Order Fulfillment Tracker */}
        <div className="order-timeline-wrapper">
          <OrderTimeline status={order.status || 'Pending'} />
        </div>

        {/* Action Buttons */}
        <div className="order-success-actions">
          <button 
            type="button" 
            className="order-action-btn-secondary"
            onClick={() => setIsInvoiceOpen(true)}
          >
            <Printer size={16} />
            <span>{t('orderSuccess.printReceiptBtn', 'IN HÓA ĐƠN BOUTIQUE')}</span>
          </button>

          <Link to="/shop" className="order-action-btn-primary">
            <span>{t('orderSuccess.continueShoppingBtn', 'TIẾP TỤC MUA SẮM')}</span>
            <ArrowRight size={16} />
          </Link>

          <Link to="/profile" className="order-action-btn-secondary">
            <User size={15} />
            <span>{t('orderSuccess.viewOrdersBtn', 'XEM ĐƠN HÀNG CỦA TÔI')}</span>
          </Link>
        </div>

        {/* Luxury Printable Invoice Modal */}
        <InvoiceModal
          order={order}
          isOpen={isInvoiceOpen}
          onClose={() => setIsInvoiceOpen(false)}
        />
      </div>
    </div>
  );
}
