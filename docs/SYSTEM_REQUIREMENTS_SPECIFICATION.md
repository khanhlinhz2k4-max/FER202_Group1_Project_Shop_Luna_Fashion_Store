# SYSTEM REQUIREMENTS SPECIFICATION (SRS)
**Course:** FER202 — Front-End Web Development with React  
**Project:** LUNE Fashion Store (Unisex Luxury Ready-to-Wear Atelier)  
**Document Version:** 2.0 (English Edition)  
**Standard Compliance:** IEEE 830 / ISO-IEC-IEEE 29148  

---

## 1. Executive Summary & Problem Statement

### 1.1 Project Context
The modern fashion e-commerce landscape requires digital boutique platforms that transcend aggressive commercialization. Discerning clientele seeking bespoke craftsmanship, organic textiles (Belgian linen, mulberry silk, pure Mongolian cashmere), and architectural tailoring require an online experience matching the tactile warmth of physical fashion ateliers.

### 1.2 Target Audience & Actors
1. **Guest (Unauthenticated Shopper):** Discovers collections, conducts live keyword searches, customizes variants, and executes guest checkout.
2. **Customer (Authenticated Member):** Enjoys unified wishlist synchronization, manages address books, redeems member vouchers, tracks real-time order fulfillment timelines, and submits verified reviews.
3. **Administrator (Store Operations Manager):** Oversees master catalogs, monitors stock thresholds, updates fulfillment lifecycles, configures promotional vouchers, and audits customer feedback.

---

## 2. Functional Requirements Specification

### 2.1 Guest Storefront Requirements (GUEST-01 to GUEST-12)
- **GUEST-01 (Homepage Showcase):** 4-slide editorial Hero Carousel with 5s autoplay and hover pause; "Curated Silhouettes" cards with smooth-scroll navigation; "New Arrivals" tabbed filters (`ALL`, `WOMEN`, `MEN`, `ACCESSORIES`).
- **GUEST-02 (Real-time Live Search):** Predictive debounced keyword search on the navigation bar with trending search tags and instant 6-item preview dropdown.
- **GUEST-03 (Shop Catalog & Faceted Filters):** Multi-dimensional filtering (`Category`, `Garment Type`, `Size XS–XL`, `Color Swatches`, `Price Range $90–$400`), sorting (`Newest`, `Price Low/High`), and auto-reset pagination.
- **GUEST-04 (Product Detail & QuickView):** High-resolution image gallery, real-time stock feedback, tabbed garment specifications, and interactive `QuickViewModal` / `SizeGuideModal`.
- **GUEST-05 (Guest Wishlist):** Client-side wishlist persistence in `localStorage` with non-blocking toast notifications and 1-click "Move to Bag".
- **GUEST-06 (Sliding Cart Drawer):** Off-canvas drawer with quantity adjustments, variant consolidation, and dynamic $200 Free Shipping progress meter.
- **GUEST-07 (Guest Checkout):** Single-page checkout with address validation, voucher selector dropdown, and 3 payment methods (Credit Card, dynamic VietQR with USD-to-VND rates, and COD).
- **GUEST-08 (Order Success & Boutique Invoice):** Order confirmation receipt, 4-stage visual `OrderTimeline`, and printable A4 boutique receipt (`InvoiceModal`).
- **GUEST-09 (Authentication Gateway):** Member registration with real-time 4-criteria password strength meter and login with 1-click demo accounts.
- **GUEST-10 (Brand Policies & Newsletter):** Validated email subscription for code `LUNE10` and 4 modal dialogs for boutique policies.
- **GUEST-11 (Bilingual System):** Instant zero-reload translation between Vietnamese and English (967 keys).
- **GUEST-12 (24/7 AI Stylist Chatbot):** Natural language sizing consultant with NLP parsing of body metrics (height/weight/bust-waist-hip).

### 2.2 Customer Member Requirements (CUST-01 to CUST-09)
- **CUST-01 (Personal Details Management):** Update full name and contact telephone number with immutable email identity protection.
- **CUST-02 (Account Security):** Independent password updates requiring current-password verification.
- **CUST-03 (Delivery Address Book):** Multi-address storage with default destination configuration for 1-click checkout autofill.
- **CUST-04 (VIP Tier Recognition):** Display of prestigious `Atelier Gold VIP` membership badge.
- **CUST-05 (Wishlist Synchronization):** Automatic merging of guest session lookbooks into member database upon sign-in.
- **CUST-06 (Order History & Lifecycle Cancellation):** Chronological order history with 4-stage tracking; active cancellation trigger for `Pending` orders with automated catalog restock.
- **CUST-07 (Verified Buyer Review):** 1-to-5 star rating submission with sentiment headlines for delivered purchases.
- **CUST-08 (Smart Checkout Autofill):** Pre-population of shipping credentials and surfacing of eligible member vouchers.
- **CUST-09 (Secure Sign Out):** Complete session invalidation and return to anonymous guest state.

### 2.3 Administrator Requirements (ADM-01 to ADM-13)
- **ADM-01 (Role-Based Route Protection):** Strict RBAC enforcement via `ProtectedRoute (requireAdmin=true)`.
- **ADM-02 (Executive Analytics Dashboard):** 4 KPI summary cards, interactive 7-Day Revenue SVG Area Chart, and Category Sales Donut Chart.
- **ADM-03 (Catalog Inventory Inspection):** Search and filter master catalog table with color-coded stock badges (Green >10, Orange 1–10, Red 0).
- **ADM-04 (New Product Onboarding CRUD):** Modal creation form with input validation (title, positive price, stock count).
- **ADM-05 (Product Specification Update CRUD):** Modal attribute modification with instant storefront synchronization.
- **ADM-06 (Discontinued Product Deletion CRUD):** Permanent database elimination requiring mandatory security confirmation.
- **ADM-07 (1-Click Storefront Visibility Toggle):** Instant `Eye/EyeOff` hiding with exclusive Admin Preview Mode.
- **ADM-08 (Bidirectional Inventory Management):** Automatic stock decrement on checkout and single-occurrence restock on cancellation.
- **ADM-09 (Order Fulfillment Progression):** Lifecycle transition (`Pending -> Shipping -> Delivered -> Cancelled`).
- **ADM-10 (User Account Administration):** 4 user KPIs, role filtering, modal CRUD, and active administrator self-protection rule.
- **ADM-11 (Voucher Campaign Management):** 4 voucher KPIs and modal CRUD (% or fixed USD discount).
- **ADM-12 (Full Admin Bilingual Operations):** Real-time language switching across all 6 administrative modules.
- **ADM-13 (Customer Reviews Moderation):** Read-only review auditing, official LUNE Atelier replies, visibility toggling, and spam removal.

---

## 3. Core Business Rules

1. **Free Shipping Threshold:** Orders with a product subtotal $\ge \$200$ qualify for free shipping (\$0.00). Orders below $\$200$ incur a flat fee of $\$15.00$.
2. **Variant Line Item Consolidation:** Cart items are grouped uniquely by `(ProductID, Size, Color)`. Identical combinations increment quantity; distinct attributes generate separate line items.
3. **Inventory Restocking Rule:** Order cancellation triggers automated stock replenishment (`stock = stock + qty`) strictly once.
4. **Review Immutability:** Customer review ratings and texts are strictly Read-Only to administrators to ensure authentic feedback.
5. **Admin Self-Protection:** The active administrator account cannot be deleted by itself, preventing system lockout.

