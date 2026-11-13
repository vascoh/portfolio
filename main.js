/* Vasco Henriques — Portefólio · comportamento da página */
(function () {
  'use strict';

  var cfg = window.SITE_CONFIG || {};
  var root = document.documentElement;
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var filled = function (v) { return typeof v === 'string' && v.trim() !== ''; };
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  /* Só aceita URLs http(s), mailto ou caminhos relativos (evita javascript:) */
  function safeUrl(v) {
    if (!filled(v)) return '';
    var s = v.trim();
    if (/^(https?:|mailto:)/i.test(s) || /^[./]?[\w\-/.]+$/.test(s)) return s;
    return '';
  }

  /* ---------- Ano no rodapé ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = String(new Date().getFullYear()); });

  /* ---------- Tema ---------- */
  var themeBtn = $('[data-theme-toggle]');
  var themeMeta = $$('meta[name="theme-color"]');

  function applyTheme(t) {
    root.dataset.theme = t;
    var dark = t === 'dark';
    themeBtn.setAttribute('aria-label', dark ? 'Ativar modo claro' : 'Ativar modo escuro');
    themeBtn.setAttribute('aria-pressed', String(dark));
    themeMeta.forEach(function (m) { m.setAttribute('content', dark ? '#0a0f1a' : '#f6f7f9'); });
  }
  applyTheme(root.dataset.theme === 'dark' ? 'dark' : 'light');

  themeBtn.addEventListener('click', function () {
    var next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  // Segue o sistema enquanto o utilizador não escolheu manualmente
  var sysDark = window.matchMedia('(prefers-color-scheme: dark)');
  var onSys = function (e) {
    var saved = null;
    try { saved = localStorage.getItem('theme'); } catch (err) {}
    if (!saved) applyTheme(e.matches ? 'dark' : 'light');
  };
  if (sysDark.addEventListener) sysDark.addEventListener('change', onSys);

  /* ---------- Cabeçalho e menu móvel ---------- */
  var header = $('[data-header]');
  var menuBtn = $('[data-menu-toggle]');
  var menu = $('[data-nav-menu]');
  var desktop = window.matchMedia('(min-width: 860px)');

  function setMenu(open, returnFocus) {
    menu.classList.toggle('is-open', open);
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (open) { var first = $('.nav-link', menu); if (first) first.focus(); }
    else if (returnFocus) menuBtn.focus();
  }
  menuBtn.addEventListener('click', function () {
    setMenu(menuBtn.getAttribute('aria-expanded') !== 'true');
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') && !desktop.matches) setMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setMenu(false, true);
  });
  document.addEventListener('click', function (e) {
    if (menu.classList.contains('is-open') && !header.contains(e.target)) setMenu(false);
  });
  var onDesktop = function () { if (desktop.matches) setMenu(false); };
  if (desktop.addEventListener) desktop.addEventListener('change', onDesktop);

  var onScroll = function () { header.classList.toggle('is-scrolled', window.scrollY > 8); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Ao navegar por âncora, move o foco para a secção (leitores de ecrã/teclado)
  $$('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function () {
      var id = a.getAttribute('href').slice(1);
      var target = id && document.getElementById(id);
      if (!target) return;
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      setTimeout(function () { target.focus({ preventScroll: true }); }, reduceMotion.matches ? 0 : 400);
    });
  });

  /* ---------- Conteúdo configurável ---------- */
  // Fotografia do hero
  var photo = safeUrl(cfg.photo);
  if (photo) {
    var img = $('[data-hero-photo]');
    img.src = photo;
    img.hidden = false;
    $('[data-hero-visual]').setAttribute('hidden', '');
  }

  // Links genéricos (GitHub, …)
  $$('[data-config-link]').forEach(function (a) {
    var url = safeUrl((cfg.links || {})[a.dataset.configLink]);
    if (url) { a.href = url; a.hidden = false; }
  });

  // Projeto FPF
  var fpf = cfg.fpf || {};
  var fpfImg = safeUrl(fpf.image);
  if (fpfImg) {
    var fi = $('[data-fpf-image]');
    fi.src = fpfImg;
    fi.alt = fpf.imageAlt || '';
    fi.hidden = false;
    $('[data-fpf-placeholder]').hidden = true;
  }
  var anyFpfLink = false;
  [['demo', '[data-fpf-demo]'], ['repo', '[data-fpf-repo]']].forEach(function (p) {
    var url = safeUrl(fpf[p[0]]);
    if (url) { var a = $(p[1]); a.href = url; a.hidden = false; anyFpfLink = true; }
  });
  if (anyFpfLink) $('[data-fpf-links]').hidden = false;

  // Projetos adicionais (só completos)
  var tpl = $('#project-template');
  var list = $('[data-projects]');
  (cfg.projects || []).filter(function (p) {
    return p && filled(p.title) && filled(p.description) && Array.isArray(p.tags) && p.tags.length;
  }).forEach(function (p) {
    var node = tpl.content.firstElementChild.cloneNode(true);
    var slot = function (n) { return $('[data-slot="' + n + '"]', node); };
    slot('title').textContent = p.title;
    slot('description').textContent = p.description;
    p.tags.forEach(function (t) {
      var li = document.createElement('li');
      li.className = 'tag';
      li.textContent = t;
      slot('tags').appendChild(li);
    });
    var imgUrl = safeUrl(p.image);
    if (imgUrl) {
      slot('image').src = imgUrl;
      slot('image').alt = p.imageAlt || '';
      slot('media').hidden = false;
    }
    var hasLink = false;
    ['demo', 'repo'].forEach(function (k) {
      var u = safeUrl(p[k]);
      if (u) { slot(k).href = u; slot(k).hidden = false; hasLink = true; }
    });
    if (hasLink) slot('links').hidden = false;
    list.appendChild(node);
  });

  // Experiência e formação
  var timelineShown = false;
  ['experience', 'education'].forEach(function (key) {
    var items = (cfg[key] || []).filter(function (i) { return i && filled(i.title) && filled(i.org); });
    if (!items.length) return;
    var col = $('[data-timeline="' + key + '"]');
    var ol = $('[data-timeline-list]', col);
    items.forEach(function (i) {
      var li = document.createElement('li');
      var parts = [
        ['span', 'tl-period', i.period],
        ['h4', 'tl-title', i.title],
        ['p', 'tl-org', i.org],
        ['p', 'tl-desc', i.description]
      ];
      parts.forEach(function (p) {
        if (!filled(p[2])) return;
        var el = document.createElement(p[0]);
        el.className = p[1];
        el.textContent = p[2];
        li.appendChild(el);
      });
      ol.appendChild(li);
    });
    col.hidden = false;
    timelineShown = true;
  });
  if (timelineShown) $$('[data-show-if="timeline"]').forEach(function (el) { el.hidden = false; });

  /* ---------- Secção ativa no menu ---------- */
  var links = $$('.nav-link');
  var sections = links.map(function (l) { return document.getElementById(l.getAttribute('href').slice(1)); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (l) {
      if (l.getAttribute('href') === '#' + id) l.setAttribute('aria-current', 'true');
      else l.removeAttribute('aria-current');
    });
  }
  function updateActive() {
    var line = window.innerHeight * 0.35;
    var current = sections[0] && sections[0].id;
    sections.forEach(function (s) {
      if (!s.hidden && s.getBoundingClientRect().top <= line) current = s.id;
    });
    // No fundo da página, ativa a última secção
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1].id;
    }
    setActive(current);
  }
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () { updateActive(); ticking = false; });
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  updateActive();

  /* ---------- Revelação ao fazer scroll ---------- */
  var reveals = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion.matches) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Formulário de contacto ---------- */
  var form = $('[data-contact-form]');
  var status = $('[data-form-status]');
  var submitBtn = $('[data-submit]');
  var submitLabel = $('[data-submit-label]');
  var EMAIL = 'vascotelo@hotmail.com';
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  var rules = {
    name: function (v) { return v ? (v.length < 2 ? 'O nome deve ter pelo menos 2 caracteres.' : '') : 'Indique o seu nome.'; },
    email: function (v) { return v ? (EMAIL_RE.test(v) ? '' : 'Indique um e-mail válido, por exemplo nome@dominio.pt.') : 'Indique o seu e-mail.'; },
    subject: function (v) { return v ? '' : 'Indique o assunto da mensagem.'; },
    message: function (v) { return v ? (v.length < 10 ? 'A mensagem deve ter pelo menos 10 caracteres.' : '') : 'Escreva a sua mensagem.'; }
  };

  function validateField(input) {
    var rule = rules[input.name];
    if (!rule) return true;
    var msg = rule(input.value.trim());
    var err = document.getElementById(input.id + '-err');
    err.textContent = msg;
    if (msg) input.setAttribute('aria-invalid', 'true');
    else input.removeAttribute('aria-invalid');
    return !msg;
  }

  var fields = Object.keys(rules).map(function (n) { return form.elements[n]; });
  fields.forEach(function (input) {
    input.addEventListener('blur', function () { if (input.value.trim()) validateField(input); });
    input.addEventListener('input', function () {
      if (input.getAttribute('aria-invalid') === 'true') validateField(input);
    });
  });

  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  function showStatus(kind, title, html) {
    status.className = 'form-status' + (kind ? ' is-' + kind : '');
    status.innerHTML = '<strong>' + escapeHtml(title) + '</strong>' + html;
    status.hidden = false;
  }

  function buildMailto(d) {
    var body = d.message + '\n\n—\n' + d.name + '\n' + d.email;
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(d.subject) + '&body=' + encodeURIComponent(body);
  }

  function setBusy(busy) {
    submitBtn.disabled = busy;
    submitLabel.textContent = busy ? 'A enviar…' : 'Enviar mensagem';
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.hidden = true;

    var firstInvalid = null;
    fields.forEach(function (input) {
      if (!validateField(input) && !firstInvalid) firstInvalid = input;
    });
    if (firstInvalid) { firstInvalid.focus(); return; }

    // Armadilha anti-spam preenchida → ignora silenciosamente
    if (form.elements.website.value) return;

    var data = {
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      subject: form.elements.subject.value.trim(),
      message: form.elements.message.value.trim()
    };
    var mailto = buildMailto(data);
    var endpoint = safeUrl(cfg.formEndpoint);

    if (!endpoint) {
      // Sem serviço de envio: abre o cliente de e-mail. Não confirmamos envio.
      window.location.href = mailto;
      showStatus('', 'Falta só um passo',
        '<p>Abrimos a sua aplicação de e-mail com a mensagem preenchida. Para a enviar, confirme o envio a partir daí.</p>' +
        '<p>Se nada abriu, escreva diretamente para <a href="' + escapeHtml(mailto) + '">' + EMAIL + '</a>.</p>');
      return;
    }

    setBusy(true);
    fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify(Object.assign({ _subject: data.subject, _replyto: data.email }, data))
    }).then(function (res) {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      form.reset();
      showStatus('success', 'Mensagem enviada',
        '<p>Obrigado pelo contacto. Responderei para o e-mail indicado assim que possível.</p>');
    }).catch(function () {
      showStatus('error', 'Não foi possível enviar a mensagem',
        '<p>Tente novamente ou envie-a por e-mail: <a href="' + escapeHtml(mailto) + '">' + EMAIL + '</a>. O texto que escreveu foi mantido.</p>');
    }).then(function () { setBusy(false); });
  });
})();
