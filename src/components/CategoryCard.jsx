import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function CategoryCard({ category, onSelectCategory }) {
  const { t } = useLanguage();

  const handleClick = (e) => {
    if (onSelectCategory) {
      e.preventDefault();
      onSelectCategory(category.id);
    }
  };

  const getLocalizedTitle = () => {
    if (category.id === 'women') return t('nav.women', 'WOMEN');
    if (category.id === 'men') return t('nav.men', 'MEN');
    if (category.id === 'new-collection') return t('nav.newCollection', 'NEW COLLECTION');
    return category.title;
  };

  const getLocalizedSubtitle = () => {
    if (category.id === 'women') return t('categoryCard.womenSubtitle', 'Spring / Summer 2026');
    if (category.id === 'men') return t('categoryCard.menSubtitle', 'Tailored Simplicity');
    if (category.id === 'new-collection') return t('categoryCard.newSubtitle', 'The 2026 Runway');
    return category.subtitle;
  };

  const title = getLocalizedTitle();
  const subtitle = getLocalizedSubtitle();

  return (
    <div className="category-card">
      <a 
        href="#new-arrivals" 
        className="category-card-inner"
        onClick={handleClick}
        aria-label={`Explore ${title} collection`}
      >
        <div className="category-image-wrap">
          <img 
            src={category.image} 
            alt={title} 
            className="category-img"
            loading="lazy"
          />
          <div className="category-overlay"></div>
        </div>

        <div className="category-content">
          <span className="category-subtitle">{subtitle}</span>
          <h3 className="category-title">{title}</h3>
          
          <div className="category-cta">
            <span className="category-cta-text">{t('categoryCard.viewSilhouettes', 'VIEW SILHOUETTES')}</span>
            <div className="category-arrow-circle">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

