import React, { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
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
  ShoppingBag,
  Heart,
  MapPin,
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  ArrowRight,
  Shield,
  Lock,
  Mail,
  UserCheck
} from 'lucide-react';
import './ProfilePage.css';

/**
 * ProfilePage Component
 * Phụ trách: Thành viên 5 (Xác thực, phân quyền & Quản lý hồ sơ khách hàng)
 * Nâng cấp & Hoàn thiện UI bởi: Thành viên 1 (Leader)
 * Chức năng:
 *  - Membership Tier Badge (Atelier VIP Member)
 *  - 5 Tab điều hướng chuyên biệt:
 *     1. My Orders (Đơn hàng đã mua)
 *     2. Personal Details (Thông tin cá nhân & Thẻ định danh)
 *     3. Password & Security (Bảo mật & Đổi mật khẩu độc lập)
 *     4. Address Book (Sổ địa chỉ nhận hàng)
 *     5. Saved Wishlist (Danh sách yêu thích & kết nối TV3)
 *  - Nút Đăng xuất an toàn (Sign Out) tích hợp ngay dưới chân thanh menu.
 */
export default function ProfilePage() {
  const { 
    currentUser, 
    logout, 
    updateProfile, 
    changePassword, 
    orders, 
    updateOrderStatus,
    wishlist,
    removeFromWishlist,
    addToCart
  } = useShop();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'info' | 'security' | 'addresses' | 'wishlist'

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

  // Address Book State
  const [addresses, setAddresses] = useState(() => {
    try {
      const saved = localStorage.getItem(`lune_addresses_${currentUser?.email}`);
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 'addr-default',
        label: 'Primary Residence (Home)',
        recipient: currentUser?.name || 'Valued Member',
        phone: currentUser?.phone || '+84 987 654 321',
        detail: currentUser?.address || '789 Nguyen Hue Boulevard, District 1, Ho Chi Minh City',
        isDefault: true
      }
    ];
  });

  const [newAddressForm, setNewAddressForm] = useState({
    label: '',
    recipient: '',
    phone: '',
    detail: ''
  });
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [addressSuccess, setAddressSuccess] = useState('');

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
      phone: phone.trim() 
    });

    if (res?.success) {
      setInfoSuccess('Personal details updated successfully.');
      setAddresses(prev => prev.map(a => a.isDefault ? { ...a, recipient: name.trim(), phone: phone.trim() } : a));
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

  // Handle Add New Address
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddressForm.detail.trim() || !newAddressForm.recipient.trim()) return;

    const newAddr = {
      id: `addr-${Date.now()}`,
      label: newAddressForm.label || 'Secondary Address',
      recipient: newAddressForm.recipient,
      phone: newAddressForm.phone || currentUser.phone || '',
      detail: newAddressForm.detail,
      isDefault: addresses.length === 0
    };

    const updated = [...addresses, newAddr];
    setAddresses(updated);
    try {
      localStorage.setItem(`lune_addresses_${currentUser.email}`, JSON.stringify(updated));
    } catch (e) {}

    setNewAddressForm({ label: '', recipient: '', phone: '', detail: '' });
    setShowAddAddressModal(false);
    setAddressSuccess('New delivery destination added to your Address Book.');
    setTimeout(() => setAddressSuccess(''), 4000);
  };

  // Handle Set Default Address
  const handleSetDefaultAddress = (id) => {
    const target = addresses.find(a => a.id === id);
    const updated = addresses.map(a => ({
      ...a,
      isDefault: a.id === id
    }));
    setAddresses(updated);
    try {
      localStorage.setItem(`lune_addresses_${currentUser.email}`, JSON.stringify(updated));
    } catch (e) {}

    if (target) {
      setAddress(target.detail);
      updateProfile({ address: target.detail, phone: target.phone });
    }

    setAddressSuccess('Default shipping destination updated.');
    setTimeout(() => setAddressSuccess(''), 3000);
  };

  // Handle Delete Address
  const handleDeleteAddress = (id) => {
    if (addresses.length <= 1) {
      alert('You must maintain at least one delivery address in your account.');
      return;
    }
    const updated = addresses.filter(a => a.id !== id);
    if (addresses.find(a => a.id === id)?.isDefault && updated.length > 0) {
      updated[0].isDefault = true;
      setAddress(updated[0].detail);
      updateProfile({ address: updated[0].detail });
    }
    setAddresses(updated);
    try {
      localStorage.setItem(`lune_addresses_${currentUser.email}`, JSON.stringify(updated));
    } catch (e) {}
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

  const primaryAddress = addresses.find(a => a.isDefault)?.detail || address || 'No address set yet';

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
            
            {/* Membership Tier Badge */}
            <div className="profile-tier-badge">
              <Sparkles size={12} className="tier-icon" />
              <span>{currentUser.role === 'admin' ? 'ATELIER AMBASSADOR' : 'ATELIER GOLD VIP'}</span>
            </div>
          </div>

          <nav className="profile-nav-menu">
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

            <button
              type="button"
              className={`profile-nav-btn ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              <Shield size={18} />
              <span>Password & Security</span>
            </button>

            <button
              type="button"
              className={`profile-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              onClick={() => setActiveTab('addresses')}
            >
              <MapPin size={18} />
              <span>Address Book</span>
              <span className="profile-nav-badge">{addresses.length}</span>
            </button>

            <button
              type="button"
              className={`profile-nav-btn ${activeTab === 'wishlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('wishlist')}
            >
              <Heart size={18} />
              <span>Saved Wishlist</span>
              <span className="profile-nav-badge">{wishlist.length}</span>
            </button>
          </nav>

          {/* Sidebar Footer Logout Action */}
          <div className="profile-sidebar-footer">
            <button
              type="button"
              onClick={handleLogout}
              className="profile-sidebar-logout-btn"
            >
              <LogOut size={16} />
              <span>Sign Out Account</span>
            </button>
          </div>
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

          {/* TAB 2: PERSONAL DETAILS (REFINED & HARMONIOUS) */}
          {activeTab === 'info' && (
            <div>
              <h2 className="profile-section-heading">PERSONAL INFORMATION</h2>
              <p className="profile-section-desc">
                Manage your primary identity details and contact information.
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
                    <label className="profile-label">Email Address (Verified)</label>
                    <div className="profile-input-locked">
                      <Mail size={16} className="locked-icon" />
                      <span className="locked-text">{currentUser.email}</span>
                      <span className="verified-pill">
                        <CheckCircle size={12} /> Verified
                      </span>
                    </div>
                  </div>

                  <div className="profile-form-group">
                    <label className="profile-label">Member Account Status</label>
                    <div className="profile-input-locked">
                      <UserCheck size={16} className="locked-icon" />
                      <span className="locked-text">LUNE VIP #{currentUser.id?.slice(-6).toUpperCase() || 'MEMBER'}</span>
                      <span className="active-pill">Active</span>
                    </div>
                  </div>
                </div>

                {/* Primary Destination Link Banner */}
                <div className="profile-destination-banner">
                  <div className="destination-banner-icon">
                    <MapPin size={22} />
                  </div>
                  <div className="destination-banner-info">
                    <h4 className="destination-banner-title">Primary Delivery Destination</h4>
                    <p className="destination-banner-address">{primaryAddress}</p>
                  </div>
                  <button
                    type="button"
                    className="destination-banner-btn"
                    onClick={() => setActiveTab('addresses')}
                  >
                    Manage in Address Book <ArrowRight size={14} />
                  </button>
                </div>

                <div className="profile-form-actions">
                  <button type="submit" className="profile-submit-btn">
                    <CheckCircle size={16} /> Save Changes
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 3: PASSWORD & SECURITY (INDEPENDENT TAB) */}
          {activeTab === 'security' && (
            <div>
              <h2 className="profile-section-heading">PASSWORD & SECURITY</h2>
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

                <div className="security-guidelines-box">
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: '#2C2117', margin: '0 0 6px' }}>
                    Password Requirements:
                  </h4>
                  <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.8rem', color: '#6B5645', lineHeight: 1.6 }}>
                    <li>Must be at least 6 characters in length.</li>
                    <li>Avoid using common dictionary words or easily guessable dates.</li>
                    <li>For optimal protection, combine letters, numbers, and symbols.</li>
                  </ul>
                </div>

                <div className="profile-form-actions">
                  <button
                    type="submit"
                    className="profile-submit-btn"
                    disabled={isChangingPass}
                  >
                    <KeyRound size={16} />
                    {isChangingPass ? 'Updating...' : 'Update Password'}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 4: ADDRESS BOOK */}
          {activeTab === 'addresses' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 className="profile-section-heading">ADDRESS BOOK</h2>
                <button
                  type="button"
                  className="profile-action-outline-btn"
                  onClick={() => setShowAddAddressModal(true)}
                >
                  <Plus size={15} /> Add Destination
                </button>
              </div>
              <p className="profile-section-desc">
                Manage your delivery destinations for expedited checkout on upcoming purchases.
              </p>

              {addressSuccess && (
                <div className="profile-alert-success" style={{ marginBottom: '20px' }}>
                  <CheckCircle size={18} />
                  <span>{addressSuccess}</span>
                </div>
              )}

              <div className="address-cards-grid">
                {addresses.map(addr => (
                  <div key={addr.id} className={`address-card ${addr.isDefault ? 'is-default' : ''}`}>
                    <div className="address-card-header">
                      <span className="address-card-label">{addr.label}</span>
                      {addr.isDefault && (
                        <span className="address-default-badge">
                          <CheckCircle size={12} /> Default Destination
                        </span>
                      )}
                    </div>

                    <div className="address-card-body">
                      <h4 className="address-recipient-name">{addr.recipient}</h4>
                      <p className="address-phone">{addr.phone}</p>
                      <p className="address-detail">{addr.detail}</p>
                    </div>

                    <div className="address-card-actions">
                      {!addr.isDefault && (
                        <button
                          type="button"
                          className="address-set-default-btn"
                          onClick={() => handleSetDefaultAddress(addr.id)}
                        >
                          Set as Default
                        </button>
                      )}
                      <button
                        type="button"
                        className="address-delete-btn"
                        onClick={() => handleDeleteAddress(addr.id)}
                        title="Delete Address"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Address Modal */}
              {showAddAddressModal && (
                <div className="profile-modal-backdrop" onClick={() => setShowAddAddressModal(false)}>
                  <div className="profile-modal-box" onClick={e => e.stopPropagation()}>
                    <div className="profile-modal-header">
                      <h3>Add Delivery Destination</h3>
                      <button type="button" onClick={() => setShowAddAddressModal(false)} className="profile-modal-close">
                        ✕
                      </button>
                    </div>
                    <form onSubmit={handleAddAddress} className="profile-modal-form">
                      <div className="profile-form-group">
                        <label className="profile-label">Address Tag / Label</label>
                        <input
                          type="text"
                          className="profile-input"
                          placeholder="e.g. Office, Vacation Home"
                          value={newAddressForm.label}
                          onChange={e => setNewAddressForm({ ...newAddressForm, label: e.target.value })}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label className="profile-label">Recipient Name *</label>
                        <input
                          type="text"
                          className="profile-input"
                          placeholder="Full recipient name"
                          value={newAddressForm.recipient}
                          onChange={e => setNewAddressForm({ ...newAddressForm, recipient: e.target.value })}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label className="profile-label">Phone Number *</label>
                        <input
                          type="tel"
                          className="profile-input"
                          placeholder="+84 900 000 000"
                          value={newAddressForm.phone}
                          onChange={e => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div className="profile-form-group">
                        <label className="profile-label">Detailed Address *</label>
                        <textarea
                          className="profile-input"
                          rows="3"
                          placeholder="House number, street name, ward, district, city"
                          value={newAddressForm.detail}
                          onChange={e => setNewAddressForm({ ...newAddressForm, detail: e.target.value })}
                          required
                        />
                      </div>
                      <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                        <button
                          type="button"
                          className="profile-cancel-btn"
                          onClick={() => setShowAddAddressModal(false)}
                          style={{ flex: 1 }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="profile-submit-btn"
                          style={{ flex: 1.5 }}
                        >
                          Save Address
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 5: SAVED WISHLIST PREVIEW & QUICK LINK */}
          {activeTab === 'wishlist' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '12px' }}>
                <h2 className="profile-section-heading">SAVED WISHLIST</h2>
                <Link to="/wishlist" className="profile-action-outline-btn">
                  Open Dedicated Page <ArrowRight size={14} />
                </Link>
              </div>
              <p className="profile-section-desc">
                Garments and accessories saved to your personal lookbook ({wishlist.length} {wishlist.length === 1 ? 'piece' : 'pieces'}).
              </p>

              {wishlist.length === 0 ? (
                <div className="empty-orders-view">
                  <Heart size={48} strokeWidth={1.5} style={{ opacity: 0.35, margin: '0 auto 12px', color: '#775B3F' }} />
                  <p>Your saved wishlist is currently empty.</p>
                  <button
                    type="button"
                    onClick={() => navigate('/shop')}
                    className="profile-submit-btn"
                  >
                    <ShoppingBag size={16} /> Discover Styles
                  </button>
                </div>
              ) : (
                <div className="profile-wishlist-grid">
                  {wishlist.map(item => (
                    <div key={item.id} className="profile-wishlist-card">
                      <div className="profile-wishlist-img-wrap">
                        <img src={item.image} alt={item.name} className="profile-wishlist-img" />
                      </div>
                      <div className="profile-wishlist-info">
                        <h4 className="profile-wishlist-title">{item.name}</h4>
                        <div className="profile-wishlist-price">${item.price}</div>
                        <div className="profile-wishlist-actions">
                          <button
                            type="button"
                            className="profile-wishlist-add-btn"
                            onClick={() => {
                              addToCart(item, item.sizes?.[0] || 'M', item.colors?.[0] || 'Default', 1);
                              alert(`Added "${item.name}" to bag.`);
                            }}
                          >
                            <ShoppingBag size={14} /> Add to Bag
                          </button>
                          <button
                            type="button"
                            className="profile-wishlist-remove-btn"
                            onClick={() => removeFromWishlist(item.id)}
                            title="Remove from Wishlist"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
