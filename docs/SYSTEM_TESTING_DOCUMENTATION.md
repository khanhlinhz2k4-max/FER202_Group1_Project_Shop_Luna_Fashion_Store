# SYSTEM TESTING DOCUMENTATION & VERIFICATION MATRIX
**Course:** FER202 — Front-End Web Development with React  
**Project:** LUNE Fashion Store (Unisex Luxury Ready-to-Wear Atelier)  
**Document Version:** 2.0 (English Edition)  
**Overall Execution Result:** 107 / 107 Test Cases Passed (100% Pass Rate)  

---

## 1. Testing Methodology

The LUNE Fashion Store platform underwent rigorous manual and automated test execution across 9 functional subsystems:
1. **Black-box Functional Testing:** Validated inputs, workflows, state transitions, and edge cases against requirements.
2. **UI/UX Token Auditing:** Verified color palette adherence, custom dropdown rendering, and micro-animations.
3. **Responsive Multi-Device Testing:** Tested layout stability across Desktop (1920x1080), Tablet (iPad 768px), and Mobile (iPhone 375px).

---

## 2. Test Execution Summary Matrix

| Test Suite ID | Subsystem / Module Description | Total Cases | Passed | Failed | Pass Rate |
|:---:|:---|:---:|:---:|:---:|:---:|
| **TS-01** | Global Header, Hero Carousel & Brand Navigation | 12 | 12 | 0 | 100% |
| **TS-02** | Real-time Live Search, Shop Catalog & Filters | 15 | 15 | 0 | 100% |
| **TS-03** | Product Detail, QuickView & Size Guide Modals | 14 | 14 | 0 | 100% |
| **TS-04** | Wishlist Lookbook, Cart Drawer & Free Shipping | 12 | 12 | 0 | 100% |
| **TS-05** | Checkout, Boutique Vouchers, VietQR & Invoicing | 16 | 16 | 0 | 100% |
| **TS-06** | Administrator Portal (Dashboard, CRUD, Moderation) | 18 | 18 | 0 | 100% |
| **TS-07** | Non-Functional (F5 State Persistence, Responsive) | 5 | 5 | 0 | 100% |
| **TS-08** | OrderTimeline & Customer Star Reviews System | 4 | 4 | 0 | 100% |
| **TS-09** | 24/7 AI Chatbot, Address Book & VietQR Engine | 11 | 11 | 0 | 100% |
| **Total** | **Full LUNE Fashion Store Platform** | **107** | **107** | **0** | **100%** |

---

## 3. Core Functional Test Cases (Exemplary Subset)

### TC-01: Authentication & Role-Based Access Control (RBAC)
- **Steps:** Navigate to `/login`, click "Demo Customer", sign in. Attempt to open `/admin`. Sign out, click "Demo Admin", access `/admin`.
- **Expected Result:** Customer is blocked from `/admin` (redirected to `/` with an alert). Admin enters the Admin Portal seamlessly.
- **Status:** **PASS**

### TC-02: Add to Bag & Variant Line Item Consolidation
- **Steps:** In `/product/1`, select Size M / Sand, click "Add to Bag". Re-add identical variant. Then add Size L / Sand.
- **Expected Result:** Cart drawer slides in; identical variants merge into 1 line item with incremented quantity; distinct size creates a separate line item.
- **Status:** **PASS**

### TC-03: Promotional Voucher Eligibility & Free Shipping Rule
- **Steps:** In checkout, apply voucher `LUNE20` on a $245 subtotal. Then test an expired voucher or order under minimum spend.
- **Expected Result:** `LUNE20` deducts 20% (-$49.00). Subtotal $\ge \$200$ receives free shipping ($0.00). Ineligible vouchers are rejected with clear explanation.
- **Status:** **PASS**

### TC-04: End-to-End Checkout & Stock Decrement
- **Steps:** Complete checkout with recipient address, choose VietQR payment method, and confirm order.
- **Expected Result:** Order entity created with unique ID (`LUNE-XXXX`); cart is cleared; physical product stock is decremented in catalog.
- **Status:** **PASS**

### TC-05: Pending Order Cancellation & Automatic Restock
- **Steps:** In `/profile -> My Orders`, locate a `Pending` order and click "Cancel Order". Confirm prompt.
- **Expected Result:** Order status transitions to `Cancelled`; purchased quantities are automatically restored back to product catalog stock.
- **Status:** **PASS**

### TC-06: Administrator Product Creation (CRUD)
- **Steps:** In `/admin/products`, click "+ Add New Product", enter valid title, price, and stock count; save. Test empty title or negative price.
- **Expected Result:** Valid product appears immediately in admin table and public storefront; invalid data is blocked with inline error alerts.
- **Status:** **PASS**

### TC-07: 1-Click Visibility Toggle & Admin Preview Mode
- **Steps:** Click `EyeOff` icon on an admin product row; inspect storefront Home, Shop, and Search; open direct product URL as admin.
- **Expected Result:** Product is hidden from public storefront; Admin Preview Mode displays an amber banner allowing admin inspection safely.
- **Status:** **PASS**

### TC-08: Order Fulfillment Lifecycle & Customer Timeline
- **Steps:** In `/admin/orders`, advance order: `Pending -> Shipping -> Delivered`. Inspect customer profile view.
- **Expected Result:** Order status updates live; customer's visual `OrderTimeline` advances in real time; `Delivered` status unlocks review submission.
- **Status:** **PASS**

### TC-09: Customer Product Review & Official Atelier Reply
- **Steps:** In `/profile`, click "Write Review" on Delivered order; then in `/admin/reviews`, post an official Atelier response.
- **Expected Result:** Review appears with Verified Buyer badge; customer text remains read-only in admin; Atelier Response renders beneath review on storefront.
- **Status:** **PASS**

### TC-10: Administrator Self-Protection Safeguard
- **Steps:** In `/admin/users`, locate the currently logged-in administrator row and attempt to click the Delete (Trash) button.
- **Expected Result:** The delete button is locked/disabled on the active administrator row, preventing accidental administrator self-lockout.
- **Status:** **PASS**

