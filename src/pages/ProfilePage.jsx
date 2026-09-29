import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { User, Package, LogOut, Settings, Clock, CheckCircle } from 'lucide-react';

/**
 * ProfilePage Component
 * Phụ trách: Thành viên 5 (Xác thực, phân quyền & Hồ sơ khách hàng)
 */
export default function ProfilePage() {
  const { currentUser, logout, updateProfile, orders } = useShop();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'info'
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [savedSuccess, setSavedSuccess] = useState(false);

  // If not logged in, redirect
  if (!currentUser) {
    navigate('/login');
    return null;
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
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', borderBottom: '1px solid #E7E5E4', paddingBottom: '20px' }}>
        <div>
          <h1 style={{ fontFamily: 'serif', fontSize: '2rem', fontWeight: 500, margin: '0 0 6px' }}>CLIENT ACCOUNT</h1>
          <p style={{ color: '#78716C', margin: 0, fontSize: '0.9rem' }}>Welcome back, <strong>{currentUser.name}</strong> ({currentUser.email})</p>
        </div>
        <button 
          onClick={handleLogout}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 18px',
            border: '1px solid #D6D3D1',
            backgroundColor: '#fff',
            cursor: 'pointer',
            fontSize: '0.85rem'
          }}
        >
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '36px' }}>
        {/* Navigation Sidebar */}
        <aside style={{ backgroundColor: '#fff', border: '1px solid #E7E5E4', height: 'fit-content' }}>
          <button
            onClick={() => setActiveTab('orders')}
            style={{
              width: '100%',
              padding: '16px 20px',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              border: 'none',
              borderLeft: activeTab === 'orders' ? '3px solid #1C1917' : '3px solid transparent',
              backgroundColor: activeTab === 'orders' ? '#FAF8F5' : '#fff',
              fontWeight: activeTab === 'orders' ? 600 : 400,
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <Package size={18} /> My Orders ({myOrders.length})
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
              borderLeft: activeTab === 'info' ? '3px solid #1C1917' : '3px solid transparent',
              backgroundColor: activeTab === 'info' ? '#FAF8F5' : '#fff',
              fontWeight: activeTab === 'info' ? 600 : 400,
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            <User size={18} /> Personal Details
          </button>
        </aside>

        {/* Content Area */}
        <main style={{ backgroundColor: '#fff', padding: '32px', border: '1px solid #E7E5E4' }}>
          {activeTab === 'orders' ? (
            <div>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '20px' }}>ORDER HISTORY</h2>
              {myOrders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 0', color: '#78716C' }}>
                  <Package size={40} style={{ opacity: 0.4, margin: '0 auto 12px' }} />
                  <p>You haven't placed any orders with Lune yet.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {myOrders.map(order => (
                    <div key={order.id} style={{ border: '1px solid #E7E5E4', padding: '20px', borderRadius: '2px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #F5EFE6', paddingBottom: '10px' }}>
                        <div>
                          <strong style={{ fontSize: '1rem' }}>Order {order.id}</strong>
                          <p style={{ margin: '2px 0 0', fontSize: '0.8rem', color: '#78716C' }}>
                            Placed on {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            backgroundColor: order.status === 'Delivered' ? '#DCFCE7' : order.status === 'Shipping' ? '#FEF9C3' : '#F1F5F9',
                            color: order.status === 'Delivered' ? '#166534' : order.status === 'Shipping' ? '#854D0E' : '#334155'
                          }}>
                            {order.status}
                          </span>
                          <p style={{ margin: '4px 0 0', fontWeight: 700 }}>${order.totalAmount}</p>
                        </div>
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                        {(order.items || []).map((it, idx) => (
                          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                            <span>{it.quantity}x {it.name} (Size: {it.selectedSize})</span>
                            <span style={{ fontWeight: 500 }}>${it.price * it.quantity}</span>
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
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, letterSpacing: '0.05em', marginBottom: '20px' }}>EDIT DETAILS</h2>
              {savedSuccess && (
                <div style={{ padding: '12px', backgroundColor: '#DCFCE7', color: '#166534', marginBottom: '20px', fontSize: '0.85rem' }}>
                  ✓ Profile updated successfully!
                </div>
              )}
              <form onSubmit={handleUpdate} style={{ maxWidth: '480px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>Full Name</label>
                  <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #D6D3D1', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>Phone Number</label>
                  <input type="text" value={phone} onChange={e => setPhone(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #D6D3D1', outline: 'none' }} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 500, marginBottom: '6px' }}>Default Delivery Address</label>
                  <input type="text" value={address} onChange={e => setAddress(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #D6D3D1', outline: 'none' }} />
                </div>
                <button type="submit" style={{ padding: '12px 28px', backgroundColor: '#1C1917', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>
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
