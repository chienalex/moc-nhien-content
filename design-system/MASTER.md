# Mộc Nhiên Content — Design System (MASTER)

Nguồn chân lý chung cho mọi trang. Trang nào cần khác thì tạo `design-system/pages/<trang>.md`.

## Định vị
"Mộc" = gỗ, mộc mạc; "Nhiên" = tự nhiên. Thương hiệu content cho Ads thủ và chủ shop:
chữ có sức nặng, chân thật, không màu mè. Giao diện: **organic editorial** — giấy kem,
xanh rêu đậm, điểm nhấn màu gỗ/đất nung, tiêu đề serif lớn, nhiều khoảng thở.

> Bộ tìm kiếm gợi ý Brutalism + hồng; không hợp tên "Mộc Nhiên" nên đã thay bằng bảng màu tự nhiên dưới đây.

## Màu (token trong `public/css/styles.css`)
| Token | Giá trị | Dùng cho |
|---|---|---|
| `--paper` | #F6F1E7 | Nền chính |
| `--paper-2` | #EDE5D6 | Nền khối phụ |
| `--card` | #FFFDF8 | Thẻ, form |
| `--ink` | #1E2A22 | Chữ chính (≈14:1 trên nền) |
| `--ink-soft` | #4A5A4F | Chữ phụ (≈6.8:1) |
| `--moss` | #2E4A3A | Màu chính, nút |
| `--moss-deep` | #1B2B22 | Khối tối, footer |
| `--clay` | #A4592A | Điểm nhấn (chữ ≥ 4.5:1 trên nền kem) |
| `--sand` | #D9C7A7 | Viền, trang trí |
| `--line` | #DCD2C0 | Đường kẻ |

## Chữ
- Tiêu đề: **Playfair Display** 500–700 (có tiếng Việt)
- Nội dung: **Be Vietnam Pro** 400/500/600, cỡ nền 17px, line-height 1.65
- Nhãn nhỏ: Be Vietnam Pro 600, chữ in hoa, letter-spacing .14em

## Khoảng cách (thoáng)
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 px. Vùng chứa tối đa 1200px, lề 20px trên điện thoại.

## Hình khối & hiệu ứng
- Bo góc: 14px (thẻ), 999px (nút, chip)
- Bóng: rất nhẹ, ấm `0 1px 2px rgb(30 42 34 / .06), 0 12px 32px -12px rgb(30 42 34 / .18)`
- Chuyển động: hiện dần khi cuộn 500ms ease-out, so le 60ms; hover 200ms; tắt hết khi `prefers-reduced-motion`
- Icon: SVG nét 1.75 (kiểu Lucide), không dùng emoji

## Quy tắc
- **Không hiển thị giá** ở bất kỳ đâu.
- Mỗi trang dịch vụ kết thúc bằng form đăng ký của chính dịch vụ đó.
- Nút chạm ≥ 44px, focus ring rõ (`--clay`), nhãn form luôn hiển thị, lỗi báo ngay dưới ô.
- Responsive kiểm tra ở 375 / 768 / 1024 / 1440.
