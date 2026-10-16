# 🧪 KỊCH BẢN KIỂM THỬ HỆ THỐNG & TIÊU CHUẨN NGHIỆM THU (TEST CASES & ACCEPTANCE CRITERIA)
# DỰ ÁN: LUNE FASHION STORE
### Tài liệu nghiệm thu chất lượng phần mềm - Chuyên ngành FER202
*(Thuần kịch bản kiểm thử nghiệp vụ, quy trình kiểm thử và tiêu chuẩn đầu ra - Không chứa mã nguồn)*

---

## 📌 I. MỤC ĐÍCH & QUY TRÌNH NGHIỆM THU

### 1. Mục đích
Tài liệu này là **"Thước đo nghiệm thu" (Definition of Done)** bắt buộc đối với toàn bộ 6 thành viên trong nhóm. Trước khi một thành viên tạo Pull Request (PR) để nộp code vào nhánh `main`, thành viên đó phải tự thực hiện đầy đủ các ca kiểm thử thuộc phần trách nhiệm của mình và đảm bảo trạng thái **ĐẠT (PASS 100%)**.

### 2. Thang đánh giá kết quả
* **PASS (Đạt):** Hệ thống phản hồi chính xác 100% so với kết quả mong đợi, không có lỗi logic, không phát sinh lỗi đỏ trên F12 Console.
* **FAIL (Không đạt):** Phát sinh lỗi tính toán sai, lệch dữ liệu, vỡ giao diện hoặc sập ứng dụng (Crash / Blank Page). Bắt buộc phải sửa lại trước khi bàn giao.

---

## 🔍 II. DANH SÁCH CÁC BỘ KIỂM THỬ THEO THÀNH VIÊN (TEST SUITES)

---

### 👤 TEST SUITE 1: TRẢI NGHIỆM TRANG CHỦ & TÌM KIẾM TRỰC TIẾP (PHỤ TRÁCH: TV2)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-HOME-01** | Trượt ảnh Hero Carousel tự động & thủ công | 1. Mở trang chủ `/`.<br>2. Quan sát Banner 5 giây.<br>3. Bấm nút mũi tên Next/Prev.<br>4. Bấm các dấu chấm điều hướng (dots).<br>5. Đối chiếu số thứ tự slide và nhãn Archive. | Thao tác click chuột | Banner tự động chuyển slide êm ái; khi bấm nút Next/Prev ảnh chuyển đúng hướng; thanh gạch đổi trạng thái active; bộ đếm slide (`01/04` - `04/04`) đồng bộ khớp chính xác 1:1 với số thứ tự bộ sưu tập di sản (`ARCHIVE 01` - `ARCHIVE 04`). | [x] PASS<br>[ ] FAIL |
| **TC-HOME-02** | Tab lọc nhanh danh mục trên New Arrivals | 1. Tại trang chủ, xem khối New Arrivals.<br>2. Bấm lần lượt các Tab: `ALL`, `WOMEN`, `MEN`, `ACCESSORIES`. | Click chọn từng Tab | Lưới sản phẩm bên dưới lập tức đổi danh sách, chỉ hiển thị đúng các mặt hàng thuộc danh mục được chọn. Tab đang chọn có viền nhấn nổi bật. | [x] PASS<br>[ ] FAIL |
| **TC-HOME-03** | Cuộn mượt từ Thẻ danh mục (Category Card) | 1. Tại trang chủ, bấm vào thẻ danh mục lớn "Women Collection". | Click vào thẻ | Màn hình tự động cuộn mượt xuống khu vực sản phẩm và tự động kích hoạt sẵn Tab "WOMEN". | [x] PASS<br>[ ] FAIL |
| **TC-SRCH-01** | Tìm kiếm trực tiếp thời gian thực (Live Search) | 1. Nhấp chuột vào ô Tìm kiếm trên Navbar.<br>2. Gõ từ khóa: `"silk"`. | Từ khóa: `"silk"` | Ngay lập tức xuất hiện menu Dropdown bên dưới hiển thị các sản phẩm có chữ "silk", kèm ảnh thu nhỏ và giá tiền chuẩn xác. | [x] PASS<br>[ ] FAIL |
| **TC-SRCH-02** | Chọn sản phẩm từ gợi ý Dropdown | 1. Từ danh sách gợi ý của TC-SRCH-01, nhấp vào một dòng sản phẩm. | Click chuột | Hệ thống điều hướng ngay tới trang chi tiết `/product/:id` của đúng món hàng đó; ô tìm kiếm tự động đóng lại. | [x] PASS<br>[ ] FAIL |
| **TC-SRCH-03** | Chuyển hướng sang trang Shop khi bấm Enter | 1. Nhập từ khóa `"dress"` vào ô tìm kiếm.<br>2. Nhấn phím `Enter` trên bàn phím. | Nhấn Enter | Hệ thống chuyển hướng sang `/shop?search=dress`, lưới sản phẩm trang Shop lọc ra toàn bộ mẫu váy đầm. | [x] PASS<br>[ ] FAIL |
| **TC-FOOT-01** | Xác thực form đăng ký nhận bản tin (Newsletter) | 1. Cuộn xuống chân trang Footer.<br>2. Để trống ô email và bấm Đăng ký.<br>3. Nhập email sai: `"abc@"`.<br>4. Nhập email đúng: `"khach@gmail.com"`. | Email hợp lệ & không hợp lệ | Hệ thống báo lỗi nếu để trống hoặc sai định dạng; khi nhập đúng email sẽ hiển thị thông báo cảm ơn thành công. | [x] PASS<br>[ ] FAIL |
| **TC-FOOT-02** | Tương tác 4 Trụ Cột Giá Trị Thương Hiệu & Modal Chính Sách | 1. Cuộn xuống dải 4 Pillars tại chân trang.<br>2. Nhấp lần lượt vào các trụ cột: Vận chuyển, Đổi trả, Bảo hành, Styling VIP.<br>3. Kiểm tra hiển thị tiêu đề và nội dung Modal. | Click chọn từng Pillar | Modal chính sách tương ứng bật lên tức thì với nội dung trang nhã; các biểu tượng vàng champagne phản hồi hover mượt mà; 100% không còn thẻ nhãn thô `[INFO]`. | [x] PASS<br>[ ] FAIL |
| **TC-NAV-04** | Điều hướng neo Hash xuyên trang & Bù trừ khoảng cách Navbar | 1. Đang ở trang `/shop` hoặc `/product/1`.<br>2. Nhấp vào "Categories", "New Collection" hoặc "About" trên Navbar.<br>3. Quan sát vị trí cuộn trang. | Click menu anchor từ trang khác | Hệ thống tự động chuyển về trang chủ `/` và cuộn mượt mà có độ trễ 100ms tới đúng khối neo đích; khoảng cách bù trừ `scroll-margin-top: 90px` giúp tiêu đề hiển thị trọn vẹn, không bị Navbar che khuất. | [x] PASS<br>[ ] FAIL |

---

### 👤 TEST SUITE 2: CỬA HÀNG TỔNG HỢP, BỘ LỌC & PHÂN TRANG (PHỤ TRÁCH: TV1 - LEADER)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-SHOP-01** | Hiển thị toàn bộ lưới sản phẩm | 1. Truy cập đường dẫn `/shop`. | Tải trang | Hiển thị danh sách sản phẩm dạng lưới đều đặn, ảnh sắc nét tỷ lệ 3:4, đầy đủ tên, giá và nhãn "NEW" (nếu có). | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-02** | Lọc theo Khoảng giá & Khớp dải màu (Price Filter) | 1. Chọn khoảng giá `$90 - $400`.<br>2. Kéo thanh trượt giá.<br>3. Quan sát vị trí nút lăn thumb và dải màu. | Mức giá: $90 - $400 | Thanh trượt kéo mượt mà; dải màu nâu active (`linear-gradient`) khớp chính xác 100% với vị trí con lăn thumb và giá tiền hiển thị ở trên. Mọi sản phẩm hiển thị nằm trong khoảng giá. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-03** | Lọc kết hợp đa tiêu chí (Multi-filter) | 1. Chọn Danh mục: `Women`.<br>2. Chọn Size: `M`.<br>3. Chọn Màu: `Black`. | Women + Size M + Black | Chỉ những sản phẩm thời trang nữ CÓ size M VÀ CÓ màu Black mới được hiển thị. Hiển thị số lượng kết quả khớp chính xác. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-04** | Xử lý khi bộ lọc không có kết quả | 1. Chọn kết hợp các tiêu chí không có hàng (VD: Men + Giá dưới $50). | Bộ lọc không tồn tại hàng | Hiển thị màn hình trạng thái trống lịch sự: *"Không tìm thấy sản phẩm phù hợp"* kèm nút *"Xóa bộ lọc"* để quay lại ban đầu. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-05** | Sắp xếp sản phẩm theo giá tăng dần | 1. Tại dropdown Sắp xếp, chọn *"Giá: Thấp đến Cao"*. | Lựa chọn sắp xếp | Thứ tự hiển thị các sản phẩm được xếp lại ngay: Món rẻ nhất đứng đầu tiên, món đắt nhất đứng cuối cùng. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-06** | Sắp xếp sản phẩm theo giá giảm dần | 1. Tại dropdown Sắp xếp, chọn *"Giá: Cao đến Thấp"*. | Lựa chọn sắp xếp | Sản phẩm đắt nhất đứng đầu tiên, giá giảm dần về sau. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-07** | Phân trang hoặc Tải thêm (Pagination) | 1. Bấm chuyển trang 2 hoặc bấm "Xem thêm". | Click trang 2 | Hiển thị đúng các sản phẩm của trang tiếp theo; màn hình tự động cuộn lên đầu danh sách sản phẩm. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-08** | Lọc danh mục loại trang phục động theo Giới tính | 1. Chọn xem `Men's Collection`.<br>2. Quan sát cột bộ lọc CATEGORIES bên trái.<br>3. Chuyển sang `Women's Collection`. | Click chọn Men / Women | Cột CATEGORIES tự động ẩn các loại đồ không liên quan (ví dụ: ẩn Silk Dresses khi chọn đồ Nam); tự động reset chọn về "All Garments" khi đổi danh mục. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-09** | Điều hướng & Cuộn mượt trên Menu Mobile | 1. Mở Mobile Menu Drawer.<br>2. Bấm "Women's Collection", "Men's Collection".<br>3. Bấm "New Collection", "About LUNE". | Thao tác click trên Mobile Menu | Chuyển đúng trang danh mục Nam/Nữ; với các link anchor (`/#`) màn hình tự động cuộn mượt xuống đúng vị trí phần tương ứng trên trang Home. | [x] PASS<br>[ ] FAIL |
| **TC-SHOP-10** | Tự động đặt lại Phân trang về Trang 1 khi đổi bộ lọc (Pagination Auto-Reset) | 1. Đang ở trang 2 hoặc 3 của Shop.<br>2. Gõ từ khóa tìm kiếm mới hoặc chọn màu/size/danh mục/khoảng giá khác.<br>3. Quan sát số trang hiện tại. | Thay đổi bất kỳ bộ lọc / sắp xếp nào | Hệ thống tự động đặt lại `currentPage` về trang 1 (`[x] Trang 1 active`); đồng thời nếu kết quả lọc có số trang nhỏ hơn trang hiện tại, hệ thống tự động bảo vệ không để người dùng kẹt ở trang trắng. | [x] PASS<br>[ ] FAIL |
| **TC-STOCK-01** | Tự động trừ tồn kho khi tạo đơn đặt hàng | 1. Kiểm tra tồn kho SP A (Ví dụ: 18 cái).<br>2. Khách thêm 3 cái vào giỏ và đặt hàng thành công tại `/checkout`.<br>3. Kiểm tra lại thông số tồn kho của SP A. | Đặt mua 3 sản phẩm A | Đơn hàng tạo thành công; tồn kho SP A tự động giảm từ 18 xuống đúng 15 cái trên toàn hệ thống (cả Client lẫn Admin). | [x] PASS<br>[ ] FAIL |
| **TC-STOCK-02** | Tự động hoàn lại tồn kho khi đơn bị hủy (Cancelled) | 1. Đơn hàng vừa tạo ở TC-STOCK-01 có 3 SP A.<br>2. Tại `/admin/orders`, chuyển trạng thái đơn hàng sang `Cancelled`.<br>3. Kiểm tra lại tồn kho SP A. | Chuyển trạng thái: `Cancelled` | Hệ thống tự động kích hoạt hoàn kho: Tồn kho SP A được cộng bù lại +3 cái, phục hồi chính xác về 18 cái ban đầu. | [x] PASS<br>[ ] FAIL |
| **TC-STOCK-03** | Khống chế số lượng mua tối đa bằng tồn kho khả dụng | 1. Mở trang chi tiết SP có tồn kho = 4 cái.<br>2. Bấm nút `[+]` liên tục để tăng số lượng. | Click nút `+` nhiều lần | Khi số lượng đạt 4, nút `[+]` tự động bị vô hiệu hóa (disabled), ngăn chặn khách đặt vượt quá 4 sản phẩm còn lại trong kho. | [x] PASS<br>[ ] FAIL |
| **TC-STOCK-04** | Nhận diện & Khóa đặt hàng khi sản phẩm hết hàng (Out of Stock) | 1. Chọn sản phẩm có tồn kho = 0.<br>2. Quan sát thẻ sản phẩm trên Shop và trang chi tiết `/product/:id`.<br>3. Thử thao tác đặt hàng. | Sản phẩm có `stock: 0` | Thẻ sản phẩm hiển thị nhãn đỏ `SOLD OUT`; nút Quick Add bị vô hiệu hóa; Trang chi tiết hiển thị `HẾT HÀNG (OUT OF STOCK)`, nút `ADD TO BAG` đổi thành `OUT OF STOCK` và không thể click. | [x] PASS<br>[ ] FAIL |
| **TC-STOCK-05** | Quản trị và giám sát tồn kho tại Admin Products | 1. Truy cập `/admin/products`.<br>2. Quan sát cột "Tồn Kho" và mở modal Sửa sản phẩm.<br>3. Chỉnh sửa số lượng tồn kho và bấm Lưu. | Nhập số lượng mới $\ge 0$ | Cột tồn kho hiển thị badge trạng thái màu chuẩn (>10 xanh lá, 1-10 vàng cam, 0 đỏ); sau khi sửa giá trị tồn kho mới được lưu bền vững vào `localStorage`. | [x] PASS<br>[ ] FAIL |

| **TC-LANG-01** | Chuyển đổi song ngữ Anh - Việt tức thời (Zero-reload Switcher) | 1. Tại Header máy tính hoặc Mobile Menu, bấm chọn nút `VI` hoặc `EN`.<br>2. Quan sát thanh Navbar, giỏ hàng, trang Shop, trang Chi tiết và Footer. | Thao tác toggle `VI \| EN` | Toàn bộ nhãn danh mục, giỏ hàng, thanh toán, nút bấm, badge và mô tả trang lập tức chuyển sang ngôn ngữ đã chọn mượt mà không cần tải lại trang. | [x] PASS<br>[ ] FAIL |
| **TC-LANG-02** | Lưu trữ tùy chọn ngôn ngữ bền vững (`localStorage`) | 1. Chuyển ngôn ngữ sang `VI`.<br>2. Nhấn `F5` tải lại trang web hoặc mở tab mới. | Tải lại trang (F5) | Hệ thống đọc khóa `lune_language` và tiếp tục duy trì trạng thái Tiếng Việt, không bị reset về ngôn ngữ mặc định. | [x] PASS<br>[ ] FAIL |
| **TC-LANG-03** | Bản địa hóa động Tên & Mô tả sản phẩm (`tp()`) | 1. Đang ở tiếng Việt, xem sản phẩm 1: *"Áo Sơ Mi Lụa Cổ Điển"*, mô tả tiếng Việt.<br>2. Chuyển ngôn ngữ sang `EN`. | Toggle sang `EN` | Tên đổi thành *"Classic Silk Minimal Shirt"*, mô tả đổi sang tiếng Anh chuẩn xác; ID sản phẩm và giỏ hàng không bị ảnh hưởng. | [x] PASS<br>[ ] FAIL |
| **TC-LANG-04** | Bản địa hóa Hóa đơn Boutique & Định dạng ngày tháng (`InvoiceModal`) | 1. Mở modal in hóa đơn tại Order Success hoặc My Orders.<br>2. Chuyển đổi qua lại giữa `VI` và `EN`. | Toggle ngôn ngữ | Tiêu đề hóa đơn, địa chỉ xưởng may, bảng kê hàng hóa, chữ ký và định dạng ngày phát hành tự động thích ứng chuẩn (`vi-VN` vs `en-US`). | [x] PASS<br>[ ] FAIL |
| **TC-LANG-05** | Bản địa hóa Đánh giá & Modal nhận xét (`ReviewModal`) | 1. Tại trang chi tiết sản phẩm hoặc My Orders, mở modal Viết đánh giá.<br>2. Quan sát nhãn số sao (1-5 sao), tiêu đề, placeholder và thông báo xác thực. | Đánh giá sản phẩm trên 2 ngôn ngữ | Nhãn mức độ hài lòng (1 sao đến 5 sao: Cần Cải Thiện -> Xuất Sắc / Needs Improvement -> Exceptional), placeholder và thông báo thành công hiển thị đúng ngôn ngữ tương ứng. | [x] PASS<br>[ ] FAIL |
| **TC-LANG-06** | Bản địa hóa Xác thực (Login, Register) & Hồ sơ cá nhân (Profile 5 Tabs) | 1. Mở trang `/login`, `/register` và `/profile`.<br>2. Chuyển đổi ngôn ngữ `VI` và `EN`. | Toggle ngôn ngữ | Toàn bộ form đăng nhập, gợi ý tài khoản mẫu, modal Đặt lại mật khẩu, form đăng ký, thước đo độ mạnh mật khẩu, checklist bảo mật, modal Điều khoản hội viên, và toàn bộ 5 tab Profile (Đơn hàng, Thông tin, Đổi mật khẩu, Sổ địa chỉ, Yêu thích) hiển thị chuẩn xác 100% không còn chuỗi tiếng Anh cứng. | [x] PASS<br>[ ] FAIL |
| **TC-LANG-07** | Bản địa hóa Toàn diện Phân hệ Quản trị viên (Admin Portal 100% i18n) | 1. Đăng nhập tài khoản Admin, truy cập `/admin`.<br>2. Nhấp bộ nút chuyển ngữ `VI \| EN` trên Admin Topbar.<br>3. Kiểm tra lần lượt các trang: Dashboard, Products, Orders, Users. | Toggle `VI \| EN` trên Admin Topbar | Toàn bộ thanh Sidebar, các thẻ KPI, tiêu đề trang, thanh tìm kiếm nội bộ, tiêu đề cột bảng dữ liệu, badge trạng thái tồn kho, modal Thêm/Sửa sản phẩm, xác nhận xóa sản phẩm và thông báo toast chuyển đổi mượt mà giữa tiếng Việt và tiếng Anh 100%, không cần reload trang. | [x] PASS<br>[ ] FAIL |
---

### 👤 TEST SUITE 3: CHI TIẾT SẢN PHẨM, BIẾN THỂ & YÊU THÍCH (PHỤ TRÁCH: TV3)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-PROD-01** | Đọc dữ liệu chi tiết theo đường dẫn ID | 1. Nhấp vào sản phẩm có ID là 2.<br>2. Quan sát URL và nội dung trang. | URL: `/product/2` | Trang hiển thị đúng tên, đúng giá, đúng danh mục và đúng mô tả của sản phẩm mang ID số 2. | [ ] PASS<br>[ ] FAIL |
| **TC-PROD-02** | Chuyển đổi bộ sưu tập ảnh (Thumbnail Switcher) | 1. Tại trang chi tiết, bấm vào từng ảnh phụ thu nhỏ (thumbnail). | Click ảnh phụ 1, 2, 3 | Ảnh lớn trung tâm lập tức đổi sang góc chụp tương ứng với thumbnail vừa bấm. | [ ] PASS<br>[ ] FAIL |
| **TC-PROD-03** | Lựa chọn biến thể Size và Màu sắc | 1. Nhấp chọn Size `L`.<br>2. Nhấp chọn Màu `Beige`. | Chọn Size L, Màu Beige | Nút Size L và nút màu Beige đổi sang trạng thái được chọn (có viền đen đậm bao quanh). | [ ] PASS<br>[ ] FAIL |
| **TC-PROD-04** | Tăng giảm số lượng sản phẩm | 1. Bấm nút `[+]` 3 lần.<br>2. Bấm nút `[-]` 1 lần.<br>3. Cố tình bấm giảm khi số lượng đang là 1. | Thao tác nút `+` và `-` | Số lượng hiển thị tăng lên 4, sau đó giảm về 3; khi đang là 1 thì nút `[-]` bị vô hiệu hóa, không bao giờ để số lượng về 0 hoặc số âm. | [ ] PASS<br>[ ] FAIL |
| **TC-PROD-05** | Bật cửa sổ xem nhanh (Quick View Modal) | 1. Tại trang danh sách, rê chuột vào thẻ sản phẩm và bấm "Quick View". | Click nút Quick View | Modal hiện lên ngay giữa màn hình với đầy đủ ảnh, tên, giá, nút chọn Size/Màu; bấm nút `[X]` hoặc click ra ngoài nền mờ thì modal đóng lại. | [ ] PASS<br>[ ] FAIL |
| **TC-PROD-06** | Bật bảng tra cứu kích cỡ (Size Guide Modal) | 1. Tại trang chi tiết, bấm vào dòng chữ *"Hướng dẫn chọn size"*. | Click Size Guide | Bảng thông số chiều cao, cân nặng và số đo các vòng hiện lên rõ ràng, dễ đối soát. | [ ] PASS<br>[ ] FAIL |
| **TC-WISH-01** | Thao tác 1-Click Toggle Wishlist & Thông báo nổi (Instant Toggle & WishlistToast) | 1. Bấm icon Trái tim trên thẻ sản phẩm hoặc trang chi tiết.<br>2. Quan sát icon, số đếm Navbar và Toast thông báo.<br>3. Bấm lại icon Trái tim lần thứ hai. | 2 lần Click icon Tim | Lần 1: Icon chuyển ngay sang màu đỏ ruby, số đếm trên Navbar tăng +1 tức thì; Thông báo nổi (`WishlistToast`) hiện ở góc phải dưới xác nhận đã thêm mà không hề chặn màn hình;<br>Lần 2: Icon trở về viền nâu mờ, số đếm Navbar giảm -1, Toast xác nhận đã gỡ khỏi danh sách. | [x] PASS<br>[ ] FAIL |
| **TC-WISH-02** | Chuyển hàng từ Wishlist vào Giỏ ("Move to Bag") | 1. Truy cập trang `/wishlist`.<br>2. Bấm nút "Move to Bag" tại một sản phẩm. | Click Move to Bag | Món đồ được thêm thành công vào Giỏ hàng; ngăn kéo Cart Drawer tự động trượt ra; sản phẩm vẫn được giữ trong danh sách yêu thích. | [x] PASS<br>[ ] FAIL |
| **TC-WISH-03** | Trải nghiệm Khách vãng lai & Tự động gộp dữ liệu (Guest Lookbook & Auto-merge) | 1. Chưa đăng nhập (Guest), bấm icon Trái tim ở các sản phẩm.<br>2. Vào xem trang `/wishlist` ở chế độ Guest.<br>3. Bấm "SIGN IN TO SYNC" trên banner hoặc đăng nhập tại `/login`.<br>4. Kiểm tra lại danh sách Wishlist của tài khoản sau khi đăng nhập. | Thả tim khi chưa đăng nhập & Đăng nhập tài khoản | Bước 1 & 2: Thao tác 1-click mượt mà, lưu vào bộ nhớ tạm khách (`lune_wishlist`), Toast hiện lời nhắc đồng bộ tinh tế. Khách vẫn xem được Lookbook cá nhân tại `/wishlist` kèm thanh thông báo đồng bộ không chặn (Non-blocking Sync Banner);<br>Bước 3 & 4: Đăng nhập thành công, hệ thống tự động gộp (merge) danh sách khách vào tài khoản cá nhân (`lune_wishlist_${email}`) không trùng lặp, chuyển trang tức thì mượt mà. | [x] PASS<br>[ ] FAIL |

---

### 👤 TEST SUITE 4: GIỎ HÀNG, THANH TOÁN & ĐẶT HÀNG (PHỤ TRÁCH: TV4)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
<<<<<<< HEAD
| **TC-CART-01** | Bật mở ngăn kéo Giỏ hàng trượt | 1. Bấm biểu tượng Giỏ hàng trên Navbar.<br>2. Hoặc bấm "Add to Bag" tại một sản phẩm. | Click mở giỏ hàng | Ngăn kéo Cart Drawer trượt mượt mà từ mép phải màn hình; lớp nền tối làm mờ phía sau. | [ ] PASS<br>[ ] FAIL |
| **TC-CART-02** | Quy tắc gộp biến thể giỏ hàng | 1. Chọn Áo A, Size M, Màu Đen $\rightarrow$ Bấm Add to Bag (SL: 1).<br>2. Tiếp tục chọn Áo A, Size M, Màu Đen $\rightarrow$ Bấm Add to Bag (SL: 1).<br>3. Chọn Áo A, Size L, Màu Trắng $\rightarrow$ Bấm Add to Bag. | Cùng biến thể và khác biến thể | Giỏ hàng chỉ có **2 dòng sản phẩm**: Dòng 1 (Size M, Màu Đen) tự tăng số lượng thành **2**; Dòng 2 (Size L, Màu Trắng) là một dòng riêng có số lượng 1. | [ ] PASS<br>[ ] FAIL |
| **TC-CART-03** | Tăng giảm & Xóa món đồ trong ngăn kéo | 1. Bấm nút `[+]` tại dòng sản phẩm trong giỏ.<br>2. Bấm biểu tượng Thùng rác (Xóa). | Click nút tăng và xóa | Số lượng tăng ngay, tổng tiền tự động tính lại; khi bấm thùng rác món hàng biến mất khỏi giỏ ngay lập tức. | [ ] PASS<br>[ ] FAIL |
| **TC-CART-04** | Thanh tiến độ Miễn phí Vận chuyển | 1. Thêm sản phẩm có tổng tiền $140.<br>2. Thêm tiếp sản phẩm để tổng tiền đạt $210. | Mức tiền: $140 và $210 | Ở mức $140: Thanh đo hiển thị dòng chữ *"Mua thêm $60 để được Free Shipping"*; Khi đạt $210: Thanh đo đầy 100% kèm chữ chúc mừng *"Bạn đã được Miễn phí Vận chuyển!"*. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-01** | Tính toán chi phí đơn hàng tại Checkout | 1. Giỏ hàng có tổng tiền $150.<br>2. Bấm chuyển sang trang `/checkout`. | Đơn hàng $150 | Cột tóm tắt hiển thị: Tạm tính: `$150`, Phí vận chuyển: `$15`, Tổng thanh toán: `$165`. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-02** | Chọn voucher hợp lệ | 1. Tại checkout, chọn `LUNE10` trong danh sách voucher.<br>2. Kiểm tra tóm tắt đơn hàng. | Tạm tính `$150`, voucher `LUNE10` giảm 10% | Voucher được áp dụng; dòng chiết khấu là `$15`; tổng thanh toán sau phí ship `$15` là `$150`; đơn hàng lưu mã `LUNE10`. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-03** | Chỉ hiển thị voucher đủ điều kiện | 1. Tạo voucher có đơn tối thiểu `$200` và một voucher đã hết hạn.<br>2. Mở checkout với giỏ hàng `$150`. | Voucher tối thiểu `$200`; voucher hết hạn | Hai voucher không xuất hiện trong danh sách chọn; voucher không hợp lệ không làm thay đổi tổng tiền. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-04** | Xác thực biểu mẫu thông tin giao hàng | 1. Để trống toàn bộ ô và bấm "Place Order".<br>2. Nhập số điện thoại chữ: `"abcxyz"`. | Bỏ trống / Sai định dạng | Các ô bắt buộc chuyển viền đỏ, hiển thị lỗi yêu cầu nhập đầy đủ; chặn không cho tiến hành đặt hàng. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-05** | Hoàn tất đặt hàng & Dọn sạch giỏ | 1. Điền đầy đủ thông tin hợp lệ.<br>2. Chọn thanh toán COD.<br>3. Bấm "Place Order". | Dữ liệu hợp lệ | Chuyển ngay sang trang `/order-success`; hiển thị mã đơn dạng `LUNE-XXXX`; giỏ hàng được xóa rỗng hoàn toàn về 0 món. | [ ] PASS<br>[ ] FAIL |
=======
| **TC-CART-01** | Bật mở ngăn kéo Giỏ hàng trượt | 1. Bấm biểu tượng Giỏ hàng trên Navbar.<br>2. Hoặc bấm "Add to Bag" tại một sản phẩm. | Click mở giỏ hàng | Ngăn kéo Cart Drawer trượt mượt mà từ mép phải màn hình; lớp nền tối làm mờ phía sau. | [x] PASS<br>[ ] FAIL |
| **TC-CART-02** | Quy tắc gộp biến thể giỏ hàng | 1. Chọn Áo A, Size M, Màu Đen $\rightarrow$ Bấm Add to Bag (SL: 1).<br>2. Tiếp tục chọn Áo A, Size M, Màu Đen $\rightarrow$ Bấm Add to Bag (SL: 1).<br>3. Chọn Áo A, Size L, Màu Trắng $\rightarrow$ Bấm Add to Bag. | Cùng biến thể và khác biến thể | Giỏ hàng chỉ có **2 dòng sản phẩm**: Dòng 1 (Size M, Màu Đen) tự tăng số lượng thành **2**; Dòng 2 (Size L, Màu Trắng) là một dòng riêng có số lượng 1. | [x] PASS<br>[ ] FAIL |
| **TC-CART-03** | Tăng giảm & Xóa món đồ trong ngăn kéo | 1. Bấm nút `[+]` tại dòng sản phẩm trong giỏ.<br>2. Bấm biểu tượng Thùng rác (Xóa). | Click nút tăng và xóa | Số lượng tăng ngay, tổng tiền tự động tính lại; khi bấm thùng rác món hàng biến mất khỏi giỏ ngay lập tức. | [x] PASS<br>[ ] FAIL |
| **TC-CART-04** | Thanh tiến độ Miễn phí Vận chuyển | 1. Thêm sản phẩm có tổng tiền $140.<br>2. Thêm tiếp sản phẩm để tổng tiền đạt $210. | Mức tiền: $140 và $210 | Ở mức $140: Thanh đo hiển thị dòng chữ *"Mua thêm $60 để được Free Shipping"*; Khi đạt $210: Thanh đo đầy 100% kèm chữ chúc mừng *"Bạn đã được Miễn phí Vận chuyển!"*. | [x] PASS<br>[ ] FAIL |
| **TC-CHK-01** | Tính toán chi phí đơn hàng tại Checkout | 1. Giỏ hàng có tổng tiền $150.<br>2. Bấm chuyển sang trang `/checkout`. | Đơn hàng $150 | Cột tóm tắt hiển thị: Tạm tính: `$150`, Phí vận chuyển: `$15`, Tổng thanh toán: `$165`. | [x] PASS<br>[ ] FAIL |
| **TC-CHK-02** | Áp dụng Mã giảm giá (Promo Code) | 1. Tại trang checkout, nhập mã `LUNE10` vào ô khuyến mãi.<br>2. Bấm nút "Áp dụng". | Mã: `LUNE10` | Hiển thị thông báo mã hợp lệ; xuất hiện dòng chiết khấu giảm 10% (trừ $15); tổng thanh toán được tính lại chính xác: `$150` | [x] PASS<br>[ ] FAIL |
| **TC-CHK-03** | Báo lỗi mã giảm giá sai | 1. Nhập mã linh tinh: `GIAM50`.<br>2. Bấm Áp dụng. | Mã: `GIAM50` | Báo lỗi màu đỏ: *"Mã khuyến mại không hợp lệ hoặc đã hết hạn"*; tiền thanh toán không bị thay đổi. | [x] PASS<br>[ ] FAIL |
| **TC-CHK-04** | Xác thực biểu mẫu thông tin giao hàng | 1. Để trống toàn bộ ô và bấm "Place Order".<br>2. Nhập số điện thoại chữ: `"abcxyz"`. | Bỏ trống / Sai định dạng | Các ô bắt buộc chuyển viền đỏ, hiển thị lỗi yêu cầu nhập đầy đủ; chặn không cho tiến hành đặt hàng. | [x] PASS<br>[ ] FAIL |
| **TC-CHK-05** | Hoàn tất đặt hàng & Dọn sạch giỏ | 1. Điền đầy đủ thông tin hợp lệ.<br>2. Chọn thanh toán COD.<br>3. Bấm "Place Order". | Dữ liệu hợp lệ | Chuyển ngay sang trang `/order-success`; hiển thị mã đơn dạng `LUNE-XXXX`; giỏ hàng được xóa rỗng hoàn toàn về 0 món. | [x] PASS<br>[ ] FAIL |
>>>>>>> dd6537150711d01c057db8227186955ea585ccac

---

### 👤 TEST SUITE 5: XÁC THỰC, BẢO VỆ ĐƯỜNG DẪN & HỒ SƠ ĐƠN MUA (PHỤ TRÁCH: TV5)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-AUTH-01** | Đăng ký tài khoản thành viên mới | 1. Vào `/register`.<br>2. Nhập: Tên, Email mới, Mật khẩu: `"123456"`, Xác nhận MK: `"123456"`.<br>3. Bấm "Đăng ký". | Dữ liệu hợp lệ | Thông báo tạo tài khoản thành công; tự động điều hướng sang trang Đăng nhập `/login`. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-02** | Báo lỗi khi mật khẩu nhập lại không khớp | 1. Nhập Mật khẩu: `"123456"`.<br>2. Nhập Xác nhận MK: `"654321"`. | Hai mật khẩu lệch nhau | Báo lỗi rõ ràng: *"Mật khẩu xác nhận không khớp"*; nút đăng ký bị chặn. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-03** | Báo lỗi đăng ký email đã tồn tại | 1. Đăng ký với một email đã có sẵn trong danh sách người dùng. | Email trùng lặp | Báo lỗi: *"Email này đã được sử dụng bởi một tài khoản khác"*. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-04** | Đăng nhập tài khoản thất bại | 1. Nhập sai email hoặc sai mật khẩu.<br>2. Bấm "Đăng nhập". | Mật khẩu sai | Báo lỗi màu đỏ: *"Email hoặc mật khẩu không chính xác"*; không tạo phiên đăng nhập. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-05** | Đăng nhập thành công tài khoản thường | 1. Nhập đúng tài khoản khách hàng.<br>2. Bấm "Đăng nhập". | Tài khoản `role: user` | Đăng nhập thành công; Navbar đổi icon tài khoản thành Tên người dùng; chuyển hướng về Trang chủ. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-06** | Đăng nhập tài khoản Quản trị viên | 1. Nhập tài khoản admin (`admin@lune.com`).<br>2. Nhập mật khẩu: `"Admin@123"` (hoặc `"admin123"`).<br>3. Bấm "Đăng nhập". | Mật khẩu chuẩn `Admin@123` hoặc `admin123` | Đăng nhập thành công; hệ thống tự động chuyển thẳng vào trang Quản trị `/admin`. | [x] PASS<br>[ ] FAIL |
| **TC-AUTH-07** | Đăng xuất an toàn | 1. Bấm vào menu tài khoản trên Navbar.<br>2. Bấm nút "Đăng xuất". | Click Đăng xuất | Xóa phiên đăng nhập hiện tại; Navbar trở về trạng thái Khách vãng lai; điều hướng an toàn về `/`. | [ ] PASS<br>[ ] FAIL |
| **TC-GUARD-01**| Bảo vệ đường dẫn Hồ sơ (`/profile`) | 1. Khi CHƯA đăng nhập, gõ trực tiếp URL `/profile` trên trình duyệt. | Khách chưa đăng nhập | Bộ bảo vệ (ProtectedRoute) phát hiện chưa đăng nhập, tự động chặn lại và đá văng về trang `/login`. | [ ] PASS<br>[ ] FAIL |
| **TC-PROF-01** | Xem danh sách đơn hàng đã mua (My Orders)| 1. Đăng nhập tài khoản đã từng mua hàng.<br>2. Vào `/profile` -> Tab "Đơn hàng của tôi". | Tài khoản có lịch sử mua | Hiển thị chính xác các đơn hàng của tài khoản này, gồm mã `LUNE-XXXX`, ngày mua, tổng tiền và nhãn trạng thái có màu sắc chuẩn. | [ ] PASS<br>[ ] FAIL |
| **TC-PROF-02** | Quản lý Sổ địa chỉ nhận hàng (Address Book) | 1. Tại `/profile`, chọn Tab "Address Book".<br>2. Bấm "Add Destination", điền nhãn, tên, SĐT, địa chỉ.<br>3. Bấm "Set as Default". | Thông tin địa chỉ mới | Thẻ địa chỉ mới xuất hiện ngay; địa chỉ mặc định được gắn nhãn badge "DEFAULT DESTINATION" màu đồng ấm; tự động đồng bộ vào thông tin giao hàng cá nhân. | [x] PASS<br>[ ] FAIL |
| **TC-PROF-03** | Tích hợp Danh sách yêu thích (Saved Wishlist)| 1. Thả tim 1 sản phẩm ngoài trang Shop.<br>2. Vào `/profile`, chọn Tab "Saved Wishlist".<br>3. Bấm nút "Add to Bag" hoặc bấm "Open Dedicated Page". | Thao tác trên tab Wishlist | Hiển thị đúng số lượng món đã lưu; bấm "Add to Bag" đưa ngay sản phẩm vào giỏ; bấm liên kết sẽ chuyển mượt mà sang trang Wishlist chuyên biệt của TV3. | [x] PASS<br>[ ] FAIL |
| **TC-PROF-04** | Đăng xuất nhanh từ Sidebar Profile | 1. Tại thanh menu bên trái Profile, bấm nút "Sign Out Account" màu đỏ thanh lịch. | Click nút Sign Out | Xóa phiên đăng nhập ngay lập tức; điều hướng an toàn về Trang chủ; thanh Header cập nhật lại trạng thái khách vãng lai. | [x] PASS<br>[ ] FAIL |
| **TC-PROF-05** | Nhận diện Huy hiệu hạng thành viên (Tier Badge) | 1. Đăng nhập tài khoản thường và tài khoản Admin.<br>2. Quan sát khung thẻ người dùng bên trái Profile. | Tài khoản đăng nhập | Dưới ảnh đại diện hiển thị huy hiệu chuẩn sang trọng: `ATELIER GOLD VIP` đối với khách hàng và `ATELIER AMBASSADOR` đối với Quản trị viên. | [x] PASS<br>[ ] FAIL |
| **TC-PROF-06** | Đổi mật khẩu độc lập (Password & Security Tab) | 1. Tại `/profile`, chọn Tab riêng "Password & Security".<br>2. Nhập mật khẩu hiện tại, mật khẩu mới $\ge 6$ ký tự, xác nhận mật khẩu.<br>3. Bấm "Update Password". | Dữ liệu mật khẩu hợp lệ | Hiển thị thông báo màu xanh "Password changed successfully!"; mật khẩu mới được lưu bền vững; đăng xuất và đăng nhập lại bằng mật khẩu mới thành công. | [x] PASS<br>[ ] FAIL |

---

### 👤 TEST SUITE 6: CỔNG QUẢN TRỊ ADMIN, SẢN PHẨM & VOUCHER (PHỤ TRÁCH: TV6)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-ADGUARD-01**| Chặn người dùng thường truy cập `/admin` | 1. Đăng nhập tài khoản thường (`role: user`).<br>2. Cố tình gõ đường dẫn `/admin` trên thanh địa chỉ. | Quyền User thông thường | Hệ thống từ chối truy cập, tự động chuyển hướng về trang chủ hoặc thông báo không đủ quyền. | [ ] PASS<br>[ ] FAIL |
| **TC-DASH-01** | Tính toán chính xác 4 chỉ số KPI | 1. Đăng nhập quyền Admin, vào `/admin`.<br>2. Kiểm tra số liệu 4 thẻ KPI. | Dữ liệu hệ thống | Số liệu hiển thị khớp 100%: Tổng doanh thu = Tổng tiền các đơn không bị hủy; Tổng đơn = Số đơn hiện có; Tổng sản phẩm & Tổng thành viên chuẩn xác. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-01** | Xem danh sách sản phẩm kho (Read) | 1. Vào `/admin/products`.<br>2. Gõ tên sản phẩm vào ô tìm kiếm bảng. | Tìm kiếm nội bộ | Bảng hiển thị đầy đủ ảnh thu nhỏ, tên, giá, danh mục; ô tìm kiếm lọc sản phẩm tức thì. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-02** | Thêm sản phẩm mới thành công (Create) | 1. Bấm "Thêm sản phẩm mới".<br>2. Điền: Tên: `"Lune Velvet Coat"`, Giá: `220`, Danh mục: `women`, Link ảnh chuẩn, Size, Màu.<br>3. Bấm "Lưu". | Dữ liệu sản phẩm mới | Sản phẩm xuất hiện ngay trong bảng Admin; mở tab mới ra trang `/shop` thấy sản phẩm mới có mặt ngay lập tức. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-03** | Chặn lưu khi biểu mẫu thêm sản phẩm bị bỏ trống | 1. Mở modal thêm mới, để trống Tên hoặc Giá.<br>2. Bấm "Lưu". | Bỏ trống trường bắt buộc | Hiển thị cảnh báo lỗi viền đỏ; không cho phép thêm vào danh sách kho. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-04** | Chỉnh sửa thông tin sản phẩm (Update) | 1. Tại dòng sản phẩm vừa thêm, bấm nút "Sửa".<br>2. Đổi giá từ `220` thành `195`, sửa lại tên.<br>3. Bấm "Cập nhật". | Sửa đổi giá và tên | Dữ liệu trong bảng cập nhật ngay giá mới `195`; ra ngoài trang Shop kiểm tra thấy giá đã đổi thành 195. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-05** | Xóa sản phẩm có hộp thoại xác nhận (Delete)| 1. Bấm nút "Xóa" tại một sản phẩm.<br>2. Xuất hiện hộp thoại hỏi: *"Bạn có chắc muốn xóa?"*.<br>3. Bấm "Đồng ý". | Xác nhận Xóa | Sản phẩm biến mất hoàn toàn khỏi bảng Admin và biến mất vĩnh viễn khỏi trang `/shop` của khách. | [ ] PASS<br>[ ] FAIL |
| **TC-VCH-01** | Admin tạo voucher phần trăm | 1. Vào `/admin/vouchers`.<br>2. Tạo mã `LUNE15`, giảm 15%, đơn tối thiểu `$100`.<br>3. Lưu và tải lại trang. | Mã mới, giảm 15%, tối thiểu `$100` | Voucher xuất hiện trong danh sách và vẫn còn sau khi tải lại trang; mã được chuẩn hóa chữ hoa. | [ ] PASS<br>[ ] FAIL |
| **TC-VCH-02** | Chặn mã trùng và dữ liệu giảm không hợp lệ | 1. Tạo mã đã tồn tại.<br>2. Thử phần trăm lớn hơn 100 hoặc giá trị giảm không dương. | Mã trùng; phần trăm `101` | Hiển thị lỗi xác thực; không tạo voucher mới. | [ ] PASS<br>[ ] FAIL |
| **TC-VCH-03** | Bật/tắt voucher | 1. Bấm Disable tại voucher đang hoạt động.<br>2. Mở checkout với giỏ hàng đạt điều kiện. | Voucher trạng thái Inactive | Voucher không xuất hiện cho khách; bấm Enable sẽ cho phép hiển thị lại nếu còn hạn và đủ điều kiện. | [ ] PASS<br>[ ] FAIL |
| **TC-VCH-04** | Xóa voucher | 1. Bấm nút xóa tại một voucher.<br>2. Xác nhận hộp thoại. | Voucher đã tạo | Voucher bị xóa khỏi danh sách quản trị và không còn được chọn ở checkout. | [ ] PASS<br>[ ] FAIL |
| **TC-ORD-01** | Cập nhật trạng thái vòng đời đơn hàng | 1. Vào `/admin/orders`.<br>2. Tìm đơn hàng đang có trạng thái `Pending`.<br>3. Bấm chuyển sang `Shipping`, sau đó chuyển sang `Delivered`. | Click đổi trạng thái | Trạng thái đổi màu nhãn ngay lập tức; tài khoản khách đặt đơn đó mở `/profile` thấy đơn của mình đã chuyển sang `Delivered`. | [ ] PASS<br>[ ] FAIL |
| **TC-USER-01** | Xem danh sách người dùng hệ thống | 1. Vào `/admin/users`. | Mở trang | Hiển thị đầy đủ danh sách các tài khoản đã đăng ký, hiển thị rõ vai trò `admin` hoặc `user`. | [ ] PASS<br>[ ] FAIL |

---

### 👤 TEST SUITE 8: HỆ THỐNG ĐÁNH GIÁ SẢN PHẨM, HÓA ĐƠN IN ẤN & THEO DÕI ĐƠN HÀNG (PHỤ TRÁCH: TV1 - LEADER)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-REV-01** | Hiển thị điểm số đánh giá & Phân bổ tỷ lệ sao theo thời gian thực | 1. Vào trang chi tiết sản phẩm bất kỳ.<br>2. Cuộn xuống phần "Client Experiences & Reviews".<br>3. Đối soát điểm trung bình và biểu đồ thanh đo 5 sao. | Xem sản phẩm | Hiển thị điểm số trung bình (ví dụ `4.9 / 5.0`), dải sao vàng đồng, 5 thanh đo tỷ lệ % phân bổ sao chính xác theo số lượng đánh giá thực tế. | [x] PASS<br>[ ] FAIL |
| **TC-REV-02** | Viết đánh giá sản phẩm có chọn sao tương tác (Interactive Stars Picker) | 1. Bấm nút "WRITE AN ATELIER REVIEW".<br>2. Rê chuột qua các ngôi sao để chọn 5 sao.<br>3. Nhập tiêu đề, nhận xét chi tiết, tên khách.<br>4. Bấm "SUBMIT REVIEW". | Chọn 5 sao & Nhập nhận xét | Hiệu ứng rê chuột làm sáng các ngôi sao mượt mà; gửi thành công hiển thị màn hình cảm ơn; bài đánh giá lập tức xuất hiện trong danh sách nhận xét kèm nhãn `✓ VERIFIED CLIENT`; điểm trung bình tự động tính lại. | [x] PASS<br>[ ] FAIL |
| **TC-ORD-TRACK** | Theo dõi hành trình đơn hàng qua thanh Timeline 4 nấc | 1. Tại `OrderSuccessPage` hoặc `ProfilePage` (tab My Orders).<br>2. Quan sát thanh tiến độ 4 nấc.<br>3. Nhờ Admin đổi trạng thái đơn từ "Pending" sang "Shipping" và "Delivered". | Chuyển đổi trạng thái đơn hàng | Thanh tiến trình tự động nhảy nấc tương ứng: nấc hoàn thành đổi màu nâu có dấu check `✓`, nấc hiện tại phát sáng viền nhẹ; nếu đơn bị hủy hiển thị thông báo hủy đơn màu đỏ rõ ràng. | [x] PASS<br>[ ] FAIL |
| **TC-ORD-PRINT** | Xem trước & In Hóa Đơn Boutique cao cấp (`window.print`) | 1. Bấm nút "Print Receipt" tại trang Order Success hoặc "Print Invoice" tại tab My Orders.<br>2. Quan sát Modal xem trước Hóa đơn.<br>3. Bấm "Print / Save PDF". | Click In Hóa Đơn | Modal hiển thị tờ hóa đơn chuẩn thương hiệu LUNE với đầy đủ mã đơn, ngày giờ, thông tin khách, bảng mặt hàng và tổng tiền; hộp thoại in trình duyệt bật mở với định dạng trang in `@media print` sắc nét, không bị vỡ layout web. | [x] PASS<br>[ ] FAIL |

---

### 🌐 TEST SUITE 7: KIỂM THỬ TỔNG THỂ & PHI CHỨC NĂNG (TOÀN NHÓM KIỂM TRA)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Tiêu chí nghiệm thu bắt buộc (Pass Criteria) | Đánh giá |
| :---: | :--- | :--- | :--- | :---: |
| **TC-NON-01** | Kiểm tra lưu trữ bền vững (Reload F5) | Thêm hàng vào giỏ, thả tim 2 sản phẩm, đăng nhập tài khoản $\rightarrow$ Nhấn phím `F5` tải lại trang. | Dữ liệu Giỏ hàng, Wishlist và Phiên đăng nhập vẫn còn nguyên vẹn 100%, không bị biến mất. | [x] PASS<br>[ ] FAIL |
| **TC-NON-02** | Tương thích thiết bị di động (Mobile Responsive) | Nhấn phím `F12`, bật chế độ Device Toolbar giả lập iPhone 14 Pro Max ($393\text{px}$) và iPad ($768\text{px}$). | Toàn bộ giao diện không bị thanh cuộn ngang khó chịu; menu thu vào Hamburger; nút bấm to rõ dễ chạm bằng ngón tay. | [x] PASS<br>[ ] FAIL |
| **TC-NON-03** | Kiểm tra lỗi bảng điều khiển Console | Bấm `F12`, chuyển sang tab **Console**, duyệt qua tất cả các trang từ Trang chủ, Shop, Chi tiết, Giỏ hàng, Admin. | **KHÔNG CÓ BẤT KỲ DÒNG BÁO LỖI ĐỎ NÀO (Zero Runtime Red Errors)** hiển thị tại màn hình Console. | [x] PASS<br>[ ] FAIL |
| **TC-NON-04** | Kiểm tra đóng gói đồ án (`npm run build`) | Mở cửa sổ dòng lệnh tại thư mục dự án, chạy lệnh: `npm run build`. | Quá trình đóng gói hoàn tất thành công trong vài giây, sinh ra thư mục `dist/` mà không vấp bất kỳ lỗi cảnh báo biên dịch nào. | [x] PASS<br>[ ] FAIL |

---

## 🏆 III. BIÊN BẢN NGHIỆM THU CUỐI CÙNG (FINAL SIGN-OFF)

* **Tổng số ca kiểm thử:** 53 Test Cases
* **Số ca Đạt (PASS):** 53 / 53
* **Tỷ lệ hoàn thành:** 100%
* **Xác nhận của Trưởng nhóm (Leader):** ___________________________ (Ký và ghi rõ họ tên)
* **Kết luận:** *Đủ điều kiện đóng gói sản phẩm và báo cáo bảo vệ đồ án FER202 trước hội đồng chấm thi.*
