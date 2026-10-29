import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Plus, 
  Tag, 
  Trash2, 
  Edit3, 
  X, 
  Ticket, 
  Percent, 
  DollarSign, 
  Search,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomSelect from '../../components/CustomSelect';

const initialForm = {
  code: '',
  discountType: 'percent',
  discountValue: '',
  minSubtotal: '0',
  startsAt: '',
  expiresAt: ''
};

export default function AdminVouchers() {
  const { vouchers, addVoucher, updateVoucher, toggleVoucher, deleteVoucher } = useShop();
  const { t, language } = useLanguage();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVoucher, setEditingVoucher] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');

  // Show Toast helper
  const showToast = (msg) => {
    setToast(msg);
    window.setTimeout(() => setToast(''), 3000);
  };

  // Open Create Modal
  const handleOpenCreate = () => {
    setEditingVoucher(null);
    const nowStr = new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
    setForm({
      ...initialForm,
      startsAt: nowStr
    });
    setError('');
    setIsModalOpen(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (voucher) => {
    setEditingVoucher(voucher);
    setForm({
      code: voucher.code,
      discountType: voucher.discountType || 'percent',
      discountValue: String(voucher.discountValue ?? ''),
      minSubtotal: String(voucher.minSubtotal ?? '0'),
      startsAt: voucher.startsAt ? voucher.startsAt.slice(0, 16) : '',
      expiresAt: voucher.expiresAt ? voucher.expiresAt.slice(0, 16) : ''
    });
    setError('');
    setIsModalOpen(true);
  };

  // Close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingVoucher(null);
    setForm(initialForm);
    setError('');
  };

  // Submit Modal (Create or Edit)
  const handleSubmit = (e) => {
    e.preventDefault();
    const code = form.code.trim().toUpperCase();
    const value = Number(form.discountValue);
    const minimum = Number(form.minSubtotal);

    if (!/^[A-Z0-9_-]{3,24}$/.test(code)) {
      setError(t('admin.vouchers.errCode', 'Code must be 3-24 characters using letters, numbers, _ or -.'));
      return;
    }

    // Check duplicate code (excluding current editing voucher)
    const isDuplicate = vouchers.some(v => 
      v.code.toUpperCase() === code && (!editingVoucher || v.id !== editingVoucher.id)
    );
    if (isDuplicate) {
      setError(t('admin.vouchers.errExists', 'This voucher code already exists.'));
      return;
    }

    if (!Number.isFinite(value) || value <= 0 || (form.discountType === 'percent' && value > 100)) {
      setError(t('admin.vouchers.errValue', 'Discount value must be valid (1-100% or greater than $0).'));
      return;
    }

    if (!Number.isFinite(minimum) || minimum < 0) {
      setError(t('admin.vouchers.errMin', 'Minimum order must be zero or greater.'));
      return;
    }

    if (form.startsAt && form.expiresAt && new Date(form.expiresAt) <= new Date(form.startsAt)) {
      setError(t('admin.vouchers.errDateOrder', 'End time must be after start time.'));
      return;
    }

    if (editingVoucher) {
      updateVoucher(editingVoucher.id, {
        code,
        discountType: form.discountType,
        discountValue: value,
        minSubtotal: minimum,
        startsAt: form.startsAt,
        expiresAt: form.expiresAt
      });
      showToast(t('admin.vouchers.toastUpdated', 'Voucher updated successfully!'));
    } else {
      addVoucher({
        code,
        discountType: form.discountType,
        discountValue: value,
        minSubtotal: minimum,
        startsAt: form.startsAt,
        expiresAt: form.expiresAt
      });
      showToast(t('admin.vouchers.toastCreated', 'New voucher created successfully!'));
    }

    handleCloseModal();
  };

  // Delete Voucher
  const handleDelete = (voucher) => {
    if (window.confirm(`${t('admin.vouchers.deleteConfirm', 'Are you sure you want to delete this voucher?')} (${voucher.code})`)) {
      deleteVoucher(voucher.id);
      showToast(t('admin.vouchers.toastDeleted', 'Voucher deleted successfully!'));
    }
  };

  // Helper: Format validity period
  const formatPeriod = (startsAt, expiresAt) => {
    const formatDT = (dtStr) => {
      if (!dtStr) return '';
      const d = new Date(dtStr);
      if (isNaN(d.getTime())) return dtStr;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      return `${day}/${month}/${year} ${hours}:${mins}`;
    };

    const fromLabel = language === 'vi' ? 'Từ' : 'From';
    const toLabel = language === 'vi' ? 'Đến' : 'To';

    if (!startsAt && !expiresAt) return <span style={{ color: '#8F7965', fontSize: '0.8rem' }}>{t('admin.vouchers.unlimited', 'No expiration')}</span>;
    if (startsAt && expiresAt) {
      return (
        <div style={{ fontSize: '0.78rem', lineHeight: '1.3' }}>
          <div><span style={{ color: '#8F7965' }}>{fromLabel}:</span> {formatDT(startsAt)}</div>
          <div><span style={{ color: '#8F7965' }}>{toLabel}:</span> {formatDT(expiresAt)}</div>
        </div>
      );
    }
    if (expiresAt) {
      return (
        <div style={{ fontSize: '0.78rem' }}>
          <span style={{ color: '#8F7965' }}>{toLabel}:</span> {formatDT(expiresAt)}
        </div>
      );
    }
    return (
      <div style={{ fontSize: '0.78rem' }}>
        <span style={{ color: '#8F7965' }}>{fromLabel}:</span> {formatDT(startsAt)}
      </div>
    );
  };

  // Helper: Get badge status - 100% Brand Luxury Palette
  const getVoucherStatus = (voucher) => {
    if (!voucher.isActive) {
      return {
        label: t('admin.vouchers.inactive', 'Inactive'),
        color: '#8F7965',
        bg: '#FAF8F5',
        border: '#E7DDCE'
      };
    }
    const now = new Date();
    if (voucher.startsAt && new Date(voucher.startsAt) > now) {
      return {
        label: t('admin.vouchers.statusUpcoming', 'Upcoming'),
        color: '#5C4A3A',
        bg: '#FAF7F2',
        border: '#E7DDCE'
      };
    }
    if (voucher.expiresAt && new Date(voucher.expiresAt) < now) {
      return {
        label: t('admin.vouchers.statusExpired', 'Expired'),
        color: '#8F7965',
        bg: '#FAF8F5',
        border: '#E7DDCE'
      };
    }
    return {
      label: t('admin.vouchers.active', 'Active'),
      color: '#2C2117',
      bg: '#F5EFEB',
      border: '#E7DDCE'
    };
  };

  // KPI calculations
  const totalCount = vouchers.length;
  const activeCount = vouchers.filter(v => v.isActive).length;
  const percentCount = vouchers.filter(v => v.discountType === 'percent').length;
  const fixedCount = vouchers.filter(v => v.discountType === 'fixed').length;

  // Filter vouchers by search
  const filteredVouchers = vouchers.filter((v) => {
    const q = searchTerm.trim().toUpperCase();
    if (!q) return true;
    return v.code.toUpperCase().includes(q);
  });

  return (
    <div>
      {/* Toast Notification */}
      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Header with Title and Create Button */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">
            {t('admin.vouchers.title', 'VOUCHER MANAGEMENT')}
          </h1>
          <p className="admin-subtitle">
            {t('admin.vouchers.subtitle', 'Create and manage privilege discount vouchers available at checkout.')}
          </p>
        </div>

        <button
          type="button"
          className="admin-primary-btn"
          onClick={handleOpenCreate}
        >
          <Plus size={16} />
          <span>{t('admin.vouchers.addNew', 'Create Voucher')}</span>
        </button>
      </div>

      {/* 4 KPI Cards - Standardized Horizontal Flex */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F9F2E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8AE84', flexShrink: 0 }}>
            <Ticket size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.vouchers.totalVouchers', 'TOTAL VOUCHERS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {totalCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F5EFEB', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <CheckCircle size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.vouchers.activeVouchers', 'ACTIVE VOUCHERS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {activeCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <Percent size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.vouchers.percentVouchers', 'PERCENTAGE (%)')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {percentCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <DollarSign size={20} color="#5C4A3A" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.vouchers.fixedVouchers', 'FIXED AMOUNT ($)')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {fixedCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Toolbar: Search input */}
      <div className="admin-card admin-toolbar">
        <div className="admin-search">
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder={t('admin.vouchers.searchPlaceholder', 'Search vouchers by code...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <span className="admin-count">{filteredVouchers.length} {t('admin.vouchers.countUnit', 'vouchers')}</span>
      </div>

      {/* Vouchers Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="text-center" style={{ width: '18%' }}>{t('admin.vouchers.colCode', 'Code')}</th>
                <th className="text-center" style={{ width: '13%' }}>{t('admin.vouchers.colDiscount', 'Discount')}</th>
                <th className="text-center" style={{ width: '14%' }}>{t('admin.vouchers.colMinSubtotal', 'Min. Order')}</th>
                <th className="text-center" style={{ width: '26%' }}>{t('admin.vouchers.colPeriod', 'Validity Period')}</th>
                <th className="text-center" style={{ width: '15%' }}>{t('admin.vouchers.colStatus', 'Status')}</th>
                <th className="text-center" style={{ width: '14%' }}>{t('admin.vouchers.colActions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredVouchers.length === 0 ? (
                <tr>
                  <td colSpan="6" className="admin-empty">
                    {t('admin.vouchers.empty', 'No vouchers created yet.')}
                  </td>
                </tr>
              ) : (
                filteredVouchers.map((voucher) => {
                  const statusInfo = getVoucherStatus(voucher);
                  return (
                    <tr key={voucher.id}>
                      <td className="text-center">
                        <strong className="notranslate" translate="no" style={{ letterSpacing: '0.04em', color: '#2C2117' }}>
                          {voucher.code}
                        </strong>
                      </td>
                      <td className="text-center">
                        <span style={{ fontWeight: 600, color: '#2C2117' }}>
                          {voucher.discountType === 'percent' ? `${voucher.discountValue}%` : `$${voucher.discountValue}`}
                        </span>
                      </td>
                      <td className="text-center" style={{ fontWeight: 600, color: '#2C2117', whiteSpace: 'nowrap' }}>${Number(voucher.minSubtotal) || 0}</td>
                      <td className="text-center" style={{ whiteSpace: 'nowrap' }}>{formatPeriod(voucher.startsAt, voucher.expiresAt)}</td>
                      <td className="text-center">
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '4px',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            color: statusInfo.color,
                            backgroundColor: statusInfo.bg,
                            border: `1px solid ${statusInfo.border}`,
                            display: 'inline-block',
                            whiteSpace: 'nowrap'
                          }}
                        >
                          {statusInfo.label}
                        </span>
                      </td>
                      <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        <div className="admin-actions">
                          <button
                            type="button"
                            title={voucher.isActive ? t('admin.vouchers.tooltipActive', 'Visible to clients (Click to disable)') : t('admin.vouchers.tooltipInactive', 'Hidden from clients (Click to activate)')}
                            className="admin-icon-btn"
                            onClick={() => toggleVoucher(voucher.id)}
                            style={{
                              color: voucher.isActive ? '#775B3F' : '#8F7965',
                              borderColor: voucher.isActive ? '#C8AE84' : '#E7DDCE',
                              backgroundColor: voucher.isActive ? '#FAF7F2' : '#F5EFEB'
                            }}
                          >
                            {voucher.isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <button
                            type="button"
                            title={t('admin.vouchers.btnEdit', 'Edit')}
                            className="admin-icon-btn edit"
                            onClick={() => handleOpenEdit(voucher)}
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            type="button"
                            title={t('admin.vouchers.btnDelete', 'Delete')}
                            className="admin-icon-btn danger"
                            onClick={() => handleDelete(voucher)}
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

      {/* Create / Edit Voucher Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={handleCloseModal}>
          <div
            className="admin-modal"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '540px', width: '100%' }}
          >
            <div className="admin-modal-header">
              <h3>
                {editingVoucher
                  ? t('admin.vouchers.modalEditTitle', 'EDIT VOUCHER')
                  : t('admin.vouchers.modalCreateTitle', 'CREATE NEW VOUCHER')}
              </h3>
              <button
                type="button"
                className="admin-modal-close"
                onClick={handleCloseModal}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="admin-modal-body">
              <div className="admin-field">
                <label>{t('admin.vouchers.code', 'Voucher Code *')}</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  placeholder="E.G. LUNE15"
                  required
                />
              </div>

              <div className="admin-field admin-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label>{t('admin.vouchers.discountType', 'Discount Type *')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={form.discountType}
                    onChange={(e) => setForm({ ...form, discountType: e.target.value })}
                  >
                    <option value="percent">{t('admin.vouchers.percent', 'Percentage (%)')}</option>
                    <option value="fixed">{t('admin.vouchers.fixed', 'Fixed Amount ($)')}</option>
                  </CustomSelect>
                </div>

                <div>
                  <label>{t('admin.vouchers.discountVal', 'Discount Value *')}</label>
                  <input
                    type="number"
                    min="1"
                    max={form.discountType === 'percent' ? '100' : undefined}
                    className="admin-input"
                    value={form.discountValue}
                    onChange={(e) => setForm({ ...form, discountValue: e.target.value })}
                    placeholder={form.discountType === 'percent' ? '10' : '20'}
                    required
                  />
                </div>
              </div>

              <div className="admin-field">
                <label>{t('admin.vouchers.minSubtotal', 'Minimum Subtotal ($)')}</label>
                <input
                  type="number"
                  min="0"
                  className="admin-input"
                  value={form.minSubtotal}
                  onChange={(e) => setForm({ ...form, minSubtotal: e.target.value })}
                  placeholder="0"
                />
              </div>

              {/* Start Date & End Date / Time */}
              <div className="admin-field admin-field-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label>{t('admin.vouchers.startsAt', 'Start Date & Time')}</label>
                  <input
                    type="datetime-local"
                    className="admin-input"
                    value={form.startsAt}
                    onChange={(e) => setForm({ ...form, startsAt: e.target.value })}
                  />
                </div>

                <div>
                  <label>{t('admin.vouchers.expiresAt', 'End Date & Time')}</label>
                  <input
                    type="datetime-local"
                    className="admin-input"
                    value={form.expiresAt}
                    onChange={(e) => setForm({ ...form, expiresAt: e.target.value })}
                  />
                </div>
              </div>

              {error && (
                <div style={{ padding: '8px 12px', backgroundColor: '#FAF5F2', border: '1px solid #E8D3C8', borderRadius: '4px', color: '#8F534F', fontSize: '0.85rem', marginBottom: '16px' }}>
                  {error}
                </div>
              )}

              <div className="admin-modal-actions">
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={handleCloseModal}
                >
                  {t('admin.vouchers.btnCancel', 'Cancel')}
                </button>
                <button type="submit" className="admin-primary-btn">
                  {editingVoucher
                    ? t('admin.vouchers.btnSave', 'Save Changes')
                    : t('admin.vouchers.btnCreate', 'Create Voucher')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}