# PROJECT TASK ALLOCATION AND IMPLEMENTATION TIMELINE
**Course:** FER202 — Front-End Web Development with React  
**Project:** LUNE Fashion Store (Unisex Luxury Ready-to-Wear Atelier)  
**Class:** SE20B.NJS — **Group:** Group 1  
**Supervisor:** Mr. Huynh Vang (`vangh@fe.edu.vn`)  
**Repository:** [GitHub Repository](https://github.com/khanhlinhz2k4-max/FER202_Group1_Project_Shop_Luna_Fashion_Store)

---

## 1. Team Members and Work Packages Allocation

| No. | Full Name | Student ID | Email | Project Role & Package | Contribution |
|:---:|:---|:---:|:---|:---|:---:|
| 1 | **Nguyen Chau Khanh Linh** | QE180043 | `linhnckqe180043@fpt.edu.vn` | **Team Leader & Core Architect** | 100% |
| 2 | **Ho Anh Nhat** | QE200301 | `hoanhnhatqn2020@gmail.com` | **Home Page & Search Developer** | 100% |
| 3 | **Chu Bao Khanh** | HE171093 | `khanhcbhe171093@fpt.edu.vn` | **Product & Wishlist Developer** | 100% |
| 4 | **Thai Thu Hien** | QE190124 | `thaithuhien29@gmail.com` | **Cart & Checkout Developer** | 100% |
| 5 | **Le Phan Ngoc Huy** | QE190055 | `lephanngochuy11a6ltt@gmail.com` | **Auth & Profile Developer** | 100% |
| 6 | **Pham Dinh Dang Quang** | QE190013 | `quanglg698@gmail.com` | **Admin Portal Developer** | 100% |

---

## 2. Detailed Technical Responsibilities

### Member 1: Nguyen Chau Khanh Linh (Team Leader & System Architect)
- **Core Architecture:** Built and maintained global state in `ShopContext.jsx` and `LanguageContext.jsx`, client-side persistence (`lune_cart`, `lune_wishlist`, `lune_orders`, `lune_users`), and centralized bilingual dictionary (`translations.js`, 967 keys).
- **Shop Catalog Page (`ShopPage.jsx`):** Multi-criteria faceted filtering (Category, Garment Type, Size XS–XL, Color Swatches, Price Range $90–$400), sorting (Newest, Price Low/High), and auto-reset pagination.
- **Shared Boutique Modules:** Built `ChatBot.jsx` (24/7 AI Stylist with NLP size recommendation), `InvoiceModal.jsx` (A4 printable boutique receipt via React Portals), `CustomSelect.jsx`, and global error recovery via `ErrorBoundary.jsx`.
- **Project Coordination:** Git branching, code reviews, PR approvals, and cross-module synchronization.

### Member 2: Ho Anh Nhat (Home Page & Search Developer)
- **Home Page (`HomePage.jsx`):** 4-slide editorial Hero Banner Carousel with 5s autoplay and hover-pause, "Curated Silhouettes" category cards with smooth-scroll section routing, and "New Arrivals" tabbed filters.
- **Smart Sticky Navigation (`Navbar.jsx`):** Intelligent hide-on-scroll-down and reveal-on-scroll-up sticky header with blur backdrop.
- **Live Search Engine:** Debounced keyword matching with instant product preview dropdown and curated trending search chips.
- **Brand Footer (`Footer.jsx`):** Four Brand Value Pillars ($200+ Free Delivery, Sustainable Materials, 30-Day Exchanges, Authenticity), interactive policy modals, and validated LUNE Journal newsletter subscription.

### Member 3: Chu Bao Khanh (Product & Wishlist Developer)
- **Product Card (`ProductCard.jsx`):** Reusable 3:4 portrait card with image transitions, stock badges, and interactive triggers.
- **Product Detail Page (`ProductDetailPage.jsx`):** High-resolution thumbnail gallery, size/color selectors, live stock validation, info accordions, and customer reviews list.
- **Interactive Modals:** Built `QuickViewModal.jsx` for fast product preview and `SizeGuideModal.jsx` with metric measurement tables.
- **Wishlist Module (`WishlistPage.jsx`):** Saved items archive, non-blocking floating toast alerts (`WishlistToast.jsx`), 1-click "Move to Bag", and guest-to-member wishlist merging.

### Member 4: Thai Thu Hien (Cart & Checkout Developer)
- **Shopping Bag Drawer (`CartDrawer.jsx`):** Off-canvas slide-in drawer, quantity stepper `[- 1 +]`, duplicate variant consolidation, and dynamic $200 Free Shipping progress bar.
- **Checkout Page (`CheckoutPage.jsx`):** Profile address book autofill, shipping form validation, custom boutique voucher selector dropdown with real-time discounts, and 3 payment methods (International Card, dynamic VietQR with live USD-to-VND conversion, and COD).
- **Order Success Page (`OrderSuccessPage.jsx`):** Unique Order ID generation (`LUNE-XXXX`), 4-stage fulfillment progress tracker (`OrderTimeline.jsx`), and 1-click boutique invoice printing.

### Member 5: Le Phan Ngoc Huy (Authentication & Profile Developer)
- **Authentication Pages (`LoginPage.jsx` & `RegisterPage.jsx`):** Split-layout UI, 4-criteria real-time password strength meter, 1-click demo accounts (`customer@lune.com` and `admin@lune.com`), and forgot password modal.
- **Route Authorization (`ProtectedRoute.jsx`):** Client-side Role-Based Access Control (RBAC) protecting `/profile` and `/admin/*`, with anti-redirect-loop sanitization.
- **Customer Profile (`ProfilePage.jsx`):** 5-tab modular hub (My Orders, Personal Details, Password & Security, Address Book, Saved Wishlist), pending order cancellation with automated restock, and verified product review triggers.

### Member 6: Pham Dinh Dang Quang (Admin Portal Developer)
- **Admin Layout (`AdminLayout.jsx`):** Unified administrative sidebar navigation, bilingual switcher, and secure session termination.
- **Admin Dashboard (`AdminDashboard.jsx`):** 4 top-level KPI metric cards, interactive native SVG 7-Day Revenue Area Chart, and Category Sales Donut Chart.
- **Product Management (`AdminProducts.jsx`):** Master catalog table CRUD, color-coded inventory badges, 1-click `Eye/EyeOff` visibility toggle, and Admin Preview Mode.
- **Order Fulfillment (`AdminOrders.jsx`):** Lifecycle status progression (`Pending -> Shipping -> Delivered -> Cancelled`) with automated stock restoration upon cancellation.
- **Promotions & Moderation:** Voucher modal CRUD (`AdminVouchers.jsx`) and Customer Reviews Moderation (`AdminReviews.jsx`) supporting read-only review auditing and official LUNE Atelier replies.

---

## 3. Project Delivery Milestones

| Sprint / Week | Phase Description | Deliverables & Verification |
|:---:|:---|:---|
| **Week 1–2** | Requirement Analysis & Architecture | System SRS, Use Case diagrams, Sitemap, component hierarchy, tech stack setup |
| **Week 3–4** | UI/UX Prototyping & Design System | Google Stitch / Figma mockups, Warm Luxury color tokens (#FAF7F2, #775B3F), responsive grid |
| **Week 5–6** | Core Storefront & Catalog Implementation | Storefront layout, Hero Carousel, Shop Page filters, Product Detail, Cart Drawer |
| **Week 7–8** | Checkout, Order Flow & Authentication | Address autofill, VietQR, voucher engine, invoice printing, Login/Register, Profile 5 Tabs |
| **Week 9–10** | Admin Portal & Analytics Dashboard | 6 Admin modules, native SVG charts, product CRUD, voucher CRUD, review moderation |
| **Week 11** | Integration, Testing & Documentation | 107 test cases verification (100% Pass), bilingual dictionary completion, final report |

