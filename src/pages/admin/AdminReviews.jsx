import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Star,
  MessageSquare,
  CheckCircle2,
  Search,
  Eye,
  EyeOff,
  Trash2,
  ExternalLink,
  X,
  Sparkles,
  Award,
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomSelect from '../../components/CustomSelect';

const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300';

export default function AdminReviews() {
  const {
    reviews,
    products,
    replyToReview,
    toggleReviewVisibility,
    deleteReview,
  } = useShop();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [starFilter, setStarFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [toast, setToast] = useState('');

  // Modal state for viewing details & writing official Atelier reply
  const [selectedReview, setSelectedReview] = useState(null);
  const [replyText, setReplyText] = useState('');

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  // Product lookup map
  const productMap = useMemo(() => {
    const map = new Map();
    products.forEach((p) => map.set(Number(p.id), p));
    return map;
  }, [products]);

  // KPI Metrics
  const totalCount = reviews.length;
  const averageRating = useMemo(() => {
    if (reviews.length === 0) return '5.0';
    const sum = reviews.reduce((acc, r) => acc + (Number(r.rating) || 5), 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);
  const fiveStarCount = useMemo(
    () => reviews.filter((r) => Math.round(Number(r.rating) || 5) === 5).length,
    [reviews]
  );
  const repliedCount = useMemo(
    () => reviews.filter((r) => r.adminReply && r.adminReply.trim()).length,
    [reviews]
  );

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      const prod = productMap.get(Number(r.productId));
      const prodName = prod?.name || '';
      const q = searchTerm.trim().toLowerCase();

      if (q) {
        const matchProd = prodName.toLowerCase().includes(q);
        const matchUser =
          (r.userName || '').toLowerCase().includes(q) ||
          (r.userEmail || '').toLowerCase().includes(q);
        const matchContent =
          (r.title || '').toLowerCase().includes(q) ||
          (r.comment || '').toLowerCase().includes(q) ||
          (r.adminReply || '').toLowerCase().includes(q);
        if (!matchProd && !matchUser && !matchContent) return false;
      }

      if (starFilter !== 'all' && Math.round(Number(r.rating) || 5) !== Number(starFilter)) {
        return false;
      }

      const isVisible = r.isHidden !== true;
      if (statusFilter === 'visible' && !isVisible) return false;
      if (statusFilter === 'hidden' && isVisible) return false;

      return true;
    });
  }, [reviews, productMap, searchTerm, starFilter, statusFilter]);

  const handleOpenReplyModal = (review) => {
    setSelectedReview(review);
    setReplyText(review.adminReply || '');
  };

  const handleSaveReply = (e) => {
    e.preventDefault();
    if (!selectedReview) return;

    replyToReview(selectedReview.id, replyText);
    setSelectedReview(null);
    showToast(
      t('admin.reviews.toastUpdated', 'Official Atelier response saved successfully!')
    );
  };

  const handleToggleHide = (review) => {
    const currentlyHidden = review.isHidden === true;
    toggleReviewVisibility(review.id);
    showToast(
      currentlyHidden
        ? t('admin.reviews.toastShown', 'Review restored to storefront!')
        : t('admin.reviews.toastHidden', 'Review hidden from storefront!')
    );
  };

  const handleDelete = (review) => {
    if (
      window.confirm(
        t(
          'admin.reviews.confirmDelete',
          'Are you sure you want to permanently delete this review?'
        )
      )
    ) {
      deleteReview(review.id);
      showToast(t('admin.reviews.toastDeleted', 'Review deleted successfully!'));
    }
  };

  const renderStars = (rating) => {
    const count = Math.min(5, Math.max(1, Math.round(Number(rating) || 5)));
    return (
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '2px' }}>
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            size={13}
            fill={i <= count ? '#C8AE84' : 'none'}
            color={i <= count ? '#C8AE84' : '#D6CBC0'}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Page Header (No Create Button - Only Customers Can Submit Reviews) */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">
            {t('admin.reviews.title', 'REVIEWS & RATINGS MANAGEMENT')}
          </h1>
          <p className="admin-subtitle">
            {t(
              'admin.reviews.subtitle',
              'Moderate client testimonials, monitor product ratings, and publish official LUNE Atelier responses.'
            )}
          </p>
        </div>
      </div>

      {/* 4 KPI Cards - Standardized Horizontal Flex */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px',
        }}
      >
        <div
          className="admin-card"
          style={{
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '4px',
              backgroundColor: '#FAF7F2',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E7DDCE',
              flexShrink: 0,
            }}
          >
            <MessageSquare size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#5C4A3A',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {t('admin.reviews.totalReviews', 'TOTAL REVIEWS')}
            </span>
            <h3
              className="notranslate"
              translate="no"
              style={{
                margin: '2px 0 0',
                fontSize: '1.6rem',
                fontFamily: 'var(--font-sans)',
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontWeight: 700,
                color: '#2C2117',
                lineHeight: '1.2',
              }}
            >
              {totalCount}
            </h3>
          </div>
        </div>

        <div
          className="admin-card"
          style={{
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '4px',
              backgroundColor: '#F9F2E7',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #C8AE84',
              flexShrink: 0,
            }}
          >
            <Star size={20} color="#775B3F" fill="#C8AE84" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#5C4A3A',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {t('admin.reviews.avgRating', 'AVERAGE RATING')}
            </span>
            <h3
              className="notranslate"
              translate="no"
              style={{
                margin: '2px 0 0',
                fontSize: '1.6rem',
                fontFamily: 'var(--font-sans)',
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontWeight: 700,
                color: '#2C2117',
                lineHeight: '1.2',
              }}
            >
              {averageRating} ★
            </h3>
          </div>
        </div>

        <div
          className="admin-card"
          style={{
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '4px',
              backgroundColor: '#F5EFEB',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E7DDCE',
              flexShrink: 0,
            }}
          >
            <Award size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#5C4A3A',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {t('admin.reviews.fiveStarReviews', '5-STAR REVIEWS')}
            </span>
            <h3
              className="notranslate"
              translate="no"
              style={{
                margin: '2px 0 0',
                fontSize: '1.6rem',
                fontFamily: 'var(--font-sans)',
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontWeight: 700,
                color: '#2C2117',
                lineHeight: '1.2',
              }}
            >
              {fiveStarCount}
            </h3>
          </div>
        </div>

        <div
          className="admin-card"
          style={{
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            minWidth: 0,
          }}
        >
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '4px',
              backgroundColor: '#FAF8F5',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid #E7DDCE',
              flexShrink: 0,
            }}
          >
            <Sparkles size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span
              style={{
                fontSize: '0.72rem',
                color: '#5C4A3A',
                fontWeight: 600,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                display: 'block',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
              }}
            >
              {t('admin.reviews.repliedReviews', 'ATELIER REPLIED')}
            </span>
            <h3
              className="notranslate"
              translate="no"
              style={{
                margin: '2px 0 0',
                fontSize: '1.6rem',
                fontFamily: 'var(--font-sans)',
                fontVariantNumeric: 'lining-nums tabular-nums',
                fontWeight: 700,
                color: '#2C2117',
                lineHeight: '1.2',
              }}
            >
              {repliedCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="admin-card admin-toolbar">
        <div className="admin-search">
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder={t(
              'admin.reviews.searchPlaceholder',
              'Search by product name, client, or review content...'
            )}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <CustomSelect
          className="admin-select"
          value={starFilter}
          onChange={(e) => setStarFilter(e.target.value)}
        >
          <option value="all">{t('admin.reviews.filterAllStars', 'All Ratings')}</option>
          <option value="5">5 ★</option>
          <option value="4">4 ★</option>
          <option value="3">3 ★</option>
          <option value="2">2 ★</option>
          <option value="1">1 ★</option>
        </CustomSelect>

        <CustomSelect
          className="admin-select"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">{t('admin.reviews.filterAllStatus', 'All Statuses')}</option>
          <option value="visible">{t('admin.reviews.filterVisible', 'Visible Only')}</option>
          <option value="hidden">{t('admin.reviews.filterHidden', 'Hidden Only')}</option>
        </CustomSelect>

        <span className="admin-count">
          {filteredReviews.length} {t('admin.reviews.countUnit', 'reviews')}
        </span>
      </div>

      {/* Reviews Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>{t('admin.reviews.colProduct', 'Product')}</th>
                <th style={{ width: '17%' }}>{t('admin.reviews.colClient', 'Client')}</th>
                <th className="text-center" style={{ width: '12%' }}>
                  {t('admin.reviews.colRating', 'Rating')}
                </th>
                <th style={{ width: '25%' }}>
                  {t('admin.reviews.colReview', 'Review & Response')}
                </th>
                <th className="text-center" style={{ width: '11%' }}>
                  {t('admin.reviews.colStatus', 'Status')}
                </th>
                <th className="text-center" style={{ width: '13%' }}>
                  {t('admin.reviews.colActions', 'Actions')}
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.length === 0 ? (
                <tr>
                  <td colSpan="6" className="admin-empty">
                    {t('admin.reviews.empty', 'No reviews match your search and filter criteria.')}
                  </td>
                </tr>
              ) : (
                filteredReviews.map((review) => {
                  const prod = productMap.get(Number(review.productId));
                  const isVisible = review.isHidden !== true;

                  return (
                    <tr
                      key={review.id}
                      style={{
                        opacity: isVisible ? 1 : 0.68,
                        backgroundColor: isVisible ? 'transparent' : '#FAF8F5',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      {/* Product Cell */}
                      <td>
                        <div className="admin-product-cell" style={{ minWidth: 0 }}>
                          <img
                            src={prod?.image || FALLBACK_IMAGE}
                            alt={prod?.name || 'Product'}
                            className="admin-thumb"
                            style={{ flexShrink: 0 }}
                          />
                          <div style={{ minWidth: 0, maxWidth: '175px', overflow: 'hidden' }}>
                            <strong
                              style={{
                                display: 'block',
                                color: '#2C2117',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                              title={prod?.name}
                            >
                              {prod?.name || `Product #${review.productId}`}
                            </strong>
                            <span style={{ fontSize: '0.75rem', color: '#8F7965' }}>
                              ID: #{review.productId}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Client Cell */}
                      <td>
                        <div style={{ maxWidth: '160px', overflow: 'hidden' }}>
                          <strong
                            style={{
                              display: 'block',
                              color: '#2C2117',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            title={review.userName}
                          >
                            {review.userName || 'Valued Client'}
                          </strong>
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '6px',
                              marginTop: '3px',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {review.verifiedBuyer !== false && (
                              <span
                                style={{
                                  fontSize: '0.68rem',
                                  backgroundColor: '#F5EFEB',
                                  color: '#775B3F',
                                  padding: '1px 6px',
                                  borderRadius: '3px',
                                  fontWeight: 600,
                                  border: '1px solid #E7DDCE',
                                }}
                              >
                                ✓ {t('admin.reviews.verifiedClient', 'Verified')}
                              </span>
                            )}
                            <span style={{ fontSize: '0.74rem', color: '#8F7965' }}>
                              {review.date}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* Rating Cell */}
                      <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        <div
                          style={{
                            display: 'inline-flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '3px',
                          }}
                        >
                          {renderStars(review.rating)}
                          <span
                            style={{
                              fontSize: '0.76rem',
                              fontWeight: 700,
                              color: '#2C2117',
                            }}
                          >
                            {Number(review.rating || 5).toFixed(1)} / 5.0
                          </span>
                        </div>
                      </td>

                      {/* Review Content & Reply Cell */}
                      <td>
                        <div style={{ maxWidth: '230px' }}>
                          <strong
                            style={{
                              display: 'block',
                              color: '#2C2117',
                              fontSize: '0.84rem',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                            title={review.title}
                          >
                            {review.title}
                          </strong>
                          <div
                            style={{
                              fontSize: '0.78rem',
                              color: '#5C4A3A',
                              whiteSpace: 'nowrap',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              marginTop: '2px',
                            }}
                            title={review.comment}
                          >
                            {review.comment}
                          </div>
                          {review.adminReply && (
                            <span
                              style={{
                                display: 'inline-block',
                                marginTop: '4px',
                                fontSize: '0.7rem',
                                fontWeight: 600,
                                color: '#775B3F',
                                backgroundColor: '#F9F2E7',
                                border: '1px solid #C8AE84',
                                padding: '1px 7px',
                                borderRadius: '3px',
                                whiteSpace: 'nowrap',
                              }}
                              title={review.adminReply}
                            >
                              ↪ {t('admin.reviews.repliedBadge', 'Atelier Replied')}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Status Cell */}
                      <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        <span
                          style={{
                            padding: '3px 9px',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            backgroundColor: isVisible ? '#F5EFEB' : '#FAF8F5',
                            color: isVisible ? '#2C2117' : '#8F7965',
                            border: '1px solid #E7DDCE',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: isVisible ? '#775B3F' : '#8F7965',
                            }}
                          />
                          {isVisible
                            ? t('admin.reviews.statusVisible', 'Visible')
                            : t('admin.reviews.statusHidden', 'Hidden')}
                        </span>
                      </td>

                      {/* Actions Cell */}
                      <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        <div className="admin-actions">
                          <Link
                            to={`/product/${review.productId}`}
                            target="_blank"
                            title={t('admin.products.viewOnStore', 'View on store')}
                            className="admin-icon-btn"
                          >
                            <ExternalLink size={15} />
                          </Link>
                          <button
                            type="button"
                            title={
                              isVisible
                                ? t(
                                    'admin.reviews.tooltipHide',
                                    'Visible on storefront (Click to hide)'
                                  )
                                : t(
                                    'admin.reviews.tooltipShow',
                                    'Hidden from storefront (Click to show)'
                                  )
                            }
                            className="admin-icon-btn"
                            onClick={() => handleToggleHide(review)}
                            style={{
                              color: isVisible ? '#775B3F' : '#8F7965',
                              borderColor: isVisible ? '#C8AE84' : '#E7DDCE',
                              backgroundColor: isVisible ? '#FAF7F2' : '#F5EFEB',
                            }}
                          >
                            {isVisible ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <button
                            type="button"
                            title={t(
                              'admin.reviews.tooltipReplyEdit',
                              'View Review Details & Official Reply'
                            )}
                            className="admin-icon-btn edit"
                            onClick={() => handleOpenReplyModal(review)}
                          >
                            <MessageSquare size={15} />
                          </button>
                          <button
                            type="button"
                            title={t('admin.reviews.btnDelete', 'Delete review')}
                            className="admin-icon-btn danger"
                            onClick={() => handleDelete(review)}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: READ-ONLY CLIENT REVIEW & ATELIER REPLY ================= */}
      {selectedReview && (
        <div className="admin-modal-overlay" onClick={() => setSelectedReview(null)}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '580px' }}
          >
            <div className="admin-modal-header">
              <h3>
                {t('admin.reviews.modalEditTitle', 'REVIEW DETAILS & ATELIER RESPONSE')}
              </h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={() => setSelectedReview(null)}
              >
                <X size={20} />
              </button>
            </div>

            {/* Read-Only Client Review Card (Customer content cannot be altered by Admin) */}
            <div
              style={{
                padding: '16px 18px',
                backgroundColor: '#FAF7F2',
                border: '1px solid #E7DDCE',
                borderRadius: '6px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: '12px',
                  flexWrap: 'wrap',
                  paddingBottom: '12px',
                  borderBottom: '1px solid #E7DDCE',
                  marginBottom: '12px',
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, color: '#2C2117', fontSize: '0.92rem' }}>
                    {productMap.get(Number(selectedReview.productId))?.name ||
                      `Product #${selectedReview.productId}`}
                  </div>
                  <div style={{ color: '#5C4A3A', fontSize: '0.8rem', marginTop: '3px' }}>
                    <strong>{selectedReview.userName}</strong> (
                    {selectedReview.userEmail || 'client@lune.com'}) • {selectedReview.date}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {renderStars(selectedReview.rating)}
                  <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#2C2117' }}>
                    {Number(selectedReview.rating || 5).toFixed(1)}
                  </span>
                </div>
              </div>

              <div
                style={{
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: '#2C2117',
                  marginBottom: '6px',
                }}
              >
                {selectedReview.title}
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.86rem',
                  color: '#5C4A3A',
                  lineHeight: 1.6,
                }}
              >
                {selectedReview.comment}
              </p>
            </div>

            <form onSubmit={handleSaveReply}>
              <div className="admin-field">
                <label style={{ color: '#775B3F' }}>
                  {t('admin.reviews.labelAtelierReply', 'Official LUNE Atelier Response')}
                </label>
                <textarea
                  rows="4"
                  className="admin-input"
                  placeholder={t(
                    'admin.reviews.replyPlaceholder',
                    'Write an official response from LUNE Atelier (displayed publicly beneath this review)...'
                  )}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                />
              </div>

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setSelectedReview(null)}
                >
                  {t('admin.reviews.btnCancel', 'Cancel')}
                </button>
                <button type="submit" className="admin-primary-btn">
                  {t('admin.reviews.btnSave', 'Save & Publish Response')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
