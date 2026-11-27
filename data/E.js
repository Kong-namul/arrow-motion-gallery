/* E — 페이지 넘김·뷰어. 출처: research/DE-scroll-pageturn.md ("PAGE TURNING / READERS / VIEWERS" 14개 + "CURSOR-AS-ARROW" 3개) */
(function () {
  'use strict';
  function slides(n, label) {
    var out = '';
    for (var k = 1; k <= n; k++) out += '<div class="slide">' + label + ' ' + k + '</div>';
    return out;
  }
  function pages(n) {
    var out = '';
    for (var k = 1; k <= n; k++) out += '<div class="slide"><span class="t">제' + k + '장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div>';
    return out;
  }
  /* 캐러셀 공통 CSS: 무대를 가득 채우는 슬라이드 트랙 */
  function CAR(id, ms, ease) {
    return '.' + id + ' { position: absolute; inset: 0; }\n' +
      '.' + id + ' .view { position: absolute; inset: 0; overflow: hidden; }\n' +
      '.' + id + ' [data-track] { display: flex; height: 100%; transition: transform ' + ms + ' ' + ease + '; }\n' +
      '.' + id + ' .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }';
  }
  /* 책 공통 CSS */
  function BOOK(id, ms, ease) {
    return '.' + id + ' { position: absolute; inset: 0; }\n' +
      '.' + id + ' .bk { position: absolute; inset: var(--space-4); perspective: 900px; }\n' +
      '.' + id + ' [data-sheet] { position: absolute; top: 0; bottom: 0; left: 50%; width: 50%; transform-origin: left center; transform-style: preserve-3d; transition: transform ' + ms + ' ' + ease + '; }\n' +
      '.' + id + ' [data-sheet].is-turned { transform: rotateY(-180deg); }\n' +
      '.' + id + ' .face { position: absolute; inset: 0; display: grid; place-items: center; backface-visibility: hidden; background: var(--bg-1); color: var(--fg-1); border: 1px solid var(--border); font-size: var(--text-16); line-height: var(--lh-16); font-weight: var(--weight-bold); }\n' +
      '.' + id + ' .front { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }\n' +
      '.' + id + ' .back { border-radius: var(--radius-sm) 0 0 var(--radius-sm); transform: rotateY(180deg); }\n' +
      '.' + id + ' .face::after { content: ""; position: absolute; inset: 0; opacity: 0; pointer-events: none; transition: opacity ' + ms + ' ' + ease + '; }\n' +
      '.' + id + ' .front::after { background: linear-gradient(to right, color-mix(in srgb, var(--fg-1) 22%, transparent), transparent 40%); }\n' +
      '.' + id + ' .back::after { background: linear-gradient(to left, color-mix(in srgb, var(--fg-1) 22%, transparent), transparent 40%); }\n' +
      '.' + id + ' .is-moving .face::after { opacity: 1; }';
  }
  function sheets(n) {
    var out = '';
    for (var k = 0; k < n; k++) out += '<div data-sheet><div class="face front">' + (2 * k + 1) + '쪽</div><div class="face back">' + (2 * k + 2) + '쪽</div></div>';
    return out;
  }
  /* 페이지 본문 흉내(제목 + 줄) 공통 CSS */
  function PAGE(id) {
    return '.' + id + ' .slide { align-content: center; justify-items: start; gap: var(--space-2); padding: var(--space-6) var(--space-7); background: var(--bg-1); color: var(--fg-1); }\n' +
      '.' + id + ' .t { font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); }\n' +
      '.' + id + ' .ln { width: 100%; height: var(--space-2); border-radius: var(--radius-pill); background: var(--border); }\n' +
      '.' + id + ' .ln-s { width: 60%; }';
  }
  function MINI(id) {
    return '.' + id + ' .mini { position: absolute; bottom: var(--space-2); z-index: 3; padding: var(--space-1) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }\n' +
      '.' + id + ' .mini:disabled { opacity: .4; cursor: default; }\n' +
      '.' + id + ' .mini:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }\n' +
      '.' + id + ' .mini-l { left: var(--space-2); } .' + id + ' .mini-r { right: var(--space-2); }';
  }
  var MINIBTN = '<button type="button" class="mini mini-l" data-prev>이전</button><button type="button" class="mini mini-r" data-next>다음</button>';

  var ACT = [1, 2, 3, 4, 5].map(function (k) { return '.E-11[data-index="' + (k - 1) + '"] .s:nth-child(' + k + ') .card'; }).join(',\n') + ' { scale: 1; opacity: 1; }';
  var DAYS = (function () { var o = '<span></span><span></span><span></span>'; for (var d = 1; d <= 30; d++) o += '<span class="' + (d === 15 ? 'd d-on' : 'd') + '">' + d + '</span>'; return o; })();
  var WK = '<span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span>';

  ARROW_DATA.add([
    /* ───────── 리더·슬라이드 엣지 컨트롤 ───────── */
    {
      id: 'E-01', group: '리더·슬라이드 엣지 컨트롤',
      name: 'Reveal.js 셰브론 컨트롤 + 바운스 튜토리얼',
      source: 'reveal.js',
      url: 'https://revealjs.com/config/',
      look: '막대 두 개(2.6em × 0.5em)를 ±45° 로 돌려 만든 셰브론, 3.6em 상자 안. 배치는 오른쪽 아래 묶음(간격 1.4em) 또는 controlsLayout:\'edges\'(500px 이상)로 화면 양옆 세로 중앙.',
      states: '활성 = opacity .9. "조각(fragment)" 상태(이 슬라이드에 남은 단계 있음) = .5. 호버 = 1. controlsBackArrows 로 이전 화살표를 흐리게(.3)·숨김·표시. 데모는 시작 슬라이드의 이전 화살표가 .3 으로 흐리다.',
      motion: { trigger: '호버 / 누름 / 튜토리얼', change: '셰브론 각도 45°→40°(호버)→36°(누름)로 좁아져 쥐어짜는 느낌. 튜토리얼은 다음 화살표가 translateX 10px(20%) → -5px(30%) 로 튄다', timing: '막대 all .15s ease · 버튼 color/opacity/transform .2s ease · bounce-right 2s 50 both ease-out', inferred: false },
      feel: ['얇은 막대', '쥐어짜는 호버', '유도 바운스'],
      fits: ['프레젠테이션', '슬라이드 뷰어'],
      demo: `<div class="E-01" data-behavior="carousel">
  <div class="view"><div data-track>${slides(3, '슬라이드')}</div></div>
  <button type="button" class="arr arr-l" data-prev aria-label="이전 슬라이드"></button>
  <button type="button" class="arr arr-r" data-next aria-label="다음 슬라이드"></button>
</div>`,
      css: CAR('E-01', '.4s', 'ease') + `
.E-01 { font-size: var(--text-16); }
.E-01 .arr { position: absolute; top: 50%; z-index: 2; width: 3.6em; height: 3.6em; margin-top: -1.8em; padding: 0; border: 0; background: none; color: var(--bg-1); opacity: .9; cursor: pointer; transition: color .2s ease, opacity .2s ease, transform .2s ease; }
.E-01 .arr-l { left: 0; } .E-01 .arr-r { right: 0; }
.E-01 .arr::before, .E-01 .arr::after { content: ""; position: absolute; top: calc(50% - .25em); width: 2.6em; height: .5em; border-radius: .25em; background: currentColor; transition: all .15s ease; }
.E-01 .arr-l::before, .E-01 .arr-l::after { left: 1.2em; transform-origin: .25em 50%; }
.E-01 .arr-l::before { rotate: 45deg; } .E-01 .arr-l::after { rotate: -45deg; }
.E-01 .arr-l:hover::before { rotate: 40deg; } .E-01 .arr-l:hover::after { rotate: -40deg; }
.E-01 .arr-l:active::before { rotate: 36deg; } .E-01 .arr-l:active::after { rotate: -36deg; }
.E-01 .arr-r::before, .E-01 .arr-r::after { right: 1.2em; transform-origin: calc(100% - .25em) 50%; }
.E-01 .arr-r::before { rotate: -45deg; } .E-01 .arr-r::after { rotate: 45deg; }
.E-01 .arr-r:hover::before { rotate: -40deg; } .E-01 .arr-r:hover::after { rotate: 40deg; }
.E-01 .arr-r:active::before { rotate: -36deg; } .E-01 .arr-r:active::after { rotate: 36deg; }
.E-01 .arr:hover:not(:disabled), .E-01 .arr:focus-visible { opacity: 1; }
.E-01 .arr:focus-visible { outline: 2px solid var(--bg-1); outline-offset: -.4em; }
.E-01 .arr:disabled { opacity: .3; cursor: default; }
.E-01.is-start .arr-r:not(:hover) { animation: E-01-bounce-right 2s 50 both ease-out; }
@keyframes E-01-bounce-right { 0%, 10%, 25%, 40%, 50% { transform: translateX(0); } 20% { transform: translateX(10px); } 30% { transform: translateX(-5px); } }`
    },
    {
      id: 'E-02', group: '리더·슬라이드 엣지 컨트롤',
      name: 'Apple Books 가장자리 화살표',
      source: 'Apple Books 사용 설명서 · 9to5Mac',
      url: 'https://support.apple.com/guide/books/read-books-ibks5f526382/mac',
      look: 'Mac: "포인터를 책의 오른쪽/왼쪽 가장자리로 옮기면 나타나는 화살표를 클릭". iPhone 은 보이지 않는 여백 탭 영역. 책 위에 크롬이 없는 읽기 화면.',
      states: '평소엔 숨김, 가장자리에 호버해야 화살표가 보인다(데모는 키보드 포커스에서도). 트랙패드 스와이프와 방향키로도 넘긴다. 첫/끝 쪽에서는 해당 가장자리가 비활성.',
      motion: { trigger: '가장자리 호버', change: '화살표 opacity 0→1. 쪽 넘김 스타일은 컬(기본)/슬라이드/없음 중 선택(iOS 16.4 시기), 지속 시간 비공개', timing: 'opacity .2s · 쪽 이동 .3s (둘 다 추정, 공개 수치 없음)', inferred: true },
      feel: ['크롬 없음', '호버 시 등장', '책 읽기'],
      fits: ['전자책 리더', '크롬 없는 읽기 화면'],
      demo: `<div class="E-02" data-behavior="carousel">
  <div class="view"><div data-track>${pages(4)}</div></div>
  <button type="button" class="edge edge-l" data-prev aria-label="이전 쪽"><span class="arr">{{i:chev-l}}</span></button>
  <button type="button" class="edge edge-r" data-next aria-label="다음 쪽"><span class="arr">{{i:chev-r}}</span></button>
</div>`,
      css: CAR('E-02', '.3s', 'ease') + '\n' + PAGE('E-02') + `
.E-02 .edge { position: absolute; top: 0; bottom: 0; z-index: 2; display: grid; place-items: center; width: 12%; padding: 0; border: 0; background: none; color: var(--fg-1); cursor: pointer; }
.E-02 .edge-l { left: 0; } .E-02 .edge-r { right: 0; }
.E-02 .arr { display: grid; opacity: 0; transition: opacity .2s; }
.E-02 .arr .ic { width: 24px; height: 24px; }
.E-02 .edge:hover .arr, .E-02 .edge:focus-visible .arr { opacity: 1; }
.E-02 .edge:disabled { pointer-events: none; }
.E-02 .edge:disabled .arr { opacity: 0; }
.E-02 .edge:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }`
    },
    {
      id: 'E-03', group: '리더·슬라이드 엣지 컨트롤',
      name: '웹 e-리더 가장자리 영역 (Kobo / OverDrive)',
      source: 'Kobo Web Reader · OverDrive 도움말',
      url: 'https://help.kobo.com/hc/en-us/articles/35996239522967-Kobo-Web-Reader-Navigation-Reading-Features',
      look: 'Kobo 는 왼쪽/오른쪽에 호버하면 화살표가 나타나고 아래에 드래그 가능한 원형 스크러버가 있다. OverDrive 는 보이지 않는 클릭/탭 가장자리.',
      states: '데스크톱: 호버로 화살표 노출. 폰: 가장자리 탭 또는 스와이프. Kobo 는 키보드 ←/→ 도 지원. 호버 노출은 포인터 기기에서만(@media (hover:hover)). 데모 스크러버는 위치 표시 전용(드래그 미구현).',
      motion: { trigger: '가장자리 호버', change: '화살표 opacity 0→1, 스크러버 원이 쪽 위치로 이동', timing: '문서 없음 → .2s (추정)', inferred: true },
      feel: ['보이지 않는 가장자리', '스크러버', '읽기 우선'],
      fits: ['웹 e-리더', '도서관 뷰어'],
      demo: `<div class="E-03" data-behavior="carousel">
  <div class="view"><div data-track>${pages(3)}</div></div>
  <button type="button" class="edge edge-l" data-prev aria-label="이전 쪽"><span class="arr">{{i:chev-l}}</span></button>
  <button type="button" class="edge edge-r" data-next aria-label="다음 쪽"><span class="arr">{{i:chev-r}}</span></button>
  <div class="scrub" aria-hidden="true"><span class="thumb"></span></div>
</div>`,
      css: CAR('E-03', '.2s', 'ease') + '\n' + PAGE('E-03') + `
.E-03 .edge { position: absolute; top: 0; bottom: var(--space-6); z-index: 2; display: grid; place-items: center; width: 14%; padding: 0; border: 0; background: none; color: var(--fg-1); cursor: pointer; }
.E-03 .edge-l { left: 0; } .E-03 .edge-r { right: 0; }
.E-03 .arr { display: grid; place-items: center; width: 32px; height: 32px; border-radius: var(--radius-pill); background: var(--bg-2); opacity: 0; transition: opacity .2s; }
.E-03 .arr .ic { width: 18px; height: 18px; }
@media (hover: hover) { .E-03 .edge:hover .arr { opacity: 1; } }
.E-03 .edge:focus-visible .arr { opacity: 1; }
.E-03 .edge:disabled { pointer-events: none; }
.E-03 .edge:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.E-03 .scrub { position: absolute; left: var(--space-7); right: var(--space-7); bottom: var(--space-3); z-index: 3; height: 2px; background: var(--border-strong); }
.E-03 .thumb { position: absolute; top: 50%; left: 0; width: 12px; height: 12px; border-radius: 50%; background: var(--fg-1); translate: -50% -50%; transition: left .2s; }
.E-03[data-index="1"] .thumb { left: 50%; }
.E-03[data-index="2"] .thumb { left: 100%; }`
    },

    /* ───────── 페이지 컬 책장 ───────── */
    {
      id: 'E-04', group: '페이지 컬 책장',
      name: 'turn.js 모서리 필(peel)',
      source: 'turn.js',
      url: 'https://raw.githubusercontent.com/blasten/turn.js/master/turn.js',
      look: '그라디언트 음영(gradients:true)이 있는 사실적인 컬과 양면 펼침. 코너 감지 영역 100px(cornerSize:100).',
      states: '모서리에서 100px 안에 호버하면 접힌 엿보기(corners:\'forward\')가 보인다. 모서리를 드래그하면 쪽이 넘어간다. start 이벤트가 모서리(tl/tr/bl/br)를 알려 준다. 데모는 오른쪽 아래 모서리만 필 + 이전 쪽은 작은 버튼.',
      motion: { trigger: '모서리 호버 / 클릭', change: '엿보기가 접히며 나타남(데모는 44px 접힘), 떠나면 펴진다. 클릭 시 한 장 전체가 spine 기준 회전', timing: '접힘 500ms · 펴짐 800ms · 전체 넘김 duration: 600', inferred: false },
      feel: ['실감 나는 컬', '모서리 엿보기', '양면 펼침'],
      fits: ['잡지·카탈로그 플립북'],
      tall: true,
      demo: `<div class="E-04" data-behavior="book">
  <div class="bk">${sheets(4)}</div>
  <button type="button" class="pv" data-prev aria-label="이전 쪽">{{i:chev-l}}</button>
  <button type="button" class="corner" data-next aria-label="다음 쪽 (오른쪽 아래 모서리)"><span class="fold"></span></button>
</div>`,
      css: BOOK('E-04', '600ms', 'ease-in-out') + `
.E-04 .corner { position: absolute; right: var(--space-4); bottom: var(--space-4); z-index: 40; width: 100px; height: 100px; padding: 0; border: 0; background: none; cursor: pointer; }
.E-04 .corner:disabled { display: none; }
.E-04 .corner:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.E-04 .fold { position: absolute; right: 0; bottom: 0; width: 0; height: 0; background: linear-gradient(315deg, var(--bg-2) 49%, var(--border-strong) 50%, var(--bg-1) 58%); box-shadow: var(--shadow-sm); transition: width 800ms ease, height 800ms ease; }
.E-04 .corner:hover .fold, .E-04 .corner:focus-visible .fold { width: 44px; height: 44px; transition-duration: 500ms; }
.E-04 .pv { position: absolute; left: var(--space-4); bottom: var(--space-4); z-index: 40; display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); cursor: pointer; }
.E-04 .pv .ic { width: 16px; height: 16px; }
.E-04 .pv:disabled { opacity: .4; cursor: default; }
.E-04 .pv:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }`
    },
    {
      id: 'E-05', group: '페이지 컬 책장',
      name: 'StPageFlip / react-pageflip',
      source: 'StPageFlip',
      url: 'https://nodlik.github.io/StPageFlip/',
      look: '캔버스 또는 HTML 위의 페이지 플립. 그림자 포함(drawShadow:true, maxShadowOpacity:1).',
      states: '책 어디를 눌러도 넘어간다(데모는 오른쪽 절반 = 다음, 왼쪽 절반 = 이전). disableFlipByClick:true 면 모서리만. 스와이프는 최소 30px, mobileScrollSupport 켜짐. flipNext(\'top\'|\'bottom\')로 어느 모서리가 말릴지 고른다.',
      motion: { trigger: '클릭 / 스와이프', change: '쪽이 spine 기준으로 회전하며 그림자가 짙어졌다 옅어짐', timing: 'flippingTime: 1000ms (이징은 문서 없음 → ease-in-out 추정), swipeDistance 30', inferred: false },
      feel: ['느긋한 플립', '큰 그림자', '어디든 클릭'],
      fits: ['카탈로그', '전자 앨범'],
      tall: true,
      demo: `<div class="E-05" data-behavior="book">
  <div class="bk">${sheets(4)}</div>
  <button type="button" class="zone zone-l" data-prev aria-label="이전 쪽 (왼쪽 절반)"></button>
  <button type="button" class="zone zone-r" data-next aria-label="다음 쪽 (오른쪽 절반)"></button>
</div>`,
      css: BOOK('E-05', '1000ms', 'ease-in-out') + `
.E-05 .is-moving .face { box-shadow: 0 8px 12px color-mix(in srgb, var(--fg-1) 40%, transparent); }
.E-05 .zone { position: absolute; top: var(--space-4); bottom: var(--space-4); z-index: 40; width: calc(50% - var(--space-4)); padding: 0; border: 0; background: none; cursor: pointer; }
.E-05 .zone-l { left: var(--space-4); } .E-05 .zone-r { right: var(--space-4); }
.E-05 .zone:disabled { cursor: default; }
.E-05 .zone:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -4px; }`
    },

    /* ───────── 뷰어·라이트박스·스토리 ───────── */
    {
      id: 'E-06', group: '뷰어·라이트박스·스토리',
      name: 'pdf.js 툴바 이전/다음',
      source: 'Mozilla pdf.js',
      url: 'https://raw.githubusercontent.com/mozilla/pdf.js/master/web/viewer.css',
      look: '툴바 아이콘 버튼을 mask-image 로 그린다(toolbarButton-pageUp/pageDown.svg — 문서가 세로로 스크롤되므로 위/아래). 옆에 폭 40px 오른쪽 정렬 쪽 번호 입력.',
      states: '비활성(첫/끝 쪽) = opacity .5 + pointer-events none. 호버/focus-visible 은 --button-hover-color.',
      motion: { trigger: '클릭', change: '쪽 번호만 즉시 바뀜 (입력은 transition-property: none)', timing: '없음 (일부러 즉각적·실용적)', inferred: false },
      feel: ['즉각적', '실용 툴바', '위/아래'],
      fits: ['문서 뷰어', 'PDF 리더'],
      demo: `<div class="E-06" data-behavior="pager" data-total="12">
  <div class="bar" role="toolbar" aria-label="문서 도구 모음">
    <button type="button" class="tb tb-up" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
    <button type="button" class="tb tb-down" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
    <span class="pn" data-label aria-live="polite"></span>
  </div>
  <div class="doc" aria-hidden="true"><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span><span class="ln"></span></div>
</div>`,
      css: `.E-06 { width: 100%; max-width: 256px; display: grid; gap: var(--space-3); }
.E-06 .bar { display: flex; align-items: center; gap: var(--space-1); padding: var(--space-1) var(--space-2); border-radius: var(--radius-md); background: var(--bg-1); box-shadow: var(--shadow-sm); }
.E-06 .tb { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 0; border-radius: var(--radius-sm); background: none; color: var(--fg-1); cursor: pointer; transition-property: none; }
.E-06 .tb-up .ic { rotate: 90deg; } .E-06 .tb-down .ic { rotate: 90deg; }
.E-06 .tb .ic { width: 18px; height: 18px; }
.E-06 .tb:hover, .E-06 .tb:focus-visible { background: color-mix(in srgb, var(--fg-1) 12%, transparent); }
.E-06 .tb:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.E-06 .tb:disabled { opacity: .5; pointer-events: none; }
.E-06 .pn { margin-left: auto; min-width: 56px; padding: var(--space-1) var(--space-2); border: 1px solid var(--border); border-radius: var(--radius-sm); font-size: var(--text-14); line-height: var(--lh-14); text-align: right; color: var(--fg-1); transition-property: none; }
.E-06 .doc { display: grid; gap: var(--space-2); padding: var(--space-4); border-radius: var(--radius-sm); background: var(--bg-1); }
.E-06 .ln { height: var(--space-2); border-radius: var(--radius-pill); background: var(--border); }
.E-06 .ln-s { width: 60%; }`
    },
    {
      id: 'E-07', group: '뷰어·라이트박스·스토리',
      name: 'PhotoSwipe v5 옆 화살표',
      source: 'PhotoSwipe',
      url: 'https://photoswipe.com/styling/',
      look: '보이지 않는 큰 터치 영역 75×100px, 세로 중앙(top 50%, margin-top -50px), 가장자리에 붙음. 32px 아이콘은 14px 안쪽. "다음"은 이전 아이콘을 좌우 반전(scale(-1,1)). 어떤 사진 위에서도 읽히도록 흰 아이콘 + #4f4f4f 2px 외곽선.',
      states: '터치에서는 숨김(.pswp--touch → visibility hidden), 마우스가 감지되면(.pswp--has_mouse) 표시. 끝에서는 display none. 슬라이드 1장이면 숨김. 데모는 3초 후 UI 가 페이드(idle)되고 호버/포커스에 복귀.',
      motion: { trigger: 'UI 표시/숨김 (idle)', change: '불투명도 .005 ↔ 1', timing: '--pswp-transition-duration 333ms, cubic-bezier(0.4,0,0.22,1)', inferred: false },
      feel: ['큰 히트 영역', '외곽선 아이콘', '사진 위에서도 선명'],
      fits: ['사진 라이트박스', '갤러리'],
      demo: `<div class="E-07" data-behavior="carousel">
  <div class="view"><div data-track>${slides(3, '사진')}</div></div>
  <button type="button" class="pa pa-l" data-prev aria-label="이전">{{i:chev-l}}</button>
  <button type="button" class="pa pa-r" data-next aria-label="다음">{{i:chev-l}}</button>
</div>`,
      css: CAR('E-07', '.4s', 'ease') + `
.E-07 .pa { position: absolute; top: 50%; z-index: 2; width: 75px; height: 100px; margin-top: -50px; padding: 0; border: 0; background: none; color: var(--bg-1); cursor: pointer; opacity: 1; transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); animation: E-07-idle 333ms cubic-bezier(0.4, 0, 0.22, 1) 3s forwards; }
.E-07 .pa-l { left: 0; } .E-07 .pa-r { right: 0; }
.E-07 .pa .ic { position: absolute; top: 50%; width: 32px; height: 32px; margin-top: -16px; stroke-width: 2.5; filter: drop-shadow(0 0 1px var(--fg-1)) drop-shadow(0 0 1px var(--fg-1)); }
.E-07 .pa-l .ic { left: 14px; }
.E-07 .pa-r .ic { right: 14px; scale: -1 1; }
.E-07:hover .pa, .E-07:focus-within .pa { animation: none; opacity: 1; }
.E-07 .pa:disabled { display: none; }
.E-07 .pa:focus-visible { outline: 2px solid var(--bg-1); outline-offset: -4px; }
@media (hover: none) { .E-07 .pa { visibility: hidden; } }
@keyframes E-07-idle { to { opacity: .005; } }`
    },
    {
      id: 'E-08', group: '뷰어·라이트박스·스토리',
      name: 'GLightbox 박스형 화살표',
      source: 'GLightbox',
      url: 'https://raw.githubusercontent.com/biati-digital/glightbox/master/src/postcss/glightbox.css',
      look: 'clean 스킨: 40×50px 상자, rgba(0,0,0,.75), 반경 4px, 가장자리에서 30px. 중·소 화면에서는 top 45%, 배경 rgba(0,0,0,.32), 호버 .7.',
      states: '.disabled = opacity .1. 닫을 때 화살표는 opacity 0 으로 즉시 사라짐. 슬라이드 들어올 때 gslideInRight/gslideOutLeft 애니메이션은 데모에서 생략(트랙 이동으로 대체).',
      motion: { trigger: '화살표 클릭', change: '슬라이드가 translate3d(±60%) + 페이드로 들어오고 나감, 슬라이더 transform 이동', timing: '슬라이드 .3s ease · 슬라이더 transform .4s ease', inferred: false },
      feel: ['진한 상자', '묵직', '표준 라이트박스'],
      fits: ['이미지 라이트박스'],
      demo: `<div class="E-08" data-behavior="carousel">
  <div class="view"><div data-track>${slides(3, '사진')}</div></div>
  <button type="button" class="ga ga-l" data-prev aria-label="이전">{{i:chev-l}}</button>
  <button type="button" class="ga ga-r" data-next aria-label="다음">{{i:chev-r}}</button>
</div>`,
      css: CAR('E-08', '.4s', 'ease') + `
.E-08 .ga { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: 40px; height: 50px; margin-top: -25px; padding: 0; border: 0; border-radius: 4px; background: color-mix(in srgb, var(--fg-1) 75%, transparent); color: var(--bg-1); cursor: pointer; }
.E-08 .ga-l { left: 30px; } .E-08 .ga-r { right: 30px; }
.E-08 .ga .ic { width: 24px; height: 24px; }
.E-08 .ga:disabled { opacity: .1; cursor: default; }
.E-08 .ga:focus-visible { outline: 2px solid var(--bg-1); outline-offset: 2px; }
@media (max-width: 768px) {
  .E-08 .ga { top: 45%; background: color-mix(in srgb, var(--fg-1) 32%, transparent); }
  .E-08 .ga:hover { background: color-mix(in srgb, var(--fg-1) 70%, transparent); }
}`
    },
    {
      id: 'E-09', group: '뷰어·라이트박스·스토리',
      name: 'lightGallery 유휴 숨김 화살표 + 끝 바운스',
      source: 'lightGallery',
      url: 'https://unpkg.com/lightgallery@2.7.2/css/lightgallery.css',
      look: '22px 아이콘 폰트 글리프를 rgba(0,0,0,.45) 상자에 담음, 패딩 8px 10px 9px, 반경 2px. 색 #999, 호버 #fff.',
      states: '.disabled = opacity 0 (hideControlOnEnd). 유휴(.lg-hide-items)면 이전은 왼쪽으로, 다음은 오른쪽으로 10px 밀리며 사라짐. 첫 오픈 시 showBarsAfter 10000ms. 데모는 3초 후 유휴, 호버/포커스에 복귀. 마지막 장에 도착하면 러버밴드 1회.',
      motion: { trigger: '유휴 / 마지막 장 도착', change: '유휴: 화살표 ±10px 이동 + 페이드. 끝: lg-right-end 로 left 0 → -30px → 0', timing: 'transform·opacity .25s cubic-bezier(0,0,.25,1) · 슬라이드 400ms ease · 끝 바운스 .3s · 스와이프 임계 50px', inferred: false },
      feel: ['유휴 시 물러남', '러버밴드 끝', '작은 상자'],
      fits: ['사진 갤러리'],
      demo: `<div class="E-09" data-behavior="carousel">
  <div class="view"><div data-track>${slides(3, '사진')}</div></div>
  <button type="button" class="la la-l" data-prev aria-label="이전">{{i:chev-l}}</button>
  <button type="button" class="la la-r" data-next aria-label="다음">{{i:chev-r}}</button>
</div>`,
      css: CAR('E-09', '400ms', 'ease') + `
.E-09 .la { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; margin-top: -20px; padding: 8px 10px 9px; border: 0; border-radius: 2px; background: color-mix(in srgb, var(--fg-1) 45%, transparent); color: var(--bg-2); cursor: pointer; transition: transform .25s cubic-bezier(0, 0, .25, 1), opacity .25s cubic-bezier(0, 0, .25, 1), color .25s; }
.E-09 .la-l { left: 0; animation: E-09-idle-l .25s cubic-bezier(0, 0, .25, 1) 3s forwards; }
.E-09 .la-r { right: 0; animation: E-09-idle-r .25s cubic-bezier(0, 0, .25, 1) 3s forwards; }
.E-09 .la .ic { width: 22px; height: 22px; }
.E-09 .la:hover { color: var(--bg-1); }
.E-09:hover .la, .E-09:focus-within .la { animation: none; opacity: 1; transform: none; }
.E-09 .la:disabled { opacity: 0; cursor: default; }
.E-09 .la:focus-visible { outline: 2px solid var(--bg-1); outline-offset: 2px; }
.E-09.is-end [data-track] { animation: E-09-end .3s; }
@keyframes E-09-idle-l { to { opacity: 0; transform: translate3d(-10px, 0, 0); } }
@keyframes E-09-idle-r { to { opacity: 0; transform: translate3d(10px, 0, 0); } }
@keyframes E-09-end { 0%, 100% { translate: 0 0; } 50% { translate: -30px 0; } }`
    },
    {
      id: 'E-10', group: '뷰어·라이트박스·스토리',
      name: 'Fancybox v5 떠 있는 원형 화살표',
      source: 'Fancyapps Fancybox',
      url: 'https://fancyapps.com/carousel/plugins/arrows',
      look: '38px 흰 원(--f-arrow-border-radius:50%), 16px SVG 선 두께 2.5, 색 #475569, 이중 부드러운 그림자, 가장자리에서 10px. 호버 #f9f9f9, 누름 #f0f0f0 (데모는 DS 토큰으로 대체).',
      states: '화살표는 페이지 수와 무한 모드(infinite)에 맞춰 갱신된다. idle 은 기본 false, ms 를 주면 UI 자동 숨김. 데모는 무한 순환이라 끝에서도 비활성이 안 된다.',
      motion: { trigger: '화살표 클릭 / 방향키', change: 'ArrowLeft → 이전, ArrowRight → 다음. 콘텐츠는 열 때 f-zoomInUp, 닫을 때 f-fadeOut', timing: '화살표 자체 전환 없음 (색만 즉시 변경) · 슬라이드 이동 .4s ease는 데모 값', inferred: true },
      feel: ['깨끗한 흰 원', '부유', '사진 위'],
      fits: ['이미지 팝업', '갤러리'],
      demo: `<div class="E-10" data-behavior="carousel" data-loop>
  <div class="view"><div data-track>${slides(3, '사진')}</div></div>
  <button type="button" class="fa fa-l" data-prev aria-label="이전">{{i:chev-l}}</button>
  <button type="button" class="fa fa-r" data-next aria-label="다음">{{i:chev-r}}</button>
</div>`,
      css: CAR('E-10', '.4s', 'ease') + `
.E-10 .fa { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: 38px; height: 38px; margin-top: -19px; padding: 0; border: 0; border-radius: 50%; background: var(--bg-1); color: var(--fg-2); box-shadow: 0 6px 12px -2px color-mix(in srgb, var(--fg-1) 25%, transparent), 0 3px 7px -3px color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: pointer; }
.E-10 .fa-l { left: 10px; } .E-10 .fa-r { right: 10px; }
.E-10 .fa .ic { width: 16px; height: 16px; stroke-width: 2.5; }
.E-10 .fa:hover { background: var(--bg-2); }
.E-10 .fa:active { background: var(--border-subtle); }
.E-10 .fa:focus-visible { outline: 2px solid var(--bg-1); outline-offset: 2px; }`
    },
    {
      id: 'E-11', group: '뷰어·라이트박스·스토리',
      name: 'Instagram 스토리 데스크톱',
      source: 'Tubefilter · Engadget',
      url: 'https://www.tubefilter.com/2021/01/29/instagram-revamps-user-interface-stories-desktops/',
      look: '현재 스토리가 가운데, 앞/뒤 화살표. "앞 두 개, 뒤 두 개" 스토리가 클릭 가능한 옆 미리보기로 보인다. 데모는 카드 바깥쪽 작은 원형 화살표 + 약 0.6 배 미리보기 (추정).',
      states: '키보드 방향키가 화살표와 동일하게 동작. 모바일은 좌/우 탭 영역.',
      motion: { trigger: '화살표 클릭 / 방향키', change: '이웃 카드로 캐러셀 이동, 가운데 카드는 1 배, 이웃은 0.6 배로 축소', timing: '문서 없음 → .3s ease (추정)', inferred: true },
      feel: ['가운데 강조', '이웃 미리보기', '세로 카드'],
      fits: ['스토리 뷰어', '미리보기 캐러셀'],
      tall: true,
      demo: `<div class="E-11" data-behavior="carousel" data-step="20">
  <div class="view"><div class="trk" data-track>${[1, 2, 3, 4, 5].map(function (k) { return '<div class="s"><div class="card">스토리 ' + k + '</div></div>'; }).join('')}</div></div>
  <button type="button" class="ar ar-l" data-prev aria-label="이전 스토리">{{i:chev-l}}</button>
  <button type="button" class="ar ar-r" data-next aria-label="다음 스토리">{{i:chev-r}}</button>
</div>`,
      css: `.E-11 { position: absolute; inset: 0; }
.E-11 .view { position: absolute; inset: var(--space-4) 0; overflow: hidden; }
.E-11 .trk { display: flex; width: 200%; height: 100%; margin-left: 30%; transition: transform .3s ease; }
.E-11 .s { flex: none; display: grid; place-items: center; width: 20%; }
.E-11 .card { display: grid; place-items: center; width: 90%; height: 100%; border-radius: var(--radius-md); background: var(--fg-3); color: var(--bg-1); font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); scale: .6; opacity: .5; transition: scale .3s ease, opacity .3s ease; }
${ACT}
.E-11 .ar { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: 32px; height: 32px; margin-top: -16px; padding: 0; border: 0; border-radius: 50%; background: var(--bg-1); color: var(--fg-1); box-shadow: var(--shadow-md); cursor: pointer; }
.E-11 .ar-l { left: var(--space-2); } .E-11 .ar-r { right: var(--space-2); }
.E-11 .ar .ic { width: 16px; height: 16px; }
.E-11 .ar:disabled { opacity: .4; cursor: default; }
.E-11 .ar:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }`
    },

    /* ───────── 달력·단계 이동 ───────── */
    {
      id: 'E-12', group: '달력·단계 이동',
      name: 'MUI X DateCalendar 월 셰브론',
      source: 'MUI X Date Pickers',
      url: 'https://raw.githubusercontent.com/mui/mui-x/master/packages/x-date-pickers/src/DateCalendar/PickersSlideTransition.tsx',
      look: '왼쪽에 월 라벨과 뷰 캐럿, 오른쪽에 이전/다음 셰브론(PickersArrowSwitcher).',
      states: 'minDate/maxDate/disablePast/disableFuture 로 화살표 비활성(데모는 1월/12월 끝에서). 연도 뷰에서는 캐럿이 180° 회전. reduceAnimations 로 슬라이드를 끈다.',
      motion: { trigger: '월 이동 클릭', change: '날짜 그리드가 들어오는 달이 translate(±100%)에서 0 으로 슬라이드, 라벨은 크로스페이드', timing: '375ms (duration.complex) cubic-bezier(0.35,0.8,0.4,1)', inferred: false },
      feel: ['슬라이드 전환', '머티리얼', '라벨 크로스페이드'],
      fits: ['날짜 선택기', '월 달력'],
      tall: true,
      demo: `<div class="E-12" data-behavior="pager" data-labels="1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월" data-start="4">
  <div class="hd">
    <span class="mon"><span class="lb" data-label aria-live="polite"></span>{{i:caret-down}}</span>
    <span class="nv">
      <button type="button" data-prev aria-label="이전 달">{{i:chev-l}}</button>
      <button type="button" data-next aria-label="다음 달">{{i:chev-r}}</button>
    </span>
  </div>
  <div class="wk" aria-hidden="true">${WK}</div>
  <div class="clip"><div class="grid" aria-hidden="true">${DAYS}</div></div>
</div>`,
      css: `.E-12 { width: 100%; max-width: 252px; background: var(--bg-1); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); }
.E-12 .hd { display: flex; align-items: center; justify-content: space-between; height: 32px; }
.E-12 .mon { display: inline-flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); color: var(--fg-1); }
.E-12 .mon .ic { width: 16px; height: 16px; }
.E-12 .lb.is-anim { animation: E-12-fade 375ms cubic-bezier(0.35, 0.8, 0.4, 1); }
.E-12 .nv { display: flex; }
.E-12 .nv button { display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 0; border-radius: var(--radius-pill); background: none; color: var(--fg-2); cursor: pointer; }
.E-12 .nv button:hover { background: var(--bg-2); }
.E-12 .nv button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.E-12 .nv button:disabled { opacity: .38; cursor: default; background: none; }
.E-12 .nv .ic { width: 18px; height: 18px; }
.E-12 .wk, .E-12 .grid { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: var(--text-14); line-height: 24px; }
.E-12 .wk { color: var(--fg-3); }
.E-12 .clip { overflow: hidden; }
.E-12 .d { color: var(--fg-1); }
.E-12 .d-on { border-radius: var(--radius-pill); background: var(--fg-1); color: var(--bg-1); }
.E-12[data-dir="next"]:has(.lb.is-anim) .grid { animation: E-12-in-next 375ms cubic-bezier(0.35, 0.8, 0.4, 1); }
.E-12[data-dir="prev"]:has(.lb.is-anim) .grid { animation: E-12-in-prev 375ms cubic-bezier(0.35, 0.8, 0.4, 1); }
@keyframes E-12-in-next { from { transform: translateX(100%); } }
@keyframes E-12-in-prev { from { transform: translateX(-100%); } }
@keyframes E-12-fade { from { opacity: 0; } }`
    },
    {
      id: 'E-13', group: '달력·단계 이동',
      name: 'React DayPicker v9 내비게이션',
      source: 'React DayPicker',
      url: 'https://daypicker.dev/docs/navigation',
      look: '내비게이션 버튼은 2.25rem(36px) 정사각형. 셰브론은 강조색으로 채워진 모양(데모는 채운 캐럿 + fg-1).',
      states: 'startMonth/endMonth 한계에서 비활성 opacity .5. 문서는 prefers-reduced-motion 에서 애니메이션을 끌 수 있다고 안내.',
      motion: { trigger: '월 이동 클릭', change: 'animate 속성이 월을 translateX(±100%)↔0 으로 슬라이드, 캡션은 페이드 인/아웃', timing: '--rdp-animation_duration: .3s, cubic-bezier(0.4,0,0.2,1)', inferred: false },
      feel: ['채운 캐럿', '큰 버튼', '가벼운 슬라이드'],
      fits: ['예약 달력', '날짜 선택기'],
      tall: true,
      demo: `<div class="E-13" data-behavior="pager" data-labels="2026년 9월,2026년 10월,2026년 11월,2026년 12월,2027년 1월" data-start="2">
  <div class="hd">
    <span class="cap" data-label aria-live="polite"></span>
    <span class="nv">
      <button type="button" data-prev aria-label="이전 달">{{i:caret-l}}</button>
      <button type="button" data-next aria-label="다음 달">{{i:caret-r}}</button>
    </span>
  </div>
  <div class="wk" aria-hidden="true">${WK}</div>
  <div class="clip"><div class="grid" aria-hidden="true">${DAYS}</div></div>
</div>`,
      css: `.E-13 { --rdp-animation_duration: .3s; --rdp-nav_button-disabled-opacity: .5; width: 100%; max-width: 252px; background: var(--bg-1); border-radius: var(--radius-md); padding: var(--space-1) var(--space-3); }
.E-13 .hd { display: flex; align-items: center; justify-content: space-between; height: 36px; }
.E-13 .cap { font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); color: var(--fg-1); }
.E-13 .cap.is-anim { animation: E-13-fade var(--rdp-animation_duration) cubic-bezier(0.4, 0, 0.2, 1); }
.E-13 .nv { display: flex; }
.E-13 .nv button { display: grid; place-items: center; width: 36px; height: 36px; padding: 0; border: 0; border-radius: var(--radius-sm); background: none; color: var(--fg-1); cursor: pointer; }
.E-13 .nv button:hover { background: var(--bg-2); }
.E-13 .nv button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.E-13 .nv button:disabled { opacity: var(--rdp-nav_button-disabled-opacity); cursor: default; background: none; }
.E-13 .nv .ic { width: 16px; height: 16px; }
.E-13 .wk, .E-13 .grid { display: grid; grid-template-columns: repeat(7, 1fr); text-align: center; font-size: var(--text-14); line-height: 24px; }
.E-13 .wk { color: var(--fg-3); }
.E-13 .clip { overflow: hidden; }
.E-13 .d { color: var(--fg-1); }
.E-13 .d-on { border-radius: var(--radius-sm); background: var(--fg-1); color: var(--bg-1); }
.E-13[data-dir="next"]:has(.cap.is-anim) .grid { animation: E-13-in-next var(--rdp-animation_duration) cubic-bezier(0.4, 0, 0.2, 1); }
.E-13[data-dir="prev"]:has(.cap.is-anim) .grid { animation: E-13-in-prev var(--rdp-animation_duration) cubic-bezier(0.4, 0, 0.2, 1); }
@keyframes E-13-in-next { from { transform: translateX(100%); } }
@keyframes E-13-in-prev { from { transform: translateX(-100%); } }
@keyframes E-13-fade { from { opacity: 0; } }`
    },
    {
      id: 'E-14', group: '달력·단계 이동',
      name: 'CSS 전용 단계 마법사 (스냅 + 마커)',
      source: 'chrome.dev carousel 예제',
      url: 'https://chrome.dev/carousel/horizontal/wizard/',
      look: '스냅 스크롤러 안의 3단계 폼. "다음 단계" 앵커 링크(#step-2)와 "완료" 버튼. 데모는 id 를 쓸 수 없어 앵커 대신 스크롤러 버튼으로 이동한다.',
      states: 'scroll-state() 쿼리로 화면 밖 단계를 inert 처리하고 스크롤 마커가 단계 표시기 역할(데모는 inert 생략). 마커는 ::scroll-marker 지원 브라우저(Chromium)에서만 보인다. Chromium 에서는 ::scroll-button 으로 이전/다음을 짝지을 수 있다.',
      motion: { trigger: '다음/이전 클릭', change: '다음 단계로 스냅 스크롤', timing: '네이티브 스냅 스크롤 (smooth 가 켜져 있으면 부드럽게, 수치 없음)', inferred: false },
      feel: ['단계형', '스냅', '마커 표시기'],
      fits: ['가입 폼', '온보딩'],
      tall: true,
      demo: `<div class="E-14" data-behavior="scroller" data-step="1">
  <div class="steps" data-scroller tabindex="0" aria-label="3단계 폼">
    <div class="step"><p class="t">1단계 · 이름</p><span class="fld"></span></div>
    <div class="step"><p class="t">2단계 · 연락처</p><span class="fld"></span><span class="fld"></span></div>
    <div class="step"><p class="t">3단계 · 확인</p><span class="fld"></span><button type="button" class="fin">완료</button></div>
  </div>
  <div class="ft">
    <button type="button" class="b" data-prev>이전</button>
    <button type="button" class="b b-p" data-next>다음 단계</button>
  </div>
</div>`,
      css: `.E-14 { width: 100%; max-width: 256px; border-radius: var(--radius-md); background: var(--bg-1); }
.E-14 .steps { display: flex; overflow-x: auto; scrollbar-width: none; scroll-snap-type: x mandatory; scroll-marker-group: after; }
.E-14 .steps::-webkit-scrollbar { display: none; }
.E-14 .step { flex: none; width: 100%; box-sizing: border-box; display: grid; align-content: start; gap: var(--space-2); min-height: 112px; padding: var(--space-4); scroll-snap-align: start; }
.E-14 .t { margin: 0; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); color: var(--fg-1); }
.E-14 .fld { height: 28px; border: 1px solid var(--border); border-radius: var(--radius-sm); background: var(--bg-2); }
.E-14 .fin { justify-self: start; padding: var(--space-1) var(--space-4); border: 0; border-radius: var(--radius-pill); background: var(--fg-1); color: var(--bg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.E-14 .ft { display: flex; justify-content: space-between; padding: var(--space-2) var(--space-4) var(--space-4); }
.E-14 .b { padding: var(--space-1) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.E-14 .b-p { border-color: var(--fg-1); background: var(--fg-1); color: var(--bg-1); }
.E-14 .b:disabled { opacity: .4; cursor: default; }
.E-14 .b:focus-visible, .E-14 .fin:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
@supports selector(::scroll-marker) {
  .E-14 .steps::scroll-marker-group { display: flex; justify-content: center; gap: var(--space-2); padding-block: var(--space-2); }
  .E-14 .step::scroll-marker { content: ""; width: 8px; height: 8px; border-radius: 50%; background: var(--border-strong); }
  .E-14 .step::scroll-marker:target-current { background: var(--fg-1); }
}`
    },

    /* ───────── 커서 화살표 ───────── */
    {
      id: 'E-15', group: '커서 화살표',
      name: '반반 나눠 바뀌는 네이티브 커서',
      source: 'Tuts+ — 커서 모양 CSS 조작',
      url: 'https://webdesign.tutsplus.com/quick-tip-how-to-manipulate-cursor-appearance-with-css--cms-31825t',
      look: 'OS 커서를 32×32 SVG 화살표로 바꾸고 핫스팟은 16 16. (데모는 DS 색을 쓰려고 같은 크기의 따라다니는 요소로 흉내 냈다.)',
      states: 'xPos = e.pageX - img.offsetLeft 로 위치를 구해, 절반을 넘으면 .cursor-next, 아니면 .cursor-prev 클래스를 붙인다. 클릭하면 그쪽으로 이동. 영역 밖에서는 일반 커서.',
      motion: { trigger: '포인터 이동 / 절반 경계 통과', change: '커서 화살표가 ◀ ↔ ▶ 로 즉시 교체', timing: '즉시 (네이티브 커서는 애니메이션 불가)', inferred: false },
      feel: ['즉각적', '반반 구역', '네이티브'],
      fits: ['사진 슬라이더', '프레젠테이션'],
      demo: `<div class="E-15" data-behavior="carousel cursor">
  <div class="view" data-zone><div data-track>${slides(3, '사진')}</div></div>
  <span class="cur" data-cursor aria-hidden="true"><span class="c-l">{{i:arrow-long-l}}</span><span class="c-r">{{i:arrow-long-r}}</span></span>
  ${MINIBTN}
</div>`,
      css: CAR('E-15', '.4s', 'ease') + '\n' + MINI('E-15') + `
.E-15 .view { cursor: none; }
.E-15 .cur { position: absolute; z-index: 4; left: var(--cx, 50%); top: var(--cy, 50%); display: none; width: 32px; height: 32px; translate: -50% -50%; color: var(--bg-1); pointer-events: none; }
.E-15.is-in .cur { display: block; }
.E-15 .cur .ic { width: 32px; height: 32px; stroke-width: 2.5; }
.E-15[data-side="left"] .c-r, .E-15:not([data-side="left"]) .c-l { display: none; }`
    },
    {
      id: 'E-16', group: '커서 화살표',
      name: '화살표/"Drag" 라벨 팔로워 블롭 (Cuberto)',
      source: 'Cuberto mouse-follower',
      url: 'https://github.com/Cuberto/mouse-follower',
      look: '48px 원. 아이콘 상태는 scale 1.5(setIcon(\'arrow-left\')). 텍스트 상태는 scale 1.7, opacity .85(예: "Drag"). 링크 위에서는 .15 로 줄어든다. 데모는 아이콘 상태만(텍스트 상태는 생략).',
      states: 'data-cursor-icon / data-cursor-text 속성으로 지정. hideOnLeave 는 300ms 타임아웃. 숨김 = scale 0. 누름 = scale 1.6 (.2s).',
      motion: { trigger: '포인터 이동 / 진입 / 클릭', change: '위치는 GSAP 로 따라오며(expo.out) 지연, 상태 전환은 scale 변화. 이동 방향으로 skew 2. 데모는 left/top transition 으로 근사(skew 생략)', timing: '위치 GSAP 0.55s ease expo.out (≈ cubic-bezier(0.16,1,0.3,1)) · 상태 transform .25s ease-in-out, opacity .1s · 누름 .2s', inferred: false },
      feel: ['미끄러지는 팔로워', '쫀득한 지연', '라벨 변신'],
      fits: ['포트폴리오 슬라이더', '에이전시 사이트'],
      demo: `<div class="E-16" data-behavior="carousel cursor">
  <div class="view" data-zone><div data-track>${slides(3, '작업')}</div></div>
  <span class="cur" data-cursor aria-hidden="true"><span class="c-l">{{i:arrow-l}}</span><span class="c-r">{{i:arrow-r}}</span></span>
  ${MINIBTN}
</div>`,
      css: CAR('E-16', '.4s', 'ease') + '\n' + MINI('E-16') + `
.E-16 .view { cursor: none; }
.E-16 .cur { position: absolute; z-index: 4; left: var(--cx, 50%); top: var(--cy, 50%); display: grid; place-items: center; width: 48px; height: 48px; margin: -24px 0 0 -24px; border-radius: 50%; background: var(--bg-1); color: var(--fg-1); pointer-events: none; scale: 0; transition: left .55s cubic-bezier(0.16, 1, 0.3, 1), top .55s cubic-bezier(0.16, 1, 0.3, 1), scale .25s ease-in-out, opacity .1s; }
.E-16.is-in .cur { scale: 1.5; }
.E-16.is-click .cur { animation: E-16-press .2s; }
.E-16 .cur .ic { width: 16px; height: 16px; }
.E-16[data-side="left"] .c-r, .E-16:not([data-side="left"]) .c-l { display: none; }
@keyframes E-16-press { 0%, 100% { scale: 1.5; } 50% { scale: 1.6; } }`
    },
    {
      id: 'E-17', group: '커서 화살표',
      name: 'quickTo 팔로워 + 180° 플립 큐',
      source: 'GSAP quickTo · Squarespace 튜토리얼',
      url: 'https://gsap.com/docs/v3/GSAP/gsap.quickTo()/',
      look: '102×102px 화살표 커서. 슬라이드쇼의 두 절반이 폭 50% 클릭 영역이다.',
      states: '오른쪽 절반에서 왼쪽 절반으로 건너가면 화살표가 180° 회전한다.',
      motion: { trigger: '포인터 이동 / 절반 경계 통과', change: '위치는 gsap.quickTo(el,"x",{duration:0.4,ease:"power3"}) (y 도 동일), 회전은 gsap.to(c,{rotation: x<mid ? 180 : 0, duration:.4}) — 회전 시간은 미공개라 .4s power3 는 제안값(power3.out ≈ cubic-bezier(0.165,0.84,0.44,1)). 데모는 left/top transition 으로 근사', timing: '위치 quickTo duration 0.4s ease "power3" (power3.out ≈ cubic-bezier(0.165,0.84,0.44,1)) · 회전 .4s (추정, 같은 곡선)', inferred: true },
      feel: ['큰 화살표', '부드러운 추적', '뒤집힘'],
      fits: ['풀스크린 슬라이드쇼', '브랜드 사이트'],
      demo: `<div class="E-17" data-behavior="carousel cursor">
  <div class="view" data-zone><div data-track>${slides(3, '사진')}</div></div>
  <span class="cur" data-cursor aria-hidden="true"><span class="rot">{{i:arrow-long-r}}</span></span>
  ${MINIBTN}
</div>`,
      css: CAR('E-17', '.4s', 'ease') + '\n' + MINI('E-17') + `
.E-17 .view { cursor: none; }
.E-17 .cur { position: absolute; z-index: 4; left: var(--cx, 50%); top: var(--cy, 50%); width: 102px; height: 102px; margin: -51px 0 0 -51px; color: var(--bg-1); pointer-events: none; opacity: 0; transition: left .4s cubic-bezier(0.165, 0.84, 0.44, 1), top .4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity .2s; }
.E-17.is-in .cur { opacity: 1; }
.E-17 .rot { display: block; width: 100%; height: 100%; rotate: 0deg; transition: rotate .4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.E-17[data-side="left"] .rot { rotate: 180deg; }
.E-17 .rot .ic { width: 100%; height: 100%; stroke-width: 1.5; }`
    }
  ]);
})();
