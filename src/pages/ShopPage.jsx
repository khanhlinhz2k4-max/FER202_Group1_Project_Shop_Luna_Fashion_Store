import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { RotateCcw, Check, ArrowUpDown } from 'lucide-react';
import './ShopPage.css';

const GARMENT_CATEGORIES = [
  { id: 'all', label: 'All Garments' },
  { id: 'Coats & Outerwear', label: 'Coats & Outerwear' },
  { id: 'Silk Dresses', label: 'Silk Dresses' },
  { id: 'Blazers & Tailoring', label: 'Blazers & Tailoring' },
  { id: 'Cashmere Knitwear', label: 'Cashmere Knitwear' },
  { id: 'Pleated Trousers', label: 'Pleated Trousers' },
  { id: 'Leather Goods', label: 'Leather Goods' },
];

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
 */
export default function ShopPage() {
  const { products } = useShop();
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

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

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
        <h1 className="shop-title">THE CURATED COLLECTION</h1>
        <p className="shop-subtitle">
          Timeless silhouettes, sustainable textiles, and refined craftsmanship.
          {searchKeyword && <span> (Results for: "<strong>{searchKeyword}</strong>")</span>}
          {urlCategory && <span> &bull; Gender: <strong style={{ textTransform: 'capitalize' }}>{urlCategory}</strong></span>}
        </p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters - High Fashion Stitch Design */}
        <aside className="filter-sidebar-card">
          {/* Header & Reset */}
          <div className="filter-header">
            <span className="filter-title">FILTER BY</span>
            <button type="button" className="filter-reset-btn" onClick={handleReset} title="Reset all filters">
              <RotateCcw size={12} />
              <span>RESET</span>
            </button>
          </div>

          {/* Categories / Garment Type */}
          <div className="filter-section">
            <span className="filter-section-title">CATEGORIES</span>
            <div className="filter-category-list">
              {GARMENT_CATEGORIES.map(cat => {
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
            <span className="filter-section-title">SIZE</span>
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
            <span className="filter-section-title">COLOR PALETTE</span>
            <div className="filter-color-palette">
              <button
                type="button"
                className={`filter-color-all ${selectedColor === 'ALL' ? 'active' : ''}`}
                onClick={() => { setSelectedColor('ALL'); setCurrentPage(1); }}
                title="All Colors"
              >
                <span>ALL</span>
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
              <span className="filter-section-title" style={{ marginBottom: 0 }}>MAX PRICE</span>
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
              Showing <strong>{filteredProducts.length}</strong> styles
            </span>

            <div className="shop-sort-wrap">
              <ArrowUpDown size={15} color="#78716C" />
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                className="shop-sort-select"
              >
                <option value="newest">Sort by: Newest Arrival</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div className="shop-empty-state">
              <p className="shop-empty-text">No products match your selected criteria.</p>
              <button 
                onClick={handleReset}
                className="shop-empty-btn"
              >
                Reset All Filters
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
