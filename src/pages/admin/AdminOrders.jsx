import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Search, Filter, CheckCircle, Clock, Truck, XCircle } from 'lucide-react';

/**
 * AdminOrders Component
 * Phụ trách: Thành viên 5 (Quản lý Đơn hàng cho Admin)
 */
export default function AdminOrders() {
  const { orders, updateOrderStatus } = useShop();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || o.status.toLowerCase() === statusFilter.toLowerCase();
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (o.customer?.name && o.customer.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          (o.customer?.phone && o.customer.phone.includes(searchTerm));
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">ORDER FULFILLMENT</h1>
          <p className="admin-subtitle">
            Inspect orders placed by customers and progress status (Pending → Shipping → Delivered).
          </p>
        </div>
      </div>

      {/* Filter bar */}
      <div className="admin-card" style={{ marginBottom: '24px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', backgroundColor: '#FAF7F2', padding: '8px 14px', borderRadius: '4px', border: '1px solid #E7DDCE' }}>
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name or phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.88rem', color: '#2C2117' }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '8px 14px', borderRadius: '4px', border: '1px solid #E7DDCE', outline: 'none', backgroundColor: '#fff', fontSize: '0.88rem', color: '#2C2117' }}
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="shipping">Shipping</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order Ref</th>
                <th>Recipient & Contact</th>
                <th>Items Ordered</th>
                <th>Total ($)</th>
                <th>Payment</th>
                <th>Current Status</th>
                <th style={{ textAlign: 'right' }}>Update Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    No orders match your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong style={{ color: '#0F172A', display: 'block' }}>{order.id}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#0F172A' }}>{order.customer?.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{order.customer?.phone}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.customer?.address}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>
                        {(order.items || []).map((it, idx) => (
                          <div key={idx}>
                            • {it.quantity}x {it.name} <span style={{ color: '#64748B' }}>({it.selectedSize})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#0F172A' }}>${order.totalAmount}</td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        {order.paymentMethod || 'COD'}
                      </span>
                    </td>
                    <td>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                        backgroundColor: 
                          order.status === 'Delivered' ? '#DCFCE7' :
                          order.status === 'Shipping' ? '#FEF9C3' :
                          order.status === 'Cancelled' ? '#FEE2E2' : '#F1F5F9',
                        color: 
                          order.status === 'Delivered' ? '#166534' :
                          order.status === 'Shipping' ? '#854D0E' :
                          order.status === 'Cancelled' ? '#991B1B' : '#334155'
                      }}>
                        {order.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <select
                        value={order.status}
                        onChange={e => updateOrderStatus(order.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: '#fff',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          cursor: 'pointer',
                          outline: 'none'
                        }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Shipping">Shipping</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
