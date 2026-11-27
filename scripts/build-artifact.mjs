// 공유 링크(Artifact) 발행용 사본: index.html 에서 doctype/html/head/body 래퍼만 걷어 dist/index.html 로 쓴다.
// 발행 플랫폼이 래퍼를 직접 씌우기 때문. 로컬 index.html 은 그대로 둔다.
// - <html lang="ko"> 가 사라지므로 상단 인라인 스크립트에서 lang 을 다시 단다.
// - 발행 CSP 는 구글 폰트 스타일시트만 허용 → DS tokens.css 의 외부 @import(Pretendard CDN)를 뺀 사본을 dist/assets/ds/ 에 만든다.
//   (DS 원본 assets/ds/* 는 수정하지 않는다. 한글은 DS 폰트 스택의 Noto Sans KR 로 대체된다.)
// - index.html 이 참조하는 로컬 파일이 모두 있고 발행 목록에 들어 있는지 확인하고, 없으면 실패한다.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, statSync, existsSync } from 'node:fs';
import path from 'node:path';
import { ROOT } from './lib.mjs';

const fail = (msg) => { console.error('build-artifact 실패: ' + msg); process.exit(1); };
const EXTERNAL_IMPORT = /^[ \t]*@import\s+(?:url\()?\s*['"]?(?:https?:)?\/\/[^\n]*\n?/gm;

// 1. dist/index.html
const src = readFileSync(path.join(ROOT, 'index.html'), 'utf8');
let out = src
  .replace(/<!doctype html>\s*/i, '')
  .replace(/<html[^>]*>\s*/i, '')
  .replace(/<\/html>\s*/i, '')
  .replace(/<head>\s*/i, '')
  .replace(/<\/head>\s*/i, '')
  .replace(/<body>\s*/i, '')
  .replace(/<\/body>\s*/i, '')
  .replace(/<meta charset="utf-8">\s*/i, '')
  .replace(/<meta name="viewport"[^>]*>\s*/i, '');
if (!/<script>/.test(out)) fail('index.html 에 상단 인라인 <script> 가 없어 lang 을 넣을 수 없다');
out = out.replace(/<script>/, "<script>document.documentElement.lang = 'ko'; ");
mkdirSync(path.join(ROOT, 'dist'), { recursive: true });
writeFileSync(path.join(ROOT, 'dist/index.html'), out);

// 2. DS 사본 (외부 @import 줄만 뺀다)
const dsOut = path.join(ROOT, 'dist/assets/ds');
mkdirSync(dsOut, { recursive: true });
writeFileSync(path.join(dsOut, 'tokens.css'), readFileSync(path.join(ROOT, 'assets/ds/tokens.css'), 'utf8').replace(EXTERNAL_IMPORT, ''));
writeFileSync(path.join(dsOut, 'colors_and_type.css'), readFileSync(path.join(ROOT, 'assets/ds/colors_and_type.css'), 'utf8'));

// 3. 함께 올릴 파일 목록 (발행 경로 → 원본 경로)
const files = {};
const walk = (dir) => {
  for (const name of readdirSync(path.join(ROOT, dir))) {
    const rel = path.posix.join(dir, name);
    if (statSync(path.join(ROOT, rel)).isDirectory()) walk(rel);
    else if (/\.(js|css)$/.test(name)) files[rel] = rel;
  }
};
walk('data');
walk('assets');
files['assets/ds/tokens.css'] = 'dist/assets/ds/tokens.css';
files['assets/ds/colors_and_type.css'] = 'dist/assets/ds/colors_and_type.css';

// 4. 검증: 참조 파일 존재 + 발행 목록 포함, 발행 CSS 에 외부 @import 없음
const refs = [...out.matchAll(/\s(?:src|href)="([^"]+)"/g)]
  .map((m) => m[1])
  .filter((u) => !/^(?:[a-z][a-z0-9+.-]*:|\/\/|#)/i.test(u))
  .map((u) => u.replace(/[?#].*$/, ''));
const missing = refs.filter((r) => !files[r] || !existsSync(path.join(ROOT, files[r])));
if (missing.length) fail('index.html 이 참조하는 파일이 없거나 발행 목록에 없다: ' + missing.join(', '));
for (const [pub, from] of Object.entries(files)) {
  if (!pub.endsWith('.css')) continue;
  const css = readFileSync(path.join(ROOT, from), 'utf8');
  if (new RegExp(EXTERNAL_IMPORT.source, 'm').test(css)) fail(`${pub} 에 외부 @import 가 남아 있다 (발행 CSP 에서 막힘)`);
  for (const m of css.matchAll(/@import\s+(?:url\()?\s*['"]?([^'")\s;]+)/g)) {
    const target = path.posix.join(path.posix.dirname(pub), m[1]);
    if (!files[target]) fail(`${pub} 의 @import ${m[1]} → ${target} 가 발행 목록에 없다`);
  }
}
console.log(JSON.stringify(files, null, 2));
