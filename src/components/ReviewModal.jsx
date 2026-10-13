import React, { useState, useEffect } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import StarRating from './StarRating';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import './ReviewModal.css';

/**
 * ReviewModal Component
 * Allows authenticated or guest buyers to rate & write experiences
 * Automatically links to the specified product
 * Bilingual Support: Vietnamese 🇻🇳 & English 🇬🇧
 */
export default function ReviewModal({ product, isOpen, onClose, orderId = null, onSubmitted }) {
  const { currentUser, addReview } = useShop();
  const { t, tp, language } = useLanguage();

  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRating(5);
      setTitle('');
      setComment('');
      setError('');
      setIsSuccess(false);

      if (currentUser) {
        setName(currentUser.name || '');
        setEmail(currentUser.email || '');
      } else {
        setName('');
        setEmail('');
      }
    }
  }, [isOpen, currentUser]);

  if (!isOpen || !product) return null;

  const ratingLabels = {
    1: t('reviewModal.rating1'),
    2: t('reviewModal.rating2'),
    3: t('reviewModal.rating3'),
    4: t('reviewModal.rating4'),
    5: t('reviewModal.rating5')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!rating || rating < 1) {
      setError(t('reviewModal.errRating'));
      return;
    }

    if (!name.trim()) {
      setError(t('reviewModal.errName'));
      return;
    }

    if (!comment.trim() || comment.trim().length < 8) {
      setError(t('reviewModal.errComment'));
      return;
    }

    const dateLocale = language === 'vi' ? 'vi-VN' : 'en-US';
    const reviewData = {
      productId: Number(product.id),
      orderId: orderId || null,
      userName: name.trim(),
      userEmail: email.trim() || (currentUser?.email || ''),
      rating: Number(rating),
      title: title.trim() || `${ratingLabels[rating] || (language === 'vi' ? 'Khách hàng hài lòng' : 'Satisfied Customer')}`,
      comment: comment.trim(),
      date: new Date().toLocaleDateString(dateLocale, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      verifiedBuyer: Boolean(orderId || currentUser)
    };

    addReview(reviewData);
    setIsSuccess(true);

    if (onSubmitted) {
      onSubmitted(reviewData);
    }

    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="review-modal-backdrop" onClick={onClose}>
      <div className="review-modal-card" onClick={e => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="review-modal-header">
          <div>
            <div className="review-modal-eyebrow">{t('reviewModal.title')}</div>
            <h3 className="review-modal-title">{t('productDetail.writeReviewBtn')}</h3>
          </div>
          <button 
            type="button" 
            className="review-modal-close-btn" 
            onClick={onClose}
            title={t('common.close')}
          >
            <X size={20} />
          </button>
        </div>

        {isSuccess ? (
          <div style={{ padding: '48px 24px', textAlign: 'center' }}>
            <CheckCircle2 size={54} color="#775B3F" style={{ margin: '0 auto 16px' }} />
            <h4 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-h3)', color: '#2C2117', margin: '0 0 8px' }}>
              {t('reviewModal.successMsg')}
            </h4>
            <p style={{ color: '#5C4A3A', fontSize: '0.88rem', margin: 0 }}>
              {language === 'vi' 
                ? 'Đánh giá của Quý khách đã được xác thực và hiển thị trong danh mục sản phẩm.' 
                : "Your feedback has been verified and added to this garment's lookbook."}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="review-modal-body">
              {error && <div className="review-error-banner">{error}</div>}

              {/* Product mini header */}
              <div className="review-product-preview">
                <img 
                  src={product.image} 
                  alt={tp(product, 'name')} 
                  className="review-product-img" 
                />
                <div className="review-product-info">
                  <h5>{tp(product, 'name')}</h5>
                  <p>${Number(product.price).toFixed(2)}</p>
                </div>
              </div>

              {/* Interactive Star Picker */}
              <div className="review-rating-picker-box">
                <div className="review-rating-picker-label">{t('reviewModal.ratingLabel')}</div>
                <StarRating 
                  rating={rating}
                  interactive={true}
                  size={26}
                  onRatingChange={(val) => setRating(val)}
                />
                <div className="review-rating-status-text">
                  {ratingLabels[rating] || 'Select stars'}
                </div>
              </div>

              {/* Title */}
              <div className="review-form-group">
                <label className="review-form-label">{t('reviewModal.titleInputLabel')}</label>
                <input 
                  type="text"
                  className="review-form-input"
                  placeholder={t('reviewModal.titlePlaceholder')}
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                />
              </div>

              {/* Comment */}
              <div className="review-form-group">
                <label className="review-form-label">{t('reviewModal.commentInputLabel')} *</label>
                <textarea 
                  className="review-form-textarea"
                  placeholder={t('reviewModal.commentPlaceholder')}
                  value={comment}
                  onChange={e => setComment(e.target.value)}
                  required
                />
              </div>

              {/* Author Info */}
              <div className="review-form-grid">
                <div className="review-form-group">
                  <label className="review-form-label">{t('reviewModal.nameInputLabel')} *</label>
                  <input 
                    type="text"
                    className="review-form-input"
                    placeholder={t('reviewModal.namePlaceholder')}
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="review-form-group">
                  <label className="review-form-label">{t('reviewModal.emailInputLabel')}</label>
                  <input 
                    type="email"
                    className="review-form-input"
                    placeholder={t('reviewModal.emailPlaceholder')}
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="review-modal-footer">
              <button 
                type="button" 
                className="review-btn-cancel"
                onClick={onClose}
              >
                {t('common.cancel')}
              </button>
              <button 
                type="submit" 
                className="review-btn-submit"
              >
                {t('reviewModal.submitBtn')}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
