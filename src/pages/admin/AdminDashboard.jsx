import React from 'react';
import { useShop } from '../../context/ShopContext';
import { useLanguage } from '../../context/LanguageContext';
import { DollarSign, ShoppingBag, ClipboardList, Users, ArrowUpRight, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AdminDashboard Component
 * Phụ trách: Thành viên 6 (Phân hệ Quản trị viên)
 * Đồng bộ đa ngôn ngữ: Thành viên 1 & Thành viên 6
 */
export default function AdminDashboard() {
  const { products, orders, users } = useShop();
  const { t } = useLanguage();

  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const kpis = [
    { title: t('admin.dashboard.totalRevenue', 'TOTAL REVENUE'), value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: "#775B3F", bg: "#F9F2E7" },
    { title: t('admin.dashboard.totalOrders', 'TOTAL ORDERS'), value: orders.length, icon: ClipboardList, color: "#CAA072", bg: "#FAF7F2" },
    { title: t('admin.dashboard.liveProducts', 'LIVE PRODUCTS'), value: products.length, icon: ShoppingBag, color: "#775B3F", bg: "#F5EFEB" },
    { title: t('admin.dashboard.registeredUsers', 'REGISTERED USERS'), value: users.length, icon: Users, color: "#C8AE84", bg: "#FAF8F5" }
  ];

  return (
    <div>
      <div className="admin-page-header" style={{ marginBottom: '28px' }}>
        <div>
          <h1 className="admin-title">{t('admin.dashboard.title', 'STORE DASHBOARD')}</h1>
          <p className="admin-subtitle">{t('admin.dashboard.subtitle', 'Real-time overview of metrics and incoming customer orders.')}</p>
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
                <span style={{ fontSize: 'var(--text-badge)', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{kpi.title}</span>
                <h3 style={{ 
                  margin: '3px 0 0', 
                  fontFamily: 'var(--font-sans)', 
                  fontSize: '1.6rem', 
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
            <h2 className="admin-section-title">{t('admin.dashboard.recentOrdersTitle', 'RECENT ORDERS')}</h2>
            <p className="admin-subtitle">{t('admin.dashboard.recentOrdersSubtitle', 'Latest orders needing fulfillment review')}</p>
          </div>
          <Link to="/admin/orders" style={{ fontSize: '0.85rem', color: '#775B3F', textDecoration: 'none', fontWeight: 600 }}>
            {t('admin.dashboard.viewAllOrders', 'View All Orders →')}
          </Link>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>{t('admin.dashboard.colOrderId', 'Order ID')}</th>
                <th>{t('admin.dashboard.colCustomer', 'Customer')}</th>
                <th>{t('admin.dashboard.colItems', 'Items')}</th>
                <th>{t('admin.dashboard.colTotal', 'Total')}</th>
                <th>{t('admin.dashboard.colStatus', 'Status')}</th>
                <th>{t('admin.dashboard.colDate', 'Date')}</th>
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
                  <td>{order.items?.length || 0} {t('common.items', 'items')}</td>
                  <td style={{ fontWeight: 600 }}>${order.totalAmount}</td>
                  <td>
                    <span className={`admin-status admin-status-${String(order.status).toLowerCase()}`}>
                      {order.status === 'Pending' ? t('admin.orders.filterPending', 'Pending') :
                       order.status === 'Shipping' ? t('admin.orders.filterShipping', 'Shipping') :
                       order.status === 'Delivered' ? t('admin.orders.filterDelivered', 'Delivered') :
                       order.status === 'Cancelled' ? t('admin.orders.filterCancelled', 'Cancelled') : order.status}
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
