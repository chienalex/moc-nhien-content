# Website Mộc Nhiên Content

Website giới thiệu và nhận đăng ký 4 nhóm dịch vụ của Mộc Nhiên Content (theo bảng báo giá, **không hiển thị giá**):

| Trang | Đường dẫn |
|---|---|
| Trang chủ | `/` |
| Chạy quảng cáo Facebook Ads | `/dich-vu/quang-cao-facebook-ads` |
| Viết bài quảng cáo cho Ads thủ | `/dich-vu/viet-bai-quang-cao` |
| Chăm sóc Fanpage | `/dich-vu/cham-soc-fanpage` |
| Tư vấn marketing online | `/dich-vu/tu-van-marketing-online` |

Mỗi trang dịch vụ có form đăng ký (Họ tên, SĐT/Zalo, Lĩnh vực, chọn các mục, ghi chú). Đơn đăng ký được ghi vào
Google Sheet **"Mộc Nhiên – Đăng ký dịch vụ (Website)"** (thư mục *Mộc Nhiên* trên Google Drive) và gửi email báo về Gmail.

**Công nghệ:** Node.js 18+ · Express · EJS · CSS thuần · Google Apps Script. Không cần cơ sở dữ liệu.

```
app.js                    Server Express (file khởi chạy)
src/data.js               Toàn bộ nội dung: dịch vụ, gói, câu hỏi, lĩnh vực  ← sửa chữ ở đây
src/leads.js              Kiểm tra form + gửi sang Google Sheet
views/                    Giao diện (EJS)
public/                   CSS, JS, logo
google-apps-script/Code.gs  Script dán vào Google Sheet
design-system/MASTER.md   Màu, chữ, quy tắc thiết kế
```

---

## 1. Chạy thử trên máy

```bash
npm install
npm run dev
```

Mở http://localhost:3000. Khi chưa điền `GOOGLE_SCRIPT_URL` trong `.env`, đơn đăng ký chỉ in ra cửa sổ dòng lệnh.

---

## 2. Kết nối form với Google Sheet (làm 1 lần, ~5 phút)

1. Mở Google Sheet **Mộc Nhiên – Đăng ký dịch vụ (Website)** trong thư mục *Mộc Nhiên* trên Drive.
2. Menu **Tiện ích mở rộng → Apps Script**. Xoá code mẫu, dán toàn bộ nội dung file `google-apps-script/Code.gs`.
3. Ở dòng `const SECRET = '...'`, thay bằng chuỗi `GOOGLE_SCRIPT_SECRET` trong file `.env` (ví dụ `const SECRET = 'a1b2c3...';`). Bấm **Lưu**.
4. Chọn hàm **setup** ở thanh trên → **Chạy** → cấp quyền cho tài khoản Google của bạn. Sheet sẽ có các tab: *Tất cả*, *Quảng cáo Facebook*, *Viết bài quảng cáo*, *Chăm sóc Fanpage*, *Tư vấn marketing*.
5. **Triển khai → Tùy chọn triển khai mới** → loại **Ứng dụng web**:
   - Thực thi với: **Tôi**
   - Người có quyền truy cập: **Bất kỳ ai**
6. Bấm **Triển khai**, sao chép **URL ứng dụng web** (kết thúc bằng `/exec`) và dán vào `GOOGLE_SCRIPT_URL` trong `.env` (trên máy) và trong cấu hình hosting (mục 4).

Kiểm tra: gửi thử form trên website → dòng mới xuất hiện ở tab *Tất cả* và tab dịch vụ, Gmail nhận email *"[Mộc Nhiên] Đăng ký mới…"*.
Cột **Trạng thái** có danh sách chọn: Mới / Đã liên hệ / Đang tư vấn / Đã chốt / Không phù hợp.

> Khi sửa Code.gs sau này: **Triển khai → Quản lý triển khai → ✎ → Phiên bản: Phiên bản mới** để giữ nguyên URL.

---

## 3. Đưa code lên GitHub

```bash
git remote add origin https://github.com/<tai-khoan>/moc-nhien-content.git
git push -u origin main
```

File `.env` (chứa chuỗi bí mật) đã được loại khỏi Git qua `.gitignore`.

---

## 4. Deploy lên iNET

### Gói nên mua
**Hosting cPanel có hỗ trợ Node.js** (Linux Hosting của iNET, chọn gói có mục *Setup Node.js App*) là đủ cho website này — rẻ, có SSL miễn phí, không cần quản trị máy chủ. Hỏi iNET xác nhận gói có **Node.js App** và **Git Version Control** trước khi mua. Mua kèm tên miền (ví dụ `mocnhiencontent.vn`).

### Cách A — Hosting cPanel (khuyên dùng)
1. cPanel → **Git™ Version Control** → *Create* → bật *Clone a Repository*, dán URL GitHub, thư mục: `moc-nhien-content`.
   (Repo riêng tư: thêm SSH key của cPanel vào GitHub → *Settings → Deploy keys*.)
2. cPanel → **Setup Node.js App** → *Create Application*:
   - Node.js version: **18** trở lên
   - Application mode: **Production**
   - Application root: `moc-nhien-content`
   - Application URL: tên miền của bạn
   - Application startup file: `app.js`
   - *Environment variables*: thêm `NODE_ENV=production`, `SITE_URL=https://ten-mien-cua-ban`, `GOOGLE_SCRIPT_URL=...`, `GOOGLE_SCRIPT_SECRET=...`, `FB_PIXEL_ID=...`
3. Bấm **Run NPM Install**, sau đó **Restart**.
4. cPanel → **SSL/TLS Status** → *Run AutoSSL* để bật HTTPS.

**Cập nhật về sau:** push code lên GitHub → cPanel *Git Version Control* → *Manage* → *Update from Remote* → *Setup Node.js App* → **Restart**.

### Meta (Facebook) Pixel
Điền `FB_PIXEL_ID=<dãy số pixel>` vào `.env` (hoặc biến môi trường trên hosting) rồi khởi động lại app. Các sự kiện được gửi:
- `PageView` — mọi trang.
- `ViewContent` — khi xem trang dịch vụ `/dich-vu/...`.
- `Lead` — khi gửi form đăng ký thành công.
- `Contact` — khi bấm nút Zalo hoặc gọi điện.

Kiểm tra bằng tiện ích *Meta Pixel Helper* hoặc mục *Kiểm tra sự kiện* trong Trình quản lý sự kiện.

### Đang dùng — AMD Hosting iNET (1Panel) · https://mocnhienads.com
Gói này không có mục *Setup Node.js App*, nên website được chạy qua Passenger:
- Code: `~/moc-nhien-content` (clone từ GitHub), cấu hình ở `~/moc-nhien-content/.env`.
- `~/public_html/.htaccess` trỏ Passenger tới app (Node.js 22 tại `/opt/alt/alt-nodejs22`).
- Tên miền đi qua OneShield; bản ghi A `@` và `www` trỏ về `202.92.5.66`.

**Cập nhật sau khi push lên GitHub:** 1Panel → *Tính năng nâng cao* → **Terminal**, chạy:
```bash
cd ~/moc-nhien-content && git pull && PATH=/opt/alt/alt-nodejs22/root/usr/bin:$PATH npm ci --omit=dev && mkdir -p tmp && touch tmp/restart.txt
```

### Cách B — VPS / Cloud Server iNET
```bash
git clone https://github.com/<tai-khoan>/moc-nhien-content.git && cd moc-nhien-content
npm ci --omit=dev
cp .env.example .env   # rồi điền giá trị
npm i -g pm2 && pm2 start app.js --name mocnhien && pm2 save && pm2 startup
```
Cấu hình Nginx chuyển tiếp tên miền về `http://127.0.0.1:3000`, bật SSL bằng `certbot --nginx`.

---

## 5. Sửa nội dung
Toàn bộ chữ trên website nằm trong `src/data.js` (tên dịch vụ, gói, các mục trong form, câu hỏi thường gặp, lĩnh vực).
Khi thêm/bớt mục trong form của một dịch vụ, Sheet tự nhận — không cần sửa Apps Script.

**Nguyên tắc:** không đưa giá lên website; giá được báo riêng sau khi tư vấn.
