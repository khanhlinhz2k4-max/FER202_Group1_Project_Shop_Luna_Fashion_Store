import React, { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
import ProductCard from '../components/ProductCard';
import { RotateCcw, Check, ArrowUpDown } from 'lucide-react';
import './ShopPage.css';

const SIZES = ['ALL', 'XS', 'S', 'M', 'L', 'XL'];

const COLOR_PALETTE = [
  { id: 'ALL', name: 'All Colors' },
  { id: '#CAA072', name: 'Tan' },
  { id: '#C8AE84', name: 'Beige' },
  { id: '#FEE3AF', name: 'Cream' },
  { id: '#775B3F', name: 'Brown' },
  { id: '#2C2117', name: 'Black' },
];

/**
 * ShopPage Component
 * Phụ trách: Thành viên 1 (Trưởng nhóm - System Architect & Trang Cửa hàng tổng hợp)
 * Đa ngôn ngữ (i18n): Thành viên 1 (Leader)
 */
export default function ShopPage() {
  const { products } = useShop();
  const { t } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search keyword & category from URL
  const searchKeyword = searchParams.get('search') || '';
  const urlCategory = searchParams.get('category');

  // Filter states matching Stitch design
  const [selectedGarment, setSelectedGarment] = useState('all');
  const [selectedSize, setSelectedSize] = useState('ALL');
  const [selectedColor, setSelectedColor] = useState('ALL');
  const [maxPrice, setMaxPrice] = useState(400);
  const [sortBy, setSortBy] = useState('newest');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Reset selected garment when URL gender category changes
  useEffect(() => {
    setSelectedGarment('all');
  }, [urlCategory]);

  // Automatically reset to page 1 whenever any filter, category, or search criteria changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchKeyword, urlCategory, selectedGarment, selectedSize, selectedColor, maxPrice, sortBy]);

  // Dynamically filter available garment categories based on the current URL category (e.g. Men vs Women)
  const availableGarmentCategories = useMemo(() => {
    const garmentList = [
      { id: 'all', label: t('shop.allGarments') },
      { id: 'Coats & Outerwear', label: t('shop.coatsOuterwear') },
      { id: 'Silk Dresses', label: t('shop.silkDresses') },
      { id: 'Blazers & Tailoring', label: t('shop.blazersTailoring') },
      { id: 'Cashmere Knitwear', label: t('shop.cashmereKnitwear') },
      { id: 'Pleated Trousers', label: t('shop.pleatedTrousers') },
      { id: 'Leather Goods', label: t('shop.leatherGoods') },
    ];

    const activeProducts = products.filter(p => p.isActive !== false);
    let relevantProducts = activeProducts;
    if (urlCategory && urlCategory !== 'all') {
      relevantProducts = activeProducts.filter(
        p => p.category && p.category.toLowerCase() === urlCategory.toLowerCase()
      );
    }
    const availableTypes = new Set(relevantProducts.map(p => p.garmentType).filter(Boolean));

    return garmentList.filter(cat => cat.id === 'all' || availableTypes.has(cat.id));
  }, [products, urlCategory, t]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.isActive !== false);

    // 1. Search keyword
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.garmentType && p.garmentType.toLowerCase().includes(q))
      );
    }

    // 2. URL Gender Category (e.g. from Navbar: ?category=women or ?category=men)
    if (urlCategory && urlCategory !== 'all') {
      result = result.filter(p => 
        p.category && p.category.toLowerCase() === urlCategory.toLowerCase()
      );
    }

    // 3. Garment Type
    if (selectedGarment !== 'all') {
      result = result.filter(p => p.garmentType === selectedGarment);
    }

    // 4. Size
    if (selectedSize !== 'ALL') {
      result = result.filter(p => 
        p.sizes && (p.sizes.includes(selectedSize) || p.sizes.includes('ALL') || p.sizes.includes('One Size'))
      );
    }

    // 5. Color
    if (selectedColor !== 'ALL') {
      result = result.filter(p => 
        p.colors && p.colors.includes(selectedColor)
      );
    }

    // 6. Max Price
    result = result.filter(p => p.price <= maxPrice);

    // 7. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return result;
  }, [products, searchKeyword, urlCategory, selectedGarment, selectedSize, selectedColor, maxPrice, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Safety guard: if current page exceeds total pages, pull back to page 1
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleReset = () => {
    setSelectedGarment('all');
    setSelectedSize('ALL');
    setSelectedColor('ALL');
    setMaxPrice(400);
    setSortBy('newest');
    setCurrentPage(1);
    setSearchParams({});
  };

  return (
    <div className="shop-page-container">
      {/* Header */}
      <div className="shop-header">
        <h1 className="shop-title">{t('shop.headerTitle')}</h1>
        <p className="shop-subtitle">
          {t('shop.headerSubtitle')}
          {searchKeyword && <span> ({t('shop.resultsFor')} "<strong>{searchKeyword}</strong>")</span>}
          {urlCategory && <span> &bull; {t('shop.genderCategory')} <strong style={{ textTransform: 'capitalize' }}>{urlCategory}</strong></span>}
        </p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters - High Fashion Stitch Design */}
        <aside className="filter-sidebar-card">
          {/* Header & Reset */}
          <div className="filter-header">
            <span className="filter-title">{t('common.filterBy')}</span>
            <button type="button" className="filter-reset-btn" onClick={handleReset} title={t('common.reset')}>
              <RotateCcw size={12} />
              <span>{t('common.reset')}</span>
            </button>
          </div>

          {/* Categories / Garment Type */}
          <div className="filter-section">
            <span className="filter-section-title">{t('shop.filterCategories')}</span>
            <div className="filter-category-list">
              {availableGarmentCategories.map(cat => {
                const isActive = selectedGarment === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`filter-category-item ${isActive ? 'active' : ''}`}
                    onClick={() => { setSelectedGarment(cat.id); setCurrentPage(1); }}
                  >
                    <span>{cat.label}</span>
                    {isActive && <Check size={16} className="filter-check-icon" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-divider" />

          {/* Sizes */}
          <div className="filter-section">
            <span className="filter-section-title">{t('shop.filterSize')}</span>
            <div className="filter-size-grid">
              {SIZES.map(s => {
                const isActive = selectedSize === s;
                return (
                  <button
                    key={s}
                    type="button"
                    className={`filter-size-btn ${isActive ? 'active' : ''}`}
                    onClick={() => { setSelectedSize(s); setCurrentPage(1); }}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="filter-divider" />

          {/* Color Palette */}
          <div className="filter-section">
            <span className="filter-section-title">{t('shop.filterColor')}</span>
            <div className="filter-color-palette">
              <button
                type="button"
                className={`filter-color-all ${selectedColor === 'ALL' ? 'active' : ''}`}
                onClick={() => { setSelectedColor('ALL'); setCurrentPage(1); }}
                title="All Colors"
              >
                <span>{t('common.all')}</span>
              </button>

              {COLOR_PALETTE.filter(c => c.id !== 'ALL').map(c => {
                const isActive = selectedColor === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    className={`filter-color-swatch ${isActive ? 'active' : ''}`}
                    style={{ backgroundColor: c.id }}
                    onClick={() => { setSelectedColor(c.id); setCurrentPage(1); }}
                    title={c.name}
                    aria-label={c.name}
                  />
                );
              })}
            </div>
          </div>

          <div className="filter-divider" />

            {/* Max Price Slider */}
            <div className="filter-section">
              <div className="filter-price-header">
                <span className="filter-section-title" style={{ marginBottom: 0 }}>{t('shop.filterMaxPrice')}</span>
                <span className="filter-price-value">${maxPrice}</span>
              </div>
              <input
                type="range"
                min="90"
                max="400"
                step="5"
                value={maxPrice}
                onChange={(e) => { setMaxPrice(Number(e.target.value)); setCurrentPage(1); }}
                className="filter-price-slider"
                style={{
                  background: `linear-gradient(to right, #775B3F 0%, #775B3F ${((maxPrice - 90) / (400 - 90)) * 100}%, #E5DFD5 ${((maxPrice - 90) / (400 - 90)) * 100}%, #E5DFD5 100%)`
                }}
              />
              <div className="filter-price-limits">
                <span>$90</span>
                <span>$400</span>
              </div>
            </div>
        </aside>

        {/* Products Main Section */}
        <main>
          {/* Top Sort Bar */}
          <div className="shop-toolbar">
            <span className="shop-count">
              {t('shop.showingProducts')} <strong>{filteredProducts.length}</strong> {t('common.items')}
            </span>

            <div className="shop-sort-wrap">
              <ArrowUpDown size={15} color="#78716C" />
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                className="shop-sort-select"
              >
                <option value="newest">{t('shop.sortNewest')}</option>
                <option value="price-asc">{t('shop.sortPriceAsc')}</option>
                <option value="price-desc">{t('shop.sortPriceDesc')}</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="shop-empty-state">
              <p className="shop-empty-text">{t('shop.noProductsTitle')}</p>
              <button 
                onClick={handleReset}
                className="shop-empty-btn"
              >
                {t('common.reset')}
              </button>
            </div>
          ) : (
            <div className="shop-product-grid">
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="shop-pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`shop-page-btn ${currentPage === pageNum ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
