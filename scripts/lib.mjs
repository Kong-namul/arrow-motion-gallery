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
