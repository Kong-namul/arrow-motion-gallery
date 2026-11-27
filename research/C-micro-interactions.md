# 화살표 마이크로인터랙션 리서치

> 리서치 에이전트 원문 보고서 (2026-11-26). 모든 항목은 실제 URL 확인. (inferred) = 추정값.

## Arrow micro-interaction catalog (37 items)

**How I checked the sources.** CodePen, tympanus.net and uiverse.io all blocked my fetcher (Cloudflare/403). So:
- **Codrops values** come from the official repos on GitHub.
  - "ANS" means Codrops Arrow Navigation Styles: article https://tympanus.net/codrops/2014/05/28/arrow-navigation-styles/, demo https://tympanus.net/Development/ArrowNavigationStyles/. Numbers are from https://github.com/codrops/ArrowNavigationStyles/blob/master/css/component.css.
- **Uiverse values** come from the official mirror at https://github.com/uiverse-io/galaxy/tree/main/Buttons, file `<author>_<slug>.html`. The public URL is uiverse.io/<author>/<slug>.
- **CodePen pens are left out** because I couldn't open any of them.
- CSS `transition: .3s` with no timing function means the default `ease`.

---

- name: Nudge-and-return (one-shot)
  source: lucide-animated — https://lucide-animated.com/icons/chevron-right (code: https://lucide-animated.com/r/chevron-right.json); itshover — https://github.com/Nani-LM10/itshover/tree/master/icons
  look: 24px stroke chevron-right / circle-chevron-right / arrow-narrow-right
  motion: mouseenter → x [0, 2, 0], times [0, .4, 1], 500ms (Motion default ease). Lucide arrow-big-right: x [0, 3, 0] 400ms. itshover arrow-narrow-right: x [0, 4, 0] 500ms easeInOut; on leave x→0 200ms easeOut; arrow-back: x [0, −3, 0] 400ms
  feel: polite, subtle
  fits: pagination prev/next, list-row chevrons, carousel arrows
  css_hint: `@keyframes nudge{40%{transform:translateX(2px)}}` `.btn:hover svg{animation:nudge .5s ease-in-out}`

- name: Recoil / bow-draw arrow
  source: lucide-animated arrow-right — https://lucide-animated.com/r/arrow-right.json
  look: shaft path + chevron head
  motion: hover → shaft d "M5 12h14"→"M5 12h9"→"M5 12h14"; head translateX [0, −3, 0]; 400ms
  feel: springy, anticipatory
  fits: "Next" CTA, carousel next
  css_hint: shaft `transform-origin:left` with scaleX(.64) at 50%; head translateX(-3px) at 50%

- name: Speed-dash push
  source: itshover arrow-big-right-dash-icon.tsx — https://github.com/Nani-LM10/itshover/tree/master/icons
  look: fat arrow with a trailing dash
  motion: hover → arrow x 4 and dash scale 1.2 + opacity .7, both 300ms easeOut; leave → 200ms easeInOut
  feel: sporty, fast
  fits: skip / fast-forward, CTA

- name: Squash-and-stretch arrow (line-extend)
  source: Josh W. Comeau — https://joshwcomeau.com/animation/squash-and-stretch
  look: 24px arrow, separate shaft and tip paths
  motion: hover → shaft "M 5,12 h 14"→"h 17"; tip "M 12,5 l 7,7 l -7,7"→"M 15,7 l 7,5 l -7,5". The tip moves +3 and flattens from 14 to 10 tall. CSS version: `transition: d 300ms`. JS version: spring stiffness 300, damping 12, triggered on pointerenter and reverted after 150ms
  feel: elastic, cartoony, alive
  fits: "Read more", next-article CTA
  css_hint: `.shaft,.tip{transition:d 300ms}` `a:hover .tip{d:path("M 15,7 l 7,5 l -7,5")}`. Gate with prefers-reduced-motion:no-preference (no Safari support)

- name: Chevron grows a shaft (Stripe-style)
  source: Adam Wathan — https://typefully.com/adamwathan/recreating-stripes-arrow-animation-with-NnPxtVr
  look: pill button, chevron with a hidden line
  motion: group-hover → line opacity 0→1, chevron translateX(3px). Duration not stated; Tailwind default 150ms cubic-bezier(.4,0,.2,1) (inferred)
  feel: crisp, premium-fintech
  fits: CTA, inline links

- name: Shaft colour-reveal (chevron→arrow)
  source: Uiverse satyamchaudharydev/modern-sheep-10
  look: 10×2px shaft painted the button colour (invisible), border-drawn chevron
  motion: hover → shaft background→white; chevron right:3px→0; 200ms
  feel: quick, tidy
  fits: CTA, pagination "Next"
  css_hint: `.arrow{width:10px;height:2px;background:var(--btn);transition:.2s}` `:hover .arrow{background:#fff}` `:hover .arrow::before{right:0}`

- name: Growing shaft + label push
  source: Uiverse escannord/lovely-gecko-23
  motion: hover → shaft width 10→25px, chevron left 3→15px, arrow and label translateX(10px); .3s
  feel: eager, forward-leaning
  fits: CTA

- name: Circle-to-pill "Learn more" (fill sweep + line-extend)
  source: Uiverse cssbuttons-io/massive-mayfly-74
  look: 3rem dark circle holding a chevron; text beside it
  motion: hover → circle width 3rem→100%, hidden shaft appears (bg none→#fff), arrow translate(1rem,0), label turns white; all .45s cubic-bezier(0.65,0,0.076,1)
  feel: smooth, confident, premium
  fits: CTA, "see all" in a carousel header

- name: Loop-through (CSS strip)
  source: Osmo — https://www.osmo.supply/resource/button-with-rotating-icon
  look: square icon tile, wipe background, rolling label
  motion: hover → a 3-arrow flex strip in a 1em overflow:hidden window moves translate(200%). The visible arrow exits right as the previous one enters from the left. At the same time the icon tile rotates 90deg, the wipe goes translate(0,175%) rotate(15deg)→(0,0) rotate(0), and the label rolls up 1.5em. All 525ms cubic-bezier(0.625,0.05,0,1), gated by `@media (hover:hover) and (pointer:fine)`
  feel: slick, agency-grade
  fits: CTA, carousel next
  css_hint: `.win{width:1em;overflow:hidden;display:flex;justify-content:flex-end}` `.list{flex:none;display:flex}` `:hover .arrow{transform:translateX(200%)}`

- name: Loop-through with anticipation (Lottie)
  source: useAnimations arrowRight — https://github.com/useAnimations/react-useanimations (icons/arrowRight.json)
  look: 24px stroke arrow, 30fps
  motion:
    - f0–5 (167ms): pull back 2px, ease-out
    - f5–13 (267ms): accelerate off to the right, cubic-bezier(.42,0,1,1)
    - f14: jump to the left edge (hold keyframe)
    - f14–25 (367ms): slide in, overshoot +1.3px, ease-out
    - f25–30: settle, ease-in-out
    - total about 1s
  feel: playful, cartoon energy
  fits: carousel next, onboarding "continue"
  css_hint: keyframes `17%{translateX(-2px)} 43%{translateX(110%)} 44%{translateX(-110%)} 83%{translateX(1.3px)} 100%{0}`

- name: Double-arrow swap (trailing → leading)
  source: Uiverse gharsh11032000/loud-chicken-53
  look: outlined pill, arrow on the right
  motion: hover:
    - trailing arrow right:16px→−25% (exits); leading arrow left:−25%→16px (enters)
    - label translateX(−12px→12px)
    - a 20px dot grows to a 220px fill
    - radius 100px→12px; outline ring 2px→12px and fades out
    - timing: .8s cubic-bezier(0.23,1,0.32,1); :active scale(.95)
  feel: fluid, generous
  fits: hero CTA

- name: Echo / ghost trail
  source: Uiverse benjimich/lovely-octopus-40
  motion: hover → copies 2 and 3 slide to right −20px / −40px at opacity .66 / .33, delays 50 / 100ms; .3s cubic-bezier(0.645,0.045,0.355,1)
  feel: speedy, motion-blur
  fits: fast-forward, horizontal scroll hint

- name: Triple-chevron cascade
  source: Uiverse Li-Deheng/shy-moth-10
  motion: hover → three chevrons fan out from translateX(−60% / −30%) to 0 (.4s / .5s). Then a colour chase runs: `color_anim 1s infinite` with delays .2 / .4 / .6s
  feel: energetic, "go go go"
  fits: swipe hint, next CTA

- name: Ping-pong inward arrows
  source: Uiverse Navarog21/ordinary-rat-19
  motion: hover → the triangle arrows swap sides (.2s), then oscillate translateX 0↔±10px with `0.6s ease-in-out infinite alternate`. Corners scale 1→1.25, staggered .05–.35s
  feel: game-like, insistent
  fits: playful CTA (too loud for pagination)

- name: Breathing idle hint
  source: Uiverse Wasim-Rana/lazy-fish-83
  motion: idle `arrow-pulse 1.5s infinite alternate` translateX 0→5px; hover → translateX(15px) .3s ease
  feel: calm, inviting
  fits: "scroll →" hint, first-visit carousel cue

- name: 3D press (chunky)
  source: Josh W. Comeau — https://www.joshwcomeau.com/animation/3d-button/ (variant: Uiverse Wasim-Rana/lazy-fish-83)
  motion: front layer translateY:
    - rest −4px: 600ms cubic-bezier(.3,.7,.4,1)
    - hover −6px: 250ms cubic-bezier(.3,.7,.4,1.5) (overshoot)
    - active −2px: 34ms
    - shadow layer: 2 / 4 / 1px
    - variant: perspective(850px) rotateX(14deg) rotateY(8deg) rotateZ(−11deg) → flat on hover, .4s ease
  feel: tactile, satisfying
  fits: big CTA, game-like next

- name: Chevron sharpen + circle pop
  source: Codrops ANS "Circle pop"
  look: chevron built from two 3px bars
  motion: hover → white disc opacity 0→1 and scale .9→1. Bars rotate ±30°→±45°, so the chevron opens. Bar colour flips. .3s. The next button is the same icon at rotate(180deg)
  feel: crisp, decisive
  fits: slider prev/next over imagery

- name: Stroke fill-along-path
  source: Codrops ANS "Fillpath" (after nizuka.fr)
  motion: hover → white overlay bars height 0→50% (colour travels along each arm). Arms rotate −135/−45° → −125/−55°, so the chevron narrows. Label fades in from translateX(−50%). All .3s
  feel: elegant, editorial
  fits: full-screen slider, page-turn

- name: Reveal drawer
  source: Codrops ANS "Reveal"
  motion: hover → 40×120px tab grows to 400px wide, showing a thumbnail and title; bg goes from alpha to solid; .4s cubic-bezier(0.7,0,0.3,1)
  feel: dramatic, symmetric
  fits: article prev/next, page-turn

- name: Rounded slide pill
  source: Codrops ANS "Rounded slide"
  motion: hover → 62px circle becomes a 200px pill, dark→white. Title goes translateX(±100%)→0 with a fade, .1s delay. All .3s
  feel: friendly, informative
  fits: blog prev/next, stepper

- name: Slit (sequenced reveal)
  source: Codrops ANS "Slit" (inspired by Jam3)
  motion: 0–300ms arrow slides out translateX(±100%); 300–600ms preview panel slides in (`transition: .3s .3s`); 600–900ms caption hinges rotateX(−90°→0)
  feel: choreographed, cinematic
  fits: gallery / project page-turn

- name: Thumb-flip preview
  source: Codrops ANS "Thumb flip" (also "Double flip")
  motion: hover → thumbnail rotateY(±90°)→0, hinged on the arrow edge (origin 0% / 100% 50%, perspective 1000px). Arrow tile goes white and the fill colour swaps. .3s
  feel: card-like, tactile
  fits: page-turn, gallery nav

- name: Preview slide-in (bar / circle)
  source: Codrops ANS "Image bar" + "Circle slide"
  motion: Image bar: arrow ±10px→0 while the image goes translateX(±100%)→0. Circle slide: disc scale .7→1 plus fade, thumbnail translateX(±100%)→0. Both .3s
  feel: light, informative
  fits: carousel arrows with a peek

- name: Magnetic pull
  source: Codrops — https://github.com/codrops/MagneticButtons (src/js/demo1/buttonCtrl.js)
  motion:
    - triggers within 0.7×width of the button
    - button follows the cursor at 0.3× offset, smoothed with lerp amount 0.1 per frame
    - label counter-moves at 0.6×
    - on enter, the label rolls: out 150ms Power2.easeIn (y −20%), back in 200ms Expo.easeOut from y 100%
  feel: sticky, alive
  fits: hero CTA, big round slider arrows
  css_hint: per rAF `pos += (target-pos)*0.1`, where `target = (mouse-center)*0.3`

- name: Bubble-hop arrow
  source: Osmo — https://www.osmo.supply/resource/button-with-bubble-arrow
  motion: hover → label pill translateX(−3.75em)→0. Leading bubble scale 0→1 (origin left) while the trailing bubble goes 1→0 (origin right). Arrow rotates −45deg. 735ms cubic-bezier(0.625,0.05,0,1)
  feel: bubbly, high-end
  fits: CTA, "visit" / external links

- name: Directional fill sweep
  source: Osmo — https://www.osmo.supply/resource/directional-button-hover
  motion: mouseenter / mouseleave → a circle is placed at the cursor's entry or exit point and scales 0→1 or 1→0, 700ms cubic-bezier(0.625,0.05,0,1). Diameter is 115% + |offset|×2. Bg colour transitions over 400ms. The demo has no arrow; pair it with any arrow
  feel: responsive, tactile
  fits: slider arrows, CTA

- name: Label shift + arrow rise
  source: Uiverse AKAspidey01/ugly-horse-68
  motion: hover → label translateX(15px→0); arrow translateY(35px→0), rising into an overflow:hidden box; .3s
  feel: neat, quiet
  fits: CTA (text makes room for the arrow)

- name: Knob travel (slide-to-go)
  source: Uiverse xantha01/fresh-earwig-7; nicm42 — https://dev.to/nicm42/a-button-with-an-arrow-that-moves-on-hover-2l07
  motion: hover → 50px arrow chip moves left:5px → calc(100% − 55px), .35s ease. nicm42 version: inset-inline-start → calc(100% − 1.75em), 250ms ease
  feel: purposeful, slide-to-confirm
  fits: onboarding next, CTA

- name: Fade-slide-in arrow (appears on hover)
  source: Uiverse vinodjangid07/fresh-tiger-82; nkhlrjrs/hungry-pig-21
  motion: vinodjangid07: arrow from translateX(−10px) opacity 0 → in place, `.6s ease-out both`. nkhlrjrs: from −50px / opacity .1 over 400ms; button shifts −5px (300ms cubic-bezier(.645,.045,.355,1)); bg 500ms cubic-bezier(.175,.885,.32,1.275)
  feel: discreet, progressive disclosure
  fits: text links, list rows

- name: Hold-forward long arrow + underline
  source: Uiverse alexmaracinaru/empty-moose-12
  motion: hover → long arrow translateX(−8px→0) .3s ease. Underline scaleX(0→1) with origin switching right→left, .25s ease-out. :active scale(.9)
  feel: understated, editorial
  fits: "Shop now" text CTA

- name: Sequential outline draw
  source: Uiverse Nawsome/chilly-moose-65
  motion: hover → the top-arm overlay sweeps (left 100%→0), then the bottom arm (right 100%→0). Each takes .15s, staggered by .15s. :active scale(.9)
  feel: crafted, precise
  fits: minimal icon-only nav

- name: Circle stroke un-draw / re-draw
  source: useAnimations arrowRightCircle — https://github.com/useAnimations/react-useanimations (icons/arrowRightCircle.json)
  motion: trim path. The ring erases over f0–30 (1s, cubic-bezier(.8,0,.8,1)), pauses 0.5s, then redraws over f45–75 (1s, cubic-bezier(.2,0,.2,1)). The arrow stays still
  feel: calm, deliberate
  fits: autoplay-progress next button
  css_hint: `circle{stroke-dasharray:62.8;stroke-dashoffset:62.8;transform:rotate(-90deg);transform-origin:center;transition:stroke-dashoffset .6s}` `:hover circle{stroke-dashoffset:0}`. For r=10, 2πr ≈ 62.8. Technique: https://byui-cse.github.io/wdd331r/unit-5/prepare/svg-interactions-animation.html

- name: Weight / fill axis morph
  source: Material Symbols — https://developers.google.com/fonts/docs/material_symbols
  motion: hover → font-variation-settings FILL 0→1 and/or wght 400→600. Ranges: wght 100–700, opsz 20–48, GRAD −50..200 (from the API example). Google says the FILL axis "provides CSS transitions between states". Duration is not given; 200ms ease-out (inferred)
  feel: weighty, subtle emphasis
  fits: pagination arrows, toolbar chevrons

- name: Lines → arrow / → X morph
  source: Sara Soueidan, Transformicons — https://www.sarasoueidan.com/blog/navicon-transformicons/
  motion:
    - lines → left arrow: button scale3d(.8); lines width size/1.8, rotate ±40deg
    - lines → X: rotate ±45deg, middle line goes transparent
    - sequenced X2: `top .3s ease, transform .3s .5s ease`
    - base transition .3s
  feel: mechanical, satisfying
  fits: back ↔ menu, chevron→X for "close preview"

- name: Ripple on click
  source: MDC ripple — https://github.com/material-components/material-components-web/tree/master/packages/mdc-ripple
  motion: pointerdown → ripple starts at the press point from scale 0.6. Radius grows over 225ms cubic-bezier(0.4,0,0.2,1); opacity in 75ms linear. Release → fade out 150ms linear
  feel: acknowledging, systematic
  fits: Material-style prev/next

- name: Gooey squash + fly-off
  source: Codrops Creative Gooey Effects "Send" — https://github.com/codrops/CreativeGooeyEffects (send.html, js/send.js); article https://tympanus.net/codrops/2015/03/10/creative-gooey-effects/
  motion: click:
    - the directional (send) icon flies off x:100, 0.3s Quad.easeIn
    - button squashes to scale .5, 0.6s Back.easeOut
    - success icon 0.1→1, 1.5s Elastic.easeOut
    - goo filter: feGaussianBlur stdDeviation 10 + feColorMatrix "…0 0 0 19 -9"
  feel: liquid, playful
  fits: submit / next CTA with a confirm state

- name: Press-down scale
  source: Emil Kowalski — https://emilkowal.ski/ui/7-practical-animation-tips (plus the Uiverse items above)
  motion: :active scale(.97) (Emil). Uiverse uses .95 or .9. Button press takes 100–160ms ease-out
  feel: tactile, responsive
  fits: every arrow button

---

## Arrow glyph families by icon library
(Names come from the repos' file trees, right-facing only.)

- **Lucide** — https://github.com/lucide-icons/lucide/tree/main/icons
  - arrow-right, arrow-big-right(-dash), arrow-right-to-line / from-line, arrow-left-right, move-right
  - chevron-right, chevrons-right
  - circle-arrow-right, circle-chevron(s)-right, square-arrow-right(-enter/exit), square-chevron(s)-right
- **Heroicons** — https://github.com/tailwindlabs/heroicons/tree/master/optimized/24/outline
  - arrow-right, arrow-long-right, arrow-small-right, arrow-right-circle
  - arrow-uturn-right, arrow-turn-*, arrows-right-left
  - chevron-right, chevron-double-right
- **Phosphor** — https://github.com/phosphor-icons/core/tree/main/assets/regular
  - arrow-right, arrow-line-right
  - arrow-fat-right, arrow-fat-line(s)-right
  - arrow-circle-right, arrow-square-right
  - arrow-arc-right, arrow-bend-*, arrow-elbow-*, arrow-u-*
  - caret-right, caret-double-right, caret-line-right, caret-circle-(double-)right
- **Tabler** — https://github.com/tabler/tabler-icons/tree/main/icons/outline
  - arrow-right, arrow-narrow-right, arrow-big-right, arrow-bar(-to)-right, arrow-badge-right
  - arrow-curve / bear / ramp / loop-right, arrows-right
  - chevron-right, chevrons-right, chevron-compact-right, caret-right
  - circle-arrow / chevron / caret-right, square(-rounded)-arrow / chevron-right
- **Iconoir** — https://github.com/iconoir-icons/iconoir/tree/main/icons/regular
  - arrow-right, long-arrow-*, nav-arrow-right (chevron), fast-arrow-right (double)
  - arrow-right-circle, arrow-right-tag, dot-arrow-right, rhombus-arrow-right, u-turn-arrow-right
- **Remix** — https://github.com/Remix-Design/RemixIcon/tree/master/icons/Arrows
  - arrow-right, arrow-right-s (chevron), arrow-right-long, arrow-right-wide, arrow-right-double
  - arrow-right-circle, arrow-right-box, arrow-drop-right (caret)
  - skip-right, expand-right / contract-right
- **Material Symbols** — https://developers.google.com/fonts/docs/material_symbols
  - variable axes FILL / wght / GRAD / opsz
  - glyph names like arrow_forward and chevron_right are from memory, not re-checked
- **Animated sets**
  - lucide-animated (Motion, shadcn install): https://lucide-animated.com
  - itshover (Motion; arrow-narrow-right(-dashed), arrow-big-right(-dash), arrow-back): https://github.com/Nani-LM10/itshover
  - useAnimations (Lottie; arrowLeft/Right/Up/Down, plus Circle and diagonal variants): https://github.com/useAnimations/react-useanimations
  - Lordicon, e.g. 225-arrow-long-right: https://lordicon.com/icons/system/solid/225-arrow-long-right. States are in-reveal, hover-pinch, hover-slide and loop-cycle; the page gives no motion numbers.
  - LottieFiles free looping "arrow right" by Windy Diaztary (0.95KB dotLottie): https://lottiefiles.com/free-animation/arrow-right-0wHLbm3MXc

**Sources that didn't yield anything usable:**
- **animatedicons.co:** the search returned no pages from that site.
- **Rive:** no arrow-specific community file. The Awwwards Dave Holloway element is tagged "rive, elastic, bounce" but has no details.
- **Dribbble** (https://dribbble.com/mynrd/collections/4942254-Button-Hovers) and **Awwwards** (https://www.awwwards.com/inspiration/cta-with-micro-interaction-s11-system): only titles and tags were available, no motion data.

---

## Easing and duration conventions

1. **Distance.** Icon-level nudges are 2–4px in a 24px glyph (Lucide 2–3, Stripe 3, itshover 4, Josh shaft +3). Button-level slides are 8–15px. Loop-throughs travel 100–200% of the glyph width inside overflow:hidden.
2. **Duration.**
   - One-shot out-and-back keyframes: 400–500ms.
   - Hold-state transitions: 200–300ms. Reset faster (about 200ms ease-out).
   - Fills, expands and drawers: 400–800ms.
   - Press: 34–160ms.
3. **Easing for a premium / agency feel.** Use expo- or quint-out curves: cubic-bezier(0.625,0.05,0,1) from Osmo, (0.23,1,0.32,1), or (0.65,0,0.076,1). For symmetric drawers use (0.7,0,0.3,1). Material standard is (0.4,0,0.2,1).
4. **Playful feel.** Overshoot with (.3,.7,.4,1.5), Back / Elastic eases, or a spring with stiffness 300 and damping 12. Lottie loops add about 2px of anticipation and 1.3px of overshoot.
5. **Choreography.** Exit before enter. Stagger 50–150ms (trails, outline draws). Codrops sequences steps in 0.3s slots.
6. **Idle hints.** Loop at 0.6–1.5s with alternate, 5–10px amplitude, on one element only.
7. **Restraint (Emil Kowalski).** Keep UI motion under 300ms. Use ease-out for entering elements. Minimise hover motion on controls people hit tens of times a day.
8. **Guards.** Gate hover effects with `@media (hover:hover) and (pointer:fine)` (Osmo). Respect `prefers-reduced-motion` (https://web.dev/articles/prefers-reduced-motion); JS animations must be stopped manually.
