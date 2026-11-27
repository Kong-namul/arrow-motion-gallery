# 가로 스크롤·페이지 넘김·커서 화살표 리서치

> 리서치 에이전트 원문 보고서 (2026-11-26). 모든 항목은 실제 URL 확인. (inferred) = 추정값.

ARROW CATALOG: horizontal scroll, page turning, cursor arrows (31 items, each checked against a real URL)

I could not verify the YouTube chip bar, Google Search chips, Kindle Cloud Reader, Ridi, Google Slides, Google Drive viewer or Medium zoom from first-party sources, so they are left out. Medium zoom has no arrows anyway. Numbers come from source code or docs. Anything marked "(inferred)" is my rebuild.

== A. HORIZONTAL SCROLL CONTAINERS ==

- name: Native CSS scroll buttons + markers (::scroll-button / ::scroll-marker)
  source: Chrome for Developers — https://developer.chrome.com/blog/carousels-with-css ; MDN — https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Overflow/Carousels
  look: The browser generates real <button>s as siblings of the scroller. The icon is the `content` glyph: "⬅"/"⮕" in Chrome's sample, "◄"/"►" in MDN's. MDN styles them with no border or background, font-size 2rem, opacity .7. They are anchor-positioned, centered with `align-self: anchor-center`, and overlap the edge by 45–70px. Markers are 16px circles with a 2px border. The marker group is anchored below the row with a 20px gap.
  states: The buttons disable themselves at the scroll start and end (MDN `:disabled` gives opacity .2 and cursor unset). Hover/focus go to opacity 1. `:active` applies translate 1px 1px. Alt text uses `content:"◄" / "Previous"`. A marker gets `:target-current` when its item is snapped or in view. Markers behave like a tablist for keyboard and screen readers.
  motion: One press scrolls about one "page" (Chrome says 85% of the scrollport). With scroll-snap it moves to the snap target one page away. MDN's marker demo uses `transition: all 0.7s`. Supported in Chrome 135+ only; Firefox and Safari do not have it. Chrome's own carousel guide currently says "Do not use ::scroll-button() or ::scroll-marker for now", so treat this as progressive enhancement.
  fits: Zero-JS arrows for snap rows on Chromium.
  css_hint: `.row{overflow-x:auto;scroll-snap-type:x mandatory;anchor-name:--row;scroll-marker-group:after}`
  `.row::scroll-button(*){position:absolute;position-anchor:--row;align-self:anchor-center;opacity:.7}`
  `.row::scroll-button(left){content:"◄"/"Previous";right:calc(anchor(left) - 45px)}`
  `.row::scroll-button(*):disabled{opacity:.2}`

- name: Arrows/shadows only on the side that can scroll (scroll-state queries)
  source: Chrome — https://developer.chrome.com/blog/css-scroll-state-queries
  look: A shadow or arrow drawn by a pseudo-element or descendant of the scroller.
  states: `@container scroll-state(scrollable: left|right)` is true only when there is content in that direction. Chrome 133+.
  motion: The shadows transition registered @property opacities over .5s ease. The arrow demo moves offscreen with `translate: 0 calc(100% + 10px)` and flips with `rotate:.5turn`, with no transition in the sample (add your own).
  fits: Pure-CSS "show the left arrow only after the user has scrolled".
  css_hint: `.row{container-type:scroll-state size}` `.prev{opacity:0;transition:opacity .5s ease}` `@container scroll-state(scrollable:left){.prev{opacity:1}}` The arrow must sit inside the scroller (e.g. position:sticky) to be able to query it.

- name: Scroll-driven edge fade mask (tab bar)
  source: Chrome modern-web-guidance Tabs — https://developer.chrome.com/docs/modern-web-guidance/guides/ui-components/tabs.md.txt
  look: No button. Content fades out over `--fade-size: 3rem` at each edge that has more content.
  states: With no overflow the timeline is inactive, so there is no fade.
  motion: Tied to scroll position, not time: `animation: reveal-fade-start linear both, hide-fade-end linear both; animation-timeline: scroll(self inline); animation-range: 0 var(--fade-size), calc(100% - var(--fade-size)) 100%`. `--fade-start` and `--fade-end` must be registered with @property as <length>.
  fits: Chip and tab rows. Pairs well with arrows.
  css_hint: `mask: linear-gradient(to right, transparent, #000 var(--fade-start), #000 calc(100% - var(--fade-end)), transparent)` (simplified rebuild; the guide composes it with `linear-gradient(black, black) no-clip subtract`).

- name: Sticky scroll shadows via scroll-timeline
  source: Roman Komarov (kizu) — https://kizu.dev/scroll-driven-animations/
  look: Sticky shadow elements pinned to the edges.
  states: The start shadow fades in over the first `--height` of scroll. The end shadow uses `animation-direction: reverse` over the last stretch.
  motion: `@keyframes to-opaque` (opacity 0→1), `animation-timeline: scroll()`, `animation-range: contain 0px contain var(--height)`. Wrapped in `@supports (animation-timeline: scroll())`.
  fits: Subtle overflow cue next to arrows.
  css_hint: Swap the axis to `scroll(nearest inline)` for horizontal rows (inferred).

- name: Classic background-attachment scroll shadows
  source: CSS-Tricks (Lea Verou / Roman Komarov) — https://css-tricks.com/books/greatest-css-tricks/scroll-shadows/
  look: Radial shadow `rgba(0,0,0,.2)` at the edge. "Cover" gradients slide with the content and hide the shadow at the ends.
  states: A shadow shows only on sides with more content.
  motion: None; it follows scroll position instantly. Works in every browser.
  css_hint: `background-attachment: local, local, scroll, scroll;` Four layers: two cover linear-gradients plus two `radial-gradient(farthest-side at 0 50%, rgba(0,0,0,.2), transparent)`. Sizes such as 40px covers and 14px shadows are inferred.

- name: "Can it scroll?" toggle for arrow visibility
  source: Bramus — https://www.bram.us/2023/09/16/solved-by-css-scroll-driven-animations-detect-if-an-element-can-scroll-or-not/
  look: Indicators that render only if the element overflows.
  states: The animation runs only when there is scrollable overflow, so it sets a space-toggle `--can-scroll`. Using `visibility` instead of `display` avoids layout shift.
  motion: None on the toggle itself; add an opacity fade yourself.
  css_hint: `@keyframes detect-scroll{from,to{--can-scroll: ;}}` `.row{animation:detect-scroll linear;animation-timeline:scroll(self inline)}` `.arrow{--v:var(--can-scroll) visible;visibility:var(--v,hidden)}`

- name: MUI Tabs scrollButtons="auto"
  source: https://mui.com/material-ui/react-tabs/ ; source https://raw.githubusercontent.com/mui/material-ui/master/packages/mui-material/src/Tabs/Tabs.js , …/TabScrollButton/TabScrollButton.js , …/internal/animate.js
  look: A 40px-wide column on each side with a small KeyboardArrowLeft/Right icon at opacity .8. Vertical tabs use 40px height and rotate the icon 90°.
  states: An IntersectionObserver watches the first and last tab (root = scroller, threshold 0.99). When an edge tab is fully visible, that button is disabled and goes to opacity 0. It keeps its 40px slot, so nothing jumps. "auto" renders the buttons only when either side overflows. Below the sm breakpoint (600px) they are `display:none` unless allowScrollButtonsMobile is set.
  motion: Click animates scrollLeft over theme `duration.standard` = 300ms with easeInOutSin `(1+sin(πt−π/2))/2` via rAF. It jumps instantly under reduced motion. The disabled toggle itself is instant.
  fits: App tab bars on desktop.
  css_hint: `.sb{width:40px;flex:none;opacity:.8}` `.sb:disabled{opacity:0}` `@media(max-width:599px){.sb{display:none}}`

- name: Angular Material paginated tab header
  source: https://raw.githubusercontent.com/angular/components/main/src/material/tabs/paginated-tab-header.ts ; …/_tabs-common.scss
  look: A strip at least 32px wide at each end. The chevron is pure CSS: an 8×8px box with `border-width:2px 2px 0 0`, rotated -135° (before) or 45° (after).
  states: Shown when scrollWidth − containerWidth ≥ 5px (the threshold avoids a Safari rounding loop). At an end it is disabled: chevron opacity .4, cursor default, no shadow.
  motion: A click moves 1/3 of the viewport. Press-and-hold auto-repeats after a 650ms delay, then every 100ms. The list moves by translateX with `transition: transform 500ms cubic-bezier(0.35,0,0.25,1)`. Keyboard uses a FocusKeyManager: horizontal arrows, Home/End, wrap.
  fits: Dense admin tab bars.
  css_hint: `.chev{width:8px;height:8px;border:solid currentColor;border-width:2px 2px 0 0;transform:rotate(45deg)}` `.list{transition:transform 500ms cubic-bezier(.35,0,.25,1)}`

- name: Wikimedia Codex Tabs scrollers
  source: https://doc.wikimedia.org/codex/latest/components/demos/tabs.html ; https://raw.githubusercontent.com/wikimedia/design-codex/main/packages/codex/src/components/tabs/Tabs.vue
  look: An absolute, full-height edge button with `background-color: inherit` and the cdxIconPrevious/Next icon. A gradient pseudo-element (@size-150 wide) runs from the background color to transparent into the content.
  states: IntersectionObserver at threshold 0.95 on the first and last tab label. The button is hidden with `v-show` (hidden, not disabled) when that label is visible.
  motion: `scrollBy({left, behavior:'smooth'})`. If the computed distance is under 25% of clientWidth, it advances one more tab. Keyboard ←/→ moves between tabs and swaps in RTL.
  css_hint: `.prev{position:absolute;inset-block:0;left:0;background:inherit}` `.prev::after{content:"";position:absolute;left:100%;width:24px;height:100%;background:linear-gradient(to right,var(--bg),transparent)}` (the 24px is inferred)

- name: Mantine Scroller
  source: https://mantine.dev/core/scroller ; https://alpha.mantine.dev/llms/core-scroller.md
  look: Chevron controls sitting on an edge gradient. `controlSize` (default md) sets the width of both button and gradient. Gradient color is `--scroller-background-color` (body color by default).
  states: A control gets `data-hidden` when it can't scroll that way. `showStartControl`/`showEndControl` force it visible. Drag-to-scroll is on by default (`draggable` true) and sets `data-dragging`.
  motion: Each click scrolls 200px (`scrollAmount`). Easing is not documented.
  css_hint: `.control[data-hidden]{opacity:0;pointer-events:none;transition:opacity .2s}` (inferred)

- name: Wix HorizontalScroll (blur edge + round buttons)
  source: https://dev.wix.com/docs/wix-design-system/components/mechanisms/horizontal-scroll-component.md
  look: Round IconButton arrows (size "tiny", priority "secondary" by default) with a shadow on hover. The edge treatment is either `edgeStyle:"blur"` (progressively blurs content near the edge) or `"color"` (fades into the background), 48px wide by default.
  states: The right arrow disappears at the end. A 1.322 fix made this work under browser zoom and display scaling.
  motion: 150px per press (`scrollDistance`). Scroll events are debounced 20ms.
  fits: Chip and filter rows on any background.
  css_hint: Treat "end" as `scrollWidth-clientWidth-scrollLeft <= 1`. Blur edge: `backdrop-filter:blur(4px); mask:linear-gradient(to left,#000,transparent); width:48px` (inferred)

- name: Gradient-wrapped arrow + drag-to-scroll tabs
  source: CodingNepal — https://www.codingnepalweb.com/draggable-slider-tabs-html-css-javascript/
  look: A 120px full-height wrapper with `linear-gradient(90deg,#fff 70%,transparent)` holding a 55px circular icon. Hover background #efedfb.
  states: The left arrow is `display:none` when scrollLeft ≤ 0. The right one hides when the remaining distance is ≤ 1px.
  motion: Each click scrolls 340px using `scroll-behavior:smooth`. Drag uses `scrollLeft -= e.movementX`. `.dragging` switches to `scroll-behavior:auto`, `cursor:grab`, and sets `pointer-events:none` on the children.
  css_hint: Use the values quoted above.

- name: ScrollHint hand nudge
  source: https://appleple.github.io/scroll-hint/ ; CSS https://raw.githubusercontent.com/appleple/scroll-hint/master/css/scroll-hint.css
  look: A centered 120px box, `rgba(0,0,0,.7)`, radius 5px, with a hand icon and the label "scrollable". An optional 16px edge shadow `rgba(0,0,0,.15)` (suggestiveShadow).
  states: Hides when the user scrolls, or after `remainingTime` ms (default -1, meaning never auto-hide).
  motion: The hand runs `scroll-hint-appear`: translateX(40px) at opacity 0, opacity 1 at 10%, then translateX(-40px) at opacity 0 from 50–100%. It runs 1.2s linear, twice. The arrow appears after a 2.4s delay. Hiding is an opacity fade over .3s.
  fits: Tables and rows on mobile with no visible arrows.
  css_hint: `@keyframes nudge{0%{transform:translateX(40px);opacity:0}10%{opacity:1}50%,100%{transform:translateX(-40px);opacity:0}}` `.hand{animation:nudge 1.2s linear 2}`

- name: Vertical wheel → horizontal pinned track (Codrops-style)
  source: Codrops demo repo — https://github.com/codrops/HorizontalSmoothScrollLayout ; GSAP — https://gsap.com/docs/v3/Plugins/ScrollTrigger/
  look: No arrows. Scrolling down moves a horizontal track. The repo uses Locomotive Scroll; the Codrops article returned 403, so I couldn't read it.
  states: n/a.
  motion: A numeric `scrub` is the seconds the playhead takes to catch up (e.g. 0.5 gives a smooth lag). `containerAnimation` must use a linear ease. Pin and snap are unavailable on containerAnimation triggers.
  fits: Editorial and portfolio pages.
  css_hint: `gsap.to(track,{x:()=>-(track.scrollWidth-innerWidth),ease:"none",scrollTrigger:{pin:true,scrub:.5,end:()=>"+="+track.scrollWidth}})` (inferred pattern)

== B. PAGE TURNING / READERS / VIEWERS ==

- name: Reveal.js chevron controls + bounce tutorial
  source: https://revealjs.com/config/ ; https://raw.githubusercontent.com/hakimel/reveal.js/master/css/reveal.scss
  look: A chevron made of two bars, 2.6em × 0.5em, rotated ±45° inside a 3.6em box. Layout is either a bottom-right cluster (1.4em spacing) or `controlsLayout:'edges'` at ≥500px, which centers arrows vertically at the screen sides.
  states: Enabled = opacity .9. "Fragmented" (more steps left on this slide) = .5. Hover = 1. `controlsBackArrows` can be faded (.3), hidden, or visible.
  motion: The chevron angle narrows on hover (45°→40°) and on press (36°), so it feels like a squeeze. Bars transition `all .15s ease`. The button transitions color, opacity and transform at .2s ease. `controlsTutorial` bounces the arrow to try: `bounce-right 2s 50 both ease-out` (translateX 10px at 20%, -5px at 30%).
  css_hint: `.arr::before{rotate:45deg}` `.arr::after{rotate:-45deg}` `.arr:hover::before{rotate:40deg}` `.arr.highlight{animation:bounce-right 2s 50 both ease-out}`

- name: Apple Books edge arrows
  source: https://support.apple.com/guide/books/read-books-ibks5f526382/mac ; https://support.apple.com/en-asia/guide/iphone/iphc1af7c57/ios ; https://9to5mac.com/2023/03/01/curl-page-turn-effect-apple-books-is-back/
  look: Mac: "Move the pointer to the right or left edge of the book, then click the arrow that appears." iPhone: invisible margin tap zones.
  states: The arrow is hidden until you hover the edge. Trackpad swipe and arrow keys also turn pages.
  motion: Page-turn styles are Curl (default), Slide, and None (iOS 16.4 era). Durations are not published.
  fits: Chrome-less reading surfaces.
  css_hint: `.edge{position:absolute;inset-block:0;width:12%}` `.edge .arr{opacity:0;transition:opacity .2s}` `.edge:hover .arr{opacity:1}` (inferred)

- name: Web e-reader edge zones (Kobo / OverDrive)
  source: https://help.kobo.com/hc/en-us/articles/35996239522967-Kobo-Web-Reader-Navigation-Reading-Features ; https://help.overdrive.com/en-us/0867.html
  look: Kobo shows an arrow when you hover the left or right side, plus a draggable circle scrubber at the bottom. OverDrive uses invisible click/tap edges.
  states: Desktop: hover reveals the arrow. Phone: tap or swipe the edges. Kobo also supports keyboard ←/→.
  motion: Not documented.
  css_hint: Same as Apple Books. Hover-reveal on pointer devices only: `@media (hover:hover)`.

- name: turn.js corner peel
  source: https://raw.githubusercontent.com/blasten/turn.js/master/turn.js ; https://github.com/blasten/turn.js/wiki/Reference
  look: Realistic curl with gradient shading (`gradients:true`) and a double-page spread.
  states: Hovering within `cornerSize: 100`px of a corner shows a folded peek (`corners:'forward'`). Dragging the corner turns the page. The `start` event reports the corner (tl/tr/bl/br).
  motion: The peek folds in over 500ms and unfolds over 800ms on leave. A full turn is `duration: 600`. While dragging, the fold follows the pointer.
  css_hint: `$('#book').turn({duration:600,gradients:true,acceleration:true})`

- name: StPageFlip / react-pageflip
  source: https://nodlik.github.io/StPageFlip/ ; https://raw.githubusercontent.com/Nodlik/StPageFlip/master/README.md
  look: Page flip on canvas or HTML with shadows (`drawShadow:true`, `maxShadowOpacity:1`).
  states: A click anywhere on the book flips. `disableFlipByClick:true` limits it to corners. Swipe needs at least 30px. `mobileScrollSupport` is on.
  motion: `flippingTime: 1000`ms. `flipNext('top'|'bottom')` picks which corner curls. `turnToPage` jumps without animation.
  css_hint: `new PageFlip(el,{flippingTime:700,swipeDistance:30,disableFlipByClick:false})`

- name: pdf.js toolbar Previous/Next
  source: https://raw.githubusercontent.com/mozilla/pdf.js/master/web/viewer.css
  look: Toolbar icon buttons drawn with `mask-image` (toolbarButton-pageUp/pageDown.svg, i.e. up/down because the document scrolls vertically) next to a 40px right-aligned page-number input.
  states: Disabled = opacity .5 with pointer-events none (first/last page). Hover/focus-visible gets `--button-hover-color`.
  motion: None on purpose (`transition-property:none` on the input). Instant and utilitarian.
  css_hint: `#next::before{mask-image:url(pageDown.svg);background:currentColor}` `[disabled]{opacity:.5;pointer-events:none}`

- name: PhotoSwipe v5 side arrows
  source: https://photoswipe.com/styling/ ; https://raw.githubusercontent.com/dimsemenov/PhotoSwipe/master/src/photoswipe.css
  look: A big invisible 75×100px hit area, vertically centered (top 50%, margin-top -50px) and flush to the edge. The 32px icon is inset 14px. "Next" is the prev icon mirrored (`scale(-1,1)`). White icon with a #4f4f4f 2px stroke so it reads on any photo.
  states: Hidden on touch (`.pswp--touch` → visibility hidden) unless a mouse is detected (`.pswp--has_mouse`). Disabled at the ends → display none. Hidden for a single slide.
  motion: UI fades opacity .005↔1 over `--pswp-transition-duration` 333ms, cubic-bezier(0.4,0,0.22,1).
  css_hint: `.arr{position:absolute;top:50%;width:75px;height:100px;margin-top:-50px}` `.arr--next svg{transform:scale(-1,1)}`

- name: GLightbox boxed arrows
  source: https://raw.githubusercontent.com/biati-digital/glightbox/master/src/postcss/glightbox.css
  look: Clean skin: 40×50px boxes at `rgba(0,0,0,.75)`, radius 4px, 30px from the edges. On mid/small screens: top 45%, background `rgba(0,0,0,.32)`, hover .7.
  states: `.disabled` = opacity .1. On closing, the arrows snap to opacity 0.
  motion: Slides use `gslideInRight`/`gslideOutLeft` at .3s ease: translate3d(±60%) plus fade. The slider transform is .4s ease.
  css_hint: `@keyframes in{from{transform:translate3d(60%,0,0);opacity:0}}` `.slide{animation:in .3s ease}`

- name: lightGallery idle-hiding arrows + end bounce
  source: https://unpkg.com/lightgallery@2.7.2/css/lightgallery.css ; https://raw.githubusercontent.com/sachinchoolur/lightGallery/master/src/scss/lightgallery-core.scss ; https://www.lightgalleryjs.com/docs/settings/
  look: A 22px icon-font glyph in a `rgba(0,0,0,.45)` box, padding 8px 10px 9px, radius 2px. Color #999, hover #fff.
  states: `.disabled` = opacity 0 (with `hideControlOnEnd`). When idle (`.lg-hide-items`), prev drifts 10px left and next 10px right while fading. `showBarsAfter` is 10000ms on first open.
  motion: Transform and opacity at .25s cubic-bezier(0,0,.25,1). Slide speed 400ms, ease. At the last image a rubber-band plays: `lg-right-end` left 0 → -30px → 0 over .3s. Swipe threshold 50px.
  css_hint: `.lg-hide-items .next{opacity:0;transform:translate3d(10px,0,0);transition:.25s cubic-bezier(0,0,.25,1)}`

- name: Fancybox v5 floating circle arrows
  source: https://fancyapps.com/carousel/plugins/arrows ; https://fancyapps.com/fancybox/api/options/
  look: A 38px white circle (`--f-arrow-border-radius:50%`), 16px SVG with stroke 2.5, color #475569, double soft shadow, 10px from the edge. Hover #f9f9f9, active #f0f0f0.
  states: Arrows update with page count and infinite mode. `idle` is false by default; set ms to auto-hide the UI.
  motion: ArrowLeft → prev, ArrowRight → next. Content opens with `f-zoomInUp` and closes with `f-fadeOut`.
  css_hint: `--f-arrow-width:38px;--f-arrow-bg:#fff;--f-arrow-shadow:0 6px 12px -2px rgb(50 50 93/25%),0 3px 7px -3px rgb(0 0 0/30%)`

- name: Instagram Stories desktop
  source: https://www.tubefilter.com/2021/01/29/instagram-revamps-user-interface-stories-desktops/ ; https://www.engadget.com/instagram-stories-desktop-redesign-rollout-201800269.html
  look: The current story sits in the center with forward/back arrows. "Two Stories ahead and two behind" show as clickable side previews.
  states: Keyboard keys mirror the arrows. Mobile uses left/right tap zones.
  motion: Not documented. Carousel shift to the neighbor (inferred).
  css_hint: Small circular arrows just outside the card, with previews at about 0.6 scale (inferred).

- name: MUI X DateCalendar month chevrons
  source: https://raw.githubusercontent.com/mui/mui-x/master/packages/x-date-pickers/src/DateCalendar/PickersSlideTransition.tsx ; …/PickersCalendarHeader/PickersCalendarHeader.tsx ; https://mui.com/material-ui/customization/transitions/
  look: Month label and view caret on the left, prev/next chevrons (PickersArrowSwitcher) on the right.
  states: The arrows are disabled by minDate/maxDate/disablePast/disableFuture. In year view the caret rotates 180°.
  motion: The day grid slides: the entering month goes from translate(±100%) to 0 over `duration.complex` = 375ms with cubic-bezier(0.35,0.8,0.4,1). The label crossfades. `reduceAnimations` turns this off.
  css_hint: `.enter-left{transform:translate(100%)}` `.grid>*{transition:transform 375ms cubic-bezier(.35,.8,.4,1)}`

- name: React DayPicker v9 nav
  source: https://daypicker.dev/docs/navigation ; https://unpkg.com/react-day-picker@9.11.1/src/style.css
  look: Nav buttons 2.25rem square. The chevron is filled with the accent color.
  states: Disabled opacity .5 at the startMonth/endMonth limits.
  motion: The `animate` prop slides months with translateX(±100%)↔0 and fades the caption in and out. Timing: `--rdp-animation_duration:.3s` with cubic-bezier(0.4,0,0.2,1). Docs say prefers-reduced-motion can disable it.
  css_hint: `.rdp-root{--rdp-animation_duration:.3s;--rdp-nav_button-disabled-opacity:.5}`

- name: CSS-only step wizard (snap + markers)
  source: https://chrome.dev/carousel/horizontal/wizard/
  look: A three-step form in a snap scroller with "Next Step" anchor links (#step-2) and a "Finish" button.
  states: scroll-state() queries make off-screen steps `inert`. Scroll markers act as step indicators.
  motion: Native snap scroll (smooth if enabled).
  css_hint: Pair with `::scroll-button` for back/next on Chromium.

== C. CURSOR-AS-ARROW ==

- name: Half-split native cursor swap
  source: Tuts+ — https://webdesign.tutsplus.com/quick-tip-how-to-manipulate-cursor-appearance-with-css--cms-31825t
  look: The OS cursor is replaced by a 32×32 SVG arrow with hotspot at 16 16.
  states: `xPos = e.pageX - img.offsetLeft`. Past half the width adds `.cursor-next`, otherwise `.cursor-prev`.
  motion: Instant swap. Native cursors can't animate.
  css_hint: `.cursor-next{cursor:url(next.svg) 16 16, auto}`

- name: Follower blob with arrow/"Drag" label (Cuberto)
  source: https://github.com/Cuberto/mouse-follower ; https://unpkg.com/mouse-follower@1.1.2/dist/mouse-follower.min.css
  look: A 48px circle. The icon state scales 1.5 (`setIcon('arrow-left')`). The text state scales 1.7 at opacity .85 (e.g. "Drag"). Over links it shrinks to .15.
  states: `data-cursor-icon` / `data-cursor-text` attributes. hideOnLeave with a 300ms timeout. Hidden = scale 0. Pressed = scale 1.6 over .2s.
  motion: Position follows with GSAP over 0.55s, ease expo.out. Skewing 2 for text and icon (it stretches in the direction of motion). State morph: transform .25s ease-in-out, opacity .1s.
  css_hint: `el.onmousemove=e=>cursor.setIcon(e.offsetX<el.clientWidth/2?'arrow-left':'arrow-right')` `el.onmouseleave=()=>cursor.removeIcon()`

- name: quickTo follower + 180° flip cue
  source: GSAP — https://gsap.com/docs/v3/GSAP/gsap.quickTo()/ ; Squarespace tutorial — https://squarestylist.squarespace.com/squarespace/squarespace-custom-cursor-slideshow-arrows
  look: A 102×102 arrow cursor. The two halves of the slideshow act as 50%-width click zones.
  states: The arrow rotates 180° when crossing from the right half to the left.
  motion: `gsap.quickTo(el,"x",{duration:0.4,ease:"power3"})` (same for y) on mousemove. The rotation timing isn't published; .4s power3 is my suggestion (inferred).
  css_hint: `const xTo=gsap.quickTo(c,"x",{duration:.4,ease:"power3"})` `rot = x<mid ? 180 : 0` → `gsap.to(c,{rotation:rot,duration:.4})`

== PATTERN SUMMARY ==
- Overflow detection: the libraries observe the first and last item with IntersectionObserver (MUI threshold 0.99, Codex 0.95). Angular measures scrollWidth − width ≥ 5px instead. Simple builds use scroll events with a 1px end tolerance to absorb zoom rounding (Wix's bug fix). Pure-CSS options are `::scroll-button` (auto-disabled), `scroll-state(scrollable:…)`, and scroll-timeline masks.
- At the ends, buttons are either hidden (Codex, Mantine, PhotoSwipe, CodingNepal), dimmed-disabled (Angular .4, pdf.js .5, rdp .5, GLightbox .1), or made invisible while keeping their space (MUI opacity 0, so no jump).
- Typical step sizes: 1/3 of the viewport (Angular), 85% / one page (native), or a fixed 150–340px. Press-and-hold repeats every 100ms after 650ms (Angular).
- Keyboard: ←/→ move focus inside tablists (Codex, Angular, with RTL swap). Lightboxes and readers map ArrowLeft/Right to prev/next (Fancybox, Kobo, Apple Books, Instagram).
- Touch vs pointer: arrows are hidden on touch (PhotoSwipe `.pswp--touch`, MUI below 600px). Readers swap hover-reveal arrows for invisible tap/swipe edge zones. Drag-to-scroll should disable smooth scrolling and child pointer-events while dragging.
- Motion: arrow UI uses 150–333ms fades/translates. Content moves at 300–600ms (page curl up to 1000ms). End-of-list feedback is a 30px rubber-band (lightGallery). Hints are a 2s ease-out bounce (Reveal) or a 1.2s linear hand swipe played twice (ScrollHint).
- Reduced motion: MUI jumps instantly and MUI X/rdp disable their slides. Chrome's guidance is to enable `scroll-behavior:smooth` only inside `@media (prefers-reduced-motion:no-preference)`.
