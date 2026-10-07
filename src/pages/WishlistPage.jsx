import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

/**
 * WishlistPage Component
 * Phụ trách: Thành viên 3 (Trải nghiệm sản phẩm & Danh sách yêu thích)
 * Harmonized with LUNE Warm Luxury Brand Guidelines
 */
export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart } = useShop();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.4rem', fontWeight: 500, margin: '0 0 8px', color: '#2C2117', letterSpacing: '0.04em' }}>
          SAVED STYLES
        </h1>
        <p style={{ color: '#5C4A3A', fontSize: '0.92rem', letterSpacing: '0.02em' }}>
          Your curated wishlist ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})
        </p>
      </div>

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E7DDCE', borderRadius: '4px' }}>
          <Heart size={48} strokeWidth={1} style={{ margin: '0 auto 16px', color: '#C8AE84' }} />
          <p style={{ color: '#5C4A3A', marginBottom: '24px', fontSize: '0.95rem' }}>You haven't saved any items to your wishlist yet.</p>
          <Link
            to="/shop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '12px 32px',
              backgroundColor: '#775B3F',
              color: '#FFFFFF',
              textDecoration: 'none',
              fontSize: '0.85rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              borderRadius: '2px',
              transition: 'background-color 0.2s ease'
            }}
          >
            EXPLORE THE COLLECTION <ArrowRight size={16} />
          </Link>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '28px'
        }}>
          {wishlist.map(product => (
            <div
              key={product.id}
              style={{
                backgroundColor: '#FFFFFF',
                border: '1px solid #E7DDCE',
                borderRadius: '4px',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(44, 33, 23, 0.03)'
              }}
            >
              <div style={{ position: 'relative', height: '340px', backgroundColor: '#F5EFEB' }}>
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
                    backgroundColor: 'rgba(250, 247, 242, 0.92)',
                    border: '1px solid #E7DDCE',
                    borderRadius: '50%',
                    width: '34px',
                    height: '34px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                  title="Remove from Wishlist"
                >
                  <Trash2 size={16} color="#B91C1C" />
                </button>
              </div>

              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 500, color: '#2C2117' }}>{product.name}</h3>
                  <p style={{ margin: 0, fontWeight: 600, color: '#775B3F' }}>${product.price}</p>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '18px' }}>
                  <button
                    onClick={() => {
                      addToCart(
                        product,
                        product.sizes?.[0] || "M",
                        product.colors?.[0] || "",
                        1
                      );
                      removeFromWishlist(product.id);
                    }}
                    style={{
                      flex: 1,
                      padding: '11px',
                      backgroundColor: '#775B3F',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '2px',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      transition: 'background-color 0.2s ease'
                    }}
                  >
                    <ShoppingBag size={14} /> MOVE TO BAG
                  </button>
                  <Link
                    to={`/product/${product.id}`}
                    style={{
                      padding: '11px 14px',
                      border: '1px solid #C8AE84',
                      color: '#2C2117',
                      backgroundColor: '#FAF7F2',
                      textDecoration: 'none',
                      fontSize: '0.8rem',
                      fontWeight: 500,
                      borderRadius: '2px',
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
