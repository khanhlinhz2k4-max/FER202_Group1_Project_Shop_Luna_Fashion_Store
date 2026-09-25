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
              <a href="#philosophy" className="btn-secondary hero-btn-secondary">
                <span>OUR PHILOSOPHY</span>
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

      {/* 4. EDITORIAL BANNER SECTION */}
      <section className="editorial-section">
        <div className="editorial-banner">
          <div className="editorial-img-wrap">
            <img 
              src="https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&q=85&w=2000" 
              alt="LUNE Editorial Campaign" 
              className="editorial-bg-image"
            />
            <div className="editorial-overlay"></div>
          </div>

          <div className="container editorial-container">
            <div className="editorial-card">
              <span className="editorial-tag">THE EDITORIAL CAMPAIGN</span>
              <h2 className="editorial-quote">
                "Designed for those who define their own style."
              </h2>
              <p className="editorial-text">
                Every piece in the LUNE atelier begins with tactile touch. From bespoke French flax to Mongolian cashmere, our pieces are cut to drape effortlessly, celebrating modern poise and understated elegance.
              </p>
              <div className="editorial-cta">
                <a href="#new-arrivals" className="btn-primary">
                  <span>DISCOVER THE EDIT</span>
                  <ArrowRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. BRAND HIGHLIGHT / STORY STRIP */}
      <section id="philosophy" className="brand-story-strip">
        <div className="container">
          <div className="brand-story-grid">
            <div className="brand-story-media">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=1200" 
                alt="LUNE Atelier Craftsmanship"
                className="story-image"
                loading="lazy"
              />
              <div className="story-badge">
                <span className="story-badge-year">EST. 2026</span>
                <span className="story-badge-text">PURE CRAFT</span>
              </div>
            </div>

            <div className="brand-story-content">
              <span className="eyebrow">THE LUNE PHILOSOPHY</span>
              <h2 className="story-title">
                Warm Luxury Born From Quiet Confidence
              </h2>
              <p className="story-paragraph">
                We believe true sophistication doesn't shout. It whispers through the drape of raw silk, the warmth of earthy caramels, and the quiet precision of an immaculate seam.
              </p>
              <p className="story-paragraph">
                Every garment is thoughtfully created in limited batches to eliminate waste, honoring the artisans who pour their mastery into every stitch.
              </p>

              <div className="story-stats">
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Natural Fibers</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Limited</span>
                  <span className="stat-label">Numbered Editions</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Carbon Neutral</span>
                  <span className="stat-label">Sustainable Shipping</span>
                </div>
              </div>

              <div className="story-action">
                <Link to="/register" className="btn-secondary">
                  <span>JOIN THE ATELIER</span>
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
