# 🌙 LUNE FASHION STORE — FER202 GROUP 1 PROJECT

> **Nền tảng Thương mại Điện tử Thời trang May đo Cao cấp (High-End Luxury Ready-to-Wear Atelier)**  
> Phong cách thiết kế: **Warm Luxury / Quiet Elegance** (`#775B3F`, `#FAF7F2`, `#C8AE84`)  
> Môn học: **FER202 — Front-End Web Development with React**

---

## 🌟 ĐẶC ĐIỂM NỔI BẬT CỦA DỰ ÁN (KEY HIGHLIGHTS)

### 1. 🌐 Hệ Thống Song Ngữ Toàn Diện 100% (Full-Site & Full-Admin Bilingual i18n — VI 🇻🇳 & EN 🇬🇧)
- **Zero-Dependency Architecture:** Hoàn toàn xây dựng bằng React Context nội bộ (`LanguageContext`, `useLanguage()`), không phụ thuộc thư viện thứ ba.
- **Từ điển Tập trung hơn 1,500 dòng (`src/data/translations.js`):** Bao phủ 100% toàn bộ giao diện hai phân hệ:
  - **Phân hệ Storefront (Khách hàng):**
    - Thanh điều hướng (`Navbar`), Ngăn kéo di động, Chân trang (`Footer`).
    - Trang Chủ (`HomePage`), Cửa Hàng (`ShopPage`), Chi Tiết Sản Phẩm (`ProductDetailPage`).
    - Giỏ Hàng (`CartDrawer`), Đặt Hàng (`CheckoutPage`), Đặt Hàng Thành Công (`OrderSuccessPage`).
    - Toàn bộ Phân hệ Xác thực: Đăng Nhập (`LoginPage` kèm modal Đặt lại mật khẩu & đăng nhập xã hội), Đăng Ký (`RegisterPage` kèm thước đo độ mạnh mật khẩu & modal Điều khoản).
    - Hồ Sơ Hội Viên (`ProfilePage` trọn vẹn 5 Tab: Đơn hàng, Thông tin, Đổi mật khẩu, Sổ địa chỉ, Yêu thích).
    - Các Modals & Tiện ích: Đánh giá sao (`ReviewModal`), In hóa đơn boutique (`InvoiceModal`), Tiến trình may đo (`OrderTimeline`), Xem nhanh (`QuickViewModal`), Bảng kích cỡ (`SizeGuideModal`).
  - **Phân hệ Quản trị viên (Admin Portal - 100% Song ngữ):**
    - Khung quản trị (`AdminLayout`) kèm bộ nút chuyển ngữ `VI | EN` độc lập dạng pill tối giản ngay trên Topbar.
    - Bảng điều khiển (`AdminDashboard`) với 4 thẻ KPI, bộ đôi biểu đồ trực quan SVG (Xu hướng doanh thu 7 ngày & Phân bổ danh mục Donut) và bảng 5 đơn mới nhất song ngữ.
    - Quản lý sản phẩm CRUD (`AdminProducts`) với cơ chế Ẩn/Hiện sản phẩm 1-click (`Eye / EyeOff`), bảng dữ liệu tồn kho, modal thêm/sửa sản phẩm và thông báo toast.
    - Quản lý đơn hàng (`AdminOrders`), Quản lý voucher (`AdminVouchers`) và Quản lý người dùng (`AdminUsers`).
- **Bản địa hóa Động Sản phẩm (`tp()`):** Tự động chuyển đổi tên và mô tả sản phẩm giữa tiếng Việt và tiếng Anh mà không làm sai lệch ID sản phẩm hoặc giỏ hàng.
- **Lưu trữ Cố định (`localStorage`):** Tự động ghi nhớ tùy chọn ngôn ngữ (`'lune_language'`) qua các phiên truy cập và khi tải lại trang (F5).

### 2. 🧾 In Hóa Đơn Chuẩn Boutique (`InvoiceModal.jsx`)
- Xem trước hóa đơn bán hàng phong cách atelier Paris & TP. Hồ Chí Minh.
- Tích hợp chuẩn in ấn trình duyệt chuyên biệt `@media print` (`window.print()`), ẩn sạch thanh công cụ khi xuất file PDF.
- Tự động bản địa hóa định dạng ngày phát hành (`vi-VN` vs `en-US`), trụ sở thương hiệu và điều khoản hậu mãi.

### 3. ⭐ Hệ Thống Đánh Giá & Xếp Hạng Khách Hàng Xác Thực (`ReviewModal.jsx`)
- Khách hàng sau khi nhận hàng (`Delivered`) được mở khóa quyền viết đánh giá xác thực (`Verified Buyer`).
- Bộ chọn mức độ hài lòng 1–5 sao kèm nhãn cảm xúc song ngữ và thuật toán tính điểm trung bình thời gian thực.

### 4. 📦 Theo Dõi Tiến Trình Đơn Hàng 4 Giai Đoạn (`OrderTimeline.jsx`)
- Tiến trình trực quan 4 nấc: *Đã tiếp nhận -> May đo tại xưởng -> Đang vận chuyển -> Giao thành công*.
- Liên kết đồng bộ thời gian thực với cập nhật trạng thái từ phía Quản trị viên (`/admin`).

### 5. 🔐 Xác Thực & Hồ Sơ Hội Viên An Toàn (Auth & Profile Experience)
- **Đăng ký:** Thước đo độ mạnh mật khẩu (Weak / Medium / Strong) với danh sách tiêu chí trực quan thời gian thực (độ dài, chữ hoa, số, ký tự đặc biệt) và modal Điều khoản dịch vụ.
- **Đăng nhập:** Hỗ trợ nút điền nhanh tài khoản mẫu (Demo Admin & Demo Customer), modal khôi phục mật khẩu.
- **Hồ sơ 5 Tab:** Quản lý đơn hàng có bộ lọc trạng thái, cập nhật thông tin cá nhân, đổi mật khẩu bảo mật, quản lý sổ địa chỉ giao hàng và danh sách yêu thích cá nhân.

### 6. 🧭 Điều Hướng Neo Hash Xuyên Trang & Phân Trang Thông Minh (UX Polish)
- **Cross-Route Smooth Anchor Scroll:** Component `ScrollToTop` tự động điều hướng và cuộn mượt mà có độ trễ 100ms khi người dùng bấm vào các mục menu anchor (`#categories`, `#new-arrivals`, `#about`) từ bất kỳ trang con nào. Bù trừ khoảng cách cố định `scroll-margin-top: 90px` giúp tiêu đề không bị Navbar che khuất.
- **Smart Pagination Auto-Reset:** Tự động đưa số trang về trang 1 khi người dùng thay đổi bất kỳ bộ lọc nào tại trang Shop (từ khóa, danh mục, loại đồ, kích cỡ, màu sắc, thanh trượt giá, sắp xếp) kèm chốt chặn bảo vệ biên tránh trang trống.

### 7. 🎟️ Quản Lý Voucher Ưu Đãi Đặc Quyền & Áp Dụng Giảm Giá (Voucher System)
- **Phân hệ Quản trị (`/admin/vouchers`):** 4 thẻ KPI thống kê tổng quan (Tổng số voucher, Đang hoạt động, Giảm theo %, Giảm cố định), thanh tìm kiếm mã voucher và bảng dữ liệu trạng thái thông minh 4 cấp (*Active, Upcoming, Expired, Inactive*).
- **Modal Popup Tạo & Chỉnh Sửa Voucher Sang Trọng:** Cửa sổ Modal Popup nổi tinh tế hỗ trợ cài đặt Ngày & Giờ Bắt Đầu (`startsAt`) và Ngày & Giờ Kết Thúc (`expiresAt`) chính xác với kiểm tra ràng buộc logic thời gian; **bộ 3 icon thao tác vuông đồng bộ (`36x36px`)** gồm icon con mắt (`Eye / EyeOff`) bật/tắt hiển thị tức thì không làm lệch bảng, icon Sửa và Xóa an toàn.
- **Phân hệ Khách hàng (`/checkout`):** Dropdown tự động lọc các voucher hợp lệ thỏa mãn đồng thời 3 điều kiện (*kích hoạt, trong khung giờ hiệu lực, đạt giá trị đơn tối thiểu*); dòng gợi ý upsell tinh tế đối với các voucher sắp đạt mốc tối thiểu; hỗ trợ cả chọn từ danh sách lẫn gõ mã tay; tự động tính giảm giá và lưu mã voucher vào đơn hàng.
- **Bản địa hóa Song ngữ 100%:** Toàn bộ giao diện quản trị voucher và thông báo tại giỏ hàng/thanh toán đồng bộ đối xứng giữa tiếng Việt và tiếng Anh.

### 8. 👁️ Cơ Chế Ẩn/Hiện Sản Phẩm & Chế Độ Xem Trước Admin (Product Visibility & Preview Mode)
- **1-Click Visibility Toggle:** Quản trị viên bật/tắt trạng thái hiển thị (`isActive`) sản phẩm tức thì bằng nút con mắt (`Eye / EyeOff`) tại bảng `/admin/products` mà không cần xóa dữ liệu.
- **Bảo Vệ Storefront Tự Động:** Toàn bộ sản phẩm bị ẩn (`isActive: false`) tự động bị loại bỏ khỏi Trang chủ (`HomePage`), Danh mục cửa hàng (`ShopPage`), và Tìm kiếm trực tiếp thời gian thực (`LiveSearch`).
- **Chế Độ Xem Trước Quản Trị (Admin Preview Mode):** Khi Quản trị viên truy cập đường dẫn trực tiếp của sản phẩm bị ẩn, giao diện hiển thị biểu ngữ cảnh báo màu hổ phách sang trọng *(Chế độ Xem Trước Quản Trị)* cho phép kiểm tra chi tiết hình ảnh và thông số; đối với khách hàng thông thường, hệ thống hiển thị thông báo sản phẩm đã được lưu trữ vào kho di sản (*Archived Piece*) và khóa nút đặt hàng.

### 9. 📈 Phân Tích Kinh Doanh Trực Quan SVG Native (Admin Dashboard Interactive Charts)
- **7-Day Revenue Trajectory Area Chart:** Biểu đồ đường diện tích vẽ bằng SVG thuần túy với đường cong Bezier mềm mại, lưới tọa độ tinh tế và tooltip rê chuột trực quan theo từng ngày doanh thu thực tế.
- **Category Sales Distribution Donut Chart:** Biểu đồ tròn Donut phân bổ tỷ trọng doanh số theo danh mục thời trang với hiệu ứng hover tương tác từng phân đoạn hình học và hiển thị trực quan thông tin tại tâm vòng tròn.
- **Zero-Dependency & Luxury Aesthetics:** 100% Pure SVG Native không phụ thuộc thư viện đồ họa ngoài, tối ưu hóa tốc độ tải trang và đồng bộ tuyệt đối với bảng màu Warm Luxury (`#2C2117`, `#5C4A3A`, `#C8AE84`).

### 10. 🛡️ Lá Chắn Error Boundary & Bảo Vệ Điều Hướng An Toàn (Resilience & Anti-Redirect Loop)
- **Global Error Boundary (`ErrorBoundary.jsx`):** Bao bọc toàn bộ ứng dụng tại tầng gốc, bắt giữ các ngoại lệ runtime JavaScript và cung cấp màn hình phục hồi trang nhã với nút làm mới an toàn, triệt tiêu hoàn toàn nguy cơ sập màn hình trắng (Blank Screen).
- **Anti-Infinite Redirect Loop:** Bộ lọc làm sạch đường dẫn điều hướng `from.pathname` tại `LoginPage.jsx`, bảo vệ tài khoản thông thường không bị kẹt vào vòng lặp điều hướng vô hạn giữa trang đăng nhập và khu vực quản trị viên.

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG (TECH STACK)

- **Framework:** React 19 + Vite (HMR siêu tốc)
- **Định tuyến (Routing):** React Router 7 (`BrowserRouter`, `Routes`, `Route`, `Navigate`)
- **Icon:** Lucide React (`lucide-react`)
- **Giao diện & Thẩm mỹ:** Pure Vanilla CSS (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Micro-animations)
- **Quản lý Trạng thái:** React Context API (`ShopContext`, `LanguageContext`)
- **Lưu trữ Cục bộ:** Browser `localStorage` (Giỏ hàng, Yêu thích, Đơn hàng, Đánh giá, Ngôn ngữ, Xác thực, Voucher)

---

## 📂 CẤU TRÚC THƯ MỤC DỰ ÁN (PROJECT STRUCTURE)

```
FER202_Group1_Project_Shop_Lune_Fashion_Store/
├── public/                     # Ảnh tĩnh & tài nguyên dùng chung
├── src/
│   ├── assets/                 # Hình ảnh thời trang & logo
│   ├── components/             # Các Component tái sử dụng
│   │   ├── CartDrawer.jsx      # Ngăn kéo giỏ hàng trượt
│   │   ├── CategoryCard.jsx    # Thẻ danh mục sản phẩm
│   │   ├── ErrorBoundary.jsx   # Lá chắn bắt lỗi ứng dụng toàn cục
│   │   ├── Footer.jsx          # Chân trang atelier
│   │   ├── InvoiceModal.jsx    # Hóa đơn in boutique
│   │   ├── LanguageSwitcher.jsx# Nút chuyển song ngữ VI | EN
│   │   ├── Navbar.jsx          # Thanh điều hướng & tìm kiếm live
│   │   ├── OrderTimeline.jsx   # Tiến trình may đo & giao hàng
│   │   ├── ProductCard.jsx     # Thẻ hiển thị trang phục
│   │   ├── QuickViewModal.jsx  # Xem nhanh sản phẩm
│   │   ├── ReviewModal.jsx     # Hộp thoại viết đánh giá sao
│   │   ├── SizeGuideModal.jsx  # Bảng tra kích cỡ may đo
│   │   └── StarRating.jsx      # Hiển thị dải sao vàng kim
│   ├── context/
│   │   ├── LanguageContext.jsx # Quản lý trạng thái đa ngôn ngữ
│   │   └── ShopContext.jsx     # Quản lý giỏ hàng, đơn hàng, đánh giá, voucher
│   ├── data/
│   │   ├── products.js         # Dữ liệu trang phục & biến thể
│   │   └── translations.js     # Từ điển Song ngữ VI / EN (>1,500 dòng)
│   ├── pages/
│   │   ├── admin/              # Phân hệ Quản trị viên (Dashboard, Orders, Products, Users, Vouchers)
│   │   ├── CheckoutPage.jsx    # Trang thanh toán đơn hàng & chọn voucher
│   │   ├── HomePage.jsx        # Trang chủ thương hiệu
│   │   ├── LoginPage.jsx       # Trang đăng nhập hội viên & modal quên mật khẩu
│   │   ├── OrderSuccessPage.jsx# Trang đặt hàng thành công & in hóa đơn
│   │   ├── ProductDetailPage.jsx# Trang chi tiết trang phục, đánh giá & xem trước
│   │   ├── ProfilePage.jsx     # Trang hồ sơ cá nhân (5 Tabs)
│   │   ├── RegisterPage.jsx    # Trang đăng ký hội viên
│   │   ├── ShopPage.jsx        # Danh mục cửa hàng & bộ lọc đa tiêu chí
│   │   └── WishlistPage.jsx    # Danh sách yêu thích cá nhân
│   ├── App.jsx                 # Cấu hình Route chính, Error Boundary & Bọc Providers
│   ├── index.css               # Hệ thống Token CSS Warm Luxury
│   └── main.jsx                # Điểm khởi chạy ứng dụng React
├── KE_HOACH_PHAN_CONG_FER202.md# Phân chia nhiệm vụ 6 thành viên chi tiết
├── KICH_BAN_KIEM_THU_TEST_CASES.md# 60+ Kịch bản kiểm thử tính năng (100% PASS)
├── PHAN_TICH_HE_THONG_LUNE_STORE.md# Tài liệu đặc tả yêu cầu & phân tích hệ thống
├── THIET_KE_GIAO_DIEN_UI_UX.md # Đặc tả thiết kế giao diện & bảng màu
└── package.json
```

---

## 👥 PHÂN CÔNG NHIỆM VỤ NHÓM 1 (TEAM TASK ALLOCATION)

| STT | Thành Viên | Vai Trò Chính | Các Tính Năng Đảm Nhiệm Cốt Lõi |
|---|---|---|---|
| **1** | **Thành viên 1** | **Trưởng nhóm & Kiến trúc sư Core** | **Hệ thống Song ngữ VI/EN toàn diện cả Storefront & Admin (`LanguageContext`, `translations.js`), Error Boundary toàn cục (`ErrorBoundary.jsx`), Chống vòng lặp điều hướng tại Login, Phân trang tự động reset trên Shop, Điều hướng neo hash xuyên trang (`App.jsx`), In hóa đơn boutique (`InvoiceModal`), Tiến trình đơn hàng (`OrderTimeline`), Đánh giá & xếp hạng sao (`ReviewModal`), Bản địa hóa Xác thực & Hồ sơ 5 Tabs.** |
| 2 | Thành viên 2 | Trải nghiệm Trang chủ & Tìm kiếm | Hero Banner Carousel, Category Tabs, Thanh tìm kiếm trực tiếp thời gian thực (`Navbar`), Chân trang (`Footer`). |
| 3 | Thành viên 3 | Chi tiết Sản phẩm & Yêu thích | Bộ chọn biến thể Size/Màu, Thư viện ảnh chi tiết, Danh sách yêu thích (`WishlistPage`), Thông báo Wishlist toast, Biểu ngữ sản phẩm lưu trữ di sản. |
| 4 | Thành viên 4 | Giỏ hàng, Khuyến mãi & Đặt hàng | Ngăn kéo giỏ hàng (`CartDrawer`), Tiến độ Free Shipping, Mã giảm giá (`LUNE10`), Trang thanh toán (`CheckoutPage`), Tích hợp bộ chọn Voucher thông minh. |
| 5 | Thành viên 5 | Xác thực & Hồ sơ Hội viên | Bố cục đăng nhập/đăng ký Split Layout, Xác thực form, Trình quản lý hồ sơ cá nhân (`ProfilePage`), Bảo mật phiên đăng nhập & phân quyền. |
| 6 | Thành viên 6 | Cổng Quản trị viên (Admin Portal) | Bảng điều khiển KPI kèm 2 Biểu đồ SVG trực quan (`AdminDashboard`), Quản trị sản phẩm CRUD kèm cơ chế Ẩn/Hiện 1-click & Admin Preview Mode, Quản lý Voucher qua Modal Popup (`AdminVouchers`), Quản trị đơn hàng & người dùng, Tinh gọn Topbar & Chuẩn hóa bảng màu Warm Luxury Admin. |

---

## 🚀 HƯỚNG DẪN CÀI ĐẶT & CHẠY DỰ ÁN (GETTING STARTED)

### Yêu cầu tiên quyết:
- **Node.js:** Phiên bản 18 trở lên
- **npm:** Phiên bản 9 trở lên

### Các bước cài đặt:

1. **Cài đặt các gói thư viện cần thiết:**
   ```bash
   npm install
   ```

2. **Khởi chạy môi trường phát triển (Development Server):**
   ```bash
   npm run dev
   ```
   *Mở trình duyệt tại đường dẫn hiển thị (thường là `http://localhost:5173`).*

3. **Kiểm tra và đóng gói sản phẩm (Production Build):**
   ```bash
   npm run build
   ```

---

## 💎 TÀI KHOẢN TRẢI NGHIỆM MẪU (DEMO ACCOUNTS)

| Vai Trò | Tên Đăng Nhập / Email | Mật Khẩu | Quyền Hạn |
|---|---|---|---|
| **Quản trị viên (Admin)** | `admin@lune.com` | `admin123` | Toàn quyền quản trị kho, đơn hàng, khách hàng tại `/admin` |
| **Khách hàng hội viên** | `customer@lune.com` | `user123` | Mua sắm, theo dõi tiến trình đơn hàng, in hóa đơn, viết đánh giá |

*(Có thể sử dụng các nút bấm điền nhanh ngay tại giao diện Đăng nhập).*

---
*Dự án thuộc bản quyền môn học FER202 — Nhóm 1.*
