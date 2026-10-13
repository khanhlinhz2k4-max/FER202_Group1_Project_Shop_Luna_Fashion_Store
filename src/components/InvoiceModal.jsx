import React from 'react';
import { createPortal } from 'react-dom';
import { Printer, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import './InvoiceModal.css';

/**
 * InvoiceModal Component
 * Printable Luxury Boutique Invoice / Receipt
 * Uses React Portal to mount on document.body for flawless, single-page print output
 * Bilingual Support: 100% localized in Vietnamese 🇻🇳 and English 🇬🇧
 */
export default function InvoiceModal({ order, isOpen, onClose }) {
  const { t, tp, language } = useLanguage();

  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const dateLocale = language === 'vi' ? 'vi-VN' : 'en-US';
  const invoiceDate = order.createdAt 
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

  const subtotal = (order.items || []).reduce(
    (sum, item) => sum + (Number(item.price) || 0) * (Number(item.quantity) || 1),
    0
  );

  const shippingFee = subtotal >= 200 ? 0 : 15;
  const discountAmount = Math.max(0, subtotal + shippingFee - (Number(order.totalAmount) || subtotal));

  const modalContent = (
    <div className="invoice-modal-backdrop" onClick={onClose}>
      <div className="invoice-modal-container" onClick={e => e.stopPropagation()}>
        {/* Modal Toolbar (hidden when printing) */}
        <div className="invoice-modal-toolbar">
          <h3 className="invoice-toolbar-title">{t('invoice.toolbarTitle')}</h3>
          <div className="invoice-toolbar-actions">
            <button 
              type="button" 
              className="invoice-btn-print"
              onClick={handlePrint}
            >
              <Printer size={15} /> {t('invoice.printBtn')}
            </button>
            <button 
              type="button" 
              className="invoice-btn-close" 
              onClick={onClose}
              title={t('common.close')}
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Paper Sheet */}
        <div className="invoice-sheet-scroll">
          <div className="lune-invoice-sheet" id="printable-invoice">
            {/* Header */}
            <div className="invoice-header">
              <div>
                <h1 className="invoice-brand-title">LUNE</h1>
                <p className="invoice-brand-sub">{t('invoice.brandSub')}</p>
                <div className="invoice-brand-contact">
                  {t('invoice.flagshipText')}<br />
                  {t('invoice.conciergeText')}<br />
                  {t('invoice.storefrontText')}
                </div>
              </div>

              <div className="invoice-meta-block">
                <div className="invoice-doc-label">{t('invoice.officialReceipt')}</div>
                <div className="invoice-meta-row">
                  {t('invoice.invoiceNo')} <strong>{order.id}</strong>
                </div>
                <div className="invoice-meta-row">
                  {t('invoice.issueDate')} <strong>{invoiceDate}</strong>
                </div>
                <div className="invoice-meta-row">
                  {t('invoice.status')} <strong>{(order.status || 'Confirmed').toUpperCase()}</strong>
                </div>
              </div>
            </div>

            {/* Customer & Shipping Details */}
            <div className="invoice-info-grid">
              <div className="invoice-info-col">
                <h5>{t('invoice.billedTo')}</h5>
                <p><strong>{order.customer?.name || (language === 'vi' ? 'Quý Khách Hàng' : 'Private Client')}</strong></p>
                <p>{order.customer?.phone || (language === 'vi' ? 'Số điện thoại trên hồ sơ' : 'Contact on file')}</p>
                <p>{order.customer?.email || (language === 'vi' ? 'Email trên hồ sơ' : 'Email on file')}</p>
                <p>{order.customer?.address || (language === 'vi' ? 'Địa chỉ giao hàng chuẩn' : 'Standard Delivery Address')}</p>
              </div>

              <div className="invoice-info-col">
                <h5>{t('invoice.fulfillmentProtocol')}</h5>
                <p><strong>{t('invoice.shippingService')}</strong></p>
                <p><strong>{t('invoice.paymentMethod')}</strong> {order.paymentMethod || 'COD'}</p>
                <p><strong>{t('invoice.orderRef')}</strong> {order.id}</p>
                <p><strong>{t('invoice.packaging')}</strong></p>
              </div>
            </div>

            {/* Line Items Table */}
            <table className="invoice-table">
              <thead>
                <tr>
                  <th style={{ width: '45%' }}>{t('invoice.colGarment')}</th>
                  <th className="align-center" style={{ width: '15%' }}>{t('invoice.colSizeColor')}</th>
                  <th className="align-center" style={{ width: '10%' }}>{t('invoice.colQty')}</th>
                  <th className="align-right" style={{ width: '15%' }}>{t('invoice.colUnitPrice')}</th>
                  <th className="align-right" style={{ width: '15%' }}>{t('invoice.colAmount')}</th>
                </tr>
              </thead>
              <tbody>
                {(order.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td>
                      <div className="invoice-item-name">{tp(item, 'name') || item.name}</div>
                      <div className="invoice-item-spec">SKU: LUNE-00{item.id}</div>
                    </td>
                    <td className="align-center">
                      {item.selectedSize || 'Std'}
                    </td>
                    <td className="align-center">{item.quantity}</td>
                    <td className="align-right">${Number(item.price).toFixed(2)}</td>
                    <td className="align-right">
                      <strong>${(Number(item.price) * Number(item.quantity)).toFixed(2)}</strong>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Financial Summary */}
            <div className="invoice-financial-wrap">
              <div className="invoice-financial-box">
                <div className="invoice-fin-row">
                  <span>{t('invoice.subtotal')}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="invoice-fin-row">
                  <span>{t('invoice.shippingHandling')}</span>
                  <span>{shippingFee === 0 ? t('invoice.complimentary') : `$${shippingFee.toFixed(2)}`}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="invoice-fin-row" style={{ color: '#2E7D32' }}>
                    <span>{t('invoice.privilegeDiscount')}</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="invoice-fin-row total-row">
                  <span>{t('invoice.totalAmountPaid')}</span>
                  <span>${Number(order.totalAmount).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Footer Notice */}
            <div className="invoice-footer-note">
              {t('invoice.footerNotice')}
              <div className="invoice-footer-signature">
                {t('invoice.footerSignature')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return typeof document !== 'undefined'
    ? createPortal(modalContent, document.body)
    : modalContent;
}
