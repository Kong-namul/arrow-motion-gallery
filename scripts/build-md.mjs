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
