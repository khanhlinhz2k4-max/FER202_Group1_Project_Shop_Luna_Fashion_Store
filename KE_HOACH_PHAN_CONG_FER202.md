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

### 4. Danh sách Khóa LocalStorage cố định (Keys)
* Sản phẩm: `'lune_products'`
* Giỏ hàng: `'lune_cart'`
* Yêu thích: `'lune_wishlist'`
* Đơn hàng: `'lune_orders'`
* Danh sách User: `'lune_users'`
* Tài khoản hiện tại: `'lune_current_user'`

---

## 👥 II. BẢNG PHÂN CÔNG CHI TIẾT 6 THÀNH VIÊN

### 👤 THÀNH VIÊN 1: TRƯỞNG NHÓM (TEAM LEADER)
* **Vai trò:** Quản trị Kiến trúc Hệ thống, Điều phối Git & Trang Cửa Hàng Tổng Hợp.
* **Nhiệm vụ cụ thể:**
  1. **Khởi tạo Lõi State toàn cục (`src/context/ShopContext.jsx`):**
     * Quản lý State: `products`, `cart`, `wishlist`, `orders`, `currentUser`.
     * Cung cấp các hàm dùng chung: `addToCart()`, `removeFromCart()`, `updateQuantity()`, `toggleWishlist()`, `addProduct()`, `updateProduct()`, `deleteProduct()`, `addOrder()`.
     * Tự động đồng bộ đọc/ghi với `localStorage`.
  2. **Quản lý Định tuyến tổng & Git (`src/App.jsx`):**
     * Khai báo Router cấp cao nhất, bọc `ShopProvider`.
     * Quản lý nhánh `main`, thiết lập Branch Protection, duyệt Pull Request (Code Review), giải quyết xung đột khi merge.
  3. **Xây dựng Trang Cửa Hàng Toàn Diện (`src/pages/ShopPage.jsx` & `ShopPage.css`):**
     * Lưới hiển thị danh sách toàn bộ sản phẩm.
     * **Bộ lọc đa chiều (Filter Sidebar):** Lọc theo khoảng giá ($0-$100, $100-$250, $250+), theo danh mục, theo Size và Màu sắc.
     * **Sắp xếp (Sorting):** Giá tăng dần, giá giảm dần, hàng mới nhất.
     * **Phân trang (Pagination):** Chia số trang (1, 2, 3...) hoặc nút "Load More".
* **Files phụ trách:** `src/context/ShopContext.jsx`, `src/App.jsx`, `src/pages/ShopPage.jsx`, `src/pages/ShopPage.css`.

---

### 👤 THÀNH VIÊN 2: TRẢI NGHIỆM TRANG CHỦ & TÌM KIẾM TRỰC TIẾP
* **Vai trò:** Trải nghiệm Trang chủ thương hiệu (Home Experience) & Công cụ tìm kiếm sản phẩm.
* **Nhiệm vụ cụ thể:**
  1. **Nâng cấp Trang Chủ (`src/pages/HomePage.jsx` & `HomePage.css`):**
     * **Hero Banner Carousel/Slider:** Tự động trượt slide ảnh các bộ sưu tập nổi bật, có nút điều hướng Next/Prev và chấm vị trí (dots).
     * **Category Filter Tabs:** Thanh Tab lọc nhanh trên phần New Arrivals: `[ ALL | WOMEN | MEN | ACCESSORIES ]`.
     * **Đồng bộ Thẻ Danh Mục (`CategoryCard.jsx`):** Bấm vào danh mục lớn thì tự cuộn mượt xuống khu vực sản phẩm và kích hoạt đúng Tab tương ứng.
  2. **Nâng cấp Thanh Tìm Kiếm Trực Tiếp (`Navbar.jsx` - Live Search):**
     * Ô tìm kiếm gõ từ khóa theo thời gian thực (Real-time Search Dropdown): Hiển thị danh sách gợi ý sản phẩm khớp tên kèm ảnh đại diện nhỏ và giá tiền.
     * Hiển thị từ khóa tìm kiếm xu hướng (*Trending Searches*).
     * **Kết nối trang Shop:** Khi gõ từ khóa và bấm Enter, tự động chuyển hướng sang trang `/shop?search=<từ_khóa>`.
  3. **Hoàn thiện Chân Trang (`src/components/Footer.jsx` & `Footer.css`):**
     * Chính sách đổi trả 30 ngày, bảo hành, form đăng ký nhận tin LUNE Journal (có kiểm tra tính hợp lệ email và thông báo toast thành công).
* **Files phụ trách:** `src/pages/HomePage.jsx`, `src/pages/HomePage.css`, `src/components/Navbar.jsx` (Search logic), `src/components/CategoryCard.jsx`, `src/components/Footer.jsx`.

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
* **Files phụ trách:** `src/components/ProductCard.jsx`, `src/components/QuickViewModal.jsx`, `src/components/SizeGuideModal.jsx`, `src/pages/ProductDetailPage.jsx`, `src/pages/WishlistPage.jsx`, các file CSS tương ứng.

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
     * Ô nhập mã giảm giá (*Promo Code*: ví dụ nhập `LUNE10` được giảm 10% tổng hóa đơn).
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

### 👤 THÀNH VIÊN 6: PHÂN HỆ QUẢN TRỊ VIÊN & CRUD SẢN PHẨM (ADMIN PORTAL & CRUD)
* **Vai trò:** Xây dựng cổng Quản trị viên cửa hàng và chức năng trọng tâm môn học: CRUD Sản Phẩm.
* **Nhiệm vụ cụ thể:**
  1. **Bố cục khung Quản Trị (`src/layouts/AdminLayout.jsx` & `Admin.css`):**
     * Thanh điều hướng Sidebar bên trái (Dashboard, Sản phẩm, Đơn hàng, Khách hàng) và Topbar quản trị viên (có nút Đăng xuất, avatar admin).
     * Dùng `<Outlet />` để nhúng các trang con bên trong.
  2. **Bảng Thống Kê Tổng Quan (`src/pages/admin/AdminDashboard.jsx`):**
     * 4 thẻ KPI số liệu trực quan: **Tổng doanh thu**, **Tổng đơn hàng**, **Tổng sản phẩm trong kho**, **Tổng thành viên**.
     * Bảng hiển thị 5 đơn hàng mới nhất cần duyệt gấp.
  3. **Quản Lý Sản Phẩm - CRUD TOÀN DIỆN (`src/pages/admin/AdminProducts.jsx`) - [TRỌNG TÂM ĐIỂM SỐ]:**
     * **Read:** Bảng danh sách toàn bộ sản phẩm (ảnh thu nhỏ, tên, giá, danh mục, trạng thái). Có thanh tìm kiếm và lọc sản phẩm nội bộ.
     * **Create:** Modal/Form thêm sản phẩm mới (Nhập tên, giá, link ảnh, chọn danh mục, mô tả) $\rightarrow$ Validate form không được để trống $\rightarrow$ Bấm lưu là sản phẩm lập tức hiển thị ra ngoài Trang Chủ và Trang Shop.
     * **Update:** Nút Sửa trên từng dòng sản phẩm $\rightarrow$ Mở form điền sẵn dữ liệu cũ $\rightarrow$ Cập nhật giá, đổi tên, đổi ảnh.
     * **Delete:** Nút Xóa sản phẩm kèm hộp thoại xác nhận (*"Bạn có chắc muốn xóa sản phẩm này?"*) $\rightarrow$ Xóa xong sản phẩm biến mất khỏi kho.
* **Files phụ trách:** `src/layouts/AdminLayout.jsx`, `src/pages/admin/AdminDashboard.jsx`, `src/pages/admin/AdminProducts.jsx`, `src/pages/admin/Admin.css`.

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
   * Chạy lệnh `npm run build` thành công, không sinh lỗi.
   * Giao diện chuẩn Responsive (hiển thị đẹp trên cả Desktop và Điện thoại).
   * Không có bất kỳ lỗi đỏ nào hiển thị ở màn hình F12 Console của trình duyệt.
