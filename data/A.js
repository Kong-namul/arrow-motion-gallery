/* A — 캐러셀·슬라이더. 출처: research/A-carousel.md */
(function () {
  'use strict';
  var D = ARROW_DATA;

  /* 카테고리 전용 아이콘: App Store 슬림 패들용 가늘고 긴 셰브론 (24×24, stroke) */
  D.addIcons({
    'a-slim-l': D.svg('<path d="M15 2l-6 10 6 10" stroke-width="1.5"/>')
  });

  /* 슬라이드 n장 (사진 대신 진한 면 + 번호) */
  function sl(n) {
    var s = '';
    for (var i = 1; i <= n; i++) s += '<div class="sl">' + i + '</div>';
    return s;
  }
  /* 이전/다음 버튼 한 쌍 (carousel 계약: data-prev / data-next) */
  function pn(l, r, pl, nl) {
    return '<button type="button" class="bt pv" data-prev aria-label="' + (pl || '이전 슬라이드') + '">' + l + '</button>' +
      '<button type="button" class="bt nx" data-next aria-label="' + (nl || '다음 슬라이드') + '">' + r + '</button>';
  }
  var CL = '{{i:chev-l}}', CR = '{{i:chev-r}}';

  /* 모든 카드가 공유하는 뼈대 CSS (뷰포트·트랙·슬라이드·버튼 리셋). 카드마다 자기 번호로 범위 지정 */
  function base(id) {
    var p = '.' + id;
    return p + ' { position: absolute; inset: 0; }\n' +
      p + ' .vp { position: absolute; inset: 0; overflow: hidden; }\n' +
      p + ' [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }\n' +
      p + ' .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }\n' +
      p + ' .sl:nth-child(even) { background: var(--fg-2); }\n' +
      p + ' button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }\n' +
      p + ' button:disabled { cursor: default; }\n' +
      p + ' .ic { display: block; width: 24px; height: 24px; }\n';
  }
  /* 여러 장이 한 화면에 보이는 타일형 슬라이드 (카드 사이 8px) */
  function tile(id, pct) {
    return '.' + id + ' .sl { flex-basis: ' + pct + '%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }\n';
  }
  function chips(names, on) {
    return names.map(function (t, k) { return '<button type="button" class="chip' + (k === on ? ' on' : '') + '">' + t + '</button>'; }).join('');
  }

  D.add([
    /* ───────── 캐러셀 라이브러리 (A-01 ~ A-12) ───────── */
    {
      id: 'A-01', group: '캐러셀 라이브러리', name: 'Swiper 기본 셰브론', source: 'Swiper 11',
      url: 'https://cdn.jsdelivr.net/npm/swiper@11.2.10/modules/navigation.css',
      look: '세로 가운데 오버레이, 양쪽에서 10px. 배경 없는 맨 셰브론(아이콘 폰트 또는 SVG). 27×44px(--swiper-navigation-size: 44px). 원본 색 --swiper-theme-color #007aff (여기선 슬라이드 위라 var(--bg-1))',
      states: '끝(루프 아님)에서 opacity .35 + pointer-events none. .swiper-button-hidden 은 opacity 0, .swiper-button-lock 은 스크롤할 게 없으면 숨김. a11y 모듈이 "Previous slide"/"Next slide" 라벨 부여',
      motion: { trigger: '끝 도달', change: '불투명도 1 → .35 (전환 없이 즉시 교체)', timing: '전환 없음(즉시)', inferred: false },
      feel: ['담백', '기본값', '배경 없음'], fits: ['범용 캐러셀', '쉽게 리컬러'], tall: false,
      demo: `<div class="A-01" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR)}</div>`,
      css: base('A-01') +
        `.A-01 .bt { position: absolute; top: 50%; margin-top: -22px; width: 27px; height: 44px; color: var(--bg-1); }
.A-01 .pv { left: 10px; }
.A-01 .nx { right: 10px; }
.A-01 .ic { width: 88px; height: 88px; stroke-width: 1.5; }
.A-01 .bt:disabled { opacity: .35; pointer-events: none; }`
    },
    {
      id: 'A-02', group: '캐러셀 라이브러리', name: 'Splide 기본 원형', source: 'Splide 4',
      url: 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css',
      look: '오버레이, 양쪽에서 1em(16px). 2em(32px) 원, 배경 #ccc(여기선 var(--bg-1)), 1.2em 화살표 SVG는 #000 채움(var(--fg-1)). prev는 scaleX(-1)로 뒤집음',
      states: '기본 opacity .7, 호버 .9, 비활성 .3. focus-visible 은 3px solid #0bf 아웃라인 + 오프셋 3px. rewind 모드에서는 라벨이 "Go to first/last slide"로 바뀜',
      motion: { trigger: '호버', change: '불투명도 .7 → .9 (전환 없이 즉시)', timing: '전환 없음(즉시)', inferred: false },
      feel: ['조용함', '담백', '반투명 원'], fits: ['범용 슬라이더', '눈에 안 띄는 화살표'], tall: false,
      demo: `<div class="A-02" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR)}</div>`,
      css: base('A-02') +
        `.A-02 .bt { position: absolute; top: 50%; margin-top: -16px; width: 32px; height: 32px; border-radius: 50%; background: var(--bg-1); color: var(--fg-1); opacity: .7; }
.A-02 .pv { left: 16px; }
.A-02 .nx { right: 16px; }
.A-02 .ic { width: 19px; height: 19px; }
.A-02 .bt:hover { opacity: .9; }
.A-02 .bt:disabled { opacity: .3; }
.A-02 .bt:focus-visible { outline: 3px solid var(--fg-1); outline-offset: 3px; }`
    },
    {
      id: 'A-03', group: '캐러셀 라이브러리', name: 'Splide 시그린/스카이블루 고스트 아이콘', source: 'Splide 4 테마',
      url: 'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/themes/splide-sea-green.min.css',
      look: '배경 없는 2.5em(40px) 아이콘만. 채움 #20b2aa (skyblue 테마 #00bfff) — 여기선 var(--fg-3). .splide__slider 로 감싸면 -2.5em 만큼 바깥으로 이동하므로 슬라이드 바깥 여백에 배치',
      states: '호버 채움 #57e1d9 (skyblue #66d9ff) → 여기선 var(--fg-1). 비활성 .3. 포커스 아웃라인은 3px 테마 색',
      motion: { trigger: '호버', change: '아이콘 채움색 변화', timing: '0.2s linear', inferred: false },
      feel: ['미니멀', '브랜드 색', '고스트'], fits: ['브랜드 갤러리', '미니멀 갤러리'], tall: false,
      demo: `<div class="A-03" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR)}</div>`,
      css: base('A-03') +
        `.A-03 .vp { inset: 0 48px; }
.A-03 .bt { position: absolute; top: 50%; margin-top: -20px; width: 40px; height: 40px; color: var(--fg-3); transition: color 200ms linear; }
.A-03 .pv { left: 4px; }
.A-03 .nx { right: 4px; }
.A-03 .ic { width: 32px; height: 32px; }
.A-03 .bt:hover:not(:disabled) { color: var(--fg-1); }
.A-03 .bt:disabled { opacity: .3; }
.A-03 .bt:focus-visible { outline: 3px solid var(--fg-1); }`
    },
    {
      id: 'A-04', group: '캐러셀 라이브러리', name: 'Slick / react-slick 바깥 화살표', source: 'slick-carousel 1.8.1',
      url: 'https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css',
      look: '슬라이드 바깥 ±25px. 20px 박스에 slick 아이콘 폰트의 ← → 글리프(20px, 흰색 — 여기선 바깥이라 var(--fg-1)). react-slick 도 같은 파일을 import 하라고 안내',
      states: '기본 opacity .75, 호버/포커스 1, 비활성 .25. 포커스 아웃라인을 제거함(접근성 구멍)',
      motion: { trigger: '호버/포커스', change: '불투명도 .75 → 1 (전환 없이 즉시)', timing: '전환 없음(즉시)', inferred: false },
      feel: ['레거시', '글리프', '바깥 배치'], fits: ['jQuery/React 레거시 사이트'], tall: false,
      demo: `<div class="A-04" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn('←', '→')}</div>`,
      css: base('A-04') +
        `.A-04 .vp { inset: 0 40px; }
.A-04 .bt { position: absolute; top: 50%; margin-top: -10px; width: 20px; height: 20px; font-size: var(--text-22); line-height: 1; color: var(--fg-1); opacity: .75; }
.A-04 .pv { left: 10px; }
.A-04 .nx { right: 10px; }
.A-04 .bt:hover, .A-04 .bt:focus { opacity: 1; }
.A-04 .bt:focus { outline: 0; }
.A-04 .bt:disabled { opacity: .25; }`
    },
    {
      id: 'A-05', group: '캐러셀 라이브러리', name: 'Flickity 원형', source: 'Flickity 2.3.0',
      url: 'https://cdn.jsdelivr.net/npm/flickity@2.3.0/dist/flickity.css',
      look: '오버레이, 양쪽에서 10px. 44px 원, 배경 hsla(0,0%,100%,.75) (var(--bg-1) 75%). #333 SVG 화살표는 버튼의 60%',
      states: '호버 배경이 완전 흰색(var(--bg-1))으로. 누름 opacity .6. 포커스 링 box-shadow 0 0 0 5px #19F. 비활성 opacity .3 + pointer-events none',
      motion: { trigger: '호버/누름', change: '배경 75% → 100%, 누르면 불투명도 .6 (전환 없이 즉시)', timing: '전환 없음(즉시)', inferred: false },
      feel: ['터치 친화', '반투명', '큼직함'], fits: ['사진 갤러리', '터치 우선 UI'], tall: false,
      demo: `<div class="A-05" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR)}</div>`,
      css: base('A-05') +
        `.A-05 .bt { position: absolute; top: 50%; margin-top: -22px; width: 44px; height: 44px; border-radius: 50%; background: color-mix(in srgb, var(--bg-1) 75%, transparent); color: var(--fg-1); }
.A-05 .pv { left: 10px; }
.A-05 .nx { right: 10px; }
.A-05 .ic { width: 60%; height: 60%; }
.A-05 .bt:hover:not(:disabled) { background: var(--bg-1); }
.A-05 .bt:active:not(:disabled) { opacity: .6; }
.A-05 .bt:focus-visible { outline: 0; box-shadow: 0 0 0 5px var(--fg-1); }
.A-05 .bt:disabled { opacity: .3; pointer-events: none; }`
    },
    {
      id: 'A-06', group: '캐러셀 라이브러리', name: 'Glide.js 고스트 아웃라인', source: 'Glide.js 3.6.0',
      url: 'https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.0/dist/css/glide.theme.css',
      look: '오버레이, 양쪽에서 2em(32px). 투명한 사각형, 2px 테두리 rgba(255,255,255,.5), radius 4px, padding 9px 12px. 흰색 대문자 텍스트 + 부드러운 그림자 box-shadow 0 .25em .5em rgba(0,0,0,.1)',
      states: '호버 시 테두리가 흰색 실선으로. 비활성 opacity .33. 포커스 아웃라인 제거됨(원본은 outline 제거, 데모는 2px focus-visible 링 추가)',
      motion: { trigger: '호버/비활성', change: '테두리 50% → 100%, 불투명도 .33', timing: 'opacity 150ms ease, border 300ms ease-in-out', inferred: false },
      feel: ['고스트', '텍스트형', '또렷한 테두리'], fits: ['어두운 히어로 이미지 위 화살표'], tall: false,
      demo: `<div class="A-06" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn('이전', '다음')}</div>`,
      css: base('A-06') +
        `.A-06 .bt { position: absolute; top: 50%; margin-top: -20px; padding: 9px 12px; border: 2px solid color-mix(in srgb, var(--bg-1) 50%, transparent); border-radius: 4px; font-size: var(--text-14); text-transform: uppercase; color: var(--bg-1); box-shadow: 0 .25em .5em color-mix(in srgb, var(--fg-1) 10%, transparent); transition: opacity 150ms ease, border 300ms ease-in-out; }
.A-06 .pv { left: 32px; }
.A-06 .nx { right: 32px; }
.A-06 .bt:hover:not(:disabled) { border-color: var(--bg-1); }
.A-06 .bt:focus { outline: 0; }
.A-06 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.A-06 .bt:disabled { opacity: .33; }`
    },
    {
      id: 'A-07', group: '캐러셀 라이브러리', name: 'Owl Carousel 슬라이더 아래 알약', source: 'Owl Carousel 2.3.4',
      url: 'https://cdn.jsdelivr.net/npm/owl.carousel@2.3.4/dist/assets/owl.theme.default.css',
      look: '슬라이더 아래 가운데. 14px ‹ › 텍스트의 작은 알약(span aria-label "Previous"/"Next"). 배경 #D6D6D6(var(--border-strong)), 흰 글자(var(--bg-1)), radius 3px, padding 4px 7px. .owl-nav 는 text-align center, margin-top 10px',
      states: '호버 배경 #869791 (여기선 var(--fg-3)). 비활성 opacity .5',
      motion: { trigger: '호버', change: '배경색 교체 (전환 없이 즉시)', timing: '전환 없음(즉시)', inferred: false },
      feel: ['작음', '무게감 낮음', '아래 배치'], fits: ['단순 콘텐츠 행'], tall: false,
      demo: `<div class="A-07" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div><div class="nav">${pn('‹', '›', '이전', '다음')}</div></div>`,
      css: base('A-07') +
        `.A-07 .vp { inset: 0 0 44px; }
.A-07 .nav { position: absolute; left: 0; right: 0; bottom: 8px; display: flex; justify-content: center; gap: 5px; margin-top: 10px; }
.A-07 .bt { padding: 4px 7px; border-radius: 3px; font-size: var(--text-14); line-height: 1; background: var(--border-strong); color: var(--bg-1); }
.A-07 .bt:hover:not(:disabled) { background: var(--fg-3); }
.A-07 .bt:disabled { opacity: .5; }`
    },
    {
      id: 'A-08', group: '캐러셀 라이브러리', name: 'Glider.js 맨 글리프', source: 'Glider.js 1.7.9',
      url: 'https://cdn.jsdelivr.net/npm/glider-js@1.7.9/glider.css',
      look: '바깥 -23px, top 30%. 40px «/» 텍스트 #666(var(--fg-3)), 배경 없음 (여기선 글자 크기를 DS 스케일의 var(--text-36)으로 근사). 데모 마크업은 « » 사용',
      states: '호버/포커스 색 #a89cc8(라벤더) → 여기선 var(--fg-1). 비활성 opacity .25',
      motion: { trigger: '호버/포커스', change: '글리프 색 천천히 변화, 비활성은 불투명도 .25', timing: 'opacity .5s, color .5s cubic-bezier(.17,.67,.83,.67)', inferred: false },
      feel: ['느리고 부드러운', '타이포그래피', '에디토리얼'], fits: ['에디토리얼/타이포 중심 레이아웃'], tall: false,
      demo: `<div class="A-08" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn('«', '»')}</div>`,
      css: base('A-08') +
        `.A-08 .vp { inset: 0 44px; }
.A-08 .bt { position: absolute; top: 30%; width: 40px; height: 40px; font-size: var(--text-36); line-height: 1; color: var(--fg-3); transition: opacity .5s, color .5s cubic-bezier(.17,.67,.83,.67); }
.A-08 .pv { left: 2px; }
.A-08 .nx { right: 2px; }
.A-08 .bt:hover:not(:disabled), .A-08 .bt:focus-visible { color: var(--fg-1); }
.A-08 .bt:disabled { opacity: .25; }`
    },
    {
      id: 'A-09', group: '캐러셀 라이브러리', name: 'Keen-slider 굵은 셰브론', source: 'Keen-slider 6',
      url: 'https://github.com/rcbyr/keen-slider-sandboxes/blob/v6/navigation-controls/arrows-and-dots/javascript/styles.css',
      look: '오버레이, 양쪽에서 5px. 컨테이너 없는 30px 흰색 채움 SVG 셰브론(var(--bg-1))',
      states: '비활성이면 채움이 회색(grey)으로 교체 (여기선 var(--fg-4))',
      motion: { trigger: '끝 도달', change: '채움색 흰색 → 회색 (전환 없이 즉시)', timing: '전환 없음(즉시)', inferred: false },
      feel: ['굵음', '컨테이너 없음', '단순'], fits: ['풀블리드 이미지 슬라이더'], tall: false,
      demo: `<div class="A-09" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR)}</div>`,
      css: base('A-09') +
        `.A-09 .bt { position: absolute; top: 50%; margin-top: -15px; width: 30px; height: 30px; color: var(--bg-1); }
.A-09 .pv { left: 5px; }
.A-09 .nx { right: 5px; }
.A-09 .ic { width: 30px; height: 30px; stroke-width: 3; }
.A-09 .bt:disabled { color: var(--fg-4); }`
    },
    {
      id: 'A-10', group: '캐러셀 라이브러리', name: 'Embla 뷰포트 아래 아웃라인 원', source: 'Embla Carousel',
      url: 'https://github.com/davidjerleke/embla-carousel/blob/master/website/src/content/v9/examples/examples-carousel-styles.ts',
      look: '슬라이드 아래 컨트롤 그리드(왼쪽 아래 화살표, 오른쪽 점, margin-top 1.8rem, grid-template-columns auto 1fr). 3.6rem 원(루트 62.5% 기준 36px), 투명 + 안쪽 테두리 inset 0 0 0 .2rem. 아이콘은 버튼의 35%',
      states: '비활성이면 아이콘이 고대비 디테일 색으로 바뀜. 공식 가이드 스니펫은 opacity .3 + cursor not-allowed',
      motion: { trigger: '끝 도달', change: '아이콘 색 변경', timing: '전환 없음', inferred: false },
      feel: ['깔끔한 가장자리', '오버레이 없음', '아웃라인'], fits: ['콘텐츠 캐러셀', '가장자리가 깨끗해야 하는 곳'], tall: false,
      demo: `<div class="A-10" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div><div class="ctl"><div class="arrows">${pn(CL, CR)}</div><div data-dots></div></div></div>`,
      css: base('A-10') +
        `.A-10 .vp { inset: 8px 12px 68px; border-radius: var(--radius-md); }
.A-10 .ctl { position: absolute; left: 12px; right: 12px; bottom: 12px; display: grid; grid-template-columns: auto 1fr; align-items: center; }
.A-10 .arrows { display: flex; gap: var(--space-2); }
.A-10 .bt { width: 36px; height: 36px; border-radius: 50%; color: var(--fg-1); box-shadow: inset 0 0 0 2px var(--border-strong); }
.A-10 .ic { width: 35%; height: 35%; }
.A-10 .bt:disabled { color: var(--fg-4); cursor: not-allowed; }
.A-10 [data-dots] { display: flex; justify-self: end; gap: var(--space-2); }
.A-10 [data-dots] button { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 2px var(--border-strong); }
.A-10 [data-dots] button[aria-current="true"] { box-shadow: inset 0 0 0 2px var(--fg-1); }`
    },
    {
      id: 'A-11', group: '캐러셀 라이브러리', name: 'Swiffy 슬라이더 변형 매트릭스(round)', source: 'Swiffy Slider 1.6.0',
      url: 'https://cdn.jsdelivr.net/npm/swiffy-slider@1.6.0/dist/css/swiffy-slider.css',
      look: '전체 높이 사이드 존 + 3rem 마스크 SVG 아이콘. 아이콘 5종(기본 셰브론·화살표·얇은 셰브론·캐럿·채운 캐럿). round/square 는 3rem 흰 판 뒤에 2rem 어두운 긴 화살표. dark 는 색 반전, sm 은 .75배, outside/outside-expand 는 3.5rem 거터로 바깥 배치. 여기선 round 변형만 재현',
      states: '원본은 슬라이더에 호버하기 전까지 visibility:hidden(데모는 키보드 접근을 위해 opacity 0 + pointer-events none으로 숨기고 호버/포커스 시 표시). opacity .8, 화살표 호버 1. autohide 는 첫/끝 슬라이드에서 숨김, nav-visible 은 항상 표시, nav-touch 는 호버 없는 기기에서 표시',
      motion: { trigger: '슬라이더 호버', change: '화살표 나타남(visibility), 호버 시 불투명도 .8 → 1', timing: 'visibility .1s, opacity .2s linear, filter drop-shadow(0 0 .5rem rgba(0,0,0,.5))', inferred: false },
      feel: ['프로토타입 키트', '호버로 등장', '판(plate)'], fits: ['변형을 나란히 비교하는 프로토타이핑'], tall: false,
      demo: `<div class="A-11" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><span class="pl">{{i:arrow-long-l}}</span></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><span class="pl">{{i:arrow-long-r}}</span></button></div>`,
      css: base('A-11') +
        `.A-11 .bt { position: absolute; top: 0; bottom: 0; width: 4rem; opacity: 0; pointer-events: none; color: var(--fg-1); filter: drop-shadow(0 0 .5rem color-mix(in srgb, var(--fg-1) 50%, transparent)); transition: visibility .1s, opacity .2s linear; }
.A-11 .pv { left: 0; }
.A-11 .nx { right: 0; }
.A-11 .pl { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%; background: var(--bg-1); }
.A-11 .ic { width: 2rem; height: 2rem; }
.A-11:hover .bt, .A-11:has(.bt:focus-visible) .bt { opacity: .8; pointer-events: auto; }
.A-11 .bt:hover { opacity: 1; }
.A-11:hover .bt:disabled, .A-11:has(.bt:focus-visible) .bt:disabled { opacity: 0; pointer-events: none; }`
    },
    {
      id: 'A-12', group: '캐러셀 라이브러리', name: 'Tiny Slider 데모 텍스트 버튼', source: 'Tiny Slider',
      url: 'https://github.com/ganlanyuan/tiny-slider/blob/master/demo/css/styles.css',
      look: '(a) 기본 .tns-controls: 슬라이더 위 가운데 텍스트 버튼, 높이 2.5em, 배경 #66CCFF(여기선 var(--fg-1) 반전), radius 3px. (b) 커스텀 .controls li: 가장자리의 60px 높이 이미지 화살표 존. 여기선 (a) 재현',
      states: '비활성 배경 #B3B3B3, 글자 #999, not-allowed 커서. 커스텀 존은 호버 시 #f2f2f2 배경',
      motion: { trigger: '호버', change: '배경색 변화', timing: 'transition: background 0.3s', inferred: false },
      feel: ['로파이', '유틸리티', '텍스트 버튼'], fits: ['로파이/유틸리티 UI'], tall: false,
      demo: `<div class="A-12" data-behavior="carousel"><div class="ctl">${pn('이전', '다음', '이전', '다음')}</div><div class="vp"><div data-track>${sl(4)}</div></div></div>`,
      css: base('A-12') +
        `.A-12 .vp { inset: 48px 0 0; }
.A-12 .ctl { position: absolute; top: 4px; left: 0; right: 0; display: flex; justify-content: center; }
.A-12 .bt { height: 40px; margin: 0 5px; padding: 0 1em; border-radius: 3px; font-size: var(--text-14); background: var(--fg-1); color: var(--bg-1); transition: background 0.3s; }
.A-12 .bt:hover:not(:disabled) { background: var(--fg-3); }
.A-12 .bt:disabled { background: var(--border); color: var(--fg-4); cursor: not-allowed; }`
    },

    /* ───────── UI 프레임워크·디자인 시스템 (A-13 ~ A-19) ───────── */
    {
      id: 'A-13', group: 'UI 프레임워크·디자인 시스템', name: 'Bootstrap 5 전체 높이 사이드 존', source: 'Bootstrap 5.3.3',
      url: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.css',
      look: '양쪽 가장자리를 덮는 폭 15%의 보이지 않는 히트 존(전체 높이). 가운데에 2rem 흰 셰브론. .carousel-dark 는 filter:invert(1) grayscale(100) 으로 검정 아이콘',
      states: '기본 opacity .5, 호버/포커스 .9. 기본이 래핑이라 비활성이 없음. .visually-hidden "Previous"/"Next"',
      motion: { trigger: '호버/포커스', change: '불투명도 .5 → .9', timing: 'transition: opacity .15s ease (prefers-reduced-motion 이면 끔)', inferred: false },
      feel: ['넓은 히트 영역', '담백', '루프'], fits: ['히어로 배너', '큰 터치 영역이 필요한 곳'], tall: false,
      demo: `<div class="A-13" data-behavior="carousel" data-loop><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR)}</div>`,
      css: base('A-13') +
        `.A-13 .bt { position: absolute; top: 0; bottom: 0; width: 15%; color: var(--bg-1); opacity: .5; transition: opacity .15s ease; }
.A-13 .pv { left: 0; }
.A-13 .nx { right: 0; }
.A-13 .ic { width: 32px; height: 32px; stroke-width: 3; }
.A-13 .bt:hover, .A-13 .bt:focus-visible { opacity: .9; }`
    },
    {
      id: 'A-14', group: 'UI 프레임워크·디자인 시스템', name: 'Webflow 슬라이더 존', source: 'Webflow 기본 CSS',
      url: 'https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/css/flowbase-stage.shared.e97707000.min.css',
      look: '폭 80px 전체 높이 존(inset:0; margin:auto). 흰색 40px 아이콘 폰트 셰브론(var(--bg-1))',
      states: '원본은 :focus{outline:0} (접근성 구멍, 데모는 2px focus-visible 링 추가). 기본 호버 스타일 없음',
      motion: { trigger: '없음', change: '호버·포커스 변화 없음', timing: '전환 없음', inferred: false },
      feel: ['노코드 기본', '변화 없음', '큰 존'], fits: ['노코드 히어로 슬라이더'], tall: false,
      demo: `<div class="A-14" data-behavior="carousel" data-loop><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR)}</div>`,
      css: base('A-14') +
        `.A-14 .bt { position: absolute; top: 0; bottom: 0; width: 80px; color: var(--bg-1); }
.A-14 .pv { left: 0; }
.A-14 .nx { right: 0; }
.A-14 .ic { width: 40px; height: 40px; }
.A-14 .bt:focus { outline: 0; }
.A-14 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -4px; }`
    },
    {
      id: 'A-15', group: 'UI 프레임워크·디자인 시스템', name: 'Flowbite 반투명 판 + 전체 높이 존', source: 'Flowbite',
      url: 'https://github.com/themesberg/flowbite/blob/main/content/components/carousel.md',
      look: '버튼은 양쪽 가장자리의 투명한 전체 높이 존(px-4 = 16px). 안에 40px 판(현재 문서는 rounded-base), bg-white/30 (다크 gray-800/30), 20px 셰브론 stroke 2',
      states: 'group-hover 판 white/50, group-focus ring-4 ring-white, sr-only "Previous", RTL 에서 반전',
      motion: { trigger: '호버', change: '판 투명도 30% → 50%', timing: '전환 클래스 없음 → 즉시', inferred: true },
      feel: ['반투명', '판', '큰 존'], fits: ['Tailwind 히어로 캐러셀(사진 위)'], tall: false,
      demo: `<div class="A-15" data-behavior="carousel" data-loop><div class="vp"><div data-track>${sl(4)}</div></div>` +
        `<button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><span class="pl">{{i:chev-l}}</span></button>` +
        `<button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><span class="pl">{{i:chev-r}}</span></button></div>`,
      css: base('A-15') +
        `.A-15 .bt { position: absolute; top: 0; bottom: 0; padding: 0 16px; }
.A-15 .pv { left: 0; }
.A-15 .nx { right: 0; }
.A-15 .pl { display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--radius-md); background: color-mix(in srgb, var(--bg-1) 30%, transparent); color: var(--bg-1); }
.A-15 .ic { width: 20px; height: 20px; }
.A-15 .bt:hover .pl { background: color-mix(in srgb, var(--bg-1) 50%, transparent); }
.A-15 .bt:focus { outline: 0; }
.A-15 .bt:focus-visible .pl { box-shadow: 0 0 0 4px var(--bg-1); }`
    },
    {
      id: 'A-16', group: 'UI 프레임워크·디자인 시스템', name: 'DaisyUI btn-circle 한 쌍', source: 'DaisyUI',
      url: 'https://github.com/saadeghi/daisyui/blob/master/packages/docs/src/routes/(routes)/components/carousel/+page.md',
      look: '절대 위치 flex 행(justify-between), 양쪽에서 20px(left-5/right-5), top 50%. 40px 원 두 개에 ❮ ❯. #slideN 앵커 링크이고 래핑됨',
      states: '호버 시 배경 7% 어둡게. 누르면 translate:0 .5px + 그림자 제거. focus-visible 2px 아웃라인. 비활성은 글자 20%, 투명',
      motion: { trigger: '호버/누름', change: '배경 7% 어둡게, 누르면 0.5px 내려가며 그림자 제거', timing: 'color, background, border, shadow, transform 0.2s cubic-bezier(0,0,.2,1)', inferred: false },
      feel: ['CSS만으로', '링크 방식', '살짝 눌림'], fits: ['JS 없는 CSS 전용 캐러셀'], tall: false,
      demo: `<div class="A-16" data-behavior="carousel" data-loop><div class="vp"><div data-track>${sl(4)}</div></div><div class="nav">${pn('❮', '❯')}</div></div>`,
      css: base('A-16') +
        `.A-16 .nav { position: absolute; left: 20px; right: 20px; top: 50%; display: flex; justify-content: space-between; transform: translateY(-50%); pointer-events: none; }
.A-16 .bt { width: 40px; height: 40px; border-radius: 50%; background: var(--bg-2); color: var(--fg-1); box-shadow: var(--shadow-sm); pointer-events: auto; transition-property: color, background-color, border-color, box-shadow, translate; transition-duration: 0.2s; transition-timing-function: cubic-bezier(0,0,.2,1); }
.A-16 .bt:hover { background: color-mix(in srgb, var(--bg-2) 93%, var(--fg-1)); }
.A-16 .bt:active { translate: 0 .5px; box-shadow: none; }
.A-16 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }`
    },
    {
      id: 'A-17', group: 'UI 프레임워크·디자인 시스템', name: 'shadcn/ui 바깥 아웃라인 원', source: 'shadcn/ui',
      url: 'https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/carousel.tsx',
      look: '슬라이드 바깥 -left-12(48px), 세로 가운데. 32px rounded-full 아웃라인 버튼(border, bg-background, shadow-xs). lucide ArrowLeft(긴 화살표) 16px',
      states: '호버 bg-accent. 비활성(!canScrollPrev)은 opacity .5 + pointer-events none. focus-visible ring 3px ring/50. sr-only "Previous slide". 영역에 aria-roledescription="carousel", ArrowLeft/Right 키 처리',
      motion: { trigger: '호버', change: '배경이 accent 로', timing: 'transition-all, Tailwind 기본 150ms cubic-bezier(.4,0,.2,1)', inferred: false },
      feel: ['앱 UI', '정돈된', '아웃라인'], fits: ['앱/대시보드 UI'], tall: false,
      demo: `<div class="A-17" data-behavior="carousel" role="region" aria-roledescription="carousel" aria-label="캐러셀"><div class="vp"><div data-track>${sl(4)}</div></div>${pn('{{i:arrow-l}}', '{{i:arrow-r}}')}</div>`,
      css: base('A-17') +
        `.A-17 .vp { inset: 16px 56px; border-radius: var(--radius-md); }
.A-17 .bt { position: absolute; top: 50%; margin-top: -16px; width: 32px; height: 32px; border: 1px solid var(--border); border-radius: 50%; background: var(--bg-1); color: var(--fg-1); box-shadow: var(--shadow-sm); transition: all 150ms cubic-bezier(.4,0,.2,1); }
.A-17 .pv { left: 8px; }
.A-17 .nx { right: 8px; }
.A-17 .ic { width: 16px; height: 16px; }
.A-17 .bt:hover:not(:disabled) { background: var(--bg-2); }
.A-17 .bt:focus-visible { outline: 0; box-shadow: var(--shadow-sm), 0 0 0 3px color-mix(in srgb, var(--fg-1) 50%, transparent); }
.A-17 .bt:disabled { opacity: .5; pointer-events: none; }`
    },
    {
      id: 'A-18', group: 'UI 프레임워크·디자인 시스템', name: 'Ark UI / Zag 트리거 + Chakra 예제', source: 'Zag.js · Chakra UI',
      url: 'https://github.com/chakra-ui/zag/blob/main/packages/machines/carousel/src/carousel.connect.ts',
      look: '헤드리스. Chakra 예제는 슬라이드 아래 가운데 컨트롤 행(gap 4): [ghost xs IconButton ‹] [점] [›]. xs 크기 32px, Lu 셰브론 16px',
      states: '스크롤 불가면 네이티브 disabled(루프/자동재생이면 제외). aria-label "Previous slide", aria-controls 가 아이템 그룹 가리킴, data-orientation. ghost 호버 bg colorPalette.subtle, 포커스 링은 바깥',
      motion: { trigger: '호버', change: '배경 subtle 색', timing: 'transitionDuration: "moderate" (토큰 기준 약 200ms)', inferred: true },
      feel: ['헤드리스', '올바른 동작', '조용한 고스트'], fits: ['동작 정확성을 기본으로 원하는 디자인 시스템'], tall: false,
      demo: `<div class="A-18" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div><div class="ctl"><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드">{{i:chev-l}}</button><div data-dots></div><button type="button" class="bt nx" data-next aria-label="다음 슬라이드">{{i:chev-r}}</button></div></div>`,
      css: base('A-18') +
        `.A-18 .vp { inset: 8px 8px 56px; border-radius: var(--radius-md); }
.A-18 .ctl { position: absolute; left: 0; right: 0; bottom: 8px; display: flex; justify-content: center; align-items: center; gap: 16px; }
.A-18 .bt { width: 32px; height: 32px; border-radius: var(--radius-sm); color: var(--fg-1); transition: background 200ms; }
.A-18 .ic { width: 16px; height: 16px; }
.A-18 .bt:hover:not(:disabled) { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.A-18 .bt:disabled { opacity: .5; }
.A-18 [data-dots] { display: flex; gap: var(--space-2); }
.A-18 [data-dots] button { width: 8px; height: 8px; border-radius: 50%; background: color-mix(in srgb, var(--fg-1) 30%, transparent); }
.A-18 [data-dots] button[aria-current="true"] { background: var(--fg-1); }`
    },
    {
      id: 'A-19', group: 'UI 프레임워크·디자인 시스템', name: 'MUI TabScrollButton 스트립', source: 'Material UI',
      url: 'https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TabScrollButton/TabScrollButton.js',
      look: '스크롤되는 Tabs/칩 양끝의 폭 40px 전체 높이 스트립. 키보드 화살표 아이콘. 세로일 땐 높이 40px. (MUI 는 캐러셀이 없어 가장 가까운 화살표)',
      states: '기본 opacity .8. 비활성은 opacity 0 이라 끝에서 화살표는 사라지지만 자리는 유지',
      motion: { trigger: '누름', change: '리플이 눌린 위치에서 퍼짐', timing: 'TouchRipple 550ms easeInOut', inferred: false },
      feel: ['머티리얼', '리플', '자리 유지'], fits: ['칩/탭/필터 바'], tall: false,
      demo: `<div class="A-19" data-behavior="scroller replay" data-step="0.8"><div class="bar"><button type="button" class="bt" data-prev data-replay aria-label="왼쪽으로 스크롤">{{i:chev-l}}</button><div class="tabs" data-scroller tabindex="0" aria-label="탭 목록">${chips(['홈', '인기', '신상품', '추천', '할인', '브랜드', '이벤트', '리뷰'], 0)}</div><button type="button" class="bt" data-next data-replay aria-label="오른쪽으로 스크롤">{{i:chev-r}}</button></div></div>`,
      css: `.A-19 { position: absolute; inset: 0; display: grid; align-items: center; padding: 0 var(--space-4); }
.A-19 .bar { display: flex; align-items: stretch; height: 48px; overflow: hidden; background: var(--bg-1); border-radius: var(--radius-md); }
.A-19 .tabs { display: flex; flex: 1; min-width: 0; align-items: center; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.A-19 .tabs::-webkit-scrollbar { display: none; }
.A-19 .chip { flex: none; padding: 4px 14px; border: 1px solid var(--border); border-radius: var(--radius-pill); font: inherit; font-size: var(--text-14); color: var(--fg-1); background: none; cursor: pointer; }
.A-19 .chip.on { background: var(--fg-1); color: var(--bg-1); border-color: var(--fg-1); }
.A-19 .bt { position: relative; display: grid; place-items: center; flex-shrink: 0; width: 40px; padding: 0; border: 0; overflow: hidden; background: none; color: var(--fg-1); cursor: pointer; opacity: .8; }
.A-19 .bt:disabled { opacity: 0; cursor: default; }
.A-19 .ic { position: relative; display: block; width: 24px; height: 24px; }
.A-19 .bt::after { content: ''; position: absolute; left: var(--x, 50%); top: var(--y, 50%); width: 80px; height: 80px; margin: -40px 0 0 -40px; border-radius: 50%; background: color-mix(in srgb, var(--fg-1) 25%, transparent); opacity: 0; transform: scale(0); pointer-events: none; }
.A-19 .bt.is-play::after { animation: A-19-ripple 550ms cubic-bezier(.4,0,.2,1); }
@keyframes A-19-ripple { 0% { opacity: 1; transform: scale(0); } 100% { opacity: 0; transform: scale(1); } }`
    },

    /* ───────── 실서비스 (A-20 ~ A-29) ───────── */
    {
      id: 'A-20', group: '실서비스', name: 'Apple 패들내비, 호버 시 나타나는 오버레이', source: 'Apple (iPhone 페이지)',
      url: 'https://www.apple.com/iphone/',
      look: '36px 원(다른 크기: elevated 56px, super 90px), 양쪽에서 18px. alpha 스타일은 반투명 회색 배경(원본 rgba(210,210,215,.64))',
      states: '호버와 active 가 각각 조금 다른 배경 톤. 비활성 opacity .42 + pointer-events none. focus-visible 2px solid #0071e3 + 오프셋 3px. with-paddlenav-onhover 변형은 컨테이너에 호버(호버 가능한 fine 포인터 한정)하기 전까지 opacity 0, focus-visible 도 표시시킴',
      motion: { trigger: '컨테이너 호버', change: '화살표 나타남 + 배경/글자색 변화', timing: 'transition: background 100ms linear, color 100ms linear, opacity 100ms linear', inferred: false },
      feel: ['프리미엄', '매우 빠름', '호버로 등장'], fits: ['프리미엄 제품 갤러리'], tall: false,
      demo: `<div class="A-20" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div>${pn(CL, CR, '이전 항목', '다음 항목')}</div>`,
      css: base('A-20') +
        `.A-20 .bt { position: absolute; top: 50%; margin-top: -18px; width: 36px; height: 36px; border-radius: 36px; background: color-mix(in srgb, var(--bg-1) 64%, transparent); color: var(--fg-1); transition: background 100ms linear, color 100ms linear, opacity 100ms linear; }
.A-20 .pv { left: 18px; }
.A-20 .nx { right: 18px; }
.A-20 .ic { width: 18px; height: 18px; }
@media (hover: hover) and (pointer: fine) {
  .A-20 .bt { opacity: 0; }
  .A-20:hover .bt, .A-20:has(.bt:focus-visible) .bt { opacity: 1; }
}
.A-20 .bt:hover:not(:disabled) { background: color-mix(in srgb, var(--bg-1) 80%, transparent); }
.A-20 .bt:active:not(:disabled) { background: color-mix(in srgb, var(--bg-1) 92%, transparent); }
.A-20 .bt:disabled { opacity: .42; pointer-events: none; }
@media (hover: hover) and (pointer: fine) {
  .A-20 .bt:disabled { opacity: 0; }
  .A-20:hover .bt:disabled, .A-20:has(.bt:focus-visible) .bt:disabled { opacity: .42; }
}
.A-20 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 3px; }`
    },
    {
      id: 'A-21', group: '실서비스', name: 'Apple 스크롤 갤러리 우하단 클러스터', source: 'Apple (iPhone 페이지)',
      url: 'https://www.apple.com/iphone/',
      look: '갤러리 아래 고정 바에 이전·다음을 나란히(gap 18px). 36px alpha 원 + 뒤에 그라디언트 스크림. 가운데 정렬 변형도 있음',
      states: 'aria-label="Previous item, Explore the lineup gallery". 바는 처음엔 hidden(visibility:hidden; opacity:0)으로 시작. 비활성 .42',
      motion: { trigger: '호버/누름', change: '배경·글자색 변화', timing: '100ms linear (background/color)', inferred: false },
      feel: ['콘텐츠 밖으로 뺀 컨트롤', '스크림', '빠름'], fits: ['긴 가로 선반(shelf)'], tall: false,
      demo: `<div class="A-21" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track>${sl(5)}</div></div><div class="bar">${pn(CL, CR, '이전 항목', '다음 항목')}</div></div>`,
      css: base('A-21') + tile('A-21', 50) +
        `.A-21 .bar { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: flex-end; gap: 18px; height: 52px; padding: 0 12px; background: linear-gradient(to top, color-mix(in srgb, var(--fg-1) 50%, transparent), transparent); pointer-events: none; }
.A-21 .bt { width: 36px; height: 36px; border-radius: 36px; background: color-mix(in srgb, var(--bg-1) 64%, transparent); color: var(--fg-1); pointer-events: auto; transition: background 100ms linear, color 100ms linear; }
.A-21 .ic { width: 18px; height: 18px; }
.A-21 .bt:hover:not(:disabled) { background: color-mix(in srgb, var(--bg-1) 80%, transparent); }
.A-21 .bt:disabled { opacity: .42; pointer-events: none; }
.A-21 .bt:focus-visible { outline: 2px solid var(--bg-1); outline-offset: 3px; }`
    },
    {
      id: 'A-22', group: '실서비스', name: 'Netflix 슬라이드인 엣지 패널', source: 'Netflix (로그아웃 Top 10 행)',
      url: 'https://www.netflix.com/',
      look: '오른쪽 가장자리의 검은 전체 높이 패널(padding-left 12px, z-index 3) 안에 24×120px 세로 알약(radius 8px, 배경 rgba(255,255,255,.1)), 24px 셰브론 rgba(255,255,255,.7)',
      states: '호버/focus-visible 배경 .2 + 아이콘 흰색. prev 패널은 스크롤한 뒤에만 나타남. 래퍼는 aria-hidden="true"',
      motion: { trigger: '스크롤 상태 변화', change: '패널이 translateX(100%) → 0 으로 들어오며 버튼은 opacity 0 → 1 (퇴장은 반대). 호버는 배경/색 변화. reduced-motion 이면 슬라이드 대신 페이드', timing: '패널·버튼 400ms ease-in-out, 호버 200ms ease-in-out', inferred: false },
      feel: ['어두운 UI', '슬라이드인', '세로 알약'], fits: ['어두운 UI의 미디어 행'], tall: false,
      demo: `<div class="A-22" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track>${sl(5)}</div></div>` +
        `<div class="pn pn-prev"><button type="button" class="bt pv" data-prev aria-label="이전 항목">{{i:chev-l}}</button></div>` +
        `<div class="pn pn-next"><button type="button" class="bt nx" data-next aria-label="다음 항목">{{i:chev-r}}</button></div></div>`,
      css: base('A-22') + tile('A-22', 50) +
        `.A-22 { background: var(--fg-1); }
.A-22 .pn { position: absolute; top: 0; bottom: 0; z-index: 3; display: flex; align-items: center; background: var(--fg-1); transition: transform 400ms ease-in-out; }
.A-22 .pn-prev { left: 0; padding-right: 12px; }
.A-22 .pn-next { right: 0; padding-left: 12px; }
.A-22.is-start .pn-prev { transform: translateX(-100%); }
.A-22.is-end .pn-next { transform: translateX(100%); }
.A-22 .bt { width: 24px; height: 120px; border-radius: 8px; background: color-mix(in srgb, var(--bg-1) 10%, transparent); color: color-mix(in srgb, var(--bg-1) 70%, transparent); transition: opacity 400ms ease-in-out, background 200ms ease-in-out, color 200ms ease-in-out; }
.A-22 .bt:hover:not(:disabled), .A-22 .bt:focus-visible { background: color-mix(in srgb, var(--bg-1) 20%, transparent); color: var(--bg-1); }
.A-22 .bt:disabled { opacity: 0; }`
    },
    {
      id: 'A-23', group: '실서비스', name: 'Airbnb 섹션 헤더 한 쌍', source: 'Airbnb',
      url: 'https://www.airbnb.co.kr/',
      look: '각 행 제목의 오른쪽 위에 28px 원 두 개를 나란히. 배경 #F2F2F2, 12px 셰브론 stroke 4',
      states: '비활성 opacity .5. 라벨에 위치 포함("showing 1–5 of 20 items"). 포커스는 이중 링 0 0 0 2px <inverse>, 0 0 0 4px <primary>',
      motion: { trigger: '호버', change: '1.0714배 확대(28px → 30px), 배경이 #EBEBEB 로', timing: 'transform 250ms cubic-bezier(.2,0,0,1), 배경 300ms 같은 곡선', inferred: false },
      feel: ['이미지 밖 컨트롤', '살짝 커짐', '정돈됨'], fits: ['제목이 있는 탐색 행'], tall: false,
      demo: `<div class="A-23" data-behavior="carousel" data-visible="2" data-step="50"><div class="hd"><span class="ttl">부산 인기 숙소</span><div class="pair">${pn(CL, CR, '이전 항목', '다음 항목')}</div></div><div class="vp"><div data-track>${sl(5)}</div></div></div>`,
      css: base('A-23') + tile('A-23', 50) +
        `.A-23 { background: var(--bg-1); }
.A-23 .hd { position: absolute; top: 12px; left: 16px; right: 16px; display: flex; align-items: center; justify-content: space-between; }
.A-23 .ttl { font-size: var(--text-18); font-weight: var(--weight-bold); color: var(--fg-1); }
.A-23 .pair { display: flex; gap: var(--space-2); }
.A-23 .vp { inset: 52px 16px 16px; }
.A-23 .bt { width: 28px; height: 28px; border-radius: 50%; background: var(--bg-2); color: var(--fg-1); transition: transform 250ms cubic-bezier(.2,0,0,1), background-color 300ms cubic-bezier(.2,0,0,1); }
.A-23 .ic { width: 12px; height: 12px; stroke-width: 4; }
.A-23 .bt:hover:not(:disabled) { transform: scale(1.0714); background: color-mix(in srgb, var(--bg-2) 94%, var(--fg-1)); }
.A-23 .bt:focus-visible { outline: 0; box-shadow: 0 0 0 2px var(--bg-1), 0 0 0 4px var(--fg-1); }
.A-23 .bt:disabled { opacity: .5; }`
    },
    {
      id: 'A-24', group: '실서비스', name: 'Airbnb 숙소 카드 사진 화살표', source: 'Airbnb',
      url: 'https://www.airbnb.co.kr/s/Busan/homes',
      look: '카드 사진 위. 32px 원, 배경 rgba(255,255,255,.9), 1px 테두리 rgba(0,0,0,.08), 그림자 0 2px 4px rgba(0,0,0,.18), 12px 셰브론',
      states: '카드에 호버하기 전까지 래퍼의 clip-path: inset(100%) 로 숨김(포커스는 유지됨). 첫 사진에선 prev 없음. 라벨 "다음 사진: <숙소 이름>"',
      motion: { trigger: '카드 호버', change: '클립 해제로 즉시 나타남. 출처에는 transform 전환만 있고 확대량이 없어, 버튼 호버 확대 1.0714는 Airbnb 헤더 쌍 값으로 가정한 추정', timing: '나타남 즉시, transform 250ms cubic-bezier(.2,0,0,1)', inferred: true },
      feel: ['카드 안', '키보드 접근 유지', '즉시 등장'], fits: ['카드 안 썸네일 캐러셀'], tall: false,
      demo: `<div class="A-24" data-behavior="carousel"><div class="vp"><div data-track>${sl(4)}</div></div><div class="wrap">${pn(CL, CR, '이전 사진', '다음 사진: 해운대 숙소')}</div></div>`,
      css: base('A-24') +
        `.A-24 { inset: 16px 50%; width: 200px; margin-left: -100px; border-radius: var(--radius-md); overflow: hidden; }
.A-24 .wrap { position: absolute; inset: 0; clip-path: inset(100%); pointer-events: none; }
.A-24:hover .wrap, .A-24 .wrap:focus-within { clip-path: none; }
.A-24 .bt { position: absolute; top: 50%; margin-top: -16px; width: 32px; height: 32px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--fg-1) 8%, transparent); background: color-mix(in srgb, var(--bg-1) 90%, transparent); color: var(--fg-1); box-shadow: 0 2px 4px color-mix(in srgb, var(--fg-1) 18%, transparent); pointer-events: auto; transition: transform 250ms cubic-bezier(.2,0,0,1); }
.A-24 .pv { left: 8px; }
.A-24 .nx { right: 8px; }
.A-24 .ic { width: 12px; height: 12px; }
.A-24 .bt:hover { transform: scale(1.0714); }
.A-24 .bt:disabled { display: none; }`
    },
    {
      id: 'A-25', group: '실서비스', name: 'Airbnb 가장자리 걸친 플로팅 화살표', source: 'Airbnb',
      url: 'https://www.airbnb.co.kr/',
      look: '행 가장자리에 걸친 36px 흰 원. 1px 테두리 rgba(0,0,0,.08), 그림자 0 8px 24px rgba(0,0,0,.1)',
      states: '시작 지점의 prev 는 비활성이며 opacity 0',
      motion: { trigger: '시작/끝 도달', change: '불투명도 변화로 사라짐/나타남', timing: 'opacity .15s linear', inferred: false },
      feel: ['플로팅', '큰 그림자', '가장자리에 걸침'], fits: ['흰 배경의 카드 행'], tall: false,
      demo: `<div class="A-25" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track>${sl(5)}</div></div>${pn(CL, CR, '이전 항목', '다음 항목')}</div>`,
      css: base('A-25') + tile('A-25', 50) +
        `.A-25 { background: var(--bg-1); }
.A-25 .vp { inset: 16px 28px; }
.A-25 .bt { position: absolute; top: 50%; margin-top: -18px; width: 36px; height: 36px; border: 1px solid color-mix(in srgb, var(--fg-1) 8%, transparent); border-radius: 50%; background: var(--bg-1); color: var(--fg-1); box-shadow: 0 8px 24px color-mix(in srgb, var(--fg-1) 10%, transparent); transition: opacity .15s linear; }
.A-25 .pv { left: 10px; }
.A-25 .nx { right: 10px; }
.A-25 .ic { width: 16px; height: 16px; }
.A-25 .bt:disabled { opacity: 0; pointer-events: none; }`
    },
    {
      id: 'A-26', group: '실서비스', name: 'YouTube 칩 바 엣지 페이드', source: 'YouTube',
      url: 'https://www.youtube.com/results?search_query=ui+design',
      look: '화살표 컨테이너는 양끝에 절대 위치 전체 높이(z-index 200). 40px 투명 원, 아이콘 #0F0F0F(var(--fg-1)). 칩은 화살표 아래에서 mask-image: linear-gradient(90deg, transparent 51px, #000 77px) 로 페이드(여기선 마스크 색에 var(--fg-1) 사용)',
      states: '행이 시작 또는 끝이면 화살표는 display:none. 라벨 "다음"',
      motion: { trigger: '호버', change: '호버 레이어가 opacity 0 → 1, scale .9 → 1, 채움 rgba(0,0,0,.2)', timing: '300ms cubic-bezier(.05,0,0,1)', inferred: false },
      feel: ['엣지 페이드', '번지는 호버 원', '칩 행'], fits: ['필터/태그 칩 행'], tall: false,
      demo: `<div class="A-26" data-behavior="scroller" data-step="0.8"><div class="bar"><div class="chips" data-scroller tabindex="0" aria-label="칩 목록">${chips(['전체', 'UI 디자인', '모션', '아이콘', '타이포', '컬러', '프로토타입', '접근성', '최근 업로드'], 0)}</div>` +
        `<div class="ar ar-p"><button type="button" class="bt" data-prev aria-label="이전">{{i:chev-l}}</button></div>` +
        `<div class="ar ar-n"><button type="button" class="bt" data-next aria-label="다음">{{i:chev-r}}</button></div></div></div>`,
      css: `.A-26 { position: absolute; inset: 0; background: var(--bg-1); }
.A-26 .bar { position: absolute; left: 0; right: 0; top: 50%; height: 56px; margin-top: -28px; }
.A-26 .chips { position: absolute; inset: 0; display: flex; align-items: center; gap: var(--space-3); padding: 0 var(--space-3); overflow-x: auto; scrollbar-width: none; -webkit-mask-image: linear-gradient(90deg, transparent 51px, var(--fg-1) 77px), linear-gradient(270deg, transparent 51px, var(--fg-1) 77px); -webkit-mask-composite: source-in; mask-image: linear-gradient(90deg, transparent 51px, var(--fg-1) 77px), linear-gradient(270deg, transparent 51px, var(--fg-1) 77px); mask-composite: intersect; }
.A-26 .chips::-webkit-scrollbar { display: none; }
.A-26.is-start .chips { -webkit-mask-image: linear-gradient(270deg, transparent 51px, var(--fg-1) 77px); mask-image: linear-gradient(270deg, transparent 51px, var(--fg-1) 77px); }
.A-26.is-end .chips { -webkit-mask-image: linear-gradient(90deg, transparent 51px, var(--fg-1) 77px); mask-image: linear-gradient(90deg, transparent 51px, var(--fg-1) 77px); }
.A-26.is-start.is-end .chips { -webkit-mask-image: none; mask-image: none; }
.A-26 .chip { flex: none; padding: var(--space-2) var(--space-3); border: 0; border-radius: var(--radius-md); font: inherit; font-size: var(--text-14); font-weight: var(--weight-medium); color: var(--fg-1); background: var(--bg-2); cursor: pointer; }
.A-26 .chip.on { background: var(--fg-1); color: var(--bg-1); }
.A-26 .ar { position: absolute; top: 0; bottom: 0; z-index: 200; display: flex; align-items: center; width: 51px; pointer-events: none; }
.A-26 .ar-p { left: 0; justify-content: flex-start; padding-left: 4px; }
.A-26 .ar-n { right: 0; justify-content: flex-end; padding-right: 4px; }
.A-26 .bt { position: relative; display: grid; place-items: center; width: 40px; height: 40px; padding: 0; border: 0; border-radius: 50%; background: none; color: var(--fg-1); cursor: pointer; pointer-events: auto; }
.A-26 .bt::before { content: ''; position: absolute; inset: 0; border-radius: 50%; background: color-mix(in srgb, var(--fg-1) 20%, transparent); opacity: 0; transform: scale(.9); transition: opacity 300ms cubic-bezier(.05,0,0,1), transform 300ms cubic-bezier(.05,0,0,1); }
.A-26 .bt:hover::before, .A-26 .bt:focus-visible::before { opacity: 1; transform: scale(1); }
.A-26 .ic { position: relative; display: block; width: 24px; height: 24px; }
.A-26 .bt:disabled { display: none; }`
    },
    {
      id: 'A-27', group: '실서비스', name: 'Google Play 플로팅 액션 버튼', source: 'Google Play',
      url: 'https://play.google.com/store/games',
      look: '선반 오른쪽 가장자리. 56px 흰 원(radius 28px), Material chevron_right 24px #5F6368(var(--fg-3)). 엘리베이션 그림자 0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)',
      states: '원본은 행에 호버하기 전까지 display:none(데모는 키보드 접근을 위해 opacity 0 + pointer-events none으로 숨김). 시작에서는 next 만 표시. 호버 시 그림자가 0 2px 6px 2px(.15)로 상승. 라벨 "다음으로 스크롤"',
      motion: { trigger: '행 호버 / 버튼 호버', change: '버튼 등장(display), 그림자 상승', timing: 'box-shadow .28s cubic-bezier(.4,0,.2,1), transform .27s cubic-bezier(0,0,.2,1)', inferred: false },
      feel: ['머티리얼 FAB', '큰 원', '그림자 상승'], fits: ['앱/상품 선반'], tall: false,
      demo: `<div class="A-27" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track>${sl(5)}</div></div>${pn(CL, CR, '이전으로 스크롤', '다음으로 스크롤')}</div>`,
      css: base('A-27') + tile('A-27', 50) +
        `.A-27 { background: var(--bg-1); }
.A-27 .vp { inset: 16px 12px; }
.A-27 .bt { position: absolute; top: 50%; margin-top: -28px; width: 56px; height: 56px; border-radius: 28px; background: var(--bg-1); color: var(--fg-3); box-shadow: 0 1px 2px color-mix(in srgb, var(--fg-1) 30%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--fg-1) 15%, transparent); transition: box-shadow .28s cubic-bezier(.4,0,.2,1), transform .27s cubic-bezier(0,0,.2,1); opacity: 0; pointer-events: none; }
.A-27 .pv { left: 8px; }
.A-27 .nx { right: 8px; }
.A-27:hover .bt:not(:disabled), .A-27:has(.bt:focus-visible) .bt:not(:disabled) { opacity: 1; pointer-events: auto; }
.A-27 .bt:hover { box-shadow: 0 1px 2px color-mix(in srgb, var(--fg-1) 30%, transparent), 0 2px 6px 2px color-mix(in srgb, var(--fg-1) 15%, transparent); }`
    },
    {
      id: 'A-28', group: '실서비스', name: 'App Store 웹 슬림 톨 패들', source: 'Apple App Store 웹',
      url: 'https://apps.apple.com/us/iphone/apps',
      look: '양쪽 가장자리에서 6px. 28×64px 둥근 사각형(radius 6px), 얇은 8.5×30.5px 셰브론 SVG. 배경 rgb(220,220,220)(라이트) / rgb(10,10,10)(다크). 오른쪽은 왼쪽을 scale:-1 1 로 뒤집은 것',
      states: '선반에 호버하거나 안쪽에 포커스가 있기 전까지 opacity 0. 비활성은 opacity 0. 호버/focus-visible 과 active 는 각각 더 강한 시스템 채움으로 이동, active 는 아이콘도 어둡게. 스크롤 중엔 pointer-events 꺼짐. 라벨 "Previous Page"/"Next Page"',
      motion: { trigger: '선반 호버/포커스', change: '화살표 나타남, 배경·글자색이 더 강하게', timing: 'background-color .25s linear, color .25s linear, opacity .25s linear', inferred: false },
      feel: ['얇고 긴', '다크모드 대응', '밀집 선반'], fits: ['밀집된 그리드 선반'], tall: false,
      demo: `<div class="A-28" data-behavior="carousel" data-visible="3" data-step="33.333"><div class="vp"><div data-track>${sl(6)}</div></div>${pn('{{i:a-slim-l}}', '{{i:a-slim-l}}', '이전 페이지', '다음 페이지')}</div>`,
      css: base('A-28') + tile('A-28', 33.333) +
        `.A-28 { background: var(--bg-1); }
.A-28 .vp { inset: 16px 12px; }
.A-28 .bt { position: absolute; top: 50%; margin-top: -32px; width: 28px; height: 64px; border-radius: 6px; background: color-mix(in srgb, var(--fg-1) 14%, var(--bg-1)); color: var(--fg-2); opacity: 0; transition: background-color .25s linear, color .25s linear, opacity .25s linear; }
.A-28 .pv { left: 6px; }
.A-28 .nx { right: 6px; scale: -1 1; }
.A-28 .ic { width: 32px; height: 32px; }
.A-28:hover .bt:not(:disabled), .A-28:has(.bt:focus-visible) .bt:not(:disabled) { opacity: 1; }
.A-28 .bt:hover:not(:disabled), .A-28 .bt:focus-visible { background: color-mix(in srgb, var(--fg-1) 22%, var(--bg-1)); }
.A-28 .bt:active:not(:disabled) { background: color-mix(in srgb, var(--fg-1) 30%, var(--bg-1)); color: var(--fg-1); }
.A-28 .bt:disabled { opacity: 0; }`
    },
    {
      id: 'A-29', group: '실서비스', name: 'Nike 헤더 오른쪽 한 쌍', source: 'Nike',
      url: 'https://www.nike.com/',
      look: '각 선반 헤더의 오른쪽 위. 48px 원 #E5E5E5, 24px 선 셰브론 #111(var(--fg-1))',
      states: '호버 #CACACB. 비활성은 배경 #F5F5F5 + 아이콘 #9E9EA0 이고 계속 보임. 포커스 링 0 0 0 2px rgb(39,93,197). 이 버튼엔 aria-label 이 없었음(접근성 구멍) — 여기선 라벨을 달았다',
      motion: { trigger: '호버', change: '배경색 진해짐', timing: 'background-color .25s cubic-bezier(.25,.1,.25,1) (= ease)', inferred: false },
      feel: ['커머스', '큰 원', '비활성도 보임'], fits: ['커머스 상품 레일'], tall: false,
      demo: `<div class="A-29" data-behavior="carousel" data-visible="2" data-step="50"><div class="hd"><span class="ttl">이번 주 인기</span><div class="pair">${pn(CL, CR, '이전 상품', '다음 상품')}</div></div><div class="vp"><div data-track>${sl(5)}</div></div></div>`,
      css: base('A-29') + tile('A-29', 50) +
        `.A-29 { background: var(--bg-1); }
.A-29 .hd { position: absolute; top: 8px; left: 16px; right: 16px; display: flex; align-items: center; justify-content: space-between; }
.A-29 .ttl { font-size: var(--text-18); font-weight: var(--weight-bold); color: var(--fg-1); }
.A-29 .pair { display: flex; gap: var(--space-2); }
.A-29 .vp { inset: 64px 16px 12px; }
.A-29 .bt { width: 48px; height: 48px; border-radius: 24px; background: color-mix(in srgb, var(--fg-1) 10%, var(--bg-1)); color: var(--fg-1); transition: background-color .25s cubic-bezier(.25,.1,.25,1); }
.A-29 .bt:hover:not(:disabled) { background: color-mix(in srgb, var(--fg-1) 20%, var(--bg-1)); }
.A-29 .bt:focus-visible { outline: 0; box-shadow: 0 0 0 2px var(--fg-1); }
.A-29 .bt:disabled { background: color-mix(in srgb, var(--fg-1) 4%, var(--bg-1)); color: var(--fg-4); }`
    }
  ]);
})();
