import React, { useEffect, useState } from 'react';
import { X, Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import StarRating from './StarRating';
import { Badge } from './ui/badge';
import { Button } from './ui/button';

export default function QuickViewModal({
  product,
  isOpen,
  onClose
}) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist,
    getProductRatingStats
  } = useShop();

  const { t, tp } = useLanguage();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Reset lựa chọn mỗi khi mở Quick View cho sản phẩm
  useEffect(() => {
    if (!product || !isOpen) return;

    setSelectedSize(
      product.sizes?.length
        ? product.sizes[0]
        : 'M'
    );

    setSelectedColor(
      product.colors?.length
        ? product.colors[0]
        : ''
    );

    setQuantity(1);
  }, [product, isOpen]);

  // Lock body scroll and listen for Escape key
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !product) {
    return null;
  }

  const isFavorited = isInWishlist(product.id);
  const stock = product.stock !== undefined ? product.stock : 20;

  const decreaseQuantity = () => {
    setQuantity((current) =>
      Math.max(1, current - 1)
    );
  };

  const increaseQuantity = () => {
    if (stock > 0) {
      setQuantity((current) =>
        Math.min(stock, current + 1)
      );
    }
  };

  const handleAddToCart = () => {
    if (stock <= 0) return;
    addToCart(
      product,
      selectedSize || product.sizes?.[0] || 'M',
      selectedColor || product.colors?.[0] || '',
      quantity
    );

    onClose();
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <div
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={tp(product, 'name') || product.name}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(28, 25, 23, 0.65)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 99999
      }}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1fr)',
          borderRadius: '4px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.35)',
          border: '1px solid #E7DDCE'
        }}
      >
        {/* ================= CLOSE BUTTON ================= */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: '1px solid #E7DDCE',
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
          }}
        >
          <X size={18} color="#2C2117" />
        </button>

        {/* ================= PRODUCT IMAGE ================= */}
        <div
          style={{
            backgroundColor: '#EDE8E1',
            minHeight: '480px'
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '480px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* ================= PRODUCT INFO ================= */}
        <div
          style={{
            padding: '40px 36px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {/* Category */}
          <div
            style={{
              color: '#A16207',
              fontSize: 'var(--text-badge)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >
            {tp(product, 'garmentType') || product.category}
          </div>

          {/* Product Name */}
          <h2
            style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'var(--text-h2)',
              fontWeight: 500,
              lineHeight: 1.2,
              margin: '0 0 10px',
              color: '#1C1917'
            }}
          >
            {tp(product, 'name')}
          </h2>

          {/* Rating */}
          <div style={{ marginBottom: '14px' }}>
            <StarRating 
              rating={getProductRatingStats && product?.id ? getProductRatingStats(product.id).averageRating : 5.0}
              count={getProductRatingStats && product?.id ? getProductRatingStats(product.id).totalReviews : 0}
              size={13}
              showScore={true}
            />
          </div>

          {/* Price */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginBottom: '18px'
            }}
          >
            <span
              style={{
                fontWeight: 600,
                fontSize: '1.05rem',
                color: '#2C2117'
              }}
            >
              ${Number(product.price).toFixed(2)}
            </span>

            {product.originalPrice && (
              <span
                style={{
                  color: '#A8A29E',
                  textDecoration: 'line-through',
                  fontSize: '0.9rem'
                }}
              >
                ${Number(product.originalPrice).toFixed(2)}
              </span>
            )}
          </div>

          {/* Description */}
          <p
            style={{
              color: '#57534E',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              margin: '0 0 20px'
            }}
          >
            {tp(product, 'description')}
          </p>

          <div
            style={{
              height: '1px',
              backgroundColor: '#E7E5E4',
              marginBottom: '20px'
            }}
          />

          {/* ================= COLOR ================= */}
          {product.colors?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                  color: '#2C2117'
                }}
              >
                {t('productDetail.colorLabel', 'COLOR')}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '10px',
                  flexWrap: 'wrap'
                }}
              >
                {product.colors.map(
                  (color, index) => (
                    <button
                      key={`${color}-${index}`}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      aria-label={`Color ${index + 1}`}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: color,
                        border:
                          selectedColor === color
                            ? '2px solid #775B3F'
                            : '1px solid #D6D3D1',
                        boxShadow:
                          selectedColor === color
                            ? '0 0 0 2px white, 0 0 0 3px #775B3F'
                            : 'none',
                        cursor: 'pointer'
                      }}
                    />
                  )
                )}
              </div>
            </div>
          )}

          {/* ================= SIZE ================= */}
          {product.sizes?.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  marginBottom: '10px',
                  color: '#2C2117'
                }}
              >
                {t('productDetail.sizeLabel', 'SIZE')}
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '7px',
                  flexWrap: 'wrap'
                }}
              >
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    style={{
                      minWidth: '42px',
                      padding: '8px 12px',
                      backgroundColor:
                        selectedSize === size
                          ? '#775B3F'
                          : '#fff',
                      color:
                        selectedSize === size
                          ? '#fff'
                          : '#2C2117',
                      border:
                        selectedSize === size
                          ? '1px solid #775B3F'
                          : '1px solid #D6D3D1',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      borderRadius: '2px',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* ================= STOCK STATUS (shadcn/ui Badge) ================= */}
          <div style={{ marginBottom: '18px' }}>
            {stock === 0 ? (
              <Badge variant="destructive" style={{ borderRadius: '2px', fontWeight: 600, fontSize: '0.72rem', padding: '4px 8px' }}>
                {t('productDetail.outOfStock', 'Hết hàng')}
              </Badge>
            ) : stock <= 5 ? (
              <Badge variant="outline" style={{ borderColor: '#D97706', color: '#92400E', backgroundColor: '#FEF3C7', borderRadius: '2px', fontWeight: 600, fontSize: '0.72rem', padding: '4px 8px' }}>
                {t('productDetail.lowStock', 'Còn ít')} {stock} {t('productDetail.unitsLeft', 'chiếc')}
              </Badge>
            ) : (
              <Badge variant="secondary" style={{ backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0', borderRadius: '2px', fontWeight: 600, fontSize: '0.72rem', padding: '4px 8px' }}>
                {t('productDetail.stockAvailable', 'Sẵn hàng')} ({stock})
              </Badge>
            )}
          </div>

          {/* ================= QUANTITY ================= */}
          <div style={{ marginBottom: '22px' }}>
            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                marginBottom: '10px',
                color: '#2C2117'
              }}
            >
              {t('productDetail.quantityLabel', 'QUANTITY')}
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #D6D3D1',
                borderRadius: '2px',
                opacity: stock === 0 ? 0.5 : 1
              }}
            >
              <button
                type="button"
                onClick={decreaseQuantity}
                disabled={quantity <= 1 || stock === 0}
                aria-label="Decrease quantity"
                style={{
                  width: '36px',
                  height: '36px',
                  border: 'none',
                  backgroundColor: '#fff',
                  cursor:
                    quantity <= 1 || stock === 0
                      ? 'not-allowed'
                      : 'pointer',
                  opacity:
                    quantity <= 1 || stock === 0 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Minus size={14} />
              </button>

              <span
                style={{
                  width: '38px',
                  textAlign: 'center',
                  fontSize: '0.85rem',
                  fontWeight: 600
                }}
              >
                {stock === 0 ? 0 : quantity}
              </span>

              <button
                type="button"
                onClick={increaseQuantity}
                disabled={quantity >= stock || stock === 0}
                aria-label="Increase quantity"
                style={{
                  width: '36px',
                  height: '36px',
                  border: 'none',
                  backgroundColor: '#fff',
                  cursor:
                    quantity >= stock || stock === 0
                      ? 'not-allowed'
                      : 'pointer',
                  opacity:
                    quantity >= stock || stock === 0 ? 0.4 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* ================= ACTIONS (shadcn/ui Button) ================= */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '18px'
            }}
          >
            <Button
              type="button"
              onClick={handleAddToCart}
              disabled={stock === 0}
              variant="default"
              style={{
                flex: 1,
                minHeight: '46px',
                backgroundColor: stock === 0 ? '#A8A29E' : '#775B3F',
                color: '#fff',
                cursor: stock === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                borderRadius: '2px',
                letterSpacing: '0.04em'
              }}
            >
              <ShoppingBag size={15} />
              {stock === 0 ? t('common.soldOut') : t('common.addToBag')}
            </Button>

            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                isFavorited
                  ? 'Remove from wishlist'
                  : 'Add to wishlist'
              }
              style={{
                width: '46px',
                minHeight: '46px',
                border: '1px solid #D6D3D1',
                backgroundColor: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '2px'
              }}
            >
              <Heart
                size={18}
                fill={
                  isFavorited
                    ? '#E11D48'
                    : 'none'
                }
                stroke={
                  isFavorited
                    ? '#E11D48'
                    : '#1C1917'
                }
              />
            </button>
          </div>

          {/* ================= VIEW DETAILS ================= */}
          <Link
            to={`/product/${product.id}`}
            onClick={onClose}
            style={{
              textAlign: 'center',
              color: '#1C1917',
              fontSize: '0.78rem',
              fontWeight: 500,
              textDecoration: 'underline',
              padding: '6px'
            }}
          >
            {t('common.viewDetails')}
          </Link>
        </div>
      </div>
    </div>
  );
}