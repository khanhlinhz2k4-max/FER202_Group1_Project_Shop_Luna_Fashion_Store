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

 const totalRevenue = orders
  .filter((o) => o.status !== 'Cancelled')
  .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

const recentOrders = [...orders]
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5);

  const kpis = [
    { title: "Total Revenue", value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "#775B3F", bg: "#F9F2E7" },
    { title: "Total Orders", value: orders.length, icon: ClipboardList, color: "#CAA072", bg: "#FAF7F2" },
    { title: "Live Products", value: products.length, icon: ShoppingBag, color: "#775B3F", bg: "#F5EFEB" },
    { title: "Registered Users", value: users.length, icon: Users, color: "#C8AE84", bg: "#FAF8F5" }
  ];

  return (
    <div>
      <div className="admin-page-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="admin-title">STORE DASHBOARD</h1>
          <p className="admin-subtitle">Real-time overview of metrics and incoming customer orders.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;
          return (
            <div key={idx} className="admin-card" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '6px', backgroundColor: kpi.bg, border: '1px solid #E7DDCE', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon size={24} color={kpi.color} />
              </div>
              <div>
                <span style={{ fontSize: '0.78rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{kpi.title}</span>
                <h3 style={{ 
                  margin: '3px 0 0', 
                  fontFamily: 'Montserrat, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', 
                  fontSize: '1.65rem', 
                  fontWeight: 700, 
                  color: '#2C2117',
                  fontVariantNumeric: 'lining-nums tabular-nums',
                  letterSpacing: '-0.02em'
                }}>
                  {kpi.value}
                </h3>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Orders Table */}
      <div className="admin-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <div>
            <h2 className="admin-section-title">RECENT ORDERS</h2>
            <p className="admin-subtitle">Latest orders needing fulfillment review</p>
          </div>
          <Link to="/admin/orders" style={{ fontSize: '0.85rem', color: '#775B3F', textDecoration: 'none', fontWeight: 600 }}>
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
                    <span className={`admin-status admin-status-${String(order.status).toLowerCase()}`}>
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
