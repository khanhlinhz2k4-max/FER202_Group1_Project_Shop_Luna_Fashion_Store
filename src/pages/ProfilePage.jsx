import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { User, Package, LogOut, Settings, Clock, CheckCircle } from 'lucide-react';

/**
 * ProfilePage Component
 * Phụ trách: Thành viên 5 (Xác thực, phân quyền & Hồ sơ khách hàng)
 * Harmonized with LUNE Warm Luxury Brand Guidelines
 */
export default function ProfilePage() {
  const { currentUser, logout, updateProfile, orders } = useShop();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'info'
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // If not logged in, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Admin is an administrator, not a shopping client - redirect to Admin Portal
  if (currentUser.role === 'admin') {
    return <Navigate to="/admin" replace />;
  }

  // Filter orders made by this user or general orders
  const myOrders = orders.filter(o => 
    (o.customer?.email && o.customer.email.toLowerCase() === currentUser.email.toLowerCase()) ||
    (o.customer?.phone && o.customer.phone === currentUser.phone)
  );

  const handleUpdate = (e) => {
    e.preventDefault();
    updateProfile({ name, phone, address });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '48px 24px 80px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #E7DDCE', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: '2.2rem', fontWeight: 500, margin: '0 0 6px', color: '#2C2117', letterSpacing: '0.04em' }}>
            CLIENT ACCOUNT
          </h1>
          <p style={{ color: '#5C4A3A', margin: 0, fontSize: '0.92rem' }}>
            Welcome back, <strong style={{ color: '#2C2117' }}>{currentUser.name}</strong> ({currentUser.email})
          </p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 20px',
            border: '1px solid #C8AE84',
            backgroundColor: '#FAF7F2',
            color: '#2C2117',
            borderRadius: '2px',
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: 500,
            transition: 'all 0.2s ease'
          }}
        >
          <LogOut size={16} color="#775B3F" /> Sign Out
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '36px' }}>
        {/* Navigation Sidebar */}
        <aside style={{ backgroundColor: '#FFFFFF', border: '1px solid #E7DDCE', borderRadius: '4px', height: 'fit-content', overflow: 'hidden' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              width: '100%',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: 'none',
              borderLeft: activeTab === 'orders' ? '3px solid #775B3F' : '3px solid transparent',
              backgroundColor: activeTab === 'orders' ? '#F9F2E7' : '#FFFFFF',
              color: activeTab === 'orders' ? '#775B3F' : '#2C2117',
              fontWeight: activeTab === 'orders' ? 600 : 400,
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <Package size={18} color={activeTab === 'orders' ? '#775B3F' : '#5C4A3A'} /> My Orders ({myOrders.length})
          </button>

          <button
            onClick={() => setActiveTab('info')}
            style={{
              width: '100%',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: 'none',
              borderLeft: activeTab === 'info' ? '3px solid #775B3F' : '3px solid transparent',
              backgroundColor: activeTab === 'info' ? '#F9F2E7' : '#FFFFFF',
              color: activeTab === 'info' ? '#775B3F' : '#2C2117',
              fontWeight: activeTab === 'info' ? 600 : 400,
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.9rem',
              transition: 'all 0.2s ease'
            }}
          >
            <User size={18} color={activeTab === 'info' ? '#775B3F' : '#5C4A3A'} /> Personal Details
          </button>
        </aside>

        {/* Content Area */}
        <main style={{ backgroundColor: '#FFFFFF', padding: '36px', border: '1px solid #E7DDCE', borderRadius: '4px', boxShadow: '0 2px 8px rgba(44, 33, 23, 0.03)' }}>
          {activeTab === 'orders' ? (
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '20px', color: '#2C2117' }}>ORDER HISTORY</h2>
              {myOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#5C4A3A' }}>
                  <Package size={40} style={{ opacity: 0.35, margin: '0 auto 12px', color: '#775B3F' }} />
                  <p>You haven't placed any orders with Lune yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {myOrders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #E7DDCE', padding: '20px', borderRadius: '4px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #F5EFEB', paddingBottom: '10px' }}>
                        <div>
                          <strong style={{ fontSize: '1rem', color: '#2C2117' }}>Order {order.id}</strong>
                          <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#5C4A3A' }}>
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            backgroundColor: order.status === 'Delivered' ? '#DCFCE7' : order.status === 'Shipping' ? '#FEF3C7' : '#F5EFEB',
                            color: order.status === 'Delivered' ? '#166534' : order.status === 'Shipping' ? '#92400E' : '#775B3F'
                          }}>
                            {order.status}
                          </span>
                          <p style={{ margin: '4px 0 0', fontWeight: 700, color: '#775B3F' }}>${order.totalAmount}</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(order.items || []).map((it, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#5C4A3A' }}>
                            <span>{it.quantity}x {it.name} (Size: {it.selectedSize})</span>
                            <span style={{ fontWeight: 600, color: '#2C2117' }}>${it.price * it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.04em', marginBottom: '20px', color: '#2C2117' }}>EDIT DETAILS</h2>
              {savedSuccess && (
                <div style={{ padding: '12px 16px', backgroundColor: '#ECFDF5', color: '#065F46', border: '1px solid #A7F3D0', borderRadius: '4px', marginBottom: '20px', fontSize: '0.85rem', fontWeight: 500 }}>
                  ✓ Profile updated successfully!
                </div>
              )}
              <form onSubmit={handleUpdate} style={{ maxWidth: '480px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>Phone Number</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px', color: '#2C2117' }}>Default Delivery Address</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '10px 12px', border: '1px solid #C8AE84', borderRadius: '2px', outline: 'none', color: '#2C2117' }} />
                </div>
                <button type="submit" style={{ padding: '12px 32px', backgroundColor: '#775B3F', color: '#FFFFFF', border: 'none', borderRadius: '2px', fontWeight: 600, letterSpacing: '0.04em', cursor: 'pointer', transition: 'background-color 0.2s ease' }}>
                  SAVE CHANGES
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
