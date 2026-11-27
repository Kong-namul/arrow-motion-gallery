/* 모션 세트 매트릭스 — 2축: 호버 스타일(STYLES H1~H6, .hs-* 클래스로 범위) × 타이밍 세트(SETS S1~S4, --m-* 변수 묶음).
 * 버튼 종류(T01~T15)·BASE·STYLES 는 --m-* 변수와 DS 토큰만 쓴다. 근거: research/S-motion-sets.md, G 카탈로그.
 * CSS 순서: 타이밍 변수 → BASE → 스타일 → TYPES. 타이밍을 바꾸면 어느 스타일이든 같은 속도감으로 바뀐다. */
window.ARROW_SETS = (function () {
  'use strict';
  var SPRING_FAST = 'linear(0, 0.099 5%, 0.317 10%, 0.561 15%, 0.775 20%, 0.934 25%, 1.034 30%, 1.083 35%, 1.095 40%, 1.084 45%, 1.063 50%, 1.04 55%, 1.02 60%, 1.005 65%, 0.996 70%, 0.992 75%, 0.991 80%, 0.992 85%, 0.994 90%, 0.996 95%, 1)';
  var SPRING_DEFAULT = 'linear(0, 0.062 5%, 0.199 10%, 0.363 15%, 0.521 20%, 0.66 25%, 0.772 30%, 0.858 35%, 0.919 40%, 0.961 45%, 0.988 50%, 1.004 55%, 1.012 60%, 1.015 65%, 1.015 70%, 1.013 75%, 1.011 80%, 1.008 85%, 1.006 90%, 1.004 95%, 1)';
  var SPRING_BOUNCY = 'linear(0, 0.056 4.2%, 0.188 8.3%, 0.351 12.5%, 0.517 16.7%, 0.666 20.8%, 0.79 25%, 0.886 29.2%, 0.955 33.3%, 1.001 37.5%, 1.029 41.7%, 1.042 45.8%, 1.046 50%, 1.043 54.2%, 1.037 58.3%, 1.03 62.5%, 1.022 66.7%, 1.015 70.8%, 1.01 75%, 1.005 79.2%, 1.002 83.3%, 1 87.5%, 0.999 91.7%, 0.998 95.8%, 1)';
  var CARBON_P = 'cubic-bezier(0.2, 0, 0.38, 0.9)';
  var CARBON_E = 'cubic-bezier(0.4, 0.14, 0.3, 1)';

  var VARS = [
    { name: '--m-hover-dur', desc: '호버 색·상태 레이어 전환 시간' },
    { name: '--m-hover-ease', desc: '호버 곡선' },
    { name: '--m-press-scale', desc: '누를 때 크기 (세트 전체 공통)' },
    { name: '--m-press-dur', desc: '누를 때 전환 시간' },
    { name: '--m-press-ease', desc: '누를 때 곡선' },
    { name: '--m-release-dur', desc: '뗄 때 돌아오는 시간' },
    { name: '--m-release-ease', desc: '뗄 때 곡선' },
    { name: '--m-focus-dur', desc: '포커스 링 등장 시간' },
    { name: '--m-state-dur', desc: '로딩·성공·복사 등 상태 변화 시간' },
    { name: '--m-state-ease', desc: '상태 변화 곡선' },
    { name: '--m-enter-dur', desc: '메뉴·툴팁 등장 시간' },
    { name: '--m-enter-ease', desc: '등장 곡선' },
    { name: '--m-enter-scale', desc: '등장 시작 크기 (트리거 쪽 기준)' },
    { name: '--m-enter-y', desc: '등장 시작 세로 이동' },
    { name: '--m-exit-dur', desc: '퇴장 시간 (등장의 약 0.75배)' },
    { name: '--m-exit-ease', desc: '퇴장 곡선' },
    { name: '--m-move-dur', desc: '인디케이터·스위치·회전 등 공간 이동 시간' },
    { name: '--m-move-ease', desc: '공간 이동 곡선 (스프링 세트만 오버슈트)' },
    { name: '--m-nudge', desc: '화살표·트레일링 아이콘 밀림 거리 (세트 전체 공통)' },
    { name: '--m-nudge-dur', desc: '밀림 시간' },
    { name: '--m-nudge-ease', desc: '밀림 곡선' },
    { name: '--m-layer-hover', desc: '호버 상태 레이어 불투명도 (M3: 8%)' },
    { name: '--m-layer-press', desc: '누름 상태 레이어 불투명도 (M3: 10%)' }
  ];

  var SETS = [
    {
      key: 'S1', name: '크리스프', feel: '즉각적이고 도구 같은 느낌. 오버슈트 없음.',
      use: '대시보드·테이블·어드민·키보드 많이 쓰는 앱, 페이지네이션',
      basis: [
        { label: 'IBM Carbon productive 곡선·duration', url: 'https://carbondesignsystem.com/elements/motion/overview/' },
        { label: 'Atlassian: 하루 수십 번 누르는 건 150ms 미만', url: 'https://atlassian.design/foundations/motion' },
        { label: 'Emil Kowalski: 누름 0.97', url: 'https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md' }
      ],
      vars: {
        '--m-hover-dur': '70ms', '--m-hover-ease': CARBON_P,
        '--m-press-scale': '0.97', '--m-press-dur': '70ms', '--m-press-ease': CARBON_P,
        '--m-release-dur': '110ms', '--m-release-ease': CARBON_P,
        '--m-focus-dur': '0ms',
        '--m-state-dur': '150ms', '--m-state-ease': CARBON_P,
        '--m-enter-dur': '150ms', '--m-enter-ease': 'cubic-bezier(0, 0, 0.38, 0.9)', '--m-enter-scale': '0.97', '--m-enter-y': '0px',
        '--m-exit-dur': '110ms', '--m-exit-ease': 'cubic-bezier(0.2, 0, 1, 0.9)',
        '--m-move-dur': '110ms', '--m-move-ease': CARBON_P,
        '--m-nudge': '2px', '--m-nudge-dur': '70ms', '--m-nudge-ease': CARBON_P,
        '--m-layer-hover': '0.08', '--m-layer-press': '0.1'
      }
    },
    {
      key: 'S2', name: '실크', feel: '빠르게 출발해서 길고 부드럽게 멈춤. 바운스 없음.',
      use: '프리미엄 소비자·핀테크, 설정, 제품 CTA, 캐러셀. 도감 기본 모션 토큰(--ease-out, --duration-fast/base)을 그대로 쓴다.',
      basis: [
        { label: '도감 토큰 --ease-out · --duration-fast/base (assets/tokens.css)', url: '' },
        { label: 'Emil Kowalski strong ease-out · 누름 0.95–0.98', url: 'https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md' },
        { label: 'Fluent 2 duration', url: 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/durations.ts' },
        { label: 'SwiftUI .smooth (bounce 0)', url: 'https://developer.apple.com/tutorials/data/documentation/swiftui/spring/smooth(duration:extrabounce:).json' },
        { label: '리서치 Set B(200/300ms, quint-out) 대신 도감 기본 토큰(180/280ms, cubic-bezier(.16,1,.3,1))을 씀', url: '' }
      ],
      vars: {
        '--m-hover-dur': 'var(--duration-fast)', '--m-hover-ease': 'var(--ease-out)',
        '--m-press-scale': '0.98', '--m-press-dur': '150ms', '--m-press-ease': 'var(--ease-out)',
        '--m-release-dur': 'var(--duration-base)', '--m-release-ease': 'var(--ease-out)',
        '--m-focus-dur': '100ms',
        '--m-state-dur': 'var(--duration-base)', '--m-state-ease': 'var(--ease-out)',
        '--m-enter-dur': '200ms', '--m-enter-ease': 'var(--ease-out)', '--m-enter-scale': '0.95', '--m-enter-y': '0px',
        '--m-exit-dur': '150ms', '--m-exit-ease': 'var(--ease-out)',
        '--m-move-dur': 'var(--duration-base)', '--m-move-ease': 'var(--ease-out)',
        '--m-nudge': '3px', '--m-nudge-dur': 'var(--duration-fast)', '--m-nudge-ease': 'var(--ease-out)',
        '--m-layer-hover': '0.08', '--m-layer-press': '0.1'
      }
    },
    {
      key: 'S3', name: '스프링', feel: '만지는 느낌, 살아 있음. 공간 이동만 살짝 튕기고 색은 튕기지 않음.',
      use: '소비자·소셜 앱, 온보딩, 보상, 좋아요. 촘촘한 데이터 화면엔 쓰지 않는다.',
      basis: [
        { label: 'M3 Expressive 스프링 (spatial fast 0.6/800, default 0.8/380)', url: 'https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt' },
        { label: 'SwiftUI .bouncy (bounce 0.3)', url: 'https://developer.apple.com/tutorials/data/documentation/swiftui/spring/bouncy(duration:extrabounce:).json' },
        { label: 'WWDC23 Animate with springs: bounce 0.4 넘으면 과함', url: 'https://developer.apple.com/videos/play/wwdc2023/10158/' }
      ],
      vars: {
        '--m-hover-dur': '150ms', '--m-hover-ease': 'ease',
        '--m-press-scale': '0.95', '--m-press-dur': '350ms', '--m-press-ease': SPRING_FAST,
        '--m-release-dur': '400ms', '--m-release-ease': SPRING_DEFAULT,
        '--m-focus-dur': '0ms',
        '--m-state-dur': '700ms', '--m-state-ease': SPRING_BOUNCY,
        '--m-enter-dur': '400ms', '--m-enter-ease': SPRING_DEFAULT, '--m-enter-scale': '0.9', '--m-enter-y': '0px',
        '--m-exit-dur': '150ms', '--m-exit-ease': 'ease',
        '--m-move-dur': '350ms', '--m-move-ease': SPRING_FAST,
        '--m-nudge': '4px', '--m-nudge-dur': '350ms', '--m-nudge-ease': SPRING_FAST,
        '--m-layer-hover': '0.08', '--m-layer-press': '0.1'
      }
    },
    {
      key: 'S4', name: '에디토리얼', feel: '조용하고 느긋함. 바운스 없음, 작은 이동과 밑줄.',
      use: '롱폼 읽기, 에디토리얼·브랜드 페이지, 자주 안 누르는 CTA',
      basis: [
        { label: 'IBM Carbon expressive 곡선·duration', url: 'https://carbondesignsystem.com/elements/motion/overview/' },
        { label: 'Val Head: 차분함 = 불투명도·작은 이동', url: 'https://noti.st/valhead/OrOO13' },
        { label: 'Salesforce Kinetics', url: 'https://v1.lightningdesignsystem.com/kinetics/choreography/making-things-move/' }
      ],
      vars: {
        '--m-hover-dur': '240ms', '--m-hover-ease': CARBON_E,
        '--m-press-scale': '0.99', '--m-press-dur': '150ms', '--m-press-ease': CARBON_E,
        '--m-release-dur': '240ms', '--m-release-ease': CARBON_E,
        '--m-focus-dur': '150ms',
        '--m-state-dur': '400ms', '--m-state-ease': CARBON_E,
        '--m-enter-dur': '240ms', '--m-enter-ease': 'cubic-bezier(0, 0, 0.3, 1)', '--m-enter-scale': '1', '--m-enter-y': '4px',
        '--m-exit-dur': '150ms', '--m-exit-ease': 'cubic-bezier(0.4, 0.14, 1, 1)',
        '--m-move-dur': '400ms', '--m-move-ease': CARBON_E,
        '--m-nudge': '6px', '--m-nudge-dur': '400ms', '--m-nudge-ease': CARBON_E,
        '--m-layer-hover': '0.08', '--m-layer-press': '0.1'
      }
    }
  ];

  /* 색·테두리 전환 시간: 기본은 호버 시간. 스윕·차오름은 글자 반전을 채움과 같은 시간(--m-move-dur)에 맞춘다 — 색이라 곡선은 호버 곡선(튕기지 않음) */
  var COLOR_TR = 'background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease)';
  var COLOR_MOVE_TR = 'background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-move-dur) var(--m-hover-ease), border-color var(--m-move-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease)';
  var REST_TR = 'transform var(--m-release-dur) var(--m-release-ease), ';
  var PRESS_TR = 'transform var(--m-press-dur) var(--m-press-ease), ';
  var HOVER = '@media (hover: hover) and (pointer: fine) {';
  var CONTRAST = 'color-mix(in srgb, var(--bg-1) 22%, transparent)';
  var FOCUS_RING = '0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1)';
  var SEG = '.T11 button:not([aria-pressed="true"])'; /* 선택 안 된 세그먼트만 — 선택 표시(--fg-1)와 겹치지 않게 */

  var BASE = [
    '/* 공통 버튼 베이스 — 모양·누름 스케일·포커스 링·비활성은 모든 스타일 공통. 호버 효과는 스타일(.hs-*)이 정한다.',
    ' * .mb--line(선)·.mb--ghost(고스트·아이콘) = 비운 버튼, 나머지 = 채운 버튼. ::before 는 상태 레이어 자리 — 스타일이 레이어·채움·링으로 바꿔 쓴다 */',
    '.mb { --_bg: var(--fg-1); --_fg: var(--bg-1); position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-4); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; color: var(--_fg); background: var(--_bg); border: 1px solid transparent; border-radius: var(--radius-md); cursor: pointer; isolation: isolate; overflow: hidden; -webkit-tap-highlight-color: transparent;',
    '  transition: ' + REST_TR + COLOR_TR + '; }',
    '.mb::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: currentColor; opacity: 0; pointer-events: none; transition: opacity var(--m-hover-dur) var(--m-hover-ease); }',
    '.mb:active { transform: scale(var(--m-press-scale)); transition: ' + PRESS_TR + COLOR_TR + '; }',
    '.mb:focus-visible { outline: none; box-shadow: ' + FOCUS_RING + '; }',
    '.mb:disabled { opacity: .4; cursor: not-allowed; transform: none; }',
    '.mb .ic { width: var(--space-5); height: var(--space-5); flex: none; }',
    '.mb--line { --_bg: transparent; --_fg: var(--fg-1); border-color: var(--border-strong); }',
    '.mb--ghost { --_bg: transparent; --_fg: var(--fg-1); }',
    '.mb--icon { width: calc(var(--space-7) - var(--space-2)); padding: 0; border-radius: var(--radius-pill); }'
  ].join('\n');

  var TYPES = [
    {
      key: 'T01', name: '프라이머리', desc: '채운 버튼. 호버는 열(스타일)을 따르고 누름 스케일은 공통.',
      demo: '<button type="button" class="mb T01"><span class="lb">저장하기</span></button>',
      css: '.T01 { min-width: calc(var(--space-11) - var(--space-4)); }'
    },
    {
      key: 'T02', name: '세컨더리 (아웃라인)', desc: '선 버튼. 칠하기·스윕·차오름에선 --fg-1 로 채워지고, 밀림에선 테두리만 진해진다.',
      demo: '<button type="button" class="mb mb--line T02"><span class="lb">취소</span></button>',
      css: '/* 모양은 .mb--line — 호버는 스타일(.hs-*)이 정한다 */'
    },
    {
      key: 'T03', name: '고스트 (텍스트 링크)', desc: '배경·테두리 없는 텍스트 버튼(.mb--ghost). 밀림에선 밑줄이 왼쪽부터 자라고, 다른 열에선 비운 버튼처럼 칠해지거나 그려진다.',
      demo: '<button type="button" class="mb mb--ghost T03"><span class="lb">더 알아보기</span></button>',
      css: '.T03 { padding: 0 var(--space-2); }'
    },
    {
      key: 'T04', name: '아이콘 버튼', desc: '원형 고스트 아이콘 버튼. 밀림에선 원형 상태 레이어가 가운데서 커진다.',
      demo: '<button type="button" class="mb mb--ghost mb--icon T04" aria-label="공유">{{i:share}}</button>',
      css: '/* 모양은 .mb--ghost.mb--icon — 호버는 스타일(.hs-*)이 정한다 */'
    },
    {
      key: 'T05', name: '화살표 페어 (이전/다음)', desc: '캐러셀·페이지 이동. 밀림 열에서만 화살표가 가리키는 쪽으로 --m-nudge 만큼 밀리고, 다른 열은 그 스타일의 버튼 효과만.',
      demo: '<div class="T05"><button type="button" class="mb mb--line mb--icon T05-b" aria-label="이전">{{i:chev-l}}</button><button type="button" class="mb mb--line mb--icon T05-b" aria-label="다음">{{i:chev-r}}</button></div>',
      css: '.T05 { display: flex; gap: var(--space-2); }'
    },
    {
      key: 'T06', name: 'CTA + 트레일링 화살표', desc: '채운 CTA. 밀림 열에서만 화살표가 앞으로 밀린다(화살표 쌍과 같은 거리·시간).',
      demo: '<button type="button" class="mb T06"><span class="lb">시작하기</span>{{i:arrow-r}}</button>',
      css: '.T06 { padding-right: var(--space-3); }'
    },
    {
      key: 'T07', name: '로딩 → 성공', desc: '눌러보기. 라벨 자리를 지키며(폭 고정) 스피너 → 체크가 그려진다.',
      demo: '<button type="button" class="mb T07" data-behavior="sequence" data-steps="is-loading:1400,is-done:1400"><span class="T07-label"><span class="lb">결제하기</span></span><span class="T07-spin" aria-hidden="true"></span><span class="T07-ok" aria-hidden="true">{{i:check}}</span></button>',
      css: [
        '.T07 { min-width: calc(var(--space-11) - var(--space-2)); }',
        '.T07-label { transition: opacity var(--m-state-dur) var(--m-hover-ease), filter var(--m-state-dur) var(--m-hover-ease); }',
        '.T07-spin, .T07-ok { position: absolute; inset: 0; margin: auto; display: grid; place-items: center; opacity: 0; transition: opacity var(--m-state-dur) var(--m-hover-ease), transform var(--m-state-dur) var(--m-state-ease); }',
        '.T07-spin { width: var(--space-4); height: var(--space-4); border: 2px solid currentColor; border-right-color: transparent; border-radius: var(--radius-pill); animation: T07-rot 700ms linear infinite; }',
        '.T07-ok { transform: scale(.6); }',
        '.T07-ok .ic { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset var(--m-state-dur) var(--m-hover-ease); }',
        '.T07.is-loading .T07-label, .T07.is-done .T07-label { opacity: 0; filter: blur(2px); }',
        '.T07.is-loading .T07-spin { opacity: 1; }',
        '.T07.is-done .T07-ok { opacity: 1; transform: scale(1); }',
        '.T07.is-done .T07-ok .ic { stroke-dashoffset: 0; }',
        '@keyframes T07-rot { to { transform: rotate(1turn); } }'
      ].join('\n')
    },
    {
      key: 'T08', name: '홀드 확인 (삭제)', desc: '길게 누르면 1.2초 동안 채워지고 끝까지 누르면 확정. 떼면 세트 속도로 되돌아간다. 채움 안에 반전 글자 사본이 있어 채워진 쪽 글자도 보인다. 채움형 호버(칠하기·스윕·차오름)는 누르는 동안(.is-holding) 걷혀 진행 채움이 보인다.',
      demo: '<button type="button" class="mb mb--line T08" data-behavior="hold" data-hold="1200"><span class="T08-fill" aria-hidden="true">{{i:trash}}<span class="T08-t">길게 눌러 삭제</span></span>{{i:trash}}<span class="T08-t"><span class="lb">길게 눌러 삭제</span></span></button>',
      css: [
        '.T08-fill { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; gap: var(--space-2); padding: 0 var(--space-4); color: var(--bg-1); background: var(--fg-1); border-radius: inherit; clip-path: inset(0 100% 0 0); transition: clip-path var(--m-release-dur) var(--m-release-ease); }',
        '.T08 .ic, .T08-t { transition: color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T08.is-holding .T08-fill { clip-path: inset(0); transition: clip-path 1200ms linear; }',
        '.T08.is-done .T08-fill { clip-path: inset(0); transition: none; }',
        '.T08.is-done { color: var(--bg-1); }',
        '.T08.is-done .T08-t { animation: T08-pop var(--m-state-dur) var(--m-state-ease); }',
        '@keyframes T08-pop { from { opacity: 0; transform: translateY(var(--space-1)); } }'
      ].join('\n')
    },
    {
      key: 'T09', name: '토글 (좋아요)', desc: '누르면 채워지며 튀고 링이 퍼진다. 같은 타이밍이면 같은 튕김. 켜진 상태는 채운 버튼으로 친다(스윕·차오름은 대비 레이어, 그리기는 바깥 링).',
      demo: '<button type="button" class="mb mb--line mb--icon T09" data-behavior="toggle" data-toggle aria-pressed="false" aria-label="좋아요">{{i:heart}}<span class="T09-ring" aria-hidden="true"></span></button>',
      css: [
        '.T09 { overflow: visible; }',
        '.T09 .ic { transition: fill var(--m-hover-dur) var(--m-hover-ease); }',
        '.T09.is-on { --_bg: var(--fg-1); --_fg: var(--bg-1); border-color: var(--fg-1); }',
        '.T09.is-on .ic { fill: currentColor; animation: T09-pop var(--m-state-dur) var(--m-state-ease); }',
        '.T09-ring { position: absolute; inset: 0; border: 2px solid var(--fg-1); border-radius: var(--radius-pill); opacity: 0; pointer-events: none; }',
        '.T09.is-on .T09-ring { animation: T09-ring var(--m-state-dur) var(--m-hover-ease); }',
        '@keyframes T09-pop { from { transform: scale(.6); } to { transform: scale(1); } }',
        '@keyframes T09-ring { from { opacity: .5; transform: scale(.8); } to { opacity: 0; transform: scale(1.6); } }'
      ].join('\n')
    },
    {
      key: 'T10', name: '복사', desc: '복사 아이콘이 체크로 바뀌고 툴팁이 세트의 등장 모션으로 뜬다.',
      demo: '<button type="button" class="mb mb--line T10" data-behavior="sequence" data-steps="is-done:1600"><span class="T10-ic">{{i:copy}}{{i:check}}</span><span>링크 복사</span></button>',
      css: [
        '.T10 { overflow: visible; }',
        '.T10-ic { position: relative; width: var(--space-5); height: var(--space-5); }',
        '.T10-ic .ic { position: absolute; inset: 0; transition: opacity var(--m-state-dur) var(--m-hover-ease), transform var(--m-state-dur) var(--m-state-ease); }',
        '.T10-ic .ic + .ic { opacity: 0; transform: scale(.5); }',
        '.T10.is-done .T10-ic .ic:first-child { opacity: 0; transform: scale(.5); }',
        '.T10.is-done .T10-ic .ic + .ic { opacity: 1; transform: scale(1); }',
        '.T10::after { content: "복사됨"; position: absolute; left: 50%; bottom: calc(100% + var(--space-2)); padding: var(--space-1) var(--space-2); font-size: var(--text-14); line-height: var(--lh-14); color: var(--bg-1); background: var(--fg-1); border-radius: var(--radius-sm); white-space: nowrap; pointer-events: none; opacity: 0; transform: translateX(-50%) translateY(var(--m-enter-y)) scale(var(--m-enter-scale)); transform-origin: bottom center; transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease); }',
        '.T10.is-done::after { opacity: 1; transform: translateX(-50%); transition-duration: var(--m-enter-dur); transition-timing-function: var(--m-enter-ease); }'
      ].join('\n')
    },
    {
      key: 'T11', name: '세그먼트 컨트롤', desc: '선택 표시가 미끄러진다(스프링 타이밍에서만 살짝 지나쳤다 돌아옴). 호버는 선택 안 된 칸에만, 선택 표시(--fg-1 채움)와 헷갈리지 않게 상태 레이어 강도로 스타일을 따른다 — 칠하기는 밀림과 같은 상태 레이어.',
      demo: '<div class="T11" data-behavior="segmented" role="group" aria-label="기간"><span class="T11-ind" aria-hidden="true"></span><button type="button" data-seg><span class="lb">일</span></button><button type="button" data-seg><span class="lb">주</span></button><button type="button" data-seg><span class="lb">월</span></button></div>',
      css: [
        '.T11 { position: relative; display: inline-flex; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); isolation: isolate; }',
        '.T11-ind { position: absolute; top: var(--space-1); bottom: var(--space-1); left: 0; width: var(--seg-w, 0px); transform: translateX(var(--seg-x, 0px)); background: var(--fg-1); border-radius: var(--radius-sm); z-index: -1; }',
        '.T11[data-ready] .T11-ind { transition: transform var(--m-move-dur) var(--m-move-ease), width var(--m-move-dur) var(--m-move-ease); }',
        '.T11 button { position: relative; padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); color: var(--fg-2); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-release-dur) var(--m-release-ease); }',
        '.T11 button::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--fg-1); opacity: 0; pointer-events: none; transition: opacity var(--m-hover-dur) var(--m-hover-ease); }',
        '.T11 button[aria-pressed="true"] { color: var(--bg-1); }',
        HOVER + ' ' + SEG + ':hover { color: var(--fg-1); } }',
        '.T11 button:active { transform: scale(var(--m-press-scale)); transition: color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-press-dur) var(--m-press-ease); }'
      ].join('\n')
    },
    {
      key: 'T12', name: '스위치', desc: '손잡이가 미끄러지고, 누르는 동안 옆으로 늘어난다(스쿼시). 트랙 호버가 스타일을 따른다 — 칠하기는 켜짐 표시와 헷갈리지 않게 밀림과 같은 상태 레이어.',
      demo: '<button type="button" class="T12" role="switch" aria-checked="false" aria-label="알림" data-behavior="toggle" data-toggle><span class="T12-thumb"></span></button>',
      css: [
        '.T12 { position: relative; isolation: isolate; box-sizing: content-box; width: calc(var(--space-7) - var(--space-1)); height: var(--space-5); padding: 0; background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-pill); cursor: pointer; transition: background-color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T12::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--fg-1); opacity: 0; pointer-events: none; transition: opacity var(--m-hover-dur) var(--m-hover-ease); }',
        '.T12.is-on::before { background: var(--bg-1); }',
        '.T12-thumb { position: absolute; top: 2px; left: 2px; width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); background: var(--fg-1); border-radius: var(--radius-pill); transition: transform var(--m-move-dur) var(--m-move-ease), width var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T12:active .T12-thumb { width: var(--space-5); }',
        '.T12.is-on { background: var(--fg-1); border-color: var(--fg-1); }',
        '.T12.is-on .T12-thumb { background: var(--bg-1); transform: translateX(calc(var(--space-5) - var(--space-1))); }',
        '.T12.is-on:active .T12-thumb { transform: translateX(var(--space-4)); }',
        '.T12:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1); }'
      ].join('\n')
    },
    {
      key: 'T13', name: 'FAB 메뉴', desc: '+가 ×로 돌고, 항목이 30ms 간격으로 세트의 등장 모션을 따라 펼쳐진다.',
      demo: '<div class="T13" data-behavior="menu"><div class="T13-items"><button type="button" class="mb mb--line mb--icon" aria-label="다운로드">{{i:download}}</button><button type="button" class="mb mb--line mb--icon" aria-label="공유">{{i:share}}</button><button type="button" class="mb mb--line mb--icon" aria-label="저장">{{i:bookmark}}</button></div><button type="button" class="mb mb--icon T13-fab" data-menu-trigger aria-expanded="false" aria-label="메뉴">{{i:plus}}</button></div>',
      css: [
        '.T13 { display: flex; align-items: center; gap: var(--space-2); }',
        '.T13-items { display: flex; gap: var(--space-1); }',
        '.T13-items .mb { width: var(--space-6); height: var(--space-6); }',
        '.T13-items .ic { width: var(--space-4); height: var(--space-4); }',
        '/* 항목 전환 목록이 BASE 를 덮으므로 색·테두리·그림자 전환도 같이 적는다 (스타일 호버가 끊기지 않게) */',
        '.T13-items .mb { --_bg: var(--bg-1); opacity: 0; visibility: hidden; pointer-events: none; transform: translateX(var(--space-2)) scale(var(--m-enter-scale)); transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease), visibility 0s var(--m-exit-dur), ' + COLOR_TR + '; }',
        '.T13.is-open .T13-items .mb { opacity: 1; visibility: visible; pointer-events: auto; transform: none; transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-enter-dur) var(--m-enter-ease), visibility 0s, ' + COLOR_TR + '; }',
        '.T13.is-open .T13-items .mb:nth-child(3) { transition-delay: 0ms, 0ms, 0s, 0s, 0s, 0s, 0s; }',
        '.T13.is-open .T13-items .mb:nth-child(2) { transition-delay: 30ms, 30ms, 0s, 0s, 0s, 0s, 0s; }',
        '.T13.is-open .T13-items .mb:nth-child(1) { transition-delay: 60ms, 60ms, 0s, 0s, 0s, 0s, 0s; }',
        '.T13.is-open .T13-items .mb:active { transform: scale(var(--m-press-scale)); transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-press-dur) var(--m-press-ease), visibility 0s, ' + COLOR_TR + '; }',
        '.T13-fab { width: var(--space-7); height: var(--space-7); }',
        '.T13-fab .ic { transition: transform var(--m-move-dur) var(--m-move-ease); }',
        '.T13.is-open .T13-fab .ic { transform: rotate(45deg); }'
      ].join('\n')
    },
    {
      key: 'T14', name: '드롭다운', desc: '캐럿이 뒤집히고 메뉴가 트리거 쪽에서 세트의 등장 모션으로 열린다.',
      tall: true,
      demo: '<div class="T14" data-behavior="menu"><button type="button" class="mb mb--line T14-trig" data-menu-trigger aria-expanded="false"><span class="lb">정렬</span>{{i:caret-down}}</button><div class="T14-pop"><button type="button">최신순</button><button type="button">인기순</button><button type="button">가격순</button></div></div>',
      css: [
        '.T14 { position: relative; align-self: start; }',
        '.T14-trig .ic { transition: transform var(--m-move-dur) var(--m-move-ease); }',
        '.T14.is-open .T14-trig .ic { transform: rotate(180deg); }',
        '.T14-pop { position: absolute; top: calc(100% + var(--space-1)); left: 0; z-index: 1; display: grid; min-width: 100%; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-md); transform-origin: top left; opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(calc(var(--m-enter-y) * -1)) scale(var(--m-enter-scale)); transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease), visibility 0s var(--m-exit-dur); }',
        '.T14.is-open .T14-pop { opacity: 1; visibility: visible; pointer-events: auto; transform: none; transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-enter-dur) var(--m-enter-ease), visibility 0s; }',
        '.T14-pop button { padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); text-align: left; white-space: nowrap; color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T14-pop button:hover { background: var(--bg-2); }'
      ].join('\n')
    },
    {
      key: 'T15', name: '페이지네이션 (카운터)', desc: '숫자는 넘기는 방향에서 들어온다. 화살표는 밀림 열에서만 T05와 같이 밀린다. 끝 페이지에서 비활성된 화살표는 어느 스타일에서도 호버 효과가 없다.',
      demo: '<nav class="T15" data-behavior="pager" data-total="12" aria-label="페이지"><button type="button" class="mb mb--line mb--icon T15-b" data-prev aria-label="이전 페이지">{{i:chev-l}}</button><span class="T15-label" data-label aria-live="polite"></span><button type="button" class="mb mb--line mb--icon T15-b" data-next aria-label="다음 페이지">{{i:chev-r}}</button></nav>',
      css: [
        '.T15 { display: flex; align-items: center; gap: var(--space-2); }',
        '.T15-label { min-width: var(--space-8); font-family: var(--font-mono); font-size: var(--text-14); line-height: var(--lh-14); text-align: center; color: var(--fg-1); }',
        '.T15[data-dir="next"] .T15-label.is-anim { animation: T15-in-next var(--m-move-dur) var(--m-move-ease); }',
        '.T15[data-dir="prev"] .T15-label.is-anim { animation: T15-in-prev var(--m-move-dur) var(--m-move-ease); }',
        '@keyframes T15-in-next { from { opacity: 0; transform: translateX(var(--space-2)); } }',
        '@keyframes T15-in-prev { from { opacity: 0; transform: translateX(calc(var(--space-2) * -1)); } }'
      ].join('\n')
    }
  ];

  /* 호버 스타일 — 열. 효과 자체가 다르다. 셀렉터는 모두 .hs-* 아래(버튼의 조상에 클래스를 단다). 시간·곡선은 --m-* 만 써서 타이밍 세트를 따른다.
   * 화살표·트레일링 아이콘 밀림(--m-nudge)은 H6 에만 있다. 채움형(H1~H3)은 :not(.is-holding) 으로 T08 홀드 진행을 가리지 않는다. */
  var STYLES = [
    {
      key: 'H1', cls: 'hs-fill', name: '칠하기',
      desc: '비운 버튼(선·고스트·아이콘·화살표)은 --fg-1 로 칠해지며 글자·아이콘이 반전되고, 채운 버튼은 반대로 비워진다. 색만 호버 시간으로 페이드.',
      basis: [
        { label: 'G-04', href: '#G-04' },
        { label: 'shadcn/ui Button — outline 호버 배경 채움', href: 'https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx' }
      ],
      css: [
        '/* H1 칠하기 — 비운 버튼은 칠해지고(글자 반전) 채운 버튼은 비워진다. --_bg/--_fg 만 바꾸면 BASE 의 색 전환(호버 시간)이 탄다.',
        ' * 누를 때는 상태 레이어(--m-layer-press). T11·T12 는 선택·켜짐 표시와 헷갈리지 않게 상태 레이어(밀림과 같음) */',
        HOVER,
        '  .hs-fill .mb:not(:disabled, .is-holding):hover { --_bg: transparent; --_fg: var(--fg-1); border-color: var(--fg-1); }',
        '  .hs-fill :is(.mb--line, .mb--ghost):not(:disabled, .is-holding):hover { --_bg: var(--fg-1); --_fg: var(--bg-1); }',
        '  .hs-fill ' + SEG + ':hover::before, .hs-fill .T12:hover::before { opacity: var(--m-layer-hover); }',
        '  .hs-fill .T12:hover { border-color: var(--fg-1); }',
        '}',
        '.hs-fill .mb:not(:disabled):active::before { opacity: var(--m-layer-press); }'
      ].join('\n')
    },
    {
      key: 'H2', cls: 'hs-sweep', name: '스윕',
      desc: '채움이 왼쪽에서 차오르고 떠날 때 오른쪽으로 빠진다. 비운 버튼은 글자가 채움과 함께 반전, 채운 버튼은 밝은 대비 레이어가 지나간다.',
      basis: [{ label: 'G-09', href: '#G-09' }, { label: 'G-10', href: '#G-10' }],
      css: [
        '/* H2 스윕 — 채움 레이어(::before)가 scaleX(0→1)로 왼쪽에서 차고, 떠날 때 transform-origin 을 오른쪽으로 바꿔 오른쪽으로 빠진다(G-10). 공간 이동이라 --m-move-*.',
        ' * 비운 버튼은 --fg-1 채움 + 글자 반전(채움과 같은 시간), 채운 버튼·켜진 T09 는 대비 레이어. T11·T12 는 상태 레이어가 같은 방식으로 지나간다 */',
        '.hs-sweep .mb::before { opacity: 1; background: ' + CONTRAST + '; transform: scaleX(0); transform-origin: right center; transition: transform var(--m-move-dur) var(--m-move-ease); }',
        '.hs-sweep :is(.mb--line, .mb--ghost)::before { background: var(--fg-1); }',
        '.hs-sweep .T09.is-on::before { background: ' + CONTRAST + '; }',
        '.hs-sweep .T11 button::before, .hs-sweep .T12::before { opacity: var(--m-layer-hover); transform: scaleX(0); transform-origin: right center; transition: transform var(--m-move-dur) var(--m-move-ease); }',
        '.hs-sweep :is(.mb--line, .mb--ghost) { transition: ' + REST_TR + COLOR_MOVE_TR + '; }',
        '.hs-sweep :is(.mb--line, .mb--ghost):active { transition: ' + PRESS_TR + COLOR_MOVE_TR + '; }',
        HOVER,
        '  .hs-sweep .mb:not(:disabled, .is-holding):hover::before, .hs-sweep ' + SEG + ':hover::before, .hs-sweep .T12:hover::before { transform: scaleX(1); transform-origin: left center; }',
        '  .hs-sweep :is(.mb--line, .mb--ghost):not(:disabled, .is-holding):hover { color: var(--bg-1); border-color: var(--fg-1); }',
        '  .hs-sweep .T12:hover { border-color: var(--fg-1); }',
        '}'
      ].join('\n')
    },
    {
      key: 'H3', cls: 'hs-rise', name: '차오름',
      desc: '채움이 아래에서 차오르고 라벨이 위로 한 번 굴러 바뀐다(텍스트 롤). 채운 버튼은 대비 레이어가 차오른다.',
      basis: [{ label: 'G-11', href: '#G-11' }, { label: 'G-12', href: '#G-12' }, { label: 'G-17', href: '#G-17' }],
      css: [
        '/* H3 차오름 — 채움은 clip-path inset(100%→0)으로 아래에서 차오른다: translateY(100%→0)와 같은 모양이지만 overflow:visible 인 T09·T10 에서도 밖으로 새지 않는다.',
        ' * 텍스트 롤(.lb): 라벨 복제 없이 text-shadow 로 1.6em 아래에 사본을 두고, 라벨을 1.6em 올리는 동안 clip-path 를 같은 만큼 반대로 내려 보이는 창을 제자리에 고정한다(G-17). */',
        '.hs-rise .mb::before { opacity: 1; background: ' + CONTRAST + '; clip-path: inset(100% 0 0 0); transition: clip-path var(--m-move-dur) var(--m-move-ease); }',
        '.hs-rise :is(.mb--line, .mb--ghost)::before { background: var(--fg-1); }',
        '.hs-rise .T09.is-on::before { background: ' + CONTRAST + '; }',
        '.hs-rise .T11 button::before, .hs-rise .T12::before { opacity: var(--m-layer-hover); clip-path: inset(100% 0 0 0); transition: clip-path var(--m-move-dur) var(--m-move-ease); }',
        '.hs-rise :is(.mb--line, .mb--ghost) { transition: ' + REST_TR + COLOR_MOVE_TR + '; }',
        '.hs-rise :is(.mb--line, .mb--ghost):active { transition: ' + PRESS_TR + COLOR_MOVE_TR + '; }',
        '.hs-rise :is(.mb, .T11) .lb { display: inline-block; text-shadow: 0 1.6em currentColor; clip-path: inset(0); transition: transform var(--m-move-dur) var(--m-move-ease), clip-path var(--m-move-dur) var(--m-move-ease); }',
        HOVER,
        '  .hs-rise .mb:not(:disabled, .is-holding):hover::before, .hs-rise ' + SEG + ':hover::before, .hs-rise .T12:hover::before { clip-path: inset(0); }',
        '  .hs-rise :is(.mb--line, .mb--ghost):not(:disabled, .is-holding):hover { color: var(--bg-1); border-color: var(--fg-1); }',
        '  .hs-rise .mb:not(:disabled, .is-holding):hover .lb, .hs-rise ' + SEG + ':hover .lb { transform: translateY(-1.6em); clip-path: inset(1.6em 0 -1.6em 0); }',
        '  .hs-rise .T12:hover { border-color: var(--fg-1); }',
        '}'
      ].join('\n')
    },
    {
      key: 'H4', cls: 'hs-draw', name: '테두리 그리기',
      desc: '테두리가 12시부터 시계 방향으로 그려진다. 비운 버튼은 제 테두리 위에, 채운 버튼은 3px 바깥에 링이 그려진다.',
      basis: [{ label: 'G-14', href: '#G-14' }],
      css: [
        '/* H4 테두리 그리기 — ::before 를 conic-gradient 링으로 쓰고 각도 --hs-a 를 0→360deg (G-14). 각도를 전환하려면 @property 등록이 필요하다(미지원 브라우저는 즉시 그려짐).',
        ' * 마스크 두 장(content-box, border-box)을 exclude 로 겹쳐 padding 2px 링만 남긴다. 비운 버튼은 제 테두리 위(inset -1px), 채운 버튼·켜진 T09·T12 는 3px 바깥(inset -6px)이라 .mb 의 overflow 를 연다. 상태 변화라 --m-state-* */',
        '@property --hs-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }',
        '.hs-draw .mb { overflow: visible; }',
        '.hs-draw .mb::before, .hs-draw .T11 button::before, .hs-draw .T12::before, .hs-draw .T12.is-on::before { padding: 2px; opacity: 1; background: conic-gradient(var(--fg-1) var(--hs-a), transparent 0); mask-image: linear-gradient(var(--fg-1) 0 0), linear-gradient(var(--fg-1) 0 0); mask-clip: content-box, border-box; mask-composite: exclude; transition: --hs-a var(--m-state-dur) var(--m-state-ease); }',
        '.hs-draw .mb::before, .hs-draw .T12::before { inset: -1px; }',
        '.hs-draw .mb:not(.mb--line, .mb--ghost)::before, .hs-draw .T09.is-on::before, .hs-draw .T12.is-on::before { inset: -6px; }',
        '.hs-draw .mb:not(.mb--line, .mb--ghost, .mb--icon)::before { border-radius: calc(var(--radius-md) + 5px); }',
        HOVER,
        '  .hs-draw .mb:not(:disabled):hover::before, .hs-draw ' + SEG + ':hover::before, .hs-draw .T12:hover::before { --hs-a: 360deg; }',
        '}'
      ].join('\n')
    },
    {
      key: 'H5', cls: 'hs-lift', name: '들어올림',
      desc: '2px 떠오르며 그림자가 깊어지고 테두리가 진해진다. 누르면 내려앉으며 그림자가 얕아진다.',
      basis: [{ label: 'G-02', href: '#G-02' }, { label: 'G-66', href: '#G-66' }],
      css: [
        '/* H5 들어올림 — 호버 translateY(-2px) + --shadow-md + 테두리 --fg-1, 누르면 translateY(0) + --shadow-sm + 누름 스케일 (G-02·G-66). 떠오름은 공간 이동이라 --m-move-*.',
        ' * 포커스 링도 box-shadow 라 호버·누름 그림자와 겹쳐 쓴다. T13 항목은 열림 상태의 transform 을 이기도록 따로 적는다 */',
        '.hs-lift .mb { transition: transform var(--m-move-dur) var(--m-move-ease), box-shadow var(--m-move-dur) var(--m-move-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.hs-lift .T11 button { transition: color var(--m-hover-dur) var(--m-hover-ease), background-color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-move-dur) var(--m-move-ease), box-shadow var(--m-move-dur) var(--m-move-ease); }',
        '.hs-lift .T12 { transition: background-color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-move-dur) var(--m-move-ease), box-shadow var(--m-move-dur) var(--m-move-ease); }',
        HOVER,
        '  .hs-lift .mb:not(:disabled):hover, .hs-lift .T12:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--fg-1); }',
        '  .hs-lift .mb:not(:disabled):focus-visible:hover, .hs-lift .T12:focus-visible:hover { box-shadow: ' + FOCUS_RING + ', var(--shadow-md); }',
        '  .hs-lift .T13.is-open .T13-items .mb:hover:not(:active) { transform: translateY(-2px); }',
        '  .hs-lift ' + SEG + ':hover { transform: translateY(-2px); background-color: var(--bg-1); box-shadow: var(--shadow-md); }',
        '}',
        '.hs-lift .mb:not(:disabled):active { transform: translateY(0) scale(var(--m-press-scale)); box-shadow: var(--shadow-sm); transition: transform var(--m-press-dur) var(--m-press-ease), box-shadow var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.hs-lift .T12:active { transform: translateY(0); box-shadow: var(--shadow-sm); }',
        '.hs-lift .mb:not(:disabled):focus-visible:active, .hs-lift .T12:focus-visible:active { box-shadow: ' + FOCUS_RING + ', var(--shadow-sm); }',
        '.hs-lift ' + SEG + ':active { transform: translateY(0) scale(var(--m-press-scale)); box-shadow: var(--shadow-sm); }'
      ].join('\n')
    },
    {
      key: 'H6', cls: 'hs-nudge', name: '밀림',
      desc: '기존 방식. 글자색 상태 레이어가 깔리고, 화살표·트레일링 아이콘이 가리키는 쪽으로 --m-nudge 만큼 밀린다. 선 버튼은 테두리가, 고스트는 밑줄이 진해진다.',
      basis: [{ label: 'G-04', href: '#G-04' }, { label: 'C-01', href: '#C-01' }],
      css: [
        '/* H6 밀림 — 기존 세트 방식: 상태 레이어(::before 를 글자색으로 --m-layer-* 만큼) + 화살표·트레일링 아이콘이 가리키는 쪽으로 --m-nudge.',
        ' * T02 테두리 진해짐, T03 밑줄, T04 원형 레이어 확대도 여기에만 있다 */',
        '.hs-nudge .mb:not(:disabled):active::before { opacity: var(--m-layer-press); }',
        '.hs-nudge .T03::before { display: none; }',
        '.hs-nudge .T03 .lb { background: linear-gradient(currentColor, currentColor) left bottom / 0% 1px no-repeat; padding-bottom: 2px; transition: background-size var(--m-hover-dur) var(--m-hover-ease); }',
        '.hs-nudge .T03:focus-visible .lb { background-size: 100% 1px; }',
        '.hs-nudge .T04::before { transform: scale(.6); transition: opacity var(--m-hover-dur) var(--m-hover-ease), transform var(--m-move-dur) var(--m-move-ease); }',
        '.hs-nudge .T04:active::before { transform: scale(1); }',
        '.hs-nudge :is(.T05, .T06, .T15) .ic { transition: transform var(--m-nudge-dur) var(--m-nudge-ease); }',
        HOVER,
        '  .hs-nudge .mb:not(:disabled):hover::before, .hs-nudge ' + SEG + ':hover::before, .hs-nudge .T12:hover::before { opacity: var(--m-layer-hover); }',
        '  .hs-nudge .T02:not(:disabled):hover, .hs-nudge .T12:hover { border-color: var(--fg-1); }',
        '  .hs-nudge .T03:hover .lb { background-size: 100% 1px; }',
        '  .hs-nudge .T04:hover::before { transform: scale(1); }',
        '  .hs-nudge .T05-b:first-child:hover .ic, .hs-nudge .T15-b[data-prev]:not(:disabled):hover .ic { transform: translateX(calc(var(--m-nudge) * -1)); }',
        '  .hs-nudge .T05-b:last-child:hover .ic, .hs-nudge .T06:hover .ic, .hs-nudge .T15-b[data-next]:not(:disabled):hover .ic { transform: translateX(var(--m-nudge)); }',
        '}'
      ].join('\n')
    }
  ];

  return {
    desc: '두 축으로 고른다. 열 = 호버 스타일(H1~H6): 칠하기·스윕·차오름·테두리 그리기·들어올림·밀림처럼 효과 자체가 다르다. 위 타이밍 칩 = 타이밍 세트(S1~S4): 같은 easing 계열·누름 스케일·duration 사다리·상태 레이어 불투명도를 공유하는 --m-* 변수 묶음이라, 바꾸면 모든 칸이 같은 속도감으로 바뀐다. 아무 스타일 × 아무 타이밍이 조합된다. 누름 스케일과 포커스 링은 모든 스타일 공통이고, 색·불투명도는 어느 타이밍에서도 튕기지 않으며 공간 이동만 세트의 곡선을 탄다.',
    VARS: VARS, SETS: SETS, BASE: BASE, STYLES: STYLES, TYPES: TYPES
  };
})();
