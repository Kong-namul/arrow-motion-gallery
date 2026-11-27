# 화살표·버튼 모션 도감 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 리서치로 모은 좌우 화살표 ~130종 + 버튼 모션 카탈로그 + 모션 세트 4개 × 버튼 15종 매트릭스를, 번호로 지시 가능한 라이브 갤러리(`index.html`)와 스펙(`ARROWS.md`)으로 만든다.

**Architecture:** 데이터 SSOT(`data/*.js`, 브라우저 전역 스크립트) → 갤러리 렌더러(`assets/gallery.js`)와 MD 생성기(`scripts/build-md.mjs`)가 같은 데이터를 읽는다. 데모 동작은 복사 가능한 독립 함수(`assets/behaviors.js`). 세트는 `--m-*` CSS 변수 묶음이고 버튼 CSS는 그 변수만 참조한다.

**Tech Stack:** 순수 HTML/CSS/JS (빌드 없음, file:// 로도 열림), Node 25 `node:test` + `node:vm`(데이터 검증·MD 생성), PARAMETA DS 토큰.

## Global Constraints

- 색·폰트·간격·라운드·그림자는 DS 토큰(`var(--fg-1)` 등)만. `#hex`, `rgb()`, `hsl()`, 색 이름 금지. 반투명은 `color-mix(in srgb, var(--fg-1) 40%, transparent)`.
- 다크모드 대응: 반전 쌍은 `background: var(--fg-1); color: var(--bg-1);`. `--fg-inverse`, 원시 팔레트(`--gray-*`, `--purple-*`) 직접 사용 금지.
- 타이틀·헤딩은 단색. 보라 액센트 금지.
- font-size는 `var(--text-14|16|18|22|24|26|32|36|48|60|72)` 또는 같은 px 값만.
- 모션 수치(ms, easing)는 출처 값 그대로 리터럴로 쓴다. 출처에 없으면 `inferred: true`.
- 데모 CSS는 `.번호`(예: `.A-03`)로 범위 지정. `@keyframes` 이름은 `번호-`로 시작.
- 데모 HTML에 `id` 속성, `<script>`, `on*=` 금지. 동작은 `data-behavior`로만.
- 공통 CSS/JS 수정 시 `index.html`의 `?v=` 를 올린다.
- git 저장소가 아니므로 커밋 단계는 생략한다.

## File Structure

| 파일 | 책임 | 작성 |
|---|---|---|
| `index.html` | 페이지 뼈대, 스크립트 로드 순서 | Task 1 |
| `assets/ds/tokens.css`, `assets/ds/colors_and_type.css` | PARAMETA DS 원본 복사 (수정 금지) | Task 1 |
| `assets/theme.css` | 다크모드 시맨틱 색 재매핑 | Task 1 |
| `assets/gallery.css` | 갤러리 레이아웃 | Task 1 |
| `assets/behaviors.js` | 데모 동작 함수 | Task 1 |
| `assets/gallery.js` | 렌더·필터·검색·느리게·테마·복사·매트릭스 | Task 1 |
| `data/core.js` | 아이콘, 카테고리, 공용 함수 | Task 1 |
| `data/A.js`…`data/G.js` | 카테고리 항목 | Task 2 (서브에이전트 5개 병렬) |
| `data/sets.js` | 모션 세트·버튼 종류 | Task 3 |
| `scripts/lib.mjs`, `scripts/build-md.mjs` | 데이터 로드(vm), MD 생성 | Task 1 |
| `tests/data.test.mjs` | 스키마·토큰 규칙·MD 동기화 검증 | Task 1 |
| `ARROWS.md` | 생성물 | Task 4 |

코드 블록의 info string `path=...` 는 그 경로의 파일 전체 내용이다. 실행 시 추출 스크립트로 그대로 쓴다.

---

### Task 1: 기반 (DS 복사, 테마, 코어, 동작, 렌더러, 검증 도구)

**Files:** Create everything marked Task 1 above + stub `data/A.js`…`data/G.js`, `data/sets.js`.

**Interfaces — Produces:**
- `window.ARROW_DATA = { ICONS, CATEGORIES, ARROWS, add(items[]), addIcons(map), svg(inner), expand(html), behaviorsOf(html) → string[], jsFor(names, B) → string, codeFor(item, B) → string, setCode(S, set, B) → string }`
- `window.ARROW_BEHAVIORS = { carousel, scroller, pager, book, cursor, replay, toggle, sequence, hold, magnetic, spotlight, direction, segmented, menu }` — 모두 `(root: Element) => void`
- `window.ARROW_SETS = { desc, VARS:[{name,desc}], SETS:[{key,name,feel,use,basis:[{label,url}],vars:{}}], BASE: css, TYPES:[{key,name,desc,tall?,demo,css}] }`
- 항목 스키마: `{ id:'A-01', group?, name, source, url, look, states, motion:{trigger, change, timing, inferred:boolean}, feel:string[], fits:string[], tall?:boolean, demo:string(HTML, 아이콘은 {{i:키}}), css:string }`
- `scripts/lib.mjs`: `ROOT`, `loadAll() → { D, S, B, errors }`, `buildMd(all) → string`

- [ ] **Step 1: DS 원본 복사**

```bash
mkdir -p /Users/sang/Desktop/arrow/assets/ds && cp "/Users/sang/Desktop/ai for work/homepage_v2/assets/ds/tokens.css" "/Users/sang/Desktop/ai for work/homepage_v2/assets/ds/colors_and_type.css" /Users/sang/Desktop/arrow/assets/ds/
```

- [ ] **Step 2: 테스트 먼저 작성**

```js path=tests/data.test.mjs
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { loadAll, buildMd } from '../scripts/lib.mjs';

const ALL = loadAll();
const { D, S, B } = ALL;
const FONT_PX = new Set([14, 16, 18, 22, 24, 26, 32, 36, 48, 60, 72]);
const REQUIRED = ['id', 'name', 'source', 'url', 'look', 'states', 'demo', 'css'];
const classTokens = (html) => [...html.matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/));

function colorRules(label, css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.doesNotMatch(clean, /#[0-9a-fA-F]{3,8}\b/, `${label}: #hex 색 금지 — DS 토큰 사용`);
  assert.doesNotMatch(clean, /\b(rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(/, `${label}: 색 함수 금지 — DS 토큰/color-mix 사용`);
  assert.doesNotMatch(clean, /:\s*(white|black|gray|grey|red|blue|green)\b/, `${label}: 색 이름 금지`);
  assert.doesNotMatch(clean, /var\(--(gray|purple|para|point)-/, `${label}: 원시 팔레트 대신 시맨틱 토큰(--fg-*, --bg-*, --border*)`);
  assert.doesNotMatch(clean, /var\(--fg-inverse\)/, `${label}: --fg-inverse 대신 var(--bg-1)`);
  for (const m of clean.matchAll(/font-size\s*:\s*([^;}]+)/g)) {
    const v = m[1].trim();
    if (v.startsWith('var(--text-') || v === 'inherit' || v === '0') continue;
    const px = v.match(/^(\d+)px$/);
    assert.ok(px && FONT_PX.has(+px[1]), `${label}: font-size ${v} 는 DS 스케일만 (14/16/18/22/24/26/32/36/48/60/72)`);
  }
}

test('[core] 코어·동작 파일 로드', () => {
  for (const f of ['data/core.js', 'assets/behaviors.js']) assert.equal(ALL.errors[f], undefined, String(ALL.errors[f]));
  assert.ok(D && Array.isArray(D.ARROWS));
});

for (const cat of ['A', 'B', 'C', 'D', 'E', 'F', 'G']) {
  const file = `data/${cat}.js`;
  const items = (D ? D.ARROWS : []).filter((a) => String(a.id || '')[0] === cat);

  test(`[${cat}] ${file} 로드`, () => {
    assert.equal(ALL.errors[file], undefined, String(ALL.errors[file]));
  });

  test(`[${cat}] 번호가 ${cat}-01부터 빈틈·중복 없이 이어진다`, () => {
    const ids = items.map((a) => a.id).sort((x, y) => x.localeCompare(y, 'en', { numeric: true }));
    ids.forEach((id, k) => assert.equal(id, `${cat}-${String(k + 1).padStart(2, '0')}`));
  });

  test(`[${cat}] 그룹은 번호 순서상 연속 블록이다`, () => {
    const seen = new Set();
    let last = null;
    for (const a of items.slice().sort((x, y) => x.id.localeCompare(y.id, 'en', { numeric: true }))) {
      const g = a.group || '';
      if (g !== last) { assert.ok(!seen.has(g), `${a.id}: 그룹 "${g}"가 떨어져 있음`); seen.add(g); last = g; }
    }
  });

  for (const a of items) {
    test(`[${cat}] ${a.id} 스키마`, () => {
      for (const f of REQUIRED) assert.ok(typeof a[f] === 'string' && a[f].trim(), `${a.id}.${f} 비어 있음`);
      assert.match(a.id, /^[A-G]-\d{2}$/);
      assert.match(a.url, /^https:\/\//, `${a.id}.url`);
      assert.ok(Array.isArray(a.feel) && a.feel.length, `${a.id}.feel 배열`);
      assert.ok(Array.isArray(a.fits) && a.fits.length, `${a.id}.fits 배열`);
      assert.ok(a.motion && a.motion.trigger && a.motion.change && a.motion.timing, `${a.id}.motion.trigger/change/timing`);
      assert.equal(typeof a.motion.inferred, 'boolean', `${a.id}.motion.inferred`);
    });

    test(`[${cat}] ${a.id} 데모·CSS 규칙`, () => {
      assert.ok(classTokens(a.demo).includes(a.id), `${a.id}: 데모 루트에 class="${a.id}"`);
      const css = a.css.replace(/\/\*[\s\S]*?\*\//g, '');
      assert.ok(css.includes(`.${a.id}`), `${a.id}: CSS를 .${a.id} 로 범위 지정`);
      for (const m of css.matchAll(/@keyframes\s+([\w-]+)/g)) assert.ok(m[1].startsWith(`${a.id}-`), `${a.id}: @keyframes ${m[1]} → ${a.id}- 로 시작`);
      colorRules(a.id, a.css);
      for (const m of a.demo.matchAll(/\{\{i:([a-z0-9-]+)\}\}/g)) assert.ok(D.ICONS[m[1]], `${a.id}: 아이콘 ${m[1]} 없음`);
      for (const n of D.behaviorsOf(a.demo)) assert.equal(typeof B[n], 'function', `${a.id}: 동작 ${n} 없음`);
      assert.doesNotMatch(a.demo, /\sid="/, `${a.id}: 데모에 id 속성 금지`);
      assert.doesNotMatch(a.demo, /<script|\son[a-z]+=/i, `${a.id}: 인라인 스크립트/이벤트 금지`);
    });
  }
}

test('[S] 세트 파일 로드 + 모든 세트가 모든 변수를 정의', () => {
  assert.equal(ALL.errors['data/sets.js'], undefined, String(ALL.errors['data/sets.js']));
  for (const s of S.SETS) for (const v of S.VARS) assert.ok(s.vars[v.name], `${s.key} ${v.name} 없음`);
});

test('[S] 버튼 종류 CSS는 선언된 --m-* 변수와 DS 토큰만 쓴다', () => {
  const names = new Set(S.VARS.map((v) => v.name));
  for (const t of [{ key: 'BASE', css: S.BASE || '' }, ...S.TYPES]) {
    for (const m of t.css.matchAll(/var\((--m-[a-z0-9-]+)/g)) assert.ok(names.has(m[1]), `${t.key}: 미선언 ${m[1]}`);
    colorRules(t.key, t.css);
  }
  for (const t of S.TYPES) {
    for (const n of D.behaviorsOf(t.demo)) assert.equal(typeof B[n], 'function', `${t.key}: 동작 ${n} 없음`);
    assert.doesNotMatch(t.demo, /\sid="/, `${t.key}: id 금지`);
  }
});

test('[MD] 항목 수만큼 섹션이 생성된다', () => {
  const md = buildMd(ALL);
  assert.equal((md.match(/^### [A-G]-\d{2} /gm) || []).length, D.ARROWS.length);
  assert.equal((md.match(/^#### T\d{2} /gm) || []).length, S.TYPES.length);
});
```

- [ ] **Step 3: 테스트 실행 → 실패 확인**

Run: `cd /Users/sang/Desktop/arrow && node --test tests/data.test.mjs`
Expected: FAIL — `Cannot find module '../scripts/lib.mjs'`

- [ ] **Step 4: 데이터 로더·MD 생성기**

```js path=scripts/lib.mjs
// 브라우저와 같은 순서로 data/*.js → assets/behaviors.js 를 vm에서 실행해 데이터를 얻는다.
import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const LOAD_ORDER = ['data/core.js', ...['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((k) => `data/${k}.js`), 'data/sets.js', 'assets/behaviors.js'];

export function loadAll() {
  const ctx = vm.createContext({ console });
  ctx.window = ctx;
  const errors = {};
  for (const f of LOAD_ORDER) {
    const p = path.join(ROOT, f);
    if (!existsSync(p)) { errors[f] = new Error(`${f} 없음`); continue; }
    try { vm.runInContext(readFileSync(p, 'utf8'), ctx, { filename: f }); }
    catch (e) { errors[f] = e; }
  }
  return { D: ctx.ARROW_DATA, S: ctx.ARROW_SETS, B: ctx.ARROW_BEHAVIORS || {}, errors };
}

const byId = (a, b) => a.id.localeCompare(b.id, 'en', { numeric: true });
const cell = (s) => String(s).replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ');
const anchor = (s) => s.toLowerCase().replace(/[^\p{L}\p{N}\s-]/gu, '').trim().replace(/\s+/g, '-');

export function buildMd({ D, S, B }) {
  const items = D.ARROWS.slice().sort(byId);
  const L = [];
  L.push('# 화살표·버튼 모션 도감 — 스펙', '');
  L.push('> 이 파일은 `data/*.js`에서 자동 생성된다. 직접 고치지 말고 `node scripts/build-md.mjs`로 다시 만든다.');
  L.push('>');
  L.push('> **쓰는 법:** "B-04처럼 만들어줘", "모션 세트 S2로 T07 버튼"처럼 번호로 지시하면 아래 HTML·CSS·JS를 그대로 쓰면 된다.');
  L.push('> 색·폰트·간격은 PARAMETA DS 토큰(`assets/ds/tokens.css`, `assets/ds/colors_and_type.css`, 다크모드 `assets/theme.css`)을 참조한다. 모션 수치(ms, easing)는 출처 값 그대로다. "추정"은 출처에 수치가 없어 재현값을 쓴 것.');
  L.push('> 리서치 원문(출처 URL·수치): `research/*.md`', '');
  L.push(`총 ${items.length}종 + 모션 세트 ${S.SETS.length}개 × 버튼 종류 ${S.TYPES.length}개`, '');
  L.push('## 목차', '');
  if (S.SETS.length) L.push(`- [S. 모션 세트 매트릭스](#${anchor('S. 모션 세트 매트릭스')})`);
  for (const c of D.CATEGORIES) {
    const n = items.filter((a) => a.id[0] === c.key).length;
    if (n) L.push(`- [${c.key}. ${c.name}](#${anchor(`${c.key}. ${c.name}`)}) — ${n}종`);
  }
  L.push('');

  if (S.SETS.length) {
    L.push('## S. 모션 세트 매트릭스', '', S.desc, '');
    L.push('### 세트 비교표', '');
    L.push(`| 변수 | 뜻 | ${S.SETS.map((s) => `${s.key} ${s.name}`).join(' | ')} |`);
    L.push(`|---|---|${S.SETS.map(() => '---').join('|')}|`);
    for (const v of S.VARS) L.push(`| \`${v.name}\` | ${cell(v.desc)} | ${S.SETS.map((s) => `\`${cell(s.vars[v.name])}\``).join(' | ')} |`);
    L.push('');
    for (const s of S.SETS) {
      L.push(`### ${s.key} ${s.name}`, '', `- 느낌: ${s.feel}`, `- 쓰는 곳: ${s.use}`, `- 근거: ${s.basis.map((b) => (b.url ? `[${b.label}](${b.url})` : b.label)).join(' · ')}`, '');
      L.push('```css', ':root {', ...S.VARS.map((v) => `  ${v.name}: ${s.vars[v.name]}; /* ${v.desc} */`), '}', '```', '');
    }
    L.push('### 버튼 종류 (모든 세트 공통 마크업·CSS)', '', '공통 베이스 CSS:', '', '```css', S.BASE.trim(), '```', '');
    for (const t of S.TYPES) {
      L.push(`#### ${t.key} ${t.name}`, '', t.desc, '');
      L.push('```html', D.expand(t.demo).trim(), '```', '', '```css', t.css.trim(), '```', '');
      const names = D.behaviorsOf(t.demo);
      if (names.length) L.push('```js', D.jsFor(names, B), '```', '');
    }
  }

  for (const c of D.CATEGORIES) {
    const list = items.filter((a) => a.id[0] === c.key);
    if (!list.length) continue;
    L.push(`## ${c.key}. ${c.name}`, '', c.desc, '');
    let group = null;
    for (const a of list) {
      if ((a.group || '') !== group) { group = a.group || ''; if (group) L.push(`**${group}**`, ''); }
      const m = a.motion;
      L.push(`### ${a.id} ${a.name}`, '');
      L.push('| 항목 | 내용 |', '|---|---|');
      L.push(`| 출처 | [${cell(a.source)}](${a.url}) |`);
      L.push(`| 생김새 | ${cell(a.look)} |`);
      L.push(`| 상태 | ${cell(a.states)} |`);
      L.push(`| 모션 | ${cell(m.trigger)} → ${cell(m.change)} |`);
      L.push(`| 타이밍 | \`${cell(m.timing)}\`${m.inferred ? ' (추정)' : ''} |`);
      L.push(`| 느낌 | ${cell(a.feel.join(' · '))} |`);
      L.push(`| 용도 | ${cell(a.fits.join(' · '))} |`, '');
      L.push('```html', D.expand(a.demo).trim(), '```', '', '```css', a.css.trim(), '```', '');
      const names = D.behaviorsOf(a.demo);
      if (names.length) L.push('```js', D.jsFor(names, B), '```', '');
    }
  }
  return L.join('\n') + '\n';
}
```

```js path=scripts/build-md.mjs
import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { loadAll, buildMd, ROOT } from './lib.mjs';

const all = loadAll();
const bad = Object.entries(all.errors);
if (bad.length) {
  console.error('로드 실패:\n' + bad.map(([f, e]) => `  ${f}: ${e.message}`).join('\n'));
  process.exit(1);
}
writeFileSync(path.join(ROOT, 'ARROWS.md'), buildMd(all));
console.log(`ARROWS.md 생성: 항목 ${all.D.ARROWS.length}종, 세트 ${all.S.SETS.length} × 버튼 ${all.S.TYPES.length}`);
```

- [ ] **Step 5: 데이터 코어 + 스텁**

```js path=data/core.js
/* 화살표·버튼 모션 도감 — 데이터 코어 (SSOT)
 * 카테고리 파일(data/A.js …)이 ARROW_DATA.add([...])로 항목을 넣는다.
 * ARROWS.md는 이 데이터에서 생성된다: node scripts/build-md.mjs
 * 아이콘: 데모 HTML에서 {{i:키}} 로 쓴다. 카테고리 전용 아이콘은 ARROW_DATA.addIcons({'c-키': ARROW_DATA.svg('<path …/>')}) (키 앞에 소문자 카테고리). */
window.ARROW_DATA = (function () {
  'use strict';
  function svg(inner) {
    return '<svg class="ic" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + inner + '</svg>';
  }
  var dot = function (cx) { return '<circle cx="' + cx + '" cy="12" r="1.5" fill="currentColor" stroke="none"/>'; };
  var ICONS = {
    'chev-l': svg('<path d="M15 18l-6-6 6-6"/>'),
    'chev-r': svg('<path d="M9 18l6-6-6-6"/>'),
    'chevs-l': svg('<path d="M11 17l-5-5 5-5"/><path d="M18 17l-5-5 5-5"/>'),
    'chevs-r': svg('<path d="M13 17l5-5-5-5"/><path d="M6 17l5-5-5-5"/>'),
    'chev-bar-l': svg('<path d="M17 18l-6-6 6-6"/><path d="M7 6v12"/>'),
    'chev-bar-r': svg('<path d="M7 18l6-6-6-6"/><path d="M17 6v12"/>'),
    'chev-thin-l': svg('<path d="M15 20l-8-8 8-8" stroke-width="1.25"/>'),
    'chev-thin-r': svg('<path d="M9 20l8-8-8-8" stroke-width="1.25"/>'),
    'arrow-l': svg('<path class="shaft" d="M19 12H5"/><path class="head" d="M12 19l-7-7 7-7"/>'),
    'arrow-r': svg('<path class="shaft" d="M5 12h14"/><path class="head" d="M12 5l7 7-7 7"/>'),
    'arrow-long-l': svg('<path class="shaft" d="M22 12H2"/><path class="head" d="M8 6l-6 6 6 6"/>'),
    'arrow-long-r': svg('<path class="shaft" d="M2 12h20"/><path class="head" d="M16 6l6 6-6 6"/>'),
    'arrow-narrow-l': svg('<path class="shaft" d="M19 12H5"/><path class="head" d="M9 8l-4 4 4 4"/>'),
    'arrow-narrow-r': svg('<path class="shaft" d="M5 12h14"/><path class="head" d="M15 8l4 4-4 4"/>'),
    'arrow-circle-l': svg('<circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M16 12H8"/><path class="head" d="M12 16l-4-4 4-4"/>'),
    'arrow-circle-r': svg('<circle class="ring" cx="12" cy="12" r="10"/><path class="shaft" d="M8 12h8"/><path class="head" d="M12 8l4 4-4 4"/>'),
    'arrow-fat-l': svg('<path d="M20 9h-8V5l-8 7 8 7v-4h8z" fill="currentColor"/>'),
    'arrow-fat-r': svg('<path d="M4 9h8V5l8 7-8 7v-4H4z" fill="currentColor"/>'),
    'caret-l': svg('<path d="M15 6v12l-8-6z" fill="currentColor"/>'),
    'caret-r': svg('<path d="M9 6v12l8-6z" fill="currentColor"/>'),
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
    'play': svg('<path d="M7 4v16l13-8z" fill="currentColor"/>'),
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
  function jsFor(names, B) {
    return names.map(function (n) {
      return B[n].toString() + '\ndocument.querySelectorAll(\'[data-behavior~="' + n + '"]\').forEach(' + n + ');';
    }).join('\n\n');
  }
  var DS_NOTE = '/* 색·폰트·간격: PARAMETA DS 토큰 필요 (assets/ds/tokens.css + colors_and_type.css, 다크모드 assets/theme.css) */';
  function codeFor(item, B) {
    var names = behaviorsOf(item.demo);
    var out = '<!-- ' + item.id + ' ' + item.name + ' — 출처: ' + item.url + ' -->\n' + expand(item.demo).trim() +
      '\n\n<style>\n' + DS_NOTE + '\n' + item.css.trim() + '\n</style>';
    if (names.length && B) out += '\n\n<script>\n' + jsFor(names, B) + '\n</script>';
    return out + '\n';
  }
  function setCode(S, set, B) {
    var names = [];
    S.TYPES.forEach(function (t) { behaviorsOf(t.demo).forEach(function (n) { if (names.indexOf(n) < 0) names.push(n); }); });
    var vars = ':root {\n' + S.VARS.map(function (v) { return '  ' + v.name + ': ' + set.vars[v.name] + '; /* ' + v.desc + ' */'; }).join('\n') + '\n}';
    var out = '<!-- 모션 세트 ' + set.key + ' ' + set.name + ' — ' + set.feel + ' -->\n<style>\n' + DS_NOTE + '\n' + vars + '\n\n' + S.BASE.trim() + '\n\n' +
      S.TYPES.map(function (t) { return '/* ' + t.key + ' ' + t.name + ' */\n' + t.css.trim(); }).join('\n\n') + '\n</style>\n\n' +
      S.TYPES.map(function (t) { return '<!-- ' + t.key + ' ' + t.name + ' -->\n' + expand(t.demo).trim(); }).join('\n\n');
    if (names.length && B) out += '\n\n<script>\n' + jsFor(names, B) + '\n</script>';
    return out + '\n';
  }
  return { ICONS: ICONS, CATEGORIES: CATEGORIES, ARROWS: ARROWS, add: add, addIcons: addIcons, svg: svg, expand: expand, behaviorsOf: behaviorsOf, jsFor: jsFor, codeFor: codeFor, setCode: setCode };
})();
```

스텁 7개 (`data/A.js` … `data/G.js`, Task 2가 덮어씀):

```bash
cd /Users/sang/Desktop/arrow && for k in A B C D E F G; do printf '/* %s — Task 2에서 채움 */\nARROW_DATA.add([]);\n' "$k" > data/$k.js; done
```

```js path=data/sets.js
/* 모션 세트 — Task 3에서 채움 */
window.ARROW_SETS = { desc: '', VARS: [], SETS: [], BASE: '', TYPES: [] };
```

- [ ] **Step 6: 데모 동작**

```js path=assets/behaviors.js
/* 데모 동작 모음 — 각 함수는 루트 요소 하나만 받는 독립 함수라 그대로 복사해 쓸 수 있다.
 * 연결: document.querySelectorAll('[data-behavior~="carousel"]').forEach(carousel)
 * 마크업 계약은 함수 위 주석 참고. 수정하면 index.html 의 ?v= 를 올린다. */
(function () {
  'use strict';

  /* carousel — 자식: [data-track](슬라이드들의 부모) [data-prev] [data-next] [data-dots]?(비워두면 점 자동 생성) [data-count]?
   * 루트 속성: data-loop, data-step="100"(한 번에 이동할 %), data-visible="1"(한 화면 슬라이드 수)
   * 상태: data-index, data-dir="prev|next", .is-start/.is-end, 끝에서 버튼 disabled(루프 제외) */
  function carousel(root) {
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
    function go(to, dir) {
      root.dataset.dir = dir || (to >= i ? 'next' : 'prev');
      i = loop ? (to + max + 1) % (max + 1) : Math.max(0, Math.min(max, to));
      track.style.transform = 'translateX(' + (-step * i) + '%)';
      root.dataset.index = String(i);
      root.classList.toggle('is-start', i === 0);
      root.classList.toggle('is-end', i === max);
      if (!loop) { if (prev) prev.disabled = i === 0; if (next) next.disabled = i === max; }
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
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1, 'prev'); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1, 'next'); }
    });
    go(0, 'next');
  }

  /* scroller — 자식: [data-scroller](overflow-x:auto 요소) [data-prev]? [data-next]?
   * 루트 속성: data-step="0.8"(보이는 폭 대비 이동 비율), data-drag(드래그 스크롤)
   * 상태: .is-overflow(넘침 있음) .is-start .is-end .is-dragging, 끝에서 버튼 disabled */
  function scroller(root) {
    var sc = root.querySelector('[data-scroller]');
    if (!sc) return;
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var ratio = parseFloat(root.dataset.step || '0.8');
    function update() {
      var max = sc.scrollWidth - sc.clientWidth;
      var atStart = sc.scrollLeft <= 1;
      var atEnd = sc.scrollLeft >= max - 1;
      root.classList.toggle('is-overflow', max > 1);
      root.classList.toggle('is-start', atStart);
      root.classList.toggle('is-end', atEnd);
      if (prev) prev.disabled = atStart;
      if (next) next.disabled = atEnd;
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

  /* pager — 자식: [data-first]? [data-prev]? [data-pages]?(번호 자동 생성) [data-label]?(현재 표시) [data-next]? [data-last]?
   *   <template data-gap>…</template>?(말줄임 버튼 내용, 없으면 …)
   * 루트 속성: data-total="10" 또는 data-labels="1월,2월,…", data-start="0", data-jump="5", data-loop
   * 생성 요소: button.pg[aria-current="page"], button.pg-gap[data-jump-by]
   * 상태: data-index, data-dir="prev|next", 라벨 변경 시 [data-label].is-anim 재시작 */
  function pager(root) {
    var labels = root.dataset.labels ? root.dataset.labels.split(',') : null;
    var n = labels ? labels.length : parseInt(root.dataset.total || '10', 10);
    var jump = parseInt(root.dataset.jump || '5', 10);
    var loop = root.hasAttribute('data-loop');
    var pages = root.querySelector('[data-pages]');
    var label = root.querySelector('[data-label]');
    var gap = root.querySelector('template[data-gap]');
    var i = parseInt(root.dataset.start || '0', 10);
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
      var hadFocus = pages && pages.contains(document.activeElement);
      if (pages) {
        pages.innerHTML = '';
        windowed().forEach(function (k) {
          var b = document.createElement('button');
          b.type = 'button';
          if (typeof k === 'string') {
            b.className = 'pg-gap';
            b.dataset.jumpBy = String(k === 'gap-prev' ? -jump : jump);
            b.setAttribute('aria-label', (k === 'gap-prev' ? '이전 ' : '다음 ') + jump + '페이지');
            b.innerHTML = gap ? gap.innerHTML : '…';
          } else {
            b.className = 'pg';
            b.textContent = String(k + 1);
            b.dataset.page = String(k);
            b.setAttribute('aria-label', (k + 1) + '페이지');
            if (k === i) b.setAttribute('aria-current', 'page');
          }
          pages.appendChild(b);
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
      root.dataset.index = String(i);
    }
    function go(to) {
      var t = loop ? (to + n) % n : Math.max(0, Math.min(n - 1, to));
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
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(i - 1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(i + 1); }
    });
    render(false);
  }

  /* book — 자식: [data-sheet] 여러 장(앞장이 위), [data-prev]? [data-next]?
   * 상태: 넘긴 장에 .is-turned, 넘어가는 장에 .is-moving(전환 끝나면 해제), data-index */
  function book(root) {
    var sheets = Array.prototype.slice.call(root.querySelectorAll('[data-sheet]'));
    var n = sheets.length;
    var prev = root.querySelector('[data-prev]');
    var next = root.querySelector('[data-next]');
    var i = 0;
    function stack() {
      sheets.forEach(function (s, k) { s.style.zIndex = String(k < i ? k + 1 : 2 * n - k); });
    }
    function render(moving) {
      sheets.forEach(function (s, k) { s.classList.toggle('is-turned', k < i); });
      stack();
      if (moving) {
        moving.classList.add('is-moving');
        moving.style.zIndex = String(3 * n);
        var done = function () { moving.classList.remove('is-moving'); stack(); moving.removeEventListener('transitionend', done); };
        moving.addEventListener('transitionend', done);
      }
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === n - 1;
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
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
      if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
    });
    render(null);
  }

  /* cursor — 자식: [data-zone]?(없으면 루트) [data-cursor](따라다니는 요소)
   * 루트에 --cx/--cy(px), data-side="left|right", .is-in, 클릭 시 .is-click 재시작.
   * 같은 루트에 [data-prev]/[data-next]가 있으면 클릭한 쪽 버튼을 누른다 (carousel 등과 함께 사용) */
  function cursor(root) {
    var zone = root.querySelector('[data-zone]') || root;
    zone.addEventListener('pointermove', function (e) {
      var r = zone.getBoundingClientRect();
      var x = e.clientX - r.left;
      root.style.setProperty('--cx', x + 'px');
      root.style.setProperty('--cy', (e.clientY - r.top) + 'px');
      root.dataset.side = x < r.width / 2 ? 'left' : 'right';
    });
    zone.addEventListener('pointerenter', function () { root.classList.add('is-in'); });
    zone.addEventListener('pointerleave', function () { root.classList.remove('is-in'); });
    zone.addEventListener('click', function (e) {
      if (e.target.closest('button')) return;
      root.classList.remove('is-click'); void root.offsetWidth; root.classList.add('is-click');
      var b = root.querySelector(root.dataset.side === 'left' ? '[data-prev]' : '[data-next]');
      if (b) b.click();
    });
  }

  /* replay — 클릭한 [data-replay] 요소(또는 루트)에 .is-play 를 다시 붙여 애니메이션 재생.
   * 누른 위치를 --x/--y(px)로 넣어 준다 (리플 등). 키보드면 가운데. */
  function replay(root) {
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

  /* toggle — [data-toggle](또는 루트) 클릭 시 .is-on 토글. role="switch"면 aria-checked, 아니면 aria-pressed */
  function toggle(root) {
    root.addEventListener('click', function (e) {
      var t = e.target.closest('[data-toggle]') || (root.hasAttribute('data-toggle') ? root : null);
      if (!t) return;
      var attr = t.getAttribute('role') === 'switch' ? 'aria-checked' : 'aria-pressed';
      var on = t.getAttribute(attr) !== 'true';
      t.setAttribute(attr, String(on));
      t.classList.toggle('is-on', on);
    });
  }

  /* sequence — 클릭한 [data-steps](또는 루트) 요소에 상태 클래스를 차례로 붙였다 뗀다.
   * data-steps="is-loading:1400,is-done:1400" (클래스:유지ms). 진행 중 재클릭 무시. is-loading 동안 aria-busy */
  function sequence(root) {
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

  /* hold — [data-hold="1200"] 요소를 누르고 있으면 .is-holding, 끝까지 누르면 .is-done(1.6초 뒤 해제).
   * 중간에 떼면 취소. 키보드 Space/Enter 도 동일 */
  function hold(root) {
    var timer = null, el = null;
    function start(e) {
      var t = e.target.closest('[data-hold]');
      if (!t || !root.contains(t) || t.classList.contains('is-done')) return;
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

  /* magnetic — 루트(넉넉한 영역) 안에서 포인터를 따라 [data-magnet](또는 루트)에 --mx/--my(px) 설정.
   * 루트 속성: data-strength="0.3". 떠나면 0px. CSS에서 translate: var(--mx,0) var(--my,0) + transition */
  function magnetic(root) {
    var t = root.querySelector('[data-magnet]') || root;
    var k = parseFloat(root.dataset.strength || '0.3');
    root.addEventListener('pointermove', function (e) {
      var r = root.getBoundingClientRect();
      t.style.setProperty('--mx', ((e.clientX - r.left - r.width / 2) * k).toFixed(1) + 'px');
      t.style.setProperty('--my', ((e.clientY - r.top - r.height / 2) * k).toFixed(1) + 'px');
    });
    root.addEventListener('pointerleave', function () { t.style.setProperty('--mx', '0px'); t.style.setProperty('--my', '0px'); });
  }

  /* spotlight — 포인터 위치를 [data-spot](또는 루트)에 --sx/--sy(px)로 설정 (커서 조명·그라데이션용) */
  function spotlight(root) {
    root.addEventListener('pointermove', function (e) {
      var t = e.target.closest('[data-spot]') || root;
      var r = t.getBoundingClientRect();
      t.style.setProperty('--sx', (e.clientX - r.left) + 'px');
      t.style.setProperty('--sy', (e.clientY - r.top) + 'px');
    });
  }

  /* direction — 포인터가 들어오고 나간 지점을 [data-dir-target](또는 루트)에 --ex/--ey(px)로, 들어오면 .is-in */
  function direction(root) {
    var t = root.querySelector('[data-dir-target]') || root;
    function at(e) {
      var r = t.getBoundingClientRect();
      t.style.setProperty('--ex', (e.clientX - r.left) + 'px');
      t.style.setProperty('--ey', (e.clientY - r.top) + 'px');
    }
    t.addEventListener('pointerenter', function (e) { at(e); t.classList.add('is-in'); });
    t.addEventListener('pointerleave', function (e) { at(e); t.classList.remove('is-in'); });
  }

  /* segmented — 자식 [data-seg] 버튼들. 선택 시 aria-pressed, 루트에 --seg-x/--seg-w(px), data-index */
  function segmented(root) {
    var items = Array.prototype.slice.call(root.querySelectorAll('[data-seg]'));
    function select(k) {
      items.forEach(function (b, j) { b.setAttribute('aria-pressed', String(j === k)); });
      root.style.setProperty('--seg-x', items[k].offsetLeft + 'px');
      root.style.setProperty('--seg-w', items[k].offsetWidth + 'px');
      root.dataset.index = String(k);
    }
    items.forEach(function (b, k) { b.addEventListener('click', function () { select(k); }); });
    select(parseInt(root.dataset.start || '0', 10));
    if (window.ResizeObserver) new ResizeObserver(function () { select(parseInt(root.dataset.index || '0', 10)); }).observe(root);
  }

  /* menu — 자식 [data-menu-trigger]. 열림/닫힘을 루트 .is-open + aria-expanded 로. 바깥 클릭·Esc 로 닫힘 */
  function menu(root) {
    var trigger = root.querySelector('[data-menu-trigger]');
    if (!trigger) return;
    function set(open) { root.classList.toggle('is-open', open); trigger.setAttribute('aria-expanded', String(open)); }
    trigger.addEventListener('click', function () { set(!root.classList.contains('is-open')); });
    document.addEventListener('click', function (e) { if (!root.contains(e.target)) set(false); });
    root.addEventListener('keydown', function (e) { if (e.key === 'Escape') { set(false); trigger.focus(); } });
    set(false);
  }

  window.ARROW_BEHAVIORS = {
    carousel: carousel, scroller: scroller, pager: pager, book: book, cursor: cursor,
    replay: replay, toggle: toggle, sequence: sequence, hold: hold, magnetic: magnetic,
    spotlight: spotlight, direction: direction, segmented: segmented, menu: menu
  };
})();
```

- [ ] **Step 7: 테스트 실행 → 통과 확인 (빈 데이터)**

Run: `cd /Users/sang/Desktop/arrow && node --test tests/data.test.mjs`
Expected: PASS (core, 카테고리 로드·번호 테스트, S, MD 모두 통과. 항목 0개)

- [ ] **Step 8: 테마·갤러리 CSS**

```css path=assets/theme.css
/* arrow 폴더 공통 테마 레이어 (2026-11-26 추가, 사용자 승인)
 * PARAMETA DS 원본(assets/ds/*)은 수정하지 않고, DS 원시 토큰으로 다크모드 시맨틱 색만 다시 매핑한다.
 * 값을 바꾸면 index.html 의 ?v= 를 올린다. */
:root { color-scheme: light; }

@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    color-scheme: dark;
    --fg-1: var(--fg-inverse);
    --fg-2: var(--gray-200);
    --fg-3: var(--gray-300);
    --fg-4: var(--gray-400);
    --bg-1: var(--gray-900);
    --bg-2: var(--gray-800);
    --bg-3: var(--gray-700);
    --border-subtle: var(--gray-800);
    --border: var(--gray-700);
    --border-strong: var(--gray-600);
  }
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --fg-1: var(--fg-inverse);
  --fg-2: var(--gray-200);
  --fg-3: var(--gray-300);
  --fg-4: var(--gray-400);
  --bg-1: var(--gray-900);
  --bg-2: var(--gray-800);
  --bg-3: var(--gray-700);
  --border-subtle: var(--gray-800);
  --border: var(--gray-700);
  --border-strong: var(--gray-600);
}
```

```css path=assets/gallery.css
/* 도감 레이아웃 — PARAMETA DS 토큰만 사용. 수정하면 index.html 의 ?v= 를 올린다. */
*, *::before, *::after { box-sizing: border-box; }
[hidden] { display: none !important; }
html { scroll-padding-top: calc(var(--space-12) - var(--space-6)); }
body { margin: 0; font-size: var(--text-16); line-height: var(--lh-16); }
button { font-family: inherit; }
:focus-visible { outline: 2px solid var(--fg-1); outline-offset: 2px; }

.g-wrap { padding-inline: var(--space-7); }

/* 헤더 */
.g-head { padding-block: var(--space-10) var(--space-7); }
.g-eyebrow { margin: 0 0 var(--space-4); font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-semibold); color: var(--fg-3); }
.g-title { margin: 0; font-size: var(--text-48); line-height: var(--lh-48); font-weight: var(--weight-extrabold); color: var(--fg-1); }
.g-lead { margin: var(--space-5) 0 0; max-width: 64ch; font-size: var(--text-18); line-height: var(--lh-18); color: var(--fg-2); }
.g-lead strong { color: var(--fg-1); }
.g-note { margin: var(--space-3) 0 0; max-width: 64ch; font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-3); }

/* 필터 바 */
.g-bar { position: sticky; top: 0; z-index: 20; background: var(--bg-1); border-block: 1px solid var(--border-subtle); }
.g-bar-in { display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: var(--space-3); padding-block: var(--space-3); }
.g-chips { display: flex; gap: var(--space-2); max-width: 100%; overflow-x: auto; scrollbar-width: none; }
.g-chips::-webkit-scrollbar { display: none; }
.g-tools { display: flex; flex-wrap: wrap; gap: var(--space-2); }
.g-chip, .g-toggle, .g-copy {
  flex: none;
  padding: var(--space-2) var(--space-4);
  font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); white-space: nowrap;
  color: var(--fg-2); background: var(--bg-1);
  border: 1px solid var(--border); border-radius: var(--radius-pill);
  cursor: pointer;
  transition: color var(--duration-fast) var(--ease-out), background-color var(--duration-fast) var(--ease-out), border-color var(--duration-fast) var(--ease-out);
}
.g-chip:hover, .g-toggle:hover, .g-copy:hover { color: var(--fg-1); border-color: var(--border-strong); }
.g-chip[aria-pressed="true"], .g-toggle[aria-pressed="true"] { color: var(--bg-1); background: var(--fg-1); border-color: var(--fg-1); }
.g-chip-n { margin-left: var(--space-2); opacity: .6; }
.g-search {
  width: calc(var(--space-12) + var(--space-8)); min-width: 0;
  padding: var(--space-2) var(--space-4);
  font: inherit; font-size: var(--text-14); line-height: var(--lh-14);
  color: var(--fg-1); background: var(--bg-2);
  border: 1px solid var(--border-subtle); border-radius: var(--radius-pill);
}
.g-search::placeholder { color: var(--fg-4); }

/* 섹션 */
.g-sec { padding-top: var(--space-9); }
.g-sec-head { display: grid; gap: var(--space-2); margin-bottom: var(--space-6); }
.g-sec-title { display: flex; flex-wrap: wrap; align-items: baseline; gap: var(--space-3); margin: 0; font-size: var(--text-32); line-height: var(--lh-32); font-weight: var(--weight-bold); color: var(--fg-1); }
.g-sec-key { font-family: var(--font-mono); color: var(--fg-3); }
.g-sec-n { font-family: var(--font-mono); font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-regular); color: var(--fg-3); }
.g-sec-desc { margin: 0; max-width: 72ch; font-size: var(--text-16); line-height: var(--lh-16); color: var(--fg-2); }
.g-group { margin: var(--space-7) 0 var(--space-4); font-size: var(--text-18); line-height: var(--lh-18); font-weight: var(--weight-semibold); color: var(--fg-1); }
.g-sec-head + .g-group { margin-top: 0; }
.g-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, calc(var(--space-12) * 2)), 1fr)); gap: var(--space-4); }
.g-empty { padding-block: var(--space-9) 0; font-size: var(--text-18); line-height: var(--lh-18); color: var(--fg-3); }

/* 카드 */
.g-card { display: flex; flex-direction: column; min-width: 0; background: var(--bg-1); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; transition: box-shadow var(--duration-base) var(--ease-out); }
.g-card.is-flash { box-shadow: 0 0 0 2px var(--fg-1); }
.g-stage { position: relative; display: grid; place-items: center; height: calc(var(--space-12) + var(--space-6)); padding: var(--space-4); background: var(--bg-2); overflow: hidden; isolation: isolate; }
.g-stage--tall { height: calc(var(--space-12) + var(--space-10)); }
.g-info { display: flex; flex: 1; flex-direction: column; gap: var(--space-3); padding: var(--space-4); }
.g-row { display: flex; align-items: baseline; gap: var(--space-2); min-width: 0; }
.g-id { flex: none; font-family: var(--font-mono); font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-3); text-decoration: none; }
a.g-id:hover { color: var(--fg-1); opacity: 1; }
.g-name { margin: 0; font-size: var(--text-18); line-height: var(--lh-18); font-weight: var(--weight-bold); color: var(--fg-1); }
.g-spec { display: grid; grid-template-columns: auto 1fr; gap: var(--space-1) var(--space-3); margin: 0; font-size: var(--text-14); line-height: var(--lh-14); }
.g-spec dt { color: var(--fg-3); white-space: nowrap; }
.g-spec dd { margin: 0; min-width: 0; color: var(--fg-2); overflow-wrap: anywhere; }
.g-mono { font-family: var(--font-mono); }
.g-inferred { display: inline-block; margin-left: var(--space-2); padding: 0 var(--space-2); font-family: var(--font-body); color: var(--fg-3); border: 1px solid var(--border); border-radius: var(--radius-pill); }
.g-feel { display: flex; flex-wrap: wrap; gap: var(--space-1); margin: 0; padding: 0; list-style: none; }
.g-feel li { padding: var(--space-1) var(--space-3); font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-2); background: var(--bg-2); border-radius: var(--radius-pill); }
.g-actions { display: flex; align-items: center; justify-content: space-between; gap: var(--space-3); margin-top: auto; padding-top: var(--space-2); }
.g-src { min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-2); text-decoration: underline; text-underline-offset: 3px; }
.g-src:hover { color: var(--fg-1); opacity: 1; }

/* 모션 세트 매트릭스 */
.g-mx-tabs { display: none; gap: var(--space-2); margin-bottom: var(--space-4); overflow-x: auto; }
.g-mx { display: grid; grid-template-columns: minmax(calc(var(--space-12) + var(--space-4)), 1fr) repeat(var(--cols, 4), minmax(0, 1.25fr)); gap: 1px; background: var(--border-subtle); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); overflow: hidden; }
.g-mx > * { min-width: 0; background: var(--bg-1); }
.g-mx-corner { display: flex; align-items: end; padding: var(--space-4); }
.g-mx-col { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-4); }
.g-mx-col p, .g-mx-row p { margin: 0; font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-2); }
.g-mx-col .g-mx-use { color: var(--fg-3); }
.g-mx-col .g-copy { align-self: start; margin-top: auto; }
.g-mx-row { display: flex; flex-direction: column; justify-content: center; gap: var(--space-1); padding: var(--space-4); }
.g-mx-cell { position: relative; display: grid; place-items: center; min-height: calc(var(--space-12) - var(--space-4)); padding: var(--space-4); background: var(--bg-2); overflow: hidden; isolation: isolate; }
.g-mx-cell--tall { min-height: calc(var(--space-12) + var(--space-6)); }
.g-table-wrap { margin-top: var(--space-6); overflow-x: auto; border: 1px solid var(--border-subtle); border-radius: var(--radius-md); }
.g-table { width: 100%; border-collapse: collapse; font-size: var(--text-14); line-height: var(--lh-14); }
.g-table th, .g-table td { padding: var(--space-2) var(--space-3); text-align: left; vertical-align: top; color: var(--fg-2); border-bottom: 1px solid var(--border-subtle); }
.g-table thead th { color: var(--fg-1); font-weight: var(--weight-semibold); background: var(--bg-2); white-space: nowrap; }
.g-table tbody th { color: var(--fg-1); font-weight: var(--weight-medium); white-space: nowrap; }
.g-table td.g-mono { max-width: calc(var(--space-12) + var(--space-8)); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.g-basis { margin: var(--space-4) 0 0; padding-left: var(--space-5); font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-2); }
.g-basis li + li { margin-top: var(--space-1); }
.g-basis a { color: var(--fg-2); text-decoration: underline; text-underline-offset: 3px; }

/* 푸터 */
.g-foot { padding-block: var(--space-10) var(--space-8); font-size: var(--text-14); line-height: var(--lh-14); color: var(--fg-3); }
.g-foot p { margin: 0 0 var(--space-2); }

@media (max-width: 767px) {
  .g-wrap { padding-inline: var(--space-4); }
  .g-head { padding-block: var(--space-8) var(--space-6); }
  .g-title { font-size: var(--text-32); line-height: var(--lh-32); }
  .g-lead { font-size: var(--text-16); line-height: var(--lh-16); }
  .g-sec-title { font-size: var(--text-24); line-height: var(--lh-24); }
  .g-tools { width: 100%; }
  .g-search { flex: 1; }
  .g-mx-tabs { display: flex; }
  .g-mx { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); }
  .g-mx .is-off { display: none; }
}

@media (prefers-reduced-motion: reduce) {
  .g-stage *, .g-stage *::before, .g-stage *::after,
  .g-mx-cell *, .g-mx-cell *::before, .g-mx-cell *::after {
    animation-duration: 1ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 1ms !important;
  }
}
```

- [ ] **Step 9: 렌더러**

```js path=assets/gallery.js
/* 갤러리 렌더러: data/*.js → 카드·매트릭스. 필터·검색·느리게·테마·복사. 수정하면 index.html ?v= 올리기 */
(function () {
  'use strict';
  var D = window.ARROW_DATA;
  var B = window.ARROW_BEHAVIORS || {};
  var S = window.ARROW_SETS && window.ARROW_SETS.SETS && window.ARROW_SETS.SETS.length ? window.ARROW_SETS : null;
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var el = function (tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; };
  var items = D.ARROWS.slice().sort(function (a, b) { return a.id.localeCompare(b.id, 'en', { numeric: true }); });
  var main = $('[data-sections]');

  /* 1. 데모 CSS 주입 — 복사 버튼이 주는 CSS와 같은 문자열 */
  var style = document.createElement('style');
  style.textContent = (S ? S.BASE + '\n\n' + S.TYPES.map(function (t) { return '/* ' + t.key + ' */\n' + t.css; }).join('\n\n') + '\n\n' : '') +
    items.map(function (a) { return '/* ' + a.id + ' */\n' + a.css; }).join('\n\n');
  document.head.appendChild(style);

  /* 2. 렌더 */
  function card(a) {
    var m = a.motion;
    var c = el('article', 'g-card');
    c.id = a.id;
    c.dataset.search = [a.id, a.name, a.source, a.look, a.group || '', a.feel.join(' '), a.fits.join(' ')].join(' ').toLowerCase();
    c.innerHTML =
      '<div class="g-stage' + (a.tall ? ' g-stage--tall' : '') + '">' + D.expand(a.demo) + '</div>' +
      '<div class="g-info">' +
        '<div class="g-row"><a class="g-id" href="#' + a.id + '">' + a.id + '</a><h3 class="g-name">' + esc(a.name) + '</h3></div>' +
        '<dl class="g-spec">' +
          '<dt>모션</dt><dd>' + esc(m.trigger) + ' → ' + esc(m.change) + '</dd>' +
          '<dt>타이밍</dt><dd class="g-mono">' + esc(m.timing) + (m.inferred ? '<span class="g-inferred">추정</span>' : '') + '</dd>' +
          '<dt>생김새</dt><dd>' + esc(a.look) + '</dd>' +
          '<dt>상태</dt><dd>' + esc(a.states) + '</dd>' +
          '<dt>용도</dt><dd>' + esc(a.fits.join(' · ')) + '</dd>' +
        '</dl>' +
        '<ul class="g-feel">' + a.feel.map(function (f) { return '<li>' + esc(f) + '</li>'; }).join('') + '</ul>' +
        '<div class="g-actions"><a class="g-src" href="' + esc(a.url) + '" target="_blank" rel="noopener noreferrer">' + esc(a.source) + '</a>' +
        '<button type="button" class="g-copy" data-copy="' + a.id + '">코드 복사</button></div>' +
      '</div>';
    return c;
  }

  function section(cat, list) {
    var sec = el('section', 'g-sec');
    sec.id = 'cat-' + cat.key;
    sec.dataset.cat = cat.key;
    sec.appendChild(el('div', 'g-sec-head',
      '<h2 class="g-sec-title"><span class="g-sec-key">' + cat.key + '</span>' + esc(cat.name) + '<span class="g-sec-n">' + list.length + '종</span></h2>' +
      '<p class="g-sec-desc">' + esc(cat.desc) + '</p>'));
    var grid = null, group = null;
    list.forEach(function (a) {
      if (!grid || (a.group || '') !== group) {
        group = a.group || '';
        if (group) sec.appendChild(el('h3', 'g-group', esc(group)));
        grid = el('div', 'g-grid');
        sec.appendChild(grid);
      }
      grid.appendChild(card(a));
    });
    return sec;
  }

  function varsStyle(vars) { return Object.keys(vars).map(function (k) { return k + ':' + vars[k]; }).join(';'); }

  function matrix() {
    var sec = el('section', 'g-sec');
    sec.id = 'cat-S';
    sec.dataset.cat = 'S';
    sec.appendChild(el('div', 'g-sec-head',
      '<h2 class="g-sec-title"><span class="g-sec-key">S</span>모션 세트 매트릭스<span class="g-sec-n">' + S.SETS.length + ' 세트 × ' + S.TYPES.length + ' 종류</span></h2>' +
      '<p class="g-sec-desc">' + esc(S.desc) + '</p>'));
    var tabs = el('div', 'g-mx-tabs');
    S.SETS.forEach(function (s, k) {
      tabs.appendChild(el('button', 'g-chip', esc(s.key + ' ' + s.name)));
      tabs.lastChild.type = 'button';
      tabs.lastChild.dataset.setTab = String(k);
      tabs.lastChild.setAttribute('aria-pressed', String(k === 0));
    });
    sec.appendChild(tabs);
    var mx = el('div', 'g-mx');
    mx.style.setProperty('--cols', String(S.SETS.length));
    mx.appendChild(el('div', 'g-mx-corner', '<span class="g-id">세트 → / 종류 ↓</span>'));
    S.SETS.forEach(function (s, k) {
      var col = el('div', 'g-mx-col',
        '<div class="g-row"><span class="g-id">' + s.key + '</span><h3 class="g-name">' + esc(s.name) + '</h3></div>' +
        '<p>' + esc(s.feel) + '</p><p class="g-mx-use">' + esc(s.use) + '</p>' +
        '<button type="button" class="g-copy" data-copy-set="' + k + '">세트 CSS 복사</button>');
      col.dataset.set = String(k);
      mx.appendChild(col);
    });
    S.TYPES.forEach(function (t) {
      mx.appendChild(el('div', 'g-mx-row', '<div class="g-row"><span class="g-id">' + t.key + '</span><h3 class="g-name">' + esc(t.name) + '</h3></div><p>' + esc(t.desc) + '</p>'));
      S.SETS.forEach(function (s, k) {
        var c = el('div', 'g-mx-cell' + (t.tall ? ' g-mx-cell--tall' : ''), D.expand(t.demo));
        c.dataset.set = String(k);
        c.setAttribute('style', varsStyle(s.vars));
        mx.appendChild(c);
      });
    });
    sec.appendChild(mx);
    var table = '<table class="g-table"><thead><tr><th>변수</th><th>뜻</th>' +
      S.SETS.map(function (s) { return '<th>' + s.key + ' ' + esc(s.name) + '</th>'; }).join('') + '</tr></thead><tbody>' +
      S.VARS.map(function (v) {
        return '<tr><th class="g-mono">' + v.name + '</th><td>' + esc(v.desc) + '</td>' +
          S.SETS.map(function (s) { return '<td class="g-mono" title="' + esc(s.vars[v.name]) + '">' + esc(s.vars[v.name]) + '</td>'; }).join('') + '</tr>';
      }).join('') + '</tbody></table>';
    sec.appendChild(el('div', 'g-table-wrap', table));
    sec.appendChild(el('ul', 'g-basis', S.SETS.map(function (s) {
      return '<li><b>' + s.key + ' ' + esc(s.name) + '</b> 근거: ' + s.basis.map(function (b) {
        return b.url ? '<a href="' + esc(b.url) + '" target="_blank" rel="noopener noreferrer">' + esc(b.label) + '</a>' : esc(b.label);
      }).join(' · ') + '</li>';
    }).join('')));
    tabs.addEventListener('click', function (e) {
      var b = e.target.closest('[data-set-tab]');
      if (!b) return;
      $$('[data-set-tab]', tabs).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
      $$('[data-set]', mx).forEach(function (x) { x.classList.toggle('is-off', x.dataset.set !== b.dataset.setTab); });
    });
    $$('[data-set]', mx).forEach(function (x) { x.classList.toggle('is-off', x.dataset.set !== '0'); });
    return sec;
  }

  if (S) main.appendChild(matrix());
  D.CATEGORIES.forEach(function (cat) {
    var list = items.filter(function (a) { return a.id[0] === cat.key; });
    if (list.length) main.appendChild(section(cat, list));
  });
  $$('[data-count]').forEach(function (n) { n.textContent = String(items.length); });

  /* 3. 데모 동작 연결 */
  $$('[data-behavior]', main).forEach(function (root) {
    root.dataset.behavior.split(/\s+/).forEach(function (n) {
      if (typeof B[n] !== 'function') return;
      try { B[n](root); } catch (err) { console.error('[behavior]', n, err); }
    });
  });

  /* 4. 필터·검색 */
  var chips = $('[data-filters]');
  var cats = [{ key: 'all', name: '전체', n: items.length }]
    .concat(S ? [{ key: 'S', name: '모션 세트', n: S.SETS.length }] : [])
    .concat(D.CATEGORIES.map(function (c) { return { key: c.key, name: c.name, n: items.filter(function (a) { return a.id[0] === c.key; }).length }; }).filter(function (c) { return c.n; }));
  chips.innerHTML = cats.map(function (c) {
    return '<button type="button" class="g-chip" data-filter="' + c.key + '" aria-pressed="' + (c.key === 'all') + '">' +
      (c.key === 'all' ? '' : c.key + ' ') + esc(c.name) + '<span class="g-chip-n">' + c.n + '</span></button>';
  }).join('');
  var state = { cat: 'all', q: '' };
  function apply() {
    var any = false;
    $$('.g-sec', main).forEach(function (sec) {
      var catOk = state.cat === 'all' || sec.dataset.cat === state.cat;
      if (sec.dataset.cat === 'S') {
        sec.hidden = !catOk || (state.q && sec.textContent.toLowerCase().indexOf(state.q) < 0);
        any = any || !sec.hidden;
        return;
      }
      var shown = 0;
      $$('.g-card', sec).forEach(function (c) {
        var ok = catOk && (!state.q || c.dataset.search.indexOf(state.q) >= 0);
        c.hidden = !ok;
        if (ok) shown++;
      });
      $$('.g-grid', sec).forEach(function (g) {
        var vis = $$('.g-card', g).some(function (c) { return !c.hidden; });
        g.hidden = !vis;
        var prev = g.previousElementSibling;
        if (prev && prev.classList.contains('g-group')) prev.hidden = !vis;
      });
      sec.hidden = shown === 0;
      any = any || shown > 0;
    });
    $('[data-empty]').hidden = any;
  }
  chips.addEventListener('click', function (e) {
    var b = e.target.closest('[data-filter]');
    if (!b) return;
    state.cat = b.dataset.filter;
    $$('[data-filter]', chips).forEach(function (x) { x.setAttribute('aria-pressed', String(x === b)); });
    apply();
  });
  $('[data-search]').addEventListener('input', function (e) { state.q = e.target.value.trim().toLowerCase(); apply(); });

  /* 5. 느리게 0.25× — CSS 전환/애니메이션의 playbackRate 만 바꾼다 (복사되는 CSS는 그대로) */
  var rate = 1;
  var slow = $('[data-slowmo]');
  ['transitionrun', 'animationstart'].forEach(function (ev) {
    document.addEventListener(ev, function (e) {
      if (rate === 1 || !e.target.getAnimations) return;
      e.target.getAnimations({ subtree: true }).forEach(function (an) { an.playbackRate = rate; });
    }, true);
  });
  slow.addEventListener('click', function () {
    rate = rate === 1 ? 0.25 : 1;
    slow.setAttribute('aria-pressed', String(rate !== 1));
    document.getAnimations().forEach(function (an) { an.playbackRate = rate; });
  });

  /* 6. 테마 */
  var themeBtn = $('[data-theme-toggle]');
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  function isDark() { var t = document.documentElement.dataset.theme; return t ? t === 'dark' : mq.matches; }
  function syncTheme() { themeBtn.setAttribute('aria-pressed', String(isDark())); themeBtn.textContent = isDark() ? '다크 켜짐' : '다크'; }
  themeBtn.addEventListener('click', function () {
    var t = isDark() ? 'light' : 'dark';
    document.documentElement.dataset.theme = t;
    try { localStorage.setItem('arrow-theme', t); } catch (e) { /* 저장 불가 환경 */ }
    syncTheme();
  });
  if (mq.addEventListener) mq.addEventListener('change', syncTheme);
  syncTheme();

  /* 7. 복사 */
  function copyText(text, btn) {
    if (!btn.dataset.label) btn.dataset.label = btn.textContent;
    var done = function (msg) { btn.textContent = msg; setTimeout(function () { btn.textContent = btn.dataset.label; }, 1400); };
    var fallback = function () {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', ''); ta.style.position = 'fixed'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); done('복사됨'); } catch (e) { done('복사 실패'); }
      ta.remove();
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function () { done('복사됨'); }, fallback);
    else fallback();
  }
  document.addEventListener('click', function (e) {
    var b = e.target.closest('[data-copy],[data-copy-set]');
    if (!b) return;
    if (b.dataset.copy) copyText(D.codeFor(items.filter(function (a) { return a.id === b.dataset.copy; })[0], B), b);
    else copyText(D.setCode(S, S.SETS[parseInt(b.dataset.copySet, 10)], B), b);
  });

  /* 8. #번호 로 이동 + 강조 */
  function flash() {
    var id = decodeURIComponent(location.hash.slice(1));
    var t = id && document.getElementById(id);
    if (!t || !t.classList.contains('g-card')) return;
    t.scrollIntoView({ block: 'center' });
    t.classList.add('is-flash');
    setTimeout(function () { t.classList.remove('is-flash'); }, 1600);
  }
  window.addEventListener('hashchange', flash);
  flash();
})();
```

- [ ] **Step 10: 페이지**

```html path=index.html
<!doctype html>
<html lang="ko">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>화살표·버튼 모션 도감</title>
<meta name="description" content="캐러셀·페이지네이션·가로 스크롤·페이지 넘김 화살표와 버튼 모션을 출처·수치·코드와 함께 모은 라이브 도감">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500&family=Noto+Sans+KR:wght@400;500;600;700;800&display=swap">
<link rel="stylesheet" href="assets/ds/colors_and_type.css?v=1">
<link rel="stylesheet" href="assets/theme.css?v=1">
<link rel="stylesheet" href="assets/gallery.css?v=1">
<script>try { var t = localStorage.getItem('arrow-theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}</script>
</head>
<body>
<header class="g-head g-wrap">
  <p class="g-eyebrow">Arrow &amp; Button Motion Reference · 2026-11-26</p>
  <h1 class="g-title">화살표·버튼 모션 도감</h1>
  <p class="g-lead">캐러셀, 페이지네이션, 가로 스크롤, 페이지 넘김에 쓰는 좌우 화살표와 버튼 모션 <strong data-count>0</strong>종, 그리고 버튼 전체를 한 모션 언어로 묶는 세트 4개. 직접 호버하고 눌러본 뒤 <strong>번호로 지시</strong>하면 된다. 예: “B-04처럼”, “모션 세트 S2로 T07”.</p>
  <p class="g-note">‘느리게’를 켜면 CSS 모션이 0.25배속으로 재생된다. ‘추정’은 출처에 수치가 없어 재현값을 쓴 항목. 카드의 ‘코드 복사’는 HTML·CSS·동작 JS를 한 번에 복사한다.</p>
</header>
<nav class="g-bar" aria-label="필터와 도구">
  <div class="g-wrap g-bar-in">
    <div class="g-chips" data-filters></div>
    <div class="g-tools">
      <input class="g-search" type="search" placeholder="이름·느낌·용도 검색" aria-label="검색" data-search>
      <button class="g-toggle" type="button" aria-pressed="false" data-slowmo>느리게 0.25×</button>
      <button class="g-toggle" type="button" aria-pressed="false" data-theme-toggle>다크</button>
    </div>
  </div>
</nav>
<main class="g-wrap" data-sections>
  <p class="g-empty" data-empty hidden>검색 결과가 없다.</p>
</main>
<footer class="g-foot g-wrap">
  <p>모든 항목은 실제 출처(라이브러리 CSS·소스, 디자인 시스템 문서, 라이브 사이트 계산값)를 확인해 재현했다. 색은 PARAMETA DS 흑백 토큰으로 통일했고 원래 색은 스펙에 적었다.</p>
  <p>번호별 스펙: ARROWS.md · 리서치 원문: research/ · 생성: node scripts/build-md.mjs</p>
</footer>
<script src="data/core.js?v=1"></script>
<script src="data/A.js?v=1"></script>
<script src="data/B.js?v=1"></script>
<script src="data/C.js?v=1"></script>
<script src="data/D.js?v=1"></script>
<script src="data/E.js?v=1"></script>
<script src="data/F.js?v=1"></script>
<script src="data/G.js?v=1"></script>
<script src="data/sets.js?v=1"></script>
<script src="assets/behaviors.js?v=1"></script>
<script src="assets/gallery.js?v=1"></script>
</body>
</html>
```

- [ ] **Step 11: 빈 페이지 확인** — 브라우저 패널로 `index.html` 열기, 콘솔 에러 0, 헤더·필터 바 보임.

---

### Task 2: 카테고리 데이터 (서브에이전트 5개 병렬)

**Files:** 각 에이전트는 자기 파일만 만든다. 다른 파일 수정 금지.

| 에이전트 | 파일 | 리서치 원문 | 예상 수 |
|---|---|---|---|
| W-A | `data/A.js` | `research/A-carousel.md` | 29 |
| W-B | `data/B.js` | `research/B-pagination.md` | 27 |
| W-CF | `data/C.js`, `data/F.js` | `research/C-micro-interactions.md` (F는 끝의 글리프 목록) | 37 + 12 |
| W-DE | `data/D.js`, `data/E.js` | `research/DE-scroll-pageturn.md` (D=가로 스크롤 절, E=페이지 넘김·커서 절) | 14 + 17 |
| W-G | `data/G.js` | `research/G-buttons.md` (버튼 리서치 도착 후) | 45–70 |

**Interfaces — Consumes:** Task 1의 `ARROW_DATA.add / addIcons / svg`, 아이콘 키, `ARROW_BEHAVIORS` 마크업 계약(함수 위 주석), 스테이지 크기(카드 폭 최소 320px, 스테이지 높이 192px, `tall: true`면 256px, 안쪽 패딩 16px).

- [ ] **Step 1: 각 에이전트에 아래 브리프로 디스패치** (`{CAT}`, `{FILES}`, `{RESEARCH}` 치환)

```text
너는 /Users/sang/Desktop/arrow 의 "화살표·버튼 모션 도감"에서 {CAT} 카테고리 데이터 파일 {FILES} 만 작성한다. 다른 파일은 절대 수정하지 마.

먼저 읽을 것:
1. {RESEARCH} — 리서치 원문. 항목마다 출처 URL·모양·상태·모션 수치가 있다. 이게 내용의 근거다.
2. data/core.js — 아이콘 키 목록, ARROW_DATA.add / addIcons / svg API, 카테고리 설명.
3. assets/behaviors.js — 데모 동작(carousel, scroller, pager, book, cursor, replay, toggle, sequence, hold, magnetic, spotlight, direction, segmented, menu)과 각 마크업 계약(함수 위 주석).
4. assets/gallery.css 의 .g-stage (데모가 들어갈 무대: 폭 288px 이상, 높이 160px 안쪽, tall이면 224px 안쪽, 배경 var(--bg-2), position:relative, overflow:hidden).
5. tests/data.test.mjs — 통과해야 하는 규칙.

할 일: 리서치의 항목 하나당 카드 하나. 원문 순서를 따르되 같은 성격끼리 group 으로 묶고(그룹은 번호상 연속이어야 함), 번호는 {CAT}-01부터 빈틈없이. 출처를 확인할 수 없어 리서치에서 빠진 것은 만들지 마.
파일 형식:
  /* {CAT} — 카테고리 이름. 출처: {RESEARCH} */
  ARROW_DATA.add([ {항목}, ... ]);

항목 스키마 (텍스트는 전부 한국어, 고유명사·수치·CSS 값은 원문 그대로):
{
  id: '{CAT}-01',
  group: '라이브러리 기본',            // 선택. 같은 그룹은 연속 번호
  name: 'Swiper 기본 셰브론',          // 짧게
  source: 'Swiper 11',                 // 출처 이름
  url: 'https://…',                    // 리서치에 있는 실제 URL
  look: '배치·모양·아이콘·크기. 원래 색은 여기에 수치로 (예: 원본 #007aff)',
  states: '호버/누름/끝(비활성·숨김)/포커스/표시 조건',
  motion: { trigger: '호버', change: '불투명도 .7→.9', timing: '200ms ease', inferred: false },  // 수치 없으면 inferred:true
  feel: ['담백', '기본값'],             // 2~4개
  fits: ['캐러셀', '히어로 배너'],      // 1~3개
  tall: false,                         // 높은 무대가 필요하면 true
  demo: `<div class="{CAT}-01" …>…</div>`,   // 아이콘은 {{i:chev-r}} 처럼
  css: `.{CAT}-01 { … }`
}

데모 규칙 (테스트가 검사함):
- 데모 루트 요소에 class="{번호}" 필수. CSS는 전부 .{번호} 아래로 범위 지정. @keyframes 이름은 {번호}- 로 시작.
- 색은 DS 시맨틱 토큰만: var(--fg-1..4) var(--bg-1) var(--bg-2) var(--border-subtle|border|border-strong). 반투명은 color-mix(in srgb, var(--fg-1) 40%, transparent).
  #hex, rgb(), hsl(), 색 이름, --gray-*, --fg-inverse 금지. 반전(검은 버튼 흰 글자)은 background: var(--fg-1); color: var(--bg-1); → 다크모드에서 자동 반전.
- "사진 위 화살표"는 슬라이드를 var(--fg-3) 같은 진한 면으로 칠하고 화살표를 var(--bg-1)로. 슬라이드 번호 텍스트로 내용 표시.
- 간격·라운드·그림자는 var(--space-1..12) var(--radius-sm|md|pill) var(--shadow-sm..xl). 폰트는 var(--text-14|16|18|22|24|32) 등 DS 스케일만, 굵기 var(--weight-*).
- 모션 수치(ms, cubic-bezier, 거리 px)는 리서치 값 그대로 리터럴. 이게 이 도감의 핵심이다. 수치가 "없음/즉시"면 transition 없이 상태만 보여준다.
- 동작은 data-behavior="…"로만 (inline script, on*=, id 속성 금지). 캐러셀은 carousel, 가로 스크롤은 scroller, 페이지 번호는 pager, 책장은 book, 커서 화살표는 cursor(+carousel), 클릭 재생은 replay, 눌림 토글은 toggle, 로딩/성공은 sequence, 길게 누르기는 hold 등.
- 버튼은 진짜 <button type="button">, 아이콘만 있으면 aria-label (한국어). 호버만으로 보이는 화살표는 :focus-visible/:focus-within 으로도 보이게.
- 무대 크기 안에 들어가게. 가로가 넘치면 안 된다(무대 overflow:hidden). 캐러셀은 슬라이드 3~5장, 무대를 꽉 채우려면 루트에 position:absolute; inset:0 또는 width:100%.
- 원본 브랜드 색·로고는 재현하지 않는다. 모양·배치·모션만 재현.
- 아이콘이 core.js에 없으면 파일 맨 위에서 ARROW_DATA.addIcons({ '{소문자 카테고리}-이름': ARROW_DATA.svg('<path d="…"/>') }) 로 추가 (24×24, stroke 기준).
- prefers-reduced-motion 처리는 갤러리가 한다. 루프 애니메이션은 걸어도 된다.

검증 (모두 통과할 때까지 고친다):
  cd /Users/sang/Desktop/arrow && node --test --test-name-pattern="\[{CAT}\]" tests/data.test.mjs
(카테고리가 둘이면 각각 실행.) 다른 카테고리 실패는 무시한다(다른 에이전트가 작업 중).

끝나면 보고: 만든 항목 수, 리서치에서 뺀 항목과 이유, 무대에 넣기 어려웠던 항목, 테스트 결과 요약. 3~8줄.
```

- [ ] **Step 2: 각 에이전트 완료 후 해당 카테고리 테스트 재실행으로 확인**

Run: `node --test --test-name-pattern="\[A\]" tests/data.test.mjs` (카테고리별)
Expected: PASS

---

### Task 3: 모션 세트 매트릭스 (`data/sets.js`)

**Files:** Modify: `data/sets.js` (스텁 교체)

**근거:** `research/S-motion-sets.md`. S3 스프링 `linear()` 값은 M3 Expressive 감쇠비/강성을 질량 1 감쇠 진동으로 샘플링한 것 (spatial-fast 0.6/800 → 350ms, spatial-default 0.8/380 → 400ms, SwiftUI bouncy ζ0.7 → 700ms).

- [ ] **Step 1: 세트 파일 작성**

```js path=data/sets.js
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
        { label: 'SwiftUI .smooth (bounce 0)', url: 'https://developer.apple.com/tutorials/data/documentation/swiftui/spring/smooth(duration:extrabounce:).json' }
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
    '.mb:active { transform: scale(var(--m-press-scale)); transition-duration: var(--m-press-dur); transition-timing-function: var(--m-press-ease); }',
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
        '.T03 span { background: linear-gradient(currentColor, currentColor) left bottom / 0% 1px no-repeat; padding-bottom: 2px; transition: background-size var(--m-move-dur) var(--m-move-ease); }',
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
      key: 'T08', name: '홀드 확인 (삭제)', desc: '길게 누르면 1.2초 동안 채워지고 끝까지 누르면 확정. 떼면 세트 속도로 되돌아간다.',
      demo: '<button type="button" class="mb mb--line T08" data-behavior="hold" data-hold="1200"><span class="T08-fill" aria-hidden="true"></span>{{i:trash}}<span class="T08-t">길게 눌러 삭제</span></button>',
      css: [
        '.T08-fill { position: absolute; inset: 0; z-index: -1; background: var(--fg-1); transform: scaleX(0); transform-origin: left; transition: transform var(--m-release-dur) var(--m-release-ease); }',
        '.T08 .ic, .T08-t { transition: color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T08.is-holding .T08-fill { transform: scaleX(1); transition: transform 1200ms linear; }',
        '.T08.is-done .T08-fill { transform: scaleX(1); transition: none; }',
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
      demo: '<div class="T11" data-behavior="segmented" role="group" aria-label="기간"><span class="T11-ind" aria-hidden="true"></span><button type="button" data-seg>일</button><button type="button" data-seg>주</button><button type="button" data-seg>월</button><button type="button" data-seg>년</button></div>',
      css: [
        '.T11 { position: relative; display: inline-flex; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); isolation: isolate; }',
        '.T11-ind { position: absolute; top: var(--space-1); bottom: var(--space-1); left: 0; width: var(--seg-w, 0px); transform: translateX(var(--seg-x, 0px)); background: var(--fg-1); border-radius: var(--radius-sm); z-index: -1; transition: transform var(--m-move-dur) var(--m-move-ease), width var(--m-move-dur) var(--m-move-ease); }',
        '.T11 button { padding: var(--space-2) var(--space-4); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); font-weight: var(--weight-medium); color: var(--fg-2); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T11 button[aria-pressed="true"] { color: var(--bg-1); }',
        '.T11 button:active { transform: scale(var(--m-press-scale)); }'
      ].join('\n')
    },
    {
      key: 'T12', name: '스위치', desc: '손잡이가 미끄러지고, 누르는 동안 옆으로 늘어난다(스쿼시).',
      demo: '<button type="button" class="T12" role="switch" aria-checked="false" aria-label="알림" data-behavior="toggle" data-toggle><span class="T12-thumb"></span></button>',
      css: [
        '.T12 { position: relative; width: calc(var(--space-7) - var(--space-1)); height: var(--space-5); padding: 0; background: var(--bg-1); border: 1px solid var(--border-strong); border-radius: var(--radius-pill); cursor: pointer; transition: background-color var(--m-hover-dur) var(--m-hover-ease), border-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T12-thumb { position: absolute; top: 2px; left: 2px; width: calc(var(--space-4) + var(--space-1)); height: calc(var(--space-4) + var(--space-1)); background: var(--fg-1); border-radius: var(--radius-pill); transition: transform var(--m-move-dur) var(--m-move-ease), width var(--m-press-dur) var(--m-press-ease), background-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T12:active .T12-thumb { width: var(--space-5); }',
        '.T12.is-on { background: var(--fg-1); border-color: var(--fg-1); }',
        '.T12.is-on .T12-thumb { background: var(--bg-1); transform: translateX(calc(var(--space-5) - var(--space-1))); }',
        '.T12.is-on:active .T12-thumb { transform: translateX(calc(var(--space-4) - var(--space-1))); }',
        '.T12:focus-visible { outline: none; box-shadow: 0 0 0 2px var(--bg-2), 0 0 0 4px var(--fg-1); }'
      ].join('\n')
    },
    {
      key: 'T13', name: 'FAB 메뉴', desc: '+가 ×로 돌고, 항목이 30ms 간격으로 세트의 등장 모션을 따라 펼쳐진다.',
      demo: '<div class="T13" data-behavior="menu"><div class="T13-items"><button type="button" class="mb mb--line mb--icon" aria-label="다운로드">{{i:download}}</button><button type="button" class="mb mb--line mb--icon" aria-label="공유">{{i:share}}</button><button type="button" class="mb mb--line mb--icon" aria-label="저장">{{i:bookmark}}</button></div><button type="button" class="mb mb--icon T13-fab" data-menu-trigger aria-expanded="false" aria-label="메뉴">{{i:plus}}</button></div>',
      css: [
        '.T13 { display: flex; align-items: center; gap: var(--space-2); }',
        '.T13-items { display: flex; gap: var(--space-2); }',
        '.T13-items .mb { --_bg: var(--bg-1); opacity: 0; pointer-events: none; transform: translateX(var(--space-2)) scale(var(--m-enter-scale)); transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease); }',
        '.T13.is-open .T13-items .mb { opacity: 1; pointer-events: auto; transform: none; transition-duration: var(--m-enter-dur); transition-timing-function: var(--m-enter-ease); }',
        '.T13.is-open .T13-items .mb:nth-child(3) { transition-delay: 0ms; }',
        '.T13.is-open .T13-items .mb:nth-child(2) { transition-delay: 30ms; }',
        '.T13.is-open .T13-items .mb:nth-child(1) { transition-delay: 60ms; }',
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
        '.T14-pop { position: absolute; top: calc(100% + var(--space-1)); left: 0; z-index: 1; display: grid; min-width: 100%; padding: var(--space-1); background: var(--bg-1); border: 1px solid var(--border); border-radius: var(--radius-md); box-shadow: var(--shadow-md); transform-origin: top left; opacity: 0; pointer-events: none; transform: translateY(calc(var(--m-enter-y) * -1)) scale(var(--m-enter-scale)); transition: opacity var(--m-exit-dur) var(--m-exit-ease), transform var(--m-exit-dur) var(--m-exit-ease); }',
        '.T14.is-open .T14-pop { opacity: 1; pointer-events: auto; transform: none; transition-duration: var(--m-enter-dur); transition-timing-function: var(--m-enter-ease); }',
        '.T14-pop button { padding: var(--space-2) var(--space-3); font: inherit; font-size: var(--text-14); line-height: var(--lh-14); text-align: left; white-space: nowrap; color: var(--fg-1); background: none; border: 0; border-radius: var(--radius-sm); cursor: pointer; transition: background-color var(--m-hover-dur) var(--m-hover-ease); }',
        '.T14-pop button:hover { background: var(--bg-2); }'
      ].join('\n')
    },
    {
      key: 'T15', name: '페이지네이션 (카운터)', desc: '화살표는 T05와 같은 밀림, 숫자는 넘기는 방향에서 들어온다.',
      demo: '<nav class="T15" data-behavior="pager" data-total="12" aria-label="페이지"><button type="button" class="mb mb--line mb--icon T15-b" data-prev aria-label="이전 페이지">{{i:chev-l}}</button><span class="T15-label" data-label aria-live="polite"></span><button type="button" class="mb mb--line mb--icon T15-b" data-next aria-label="다음 페이지">{{i:chev-r}}</button></nav>',
      css: [
        '.T15 { display: flex; align-items: center; gap: var(--space-3); }',
        '.T15-label { min-width: var(--space-9); font-family: var(--font-mono); font-size: var(--text-14); line-height: var(--lh-14); text-align: center; color: var(--fg-1); }',
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
```

- [ ] **Step 2: 세트 테스트**

Run: `cd /Users/sang/Desktop/arrow && node --test --test-name-pattern="\[S\]" tests/data.test.mjs`
Expected: PASS

---

### Task 4: 통합 검증

- [ ] **Step 1:** `node --test tests/data.test.mjs` 전체 PASS
- [ ] **Step 2:** `node scripts/build-md.mjs` → `ARROWS.md 생성: 항목 N종, 세트 4 × 버튼 15`
- [ ] **Step 3:** 브라우저 패널(데스크톱): 콘솔 에러 0. 카테고리별로 3~4개씩 호버·클릭·스크롤 동작 확인, 매트릭스 4열에서 세트별 차이가 보이는지, 느리게 토글, 코드 복사, #번호 이동.
- [ ] **Step 4:** 375px 모바일: 페이지 가로 스크롤 없음(`document.documentElement.scrollWidth <= innerWidth`), 매트릭스가 세트 탭 1열로 바뀜.
- [ ] **Step 5:** 다크 토글: 모든 데모가 반전돼도 보이는지(흰 바탕 흰 글자 없음) 샘플 확인.
- [ ] **Step 6:** 발견된 데모 문제는 해당 `data/X.js`를 고치고 Step 1부터 반복.

### Task 5: 공유 링크 발행

- [ ] **Step 1:** Artifact quickstart(intent: other) → artifact-design 지침 확인
- [ ] **Step 2:** `index.html` + `files`(data/*.js, assets/**) 로 발행. 로컬 파일은 그대로 유지.
