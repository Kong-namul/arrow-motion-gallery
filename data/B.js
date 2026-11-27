/* B — 페이지네이션. 출처: research/B-pagination.md */
ARROW_DATA.add([
  /* ───────── Material 계열 ───────── */
  {
    id: 'B-01', group: 'Material 계열',
    name: 'MUI Pagination (원형 페이지, 처음/끝)',
    source: 'MUI', url: 'https://mui.com/material-ui/react-pagination/',
    look: 'NavigateBefore/Next 셰브론, showFirstButton/showLastButton이면 FirstPage/LastPage(셰브론+바). 아이템 32px(small 26, large 40), border-radius 16(알약), 마진 0 3px, 아이콘 20px. 변형은 text/outlined, shape="rounded". 데모는 폭 때문에 3페이지.',
    states: '호버 action.hover, 선택 action.selected(또는 primary 채움), 비활성 action.disabledOpacity. 포커스 visible은 action.focus 배경(링 없음). 이전/다음은 끝에서 숨기지 않고 비활성. 기본 aria "go to previous page".',
    motion: { trigger: '호버·선택', change: 'color + background-color 전환', timing: '250ms cubic-bezier(0.4,0,0.2,1)', inferred: true },
    feel: ['부드럽다', '둥글다', '표준'], fits: ['일반 앱 목록'],
    demo: `<nav class="B-01" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-first aria-label="첫 페이지">{{i:chev-bar-l}}</button>
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
  <button type="button" data-last aria-label="마지막 페이지">{{i:chev-bar-r}}</button>
</nav>`,
    css: `.B-01 { display: flex; align-items: center; font-size: var(--text-14); color: var(--fg-1); }
.B-01 [data-pages] { display: contents; }
.B-01 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; margin: 0 3px; padding: 0 6px; font: inherit; color: inherit; background: transparent; border: 0; border-radius: 16px; cursor: pointer; transition: background-color 250ms cubic-bezier(.4,0,.2,1), color 250ms cubic-bezier(.4,0,.2,1); }
.B-01 .ic { width: 20px; height: 20px; }
.B-01 button:hover { background: color-mix(in srgb, var(--fg-1) 4%, transparent); }
.B-01 button[aria-current] { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-01 button:focus-visible { outline: 0; background: color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-01 button:disabled { opacity: .38; cursor: default; background: transparent; }`
  },
  {
    id: 'B-02', group: 'Material 계열',
    name: 'MUI TablePagination (행 수 + 범위 + < >)',
    source: 'MUI', url: 'https://mui.com/material-ui/api/table-pagination/',
    look: '"Rows per page:" 셀렉트(10/25/50/100) → "1–10 of 100" → 셰브론 아이콘 버튼. 처음/끝 버튼은 선택. 아이콘 버튼 40px. 푸터는 flex justify-end. 데모는 폭 때문에 라벨을 줄임.',
    states: '이전/다음은 양 끝에서 비활성. aria "Go to next page". count가 −1이면 "more than N" 표기.',
    motion: { trigger: '호버·클릭', change: '아이콘 버튼 배경 + 리플', timing: '250ms easeInOut', inferred: true },
    feel: ['표 푸터', '정돈', '밀도 중간'], fits: ['데이터 테이블 푸터'],
    demo: `<nav class="B-02" aria-label="페이지" data-behavior="pager" data-labels="1–10,11–20,21–30,31–40,41–50" data-start="1">
  <span class="rows">행 수: <b>10</b>{{i:caret-down}}</span>
  <span class="range"><span data-label></span> / 50</span>
  <span class="btns">
    <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
    <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
  </span>
</nav>`,
    css: `.B-02 { display: flex; align-items: center; gap: var(--space-4); font-size: var(--text-14); color: var(--fg-2); }
.B-02 .rows { display: inline-flex; align-items: center; gap: var(--space-1); white-space: nowrap; }
.B-02 .rows b { color: var(--fg-1); font-weight: var(--weight-regular); }
.B-02 .range { color: var(--fg-1); white-space: nowrap; }
.B-02 .btns { display: flex; }
.B-02 button { box-sizing: border-box; display: grid; place-items: center; width: 40px; height: 40px; padding: 0; color: var(--fg-2); background: transparent; border: 0; border-radius: 50%; cursor: pointer; transition: background-color 250ms cubic-bezier(.4,0,.2,1); }
.B-02 .ic { width: 20px; height: 20px; }
.B-02 .rows .ic { width: 16px; height: 16px; }
.B-02 button:hover { background: color-mix(in srgb, var(--fg-1) 4%, transparent); }
.B-02 button:focus-visible { outline: 0; background: color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-02 button:disabled { opacity: .38; cursor: default; background: transparent; }`
  },
  {
    id: 'B-03', group: 'Material 계열',
    name: 'Angular Material mat-paginator (툴바형)',
    source: 'Angular Components', url: 'https://github.com/angular/components/blob/main/src/material/paginator/paginator.html',
    look: '바 높이 56px(밀도에 따라 52/48/40). "Items per page" 셀렉트 84px, 범위 라벨(margin 0 32px 0 24px), SVG 아이콘 28px. 첫 페이지 아이콘은 셰브론+바. 데모는 폭 때문에 셀렉트를 생략.',
    states: '비활성 아이콘은 on-surface 38%. disabledInteractive라 끝에서 비활성이 돼도 포커스를 잃지 않음. 각 버튼 위에 matTooltip. RTL에서 아이콘 180° 회전.',
    motion: { trigger: '클릭', change: '리플이 커졌다 사라짐', timing: '들어옴 225ms / 나감 150ms, cubic-bezier(0,0,0.2,1)', inferred: false },
    feel: ['엔터프라이즈', '밀집', '머티리얼'], fits: ['밀집 테이블'],
    demo: `<nav class="B-03" aria-label="페이지" data-behavior="pager" data-labels="1 – 10,11 – 20,21 – 30,31 – 40,41 – 50" data-start="1">
  <button type="button" data-first aria-label="첫 페이지">{{i:chev-bar-l}}</button>
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <span class="range"><span data-label></span> / 50</span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
  <button type="button" data-last aria-label="마지막 페이지">{{i:chev-bar-r}}</button>
</nav>`,
    css: `.B-03 { display: flex; align-items: center; height: 56px; font-size: var(--text-14); color: var(--fg-2); }
.B-03 .range { margin: 0 var(--space-3); white-space: nowrap; }
.B-03 button { position: relative; overflow: hidden; box-sizing: border-box; display: grid; place-items: center; width: 40px; height: 40px; padding: 0; color: var(--fg-2); background: transparent; border: 0; border-radius: 50%; cursor: pointer; }
.B-03 .ic { position: relative; width: 28px; height: 28px; }
.B-03 button::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: color-mix(in srgb, var(--fg-1) 12%, transparent); opacity: 0; transform: scale(0); transition: transform 150ms cubic-bezier(0,0,.2,1), opacity 150ms cubic-bezier(0,0,.2,1); }
.B-03 button:active::after { opacity: 1; transform: scale(1); transition-duration: 225ms; }
.B-03 button:focus-visible { outline: 0; background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-03 button:disabled { color: color-mix(in srgb, var(--fg-1) 38%, transparent); cursor: default; }`
  },

  /* ───────── 디자인 시스템 ───────── */
  {
    id: 'B-04', group: '디자인 시스템',
    name: 'Ant Design Pagination (네모 셰브론)',
    source: 'Ant Design', url: 'https://ant.design/components/pagination',
    look: 'LeftOutlined/RightOutlined 아이콘. 아이템 32px(SM 24, LG 40), 라운드는 token.borderRadius(6px), 간격 8px(marginXS). 활성 아이템은 흰 배경 + 1px #1677ff 테두리·글자 + 굵은 글씨(원본 색 대신 fg-1). Simple 모드는 prev, 입력칸, "/ N", next.',
    states: '호버 colorBgTextHover, 눌림 colorBgTextActive. 비활성은 colorTextDisabled + not-allowed 커서, 호버해도 투명. 포커스 visible은 genFocusOutline. 이전/다음은 계속 보임.',
    motion: { trigger: '호버', change: 'all 전환(배경·테두리·색)', timing: '0.2s (easing 미지정 → ease)', inferred: true },
    feel: ['각진', '선명', '관리자'], fits: ['어드민 대시보드'],
    demo: `<nav class="B-04" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
</nav>`,
    css: `.B-04 { display: flex; align-items: center; gap: 8px; font-size: var(--text-14); color: var(--fg-1); }
.B-04 [data-pages] { display: contents; }
.B-04 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-1); font: inherit; color: inherit; background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); cursor: pointer; transition: all .2s; }
.B-04 .ic { width: 14px; height: 14px; }
.B-04 button:hover { background: color-mix(in srgb, var(--fg-1) 6%, transparent); }
.B-04 button:active { background: color-mix(in srgb, var(--fg-1) 15%, transparent); }
.B-04 button[aria-current] { background: var(--bg-1); border-color: var(--fg-1); font-weight: var(--weight-semibold); }
.B-04 button:focus-visible { outline: 2px solid color-mix(in srgb, var(--fg-1) 40%, transparent); outline-offset: 1px; }
.B-04 button:disabled { color: color-mix(in srgb, var(--fg-1) 25%, transparent); cursor: not-allowed; background: transparent; }`
  },
  {
    id: 'B-05', group: '디자인 시스템',
    name: 'Ant Design jump-prev/next (말줄임 → «»)',
    source: 'Ant Design', url: 'https://github.com/ant-design/ant-design/blob/master/components/pagination/style/index.ts',
    look: '"•••" 말줄임과 colorPrimary·fontSizeSM 이중 셰브론(DoubleLeft/RightOutlined)이 같은 박스에 겹쳐 있음(item-container position:relative). title 툴팁 "Previous 5 Pages"/"Next 5 Pages". 클릭하면 5페이지 점프(showLessItems면 3). 데모는 폭 때문에 SM 24px 아이템.',
    states: '호버 또는 포커스 visible(&:has(> :focus-visible))이면 아이콘 opacity 1, 말줄임 opacity 0. 비활성은 말줄임을 유지.',
    motion: { trigger: '호버·포커스', change: '말줄임 ↔ 이중 셰브론 크로스페이드 (opacity 0↔1)', timing: '0.2s (all, motionDurationMid · easing ease)', inferred: true },
    feel: ['숨은 기능', '크로스페이드', '파워 유저'], fits: ['긴 페이지 범위'],
    demo: `<nav class="B-05" aria-label="페이지네이션" data-behavior="pager" data-total="10" data-jump="5" data-start="4">
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
  <template data-gap><span class="ell">•••</span><span class="jmp l">{{i:chevs-l}}</span><span class="jmp r">{{i:chevs-r}}</span></template>
</nav>`,
    css: `.B-05 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-05 [data-pages] { display: contents; }
.B-05 button { position: relative; box-sizing: border-box; display: grid; place-items: center; min-width: 24px; height: 24px; padding: 0; font: inherit; color: inherit; background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); cursor: pointer; transition: all .2s; }
.B-05 .ic { width: 12px; height: 12px; }
.B-05 button:hover { background: color-mix(in srgb, var(--fg-1) 6%, transparent); }
.B-05 button[aria-current] { background: var(--bg-1); border-color: var(--fg-1); font-weight: var(--weight-semibold); }
.B-05 button:focus-visible { outline: 2px solid color-mix(in srgb, var(--fg-1) 40%, transparent); outline-offset: 1px; }
.B-05 button:disabled { color: color-mix(in srgb, var(--fg-1) 25%, transparent); cursor: not-allowed; background: transparent; }
.B-05 .pg-gap .ell, .B-05 .pg-gap .jmp { position: absolute; inset: 0; display: grid; place-items: center; transition: opacity .2s; }
.B-05 .pg-gap .ell { letter-spacing: -2px; color: var(--fg-3); opacity: 1; }
.B-05 .pg-gap .jmp { opacity: 0; }
.B-05 .pg-gap[data-jump-by^="-"] .r, .B-05 .pg-gap:not([data-jump-by^="-"]) .l { display: none; }
.B-05 .pg-gap:hover .jmp, .B-05 .pg-gap:focus-visible .jmp { opacity: 1; }
.B-05 .pg-gap:hover .ell, .B-05 .pg-gap:focus-visible .ell { opacity: 0; }`
  },
  {
    id: 'B-06', group: '디자인 시스템',
    name: 'Atlassian Pagination (서브틀 셰브론)',
    source: 'Atlassian', url: 'https://atlassian.design/components/pagination/examples',
    look: '@atlaskit/icon/core/chevron-left·right를 서브틀 Button 안에. 높이 32px, 라운드 6px, 아이콘 전용 패딩 0 2px. 기본 라벨 previous/next/page. 한도를 넘는 페이지는 "…"로 줄임.',
    states: 'index 0과 마지막에서 isDisabled(버튼은 계속 보임). 선택 페이지는 Button의 isSelected 스타일 + aria-current. 비활성 글자 #080F214A, 배경 투명.',
    motion: { trigger: '호버·눌림', change: 'background-color + border-color, box-shadow(살짝 오버슛)', timing: '150ms cubic-bezier(0.4,1,0.6,1) / box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38)', inferred: false },
    feel: ['조용', '서브틀', '오버슛'], fits: ['Jira·Confluence식 조용한 UI'],
    demo: `<nav class="B-06" aria-label="페이지네이션" data-behavior="pager" data-total="5" data-start="1">
  <button type="button" data-prev aria-label="이전">{{i:chev-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음">{{i:chev-r}}</button>
</nav>`,
    css: `.B-06 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-06 [data-pages] { display: contents; }
.B-06 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 2px; font: inherit; color: var(--fg-2); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color 150ms cubic-bezier(.4,1,.6,1), border-color 150ms cubic-bezier(.4,1,.6,1), box-shadow .15s cubic-bezier(.47,.03,.49,1.38); }
.B-06 .ic { width: 16px; height: 16px; }
.B-06 button:hover { background: color-mix(in srgb, var(--fg-1) 6%, transparent); }
.B-06 button:active { background: color-mix(in srgb, var(--fg-1) 12%, transparent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-06 button[aria-current] { color: var(--fg-1); font-weight: var(--weight-semibold); background: color-mix(in srgb, var(--fg-1) 10%, transparent); }
.B-06 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 1px; }
.B-06 button:disabled { color: color-mix(in srgb, var(--fg-1) 29%, transparent); cursor: default; background: transparent; }`
  },
  {
    id: 'B-07', group: '디자인 시스템',
    name: 'Shopify Polaris Pagination (세그먼트 쌍 + 라벨)',
    source: 'Shopify Polaris', url: 'https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react/pagination',
    look: 'ChevronLeftMinor/RightMinor 아이콘 버튼 두 개를 ButtonGroup으로 붙이고 사이(또는 옆)에 라벨. table 타입은 24px 정사각(--p-space-600) + bg-surface-secondary. 가이드: "Don’t rely on arrow icons alone."',
    states: '호버 tertiary-hover, 눌림/포커스 tertiary-active + 안쪽 그림자. hasPrevious/hasNext가 false면 비활성(icon-disabled 채움).',
    motion: { trigger: '호버·눌림', change: '배경색, 눌리면 콘텐츠 translateY(1px)', timing: '75ms cubic-bezier(0.19,0.91,0.38,1) · 비활성은 transition:none', inferred: false },
    feel: ['촘촘', '즉각', '눌림감'], fits: ['커머스 어드민', '번호 없는 "‹ › 페이지 2"'],
    demo: `<nav class="B-07" aria-label="페이지" data-behavior="pager" data-labels="페이지 1,페이지 2,페이지 3,페이지 4,페이지 5" data-start="1">
  <span class="group">
    <button type="button" data-prev aria-label="이전"><span class="c">{{i:chev-l}}</span></button>
    <button type="button" data-next aria-label="다음"><span class="c">{{i:chev-r}}</span></button>
  </span>
  <span class="lab" data-label></span>
</nav>`,
    css: `.B-07 { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-14); color: var(--fg-2); }
.B-07 .group { display: flex; }
.B-07 button { box-sizing: border-box; width: 32px; height: 32px; padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: 0; cursor: pointer; transition: background-color 75ms cubic-bezier(.19,.91,.38,1); }
.B-07 button + button { margin-left: -1px; }
.B-07 button:first-child { border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.B-07 button:last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.B-07 .c { display: grid; place-items: center; transition: transform 75ms cubic-bezier(.19,.91,.38,1); }
.B-07 .ic { width: 16px; height: 16px; }
.B-07 button:hover { background: color-mix(in srgb, var(--fg-1) 6%, var(--bg-1)); }
.B-07 button:active, .B-07 button:focus-visible { outline: 0; background: color-mix(in srgb, var(--fg-1) 10%, var(--bg-1)); box-shadow: inset 0 1px 2px color-mix(in srgb, var(--fg-1) 25%, transparent); }
.B-07 button:active .c { transform: translateY(1px); }
.B-07 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); background: var(--bg-1); box-shadow: none; transition: none; cursor: default; }
.B-07 button:disabled .c { transition: none; transform: none; }`
  },
  {
    id: 'B-08', group: '디자인 시스템',
    name: 'GitHub Primer Pagination (‹ 이전 1 2 … 다음 ›)',
    source: 'GitHub Primer', url: 'https://primer.style/product/components/pagination/',
    look: '1em 셰브론 + 4px 아이콘 간격의 텍스트 링크(원본 accent blue → fg-1). 페이지는 최소 32px, radius medium, 간격 4px. 현재 페이지는 accent-emphasis 채움 + 흰 글자. showPages={narrow:false}면 모바일은 이전/다음만. 데모는 폭 때문에 3페이지.',
    states: '호버/포커스 control-transparent-hover 배경. 끝의 비활성은 보이되 fgColor-disabled + aria-hidden·aria-disabled. 포커스 visible은 2px accent 아웃라인(−2px 오프셋).',
    motion: { trigger: '호버', change: 'background-color', timing: '평상시 0.2s cubic-bezier(0.3,0,0.5,1), 호버 중에는 0.1s (빨리 들어오고 천천히 빠짐)', inferred: false },
    feel: ['텍스트 링크', '비대칭 페이드', '개발자'], fits: ['개발자·콘텐츠 목록'],
    demo: `<nav class="B-08" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}<span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><span>다음</span>{{i:chev-r}}</button>
</nav>`,
    css: `.B-08 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-08 [data-pages] { display: contents; }
.B-08 button { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); min-width: 32px; height: 32px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color .2s cubic-bezier(.3,0,.5,1); }
.B-08 .ic { width: 16px; height: 16px; }
.B-08 button:hover, .B-08 button:focus-visible { background: color-mix(in srgb, var(--fg-1) 8%, transparent); transition-duration: .1s; }
.B-08 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.B-08 button[aria-current] { color: var(--bg-1); background: var(--fg-1); font-weight: var(--weight-semibold); }
.B-08 button:disabled { color: color-mix(in srgb, var(--fg-1) 35%, transparent); background: transparent; cursor: default; }`
  },
  {
    id: 'B-09', group: '디자인 시스템',
    name: 'IBM Carbon Pagination (구분선 캐럿 버튼 바)',
    source: 'IBM Carbon', url: 'https://carbondesignsystem.com/components/pagination/usage/',
    look: '페이지당 항목 셀렉트, 범위 텍스트, 페이지 셀렉트, 정사각 캐럿 버튼. 각 버튼은 바 높이와 같은 폭(xs 24 / sm 32 / md 40 기본 / lg 48), border-inline-start:1px $border-subtle 로 구분. 작은 브레이크포인트에서는 셀렉트가 빠지고 화살표는 남음. 데모는 폭(288px 무대) 때문에 페이지 셀렉트와 "페이지당" 글자를 생략하고 범위 라벨에서 "/ 100"을 뺌.',
    states: '호버 $layer-hover. 비활성(--no-index)은 $icon-disabled 채움 + not-allowed 커서. 포커스 2px solid $focus(−2px 안쪽 오프셋), 구분선 제거.',
    motion: { trigger: '호버·포커스', change: 'background-color + outline', timing: '110ms (duration-fast-02) cubic-bezier(0.2,0,0.38,0.9) productive standard', inferred: false },
    feel: ['엔터프라이즈', '구분선', '각진'], fits: ['엔터프라이즈 데이터 테이블'],
    demo: `<nav class="B-09" aria-label="페이지" data-behavior="pager" data-labels="1–10,11–20,21–30,31–40,41–50" data-start="1">
  <span class="per"><b>10</b>{{i:caret-down}}</span>
  <span class="range" data-label></span>
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
</nav>`,
    css: `.B-09 { display: flex; align-items: center; height: 40px; font-size: var(--text-14); color: var(--fg-2); background: var(--bg-1); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); }
.B-09 .per { display: inline-flex; align-items: center; gap: var(--space-1); padding: 0 var(--space-2) 0 var(--space-3); white-space: nowrap; }
.B-09 .per b { color: var(--fg-1); font-weight: var(--weight-regular); }
.B-09 .range { padding: 0 var(--space-3); white-space: nowrap; border-inline-start: 1px solid var(--border-subtle); }
.B-09 button { box-sizing: border-box; display: grid; place-items: center; width: 40px; height: 40px; padding: 0; color: var(--fg-1); background: transparent; border: 0; border-inline-start: 1px solid var(--border-subtle); cursor: pointer; transition: background-color 110ms cubic-bezier(.2,0,.38,.9), outline 110ms cubic-bezier(.2,0,.38,.9); }
.B-09 .ic { width: 20px; height: 20px; }
.B-09 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-09 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; border-inline-start-color: transparent; }
.B-09 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: not-allowed; background: transparent; }`
  },
  {
    id: 'B-10', group: '디자인 시스템',
    name: 'IBM Carbon Pagination Nav (자라나는 밑줄)',
    source: 'IBM Carbon', url: 'https://github.com/carbon-design-system/carbon/blob/main/packages/styles/scss/components/pagination-nav/_mixins.scss',
    look: '캐럿 방향 버튼($spacing-09, 48px), 페이지 숫자는 body-compact-01. 활성 페이지는 weight 600 + 높이 4px($spacing-02) · 폭 16px($spacing-05)의 밑줄을 가운데에 둠. 데모는 폭 때문에 4페이지.',
    states: '호버 $background-hover. 비활성은 text-secondary 50% + pointer-events:none. loop 옵션을 쓰면 끝에서 비활성 대신 순환. prefers-reduced-motion에서 전환 끔.',
    motion: { trigger: '페이지 활성', change: '밑줄 폭 0 → 16px (가운데에서 퍼짐), 배경·색도 같이', timing: '110ms cubic-bezier(0.2,0,0.38,0.9)', inferred: false },
    feel: ['탭 느낌', '밑줄 성장', '정갈'], fits: ['아티클·갤러리 내비'],
    demo: `<nav class="B-10" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지">{{i:caret-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지">{{i:caret-r}}</button>
</nav>`,
    css: `.B-10 { display: flex; align-items: center; font-size: var(--text-14); color: var(--fg-1); }
.B-10 [data-pages] { display: contents; }
.B-10 button { position: relative; box-sizing: border-box; display: grid; place-items: center; min-width: 40px; height: 48px; padding: 0; font: inherit; color: var(--fg-1); background: transparent; border: 0; cursor: pointer; transition: background-color 110ms cubic-bezier(.2,0,.38,.9), color 110ms cubic-bezier(.2,0,.38,.9); }
.B-10 .ic { width: 16px; height: 16px; }
.B-10 [data-prev], .B-10 [data-next] { min-width: 48px; }
.B-10 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-10 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.B-10 button:disabled { color: color-mix(in srgb, var(--fg-1) 50%, transparent); pointer-events: none; }
.B-10 button[aria-current] { font-weight: var(--weight-semibold); }
.B-10 button[aria-current]::after { content: ''; position: absolute; bottom: 0; left: calc(50% - 8px); width: 16px; height: 4px; background: var(--fg-1); animation: B-10-grow 110ms cubic-bezier(.2,0,.38,.9); }
@keyframes B-10-grow { from { width: 0; left: 50%; } to { width: 16px; left: calc(50% - 8px); } }`
  },
  {
    id: 'B-11', group: '디자인 시스템',
    name: 'Adobe Spectrum explicit (‹ [1] / N 페이지 ›)',
    source: 'Adobe Spectrum CSS', url: 'https://github.com/adobe/spectrum-css/tree/main/components/pagination',
    look: 'ChevronLeft100/Right100 아이콘의 quiet ActionButton(이전은 오른쪽 아이콘을 180° 회전해 재사용), 텍스트 필드, 흐린 색 "of 89 pages". 데모의 필드는 현재 페이지를 보여주는 읽기 전용 칸.',
    states: 'ActionButton 호버/포커스. RTL은 --spectrum-logical-rotation으로 뒤집음.',
    motion: { trigger: '호버·포커스', change: 'border-color + box-shadow', timing: '130ms ease-in-out (--spectrum-animation-duration-100)', inferred: false },
    feel: ['조용', '입력형', '문서 뷰어'], fits: ['뷰어', '긴 문서(번호보다 직접 입력)'],
    demo: `<nav class="B-11" aria-label="페이지" data-behavior="pager" data-labels="1,2,3,4,5" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-r}}</button>
  <span class="field" data-label></span>
  <span class="of">/ 5 페이지</span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
</nav>`,
    css: `.B-11 { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-14); color: var(--fg-1); }
.B-11 .field { box-sizing: border-box; display: grid; place-items: center; min-width: 40px; height: 32px; padding: 0 var(--space-2); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); }
.B-11 .of { color: var(--fg-3); white-space: nowrap; }
.B-11 button { box-sizing: border-box; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; color: var(--fg-1); background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); cursor: pointer; transition: border-color 130ms ease-in-out, box-shadow 130ms ease-in-out; }
.B-11 .ic { width: 16px; height: 16px; }
.B-11 button[data-prev] .ic { transform: rotate(180deg); }
.B-11 button:hover { border-color: var(--border-strong); }
.B-11 button:focus-visible { outline: 0; border-color: var(--fg-1); box-shadow: 0 0 0 1px var(--fg-1); }
.B-11 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: default; border-color: transparent; }`
  },
  {
    id: 'B-12', group: '디자인 시스템',
    name: 'Adobe Spectrum listing (Prev/Next 아웃라인 알약)',
    source: 'Adobe Spectrum CSS', url: 'https://github.com/adobe/spectrum-css/tree/main/components/pagination',
    look: '"Prev"/"Next" 텍스트를 primary outline Button(알약)에 넣고, 사이에 quiet ActionButton 페이지 번호. 데모는 폭 때문에 3페이지.',
    states: 'Spectrum 버튼 상태를 따름(추정).',
    motion: { trigger: '호버·포커스', change: 'border-color + box-shadow', timing: '130ms ease-in-out (같은 토큰에서 추정)', inferred: true },
    feel: ['알약', '텍스트 버튼', '무게감'], fits: ['텍스트 버튼이 셰브론보다 무게가 필요할 때'],
    demo: `<nav class="B-12" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev class="edge">이전</button>
  <span data-pages></span>
  <button type="button" data-next class="edge">다음</button>
</nav>`,
    css: `.B-12 { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-14); color: var(--fg-1); }
.B-12 [data-pages] { display: contents; }
.B-12 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-2); font: inherit; font-weight: var(--weight-semibold); color: var(--fg-1); background: transparent; border: 2px solid transparent; border-radius: var(--radius-pill); cursor: pointer; transition: border-color 130ms ease-in-out, box-shadow 130ms ease-in-out, background-color 130ms ease-in-out; }
.B-12 .edge { border-color: currentColor; padding: 0 14px; }
.B-12 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-12 button[aria-current] { background: color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-12 button:focus-visible { outline: 0; box-shadow: 0 0 0 2px var(--bg-1), 0 0 0 4px var(--fg-1); }
.B-12 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: default; background: transparent; }`
  },
  {
    id: 'B-13', group: '디자인 시스템',
    name: 'Chakra UI v3 compact (‹ 1 / 10 ›)',
    source: 'Chakra UI', url: 'https://chakra-ui.com/docs/components/pagination',
    look: 'ghost sm IconButton(32px) + HiChevronLeft/Right, Pagination.PageText가 "1 of 10"을 표시. format="long"이면 "1 - 5 of 50". 간격 16px. 기본 변형에서는 선택된 페이지 아이템이 ghost에서 outline으로 바뀜.',
    states: '비활성은 layerStyle "disabled"(opacity 약 .5, 추정). focusVisibleRing은 "outside".',
    motion: { trigger: '호버', change: 'transitionProperty "common"(배경·색)', timing: '200ms (duration moderate, easing 기본 추정)', inferred: true },
    feel: ['컴팩트', '카운터형', '모바일'], fits: ['모바일', '카드 푸터'],
    demo: `<nav class="B-13" aria-label="페이지" data-behavior="pager" data-total="10" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <span class="txt" data-label></span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
</nav>`,
    css: `.B-13 { display: flex; align-items: center; gap: var(--space-4); font-size: var(--text-14); color: var(--fg-1); }
.B-13 .txt { min-width: 48px; text-align: center; }
.B-13 button { box-sizing: border-box; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; color: var(--fg-1); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color 200ms, color 200ms; }
.B-13 .ic { width: 20px; height: 20px; }
.B-13 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-13 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.B-13 button:disabled { opacity: .5; cursor: default; background: transparent; }`
  },
  {
    id: 'B-14', group: '디자인 시스템',
    name: 'Mantine Pagination (테두리 사각 + 처음/끝)',
    source: 'Mantine', url: 'https://mantine.dev/core/pagination/',
    look: '흰 바탕에 1px gray-4 테두리 컨트롤. 크기 xs 22 / sm 26 / md 32 / lg 38 / xl 44. withEdges가 처음/끝 추가. layout="responsive"는 컨테이너 쿼리로 "Page X of Y"로 접힘. 데모는 폭 때문에 3페이지.',
    states: '호버 gray-0. 활성은 primary 채움 + 흰 글자(→ fg-1 / bg-1). 비활성 opacity .4 + not-allowed.',
    motion: { trigger: '클릭(눌림)', change: '눌리는 동안 translateY(1px). 색 변화는 즉시(전환 없음)', timing: 'transition 없음 · 눌림 1px', inferred: false },
    feel: ['촉각적', '물리 버튼', '즉각'], fits: ['"물리 버튼" 느낌의 페이지네이션'],
    demo: `<nav class="B-14" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-first aria-label="첫 페이지">{{i:chevs-l}}</button>
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
  <button type="button" data-last aria-label="마지막 페이지">{{i:chevs-r}}</button>
</nav>`,
    css: `.B-14 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-14 [data-pages] { display: contents; }
.B-14 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; }
.B-14 .ic { width: 16px; height: 16px; }
.B-14 button:hover { background: var(--bg-2); }
.B-14 button:active { transform: translateY(1px); }
.B-14 button[aria-current] { color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); }
.B-14 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.B-14 button:disabled { opacity: .4; cursor: not-allowed; transform: none; background: var(--bg-1); }`
  },
  {
    id: 'B-15', group: '디자인 시스템',
    name: 'shadcn/ui (Lucide 셰브론 + 이전/다음 글자)',
    source: 'shadcn/ui', url: 'https://ui.shadcn.com/docs/components/pagination',
    look: '페이지 링크는 ghost size-9(36px). Previous/Next는 h-9, 셰브론 + 글자("hidden sm:block"이라 모바일에선 셰브론만). 말줄임은 MoreHorizontal 아이콘 + sr-only "More pages". 데모는 폭 때문에 3페이지·말줄임 생략.',
    states: '활성 페이지는 outline 변형 + aria-current="page". 호버 bg-accent. 포커스 visible은 3px 링(ring/50). 비활성 opacity 50%. aria "Go to previous page".',
    motion: { trigger: '호버·포커스', change: 'transition-all', timing: '150ms cubic-bezier(0.4,0,0.2,1) (Tailwind 기본, 추정)', inferred: true },
    feel: ['모던', '담백', 'SaaS'], fits: ['Tailwind 기반 SaaS'],
    demo: `<nav class="B-15" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지" class="edge">{{i:chev-l}}<span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지" class="edge"><span>다음</span>{{i:chev-r}}</button>
</nav>`,
    css: `.B-15 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); font-weight: var(--weight-medium); color: var(--fg-1); }
.B-15 [data-pages] { display: contents; }
.B-15 button { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); min-width: 36px; height: 36px; padding: 0; font: inherit; color: var(--fg-1); background: transparent; border: 1px solid transparent; border-radius: var(--radius-md); cursor: pointer; transition: all 150ms cubic-bezier(.4,0,.2,1); }
.B-15 .edge { padding: 0 10px; }
.B-15 .ic { width: 16px; height: 16px; }
.B-15 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-15 button[aria-current] { background: var(--bg-1); border-color: var(--border); box-shadow: var(--shadow-sm); }
.B-15 button:focus-visible { outline: 0; box-shadow: 0 0 0 3px color-mix(in srgb, var(--fg-1) 50%, transparent); }
.B-15 button:disabled { opacity: .5; cursor: default; background: transparent; }`
  },
  {
    id: 'B-16', group: '디자인 시스템',
    name: 'PatternFly compact (요약 위, 컴팩트 아래)',
    source: 'PatternFly', url: 'https://www.patternfly.org/components/pagination/design-guidelines',
    look: '전체 버전은 페이지당 토글, 처음/이전/다음/마지막, "of N" 입력칸. 모바일에서는 위쪽이 눌리지 않는 개수 요약으로 접히고, 아래쪽에는 이전·다음·페이지당만 남음(처음/끝 없음).',
    states: '모바일 하단 바는 sticky + 가운데 정렬.',
    motion: { trigger: '호버', change: '일반 plain 버튼 호버만 (전용 모션 없음, 추정)', timing: '없음 (추정)', inferred: true },
    feel: ['반응형', '요약+컴팩트', '고정 바'], fits: ['반응형 데이터 테이블'],
    demo: `<nav class="B-16" aria-label="페이지" data-behavior="pager" data-labels="1 - 10 / 100,11 - 20 / 100,21 - 30 / 100,31 - 40 / 100,41 - 50 / 100" data-start="1">
  <span class="sum" data-label></span>
  <div class="bar">
    <span class="per">10 / 페이지{{i:caret-down}}</span>
    <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
    <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
  </div>
</nav>`,
    css: `.B-16 { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); font-size: var(--text-14); color: var(--fg-2); }
.B-16 .sum { color: var(--fg-1); }
.B-16 .bar { position: sticky; bottom: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); background: var(--bg-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); }
.B-16 .per { display: inline-flex; align-items: center; gap: var(--space-1); padding: 0 var(--space-2); white-space: nowrap; }
.B-16 .per .ic { width: 16px; height: 16px; }
.B-16 button { box-sizing: border-box; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; color: var(--fg-1); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; }
.B-16 button .ic { width: 20px; height: 20px; }
.B-16 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-16 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 1px; }
.B-16 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: default; background: transparent; }`
  },

  /* ───────── CSS 프레임워크 ───────── */
  {
    id: 'B-17', group: 'CSS 프레임워크',
    name: 'Bootstrap 5.3 (붙은 박스, « » 글리프)',
    source: 'Bootstrap 5.3', url: 'https://getbootstrap.com/docs/5.3/components/pagination/',
    look: '붙어 있는 .page-link 셀(−1px 겹침, 바깥 양끝만 라운드), 패딩 .375rem .75rem. 화살표는 &laquo;/&raquo; 텍스트 글리프 + aria-label "Previous"/"Next". 크기 sm·lg. 데모는 폭 때문에 4페이지.',
    states: '호버 tertiary-bg. 활성은 primary 배경(→ fg-1/bg-1) + aria-current. 비활성은 secondary 색·배경, 문서는 tabindex=-1 또는 span 권장. 포커스는 box-shadow 0 0 0 .25rem(primary 25%) + z-index 3.',
    motion: { trigger: '호버·포커스', change: 'color, background-color, border-color, box-shadow', timing: '.15s ease-in-out', inferred: false },
    feel: ['클래식', '붙은 셀', 'CMS'], fits: ['클래식 웹', 'CMS'],
    demo: `<nav class="B-17" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev aria-label="이전"><span class="g" aria-hidden="true">&laquo;</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음"><span class="g" aria-hidden="true">&raquo;</span></button>
</nav>`,
    css: `.B-17 { display: flex; align-items: center; font-size: var(--text-16); color: var(--fg-1); }
.B-17 [data-pages] { display: contents; }
.B-17 button { position: relative; box-sizing: border-box; display: block; padding: .375rem .75rem; margin-left: -1px; font: inherit; line-height: 1.5; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: 0; cursor: pointer; transition: color .15s ease-in-out, background-color .15s ease-in-out, border-color .15s ease-in-out, box-shadow .15s ease-in-out; }
.B-17 [data-prev] { margin-left: 0; border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.B-17 [data-next] { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.B-17 button:hover { background: color-mix(in srgb, var(--fg-1) 6%, var(--bg-1)); }
.B-17 button[aria-current] { z-index: 3; color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); }
.B-17 button:focus-visible { z-index: 3; outline: 0; box-shadow: 0 0 0 .25rem color-mix(in srgb, var(--fg-1) 25%, transparent); }
.B-17 button:disabled { color: var(--fg-3); background: var(--bg-2); cursor: default; }
/* 광학 보정: « » 글리프 잉크 폭 ≈ .6em, 1/6 ≈ .1em 만큼 가리키는 쪽으로 (span 만 움직여 셀 테두리는 그대로) */
.B-17 .g { display: inline-block; }
.B-17 [data-prev] .g { translate: calc(var(--optical, 1) * -0.1em) 0; }
.B-17 [data-next] .g { translate: calc(var(--optical, 1) * 0.1em) 0; }`
  },
  {
    id: 'B-18', group: 'CSS 프레임워크',
    name: 'Bulma (이전/다음을 양끝으로, 알약 옵션)',
    source: 'Bulma', url: 'https://bulma.io/documentation/components/pagination/',
    look: '태블릿 이상에서 목록은 왼쪽, Previous/Next는 오른쪽. is-centered/is-right로 재배치. 최소 폭은 컨트롤 높이. is-rounded는 9999px 알약. 부드러운 2겹 드롭섀도. 데모는 알약 + 3페이지.',
    states: '호버/포커스는 명도 델타만큼 어둡게. 눌림은 안쪽 그림자. is-disabled는 opacity .5 + 그림자 없음. is-current는 링크색 채움(→ fg-1/bg-1).',
    motion: { trigger: '호버·눌림', change: 'background, border, box-shadow, color', timing: '294ms ($duration, easing 미지정 → ease)', inferred: true },
    feel: ['친근', '알약', '양끝 배치'], fits: ['마케팅·블로그'],
    demo: `<nav class="B-18" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <span data-pages class="list"></span>
  <span class="edges">
    <button type="button" data-prev>이전</button>
    <button type="button" data-next>다음</button>
  </span>
</nav>`,
    css: `.B-18 { display: flex; align-items: center; justify-content: space-between; width: 256px; font-size: var(--text-14); color: var(--fg-1); }
.B-18 .list { display: flex; gap: var(--space-2); }
.B-18 .edges { display: flex; gap: var(--space-2); }
.B-18 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-3); font: inherit; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-pill); box-shadow: var(--shadow-sm); cursor: pointer; transition-property: background-color, border-color, box-shadow, color; transition-duration: 294ms; }
.B-18 .list button { padding: 0; }
.B-18 button:hover { border-color: var(--border-strong); background: color-mix(in srgb, var(--fg-1) 4%, var(--bg-1)); }
.B-18 button:active { box-shadow: inset 0 1px 2px color-mix(in srgb, var(--fg-1) 20%, transparent); }
.B-18 button[aria-current] { color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); }
.B-18 button:focus-visible { outline: 2px solid color-mix(in srgb, var(--fg-1) 40%, transparent); outline-offset: 1px; }
.B-18 button:disabled { opacity: .5; box-shadow: none; cursor: default; }`
  },
  {
    id: 'B-19', group: 'CSS 프레임워크',
    name: 'Flowbite (긴 화살표 이전/다음 + "Showing 1 to 10")',
    source: 'Flowbite', url: 'https://github.com/themesberg/flowbite/blob/main/content/components/pagination.md',
    look: '붙은 셀 w-9/h-9 또는 h-10, rounded-s-base/rounded-e-base. 아이콘 변형은 16px 스트로크 셰브론 m15 19-7-7 7-7(stroke 2, rtl:rotate-180, sr-only "Previous"). prev/next 분리 변형은 줄기 M5 12h14M5 12l4-4 가 있는 긴 화살표 + 텍스트, shadow-xs. 테이블 변형은 굵은 "Showing 1 to 10 of 100 Entries". 데모는 긴 화살표 + 범위 문구 조합.',
    states: '호버 bg-neutral-tertiary + 제목색 글자. 현재 페이지는 fg-brand 글자 + tertiary 배경. 원본은 focus:outline-none으로 아웃라인을 제거하지만, 접근성을 위해 데모에는 2px 포커스 링을 추가함(원본에 없음).',
    motion: { trigger: '호버', change: '배경·글자색이 즉시 바뀜', timing: 'transition 클래스 없음 (즉시)', inferred: false },
    feel: ['Tailwind', '긴 화살표', '즉각'], fits: ['Tailwind 대시보드', '"← 이전 / 다음 →"'],
    demo: `<nav class="B-19" aria-label="페이지" data-behavior="pager" data-labels="1–10,11–20,21–30,31–40,41–50" data-start="1">
  <p class="info">전체 100건 중 <b data-label></b></p>
  <div class="btns">
    <button type="button" data-prev>{{i:arrow-narrow-l}}<span>이전</span></button>
    <button type="button" data-next><span>다음</span>{{i:arrow-narrow-r}}</button>
  </div>
</nav>`,
    css: `.B-19 { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); font-size: var(--text-14); color: var(--fg-2); }
.B-19 .info { margin: 0; }
.B-19 .info b { color: var(--fg-1); font-weight: var(--weight-semibold); }
.B-19 .btns { display: flex; gap: var(--space-2); }
.B-19 button { box-sizing: border-box; display: inline-flex; align-items: center; gap: var(--space-2); height: 40px; padding: 0 var(--space-3); font: inherit; font-weight: var(--weight-medium); color: var(--fg-2); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); cursor: pointer; }
.B-19 .ic { width: 16px; height: 16px; }
.B-19 button:hover { color: var(--fg-1); background: color-mix(in srgb, var(--fg-1) 6%, var(--bg-1)); }
.B-19 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; color: var(--fg-1); }
.B-19 button:disabled { opacity: .5; cursor: default; }`
  },
  {
    id: 'B-20', group: 'CSS 프레임워크',
    name: 'DaisyUI join (« 페이지 22 » + 2열 이전/다음)',
    source: 'DaisyUI', url: 'https://daisyui.com/components/pagination/',
    look: '`join`으로 묶은 `btn join-item`. « / "Page 22" / » 변형과, `grid grid-cols-2` 에 btn-outline "Previous page"/"Next" 두 칸. 크기 btn-xs ~ btn-xl.',
    states: '현재 페이지는 btn-active, 말줄임은 btn-disabled. 포커스 visible 2px solid 아웃라인(오프셋 2).',
    motion: { trigger: '호버·눌림', change: 'color, background, border, shadow, transform. 눌리면 translate: 0 0.5px + 그림자 평평', timing: '0.2s cubic-bezier(0,0,0.2,1)', inferred: false },
    feel: ['장난기', '테마형', '눌림 0.5px'], fits: ['테마 바꾸는 UI', '장난기 있는 서비스'],
    demo: `<nav class="B-20" aria-label="페이지">
  <div class="join" data-behavior="pager" data-labels="페이지 21,페이지 22,페이지 23,페이지 24" data-start="1">
    <button type="button" data-prev aria-label="이전 페이지"><span class="g">&laquo;</span></button>
    <span class="mid" data-label></span>
    <button type="button" data-next aria-label="다음 페이지"><span class="g">&raquo;</span></button>
  </div>
  <div class="two" data-behavior="pager" data-total="4" data-start="1">
    <button type="button" data-prev>이전 페이지</button>
    <button type="button" data-next>다음</button>
  </div>
</nav>`,
    css: `.B-20 { display: flex; flex-direction: column; gap: var(--space-3); width: 256px; font-size: var(--text-14); color: var(--fg-1); }
.B-20 .join { display: flex; justify-content: center; }
.B-20 .two { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); }
.B-20 button, .B-20 .mid { box-sizing: border-box; display: grid; place-items: center; height: 40px; padding: 0 var(--space-4); font: inherit; font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); box-shadow: var(--shadow-sm); }
.B-20 button { cursor: pointer; transition: all .2s cubic-bezier(0,0,.2,1); }
.B-20 .join > * { border-radius: 0; margin-left: -1px; }
.B-20 .join > :first-child { margin-left: 0; border-radius: var(--radius-sm) 0 0 var(--radius-sm); }
.B-20 .join > :last-child { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.B-20 .mid { background: var(--fg-1); color: var(--bg-1); border-color: var(--fg-1); box-shadow: none; }
.B-20 .two button { background: transparent; box-shadow: none; }
.B-20 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, var(--bg-1)); }
.B-20 button:active { translate: 0 .5px; box-shadow: none; }
.B-20 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.B-20 button:disabled { opacity: .4; cursor: default; box-shadow: none; }
/* 광학 보정: « » 글리프 잉크 폭 ≈ .6em, 1/6 ≈ .1em 만큼 가리키는 쪽으로 */
.B-20 .g { display: inline-block; }
.B-20 .join [data-prev] .g { translate: calc(var(--optical, 1) * -0.1em) 0; }
.B-20 .join [data-next] .g { translate: calc(var(--optical, 1) * 0.1em) 0; }`
  },
  {
    id: 'B-21', group: 'CSS 프레임워크',
    name: 'Element Plus (채움 사각, 호버하면 «» 즉시 전환)',
    source: 'Element Plus', url: 'https://element-plus.org/en-US/component/pagination.html',
    look: 'ArrowLeft/ArrowRight 아이콘 또는 prev-text/next-text. 버튼 32×32(small 24, large 40), 라운드 2px, 아이템 간격 16px. `background` 옵션이면 fill-color 채움 사각 + margin 0 4px + primary 채움 활성(→ fg-1/bg-1). layout:"prev, pager, next, jumper, ->, total". 데모는 폭 때문에 small 24px.',
    states: '호버 시 글자가 primary(→ fg-1). 비활성은 placeholder 색 + not-allowed. 포커스 visible은 1px primary 아웃라인(−1px). MoreFilled "…"가 mouseenter/focus에서 DArrowLeft/Right로 바뀜. aria "prevPages".',
    motion: { trigger: '호버·포커스', change: '말줄임 → «» 하드 컷(페이드 없음)', timing: 'transition 없음 (Ant는 0.2s 페이드)', inferred: false },
    feel: ['즉각', '채움 사각', 'Vue 어드민'], fits: ['Vue 관리 도구(스냅한 느낌)'],
    demo: `<nav class="B-21" aria-label="페이지네이션" data-behavior="pager" data-total="10" data-jump="5" data-start="4">
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지">{{i:chev-r}}</button>
  <template data-gap><span class="dots">{{i:dots}}</span><span class="jmp l">{{i:chevs-l}}</span><span class="jmp r">{{i:chevs-r}}</span></template>
</nav>`,
    css: `.B-21 { display: flex; align-items: center; font-size: var(--text-14); color: var(--fg-2); }
.B-21 [data-pages] { display: contents; }
.B-21 button { box-sizing: border-box; display: grid; place-items: center; min-width: 24px; height: 24px; margin: 0 2px; padding: 0 var(--space-1); font: inherit; color: var(--fg-2); background: color-mix(in srgb, var(--fg-1) 6%, transparent); border: 0; border-radius: var(--radius-sm); cursor: pointer; }
.B-21 .ic { width: 12px; height: 12px; }
.B-21 button:hover { color: var(--fg-1); }
.B-21 button[aria-current] { color: var(--bg-1); background: var(--fg-1); font-weight: var(--weight-semibold); }
.B-21 button:focus-visible { outline: 1px solid var(--fg-1); outline-offset: -1px; }
.B-21 button:disabled { color: var(--fg-4); cursor: not-allowed; }
.B-21 .jmp { display: none; }
.B-21 .pg-gap:hover .dots, .B-21 .pg-gap:focus-visible .dots { display: none; }
.B-21 .pg-gap[data-jump-by^="-"]:hover .l, .B-21 .pg-gap[data-jump-by^="-"]:focus-visible .l { display: grid; }
.B-21 .pg-gap:not([data-jump-by^="-"]):hover .r, .B-21 .pg-gap:not([data-jump-by^="-"]):focus-visible .r { display: grid; }`
  },

  /* ───────── 한국·공공 서비스 ───────── */
  {
    id: 'B-22', group: '한국·공공 서비스',
    name: 'KRDS (정부 디자인 시스템, ‹ 이전 … 다음 ›)',
    source: 'KRDS', url: 'https://github.com/KRDS-uiux/krds-uiux/blob/main/resources/scss/component/_pagination.scss',
    look: '텍스트+아이콘 "이전"/"다음". ico_angle 마스크 아이콘을 이전은 90°, 다음은 −90° 회전. 높이 토큰 size-height-6(4rem, 루트 62.5%면 40px, 추정), 라운드 6px, 간격 8px. 정사각 페이지 링크. 현재 페이지는 굵게 + action-secondary-active 채움 + 반전 글자 + sr-only "현재페이지". 말줄임은 아이콘. 데모는 모바일 배치(페이지 줄 위, 이전/다음은 아래 줄).',
    states: '호버/눌림 배경은 action-secondary 토큰. 비활성 이전은 `<span class="disabled">`로 렌더 + 비활성색. 고대비 모드 포함.',
    motion: { trigger: '호버·눌림', change: '배경색', timing: '.4s ease-in-out ($transition-base) — 느리고 부드러움. 모바일 "다음"은 transition: none', inferred: false },
    feel: ['느리고 부드러움', '공공', '큼직'], fits: ['KRDS를 따르는 한국 공공 서비스'],
    demo: `<nav class="B-22" aria-label="페이지네이션" data-behavior="pager" data-total="5" data-start="1">
  <button type="button" data-prev class="edge">{{i:caret-down}}<span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next class="edge nxt"><span>다음</span>{{i:caret-down}}</button>
</nav>`,
    css: `.B-22 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); width: 256px; font-size: var(--text-16); color: var(--fg-1); }
.B-22 [data-pages] { grid-column: 1 / -1; grid-row: 1; display: flex; justify-content: center; gap: var(--space-2); }
.B-22 button { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); min-width: 40px; height: 40px; padding: 0 var(--space-3); font: inherit; color: var(--fg-1); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color .4s ease-in-out; }
.B-22 .edge { border: 1px solid var(--border); }
.B-22 [data-prev] { grid-row: 2; justify-self: start; }
.B-22 [data-next] { grid-row: 2; justify-self: end; transition: none; }
.B-22 .ic { width: 16px; height: 16px; }
.B-22 [data-prev] .ic { transform: rotate(90deg); }
.B-22 [data-next] .ic { transform: rotate(-90deg); }
.B-22 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-22 button:active { background: color-mix(in srgb, var(--fg-1) 14%, transparent); }
.B-22 button[aria-current] { color: var(--bg-1); background: var(--fg-1); font-weight: var(--weight-bold); }
.B-22 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.B-22 button:disabled { color: var(--fg-4); background: transparent; cursor: default; }`
  },
  {
    id: 'B-23', group: '한국·공공 서비스',
    name: 'Naver 검색 (엣지에 박힌 원형 화살표)',
    source: 'Naver 검색', url: 'https://search.naver.com/search.naver?where=web&query=pagination',
    look: 'btn_prev/btn_next는 흰 바탕에 1px #e9e9ec 테두리의 34px 원, 좌우 끝에 absolute 고정. 안에 12×12 스프라이트 화살표(다음은 같은 스프라이트를 scaleX(-1)로 뒤집음). 숫자 버튼 높이 36px, 패딩 0 10px, 마진 0 6px, 회색 #77777a. 현재 페이지는 네이버 초록 #03aa5a + 굵게(색은 재현하지 않고 fg-1). 스크린리더용 "이전"·"페이지" 숨김 글자. 데모는 폭 때문에 3페이지.',
    states: '호버 bg rgba(0,0,0,.05). 첫 페이지에서 prev는 aria-disabled="true"로 보이되 아이콘 opacity .2.',
    motion: { trigger: '호버', change: '배경이 즉시 바뀜', timing: 'transition 없음 (추정)', inferred: true },
    feel: ['엣지 고정', '즉각', '원형'], fits: ['한국 검색·목록 UI', '스프라이트 하나로 양쪽 화살표'],
    demo: `<nav class="B-23" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전" class="btn_prev">{{i:chev-l}}</button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음" class="btn_next">{{i:chev-l}}</button>
</nav>`,
    css: `.B-23 { position: relative; display: flex; align-items: center; justify-content: center; width: 256px; height: 36px; font-size: var(--text-14); color: var(--fg-3); }
.B-23 [data-pages] { display: contents; }
.B-23 .pg { box-sizing: border-box; height: 36px; margin: 0 6px; padding: 0 10px; font: inherit; color: var(--fg-3); background: transparent; border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.B-23 .pg:hover { background: color-mix(in srgb, var(--fg-1) 5%, transparent); }
.B-23 .pg[aria-current] { color: var(--fg-1); font-weight: var(--weight-bold); }
.B-23 .btn_prev, .B-23 .btn_next { position: absolute; top: 1px; box-sizing: border-box; display: grid; place-items: center; width: 34px; height: 34px; padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border-subtle); border-radius: 50%; cursor: pointer; }
.B-23 .btn_prev { left: 0; }
.B-23 .btn_next { right: 0; }
.B-23 .ic { width: 12px; height: 12px; }
.B-23 .btn_next .ic { transform: scaleX(-1); }
.B-23 .btn_prev:hover, .B-23 .btn_next:hover { background: color-mix(in srgb, var(--fg-1) 5%, var(--bg-1)); }
.B-23 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 1px; }
.B-23 button:disabled { cursor: default; }
.B-23 button:disabled .ic { opacity: .2; }`
  },
  {
    id: 'B-24', group: '한국·공공 서비스',
    name: 'GOV.UK pagination (화살표 + 밑줄 Previous/Next)',
    source: 'GOV.UK Design System', url: 'https://design-system.service.gov.uk/components/pagination/',
    look: '15×13 화살표 SVG + 밑줄 "Previous"/"Next" 텍스트, 시각적으로 숨긴 " page". 타깃은 최소 45×45. 블록 변형은 링크를 세로로 쌓고 페이지 제목 같은 부제를 붙임. 데모는 폭 때문에 번호 목록 대신 현재/전체 표시.',
    states: '호버 시 검정 tint-95 배경 + 더 두꺼운 밑줄. 현재 페이지는 링크 파랑 채움 + 흰 글자. 포커스는 GOV.UK 표준 노랑(추정)이고 아이콘이 focus-text 색으로 바뀜(→ fg-1 반전). 첫 페이지에서는 Previous가, 마지막에서는 Next가 표시되지 않음(데모는 자리를 유지하려 visibility:hidden). 한 페이지뿐이면 페이지네이션 자체가 없음.',
    motion: { trigger: '없음', change: '의도적으로 모션 없음', timing: '없음 (설계상)', inferred: false },
    feel: ['접근성 우선', '밑줄', '모션 없음'], fits: ['접근성 최우선 공공 서비스'],
    demo: `<nav class="B-24" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev>{{i:arrow-l}}<span>Previous</span></button>
  <span class="cnt" data-label></span>
  <button type="button" data-next><span>Next</span>{{i:arrow-r}}</button>
</nav>`,
    css: `.B-24 { display: flex; align-items: center; justify-content: space-between; width: 256px; font-size: var(--text-16); color: var(--fg-1); }
.B-24 .cnt { min-width: 45px; min-height: 45px; display: grid; place-items: center; color: var(--bg-1); background: var(--fg-1); }
.B-24 button { box-sizing: border-box; display: inline-flex; align-items: center; gap: var(--space-2); min-width: 45px; min-height: 45px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: transparent; border: 0; cursor: pointer; }
.B-24 button span { text-decoration: underline; text-underline-offset: .1em; }
.B-24 .ic { width: 15px; height: 13px; }
.B-24 button:hover { background: color-mix(in srgb, var(--fg-1) 5%, transparent); }
.B-24 button:hover span { text-decoration-thickness: 3px; }
.B-24 button:focus-visible { outline: 0; color: var(--bg-1); background: var(--fg-1); }
.B-24 button:disabled { visibility: hidden; }`
  },
  {
    id: 'B-25', group: '한국·공공 서비스',
    name: 'USWDS (끝에서 제거, 모바일에선 화살표 숨김)',
    source: 'USWDS', url: 'https://designsystem.digital.gov/components/pagination/',
    look: 'navigate_before/navigate_next 18px 아이콘 + "Previous"/"Next" 라벨. 테두리 있는 페이지 버튼, 타깃 40px(units(5)), 최대 7슬롯, "…" 오버플로 아이템. 데모는 폭 때문에 3페이지·한국어 라벨.',
    states: '첫 페이지에서 Previous는 숨김. 현재 페이지는 채움 배경 + aria-current. 호버 시 글자·테두리가 link-hover 색. aria-label "Previous page", "Page 1", "Last page, page 24".',
    motion: { trigger: '없음', change: '모션 없음', timing: '없음', inferred: false },
    feel: ['정부 양식', '테두리', '모션 없음'], fits: ['정부 폼·검색'],
    demo: `<nav class="B-25" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지">{{i:chev-l}}<span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><span>다음</span>{{i:chev-r}}</button>
</nav>`,
    css: `.B-25 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-25 [data-pages] { display: contents; }
.B-25 button { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); min-width: 40px; height: 40px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; }
.B-25 .ic { width: 18px; height: 18px; }
.B-25 button:hover { color: var(--fg-1); border-color: var(--fg-1); }
.B-25 button[aria-current] { color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); font-weight: var(--weight-bold); }
.B-25 button:focus-visible { outline: 3px solid color-mix(in srgb, var(--fg-1) 50%, transparent); outline-offset: 0; }
.B-25 [data-prev]:disabled { display: none; }
.B-25 [data-next]:disabled { color: var(--fg-4); cursor: default; }`
  },

  /* ───────── 특수형 ───────── */
  {
    id: 'B-26', group: '특수형',
    name: 'Apple HIG 페이지 컨트롤 (점, 양옆 탭 = 이전/다음)',
    source: 'Apple HIG', url: 'https://developer.apple.com/design/human-interface-guidelines/page-controls',
    look: '같은 간격의 작은 점 + 꽉 찬 현재 점. 페이지가 넘치면 가장자리 점이 작아짐. 배경 스타일은 automatic, prominent, minimal(반투명 둥근 사각). 최대 약 10점. 데모는 점을 8px, 투명도 .3로 추정해 재현하고 양옆 투명 영역을 이전/다음 탭 존으로 둠.',
    states: '현재 점의 앞쪽/뒤쪽을 탭하면 이전/다음 페이지. 스크럽(드래그)은 순서대로 이동하고 가장자리를 넘으면 처음/끝으로 점프(데모 미구현).',
    motion: { trigger: '탭', change: '점 투명도 전환 + 애니메이션 스크롤', timing: '.2s ease (시스템 기본 추정). 스크럽 중에는 애니메이션 쓰지 말 것', inferred: true },
    feel: ['보이지 않는 화살표', '점', '모바일'], fits: ['점 + 화살표 하이브리드', '화살표 없이 좌우 탭'],
    demo: `<nav class="B-26" aria-label="페이지" data-behavior="pager" data-total="5" data-start="1">
  <div class="dots">
    <button type="button" data-prev class="zone l" aria-label="이전 페이지"></button>
    <span data-pages></span>
    <button type="button" data-next class="zone r" aria-label="다음 페이지"></button>
  </div>
  <p class="hint">점 양옆을 누르면 이전/다음</p>
</nav>`,
    css: `.B-26 { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); font-size: var(--text-14); color: var(--fg-1); }
.B-26 .dots { display: flex; align-items: center; padding: 0 var(--space-1); background: color-mix(in srgb, var(--fg-1) 12%, transparent); border-radius: var(--radius-pill); }
.B-26 [data-pages] { display: flex; align-items: center; gap: var(--space-2); }
.B-26 .pg { box-sizing: border-box; width: 8px; height: 8px; padding: 0; font-size: 0; background: var(--fg-1); border: 0; border-radius: 50%; opacity: .3; cursor: pointer; transition: opacity .2s ease; }
.B-26 .pg[aria-current] { opacity: 1; }
.B-26 .zone { box-sizing: border-box; width: 24px; height: 28px; padding: 0; background: transparent; border: 0; cursor: pointer; }
.B-26 .zone:focus-visible { outline: 2px solid var(--fg-1); border-radius: var(--radius-pill); }
.B-26 .zone:disabled { cursor: default; }
.B-26 .hint { margin: 0; color: var(--fg-3); }`
  },
  {
    id: 'B-27', group: '특수형',
    name: 'Google 검색 "Goooogle" (o가 페이지 번호)',
    source: '9to5Google · MacRumors', url: 'https://9to5google.com/2024/06/25/google-search-continuous-scroll/',
    look: '로고의 o들이 페이지 번호 역할을 하고 "Next" 링크가 붙음. 데스크톱은 2024-06-25에 바가 돌아옴. 모바일은 연속 스크롤 뒤 "More results" 버튼을 썼고 "앞으로 몇 달 안에" 연속 스크롤을 접는다고 함. 각 o 링크 아래에 페이지 번호. 데모는 로고 글자 대신 일반 글꼴로 재현(브랜드 색·로고 제외). 참고 출처: https://www.macrumors.com/2024/06/26/google-scraps-continuous-scrolling-search-results/',
    states: 'o마다 페이지 번호 링크 하나. 현재 페이지 o는 굵게.',
    motion: { trigger: '클릭', change: '전체 페이지 로드(모션 없음)', timing: '없음', inferred: false },
    feel: ['워드마크', '재치', '모션 없음'], fits: ['브랜드 워드마크 페이지네이션', '"더 보기" vs 페이지 화살표 비교 사례'],
    demo: `<nav class="B-27" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <span class="logo">G</span>
  <span data-pages></span>
  <span class="logo">gle</span>
  <button type="button" data-next class="nx">Next</button>
</nav>`,
    css: `.B-27 { display: flex; align-items: flex-start; flex-wrap: wrap; justify-content: center; width: 256px; font-size: var(--text-14); color: var(--fg-1); }
.B-27 .logo { font-size: var(--text-32); line-height: 1; font-weight: var(--weight-bold); color: var(--fg-1); }
.B-27 [data-pages] { display: flex; }
.B-27 .pg { box-sizing: border-box; display: flex; flex-direction: column; align-items: center; padding: 0; font: inherit; color: var(--fg-3); background: transparent; border: 0; cursor: pointer; }
.B-27 .pg::before { content: 'o'; font-size: var(--text-32); line-height: 1; font-weight: var(--weight-bold); color: var(--fg-1); }
.B-27 .pg[aria-current] { color: var(--fg-1); font-weight: var(--weight-bold); }
.B-27 .pg:hover { text-decoration: underline; }
.B-27 .nx { flex-basis: 100%; margin-top: var(--space-3); padding: 0; font: inherit; color: var(--fg-1); background: transparent; border: 0; text-decoration: underline; cursor: pointer; }
.B-27 .nx:disabled { color: var(--fg-4); cursor: default; text-decoration: none; }
.B-27 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }`
  }
]);
