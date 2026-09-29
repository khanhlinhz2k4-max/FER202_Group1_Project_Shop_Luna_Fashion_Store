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

  const handleWishlistClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
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

          {/* Product Tag */}
          {product.tag && (
            <span className="product-tag">{product.tag}</span>
          )}

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
              backgroundColor: 'rgba(28, 25, 23, 0.9)',
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
                gap: '6px'
              }}
            >
              <ShoppingBag size={14} /> ADD TO BAG
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
