import React, { useEffect, useState } from 'react';
import { X, Heart, ShoppingBag, Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';

export default function QuickViewModal({
  product,
  isOpen,
  onClose
}) {
  const {
    addToCart,
    toggleWishlist,
    isInWishlist
  } = useShop();

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
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.55)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        zIndex: 9999
      }}
    >
      <div
        onClick={(event) =>
          event.stopPropagation()
        }
        style={{
          width: '100%',
          maxWidth: '850px',
          maxHeight: '90vh',
          overflowY: 'auto',
          backgroundColor: '#fff',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns:
            'minmax(0, 0.9fr) minmax(0, 1fr)'
        }}
      >

        {/* ================= CLOSE ================= */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Quick View"
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            zIndex: 5,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            border: 'none',
            backgroundColor:
              'rgba(255,255,255,0.95)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={18} />
        </button>


        {/* ================= PRODUCT IMAGE ================= */}
        <div
          style={{
            backgroundColor: '#EDE8E1',
            minHeight: '500px'
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              minHeight: '500px',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>


        {/* ================= PRODUCT INFO ================= */}
        <div
          style={{
            padding: '42px 36px',
            display: 'flex',
            flexDirection: 'column'
          }}
        >

          {/* Category */}
          <div
            style={{
              color: '#A16207',
              fontSize: '0.72rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '10px'
            }}
          >
            {product.category}
          </div>


          {/* Product Name */}
          <h2
            style={{
              fontFamily: 'serif',
              fontSize: '1.8rem',
              fontWeight: 500,
              lineHeight: 1.2,
              margin: '0 0 12px',
              color: '#1C1917'
            }}
          >
            {product.name}
          </h2>


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
                fontSize: '1.05rem'
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
                $
                {Number(
                  product.originalPrice
                ).toFixed(2)}
              </span>
            )}
          </div>


          {/* Description */}
          <p
            style={{
              color: '#57534E',
              fontSize: '0.88rem',
              lineHeight: 1.7,
              margin: '0 0 24px'
            }}
          >
            {product.description}
          </p>


          <div
            style={{
              height: '1px',
              backgroundColor: '#E7E5E4',
              marginBottom: '22px'
            }}
          />


          {/* ================= COLOR ================= */}
          {product.colors?.length > 0 && (
            <div style={{ marginBottom: '22px' }}>

              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  marginBottom: '11px'
                }}
              >
                COLOR
              </div>

              <div
                style={{
                  display: 'flex',
                  gap: '11px',
                  flexWrap: 'wrap'
                }}
              >
                {product.colors.map(
                  (color, index) => (
                    <button
                      key={`${color}-${index}`}
                      type="button"
                      onClick={() =>
                        setSelectedColor(color)
                      }
                      aria-label={`Color ${index + 1}`}
                      style={{
                        width: '30px',
                        height: '30px',
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
            <div style={{ marginBottom: '22px' }}>

              <div
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  marginBottom: '11px'
                }}
              >
                SIZE
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
                    onClick={() =>
                      setSelectedSize(size)
                    }
                    style={{
                      minWidth: '44px',
                      padding: '9px 12px',
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
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}


          {/* ================= STOCK STATUS ================= */}
          <div style={{ marginBottom: '18px' }}>
            {stock === 0 ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  backgroundColor: '#FEE2E2',
                  color: '#991B1B',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#DC2626' }} />
                OUT OF STOCK
              </div>
            ) : stock <= 5 ? (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  backgroundColor: '#FEF3C7',
                  color: '#92400E',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#D97706' }} />
                LOW STOCK: ONLY {stock} LEFT
              </div>
            ) : (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '5px 10px',
                  backgroundColor: '#ECFDF5',
                  color: '#065F46',
                  borderRadius: '4px',
                  fontSize: '0.75rem',
                  fontWeight: 600
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10B981' }} />
                IN STOCK ({stock} units available)
              </div>
            )}
          </div>

          {/* ================= QUANTITY ================= */}
          <div style={{ marginBottom: '24px' }}>

            <div
              style={{
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                marginBottom: '11px'
              }}
            >
              QUANTITY
            </div>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid #D6D3D1',
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
                  fontSize: '0.85rem'
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


          {/* ================= ACTIONS ================= */}
          <div
            style={{
              display: 'flex',
              gap: '8px',
              marginBottom: '18px'
            }}
          >

            <button
              type="button"
              onClick={handleAddToCart}
              disabled={stock === 0}
              style={{
                flex: 1,
                minHeight: '46px',
                border: 'none',
                backgroundColor: stock === 0 ? '#A8A29E' : '#775B3F',
                color: '#fff',
                cursor: stock === 0 ? 'not-allowed' : 'pointer',
                fontSize: '0.78rem',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '7px',
                transition: 'background-color 0.2s ease',
                opacity: stock === 0 ? 0.7 : 1
              }}
              onMouseEnter={(e) => {
                if (stock > 0) e.currentTarget.style.backgroundColor = '#5C4A3A';
              }}
              onMouseLeave={(e) => {
                if (stock > 0) e.currentTarget.style.backgroundColor = '#775B3F';
              }}
            >
              <ShoppingBag size={15} />
              {stock === 0 ? 'OUT OF STOCK' : 'ADD TO BAG'}
            </button>


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
                border:
                  '1px solid #D6D3D1',
                backgroundColor: '#fff',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
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
              padding: '8px'
            }}
          >
            VIEW FULL PRODUCT DETAILS
          </Link>

        </div>
      </div>
    </div>
  );
}