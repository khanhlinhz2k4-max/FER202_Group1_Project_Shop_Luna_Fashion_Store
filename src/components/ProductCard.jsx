import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Heart, Eye, ShoppingBag } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import QuickViewModal from './QuickViewModal';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [isHovered, setIsHovered] = useState(false);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const navigate = useNavigate();

  const isFavorited = isInWishlist(product.id);
  const stock = product.stock !== undefined ? product.stock : 20;
  const isOutOfStock = stock === 0;

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;
    addToCart(product, (product.sizes && product.sizes[0]) || "M", (product.colors && product.colors[0]) || "");
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  const handleQuickViewClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const imageSrc = isHovered && product.secondaryImage 
    ? product.secondaryImage 
    : product.image;

  return (
    <>
      <div 
        className="product-card"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="product-image-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
          <img 
            src={imageSrc} 
            alt={product.name} 
            className="product-img"
            loading="lazy"
          />

          {/* Product Tag or Sold Out Badge */}
          {isOutOfStock ? (
            <span
              style={{
                position: 'absolute',
                top: '12px',
                left: '12px',
                backgroundColor: '#DC2626',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                padding: '4px 8px',
                textTransform: 'uppercase',
                zIndex: 2,
                borderRadius: '2px'
              }}
            >
              SOLD OUT
            </span>
          ) : product.tag ? (
            <span className="product-tag">{product.tag}</span>
          ) : null}

          {/* Wishlist Button */}
          <button 
            type="button"
            className={`product-wishlist-btn ${isFavorited ? 'active' : ''}`}
            onClick={handleWishlistClick}
            aria-label={isFavorited ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart 
              size={16} 
              fill={isFavorited ? "#E11D48" : "none"} 
              stroke={isFavorited ? "#E11D48" : "#2C2117"} 
            />
          </button>

          {/* Quick Action Overlay on Hover */}
          <div 
            style={{
              position: 'absolute',
              bottom: isHovered ? 0 : '-50px',
              left: 0,
              right: 0,
              backgroundColor: 'rgba(119, 91, 63, 0.95)',
              display: 'flex',
              transition: 'bottom 0.25s ease',
              zIndex: 3
            }}
          >
            <button
              type="button"
              onClick={handleQuickViewClick}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: 'none',
                color: '#fff',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                borderRight: '1px solid rgba(255,255,255,0.2)'
              }}
            >
              <Eye size={14} /> QUICK VIEW
            </button>

            <button
              type="button"
              onClick={handleQuickAdd}
              disabled={isOutOfStock}
              style={{
                flex: 1,
                padding: '10px',
                border: 'none',
                background: isOutOfStock ? 'rgba(0,0,0,0.2)' : 'none',
                color: isOutOfStock ? 'rgba(255,255,255,0.6)' : '#fff',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.05em',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px'
              }}
            >
              <ShoppingBag size={14} /> {isOutOfStock ? 'SOLD OUT' : 'ADD TO BAG'}
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="product-info">
          <div className="product-category-meta">{product.category}</div>
          
          <h3 className="product-title">{product.name}</h3>

          <div className="product-pricing">
            <span className="current-price">${Number(product.price).toFixed(2)}</span>
            {product.originalPrice && (
              <span className="original-price">${Number(product.originalPrice).toFixed(2)}</span>
            )}
          </div>

          {/* Color Swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="product-colors" aria-label="Available colors">
              {product.colors.map((color, idx) => (
                <span 
                  key={idx} 
                  className="color-dot" 
                  style={{ backgroundColor: color }}
                  title={`Color option ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick View Modal */}
      <QuickViewModal 
        product={product} 
        isOpen={isQuickViewOpen} 
        onClose={() => setIsQuickViewOpen(false)} 
      />
    </>
  );
}
