/* 모션 세트 매트릭스 — 세트(S1~S4)는 --m-* 변수 묶음, 버튼 종류(T01~T15)는 그 변수와 DS 토큰만 쓴다.
 * 근거: research/S-motion-sets.md. 세트를 바꾸면 모든 버튼이 같은 모션 언어로 바뀐다. */
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
      key: 'S2', name: '실크 (PARAMETA 기본)', feel: '빠르게 출발해서 길고 부드럽게 멈춤. 바운스 없음.',
      use: '프리미엄 소비자·핀테크, 설정, 제품 CTA, 캐러셀. PARAMETA DS 모션 토큰을 그대로 쓴다.',
      basis: [
        { label: 'PARAMETA DS --ease-out · --duration-fast/base (assets/ds/tokens.css)', url: '' },
        { label: 'Emil Kowalski strong ease-out · 누름 0.95–0.98', url: 'https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md' },
        { label: 'Fluent 2 duration', url: 'https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/durations.ts' },
        { label: 'SwiftUI .smooth (bounce 0)', url: 'https://developer.apple.com/tutorials/data/documentation/swiftui/spring/smooth(duration:extrabounce:).json' },
        { label: '리서치 Set B(200/300ms, quint-out) 대신 PARAMETA DS 토큰(180/280ms, cubic-bezier(.16,1,.3,1))을 씀', url: '' }
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

  var BASE = [
    '/* 공통 버튼 베이스 — 상태 레이어(::before)는 글자색을 --m-layer-* 만큼 깐다 */',
    '.mb { --_bg: var(--fg-1); --_fg: var(--bg-1); position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-4); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; color: var(--_fg); background: var(--_bg); border: 1px solid transparent; border-radius: var(--radius-md); cursor: pointer; isolation: isolate; overflow: hidden; -webkit-tap-highlight-color: transparent;',
    '  transition: transform var(--m-release-dur) var(--m-release-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }',
    '.mb::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: currentColor; opacity: 0; pointer-events: none; transition: opacity var(--m-hover-dur) var(--m-hover-ease); }',
    '@media (hover: hover) and (pointer: fine) { .mb:hover::before { opacity: var(--m-layer-hover); } }',
    '.mb:active { transform: scale(var(--m-press-scale)); transition: transform var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }',
    '.mb:active::before { opacity: var(--m-layer-press); }',
    '.mb:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1); }',
    '.mb:disabled { opacity: .4; cursor: not-allowed; transform: none; }',
    '.mb .ic { width: var(--space-5); height: var(--space-5); flex: none; }',
    '.mb--line { --_bg: transparent; --_fg: var(--fg-1); border-color: var(--border-strong); }',
    '.mb--icon { width: calc(var(--space-7) - var(--space-2)); padding: 0; border-radius: var(--radius-pill); }'
  ].join('\n');

  var TYPES = [
    {
      key: 'T01', name: '프라이머리', desc: '채운 버튼. 상태 레이어 + 누름 스케일만.',
      demo: '<button type="button" class="mb T01">저장하기</button>',
      css: '.T01 { min-width: calc(var(--space-11) - var(--space-4)); }'
    },
    {
      key: 'T02', name: '세컨더리 (아웃라인)', desc: '선 버튼. 호버 때 테두리가 진해진다.',
      demo: '<button type="button" class="mb mb--line T02">취소</button>',
      css: '@media (hover: hover) and (pointer: fine) { .T02:hover { border-color: var(--fg-1); } }'
    },
    {
      key: 'T03', name: '고스트 (텍스트 링크)', desc: '배경 없음. 밑줄이 왼쪽부터 자란다.',
      demo: '<button type="button" class="mb T03"><span>더 알아보기</span></button>',
      css: [
        '.T03 { --_bg: transparent; --_fg: var(--fg-1); padding: 0 var(--space-2); }',
        '.T03::before { display: none; }',
        '.T03 span { background: linear-gradient(currentColor, currentColor) left bottom / 0% 1px no-repeat; padding-bottom: 2px; transition: background-size var(--m-hover-dur) var(--m-hover-ease); }',
        '@media (hover: hover) and (pointer: fine) { .T03:hover span { background-size: 100% 1px; } }',
        '.T03:focus-visible span { background-size: 100% 1px; }'
      ].join('\n')
    },
    {
      key: 'T04', name: '아이콘 버튼', desc: '원형 상태 레이어가 가운데서 커지며 나타난다.',
      demo: '<button type="button" class="mb mb--icon T04" aria-label="공유">{{i:share}}</button>',
      css: [
        '.T04 { --_bg: transparent; --_fg: var(--fg-1); }',
        '.T04::before { transform: scale(.6); transition: opacity var(--m-hover-dur) var(--m-hover-ease), transform var(--m-move-dur) var(--m-move-ease); }',
        '@media (hover: hover) and (pointer: fine) { .T04:hover::before { transform: scale(1); } }',
        '.T04:active::before { transform: scale(1); }'
      ].join('\n')
    },
    {
      key: 'T05', name: '화살표 페어 (이전/다음)', desc: '캐러셀·페이지 이동. 화살표가 가리키는 쪽으로 --m-nudge 만큼 밀린다.',
      demo: '<div class="T05"><button type="button" class="mb mb--line mb--icon T05-b" aria-label="이전">{{i:chev-l}}</button><button type="button" class="mb mb--line mb--icon T05-b" aria-label="다음">{{i:chev-r}}</button></div>',
      css: [
        '.T05 { display: flex; gap: var(--space-2); }',
        '.T05 .ic { transition: transform var(--m-nudge-dur) var(--m-nudge-ease); }',
        '@media (hover: hover) and (pointer: fine) {',
        '  .T05-b:first-child:hover .ic { transform: translateX(calc(var(--m-nudge) * -1)); }',
        '  .T05-b:last-child:hover .ic { transform: translateX(var(--m-nudge)); }',
        '}'
      ].join('\n')
    },
    {
      key: 'T06', name: 'CTA + 트레일링 화살표', desc: '라벨은 그대로, 화살표만 앞으로. 화살표 쌍과 같은 거리·시간.',
      demo: '<button type="button" class="mb T06"><span>시작하기</span>{{i:arrow-r}}</button>',
      css: [
        '.T06 { padding-right: var(--space-3); }',
        '.T06 .ic { transition: transform var(--m-nudge-dur) var(--m-nudge-ease); }',
        '@media (hover: hover) and (pointer: fine) { .T06:hover .ic { transform: translateX(var(--m-nudge)); } }'
      ].join('\n')
    },
    {
      key: 'T07', name: '로딩 → 성공', desc: '눌러보기. 라벨 자리를 지키며(폭 고정) 스피너 → 체크가 그려진다.',
      demo: '<button type="button" class="mb T07" data-behavior="sequence" data-steps="is-loading:1400,is-done:1400"><span class="T07-label">결제하기</span><span class="T07-spin" aria-hidden="true"></span><span class="T07-ok" aria-hidden="true">{{i:check}}</span></button>',
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
      key: 'T08', name: '홀드 확인 (삭제)', desc: '길게 누르면 1.2초 동안 채워지고 끝까지 누르면 확정. 떼면 세트 속도로 되돌아간다. 채움 안에 반전 글자 사본이 있어 채워진 쪽 글자도 보인다.',
      demo: '<button type="button" class="mb mb--line T08" data-behavior="hold" data-hold="1200"><span class="T08-fill" aria-hidden="true">{{i:trash}}<span class="T08-t">길게 눌러 삭제</span></span>{{i:trash}}<span class="T08-t">길게 눌러 삭제</span></button>',
      css: [
        '.T08-fill { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-2); padding: 0 var(--space-4); color: var(--bg-1); background: var(--fg-1); clip-path: inset(0 100% 0 0); transition: clip-path var(--m-release-dur) var(--m-release-ease); }',
        '.T08 .ic, .T08-t { transition: color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T08.is-holding .T08-fill { clip-path: inset(0); transition: clip-path 1200ms linear; }',
        '.T08.is-done .T08-fill { clip-path: inset(0); transition: none; }',
        '.T08.is-done { color: var(--bg-1); }',
        '.T08.is-done .T08-t { animation: T08-pop var(--m-state-dur) var(--m-state-ease); }',
        '@keyframes T08-pop { from { opacity: 0; transform: translateY(var(--space-1)); } }'
      ].join('\n')
    },
    {
      key: 'T09', name: '토글 (좋아요)', desc: '누르면 채워지며 튀고 링이 퍼진다. 같은 세트면 같은 튕김.',
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
      key: 'T11', name: '세그먼트 컨트롤', desc: '선택 표시가 미끄러진다. 스프링 세트에서만 살짝 지나쳤다 돌아옴.',
      demo: '<div class="T11" data-behavior="segmented" role="group" aria-label="기간"><span class="T11-ind" aria-hidden="true"></span><button type="button" data-seg>일</button><button type="button" data-seg>주</button><button type="button" data-seg>월</button></div>',
      css: [
        '.T11 { position: relative; display: inline-flex; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); isolation: isolate; }',
        '.T11-ind { position: absolute; top: var(--space-1); bottom: var(--space-1); left: 0; width: var(--seg-w, 0px); transform: translateX(var(--seg-x, 0px)); background: var(--fg-1); border-radius: var(--radius-sm); z-index: -1; }',
        '.T11[data-ready] .T11-ind { transition: transform var(--m-move-dur) var(--m-move-ease), width var(--m-move-dur) var(--m-move-ease); }',
        '.T11 button { padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); color: var(--fg-2); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-release-dur) var(--m-release-ease); }',
        '.T11 button[aria-pressed="true"] { color: var(--bg-1); }',
        '.T11 button:active { transform: scale(var(--m-press-scale)); transition: color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-press-dur) var(--m-press-ease); }'
      ].join('\n')
    },
    {
      key: 'T12', name: '스위치', desc: '손잡이가 미끄러지고, 누르는 동안 옆으로 늘어난다(스쿼시).',
      demo: '<button type="button" class="T12" role="switch" aria-checked="false" aria-label="알림" data-behavior="toggle" data-toggle><span class="T12-thumb"></span></button>',
      css: [
        '.T12 { position: relative; box-sizing: content-box; width: calc(var(--space-7) - var(--space-1)); height: var(--space-5); padding: 0; background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-pill); cursor: pointer; transition: background-color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }',
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
        '.T13-items .mb { --_bg: var(--bg-1); opacity: 0; visibility: hidden; pointer-events: none; transform: translateX(var(--space-2)) scale(var(--m-enter-scale)); transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease), visibility 0s var(--m-exit-dur); }',
        '.T13.is-open .T13-items .mb { opacity: 1; visibility: visible; pointer-events: auto; transform: none; transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-enter-dur) var(--m-enter-ease), visibility 0s; }',
        '.T13.is-open .T13-items .mb:nth-child(3) { transition-delay: 0ms, 0ms, 0s; }',
        '.T13.is-open .T13-items .mb:nth-child(2) { transition-delay: 30ms, 30ms, 0s; }',
        '.T13.is-open .T13-items .mb:nth-child(1) { transition-delay: 60ms, 60ms, 0s; }',
        '.T13.is-open .T13-items .mb:active { transform: scale(var(--m-press-scale)); transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-press-dur) var(--m-press-ease), visibility 0s; }',
        '.T13-fab { width: var(--space-7); height: var(--space-7); }',
        '.T13-fab .ic { transition: transform var(--m-move-dur) var(--m-move-ease); }',
        '.T13.is-open .T13-fab .ic { transform: rotate(45deg); }'
      ].join('\n')
    },
    {
      key: 'T14', name: '드롭다운', desc: '캐럿이 뒤집히고 메뉴가 트리거 쪽에서 세트의 등장 모션으로 열린다.',
      tall: true,
      demo: '<div class="T14" data-behavior="menu"><button type="button" class="mb mb--line T14-trig" data-menu-trigger aria-expanded="false">정렬 {{i:caret-down}}</button><div class="T14-pop"><button type="button">최신순</button><button type="button">인기순</button><button type="button">가격순</button></div></div>',
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
      key: 'T15', name: '페이지네이션 (카운터)', desc: '화살표는 T05와 같은 밀림, 숫자는 넘기는 방향에서 들어온다.',
      demo: '<nav class="T15" data-behavior="pager" data-total="12" aria-label="페이지"><button type="button" class="mb mb--line mb--icon T15-b" data-prev aria-label="이전 페이지">{{i:chev-l}}</button><span class="T15-label" data-label aria-live="polite"></span><button type="button" class="mb mb--line mb--icon T15-b" data-next aria-label="다음 페이지">{{i:chev-r}}</button></nav>',
      css: [
        '.T15 { display: flex; align-items: center; gap: var(--space-2); }',
        '.T15-label { min-width: var(--space-8); font-family: var(--font-mono); font-size: var(--text-14); line-height: var(--lh-14); text-align: center; color: var(--fg-1); }',
        '.T15 .ic { transition: transform var(--m-nudge-dur) var(--m-nudge-ease); }',
        '@media (hover: hover) and (pointer: fine) {',
        '  .T15-b[data-prev]:hover:not(:disabled) .ic { transform: translateX(calc(var(--m-nudge) * -1)); }',
        '  .T15-b[data-next]:hover:not(:disabled) .ic { transform: translateX(var(--m-nudge)); }',
        '}',
        '.T15[data-dir="next"] .T15-label.is-anim { animation: T15-in-next var(--m-move-dur) var(--m-move-ease); }',
        '.T15[data-dir="prev"] .T15-label.is-anim { animation: T15-in-prev var(--m-move-dur) var(--m-move-ease); }',
        '@keyframes T15-in-next { from { opacity: 0; transform: translateX(var(--space-2)); } }',
        '@keyframes T15-in-prev { from { opacity: 0; transform: translateX(calc(var(--space-2) * -1)); } }'
      ].join('\n')
    }
  ];

  return {
    desc: '세트 = 같은 easing 계열 · 같은 누름 스케일 · 같은 duration 사다리 · 같은 밀림 거리 · 같은 상태 레이어 불투명도를 공유하는 버튼 묶음. 열(세트)을 바꾸면 변수만 바뀌고 모든 버튼이 같은 모션 언어로 움직인다. 색·불투명도는 어느 세트에서도 튕기지 않고, 공간 이동만 세트의 곡선을 탄다.',
    VARS: VARS, SETS: SETS, BASE: BASE, TYPES: TYPES
  };
})();
