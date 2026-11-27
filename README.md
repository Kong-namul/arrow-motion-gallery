# 화살표·버튼 모션 도감

캐러셀·페이지네이션·가로 스크롤·페이지 넘김에 쓰는 좌우 화살표와 버튼 모션 211종, 그리고 버튼 15종을 호버 스타일 6가지 × 타이밍 4가지로 묶은 모션 세트 매트릭스. 꺾쇠·삼각형 화살표는 무게중심 기준 광학 보정.

- 사이트: https://kong-namul.github.io/arrow-motion-gallery/
- 번호별 스펙(HTML·CSS·JS·출처·수치): [ARROWS.md](ARROWS.md) — "B-04처럼", "스윕(H2) + 실크(S2)로 T07"처럼 번호로 지시한다.
- 리서치 원문(출처 URL): [research/](research/)

## 로컬

```bash
node scripts/serve.mjs        # http://127.0.0.1:4173
node --test tests/data.test.mjs
node scripts/build-md.mjs     # data/*.js → ARROWS.md
```

색·폰트·간격·라운드·그림자·모션은 도감 토큰(`assets/tokens.css`)만 쓴다. 데이터 SSOT는 `data/*.js`.
