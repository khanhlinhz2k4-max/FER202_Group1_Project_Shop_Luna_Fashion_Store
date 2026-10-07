import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { Plus, Edit2, Trash2, Search, X, Eye, CheckCircle2 } from 'lucide-react';

const DEFAULT_CATEGORIES = ['Women', 'Men', 'Accessories'];
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900';

const emptyForm = {
  name: '',
  price: '',
  category: 'Women',
  image: FALLBACK_IMAGE,
  description: '',
  tag: '',
};

const validate = (form) => {
  const errors = {};
  const price = Number(form.price);
  if (!form.name.trim()) errors.name = 'Vui lòng nhập tên sản phẩm';
  if (form.price === '' || Number.isNaN(price) || price <= 0) errors.price = 'Giá phải là số lớn hơn 0';
  if (!/^https?:\/\/\S+$/i.test(form.image.trim())) errors.image = 'Link ảnh phải bắt đầu bằng http:// hoặc https://';
  if (!form.description.trim()) errors.description = 'Vui lòng nhập mô tả sản phẩm';
  return errors;
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useShop();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');

  const categoryOptions = useMemo(() => {
    const seen = new Map();
    [...products.map((p) => p.category).filter(Boolean), ...DEFAULT_CATEGORIES].forEach((name) => {
      const key = name.toLowerCase();
      if (!seen.has(key)) seen.set(key, name);
    });
    return [...seen.values()];
  }, [products]);

  const displayedProducts = useMemo(() => {
    const keyword = searchTerm.trim().toLowerCase();
    return products.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(keyword) || (p.category || '').toLowerCase().includes(keyword);
      const matchesCategory =
        filterCategory === 'all' || (p.category || '').toLowerCase() === filterCategory.toLowerCase();
      return matchesSearch && matchesCategory;
    });
  }, [products, searchTerm, filterCategory]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const closeModal = () => setIsModalOpen(false);

  const handleOpenCreate = () => {
    const defaultCategory =
      categoryOptions.find((c) => c.toLowerCase() === 'women') || categoryOptions[0] || 'Women';
    setEditingProduct(null);
    setForm({ ...emptyForm, category: defaultCategory });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    setForm({
      name: product.name || '',
      price: String(product.price ?? ''),
      category: product.category || categoryOptions[0] || 'Women',
      image: product.image || '',
      description: product.description || '',
      tag: product.tag || '',
    });
    setErrors({});
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      category: form.category,
      image: form.image.trim(),
      description: form.description.trim(),
      tag: form.tag.trim(),
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        ...payload,
        images: [payload.image, ...(editingProduct.images || []).slice(1)],
      });
      showToast('Đã cập nhật sản phẩm');
    } else {
      addProduct({
        ...payload,
        images: [payload.image],
        secondaryImage: payload.image,
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['#C8AE84', '#775B3F'],
        isNew: true,
      });
      showToast('Đã thêm sản phẩm mới');
    }
    closeModal();
  };

  const handleDelete = (product) => {
    if (!window.confirm(`Bạn có chắc muốn xóa sản phẩm "${product.name}"?`)) return;
    deleteProduct(product.id);
    showToast('Đã xóa sản phẩm');
  };

  return (
    <div>
      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">PRODUCT MANAGEMENT</h1>
          <p className="admin-subtitle">Thêm, xem, sửa, xóa sản phẩm trong kho.</p>
        </div>
        <button type="button" className="admin-primary-btn" onClick={handleOpenCreate}>
          <Plus size={18} /> Add New Product
        </button>
      </div>

      <div className="admin-card admin-toolbar">
        <div className="admin-search">
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Tìm theo tên hoặc danh mục..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="admin-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">All Categories</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <span className="admin-count">{displayedProducts.length} sản phẩm</span>
      </div>

      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Tag / Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan="5" className="admin-empty">Không tìm thấy sản phẩm phù hợp.</td>
                </tr>
              ) : (
                displayedProducts.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div className="admin-product-cell">
                        <img src={p.image} alt={p.name} className="admin-thumb" />
                        <div>
                          <strong style={{ display: 'block', color: '#0F172A' }}>{p.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>ID: #{p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td><span className="admin-cat-badge">{p.category || '—'}</span></td>
                    <td style={{ fontWeight: 600, color: '#0F172A' }}>${p.price}</td>
                    <td>
                      {p.tag ? (
                        <span style={{ fontSize: '0.75rem', color: '#775B3F', fontWeight: 600 }}>{p.tag}</span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Standard</span>
                      )}
                    </td>
                    <td>
                      <div className="admin-actions">
                        <Link to={`/product/${p.id}`} target="_blank" title="Xem trên cửa hàng" className="admin-icon-btn">
                          <Eye size={15} />
                        </Link>
                        <button type="button" title="Sửa" className="admin-icon-btn edit" onClick={() => handleOpenEdit(p)}>
                          <Edit2 size={15} />
                        </button>
                        <button type="button" title="Xóa" className="admin-icon-btn danger" onClick={() => handleDelete(p)}>
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

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}</h3>
              <button type="button" className="admin-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="admin-field">
                <label>Tên sản phẩm *</label>
                <input
                  type="text"
                  className={`admin-input ${errors.name ? 'invalid' : ''}`}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="VD: Silk Minimal Dress"
                />
                {errors.name && <span className="admin-error">{errors.name}</span>}
              </div>

              <div className="admin-field admin-field-row">
                <div>
                  <label>Giá ($) *</label>
                  <input
                    type="number"
                    min="0"
                    className={`admin-input ${errors.price ? 'invalid' : ''}`}
                    value={form.price}
                    onChange={(e) => updateField('price', e.target.value)}
                    placeholder="120"
                  />
                  {errors.price && <span className="admin-error">{errors.price}</span>}
                </div>
                <div>
                  <label>Danh mục</label>
                  <select
                    className="admin-input"
                    value={form.category}
                    onChange={(e) => updateField('category', e.target.value)}
                  >
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="admin-field">
                <label>Link ảnh *</label>
                <input
                  type="text"
                  className={`admin-input ${errors.image ? 'invalid' : ''}`}
                  value={form.image}
                  onChange={(e) => updateField('image', e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                />
                {errors.image && <span className="admin-error">{errors.image}</span>}
              </div>

              <div className="admin-field">
                <label>Tag (không bắt buộc)</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.tag}
                  onChange={(e) => updateField('tag', e.target.value)}
                  placeholder="VD: New Season, Bestseller"
                />
              </div>

              <div className="admin-field">
                <label>Mô tả *</label>
                <textarea
                  rows="3"
                  className={`admin-input ${errors.description ? 'invalid' : ''}`}
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Chất liệu, form dáng, xuất xứ..."
                />
                {errors.description && <span className="admin-error">{errors.description}</span>}
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-secondary-btn" onClick={closeModal}>Cancel</button>
                <button type="submit" className="admin-primary-btn">
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}