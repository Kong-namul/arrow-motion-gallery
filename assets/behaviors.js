/* 데모 동작 모음 — 각 함수는 루트 요소 하나만 받는 독립 함수라 그대로 복사해 쓸 수 있다.
 * 연결: document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel)
 * 각 함수는 첫 줄에서 루트에 data-<이름>-bound 를 달아, 두 번 불려도 한 번만 연결된다.
 * 마크업 계약은 함수 위 주석 참고. 수정하면 index.html 의 ?v= 를 올린다. */
(function () {
  'use strict';

  /* carousel — 자식: [data-track](슬라이드들의 부모) [data-prev] [data-next] [data-dots]?(비워두면 점 자동 생성) [data-count]?
   * 루트 속성: data-loop, data-step="100"(한 번에 이동할 %), data-visible="1"(한 화면 슬라이드 수)
   * 상태: data-index, data-dir="prev|next", .is-start/.is-end, 끝에서 버튼 disabled(루프 제외 — 포커스는 반대쪽 버튼으로) */
  function carousel(root) {
    if (root.hasAttribute('data-carousel-bound')) return; root.setAttribute('data-carousel-bound', '');
    var track = root.querySelector('[data-track]');
    if (!track) return;
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var dots = root.querySelector('[data-dots]');
    var count = root.querySelector('[data-count]');
    var step = parseFloat(root.dataset.step || '100');
    var max = Math.max(0, track.children.length - parseInt(root.dataset.visible || '1', 10));
    var loop = root.hasAttribute('data-loop');
    var i = 0;
    if (dots && !dots.children.length) {
      for (var k = 0; k <= max; k++) {
        var d = document.createElement('button');
        d.type = 'button';
        d.dataset.go = String(k);
        d.setAttribute('aria-label', (k + 1) + '번 슬라이드');
        dots.appendChild(d);
      }
    }
    /* 포커스를 가진 버튼이 disabled 되면 반대쪽(없으면 루트 안 다음 활성 버튼)으로 포커스를 옮긴다 */
    function refocus(was, alt) {
      if (!was || !was.disabled || !root.contains(was)) return;
      if (!alt || alt.disabled) {
        var on = Array.prototype.filter.call(root.querySelectorAll('button'), function (b) { return !b.disabled; });
        alt = on.filter(function (b) { return was.compareDocumentPosition(b) & 4; })[0] || on[on.length - 1];
      }
      if (alt) alt.focus();
    }
    function go(to, dir) {
      var was = document.activeElement;
      root.dataset.dir = dir || (to >= i ? 'next' : 'prev');
      i = loop ? (to + max + 1) % (max + 1) : Math.max(0, Math.min(max, to));
      track.style.transform = 'translateX(' + (-step * i) + '%)';
      root.dataset.index = String(i);
      root.classList.toggle('is-start', i === 0);
      root.classList.toggle('is-end', i === max);
      if (!loop) { if (prev) prev.disabled = i === 0; if (next) next.disabled = i === max; }
      refocus(was, was === prev ? next : was === next ? prev : null);
      if (count) count.textContent = (i + 1) + ' / ' + (max + 1);
      if (dots) Array.prototype.forEach.call(dots.children, function (el, j) { el.setAttribute('aria-current', String(j === i)); });
    }
    root.addEventListener('click', function (e) {
      var t = e.target.closest('button');
      if (!t || !root.contains(t)) return;
      if (t === prev) go(i - 1, 'prev');
      else if (t === next) go(i + 1, 'next');
      else if (t.dataset.go) go(parseInt(t.dataset.go, 10));
    });
    root.addEventListener('keydown', function (e) {
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, 'prev'); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, 'next'); }
    });
    go(0, 'next');
  }

  /* scroller — 자식: [data-scroller](overflow-x:auto 요소) [data-prev]? [data-next]?
   * 루트 속성: data-step="0.8"(보이는 폭 대비 이동 비율), data-drag(드래그 스크롤)
   * 상태: .is-overflow(넘침 있음) .is-start .is-end .is-dragging, 끝에서 버튼 disabled(포커스는 반대쪽 버튼으로) */
  function scroller(root) {
    if (root.hasAttribute('data-scroller-bound')) return; root.setAttribute('data-scroller-bound', '');
    var sc = root.querySelector('[data-scroller]');
    if (!sc) return;
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var ratio = parseFloat(root.dataset.step || '0.8');
    /* 포커스를 가진 버튼이 disabled 되면 반대쪽(없으면 루트 안 다음 활성 버튼)으로 포커스를 옮긴다 */
    function refocus(was, alt) {
      if (!was || !was.disabled || !root.contains(was)) return;
      if (!alt || alt.disabled) {
        var on = Array.prototype.filter.call(root.querySelectorAll('button'), function (b) { return !b.disabled; });
        alt = on.filter(function (b) { return was.compareDocumentPosition(b) & 4; })[0] || on[on.length - 1];
      }
      if (alt) alt.focus();
    }
    function update() {
      var was = document.activeElement;
      var max = sc.scrollWidth - sc.clientWidth;
      var atStart = sc.scrollLeft <= 1;
      var atEnd = sc.scrollLeft >= max - 1;
      root.classList.toggle('is-overflow', max > 1);
      root.classList.toggle('is-start', atStart);
      root.classList.toggle('is-end', atEnd);
      if (prev) prev.disabled = atStart;
      if (next) next.disabled = atEnd;
      refocus(was, was === prev ? next : was === next ? prev : null);
    }
    function move(d) {
      var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      sc.scrollBy({ left: d * sc.clientWidth * ratio, behavior: reduce ? 'auto' : 'smooth' });
    }
    if (prev) prev.addEventListener('click', function () { move(-1); });
    if (next) next.addEventListener('click', function () { move(1); });
    sc.addEventListener('scroll', update, { passive: true });
    if (window.ResizeObserver) new ResizeObserver(update).observe(sc);
    if (root.hasAttribute('data-drag')) {
      var down = false, x0 = 0, s0 = 0;
      sc.addEventListener('pointerdown', function (e) {
        if (e.pointerType !== 'mouse') return;
        down = true; x0 = e.clientX; s0 = sc.scrollLeft;
        sc.setPointerCapture(e.pointerId);
        root.classList.add('is-dragging');
      });
      sc.addEventListener('pointermove', function (e) { if (down) sc.scrollLeft = s0 - (e.clientX - x0); });
      var end = function () { down = false; root.classList.remove('is-dragging'); };
      sc.addEventListener('pointerup', end);
      sc.addEventListener('pointercancel', end);
    }
    root.addEventListener('keydown', function (e) {
      if (e.target === sc && e.key === 'ArrowLeft') { e.preventDefault(); move(-1); }
      if (e.target === sc && e.key === 'ArrowRight') { e.preventDefault(); move(1); }
    });
    update();
  }

  /* pager — 자식: [data-first]? [data-prev]? [data-pages]?(번호 자동 생성) [data-label]?(현재 표시) [data-next]? [data-last]?
   *   <template data-gap>…</template>?(말줄임 버튼 내용, 없으면 …)
   * 루트 속성: data-total="10" 또는 data-labels="1월,2월,…", data-start="0"(0..n-1 로 자름), data-jump="5", data-loop
   * 생성 요소: button.pg[aria-current="page"], button.pg-gap[data-jump-by]
   * 상태: data-index, data-dir="prev|next", 라벨 변경 시 [data-label].is-anim 재시작, 끝에서 버튼 disabled(포커스는 반대쪽 버튼으로) */
  function pager(root) {
    if (root.hasAttribute('data-pager-bound')) return; root.setAttribute('data-pager-bound', '');
    var labels = root.dataset.labels ? root.dataset.labels.split(',') : null;
    var n = labels ? labels.length : parseInt(root.dataset.total || '10', 10);
    var jump = parseInt(root.dataset.jump || '5', 10);
    var loop = root.hasAttribute('data-loop');
    var pages = root.querySelector('[data-pages]');
    var label = root.querySelector('[data-label]');
    var gap = root.querySelector('template[data-gap]');
    var i = Math.max(0, Math.min(n - 1, parseInt(root.dataset.start || '0', 10) || 0));
    /* 포커스를 가진 버튼이 disabled 되면 반대쪽(없으면 루트 안 다음 활성 버튼)으로 포커스를 옮긴다 */
    function refocus(was, alt) {
      if (!was || !was.disabled || !root.contains(was)) return;
      if (!alt || alt.disabled) {
        var on = Array.prototype.filter.call(root.querySelectorAll('button'), function (b) { return !b.disabled; });
        alt = on.filter(function (b) { return was.compareDocumentPosition(b) & 4; })[0] || on[on.length - 1];
      }
      if (alt) alt.focus();
    }
    function windowed() {
      if (n <= 7) return Array.from({ length: n }, function (_, k) { return k; });
      var keep = [0, n - 1, i - 1, i, i + 1];
      if (i < 4) keep.push(1, 2, 3, 4);
      if (i > n - 5) keep.push(n - 5, n - 4, n - 3, n - 2);
      var list = keep.filter(function (k, j) { return k >= 0 && k < n && keep.indexOf(k) === j; }).sort(function (a, b) { return a - b; });
      var out = [];
      list.forEach(function (k, j) { if (j && k - list[j - 1] > 1) out.push(k <= i ? 'gap-prev' : 'gap-next'); out.push(k); });
      return out;
    }
    function render(animate) {
      var was = document.activeElement;
      var hadFocus = pages && pages.contains(was);
      if (pages) {
        /* 버튼을 자리별로 재사용한다 → aria-current 가 옮겨갈 때 CSS 전환이 그대로 보인다 */
        var want = windowed();
        while (pages.children.length > want.length) pages.removeChild(pages.lastChild);
        want.forEach(function (k, j) {
          var isGap = typeof k === 'string';
          var b = pages.children[j];
          if (!b || b.classList.contains('pg-gap') !== isGap) {
            var nb = document.createElement('button');
            nb.type = 'button';
            if (b) pages.replaceChild(nb, b); else pages.appendChild(nb);
            b = nb;
          }
          if (isGap) {
            b.className = 'pg-gap';
            b.removeAttribute('aria-current');
            delete b.dataset.page;
            b.dataset.jumpBy = String(k === 'gap-prev' ? -jump : jump);
            b.setAttribute('aria-label', (k === 'gap-prev' ? '이전 ' : '다음 ') + jump + '페이지');
            if (b.dataset.gap !== k) { b.innerHTML = gap ? gap.innerHTML : '…'; b.dataset.gap = k; }
          } else {
            b.className = 'pg';
            delete b.dataset.jumpBy;
            delete b.dataset.gap;
            b.textContent = String(k + 1);
            b.dataset.page = String(k);
            b.setAttribute('aria-label', (k + 1) + '페이지');
            if (k === i) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
          }
        });
        if (hadFocus) { var cur = pages.querySelector('[aria-current]'); if (cur) cur.focus(); }
      }
      if (label) {
        label.textContent = labels ? labels[i] : (i + 1) + ' / ' + n;
        if (animate) { label.classList.remove('is-anim'); void label.offsetWidth; label.classList.add('is-anim'); }
      }
      var set = function (sel, off) { var b = root.querySelector(sel); if (b) b.disabled = off; };
      set('[data-first]', i === 0);
      set('[data-prev]', i === 0 && !loop);
      set('[data-next]', i === n - 1 && !loop);
      set('[data-last]', i === n - 1);
      var opp = was && was.matches ? (was.matches('[data-first]') ? '[data-last]' : was.matches('[data-last]') ? '[data-first]' :
        was.matches('[data-prev]') ? '[data-next]' : was.matches('[data-next]') ? '[data-prev]' : null) : null;
      refocus(was, opp && root.querySelector(opp));
      root.dataset.index = String(i);
    }
    function go(to) {
      var t = loop ? ((to % n) + n) % n : Math.max(0, Math.min(n - 1, to));
      if (t === i) return;
      root.dataset.dir = t > i ? 'next' : 'prev';
      i = t;
      render(true);
    }
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button');
      if (!b || !root.contains(b)) return;
      if (b.matches('[data-first]')) go(0);
      else if (b.matches('[data-last]')) go(n - 1);
      else if (b.matches('[data-prev]')) go(i - 1);
      else if (b.matches('[data-next]')) go(i + 1);
      else if (b.dataset.page) go(parseInt(b.dataset.page, 10));
      else if (b.dataset.jumpBy) go(i + parseInt(b.dataset.jumpBy, 10));
    });
    root.addEventListener('keydown', function (e) {
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    });
    render(false);
  }

  /* book — 자식: [data-sheet] 여러 장(앞장이 위), [data-prev]? [data-next]?
   * 상태: 넘긴 장에 .is-turned, 넘어가는 장에 .is-moving(그 장의 transform 전환이 끝나거나 취소되면 해제, 전환이 없으면 2초 뒤),
   *   data-index, 끝에서 버튼 disabled(포커스는 반대쪽 버튼으로) */
  function book(root) {
    if (root.hasAttribute('data-book-bound')) return; root.setAttribute('data-book-bound', '');
    var sheets = Array.prototype.slice.call(root.querySelectorAll('[data-sheet]'));
    var n = sheets.length;
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var i = 0;
    var pending = [];
    /* 넘어가는 중(.is-moving)인 장은 맨 위(3n)를 유지한다 */
    function stack() {
      sheets.forEach(function (s, k) { s.style.zIndex = String(s.classList.contains('is-moving') ? 3 * n : k < i ? k + 1 : 2 * n - k); });
    }
    /* 포커스를 가진 버튼이 disabled 되면 반대쪽(없으면 루트 안 다음 활성 버튼)으로 포커스를 옮긴다 */
    function refocus(was, alt) {
      if (!was || !was.disabled || !root.contains(was)) return;
      if (!alt || alt.disabled) {
        var on = Array.prototype.filter.call(root.querySelectorAll('button'), function (b) { return !b.disabled; });
        alt = on.filter(function (b) { return was.compareDocumentPosition(b) & 4; })[0] || on[on.length - 1];
      }
      if (alt) alt.focus();
    }
    function settle(moving) {
      var k = sheets.indexOf(moving);
      if (pending[k]) pending[k](true);
      var timer = null;
      var finish = function (keep) {
        clearTimeout(timer);
        moving.removeEventListener('transitionend', onEnd);
        moving.removeEventListener('transitioncancel', onEnd);
        pending[k] = null;
        if (!keep) { moving.classList.remove('is-moving'); stack(); }
      };
      var onEnd = function (e) {
        if (e.target !== moving || e.propertyName !== 'transform') return;
        /* 되돌아 넘길 때 이전 전환의 취소 이벤트는 무시 — 새 transform 전환이 아직 돌고 있다 */
        if (e.type === 'transitioncancel' && moving.getAnimations && moving.getAnimations().some(function (a) { return a.transitionProperty === 'transform'; })) return;
        finish(false);
      };
      moving.addEventListener('transitionend', onEnd);
      moving.addEventListener('transitioncancel', onEnd);
      timer = setTimeout(function () { finish(false); }, 2000);
      pending[k] = finish;
    }
    function render(moving) {
      var was = document.activeElement;
      sheets.forEach(function (s, k) { s.classList.toggle('is-turned', k < i); });
      if (moving) { moving.classList.add('is-moving'); settle(moving); }
      stack();
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === n - 1;
      refocus(was, was === prev ? next : was === next ? prev : null);
      root.dataset.index = String(i);
    }
    function go(d) {
      var t = Math.max(0, Math.min(n - 1, i + d));
      if (t === i) return;
      var moving = sheets[d > 0 ? i : t];
      root.dataset.dir = d > 0 ? 'next' : 'prev';
      i = t;
      render(moving);
    }
    if (prev) prev.addEventListener('click', function () { go(-1); });
    if (next) next.addEventListener('click', function () { go(1); });
    root.addEventListener('keydown', function (e) {
      if (e.target.closest('input, textarea, select, [contenteditable]')) return;
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });
    render(null);
  }

  /* cursor — 자식: [data-zone]?(없으면 루트) [data-cursor](따라다니는 요소)
   * 루트에 --cx/--cy(px), data-side="left|right", .is-in, 클릭 시 .is-click 재시작.
   * 같은 루트에 [data-prev]/[data-next]가 있으면 클릭한 쪽 버튼을 누른다 (carousel 등과 함께 사용).
   * 클릭한 쪽은 클릭 좌표로 다시 계산한다 (터치 탭은 pointermove 없이 click 만 온다) */
  function cursor(root) {
    if (root.hasAttribute('data-cursor-bound')) return; root.setAttribute('data-cursor-bound', '');
    var zone = root.querySelector('[data-zone]') || root;
    function at(e) {
      var r = zone.getBoundingClientRect();
      var x = e.clientX - r.left;
      root.style.setProperty('--cx', x + 'px');
      root.style.setProperty('--cy', (e.clientY - r.top) + 'px');
      root.dataset.side = x < r.width / 2 ? 'left' : 'right';
    }
    zone.addEventListener('pointermove', at);
    zone.addEventListener('pointerenter', function () { root.classList.add('is-in'); });
    zone.addEventListener('pointerleave', function () { root.classList.remove('is-in'); });
    zone.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      if (e.detail) at(e);
      root.classList.remove('is-click'); void root.offsetWidth; root.classList.add('is-click');
      var b = root.querySelector(root.dataset.side === 'left' ? '[data-prev]' : '[data-next]');
      if (b) b.click();
    });
  }

  /* replay — 클릭한 [data-replay] 요소(또는 루트)에 .is-play 를 다시 붙여 애니메이션 재생.
   * 누른 위치를 --x/--y(px)로 넣어 준다 (리플 등). 키보드면 가운데. */
  function replay(root) {
    if (root.hasAttribute('data-replay-bound')) return; root.setAttribute('data-replay-bound', '');
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-replay]') || (root.hasAttribute('data-replay') ? root : null);
      if (!t) return;
      var r = t.getBoundingClientRect();
      var kb = e.detail === 0;
      t.style.setProperty('--x', (kb ? r.width / 2 : e.clientX - r.left) + 'px');
      t.style.setProperty('--y', (kb ? r.height / 2 : e.clientY - r.top) + 'px');
      t.classList.remove('is-play'); void t.offsetWidth; t.classList.add('is-play');
    });
  }

  /* toggle — [data-toggle](또는 루트) 클릭 시 .is-on 토글. role="switch"면 aria-checked, 아니면 aria-pressed */
  function toggle(root) {
    if (root.hasAttribute('data-toggle-bound')) return; root.setAttribute('data-toggle-bound', '');
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-toggle]') || (root.hasAttribute('data-toggle') ? root : null);
      if (!t) return;
      var attr = t.getAttribute('role') === 'switch' ? 'aria-checked' : 'aria-pressed';
      var on = t.getAttribute(attr) !== 'true';
      t.setAttribute(attr, String(on));
      t.classList.toggle('is-on', on);
    });
  }

  /* sequence — 클릭한 [data-steps](또는 루트) 요소에 상태 클래스를 차례로 붙였다 뗀다.
   * data-steps="is-loading:1400,is-done:1400" (클래스:유지ms). 진행 중 재클릭 무시. is-loading 동안 aria-busy */
  function sequence(root) {
    if (root.hasAttribute('data-sequence-bound')) return; root.setAttribute('data-sequence-bound', '');
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-steps]');
      if (!t || !root.contains(t) || t.dataset.busy) return;
      var steps = t.dataset.steps.split(',').map(function (s) { var p = s.split(':'); return [p[0].trim(), parseInt(p[1], 10)]; });
      var k = 0;
      t.dataset.busy = '1';
      (function step() {
        steps.forEach(function (s) { t.classList.remove(s[0]); });
        if (k >= steps.length) { delete t.dataset.busy; t.removeAttribute('aria-busy'); return; }
        var s = steps[k++];
        t.classList.add(s[0]);
        if (s[0] === 'is-loading') t.setAttribute('aria-busy', 'true'); else t.removeAttribute('aria-busy');
        setTimeout(step, s[1]);
      })();
    });
  }

  /* hold — [data-hold="1200"] 요소를 누르고 있으면 .is-holding, 끝까지 누르면 .is-done(1.6초 뒤 해제).
   * 중간에 떼면 취소. 키보드 Space/Enter 도 동일. 주 버튼(왼쪽 클릭·터치·펜)만 받는다 */
  function hold(root) {
    if (root.hasAttribute('data-hold-bound')) return; root.setAttribute('data-hold-bound', '');
    var timer = null, el = null;
    function start(e) {
      if (e.type === 'pointerdown' && e.button !== 0) return;
      var t = e.target.closest('[data-hold]');
      if (!t || !root.contains(t) || t.classList.contains('is-done')) return;
      cancel();
      el = t;
      t.classList.add('is-holding');
      timer = setTimeout(function () {
        t.classList.remove('is-holding');
        t.classList.add('is-done');
        el = null;
        setTimeout(function () { t.classList.remove('is-done'); }, 1600);
      }, parseInt(t.dataset.hold || '1200', 10));
    }
    function cancel() { clearTimeout(timer); if (el) el.classList.remove('is-holding'); el = null; }
    root.addEventListener('pointerdown', start);
    ['pointerup', 'pointerleave', 'pointercancel'].forEach(function (ev) { root.addEventListener(ev, cancel); });
    root.addEventListener('keydown', function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); start(e); } });
    root.addEventListener('keyup', function (e) { if (e.key === ' ' || e.key === 'Enter') cancel(); });
  }

  /* magnetic — 루트(넉넉한 영역) 안에서 포인터를 따라 [data-magnet](또는 루트)에 --mx/--my(px) 설정.
   * 루트 속성: data-strength="0.3". 떠나면 0px. CSS에서 translate: var(--mx,0) var(--my,0) + transition */
  function magnetic(root) {
    if (root.hasAttribute('data-magnetic-bound')) return; root.setAttribute('data-magnetic-bound', '');
    var t = root.querySelector('[data-magnet]') || root;
    var k = parseFloat(root.dataset.strength || '0.3');
    root.addEventListener('pointermove', function (e) {
      var r = root.getBoundingClientRect();
      t.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * k).toFixed(1) + 'px');
      t.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * k).toFixed(1) + 'px');
    });
    root.addEventListener('pointerleave', function () { t.style.setProperty('--mx', '0px'); t.style.setProperty('--my', '0px'); });
  }

  /* spotlight — 포인터 위치를 [data-spot](또는 루트)에 --sx/--sy(px)로 설정 (커서 조명·그라데이션용) */
  function spotlight(root) {
    if (root.hasAttribute('data-spotlight-bound')) return; root.setAttribute('data-spotlight-bound', '');
    root.addEventListener('pointermove', function (e) {
      var t = e.target.closest('[data-spot]') || root;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      t.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  }

  /* direction — 포인터가 들어오고 나간 지점을 [data-dir-target](또는 루트)에 --ex/--ey(px)로, 들어오면 .is-in */
  function direction(root) {
    if (root.hasAttribute('data-direction-bound')) return; root.setAttribute('data-direction-bound', '');
    var t = root.querySelector('[data-dir-target]') || root;
    function at(e) {
      var r = t.getBoundingClientRect();
      t.style.setProperty('--ex', (e.clientX - r.left) + 'px');
      t.style.setProperty('--ey', (e.clientY - r.top) + 'px');
    }
    t.addEventListener('pointerenter', function (e) { at(e); t.classList.add('is-in'); });
    t.addEventListener('pointerleave', function (e) { at(e); t.classList.remove('is-in'); });
  }

  /* segmented — 자식 [data-seg] 버튼들. 선택 시 aria-pressed, 루트에 --seg-x/--seg-w(px), data-index
   * 첫 배치가 끝난 다음 프레임에 data-ready 를 단다 → CSS 에서 [data-ready] 일 때만 transition 을 걸면 처음에 0에서 미끄러져 들어오지 않는다 */
  function segmented(root) {
    if (root.hasAttribute('data-segmented-bound')) return; root.setAttribute('data-segmented-bound', '');
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-seg]'));
    function select(k) {
      items.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === k)); });
      root.style.setProperty('--seg-x', items[k].offsetLeft + 'px');
      root.style.setProperty('--seg-w', items[k].offsetWidth + 'px');
      root.dataset.index = String(k);
    }
    items.forEach(function (b, k) { b.addEventListener('click', function () { select(k); }); });
    select(parseInt(root.dataset.start || '0', 10));
    requestAnimationFrame(function () { requestAnimationFrame(function () { root.dataset.ready = ''; }); });
    if (window.ResizeObserver) new ResizeObserver(function () { select(parseInt(root.dataset.index || '0', 10)); }).observe(root);
  }

  /* menu — 자식 [data-menu-trigger]. 열림/닫힘을 루트 .is-open + aria-expanded 로.
   * 항목(트리거 밖의 버튼) 클릭·바깥 클릭·Esc·포커스가 루트 밖으로 나가면 닫힘 */
  function menu(root) {
    if (root.hasAttribute('data-menu-bound')) return; root.setAttribute('data-menu-bound', '');
    var trigger = root.querySelector('[data-menu-trigger]');
    if (!trigger) return;
    function set(open) { root.classList.toggle('is-open', open); trigger.setAttribute('aria-expanded', String(open)); }
    trigger.addEventListener('click', function () { set(!root.classList.contains('is-open')); });
    root.addEventListener('click', function (e) {
      var b = e.target.closest('button, [role="menuitem"]');
      if (!b || !root.contains(b) || trigger.contains(b)) return;
      var inside = root.contains(document.activeElement);
      set(false);
      if (inside) trigger.focus();
    });
    document.addEventListener('click', function (e) { if (!root.contains(e.target)) set(false); });
    root.addEventListener('focusout', function (e) { if (e.relatedTarget && !root.contains(e.relatedTarget)) set(false); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); trigger.focus(); } });
    set(false);
  }

  window.ARROW_BEHAVIORS = {
    carousel: carousel, scroller: scroller, pager: pager, book: book, cursor: cursor,
    replay: replay, toggle: toggle, sequence: sequence, hold: hold, magnetic: magnetic,
    spotlight: spotlight, direction: direction, segmented: segmented, menu: menu
  };
})();
