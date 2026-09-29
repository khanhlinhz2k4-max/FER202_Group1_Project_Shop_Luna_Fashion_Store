import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, ShieldCheck, RefreshCw, Truck, ChevronRight } from 'lucide-react';
import SizeGuideModal from '../components/SizeGuideModal';

/**
 * ProductDetailPage Component
 * Phụ trách: Thành viên 3 (Trải nghiệm sản phẩm & Danh sách yêu thích)
 */
export default function ProductDetailPage() {
  const { id } = useParams();
  const { products, addToCart, toggleWishlist, isInWishlist } = useShop();

  const product = useMemo(() => {
    return products.find(p => String(p.id) === String(id));
  }, [products, id]);

  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  if (!product) {
    return (
      <div style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2>Product not found</h2>
        <Link to="/shop" style={{ color: '#775B3F', textDecoration: 'underline' }}>Back to Collection</Link>
      </div>
    );
  }

  const allImages = [product.image, product.secondaryImage, ...(product.images || [])].filter(Boolean);
  const isFavorited = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor || (product.colors && product.colors[0]), quantity);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      {/* Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.82rem', color: '#78716C', marginBottom: '32px' }}>
        <Link to="/" style={{ color: '#78716C' }}>Home</Link>
        <ChevronRight size={14} />
        <Link to="/shop" style={{ color: '#78716C' }}>Collection</Link>
        <ChevronRight size={14} />
        <span style={{ color: '#1C1917', fontWeight: 500 }}>{product.name}</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: '48px' }}>
        {/* Left: Gallery */}
        <div>
          <div style={{ backgroundColor: '#EDE8E1', minHeight: '480px', marginBottom: '16px', overflow: 'hidden' }}>
            <img 
              src={allImages[activeImageIndex] || product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          {allImages.length > 1 && (
            <div style={{ display: 'flex', gap: '12px' }}>
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  style={{
                    width: '80px',
                    height: '100px',
                    border: activeImageIndex === idx ? '2px solid #1C1917' : '1px solid #D6D3D1',
                    padding: 0,
                    cursor: 'pointer',
                    overflow: 'hidden'
                  }}
                >
                  <img src={img} alt="thumb" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Info */}
        <div>
          <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#775B3F', fontWeight: 600 }}>
            {product.category}
          </span>
          <h1 style={{ fontSize: '2rem', fontWeight: 500, fontFamily: 'serif', margin: '8px 0 16px' }}>{product.name}</h1>
          <p style={{ fontSize: '1.4rem', fontWeight: 600, color: '#1C1917', marginBottom: '24px' }}>${product.price}</p>
          <p style={{ color: '#57534E', lineHeight: 1.7, marginBottom: '32px' }}>
            {product.description || "Cut from natural fibers with meticulous attention to tailoring. Designed for timeless elegance and lasting quality."}
          </p>

          {/* Size Selection */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem' }}>
              <span style={{ fontWeight: 600 }}>SIZE: {selectedSize}</span>
              <button 
                onClick={() => setIsSizeGuideOpen(true)}
                style={{ background: 'none', border: 'none', color: '#775B3F', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.82rem' }}
              >
                Size Guide
              </button>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              {(product.sizes || ["XS", "S", "M", "L"]).map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    padding: '10px 18px',
                    border: selectedSize === size ? '2px solid #1C1917' : '1px solid #D6D3D1',
                    backgroundColor: selectedSize === size ? '#1C1917' : '#fff',
                    color: selectedSize === size ? '#fff' : '#1C1917',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & CTA */}
          <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D6D3D1', padding: '0 12px' }}>
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>-</button>
              <span style={{ padding: '0 12px', fontWeight: 600 }}>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>+</button>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                flex: 1,
                padding: '14px',
                backgroundColor: '#1C1917',
                color: '#fff',
                border: 'none',
                fontWeight: 600,
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
                padding: '14px',
                border: '1px solid #D6D3D1',
                backgroundColor: '#fff',
                cursor: 'pointer'
              }}
            >
              <Heart size={20} color={isFavorited ? "#E11D48" : "#1C1917"} fill={isFavorited ? "#E11D48" : "none"} />
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ borderTop: '1px solid #E7E5E4', paddingTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '0.85rem', color: '#57534E' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Truck size={18} color="#775B3F" /> Free express delivery on orders over $250
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <RefreshCw size={18} color="#775B3F" /> 30-day effortless returns & exchanges
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <ShieldCheck size={18} color="#775B3F" /> 100% Authentic artisanal craftsmanship
            </div>
          </div>
        </div>
      </div>

      <SizeGuideModal isOpen={isSizeGuideOpen} onClose={() => setIsSizeGuideOpen(false)} />
    </div>
  );
}
