import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import './ShopPage.css';

/**
 * ShopPage Component
 * Phụ trách: Thành viên 1 (Trưởng nhóm - System Architect & Trang Cửa hàng tổng hợp)
 */
export default function ShopPage() {
  const { products } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search keyword from Navbar
  const searchKeyword = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'all';

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [priceRange, setPriceRange] = useState('all'); // all, under100, 100-250, above250
  const [sortBy, setSortBy] = useState('newest'); // newest, price-asc, price-desc
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // 1. Search filter
    if (searchKeyword.trim()) {
      const q = searchKeyword.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // 2. Category filter
    if (selectedCategory !== 'all') {
      result = result.filter(p => 
        p.category && p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // 3. Price range filter
    if (priceRange === 'under100') {
      result = result.filter(p => p.price < 100);
    } else if (priceRange === '100-250') {
      result = result.filter(p => p.price >= 100 && p.price <= 250);
    } else if (priceRange === 'above250') {
      result = result.filter(p => p.price > 250);
    }

    // 4. Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.id || 0) - (a.id || 0));
    }

    return result;
  }, [products, searchKeyword, selectedCategory, priceRange, sortBy]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (cat === 'all') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="shop-page-container">
      {/* Header */}
      <div className="shop-header">
        <h1 className="shop-title">THE CURATED COLLECTION</h1>
        <p className="shop-subtitle">
          Timeless silhouettes, sustainable textiles, and refined craftsmanship.
          {searchKeyword && <span> (Results for: "<strong>{searchKeyword}</strong>")</span>}
        </p>
      </div>

      <div className="shop-layout">
        {/* Sidebar Filters */}
        <aside style={{ backgroundColor: '#fff', padding: '24px', border: '1px solid #E7E5E4', borderRadius: '2px', height: 'fit-content' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid #E7E5E4' }}>
            <Filter size={18} color="#775B3F" />
            <h3 style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, letterSpacing: '0.05em' }}>FILTERS</h3>
          </div>

          {/* Category Filter */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Categories</h4>
            {['all', 'women', 'men', 'accessories'].map(cat => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory.toLowerCase() === cat} 
                  onChange={() => handleCategoryChange(cat)}
                />
                <span style={{ textTransform: 'capitalize' }}>{cat === 'all' ? 'All Products' : cat}</span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 600, marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Price Range</h4>
            {[
              { id: 'all', label: 'All Prices' },
              { id: 'under100', label: 'Under $100' },
              { id: '100-250', label: '$100 — $250' },
              { id: 'above250', label: 'Above $250' },
            ].map(range => (
              <label key={range.id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '0.85rem', cursor: 'pointer' }}>
                <input 
                  type="radio" 
                  name="priceRange" 
                  checked={priceRange === range.id} 
                  onChange={() => { setPriceRange(range.id); setCurrentPage(1); }}
                />
                <span>{range.label}</span>
              </label>
            ))}
          </div>

          {/* Reset Filters */}
          <button
            onClick={() => { setSelectedCategory('all'); setPriceRange('all'); setSearchParams({}); }}
            style={{
              width: '100%',
              padding: '8px',
              backgroundColor: '#F5EFE6',
              border: '1px solid #D6D3D1',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            RESET ALL FILTERS
          </button>
        </aside>

        {/* Products Main Section */}
        <main>
          {/* Top Sort Bar */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '1px solid #E7E5E4'
          }}>
            <span style={{ fontSize: '0.9rem', color: '#78716C' }}>
              Showing <strong>{filteredProducts.length}</strong> styles
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowUpDown size={16} color="#78716C" />
              <select 
                value={sortBy} 
                onChange={e => setSortBy(e.target.value)}
                style={{
                  padding: '6px 12px',
                  border: '1px solid #D6D3D1',
                  backgroundColor: '#fff',
                  fontSize: '0.85rem',
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="newest">Sort by: Newest Arrival</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', backgroundColor: '#fff', border: '1px solid #E7E5E4' }}>
              <p style={{ fontSize: '1.1rem', color: '#78716C', marginBottom: '16px' }}>No products match your selected criteria.</p>
              <button 
                onClick={() => { setSelectedCategory('all'); setPriceRange('all'); setSearchParams({}); }}
                style={{ padding: '10px 24px', backgroundColor: '#1C1917', color: '#fff', border: 'none', cursor: 'pointer' }}
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px'
            }}>
              {paginatedProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  style={{
                    width: '36px',
                    height: '36px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: currentPage === pageNum ? '2px solid #1C1917' : '1px solid #D6D3D1',
                    backgroundColor: currentPage === pageNum ? '#1C1917' : '#fff',
                    color: currentPage === pageNum ? '#fff' : '#1C1917',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
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
