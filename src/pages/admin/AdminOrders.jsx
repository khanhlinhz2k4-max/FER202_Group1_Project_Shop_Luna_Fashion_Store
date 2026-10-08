import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
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
 *  - Create: Nút "+ New Order" tạo đơn thủ công với chọn sản phẩm, tính tiền, trừ kho.
 *  - Read: Tìm kiếm, lọc theo trạng thái, thẻ thống kê KPI, modal xem chi tiết đơn hàng (Invoice).
 *  - Update: Chuyển đổi trạng thái (Pending -> Shipping -> Delivered -> Cancelled), chỉnh sửa thông tin giao nhận.
 *  - Delete: Xóa đơn hàng kèm modal xác nhận.
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
          <h1 className="admin-title">ORDER MANAGEMENT</h1>
          <p className="admin-subtitle">
            Inspect, process fulfillment status, edit recipient details, and create manual customer orders.
          </p>
        </div>
        <button
          type="button"
          className="admin-primary-btn"
          onClick={() => setShowCreateModal(true)}
        >
          <Plus size={16} /> New Order
        </button>
      </div>

      {/* KPI Overview Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE' }}>
            <ClipboardList size={20} color="#775B3F" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#5C4A3A', fontWeight: 600, textTransform: 'uppercase' }}>Total Orders</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117' }}>{totalOrdersCount}</h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #FCD34D' }}>
            <Clock size={20} color="#92400E" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#92400E', fontWeight: 600, textTransform: 'uppercase' }}>Pending</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#92400E' }}>{pendingCount}</h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#E0F2FE', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #BAE6FD' }}>
            <Truck size={20} color="#0369A1" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#0369A1', fontWeight: 600, textTransform: 'uppercase' }}>Shipping</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#0369A1' }}>{shippingCount}</h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #BBF7D0' }}>
            <CheckCircle size={20} color="#166534" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#166534', fontWeight: 600, textTransform: 'uppercase' }}>Delivered</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#166534' }}>{deliveredCount}</h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F9F2E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8AE84' }}>
            <DollarSign size={20} color="#775B3F" />
          </div>
          <div>
            <span style={{ fontSize: '0.75rem', color: '#775B3F', fontWeight: 600, textTransform: 'uppercase' }}>Revenue</span>
            <h3 style={{ margin: '2px 0 0', fontSize: '1.4rem', fontFamily: 'Montserrat, sans-serif', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#775B3F' }}>${totalRevenue.toLocaleString()}</h3>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="admin-card" style={{ marginBottom: '24px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '260px', backgroundColor: '#FAF7F2', padding: '8px 14px', borderRadius: '4px', border: '1px solid #E7DDCE' }}>
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder="Search by Order ID, customer name, email or phone..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.88rem', color: '#2C2117' }}
          />
        </div>

        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: '9px 14px', borderRadius: '4px', border: '1px solid #E7DDCE', outline: 'none', backgroundColor: '#fff', fontSize: '0.88rem', color: '#2C2117', cursor: 'pointer' }}
        >
          <option value="all">All Statuses ({totalOrdersCount})</option>
          <option value="pending">Pending ({pendingCount})</option>
          <option value="shipping">Shipping ({shippingCount})</option>
          <option value="delivered">Delivered ({deliveredCount})</option>
          <option value="cancelled">Cancelled ({orders.filter(o => o.status === 'Cancelled').length})</option>
        </select>
      </div>

      {/* Orders Table */}
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
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '48px', color: '#64748B' }}>
                    No orders match your search and filter criteria.
                  </td>
                </tr>
              ) : (
                filteredOrders.map(order => (
                  <tr key={order.id}>
                    <td>
                      <strong style={{ color: '#2C2117', display: 'block' }}>{order.id}</strong>
                      <span style={{ fontSize: '0.78rem', color: '#64748B' }}>
                        {new Date(order.createdAt).toLocaleDateString()}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: '#2C2117' }}>{order.customer?.name || 'Guest Client'}</div>
                      <div style={{ fontSize: '0.8rem', color: '#64748B' }}>{order.customer?.phone || 'No phone'}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94A3B8', maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {order.customer?.address || 'Standard Address'}
                      </div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>
                        {(order.items || []).map((it, idx) => (
                          <div key={idx} style={{ marginBottom: '2px' }}>
                            • <strong>{it.quantity}x</strong> {it.name} <span style={{ color: '#64748B', fontSize: '0.78rem' }}>({it.selectedSize})</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td style={{ fontWeight: 700, color: '#775B3F', fontSize: '0.95rem' }}>
                      ${order.totalAmount}
                    </td>
                    <td>
                      <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        {order.paymentMethod || 'COD'}
                      </span>
                    </td>
                    <td>
                      <select
                        value={order.status || 'Pending'}
                        onChange={e => updateOrderStatus(order.id, e.target.value)}
                        style={{
                          padding: '6px 10px',
                          borderRadius: '4px',
                          border: '1px solid #CBD5E1',
                          backgroundColor: 
                            order.status === 'Delivered' ? '#DCFCE7' :
                            order.status === 'Shipping' ? '#E0F2FE' :
                            order.status === 'Cancelled' ? '#FEE2E2' : '#FEF3C7',
                          color: 
                            order.status === 'Delivered' ? '#166534' :
                            order.status === 'Shipping' ? '#0369A1' :
                            order.status === 'Cancelled' ? '#991B1B' : '#92400E',
                          fontSize: '0.82rem',
                          fontWeight: 600,
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
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '8px' }}>
                        {/* View Details */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDetailModal(true);
                          }}
                          style={{
                            padding: '6px',
                            background: '#FAF7F2',
                            border: '1px solid #E7DDCE',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            color: '#775B3F'
                          }}
                          title="View Details / Receipt"
                        >
                          <Eye size={15} />
                        </button>

                        {/* Edit Order */}
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(order)}
                          style={{
                            padding: '6px',
                            background: '#FAF7F2',
                            border: '1px solid #E7DDCE',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            color: '#2C2117'
                          }}
                          title="Edit Recipient Details"
                        >
                          <Edit3 size={15} />
                        </button>

                        {/* Delete Order */}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowDeleteModal(true);
                          }}
                          style={{
                            padding: '6px',
                            background: '#FEF2F2',
                            border: '1px solid #FECACA',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            color: '#DC2626'
                          }}
                          title="Delete Order"
                        >
                          <Trash2 size={15} />
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
              <h3>CREATE NEW ORDER</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowCreateModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleCreateOrderSubmit}>
              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Customer Name *</label>
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
                  <label>Phone Number *</label>
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
                <label>Email Address</label>
                <input
                  type="email"
                  className="admin-input"
                  value={newOrderForm.customerEmail}
                  onChange={e => setNewOrderForm({ ...newOrderForm, customerEmail: e.target.value })}
                  placeholder="e.g. customer@example.com"
                />
              </div>

              <div className="admin-field">
                <label>Delivery Address *</label>
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
                  <label>Select Product *</label>
                  <select
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
                  </select>
                </div>

                <div className="admin-field">
                  <label>Size</label>
                  <select
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
                  </select>
                </div>
              </div>

              <div className="admin-field-row">
                <div className="admin-field">
                  <label>Quantity</label>
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
                  <label>Payment Method</label>
                  <select
                    className="admin-input"
                    value={newOrderForm.paymentMethod}
                    onChange={e => setNewOrderForm({ ...newOrderForm, paymentMethod: e.target.value })}
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Create Order
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
                <h3 style={{ margin: 0 }}>ORDER RECEIPT: {selectedOrder.id}</h3>
                <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                  Placed on {new Date(selectedOrder.createdAt).toLocaleString()}
                </span>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setShowDetailModal(false)}>
                <X size={20} />
              </button>
            </div>

            <div style={{ marginBottom: '20px', padding: '14px', backgroundColor: '#FAF7F2', borderRadius: '4px', border: '1px solid #E7DDCE' }}>
              <div style={{ fontWeight: 600, color: '#2C2117', marginBottom: '4px' }}>Customer Information</div>
              <div style={{ fontSize: '0.85rem', color: '#5C4A3A' }}><strong>Name:</strong> {selectedOrder.customer?.name}</div>
              <div style={{ fontSize: '0.85rem', color: '#5C4A3A' }}><strong>Phone:</strong> {selectedOrder.customer?.phone}</div>
              <div style={{ fontSize: '0.85rem', color: '#5C4A3A' }}><strong>Email:</strong> {selectedOrder.customer?.email || 'N/A'}</div>
              <div style={{ fontSize: '0.85rem', color: '#5C4A3A' }}><strong>Address:</strong> {selectedOrder.customer?.address}</div>
              <div style={{ fontSize: '0.85rem', color: '#5C4A3A' }}><strong>Payment:</strong> {selectedOrder.paymentMethod}</div>
              <div style={{ fontSize: '0.85rem', color: '#5C4A3A' }}><strong>Status:</strong> <span style={{ fontWeight: 600 }}>{selectedOrder.status}</span></div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontWeight: 600, color: '#2C2117', marginBottom: '10px' }}>Purchased Items</div>
              {(selectedOrder.items || []).map((it, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '8px 0', borderBottom: '1px solid #F0E8DC' }}>
                  <img
                    src={it.image || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=300'}
                    alt={it.name}
                    style={{ width: '48px', height: '60px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #E7DDCE' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.88rem', color: '#2C2117' }}>{it.name}</div>
                    <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                      Size: {it.selectedSize || 'Standard'} • Quantity: {it.quantity}
                    </div>
                  </div>
                  <div style={{ fontWeight: 600, color: '#775B3F' }}>
                    ${it.price * it.quantity}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '2px solid #E7DDCE', paddingTop: '16px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 600 }}>Total Order Value:</span>
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color: '#775B3F' }}>${selectedOrder.totalAmount}</span>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'right' }}>
              <button
                type="button"
                className="admin-primary-btn"
                onClick={() => setShowDetailModal(false)}
              >
                Close Receipt
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
              <h3>EDIT ORDER {selectedOrder.id}</h3>
              <button type="button" className="admin-modal-close" onClick={() => setShowEditModal(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleEditSubmit}>
              <div className="admin-field">
                <label>Recipient Name *</label>
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
                  <label>Recipient Phone *</label>
                  <input
                    type="text"
                    className="admin-input"
                    value={editOrderForm.phone}
                    onChange={e => setEditOrderForm({ ...editOrderForm, phone: e.target.value })}
                    required
                  />
                </div>
                <div className="admin-field">
                  <label>Recipient Email</label>
                  <input
                    type="email"
                    className="admin-input"
                    value={editOrderForm.email}
                    onChange={e => setEditOrderForm({ ...editOrderForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-field">
                <label>Delivery Address *</label>
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
                  <label>Order Status</label>
                  <select
                    className="admin-input"
                    value={editOrderForm.status}
                    onChange={e => setEditOrderForm({ ...editOrderForm, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipping">Shipping</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>

                <div className="admin-field">
                  <label>Payment Method</label>
                  <select
                    className="admin-input"
                    value={editOrderForm.paymentMethod}
                    onChange={e => setEditOrderForm({ ...editOrderForm, paymentMethod: e.target.value })}
                  >
                    <option value="Cash on Delivery">Cash on Delivery</option>
                    <option value="Credit Card">Credit Card</option>
                    <option value="Direct Bank Transfer">Direct Bank Transfer</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '24px' }}>
                <button
                  type="button"
                  className="admin-secondary-btn"
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="admin-primary-btn">
                  Save Changes
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
                <h3 style={{ margin: 0, color: '#DC2626' }}>Delete Order</h3>
              </div>
              <button type="button" className="admin-modal-close" onClick={() => setShowDeleteModal(false)}>
                <X size={20} />
              </button>
            </div>

            <p style={{ fontSize: '0.92rem', color: '#5C4A3A', margin: '0 0 20px' }}>
              Are you sure you want to permanently delete Order <strong>{selectedOrder.id}</strong> placed by <strong>{selectedOrder.customer?.name}</strong>?
              This action cannot be undone.
            </p>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="admin-secondary-btn"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
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
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
