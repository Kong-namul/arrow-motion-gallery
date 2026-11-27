/* D — 가로 스크롤. 출처: research/DE-scroll-pageturn.md ("HORIZONTAL SCROLL CONTAINERS" 14개) */
(function () {
  'use strict';
  var CH = ['전체', '인기', '신규', '할인', '베스트', '추천', '기획전', '브랜드', '리뷰', '이벤트'];
  var TABS = ['개요', '분석', '리포트', '고객', '주문', '재고', '정산', '설정', '알림', '도움말'];
  function chips(list, cls) {
    return (list || CH).map(function (t) { return '<button type="button" class="' + (cls || 'chip') + '">' + t + '</button>'; }).join('');
  }
  /* 공통 칩 행 CSS (각 항목 번호로 범위 지정) */
  function CHIP(id) {
    return '.' + id + ' { width: 100%; }\n' +
      '.' + id + ' [data-scroller] { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }\n' +
      '.' + id + ' [data-scroller]::-webkit-scrollbar { display: none; }\n' +
      '.' + id + ' .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }';
  }
  /* 공통 둥근 화살표 버튼 CSS (오버레이형) */
  function NAV(id) {
    return '.' + id + ' .nav { position: absolute; top: 50%; translate: 0 -50%; z-index: 2; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); cursor: pointer; }\n' +
      '.' + id + ' .nav .ic { width: 16px; height: 16px; }\n' +
      '.' + id + ' .nav:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }';
  }
  function nav(l, r) {
    return '<button type="button" class="nav nav-l" data-prev aria-label="이전">{{i:chev-l}}</button>' +
      '<button type="button" class="nav nav-r" data-next aria-label="다음">{{i:chev-r}}</button>';
  }

  ARROW_DATA.add([
    /* ───────── CSS 네이티브·스크롤 구동 ───────── */
    {
      id: 'D-01', group: 'CSS 네이티브·스크롤 구동',
      name: '네이티브 ::scroll-button + ::scroll-marker',
      source: 'Chrome for Developers · MDN',
      url: 'https://developer.chrome.com/blog/carousels-with-css',
      look: '브라우저가 스크롤러 옆에 진짜 <button>을 만들어 준다. 아이콘은 content 글리프(Chrome 샘플 "⬅"/"⮕", MDN "◄"/"►"). MDN 스타일은 테두리·배경 없음, font-size 2rem, opacity .7. 앵커 위치로 align-self: anchor-center, 가장자리에서 45–70px 겹침. 마커는 16px 원 + 2px 테두리, 마커 그룹은 행 아래 20px 간격.',
      states: '스크롤 시작·끝에서 버튼이 스스로 :disabled (MDN opacity .2, cursor unset). 호버/포커스 opacity 1, :active translate 1px 1px. 대체 텍스트는 content:"◄" / "Previous". 항목이 스냅/보이면 마커에 :target-current. 마커는 탭리스트처럼 동작. Chrome 135+ 전용, Firefox·Safari 미지원 → 미지원이면 아래 데모처럼 일반 버튼 + 안내 문구로 대체(점진적 향상). Chrome 자체 캐러셀 가이드는 "당분간 쓰지 말라"고 안내.',
      motion: { trigger: '버튼 클릭', change: '스크롤러가 한 "페이지"(스크롤포트의 85%)만큼 이동, 스냅이면 한 페이지 앞 스냅 지점으로', timing: '이동 85% · 마커 transition: all 0.7s (MDN 마커 데모)', inferred: false },
      feel: ['제로 JS', '브라우저 기본', '점진적 향상'],
      fits: ['스냅 행', 'Chromium 전용 캐러셀'],
      demo: `<div class="D-01" data-behavior="scroller" data-step="0.85">
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록">${chips()}</div>
  <button type="button" class="fb fb-l" data-prev aria-label="이전">{{i:chev-l}}</button>
  <button type="button" class="fb fb-r" data-next aria-label="다음">{{i:chev-r}}</button>
  <p class="note">이 브라우저는 ::scroll-button 미지원 — Chrome 135+ 에서는 브라우저가 만든 화살표가 보인다.</p>
</div>`,
      css: `.D-01 { position: relative; width: 100%; }
.D-01 .row { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; scroll-snap-type: x mandatory; anchor-name: --D-01-row; scroll-marker-group: after; }
.D-01 .row::-webkit-scrollbar { display: none; }
.D-01 .chip { flex: none; scroll-snap-align: start; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-01 .fb { position: absolute; top: 0; z-index: 2; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 0; border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); opacity: .7; cursor: pointer; }
.D-01 .fb:hover, .D-01 .fb:focus-visible { opacity: 1; }
.D-01 .fb:disabled { opacity: .2; cursor: default; }
.D-01 .fb .ic { width: 16px; height: 16px; }
.D-01 .fb-l { left: 0; } .D-01 .fb-r { right: 0; }
.D-01 .note { margin: var(--space-3) 0 0; font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-3); }
@supports selector(::scroll-button(*)) {
  .D-01 .fb, .D-01 .note { display: none; }
  .D-01 .row::scroll-button(*) { position: absolute; position-anchor: --D-01-row; align-self: anchor-center; display: grid; place-items: center; width: 32px; height: 32px; border: 0; border-radius: 50%; background: var(--bg-1); box-shadow: var(--shadow-sm); color: var(--fg-1); font-size: 14px; opacity: .7; cursor: pointer; }
  .D-01 .row::scroll-button(left) { content: "◄" / "이전"; left: calc(anchor(left) + 4px); }
  .D-01 .row::scroll-button(right) { content: "►" / "다음"; right: calc(anchor(right) + 4px); }
  .D-01 .row::scroll-button(*):hover, .D-01 .row::scroll-button(*):focus-visible { opacity: 1; }
  /* 광학 보정: ◄ ► 삼각형 잉크 폭 ≈ .5em, 1/6 ≈ .08em 만큼 가리키는 쪽으로 (14px 에서 약 1px). :active 는 아래에서 덮어써 같이 쓴다 */
  .D-01 .row::scroll-button(left) { translate: calc(var(--optical, 1) * -0.08em) 0; }
  .D-01 .row::scroll-button(right) { translate: calc(var(--optical, 1) * 0.08em) 0; }
  .D-01 .row::scroll-button(left):active { translate: calc(var(--optical, 1) * -0.08em + 1px) 1px; }
  .D-01 .row::scroll-button(right):active { translate: calc(var(--optical, 1) * 0.08em + 1px) 1px; }
  .D-01 .row::scroll-button(*):disabled { opacity: .2; cursor: unset; }
  .D-01 .row::scroll-marker-group { display: flex; gap: var(--space-2); justify-content: center; margin-top: 20px; }
  .D-01 .chip::scroll-marker { content: ""; width: 16px; height: 16px; border: 2px solid var(--fg-1); border-radius: 50%; transition: all 0.7s; }
  .D-01 .chip::scroll-marker:target-current { background: var(--fg-1); }
}`
    },
    {
      id: 'D-02', group: 'CSS 네이티브·스크롤 구동',
      name: 'scroll-state 쿼리로 갈 수 있는 쪽만 화살표',
      source: 'Chrome — CSS scroll-state queries',
      url: 'https://developer.chrome.com/blog/css-scroll-state-queries',
      look: '스크롤러 안쪽(position: sticky)에 둔 화살표. 갈 수 있는 쪽에만 보인다. 그림자/화살표는 스크롤러의 의사요소나 자손이어야 쿼리할 수 있다.',
      states: '@container scroll-state(scrollable: left|right) 는 그 방향에 내용이 있을 때만 참(Chrome 133+). 미지원 브라우저는 동작 클래스(.is-start/.is-end)로 같은 결과를 낸다. 샘플의 화살표는 translate: 0 calc(100% + 10px) 로 화면 밖에 두고 rotate: .5turn 으로 뒤집으며 자체 전환은 없다(직접 추가).',
      motion: { trigger: '스크롤로 갈 수 있는 방향이 생기거나 사라질 때', change: '불투명도 0↔1 (@property 로 등록한 불투명도)', timing: '.5s ease', inferred: false },
      feel: ['순수 CSS', '조용한 등장', '방향 인식'],
      fits: ['처음엔 왼쪽 화살표 없는 행', '칩/탭 바'],
      demo: `<div class="D-02" data-behavior="scroller">
  <div class="row" data-scroller>
    <button type="button" class="sa sa-l" data-prev aria-label="이전">{{i:chev-l}}</button>
    ${chips()}
    <button type="button" class="sa sa-r" data-next aria-label="다음">{{i:chev-r}}</button>
  </div>
</div>`,
      css: CHIP('D-02') + `
.D-02 .row { container-type: scroll-state; align-items: center; }
.D-02 .sa { position: sticky; z-index: 1; flex: none; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); cursor: pointer; opacity: 0; pointer-events: none; transition: opacity .5s ease; }
.D-02 .sa .ic { width: 16px; height: 16px; }
.D-02 .sa-l { left: 0; } .D-02 .sa-r { right: 0; }
.D-02 .sa:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
@supports (container-type: scroll-state) {
  @container scroll-state(scrollable: left) { .D-02 .sa-l { opacity: 1; pointer-events: auto; } }
  @container scroll-state(scrollable: right) { .D-02 .sa-r { opacity: 1; pointer-events: auto; } }
}
@supports not (container-type: scroll-state) {
  .D-02 .sa:not(:disabled) { opacity: 1; pointer-events: auto; }
}`
    },
    {
      id: 'D-03', group: 'CSS 네이티브·스크롤 구동',
      name: '스크롤 구동 엣지 페이드 마스크',
      source: 'Chrome modern-web-guidance (Tabs)',
      url: 'https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/tabs.md.txt',
      look: '버튼 없음. 내용이 더 있는 가장자리마다 --fade-size: 3rem(48px) 폭으로 흐려진다. 칩·탭 행에 좋고 화살표와 같이 써도 된다.',
      states: '넘침이 없으면 타임라인이 비활성이라 페이드도 없다. --fade-start/--fade-end 는 @property 로 <length> 등록 필수. 미지원 브라우저는 양쪽을 항상 흐리게(정적 마스크).',
      motion: { trigger: '스크롤 위치(시간이 아님)', change: '시작 가장자리는 처음 48px 동안 페이드가 켜지고, 끝 가장자리는 마지막 48px 동안 꺼진다', timing: 'animation: reveal-fade-start linear both, hide-fade-end linear both · animation-timeline: scroll(self inline) · animation-range: 0 48px, calc(100% - 48px) 100%', inferred: false },
      feel: ['버튼 없는', '스크롤에 묶임', '은은한 단서'],
      fits: ['칩 행', '탭 바'],
      demo: `<div class="D-03" data-behavior="scroller" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록 (드래그 또는 스크롤)">${chips()}</div>
</div>`,
      css: CHIP('D-03') + `
@property --D-03-fs { syntax: "<length>"; inherits: false; initial-value: 48px; }
@property --D-03-fe { syntax: "<length>"; inherits: false; initial-value: 48px; }
.D-03 .row { --fade-start: 48px; --fade-end: 48px; padding-inline: var(--space-1); cursor: grab; mask-image: linear-gradient(to right, transparent, var(--fg-1) var(--D-03-fs), var(--fg-1) calc(100% - var(--D-03-fe)), transparent); }
.D-03.is-dragging .row { cursor: grabbing; }
@supports (animation-timeline: scroll()) {
  .D-03 .row { animation: D-03-reveal-fade-start linear both, D-03-hide-fade-end linear both; animation-timeline: scroll(self inline); animation-range: 0 48px, calc(100% - 48px) 100%; }
}
@keyframes D-03-reveal-fade-start { from { --D-03-fs: 0px; } to { --D-03-fs: 48px; } }
@keyframes D-03-hide-fade-end { from { --D-03-fe: 48px; } to { --D-03-fe: 0px; } }`
    },
    {
      id: 'D-04', group: 'CSS 네이티브·스크롤 구동',
      name: '스티키 스크롤 그림자 (scroll-timeline)',
      source: 'Roman Komarov (kizu)',
      url: 'https://kizu.dev/scroll-driven-animations/',
      look: '가장자리에 붙은(sticky) 그림자 요소. 화살표 옆에서 쓰는 은은한 넘침 단서.',
      states: '시작 그림자는 처음 --height 만큼 스크롤하는 동안 나타나고, 끝 그림자는 animation-direction: reverse 로 마지막 구간에서 사라진다. @supports (animation-timeline: scroll()) 로 감싼다. 가로 행은 scroll(nearest inline) (추정). 미지원이면 그림자를 항상 표시.',
      motion: { trigger: '스크롤 위치', change: '그림자 불투명도 0→1 (@keyframes to-opaque)', timing: 'animation-timeline: scroll(), 구간 = 처음 24px / 마지막 24px (데모 값, --height)', inferred: true },
      feel: ['미세한 깊이', '스크롤에 묶임', '버튼 없는'],
      fits: ['표·행 옆 보조 단서', '화살표와 함께'],
      demo: `<div class="D-04" data-behavior="scroller" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록">
    <span class="sh sh-l" aria-hidden="true"></span>${chips()}<span class="sh sh-r" aria-hidden="true"></span>
  </div>
</div>`,
      css: `.D-04 { width: 100%; --height: 24px; }
.D-04 .row { display: flex; overflow-x: auto; scrollbar-width: none; cursor: grab; }
.D-04 .row::-webkit-scrollbar { display: none; }
.D-04 .chip { flex: none; margin-right: var(--space-2); padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-04 .sh { position: sticky; z-index: 2; flex: none; width: 0; pointer-events: none; }
.D-04 .sh-l { left: 0; } .D-04 .sh-r { right: 0; margin-left: calc(var(--space-2) * -1); }
.D-04 .sh::before { content: ""; position: absolute; top: 0; width: var(--height); height: 100%; opacity: 1; }
.D-04 .sh-l::before { left: 0; background: linear-gradient(to right, color-mix(in srgb, var(--fg-1) 20%, transparent), transparent); }
.D-04 .sh-r::before { right: 0; background: linear-gradient(to left, color-mix(in srgb, var(--fg-1) 20%, transparent), transparent); }
@supports (animation-timeline: scroll()) {
  .D-04 .sh::before { opacity: 0; animation: D-04-to-opaque linear both; animation-timeline: scroll(nearest inline); }
  .D-04 .sh-l::before { animation-range: 0px var(--height); }
  .D-04 .sh-r::before { animation-direction: reverse; animation-range: calc(100% - var(--height)) 100%; }
}
@keyframes D-04-to-opaque { from { opacity: 0; } to { opacity: 1; } }`
    },
    {
      id: 'D-05', group: 'CSS 네이티브·스크롤 구동',
      name: '클래식 background-attachment 스크롤 그림자',
      source: 'CSS-Tricks (Lea Verou / Roman Komarov)',
      url: 'https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/',
      look: '가장자리의 방사형 그림자(원본 rgba(0,0,0,.2)). "커버" 그라디언트가 내용과 함께 움직이며 끝에서는 그림자를 가린다. 레이어 4개: 커버 선형 2 + radial-gradient(farthest-side at 0 50%, …) 2. 커버 40px, 그림자 14px 는 추정 값.',
      states: '내용이 더 있는 쪽에만 그림자가 보인다. 모든 브라우저에서 동작.',
      motion: { trigger: '스크롤', change: '그림자가 스크롤 위치를 즉시 따라감', timing: '없음 (전환·애니메이션 0)', inferred: false },
      feel: ['즉각적', '호환성 최고', '아주 미세'],
      fits: ['표', '가로 목록'],
      demo: `<div class="D-05" data-behavior="scroller" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록">${chips()}</div>
</div>`,
      css: CHIP('D-05') + `
.D-05 .row { padding: var(--space-2) var(--space-4); cursor: grab; background-color: var(--bg-2);
  background-image:
    linear-gradient(to right, var(--bg-2) 30%, transparent),
    linear-gradient(to left, var(--bg-2) 30%, transparent),
    radial-gradient(farthest-side at 0 50%, color-mix(in srgb, var(--fg-1) 20%, transparent), transparent),
    radial-gradient(farthest-side at 100% 50%, color-mix(in srgb, var(--fg-1) 20%, transparent), transparent);
  background-position: left center, right center, left center, right center;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-repeat: no-repeat;
  background-attachment: local, local, scroll, scroll; }`
    },
    {
      id: 'D-06', group: 'CSS 네이티브·스크롤 구동',
      name: '"스크롤 되나?" 토글로 화살표 표시',
      source: 'Bramus — Solved by CSS Scroll-Driven Animations',
      url: 'https://www.bram.us/2023/09/16/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not/',
      look: '요소가 넘칠 때만 그려지는 표시기. 위 줄은 넘치고 아래 줄은 넘치지 않는 두 행으로 비교한다.',
      states: '스크롤 가능한 넘침이 있을 때만 애니메이션이 돌아 space-toggle 변수 --can-scroll 을 세운다. display 대신 visibility 를 써서 레이아웃 이동이 없다. 미지원이면 동작 클래스(.is-overflow)로 대체.',
      motion: { trigger: '넘침 유무 (스크롤 타임라인 활성 여부)', change: 'visibility 토글 (토글 자체에는 전환 없음, 불투명도 페이드는 직접 추가)', timing: 'animation: detect-scroll linear · animation-timeline: scroll(self inline) · 토글 즉시', inferred: false },
      feel: ['조건부', '레이아웃 안정', '즉시 토글'],
      fits: ['반응형 칩 행', '넘칠 때만 보이는 화살표'],
      demo: `<div class="D-06">
  <p class="lbl">넘치는 줄</p>
  <div class="rw" data-behavior="scroller"><div class="sc" data-scroller>
    <button type="button" class="ar ar-l" data-prev aria-label="이전">{{i:chev-l}}</button>${chips()}<button type="button" class="ar ar-r" data-next aria-label="다음">{{i:chev-r}}</button>
  </div></div>
  <p class="lbl">넘치지 않는 줄</p>
  <div class="rw" data-behavior="scroller"><div class="sc" data-scroller>
    <button type="button" class="ar ar-l" data-prev aria-label="이전">{{i:chev-l}}</button>${chips(CH.slice(0, 3))}<button type="button" class="ar ar-r" data-next aria-label="다음">{{i:chev-r}}</button>
  </div></div>
</div>`,
      css: `.D-06 { width: 100%; display: grid; gap: var(--space-1); }
.D-06 .lbl { margin: 0; font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-3); }
.D-06 .sc { display: flex; align-items: center; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.D-06 .sc::-webkit-scrollbar { display: none; }
.D-06 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-06 .ar { position: sticky; z-index: 1; flex: none; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); cursor: pointer; }
.D-06 .ar .ic { width: 16px; height: 16px; }
.D-06 .ar:disabled { opacity: .35; cursor: default; }
.D-06 .ar:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.D-06 .ar-l { left: 0; } .D-06 .ar-r { right: 0; }
@keyframes D-06-detect-scroll { from, to { --can-scroll: ; } }
@supports (animation-timeline: scroll()) {
  .D-06 .sc { animation: D-06-detect-scroll linear; animation-timeline: scroll(self inline); }
  .D-06 .ar { --v: var(--can-scroll) visible; visibility: var(--v, hidden); }
}
@supports not (animation-timeline: scroll()) {
  .D-06 .rw:not(.is-overflow) .ar { visibility: hidden; }
}`
    },

    /* ───────── 라이브러리 스크롤 컨트롤 ───────── */
    {
      id: 'D-07', group: '라이브러리 스크롤 컨트롤',
      name: 'MUI Tabs scrollButtons="auto"',
      source: 'Material UI',
      url: 'https://mui.com/material-ui/react-tabs/',
      look: '양쪽에 폭 40px 컬럼, 안에 작은 KeyboardArrowLeft/Right 아이콘(opacity .8). 세로 탭이면 높이 40px 이고 아이콘이 90° 회전.',
      states: 'IntersectionObserver 가 첫/끝 탭을 감시(root=스크롤러, threshold 0.99). 가장자리 탭이 완전히 보이면 그쪽 버튼이 disabled 되며 opacity 0, 40px 자리는 유지(점프 없음). "auto"는 한쪽이라도 넘칠 때만 렌더. sm 미만(600px)에서는 allowScrollButtonsMobile 이 없으면 display:none.',
      motion: { trigger: '버튼 클릭', change: 'scrollLeft 를 rAF 로 애니메이션 (easeInOutSin = (1+sin(πt−π/2))/2), reduced-motion 이면 즉시 이동. disabled 토글 자체는 즉시', timing: '300ms (theme duration.standard) · 데모는 smooth 스크롤로 근사', inferred: false },
      feel: ['앱 탭 바', '자리 유지', '담백'],
      fits: ['데스크톱 앱 탭 바', '대시보드 탭'],
      demo: `<div class="D-07" data-behavior="scroller" data-step="0.8">
  <button type="button" class="sb" data-prev aria-label="이전 탭">{{i:chev-l}}</button>
  <div class="tabs" data-scroller role="tablist" aria-label="분석 탭">${TABS.map(function (t, k) { return '<button type="button" role="tab" class="tab" aria-selected="' + (k === 0) + '">' + t + '</button>'; }).join('')}</div>
  <button type="button" class="sb" data-next aria-label="다음 탭">{{i:chev-r}}</button>
</div>`,
      css: `.D-07 { display: flex; align-items: center; width: 100%; border-bottom: 1px solid var(--border); background: var(--bg-1); }
.D-07 .tabs { display: flex; flex: 1; min-width: 0; overflow-x: auto; scrollbar-width: none; }
.D-07 .tabs::-webkit-scrollbar { display: none; }
.D-07 .tab { flex: none; padding: var(--space-3) var(--space-4); border: 0; border-bottom: 2px solid transparent; background: none; color: var(--fg-3); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); cursor: pointer; }
.D-07 .tab[aria-selected="true"] { color: var(--fg-1); border-bottom-color: var(--fg-1); }
.D-07 .sb { display: grid; place-items: center; flex: none; width: 40px; align-self: stretch; padding: 0; border: 0; background: none; color: var(--fg-1); opacity: .8; cursor: pointer; }
.D-07 .sb:disabled { opacity: 0; cursor: default; }
.D-07 .sb:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.D-07 .sb .ic { width: 20px; height: 20px; }
.D-07:not(.is-overflow) .sb { display: none; }
@media (max-width: 599px) { .D-07 .sb { display: none; } }`
    },
    {
      id: 'D-08', group: '라이브러리 스크롤 컨트롤',
      name: 'Angular Material 페이지네이션 탭 헤더',
      source: 'Angular Components',
      url: 'https://raw.githubusercontent.com/angular/components/main/src/material/tabs/paginated-tab-header.ts',
      look: '양 끝에 최소 폭 32px 스트립. 셰브론은 순수 CSS: 8×8px 상자에 border-width: 2px 2px 0 0, -135°(앞) 또는 45°(뒤) 회전.',
      states: 'scrollWidth − containerWidth ≥ 5px 일 때 표시(Safari 반올림 루프 방지용 임계값). 끝에서는 disabled: 셰브론 opacity .4, cursor default, 그림자 없음. 키보드는 FocusKeyManager(가로 화살표, Home/End, 순환). 누르고 있기 자동 반복(650ms 후 100ms 간격)은 데모에서 생략.',
      motion: { trigger: '버튼 클릭', change: '한 번에 뷰포트의 1/3 이동 (translateX)', timing: 'transition: transform 500ms cubic-bezier(0.35,0,0.25,1) · 길게 누르면 650ms 지연 후 100ms 마다 반복', inferred: false },
      feel: ['실무적', '묵직한 이동', '순수 CSS 셰브론'],
      fits: ['고밀도 관리자 탭 바'],
      demo: `<div class="D-08" data-behavior="carousel" data-step="10" data-visible="3">
  <button type="button" class="pg pg-l" data-prev aria-label="이전 탭"><span class="chev" aria-hidden="true"></span></button>
  <div class="vp"><div class="list" data-track role="tablist" aria-label="관리자 탭">${TABS.map(function (t, k) { return '<button type="button" role="tab" class="tab" aria-selected="' + (k === 0) + '">' + t + '</button>'; }).join('')}</div></div>
  <button type="button" class="pg pg-r" data-next aria-label="다음 탭"><span class="chev" aria-hidden="true"></span></button>
</div>`,
      css: `.D-08 { display: flex; width: 100%; border-bottom: 1px solid var(--border); background: var(--bg-1); }
.D-08 .vp { flex: 1; min-width: 0; overflow: hidden; }
.D-08 .list { display: flex; width: calc(10 * 100% / 3); transition: transform 500ms cubic-bezier(0.35, 0, 0.25, 1); }
.D-08 .tab { flex: none; width: 10%; padding: var(--space-3) var(--space-2); border: 0; border-bottom: 2px solid transparent; background: none; color: var(--fg-3); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-08 .tab[aria-selected="true"] { color: var(--fg-1); border-bottom-color: var(--fg-1); }
.D-08 .pg { display: grid; place-items: center; flex: none; min-width: 32px; padding: 0; border: 0; background: none; color: var(--fg-1); cursor: pointer; }
.D-08 .pg:disabled { opacity: .4; cursor: default; }
.D-08 .pg:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.D-08 .chev { width: 8px; height: 8px; border: solid currentColor; border-width: 2px 2px 0 0; }
.D-08 .pg-l .chev { transform: rotate(-135deg); }
.D-08 .pg-r .chev { transform: rotate(45deg); }
/* 광학 보정: 셰브론 가로 폭 ≈ 6px(변 8px × sin45° + 선 두께), 1/6 ≈ 1px 를 가리키는 쪽으로 (translate 는 회전과 별개) */
.D-08 .pg-l .chev { translate: calc(var(--optical, 1) * -1px) 0; }
.D-08 .pg-r .chev { translate: calc(var(--optical, 1) * 1px) 0; }`
    },
    {
      id: 'D-09', group: '라이브러리 스크롤 컨트롤',
      name: 'Wikimedia Codex Tabs 스크롤러',
      source: 'Wikimedia Codex',
      url: 'https://doc.wikimedia.org/codex/latest/components/demos/tabs.html',
      look: '절대 위치의 전체 높이 엣지 버튼, background-color: inherit, cdxIconPrevious/Next 아이콘. 그 옆으로 @size-150 폭의 그라디언트 의사요소가 배경색에서 투명으로 내용 위로 번진다. 데모는 24px(추정).',
      states: '첫/끝 탭 라벨에 IntersectionObserver (threshold 0.95). 그 라벨이 보이면 v-show 로 버튼이 숨겨진다 (disabled 가 아니라 hidden). 키보드 ←/→ 는 탭 사이 이동, RTL 에서는 반대.',
      motion: { trigger: '버튼 클릭', change: 'scrollBy({left, behavior:"smooth"}) — 계산 거리가 clientWidth 의 25% 미만이면 탭 하나 더 전진. 버튼 표시/숨김은 즉시', timing: 'smooth 스크롤 (시간 미지정)', inferred: false },
      feel: ['문서형', '숨김(hidden)', '그라디언트 엣지'],
      fits: ['위키·문서 사이트 탭'],
      demo: `<div class="D-09" data-behavior="scroller" data-step="0.8">
  <button type="button" class="eb eb-l" data-prev aria-label="이전 탭">{{i:chev-l}}</button>
  <div class="tabs" data-scroller role="tablist" aria-label="문서 탭">${TABS.map(function (t, k) { return '<button type="button" role="tab" class="tab" aria-selected="' + (k === 0) + '">' + t + '</button>'; }).join('')}</div>
  <button type="button" class="eb eb-r" data-next aria-label="다음 탭">{{i:chev-r}}</button>
</div>`,
      css: `.D-09 { position: relative; width: 100%; border-bottom: 1px solid var(--border); background: var(--bg-1); }
.D-09 .tabs { display: flex; overflow-x: auto; scrollbar-width: none; }
.D-09 .tabs::-webkit-scrollbar { display: none; }
.D-09 .tab { flex: none; padding: var(--space-3) var(--space-4); border: 0; border-bottom: 2px solid transparent; background: none; color: var(--fg-3); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-09 .tab[aria-selected="true"] { color: var(--fg-1); border-bottom-color: var(--fg-1); }
.D-09 .eb { position: absolute; inset-block: 0; z-index: 2; display: grid; place-items: center; width: 32px; padding: 0; border: 0; background-color: inherit; color: var(--fg-1); cursor: pointer; }
.D-09 .eb .ic { width: 16px; height: 16px; }
.D-09 .eb:disabled { display: none; }
.D-09 .eb:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.D-09 .eb::after { content: ""; position: absolute; top: 0; width: 24px; height: 100%; pointer-events: none; }
.D-09 .eb-l { left: 0; } .D-09 .eb-r { right: 0; }
.D-09 .eb-l::after { left: 100%; background: linear-gradient(to right, var(--bg-1), transparent); }
.D-09 .eb-r::after { right: 100%; background: linear-gradient(to left, var(--bg-1), transparent); }`
    },
    {
      id: 'D-10', group: '라이브러리 스크롤 컨트롤',
      name: 'Mantine Scroller',
      source: 'Mantine',
      url: 'https://mantine.dev/core/scroller',
      look: '엣지 그라디언트 위에 놓인 셰브론 컨트롤. controlSize(기본 md)가 버튼과 그라디언트의 폭을 정한다(데모는 48px, 추정). 그라디언트 색은 --scroller-background-color (기본은 body 색).',
      states: '그 방향으로 스크롤할 수 없으면 컨트롤에 data-hidden. showStartControl/showEndControl 로 강제 표시 가능. 드래그 스크롤이 기본 켜짐(draggable true)이고 드래그 중 data-dragging.',
      motion: { trigger: '버튼 클릭 / 끝 도달', change: '클릭당 200px 스크롤(scrollAmount), 끝에서 컨트롤 opacity 0 + pointer-events none', timing: '.2s opacity (추정), 스크롤 이징 문서 없음 · 데모는 비율 스크롤로 근사', inferred: true },
      feel: ['엣지 그라디언트', '드래그 가능', '깔끔'],
      fits: ['칩 행', '필터 바'],
      demo: `<div class="D-10" data-behavior="scroller" data-drag data-step="0.7">
  <button type="button" class="ctl ctl-l" data-prev aria-label="이전">{{i:chev-l}}</button>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록">${chips()}</div>
  <button type="button" class="ctl ctl-r" data-next aria-label="다음">{{i:chev-r}}</button>
</div>`,
      css: CHIP('D-10') + `
.D-10 { position: relative; --scroller-background-color: var(--bg-2); }
.D-10 .row { cursor: grab; }
.D-10.is-dragging .row { cursor: grabbing; }
.D-10 .ctl { position: absolute; inset-block: 0; z-index: 2; display: flex; align-items: center; width: 48px; padding: 0; border: 0; color: var(--fg-1); cursor: pointer; transition: opacity .2s; }
.D-10 .ctl .ic { width: 18px; height: 18px; }
.D-10 .ctl-l { left: 0; justify-content: flex-start; background: linear-gradient(to right, var(--scroller-background-color) 50%, transparent); }
.D-10 .ctl-r { right: 0; justify-content: flex-end; background: linear-gradient(to left, var(--scroller-background-color) 50%, transparent); }
.D-10 .ctl:disabled { opacity: 0; pointer-events: none; }
.D-10 .ctl:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }`
    },
    {
      id: 'D-11', group: '라이브러리 스크롤 컨트롤',
      name: 'Wix HorizontalScroll (블러 엣지 + 둥근 버튼)',
      source: 'Wix Design System',
      url: 'https://dev.wix.com/docs/wix-design-system/components/mechanisms/horizontal-scroll-component.md',
      look: '둥근 IconButton 화살표(size "tiny", priority "secondary" 기본), 호버 시 그림자. 엣지 처리는 edgeStyle:"blur"(가장자리 내용을 점진 블러) 또는 "color"(배경색으로 페이드), 기본 폭 48px.',
      states: '오른쪽 화살표는 끝에서 사라진다(데모는 왼쪽도 시작에서 사라짐). 1.322 에서 브라우저 줌·디스플레이 배율에서도 동작하도록 수정. 끝 판정은 scrollWidth − clientWidth − scrollLeft ≤ 1.',
      motion: { trigger: '버튼 클릭', change: '1회 150px 이동(scrollDistance), 스크롤 이벤트 20ms 디바운스, 호버 시 버튼 그림자', timing: '150px / 디바운스 20ms · 데모는 비율 스크롤로 근사 · 전환 .15s 는 추정', inferred: true },
      feel: ['부드러운 블러', '둥근 버튼', '어느 배경에나'],
      fits: ['칩·필터 행'],
      demo: `<div class="D-11" data-behavior="scroller" data-step="0.6">
  <button type="button" class="nav nav-l" data-prev aria-label="이전">{{i:chev-l}}</button>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록">${chips()}</div>
  <button type="button" class="nav nav-r" data-next aria-label="다음">{{i:chev-r}}</button>
</div>`,
      css: CHIP('D-11') + '\n' + NAV('D-11') + `
.D-11 { position: relative; }
.D-11 .nav-l { left: var(--space-1); } .D-11 .nav-r { right: var(--space-1); }
.D-11 .nav { width: 24px; height: 24px; transition: box-shadow .15s, opacity .15s; }
.D-11 .nav:hover { box-shadow: var(--shadow-md); }
.D-11 .nav:disabled { opacity: 0; pointer-events: none; }
.D-11::before, .D-11::after { content: ""; position: absolute; top: 0; bottom: 0; z-index: 1; width: 48px; pointer-events: none; backdrop-filter: blur(4px); transition: opacity .15s; }
.D-11::before { left: 0; mask: linear-gradient(to right, var(--fg-1), transparent); }
.D-11::after { right: 0; mask: linear-gradient(to left, var(--fg-1), transparent); }
.D-11.is-start::before, .D-11.is-end::after { opacity: 0; }`
    },
    {
      id: 'D-12', group: '라이브러리 스크롤 컨트롤',
      name: '그라디언트 감싼 화살표 + 드래그 스크롤 탭',
      source: 'CodingNepal',
      url: 'https://www.codingnepalweb.com/draggable-slider-tabs-html-css-javascript/',
      look: '높이를 가득 채우는 120px 래퍼에 linear-gradient(90deg, #fff 70%, transparent), 안에 55px 원형 아이콘. 호버 배경 #efedfb. 데모는 무대 폭에 맞춰 래퍼 72px / 아이콘 36px 로 축소, 색은 DS 토큰.',
      states: '왼쪽 화살표는 scrollLeft ≤ 0 이면 display:none, 오른쪽은 남은 거리 ≤ 1px 이면 숨김. 드래그 중(.dragging)은 scroll-behavior:auto, cursor:grab, 자식에 pointer-events:none.',
      motion: { trigger: '버튼 클릭 / 드래그', change: '클릭당 340px 스크롤(scroll-behavior:smooth), 드래그는 scrollLeft -= e.movementX', timing: '340px · smooth (시간 미지정)', inferred: false },
      feel: ['탭 슬라이더', '드래그 가능', '큰 원형 아이콘'],
      fits: ['카테고리 탭', '모바일 탭'],
      demo: `<div class="D-12" data-behavior="scroller" data-drag data-step="0.8">
  <div class="wrap wrap-l"><button type="button" class="ico" data-prev aria-label="이전">{{i:chev-l}}</button></div>
  <ul class="row" data-scroller aria-label="탭 목록">${chips(CH, 'chip').replace(/<button type="button" class="chip">([^<]+)<\/button>/g, '<li><button type="button" class="chip">$1</button></li>')}</ul>
  <div class="wrap wrap-r"><button type="button" class="ico" data-next aria-label="다음">{{i:chev-r}}</button></div>
</div>`,
      css: `.D-12 { position: relative; width: 100%; background: var(--bg-1); border-radius: var(--radius-md); }
.D-12 .row { display: flex; gap: var(--space-2); margin: 0; padding: var(--space-3) var(--space-3); list-style: none; overflow-x: auto; scrollbar-width: none; scroll-behavior: smooth; cursor: grab; }
.D-12 .row::-webkit-scrollbar { display: none; }
.D-12 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-2); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-12.is-dragging .row { scroll-behavior: auto; cursor: grabbing; user-select: none; }
.D-12.is-dragging .chip { pointer-events: none; }
.D-12 .wrap { position: absolute; inset-block: 0; z-index: 2; display: flex; align-items: center; width: 72px; pointer-events: none; }
.D-12 .wrap-l { left: 0; padding-left: var(--space-2); background: linear-gradient(90deg, var(--bg-1) 70%, transparent); }
.D-12 .wrap-r { right: 0; justify-content: flex-end; padding-right: var(--space-2); background: linear-gradient(270deg, var(--bg-1) 70%, transparent); }
.D-12 .ico { display: grid; place-items: center; width: 36px; height: 36px; padding: 0; border: 0; border-radius: var(--radius-pill); background: none; color: var(--fg-1); cursor: pointer; pointer-events: auto; }
.D-12 .ico:hover { background: var(--bg-2); }
.D-12 .ico:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.D-12 .ico .ic { width: 18px; height: 18px; }
.D-12.is-start .wrap-l, .D-12.is-end .wrap-r { display: none; }`
    },

    /* ───────── 힌트·연출 ───────── */
    {
      id: 'D-13', group: '힌트·연출',
      name: 'ScrollHint 손 넛지',
      source: 'ScrollHint (appleple)',
      url: 'https://appleple.github.io/scroll-hint/',
      look: '가운데 120px 상자, rgba(0,0,0,.7), 반경 5px, 손 아이콘 + "scrollable" 라벨(데모는 "스크롤 가능"). 옵션으로 가장자리 16px 그림자 rgba(0,0,0,.15)(suggestiveShadow). 상자를 누르면 다시 재생.',
      states: '사용자가 스크롤하면 숨김, 또는 remainingTime ms 후 숨김(기본 -1 = 자동 숨김 없음). 화살표는 2.4s 지연 후 나타남.',
      motion: { trigger: '로드 / 스크롤 전', change: '손: translateX(40px)·opacity 0 → 10%에서 opacity 1 → 50~100%는 translateX(-40px)·opacity 0. 숨길 때 opacity 페이드', timing: '손 1.2s linear 2회 · 화살표 지연 2.4s · 숨김 .3s', inferred: false },
      feel: ['안내', '손 제스처', '자동 사라짐'],
      fits: ['화살표 없는 모바일 표·행'],
      demo: `<div class="D-13" data-behavior="scroller replay" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록">${chips()}</div>
  <button type="button" class="hint" data-replay aria-label="스크롤 힌트 다시 보기">
    <span class="hand">{{i:hand}}</span><span class="txt">스크롤 가능</span><span class="arw">{{i:chev-r}}</span>
  </button>
</div>`,
      css: CHIP('D-13') + `
.D-13 { position: relative; min-height: 96px; display: grid; align-items: center; }
.D-13 .row { cursor: grab; }
.D-13 .hint { position: absolute; inset: 0; margin: auto; z-index: 2; display: grid; place-items: center; align-content: center; gap: var(--space-1); width: 120px; height: 72px; padding: 0; border: 0; border-radius: 5px; background: color-mix(in srgb, var(--fg-1) 70%, transparent); color: var(--bg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; opacity: 1; transition: opacity .3s; }
.D-13:not(.is-start) .hint { opacity: 0; pointer-events: none; }
.D-13 .hand { display: grid; animation: D-13-nudge 1.2s linear 2; }
.D-13 .hint.is-play .hand { animation-name: D-13-nudge-b; }
.D-13 .hand .ic { width: 24px; height: 24px; }
.D-13 .arw { position: absolute; right: var(--space-2); top: 50%; display: grid; margin-top: -8px; animation: D-13-arrow .3s ease 2.4s both; }
.D-13 .hint.is-play .arw { animation-name: D-13-arrow-b; }
.D-13 .arw .ic { width: 16px; height: 16px; }
.D-13 .hint:focus-visible { outline: 2px solid var(--bg-1); outline-offset: -4px; }
@keyframes D-13-nudge { 0% { transform: translateX(40px); opacity: 0; } 10% { opacity: 1; } 50%, 100% { transform: translateX(-40px); opacity: 0; } }
@keyframes D-13-arrow { from { opacity: 0; } to { opacity: 1; } }
@keyframes D-13-arrow-b { from { opacity: 0; } to { opacity: 1; } }
@keyframes D-13-nudge-b { 0% { transform: translateX(40px); opacity: 0; } 10% { opacity: 1; } 50%, 100% { transform: translateX(-40px); opacity: 0; } }`
    },
    {
      id: 'D-14', group: '힌트·연출',
      name: '세로 휠 → 가로 고정 트랙 (Codrops 스타일)',
      source: 'Codrops · GSAP ScrollTrigger',
      url: 'https://github.com/codrops/HorizontalSmoothScrollLayout',
      look: '화살표 없음. 아래로 스크롤하면 가로 트랙이 움직인다. 저장소는 Locomotive Scroll 을 쓰고, Codrops 글은 403 이라 읽지 못했다. 데모는 CSS 스크롤 구동 애니메이션으로 근사한 것(세로로 스크롤해 보기).',
      states: '해당 없음. scrub 은 재생 헤드가 따라오는 데 걸리는 초(예: 0.5 면 부드러운 지연). containerAnimation 은 linear 이징이어야 하며 containerAnimation 트리거에서는 pin·snap 사용 불가. 데모는 animation-timeline 미지원이면 가로 스크롤 행으로 대체.',
      motion: { trigger: '세로 스크롤', change: 'x: -(track.scrollWidth - innerWidth) 로 가로 이동 (ease:"none")', timing: 'scrub: 0.5 (재생 헤드 지연 0.5s) · 데모는 지연 없이 선형 스크롤 구동', inferred: false },
      feel: ['에디토리얼', '스크롤 연출', '화살표 없음'],
      fits: ['포트폴리오', '에디토리얼 페이지'],
      demo: `<div class="D-14" tabindex="0" aria-label="세로로 스크롤하면 가로로 움직이는 트랙">
  <div class="runway">
    <div class="pin">
      <div class="track">${['01', '02', '03', '04', '05', '06'].map(function (n) { return '<div class="card"><span>' + n + '</span></div>'; }).join('')}</div>
      <p class="tip">세로로 스크롤</p>
    </div>
  </div>
</div>`,
      css: `.D-14 { position: absolute; inset: 0; overflow-y: auto; scrollbar-width: none; container-type: size; scroll-timeline: --D-14-t block; }
.D-14::-webkit-scrollbar { display: none; }
.D-14 .runway { height: 320%; }
.D-14 .pin { position: sticky; top: 0; height: 100cqh; display: grid; align-items: center; overflow-x: auto; scrollbar-width: none; }
.D-14 .track { display: flex; gap: var(--space-3); width: max-content; padding-inline: var(--space-4); }
.D-14 .card { display: grid; place-items: center; flex: none; width: 96px; height: 80px; border-radius: var(--radius-md); background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.D-14 .tip { position: absolute; left: var(--space-4); bottom: var(--space-3); margin: 0; font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-3); }
@supports (animation-timeline: scroll()) {
  .D-14 .pin { overflow: hidden; }
  .D-14 .track { animation: D-14-slide linear both; animation-timeline: --D-14-t; }
}
@keyframes D-14-slide { to { transform: translateX(calc(-100% + 100cqw)); } }`
    }
  ]);
})();
