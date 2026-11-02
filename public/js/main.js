(function () {
  'use strict';

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Header: viền khi cuộn ---------- */
  var header = document.querySelector('[data-header]');
  function onScroll() {
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 8);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Menu điện thoại ---------- */
  var toggle = document.querySelector('[data-nav-toggle]');
  var mobileNav = document.querySelector('[data-mobile-nav]');
  if (toggle && mobileNav) {
    function setOpen(open) {
      toggle.setAttribute('aria-expanded', String(open));
      toggle.querySelector('.sr-only').textContent = open ? 'Đóng menu' : 'Mở menu';
      mobileNav.hidden = !open;
    }
    toggle.addEventListener('click', function () {
      setOpen(toggle.getAttribute('aria-expanded') !== 'true');
    });
    mobileNav.addEventListener('click', function (e) {
      if (e.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  /* ---------- Hiện dần khi cuộn (so le theo nhóm) ---------- */
  var reveals = Array.prototype.slice.call(document.querySelectorAll('.reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) {
    reveals.forEach(function (el) { el.classList.add('is-in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      var batch = entries.filter(function (en) { return en.isIntersecting; });
      batch.forEach(function (en, i) {
        en.target.style.setProperty('--d', Math.min(i * 70, 420) + 'ms');
        en.target.classList.add('is-in');
        io.unobserve(en.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Form đăng ký ---------- */
  var PHONE_RE = /^(0|\+?84)(3|5|7|8|9)\d{8}$/;

  document.querySelectorAll('[data-lead-form]').forEach(function (form) {
    var success = form.parentElement.querySelector('[data-form-success]');
    var statusEl = form.querySelector('[data-form-status]');
    var submit = form.querySelector('[data-submit]');
    var industry = form.querySelector('[data-industry]');
    var otherWrap = form.querySelector('[data-industry-other]');

    function syncOther() {
      var show = industry.value === 'Lĩnh vực khác';
      otherWrap.hidden = !show;
      if (!show) clearError('industryOther');
    }
    industry.addEventListener('change', syncOther);
    syncOther();

    // Nút "Đăng ký gói này" chọn sẵn mục tương ứng trong form.
    document.querySelectorAll('[data-pick-choice], [data-pick-extra]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var choice = btn.getAttribute('data-pick-choice');
        var extra = btn.getAttribute('data-pick-extra');
        var input;
        if (choice) input = form.querySelector('input[name="choices"][value="' + CSS.escape(choice) + '"]');
        if (extra) input = form.querySelector('input[name="extra"][value="' + CSS.escape(extra) + '"]');
        if (input) {
          input.checked = true;
          clearError(input.name);
        }
        setTimeout(function () {
          var first = form.querySelector('#name');
          if (first) first.focus({ preventScroll: true });
        }, reduceMotion ? 0 : 600);
      });
    });

    function fieldEl(name) { return form.querySelector('[data-field="' + name + '"]'); }
    function setError(name, msg) {
      var f = fieldEl(name);
      if (!f) return;
      f.classList.add('has-error');
      var err = f.querySelector('.field-error');
      if (err) err.textContent = msg;
      f.querySelectorAll('input, select, textarea').forEach(function (i) { i.setAttribute('aria-invalid', 'true'); });
    }
    function clearError(name) {
      var f = fieldEl(name);
      if (!f) return;
      f.classList.remove('has-error');
      var err = f.querySelector('.field-error');
      if (err) err.textContent = '';
      f.querySelectorAll('[aria-invalid]').forEach(function (i) { i.removeAttribute('aria-invalid'); });
    }

    form.addEventListener('input', function (e) { if (e.target.name) clearError(e.target.name); });
    form.addEventListener('change', function (e) { if (e.target.name) clearError(e.target.name); });

    function validate(fd) {
      var errors = {};
      if ((fd.get('name') || '').trim().length < 2) errors.name = 'Vui lòng nhập họ tên.';
      var phone = (fd.get('phone') || '').replace(/[\s.\-()]/g, '');
      if (!PHONE_RE.test(phone)) errors.phone = 'Số điện thoại chưa đúng (ví dụ 0964 646 205).';
      if (!fd.get('industry')) errors.industry = 'Vui lòng chọn lĩnh vực.';
      if (fd.get('industry') === 'Lĩnh vực khác' && !(fd.get('industryOther') || '').trim()) {
        errors.industryOther = 'Vui lòng cho biết lĩnh vực của bạn.';
      }
      if (!fd.getAll('choices').length) errors.choices = 'Vui lòng chọn ít nhất một mục.';
      if (form.querySelector('input[name="extra"]') && !fd.get('extra')) errors.extra = 'Vui lòng chọn một lựa chọn.';
      return errors;
    }

    function showErrors(errors) {
      var names = Object.keys(errors);
      names.forEach(function (n) { setError(n, errors[n]); });
      if (names.length) {
        var first = fieldEl(names[0]);
        var focusable = first && first.querySelector('input:not([type=hidden]), select, textarea');
        if (focusable) focusable.focus();
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      statusEl.textContent = '';
      var fd = new FormData(form);
      var errors = validate(fd);
      if (Object.keys(errors).length) {
        showErrors(errors);
        return;
      }

      var payload = {};
      fd.forEach(function (v, k) {
        if (k === 'choices') (payload.choices = payload.choices || []).push(v);
        else payload[k] = v;
      });

      submit.classList.add('is-loading');
      submit.setAttribute('aria-busy', 'true');
      submit.querySelector('.btn-label').textContent = 'Đang gửi…';

      fetch(form.action, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(payload),
      })
        .then(function (res) {
          return res.json().catch(function () { return { ok: false }; });
        })
        .then(function (data) {
          if (data.ok) {
            form.hidden = true;
            success.hidden = false;
            success.focus();
            return;
          }
          if (data.errors) showErrors(data.errors);
          statusEl.textContent = data.message || 'Chưa gửi được, vui lòng thử lại.';
        })
        .catch(function () {
          statusEl.textContent = 'Mất kết nối mạng. Vui lòng thử lại hoặc nhắn Zalo 0964.646.205.';
        })
        .finally(function () {
          submit.classList.remove('is-loading');
          submit.removeAttribute('aria-busy');
          submit.querySelector('.btn-label').textContent = 'Gửi đăng ký';
        });
    });
  });
})();
