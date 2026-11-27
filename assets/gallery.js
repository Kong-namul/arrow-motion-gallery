/* 갤러리 렌더러: data/*.js → 카드·매트릭스. 필터·검색·느리게·테마·복사. 수정하면 index.html ?v= 올리기 */
(function () {
  'use strict';
  var D = window.ARROW_DATA;
  var B = window.ARROW_BEHAVIORS || {};
  var S = window.ARROW_SETS && window.ARROW_SETS.SETS && window.ARROW_SETS.SETS.length ? window.ARROW_SETS : null;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var items = D.ARROWS.slice().sort(function (a, b) { return a.id.localeCompare(b.id, 'en', { numeric: true }); });
  var main = $('[data-sections]');
  var nativeTimeout = window.setTimeout.bind(window); /* 갤러리 자체 UI 타이머는 '느리게'의 영향을 받지 않는다 */

  /* 1. 데모 CSS 주입 — 복사 버튼이 주는 CSS와 같은 문자열 */
  var style = document.createElement('style');
  style.textContent = (S ? S.BASE + '\n\n' + S.TYPES.map(function (t) { return '/* ' + t.key + ' */\n' + t.css; }).join('\n\n') + '\n\n' : '') +
    items.map(function (a) { return '/* ' + a.id + ' */\n' + a.css; }).join('\n\n');
  document.head.appendChild(style);

  /* 2. 렌더 */
  function card(a) {
    var m = a.motion;
    var c = el('article', 'g-card');
    c.id = a.id;
    c.dataset.search = [a.id, a.name, a.source, a.look, a.group || '', a.feel.join(' '), a.fits.join(' ')].join(' ').toLowerCase();
    c.innerHTML =
      '<div class="g-stage' + (a.tall ? ' g-stage--tall' : '') + '">' + D.expand(a.demo) + '</div>' +
      '<div class="g-info">' +
        '<div class="g-row"><a class="g-id" href="#' + a.id + '">' + a.id + '</a><h3 class="g-name">' + esc(a.name) + '</h3></div>' +
        '<dl class="g-spec">' +
          '<dt>모션</dt><dd>' + esc(m.trigger) + ' → ' + esc(m.change) + '</dd>' +
          '<dt>타이밍</dt><dd class="g-mono">' + esc(m.timing) + (m.inferred ? '<span class="g-inferred">추정</span>' : '') + '</dd>' +
          '<dt>생김새</dt><dd>' + esc(a.look) + '</dd>' +
          '<dt>상태</dt><dd>' + esc(a.states) + '</dd>' +
          '<dt>용도</dt><dd>' + esc(a.fits.join(' · ')) + '</dd>' +
        '</dl>' +
        '<ul class="g-feel">' + a.feel.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<div class="g-actions"><a class="g-src" href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.source) + '</a>' +
        '<button type="button" class="g-copy" data-copy="' + a.id + '">코드 복사</button></div>' +
      '</div>';
    return c;
  }

  function section(cat, list) {
    var sec = el('section', 'g-sec');
    sec.id = 'cat-' + cat.key;
    sec.dataset.cat = cat.key;
    sec.appendChild(el('div', 'g-sec-head',
      '<h2 class="g-sec-title"><span class="g-sec-key">' + cat.key + '</span>' + esc(cat.name) + '<span class="g-sec-n">' + list.length + '종</span></h2>' +
      '<p class="g-sec-desc">' + esc(cat.desc) + '</p>'));
    var grid = null, group = null;
    list.forEach(function (a) {
      if (!grid || (a.group || '') !== group) {
        group = a.group || '';
        if (group) sec.appendChild(el('h3', 'g-group', esc(group)));
        grid = el('div', 'g-grid');
        sec.appendChild(grid);
      }
      grid.appendChild(card(a));
    });
    return sec;
  }

  function varsStyle(vars) { return Object.keys(vars).map(function (k) { return k + ':' + vars[k]; }).join(';'); }

  function matrix() {
    var sec = el('section', 'g-sec');
    sec.id = 'cat-S';
    sec.dataset.cat = 'S';
    sec.appendChild(el('div', 'g-sec-head',
      '<h2 class="g-sec-title"><span class="g-sec-key">S</span>모션 세트 매트릭스<span class="g-sec-n">' + S.SETS.length + ' 세트 × ' + S.TYPES.length + ' 종류</span></h2>' +
      '<p class="g-sec-desc">' + esc(S.desc) + '</p>'));
    var tabs = el('div', 'g-mx-tabs');
    S.SETS.forEach(function (s, k) {
      tabs.appendChild(el('button', 'g-chip', esc(s.key + ' ' + s.name)));
      tabs.lastChild.type = 'button';
      tabs.lastChild.dataset.setTab = String(k);
      tabs.lastChild.setAttribute('aria-pressed', String(k === 0));
    });
    sec.appendChild(tabs);
    var mx = el('div', 'g-mx');
    mx.style.setProperty('--cols', String(S.SETS.length));
    mx.appendChild(el('div', 'g-mx-corner', '<span class="g-id">세트 → / 종류 ↓</span>'));
    S.SETS.forEach(function (s, k) {
      var col = el('div', 'g-mx-col',
        '<div class="g-row"><span class="g-id">' + s.key + '</span><h3 class="g-name">' + esc(s.name) + '</h3></div>' +
        '<p>' + esc(s.feel) + '</p><p class="g-mx-use">' + esc(s.use) + '</p>' +
        '<button type="button" class="g-copy" data-copy-set="' + k + '">세트 CSS 복사</button>');
      col.dataset.set = String(k);
      mx.appendChild(col);
    });
    S.TYPES.forEach(function (t) {
      mx.appendChild(el('div', 'g-mx-row', '<div class="g-row"><span class="g-id">' + t.key + '</span><h3 class="g-name">' + esc(t.name) + '</h3></div><p>' + esc(t.desc) + '</p>'));
      S.SETS.forEach(function (s, k) {
        var c = el('div', 'g-mx-cell' + (t.tall ? ' g-mx-cell--tall' : ''), D.expand(t.demo));
        c.dataset.set = String(k);
        c.setAttribute('style', varsStyle(s.vars));
        mx.appendChild(c);
      });
    });
    sec.appendChild(mx);
    var table = '<table class="g-table"><thead><tr><th>변수</th><th>뜻</th>' +
      S.SETS.map(function (s) { return '<th>' + s.key + ' ' + esc(s.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      S.VARS.map(function (v) {
        return '<tr><th class="g-mono">' + v.name + '</th><td>' + esc(v.desc) + '</td>' +
          S.SETS.map(function (s) { return '<td class="g-mono" title="' + esc(s.vars[v.name]) + '">' + esc(s.vars[v.name]) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
    sec.appendChild(el('div', 'g-table-wrap', table));
    sec.appendChild(el('ul', 'g-basis', S.SETS.map(function (s) {
      return '<li><b>' + s.key + ' ' + esc(s.name) + '</b> 근거: ' + s.basis.map(function (b) {
        return b.url ? '<a href="' + esc(b.url) + '" target="_blank" rel="noopener noreferrer">' + esc(b.label) + '</a>' : esc(b.label);
      }).join(' · ') + '</li>';
    }).join('')));
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('[data-set-tab]');
      if (!b) return;
      $$('[data-set-tab]', tabs).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $$('[data-set]', mx).forEach(function (x) { x.classList.toggle('is-off', x.dataset.set !== b.dataset.setTab); });
    });
    $$('[data-set]', mx).forEach(function (x) { x.classList.toggle('is-off', x.dataset.set !== '0'); });
    return sec;
  }

  if (S) main.appendChild(matrix());
  D.CATEGORIES.forEach(function (cat) {
    var list = items.filter(function (a) { return a.id[0] === cat.key; });
    if (list.length) main.appendChild(section(cat, list));
  });
  $$('[data-total-count]').forEach(function (n) { n.textContent = String(items.length); });

  /* 3. 데모 동작 연결 */
  $$('[data-behavior]', main).forEach(function (root) {
    root.dataset.behavior.split(/\s+/).forEach(function (n) {
      if (typeof B[n] !== 'function') return;
      try { B[n](root); } catch (err) { console.error('[behavior]', n, err); }
    });
  });

  /* 4. 필터·검색 */
  var chips = $('[data-filters]');
  var cats = [{ key: 'all', name: '전체', n: items.length }]
    .concat(S ? [{ key: 'S', name: '모션 세트', n: S.SETS.length }] : [])
    .concat(D.CATEGORIES.map(function (c) { return { key: c.key, name: c.name, n: items.filter(function (a) { return a.id[0] === c.key; }).length }; }).filter(function (c) { return c.n; }));
  chips.innerHTML = cats.map(function (c) {
    return '<button type="button" class="g-chip" data-filter="' + c.key + '" aria-pressed="' + (c.key === 'all') + '">' +
      (c.key === 'all' ? '' : c.key + ' ') + esc(c.name) + '<span class="g-chip-n">' + c.n + '</span></button>';
  }).join('');
  var state = { cat: 'all', q: '' };
  function apply() {
    var any = false;
    $$('.g-sec', main).forEach(function (sec) {
      var catOk = state.cat === 'all' || sec.dataset.cat === state.cat;
      if (sec.dataset.cat === 'S') {
        sec.hidden = !catOk || (state.q && sec.textContent.toLowerCase().indexOf(state.q) < 0);
        any = any || !sec.hidden;
        return;
      }
      var shown = 0;
      $$('.g-card', sec).forEach(function (c) {
        var ok = catOk && (!state.q || c.dataset.search.indexOf(state.q) >= 0);
        c.hidden = !ok;
        if (ok) shown++;
      });
      $$('.g-grid', sec).forEach(function (g) {
        var vis = $$('.g-card', g).some(function (c) { return !c.hidden; });
        g.hidden = !vis;
        var prev = g.previousElementSibling;
        if (prev && prev.classList.contains('g-group')) prev.hidden = !vis;
      });
      sec.hidden = shown === 0;
      any = any || shown > 0;
    });
    $('[data-empty]').hidden = any;
  }
  chips.addEventListener('click', function (e) {
    var b = e.target.closest('[data-filter]');
    if (!b) return;
    state.cat = b.dataset.filter;
    $$('[data-filter]', chips).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    apply();
  });
  var search = $('[data-search]');
  search.addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); apply(); });
  function resetFilters() {
    state.cat = 'all'; state.q = ''; search.value = '';
    $$('[data-filter]', chips).forEach(function (x) { x.setAttribute('aria-pressed', String(x.dataset.filter === 'all')); });
    apply();
  }

  /* 5. 느리게 0.25× — CSS 전환/애니메이션의 playbackRate 를 바꾸고, 데모 동작의 JS 타이머(setTimeout)도 같은 배율로 늘린다.
   *    복사되는 CSS·동작 코드는 그대로. (예: T08 의 CSS 1200ms 채움과 data-hold="1200" 이 함께 4800ms 가 된다) */
  var rate = 1;
  var slow = $('[data-slowmo]');
  window.setTimeout = function (fn, ms) {
    var args = Array.prototype.slice.call(arguments);
    if (rate !== 1 && typeof ms === 'number') args[1] = ms / rate;
    return nativeTimeout.apply(null, args);
  };
  ['transitionrun', 'animationstart'].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      if (rate === 1 || !e.target.getAnimations) return;
      e.target.getAnimations({ subtree: true }).forEach(function (an) { an.playbackRate = rate; });
    }, true);
  });
  slow.addEventListener('click', function () {
    rate = rate === 1 ? 0.25 : 1;
    slow.setAttribute('aria-pressed', String(rate !== 1));
    document.getAnimations().forEach(function (an) { an.playbackRate = rate; });
  });

  /* 6. 테마 */
  var themeBtn = $('[data-theme-toggle]');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() { var t = document.documentElement.dataset.theme; return t ? t === 'dark' : mq.matches; }
  function syncTheme() { themeBtn.setAttribute('aria-pressed', String(isDark())); themeBtn.textContent = isDark() ? '다크 켜짐' : '다크'; }
  themeBtn.addEventListener('click', function () {
    var t = isDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('arrow-theme', t); } catch (e) { /* 저장 불가 환경 */ }
    syncTheme();
  });
  if (mq.addEventListener) mq.addEventListener('change', syncTheme);
  syncTheme();

  /* 7. 복사 */
  function copyText(text, btn) {
    if (!btn.dataset.label) btn.dataset.label = btn.textContent;
    var done = function (msg) { btn.textContent = msg; nativeTimeout(function () { btn.textContent = btn.dataset.label; }, 1400); };
    var fallback = function () {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) { ok = false; }
      ta.remove();
      btn.focus({ preventScroll: true });
      done(ok ? '복사됨' : '복사 실패');
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('복사됨'); }, fallback);
    else fallback();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy],[data-copy-set]');
    if (!b) return;
    if (b.dataset.copy) copyText(D.codeFor(items.filter(function (a) { return a.id === b.dataset.copy; })[0], B), b);
    else copyText(D.setCode(S, S.SETS[parseInt(b.dataset.copySet, 10)], B), b);
  });

  /* 8. #번호 로 이동 + 강조 — 필터·검색에 가려진 카드면 필터를 전체로 되돌린 뒤 이동 */
  function flash() {
    var id = '';
    try { id = decodeURIComponent(location.hash.slice(1)); } catch (e) { return; }
    var t = id && document.getElementById(id);
    if (!t || !t.classList.contains('g-card')) return;
    if (t.closest('[hidden]')) resetFilters();
    t.scrollIntoView({ block: 'center' });
    t.classList.add('is-flash');
    nativeTimeout(function () { t.classList.remove('is-flash'); }, 1600);
  }
  window.addEventListener('hashchange', flash);
  flash();
})();
