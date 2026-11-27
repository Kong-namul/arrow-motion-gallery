/* 화살표·버튼 모션 도감 — 데이터 코어 (SSOT)
 * 카테고리 파일(data/A.js …)이 ARROW_DATA.add([...])로 항목을 넣는다.
 * ARROWS.md는 이 데이터에서 생성된다: node scripts/build-md.mjs
 * 아이콘: 데모 HTML에서 {{i:키}} 로 쓴다. 카테고리 전용 아이콘은 ARROW_DATA.addIcons({'c-키': ARROW_DATA.svg('<path …/>', dx)}) (키 앞에 소문자 카테고리).
 * dx = 광학 보정(viewBox 단위, 오른쪽 +). 방향 있는 꺾쇠·삼각형은 무게중심 기준 값을 넣는다. */
window.ARROW_DATA = (function () {
  'use strict';
  /* 광학 보정: dx(viewBox 단위)만큼 도형을 가리키는 쪽으로 민다. 볼록 외곽선 무게중심이 24×24 중앙에 오는 값.
   * 꺾쇠·속이 찬 도형만 보정하고, 가는 선 몸통 화살표(→)와 바 달린 꺾쇠는 0 (몸통이 무게를 맞춤).
   * <g class="opt"> 의 transform 속성은 아이콘 크기에 비례하고, CSS transform: none 으로 끌 수 있다(갤러리 비교 토글). */
  function svg(inner, dx) {
    var body = dx ? '<g class="opt" transform="translate(' + dx + ' 0)">' + inner + '</g>' : inner;
    return '<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + body + '</svg>';
  }
  var dot = function (cx) { return '<circle cx="' + cx + '" cy="12" r="1.5" fill="currentColor" stroke="none"/>'; };
  var ICONS = {
    'chev-l': svg('<path d="M15 18l-6-6 6-6"/>', -1),
    'chev-r': svg('<path d="M9 18l6-6-6-6"/>', 1),
    'chevs-l': svg('<path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/>', -1.14),
    'chevs-r': svg('<path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/>', 1.14),
    'chev-bar-l': svg('<path d="M17 18l-6-6 6-6"/><path d="M7 6v12"/>'),
    'chev-bar-r': svg('<path d="M7 18l6-6-6-6"/><path d="M17 6v12"/>'),
    'chev-thin-l': svg('<path d="M15 20l-8-8 8-8" stroke-width="1.25"/>', -0.33),
    'chev-thin-r': svg('<path d="M9 20l8-8-8-8" stroke-width="1.25"/>', 0.33),
    'arrow-l': svg('<path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/>'),
    'arrow-r': svg('<path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/>'),
    'arrow-long-l': svg('<path class="shaft" d="M22 12H2"/><path class="head" d="M8 6l-6 6 6 6"/>'),
    'arrow-long-r': svg('<path class="shaft" d="M2 12h20"/><path class="head" d="M16 6l6 6-6 6"/>'),
    'arrow-narrow-l': svg('<path class="shaft" d="M19 12H5"/><path class="head" d="M9 8l-4 4 4 4"/>'),
    'arrow-narrow-r': svg('<path class="shaft" d="M5 12h14"/><path class="head" d="M15 8l4 4-4 4"/>'),
    'arrow-circle-l': svg('<circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M16 12H8"/><path class="head" d="M12 16l-4-4 4-4"/>'),
    'arrow-circle-r': svg('<circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M8 12h8"/><path class="head" d="M12 8l4 4-4 4"/>'),
    'arrow-fat-l': svg('<path d="M20 9h-8V5l-8 7 8 7v-4h8z" fill="currentColor"/>', -0.94),
    'arrow-fat-r': svg('<path d="M4 9h8V5l8 7-8 7v-4H4z" fill="currentColor"/>', 0.94),
    'caret-l': svg('<path d="M15 6v12l-8-6z" fill="currentColor"/>', -0.33),
    'caret-r': svg('<path d="M9 6v12l8-6z" fill="currentColor"/>', 0.33),
    'caret-down': svg('<path d="M6 9l6 6 6-6"/>'),
    'arrow-up-r': svg('<path d="M7 17L17 7"/><path d="M8 7h9v9"/>'),
    'dots': svg(dot(5) + dot(12) + dot(19)),
    'plus': svg('<path d="M12 5v14"/><path d="M5 12h14"/>'),
    'x': svg('<path d="M18 6L6 18"/><path d="M6 6l12 12"/>'),
    'check': svg('<path class="check" d="M20 6L9 17l-5-5"/>'),
    'heart': svg('<path d="M12 20s-7-4.4-9-9C1.8 7.8 3.8 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.2 0 5.2 2.8 4 6-2 4.6-9 9-9 9z"/>'),
    'star': svg('<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>'),
    'bookmark': svg('<path d="M6 3h12v18l-6-4-6 4z"/>'),
    'copy': svg('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/>'),
    'download': svg('<path class="shaft" d="M12 4v11"/><path class="head" d="M7 10l5 5 5-5"/><path d="M5 20h14"/>'),
    'share': svg('<path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/>'),
    'send': svg('<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>'),
    'trash': svg('<path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/>'),
    'bell': svg('<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/>'),
    'menu': svg('<path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/>'),
    'search': svg('<circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/>'),
    'play': svg('<path d="M7 4v16l13-8z" fill="currentColor"/>', 0.67),
    'hand': svg('<path d="M8 13V5a1.5 1.5 0 0 1 3 0v6"/><path d="M11 11V4a1.5 1.5 0 0 1 3 0v7"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L3 14a1.5 1.5 0 0 1 2.4-1.8L8 15"/>'),
    'spinner': svg('<path d="M21 12a9 9 0 1 1-6.2-8.6"/>')
  };
  var CATEGORIES = [
    { key: 'A', name: '캐러셀·슬라이더', desc: '라이브러리 기본값부터 Apple·Netflix·Airbnb·YouTube 같은 실서비스까지. 배치(오버레이/바깥/하단 묶음/엣지 존)와 끝에서의 처리(흐림/숨김/루프)가 핵심 차이다.' },
    { key: 'B', name: '페이지네이션', desc: '디자인 시스템별 이전/다음, 처음/끝(«»), 말줄임 점프, 카운터형, 테이블형. 대부분 짧은 색 페이드(75–250ms)이고 신호는 디테일에 있다.' },
    { key: 'C', name: '화살표 마이크로인터랙션', desc: '호버·클릭 때 화살표가 움직이는 방식. 넛지, 선 늘이기, 루프 통과, 원 그리기, 미리보기 드로어, 마그네틱, 3D 누름 등.' },
    { key: 'D', name: '가로 스크롤', desc: '넘칠 때만 나타나는 화살표, 엣지 페이드·블러, 칩/탭 바 스크롤 버튼, 드래그 스크롤, CSS ::scroll-button · scroll-state 쿼리.' },
    { key: 'E', name: '페이지 넘김·뷰어', desc: '리더 엣지 화살표, 책장 넘김, PDF·라이트박스, 슬라이드쇼, 달력 월 이동, 스토리, 커서가 화살표가 되는 슬라이더.' },
    { key: 'F', name: '아이콘 글리프', desc: '화살표 모양 계열(셰브론·캐럿·화살표·롱·내로우·팻·원형·이중·바 등)과 각 아이콘 라이브러리에서의 이름.' },
    { key: 'G', name: '버튼 모션', desc: '버튼 종류별(프라이머리·아웃라인·고스트·아이콘·로딩·성공·홀드·토글·복사·FAB·스위치 등) 개별 효과 카탈로그.' }
  ];
  var ARROWS = [];

  function add(items) { Array.prototype.push.apply(ARROWS, items); }
  function addIcons(map) { Object.keys(map).forEach(function (k) { ICONS[k] = map[k]; }); }
  function expand(html) { return String(html).replace(/\{\{i:([a-z0-9-]+)\}\}/g, function (_, k) { return ICONS[k] || ''; }); }
  function behaviorsOf(html) {
    var out = [];
    String(html).replace(/data-behavior="([^"]+)"/g, function (_, v) {
      v.split(/\s+/).forEach(function (n) { if (n && out.indexOf(n) < 0) out.push(n); });
      return '';
    });
    return out;
  }
  /* 복사용 동작 코드: 함수 원문 + 연결 한 줄. 이미 연결된 루트(data-<이름>-bound)는 건너뛰어, 두 번 붙여 넣어도 한 번만 연결된다 */
  function jsFor(names, B) {
    return names.map(function (n) {
      return B[n].toString() + '\ndocument.querySelectorAll(\'[data-behavior~="' + n + '"]:not([data-' + n + '-bound])\').forEach(' + n + ');';
    }).join('\n\n');
  }
  var DS_NOTE = '/* 색·폰트·간격·라운드·그림자·모션: 도감 토큰 필요 (assets/tokens.css, 다크모드 포함) */';
  function codeFor(item, B) {
    var names = behaviorsOf(item.demo);
    var out = '<!-- ' + item.id + ' ' + item.name + ' — 출처: ' + item.url + ' -->\n' + expand(item.demo).trim() +
      '\n\n<style>\n' + DS_NOTE + '\n' + item.css.trim() + '\n</style>';
    if (names.length && B) out += '\n\n<script>\n' + jsFor(names, B) + '\n</script>';
    return out + '\n';
  }
  /* 모션 세트 복사 코드: 타이밍 변수(set) + BASE + 호버 스타일(style, 선택) + 버튼 종류 + 마크업 + 동작 JS.
   * style 이 있으면 마크업을 그 스타일 클래스(.hs-*)로 감싼다 — 스타일 CSS 가 그 클래스 아래로 범위 지정돼 있다 */
  function setCode(S, set, B, style) {
    var names = [];
    S.TYPES.forEach(function (t) { behaviorsOf(t.demo).forEach(function (n) { if (names.indexOf(n) < 0) names.push(n); }); });
    var vars = ':root {\n' + S.VARS.map(function (v) { return '  ' + v.name + ': ' + set.vars[v.name] + '; /* ' + v.desc + ' */'; }).join('\n') + '\n}';
    /* 감소 모션: 세트 버튼 루트(.mb, .T##)와 그 안의 모든 전환·애니메이션(자손의 ::before/::after 포함)을 즉시 끝낸다 */
    var roots = ['.mb'].concat(S.TYPES.map(function (t) { return '.' + t.key; }));
    var reduce = '/* 감소 모션 */\n@media (prefers-reduced-motion: reduce) {\n  ' +
      roots.map(function (r) { return r + ', ' + r + ' *, ' + r + '::before, ' + r + '::after, ' + r + ' *::before, ' + r + ' *::after'; }).join(',\n  ') +
      ' {\n    transition-duration: 1ms !important;\n    animation-duration: 1ms !important;\n    animation-iteration-count: 1 !important;\n  }\n}';
    var title = style ? '모션 세트 ' + style.key + ' ' + style.name + ' × ' + set.key + ' ' + set.name + ' — 버튼의 조상에 class="' + style.cls + '"' : '모션 세트 ' + set.key + ' ' + set.name + ' — ' + set.feel;
    var styleCss = style ? '/* ' + style.key + ' ' + style.name + ' (.' + style.cls + ') */\n' + style.css.trim() + '\n\n' : '';
    var markup = S.TYPES.map(function (t) { return '<!-- ' + t.key + ' ' + t.name + ' -->\n' + expand(t.demo).trim(); }).join('\n\n');
    if (style) markup = '<div class="' + style.cls + '">\n' + markup + '\n</div>';
    var out = '<!-- ' + title + ' -->\n<style>\n' + DS_NOTE + '\n' + vars + '\n\n' + S.BASE.trim() + '\n\n' + styleCss +
      S.TYPES.map(function (t) { return '/* ' + t.key + ' ' + t.name + ' */\n' + t.css.trim(); }).join('\n\n') + '\n\n' + reduce + '\n</style>\n\n' + markup;
    if (names.length && B) out += '\n\n<script>\n' + jsFor(names, B) + '\n</script>';
    return out + '\n';
  }
  return { ICONS: ICONS, CATEGORIES: CATEGORIES, ARROWS: ARROWS, add: add, addIcons: addIcons, svg: svg, expand: expand, behaviorsOf: behaviorsOf, jsFor: jsFor, codeFor: codeFor, setCode: setCode };
})();
