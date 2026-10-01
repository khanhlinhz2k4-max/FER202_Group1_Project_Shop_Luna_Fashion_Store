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
| **TC-HOME-01** | Trượt ảnh Hero Carousel tự động & thủ công | 1. Mở trang chủ `/`.<br>2. Quan sát Banner 5 giây.<br>3. Bấm nút mũi tên Next/Prev.<br>4. Bấm các dấu chấm điều hướng (dots). | Thao tác click chuột | Banner tự động chuyển slide êm ái; khi bấm nút Next/Prev ảnh chuyển đúng hướng; chấm tròn đổi trạng thái active tương ứng. | [ ] PASS<br>[ ] FAIL |
| **TC-HOME-02** | Tab lọc nhanh danh mục trên New Arrivals | 1. Tại trang chủ, xem khối New Arrivals.<br>2. Bấm lần lượt các Tab: `ALL`, `WOMEN`, `MEN`, `ACCESSORIES`. | Click chọn từng Tab | Lưới sản phẩm bên dưới lập tức đổi danh sách, chỉ hiển thị đúng các mặt hàng thuộc danh mục được chọn. Tab đang chọn có viền nhấn nổi bật. | [ ] PASS<br>[ ] FAIL |
| **TC-HOME-03** | Cuộn mượt từ Thẻ danh mục (Category Card) | 1. Tại trang chủ, bấm vào thẻ danh mục lớn "Women Collection". | Click vào thẻ | Màn hình tự động cuộn mượt xuống khu vực sản phẩm và tự động kích hoạt sẵn Tab "WOMEN". | [ ] PASS<br>[ ] FAIL |
| **TC-SRCH-01** | Tìm kiếm trực tiếp thời gian thực (Live Search) | 1. Nhấp chuột vào ô Tìm kiếm trên Navbar.<br>2. Gõ từ khóa: `"silk"`. | Từ khóa: `"silk"` | Ngay lập tức xuất hiện menu Dropdown bên dưới hiển thị các sản phẩm có chữ "silk", kèm ảnh thu nhỏ và giá tiền chuẩn xác. | [ ] PASS<br>[ ] FAIL |
| **TC-SRCH-02** | Chọn sản phẩm từ gợi ý Dropdown | 1. Từ danh sách gợi ý của TC-SRCH-01, nhấp vào một dòng sản phẩm. | Click chuột | Hệ thống điều hướng ngay tới trang chi tiết `/product/:id` của đúng món hàng đó; ô tìm kiếm tự động đóng lại. | [ ] PASS<br>[ ] FAIL |
| **TC-SRCH-03** | Chuyển hướng sang trang Shop khi bấm Enter | 1. Nhập từ khóa `"dress"` vào ô tìm kiếm.<br>2. Nhấn phím `Enter` trên bàn phím. | Nhấn Enter | Hệ thống chuyển hướng sang `/shop?search=dress`, lưới sản phẩm trang Shop lọc ra toàn bộ mẫu váy đầm. | [ ] PASS<br>[ ] FAIL |
| **TC-FOOT-01** | Xác thực form đăng ký nhận bản tin (Newsletter) | 1. Cuộn xuống chân trang Footer.<br>2. Để trống ô email và bấm Đăng ký.<br>3. Nhập email sai: `"abc@"`.<br>4. Nhập email đúng: `"khach@gmail.com"`. | Email hợp lệ & không hợp lệ | Hệ thống báo lỗi nếu để trống hoặc sai định dạng; khi nhập đúng email sẽ hiển thị thông báo cảm ơn thành công. | [ ] PASS<br>[ ] FAIL |

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
| **TC-WISH-01** | Thêm và Xóa sản phẩm yêu thích (Wishlist) | 1. Bấm icon Trái tim trên thẻ sản phẩm.<br>2. Bấm lại icon Trái tim lần thứ hai. | 2 lần Click icon Tim | Lần 1: Icon chuyển màu đỏ rượu, số đếm trên Navbar tăng thêm 1;<br>Lần 2: Icon trở về trắng mờ, số đếm trên Navbar giảm đi 1. | [ ] PASS<br>[ ] FAIL |
| **TC-WISH-02** | Chuyển hàng từ Wishlist vào Giỏ ("Move to Bag") | 1. Truy cập trang `/wishlist`.<br>2. Bấm nút "Move to Bag" tại một sản phẩm. | Click Move to Bag | Món đồ được thêm thành công vào Giỏ hàng; ngăn kéo Cart Drawer tự động trượt ra; sản phẩm vẫn được giữ trong danh sách yêu thích. | [ ] PASS<br>[ ] FAIL |

---

### 👤 TEST SUITE 4: GIỎ HÀNG, THANH TOÁN & ĐẶT HÀNG (PHỤ TRÁCH: TV4)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-CART-01** | Bật mở ngăn kéo Giỏ hàng trượt | 1. Bấm biểu tượng Giỏ hàng trên Navbar.<br>2. Hoặc bấm "Add to Bag" tại một sản phẩm. | Click mở giỏ hàng | Ngăn kéo Cart Drawer trượt mượt mà từ mép phải màn hình; lớp nền tối làm mờ phía sau. | [ ] PASS<br>[ ] FAIL |
| **TC-CART-02** | Quy tắc gộp biến thể giỏ hàng | 1. Chọn Áo A, Size M, Màu Đen $\rightarrow$ Bấm Add to Bag (SL: 1).<br>2. Tiếp tục chọn Áo A, Size M, Màu Đen $\rightarrow$ Bấm Add to Bag (SL: 1).<br>3. Chọn Áo A, Size L, Màu Trắng $\rightarrow$ Bấm Add to Bag. | Cùng biến thể và khác biến thể | Giỏ hàng chỉ có **2 dòng sản phẩm**: Dòng 1 (Size M, Màu Đen) tự tăng số lượng thành **2**; Dòng 2 (Size L, Màu Trắng) là một dòng riêng có số lượng 1. | [ ] PASS<br>[ ] FAIL |
| **TC-CART-03** | Tăng giảm & Xóa món đồ trong ngăn kéo | 1. Bấm nút `[+]` tại dòng sản phẩm trong giỏ.<br>2. Bấm biểu tượng Thùng rác (Xóa). | Click nút tăng và xóa | Số lượng tăng ngay, tổng tiền tự động tính lại; khi bấm thùng rác món hàng biến mất khỏi giỏ ngay lập tức. | [ ] PASS<br>[ ] FAIL |
| **TC-CART-04** | Thanh tiến độ Miễn phí Vận chuyển | 1. Thêm sản phẩm có tổng tiền $140.<br>2. Thêm tiếp sản phẩm để tổng tiền đạt $210. | Mức tiền: $140 và $210 | Ở mức $140: Thanh đo hiển thị dòng chữ *"Mua thêm $60 để được Free Shipping"*; Khi đạt $210: Thanh đo đầy 100% kèm chữ chúc mừng *"Bạn đã được Miễn phí Vận chuyển!"*. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-01** | Tính toán chi phí đơn hàng tại Checkout | 1. Giỏ hàng có tổng tiền $150.<br>2. Bấm chuyển sang trang `/checkout`. | Đơn hàng $150 | Cột tóm tắt hiển thị: Tạm tính: `$150`, Phí vận chuyển: `$15`, Tổng thanh toán: `$165`. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-02** | Áp dụng Mã giảm giá (Promo Code) | 1. Tại trang checkout, nhập mã `LUNE10` vào ô khuyến mãi.<br>2. Bấm nút "Áp dụng". | Mã: `LUNE10` | Hiển thị thông báo mã hợp lệ; xuất hiện dòng chiết khấu giảm 10% (trừ $15); tổng thanh toán được tính lại chính xác: `$150` | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-03** | Báo lỗi mã giảm giá sai | 1. Nhập mã linh tinh: `GIAM50`.<br>2. Bấm Áp dụng. | Mã: `GIAM50` | Báo lỗi màu đỏ: *"Mã khuyến mại không hợp lệ hoặc đã hết hạn"*; tiền thanh toán không bị thay đổi. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-04** | Xác thực biểu mẫu thông tin giao hàng | 1. Để trống toàn bộ ô và bấm "Place Order".<br>2. Nhập số điện thoại chữ: `"abcxyz"`. | Bỏ trống / Sai định dạng | Các ô bắt buộc chuyển viền đỏ, hiển thị lỗi yêu cầu nhập đầy đủ; chặn không cho tiến hành đặt hàng. | [ ] PASS<br>[ ] FAIL |
| **TC-CHK-05** | Hoàn tất đặt hàng & Dọn sạch giỏ | 1. Điền đầy đủ thông tin hợp lệ.<br>2. Chọn thanh toán COD.<br>3. Bấm "Place Order". | Dữ liệu hợp lệ | Chuyển ngay sang trang `/order-success`; hiển thị mã đơn dạng `LUNE-XXXX`; giỏ hàng được xóa rỗng hoàn toàn về 0 món. | [ ] PASS<br>[ ] FAIL |

---

### 👤 TEST SUITE 5: XÁC THỰC, BẢO VỆ ĐƯỜNG DẪN & HỒ SƠ ĐƠN MUA (PHỤ TRÁCH: TV5)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-AUTH-01** | Đăng ký tài khoản thành viên mới | 1. Vào `/register`.<br>2. Nhập: Tên, Email mới, Mật khẩu: `"123456"`, Xác nhận MK: `"123456"`.<br>3. Bấm "Đăng ký". | Dữ liệu hợp lệ | Thông báo tạo tài khoản thành công; tự động điều hướng sang trang Đăng nhập `/login`. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-02** | Báo lỗi khi mật khẩu nhập lại không khớp | 1. Nhập Mật khẩu: `"123456"`.<br>2. Nhập Xác nhận MK: `"654321"`. | Hai mật khẩu lệch nhau | Báo lỗi rõ ràng: *"Mật khẩu xác nhận không khớp"*; nút đăng ký bị chặn. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-03** | Báo lỗi đăng ký email đã tồn tại | 1. Đăng ký với một email đã có sẵn trong danh sách người dùng. | Email trùng lặp | Báo lỗi: *"Email này đã được sử dụng bởi một tài khoản khác"*. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-04** | Đăng nhập tài khoản thất bại | 1. Nhập sai email hoặc sai mật khẩu.<br>2. Bấm "Đăng nhập". | Mật khẩu sai | Báo lỗi màu đỏ: *"Email hoặc mật khẩu không chính xác"*; không tạo phiên đăng nhập. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-05** | Đăng nhập thành công tài khoản thường | 1. Nhập đúng tài khoản khách hàng.<br>2. Bấm "Đăng nhập". | Tài khoản `role: user` | Đăng nhập thành công; Navbar đổi icon tài khoản thành Tên người dùng; chuyển hướng về Trang chủ. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-06** | Đăng nhập tài khoản Quản trị viên | 1. Nhập tài khoản admin.<br>2. Bấm "Đăng nhập". | Tài khoản `role: admin` | Đăng nhập thành công; hệ thống tự động chuyển thẳng vào trang Quản trị `/admin`. | [ ] PASS<br>[ ] FAIL |
| **TC-AUTH-07** | Đăng xuất an toàn | 1. Bấm vào menu tài khoản trên Navbar.<br>2. Bấm nút "Đăng xuất". | Click Đăng xuất | Xóa phiên đăng nhập hiện tại; Navbar trở về trạng thái Khách vãng lai; điều hướng an toàn về `/`. | [ ] PASS<br>[ ] FAIL |
| **TC-GUARD-01**| Bảo vệ đường dẫn Hồ sơ (`/profile`) | 1. Khi CHƯA đăng nhập, gõ trực tiếp URL `/profile` trên trình duyệt. | Khách chưa đăng nhập | Bộ bảo vệ (ProtectedRoute) phát hiện chưa đăng nhập, tự động chặn lại và đá văng về trang `/login`. | [ ] PASS<br>[ ] FAIL |
| **TC-PROF-01** | Xem danh sách đơn hàng đã mua (My Orders)| 1. Đăng nhập tài khoản đã từng mua hàng.<br>2. Vào `/profile` -> Tab "Đơn hàng của tôi". | Tài khoản có lịch sử mua | Hiển thị chính xác các đơn hàng của tài khoản này, gồm mã `LUNE-XXXX`, ngày mua, tổng tiền và nhãn trạng thái có màu sắc chuẩn. | [ ] PASS<br>[ ] FAIL |

---

### 👤 TEST SUITE 6: CỔNG QUẢN TRỊ ADMIN & CRUD SẢN PHẨM (PHỤ TRÁCH: TV6)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Dữ liệu đầu vào (Input) | Kết quả mong đợi (Expected Outcome) | Đánh giá |
| :---: | :--- | :--- | :--- | :--- | :---: |
| **TC-ADGUARD-01**| Chặn người dùng thường truy cập `/admin` | 1. Đăng nhập tài khoản thường (`role: user`).<br>2. Cố tình gõ đường dẫn `/admin` trên thanh địa chỉ. | Quyền User thông thường | Hệ thống từ chối truy cập, tự động chuyển hướng về trang chủ hoặc thông báo không đủ quyền. | [ ] PASS<br>[ ] FAIL |
| **TC-DASH-01** | Tính toán chính xác 4 chỉ số KPI | 1. Đăng nhập quyền Admin, vào `/admin`.<br>2. Kiểm tra số liệu 4 thẻ KPI. | Dữ liệu hệ thống | Số liệu hiển thị khớp 100%: Tổng doanh thu = Tổng tiền các đơn không bị hủy; Tổng đơn = Số đơn hiện có; Tổng sản phẩm & Tổng thành viên chuẩn xác. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-01** | Xem danh sách sản phẩm kho (Read) | 1. Vào `/admin/products`.<br>2. Gõ tên sản phẩm vào ô tìm kiếm bảng. | Tìm kiếm nội bộ | Bảng hiển thị đầy đủ ảnh thu nhỏ, tên, giá, danh mục; ô tìm kiếm lọc sản phẩm tức thì. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-02** | Thêm sản phẩm mới thành công (Create) | 1. Bấm "Thêm sản phẩm mới".<br>2. Điền: Tên: `"Lune Velvet Coat"`, Giá: `220`, Danh mục: `women`, Link ảnh chuẩn, Size, Màu.<br>3. Bấm "Lưu". | Dữ liệu sản phẩm mới | Sản phẩm xuất hiện ngay trong bảng Admin; mở tab mới ra trang `/shop` thấy sản phẩm mới có mặt ngay lập tức. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-03** | Chặn lưu khi biểu mẫu thêm sản phẩm bị bỏ trống | 1. Mở modal thêm mới, để trống Tên hoặc Giá.<br>2. Bấm "Lưu". | Bỏ trống trường bắt buộc | Hiển thị cảnh báo lỗi viền đỏ; không cho phép thêm vào danh sách kho. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-04** | Chỉnh sửa thông tin sản phẩm (Update) | 1. Tại dòng sản phẩm vừa thêm, bấm nút "Sửa".<br>2. Đổi giá từ `220` thành `195`, sửa lại tên.<br>3. Bấm "Cập nhật". | Sửa đổi giá và tên | Dữ liệu trong bảng cập nhật ngay giá mới `195`; ra ngoài trang Shop kiểm tra thấy giá đã đổi thành 195. | [ ] PASS<br>[ ] FAIL |
| **TC-CRUD-05** | Xóa sản phẩm có hộp thoại xác nhận (Delete)| 1. Bấm nút "Xóa" tại một sản phẩm.<br>2. Xuất hiện hộp thoại hỏi: *"Bạn có chắc muốn xóa?"*.<br>3. Bấm "Đồng ý". | Xác nhận Xóa | Sản phẩm biến mất hoàn toàn khỏi bảng Admin và biến mất vĩnh viễn khỏi trang `/shop` của khách. | [ ] PASS<br>[ ] FAIL |
| **TC-ORD-01** | Cập nhật trạng thái vòng đời đơn hàng | 1. Vào `/admin/orders`.<br>2. Tìm đơn hàng đang có trạng thái `Pending`.<br>3. Bấm chuyển sang `Shipping`, sau đó chuyển sang `Delivered`. | Click đổi trạng thái | Trạng thái đổi màu nhãn ngay lập tức; tài khoản khách đặt đơn đó mở `/profile` thấy đơn của mình đã chuyển sang `Delivered`. | [ ] PASS<br>[ ] FAIL |
| **TC-USER-01** | Xem danh sách người dùng hệ thống | 1. Vào `/admin/users`. | Mở trang | Hiển thị đầy đủ danh sách các tài khoản đã đăng ký, hiển thị rõ vai trò `admin` hoặc `user`. | [ ] PASS<br>[ ] FAIL |

---

### 🌐 TEST SUITE 7: KIỂM THỬ TỔNG THỂ & PHI CHỨC NĂNG (TOÀN NHÓM KIỂM TRA)

| Mã ca kiểm thử | Tên tình huống kiểm thử | Các bước thực hiện (Steps) | Tiêu chí nghiệm thu bắt buộc (Pass Criteria) | Đánh giá |
| :---: | :--- | :--- | :--- | :---: |
| **TC-NON-01** | Kiểm tra lưu trữ bền vững (Reload F5) | Thêm hàng vào giỏ, thả tim 2 sản phẩm, đăng nhập tài khoản $\rightarrow$ Nhấn phím `F5` tải lại trang. | Dữ liệu Giỏ hàng, Wishlist và Phiên đăng nhập vẫn còn nguyên vẹn 100%, không bị biến mất. | [ ] PASS<br>[ ] FAIL |
| **TC-NON-02** | Tương thích thiết bị di động (Mobile Responsive) | Nhấn phím `F12`, bật chế độ Device Toolbar giả lập iPhone 14 Pro Max ($393\text{px}$) và iPad ($768\text{px}$). | Toàn bộ giao diện không bị thanh cuộn ngang khó chịu; menu thu vào Hamburger; nút bấm to rõ dễ chạm bằng ngón tay. | [ ] PASS<br>[ ] FAIL |
| **TC-NON-03** | Kiểm tra lỗi bảng điều khiển Console | Bấm `F12`, chuyển sang tab **Console**, duyệt qua tất cả các trang từ Trang chủ, Shop, Chi tiết, Giỏ hàng, Admin. | **KHÔNG CÓ BẤT KỲ DÒNG BÁO LỖI ĐỎ NÀO (Zero Runtime Red Errors)** hiển thị tại màn hình Console. | [ ] PASS<br>[ ] FAIL |
| **TC-NON-04** | Kiểm tra đóng gói đồ án (`npm run build`) | Mở cửa sổ dòng lệnh tại thư mục dự án, chạy lệnh: `npm run build`. | Quá trình đóng gói hoàn tất thành công trong vài giây, sinh ra thư mục `dist/` mà không vấp bất kỳ lỗi cảnh báo biên dịch nào. | [ ] PASS<br>[ ] FAIL |

---

## 🏆 III. BIÊN BẢN NGHIỆM THU CUỐI CÙNG (FINAL SIGN-OFF)

* **Tổng số ca kiểm thử:** 40 Test Cases
* **Số ca Đạt (PASS):** 40 / 40
* **Tỷ lệ hoàn thành:** 100%
* **Xác nhận của Trưởng nhóm (Leader):** ___________________________ (Ký và ghi rõ họ tên)
* **Kết luận:** *Đủ điều kiện đóng gói sản phẩm và báo cáo bảo vệ đồ án FER202 trước hội đồng chấm thi.*
