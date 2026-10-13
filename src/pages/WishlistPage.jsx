import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import { Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

/**
 * WishlistPage Component
 * Phụ trách: Thành viên 3 (Trải nghiệm sản phẩm & Danh sách yêu thích)
 * Nâng cấp: Thành viên 1 (Leader - Tích hợp Đa ngôn ngữ song ngữ EN/VI)
 * Harmonized with LUNE Warm Luxury Brand Guidelines
 */
export default function WishlistPage() {
  const { wishlist, removeFromWishlist, addToCart, currentUser } = useShop();
  const { t, tp } = useLanguage();

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'var(--text-h1)', fontWeight: 500, margin: '0 0 8px', color: '#2C2117', letterSpacing: '0.04em' }}>
          {t('wishlist.title', 'SAVED STYLES')}
        </h1>
        <p style={{ color: '#5C4A3A', fontSize: 'var(--text-body)', letterSpacing: '0.02em' }}>
          {t('wishlist.subtitle', 'Your curated lookbook')} ({wishlist.length} {wishlist.length === 1 ? t('wishlist.pieceSingular', 'piece') : t('wishlist.piecePlural', 'pieces')})
        </p>
      </div>

      {/* Guest Mode Synchronization Banner (Non-blocking) */}
      {!currentUser && wishlist.length > 0 && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          padding: '14px 22px',
          backgroundColor: '#F9F2E7',
          border: '1px solid #C8AE84',
          borderRadius: '4px',
          marginBottom: '32px',
          flexWrap: 'wrap'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Heart size={18} fill="#CAA072" stroke="#775B3F" />
            <span style={{ fontSize: '0.86rem', color: '#5C4A3A' }}>
              <strong>{t('wishlist.guestNoticeTitle', 'Browsing as Guest:')}</strong> {t('wishlist.guestNoticeDesc', 'Items are saved in this browser. Sign in anytime to sync your lookbook permanently across all devices.')}
            </span>
          </div>
          <Link
            to="/login"
            state={{ redirect: '/wishlist' }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              padding: '7px 18px',
              backgroundColor: '#775B3F',
              color: '#FAF7F2',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              borderRadius: '2px',
              textDecoration: 'none'
            }}
          >
            {t('wishlist.signInToSync', 'SIGN IN TO SYNC')} <ArrowRight size={13} />
          </Link>
        </div>
      )}

      {wishlist.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#FFFFFF', border: '1px solid #E7DDCE', borderRadius: '4px' }}>
          <Heart size={48} strokeWidth={1} style={{ margin: '0 auto 16px', color: '#C8AE84' }} />
          <p style={{ color: '#5C4A3A', marginBottom: '24px', fontSize: '0.95rem' }}>
            {t('wishlist.emptyTitle', "You haven't saved any items to your wishlist yet.")}
          </p>
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
            {t('wishlist.exploreBtn', 'EXPLORE THE COLLECTION')} <ArrowRight size={16} />
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
                  alt={tp(product, 'name')}
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
                  title={t('wishlist.removeBtn', 'Remove')}
                >
                  <Trash2 size={16} color="#B91C1C" />
                </button>
              </div>

              <div style={{ padding: '18px', display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'space-between' }}>
                <div>
                  <h3 style={{ margin: '0 0 6px', fontSize: '0.95rem', fontWeight: 500, color: '#2C2117' }}>{tp(product, 'name')}</h3>
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
                    <ShoppingBag size={14} /> {t('wishlist.moveToBagBtn', 'MOVE TO BAG')}
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
                    {t('common.details', 'View')}
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

