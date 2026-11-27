/* F — 아이콘 글리프. 출처: research/C-micro-interactions.md ("Arrow glyph families by icon library")
 * 글리프는 모두 직접 그린 단순 24×24 path (라이브러리 원본 SVG 복사 아님). 이름은 각 저장소 파일 트리 기준, 오른쪽 방향만 확인됨.
 * 카드 공통: 위 = 이전/다음 쌍(호버 때 가리키는 방향으로 3px), 아래 = 같은 계열 변형. 모션 수치는 출처에 없어 재현값(추정). */
(function () {
  'use strict';
  var S = ARROW_DATA.svg;
  ARROW_DATA.addIcons({
    'f-chev-circle-r': S('<circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.17 0)"><path d="M10.5 8l4 4-4 4"/></g>'),
    'f-chev-square-r': S('<rect x="3" y="3" width="18" height="18" rx="3"/><g class="opt" transform="translate(0.17 0)"><path d="M10.5 8l4 4-4 4"/></g>'),
    'f-chev-compact-r': S('<path d="M10 4l3.5 8-3.5 8"/>', 0.83),
    'f-chevs-circle-r': S('<circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.79 0)"><path d="M8 8.5l3.5 3.5L8 15.5"/><path d="M12.5 8.5l3.5 3.5-3.5 3.5"/></g>'),
    'f-caret-dbl-r': S('<path d="M5 6v12l7-6z" fill="currentColor"/><path d="M13 6v12l7-6z" fill="currentColor"/>', 1.07),
    'f-caret-o-r': S('<path d="M9 6v12l8-6z"/>', 0.33),
    'f-caret-circle-r': S('<circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.17 0)"><path d="M10 8v8l5.5-4z" fill="currentColor"/></g>'),
    'f-caret-line-r': S('<path d="M7 6v12l8-6z" fill="currentColor"/><path d="M18 6v12"/>'),
    'f-arrow-small-r': S('<path d="M7 12h10"/><path d="M13 8l4 4-4 4"/>'),
    'f-move-r': S('<path d="M3 12h18"/><path d="M18 9l3 3-3 3"/>'),
    'f-arrow-long-thin-r': S('<path d="M2 12h20" stroke-width="1.25"/><path d="M17 7l5 5-5 5" stroke-width="1.25"/>'),
    'f-arrow-narrow-dash-r': S('<path d="M5 12h2"/><path d="M10 12h2"/><path d="M15 12h4"/><path d="M15 8l4 4-4 4"/>'),
    'f-fat-o-r': S('<path d="M4 9h8V5l8 7-8 7v-4H4z"/>', 0.94),
    'f-fat-dash-r': S('<path d="M9 9h4V5l7 7-7 7v-4H9z"/><path d="M4 9v6"/>'),
    'f-fat-line-r': S('<path d="M2 9h8V5l8 7-8 7v-4H2z"/><path d="M22 5v14"/>'),
    'f-square-arrow-r': S('<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8"/><path d="M12 8l4 4-4 4"/>'),
    'f-arrow-bar-l': S('<path d="M4 5v14"/><path d="M20 12H8"/><path d="M13 7l-5 5 5 5"/>'),
    'f-arrow-bar-r': S('<path d="M20 5v14"/><path d="M4 12h12"/><path d="M11 7l5 5-5 5"/>'),
    'f-arrow-from-bar-r': S('<path d="M4 5v14"/><path d="M8 12h12"/><path d="M15 7l5 5-5 5"/>'),
    'f-skip-r': S('<path d="M6 6v12l9-6z" fill="currentColor"/><path d="M18 6v12"/>'),
    'f-uturn-l': S('<path d="M4 9h11a5 5 0 0 1 0 10h-3"/><path d="M8 5L4 9l4 4"/>'),
    'f-uturn-r': S('<path d="M20 9H9a5 5 0 0 0 0 10h3"/><path d="M16 5l4 4-4 4"/>'),
    'f-elbow-r': S('<path d="M5 19v-6a4 4 0 0 1 4-4h11"/><path d="M16 5l4 4-4 4"/>'),
    'f-arc-r': S('<path d="M4 16a8 8 0 0 1 14.5-4.5"/><path d="M19 6v6h-6"/>')
  });

  /* 카드 공통 데모 CSS — 카드 번호로 범위 지정 */
  function css(id) {
    var r = '.' + id;
    return [
      r + ' { display: grid; justify-items: center; gap: var(--space-4); }',
      r + ' .pair { display: flex; gap: var(--space-3); }',
      r + ' .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }',
      r + ' .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }',
      r + ' .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }',
      r + ' .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }',
      r + ' .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }',
      r + ' .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }',
      r + ' .vars .ic { width: 24px; height: 24px; }'
    ].join('\n');
  }
  function demo(id, l, r, vars, labels) {
    var lb = labels || ['이전', '다음'];
    return '<div class="' + id + '">\n' +
      '  <div class="pair"><button type="button" class="l" aria-label="' + lb[0] + '">{{i:' + l + '}}</button><button type="button" class="r" aria-label="' + lb[1] + '">{{i:' + r + '}}</button></div>\n' +
      (vars.length ? '  <div class="vars" aria-hidden="true">' + vars.map(function (k) { return '{{i:' + k + '}}'; }).join('') + '</div>\n' : '') +
      '</div>';
  }
  var M = { trigger: '호버', change: '아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기)', timing: '200ms ease-out', inferred: true };
  var STATES = '호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다.';

  ARROW_DATA.add([
    /* ───────────── 셰브론·캐럿 ───────────── */
    {
      id: 'F-01',
      group: '셰브론·캐럿',
      name: '셰브론',
      source: 'Lucide · Heroicons · Tabler · Iconoir · Remix',
      url: 'https://github.com/lucide-icons/lucide/tree/main/icons',
      look: 'Lucide chevron-right, Heroicons chevron-right, Tabler chevron-right, Iconoir nav-arrow-right, Remix arrow-right-s, Material Symbols chevron_right(이름은 리서치에서 미확인). 아래 변형: Lucide circle-chevron-right · square-chevron-right.',
      states: STATES,
      motion: M,
      feel: ['기본', '중립'],
      fits: ['캐러셀', '페이지네이션', '리스트 행'],
      demo: demo('F-01', 'chev-l', 'chev-r', ['f-chev-circle-r', 'f-chev-square-r']),
      css: css('F-01')
    },
    {
      id: 'F-02',
      group: '셰브론·캐럿',
      name: '얇은·컴팩트 셰브론',
      source: 'Tabler',
      url: 'https://github.com/tabler/tabler-icons/tree/main/icons/outline',
      look: '1.25px 얇고 긴 셰브론(슬라이더 기본 화살표 같은 꺾쇠). 아래 변형: Tabler chevron-compact-right(좁고 긴 꺾쇠).',
      states: STATES,
      motion: M,
      feel: ['가벼움', '에디토리얼'],
      fits: ['풀스크린 슬라이더', '라이트박스'],
      demo: demo('F-02', 'chev-thin-l', 'chev-thin-r', ['f-chev-compact-r']),
      css: css('F-02')
    },
    {
      id: 'F-03',
      group: '셰브론·캐럿',
      name: '이중 셰브론',
      source: 'Heroicons · Lucide · Tabler · Iconoir · Remix · Phosphor',
      url: 'https://github.com/tailwindlabs/heroicons/tree/master/optimized/24/outline',
      look: 'Heroicons chevron-double-right, Lucide chevrons-right, Tabler chevrons-right, Iconoir fast-arrow-right, Remix arrow-right-double. 아래 변형: 이중 캐럿(Phosphor caret-double-right 계열 — 실제 모양은 리서치에서 미확인) · Lucide circle-chevrons-right.',
      states: STATES,
      motion: M,
      feel: ['빠름', '건너뜀'],
      fits: ['처음/끝 페이지 («»)', '빨리 감기'],
      demo: demo('F-03', 'chevs-l', 'chevs-r', ['f-caret-dbl-r', 'f-chevs-circle-r'], ['처음', '끝']),
      css: css('F-03')
    },
    {
      id: 'F-04',
      group: '셰브론·캐럿',
      name: '캐럿 (채움 삼각형)',
      source: 'Phosphor · Tabler · Remix',
      url: 'https://github.com/phosphor-icons/core/tree/main/assets/regular',
      look: '그림은 채운 삼각형 캐럿. 같은 이름 계열: Phosphor caret-right, Tabler caret-right, Remix arrow-drop-right (리서치는 이름만 확인, 채움 여부는 미확인). 아래 변형: 윤곽 캐럿 · Phosphor caret-circle-right · caret-line-right 계열.',
      states: STATES,
      motion: M,
      feel: ['작고 단단함', '기능적'],
      fits: ['트리 펼침', '작은 페이지네이션', '미디어 재생'],
      demo: demo('F-04', 'caret-l', 'caret-r', ['f-caret-o-r', 'f-caret-circle-r', 'f-caret-line-r']),
      css: css('F-04')
    },

    /* ───────────── 화살표 ───────────── */
    {
      id: 'F-05',
      group: '화살표',
      name: '화살표 (기본)',
      source: 'Lucide · Heroicons · Phosphor · Tabler · Iconoir · Remix',
      url: 'https://github.com/lucide-icons/lucide/tree/main/icons',
      look: 'Lucide arrow-right, Heroicons arrow-right, Phosphor arrow-right, Tabler arrow-right, Iconoir arrow-right, Remix arrow-right · arrow-right-wide, Material Symbols arrow_forward(이름은 리서치에서 미확인). 아래 변형: Heroicons arrow-small-right · Lucide move-right.',
      states: STATES,
      motion: M,
      feel: ['직설적', '행동 유도'],
      fits: ['CTA', '다음 단계', '링크'],
      demo: demo('F-05', 'arrow-l', 'arrow-r', ['f-arrow-small-r', 'f-move-r']),
      css: css('F-05')
    },
    {
      id: 'F-06',
      group: '화살표',
      name: '롱 화살표',
      source: 'Heroicons · Iconoir · Remix',
      url: 'https://github.com/tailwindlabs/heroicons/tree/master/optimized/24/outline',
      look: 'Heroicons arrow-long-right, Iconoir long-arrow-*, Remix arrow-right-long. 24px 박스를 가로로 꽉 채우는 화살대. 아래 변형: 1.25px 가는 선.',
      states: STATES,
      motion: M,
      feel: ['여유', '에디토리얼'],
      fits: ['텍스트 CTA', '슬라이더 하단 내비'],
      demo: demo('F-06', 'arrow-long-l', 'arrow-long-r', ['f-arrow-long-thin-r']),
      css: css('F-06')
    },
    {
      id: 'F-07',
      group: '화살표',
      name: '내로우 화살표',
      source: 'Tabler · itshover',
      url: 'https://github.com/tabler/tabler-icons/tree/main/icons/outline',
      look: 'Tabler arrow-narrow-right(작은 화살촉 + 긴 화살대), itshover arrow-narrow-right(-dashed). 아래 변형: 점선 화살대.',
      states: STATES,
      motion: M,
      feel: ['날렵함', '가벼움'],
      fits: ['인라인 링크', '카드 "더 보기"'],
      demo: demo('F-07', 'arrow-narrow-l', 'arrow-narrow-r', ['f-arrow-narrow-dash-r']),
      css: css('F-07')
    },
    {
      id: 'F-08',
      group: '화살표',
      name: '팻 화살표',
      source: 'Phosphor · Lucide · Tabler',
      url: 'https://github.com/phosphor-icons/core/tree/main/assets/regular',
      look: 'Phosphor arrow-fat-right · arrow-fat-line(s)-right, Lucide arrow-big-right(-dash), Tabler arrow-big-right. 위: 채운 팻 화살표. 아래 변형: 윤곽 · 꼬리 대시 · 끝 선.',
      states: STATES,
      motion: M,
      feel: ['묵직함', '장난스러움'],
      fits: ['게임·어린이 UI', '건너뛰기', '큰 터치 대상'],
      demo: demo('F-08', 'arrow-fat-l', 'arrow-fat-r', ['f-fat-o-r', 'f-fat-dash-r', 'f-fat-line-r']),
      css: css('F-08')
    },

    /* ───────────── 틀·끝·꺾임 ───────────── */
    {
      id: 'F-09',
      group: '틀·끝·꺾임',
      name: '원형·사각 틀',
      source: 'Lucide · Heroicons · Phosphor · Tabler · Iconoir · Remix',
      url: 'https://github.com/lucide-icons/lucide/tree/main/icons',
      look: 'Lucide circle-arrow-right · circle-chevron(s)-right · square-arrow-right(-enter/exit) · square-chevron(s)-right, Heroicons arrow-right-circle, Phosphor arrow-circle-right · arrow-square-right, Tabler circle-arrow/chevron/caret-right · square(-rounded)-arrow/chevron-right, Iconoir arrow-right-circle, Remix arrow-right-circle · arrow-right-box. 아래 변형: 사각 화살표 · 원 셰브론 · 원 캐럿.',
      states: STATES,
      motion: M,
      feel: ['완결됨', '버튼 같음'],
      fits: ['배경 없는 버튼 대용', '자동재생 진행 링 (C-20)'],
      demo: demo('F-09', 'arrow-circle-l', 'arrow-circle-r', ['f-square-arrow-r', 'f-chev-circle-r', 'f-caret-circle-r']),
      css: css('F-09')
    },
    {
      id: 'F-10',
      group: '틀·끝·꺾임',
      name: '바 (끝으로)',
      source: 'Tabler · Lucide · Phosphor · Remix',
      url: 'https://github.com/tabler/tabler-icons/tree/main/icons/outline',
      look: 'Tabler arrow-bar-right · arrow-bar-to-right, Lucide arrow-right-to-line / arrow-right-from-line, Phosphor arrow-line-right · caret-line-right, Remix skip-right. 위: 선까지 가는 화살표. 아래 변형: 셰브론 + 바 · 선에서 나오는 화살표 · 스킵.',
      states: STATES,
      motion: M,
      feel: ['끝을 암시', '명확함'],
      fits: ['처음/끝으로', '패널 접기/펼치기', '미디어 건너뛰기'],
      demo: demo('F-10', 'f-arrow-bar-l', 'f-arrow-bar-r', ['chev-bar-r', 'f-arrow-from-bar-r', 'f-skip-r'], ['처음으로', '끝으로']),
      css: css('F-10')
    },
    {
      id: 'F-11',
      group: '틀·끝·꺾임',
      name: '꺾임·유턴',
      source: 'Heroicons · Phosphor · Tabler · Iconoir',
      url: 'https://github.com/phosphor-icons/core/tree/main/assets/regular',
      look: 'Heroicons arrow-uturn-right · arrow-turn-*, Phosphor arrow-arc-right · arrow-bend-* · arrow-elbow-* · arrow-u-*, Tabler arrow-curve · bear · ramp · loop-right, Iconoir u-turn-arrow-right. 위: 유턴 쌍(되돌리기/다시 실행). 아래 변형: 엘보 · 호.',
      states: STATES,
      motion: M,
      feel: ['되돌림', '경로'],
      fits: ['되돌리기/다시 실행', '답장·전달', '길 안내'],
      demo: demo('F-11', 'f-uturn-l', 'f-uturn-r', ['f-elbow-r', 'f-arc-r'], ['되돌리기', '다시 실행']),
      css: css('F-11')
    },

    /* ───────────── 애니메이티드 ───────────── */
    {
      id: 'F-12',
      group: '애니메이티드 세트',
      name: '애니메이티드 아이콘 세트',
      source: 'lucide-animated · itshover · useAnimations · Lordicon · LottieFiles',
      url: 'https://lucide-animated.com',
      look: 'lucide-animated(Motion, shadcn 설치), itshover(Motion: arrow-narrow-right(-dashed), arrow-big-right(-dash), arrow-back — github.com/Nani-LM10/itshover), useAnimations(Lottie: arrowLeft/Right/Up/Down + Circle·대각선), Lordicon 225-arrow-long-right(상태 in-reveal · hover-pinch · hover-slide · loop-cycle), LottieFiles 무료 루프 "arrow right"(0.95KB dotLottie). 데모: Lordicon 상태 이름별 4종을 CSS 로 재현.',
      states: '그리기·핀치·슬라이드는 호버·포커스 때 한 번, 순환은 계속 반복.',
      motion: { trigger: '호버 / 상시', change: '그리기(in-reveal): 획이 그려짐 · 핀치(hover-pinch): 가로로 눌렸다 폄 · 슬라이드(hover-slide): 오른쪽으로 나가 왼쪽에서 들어옴 · 순환(loop-cycle): 슬라이드를 계속 반복', timing: '400–600ms, 순환 1.6s infinite (Lordicon 페이지에 수치 없음)', inferred: true },
      feel: ['살아있음', '브랜드감'],
      fits: ['아이콘 세트 고를 때 참고', '마케팅 페이지'],
      demo: `<div class="F-12">
  <button type="button" class="a-draw">{{i:arrow-r}}<span>그리기</span></button>
  <button type="button" class="a-pinch">{{i:arrow-r}}<span>핀치</span></button>
  <button type="button" class="a-slide">{{i:arrow-r}}<span>슬라이드</span></button>
  <button type="button" class="a-loop">{{i:arrow-r}}<span>순환</span></button>
</div>`,
      css: `.F-12 { display: grid; grid-template-columns: repeat(4, auto); gap: var(--space-2); }
.F-12 button { display: grid; justify-items: center; gap: var(--space-1); width: var(--space-8); padding: var(--space-3) 0 var(--space-2); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-2); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; }
.F-12 .ic { width: 32px; height: 32px; color: var(--fg-1); }
.F-12 .a-draw :is(.shaft, .head) { stroke-dasharray: 20; stroke-dashoffset: 0; }
.F-12 .a-draw:is(:hover, :focus-visible) :is(.shaft, .head) { animation: F-12-draw 600ms ease-out; }
.F-12 .a-pinch:is(:hover, :focus-visible) .ic { animation: F-12-pinch 400ms ease-in-out; }
.F-12 .a-slide:is(:hover, :focus-visible) :is(.shaft, .head) { animation: F-12-slide 600ms; }
.F-12 .a-loop :is(.shaft, .head) { animation: F-12-slide 1.6s infinite; }
@keyframes F-12-draw { from { stroke-dashoffset: 20; } to { stroke-dashoffset: 0; } }
@keyframes F-12-pinch { 50% { transform: scale(.8, 1.15); } }
@keyframes F-12-slide {
  0% { transform: translateX(0); animation-timing-function: ease-in; }
  45% { transform: translateX(24px); animation-timing-function: step-end; }
  46% { transform: translateX(-24px); animation-timing-function: ease-out; }
  100% { transform: translateX(0); }
}`
    }
  ]);
})();
