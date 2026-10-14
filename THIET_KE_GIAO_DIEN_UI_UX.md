# 🎨 TÀI LIỆU QUY CHUẨN THIẾT KẾ GIAO DIỆN & TRẢI NGHIỆM NGƯỜI DÙNG (UI/UX MASTER SPECIFICATION)
# DỰ ÁN: LUNE FASHION STORE (FER202 - GROUP 1)
### ĐỊNH VỊ: UNISEX LUXURY FASHION BRAND (CẢ THỜI TRANG NAM & NỮ)
### PHONG CÁCH: "Warm Luxury × Modern Trendy × Soft Feminine Warmth × Contemporary Masculine"
*(Cẩm nang thiết kế giao diện toàn diện cho cả 6 thành viên – Thuần phân tích mỹ thuật & bố cục, không chứa mã nguồn)*

---

## 🏛️ I. ĐỊNH VỊ THƯƠNG HIỆU & CÂN BẰNG THỊ GIÁC (BRAND IDENTITY)

### 1. Bản sắc thương hiệu cốt lõi (Core Brand Identity)
**LUNE Fashion Store** là nền tảng thương mại điện tử thời trang đơn thương hiệu cao cấp dành cho **CẢ PHÁI ĐẸP VÀ PHÁI MẠNH (UNISEX / MULTI-CATEGORY FASHION STORE)**:
* **Women's Fashion:** Thời trang nữ hiện đại, phom dáng thanh thoát, bay bổng.
* **Men's Fashion:** Thời trang nam lịch lãm, đường may tinh xảo, đương đại.
* **New Collection:** Bộ sưu tập mới nhất kết hợp đồng điệu giữa trang phục nam và nữ.

> ⚠️ **LÀM RÕ ĐẶC BIỆT VỀ CỤM TỪ "SOFT FEMININE":**
> Cụm từ "Soft Feminine" trong định hướng mỹ thuật của LUNE chỉ dùng để mô tả **sự mềm mại, ấm áp, nhã nhặn và tinh tế của ngôn ngữ thị giác thương hiệu** (độ mềm của font chữ, ánh sáng tự nhiên ấm áp, tông màu be/nâu/kem êm mắt).
> **TUYỆT ĐỐI KHÔNG HIỂU LẦM** rằng cửa hàng chỉ bán đồ nữ. Website phải đại diện cân bằng và bình đẳng cho cả Nam và Nữ.

### 2. Tỷ lệ cân bằng thị giác bắt buộc: 50% Nữ / 50% Nam (Visual Balance)
* **Hình ảnh người mẫu & chiến dịch:** Duy trì tỷ lệ xấp xỉ **50% Người mẫu Nữ / 50% Người mẫu Nam** xuyên suốt website.
* **Hình ảnh sản phẩm:** Trưng bày đan xen hài hòa giữa trang phục nam và nữ.
* **Vị thế danh mục:** Danh mục **MEN** là danh mục cốt lõi (First-class category), được tôn trọng ngang hàng với **WOMEN**, tuyệt đối không xem là phần bổ sung phụ.

### 3. Giới hạn phong cách nghiêm ngặt (Do NOTs)
* ❌ Không làm trang web thành tiệm đồ nữ, tiệm áo cưới (bridal), tiệm mỹ phẩm (cosmetics) hay tiệm thời trang màu hồng điệu đà.
* ❌ Không làm giao diện trẻ con, dễ thương quá đà (overly cute) hay sặc sỡ hoạt họa.
* ❌ Không dùng phong cách "Dark Luxury" đen tuyền hầm hố của thời trang nam gai góc.
* ❌ Không nhồi nhét bóng đổ đậm, hiệu ứng kính mờ (glassmorphism) hay nút bo tròn viên thuốc (pill-shaped).
* ❌ **Mục tiêu then chốt:** Duy trì phong cách **Quiet Luxury ấm áp** (Warm Luxury), thanh lịch như một tạp chí thời trang nghệ thuật quốc tế.

---

## 🎨 II. BẢNG MÀU THỰC TẾ & BIẾN MÀU HỆ THỐNG (COLOR SYSTEM TOKENS)

Tất cả các thành viên khi xây dựng giao diện **bắt buộc dùng chung bảng màu trung tính ấm áp (Warm Neutrals)**:

| Tên màu hệ thống | Mã màu Hex | Ý nghĩa sử dụng & Vị trí áp dụng |
| :--- | :---: | :--- |
| **Primary Dark Brown** | `#775B3F` | **Nâu cacao đậm:** Màu nhận diện cốt lõi, màu chữ chính, tiêu đề, nút bấm CTA chính (`btn-primary`), logo navbar. Thay thế cho màu đen tuyền. |
| **Light Cream** | `#FAF7F2` | **Trắng kem sáng:** Nền trang chính, nền trang Login/Register, các khoảng trắng "thở" tạo cảm giác thư thái. |
| **Soft Warm Beige** | `#FEE3AF` | **Be ấm nhạt:** Vùng nhấn nhẹ nhàng, nền thẻ danh mục nổi bật, chữ trên thanh thông báo. |
| **Secondary Beige** | `#C8AE84` | **Be cát:** Viền mảnh ô nhập liệu (Input border 1px), đường phân cách, nền thẻ phụ. |
| **Warm Caramel** | `#CAA072` | **Caramel ấm:** Điểm nhấn chi tiết nhỏ, trạng thái rê chuột (hover states). |
| **Sunburst Accent** | `#E0B77C` | **Vàng ấm ánh dương:** Điểm xuyết sang trọng thứ cấp. |
| **Text Primary** | `#2C2117` | **Nâu đen trầm:** Màu chữ tiêu đề lớn, tên sản phẩm, giá tiền (êm dịu hơn đen thuần). |
| **Text Secondary** | `#5C4A3A` | **Nâu cà phê trung tính:** Đoạn văn mô tả chất liệu, nhãn điều hướng menu. |
| **Text Muted** | `#8F7965` | **Nâu đất mờ:** Chữ giữ chỗ (Placeholder), giá gạch bỏ, số đo kích thước. |

---

## 🔤 III. HỆ THỐNG TYPOGRAPHY BIÊN TẬP (TYPOGRAPHY HIERARCHY)

### 1. Quy hoạch 2 Họ Phông Chữ Cốt Lõi (2-Font Warm Luxury System)
1. **`--font-serif: 'Playfair Display', 'Cormorant Garamond', Georgia, serif;`**
   - **Mục đích:** Font Serif cổ điển sang trọng, tương phản nét tinh tế, chuẩn bìa tạp chí thời trang Haute Couture.
   - **Phạm vi áp dụng:** Toàn bộ Tiêu đề chính (`h1, h2, h3, h4`), Logo thương hiệu (`LUNE`), Hero Editorial Headlines, Tiêu đề Modal (`QuickViewModal`, `ReviewModal`, `InvoiceModal`), Khối chứng thực & Đánh giá (`Atelier Reviews & Ratings`), Điểm số đánh giá nổi bật, Chữ ký thương hiệu hóa đơn.
2. **`--font-sans: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;`**
   - **Mục đích:** Font Sans-serif hiện đại, chuẩn hình học sắc nét, độ thoáng dòng hoàn hảo cho trải nghiệm đọc trên cả máy tính và di động.
   - **Phạm vi áp dụng:** Thân bài (`body, p`), Nút bấm (`button`), Thẻ huy hiệu (`badges`), Bảng dữ liệu (`tables`), Biểu mẫu nhập liệu (`inputs, select, textarea`), Thẻ số liệu quản trị KPI Admin (`fontVariantNumeric: 'lining-nums tabular-nums'`).
3. **Quy chuẩn Không Ngoại lệ (Zero Rogue Font Policy):**
   - **100% Thống nhất qua Biến CSS:** Nghiêm cấm sử dụng chuỗi font hardcoded rời rạc (`'Playfair Display, serif'`, `'Montserrat, sans-serif'`) hay font chưa được nhúng (`'Inter'`).
   - **Triệt tiêu Font Fallback Rác:** Tuyệt đối không dùng khai báo chung chung `fontFamily: 'serif'` (nguyên nhân gây vỡ sang font Times New Roman mặc định của hệ điều hành Windows). Mọi khai báo inline style đều đồng bộ về `fontFamily: 'var(--font-serif)'` hoặc `fontFamily: 'var(--font-sans)'`.

### 2. Thang Đo Kích Thước Chữ Chuẩn (Modular Type Scale Hierarchy)
Quy chuẩn tập trung qua 9 biến CSS toàn cục tại `:root` trong `src/index.css`, chấm dứt hoàn toàn tình trạng kích thước chữ co giật, không đồng đều:

| Biến CSS Token | Cỡ chữ | Quy đổi px | Phạm vi áp dụng chuẩn hóa |
| :--- | :---: | :---: | :--- |
| **`--text-hero`** | `3.5rem` | 56px | Tiêu đề lớn nhất Hero Slider trang chủ, Con số đánh giá xếp hạng trung bình lớn (`Atelier Rating`). |
| **`--text-h1`** | **`2.4rem`** | 38.4px | **Đồng nhất 100% Tiêu đề chính (Page Title)** của tất cả các trang: Shop, Wishlist, Profile, Checkout, Order Success, Chi tiết SP. |
| **`--text-h2`** | **`2.0rem`** | 32px | Tiêu đề từng Section lớn trang chủ (`.section-title`), Tên sản phẩm chính trong QuickViewModal, Tiêu đề trang Admin. |
| **`--text-h3`** | **`1.35rem`** | 21.6px | Tiêu đề các Modal (Hóa đơn, Đánh giá), Thẻ KPI số liệu Admin, Tab chi tiết SP (Mô tả, Giặt là, Vận chuyển). |
| **`--text-h4`** | **`1.15rem`** | 18.4px | Tiêu đề bước thanh toán (Checkout Steps), Tiêu đề thanh công cụ Hóa đơn, Tiêu đề tiến trình đơn hàng. |
| **`--text-body`** | **`0.95rem`** | 15.2px | Toàn bộ đoạn văn mô tả (`p`), phụ đề trang (`.shop-subtitle`, `.profile-subtitle`), thông tin đơn hàng. |
| **`--text-ui`** | **`0.85rem`** | 13.6px | Nút bấm hành động (`button`), Ô nhập liệu (`input, select`), Dữ liệu bảng biểu Admin, Liên kết điều hướng. |
| **`--text-badge`** | **`0.75rem`** | 12px | Thẻ trạng thái đơn hàng, Thẻ danh mục in hoa, Nhãn chính sách Atelier, Nhãn thẻ KPI Admin. |
| **`--text-caption`** | **`0.7rem`** | 11.2px | Chú thích nhỏ, Ghi chú bản quyền chân trang, Thời gian chi tiết. |

---

## 🧭 IV. QUY CHUẨN THANH ĐIỀU HƯỚNG & CHÂN TRANG (NAVBAR & FOOTER)

### 1. Thanh điều hướng chính (Navbar Layout)
```
+---------------------------------------------------------------------------------+
| ANNOUNCEMENT: COMPLIMENTARY WORLDWIDE SHIPPING ON ORDERS OVER $150 · LUNE 2026  |
+---------------------------------------------------------------------------------+
|  LUNE              Home    Shop All    Categories    New Collection    About    [🔍] [♡] [🛍️] [👤] |
+---------------------------------------------------------------------------------+
```
* **Cột trái:** Logo thương hiệu chữ viết hoa `LUNE`, phụ đề nhỏ `FASHION STORE`. Nhấp vào dẫn về `/`.
* **Cột giữa (Menu chính):**
  * `Home`: Chuyển về `/` (cuộn lên đầu trang).
  * `Shop All`: Chuyển hướng sang trang `/shop`.
  * `Categories`: Tự động điều hướng về Trang chủ và cuộn mượt xuống khối `#categories` (bù trừ `scroll-margin-top: 90px`).
  * `New Collection`: Tự động điều hướng về Trang chủ và cuộn mượt xuống khối `#new-arrivals` (bù trừ `scroll-margin-top: 90px`).
  * `About`: Tự động điều hướng về Trang chủ và cuộn mượt xuống khối `#about` (bù trừ `scroll-margin-top: 90px`).
* **Cơ chế Điều hướng Anchor Hash Xuyên Trang (Cross-Route Anchor Scrolling & Sticky Offset):**
  * Hỗ trợ điều hướng trơn tru từ mọi trang con (`/shop`, `/product/:id`, `/profile`...) về đúng các section neo trên Trang chủ thông qua `ScrollToTop` trong `App.jsx`.
  * Khai báo quy chuẩn CSS `scroll-margin-top: 90px` cho toàn bộ các section đích (`#categories, #new-arrivals, #about, #philosophy`), triệt tiêu 100% tình trạng tiêu đề bị thanh Navbar cố định (Sticky Header) che khuất.
* **Cột phải (Cụm tiện ích & Chuyển đổi ngôn ngữ):** Nút chuyển ngữ Song ngữ `LanguageSwitcher` (`VI | EN`), Icon Tìm kiếm (`Search`), Yêu thích (`Wishlist`), Giỏ hàng (`Cart`), Tài khoản (`User / Login`).
* **Menu trượt di động Chuẩn Quiet Luxury (Mobile Navigation Drawer):** 
  * **Quy chuẩn Font chữ đồng nhất 100%:** Toàn bộ danh sách liên kết và nút chức năng sử dụng **Font Sans-serif `--font-sans` (`Montserrat`)**, `font-size: 0.95rem`, `font-weight: 500`, loại bỏ hoàn toàn tình trạng pha trộn lộn xộn giữa font Serif cổ điển và font Sans-serif hiện đại.
  * **Đồng nhất Casing Title Case 100%:** Toàn bộ mục menu và tiện ích chuẩn hóa sang **Title Case trang nhã** (*Trang Chủ, Cửa Hàng, Trang Phục Nữ, Trang Phục Nam, Bộ Sưu Tập Mới, Về LUNE; Giỏ Hàng, Sản Phẩm Yêu Thích, Tài Khoản Của Tôi, Đăng Xuất*), triệt tiêu hoàn toàn lỗi chắp vá ALL CAPS lộn xộn.
  * **Tiêu đề nhóm tinh giản & sang trọng:** `BỘ SƯU TẬP` (Collections) và `TÀI KHOẢN CỦA BẠN` (Your Account), chữ in hoa nhỏ `0.68rem`, màu caramel sang trọng `letter-spacing: 0.16em`.
  * **Loại bỏ nhãn rác kỹ thuật:** Nút Đăng xuất hiển thị sạch đẹp `Đăng Xuất` / `Sign Out`, loại bỏ triệt để nhãn phân quyền nội bộ `(USER)`.
  * **Thẻ nút bấm cân xứng hoàn hảo:** Thẻ Giỏ hàng và các liên kết con dùng chung cấu trúc card trắng ngà viền chỉ `#EBE3D7`, hiệu ứng hover trượt nhẹ sang phải `translateX(4px)` sang trọng.
  * **Tích hợp khối chuyển ngữ `LanguageSwitcher` (`VI | EN`)** nổi bật ngay trên thanh tiêu đề ngăn kéo giúp thao tác một tay mượt mà.

### 2. Chân trang Chuẩn Quiet Luxury (Footer Layout & Atelier Brand Pillars)
Giao diện Chân trang được nâng cấp toàn diện theo chuẩn Haute Couture quốc tế, phân tầng thị giác rõ ràng với chiều sâu không gian (visual depth) và loại bỏ hoàn toàn các chi tiết thô ráp:

```
+-----------------------------------------------------------------------------------------------------------------------+
|  [🛡️ COMPLIMENTARY GLOBAL COURIER]  [✦ 30-DAY ATELIER EXCHANGE]  [✂ LIFETIME SEAM WARRANTY]  [💎 CONCIERGE STYLING]  |
+-----------------------------------------------------------------------------------------------------------------------+
|  LUNE FASHION STORE         CATEGORIES                 CUSTOMER CARE                  THE LUNE JOURNAL                |
|  Atelier description...     · Women's Collection       · 30-Day Exchange Policy       Receive invitations to seasonal |
|  Paris & Saigon address     · Men's Collection         · Lifetime Seam Warranty       private salons & lookbooks.     |
|  Hotline & Hours            · Shop All Garments        · Complimentary Global Ship...                                 |
|  Social Atelier Links       · Curated Silhouettes      · Private Styling Concierge    [ Enter your email   ] [JOIN →] |
|                             · New Arrivals             · Client Authentication                                        |
+-----------------------------------------------------------------------------------------------------------------------+
|  © 2026 LUNE FASHION STORE · ALL RIGHTS RESERVED        [VISA] [MASTERCARD] [AMEX] [PAYPAL] [APPLE PAY]               |
+-----------------------------------------------------------------------------------------------------------------------+
```

* **Dải 4 Trụ Cột Giá Trị Thương Hiệu (Brand Value Pillars Bar):**
  * **Nền Nâu Cacao Ấm Áp (`#6C5238`):** Duy trì bản sắc nâu cacao ấm áp cốt lõi của LUNE kết hợp đường viền chỉ be kem mảnh tinh xảo (`1px solid rgba(254, 227, 175, 0.12)`), tuyệt đối không dùng màu đen tuyền để giữ trọn vẹn tinh thần "Warm Luxury".
  * **Triệt tiêu 100% Thẻ Debug Thô Ráp:** Loại bỏ hoàn toàn các thẻ gắn nhãn `[INFO]` trong ngoặc vuông gây rối thị giác.
  * **Biểu tượng Kem Sáng (`var(--light-cream)`):** Khung biểu tượng dạng đĩa tròn viền mỏng be kem tinh tế, icon phản hồi chuyển màu tương phản mượt mà khi hover.
  * **Tương tác Mở Modal Chính sách (Policy Modals):** Cả 4 trụ cột đều hỗ trợ nhấp chuột mở trực tiếp Modal chi tiết chính sách (Vận chuyển, Đổi trả, Bảo hành, Styling VIP) bằng cả hai ngôn ngữ.
* **Khu Vực Chân Trang Chính (Main Footer Grid - 4 Cột Sang Trọng):**
  * **Nền Nâu Nhận Diện Thương Hiệu (`var(--primary-brown) = #775B3F`):** Giữ vững màu nâu cacao chủ đạo đặc trưng của thương hiệu LUNE, kết hợp màu chữ kem sáng dịu mắt `var(--light-cream)` và be nhạt `rgba(254, 227, 175, 0.75)`.
  * **Quy chuẩn Casing & Cân Bằng Quang Học Song Ngữ (Optical Typographical Balance):** Toàn bộ tiêu đề cột 4 khối (`CATEGORIES` / `DANH MỤC`, `CUSTOMER CARE` / `CHĂM SÓC KHÁCH HÀNG`, `THE LUNE JOURNAL`) đồng nhất **IN HOA 100% (ALL CAPS)**, font serif cổ điển `--font-serif`, dãn cách chữ tinh tế `letter-spacing: 0.08em` và `line-height: 1.35`. Tiêu đề tiếng Việt rút gọn thành `DANH MỤC` (8 ký tự) cân bằng hoàn hảo về chiều ngang với `CATEGORIES` (10 ký tự), triệt tiêu hoàn toàn cảm giác chênh lệch kích thước hoặc nặng nề do dấu phụ tiếng Việt.
  * **Quy chuẩn Casing Danh sách Liên kết (Link Hierarchy Casing):** Toàn bộ các mục liên kết con chuyển sang chuẩn **Title Case thanh lịch** (`line-height: 1.45`), chấm dứt tình trạng pha trộn lộn xộn giữa IN HOA và Chữ thường (*Women's Collection, Men's Collection, Shop All Garments, Curated Silhouettes, New Arrivals*).
  * **Rút gọn Nhãn Liên kết Dài:** Thay thế cụm liên kết dài dòng dễ bị xuống dòng xấu (*"EXCLUSIVE ATELIER CATEGORIES"*) bằng cụm từ ngắn gọn, đắt giá: *"Curated Silhouettes"*.
  * **Nút Đăng Ký Bản Tin Kem Sáng Thanh Lịch (`var(--light-cream)`):** Nút bấm màu kem sáng nhã nhặn, chữ nâu trầm `#2C2117`, hiệu ứng hover chuyển vàng ấm `var(--warm-gold)` tôn vinh sự tinh tế đặc trưng của phong cách Quiet Luxury.
* **Thanh Bản Quyền & Thanh Toán (Footer Bottom Bar):**
  * Dòng bản quyền chuẩn mực: `© 2026 LUNE FASHION STORE. ALL RIGHTS RESERVED.`
  * Thẻ biểu tượng phương thức thanh toán quốc tế: Viền mỏng be kem nhạt, chữ trắng ngà sang trọng.
* **Đồng Bộ Song Ngữ 100% (Full Bilingual i18n):**
  * Toàn bộ 4 cột, 4 trụ cột chính sách và form đăng ký newsletter đều kết nối trực tiếp với từ điển `translations.vi` và `translations.en`, đồng bộ hóa tức thì khi người dùng đổi ngôn ngữ qua `LanguageSwitcher`.

---

## 🖼️ V. ĐẶC TẢ CHI TIẾT BỐ CỤC TOÀN BỘ CÁC TRANG CHO 6 THÀNH VIÊN (SCREEN LAYOUT SPECIFICATIONS)

---

### 1. 🏠 TRANG CHỦ (HOME PAGE – PHỤ TRÁCH: TV2)
*Giao diện thực tế được chia thành 4 Section lớn liền mạch mang đậm hơi thở thời trang Paris Atelier:*

* **Section 1: Hero Editorial Banner (Carousel 4 Slide Haute Couture):**
  * Bức ảnh khổ lớn với ánh sáng tự nhiên ấm áp, phủ lớp bóng mờ nhẹ (`hero-scrim-overlay`).
  * Khung nội dung tối ưu: `max-width: 680px`, tiêu đề chuẩn hóa `font-size: clamp(2.4rem, 4.8vw, 4rem)`, `line-height: 1.15`, tích hợp `text-wrap: balance` triệt tiêu 100% tình trạng rớt từ lẻ (orphan words) gây vỡ thành 3-4 dòng làm đẩy trôi nút bấm khỏi màn hình.
  * **Hệ thống 4 Slide Tiêu Đề Cân Bằng Song Ngữ (Bilingual Balanced Headlines):**
    1. *Slide 01:* **Timeless** / *With A Twist* 🇻🇳 **Vẻ Đẹp Vĩnh Cửu** / *Đầy Phá Cách*
    2. *Slide 02:* **Tactile Luxury** / *Everyday Grace* 🇻🇳 **Sang Trọng** / *Xúc Cảm Tự Nhiên* (Chuyên đề Lụa & Cashmere)
    3. *Slide 03:* **Tailored Ease** / *Modern Structure* 🇻🇳 **Phom Chuẩn Mực** / *Cấu Trúc Đương Đại* (Thời trang Nam đương đại & Unisex)
    4. *Slide 04:* **Sculpted Form** / *Enduring Patina* 🇻🇳 **Khối Điêu Khắc** / *Vân Da Vĩnh Cửu* (Phụ kiện đồ da thủ công)
  * Đoạn mô tả: Tối đa 3 dòng thanh nhã, dãn dòng `line-height: 1.75`.
  * Cụm nút hành động kép: Nút chính **EXPLORE COLLECTION →** và nút phụ **ABOUT LUNE** luôn hiển thị trọn vẹn trong tầm mắt người dùng (above-the-fold).
  * Thanh chỉ báo đáy Hero: `PARIS ATELIER · ARCHIVE NO. 01` | `SCROLL TO DISCOVER ↓` | `SPRING / SUMMER RUNWAY` (Đồng bộ số thứ tự Archive 01–04 khớp 1:1 với bộ đếm Slide).
* **Section 2: Product Categories (Danh mục cốt lõi):**
  * Nhãn `CURATED SILHOUETTES`, Tiêu đề chính **Product Categories**.
  * 3 Thẻ danh mục lớn cân bằng: **WOMEN**, **MEN**, **NEW COLLECTION**.
* **Section 3: New Arrivals (Hàng mới về – Cân bằng 50% Nam / 50% Nữ):**
  * Lưới đúng 4 sản phẩm thời trang cao cấp phân bổ cân bằng:
    1. *Nữ:* **Women's Tailored Blazer** (`$189`)
    2. *Nam:* **Men's Tailored Shirt** (`$115`)
    3. *Nữ:* **Women's Wide-Leg Trousers** (`$135`)
    4. *Nam:* **Men's Relaxed Blazer** (`$195`)
* **Section 4: About LUNE (Câu chuyện Thương hiệu):**
  * Bố cục 2 cột: Cột trái ảnh thời trang kèm huy hiệu `LUNE STORE · READY TO WEAR`; Cột phải tiêu đề **Everyday Elegance, Modern Style**, 2 đoạn văn giới thiệu thời trang may sẵn cho cả nam và nữ, 3 khối thông điệp (*"Thoughtful Design"*, *"Selected Fabrics"*, *"Timeless Styling"*) và nút **CREATE AN ACCOUNT →** (dẫn sang `/register`).

---

### 2. 🛍️ TRANG CỬA HÀNG CƠ BẢN (SHOP PAGE – PHỤ TRÁCH: TV1 - LEADER)

```
[ SHOP PAGE LAYOUT (/shop) ]
+---------------------------------------------------------------------------------+
| HEADING: SHOP ALL                                                               |
| SUBTITLE: Explore the latest LUNE collections for women and men.                |
|                                                                                 |
| [🔍 Search products...                                                        ] |
|                                                                                 |
| BỘ LỌC DANH MỤC:   [ ALL ]     [ WOMEN ]     [ MEN ]     [ NEW COLLECTION ]     |
+---------------------------------------------------------------------------------+
| LƯỚI SẢN PHẨM THỰC TẾ (~8 SẢN PHẨM – CÂN BẰNG 50% NAM / 50% NỮ):                |
|                                                                                 |
| 1. [Ảnh Nữ] Tailored Blazer ($189)    2. [Ảnh Nam] Tailored Shirt ($115)        |
| 3. [Ảnh Nữ] Satin Midi Dress ($129)   4. [Ảnh Nam] Relaxed Blazer ($195)        |
| 5. [Ảnh Nữ] Wide-Leg Trousers ($135)  6. [Ảnh Nam] Straight Trousers ($125)     |
| 7. [Ảnh Nam] Minimal Overshirt ($145) 8. [Ảnh Nữ] Silk Camisole ($95)           |
|                                                                                 |
| (Mỗi thẻ có ảnh 3:4, tên, danh mục, giá và nút thả tim yêu thích)               |
+---------------------------------------------------------------------------------+
```

* **Tiêu đề trang:** **SHOP ALL** kèm dòng mô tả ngắn gọn.
* **Ô tìm kiếm đơn giản:** *"Search products..."* gõ từ khóa là danh sách bên dưới tự động lọc theo tên theo thời gian thực.
* **Bộ lọc Sidebar tối giản (Stitch / Quiet Luxury Filter Sidebar):**
  * **Bộ lọc danh mục loại trang phục động (Dynamic Garment Categories):** Danh sách dạng chữ trơn tối giản (Text-based List), tự động phân tích và chỉ hiển thị những loại đồ phù hợp với danh mục giới tính đang xem (ví dụ: tự động ẩn Váy lụa khi chuyển sang xem Đồ Nam).
  * **Thanh trượt giá (Price Slider):** Sử dụng dải màu gradient động (`linear-gradient`) tô màu nâu nhã nhặn cho vùng giá active, khớp chính xác 100% với vị trí nút kéo thumb và giá trị hiển thị ($90 - $400).
  * **Bộ chọn kích thước (Size Grid) & Bảng màu (Color Swatches):** Thiết kế dạng ô bấm và các chấm màu thực tế chuẩn xác.
* **Cơ chế Phân trang Thông minh & Tự động Đặt lại (Smart Pagination & Auto-Reset):**
  * Tự động đặt lại số trang về trang 1 (`setCurrentPage(1)`) mỗi khi người dùng thay đổi bất kỳ tiêu chí lọc nào (từ khóa tìm kiếm, danh mục giới tính, loại trang phục, kích cỡ, màu sắc, thanh trượt giá, sắp xếp).
  * Chốt chặn an toàn kiểm soát giới hạn biên (`currentPage > totalPages`): Tự động kéo về trang 1 nếu kết quả lọc bị co hẹp, đảm bảo khách hàng luôn thấy sản phẩm khớp mà không bị kẹt ở trang trống.
* **Dữ liệu sản phẩm mẫu (~8 món cân bằng):** Pha trộn hài hòa giữa áo blazer nữ, sơ mi nam, đầm nữ, quần âu nam, áo khoác nam và áo lụa nữ.

---

### 3. 🔍 TRANG CHI TIẾT SẢN PHẨM & YÊU THÍCH (PRODUCT DETAIL & WISHLIST – PHỤ TRÁCH: TV3)

```
[ PRODUCT DETAIL PAGE LAYOUT (/product/:id) ]
+---------------------------------------------------------------------------------+
| BREADCRUMB: Home / Shop / Women / Tailored Linen Blazer                         |
+------------------------------------+--------------------------------------------+
| CỘT TRÁI: THƯ VIỆN HÌNH ẢNH        | CỘT PHẢI: THÔNG TIN ĐẶT HÀNG               |
|                                    |                                            |
| [ KHUNG ẢNH LỚN CHÍNH (3:4) ]      | Danh mục: WOMEN'S READY TO WEAR            |
| Ảnh chất lượng cao, zoom nhẹ       | Tiêu đề: TAILORED LINEN BLAZER             |
|                                    | Giá: $189.00                               |
|                                    |                                            |
| [Ảnh 1] [Ảnh 2] [Ảnh 3]            | Chọn Màu: [⚫ Black] [⚪ Beige] [🟤 Brown]  |
| (Thumbnail nhỏ nhấp đổi ảnh)       |                                            |
|                                    | Chọn Size: [XS] [ S ] [ M*] [ L ] [XL]     |
|                                    | ↳ Dòng link: [📏 Bảng hướng dẫn chọn size] |
|                                    |                                            |
|                                    | Số lượng: [ - ]  [ 1 ]  [ + ]              |
|                                    |                                            |
|                                    | [ NÚT CHÍNH: ADD TO BAG (Nâu đậm, 100%) ]  |
|                                    | [ NÚT PHỤ: ♡ ADD TO WISHLIST (Viền mảnh) ] |
|                                    |                                            |
|                                    | ▼ Description & Fabric (Chất liệu, phom)   |
|                                    | ▼ Care Instructions (Hướng dẫn giặt ủi)    |
|                                    | ▼ Shipping & Returns (Giao nhận, bảo hành) |
+------------------------------------+--------------------------------------------+
```

* **Trang Chi tiết sản phẩm (`/product/:id`):**
  * **Cột trái:** Khung ảnh lớn chính tỷ lệ `3:4` chuẩn tạp chí thời trang, dải ảnh phụ thu nhỏ (thumbnails) bên dưới để nhấp chuột chuyển đổi góc nhìn.
  * **Cột phải:** Tên sản phẩm in hoa đậm nét, nhãn danh mục, giá niêm yết rõ ràng.
  * **Bộ chọn biến thể:** Chọn màu sắc (Color swatches dạng nút tròn màu thực tế), chọn kích cỡ (`XS, S, M, L, XL`) kèm link mở modal bảng số đo (*Size Guide Modal*), bộ chọn số lượng `[-] [1] [+]`.
  * **Cụm nút hành động:** Nút chính **ADD TO BAG** (nền nâu toàn chiều rộng) và nút phụ **ADD TO WISHLIST** (viền mảnh có icon tim).
  * **Khối Accordion:** 3 mục gập mở thông tin về chất liệu, hướng dẫn bảo quản và chính sách giao hàng.
* **Cửa sổ xem nhanh (`QuickViewModal.jsx`):** Popup nổi giữa màn hình, chia 2 cột thu nhỏ, giúp khách chọn size/màu và đặt hàng trực tiếp mà không cần rời trang danh mục.
* **Thông báo nổi trạng thái Yêu thích không chặn (`WishlistToast.jsx`):**
  * Thiết kế theo chuẩn Warm Luxury: Hiển thị ở góc phải dưới màn hình (Bottom-Right Toast), nền kem ấm `#FAF7F2`, viền be cát `#C8AE84`, đổ bóng mềm mại `box-shadow: 0 12px 32px rgba(44,36,22,0.18)`.
  * Biểu tượng trái tim đỏ ruby nổi bật, hiển thị ảnh thu nhỏ, tên và giá tiền của sản phẩm vừa thả tim / gỡ tim.
  * Đối với Khách vãng lai: Hiển thị lời nhắc tinh tế *"Guest mode: Sign in to sync across devices"* kèm nút bấm chuyển nhanh đến `/login` hoặc xem ngay Lookbook `/wishlist`.
  * Tự động ẩn nhẹ nhàng sau 3.5 giây hoặc bấm nút đóng `[X]` mà không bao giờ chặn hay làm gián đoạn luồng duyệt sản phẩm của người dùng.
* **Thành phần Đánh giá & Xếp hạng Sao (`StarRating.jsx` & `ReviewModal.jsx`):**
  * **Hiển thị Sao (`StarRating.jsx`):** Sao màu vàng kim Warm Luxury (`#C8AE84`), hỗ trợ chế độ tương tác hover phóng to `scale(1.2)` khi rê chuột chọn điểm, hiển thị điểm số thập phân (e.g. `4.9`) và tổng số lượng vote.
  * **Hộp thoại Viết Đánh Giá (`ReviewModal.jsx`):** Nền kem ấm `#FAF7F2`, viền be cát `#C8AE84`, bộ chọn 5 sao trực quan kèm nhãn trạng thái cảm xúc, ô tiêu đề và khung nhận xét chi tiết, nút gửi `SUBMIT REVIEW` kèm thông báo thành công.
  * **Khối Nhận xét tại Trang Chi tiết Sản phẩm:** Bố cục 2 cột cân xứng: Cột trái hiển thị điểm trung bình to đậm (Serif `3.6rem`), 5 thanh phần trăm phân bổ số sao; Cột phải hiển thị danh sách nhận xét có huy hiệu sang trọng `✓ VERIFIED CLIENT`.
* **Hóa Đơn Sang Trọng In Ấn (`InvoiceModal.jsx`):**
  * Thiết kế theo chuẩn Boutique Paris: Logo LUNE in hoa trang trọng, thông tin đơn hàng `LUNE-XXXX`, ngày phát hành, thông tin khách hàng, bảng danh sách mặt hàng kèm đơn giá & thành tiền.
  * Hỗ trợ lệnh in ấn trình duyệt `window.print()`: Áp dụng CSS `@media print` che giấu toàn bộ Navbar/Footer/Nút bấm của web, chuyển sang nền trắng chữ đen tương phản cao chuẩn khổ giấy in A4/A5.
* **Thanh Theo Dõi Tiến Độ Đơn Hàng (`OrderTimeline.jsx`):**
  * Thiết kế 4 nấc trực quan: `Order Placed` -> `Atelier Packaging` -> `In Transit` -> `Delivered`.
  * Trục nối màu be cát, nấc hoàn thành đổi màu nâu ấm `#775B3F` có icon check `✓`, nấc đang xử lý có hiệu ứng viền phát sáng nhẹ (`pulse animation`).
* **Trang Yêu thích (`/wishlist`):**
  * Tiêu đề: **SAVED STYLES** kèm số lượng sản phẩm đang lưu trong Lookbook.
  * **Thanh đồng bộ dành cho Khách vãng lai (Guest Synchronization Banner):** Nền nâu be nhung sang trọng, viền vàng kim, hiển thị lời chào *"Private Lookbook (Guest Mode)"* kèm nút *"SIGN IN TO SYNC"* mà không chặn quyền xem và quản lý danh sách sản phẩm đã lưu.
  * Lưới các thẻ sản phẩm đã thả tim, mỗi thẻ có nút **"Move to Bag"** (chuyển thẳng vào giỏ hàng) và nút xóa khỏi danh sách.
  * Trạng thái rỗng: Hiển thị hình vẽ trái tim mờ và nút *"EXPLORE THE COLLECTION"*.

---

### 4. 🛒 NGĂN KÉO GIỎ HÀNG TRƯỢT & THANH TOÁN (CART & CHECKOUT – PHỤ TRÁCH: TV4)

```
[ CART DRAWER (420px trượt từ mép phải) ]
+------------------------------------------+
| SHOPPING BAG (2)                     [X] |
+------------------------------------------+
| 🚚 Mua thêm $35 để được FREE SHIPPING!   |
| [====================--------] 75%       |
+------------------------------------------+
| DANH SÁCH MÓN HÀNG (Cuộn mượt):          |
| +----+ Women's Tailored Blazer           |
| |Ảnh | Size: M | Color: Beige            |
| |3:4 | $189.00                           |
| +----+ SL: [-] [ 1 ] [+]        [🗑️ Xóa] |
| ---------------------------------------- |
| +----+ Men's Tailored Shirt              |
| |Ảnh | Size: L | Color: White            |
| |3:4 | $115.00                           |
| +----+ SL: [-] [ 1 ] [+]        [🗑️ Xóa] |
+------------------------------------------+
| Tạm tính (Subtotal):             $304.00 |
| Phí vận chuyển:           Miễn phí ($0)  |
| [ NÚT: PROCEED TO CHECKOUT (Nâu 100%) ]  |
+------------------------------------------+
```

* **Ngăn kéo Giỏ hàng (`CartDrawer.jsx`):**
  * Trượt mượt mà từ mép phải màn hình (độ rộng 420px trên Desktop, 100% trên Mobile), nền mờ (Backdrop Blur).
  * Thanh tiến độ Free Shipping: Đo khoảng cách tới hạn mức miễn phí vận chuyển ($150).
  * Danh sách món hàng cuộn được: Ảnh nhỏ 3:4, tên, size, màu, nút tăng giảm số lượng `[-] [+]` và nút thùng rác xóa món.
  * Khối đáy cố định: Tạm tính và nút chuyển sang trang thanh toán.
* **Trang Thanh toán (`/checkout`):**
  * Bố cục 2 cột (Checkout Split):
    * **Cột trái (Thông tin giao hàng):** Form điền Họ tên, Số điện thoại, Email, Địa chỉ nhận hàng; Lựa chọn phương thức thanh toán (COD hoặc Thẻ); Nút bấm **PLACE ORDER**.
    * **Cột phải (Tóm tắt đơn hàng):** Danh sách món đồ thu nhỏ, ô nhập mã giảm giá (`LUNE10`), Bảng hạch toán minh bạch (Tạm tính, Giảm giá khuyến mãi, Phí vận chuyển, Tổng thanh toán cuối cùng).
* **Trang Đặt hàng thành công (`/order-success`):**
  * Biểu tượng tích xanh trang nhã, thông điệp cảm ơn, Mã đơn hàng lớn dạng `LUNE-XXXX`, ngày đặt và nút quay về tiếp tục mua sắm.

---

### 5. 🔑 TRANG ĐĂNG NHẬP, ĐĂNG KÝ & HỒ SƠ CÁ NHÂN (AUTH & PROFILE – PHỤ TRÁCH: TV5)

```
[ LOGIN & REGISTER SPLIT LAYOUT ]
+------------------------------------+------------------------------------+
| CỘT TRÁI: ẢNH BIÊN TẬP THỜI TRANG  | CỘT PHẢI: FORM ĐĂNG NHẬP / ĐĂNG KÝ |
|                                    |                                    |
| Bức ảnh thời trang Runway khổ lớn  | ← Back to LUNE Home                |
| Ánh sáng ấm, lớp phủ mờ tinh tế    |                                    |
|                                    | LUNE (FASHION STORE)               |
| Huy hiệu: LUNE FASHION STORE       | Client Sign In / Create Account    |
|                                    |                                    |
| Trích dẫn nghệ thuật sang trọng:   | [ Ô nhập liệu có icon bên trái ]   |
| "Fashion changes, but style        | [ Mật khẩu kèm nút ẩn/hiện con mắt]|
| endures."                          |                                    |
|                                    | [ NÚT BẤM CHÍNH (Nâu đậm, 100%) ]  |
|                                    |                                    |
|                                    | Liên kết chuyển đổi qua lại        |
+------------------------------------+------------------------------------+
```

* **Trang Đăng nhập (`/login`):** Bố cục Split Layout chia đôi; Cột trái là ảnh thời trang Runway khổ lớn; Cột phải là form nhập `Email or Username`, `Password` (kèm icon và nút con mắt ẩn/hiện), hộp kiểm *"Remember my login"*, nút **SIGN IN**, khối gợi ý tài khoản demo và liên kết sang `/register`.
* **Trang Đăng ký (`/register`):** Đồng bộ thẩm mỹ với Login, gồm các trường `FULL NAME`, `EMAIL ADDRESS`, `USERNAME`, `PASSWORD` (kèm thanh đo độ mạnh mật khẩu trực quan), `CONFIRM PASSWORD`, hộp kiểm điều khoản và nút **CREATE ACCOUNT**.
* **Trang Hồ sơ cá nhân (`/profile`):**
  * Bố cục 2 cột: Sidebar tài khoản bên trái (Avatar tròn, tên, menu điều hướng nhanh 5 Tab, nút Đăng xuất) và Khu vực nội dung bên phải gồm 5 Tab đa năng đạt chuẩn Song ngữ VI/EN 100%:
    * **Tab 1 (Đơn hàng của tôi - Orders):** Bộ lọc trạng thái (Tất cả, Đang xử lý, Đang giao, Đã giao, Đã hủy), theo dõi tiến trình may đo (`OrderTimeline`), in biên lai boutique (`InvoiceModal`), và mở khóa nút viết đánh giá xác thực (`ReviewModal`).
    * **Tab 2 (Thông tin cá nhân - Details):** Xem và cập nhật họ tên, email, số điện thoại liên lạc.
    * **Tab 3 (Bảo mật tài khoản - Security):** Đổi mật khẩu bảo vệ tài khoản hội viên.
    * **Tab 4 (Sổ địa chỉ nhận hàng - Addresses):** Danh sách địa chỉ đã lưu kèm gắn nhãn Mặc định, modal thêm mới địa chỉ giao hàng.
    * **Tab 5 (Danh sách yêu thích - Wishlist):** Các trang phục đã lưu, chuyển nhanh vào giỏ hàng hoặc xóa khỏi danh sách.

---

### 6. 🛡️ PHÂN HỆ QUẢN TRỊ VIÊN (ADMIN PORTAL – PHỤ TRÁCH: TV6)

```
[ ADMIN PORTAL LAYOUT (/admin) ]
+---------------------------+-----------------------------------------------------------------+
| SIDEBAR ADMIN (260px)     | TOPBAR ADMIN: [🔍 Tìm kiếm...]   [🌐 VI | EN]  [👤 Admin] [Đăng xuất]
|                           +-----------------------------------------------------------------+
| LUNE ATELIER              | 4 THẺ KPI DASHBOARD:                                            |
| Quản trị viên             | [Doanh thu: $12,450]  [Tổng đơn: 48]  [Kho: 36]  [Users: 120]    |
|                           +-----------------------------------------------------------------+
| [📊] Bảng điều khiển      | BẢNG QUẢN TRỊ SẢN PHẨM / ĐƠN HÀNG:                              |
| [👗] Quản lý Sản phẩm     | Thanh tìm kiếm nội bộ                          [+ Thêm Sản Phẩm]|
| [📦] Quản lý Đơn hàng     | --------------------------------------------------------------- |
| [👥] Quản trị Thành viên  | Ảnh | Tên Sản Phẩm  | Danh mục | Tồn kho | Giá | Thao tác       |
|                           | [Ảnh] Silk Shirt    | Women    | 18      | $145| [Sửa] [Xóa]    |
| [←] Về trang Cửa hàng     | [Ảnh] Linen Trousers| Men      | 25      | $120| [Sửa] [Xóa]    |
+---------------------------+-----------------------------------------------------------------+
```

* **Khung Quản trị (`AdminLayout.jsx`):** Sidebar cố định 260px bên trái tông màu tối lịch lãm; Topbar quản trị bên phải tích hợp **Bộ chuyển đổi ngôn ngữ độc lập `LanguageSwitcher` (`VI | EN`)**, avatar admin và nút Đăng xuất an toàn.
* **Hệ thống Song ngữ Toàn diện (Full Admin i18n):** 100% các trang con, tiêu đề cột bảng, thẻ KPI, nhãn trạng thái và thông báo toast trong phân hệ Admin đều được bản địa hóa qua `LanguageContext` và từ điển `translations.js` mà không reload trang.
* **Bảng điều khiển (`AdminDashboard.jsx`):** 4 thẻ KPI thống kê tổng hợp (Tổng doanh thu, Tổng đơn hàng, Tồn kho sản phẩm, Khách hàng) và bảng 5 đơn mới nhất cần duyệt gấp, đầy đủ nhãn song ngữ và định dạng tiền tệ.
* **Quản trị Sản phẩm - CRUD & Song ngữ (`AdminProducts.jsx`):**
  * Bảng dữ liệu sản phẩm đầy đủ ảnh nhỏ, tên, danh mục, số lượng tồn kho (kèm badge trạng thái màu xanh/cam/đỏ), giá tiền.
  * Form modal thêm sản phẩm mới (Create) và sửa sản phẩm (Update) với kiểm tra hợp lệ dữ liệu.
  * Nút xóa sản phẩm (Delete) kèm hộp thoại xác nhận an toàn song ngữ trước khi xóa khỏi kho.
* **Quản trị Đơn hàng (`AdminOrders.jsx`):** Thẻ KPI thống kê đơn hàng, bộ lọc trạng thái và bảng toàn bộ đơn của khách, cho phép Admin nhấp chuyển đổi trạng thái đơn (`Pending` $\rightarrow$ `Shipping` $\rightarrow$ `Delivered` $\rightarrow$ `Cancelled`).
* **Quản trị Thành viên (`AdminUsers.jsx`):** Thẻ KPI khách hàng, danh sách tài khoản thành viên trong hệ sinh thái, gắn nhãn phân quyền và bảo vệ an toàn tài khoản Quản trị viên.

---

## 🧰 VI. TỪ ĐIỂN CLASS CSS & THÀNH PHẦN DÙNG CHUNG CÓ SẴN (GLOBAL CSS UTILITIES)

*Tất cả các thành viên **bắt buộc sử dụng các Class dùng chung đã có sẵn trong `src/App.css` và `src/index.css`** để giao diện đồng bộ 100%:*

1. **Khung bao:** `.container` (tự động căn giữa, max-width 1320px), `.section-header`, `.eyebrow`, `.section-title`, `.section-desc`.
2. **Nút bấm:** `.btn-primary` (nâu đậm `#775B3F`, chữ kem sáng, bo góc 4px), `.btn-secondary` (viền mảnh nâu), `.btn-underline` (chữ gạch chân kèm mũi tên).
3. **Biểu mẫu:** `.form-group`, `.input-with-icon`, `.has-error` (viền đỏ khi sai), `.field-error-text` (dòng chữ lỗi kèm icon cảnh báo).
4. **Thông báo:** `.auth-alert.success` (nền xanh nhạt), `.auth-alert.error` (nền hồng phấn).
5. **Nhãn trạng thái:** `.status-pending` (vàng), `.status-shipping` (xanh dương), `.status-delivered` (xanh lục), `.status-cancelled` (đỏ).

---

## 🏁 VII. BẢNG CHECKLIST BÀN GIAO CHO CẢ 6 THÀNH VIÊN

Trước khi nộp bài cho Trưởng nhóm (Leader), từng thành viên phải tự rà soát:
* [ ] **TV1 (Shop):** Đã có thanh tìm kiếm, 4 nút lọc danh mục (`ALL, WOMEN, MEN, NEW COLLECTION`) và hiển thị đúng 8 sản phẩm cân bằng Nam Nữ chưa?
* [ ] **TV2 (Home):** Đã kiểm tra Hero Banner, Live Search thời gian thực và Footer chuẩn chưa?
* [ ] **TV3 (Detail & Wishlist):** Đã có chuyển đổi thumbnail ảnh, chọn Size/Màu, modal Size Guide và nút Move to Bag ở Wishlist chưa?
* [ ] **TV4 (Cart & Checkout):** Đã kiểm tra Cart Drawer trượt mượt mà, thanh Free Ship, mã giảm giá và form Checkout chưa?
* [ ] **TV5 (Auth & Profile):** Đã có tab "My Orders" hiển thị đúng trạng thái đơn hàng và ProtectedRoute chặn người ngoài chưa?
* [ ] **TV6 (Admin):** Đã đủ 4 thẻ KPI, bảng CRUD sản phẩm (Thêm/Sửa/Xóa có xác nhận) và công cụ đổi trạng thái đơn chưa?
* [ ] **Toàn nhóm:** Đã dùng đúng các biến `var(--primary-brown)`, `var(--bg-page)` và các class `.btn-primary`, `.form-group` có sẵn mà không viết đè phá vỡ hệ thống chưa?

---

## 🌐 VIII. CHUẨN HÓA TOÀN DIỆN HỆ THỐNG ĐA NGÔN NGỮ (BILINGUAL SYSTEM AUDIT & 100% RESOLUTION)

1. **Đối soát từ điển 1:1 tuyệt đối:** 752 / 752 leaf keys hoàn toàn đối xứng giữa `translations.vi` và `translations.en`. 0 lỗi thiếu key trong từ điển.
2. **Khung tìm kiếm trực tiếp Live Search (`Navbar.jsx`):**
   * Chuẩn hóa song ngữ: Tiêu đề gợi ý nhanh (`GỢI Ý NHANH` / `QUICK SUGGESTIONS`), phím tắt Enter, nút xem tất cả kết quả và trạng thái không tìm thấy sản phẩm.
   * Bản địa hóa mảng từ khóa thịnh hành (`TRENDING_SEARCHES_VI` & `TRENDING_SEARCHES_EN`): Tự động đổi chip từ khóa khi chuyển ngôn ngữ (Áo Blazer Linen, Đầm Lụa Dạ Hội, Cardigan Cashmere,...).
3. **Modal xem nhanh (`QuickViewModal.jsx`):**
   * Đã liên kết nhãn trạng thái tồn kho chuẩn hóa: `HẾT HÀNG TRONG KHO` / `OUT OF STOCK`, `SẮP HẾT: CHỈ CÒN X SẢN PHẨM` / `LOW STOCK: ONLY X LEFT`.
4. **Giỏ hàng & Quy trình đặt hàng (`CartDrawer.jsx` & `CheckoutPage.jsx`):**
   * Chuẩn hóa nhãn biến thể `Cỡ` / `Size`, `Màu` / `Color` và số lượng trong giỏ hàng.
   * Bản địa hóa phương thức thanh toán (COD & Thẻ ngân hàng), chiết khấu ưu đãi, phí vận chuyển và tổng thanh toán.
5. **Chứng nhận chất lượng kỹ thuật:** Build thành công 100% bằng Vite (`npm run build`, 0 cảnh báo lỗi module).

