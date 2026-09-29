import React from 'react';
import { useShop } from '../../context/ShopContext';
import { UserCheck, Shield } from 'lucide-react';

/**
 * AdminUsers Component
 * Phụ trách: Thành viên 5 (Quản lý Người dùng cho Admin)
 */
export default function AdminUsers() {
  const { users } = useShop();

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, margin: '0 0 6px', color: '#0F172A' }}>REGISTERED CLIENTS</h1>
        <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>
          Accounts registered on the Lune Storefront and their assigned roles.
        </p>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Client Name</th>
                <th>Email Address</th>
                <th>Phone Number</th>
                <th>Default Delivery Address</th>
                <th>System Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u.id}>
                  <td>
                    <strong style={{ color: '#0F172A' }}>{u.name}</strong>
                  </td>
                  <td>{u.email}</td>
                  <td>{u.phone || '—'}</td>
                  <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {u.address || '—'}
                  </td>
                  <td>
                    <span style={{
                      padding: '4px 10px',
                      borderRadius: '12px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: u.role === 'admin' ? '#FEF3C7' : '#EFF6FF',
                      color: u.role === 'admin' ? '#92400E' : '#1E40AF'
                    }}>
                      {u.role === 'admin' ? '🛡️ Admin' : '👤 Customer'}
                    </span>
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
