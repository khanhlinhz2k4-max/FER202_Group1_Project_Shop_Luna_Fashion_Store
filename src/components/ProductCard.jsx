import React, { useState, useEffect } from 'react';
import { Heart, Sparkles } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Sync initial wishlist state from localStorage
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('lune_wishlist') || '[]');
      setIsWishlisted(stored.includes(product.id));
    } catch (e) {
      setIsWishlisted(false);
    }
  }, [product.id]);

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      let stored = JSON.parse(localStorage.getItem('lune_wishlist') || '[]');
      let nextState = false;
      if (stored.includes(product.id)) {
        stored = stored.filter(id => id !== product.id);
        nextState = false;
      } else {
        stored.push(product.id);
        nextState = true;
      }
      localStorage.setItem('lune_wishlist', JSON.stringify(stored));
      setIsWishlisted(nextState);
      // Dispatch custom event to notify Navbar immediately
      window.dispatchEvent(new Event('lune_wishlist_updated'));
    } catch (err) {
      console.error(err);
    }
  };

  const imageSrc = isHovered && product.secondaryImage 
    ? product.secondaryImage 
    : product.image;

  return (
    <div 
      className="product-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="product-image-wrapper">
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
          className={`product-wishlist-btn ${isWishlisted ? 'active' : ''}`}
          onClick={toggleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            size={16} 
            fill={isWishlisted ? "#775B3F" : "none"} 
            stroke={isWishlisted ? "#775B3F" : "#2C2117"} 
          />
        </button>

        {/* Luxury Badge Hover Overlay */}
        <div className="product-quick-action">
          <div className="product-view-btn">
            <Sparkles size={13} />
            <span>LUNE Atelier · Ready To Wear</span>
          </div>
        </div>
      </div>

      {/* Product Details */}
      <div className="product-info">
        <div className="product-category-meta">{product.category}</div>
        
        <h3 className="product-title">{product.name}</h3>

        <div className="product-pricing">
          <span className="current-price">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="original-price">${product.originalPrice.toFixed(2)}</span>
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
  );
}
