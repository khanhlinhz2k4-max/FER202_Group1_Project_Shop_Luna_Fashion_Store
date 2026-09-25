export const products = [
  {
    id: 1,
    name: "Atelier Tailored Linen Blazer",
    category: "Women",
    price: 245,
    originalPrice: 290,
    tag: "New Season",
    description: "Expertly structured in a breathable linen-silk blend. Features a double-breasted closure and softly padded shoulders for a timeless silhouette.",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=900",
    secondaryImage: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
    isNew: true,
    colors: ["#C8AE84", "#FEE3AF", "#775B3F"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 2,
    name: "Sienna Silk Draped Midi Dress",
    category: "Women",
    price: 210,
    tag: "Bestseller",
    description: "Flowing mulberry silk cut on the bias to gently skim the body. Finished with delicate hand-stitched straps and an open low back.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
    secondaryImage: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=900",
    isNew: true,
    colors: ["#CAA072", "#E0B77C", "#775B3F"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 3,
    name: "Cashmere Ribbed Knit Cardigan",
    category: "Women",
    price: 175,
    originalPrice: 195,
    tag: "Essential",
    description: "Spun from ultra-fine Mongolian cashmere with horn-effect buttons. Warm, tactile, and effortlessly relaxed for all-season layering.",
    image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=900",
    secondaryImage: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=900",
    isNew: true,
    colors: ["#FEE3AF", "#C8AE84"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 4,
    name: "Paloma Wide-Leg Pleated Trouser",
    category: "Women",
    price: 155,
    tag: "Signature",
    description: "High-waisted trousers with deep front pleats and a sweeping wide-leg silhouette. Tailored from premium wrinkle-resistant wool-linen.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=900",
    secondaryImage: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=900",
    isNew: true,
    colors: ["#C8AE84", "#775B3F"],
    sizes: ["XS", "S", "M", "L"]
  },
  {
    id: 5,
    name: "Solène Wool Trench Overcoat",
    category: "New Collection",
    price: 360,
    tag: "Limited Edition",
    description: "A masterclass in modern proportion. Handcrafted double-faced wool with a belted waist and storm flap detailing.",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=900",
    isNew: false,
    colors: ["#CAA072", "#775B3F"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 6,
    name: "Aurelia Champagne Satin Cami",
    category: "Women",
    price: 95,
    tag: "Popular",
    description: "Minimalist silk-satin camisole with a delicate V-neckline and French seams. Ideal under blazers or paired with denim.",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=900",
    isNew: false,
    colors: ["#FEE3AF", "#E0B77C"],
    sizes: ["XS", "S", "M"]
  },
  {
    id: 7,
    name: "Luna Saddle Leather Shoulder Bag",
    category: "Accessories",
    price: 220,
    tag: "Artisan",
    description: "Full-grain caramel Italian leather with brushed gold hardware. Structured yet soft, designed to patina beautifully with age.",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=900",
    isNew: true,
    colors: ["#775B3F", "#CAA072"],
    sizes: ["One Size"]
  },
  {
    id: 8,
    name: "Adrien Relaxed Linen Overshirt",
    category: "Men",
    price: 165,
    tag: "New Season",
    description: "Clean contemporary silhouette cut from heavyweight French washed linen. Layered seamlessly over tees or styled buttoned up.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=900",
    isNew: false,
    colors: ["#C8AE84", "#FEE3AF"],
    sizes: ["S", "M", "L", "XL"]
  }
];

export const categories = [
  {
    id: "women",
    title: "WOMEN",
    subtitle: "Spring / Summer 2026",
    link: "/shop?category=women",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=1200",
    itemCount: "28 Styles"
  },
  {
    id: "men",
    title: "MEN",
    subtitle: "Tailored Simplicity",
    link: "/shop?category=men",
    image: "https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?auto=format&fit=crop&q=80&w=1200",
    itemCount: "16 Styles"
  },
  {
    id: "new-collection",
    title: "NEW COLLECTION",
    subtitle: "The 2026 Runway",
    link: "/shop?category=new",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=1200",
    itemCount: "Exclusive Drops"
  }
];
