import React, { useMemo, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../../context/ShopContext';
import { useLanguage } from '../../context/LanguageContext';
import CustomSelect from '../../components/CustomSelect';
import { Plus, Edit3, Trash2, Search, X, Eye, EyeOff, ExternalLink, CheckCircle2, ShoppingBag, Sparkles, Layers, AlertTriangle, Upload, Star } from 'lucide-react';

const DEFAULT_CATEGORIES = ['Women', 'Men', 'Accessories'];
const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900';

const emptyForm = {
  name: '',
  price: '',
  stock: '20',
  category: 'Women',
  image: '',
  images: [],
  description: '',
  tag: '',
  isActive: true,
};

export default function AdminProducts() {
  const { products, addProduct, updateProduct, toggleProductVisibility, deleteProduct } = useShop();
  const { language, t } = useLanguage();

  const fileInputRef = useRef(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterVisibility, setFilterVisibility] = useState('all'); // 'all' | 'active' | 'hidden'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlInput, setUrlInput] = useState('');

  // KPI Calculations (Full Inventory Lifecycle: In Stock + Low Stock + Out of Stock = Total)
  const totalProductsCount = products.length;
  const inStockCount = products.filter(p => (p.stock ?? 0) > 5).length;
  const lowStockCount = products.filter(p => (p.stock ?? 0) > 0 && (p.stock ?? 0) <= 5).length;
  const outOfStockCount = products.filter(p => (p.stock ?? 0) === 0).length;

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
      const matchesVisibility =
        filterVisibility === 'all' ||
        (filterVisibility === 'active' && p.isActive !== false) ||
        (filterVisibility === 'hidden' && p.isActive === false);
      return matchesSearch && matchesCategory && matchesVisibility;
    });
  }, [products, searchTerm, filterCategory, filterVisibility]);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(''), 2500);
  };

  const updateField = (field, value) => setForm((prev) => ({ ...prev, [field]: value }));

  const closeModal = () => {
    setIsModalOpen(false);
    setIsDragging(false);
    setShowUrlInput(false);
    setUrlInput('');
  };

  // Luxury client-side compression to protect localStorage quota & guarantee retina clarity
  const compressImage = (file, maxWidth = 1200, quality = 0.85) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          let width = img.width;
          let height = img.height;

          if (width > maxWidth || height > maxWidth) {
            if (width > height) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
            } else {
              width = Math.round((width * maxWidth) / height);
              height = maxWidth;
            }
          }

          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', quality);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(e.target.result);
        img.src = e.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const processFiles = async (filesList) => {
    const files = Array.from(filesList || []);
    if (files.length === 0) return;

    const validFiles = files.filter((f) => f.type.startsWith('image/'));
    if (validFiles.length === 0) {
      showToast(language === 'vi' ? 'Vui lòng chọn tệp hình ảnh hợp lệ (PNG, JPG, WEBP).' : 'Please select valid image files (PNG, JPG, WEBP).');
      return;
    }

    const oversized = validFiles.some((f) => f.size > 5 * 1024 * 1024);
    if (oversized) {
      showToast(t('admin.products.uploadOversized', 'Some images exceed 4MB, please choose smaller images.'));
    }

    try {
      const compressed = await Promise.all(validFiles.map((f) => compressImage(f)));
      const successful = compressed.filter(Boolean);

      setForm((prev) => {
        const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
        const updated = [...currentList, ...successful];
        return {
          ...prev,
          images: updated,
          image: updated[0] || '',
        };
      });
      setErrors((prev) => ({ ...prev, image: undefined }));
      showToast(t('admin.products.uploadSuccess', 'Uploaded images successfully!'));
    } catch (err) {
      console.error('Image compression error:', err);
    }
  };

  const handleFileUpload = (e) => {
    processFiles(e.target.files);
    e.target.value = '';
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer && e.dataTransfer.files) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleAddUrlImage = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    setForm((prev) => {
      const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
      const updated = [...currentList, trimmed];
      return {
        ...prev,
        images: updated,
        image: updated[0] || '',
      };
    });
    setUrlInput('');
    setErrors((prev) => ({ ...prev, image: undefined }));
  };

  const handleRemoveImage = (indexToRemove) => {
    setForm((prev) => {
      const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
      const updated = currentList.filter((_, idx) => idx !== indexToRemove);
      return {
        ...prev,
        images: updated,
        image: updated[0] || '',
      };
    });
  };

  const handleSetPrimaryImage = (indexToPrimary) => {
    setForm((prev) => {
      const currentList = Array.isArray(prev.images) ? prev.images : (prev.image ? [prev.image] : []);
      const selected = currentList[indexToPrimary];
      const remaining = currentList.filter((_, idx) => idx !== indexToPrimary);
      const updated = [selected, ...remaining];
      return {
        ...prev,
        images: updated,
        image: selected,
      };
    });
  };

  const validate = (form) => {
    const errors = {};
    const price = Number(form.price);
    const stock = Number(form.stock);
    if (!form.name.trim()) errors.name = t('admin.products.labelName', 'Please enter product name');
    if (form.price === '' || Number.isNaN(price) || price <= 0) errors.price = t('admin.products.labelPrice', 'Price must be greater than 0');
    if (form.stock === '' || Number.isNaN(stock) || stock < 0) errors.stock = t('admin.products.labelStock', 'Stock must be a non-negative number');
    
    const hasImages = (Array.isArray(form.images) && form.images.length > 0) || (form.image && form.image.trim());
    if (!hasImages) errors.image = t('admin.products.errImage', 'Please upload or add at least one product image');
    
    if (!form.description.trim()) errors.description = t('admin.products.labelDesc', 'Please enter product description');
    return errors;
  };

  const handleOpenCreate = () => {
    const defaultCategory =
      categoryOptions.find((c) => c.toLowerCase() === 'women') || categoryOptions[0] || 'Women';
    setEditingProduct(null);
    setForm({ ...emptyForm, category: defaultCategory, stock: '20', images: [] });
    setUrlInput('');
    setShowUrlInput(false);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product) => {
    setEditingProduct(product);
    const existingImages = [
      product.image,
      product.secondaryImage,
      ...(product.images || [])
    ].filter((url, idx, arr) => url && typeof url === 'string' && arr.indexOf(url) === idx);

    setForm({
      name: product.name || '',
      price: String(product.price ?? ''),
      stock: String(product.stock ?? 20),
      category: product.category || categoryOptions[0] || 'Women',
      image: product.image || (existingImages[0] || ''),
      images: existingImages.length > 0 ? existingImages : (product.image ? [product.image] : []),
      description: product.description || '',
      tag: product.tag || '',
      isActive: product.isActive !== false,
    });
    setUrlInput('');
    setShowUrlInput(false);
    setErrors({});
    setIsModalOpen(true);
  };

  const handleToggleVisibility = (product) => {
    const nextStatus = toggleProductVisibility(product.id);
    showToast(
      nextStatus
        ? t('admin.products.toastShown', 'Product published to storefront successfully!')
        : t('admin.products.toastHidden', 'Product hidden from storefront successfully!')
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    const allImgs = (Array.isArray(form.images) && form.images.length > 0) ? form.images : (form.image ? [form.image.trim()] : []);
    const primaryImg = allImgs[0] || FALLBACK_IMAGE;
    const secondaryImg = allImgs[1] || allImgs[0] || FALLBACK_IMAGE;

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      stock: Number(form.stock) >= 0 ? Number(form.stock) : 0,
      category: form.category,
      image: primaryImg,
      secondaryImage: secondaryImg,
      images: allImgs,
      description: form.description.trim(),
      tag: form.tag.trim(),
      isActive: form.isActive !== false,
    };

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      showToast(t('admin.products.toastUpdated', 'Product updated successfully'));
    } else {
      addProduct({
        ...payload,
        sizes: ['XS', 'S', 'M', 'L'],
        colors: ['#C8AE84', '#775B3F'],
        isNew: true,
      });
      showToast(t('admin.products.toastCreated', 'Product added successfully'));
    }
    closeModal();
  };

  const handleDelete = (product) => {
    if (!window.confirm(`${t('admin.products.confirmDelete', 'Are you sure you want to delete product')} "${product.name}"?`)) return;
    deleteProduct(product.id);
    showToast(t('admin.products.toastDeleted', 'Product deleted successfully'));
  };

  return (
    <div>
      {toast && (
        <div className="admin-toast">
          <CheckCircle2 size={16} />
          <span>{toast}</span>
        </div>
      )}

      {/* Page Header */}
      <div className="admin-page-header">
        <div>
          <h1 className="admin-title">{t('admin.products.title', 'PRODUCT MANAGEMENT')}</h1>
          <p className="admin-subtitle">{t('admin.products.subtitle', 'Create, view, update, and delete products in inventory.')}</p>
        </div>
        <button type="button" className="admin-primary-btn" onClick={handleOpenCreate}>
          <Plus size={16} />
          <span>{t('admin.products.addNew', 'Add New Product')}</span>
        </button>
      </div>

      {/* 4 KPI Cards - Inventory Lifecycle Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <ShoppingBag size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.products.totalProducts', 'TOTAL PRODUCTS')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {totalProductsCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#F9F2E7', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #C8AE84', flexShrink: 0 }}>
            <CheckCircle2 size={20} color="#775B3F" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.products.inStock', 'IN STOCK')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {inStockCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF7F2', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <AlertTriangle size={20} color="#CAA072" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.products.lowStock', 'LOW STOCK')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {lowStockCount}
            </h3>
          </div>
        </div>

        <div className="admin-card" style={{ padding: '16px 18px', display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
          <div style={{ width: '42px', height: '42px', borderRadius: '4px', backgroundColor: '#FAF8F5', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid #E7DDCE', flexShrink: 0 }}>
            <X size={20} color="#8F7965" />
          </div>
          <div style={{ minWidth: 0, overflow: 'hidden' }}>
            <span style={{ fontSize: '0.72rem', color: '#5C4A3A', fontWeight: 600, letterSpacing: '0.02em', textTransform: 'uppercase', whiteSpace: 'nowrap', display: 'block', textOverflow: 'ellipsis', overflow: 'hidden' }}>
              {t('admin.products.outOfStock', 'OUT OF STOCK')}
            </span>
            <h3 className="notranslate" translate="no" style={{ margin: '2px 0 0', fontSize: '1.6rem', fontFamily: 'var(--font-sans)', fontVariantNumeric: 'lining-nums tabular-nums', fontWeight: 700, color: '#2C2117', lineHeight: '1.2' }}>
              {outOfStockCount}
            </h3>
          </div>
        </div>
      </div>

      {/* Toolbar / Filters */}
      <div className="admin-card admin-toolbar">
        <div className="admin-search">
          <Search size={18} color="#8F7965" />
          <input
            type="text"
            placeholder={t('admin.products.searchPlaceholder', 'Search by product name or category...')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <CustomSelect className="admin-select" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
          <option value="all">{t('admin.products.allCategories', 'All Categories')}</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </CustomSelect>
        <CustomSelect className="admin-select" value={filterVisibility} onChange={(e) => setFilterVisibility(e.target.value)}>
          <option value="all">{t('admin.products.filterVisibilityAll', 'All Statuses')}</option>
          <option value="active">{t('admin.products.filterVisibilityActive', 'Active Only')}</option>
          <option value="hidden">{t('admin.products.filterVisibilityHidden', 'Hidden Only')}</option>
        </CustomSelect>
        <span className="admin-count">{displayedProducts.length} {t('common.items', 'products')}</span>
      </div>

      {/* Products Table */}
      <div className="admin-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: '27%' }}>{t('admin.products.colProduct', 'Product')}</th>
                <th className="text-center" style={{ width: '15%' }}>{t('admin.products.colCategory', 'Category')}</th>
                <th className="text-center" style={{ width: '10%' }}>{t('admin.products.colPrice', 'Price')}</th>
                <th className="text-center" style={{ width: '15%' }}>{t('admin.products.colStock', 'Stock')}</th>
                <th className="text-center" style={{ width: '15%' }}>{t('admin.products.colStatus', 'Status')}</th>
                <th className="text-center" style={{ width: '18%' }}>{t('admin.products.colActions', 'Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {displayedProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="admin-empty">{t('common.noResults', 'No matching products found.')}</td>
                </tr>
              ) : (
                displayedProducts.map((p) => {
                  const isActive = p.isActive !== false;
                  return (
                    <tr key={p.id} style={{ opacity: isActive ? 1 : 0.68, backgroundColor: isActive ? 'transparent' : '#FAF8F5', transition: 'all 0.2s ease' }}>
                      <td>
                        <div className="admin-product-cell" style={{ minWidth: 0 }}>
                          <img src={p.image} alt={p.name} className="admin-thumb" style={{ flexShrink: 0 }} />
                          <div style={{ minWidth: 0, maxWidth: '210px', overflow: 'hidden' }}>
                            <strong style={{ display: 'block', color: '#2C2117', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} title={p.name}>{p.name}</strong>
                            <span style={{ fontSize: '0.75rem', color: '#8F7965' }}>ID: #{p.id}</span>
                          </div>
                        </div>
                      </td>
                      <td className="text-center"><span className="admin-cat-badge">{p.category || '—'}</span></td>
                      <td className="text-center" style={{ fontWeight: 600, color: '#2C2117', whiteSpace: 'nowrap' }}>${p.price}</td>
                      <td className="text-center">
                        <span style={{
                          padding: '3px 8px',
                          borderRadius: '4px',
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          backgroundColor: (p.stock ?? 0) === 0 ? '#FAF8F5' : (p.stock ?? 0) <= 5 ? '#F9F2E7' : '#F5EFEB',
                          color: (p.stock ?? 0) === 0 ? '#8F7965' : (p.stock ?? 0) <= 5 ? '#775B3F' : '#2C2117',
                          border: `1px solid ${(p.stock ?? 0) <= 5 && (p.stock ?? 0) > 0 ? '#C8AE84' : '#E7DDCE'}`,
                          display: 'inline-block',
                          whiteSpace: 'nowrap'
                        }}>
                          {(p.stock ?? 0) === 0 ? `0 (${t('admin.products.statusOutOfStock', 'Out of stock')})` : 
                           (p.stock ?? 0) <= 5 ? `${p.stock} (${t('admin.products.statusLowStock', 'Low stock')})` : 
                           `${p.stock} (${t('admin.products.statusInStock', 'In stock')})`}
                        </span>
                      </td>
                      <td className="text-center">
                        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                          <span style={{
                            padding: '3px 9px',
                            borderRadius: '12px',
                            fontSize: '0.74rem',
                            fontWeight: 600,
                            backgroundColor: isActive ? '#F5EFEB' : '#FAF8F5',
                            color: isActive ? '#2C2117' : '#8F7965',
                            border: '1px solid #E7DDCE',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '5px',
                            whiteSpace: 'nowrap'
                          }}>
                            <span style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              backgroundColor: isActive ? '#775B3F' : '#8F7965'
                            }} />
                            {isActive ? t('admin.products.statusActive', 'Active') : t('admin.products.statusHidden', 'Hidden')}
                          </span>
                          {p.tag && (
                            <span style={{ fontSize: '0.7rem', color: '#775B3F', fontWeight: 600 }}>{p.tag}</span>
                          )}
                        </div>
                      </td>
                      <td className="text-center" style={{ whiteSpace: 'nowrap' }}>
                        <div className="admin-actions">
                          <Link to={`/product/${p.id}`} target="_blank" title={t('admin.products.viewOnStore', 'View on store')} className="admin-icon-btn">
                            <ExternalLink size={15} />
                          </Link>
                          <button
                            type="button"
                            title={isActive ? t('admin.products.tooltipHide', 'Visible in store (Click to hide)') : t('admin.products.tooltipShow', 'Hidden from store (Click to unhide)')}
                            className="admin-icon-btn"
                            onClick={() => handleToggleVisibility(p)}
                            style={{
                              color: isActive ? '#775B3F' : '#8F7965',
                              borderColor: isActive ? '#C8AE84' : '#E7DDCE',
                              backgroundColor: isActive ? '#FAF7F2' : '#F5EFEB'
                            }}
                          >
                            {isActive ? <Eye size={15} /> : <EyeOff size={15} />}
                          </button>
                          <button type="button" title={t('admin.products.btnEdit', 'Edit')} className="admin-icon-btn edit" onClick={() => handleOpenEdit(p)}>
                            <Edit3 size={15} />
                          </button>
                          <button type="button" title={t('admin.products.btnDelete', 'Delete')} className="admin-icon-btn danger" onClick={() => handleDelete(p)}>
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="admin-modal-overlay" onClick={closeModal}>
          <div className="admin-modal" onClick={(e) => e.stopPropagation()}>
            <div className="admin-modal-header">
              <h3>{editingProduct ? t('admin.products.modalEditTitle', 'EDIT PRODUCT') : t('admin.products.modalCreateTitle', 'ADD NEW PRODUCT')}</h3>
              <button type="button" className="admin-modal-close" onClick={closeModal}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              <div className="admin-field">
                <label>{t('admin.products.labelName', 'Product Name *')}</label>
                <input
                  type="text"
                  className={`admin-input ${errors.name ? 'invalid' : ''}`}
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  placeholder="e.g. Silk Minimal Dress"
                />
                {errors.name && <span className="admin-error">{errors.name}</span>}
              </div>

              <div className="admin-field admin-field-row">
                <div>
                  <label>{t('admin.products.labelPrice', 'Price ($) *')}</label>
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
                  <label>{t('admin.products.labelStock', 'Stock Quantity *')}</label>
                  <input
                    type="number"
                    min="0"
                    className={`admin-input ${errors.stock ? 'invalid' : ''}`}
                    value={form.stock}
                    onChange={(e) => updateField('stock', e.target.value)}
                    placeholder="20"
                  />
                  {errors.stock && <span className="admin-error">{errors.stock}</span>}
                </div>
              </div>

              <div className="admin-field">
                <label>{t('admin.products.labelCategory', 'Category *')}</label>
                <CustomSelect
                  className="admin-input"
                  value={form.category}
                  onChange={(e) => updateField('category', e.target.value)}
                >
                  {categoryOptions.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </CustomSelect>
              </div>

              {/* Product Multi-Image Upload & Management */}
              <div className="admin-field">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ margin: 0, fontWeight: 600, color: '#2C2117' }}>
                    {t('admin.products.labelImages', 'Product Images *')}
                    <span style={{ fontSize: '0.78rem', color: '#8F7965', fontWeight: 'normal', marginLeft: '6px' }}>
                      ({form.images?.length || 0} {t('admin.products.imagesSelected', 'images selected')})
                    </span>
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowUrlInput(!showUrlInput)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#775B3F',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      padding: 0
                    }}
                  >
                    {showUrlInput ? t('admin.products.hideUrlInput', '✕ Hide URL Input') : t('admin.products.showUrlInput', '+ Add via image URL')}
                  </button>
                </div>

                {/* Drag & Drop File Upload Area */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  style={{
                    border: `2px dashed ${isDragging ? '#775B3F' : errors.image ? '#B91C1C' : '#C8AE84'}`,
                    backgroundColor: isDragging ? '#F5EFEB' : '#FAF7F2',
                    borderRadius: '6px',
                    padding: '22px 16px',
                    textAlign: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    marginBottom: '10px'
                  }}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleFileUpload}
                    style={{ display: 'none' }}
                  />
                  <div style={{ width: '44px', height: '44px', borderRadius: '50%', backgroundColor: '#F0E8DC', margin: '0 auto 10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Upload size={22} color="#775B3F" />
                  </div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#2C2117', marginBottom: '4px' }}>
                    {t('admin.products.uploadTitle', 'Click to upload files or drag & drop here')}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: '#8F7965' }}>
                    {t('admin.products.uploadSubtitle', 'Upload multiple images (JPG, PNG, WEBP). First image is cover.')}
                  </div>
                </div>

                {/* Optional URL Adder */}
                {showUrlInput && (
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
                    <input
                      type="text"
                      className="admin-input"
                      style={{ flex: 1, fontSize: '0.82rem' }}
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder={t('admin.products.urlPlaceholder', 'Paste image URL (https://...) and click Add')}
                      onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUrlImage(); } }}
                    />
                    <button
                      type="button"
                      onClick={handleAddUrlImage}
                      className="admin-secondary-btn"
                      style={{ padding: '6px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                    >
                      {t('admin.products.btnAddUrl', 'Add URL')}
                    </button>
                  </div>
                )}

                {/* Uploaded Image Thumbnails Grid */}
                {Array.isArray(form.images) && form.images.length > 0 && (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(95px, 1fr))',
                    gap: '10px',
                    padding: '12px',
                    backgroundColor: '#FAF7F2',
                    border: '1px solid #E7DDCE',
                    borderRadius: '6px',
                    marginBottom: '8px'
                  }}>
                    {form.images.map((imgUrl, idx) => (
                      <div
                        key={idx}
                        style={{
                          position: 'relative',
                          borderRadius: '4px',
                          overflow: 'hidden',
                          border: idx === 0 ? '2px solid #775B3F' : '1px solid #E7DDCE',
                          aspectRatio: '3/4',
                          backgroundColor: '#EDE8E1'
                        }}
                      >
                        <img
                          src={imgUrl}
                          alt={`Product preview ${idx + 1}`}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />

                        {/* Primary Badge */}
                        {idx === 0 ? (
                          <span style={{
                            position: 'absolute',
                            top: '4px',
                            left: '4px',
                            backgroundColor: '#775B3F',
                            color: '#FFFFFF',
                            fontSize: '0.64rem',
                            fontWeight: 700,
                            padding: '2px 6px',
                            borderRadius: '3px',
                            letterSpacing: '0.04em',
                            textTransform: 'uppercase',
                            boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px'
                          }}>
                            <Star size={10} fill="#FFFFFF" /> {t('admin.products.mainBadge', 'Cover')}
                          </span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => handleSetPrimaryImage(idx)}
                            title={t('admin.products.setAsMain', 'Set as Cover')}
                            style={{
                              position: 'absolute',
                              bottom: '4px',
                              left: '4px',
                              right: '4px',
                              backgroundColor: 'rgba(255, 255, 255, 0.92)',
                              color: '#5C4A3A',
                              border: '1px solid #C8AE84',
                              fontSize: '0.65rem',
                              fontWeight: 600,
                              padding: '3px 0',
                              borderRadius: '3px',
                              cursor: 'pointer',
                              textAlign: 'center'
                            }}
                          >
                            {t('admin.products.setMainBtn', 'Set Cover')}
                          </button>
                        )}

                        {/* Delete Button */}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          title={t('admin.products.removeImage', 'Remove image')}
                          style={{
                            position: 'absolute',
                            top: '4px',
                            right: '4px',
                            width: '22px',
                            height: '22px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(52, 38, 27, 0.85)',
                            color: '#FFFFFF',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            padding: 0,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.3)'
                          }}
                        >
                          <X size={13} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {errors.image && <span className="admin-error" style={{ display: 'block', marginTop: '4px' }}>{errors.image}</span>}
              </div>

              <div className="admin-field">
                <label>{t('admin.products.labelTag', 'Tag (Optional)')}</label>
                <input
                  type="text"
                  className="admin-input"
                  value={form.tag}
                  onChange={(e) => updateField('tag', e.target.value)}
                  placeholder="e.g. New Season, Bestseller"
                />
              </div>

              <div className="admin-field">
                <label>{t('admin.products.labelDesc', 'Description *')}</label>
                <textarea
                  rows="3"
                  className={`admin-input ${errors.description ? 'invalid' : ''}`}
                  value={form.description}
                  onChange={(e) => updateField('description', e.target.value)}
                  placeholder="Fabric, silhouette, origin details..."
                />
                {errors.description && <span className="admin-error">{errors.description}</span>}
              </div>

              {/* Product Visibility Option */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '12px 14px',
                backgroundColor: '#FAF7F2',
                borderRadius: '4px',
                border: '1px solid #E7DDCE',
                marginBottom: '18px'
              }}>
                <input
                  type="checkbox"
                  id="product-is-active"
                  checked={form.isActive !== false}
                  onChange={(e) => updateField('isActive', e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#775B3F', cursor: 'pointer' }}
                />
                <label htmlFor="product-is-active" style={{ margin: 0, cursor: 'pointer', fontWeight: 600, color: '#2C2117', fontSize: '0.85rem' }}>
                  {t('admin.products.labelPublish', 'Publish on storefront (Visible to boutique clients)')}
                </label>
              </div>

              <div className="admin-modal-actions">
                <button type="button" className="admin-secondary-btn" onClick={closeModal}>
                  {t('admin.products.btnCancel', 'Cancel')}
                </button>
                <button type="submit" className="admin-primary-btn">
                  {editingProduct ? t('admin.products.btnSave', 'Save Changes') : t('admin.products.btnCreate', 'Create Product')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}