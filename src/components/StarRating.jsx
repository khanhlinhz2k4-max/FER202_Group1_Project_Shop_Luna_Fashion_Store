import React, { useState } from 'react';
import { Star } from 'lucide-react';

/**
 * StarRating Component
 * Reusable star rating indicator and interactive star selector
 * Warm Luxury Aesthetic for Lune Fashion Store
 */
export default function StarRating({
  rating = 5,
  maxStars = 5,
  size = 15,
  interactive = false,
  onRatingChange,
  showScore = false,
  count = null,
  color = "#C8AE84",
  emptyColor = "#E7DDCE"
}) {
  const [hoverRating, setHoverRating] = useState(0);

  const displayRating = interactive && hoverRating > 0 ? hoverRating : rating;

  return (
    <div 
      style={{ 
        display: 'inline-flex', 
        alignItems: 'center', 
        gap: '4px',
        userSelect: 'none'
      }}
    >
      <div 
        style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: interactive ? '6px' : '2px',
          cursor: interactive ? 'pointer' : 'default' 
        }}
        onMouseLeave={() => interactive && setHoverRating(0)}
      >
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= Math.round(displayRating);

          return (
            <span
              key={index}
              onClick={() => {
                if (interactive && onRatingChange) {
                  onRatingChange(starValue);
                }
              }}
              onMouseEnter={() => {
                if (interactive) {
                  setHoverRating(starValue);
                }
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                transition: 'transform 0.15s ease, color 0.15s ease',
                transform: interactive && hoverRating >= starValue ? 'scale(1.2)' : 'scale(1)',
                padding: interactive ? '2px' : '0'
              }}
              title={interactive ? `Rate ${starValue} stars` : `${rating} stars`}
            >
              <Star
                size={size}
                fill={isFilled ? color : 'transparent'}
                color={isFilled ? color : emptyColor}
                strokeWidth={isFilled ? 1.5 : 1.2}
              />
            </span>
          );
        })}
      </div>

      {showScore && (
        <span 
          style={{ 
            fontSize: '0.82rem', 
            fontWeight: 600, 
            color: '#2C2117', 
            marginLeft: '4px' 
          }}
        >
          {Number(rating).toFixed(1)}
        </span>
      )}

      {count !== null && count !== undefined && (
        <span 
          style={{ 
            fontSize: '0.78rem', 
            color: '#7A6B5D', 
            marginLeft: '2px' 
          }}
        >
          ({count})
        </span>
      )}
    </div>
  );
}
