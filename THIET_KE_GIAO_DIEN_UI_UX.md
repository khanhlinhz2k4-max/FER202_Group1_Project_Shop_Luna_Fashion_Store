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

* **Font Tiêu đề (Headings):** Font Serif cổ điển sang trọng (`Playfair Display`, `Cormorant Garamond` hoặc `Libre Baskerville`). Độ tương phản nét cao, tạo cảm xúc trang bìa thời trang.
* **Font Nội dung & Điều hướng (Body & Navigation):** Font Sans-serif hiện đại, hình học tối giản (`Inter`, `Montserrat` hoặc `DM Sans`). Độ cao dòng thoáng, dễ đọc trên cả máy tính và di động.
* **Tối đa 2 họ font chữ** trên toàn bộ hệ thống.

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
  * `Categories`: Cuộn mượt xuống khối `#categories` trên Trang chủ.
  * `New Collection`: Cuộn mượt xuống khối `#new-arrivals` trên Trang chủ.
  * `About`: Cuộn mượt xuống khối `#about` trên Trang chủ.
* **Cột phải (Cụm tiện ích):** Icon Tìm kiếm (`Search`), Yêu thích (`Wishlist`), Giỏ hàng (`Cart`), Tài khoản (`User / Login`).

### 2. Chân trang (Footer Layout)
* Nền màu nâu sẫm thanh lịch, gồm 4 cột: Cột thương hiệu `LUNE`, Cột `Collections` (Women, Men, New Collection), Cột `Customer Care`, Cột `The LUNE Journal` (Newsletter nhận tin) và dòng bản quyền `© 2026 LUNE Fashion Store`.

---

## 🖼️ V. ĐẶC TẢ CHI TIẾT BỐ CỤC TOÀN BỘ CÁC TRANG CHO 6 THÀNH VIÊN (SCREEN LAYOUT SPECIFICATIONS)

---

### 1. 🏠 TRANG CHỦ (HOME PAGE – PHỤ TRÁCH: TV2)
*Giao diện thực tế được chia thành 4 Section lớn liền mạch mang đậm hơi thở thời trang Paris Atelier:*

* **Section 1: Hero Editorial Banner:**
  * Bức ảnh khổ lớn với ánh sáng tự nhiên ấm áp, phủ lớp bóng mờ nhẹ (`hero-scrim-overlay`).
  * Nhãn tag lấp lánh: `LUNE COLLECTION 2026`.
  * Tiêu đề lớn: **Timeless** / *With A Twist* (chữ nghiêng nghệ thuật).
  * Đoạn mô tả: *"Discover our latest collection curated for the modern wardrobe. Timeless silhouettes, unhurried craftsmanship, and tactile natural textiles tailored for men and women."*
  * Cụm nút hành động kép: Nút chính **EXPLORE COLLECTION →** và nút phụ **ABOUT LUNE** (cuộn mượt xuống Section About).
  * Thanh chỉ báo đáy Hero: `PARIS ATELIER · ARCHIVE NO. 04` | `SCROLL TO DISCOVER ↓` | `SPRING / SUMMER EDITION`.
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
* **Bộ lọc danh mục dạng nút bấm:** `ALL`, `WOMEN`, `MEN`, `NEW COLLECTION`. Nút đang chọn có màu nền nâu hoặc viền nổi bật; khi nhấp nút sản phẩm được lọc chuẩn xác.
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
* **Trang Yêu thích (`/wishlist`):**
  * Tiêu đề: **MY WISHLIST** kèm số lượng sản phẩm đang lưu.
  * Lưới các thẻ sản phẩm đã thả tim, mỗi thẻ có nút **"Move to Bag"** (chuyển thẳng vào giỏ hàng) và nút xóa khỏi danh sách.
  * Trạng thái rỗng: Hiển thị hình vẽ trái tim mờ và nút *"Khám phá sản phẩm mới"*.

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
  * Bố cục 2 cột: Sidebar tài khoản bên trái (Avatar tròn, tên, nút Đăng xuất) và Khu vực nội dung bên phải theo 2 Tab:
    * **Tab 1 (Thông tin cá nhân):** Xem và cập nhật họ tên, số điện thoại, đổi mật khẩu.
    * **Tab 2 (Đơn hàng của tôi - My Orders):** Bảng danh sách đơn hàng đã mua gồm Mã đơn `LUNE-XXXX`, ngày mua, danh sách món đồ, tổng tiền và nhãn màu trạng thái (`Pending` vàng hổ phách, `Shipping` xanh dương, `Delivered` xanh lục, `Cancelled` đỏ rượu).

---

### 6. 🛡️ PHÂN HỆ QUẢN TRỊ VIÊN (ADMIN PORTAL – PHỤ TRÁCH: TV6)

```
[ ADMIN PORTAL LAYOUT (/admin) ]
+---------------------------+-----------------------------------------------------+
| SIDEBAR ADMIN (260px)     | TOPBAR ADMIN: [🔍 Tìm kiếm...]      [👤 Admin Lune] [Đăng xuất]
|                           +-----------------------------------------------------+
| LUNE ATELIER              | 4 THẺ KPI DASHBOARD:                                |
| Quản trị viên             | [Doanh thu: $12,450]  [Tổng đơn: 48]  [Kho: 36]  [Users: 120]
|                           +-----------------------------------------------------+
| [📊] Bảng điều khiển      | BẢNG QUẢN TRỊ SẢN PHẨM / ĐƠN HÀNG:                  |
| [👗] Quản lý Sản phẩm     | Thanh tìm kiếm nội bộ              [+ Thêm Sản Phẩm Mới]
| [📦] Quản lý Đơn hàng     | --------------------------------------------------- |
| [👥] Quản trị Thành viên  | Ảnh | Tên Sản Phẩm  | Danh mục | Giá   | Thao tác   |
|                           | [Ảnh] Silk Shirt    | Women    | $145  | [Sửa] [Xóa]|
| [←] Về trang Cửa hàng     | [Ảnh] Linen Trousers| Men      | $120  | [Sửa] [Xóa]|
+---------------------------+-----------------------------------------------------+
```

* **Khung Quản trị (`AdminLayout.jsx`):** Sidebar cố định 260px bên trái tông màu tối lịch lãm; Topbar quản trị bên phải có avatar admin và nút Đăng xuất an toàn.
* **Bảng điều khiển (`AdminDashboard.jsx`):** 4 thẻ KPI thống kê tổng hợp (Tổng doanh thu, Tổng đơn hàng, Tồn kho sản phẩm, Khách hàng) và bảng 5 đơn mới nhất cần duyệt gấp.
* **Quản trị Sản phẩm - CRUD (`AdminProducts.jsx`):**
  * Bảng dữ liệu sản phẩm đầy đủ ảnh nhỏ, tên, danh mục, giá tiền.
  * Form modal thêm sản phẩm mới (Create) và sửa sản phẩm (Update) với kiểm tra hợp lệ dữ liệu.
  * Nút xóa sản phẩm (Delete) kèm hộp thoại xác nhận an toàn trước khi xóa khỏi kho.
* **Quản trị Đơn hàng (`AdminOrders.jsx`):** Bảng toàn bộ đơn của khách, cho phép Admin nhấp chuyển đổi trạng thái đơn (`Pending` $\rightarrow$ `Shipping` $\rightarrow$ `Delivered` $\rightarrow$ `Cancelled`).

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
