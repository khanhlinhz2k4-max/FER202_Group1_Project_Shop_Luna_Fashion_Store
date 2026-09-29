import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

/**
 * CartDrawer Component
 * Phụ trách: Thành viên 4 (Giỏ hàng & Quy trình thanh toán)
 */
export default function CartDrawer() {
  const { isCartOpen, closeCart, cart, updateQuantity, removeFromCart, cartTotal } = useShop();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const freeShippingThreshold = 250;
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - cartTotal);

  const handleCheckout = () => {
    closeCart();
    navigate('/checkout');
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 9999,
      display: 'flex',
      justifyContent: 'flex-end',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(3px)'
    }} onClick={closeCart}>
      <div 
        style={{
          width: '100%',
          maxWidth: '440px',
          height: '100%',
          backgroundColor: '#FAF8F5',
          color: '#1C1917',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 25px rgba(0,0,0,0.15)',
          overflowY: 'auto'
        }} 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid #E7E5E4',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShoppingBag size={20} color="#775B3F" />
            <h3 style={{ margin: 0, fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.05em' }}>
              SHOPPING BAG ({cart.length})
            </h3>
          </div>
          <button 
            onClick={closeCart}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div style={{ padding: '12px 24px', backgroundColor: '#F5EFE6', fontSize: '0.85rem' }}>
          {remainingForFreeShipping > 0 ? (
            <span>Add <strong>${remainingForFreeShipping}</strong> more to unlock <strong>Free Shipping</strong></span>
          ) : (
            <span style={{ color: '#2E7D32', fontWeight: 600 }}>🎉 You've unlocked Free Complimentary Shipping!</span>
          )}
        </div>

        {/* Cart Item List */}
        <div style={{ flex: 1, padding: '16px 24px', overflowY: 'auto' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#78716C' }}>
              <ShoppingBag size={48} strokeWidth={1} style={{ margin: '0 auto 16px', opacity: 0.5 }} />
              <p>Your shopping bag is currently empty.</p>
              <button 
                onClick={() => { closeCart(); navigate('/shop'); }}
                style={{
                  marginTop: '12px',
                  padding: '8px 20px',
                  backgroundColor: '#1C1917',
                  color: '#fff',
                  border: 'none',
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                DISCOVER COLLECTION
              </button>
            </div>
          ) : (
            cart.map(item => (
              <div 
                key={item.cartItemId || item.id} 
                style={{
                  display: 'flex',
                  gap: '16px',
                  paddingBottom: '16px',
                  marginBottom: '16px',
                  borderBottom: '1px solid #E7E5E4'
                }}
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  style={{ width: '80px', height: '100px', objectFit: 'cover' }} 
                />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h4 style={{ margin: '0 0 4px', fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: '#78716C' }}>
                      Size: {item.selectedSize} {item.selectedColor && `| Color: ${item.selectedColor}`}
                    </p>
                    <p style={{ margin: '4px 0 0', fontWeight: 600, fontSize: '0.9rem' }}>${item.price}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #D6D3D1' }}>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity - 1)}
                        style={{ background: 'none', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
                      >
                        <Minus size={14} />
                      </button>
                      <span style={{ fontSize: '0.85rem', padding: '0 8px' }}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.cartItemId || item.id, item.quantity + 1)}
                        style={{ background: 'none', border: 'none', padding: '4px 8px', cursor: 'pointer' }}
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <button 
                      onClick={() => removeFromCart(item.cartItemId || item.id)}
                      style={{ background: 'none', border: 'none', color: '#A8A29E', cursor: 'pointer', padding: '4px' }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div style={{ padding: '20px 24px', borderTop: '1px solid #E7E5E4', backgroundColor: '#fff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span style={{ fontSize: '0.95rem', color: '#78716C' }}>Estimated Subtotal</span>
              <span style={{ fontSize: '1.1rem', fontWeight: 600 }}>${cartTotal}</span>
            </div>
            <button 
              onClick={handleCheckout}
              style={{
                width: '100%',
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
              PROCEED TO CHECKOUT <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
