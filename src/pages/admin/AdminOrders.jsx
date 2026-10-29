import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomSelect from '../../components/CustomSelect';
import { 
  Search, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  X, 
  CheckCircle, 
  Clock, 
  Truck, 
  DollarSign, 
  ClipboardList,
  AlertTriangle
} from 'lucide-react';

/**
 * AdminOrders Component
 * Phụ trách: Thành viên 5 (Quản lý Đơn hàng cho Admin với ĐẦY ĐỦ CRUD)
 * Đồng bộ đa ngôn ngữ: Thành viên 1 & Thành viên 5
 */
export default function AdminOrders() {
  const { 
    orders, 
    products, 
    addOrder, 
    updateOrderStatus, 
    updateOrder, 
    deleteOrder 
  } = useShop();
  const { t, language } = useLanguage();

  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Modals state
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState(null);

  // New Order Form state
  const [newOrderForm, setNewOrderForm] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    customerAddress: '',
    productId: products[0]?.id || '',
    selectedSize: 'M',
    quantity: 1,
    paymentMethod: 'Cash on Delivery',
    notes: ''
  });

  // Edit Order Form state
  const [editOrderForm, setEditOrderForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    status: 'Pending',
    paymentMethod: 'Cash on Delivery'
  });

  // KPI Calculations
  const totalOrdersCount = orders.length;
  const pendingCount = orders.filter(o => o.status === 'Pending').length;
  const shippingCount = orders.filter(o => o.status === 'Shipping').length;
  const deliveredCount = orders.filter(o => o.status === 'Delivered').length;
  const totalRevenue = orders
    .filter(o => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (Number(o.totalAmount) || 0), 0);

  // Filtered Orders
  const filteredOrders = orders.filter(o => {
    const matchesStatus = statusFilter === 'all' || (o.status || '').toLowerCase() === statusFilter.toLowerCase();
    const searchLower = searchTerm.toLowerCase();
    const matchesSearch = 
      (o.id || '').toLowerCase().includes(searchLower) ||
      (o.customer?.name && o.customer.name.toLowerCase().includes(searchLower)) ||
      (o.customer?.phone && o.customer.phone.includes(searchLower)) ||
      (o.customer?.email && o.customer.email.toLowerCase().includes(searchLower));
    return matchesStatus && matchesSearch;
  });

  // Handle Create Order
  const handleCreateOrderSubmit = (e) => {
    e.preventDefault();
    const product = products.find(p => String(p.id) === String(newOrderForm.productId)) || products[0];
    if (!product) {
      alert("Please select a valid product.");
      return;
    }

    const qty = Math.max(1, Number(newOrderForm.quantity) || 1);
    const itemTotal = product.price * qty;

    const orderData = {
      customer: {
        name: newOrderForm.customerName.trim(),
        email: newOrderForm.customerEmail.trim(),
        phone: newOrderForm.customerPhone.trim(),
        address: newOrderForm.customerAddress.trim()
      },
      items: [
        {
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          selectedSize: newOrderForm.selectedSize,
          selectedColor: product.colors?.[0] || 'Default',
          quantity: qty
        }
      ],
      totalAmount: itemTotal,
      paymentMethod: newOrderForm.paymentMethod,
      status: 'Pending'
    };

    addOrder(orderData);
    setShowCreateModal(false);

    // Reset Form
    setNewOrderForm({
      customerName: '',
      customerEmail: '',
      customerPhone: '',
      customerAddress: '',
      productId: products[0]?.id || '',
      selectedSize: 'M',
      quantity: 1,
      paymentMethod: 'Cash on Delivery',
      notes: ''
    });
  };

  // Open Edit Modal
  const handleOpenEdit = (order) => {
    setSelectedOrder(order);
    setEditOrderForm({
      name: order.customer?.name || '',
      email: order.customer?.email || '',
      phone: order.customer?.phone || '',
      address: order.customer?.address || '',
      status: order.status || 'Pending',
      paymentMethod: order.paymentMethod || 'Cash on Delivery'
    });
    setShowEditModal(true);
  };

  // Submit Edit Modal
  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedOrder) return;

    // Check if status changed
    if (editOrderForm.status !== selectedOrder.status) {
      updateOrderStatus(selectedOrder.id, editOrderForm.status);
    }

    updateOrder(selectedOrder.id, {
      customer: {
        ...selectedOrder.customer,
        name: editOrderForm.name.trim(),
        email: editOrderForm.email.trim(),
        phone: editOrderForm.phone.trim(),
        address: editOrderForm.address.trim()
      },
      paymentMethod: editOrderForm.paymentMethod
    });

    setShowEditModal(false);
    setSelectedOrder(null);
  };

  // Handle Delete Confirmation
  const confirmDelete = () => {
    if (selectedOrder) {
      deleteOrder(selectedOrder.id);
      setShowDeleteModal(false);
      setSelectedOrder(null);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">{t('admin.orders.title', 'ORDER MANAGEMENT')}</h1>
          <p className="admin-subtitle">
            {t('admin.orders.subtitle', 'Inspect, process fulfillment status, edit recipient details, and create manual customer orders.')}
          </p>
        </div>
        <button
          type="button"
          className="admin-primary-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={16} /> {t('admin.orders.addNew', 'New Order')}
        </button>
      </div>

      {/* KPI Overview Cards - 4 Order Fulfillment Status Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <ClipboardList size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.dashboard.totalOrders', 'TOTAL ORDERS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {totalOrdersCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <Clock size={20} color="#CAA072" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.orders.filterPending', 'PENDING')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {pendingCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F9F2E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8AE84', flexShrink: 0 }}>
            <Truck size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.orders.filterShipping', 'SHIPPING')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {shippingCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F5EFEB', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <CheckCircle size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.orders.filterDelivered', 'DELIVERED')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {deliveredCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-card admin-toolbar">
        <div className="admin-search">
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder={t('admin.orders.searchPlaceholder', 'Search by Order ID, customer name, email or phone...')}
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <CustomSelect
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="admin-select"
        >
          <option value="all">{t('admin.orders.filterAll', 'All Statuses')} ({totalOrdersCount})</option>
          <option value="pending">{t('admin.orders.filterPending', 'Pending')} ({pendingCount})</option>
          <option value="shipping">{t('admin.orders.filterShipping', 'Shipping')} ({shippingCount})</option>
          <option value="delivered">{t('admin.orders.filterDelivered', 'Delivered')} ({deliveredCount})</option>
          <option value="cancelled">{t('admin.orders.filterCancelled', 'Cancelled')} ({orders.filter(o => o.status === 'Cancelled').length})</option>
        </CustomSelect>
        <span className="admin-count">{filteredOrders.length} {t('admin.orders.countUnit', 'orders')}</span>
      </div>

      {/* Orders Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th className="text-center" style={{ width: '13%' }}>{t('admin.orders.colOrderId', 'Order Ref')}</th>
                <th style={{ width: '22%' }}>{t('admin.orders.colCustomer', 'Customer')}</th>
                <th style={{ width: '21%' }}>{t('admin.orders.colItems', 'Items')}</th>
                <th className="text-center" style={{ width: '10%' }}>{t('admin.orders.colTotal', 'Total')}</th>
                <th className="text-center" style={{ width: '11%' }}>{t('admin.orders.colPayment', 'Payment')}</th>
                <th className="text-center" style={{ width: '12%' }}>{t('admin.orders.colStatus', 'Status')}</th>
                <th className="text-center" style={{ width: '11%' }}>{t('admin.orders.colActions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="admin-empty">
                    {t('common.noResults', 'No orders match your search and filter criteria.')}
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td className="text-center">
                      <strong style={{ color: '#2C2117', display: 'block', whiteSpace: 'nowrap' }}>{order.id}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#8F7965', whiteSpace: 'nowrap' }}>
                        {new Date(order.createdAt).toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#2C2117', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.customer?.name || 'Guest Client'}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#8F7965', whiteSpace: 'nowrap' }}>
                        {order.customer?.phone || 'No phone'}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#8F7965', maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={order.customer?.address}>
                        {order.customer?.address || 'Standard Address'}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', lineHeight: '1.4', maxWidth: '190px' }}>
                        {(order.items || []).map((it, idx) => (
                          <div key={idx} style={{ marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={`${it.quantity}x ${it.name} (${it.selectedSize})`}>
                            • <strong>{it.quantity}x</strong> {it.name} <span style={{ color: '#8F7965', fontSize: '0.75rem' }}>({it.selectedSize})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="text-center" style={{ fontWeight: 700, color: '#2C2117', fontSize: '0.92rem', whiteSpace: 'nowrap' }}>
                      ${order.totalAmount}
                    </td>
                    <td className="text-center">
                      <span style={{ fontSize: '0.78rem', color: '#2C2117', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', display: 'inline-block' }}>
                        {order.paymentMethod === 'Cash on Delivery' ? t('admin.orders.cod', 'COD') :
                         order.paymentMethod === 'Credit Card' ? t('admin.orders.creditCard', 'Credit Card') :
                         order.paymentMethod === 'Direct Bank Transfer' || (order.paymentMethod && (order.paymentMethod.includes('Bank') || order.paymentMethod.includes('VietQR'))) ? t('admin.orders.bankTransfer', 'Bank Transfer') : 
                         (order.paymentMethod || 'COD')}
                      </span>
                    </td>
                    <td className="text-center">
                      <div style={{ minWidth: '118px', maxWidth: '136px', margin: '0 auto' }}>
                        <CustomSelect
                          value={order.status || 'Pending'}
                          onChange={e => updateOrderStatus(order.id, e.target.value)}
                          style={{
                            padding: '4px 6px',
                            borderRadius: '4px',
                            border: `1px solid ${
                              order.status === 'Shipping' ? '#C8AE84' : '#E7DDCE'
                            }`,
                            backgroundColor: 
                              order.status === 'Delivered' ? '#F5EFEB' :
                              order.status === 'Shipping' ? '#F9F2E7' :
                              order.status === 'Cancelled' ? '#FAF8F5' : '#FAF7F2',
                            color: 
                              order.status === 'Delivered' ? '#2C2117' :
                              order.status === 'Shipping' ? '#775B3F' :
                              order.status === 'Cancelled' ? '#8F7965' : '#5C4A3A',
                            fontSize: '0.78rem',
                            fontWeight: 600,
                            cursor: 'pointer',
                            outline: 'none',
                            width: '100%'
                          }}
                        >
                          <option value="Pending">{t('admin.orders.filterPending', 'Pending')}</option>
                          <option value="Shipping">{t('admin.orders.filterShipping', 'Shipping')}</option>
                          <option value="Delivered">{t('admin.orders.filterDelivered', 'Delivered')}</option>
                          <option value="Cancelled">{t('admin.orders.filterCancelled', 'Cancelled')}</option>
                        </CustomSelect>
                      </div>
                    </td>
                    <td className="text-center">
                      <div className="admin-actions">
                        {/* View Details */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailModal(true);
                          }}
                          className="admin-icon-btn"
                          style={{ padding: '5px' }}
                          title={t('admin.orders.btnViewInvoice', 'View Details / Receipt')}
                        >
                          <Eye size={14} />
                        </button>

                        {/* Edit Order */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(order)}
                          className="admin-icon-btn edit"
                          style={{ padding: '5px' }}
                          title={t('admin.orders.btnEditInfo', 'Edit Recipient Details')}
                        >
                          <Edit3 size={14} />
                        </button>

                        {/* Delete Order */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDeleteModal(true);
                          }}
                          className="admin-icon-btn danger"
                          style={{ padding: '5px' }}
                          title={t('admin.orders.btnDeleteOrder', 'Delete Order')}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= MODAL: CREATE NEW ORDER (CREATE) ================= */}
      {showCreateModal && (
        <div className="admin-modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '620px' }}>
            <div className="admin-modal-header">
              <h3>{t('admin.orders.modalCreateTitle', 'CREATE NEW ORDER')}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit}>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>{t('admin.orders.labelCustomerName', 'Customer Name *')}</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={newOrderForm.customerName}
                    onChange={e => setNewOrderForm({ ...newOrderForm, customerName: e.target.value })}
                    placeholder="e.g. Alexander Vance"
                    required
                  />
                </div>
                <div className="admin-field">
                  <label>{t('admin.orders.labelCustomerPhone', 'Phone Number *')}</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={newOrderForm.customerPhone}
                    onChange={e => setNewOrderForm({ ...newOrderForm, customerPhone: e.target.value })}
                    placeholder="e.g. +84 903 888 999"
                    required
                  />
                </div>
              </div>

              <div className="admin-field">
                <label>{t('admin.orders.labelCustomerEmail', 'Email Address')}</label>
                <input
                  type="email"
                  className="admin-input"
                  value={newOrderForm.customerEmail}
                  onChange={e => setNewOrderForm({ ...newOrderForm, customerEmail: e.target.value })}
                  placeholder="e.g. customer@example.com"
                />
              </div>

              <div className="admin-field">
                <label>{t('admin.orders.labelCustomerAddress', 'Delivery Address *')}</label>
                <input
                  type="text"
                  className="admin-input"
                  value={newOrderForm.customerAddress}
                  onChange={e => setNewOrderForm({ ...newOrderForm, customerAddress: e.target.value })}
                  placeholder="Street, District, City"
                  required
                />
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>{t('admin.orders.labelSelectProduct', 'Select Product *')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={newOrderForm.productId}
                    onChange={e => setNewOrderForm({ ...newOrderForm, productId: e.target.value })}
                    required
                  >
                    {products.map(p => (
                      <option key={p.id} value={p.id}>
                        {p.name} (${p.price}) — Stock: {p.stock ?? 20}
                      </option>
                    ))}
                  </CustomSelect>
                </div>

                <div className="admin-field">
                  <label>{t('admin.orders.labelSize', 'Size')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={newOrderForm.selectedSize}
                    onChange={e => setNewOrderForm({ ...newOrderForm, selectedSize: e.target.value })}
                  >
                    <option value="XS">XS</option>
                    <option value="S">S</option>
                    <option value="M">M</option>
                    <option value="L">L</option>
                    <option value="XL">XL</option>
                    <option value="One Size">One Size</option>
                  </CustomSelect>
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>{t('admin.orders.labelQuantity', 'Quantity')}</label>
                  <input
                    type="number"
                    min="1"
                    className="admin-input"
                    value={newOrderForm.quantity}
                    onChange={e => setNewOrderForm({ ...newOrderForm, quantity: e.target.value })}
                    required
                  />
                </div>

                <div className="admin-field">
                  <label>{t('admin.orders.labelPaymentMethod', 'Payment Method')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={newOrderForm.paymentMethod}
                    onChange={e => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value })}
                  >
                    <option value="Cash on Delivery">{t('admin.orders.cod', 'Cash on Delivery')}</option>
                    <option value="Credit Card">{t('admin.orders.creditCard', 'Credit Card')}</option>
                    <option value="Direct Bank Transfer">{t('admin.orders.bankTransfer', 'Direct Bank Transfer')}</option>
                  </CustomSelect>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  {t('admin.orders.btnCancel', 'Cancel')}
                </button>
                <button type="submit" className="admin-primary-btn">
                  {t('admin.orders.btnCreateOrder', 'Create Order')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: VIEW DETAILS (READ) ================= */}
      {showDetailModal && selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setShowDetailModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '600px' }}>
            <div className="admin-modal-header">
              <div>
                <h3 style={{ margin: 0 }}>{t('admin.orders.modalDetailTitle', 'ORDER RECEIPT')}: {selectedOrder.id}</h3>
                <span style={{ fontSize: '0.8rem', color: '#8F7965' }}>
                  {t('admin.orders.placedOn', 'Placed on')} {new Date(selectedOrder.createdAt).toLocaleString(language === 'vi' ? 'vi-VN' : 'en-US')}
                </span>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setShowDetailModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px', padding: '14px', backgroundColor: '#FAF7F2', borderRadius: '4px', border: '1px solid #E7DDCE' }}>
              <div style={{ fontWeight: 600, color: '#2C2117', marginBottom: '4px' }}>{t('admin.orders.customerInfo', 'Customer Information')}</div>
              <div style={{ fontSize: '0.85rem', color: '#2C2117' }}><strong style={{ color: '#5C4A3A' }}>{t('admin.orders.name', 'Name')}:</strong> {selectedOrder.customer?.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#2C2117' }}><strong style={{ color: '#5C4A3A' }}>{t('admin.orders.phone', 'Phone')}:</strong> {selectedOrder.customer?.phone}</div>
              <div style={{ fontSize: '0.85rem', color: '#2C2117' }}><strong style={{ color: '#5C4A3A' }}>{t('admin.orders.email', 'Email')}:</strong> {selectedOrder.customer?.email || 'N/A'}</div>
              <div style={{ fontSize: '0.85rem', color: '#2C2117' }}><strong style={{ color: '#5C4A3A' }}>{t('admin.orders.address', 'Address')}:</strong> {selectedOrder.customer?.address}</div>
              <div style={{ fontSize: '0.85rem', color: '#2C2117' }}><strong style={{ color: '#5C4A3A' }}>{t('admin.orders.payment', 'Payment')}:</strong> {
                selectedOrder.paymentMethod === 'Cash on Delivery' ? t('admin.orders.cod', 'COD') :
                selectedOrder.paymentMethod === 'Credit Card' ? t('admin.orders.creditCard', 'Credit Card') :
                selectedOrder.paymentMethod === 'Direct Bank Transfer' ? t('admin.orders.bankTransfer', 'Bank Transfer') :
                selectedOrder.paymentMethod
              }</div>
              <div style={{ fontSize: '0.85rem', color: '#2C2117' }}><strong style={{ color: '#5C4A3A' }}>{t('admin.orders.status', 'Status')}:</strong> <span style={{ fontWeight: 600 }}>{
                selectedOrder.status === 'Pending' ? t('admin.orders.filterPending', 'Pending') :
                selectedOrder.status === 'Shipping' ? t('admin.orders.filterShipping', 'Shipping') :
                selectedOrder.status === 'Delivered' ? t('admin.orders.filterDelivered', 'Delivered') :
                selectedOrder.status === 'Cancelled' ? t('admin.orders.filterCancelled', 'Cancelled') :
                selectedOrder.status
              }</span></div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 600, color: '#2C2117', marginBottom: '10px' }}>{t('admin.orders.purchasedItems', 'Purchased Items')}</div>
              {(selectedOrder.items || []).map((it, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #F0E8DC' }}>
                  <img
                    src={it.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300'}
                    alt={it.name}
                    style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E7DDCE' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#2C2117' }}>{it.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#8F7965' }}>
                      Size: {it.selectedSize || 'Standard'} • Quantity: {it.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, color: '#2C2117' }}>
                    ${it.price * it.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #E7DDCE', paddingTop: '16px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>{t('admin.orders.totalOrderValue', 'Total Order Value:')}</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#2C2117' }}>${selectedOrder.totalAmount}</span>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-primary-btn"
                onClick={() => setShowDetailModal(false)}
              >
                {t('admin.orders.closeReceipt', 'Close Receipt')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: EDIT ORDER DETAILS (UPDATE) ================= */}
      {showEditModal && selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '540px' }}>
            <div className="admin-modal-header">
              <h3>{t('admin.orders.modalEditTitle', 'EDIT ORDER')} {selectedOrder.id}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="admin-field">
                <label>{t('admin.orders.labelCustomerName', 'Recipient Name *')}</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editOrderForm.name}
                  onChange={e => setEditOrderForm({ ...editOrderForm, name: e.target.value })}
                  required
                />
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>{t('admin.orders.labelCustomerPhone', 'Recipient Phone *')}</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editOrderForm.phone}
                    onChange={e => setEditOrderForm({ ...editOrderForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-field">
                  <label>{t('admin.orders.labelCustomerEmail', 'Recipient Email')}</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={editOrderForm.email}
                    onChange={e => setEditOrderForm({ ...editOrderForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label>{t('admin.orders.labelCustomerAddress', 'Delivery Address *')}</label>
                <input
                  type="text"
                  className="admin-input"
                  value={editOrderForm.address}
                  onChange={e => setEditOrderForm({ ...editOrderForm, address: e.target.value })}
                  required
                />
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>{t('admin.orders.labelStatus', 'Order Status')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={editOrderForm.status}
                    onChange={e => setEditOrderForm({ ...editOrderForm, status: e.target.value })}
                  >
                    <option value="Pending">{t('admin.orders.filterPending', 'Pending')}</option>
                    <option value="Shipping">{t('admin.orders.filterShipping', 'Shipping')}</option>
                    <option value="Delivered">{t('admin.orders.filterDelivered', 'Delivered')}</option>
                    <option value="Cancelled">{t('admin.orders.filterCancelled', 'Cancelled')}</option>
                  </CustomSelect>
                </div>

                <div className="admin-field">
                  <label>{t('admin.orders.labelPaymentMethod', 'Payment Method')}</label>
                  <CustomSelect
                    className="admin-input"
                    value={editOrderForm.paymentMethod}
                    onChange={e => setEditOrderForm({ ...editOrderForm, paymentMethod: e.target.value })}
                  >
                    <option value="Cash on Delivery">{t('admin.orders.cod', 'Cash on Delivery')}</option>
                    <option value="Credit Card">{t('admin.orders.creditCard', 'Credit Card')}</option>
                    <option value="Direct Bank Transfer">{t('admin.orders.bankTransfer', 'Direct Bank Transfer')}</option>
                  </CustomSelect>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  {t('admin.orders.btnCancel', 'Cancel')}
                </button>
                <button type="submit" className="admin-primary-btn">
                  {t('admin.orders.btnSaveChanges', 'Save Changes')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL: DELETE CONFIRMATION (DELETE) ================= */}
      {showDeleteModal && selectedOrder && (
        <div className="admin-modal-overlay" onClick={() => setShowDeleteModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: '460px' }}>
            <div className="admin-modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#DC2626' }}>
                <AlertTriangle size={22} />
                <h3 style={{ margin: 0, color: '#DC2626' }}>{t('admin.orders.modalDeleteTitle', 'Delete Order')}</h3>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setShowDeleteModal(false)}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#5C4A3A', margin: '0 0 20px' }}>
              {t('admin.orders.deleteConfirmText', 'Are you sure you want to permanently delete this order?')} (<strong>{selectedOrder.id}</strong>)
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                {t('admin.orders.btnCancel', 'Cancel')}
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
                {t('admin.orders.btnConfirmDelete', 'Confirm Delete')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
