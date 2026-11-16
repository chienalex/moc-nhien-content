// Meta (Facebook) Pixel. ID lấy từ <meta name="fb-pixel-id"> (biến FB_PIXEL_ID trên server).
(function () {
  'use strict';
  var meta = document.querySelector('meta[name="fb-pixel-id"]');
  var id = meta && meta.content;
  if (!id || window.fbq) return;

  // Mã nạp chuẩn của Meta, tách ra file riêng để hợp với Content-Security-Policy.
  var n = (window.fbq = function () {
    n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
  });
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = '2.0';
  n.queue = [];
  var t = document.createElement('script');
  t.async = true;
  t.src = 'https://connect.facebook.net/en_US/fbevents.js';
  var s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(t, s);

  window.fbq('init', id);
  window.fbq('track', 'PageView');

  // Xem trang dịch vụ.
  var m = location.pathname.match(/^\/dich-vu\/([a-z0-9-]+)\/?$/);
  if (m) window.fbq('track', 'ViewContent', { content_name: m[1], content_category: 'Dịch vụ' });

  // Bấm Zalo hoặc gọi điện.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a) return;
    var href = a.getAttribute('href') || '';
    if (href.indexOf('tel:') === 0) window.fbq('track', 'Contact', { content_name: 'Gọi điện' });
    else if (href.indexOf('zalo.me') !== -1) window.fbq('track', 'Contact', { content_name: 'Zalo' });
  });
})();
