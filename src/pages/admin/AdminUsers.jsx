import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomSelect from '../../components/CustomSelect';
import { 
  Users, 
  Shield, 
  UserCheck, 
  UserPlus, 
  Search, 
  Edit3, 
  Trash2, 
  X, 
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

/**
 * AdminUsers Component
 * Phụ trách: Thành viên 5 (Quản lý Người dùng & Tài khoản với ĐẦY ĐỦ CRUD)
 * Đồng bộ đa ngôn ngữ: Thành viên 1 & Thành viên 5
 */
export default function AdminUsers() {
  const { users, currentUser, addUser, updateUser, deleteUser } = useShop();
  const { t } = useLanguage();

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

  // KPIs (4 Symmetrical Cards)
  const totalUsersCount = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const customerCount = users.filter(u => u.role !== 'admin').length;
  const activeCount = users.length;

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
      alert(t('admin.users.cannotDeleteSelf', 'Safety constraint: You cannot delete your currently active account.'));
      return;
    }
    if (user.email === 'admin@lune.com') {
      alert(t('admin.users.cannotDeleteMaster', 'Safety constraint: The primary root administrator cannot be deleted.'));
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
          <h1 className="admin-title">{t('admin.users.title', 'USER ACCOUNTS & ROLES')}</h1>
          <p className="admin-subtitle">
            {t('admin.users.subtitle', 'Manage system users, customer accounts, and security role permissions.')}
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
          <UserPlus size={16} /> {t('admin.users.addNew', 'Add User')}
        </button>
      </div>

      {/* 4 KPI Cards - Symmetrical Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <Users size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.75rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.users.totalAccounts', 'TOTAL ACCOUNTS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {totalUsersCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F9F2E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8AE84', flexShrink: 0 }}>
            <Shield size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.75rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.users.administrators', 'ADMINISTRATORS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {adminCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <UserCheck size={20} color="#5C4A3A" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.75rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.users.customers', 'CUSTOMERS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {customerCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F5EFEB', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <CheckCircle2 size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.75rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.users.activeAccounts', 'ACTIVE ACCOUNTS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {activeCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card admin-toolbar">
        <div className="admin-search">
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder={t('admin.users.searchPlaceholder', 'Search by name, email, username or phone...')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <CustomSelect
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          className="admin-select"
        >
          <option value="all">{t('admin.users.filterAll', 'All Roles')} ({totalUsersCount})</option>
          <option value="admin">{t('admin.users.filterAdmin', 'Administrators')} ({adminCount})</option>
          <option value="user">{t('admin.users.filterUser', 'Customers')} ({customerCount})</option>
        </CustomSelect>
        <span className="admin-count">{filteredUsers.length} {t('admin.users.countUnit', 'accounts')}</span>
      </div>

      {/* Users Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>{t('admin.users.colUser', 'User')}</th>
                <th style={{ width: '20%' }}>{t('admin.users.colEmail', 'Email')}</th>
                <th className="text-center" style={{ width: '13%' }}>{t('admin.users.colPhone', 'Phone')}</th>
                <th style={{ width: '22%' }}>{t('admin.users.colAddress', 'Address')}</th>
                <th className="text-center" style={{ width: '12%' }}>{t('admin.users.colRole', 'Role')}</th>
                <th className="text-center" style={{ width: '11%' }}>{t('admin.users.colActions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="admin-empty">
                    {t('common.noResults', 'No users found matching your criteria.')}
                  </td>
                </tr>
              ) : (
                filteredUsers.map(u => {
                  const isCurrent = currentUser && currentUser.id === u.id;
                  const isMasterAdmin = u.email === 'admin@lune.com';
                  return (
                    <tr key={u.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
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
                            fontWeight: 700,
                            flexShrink: 0
                          }}>
                            {(u.name || 'U').charAt(0).toUpperCase()}
                          </div>
                          <div style={{ minWidth: 0, overflow: 'hidden' }}>
                            <strong style={{ color: '#2C2117', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {u.name} {isCurrent && <span style={{ fontSize: '0.72rem', color: '#775B3F', fontWeight: 600 }}>({t('admin.users.you', 'You')})</span>}
                            </strong>
                            <span style={{ fontSize: '0.78rem', color: '#8F7965', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>@{u.username || 'client'}</span>
                          </div>
                        </div>
                      </td>
                      <td style={{ color: '#2C2117' }} title={u.email}>
                        <div style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.email}</div>
                      </td>
                      <td className="text-center" style={{ color: '#2C2117', whiteSpace: 'nowrap' }}>{u.phone || '—'}</td>
                      <td style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#2C2117' }} title={u.address}>
                        <div style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{u.address || '—'}</div>
                      </td>
                      <td className="text-center">
                        <span className="admin-role-badge" style={{
                          backgroundColor: u.role === 'admin' ? '#F9F2E7' : '#F5EFEB',
                          color: u.role === 'admin' ? '#775B3F' : '#5C4A3A',
                          border: u.role === 'admin' ? '1px solid #C8AE84' : 'none'
                        }}>
                          {u.role === 'admin' ? `🛡️ ${t('admin.users.roleAdmin', 'Admin')}` : `👤 ${t('admin.users.roleCustomer', 'Customer')}`}
                        </span>
                      </td>
                      <td className="text-center">
                        <div className="admin-actions">
                          {/* Edit User */}
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(u)}
                            className="admin-icon-btn edit"
                            style={{ padding: '5px' }}
                            title={t('admin.users.editUser', 'Edit User Info & Role')}
                          >
                            <Edit3 size={14} />
                          </button>

                          {/* Delete User */}
                          <button
                            type="button"
                            onClick={() => handleOpenDelete(u)}
                            disabled={isCurrent || isMasterAdmin}
                            className={`admin-icon-btn ${isCurrent || isMasterAdmin ? '' : 'danger'}`}
                            style={{ padding: '5px', ...(isCurrent || isMasterAdmin ? { cursor: 'not-allowed', opacity: 0.35 } : {}) }}
                            title={isCurrent ? t('admin.users.cannotDeleteSelf', "Cannot delete self") : isMasterAdmin ? t('admin.users.rootProtected', "Root admin protected") : t('admin.users.deleteUser', "Delete User")}
                          >
                            <Trash2 size={14} />
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
              <h3>{t('admin.users.modalCreateTitle', 'CREATE NEW USER ACCOUNT')}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>

            {createError && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FAF5F2', border: '1px solid #E8D3C8', color: '#8F534F', borderRadius: '4px', marginBottom: '16px', fontSize: '0.85rem' }}>
                {createError}
              </div>
            )}

            <form onSubmit={handleCreateSubmit}>
              <div className="admin-field">
                <label>{t('admin.users.labelFullName', 'Full Name *')}</label>
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
                  <label>{t('admin.users.labelEmail', 'Email Address *')}</label>
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
                  <label>{t('admin.users.labelPassword', 'Password *')}</label>
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
                  <label>{t('admin.users.labelPhone', 'Phone Number')}</label>
                  <input
                    type="tel"
                    className="admin-input"
                    value={newUserForm.phone}
                    onChange={e => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                    placeholder="+84 9xx xxx xxx"
                  />
                </div>

                <div className="admin-field">
                  <label>{t('admin.users.labelRole', 'System Role *')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={newUserForm.role}
                    onChange={e => setNewUserForm({ ...newUserForm, role: e.target.value })}
                  >
                    <option value="user">{t('admin.users.roleCustomerOption', '👤 Customer (Client)')}</option>
                    <option value="admin">{t('admin.users.roleAdminOption', '🛡️ Administrator')}</option>
                  </CustomSelect>
                </div>
              </div>

              <div className="admin-field">
                <label>{t('admin.users.labelAddress', 'Default Address')}</label>
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
                  {t('admin.users.btnCancel', 'Cancel')}
                </button>
                <button type="submit" className="admin-primary-btn">
                  {t('admin.users.btnCreate', 'Create User')}
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
              <h3>{t('admin.users.modalEditTitle', 'EDIT USER ACCOUNT')}: {selectedUser.email}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            {editError && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FAF5F2', border: '1px solid #E8D3C8', color: '#8F534F', borderRadius: '4px', marginBottom: '16px', fontSize: '0.85rem' }}>
                {editError}
              </div>
            )}

            <form onSubmit={handleEditSubmit}>
              <div className="admin-field">
                <label>{t('admin.users.labelFullName', 'Full Name *')}</label>
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
                  <label>{t('admin.users.labelPhone', 'Phone Number')}</label>
                  <input
                    type="tel"
                    className="admin-input"
                    value={editUserForm.phone}
                    onChange={e => setEditUserForm({ ...editUserForm, phone: e.target.value })}
                  />
                </div>

                <div className="admin-field">
                  <label>{t('admin.users.labelRole', 'System Role *')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={editUserForm.role}
                    onChange={e => setEditUserForm({ ...editUserForm, role: e.target.value })}
                    disabled={selectedUser.email === 'admin@lune.com'}
                  >
                    <option value="user">{t('admin.users.roleCustomerOption', '👤 Customer (Client)')}</option>
                    <option value="admin">{t('admin.users.roleAdminOption', '🛡️ Administrator')}</option>
                  </CustomSelect>
                </div>
              </div>

              <div className="admin-field">
                <label>{t('admin.users.labelAddress', 'Delivery Address')}</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editUserForm.address}
                  onChange={e => setEditUserForm({ ...editUserForm, address: e.target.value })}
                />
              </div>

              <div className="admin-field">
                <label>{t('admin.users.labelNewPassword', 'Reset Password (leave empty to keep current password)')}</label>
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
                  {t('admin.users.btnCancel', 'Cancel')}
                </button>
                <button type="submit" className="admin-primary-btn">
                  {t('admin.users.btnSave', 'Save Changes')}
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
                <h3 style={{ margin: 0, color: '#DC2626' }}>{t('admin.users.modalDeleteTitle', 'Delete Account')}</h3>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setShowDeleteModal(false)}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#5C4A3A', margin: '0 0 20px' }}>
              {t('admin.users.deleteConfirmText', 'Are you sure you want to permanently delete this user account?')} (<strong>{selectedUser.name}</strong> - {selectedUser.email})
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                {t('admin.users.btnCancel', 'Cancel')}
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
                {t('admin.users.btnConfirmDelete', 'Confirm Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
