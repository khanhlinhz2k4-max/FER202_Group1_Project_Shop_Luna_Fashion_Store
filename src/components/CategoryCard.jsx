import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }) {
  return (
    <div className="category-card">
      <a href="#new-arrivals" className="category-card-inner">
        <div className="category-image-wrap">
          <img 
            src={category.image} 
            alt={category.title} 
            className="category-img"
            loading="lazy"
          />
          <div className="category-overlay"></div>
        </div>

        <div className="category-content">
          <span className="category-subtitle">{category.subtitle}</span>
          <h3 className="category-title">{category.title}</h3>
          
          <div className="category-cta">
            <span className="category-cta-text">VIEW SILHOUETTES</span>
            <div className="category-arrow-circle">
              <ArrowRight size={14} />
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
