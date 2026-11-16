// Điểm khởi chạy (cPanel "Setup Node.js App" của iNET dùng file này làm Application startup file).
require('dotenv').config();

const path = require('path');
const express = require('express');
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

const { site, industries, services, steps, promises, homeFaqs, findService } = require('./src/data');
const { validateLead, sendToSheet } = require('./src/leads');
const { icon } = require('./src/icons');

const app = express();
const PORT = process.env.PORT || 3000;
const isProd = process.env.NODE_ENV === 'production';

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('trust proxy', 1);
app.disable('x-powered-by');

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", 'https://fonts.googleapis.com'],
        fontSrc: ["'self'", 'https://fonts.gstatic.com'],
        imgSrc: ["'self'", 'data:', 'https://www.facebook.com'],
        scriptSrc: ["'self'", 'https://connect.facebook.net'],
        connectSrc: ["'self'", 'https://www.facebook.com', 'https://connect.facebook.net'],
        formAction: ["'self'"],
        upgradeInsecureRequests: isProd ? [] : null,
      },
    },
  })
);
app.use(compression());
app.use(express.urlencoded({ extended: true, limit: '20kb' }));
app.use(express.json({ limit: '20kb' }));
app.use(express.static(path.join(__dirname, 'public'), { maxAge: isProd ? '7d' : 0 }));

app.locals.site = site;
app.locals.services = services;
app.locals.industries = industries;
app.locals.year = new Date().getFullYear();
app.locals.icon = icon;

app.use((req, res, next) => {
  res.locals.path = req.path;
  res.locals.canonical = site.url.replace(/\/$/, '') + req.path;
  next();
});

app.get('/', (req, res) => {
  res.render('pages/home', {
    title: `${site.name} — Content & quảng cáo Facebook cho người bán hàng online`,
    description: site.description,
    steps,
    promises,
    faqs: homeFaqs,
  });
});

app.get('/dich-vu/:slug', (req, res, next) => {
  const service = findService(req.params.slug);
  if (!service) return next();
  res.render('pages/service', {
    title: `${service.name} | ${site.name}`,
    description: `${service.short} Đăng ký tư vấn miễn phí cùng ${site.name}.`,
    service,
    steps,
    faqs: service.faqs,
  });
});

app.get('/cam-on', (req, res) => {
  res.render('pages/thanks', { title: `Cảm ơn bạn | ${site.name}`, description: site.description, noindex: true });
});

const leadLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 8,
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  handler: (req, res) => respond(req, res, 429, { ok: false, message: 'Bạn gửi hơi nhiều lần, vui lòng thử lại sau ít phút.' }),
});

// Form gửi bằng fetch (JSON) hoặc submit thường khi trình duyệt tắt JavaScript.
function respond(req, res, status, payload) {
  if (req.accepts(['html', 'json']) === 'json') return res.status(status).json(payload);
  if (payload.ok) return res.redirect(303, '/cam-on');
  return res.status(status).render('pages/form-error', {
    title: `Chưa gửi được | ${site.name}`,
    description: site.description,
    noindex: true,
    payload,
    back: /^\/dich-vu\/[a-z-]+$/.test(req.body.page || '') ? `${req.body.page}#dang-ky` : '/#dich-vu',
  });
}

app.post('/api/dang-ky', leadLimiter, async (req, res) => {
  // Ô bẫy ẩn: người thật không điền, bot thì có.
  if (req.body.website) return respond(req, res, 200, { ok: true });

  const { data, errors } = validateLead(req.body);
  if (errors) return respond(req, res, 422, { ok: false, message: 'Vui lòng kiểm tra lại thông tin.', errors });

  try {
    await sendToSheet({ ...data, userAgent: String(req.get('user-agent') || '').slice(0, 200) });
    return respond(req, res, 200, { ok: true });
  } catch (err) {
    console.error('[leads] Gửi Google Sheet thất bại:', err.message);
    return respond(req, res, 502, {
      ok: false,
      message: `Hệ thống đang bận. Bạn vui lòng nhắn Zalo ${site.phoneDisplay} để Mộc Nhiên hỗ trợ ngay.`,
    });
  }
});

app.get('/robots.txt', (req, res) => {
  res.type('text/plain').send(`User-agent: *\nAllow: /\nDisallow: /cam-on\nSitemap: ${site.url.replace(/\/$/, '')}/sitemap.xml\n`);
});

app.get('/sitemap.xml', (req, res) => {
  const base = site.url.replace(/\/$/, '');
  const urls = ['/', ...services.map((s) => `/dich-vu/${s.slug}`)];
  res.type('application/xml').send(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
      .map((u) => `  <url><loc>${base}${u}</loc></url>`)
      .join('\n')}\n</urlset>\n`
  );
});

app.use((req, res) => {
  res.status(404).render('pages/404', { title: `Không tìm thấy trang | ${site.name}`, description: site.description, noindex: true });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send('Đã có lỗi xảy ra. Vui lòng thử lại sau.');
});

app.listen(PORT, () => console.log(`Mộc Nhiên Content đang chạy tại http://localhost:${PORT}`));
