import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

/**
 * WishlistPage Component
 * Phụ trách: Thành viên 3 (Trải nghiệm sản phẩm & Danh sách yêu thích)
 */
export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'serif', fontSize: '2.2rem', fontWeight: 500, margin: '0 0 8px' }}>SAVED STYLES</h1>
        <p style={{ color: '#78716C', fontSize: '0.9rem' }}>
          Your curated wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#fff', border: '1px solid #E7E5E4' }}>
          <Heart size={48} strokeWidth={1} style={{ margin: '0 auto 16px', color: '#D6D3D1' }} />
          <p style={{ color: '#78716C', marginBottom: '20px' }}>You haven't saved any items to your wishlist yet.</p>
          <Link 
            to="/shop" 
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 28px',
              backgroundColor: '#1C1917',
              color: '#fff',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600
            }}
          >
            EXPLORE THE COLLECTION <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '24px'
        }}>
          {wishlist.map(product => (
            <div 
              key={product.id}
              style={{
                backgroundColor: '#fff',
                border: '1px solid #E7E5E4',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <div style={{ position: 'relative', height: '320px', backgroundColor: '#EDE8E1' }}>
                <img 
                  src={product.image} 
                  alt={product.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '32px',
                    height: '32px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} color="#E11D48" />
                </button>
              </div>

              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 500 }}>{product.name}</h3>
                  <p style={{ margin: 0, fontWeight: 600, color: '#1C1917' }}>${product.price}</p>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                  <button
                    onClick={() => {
                      addToCart(product, (product.sizes && product.sizes[0]) || "M");
                      removeFromWishlist(product.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '10px',
                      backgroundColor: '#1C1917',
                      color: '#fff',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px'
                    }}
                  >
                    <ShoppingBag size={14} /> MOVE TO BAG
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      padding: '10px 12px',
                      border: '1px solid #D6D3D1',
                      color: '#1C1917',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
