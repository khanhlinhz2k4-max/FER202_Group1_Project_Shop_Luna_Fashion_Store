import React, { useState } from 'react';
import { useShop } from '../../context/ShopContext';
import { Plus, Edit2, Trash2, Search, X, Check, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * AdminProducts Component
 * Phụ trách: Thành viên 6 (CRUD Sản phẩm toàn diện - Trọng tâm điểm số FER202)
 */
export default function AdminProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useShop();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  // Modal State for Add / Edit
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formCategory, setFormCategory] = useState('Women');
  const [formImage, setFormImage] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [formTag, setFormTag] = useState('');
  const [formError, setFormError] = useState('');

  // Open modal for Create
  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormName('');
    setFormPrice('');
    setFormCategory('Women');
    setFormImage('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900');
    setFormDesc('');
    setFormTag('New Season');
    setFormError('');
    setIsModalOpen(true);
  };

  // Open modal for Edit
  const handleOpenEdit = (prod) => {
    setEditingProduct(prod);
    setFormName(prod.name);
    setFormPrice(prod.price);
    setFormCategory(prod.category || 'Women');
    setFormImage(prod.image);
    setFormDesc(prod.description || '');
    setFormTag(prod.tag || '');
    setFormError('');
    setIsModalOpen(true);
  };

  // Submit Create or Update
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim() || !formPrice) {
      setFormError('Please fill in all required fields (Name and Price).');
      return;
    }

    if (editingProduct) {
      // UPDATE
      updateProduct(editingProduct.id, {
        name: formName.trim(),
        price: Number(formPrice),
        category: formCategory,
        image: formImage.trim() || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900',
        description: formDesc.trim(),
        tag: formTag.trim()
      });
    } else {
      // CREATE
      addProduct({
        name: formName.trim(),
        price: Number(formPrice),
        category: formCategory,
        image: formImage.trim() || 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900',
        description: formDesc.trim(),
        tag: formTag.trim(),
        sizes: ["XS", "S", "M", "L"],
        colors: ["#C8AE84", "#775B3F"]
      });
    }

    setIsModalOpen(false);
  };

  // Handle Delete with Confirmation
  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}" from store inventory?`)) {
      deleteProduct(id);
    }
  };

  // Filtered product list for table
  const displayedProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (p.category && p.category.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCat = filterCategory === 'all' || (p.category && p.category.toLowerCase() === filterCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div>
      {/* Header bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '1.7rem', fontWeight: 700, margin: '0 0 6px', color: '#0F172A' }}>PRODUCT MANAGEMENT</h1>
          <p style={{ color: '#64748B', margin: 0, fontSize: '0.9rem' }}>
            Full CRUD: Create, Read, Update, and Delete store merchandise.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            backgroundColor: '#0F172A',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            fontWeight: 600,
            cursor: 'pointer',
            fontSize: '0.88rem'
          }}
        >
          <Plus size={18} /> Add New Product
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="admin-card" style={{ marginBottom: '24px', padding: '16px 20px', display: 'flex', gap: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flex: 1, minWidth: '240px', backgroundColor: '#F8FAFC', padding: '8px 14px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
          <Search size={18} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search by product name or category..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ border: 'none', background: 'none', outline: 'none', width: '100%', fontSize: '0.88rem' }}
          />
        </div>

        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          style={{ padding: '8px 14px', borderRadius: '6px', border: '1px solid #E2E8F0', outline: 'none', backgroundColor: '#fff', fontSize: '0.88rem' }}
        >
          <option value="all">All Categories</option>
          <option value="women">Women</option>
          <option value="men">Men</option>
          <option value="accessories">Accessories</option>
        </select>
      </div>

      {/* Products Table (READ) */}
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
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: '#64748B' }}>
                    No products found matching your search.
                  </td>
                </tr>
              ) : (
                displayedProducts.map(p => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img 
                          src={p.image} 
                          alt={p.name} 
                          style={{ width: '44px', height: '56px', objectFit: 'cover', borderRadius: '4px' }} 
                        />
                        <div>
                          <strong style={{ display: 'block', color: '#0F172A' }}>{p.name}</strong>
                          <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>ID: #{p.id}</span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{ padding: '3px 8px', borderRadius: '4px', backgroundColor: '#F1F5F9', fontSize: '0.8rem', fontWeight: 500 }}>
                        {p.category || 'Women'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 600, color: '#0F172A' }}>${p.price}</td>
                    <td>
                      {p.tag ? (
                        <span style={{ fontSize: '0.75rem', color: '#775B3F', fontWeight: 600 }}>{p.tag}</span>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: '#94A3B8' }}>Standard</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <Link 
                          to={`/product/${p.id}`}
                          target="_blank"
                          title="View on store"
                          style={{ padding: '6px', color: '#64748B', borderRadius: '4px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center' }}
                        >
                          <Eye size={15} />
                        </Link>
                        <button
                          onClick={() => handleOpenEdit(p)}
                          title="Edit Product"
                          style={{ padding: '6px', color: '#3B82F6', borderRadius: '4px', border: '1px solid #E2E8F0', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        >
                          <Edit2 size={15} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id, p.name)}
                          title="Delete Product"
                          style={{ padding: '6px', color: '#EF4444', borderRadius: '4px', border: '1px solid #E2E8F0', background: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
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

      {/* CREATE / UPDATE MODAL */}
      {isModalOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px'
        }} onClick={() => setIsModalOpen(false)}>
          <div style={{
            backgroundColor: '#fff',
            maxWidth: '560px',
            width: '100%',
            borderRadius: '8px',
            padding: '28px',
            maxHeight: '90vh',
            overflowY: 'auto'
          }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #E2E8F0', paddingBottom: '12px' }}>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>
                {editingProduct ? 'EDIT PRODUCT' : 'ADD NEW PRODUCT'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>

            {formError && (
              <div style={{ padding: '10px 14px', backgroundColor: '#FEE2E2', color: '#B91C1C', borderRadius: '6px', marginBottom: '16px', fontSize: '0.85rem' }}>
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Product Title *</label>
                <input
                  type="text"
                  value={formName}
                  onChange={e => setFormName(e.target.value)}
                  placeholder="e.g. Silk Minimal Dress"
                  style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Price ($) *</label>
                  <input
                    type="number"
                    value={formPrice}
                    onChange={e => setFormPrice(e.target.value)}
                    placeholder="120"
                    style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value)}
                    style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', backgroundColor: '#fff' }}
                  >
                    <option value="Women">Women</option>
                    <option value="Men">Men</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Image URL</label>
                <input
                  type="text"
                  value={formImage}
                  onChange={e => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Tag (Optional)</label>
                <input
                  type="text"
                  value={formTag}
                  onChange={e => setFormTag(e.target.value)}
                  placeholder="e.g. New Season, Bestseller"
                  style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none' }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '6px' }}>Description</label>
                <textarea
                  value={formDesc}
                  onChange={e => setFormDesc(e.target.value)}
                  placeholder="Mô tả chất liệu, form dáng, xuất xứ..."
                  rows="3"
                  style={{ width: '100%', padding: '10px', border: '1px solid #CBD5E1', borderRadius: '6px', outline: 'none', resize: 'vertical' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  style={{ padding: '10px 18px', border: '1px solid #CBD5E1', background: 'none', borderRadius: '6px', cursor: 'pointer' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ padding: '10px 24px', backgroundColor: '#0F172A', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                >
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
