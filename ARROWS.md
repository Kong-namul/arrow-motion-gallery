# 화살표·버튼 모션 도감 — 스펙

> 이 파일은 `data/*.js`에서 자동 생성된다. 직접 고치지 말고 `node scripts/build-md.mjs`로 다시 만든다.
>
> **쓰는 법:** "B-04처럼 만들어줘", "모션 세트 H2 스윕 × S2로 T07 버튼"처럼 번호로 지시하면 아래 HTML·CSS·JS를 그대로 쓰면 된다.
> 색·폰트·간격은 도감 토큰(`assets/tokens.css`, 다크모드 포함)을 참조한다. 모션 수치(ms, easing)는 출처 값 그대로다. "추정"은 출처에 수치가 없어 재현값을 쓴 것.
> 리서치 원문(출처 URL·수치): `research/*.md`

총 211종 + 모션 세트: 호버 스타일 6개 × 타이밍 세트 4개 × 버튼 종류 15개

## 목차

- [S. 모션 세트 매트릭스](#s-모션-세트-매트릭스)
- [A. 캐러셀·슬라이더](#a-캐러셀슬라이더) — 29종
- [B. 페이지네이션](#b-페이지네이션) — 27종
- [C. 화살표 마이크로인터랙션](#c-화살표-마이크로인터랙션) — 37종
- [D. 가로 스크롤](#d-가로-스크롤) — 14종
- [E. 페이지 넘김·뷰어](#e-페이지-넘김뷰어) — 17종
- [F. 아이콘 글리프](#f-아이콘-글리프) — 12종
- [G. 버튼 모션](#g-버튼-모션) — 75종

## S. 모션 세트 매트릭스

두 축으로 고른다. 열 = 호버 스타일(H1~H6): 칠하기·스윕·차오름·테두리 그리기·들어올림·밀림처럼 효과 자체가 다르다. 위 타이밍 칩 = 타이밍 세트(S1~S4): 같은 easing 계열·누름 스케일·duration 사다리·상태 레이어 불투명도를 공유하는 --m-* 변수 묶음이라, 바꾸면 모든 칸이 같은 속도감으로 바뀐다. 아무 스타일 × 아무 타이밍이 조합된다. 누름 스케일과 포커스 링은 모든 스타일 공통이고, 색·불투명도는 어느 타이밍에서도 튕기지 않으며 공간 이동만 세트의 곡선을 탄다.

조합 방법: 타이밍 변수(`:root` 의 `--m-*`) → 공통 베이스 → 호버 스타일 → 버튼 종류 순서로 CSS 를 넣고, 버튼들의 조상(감싸는 요소나 `body`)에 스타일 클래스(예: `.hs-sweep`)를 붙인다. 스타일 CSS 는 그 클래스 아래로만 범위가 잡혀 있다.

### 호버 스타일

| 스타일 | 클래스 | 효과 | 근거 |
|---|---|---|---|
| H1 칠하기 | `.hs-fill` | 비운 버튼(선·고스트·아이콘·화살표)은 --fg-1 로 칠해지며 글자·아이콘이 반전되고, 채운 버튼은 반대로 비워진다. 색만 호버 시간으로 페이드. | [G-04 M3 상태 레이어](#g-04-m3-상태-레이어) · [shadcn/ui Button — outline 호버 배경 채움](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx) |
| H2 스윕 | `.hs-sweep` | 채움이 왼쪽에서 차오르고 떠날 때 오른쪽으로 빠진다. 비운 버튼은 글자가 채움과 함께 반전, 채운 버튼은 밝은 대비 레이어가 지나간다. | [G-09 위·왼쪽·가운데에서 채우기](#g-09-위왼쪽가운데에서-채우기) · [G-10 왼쪽에서 차고 오른쪽으로 빠지는 배경](#g-10-왼쪽에서-차고-오른쪽으로-빠지는-배경) |
| H3 차오름 | `.hs-rise` | 채움이 아래에서 차오르고 라벨이 위로 한 번 굴러 바뀐다(텍스트 롤). 채운 버튼은 대비 레이어가 차오른다. | [G-11 바닥 띠가 차오르는 리퀴드 채움](#g-11-바닥-띠가-차오르는-리퀴드-채움) · [G-12 채움이 위로 빠지며 글자 반전 (Pan)](#g-12-채움이-위로-빠지며-글자-반전-pan) · [G-17 라벨이 위로 빠졌다 아래서 돌아옴](#g-17-라벨이-위로-빠졌다-아래서-돌아옴) |
| H4 테두리 그리기 | `.hs-draw` | 테두리가 12시부터 시계 방향으로 그려진다. 비운 버튼은 제 테두리 위에, 채운 버튼은 3px 바깥에 링이 그려진다. | [G-14 테두리 그리기 / 드러내기](#g-14-테두리-그리기--드러내기) |
| H5 들어올림 | `.hs-lift` | 2px 떠오르며 그림자가 깊어지고 테두리가 진해진다. 누르면 내려앉으며 그림자가 얕아진다. | [G-02 들림 + 그림자 깊어짐](#g-02-들림--그림자-깊어짐) · [G-66 3D 눌리는 버튼 (Pushable)](#g-66-3d-눌리는-버튼-pushable) |
| H6 밀림 | `.hs-nudge` | 기존 방식. 글자색 상태 레이어가 깔리고, 화살표·트레일링 아이콘이 가리키는 쪽으로 --m-nudge 만큼 밀린다. 선 버튼은 테두리가, 고스트는 밑줄이 진해진다. | [G-04 M3 상태 레이어](#g-04-m3-상태-레이어) · [C-01 넛지 앤 리턴 (한 번)](#c-01-넛지-앤-리턴-한-번) |

#### H1 칠하기

비운 버튼(선·고스트·아이콘·화살표)은 --fg-1 로 칠해지며 글자·아이콘이 반전되고, 채운 버튼은 반대로 비워진다. 색만 호버 시간으로 페이드.

- 클래스: `.hs-fill`
- 근거: [G-04 M3 상태 레이어](#g-04-m3-상태-레이어) · [shadcn/ui Button — outline 호버 배경 채움](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx)

```css
/* H1 칠하기 — 비운 버튼은 칠해지고(글자 반전) 채운 버튼은 비워진다. --_bg/--_fg 만 바꾸면 BASE 의 색 전환(호버 시간)이 탄다.
 * 누를 때는 상태 레이어(--m-layer-press). T11·T12 는 선택·켜짐 표시와 헷갈리지 않게 상태 레이어(밀림과 같음) */
@media (hover: hover) and (pointer: fine) {
  .hs-fill .mb:not(:disabled, .is-holding):hover { --_bg: transparent; --_fg: var(--fg-1); border-color: var(--fg-1); }
  .hs-fill :is(.mb--line, .mb--ghost):not(:disabled, .is-holding):hover { --_bg: var(--fg-1); --_fg: var(--bg-1); }
  .hs-fill .T11 button:not([aria-pressed="true"]):hover::before, .hs-fill .T12:hover::before { opacity: var(--m-layer-hover); }
  .hs-fill .T12:hover { border-color: var(--fg-1); }
}
.hs-fill .mb:not(:disabled):active::before { opacity: var(--m-layer-press); }
```

#### H2 스윕

채움이 왼쪽에서 차오르고 떠날 때 오른쪽으로 빠진다. 비운 버튼은 글자가 채움과 함께 반전, 채운 버튼은 밝은 대비 레이어가 지나간다.

- 클래스: `.hs-sweep`
- 근거: [G-09 위·왼쪽·가운데에서 채우기](#g-09-위왼쪽가운데에서-채우기) · [G-10 왼쪽에서 차고 오른쪽으로 빠지는 배경](#g-10-왼쪽에서-차고-오른쪽으로-빠지는-배경)

```css
/* H2 스윕 — 채움 레이어(::before)가 scaleX(0→1)로 왼쪽에서 차고, 떠날 때 transform-origin 을 오른쪽으로 바꿔 오른쪽으로 빠진다(G-10). 공간 이동이라 --m-move-*.
 * 비운 버튼은 --fg-1 채움 + 글자 반전(채움과 같은 시간), 채운 버튼·켜진 T09 는 대비 레이어. T11·T12 는 상태 레이어가 같은 방식으로 지나간다 */
.hs-sweep .mb::before { opacity: 1; background: color-mix(in srgb, var(--bg-1) 22%, transparent); transform: scaleX(0); transform-origin: right center; transition: transform var(--m-move-dur) var(--m-move-ease); }
.hs-sweep :is(.mb--line, .mb--ghost)::before { background: var(--fg-1); }
.hs-sweep .T09.is-on::before { background: color-mix(in srgb, var(--bg-1) 22%, transparent); }
.hs-sweep .T11 button::before, .hs-sweep .T12::before { opacity: var(--m-layer-hover); transform: scaleX(0); transform-origin: right center; transition: transform var(--m-move-dur) var(--m-move-ease); }
.hs-sweep :is(.mb--line, .mb--ghost) { transition: transform var(--m-release-dur) var(--m-release-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-move-dur) var(--m-hover-ease), border-color var(--m-move-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.hs-sweep :is(.mb--line, .mb--ghost):active { transition: transform var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-move-dur) var(--m-hover-ease), border-color var(--m-move-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
@media (hover: hover) and (pointer: fine) {
  .hs-sweep .mb:not(:disabled, .is-holding):hover::before, .hs-sweep .T11 button:not([aria-pressed="true"]):hover::before, .hs-sweep .T12:hover::before { transform: scaleX(1); transform-origin: left center; }
  .hs-sweep :is(.mb--line, .mb--ghost):not(:disabled, .is-holding):hover { color: var(--bg-1); border-color: var(--fg-1); }
  .hs-sweep .T12:hover { border-color: var(--fg-1); }
}
```

#### H3 차오름

채움이 아래에서 차오르고 라벨이 위로 한 번 굴러 바뀐다(텍스트 롤). 채운 버튼은 대비 레이어가 차오른다.

- 클래스: `.hs-rise`
- 근거: [G-11 바닥 띠가 차오르는 리퀴드 채움](#g-11-바닥-띠가-차오르는-리퀴드-채움) · [G-12 채움이 위로 빠지며 글자 반전 (Pan)](#g-12-채움이-위로-빠지며-글자-반전-pan) · [G-17 라벨이 위로 빠졌다 아래서 돌아옴](#g-17-라벨이-위로-빠졌다-아래서-돌아옴)

```css
/* H3 차오름 — 채움은 clip-path inset(100%→0)으로 아래에서 차오른다: translateY(100%→0)와 같은 모양이지만 overflow:visible 인 T09·T10 에서도 밖으로 새지 않는다.
 * 텍스트 롤(.lb): 라벨 복제 없이 text-shadow 로 1.6em 아래에 사본을 두고, 라벨을 1.6em 올리는 동안 clip-path 를 같은 만큼 반대로 내려 보이는 창을 제자리에 고정한다(G-17). */
.hs-rise .mb::before { opacity: 1; background: color-mix(in srgb, var(--bg-1) 22%, transparent); clip-path: inset(100% 0 0 0); transition: clip-path var(--m-move-dur) var(--m-move-ease); }
.hs-rise :is(.mb--line, .mb--ghost)::before { background: var(--fg-1); }
.hs-rise .T09.is-on::before { background: color-mix(in srgb, var(--bg-1) 22%, transparent); }
.hs-rise .T11 button::before, .hs-rise .T12::before { opacity: var(--m-layer-hover); clip-path: inset(100% 0 0 0); transition: clip-path var(--m-move-dur) var(--m-move-ease); }
.hs-rise :is(.mb--line, .mb--ghost) { transition: transform var(--m-release-dur) var(--m-release-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-move-dur) var(--m-hover-ease), border-color var(--m-move-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.hs-rise :is(.mb--line, .mb--ghost):active { transition: transform var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-move-dur) var(--m-hover-ease), border-color var(--m-move-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.hs-rise :is(.mb, .T11) .lb { display: inline-block; text-shadow: 0 1.6em currentColor; clip-path: inset(0); transition: transform var(--m-move-dur) var(--m-move-ease), clip-path var(--m-move-dur) var(--m-move-ease); }
@media (hover: hover) and (pointer: fine) {
  .hs-rise .mb:not(:disabled, .is-holding):hover::before, .hs-rise .T11 button:not([aria-pressed="true"]):hover::before, .hs-rise .T12:hover::before { clip-path: inset(0); }
  .hs-rise :is(.mb--line, .mb--ghost):not(:disabled, .is-holding):hover { color: var(--bg-1); border-color: var(--fg-1); }
  .hs-rise .mb:not(:disabled, .is-holding):hover .lb, .hs-rise .T11 button:not([aria-pressed="true"]):hover .lb { transform: translateY(-1.6em); clip-path: inset(1.6em 0 -1.6em 0); }
  .hs-rise .T12:hover { border-color: var(--fg-1); }
}
```

#### H4 테두리 그리기

테두리가 12시부터 시계 방향으로 그려진다. 비운 버튼은 제 테두리 위에, 채운 버튼은 3px 바깥에 링이 그려진다.

- 클래스: `.hs-draw`
- 근거: [G-14 테두리 그리기 / 드러내기](#g-14-테두리-그리기--드러내기)

```css
/* H4 테두리 그리기 — ::before 를 conic-gradient 링으로 쓰고 각도 --hs-a 를 0→360deg (G-14). 각도를 전환하려면 @property 등록이 필요하다(미지원 브라우저는 즉시 그려짐).
 * 마스크 두 장(content-box, border-box)을 exclude 로 겹쳐 padding 2px 링만 남긴다. 비운 버튼은 제 테두리 위(inset -1px), 채운 버튼·켜진 T09·T12 는 3px 바깥(inset -6px)이라 .mb 의 overflow 를 연다. 상태 변화라 --m-state-* */
@property --hs-a { syntax: "<angle>"; inherits: false; initial-value: 0deg; }
.hs-draw .mb { overflow: visible; }
.hs-draw .mb::before, .hs-draw .T11 button::before, .hs-draw .T12::before, .hs-draw .T12.is-on::before { padding: 2px; opacity: 1; background: conic-gradient(var(--fg-1) var(--hs-a), transparent 0); mask-image: linear-gradient(var(--fg-1) 0 0), linear-gradient(var(--fg-1) 0 0); mask-clip: content-box, border-box; mask-composite: exclude; transition: --hs-a var(--m-state-dur) var(--m-state-ease); }
.hs-draw .mb::before, .hs-draw .T12::before { inset: -1px; }
.hs-draw .mb:not(.mb--line, .mb--ghost)::before, .hs-draw .T09.is-on::before, .hs-draw .T12.is-on::before { inset: -6px; }
.hs-draw .mb:not(.mb--line, .mb--ghost, .mb--icon)::before { border-radius: calc(var(--radius-md) + 5px); }
@media (hover: hover) and (pointer: fine) {
  .hs-draw .mb:not(:disabled):hover::before, .hs-draw .T11 button:not([aria-pressed="true"]):hover::before, .hs-draw .T12:hover::before { --hs-a: 360deg; }
}
```

#### H5 들어올림

2px 떠오르며 그림자가 깊어지고 테두리가 진해진다. 누르면 내려앉으며 그림자가 얕아진다.

- 클래스: `.hs-lift`
- 근거: [G-02 들림 + 그림자 깊어짐](#g-02-들림--그림자-깊어짐) · [G-66 3D 눌리는 버튼 (Pushable)](#g-66-3d-눌리는-버튼-pushable)

```css
/* H5 들어올림 — 호버 translateY(-2px) + --shadow-md + 테두리 --fg-1, 누르면 translateY(0) + --shadow-sm + 누름 스케일 (G-02·G-66). 떠오름은 공간 이동이라 --m-move-*.
 * 포커스 링도 box-shadow 라 호버·누름 그림자와 겹쳐 쓴다. T13 항목은 열림 상태의 transform 을 이기도록 따로 적는다 */
.hs-lift .mb { transition: transform var(--m-move-dur) var(--m-move-ease), box-shadow var(--m-move-dur) var(--m-move-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }
.hs-lift .T11 button { transition: color var(--m-hover-dur) var(--m-hover-ease), background-color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-move-dur) var(--m-move-ease), box-shadow var(--m-move-dur) var(--m-move-ease); }
.hs-lift .T12 { transition: background-color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-move-dur) var(--m-move-ease), box-shadow var(--m-move-dur) var(--m-move-ease); }
@media (hover: hover) and (pointer: fine) {
  .hs-lift .mb:not(:disabled):hover, .hs-lift .T12:hover { transform: translateY(-2px); box-shadow: var(--shadow-md); border-color: var(--fg-1); }
  .hs-lift .mb:not(:disabled):focus-visible:hover, .hs-lift .T12:focus-visible:hover { box-shadow: 0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1), var(--shadow-md); }
  .hs-lift .T13.is-open .T13-items .mb:hover:not(:active) { transform: translateY(-2px); }
  .hs-lift .T11 button:not([aria-pressed="true"]):hover { transform: translateY(-2px); background-color: var(--bg-1); box-shadow: var(--shadow-md); }
}
.hs-lift .mb:not(:disabled):active { transform: translateY(0) scale(var(--m-press-scale)); box-shadow: var(--shadow-sm); transition: transform var(--m-press-dur) var(--m-press-ease), box-shadow var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }
.hs-lift .T12:active { transform: translateY(0); box-shadow: var(--shadow-sm); }
.hs-lift .mb:not(:disabled):focus-visible:active, .hs-lift .T12:focus-visible:active { box-shadow: 0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1), var(--shadow-sm); }
.hs-lift .T11 button:not([aria-pressed="true"]):active { transform: translateY(0) scale(var(--m-press-scale)); box-shadow: var(--shadow-sm); }
```

#### H6 밀림

기존 방식. 글자색 상태 레이어가 깔리고, 화살표·트레일링 아이콘이 가리키는 쪽으로 --m-nudge 만큼 밀린다. 선 버튼은 테두리가, 고스트는 밑줄이 진해진다.

- 클래스: `.hs-nudge`
- 근거: [G-04 M3 상태 레이어](#g-04-m3-상태-레이어) · [C-01 넛지 앤 리턴 (한 번)](#c-01-넛지-앤-리턴-한-번)

```css
/* H6 밀림 — 기존 세트 방식: 상태 레이어(::before 를 글자색으로 --m-layer-* 만큼) + 화살표·트레일링 아이콘이 가리키는 쪽으로 --m-nudge.
 * T02 테두리 진해짐, T03 밑줄, T04 원형 레이어 확대도 여기에만 있다 */
.hs-nudge .mb:not(:disabled):active::before { opacity: var(--m-layer-press); }
.hs-nudge .T03::before { display: none; }
.hs-nudge .T03 .lb { background: linear-gradient(currentColor, currentColor) left bottom / 0% 1px no-repeat; padding-bottom: 2px; transition: background-size var(--m-hover-dur) var(--m-hover-ease); }
.hs-nudge .T03:focus-visible .lb { background-size: 100% 1px; }
.hs-nudge .T04::before { transform: scale(.6); transition: opacity var(--m-hover-dur) var(--m-hover-ease), transform var(--m-move-dur) var(--m-move-ease); }
.hs-nudge .T04:active::before { transform: scale(1); }
.hs-nudge :is(.T05, .T06, .T15) .ic { transition: transform var(--m-nudge-dur) var(--m-nudge-ease); }
@media (hover: hover) and (pointer: fine) {
  .hs-nudge .mb:not(:disabled):hover::before, .hs-nudge .T11 button:not([aria-pressed="true"]):hover::before, .hs-nudge .T12:hover::before { opacity: var(--m-layer-hover); }
  .hs-nudge .T02:not(:disabled):hover, .hs-nudge .T12:hover { border-color: var(--fg-1); }
  .hs-nudge .T03:hover .lb { background-size: 100% 1px; }
  .hs-nudge .T04:hover::before { transform: scale(1); }
  .hs-nudge .T05-b:first-child:hover .ic, .hs-nudge .T15-b[data-prev]:not(:disabled):hover .ic { transform: translateX(calc(var(--m-nudge) * -1)); }
  .hs-nudge .T05-b:last-child:hover .ic, .hs-nudge .T06:hover .ic, .hs-nudge .T15-b[data-next]:not(:disabled):hover .ic { transform: translateX(var(--m-nudge)); }
}
```

### 타이밍 세트 비교

| 변수 | 뜻 | S1 크리스프 | S2 실크 | S3 스프링 | S4 에디토리얼 |
|---|---|---|---|---|---|
| `--m-hover-dur` | 호버 색·상태 레이어 전환 시간 | `70ms` | `var(--duration-fast)` | `150ms` | `240ms` |
| `--m-hover-ease` | 호버 곡선 | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `var(--ease-out)` | `ease` | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| `--m-press-scale` | 누를 때 크기 (세트 전체 공통) | `0.97` | `0.98` | `0.95` | `0.99` |
| `--m-press-dur` | 누를 때 전환 시간 | `70ms` | `150ms` | `350ms` | `150ms` |
| `--m-press-ease` | 누를 때 곡선 | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `var(--ease-out)` | `linear(0, 0.099 5%, 0.317 10%, 0.561 15%, 0.775 20%, 0.934 25%, 1.034 30%, 1.083 35%, 1.095 40%, 1.084 45%, 1.063 50%, 1.04 55%, 1.02 60%, 1.005 65%, 0.996 70%, 0.992 75%, 0.991 80%, 0.992 85%, 0.994 90%, 0.996 95%, 1)` | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| `--m-release-dur` | 뗄 때 돌아오는 시간 | `110ms` | `var(--duration-base)` | `400ms` | `240ms` |
| `--m-release-ease` | 뗄 때 곡선 | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `var(--ease-out)` | `linear(0, 0.062 5%, 0.199 10%, 0.363 15%, 0.521 20%, 0.66 25%, 0.772 30%, 0.858 35%, 0.919 40%, 0.961 45%, 0.988 50%, 1.004 55%, 1.012 60%, 1.015 65%, 1.015 70%, 1.013 75%, 1.011 80%, 1.008 85%, 1.006 90%, 1.004 95%, 1)` | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| `--m-focus-dur` | 포커스 링 등장 시간 | `0ms` | `100ms` | `0ms` | `150ms` |
| `--m-state-dur` | 로딩·성공·복사 등 상태 변화 시간 | `150ms` | `var(--duration-base)` | `700ms` | `400ms` |
| `--m-state-ease` | 상태 변화 곡선 | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `var(--ease-out)` | `linear(0, 0.056 4.2%, 0.188 8.3%, 0.351 12.5%, 0.517 16.7%, 0.666 20.8%, 0.79 25%, 0.886 29.2%, 0.955 33.3%, 1.001 37.5%, 1.029 41.7%, 1.042 45.8%, 1.046 50%, 1.043 54.2%, 1.037 58.3%, 1.03 62.5%, 1.022 66.7%, 1.015 70.8%, 1.01 75%, 1.005 79.2%, 1.002 83.3%, 1 87.5%, 0.999 91.7%, 0.998 95.8%, 1)` | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| `--m-enter-dur` | 메뉴·툴팁 등장 시간 | `150ms` | `200ms` | `400ms` | `240ms` |
| `--m-enter-ease` | 등장 곡선 | `cubic-bezier(0, 0, 0.38, 0.9)` | `var(--ease-out)` | `linear(0, 0.062 5%, 0.199 10%, 0.363 15%, 0.521 20%, 0.66 25%, 0.772 30%, 0.858 35%, 0.919 40%, 0.961 45%, 0.988 50%, 1.004 55%, 1.012 60%, 1.015 65%, 1.015 70%, 1.013 75%, 1.011 80%, 1.008 85%, 1.006 90%, 1.004 95%, 1)` | `cubic-bezier(0, 0, 0.3, 1)` |
| `--m-enter-scale` | 등장 시작 크기 (트리거 쪽 기준) | `0.97` | `0.95` | `0.9` | `1` |
| `--m-enter-y` | 등장 시작 세로 이동 | `0px` | `0px` | `0px` | `4px` |
| `--m-exit-dur` | 퇴장 시간 (등장의 약 0.75배) | `110ms` | `150ms` | `150ms` | `150ms` |
| `--m-exit-ease` | 퇴장 곡선 | `cubic-bezier(0.2, 0, 1, 0.9)` | `var(--ease-out)` | `ease` | `cubic-bezier(0.4, 0.14, 1, 1)` |
| `--m-move-dur` | 인디케이터·스위치·회전 등 공간 이동 시간 | `110ms` | `var(--duration-base)` | `350ms` | `400ms` |
| `--m-move-ease` | 공간 이동 곡선 (스프링 세트만 오버슈트) | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `var(--ease-out)` | `linear(0, 0.099 5%, 0.317 10%, 0.561 15%, 0.775 20%, 0.934 25%, 1.034 30%, 1.083 35%, 1.095 40%, 1.084 45%, 1.063 50%, 1.04 55%, 1.02 60%, 1.005 65%, 0.996 70%, 0.992 75%, 0.991 80%, 0.992 85%, 0.994 90%, 0.996 95%, 1)` | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| `--m-nudge` | 화살표·트레일링 아이콘 밀림 거리 (세트 전체 공통) | `2px` | `3px` | `4px` | `6px` |
| `--m-nudge-dur` | 밀림 시간 | `70ms` | `var(--duration-fast)` | `350ms` | `400ms` |
| `--m-nudge-ease` | 밀림 곡선 | `cubic-bezier(0.2, 0, 0.38, 0.9)` | `var(--ease-out)` | `linear(0, 0.099 5%, 0.317 10%, 0.561 15%, 0.775 20%, 0.934 25%, 1.034 30%, 1.083 35%, 1.095 40%, 1.084 45%, 1.063 50%, 1.04 55%, 1.02 60%, 1.005 65%, 0.996 70%, 0.992 75%, 0.991 80%, 0.992 85%, 0.994 90%, 0.996 95%, 1)` | `cubic-bezier(0.4, 0.14, 0.3, 1)` |
| `--m-layer-hover` | 호버 상태 레이어 불투명도 (M3: 8%) | `0.08` | `0.08` | `0.08` | `0.08` |
| `--m-layer-press` | 누름 상태 레이어 불투명도 (M3: 10%) | `0.1` | `0.1` | `0.1` | `0.1` |

### S1 크리스프

- 느낌: 즉각적이고 도구 같은 느낌. 오버슈트 없음.
- 쓰는 곳: 대시보드·테이블·어드민·키보드 많이 쓰는 앱, 페이지네이션
- 근거: [IBM Carbon productive 곡선·duration](https://carbondesignsystem.com/elements/motion/overview/) · [Atlassian: 하루 수십 번 누르는 건 150ms 미만](https://atlassian.design/foundations/motion) · [Emil Kowalski: 누름 0.97](https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md)

```css
:root {
  --m-hover-dur: 70ms; /* 호버 색·상태 레이어 전환 시간 */
  --m-hover-ease: cubic-bezier(0.2, 0, 0.38, 0.9); /* 호버 곡선 */
  --m-press-scale: 0.97; /* 누를 때 크기 (세트 전체 공통) */
  --m-press-dur: 70ms; /* 누를 때 전환 시간 */
  --m-press-ease: cubic-bezier(0.2, 0, 0.38, 0.9); /* 누를 때 곡선 */
  --m-release-dur: 110ms; /* 뗄 때 돌아오는 시간 */
  --m-release-ease: cubic-bezier(0.2, 0, 0.38, 0.9); /* 뗄 때 곡선 */
  --m-focus-dur: 0ms; /* 포커스 링 등장 시간 */
  --m-state-dur: 150ms; /* 로딩·성공·복사 등 상태 변화 시간 */
  --m-state-ease: cubic-bezier(0.2, 0, 0.38, 0.9); /* 상태 변화 곡선 */
  --m-enter-dur: 150ms; /* 메뉴·툴팁 등장 시간 */
  --m-enter-ease: cubic-bezier(0, 0, 0.38, 0.9); /* 등장 곡선 */
  --m-enter-scale: 0.97; /* 등장 시작 크기 (트리거 쪽 기준) */
  --m-enter-y: 0px; /* 등장 시작 세로 이동 */
  --m-exit-dur: 110ms; /* 퇴장 시간 (등장의 약 0.75배) */
  --m-exit-ease: cubic-bezier(0.2, 0, 1, 0.9); /* 퇴장 곡선 */
  --m-move-dur: 110ms; /* 인디케이터·스위치·회전 등 공간 이동 시간 */
  --m-move-ease: cubic-bezier(0.2, 0, 0.38, 0.9); /* 공간 이동 곡선 (스프링 세트만 오버슈트) */
  --m-nudge: 2px; /* 화살표·트레일링 아이콘 밀림 거리 (세트 전체 공통) */
  --m-nudge-dur: 70ms; /* 밀림 시간 */
  --m-nudge-ease: cubic-bezier(0.2, 0, 0.38, 0.9); /* 밀림 곡선 */
  --m-layer-hover: 0.08; /* 호버 상태 레이어 불투명도 (M3: 8%) */
  --m-layer-press: 0.1; /* 누름 상태 레이어 불투명도 (M3: 10%) */
}
```

### S2 실크

- 느낌: 빠르게 출발해서 길고 부드럽게 멈춤. 바운스 없음.
- 쓰는 곳: 프리미엄 소비자·핀테크, 설정, 제품 CTA, 캐러셀. 도감 기본 모션 토큰(--ease-out, --duration-fast/base)을 그대로 쓴다.
- 근거: 도감 토큰 --ease-out · --duration-fast/base (assets/tokens.css) · [Emil Kowalski strong ease-out · 누름 0.95–0.98](https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md) · [Fluent 2 duration](https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/durations.ts) · [SwiftUI .smooth (bounce 0)](https://developer.apple.com/tutorials/data/documentation/swiftui/spring/smooth(duration:extrabounce:).json) · 리서치 Set B(200/300ms, quint-out) 대신 도감 기본 토큰(180/280ms, cubic-bezier(.16,1,.3,1))을 씀

```css
:root {
  --m-hover-dur: var(--duration-fast); /* 호버 색·상태 레이어 전환 시간 */
  --m-hover-ease: var(--ease-out); /* 호버 곡선 */
  --m-press-scale: 0.98; /* 누를 때 크기 (세트 전체 공통) */
  --m-press-dur: 150ms; /* 누를 때 전환 시간 */
  --m-press-ease: var(--ease-out); /* 누를 때 곡선 */
  --m-release-dur: var(--duration-base); /* 뗄 때 돌아오는 시간 */
  --m-release-ease: var(--ease-out); /* 뗄 때 곡선 */
  --m-focus-dur: 100ms; /* 포커스 링 등장 시간 */
  --m-state-dur: var(--duration-base); /* 로딩·성공·복사 등 상태 변화 시간 */
  --m-state-ease: var(--ease-out); /* 상태 변화 곡선 */
  --m-enter-dur: 200ms; /* 메뉴·툴팁 등장 시간 */
  --m-enter-ease: var(--ease-out); /* 등장 곡선 */
  --m-enter-scale: 0.95; /* 등장 시작 크기 (트리거 쪽 기준) */
  --m-enter-y: 0px; /* 등장 시작 세로 이동 */
  --m-exit-dur: 150ms; /* 퇴장 시간 (등장의 약 0.75배) */
  --m-exit-ease: var(--ease-out); /* 퇴장 곡선 */
  --m-move-dur: var(--duration-base); /* 인디케이터·스위치·회전 등 공간 이동 시간 */
  --m-move-ease: var(--ease-out); /* 공간 이동 곡선 (스프링 세트만 오버슈트) */
  --m-nudge: 3px; /* 화살표·트레일링 아이콘 밀림 거리 (세트 전체 공통) */
  --m-nudge-dur: var(--duration-fast); /* 밀림 시간 */
  --m-nudge-ease: var(--ease-out); /* 밀림 곡선 */
  --m-layer-hover: 0.08; /* 호버 상태 레이어 불투명도 (M3: 8%) */
  --m-layer-press: 0.1; /* 누름 상태 레이어 불투명도 (M3: 10%) */
}
```

### S3 스프링

- 느낌: 만지는 느낌, 살아 있음. 공간 이동만 살짝 튕기고 색은 튕기지 않음.
- 쓰는 곳: 소비자·소셜 앱, 온보딩, 보상, 좋아요. 촘촘한 데이터 화면엔 쓰지 않는다.
- 근거: [M3 Expressive 스프링 (spatial fast 0.6/800, default 0.8/380)](https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt) · [SwiftUI .bouncy (bounce 0.3)](https://developer.apple.com/tutorials/data/documentation/swiftui/spring/bouncy(duration:extrabounce:).json) · [WWDC23 Animate with springs: bounce 0.4 넘으면 과함](https://developer.apple.com/videos/play/wwdc2023/10158/)

```css
:root {
  --m-hover-dur: 150ms; /* 호버 색·상태 레이어 전환 시간 */
  --m-hover-ease: ease; /* 호버 곡선 */
  --m-press-scale: 0.95; /* 누를 때 크기 (세트 전체 공통) */
  --m-press-dur: 350ms; /* 누를 때 전환 시간 */
  --m-press-ease: linear(0, 0.099 5%, 0.317 10%, 0.561 15%, 0.775 20%, 0.934 25%, 1.034 30%, 1.083 35%, 1.095 40%, 1.084 45%, 1.063 50%, 1.04 55%, 1.02 60%, 1.005 65%, 0.996 70%, 0.992 75%, 0.991 80%, 0.992 85%, 0.994 90%, 0.996 95%, 1); /* 누를 때 곡선 */
  --m-release-dur: 400ms; /* 뗄 때 돌아오는 시간 */
  --m-release-ease: linear(0, 0.062 5%, 0.199 10%, 0.363 15%, 0.521 20%, 0.66 25%, 0.772 30%, 0.858 35%, 0.919 40%, 0.961 45%, 0.988 50%, 1.004 55%, 1.012 60%, 1.015 65%, 1.015 70%, 1.013 75%, 1.011 80%, 1.008 85%, 1.006 90%, 1.004 95%, 1); /* 뗄 때 곡선 */
  --m-focus-dur: 0ms; /* 포커스 링 등장 시간 */
  --m-state-dur: 700ms; /* 로딩·성공·복사 등 상태 변화 시간 */
  --m-state-ease: linear(0, 0.056 4.2%, 0.188 8.3%, 0.351 12.5%, 0.517 16.7%, 0.666 20.8%, 0.79 25%, 0.886 29.2%, 0.955 33.3%, 1.001 37.5%, 1.029 41.7%, 1.042 45.8%, 1.046 50%, 1.043 54.2%, 1.037 58.3%, 1.03 62.5%, 1.022 66.7%, 1.015 70.8%, 1.01 75%, 1.005 79.2%, 1.002 83.3%, 1 87.5%, 0.999 91.7%, 0.998 95.8%, 1); /* 상태 변화 곡선 */
  --m-enter-dur: 400ms; /* 메뉴·툴팁 등장 시간 */
  --m-enter-ease: linear(0, 0.062 5%, 0.199 10%, 0.363 15%, 0.521 20%, 0.66 25%, 0.772 30%, 0.858 35%, 0.919 40%, 0.961 45%, 0.988 50%, 1.004 55%, 1.012 60%, 1.015 65%, 1.015 70%, 1.013 75%, 1.011 80%, 1.008 85%, 1.006 90%, 1.004 95%, 1); /* 등장 곡선 */
  --m-enter-scale: 0.9; /* 등장 시작 크기 (트리거 쪽 기준) */
  --m-enter-y: 0px; /* 등장 시작 세로 이동 */
  --m-exit-dur: 150ms; /* 퇴장 시간 (등장의 약 0.75배) */
  --m-exit-ease: ease; /* 퇴장 곡선 */
  --m-move-dur: 350ms; /* 인디케이터·스위치·회전 등 공간 이동 시간 */
  --m-move-ease: linear(0, 0.099 5%, 0.317 10%, 0.561 15%, 0.775 20%, 0.934 25%, 1.034 30%, 1.083 35%, 1.095 40%, 1.084 45%, 1.063 50%, 1.04 55%, 1.02 60%, 1.005 65%, 0.996 70%, 0.992 75%, 0.991 80%, 0.992 85%, 0.994 90%, 0.996 95%, 1); /* 공간 이동 곡선 (스프링 세트만 오버슈트) */
  --m-nudge: 4px; /* 화살표·트레일링 아이콘 밀림 거리 (세트 전체 공통) */
  --m-nudge-dur: 350ms; /* 밀림 시간 */
  --m-nudge-ease: linear(0, 0.099 5%, 0.317 10%, 0.561 15%, 0.775 20%, 0.934 25%, 1.034 30%, 1.083 35%, 1.095 40%, 1.084 45%, 1.063 50%, 1.04 55%, 1.02 60%, 1.005 65%, 0.996 70%, 0.992 75%, 0.991 80%, 0.992 85%, 0.994 90%, 0.996 95%, 1); /* 밀림 곡선 */
  --m-layer-hover: 0.08; /* 호버 상태 레이어 불투명도 (M3: 8%) */
  --m-layer-press: 0.1; /* 누름 상태 레이어 불투명도 (M3: 10%) */
}
```

### S4 에디토리얼

- 느낌: 조용하고 느긋함. 바운스 없음, 작은 이동과 밑줄.
- 쓰는 곳: 롱폼 읽기, 에디토리얼·브랜드 페이지, 자주 안 누르는 CTA
- 근거: [IBM Carbon expressive 곡선·duration](https://carbondesignsystem.com/elements/motion/overview/) · [Val Head: 차분함 = 불투명도·작은 이동](https://noti.st/valhead/OrOO13) · [Salesforce Kinetics](https://v1.lightningdesignsystem.com/kinetics/choreography/making-things-move/)

```css
:root {
  --m-hover-dur: 240ms; /* 호버 색·상태 레이어 전환 시간 */
  --m-hover-ease: cubic-bezier(0.4, 0.14, 0.3, 1); /* 호버 곡선 */
  --m-press-scale: 0.99; /* 누를 때 크기 (세트 전체 공통) */
  --m-press-dur: 150ms; /* 누를 때 전환 시간 */
  --m-press-ease: cubic-bezier(0.4, 0.14, 0.3, 1); /* 누를 때 곡선 */
  --m-release-dur: 240ms; /* 뗄 때 돌아오는 시간 */
  --m-release-ease: cubic-bezier(0.4, 0.14, 0.3, 1); /* 뗄 때 곡선 */
  --m-focus-dur: 150ms; /* 포커스 링 등장 시간 */
  --m-state-dur: 400ms; /* 로딩·성공·복사 등 상태 변화 시간 */
  --m-state-ease: cubic-bezier(0.4, 0.14, 0.3, 1); /* 상태 변화 곡선 */
  --m-enter-dur: 240ms; /* 메뉴·툴팁 등장 시간 */
  --m-enter-ease: cubic-bezier(0, 0, 0.3, 1); /* 등장 곡선 */
  --m-enter-scale: 1; /* 등장 시작 크기 (트리거 쪽 기준) */
  --m-enter-y: 4px; /* 등장 시작 세로 이동 */
  --m-exit-dur: 150ms; /* 퇴장 시간 (등장의 약 0.75배) */
  --m-exit-ease: cubic-bezier(0.4, 0.14, 1, 1); /* 퇴장 곡선 */
  --m-move-dur: 400ms; /* 인디케이터·스위치·회전 등 공간 이동 시간 */
  --m-move-ease: cubic-bezier(0.4, 0.14, 0.3, 1); /* 공간 이동 곡선 (스프링 세트만 오버슈트) */
  --m-nudge: 6px; /* 화살표·트레일링 아이콘 밀림 거리 (세트 전체 공통) */
  --m-nudge-dur: 400ms; /* 밀림 시간 */
  --m-nudge-ease: cubic-bezier(0.4, 0.14, 0.3, 1); /* 밀림 곡선 */
  --m-layer-hover: 0.08; /* 호버 상태 레이어 불투명도 (M3: 8%) */
  --m-layer-press: 0.1; /* 누름 상태 레이어 불투명도 (M3: 10%) */
}
```

### 버튼 종류 (모든 스타일·타이밍 공통 마크업·CSS)

공통 베이스 CSS:

```css
/* 공통 버튼 베이스 — 모양·누름 스케일·포커스 링·비활성은 모든 스타일 공통. 호버 효과는 스타일(.hs-*)이 정한다.
 * .mb--line(선)·.mb--ghost(고스트·아이콘) = 비운 버튼, 나머지 = 채운 버튼. ::before 는 상태 레이어 자리 — 스타일이 레이어·채움·링으로 바꿔 쓴다 */
.mb { --_bg: var(--fg-1); --_fg: var(--bg-1); position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-4); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; color: var(--_fg); background: var(--_bg); border: 1px solid transparent; border-radius: var(--radius-md); cursor: pointer; isolation: isolate; overflow: hidden; -webkit-tap-highlight-color: transparent;
  transition: transform var(--m-release-dur) var(--m-release-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.mb::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: currentColor; opacity: 0; pointer-events: none; transition: opacity var(--m-hover-dur) var(--m-hover-ease); }
.mb:active { transform: scale(var(--m-press-scale)); transition: transform var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.mb:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1); }
.mb:disabled { opacity: .4; cursor: not-allowed; transform: none; }
.mb .ic { width: var(--space-5); height: var(--space-5); flex: none; }
.mb--line { --_bg: transparent; --_fg: var(--fg-1); border-color: var(--border-strong); }
.mb--ghost { --_bg: transparent; --_fg: var(--fg-1); }
.mb--icon { width: calc(var(--space-7) - var(--space-2)); padding: 0; border-radius: var(--radius-pill); }
```

#### T01 프라이머리

채운 버튼. 호버는 열(스타일)을 따르고 누름 스케일은 공통.

```html
<button type="button" class="mb T01"><span class="lb">저장하기</span></button>
```

```css
.T01 { min-width: calc(var(--space-11) - var(--space-4)); }
```

#### T02 세컨더리 (아웃라인)

선 버튼. 칠하기·스윕·차오름에선 --fg-1 로 채워지고, 밀림에선 테두리만 진해진다.

```html
<button type="button" class="mb mb--line T02"><span class="lb">취소</span></button>
```

```css
/* 모양은 .mb--line — 호버는 스타일(.hs-*)이 정한다 */
```

#### T03 고스트 (텍스트 링크)

배경·테두리 없는 텍스트 버튼(.mb--ghost). 밀림에선 밑줄이 왼쪽부터 자라고, 다른 열에선 비운 버튼처럼 칠해지거나 그려진다.

```html
<button type="button" class="mb mb--ghost T03"><span class="lb">더 알아보기</span></button>
```

```css
.T03 { padding: 0 var(--space-2); }
```

#### T04 아이콘 버튼

원형 고스트 아이콘 버튼. 밀림에선 원형 상태 레이어가 가운데서 커진다.

```html
<button type="button" class="mb mb--ghost mb--icon T04" aria-label="공유"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg></button>
```

```css
/* 모양은 .mb--ghost.mb--icon — 호버는 스타일(.hs-*)이 정한다 */
```

#### T05 화살표 페어 (이전/다음)

캐러셀·페이지 이동. 밀림 열에서만 화살표가 가리키는 쪽으로 --m-nudge 만큼 밀리고, 다른 열은 그 스타일의 버튼 효과만.

```html
<div class="T05"><button type="button" class="mb mb--line mb--icon T05-b" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="mb mb--line mb--icon T05-b" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.T05 { display: flex; gap: var(--space-2); }
```

#### T06 CTA + 트레일링 화살표

채운 CTA. 밀림 열에서만 화살표가 앞으로 밀린다(화살표 쌍과 같은 거리·시간).

```html
<button type="button" class="mb T06"><span class="lb">시작하기</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button>
```

```css
.T06 { padding-right: var(--space-3); }
```

#### T07 로딩 → 성공

눌러보기. 라벨 자리를 지키며(폭 고정) 스피너 → 체크가 그려진다.

```html
<button type="button" class="mb T07" data-behavior="sequence" data-steps="is-loading:1400,is-done:1400"><span class="T07-label"><span class="lb">결제하기</span></span><span class="T07-spin" aria-hidden="true"></span><span class="T07-ok" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></span></button>
```

```css
.T07 { min-width: calc(var(--space-11) - var(--space-2)); }
.T07-label { transition: opacity var(--m-state-dur) var(--m-hover-ease), filter var(--m-state-dur) var(--m-hover-ease); }
.T07-spin, .T07-ok { position: absolute; inset: 0; margin: auto; display: grid; place-items: center; opacity: 0; transition: opacity var(--m-state-dur) var(--m-hover-ease), transform var(--m-state-dur) var(--m-state-ease); }
.T07-spin { width: var(--space-4); height: var(--space-4); border: 2px solid currentColor; border-right-color: transparent; border-radius: var(--radius-pill); animation: T07-rot 700ms linear infinite; }
.T07-ok { transform: scale(.6); }
.T07-ok .ic { stroke-dasharray: 24; stroke-dashoffset: 24; transition: stroke-dashoffset var(--m-state-dur) var(--m-hover-ease); }
.T07.is-loading .T07-label, .T07.is-done .T07-label { opacity: 0; filter: blur(2px); }
.T07.is-loading .T07-spin { opacity: 1; }
.T07.is-done .T07-ok { opacity: 1; transform: scale(1); }
.T07.is-done .T07-ok .ic { stroke-dashoffset: 0; }
@keyframes T07-rot { to { transform: rotate(1turn); } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

#### T08 홀드 확인 (삭제)

길게 누르면 1.2초 동안 채워지고 끝까지 누르면 확정. 떼면 세트 속도로 되돌아간다. 채움 안에 반전 글자 사본이 있어 채워진 쪽 글자도 보인다. 채움형 호버(칠하기·스윕·차오름)는 누르는 동안(.is-holding) 걷혀 진행 채움이 보인다.

```html
<button type="button" class="mb mb--line T08" data-behavior="hold" data-hold="1200"><span class="T08-fill" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg><span class="T08-t">길게 눌러 삭제</span></span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg><span class="T08-t"><span class="lb">길게 눌러 삭제</span></span></button>
```

```css
.T08-fill { position: absolute; inset: 0; z-index: 1; display: flex; align-items: center; justify-content: center; gap: var(--space-2); padding: 0 var(--space-4); color: var(--bg-1); background: var(--fg-1); border-radius: inherit; clip-path: inset(0 100% 0 0); transition: clip-path var(--m-release-dur) var(--m-release-ease); }
.T08 .ic, .T08-t { transition: color var(--m-hover-dur) var(--m-hover-ease); }
.T08.is-holding .T08-fill { clip-path: inset(0); transition: clip-path 1200ms linear; }
.T08.is-done .T08-fill { clip-path: inset(0); transition: none; }
.T08.is-done { color: var(--bg-1); }
.T08.is-done .T08-t { animation: T08-pop var(--m-state-dur) var(--m-state-ease); }
@keyframes T08-pop { from { opacity: 0; transform: translateY(var(--space-1)); } }
```

```js
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
document.querySelectorAll('[data-behavior~="hold"]:not([data-hold-bound])').forEach(hold);
```

#### T09 토글 (좋아요)

누르면 채워지며 튀고 링이 퍼진다. 같은 타이밍이면 같은 튕김. 켜진 상태는 채운 버튼으로 친다(스윕·차오름은 대비 레이어, 그리기는 바깥 링).

```html
<button type="button" class="mb mb--line mb--icon T09" data-behavior="toggle" data-toggle aria-pressed="false" aria-label="좋아요"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-9-9C1.8 7.8 3.8 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.2 0 5.2 2.8 4 6-2 4.6-9 9-9 9z"/></svg><span class="T09-ring" aria-hidden="true"></span></button>
```

```css
.T09 { overflow: visible; }
.T09 .ic { transition: fill var(--m-hover-dur) var(--m-hover-ease); }
.T09.is-on { --_bg: var(--fg-1); --_fg: var(--bg-1); border-color: var(--fg-1); }
.T09.is-on .ic { fill: currentColor; animation: T09-pop var(--m-state-dur) var(--m-state-ease); }
.T09-ring { position: absolute; inset: 0; border: 2px solid var(--fg-1); border-radius: var(--radius-pill); opacity: 0; pointer-events: none; }
.T09.is-on .T09-ring { animation: T09-ring var(--m-state-dur) var(--m-hover-ease); }
@keyframes T09-pop { from { transform: scale(.6); } to { transform: scale(1); } }
@keyframes T09-ring { from { opacity: .5; transform: scale(.8); } to { opacity: 0; transform: scale(1.6); } }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

#### T10 복사

복사 아이콘이 체크로 바뀌고 툴팁이 세트의 등장 모션으로 뜬다.

```html
<button type="button" class="mb mb--line T10" data-behavior="sequence" data-steps="is-done:1600"><span class="T10-ic"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></span><span>링크 복사</span></button>
```

```css
.T10 { overflow: visible; }
.T10-ic { position: relative; width: var(--space-5); height: var(--space-5); }
.T10-ic .ic { position: absolute; inset: 0; transition: opacity var(--m-state-dur) var(--m-hover-ease), transform var(--m-state-dur) var(--m-state-ease); }
.T10-ic .ic + .ic { opacity: 0; transform: scale(.5); }
.T10.is-done .T10-ic .ic:first-child { opacity: 0; transform: scale(.5); }
.T10.is-done .T10-ic .ic + .ic { opacity: 1; transform: scale(1); }
.T10::after { content: "복사됨"; position: absolute; left: 50%; bottom: calc(100% + var(--space-2)); padding: var(--space-1) var(--space-2); font-size: var(--text-14); line-height: var(--lh-14); color: var(--bg-1); background: var(--fg-1); border-radius: var(--radius-sm); white-space: nowrap; pointer-events: none; opacity: 0; transform: translateX(-50%) translateY(var(--m-enter-y)) scale(var(--m-enter-scale)); transform-origin: bottom center; transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease); }
.T10.is-done::after { opacity: 1; transform: translateX(-50%); transition-duration: var(--m-enter-dur); transition-timing-function: var(--m-enter-ease); }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

#### T11 세그먼트 컨트롤

선택 표시가 미끄러진다(스프링 타이밍에서만 살짝 지나쳤다 돌아옴). 호버는 선택 안 된 칸에만, 선택 표시(--fg-1 채움)와 헷갈리지 않게 상태 레이어 강도로 스타일을 따른다 — 칠하기는 밀림과 같은 상태 레이어.

```html
<div class="T11" data-behavior="segmented" role="group" aria-label="기간"><span class="T11-ind" aria-hidden="true"></span><button type="button" data-seg><span class="lb">일</span></button><button type="button" data-seg><span class="lb">주</span></button><button type="button" data-seg><span class="lb">월</span></button></div>
```

```css
.T11 { position: relative; display: inline-flex; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); isolation: isolate; }
.T11-ind { position: absolute; top: var(--space-1); bottom: var(--space-1); left: 0; width: var(--seg-w, 0px); transform: translateX(var(--seg-x, 0px)); background: var(--fg-1); border-radius: var(--radius-sm); z-index: -1; }
.T11[data-ready] .T11-ind { transition: transform var(--m-move-dur) var(--m-move-ease), width var(--m-move-dur) var(--m-move-ease); }
.T11 button { position: relative; padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); color: var(--fg-2); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-release-dur) var(--m-release-ease); }
.T11 button::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--fg-1); opacity: 0; pointer-events: none; transition: opacity var(--m-hover-dur) var(--m-hover-ease); }
.T11 button[aria-pressed="true"] { color: var(--bg-1); }
@media (hover: hover) and (pointer: fine) { .T11 button:not([aria-pressed="true"]):hover { color: var(--fg-1); } }
.T11 button:active { transform: scale(var(--m-press-scale)); transition: color var(--m-hover-dur) var(--m-hover-ease), transform var(--m-press-dur) var(--m-press-ease); }
```

```js
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
document.querySelectorAll('[data-behavior~="segmented"]:not([data-segmented-bound])').forEach(segmented);
```

#### T12 스위치

손잡이가 미끄러지고, 누르는 동안 옆으로 늘어난다(스쿼시). 트랙 호버가 스타일을 따른다 — 칠하기는 켜짐 표시와 헷갈리지 않게 밀림과 같은 상태 레이어.

```html
<button type="button" class="T12" role="switch" aria-checked="false" aria-label="알림" data-behavior="toggle" data-toggle><span class="T12-thumb"></span></button>
```

```css
.T12 { position: relative; isolation: isolate; box-sizing: content-box; width: calc(var(--space-7) - var(--space-1)); height: var(--space-5); padding: 0; background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-pill); cursor: pointer; transition: background-color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }
.T12::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--fg-1); opacity: 0; pointer-events: none; transition: opacity var(--m-hover-dur) var(--m-hover-ease); }
.T12.is-on::before { background: var(--bg-1); }
.T12-thumb { position: absolute; top: 2px; left: 2px; width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); background: var(--fg-1); border-radius: var(--radius-pill); transition: transform var(--m-move-dur) var(--m-move-ease), width var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease); }
.T12:active .T12-thumb { width: var(--space-5); }
.T12.is-on { background: var(--fg-1); border-color: var(--fg-1); }
.T12.is-on .T12-thumb { background: var(--bg-1); transform: translateX(calc(var(--space-5) - var(--space-1))); }
.T12.is-on:active .T12-thumb { transform: translateX(var(--space-4)); }
.T12:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1); }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

#### T13 FAB 메뉴

+가 ×로 돌고, 항목이 30ms 간격으로 세트의 등장 모션을 따라 펼쳐진다.

```html
<div class="T13" data-behavior="menu"><div class="T13-items"><button type="button" class="mb mb--line mb--icon" aria-label="다운로드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M12 4v11"/><path class="head" d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg></button><button type="button" class="mb mb--line mb--icon" aria-label="공유"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg></button><button type="button" class="mb mb--line mb--icon" aria-label="저장"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg></button></div><button type="button" class="mb mb--icon T13-fab" data-menu-trigger aria-expanded="false" aria-label="메뉴"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg></button></div>
```

```css
.T13 { display: flex; align-items: center; gap: var(--space-2); }
.T13-items { display: flex; gap: var(--space-1); }
.T13-items .mb { width: var(--space-6); height: var(--space-6); }
.T13-items .ic { width: var(--space-4); height: var(--space-4); }
/* 항목 전환 목록이 BASE 를 덮으므로 색·테두리·그림자 전환도 같이 적는다 (스타일 호버가 끊기지 않게) */
.T13-items .mb { --_bg: var(--bg-1); opacity: 0; visibility: hidden; pointer-events: none; transform: translateX(var(--space-2)) scale(var(--m-enter-scale)); transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease), visibility 0s var(--m-exit-dur), background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.T13.is-open .T13-items .mb { opacity: 1; visibility: visible; pointer-events: auto; transform: none; transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-enter-dur) var(--m-enter-ease), visibility 0s, background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.T13.is-open .T13-items .mb:nth-child(3) { transition-delay: 0ms, 0ms, 0s, 0s, 0s, 0s, 0s; }
.T13.is-open .T13-items .mb:nth-child(2) { transition-delay: 30ms, 30ms, 0s, 0s, 0s, 0s, 0s; }
.T13.is-open .T13-items .mb:nth-child(1) { transition-delay: 60ms, 60ms, 0s, 0s, 0s, 0s, 0s; }
.T13.is-open .T13-items .mb:active { transform: scale(var(--m-press-scale)); transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-press-dur) var(--m-press-ease), visibility 0s, background-color var(--m-hover-dur) var(--m-hover-ease), color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease), box-shadow var(--m-focus-dur) var(--m-hover-ease); }
.T13-fab { width: var(--space-7); height: var(--space-7); }
.T13-fab .ic { transition: transform var(--m-move-dur) var(--m-move-ease); }
.T13.is-open .T13-fab .ic { transform: rotate(45deg); }
```

```js
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
document.querySelectorAll('[data-behavior~="menu"]:not([data-menu-bound])').forEach(menu);
```

#### T14 드롭다운

캐럿이 뒤집히고 메뉴가 트리거 쪽에서 세트의 등장 모션으로 열린다.

```html
<div class="T14" data-behavior="menu"><button type="button" class="mb mb--line T14-trig" data-menu-trigger aria-expanded="false"><span class="lb">정렬</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="T14-pop"><button type="button">최신순</button><button type="button">인기순</button><button type="button">가격순</button></div></div>
```

```css
.T14 { position: relative; align-self: start; }
.T14-trig .ic { transition: transform var(--m-move-dur) var(--m-move-ease); }
.T14.is-open .T14-trig .ic { transform: rotate(180deg); }
.T14-pop { position: absolute; top: calc(100% + var(--space-1)); left: 0; z-index: 1; display: grid; min-width: 100%; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-md); transform-origin: top left; opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(calc(var(--m-enter-y) * -1)) scale(var(--m-enter-scale)); transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease), visibility 0s var(--m-exit-dur); }
.T14.is-open .T14-pop { opacity: 1; visibility: visible; pointer-events: auto; transform: none; transition: opacity var(--m-enter-dur) var(--m-enter-ease), transform var(--m-enter-dur) var(--m-enter-ease), visibility 0s; }
.T14-pop button { padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); text-align: left; white-space: nowrap; color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color var(--m-hover-dur) var(--m-hover-ease); }
.T14-pop button:hover { background: var(--bg-2); }
```

```js
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
document.querySelectorAll('[data-behavior~="menu"]:not([data-menu-bound])').forEach(menu);
```

#### T15 페이지네이션 (카운터)

숫자는 넘기는 방향에서 들어온다. 화살표는 밀림 열에서만 T05와 같이 밀린다. 끝 페이지에서 비활성된 화살표는 어느 스타일에서도 호버 효과가 없다.

```html
<nav class="T15" data-behavior="pager" data-total="12" aria-label="페이지"><button type="button" class="mb mb--line mb--icon T15-b" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><span class="T15-label" data-label aria-live="polite"></span><button type="button" class="mb mb--line mb--icon T15-b" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></nav>
```

```css
.T15 { display: flex; align-items: center; gap: var(--space-2); }
.T15-label { min-width: var(--space-8); font-family: var(--font-mono); font-size: var(--text-14); line-height: var(--lh-14); text-align: center; color: var(--fg-1); }
.T15[data-dir="next"] .T15-label.is-anim { animation: T15-in-next var(--m-move-dur) var(--m-move-ease); }
.T15[data-dir="prev"] .T15-label.is-anim { animation: T15-in-prev var(--m-move-dur) var(--m-move-ease); }
@keyframes T15-in-next { from { opacity: 0; transform: translateX(var(--space-2)); } }
@keyframes T15-in-prev { from { opacity: 0; transform: translateX(calc(var(--space-2) * -1)); } }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

## A. 캐러셀·슬라이더

라이브러리 기본값부터 Apple·Netflix·Airbnb·YouTube 같은 실서비스까지. 배치(오버레이/바깥/하단 묶음/엣지 존)와 끝에서의 처리(흐림/숨김/루프)가 핵심 차이다.

**캐러셀 라이브러리**

### A-01 Swiper 기본 셰브론

| 항목 | 내용 |
|---|---|
| 출처 | [Swiper 11](https://cdn.jsdelivr.net/npm/swiper@11.2.10/modules/navigation.css) |
| 생김새 | 세로 가운데 오버레이, 양쪽에서 10px. 배경 없는 맨 셰브론(아이콘 폰트 또는 SVG). 27×44px(--swiper-navigation-size: 44px). 원본 색 --swiper-theme-color #007aff (여기선 슬라이드 위라 var(--bg-1)) |
| 상태 | 끝(루프 아님)에서 opacity .35 + pointer-events none. .swiper-button-hidden 은 opacity 0, .swiper-button-lock 은 스크롤할 게 없으면 숨김. a11y 모듈이 "Previous slide"/"Next slide" 라벨 부여 |
| 모션 | 끝 도달 → 불투명도 1 → .35 (전환 없이 즉시 교체) |
| 타이밍 | `전환 없음(즉시)` |
| 느낌 | 담백 · 기본값 · 배경 없음 |
| 용도 | 범용 캐러셀 · 쉽게 리컬러 |

```html
<div class="A-01" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-01 { position: absolute; inset: 0; }
.A-01 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-01 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-01 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-01 .sl:nth-child(even) { background: var(--fg-2); }
.A-01 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-01 button:disabled { cursor: default; }
.A-01 .ic { display: block; width: 24px; height: 24px; }
.A-01 .bt { position: absolute; top: 50%; margin-top: -22px; width: 27px; height: 44px; color: var(--bg-1); }
.A-01 .pv { left: 10px; }
.A-01 .nx { right: 10px; }
.A-01 .ic { width: 88px; height: 88px; stroke-width: 1.5; }
.A-01 .bt:disabled { opacity: .35; pointer-events: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-02 Splide 기본 원형

| 항목 | 내용 |
|---|---|
| 출처 | [Splide 4](https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css) |
| 생김새 | 오버레이, 양쪽에서 1em(16px). 2em(32px) 원, 배경 #ccc(여기선 var(--bg-1)), 1.2em 화살표 SVG는 #000 채움(var(--fg-1)). prev는 scaleX(-1)로 뒤집음 |
| 상태 | 기본 opacity .7, 호버 .9, 비활성 .3. focus-visible 은 3px solid #0bf 아웃라인 + 오프셋 3px. rewind 모드에서는 라벨이 "Go to first/last slide"로 바뀜 |
| 모션 | 호버 → 불투명도 .7 → .9 (전환 없이 즉시) |
| 타이밍 | `전환 없음(즉시)` |
| 느낌 | 조용함 · 담백 · 반투명 원 |
| 용도 | 범용 슬라이더 · 눈에 안 띄는 화살표 |

```html
<div class="A-02" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-02 { position: absolute; inset: 0; }
.A-02 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-02 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-02 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-02 .sl:nth-child(even) { background: var(--fg-2); }
.A-02 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-02 button:disabled { cursor: default; }
.A-02 .ic { display: block; width: 24px; height: 24px; }
.A-02 .bt { position: absolute; top: 50%; margin-top: -16px; width: 32px; height: 32px; border-radius: 50%; background: var(--bg-1); color: var(--fg-1); opacity: .7; }
.A-02 .pv { left: 16px; }
.A-02 .nx { right: 16px; }
.A-02 .ic { width: 19px; height: 19px; }
.A-02 .bt:hover { opacity: .9; }
.A-02 .bt:disabled { opacity: .3; }
.A-02 .bt:focus-visible { outline: 3px solid var(--fg-1); outline-offset: 3px; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-03 Splide 시그린/스카이블루 고스트 아이콘

| 항목 | 내용 |
|---|---|
| 출처 | [Splide 4 테마](https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/themes/splide-sea-green.min.css) |
| 생김새 | 배경 없는 2.5em(40px) 아이콘만. 채움 #20b2aa (skyblue 테마 #00bfff) — 여기선 var(--fg-3). .splide__slider 로 감싸면 -2.5em 만큼 바깥으로 이동하므로 슬라이드 바깥 여백에 배치 |
| 상태 | 호버 채움 #57e1d9 (skyblue #66d9ff) → 여기선 var(--fg-1). 비활성 .3. 포커스 아웃라인은 3px 테마 색 |
| 모션 | 호버 → 아이콘 채움색 변화 |
| 타이밍 | `0.2s linear` |
| 느낌 | 미니멀 · 브랜드 색 · 고스트 |
| 용도 | 브랜드 갤러리 · 미니멀 갤러리 |

```html
<div class="A-03" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-03 { position: absolute; inset: 0; }
.A-03 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-03 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-03 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-03 .sl:nth-child(even) { background: var(--fg-2); }
.A-03 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-03 button:disabled { cursor: default; }
.A-03 .ic { display: block; width: 24px; height: 24px; }
.A-03 .vp { inset: 0 48px; }
.A-03 .bt { position: absolute; top: 50%; margin-top: -20px; width: 40px; height: 40px; color: var(--fg-3); transition: color 200ms linear; }
.A-03 .pv { left: 4px; }
.A-03 .nx { right: 4px; }
.A-03 .ic { width: 32px; height: 32px; }
.A-03 .bt:hover:not(:disabled) { color: var(--fg-1); }
.A-03 .bt:disabled { opacity: .3; }
.A-03 .bt:focus-visible { outline: 3px solid var(--fg-1); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-04 Slick / react-slick 바깥 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [slick-carousel 1.8.1](https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css) |
| 생김새 | 슬라이드 바깥 ±25px. 20px 박스에 slick 아이콘 폰트의 ← → 글리프(20px, 흰색 — 여기선 바깥이라 var(--fg-1)). react-slick 도 같은 파일을 import 하라고 안내 |
| 상태 | 기본 opacity .75, 호버/포커스 1, 비활성 .25. 포커스 아웃라인을 제거함(접근성 구멍) |
| 모션 | 호버/포커스 → 불투명도 .75 → 1 (전환 없이 즉시) |
| 타이밍 | `전환 없음(즉시)` |
| 느낌 | 레거시 · 글리프 · 바깥 배치 |
| 용도 | jQuery/React 레거시 사이트 |

```html
<div class="A-04" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드">←</button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드">→</button></div>
```

```css
.A-04 { position: absolute; inset: 0; }
.A-04 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-04 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-04 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-04 .sl:nth-child(even) { background: var(--fg-2); }
.A-04 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-04 button:disabled { cursor: default; }
.A-04 .ic { display: block; width: 24px; height: 24px; }
.A-04 .vp { inset: 0 40px; }
.A-04 .bt { position: absolute; top: 50%; margin-top: -10px; width: 20px; height: 20px; font-size: var(--text-22); line-height: 1; color: var(--fg-1); opacity: .75; }
.A-04 .pv { left: 10px; }
.A-04 .nx { right: 10px; }
.A-04 .bt:hover, .A-04 .bt:focus { opacity: 1; }
.A-04 .bt:focus { outline: 0; }
.A-04 .bt:disabled { opacity: .25; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-05 Flickity 원형

| 항목 | 내용 |
|---|---|
| 출처 | [Flickity 2.3.0](https://cdn.jsdelivr.net/npm/flickity@2.3.0/dist/flickity.css) |
| 생김새 | 오버레이, 양쪽에서 10px. 44px 원, 배경 hsla(0,0%,100%,.75) (var(--bg-1) 75%). #333 SVG 화살표는 버튼의 60% |
| 상태 | 호버 배경이 완전 흰색(var(--bg-1))으로. 누름 opacity .6. 포커스 링 box-shadow 0 0 0 5px #19F. 비활성 opacity .3 + pointer-events none |
| 모션 | 호버/누름 → 배경 75% → 100%, 누르면 불투명도 .6 (전환 없이 즉시) |
| 타이밍 | `전환 없음(즉시)` |
| 느낌 | 터치 친화 · 반투명 · 큼직함 |
| 용도 | 사진 갤러리 · 터치 우선 UI |

```html
<div class="A-05" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-05 { position: absolute; inset: 0; }
.A-05 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-05 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-05 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-05 .sl:nth-child(even) { background: var(--fg-2); }
.A-05 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-05 button:disabled { cursor: default; }
.A-05 .ic { display: block; width: 24px; height: 24px; }
.A-05 .bt { position: absolute; top: 50%; margin-top: -22px; width: 44px; height: 44px; border-radius: 50%; background: color-mix(in srgb, var(--bg-1) 75%, transparent); color: var(--fg-1); }
.A-05 .pv { left: 10px; }
.A-05 .nx { right: 10px; }
.A-05 .ic { width: 60%; height: 60%; }
.A-05 .bt:hover:not(:disabled) { background: var(--bg-1); }
.A-05 .bt:active:not(:disabled) { opacity: .6; }
.A-05 .bt:focus-visible { outline: 0; box-shadow: 0 0 0 5px var(--fg-1); }
.A-05 .bt:disabled { opacity: .3; pointer-events: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-06 Glide.js 고스트 아웃라인

| 항목 | 내용 |
|---|---|
| 출처 | [Glide.js 3.6.0](https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.0/dist/css/glide.theme.css) |
| 생김새 | 오버레이, 양쪽에서 2em(32px). 투명한 사각형, 2px 테두리 rgba(255,255,255,.5), radius 4px, padding 9px 12px. 흰색 대문자 텍스트 + 부드러운 그림자 box-shadow 0 .25em .5em rgba(0,0,0,.1) |
| 상태 | 호버 시 테두리가 흰색 실선으로. 비활성 opacity .33. 포커스 아웃라인 제거됨(원본은 outline 제거, 데모는 2px focus-visible 링 추가) |
| 모션 | 호버/비활성 → 테두리 50% → 100%, 불투명도 .33 |
| 타이밍 | `opacity 150ms ease, border 300ms ease-in-out` |
| 느낌 | 고스트 · 텍스트형 · 또렷한 테두리 |
| 용도 | 어두운 히어로 이미지 위 화살표 |

```html
<div class="A-06" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드">이전</button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드">다음</button></div>
```

```css
.A-06 { position: absolute; inset: 0; }
.A-06 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-06 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-06 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-06 .sl:nth-child(even) { background: var(--fg-2); }
.A-06 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-06 button:disabled { cursor: default; }
.A-06 .ic { display: block; width: 24px; height: 24px; }
.A-06 .bt { position: absolute; top: 50%; margin-top: -20px; padding: 9px 12px; border: 2px solid color-mix(in srgb, var(--bg-1) 50%, transparent); border-radius: 4px; font-size: var(--text-14); text-transform: uppercase; color: var(--bg-1); box-shadow: 0 .25em .5em color-mix(in srgb, var(--fg-1) 10%, transparent); transition: opacity 150ms ease, border 300ms ease-in-out; }
.A-06 .pv { left: 32px; }
.A-06 .nx { right: 32px; }
.A-06 .bt:hover:not(:disabled) { border-color: var(--bg-1); }
.A-06 .bt:focus { outline: 0; }
.A-06 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.A-06 .bt:disabled { opacity: .33; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-07 Owl Carousel 슬라이더 아래 알약

| 항목 | 내용 |
|---|---|
| 출처 | [Owl Carousel 2.3.4](https://cdn.jsdelivr.net/npm/owl.carousel@2.3.4/dist/assets/owl.theme.default.css) |
| 생김새 | 슬라이더 아래 가운데. 14px ‹ › 텍스트의 작은 알약(span aria-label "Previous"/"Next"). 배경 #D6D6D6(var(--border-strong)), 흰 글자(var(--bg-1)), radius 3px, padding 4px 7px. .owl-nav 는 text-align center, margin-top 10px |
| 상태 | 호버 배경 #869791 (여기선 var(--fg-3)). 비활성 opacity .5 |
| 모션 | 호버 → 배경색 교체 (전환 없이 즉시) |
| 타이밍 | `전환 없음(즉시)` |
| 느낌 | 작음 · 무게감 낮음 · 아래 배치 |
| 용도 | 단순 콘텐츠 행 |

```html
<div class="A-07" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><div class="nav"><button type="button" class="bt pv" data-prev aria-label="이전"><span class="g">‹</span></button><button type="button" class="bt nx" data-next aria-label="다음"><span class="g">›</span></button></div></div>
```

```css
.A-07 { position: absolute; inset: 0; }
.A-07 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-07 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-07 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-07 .sl:nth-child(even) { background: var(--fg-2); }
.A-07 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-07 button:disabled { cursor: default; }
.A-07 .ic { display: block; width: 24px; height: 24px; }
.A-07 .vp { inset: 0 0 44px; }
.A-07 .nav { position: absolute; left: 0; right: 0; bottom: 8px; display: flex; justify-content: center; gap: 5px; margin-top: 10px; }
.A-07 .bt { padding: 4px 7px; border-radius: 3px; font-size: var(--text-14); line-height: 1; background: var(--border-strong); color: var(--bg-1); }
.A-07 .bt:hover:not(:disabled) { background: var(--fg-3); }
.A-07 .bt:disabled { opacity: .5; }
/* 광학 보정: ‹ › 글리프 잉크 폭 ≈ .3em, 1/6 ≈ .05em 만큼 가리키는 쪽으로 (빈 쪽이 가볍게 보이는 것 상쇄) */
.A-07 .g { display: inline-block; }
.A-07 .pv .g { translate: calc(var(--optical, 1) * -0.05em) 0; }
.A-07 .nx .g { translate: calc(var(--optical, 1) * 0.05em) 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-08 Glider.js 맨 글리프

| 항목 | 내용 |
|---|---|
| 출처 | [Glider.js 1.7.9](https://cdn.jsdelivr.net/npm/glider-js@1.7.9/glider.css) |
| 생김새 | 바깥 -23px, top 30%. 40px «/» 텍스트 #666(var(--fg-3)), 배경 없음 (여기선 글자 크기를 DS 스케일의 var(--text-36)으로 근사). 데모 마크업은 « » 사용 |
| 상태 | 호버/포커스 색 #a89cc8(라벤더) → 여기선 var(--fg-1). 비활성 opacity .25 |
| 모션 | 호버/포커스 → 글리프 색 천천히 변화, 비활성은 불투명도 .25 |
| 타이밍 | `opacity .5s, color .5s cubic-bezier(.17,.67,.83,.67)` |
| 느낌 | 느리고 부드러운 · 타이포그래피 · 에디토리얼 |
| 용도 | 에디토리얼/타이포 중심 레이아웃 |

```html
<div class="A-08" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><span class="g">«</span></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><span class="g">»</span></button></div>
```

```css
.A-08 { position: absolute; inset: 0; }
.A-08 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-08 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-08 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-08 .sl:nth-child(even) { background: var(--fg-2); }
.A-08 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-08 button:disabled { cursor: default; }
.A-08 .ic { display: block; width: 24px; height: 24px; }
.A-08 .vp { inset: 0 44px; }
.A-08 .bt { position: absolute; top: 30%; width: 40px; height: 40px; font-size: var(--text-36); line-height: 1; color: var(--fg-3); transition: opacity .5s, color .5s cubic-bezier(.17,.67,.83,.67); }
.A-08 .pv { left: 2px; }
.A-08 .nx { right: 2px; }
.A-08 .bt:hover:not(:disabled), .A-08 .bt:focus-visible { color: var(--fg-1); }
.A-08 .bt:disabled { opacity: .25; }
/* 광학 보정: « » 글리프 잉크 폭 ≈ .6em, 1/6 ≈ .1em 만큼 가리키는 쪽으로 */
.A-08 .g { display: inline-block; }
.A-08 .pv .g { translate: calc(var(--optical, 1) * -0.1em) 0; }
.A-08 .nx .g { translate: calc(var(--optical, 1) * 0.1em) 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-09 Keen-slider 굵은 셰브론

| 항목 | 내용 |
|---|---|
| 출처 | [Keen-slider 6](https://github.com/rcbyr/keen-slider-sandboxes/blob/v6/navigation-controls/arrows-and-dots/javascript/styles.css) |
| 생김새 | 오버레이, 양쪽에서 5px. 컨테이너 없는 30px 흰색 채움 SVG 셰브론(var(--bg-1)) |
| 상태 | 비활성이면 채움이 회색(grey)으로 교체 (여기선 var(--fg-4)) |
| 모션 | 끝 도달 → 채움색 흰색 → 회색 (전환 없이 즉시) |
| 타이밍 | `전환 없음(즉시)` |
| 느낌 | 굵음 · 컨테이너 없음 · 단순 |
| 용도 | 풀블리드 이미지 슬라이더 |

```html
<div class="A-09" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-09 { position: absolute; inset: 0; }
.A-09 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-09 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-09 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-09 .sl:nth-child(even) { background: var(--fg-2); }
.A-09 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-09 button:disabled { cursor: default; }
.A-09 .ic { display: block; width: 24px; height: 24px; }
.A-09 .bt { position: absolute; top: 50%; margin-top: -15px; width: 30px; height: 30px; color: var(--bg-1); }
.A-09 .pv { left: 5px; }
.A-09 .nx { right: 5px; }
.A-09 .ic { width: 30px; height: 30px; stroke-width: 3; }
.A-09 .bt:disabled { color: var(--fg-4); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-10 Embla 뷰포트 아래 아웃라인 원

| 항목 | 내용 |
|---|---|
| 출처 | [Embla Carousel](https://github.com/davidjerleke/embla-carousel/blob/master/website/src/content/v9/examples/examples-carousel-styles.ts) |
| 생김새 | 슬라이드 아래 컨트롤 그리드(왼쪽 아래 화살표, 오른쪽 점, margin-top 1.8rem, grid-template-columns auto 1fr). 3.6rem 원(루트 62.5% 기준 36px), 투명 + 안쪽 테두리 inset 0 0 0 .2rem. 아이콘은 버튼의 35% |
| 상태 | 비활성이면 아이콘이 고대비 디테일 색으로 바뀜. 공식 가이드 스니펫은 opacity .3 + cursor not-allowed |
| 모션 | 끝 도달 → 아이콘 색 변경 |
| 타이밍 | `전환 없음` |
| 느낌 | 깔끔한 가장자리 · 오버레이 없음 · 아웃라인 |
| 용도 | 콘텐츠 캐러셀 · 가장자리가 깨끗해야 하는 곳 |

```html
<div class="A-10" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><div class="ctl"><div class="arrows"><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div><div data-dots></div></div></div>
```

```css
.A-10 { position: absolute; inset: 0; }
.A-10 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-10 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-10 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-10 .sl:nth-child(even) { background: var(--fg-2); }
.A-10 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-10 button:disabled { cursor: default; }
.A-10 .ic { display: block; width: 24px; height: 24px; }
.A-10 .vp { inset: 8px 12px 68px; border-radius: var(--radius-md); }
.A-10 .ctl { position: absolute; left: 12px; right: 12px; bottom: 12px; display: grid; grid-template-columns: auto 1fr; align-items: center; }
.A-10 .arrows { display: flex; gap: var(--space-2); }
.A-10 .bt { width: 36px; height: 36px; border-radius: 50%; color: var(--fg-1); box-shadow: inset 0 0 0 2px var(--border-strong); }
.A-10 .ic { width: 35%; height: 35%; }
.A-10 .bt:disabled { color: var(--fg-4); cursor: not-allowed; }
.A-10 [data-dots] { display: flex; justify-self: end; gap: var(--space-2); }
.A-10 [data-dots] button { width: 14px; height: 14px; border-radius: 50%; box-shadow: inset 0 0 0 2px var(--border-strong); }
.A-10 [data-dots] button[aria-current="true"] { box-shadow: inset 0 0 0 2px var(--fg-1); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-11 Swiffy 슬라이더 변형 매트릭스(round)

| 항목 | 내용 |
|---|---|
| 출처 | [Swiffy Slider 1.6.0](https://cdn.jsdelivr.net/npm/swiffy-slider@1.6.0/dist/css/swiffy-slider.css) |
| 생김새 | 전체 높이 사이드 존 + 3rem 마스크 SVG 아이콘. 아이콘 5종(기본 셰브론·화살표·얇은 셰브론·캐럿·채운 캐럿). round/square 는 3rem 흰 판 뒤에 2rem 어두운 긴 화살표. dark 는 색 반전, sm 은 .75배, outside/outside-expand 는 3.5rem 거터로 바깥 배치. 여기선 round 변형만 재현 |
| 상태 | 원본은 슬라이더에 호버하기 전까지 visibility:hidden(데모는 키보드 접근을 위해 opacity 0 + pointer-events none으로 숨기고 호버/포커스 시 표시). opacity .8, 화살표 호버 1. autohide 는 첫/끝 슬라이드에서 숨김, nav-visible 은 항상 표시, nav-touch 는 호버 없는 기기에서 표시 |
| 모션 | 슬라이더 호버 → 화살표 나타남(visibility), 호버 시 불투명도 .8 → 1 |
| 타이밍 | `visibility .1s, opacity .2s linear, filter drop-shadow(0 0 .5rem rgba(0,0,0,.5))` |
| 느낌 | 프로토타입 키트 · 호버로 등장 · 판(plate) |
| 용도 | 변형을 나란히 비교하는 프로토타이핑 |

```html
<div class="A-11" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><span class="pl"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M22 12H2"/><path class="head" d="M8 6l-6 6 6 6"/></svg></span></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><span class="pl"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M2 12h20"/><path class="head" d="M16 6l6 6-6 6"/></svg></span></button></div>
```

```css
.A-11 { position: absolute; inset: 0; }
.A-11 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-11 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-11 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-11 .sl:nth-child(even) { background: var(--fg-2); }
.A-11 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-11 button:disabled { cursor: default; }
.A-11 .ic { display: block; width: 24px; height: 24px; }
.A-11 .bt { position: absolute; top: 0; bottom: 0; width: 4rem; opacity: 0; pointer-events: none; color: var(--fg-1); filter: drop-shadow(0 0 .5rem color-mix(in srgb, var(--fg-1) 50%, transparent)); transition: visibility .1s, opacity .2s linear; }
.A-11 .pv { left: 0; }
.A-11 .nx { right: 0; }
.A-11 .pl { display: grid; place-items: center; width: 3rem; height: 3rem; border-radius: 50%; background: var(--bg-1); }
.A-11 .ic { width: 2rem; height: 2rem; }
.A-11:hover .bt, .A-11:has(.bt:focus-visible) .bt { opacity: .8; pointer-events: auto; }
.A-11 .bt:hover { opacity: 1; }
.A-11:hover .bt:disabled, .A-11:has(.bt:focus-visible) .bt:disabled { opacity: 0; pointer-events: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-12 Tiny Slider 데모 텍스트 버튼

| 항목 | 내용 |
|---|---|
| 출처 | [Tiny Slider](https://github.com/ganlanyuan/tiny-slider/blob/master/demo/css/styles.css) |
| 생김새 | (a) 기본 .tns-controls: 슬라이더 위 가운데 텍스트 버튼, 높이 2.5em, 배경 #66CCFF(여기선 var(--fg-1) 반전), radius 3px. (b) 커스텀 .controls li: 가장자리의 60px 높이 이미지 화살표 존. 여기선 (a) 재현 |
| 상태 | 비활성 배경 #B3B3B3, 글자 #999, not-allowed 커서. 커스텀 존은 호버 시 #f2f2f2 배경 |
| 모션 | 호버 → 배경색 변화 |
| 타이밍 | `transition: background 0.3s` |
| 느낌 | 로파이 · 유틸리티 · 텍스트 버튼 |
| 용도 | 로파이/유틸리티 UI |

```html
<div class="A-12" data-behavior="carousel"><div class="ctl"><button type="button" class="bt pv" data-prev aria-label="이전">이전</button><button type="button" class="bt nx" data-next aria-label="다음">다음</button></div><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div></div>
```

```css
.A-12 { position: absolute; inset: 0; }
.A-12 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-12 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-12 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-12 .sl:nth-child(even) { background: var(--fg-2); }
.A-12 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-12 button:disabled { cursor: default; }
.A-12 .ic { display: block; width: 24px; height: 24px; }
.A-12 .vp { inset: 48px 0 0; }
.A-12 .ctl { position: absolute; top: 4px; left: 0; right: 0; display: flex; justify-content: center; }
.A-12 .bt { height: 40px; margin: 0 5px; padding: 0 1em; border-radius: 3px; font-size: var(--text-14); background: var(--fg-1); color: var(--bg-1); transition: background 0.3s; }
.A-12 .bt:hover:not(:disabled) { background: var(--fg-3); }
.A-12 .bt:disabled { background: var(--border); color: var(--fg-4); cursor: not-allowed; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

**UI 프레임워크·디자인 시스템**

### A-13 Bootstrap 5 전체 높이 사이드 존

| 항목 | 내용 |
|---|---|
| 출처 | [Bootstrap 5.3.3](https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.css) |
| 생김새 | 양쪽 가장자리를 덮는 폭 15%의 보이지 않는 히트 존(전체 높이). 가운데에 2rem 흰 셰브론. .carousel-dark 는 filter:invert(1) grayscale(100) 으로 검정 아이콘 |
| 상태 | 기본 opacity .5, 호버/포커스 .9. 기본이 래핑이라 비활성이 없음. .visually-hidden "Previous"/"Next" |
| 모션 | 호버/포커스 → 불투명도 .5 → .9 |
| 타이밍 | `transition: opacity .15s ease (prefers-reduced-motion 이면 끔)` |
| 느낌 | 넓은 히트 영역 · 담백 · 루프 |
| 용도 | 히어로 배너 · 큰 터치 영역이 필요한 곳 |

```html
<div class="A-13" data-behavior="carousel" data-loop><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-13 { position: absolute; inset: 0; }
.A-13 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-13 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-13 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-13 .sl:nth-child(even) { background: var(--fg-2); }
.A-13 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-13 button:disabled { cursor: default; }
.A-13 .ic { display: block; width: 24px; height: 24px; }
.A-13 .bt { position: absolute; top: 0; bottom: 0; width: 15%; color: var(--bg-1); opacity: .5; transition: opacity .15s ease; }
.A-13 .pv { left: 0; }
.A-13 .nx { right: 0; }
.A-13 .ic { width: 32px; height: 32px; stroke-width: 3; }
.A-13 .bt:hover, .A-13 .bt:focus-visible { opacity: .9; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-14 Webflow 슬라이더 존

| 항목 | 내용 |
|---|---|
| 출처 | [Webflow 기본 CSS](https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/css/flowbase-stage.shared.e97707000.min.css) |
| 생김새 | 폭 80px 전체 높이 존(inset:0; margin:auto). 흰색 40px 아이콘 폰트 셰브론(var(--bg-1)) |
| 상태 | 원본은 :focus{outline:0} (접근성 구멍, 데모는 2px focus-visible 링 추가). 기본 호버 스타일 없음 |
| 모션 | 없음 → 호버·포커스 변화 없음 |
| 타이밍 | `전환 없음` |
| 느낌 | 노코드 기본 · 변화 없음 · 큰 존 |
| 용도 | 노코드 히어로 슬라이더 |

```html
<div class="A-14" data-behavior="carousel" data-loop><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-14 { position: absolute; inset: 0; }
.A-14 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-14 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-14 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-14 .sl:nth-child(even) { background: var(--fg-2); }
.A-14 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-14 button:disabled { cursor: default; }
.A-14 .ic { display: block; width: 24px; height: 24px; }
.A-14 .bt { position: absolute; top: 0; bottom: 0; width: 80px; color: var(--bg-1); }
.A-14 .pv { left: 0; }
.A-14 .nx { right: 0; }
.A-14 .ic { width: 40px; height: 40px; }
.A-14 .bt:focus { outline: 0; }
.A-14 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -4px; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-15 Flowbite 반투명 판 + 전체 높이 존

| 항목 | 내용 |
|---|---|
| 출처 | [Flowbite](https://github.com/themesberg/flowbite/blob/main/content/components/carousel.md) |
| 생김새 | 버튼은 양쪽 가장자리의 투명한 전체 높이 존(px-4 = 16px). 안에 40px 판(현재 문서는 rounded-base), bg-white/30 (다크 gray-800/30), 20px 셰브론 stroke 2 |
| 상태 | group-hover 판 white/50, group-focus ring-4 ring-white, sr-only "Previous", RTL 에서 반전 |
| 모션 | 호버 → 판 투명도 30% → 50% |
| 타이밍 | `전환 클래스 없음 → 즉시` (추정) |
| 느낌 | 반투명 · 판 · 큰 존 |
| 용도 | Tailwind 히어로 캐러셀(사진 위) |

```html
<div class="A-15" data-behavior="carousel" data-loop><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><span class="pl"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><span class="pl"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span></button></div>
```

```css
.A-15 { position: absolute; inset: 0; }
.A-15 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-15 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-15 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-15 .sl:nth-child(even) { background: var(--fg-2); }
.A-15 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-15 button:disabled { cursor: default; }
.A-15 .ic { display: block; width: 24px; height: 24px; }
.A-15 .bt { position: absolute; top: 0; bottom: 0; padding: 0 16px; }
.A-15 .pv { left: 0; }
.A-15 .nx { right: 0; }
.A-15 .pl { display: grid; place-items: center; width: 40px; height: 40px; border-radius: var(--radius-md); background: color-mix(in srgb, var(--bg-1) 30%, transparent); color: var(--bg-1); }
.A-15 .ic { width: 20px; height: 20px; }
.A-15 .bt:hover .pl { background: color-mix(in srgb, var(--bg-1) 50%, transparent); }
.A-15 .bt:focus { outline: 0; }
.A-15 .bt:focus-visible .pl { box-shadow: 0 0 0 4px var(--bg-1); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-16 DaisyUI btn-circle 한 쌍

| 항목 | 내용 |
|---|---|
| 출처 | [DaisyUI](https://github.com/saadeghi/daisyui/blob/master/packages/docs/src/routes/(routes)/components/carousel/+page.md) |
| 생김새 | 절대 위치 flex 행(justify-between), 양쪽에서 20px(left-5/right-5), top 50%. 40px 원 두 개에 ❮ ❯. #slideN 앵커 링크이고 래핑됨 |
| 상태 | 호버 시 배경 7% 어둡게. 누르면 translate:0 .5px + 그림자 제거. focus-visible 2px 아웃라인. 비활성은 글자 20%, 투명 |
| 모션 | 호버/누름 → 배경 7% 어둡게, 누르면 0.5px 내려가며 그림자 제거 |
| 타이밍 | `color, background, border, shadow, transform 0.2s cubic-bezier(0,0,.2,1)` |
| 느낌 | CSS만으로 · 링크 방식 · 살짝 눌림 |
| 용도 | JS 없는 CSS 전용 캐러셀 |

```html
<div class="A-16" data-behavior="carousel" data-loop><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><div class="nav"><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><span class="g">❮</span></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><span class="g">❯</span></button></div></div>
```

```css
.A-16 { position: absolute; inset: 0; }
.A-16 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-16 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-16 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-16 .sl:nth-child(even) { background: var(--fg-2); }
.A-16 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-16 button:disabled { cursor: default; }
.A-16 .ic { display: block; width: 24px; height: 24px; }
.A-16 .nav { position: absolute; left: 20px; right: 20px; top: 50%; display: flex; justify-content: space-between; transform: translateY(-50%); pointer-events: none; }
.A-16 .bt { width: 40px; height: 40px; border-radius: 50%; background: var(--bg-2); color: var(--fg-1); box-shadow: var(--shadow-sm); pointer-events: auto; transition-property: color, background-color, border-color, box-shadow, translate; transition-duration: 0.2s; transition-timing-function: cubic-bezier(0,0,.2,1); }
.A-16 .bt:hover { background: color-mix(in srgb, var(--bg-2) 93%, var(--fg-1)); }
.A-16 .bt:active { translate: 0 .5px; box-shadow: none; }
.A-16 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
/* 광학 보정: ❮ ❯ 굵은 꺾쇠 잉크 폭 ≈ .4em, 1/6 ≈ .07em 만큼 가리키는 쪽으로. 버튼의 :active translate 와 겹치지 않게 글리프 span 에만 */
.A-16 .g { display: inline-block; }
.A-16 .pv .g { translate: calc(var(--optical, 1) * -0.07em) 0; }
.A-16 .nx .g { translate: calc(var(--optical, 1) * 0.07em) 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-17 shadcn/ui 바깥 아웃라인 원

| 항목 | 내용 |
|---|---|
| 출처 | [shadcn/ui](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/carousel.tsx) |
| 생김새 | 슬라이드 바깥 -left-12(48px), 세로 가운데. 32px rounded-full 아웃라인 버튼(border, bg-background, shadow-xs). lucide ArrowLeft(긴 화살표) 16px |
| 상태 | 호버 bg-accent. 비활성(!canScrollPrev)은 opacity .5 + pointer-events none. focus-visible ring 3px ring/50. sr-only "Previous slide". 영역에 aria-roledescription="carousel", ArrowLeft/Right 키 처리 |
| 모션 | 호버 → 배경이 accent 로 |
| 타이밍 | `transition-all, Tailwind 기본 150ms cubic-bezier(.4,0,.2,1)` |
| 느낌 | 앱 UI · 정돈된 · 아웃라인 |
| 용도 | 앱/대시보드 UI |

```html
<div class="A-17" data-behavior="carousel" role="region" aria-roledescription="carousel" aria-label="캐러셀"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/></svg></button><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button></div>
```

```css
.A-17 { position: absolute; inset: 0; }
.A-17 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-17 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-17 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-17 .sl:nth-child(even) { background: var(--fg-2); }
.A-17 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-17 button:disabled { cursor: default; }
.A-17 .ic { display: block; width: 24px; height: 24px; }
.A-17 .vp { inset: 16px 56px; border-radius: var(--radius-md); }
.A-17 .bt { position: absolute; top: 50%; margin-top: -16px; width: 32px; height: 32px; border: 1px solid var(--border); border-radius: 50%; background: var(--bg-1); color: var(--fg-1); box-shadow: var(--shadow-sm); transition: all 150ms cubic-bezier(.4,0,.2,1); }
.A-17 .pv { left: 8px; }
.A-17 .nx { right: 8px; }
.A-17 .ic { width: 16px; height: 16px; }
.A-17 .bt:hover:not(:disabled) { background: var(--bg-2); }
.A-17 .bt:focus-visible { outline: 0; box-shadow: var(--shadow-sm), 0 0 0 3px color-mix(in srgb, var(--fg-1) 50%, transparent); }
.A-17 .bt:disabled { opacity: .5; pointer-events: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-18 Ark UI / Zag 트리거 + Chakra 예제

| 항목 | 내용 |
|---|---|
| 출처 | [Zag.js · Chakra UI](https://github.com/chakra-ui/zag/blob/main/packages/machines/carousel/src/carousel.connect.ts) |
| 생김새 | 헤드리스. Chakra 예제는 슬라이드 아래 가운데 컨트롤 행(gap 4): [ghost xs IconButton ‹] [점] [›]. xs 크기 32px, Lu 셰브론 16px |
| 상태 | 스크롤 불가면 네이티브 disabled(루프/자동재생이면 제외). aria-label "Previous slide", aria-controls 가 아이템 그룹 가리킴, data-orientation. ghost 호버 bg colorPalette.subtle, 포커스 링은 바깥 |
| 모션 | 호버 → 배경 subtle 색 |
| 타이밍 | `transitionDuration: "moderate" (토큰 기준 약 200ms)` (추정) |
| 느낌 | 헤드리스 · 올바른 동작 · 조용한 고스트 |
| 용도 | 동작 정확성을 기본으로 원하는 디자인 시스템 |

```html
<div class="A-18" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><div class="ctl"><button type="button" class="bt pv" data-prev aria-label="이전 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><div data-dots></div><button type="button" class="bt nx" data-next aria-label="다음 슬라이드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div>
```

```css
.A-18 { position: absolute; inset: 0; }
.A-18 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-18 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-18 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-18 .sl:nth-child(even) { background: var(--fg-2); }
.A-18 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-18 button:disabled { cursor: default; }
.A-18 .ic { display: block; width: 24px; height: 24px; }
.A-18 .vp { inset: 8px 8px 56px; border-radius: var(--radius-md); }
.A-18 .ctl { position: absolute; left: 0; right: 0; bottom: 8px; display: flex; justify-content: center; align-items: center; gap: 16px; }
.A-18 .bt { width: 32px; height: 32px; border-radius: var(--radius-sm); color: var(--fg-1); transition: background 200ms; }
.A-18 .ic { width: 16px; height: 16px; }
.A-18 .bt:hover:not(:disabled) { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.A-18 .bt:disabled { opacity: .5; }
.A-18 [data-dots] { display: flex; gap: var(--space-2); }
.A-18 [data-dots] button { width: 8px; height: 8px; border-radius: 50%; background: color-mix(in srgb, var(--fg-1) 30%, transparent); }
.A-18 [data-dots] button[aria-current="true"] { background: var(--fg-1); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-19 MUI TabScrollButton 스트립

| 항목 | 내용 |
|---|---|
| 출처 | [Material UI](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TabScrollButton/TabScrollButton.js) |
| 생김새 | 스크롤되는 Tabs/칩 양끝의 폭 40px 전체 높이 스트립. 키보드 화살표 아이콘. 세로일 땐 높이 40px. (MUI 는 캐러셀이 없어 가장 가까운 화살표) |
| 상태 | 기본 opacity .8. 비활성은 opacity 0 이라 끝에서 화살표는 사라지지만 자리는 유지 |
| 모션 | 누름 → 리플이 눌린 위치에서 퍼짐 |
| 타이밍 | `TouchRipple 550ms easeInOut` |
| 느낌 | 머티리얼 · 리플 · 자리 유지 |
| 용도 | 칩/탭/필터 바 |

```html
<div class="A-19" data-behavior="scroller replay" data-step="0.8"><div class="bar"><button type="button" class="bt" data-prev data-replay aria-label="왼쪽으로 스크롤"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><div class="tabs" data-scroller tabindex="0" aria-label="탭 목록"><button type="button" class="chip on">홈</button><button type="button" class="chip">인기</button><button type="button" class="chip">신상품</button><button type="button" class="chip">추천</button><button type="button" class="chip">할인</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">이벤트</button><button type="button" class="chip">리뷰</button></div><button type="button" class="bt" data-next data-replay aria-label="오른쪽으로 스크롤"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div>
```

```css
.A-19 { position: absolute; inset: 0; display: grid; align-items: center; padding: 0 var(--space-4); }
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
@keyframes A-19-ripple { 0% { opacity: 1; transform: scale(0); } 100% { opacity: 0; transform: scale(1); } }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);

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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

**실서비스**

### A-20 Apple 패들내비, 호버 시 나타나는 오버레이

| 항목 | 내용 |
|---|---|
| 출처 | [Apple (iPhone 페이지)](https://www.apple.com/iphone/) |
| 생김새 | 36px 원(다른 크기: elevated 56px, super 90px), 양쪽에서 18px. alpha 스타일은 반투명 회색 배경(원본 rgba(210,210,215,.64)) |
| 상태 | 호버와 active 가 각각 조금 다른 배경 톤. 비활성 opacity .42 + pointer-events none. focus-visible 2px solid #0071e3 + 오프셋 3px. with-paddlenav-onhover 변형은 컨테이너에 호버(호버 가능한 fine 포인터 한정)하기 전까지 opacity 0, focus-visible 도 표시시킴 |
| 모션 | 컨테이너 호버 → 화살표 나타남 + 배경/글자색 변화 |
| 타이밍 | `transition: background 100ms linear, color 100ms linear, opacity 100ms linear` |
| 느낌 | 프리미엄 · 매우 빠름 · 호버로 등장 |
| 용도 | 프리미엄 제품 갤러리 |

```html
<div class="A-20" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-20 { position: absolute; inset: 0; }
.A-20 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-20 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-20 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-20 .sl:nth-child(even) { background: var(--fg-2); }
.A-20 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-20 button:disabled { cursor: default; }
.A-20 .ic { display: block; width: 24px; height: 24px; }
.A-20 .bt { position: absolute; top: 50%; margin-top: -18px; width: 36px; height: 36px; border-radius: 36px; background: color-mix(in srgb, var(--bg-1) 64%, transparent); color: var(--fg-1); transition: background 100ms linear, color 100ms linear, opacity 100ms linear; }
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
.A-20 .bt:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 3px; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-21 Apple 스크롤 갤러리 우하단 클러스터

| 항목 | 내용 |
|---|---|
| 출처 | [Apple (iPhone 페이지)](https://www.apple.com/iphone/) |
| 생김새 | 갤러리 아래 고정 바에 이전·다음을 나란히(gap 18px). 36px alpha 원 + 뒤에 그라디언트 스크림. 가운데 정렬 변형도 있음 |
| 상태 | aria-label="Previous item, Explore the lineup gallery". 바는 처음엔 hidden(visibility:hidden; opacity:0)으로 시작. 비활성 .42 |
| 모션 | 호버/누름 → 배경·글자색 변화 |
| 타이밍 | `100ms linear (background/color)` |
| 느낌 | 콘텐츠 밖으로 뺀 컨트롤 · 스크림 · 빠름 |
| 용도 | 긴 가로 선반(shelf) |

```html
<div class="A-21" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div><div class="sl">5</div></div></div><div class="bar"><button type="button" class="bt pv" data-prev aria-label="이전 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div>
```

```css
.A-21 { position: absolute; inset: 0; }
.A-21 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-21 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-21 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-21 .sl:nth-child(even) { background: var(--fg-2); }
.A-21 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-21 button:disabled { cursor: default; }
.A-21 .ic { display: block; width: 24px; height: 24px; }
.A-21 .sl { flex-basis: 50%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }
.A-21 .bar { position: absolute; left: 0; right: 0; bottom: 0; display: flex; align-items: center; justify-content: flex-end; gap: 18px; height: 52px; padding: 0 12px; background: linear-gradient(to top, color-mix(in srgb, var(--fg-1) 50%, transparent), transparent); pointer-events: none; }
.A-21 .bt { width: 36px; height: 36px; border-radius: 36px; background: color-mix(in srgb, var(--bg-1) 64%, transparent); color: var(--fg-1); pointer-events: auto; transition: background 100ms linear, color 100ms linear; }
.A-21 .ic { width: 18px; height: 18px; }
.A-21 .bt:hover:not(:disabled) { background: color-mix(in srgb, var(--bg-1) 80%, transparent); }
.A-21 .bt:disabled { opacity: .42; pointer-events: none; }
.A-21 .bt:focus-visible { outline: 2px solid var(--bg-1); outline-offset: 3px; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-22 Netflix 슬라이드인 엣지 패널

| 항목 | 내용 |
|---|---|
| 출처 | [Netflix (로그아웃 Top 10 행)](https://www.netflix.com/) |
| 생김새 | 오른쪽 가장자리의 검은 전체 높이 패널(padding-left 12px, z-index 3) 안에 24×120px 세로 알약(radius 8px, 배경 rgba(255,255,255,.1)), 24px 셰브론 rgba(255,255,255,.7) |
| 상태 | 호버/focus-visible 배경 .2 + 아이콘 흰색. prev 패널은 스크롤한 뒤에만 나타남. 래퍼는 aria-hidden="true" |
| 모션 | 스크롤 상태 변화 → 패널이 translateX(100%) → 0 으로 들어오며 버튼은 opacity 0 → 1 (퇴장은 반대). 호버는 배경/색 변화. reduced-motion 이면 슬라이드 대신 페이드 |
| 타이밍 | `패널·버튼 400ms ease-in-out, 호버 200ms ease-in-out` |
| 느낌 | 어두운 UI · 슬라이드인 · 세로 알약 |
| 용도 | 어두운 UI의 미디어 행 |

```html
<div class="A-22" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div><div class="sl">5</div></div></div><div class="pn pn-prev"><button type="button" class="bt pv" data-prev aria-label="이전 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button></div><div class="pn pn-next"><button type="button" class="bt nx" data-next aria-label="다음 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div>
```

```css
.A-22 { position: absolute; inset: 0; }
.A-22 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-22 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-22 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-22 .sl:nth-child(even) { background: var(--fg-2); }
.A-22 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-22 button:disabled { cursor: default; }
.A-22 .ic { display: block; width: 24px; height: 24px; }
.A-22 .sl { flex-basis: 50%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }
.A-22 { background: var(--fg-1); }
.A-22 .pn { position: absolute; top: 0; bottom: 0; z-index: 3; display: flex; align-items: center; background: var(--fg-1); transition: transform 400ms ease-in-out; }
.A-22 .pn-prev { left: 0; padding-right: 12px; }
.A-22 .pn-next { right: 0; padding-left: 12px; }
.A-22.is-start .pn-prev { transform: translateX(-100%); }
.A-22.is-end .pn-next { transform: translateX(100%); }
.A-22 .bt { width: 24px; height: 120px; border-radius: 8px; background: color-mix(in srgb, var(--bg-1) 10%, transparent); color: color-mix(in srgb, var(--bg-1) 70%, transparent); transition: opacity 400ms ease-in-out, background 200ms ease-in-out, color 200ms ease-in-out; }
.A-22 .bt:hover:not(:disabled), .A-22 .bt:focus-visible { background: color-mix(in srgb, var(--bg-1) 20%, transparent); color: var(--bg-1); }
.A-22 .bt:disabled { opacity: 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-23 Airbnb 섹션 헤더 한 쌍

| 항목 | 내용 |
|---|---|
| 출처 | [Airbnb](https://www.airbnb.co.kr/) |
| 생김새 | 각 행 제목의 오른쪽 위에 28px 원 두 개를 나란히. 배경 #F2F2F2, 12px 셰브론 stroke 4 |
| 상태 | 비활성 opacity .5. 라벨에 위치 포함("showing 1–5 of 20 items"). 포커스는 이중 링 0 0 0 2px <inverse>, 0 0 0 4px <primary> |
| 모션 | 호버 → 1.0714배 확대(28px → 30px), 배경이 #EBEBEB 로 |
| 타이밍 | `transform 250ms cubic-bezier(.2,0,0,1), 배경 300ms 같은 곡선` |
| 느낌 | 이미지 밖 컨트롤 · 살짝 커짐 · 정돈됨 |
| 용도 | 제목이 있는 탐색 행 |

```html
<div class="A-23" data-behavior="carousel" data-visible="2" data-step="50"><div class="hd"><span class="ttl">부산 인기 숙소</span><div class="pair"><button type="button" class="bt pv" data-prev aria-label="이전 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div><div class="sl">5</div></div></div></div>
```

```css
.A-23 { position: absolute; inset: 0; }
.A-23 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-23 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-23 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-23 .sl:nth-child(even) { background: var(--fg-2); }
.A-23 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-23 button:disabled { cursor: default; }
.A-23 .ic { display: block; width: 24px; height: 24px; }
.A-23 .sl { flex-basis: 50%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }
.A-23 { background: var(--bg-1); }
.A-23 .hd { position: absolute; top: 12px; left: 16px; right: 16px; display: flex; align-items: center; justify-content: space-between; }
.A-23 .ttl { font-size: var(--text-18); font-weight: var(--weight-bold); color: var(--fg-1); }
.A-23 .pair { display: flex; gap: var(--space-2); }
.A-23 .vp { inset: 52px 16px 16px; }
.A-23 .bt { width: 28px; height: 28px; border-radius: 50%; background: var(--bg-2); color: var(--fg-1); transition: transform 250ms cubic-bezier(.2,0,0,1), background-color 300ms cubic-bezier(.2,0,0,1); }
.A-23 .ic { width: 12px; height: 12px; stroke-width: 4; }
.A-23 .bt:hover:not(:disabled) { transform: scale(1.0714); background: color-mix(in srgb, var(--bg-2) 94%, var(--fg-1)); }
.A-23 .bt:focus-visible { outline: 0; box-shadow: 0 0 0 2px var(--bg-1), 0 0 0 4px var(--fg-1); }
.A-23 .bt:disabled { opacity: .5; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-24 Airbnb 숙소 카드 사진 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Airbnb](https://www.airbnb.co.kr/s/Busan/homes) |
| 생김새 | 카드 사진 위. 32px 원, 배경 rgba(255,255,255,.9), 1px 테두리 rgba(0,0,0,.08), 그림자 0 2px 4px rgba(0,0,0,.18), 12px 셰브론 |
| 상태 | 카드에 호버하기 전까지 래퍼의 clip-path: inset(100%) 로 숨김(포커스는 유지됨). 첫 사진에선 prev 없음. 라벨 "다음 사진: <숙소 이름>" |
| 모션 | 카드 호버 → 클립 해제로 즉시 나타남. 출처에는 transform 전환만 있고 확대량이 없어, 버튼 호버 확대 1.0714는 Airbnb 헤더 쌍 값으로 가정한 추정 |
| 타이밍 | `나타남 즉시, transform 250ms cubic-bezier(.2,0,0,1)` (추정) |
| 느낌 | 카드 안 · 키보드 접근 유지 · 즉시 등장 |
| 용도 | 카드 안 썸네일 캐러셀 |

```html
<div class="A-24" data-behavior="carousel"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div></div></div><div class="wrap"><button type="button" class="bt pv" data-prev aria-label="이전 사진"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 사진: 해운대 숙소"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div>
```

```css
.A-24 { position: absolute; inset: 0; }
.A-24 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-24 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-24 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-24 .sl:nth-child(even) { background: var(--fg-2); }
.A-24 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-24 button:disabled { cursor: default; }
.A-24 .ic { display: block; width: 24px; height: 24px; }
.A-24 { inset: 16px 50%; width: 200px; margin-left: -100px; border-radius: var(--radius-md); overflow: hidden; }
.A-24 .wrap { position: absolute; inset: 0; clip-path: inset(100%); pointer-events: none; }
.A-24:hover .wrap, .A-24 .wrap:focus-within { clip-path: none; }
.A-24 .bt { position: absolute; top: 50%; margin-top: -16px; width: 32px; height: 32px; border-radius: 50%; border: 1px solid color-mix(in srgb, var(--fg-1) 8%, transparent); background: color-mix(in srgb, var(--bg-1) 90%, transparent); color: var(--fg-1); box-shadow: 0 2px 4px color-mix(in srgb, var(--fg-1) 18%, transparent); pointer-events: auto; transition: transform 250ms cubic-bezier(.2,0,0,1); }
.A-24 .pv { left: 8px; }
.A-24 .nx { right: 8px; }
.A-24 .ic { width: 12px; height: 12px; }
.A-24 .bt:hover { transform: scale(1.0714); }
.A-24 .bt:disabled { display: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-25 Airbnb 가장자리 걸친 플로팅 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Airbnb](https://www.airbnb.co.kr/) |
| 생김새 | 행 가장자리에 걸친 36px 흰 원. 1px 테두리 rgba(0,0,0,.08), 그림자 0 8px 24px rgba(0,0,0,.1) |
| 상태 | 시작 지점의 prev 는 비활성이며 opacity 0 |
| 모션 | 시작/끝 도달 → 불투명도 변화로 사라짐/나타남 |
| 타이밍 | `opacity .15s linear` |
| 느낌 | 플로팅 · 큰 그림자 · 가장자리에 걸침 |
| 용도 | 흰 배경의 카드 행 |

```html
<div class="A-25" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div><div class="sl">5</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 항목"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-25 { position: absolute; inset: 0; }
.A-25 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-25 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-25 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-25 .sl:nth-child(even) { background: var(--fg-2); }
.A-25 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-25 button:disabled { cursor: default; }
.A-25 .ic { display: block; width: 24px; height: 24px; }
.A-25 .sl { flex-basis: 50%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }
.A-25 { background: var(--bg-1); }
.A-25 .vp { inset: 16px 28px; }
.A-25 .bt { position: absolute; top: 50%; margin-top: -18px; width: 36px; height: 36px; border: 1px solid color-mix(in srgb, var(--fg-1) 8%, transparent); border-radius: 50%; background: var(--bg-1); color: var(--fg-1); box-shadow: 0 8px 24px color-mix(in srgb, var(--fg-1) 10%, transparent); transition: opacity .15s linear; }
.A-25 .pv { left: 10px; }
.A-25 .nx { right: 10px; }
.A-25 .ic { width: 16px; height: 16px; }
.A-25 .bt:disabled { opacity: 0; pointer-events: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-26 YouTube 칩 바 엣지 페이드

| 항목 | 내용 |
|---|---|
| 출처 | [YouTube](https://www.youtube.com/results?search_query=ui+design) |
| 생김새 | 화살표 컨테이너는 양끝에 절대 위치 전체 높이(z-index 200). 40px 투명 원, 아이콘 #0F0F0F(var(--fg-1)). 칩은 화살표 아래에서 mask-image: linear-gradient(90deg, transparent 51px, #000 77px) 로 페이드(여기선 마스크 색에 var(--fg-1) 사용) |
| 상태 | 행이 시작 또는 끝이면 화살표는 display:none. 라벨 "다음" |
| 모션 | 호버 → 호버 레이어가 opacity 0 → 1, scale .9 → 1, 채움 rgba(0,0,0,.2) |
| 타이밍 | `300ms cubic-bezier(.05,0,0,1)` |
| 느낌 | 엣지 페이드 · 번지는 호버 원 · 칩 행 |
| 용도 | 필터/태그 칩 행 |

```html
<div class="A-26" data-behavior="scroller" data-step="0.8"><div class="bar"><div class="chips" data-scroller tabindex="0" aria-label="칩 목록"><button type="button" class="chip on">전체</button><button type="button" class="chip">UI 디자인</button><button type="button" class="chip">모션</button><button type="button" class="chip">아이콘</button><button type="button" class="chip">타이포</button><button type="button" class="chip">컬러</button><button type="button" class="chip">프로토타입</button><button type="button" class="chip">접근성</button><button type="button" class="chip">최근 업로드</button></div><div class="ar ar-p"><button type="button" class="bt" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button></div><div class="ar ar-n"><button type="button" class="bt" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div></div>
```

```css
.A-26 { position: absolute; inset: 0; background: var(--bg-1); }
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
.A-26 .bt:disabled { display: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### A-27 Google Play 플로팅 액션 버튼

| 항목 | 내용 |
|---|---|
| 출처 | [Google Play](https://play.google.com/store/games) |
| 생김새 | 선반 오른쪽 가장자리. 56px 흰 원(radius 28px), Material chevron_right 24px #5F6368(var(--fg-3)). 엘리베이션 그림자 0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15) |
| 상태 | 원본은 행에 호버하기 전까지 display:none(데모는 키보드 접근을 위해 opacity 0 + pointer-events none으로 숨김). 시작에서는 next 만 표시. 호버 시 그림자가 0 2px 6px 2px(.15)로 상승. 라벨 "다음으로 스크롤" |
| 모션 | 행 호버 / 버튼 호버 → 버튼 등장(display), 그림자 상승 |
| 타이밍 | `box-shadow .28s cubic-bezier(.4,0,.2,1), transform .27s cubic-bezier(0,0,.2,1)` |
| 느낌 | 머티리얼 FAB · 큰 원 · 그림자 상승 |
| 용도 | 앱/상품 선반 |

```html
<div class="A-27" data-behavior="carousel" data-visible="2" data-step="50"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div><div class="sl">5</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전으로 스크롤"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음으로 스크롤"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
```

```css
.A-27 { position: absolute; inset: 0; }
.A-27 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-27 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-27 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-27 .sl:nth-child(even) { background: var(--fg-2); }
.A-27 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-27 button:disabled { cursor: default; }
.A-27 .ic { display: block; width: 24px; height: 24px; }
.A-27 .sl { flex-basis: 50%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }
.A-27 { background: var(--bg-1); }
.A-27 .vp { inset: 16px 12px; }
.A-27 .bt { position: absolute; top: 50%; margin-top: -28px; width: 56px; height: 56px; border-radius: 28px; background: var(--bg-1); color: var(--fg-3); box-shadow: 0 1px 2px color-mix(in srgb, var(--fg-1) 30%, transparent), 0 1px 3px 1px color-mix(in srgb, var(--fg-1) 15%, transparent); transition: box-shadow .28s cubic-bezier(.4,0,.2,1), transform .27s cubic-bezier(0,0,.2,1); opacity: 0; pointer-events: none; }
.A-27 .pv { left: 8px; }
.A-27 .nx { right: 8px; }
.A-27:hover .bt:not(:disabled), .A-27:has(.bt:focus-visible) .bt:not(:disabled) { opacity: 1; pointer-events: auto; }
.A-27 .bt:hover { box-shadow: 0 1px 2px color-mix(in srgb, var(--fg-1) 30%, transparent), 0 2px 6px 2px color-mix(in srgb, var(--fg-1) 15%, transparent); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-28 App Store 웹 슬림 톨 패들

| 항목 | 내용 |
|---|---|
| 출처 | [Apple App Store 웹](https://apps.apple.com/us/iphone/apps) |
| 생김새 | 양쪽 가장자리에서 6px. 28×64px 둥근 사각형(radius 6px), 얇은 8.5×30.5px 셰브론 SVG. 배경 rgb(220,220,220)(라이트) / rgb(10,10,10)(다크). 오른쪽은 왼쪽을 scale:-1 1 로 뒤집은 것 |
| 상태 | 선반에 호버하거나 안쪽에 포커스가 있기 전까지 opacity 0. 비활성은 opacity 0. 호버/focus-visible 과 active 는 각각 더 강한 시스템 채움으로 이동, active 는 아이콘도 어둡게. 스크롤 중엔 pointer-events 꺼짐. 라벨 "Previous Page"/"Next Page" |
| 모션 | 선반 호버/포커스 → 화살표 나타남, 배경·글자색이 더 강하게 |
| 타이밍 | `background-color .25s linear, color .25s linear, opacity .25s linear` |
| 느낌 | 얇고 긴 · 다크모드 대응 · 밀집 선반 |
| 용도 | 밀집된 그리드 선반 |

```html
<div class="A-28" data-behavior="carousel" data-visible="3" data-step="33.333"><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div><div class="sl">5</div><div class="sl">6</div></div></div><button type="button" class="bt pv" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 2l-6 10 6 10" stroke-width="1.5"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 2l-6 10 6 10" stroke-width="1.5"/></g></svg></button></div>
```

```css
.A-28 { position: absolute; inset: 0; }
.A-28 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-28 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-28 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-28 .sl:nth-child(even) { background: var(--fg-2); }
.A-28 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-28 button:disabled { cursor: default; }
.A-28 .ic { display: block; width: 24px; height: 24px; }
.A-28 .sl { flex-basis: 33.333%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }
.A-28 { background: var(--bg-1); }
.A-28 .vp { inset: 16px 12px; }
.A-28 .bt { position: absolute; top: 50%; margin-top: -32px; width: 28px; height: 64px; border-radius: 6px; background: color-mix(in srgb, var(--fg-1) 14%, var(--bg-1)); color: var(--fg-2); opacity: 0; transition: background-color .25s linear, color .25s linear, opacity .25s linear; }
.A-28 .pv { left: 6px; }
.A-28 .nx { right: 6px; scale: -1 1; }
.A-28 .ic { width: 32px; height: 32px; }
.A-28:hover .bt:not(:disabled), .A-28:has(.bt:focus-visible) .bt:not(:disabled) { opacity: 1; }
.A-28 .bt:hover:not(:disabled), .A-28 .bt:focus-visible { background: color-mix(in srgb, var(--fg-1) 22%, var(--bg-1)); }
.A-28 .bt:active:not(:disabled) { background: color-mix(in srgb, var(--fg-1) 30%, var(--bg-1)); color: var(--fg-1); }
.A-28 .bt:disabled { opacity: 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### A-29 Nike 헤더 오른쪽 한 쌍

| 항목 | 내용 |
|---|---|
| 출처 | [Nike](https://www.nike.com/) |
| 생김새 | 각 선반 헤더의 오른쪽 위. 48px 원 #E5E5E5, 24px 선 셰브론 #111(var(--fg-1)) |
| 상태 | 호버 #CACACB. 비활성은 배경 #F5F5F5 + 아이콘 #9E9EA0 이고 계속 보임. 포커스 링 0 0 0 2px rgb(39,93,197). 이 버튼엔 aria-label 이 없었음(접근성 구멍) — 여기선 라벨을 달았다 |
| 모션 | 호버 → 배경색 진해짐 |
| 타이밍 | `background-color .25s cubic-bezier(.25,.1,.25,1) (= ease)` |
| 느낌 | 커머스 · 큰 원 · 비활성도 보임 |
| 용도 | 커머스 상품 레일 |

```html
<div class="A-29" data-behavior="carousel" data-visible="2" data-step="50"><div class="hd"><span class="ttl">이번 주 인기</span><div class="pair"><button type="button" class="bt pv" data-prev aria-label="이전 상품"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="bt nx" data-next aria-label="다음 상품"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div></div><div class="vp"><div data-track><div class="sl">1</div><div class="sl">2</div><div class="sl">3</div><div class="sl">4</div><div class="sl">5</div></div></div></div>
```

```css
.A-29 { position: absolute; inset: 0; }
.A-29 .vp { position: absolute; inset: 0; overflow: hidden; }
.A-29 [data-track] { display: flex; height: 100%; transition: transform 300ms ease; }
.A-29 .sl { box-sizing: border-box; flex: 0 0 100%; display: grid; place-items: center; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); }
.A-29 .sl:nth-child(even) { background: var(--fg-2); }
.A-29 button { display: grid; place-items: center; margin: 0; padding: 0; border: 0; font: inherit; color: inherit; background: none; cursor: pointer; }
.A-29 button:disabled { cursor: default; }
.A-29 .ic { display: block; width: 24px; height: 24px; }
.A-29 .sl { flex-basis: 50%; border: 0 solid transparent; border-right-width: 8px; background-clip: padding-box; border-radius: var(--radius-md); font-size: var(--text-18); }
.A-29 { background: var(--bg-1); }
.A-29 .hd { position: absolute; top: 8px; left: 16px; right: 16px; display: flex; align-items: center; justify-content: space-between; }
.A-29 .ttl { font-size: var(--text-18); font-weight: var(--weight-bold); color: var(--fg-1); }
.A-29 .pair { display: flex; gap: var(--space-2); }
.A-29 .vp { inset: 64px 16px 12px; }
.A-29 .bt { width: 48px; height: 48px; border-radius: 24px; background: color-mix(in srgb, var(--fg-1) 10%, var(--bg-1)); color: var(--fg-1); transition: background-color .25s cubic-bezier(.25,.1,.25,1); }
.A-29 .bt:hover:not(:disabled) { background: color-mix(in srgb, var(--fg-1) 20%, var(--bg-1)); }
.A-29 .bt:focus-visible { outline: 0; box-shadow: 0 0 0 2px var(--fg-1); }
.A-29 .bt:disabled { background: color-mix(in srgb, var(--fg-1) 4%, var(--bg-1)); color: var(--fg-4); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

## B. 페이지네이션

디자인 시스템별 이전/다음, 처음/끝(«»), 말줄임 점프, 카운터형, 테이블형. 대부분 짧은 색 페이드(75–250ms)이고 신호는 디테일에 있다.

**Material 계열**

### B-01 MUI Pagination (원형 페이지, 처음/끝)

| 항목 | 내용 |
|---|---|
| 출처 | [MUI](https://mui.com/material-ui/react-pagination/) |
| 생김새 | NavigateBefore/Next 셰브론, showFirstButton/showLastButton이면 FirstPage/LastPage(셰브론+바). 아이템 32px(small 26, large 40), border-radius 16(알약), 마진 0 3px, 아이콘 20px. 변형은 text/outlined, shape="rounded". 데모는 폭 때문에 3페이지. |
| 상태 | 호버 action.hover, 선택 action.selected(또는 primary 채움), 비활성 action.disabledOpacity. 포커스 visible은 action.focus 배경(링 없음). 이전/다음은 끝에서 숨기지 않고 비활성. 기본 aria "go to previous page". |
| 모션 | 호버·선택 → color + background-color 전환 |
| 타이밍 | `250ms cubic-bezier(0.4,0,0.2,1)` (추정) |
| 느낌 | 부드럽다 · 둥글다 · 표준 |
| 용도 | 일반 앱 목록 |

```html
<nav class="B-01" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-first aria-label="첫 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 18l-6-6 6-6"/><path d="M7 6v12"/></svg></button>
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <button type="button" data-last aria-label="마지막 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18l6-6-6-6"/><path d="M17 6v12"/></svg></button>
</nav>
```

```css
.B-01 { display: flex; align-items: center; font-size: var(--text-14); color: var(--fg-1); }
.B-01 [data-pages] { display: contents; }
.B-01 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; margin: 0 3px; padding: 0 6px; font: inherit; color: inherit; background: transparent; border: 0; border-radius: 16px; cursor: pointer; transition: background-color 250ms cubic-bezier(.4,0,.2,1), color 250ms cubic-bezier(.4,0,.2,1); }
.B-01 .ic { width: 20px; height: 20px; }
.B-01 button:hover { background: color-mix(in srgb, var(--fg-1) 4%, transparent); }
.B-01 button[aria-current] { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-01 button:focus-visible { outline: 0; background: color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-01 button:disabled { opacity: .38; cursor: default; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-02 MUI TablePagination (행 수 + 범위 + < >)

| 항목 | 내용 |
|---|---|
| 출처 | [MUI](https://mui.com/material-ui/api/table-pagination/) |
| 생김새 | "Rows per page:" 셀렉트(10/25/50/100) → "1–10 of 100" → 셰브론 아이콘 버튼. 처음/끝 버튼은 선택. 아이콘 버튼 40px. 푸터는 flex justify-end. 데모는 폭 때문에 라벨을 줄임. |
| 상태 | 이전/다음은 양 끝에서 비활성. aria "Go to next page". count가 −1이면 "more than N" 표기. |
| 모션 | 호버·클릭 → 아이콘 버튼 배경 + 리플 |
| 타이밍 | `250ms easeInOut` (추정) |
| 느낌 | 표 푸터 · 정돈 · 밀도 중간 |
| 용도 | 데이터 테이블 푸터 |

```html
<nav class="B-02" aria-label="페이지" data-behavior="pager" data-labels="1–10,11–20,21–30,31–40,41–50" data-start="1">
  <span class="rows">행 수: <b>10</b><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span>
  <span class="range"><span data-label></span> / 50</span>
  <span class="btns">
    <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
    <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  </span>
</nav>
```

```css
.B-02 { display: flex; align-items: center; gap: var(--space-4); font-size: var(--text-14); color: var(--fg-2); }
.B-02 .rows { display: inline-flex; align-items: center; gap: var(--space-1); white-space: nowrap; }
.B-02 .rows b { color: var(--fg-1); font-weight: var(--weight-regular); }
.B-02 .range { color: var(--fg-1); white-space: nowrap; }
.B-02 .btns { display: flex; }
.B-02 button { box-sizing: border-box; display: grid; place-items: center; width: 40px; height: 40px; padding: 0; color: var(--fg-2); background: transparent; border: 0; border-radius: 50%; cursor: pointer; transition: background-color 250ms cubic-bezier(.4,0,.2,1); }
.B-02 .ic { width: 20px; height: 20px; }
.B-02 .rows .ic { width: 16px; height: 16px; }
.B-02 button:hover { background: color-mix(in srgb, var(--fg-1) 4%, transparent); }
.B-02 button:focus-visible { outline: 0; background: color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-02 button:disabled { opacity: .38; cursor: default; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-03 Angular Material mat-paginator (툴바형)

| 항목 | 내용 |
|---|---|
| 출처 | [Angular Components](https://github.com/angular/components/blob/main/src/material/paginator/paginator.html) |
| 생김새 | 바 높이 56px(밀도에 따라 52/48/40). "Items per page" 셀렉트 84px, 범위 라벨(margin 0 32px 0 24px), SVG 아이콘 28px. 첫 페이지 아이콘은 셰브론+바. 데모는 폭 때문에 셀렉트를 생략. |
| 상태 | 비활성 아이콘은 on-surface 38%. disabledInteractive라 끝에서 비활성이 돼도 포커스를 잃지 않음. 각 버튼 위에 matTooltip. RTL에서 아이콘 180° 회전. |
| 모션 | 클릭 → 리플이 커졌다 사라짐 |
| 타이밍 | `들어옴 225ms / 나감 150ms, cubic-bezier(0,0,0.2,1)` |
| 느낌 | 엔터프라이즈 · 밀집 · 머티리얼 |
| 용도 | 밀집 테이블 |

```html
<nav class="B-03" aria-label="페이지" data-behavior="pager" data-labels="1 – 10,11 – 20,21 – 30,31 – 40,41 – 50" data-start="1">
  <button type="button" data-first aria-label="첫 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 18l-6-6 6-6"/><path d="M7 6v12"/></svg></button>
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span class="range"><span data-label></span> / 50</span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <button type="button" data-last aria-label="마지막 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18l6-6-6-6"/><path d="M17 6v12"/></svg></button>
</nav>
```

```css
.B-03 { display: flex; align-items: center; height: 56px; font-size: var(--text-14); color: var(--fg-2); }
.B-03 .range { margin: 0 var(--space-3); white-space: nowrap; }
.B-03 button { position: relative; overflow: hidden; box-sizing: border-box; display: grid; place-items: center; width: 40px; height: 40px; padding: 0; color: var(--fg-2); background: transparent; border: 0; border-radius: 50%; cursor: pointer; }
.B-03 .ic { position: relative; width: 28px; height: 28px; }
.B-03 button::after { content: ''; position: absolute; inset: 0; border-radius: 50%; background: color-mix(in srgb, var(--fg-1) 12%, transparent); opacity: 0; transform: scale(0); transition: transform 150ms cubic-bezier(0,0,.2,1), opacity 150ms cubic-bezier(0,0,.2,1); }
.B-03 button:active::after { opacity: 1; transform: scale(1); transition-duration: 225ms; }
.B-03 button:focus-visible { outline: 0; background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-03 button:disabled { color: color-mix(in srgb, var(--fg-1) 38%, transparent); cursor: default; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

**디자인 시스템**

### B-04 Ant Design Pagination (네모 셰브론)

| 항목 | 내용 |
|---|---|
| 출처 | [Ant Design](https://ant.design/components/pagination) |
| 생김새 | LeftOutlined/RightOutlined 아이콘. 아이템 32px(SM 24, LG 40), 라운드는 token.borderRadius(6px), 간격 8px(marginXS). 활성 아이템은 흰 배경 + 1px #1677ff 테두리·글자 + 굵은 글씨(원본 색 대신 fg-1). Simple 모드는 prev, 입력칸, "/ N", next. |
| 상태 | 호버 colorBgTextHover, 눌림 colorBgTextActive. 비활성은 colorTextDisabled + not-allowed 커서, 호버해도 투명. 포커스 visible은 genFocusOutline. 이전/다음은 계속 보임. |
| 모션 | 호버 → all 전환(배경·테두리·색) |
| 타이밍 | `0.2s (easing 미지정 → ease)` (추정) |
| 느낌 | 각진 · 선명 · 관리자 |
| 용도 | 어드민 대시보드 |

```html
<nav class="B-04" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-04 { display: flex; align-items: center; gap: 8px; font-size: var(--text-14); color: var(--fg-1); }
.B-04 [data-pages] { display: contents; }
.B-04 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-1); font: inherit; color: inherit; background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); cursor: pointer; transition: all .2s; }
.B-04 .ic { width: 14px; height: 14px; }
.B-04 button:hover { background: color-mix(in srgb, var(--fg-1) 6%, transparent); }
.B-04 button:active { background: color-mix(in srgb, var(--fg-1) 15%, transparent); }
.B-04 button[aria-current] { background: var(--bg-1); border-color: var(--fg-1); font-weight: var(--weight-semibold); }
.B-04 button:focus-visible { outline: 2px solid color-mix(in srgb, var(--fg-1) 40%, transparent); outline-offset: 1px; }
.B-04 button:disabled { color: color-mix(in srgb, var(--fg-1) 25%, transparent); cursor: not-allowed; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-05 Ant Design jump-prev/next (말줄임 → «»)

| 항목 | 내용 |
|---|---|
| 출처 | [Ant Design](https://github.com/ant-design/ant-design/blob/master/components/pagination/style/index.ts) |
| 생김새 | "•••" 말줄임과 colorPrimary·fontSizeSM 이중 셰브론(DoubleLeft/RightOutlined)이 같은 박스에 겹쳐 있음(item-container position:relative). title 툴팁 "Previous 5 Pages"/"Next 5 Pages". 클릭하면 5페이지 점프(showLessItems면 3). 데모는 폭 때문에 SM 24px 아이템. |
| 상태 | 호버 또는 포커스 visible(&:has(> :focus-visible))이면 아이콘 opacity 1, 말줄임 opacity 0. 비활성은 말줄임을 유지. |
| 모션 | 호버·포커스 → 말줄임 ↔ 이중 셰브론 크로스페이드 (opacity 0↔1) |
| 타이밍 | `0.2s (all, motionDurationMid · easing ease)` (추정) |
| 느낌 | 숨은 기능 · 크로스페이드 · 파워 유저 |
| 용도 | 긴 페이지 범위 |

```html
<nav class="B-05" aria-label="페이지네이션" data-behavior="pager" data-total="10" data-jump="5" data-start="4">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <template data-gap><span class="ell">•••</span><span class="jmp l"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1.14 0)"><path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/></g></svg></span><span class="jmp r"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1.14 0)"><path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/></g></svg></span></template>
</nav>
```

```css
.B-05 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
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
.B-05 .pg-gap:hover .ell, .B-05 .pg-gap:focus-visible .ell { opacity: 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-06 Atlassian Pagination (서브틀 셰브론)

| 항목 | 내용 |
|---|---|
| 출처 | [Atlassian](https://atlassian.design/components/pagination/examples) |
| 생김새 | @atlaskit/icon/core/chevron-left·right를 서브틀 Button 안에. 높이 32px, 라운드 6px, 아이콘 전용 패딩 0 2px. 기본 라벨 previous/next/page. 한도를 넘는 페이지는 "…"로 줄임. |
| 상태 | index 0과 마지막에서 isDisabled(버튼은 계속 보임). 선택 페이지는 Button의 isSelected 스타일 + aria-current. 비활성 글자 #080F214A, 배경 투명. |
| 모션 | 호버·눌림 → background-color + border-color, box-shadow(살짝 오버슛) |
| 타이밍 | `150ms cubic-bezier(0.4,1,0.6,1) / box-shadow 0.15s cubic-bezier(0.47,0.03,0.49,1.38)` |
| 느낌 | 조용 · 서브틀 · 오버슛 |
| 용도 | Jira·Confluence식 조용한 UI |

```html
<nav class="B-06" aria-label="페이지네이션" data-behavior="pager" data-total="5" data-start="1">
  <button type="button" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-06 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-06 [data-pages] { display: contents; }
.B-06 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 2px; font: inherit; color: var(--fg-2); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color 150ms cubic-bezier(.4,1,.6,1), border-color 150ms cubic-bezier(.4,1,.6,1), box-shadow .15s cubic-bezier(.47,.03,.49,1.38); }
.B-06 .ic { width: 16px; height: 16px; }
.B-06 button:hover { background: color-mix(in srgb, var(--fg-1) 6%, transparent); }
.B-06 button:active { background: color-mix(in srgb, var(--fg-1) 12%, transparent); box-shadow: 0 0 0 2px color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-06 button[aria-current] { color: var(--fg-1); font-weight: var(--weight-semibold); background: color-mix(in srgb, var(--fg-1) 10%, transparent); }
.B-06 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 1px; }
.B-06 button:disabled { color: color-mix(in srgb, var(--fg-1) 29%, transparent); cursor: default; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-07 Shopify Polaris Pagination (세그먼트 쌍 + 라벨)

| 항목 | 내용 |
|---|---|
| 출처 | [Shopify Polaris](https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react/pagination) |
| 생김새 | ChevronLeftMinor/RightMinor 아이콘 버튼 두 개를 ButtonGroup으로 붙이고 사이(또는 옆)에 라벨. table 타입은 24px 정사각(--p-space-600) + bg-surface-secondary. 가이드: "Don’t rely on arrow icons alone." |
| 상태 | 호버 tertiary-hover, 눌림/포커스 tertiary-active + 안쪽 그림자. hasPrevious/hasNext가 false면 비활성(icon-disabled 채움). |
| 모션 | 호버·눌림 → 배경색, 눌리면 콘텐츠 translateY(1px) |
| 타이밍 | `75ms cubic-bezier(0.19,0.91,0.38,1) · 비활성은 transition:none` |
| 느낌 | 촘촘 · 즉각 · 눌림감 |
| 용도 | 커머스 어드민 · 번호 없는 "‹ › 페이지 2" |

```html
<nav class="B-07" aria-label="페이지" data-behavior="pager" data-labels="페이지 1,페이지 2,페이지 3,페이지 4,페이지 5" data-start="1">
  <span class="group">
    <button type="button" data-prev aria-label="이전"><span class="c"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span></button>
    <button type="button" data-next aria-label="다음"><span class="c"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span></button>
  </span>
  <span class="lab" data-label></span>
</nav>
```

```css
.B-07 { display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-14); color: var(--fg-2); }
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
.B-07 button:disabled .c { transition: none; transform: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-08 GitHub Primer Pagination (‹ 이전 1 2 … 다음 ›)

| 항목 | 내용 |
|---|---|
| 출처 | [GitHub Primer](https://primer.style/product/components/pagination/) |
| 생김새 | 1em 셰브론 + 4px 아이콘 간격의 텍스트 링크(원본 accent blue → fg-1). 페이지는 최소 32px, radius medium, 간격 4px. 현재 페이지는 accent-emphasis 채움 + 흰 글자. showPages={narrow:false}면 모바일은 이전/다음만. 데모는 폭 때문에 3페이지. |
| 상태 | 호버/포커스 control-transparent-hover 배경. 끝의 비활성은 보이되 fgColor-disabled + aria-hidden·aria-disabled. 포커스 visible은 2px accent 아웃라인(−2px 오프셋). |
| 모션 | 호버 → background-color |
| 타이밍 | `평상시 0.2s cubic-bezier(0.3,0,0.5,1), 호버 중에는 0.1s (빨리 들어오고 천천히 빠짐)` |
| 느낌 | 텍스트 링크 · 비대칭 페이드 · 개발자 |
| 용도 | 개발자·콘텐츠 목록 |

```html
<nav class="B-08" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg><span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><span>다음</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-08 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-08 [data-pages] { display: contents; }
.B-08 button { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); min-width: 32px; height: 32px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color .2s cubic-bezier(.3,0,.5,1); }
.B-08 .ic { width: 16px; height: 16px; }
.B-08 button:hover, .B-08 button:focus-visible { background: color-mix(in srgb, var(--fg-1) 8%, transparent); transition-duration: .1s; }
.B-08 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.B-08 button[aria-current] { color: var(--bg-1); background: var(--fg-1); font-weight: var(--weight-semibold); }
.B-08 button:disabled { color: color-mix(in srgb, var(--fg-1) 35%, transparent); background: transparent; cursor: default; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-09 IBM Carbon Pagination (구분선 캐럿 버튼 바)

| 항목 | 내용 |
|---|---|
| 출처 | [IBM Carbon](https://carbondesignsystem.com/components/pagination/usage/) |
| 생김새 | 페이지당 항목 셀렉트, 범위 텍스트, 페이지 셀렉트, 정사각 캐럿 버튼. 각 버튼은 바 높이와 같은 폭(xs 24 / sm 32 / md 40 기본 / lg 48), border-inline-start:1px $border-subtle 로 구분. 작은 브레이크포인트에서는 셀렉트가 빠지고 화살표는 남음. 데모는 폭(288px 무대) 때문에 페이지 셀렉트와 "페이지당" 글자를 생략하고 범위 라벨에서 "/ 100"을 뺌. |
| 상태 | 호버 $layer-hover. 비활성(--no-index)은 $icon-disabled 채움 + not-allowed 커서. 포커스 2px solid $focus(−2px 안쪽 오프셋), 구분선 제거. |
| 모션 | 호버·포커스 → background-color + outline |
| 타이밍 | `110ms (duration-fast-02) cubic-bezier(0.2,0,0.38,0.9) productive standard` |
| 느낌 | 엔터프라이즈 · 구분선 · 각진 |
| 용도 | 엔터프라이즈 데이터 테이블 |

```html
<nav class="B-09" aria-label="페이지" data-behavior="pager" data-labels="1–10,11–20,21–30,31–40,41–50" data-start="1">
  <span class="per"><b>10</b><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span>
  <span class="range" data-label></span>
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-09 { display: flex; align-items: center; height: 40px; font-size: var(--text-14); color: var(--fg-2); background: var(--bg-1); border-top: 1px solid var(--border-subtle); border-bottom: 1px solid var(--border-subtle); }
.B-09 .per { display: inline-flex; align-items: center; gap: var(--space-1); padding: 0 var(--space-2) 0 var(--space-3); white-space: nowrap; }
.B-09 .per b { color: var(--fg-1); font-weight: var(--weight-regular); }
.B-09 .range { padding: 0 var(--space-3); white-space: nowrap; border-inline-start: 1px solid var(--border-subtle); }
.B-09 button { box-sizing: border-box; display: grid; place-items: center; width: 40px; height: 40px; padding: 0; color: var(--fg-1); background: transparent; border: 0; border-inline-start: 1px solid var(--border-subtle); cursor: pointer; transition: background-color 110ms cubic-bezier(.2,0,.38,.9), outline 110ms cubic-bezier(.2,0,.38,.9); }
.B-09 .ic { width: 20px; height: 20px; }
.B-09 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-09 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; border-inline-start-color: transparent; }
.B-09 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: not-allowed; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-10 IBM Carbon Pagination Nav (자라나는 밑줄)

| 항목 | 내용 |
|---|---|
| 출처 | [IBM Carbon](https://github.com/carbon-design-system/carbon/blob/main/packages/styles/scss/components/pagination-nav/_mixins.scss) |
| 생김새 | 캐럿 방향 버튼($spacing-09, 48px), 페이지 숫자는 body-compact-01. 활성 페이지는 weight 600 + 높이 4px($spacing-02) · 폭 16px($spacing-05)의 밑줄을 가운데에 둠. 데모는 폭 때문에 4페이지. |
| 상태 | 호버 $background-hover. 비활성은 text-secondary 50% + pointer-events:none. loop 옵션을 쓰면 끝에서 비활성 대신 순환. prefers-reduced-motion에서 전환 끔. |
| 모션 | 페이지 활성 → 밑줄 폭 0 → 16px (가운데에서 퍼짐), 배경·색도 같이 |
| 타이밍 | `110ms cubic-bezier(0.2,0,0.38,0.9)` |
| 느낌 | 탭 느낌 · 밑줄 성장 · 정갈 |
| 용도 | 아티클·갤러리 내비 |

```html
<nav class="B-10" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-0.33 0)"><path d="M15 6v12l-8-6z" fill="currentColor"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.33 0)"><path d="M9 6v12l8-6z" fill="currentColor"/></g></svg></button>
</nav>
```

```css
.B-10 { display: flex; align-items: center; font-size: var(--text-14); color: var(--fg-1); }
.B-10 [data-pages] { display: contents; }
.B-10 button { position: relative; box-sizing: border-box; display: grid; place-items: center; min-width: 40px; height: 48px; padding: 0; font: inherit; color: var(--fg-1); background: transparent; border: 0; cursor: pointer; transition: background-color 110ms cubic-bezier(.2,0,.38,.9), color 110ms cubic-bezier(.2,0,.38,.9); }
.B-10 .ic { width: 16px; height: 16px; }
.B-10 [data-prev], .B-10 [data-next] { min-width: 48px; }
.B-10 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-10 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.B-10 button:disabled { color: color-mix(in srgb, var(--fg-1) 50%, transparent); pointer-events: none; }
.B-10 button[aria-current] { font-weight: var(--weight-semibold); }
.B-10 button[aria-current]::after { content: ''; position: absolute; bottom: 0; left: calc(50% - 8px); width: 16px; height: 4px; background: var(--fg-1); animation: B-10-grow 110ms cubic-bezier(.2,0,.38,.9); }
@keyframes B-10-grow { from { width: 0; left: 50%; } to { width: 16px; left: calc(50% - 8px); } }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-11 Adobe Spectrum explicit (‹ [1] / N 페이지 ›)

| 항목 | 내용 |
|---|---|
| 출처 | [Adobe Spectrum CSS](https://github.com/adobe/spectrum-css/tree/main/components/pagination) |
| 생김새 | ChevronLeft100/Right100 아이콘의 quiet ActionButton(이전은 오른쪽 아이콘을 180° 회전해 재사용), 텍스트 필드, 흐린 색 "of 89 pages". 데모의 필드는 현재 페이지를 보여주는 읽기 전용 칸. |
| 상태 | ActionButton 호버/포커스. RTL은 --spectrum-logical-rotation으로 뒤집음. |
| 모션 | 호버·포커스 → border-color + box-shadow |
| 타이밍 | `130ms ease-in-out (--spectrum-animation-duration-100)` |
| 느낌 | 조용 · 입력형 · 문서 뷰어 |
| 용도 | 뷰어 · 긴 문서(번호보다 직접 입력) |

```html
<nav class="B-11" aria-label="페이지" data-behavior="pager" data-labels="1,2,3,4,5" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <span class="field" data-label></span>
  <span class="of">/ 5 페이지</span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-11 { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-14); color: var(--fg-1); }
.B-11 .field { box-sizing: border-box; display: grid; place-items: center; min-width: 40px; height: 32px; padding: 0 var(--space-2); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); }
.B-11 .of { color: var(--fg-3); white-space: nowrap; }
.B-11 button { box-sizing: border-box; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; color: var(--fg-1); background: transparent; border: 1px solid transparent; border-radius: var(--radius-sm); cursor: pointer; transition: border-color 130ms ease-in-out, box-shadow 130ms ease-in-out; }
.B-11 .ic { width: 16px; height: 16px; }
.B-11 button[data-prev] .ic { transform: rotate(180deg); }
.B-11 button:hover { border-color: var(--border-strong); }
.B-11 button:focus-visible { outline: 0; border-color: var(--fg-1); box-shadow: 0 0 0 1px var(--fg-1); }
.B-11 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: default; border-color: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-12 Adobe Spectrum listing (Prev/Next 아웃라인 알약)

| 항목 | 내용 |
|---|---|
| 출처 | [Adobe Spectrum CSS](https://github.com/adobe/spectrum-css/tree/main/components/pagination) |
| 생김새 | "Prev"/"Next" 텍스트를 primary outline Button(알약)에 넣고, 사이에 quiet ActionButton 페이지 번호. 데모는 폭 때문에 3페이지. |
| 상태 | Spectrum 버튼 상태를 따름(추정). |
| 모션 | 호버·포커스 → border-color + box-shadow |
| 타이밍 | `130ms ease-in-out (같은 토큰에서 추정)` (추정) |
| 느낌 | 알약 · 텍스트 버튼 · 무게감 |
| 용도 | 텍스트 버튼이 셰브론보다 무게가 필요할 때 |

```html
<nav class="B-12" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev class="edge">이전</button>
  <span data-pages></span>
  <button type="button" data-next class="edge">다음</button>
</nav>
```

```css
.B-12 { display: flex; align-items: center; gap: var(--space-2); font-size: var(--text-14); color: var(--fg-1); }
.B-12 [data-pages] { display: contents; }
.B-12 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-2); font: inherit; font-weight: var(--weight-semibold); color: var(--fg-1); background: transparent; border: 2px solid transparent; border-radius: var(--radius-pill); cursor: pointer; transition: border-color 130ms ease-in-out, box-shadow 130ms ease-in-out, background-color 130ms ease-in-out; }
.B-12 .edge { border-color: currentColor; padding: 0 14px; }
.B-12 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-12 button[aria-current] { background: color-mix(in srgb, var(--fg-1) 12%, transparent); }
.B-12 button:focus-visible { outline: 0; box-shadow: 0 0 0 2px var(--bg-1), 0 0 0 4px var(--fg-1); }
.B-12 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: default; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-13 Chakra UI v3 compact (‹ 1 / 10 ›)

| 항목 | 내용 |
|---|---|
| 출처 | [Chakra UI](https://chakra-ui.com/docs/components/pagination) |
| 생김새 | ghost sm IconButton(32px) + HiChevronLeft/Right, Pagination.PageText가 "1 of 10"을 표시. format="long"이면 "1 - 5 of 50". 간격 16px. 기본 변형에서는 선택된 페이지 아이템이 ghost에서 outline으로 바뀜. |
| 상태 | 비활성은 layerStyle "disabled"(opacity 약 .5, 추정). focusVisibleRing은 "outside". |
| 모션 | 호버 → transitionProperty "common"(배경·색) |
| 타이밍 | `200ms (duration moderate, easing 기본 추정)` (추정) |
| 느낌 | 컴팩트 · 카운터형 · 모바일 |
| 용도 | 모바일 · 카드 푸터 |

```html
<nav class="B-13" aria-label="페이지" data-behavior="pager" data-total="10" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span class="txt" data-label></span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-13 { display: flex; align-items: center; gap: var(--space-4); font-size: var(--text-14); color: var(--fg-1); }
.B-13 .txt { min-width: 48px; text-align: center; }
.B-13 button { box-sizing: border-box; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; color: var(--fg-1); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color 200ms, color 200ms; }
.B-13 .ic { width: 20px; height: 20px; }
.B-13 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-13 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.B-13 button:disabled { opacity: .5; cursor: default; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-14 Mantine Pagination (테두리 사각 + 처음/끝)

| 항목 | 내용 |
|---|---|
| 출처 | [Mantine](https://mantine.dev/core/pagination/) |
| 생김새 | 흰 바탕에 1px gray-4 테두리 컨트롤. 크기 xs 22 / sm 26 / md 32 / lg 38 / xl 44. withEdges가 처음/끝 추가. layout="responsive"는 컨테이너 쿼리로 "Page X of Y"로 접힘. 데모는 폭 때문에 3페이지. |
| 상태 | 호버 gray-0. 활성은 primary 채움 + 흰 글자(→ fg-1 / bg-1). 비활성 opacity .4 + not-allowed. |
| 모션 | 클릭(눌림) → 눌리는 동안 translateY(1px). 색 변화는 즉시(전환 없음) |
| 타이밍 | `transition 없음 · 눌림 1px` |
| 느낌 | 촉각적 · 물리 버튼 · 즉각 |
| 용도 | "물리 버튼" 느낌의 페이지네이션 |

```html
<nav class="B-14" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-first aria-label="첫 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1.14 0)"><path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/></g></svg></button>
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <button type="button" data-last aria-label="마지막 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1.14 0)"><path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/></g></svg></button>
</nav>
```

```css
.B-14 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-14 [data-pages] { display: contents; }
.B-14 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; }
.B-14 .ic { width: 16px; height: 16px; }
.B-14 button:hover { background: var(--bg-2); }
.B-14 button:active { transform: translateY(1px); }
.B-14 button[aria-current] { color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); }
.B-14 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.B-14 button:disabled { opacity: .4; cursor: not-allowed; transform: none; background: var(--bg-1); }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-15 shadcn/ui (Lucide 셰브론 + 이전/다음 글자)

| 항목 | 내용 |
|---|---|
| 출처 | [shadcn/ui](https://ui.shadcn.com/docs/components/pagination) |
| 생김새 | 페이지 링크는 ghost size-9(36px). Previous/Next는 h-9, 셰브론 + 글자("hidden sm:block"이라 모바일에선 셰브론만). 말줄임은 MoreHorizontal 아이콘 + sr-only "More pages". 데모는 폭 때문에 3페이지·말줄임 생략. |
| 상태 | 활성 페이지는 outline 변형 + aria-current="page". 호버 bg-accent. 포커스 visible은 3px 링(ring/50). 비활성 opacity 50%. aria "Go to previous page". |
| 모션 | 호버·포커스 → transition-all |
| 타이밍 | `150ms cubic-bezier(0.4,0,0.2,1) (Tailwind 기본, 추정)` (추정) |
| 느낌 | 모던 · 담백 · SaaS |
| 용도 | Tailwind 기반 SaaS |

```html
<nav class="B-15" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지" class="edge"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg><span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지" class="edge"><span>다음</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-15 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); font-weight: var(--weight-medium); color: var(--fg-1); }
.B-15 [data-pages] { display: contents; }
.B-15 button { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); min-width: 36px; height: 36px; padding: 0; font: inherit; color: var(--fg-1); background: transparent; border: 1px solid transparent; border-radius: var(--radius-md); cursor: pointer; transition: all 150ms cubic-bezier(.4,0,.2,1); }
.B-15 .edge { padding: 0 10px; }
.B-15 .ic { width: 16px; height: 16px; }
.B-15 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-15 button[aria-current] { background: var(--bg-1); border-color: var(--border); box-shadow: var(--shadow-sm); }
.B-15 button:focus-visible { outline: 0; box-shadow: 0 0 0 3px color-mix(in srgb, var(--fg-1) 50%, transparent); }
.B-15 button:disabled { opacity: .5; cursor: default; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-16 PatternFly compact (요약 위, 컴팩트 아래)

| 항목 | 내용 |
|---|---|
| 출처 | [PatternFly](https://www.patternfly.org/components/pagination/design-guidelines) |
| 생김새 | 전체 버전은 페이지당 토글, 처음/이전/다음/마지막, "of N" 입력칸. 모바일에서는 위쪽이 눌리지 않는 개수 요약으로 접히고, 아래쪽에는 이전·다음·페이지당만 남음(처음/끝 없음). |
| 상태 | 모바일 하단 바는 sticky + 가운데 정렬. |
| 모션 | 호버 → 일반 plain 버튼 호버만 (전용 모션 없음, 추정) |
| 타이밍 | `없음 (추정)` (추정) |
| 느낌 | 반응형 · 요약+컴팩트 · 고정 바 |
| 용도 | 반응형 데이터 테이블 |

```html
<nav class="B-16" aria-label="페이지" data-behavior="pager" data-labels="1 - 10 / 100,11 - 20 / 100,21 - 30 / 100,31 - 40 / 100,41 - 50 / 100" data-start="1">
  <span class="sum" data-label></span>
  <div class="bar">
    <span class="per">10 / 페이지<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span>
    <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
    <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  </div>
</nav>
```

```css
.B-16 { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); font-size: var(--text-14); color: var(--fg-2); }
.B-16 .sum { color: var(--fg-1); }
.B-16 .bar { position: sticky; bottom: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); background: var(--bg-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); }
.B-16 .per { display: inline-flex; align-items: center; gap: var(--space-1); padding: 0 var(--space-2); white-space: nowrap; }
.B-16 .per .ic { width: 16px; height: 16px; }
.B-16 button { box-sizing: border-box; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; color: var(--fg-1); background: transparent; border: 0; border-radius: var(--radius-sm); cursor: pointer; }
.B-16 button .ic { width: 20px; height: 20px; }
.B-16 button:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.B-16 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 1px; }
.B-16 button:disabled { color: color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: default; background: transparent; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

**CSS 프레임워크**

### B-17 Bootstrap 5.3 (붙은 박스, « » 글리프)

| 항목 | 내용 |
|---|---|
| 출처 | [Bootstrap 5.3](https://getbootstrap.com/docs/5.3/components/pagination/) |
| 생김새 | 붙어 있는 .page-link 셀(−1px 겹침, 바깥 양끝만 라운드), 패딩 .375rem .75rem. 화살표는 &laquo;/&raquo; 텍스트 글리프 + aria-label "Previous"/"Next". 크기 sm·lg. 데모는 폭 때문에 4페이지. |
| 상태 | 호버 tertiary-bg. 활성은 primary 배경(→ fg-1/bg-1) + aria-current. 비활성은 secondary 색·배경, 문서는 tabindex=-1 또는 span 권장. 포커스는 box-shadow 0 0 0 .25rem(primary 25%) + z-index 3. |
| 모션 | 호버·포커스 → color, background-color, border-color, box-shadow |
| 타이밍 | `.15s ease-in-out` |
| 느낌 | 클래식 · 붙은 셀 · CMS |
| 용도 | 클래식 웹 · CMS |

```html
<nav class="B-17" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev aria-label="이전"><span class="g" aria-hidden="true">&laquo;</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음"><span class="g" aria-hidden="true">&raquo;</span></button>
</nav>
```

```css
.B-17 { display: flex; align-items: center; font-size: var(--text-16); color: var(--fg-1); }
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
.B-17 [data-next] .g { translate: calc(var(--optical, 1) * 0.1em) 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-18 Bulma (이전/다음을 양끝으로, 알약 옵션)

| 항목 | 내용 |
|---|---|
| 출처 | [Bulma](https://bulma.io/documentation/components/pagination/) |
| 생김새 | 태블릿 이상에서 목록은 왼쪽, Previous/Next는 오른쪽. is-centered/is-right로 재배치. 최소 폭은 컨트롤 높이. is-rounded는 9999px 알약. 부드러운 2겹 드롭섀도. 데모는 알약 + 3페이지. |
| 상태 | 호버/포커스는 명도 델타만큼 어둡게. 눌림은 안쪽 그림자. is-disabled는 opacity .5 + 그림자 없음. is-current는 링크색 채움(→ fg-1/bg-1). |
| 모션 | 호버·눌림 → background, border, box-shadow, color |
| 타이밍 | `294ms ($duration, easing 미지정 → ease)` (추정) |
| 느낌 | 친근 · 알약 · 양끝 배치 |
| 용도 | 마케팅·블로그 |

```html
<nav class="B-18" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <span data-pages class="list"></span>
  <span class="edges">
    <button type="button" data-prev>이전</button>
    <button type="button" data-next>다음</button>
  </span>
</nav>
```

```css
.B-18 { display: flex; align-items: center; justify-content: space-between; width: 256px; font-size: var(--text-14); color: var(--fg-1); }
.B-18 .list { display: flex; gap: var(--space-2); }
.B-18 .edges { display: flex; gap: var(--space-2); }
.B-18 button { box-sizing: border-box; display: grid; place-items: center; min-width: 32px; height: 32px; padding: 0 var(--space-3); font: inherit; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-pill); box-shadow: var(--shadow-sm); cursor: pointer; transition-property: background-color, border-color, box-shadow, color; transition-duration: 294ms; }
.B-18 .list button { padding: 0; }
.B-18 button:hover { border-color: var(--border-strong); background: color-mix(in srgb, var(--fg-1) 4%, var(--bg-1)); }
.B-18 button:active { box-shadow: inset 0 1px 2px color-mix(in srgb, var(--fg-1) 20%, transparent); }
.B-18 button[aria-current] { color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); }
.B-18 button:focus-visible { outline: 2px solid color-mix(in srgb, var(--fg-1) 40%, transparent); outline-offset: 1px; }
.B-18 button:disabled { opacity: .5; box-shadow: none; cursor: default; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-19 Flowbite (긴 화살표 이전/다음 + "Showing 1 to 10")

| 항목 | 내용 |
|---|---|
| 출처 | [Flowbite](https://github.com/themesberg/flowbite/blob/main/content/components/pagination.md) |
| 생김새 | 붙은 셀 w-9/h-9 또는 h-10, rounded-s-base/rounded-e-base. 아이콘 변형은 16px 스트로크 셰브론 m15 19-7-7 7-7(stroke 2, rtl:rotate-180, sr-only "Previous"). prev/next 분리 변형은 줄기 M5 12h14M5 12l4-4 가 있는 긴 화살표 + 텍스트, shadow-xs. 테이블 변형은 굵은 "Showing 1 to 10 of 100 Entries". 데모는 긴 화살표 + 범위 문구 조합. |
| 상태 | 호버 bg-neutral-tertiary + 제목색 글자. 현재 페이지는 fg-brand 글자 + tertiary 배경. 원본은 focus:outline-none으로 아웃라인을 제거하지만, 접근성을 위해 데모에는 2px 포커스 링을 추가함(원본에 없음). |
| 모션 | 호버 → 배경·글자색이 즉시 바뀜 |
| 타이밍 | `transition 클래스 없음 (즉시)` |
| 느낌 | Tailwind · 긴 화살표 · 즉각 |
| 용도 | Tailwind 대시보드 · "← 이전 / 다음 →" |

```html
<nav class="B-19" aria-label="페이지" data-behavior="pager" data-labels="1–10,11–20,21–30,31–40,41–50" data-start="1">
  <p class="info">전체 100건 중 <b data-label></b></p>
  <div class="btns">
    <button type="button" data-prev><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M9 8l-4 4 4 4"/></svg><span>이전</span></button>
    <button type="button" data-next><span>다음</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M15 8l4 4-4 4"/></svg></button>
  </div>
</nav>
```

```css
.B-19 { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); font-size: var(--text-14); color: var(--fg-2); }
.B-19 .info { margin: 0; }
.B-19 .info b { color: var(--fg-1); font-weight: var(--weight-semibold); }
.B-19 .btns { display: flex; gap: var(--space-2); }
.B-19 button { box-sizing: border-box; display: inline-flex; align-items: center; gap: var(--space-2); height: 40px; padding: 0 var(--space-3); font: inherit; font-weight: var(--weight-medium); color: var(--fg-2); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-sm); cursor: pointer; }
.B-19 .ic { width: 16px; height: 16px; }
.B-19 button:hover { color: var(--fg-1); background: color-mix(in srgb, var(--fg-1) 6%, var(--bg-1)); }
.B-19 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; color: var(--fg-1); }
.B-19 button:disabled { opacity: .5; cursor: default; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-20 DaisyUI join (« 페이지 22 » + 2열 이전/다음)

| 항목 | 내용 |
|---|---|
| 출처 | [DaisyUI](https://daisyui.com/components/pagination/) |
| 생김새 | `join`으로 묶은 `btn join-item`. « / "Page 22" / » 변형과, `grid grid-cols-2` 에 btn-outline "Previous page"/"Next" 두 칸. 크기 btn-xs ~ btn-xl. |
| 상태 | 현재 페이지는 btn-active, 말줄임은 btn-disabled. 포커스 visible 2px solid 아웃라인(오프셋 2). |
| 모션 | 호버·눌림 → color, background, border, shadow, transform. 눌리면 translate: 0 0.5px + 그림자 평평 |
| 타이밍 | `0.2s cubic-bezier(0,0,0.2,1)` |
| 느낌 | 장난기 · 테마형 · 눌림 0.5px |
| 용도 | 테마 바꾸는 UI · 장난기 있는 서비스 |

```html
<nav class="B-20" aria-label="페이지">
  <div class="join" data-behavior="pager" data-labels="페이지 21,페이지 22,페이지 23,페이지 24" data-start="1">
    <button type="button" data-prev aria-label="이전 페이지"><span class="g">&laquo;</span></button>
    <span class="mid" data-label></span>
    <button type="button" data-next aria-label="다음 페이지"><span class="g">&raquo;</span></button>
  </div>
  <div class="two" data-behavior="pager" data-total="4" data-start="1">
    <button type="button" data-prev>이전 페이지</button>
    <button type="button" data-next>다음</button>
  </div>
</nav>
```

```css
.B-20 { display: flex; flex-direction: column; gap: var(--space-3); width: 256px; font-size: var(--text-14); color: var(--fg-1); }
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
.B-20 .join [data-next] .g { translate: calc(var(--optical, 1) * 0.1em) 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-21 Element Plus (채움 사각, 호버하면 «» 즉시 전환)

| 항목 | 내용 |
|---|---|
| 출처 | [Element Plus](https://element-plus.org/en-US/component/pagination.html) |
| 생김새 | ArrowLeft/ArrowRight 아이콘 또는 prev-text/next-text. 버튼 32×32(small 24, large 40), 라운드 2px, 아이템 간격 16px. `background` 옵션이면 fill-color 채움 사각 + margin 0 4px + primary 채움 활성(→ fg-1/bg-1). layout:"prev, pager, next, jumper, ->, total". 데모는 폭 때문에 small 24px. |
| 상태 | 호버 시 글자가 primary(→ fg-1). 비활성은 placeholder 색 + not-allowed. 포커스 visible은 1px primary 아웃라인(−1px). MoreFilled "…"가 mouseenter/focus에서 DArrowLeft/Right로 바뀜. aria "prevPages". |
| 모션 | 호버·포커스 → 말줄임 → «» 하드 컷(페이드 없음) |
| 타이밍 | `transition 없음 (Ant는 0.2s 페이드)` |
| 느낌 | 즉각 · 채움 사각 · Vue 어드민 |
| 용도 | Vue 관리 도구(스냅한 느낌) |

```html
<nav class="B-21" aria-label="페이지네이션" data-behavior="pager" data-total="10" data-jump="5" data-start="4">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <template data-gap><span class="dots"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none"/></svg></span><span class="jmp l"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1.14 0)"><path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/></g></svg></span><span class="jmp r"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1.14 0)"><path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/></g></svg></span></template>
</nav>
```

```css
.B-21 { display: flex; align-items: center; font-size: var(--text-14); color: var(--fg-2); }
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
.B-21 .pg-gap:not([data-jump-by^="-"]):hover .r, .B-21 .pg-gap:not([data-jump-by^="-"]):focus-visible .r { display: grid; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

**한국·공공 서비스**

### B-22 KRDS (정부 디자인 시스템, ‹ 이전 … 다음 ›)

| 항목 | 내용 |
|---|---|
| 출처 | [KRDS](https://github.com/KRDS-uiux/krds-uiux/blob/main/resources/scss/component/_pagination.scss) |
| 생김새 | 텍스트+아이콘 "이전"/"다음". ico_angle 마스크 아이콘을 이전은 90°, 다음은 −90° 회전. 높이 토큰 size-height-6(4rem, 루트 62.5%면 40px, 추정), 라운드 6px, 간격 8px. 정사각 페이지 링크. 현재 페이지는 굵게 + action-secondary-active 채움 + 반전 글자 + sr-only "현재페이지". 말줄임은 아이콘. 데모는 모바일 배치(페이지 줄 위, 이전/다음은 아래 줄). |
| 상태 | 호버/눌림 배경은 action-secondary 토큰. 비활성 이전은 `<span class="disabled">`로 렌더 + 비활성색. 고대비 모드 포함. |
| 모션 | 호버·눌림 → 배경색 |
| 타이밍 | `.4s ease-in-out ($transition-base) — 느리고 부드러움. 모바일 "다음"은 transition: none` |
| 느낌 | 느리고 부드러움 · 공공 · 큼직 |
| 용도 | KRDS를 따르는 한국 공공 서비스 |

```html
<nav class="B-22" aria-label="페이지네이션" data-behavior="pager" data-total="5" data-start="1">
  <button type="button" data-prev class="edge"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg><span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next class="edge nxt"><span>다음</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
</nav>
```

```css
.B-22 { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-2); width: 256px; font-size: var(--text-16); color: var(--fg-1); }
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
.B-22 button:disabled { color: var(--fg-4); background: transparent; cursor: default; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-23 Naver 검색 (엣지에 박힌 원형 화살표)

| 항목 | 내용 |
|---|---|
| 출처 | [Naver 검색](https://search.naver.com/search.naver?where=web&query=pagination) |
| 생김새 | btn_prev/btn_next는 흰 바탕에 1px #e9e9ec 테두리의 34px 원, 좌우 끝에 absolute 고정. 안에 12×12 스프라이트 화살표(다음은 같은 스프라이트를 scaleX(-1)로 뒤집음). 숫자 버튼 높이 36px, 패딩 0 10px, 마진 0 6px, 회색 #77777a. 현재 페이지는 네이버 초록 #03aa5a + 굵게(색은 재현하지 않고 fg-1). 스크린리더용 "이전"·"페이지" 숨김 글자. 데모는 폭 때문에 3페이지. |
| 상태 | 호버 bg rgba(0,0,0,.05). 첫 페이지에서 prev는 aria-disabled="true"로 보이되 아이콘 opacity .2. |
| 모션 | 호버 → 배경이 즉시 바뀜 |
| 타이밍 | `transition 없음 (추정)` (추정) |
| 느낌 | 엣지 고정 · 즉각 · 원형 |
| 용도 | 한국 검색·목록 UI · 스프라이트 하나로 양쪽 화살표 |

```html
<nav class="B-23" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전" class="btn_prev"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음" class="btn_next"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
</nav>
```

```css
.B-23 { position: relative; display: flex; align-items: center; justify-content: center; width: 256px; height: 36px; font-size: var(--text-14); color: var(--fg-3); }
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
.B-23 button:disabled .ic { opacity: .2; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-24 GOV.UK pagination (화살표 + 밑줄 Previous/Next)

| 항목 | 내용 |
|---|---|
| 출처 | [GOV.UK Design System](https://design-system.service.gov.uk/components/pagination/) |
| 생김새 | 15×13 화살표 SVG + 밑줄 "Previous"/"Next" 텍스트, 시각적으로 숨긴 " page". 타깃은 최소 45×45. 블록 변형은 링크를 세로로 쌓고 페이지 제목 같은 부제를 붙임. 데모는 폭 때문에 번호 목록 대신 현재/전체 표시. |
| 상태 | 호버 시 검정 tint-95 배경 + 더 두꺼운 밑줄. 현재 페이지는 링크 파랑 채움 + 흰 글자. 포커스는 GOV.UK 표준 노랑(추정)이고 아이콘이 focus-text 색으로 바뀜(→ fg-1 반전). 첫 페이지에서는 Previous가, 마지막에서는 Next가 표시되지 않음(데모는 자리를 유지하려 visibility:hidden). 한 페이지뿐이면 페이지네이션 자체가 없음. |
| 모션 | 없음 → 의도적으로 모션 없음 |
| 타이밍 | `없음 (설계상)` |
| 느낌 | 접근성 우선 · 밑줄 · 모션 없음 |
| 용도 | 접근성 최우선 공공 서비스 |

```html
<nav class="B-24" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <button type="button" data-prev><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/></svg><span>Previous</span></button>
  <span class="cnt" data-label></span>
  <button type="button" data-next><span>Next</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button>
</nav>
```

```css
.B-24 { display: flex; align-items: center; justify-content: space-between; width: 256px; font-size: var(--text-16); color: var(--fg-1); }
.B-24 .cnt { min-width: 45px; min-height: 45px; display: grid; place-items: center; color: var(--bg-1); background: var(--fg-1); }
.B-24 button { box-sizing: border-box; display: inline-flex; align-items: center; gap: var(--space-2); min-width: 45px; min-height: 45px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: transparent; border: 0; cursor: pointer; }
.B-24 button span { text-decoration: underline; text-underline-offset: .1em; }
.B-24 .ic { width: 15px; height: 13px; }
.B-24 button:hover { background: color-mix(in srgb, var(--fg-1) 5%, transparent); }
.B-24 button:hover span { text-decoration-thickness: 3px; }
.B-24 button:focus-visible { outline: 0; color: var(--bg-1); background: var(--fg-1); }
.B-24 button:disabled { visibility: hidden; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-25 USWDS (끝에서 제거, 모바일에선 화살표 숨김)

| 항목 | 내용 |
|---|---|
| 출처 | [USWDS](https://designsystem.digital.gov/components/pagination/) |
| 생김새 | navigate_before/navigate_next 18px 아이콘 + "Previous"/"Next" 라벨. 테두리 있는 페이지 버튼, 타깃 40px(units(5)), 최대 7슬롯, "…" 오버플로 아이템. 데모는 폭 때문에 3페이지·한국어 라벨. |
| 상태 | 첫 페이지에서 Previous는 숨김. 현재 페이지는 채움 배경 + aria-current. 호버 시 글자·테두리가 link-hover 색. aria-label "Previous page", "Page 1", "Last page, page 24". |
| 모션 | 없음 → 모션 없음 |
| 타이밍 | `없음` |
| 느낌 | 정부 양식 · 테두리 · 모션 없음 |
| 용도 | 정부 폼·검색 |

```html
<nav class="B-25" aria-label="페이지네이션" data-behavior="pager" data-total="3" data-start="1">
  <button type="button" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg><span>이전</span></button>
  <span data-pages></span>
  <button type="button" data-next aria-label="다음 페이지"><span>다음</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</nav>
```

```css
.B-25 { display: flex; align-items: center; gap: var(--space-1); font-size: var(--text-14); color: var(--fg-1); }
.B-25 [data-pages] { display: contents; }
.B-25 button { box-sizing: border-box; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); min-width: 40px; height: 40px; padding: 0 var(--space-2); font: inherit; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); cursor: pointer; }
.B-25 .ic { width: 18px; height: 18px; }
.B-25 button:hover { color: var(--fg-1); border-color: var(--fg-1); }
.B-25 button[aria-current] { color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); font-weight: var(--weight-bold); }
.B-25 button:focus-visible { outline: 3px solid color-mix(in srgb, var(--fg-1) 50%, transparent); outline-offset: 0; }
.B-25 [data-prev]:disabled { display: none; }
.B-25 [data-next]:disabled { color: var(--fg-4); cursor: default; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

**특수형**

### B-26 Apple HIG 페이지 컨트롤 (점, 양옆 탭 = 이전/다음)

| 항목 | 내용 |
|---|---|
| 출처 | [Apple HIG](https://developer.apple.com/design/human-interface-guidelines/page-controls) |
| 생김새 | 같은 간격의 작은 점 + 꽉 찬 현재 점. 페이지가 넘치면 가장자리 점이 작아짐. 배경 스타일은 automatic, prominent, minimal(반투명 둥근 사각). 최대 약 10점. 데모는 점을 8px, 투명도 .3로 추정해 재현하고 양옆 투명 영역을 이전/다음 탭 존으로 둠. |
| 상태 | 현재 점의 앞쪽/뒤쪽을 탭하면 이전/다음 페이지. 스크럽(드래그)은 순서대로 이동하고 가장자리를 넘으면 처음/끝으로 점프(데모 미구현). |
| 모션 | 탭 → 점 투명도 전환 + 애니메이션 스크롤 |
| 타이밍 | `.2s ease (시스템 기본 추정). 스크럽 중에는 애니메이션 쓰지 말 것` (추정) |
| 느낌 | 보이지 않는 화살표 · 점 · 모바일 |
| 용도 | 점 + 화살표 하이브리드 · 화살표 없이 좌우 탭 |

```html
<nav class="B-26" aria-label="페이지" data-behavior="pager" data-total="5" data-start="1">
  <div class="dots">
    <button type="button" data-prev class="zone l" aria-label="이전 페이지"></button>
    <span data-pages></span>
    <button type="button" data-next class="zone r" aria-label="다음 페이지"></button>
  </div>
  <p class="hint">점 양옆을 누르면 이전/다음</p>
</nav>
```

```css
.B-26 { display: flex; flex-direction: column; align-items: center; gap: var(--space-3); font-size: var(--text-14); color: var(--fg-1); }
.B-26 .dots { display: flex; align-items: center; padding: 0 var(--space-1); background: color-mix(in srgb, var(--fg-1) 12%, transparent); border-radius: var(--radius-pill); }
.B-26 [data-pages] { display: flex; align-items: center; gap: var(--space-2); }
.B-26 .pg { box-sizing: border-box; width: 8px; height: 8px; padding: 0; font-size: 0; background: var(--fg-1); border: 0; border-radius: 50%; opacity: .3; cursor: pointer; transition: opacity .2s ease; }
.B-26 .pg[aria-current] { opacity: 1; }
.B-26 .zone { box-sizing: border-box; width: 24px; height: 28px; padding: 0; background: transparent; border: 0; cursor: pointer; }
.B-26 .zone:focus-visible { outline: 2px solid var(--fg-1); border-radius: var(--radius-pill); }
.B-26 .zone:disabled { cursor: default; }
.B-26 .hint { margin: 0; color: var(--fg-3); }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### B-27 Google 검색 "Goooogle" (o가 페이지 번호)

| 항목 | 내용 |
|---|---|
| 출처 | [9to5Google · MacRumors](https://9to5google.com/2024/06/25/google-search-continuous-scroll/) |
| 생김새 | 로고의 o들이 페이지 번호 역할을 하고 "Next" 링크가 붙음. 데스크톱은 2024-06-25에 바가 돌아옴. 모바일은 연속 스크롤 뒤 "More results" 버튼을 썼고 "앞으로 몇 달 안에" 연속 스크롤을 접는다고 함. 각 o 링크 아래에 페이지 번호. 데모는 로고 글자 대신 일반 글꼴로 재현(브랜드 색·로고 제외). 참고 출처: https://www.macrumors.com/2024/06/26/google-scraps-continuous-scrolling-search-results/ |
| 상태 | o마다 페이지 번호 링크 하나. 현재 페이지 o는 굵게. |
| 모션 | 클릭 → 전체 페이지 로드(모션 없음) |
| 타이밍 | `없음` |
| 느낌 | 워드마크 · 재치 · 모션 없음 |
| 용도 | 브랜드 워드마크 페이지네이션 · "더 보기" vs 페이지 화살표 비교 사례 |

```html
<nav class="B-27" aria-label="페이지네이션" data-behavior="pager" data-total="4" data-start="1">
  <span class="logo">G</span>
  <span data-pages></span>
  <span class="logo">gle</span>
  <button type="button" data-next class="nx">Next</button>
</nav>
```

```css
.B-27 { display: flex; align-items: flex-start; flex-wrap: wrap; justify-content: center; width: 256px; font-size: var(--text-14); color: var(--fg-1); }
.B-27 .logo { font-size: var(--text-32); line-height: 1; font-weight: var(--weight-bold); color: var(--fg-1); }
.B-27 [data-pages] { display: flex; }
.B-27 .pg { box-sizing: border-box; display: flex; flex-direction: column; align-items: center; padding: 0; font: inherit; color: var(--fg-3); background: transparent; border: 0; cursor: pointer; }
.B-27 .pg::before { content: 'o'; font-size: var(--text-32); line-height: 1; font-weight: var(--weight-bold); color: var(--fg-1); }
.B-27 .pg[aria-current] { color: var(--fg-1); font-weight: var(--weight-bold); }
.B-27 .pg:hover { text-decoration: underline; }
.B-27 .nx { flex-basis: 100%; margin-top: var(--space-3); padding: 0; font: inherit; color: var(--fg-1); background: transparent; border: 0; text-decoration: underline; cursor: pointer; }
.B-27 .nx:disabled { color: var(--fg-4); cursor: default; text-decoration: none; }
.B-27 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

## C. 화살표 마이크로인터랙션

호버·클릭 때 화살표가 움직이는 방식. 넛지, 선 늘이기, 루프 통과, 원 그리기, 미리보기 드로어, 마그네틱, 3D 누름 등.

**넛지**

### C-01 넛지 앤 리턴 (한 번)

| 항목 | 내용 |
|---|---|
| 출처 | [lucide-animated · itshover](https://lucide-animated.com/icons/chevron-right) |
| 생김새 | 24px 스트로크 아이콘(chevron-right / circle-chevron-right / arrow-narrow-right)을 담은 아이콘 버튼. 데모는 왼쪽부터 itshover arrow-back(−3px), lucide chevron-right(2px), lucide arrow-big-right(3px), itshover arrow-narrow-right(4px). |
| 상태 | 호버로 들어올 때마다 한 번 밀렸다 돌아온다. 키보드 포커스에도 재생. 누름·비활성 변화 없음. |
| 모션 | 호버 진입 → x [0, 2, 0] (times 0 / .4 / 1). arrow-big-right [0, 3, 0], itshover arrow-narrow-right [0, 4, 0] (떠날 때 x→0 200ms easeOut), arrow-back [0, −3, 0] |
| 타이밍 | `500ms Motion 기본 easeInOut(= ease-in-out) · big-right·arrow-back 400ms` |
| 느낌 | 예의 바름 · 은은함 |
| 용도 | 페이지네이션 이전/다음 · 리스트 행 셰브론 · 캐러셀 화살표 |

```html
<div class="C-01">
  <button type="button" class="b-back" aria-label="뒤로"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/></svg></button>
  <button type="button" class="b-chev" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <button type="button" class="b-big" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.94 0)"><path d="M4 9h8V5l8 7-8 7v-4H4z" fill="currentColor"/></g></svg></button>
  <button type="button" class="b-narrow" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M15 8l4 4-4 4"/></svg></button>
  <span class="cap">−3px</span><span class="cap">2px</span><span class="cap">3px</span><span class="cap">4px</span>
</div>
```

```css
.C-01 { display: grid; grid-template-columns: repeat(4, auto); gap: var(--space-2) var(--space-3); justify-items: center; }
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
@keyframes C-01-xm3 { 50% { transform: translateX(-3px); } }
```

### C-02 활시위 반동

| 항목 | 내용 |
|---|---|
| 출처 | [lucide-animated arrow-right](https://lucide-animated.com/r/arrow-right.json) |
| 생김새 | 화살대(shaft)와 화살촉(head) path가 분리된 24px arrow-right. 데모는 라벨 + 화살표 검정 알약 버튼. |
| 상태 | 호버로 들어올 때마다 한 번. 키보드 포커스에도 재생. |
| 모션 | 호버 진입 → 화살대 d "M5 12h14"→"M5 12h9"→"M5 12h14" (CSS 힌트대로 왼쪽 기준 scaleX(.64)), 화살촉 translateX [0, −3, 0] |
| 타이밍 | `400ms (Motion 기본 easeInOut)` |
| 느낌 | 탄력 · 예비 동작 |
| 용도 | "다음" CTA · 캐러셀 다음 |

```html
<div class="C-02"><button type="button">다음 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button></div>
```

```css
.C-02 button { display: inline-flex; align-items: center; gap: var(--space-2); height: var(--space-7); padding: 0 var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.C-02 .ic { width: 24px; height: 24px; overflow: visible; }
.C-02 .shaft { transform-box: fill-box; transform-origin: left center; }
.C-02 button:is(:hover, :focus-visible) .shaft { animation: C-02-shaft 400ms ease-in-out; }
.C-02 button:is(:hover, :focus-visible) .head { animation: C-02-head 400ms ease-in-out; }
@keyframes C-02-shaft { 50% { transform: scaleX(.64); } }
@keyframes C-02-head { 50% { transform: translateX(-3px); } }
```

### C-03 스피드 대시

| 항목 | 내용 |
|---|---|
| 출처 | [itshover arrow-big-right-dash](https://github.com/Nani-LM10/itshover/tree/master/icons) |
| 생김새 | 굵은 윤곽 화살표 뒤에 세로 대시가 붙은 24px 아이콘 + 라벨 버튼. |
| 상태 | 호버 동안 밀린 상태 유지, 떠나면 복귀(복귀 곡선이 다름). |
| 모션 | 호버 → 화살표 x 0→4, 대시 scale 1→1.2 · opacity 1→.7 |
| 타이밍 | `들어갈 때 300ms easeOut, 떠날 때 200ms easeInOut` |
| 느낌 | 스포티 · 빠름 |
| 용도 | 건너뛰기·빨리 감기 · CTA |

```html
<div class="C-03"><button type="button">건너뛰기 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="arrow" d="M10 9h3V5l7 7-7 7v-4h-3z"/><path class="dash" d="M5 9v6"/></svg></button></div>
```

```css
.C-03 button { display: inline-flex; align-items: center; gap: var(--space-2); height: var(--space-7); padding: 0 var(--space-4) 0 var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; }
.C-03 .ic { width: 24px; height: 24px; overflow: visible; }
.C-03 .arrow, .C-03 .dash { transform-box: fill-box; transform-origin: center; transition: transform 200ms ease-in-out, opacity 200ms ease-in-out; }
.C-03 button:is(:hover, :focus-visible) :is(.arrow, .dash) { transition: transform 300ms ease-out, opacity 300ms ease-out; }
.C-03 button:is(:hover, :focus-visible) .arrow { transform: translateX(4px); }
.C-03 button:is(:hover, :focus-visible) .dash { transform: scale(1.2); opacity: .7; }
```

**선 늘이기**

### C-04 스쿼시 앤 스트레치

| 항목 | 내용 |
|---|---|
| 출처 | [Josh W. Comeau](https://joshwcomeau.com/animation/squash-and-stretch) |
| 생김새 | 24px 화살표. 화살대 "M 5,12 h 14"와 화살촉 "M 12,5 l 7,7 l -7,7"이 별도 path. 텍스트 링크 옆. |
| 상태 | 호버·포커스 동안 늘어난 상태 유지. CSS d 속성 전환이라 Safari에서는 움직이지 않는다(정지 상태). prefers-reduced-motion: no-preference 일 때만 전환. |
| 모션 | 호버 → 화살대 h 14→17, 화살촉 → "M 15,7 l 7,5 l -7,5" (끝이 +3 이동하며 높이 14→10으로 납작해짐) |
| 타이밍 | `CSS 버전 transition: d 300ms (ease). JS 버전은 spring stiffness 300 · damping 12, pointerenter 후 150ms 뒤 되돌림` |
| 느낌 | 탄성 · 만화적 · 살아있음 |
| 용도 | "더 읽기" · 다음 글 CTA |

```html
<div class="C-04"><button type="button">더 읽기 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button></div>
```

```css
.C-04 button { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-18); font-weight: var(--weight-semibold); color: var(--fg-1); background: none; border: 0; cursor: pointer; }
.C-04 .ic { width: 24px; height: 24px; overflow: visible; }
@media (prefers-reduced-motion: no-preference) {
  .C-04 .shaft, .C-04 .head { transition: d 300ms; }
}
.C-04 button:is(:hover, :focus-visible) .shaft { d: path("M 5,12 h 17"); }
.C-04 button:is(:hover, :focus-visible) .head { d: path("M 15,7 l 7,5 l -7,5"); }
```

### C-05 Stripe식 셰브론→화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Adam Wathan (Stripe 화살표 재현)](https://typefully.com/adamwathan/recreating-stripes-arrow-animation-with-NnPxtVr) |
| 생김새 | 알약 버튼 안 10×10 셰브론(tip)과 숨은 가로선(line). 원본은 브랜드 색 버튼. |
| 상태 | 버튼(그룹) 호버·포커스 동안 유지. |
| 모션 | 그룹 호버 → 선 opacity 0→1, 셰브론 translateX(3px) |
| 타이밍 | `150ms cubic-bezier(0.4, 0, 0.2, 1) — 원문에 시간 없음, Tailwind 기본값` (추정) |
| 느낌 | 또렷함 · 프리미엄 핀테크 |
| 용도 | CTA · 인라인 링크 |

```html
<div class="C-05"><button type="button">시작하기 <svg class="ic" viewBox="0 0 10 10" width="10" height="10" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="line" d="M0 5h7"/><path class="tip" d="M1 1l4 4-4 4"/></svg></button></div>
```

```css
.C-05 button { display: inline-flex; align-items: center; gap: var(--space-2); height: calc(var(--space-6) + var(--space-1)); padding: 0 var(--space-4) 0 var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.C-05 .ic { width: 10px; height: 10px; overflow: visible; }
.C-05 .line { opacity: 0; transition: opacity 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.C-05 .tip { transition: transform 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.C-05 button:is(:hover, :focus-visible) .line { opacity: 1; }
.C-05 button:is(:hover, :focus-visible) .tip { transform: translateX(3px); }
```

### C-06 화살대 색 드러내기

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse satyamchaudharydev/modern-sheep-10](https://uiverse.io/satyamchaudharydev/modern-sheep-10) |
| 생김새 | 버튼과 같은 색이라 안 보이는 10×2px 화살대 + 테두리로 그린 셰브론(padding 3px, 2px 선, rotate(−45deg)). 원본 버튼 #645bff, 호버 #111. |
| 상태 | 호버 동안 유지. 버튼 배경도 .2s 동안 어두워짐. |
| 모션 | 호버 → 화살대 배경 버튼색→흰색(여기선 var(--bg-1)), 셰브론 right 3px→0 |
| 타이밍 | `.2s (ease)` |
| 느낌 | 빠름 · 깔끔함 |
| 용도 | CTA · 페이지네이션 "다음" |

```html
<div class="C-06"><button type="button">가입하기<span class="arw" aria-hidden="true"></span></button></div>
```

```css
.C-06 button { display: inline-flex; align-items: center; gap: var(--space-2); padding: var(--space-4) calc(var(--space-6) - var(--space-1)); font: inherit; font-size: var(--text-16); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-2); border: 0; border-radius: calc(var(--space-5) - var(--space-1)); cursor: pointer; transition: .2s background; }
.C-06 .arw { position: relative; width: 10px; height: 2px; margin-top: 1px; background: var(--fg-2); transition: .2s; }
.C-06 .arw::before { content: ""; box-sizing: border-box; position: absolute; top: -3px; right: 3px; display: inline-block; padding: 3px; border: solid var(--bg-1); border-width: 0 2px 2px 0; transform: rotate(-45deg); transition: .2s; }
.C-06 button:is(:hover, :focus-visible) { background: var(--fg-1); }
.C-06 button:is(:hover, :focus-visible) .arw { background: var(--bg-1); }
.C-06 button:is(:hover, :focus-visible) .arw::before { right: 0; }
```

### C-07 화살대 성장 + 라벨 밀기

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse escannord/lovely-gecko-23](https://uiverse.io/escannord/lovely-gecko-23) |
| 생김새 | 굵은 라벨 + CSS 테두리로 그린 화살표(화살대 10px · 4px 셰브론). 좌우 괄호 모양 테두리가 호버 때 50%까지 자라 외곽선이 된다. 원본 rgb(56, 55, 100). |
| 상태 | 호버 동안 유지(배경 채움). 누르면 7px 반투명 링. |
| 모션 | 호버 → 화살대 width 10→25px, 셰브론 left 3→15px, 화살표·라벨 translateX(10px), 괄호 width 10px→50% |
| 타이밍 | `.3s (all, ease)` |
| 느낌 | 적극적 · 앞으로 기운 |
| 용도 | CTA |

```html
<div class="C-07"><button type="button"><span class="t">더 보기</span><span class="arw" aria-hidden="true"></span></button></div>
```

```css
.C-07 button { position: relative; display: flex; justify-content: space-around; align-items: center; padding: var(--space-4) var(--space-6); font: inherit; font-size: var(--text-16); font-weight: var(--weight-extrabold); color: var(--fg-1); background: transparent; border: 0; border-radius: 5px; cursor: pointer; }
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
.C-07 button:active { box-shadow: 0 0 0 7px color-mix(in srgb, var(--fg-1) 30%, transparent); }
```

### C-08 원→알약 "더 알아보기"

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse cssbuttons-io/massive-mayfly-74](https://uiverse.io/cssbuttons-io/massive-mayfly-74) |
| 생김새 | 12rem 폭 버튼. 3rem 짙은 원(원본 #282936) 안에 셰브론(10px 테두리 + 숨은 18×2px 화살대), 옆에 굵은 라벨. |
| 상태 | 호버 동안 유지. |
| 모션 | 호버 → 원 width 3rem→100% (채움 스윕), 숨은 화살대 배경 none→흰색, 화살표 translate(1rem, 0), 라벨 흰색 |
| 타이밍 | `.45s cubic-bezier(0.65, 0, 0.076, 1) (전부)` |
| 느낌 | 부드러움 · 자신감 · 프리미엄 |
| 용도 | CTA · 캐러셀 헤더 "전체 보기" |

```html
<div class="C-08"><button type="button"><span class="circle" aria-hidden="true"><span class="arw"></span></span><span class="t">더 알아보기</span></button></div>
```

```css
.C-08 button { position: relative; display: inline-block; width: calc(var(--space-12) + var(--space-6)); padding: 0; font: inherit; font-size: var(--text-16); background: transparent; border: 0; cursor: pointer; }
.C-08 .circle { position: relative; display: block; width: var(--space-7); height: var(--space-7); margin: 0; background: var(--fg-1); border-radius: var(--radius-pill); transition: all .45s cubic-bezier(0.65, 0, 0.076, 1); }
.C-08 .arw { position: absolute; top: 0; bottom: 0; left: 10px; width: 18px; height: 2px; margin: auto; background: none; transition: all .45s cubic-bezier(0.65, 0, 0.076, 1); }
.C-08 .arw::before { content: ""; position: absolute; top: -4.64px; right: 1px; box-sizing: content-box; width: 10px; height: 10px; border-top: 2px solid var(--bg-1); border-right: 2px solid var(--bg-1); transform: rotate(45deg); }
.C-08 .t { position: absolute; inset: 0; margin: 0 0 0 29.6px; padding: var(--space-3) 0; font-weight: var(--weight-bold); line-height: 1.6; text-align: center; color: var(--fg-1); transition: all .45s cubic-bezier(0.65, 0, 0.076, 1); }
.C-08 button:is(:hover, :focus-visible) .circle { width: 100%; }
.C-08 button:is(:hover, :focus-visible) .arw { background: var(--bg-1); transform: translate(1rem, 0); }
.C-08 button:is(:hover, :focus-visible) .t { color: var(--bg-1); }
```

**루프 통과·교체**

### C-09 루프 통과 (CSS 띠)

| 항목 | 내용 |
|---|---|
| 출처 | [Osmo — Button with rotating icon](https://www.osmo.supply/resource/button-with-rotating-icon) |
| 생김새 | 라벨 + 정사각 아이콘 타일. 타일 안 1em 폭 overflow:hidden 창에 화살표 3개짜리 flex 띠. 버튼 바닥에서 올라오는 와이프 면. |
| 상태 | @media (hover: hover) and (pointer: fine) 에서만 호버 효과. 키보드 포커스는 같은 효과를 따로 건다. |
| 모션 | 호버 → 띠의 화살표 translateX(200%) — 보이던 화살표는 오른쪽으로 나가고 앞 화살표가 왼쪽에서 들어옴. 타일 rotate(90deg), 와이프 translate(0, 175%) rotate(15deg)→(0, 0) rotate(0), 라벨 1.5em 위로 롤 |
| 타이밍 | `525ms cubic-bezier(0.625, 0.05, 0, 1) (전부)` |
| 느낌 | 매끈함 · 에이전시급 |
| 용도 | CTA · 캐러셀 다음 |

```html
<div class="C-09"><button type="button"><span class="wipe" aria-hidden="true"></span><span class="label"><span class="label-in">시작하기</span></span><span class="tile" aria-hidden="true"><span class="win"><span class="list"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></span></span></button></div>
```

```css
.C-09 button { position: relative; display: inline-flex; align-items: center; gap: var(--space-4); padding: var(--space-1) var(--space-1) var(--space-1) var(--space-5); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); overflow: hidden; isolation: isolate; cursor: pointer; transition: color 525ms cubic-bezier(0.625, 0.05, 0, 1); }
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
.C-09 button:focus-visible .list .ic { transform: translateX(200%); }
```

### C-10 예비 동작 루프 (Lottie)

| 항목 | 내용 |
|---|---|
| 출처 | [useAnimations arrowRight](https://github.com/useAnimations/react-useanimations) |
| 생김새 | 24px 스트로크 화살표, 30fps Lottie(icons/arrowRight.json). 데모는 이전(좌우 반전)/다음 원형 버튼, 24px 창에서 잘림. |
| 상태 | 호버·포커스마다 한 번 재생(약 1초). 화살표는 창 밖으로 나갔다 반대편에서 들어온다. |
| 모션 | 호버 진입 → f0–5 2px 뒤로 당김(ease-out) → f5–13 오른쪽으로 가속 이탈 → f14 왼쪽 끝으로 점프(hold 키프레임) → f14–25 들어오며 +1.3px 오버슈트(ease-out) → f25–30 안착(ease-in-out) |
| 타이밍 | `약 1s (167ms + 267ms + 367ms + …). 이탈 구간 cubic-bezier(.42, 0, 1, 1). 키프레임 17% / 43% / 44% / 83%` |
| 느낌 | 장난스러움 · 만화 에너지 |
| 용도 | 캐러셀 다음 · 온보딩 "계속" |

```html
<div class="C-10">
  <button type="button" class="prev" aria-label="이전"><span class="win"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></button>
  <button type="button" class="next" aria-label="다음"><span class="win"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></button>
</div>
```

```css
.C-10 { display: flex; gap: var(--space-3); }
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
}
```

### C-11 이중 화살표 교체

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse gharsh11032000/loud-chicken-53](https://uiverse.io/gharsh11032000/loud-chicken-53) |
| 생김새 | 2px 외곽 링 알약(radius 100px, 4px 투명 테두리, padding 16px 36px). 오른쪽에 화살표, 왼쪽 밖에 숨은 두 번째 화살표. 원본 greenyellow. |
| 상태 | 호버·포커스 동안 유지. 누르면 scale(.95) + 링 4px. |
| 모션 | 호버 → 뒤 화살표 right 16px→−25% (퇴장), 앞 화살표 left −25%→16px (등장), 라벨 translateX(−12px→12px), 20px 점이 220px 채움으로, radius 100px→12px, 외곽 링 2px→12px 로 퍼지며 투명 |
| 타이밍 | `.8s cubic-bezier(0.23, 1, 0.32, 1) (버튼 자체 .6s)` |
| 느낌 | 유려함 · 넉넉함 |
| 용도 | 히어로 CTA |

```html
<div class="C-11"><button type="button"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><span class="t">더 보기</span><span class="circle" aria-hidden="true"></span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button></div>
```

```css
.C-11 button { position: relative; display: flex; align-items: center; gap: 4px; padding: var(--space-4) calc(var(--space-6) + var(--space-1)); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: transparent; border: 4px solid transparent; border-radius: 100px; box-shadow: 0 0 0 2px var(--fg-1); overflow: hidden; cursor: pointer; transition: all .6s cubic-bezier(0.23, 1, 0.32, 1); }
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
.C-11 button:active { scale: .95; box-shadow: 0 0 0 4px var(--fg-1); }
```

### C-12 버블 홉 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Osmo — Button with bubble arrow](https://www.osmo.supply/resource/button-with-bubble-arrow) |
| 생김새 | 라벨 알약 + 원형 버블(화살표). 버블이 라벨 뒤에서 앞으로 건너뛴다. |
| 상태 | 호버·포커스 동안 유지. |
| 모션 | 호버 → 라벨 알약 translateX(−3.75em)→0, 앞 버블 scale 0→1 (왼쪽 기준), 뒤 버블 scale 1→0 (오른쪽 기준), 화살표 rotate(−45deg) |
| 타이밍 | `735ms cubic-bezier(0.625, 0.05, 0, 1)` |
| 느낌 | 통통함 · 하이엔드 |
| 용도 | CTA · 방문·외부 링크 |

```html
<div class="C-12"><button type="button"><span class="bub lead" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span><span class="grp"><span class="pill">방문하기</span><span class="bub trail" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></span></button></div>
```

```css
.C-12 button { display: flex; align-items: center; gap: var(--space-3); padding: 0; font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: none; border: 0; cursor: pointer; }
.C-12 .grp { display: flex; align-items: center; gap: var(--space-3); transform: translateX(-3.75em); transition: transform 735ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-12 .pill { display: flex; align-items: center; height: var(--space-7); padding: 0 var(--space-5); white-space: nowrap; background: var(--fg-1); border-radius: var(--radius-pill); }
.C-12 .bub { display: grid; place-items: center; flex: none; width: var(--space-7); height: var(--space-7); background: var(--fg-1); border-radius: 50%; transition: transform 735ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-12 .lead { transform: scale(0); transform-origin: left center; }
.C-12 .trail { transform-origin: right center; }
.C-12 .bub .ic { width: 20px; height: 20px; transition: transform 735ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-12 button:is(:hover, :focus-visible) .grp { transform: translateX(0); }
.C-12 button:is(:hover, :focus-visible) .lead { transform: scale(1); }
.C-12 button:is(:hover, :focus-visible) .trail { transform: scale(0); }
.C-12 button:is(:hover, :focus-visible) .bub .ic { transform: rotate(-45deg); }
```

**잔상·반복**

### C-13 에코 잔상

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse benjimich/lovely-octopus-40](https://uiverse.io/benjimich/lovely-octopus-40) |
| 생김새 | 텍스트 버튼 오른쪽 끝(right: 0)에 같은 화살표 3개가 겹쳐 있음. 원본 텍스트 #7f5af0, 화살표 #94a1b2. |
| 상태 | 호버·포커스 동안 유지. 버튼 letter-spacing 2px (.3s ease). |
| 모션 | 호버 → 2·3번째 사본이 right −20px / −40px 로 나가며 opacity .66 / .33 |
| 타이밍 | `.3s cubic-bezier(0.645, 0.045, 0.355, 1), 지연 50ms / 100ms` |
| 느낌 | 빠름 · 모션 블러 |
| 용도 | 빨리 감기 · 가로 스크롤 힌트 |

```html
<div class="C-13"><button type="button">다음 단계</button><span class="a a1" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span><span class="a a2" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span><span class="a a3" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></div>
```

```css
.C-13 { position: relative; display: flex; margin-right: 40px; }
.C-13 button { padding: var(--space-2) var(--space-6) var(--space-2) var(--space-5); font: inherit; font-size: var(--text-18); font-weight: var(--weight-semibold); color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: all .3s ease; }
.C-13 .a { position: absolute; top: 25%; right: 0; width: 24px; color: var(--fg-3); pointer-events: none; transition: all .3s cubic-bezier(0.645, 0.045, 0.355, 1); }
.C-13 .a .ic { display: block; width: 24px; height: 24px; }
.C-13 .a2, .C-13 .a3 { opacity: 0; }
.C-13 button:is(:hover, :focus-visible) { letter-spacing: 2px; }
.C-13 button:is(:hover, :focus-visible) ~ .a2 { right: -20px; opacity: .66; transition-delay: 50ms; }
.C-13 button:is(:hover, :focus-visible) ~ .a3 { right: -40px; opacity: .33; transition-delay: 100ms; }
```

### C-14 삼중 셰브론 캐스케이드

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse Li-Deheng/shy-moth-10](https://uiverse.io/Li-Deheng/shy-moth-10) |
| 생김새 | 알약 "NEXT" 버튼 + 66×43 뷰박스의 셰브론 3개(평소엔 한 자리에 겹침). 원본 #ff135a 바탕에 흰 셰브론. |
| 상태 | 호버·포커스 동안 계속 반복. 호버 때 아이콘 margin-right 0→25px (.5s), 외곽선 펄스 1s 한 번. |
| 모션 | 호버 → 셰브론 1·2가 translateX(−60% / −30%)→0 으로 펼쳐지고, color_anim 1s infinite 가 .2 / .4 / .6s 지연으로 흰색→버튼색→흰색을 차례로 쫓음 |
| 타이밍 | `펼침 .4s / .5s (ease), 색 1s infinite, 지연 .2 / .4 / .6s` |
| 느낌 | 에너지 · 고고고 |
| 용도 | 스와이프 힌트 · 다음 CTA |

```html
<div class="C-14"><button type="button">다음<span class="arw" aria-hidden="true"><svg class="ic" viewBox="0 0 66 43" width="40" height="26" fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(3.78 0)"><path class="three" d="M5 5l16 16.5L5 38"/><path class="two" d="M25 5l16 16.5L25 38"/><path class="one" d="M45 5l16 16.5L45 38"/></g></svg></span></button></div>
```

```css
.C-14 button { display: flex; align-items: center; padding: var(--space-1) var(--space-6); font: inherit; font-size: var(--text-24); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: 100px; box-shadow: 0 0 .2em 0 var(--fg-1); cursor: pointer; transition: 1s; }
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
@keyframes C-14-ring { 0% { outline: .2em solid var(--fg-1); outline-offset: 0; } }
```

### C-15 핑퐁 안쪽 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse Navarog21/ordinary-rat-19](https://uiverse.io/Navarog21/ordinary-rat-19) |
| 생김새 | 팔각형으로 잘린 5px 이중선 버튼(11em × 4em) + 네 귀퉁이 회전 사각 + 버튼 바깥 양옆의 삼각 화살표(바깥을 가리킴). 원본 #2761c3 → 호버 #27c39f. |
| 상태 | 호버·포커스 동안 왕복 반복. 떠나면 제자리로. |
| 모션 | 호버 → 삼각 화살표가 좌우 자리를 바꿔 안쪽을 가리킨 뒤 translateX 0↔±10px 왕복. 귀퉁이 scale 1→1.25, 귀퉁이 색이 .05→.15→.25→.35s 순서로 바뀜 |
| 타이밍 | `자리 바꿈 .2s, 왕복 0.6s ease-in-out both infinite alternate, 귀퉁이 색 0.1s ease-in-out` |
| 느낌 | 게임 같음 · 집요함 |
| 용도 | 장난스러운 CTA (페이지네이션엔 과함) |

```html
<div class="C-15"><button type="button"><span class="clip" aria-hidden="true"><span class="cn lt"></span><span class="cn rb"></span><span class="cn rt"></span><span class="cn lb"></span></span><span class="t">시 작</span><span class="ar ar-r" aria-hidden="true"></span><span class="ar ar-l" aria-hidden="true"></span></button></div>
```

```css
.C-15 button { position: relative; width: 11em; height: 4em; padding: 0; font: inherit; font-size: var(--text-14); font-weight: var(--weight-bold); color: var(--fg-1); background: transparent; border: 0; cursor: pointer; transition: .1s; }
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
/* 광학 보정: 삼각형 무게중심은 평평한 쪽에서 폭의 1/3 → 폭의 1/6(translate % 는 자기 폭 기준) 만큼 꼭짓점 쪽으로. 왕복은 transform 이라 겹치지 않는다 */
.C-15 .ar-l { translate: calc(var(--optical, 1) * -16.667%) 0; }
.C-15 .ar-r { translate: calc(var(--optical, 1) * 16.667%) 0; }
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
@keyframes C-15-r { from { transform: translateX(0); } to { transform: translateX(-10px); } }
```

### C-16 숨쉬는 대기 힌트

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse Wasim-Rana/lazy-fish-83](https://uiverse.io/Wasim-Rana/lazy-fish-83) |
| 생김새 | 버튼 라벨 뒤 화살표(원본 ➔ 글리프 24px, margin-left 10px). 원본은 보라 그라데이션 입체 버튼(기울기 변형은 C-34). |
| 상태 | 대기 중 계속 숨쉰다(원본은 색도 흰색↔#f3aefe). 호버·포커스 때 15px 앞으로. 원본은 같은 요소에 animation 과 hover transform 을 걸어 호버 이동이 묻히므로, 여기선 두 겹으로 나눠 둘 다 보이게 했다. |
| 모션 | 대기 / 호버 → 대기 translateX 0→5px 왕복, 호버 translateX(15px) |
| 타이밍 | `arrow-pulse 1.5s infinite alternate (ease) / 호버 .3s ease` |
| 느낌 | 차분함 · 초대하는 |
| 용도 | "넘겨보기 →" 힌트 · 첫 방문 캐러셀 신호 |

```html
<div class="C-16"><button type="button">넘겨보기<span class="arw" aria-hidden="true"><span class="pulse"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></span></button></div>
```

```css
.C-16 button { display: inline-flex; align-items: center; padding: var(--space-4) var(--space-6) var(--space-4) var(--space-5); font: inherit; font-size: var(--text-18); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); cursor: pointer; }
.C-16 .arw { display: inline-block; margin-left: 10px; transition: transform .3s ease; }
.C-16 .pulse { display: block; animation: C-16-pulse 1.5s infinite alternate; }
.C-16 .ic { display: block; width: 24px; height: 24px; }
.C-16 button:is(:hover, :focus-visible) .arw { transform: translateX(15px); }
@keyframes C-16-pulse { 0% { transform: translateX(0); } 100% { transform: translateX(5px); } }
```

**셰브론 변형·선 그리기**

### C-17 셰브론 날 세우기 + 원 팝

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops Arrow Navigation Styles — Circle pop](https://tympanus.net/codrops/2014/05/28/arrow-navigation-styles/) |
| 생김새 | 사진 위 50×50 버튼(가장자리에서 30px), 3px 흰 막대 2개로 만든 셰브론. 다음 버튼은 같은 아이콘을 rotate(180deg). 원본 배경 #cc6055. |
| 상태 | 호버·포커스 동안 유지. 데모는 루프 캐러셀(끝 없음). |
| 모션 | 호버 → 흰 원 opacity 0→1 · scale .9→1, 막대 ±30°→±45° (셰브론이 벌어짐), 막대 색이 배경색으로 |
| 타이밍 | `.3s (transform · opacity · background-color)` |
| 느낌 | 또렷함 · 단호함 |
| 용도 | 사진 위 슬라이더 이전/다음 |

```html
<div class="C-17" data-behavior="carousel" data-loop>
  <div class="track" data-track><div class="s">1</div><div class="s">2</div><div class="s">3</div></div>
  <button type="button" class="nav prev" data-prev aria-label="이전 슬라이드"><span class="iw"></span></button>
  <button type="button" class="nav next" data-next aria-label="다음 슬라이드"><span class="iw"></span></button>
</div>
```

```css
.C-17 { position: absolute; inset: 0; overflow: hidden; background: var(--fg-3); }
.C-17 .track { display: flex; height: 100%; }
.C-17 .s { display: grid; flex: 0 0 100%; place-items: center; font-size: var(--text-48); line-height: var(--lh-48); font-weight: var(--weight-bold); color: color-mix(in srgb, var(--bg-1) 40%, transparent); }
.C-17 .nav { position: absolute; top: 50%; width: 50px; height: 50px; margin: 0 30px; padding: 0; background: none; border: 0; cursor: pointer; transform: translateY(-50%); }
.C-17 .prev { left: 0; }
.C-17 .next { right: 0; }
.C-17 .nav::before { content: ""; position: absolute; inset: 0; background: var(--bg-1); border-radius: 50%; opacity: 0; transform: scale(.9); transition: transform .3s, opacity .3s; }
.C-17 .iw { position: relative; display: block; width: 80%; height: 80%; margin: 10% 0 0 10%; }
.C-17 .next .iw { transform: rotate(180deg); }
/* 광학 보정: 셰브론 가로 폭 ≈ 10px(막대 20px × sin30°), 1/6 ≈ 1.7px 를 가리키는 쪽으로. translate 는 부모 좌표라 next 의 180° 회전과 무관하게 부호를 직접 준다 */
.C-17 .prev .iw { translate: calc(var(--optical, 1) * -1.7px) 0; }
.C-17 .next .iw { translate: calc(var(--optical, 1) * 1.7px) 0; }
.C-17 .iw::before, .C-17 .iw::after { content: ""; position: absolute; left: 25%; width: 3px; height: 50%; background: var(--bg-1); backface-visibility: hidden; transition: transform .3s, background-color .3s; }
.C-17 .iw::before { transform: translateX(-50%) rotate(30deg); transform-origin: 0 100%; }
.C-17 .iw::after { top: 50%; transform: translateX(-50%) rotate(-30deg); transform-origin: 0 0; }
.C-17 .nav:is(:hover, :focus-visible)::before { opacity: 1; transform: scale(1); }
.C-17 .nav:is(:hover, :focus-visible) .iw::before, .C-17 .nav:is(:hover, :focus-visible) .iw::after { background: var(--fg-3); }
.C-17 .nav:is(:hover, :focus-visible) .iw::before { transform: translateX(-50%) rotate(45deg); }
.C-17 .nav:is(:hover, :focus-visible) .iw::after { transform: translateX(-50%) rotate(-45deg); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### C-18 획 채우기

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops ANS — Fillpath (nizuka.fr 참고)](https://github.com/codrops/ArrowNavigationStyles/blob/master/css/component.css) |
| 생김새 | 100×100 영역(데모 80×80)에 3px 팔 2개(원본 #566475) + 그 위 높이 0 인 흰 덧칠 막대. 원본 배경 #f3cf3f, 라벨 흰색 대문자. 데모는 밝은 면이라 덧칠을 var(--fg-1)로. |
| 상태 | 호버·포커스 동안 유지하며 라벨 표시. 데모는 루프 캐러셀. |
| 모션 | 호버 → 덧칠 막대 height 0→50% (색이 팔을 따라 이동), 팔 −135/−45° → −125/−55° (셰브론이 좁아짐, 다음은 거울상), 라벨 translateX(−50%)→0 페이드 인 |
| 타이밍 | `.3s (전부)` |
| 느낌 | 우아함 · 에디토리얼 |
| 용도 | 풀스크린 슬라이더 · 페이지 넘김 |

```html
<div class="C-18" data-behavior="carousel" data-loop>
  <div class="track" data-track><div class="s">1</div><div class="s">2</div><div class="s">3</div></div>
  <button type="button" class="nav prev" data-prev><span class="iw"></span><span class="lb">이전</span></button>
  <button type="button" class="nav next" data-next><span class="iw"></span><span class="lb">다음</span></button>
</div>
```

```css
.C-18 { position: absolute; inset: 0; overflow: hidden; }
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
/* 광학 보정: 팔 40px × sin45° ≈ 가로 폭 28px, 1/6 ≈ 4.7px 를 가리키는 쪽으로 (팔 회색·덧칠 모두, 라벨은 그대로) */
.C-18 .prev::before, .C-18 .prev::after, .C-18 .prev .iw { translate: calc(var(--optical, 1) * -4.7px) 0; }
.C-18 .next::before, .C-18 .next::after, .C-18 .next .iw { translate: calc(var(--optical, 1) * 4.7px) 0; }
.C-18 .lb { position: absolute; top: 50%; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-regular); white-space: nowrap; color: var(--fg-1); opacity: 0; transition: transform .3s, opacity .3s; }
.C-18 .prev .lb { left: 100%; transform: translateY(-50%) translateX(-50%); }
.C-18 .next .lb { right: 100%; transform: translateY(-50%) translateX(50%); }
.C-18 .nav:is(:hover, :focus-visible) .iw::before, .C-18 .nav:is(:hover, :focus-visible) .iw::after { height: 50%; }
.C-18 .nav:is(:hover, :focus-visible)::before, .C-18 .nav:is(:hover, :focus-visible) .iw::before { transform: translateX(-50%) rotate(-125deg); }
.C-18 .next:is(:hover, :focus-visible)::before, .C-18 .next:is(:hover, :focus-visible) .iw::before { transform: translateX(-50%) rotate(125deg); }
.C-18 .nav:is(:hover, :focus-visible)::after, .C-18 .nav:is(:hover, :focus-visible) .iw::after { transform: translateX(-50%) rotate(-55deg); }
.C-18 .next:is(:hover, :focus-visible)::after, .C-18 .next:is(:hover, :focus-visible) .iw::after { transform: translateX(-50%) rotate(55deg); }
.C-18 .nav:is(:hover, :focus-visible) .lb { opacity: 1; transform: translateY(-50%) translateX(0); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### C-19 순차 외곽선 그리기

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse Nawsome/chilly-moose-65](https://uiverse.io/Nawsome/chilly-moose-65) |
| 생김새 | 50×60 영역, 4px 막대 2개를 ±45° 돌려 만든 셰브론(원본 #666) + 각 막대 안 흰 덧칠(::after). 데모는 밝은 무대라 덧칠을 var(--fg-1)로, 이전 버튼은 좌우 반전. |
| 상태 | 호버·포커스 동안 유지. 누르면 scale(.9) (.1s). 떠날 땐 역순으로 지워짐. |
| 모션 | 호버 → 아래 팔 덧칠 right 100%→0 이 먼저, 이어서 위 팔 덧칠 left 100%→0 — 꼬리→꼭짓점→꼬리로 한 획처럼 그려짐 (리서치 요약은 위 팔이 먼저라고 적었지만 소스는 아래 팔이 먼저) |
| 타이밍 | `각 .15s (ease), .15s 간격` |
| 느낌 | 공들인 · 정밀함 |
| 용도 | 미니멀 아이콘 내비 |

```html
<div class="C-19">
  <button type="button" class="prev" aria-label="이전"><span class="g"><span class="arm top"></span><span class="arm bot"></span></span></button>
  <button type="button" class="next" aria-label="다음"><span class="g"><span class="arm top"></span><span class="arm bot"></span></span></button>
</div>
```

```css
.C-19 { display: flex; gap: var(--space-8); }
.C-19 button { position: relative; width: 50px; height: 60px; padding: 0; background: none; border: 0; cursor: pointer; transition: transform .1s; }
.C-19 .g { position: absolute; inset: 0; }
.C-19 .prev .g { transform: scaleX(-1); }
/* 광학 보정: 팔 50px × sin45° ≈ 가로 폭 35px, 1/6 ≈ 5.9px 를 가리키는 쪽으로. prev 는 scaleX(-1) 이지만 translate 는 부모 좌표라 부호를 직접 준다 */
.C-19 .prev .g { translate: calc(var(--optical, 1) * -5.9px) 0; }
.C-19 .next .g { translate: calc(var(--optical, 1) * 5.9px) 0; }
.C-19 .arm { position: absolute; top: 50%; left: -5px; width: 100%; height: 4px; background: var(--border-strong); }
.C-19 .arm::after { content: ""; position: absolute; top: 0; height: 100%; background: var(--fg-1); transition: all .15s; }
.C-19 .top { transform: rotate(45deg); transform-origin: bottom right; }
.C-19 .top::after { left: 100%; right: 0; transition-delay: 0s; }
.C-19 .bot { transform: rotate(-45deg); transform-origin: top right; }
.C-19 .bot::after { left: 0; right: 100%; transition-delay: .15s; }
.C-19 button:is(:hover, :focus-visible) .top::after { left: 0; transition-delay: .15s; }
.C-19 button:is(:hover, :focus-visible) .bot::after { right: 0; transition-delay: 0s; }
.C-19 button:active { transform: scale(.9); }
```

### C-20 원 획 지우기·다시 그리기

| 항목 | 내용 |
|---|---|
| 출처 | [useAnimations arrowRightCircle](https://github.com/useAnimations/react-useanimations) |
| 생김새 | 원형 테두리(r=10, 둘레 62.8) + 가운데 화살표. 데모는 48px 로 키운 이전/다음. |
| 상태 | 호버·포커스마다 한 번(2.5s). 화살표는 움직이지 않는다. |
| 모션 | 호버 진입 → trim path — 원이 지워지고(f0–30) 0.5s 멈춘 뒤(f30–45) 다시 그려짐(f45–75). stroke-dasharray 62.8, 12시 방향 시작(rotate(−90deg)) |
| 타이밍 | `지우기 1s cubic-bezier(.8, 0, .8, 1) → 멈춤 .5s → 그리기 1s cubic-bezier(.2, 0, .2, 1)` |
| 느낌 | 차분함 · 신중함 |
| 용도 | 자동재생 진행 표시가 있는 다음 버튼 |

```html
<div class="C-20">
  <button type="button" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M16 12H8"/><path class="head" d="M12 16l-4-4 4-4"/></svg></button>
  <button type="button" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M8 12h8"/><path class="head" d="M12 8l4 4-4 4"/></svg></button>
</div>
```

```css
.C-20 { display: flex; gap: var(--space-4); }
.C-20 button { display: grid; place-items: center; padding: 0; color: var(--fg-1); background: none; border: 0; border-radius: 50%; cursor: pointer; }
.C-20 .ic { width: 48px; height: 48px; stroke-width: 1.5; }
.C-20 .ring { stroke-dasharray: 62.8; stroke-dashoffset: 0; transform: rotate(-90deg); transform-box: fill-box; transform-origin: center; }
.C-20 button:is(:hover, :focus-visible) .ring { animation: C-20-trim 2.5s; }
@keyframes C-20-trim {
  0% { stroke-dashoffset: 0; animation-timing-function: cubic-bezier(.8, 0, .8, 1); }
  40% { stroke-dashoffset: 62.8; }
  60% { stroke-dashoffset: 62.8; animation-timing-function: cubic-bezier(.2, 0, .2, 1); }
  100% { stroke-dashoffset: 0; }
}
```

### C-21 굵기·채움 축 변화

| 항목 | 내용 |
|---|---|
| 출처 | [Material Symbols](https://developers.google.com/fonts/docs/material_symbols) |
| 생김새 | Material Symbols 가변 폰트 축 FILL 0–1, wght 100–700, GRAD −50–200, opsz 20–48. 데모는 폰트를 싣지 않고 SVG 로 근사: 왼쪽 두 개는 stroke-width 2→3 (wght), 오른쪽 두 개는 원 채움 (FILL). |
| 상태 | 호버·포커스 동안 유지. |
| 모션 | 호버 → font-variation-settings FILL 0→1 그리고/또는 wght 400→600 (Google: FILL 축이 상태 간 CSS 전환을 제공) |
| 타이밍 | `200ms ease-out — 원문에 시간 없음` (추정) |
| 느낌 | 무게감 · 은은한 강조 |
| 용도 | 페이지네이션 화살표 · 툴바 셰브론 |

```html
<div class="C-21">
  <button type="button" class="w" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="w" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <button type="button" class="f" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M16 12H8"/><path class="head" d="M12 16l-4-4 4-4"/></svg></button>
  <button type="button" class="f" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M8 12h8"/><path class="head" d="M12 8l4 4-4 4"/></svg></button>
</div>
```

```css
.C-21 { display: flex; align-items: center; gap: var(--space-3); }
.C-21 button { display: grid; place-items: center; width: var(--space-7); height: var(--space-7); padding: 0; color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.C-21 .ic { width: 32px; height: 32px; stroke-width: 2; transition: stroke-width 200ms ease-out; }
.C-21 .f { margin-left: var(--space-1); }
.C-21 .w:is(:hover, :focus-visible) .ic { stroke-width: 3; }
.C-21 .ring { fill: transparent; transition: fill 200ms ease-out; }
.C-21 .f :is(.shaft, .head) { transition: stroke 200ms ease-out; }
.C-21 .f:is(:hover, :focus-visible) .ring { fill: currentColor; }
.C-21 .f:is(:hover, :focus-visible) :is(.shaft, .head) { stroke: var(--bg-1); }
```

### C-22 줄→화살표 / →X 변형

| 항목 | 내용 |
|---|---|
| 출처 | [Sara Soueidan — Transformicons](https://www.sarasoueidan.com/blog/navicon-transformicons/) |
| 생김새 | 세 줄 햄버거(줄 두께 = 크기/7, 위아래 줄 간격 = 크기/4). 클릭으로 토글. |
| 상태 | 클릭 토글(aria-pressed). 왼쪽: 줄 → 왼쪽 화살표. 오른쪽: 줄 → X (X2 순차형, 닫힐 땐 역순). |
| 모션 | 클릭 (토글) → 화살표: 버튼 scale3d(.8), 위아래 줄 top 0 · width 크기/1.8 · rotate ±40deg. X: rotate ±45deg, 가운데 줄 투명 |
| 타이밍 | `기본 .3s. X2 열림: top .3s ease, transform .3s .5s ease. 닫힘(역순: top .3s .5s, transform .3s)은 리서치에 없는 추정값` (추정) |
| 느낌 | 기계적 · 만족스러움 |
| 용도 | 뒤로 ↔ 메뉴 · 미리보기 닫기(셰브론→X) |

```html
<div class="C-22" data-behavior="toggle">
  <button type="button" class="tb arrow" data-toggle aria-pressed="false" aria-label="메뉴와 뒤로 전환"><span class="lines"></span></button>
  <button type="button" class="tb x2" data-toggle aria-pressed="false" aria-label="메뉴와 닫기 전환"><span class="lines"></span></button>
</div>
```

```css
.C-22 { display: flex; gap: var(--space-5); }
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
.C-22 .x2.is-on .lines::after { transform: rotate3d(0, 0, 1, -45deg); }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

**드로어·미리보기**

### C-23 리빌 드로어

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops ANS — Reveal](https://tympanus.net/Development/ArrowNavigationStyles/) |
| 생김새 | 화면 가장자리 40×120px 탭(원본 rgba(142,68,173,.6) → #8e44ad). 펼치면 제목 + 썸네일(높이 100px). 데모 썸네일은 자리표시 블록. |
| 상태 | 호버·포커스 동안 펼침. 무대가 400px보다 좁으면 무대 폭 − 48px 까지만 펼친다. |
| 모션 | 호버 → 탭 width 40→400px, 배경 반투명→불투명 |
| 타이밍 | `.4s cubic-bezier(0.7, 0, 0.3, 1) (width · background-color)` |
| 느낌 | 극적 · 대칭 |
| 용도 | 글 이전/다음 · 페이지 넘김 |

```html
<div class="C-23">
  <button type="button" class="nav prev"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span><span class="pv"><span class="tt"><strong>이전 글</strong>가을 산책 기록</span><span class="th"></span></span></button>
  <button type="button" class="nav next"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span><span class="pv"><span class="th"></span><span class="tt"><strong>다음 글</strong>겨울 여행 준비</span></span></button>
</div>
```

```css
.C-23 { position: absolute; inset: 0; container-type: inline-size; }
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
.C-23 .tt strong { font-size: var(--text-18); line-height: var(--lh-18); font-weight: var(--weight-semibold); }
```

### C-24 둥근 슬라이드 알약

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops ANS — Rounded slide](https://tympanus.net/Development/ArrowNavigationStyles/) |
| 생김새 | 62px 짙은 원(padding 15px, radius 40px, 원본 #34495e) 안 32px 화살표(원본 #566473). 펼치면 200px(원본) 흰 알약 + 제목 — 데모는 반대쪽 버튼을 덮지 않게 min(200px, 무대 폭 − 110px)로 제한. |
| 상태 | 호버·포커스 동안 유지. |
| 모션 | 호버 → 원 width 62→200px · 배경 어두움→흰색, 제목 translateX(±100%)→0 + 페이드 인 |
| 타이밍 | `.3s (제목은 .1s 지연)` |
| 느낌 | 친근함 · 정보 제공 |
| 용도 | 블로그 이전/다음 · 스테퍼 |

```html
<div class="C-24">
  <button type="button" class="nav prev"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/></svg></span><span class="t">이전 글</span></button>
  <button type="button" class="nav next"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span><span class="t">다음 글</span></button>
</div>
```

```css
.C-24 { position: absolute; inset: 0; container-type: inline-size; }
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
.C-24 .nav:is(:hover, :focus-visible) .t { opacity: 1; transform: translateX(0); transition-delay: .1s; }
```

### C-25 슬릿 (순차 공개)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops ANS — Slit (Jam3 참고)](https://tympanus.net/Development/ArrowNavigationStyles/) |
| 생김새 | 세로로 긴 탭(padding 45px 5px, 원본 #939a9f) 안 화살표. 200px 미리보기 패널 + 아래로 접혀 나오는 캡션(높이 30%, 원본 #34495e). 데모 썸네일은 자리표시 블록. |
| 상태 | 호버·포커스 동안 유지. 떠날 땐 캡션이 먼저 접히고 패널·화살표가 .3s 뒤 돌아온다. |
| 모션 | 호버 → 0–300ms 화살표 translateX(±100%) 퇴장 → 300–600ms 패널 translateX(∓100%)→0 → 600–900ms 캡션 rotateX(−90°→0) 경첩처럼 내려옴 (perspective 1000px) |
| 타이밍 | `각 .3s. 패널 transition: transform .3s .3s, 캡션 지연 .6s` |
| 느낌 | 안무 · 시네마틱 |
| 용도 | 갤러리·프로젝트 페이지 넘김 |

```html
<div class="C-25">
  <button type="button" class="nav prev"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span><span class="pn"><span class="th"></span><span class="cap">이전 프로젝트</span></span></button>
  <button type="button" class="nav next"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span><span class="pn"><span class="th"></span><span class="cap">다음 프로젝트</span></span></button>
</div>
```

```css
.C-25 { position: absolute; inset: 0; }
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
.C-25 .nav:is(:hover, :focus-visible) .cap { transform: rotateX(0deg); transition-delay: .6s; }
```

### C-26 썸네일 플립

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops ANS — Thumb flip (Double flip 변형)](https://tympanus.net/Development/ArrowNavigationStyles/) |
| 생김새 | 100×100 타일(데모 80×80, 원본 #b1a798) 안 흰 화살표, 옆에 같은 크기 썸네일(자리표시 블록). perspective 1000px, 소실점은 화살표 쪽 끝. |
| 상태 | 호버·포커스 동안 유지. |
| 모션 | 호버 → 썸네일 rotateY(±90°)→0, 화살표 쪽 모서리가 경첩(origin 0% / 100% 50%). 타일 흰색으로, 화살표는 배경색으로 |
| 타이밍 | `.3s (transform · background-color · fill)` |
| 느낌 | 카드 같음 · 촉감 |
| 용도 | 페이지 넘김 · 갤러리 내비 |

```html
<div class="C-26">
  <button type="button" class="nav prev" aria-label="이전"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span><span class="th"></span></button>
  <button type="button" class="nav next" aria-label="다음"><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span><span class="th"></span></button>
</div>
```

```css
.C-26 { position: absolute; inset: 0; }
.C-26 .nav { position: absolute; top: 50%; padding: 0; background: none; border: 0; cursor: pointer; transform: translateY(-50%); perspective: 1000px; }
.C-26 .prev { left: 0; perspective-origin: 100% 50%; }
.C-26 .next { right: 0; perspective-origin: 0% 50%; }
.C-26 .iw { display: grid; place-items: center; width: 80px; height: 80px; color: var(--bg-1); background: var(--fg-3); transition: background-color .3s, color .3s; }
.C-26 .iw .ic { width: 32px; height: 32px; }
.C-26 .th { position: absolute; top: 0; width: 80px; height: 80px; background: linear-gradient(135deg, var(--fg-4), var(--fg-2)); backface-visibility: hidden; transition: transform .3s; }
.C-26 .prev .th { left: 100%; transform: rotateY(90deg); transform-origin: 0% 50%; }
.C-26 .next .th { right: 100%; transform: rotateY(-90deg); transform-origin: 100% 50%; }
.C-26 .nav:is(:hover, :focus-visible) .iw { color: var(--fg-3); background: var(--bg-1); }
.C-26 .nav:is(:hover, :focus-visible) .th { transform: rotateY(0deg); }
```

### C-27 미리보기 슬라이드 인 (바 / 원)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops ANS — Image bar + Circle slide](https://tympanus.net/Development/ArrowNavigationStyles/) |
| 생김새 | 왼쪽(이전): 폭 100px(데모 80px)·높이 90% 세로 바, 안에 이미지(자리표시). 오른쪽(다음): 62px 원(padding 19px), 안에 원형 썸네일. 원본 원 배경 #566473. |
| 상태 | 호버·포커스 동안 유지. 데모는 사진 대신 진한 면 위 루프 캐러셀. |
| 모션 | 호버 → Image bar: 화살표 ±10px→0, 이미지 translateX(±100%)→0 · opacity 0→.6, 바 배경 → 흰색 70%. Circle slide: 원 scale .7→1 + 페이드 인, 썸네일 translateX(±100%)→0, 원 배경은 .2s 뒤 투명 |
| 타이밍 | `.3s (원 배경 .1s, 지연 .2s)` |
| 느낌 | 가벼움 · 정보 제공 |
| 용도 | 미리보기 있는 캐러셀 화살표 |

```html
<div class="C-27" data-behavior="carousel" data-loop>
  <div class="track" data-track><div class="s">1</div><div class="s">2</div><div class="s">3</div><div class="s">4</div></div>
  <button type="button" class="bar" data-prev aria-label="이전 슬라이드"><span class="img"></span><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span></button>
  <button type="button" class="circ" data-next aria-label="다음 슬라이드"><span class="disc"><span class="img"></span></span><span class="iw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span></button>
</div>
```

```css
.C-27 { position: absolute; inset: 0; overflow: hidden; background: var(--fg-3); }
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
.C-27 .circ:is(:hover, :focus-visible) .disc .img { transform: translateX(0); }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

**커서 반응**

### C-28 마그네틱 끌림

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops MagneticButtons (demo1)](https://github.com/codrops/MagneticButtons) |
| 생김새 | 큰 원형 버튼 + 라벨. 원본은 버튼 중심에서 폭×0.7 안에 커서가 들어오면 반응 — 데모는 무대 전체를 끌림 영역으로 쓴다(magnetic 동작). |
| 상태 | 영역 안에서 커서를 따라가고, 떠나면 0으로. 영역에 들어오거나 포커스하면 라벨이 위로 롤, 실제로 호버했다 떠날 때만 아래로 롤(정지 상태에선 움직임 없음). |
| 모션 | 커서 이동 / 영역 진입·이탈 → 버튼 = (커서 − 중심) × 0.3, 라벨 = 버튼 이동의 −0.6배(반대 방향). 진입: 라벨 y −20% · 투명(150ms Power2.easeIn) → y 100%에서 0으로(200ms Expo.easeOut). 이탈은 y 20% → −100%에서 0으로 |
| 타이밍 | `lerp 0.1/프레임 — 데모는 60fps 기준 지수 곡선을 600ms linear()로 근사. 롤 150ms + 200ms (GSAP 이징의 cubic-bezier 근사)` |
| 느낌 | 쫀득함 · 살아있음 |
| 용도 | 히어로 CTA · 큰 원형 슬라이더 화살표 |

```html
<div class="C-28" data-behavior="magnetic" data-strength="0.3"><button type="button" data-magnet><span class="tx"><span class="ti">다음 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></span></button></div>
```

```css
.C-28 { position: absolute; inset: 0; display: grid; place-items: center; }
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
}
```

```js
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
document.querySelectorAll('[data-behavior~="magnetic"]:not([data-magnetic-bound])').forEach(magnetic);
```

### C-29 방향 감지 채움

| 항목 | 내용 |
|---|---|
| 출처 | [Osmo — Directional button hover](https://www.osmo.supply/resource/directional-button-hover) |
| 생김새 | 외곽선 알약 + 라벨·화살표. 원본 데모엔 화살표가 없다(아무 화살표와 조합). |
| 상태 | 들어온 지점에서 채워지고, 나간 지점 쪽으로 빠진다. 키보드 포커스는 가운데에서 채움. |
| 모션 | 마우스 진입 / 이탈 → 진입·이탈 지점에 원을 두고 scale 0→1 / 1→0. 지름 = 115% + \|가로 오프셋\| × 2. 글자색 반전 |
| 타이밍 | `원 700ms cubic-bezier(0.625, 0.05, 0, 1), 색 400ms (곡선 미기재라 ease)` |
| 느낌 | 반응성 · 촉감 |
| 용도 | 슬라이더 화살표 · CTA |

```html
<div class="C-29" data-behavior="direction"><button type="button" data-dir-target><span class="fill" aria-hidden="true"></span><span class="t">다음 단계 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></button></div>
```

```css
.C-29 button { position: relative; display: inline-flex; align-items: center; height: calc(var(--space-7) + var(--space-1)); padding: 0 var(--space-6); font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-pill); overflow: hidden; isolation: isolate; cursor: pointer; transition: color 400ms ease; }
.C-29 .fill { position: absolute; z-index: -1; top: var(--ey, 50%); left: var(--ex, 50%); width: calc(115% + 2 * max(var(--ex, 50%) - 50%, 50% - var(--ex, 50%))); aspect-ratio: 1; background: var(--fg-1); border-radius: 50%; pointer-events: none; transform: translate(-50%, -50%) scale(0); transition: transform 700ms cubic-bezier(0.625, 0.05, 0, 1); }
.C-29 .t { display: inline-flex; align-items: center; gap: var(--space-2); }
.C-29 .ic { width: 20px; height: 20px; }
.C-29 button:is(.is-in, :focus-visible) { color: var(--bg-1); }
.C-29 button:is(.is-in, :focus-visible) .fill { transform: translate(-50%, -50%) scale(1); }
```

```js
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
document.querySelectorAll('[data-behavior~="direction"]:not([data-direction-bound])').forEach(direction);
```

**등장·이동**

### C-30 라벨 비키기 + 화살표 솟음

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse AKAspidey01/ugly-horse-68](https://uiverse.io/AKAspidey01/ugly-horse-68) |
| 생김새 | 굵은 라벨 + 화살표 아이콘, overflow:hidden 버튼(gap 10px, 원본 rgb(164, 46, 194)). |
| 상태 | 호버·포커스 동안 유지. 평소엔 화살표가 버튼 아래로 숨어 있고 라벨이 가운데. |
| 모션 | 호버 → 라벨 translateX(15px→0), 화살표 translateY(35px→0) 아래에서 솟아오름 |
| 타이밍 | `.3s (ease)` |
| 느낌 | 단정함 · 조용함 |
| 용도 | CTA (라벨이 화살표 자리를 비켜 줌) |

```html
<div class="C-30"><button type="button"><span class="t">다음</span><span class="up" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></button></div>
```

```css
.C-30 button { display: flex; align-items: center; gap: 10px; padding: var(--space-3) 15px; font: inherit; font-size: var(--text-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); overflow: hidden; cursor: pointer; }
.C-30 .t { transform: translateX(15px); transition-duration: .3s; }
.C-30 .up { display: block; transform: translateY(35px); transition-duration: .3s; }
.C-30 .ic { display: block; width: 24px; height: 24px; }
.C-30 button:is(:hover, :focus-visible) .t { transform: translateX(0px); }
.C-30 button:is(:hover, :focus-visible) .up { transform: translateY(0px); }
```

### C-31 손잡이 이동 (밀어서 시작)

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse xantha01/fresh-earwig-7 · nicm42](https://dev.to/nicm42/a-button-with-an-arrow-that-moves-on-hover-2l07) |
| 생김새 | 위(xantha01): 200×60 알약, 왼쪽 5px 에 50px 원형 칩(화살표). 아래(nicm42): 텍스트 버튼, 왼쪽 원형 화살표 칩(.25em). |
| 상태 | 호버·포커스 동안 유지. nicm42 는 호버 때 버튼 전체가 칩 색으로 채워짐. |
| 모션 | 호버 → xantha01: 칩 left 5px → calc(100% − 55px), 라벨 패딩 좌 40px ↔ 우 40px 교체. nicm42: 칩 inset-inline-start .25em → calc(100% − 1.75em), 패딩 2em/1em 교체, 배경 채움 |
| 타이밍 | `xantha01 .35s ease / nicm42 250ms ease` |
| 느낌 | 목적이 분명 · 밀어서 확인 |
| 용도 | 온보딩 다음 · CTA |

```html
<div class="C-31">
  <button type="button" class="swipe"><span class="knob" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span>시작하기</button>
  <button type="button" class="link"><span class="chip" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span>다음 단계</button>
</div>
```

```css
.C-31 { display: grid; justify-items: center; gap: var(--space-4); }
.C-31 .swipe { position: relative; display: flex; justify-content: center; align-items: center; width: 200px; height: 60px; padding: 0 0 0 40px; font: inherit; font-size: var(--text-16); font-weight: var(--weight-semibold); letter-spacing: 2px; color: var(--fg-3); background: var(--bg-1); border: 1px solid var(--border); border-radius: 60px; cursor: pointer; transition: .35s ease; }
.C-31 .knob { position: absolute; left: 5px; display: grid; place-items: center; width: 50px; height: 50px; color: var(--bg-1); background: var(--fg-1); border-radius: 50%; transition: .35s ease; }
.C-31 .knob .ic { width: 24px; height: 24px; }
.C-31 .swipe:is(:hover, :focus-visible) { padding-left: 0; padding-right: 40px; color: var(--fg-1); }
.C-31 .swipe:is(:hover, :focus-visible) .knob { left: calc(100% - 55px); }
.C-31 .link { position: relative; padding-block: .5em; padding-inline: 2em 1em; font: inherit; font-size: var(--text-18); font-weight: var(--weight-medium); color: var(--fg-1); background: transparent; border: 0; border-radius: .25em; cursor: pointer; transition: padding 250ms ease, background-color 250ms ease, color 250ms ease; }
.C-31 .chip { position: absolute; inset-block-start: 50%; inset-inline-start: .25em; display: grid; place-items: center; width: 1.5em; height: 1.5em; color: var(--bg-1); background: var(--fg-1); border-radius: 50%; transform: translateY(-50%); transition: inset-inline-start 250ms ease; }
.C-31 .chip .ic { width: 1em; height: 1em; }
.C-31 .link:is(:hover, :focus-visible) { padding-inline: 1em 2em; color: var(--bg-1); background: var(--fg-1); }
.C-31 .link:is(:hover, :focus-visible) .chip { inset-inline-start: calc(100% - 1.75em); }
```

### C-32 페이드 슬라이드 인 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse vinodjangid07/fresh-tiger-82 · nkhlrjrs/hungry-pig-21](https://uiverse.io/vinodjangid07/fresh-tiger-82) |
| 생김새 | 위(vinodjangid07): 200×40 버튼 오른쪽 끝 › 화살표(원본 rgb(66, 66, 66)). 아래(nkhlrjrs): 알약 버튼, 호버 때만 나타나는 ↗ 화살표(rotate(−45deg), 원본 #c49ff5 → #6d21f2). |
| 상태 | 위: 호버할 때마다 화살표가 다시 들어옴, 누르면 translate(1px, 1px). 아래: 평소 화살표 숨김(display:none), 호버 때 등장하며 버튼이 왼쪽으로 5px. |
| 모션 | 호버 → vinodjangid07: 화살표 translateX(−10px) · opacity 0 → 제자리. nkhlrjrs: 화살표 translateX(−50px) · opacity .1 → 0 · 1, 버튼 translateX(−5px), 배경색 변화 |
| 타이밍 | `.6s ease-out both / nkhlrjrs 화살표 0.4s(ease) · 버튼 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) · 배경 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)` |
| 느낌 | 은근함 · 점진적 공개 |
| 용도 | 텍스트 링크 · 리스트 행 |

```html
<div class="C-32">
  <button type="button" class="v1">알림 설정<span class="arw" aria-hidden="true">›</span></button>
  <button type="button" class="v2">상담 예약하기<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button>
</div>
```

```css
.C-32 { display: grid; justify-items: center; gap: var(--space-4); }
.C-32 .v1 { position: relative; display: flex; align-items: center; width: 200px; height: 40px; padding: 0 15px; font: inherit; font-size: var(--text-14); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); cursor: pointer; transition-duration: .2s; }
.C-32 .v1 .arw { position: absolute; right: 0; display: flex; align-items: center; justify-content: center; width: 30px; height: 100%; font-size: var(--text-18); }
.C-32 .v1:is(:hover, :focus-visible) { background: var(--fg-2); }
/* 광학 보정: › 글리프 잉크 폭 ≈ .3em, 1/6 ≈ .05em (18px 에서 약 1px) 오른쪽으로. transform 애니메이션과 겹치지 않게 translate 속성 */
.C-32 .v1 .arw { translate: calc(var(--optical, 1) * 0.05em) 0; }
.C-32 .v1:is(:hover, :focus-visible) .arw { animation: C-32-in .6s ease-out both; }
.C-32 .v1:active { transform: translate(1px, 1px); }
.C-32 .v2 { display: inline-flex; align-items: center; gap: var(--space-2); padding: 10px 20px; font: inherit; font-size: var(--text-16); color: var(--bg-1); background: var(--fg-3); border: 0; border-radius: 20px; cursor: pointer; transition: background-color 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); }
.C-32 .v2 .ic { display: none; width: 20px; height: 20px; opacity: 0; transform: translateX(-20px) rotate(-45deg); transition: opacity 0.3s cubic-bezier(0.645, 0.045, 0.355, 1), transform 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); }
.C-32 .v2:is(:hover, :focus-visible) { background: var(--fg-1); transform: translateX(-5px); }
.C-32 .v2:is(:hover, :focus-visible) .ic { display: inline-block; opacity: 1; animation: C-32-slide 0.4s forwards; }
@keyframes C-32-in { 0% { transform: translateX(-10px); opacity: 0; } 100% { transform: translateX(0); opacity: 1; } }
@keyframes C-32-slide { from { transform: translateX(-50px) rotate(-45deg); opacity: .1; } to { transform: translateX(0) rotate(-45deg); opacity: 1; } }
```

### C-33 롱 화살표 대기 + 밑줄

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse alexmaracinaru/empty-moose-12](https://uiverse.io/alexmaracinaru/empty-moose-12) |
| 생김새 | 자간 4px 14px 텍스트 + 30×10 롱 화살표. 밑줄 2px. |
| 상태 | 호버·포커스 동안 유지. 누르면 화살표 scale(.9). 떠날 때 밑줄은 오른쪽으로 빠짐. |
| 모션 | 호버 → 화살표 translateX(−8px→0), 밑줄 scaleX(0→1) — 기준점이 오른쪽→왼쪽으로 바뀜 |
| 타이밍 | `화살표 .3s ease, 밑줄 .25s ease-out` |
| 느낌 | 절제 · 에디토리얼 |
| 용도 | "쇼핑하기" 텍스트 CTA |

```html
<div class="C-33"><button type="button"><span class="t">지금 쇼핑하기</span><svg class="ic" viewBox="0 0 46 16" width="30" height="10" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M1 8h43"/><path d="M37 1.5l7 6.5-7 6.5"/></svg></button></div>
```

```css
.C-33 button { display: inline-flex; align-items: center; padding: 0; font: inherit; color: var(--fg-1); background: none; border: 0; cursor: pointer; }
.C-33 .t { position: relative; padding-right: 15px; padding-bottom: 7px; font-size: var(--text-14); letter-spacing: 4px; }
.C-33 .t::after { content: ""; position: absolute; bottom: 0; left: 0; width: 100%; height: 2px; background: var(--fg-1); transform: scaleX(0); transform-origin: bottom right; transition: transform .25s ease-out; }
.C-33 .ic { width: 30px; height: 10px; overflow: visible; transform: translateX(-8px); transition: all .3s ease; }
.C-33 button:is(:hover, :focus-visible) .ic { transform: translateX(0); }
.C-33 button:active .ic { transform: scale(.9); }
.C-33 button:is(:hover, :focus-visible) .t::after { transform: scaleX(1); transform-origin: bottom left; }
```

**누름·클릭**

### C-34 3D 누름 (두툼)

| 항목 | 내용 |
|---|---|
| 출처 | [Josh W. Comeau — 3D button (변형: Uiverse Wasim-Rana/lazy-fish-83)](https://www.joshwcomeau.com/animation/3d-button/) |
| 생김새 | 그림자층 · 모서리(edge)층 · 앞판(front) 3겹 버튼. 원본 앞판 hsl(345deg 100% 47%) — 여기선 흰 앞판 + 검은 모서리. 아래: 원근 기울기 변형(perspective(850px)). |
| 상태 | 호버 때 들림, 누르면 내려감, 떼면 천천히 복귀. 변형은 호버·포커스 때 평평해짐. |
| 모션 | 호버 / 누름 → 앞판 translateY: 평소 −4px, 호버 −6px, 누름 −2px. 그림자층 2 / 4 / 1px. 변형: rotateX(14deg) rotateY(8deg) rotateZ(−11deg) → 평평 |
| 타이밍 | `복귀 600ms cubic-bezier(.3, .7, .4, 1), 호버 250ms cubic-bezier(.3, .7, .4, 1.5) (오버슈트), 누름 34ms, 변형 .4s ease` |
| 느낌 | 촉감 · 만족감 |
| 용도 | 큰 CTA · 게임 같은 다음 |

```html
<div class="C-34">
  <button type="button" class="push"><span class="sh"></span><span class="ed"></span><span class="fr">다음 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></button>
  <div class="tilt"><button type="button" class="tb">계속하기 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button></div>
</div>
```

```css
.C-34 { display: grid; justify-items: center; gap: var(--space-7); }
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
.C-34 .tb .ic { width: 20px; height: 20px; }
```

### C-35 클릭 리플

| 항목 | 내용 |
|---|---|
| 출처 | [MDC ripple (Material Components Web)](https://github.com/material-components/material-components-web/tree/master/packages/mdc-ripple) |
| 생김새 | 이전/다음 텍스트 버튼(128×48). 잉크는 글자색, 농도 .12 는 재현값. |
| 상태 | 클릭할 때마다 재생(replay 동작이 누른 위치를 --x/--y 로 넘김). 키보드는 가운데에서. |
| 모션 | 누름(클릭) → 누른 지점에서 시작 크기 0.6(큰 변 × 0.6 지름)으로 나타나 가운데로 이동하며 대각선 + 10px 까지 커짐(이 버튼에선 scale 1→1.91), 불투명도 들어옴 → 사라짐 |
| 타이밍 | `반지름 225ms cubic-bezier(0.4, 0, 0.2, 1), 불투명도 75ms linear, 사라짐 150ms linear` |
| 느낌 | 확인해 줌 · 체계적 |
| 용도 | Material 스타일 이전/다음 |

```html
<div class="C-35" data-behavior="replay">
  <button type="button" data-replay><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg>이전</button>
  <button type="button" data-replay>다음<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.C-35 { display: flex; gap: var(--space-3); }
.C-35 button { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-1); width: var(--space-11); height: var(--space-7); padding: 0; font: inherit; font-size: var(--text-16); font-weight: var(--weight-medium); color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-sm); overflow: hidden; cursor: pointer; }
.C-35 .ic { width: 20px; height: 20px; }
.C-35 button::after { content: ""; position: absolute; top: var(--y, 50%); left: var(--x, 50%); width: calc(var(--space-11) * .6); aspect-ratio: 1; background: currentColor; border-radius: 50%; opacity: 0; pointer-events: none; transform: translate(-50%, -50%) scale(1); }
.C-35 button.is-play::after { animation: C-35-grow 225ms cubic-bezier(0.4, 0, 0.2, 1) forwards, C-35-in 75ms linear forwards, C-35-out 150ms linear 225ms forwards; }
@keyframes C-35-grow { to { top: 50%; left: 50%; transform: translate(-50%, -50%) scale(1.91); } }
@keyframes C-35-in { from { opacity: 0; } to { opacity: .12; } }
@keyframes C-35-out { from { opacity: .12; } to { opacity: 0; } }
```

```js
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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

### C-36 구이 스쿼시 + 날아가기

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops Creative Gooey Effects — Send](https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/) |
| 생김새 | 원형 보내기 버튼(데모는 화살표 아이콘). 원본은 goo SVG 필터(feGaussianBlur stdDeviation 10 + feColorMatrix "… 0 0 0 19 -9")로 로딩 점들이 버튼에 엉겨 붙는다 — 데모는 id 금지 규칙 때문에 필터를 뺐다. |
| 상태 | 클릭 → 날아감·스쿼시 → 로딩(원본 3–6초 무작위, 데모 1.5초) → 성공 체크 → 2초 뒤 복귀. 진행 중 재클릭 무시(sequence 동작). |
| 모션 | 클릭 → 아이콘 x 100 으로 날아감, 버튼 scale .5, 로딩 점 공전(1.1s / 1.4s linear), 성공 아이콘 scale 0.1→1 + opacity 0→1, 버튼 scale 1 로 복귀 |
| 타이밍 | `날아감 0.3s Quad.easeIn, 스쿼시 0.6s Back.easeOut, 성공 1.5s Elastic.easeOut(linear()로 샘플링) + opacity 0.5s, 복귀 0.3s Back.easeOut` |
| 느낌 | 액체 · 장난스러움 |
| 용도 | 제출·다음 CTA + 완료 상태 |

```html
<div class="C-36" data-behavior="sequence"><button type="button" class="send" data-steps="is-send:1500,is-done:2000" aria-label="보내기"><span class="dot d1"></span><span class="dot d2"></span><span class="go"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span><span class="ok"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></span></button></div>
```

```css
.C-36 .send { position: relative; display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: 50%; cursor: pointer; }
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
@keyframes C-36-fade { from { opacity: 0; } to { opacity: 1; } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### C-37 누름 축소

| 항목 | 내용 |
|---|---|
| 출처 | [Emil Kowalski — 7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips) |
| 생김새 | 화살표 버튼 3개: scale(.97) (Emil) / .95 / .9 (Uiverse 항목들). |
| 상태 | 누르는 동안만 줄어듦. |
| 모션 | 누름 (:active) → scale(.97) — Uiverse 는 .95 또는 .9 |
| 타이밍 | `100–160ms ease-out (데모 160ms)` |
| 느낌 | 촉감 · 즉각 반응 |
| 용도 | 모든 화살표 버튼 |

```html
<div class="C-37">
  <button type="button" class="s97">.97 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button>
  <button type="button" class="s95">.95 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button>
  <button type="button" class="s90">.9 <svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button>
</div>
```

```css
.C-37 { display: flex; gap: var(--space-3); }
.C-37 button { display: inline-flex; align-items: center; gap: var(--space-1); height: var(--space-7); padding: 0 var(--space-3); font: inherit; font-family: var(--font-mono); font-size: var(--text-14); color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-md); cursor: pointer; transition: transform 160ms ease-out; }
.C-37 .ic { width: 20px; height: 20px; }
.C-37 .s97:active { transform: scale(.97); }
.C-37 .s95:active { transform: scale(.95); }
.C-37 .s90:active { transform: scale(.9); }
```

## D. 가로 스크롤

넘칠 때만 나타나는 화살표, 엣지 페이드·블러, 칩/탭 바 스크롤 버튼, 드래그 스크롤, CSS ::scroll-button · scroll-state 쿼리.

**CSS 네이티브·스크롤 구동**

### D-01 네이티브 ::scroll-button + ::scroll-marker

| 항목 | 내용 |
|---|---|
| 출처 | [Chrome for Developers · MDN](https://developer.chrome.com/blog/carousels-with-css) |
| 생김새 | 브라우저가 스크롤러 옆에 진짜 <button>을 만들어 준다. 아이콘은 content 글리프(Chrome 샘플 "⬅"/"⮕", MDN "◄"/"►"). MDN 스타일은 테두리·배경 없음, font-size 2rem, opacity .7. 앵커 위치로 align-self: anchor-center, 가장자리에서 45–70px 겹침. 마커는 16px 원 + 2px 테두리, 마커 그룹은 행 아래 20px 간격. |
| 상태 | 스크롤 시작·끝에서 버튼이 스스로 :disabled (MDN opacity .2, cursor unset). 호버/포커스 opacity 1, :active translate 1px 1px. 대체 텍스트는 content:"◄" / "Previous". 항목이 스냅/보이면 마커에 :target-current. 마커는 탭리스트처럼 동작. Chrome 135+ 전용, Firefox·Safari 미지원 → 미지원이면 아래 데모처럼 일반 버튼 + 안내 문구로 대체(점진적 향상). Chrome 자체 캐러셀 가이드는 "당분간 쓰지 말라"고 안내. |
| 모션 | 버튼 클릭 → 스크롤러가 한 "페이지"(스크롤포트의 85%)만큼 이동, 스냅이면 한 페이지 앞 스냅 지점으로 |
| 타이밍 | `이동 85% · 마커 transition: all 0.7s (MDN 마커 데모)` |
| 느낌 | 제로 JS · 브라우저 기본 · 점진적 향상 |
| 용도 | 스냅 행 · Chromium 전용 캐러셀 |

```html
<div class="D-01" data-behavior="scroller" data-step="0.85">
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록"><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button></div>
  <button type="button" class="fb fb-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="fb fb-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  <p class="note">이 브라우저는 ::scroll-button 미지원 — Chrome 135+ 에서는 브라우저가 만든 화살표가 보인다.</p>
</div>
```

```css
.D-01 { position: relative; width: 100%; }
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
}
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-02 scroll-state 쿼리로 갈 수 있는 쪽만 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Chrome — CSS scroll-state queries](https://developer.chrome.com/blog/css-scroll-state-queries) |
| 생김새 | 스크롤러 안쪽(position: sticky)에 둔 화살표. 갈 수 있는 쪽에만 보인다. 그림자/화살표는 스크롤러의 의사요소나 자손이어야 쿼리할 수 있다. |
| 상태 | @container scroll-state(scrollable: left\|right) 는 그 방향에 내용이 있을 때만 참(Chrome 133+). 미지원 브라우저는 동작 클래스(.is-start/.is-end)로 같은 결과를 낸다. 샘플의 화살표는 translate: 0 calc(100% + 10px) 로 화면 밖에 두고 rotate: .5turn 으로 뒤집으며 자체 전환은 없다(직접 추가). |
| 모션 | 스크롤로 갈 수 있는 방향이 생기거나 사라질 때 → 불투명도 0↔1 (@property 로 등록한 불투명도) |
| 타이밍 | `.5s ease` |
| 느낌 | 순수 CSS · 조용한 등장 · 방향 인식 |
| 용도 | 처음엔 왼쪽 화살표 없는 행 · 칩/탭 바 |

```html
<div class="D-02" data-behavior="scroller">
  <div class="row" data-scroller>
    <button type="button" class="sa sa-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
    <button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button>
    <button type="button" class="sa sa-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  </div>
</div>
```

```css
.D-02 { width: 100%; }
.D-02 [data-scroller] { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.D-02 [data-scroller]::-webkit-scrollbar { display: none; }
.D-02 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
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
}
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-03 스크롤 구동 엣지 페이드 마스크

| 항목 | 내용 |
|---|---|
| 출처 | [Chrome modern-web-guidance (Tabs)](https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/tabs.md.txt) |
| 생김새 | 버튼 없음. 내용이 더 있는 가장자리마다 --fade-size: 3rem(48px) 폭으로 흐려진다. 칩·탭 행에 좋고 화살표와 같이 써도 된다. |
| 상태 | 넘침이 없으면 타임라인이 비활성이라 페이드도 없다. --fade-start/--fade-end 는 @property 로 <length> 등록 필수. 미지원 브라우저는 양쪽을 항상 흐리게(정적 마스크). |
| 모션 | 스크롤 위치(시간이 아님) → 시작 가장자리는 처음 48px 동안 페이드가 켜지고, 끝 가장자리는 마지막 48px 동안 꺼진다 |
| 타이밍 | `animation: reveal-fade-start linear both, hide-fade-end linear both · animation-timeline: scroll(self inline) · animation-range: 0 48px, calc(100% - 48px) 100%` |
| 느낌 | 버튼 없는 · 스크롤에 묶임 · 은은한 단서 |
| 용도 | 칩 행 · 탭 바 |

```html
<div class="D-03" data-behavior="scroller" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록 (드래그 또는 스크롤)"><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button></div>
</div>
```

```css
.D-03 { width: 100%; }
.D-03 [data-scroller] { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.D-03 [data-scroller]::-webkit-scrollbar { display: none; }
.D-03 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
@property --D-03-fs { syntax: "<length>"; inherits: false; initial-value: 48px; }
@property --D-03-fe { syntax: "<length>"; inherits: false; initial-value: 48px; }
.D-03 .row { --fade-start: 48px; --fade-end: 48px; padding-inline: var(--space-1); cursor: grab; mask-image: linear-gradient(to right, transparent, var(--fg-1) var(--D-03-fs), var(--fg-1) calc(100% - var(--D-03-fe)), transparent); }
.D-03.is-dragging .row { cursor: grabbing; }
@supports (animation-timeline: scroll()) {
  .D-03 .row { animation: D-03-reveal-fade-start linear both, D-03-hide-fade-end linear both; animation-timeline: scroll(self inline); animation-range: 0 48px, calc(100% - 48px) 100%; }
}
@keyframes D-03-reveal-fade-start { from { --D-03-fs: 0px; } to { --D-03-fs: 48px; } }
@keyframes D-03-hide-fade-end { from { --D-03-fe: 48px; } to { --D-03-fe: 0px; } }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-04 스티키 스크롤 그림자 (scroll-timeline)

| 항목 | 내용 |
|---|---|
| 출처 | [Roman Komarov (kizu)](https://kizu.dev/scroll-driven-animations/) |
| 생김새 | 가장자리에 붙은(sticky) 그림자 요소. 화살표 옆에서 쓰는 은은한 넘침 단서. |
| 상태 | 시작 그림자는 처음 --height 만큼 스크롤하는 동안 나타나고, 끝 그림자는 animation-direction: reverse 로 마지막 구간에서 사라진다. @supports (animation-timeline: scroll()) 로 감싼다. 가로 행은 scroll(nearest inline) (추정). 미지원이면 그림자를 항상 표시. |
| 모션 | 스크롤 위치 → 그림자 불투명도 0→1 (@keyframes to-opaque) |
| 타이밍 | `animation-timeline: scroll(), 구간 = 처음 24px / 마지막 24px (데모 값, --height)` (추정) |
| 느낌 | 미세한 깊이 · 스크롤에 묶임 · 버튼 없는 |
| 용도 | 표·행 옆 보조 단서 · 화살표와 함께 |

```html
<div class="D-04" data-behavior="scroller" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록">
    <span class="sh sh-l" aria-hidden="true"></span><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button><span class="sh sh-r" aria-hidden="true"></span>
  </div>
</div>
```

```css
.D-04 { width: 100%; --height: 24px; }
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
@keyframes D-04-to-opaque { from { opacity: 0; } to { opacity: 1; } }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-05 클래식 background-attachment 스크롤 그림자

| 항목 | 내용 |
|---|---|
| 출처 | [CSS-Tricks (Lea Verou / Roman Komarov)](https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/) |
| 생김새 | 가장자리의 방사형 그림자(원본 rgba(0,0,0,.2)). "커버" 그라디언트가 내용과 함께 움직이며 끝에서는 그림자를 가린다. 레이어 4개: 커버 선형 2 + radial-gradient(farthest-side at 0 50%, …) 2. 커버 40px, 그림자 14px 는 추정 값. |
| 상태 | 내용이 더 있는 쪽에만 그림자가 보인다. 모든 브라우저에서 동작. |
| 모션 | 스크롤 → 그림자가 스크롤 위치를 즉시 따라감 |
| 타이밍 | `없음 (전환·애니메이션 0)` |
| 느낌 | 즉각적 · 호환성 최고 · 아주 미세 |
| 용도 | 표 · 가로 목록 |

```html
<div class="D-05" data-behavior="scroller" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록"><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button></div>
</div>
```

```css
.D-05 { width: 100%; }
.D-05 [data-scroller] { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.D-05 [data-scroller]::-webkit-scrollbar { display: none; }
.D-05 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-05 .row { padding: var(--space-2) var(--space-4); cursor: grab; background-color: var(--bg-2);
  background-image:
    linear-gradient(to right, var(--bg-2) 30%, transparent),
    linear-gradient(to left, var(--bg-2) 30%, transparent),
    radial-gradient(farthest-side at 0 50%, color-mix(in srgb, var(--fg-1) 20%, transparent), transparent),
    radial-gradient(farthest-side at 100% 50%, color-mix(in srgb, var(--fg-1) 20%, transparent), transparent);
  background-position: left center, right center, left center, right center;
  background-size: 40px 100%, 40px 100%, 14px 100%, 14px 100%;
  background-repeat: no-repeat;
  background-attachment: local, local, scroll, scroll; }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-06 "스크롤 되나?" 토글로 화살표 표시

| 항목 | 내용 |
|---|---|
| 출처 | [Bramus — Solved by CSS Scroll-Driven Animations](https://www.bram.us/2023/09/16/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not/) |
| 생김새 | 요소가 넘칠 때만 그려지는 표시기. 위 줄은 넘치고 아래 줄은 넘치지 않는 두 행으로 비교한다. |
| 상태 | 스크롤 가능한 넘침이 있을 때만 애니메이션이 돌아 space-toggle 변수 --can-scroll 을 세운다. display 대신 visibility 를 써서 레이아웃 이동이 없다. 미지원이면 동작 클래스(.is-overflow)로 대체. |
| 모션 | 넘침 유무 (스크롤 타임라인 활성 여부) → visibility 토글 (토글 자체에는 전환 없음, 불투명도 페이드는 직접 추가) |
| 타이밍 | `animation: detect-scroll linear · animation-timeline: scroll(self inline) · 토글 즉시` |
| 느낌 | 조건부 · 레이아웃 안정 · 즉시 토글 |
| 용도 | 반응형 칩 행 · 넘칠 때만 보이는 화살표 |

```html
<div class="D-06">
  <p class="lbl">넘치는 줄</p>
  <div class="rw" data-behavior="scroller"><div class="sc" data-scroller>
    <button type="button" class="ar ar-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button><button type="button" class="ar ar-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  </div></div>
  <p class="lbl">넘치지 않는 줄</p>
  <div class="rw" data-behavior="scroller"><div class="sc" data-scroller>
    <button type="button" class="ar ar-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="ar ar-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
  </div></div>
</div>
```

```css
.D-06 { width: 100%; display: grid; gap: var(--space-1); }
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
}
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

**라이브러리 스크롤 컨트롤**

### D-07 MUI Tabs scrollButtons="auto"

| 항목 | 내용 |
|---|---|
| 출처 | [Material UI](https://mui.com/material-ui/react-tabs/) |
| 생김새 | 양쪽에 폭 40px 컬럼, 안에 작은 KeyboardArrowLeft/Right 아이콘(opacity .8). 세로 탭이면 높이 40px 이고 아이콘이 90° 회전. |
| 상태 | IntersectionObserver 가 첫/끝 탭을 감시(root=스크롤러, threshold 0.99). 가장자리 탭이 완전히 보이면 그쪽 버튼이 disabled 되며 opacity 0, 40px 자리는 유지(점프 없음). "auto"는 한쪽이라도 넘칠 때만 렌더. sm 미만(600px)에서는 allowScrollButtonsMobile 이 없으면 display:none. |
| 모션 | 버튼 클릭 → scrollLeft 를 rAF 로 애니메이션 (easeInOutSin = (1+sin(πt−π/2))/2), reduced-motion 이면 즉시 이동. disabled 토글 자체는 즉시 |
| 타이밍 | `300ms (theme duration.standard) · 데모는 smooth 스크롤로 근사` |
| 느낌 | 앱 탭 바 · 자리 유지 · 담백 |
| 용도 | 데스크톱 앱 탭 바 · 대시보드 탭 |

```html
<div class="D-07" data-behavior="scroller" data-step="0.8">
  <button type="button" class="sb" data-prev aria-label="이전 탭"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <div class="tabs" data-scroller role="tablist" aria-label="분석 탭"><button type="button" role="tab" class="tab" aria-selected="true">개요</button><button type="button" role="tab" class="tab" aria-selected="false">분석</button><button type="button" role="tab" class="tab" aria-selected="false">리포트</button><button type="button" role="tab" class="tab" aria-selected="false">고객</button><button type="button" role="tab" class="tab" aria-selected="false">주문</button><button type="button" role="tab" class="tab" aria-selected="false">재고</button><button type="button" role="tab" class="tab" aria-selected="false">정산</button><button type="button" role="tab" class="tab" aria-selected="false">설정</button><button type="button" role="tab" class="tab" aria-selected="false">알림</button><button type="button" role="tab" class="tab" aria-selected="false">도움말</button></div>
  <button type="button" class="sb" data-next aria-label="다음 탭"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.D-07 { display: flex; align-items: center; width: 100%; border-bottom: 1px solid var(--border); background: var(--bg-1); }
.D-07 .tabs { display: flex; flex: 1; min-width: 0; overflow-x: auto; scrollbar-width: none; }
.D-07 .tabs::-webkit-scrollbar { display: none; }
.D-07 .tab { flex: none; padding: var(--space-3) var(--space-4); border: 0; border-bottom: 2px solid transparent; background: none; color: var(--fg-3); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); cursor: pointer; }
.D-07 .tab[aria-selected="true"] { color: var(--fg-1); border-bottom-color: var(--fg-1); }
.D-07 .sb { display: grid; place-items: center; flex: none; width: 40px; align-self: stretch; padding: 0; border: 0; background: none; color: var(--fg-1); opacity: .8; cursor: pointer; }
.D-07 .sb:disabled { opacity: 0; cursor: default; }
.D-07 .sb:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.D-07 .sb .ic { width: 20px; height: 20px; }
.D-07:not(.is-overflow) .sb { display: none; }
@media (max-width: 599px) { .D-07 .sb { display: none; } }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-08 Angular Material 페이지네이션 탭 헤더

| 항목 | 내용 |
|---|---|
| 출처 | [Angular Components](https://raw.githubusercontent.com/angular/components/main/src/material/tabs/paginated-tab-header.ts) |
| 생김새 | 양 끝에 최소 폭 32px 스트립. 셰브론은 순수 CSS: 8×8px 상자에 border-width: 2px 2px 0 0, -135°(앞) 또는 45°(뒤) 회전. |
| 상태 | scrollWidth − containerWidth ≥ 5px 일 때 표시(Safari 반올림 루프 방지용 임계값). 끝에서는 disabled: 셰브론 opacity .4, cursor default, 그림자 없음. 키보드는 FocusKeyManager(가로 화살표, Home/End, 순환). 누르고 있기 자동 반복(650ms 후 100ms 간격)은 데모에서 생략. |
| 모션 | 버튼 클릭 → 한 번에 뷰포트의 1/3 이동 (translateX) |
| 타이밍 | `transition: transform 500ms cubic-bezier(0.35,0,0.25,1) · 길게 누르면 650ms 지연 후 100ms 마다 반복` |
| 느낌 | 실무적 · 묵직한 이동 · 순수 CSS 셰브론 |
| 용도 | 고밀도 관리자 탭 바 |

```html
<div class="D-08" data-behavior="carousel" data-step="10" data-visible="3">
  <button type="button" class="pg pg-l" data-prev aria-label="이전 탭"><span class="chev" aria-hidden="true"></span></button>
  <div class="vp"><div class="list" data-track role="tablist" aria-label="관리자 탭"><button type="button" role="tab" class="tab" aria-selected="true">개요</button><button type="button" role="tab" class="tab" aria-selected="false">분석</button><button type="button" role="tab" class="tab" aria-selected="false">리포트</button><button type="button" role="tab" class="tab" aria-selected="false">고객</button><button type="button" role="tab" class="tab" aria-selected="false">주문</button><button type="button" role="tab" class="tab" aria-selected="false">재고</button><button type="button" role="tab" class="tab" aria-selected="false">정산</button><button type="button" role="tab" class="tab" aria-selected="false">설정</button><button type="button" role="tab" class="tab" aria-selected="false">알림</button><button type="button" role="tab" class="tab" aria-selected="false">도움말</button></div></div>
  <button type="button" class="pg pg-r" data-next aria-label="다음 탭"><span class="chev" aria-hidden="true"></span></button>
</div>
```

```css
.D-08 { display: flex; width: 100%; border-bottom: 1px solid var(--border); background: var(--bg-1); }
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
.D-08 .pg-r .chev { translate: calc(var(--optical, 1) * 1px) 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### D-09 Wikimedia Codex Tabs 스크롤러

| 항목 | 내용 |
|---|---|
| 출처 | [Wikimedia Codex](https://doc.wikimedia.org/codex/latest/components/demos/tabs.html) |
| 생김새 | 절대 위치의 전체 높이 엣지 버튼, background-color: inherit, cdxIconPrevious/Next 아이콘. 그 옆으로 @size-150 폭의 그라디언트 의사요소가 배경색에서 투명으로 내용 위로 번진다. 데모는 24px(추정). |
| 상태 | 첫/끝 탭 라벨에 IntersectionObserver (threshold 0.95). 그 라벨이 보이면 v-show 로 버튼이 숨겨진다 (disabled 가 아니라 hidden). 키보드 ←/→ 는 탭 사이 이동, RTL 에서는 반대. |
| 모션 | 버튼 클릭 → scrollBy({left, behavior:"smooth"}) — 계산 거리가 clientWidth 의 25% 미만이면 탭 하나 더 전진. 버튼 표시/숨김은 즉시 |
| 타이밍 | `smooth 스크롤 (시간 미지정)` |
| 느낌 | 문서형 · 숨김(hidden) · 그라디언트 엣지 |
| 용도 | 위키·문서 사이트 탭 |

```html
<div class="D-09" data-behavior="scroller" data-step="0.8">
  <button type="button" class="eb eb-l" data-prev aria-label="이전 탭"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <div class="tabs" data-scroller role="tablist" aria-label="문서 탭"><button type="button" role="tab" class="tab" aria-selected="true">개요</button><button type="button" role="tab" class="tab" aria-selected="false">분석</button><button type="button" role="tab" class="tab" aria-selected="false">리포트</button><button type="button" role="tab" class="tab" aria-selected="false">고객</button><button type="button" role="tab" class="tab" aria-selected="false">주문</button><button type="button" role="tab" class="tab" aria-selected="false">재고</button><button type="button" role="tab" class="tab" aria-selected="false">정산</button><button type="button" role="tab" class="tab" aria-selected="false">설정</button><button type="button" role="tab" class="tab" aria-selected="false">알림</button><button type="button" role="tab" class="tab" aria-selected="false">도움말</button></div>
  <button type="button" class="eb eb-r" data-next aria-label="다음 탭"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.D-09 { position: relative; width: 100%; border-bottom: 1px solid var(--border); background: var(--bg-1); }
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
.D-09 .eb-r::after { right: 100%; background: linear-gradient(to left, var(--bg-1), transparent); }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-10 Mantine Scroller

| 항목 | 내용 |
|---|---|
| 출처 | [Mantine](https://mantine.dev/core/scroller) |
| 생김새 | 엣지 그라디언트 위에 놓인 셰브론 컨트롤. controlSize(기본 md)가 버튼과 그라디언트의 폭을 정한다(데모는 48px, 추정). 그라디언트 색은 --scroller-background-color (기본은 body 색). |
| 상태 | 그 방향으로 스크롤할 수 없으면 컨트롤에 data-hidden. showStartControl/showEndControl 로 강제 표시 가능. 드래그 스크롤이 기본 켜짐(draggable true)이고 드래그 중 data-dragging. |
| 모션 | 버튼 클릭 / 끝 도달 → 클릭당 200px 스크롤(scrollAmount), 끝에서 컨트롤 opacity 0 + pointer-events none |
| 타이밍 | `.2s opacity (추정), 스크롤 이징 문서 없음 · 데모는 비율 스크롤로 근사` (추정) |
| 느낌 | 엣지 그라디언트 · 드래그 가능 · 깔끔 |
| 용도 | 칩 행 · 필터 바 |

```html
<div class="D-10" data-behavior="scroller" data-drag data-step="0.7">
  <button type="button" class="ctl ctl-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록"><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button></div>
  <button type="button" class="ctl ctl-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.D-10 { width: 100%; }
.D-10 [data-scroller] { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.D-10 [data-scroller]::-webkit-scrollbar { display: none; }
.D-10 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-10 { position: relative; --scroller-background-color: var(--bg-2); }
.D-10 .row { cursor: grab; }
.D-10.is-dragging .row { cursor: grabbing; }
.D-10 .ctl { position: absolute; inset-block: 0; z-index: 2; display: flex; align-items: center; width: 48px; padding: 0; border: 0; color: var(--fg-1); cursor: pointer; transition: opacity .2s; }
.D-10 .ctl .ic { width: 18px; height: 18px; }
.D-10 .ctl-l { left: 0; justify-content: flex-start; background: linear-gradient(to right, var(--scroller-background-color) 50%, transparent); }
.D-10 .ctl-r { right: 0; justify-content: flex-end; background: linear-gradient(to left, var(--scroller-background-color) 50%, transparent); }
.D-10 .ctl:disabled { opacity: 0; pointer-events: none; }
.D-10 .ctl:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-11 Wix HorizontalScroll (블러 엣지 + 둥근 버튼)

| 항목 | 내용 |
|---|---|
| 출처 | [Wix Design System](https://dev.wix.com/docs/wix-design-system/components/mechanisms/horizontal-scroll-component.md) |
| 생김새 | 둥근 IconButton 화살표(size "tiny", priority "secondary" 기본), 호버 시 그림자. 엣지 처리는 edgeStyle:"blur"(가장자리 내용을 점진 블러) 또는 "color"(배경색으로 페이드), 기본 폭 48px. |
| 상태 | 오른쪽 화살표는 끝에서 사라진다(데모는 왼쪽도 시작에서 사라짐). 1.322 에서 브라우저 줌·디스플레이 배율에서도 동작하도록 수정. 끝 판정은 scrollWidth − clientWidth − scrollLeft ≤ 1. |
| 모션 | 버튼 클릭 → 1회 150px 이동(scrollDistance), 스크롤 이벤트 20ms 디바운스, 호버 시 버튼 그림자 |
| 타이밍 | `150px / 디바운스 20ms · 데모는 비율 스크롤로 근사 · 전환 .15s 는 추정` (추정) |
| 느낌 | 부드러운 블러 · 둥근 버튼 · 어느 배경에나 |
| 용도 | 칩·필터 행 |

```html
<div class="D-11" data-behavior="scroller" data-step="0.6">
  <button type="button" class="nav nav-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록"><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button></div>
  <button type="button" class="nav nav-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.D-11 { width: 100%; }
.D-11 [data-scroller] { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.D-11 [data-scroller]::-webkit-scrollbar { display: none; }
.D-11 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.D-11 .nav { position: absolute; top: 50%; translate: 0 -50%; z-index: 2; display: grid; place-items: center; width: 32px; height: 32px; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); cursor: pointer; }
.D-11 .nav .ic { width: 16px; height: 16px; }
.D-11 .nav:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.D-11 { position: relative; }
.D-11 .nav-l { left: var(--space-1); } .D-11 .nav-r { right: var(--space-1); }
.D-11 .nav { width: 24px; height: 24px; transition: box-shadow .15s, opacity .15s; }
.D-11 .nav:hover { box-shadow: var(--shadow-md); }
.D-11 .nav:disabled { opacity: 0; pointer-events: none; }
.D-11::before, .D-11::after { content: ""; position: absolute; top: 0; bottom: 0; z-index: 1; width: 48px; pointer-events: none; backdrop-filter: blur(4px); transition: opacity .15s; }
.D-11::before { left: 0; mask: linear-gradient(to right, var(--fg-1), transparent); }
.D-11::after { right: 0; mask: linear-gradient(to left, var(--fg-1), transparent); }
.D-11.is-start::before, .D-11.is-end::after { opacity: 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

### D-12 그라디언트 감싼 화살표 + 드래그 스크롤 탭

| 항목 | 내용 |
|---|---|
| 출처 | [CodingNepal](https://www.codingnepalweb.com/draggable-slider-tabs-html-css-javascript/) |
| 생김새 | 높이를 가득 채우는 120px 래퍼에 linear-gradient(90deg, #fff 70%, transparent), 안에 55px 원형 아이콘. 호버 배경 #efedfb. 데모는 무대 폭에 맞춰 래퍼 72px / 아이콘 36px 로 축소, 색은 DS 토큰. |
| 상태 | 왼쪽 화살표는 scrollLeft ≤ 0 이면 display:none, 오른쪽은 남은 거리 ≤ 1px 이면 숨김. 드래그 중(.dragging)은 scroll-behavior:auto, cursor:grab, 자식에 pointer-events:none. |
| 모션 | 버튼 클릭 / 드래그 → 클릭당 340px 스크롤(scroll-behavior:smooth), 드래그는 scrollLeft -= e.movementX |
| 타이밍 | `340px · smooth (시간 미지정)` |
| 느낌 | 탭 슬라이더 · 드래그 가능 · 큰 원형 아이콘 |
| 용도 | 카테고리 탭 · 모바일 탭 |

```html
<div class="D-12" data-behavior="scroller" data-drag data-step="0.8">
  <div class="wrap wrap-l"><button type="button" class="ico" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button></div>
  <ul class="row" data-scroller aria-label="탭 목록"><li><button type="button" class="chip">전체</button></li><li><button type="button" class="chip">인기</button></li><li><button type="button" class="chip">신규</button></li><li><button type="button" class="chip">할인</button></li><li><button type="button" class="chip">베스트</button></li><li><button type="button" class="chip">추천</button></li><li><button type="button" class="chip">기획전</button></li><li><button type="button" class="chip">브랜드</button></li><li><button type="button" class="chip">리뷰</button></li><li><button type="button" class="chip">이벤트</button></li></ul>
  <div class="wrap wrap-r"><button type="button" class="ico" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
</div>
```

```css
.D-12 { position: relative; width: 100%; background: var(--bg-1); border-radius: var(--radius-md); }
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
.D-12.is-start .wrap-l, .D-12.is-end .wrap-r { display: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

**힌트·연출**

### D-13 ScrollHint 손 넛지

| 항목 | 내용 |
|---|---|
| 출처 | [ScrollHint (appleple)](https://appleple.github.io/scroll-hint/) |
| 생김새 | 가운데 120px 상자, rgba(0,0,0,.7), 반경 5px, 손 아이콘 + "scrollable" 라벨(데모는 "스크롤 가능"). 옵션으로 가장자리 16px 그림자 rgba(0,0,0,.15)(suggestiveShadow). 상자를 누르면 다시 재생. |
| 상태 | 사용자가 스크롤하면 숨김, 또는 remainingTime ms 후 숨김(기본 -1 = 자동 숨김 없음). 화살표는 2.4s 지연 후 나타남. |
| 모션 | 로드 / 스크롤 전 → 손: translateX(40px)·opacity 0 → 10%에서 opacity 1 → 50~100%는 translateX(-40px)·opacity 0. 숨길 때 opacity 페이드 |
| 타이밍 | `손 1.2s linear 2회 · 화살표 지연 2.4s · 숨김 .3s` |
| 느낌 | 안내 · 손 제스처 · 자동 사라짐 |
| 용도 | 화살표 없는 모바일 표·행 |

```html
<div class="D-13" data-behavior="scroller replay" data-drag>
  <div class="row" data-scroller tabindex="0" aria-label="칩 목록"><button type="button" class="chip">전체</button><button type="button" class="chip">인기</button><button type="button" class="chip">신규</button><button type="button" class="chip">할인</button><button type="button" class="chip">베스트</button><button type="button" class="chip">추천</button><button type="button" class="chip">기획전</button><button type="button" class="chip">브랜드</button><button type="button" class="chip">리뷰</button><button type="button" class="chip">이벤트</button></div>
  <button type="button" class="hint" data-replay aria-label="스크롤 힌트 다시 보기">
    <span class="hand"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 13V5a1.5 1.5 0 0 1 3 0v6"/><path d="M11 11V4a1.5 1.5 0 0 1 3 0v7"/><path d="M14 11V6a1.5 1.5 0 0 1 3 0v8a6 6 0 0 1-6 6h-1a6 6 0 0 1-5-2.7L3 14a1.5 1.5 0 0 1 2.4-1.8L8 15"/></svg></span><span class="txt">스크롤 가능</span><span class="arw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span>
  </button>
</div>
```

```css
.D-13 { width: 100%; }
.D-13 [data-scroller] { display: flex; gap: var(--space-2); overflow-x: auto; scrollbar-width: none; }
.D-13 [data-scroller]::-webkit-scrollbar { display: none; }
.D-13 .chip { flex: none; padding: var(--space-2) var(--space-4); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
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
@keyframes D-13-nudge-b { 0% { transform: translateX(40px); opacity: 0; } 10% { opacity: 1; } 50%, 100% { transform: translateX(-40px); opacity: 0; } }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);

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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

### D-14 세로 휠 → 가로 고정 트랙 (Codrops 스타일)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops · GSAP ScrollTrigger](https://github.com/codrops/HorizontalSmoothScrollLayout) |
| 생김새 | 화살표 없음. 아래로 스크롤하면 가로 트랙이 움직인다. 저장소는 Locomotive Scroll 을 쓰고, Codrops 글은 403 이라 읽지 못했다. 데모는 CSS 스크롤 구동 애니메이션으로 근사한 것(세로로 스크롤해 보기). |
| 상태 | 해당 없음. scrub 은 재생 헤드가 따라오는 데 걸리는 초(예: 0.5 면 부드러운 지연). containerAnimation 은 linear 이징이어야 하며 containerAnimation 트리거에서는 pin·snap 사용 불가. 데모는 animation-timeline 미지원이면 가로 스크롤 행으로 대체. |
| 모션 | 세로 스크롤 → x: -(track.scrollWidth - innerWidth) 로 가로 이동 (ease:"none") |
| 타이밍 | `scrub: 0.5 (재생 헤드 지연 0.5s) · 데모는 지연 없이 선형 스크롤 구동` |
| 느낌 | 에디토리얼 · 스크롤 연출 · 화살표 없음 |
| 용도 | 포트폴리오 · 에디토리얼 페이지 |

```html
<div class="D-14" tabindex="0" aria-label="세로로 스크롤하면 가로로 움직이는 트랙">
  <div class="runway">
    <div class="pin">
      <div class="track"><div class="card"><span>01</span></div><div class="card"><span>02</span></div><div class="card"><span>03</span></div><div class="card"><span>04</span></div><div class="card"><span>05</span></div><div class="card"><span>06</span></div></div>
      <p class="tip">세로로 스크롤</p>
    </div>
  </div>
</div>
```

```css
.D-14 { position: absolute; inset: 0; overflow-y: auto; scrollbar-width: none; container-type: size; scroll-timeline: --D-14-t block; }
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
@keyframes D-14-slide { to { transform: translateX(calc(-100% + 100cqw)); } }
```

## E. 페이지 넘김·뷰어

리더 엣지 화살표, 책장 넘김, PDF·라이트박스, 슬라이드쇼, 달력 월 이동, 스토리, 커서가 화살표가 되는 슬라이더.

**리더·슬라이드 엣지 컨트롤**

### E-01 Reveal.js 셰브론 컨트롤 + 바운스 튜토리얼

| 항목 | 내용 |
|---|---|
| 출처 | [reveal.js](https://revealjs.com/config/) |
| 생김새 | 막대 두 개(2.6em × 0.5em)를 ±45° 로 돌려 만든 셰브론, 3.6em 상자 안. 배치는 오른쪽 아래 묶음(간격 1.4em) 또는 controlsLayout:'edges'(500px 이상)로 화면 양옆 세로 중앙. |
| 상태 | 활성 = opacity .9. "조각(fragment)" 상태(이 슬라이드에 남은 단계 있음) = .5. 호버 = 1. controlsBackArrows 로 이전 화살표를 흐리게(.3)·숨김·표시. 데모는 시작 슬라이드의 이전 화살표가 .3 으로 흐리다. |
| 모션 | 호버 / 누름 / 튜토리얼 → 셰브론 각도 45°→40°(호버)→36°(누름)로 좁아져 쥐어짜는 느낌. 튜토리얼은 다음 화살표가 translateX 10px(20%) → -5px(30%) 로 튄다 |
| 타이밍 | `막대 all .15s ease · 버튼 color/opacity/transform .2s ease · bounce-right 2s 50 both ease-out` |
| 느낌 | 얇은 막대 · 쥐어짜는 호버 · 유도 바운스 |
| 용도 | 프레젠테이션 · 슬라이드 뷰어 |

```html
<div class="E-01" data-behavior="carousel">
  <div class="view"><div data-track><div class="slide">슬라이드 1</div><div class="slide">슬라이드 2</div><div class="slide">슬라이드 3</div></div></div>
  <button type="button" class="arr arr-l" data-prev aria-label="이전 슬라이드"></button>
  <button type="button" class="arr arr-r" data-next aria-label="다음 슬라이드"></button>
</div>
```

```css
.E-01 { position: absolute; inset: 0; }
.E-01 .view { position: absolute; inset: 0; overflow: hidden; }
.E-01 [data-track] { display: flex; height: 100%; transition: transform .4s ease; }
.E-01 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
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
/* 광학 보정: 막대 2.6em × sin45° ≈ 가로 폭 1.84em, 1/6 ≈ .31em 를 가리키는 쪽으로 (막대 의사요소만 — 버튼 상자·포커스 링·바운스는 그대로) */
.E-01 .arr-l::before, .E-01 .arr-l::after { translate: calc(var(--optical, 1) * -.31em) 0; }
.E-01 .arr-r::before, .E-01 .arr-r::after { translate: calc(var(--optical, 1) * .31em) 0; }
.E-01 .arr:focus-visible { outline: 2px solid var(--bg-1); outline-offset: -.4em; }
.E-01 .arr:disabled { opacity: .3; cursor: default; }
.E-01.is-start .arr-r:not(:hover) { animation: E-01-bounce-right 2s 50 both ease-out; }
@keyframes E-01-bounce-right { 0%, 10%, 25%, 40%, 50% { transform: translateX(0); } 20% { transform: translateX(10px); } 30% { transform: translateX(-5px); } }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### E-02 Apple Books 가장자리 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Apple Books 사용 설명서 · 9to5Mac](https://support.apple.com/guide/books/read-books-ibks5f526382/mac) |
| 생김새 | Mac: "포인터를 책의 오른쪽/왼쪽 가장자리로 옮기면 나타나는 화살표를 클릭". iPhone 은 보이지 않는 여백 탭 영역. 책 위에 크롬이 없는 읽기 화면. |
| 상태 | 평소엔 숨김, 가장자리에 호버해야 화살표가 보인다(데모는 키보드 포커스에서도). 트랙패드 스와이프와 방향키로도 넘긴다. 첫/끝 쪽에서는 해당 가장자리가 비활성. |
| 모션 | 가장자리 호버 → 화살표 opacity 0→1. 쪽 넘김 스타일은 컬(기본)/슬라이드/없음 중 선택(iOS 16.4 시기), 지속 시간 비공개 |
| 타이밍 | `opacity .2s · 쪽 이동 .3s (둘 다 추정, 공개 수치 없음)` (추정) |
| 느낌 | 크롬 없음 · 호버 시 등장 · 책 읽기 |
| 용도 | 전자책 리더 · 크롬 없는 읽기 화면 |

```html
<div class="E-02" data-behavior="carousel">
  <div class="view"><div data-track><div class="slide"><span class="t">제1장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div><div class="slide"><span class="t">제2장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div><div class="slide"><span class="t">제3장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div><div class="slide"><span class="t">제4장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div></div></div>
  <button type="button" class="edge edge-l" data-prev aria-label="이전 쪽"><span class="arr"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span></button>
  <button type="button" class="edge edge-r" data-next aria-label="다음 쪽"><span class="arr"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span></button>
</div>
```

```css
.E-02 { position: absolute; inset: 0; }
.E-02 .view { position: absolute; inset: 0; overflow: hidden; }
.E-02 [data-track] { display: flex; height: 100%; transition: transform .3s ease; }
.E-02 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-02 .slide { align-content: center; justify-items: start; gap: var(--space-2); padding: var(--space-6) var(--space-7); background: var(--bg-1); color: var(--fg-1); }
.E-02 .t { font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); }
.E-02 .ln { width: 100%; height: var(--space-2); border-radius: var(--radius-pill); background: var(--border); }
.E-02 .ln-s { width: 60%; }
.E-02 .edge { position: absolute; top: 0; bottom: 0; z-index: 2; display: grid; place-items: center; width: 12%; padding: 0; border: 0; background: none; color: var(--fg-1); cursor: pointer; }
.E-02 .edge-l { left: 0; } .E-02 .edge-r { right: 0; }
.E-02 .arr { display: grid; opacity: 0; transition: opacity .2s; }
.E-02 .arr .ic { width: 24px; height: 24px; }
.E-02 .edge:hover .arr, .E-02 .edge:focus-visible .arr { opacity: 1; }
.E-02 .edge:disabled { pointer-events: none; }
.E-02 .edge:disabled .arr { opacity: 0; }
.E-02 .edge:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### E-03 웹 e-리더 가장자리 영역 (Kobo / OverDrive)

| 항목 | 내용 |
|---|---|
| 출처 | [Kobo Web Reader · OverDrive 도움말](https://help.kobo.com/hc/en-us/articles/35996239522967-Kobo-Web-Reader-Navigation-Reading-Features) |
| 생김새 | Kobo 는 왼쪽/오른쪽에 호버하면 화살표가 나타나고 아래에 드래그 가능한 원형 스크러버가 있다. OverDrive 는 보이지 않는 클릭/탭 가장자리. |
| 상태 | 데스크톱: 호버로 화살표 노출. 폰: 가장자리 탭 또는 스와이프. Kobo 는 키보드 ←/→ 도 지원. 호버 노출은 포인터 기기에서만(@media (hover:hover)). 데모 스크러버는 위치 표시 전용(드래그 미구현). |
| 모션 | 가장자리 호버 → 화살표 opacity 0→1, 스크러버 원이 쪽 위치로 이동 |
| 타이밍 | `문서 없음 → .2s (추정)` (추정) |
| 느낌 | 보이지 않는 가장자리 · 스크러버 · 읽기 우선 |
| 용도 | 웹 e-리더 · 도서관 뷰어 |

```html
<div class="E-03" data-behavior="carousel">
  <div class="view"><div data-track><div class="slide"><span class="t">제1장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div><div class="slide"><span class="t">제2장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div><div class="slide"><span class="t">제3장</span><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span></div></div></div>
  <button type="button" class="edge edge-l" data-prev aria-label="이전 쪽"><span class="arr"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></span></button>
  <button type="button" class="edge edge-r" data-next aria-label="다음 쪽"><span class="arr"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></span></button>
  <div class="scrub" aria-hidden="true"><span class="thumb"></span></div>
</div>
```

```css
.E-03 { position: absolute; inset: 0; }
.E-03 .view { position: absolute; inset: 0; overflow: hidden; }
.E-03 [data-track] { display: flex; height: 100%; transition: transform .2s ease; }
.E-03 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-03 .slide { align-content: center; justify-items: start; gap: var(--space-2); padding: var(--space-6) var(--space-7); background: var(--bg-1); color: var(--fg-1); }
.E-03 .t { font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); }
.E-03 .ln { width: 100%; height: var(--space-2); border-radius: var(--radius-pill); background: var(--border); }
.E-03 .ln-s { width: 60%; }
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
.E-03[data-index="2"] .thumb { left: 100%; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

**페이지 컬 책장**

### E-04 turn.js 모서리 필(peel)

| 항목 | 내용 |
|---|---|
| 출처 | [turn.js](https://raw.githubusercontent.com/blasten/turn.js/master/turn.js) |
| 생김새 | 그라디언트 음영(gradients:true)이 있는 사실적인 컬과 양면 펼침. 코너 감지 영역 100px(cornerSize:100). |
| 상태 | 모서리에서 100px 안에 호버하면 접힌 엿보기(corners:'forward')가 보인다. 모서리를 드래그하면 쪽이 넘어간다. start 이벤트가 모서리(tl/tr/bl/br)를 알려 준다. 데모는 오른쪽 아래 모서리만 필 + 이전 쪽은 작은 버튼. |
| 모션 | 모서리 호버 / 클릭 → 엿보기가 접히며 나타남(데모는 44px 접힘), 떠나면 펴진다. 클릭 시 한 장 전체가 spine 기준 회전 |
| 타이밍 | `접힘 500ms · 펴짐 800ms · 전체 넘김 duration: 600` |
| 느낌 | 실감 나는 컬 · 모서리 엿보기 · 양면 펼침 |
| 용도 | 잡지·카탈로그 플립북 |

```html
<div class="E-04" data-behavior="book">
  <div class="bk"><div data-sheet><div class="face front">1쪽</div><div class="face back">2쪽</div></div><div data-sheet><div class="face front">3쪽</div><div class="face back">4쪽</div></div><div data-sheet><div class="face front">5쪽</div><div class="face back">6쪽</div></div><div data-sheet><div class="face front">7쪽</div><div class="face back">8쪽</div></div></div>
  <button type="button" class="pv" data-prev aria-label="이전 쪽"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="corner" data-next aria-label="다음 쪽 (오른쪽 아래 모서리)"><span class="fold"></span></button>
</div>
```

```css
.E-04 { position: absolute; inset: 0; }
.E-04 .bk { position: absolute; inset: var(--space-4); perspective: 900px; }
.E-04 [data-sheet] { position: absolute; top: 0; bottom: 0; left: 50%; width: 50%; transform-origin: left center; transform-style: preserve-3d; transition: transform 600ms ease-in-out; }
.E-04 [data-sheet].is-turned { transform: rotateY(-180deg); }
.E-04 .face { position: absolute; inset: 0; display: grid; place-items: center; backface-visibility: hidden; background: var(--bg-1); color: var(--fg-1); border: 1px solid var(--border); font-size: var(--text-16); line-height: var(--lh-16); font-weight: var(--weight-bold); }
.E-04 .front { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.E-04 .back { border-radius: var(--radius-sm) 0 0 var(--radius-sm); transform: rotateY(180deg); }
.E-04 .face::after { content: ""; position: absolute; inset: 0; opacity: 0; pointer-events: none; transition: opacity 600ms ease-in-out; }
.E-04 .front::after { background: linear-gradient(to right, color-mix(in srgb, var(--fg-1) 22%, transparent), transparent 40%); }
.E-04 .back::after { background: linear-gradient(to left, color-mix(in srgb, var(--fg-1) 22%, transparent), transparent 40%); }
.E-04 .is-moving .face::after { opacity: 1; }
.E-04 .corner { position: absolute; right: var(--space-4); bottom: var(--space-4); z-index: 40; width: 100px; height: 100px; padding: 0; border: 0; background: none; cursor: pointer; }
.E-04 .corner:disabled { display: none; }
.E-04 .corner:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.E-04 .fold { position: absolute; right: 0; bottom: 0; width: 0; height: 0; background: linear-gradient(315deg, var(--bg-2) 49%, var(--border-strong) 50%, var(--bg-1) 58%); box-shadow: var(--shadow-sm); transition: width 800ms ease, height 800ms ease; }
.E-04 .corner:hover .fold, .E-04 .corner:focus-visible .fold { width: 44px; height: 44px; transition-duration: 500ms; }
.E-04 .pv { position: absolute; left: var(--space-4); bottom: var(--space-4); z-index: 40; display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); cursor: pointer; }
.E-04 .pv .ic { width: 16px; height: 16px; }
.E-04 .pv:disabled { opacity: .4; cursor: default; }
.E-04 .pv:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
```

```js
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
document.querySelectorAll('[data-behavior~="book"]:not([data-book-bound])').forEach(book);
```

### E-05 StPageFlip / react-pageflip

| 항목 | 내용 |
|---|---|
| 출처 | [StPageFlip](https://nodlik.github.io/StPageFlip/) |
| 생김새 | 캔버스 또는 HTML 위의 페이지 플립. 그림자 포함(drawShadow:true, maxShadowOpacity:1). |
| 상태 | 책 어디를 눌러도 넘어간다(데모는 오른쪽 절반 = 다음, 왼쪽 절반 = 이전). disableFlipByClick:true 면 모서리만. 스와이프는 최소 30px, mobileScrollSupport 켜짐. flipNext('top'\|'bottom')로 어느 모서리가 말릴지 고른다. |
| 모션 | 클릭 / 스와이프 → 쪽이 spine 기준으로 회전하며 그림자가 짙어졌다 옅어짐 |
| 타이밍 | `flippingTime: 1000ms (이징은 문서 없음 → ease-in-out 추정), swipeDistance 30` |
| 느낌 | 느긋한 플립 · 큰 그림자 · 어디든 클릭 |
| 용도 | 카탈로그 · 전자 앨범 |

```html
<div class="E-05" data-behavior="book">
  <div class="bk"><div data-sheet><div class="face front">1쪽</div><div class="face back">2쪽</div></div><div data-sheet><div class="face front">3쪽</div><div class="face back">4쪽</div></div><div data-sheet><div class="face front">5쪽</div><div class="face back">6쪽</div></div><div data-sheet><div class="face front">7쪽</div><div class="face back">8쪽</div></div></div>
  <button type="button" class="zone zone-l" data-prev aria-label="이전 쪽 (왼쪽 절반)"></button>
  <button type="button" class="zone zone-r" data-next aria-label="다음 쪽 (오른쪽 절반)"></button>
</div>
```

```css
.E-05 { position: absolute; inset: 0; }
.E-05 .bk { position: absolute; inset: var(--space-4); perspective: 900px; }
.E-05 [data-sheet] { position: absolute; top: 0; bottom: 0; left: 50%; width: 50%; transform-origin: left center; transform-style: preserve-3d; transition: transform 1000ms ease-in-out; }
.E-05 [data-sheet].is-turned { transform: rotateY(-180deg); }
.E-05 .face { position: absolute; inset: 0; display: grid; place-items: center; backface-visibility: hidden; background: var(--bg-1); color: var(--fg-1); border: 1px solid var(--border); font-size: var(--text-16); line-height: var(--lh-16); font-weight: var(--weight-bold); }
.E-05 .front { border-radius: 0 var(--radius-sm) var(--radius-sm) 0; }
.E-05 .back { border-radius: var(--radius-sm) 0 0 var(--radius-sm); transform: rotateY(180deg); }
.E-05 .face::after { content: ""; position: absolute; inset: 0; opacity: 0; pointer-events: none; transition: opacity 1000ms ease-in-out; }
.E-05 .front::after { background: linear-gradient(to right, color-mix(in srgb, var(--fg-1) 22%, transparent), transparent 40%); }
.E-05 .back::after { background: linear-gradient(to left, color-mix(in srgb, var(--fg-1) 22%, transparent), transparent 40%); }
.E-05 .is-moving .face::after { opacity: 1; }
.E-05 .is-moving .face { box-shadow: 0 8px 12px color-mix(in srgb, var(--fg-1) 40%, transparent); }
.E-05 .zone { position: absolute; top: var(--space-4); bottom: var(--space-4); z-index: 40; width: calc(50% - var(--space-4)); padding: 0; border: 0; background: none; cursor: pointer; }
.E-05 .zone-l { left: var(--space-4); } .E-05 .zone-r { right: var(--space-4); }
.E-05 .zone:disabled { cursor: default; }
.E-05 .zone:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -4px; }
```

```js
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
document.querySelectorAll('[data-behavior~="book"]:not([data-book-bound])').forEach(book);
```

**뷰어·라이트박스·스토리**

### E-06 pdf.js 툴바 이전/다음

| 항목 | 내용 |
|---|---|
| 출처 | [Mozilla pdf.js](https://raw.githubusercontent.com/mozilla/pdf.js/master/web/viewer.css) |
| 생김새 | 툴바 아이콘 버튼을 mask-image 로 그린다(toolbarButton-pageUp/pageDown.svg — 문서가 세로로 스크롤되므로 위/아래). 옆에 폭 40px 오른쪽 정렬 쪽 번호 입력. |
| 상태 | 비활성(첫/끝 쪽) = opacity .5 + pointer-events none. 호버/focus-visible 은 --button-hover-color. |
| 모션 | 클릭 → 쪽 번호만 즉시 바뀜 (입력은 transition-property: none) |
| 타이밍 | `없음 (일부러 즉각적·실용적)` |
| 느낌 | 즉각적 · 실용 툴바 · 위/아래 |
| 용도 | 문서 뷰어 · PDF 리더 |

```html
<div class="E-06" data-behavior="pager" data-total="12">
  <div class="bar" role="toolbar" aria-label="문서 도구 모음">
    <button type="button" class="tb tb-up" data-prev aria-label="이전 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
    <button type="button" class="tb tb-down" data-next aria-label="다음 페이지"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
    <span class="pn" data-label aria-live="polite"></span>
  </div>
  <div class="doc" aria-hidden="true"><span class="ln"></span><span class="ln"></span><span class="ln ln-s"></span><span class="ln"></span></div>
</div>
```

```css
.E-06 { width: 100%; max-width: 256px; display: grid; gap: var(--space-3); }
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
.E-06 .ln-s { width: 60%; }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### E-07 PhotoSwipe v5 옆 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [PhotoSwipe](https://photoswipe.com/styling/) |
| 생김새 | 보이지 않는 큰 터치 영역 75×100px, 세로 중앙(top 50%, margin-top -50px), 가장자리에 붙음. 32px 아이콘은 14px 안쪽. "다음"은 이전 아이콘을 좌우 반전(scale(-1,1)). 어떤 사진 위에서도 읽히도록 흰 아이콘 + #4f4f4f 2px 외곽선. |
| 상태 | 터치에서는 숨김(.pswp--touch → visibility hidden), 마우스가 감지되면(.pswp--has_mouse) 표시. 끝에서는 display none. 슬라이드 1장이면 숨김. 데모는 3초 후 UI 가 페이드(idle)되고 호버/포커스에 복귀. |
| 모션 | UI 표시/숨김 (idle) → 불투명도 .005 ↔ 1 |
| 타이밍 | `--pswp-transition-duration 333ms, cubic-bezier(0.4,0,0.22,1)` |
| 느낌 | 큰 히트 영역 · 외곽선 아이콘 · 사진 위에서도 선명 |
| 용도 | 사진 라이트박스 · 갤러리 |

```html
<div class="E-07" data-behavior="carousel">
  <div class="view"><div data-track><div class="slide">사진 1</div><div class="slide">사진 2</div><div class="slide">사진 3</div></div></div>
  <button type="button" class="pa pa-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="pa pa-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
</div>
```

```css
.E-07 { position: absolute; inset: 0; }
.E-07 .view { position: absolute; inset: 0; overflow: hidden; }
.E-07 [data-track] { display: flex; height: 100%; transition: transform .4s ease; }
.E-07 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-07 .pa { position: absolute; top: 50%; z-index: 2; width: 75px; height: 100px; margin-top: -50px; padding: 0; border: 0; background: none; color: var(--bg-1); cursor: pointer; opacity: 1; transition: opacity 333ms cubic-bezier(0.4, 0, 0.22, 1); animation: E-07-idle 333ms cubic-bezier(0.4, 0, 0.22, 1) 3s forwards; }
.E-07 .pa-l { left: 0; } .E-07 .pa-r { right: 0; }
.E-07 .pa .ic { position: absolute; top: 50%; width: 32px; height: 32px; margin-top: -16px; stroke-width: 2.5; filter: drop-shadow(0 0 1px var(--fg-1)) drop-shadow(0 0 1px var(--fg-1)); }
.E-07 .pa-l .ic { left: 14px; }
.E-07 .pa-r .ic { right: 14px; scale: -1 1; }
.E-07:hover .pa, .E-07:focus-within .pa { animation: none; opacity: 1; }
.E-07 .pa:disabled { display: none; }
.E-07 .pa:focus-visible { outline: 2px solid var(--bg-1); outline-offset: -4px; }
@media (hover: none) { .E-07 .pa { visibility: hidden; } }
@keyframes E-07-idle { to { opacity: .005; } }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### E-08 GLightbox 박스형 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [GLightbox](https://raw.githubusercontent.com/biati-digital/glightbox/master/src/postcss/glightbox.css) |
| 생김새 | clean 스킨: 40×50px 상자, rgba(0,0,0,.75), 반경 4px, 가장자리에서 30px. 중·소 화면에서는 top 45%, 배경 rgba(0,0,0,.32), 호버 .7. |
| 상태 | .disabled = opacity .1. 닫을 때 화살표는 opacity 0 으로 즉시 사라짐. 슬라이드 들어올 때 gslideInRight/gslideOutLeft 애니메이션은 데모에서 생략(트랙 이동으로 대체). |
| 모션 | 화살표 클릭 → 슬라이드가 translate3d(±60%) + 페이드로 들어오고 나감, 슬라이더 transform 이동 |
| 타이밍 | `슬라이드 .3s ease · 슬라이더 transform .4s ease` |
| 느낌 | 진한 상자 · 묵직 · 표준 라이트박스 |
| 용도 | 이미지 라이트박스 |

```html
<div class="E-08" data-behavior="carousel">
  <div class="view"><div data-track><div class="slide">사진 1</div><div class="slide">사진 2</div><div class="slide">사진 3</div></div></div>
  <button type="button" class="ga ga-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="ga ga-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.E-08 { position: absolute; inset: 0; }
.E-08 .view { position: absolute; inset: 0; overflow: hidden; }
.E-08 [data-track] { display: flex; height: 100%; transition: transform .4s ease; }
.E-08 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-08 .ga { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: 40px; height: 50px; margin-top: -25px; padding: 0; border: 0; border-radius: 4px; background: color-mix(in srgb, var(--fg-1) 75%, transparent); color: var(--bg-1); cursor: pointer; }
.E-08 .ga-l { left: 30px; } .E-08 .ga-r { right: 30px; }
.E-08 .ga .ic { width: 24px; height: 24px; }
.E-08 .ga:disabled { opacity: .1; cursor: default; }
.E-08 .ga:focus-visible { outline: 2px solid var(--bg-1); outline-offset: 2px; }
@media (max-width: 768px) {
  .E-08 .ga { top: 45%; background: color-mix(in srgb, var(--fg-1) 32%, transparent); }
  .E-08 .ga:hover { background: color-mix(in srgb, var(--fg-1) 70%, transparent); }
}
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### E-09 lightGallery 유휴 숨김 화살표 + 끝 바운스

| 항목 | 내용 |
|---|---|
| 출처 | [lightGallery](https://unpkg.com/lightgallery@2.7.2/css/lightgallery.css) |
| 생김새 | 22px 아이콘 폰트 글리프를 rgba(0,0,0,.45) 상자에 담음, 패딩 8px 10px 9px, 반경 2px. 색 #999, 호버 #fff. |
| 상태 | .disabled = opacity 0 (hideControlOnEnd). 유휴(.lg-hide-items)면 이전은 왼쪽으로, 다음은 오른쪽으로 10px 밀리며 사라짐. 첫 오픈 시 showBarsAfter 10000ms. 데모는 3초 후 유휴, 호버/포커스에 복귀. 마지막 장에 도착하면 러버밴드 1회. |
| 모션 | 유휴 / 마지막 장 도착 → 유휴: 화살표 ±10px 이동 + 페이드. 끝: lg-right-end 로 left 0 → -30px → 0 |
| 타이밍 | `transform·opacity .25s cubic-bezier(0,0,.25,1) · 슬라이드 400ms ease · 끝 바운스 .3s · 스와이프 임계 50px` |
| 느낌 | 유휴 시 물러남 · 러버밴드 끝 · 작은 상자 |
| 용도 | 사진 갤러리 |

```html
<div class="E-09" data-behavior="carousel">
  <div class="view"><div data-track><div class="slide">사진 1</div><div class="slide">사진 2</div><div class="slide">사진 3</div></div></div>
  <button type="button" class="la la-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="la la-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.E-09 { position: absolute; inset: 0; }
.E-09 .view { position: absolute; inset: 0; overflow: hidden; }
.E-09 [data-track] { display: flex; height: 100%; transition: transform 400ms ease; }
.E-09 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
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
@keyframes E-09-end { 0%, 100% { translate: 0 0; } 50% { translate: -30px 0; } }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### E-10 Fancybox v5 떠 있는 원형 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Fancyapps Fancybox](https://fancyapps.com/carousel/plugins/arrows) |
| 생김새 | 38px 흰 원(--f-arrow-border-radius:50%), 16px SVG 선 두께 2.5, 색 #475569, 이중 부드러운 그림자, 가장자리에서 10px. 호버 #f9f9f9, 누름 #f0f0f0 (데모는 DS 토큰으로 대체). |
| 상태 | 화살표는 페이지 수와 무한 모드(infinite)에 맞춰 갱신된다. idle 은 기본 false, ms 를 주면 UI 자동 숨김. 데모는 무한 순환이라 끝에서도 비활성이 안 된다. |
| 모션 | 화살표 클릭 / 방향키 → ArrowLeft → 이전, ArrowRight → 다음. 콘텐츠는 열 때 f-zoomInUp, 닫을 때 f-fadeOut |
| 타이밍 | `화살표 자체 전환 없음 (색만 즉시 변경) · 슬라이드 이동 .4s ease는 데모 값` (추정) |
| 느낌 | 깨끗한 흰 원 · 부유 · 사진 위 |
| 용도 | 이미지 팝업 · 갤러리 |

```html
<div class="E-10" data-behavior="carousel" data-loop>
  <div class="view"><div data-track><div class="slide">사진 1</div><div class="slide">사진 2</div><div class="slide">사진 3</div></div></div>
  <button type="button" class="fa fa-l" data-prev aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="fa fa-r" data-next aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.E-10 { position: absolute; inset: 0; }
.E-10 .view { position: absolute; inset: 0; overflow: hidden; }
.E-10 [data-track] { display: flex; height: 100%; transition: transform .4s ease; }
.E-10 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-10 .fa { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: 38px; height: 38px; margin-top: -19px; padding: 0; border: 0; border-radius: 50%; background: var(--bg-1); color: var(--fg-2); box-shadow: 0 6px 12px -2px color-mix(in srgb, var(--fg-1) 25%, transparent), 0 3px 7px -3px color-mix(in srgb, var(--fg-1) 30%, transparent); cursor: pointer; }
.E-10 .fa-l { left: 10px; } .E-10 .fa-r { right: 10px; }
.E-10 .fa .ic { width: 16px; height: 16px; stroke-width: 2.5; }
.E-10 .fa:hover { background: var(--bg-2); }
.E-10 .fa:active { background: var(--border-subtle); }
.E-10 .fa:focus-visible { outline: 2px solid var(--bg-1); outline-offset: 2px; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

### E-11 Instagram 스토리 데스크톱

| 항목 | 내용 |
|---|---|
| 출처 | [Tubefilter · Engadget](https://www.tubefilter.com/2021/01/29/instagram-revamps-user-interface-stories-desktops/) |
| 생김새 | 현재 스토리가 가운데, 앞/뒤 화살표. "앞 두 개, 뒤 두 개" 스토리가 클릭 가능한 옆 미리보기로 보인다. 데모는 카드 바깥쪽 작은 원형 화살표 + 약 0.6 배 미리보기 (추정). |
| 상태 | 키보드 방향키가 화살표와 동일하게 동작. 모바일은 좌/우 탭 영역. |
| 모션 | 화살표 클릭 / 방향키 → 이웃 카드로 캐러셀 이동, 가운데 카드는 1 배, 이웃은 0.6 배로 축소 |
| 타이밍 | `문서 없음 → .3s ease (추정)` (추정) |
| 느낌 | 가운데 강조 · 이웃 미리보기 · 세로 카드 |
| 용도 | 스토리 뷰어 · 미리보기 캐러셀 |

```html
<div class="E-11" data-behavior="carousel" data-step="20">
  <div class="view"><div class="trk" data-track><div class="s"><div class="card">스토리 1</div></div><div class="s"><div class="card">스토리 2</div></div><div class="s"><div class="card">스토리 3</div></div><div class="s"><div class="card">스토리 4</div></div><div class="s"><div class="card">스토리 5</div></div></div></div>
  <button type="button" class="ar ar-l" data-prev aria-label="이전 스토리"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
  <button type="button" class="ar ar-r" data-next aria-label="다음 스토리"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
</div>
```

```css
.E-11 { position: absolute; inset: 0; }
.E-11 .view { position: absolute; inset: var(--space-4) 0; overflow: hidden; }
.E-11 .trk { display: flex; width: 200%; height: 100%; margin-left: 30%; transition: transform .3s ease; }
.E-11 .s { flex: none; display: grid; place-items: center; width: 20%; }
.E-11 .card { display: grid; place-items: center; width: 90%; height: 100%; border-radius: var(--radius-md); background: var(--fg-3); color: var(--bg-1); font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-bold); scale: .6; opacity: .5; transition: scale .3s ease, opacity .3s ease; }
.E-11[data-index="0"] .s:nth-child(1) .card,
.E-11[data-index="1"] .s:nth-child(2) .card,
.E-11[data-index="2"] .s:nth-child(3) .card,
.E-11[data-index="3"] .s:nth-child(4) .card,
.E-11[data-index="4"] .s:nth-child(5) .card { scale: 1; opacity: 1; }
.E-11 .ar { position: absolute; top: 50%; z-index: 2; display: grid; place-items: center; width: 32px; height: 32px; margin-top: -16px; padding: 0; border: 0; border-radius: 50%; background: var(--bg-1); color: var(--fg-1); box-shadow: var(--shadow-md); cursor: pointer; }
.E-11 .ar-l { left: var(--space-2); } .E-11 .ar-r { right: var(--space-2); }
.E-11 .ar .ic { width: 16px; height: 16px; }
.E-11 .ar:disabled { opacity: .4; cursor: default; }
.E-11 .ar:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);
```

**달력·단계 이동**

### E-12 MUI X DateCalendar 월 셰브론

| 항목 | 내용 |
|---|---|
| 출처 | [MUI X Date Pickers](https://raw.githubusercontent.com/mui/mui-x/master/packages/x-date-pickers/src/DateCalendar/PickersSlideTransition.tsx) |
| 생김새 | 왼쪽에 월 라벨과 뷰 캐럿, 오른쪽에 이전/다음 셰브론(PickersArrowSwitcher). |
| 상태 | minDate/maxDate/disablePast/disableFuture 로 화살표 비활성(데모는 1월/12월 끝에서). 연도 뷰에서는 캐럿이 180° 회전. reduceAnimations 로 슬라이드를 끈다. |
| 모션 | 월 이동 클릭 → 날짜 그리드가 들어오는 달이 translate(±100%)에서 0 으로 슬라이드, 라벨은 크로스페이드 |
| 타이밍 | `375ms (duration.complex) cubic-bezier(0.35,0.8,0.4,1)` |
| 느낌 | 슬라이드 전환 · 머티리얼 · 라벨 크로스페이드 |
| 용도 | 날짜 선택기 · 월 달력 |

```html
<div class="E-12" data-behavior="pager" data-labels="1월,2월,3월,4월,5월,6월,7월,8월,9월,10월,11월,12월" data-start="4">
  <div class="hd">
    <span class="mon"><span class="lb" data-label aria-live="polite"></span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></span>
    <span class="nv">
      <button type="button" data-prev aria-label="이전 달"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button>
      <button type="button" data-next aria-label="다음 달"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button>
    </span>
  </div>
  <div class="wk" aria-hidden="true"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
  <div class="clip"><div class="grid" aria-hidden="true"><span></span><span></span><span></span><span class="d">1</span><span class="d">2</span><span class="d">3</span><span class="d">4</span><span class="d">5</span><span class="d">6</span><span class="d">7</span><span class="d">8</span><span class="d">9</span><span class="d">10</span><span class="d">11</span><span class="d">12</span><span class="d">13</span><span class="d">14</span><span class="d d-on">15</span><span class="d">16</span><span class="d">17</span><span class="d">18</span><span class="d">19</span><span class="d">20</span><span class="d">21</span><span class="d">22</span><span class="d">23</span><span class="d">24</span><span class="d">25</span><span class="d">26</span><span class="d">27</span><span class="d">28</span><span class="d">29</span><span class="d">30</span></div></div>
</div>
```

```css
.E-12 { width: 100%; max-width: 252px; background: var(--bg-1); border-radius: var(--radius-md); padding: var(--space-2) var(--space-3); }
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
@keyframes E-12-fade { from { opacity: 0; } }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### E-13 React DayPicker v9 내비게이션

| 항목 | 내용 |
|---|---|
| 출처 | [React DayPicker](https://daypicker.dev/docs/navigation) |
| 생김새 | 내비게이션 버튼은 2.25rem(36px) 정사각형. 셰브론은 강조색으로 채워진 모양(데모는 채운 캐럿 + fg-1). |
| 상태 | startMonth/endMonth 한계에서 비활성 opacity .5. 문서는 prefers-reduced-motion 에서 애니메이션을 끌 수 있다고 안내. |
| 모션 | 월 이동 클릭 → animate 속성이 월을 translateX(±100%)↔0 으로 슬라이드, 캡션은 페이드 인/아웃 |
| 타이밍 | `--rdp-animation_duration: .3s, cubic-bezier(0.4,0,0.2,1)` |
| 느낌 | 채운 캐럿 · 큰 버튼 · 가벼운 슬라이드 |
| 용도 | 예약 달력 · 날짜 선택기 |

```html
<div class="E-13" data-behavior="pager" data-labels="2026년 9월,2026년 10월,2026년 11월,2026년 12월,2027년 1월" data-start="2">
  <div class="hd">
    <span class="cap" data-label aria-live="polite"></span>
    <span class="nv">
      <button type="button" data-prev aria-label="이전 달"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-0.33 0)"><path d="M15 6v12l-8-6z" fill="currentColor"/></g></svg></button>
      <button type="button" data-next aria-label="다음 달"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.33 0)"><path d="M9 6v12l8-6z" fill="currentColor"/></g></svg></button>
    </span>
  </div>
  <div class="wk" aria-hidden="true"><span>일</span><span>월</span><span>화</span><span>수</span><span>목</span><span>금</span><span>토</span></div>
  <div class="clip"><div class="grid" aria-hidden="true"><span></span><span></span><span></span><span class="d">1</span><span class="d">2</span><span class="d">3</span><span class="d">4</span><span class="d">5</span><span class="d">6</span><span class="d">7</span><span class="d">8</span><span class="d">9</span><span class="d">10</span><span class="d">11</span><span class="d">12</span><span class="d">13</span><span class="d">14</span><span class="d d-on">15</span><span class="d">16</span><span class="d">17</span><span class="d">18</span><span class="d">19</span><span class="d">20</span><span class="d">21</span><span class="d">22</span><span class="d">23</span><span class="d">24</span><span class="d">25</span><span class="d">26</span><span class="d">27</span><span class="d">28</span><span class="d">29</span><span class="d">30</span></div></div>
</div>
```

```css
.E-13 { --rdp-animation_duration: .3s; --rdp-nav_button-disabled-opacity: .5; width: 100%; max-width: 252px; background: var(--bg-1); border-radius: var(--radius-md); padding: var(--space-1) var(--space-3); }
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
@keyframes E-13-fade { from { opacity: 0; } }
```

```js
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
document.querySelectorAll('[data-behavior~="pager"]:not([data-pager-bound])').forEach(pager);
```

### E-14 CSS 전용 단계 마법사 (스냅 + 마커)

| 항목 | 내용 |
|---|---|
| 출처 | [chrome.dev carousel 예제](https://chrome.dev/carousel/horizontal/wizard/) |
| 생김새 | 스냅 스크롤러 안의 3단계 폼. "다음 단계" 앵커 링크(#step-2)와 "완료" 버튼. 데모는 id 를 쓸 수 없어 앵커 대신 스크롤러 버튼으로 이동한다. |
| 상태 | scroll-state() 쿼리로 화면 밖 단계를 inert 처리하고 스크롤 마커가 단계 표시기 역할(데모는 inert 생략). 마커는 ::scroll-marker 지원 브라우저(Chromium)에서만 보인다. Chromium 에서는 ::scroll-button 으로 이전/다음을 짝지을 수 있다. |
| 모션 | 다음/이전 클릭 → 다음 단계로 스냅 스크롤 |
| 타이밍 | `네이티브 스냅 스크롤 (smooth 가 켜져 있으면 부드럽게, 수치 없음)` |
| 느낌 | 단계형 · 스냅 · 마커 표시기 |
| 용도 | 가입 폼 · 온보딩 |

```html
<div class="E-14" data-behavior="scroller" data-step="1">
  <div class="steps" data-scroller tabindex="0" aria-label="3단계 폼">
    <div class="step"><p class="t">1단계 · 이름</p><span class="fld"></span></div>
    <div class="step"><p class="t">2단계 · 연락처</p><span class="fld"></span><span class="fld"></span></div>
    <div class="step"><p class="t">3단계 · 확인</p><span class="fld"></span><button type="button" class="fin">완료</button></div>
  </div>
  <div class="ft">
    <button type="button" class="b" data-prev>이전</button>
    <button type="button" class="b b-p" data-next>다음 단계</button>
  </div>
</div>
```

```css
.E-14 { width: 100%; max-width: 256px; border-radius: var(--radius-md); background: var(--bg-1); }
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
}
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

**커서 화살표**

### E-15 반반 나눠 바뀌는 네이티브 커서

| 항목 | 내용 |
|---|---|
| 출처 | [Tuts+ — 커서 모양 CSS 조작](https://webdesign.tutsplus.com/quick-tip-how-to-manipulate-cursor-appearance-with-css--cms-31825t) |
| 생김새 | OS 커서를 32×32 SVG 화살표로 바꾸고 핫스팟은 16 16. (데모는 DS 색을 쓰려고 같은 크기의 따라다니는 요소로 흉내 냈다.) |
| 상태 | xPos = e.pageX - img.offsetLeft 로 위치를 구해, 절반을 넘으면 .cursor-next, 아니면 .cursor-prev 클래스를 붙인다. 클릭하면 그쪽으로 이동. 영역 밖에서는 일반 커서. |
| 모션 | 포인터 이동 / 절반 경계 통과 → 커서 화살표가 ◀ ↔ ▶ 로 즉시 교체 |
| 타이밍 | `즉시 (네이티브 커서는 애니메이션 불가)` |
| 느낌 | 즉각적 · 반반 구역 · 네이티브 |
| 용도 | 사진 슬라이더 · 프레젠테이션 |

```html
<div class="E-15" data-behavior="carousel cursor">
  <div class="view" data-zone><div data-track><div class="slide">사진 1</div><div class="slide">사진 2</div><div class="slide">사진 3</div></div></div>
  <span class="cur" data-cursor aria-hidden="true"><span class="c-l"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M22 12H2"/><path class="head" d="M8 6l-6 6 6 6"/></svg></span><span class="c-r"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M2 12h20"/><path class="head" d="M16 6l6 6-6 6"/></svg></span></span>
  <button type="button" class="mini mini-l" data-prev>이전</button><button type="button" class="mini mini-r" data-next>다음</button>
</div>
```

```css
.E-15 { position: absolute; inset: 0; }
.E-15 .view { position: absolute; inset: 0; overflow: hidden; }
.E-15 [data-track] { display: flex; height: 100%; transition: transform .4s ease; }
.E-15 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-15 .mini { position: absolute; bottom: var(--space-2); z-index: 3; padding: var(--space-1) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.E-15 .mini:disabled { opacity: .4; cursor: default; }
.E-15 .mini:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.E-15 .mini-l { left: var(--space-2); } .E-15 .mini-r { right: var(--space-2); }
.E-15 .view { cursor: none; }
.E-15 .cur { position: absolute; z-index: 4; left: var(--cx, 50%); top: var(--cy, 50%); display: none; width: 32px; height: 32px; translate: -50% -50%; color: var(--bg-1); pointer-events: none; }
.E-15.is-in .cur { display: block; }
.E-15 .cur .ic { width: 32px; height: 32px; stroke-width: 2.5; }
.E-15[data-side="left"] .c-r, .E-15:not([data-side="left"]) .c-l { display: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);

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
document.querySelectorAll('[data-behavior~="cursor"]:not([data-cursor-bound])').forEach(cursor);
```

### E-16 화살표/"Drag" 라벨 팔로워 블롭 (Cuberto)

| 항목 | 내용 |
|---|---|
| 출처 | [Cuberto mouse-follower](https://github.com/Cuberto/mouse-follower) |
| 생김새 | 48px 원. 아이콘 상태는 scale 1.5(setIcon('arrow-left')). 텍스트 상태는 scale 1.7, opacity .85(예: "Drag"). 링크 위에서는 .15 로 줄어든다. 데모는 아이콘 상태만(텍스트 상태는 생략). |
| 상태 | data-cursor-icon / data-cursor-text 속성으로 지정. hideOnLeave 는 300ms 타임아웃. 숨김 = scale 0. 누름 = scale 1.6 (.2s). |
| 모션 | 포인터 이동 / 진입 / 클릭 → 위치는 GSAP 로 따라오며(expo.out) 지연, 상태 전환은 scale 변화. 이동 방향으로 skew 2. 데모는 left/top transition 으로 근사(skew 생략) |
| 타이밍 | `위치 GSAP 0.55s ease expo.out (≈ cubic-bezier(0.16,1,0.3,1)) · 상태 transform .25s ease-in-out, opacity .1s · 누름 .2s` |
| 느낌 | 미끄러지는 팔로워 · 쫀득한 지연 · 라벨 변신 |
| 용도 | 포트폴리오 슬라이더 · 에이전시 사이트 |

```html
<div class="E-16" data-behavior="carousel cursor">
  <div class="view" data-zone><div data-track><div class="slide">작업 1</div><div class="slide">작업 2</div><div class="slide">작업 3</div></div></div>
  <span class="cur" data-cursor aria-hidden="true"><span class="c-l"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/></svg></span><span class="c-r"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></span>
  <button type="button" class="mini mini-l" data-prev>이전</button><button type="button" class="mini mini-r" data-next>다음</button>
</div>
```

```css
.E-16 { position: absolute; inset: 0; }
.E-16 .view { position: absolute; inset: 0; overflow: hidden; }
.E-16 [data-track] { display: flex; height: 100%; transition: transform .4s ease; }
.E-16 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-16 .mini { position: absolute; bottom: var(--space-2); z-index: 3; padding: var(--space-1) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.E-16 .mini:disabled { opacity: .4; cursor: default; }
.E-16 .mini:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.E-16 .mini-l { left: var(--space-2); } .E-16 .mini-r { right: var(--space-2); }
.E-16 .view { cursor: none; }
.E-16 .cur { position: absolute; z-index: 4; left: var(--cx, 50%); top: var(--cy, 50%); display: grid; place-items: center; width: 48px; height: 48px; margin: -24px 0 0 -24px; border-radius: 50%; background: var(--bg-1); color: var(--fg-1); pointer-events: none; scale: 0; transition: left .55s cubic-bezier(0.16, 1, 0.3, 1), top .55s cubic-bezier(0.16, 1, 0.3, 1), scale .25s ease-in-out, opacity .1s; }
.E-16.is-in .cur { scale: 1.5; }
.E-16.is-click .cur { animation: E-16-press .2s; }
.E-16 .cur .ic { width: 16px; height: 16px; }
.E-16[data-side="left"] .c-r, .E-16:not([data-side="left"]) .c-l { display: none; }
@keyframes E-16-press { 0%, 100% { scale: 1.5; } 50% { scale: 1.6; } }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);

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
document.querySelectorAll('[data-behavior~="cursor"]:not([data-cursor-bound])').forEach(cursor);
```

### E-17 quickTo 팔로워 + 180° 플립 큐

| 항목 | 내용 |
|---|---|
| 출처 | [GSAP quickTo · Squarespace 튜토리얼](https://gsap.com/docs/v3/GSAP/gsap.quickTo()/) |
| 생김새 | 102×102px 화살표 커서. 슬라이드쇼의 두 절반이 폭 50% 클릭 영역이다. |
| 상태 | 오른쪽 절반에서 왼쪽 절반으로 건너가면 화살표가 180° 회전한다. |
| 모션 | 포인터 이동 / 절반 경계 통과 → 위치는 gsap.quickTo(el,"x",{duration:0.4,ease:"power3"}) (y 도 동일), 회전은 gsap.to(c,{rotation: x<mid ? 180 : 0, duration:.4}) — 회전 시간은 미공개라 .4s power3 는 제안값(power3.out ≈ cubic-bezier(0.165,0.84,0.44,1)). 데모는 left/top transition 으로 근사 |
| 타이밍 | `위치 quickTo duration 0.4s ease "power3" (power3.out ≈ cubic-bezier(0.165,0.84,0.44,1)) · 회전 .4s (추정, 같은 곡선)` (추정) |
| 느낌 | 큰 화살표 · 부드러운 추적 · 뒤집힘 |
| 용도 | 풀스크린 슬라이드쇼 · 브랜드 사이트 |

```html
<div class="E-17" data-behavior="carousel cursor">
  <div class="view" data-zone><div data-track><div class="slide">사진 1</div><div class="slide">사진 2</div><div class="slide">사진 3</div></div></div>
  <span class="cur" data-cursor aria-hidden="true"><span class="rot"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M2 12h20"/><path class="head" d="M16 6l6 6-6 6"/></svg></span></span>
  <button type="button" class="mini mini-l" data-prev>이전</button><button type="button" class="mini mini-r" data-next>다음</button>
</div>
```

```css
.E-17 { position: absolute; inset: 0; }
.E-17 .view { position: absolute; inset: 0; overflow: hidden; }
.E-17 [data-track] { display: flex; height: 100%; transition: transform .4s ease; }
.E-17 .slide { flex: none; width: 100%; display: grid; place-items: center; background: var(--fg-3); color: var(--bg-1); font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); }
.E-17 .mini { position: absolute; bottom: var(--space-2); z-index: 3; padding: var(--space-1) var(--space-3); border: 1px solid var(--border); border-radius: var(--radius-pill); background: var(--bg-1); color: var(--fg-1); font-family: inherit; font-size: var(--text-14); line-height: var(--lh-14); cursor: pointer; }
.E-17 .mini:disabled { opacity: .4; cursor: default; }
.E-17 .mini:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.E-17 .mini-l { left: var(--space-2); } .E-17 .mini-r { right: var(--space-2); }
.E-17 .view { cursor: none; }
.E-17 .cur { position: absolute; z-index: 4; left: var(--cx, 50%); top: var(--cy, 50%); width: 102px; height: 102px; margin: -51px 0 0 -51px; color: var(--bg-1); pointer-events: none; opacity: 0; transition: left .4s cubic-bezier(0.165, 0.84, 0.44, 1), top .4s cubic-bezier(0.165, 0.84, 0.44, 1), opacity .2s; }
.E-17.is-in .cur { opacity: 1; }
.E-17 .rot { display: block; width: 100%; height: 100%; rotate: 0deg; transition: rotate .4s cubic-bezier(0.165, 0.84, 0.44, 1); }
.E-17[data-side="left"] .rot { rotate: 180deg; }
.E-17 .rot .ic { width: 100%; height: 100%; stroke-width: 1.5; }
```

```js
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
document.querySelectorAll('[data-behavior~="carousel"]:not([data-carousel-bound])').forEach(carousel);

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
document.querySelectorAll('[data-behavior~="cursor"]:not([data-cursor-bound])').forEach(cursor);
```

## F. 아이콘 글리프

화살표 모양 계열(셰브론·캐럿·화살표·롱·내로우·팻·원형·이중·바 등)과 각 아이콘 라이브러리에서의 이름.

**셰브론·캐럿**

### F-01 셰브론

| 항목 | 내용 |
|---|---|
| 출처 | [Lucide · Heroicons · Tabler · Iconoir · Remix](https://github.com/lucide-icons/lucide/tree/main/icons) |
| 생김새 | Lucide chevron-right, Heroicons chevron-right, Tabler chevron-right, Iconoir nav-arrow-right, Remix arrow-right-s, Material Symbols chevron_right(이름은 리서치에서 미확인). 아래 변형: Lucide circle-chevron-right · square-chevron-right. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 기본 · 중립 |
| 용도 | 캐러셀 · 페이지네이션 · 리스트 행 |

```html
<div class="F-01">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1 0)"><path d="M15 18l-6-6 6-6"/></g></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1 0)"><path d="M9 18l6-6-6-6"/></g></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.17 0)"><path d="M10.5 8l4 4-4 4"/></g></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><g class="opt" transform="translate(0.17 0)"><path d="M10.5 8l4 4-4 4"/></g></svg></div>
</div>
```

```css
.F-01 { display: grid; justify-items: center; gap: var(--space-4); }
.F-01 .pair { display: flex; gap: var(--space-3); }
.F-01 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-01 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-01 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-01 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-01 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-01 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-01 .vars .ic { width: 24px; height: 24px; }
```

### F-02 얇은·컴팩트 셰브론

| 항목 | 내용 |
|---|---|
| 출처 | [Tabler](https://github.com/tabler/tabler-icons/tree/main/icons/outline) |
| 생김새 | 1.25px 얇고 긴 셰브론(슬라이더 기본 화살표 같은 꺾쇠). 아래 변형: Tabler chevron-compact-right(좁고 긴 꺾쇠). |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 가벼움 · 에디토리얼 |
| 용도 | 풀스크린 슬라이더 · 라이트박스 |

```html
<div class="F-02">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-0.33 0)"><path d="M15 20l-8-8 8-8" stroke-width="1.25"/></g></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.33 0)"><path d="M9 20l8-8-8-8" stroke-width="1.25"/></g></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.83 0)"><path d="M10 4l3.5 8-3.5 8"/></g></svg></div>
</div>
```

```css
.F-02 { display: grid; justify-items: center; gap: var(--space-4); }
.F-02 .pair { display: flex; gap: var(--space-3); }
.F-02 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-02 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-02 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-02 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-02 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-02 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-02 .vars .ic { width: 24px; height: 24px; }
```

### F-03 이중 셰브론

| 항목 | 내용 |
|---|---|
| 출처 | [Heroicons · Lucide · Tabler · Iconoir · Remix · Phosphor](https://github.com/tailwindlabs/heroicons/tree/master/optimized/24/outline) |
| 생김새 | Heroicons chevron-double-right, Lucide chevrons-right, Tabler chevrons-right, Iconoir fast-arrow-right, Remix arrow-right-double. 아래 변형: 이중 캐럿(Phosphor caret-double-right 계열 — 실제 모양은 리서치에서 미확인) · Lucide circle-chevrons-right. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 빠름 · 건너뜀 |
| 용도 | 처음/끝 페이지 («») · 빨리 감기 |

```html
<div class="F-03">
  <div class="pair"><button type="button" class="l" aria-label="처음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-1.14 0)"><path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/></g></svg></button><button type="button" class="r" aria-label="끝"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1.14 0)"><path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/></g></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(1.07 0)"><path d="M5 6v12l7-6z" fill="currentColor"/><path d="M13 6v12l7-6z" fill="currentColor"/></g></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.79 0)"><path d="M8 8.5l3.5 3.5L8 15.5"/><path d="M12.5 8.5l3.5 3.5-3.5 3.5"/></g></svg></div>
</div>
```

```css
.F-03 { display: grid; justify-items: center; gap: var(--space-4); }
.F-03 .pair { display: flex; gap: var(--space-3); }
.F-03 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-03 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-03 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-03 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-03 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-03 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-03 .vars .ic { width: 24px; height: 24px; }
```

### F-04 캐럿 (채움 삼각형)

| 항목 | 내용 |
|---|---|
| 출처 | [Phosphor · Tabler · Remix](https://github.com/phosphor-icons/core/tree/main/assets/regular) |
| 생김새 | 그림은 채운 삼각형 캐럿. 같은 이름 계열: Phosphor caret-right, Tabler caret-right, Remix arrow-drop-right (리서치는 이름만 확인, 채움 여부는 미확인). 아래 변형: 윤곽 캐럿 · Phosphor caret-circle-right · caret-line-right 계열. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 작고 단단함 · 기능적 |
| 용도 | 트리 펼침 · 작은 페이지네이션 · 미디어 재생 |

```html
<div class="F-04">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-0.33 0)"><path d="M15 6v12l-8-6z" fill="currentColor"/></g></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.33 0)"><path d="M9 6v12l8-6z" fill="currentColor"/></g></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.33 0)"><path d="M9 6v12l8-6z"/></g></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.17 0)"><path d="M10 8v8l5.5-4z" fill="currentColor"/></g></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 6v12l8-6z" fill="currentColor"/><path d="M18 6v12"/></svg></div>
</div>
```

```css
.F-04 { display: grid; justify-items: center; gap: var(--space-4); }
.F-04 .pair { display: flex; gap: var(--space-3); }
.F-04 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-04 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-04 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-04 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-04 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-04 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-04 .vars .ic { width: 24px; height: 24px; }
```

**화살표**

### F-05 화살표 (기본)

| 항목 | 내용 |
|---|---|
| 출처 | [Lucide · Heroicons · Phosphor · Tabler · Iconoir · Remix](https://github.com/lucide-icons/lucide/tree/main/icons) |
| 생김새 | Lucide arrow-right, Heroicons arrow-right, Phosphor arrow-right, Tabler arrow-right, Iconoir arrow-right, Remix arrow-right · arrow-right-wide, Material Symbols arrow_forward(이름은 리서치에서 미확인). 아래 변형: Heroicons arrow-small-right · Lucide move-right. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 직설적 · 행동 유도 |
| 용도 | CTA · 다음 단계 · 링크 |

```html
<div class="F-05">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 12h10"/><path d="M13 8l4 4-4 4"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18"/><path d="M18 9l3 3-3 3"/></svg></div>
</div>
```

```css
.F-05 { display: grid; justify-items: center; gap: var(--space-4); }
.F-05 .pair { display: flex; gap: var(--space-3); }
.F-05 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-05 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-05 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-05 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-05 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-05 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-05 .vars .ic { width: 24px; height: 24px; }
```

### F-06 롱 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Heroicons · Iconoir · Remix](https://github.com/tailwindlabs/heroicons/tree/master/optimized/24/outline) |
| 생김새 | Heroicons arrow-long-right, Iconoir long-arrow-*, Remix arrow-right-long. 24px 박스를 가로로 꽉 채우는 화살대. 아래 변형: 1.25px 가는 선. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 여유 · 에디토리얼 |
| 용도 | 텍스트 CTA · 슬라이더 하단 내비 |

```html
<div class="F-06">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M22 12H2"/><path class="head" d="M8 6l-6 6 6 6"/></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M2 12h20"/><path class="head" d="M16 6l6 6-6 6"/></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 12h20" stroke-width="1.25"/><path d="M17 7l5 5-5 5" stroke-width="1.25"/></svg></div>
</div>
```

```css
.F-06 { display: grid; justify-items: center; gap: var(--space-4); }
.F-06 .pair { display: flex; gap: var(--space-3); }
.F-06 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-06 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-06 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-06 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-06 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-06 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-06 .vars .ic { width: 24px; height: 24px; }
```

### F-07 내로우 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Tabler · itshover](https://github.com/tabler/tabler-icons/tree/main/icons/outline) |
| 생김새 | Tabler arrow-narrow-right(작은 화살촉 + 긴 화살대), itshover arrow-narrow-right(-dashed). 아래 변형: 점선 화살대. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 날렵함 · 가벼움 |
| 용도 | 인라인 링크 · 카드 "더 보기" |

```html
<div class="F-07">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M9 8l-4 4 4 4"/></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M15 8l4 4-4 4"/></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h2"/><path d="M10 12h2"/><path d="M15 12h4"/><path d="M15 8l4 4-4 4"/></svg></div>
</div>
```

```css
.F-07 { display: grid; justify-items: center; gap: var(--space-4); }
.F-07 .pair { display: flex; gap: var(--space-3); }
.F-07 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-07 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-07 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-07 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-07 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-07 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-07 .vars .ic { width: 24px; height: 24px; }
```

### F-08 팻 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Phosphor · Lucide · Tabler](https://github.com/phosphor-icons/core/tree/main/assets/regular) |
| 생김새 | Phosphor arrow-fat-right · arrow-fat-line(s)-right, Lucide arrow-big-right(-dash), Tabler arrow-big-right. 위: 채운 팻 화살표. 아래 변형: 윤곽 · 꼬리 대시 · 끝 선. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 묵직함 · 장난스러움 |
| 용도 | 게임·어린이 UI · 건너뛰기 · 큰 터치 대상 |

```html
<div class="F-08">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(-0.94 0)"><path d="M20 9h-8V5l-8 7 8 7v-4h8z" fill="currentColor"/></g></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.94 0)"><path d="M4 9h8V5l8 7-8 7v-4H4z" fill="currentColor"/></g></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><g class="opt" transform="translate(0.94 0)"><path d="M4 9h8V5l8 7-8 7v-4H4z"/></g></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 9h4V5l7 7-7 7v-4H9z"/><path d="M4 9v6"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 9h8V5l8 7-8 7v-4H2z"/><path d="M22 5v14"/></svg></div>
</div>
```

```css
.F-08 { display: grid; justify-items: center; gap: var(--space-4); }
.F-08 .pair { display: flex; gap: var(--space-3); }
.F-08 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-08 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-08 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-08 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-08 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-08 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-08 .vars .ic { width: 24px; height: 24px; }
```

**틀·끝·꺾임**

### F-09 원형·사각 틀

| 항목 | 내용 |
|---|---|
| 출처 | [Lucide · Heroicons · Phosphor · Tabler · Iconoir · Remix](https://github.com/lucide-icons/lucide/tree/main/icons) |
| 생김새 | Lucide circle-arrow-right · circle-chevron(s)-right · square-arrow-right(-enter/exit) · square-chevron(s)-right, Heroicons arrow-right-circle, Phosphor arrow-circle-right · arrow-square-right, Tabler circle-arrow/chevron/caret-right · square(-rounded)-arrow/chevron-right, Iconoir arrow-right-circle, Remix arrow-right-circle · arrow-right-box. 아래 변형: 사각 화살표 · 원 셰브론 · 원 캐럿. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 완결됨 · 버튼 같음 |
| 용도 | 배경 없는 버튼 대용 · 자동재생 진행 링 (C-20) |

```html
<div class="F-09">
  <div class="pair"><button type="button" class="l" aria-label="이전"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M16 12H8"/><path class="head" d="M12 16l-4-4 4-4"/></svg></button><button type="button" class="r" aria-label="다음"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M8 12h8"/><path class="head" d="M12 8l4 4-4 4"/></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12h8"/><path d="M12 8l4 4-4 4"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.17 0)"><path d="M10.5 8l4 4-4 4"/></g></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><g class="opt" transform="translate(0.17 0)"><path d="M10 8v8l5.5-4z" fill="currentColor"/></g></svg></div>
</div>
```

```css
.F-09 { display: grid; justify-items: center; gap: var(--space-4); }
.F-09 .pair { display: flex; gap: var(--space-3); }
.F-09 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-09 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-09 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-09 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-09 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-09 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-09 .vars .ic { width: 24px; height: 24px; }
```

### F-10 바 (끝으로)

| 항목 | 내용 |
|---|---|
| 출처 | [Tabler · Lucide · Phosphor · Remix](https://github.com/tabler/tabler-icons/tree/main/icons/outline) |
| 생김새 | Tabler arrow-bar-right · arrow-bar-to-right, Lucide arrow-right-to-line / arrow-right-from-line, Phosphor arrow-line-right · caret-line-right, Remix skip-right. 위: 선까지 가는 화살표. 아래 변형: 셰브론 + 바 · 선에서 나오는 화살표 · 스킵. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 끝을 암시 · 명확함 |
| 용도 | 처음/끝으로 · 패널 접기/펼치기 · 미디어 건너뛰기 |

```html
<div class="F-10">
  <div class="pair"><button type="button" class="l" aria-label="처음으로"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5v14"/><path d="M20 12H8"/><path d="M13 7l-5 5 5 5"/></svg></button><button type="button" class="r" aria-label="끝으로"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 5v14"/><path d="M4 12h12"/><path d="M11 7l5 5-5 5"/></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 18l6-6-6-6"/><path d="M17 6v12"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 5v14"/><path d="M8 12h12"/><path d="M15 7l5 5-5 5"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 6v12l9-6z" fill="currentColor"/><path d="M18 6v12"/></svg></div>
</div>
```

```css
.F-10 { display: grid; justify-items: center; gap: var(--space-4); }
.F-10 .pair { display: flex; gap: var(--space-3); }
.F-10 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-10 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-10 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-10 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-10 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-10 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-10 .vars .ic { width: 24px; height: 24px; }
```

### F-11 꺾임·유턴

| 항목 | 내용 |
|---|---|
| 출처 | [Heroicons · Phosphor · Tabler · Iconoir](https://github.com/phosphor-icons/core/tree/main/assets/regular) |
| 생김새 | Heroicons arrow-uturn-right · arrow-turn-*, Phosphor arrow-arc-right · arrow-bend-* · arrow-elbow-* · arrow-u-*, Tabler arrow-curve · bear · ramp · loop-right, Iconoir u-turn-arrow-right. 위: 유턴 쌍(되돌리기/다시 실행). 아래 변형: 엘보 · 호. |
| 상태 | 호버·포커스 때 왼쪽 버튼은 왼쪽, 오른쪽 버튼은 오른쪽으로 3px. 누름·비활성은 쓰는 쪽 버튼 규칙을 따른다. |
| 모션 | 호버 → 아이콘이 가리키는 방향으로 translateX(±3px), 테두리 진해짐 (방향 미리보기) |
| 타이밍 | `200ms ease-out` (추정) |
| 느낌 | 되돌림 · 경로 |
| 용도 | 되돌리기/다시 실행 · 답장·전달 · 길 안내 |

```html
<div class="F-11">
  <div class="pair"><button type="button" class="l" aria-label="되돌리기"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9h11a5 5 0 0 1 0 10h-3"/><path d="M8 5L4 9l4 4"/></svg></button><button type="button" class="r" aria-label="다시 실행"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 9H9a5 5 0 0 0 0 10h3"/><path d="M16 5l4 4-4 4"/></svg></button></div>
  <div class="vars" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 19v-6a4 4 0 0 1 4-4h11"/><path d="M16 5l4 4-4 4"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 16a8 8 0 0 1 14.5-4.5"/><path d="M19 6v6h-6"/></svg></div>
</div>
```

```css
.F-11 { display: grid; justify-items: center; gap: var(--space-4); }
.F-11 .pair { display: flex; gap: var(--space-3); }
.F-11 .pair button { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); cursor: pointer; transition: border-color 200ms ease-out; }
.F-11 .pair .ic { width: 32px; height: 32px; transition: transform 200ms ease-out; }
.F-11 .pair button:is(:hover, :focus-visible) { border-color: var(--border-strong); }
.F-11 .l:is(:hover, :focus-visible) .ic { transform: translateX(-3px); }
.F-11 .r:is(:hover, :focus-visible) .ic { transform: translateX(3px); }
.F-11 .vars { display: flex; gap: var(--space-4); color: var(--fg-3); }
.F-11 .vars .ic { width: 24px; height: 24px; }
```

**애니메이티드 세트**

### F-12 애니메이티드 아이콘 세트

| 항목 | 내용 |
|---|---|
| 출처 | [lucide-animated · itshover · useAnimations · Lordicon · LottieFiles](https://lucide-animated.com) |
| 생김새 | lucide-animated(Motion, shadcn 설치), itshover(Motion: arrow-narrow-right(-dashed), arrow-big-right(-dash), arrow-back — github.com/Nani-LM10/itshover), useAnimations(Lottie: arrowLeft/Right/Up/Down + Circle·대각선), Lordicon 225-arrow-long-right(상태 in-reveal · hover-pinch · hover-slide · loop-cycle), LottieFiles 무료 루프 "arrow right"(0.95KB dotLottie). 데모: Lordicon 상태 이름별 4종을 CSS 로 재현. |
| 상태 | 그리기·핀치·슬라이드는 호버·포커스 때 한 번, 순환은 계속 반복. |
| 모션 | 호버 / 상시 → 그리기(in-reveal): 획이 그려짐 · 핀치(hover-pinch): 가로로 눌렸다 폄 · 슬라이드(hover-slide): 오른쪽으로 나가 왼쪽에서 들어옴 · 순환(loop-cycle): 슬라이드를 계속 반복 |
| 타이밍 | `400–600ms, 순환 1.6s infinite (Lordicon 페이지에 수치 없음)` (추정) |
| 느낌 | 살아있음 · 브랜드감 |
| 용도 | 아이콘 세트 고를 때 참고 · 마케팅 페이지 |

```html
<div class="F-12">
  <button type="button" class="a-draw"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><span>그리기</span></button>
  <button type="button" class="a-pinch"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><span>핀치</span></button>
  <button type="button" class="a-slide"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><span>슬라이드</span></button>
  <button type="button" class="a-loop"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><span>순환</span></button>
</div>
```

```css
.F-12 { display: grid; grid-template-columns: repeat(4, auto); gap: var(--space-2); }
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
}
```

## G. 버튼 모션

버튼 종류별(프라이머리·아웃라인·고스트·아이콘·로딩·성공·홀드·토글·복사·FAB·스위치 등) 개별 효과 카탈로그.

**프라이머리**

### G-01 누름 스케일

| 항목 | 내용 |
|---|---|
| 출처 | [Emil Kowalski — Building a hold-to-delete component](https://emilkowal.ski/ui/building-a-hold-to-delete-component) |
| 생김새 | 단색 채운 버튼. 누르고 있는 동안만 살짝 작아진다. ease-out 은 Emil 스킬 파일의 --ease-out cubic-bezier(0.23,1,0.32,1) |
| 상태 | 누름(:active) 0.97 / 떼면 같은 160ms 로 복귀 / 호버 변화 없음 |
| 모션 | 누름(:active) → scale 1→0.97 |
| 타이밍 | `160ms cubic-bezier(0.23, 1, 0.32, 1)` |
| 느낌 | 기민함 · 반응 빠름 |
| 용도 | 모든 기본 버튼 · 폼 제출 |

```html
<button type="button" class="G-01">꾹 눌러보기</button>
```

```css
.G-01 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-01:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-01 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-01 { transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1); }
.G-01:active { transform: scale(0.97); }
```

### G-02 들림 + 그림자 깊어짐

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — Algolia blue button](https://github.com/codse/animata/blob/main/animata/button/algolia-blue-button.tsx) |
| 생김새 | 그라데이션 알약 버튼 + 아래쪽 인셋 엣지. 원본 파랑 그라데이션, 호버 때 인셋 엣지 #3c4fe0 |
| 상태 | 호버: 2px 들림, 그림자 0 2px 4px→0 4px 8px / 누름: 2px 내려가며 inset 0 3px 7px / 그림자는 전환 없이 즉시 바뀜 |
| 모션 | 호버·누름 → translateY -2px(호버) / +2px(누름), 그림자 즉시 교체 |
| 타이밍 | `transform 150ms ease-in-out (box-shadow 전환 없음)` |
| 느낌 | 또렷함 · 손맛 |
| 용도 | 랜딩 CTA · 검색 버튼 |

```html
<button type="button" class="G-02">무료로 시작</button>
```

```css
.G-02 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-02:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-02 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-02 { border-radius: var(--radius-pill); background: linear-gradient(var(--fg-2), var(--fg-1)); box-shadow: 0 2px 4px color-mix(in srgb, var(--fg-1) 30%, transparent), inset 0 -2px 0 color-mix(in srgb, var(--bg-1) 20%, transparent); transition: transform 150ms ease-in-out; }
.G-02:hover, .G-02:focus-visible { transform: translateY(-2px); box-shadow: 0 4px 8px color-mix(in srgb, var(--fg-1) 30%, transparent), inset 0 -2px 0 color-mix(in srgb, var(--bg-1) 40%, transparent); }
.G-02:active { transform: translateY(2px); box-shadow: inset 0 3px 7px color-mix(in srgb, var(--fg-1) 60%, transparent); }
```

### G-03 호버 살짝 흐려짐 (시스템 기본)

| 항목 | 내용 |
|---|---|
| 출처 | [shadcn/ui Button · Tailwind 기본 전환](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx) |
| 생김새 | bg-primary → bg-primary/90. 높이 36px 남짓의 담백한 버튼 |
| 상태 | 호버: 배경 불투명도 100→90% / 누름 모션 없음 / motion-reduce 면 전환 끔 |
| 모션 | 호버 → 배경 알파 100%→90% |
| 타이밍 | `transition-all 150ms cubic-bezier(0.4, 0, 0.2, 1)` |
| 느낌 | 조용함 · 실용적 |
| 용도 | 어드민 · 폼 · 대시보드 |

```html
<button type="button" class="G-03">저장</button>
```

```css
.G-03 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-03:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-03 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-03 { transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-03:hover { background: color-mix(in srgb, var(--fg-1) 90%, transparent); }
@media (prefers-reduced-motion: reduce) { .G-03 { transition: none; } }
```

### G-04 M3 상태 레이어

| 항목 | 내용 |
|---|---|
| 출처 | [Material Web — md-sys-state 토큰](https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-state.scss) |
| 생김새 | 채운 알약 버튼 위에 글자색(on-primary) 반투명 레이어를 깐다. 원본 M3 보라 primary |
| 상태 | 호버 0.08 + 엘리베이션 level0→level1 / 포커스 0.12 / 누름 0.12 (드래그 0.16) |
| 모션 | 호버·포커스·누름 → 레이어 불투명도 0→.08 / .12 |
| 타이밍 | `호버 15ms linear, 누름 105ms` |
| 느낌 | 체계적 · 정직함 |
| 용도 | 머티리얼 앱 · 디자인 시스템 기본 버튼 |

```html
<button type="button" class="G-04">확인</button>
```

```css
.G-04 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-04:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-04 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-04 { border-radius: var(--radius-pill); isolation: isolate; overflow: hidden; }
.G-04::before { content: ""; position: absolute; inset: 0; z-index: -1; background: currentColor; opacity: 0; transition: opacity 15ms linear; }
.G-04:hover { box-shadow: var(--shadow-sm); }
.G-04:hover::before { opacity: 0.08; }
.G-04:focus-visible::before { opacity: 0.12; }
.G-04:active::before { opacity: 0.12; transition-duration: 105ms; }
```

### G-05 빛줄기 지나가기

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — Shining button](https://github.com/codse/animata/blob/main/animata/button/shining-button.tsx) |
| 생김새 | 48px 폭 막대를 30° 기울여 버튼 위로 통과시킨다. 원본 보라 버튼 + 흰색 10% 막대(여기선 가시성 위해 bg-1 20%), 트레일링 화살표 |
| 상태 | 호버/포커스: 막대 left -64px→calc(100% + 1rem), 화살표 8px 앞으로 + 1.25배, 바깥 링 페이드 인 |
| 모션 | 호버 → 막대 가로지름 + 화살표 translateX(8px) scale(1.25) + 링 등장 |
| 타이밍 | `막대 700ms ease-in-out, 화살표 700ms, 링 500ms` |
| 느낌 | 광택 · 화려함 |
| 용도 | 히어로 CTA · 프로모션 |

```html
<button type="button" class="G-05"><span class="G-05-bar" aria-hidden="true"></span><span>지금 시작</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></button>
```

```css
.G-05 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-05:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-05 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-05 { overflow: hidden; outline: 2px solid transparent; outline-offset: 2px; transition: outline-color 500ms; }
.G-05:hover, .G-05:focus-visible { outline-color: color-mix(in srgb, var(--fg-1) 30%, transparent); }
.G-05-bar { position: absolute; top: 0; left: -64px; width: 48px; height: 100%; background: color-mix(in srgb, var(--bg-1) 20%, transparent); transform: rotate(30deg) scaleY(1.5); transition: left 700ms ease-in-out; }
.G-05:hover .G-05-bar, .G-05:focus-visible .G-05-bar { left: calc(100% + 1rem); }
.G-05 .ic { transition: transform 700ms; }
.G-05:hover .ic, .G-05:focus-visible .ic { transform: translateX(8px) scale(1.25); }
```

### G-06 테두리 따라 도는 반짝임

| 항목 | 내용 |
|---|---|
| 출처 | [Magic UI — ShimmerButton](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/shimmer-button.tsx) |
| 생김새 | 검은 알약. 원뿔 그라데이션 불꽃(spread 90deg, blur 2px)이 0.05em 틈으로만 보이며 테두리를 돈다. 원본 흰 불꽃 + 내부 하이라이트 #ffffff1f |
| 상태 | 항상 루프 / 호버: 내부 하이라이트 inset 0 -8px 10px #fff1f → -6px #fff3f / 누름: -10px + translateY(1px) |
| 모션 | 루프 + 호버·누름 → shimmer-slide translate(calc(100cqw - 100%)) + spin-around(15–35% 90°, 65–85% 270°) / 하이라이트 깊이 |
| 타이밍 | `slide 3s ease-in-out infinite alternate, spin 6s linear infinite, 하이라이트 300ms ease-in-out` |
| 느낌 | 고급스러움 · 은은함 |
| 용도 | 프리미엄 CTA · 업그레이드 버튼 |

```html
<button type="button" class="G-06"><span class="G-06-wrap" aria-hidden="true"><span class="G-06-slide"><span class="G-06-spin"></span></span></span><span class="G-06-cut" aria-hidden="true"></span><span class="G-06-hl" aria-hidden="true"></span><span class="G-06-t">프로로 업그레이드</span></button>
```

```css
.G-06 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-06:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-06 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-06 { --spread: 90deg; --cut: 0.05em; height: var(--space-7); isolation: isolate; overflow: hidden; border: 1px solid color-mix(in srgb, var(--bg-1) 10%, transparent); border-radius: var(--radius-pill); transform: translateZ(0); transition: transform 300ms ease-in-out; }
.G-06:active { transform: translateY(1px); }
.G-06-wrap { position: absolute; inset: 0; z-index: -3; overflow: visible; container-type: size; filter: blur(2px); }
.G-06-slide { position: absolute; inset: 0; height: 100cqh; aspect-ratio: 1; animation: G-06-slide 3s ease-in-out infinite alternate; }
.G-06-spin { position: absolute; inset: -100%; background: conic-gradient(from calc(270deg - (var(--spread) * 0.5)), transparent 0, var(--bg-1) var(--spread), transparent var(--spread)); animation: G-06-spin 6s linear infinite; }
.G-06-cut { position: absolute; inset: var(--cut); z-index: -2; border-radius: inherit; background: var(--fg-1); }
.G-06-hl { position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 -8px 10px color-mix(in srgb, var(--bg-1) 12%, transparent); transition: box-shadow 300ms ease-in-out; }
.G-06:hover .G-06-hl, .G-06:focus-visible .G-06-hl { box-shadow: inset 0 -6px 10px color-mix(in srgb, var(--bg-1) 25%, transparent); }
.G-06:active .G-06-hl { box-shadow: inset 0 -10px 10px color-mix(in srgb, var(--bg-1) 25%, transparent); }
.G-06-t { position: relative; }
@keyframes G-06-slide { to { transform: translate(calc(100cqw - 100%), 0); } }
@keyframes G-06-spin { 0% { transform: translateZ(0) rotate(0); } 15%, 35% { transform: translateZ(0) rotate(90deg); } 65%, 85% { transform: translateZ(0) rotate(270deg); } 100% { transform: translateZ(0) rotate(360deg); } }
```

### G-07 흐르는 그라데이션 테두리

| 항목 | 내용 |
|---|---|
| 출처 | [Magic UI — RainbowButton](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/rainbow-button.tsx) |
| 생김새 | 어두운 채움 + 무지개 테두리 + 아래로 번지는 흐린 글로우. 원본 5색 무지개(빨강·주황·노랑·초록·파랑) → 회색 5단 토큰 그라데이션 |
| 상태 | 항상 루프 / 글로우는 버튼 아래 60%×20% 영역에 blur(0.75rem) |
| 모션 | 루프 → 200% 폭 그라데이션의 background-position 0%→200% |
| 타이밍 | `2s linear infinite` |
| 느낌 | 생동감 · 시끄러움 |
| 용도 | 신제품 발표 · 이벤트 배너 |

```html
<div class="G-07"><button type="button" class="G-07-b">새 기능 보기</button></div>
```

```css
.G-07-b { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-07-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-07-b .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-07 { position: relative; isolation: isolate; }
.G-07::before { content: ""; position: absolute; bottom: -20%; left: 50%; z-index: 0; width: 60%; height: 20%; transform: translateX(-50%); background: linear-gradient(90deg, var(--fg-4), var(--fg-2), var(--fg-1), var(--fg-3), var(--fg-4)); background-size: 200%; filter: blur(0.75rem); animation: G-07-rainbow 2s linear infinite; }
.G-07-b { z-index: 1; border: calc(0.08 * 1rem) solid transparent; background-image: linear-gradient(var(--fg-1), var(--fg-1)), linear-gradient(var(--fg-1) 50%, color-mix(in srgb, var(--fg-1) 60%, transparent) 80%, transparent), linear-gradient(90deg, var(--fg-4), var(--fg-2), var(--bg-1), var(--fg-3), var(--fg-4)); background-clip: padding-box, border-box, border-box; background-origin: border-box; background-size: 200%; animation: G-07-rainbow 2s linear infinite; }
@keyframes G-07-rainbow { 0% { background-position: 0%; } 100% { background-position: 200%; } }
```

### G-08 스프링 글자 광택

| 항목 | 내용 |
|---|---|
| 출처 | [Magic UI — ShinyButton](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/shiny-button.tsx) |
| 생김새 | 아웃라인 버튼. 라벨에 -75deg 마스크를 걸어 빛 띠가 글자를 통과한다. 테두리도 같은 --x 로 밝은 띠가 지나감 |
| 상태 | 항상 루프(한 번 지나간 뒤 1s 쉼) / 누름 scale 0.95 / 마운트 때 0.8→1 (spring 200/5, 데모 생략) / 다크 호버 글로우 0 0 20px 300ms |
| 모션 | 루프 + 누름 → --x 100%→-100% 마스크 이동 / whileTap scale 0.95 |
| 타이밍 | `spring stiffness 20, damping 15, mass 2 (≈4192ms linear()) + repeatDelay 1s / 누름은 Motion 기본 전환(추정 500/25 근사)` (추정) |
| 느낌 | 부드러움 · 럭셔리 |
| 용도 | 보조 CTA · 프리미엄 링크 |

```html
<button type="button" class="G-08"><span class="G-08-t">반짝이는 라벨</span><span class="G-08-edge" aria-hidden="true"></span></button>
```

```css
.G-08 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-08:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-08 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
@property --G-08-x { syntax: "<percentage>"; inherits: true; initial-value: 100%; }
.G-08 { background: var(--bg-1); transition: transform 618ms linear(0, 0.137 4.167%, 0.412 8.333%, 0.7 12.5%, 0.919 16.667%, 1.055 20.833%, 1.112 25%, 1.115 29.167%, 1.09 33.333%, 1.055 37.5%, 1.023 41.667%, 1.001 45.833%, 0.99 50%, 0.986 54.167%, 0.987 58.333%, 0.991 62.5%, 0.995 66.667%, 0.999 70.833%, 1.001 75%, 1.002 79.167%, 1.002 83.333%, 1.001 87.5%, 1.001 91.667%, 1 95.833%, 1); animation: G-08-x 5192ms infinite; }
.G-08:active { transform: scale(0.95); }
.G-08-t { -webkit-mask-image: linear-gradient(-75deg, var(--fg-1) calc(var(--G-08-x) + 20%), transparent calc(var(--G-08-x) + 30%), var(--fg-1) calc(var(--G-08-x) + 100%)); mask-image: linear-gradient(-75deg, var(--fg-1) calc(var(--G-08-x) + 20%), transparent calc(var(--G-08-x) + 30%), var(--fg-1) calc(var(--G-08-x) + 100%)); }
.G-08-edge { position: absolute; inset: 0; padding: 1px; border-radius: inherit; pointer-events: none; background: linear-gradient(-75deg, color-mix(in srgb, var(--fg-1) 10%, transparent) calc(var(--G-08-x) + 20%), color-mix(in srgb, var(--fg-1) 50%, transparent) calc(var(--G-08-x) + 25%), color-mix(in srgb, var(--fg-1) 10%, transparent) calc(var(--G-08-x) + 100%)); -webkit-mask: linear-gradient(var(--fg-1), var(--fg-1)) content-box, linear-gradient(var(--fg-1), var(--fg-1)); -webkit-mask-composite: xor; mask: linear-gradient(var(--fg-1), var(--fg-1)) content-box exclude, linear-gradient(var(--fg-1), var(--fg-1)); }
@keyframes G-08-x { 0% { --G-08-x: 100%; animation-timing-function: linear(0, 0.101 4.167%, 0.278 8.333%, 0.445 12.5%, 0.582 16.667%, 0.688 20.833%, 0.769 25%, 0.829 29.167%, 0.873 33.333%, 0.906 37.5%, 0.931 41.667%, 0.949 45.833%, 0.962 50%, 0.972 54.167%, 0.979 58.333%, 0.985 62.5%, 0.989 66.667%, 0.992 70.833%, 0.994 75%, 0.995 79.167%, 0.997 83.333%, 0.998 87.5%, 0.998 91.667%, 0.999 95.833%, 1); } 80.74% { --G-08-x: -100%; } 100% { --G-08-x: -100%; } }
```

**세컨더리·아웃라인**

### G-09 위·왼쪽·가운데에서 채우기

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — CreativeButtons](https://github.com/codrops/CreativeButtons/blob/master/css/component.css) |
| 생김새 | 아웃라인 버튼이 색으로 차오른다. 1b 위에서(height 0→100%), 1c 왼쪽에서(width 0→100%), 1d 가운데서(width 0→90%, 누르면 101%). 대각선 1e(45° 회전, height 0→260%, 누름 400%)는 데모 생략 |
| 상태 | 호버/포커스: ::after 가 차오르고 글자 반전 / 1d 누름: 101% 로 꽉 참 |
| 모션 | 호버·누름 → ::after height/width 0→100% (1d: 0→90%→101%) |
| 타이밍 | `all 0.3s` |
| 느낌 | 클래식 · 직설적 |
| 용도 | 보조 버튼 · 포트폴리오 |

```html
<div class="G-09"><button type="button" class="G-09-b G-09-top">위에서</button><button type="button" class="G-09-b G-09-left">왼쪽</button><button type="button" class="G-09-b G-09-mid">가운데</button></div>
```

```css
.G-09 { display: flex; gap: var(--space-2); }
.G-09-b { position: relative; z-index: 0; overflow: hidden; height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); color: var(--fg-1); background: transparent; border: 2px solid var(--fg-1); border-radius: 0; cursor: pointer; transition: all 0.3s; }
.G-09-b::after { content: ""; position: absolute; z-index: -1; background: var(--fg-1); transition: all 0.3s; }
.G-09-b:hover, .G-09-b:focus-visible { color: var(--bg-1); }
.G-09-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-09-top::after { left: 0; top: 0; width: 100%; height: 0; }
.G-09-top:hover::after, .G-09-top:focus-visible::after { height: 100%; }
.G-09-left::after { left: 0; top: 0; width: 0; height: 100%; }
.G-09-left:hover::after, .G-09-left:focus-visible::after { width: 100%; }
.G-09-mid::after { left: 50%; top: 50%; width: 0; height: 103%; opacity: 0; transform: translateX(-50%) translateY(-50%); }
.G-09-mid:hover::after, .G-09-mid:focus-visible::after { width: 90%; opacity: 1; }
.G-09-mid:active::after { width: 101%; }
```

### G-10 왼쪽에서 차고 오른쪽으로 빠지는 배경

| 항목 | 내용 |
|---|---|
| 출처 | [CSS-Tricks — Temani Afif, Cool hover effects using background properties](https://css-tricks.com/cool-hover-effects-using-background-properties/) |
| 생김새 | 단색 그라데이션 한 장을 background-size 로만 키운다. 들어올 땐 왼쪽에서, 나갈 땐 오른쪽으로 빠진다. 원본 #1095c1. 리서치의 두 번째 변형(0.08em 밑줄 띠가 .3s 두 단계로 전체 높이까지 차오름)은 데모 생략 |
| 상태 | 호버/포커스: --p 0→100%, 글자 반전 / 떠날 때 background-position 이 즉시 오른쪽으로 바뀌어 퇴장 방향이 반대 |
| 모션 | 호버 → --p 0→100% (background-size), background-position 은 0s 로 즉시 전환 |
| 타이밍 | `transition: .4s, background-position 0s` |
| 느낌 | 매끄러움 · 에디토리얼 |
| 용도 | 아웃라인 버튼 · 텍스트 링크 |

```html
<button type="button" class="G-10">자세히 보기</button>
```

```css
.G-10 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-10:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-10 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-10 { background: linear-gradient(var(--fg-1) 0 0) calc(100% - var(--p, 0%)) / var(--p, 0%) no-repeat var(--bg-1); transition: 0.4s, background-position 0s; }
.G-10:hover, .G-10:focus-visible { --p: 100%; color: var(--bg-1); }
```

### G-11 바닥 띠가 차오르는 리퀴드 채움

| 항목 | 내용 |
|---|---|
| 출처 | [Animate UI — LiquidButton](https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/buttons/liquid/index.tsx) |
| 생김새 | 바닥의 3px 띠가 먼저 가로로 들어오고, 이어서 높이가 100% 로 차오른다 |
| 상태 | 호버: 띠 가로 진입 → 세로 채움, 라벨색 0.3s 지연 반전, 버튼 1.05배 / 누름 0.95배 / 떠나면 역순 |
| 모션 | 호버·누름 → 띠 width 0→100% → height 3px→100%, scale 1.05 / 0.95 |
| 타이밍 | `단계마다 0.3s(라벨색 0.3s 지연) / 스케일은 Motion 기본 전환(추정 500/25 근사)` (추정) |
| 느낌 | 유려함 · 장난스러움 |
| 용도 | 보조 CTA · 카드 하단 버튼 |

```html
<button type="button" class="G-11"><span class="G-11-t">물결 채우기</span></button>
```

```css
.G-11 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-11:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-11 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-11 { isolation: isolate; overflow: hidden; transition: transform 618ms linear(0, 0.137 4.167%, 0.412 8.333%, 0.7 12.5%, 0.919 16.667%, 1.055 20.833%, 1.112 25%, 1.115 29.167%, 1.09 33.333%, 1.055 37.5%, 1.023 41.667%, 1.001 45.833%, 0.99 50%, 0.986 54.167%, 0.987 58.333%, 0.991 62.5%, 0.995 66.667%, 0.999 70.833%, 1.001 75%, 1.002 79.167%, 1.002 83.333%, 1.001 87.5%, 1.001 91.667%, 1 95.833%, 1); }
.G-11::before { content: ""; position: absolute; left: 0; bottom: 0; z-index: -1; width: 0; height: 3px; background: var(--fg-1); transition: height 0.3s, width 0.3s 0.3s; }
.G-11:hover::before, .G-11:focus-visible::before { width: 100%; height: 100%; transition: width 0.3s, height 0.3s 0.3s; }
.G-11-t { transition: color 0.3s; }
.G-11:hover .G-11-t, .G-11:focus-visible .G-11-t { color: var(--bg-1); transition-delay: 0.3s; }
.G-11:hover { transform: scale(1.05); }
.G-11:active { transform: scale(0.95); }
```

### G-12 채움이 위로 빠지며 글자 반전 (Pan)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ButtonHoverStyles "Pan"](https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css) |
| 생김새 | 검은 알약의 채움이 위로 미끄러져 나가고, 지나가는 경계에서 라벨이 반전된다. 원본은 라벨에 mix-blend-mode: difference — 다크모드 토큰에서 흰 글자를 보장할 수 없어 반전 라벨 복제 + 반대 이동으로 같은 경계를 만들었다 |
| 상태 | 호버/포커스: ::before translate3d(0,-100%,0) / 떠나면 다시 덮음 |
| 모션 | 호버 → 채움 translateY 0→-100%, 경계에서 라벨 색 반전 |
| 타이밍 | `0.3s cubic-bezier(0.7, 0, 0.2, 1)` |
| 느낌 | 대담함 · 그래픽 |
| 용도 | 에디토리얼 사이트 · 포트폴리오 CTA |

```html
<button type="button" class="G-12"><span class="G-12-t">둘러보기</span><span class="G-12-fill" aria-hidden="true"><span>둘러보기</span></span></button>
```

```css
.G-12 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-12:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-12 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-12 { overflow: hidden; border-radius: var(--radius-pill); box-shadow: inset 0 0 0 2px var(--fg-1); }
.G-12-fill { position: absolute; inset: 0; display: grid; place-items: center; overflow: hidden; color: var(--bg-1); background: var(--fg-1); transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1); }
.G-12-fill > span { transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1); }
.G-12:hover .G-12-fill, .G-12:focus-visible .G-12-fill { transform: translate3d(0, -100%, 0); }
.G-12:hover .G-12-fill > span, .G-12:focus-visible .G-12-fill > span { transform: translate3d(0, 100%, 0); }
```

### G-13 안쪽부터 차오르며 타원으로 (Pallene)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ButtonHoverStyles "Pallene"](https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css) |
| 생김새 | 라운드 사각 아웃라인 → 검은 타원. inset box-shadow 로 안쪽부터 채우고 모서리를 50% 로 바꾼다 |
| 상태 | 호버/포커스: inset 0→40px, radius 0.5rem→50%, 글자색은 0.2s 늦게 반전 |
| 모션 | 호버 → box-shadow inset 0→40px + border-radius 0.5rem→50% + color |
| 타이밍 | `0.3s cubic-bezier(0.7, 0, 0.2, 1), 호버 시 transition-delay 0s, 0s, .2s` |
| 느낌 | 변신 · 자신감 |
| 용도 | 쇼케이스 · 브랜드 CTA |

```html
<button type="button" class="G-13">알아보기</button>
```

```css
.G-13 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-13:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-13 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-13 { width: calc(var(--space-11) - var(--space-2)); height: calc(var(--space-7) + var(--space-2)); border: 2px solid var(--fg-1); border-radius: 0.5rem; box-shadow: inset 0 0 0 0 var(--fg-1); transition: border-radius 0.3s, box-shadow 0.3s, color 0.3s; transition-timing-function: cubic-bezier(0.7, 0, 0.2, 1); }
.G-13:hover, .G-13:focus-visible { color: var(--bg-1); border-radius: 50%; box-shadow: inset 0 0 0 40px var(--fg-1); transition-delay: 0s, 0s, 0.2s; }
```

### G-14 테두리 그리기 / 드러내기

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops "Fenrir" · CSS-Tricks 테두리 애니메이션](https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css) |
| 생김새 | 왼쪽: 원형 버튼의 원 획이 스스로 그려지고(pathLength 1) 바깥 원이 1.2배로 커짐(Fenrir). 오른쪽: 5px 테두리가 clip-path inset 5px→0 으로 안쪽부터 두꺼워짐(CSS-Tricks https://css-tricks.com/?p=263206) |
| 상태 | 호버/포커스: 획 dashoffset 1→0 + 링 scale 1.2 / 테두리 inset(5px)→inset(0) |
| 모션 | 호버 → stroke-dashoffset 1→0, 링 scale 1→1.2 / clip-path inset 5px→0 |
| 타이밍 | `Fenrir 0.4s cubic-bezier(0.7, 0, 0.3, 1) / CSS-Tricks 0.6s linear` |
| 느낌 | 정밀함 · 차분함 |
| 용도 | 원형 CTA · 아웃라인 버튼 |

```html
<div class="G-14"><button type="button" class="G-14-a"><svg class="G-14-svg" viewBox="0 0 100 100" aria-hidden="true"><circle class="G-14-ring" cx="50" cy="50" r="46"/><circle class="G-14-path" cx="50" cy="50" r="46" pathLength="1"/></svg><span>그리기</span></button><button type="button" class="G-14-b">테두리</button></div>
```

```css
.G-14 { display: flex; align-items: center; gap: var(--space-6); }
.G-14-a { position: relative; display: grid; place-items: center; width: calc(var(--space-9) + var(--space-2)); height: calc(var(--space-9) + var(--space-2)); padding: 0; font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.G-14-a:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 4px; }
.G-14-svg { position: absolute; inset: 0; width: 100%; height: 100%; fill: none; overflow: visible; }
.G-14-ring, .G-14-path { transform-origin: 50% 50%; }
.G-14-ring { stroke: var(--border-strong); stroke-width: 1; transition: transform 0.4s cubic-bezier(0.7, 0, 0.3, 1); }
.G-14-path { stroke: var(--fg-1); stroke-width: 2; stroke-dasharray: 1; stroke-dashoffset: 1; transform: rotate(-90deg); transition: stroke-dashoffset 0.4s cubic-bezier(0.7, 0, 0.3, 1); }
.G-14-a:hover .G-14-ring, .G-14-a:focus-visible .G-14-ring { transform: scale(1.2); }
.G-14-a:hover .G-14-path, .G-14-a:focus-visible .G-14-path { stroke-dashoffset: 0; }
.G-14-b { position: relative; height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-1); border: 0; cursor: pointer; }
.G-14-b:focus-visible { outline: none; }
.G-14-b::before { content: ""; position: absolute; inset: -5px; border: 5px solid var(--fg-1); clip-path: inset(5px); pointer-events: none; transition: clip-path 0.6s linear; }
.G-14-b:hover::before, .G-14-b:focus-visible::before { clip-path: inset(0); }
```

**고스트·텍스트 링크**

### G-15 밑줄이 왼쪽에서 들어와 오른쪽으로 나감

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — LineHoverStyles](https://github.com/codrops/LineHoverStyles/blob/master/css/base.css) |
| 생김새 | 텍스트 링크 아래 1px 선. 들어올 땐 왼쪽에서 자라고, 나갈 땐 오른쪽으로 줄어든다(transform-origin 교체) |
| 상태 | 호버/포커스: scaleX 0→1, origin right→left / 떠나면 origin right 로 퇴장 |
| 모션 | 호버 → scaleX 0→1 + transform-origin 교체 |
| 타이밍 | `0.3s, "Io" 변형: 진입 cubic-bezier(0.4, 1, 0.8, 1) / 퇴장 cubic-bezier(0.7, 0, 0.2, 1)` |
| 느낌 | 에디토리얼 · 차분함 |
| 용도 | 텍스트 링크 · 내비게이션 |

```html
<button type="button" class="G-15">더 알아보기</button>
```

```css
.G-15 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-15:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-15 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-15 { padding: 0 var(--space-1); }
.G-15::before { content: ""; position: absolute; left: var(--space-1); right: var(--space-1); bottom: var(--space-2); height: 1px; background: currentColor; transform: scaleX(0); transform-origin: right; transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1); }
.G-15:hover::before, .G-15:focus-visible::before { transform: scaleX(1); transform-origin: left; transition-timing-function: cubic-bezier(0.4, 1, 0.8, 1); }
```

### G-16 고스트 배경 페이드 / 링크 밑줄

| 항목 | 내용 |
|---|---|
| 출처 | [shadcn/ui Button — ghost · link variant](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx) |
| 생김새 | 왼쪽 ghost: 평소 투명, 호버 때 bg-accent. 오른쪽 link: 밑줄만, 애니메이션 없이 나타남 |
| 상태 | 호버: ghost 배경 페이드 / link 밑줄 즉시 |
| 모션 | 호버 → ghost 배경 투명→accent / link 밑줄 표시(전환 없음) |
| 타이밍 | `150ms cubic-bezier(0.4, 0, 0.2, 1) / 밑줄 즉시` |
| 느낌 | 보이지 않음 · 정돈됨 |
| 용도 | 툴바 · 보조 액션 · 인라인 링크 |

```html
<div class="G-16"><button type="button" class="G-16-g">고스트</button><button type="button" class="G-16-l">링크</button></div>
```

```css
.G-16-g { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-16-g:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-16-g .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-16-l { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-16-l:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-16-l .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-16 { display: flex; gap: var(--space-3); }
.G-16-g { transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-16-g:hover { background: color-mix(in srgb, var(--fg-1) 8%, transparent); }
.G-16-l { text-underline-offset: 4px; }
.G-16-l:hover { text-decoration: underline; }
```

### G-17 라벨이 위로 빠졌다 아래서 돌아옴

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ButtonHoverStyles "Hyperion"/"Skoll"](https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css) |
| 생김새 | 채운 버튼의 배경이 가로로 접히며 사라지고(origin 교체), 라벨은 위로 빠졌다가 같은 라벨이 아래에서 올라온다. "Helene" 변형은 slotMachine 0.15s ease-out ×3 (데모 생략) |
| 상태 | 호버/포커스: 라벨 MoveUpInitial → MoveUpEnd, 배경 scaleX 1→0 / 라벨 색은 화면 밖에 있을 때(0.2s) 바뀜 |
| 모션 | 호버 → 라벨 y 0→-105% → 100%→0, 배경 scaleX 1→0 |
| 타이밍 | `라벨 0.2s + 0.2s(0.2s 지연), 배경 0.3s cubic-bezier(0.7, 0, 0.2, 1)` |
| 느낌 | 역동적 · 또렷함 |
| 용도 | 내비게이션 CTA · 에이전시 사이트 |

```html
<button type="button" class="G-17"><span class="G-17-clip"><span class="G-17-t">시작하기</span></span></button>
```

```css
.G-17 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-17:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-17 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-17 { isolation: isolate; box-shadow: inset 0 0 0 1px var(--fg-1); }
.G-17::before { content: ""; position: absolute; inset: 0; z-index: -1; border-radius: inherit; background: var(--fg-1); transform-origin: left; transition: transform 0.3s cubic-bezier(0.7, 0, 0.2, 1); }
.G-17:hover::before, .G-17:focus-visible::before { transform: scaleX(0); transform-origin: right; }
.G-17-clip { display: block; overflow: hidden; }
.G-17-t { display: block; color: var(--bg-1); transition: color 0s 0.2s; }
.G-17:hover .G-17-t, .G-17:focus-visible .G-17-t { color: var(--fg-1); animation: G-17-up1 0.2s forwards, G-17-up2 0.2s 0.2s forwards; }
@keyframes G-17-up1 { to { transform: translate3d(0, -105%, 0); } }
@keyframes G-17-up2 { from { transform: translate3d(0, 100%, 0); } to { transform: translate3d(0, 0, 0); } }
```

### G-18 두 라벨 위아래 스와이프

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — SwipeButton](https://github.com/codse/animata/blob/main/animata/button/swipe-button.tsx) |
| 생김새 | 잘린 상자 안에 라벨 두 개를 위아래로 쌓았다. 첫 라벨은 위로 나가고 두 번째(반전 배경)는 아래에서 올라온다 |
| 상태 | 호버/포커스: 첫 라벨 translateY(-100%), 두 번째 100%→0 |
| 모션 | 호버 → 라벨 A y 0→-100%, 라벨 B y 100%→0 |
| 타이밍 | `300ms ease-in-out` |
| 느낌 | 매끄러움 · 깔끔함 |
| 용도 | 텍스트 버튼 · 메뉴 항목 |

```html
<button type="button" class="G-18"><span class="G-18-a">알아보기</span><span class="G-18-b" aria-hidden="true">바로 가기 →</span></button>
```

```css
.G-18 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-18:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-18 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-18 { overflow: hidden; min-width: calc(var(--space-11) - var(--space-2)); }
.G-18-a, .G-18-b { transition: transform 300ms ease-in-out; }
.G-18-b { position: absolute; inset: 0; display: grid; place-items: center; color: var(--bg-1); background: var(--fg-1); transform: translateY(100%); }
.G-18:hover .G-18-a, .G-18:focus-visible .G-18-a { transform: translateY(-100%); }
.G-18:hover .G-18-b, .G-18:focus-visible .G-18-b { transform: translateY(0); }
```

**아이콘 버튼**

### G-19 부프 (Boop)

| 항목 | 내용 |
|---|---|
| 출처 | [Josh W. Comeau — Boop](https://www.joshwcomeau.com/react/boop/) |
| 생김새 | 아이콘이 호버 순간 20° 휙 돌았다가 150ms 뒤 스프링으로 제자리. 원본은 react-spring useSpring, 여기선 같은 물리(300/10)를 시뮬레이션한 키프레임 |
| 상태 | 호버/포커스 진입 때 1회 / 150ms 뒤 자동 복귀 / reduced motion 이면 빈 스타일(갤러리가 처리) |
| 모션 | 호버 진입 → rotate 0→20deg, 150ms 뒤 0deg 로 스프링 복귀 |
| 타이밍 | `react-spring tension 300, friction 10 (별은 6), timing 150ms → 시뮬레이션 1445ms` |
| 느낌 | 통통 튐 · 장난스러움 |
| 용도 | 아이콘 버튼 · 즐겨찾기 · 알림 |

```html
<button type="button" class="G-19" aria-label="즐겨찾기"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg></button>
```

```css
.G-19 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-19:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-19 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-19 { width: var(--space-7); height: var(--space-7); padding: 0; border-radius: var(--radius-pill); }
.G-19 .ic { width: var(--space-5); height: var(--space-5); }
.G-19:hover .ic, .G-19:focus-visible .ic { animation: G-19-boop 1445ms linear; }
@keyframes G-19-boop { 0% { transform: rotate(0deg); } 5% { transform: rotate(11deg); } 10% { transform: rotate(25.2deg); } 15% { transform: rotate(17.2deg); } 20% { transform: rotate(-3.5deg); } 25% { transform: rotate(-10.1deg); } 30% { transform: rotate(-3.4deg); } 35% { transform: rotate(3.2deg); } 40% { transform: rotate(3.2deg); } 45% { transform: rotate(0.1deg); } 50% { transform: rotate(-1.5deg); } 55% { transform: rotate(-0.8deg); } 60% { transform: rotate(0.3deg); } 65% { transform: rotate(0.6deg); } 70% { transform: rotate(0.1deg); } 75% { transform: rotate(-0.2deg); } 80% { transform: rotate(-0.2deg); } 90% { transform: rotate(0.1deg); } 100% { transform: rotate(0deg); } }
```

### G-20 바깥 링이 자리 잡기

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — IconHoverEffects 1a/1b](https://github.com/codrops/IconHoverEffects/blob/master/css/component.css) |
| 생김새 | 원형 아이콘 버튼 바깥 7px 에 4px 링(::after). 1a 는 0.8 에서 커지며, 1b 는 1.2 에서 줄며 나타난다. 원본 호버 아이콘색 #41ab6b |
| 상태 | 호버/포커스: 배경 채움 + 아이콘 반전 + 링 scale→1, 페이드 인 |
| 모션 | 호버 → 링 scale .8→1 (1a) / 1.2→1 (1b) + opacity 0→1, 배경·색 반전 |
| 타이밍 | `transform·opacity 0.2s, background·color 0.2s` |
| 느낌 | 정돈됨 · 부드러움 |
| 용도 | 소셜 아이콘 · 원형 액션 |

```html
<div class="G-20"><button type="button" class="G-20-b G-20-a" aria-label="좋아요 (1a)"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-9-9C1.8 7.8 3.8 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.2 0 5.2 2.8 4 6-2 4.6-9 9-9 9z"/></svg></button><button type="button" class="G-20-b G-20-c" aria-label="별표 (1b)"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg></button></div>
```

```css
.G-20 { display: flex; gap: var(--space-6); }
.G-20-b { position: relative; display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: color-mix(in srgb, var(--fg-1) 10%, transparent); border: 0; border-radius: var(--radius-pill); cursor: pointer; transition: background 0.2s, color 0.2s; }
.G-20-b .ic { width: var(--space-5); height: var(--space-5); }
.G-20-b::after { content: ""; position: absolute; inset: -7px; border-radius: inherit; box-shadow: 0 0 0 4px var(--fg-1); opacity: 0; pointer-events: none; transition: transform 0.2s, opacity 0.2s; }
.G-20-a::after { transform: scale(0.8); }
.G-20-c::after { transform: scale(1.2); }
.G-20-b:hover, .G-20-b:focus-visible { color: var(--bg-1); background: var(--fg-1); outline: none; }
.G-20-b:hover::after, .G-20-b:focus-visible::after { transform: scale(1); opacity: 1; }
```

### G-21 아이콘 통과 (나갔다 반대편에서)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — IconHoverEffects 5a–5d](https://github.com/codrops/IconHoverEffects/blob/master/css/component.css) |
| 생김새 | 원형 버튼 안 글리프가 한쪽 가장자리로 빠져나가 반대편에서 다시 들어온다. 5a 오른쪽, 5b 왼쪽, 5d 아래(5c 위는 같은 원리) |
| 상태 | 호버/포커스 진입 때 1회 (forwards) |
| 모션 | 호버 → 49% 에서 -100%(나감) → 50% 에 반대편 +100% 로 순간이동(opacity 0) → 51% 보임 → 0 |
| 타이밍 | `keyframes 0.3s forwards` |
| 느낌 | 재치 · 빠름 |
| 용도 | 이전/다음 아이콘 · 다운로드 |

```html
<div class="G-21"><button type="button" class="G-21-b G-21-l" aria-label="이전"><span class="G-21-g"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/></svg></span></button><button type="button" class="G-21-b G-21-d" aria-label="다운로드"><span class="G-21-g"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M12 4v11"/><path class="head" d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg></span></button><button type="button" class="G-21-b G-21-r" aria-label="다음"><span class="G-21-g"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></button></div>
```

```css
.G-21 { display: flex; gap: var(--space-4); }
.G-21-b { position: relative; display: grid; width: var(--space-8); height: var(--space-8); padding: 0; overflow: hidden; color: var(--fg-1); background: var(--bg-1); border: 2px solid var(--fg-1); border-radius: var(--radius-pill); cursor: pointer; }
.G-21-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-21-g { display: grid; place-items: center; width: 100%; height: 100%; }
.G-21-g .ic { width: var(--space-5); height: var(--space-5); }
.G-21-r:hover .G-21-g, .G-21-r:focus-visible .G-21-g { animation: G-21-toRight 0.3s forwards; }
.G-21-l:hover .G-21-g, .G-21-l:focus-visible .G-21-g { animation: G-21-toLeft 0.3s forwards; }
.G-21-d:hover .G-21-g, .G-21-d:focus-visible .G-21-g { animation: G-21-toBottom 0.3s forwards; }
@keyframes G-21-toRight { 49% { transform: translateX(100%); } 50% { opacity: 0; transform: translateX(-100%); } 51% { opacity: 1; } }
@keyframes G-21-toLeft { 49% { transform: translateX(-100%); } 50% { opacity: 0; transform: translateX(100%); } 51% { opacity: 1; } }
@keyframes G-21-toBottom { 49% { transform: translateY(100%); } 50% { opacity: 0; transform: translateY(-100%); } 51% { opacity: 1; } }
```

### G-22 소나 핑

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — IconHoverEffects 8](https://github.com/codrops/IconHoverEffects/blob/master/css/component.css) |
| 생김새 | 아이콘 버튼이 살짝 줄고, 바깥 후광 링이 커지며 사라진다. 원본 글로우 #3851bc → var(--fg-3) |
| 상태 | 호버/포커스: 버튼 scale 0.93, ::after sonarEffect 1회(75ms 지연) |
| 모션 | 호버 → 버튼 scale 0.93 / 링: 40% 까지 글로우 쌓임 → scale(1.5) + opacity 0 |
| 타이밍 | `sonarEffect 1.3s ease-out 75ms 지연 (버튼 축소 0.1s ease-out은 원본 CSS)` (추정) |
| 느낌 | 주의 환기 · 부드러움 |
| 용도 | 알림 버튼 · 새 소식 표시 |

```html
<button type="button" class="G-22" aria-label="알림"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 21h4"/></svg></button>
```

```css
.G-22 { position: relative; display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: color-mix(in srgb, var(--fg-1) 10%, transparent); border: 0; border-radius: var(--radius-pill); cursor: pointer; transition: transform 0.1s ease-out, background 0.2s; }
.G-22 .ic { width: var(--space-5); height: var(--space-5); }
.G-22:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-22::after { content: ""; position: absolute; inset: 0; border-radius: inherit; box-shadow: 0 0 0 2px color-mix(in srgb, var(--fg-1) 10%, transparent); opacity: 0; transform: scale(0.9); pointer-events: none; }
.G-22:hover, .G-22:focus-visible { background: color-mix(in srgb, var(--fg-1) 5%, transparent); transform: scale(0.93); }
.G-22:hover::after, .G-22:focus-visible::after { animation: G-22-sonar 1.3s ease-out 75ms; }
@keyframes G-22-sonar { 0% { opacity: 0.3; } 40% { opacity: 0.5; box-shadow: 0 0 0 2px color-mix(in srgb, var(--fg-1) 10%, transparent), 0 0 10px 10px var(--fg-3), 0 0 0 10px color-mix(in srgb, var(--fg-1) 50%, transparent); } 100% { box-shadow: 0 0 0 2px color-mix(in srgb, var(--fg-1) 10%, transparent), 0 0 10px 10px var(--fg-3), 0 0 0 10px color-mix(in srgb, var(--fg-1) 50%, transparent); transform: scale(1.5); opacity: 0; } }
```

### G-23 테마 토글 원형 리빌

| 항목 | 내용 |
|---|---|
| 출처 | [Magic UI — AnimatedThemeToggler](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-theme-toggler.tsx) |
| 생김새 | 해/달 아이콘 버튼. 새 테마가 누른 지점에서 원으로 퍼진다. 원본은 View Transition(::view-transition-new(root))으로 페이지 전체 — 데모는 무대 안 레이어로 축소. 사각·다이아·육각·별 변형 있음 |
| 상태 | 클릭: 아이콘 즉시 교체 + 새 테마 레이어가 circle(0% at 클릭점)→circle(최대 반경) / 키보드면 가운데에서 |
| 모션 | 클릭 → clip-path circle(0% at x y) → circle(150%) |
| 타이밍 | `400ms (기본값), 이징 ease-in-out 은 추정` (추정) |
| 느낌 | 마법 같음 · 매끄러움 |
| 용도 | 다크모드 토글 · 설정 |

```html
<div class="G-23" data-behavior="toggle replay" data-replay><button type="button" class="G-23-btn" data-toggle aria-pressed="false" aria-label="다크 테마"><span class="G-23-sun"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg></span><span class="G-23-moon"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg></span></button><span class="G-23-old" aria-hidden="true"></span><span class="G-23-new" aria-hidden="true"></span></div>
```

```css
.G-23 { position: absolute; inset: 0; display: grid; place-items: center; isolation: isolate; pointer-events: none; }
.G-23-old, .G-23-new { position: absolute; inset: 0; z-index: -1; }
.G-23-old { background: var(--fg-1); }
.G-23-new { background: var(--bg-1); clip-path: circle(150% at var(--x, 50%) var(--y, 50%)); }
.G-23-btn.is-on ~ .G-23-old { background: var(--bg-1); }
.G-23-btn.is-on ~ .G-23-new { background: var(--fg-1); }
.G-23.is-play .G-23-new { animation: G-23-reveal 400ms ease-in-out; }
@keyframes G-23-reveal { from { clip-path: circle(0% at var(--x, 50%) var(--y, 50%)); } to { clip-path: circle(150% at var(--x, 50%) var(--y, 50%)); } }
.G-23-btn { position: relative; display: grid; place-items: center; width: var(--space-7); height: var(--space-7); padding: 0; color: var(--fg-1); background: transparent; border: 1px solid var(--border-strong); border-radius: var(--radius-pill); cursor: pointer; pointer-events: auto; }
.G-23-btn:focus-visible { outline: 2px solid currentColor; outline-offset: 2px; }
.G-23-btn.is-on { color: var(--bg-1); border-color: color-mix(in srgb, var(--bg-1) 30%, transparent); }
.G-23-btn span { display: grid; }
.G-23-btn .ic { width: var(--space-5); height: var(--space-5); }
.G-23-moon, .G-23-btn.is-on .G-23-sun { display: none; }
.G-23-btn.is-on .G-23-moon { display: grid; }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);

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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

**CTA + 트레일링 아이콘**

### G-24 Stripe 식 호버 화살표

| 항목 | 내용 |
|---|---|
| 출처 | [Adam Wathan — Recreating Stripe's arrow animation](https://typefully.com/adamwathan/recreating-stripes-arrow-animation-with-NnPxtVr) |
| 생김새 | 라벨 뒤 셰브론. 호버하면 축선이 나타나고 머리가 앞으로 가서 화살표가 된다. SVG 하나에 path 두 개(10×10) |
| 상태 | 호버/포커스: 머리 path translateX(3px), 축선 path opacity 0→1 |
| 모션 | 호버 → 머리 translateX 3px + 축선 opacity 0→1 |
| 타이밍 | `약 150ms (출처에 시간 없음, ease-out 추정)` (추정) |
| 느낌 | 섬세함 · 프리미엄 |
| 용도 | 텍스트 CTA · 카드 링크 |

```html
<button type="button" class="G-24">더 보기<svg class="G-24-ar" width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path class="G-24-line" d="M0 5h7"/><path class="G-24-tip" d="M1 1l4 4-4 4"/></svg></button>
```

```css
.G-24 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-24:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-24 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-24 { gap: var(--space-2); padding: 0 var(--space-4); border-radius: var(--radius-pill); }
.G-24-ar { overflow: visible; }
.G-24-line { opacity: 0; transition: opacity 150ms ease-out; }
.G-24-tip { transition: transform 150ms ease-out; }
.G-24:hover .G-24-line, .G-24:focus-visible .G-24-line { opacity: 1; }
.G-24:hover .G-24-tip, .G-24:focus-visible .G-24-tip { transform: translateX(3px); }
```

### G-25 버블 화살표 자리바꿈

| 항목 | 내용 |
|---|---|
| 출처 | [Osmo — Button with bubble arrow](https://www.osmo.supply/resource/button-with-bubble-arrow) |
| 생김새 | 알약 버튼 오른쪽 원 안에 화살표. 호버하면 왼쪽 원이 커지며(origin left) 들어오고 오른쪽 원은 줄며(origin right) 나간다. 원본 주황 원 |
| 상태 | 호버/포커스: 내용 translateX(-3.75em)→0, 화살표 rotate(-45deg) |
| 모션 | 호버 → 왼쪽 원 scale 0→1, 오른쪽 원 1→0, 내용 -3.75em→0, 화살표 -45° |
| 타이밍 | `transform 0.735s cubic-bezier(0.625, 0.05, 0, 1)` |
| 느낌 | 고급스러움 · 느리다 빠름 |
| 용도 | 에이전시 CTA · 포트폴리오 |

```html
<button type="button" class="G-25"><span class="G-25-row"><span class="G-25-bub G-25-l" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span><span class="G-25-t">프로젝트 보기</span><span class="G-25-bub G-25-r" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></span></button>
```

```css
.G-25 { position: relative; display: inline-flex; align-items: center; padding: 0.375em; overflow: hidden; font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.G-25:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-25-row { display: flex; align-items: center; gap: 1em; margin-right: -3.75em; transform: translateX(-3.75em); transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1); }
.G-25-t { padding: 0 0.5em; }
.G-25-bub { display: grid; place-items: center; width: 2.75em; height: 2.75em; flex: none; color: var(--fg-1); background: var(--bg-1); border-radius: var(--radius-pill); transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1); }
.G-25-bub .ic { width: 1.25em; height: 1.25em; transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1); }
.G-25-l { transform: scale(0); transform-origin: left; }
.G-25-r { transform-origin: right; }
.G-25:hover .G-25-row, .G-25:focus-visible .G-25-row { transform: translateX(0); }
.G-25:hover .G-25-l, .G-25:focus-visible .G-25-l { transform: scale(1); }
.G-25:hover .G-25-r, .G-25:focus-visible .G-25-r { transform: scale(0); }
.G-25:hover .ic, .G-25:focus-visible .ic { transform: rotate(-45deg); }
```

### G-26 점이 번져 덮기

| 항목 | 내용 |
|---|---|
| 출처 | [Magic UI — InteractiveHoverButton](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/interactive-hover-button.tsx) |
| 생김새 | 라벨 앞 8px 점이 100.8배로 커지며 알약 전체를 덮는다. 기존 라벨은 오른쪽으로 빠지고 새 라벨+화살표가 들어온다 |
| 상태 | 호버/포커스: 점 scale ×100.8, 기존 라벨 translateX(48px)+페이드 아웃, 새 라벨 48px→-20px + 페이드 인 |
| 모션 | 호버 → 점 scale 1→100.8, 라벨 교체(48px 이동) |
| 타이밍 | `transition-all 300ms (Tailwind 기본 cubic-bezier(0.4, 0, 0.2, 1))` |
| 느낌 | 펀치감 · 모던 |
| 용도 | 랜딩 CTA · 가입 버튼 |

```html
<button type="button" class="G-26"><span class="G-26-row"><span class="G-26-dot" aria-hidden="true"></span><span class="G-26-t">둘러보기</span></span><span class="G-26-new" aria-hidden="true"><span>둘러보기</span><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></button>
```

```css
.G-26 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-26:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-26 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-26 { overflow: hidden; padding: var(--space-2) var(--space-6); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-pill); }
.G-26-row { display: flex; align-items: center; gap: var(--space-2); }
.G-26-dot { width: 8px; height: 8px; border-radius: var(--radius-pill); background: var(--fg-1); transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-26-t { display: inline-block; transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-26-new { position: absolute; top: 0; left: 0; z-index: 10; display: flex; align-items: center; justify-content: center; gap: var(--space-2); width: 100%; height: 100%; color: var(--bg-1); opacity: 0; transform: translateX(48px); transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-26:hover .G-26-dot, .G-26:focus-visible .G-26-dot { transform: scale(100.8); }
.G-26:hover .G-26-t, .G-26:focus-visible .G-26-t { transform: translateX(48px); opacity: 0; }
.G-26:hover .G-26-new, .G-26:focus-visible .G-26-new { transform: translateX(-20px); opacity: 1; }
```

### G-27 아이콘 캐러셀 교체

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — GetStartedButton](https://github.com/codse/animata/blob/main/animata/button/get-started-button.tsx) |
| 생김새 | 라벨 옆 28px 원 안에 56px 폭 아이콘 띠(화살표 두 개). 호버하면 띠가 밀리며 새 화살표가 들어온다 |
| 상태 | 호버/포커스: 띠 translateX(-50%)→0, 버튼·원 배경/글자색 반전 |
| 모션 | 호버 → 아이콘 띠 -50%→0, 색 반전 |
| 타이밍 | `띠 200ms ease-in-out, 배경·글자색 100ms` |
| 느낌 | 기민함 · 친근함 |
| 용도 | 온보딩 CTA · 시작하기 |

```html
<button type="button" class="G-27"><span>시작하기</span><span class="G-27-c" aria-hidden="true"><span class="G-27-strip"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/></svg></span></span></button>
```

```css
.G-27 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-27:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-27 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-27 { gap: var(--space-3); padding: 0 var(--space-2) 0 var(--space-4); background: color-mix(in srgb, var(--fg-1) 8%, transparent); transition: background-color 100ms, color 100ms; }
.G-27:hover, .G-27:focus-visible { color: var(--bg-1); background: var(--fg-1); }
.G-27-c { width: 28px; height: 28px; overflow: hidden; color: var(--bg-1); background: var(--fg-1); border-radius: var(--radius-pill); transition: background-color 100ms, color 100ms; }
.G-27:hover .G-27-c, .G-27:focus-visible .G-27-c { color: var(--fg-1); background: var(--bg-1); }
.G-27-strip { display: flex; width: 56px; height: 100%; transform: translateX(-50%); transition: transform 200ms ease-in-out; }
.G-27 .G-27-strip .ic { width: 28px; height: 28px; padding: 6px; }
.G-27:hover .G-27-strip, .G-27:focus-visible .G-27-strip { transform: none; }
```

### G-28 사각형이 화살표 모양으로 (Anthe)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ButtonHoverStyles "Anthe"](https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css) |
| 생김새 | 버튼 배경 자체가 clip-path 로 오른쪽을 가리키는 화살표 모양이 된다. 라벨은 반대로 10px 물러남 |
| 상태 | 호버/포커스: polygon(0 0,100% 0,100% 50%,100% 100%,0 100%) → (0 0,75% 0,100% 50%,75% 100%,0 100%) |
| 모션 | 호버 → clip-path 사각→화살표, 라벨 translateX(-10px) |
| 타이밍 | `0.4s cubic-bezier(0.2, 1, 0.8, 1)` |
| 느낌 | 방향성 · 또렷함 |
| 용도 | 다음 단계 · 진행 CTA |

```html
<button type="button" class="G-28"><span class="G-28-t">다음 단계</span></button>
```

```css
.G-28 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-28:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-28 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-28 { isolation: isolate; padding: 0 var(--space-7) 0 var(--space-5); color: var(--bg-1); border-radius: 0; }
.G-28::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--fg-1); clip-path: polygon(0 0, 100% 0, 100% 50%, 100% 100%, 0 100%); transition: clip-path 0.4s cubic-bezier(0.2, 1, 0.8, 1); }
.G-28:hover::before, .G-28:focus-visible::before { clip-path: polygon(0 0, 75% 0, 100% 50%, 75% 100%, 0 100%); }
.G-28-t { transition: transform 0.4s cubic-bezier(0.2, 1, 0.8, 1); }
.G-28:hover .G-28-t, .G-28:focus-visible .G-28-t { transform: translateX(-10px); }
```

**로딩·제출**

### G-29 오른쪽으로 늘어나는 스피너 (Ladda)

| 항목 | 내용 |
|---|---|
| 출처 | [Ladda — Hakim El Hattab](https://github.com/hakimel/Ladda/blob/master/css/ladda.scss) |
| 생김새 | 왼쪽 expand-right: 버튼 오른쪽이 56px 늘어나 스피너 자리를 만든다. 오른쪽 zoom-out: 라벨이 0.5배로 줄며 사라지고 스피너가 2.5배에서 1배로 내려앉는다 |
| 상태 | 클릭 → 로딩 2초(데모) → 원래대로 / 로딩 중 aria-busy, 재클릭 무시 |
| 모션 | 클릭(로딩 시작) → padding-right →56px + 스피너 페이드 인 / zoom-out: 라벨 scale .5·opacity 0, 스피너 scale 2.5→1 |
| 타이밍 | `expand-right 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) (back-out) / zoom-out 0.3s ease / 스피너 회전 0.8s 는 추정(원본 spin.js)` (추정) |
| 느낌 | 탄력 · 정보 전달 |
| 용도 | 폼 제출 · 결제 |

```html
<div class="G-29" data-behavior="sequence"><button type="button" class="G-29-b G-29-x" data-steps="is-loading:2000"><span class="G-29-t">제출</span><span class="G-29-sp" aria-hidden="true"></span></button><button type="button" class="G-29-b G-29-z" data-steps="is-loading:2000"><span class="G-29-t">줌아웃</span><span class="G-29-sp" aria-hidden="true"></span></button></div>
```

```css
.G-29 { display: flex; align-items: center; gap: var(--space-3); }
.G-29-b { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-29-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-29-b .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-29-b { overflow: hidden; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) all; }
.G-29-t, .G-29-sp { transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) all; }
.G-29-sp { position: absolute; top: 50%; width: 18px; height: 18px; margin-top: -9px; border: 2px solid currentColor; border-right-color: transparent; border-radius: var(--radius-pill); opacity: 0; }
.G-29-b.is-loading .G-29-sp { animation: G-29-rot 0.8s linear infinite; }
.G-29-x .G-29-sp { right: 20px; }
.G-29-x.is-loading { padding-right: 56px; }
.G-29-x.is-loading .G-29-sp { opacity: 1; }
.G-29-z .G-29-t, .G-29-z .G-29-sp { transition: 0.3s ease all; }
.G-29-z .G-29-sp { left: 50%; margin-left: -9px; transform: scale(2.5); }
.G-29-z.is-loading .G-29-t { transform: scale(0.5); opacity: 0; }
.G-29-z.is-loading .G-29-sp { transform: scale(1); opacity: 1; }
@keyframes G-29-rot { to { rotate: 1turn; } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-30 원으로 오므라들며 진행 막대 (Ladda contract)

| 항목 | 내용 |
|---|---|
| 출처 | [Ladda — contract + progress](https://github.com/hakimel/Ladda/blob/master/css/ladda.scss) |
| 생김새 | 폭 100px 버튼이 52px 원형 스피너로 오므라들고, 뒤에서 반투명 진행 막대(.ladda-progress)가 찬다 |
| 상태 | 클릭 → 로딩(진행률은 JS 가 갱신, 데모는 12단계로 흉내) → 복귀 |
| 모션 | 클릭(로딩 시작) → width 100px→52px, border-radius 50%, 진행 막대 width 0→100% |
| 타이밍 | `Ladda 기본 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) / 진행 막대 0.1s linear (JS 갱신마다)` |
| 느낌 | 컴팩트 · 기계적 |
| 용도 | 업로드 · 작은 제출 버튼 |

```html
<button type="button" class="G-30" data-behavior="sequence" data-steps="is-loading:2400"><span class="G-30-pr" aria-hidden="true"></span><span class="G-30-t">전송</span><span class="G-30-sp" aria-hidden="true"></span></button>
```

```css
.G-30 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-30:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-30 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-30 { width: 100px; height: 52px; padding: 0; overflow: hidden; transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) all; }
.G-30.is-loading { width: 52px; border-radius: 50%; }
.G-30-t { position: relative; transition: opacity 0.3s; }
.G-30.is-loading .G-30-t { opacity: 0; }
.G-30-sp { position: absolute; inset: 0; margin: auto; width: 20px; height: 20px; border: 2px solid currentColor; border-right-color: transparent; border-radius: var(--radius-pill); opacity: 0; transition: opacity 0.3s; }
.G-30.is-loading .G-30-sp { animation: G-30-rot 0.8s linear infinite; }
.G-30.is-loading .G-30-sp { opacity: 1; }
.G-30-pr { position: absolute; top: 0; bottom: 0; left: 0; width: 0; background: color-mix(in srgb, var(--bg-1) 25%, transparent); transition: width 0.1s linear; }
.G-30.is-loading .G-30-pr { animation: G-30-prog 2400ms steps(12) forwards; }
@keyframes G-30-prog { from { width: 0; } to { width: 100%; } }
@keyframes G-30-rot { to { rotate: 1turn; } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-31 알약 → 원형 진행 링

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — CircularProgressButton](https://github.com/codrops/CircularProgressButton/blob/master/css/component.css) |
| 생김새 | 250px 알약이 70px 링(테두리 5px)으로 줄고 링 획이 차오른다. 탄성 변형: 줄 때 뒤로 살짝 당겼다(anticipation) 줄고, 커질 때 튕기며 커진다 |
| 상태 | 클릭 → 링 채움 1.8초 → 다시 알약 / 텍스트는 줄 때 즉시 사라지고 커질 때 0.3s 뒤 나타남 |
| 모션 | 클릭(로딩 시작) → width 250→70px, border 2→5px, 텍스트 opacity, 링 stroke-dashoffset 1→0 |
| 타이밍 | `width 0.3s (줄 때 cubic-bezier(0.6, -0.6, 0.75, 0.75), 커질 때 cubic-bezier(0.25, 0.25, 0.4, 1.6)), 텍스트 0.15s, 링 0.3s` |
| 느낌 | 탄성 · 만족감 |
| 용도 | 제출 버튼 · 저장 |

```html
<button type="button" class="G-31" data-behavior="sequence" data-steps="is-loading:1800"><span class="G-31-t">제출하기</span><svg class="G-31-ring" viewBox="0 0 70 70" aria-hidden="true"><circle cx="35" cy="35" r="32.5" pathLength="1"/></svg></button>
```

```css
.G-31 { position: relative; width: 250px; height: 70px; padding: 0; font: inherit; font-size: var(--text-16); line-height: var(--lh-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: transparent; border: 2px solid var(--fg-1); border-radius: 40px; cursor: pointer; transition: width 0.3s cubic-bezier(0.25, 0.25, 0.4, 1.6), border-width 0.3s, border-color 0.3s; }
.G-31:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-31.is-loading { width: 70px; border-width: 5px; border-color: var(--border); transition: width 0.3s cubic-bezier(0.6, -0.6, 0.75, 0.75), border-width 0.3s, border-color 0.3s; }
.G-31-t { transition: opacity 0.15s 0.3s; }
.G-31.is-loading .G-31-t { opacity: 0; transition-delay: 0s; }
.G-31-ring { position: absolute; top: -5px; left: -5px; width: 70px; height: 70px; fill: none; stroke: var(--fg-1); stroke-width: 5; transform: rotate(-90deg); opacity: 0; pointer-events: none; }
.G-31-ring circle { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 0.3s; }
.G-31.is-loading .G-31-ring { opacity: 1; }
.G-31.is-loading .G-31-ring circle { animation: G-31-fill 1500ms 300ms linear forwards; }
@keyframes G-31-fill { to { stroke-dashoffset: 0; } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-32 납작한 진행 막대로 눌림

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ProgressButtonStyles](https://github.com/codrops/ProgressButtonStyles/blob/master/css/component.css) |
| 생김새 | 버튼이 세로로 0.3배 눌려 얇은 진행 막대가 되고, 안에서 채움이 찬다. 끝나면 내용이 위로 밀려 성공 문구가 나온다. 3D 변형(perspective 900px, 감싼 요소 rotateX 0.2s)은 데모 생략 |
| 상태 | 클릭 → 로딩(막대) → 성공 문구 1.4초 → 복귀 |
| 모션 | 클릭(로딩 시작) → scaleY 1→0.3 + 내용 opacity 0 + 채움 width / 성공: 내용 translateY(-100%) |
| 타이밍 | `scaleY 0.2s, 채움 width 0.3s(갱신마다), 성공 이동 0.3s` |
| 느낌 | 창의적 · 기계적 |
| 용도 | 업로드 · 긴 작업 제출 |

```html
<button type="button" class="G-32" data-behavior="sequence" data-steps="is-loading:1800,is-done:1400"><span class="G-32-pr" aria-hidden="true"></span><span class="G-32-c"><span>업로드</span><span>완료!</span></span></button>
```

```css
.G-32 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-32:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-32 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-32 { width: 160px; padding: 0; overflow: hidden; transition: transform 0.2s; }
.G-32.is-loading { transform: scaleY(0.3); }
.G-32-c { position: relative; display: flex; flex-direction: column; height: 100%; transition: opacity 0.2s, transform 0.3s; }
.G-32-c > span { display: grid; place-items: center; height: 100%; flex: none; }
.G-32.is-loading .G-32-c { opacity: 0; }
.G-32.is-done .G-32-c { transform: translateY(-100%); }
.G-32-pr { position: absolute; top: 0; bottom: 0; left: 0; width: 0; background: color-mix(in srgb, var(--bg-1) 45%, transparent); transition: width 0.3s; }
.G-32.is-loading .G-32-pr { animation: G-32-prog 1800ms linear forwards; }
@keyframes G-32-prog { to { width: 100%; } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-33 상태 라벨 교체 (보내기 → 스피너 → 체크)

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — StatusButton](https://github.com/codse/animata/blob/main/animata/button/status-button.tsx) |
| 생김새 | "보내기" → 점선 원 스피너 → 체크 + "보냄". 상태마다 이전 것은 아래로 빠지고 새 것은 위에서 들어온다(AnimatePresence mode wait). 원본 성공 배경 초록 계열 |
| 상태 | 클릭 → 로딩 1.5초 → 완료 1.5초 → 복귀 / 체크는 스프링으로 0→1 |
| 모션 | 클릭 → 퇴장 y +15 + 페이드, 등장 y -15→0 / 체크 scale 0→1 / 배경색 |
| 타이밍 | `상태 전환 75ms, 스피너 animate-spin(1s linear), 체크 spring 75ms 지연(type spring 기본 100/10/1 근사), 배경 300ms` |
| 느낌 | 빠름 · 분명함 |
| 용도 | 메시지 전송 · 폼 제출 |

```html
<button type="button" class="G-33" data-behavior="sequence" data-steps="is-loading:1500,is-done:1500"><span class="G-33-s G-33-a">보내기</span><span class="G-33-s G-33-b" aria-hidden="true"><span class="G-33-spin"></span></span><span class="G-33-s G-33-c" aria-hidden="true"><span class="G-33-ck"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></span>보냄</span></button>
```

```css
.G-33 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-33:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-33 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-33 { width: 120px; overflow: hidden; transition: background-color 300ms; }
.G-33.is-done { background: var(--fg-2); }
.G-33-s { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-1); opacity: 0; transform: translateY(-15px); transition: opacity 75ms, transform 75ms; }
.G-33-a { opacity: 1; transform: none; transition-delay: 75ms; }
.G-33.is-loading .G-33-a, .G-33.is-done .G-33-a, .G-33.is-done .G-33-b { opacity: 0; transform: translateY(15px); transition-delay: 0s; }
.G-33.is-loading .G-33-b, .G-33.is-done .G-33-c { opacity: 1; transform: none; transition-delay: 75ms; }
.G-33-spin { width: 16px; height: 16px; border: 2px dashed currentColor; border-radius: var(--radius-pill); }
.G-33.is-loading .G-33-spin { animation: G-33-spin 1s linear infinite; }
.G-33-ck { display: grid; transform: scale(0); }
.G-33 .G-33-ck .ic { width: 16px; height: 16px; }
.G-33.is-done .G-33-ck { transform: scale(1); transition: transform 1351ms linear(0, 0.131 4.167%, 0.41 8.333%, 0.709 12.5%, 0.947 16.667%, 1.096 20.833%, 1.157 25%, 1.155 29.167%, 1.117 33.333%, 1.068 37.5%, 1.024 41.667%, 0.993 45.833%, 0.977 50%, 0.974 54.167%, 0.978 58.333%, 0.985 62.5%, 0.993 66.667%, 0.999 70.833%, 1.003 75%, 1.004 79.167%, 1.004 83.333%, 1.003 87.5%, 1.002 91.667%, 1.001 95.833%, 1) 150ms; }
@keyframes G-33-spin { to { transform: rotate(360deg); } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-34 상태 사이 블러 크로스페이드

| 항목 | 내용 |
|---|---|
| 출처 | [Emil Kowalski — emil-design-eng skill](https://github.com/emilkowalski/skill/blob/main/skills/emil-design-eng/SKILL.md) |
| 생김새 | 라벨과 스피너가 겹쳐 보이지 않게, 상태가 바뀌는 순간 내용 전체를 blur(2px)·opacity .7 로 흐렸다가 선명하게. 블러는 20px 미만 유지(Safari 비용) |
| 상태 | 클릭 → 로딩 1.6초 → 복귀(양방향 모두 블러로 이어짐) / 누름 0.97 |
| 모션 | 상태 변경 · 누름 → 내용 blur(2px)+opacity .7 → 선명 / scale 0.97 |
| 타이밍 | `200ms ease / 누름 160ms ease-out(cubic-bezier(0.23, 1, 0.32, 1)) / 스피너 회전 700ms 추정` (추정) |
| 느낌 | 부드러움 · 이음매 없음 |
| 용도 | 저장 버튼 · 상태가 자주 바뀌는 버튼 |

```html
<button type="button" class="G-34" data-behavior="sequence" data-steps="is-loading:1600,is-back:200"><span class="G-34-c"><span class="G-34-a">저장</span><span class="G-34-spin" aria-hidden="true"></span></span></button>
```

```css
.G-34 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-34:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-34 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-34 { width: 104px; transition: transform 160ms cubic-bezier(0.23, 1, 0.32, 1); }
.G-34:active { transform: scale(0.97); }
.G-34-c { display: grid; place-items: center; }
.G-34.is-loading .G-34-c { animation: G-34-in 200ms ease; }
.G-34.is-back .G-34-c { animation: G-34-out 200ms ease; }
.G-34-spin { display: none; width: 16px; height: 16px; border: 2px solid currentColor; border-right-color: transparent; border-radius: var(--radius-pill); }
.G-34.is-loading .G-34-a { display: none; }
.G-34.is-loading .G-34-spin { display: block; animation: G-34-rot 700ms linear infinite; }
@keyframes G-34-in { from { filter: blur(2px); opacity: 0.7; } }
@keyframes G-34-out { from { filter: blur(2px); opacity: 0.7; } }
@keyframes G-34-rot { to { transform: rotate(1turn); } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

**성공·오류**

### G-35 체크 / X 획 그리기

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — CircularProgressButton (uiProgressButton.js)](https://github.com/codrops/CircularProgressButton/blob/master/js/uiProgressButton.js) |
| 생김새 | 진행 링이 되감기며 사라지고 버튼이 채워지면서 체크(성공) 또는 X(실패)가 그려진다. dasharray = getTotalLength() (체크 23, X 17). 원본 성공 초록 / 실패 빨강 |
| 상태 | 클릭 → 진행(데모 0.9초) → 결과 1500ms 유지(statusTime) → 되돌아감 |
| 모션 | 완료/실패 → 링 dashoffset 0→1(되감기), 아이콘 dashoffset len→0, 배경 채움 |
| 타이밍 | `stroke-dashoffset 0.3s, background 0.3s, 유지 1500ms` |
| 느낌 | 확신 · 또렷함 |
| 용도 | 제출 결과 · 결제 완료 |

```html
<div class="G-35" data-behavior="sequence"><button type="button" class="G-35-b" data-steps="is-loading:900,is-done:1500"><span class="G-35-t">성공</span><svg class="G-35-ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" pathLength="1"/></svg><span class="G-35-ic" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></span></button><button type="button" class="G-35-b G-35-bad" data-steps="is-loading:900,is-done:1500"><span class="G-35-t">실패</span><svg class="G-35-ring" viewBox="0 0 40 40" aria-hidden="true"><circle cx="20" cy="20" r="17" pathLength="1"/></svg><span class="G-35-ic" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg></span></button></div>
```

```css
.G-35 { display: flex; gap: var(--space-3); }
.G-35-b { position: relative; width: 120px; height: var(--space-7); padding: 0; font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); color: var(--fg-1); background: transparent; border: 2px solid var(--fg-1); border-radius: var(--radius-pill); cursor: pointer; transition: background-color 0.3s, color 0.3s; }
.G-35-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-35-t { transition: opacity 0.3s; }
.G-35-b.is-loading .G-35-t, .G-35-b.is-done .G-35-t { opacity: 0; }
.G-35-ring { position: absolute; inset: 0; margin: auto; width: 34px; height: 34px; fill: none; stroke: currentColor; stroke-width: 3; transform: rotate(-90deg); }
.G-35-ring circle { stroke-dasharray: 1; stroke-dashoffset: 1; transition: stroke-dashoffset 0.3s; }
.G-35-b.is-loading .G-35-ring circle { stroke-dashoffset: 0; transition: stroke-dashoffset 900ms linear; }
.G-35-b.is-done { color: var(--bg-1); background: var(--fg-1); }
.G-35-ic { position: absolute; inset: 0; display: grid; place-items: center; }
.G-35-ic .ic { width: var(--space-5); height: var(--space-5); stroke-dasharray: 23; stroke-dashoffset: 23; transition: stroke-dashoffset 0.3s; }
.G-35-bad .G-35-ic .ic { stroke-dasharray: 17; stroke-dashoffset: 17; }
.G-35-b.is-done .G-35-ic .ic { stroke-dashoffset: 0; }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-36 오류 흔들기 (shakeX · headShake)

| 항목 | 내용 |
|---|---|
| 출처 | [animate.css — shakeX / headShake](https://github.com/animate-css/animate.css/blob/main/source/attention_seekers/shakeX.css) |
| 생김새 | 왼쪽 shakeX: 10%마다 ±10px 좌우 떨림. 오른쪽 headShake: -6px/rotateY -9° → 5 → -3 → 2 → 0 으로 50% 안에 감쇠 |
| 상태 | 클릭할 때마다 재생(오류 상황 흉내) / 버튼용으로는 ~400ms 로 줄이길 권장(추정) |
| 모션 | 오류(클릭으로 재생) → translateX ±10px 반복 / 감쇠하는 고개 젓기 |
| 타이밍 | `1s (animate.css 기본), headShake ease-in-out — 버튼엔 ~400ms 권장(추정)` (추정) |
| 느낌 | 단호함 · 오해 없음 |
| 용도 | 로그인 실패 · 잘못된 입력 |

```html
<div class="G-36" data-behavior="replay"><button type="button" class="G-36-b G-36-x" data-replay>흔들기</button><button type="button" class="G-36-b G-36-h" data-replay>고개 젓기</button></div>
```

```css
.G-36 { display: flex; gap: var(--space-3); }
.G-36-b { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-36-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-36-b .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-36-x.is-play { animation: G-36-shakeX 1s; }
.G-36-h.is-play { animation: G-36-headShake 1s ease-in-out; }
@keyframes G-36-shakeX { 0% { box-shadow: inset 0 0 0 2px var(--fg-1); } from, to { transform: translate3d(0, 0, 0); } 10%, 30%, 50%, 70%, 90% { transform: translate3d(-10px, 0, 0); } 20%, 40%, 60%, 80% { transform: translate3d(10px, 0, 0); } }
@keyframes G-36-headShake { 0% { transform: translateX(0); box-shadow: inset 0 0 0 2px var(--fg-1); } 6.5% { transform: translateX(-6px) rotateY(-9deg); } 18.5% { transform: translateX(5px) rotateY(7deg); } 31.5% { transform: translateX(-3px) rotateY(-5deg); } 43.5% { transform: translateX(2px) rotateY(3deg); } 50% { transform: translateX(0); } }
```

```js
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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

### G-37 스프링 체크 팝

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — StatusButton (Animate UI 동일 패턴)](https://github.com/codse/animata/blob/main/animata/button/status-button.tsx) |
| 생김새 | 라벨이 "보냄"으로 바뀐 뒤 옆에 체크가 0 에서 튀어나온다 |
| 상태 | 클릭 → 성공 2초 → 복귀 |
| 모션 | 성공 → 체크 scale 0→1 (라벨 교체 75ms 뒤) |
| 타이밍 | `Motion type:"spring" 기본값 근사(stiffness 100, damping 10, mass 1 → 1351ms linear()), delay 75ms` (추정) |
| 느낌 | 명랑함 |
| 용도 | 전송 완료 · 저장 완료 |

```html
<button type="button" class="G-37" data-behavior="sequence" data-steps="is-done:2000"><span class="G-37-a">보내기</span><span class="G-37-b" aria-hidden="true">보냄<span class="G-37-ck"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></span></span></button>
```

```css
.G-37 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-37:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-37 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-37 { width: 112px; }
.G-37-b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-1); opacity: 0; }
.G-37.is-done .G-37-a { opacity: 0; }
.G-37.is-done .G-37-b { opacity: 1; }
.G-37-ck { display: grid; transform: scale(0); }
.G-37 .G-37-ck .ic { width: 16px; height: 16px; }
.G-37.is-done .G-37-ck { transform: scale(1); transition: transform 1351ms linear(0, 0.131 4.167%, 0.41 8.333%, 0.709 12.5%, 0.947 16.667%, 1.096 20.833%, 1.157 25%, 1.155 29.167%, 1.117 33.333%, 1.068 37.5%, 1.024 41.667%, 0.993 45.833%, 0.977 50%, 0.974 54.167%, 0.978 58.333%, 0.985 62.5%, 0.993 66.667%, 0.999 70.833%, 1.003 75%, 1.004 79.167%, 1.004 83.333%, 1.003 87.5%, 1.002 91.667%, 1.001 95.833%, 1) 75ms; }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

**파괴적·홀드 확인**

### G-38 길게 눌러 삭제 (clip-path 채움)

| 항목 | 내용 |
|---|---|
| 출처 | [Emil Kowalski — Building a hold-to-delete component](https://emilkowal.ski/ui/building-a-hold-to-delete-component) |
| 생김새 | 같은 라벨을 복제한 오버레이가 clip-path 로 왼쪽→오른쪽 채워진다. 원본 오버레이 빨강 → 반전(var(--fg-1)) |
| 상태 | 누르는 동안 2초에 걸쳐 채움 → 끝까지 누르면 확정 / 중간에 떼면 200ms 만에 되감김 / 누름 0.97 |
| 모션 | 길게 누르기 → clip-path inset(0 100% 0 0)→inset(0) / 떼면 역방향 / scale 0.97 |
| 타이밍 | `채움 2s linear, 되감기 200ms ease-out, 누름 160ms ease-out` |
| 느낌 | 신중함 · 안전함 |
| 용도 | 삭제 · 계정 해지 |

```html
<button type="button" class="G-38" data-behavior="hold" data-hold="2000"><span class="G-38-t"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg>길게 눌러 삭제</span><span class="G-38-ov" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 7h16"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M6 7l1 13h10l1-13"/><path d="M9 7V4h6v3"/></svg>길게 눌러 삭제</span></button>
```

```css
.G-38 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-38:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-38 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-38 { overflow: hidden; background: color-mix(in srgb, var(--fg-1) 8%, transparent); user-select: none; -webkit-user-select: none; transition: transform 160ms ease-out; }
.G-38:active { transform: scale(0.97); }
.G-38-t, .G-38-ov { display: inline-flex; align-items: center; gap: var(--space-2); }
.G-38-ov { position: absolute; inset: 0; justify-content: center; color: var(--bg-1); background: var(--fg-1); clip-path: inset(0 100% 0 0); transition: clip-path 200ms ease-out; }
.G-38.is-holding .G-38-ov { clip-path: inset(0); transition: clip-path 2s linear; }
.G-38.is-done .G-38-ov { clip-path: inset(0); transition: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="hold"]:not([data-hold-bound])').forEach(hold);
```

### G-39 누른 시간만큼 차는 진행 배경

| 항목 | 내용 |
|---|---|
| 출처 | [Motion — React hold to confirm (원칙: Rauno)](https://motion.dev/examples/react-hold-to-confirm) |
| 생김새 | useMotionValue progress 를 animate 로 올리고 useTransform 으로 배경 폭 0%→100% 에 매핑. Rauno: 파괴적 동작은 제스처가 끝날 때 확정해야 한다(https://rauno.me/craft/interaction-design) |
| 상태 | 누르는 동안 진행 / 떼면 되돌아감 / 끝까지 누르면 확정(데모의 hold 동작은 시간 도달 시 확정 — 원칙과 다름) |
| 모션 | 길게 누르기 → progress 0→1 → 배경 width 0%→100% |
| 타이밍 | `정확한 값은 유료(Motion+) — 홀드 1500ms linear, 되감기 300ms ease-out 추정` (추정) |
| 느낌 | 통제감 |
| 용도 | 확인이 필요한 액션 · 전송 확정 |

```html
<button type="button" class="G-39" data-behavior="hold" data-hold="1500"><span class="G-39-fill" aria-hidden="true"></span><span class="G-39-t">길게 눌러 확인</span><span class="G-39-ok" aria-hidden="true">확인됨</span></button>
```

```css
.G-39 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-39:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-39 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-39 { isolation: isolate; overflow: hidden; min-width: calc(var(--space-11) + var(--space-4)); user-select: none; -webkit-user-select: none; }
.G-39-fill { position: absolute; top: 0; bottom: 0; left: 0; z-index: -1; width: 0%; background: color-mix(in srgb, var(--fg-1) 18%, transparent); transition: width 300ms ease-out, background-color 150ms; }
.G-39.is-holding .G-39-fill { width: 100%; transition: width 1500ms linear; }
.G-39.is-done .G-39-fill { width: 100%; background: var(--fg-1); transition: none; }
.G-39-ok { position: absolute; inset: 0; display: grid; place-items: center; color: var(--bg-1); opacity: 0; }
.G-39.is-done .G-39-t { opacity: 0; }
.G-39.is-done .G-39-ok { opacity: 1; }
```

```js
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
document.querySelectorAll('[data-behavior~="hold"]:not([data-hold-bound])').forEach(hold);
```

### G-40 휴지통 뚜껑 열림

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse.io — vinodjangid07 (tame-cobra-18)](https://github.com/uiverse-io/galaxy/blob/main/Buttons/vinodjangid07_tame-cobra-18.html) |
| 생김새 | 원형 휴지통 아이콘 버튼. 뚜껑이 오른쪽 끝을 축으로 45° 열린다. 원본 빨강 버튼 → 호버 순수 빨강(rgb 255,0,0) |
| 상태 | 호버/포커스: 뚜껑 rotate(45deg) + 배경 진해짐 / 누름 scale(0.9) |
| 모션 | 호버·누름 → 뚜껑 rotate 0→45deg(origin right), 배경색 / scale 0.9 |
| 타이밍 | `transition-duration 0.3s` |
| 느낌 | 장난스러운 경고 |
| 용도 | 삭제 아이콘 · 목록 항목 제거 |

```html
<button type="button" class="G-40" aria-label="삭제"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="lid" d="M4 7h16M9 7V4h6v3"/><path d="M6 7l1 13h10l1-13M10 11v6M14 11v6"/></svg></button>
```

```css
.G-40 { display: grid; place-items: center; width: 50px; height: 50px; padding: 0; color: var(--bg-1); background: var(--fg-3); border: 0; border-radius: var(--radius-pill); cursor: pointer; transition-duration: 0.3s; }
.G-40 .ic { width: var(--space-5); height: var(--space-5); overflow: visible; }
.G-40 .lid { transform-box: fill-box; transform-origin: right; transition-duration: 0.3s; }
.G-40:hover, .G-40:focus-visible { background: var(--fg-1); }
.G-40:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-40:hover .lid, .G-40:focus-visible .lid { transform: rotate(45deg); }
.G-40:active { transform: scale(0.9); }
```

**토글·좋아요·팔로우**

### G-41 트위터 하트 버스트

| 항목 | 내용 |
|---|---|
| 출처 | [CSS-Tricks — Recreating the Twitter heart animation](https://css-tricks.com/recreating-the-twitter-heart-animation/) |
| 생김새 | 하트가 퍼지는 원 안에서 나타나고 7×2개의 점이 흩어진다. 원본 링 #e2264d→#cc8ef5, 점 다색 → 흑백 토큰 |
| 상태 | 좋아요 켤 때만 1초 재생 / 끄면 즉시 빈 하트 |
| 모션 | 클릭(켜기) → 하트 font-size 0(17.5%까지)→원래 크기 / 링 scale 0→1(15%), border-width →0(30%) / 점은 25% 에 나타나 반경 ×1.25 로 퍼지며 사라짐 |
| 타이밍 | `전체 1s, 하트 cubic-bezier(0.17, 0.89, 0.32, 1.49), 링·점 cubic-bezier(0.21, 0.61, 0.35, 1)` |
| 느낌 | 기쁨 · 통통 튐 |
| 용도 | 좋아요 · 찜하기 |

```html
<button type="button" class="G-41" data-behavior="toggle replay" data-toggle data-replay aria-pressed="false" aria-label="좋아요"><span class="G-41-ring" aria-hidden="true"></span><span class="G-41-p" aria-hidden="true"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i><i style="--i:6"></i></span><span class="G-41-h"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-9-9C1.8 7.8 3.8 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.2 0 5.2 2.8 4 6-2 4.6-9 9-9 9z"/></svg></span></button>
```

```css
.G-41 { position: relative; display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-3); background: none; border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.G-41:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-41-h { position: relative; display: grid; place-items: center; font-size: var(--text-32); }
.G-41-h .ic { width: 1em; height: 1em; }
.G-41.is-on .G-41-h { color: var(--fg-1); }
.G-41.is-on .G-41-h .ic { fill: currentColor; }
.G-41.is-on.is-play .G-41-h { animation: G-41-heart 1s cubic-bezier(0.17, 0.89, 0.32, 1.49); }
@keyframes G-41-heart { 0%, 17.5% { font-size: 0; } }
.G-41-ring { position: absolute; inset: 0; margin: auto; width: 72px; height: 72px; box-sizing: border-box; border: 36px solid var(--fg-1); border-radius: var(--radius-pill); transform: scale(0); pointer-events: none; }
.G-41.is-on.is-play .G-41-ring { animation: G-41-bubble 1s cubic-bezier(0.21, 0.61, 0.35, 1); }
@keyframes G-41-bubble { 15% { transform: scale(1); border-color: var(--fg-3); border-width: 36px; } 30%, 100% { transform: scale(1); border-color: var(--fg-3); border-width: 0; } }
.G-41-p i { position: absolute; top: 50%; left: 50%; width: 0; height: 0; transform: rotate(calc(var(--i) * 360deg / 7)); pointer-events: none; }
.G-41-p i::before, .G-41-p i::after { content: ""; position: absolute; width: 6px; height: 6px; margin: -3px; border-radius: var(--radius-pill); opacity: 0; }
.G-41-p i::before { background: var(--fg-1); }
.G-41-p i::after { background: var(--fg-3); }
.G-41.is-on.is-play .G-41-p i::before { animation: G-41-pa 1s cubic-bezier(0.21, 0.61, 0.35, 1); }
.G-41.is-on.is-play .G-41-p i::after { animation: G-41-pb 1s cubic-bezier(0.21, 0.61, 0.35, 1); }
@keyframes G-41-pa { 0%, 24.9% { opacity: 0; } 25% { opacity: 1; transform: translate(-5px, -36px) scale(1); } 100% { opacity: 1; transform: translate(-6px, -45px) scale(0); } }
@keyframes G-41-pb { 0%, 24.9% { opacity: 0; } 25% { opacity: 1; transform: translate(5px, -32px) scale(1); } 100% { opacity: 1; transform: translate(6px, -40px) scale(0); } }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);

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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

### G-42 토글 때 파티클 팝

| 항목 | 내용 |
|---|---|
| 출처 | [Animate UI — IconButton + Particles](https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/effects/particles/index.tsx) |
| 생김새 | 별 아이콘에서 점 6개가 반경 30px 원 위로 흩어진다(x=cos(a)·30, y=sin(a)·30). 누를 때마다(key 갱신) 다시 재생 |
| 상태 | 클릭마다 파티클 재생 / 켜짐이면 별 채움 |
| 모션 | 클릭 → 점 이동 0→30px, scale [0,1,0], opacity [0,1,0] |
| 타이밍 | `0.8s easeOut(cubic-bezier(0, 0, 0.58, 1)), 점마다 0.05s 스태거` |
| 느낌 | 즐거움 · 가벼움 |
| 용도 | 즐겨찾기 · 반응 버튼 |

```html
<button type="button" class="G-42" data-behavior="toggle replay" data-toggle data-replay aria-pressed="false" aria-label="별표"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/></svg><span class="G-42-p" aria-hidden="true"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i></span></button>
```

```css
.G-42 { position: relative; display: grid; place-items: center; width: var(--space-7); height: var(--space-7); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-pill); cursor: pointer; }
.G-42:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-42 .ic { width: var(--space-5); height: var(--space-5); }
.G-42.is-on .ic { fill: currentColor; }
.G-42-p i { position: absolute; top: 50%; left: 50%; width: 6px; height: 6px; margin: -3px; border-radius: var(--radius-pill); background: var(--fg-1); opacity: 0; scale: 0; pointer-events: none; }
.G-42.is-play .G-42-p i { animation: G-42-move 0.8s cubic-bezier(0, 0, 0.58, 1) calc(var(--i) * 50ms) both, G-42-pop 0.8s cubic-bezier(0, 0, 0.58, 1) calc(var(--i) * 50ms) both; }
@keyframes G-42-move { from { translate: 0 0; } to { translate: calc(cos(var(--i) * 60deg) * 30px) calc(sin(var(--i) * 60deg) * 30px); } }
@keyframes G-42-pop { 0% { scale: 0; opacity: 0; } 50% { scale: 1; opacity: 1; } 100% { scale: 0; opacity: 0; } }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);

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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

### G-43 두근두근 호버

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse.io — LilaRest (afraid-fox-80)](https://github.com/uiverse-io/galaxy/blob/main/Buttons/LilaRest_afraid-fox-80.html) |
| 생김새 | 뉴모피즘 하트 버튼. 호버하면 버튼이 튕기듯 1.05배 되고 하트가 심장 박동처럼 두 번씩 뛴다. 그림자 값은 토큰으로 근사 |
| 상태 | 호버/포커스 동안 박동 무한 반복 |
| 모션 | 호버 → 버튼 scale 1.05 / 하트 1→1.15(15%)→1(30%)→1.15(45%)→1(60%) |
| 타이밍 | `버튼 transform 400ms cubic-bezier(0.68, -0.55, 0.27, 2.5), 박동 1.2s infinite` |
| 느낌 | 살아있음 · 귀여움 |
| 용도 | 좋아요 · 후원 버튼 |

```html
<button type="button" class="G-43" aria-label="좋아요"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-9-9C1.8 7.8 3.8 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.2 0 5.2 2.8 4 6-2 4.6-9 9-9 9z"/></svg></button>
```

```css
.G-43 { display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: var(--bg-2); border: 0; border-radius: var(--radius-md); box-shadow: 6px 6px 12px color-mix(in srgb, var(--fg-1) 15%, transparent), -6px -6px 12px var(--bg-1); cursor: pointer; transition: transform 400ms cubic-bezier(0.68, -0.55, 0.27, 2.5); }
.G-43:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-43 .ic { width: var(--space-5); height: var(--space-5); }
.G-43:hover, .G-43:focus-visible { transform: scale(1.05); }
.G-43:hover .ic, .G-43:focus-visible .ic { fill: currentColor; animation: G-43-beat 1.2s infinite; }
@keyframes G-43-beat { 0%, 30%, 60% { transform: scale(1); } 15%, 45% { transform: scale(1.15); } }
```

### G-44 구독 → 구독 중 교체

| 항목 | 내용 |
|---|---|
| 출처 | [Magic UI — AnimatedSubscribeButton](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-subscribe-button.tsx) |
| 생김새 | "구독"이 오른쪽으로 빠지고 "구독 중"이 위에서 떨어진다(AnimatePresence mode wait). Animata FollowButton 은 y±20, x±20, scale 0.8/1.2 변형을 제공 |
| 상태 | 클릭으로 켜고 끔 / 버튼 배경은 반전 채움 ↔ 아웃라인으로 크로스페이드 |
| 모션 | 클릭 → 기존 라벨 x 0→+50 퇴장, 새 라벨 y -50→0 등장, 배경 교체 |
| 타이밍 | `퇴장 0.1s → 등장은 기본 스프링(y: Motion 기본 500/25 근사, 추정), 배경 크로스페이드 300ms 추정` (추정) |
| 느낌 | 자신감 · 빠름 |
| 용도 | 구독 · 팔로우 |

```html
<button type="button" class="G-44" data-behavior="toggle" data-toggle aria-pressed="false"><span class="G-44-a">구독</span><span class="G-44-b" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg>구독 중</span></button>
```

```css
.G-44 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-44:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-44 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-44 { width: 120px; overflow: hidden; transition: background-color 300ms, color 300ms, box-shadow 300ms; }
.G-44.is-on { color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-44 .ic { width: 16px; height: 16px; }
.G-44-a { transition: transform 618ms linear(0, 0.137 4.167%, 0.412 8.333%, 0.7 12.5%, 0.919 16.667%, 1.055 20.833%, 1.112 25%, 1.115 29.167%, 1.09 33.333%, 1.055 37.5%, 1.023 41.667%, 1.001 45.833%, 0.99 50%, 0.986 54.167%, 0.987 58.333%, 0.991 62.5%, 0.995 66.667%, 0.999 70.833%, 1.001 75%, 1.002 79.167%, 1.002 83.333%, 1.001 87.5%, 1.001 91.667%, 1 95.833%, 1) 0.1s, opacity 0.1s 0.1s; }
.G-44.is-on .G-44-a { transform: translateX(50px); opacity: 0; transition: transform 0.1s, opacity 0.1s; }
.G-44-b { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-1); opacity: 0; transform: translateY(-50px); transition: transform 0.1s, opacity 0.1s; }
.G-44.is-on .G-44-b { opacity: 1; transform: translateY(0); transition: transform 618ms linear(0, 0.137 4.167%, 0.412 8.333%, 0.7 12.5%, 0.919 16.667%, 1.055 20.833%, 1.112 25%, 1.115 29.167%, 1.09 33.333%, 1.055 37.5%, 1.023 41.667%, 1.001 45.833%, 0.99 50%, 0.986 54.167%, 0.987 58.333%, 0.991 62.5%, 0.995 66.667%, 0.999 70.833%, 1.001 75%, 1.002 79.167%, 1.002 83.333%, 1.001 87.5%, 1.001 91.667%, 1 95.833%, 1) 0.1s, opacity 0.1s 0.1s; }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

### G-45 Lottie 구간 재생 좋아요

| 항목 | 내용 |
|---|---|
| 출처 | [CSS-Tricks — Animating with Lottie](https://css-tricks.com/?p=332224) |
| 생김새 | 디자이너가 After Effects 로 만든 하트 애니메이션을 구간만 재생: 좋아요 playSegments([0,15]), 취소 [15,30]. Lottie 는 쓸 수 없어 CSS 키프레임으로 같은 구간 구조만 흉내 |
| 상태 | 로드: goToAndStop(0 또는 15, true) / 켜기: 0→15 프레임 / 끄기: 15→30 프레임 |
| 모션 | 클릭 → 켜기: 눌렸다 커지며 채움 + 점선 링 / 끄기: 살짝 기울며 빠짐 |
| 타이밍 | `15프레임 ≈ 500ms (30fps 가정, 추정)` (추정) |
| 느낌 | 일러스트 · 풍성함 |
| 용도 | 브랜드 좋아요 · 마스코트 버튼 |

```html
<button type="button" class="G-45" data-behavior="toggle replay" data-toggle data-replay aria-pressed="false" aria-label="좋아요"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20s-7-4.4-9-9C1.8 7.8 3.8 5 7 5c2 0 3.5 1.1 5 3 1.5-1.9 3-3 5-3 3.2 0 5.2 2.8 4 6-2 4.6-9 9-9 9z"/></svg><span class="G-45-burst" aria-hidden="true"></span></button>
```

```css
.G-45 { position: relative; display: grid; place-items: center; width: var(--space-8); height: var(--space-8); padding: 0; color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.G-45:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-45 .ic { width: 28px; height: 28px; }
.G-45.is-on .ic { fill: currentColor; }
.G-45.is-on.is-play .ic { animation: G-45-like 500ms linear both; }
.G-45.is-play:not(.is-on) .ic { animation: G-45-unlike 500ms linear both; }
.G-45-burst { position: absolute; inset: 0; border: 2px dotted var(--fg-3); border-radius: var(--radius-pill); opacity: 0; pointer-events: none; }
.G-45.is-on.is-play .G-45-burst { animation: G-45-burst 500ms ease-out; }
@keyframes G-45-like { 0% { transform: scale(1); } 30% { transform: scale(0.6); } 60% { transform: scale(1.25); } 100% { transform: scale(1); } }
@keyframes G-45-unlike { 0% { transform: scale(1); } 40% { transform: scale(0.8) rotate(-8deg); } 100% { transform: scale(1); } }
@keyframes G-45-burst { 0% { opacity: 0; transform: scale(0.4); } 40% { opacity: 1; } 100% { opacity: 0; transform: scale(1.3); } }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);

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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

**복사**

### G-46 블러·스케일 아이콘 교체

| 항목 | 내용 |
|---|---|
| 출처 | [Animate UI — CopyButton](https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/components/buttons/copy/index.tsx) |
| 생김새 | 복사 아이콘이 흐려지며 0 으로 줄고 체크가 흐림에서 선명하게 1 로 커진다 |
| 상태 | 클릭 → 체크 3000ms 유지 → 복사 아이콘으로 복귀 |
| 모션 | 클릭 → scale 0↔1, opacity 0.4↔1, blur 4px↔0 |
| 타이밍 | `0.25s (이징 미기재 → ease-out 추정), 3000ms 뒤 복귀` (추정) |
| 느낌 | 부드러움 · 모던 |
| 용도 | 코드 블록 복사 · 공유 링크 |

```html
<button type="button" class="G-46" data-behavior="sequence" data-steps="is-done:3000" aria-label="복사"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></button>
```

```css
.G-46 { display: grid; place-items: center; width: calc(var(--space-7) - var(--space-2)); height: calc(var(--space-7) - var(--space-2)); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 0; border-radius: var(--radius-md); box-shadow: inset 0 0 0 1px var(--border-strong); cursor: pointer; }
.G-46:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-46 .ic { grid-area: 1 / 1; width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); transition: transform 0.25s ease-out, opacity 0.25s ease-out, filter 0.25s ease-out; }
.G-46 .ic + .ic, .G-46.is-done .ic:first-child { transform: scale(0); opacity: 0.4; filter: blur(4px); }
.G-46.is-done .ic + .ic { transform: scale(1); opacity: 1; filter: blur(0); }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-47 즉시 교체 (기준선)

| 항목 | 내용 |
|---|---|
| 출처 | [shadcn/ui docs — CopyButton](https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/copy-button.tsx) |
| 생김새 | 복사 아이콘 → 체크 아이콘. 애니메이션 없이 바로 바뀐다. 비교용 기준선 |
| 상태 | 클릭 → 체크 2000ms(setTimeout) → 복귀 |
| 모션 | 클릭 → 아이콘 즉시 교체 |
| 타이밍 | `전환 없음, 2000ms 뒤 복귀` |
| 느낌 | 평범함 · 믿음직함 |
| 용도 | 문서 코드 블록 · 개발 도구 |

```html
<button type="button" class="G-47" data-behavior="sequence" data-steps="is-done:2000" aria-label="복사"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></button>
```

```css
.G-47 { display: grid; place-items: center; width: calc(var(--space-7) - var(--space-2)); height: calc(var(--space-7) - var(--space-2)); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 0; border-radius: var(--radius-md); box-shadow: inset 0 0 0 1px var(--border-strong); cursor: pointer; }
.G-47:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-47 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); }
.G-47 .ic + .ic, .G-47.is-done .ic:first-child { display: none; }
.G-47.is-done .ic + .ic { display: block; }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-48 CSS 크로스페이드 + 모션 축소 대응

| 항목 | 내용 |
|---|---|
| 출처 | [shadcn.io — Copy Button](https://www.shadcn.io/button/copy-button) |
| 생김새 | 두 아이콘을 겹쳐 두고 data-copied 로 크로스페이드 + 스케일. 모션 축소 환경에선 스케일을 빼고 페이드만. Motion 유료 버전은 pathLength 체크 그리기 추가(https://motion.dev/examples/react-copy-button) |
| 상태 | 클릭 → 체크 3000ms(resetDelay) → 복귀 / prefers-reduced-motion: 페이드만 |
| 모션 | 클릭 → opacity 크로스페이드 + scale 0.5↔1 |
| 타이밍 | `opacity .2s, transform .2s (추정), 3000ms 유지` (추정) |
| 느낌 | 세련됨 · 접근성 |
| 용도 | 복사 버튼 기본형 · 디자인 시스템 |

```html
<button type="button" class="G-48" data-behavior="sequence" data-steps="is-done:3000" aria-label="복사"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></button>
```

```css
.G-48 { display: grid; place-items: center; width: calc(var(--space-7) - var(--space-2)); height: calc(var(--space-7) - var(--space-2)); padding: 0; color: var(--fg-1); background: var(--bg-1); border: 0; border-radius: var(--radius-md); box-shadow: inset 0 0 0 1px var(--border-strong); cursor: pointer; }
.G-48:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-48 .ic { grid-area: 1 / 1; width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); transition: opacity 0.2s, transform 0.2s; }
.G-48 .ic + .ic, .G-48.is-done .ic:first-child { opacity: 0; transform: scale(0.5); }
.G-48.is-done .ic + .ic { opacity: 1; transform: scale(1); }
@media (prefers-reduced-motion: reduce) { .G-48 .ic, .G-48 .ic + .ic, .G-48.is-done .ic:first-child { transform: none; } }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-49 "복사됨" 툴팁 팝

| 항목 | 내용 |
|---|---|
| 출처 | [Emil Kowalski — 7 practical animation tips](https://emilkowal.ski/ui/7-practical-animation-tips) |
| 생김새 | 버튼 위 작은 툴팁이 트리거 쪽(아래 가운데)을 기준점으로 0.97 에서 커지며 나타난다 |
| 상태 | 클릭 → 툴팁 1.5초 / 이미 툴팁 하나가 열린 뒤 이어지는 툴팁은 0ms 로 즉시(데모 생략) |
| 모션 | 클릭(표시) → scale 0.97→1 + opacity 0→1, transform-origin 트리거 쪽 |
| 타이밍 | `125ms ease-out (연속 툴팁 0ms)` |
| 느낌 | 즉각적 · 가벼움 |
| 용도 | 복사 확인 · 아이콘 툴팁 |

```html
<button type="button" class="G-49" data-behavior="sequence" data-steps="is-done:1500"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg>링크 복사</button>
```

```css
.G-49 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-49:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-49 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-49::after { content: "복사됨"; position: absolute; bottom: calc(100% + var(--space-2)); left: 50%; translate: -50% 0; padding: var(--space-1) var(--space-2); font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); color: var(--bg-1); background: var(--fg-1); border-radius: var(--radius-sm); white-space: nowrap; pointer-events: none; opacity: 0; transform: scale(0.97); transform-origin: bottom center; transition: transform 125ms ease-out, opacity 125ms ease-out; }
.G-49.is-done::after { opacity: 1; transform: scale(1); }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

**FAB**

### G-50 스피드 다이얼 (+→× + 순차 액션)

| 항목 | 내용 |
|---|---|
| 출처 | [MUI — SpeedDial / SpeedDialIcon / SpeedDialAction](https://github.com/mui/material-ui/blob/master/packages/mui-material/src/SpeedDialIcon/SpeedDialIcon.js) |
| 생김새 | 원형 FAB 위로 작은 액션 버튼이 하나씩 펼쳐진다. + 아이콘은 45° 돌아 ×. (openIcon 을 쓰면 -45°→0 크로스페이드.) Motion 예제는 스프링 + 툴팁 라벨 추가(https://motion.dev/examples/react-floating-action-button) |
| 상태 | 클릭으로 열고 닫음 / 바깥 클릭·Esc 로 닫힘 / 열 때 FAB 에 가까운 것부터, 닫을 때 역순 |
| 모션 | 클릭 → 아이콘 rotate 0→45deg / 액션 scale 0→1 + opacity, 30ms×index 스태거 |
| 타이밍 | `아이콘 250ms, 액션 transform 200ms · opacity 0.8s, delay 30ms×index(닫을 때 역순), cubic-bezier(0.4, 0, 0.2, 1)` |
| 느낌 | 질서정연 · 또렷함 |
| 용도 | 모바일 빠른 작업 · 에디터 추가 버튼 |

```html
<div class="G-50" data-behavior="menu"><div class="G-50-acts"><button type="button" class="G-50-a" style="--i:2" aria-label="복사"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg></button><button type="button" class="G-50-a" style="--i:1" aria-label="공유"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg></button><button type="button" class="G-50-a" style="--i:0" aria-label="저장"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg></button></div><button type="button" class="G-50-fab" data-menu-trigger aria-label="빠른 작업"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg></button></div>
```

```css
.G-50 { display: flex; flex-direction: column; align-items: center; gap: var(--space-4); }
.G-50-acts { display: flex; flex-direction: column; align-items: center; gap: var(--space-2); }
.G-50-a { display: grid; place-items: center; width: 40px; height: 40px; padding: 0; color: var(--fg-1); background: var(--bg-1); border: 0; border-radius: var(--radius-pill); box-shadow: var(--shadow-md); cursor: pointer; opacity: 0; transform: scale(0); visibility: hidden; pointer-events: none; transition: transform 200ms cubic-bezier(0.4, 0, 0.2, 1), opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s; transition-delay: calc((2 - var(--i)) * 30ms), calc((2 - var(--i)) * 30ms), calc((2 - var(--i)) * 30ms + 0.8s); }
.G-50-a .ic { width: var(--space-5); height: var(--space-5); }
.G-50.is-open .G-50-a { opacity: 1; transform: scale(1); visibility: visible; pointer-events: auto; transition-delay: calc(var(--i) * 30ms), calc(var(--i) * 30ms), 0s; }
.G-50-a:focus-visible, .G-50-fab:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-50-fab { display: grid; place-items: center; width: 56px; height: 56px; padding: 0; color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--radius-pill); box-shadow: var(--shadow-lg); cursor: pointer; }
.G-50-fab .ic { width: var(--space-5); height: var(--space-5); transition: transform 250ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-50.is-open .G-50-fab .ic { transform: rotate(45deg); }
```

```js
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
document.querySelectorAll('[data-behavior~="menu"]:not([data-menu-bound])').forEach(menu);
```

### G-51 스크롤하면 접히는 확장 FAB

| 항목 | 내용 |
|---|---|
| 출처 | [Material Components Android — extended FAB change-size motion spec](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/floatingactionbutton/res/animator/mtrl_extended_fab_change_size_collapse_motion_spec.xml) |
| 생김새 | 아이콘+라벨 알약 → 아이콘만 있는 56px 버튼. 데모는 목록을 옆으로 스크롤(휠·드래그)하면 접히고 처음으로 돌아오면 펼쳐진다 |
| 상태 | 스크롤 시작점에서 벗어나면 접힘 / 처음으로 돌아오면 펼침 |
| 모션 | 스크롤 → 접기 shrink(): width/height/padding + 라벨 사라짐 / 펼치기: 라벨 나타남 |
| 타이밍 | `크기 200ms fast_out_slow_in(≈cubic-bezier(0.4, 0, 0.2, 1)), 접을 때 라벨 33ms(16ms 시작), 펼칠 때 라벨 83ms(117ms 시작)` |
| 느낌 | 효율적 · 차분함 |
| 용도 | 목록 화면 FAB · 메일 작성 |

```html
<div class="G-51" data-behavior="scroller" data-drag><div class="G-51-sc" data-scroller tabindex="0" aria-label="옆으로 스크롤되는 목록"><div class="G-51-row"><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span><span>6</span><span>7</span><span>8</span></div></div><button type="button" class="G-51-fab"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14"/><path d="M5 12h14"/></svg><span class="G-51-l">새로 만들기</span></button></div>
```

```css
.G-51 { position: absolute; inset: 0; }
.G-51-sc { height: 100%; overflow-x: auto; scrollbar-width: none; cursor: grab; }
.G-51-sc::-webkit-scrollbar { display: none; }
.G-51-sc:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.G-51-row { display: flex; gap: var(--space-2); width: max-content; padding: var(--space-4); }
.G-51-row span { display: grid; place-items: center; width: 96px; height: 96px; font-size: var(--text-24); line-height: var(--lh-24); font-weight: var(--weight-bold); color: var(--bg-1); background: var(--fg-3); border-radius: var(--radius-md); user-select: none; }
.G-51-fab { position: absolute; right: var(--space-4); bottom: var(--space-4); box-sizing: border-box; display: flex; align-items: center; gap: var(--space-3); width: 152px; height: 56px; padding: 0 var(--space-4); overflow: hidden; font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; color: var(--bg-1); background: var(--fg-1); border: 0; border-radius: var(--space-4); box-shadow: var(--shadow-lg); cursor: pointer; transition: width 200ms cubic-bezier(0.4, 0, 0.2, 1), height 200ms cubic-bezier(0.4, 0, 0.2, 1), padding 200ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-51-fab:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-51-fab .ic { width: var(--space-5); height: var(--space-5); flex: none; }
.G-51-l { opacity: 1; transition: opacity 83ms linear 117ms; }
.G-51:not(.is-start) .G-51-fab { width: 56px; padding-right: 0; }
.G-51:not(.is-start) .G-51-l { opacity: 0; transition: opacity 33ms linear 16ms; }
```

```js
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
document.querySelectorAll('[data-behavior~="scroller"]:not([data-scroller-bound])').forEach(scroller);
```

**스플릿·드롭다운 트리거**

### G-52 오버슈트로 뒤집히는 셰브론

| 항목 | 내용 |
|---|---|
| 출처 | [Material 3 Expressive — split button chevron rotation](https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/button/res/animator/m3_split_button_chevron_rotation.xml) |
| 생김새 | 스플릿 버튼의 뒤쪽 셰브론 조각. 열면 셰브론이 180° 뒤집히며 살짝 넘어갔다 돌아오고, 체크 상태에선 조각 모양도 둥글게 바뀐다. shadcn 아코디언도 rotate-180 200ms |
| 상태 | 셰브론 클릭으로 켜고 끔(aria-pressed) / 켜짐: 180° + 원형 조각 |
| 모션 | 클릭(열기) → rotation 0→180deg + 조각 모서리 변형 |
| 타이밍 | `200ms, overshoot interpolator (Android OvershootInterpolator tension 2.0 기본값 → linear(), 연구 노트의 cubic-bezier(.34,1.56,.64,1)도 추정치) / 모양 변형 200ms 추정` (추정) |
| 느낌 | 탄력 · 분명함 |
| 용도 | 스플릿 버튼 · 드롭다운 트리거 |

```html
<div class="G-52" data-behavior="toggle"><button type="button" class="G-52-main">저장</button><button type="button" class="G-52-chev" data-toggle aria-pressed="false" aria-label="저장 옵션"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button></div>
```

```css
.G-52 { display: flex; gap: 2px; }
.G-52-main { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-52-main:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-52-main .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-52-chev { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-52-chev:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-52-chev .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-52-main { border-radius: var(--radius-pill) var(--space-1) var(--space-1) var(--radius-pill); }
.G-52-chev { width: calc(var(--space-7) - var(--space-2)); padding: 0; border-radius: var(--space-1) var(--space-5) var(--space-5) var(--space-1); transition: border-radius 200ms; }
.G-52-chev .ic { transition: transform 200ms linear(0, 0.233 5%, 0.433 10%, 0.603 15%, 0.744 20%, 0.859 25%, 0.951 30%, 1.021 35%, 1.072 40%, 1.106 45%, 1.125 50%, 1.132 55%, 1.128 60%, 1.116 65%, 1.099 70%, 1.078 75%, 1.056 80%, 1.035 85%, 1.017 90%, 1.005 95%, 1); }
.G-52-chev.is-on { border-radius: var(--space-5); }
.G-52-chev.is-on .ic { transform: rotate(180deg); }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

### G-53 트리거 쪽에서 자라나는 메뉴

| 항목 | 내용 |
|---|---|
| 출처 | [shadcn/ui — DropdownMenu (tw-animate-css)](https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/dropdown-menu.tsx) |
| 생김새 | 메뉴가 트리거 쪽(Radix transform-origin 변수, 여기선 왼쪽 위) 기준으로 95% 에서 커지며 8px 위에서 내려온다 |
| 상태 | 클릭으로 열고 닫음 / 바깥 클릭·Esc 로 닫힘 / 닫을 땐 fade-out + zoom-out-95 (슬라이드 없음) |
| 모션 | 클릭 → fade-in-0 + zoom-in-95 + slide-in-from-top-2(8px) / 닫힘 역방향 |
| 타이밍 | `150ms ease (tw-animate 기본)` |
| 느낌 | 기민함 · 안정감 |
| 용도 | 더보기 메뉴 · 계정 메뉴 |

```html
<div class="G-53" data-behavior="menu"><button type="button" class="G-53-t" data-menu-trigger aria-haspopup="menu">옵션<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button><div class="G-53-m" role="menu"><button type="button" role="menuitem">이름 바꾸기</button><button type="button" role="menuitem">복제</button><button type="button" role="menuitem">삭제</button></div></div>
```

```css
.G-53 { position: relative; align-self: start; }
.G-53-t { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-53-t:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-53-t .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-53-t { height: 36px; gap: var(--space-1); padding: 0 var(--space-3); }
.G-53-m { position: absolute; top: calc(100% + 4px); left: 0; z-index: 1; display: grid; min-width: 160px; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-md); transform-origin: top left; opacity: 0; transform: scale(0.95); translate: 0 -8px; visibility: hidden; transition: opacity 150ms ease, transform 150ms ease, visibility 0s 150ms, translate 0s 150ms; }
.G-53.is-open .G-53-m { opacity: 1; transform: scale(1); translate: 0 0; visibility: visible; transition: opacity 150ms ease, transform 150ms ease, translate 150ms ease, visibility 0s; }
.G-53-m button { padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); text-align: left; color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; }
.G-53-m button:hover, .G-53-m button:focus-visible { background: color-mix(in srgb, var(--fg-1) 8%, transparent); outline: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="menu"]:not([data-menu-bound])').forEach(menu);
```

**세그먼트·탭**

### G-54 스프링 하이라이트 알약 + 패널 슬라이드

| 항목 | 내용 |
|---|---|
| 출처 | [Animate UI — Tabs](https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/animate/tabs/index.tsx) |
| 생김새 | 선택한 탭 뒤로 흰 알약이 스프링으로 미끄러지고, 아래 패널 줄이 -index×100% 로 이동한다. 비활성 패널은 blur(4px) |
| 상태 | 탭 클릭: 하이라이트·패널 이동 / 선택 탭 글자 진하게 |
| 모션 | 선택 → 하이라이트 x·폭 이동, 패널 translateX(-index×100%), 비활성 패널 blur 4px |
| 타이밍 | `하이라이트 spring stiffness 200, damping 25 (≈621ms) / 패널 spring 300/30 (≈540ms) / 블러 300ms ease-out 추정` (추정) |
| 느낌 | 유려함 · 프리미엄 |
| 용도 | 탭 · 설정 패널 |

```html
<div class="G-54" data-behavior="segmented"><div class="G-54-tabs" role="group" aria-label="탭"><span class="G-54-ind" aria-hidden="true"></span><button type="button" data-seg>개요</button><button type="button" data-seg>활동</button><button type="button" data-seg>설정</button></div><div class="G-54-view"><div class="G-54-panels"><p>개요 패널 내용</p><p>활동 패널 내용</p><p>설정 패널 내용</p></div></div></div>
```

```css
.G-54 { display: grid; gap: var(--space-3); width: 256px; }
.G-54-tabs { position: relative; display: flex; padding: var(--space-1); background: color-mix(in srgb, var(--fg-1) 6%, transparent); border-radius: var(--radius-md); isolation: isolate; }
.G-54-ind { position: absolute; top: var(--space-1); bottom: var(--space-1); left: 0; z-index: -1; width: var(--seg-w, 0px); transform: translateX(var(--seg-x, 0px)); background: var(--bg-1); border-radius: var(--radius-sm); box-shadow: var(--shadow-sm); }
.G-54:is(:hover, :focus-within) .G-54-ind { transition: transform 621ms linear(0, 0.056 4.167%, 0.175 8.333%, 0.32 12.5%, 0.462 16.667%, 0.589 20.833%, 0.694 25%, 0.78 29.167%, 0.846 33.333%, 0.896 37.5%, 0.931 41.667%, 0.957 45.833%, 0.975 50%, 0.986 54.167%, 0.994 58.333%, 0.998 62.5%, 1.001 66.667%, 1.002 70.833%, 1.002 75%, 1.002 79.167%, 1.002 83.333%, 1.002 87.5%, 1.001 91.667%, 1.001 95.833%, 1), width 621ms linear(0, 0.056 4.167%, 0.175 8.333%, 0.32 12.5%, 0.462 16.667%, 0.589 20.833%, 0.694 25%, 0.78 29.167%, 0.846 33.333%, 0.896 37.5%, 0.931 41.667%, 0.957 45.833%, 0.975 50%, 0.986 54.167%, 0.994 58.333%, 0.998 62.5%, 1.001 66.667%, 1.002 70.833%, 1.002 75%, 1.002 79.167%, 1.002 83.333%, 1.002 87.5%, 1.001 91.667%, 1.001 95.833%, 1); }
.G-54-tabs button { flex: 1; height: 32px; padding: 0; font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); color: var(--fg-3); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; }
.G-54-tabs button[aria-pressed="true"] { color: var(--fg-1); }
.G-54-tabs button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.G-54-view { overflow: hidden; background: var(--bg-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
.G-54-panels { display: flex; }
.G-54:is(:hover, :focus-within) .G-54-panels { transition: transform 540ms linear(0, 0.062 4.167%, 0.197 8.333%, 0.353 12.5%, 0.503 16.667%, 0.633 20.833%, 0.74 25%, 0.822 29.167%, 0.883 33.333%, 0.927 37.5%, 0.957 41.667%, 0.977 45.833%, 0.99 50%, 0.997 54.167%, 1.002 58.333%, 1.003 62.5%, 1.004 66.667%, 1.004 70.833%, 1.003 75%, 1.003 79.167%, 1.002 83.333%, 1.002 87.5%, 1.001 91.667%, 1.001 95.833%, 1); }
.G-54-panels p { flex: none; width: 100%; margin: 0; padding: var(--space-4); font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-2); filter: blur(4px); }
.G-54:is(:hover, :focus-within) .G-54-panels p { transition: filter 300ms ease-out; }
.G-54[data-index="1"] .G-54-panels { transform: translateX(-100%); }
.G-54[data-index="2"] .G-54-panels { transform: translateX(-200%); }
.G-54[data-index="0"] .G-54-panels p:nth-child(1), .G-54[data-index="1"] .G-54-panels p:nth-child(2), .G-54[data-index="2"] .G-54-panels p:nth-child(3) { filter: none; }
```

```js
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
document.querySelectorAll('[data-behavior~="segmented"]:not([data-segmented-bound])').forEach(segmented);
```

### G-55 clip-path 복제 탭

| 항목 | 내용 |
|---|---|
| 출처 | [Emil Kowalski — The magic of clip-path](https://emilkowal.ski/ui/the-magic-of-clip-path) |
| 생김새 | 강조 스타일로 칠한 탭 목록 복제본을 위에 겹치고 활성 탭 모양으로만 잘라 보여 준다. 그래서 글자색이 알약 가장자리에서 정확히 바뀐다 |
| 상태 | 탭 클릭: clip-path 가 offsetLeft/offsetWidth 로 계산한 위치로 이동 |
| 모션 | 선택 → clip-path inset(0 R% 0 L% round 17px) 이동 |
| 타이밍 | `출처에 시간 없음 — 0.25s ease-out 추정(리서치 범위 200–250ms)` (추정) |
| 느낌 | 정밀함 · 공들임 |
| 용도 | 세그먼트 컨트롤 · 필터 탭 |

```html
<div class="G-55" data-behavior="segmented"><div class="G-55-list" role="group" aria-label="보기"><button type="button" data-seg>결제</button><button type="button" data-seg>고객</button><button type="button" data-seg>주문</button></div><div class="G-55-dup" aria-hidden="true"><span>결제</span><span>고객</span><span>주문</span></div></div>
```

```css
.G-55 { position: relative; }
.G-55-list, .G-55-dup { display: flex; gap: var(--space-1); }
.G-55-list button, .G-55-dup span { display: grid; place-items: center; height: 34px; padding: 0 var(--space-4); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border-radius: 17px; }
.G-55-list button { color: var(--fg-2); background: none; border: 0; cursor: pointer; }
.G-55-list button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-55-dup { position: absolute; inset: 0; color: var(--bg-1); background: var(--fg-1); pointer-events: none; clip-path: inset(0 calc(100% - var(--seg-x, 0px) - var(--seg-w, 0px)) 0 var(--seg-x, 0px) round 17px); }
.G-55:is(:hover, :focus-within) .G-55-dup { transition: clip-path 0.25s ease-out; }
```

```js
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
document.querySelectorAll('[data-behavior~="segmented"]:not([data-segmented-bound])').forEach(segmented);
```

### G-56 공유 레이아웃 밑줄

| 항목 | 내용 |
|---|---|
| 출처 | [Motion — Layout animations (layoutId)](https://motion.dev/docs/react-layout-animations) |
| 생김새 | 선택된 탭 아래 밑줄이 다음 탭으로 이어서 미끄러진다(<motion.div layoutId="underline"/>). 도착하는 요소의 transition 을 쓴다 |
| 상태 | 탭 클릭: 밑줄 위치·폭 이동, 선택 탭 글자 진하게 |
| 모션 | 선택 → 밑줄 x·width 이동 |
| 타이밍 | `spring visualDuration 0.4, bounce 0.2 (→ stiffness 171.3, damping 20.94 ≈ 700ms linear())` |
| 느낌 | 자연스러움 · 연속적 |
| 용도 | 상단 탭 · 내비게이션 바 |

```html
<div class="G-56" data-behavior="segmented" role="group" aria-label="메뉴"><span class="G-56-line" aria-hidden="true"></span><button type="button" data-seg>홈</button><button type="button" data-seg>탐색</button><button type="button" data-seg>알림</button><button type="button" data-seg>프로필</button></div>
```

```css
.G-56 { position: relative; display: flex; gap: var(--space-1); border-bottom: 1px solid var(--border); }
.G-56 button { padding: var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); color: var(--fg-3); background: none; border: 0; cursor: pointer; }
.G-56 button[aria-pressed="true"] { color: var(--fg-1); }
.G-56 button:focus-visible { outline: 2px solid var(--fg-1); outline-offset: -2px; }
.G-56-line { position: absolute; bottom: -1px; left: 0; width: var(--seg-w, 0px); height: 2px; background: var(--fg-1); transform: translateX(var(--seg-x, 0px)); }
.G-56:is(:hover, :focus-within) .G-56-line { transition: transform 700ms linear(0, 0.06 4.167%, 0.196 8.333%, 0.355 12.5%, 0.51 16.667%, 0.649 20.833%, 0.761 25%, 0.847 29.167%, 0.911 33.333%, 0.955 37.5%, 0.983 41.667%, 1.001 45.833%, 1.01 50%, 1.014 54.167%, 1.015 58.333%, 1.013 62.5%, 1.011 66.667%, 1.009 70.833%, 1.007 75%, 1.005 79.167%, 1.003 83.333%, 1.002 87.5%, 1.001 91.667%, 1.001 95.833%, 1), width 700ms linear(0, 0.06 4.167%, 0.196 8.333%, 0.355 12.5%, 0.51 16.667%, 0.649 20.833%, 0.761 25%, 0.847 29.167%, 0.911 33.333%, 0.955 37.5%, 0.983 41.667%, 1.001 45.833%, 1.01 50%, 1.014 54.167%, 1.015 58.333%, 1.013 62.5%, 1.011 66.667%, 1.009 70.833%, 1.007 75%, 1.005 79.167%, 1.003 83.333%, 1.002 87.5%, 1.001 91.667%, 1.001 95.833%, 1); }
```

```js
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
document.querySelectorAll('[data-behavior~="segmented"]:not([data-segmented-bound])').forEach(segmented);
```

**토글 스위치**

### G-57 M3 핸들 커짐 + 오버슈트 이동

| 항목 | 내용 |
|---|---|
| 출처 | [Material Web — switch (_handle.scss, md-comp-switch 토큰)](https://github.com/material-components/material-web/blob/main/switch/internal/_handle.scss) |
| 생김새 | 52×32 트랙. 꺼짐은 작은 16px 핸들, 켜짐은 24px 핸들, 누르는 동안 28px. 원본 M3 보라 트랙 |
| 상태 | 클릭으로 켜고 끔(role=switch, aria-checked) / 누름: 핸들 28px |
| 모션 | 토글·누름 → 핸들 16→24px, 누름 28px, 위치(margin) 이동 |
| 타이밍 | `크기 250ms standard(cubic-bezier(0.2, 0, 0, 1)), 누름 100ms linear, 위치 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275)` |
| 느낌 | 손맛 · 탄력 |
| 용도 | 설정 스위치 · 머티리얼 앱 |

```html
<button type="button" class="G-57" role="switch" aria-checked="false" data-behavior="toggle" data-toggle aria-label="알림 받기"><span class="G-57-hc"><span class="G-57-h"></span></span></button>
```

```css
.G-57 { position: relative; width: 52px; height: 32px; padding: 0; background: var(--bg-1); border: 2px solid var(--fg-3); border-radius: var(--radius-pill); cursor: pointer; }
.G-57:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-57.is-on { background: var(--fg-1); border-color: var(--fg-1); }
.G-57-hc { position: absolute; top: 0; bottom: 0; left: 0; display: grid; place-items: center; width: 28px; margin-left: 0; transition: margin 300ms cubic-bezier(0.175, 0.885, 0.32, 1.275); }
.G-57.is-on .G-57-hc { margin-left: 20px; }
.G-57-h { width: 16px; height: 16px; background: var(--fg-3); border-radius: var(--radius-pill); transition: width 250ms cubic-bezier(0.2, 0, 0, 1), height 250ms cubic-bezier(0.2, 0, 0, 1); }
.G-57.is-on .G-57-h { width: 24px; height: 24px; background: var(--bg-1); }
.G-57:active .G-57-h { width: 28px; height: 28px; transition: width 100ms linear, height 100ms linear; }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

### G-58 눌리면 찌그러지는 썸

| 항목 | 내용 |
|---|---|
| 출처 | [Animate UI — Switch (Radix)](https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/radix/switch/index.tsx) |
| 생김새 | 32×20 트랙, 16px 썸. 누르는 동안 썸이 19px 로 옆으로 늘어난다. 원본은 양옆 아이콘이 스프링으로 커지고 작아짐(데모 생략). Motion 유료 Radix 예제는 justify-content 를 바꿔 layout 스프링으로 이동(https://motion.dev/examples/react-radix-switch) |
| 상태 | 클릭으로 켜고 끔(role=switch) / 누름: 썸 폭 19px |
| 모션 | 누름·토글 → 썸 width 16→19px (squash), 위치 layout 이동 |
| 타이밍 | `layout spring stiffness 300, damping 25 (≈611ms linear())` |
| 느낌 | 말랑함 · 만족감 |
| 용도 | 작은 스위치 · 목록 안 토글 |

```html
<button type="button" class="G-58" role="switch" aria-checked="false" data-behavior="toggle" data-toggle aria-label="와이파이"><span class="G-58-th"></span></button>
```

```css
.G-58 { position: relative; width: 32px; height: 20px; padding: 0; background: color-mix(in srgb, var(--fg-1) 20%, transparent); border: 0; border-radius: var(--radius-pill); cursor: pointer; }
.G-58:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-58.is-on { background: var(--fg-1); }
.G-58-th { position: absolute; top: 2px; left: 2px; width: 16px; height: 16px; background: var(--bg-1); border-radius: var(--radius-pill); box-shadow: var(--shadow-sm); transition: left 611ms linear(0, 0.08 4.167%, 0.254 8.333%, 0.451 12.5%, 0.634 16.667%, 0.782 20.833%, 0.889 25%, 0.963 29.167%, 1.007 33.333%, 1.029 37.5%, 1.037 41.667%, 1.035 45.833%, 1.03 50%, 1.022 54.167%, 1.015 58.333%, 1.01 62.5%, 1.005 66.667%, 1.002 70.833%, 1 75%, 0.999 79.167%, 0.999 83.333%, 0.999 87.5%, 0.999 91.667%, 0.999 95.833%, 1), width 611ms linear(0, 0.08 4.167%, 0.254 8.333%, 0.451 12.5%, 0.634 16.667%, 0.782 20.833%, 0.889 25%, 0.963 29.167%, 1.007 33.333%, 1.029 37.5%, 1.037 41.667%, 1.035 45.833%, 1.03 50%, 1.022 54.167%, 1.015 58.333%, 1.01 62.5%, 1.005 66.667%, 1.002 70.833%, 1 75%, 0.999 79.167%, 0.999 83.333%, 0.999 87.5%, 0.999 91.667%, 0.999 95.833%, 1); }
.G-58.is-on .G-58-th { left: calc(100% - 2px - 16px); }
.G-58:active .G-58-th { width: 19px; }
.G-58.is-on:active .G-58-th { left: calc(100% - 2px - 19px); }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

### G-59 단순 이동 토글

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — ToggleSwitch](https://github.com/codse/animata/blob/main/animata/button/toggle-switch.tsx) |
| 생김새 | 56×32 트랙, 24px 썸. 켜지면 썸이 자기 폭만큼(100%) 옆으로 간다 |
| 상태 | 클릭으로 켜고 끔(role=switch) |
| 모션 | 토글 → 썸 translateX(0→100%) + 트랙색 |
| 타이밍 | `transition-all (Tailwind 기본 150ms cubic-bezier(0.4, 0, 0.2, 1))` |
| 느낌 | 단순함 · 중립적 |
| 용도 | 폼 스위치 · 기본 설정 |

```html
<button type="button" class="G-59" role="switch" aria-checked="false" data-behavior="toggle" data-toggle aria-label="다크 모드"><span class="G-59-th"></span></button>
```

```css
.G-59 { display: flex; align-items: center; width: 56px; height: 32px; padding: 4px; background: color-mix(in srgb, var(--fg-1) 20%, transparent); border: 0; border-radius: var(--radius-pill); cursor: pointer; transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-59:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-59.is-on { background: var(--fg-1); }
.G-59-th { width: 24px; height: 24px; background: var(--bg-1); border-radius: var(--radius-pill); transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-59.is-on .G-59-th { transform: translateX(100%); }
```

```js
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
document.querySelectorAll('[data-behavior~="toggle"]:not([data-toggle-bound])').forEach(toggle);
```

**소셜·공유·다운로드**

### G-60 탄성 다운로드 → 진행선

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ElasticProgress](https://github.com/codrops/ElasticProgress) |
| 생김새 | 둥근 화살표 버튼이 고무줄 같은 진행선으로 늘어나고, 화살표는 위로 튀어 오른다. 실패·취소 땐 화살표가 매달리거나 떨어진다(데모 생략). 원본은 canvas/SVG 라이브러리 — 데모는 CSS 근사 |
| 상태 | 클릭 → 원이 선으로 변하며 출렁임 → 진행 → 완료(체크) → 원으로 복귀 |
| 모션 | 클릭 → 원→선 모핑, 선 출렁임(barStretch 20), 화살표 점프(jumpHeight 50), 채움 |
| 타이밍 | `라이브러리 값: barElasticOvershoot 1.8, barElasticPeriod 0.15, jumpHeight 50, barStretch 20, labelWobbliness 40 / 지속시간은 미기재 — 모핑 300ms·출렁임 900ms elastic linear()·채움 1.8s 추정` (추정) |
| 느낌 | 탄성 · 엉뚱함 |
| 용도 | 다운로드 · 파일 전송 |

```html
<button type="button" class="G-60" data-behavior="sequence" data-steps="is-loading:2400,is-done:1400" aria-label="다운로드"><span class="G-60-bar" aria-hidden="true"><span class="G-60-fill"></span></span><span class="G-60-ar" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M12 4v11"/><path class="head" d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg></span><span class="G-60-ok" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="check" d="M20 6L9 17l-5-5"/></svg></span></button>
```

```css
.G-60 { position: relative; display: grid; place-items: center; width: 220px; height: 96px; padding: 0; color: var(--bg-1); background: none; border: 0; cursor: pointer; }
.G-60:focus-visible { outline: none; }
.G-60:focus-visible .G-60-bar { outline: 2px solid var(--fg-1); outline-offset: 3px; }
.G-60-bar { position: relative; display: block; width: 56px; height: 56px; overflow: hidden; background: var(--fg-1); border-radius: 28px; transition: width 300ms cubic-bezier(0.4, 0, 0.2, 1), height 300ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 300ms cubic-bezier(0.4, 0, 0.2, 1), background-color 300ms; }
.G-60.is-loading .G-60-bar { width: 200px; height: 6px; border-radius: 3px; background: color-mix(in srgb, var(--fg-1) 20%, transparent); animation: G-60-wobble 900ms linear(0, 1.669 2.5%, 2.27 5%, 1.595 7.5%, 0.602 10%, 0.245 12.5%, 0.646 15%, 1.237 17.5%, 1.449 20%, 1.21 22.5%, 0.859 25%, 0.733 27.5%, 0.875 30%, 1.084 32.5%, 1.159 35%, 1.074 37.5%, 0.95 40%, 0.906 42.5%, 0.956 45%, 1.03 47.5%, 1.056 50%, 1.026 52.5%, 0.982 55%, 0.967 57.5%, 0.984 60%, 1.01 62.5%, 1.02 65%, 1.009 67.5%, 0.994 70%, 0.988 72.5%, 0.994 75%, 1.004 77.5%, 1.007 80%, 1.003 82.5%, 0.998 85%, 0.996 87.5%, 0.998 90%, 1.001 92.5%, 1.002 95%, 1.001 97.5%, 1) 300ms both; }
@keyframes G-60-wobble { from { translate: 0 20px; } to { translate: 0 0; } }
.G-60-fill { position: absolute; top: 0; bottom: 0; left: 0; width: 0; background: var(--fg-1); }
.G-60.is-loading .G-60-fill { animation: G-60-fill 1800ms 500ms linear forwards; }
@keyframes G-60-fill { to { width: 100%; } }
.G-60-ar, .G-60-ok { position: absolute; inset: 0; display: grid; place-items: center; pointer-events: none; }
.G-60 .G-60-ar .ic, .G-60 .G-60-ok .ic { width: var(--space-5); height: var(--space-5); }
.G-60.is-loading .G-60-ar { animation: G-60-jump 600ms cubic-bezier(0.2, 0.8, 0.4, 1) forwards; }
@keyframes G-60-jump { 50% { transform: translateY(-50px); opacity: 1; color: var(--fg-1); } 100% { transform: translateY(-50px); opacity: 0; color: var(--fg-1); } }
.G-60-ok { opacity: 0; }
.G-60.is-done .G-60-ar { opacity: 0; }
.G-60.is-done .G-60-ok { opacity: 1; transition: opacity 200ms 300ms; }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-61 화살표가 계속 떨어지는 다운로드

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse.io — vinodjangid07 (clever-bird-35)](https://github.com/uiverse-io/galaxy/blob/main/Buttons/vinodjangid07_clever-bird-35.html) |
| 생김새 | 50px 정사각 아이콘 버튼(화살표 + 받침). 호버하면 배경이 어두워지고 화살표만 위에서 반복해서 떨어진다 |
| 상태 | 호버/포커스 동안 무한 반복 |
| 모션 | 호버 → 배경 반전 / 화살표 translateY(-10px)+opacity 0 → 0+opacity 1 반복 |
| 타이밍 | `배경 0.3s, 화살표 slide-in-top 1s linear infinite` |
| 느낌 | 분주함 · 명백함 |
| 용도 | 다운로드 아이콘 · 내보내기 |

```html
<button type="button" class="G-61" aria-label="다운로드"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path class="shaft" d="M12 4v11"/><path class="head" d="M7 10l5 5 5-5"/><path d="M5 20h14"/></svg></button>
```

```css
.G-61 { display: grid; place-items: center; width: 50px; height: 50px; padding: 0; color: var(--fg-1); background: var(--bg-1); border: 0; border-radius: var(--radius-md); box-shadow: inset 0 0 0 1px var(--border-strong); cursor: pointer; transition: background-color 0.3s, color 0.3s; }
.G-61 .ic { width: var(--space-5); height: var(--space-5); }
.G-61:hover, .G-61:focus-visible { color: var(--bg-1); background: var(--fg-1); }
.G-61:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-61:hover .shaft, .G-61:hover .head, .G-61:focus-visible .shaft, .G-61:focus-visible .head { animation: G-61-drop 1s linear infinite; }
@keyframes G-61-drop { 0% { transform: translateY(-10px); opacity: 0; } 100% { transform: translateY(0); opacity: 1; } }
```

### G-62 불규칙한 속도로 차는 다운로드

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse.io — JkHuger (brown-lion-61)](https://github.com/uiverse-io/galaxy/blob/main/Buttons/JkHuger_brown-lion-61.html) |
| 생김새 | 막대가 일정하지 않은 속도로(실제 다운로드처럼) 차고, 끝나면 성공색으로 바뀐다. 원본 파랑 막대 → 초록 성공 |
| 상태 | 클릭 → 3초 진행 → 3.1초에 성공 → 1.5초 뒤 복귀 |
| 모션 | 클릭 → 채움 width 5→17→51→70→86→100% (0/35/64/81/90/100%) |
| 타이밍 | `3s cubic-bezier(0.67, 0.13, 0.1, 0.81), 성공 3.1s` |
| 느낌 | 그럴듯함 · 꾸준함 |
| 용도 | 다운로드 · 내보내기 진행 |

```html
<button type="button" class="G-62" data-behavior="sequence" data-steps="is-loading:3100,is-done:1500"><span class="G-62-fill" aria-hidden="true"></span><span class="G-62-t">다운로드</span><span class="G-62-ok" aria-hidden="true">완료</span></button>
```

```css
.G-62 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--border-strong); }
.G-62:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-62 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-62 { width: 160px; isolation: isolate; overflow: hidden; }
.G-62-fill { position: absolute; top: 0; bottom: 0; left: 0; z-index: -1; width: 0; background: color-mix(in srgb, var(--fg-1) 22%, transparent); }
.G-62.is-loading .G-62-fill { animation: G-62-prog 3s cubic-bezier(0.67, 0.13, 0.1, 0.81) forwards; }
@keyframes G-62-prog { 0% { width: 5%; } 35% { width: 17%; } 64% { width: 51%; } 81% { width: 70%; } 90% { width: 86%; } 100% { width: 100%; } }
.G-62.is-done { color: var(--bg-1); }
.G-62.is-done .G-62-fill { width: 100%; background: var(--fg-1); }
.G-62-ok { position: absolute; inset: 0; display: grid; place-items: center; opacity: 0; }
.G-62.is-done .G-62-t { opacity: 0; }
.G-62.is-done .G-62-ok { opacity: 1; }
```

```js
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
document.querySelectorAll('[data-behavior~="sequence"]:not([data-sequence-bound])').forEach(sequence);
```

### G-63 공유 아이콘이 튀어 오름

| 항목 | 내용 |
|---|---|
| 출처 | [Animate UI — ShareButton](https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/components/community/share-button/index.tsx) |
| 생김새 | "공유" 라벨이 위로 빠지고 그 자리에 소셜 아이콘 줄이 아래서 하나씩 튀어 오른다. 원본 소셜 브랜드 아이콘 → 일반 아이콘(복사·보내기·저장) |
| 상태 | 호버/포커스(안쪽 포커스 포함) 동안 아이콘 표시 / 아이콘 호버 하이라이트 |
| 모션 | 호버 → 라벨 y 0→-24 퇴장, 아이콘 y 24→0 등장(0.1s 스태거) |
| 타이밍 | `라벨 0.3s, 아이콘 spring duration 0.5 · bounce 0.4 (→ 487/26.5 ≈ 514ms linear()), 아이콘 호버 0.2s easeOut` |
| 느낌 | 통통 튐 · 소셜 |
| 용도 | 공유 버튼 · 게시물 액션 |

```html
<div class="G-63"><span class="G-63-l" aria-hidden="true"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12"/><path d="M7 8l5-5 5 5"/><path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6"/></svg>공유</span><button type="button" class="G-63-i" style="--i:0" aria-label="링크 복사"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 0 1 2-2h8"/></svg></button><button type="button" class="G-63-i" style="--i:1" aria-label="보내기"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg></button><button type="button" class="G-63-i" style="--i:2" aria-label="저장"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12v18l-6-4-6 4z"/></svg></button></div>
```

```css
.G-63 { position: relative; display: flex; align-items: center; justify-content: center; gap: var(--space-1); width: 152px; height: 44px; padding: 0 var(--space-2); overflow: hidden; color: var(--bg-1); background: var(--fg-1); border-radius: var(--radius-pill); }
.G-63-l { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; gap: var(--space-2); font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); pointer-events: none; transition: transform 0.3s, opacity 0.3s; }
.G-63 .ic { width: 18px; height: 18px; }
.G-63:hover .G-63-l, .G-63:focus-within .G-63-l { transform: translateY(-24px); opacity: 0; }
.G-63-i { display: grid; place-items: center; width: 36px; height: 36px; padding: 0; color: inherit; background: none; border: 0; border-radius: var(--radius-pill); cursor: pointer; opacity: 0; transform: translateY(24px); transition: transform 0.3s, opacity 0.3s, background-color 0.2s cubic-bezier(0, 0, 0.58, 1); }
.G-63:hover .G-63-i, .G-63:focus-within .G-63-i { opacity: 1; transform: translateY(0); transition: transform 514ms linear(0, 0.095 4.167%, 0.301 8.333%, 0.531 12.5%, 0.742 16.667%, 0.905 20.833%, 1.013 25%, 1.072 29.167%, 1.093 33.333%, 1.089 37.5%, 1.072 41.667%, 1.05 45.833%, 1.029 50%, 1.013 54.167%, 1.001 58.333%, 0.995 62.5%, 0.992 66.667%, 0.991 70.833%, 0.993 75%, 0.995 79.167%, 0.997 83.333%, 0.998 87.5%, 1 91.667%, 1 95.833%, 1) calc(var(--i) * 0.1s), opacity 0.3s calc(var(--i) * 0.1s), background-color 0.2s cubic-bezier(0, 0, 0.58, 1); }
.G-63-i:hover, .G-63-i:focus-visible { background: color-mix(in srgb, var(--bg-1) 20%, transparent); outline: none; }
```

### G-64 종이비행기 날아가기

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse.io — adamgiebl (smart-moth-68)](https://github.com/uiverse-io/galaxy/blob/main/Buttons/adamgiebl_smart-moth-68.html) |
| 생김새 | 종이비행기 + "보내기". 호버하면 비행기가 가운데로 날아가 45° 돌고 라벨은 오른쪽으로 빠진다. 비행기는 위아래로 둥실. 원본 royalblue 배경 |
| 상태 | 호버/포커스: 비행 + 둥실 반복 / 누름 scale(0.95) |
| 모션 | 호버·누름 → 아이콘 translateX(1.2em) rotate(45deg) scale(1.1), 라벨 translateX(5em), 둥실 ±0.1em |
| 타이밍 | `0.3s ease-in-out, 둥실 0.6s ease-in-out infinite alternate, 버튼 all 0.2s` |
| 느낌 | 장난스러움 · 역동적 |
| 용도 | 메시지 보내기 · 폼 전송 |

```html
<button type="button" class="G-64"><span class="G-64-w"><span class="G-64-s"><svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></svg></span></span><span class="G-64-t">보내기</span></button>
```

```css
.G-64 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-64:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-64 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-64 { height: auto; gap: 0; padding: 0.7em 1em 0.7em 0.9em; overflow: hidden; font-size: var(--text-18); line-height: var(--lh-18); border-radius: 16px; transition: all 0.2s; }
.G-64-w, .G-64-s, .G-64-t { display: block; }
.G-64-s { transform-origin: center center; transition: transform 0.3s ease-in-out; }
.G-64-t { margin-left: 0.3em; transition: all 0.3s ease-in-out; }
.G-64:hover .G-64-w, .G-64:focus-visible .G-64-w { animation: G-64-fly 0.6s ease-in-out infinite alternate; }
.G-64:hover .G-64-s, .G-64:focus-visible .G-64-s { transform: translateX(1.2em) rotate(45deg) scale(1.1); }
.G-64:hover .G-64-t, .G-64:focus-visible .G-64-t { transform: translateX(5em); }
.G-64:active { transform: scale(0.95); }
@keyframes G-64-fly { from { transform: translateY(0.1em); } to { transform: translateY(-0.1em); } }
```

**스페셜**

### G-65 마그네틱 버튼

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — MagneticButtons (buttonCtrl.js)](https://github.com/codrops/MagneticButtons/blob/master/src/js/demo1/buttonCtrl.js) |
| 생김새 | 버튼이 커서 쪽으로 끌려오고 라벨은 반대로 늦게 따라온다. 진입하면 라벨이 위로 빠졌다 아래서 다시 올라온다. 원본은 rAF lerp — 데모는 같은 감속(0.1/프레임)을 linear() 전환으로 근사 |
| 상태 | 포인터가 영역(원본: 폭×0.7 이내)에 있으면 끌림 / 벗어나면 0 으로 복귀 / 버튼 진입 때 라벨 롤 |
| 모션 | 포인터 이동·진입 → 버튼 translate = (마우스−중심)×0.3, 라벨 ×−0.6 역이동 / 라벨 y -20% 퇴장 → 100%→0 등장 |
| 타이밍 | `lerp 0.1/프레임(≈733ms 지수 감속) / 라벨 퇴장 0.15s Power2.easeIn(cubic-bezier(0.55, 0.055, 0.675, 0.19)) + 등장 0.2s Expo.easeOut(cubic-bezier(0.19, 1, 0.22, 1))` |
| 느낌 | 손맛 · 프리미엄 |
| 용도 | 히어로 CTA · 포트폴리오 |

```html
<div class="G-65" data-behavior="magnetic" data-strength="0.3"><button type="button" class="G-65-b" data-magnet><span class="G-65-l"><span class="G-65-i">끌어당기기</span></span></button></div>
```

```css
.G-65 { position: absolute; inset: 0; display: grid; place-items: center; }
.G-65-b { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-65-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-65-b .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-65-b { height: var(--space-8); padding: 0 var(--space-6); border-radius: var(--radius-pill); translate: var(--mx, 0px) var(--my, 0px); transition: translate 733ms linear(0, 0.32 8.333%, 0.538 16.667%, 0.686 25%, 0.787 33.333%, 0.855 41.667%, 0.902 50%, 0.933 58.333%, 0.955 66.667%, 0.969 75%, 0.979 83.333%, 0.986 91.667%, 1); }
.G-65-l { display: block; overflow: hidden; translate: calc(var(--mx, 0px) * -0.6) calc(var(--my, 0px) * -0.6); transition: translate 733ms linear(0, 0.32 8.333%, 0.538 16.667%, 0.686 25%, 0.787 33.333%, 0.855 41.667%, 0.902 50%, 0.933 58.333%, 0.955 66.667%, 0.969 75%, 0.979 83.333%, 0.986 91.667%, 1); }
.G-65-i { display: block; }
.G-65-b:hover .G-65-i, .G-65-b:focus-visible .G-65-i { animation: G-65-roll 350ms both; }
@keyframes G-65-roll { 0% { transform: translateY(0); opacity: 1; animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19); } 42.857% { transform: translateY(-20%); opacity: 0; } 42.858% { transform: translateY(100%); opacity: 0; animation-timing-function: cubic-bezier(0.19, 1, 0.22, 1); } 100% { transform: translateY(0); opacity: 1; } }
```

```js
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
document.querySelectorAll('[data-behavior~="magnetic"]:not([data-magnetic-bound])').forEach(magnetic);
```

### G-66 3D 눌리는 버튼 (Pushable)

| 항목 | 내용 |
|---|---|
| 출처 | [Josh W. Comeau — Building a magical 3D button](https://www.joshwcomeau.com/animation/3d-button/) |
| 생김새 | 앞면·옆면(edge)·그림자 세 겹. 앞면이 -4px 떠 있고 호버하면 더 뜨고 누르면 내려앉는다. 원본 앞면 hsl(345deg 100% 47%) 빨강 |
| 상태 | 평소 -4px / 호버 -6px + brightness 110% / 누름 -2px / 뗄 때 천천히 복귀 / 그림자 2px·4px·1px |
| 모션 | 호버·누름·뗌 → 앞면 translateY -4 → -6 → -2px, 그림자 2 → 4 → 1px, 밝기 110% |
| 타이밍 | `호버 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5), 누름 34ms, 뗌 600ms cubic-bezier(0.3, 0.7, 0.4, 1), filter 250ms` |
| 느낌 | 묵직함 · 장난감 같음 |
| 용도 | 게임 UI · 재미있는 CTA |

```html
<button type="button" class="G-66"><span class="G-66-sh" aria-hidden="true"></span><span class="G-66-edge" aria-hidden="true"></span><span class="G-66-front">눌러보기</span></button>
```

```css
.G-66 { position: relative; padding: 0; font: inherit; background: transparent; border: 0; cursor: pointer; outline-offset: 4px; transition: filter 250ms; }
.G-66:focus:not(:focus-visible) { outline: none; }
.G-66:focus-visible { outline: 2px solid var(--fg-1); }
.G-66-sh, .G-66-edge { position: absolute; inset: 0; border-radius: 12px; }
.G-66-sh { background: color-mix(in srgb, var(--fg-1) 25%, transparent); transform: translateY(2px); transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1); }
.G-66-edge { background: linear-gradient(to left, var(--fg-2) 0%, var(--fg-3) 8%, var(--fg-3) 92%, var(--fg-2) 100%); }
.G-66-front { position: relative; display: block; padding: 12px 42px; font-size: var(--text-18); line-height: var(--lh-18); font-weight: var(--weight-semibold); color: var(--bg-1); background: var(--fg-1); border-radius: 12px; transform: translateY(-4px); transition: transform 600ms cubic-bezier(0.3, 0.7, 0.4, 1); }
.G-66:hover, .G-66:focus-visible { filter: brightness(110%); }
.G-66:hover .G-66-front, .G-66:focus-visible .G-66-front { transform: translateY(-6px); transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5); }
.G-66:hover .G-66-sh, .G-66:focus-visible .G-66-sh { transform: translateY(4px); transition: transform 250ms cubic-bezier(0.3, 0.7, 0.4, 1.5); }
.G-66:active .G-66-front { transform: translateY(-2px); transition: transform 34ms; }
.G-66:active .G-66-sh { transform: translateY(1px); transition: transform 34ms; }
```

### G-67 듀오링고식 테두리 교체 누름

| 항목 | 내용 |
|---|---|
| 출처 | [Animata — Duolingo button](https://github.com/codse/animata/blob/main/animata/button/duolingo.tsx) |
| 생김새 | 바닥 4px 테두리가 두께를 만드는 납작한 3D 버튼. 누르면 아래 테두리를 위로 옮겨 면이 4px 내려앉는다(높이는 그대로). 원본 초록 면 + 진한 초록 바닥 |
| 상태 | 호버 brightness 110% / 누름: border-bottom 4→0, border-top 0→4 |
| 모션 | 누름 → border-bottom 4px→0 + border-top 0→4px (면 4px 하강) |
| 타이밍 | `transition-all duration-200 (200ms cubic-bezier(0.4, 0, 0.2, 1))` |
| 느낌 | 묵직함 · 게임 같음 |
| 용도 | 학습 앱 · 퀴즈 답 버튼 |

```html
<button type="button" class="G-67">계속하기</button>
```

```css
.G-67 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-67:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-67 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-67 { height: auto; padding: var(--space-3) var(--space-6); background: var(--bg-1); background-clip: padding-box; border: 0 solid transparent; border-bottom: 4px solid var(--border-strong); border-radius: var(--radius-md); transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1); }
.G-67:hover { filter: brightness(110%); }
.G-67:active { border-bottom-width: 0; border-top-width: 4px; }
```

### G-68 뉴모피즘 눌림

| 항목 | 내용 |
|---|---|
| 출처 | [Uiverse.io — ke1221 (ancient-walrus-24)](https://github.com/uiverse-io/galaxy/blob/main/Buttons/ke1221_ancient-walrus-24.html) |
| 생김새 | 배경과 같은 색 버튼에 밝은·어두운 그림자 한 쌍. 누르면 그림자가 안쪽으로 들어간다. 원본 #e8e8e8 바탕, 그림자 #c5c5c5 / #fff, 누름 글자 #666 |
| 상태 | 누름: 6px 6px 12px / -6px -6px 12px → inset 4px 4px 12px / inset -4px -4px 12px, 글자 흐려짐 |
| 모션 | 누름 → 바깥 그림자 → 안쪽 그림자, 글자색 |
| 타이밍 | `all .3s — 층 수·순서를 맞춰야 보간됨(여기선 바깥 2 + 안쪽 2 를 0 으로 깔아 둠)` |
| 느낌 | 부드러움 · 차분함 |
| 용도 | 소프트 UI · 설정 토글 |

```html
<button type="button" class="G-68">누르기</button>
```

```css
.G-68 { padding: var(--space-4) var(--space-7); font: inherit; font-size: var(--text-16); line-height: var(--lh-16); font-weight: var(--weight-semibold); color: var(--fg-1); background: var(--bg-2); border: 0; border-radius: var(--radius-md); cursor: pointer; box-shadow: 6px 6px 12px color-mix(in srgb, var(--fg-1) 18%, transparent), -6px -6px 12px var(--bg-1), inset 0 0 0 color-mix(in srgb, var(--fg-1) 18%, transparent), inset 0 0 0 var(--bg-1); transition: all 0.3s; }
.G-68:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 4px; }
.G-68:active { color: var(--fg-3); box-shadow: 0 0 0 color-mix(in srgb, var(--fg-1) 18%, transparent), 0 0 0 var(--bg-1), inset 4px 4px 12px color-mix(in srgb, var(--fg-1) 18%, transparent), inset -4px -4px 12px var(--bg-1); }
```

### G-69 말랑한 블롭 (clip-path path 모핑)

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ButtonHoverStyles "Janus"](https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css) |
| 생김새 | 유기적인 블롭 배경이 크게 출렁이며 다른 모양으로 바뀐다. 두 path 의 명령 구조가 같아야 보간된다. 원본 #e6e6e6 → 호버 검정. 블롭 좌표는 같은 구조로 다시 그린 것 |
| 상태 | 호버/포커스: 블롭 A→B + 진해짐, 라벨 10px 위로 |
| 모션 | 호버 → clip-path path() A→B (큰 오버슈트), 라벨 translateY(-10px) |
| 타이밍 | `clip-path 0.5s cubic-bezier(0.585, 2.5, 0.645, 0.55), 배경 0.5s ease, 라벨 0.3s ease` |
| 느낌 | 끈적함 · 장난스러움 |
| 용도 | 크리에이티브 사이트 · 이벤트 CTA |

```html
<button type="button" class="G-69"><span class="G-69-t">말랑하게</span></button>
```

```css
.G-69 { position: relative; display: grid; place-items: center; width: 160px; height: 96px; padding: 0; font: inherit; font-size: var(--text-16); line-height: var(--lh-16); font-weight: var(--weight-semibold); color: var(--bg-1); background: none; border: 0; cursor: pointer; isolation: isolate; }
.G-69:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-69::before { content: ""; position: absolute; inset: 0; z-index: -1; background: var(--fg-3); clip-path: path("M80,8 C120,6 154,22 152,48 C150,74 118,90 80,88 C42,86 8,74 8,48 C8,22 40,10 80,8Z"); transition: clip-path 0.5s cubic-bezier(0.585, 2.5, 0.645, 0.55), background-color 0.5s ease; }
.G-69:hover::before, .G-69:focus-visible::before { background: var(--fg-1); clip-path: path("M84,4 C126,10 158,30 148,54 C138,78 112,94 76,90 C40,86 4,70 12,44 C20,18 42,-2 84,4Z"); }
.G-69-t { display: block; transition: transform 0.3s ease; }
.G-69:hover .G-69-t, .G-69:focus-visible .G-69-t { transform: translate3d(0, -10px, 0); }
```

### G-70 커서 스포트라이트

| 항목 | 내용 |
|---|---|
| 출처 | [30 Seconds of Code — Mouse cursor gradient tracking (+ Chrome interactive content reveal)](https://30secondsofcode.org/css/s/mouse-cursor-gradient-tracking) |
| 생김새 | 버튼 안에서 포인터를 따라다니는 원형 빛. 위치(--x/--y)는 전환 없이 즉시, 크기만 0→200px 로 커진다. Chrome 판은 @property --inner-size 0→100px / --outer-size 0→120px 마스크(https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interactive-content-reveal). 원본 분홍 빛 |
| 상태 | 호버 동안 빛 표시 / reduced motion 이면 transition none |
| 모션 | 포인터 이동·호버 → 빛 위치 즉시 추적, 크기 0→200px |
| 타이밍 | `width/height 0.2s ease (Chrome 판 0.2s ease-in-out)` |
| 느낌 | 테크 · 프리미엄 |
| 용도 | 다크 랜딩 CTA · 카드 버튼 |

```html
<button type="button" class="G-70" data-behavior="spotlight" data-spot>마우스를 움직여 보세요</button>
```

```css
.G-70 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-70:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-70 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-70 { width: 240px; height: var(--space-8); overflow: hidden; isolation: isolate; }
.G-70::before { --size: 0px; content: ""; position: absolute; top: var(--sy, 50%); left: var(--sx, 50%); z-index: -1; width: var(--size); height: var(--size); background: radial-gradient(circle closest-side, color-mix(in srgb, var(--bg-1) 40%, transparent), transparent); transform: translate(-50%, -50%); pointer-events: none; transition: width 0.2s ease, height 0.2s ease; }
.G-70:hover::before { --size: 200px; }
@media (prefers-reduced-motion: reduce) { .G-70::before { transition: none; } }
```

```js
function spotlight(root) {
    if (root.hasAttribute('data-spotlight-bound')) return; root.setAttribute('data-spotlight-bound', '');
    root.addEventListener('pointermove', function (e) {
      var t = e.target.closest('[data-spot]') || root;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      t.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  }
document.querySelectorAll('[data-behavior~="spotlight"]:not([data-spotlight-bound])').forEach(spotlight);
```

### G-71 클릭하면 컨페티

| 항목 | 내용 |
|---|---|
| 출처 | [canvas-confetti (+ Magic UI CoolMode)](https://github.com/catdad/canvas-confetti) |
| 생김새 | 버튼에서 종이 조각이 위로 터졌다가 떨어진다. 원본은 canvas 파티클(다색) — 데모는 조각 12개를 CSS 키프레임으로 근사(각도 90° ± 22.5°, 흑백). CoolMode 는 이모지/원 파티클(https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/cool-mode.tsx) |
| 상태 | 클릭마다 재생 / disableForReducedMotion: true 권장 |
| 모션 | 클릭 → 조각이 위로 퍼졌다(감속) 중력으로 떨어지며 회전·사라짐 |
| 타이밍 | `기본값 particleCount 50, angle 90, spread 45, startVelocity 45, decay 0.9, gravity 1, ticks 200 / CoolMode 크기 15–45px, 최대 45개, 위 속도 ≤25, 옆 ≤10, 회전 ±35 — 데모 1.6s 는 추정` (추정) |
| 느낌 | 축하 |
| 용도 | 결제 완료 · 목표 달성 |

```html
<div class="G-71" data-behavior="replay"><button type="button" class="G-71-b" data-replay>축하하기</button><span class="G-71-c" aria-hidden="true"><i style="--dx:34px;--dy:-94px;--r:220deg"></i><i style="--dx:21px;--dy:-82px;--r:-180deg"></i><i style="--dx:15px;--dy:-109px;--r:260deg"></i><i style="--dx:3px;--dy:-95px;--r:-240deg"></i><i style="--dx:-7px;--dy:-105px;--r:200deg"></i><i style="--dx:-16px;--dy:-89px;--r:-300deg"></i><i style="--dx:-30px;--dy:-106px;--r:240deg"></i><i style="--dx:-32px;--dy:-79px;--r:-200deg"></i><i style="--dx:23px;--dy:-71px;--r:320deg"></i><i style="--dx:5px;--dy:-70px;--r:-260deg"></i><i style="--dx:-11px;--dy:-77px;--r:280deg"></i><i style="--dx:-25px;--dy:-68px;--r:-220deg"></i></span></div>
```

```css
.G-71 { position: relative; align-self: end; }
.G-71-b { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-71-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-71-b .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-71-c { position: absolute; top: 50%; left: 50%; pointer-events: none; }
.G-71-c i { position: absolute; width: 6px; height: 10px; margin: -5px 0 0 -3px; background: var(--fg-1); opacity: 0; }
.G-71-c i:nth-child(3n+2) { background: var(--fg-3); }
.G-71-c i:nth-child(3n) { width: 8px; height: 8px; background: var(--fg-4); border-radius: var(--radius-pill); }
.G-71-b.is-play + .G-71-c i { animation: G-71-burst 1.6s both; }
@keyframes G-71-burst { 0% { opacity: 1; transform: translate(0, 0) rotate(0deg); animation-timing-function: cubic-bezier(0.1, 0.7, 0.3, 1); } 40% { opacity: 1; transform: translate(var(--dx), var(--dy)) rotate(calc(var(--r) * 0.5)); animation-timing-function: cubic-bezier(0.5, 0, 0.9, 0.6); } 100% { opacity: 0; transform: translate(calc(var(--dx) * 1.3), calc(var(--dy) + 90px)) rotate(var(--r)); } }
```

```js
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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

### G-72 머티리얼 리플

| 항목 | 내용 |
|---|---|
| 출처 | [Material Web — md-ripple (ripple.ts) · Magic UI RippleButton](https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts) |
| 생김새 | 누른 지점에서 잉크 원이 퍼지며 가운데로 모인다. 시작 크기 = 긴 변×0.2(32px), 최종 반경 = 대각선+10px(354px 지름). Magic UI 판은 scale 0→2 + opacity 1→0, 600ms ease-out(https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/ripple-button.tsx) |
| 상태 | 클릭마다 재생(데모는 클릭 기준 — 원본은 pointerdown 에 퍼지고 최소 누름 225ms, 터치 지연 150ms 뒤 해제 때 사라짐) |
| 모션 | 누름 → scale 0.2배 크기→대각선+10px, 누른 점→가운데 이동, opacity .12 → 0 |
| 타이밍 | `퍼짐 450ms cubic-bezier(0.2, 0, 0, 1), 사라짐 375ms linear (구 MDC: 225ms / 150ms)` |
| 느낌 | 손맛 · 체계적 |
| 용도 | 머티리얼 버튼 · 목록 항목 |

```html
<button type="button" class="G-72" data-behavior="replay" data-replay><span class="G-72-r" aria-hidden="true"></span>리플</button>
```

```css
.G-72 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-72:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-72 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-72 { width: 160px; height: var(--space-7); overflow: hidden; isolation: isolate; border-radius: var(--radius-pill); }
.G-72-r { position: absolute; top: 0; left: 0; z-index: -1; width: 354px; height: 354px; margin: -177px 0 0 -177px; background: currentColor; border-radius: 50%; opacity: 0; pointer-events: none; }
.G-72.is-play .G-72-r { animation: G-72-ripple 825ms both; }
@keyframes G-72-ripple { 0% { opacity: 0.12; transform: translate(var(--x, 80px), var(--y, 24px)) scale(0.09); animation-timing-function: cubic-bezier(0.2, 0, 0, 1); } 54.55% { opacity: 0.12; transform: translate(80px, 24px) scale(1); animation-timing-function: linear; } 100% { opacity: 0; transform: translate(80px, 24px) scale(1); } }
```

```js
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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

### G-73 숨 쉬는 후광

| 항목 | 내용 |
|---|---|
| 출처 | [Magic UI — PulsatingButton](https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/pulsating-button.tsx) |
| 생김새 | CTA 둘레로 부드러운 링이 숨 쉬듯 커졌다 작아진다. 원본 --pulse-color 변수 → var(--fg-1) 35%. 리플 변형은 cubic-bezier(0.16, 1, 0.3, 1) 로 바깥으로 퍼지며 사라짐 |
| 상태 | 항상 루프 (한 화면에 하나만 권장) |
| 모션 | 루프 → box-shadow 퍼짐 0→8px→0 |
| 타이밍 | `1.5s ease-out infinite` |
| 느낌 | 차분함 · 끈질김 |
| 용도 | 주요 CTA 하나 · 라이브 표시 |

```html
<button type="button" class="G-73">지금 참여</button>
```

```css
.G-73 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-73:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-73 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-73 { border-radius: var(--radius-pill); animation: G-73-pulse 1.5s ease-out infinite; }
@keyframes G-73-pulse { 0%, 100% { box-shadow: 0 0 0 0 color-mix(in srgb, var(--fg-1) 35%, transparent); } 50% { box-shadow: 0 0 0 8px color-mix(in srgb, var(--fg-1) 35%, transparent); } }
```

### G-74 3D 뒤집히는 라벨

| 항목 | 내용 |
|---|---|
| 출처 | [Animate UI — FlipButton](https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/buttons/flip/index.tsx) |
| 생김새 | 앞면이 아래로 굴러 사라지고 뒷면이 위에서 굴러 들어온다(정육면체처럼). 앞면 rotateX 0→90°·opacity 0·y 50%, 뒷면은 반대 |
| 상태 | 호버/포커스: 뒷면 / 떠나면 앞면 |
| 모션 | 호버 → 앞면 rotateX 0→90deg + y 50% + 페이드 아웃, 뒷면 -90deg·-50%→0 + 페이드 인 |
| 타이밍 | `spring stiffness 280, damping 20 (≈671ms linear()) / perspective 600px 추정` (추정) |
| 느낌 | 재치 · 탄력 |
| 용도 | 구매 버튼 · 가격 공개 |

```html
<button type="button" class="G-74"><span class="G-74-f">구매하기</span><span class="G-74-b" aria-hidden="true">₩9,900</span></button>
```

```css
.G-74 { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--fg-1); background: transparent; }
.G-74:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-74 .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-74 { width: 136px; perspective: 600px; }
.G-74-f, .G-74-b { position: absolute; inset: 0; display: grid; place-items: center; border-radius: inherit; backface-visibility: hidden; transition: transform 671ms linear(0, 0.092 4.167%, 0.295 8.333%, 0.527 12.5%, 0.738 16.667%, 0.901 20.833%, 1.009 25%, 1.071 29.167%, 1.094 33.333%, 1.092 37.5%, 1.075 41.667%, 1.053 45.833%, 1.032 50%, 1.015 54.167%, 1.002 58.333%, 0.995 62.5%, 0.992 66.667%, 0.991 70.833%, 0.992 75%, 0.994 79.167%, 0.996 83.333%, 0.998 87.5%, 0.999 91.667%, 1 95.833%, 1), opacity 671ms linear(0, 0.092 4.167%, 0.295 8.333%, 0.527 12.5%, 0.738 16.667%, 0.901 20.833%, 1.009 25%, 1.071 29.167%, 1.094 33.333%, 1.092 37.5%, 1.075 41.667%, 1.053 45.833%, 1.032 50%, 1.015 54.167%, 1.002 58.333%, 0.995 62.5%, 0.992 66.667%, 0.991 70.833%, 0.992 75%, 0.994 79.167%, 0.996 83.333%, 0.998 87.5%, 0.999 91.667%, 1 95.833%, 1); }
.G-74-f { color: var(--bg-1); background: var(--fg-1); }
.G-74-b { color: var(--fg-1); background: var(--bg-1); box-shadow: inset 0 0 0 1px var(--fg-1); opacity: 0; transform: translateY(-50%) rotateX(-90deg); }
.G-74:hover .G-74-f, .G-74:focus-visible .G-74-f { opacity: 0; transform: translateY(50%) rotateX(90deg); }
.G-74:hover .G-74-b, .G-74:focus-visible .G-74-b { opacity: 1; transform: translateY(0) rotateX(0deg); }
```

### G-75 입자로 흩어지는 버튼

| 항목 | 내용 |
|---|---|
| 출처 | [Codrops — ParticleEffectsButtons (particles.js)](https://github.com/codrops/ParticleEffectsButtons/blob/master/js/particles.js) |
| 생김새 | 버튼이 한쪽부터 입자로 부서지며 사라진다(제출·삭제에 어울림). 원본은 canvas 입자 — 데모는 clip-path 로 지우고 가장자리에서 점 12개가 흩날리게 근사, 잠시 뒤 버튼 복귀 |
| 상태 | 클릭 → 1초 분해 → (데모) 0.8초 뒤 다시 나타남 |
| 모션 | 클릭 → disintegrate: 왼쪽부터 사라지며 입자 방출 |
| 타이밍 | `duration 1000ms easeInOutCubic(cubic-bezier(0.65, 0, 0.35, 1)), direction left, particlesAmountCoefficient 3, oscillationCoefficient 20, 입자 속도 rand(4)` |
| 느낌 | 극적 · 영화 같음 |
| 용도 | 제출 완료 · 삭제 |

```html
<div class="G-75" data-behavior="replay"><button type="button" class="G-75-b" data-replay>제출</button><span class="G-75-p" aria-hidden="true"><i style="--i:0"></i><i style="--i:1"></i><i style="--i:2"></i><i style="--i:3"></i><i style="--i:4"></i><i style="--i:5"></i><i style="--i:6"></i><i style="--i:7"></i><i style="--i:8"></i><i style="--i:9"></i><i style="--i:10"></i><i style="--i:11"></i></span></div>
```

```css
.G-75 { position: relative; }
.G-75-b { position: relative; display: inline-flex; align-items: center; justify-content: center; gap: var(--space-2); height: calc(var(--space-7) - var(--space-2)); padding: 0 var(--space-5); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); white-space: nowrap; border: 0; border-radius: var(--radius-md); cursor: pointer; -webkit-tap-highlight-color: transparent; color: var(--bg-1); background: var(--fg-1); }
.G-75-b:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }
.G-75-b .ic { width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); flex: none; }
.G-75-b { width: 160px; }
.G-75-b.is-play { animation: G-75-dis 1800ms both; }
@keyframes G-75-dis { 0% { clip-path: inset(0 0 0 0); animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1); } 55.56% { clip-path: inset(0 0 0 100%); } 80% { clip-path: inset(0 0 0 100%); opacity: 0; } 80.01% { clip-path: inset(0 0 0 0); opacity: 0; } 100% { clip-path: inset(0 0 0 0); opacity: 1; } }
.G-75-p { position: absolute; inset: 0; pointer-events: none; }
.G-75-p i { position: absolute; top: calc(var(--i) * 8%); left: 0; width: 4px; height: 4px; background: var(--fg-1); border-radius: 1px; opacity: 0; }
.G-75-p i:nth-child(even) { background: var(--fg-3); }
.G-75-b.is-play + .G-75-p i { animation: G-75-edge 1000ms cubic-bezier(0.65, 0, 0.35, 1) both, G-75-fly 1000ms ease-out both; }
@keyframes G-75-edge { from { left: 0%; } to { left: 100%; } }
@keyframes G-75-fly { 0% { opacity: 0; translate: 0 0; } 10% { opacity: 1; } 100% { opacity: 0; translate: calc(-20px - var(--i) * 3px) calc((var(--i) - 5) * 4px); } }
```

```js
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
document.querySelectorAll('[data-behavior~="replay"]:not([data-replay-bound])').forEach(replay);
```

