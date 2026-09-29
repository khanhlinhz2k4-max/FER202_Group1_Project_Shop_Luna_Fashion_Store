import React from 'react';
import { useShop } from '../../context/ShopContext';
import { DollarSign, ShoppingBag, ClipboardList, Users, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AdminDashboard Component
 * Phụ trách: Thành viên 6 (Phân hệ Quản trị viên)
 */
export default function AdminDashboard() {
  const { products, orders, users } = useShop();

  const totalRevenue = orders.reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);
  const recentOrders = orders.slice(0, 5);

  const kpis = [
    { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "#10B981", bg: "#ECFDF5" },
    { title: "Total Orders", value: orders.length, icon: ClipboardList, color: "#3B82F6", bg: "#EFF6FF" },
    { title: "Live Products", value: products.length, icon: ShoppingBag, color: "#F59E0B", bg: "#FFFBEB" },
    { title: "Registered Users", value: users.length, icon: Users, color: "#8B5CF6", bg: "#F5F3FF" }
  ];

  return (
    <div>
      <div style={{ marginBottom: '28px' }}>
        <h1 style={{ fontSize: '1.7rem', fontWeight: 700, margin: '0 0 6px', color: '#0F172A' }}>STORE DASHBOARD</h1>
        <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>Real-time overview of metrics and incoming customer orders.</p>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '8px', backgroundColor: kpi.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} color={kpi.color} />
              </div>
              <div>
                <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500, textTransform: 'uppercase' }}>{kpi.title}</span>
                <h3 style={{ margin: '4px 0 0', fontSize: '1.4rem', fontWeight: 700, color: '#0F172A' }}>{kpi.value}</h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 style={{ fontSize: '1.1rem', fontWeight: 700, margin: '0 0 4px', color: '#0F172A' }}>RECENT ORDERS</h2>
            <p style={{ margin: 0, fontSize: '0.85rem', color: '#64748B' }}>Latest orders needing fulfillment review</p>
          </div>
          <Link to="/admin/orders" style={{ fontSize: '0.85rem', color: '#3B82F6', textDecoration: 'none', fontWeight: 600 }}>
            View All Orders →
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td style={{ fontWeight: 600, color: '#0F172A' }}>{order.id}</td>
                  <td>
                    <div><strong>{order.customer?.name}</strong></div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>{order.customer?.phone}</div>
                  </td>
                  <td>{order.items?.length || 0} items</td>
                  <td style={{ fontWeight: 600 }}>${order.totalAmount}</td>
                  <td>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      backgroundColor: order.status === 'Delivered' ? '#DCFCE7' : order.status === 'Shipping' ? '#FEF9C3' : '#F1F5F9',
                      color: order.status === 'Delivered' ? '#166534' : order.status === 'Shipping' ? '#854D0E' : '#334155'
                    }}>
                      {order.status}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8rem', color: '#64748B' }}>
                    {new Date(order.createdAt).toLocaleDateString()}
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
