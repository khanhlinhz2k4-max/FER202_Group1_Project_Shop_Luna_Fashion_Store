import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import CategoryCard from '../components/CategoryCard';
import { products as fallbackProducts, categories } from '../data/products';
import { useShop } from '../context/ShopContext';
import { useLanguage } from '../context/LanguageContext';
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
    archiveText: "PARIS ATELIER · ARCHIVE NO. 01",
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
    archiveText: "ORGANIC TEXTILES · ARCHIVE NO. 02",
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
    archiveText: "MENSWEAR TAILORING · ARCHIVE NO. 03",
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
    archiveText: "LEATHER GOODS · ARCHIVE NO. 04",
    seasonText: "LIMITED ARTISAN RELEASE",
    primaryCtaText: "EXPLORE COLLECTION",
    primaryCtaLink: "#new-arrivals",
    secondaryCtaText: "READ THE JOURNAL",
    secondaryCtaLink: "#about"
  }
];

export default function HomePage() {
  const { products: contextProducts } = useShop();
  const { t, language } = useLanguage();
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

  const currentSlideTrans = [
    {
      tag: t('home.heroTag1'),
      title: t('home.heroTitle1'),
      titleItalic: t('home.heroItalic1'),
      desc: t('home.heroDesc1'),
      primaryCta: t('home.heroCtaPrimary1'),
      secondaryCta: t('home.heroCtaSecondary1'),
      archive: t('home.heroArchive1'),
      season: t('home.heroSeason1'),
    },
    {
      tag: t('home.heroTag2'),
      title: t('home.heroTitle2'),
      titleItalic: t('home.heroItalic2'),
      desc: t('home.heroDesc2'),
      primaryCta: t('home.heroCtaPrimary1'),
      secondaryCta: t('home.heroCtaSecondary1'),
      archive: t('home.heroArchive2'),
      season: t('home.heroSeason2'),
    },
    {
      tag: t('home.heroTag3'),
      title: t('home.heroTitle3'),
      titleItalic: t('home.heroItalic3'),
      desc: t('home.heroDesc3'),
      primaryCta: t('home.heroCtaPrimary1'),
      secondaryCta: t('home.heroCtaSecondary1'),
      archive: t('home.heroArchive3'),
      season: t('home.heroSeason3'),
    },
    {
      tag: t('home.heroTag4'),
      title: t('home.heroTitle4'),
      titleItalic: t('home.heroItalic4'),
      desc: t('home.heroDesc4'),
      primaryCta: t('home.heroCtaPrimary1'),
      secondaryCta: t('home.heroCtaSecondary1'),
      archive: t('home.heroArchive4'),
      season: t('home.heroSeason4'),
    }
  ][currentSlide] || {};

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
              {currentSlideTrans.tag || activeSlideData.tag}
            </span>

            <h1 className="hero-heading">
              {currentSlideTrans.title || activeSlideData.title} <br />
              <span className="hero-heading-italic">{currentSlideTrans.titleItalic || activeSlideData.titleItalic}</span>
            </h1>

            <p className="hero-description">
              {currentSlideTrans.desc || activeSlideData.description}
            </p>

            <div className="hero-actions">
              <a href={activeSlideData.primaryCtaLink} className="btn-primary hero-btn">
                <span>{currentSlideTrans.primaryCta || activeSlideData.primaryCtaText}</span>
                <ArrowRight size={15} />
              </a>
              <a href={activeSlideData.secondaryCtaLink} className="btn-secondary hero-btn-secondary">
                <span>{currentSlideTrans.secondaryCta || activeSlideData.secondaryCtaText}</span>
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
            <span className="hero-bar-text">{currentSlideTrans.archive || activeSlideData.archiveText}</span>
            <a href="#new-arrivals" className="hero-bar-scroll" style={{ textDecoration: 'none' }}>
              {t('home.scrollDiscover', 'SCROLL TO DISCOVER ↓')}
            </a>
            <span className="hero-bar-text">{currentSlideTrans.season || activeSlideData.seasonText}</span>
          </div>
        </div>
      </section>

      {/* 2. CATEGORIES SECTION */}
      <section id="categories" className="categories-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">{t('home.categoriesTitle')}</span>
            <h2 className="section-title">{t('nav.categories')}</h2>
            <p className="section-desc">
              {t('home.categoriesSubtitle')}
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
              <span className="eyebrow">{t('nav.springSummer')}</span>
              <h2 className="section-title">{t('home.newArrivalsTitle')}</h2>
              <p className="section-desc">
                {t('home.newArrivalsSubtitle')}
              </p>
            </div>
            <Link 
              to={activeTab === 'ALL' ? '/shop' : `/shop?category=${activeTab.toLowerCase()}`} 
              className="btn-underline view-all-link"
            >
              <span>{t('common.viewDetails')}</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>

          {/* Category Filter Tabs: [ ALL | WOMEN | MEN | ACCESSORIES ] */}
          <div className="category-filter-bar">
            <div className="category-filter-tabs" role="tablist" aria-label="Filter New Arrivals by Category">
              {[
                { id: 'ALL', label: t('home.tabAll') },
                { id: 'WOMEN', label: t('home.tabWomen') },
                { id: 'MEN', label: t('home.tabMen') },
                { id: 'ACCESSORIES', label: t('home.tabAccessories') }
              ].map(({ id, label }) => (
                <button
                  key={id}
                  type="button"
                  role="tab"
                  aria-selected={activeTab === id}
                  className={`category-tab-btn ${activeTab === id ? 'active' : ''}`}
                  onClick={() => setActiveTab(id)}
                >
                  <span>{label}</span>
                  <span className="category-tab-count">
                    {tabCounts[id] !== undefined ? tabCounts[id] : 0}
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
                <h3 className="tab-empty-title">{t('home.emptySilhouettes', 'No Pieces Available In This Silhouette')}</h3>
                <p className="tab-empty-desc">
                  {t('home.emptySilhouettesDesc', 'Explore other curated categories or visit our full catalog to discover more.')}
                </p>
                <button 
                  type="button"
                  className="btn-primary"
                  onClick={() => setActiveTab('ALL')}
                >
                  <span>{t('home.tabAll')}</span>
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
              <span className="eyebrow">{t('home.brandValuesTitle')}</span>
              <h2 className="story-title">
                {t('home.brandValuesSubtitle')}
              </h2>
              <p className="story-paragraph">
                {t('home.val1Desc')}
              </p>
              <p className="story-paragraph">
                {t('home.val2Desc')}
              </p>

              <div className="story-stats">
                <div className="stat-item">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">{t('home.val1Title')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">Atelier</span>
                  <span className="stat-label">{t('home.val2Title')}</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">30 Days</span>
                  <span className="stat-label">{t('home.val3Title')}</span>
                </div>
              </div>

              <div className="story-action">
                <Link to="/register" className="btn-secondary">
                  <span>{t('nav.login')} / {t('nav.register', 'Register')}</span>
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
