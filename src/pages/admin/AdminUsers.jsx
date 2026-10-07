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
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">REGISTERED CLIENTS</h1>
          <p className="admin-subtitle">
            Accounts registered on the Lune Storefront and their assigned roles.
          </p>
        </div>
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
                    <strong style={{ color: '#2C2117' }}>{u.name}</strong>
                  </td>
                  <td style={{ color: '#5C4A3A' }}>{u.email}</td>
                  <td style={{ color: '#5C4A3A' }}>{u.phone || '—'}</td>
                  <td style={{ maxWidth: '250px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: '#5C4A3A' }}>
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
