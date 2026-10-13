import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products as fallbackProducts, categories } from '../data/products';
import { useShop } from '../context/ShopContext';
import './HomePage.css';

// 4 Curated High-Fashion Editorial Slides (50% Female / 50% Male Visual Balance)
const HERO_SLIDES = [
  {
    id: 1,
    tag: "LUNE COLLECTION 2026",
    title: "Timeless",
    titleItalic: "With A Twist",
    description: "Discover our latest collection curated for the modern wardrobe. Timeless silhouettes, unhurried craftsmanship, and tactile natural textiles tailored for men and women.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=85&w=2200",
    archiveText: "PARIS ATELIER · ARCHIVE NO. 04",
    seasonText: "SPRING / SUMMER RUNWAY",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "#new-arrivals",
    secondaryCtaText: "ABOUT LUNE",
    secondaryCtaLink: "#about"
  },
  {
    id: 2,
    tag: "SILK & CASHMERE EDIT",
    title: "Tactile Luxury",
    titleItalic: "Everyday Grace",
    description: "Mulberry silks and pure Mongolian cashmere woven for effortless drape. Minimalist tailoring meeting the warmth of organic natural textiles.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=85&w=2200",
    archiveText: "ORGANIC TEXTILES · ARCHIVE NO. 05",
    seasonText: "CAPSULE NO. 02 · READY TO WEAR",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "#new-arrivals",
    secondaryCtaText: "DISCOVER FABRICS",
    secondaryCtaLink: "#about"
  },
  {
    id: 3,
    tag: "CONTEMPORARY MASCULINE & UNISEX",
    title: "Tailored Ease",
    titleItalic: "Modern Structure",
    description: "Crisp linen overshirts, structured double-breasted blazers, and fluid trousers crafted with architectural precision for everyday distinction.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=85&w=2200",
    archiveText: "MENSWEAR TAILORING · ARCHIVE NO. 06",
    seasonText: "BALANCED SILHOUETTES EDITION",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "#new-arrivals",
    secondaryCtaText: "ATELIER STORY",
    secondaryCtaLink: "#about"
  },
  {
    id: 4,
    tag: "ARTISANAL ACCENTS & LEATHER",
    title: "Sculpted Form",
    titleItalic: "Enduring Patina",
    description: "Full-grain caramel Italian leathers, brushed gold accents, and handcrafted accessories engineered to accompany your journey for decades.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=85&w=2200",
    archiveText: "LEATHER GOODS · ARCHIVE NO. 07",
    seasonText: "LIMITED ARTISAN RELEASE",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "#new-arrivals",
    secondaryCtaText: "READ THE JOURNAL",
    secondaryCtaLink: "#about"
  }
];

export default function HomePage() {
  const { products: contextProducts } = useShop();
  const allProducts = contextProducts && contextProducts.length > 0 ? contextProducts : fallbackProducts;

  // 1. Hero Carousel State
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // 2. Category Filter Tab State [ ALL | WOMEN | MEN | ACCESSORIES ]
  const [activeTab, setActiveTab] = useState('ALL');

  // Next / Prev handlers
  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  // Auto-play timer (5 seconds)
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, handleNext]);

  // Synchronize CategoryCard click: Smooth scroll to #new-arrivals and activate matching tab
  const handleCategorySelect = (categoryId) => {
    const id = categoryId ? categoryId.toLowerCase() : '';
    if (id === 'women') {
      setActiveTab('WOMEN');
    } else if (id === 'men') {
      setActiveTab('MEN');
    } else if (id === 'accessories') {
      setActiveTab('ACCESSORIES');
    } else {
      setActiveTab('ALL');
    }

    const targetSection = document.getElementById('new-arrivals');
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products by selected tab
  const filteredProducts = useMemo(() => {
    if (activeTab === 'WOMEN') {
      return allProducts.filter(p => p.category && p.category.toLowerCase() === 'women').slice(0, 4);
    }
    if (activeTab === 'MEN') {
      return allProducts.filter(p => p.category && p.category.toLowerCase() === 'men').slice(0, 4);
    }
    if (activeTab === 'ACCESSORIES') {
      return allProducts.filter(p => 
        (p.category && p.category.toLowerCase() === 'accessories') ||
        (p.garmentType && p.garmentType.toLowerCase().includes('leather'))
      ).slice(0, 4);
    }
    // Default 'ALL': Top 4 new arrivals representing balanced fashion
    return allProducts.slice(0, 4);
  }, [allProducts, activeTab]);

  // Counts for each tab
  const tabCounts = useMemo(() => {
    const womenCount = allProducts.filter(p => p.category && p.category.toLowerCase() === 'women').length;
    const menCount = allProducts.filter(p => p.category && p.category.toLowerCase() === 'men').length;
    const accCount = allProducts.filter(p => 
      (p.category && p.category.toLowerCase() === 'accessories') ||
      (p.garmentType && p.garmentType.toLowerCase().includes('leather'))
    ).length;
    return {
      ALL: allProducts.length,
      WOMEN: womenCount,
      MEN: menCount,
      ACCESSORIES: accCount
    };
  }, [allProducts]);

  const activeSlideData = HERO_SLIDES[currentSlide];

  return (
    <div className="home-page">
      {/* 1. HERO SECTION WITH CAROUSEL */}
      <section 
        className="hero-section"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-roledescription="carousel"
        aria-label="Editorial Collection Highlights"
      >
        {/* Slides Viewport */}
        <div className="hero-slides-viewport">
          {HERO_SLIDES.map((slide, index) => (
            <div 
              key={slide.id} 
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              aria-hidden={index !== currentSlide}
            >
              <img 
                src={slide.image} 
                alt={slide.title} 
                className="hero-slide-bg"
              />
              <div className="hero-scrim-overlay"></div>
            </div>
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button 
          type="button" 
          className="hero-nav-arrow prev" 
          onClick={handlePrev} 
          aria-label="Previous editorial slide"
        >
          <ChevronLeft size={22} />
        </button>
        <button 
          type="button" 
          className="hero-nav-arrow next" 
          onClick={handleNext} 
          aria-label="Next editorial slide"
        >
          <ChevronRight size={22} />
        </button>

        {/* Hero Content Container */}
        <div className="container hero-container hero-content-layer">
          <div className="hero-content hero-slide-content" key={activeSlideData.id}>
            <span className="hero-tag">
              <Sparkles size={13} className="hero-sparkle" />
              {activeSlideData.tag}
            </span>

            <h1 className="hero-heading">
              {activeSlideData.title} <br />
              <span className="hero-heading-italic">{activeSlideData.titleItalic}</span>
            </h1>

            <p className="hero-description">
              {activeSlideData.description}
            </p>

            <div className="hero-actions">
              <a href={activeSlideData.primaryCtaLink} className="btn-primary hero-btn">
                <span>{activeSlideData.primaryCtaText}</span>
                <ArrowRight size={15} />
              </a>
              <a href={activeSlideData.secondaryCtaLink} className="btn-secondary hero-btn-secondary">
                <span>{activeSlideData.secondaryCtaText}</span>
              </a>
            </div>

            {/* Pagination Dots & Slide Counter */}
            <div className="hero-indicators-bar" role="tablist" aria-label="Hero carousel pagination">
              {HERO_SLIDES.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  role="tab"
                  aria-selected={index === currentSlide}
                  className={`hero-dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Jump to slide ${index + 1}`}
                />
              ))}
              <span className="hero-slide-counter">
                0{currentSlide + 1} / 0{HERO_SLIDES.length}
              </span>
            </div>
          </div>
        </div>

        {/* Hero Bottom Bar */}
        <div className="hero-bottom-bar">
          <div className="container hero-bar-flex">
            <span className="hero-bar-text">{activeSlideData.archiveText}</span>
            <a href="#new-arrivals" className="hero-bar-scroll" style={{ textDecoration: 'none' }}>
              SCROLL TO DISCOVER ↓
            </a>
            <span className="hero-bar-text">{activeSlideData.seasonText}</span>
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
              <CategoryCard 
                key={category.id} 
                category={category} 
                onSelectCategory={handleCategorySelect}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 3. NEW ARRIVALS SECTION WITH CATEGORY FILTER TABS */}
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

          {/* Category Filter Tabs: [ ALL | WOMEN | MEN | ACCESSORIES ] */}
          <div className="category-filter-bar">
            <div className="category-filter-tabs" role="tablist" aria-label="Filter New Arrivals by Category">
              {['ALL', 'WOMEN', 'MEN', 'ACCESSORIES'].map((tab) => (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === tab}
                  className={`category-tab-btn ${activeTab === tab ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab)}
                >
                  <span>{tab}</span>
                  <span className="category-tab-count">
                    {tabCounts[tab] !== undefined ? tabCounts[tab] : 0}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid (with animated transition on filter change) */}
          <div className="products-grid products-grid-animated" key={activeTab}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <div className="tab-empty-state">
                <h3 className="tab-empty-title">No Pieces Available In This Silhouette</h3>
                <p className="tab-empty-desc">
                  Explore other curated categories or visit our full catalog to discover more.
                </p>
                <button 
                  type="button"
                  className="btn-primary"
                  onClick={() => setActiveTab('ALL')}
                >
                  <span>VIEW ALL NEW ARRIVALS</span>
                </button>
              </div>
            )}
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
