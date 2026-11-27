# 화살표·버튼 모션 도감

캐러셀·페이지네이션·가로 스크롤·페이지 넘김에 쓰는 좌우 화살표와 버튼 모션 211종, 그리고 버튼 전체를 한 모션 언어로 묶는 모션 세트 매트릭스.

- 사이트: https://kong-namul.github.io/arrow-motion-gallery/
- 번호별 스펙(HTML·CSS·JS·출처·수치): [ARROWS.md](ARROWS.md) — "B-04처럼", "모션 세트 S2로 T07"처럼 번호로 지시한다.
- 리서치 원문(출처 URL): [research/](research/)

## 로컬

```bash
node scripts/serve.mjs        # http://127.0.0.1:4173
node --test tests/data.test.mjs
node scripts/build-md.mjs     # data/*.js → ARROWS.md
```

색·폰트·간격은 PARAMETA DS 토큰(`assets/ds/`)만 쓴다. 데이터 SSOT는 `data/*.js`.
