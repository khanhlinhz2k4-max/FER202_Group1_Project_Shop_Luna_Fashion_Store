import React, { useState } from 'react';
import { CheckCircle2, Plus, Tag, Trash2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

const initialForm = {
  code: '',
  discountType: 'percent',
  discountValue: '',
  minSubtotal: '0',
  expiresAt: ''
};

export default function AdminVouchers() {
  const { vouchers, addVoucher, toggleVoucher, deleteVoucher } = useShop();
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const code = form.code.trim().toUpperCase();
    const value = Number(form.discountValue);
    const minimum = Number(form.minSubtotal);

    if (!/^[A-Z0-9_-]{3,24}$/.test(code)) {
      setError('Code must be 3-24 characters using letters, numbers, _ or -.');
      return;
    }
    if (vouchers.some(voucher => voucher.code.toUpperCase() === code)) {
      setError('This voucher code already exists.');
      return;
    }
    if (!Number.isFinite(value) || value <= 0 || (form.discountType === 'percent' && value > 100)) {
      setError(form.discountType === 'percent' ? 'Percentage must be between 1 and 100.' : 'Discount must be greater than 0.');
      return;
    }
    if (!Number.isFinite(minimum) || minimum < 0) {
      setError('Minimum order must be zero or greater.');
      return;
    }

    addVoucher({ ...form, code, discountValue: value, minSubtotal: minimum });
    setForm(initialForm);
    setError('');
    setNotice(`Voucher ${code} created.`);
    window.setTimeout(() => setNotice(''), 2500);
  };

  const handleDelete = (voucher) => {
    if (window.confirm(`Delete voucher ${voucher.code}?`)) deleteVoucher(voucher.id);
  };

  return (
    <div>
      {notice && <div className="admin-toast"><CheckCircle2 size={16} /><span>{notice}</span></div>}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">VOUCHER MANAGEMENT</h1>
          <p className="admin-subtitle">Create and manage discounts available at checkout.</p>
        </div>
      </div>

      <form className="admin-card" onSubmit={handleSubmit} noValidate style={{ marginBottom: '24px' }}>
        <h2 style={{ margin: '0 0 18px', fontSize: '1rem', color: '#0F172A' }}>Create voucher</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
          <label className="admin-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <span>Voucher code *</span>
            <input value={form.code} onChange={event => setForm({ ...form, code: event.target.value })} placeholder="e.g. LUNE15" maxLength={24} />
          </label>
          <label className="admin-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <span>Discount type *</span>
            <select value={form.discountType} onChange={event => setForm({ ...form, discountType: event.target.value })}>
              <option value="percent">Percentage (%)</option>
              <option value="fixed">Fixed amount ($)</option>
            </select>
          </label>
          <label className="admin-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <span>Discount value *</span>
            <input type="number" min="1" max={form.discountType === 'percent' ? '100' : undefined} value={form.discountValue} onChange={event => setForm({ ...form, discountValue: event.target.value })} placeholder={form.discountType === 'percent' ? '10' : '20'} />
          </label>
          <label className="admin-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <span>Minimum subtotal ($)</span>
            <input type="number" min="0" value={form.minSubtotal} onChange={event => setForm({ ...form, minSubtotal: event.target.value })} />
          </label>
          <label className="admin-field" style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: 0 }}>
            <span>Expiration date</span>
            <input type="date" value={form.expiresAt} onChange={event => setForm({ ...form, expiresAt: event.target.value })} />
          </label>
        </div>
        {error && <p role="alert" style={{ margin: '12px 0 0', color: '#B91C1C', fontSize: '0.85rem' }}>{error}</p>}
        <button type="submit" className="admin-primary-btn" style={{ marginTop: '18px' }}><Plus size={17} /> Create voucher</button>
      </form>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag size={18} color="#775B3F" />
          <h2 style={{ margin: 0, fontSize: '1rem' }}>Vouchers ({vouchers.length})</h2>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead><tr><th>Code</th><th>Discount</th><th>Minimum subtotal</th><th>Expires</th><th>Status</th><th style={{ textAlign: 'right' }}>Actions</th></tr></thead>
            <tbody>
              {vouchers.length === 0 ? (
                <tr><td colSpan="6" className="admin-empty">No vouchers created yet.</td></tr>
              ) : vouchers.map(voucher => (
                <tr key={voucher.id}>
                  <td><strong>{voucher.code}</strong></td>
                  <td>{voucher.discountType === 'percent' ? `${voucher.discountValue}%` : `$${voucher.discountValue}`}</td>
                  <td>${Number(voucher.minSubtotal) || 0}</td>
                  <td>{voucher.expiresAt || 'No expiry'}</td>
                  <td><span className="admin-cat-badge" style={{ color: voucher.isActive ? '#166534' : '#64748B', backgroundColor: voucher.isActive ? '#DCFCE7' : '#F1F5F9' }}>{voucher.isActive ? 'Active' : 'Inactive'}</span></td>
                  <td>
                    <div className="admin-actions">
                      <button type="button" className="admin-secondary-btn" onClick={() => toggleVoucher(voucher.id)}>{voucher.isActive ? 'Disable' : 'Enable'}</button>
                      <button type="button" title={`Delete ${voucher.code}`} className="admin-icon-btn danger" onClick={() => handleDelete(voucher)}><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}