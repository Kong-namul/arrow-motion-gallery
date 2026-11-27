/* C — 화살표 마이크로인터랙션. 출처: research/C-micro-interactions.md
 * 모양이 모호한 Uiverse·Codrops 항목은 공식 소스(uiverse-io/galaxy, codrops 저장소)에서 수치를 다시 확인했다. */
ARROW_DATA.addIcons({
  /* 굵은 윤곽 화살표 + 꼬리 대시 (C-03) */
  'c-big-dash': ARROW_DATA.svg('<path class="arrow" d="M10 9h3V5l7 7-7 7v-4h-3z"/><path class="dash" d="M5 9v6"/>'),
  /* Stripe식 10×10 셰브론 + 숨은 선 (C-05) */
  'c-stripe': '<svg class="ic" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="line" d="M0 5h7"/><path class="tip" d="M1 1l4 4-4 4"/></svg>',
  /* 66×43 뷰박스의 셰브론 3개 (C-14, 퍼센트 이동이 뷰박스 폭 기준이라 원본 비율 유지) */
  'c-chevs3': '<svg class="ic" viewBox="0 0 66 43" width="40" height="26" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="three" d="M5 5l16 16.5L5 38"/><path class="two" d="M25 5l16 16.5L25 38"/><path class="one" d="M45 5l16 16.5L45 38"/></svg>',
  /* 46×16 롱 화살표 (C-33, 원본 30×10 표시) */
  'c-long': '<svg class="ic" viewBox="0 0 46 16" width="30" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 8h43"/><path d="M37 1.5l7 6.5-7 6.5"/></svg>'
});

ARROW_DATA.add([
  /* ───────────── 넛지 ───────────── */
  {
    id: 'C-01',
    group: '넛지',
    name: '넛지 앤 리턴 (한 번)',
    source: 'lucide-animated · itshover',
    url: 'https://lucide-animated.com/icons/chevron-right',
    look: '24px 스트로크 아이콘(chevron-right / circle-chevron-right / arrow-narrow-right)을 담은 아이콘 버튼. 데모는 왼쪽부터 itshover arrow-back(−3px), lucide chevron-right(2px), lucide arrow-big-right(3px), itshover arrow-narrow-right(4px).',
    states: '호버로 들어올 때마다 한 번 밀렸다 돌아온다. 키보드 포커스에도 재생. 누름·비활성 변화 없음.',
    motion: { trigger: '호버 진입', change: 'x [0, 2, 0] (times 0 / .4 / 1). arrow-big-right [0, 3, 0], itshover arrow-narrow-right [0, 4, 0] (떠날 때 x→0 200ms easeOut), arrow-back [0, −3, 0]', timing: '500ms Motion 기본 easeInOut(= ease-in-out) · big-right·arrow-back 400ms', inferred: false },
    feel: ['예의 바름', '은은함'],
    fits: ['페이지네이션 이전/다음', '리스트 행 셰브론', '캐러셀 화살표'],
    demo: `<div class="C-01">
  <button type="button" class="b-back" aria-label="뒤로">{{i:arrow-l}}</button>
  <button type="button" class="b-chev" aria-label="다음">{{i:chev-r}}</button>
  <button type="button" class="b-big" aria-label="다음">{{i:arrow-fat-r}}</button>
  <button type="button" class="b-narrow" aria-label="다음">{{i:arrow-narrow-r}}</button>
  <span class="cap">−3px</span><span class="cap">2px</span><span class="cap">3px</span><span class="cap">4px</span>
</div>`,
    css: `.C-01 { display: grid; grid-template-columns: repeat(4, auto); gap: var(--space-2) var(--space-3); justify-items: center; }
.C-01 button { display: grid; place-items: center; width: var(--space-7); height: var(--space-7); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; }
.C-01 .ic { width: 24px; height: 24px; }
.C-01 .cap { font-family: var(--font-mono); font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-3); }
.C-01 .b-chev:is(:hover, :focus-visible) .ic { animation: C-01-x2 500ms ease-in-out; }
.C-01 .b-big:is(:hover, :focus-visible) .ic { animation: C-01-x3 400ms ease-in-out; }
.C-01 .b-narrow:is(:hover, :focus-visible) .ic { animation: C-01-x4 500ms ease-in-out; }
.C-01 .b-back:is(:hover, :focus-visible) .ic { animation: C-01-xm3 400ms ease-in-out; }
@keyframes C-01-x2 { 40% { transform: translateX(2px); } }
@keyframes C-01-x3 { 50% { transform: translateX(3px); } }
@keyframes C-01-x4 { 50% { transform: translateX(4px); } }
@keyframes C-01-xm3 { 50% { transform: translateX(-3px); } }`
  },
  {
    id: 'C-02',
    group: '넛지',
    name: '활시위 반동',
    source: 'lucide-animated arrow-right',
    url: 'https://lucide-animated.com/r/arrow-right.json',
    look: '화살대(shaft)와 화살촉(head) path가 분리된 24px arrow-right. 데모는 라벨 + 화살표 검정 알약 버튼.',
    states: '호버로 들어올 때마다 한 번. 키보드 포커스에도 재생.',
    motion: { trigger: '호버 진입', change: '화살대 d "M5 12h14"→"M5 12h9"→"M5 12h14" (CSS 힌트대로 왼쪽 기준 scaleX(.64)), 화살촉 translateX [0, −3, 0]', timing: '400ms (Motion 기본 easeInOut)', inferred: false },
    feel: ['탄력', '예비 동작'],
    fits: ['"다음" CTA', '캐러셀 다음'],
    demo: `<div class="C-02"><button type="button">다음 {{i:arrow-r}}</button></div>`,
    css: `.C-02 button { display: inline-flex; align-items: center; gap: var(--space-2); height: var(--space-7); padding: 0 var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.C-02 .ic { width: 24px; height: 24px; overflow: visible; }
.C-02 .shaft { transform-box: fill-box; transform-origin: left center; }
.C-02 button:is(:hover, :focus-visible) .shaft { animation: C-02-shaft 400ms ease-in-out; }
.C-02 button:is(:hover, :focus-visible) .head { animation: C-02-head 400ms ease-in-out; }
@keyframes C-02-shaft { 50% { transform: scaleX(.64); } }
@keyframes C-02-head { 50% { transform: translateX(-3px); } }`
  },
  {
    id: 'C-03',
    group: '넛지',
    name: '스피드 대시',
    source: 'itshover arrow-big-right-dash',
    url: 'https://github.com/Nani-LM10/itshover/tree/master/icons',
    look: '굵은 윤곽 화살표 뒤에 세로 대시가 붙은 24px 아이콘 + 라벨 버튼.',
    states: '호버 동안 밀린 상태 유지, 떠나면 복귀(복귀 곡선이 다름).',
    motion: { trigger: '호버', change: '화살표 x 0→4, 대시 scale 1→1.2 · opacity 1→.7', timing: '들어갈 때 300ms easeOut, 떠날 때 200ms easeInOut', inferred: false },
    feel: ['스포티', '빠름'],
    fits: ['건너뛰기·빨리 감기', 'CTA'],
    demo: `<div class="C-03"><button type="button">건너뛰기 {{i:c-big-dash}}</button></div>`,
    css: `.C-03 button { display: inline-flex; align-items: center; gap: var(--space-2); height: var(--space-7); padding: 0 var(--space-4) 0 var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; }
.C-03 .ic { width: 24px; height: 24px; overflow: visible; }
.C-03 .arrow, .C-03 .dash { transform-box: fill-box; transform-origin: center; transition: transform 200ms ease-in-out, opacity 200ms ease-in-out; }
.C-03 button:is(:hover, :focus-visible) :is(.arrow, .dash) { transition: transform 300ms ease-out, opacity 300ms ease-out; }
.C-03 button:is(:hover, :focus-visible) .arrow { transform: translateX(4px); }
.C-03 button:is(:hover, :focus-visible) .dash { transform: scale(1.2); opacity: .7; }`
  },

  /* ───────────── 선 늘이기 ───────────── */
  {
    id: 'C-04',
    group: '선 늘이기',
    name: '스쿼시 앤 스트레치',
    source: 'Josh W. Comeau',
    url: 'https://joshwcomeau.com/animation/squash-and-stretch',
    look: '24px 화살표. 화살대 "M 5,12 h 14"와 화살촉 "M 12,5 l 7,7 l -7,7"이 별도 path. 텍스트 링크 옆.',
    states: '호버·포커스 동안 늘어난 상태 유지. CSS d 속성 전환이라 Safari에서는 움직이지 않는다(정지 상태). prefers-reduced-motion: no-preference 일 때만 전환.',
    motion: { trigger: '호버', change: '화살대 h 14→17, 화살촉 → "M 15,7 l 7,5 l -7,5" (끝이 +3 이동하며 높이 14→10으로 납작해짐)', timing: 'CSS 버전 transition: d 300ms (ease). JS 버전은 spring stiffness 300 · damping 12, pointerenter 후 150ms 뒤 되돌림', inferred: false },
    feel: ['탄성', '만화적', '살아있음'],
    fits: ['"더 읽기"', '다음 글 CTA'],
    demo: `<div class="C-04"><button type="button">더 읽기 {{i:arrow-r}}</button></div>`,
    css: `.C-04 button { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-18); font-weight: var(--weight-semibold); color: var(--fg-1); background: none; border: 0; cursor: pointer; }
.C-04 .ic { width: 24px; height: 24px; overflow: visible; }
@media (prefers-reduced-motion: no-preference) {
  .C-04 .shaft, .C-04 .head { transition: d 300ms; }
}
.C-04 button:is(:hover, :focus-visible) .shaft { d: path("M 5,12 h 17"); }
.C-04 button:is(:hover, :focus-visible) .head { d: path("M 15,7 l 7,5 l -7,5"); }`
  },
  {
    id: 'C-05',
    group: '선 늘이기',
    name: 'Stripe식 셰브론→화살표',
    source: 'Adam Wathan (Stripe 화살표 재현)',
    url: 'https://typefully.com/adamwathan/recreating-stripes-arrow-animation-with-NnPxtVr',
    look: '알약 버튼 안 10×10 셰브론(tip)과 숨은 가로선(line). 원본은 브랜드 색 버튼.',
    states: '버튼(그룹) 호버·포커스 동안 유지.',
    motion: { trigger: '그룹 호버', change: '선 opacity 0→1, 셰브론 translateX(3px)', timing: '150ms cubic-bezier(0.4, 0, 0.2, 1) — 원문에 시간 없음, Tailwind 기본값', inferred: true },
    feel: ['또렷함', '프리미엄 핀테크'],
    fits: ['CTA', '인라인 링크'],
    demo: `<div class="C-05"><button type="button">시작하기 {{i:c-stripe}}</button></div>`,
    css: `.C-05 button { display: inline-flex; align-items: center; gap: var(--space-2); height: calc(var(--space-6) + var(--space-1)); padding: 0 var(--space-4) 0 var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.C-05 .ic { width: 10px; height: 10px; overflow: visible; }
.C-05 .line { opacity: 0; transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.C-05 .tip { transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.C-05 button:is(:hover, :focus-visible) .line { opacity: 1; }
.C-05 button:is(:hover, :focus-visible) .tip { transform: translateX(3px); }`
  },
  {
    id: 'C-06',
    group: '선 늘이기',
    name: '화살대 색 드러내기',
    source: 'Uiverse satyamchaudharydev/modern-sheep-10',
    url: 'https://uiverse.io/satyamchaudharydev/modern-sheep-10',
    look: '버튼과 같은 색이라 안 보이는 10×2px 화살대 + 테두리로 그린 셰브론(padding 3px, 2px 선, rotate(−45deg)). 원본 버튼 #645bff, 호버 #111.',
    states: '호버 동안 유지. 버튼 배경도 .2s 동안 어두워짐.',
    motion: { trigger: '호버', change: '화살대 배경 버튼색→흰색(여기선 var(--bg-1)), 셰브론 right 3px→0', timing: '.2s (ease)', inferred: false },
    feel: ['빠름', '깔끔함'],
    fits: ['CTA', '페이지네이션 "다음"'],
    demo: `<div class="C-06"><button type="button">가입하기<span class="arw" aria-hidden="true"></span></button></div>`,
    css: `.C-06 button { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-4) calc(var(--space-6) - var(--space-1)); font: inherit; font-size: var(--text-16); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-2); border: 0; border-radius: calc(var(--space-5) - var(--space-1)); cursor: pointer; transition: .2s background; }
.C-06 .arw { position: relative; width: 10px; height: 2px; margin-top: 1px; background: var(--fg-2); transition: .2s; }
.C-06 .arw::before { content: ""; box-sizing: border-box; position: absolute; top: -3px; right: 3px; display: inline-block; padding: 3px; border: solid var(--bg-1); border-width: 0 2px 2px 0; transform: rotate(-45deg); transition: .2s; }
.C-06 button:is(:hover, :focus-visible) { background: var(--fg-1); }
.C-06 button:is(:hover, :focus-visible) .arw { background: var(--bg-1); }
.C-06 button:is(:hover, :focus-visible) .arw::before { right: 0; }`
  },
  {
    id: 'C-07',
    group: '선 늘이기',
    name: '화살대 성장 + 라벨 밀기',
    source: 'Uiverse escannord/lovely-gecko-23',
    url: 'https://uiverse.io/escannord/lovely-gecko-23',
    look: '굵은 라벨 + CSS 테두리로 그린 화살표(화살대 10px · 4px 셰브론). 좌우 괄호 모양 테두리가 호버 때 50%까지 자라 외곽선이 된다. 원본 rgb(56, 55, 100).',
    states: '호버 동안 유지(배경 채움). 누르면 7px 반투명 링.',
    motion: { trigger: '호버', change: '화살대 width 10→25px, 셰브론 left 3→15px, 화살표·라벨 translateX(10px), 괄호 width 10px→50%', timing: '.3s (all, ease)', inferred: false },
    feel: ['적극적', '앞으로 기운'],
    fits: ['CTA'],
    demo: `<div class="C-07"><button type="button"><span class="t">더 보기</span><span class="arw" aria-hidden="true"></span></button></div>`,
    css: `.C-07 button { position: relative; display: flex; justify-content: space-around; align-items: center; padding: var(--space-4) var(--space-6); font: inherit; font-size: var(--text-16); font-weight: var(--weight-extrabold); color: var(--fg-1); background: transparent; border: 0; border-radius: 5px; cursor: pointer; }
.C-07 button, .C-07 .t, .C-07 .arw, .C-07 .arw::before, .C-07 .arw::after, .C-07 button::before, .C-07 button::after { transition: all .3s, box-shadow .2s; }
.C-07 .t { display: inline-block; }
.C-07 .arw { position: relative; display: inline-flex; width: 30px; height: 15px; margin-left: var(--space-2); }
.C-07 .arw::before, .C-07 .arw::after { content: ""; position: absolute; top: 50%; display: inline-block; box-sizing: content-box; }
.C-07 .arw::after { left: 0; width: 10px; height: 0; border: 2px solid var(--fg-1); transform: translateY(-50%); }
.C-07 .arw::before { left: 3px; width: 10px; height: 10px; border-top: 4px solid var(--fg-1); border-right: 4px solid var(--fg-1); transform: translateY(-50%) rotate(45deg); }
.C-07 button::before, .C-07 button::after { content: ""; position: absolute; top: 50%; width: 10px; height: 100%; border: solid 3px var(--fg-1); border-radius: 5px; transform: translateY(-50%); }
.C-07 button::before { left: 0; border-right-color: transparent; }
.C-07 button::after { right: 0; border-left-color: transparent; }
.C-07 button:is(:hover, :focus-visible) { color: var(--bg-1); background: var(--fg-1); }
.C-07 button:is(:hover, :focus-visible) :is(.t, .arw) { transform: translateX(10px); }
.C-07 button:is(:hover, :focus-visible) .arw::after { width: 25px; border-color: var(--bg-1); }
.C-07 button:is(:hover, :focus-visible) .arw::before { left: 15px; border-color: var(--bg-1); }
.C-07 button:is(:hover, :focus-visible)::before, .C-07 button:is(:hover, :focus-visible)::after { width: 50%; }
.C-07 button:active { box-shadow: 0 0 0 7px color-mix(in srgb, var(--fg-1) 30%, transparent); }`
  },
  {
    id: 'C-08',
    group: '선 늘이기',
    name: '원→알약 "더 알아보기"',
    source: 'Uiverse cssbuttons-io/massive-mayfly-74',
    url: 'https://uiverse.io/cssbuttons-io/massive-mayfly-74',
    look: '12rem 폭 버튼. 3rem 짙은 원(원본 #282936) 안에 셰브론(10px 테두리 + 숨은 18×2px 화살대), 옆에 굵은 라벨.',
    states: '호버 동안 유지.',
    motion: { trigger: '호버', change: '원 width 3rem→100% (채움 스윕), 숨은 화살대 배경 none→흰색, 화살표 translate(1rem, 0), 라벨 흰색', timing: '.45s cubic-bezier(0.65, 0, 0.076, 1) (전부)', inferred: false },
    feel: ['부드러움', '자신감', '프리미엄'],
    fits: ['CTA', '캐러셀 헤더 "전체 보기"'],
    demo: `<div class="C-08"><button type="button"><span class="circle" aria-hidden="true"><span class="arw"></span></span><span class="t">더 알아보기</span></button></div>`,
    css: `.C-08 button { position: relative; display: inline-block; width: calc(var(--space-12) + var(--space-6)); padding: 0; font: inherit; font-size: var(--text-16); background: transparent; border: 0; cursor: pointer; }
.C-08 .circle { position: relative; display: block; width: var(--space-7); height: var(--space-7); margin: 0; background: var(--fg-1); border-radius: var(--radius-pill); transition: all .45s cubic-bezier(0.65, 0, 0.076, 1); }
.C-08 .arw { position: absolute; top: 0; bottom: 0; left: 10px; width: 18px; height: 2px; margin: auto; background: none; transition: all .45s cubic-bezier(0.65, 0, 0.076, 1); }
.C-08 .arw::before { content: ""; position: absolute; top: -4.64px; right: 1px; box-sizing: content-box; width: 10px; height: 10px; border-top: 2px solid var(--bg-1); border-right: 2px solid var(--bg-1); transform: rotate(45deg); }
.C-08 .t { position: absolute; inset: 0; margin: 0 0 0 29.6px; padding: var(--space-3) 0; font-weight: var(--weight-bold); line-height: 1.6; text-align: center; color: var(--fg-1); transition: all .45s cubic-bezier(0.65, 0, 0.076, 1); }
.C-08 button:is(:hover, :focus-visible) .circle { width: 100%; }
.C-08 button:is(:hover, :focus-visible) .arw { background: var(--bg-1); transform: translate(1rem, 0); }
.C-08 button:is(:hover, :focus-visible) .t { color: var(--bg-1); }`
  },

  /* ───────────── 루프 통과·교체 ───────────── */
  {
    id: 'C-09',
    group: '루프 통과·교체',
    name: '루프 통과 (CSS 띠)',
    source: 'Osmo — Button with rotating icon',
    url: 'https://www.osmo.supply/resource/button-with-rotating-icon',
    look: '라벨 + 정사각 아이콘 타일. 타일 안 1em 폭 overflow:hidden 창에 화살표 3개짜리 flex 띠. 버튼 바닥에서 올라오는 와이프 면.',
    states: '@media (hover: hover) and (pointer: fine) 에서만 호버 효과. 키보드 포커스는 같은 효과를 따로 건다.',
    motion: { trigger: '호버', change: '띠의 화살표 translateX(200%) — 보이던 화살표는 오른쪽으로 나가고 앞 화살표가 왼쪽에서 들어옴. 타일 rotate(90deg), 와이프 translate(0, 175%) rotate(15deg)→(0, 0) rotate(0), 라벨 1.5em 위로 롤', timing: '525ms cubic-bezier(0.625, 0.05, 0, 1) (전부)', inferred: false },
    feel: ['매끈함', '에이전시급'],
    fits: ['CTA', '캐러셀 다음'],
    demo: `<div class="C-09"><button type="button"><span class="wipe" aria-hidden="true"></span><span class="label"><span class="label-in">시작하기</span></span><span class="tile" aria-hidden="true"><span class="win"><span class="list">{{i:arrow-r}}{{i:arrow-r}}{{i:arrow-r}}</span></span></span></button></div>`,
    css: `.C-09 button { position: relative; display: inline-flex; align-items: center; gap: var(--space-4); padding: var(--space-1) var(--space-1) var(--space-1) var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; isolation: isolate; cursor: pointer; transition: color 525ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-09 .wipe { position: absolute; inset: 0; z-index: -1; background: var(--fg-1); transform: translate(0, 175%) rotate(15deg); transition: transform 525ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-09 .label { display: block; height: 1.5em; overflow: hidden; line-height: 1.5; }
.C-09 .label-in { display: block; text-shadow: 0 1.5em currentColor; transition: transform 525ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-09 .tile { position: relative; display: grid; place-items: center; width: calc(var(--space-6) + var(--space-2)); height: calc(var(--space-6) + var(--space-2)); color: var(--bg-1); isolation: isolate; transition: color 525ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-09 .tile::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--fg-1); border-radius: var(--radius-sm); transition: transform 525ms cubic-bezier(0.625, 0.05, 0, 1), background-color 525ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-09 .win { display: flex; justify-content: flex-end; width: 1em; overflow: hidden; font-size: var(--text-24); }
.C-09 .list { display: flex; flex: none; }
.C-09 .list .ic { flex: none; width: 1em; height: 1em; transition: transform 525ms cubic-bezier(0.625, 0.05, 0, 1); }
@media (hover: hover) and (pointer: fine) {
  .C-09 button:hover { color: var(--bg-1); }
  .C-09 button:hover .wipe { transform: translate(0, 0) rotate(0); }
  .C-09 button:hover .label-in { transform: translateY(-1.5em); }
  .C-09 button:hover .tile { color: var(--fg-1); }
  .C-09 button:hover .tile::before { background: var(--bg-1); transform: rotate(90deg); }
  .C-09 button:hover .list .ic { transform: translateX(200%); }
}
.C-09 button:focus-visible { color: var(--bg-1); }
.C-09 button:focus-visible .wipe { transform: translate(0, 0) rotate(0); }
.C-09 button:focus-visible .label-in { transform: translateY(-1.5em); }
.C-09 button:focus-visible .tile { color: var(--fg-1); }
.C-09 button:focus-visible .tile::before { background: var(--bg-1); transform: rotate(90deg); }
.C-09 button:focus-visible .list .ic { transform: translateX(200%); }`
  },
  {
    id: 'C-10',
    group: '루프 통과·교체',
    name: '예비 동작 루프 (Lottie)',
    source: 'useAnimations arrowRight',
    url: 'https://github.com/useAnimations/react-useanimations',
    look: '24px 스트로크 화살표, 30fps Lottie(icons/arrowRight.json). 데모는 이전(좌우 반전)/다음 원형 버튼, 24px 창에서 잘림.',
    states: '호버·포커스마다 한 번 재생(약 1초). 화살표는 창 밖으로 나갔다 반대편에서 들어온다.',
    motion: { trigger: '호버 진입', change: 'f0–5 2px 뒤로 당김(ease-out) → f5–13 오른쪽으로 가속 이탈 → f14 왼쪽 끝으로 점프(hold 키프레임) → f14–25 들어오며 +1.3px 오버슈트(ease-out) → f25–30 안착(ease-in-out)', timing: '약 1s (167ms + 267ms + 367ms + …). 이탈 구간 cubic-bezier(.42, 0, 1, 1). 키프레임 17% / 43% / 44% / 83%', inferred: false },
    feel: ['장난스러움', '만화 에너지'],
    fits: ['캐러셀 다음', '온보딩 "계속"'],
    demo: `<div class="C-10">
  <button type="button" class="prev" aria-label="이전"><span class="win">{{i:arrow-r}}</span></button>
  <button type="button" class="next" aria-label="다음"><span class="win">{{i:arrow-r}}</span></button>
</div>`,
    css: `.C-10 { display: flex; gap: var(--space-3); }
.C-10 button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-pill); cursor: pointer; }
.C-10 .win { display: block; width: 24px; height: 24px; overflow: hidden; }
.C-10 .prev .win { transform: scaleX(-1); }
.C-10 .ic { display: block; width: 24px; height: 24px; }
.C-10 button:is(:hover, :focus-visible) .ic { animation: C-10-loop 1s; }
@keyframes C-10-loop {
  0% { transform: translateX(0); animation-timing-function: ease-out; }
  17% { transform: translateX(-2px); animation-timing-function: cubic-bezier(.42, 0, 1, 1); }
  43% { transform: translateX(110%); animation-timing-function: step-end; }
  44% { transform: translateX(-110%); animation-timing-function: ease-out; }
  83% { transform: translateX(1.3px); animation-timing-function: ease-in-out; }
  100% { transform: translateX(0); }
}`
  },
  {
    id: 'C-11',
    group: '루프 통과·교체',
    name: '이중 화살표 교체',
    source: 'Uiverse gharsh11032000/loud-chicken-53',
    url: 'https://uiverse.io/gharsh11032000/loud-chicken-53',
    look: '2px 외곽 링 알약(radius 100px, 4px 투명 테두리, padding 16px 36px). 오른쪽에 화살표, 왼쪽 밖에 숨은 두 번째 화살표. 원본 greenyellow.',
    states: '호버·포커스 동안 유지. 누르면 scale(.95) + 링 4px.',
    motion: { trigger: '호버', change: '뒤 화살표 right 16px→−25% (퇴장), 앞 화살표 left −25%→16px (등장), 라벨 translateX(−12px→12px), 20px 점이 220px 채움으로, radius 100px→12px, 외곽 링 2px→12px 로 퍼지며 투명', timing: '.8s cubic-bezier(0.23, 1, 0.32, 1) (버튼 자체 .6s)', inferred: false },
    feel: ['유려함', '넉넉함'],
    fits: ['히어로 CTA'],
    demo: `<div class="C-11"><button type="button">{{i:arrow-r}}<span class="t">더 보기</span><span class="circle" aria-hidden="true"></span>{{i:arrow-r}}</button></div>`,
    css: `.C-11 button { position: relative; display: flex; align-items: center; gap: 4px; padding: var(--space-4) calc(var(--space-6) + var(--space-1)); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: transparent; border: 4px solid transparent; border-radius: 100px; box-shadow: 0 0 0 2px var(--fg-1); overflow: hidden; cursor: pointer; transition: all .6s cubic-bezier(0.23, 1, 0.32, 1); }
.C-11 .ic { position: absolute; z-index: 9; width: 24px; height: 24px; transition: all .8s cubic-bezier(0.23, 1, 0.32, 1); }
.C-11 .ic:first-child { left: -25%; }
.C-11 .ic:last-child { right: 16px; }
.C-11 .circle { position: absolute; top: 50%; left: 50%; width: 20px; height: 20px; background: var(--fg-1); border-radius: 50%; opacity: 0; transform: translate(-50%, -50%); transition: all .8s cubic-bezier(0.23, 1, 0.32, 1); }
.C-11 .t { position: relative; z-index: 1; transform: translateX(-12px); transition: all .8s cubic-bezier(0.23, 1, 0.32, 1); }
.C-11 button:is(:hover, :focus-visible) { color: var(--bg-1); border-radius: 12px; box-shadow: 0 0 0 12px transparent; }
.C-11 button:is(:hover, :focus-visible) .ic:last-child { right: -25%; }
.C-11 button:is(:hover, :focus-visible) .ic:first-child { left: 16px; }
.C-11 button:is(:hover, :focus-visible) .t { transform: translateX(12px); }
.C-11 button:is(:hover, :focus-visible) .circle { width: 220px; height: 220px; opacity: 1; }
.C-11 button:active { scale: .95; box-shadow: 0 0 0 4px var(--fg-1); }`
  },
  {
    id: 'C-12',
    group: '루프 통과·교체',
    name: '버블 홉 화살표',
    source: 'Osmo — Button with bubble arrow',
    url: 'https://www.osmo.supply/resource/button-with-bubble-arrow',
    look: '라벨 알약 + 원형 버블(화살표). 버블이 라벨 뒤에서 앞으로 건너뛴다.',
    states: '호버·포커스 동안 유지.',
    motion: { trigger: '호버', change: '라벨 알약 translateX(−3.75em)→0, 앞 버블 scale 0→1 (왼쪽 기준), 뒤 버블 scale 1→0 (오른쪽 기준), 화살표 rotate(−45deg)', timing: '735ms cubic-bezier(0.625, 0.05, 0, 1)', inferred: false },
    feel: ['통통함', '하이엔드'],
    fits: ['CTA', '방문·외부 링크'],
    demo: `<div class="C-12"><button type="button"><span class="bub lead" aria-hidden="true">{{i:arrow-r}}</span><span class="grp"><span class="pill">방문하기</span><span class="bub trail" aria-hidden="true">{{i:arrow-r}}</span></span></button></div>`,
    css: `.C-12 button { display: flex; align-items: center; gap: var(--space-3); padding: 0; font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: none; border: 0; cursor: pointer; }
.C-12 .grp { display: flex; align-items: center; gap: var(--space-3); transform: translateX(-3.75em); transition: transform 735ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-12 .pill { display: flex; align-items: center; height: var(--space-7); padding: 0 var(--space-5); white-space: nowrap; background: var(--fg-1); border-radius: var(--radius-pill); }
.C-12 .bub { display: grid; place-items: center; flex: none; width: var(--space-7); height: var(--space-7); background: var(--fg-1); border-radius: 50%; transition: transform 735ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-12 .lead { transform: scale(0); transform-origin: left center; }
.C-12 .trail { transform-origin: right center; }
.C-12 .bub .ic { width: 20px; height: 20px; transition: transform 735ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-12 button:is(:hover, :focus-visible) .grp { transform: translateX(0); }
.C-12 button:is(:hover, :focus-visible) .lead { transform: scale(1); }
.C-12 button:is(:hover, :focus-visible) .trail { transform: scale(0); }
.C-12 button:is(:hover, :focus-visible) .bub .ic { transform: rotate(-45deg); }`
  },

  /* ───────────── 잔상·반복 ───────────── */
  {
    id: 'C-13',
    group: '잔상·반복',
    name: '에코 잔상',
    source: 'Uiverse benjimich/lovely-octopus-40',
    url: 'https://uiverse.io/benjimich/lovely-octopus-40',
    look: '텍스트 버튼 오른쪽 끝(right: 0)에 같은 화살표 3개가 겹쳐 있음. 원본 텍스트 #7f5af0, 화살표 #94a1b2.',
    states: '호버·포커스 동안 유지. 버튼 letter-spacing 2px (.3s ease).',
    motion: { trigger: '호버', change: '2·3번째 사본이 right −20px / −40px 로 나가며 opacity .66 / .33', timing: '.3s cubic-bezier(0.645, 0.045, 0.355, 1), 지연 50ms / 100ms', inferred: false },
    feel: ['빠름', '모션 블러'],
    fits: ['빨리 감기', '가로 스크롤 힌트'],
    demo: `<div class="C-13"><button type="button">다음 단계</button><span class="a a1" aria-hidden="true">{{i:arrow-r}}</span><span class="a a2" aria-hidden="true">{{i:arrow-r}}</span><span class="a a3" aria-hidden="true">{{i:arrow-r}}</span></div>`,
    css: `.C-13 { position: relative; display: flex; margin-right: 40px; }
.C-13 button { padding: var(--space-2) var(--space-6) var(--space-2) var(--space-5); font: inherit; font-size: var(--text-18); font-weight: var(--weight-semibold); color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: all .3s ease; }
.C-13 .a { position: absolute; top: 25%; right: 0; width: 24px; color: var(--fg-3); pointer-events: none; transition: all .3s cubic-bezier(0.645, 0.045, 0.355, 1); }
.C-13 .a .ic { display: block; width: 24px; height: 24px; }
.C-13 .a2, .C-13 .a3 { opacity: 0; }
.C-13 button:is(:hover, :focus-visible) { letter-spacing: 2px; }
.C-13 button:is(:hover, :focus-visible) ~ .a2 { right: -20px; opacity: .66; transition-delay: 50ms; }
.C-13 button:is(:hover, :focus-visible) ~ .a3 { right: -40px; opacity: .33; transition-delay: 100ms; }`
  },
  {
    id: 'C-14',
    group: '잔상·반복',
    name: '삼중 셰브론 캐스케이드',
    source: 'Uiverse Li-Deheng/shy-moth-10',
    url: 'https://uiverse.io/Li-Deheng/shy-moth-10',
    look: '알약 "NEXT" 버튼 + 66×43 뷰박스의 셰브론 3개(평소엔 한 자리에 겹침). 원본 #ff135a 바탕에 흰 셰브론.',
    states: '호버·포커스 동안 계속 반복. 호버 때 아이콘 margin-right 0→25px (.5s), 외곽선 펄스 1s 한 번.',
    motion: { trigger: '호버', change: '셰브론 1·2가 translateX(−60% / −30%)→0 으로 펼쳐지고, color_anim 1s infinite 가 .2 / .4 / .6s 지연으로 흰색→버튼색→흰색을 차례로 쫓음', timing: '펼침 .4s / .5s (ease), 색 1s infinite, 지연 .2 / .4 / .6s', inferred: false },
    feel: ['에너지', '고고고'],
    fits: ['스와이프 힌트', '다음 CTA'],
    demo: `<div class="C-14"><button type="button">다음<span class="arw" aria-hidden="true">{{i:c-chevs3}}</span></button></div>`,
    css: `.C-14 button { display: flex; align-items: center; padding: var(--space-1) var(--space-6); font: inherit; font-size: var(--text-24); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: 100px; box-shadow: 0 0 .2em 0 var(--fg-1); cursor: pointer; transition: 1s; }
.C-14 button:is(:hover, :focus-visible) { animation: C-14-ring 1s; outline: .1em solid transparent; outline-offset: .2em; box-shadow: 0 0 .4em 0 var(--fg-1); transition: .5s; }
.C-14 button:focus-visible { outline-color: var(--fg-1); }
.C-14 .arw { position: relative; display: block; width: 20px; height: 26px; margin-left: 15px; margin-right: 0; transition: .5s; }
.C-14 .ic { display: block; width: 40px; height: 26px; overflow: visible; }
.C-14 .one, .C-14 .two, .C-14 .three { transform-box: view-box; }
.C-14 .one { transform: translateX(-60%); transition: .4s; }
.C-14 .two { transform: translateX(-30%); transition: .5s; }
.C-14 button:is(:hover, :focus-visible) .arw { margin-right: 25px; }
.C-14 button:is(:hover, :focus-visible) .three { animation: C-14-color 1s infinite .2s; }
.C-14 button:is(:hover, :focus-visible) .two { transform: translateX(0%); animation: C-14-color 1s infinite .4s; }
.C-14 button:is(:hover, :focus-visible) .one { transform: translateX(0%); animation: C-14-color 1s infinite .6s; }
@keyframes C-14-color { 0% { stroke: var(--bg-1); } 50% { stroke: var(--fg-1); } 100% { stroke: var(--bg-1); } }
@keyframes C-14-ring { 0% { outline: .2em solid var(--fg-1); outline-offset: 0; } }`
  },
  {
    id: 'C-15',
    group: '잔상·반복',
    name: '핑퐁 안쪽 화살표',
    source: 'Uiverse Navarog21/ordinary-rat-19',
    url: 'https://uiverse.io/Navarog21/ordinary-rat-19',
    look: '팔각형으로 잘린 5px 이중선 버튼(11em × 4em) + 네 귀퉁이 회전 사각 + 버튼 바깥 양옆의 삼각 화살표(바깥을 가리킴). 원본 #2761c3 → 호버 #27c39f.',
    states: '호버·포커스 동안 왕복 반복. 떠나면 제자리로.',
    motion: { trigger: '호버', change: '삼각 화살표가 좌우 자리를 바꿔 안쪽을 가리킨 뒤 translateX 0↔±10px 왕복. 귀퉁이 scale 1→1.25, 귀퉁이 색이 .05→.15→.25→.35s 순서로 바뀜', timing: '자리 바꿈 .2s, 왕복 0.6s ease-in-out both infinite alternate, 귀퉁이 색 0.1s ease-in-out', inferred: false },
    feel: ['게임 같음', '집요함'],
    fits: ['장난스러운 CTA (페이지네이션엔 과함)'],
    demo: `<div class="C-15"><button type="button"><span class="clip" aria-hidden="true"><span class="cn lt"></span><span class="cn rb"></span><span class="cn rt"></span><span class="cn lb"></span></span><span class="t">시 작</span><span class="ar ar-r" aria-hidden="true"></span><span class="ar ar-l" aria-hidden="true"></span></button></div>`,
    css: `.C-15 button { position: relative; width: 11em; height: 4em; padding: 0; font: inherit; font-size: var(--text-14); font-weight: var(--weight-bold); color: var(--fg-1); background: transparent; border: 0; cursor: pointer; transition: .1s; }
.C-15 .clip { --c15: var(--fg-3); position: absolute; inset: 0; overflow: hidden; border: 5px double var(--c15); clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%); }
.C-15 .t { position: relative; }
.C-15 .cn { position: absolute; width: 4em; height: 4em; background: var(--fg-3); transform: scale(1) rotate(45deg); transition: .2s; }
.C-15 .rt { top: -1.98em; left: 91%; }
.C-15 .lt { top: -1.96em; left: -3em; }
.C-15 .lb { top: 2.1em; left: -2.15em; }
.C-15 .rb { top: 45%; left: 88%; }
.C-15 .ar { position: absolute; top: 35%; width: 11%; height: 30%; background: var(--fg-3); transition: .2s; }
.C-15 .ar-l { left: -13.5%; clip-path: polygon(100% 0, 100% 100%, 0 50%); }
.C-15 .ar-r { left: 102%; clip-path: polygon(100% 49%, 0 0, 0 100%); }
.C-15 button:is(:hover, :focus-visible) .clip { --c15: var(--fg-1); }
.C-15 button:is(:hover, :focus-visible) .ar-r { left: -15%; background: var(--fg-1); animation: C-15-r .6s ease-in-out both infinite alternate; }
.C-15 button:is(:hover, :focus-visible) .ar-l { left: 103%; background: var(--fg-1); animation: C-15-l .6s ease-in-out both infinite alternate; }
.C-15 button:is(:hover, :focus-visible) .cn { transform: scale(1.25) rotate(45deg); }
.C-15 button:is(:hover, :focus-visible) .lt { animation: C-15-c .1s ease-in-out .05s both; }
.C-15 button:is(:hover, :focus-visible) .rt { animation: C-15-c .1s ease-in-out .15s both; }
.C-15 button:is(:hover, :focus-visible) .rb { animation: C-15-c .1s ease-in-out .25s both; }
.C-15 button:is(:hover, :focus-visible) .lb { animation: C-15-c .1s ease-in-out .35s both; }
@keyframes C-15-c { from { background: var(--fg-3); } to { background: var(--fg-1); } }
@keyframes C-15-l { from { transform: translateX(0); } to { transform: translateX(10px); } }
@keyframes C-15-r { from { transform: translateX(0); } to { transform: translateX(-10px); } }`
  },
  {
    id: 'C-16',
    group: '잔상·반복',
    name: '숨쉬는 대기 힌트',
    source: 'Uiverse Wasim-Rana/lazy-fish-83',
    url: 'https://uiverse.io/Wasim-Rana/lazy-fish-83',
    look: '버튼 라벨 뒤 화살표(원본 ➔ 글리프 24px, margin-left 10px). 원본은 보라 그라데이션 입체 버튼(기울기 변형은 C-34).',
    states: '대기 중 계속 숨쉰다(원본은 색도 흰색↔#f3aefe). 호버·포커스 때 15px 앞으로. 원본은 같은 요소에 animation 과 hover transform 을 걸어 호버 이동이 묻히므로, 여기선 두 겹으로 나눠 둘 다 보이게 했다.',
    motion: { trigger: '대기 / 호버', change: '대기 translateX 0→5px 왕복, 호버 translateX(15px)', timing: 'arrow-pulse 1.5s infinite alternate (ease) / 호버 .3s ease', inferred: false },
    feel: ['차분함', '초대하는'],
    fits: ['"넘겨보기 →" 힌트', '첫 방문 캐러셀 신호'],
    demo: `<div class="C-16"><button type="button">넘겨보기<span class="arw" aria-hidden="true"><span class="pulse">{{i:arrow-r}}</span></span></button></div>`,
    css: `.C-16 button { display: inline-flex; align-items: center; padding: var(--space-4) var(--space-6) var(--space-4) var(--space-5); font: inherit; font-size: var(--text-18); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); cursor: pointer; }
.C-16 .arw { display: inline-block; margin-left: 10px; transition: transform .3s ease; }
.C-16 .pulse { display: block; animation: C-16-pulse 1.5s infinite alternate; }
.C-16 .ic { display: block; width: 24px; height: 24px; }
.C-16 button:is(:hover, :focus-visible) .arw { transform: translateX(15px); }
@keyframes C-16-pulse { 0% { transform: translateX(0); } 100% { transform: translateX(5px); } }`
  },

  /* ───────────── 셰브론 변형·선 그리기 ───────────── */
  {
    id: 'C-17',
    group: '셰브론 변형·선 그리기',
    name: '셰브론 날 세우기 + 원 팝',
    source: 'Codrops Arrow Navigation Styles — Circle pop',
    url: 'https://tympanus.net/codrops/2014/05/28/arrow-navigation-styles/',
    look: '사진 위 50×50 버튼(가장자리에서 30px), 3px 흰 막대 2개로 만든 셰브론. 다음 버튼은 같은 아이콘을 rotate(180deg). 원본 배경 #cc6055.',
    states: '호버·포커스 동안 유지. 데모는 루프 캐러셀(끝 없음).',
    motion: { trigger: '호버', change: '흰 원 opacity 0→1 · scale .9→1, 막대 ±30°→±45° (셰브론이 벌어짐), 막대 색이 배경색으로', timing: '.3s (transform · opacity · background-color)', inferred: false },
    feel: ['또렷함', '단호함'],
    fits: ['사진 위 슬라이더 이전/다음'],
    demo: `<div class="C-17" data-behavior="carousel" data-loop>
  <div class="track" data-track><div class="s">1</div><div class="s">2</div><div class="s">3</div></div>
  <button type="button" class="nav prev" data-prev aria-label="이전 슬라이드"><span class="iw"></span></button>
  <button type="button" class="nav next" data-next aria-label="다음 슬라이드"><span class="iw"></span></button>
</div>`,
    css: `.C-17 { position: absolute; inset: 0; overflow: hidden; background: var(--fg-3); }
.C-17 .track { display: flex; height: 100%; }
.C-17 .s { display: grid; flex: 0 0 100%; place-items: center; font-size: var(--text-48); line-height: var(--lh-48); font-weight: var(--weight-bold); color: color-mix(in srgb, var(--bg-1) 40%, transparent); }
.C-17 .nav { position: absolute; top: 50%; width: 50px; height: 50px; margin: 0 30px; padding: 0; background: none; border: 0; cursor: pointer; transform: translateY(-50%); }
.C-17 .prev { left: 0; }
.C-17 .next { right: 0; }
.C-17 .nav::before { content: ""; position: absolute; inset: 0; background: var(--bg-1); border-radius: 50%; opacity: 0; transform: scale(.9); transition: transform .3s, opacity .3s; }
.C-17 .iw { position: relative; display: block; width: 80%; height: 80%; margin: 10% 0 0 10%; }
.C-17 .next .iw { transform: rotate(180deg); }
.C-17 .iw::before, .C-17 .iw::after { content: ""; position: absolute; left: 25%; width: 3px; height: 50%; background: var(--bg-1); backface-visibility: hidden; transition: transform .3s, background-color .3s; }
.C-17 .iw::before { transform: translateX(-50%) rotate(30deg); transform-origin: 0 100%; }
.C-17 .iw::after { top: 50%; transform: translateX(-50%) rotate(-30deg); transform-origin: 0 0; }
.C-17 .nav:is(:hover, :focus-visible)::before { opacity: 1; transform: scale(1); }
.C-17 .nav:is(:hover, :focus-visible) .iw::before, .C-17 .nav:is(:hover, :focus-visible) .iw::after { background: var(--fg-3); }
.C-17 .nav:is(:hover, :focus-visible) .iw::before { transform: translateX(-50%) rotate(45deg); }
.C-17 .nav:is(:hover, :focus-visible) .iw::after { transform: translateX(-50%) rotate(-45deg); }`
  },
  {
    id: 'C-18',
    group: '셰브론 변형·선 그리기',
    name: '획 채우기',
    source: 'Codrops ANS — Fillpath (nizuka.fr 참고)',
    url: 'https://github.com/codrops/ArrowNavigationStyles/blob/master/css/component.css',
    look: '100×100 영역(데모 80×80)에 3px 팔 2개(원본 #566475) + 그 위 높이 0 인 흰 덧칠 막대. 원본 배경 #f3cf3f, 라벨 흰색 대문자. 데모는 밝은 면이라 덧칠을 var(--fg-1)로.',
    states: '호버·포커스 동안 유지하며 라벨 표시. 데모는 루프 캐러셀.',
    motion: { trigger: '호버', change: '덧칠 막대 height 0→50% (색이 팔을 따라 이동), 팔 −135/−45° → −125/−55° (셰브론이 좁아짐, 다음은 거울상), 라벨 translateX(−50%)→0 페이드 인', timing: '.3s (전부)', inferred: false },
    feel: ['우아함', '에디토리얼'],
    fits: ['풀스크린 슬라이더', '페이지 넘김'],
    demo: `<div class="C-18" data-behavior="carousel" data-loop>
  <div class="track" data-track><div class="s">1</div><div class="s">2</div><div class="s">3</div></div>
  <button type="button" class="nav prev" data-prev><span class="iw"></span><span class="lb">이전</span></button>
  <button type="button" class="nav next" data-next><span class="iw"></span><span class="lb">다음</span></button>
</div>`,
    css: `.C-18 { position: absolute; inset: 0; overflow: hidden; }
.C-18 .track { display: flex; height: 100%; }
.C-18 .s { display: grid; flex: 0 0 100%; place-items: center; font-size: var(--text-48); line-height: var(--lh-48); font-weight: var(--weight-bold); color: var(--border); }
.C-18 .nav { position: absolute; top: 50%; width: 80px; height: 80px; padding: 0; font: inherit; background: none; border: 0; cursor: pointer; transform: translateY(-50%); }
.C-18 .prev { left: 0; }
.C-18 .next { right: 0; }
.C-18 .iw { position: relative; display: block; width: 100%; height: 100%; }
.C-18 .nav::before, .C-18 .nav::after, .C-18 .iw::before, .C-18 .iw::after { content: ""; position: absolute; top: 50%; left: 50%; width: 3px; height: 50%; background: var(--border-strong); backface-visibility: hidden; transition: transform .3s; }
.C-18 .iw::before, .C-18 .iw::after { z-index: 1; height: 0; background: var(--fg-1); transition: height .3s, transform .3s; }
.C-18 .nav::before, .C-18 .iw::before { transform: translateX(-50%) rotate(-135deg); transform-origin: 50% 0%; }
.C-18 .next::before, .C-18 .next .iw::before { transform: translateX(-50%) rotate(135deg); transform-origin: 50% 0%; }
.C-18 .nav::after, .C-18 .iw::after { transform: translateX(-50%) rotate(-45deg); transform-origin: 0 0; }
.C-18 .next::after, .C-18 .next .iw::after { transform: translateX(-50%) rotate(45deg); transform-origin: 100% 0%; }
.C-18 .lb { position: absolute; top: 50%; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-regular); white-space: nowrap; color: var(--fg-1); opacity: 0; transition: transform .3s, opacity .3s; }
.C-18 .prev .lb { left: 100%; transform: translateY(-50%) translateX(-50%); }
.C-18 .next .lb { right: 100%; transform: translateY(-50%) translateX(50%); }
.C-18 .nav:is(:hover, :focus-visible) .iw::before, .C-18 .nav:is(:hover, :focus-visible) .iw::after { height: 50%; }
.C-18 .nav:is(:hover, :focus-visible)::before, .C-18 .nav:is(:hover, :focus-visible) .iw::before { transform: translateX(-50%) rotate(-125deg); }
.C-18 .next:is(:hover, :focus-visible)::before, .C-18 .next:is(:hover, :focus-visible) .iw::before { transform: translateX(-50%) rotate(125deg); }
.C-18 .nav:is(:hover, :focus-visible)::after, .C-18 .nav:is(:hover, :focus-visible) .iw::after { transform: translateX(-50%) rotate(-55deg); }
.C-18 .next:is(:hover, :focus-visible)::after, .C-18 .next:is(:hover, :focus-visible) .iw::after { transform: translateX(-50%) rotate(55deg); }
.C-18 .nav:is(:hover, :focus-visible) .lb { opacity: 1; transform: translateY(-50%) translateX(0); }`
  },
  {
    id: 'C-19',
    group: '셰브론 변형·선 그리기',
    name: '순차 외곽선 그리기',
    source: 'Uiverse Nawsome/chilly-moose-65',
    url: 'https://uiverse.io/Nawsome/chilly-moose-65',
    look: '50×60 영역, 4px 막대 2개를 ±45° 돌려 만든 셰브론(원본 #666) + 각 막대 안 흰 덧칠(::after). 데모는 밝은 무대라 덧칠을 var(--fg-1)로, 이전 버튼은 좌우 반전.',
    states: '호버·포커스 동안 유지. 누르면 scale(.9) (.1s). 떠날 땐 역순으로 지워짐.',
    motion: { trigger: '호버', change: '아래 팔 덧칠 right 100%→0 이 먼저, 이어서 위 팔 덧칠 left 100%→0 — 꼬리→꼭짓점→꼬리로 한 획처럼 그려짐 (리서치 요약은 위 팔이 먼저라고 적었지만 소스는 아래 팔이 먼저)', timing: '각 .15s (ease), .15s 간격', inferred: false },
    feel: ['공들인', '정밀함'],
    fits: ['미니멀 아이콘 내비'],
    demo: `<div class="C-19">
  <button type="button" class="prev" aria-label="이전"><span class="g"><span class="arm top"></span><span class="arm bot"></span></span></button>
  <button type="button" class="next" aria-label="다음"><span class="g"><span class="arm top"></span><span class="arm bot"></span></span></button>
</div>`,
    css: `.C-19 { display: flex; gap: var(--space-8); }
.C-19 button { position: relative; width: 50px; height: 60px; padding: 0; background: none; border: 0; cursor: pointer; transition: transform .1s; }
.C-19 .g { position: absolute; inset: 0; }
.C-19 .prev .g { transform: scaleX(-1); }
.C-19 .arm { position: absolute; top: 50%; left: -5px; width: 100%; height: 4px; background: var(--border-strong); }
.C-19 .arm::after { content: ""; position: absolute; top: 0; height: 100%; background: var(--fg-1); transition: all .15s; }
.C-19 .top { transform: rotate(45deg); transform-origin: bottom right; }
.C-19 .top::after { left: 100%; right: 0; transition-delay: 0s; }
.C-19 .bot { transform: rotate(-45deg); transform-origin: top right; }
.C-19 .bot::after { left: 0; right: 100%; transition-delay: .15s; }
.C-19 button:is(:hover, :focus-visible) .top::after { left: 0; transition-delay: .15s; }
.C-19 button:is(:hover, :focus-visible) .bot::after { right: 0; transition-delay: 0s; }
.C-19 button:active { transform: scale(.9); }`
  },
  {
    id: 'C-20',
    group: '셰브론 변형·선 그리기',
    name: '원 획 지우기·다시 그리기',
    source: 'useAnimations arrowRightCircle',
    url: 'https://github.com/useAnimations/react-useanimations',
    look: '원형 테두리(r=10, 둘레 62.8) + 가운데 화살표. 데모는 48px 로 키운 이전/다음.',
    states: '호버·포커스마다 한 번(2.5s). 화살표는 움직이지 않는다.',
    motion: { trigger: '호버 진입', change: 'trim path — 원이 지워지고(f0–30) 0.5s 멈춘 뒤(f30–45) 다시 그려짐(f45–75). stroke-dasharray 62.8, 12시 방향 시작(rotate(−90deg))', timing: '지우기 1s cubic-bezier(.8, 0, .8, 1) → 멈춤 .5s → 그리기 1s cubic-bezier(.2, 0, .2, 1)', inferred: false },
    feel: ['차분함', '신중함'],
    fits: ['자동재생 진행 표시가 있는 다음 버튼'],
    demo: `<div class="C-20">
  <button type="button" aria-label="이전">{{i:arrow-circle-l}}</button>
  <button type="button" aria-label="다음">{{i:arrow-circle-r}}</button>
</div>`,
    css: `.C-20 { display: flex; gap: var(--space-4); }
.C-20 button { display: grid; place-items: center; padding: 0; color: var(--fg-1); background: none; border: 0; border-radius: 50%; cursor: pointer; }
.C-20 .ic { width: 48px; height: 48px; stroke-width: 1.5; }
.C-20 .ring { stroke-dasharray: 62.8; stroke-dashoffset: 0; transform: rotate(-90deg); transform-box: fill-box; transform-origin: center; }
.C-20 button:is(:hover, :focus-visible) .ring { animation: C-20-trim 2.5s; }
@keyframes C-20-trim {
  0% { stroke-dashoffset: 0; animation-timing-function: cubic-bezier(.8, 0, .8, 1); }
  40% { stroke-dashoffset: 62.8; }
  60% { stroke-dashoffset: 62.8; animation-timing-function: cubic-bezier(.2, 0, .2, 1); }
  100% { stroke-dashoffset: 0; }
}`
  },
  {
    id: 'C-21',
    group: '셰브론 변형·선 그리기',
    name: '굵기·채움 축 변화',
    source: 'Material Symbols',
    url: 'https://developers.google.com/fonts/docs/material_symbols',
    look: 'Material Symbols 가변 폰트 축 FILL 0–1, wght 100–700, GRAD −50–200, opsz 20–48. 데모는 폰트를 싣지 않고 SVG 로 근사: 왼쪽 두 개는 stroke-width 2→3 (wght), 오른쪽 두 개는 원 채움 (FILL).',
    states: '호버·포커스 동안 유지.',
    motion: { trigger: '호버', change: 'font-variation-settings FILL 0→1 그리고/또는 wght 400→600 (Google: FILL 축이 상태 간 CSS 전환을 제공)', timing: '200ms ease-out — 원문에 시간 없음', inferred: true },
    feel: ['무게감', '은은한 강조'],
    fits: ['페이지네이션 화살표', '툴바 셰브론'],
    demo: `<div class="C-21">
  <button type="button" class="w" aria-label="이전">{{i:chev-l}}</button>
  <button type="button" class="w" aria-label="다음">{{i:chev-r}}</button>
  <button type="button" class="f" aria-label="이전">{{i:arrow-circle-l}}</button>
  <button type="button" class="f" aria-label="다음">{{i:arrow-circle-r}}</button>
</div>`,
    css: `.C-21 { display: flex; align-items: center; gap: var(--space-3); }
.C-21 button { display: grid; place-items: center; width: var(--space-7); height: var(--space-7); padding: 0; color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.C-21 .ic { width: 32px; height: 32px; stroke-width: 2; transition: stroke-width 200ms ease-out; }
.C-21 .f { margin-left: var(--space-1); }
.C-21 .w:is(:hover, :focus-visible) .ic { stroke-width: 3; }
.C-21 .ring { fill: transparent; transition: fill 200ms ease-out; }
.C-21 .f :is(.shaft, .head) { transition: stroke 200ms ease-out; }
.C-21 .f:is(:hover, :focus-visible) .ring { fill: currentColor; }
.C-21 .f:is(:hover, :focus-visible) :is(.shaft, .head) { stroke: var(--bg-1); }`
  },
  {
    id: 'C-22',
    group: '셰브론 변형·선 그리기',
    name: '줄→화살표 / →X 변형',
    source: 'Sara Soueidan — Transformicons',
    url: 'https://www.sarasoueidan.com/blog/navicon-transformicons/',
    look: '세 줄 햄버거(줄 두께 = 크기/7, 위아래 줄 간격 = 크기/4). 클릭으로 토글.',
    states: '클릭 토글(aria-pressed). 왼쪽: 줄 → 왼쪽 화살표. 오른쪽: 줄 → X (X2 순차형, 닫힐 땐 역순).',
    motion: { trigger: '클릭 (토글)', change: '화살표: 버튼 scale3d(.8), 위아래 줄 top 0 · width 크기/1.8 · rotate ±40deg. X: rotate ±45deg, 가운데 줄 투명', timing: '기본 .3s. X2 열림: top .3s ease, transform .3s .5s ease. 닫힘(역순: top .3s .5s, transform .3s)은 리서치에 없는 추정값', inferred: true },
    feel: ['기계적', '만족스러움'],
    fits: ['뒤로 ↔ 메뉴', '미리보기 닫기(셰브론→X)'],
    demo: `<div class="C-22" data-behavior="toggle">
  <button type="button" class="tb arrow" data-toggle aria-pressed="false" aria-label="메뉴와 뒤로 전환"><span class="lines"></span></button>
  <button type="button" class="tb x2" data-toggle aria-pressed="false" aria-label="메뉴와 닫기 전환"><span class="lines"></span></button>
</div>`,
    css: `.C-22 { display: flex; gap: var(--space-5); }
.C-22 .tb { --s: 28px; display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: .3s; }
.C-22 .lines, .C-22 .lines::before, .C-22 .lines::after { display: block; width: var(--s); height: calc(var(--s) / 7); background: currentColor; border-radius: calc(var(--s) / 14); transition: .3s; }
.C-22 .lines { position: relative; }
.C-22 .lines::before, .C-22 .lines::after { content: ""; position: absolute; left: 0; transform-origin: calc(var(--s) / 14) center; }
.C-22 .lines::before { top: calc(var(--s) / 4); }
.C-22 .lines::after { top: calc(var(--s) / -4); }
.C-22 .arrow.is-on { transform: scale3d(.8, .8, .8); }
.C-22 .arrow.is-on .lines::before, .C-22 .arrow.is-on .lines::after { top: 0; width: calc(var(--s) / 1.8); }
.C-22 .arrow.is-on .lines::before { transform: rotate3d(0, 0, 1, 40deg); }
.C-22 .arrow.is-on .lines::after { transform: rotate3d(0, 0, 1, -40deg); }
.C-22 .x2 .lines::before, .C-22 .x2 .lines::after { transform-origin: 50% 50%; transition: top .3s .5s ease, transform .3s ease; }
.C-22 .x2.is-on .lines { background: transparent; }
.C-22 .x2.is-on .lines::before, .C-22 .x2.is-on .lines::after { top: 0; transition: top .3s ease, transform .3s .5s ease; }
.C-22 .x2.is-on .lines::before { transform: rotate3d(0, 0, 1, 45deg); }
.C-22 .x2.is-on .lines::after { transform: rotate3d(0, 0, 1, -45deg); }`
  },

  /* ───────────── 드로어·미리보기 ───────────── */
  {
    id: 'C-23',
    group: '드로어·미리보기',
    name: '리빌 드로어',
    source: 'Codrops ANS — Reveal',
    url: 'https://tympanus.net/Development/ArrowNavigationStyles/',
    look: '화면 가장자리 40×120px 탭(원본 rgba(142,68,173,.6) → #8e44ad). 펼치면 제목 + 썸네일(높이 100px). 데모 썸네일은 자리표시 블록.',
    states: '호버·포커스 동안 펼침. 무대가 400px보다 좁으면 무대 폭 − 48px 까지만 펼친다.',
    motion: { trigger: '호버', change: '탭 width 40→400px, 배경 반투명→불투명', timing: '.4s cubic-bezier(0.7, 0, 0.3, 1) (width · background-color)', inferred: false },
    feel: ['극적', '대칭'],
    fits: ['글 이전/다음', '페이지 넘김'],
    demo: `<div class="C-23">
  <button type="button" class="nav prev"><span class="iw">{{i:chev-l}}</span><span class="pv"><span class="tt"><strong>이전 글</strong>가을 산책 기록</span><span class="th"></span></span></button>
  <button type="button" class="nav next"><span class="iw">{{i:chev-r}}</span><span class="pv"><span class="th"></span><span class="tt"><strong>다음 글</strong>겨울 여행 준비</span></span></button>
</div>`,
    css: `.C-23 { position: absolute; inset: 0; container-type: inline-size; }
.C-23 .nav { position: absolute; top: 50%; width: 40px; height: 120px; padding: 0; font: inherit; color: var(--bg-1); background: color-mix(in srgb, var(--fg-1) 60%, transparent); border: 0; overflow: hidden; cursor: pointer; transform: translateY(-50%); transition: width .4s, background-color .4s; transition-timing-function: cubic-bezier(0.7, 0, 0.3, 1); }
.C-23 .prev { left: 0; }
.C-23 .next { right: 0; }
.C-23 .nav:is(:hover, :focus-visible) { z-index: 1; width: min(400px, 100cqw - 48px); background: var(--fg-1); }
.C-23 .iw { position: absolute; top: 0; bottom: 0; z-index: 1; display: grid; place-items: center; width: 40px; }
.C-23 .prev .iw { left: 0; }
.C-23 .next .iw { right: 0; }
.C-23 .pv { position: absolute; top: 0; display: flex; align-items: center; gap: var(--space-3); width: min(400px, 100cqw - 48px); height: 100%; padding: 10px; }
.C-23 .prev .pv { left: 0; justify-content: flex-end; padding-left: 50px; text-align: right; }
.C-23 .next .pv { right: 0; padding-right: 50px; text-align: left; }
.C-23 .th { flex: none; width: 80px; height: 100px; background: linear-gradient(135deg, color-mix(in srgb, var(--bg-1) 55%, transparent), color-mix(in srgb, var(--bg-1) 15%, transparent)); border-radius: var(--radius-sm); }
.C-23 .tt { display: grid; gap: var(--space-1); min-width: 0; font-size: var(--text-14); line-height: var(--lh-14); white-space: nowrap; }
.C-23 .tt strong { font-size: var(--text-18); line-height: var(--lh-18); font-weight: var(--weight-semibold); }`
  },
  {
    id: 'C-24',
    group: '드로어·미리보기',
    name: '둥근 슬라이드 알약',
    source: 'Codrops ANS — Rounded slide',
    url: 'https://tympanus.net/Development/ArrowNavigationStyles/',
    look: '62px 짙은 원(padding 15px, radius 40px, 원본 #34495e) 안 32px 화살표(원본 #566473). 펼치면 200px(원본) 흰 알약 + 제목 — 데모는 반대쪽 버튼을 덮지 않게 min(200px, 무대 폭 − 110px)로 제한.',
    states: '호버·포커스 동안 유지.',
    motion: { trigger: '호버', change: '원 width 62→200px · 배경 어두움→흰색, 제목 translateX(±100%)→0 + 페이드 인', timing: '.3s (제목은 .1s 지연)', inferred: false },
    feel: ['친근함', '정보 제공'],
    fits: ['블로그 이전/다음', '스테퍼'],
    demo: `<div class="C-24">
  <button type="button" class="nav prev"><span class="iw">{{i:arrow-l}}</span><span class="t">이전 글</span></button>
  <button type="button" class="nav next"><span class="iw">{{i:arrow-r}}</span><span class="t">다음 글</span></button>
</div>`,
    css: `.C-24 { position: absolute; inset: 0; container-type: inline-size; }
.C-24 .nav { position: absolute; top: 50%; width: 62px; height: 62px; padding: 15px; font: inherit; color: var(--fg-3); background: var(--fg-1); border: 0; border-radius: 40px; overflow: hidden; cursor: pointer; transform: translateY(-50%); transition: width .3s, background-color .3s; }
.C-24 .prev { left: 20px; }
.C-24 .next { right: 20px; }
.C-24 .iw { position: absolute; top: 15px; width: 32px; height: 32px; }
.C-24 .prev .iw { left: 15px; }
.C-24 .next .iw { right: 15px; }
.C-24 .iw .ic { display: block; width: 32px; height: 32px; }
.C-24 .t { position: absolute; top: 0; font-size: var(--text-14); line-height: 62px; letter-spacing: 1px; white-space: nowrap; opacity: 0; transition: opacity .3s, transform .3s; }
.C-24 .prev .t { right: 20px; transform: translateX(100%); }
.C-24 .next .t { left: 20px; transform: translateX(-100%); }
.C-24 .nav:is(:hover, :focus-visible) { z-index: 1; width: min(200px, 100cqw - 110px); background: var(--bg-1); }
.C-24 .nav:is(:hover, :focus-visible) .t { opacity: 1; transform: translateX(0); transition-delay: .1s; }`
  },
  {
    id: 'C-25',
    group: '드로어·미리보기',
    name: '슬릿 (순차 공개)',
    source: 'Codrops ANS — Slit (Jam3 참고)',
    url: 'https://tympanus.net/Development/ArrowNavigationStyles/',
    look: '세로로 긴 탭(padding 45px 5px, 원본 #939a9f) 안 화살표. 200px 미리보기 패널 + 아래로 접혀 나오는 캡션(높이 30%, 원본 #34495e). 데모 썸네일은 자리표시 블록.',
    states: '호버·포커스 동안 유지. 떠날 땐 캡션이 먼저 접히고 패널·화살표가 .3s 뒤 돌아온다.',
    motion: { trigger: '호버', change: '0–300ms 화살표 translateX(±100%) 퇴장 → 300–600ms 패널 translateX(∓100%)→0 → 600–900ms 캡션 rotateX(−90°→0) 경첩처럼 내려옴 (perspective 1000px)', timing: '각 .3s. 패널 transition: transform .3s .3s, 캡션 지연 .6s', inferred: false },
    feel: ['안무', '시네마틱'],
    fits: ['갤러리·프로젝트 페이지 넘김'],
    tall: true,
    demo: `<div class="C-25">
  <button type="button" class="nav prev"><span class="iw">{{i:chev-l}}</span><span class="pn"><span class="th"></span><span class="cap">이전 프로젝트</span></span></button>
  <button type="button" class="nav next"><span class="iw">{{i:chev-r}}</span><span class="pn"><span class="th"></span><span class="cap">다음 프로젝트</span></span></button>
</div>`,
    css: `.C-25 { position: absolute; inset: 0; }
.C-25 .nav { position: absolute; top: 50%; padding: 0; font: inherit; color: var(--bg-1); background: none; border: 0; cursor: pointer; transform: translateY(-50%); }
.C-25 .prev { left: 0; }
.C-25 .next { right: 0; }
.C-25 .iw { position: relative; display: block; padding: 45px 5px; background: var(--fg-3); }
.C-25 .iw .ic { display: block; transition: transform .3s .3s; }
.C-25 .nav:is(:hover, :focus-visible) .iw .ic { transition-delay: 0s; }
.C-25 .prev:is(:hover, :focus-visible) .iw .ic { transform: translateX(-100%); }
.C-25 .next:is(:hover, :focus-visible) .iw .ic { transform: translateX(100%); }
.C-25 .pn { position: absolute; top: 0; width: 200px; height: 100%; background: var(--fg-3); perspective: 1000px; transition: transform .3s .3s; }
.C-25 .prev .pn { left: 0; transform: translateX(-100%); }
.C-25 .next .pn { right: 0; transform: translateX(100%); }
.C-25 .nav:is(:hover, :focus-visible) .pn { transform: translateX(0); }
.C-25 .th { position: absolute; inset: 0; background: linear-gradient(135deg, var(--fg-4), var(--fg-2)); }
.C-25 .cap { position: absolute; top: 100%; left: 0; display: flex; align-items: center; width: 100%; height: 30%; padding: 0 20px; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); letter-spacing: 1px; white-space: nowrap; color: var(--bg-1); background: var(--fg-1); backface-visibility: hidden; transform: rotateX(-90deg); transform-origin: 50% 0; transition: transform .3s; }
.C-25 .next .cap { justify-content: flex-end; }
.C-25 .nav:is(:hover, :focus-visible) .cap { transform: rotateX(0deg); transition-delay: .6s; }`
  },
  {
    id: 'C-26',
    group: '드로어·미리보기',
    name: '썸네일 플립',
    source: 'Codrops ANS — Thumb flip (Double flip 변형)',
    url: 'https://tympanus.net/Development/ArrowNavigationStyles/',
    look: '100×100 타일(데모 80×80, 원본 #b1a798) 안 흰 화살표, 옆에 같은 크기 썸네일(자리표시 블록). perspective 1000px, 소실점은 화살표 쪽 끝.',
    states: '호버·포커스 동안 유지.',
    motion: { trigger: '호버', change: '썸네일 rotateY(±90°)→0, 화살표 쪽 모서리가 경첩(origin 0% / 100% 50%). 타일 흰색으로, 화살표는 배경색으로', timing: '.3s (transform · background-color · fill)', inferred: false },
    feel: ['카드 같음', '촉감'],
    fits: ['페이지 넘김', '갤러리 내비'],
    demo: `<div class="C-26">
  <button type="button" class="nav prev" aria-label="이전"><span class="iw">{{i:chev-l}}</span><span class="th"></span></button>
  <button type="button" class="nav next" aria-label="다음"><span class="iw">{{i:chev-r}}</span><span class="th"></span></button>
</div>`,
    css: `.C-26 { position: absolute; inset: 0; }
.C-26 .nav { position: absolute; top: 50%; padding: 0; background: none; border: 0; cursor: pointer; transform: translateY(-50%); perspective: 1000px; }
.C-26 .prev { left: 0; perspective-origin: 100% 50%; }
.C-26 .next { right: 0; perspective-origin: 0% 50%; }
.C-26 .iw { display: grid; place-items: center; width: 80px; height: 80px; color: var(--bg-1); background: var(--fg-3); transition: background-color .3s, color .3s; }
.C-26 .iw .ic { width: 32px; height: 32px; }
.C-26 .th { position: absolute; top: 0; width: 80px; height: 80px; background: linear-gradient(135deg, var(--fg-4), var(--fg-2)); backface-visibility: hidden; transition: transform .3s; }
.C-26 .prev .th { left: 100%; transform: rotateY(90deg); transform-origin: 0% 50%; }
.C-26 .next .th { right: 100%; transform: rotateY(-90deg); transform-origin: 100% 50%; }
.C-26 .nav:is(:hover, :focus-visible) .iw { color: var(--fg-3); background: var(--bg-1); }
.C-26 .nav:is(:hover, :focus-visible) .th { transform: rotateY(0deg); }`
  },
  {
    id: 'C-27',
    group: '드로어·미리보기',
    name: '미리보기 슬라이드 인 (바 / 원)',
    source: 'Codrops ANS — Image bar + Circle slide',
    url: 'https://tympanus.net/Development/ArrowNavigationStyles/',
    look: '왼쪽(이전): 폭 100px(데모 80px)·높이 90% 세로 바, 안에 이미지(자리표시). 오른쪽(다음): 62px 원(padding 19px), 안에 원형 썸네일. 원본 원 배경 #566473.',
    states: '호버·포커스 동안 유지. 데모는 사진 대신 진한 면 위 루프 캐러셀.',
    motion: { trigger: '호버', change: 'Image bar: 화살표 ±10px→0, 이미지 translateX(±100%)→0 · opacity 0→.6, 바 배경 → 흰색 70%. Circle slide: 원 scale .7→1 + 페이드 인, 썸네일 translateX(±100%)→0, 원 배경은 .2s 뒤 투명', timing: '.3s (원 배경 .1s, 지연 .2s)', inferred: false },
    feel: ['가벼움', '정보 제공'],
    fits: ['미리보기 있는 캐러셀 화살표'],
    demo: `<div class="C-27" data-behavior="carousel" data-loop>
  <div class="track" data-track><div class="s">1</div><div class="s">2</div><div class="s">3</div><div class="s">4</div></div>
  <button type="button" class="bar" data-prev aria-label="이전 슬라이드"><span class="img"></span><span class="iw">{{i:chev-l}}</span></button>
  <button type="button" class="circ" data-next aria-label="다음 슬라이드"><span class="disc"><span class="img"></span></span><span class="iw">{{i:chev-r}}</span></button>
</div>`,
    css: `.C-27 { position: absolute; inset: 0; overflow: hidden; background: var(--fg-3); }
.C-27 .track { display: flex; height: 100%; }
.C-27 .s { display: grid; flex: 0 0 100%; place-items: center; font-size: var(--text-48); line-height: var(--lh-48); font-weight: var(--weight-bold); color: color-mix(in srgb, var(--bg-1) 40%, transparent); }
.C-27 button { position: absolute; top: 50%; padding: 0; color: var(--bg-1); border: 0; cursor: pointer; transform: translateY(-50%); }
.C-27 .bar { left: 0; width: 80px; height: 90%; overflow: hidden; background: transparent; transition: background-color .3s; }
.C-27 .bar .iw { position: absolute; inset: 0; z-index: 1; display: grid; place-items: center; transform: translateX(10px); transition: transform .3s, color .3s; }
.C-27 .bar .img { position: absolute; inset: 0; background: linear-gradient(135deg, var(--fg-4), var(--fg-1)); opacity: 0; transform: translateX(100%); transition: opacity .3s, transform .3s; }
.C-27 .bar:is(:hover, :focus-visible) { background: color-mix(in srgb, var(--bg-1) 70%, transparent); }
.C-27 .bar:is(:hover, :focus-visible) .iw { color: var(--fg-1); transform: translateX(0); }
.C-27 .bar:is(:hover, :focus-visible) .img { opacity: .6; transform: translateX(0); }
.C-27 .circ { right: var(--space-5); width: 62px; height: 62px; background: none; border-radius: 50%; }
.C-27 .circ .iw { position: relative; z-index: 1; display: grid; place-items: center; width: 100%; height: 100%; }
.C-27 .disc { position: absolute; inset: 0; overflow: hidden; background-color: var(--fg-1); border-radius: 50%; opacity: 0; transform: scale(.7); transition: transform .3s, opacity .3s, background-color .1s 0s; }
.C-27 .disc .img { position: absolute; inset: 0; background: linear-gradient(135deg, var(--fg-4), var(--fg-1)); border-radius: 50%; transform: translateX(100%); transition: transform .3s; }
.C-27 .circ:is(:hover, :focus-visible) .disc { background-color: transparent; opacity: 1; transform: scale(1); transition: transform .3s, opacity .3s, background-color .1s .2s; }
.C-27 .circ:is(:hover, :focus-visible) .disc .img { transform: translateX(0); }`
  },

  /* ───────────── 커서 반응 ───────────── */
  {
    id: 'C-28',
    group: '커서 반응',
    name: '마그네틱 끌림',
    source: 'Codrops MagneticButtons (demo1)',
    url: 'https://github.com/codrops/MagneticButtons',
    look: '큰 원형 버튼 + 라벨. 원본은 버튼 중심에서 폭×0.7 안에 커서가 들어오면 반응 — 데모는 무대 전체를 끌림 영역으로 쓴다(magnetic 동작).',
    states: '영역 안에서 커서를 따라가고, 떠나면 0으로. 영역에 들어오거나 포커스하면 라벨이 위로 롤, 실제로 호버했다 떠날 때만 아래로 롤(정지 상태에선 움직임 없음).',
    motion: { trigger: '커서 이동 / 영역 진입·이탈', change: '버튼 = (커서 − 중심) × 0.3, 라벨 = 버튼 이동의 −0.6배(반대 방향). 진입: 라벨 y −20% · 투명(150ms Power2.easeIn) → y 100%에서 0으로(200ms Expo.easeOut). 이탈은 y 20% → −100%에서 0으로', timing: 'lerp 0.1/프레임 — 데모는 60fps 기준 지수 곡선을 600ms linear()로 근사. 롤 150ms + 200ms (GSAP 이징의 cubic-bezier 근사)', inferred: false },
    feel: ['쫀득함', '살아있음'],
    fits: ['히어로 CTA', '큰 원형 슬라이더 화살표'],
    demo: `<div class="C-28" data-behavior="magnetic" data-strength="0.3"><button type="button" data-magnet><span class="tx"><span class="ti">다음 {{i:arrow-r}}</span></span></button></div>`,
    css: `.C-28 { position: absolute; inset: 0; display: grid; place-items: center; }
.C-28 button { display: grid; place-items: center; width: var(--space-11); height: var(--space-11); padding: 0; font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: 50%; cursor: pointer; translate: var(--mx, 0px) var(--my, 0px); transition: translate 600ms linear(0, 0.277 8.3%, 0.479 16.7%, 0.627 25%, 0.734 33.3%, 0.812 41.7%, 0.869 50%, 0.911 58.3%, 0.941 66.7%, 0.964 75%, 0.98 83.3%, 0.991 91.7%, 1); }
.C-28 .tx { display: block; overflow: hidden; translate: calc(var(--mx, 0px) * -0.6) calc(var(--my, 0px) * -0.6); transition: translate 600ms linear(0, 0.277 8.3%, 0.479 16.7%, 0.627 25%, 0.734 33.3%, 0.812 41.7%, 0.869 50%, 0.911 58.3%, 0.941 66.7%, 0.964 75%, 0.98 83.3%, 0.991 91.7%, 1); }
.C-28 .ti { display: inline-flex; align-items: center; gap: var(--space-1); }
.C-28 .ic { width: 20px; height: 20px; }
/* 이탈 롤은 magnetic 동작이 포인터를 받은 뒤 버튼에 style(--mx/--my)이 생겨야만 걸린다 → 로드 직후 정지 상태에선 재생 안 됨 */
.C-28 [data-magnet][style] .ti { animation: C-28-out 350ms both; }
.C-28:is(:hover, :focus-within) [data-magnet] .ti { animation: C-28-in 350ms both; }
@keyframes C-28-in {
  0% { transform: translateY(0); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }
  42.857% { transform: translateY(-20%); opacity: 0; animation-timing-function: step-end; }
  42.858% { transform: translateY(100%); opacity: 0; animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
  100% { transform: translateY(0); opacity: 1; }
}
@keyframes C-28-out {
  0% { transform: translateY(0); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); }
  42.857% { transform: translateY(20%); opacity: 0; animation-timing-function: step-end; }
  42.858% { transform: translateY(-100%); opacity: 0; animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1); }
  100% { transform: translateY(0); opacity: 1; }
}`
  },
  {
    id: 'C-29',
    group: '커서 반응',
    name: '방향 감지 채움',
    source: 'Osmo — Directional button hover',
    url: 'https://www.osmo.supply/resource/directional-button-hover',
    look: '외곽선 알약 + 라벨·화살표. 원본 데모엔 화살표가 없다(아무 화살표와 조합).',
    states: '들어온 지점에서 채워지고, 나간 지점 쪽으로 빠진다. 키보드 포커스는 가운데에서 채움.',
    motion: { trigger: '마우스 진입 / 이탈', change: '진입·이탈 지점에 원을 두고 scale 0→1 / 1→0. 지름 = 115% + |가로 오프셋| × 2. 글자색 반전', timing: '원 700ms cubic-bezier(0.625, 0.05, 0, 1), 색 400ms (곡선 미기재라 ease)', inferred: false },
    feel: ['반응성', '촉감'],
    fits: ['슬라이더 화살표', 'CTA'],
    demo: `<div class="C-29" data-behavior="direction"><button type="button" data-dir-target><span class="fill" aria-hidden="true"></span><span class="t">다음 단계 {{i:arrow-r}}</span></button></div>`,
    css: `.C-29 button { position: relative; display: inline-flex; align-items: center; height: calc(var(--space-7) + var(--space-1)); padding: 0 var(--space-6); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-pill); overflow: hidden; isolation: isolate; cursor: pointer; transition: color 400ms ease; }
.C-29 .fill { position: absolute; z-index: -1; top: var(--ey, 50%); left: var(--ex, 50%); width: calc(115% + 2 * max(var(--ex, 50%) - 50%, 50% - var(--ex, 50%))); aspect-ratio: 1; background: var(--fg-1); border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%) scale(0); transition: transform 700ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-29 .t { display: inline-flex; align-items: center; gap: var(--space-2); }
.C-29 .ic { width: 20px; height: 20px; }
.C-29 button:is(.is-in, :focus-visible) { color: var(--bg-1); }
.C-29 button:is(.is-in, :focus-visible) .fill { transform: translate(-50%, -50%) scale(1); }`
  },

  /* ───────────── 등장·이동 ───────────── */
  {
    id: 'C-30',
    group: '등장·이동',
    name: '라벨 비키기 + 화살표 솟음',
    source: 'Uiverse AKAspidey01/ugly-horse-68',
    url: 'https://uiverse.io/AKAspidey01/ugly-horse-68',
    look: '굵은 라벨 + 화살표 아이콘, overflow:hidden 버튼(gap 10px, 원본 rgb(164, 46, 194)).',
    states: '호버·포커스 동안 유지. 평소엔 화살표가 버튼 아래로 숨어 있고 라벨이 가운데.',
    motion: { trigger: '호버', change: '라벨 translateX(15px→0), 화살표 translateY(35px→0) 아래에서 솟아오름', timing: '.3s (ease)', inferred: false },
    feel: ['단정함', '조용함'],
    fits: ['CTA (라벨이 화살표 자리를 비켜 줌)'],
    demo: `<div class="C-30"><button type="button"><span class="t">다음</span><span class="up" aria-hidden="true">{{i:arrow-r}}</span></button></div>`,
    css: `.C-30 button { display: flex; align-items: center; gap: 10px; padding: var(--space-3) 15px; font: inherit; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); overflow: hidden; cursor: pointer; }
.C-30 .t { transform: translateX(15px); transition-duration: .3s; }
.C-30 .up { display: block; transform: translateY(35px); transition-duration: .3s; }
.C-30 .ic { display: block; width: 24px; height: 24px; }
.C-30 button:is(:hover, :focus-visible) .t { transform: translateX(0px); }
.C-30 button:is(:hover, :focus-visible) .up { transform: translateY(0px); }`
  },
  {
    id: 'C-31',
    group: '등장·이동',
    name: '손잡이 이동 (밀어서 시작)',
    source: 'Uiverse xantha01/fresh-earwig-7 · nicm42',
    url: 'https://dev.to/nicm42/a-button-with-an-arrow-that-moves-on-hover-2l07',
    look: '위(xantha01): 200×60 알약, 왼쪽 5px 에 50px 원형 칩(화살표). 아래(nicm42): 텍스트 버튼, 왼쪽 원형 화살표 칩(.25em).',
    states: '호버·포커스 동안 유지. nicm42 는 호버 때 버튼 전체가 칩 색으로 채워짐.',
    motion: { trigger: '호버', change: 'xantha01: 칩 left 5px → calc(100% − 55px), 라벨 패딩 좌 40px ↔ 우 40px 교체. nicm42: 칩 inset-inline-start .25em → calc(100% − 1.75em), 패딩 2em/1em 교체, 배경 채움', timing: 'xantha01 .35s ease / nicm42 250ms ease', inferred: false },
    feel: ['목적이 분명', '밀어서 확인'],
    fits: ['온보딩 다음', 'CTA'],
    demo: `<div class="C-31">
  <button type="button" class="swipe"><span class="knob" aria-hidden="true">{{i:arrow-r}}</span>시작하기</button>
  <button type="button" class="link"><span class="chip" aria-hidden="true">{{i:arrow-r}}</span>다음 단계</button>
</div>`,
    css: `.C-31 { display: grid; justify-items: center; gap: var(--space-4); }
.C-31 .swipe { position: relative; display: flex; justify-content: center; align-items: center; width: 200px; height: 60px; padding: 0 0 0 40px; font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); letter-spacing: 2px; color: var(--fg-3); background: var(--bg-1); border: 1px solid var(--border); border-radius: 60px; cursor: pointer; transition: .35s ease; }
.C-31 .knob { position: absolute; left: 5px; display: grid; place-items: center; width: 50px; height: 50px; color: var(--bg-1); background: var(--fg-1); border-radius: 50%; transition: .35s ease; }
.C-31 .knob .ic { width: 24px; height: 24px; }
.C-31 .swipe:is(:hover, :focus-visible) { padding-left: 0; padding-right: 40px; color: var(--fg-1); }
.C-31 .swipe:is(:hover, :focus-visible) .knob { left: calc(100% - 55px); }
.C-31 .link { position: relative; padding-block: .5em; padding-inline: 2em 1em; font: inherit; font-size: var(--text-18); font-weight: var(--weight-medium); color: var(--fg-1); background: transparent; border: 0; border-radius: .25em; cursor: pointer; transition: padding 250ms ease, background-color 250ms ease, color 250ms ease; }
.C-31 .chip { position: absolute; inset-block-start: 50%; inset-inline-start: .25em; display: grid; place-items: center; width: 1.5em; height: 1.5em; color: var(--bg-1); background: var(--fg-1); border-radius: 50%; transform: translateY(-50%); transition: inset-inline-start 250ms ease; }
.C-31 .chip .ic { width: 1em; height: 1em; }
.C-31 .link:is(:hover, :focus-visible) { padding-inline: 1em 2em; color: var(--bg-1); background: var(--fg-1); }
.C-31 .link:is(:hover, :focus-visible) .chip { inset-inline-start: calc(100% - 1.75em); }`
  },
  {
    id: 'C-32',
    group: '등장·이동',
    name: '페이드 슬라이드 인 화살표',
    source: 'Uiverse vinodjangid07/fresh-tiger-82 · nkhlrjrs/hungry-pig-21',
    url: 'https://uiverse.io/vinodjangid07/fresh-tiger-82',
    look: '위(vinodjangid07): 200×40 버튼 오른쪽 끝 › 화살표(원본 rgb(66, 66, 66)). 아래(nkhlrjrs): 알약 버튼, 호버 때만 나타나는 ↗ 화살표(rotate(−45deg), 원본 #c49ff5 → #6d21f2).',
    states: '위: 호버할 때마다 화살표가 다시 들어옴, 누르면 translate(1px, 1px). 아래: 평소 화살표 숨김(display:none), 호버 때 등장하며 버튼이 왼쪽으로 5px.',
    motion: { trigger: '호버', change: 'vinodjangid07: 화살표 translateX(−10px) · opacity 0 → 제자리. nkhlrjrs: 화살표 translateX(−50px) · opacity .1 → 0 · 1, 버튼 translateX(−5px), 배경색 변화', timing: '.6s ease-out both / nkhlrjrs 화살표 0.4s(ease) · 버튼 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) · 배경 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)', inferred: false },
    feel: ['은근함', '점진적 공개'],
    fits: ['텍스트 링크', '리스트 행'],
    demo: `<div class="C-32">
  <button type="button" class="v1">알림 설정<span class="arw" aria-hidden="true">›</span></button>
  <button type="button" class="v2">상담 예약하기{{i:arrow-r}}</button>
</div>`,
    css: `.C-32 { display: grid; justify-items: center; gap: var(--space-4); }
.C-32 .v1 { position: relative; display: flex; align-items: center; width: 200px; height: 40px; padding: 0 15px; font: inherit; font-size: var(--text-14); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); cursor: pointer; transition-duration: .2s; }
.C-32 .v1 .arw { position: absolute; right: 0; display: flex; align-items: center; justify-content: center; width: 30px; height: 100%; font-size: var(--text-18); }
.C-32 .v1:is(:hover, :focus-visible) { background: var(--fg-2); }
.C-32 .v1:is(:hover, :focus-visible) .arw { animation: C-32-in .6s ease-out both; }
.C-32 .v1:active { transform: translate(1px, 1px); }
.C-32 .v2 { display: inline-flex; align-items: center; gap: var(--space-2); padding: 10px 20px; font: inherit; font-size: var(--text-16); color: var(--bg-1); background: var(--fg-3); border: 0; border-radius: 20px; cursor: pointer; transition: background-color 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); }
.C-32 .v2 .ic { display: none; width: 20px; height: 20px; opacity: 0; transform: translateX(-20px) rotate(-45deg); transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); }
.C-32 .v2:is(:hover, :focus-visible) { background: var(--fg-1); transform: translateX(-5px); }
.C-32 .v2:is(:hover, :focus-visible) .ic { display: inline-block; opacity: 1; animation: C-32-slide 0.4s forwards; }
@keyframes C-32-in { 0% { transform: translateX(-10px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
@keyframes C-32-slide { from { transform: translateX(-50px) rotate(-45deg); opacity: .1; } to { transform: translateX(0) rotate(-45deg); opacity: 1; } }`
  },
  {
    id: 'C-33',
    group: '등장·이동',
    name: '롱 화살표 대기 + 밑줄',
    source: 'Uiverse alexmaracinaru/empty-moose-12',
    url: 'https://uiverse.io/alexmaracinaru/empty-moose-12',
    look: '자간 4px 14px 텍스트 + 30×10 롱 화살표. 밑줄 2px.',
    states: '호버·포커스 동안 유지. 누르면 화살표 scale(.9). 떠날 때 밑줄은 오른쪽으로 빠짐.',
    motion: { trigger: '호버', change: '화살표 translateX(−8px→0), 밑줄 scaleX(0→1) — 기준점이 오른쪽→왼쪽으로 바뀜', timing: '화살표 .3s ease, 밑줄 .25s ease-out', inferred: false },
    feel: ['절제', '에디토리얼'],
    fits: ['"쇼핑하기" 텍스트 CTA'],
    demo: `<div class="C-33"><button type="button"><span class="t">지금 쇼핑하기</span>{{i:c-long}}</button></div>`,
    css: `.C-33 button { display: inline-flex; align-items: center; padding: 0; font: inherit; color: var(--fg-1); background: none; border: 0; cursor: pointer; }
.C-33 .t { position: relative; padding-right: 15px; padding-bottom: 7px; font-size: var(--text-14); letter-spacing: 4px; }
.C-33 .t::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: var(--fg-1); transform: scaleX(0); transform-origin: bottom right; transition: transform .25s ease-out; }
.C-33 .ic { width: 30px; height: 10px; overflow: visible; transform: translateX(-8px); transition: all .3s ease; }
.C-33 button:is(:hover, :focus-visible) .ic { transform: translateX(0); }
.C-33 button:active .ic { transform: scale(.9); }
.C-33 button:is(:hover, :focus-visible) .t::after { transform: scaleX(1); transform-origin: bottom left; }`
  },

  /* ───────────── 누름·클릭 ───────────── */
  {
    id: 'C-34',
    group: '누름·클릭',
    name: '3D 누름 (두툼)',
    source: 'Josh W. Comeau — 3D button (변형: Uiverse Wasim-Rana/lazy-fish-83)',
    url: 'https://www.joshwcomeau.com/animation/3d-button/',
    look: '그림자층 · 모서리(edge)층 · 앞판(front) 3겹 버튼. 원본 앞판 hsl(345deg 100% 47%) — 여기선 흰 앞판 + 검은 모서리. 아래: 원근 기울기 변형(perspective(850px)).',
    states: '호버 때 들림, 누르면 내려감, 떼면 천천히 복귀. 변형은 호버·포커스 때 평평해짐.',
    motion: { trigger: '호버 / 누름', change: '앞판 translateY: 평소 −4px, 호버 −6px, 누름 −2px. 그림자층 2 / 4 / 1px. 변형: rotateX(14deg) rotateY(8deg) rotateZ(−11deg) → 평평', timing: '복귀 600ms cubic-bezier(.3, .7, .4, 1), 호버 250ms cubic-bezier(.3, .7, .4, 1.5) (오버슈트), 누름 34ms, 변형 .4s ease', inferred: false },
    feel: ['촉감', '만족감'],
    fits: ['큰 CTA', '게임 같은 다음'],
    tall: true,
    demo: `<div class="C-34">
  <button type="button" class="push"><span class="sh"></span><span class="ed"></span><span class="fr">다음 {{i:arrow-r}}</span></button>
  <div class="tilt"><button type="button" class="tb">계속하기 {{i:arrow-r}}</button></div>
</div>`,
    css: `.C-34 { display: grid; justify-items: center; gap: var(--space-7); }
.C-34 .push { position: relative; padding: 0; font: inherit; background: transparent; border: 0; cursor: pointer; outline-offset: 4px; }
.C-34 .sh, .C-34 .ed { position: absolute; inset: 0; border-radius: var(--radius-md); }
.C-34 .sh { background: color-mix(in srgb, var(--fg-1) 25%, transparent); transform: translateY(2px); transition: transform 600ms cubic-bezier(.3, .7, .4, 1); }
.C-34 .ed { background: var(--fg-1); }
.C-34 .fr { position: relative; display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-7); font-size: var(--text-18); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 2px solid var(--fg-1); border-radius: var(--radius-md); transform: translateY(-4px); transition: transform 600ms cubic-bezier(.3, .7, .4, 1); }
.C-34 .fr .ic { width: 20px; height: 20px; }
.C-34 .push:is(:hover, :focus-visible) .fr { transform: translateY(-6px); transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5); }
.C-34 .push:is(:hover, :focus-visible) .sh { transform: translateY(4px); transition: transform 250ms cubic-bezier(.3, .7, .4, 1.5); }
.C-34 .push:active .fr { transform: translateY(-2px); transition: transform 34ms; }
.C-34 .push:active .sh { transform: translateY(1px); transition: transform 34ms; }
.C-34 .tilt { padding: 3px; background: var(--fg-2); border-radius: calc(var(--radius-md) + 3px); box-shadow: -4px 4px 0 var(--fg-1), -20px 20px 40px color-mix(in srgb, var(--fg-1) 30%, transparent); transform: perspective(850px) rotateX(14deg) rotateY(8deg) rotateZ(-11deg); transition: all .4s ease; }
.C-34 .tilt:is(:hover, :focus-within) { box-shadow: 0 4px 5px var(--fg-1), 0 20px 40px color-mix(in srgb, var(--fg-1) 30%, transparent); transform: perspective(850px) rotateX(0deg) rotateY(0deg) rotateZ(0deg); }
.C-34 .tb { display: flex; align-items: center; gap: var(--space-2); padding: var(--space-3) var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); cursor: pointer; }
.C-34 .tb .ic { width: 20px; height: 20px; }`
  },
  {
    id: 'C-35',
    group: '누름·클릭',
    name: '클릭 리플',
    source: 'MDC ripple (Material Components Web)',
    url: 'https://github.com/material-components/material-components-web/tree/master/packages/mdc-ripple',
    look: '이전/다음 텍스트 버튼(128×48). 잉크는 글자색, 농도 .12 는 재현값.',
    states: '클릭할 때마다 재생(replay 동작이 누른 위치를 --x/--y 로 넘김). 키보드는 가운데에서.',
    motion: { trigger: '누름(클릭)', change: '누른 지점에서 시작 크기 0.6(큰 변 × 0.6 지름)으로 나타나 가운데로 이동하며 대각선 + 10px 까지 커짐(이 버튼에선 scale 1→1.91), 불투명도 들어옴 → 사라짐', timing: '반지름 225ms cubic-bezier(0.4, 0, 0.2, 1), 불투명도 75ms linear, 사라짐 150ms linear', inferred: false },
    feel: ['확인해 줌', '체계적'],
    fits: ['Material 스타일 이전/다음'],
    demo: `<div class="C-35" data-behavior="replay">
  <button type="button" data-replay>{{i:chev-l}}이전</button>
  <button type="button" data-replay>다음{{i:chev-r}}</button>
</div>`,
    css: `.C-35 { display: flex; gap: var(--space-3); }
.C-35 button { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); width: var(--space-11); height: var(--space-7); padding: 0; font: inherit; font-size: var(--text-16); font-weight: var(--weight-medium); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; cursor: pointer; }
.C-35 .ic { width: 20px; height: 20px; }
.C-35 button::after { content: ""; position: absolute; top: var(--y, 50%); left: var(--x, 50%); width: calc(var(--space-11) * .6); aspect-ratio: 1; background: currentColor; border-radius: 50%; opacity: 0; pointer-events: none; transform: translate(-50%, -50%) scale(1); }
.C-35 button.is-play::after { animation: C-35-grow 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards, C-35-in 75ms linear forwards, C-35-out 150ms linear 225ms forwards; }
@keyframes C-35-grow { to { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.91); } }
@keyframes C-35-in { from { opacity: 0; } to { opacity: .12; } }
@keyframes C-35-out { from { opacity: .12; } to { opacity: 0; } }`
  },
  {
    id: 'C-36',
    group: '누름·클릭',
    name: '구이 스쿼시 + 날아가기',
    source: 'Codrops Creative Gooey Effects — Send',
    url: 'https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/',
    look: '원형 보내기 버튼(데모는 화살표 아이콘). 원본은 goo SVG 필터(feGaussianBlur stdDeviation 10 + feColorMatrix "… 0 0 0 19 -9")로 로딩 점들이 버튼에 엉겨 붙는다 — 데모는 id 금지 규칙 때문에 필터를 뺐다.',
    states: '클릭 → 날아감·스쿼시 → 로딩(원본 3–6초 무작위, 데모 1.5초) → 성공 체크 → 2초 뒤 복귀. 진행 중 재클릭 무시(sequence 동작).',
    motion: { trigger: '클릭', change: '아이콘 x 100 으로 날아감, 버튼 scale .5, 로딩 점 공전(1.1s / 1.4s linear), 성공 아이콘 scale 0.1→1 + opacity 0→1, 버튼 scale 1 로 복귀', timing: '날아감 0.3s Quad.easeIn, 스쿼시 0.6s Back.easeOut, 성공 1.5s Elastic.easeOut(linear()로 샘플링) + opacity 0.5s, 복귀 0.3s Back.easeOut', inferred: false },
    feel: ['액체', '장난스러움'],
    fits: ['제출·다음 CTA + 완료 상태'],
    demo: `<div class="C-36" data-behavior="sequence"><button type="button" class="send" data-steps="is-send:1500,is-done:2000" aria-label="보내기"><span class="dot d1"></span><span class="dot d2"></span><span class="go">{{i:arrow-r}}</span><span class="ok">{{i:check}}</span></button></div>`,
    css: `.C-36 .send { position: relative; display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: 50%; cursor: pointer; }
.C-36 .send > span { grid-area: 1 / 1; }
.C-36 .ic { display: block; width: 28px; height: 28px; }
.C-36 .go { transition: opacity .2s; }
.C-36 .ok { opacity: 0; }
.C-36 .dot { width: 12px; height: 12px; background: var(--fg-1); border-radius: 50%; opacity: 0; }
.C-36 .send.is-send { transform: scale(.5); transition: transform .6s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.C-36 .send.is-send .go { animation: C-36-fly .3s cubic-bezier(0.55, 0.085, 0.68, 0.53) forwards; }
.C-36 .send.is-send .dot { opacity: 1; animation: C-36-orbit 1.1s .1s linear infinite; }
.C-36 .send.is-send .d2 { animation-duration: 1.4s; }
.C-36 .send.is-done { transform: scale(1); transition: transform .3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.C-36 .send.is-done .go { opacity: 0; transition: none; }
.C-36 .send.is-done .ok { animation: C-36-pop 1.5s linear(0, 0.392 3.33%, 0.891 6.67%, 1.25 10%, 1.373 13.33%, 1.296 16.67%, 1.125 20%, 0.966 23.33%, 0.879 26.67%, 0.875 30%, 0.924 33.33%, 0.986 36.67%, 1.031 40%, 1.047 43.33%, 1.037 46.67%, 1.016 50%, 0.996 53.33%, 0.985 56.67%, 0.984 60%, 0.99 63.33%, 0.998 66.67%, 1.004 70%, 1.006 73.33%, 1.005 76.67%, 1.002 80%, 0.999 83.33%, 0.998 86.67%, 0.998 90%, 0.999 93.33%, 1 96.67%, 1) both, C-36-fade .5s both; }
@keyframes C-36-fly { to { transform: translateX(100px); } }
@keyframes C-36-orbit { from { transform: rotate(0deg) translateX(50px); } to { transform: rotate(360deg) translateX(50px); } }
@keyframes C-36-pop { from { transform: scale(.1); } to { transform: scale(1); } }
@keyframes C-36-fade { from { opacity: 0; } to { opacity: 1; } }`
  },
  {
    id: 'C-37',
    group: '누름·클릭',
    name: '누름 축소',
    source: 'Emil Kowalski — 7 practical animation tips',
    url: 'https://emilkowal.ski/ui/7-practical-animation-tips',
    look: '화살표 버튼 3개: scale(.97) (Emil) / .95 / .9 (Uiverse 항목들).',
    states: '누르는 동안만 줄어듦.',
    motion: { trigger: '누름 (:active)', change: 'scale(.97) — Uiverse 는 .95 또는 .9', timing: '100–160ms ease-out (데모 160ms)', inferred: false },
    feel: ['촉감', '즉각 반응'],
    fits: ['모든 화살표 버튼'],
    demo: `<div class="C-37">
  <button type="button" class="s97">.97 {{i:arrow-r}}</button>
  <button type="button" class="s95">.95 {{i:arrow-r}}</button>
  <button type="button" class="s90">.9 {{i:arrow-r}}</button>
</div>`,
    css: `.C-37 { display: flex; gap: var(--space-3); }
.C-37 button { display: inline-flex; align-items: center; gap: var(--space-1); height: var(--space-7); padding: 0 var(--space-3); font: inherit; font-family: var(--font-mono); font-size: var(--text-14); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); cursor: pointer; transition: transform 160ms ease-out; }
.C-37 .ic { width: 20px; height: 20px; }
.C-37 .s97:active { transform: scale(.97); }
.C-37 .s95:active { transform: scale(.95); }
.C-37 .s90:active { transform: scale(.9); }`
  }
]);
