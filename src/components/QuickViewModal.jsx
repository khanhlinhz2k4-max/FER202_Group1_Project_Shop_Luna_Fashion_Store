import React, { useState } from 'react';
import { X, Heart, ShoppingBag, Eye } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Link } from 'react-router-dom';

/**
 * QuickViewModal Component
 * Phụ trách: Thành viên 3 (Trải nghiệm sản phẩm & Wishlist)
 */
export default function QuickViewModal({ product, isOpen, onClose }) {
  const { addToCart, toggleWishlist, isInWishlist } = useShop();
  const [selectedSize, setSelectedSize] = useState(() => (product?.sizes && product.sizes[0]) || "M");
  const [selectedColor, setSelectedColor] = useState(() => (product?.colors && product.colors[0]) || "");
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(4px)',
      padding: '20px'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#FAF8F5',
        maxWidth: '850px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        borderRadius: '2px',
        position: 'relative',
        display: 'flex',
        flexWrap: 'wrap',
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)'
      }} onClick={e => e.stopPropagation()}>
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '16px', right: '16px', background: 'none', border: 'none', cursor: 'pointer', zIndex: 10 }}
        >
          <X size={22} />
        </button>

        {/* Product Image */}
        <div style={{ flex: '1 1 360px', minHeight: '380px', backgroundColor: '#EDE8E1' }}>
          <img 
            src={product.image} 
            alt={product.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} 
          />
        </div>

        {/* Product Info */}
        <div style={{ flex: '1 1 380px', padding: '36px 30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#775B3F', fontWeight: 600 }}>
              {product.category}
            </span>
            <h2 style={{ margin: '8px 0', fontSize: '1.4rem', fontWeight: 500, fontFamily: 'serif' }}>{product.name}</h2>
            <p style={{ fontSize: '1.2rem', fontWeight: 600, color: '#1C1917', margin: '8px 0 16px' }}>${product.price}</p>
            <p style={{ fontSize: '0.88rem', color: '#57534E', lineHeight: 1.6, marginBottom: '20px' }}>
              {product.description || "Expertly crafted using sustainably sourced textiles with refined artisanal tailoring."}
            </p>

            {/* Sizes */}
            {product.sizes && product.sizes.length > 0 && (
              <div style={{ marginBottom: '20px' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>SELECT SIZE: {selectedSize}</div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      style={{
                        padding: '6px 14px',
                        border: selectedSize === size ? '2px solid #1C1917' : '1px solid #D6D3D1',
                        backgroundColor: selectedSize === size ? '#1C1917' : '#fff',
                        color: selectedSize === size ? '#fff' : '#1C1917',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600
                      }}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  padding: '12px',
                  backgroundColor: '#1C1917',
                  color: '#fff',
                  border: 'none',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <ShoppingBag size={18} /> ADD TO BAG
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                style={{
                  padding: '12px',
                  border: '1px solid #D6D3D1',
                  backgroundColor: '#fff',
                  cursor: 'pointer'
                }}
              >
                <Heart size={18} color={isFavorited ? "#E11D48" : "#1C1917"} fill={isFavorited ? "#E11D48" : "none"} />
              </button>
            </div>

            <Link 
              to={`/product/${product.id}`} 
              onClick={onClose}
              style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '12px',
                fontSize: '0.82rem',
                color: '#775B3F',
                textDecoration: 'underline'
              }}
            >
              View Full Product Details & Sizing Guide →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
