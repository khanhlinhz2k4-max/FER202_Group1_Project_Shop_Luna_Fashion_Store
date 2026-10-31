# UI/UX DESIGN SPECIFICATION & BRAND DESIGN SYSTEM
**Course:** FER202 — Front-End Web Development with React  
**Project:** LUNE Fashion Store (Unisex Luxury Ready-to-Wear Atelier)  
**Visual Direction:** Warm Luxury × Modern Trendy × Tactile Natural Grace  
**Document Version:** 2.0 (English Edition)

---

## 1. Visual Philosophy & Design Principles

### 1.1 Balanced Unisex Representation (50% Female / 50% Male)
LUNE is not an exclusive womenswear boutique, cosmetics shop, or bridal salon. The interface maintains a strict 50/50 visual parity between Women's and Men's ready-to-wear collections. Imagery, curated categories, hero slides, and product showcases celebrate both masculine tailoring and soft feminine warmth.

### 1.2 Warmth Over Clinical Minimalism (Quiet Luxury)
Unlike sterile, stark monochrome storefronts (pure black `#000000` and hospital white `#FFFFFF`), LUNE utilizes warm organic tones inspired by unbleached linen, raw mulberry silk, and dark cocoa beans. This creates an inviting, tactile digital atmosphere that encourages relaxed, thoughtful browsing.

### 1.3 Restraint & Visual Discipline (Do NOTs)
- **NO Heavy Drop-Shadows:** Micro-interactions rely on subtle, diffused ambient shadows (`box-shadow: 0 4px 20px rgba(119, 91, 63, 0.06)`).
- **NO Jarring Neon CTAs:** Action triggers use warm taupe `#775B3F` and desert sand `#C8AE84`.
- **NO Cluttered Layouts:** Maximum container width is capped at 1320px with generous whitespace.

---

## 2. Color Palette Tokens & Typography

### 2.1 CSS Color Tokens (`src/index.css`)

| System Token Name | Hex Code | Visual Identity & Functional Implementation |
|:---|:---:|:---|
| `--primary-brown` | `#775B3F` | **Warm Cocoa Taupe:** Core brand identifier, primary action buttons, brand logo, and high-emphasis icons. |
| `--bg-page` | `#FAF7F2` | **Soft Alabaster / Milk Cream:** Main page canvas background, whitespace areas, and input surfaces. |
| `--soft-beige` | `#FEE3AF` | **Warm Champagne:** Subtle background highlights, announcement bar accents, and active indicator pills. |
| `--border-light` | `#C8AE84` | **Desert Sand:** 1px hairline input borders, card boundaries, and secondary outline buttons. |
| `--caramel` | `#CAA072` | **Rich Caramel:** Interactive hover accents, subtitle eyebrows, and secondary links. |
| `--gold-sheen` | `#E0B77C` | **Sunburst Gold:** VIP badges, rating stars, and fine jewelry/leather highlights. |
| `--text-primary` | `#2C2117` | **Deep Espresso:** Primary typography for titles, product names, and pricing (WCAG AAA contrast). |
| `--text-secondary` | `#5C4A3A` | **Medium Coffee:** Editorial body copy, fabric descriptions, and navigation menu links. |
| `--text-muted` | `#8F7965` | **Soft Bark:** Form placeholders, strikethrough original prices, and metadata labels. |

### 2.2 Typography Hierarchy
- **Editorial Serif (`Playfair Display` / `Cormorant Garamond`):** Used for primary hero headlines, section titles (h1–h3), brand story quotes, and product titles. Features high contrast between thick and thin strokes and elegant italic accents (*"With A Twist"*, *"Everyday Grace"*).
- **Contemporary Geometric Sans-Serif (`Montserrat` / `Inter`):** Used for navigation menus, uppercase tracking labels (`letter-spacing: 0.14em - 0.28em`), technical garment attributes, pricing, form inputs, and transactional buttons.

---

## 3. Responsive Layout Grid & Viewports

### 3.1 Desktop Viewport ($\ge$ 1024px)
- **Product Catalog Grid:** 4-column balanced layout (`repeat(4, 1fr); gap: 2rem;`), presenting full garment silhouettes at an editorial 3:4 aspect ratio.
- **Core Categories Grid:** 3-column equal-width layout (`repeat(3, 1fr)`) with an image height of 520px and subtle zoom hover effects (`transform: scale(1.05)`).
- **Brand Story Split Layout:** Asymmetric 2-column grid (editorial imagery on left, narrative storytelling on right).

### 3.2 Tablet Viewport (768px – 1023px)
- Product grid smoothly collapses to a 2-column configuration (`repeat(2, 1fr); gap: 1.5rem;`).
- Hero scrim overlay adjusts from a horizontal gradient (90deg) to a vertical fade (180deg) for optimal text legibility over portrait imagery.

### 3.3 Mobile Viewport ($<$ 768px)
- Navigation transitions to an off-canvas slide-out drawer (width 320px or 85vw) with independent backdrop blur.
- Tables in the Admin Portal activate touch-friendly horizontal scrolling (`overflow-x: auto`) and fluid stacked cells to prevent text truncation.

