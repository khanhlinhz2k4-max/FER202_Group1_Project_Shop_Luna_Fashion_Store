# 📋 KẾ HOẠCH PHÂN CÔNG & QUY TRÌNH DỰ ÁN FER202
## ĐỒ ÁN: LUNE FASHION STORE (E-COMMERCE WEB APPLICATION)
* **Nhóm:** Group 1 | **Sĩ số:** 6 Thành viên
* **Công nghệ cốt lõi:** ReactJS, React Router v6, Lucide Icons, Vanilla CSS (Scoped), LocalStorage
* **Mục tiêu:** Website thời trang cao cấp hoàn thiện 100% hai phân hệ Storefront & Admin, giao diện Responsive, không lỗi Runtime, tối ưu điểm bảo vệ đồ án.

---

## 📌 I. BẢN HỢP ĐỒNG DỮ LIỆU CHUẨN (DATA CONTRACT)
*(Mọi thành viên bắt buộc tuân theo định dạng này để khi ghép code không bị xung đột hay lệch kiểu dữ liệu).*

### 1. Cấu trúc Đối tượng Sản phẩm (`Product`)
```javascript
{
  id: 1,                          // Số nguyên duy nhất
  name: "Lune Silk Minimal Shirt", // Chuỗi tên sản phẩm
  price: 145,                     // Số nguyên (KHÔNG kèm ký tự '$' để tiện tính toán)
  category: "women",              // "women" | "men" | "accessories"
  stock: 18,                      // Số lượng tồn kho khả dụng (Mới bổ sung bởi TV1)
  isActive: true,                 // Trạng thái khả dụng (true: hiển thị ngoài Storefront, false: ẩn lưu trữ)
  image: "https://...",           // Link ảnh chính
  images: ["url1", "url2"],       // Mảng các link ảnh phụ (thumbnail)
  sizes: ["XS", "S", "M", "L"],   // Mảng kích cỡ
  colors: ["Black", "Beige"],     // Mảng màu sắc
  description: "Mô tả chất liệu, form dáng...",
  isNew: true                     // boolean
}
```

### 2. Cấu trúc Mục trong Giỏ hàng (`CartItem`)
```javascript
{
  id: 1,
  name: "Lune Silk Minimal Shirt",
  price: 145,
  image: "https://...",
  selectedSize: "M",
  selectedColor: "Beige",
  quantity: 2
}
```

### 3. Cấu trúc Đơn hàng (`Order`)
```javascript
{
  id: "LUNE-8942",                // Mã đơn hàng ngẫu nhiên
  customer: {
    name: "Nguyen Van A",
    phone: "0901234567",
    email: "vana@gmail.com",
    address: "123 Le Loi, Q.1, TP.HCM"
  },
  items: [ /* Danh sách các CartItem */ ],
  totalAmount: 290,               // Tổng tiền sau giảm giá
  status: "Pending",              // "Pending" | "Shipping" | "Delivered" | "Cancelled"
  createdAt: "2026-09-28T09:30:00.000Z"
}
```

### 4. Cấu trúc Đối tượng Mã Giảm Giá (`Voucher`)
```javascript
{
  id: "voucher-1729123456789",    // Mã định danh duy nhất
  code: "LUNE10",                 // Mã code viết hoa chuẩn nhận diện thương hiệu
  discountType: "percent",        // "percent" | "fixed"
  discountValue: 10,              // Giá trị giảm: 10 (% hoặc USD)
  minSubtotal: 100,               // Mức chi tiêu tối thiểu để áp dụng
  startsAt: "2026-01-01T00:00",   // Ngày & giờ bắt đầu hiệu lực (YYYY-MM-DDTHH:mm)
  expiresAt: "2026-12-31T23:59",  // Ngày & giờ kết thúc hiệu lực (YYYY-MM-DDTHH:mm)
  isActive: true                  // Trạng thái kích hoạt khả dụng
}
```

### 5. Danh sách Khóa LocalStorage cố định (Keys)
* Sản phẩm: `'lune_products'`
* Giỏ hàng: `'lune_cart'`
* Yêu thích: `'lune_wishlist'`
* Đơn hàng: `'lune_orders'`
* Mã giảm giá: `'lune_vouchers'`
* Danh sách User: `'lune_users'`
* Tài khoản hiện tại: `'lune_current_user'`
* Đánh giá & Nhận xét: `'lune_reviews'`
* Tùy chọn Ngôn ngữ: `'lune_language'`

### 6. Cấu trúc Đối tượng Đánh giá & Phản hồi (`Review`)
```javascript
{
  id: "rev-1729123456789",        // Mã định danh duy nhất
  productId: 1,                   // ID sản phẩm được đánh giá
  author: "Alexander Vance",      // Tên khách hàng đánh giá (Read-Only đối với Admin)
  rating: 5,                      // Số sao 1–5 (Read-Only đối với Admin)
  title: "Drapes like water",     // Tiêu đề nhận xét (Read-Only đối với Admin)
  comment: "Purchased this...",   // Nội dung nhận xét của khách (Read-Only đối với Admin)
  verified: true,                 // Nhãn Verified Client
  isHidden: false,                // Trạng thái kiểm duyệt hiển thị (true: ẩn khỏi Storefront)
  adminReply: "Thank you...",     // Phản hồi chính thức từ LUNE Atelier (hiển thị dưới đánh giá)
  repliedAt: "2026-10-29",        // Ngày phản hồi của Atelier
  date: "2026-10-11"              // Ngày khách gửi đánh giá
}
```

---

## 👥 II. BẢNG PHÂN CÔNG CHI TIẾT 6 THÀNH VIÊN

### 👤 THÀNH VIÊN 1: TRƯỞNG NHÓM (TEAM LEADER)
* **Vai trò:** Quản trị Kiến trúc Hệ thống, Điều phối Git, Trang Cửa Hàng Tổng Hợp & **Luồng Số Lượng Tồn Kho Sản Phẩm (Inventory & Stock Flow)**.
* **Nhiệm vụ cụ thể:**
  1. **Khởi tạo Lõi State toàn cục (`src/context/ShopContext.jsx`):**
     * Quản lý State: `products`, `cart`, `wishlist`, `orders`, `currentUser`, `vouchers`.
     * Cung cấp các hàm dùng chung: `addToCart()`, `removeFromCart()`, `updateQuantity()`, `toggleWishlist()`, `addProduct()`, `updateProduct()`, `deleteProduct()`, `toggleProductActive()`, `addOrder()`, `updateOrderStatus()`.
     * Tự động đồng bộ đọc/ghi với `localStorage`.
  2. **Quản lý Định tuyến tổng, Điều hướng Hash & Git (`src/App.jsx` & `src/index.css`):**
     * Khai báo Router cấp cao nhất, bọc `ShopProvider` và `LanguageProvider`.
     * Quản lý nhánh `main` và nhánh làm việc `linh`, duyệt Code Review, giải quyết xung đột khi merge.
     * **Điều hướng Anchor Hash xuyên trang (Cross-Route Smooth Hash Navigation):** Component `ScrollToTop` tự động phân tích cả `pathname` và `hash`; khi nhấp link anchor từ trang khác (ví dụ từ `/shop` hay `/product/1` nhấp vào "Categories" `#categories` hay "About" `#about`), hệ thống tự động định tuyến về trang chủ và kích hoạt cuộn mượt mà (`smooth scroll`) có độ trễ an toàn 100ms tới đúng mục đích.
     * **Bù trừ khoảng cách thanh điều hướng (`scroll-margin-top: 90px`):** Khai báo trong `index.css` cho các section `#categories, #new-arrivals, #about, #philosophy` đảm bảo phần tiêu đề không bao giờ bị thanh Navbar che khuất.
   3. **Xây dựng Trang Cửa Hàng Toàn Diện (`src/pages/ShopPage.jsx` & `ShopPage.css`):**
     * Lưới hiển thị danh sách toàn bộ sản phẩm.
     * **Bộ lọc đa chiều (Filter Sidebar):** Lọc theo khoảng giá ($0-$100, $100-$250, $250+), theo danh mục, theo Size và Màu sắc.
     * **Sắp xếp (Sorting):** Giá tăng dần, giá giảm dần, hàng mới nhất.
     * **Phân trang Thông minh & Tự động Đặt lại (Smart Pagination & Auto-Reset):** Chia số trang (1, 2, 3...); tự động kích hoạt `setCurrentPage(1)` mỗi khi người dùng thay đổi bất kỳ tiêu chí nào (từ khóa tìm kiếm, danh mục, loại trang phục, kích cỡ, màu sắc, khoảng giá hoặc thứ tự sắp xếp). Đồng thời tích hợp cơ chế bảo vệ biên giới hạn (`currentPage > totalPages`), ngăn ngừa tuyệt đối tình trạng người dùng kẹt tại trang rỗng khi kết quả lọc thu hẹp.
   4. **Triển khai Trọn vẹn Luồng Tồn Kho Sản Phẩm (Inventory & Stock Management Flow):**
     * **Tự động trừ tồn kho:** Khi khách hàng đặt đơn (`addOrder`), hệ thống tự động trừ số lượng tồn kho tương ứng của từng sản phẩm trong kho (`stock = currentStock - quantity`).
     * **Tự động hoàn kho khi hủy đơn:** Khi Admin hoặc khách hủy đơn hàng (`updateOrderStatus` thành `"Cancelled"`), hệ thống tự động hoàn trả lại đúng số lượng vào kho sản phẩm.
     * **Quản trị Tồn kho Admin (`AdminProducts.jsx`):** Thêm cột hiển thị tồn kho, gắn thẻ trạng thái màu (Còn hàng: xanh lá >10, Sắp hết: cam vàng 1-10, Hết hàng: đỏ =0), cho phép nhập và chỉnh sửa số lượng tồn kho trong Modal Thêm/Sửa sản phẩm.
     * **Kiểm soát Tồn kho Client (`ProductDetailPage.jsx`, `QuickViewModal.jsx`, `ProductCard.jsx`):**
       - Hiển thị badge trạng thái tồn kho chuẩn phong cách Warm Luxury.
       - Ràng buộc bộ chọn số lượng không cho phép vượt quá số lượng hàng tồn kho còn lại.
       - Hiển thị nhãn `SOLD OUT` trên danh sách sản phẩm.
       - Tự động vô hiệu hóa nút `ADD TO BAG` và đổi thành `OUT OF STOCK` khi sản phẩm hết hàng.
   5. **Hoàn thiện & Nâng cấp Thẩm mỹ Hồ sơ Cá nhân (Profile Polish & Ecosystem Integration):**
      * Bổ sung Huy hiệu hạng thành viên danh giá (*Atelier Gold VIP / Atelier Ambassador*).
      * Mở rộng cấu trúc thành 5 Tab chuyên nghiệp: *My Orders*, *Personal Details*, *Password & Security (Bảo mật & Đổi mật khẩu độc lập)*, *Address Book (Sổ địa chỉ nhận hàng)* và *Saved Wishlist (Xem nhanh & liên kết mượt mà sang Wishlist của TV3)*.
      * Tích hợp nút Đăng xuất nhanh (*Sign Out Account*) ngay dưới chân thẻ menu bên trái giúp thanh điều hướng cân đối, sang trọng và tiện lợi.
   6. **Tích hợp Hệ sinh thái Đánh giá Sao (`StarRating.jsx`, `ReviewModal.jsx`) & Xuất Hóa Đơn Chuẩn Boutique (`InvoiceModal.jsx`) / Timeline Đơn Hàng (`OrderTimeline.jsx`):**
      * **Lõi Đánh giá & Xếp hạng Sao:** Quản lý State đánh giá toàn cục trong `ShopContext.jsx`, thuật toán tính điểm trung bình cộng và biểu đồ phân bổ sao 1-5 sao theo thời gian thực.
      * **Khối Nhận xét Khách hàng (Client Reviews):** Tích hợp khu vực nhận xét cao cấp tại trang Chi tiết sản phẩm (`ProductDetailPage.jsx`) và dải sao uy tín trên thẻ sản phẩm ngoài Shop (`ProductCard.jsx`, `QuickViewModal.jsx`).
      * **In Hóa Đơn Chuẩn Boutique (`InvoiceModal.jsx`):** Bật bản xem trước Hóa đơn sang trọng và gọi lệnh in trình duyệt (`window.print()`, định dạng in ấn `@media print` chuyên biệt) tại `OrderSuccessPage.jsx` và tab *My Orders* của `ProfilePage.jsx`.
      * **Theo dõi Tiến độ Đơn hàng (`OrderTimeline.jsx`):** Thanh tiến trình 4 nấc trực quan (*Order Placed -> Atelier Packaging -> In Transit -> Delivered*) liên kết thời gian thực với trạng thái đơn do Admin cập nhật.
      * **Mở khóa Đánh giá sau Giao hàng:** Khách hàng nhận đơn thành công (`Delivered`) được mở khóa nút viết đánh giá xác thực (`Verified Buyer`) cho từng món đồ.
   7. **Kiến trúc Hệ thống Đa Ngôn Ngữ Song Ngữ Toàn Diện (Full-Site & Full-Admin Bilingual System - Vietnamese 🇻🇳 & English 🇬🇧 - i18n):**
      * **Kiến trúc Context Lõi (`src/context/LanguageContext.jsx`):** Quản lý State ngôn ngữ toàn cục (`vi` | `en`), tích hợp hook tiện ích `useLanguage()`, hàm tra cứu dot-path an toàn `t(path, fallback)` và hàm dịch sản phẩm `tp(product, field)`.
      * **Đồng bộ Lưu trữ Cố định:** Lưu trạng thái lựa chọn ngôn ngữ vào `localStorage('lune_language')`, tự động ghi nhớ tùy chọn của người dùng khi tải lại trang hoặc mở tab mới.
      * **Từ điển Song ngữ Tập trung (`src/data/translations.js`):** Xây dựng bộ từ điển chuẩn hóa hơn 1,500 dòng gồm `translations.vi` và `translations.en`, bao phủ 100% mọi phân hệ:
        - **Toàn bộ Phân hệ Storefront:** Navbar, Footer, HomePage, ShopPage, ProductDetailPage, CartDrawer, CheckoutPage, OrderSuccessPage, ProfilePage (5 Tabs), LoginPage, RegisterPage, ReviewModal, InvoiceModal, OrderTimeline, QuickViewModal, ProductCard...
        - **Toàn bộ Phân hệ Quản trị viên (Admin Portal - 100% Bilingual):** Khung điều hướng `AdminLayout`, Bảng điều khiển `AdminDashboard`, Quản lý sản phẩm CRUD `AdminProducts`, Quản lý đơn hàng `AdminOrders`, Quản lý người dùng `AdminUsers` (Bao gồm tiêu đề, thẻ KPI, thanh tìm kiếm/lọc, tiêu đề cột bảng, modal form thêm/sửa, nhãn trạng thái và thông báo toast).
      * **Bản địa hóa Động Sản phẩm:** Tự động hiển thị tên và mô tả bằng tiếng Việt/tiếng Anh tương ứng mà không làm thay đổi ID hay ảnh hưởng tới cơ sở dữ liệu giỏ hàng.
      * **Nút Chuyển ngữ Sang Trọng (`LanguageSwitcher.jsx`):** Thiết kế nút gạt `VI | EN` phong cách Warm Luxury với hiệu ứng gạch chân vàng kim mượt mà trên Desktop Navbar, Mobile Drawer và cả **Admin Topbar**.
   8. **Kiến trúc & Chuẩn hóa Hệ thống Typography 2 Họ Font & Thang Đo Kích Thước Modular Type Scale:**
      * **Quy hoạch Biến CSS Toàn cục:** Tối ưu hóa `--font-serif` ưu tiên `'Playfair Display', 'Cormorant Garamond', 'Times New Roman', serif` (loại bỏ `Georgia` để chặn lỗi số rơi thụt dòng old-style) và `--font-sans` cho `'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`.
      * **Quy chuẩn 9 Nấc Kích Thước Chữ (Modular Type Scale Tokens):** Khởi tạo hệ biến `--text-hero (3.5rem)`, `--text-h1 (2.4rem)`, `--text-h2 (2.0rem)`, `--text-h3 (1.35rem)`, `--text-h4 (1.15rem)`, `--text-body (0.95rem)`, `--text-ui (0.85rem)`, `--text-badge (0.75rem)`, `--text-caption (0.7rem)` trong `src/index.css`. Đồng nhất 100% tiêu đề chính của mọi trang (Shop, Wishlist, Profile, Checkout, Order Success) về đúng chuẩn `2.4rem` (`var(--text-h1)`), tiêu đề section về `2.0rem`, thẻ KPI Admin về `1.6rem`, triệt tiêu hoàn toàn hiện tượng kích thước chữ co giật, không đều.
      * **Triệt tiêu 100% Font Lạc lõng (Zero Rogue Fonts):** Loại bỏ hoàn toàn các chuỗi font hardcoded rời rạc, font chưa nhúng (`Inter`) và đặc biệt là lỗi khai báo chung chung `fontFamily: 'serif'` (gây vỡ sang font Times New Roman trên Windows) tại `ProductDetailPage`, `QuickViewModal`, `WishlistPage`, `CheckoutPage`, `OrderSuccessPage`, `AdminLayout`, `AdminDashboard`, `AdminOrders`, `AdminUsers`.
      * **Thống nhất Toàn diện Storefront & Admin Portal:** Đảm bảo toàn bộ tiêu đề mang tinh thần biên tập Haute Couture sang trọng và toàn bộ văn bản/chỉ số dữ liệu đạt độ sắc nét, dễ đọc tối đa.
   9. **Lá Chắn Bắt Lỗi Toàn Cục (`ErrorBoundary.jsx`) & Khử Khuẩn Điều Hướng Tránh Kẹt Loop (`LoginPage.jsx`):**
      * **Lớp Bảo Vệ Toàn Cục (`src/components/ErrorBoundary.jsx`):** Thiết lập React Error Boundary bao bọc toàn bộ cây Route cấp cao nhất trong `App.jsx`, chặn đứng mọi sự cố crash đột ngột do lỗi runtime JavaScript; hiển thị giao diện phục hồi Warm Luxury sang trọng kèm nút thử lại an toàn.
      * **Bộ Lọc Khử Khuẩn Vòng Lặp Điều Hướng (`src/pages/LoginPage.jsx`):** Xử lý và làm sạch trạng thái chuyển hướng `location.state?.from.pathname`; ngăn chặn triệt để tình trạng tài khoản thông thường bị chuyển hướng sai vào phân hệ Quản trị viên dẫn đến vòng lặp điều hướng vô hạn (Infinite Loop) gây sập màn hình trắng.
   10. **Tích hợp Kiến Trúc shadcn/ui & Trợ Lý Tư Vấn Chatbot 24/7 (Hoàn thành trọn vẹn 3 tiêu chí điểm 9.5 của Giáo viên):**
      * **Tích hợp Thư viện shadcn/ui (`components.json`, `src/components/ui/`, `src/lib/utils.js`):** Khởi tạo cấu trúc shadcn chuẩn với Radix UI Slot/Dialog, Class-Variance-Authority (CVA), cấu hình Tailwind không Preflight chống vỡ giao diện; xây dựng các component `Button`, `Badge`, `Dialog`, `Avatar`.
      * **Trợ Lý May Đo Cá Nhân Thông Minh (`ChatBot.jsx` & `ChatBot.css`):** Widget chat trực tuyến 24/7 tích hợp bộ phân tích ngôn ngữ tự nhiên (NLP) nhận diện chiều cao, cân nặng và số đo 3 vòng của khách để gợi ý size may đo chuẩn xác (`XS, S, M, L, XL`); thanh gợi ý nhanh vuốt chạm mượt mà; hỗ trợ song ngữ Việt - Anh thời gian thực.
      * **Tinh giản Header & Đồng bộ Mỹ thuật:** Chuẩn hóa thanh điều khiển chỉ với 2 nút Làm mới (`RotateCcw`) và Đóng (`✕`), gỡ bỏ hoàn toàn thanh dock thu nhỏ 62px, khép lại trải nghiệm người dùng tinh tế, sang trọng.
* **Files phụ trách:** `components.json`, `tailwind.config.js`, `jsconfig.json`, `src/lib/utils.js`, `src/components/ui/button.jsx`, `src/components/ui/badge.jsx`, `src/components/ui/dialog.jsx`, `src/components/ui/avatar.jsx`, `src/components/CustomSelect.jsx`, `src/components/ChatBot.jsx`, `src/components/ChatBot.css`, `src/context/ShopContext.jsx`, `src/context/LanguageContext.jsx`, `src/data/translations.js`, `src/components/ErrorBoundary.jsx`, `src/components/LanguageSwitcher.jsx`, `src/components/LanguageSwitcher.css`, `src/App.jsx`, `src/index.css`, `src/pages/ShopPage.jsx`, `src/pages/ShopPage.css`, `src/layouts/AdminLayout.jsx`, `src/pages/admin/AdminDashboard.jsx`, `src/pages/admin/AdminProducts.jsx`, `src/pages/admin/AdminOrders.jsx`, `src/pages/admin/AdminUsers.jsx`, `src/pages/admin/AdminReviews.jsx`, `src/pages/ProductDetailPage.jsx`, `src/components/QuickViewModal.jsx`, `src/components/ProductCard.jsx`, `src/pages/ProfilePage.jsx`, `src/pages/ProfilePage.css`, `src/pages/LoginPage.jsx`, `src/pages/RegisterPage.jsx`, `src/pages/OrderSuccessPage.jsx`, `src/components/StarRating.jsx`, `src/components/ReviewModal.jsx`, `src/components/ReviewModal.css`, `src/components/InvoiceModal.jsx`, `src/components/InvoiceModal.css`, `src/components/OrderTimeline.jsx`, `src/components/OrderTimeline.css`.

---

### 👤 THÀNH VIÊN 2: TRẢI NGHIỆM TRANG CHỦ & TÌM KIẾM TRỰC TIẾP
* **Vai trò:** Trải nghiệm Trang chủ thương hiệu (Home Experience) & Công cụ tìm kiếm sản phẩm.
* **Nhiệm vụ cụ thể:**
  1. **Nâng cấp Trang Chủ (`src/pages/HomePage.jsx` & `HomePage.css`):**
     * **Hero Banner Carousel/Slider:** Tự động trượt slide ảnh các bộ sưu tập nổi bật, có nút điều hướng Next/Prev, chấm vị trí (dots), bộ đếm slide chuẩn (`01/04` đến `04/04`) đồng bộ số thứ tự Archive di sản (`ARCHIVE 01` đến `ARCHIVE 04`) khớp 1:1 theo từng slide.
     * **Cân Bằng Quang Học Tiêu Đề Hero (Hero Typography Balance):** Tối ưu hóa tiêu đề 4 slide song ngữ (`clamp(2.4rem, 4.8vw, 4rem)`, `text-wrap: balance`), tinh chỉnh từ dịch súc tích, loại bỏ triệt để hiện tượng rớt chữ lẻ (orphan wrap) gây vỡ 4 dòng, bảo đảm cụm nút CTA chính luôn nổi bật trong tầm mắt người dùng.
     * **Category Filter Tabs:** Thanh Tab lọc nhanh trên phần New Arrivals: `[ ALL | WOMEN | MEN | ACCESSORIES ]`.
     * **Đồng bộ Thẻ Danh Mục (`CategoryCard.jsx`):** Bấm vào danh mục lớn thì tự cuộn mượt xuống khu vực sản phẩm và kích hoạt đúng Tab tương ứng.
  2. **Nâng cấp Thanh Điều Hướng & Menu Di Động (`Navbar.jsx` & `Navbar.css`):**
     * **Tìm kiếm trực tiếp thời gian thực (Live Search):** Dropdown gợi ý theo thời gian thực kèm ảnh nhỏ, giá tiền và từ khóa xu hướng (*Trending Searches*).
     * **Chuẩn Hóa Menu Ngăn Kéo Di Động (Mobile Drawer Harmonization):** Đồng nhất 100% font Sans-serif `--font-sans` (`Montserrat`) cho toàn bộ nút menu, quy chuẩn Title Case (*Trang Phục Nữ, Trang Phục Nam, Giỏ Hàng, Danh Sách Yêu Thích, Tài Khoản Của Tôi*), tiêu đề nhóm tinh giản (`BỘ SƯU TẬP`, `TÀI KHOẢN CỦA BẠN`), và loại bỏ triệt để nhãn phân quyền kỹ thuật `(USER)` tại nút Đăng xuất.
     * **Kết nối trang Shop:** Khi gõ từ khóa và bấm Enter, tự động chuyển hướng sang trang `/shop?search=<từ_khóa>`.
     * **Thanh Điều Hướng Sticky Thông Minh (Smart Hide-on-Scroll-Down / Show-on-Scroll-Up Header):** Tự động ẩn gọn (`translateY(-100%)`) khi người dùng cuộn xuống để mở rộng không gian chiêm ngưỡng trang phục và hiện lại tức thì khi cuộn lên; tự động khóa hiển thị khi đang mở ô tìm kiếm hoặc ngăn kéo Mobile Drawer.
  3. **Hoàn thiện Chân Trang Chuẩn Quiet Luxury (`src/components/Footer.jsx` & `Footer.css`):**
     * **Bốn Trụ Cột Giá Trị Thương Hiệu (Brand Pillars):** Khối nền Nâu Cacao ấm áp `#6C5238` viền chỉ be kem mảnh, loại bỏ hoàn toàn các thẻ nhãn thô ráp `[INFO]`, icon đĩa tròn kem sáng `var(--light-cream)`, tích hợp Modal chính sách mở nhanh khi click.
     * **Chuẩn Hóa Typography Cột & Cân Bằng Quang Học Song Ngữ:** Đồng nhất tiêu đề cột in hoa toàn bộ (`letter-spacing: 0.08em`, `line-height: 1.35`), tinh chỉnh từ dịch `DANH MỤC` cân đối với `CATEGORIES`, danh sách liên kết theo chuẩn Title Case trang nhã (`line-height: 1.45`).
     * **Đăng Ký Bản Tin LUNE Journal:** Nút bấm màu kem sáng `var(--light-cream)` nhã nhặn, chữ nâu trầm, có kiểm tra tính hợp lệ email và thông báo toast thành công.
     * **Đồng Bộ Song Ngữ 100%:** Toàn bộ liên kết, tiêu đề và nội dung chân trang kết nối từ điển `translations.vi` & `translations.en`.
* **Files phụ trách:** `src/pages/HomePage.jsx`, `src/pages/HomePage.css`, `src/components/Navbar.jsx` (Search logic), `src/components/CategoryCard.jsx`, `src/components/Footer.jsx`, `src/components/Footer.css`.

---

### 👤 THÀNH VIÊN 3: TRẢI NGHIỆM CHI TIẾT SẢN PHẨM & YÊU THÍCH
* **Vai trò:** Trải nghiệm tương tác với sản phẩm (Product Experience & Wishlist).
* **Nhiệm vụ cụ thể:**
  1. **Nâng cấp Thẻ Sản Phẩm (`src/components/ProductCard.jsx` & `ProductCard.css`):**
     * Hiệu ứng hover đổi ảnh góc phụ, nút xem nhanh "Quick View" và nút thả tim "Wishlist".
  2. **Trang Chi Tiết Sản Phẩm (`src/pages/ProductDetailPage.jsx` & `ProductDetail.css`):**
     * Đọc tham số URL (`/product/:id`) từ Router.
     * Thư viện ảnh sản phẩm: Xem ảnh lớn, click vào thumbnail nhỏ để chuyển ảnh chính.
     * Bộ chọn biến thể: Chọn Size (`XS, S, M, L, XL`), chọn Màu sắc vải, tăng giảm số lượng mua (`- 1 +`).
     * Tab nội dung: Mô tả chất liệu, hướng dẫn bảo quản giặt ủi, chính sách giao nhận.
  3. **Cửa Sổ Xem Nhanh (`QuickViewModal.jsx`) & Bảng Hướng Dẫn Size (`SizeGuideModal.jsx`):**
     * Modal xem nhanh thông tin sản phẩm và đặt hàng trực tiếp mà không cần rời trang hiện tại.
     * Modal bảng hướng dẫn chọn size chuẩn theo số đo chiều cao/cân nặng.
  4. **Trang Danh Sách Yêu Thích (`src/pages/WishlistPage.jsx` & `WishlistPage.css`):**
     * Màn hình `/wishlist` hiển thị toàn bộ sản phẩm khách đã thả tim.
     * Nút "Move to Bag" (chuyển thẳng vào giỏ hàng) và nút xóa khỏi danh sách yêu thích.
     * **Cơ chế Thả Tim Tức Thì & Thông Báo Nổi Không Chặn (`WishlistToast.jsx`):** Người dùng (cả Khách vãng lai và Thành viên) có thể thả tim 1-click tức thì không bị gián đoạn luồng mua sắm. Hiển thị thông báo nổi (`WishlistToast`) góc phải dưới màn hình kèm lời nhắc đăng nhập tinh tế. Trang `/wishlist` cho phép khách vãng lai tự do ngắm nhìn Lookbook cá nhân kèm thanh đồng bộ tài khoản không chặn; hệ thống tự động gộp (auto-merge) danh sách sản phẩm vào tài khoản ngay khi đăng nhập thành công.
* **Files phụ trách:** `src/components/ProductCard.jsx`, `src/components/QuickViewModal.jsx`, `src/components/SizeGuideModal.jsx`, `src/components/WishlistToast.jsx`, `src/components/WishlistToast.css`, `src/pages/ProductDetailPage.jsx`, `src/pages/WishlistPage.jsx`, các file CSS tương ứng.

---

### 👤 THÀNH VIÊN 4: GIỎ HÀNG & QUY TRÌNH THANH TOÁN (CART & CHECKOUT)
* **Vai trò:** Quy trình giỏ hàng và đặt hàng trọn gói (Cart & Checkout Flow).
* **Nhiệm vụ cụ thể:**
  1. **Ngăn Kéo Giỏ Hàng Trượt (`src/components/CartDrawer.jsx` & `CartDrawer.css`):**
     * Trượt mượt mà từ mép phải màn hình khi click vào icon giỏ hàng trên Navbar hoặc khi bấm "Add to Bag".
     * Danh sách sản phẩm trong giỏ: Tên, ảnh, size, màu, số lượng, giá tiền.
     * Nút tăng/giảm số lượng trực tiếp và nút xóa sản phẩm khỏi giỏ.
     * Thanh đo miễn phí vận chuyển (*"Mua thêm $X để được Free Shipping"*).
     * Nút bấm dẫn sang trang Thanh toán.
  2. **Trang Thanh Toán (`src/pages/CheckoutPage.jsx` & `CheckoutPage.css`):**
     * Form nhập thông tin giao hàng: Họ tên, Số điện thoại, Địa chỉ nhận hàng (Validate không để trống, kiểm tra định dạng SĐT).
     * **Tích hợp Custom Boutique Voucher Dropdown:** Nâng cấp từ thẻ `<select>` native sang Custom Select Component thuần chuẩn Warm Luxury: Tích hợp icon `<ChevronDown />` xoay 180° mượt mà không bị lỗi trồi mép/viền, loại bỏ hoàn toàn dải màu xám đen mặc định của hệ điều hành Windows, hiển thị badge mã giảm giá, mức giảm, điều kiện chi tiêu tối thiểu, và tính năng tự động đóng khi click ra ngoài (`click outside`). Đồng thời hỗ trợ nhập mã thủ công, tự động tính toán số tiền giảm theo thời gian thực (giảm theo % hoặc cố định USD), và ghi nhận `voucherCode` vào chi tiết đơn hàng `addOrder()`.
     * **Sổ Địa Chỉ Giao Hàng & Nút Thêm Mới Chuẩn Hóa:** Tích hợp chọn nhanh địa chỉ từ Profile và chuẩn hóa nút "Giao đến địa chỉ mới" / "Ship to a new address" hiển thị duy nhất 1 icon `<Plus />` tinh gọn.
     * Chọn phương thức thanh toán: COD (Thanh toán khi nhận hàng) hoặc Thẻ ngân hàng giả lập.
     * Cột tóm tắt đơn hàng: Tạm tính, phí vận chuyển, số tiền được giảm, tổng thanh toán cuối cùng.
  3. **Trang Đặt Hàng Thành Công (`src/pages/OrderSuccessPage.jsx` & `OrderSuccess.css`):**
     * Màn hình thông báo cảm ơn, sinh Mã đơn hàng ngẫu nhiên (Order ID: `LUNE-XXXX`).
     * Gọi hàm `addOrder()` từ Context để lưu đơn hàng mới vào `'lune_orders'`.
     * Tự động xóa sạch giỏ hàng (`clearCart()`) sau khi hoàn tất đặt hàng.
* **Files phụ trách:** `src/components/CartDrawer.jsx`, `src/pages/CheckoutPage.jsx`, `src/pages/OrderSuccessPage.jsx`, các file CSS tương ứng.

---

### 👤 THÀNH VIÊN 5: XÁC THỰC, PHÂN QUYỀN & QUẢN TRỊ ĐƠN HÀNG
* **Vai trò:** Bảo mật phân quyền hệ thống, hồ sơ khách hàng và quản lý toàn diện các Đơn Hàng.
* **Nhiệm vụ cụ thể:**
  1. **Xác thực & Phân quyền Tài khoản (`LoginPage.jsx`, `RegisterPage.jsx`):**
     * Hoàn thiện lưu trữ người dùng vào `'lune_users'`, cơ chế đăng nhập lưu phiên hiện tại vào `'lune_current_user'`.
     * Thiết lập quyền (Role): Tài khoản Quản trị (`role: 'admin'`) và Khách hàng (`role: 'user'`).
  2. **Bảo Vệ Đường Dẫn (`src/components/ProtectedRoute.jsx`):**
     * Chặn khách vãng lai hoặc tài khoản thường truy cập trái phép vào `/admin`. Tự động điều hướng về `/login` nếu chưa đăng nhập hoặc không đủ quyền.
  3. **Trang Hồ Sơ Khách Hàng (`src/pages/ProfilePage.jsx` & `ProfilePage.css`):**
     * Tab Thông tin cá nhân: Xem/sửa họ tên, số điện thoại, đổi mật khẩu.
     * Tab **Đơn hàng của tôi (My Orders):** Hiển thị danh sách các đơn mà tài khoản này đã từng mua, xem trạng thái đơn (`Pending`, `Shipping`, `Delivered`).
  4. **Quản Lý Đơn Hàng & Tài Khoản Admin (`src/pages/admin/AdminOrders.jsx` & `AdminUsers.jsx`):**
     * Trang **AdminOrders**: Bảng danh sách tất cả các đơn hàng do TV4 tạo ra. Cho phép Admin bấm nút chuyển trạng thái đơn (`Pending` $\rightarrow$ `Shipping` $\rightarrow$ `Delivered` $\rightarrow$ `Cancelled`).
     * Trang **AdminUsers**: Bảng hiển thị danh sách các tài khoản khách hàng đã đăng ký trong hệ thống.
* **Files phụ trách:** `src/pages/LoginPage.jsx`, `src/pages/RegisterPage.jsx`, `src/components/ProtectedRoute.jsx`, `src/pages/ProfilePage.jsx`, `src/pages/admin/AdminOrders.jsx`, `src/pages/admin/AdminUsers.jsx`.

---

### 👤 THÀNH VIÊN 6: PHÂN HỆ QUẢN TRỊ VIÊN, BIỂU ĐỒ DASHBOARD & CRUD SẢN PHẨM (ADMIN PORTAL & CRUD)
* **Vai trò:** Xây dựng cổng Quản trị viên cửa hàng, chức năng trọng tâm môn học CRUD Sản Phẩm, **Bộ đôi Biểu đồ Trực quan SVG Native (`AdminDashboard`)**, **Cơ chế Ẩn/Hiện Sản Phẩm Tức Thời** & **Chuẩn Hóa Song Ngữ Toàn Diện Toàn Bộ Phân Hệ Quản Trị (Full Admin Bilingual i18n)**.
* **Nhiệm vụ cụ thể:**
  1. **Bố cục khung Quản Trị & Tinh Gọn Topbar (`src/layouts/AdminLayout.jsx` & `Admin.css`):**
     * Thanh điều hướng Sidebar bên trái (Dashboard, Sản phẩm, Đơn hàng, Khách hàng, Voucher) và Topbar quản trị viên tinh tế (loại bỏ huy hiệu `[Administrator]` thừa thãi, tối giản bộ chuyển đổi ngôn ngữ sang dạng pill sang trọng `VI | EN`, tích hợp nút Đăng xuất an toàn).
     * Dùng `<Outlet />` để nhúng các trang con bên trong.
     * Tự động phản hồi thay đổi ngôn ngữ ngay tức thì, đồng bộ trạng thái với `localStorage`.
  2. **Bảng Thống Kê Tổng Quan & Bộ Đôi Biểu Đồ Trực Quan SVG Native (`src/pages/admin/AdminDashboard.jsx`):**
     * **4 thẻ KPI số liệu trực quan:** Tổng doanh thu, Tổng đơn hàng, Tổng sản phẩm trong kho, Tổng thành viên (Bản địa hóa 100% nhãn tiêu đề, chú thích và định dạng đơn vị).
     * **Biểu đồ Xu hướng Doanh thu 7 ngày (7-Day Revenue Trajectory Area Chart):** Biểu đồ diện tích vẽ bằng SVG thuần túy với đường cong Bezier mềm mại, tính toán doanh thu thực tế từ các đơn hàng không bị hủy, tích hợp tooltip rê chuột hiển thị ngày và doanh thu chính xác.
     * **Biểu đồ Phân bổ Doanh số theo Danh mục (Category Sales Donut Chart):** Biểu đồ tròn dạng Donut phân chia tỷ trọng doanh thu giữa Đồ Nữ, Đồ Nam và Phụ Kiện; hỗ trợ tương tác hover làm nổi bật phân đoạn và hiển thị thông tin trực quan tại tâm vòng tròn.
     * Bảng hiển thị 5 đơn hàng mới nhất cần duyệt gấp kèm các badge trạng thái song ngữ.
  3. **Quản Lý Sản Phẩm - CRUD TOÀN DIỆN & CƠ CHẾ ẨN/HIỆN 1-CLICK (`src/pages/admin/AdminProducts.jsx`) - [TRỌNG TÂM ĐIỂM SỐ]:**
     * **Read:** Bảng danh sách toàn bộ sản phẩm (ảnh thu nhỏ, tên, giá, danh mục, tồn kho, trạng thái). Thanh tìm kiếm và bộ lọc danh mục nội bộ song ngữ.
     * **Create:** Modal/Form thêm sản phẩm mới (Nhập tên, giá, tồn kho, link ảnh, chọn danh mục, mô tả) $\rightarrow$ Validate form không được để trống $\rightarrow$ Bấm lưu là sản phẩm lập tức hiển thị ra ngoài Trang Chủ và Trang Shop.
     * **Update:** Nút Sửa trên từng dòng sản phẩm $\rightarrow$ Mở form điền sẵn dữ liệu cũ $\rightarrow$ Cập nhật giá, đổi tên, cập nhật tồn kho, đổi ảnh.
     * **Delete:** Nút Xóa sản phẩm kèm hộp thoại xác nhận an toàn song ngữ (*"Bạn có chắc muốn xóa vĩnh viễn sản phẩm này?"*) $\rightarrow$ Xóa xong sản phẩm biến mất khỏi kho, hiển thị thông báo toast thành công chuẩn ngôn ngữ đang chọn.
     * **1-Click Visibility Toggle (`Eye / EyeOff`):** Bộ nút biểu tượng con mắt mở (`Eye`) và con mắt gạch chéo (`EyeOff`) đồng bộ kích thước chuẩn `36x36px`, cho phép Quản trị viên bật/tắt khả dụng của sản phẩm tức thời (`isActive`). Sản phẩm bị ẩn sẽ tự động biến mất khỏi Trang chủ, Cửa hàng và Live Search nhưng vẫn lưu an toàn trong kho.
     * **Chế Độ Xem Trước Quản Trị (Admin Preview Mode):** Phối hợp với `ProductDetailPage.jsx` hiển thị biểu ngữ cảnh báo màu hổ phách sang trọng kèm nút quay lại kho khi Quản trị viên truy cập sản phẩm đang bị ẩn.
  4. **Bản địa hóa Quản trị Đơn hàng & Quản trị Thành viên (`AdminOrders.jsx` & `AdminUsers.jsx`):**
     * Đồng bộ từ điển đa ngôn ngữ cho toàn bộ bảng biểu, bộ lọc trạng thái đơn, nhãn phân quyền và các hộp thoại cảnh báo của TV5.
  5. **Quản Lý Voucher Ưu Đãi Đặc Quyền - CRUD BẰNG MODAL POPUP (`src/pages/admin/AdminVouchers.jsx` & `AdminVouchers.css`):**
     * **Bảng điều khiển & 4 KPI:** Thống kê Tổng số voucher, Số voucher đang kích hoạt, Số voucher % và Số voucher cố định. Thanh tìm kiếm mã voucher nội bộ.
     * **Khởi tạo Voucher qua Modal (`Create Voucher Modal`):** Nhấp nút `+ Create Voucher` trên header mở Modal Popup tinh tế với backdrop mờ, hỗ trợ nhập Mã Code, Chọn loại (% / Fixed), Giá trị giảm, Đơn tối thiểu, Ngày & Giờ Bắt đầu và Kết thúc (`startsAt` & `expiresAt`). Xác thực form chặt chẽ.
     * **Chỉnh sửa Voucher qua Modal (`Edit Voucher Modal`):** Nút Sửa mở Modal nạp sẵn dữ liệu cũ, cho phép quản trị viên điều chỉnh nhanh chóng và lưu đồng bộ.
     * **Bộ 3 Icon thao tác đồng bộ (`Eye / EyeOff`, `Edit`, `Delete`):** Icon con mắt mở (`Eye`) và con mắt gạch chéo (`EyeOff`) đồng bộ kích thước chuẩn `36x36px` với nút Sửa và Xóa, cho phép bật/tắt hiển thị voucher tức thì mà không gây lệch giao diện.
     * **Xóa Voucher (Delete):** Hộp thoại xác nhận an toàn song ngữ trước khi xóa vĩnh viễn voucher.
  6. **Chuẩn Hóa 100% Brand Luxury Palette & Hệ Typography 3 Tầng Admin:**
     * Áp dụng thống nhất màu `#2C2117` cho tiêu đề bảng, số tiền, mã đơn và KPI; `#5C4A3A` cho tiêu đề cột và nhãn phân loại; `#8F7965` cho metadata phụ.
     * Triệt tiêu hoàn toàn các màu bootstrap sặc sỡ trên toàn bộ 5 màn hình quản trị, chống vỡ dòng cho các thẻ pill phân loại bằng `whitespace-nowrap flex-shrink-0`.
   7. **Quản Trị Đánh Giá & Phản Hồi Khách Hàng Chuẩn Minh Bạch (`src/pages/admin/AdminReviews.jsx` - `/admin/reviews`):**
      * **4 thẻ KPI thống kê:** Tổng lượt đánh giá, Điểm xếp hạng trung bình toàn hệ thống, Số đánh giá 5 sao tuyệt đối và Số đánh giá đang hiển thị công khai.
      * **Nguyên tắc Minh bạch Thương hiệu (Review Integrity Rule):** Quản trị viên **TUYỆT ĐỐI KHÔNG** được phép chỉnh sửa số sao, tiêu đề hay nội dung nhận xét gốc của khách hàng, và không có chức năng tự tạo đánh giá ảo.
      * **Modal Xem Chi Tiết (Read-Only) & Phản Hồi Chính Thức (`LUNE Atelier Response`):** Hiển thị nguyên vẹn đánh giá của khách ở chế độ chỉ đọc; cung cấp khung nhập phản hồi chính thức của thương hiệu (`adminReply`) hiển thị trực tiếp bên dưới nhận xét của khách tại `ProductDetailPage.jsx`.
      * **Kiểm duyệt Ẩn/Hiện (`Eye / EyeOff`) & Xóa Spam (`Trash2`):** Nút ẩn/hiện tức thời giúp lọc các bình luận vi phạm khỏi Storefront và tự động tính lại điểm trung bình sao công khai; nút xóa kèm hộp thoại xác nhận an toàn.
   8. **Chuẩn Hóa Toàn Bộ Bộ Chọn Custom Dropdown (`src/components/CustomSelect.jsx`) & Bảng Dữ Liệu Responsive:**
      * Thay thế toàn bộ 15 thẻ `<select>` mặc định trên cả Admin và Storefront bằng `CustomSelect` kết xuất qua React Portal (`createPortal`), loại bỏ hoàn toàn popup khổng lồ thô kệch của trình duyệt khi thu phóng mobile.
      * Chuẩn hóa `.admin-table` (`table-layout: auto`) và `.admin-toolbar` trên mobile, chống cắt chữ tiêu đề cột (`PAYME...`, `ACTIO...`) và chống đè các badge/nút thao tác.
* **Files phụ trách:** `src/components/CustomSelect.jsx`, `src/layouts/AdminLayout.jsx`, `src/pages/admin/AdminDashboard.jsx`, `src/pages/admin/AdminProducts.jsx`, `src/pages/admin/AdminOrders.jsx`, `src/pages/admin/AdminUsers.jsx`, `src/pages/admin/AdminVouchers.jsx`, `src/pages/admin/AdminVouchers.css`, `src/pages/admin/AdminReviews.jsx`, `src/pages/admin/Admin.css`.

---

## 🛡️ III. 4 NGUYÊN TẮC "THÉP" PHỐI HỢP NHÓM (CHỐNG LỖI VÀ XUNG ĐỘT)

1. **Quy tắc Cô Lập CSS (Tuyệt đối không viết thêm vào `App.css`):**
   * Giữ nguyên `App.css` cho các layout nền tảng ban đầu.
   * **Bắt buộc:** Mỗi bạn tạo file CSS riêng tương ứng với tên component của mình (ví dụ `ShopPage.css`, `Admin.css`, `CartDrawer.css`) và `import` trực tiếp vào file JSX đó. Cấm viết đè hoặc sửa class của thành viên khác.
2. **Quy tắc Git & Khóa nhánh `main`:**
   * Nghiêm cấm mọi thành viên `git push origin main`.
   * Mỗi bạn tạo một nhánh theo cú pháp: `feature/<ten-tinh-nang>` (Ví dụ: `feature/shop-page`, `feature/cart-drawer`, `feature/admin-products`).
   * Xong tính năng thì đẩy lên nhánh đó và tạo Pull Request (PR) trên GitHub.
   * **Chỉ Leader (TV1) được quyền Merge PR:** Trước khi merge, Leader phải kéo nhánh về máy, chạy thử `npm run build` không có lỗi đỏ thì mới được bấm Merge.
3. **Quy tắc Dữ liệu (State & LocalStorage):**
   * Mọi thao tác thêm/sửa/xóa sản phẩm, giỏ hàng, đơn hàng đều phải gọi qua các hàm của `ShopContext`. Tuyệt đối không tự ý viết các câu lệnh `localStorage` độc lập làm lệch dữ liệu của nhóm.
4. **Tiêu chí nghiệm thu (Definition of Done - DoD):**
   * Chạy lệnh `npm run build` thành công, không sinh lỗi (1954 modules transformed, 0 error).
   * Chuẩn hóa Đa ngôn ngữ (i18n): 752 / 752 key đối xứng 1:1 giữa tiếng Việt và tiếng Anh, không sót chuỗi hardcoded.
   * Giao diện chuẩn Responsive (hiển thị đẹp trên cả Desktop và Điện thoại).
   * Không có bất kỳ lỗi đỏ nào hiển thị ở màn hình F12 Console của trình duyệt.

