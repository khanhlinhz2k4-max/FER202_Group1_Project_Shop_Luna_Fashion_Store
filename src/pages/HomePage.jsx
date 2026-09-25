import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products, categories } from '../data/products';

export default function HomePage() {
  // New Arrivals: 4 realistic fashion products
  const newArrivals = products.slice(0, 4);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-background-wrapper">
          <img 
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=2200" 
            alt="LUNE Collection 2026 Editorial" 
            className="hero-bg-img"
          />
          <div className="hero-scrim-overlay"></div>
        </div>

        <div className="container hero-container">
          <div className="hero-content">
            <span className="hero-tag">
              <Sparkles size={13} className="hero-sparkle" />
              LUNE COLLECTION 2026
            </span>

            <h1 className="hero-heading">
              Timeless <br />
              <span className="hero-heading-italic">With A Twist</span>
            </h1>

            <p className="hero-description">
              Discover our latest collection curated for the modern wardrobe. Timeless silhouettes, unhurried craftsmanship, and tactile natural textiles tailored for men and women.
            </p>

            <div className="hero-actions">
              <a href="#new-arrivals" className="btn-primary hero-btn">
                <span>EXPLORE COLLECTION</span>
                <ArrowRight size={15} />
              </a>
              <a href="#about" className="btn-secondary hero-btn-secondary">
                <span>ABOUT LUNE</span>
              </a>
            </div>
          </div>
        </div>

        {/* Hero bottom indicator */}
        <div className="hero-bottom-bar">
          <div className="container hero-bar-flex">
            <span className="hero-bar-text">PARIS ATELIER · ARCHIVE NO. 04</span>
            <span className="hero-bar-scroll">SCROLL TO DISCOVER ↓</span>
            <span className="hero-bar-text">SPRING / SUMMER EDITION</span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section id="categories" className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">CURATED SILHOUETTES</span>
            <h2 className="section-title">Product Categories</h2>
            <p className="section-desc">
              Explore our core wardrobe foundations meticulously developed to transcend seasonal cycles.
            </p>
          </div>

          <div className="categories-grid">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS SECTION */}
      <section id="new-arrivals" className="new-arrivals-section">
        <div className="container">
          <div className="section-header-row">
            <div>
              <span className="eyebrow">SPRING RUNWAY 2026</span>
              <h2 className="section-title">New Arrivals</h2>
              <p className="section-desc">
                Four signature pieces embodying the warm, effortless essence of LUNE.
              </p>
            </div>
            <a href="#categories" className="btn-underline view-all-link">
              <span>View All Categories</span>
              <ArrowUpRight size={14} />
            </a>
          </div>

          {/* 4-column product grid */}
          <div className="products-grid">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 4. ABOUT LUNE FASHION STORE */}
      <section id="about" className="brand-story-strip">
        <div className="container">
          <div className="brand-story-grid">
            <div className="brand-story-media">
              <img 
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200" 
                alt="LUNE Fashion Store Collection"
                className="story-image"
                loading="lazy"
              />
              <div className="story-badge">
                <span className="story-badge-year">LUNE STORE</span>
                <span className="story-badge-text">READY TO WEAR</span>
              </div>
            </div>

            <div className="brand-story-content">
              <span className="eyebrow">ABOUT LUNE FASHION STORE</span>
              <h2 className="story-title">
                Everyday Elegance, Modern Style
              </h2>
              <p className="story-paragraph">
                LUNE Fashion Store curates modern ready-to-wear collections for both men and women. We focus on clean silhouettes, breathable fabrics, and versatile styling that transitions effortlessly from the workplace to weekend gatherings.
              </p>
              <p className="story-paragraph">
                From tailored blazers and fluid slip dresses to relaxed knitwear and wide-leg trousers, every garment is thoughtfully selected to elevate your everyday wardrobe with ease and confidence.
              </p>

              <div className="story-stats">
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Selected Fabrics</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Versatile</span>
                  <span className="stat-label">Effortless Styling</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30 Days</span>
                  <span className="stat-label">Easy Exchanges</span>
                </div>
              </div>

              <div className="story-action">
                <Link to="/register" className="btn-secondary">
                  <span>CREATE AN ACCOUNT</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
