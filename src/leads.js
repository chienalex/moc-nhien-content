// Kiểm tra dữ liệu form và chuyển sang Google Sheet qua Google Apps Script Web App.
const { industries, findService } = require('./data');

const PHONE_RE = /^(0|\+?84)(3|5|7|8|9)\d{8}$/;
const MAX_LEN = 500;

function clean(value) {
  return String(value ?? '').replace(/\s+/g, ' ').trim().slice(0, MAX_LEN);
}

function asList(value) {
  if (value == null) return [];
  return (Array.isArray(value) ? value : [value]).map(clean).filter(Boolean);
}

// Trả về { data } khi hợp lệ hoặc { errors } theo tên trường.
function validateLead(body) {
  const errors = {};
  const service = findService(clean(body.service));
  if (!service) errors.service = 'Vui lòng chọn dịch vụ.';

  const name = clean(body.name);
  if (name.length < 2) errors.name = 'Vui lòng nhập họ tên.';

  const phone = clean(body.phone).replace(/[\s.\-()]/g, '');
  if (!PHONE_RE.test(phone)) errors.phone = 'Số điện thoại chưa đúng (ví dụ 0964 646 205).';

  let industry = clean(body.industry);
  if (!industries.includes(industry)) errors.industry = 'Vui lòng chọn lĩnh vực.';
  const industryOther = clean(body.industryOther);
  if (industry === 'Lĩnh vực khác') {
    if (!industryOther) errors.industryOther = 'Vui lòng cho biết lĩnh vực của bạn.';
    else industry = `Khác: ${industryOther}`;
  }

  let choices = [];
  let extra = '';
  if (service) {
    choices = asList(body.choices).filter((c) => service.form.choices.includes(c));
    if (!choices.length) errors.choices = 'Vui lòng chọn ít nhất một mục.';
    if (service.form.extraOptions) {
      extra = clean(body.extra);
      if (!service.form.extraOptions.includes(extra)) errors.extra = 'Vui lòng chọn một lựa chọn.';
    }
  }

  if (Object.keys(errors).length) return { errors };

  return {
    data: {
      service: service.name,
      name,
      phone,
      industry,
      choices: choices.join(', '),
      extraLabel: service.form.extraLabel || '',
      extra,
      note: clean(body.note),
      page: clean(body.page),
    },
  };
}

async function sendToSheet(lead) {
  const url = process.env.GOOGLE_SCRIPT_URL;
  if (!url) {
    // Chưa cấu hình: vẫn nhận đơn để chạy thử ở máy, ghi ra log.
    console.warn('[leads] GOOGLE_SCRIPT_URL chưa cấu hình — đơn đăng ký chỉ được ghi log:', lead);
    return;
  }
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ secret: process.env.GOOGLE_SCRIPT_SECRET || '', ...lead }),
    redirect: 'follow',
    signal: AbortSignal.timeout(15000),
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch {
    throw new Error(`Apps Script trả về không phải JSON (HTTP ${res.status})`);
  }
  if (!json.ok) throw new Error(`Apps Script báo lỗi: ${json.error || 'không rõ'}`);
}

module.exports = { validateLead, sendToSheet };
