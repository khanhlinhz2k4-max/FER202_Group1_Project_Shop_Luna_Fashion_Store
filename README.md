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
    - Khung quản trị (`AdminLayout`) kèm bộ nút chuyển ngữ `VI | EN` độc lập ngay trên Topbar.
    - Bảng điều khiển (`AdminDashboard`) với 4 thẻ KPI và bảng 5 đơn mới nhất song ngữ.
    - Quản lý sản phẩm CRUD (`AdminProducts`) với thanh công cụ lọc/tìm kiếm, bảng dữ liệu tồn kho, modal thêm/sửa sản phẩm và thông báo toast.
    - Quản lý đơn hàng (`AdminOrders`) và Quản lý người dùng (`AdminUsers`).
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

---

## 🛠️ CÔNG NGHỆ SỬ DỤNG (TECH STACK)

- **Framework:** React 19 + Vite (HMR siêu tốc)
- **Định tuyến (Routing):** React Router 7 (`BrowserRouter`, `Routes`, `Route`, `Navigate`)
- **Icon:** Lucide React (`lucide-react`)
- **Giao diện & Thẩm mỹ:** Pure Vanilla CSS (CSS Variables, Flexbox, CSS Grid, Glassmorphism, Micro-animations)
- **Quản lý Trạng thái:** React Context API (`ShopContext`, `LanguageContext`)
- **Lưu trữ Cục bộ:** Browser `localStorage` (Giỏ hàng, Yêu thích, Đơn hàng, Đánh giá, Ngôn ngữ, Xác thực)

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
│   │   └── ShopContext.jsx     # Quản lý giỏ hàng, đơn hàng, đánh giá
│   ├── data/
│   │   ├── products.js         # Dữ liệu trang phục & biến thể
│   │   └── translations.js     # Từ điển Song ngữ VI / EN (>1,300 dòng)
│   ├── pages/
│   │   ├── admin/              # Phân hệ Quản trị viên (Dashboard, Orders, Products, Users)
│   │   ├── CheckoutPage.jsx    # Trang thanh toán đơn hàng
│   │   ├── HomePage.jsx        # Trang chủ thương hiệu
│   │   ├── LoginPage.jsx       # Trang đăng nhập hội viên & modal quên mật khẩu
│   │   ├── OrderSuccessPage.jsx# Trang đặt hàng thành công & in hóa đơn
│   │   ├── ProductDetailPage.jsx# Trang chi tiết trang phục & đánh giá
│   │   ├── ProfilePage.jsx     # Trang hồ sơ cá nhân (5 Tabs)
│   │   ├── RegisterPage.jsx    # Trang đăng ký hội viên
│   │   ├── ShopPage.jsx        # Danh mục cửa hàng & bộ lọc đa tiêu chí
│   │   └── WishlistPage.jsx    # Danh sách yêu thích cá nhân
│   ├── App.jsx                 # Cấu hình Route chính & Bọc Providers
│   ├── index.css               # Hệ thống Token CSS Warm Luxury
│   └── main.jsx                # Điểm khởi chạy ứng dụng React
├── KE_HOACH_PHAN_CONG_FER202.md# Phân chia nhiệm vụ 6 thành viên chi tiết
├── KICH_BAN_KIEM_THU_TEST_CASES.md# 40+ Kịch bản kiểm thử tính năng
├── PHAN_TICH_HE_THONG_LUNE_STORE.md# Tài liệu đặc tả yêu cầu & phân tích hệ thống
├── THIET_KE_GIAO_DIEN_UI_UX.md # Đặc tả thiết kế giao diện & bảng màu
└── package.json
```

---

## 👥 PHÂN CÔNG NHIỆM VỤ NHÓM 1 (TEAM TASK ALLOCATION)

| STT | Thành Viên | Vai Trò Chính | Các Tính Năng Đảm Nhiệm Cốt Lõi |
|---|---|---|---|
| **1** | **Thành viên 1** | **Trưởng nhóm & Kiến trúc sư Core** | **Hệ thống Song ngữ VI/EN toàn diện cả Storefront & Admin (`LanguageContext`, `translations.js`), Phân trang tự động reset trên Shop, Điều hướng neo hash xuyên trang (`App.jsx`), In hóa đơn boutique (`InvoiceModal`), Tiến trình đơn hàng (`OrderTimeline`), Đánh giá & xếp hạng sao (`ReviewModal`), Bản địa hóa Xác thực & Hồ sơ 5 Tabs.** |
| 2 | Thành viên 2 | Trải nghiệm Trang chủ & Tìm kiếm | Hero Banner Carousel, Category Tabs, Thanh tìm kiếm trực tiếp thời gian thực (`Navbar`), Chân trang (`Footer`). |
| 3 | Thành viên 3 | Chi tiết Sản phẩm & Yêu thích | Bộ chọn biến thể Size/Màu, Thư viện ảnh chi tiết, Danh sách yêu thích (`WishlistPage`), Thông báo Wishlist toast. |
| 4 | Thành viên 4 | Giỏ hàng, Khuyến mãi & Đặt hàng | Ngăn kéo giỏ hàng (`CartDrawer`), Tiến độ Free Shipping, Mã giảm giá (`LUNE10`), Trang thanh toán (`CheckoutPage`). |
| 5 | Thành viên 5 | Xác thực & Hồ sơ Hội viên | Bố cục đăng nhập/đăng ký Split Layout, Xác thực form, Trình quản lý hồ sơ cá nhân (`ProfilePage`), Bảo mật phiên đăng nhập. |
| 6 | Thành viên 6 | Cổng Quản trị viên (Admin Portal) | Bảng điều khiển KPI (`AdminDashboard`), Quản trị sản phẩm CRUD, Quản trị đơn hàng & người dùng, Tích hợp 100% Song ngữ Admin & Topbar Language Switcher. |

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
