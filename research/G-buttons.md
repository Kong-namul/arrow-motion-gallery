# 버튼 모션 카탈로그 리서치 (종류별)

> 리서치 에이전트 원문 보고서 (2026-11-26). 모든 항목은 실제 URL 확인. (inferred) = 추정값.

Button motion catalog, organized by button type: 66 items. I checked every URL. Most numbers come straight from source code: GitHub raw files for Codrops, Magic UI, Animate UI, Animata, Uiverse/galaxy, Material, MUI, shadcn, Ladda and animate.css, plus the author articles. Anything I estimated is marked "(inferred)". CodePen is blocked by Cloudflare, so there are no CodePen items. tympanus.net article pages return 403, so Codrops numbers come from the official github.com/codrops repos. The Motion+ example sources (motion.dev) are paywalled, so those items carry only the published description.

## 1. Primary filled

- name: Press scale
  source: Emil Kowalski — https://emilkowal.ski/ui/building-a-hold-to-delete-component (+ https://emilkowal.ski/ui/7-practical-animation-tips)
  look: Solid button that shrinks slightly while held
  motion: :active → scale(0.97); transform 160ms ease-out. His skill file defines --ease-out as cubic-bezier(0.23,1,0.32,1)
  feel: snappy, responsive
  css_hint: `.btn{transition:transform 160ms cubic-bezier(.23,1,.32,1)} .btn:active{transform:scale(.97)}`

- name: Lift + deeper shadow
  source: Animata "Algolia blue" — https://github.com/codse/animata/blob/main/animata/button/algolia-blue-button.tsx
  look: Gradient pill with an inset bottom edge
  motion: hover → translateY(-2px), shadow 0 2px 4px→0 4px 8px, inset edge turns #3c4fe0; active → translateY(+2px) with inset 0 3px 7px; transform 150ms ease-in-out (the shadow isn't transitioned, so it snaps)
  feel: crisp, tactile
  css_hint: `hover:-translate-y-0.5 active:translate-y-0.5 transition-transform duration-150`

- name: Hover darken (system default)
  source: shadcn/ui Button — https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx ; Tailwind defaults — https://tailwindcss.com/docs/transition-property
  look: bg-primary → bg-primary/90
  motion: hover → background alpha 100→90%; transition-all 150ms cubic-bezier(0.4,0,0.2,1); no press motion
  feel: quiet, utilitarian
  css_hint: `transition-all hover:bg-primary/90` (add `motion-reduce:transition-none`)

- name: M3 state layer
  source: Material Web tokens — https://github.com/material-components/material-web/blob/main/tokens/versions/v0_192/_md-sys-state.scss
  look: Translucent on-color overlay above the fill
  motion: overlay opacity 0.08 on hover, 0.12 on focus, 0.12 on press (0.16 dragged); filled button rises from elevation level0 to level1 on hover; hover layer fades in 15ms linear, pressed in 105ms
  feel: systematic, honest
  css_hint: `::before{background:currentColor;opacity:0} :hover::before{opacity:.08} :active::before{opacity:.12}`

- name: Shine sweep
  source: Animata Shining button — https://github.com/codse/animata/blob/main/animata/button/shining-button.tsx
  look: Violet button; a skewed white/10% bar crosses it
  motion: hover → 48px bar rotated 30° travels from left:-64px to calc(100%+1rem), 700ms ease-in-out; arrow translateX(8px) scale(1.25), 700ms; outer ring fades in over 500ms
  feel: glossy, showy
  css_hint: `.bar{left:-4rem;transform:rotate(30deg) scaleY(1.5);transition:left .7s} .btn:hover .bar{left:calc(100% + 1rem)}`

- name: Perimeter shimmer spark
  source: Magic UI ShimmerButton — https://magicui.design/docs/components/shimmer-button (code: https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/shimmer-button.tsx)
  look: Black pill; a soft light runs around its edge
  motion: loop → conic spark `shimmer-slide` (translate calc(100cqw - 100%)) 3s ease-in-out alternate, plus `spin-around` 6s linear (keyframes: 90° held from 15–35%, 270° from 65–85%); inner highlight inset 0 -8px 10px #fff1f → hover -6px #fff3f → active -10px, 300ms; active translateY(1px)
  feel: premium, ambient
  css_hint: conic-gradient(from calc(270deg - 45deg), transparent, #fff 90deg, transparent 90deg) with blur(2px), masked behind an inset backdrop

- name: Gradient shift (rainbow)
  source: Magic UI RainbowButton — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/rainbow-button.tsx
  look: Dark fill, rainbow border, blurred rainbow glow underneath
  motion: loop → background-position 0%→200% on a 200%-wide 5-stop gradient, 2s linear infinite; glow pseudo uses blur(0.75rem)
  feel: lively, loud
  css_hint: `background-size:200%; animation:rainbow 2s linear infinite; @keyframes rainbow{to{background-position:200%}}`

- name: Spring text glint
  source: Magic UI ShinyButton — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/shiny-button.tsx
  look: Outline button; light passes through the label via a mask
  motion: loop → --x 100%→-100%, spring stiffness 20, damping 15, mass 2, repeatDelay 1s; mount scale 0.8→1 (spring 200/5); whileTap scale 0.95; dark mode hover glow 0 0 20px over 300ms
  feel: soft, luxe
  css_hint: `mask-image:linear-gradient(-75deg,#000 calc(var(--x) + 20%),transparent calc(var(--x) + 30%),#000 calc(var(--x) + 100%))`

## 2. Secondary / outline

- name: Fill from top / left / center
  source: Codrops CreativeButtons — https://github.com/codrops/CreativeButtons/blob/master/css/component.css (article: https://tympanus.net/codrops/2013/06/13/creative-button-styles/)
  look: Outline button that floods with color
  motion: hover → ::after height 0→100% (1b, from top), width 0→100% (1c, from left), or centered width 0→90% with 101% on :active (1d); diagonal variant (1e) is rotated 45° with height 0→260%, 400% on press; all 0.3s
  feel: classic, direct
  css_hint: `.btn::after{content:'';position:absolute;inset:0 auto 0 0;width:0;transition:all .3s} .btn:hover::after{width:100%}`

- name: Background-size sweep (directional exit)
  source: CSS-Tricks, Temani Afif — https://css-tricks.com/cool-hover-effects-using-background-properties/
  look: Color fills left→right, then leaves toward the right
  motion: hover → --p 0→100%; transition .4s with background-position 0s; a second variant grows a 0.08em underline band to full height (two .3s steps)
  feel: smooth, editorial
  css_hint: `background:linear-gradient(#1095c1 0 0) calc(100% - var(--p,0%)) / var(--p,0%) no-repeat; transition:.4s, background-position 0s;`

- name: Liquid band fill
  source: Animate UI LiquidButton — https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/buttons/liquid/index.tsx
  look: 3px bottom band that rises into a full fill
  motion: hover → band slides in, then height 3px→100%, 0.3s per step with the label color delayed 0.3s; whileHover scale 1.05, whileTap 0.95
  feel: fluid, playful
  css_hint: Temani's two-step gradient, driven by CSS variables from Motion

- name: Pan with blend-mode inversion
  source: Codrops ButtonHoverStyles "Pan" — https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css (article: https://tympanus.net/codrops/2021/02/17/ideas-for-css-button-hover-animations)
  look: Black pill whose fill slides up and away; the label inverts as the fill passes
  motion: hover → ::before translate3d(0,-100%,0), 0.3s cubic-bezier(0.7,0,0.2,1); label uses `mix-blend-mode:difference`
  feel: bold, graphic
  css_hint: `span{mix-blend-mode:difference}`

- name: Inset flood + radius morph
  source: Codrops "Pallene" — https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css
  look: Rounded rectangle → black ellipse
  motion: hover → box-shadow inset 0 0 0 0→40px, radius 0.5rem→50%, color change delayed 0.2s; 0.3s cubic-bezier(0.7,0,0.2,1)
  feel: morphing, confident
  css_hint: `transition:border-radius .3s,box-shadow .3s,color .3s;` with `transition-delay:0s,0s,.2s` on hover

- name: Border draw / border reveal
  source: Codrops "Fenrir" (same base.css) ; CSS-Tricks — https://css-tricks.com/?p=263206
  look: Circle stroke that draws itself / border that thickens
  motion: Fenrir: with pathLength 1, stroke-dashoffset 1→0 and ring scale 1.2, 0.4s cubic-bezier(0.7,0,0.3,1). CSS-Tricks: clip-path inset 5px→0 or box-shadow spread 5→10px, 0.6s linear
  feel: precise, calm
  css_hint: `path{stroke-dasharray:1;stroke-dashoffset:1;transition:stroke-dashoffset .4s cubic-bezier(.7,0,.3,1)} :hover path{stroke-dashoffset:0}`

## 3. Ghost / text / link

- name: Underline grow with origin swap
  source: Codrops LineHoverStyles — https://github.com/codrops/LineHoverStyles/blob/master/css/base.css
  look: Line enters from the left and exits to the right
  motion: hover → scaleX 0→1, origin swaps right→left, 0.3s. "Io" variant: cubic-bezier(0.4,1,0.8,1) in, (0.7,0,0.2,1) out
  feel: editorial, calm
  css_hint: `::before{transform:scaleX(0);transform-origin:right;transition:transform .3s} :hover::before{transform:scaleX(1);transform-origin:left}`

- name: Ghost background fade
  source: shadcn/ui ghost variant — https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/button.tsx
  look: Transparent until hovered; link variant shows an underline only
  motion: hover → bg-accent, 150ms cubic-bezier(0.4,0,0.2,1); underline appears without animation
  feel: invisible, tidy
  css_hint: `hover:bg-accent transition-all`

- name: Text roll-up (out the top, back from the bottom)
  source: Codrops "Hyperion"/"Skoll" — https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css
  look: Label rolls up and out, then the same label returns from below
  motion: hover → MoveUpInitial 0.2s (y→-105%), then MoveUpEnd 0.2s after a 0.2s delay (100%→0); the background collapses scaleX 1→0 with an origin swap, 0.3s cubic-bezier(0.7,0,0.2,1). "Helene" variant: slotMachine 0.15s ease-out ×3
  feel: kinetic, crisp
  css_hint: `span>span{animation:up1 .2s forwards, up2 .2s .2s forwards}`

- name: Dual-label swipe
  source: Animata SwipeButton — https://github.com/codse/animata/blob/main/animata/button/swipe-button.tsx
  look: Two stacked labels in a clipped box
  motion: hover → first label translateY(-100%), second label translateY(100%)→0, 300ms ease-in-out
  feel: smooth, clean
  css_hint: `overflow:hidden; .a{group-hover:-translate-y-full} .b{absolute inset-0 translate-y-full group-hover:translate-y-0}`

## 4. Icon-only

- name: Boop
  source: Josh W. Comeau — https://www.joshwcomeau.com/react/boop/
  look: Icon twitches briefly, then settles back
  motion: hover → rotate/scale/translate applied, reverted after `timing` 150ms; spring tension 300, friction 10 (6 for a wobblier star); reduced motion returns an empty style
  feel: bouncy, playful
  css_hint: react-spring `useSpring({transform: booped?'rotate(20deg)':'rotate(0deg)', config:{tension:300,friction:10}})`

- name: Ring scale-in
  source: Codrops IconHoverEffects 1a/1b — https://github.com/codrops/IconHoverEffects/blob/master/css/component.css
  look: Round icon with an outer ring that settles into place
  motion: hover → ::after (0 0 0 4px ring) scale .8→1 (1a) or 1.2→1 (1b) while fading in; transform and opacity 0.2s; background/color 0.2s
  feel: tidy, soft
  css_hint: `::after{transform:scale(.8);opacity:0;transition:transform .2s,opacity .2s} :hover::after{transform:scale(1);opacity:1}`

- name: Icon pass-through
  source: Codrops IconHoverEffects 5a–5d (same file)
  look: Glyph leaves one edge and re-enters from the opposite edge
  motion: hover → keyframes 0.3s forwards: at 49% translateY(-100%), at 50% jumps to +100% with opacity 0, at 51% visible, ends at 0
  feel: witty, quick
  css_hint: `@keyframes toTop{49%{transform:translateY(-100%)}50%{opacity:0;transform:translateY(100%)}51%{opacity:1}}`

- name: Sonar ping
  source: Codrops IconHoverEffects 8 (same file)
  look: Icon shrinks slightly; a halo ring expands and fades
  motion: hover → icon scale(0.93); ::after sonarEffect 1.3s ease-out with 75ms delay: glow builds by 40%, then scale(1.5) with opacity 0
  feel: alert, gentle
  css_hint: box-shadow ring keyframes plus `transform:scale(1.5);opacity:0` at 100%

- name: Theme toggle circular reveal
  source: Magic UI AnimatedThemeToggler — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-theme-toggler.tsx
  look: Sun/moon icon button; the new theme spreads from the click point
  motion: click → View Transition, clip-path circle(0% at click)→circle(maxRadius), 400ms default; square, diamond, hexagon and star variants exist
  feel: magical, smooth
  css_hint: `document.startViewTransition(...)`, then animate `::view-transition-new(root)` clip-path

## 5. CTA with trailing icon

- name: Stripe-style hover arrow
  source: Adam Wathan recreation — https://typefully.com/adamwathan/recreating-stripes-arrow-animation-with-NnPxtVr
  look: Chevron after the label; on hover a shaft fades in and the head moves forward
  motion: hover → chevron path translateX(3px), line path opacity 0→1 (duration not given; ~150ms inferred)
  feel: subtle, premium
  css_hint: one SVG with two paths: `.line{opacity:0} .head{transition:transform .15s} :hover .line{opacity:1} :hover .head{transform:translateX(3px)}`

- name: Bubble arrow
  source: Osmo — https://www.osmo.supply/resource/button-with-bubble-arrow
  look: Pill with an arrow circle that swaps sides
  motion: hover → orange circle scale 0→1 (origin left), duplicate circle 1→0 (origin right), content translateX(-3.75em)→0, arrow rotate(-45deg); transform 0.735s cubic-bezier(0.625,0.05,0,1)
  feel: luxurious, slow-fast
  css_hint: `transition:transform .735s cubic-bezier(.625,.05,0,1)`

- name: Dot-expand takeover
  source: Magic UI InteractiveHoverButton — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/interactive-hover-button.tsx
  look: Small dot before the label floods the pill; the label + arrow slide in
  motion: hover → 8px dot scale ×100.8; old label translateX(48px) and fades; new label+arrow from translateX(48px)→-20px with opacity 0→1; all 300ms
  feel: punchy, modern
  css_hint: `.dot{transition:all .3s} .group:hover .dot{transform:scale(100.8)}`

- name: Icon carousel swap
  source: Animata GetStartedButton — https://github.com/codse/animata/blob/main/animata/button/get-started-button.tsx
  look: 28px circle; the arrow is replaced by a second arrow sliding in
  motion: hover → 56px icon strip translateX(-50%)→0, 200ms ease-in-out; background and text color 100ms
  feel: snappy, friendly
  css_hint: `.strip{width:3.5rem;transform:translateX(-50%);transition:transform .2s} :hover .strip{transform:none}`

- name: Rect→arrow clip morph
  source: Codrops "Anthe" — https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css
  look: The button background turns into an arrow shape
  motion: hover → clip-path polygon goes to (0 0,75% 0,100% 50%,75% 100%,0 100%), label translateX(-10px), 0.4s cubic-bezier(0.2,1,0.8,1)
  feel: directional, crisp
  css_hint: `transition:clip-path .4s cubic-bezier(.2,1,.8,1)`

## 6. Loading / submitting

- name: Expand-right spinner (Ladda)
  source: Ladda, Hakim El Hattab — https://github.com/hakimel/Ladda/blob/master/css/ladda.scss
  look: Button grows on the right to make room for a spinner
  motion: loading → padding-right 56px, spinner fades in; 0.3s cubic-bezier(0.175,0.885,0.32,1.275) (back-out). Zoom-out variant: label scale 0.5 + opacity 0, spinner scale 2.5→1, 0.3s ease
  feel: springy, informative
  css_hint: `[data-loading]{padding-right:56px} transition:.3s cubic-bezier(.175,.885,.32,1.275) all;`

- name: Contract to circle + progress (Ladda)
  source: Ladda (same file)
  look: Width collapses to a round spinner; a translucent bar fills behind it
  motion: loading → width 100px→52px, radius 50%; .ladda-progress width set by JS with 0.1s linear
  feel: compact, mechanical
  css_hint: `[data-style=contract][data-loading]{width:52px;border-radius:50%}`

- name: Circular progress morph
  source: Codrops CircularProgressButton — https://github.com/codrops/CircularProgressButton/blob/master/css/component.css
  look: 250px pill → 70px ring whose stroke fills
  motion: loading → width 0.3s, border 5px; text opacity 0.15s; ring stroke-dashoffset fills 0.3s. Elastic variant: grow cubic-bezier(0.25,0.25,0.4,1.6), shrink cubic-bezier(0.6,-0.6,0.75,0.75) (anticipation)
  feel: elastic, satisfying
  css_hint: `.loading button{width:70px;border-width:5px;transition:width .3s cubic-bezier(.6,-.6,.75,.75)}`

- name: Shrink into progress bar / 3D tilt
  source: Codrops ProgressButtonStyles — https://github.com/codrops/ProgressButtonStyles/blob/master/css/component.css
  look: Button squashes into a thin bar, or tilts to show a progress face
  motion: loading → scaleY(0.3) over 0.2s with content opacity 0 and the fill width animating 0.3s; 3D variant: perspective 900px, wrap rotateX(45deg) 0.2s; success → content translateY(-100%)
  feel: inventive, mechanical
  css_hint: `.state-loading{transform:scaleY(.3);transition:transform .2s}`

- name: Status label swap
  source: Animata StatusButton — https://github.com/codse/animata/blob/main/animata/button/status-button.tsx
  look: "Send" → spinning dashed circle → check
  motion: each state: exit y+15 and fade, enter from y-15, 75ms; spinner uses animate-spin; check scale 0→1 (spring, 75ms delay); background 300ms
  feel: quick, clear
  css_hint: `<AnimatePresence mode="wait"> initial={{y:-15,opacity:0}} exit={{y:15,opacity:0}} transition={{duration:.075}}`

- name: Blur crossfade between states
  source: Emil Kowalski skill — https://github.com/emilkowalski/skill/blob/main/skills/emil-design-eng/SKILL.md
  look: Label and spinner blend instead of overlapping
  motion: state change → content blur(2px) + opacity 0.7, 200ms ease; press scale 0.97 at 160ms; keep blur under 20px (Safari cost)
  feel: soft, seamless
  css_hint: `.content{transition:filter .2s,opacity .2s} .transitioning{filter:blur(2px);opacity:.7}`

## 7. Success / error

- name: Check / cross stroke draw
  source: Codrops CircularProgressButton JS — https://github.com/codrops/CircularProgressButton/blob/master/js/uiProgressButton.js
  look: Ring undraws, button turns green with a check (or red with an X)
  motion: done → dasharray = getTotalLength(), dashoffset len×(1−v), 0.3s; background 0.3s; holds 1500ms (statusTime), then reverses
  feel: affirming, crisp
  css_hint: `path.style.strokeDashoffset = len*(1-val)` with `transition:stroke-dashoffset .3s`

- name: Error shake
  source: animate.css — https://github.com/animate-css/animate.css/blob/main/source/attention_seekers/shakeX.css (+ headShake.css)
  look: Horizontal jitter
  motion: error → shakeX ±10px alternating every 10%, 1s default; headShake damps -6px/rotY -9° → 5 → -3 → 2 → 0 by 50%, ease-in-out. Shorten to ~400ms for buttons (inferred)
  feel: firm, unmistakable
  css_hint: `@keyframes shakeX{10%,30%,50%,70%,90%{transform:translateX(-10px)}20%,40%,60%,80%{transform:translateX(10px)}}`

- name: Spring check pop
  source: Animate UI StatusButton / Animata (see above) — https://github.com/codse/animata/blob/main/animata/button/status-button.tsx
  look: Check icon pops in next to "Sent"
  motion: success → scale 0→1, default Motion spring, 75ms delay after the label swap
  feel: cheerful
  css_hint: `<motion.span initial={{scale:0}} animate={{scale:1}} transition={{delay:.075,type:"spring"}}>`

## 8. Destructive / hold-to-confirm

- name: Hold-to-delete clip fill
  source: Emil Kowalski — https://emilkowal.ski/ui/building-a-hold-to-delete-component
  look: A red duplicate overlay fills left→right while held
  motion: :active → overlay clip-path inset(0 100% 0 0)→inset(0), 2s linear; release snaps back 200ms ease-out; button scale 0.97 at 160ms ease-out
  feel: deliberate, safe
  css_hint: `.overlay{clip-path:inset(0 100% 0 0);transition:clip-path .2s ease-out} .btn:active .overlay{clip-path:inset(0);transition:clip-path 2s linear}`

- name: Hold to confirm (motion value)
  source: Motion example — https://motion.dev/examples/react-hold-to-confirm ; principle: https://rauno.me/craft/interaction-design
  look: Background progress driven by hold time
  motion: hold → useMotionValue progress animated with `animate`, mapped to the fill via useTransform (exact values paywalled). Rauno: destructive actions should commit only when the gesture ends
  feel: controlled
  css_hint: `progress = useMotionValue(0); width = useTransform(progress,[0,1],["0%","100%"])`

- name: Bin lid tilt
  source: Uiverse.io (vinodjangid07) — https://github.com/uiverse-io/galaxy/blob/main/Buttons/vinodjangid07_tame-cobra-18.html
  look: Red trash icon button
  motion: hover → lid rotate(45deg) around its right edge, background turns pure red, 0.3s; active → scale(0.9)
  feel: playful-warning
  css_hint: `.bin-top{transform-origin:right;transition-duration:.3s} :hover .bin-top{transform:rotate(45deg)}`

## 9. Toggle / like / follow

- name: Twitter heart burst
  source: CSS-Tricks — https://css-tricks.com/recreating-the-twitter-heart-animation/
  look: Heart appears out of an expanding ring, with 7×2 colored dots
  motion: click → 1s total; heart font-size 0 until 17.5%, then cubic-bezier(.17,.89,.32,1.49); ring scale 0→1 by 15% (#e2264d→#cc8ef5), border-width →0 by 30%, cubic-bezier(.21,.61,.35,1); particles appear at 25% and their radius grows ×1.25
  feel: joyful, bouncy
  css_hint: `animation:heart 1s cubic-bezier(.17,.89,.32,1.49); @keyframes heart{0%,17.5%{font-size:0}}`

- name: Particle pop on toggle
  source: Animate UI IconButton + Particles — https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/effects/particles/index.tsx
  look: 6 dots spray out of a star or heart icon
  motion: click → particles placed on a 30px radius over 360°; scale [0,1,0], opacity [0,1,0], 0.8s easeOut, 0.05s stagger; a key bump replays it on every click
  feel: delightful, light
  css_hint: `x=cos(a)*30, y=sin(a)*30; animate={{x,y,scale:[0,1,0],opacity:[0,1,0]}}`

- name: Heartbeat hover
  source: Uiverse.io (LilaRest) — https://github.com/uiverse-io/galaxy/blob/main/Buttons/LilaRest_afraid-fox-80.html
  look: Neumorphic heart button
  motion: hover → button scale(105%), transform 400ms cubic-bezier(.68,-0.55,.27,2.5); icon beats 1.2s infinite (1→1.15 at 15%, 1 at 30%, 1.15 at 45%, 1 at 60%)
  feel: alive, cute
  css_hint: `@keyframes beat{15%,45%{transform:scale(1.15)}0%,30%,60%{transform:scale(1)}}`

- name: Follow → Following swap
  source: Magic UI AnimatedSubscribeButton — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/animated-subscribe-button.tsx
  look: "Subscribe" leaves to the right; "Subscribed" drops in from above
  motion: click → AnimatePresence mode "wait"; old label exit x:+50 in 0.1s; button crossfades opacity; new label y:-50→0 (default spring). Animata FollowButton offers y±20, x±20 and scale 0.8/1.2 variants
  feel: confident, quick
  css_hint: `exit={{x:50,transition:{duration:.1}}}` → `initial={{y:-50}} animate={{y:0}}`

- name: Lottie segment like
  source: CSS-Tricks "Animating with Lottie" — https://css-tricks.com/?p=332224
  look: Designer-made heart animation (After Effects)
  motion: load → goToAndStop(0 or 15, true); like → playSegments([0,15], true); unlike → playSegments([15,30], true)
  feel: illustrative, rich
  css_hint: `anim.playSegments(liked?[15,30]:[0,15], true)`

## 10. Copy-to-clipboard

- name: Blur-scale icon swap
  source: Animate UI CopyButton — https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/components/buttons/copy/index.tsx
  look: Copy glyph → check
  motion: click → icon exit/enter scale 0↔1, opacity 0.4↔1, blur 4px↔0, 0.25s; reverts after 3000ms
  feel: smooth, modern
  css_hint: `initial={{scale:0,opacity:.4,filter:'blur(4px)'}} animate={{scale:1,opacity:1,filter:'blur(0px)'}}`

- name: Instant swap baseline
  source: shadcn/ui docs CopyButton — https://github.com/shadcn-ui/ui/blob/main/apps/v4/components/copy-button.tsx
  look: Copy icon → check icon, no animation
  motion: click → swaps instantly; setTimeout 2000ms reset
  feel: plain, dependable
  css_hint: `useEffect(()=>{ if(hasCopied){ const t=setTimeout(()=>setHasCopied(false),2000) } })`

- name: CSS crossfade with reduced-motion fallback
  source: shadcn.io Copy Button — https://www.shadcn.io/button/copy-button
  look: Icons crossfade and scale
  motion: click → CSS crossfade plus scale; check stays 3000ms (resetDelay); under reduced motion: fade only, no scale. Motion's paywalled version adds a pathLength check draw (https://motion.dev/examples/react-copy-button)
  feel: polished, accessible
  css_hint: stack both icons with `transition:opacity .2s, transform .2s` (inferred), toggled by data-copied

- name: "Copied" tooltip pop
  source: Emil Kowalski — https://emilkowal.ski/ui/7-practical-animation-tips
  look: Small tooltip grows from the trigger
  motion: show → from scale(0.97) + opacity 0, 125ms ease-out, transform-origin at the trigger; later tooltips open with 0ms
  feel: instant, light
  css_hint: `transition:transform .125s ease-out,opacity .125s ease-out; &[data-starting-style]{opacity:0;transform:scale(.97)}`

## 11. FAB

- name: Speed dial (plus→x + staggered actions)
  source: MUI SpeedDial — https://github.com/mui/material-ui/blob/master/packages/mui-material/src/SpeedDialIcon/SpeedDialIcon.js (+ SpeedDial.js, SpeedDialAction.js)
  look: Round FAB; mini actions fan out
  motion: open → icon rotate(45deg) and the open icon crossfades -45°→0, 250ms; actions scale 0→1 over 200ms, opacity over 0.8s, delay 30ms×index (reversed on close); easing cubic-bezier(0.4,0,0.2,1). Motion's FAB example adds springs and tooltip labels (https://motion.dev/examples/react-floating-action-button)
  feel: orderly, crisp
  css_hint: `.action{transform:scale(0);transition:transform 200ms, opacity .8s; transition-delay:calc(var(--i)*30ms)}`

- name: Extended FAB collapse on scroll
  source: Material Components Android — https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/floatingactionbutton/res/animator/mtrl_extended_fab_change_size_collapse_motion_spec.xml
  look: Icon+label pill → icon-only circle
  motion: scroll down → shrink(): width/height/padding 200ms fast_out_slow_in (≈cubic-bezier(0.4,0,0.2,1)); label fades in 33ms starting at 16ms. Expand: label fades in 83ms starting at 117ms
  feel: efficient, calm
  css_hint: `transition:width 200ms cubic-bezier(.4,0,.2,1); .label{transition:opacity 33ms 16ms}`

## 12. Split button / dropdown trigger

- name: Chevron flip with overshoot
  source: Material 3 Expressive split button — https://github.com/material-components/material-components-android/blob/master/lib/java/com/google/android/material/button/res/animator/m3_split_button_chevron_rotation.xml
  look: Trailing chevron segment; it also changes shape when checked
  motion: open → rotation 0→180°, 200ms, overshoot interpolator. shadcn accordion equivalent: rotate-180, 200ms
  feel: springy, clear
  css_hint: `.chev{transition:transform 200ms cubic-bezier(.34,1.56,.64,1)}` (overshoot curve inferred)

- name: Origin-aware menu scale-in
  source: shadcn/ui DropdownMenu — https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/dropdown-menu.tsx (+ https://github.com/Wombosvideo/tw-animate-css/blob/main/src/tw-animate.css)
  look: Menu grows out of the trigger
  motion: open → fade-in-0 + zoom-in-95 + slide-in-from-top-2 (8px); transform-origin = Radix var; 150ms ease (tw-animate default); reverse on close
  feel: snappy, grounded
  css_hint: `origin-(--radix-dropdown-menu-content-transform-origin) data-[state=open]:animate-in zoom-in-95 fade-in-0`

## 13. Segmented control / tab buttons

- name: Spring highlight pill
  source: Animate UI Tabs — https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/animate/tabs/index.tsx
  look: Pill slides behind the active segment
  motion: select → highlight spring stiffness 200, damping 25; panel x = -index×100% (spring 300/30); inactive panels blur 4px
  feel: fluid, premium
  css_hint: `transition={{type:'spring',stiffness:200,damping:25}}`

- name: Clip-path duplicate tabs
  source: Emil Kowalski — https://emilkowal.ski/ui/the-magic-of-clip-path
  look: Active text color changes exactly at the pill's edge
  motion: select → a highlighted copy of the tab list is clipped to the active tab: inset(0 R% 0 L% round 17px), computed from offsetLeft/offsetWidth; the clip-path transitions (timing not given; ~200–250ms ease-out inferred)
  feel: precise, crafted
  css_hint: `clip-path:inset(0 ${100-right}% 0 ${left}% round 17px); transition:clip-path .25s` (duration inferred)

- name: Shared-layout underline
  source: Motion docs — https://motion.dev/docs/react-layout-animations
  look: Underline or pill that travels between tabs
  motion: select → `<motion.div layoutId="underline"/>` animates between positions using the destination element's transition; example layout spring visualDuration 0.4, bounce 0.2
  feel: natural, continuous
  css_hint: `{isSelected && <motion.div layoutId="underline" transition={{type:'spring',visualDuration:.4,bounce:.2}}/>}`

## 14. Toggle switch

- name: M3 handle grow + overshoot slide
  source: Material Web switch — https://github.com/material-components/material-web/blob/main/switch/internal/_handle.scss (sizes: .../tokens/versions/v0_192/_md-comp-switch.scss)
  look: Small off-thumb becomes a big on-thumb
  motion: toggle → handle 16px→24px (250ms standard easing), pressed 28px (100ms linear); position margin 300ms cubic-bezier(0.175,0.885,0.32,1.275)
  feel: tactile, springy
  css_hint: `.handle-container{transition:margin 300ms cubic-bezier(.175,.885,.32,1.275)} :active .handle{width:28px;height:28px;transition:100ms linear}`

- name: Squash thumb
  source: Animate UI Switch — https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/radix/switch/index.tsx (+ components/radix/switch)
  look: 32×20 track, 16px thumb
  motion: press → thumb width 16→19px (squash); toggle → layout spring stiffness 300, damping 25; side icons scale/opacity (spring, bounce 0). Motion's paywalled Radix example also animates by switching justify-content with layout springs (https://motion.dev/examples/react-radix-switch)
  feel: rubbery, satisfying
  css_hint: `<motion.span layout transition={{type:'spring',stiffness:300,damping:25}} animate={pressed?{width:19}:{}} />`

- name: Plain translate toggle
  source: Animata ToggleSwitch — https://github.com/codse/animata/blob/main/animata/button/toggle-switch.tsx
  look: 56×32 track, 24px thumb
  motion: toggle → translateX(100%), transition-all (150ms cubic-bezier(0.4,0,0.2,1) by Tailwind default)
  feel: simple, neutral
  css_hint: `transition-all ${checked?'translate-x-full':''}`

## 15. Social / share / download

- name: Elastic download → progress bar
  source: Codrops ElasticProgress — https://github.com/codrops/ElasticProgress
  look: Round arrow button that stretches into a rubbery progress line
  motion: click → circle morphs to bar; arrow/label jumps (jumpHeight 50); bar stretches up to 20 (barStretch); elastic overshoot 1.8, period 0.15; labelWobbliness 40; arrow "hangs/falls" on fail or cancel
  feel: elastic, whimsical
  css_hint: `new ElasticProgress(el,{barElasticOvershoot:1.8,barElasticPeriod:.15,jumpHeight:50})`

- name: Arrow drop loop
  source: Uiverse.io (vinodjangid07) — https://github.com/uiverse-io/galaxy/blob/main/Buttons/vinodjangid07_clever-bird-35.html
  look: 50px square icon with a tray; the background goes dark on hover
  motion: hover → background 0.3s; arrow loops slide-in-top 1s linear (translateY -10px with opacity 0 → 0 with opacity 1)
  feel: busy, obvious
  css_hint: `@keyframes drop{0%{transform:translateY(-10px);opacity:0}100%{transform:none;opacity:1}}`

- name: Download fill with uneven pacing
  source: Uiverse.io (JkHuger) — https://github.com/uiverse-io/galaxy/blob/main/Buttons/JkHuger_brown-lion-61.html
  look: Blue bar that fills and then turns green
  motion: click → fill width 5→17→51→70→86→100% at 0/35/64/81/90/100%, 3s cubic-bezier(.67,.13,.1,.81); green success at 3.1s
  feel: believable, steady
  css_hint: keyframed widths to fake realistic progress

- name: Share icons spring up
  source: Animate UI ShareButton — https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/components/community/share-button/index.tsx
  look: "Share" label replaced by a row of social icons
  motion: hover → label exits y:-24 over 0.3s; icons rise from y:24, spring duration 0.5 with bounce 0.4, staggered 0.1s; icon hover 0.2s easeOut
  feel: bouncy, social
  css_hint: `transition={{delay:i*.1,duration:.5,type:'spring',bounce:.4}}`

- name: Send fly-out
  source: Uiverse.io (adamgiebl) — https://github.com/uiverse-io/galaxy/blob/main/Buttons/adamgiebl_smart-moth-68.html
  look: Paper plane icon + "Send"
  motion: hover → plane translateX(1.2em) rotate(45deg) scale(1.1), 0.3s ease-in-out; label slides out translateX(5em); plane bobs ±0.1em every 0.6s (alternate); active scale(0.95)
  feel: playful, kinetic
  css_hint: `button:hover svg{transform:translateX(1.2em) rotate(45deg) scale(1.1)}`

## 16. Special

- name: Magnetic button
  source: Codrops MagneticButtons — https://github.com/codrops/MagneticButtons/blob/master/src/js/demo1/buttonCtrl.js (article: https://tympanus.net/codrops/2020/08/05/magnetic-buttons)
  look: Button drifts toward the cursor; the label lags behind
  motion: pointer within 0.7×width → translate = (mouse−center)×0.3, lerped at 0.1 per frame; label counter-moves ×−0.6; on enter the label exits y:-20% in 0.15s (Power2.easeIn) and re-enters from 100% in 0.2s (Expo.easeOut)
  feel: tactile, premium
  css_hint: `prev = lerp(prev, (mx-cx)*.3, .1); el.style.transform = translate3d(${prev}px, …)`

- name: 3D pushable
  source: Josh W. Comeau — https://www.joshwcomeau.com/animation/3d-button/
  look: Front, edge and shadow layers
  motion: rest front -4px; hover -6px in 250ms cubic-bezier(.3,.7,.4,1.5); press -2px in 34ms; release 600ms cubic-bezier(.3,.7,.4,1); shadow 2px/4px/1px; brightness 110% over 250ms
  feel: chunky, toy-like
  css_hint: `.front{transform:translateY(-4px);transition:transform 600ms cubic-bezier(.3,.7,.4,1)} .pushable:active .front{transform:translateY(-2px);transition:transform 34ms}`

- name: Duolingo border-swap press
  source: Animata Duolingo — https://github.com/codse/animata/blob/main/animata/button/duolingo.tsx
  look: Flat 3D button with a 4px bottom border
  motion: active → border-bottom 4px→0 and border-top 0→4px, so the face drops 4px; hover brightness 110%; 200ms
  feel: chunky, gamey
  css_hint: `border-b-4 active:border-b-0 active:border-t-4 transition-all duration-200`

- name: Neumorphic press
  source: Uiverse.io (ke1221) — https://github.com/uiverse-io/galaxy/blob/main/Buttons/ke1221_ancient-walrus-24.html
  look: #e8e8e8 soft UI
  motion: active → 6px 6px 12px #c5c5c5, -6px -6px 12px #fff becomes inset 4px 4px 12px / inset -4px -4px 12px; text #666; all .3s
  feel: soft, muted
  css_hint: keep the same number and order of shadow layers so the change interpolates

- name: Liquid blob (clip-path path morph)
  source: Codrops "Janus" — https://github.com/codrops/ButtonHoverStyles/blob/master/css/base.css
  look: Organic blob background that wobbles into a new shape
  motion: hover → clip-path path() A→B, 0.5s cubic-bezier(0.585,2.5,0.645,0.55) (large overshoot); label translateY(-10px) 0.3s ease
  feel: gooey, playful
  css_hint: `transition:clip-path .5s cubic-bezier(.585,2.5,.645,.55)`; both paths need matching command structure

- name: Cursor spotlight
  source: 30 Seconds of Code — https://30secondsofcode.org/css/s/mouse-cursor-gradient-tracking ; Chrome — https://developer.chrome.com/docs/modern-web-guidance/guides/ui-behaviors/interactive-content-reveal
  look: Radial glow that follows the pointer inside the button
  motion: pointermove → --x/--y set with no transition; size 0→200px on hover, 0.2s ease. Chrome version: mask radial with @property --inner-size 0→100px and --outer-size 0→120px, 0.2s ease-in-out; reduced motion → transition none
  feel: techy, premium
  css_hint: `@property --inner-size{syntax:'<length-percentage>';inherits:true;initial-value:0px}`

- name: Confetti on click
  source: canvas-confetti — https://github.com/catdad/canvas-confetti ; Magic UI CoolMode — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/cool-mode.tsx
  look: Burst of paper (or emoji/circle particles) from the button
  motion: click → defaults particleCount 50, angle 90, spread 45, startVelocity 45, decay 0.9, gravity 1, ticks 200; CoolMode: sizes 15–45px, max 45 particles, upward speed ≤25, sideways ≤10, spin ±35
  feel: celebratory
  css_hint: `confetti({origin:{x,y}, disableForReducedMotion:true})`

- name: Material ripple
  source: Material Web md-ripple — https://github.com/material-components/material-web/blob/main/ripple/internal/ripple.ts ; Magic UI RippleButton — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/ripple-button.tsx
  look: Ink circle spreading from the press point
  motion: press → grows from 0.2 of the size to the hypotenuse +10px, 450ms cubic-bezier(0.2,0,0,1); minimum press 225ms; touch delay 150ms; pressed opacity 0.12; fade 375ms linear (legacy MDC: 225ms grow, 150ms fade). Magic UI: scale 0→2 with opacity 1→0, 600ms ease-out
  feel: tactile, systematic
  css_hint: `@keyframes rippling{0%{opacity:1}100%{transform:scale(2);opacity:0}}`

- name: Pulsating halo
  source: Magic UI PulsatingButton — https://github.com/magicuidesign/magicui/blob/main/apps/www/registry/magicui/pulsating-button.tsx
  look: Soft ring breathing around the CTA
  motion: loop → box-shadow spread 0→8px→0, 1.5s ease-out infinite; ripple variant fades outward with cubic-bezier(0.16,1,0.3,1)
  feel: calm, insistent
  css_hint: `@keyframes pulse{50%{box-shadow:0 0 0 8px var(--pulse-color)}}`

- name: 3D flip label
  source: Animate UI FlipButton — https://github.com/imskyleen/animate-ui/blob/main/apps/v1/apps/www/registry/primitives/buttons/flip/index.tsx
  look: Front face rotates away and a back face rotates in (like a cube)
  motion: hover → front rotateX/Y 0→90° with opacity 0 and 50% offset, back face the reverse; spring stiffness 280, damping 20
  feel: clever, springy
  css_hint: `variants={{hover:{rotateX:90,opacity:0,y:'50%'}}} transition={{type:'spring',stiffness:280,damping:20}}`

- name: Particle disintegration
  source: Codrops ParticleEffectsButtons — https://github.com/codrops/ParticleEffectsButtons/blob/master/js/particles.js
  look: Button dissolves into particles (good for submit or delete)
  motion: click → disintegrate 1000ms easeInOutCubic, direction left, particlesAmountCoefficient 3, oscillation 20, particle speed rand(4)
  feel: dramatic, cinematic
  css_hint: `new Particles(btn,{duration:1000,easing:'easeInOutCubic',direction:'left'}).disintegrate()`

## Conventions
- **Press:** scale(0.95–0.97) or a 1–4px translateY. Emil uses 0.97 at 160ms; Animate UI taps use 0.95; playful icon buttons go to 0.9. Press-in is near-instant (34–160ms), and release is slower (Josh 600ms; hold-to-delete releases in 200ms).
- **Hover:** 150ms for color and background (Tailwind/shadcn default), 300–400ms for fills, sweeps and label rolls, 500–735ms only for showy shine or bubble effects.
- **Premium/editorial easing** is strong ease-out or expo-in-out: cubic-bezier(0.23,1,0.32,1), M3 standard (0.2,0,0,1), Codrops (0.7,0,0.2,1), Osmo (0.625,0.05,0,1). Never ease-in on entry.
- **Playful easing** is back or overshoot: (0.175,0.885,0.32,1.275) in Ladda and the M3 switch, Josh's hover (0.3,0.7,0.4,1.5), (0.68,-0.55,0.27,2.5), or springs with damping ≤10 or bounce ≥0.4.
- **UI springs:** stiffness 200–300 with damping 20–30, so nothing visibly bounces (tabs, switch, flip).
- **Asymmetry reads as quality:** swap the transform-origin between enter and exit, and make release faster or slower than press on purpose.
- **Loops** (shimmer 3s, rainbow 2s, pulse 1.5s) belong on one hero CTA per view at most. Emil advises removing animation on things users hit many times a day.
- **Scale-from-zero:** avoid scale(0) except for tiny particles or icons; start at 0.9 or higher with opacity.
- **Reduced motion:** gate hover effects with `@media (hover:hover) and (pointer:fine)`. Under `prefers-reduced-motion`, keep the opacity and color fades and drop transforms. Examples: Emil's skill file, Josh's boop returning an empty style, canvas-confetti `disableForReducedMotion`, shadcn.io copy falling back to a fade, the Chrome spotlight using `transition:none`, and Tailwind `motion-reduce:`.
