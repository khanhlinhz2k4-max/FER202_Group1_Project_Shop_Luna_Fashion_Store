import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { 
  User, 
  Package, 
  LogOut, 
  KeyRound, 
  CheckCircle, 
  AlertCircle, 
  Clock, 
  Truck, 
  XCircle,
  Eye,
  EyeOff,
  ShoppingBag
} from 'lucide-react';
import './ProfilePage.css';

/**
 * ProfilePage Component
 * Phụ trách: Thành viên 5 (Xác thực, phân quyền & Quản lý hồ sơ khách hàng)
 * Chức năng:
 *  - Tab Thông tin cá nhân: Xem/sửa họ tên, số điện thoại, địa chỉ mặc định, ĐỔI MẬT KHẨU.
 *  - Tab Đơn hàng của tôi (My Orders): Danh sách đơn hàng đã mua, xem trạng thái (Pending, Shipping, Delivered), Hủy đơn (Pending).
 */
export default function ProfilePage() {
  const { 
    currentUser, 
    logout, 
    updateProfile, 
    changePassword, 
    orders, 
    updateOrderStatus 
  } = useShop();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' or 'info'

  // Personal Info Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');
  const [infoSuccess, setInfoSuccess] = useState('');
  const [infoError, setInfoError] = useState('');

  // Change Password Form State
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPass, setShowOldPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passSuccess, setPassSuccess] = useState('');
  const [passError, setPassError] = useState('');
  const [isChangingPass, setIsChangingPass] = useState(false);

  // Orders Filter
  const [orderFilter, setOrderFilter] = useState('all');

  // If unauthenticated, redirect to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Filter orders associated with this user
  const userOrders = orders.filter(o => {
    const emailMatch = o.customer?.email && o.customer.email.toLowerCase() === currentUser.email.toLowerCase();
    const phoneMatch = o.customer?.phone && currentUser.phone && o.customer.phone === currentUser.phone;
    return emailMatch || phoneMatch;
  });

  const displayedOrders = userOrders.filter(o => {
    if (orderFilter === 'all') return true;
    return (o.status || '').toLowerCase() === orderFilter.toLowerCase();
  });

  // Handle Profile Details Update
  const handleUpdateProfile = (e) => {
    e.preventDefault();
    setInfoSuccess('');
    setInfoError('');

    if (!name.trim()) {
      setInfoError('Full name cannot be empty.');
      return;
    }

    const res = updateProfile({ 
      name: name.trim(), 
      phone: phone.trim(), 
      address: address.trim() 
    });

    if (res?.success) {
      setInfoSuccess('Your personal profile has been updated successfully.');
      setTimeout(() => setInfoSuccess(''), 4000);
    }
  };

  // Handle Change Password
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPassSuccess('');
    setPassError('');

    if (!oldPassword) {
      setPassError('Please enter your current password.');
      return;
    }
    if (!newPassword || newPassword.length < 6) {
      setPassError('New password must be at least 6 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassError('New password and confirmation password do not match.');
      return;
    }

    setIsChangingPass(true);
    setTimeout(() => {
      const res = changePassword(currentUser.id, oldPassword, newPassword);
      setIsChangingPass(false);
      if (res.success) {
        setPassSuccess('Password changed successfully! Keep it confidential.');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setPassSuccess(''), 4000);
      } else {
        setPassError(res.message || 'Failed to update password.');
      }
    }, 400);
  };

  // Handle Order Cancellation by Customer
  const handleCancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      `Are you sure you want to cancel Order ${orderId}? The reserved items will be restored to store inventory.`
    );
    if (confirmCancel) {
      updateOrderStatus(orderId, 'Cancelled');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const initials = (currentUser.name || 'Client')
    .split(' ')
    .filter(Boolean)
    .map(w => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <div className="profile-page-container">
      {/* Page Header */}
      <div className="profile-header">
        <div>
          <h1 className="profile-title">CLIENT ACCOUNT</h1>
          <p className="profile-subtitle">
            Welcome back, <strong>{currentUser.name}</strong> • Member Portal
          </p>
        </div>
        <button type="button" onClick={handleLogout} className="profile-logout-btn">
          <LogOut size={16} /> Sign Out
        </button>
      </div>

      <div className="profile-grid">
        {/* Navigation Sidebar */}
        <aside className="profile-sidebar">
          <div className="profile-user-card">
            <div className="profile-avatar-circle">{initials}</div>
            <h3 className="profile-user-name">{currentUser.name}</h3>
            <p className="profile-user-email">{currentUser.email}</p>
          </div>

          <button
            type="button"
            className={`profile-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
            onClick={() => setActiveTab('orders')}
          >
            <Package size={18} />
            <span>My Orders</span>
            <span className="profile-nav-badge">{userOrders.length}</span>
          </button>

          <button
            type="button"
            className={`profile-nav-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={() => setActiveTab('info')}
          >
            <User size={18} />
            <span>Personal Details</span>
          </button>
        </aside>

        {/* Content Area */}
        <main className="profile-main-card">
          {/* TAB 1: MY ORDERS */}
          {activeTab === 'orders' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 className="profile-section-heading">ORDER HISTORY</h2>
                <span style={{ fontSize: '0.85rem', color: '#6B5645' }}>
                  Total Orders: <strong>{userOrders.length}</strong>
                </span>
              </div>
              <p className="profile-section-desc">
                Review past purchases, current shipping progress, and order receipts.
              </p>

              {/* Status Filter Bar */}
              <div className="orders-filter-bar">
                {['all', 'pending', 'shipping', 'delivered', 'cancelled'].map(st => (
                  <button
                    key={st}
                    type="button"
                    className={`orders-filter-btn ${orderFilter === st ? 'active' : ''}`}
                    onClick={() => setOrderFilter(st)}
                  >
                    {st.charAt(0).toUpperCase() + st.slice(1)}
                  </button>
                ))}
              </div>

              {displayedOrders.length === 0 ? (
                <div className="empty-orders-view">
                  <Package size={48} style={{ opacity: 0.35, margin: '0 auto 12px', color: '#775B3F' }} />
                  <p>No orders found matching the selected filter.</p>
                  <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="profile-submit-btn"
                  >
                    <ShoppingBag size={16} /> Explore Collection
                  </button>
                </div>
              ) : (
                displayedOrders.map(order => {
                  const statusKey = (order.status || 'pending').toLowerCase();
                  return (
                    <div key={order.id} className="order-card">
                      <div className="order-card-header">
                        <div>
                          <div className="order-card-id">{order.id}</div>
                          <div className="order-card-date">
                            Ordered on {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </div>
                        </div>

                        <div>
                          <span className={`order-badge order-badge-${statusKey}`}>
                            {statusKey === 'pending' && <Clock size={12} />}
                            {statusKey === 'shipping' && <Truck size={12} />}
                            {statusKey === 'delivered' && <CheckCircle size={12} />}
                            {statusKey === 'cancelled' && <XCircle size={12} />}
                            {order.status}
                          </span>
                        </div>
                      </div>

                      <div className="order-card-body">
                        {(order.items || []).map((item, idx) => (
                          <div key={idx} className="order-item-row">
                            <img
                              src={item.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300'}
                              alt={item.name}
                              className="order-item-img"
                            />
                            <div className="order-item-details">
                              <h4 className="order-item-name">{item.name}</h4>
                              <div className="order-item-meta">
                                Size: <strong>{item.selectedSize || 'Standard'}</strong> • Quantity: <strong>{item.quantity}</strong>
                              </div>
                            </div>
                            <div className="order-item-price">
                              ${(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}

                        <div style={{ marginTop: '16px', paddingTop: '12px', borderTop: '1px dashed #E7DDCE', fontSize: '0.82rem', color: '#6B5645' }}>
                          <div><strong>Delivery Address:</strong> {order.customer?.address || 'Standard Address'}</div>
                          <div><strong>Payment Method:</strong> {order.paymentMethod || 'Cash on Delivery'}</div>
                        </div>
                      </div>

                      <div className="order-card-footer">
                        <div>
                          <span style={{ fontSize: '0.82rem', color: '#6B5645' }}>Total Amount: </span>
                          <span className="order-total-amount">${order.totalAmount}</span>
                        </div>

                        {/* Customer can cancel if order is still Pending */}
                        {order.status === 'Pending' && (
                          <button
                            type="button"
                            className="order-cancel-btn"
                            onClick={() => handleCancelOrder(order.id)}
                          >
                            Cancel Order
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: PERSONAL DETAILS & CHANGE PASSWORD */}
          {activeTab === 'info' && (
            <div>
              <h2 className="profile-section-heading">PERSONAL INFORMATION</h2>
              <p className="profile-section-desc">
                Update your contact details and default delivery destination for future orders.
              </p>

              {infoSuccess && (
                <div className="profile-alert-success">
                  <CheckCircle size={18} />
                  <span>{infoSuccess}</span>
                </div>
              )}
              {infoError && (
                <div className="profile-alert-error">
                  <AlertCircle size={18} />
                  <span>{infoError}</span>
                </div>
              )}

              <form onSubmit={handleUpdateProfile}>
                <div className="profile-form-grid">
                  <div className="profile-form-group">
                    <label className="profile-label">Full Name *</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Linh Nguyen"
                      required
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Email Address (Read-only)</label>
                    <input
                      type="email"
                      className="profile-input"
                      value={currentUser.email}
                      disabled
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Phone Number</label>
                    <input
                      type="tel"
                      className="profile-input"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. +84 987 654 321"
                    />
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">System Role</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={currentUser.role === 'admin' ? 'Administrator' : 'Lune Client Member'}
                      disabled
                    />
                  </div>

                  <div className="profile-form-group profile-form-full">
                    <label className="profile-label">Default Delivery Address</label>
                    <input
                      type="text"
                      className="profile-input"
                      value={address}
                      onChange={e => setAddress(e.target.value)}
                      placeholder="Street, Ward, District, City"
                    />
                  </div>
                </div>

                <button type="submit" className="profile-submit-btn">
                  Save Changes
                </button>
              </form>

              {/* CHANGE PASSWORD SUB-SECTION */}
              <div className="profile-password-section">
                <h3 className="profile-section-heading" style={{ fontSize: '1.1rem' }}>
                  CHANGE PASSWORD
                </h3>
                <p className="profile-section-desc">
                  Ensure your account is protected with a secure and unique password.
                </p>

                {passSuccess && (
                  <div className="profile-alert-success">
                    <CheckCircle size={18} />
                    <span>{passSuccess}</span>
                  </div>
                )}
                {passError && (
                  <div className="profile-alert-error">
                    <AlertCircle size={18} />
                    <span>{passError}</span>
                  </div>
                )}

                <form onSubmit={handleChangePassword}>
                  <div className="profile-form-grid">
                    <div className="profile-form-group profile-form-full">
                      <label className="profile-label">Current Password *</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showOldPass ? 'text' : 'password'}
                          className="profile-input"
                          value={oldPassword}
                          onChange={e => setOldPassword(e.target.value)}
                          placeholder="Enter your current password"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowOldPass(!showOldPass)}
                          style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#7D6B5A' }}
                        >
                          {showOldPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="profile-form-group">
                      <label className="profile-label">New Password *</label>
                      <div style={{ position: 'relative' }}>
                        <input
                          type={showNewPass ? 'text' : 'password'}
                          className="profile-input"
                          value={newPassword}
                          onChange={e => setNewPassword(e.target.value)}
                          placeholder="At least 6 characters"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPass(!showNewPass)}
                          style={{ position: 'absolute', right: 12, top: 12, background: 'none', border: 'none', cursor: 'pointer', color: '#7D6B5A' }}
                        >
                          {showNewPass ? <EyeOff size={16} /> : <Eye size={16} />}
                        </button>
                      </div>
                    </div>

                    <div className="profile-form-group">
                      <label className="profile-label">Confirm New Password *</label>
                      <input
                        type="password"
                        className="profile-input"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                        placeholder="Re-enter new password"
                        required
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="profile-submit-btn"
                    disabled={isChangingPass}
                  >
                    <KeyRound size={16} />
                    {isChangingPass ? 'Updating...' : 'Update Password'}
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
