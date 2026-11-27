import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { loadAll, buildMd, ROOT } from '../scripts/lib.mjs';

const ALL = loadAll();
const { D, S, B } = ALL;
const FONT_PX = new Set([14, 16, 18, 22, 24, 26, 32, 36, 48, 60, 72]);
const FONT_VAR = /^var\(--text-(14|16|18|22|24|26|32|36|48|60|72)\)$/;
const BANNED_TOKENS = /var\(--(fg-accent|bg-violet|bg-3|shadow-violet|color-link|color-focus)(?![\w-])/;
const REQUIRED = ['id', 'name', 'source', 'url', 'look', 'states', 'demo', 'css'];
const classTokens = (html) => [...html.matchAll(/class="([^"]*)"/g)].flatMap((m) => m[1].split(/\s+/));

function colorRules(label, css) {
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '');
  assert.doesNotMatch(clean, /#[0-9a-fA-F]{3,8}\b/, `${label}: #hex 색 금지 — DS 토큰 사용`);
  assert.doesNotMatch(clean, /\b(rgba?|hsla?|oklch|oklab|lab|lch|hwb)\(/, `${label}: 색 함수 금지 — DS 토큰/color-mix 사용`);
  assert.doesNotMatch(clean, /:\s*(white|black|gray|grey|red|blue|green)\b/, `${label}: 색 이름 금지`);
  assert.doesNotMatch(clean, /var\(--(gray|purple|para|point)-/, `${label}: 원시 팔레트 대신 시맨틱 토큰(--fg-*, --bg-*, --border*)`);
  assert.doesNotMatch(clean, /var\(--fg-inverse\)/, `${label}: --fg-inverse 대신 var(--bg-1)`);
  assert.doesNotMatch(clean, BANNED_TOKENS, `${label}: 보라 액센트·링크·포커스 색 토큰 금지 (--fg-accent/--bg-violet/--bg-3/--shadow-violet/--color-link/--color-focus)`);
  for (const m of clean.matchAll(/font-size\s*:\s*([^;}]+)/g)) {
    const v = m[1].trim();
    if (FONT_VAR.test(v) || v === 'inherit' || v === '0') continue;
    const px = v.match(/^(\d+)px$/);
    assert.ok(px && FONT_PX.has(+px[1]), `${label}: font-size ${v} 는 DS 스케일만 (14/16/18/22/24/26/32/36/48/60/72, var(--text-같은 숫자))`);
  }
}

/* CSS 를 최상위 블록 [{prelude, body}] 으로 나눈다 — 문자열·괄호 안의 { } ; , 는 무시 */
function blocks(src) {
  const out = [];
  let i = 0, start = 0, paren = 0, quote = null;
  while (i < src.length) {
    const c = src[i];
    if (quote) { if (c === '\\') i++; else if (c === quote) quote = null; i++; continue; }
    if (c === '"' || c === "'") quote = c;
    else if (c === '(') paren++;
    else if (c === ')') paren--;
    else if (c === ';' && !paren) start = i + 1;
    else if (c === '{' && !paren) {
      let depth = 1, j = i + 1, q = null;
      for (; j < src.length && depth; j++) {
        const d = src[j];
        if (q) { if (d === '\\') j++; else if (d === q) q = null; continue; }
        if (d === '"' || d === "'") q = d;
        else if (d === '{') depth++;
        else if (d === '}') depth--;
      }
      out.push({ prelude: src.slice(start, i).trim(), body: src.slice(i + 1, j - 1) });
      i = start = j;
      continue;
    }
    i++;
  }
  return out;
}
const GROUP_AT = /^@(media|supports|container|layer)\b/;
/* 일반 규칙 셀렉터 목록. @media/@supports/@container 는 안쪽 규칙만, @keyframes/@property 등은 건너뛴다 */
function ruleSelectors(css) {
  const out = [];
  (function walk(src) {
    for (const { prelude, body } of blocks(src)) {
      if (prelude.startsWith('@')) { if (GROUP_AT.test(prelude)) walk(body); continue; }
      out.push(prelude);
    }
  })(css.replace(/\/\*[\s\S]*?\*\//g, ''));
  return out;
}
/* 쉼표로 나눈 셀렉터 조각 (괄호 안 쉼표는 유지: :is(a, b)) */
function selectorParts(sel) {
  const parts = [];
  let depth = 0, cur = '';
  for (const c of sel) {
    if (c === '(' || c === '[') depth++;
    else if (c === ')' || c === ']') depth--;
    if (c === ',' && !depth) { parts.push(cur.trim()); cur = ''; } else cur += c;
  }
  parts.push(cur.trim());
  return parts.filter(Boolean);
}
function assertScoped(label, css, ok, need) {
  for (const sel of ruleSelectors(css)) {
    for (const part of selectorParts(sel)) assert.ok(ok(part), `${label}: 셀렉터 "${part}" 가 범위 밖 — ${need} 를 포함해야 한다`);
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
      assertScoped(a.id, a.css, (part) => part.includes(`.${a.id}`), `.${a.id}`);
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

test('[S] 세트 CSS 셀렉터는 모두 .T## 또는 .mb 범위 안', () => {
  const scoped = (part) => /\.(T\d{2}|mb)(?![\w])/.test(part);
  assertScoped('BASE', S.BASE, scoped, '.mb');
  for (const t of S.TYPES) assertScoped(t.key, t.css, scoped, `.${t.key} 또는 .mb`);
});

test('[JS] 복사용 동작 코드가 빈 페이지에서 독립 실행된다', () => {
  const names = Object.keys(B);
  assert.equal(names.length, 14, `동작 14개 (지금 ${names.length})`);
  const noop = () => {};
  const ctx = vm.createContext({
    console,
    document: { querySelectorAll: () => [], addEventListener: noop, activeElement: null },
    ResizeObserver: function () { this.observe = noop; this.disconnect = noop; },
    requestAnimationFrame: (f) => 0,
    setTimeout: () => 0,
    clearTimeout: noop
  });
  ctx.window = ctx;
  vm.runInContext(D.jsFor(names, B), ctx, { filename: 'jsFor.js' });
  for (const n of names) {
    assert.equal(typeof ctx[n], 'function', `${n} 가 독립 함수로 정의되지 않음`);
    assert.ok(B[n].toString().includes(`data-${n}-bound`), `${n}: 첫 줄에서 data-${n}-bound 로 중복 연결 방지`);
  }
  assert.match(D.jsFor(['carousel'], B), /\[data-behavior~="carousel"\]:not\(\[data-carousel-bound\]\)/);
});

test('[MD] ARROWS.md 가 데이터와 같다', () => {
  const md = readFileSync(path.join(ROOT, 'ARROWS.md'), 'utf8');
  assert.ok(md === buildMd(ALL), 'ARROWS.md 가 오래됐다 — node scripts/build-md.mjs 를 다시 실행');
});

test('[MD] 항목 수만큼 섹션이 생성된다', () => {
  const md = buildMd(ALL);
  assert.equal((md.match(/^### [A-G]-\d{2} /gm) || []).length, D.ARROWS.length);
  assert.equal((md.match(/^#### T\d{2} /gm) || []).length, S.TYPES.length);
});
