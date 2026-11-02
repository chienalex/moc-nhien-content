/**
 * Mộc Nhiên Content — nhận đơn đăng ký từ website, ghi vào Google Sheet và gửi email báo.
 *
 * Cách dùng: mở Google Sheet "Mộc Nhiên – Đăng ký dịch vụ" → Tiện ích mở rộng → Apps Script,
 * dán toàn bộ file này, đổi SECRET, rồi Triển khai → Tùy chọn triển khai mới → Ứng dụng web
 * (Thực thi với: Tôi; Ai có quyền truy cập: Bất kỳ ai). Xem README.md mục 3.
 */

// Phải trùng với GOOGLE_SCRIPT_SECRET trên server.
const SECRET = 'DOI-CHUOI-BI-MAT-NAY';
// Email nhận thông báo khi có đăng ký mới.
const NOTIFY_EMAIL = 'nguyenchien.vt37@gmail.com';

const HEADERS = [
  'Thời gian', 'Dịch vụ', 'Họ tên', 'Số điện thoại', 'Lĩnh vực',
  'Mục đã chọn', 'Ngân sách / Thời gian', 'Ghi chú', 'Trang', 'Trạng thái',
];

// Mỗi dịch vụ một tab riêng + một tab "Tất cả" để xem tổng.
const SERVICE_TABS = {
  'Chạy quảng cáo Facebook Ads': 'Quảng cáo Facebook',
  'Viết bài quảng cáo cho Ads thủ': 'Viết bài quảng cáo',
  'Chăm sóc Fanpage': 'Chăm sóc Fanpage',
  'Tư vấn marketing online': 'Tư vấn marketing',
};

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.secret !== SECRET) return json_({ ok: false, error: 'unauthorized' });

    const lock = LockService.getScriptLock();
    lock.waitLock(20000);
    try {
      const extra = data.extra ? `${data.extraLabel}: ${data.extra}` : '';
      const row = [
        new Date(), data.service, data.name, "'" + data.phone, data.industry,
        data.choices, extra, data.note || '', data.page || '', 'Mới',
      ];
      sheet_('Tất cả').appendRow(row);
      if (SERVICE_TABS[data.service]) sheet_(SERVICE_TABS[data.service]).appendRow(row);
    } finally {
      lock.releaseLock();
    }

    notify_(data);
    return json_({ ok: true });
  } catch (err) {
    console.error(err);
    return json_({ ok: false, error: String(err) });
  }
}

// Mở URL Web App trên trình duyệt để kiểm tra script đang chạy.
function doGet() {
  return json_({ ok: true, service: 'Mộc Nhiên lead endpoint' });
}

function sheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sh = ss.getSheetByName(name);
  if (!sh) {
    sh = ss.insertSheet(name);
    sh.appendRow(HEADERS);
    sh.setFrozenRows(1);
    sh.getRange(1, 1, 1, HEADERS.length)
      .setFontWeight('bold').setBackground('#2E4A3A').setFontColor('#F6F1E7');
    sh.getRange('A:A').setNumberFormat('dd/MM/yyyy HH:mm');
    sh.setColumnWidths(1, HEADERS.length, 170);
    sh.setColumnWidth(6, 320);
    sh.setColumnWidth(8, 280);
    const rule = SpreadsheetApp.newDataValidation()
      .requireValueInList(['Mới', 'Đã liên hệ', 'Đang tư vấn', 'Đã chốt', 'Không phù hợp'], true).build();
    sh.getRange(2, HEADERS.length, 1000, 1).setDataValidation(rule);
  }
  return sh;
}

function notify_(d) {
  if (!NOTIFY_EMAIL) return;
  const lines = [
    `Dịch vụ: ${d.service}`,
    `Họ tên: ${d.name}`,
    `Số điện thoại: ${d.phone}`,
    `Lĩnh vực: ${d.industry}`,
    `Mục đã chọn: ${d.choices}`,
    d.extra ? `${d.extraLabel}: ${d.extra}` : '',
    d.note ? `Ghi chú: ${d.note}` : '',
    '',
    `Zalo: https://zalo.me/${d.phone}`,
    `Mở bảng tính: ${SpreadsheetApp.getActiveSpreadsheet().getUrl()}`,
  ].filter((l, i, a) => l !== '' || a[i - 1] !== '');
  MailApp.sendEmail({
    to: NOTIFY_EMAIL,
    subject: `[Mộc Nhiên] Đăng ký mới: ${d.service} — ${d.name}`,
    body: lines.join('\n'),
  });
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

// Chạy hàm này 1 lần trong trình soạn thảo để cấp quyền và tạo sẵn các tab.
function setup() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const first = ss.getSheets()[0];
  // Tab gốc (tạo sẵn kèm dòng tiêu đề) được thay bằng tab "Tất cả" có định dạng đầy đủ.
  if (!ss.getSheetByName('Tất cả') && first.getLastRow() <= 1) first.setName('_cu');
  sheet_('Tất cả');
  Object.values(SERVICE_TABS).forEach(sheet_);
  const old = ss.getSheetByName('_cu');
  if (old) ss.deleteSheet(old);
}
