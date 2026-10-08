import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { 
  Users, 
  Shield, 
  UserCheck, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  AlertTriangle
} from 'lucide-react';

/**
 * AdminUsers Component
 * Phụ trách: Thành viên 5 (Quản lý Người dùng & Tài khoản với ĐẦY ĐỦ CRUD)
 *  - Create: "+ Add User" mở modal tạo tài khoản (admin/user)
 *  - Read: Bảng danh sách người dùng, KPIs tổng số, tìm kiếm, lọc theo vai trò
 *  - Update: Sửa thông tin tài khoản, cập nhật vai trò (phân quyền admin/user), reset mật khẩu
 *  - Delete: Xóa tài khoản người dùng (bảo vệ an toàn tài khoản hiện tại & master admin)
 */
export default function AdminUsers() {
  const { users, currentUser, addUser, updateUser, deleteUser } = useShop();

  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form states
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    address: '',
    role: 'user'
  });
  const [createError, setCreateError] = useState('');

  const [editUserForm, setEditUserForm] = useState({
    name: '',
    phone: '',
    address: '',
    role: 'user',
    newPassword: ''
  });
  const [editError, setEditError] = useState('');

  // KPIs
  const totalUsersCount = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const customerCount = users.filter(u => u.role !== 'admin').length;

  // Filtered users
  const filteredUsers = users.filter(u => {
    const matchesRole = 
      roleFilter === 'all' || 
      (roleFilter === 'admin' && u.role === 'admin') || 
      (roleFilter === 'user' && u.role !== 'admin');

    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (u.name || '').toLowerCase().includes(searchLower) ||
      (u.email || '').toLowerCase().includes(searchLower) ||
      (u.phone || '').includes(searchLower) ||
      (u.username || '').toLowerCase().includes(searchLower);

    return matchesRole && matchesSearch;
  });

  // Handle Create User
  const handleCreateSubmit = (e) => {
    e.preventDefault();
    setCreateError('');

    if (!newUserForm.name.trim() || !newUserForm.email.trim() || !newUserForm.password) {
      setCreateError('Please complete all required fields.');
      return;
    }

    const res = addUser({
      name: newUserForm.name.trim(),
      email: newUserForm.email.trim(),
      password: newUserForm.password,
      phone: newUserForm.phone.trim(),
      address: newUserForm.address.trim(),
      role: newUserForm.role
    });

    if (!res.success) {
      setCreateError(res.message || 'Failed to create user account.');
      return;
    }

    setShowCreateModal(false);
    setNewUserForm({
      name: '',
      email: '',
      password: '',
      phone: '',
      address: '',
      role: 'user'
    });
  };

  // Open Edit User Modal
  const handleOpenEdit = (user) => {
    setSelectedUser(user);
    setEditUserForm({
      name: user.name || '',
      phone: user.phone || '',
      address: user.address || '',
      role: user.role || 'user',
      newPassword: ''
    });
    setEditError('');
    setShowEditModal(true);
  };

  // Handle Edit User Submit
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedUser) return;
    setEditError('');

    if (!editUserForm.name.trim()) {
      setEditError('User name cannot be empty.');
      return;
    }

    const updatePayload = {
      name: editUserForm.name.trim(),
      phone: editUserForm.phone.trim(),
      address: editUserForm.address.trim(),
      role: editUserForm.role
    };

    if (editUserForm.newPassword.trim()) {
      updatePayload.password = editUserForm.newPassword.trim();
    }

    updateUser(selectedUser.id, updatePayload);
    setShowEditModal(false);
    setSelectedUser(null);
  };

  // Open Delete Modal
  const handleOpenDelete = (user) => {
    if (currentUser && currentUser.id === user.id) {
      alert("Safety constraint: You cannot delete your currently active account.");
      return;
    }
    if (user.email === 'admin@lune.com') {
      alert("Safety constraint: The primary root administrator cannot be deleted.");
      return;
    }
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Confirm Delete
  const confirmDelete = () => {
    if (selectedUser) {
      deleteUser(selectedUser.id);
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">USER ACCOUNTS & ROLES</h1>
          <p className="admin-subtitle">
            Manage system users, customer accounts, and security role permissions.
          </p>
        </div>
        <button
          type="button"
          className="admin-primary-btn"
          onClick={() => {
            setCreateError('');
            setShowCreateModal(true);
          }}
        >
          <UserPlus size={16} /> Add User
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE' }}>
            <Users size={20} color="#775B3F" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#5C4A3A', fontWeight: 600, textTransform: 'uppercase' }}>Total Users</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117' }}>{totalUsersCount}</h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F9F2E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8AE84' }}>
            <Shield size={20} color="#775B3F" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#775B3F', fontWeight: 600, textTransform: 'uppercase' }}>Administrators</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#775B3F' }}>{adminCount}</h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE' }}>
            <UserCheck size={20} color="#5C4A3A" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#5C4A3A', fontWeight: 600, textTransform: 'uppercase' }}>Clients</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117' }}>{customerCount}</h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card" style={{ marginBottom: '24px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px', backgroundColor: '#FAF7F2', padding: '8px 14px', borderRadius: '4px', border: '1px solid #E7DDCE' }}>
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder="Search by name, email, username or phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.88rem', color: '#2C2117' }}
          />
        </div>

        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '4px', border: '1px solid #E7DDCE', outline: 'none', backgroundColor: '#fff', fontSize: '0.88rem', color: '#2C2117', cursor: 'pointer' }}
        >
          <option value="all">All Roles ({totalUsersCount})</option>
          <option value="admin">Administrators ({adminCount})</option>
          <option value="user">Customers ({customerCount})</option>
        </select>
      </div>

      {/* Users Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>User / Client</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Delivery Address</th>
                <th>Role (Permission)</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '48px', color: '#64748B' }}>
                    No users found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => {
                  const isCurrent = currentUser && currentUser.id === u.id;
                  const isMasterAdmin = u.email === 'admin@lune.com';
                  return (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: u.role === 'admin' ? '#775B3F' : '#FAF7F2',
                            color: u.role === 'admin' ? '#FAF7F2' : '#775B3F',
                            border: '1px solid #C8AE84',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.75rem',
                            fontWeight: 700
                          }}>
                            {(u.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <strong style={{ color: '#2C2117', display: 'block' }}>
                              {u.name} {isCurrent && <span style={{ fontSize: '0.72rem', color: '#775B3F', fontWeight: 600 }}>(You)</span>}
                            </strong>
                            <span style={{ fontSize: '0.78rem', color: '#64748B' }}>@{u.username || 'client'}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#5C4A3A' }}>{u.email}</td>
                      <td style={{ color: '#5C4A3A' }}>{u.phone || '—'}</td>
                      <td style={{ maxWidth: '240px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#5C4A3A' }}>
                        {u.address || '—'}
                      </td>
                      <td>
                        <span style={{
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          backgroundColor: u.role === 'admin' ? '#F9F2E7' : '#F5EFEB',
                          color: u.role === 'admin' ? '#775B3F' : '#5C4A3A',
                          border: u.role === 'admin' ? '1px solid #C8AE84' : 'none'
                        }}>
                          {u.role === 'admin' ? '🛡️ Admin' : '👤 Customer'}
                        </span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          {/* Edit User */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(u)}
                            style={{
                              padding: '6px',
                              background: '#FAF7F2',
                              border: '1px solid #E7DDCE',
                              borderRadius: '4px',
                              cursor: 'pointer',
                              color: '#2C2117'
                            }}
                            title="Edit User Info & Role"
                          >
                            <Edit3 size={15} />
                          </button>

                          {/* Delete User */}
                          <button
                            type="button"
                            onClick={() => handleOpenDelete(u)}
                            disabled={isCurrent || isMasterAdmin}
                            style={{
                              padding: '6px',
                              background: (isCurrent || isMasterAdmin) ? '#F1F5F9' : '#FEF2F2',
                              border: (isCurrent || isMasterAdmin) ? '1px solid #E2E8F0' : '1px solid #FECACA',
                              borderRadius: '4px',
                              cursor: (isCurrent || isMasterAdmin) ? 'not-allowed' : 'pointer',
                              color: (isCurrent || isMasterAdmin) ? '#94A3B8' : '#DC2626',
                              opacity: (isCurrent || isMasterAdmin) ? 0.6 : 1
                            }}
                            title={isCurrent ? "Cannot delete self" : isMasterAdmin ? "Root admin protected" : "Delete User"}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: CREATE USER (CREATE) ================= */}
      {showCreateModal && (
        <div className="admin-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="admin-modal-header">
              <h3>CREATE NEW ACCOUNT</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>

            {createError && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '4px', marginBottom: '16px', fontSize: '0.85rem' }}>
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateSubmit}>
              <div className="admin-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newUserForm.name}
                  onChange={e => setNewUserForm({ ...newUserForm, name: e.target.value })}
                  placeholder="e.g. Eleanor Vance"
                  required
                />
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Email Address *</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={newUserForm.email}
                    onChange={e => setNewUserForm({ ...newUserForm, email: e.target.value })}
                    placeholder="name@domain.com"
                    required
                  />
                </div>
                <div className="admin-field">
                  <label>Password *</label>
                  <input
                    type="password"
                    className="admin-input"
                    value={newUserForm.password}
                    onChange={e => setNewUserForm({ ...newUserForm, password: e.target.value })}
                    placeholder="At least 6 characters"
                    required
                  />
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="admin-input"
                    value={newUserForm.phone}
                    onChange={e => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    placeholder="+84 9xx xxx xxx"
                  />
                </div>

                <div className="admin-field">
                  <label>System Role *</label>
                  <select
                    className="admin-input"
                    value={newUserForm.role}
                    onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  >
                    <option value="user">👤 Customer (Client)</option>
                    <option value="admin">🛡️ Administrator</option>
                  </select>
                </div>
              </div>

              <div className="admin-field">
                <label>Default Address</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newUserForm.address}
                  onChange={e => setNewUserForm({ ...newUserForm, address: e.target.value })}
                  placeholder="Street, Ward, District, City"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Create User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT USER & ROLE (UPDATE) ================= */}
      {showEditModal && selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="admin-modal-header">
              <h3>EDIT USER: {selectedUser.email}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            {editError && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEE2E2', color: '#991B1B', borderRadius: '4px', marginBottom: '16px', fontSize: '0.85rem' }}>
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit}>
              <div className="admin-field">
                <label>Full Name *</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editUserForm.name}
                  onChange={e => setEditUserForm({ ...editUserForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    className="admin-input"
                    value={editUserForm.phone}
                    onChange={e => setEditUserForm({ ...editUserForm, phone: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>System Role *</label>
                  <select
                    className="admin-input"
                    value={editUserForm.role}
                    onChange={e => setEditUserForm({ ...editUserForm, role: e.target.value })}
                    disabled={selectedUser.email === 'admin@lune.com'}
                  >
                    <option value="user">👤 Customer (Client)</option>
                    <option value="admin">🛡️ Administrator</option>
                  </select>
                </div>
              </div>

              <div className="admin-field">
                <label>Delivery Address</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editUserForm.address}
                  onChange={e => setEditUserForm({ ...editUserForm, address: e.target.value })}
                />
              </div>

              <div className="admin-field">
                <label>Reset Password (leave empty to keep current password)</label>
                <input
                  type="password"
                  className="admin-input"
                  value={editUserForm.newPassword}
                  onChange={e => setEditUserForm({ ...editUserForm, newPassword: e.target.value })}
                  placeholder="New password (optional)"
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION (DELETE) ================= */}
      {showDeleteModal && selectedUser && (
        <div className="admin-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626' }}>
                <AlertTriangle size={22} />
                <h3 style={{ margin: 0, color: '#DC2626' }}>Delete Account</h3>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setShowDeleteModal(false)}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#5C4A3A', margin: '0 0 20px' }}>
              Are you sure you want to permanently delete the account of <strong>{selectedUser.name}</strong> ({selectedUser.email})?
              This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#DC2626',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  fontWeight: 600,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
