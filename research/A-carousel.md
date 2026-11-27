# 캐러셀·슬라이더 화살표 리서치

> 리서치 에이전트 원문 보고서 (2026-11-26). 모든 항목은 실제 URL 확인. (inferred) = 추정값.

## Carousel/slider arrow catalog (29 items, all checked against real sources)

How I checked: for libraries I downloaded the shipped CSS or source from jsDelivr or GitHub and quoted the values. For product sites I opened the live page in a browser and read the computed styles and stylesheet rules. "(inferred)" marks anything I didn't measure.

**Not verified:**
- **Amazon:** it shows an "Access restricted" page to AI agents, so I stopped there.
- **Logged-in pages:** Netflix (logged-in rows), Spotify, Disney+, Instagram and Pinterest all need a login.
- **Tailwind Plus:** paywalled.
- **Blaze Slider:** its CSS has no arrow styles at all.
- **MUI:** has no carousel component. The closest arrow is TabScrollButton (item 20).

- name: Swiper default
  source: Swiper 11 — https://cdn.jsdelivr.net/npm/swiper@11.2.10/modules/navigation.css
  look: overlay at the vertical middle, 10px from each side; a bare chevron (icon font or SVG); 27×44px (`--swiper-navigation-size: 44px`); color `--swiper-theme-color` #007aff
  states: at the ends (no loop) opacity .35 and pointer-events none; `.swiper-button-hidden` sets opacity 0; `.swiper-button-lock` hides the arrows when there is nothing to scroll; the a11y module adds the labels "Previous slide" / "Next slide"
  motion: no transition, so states swap instantly
  fits: a neutral default that is easy to recolor
  css_hint: `.prev{position:absolute;top:50%;margin-top:-22px;width:27px;height:44px;color:#007aff}.disabled{opacity:.35;pointer-events:none}`

- name: Splide default circle
  source: Splide 4 — https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css
  look: overlay, 1em from each side; 2em circle, background #ccc; 1.2em arrow SVG filled #000 (prev is mirrored with scaleX(-1))
  states: base opacity .7, hover .9, disabled .3; focus-visible gives a 3px solid #0bf outline with 3px offset; in rewind mode the labels change to "Go to first/last slide"
  motion: instant (no transition)
  fits: general-purpose sliders where the arrows should stay quiet
  css_hint: `.arrow{width:2em;height:2em;border-radius:50%;background:#ccc;opacity:.7}.arrow:hover{opacity:.9}.arrow:disabled{opacity:.3}`

- name: Splide Sea-green / Skyblue (ghost icon)
  source: https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/themes/splide-sea-green.min.css (also splide-skyblue.min.css)
  look: 2.5em icon only, no background; fill #20b2aa (skyblue theme: #00bfff); moves outside to -2.5em when wrapped in `.splide__slider`
  states: hover fill #57e1d9 (skyblue: #66d9ff); disabled .3; focus outline is 3px in the theme color
  motion: hover changes the fill over 0.2s linear
  fits: branded, minimal galleries
  css_hint: `.arrow{background:none}.arrow svg{fill:#20b2aa;transition:fill .2s linear}.arrow:hover svg{fill:#57e1d9}`

- name: Slick / react-slick
  source: https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick-theme.css (react-slick's README tells you to import this same file: https://github.com/akiran/react-slick)
  look: outside the slides at ±25px; 20px box; ← → glyphs from the slick icon font, 20px, white
  states: rest opacity .75, hover/focus 1, disabled .25; the focus outline is removed (an a11y gap)
  motion: instant
  fits: legacy jQuery or React sites
  css_hint: `.slick-prev{left:-25px}.slick-prev:before{content:'←';font-size:20px;opacity:.75}`

- name: Flickity circle
  source: https://cdn.jsdelivr.net/npm/flickity@2.3.0/dist/flickity.css
  look: overlay at 10px from each side; 44px circle, background hsla(0,0%,100%,.75); #333 SVG arrow at 60% of the button
  states: hover background goes fully white; active opacity .6; focus ring `box-shadow:0 0 0 5px #19F`; disabled opacity .3 with pointer-events none
  motion: instant
  fits: photo galleries, touch-first
  css_hint: `.btn{width:44px;height:44px;border-radius:50%;background:hsla(0,0%,100%,.75)}.btn:active{opacity:.6}`

- name: Glide.js ghost outline
  source: https://cdn.jsdelivr.net/npm/@glidejs/glide@3.6.0/dist/css/glide.theme.css
  look: overlay at 2em from each side; transparent rectangle, 2px border at rgba(255,255,255,.5), radius 4px, padding 9px 12px; white uppercase text with a soft drop shadow
  states: hover turns the border solid white; disabled opacity .33; the focus outline is removed
  motion: `transition: opacity 150ms ease, border 300ms ease-in-out`
  fits: arrows on top of dark hero images
  css_hint: `border:2px solid rgba(255,255,255,.5);border-radius:4px;box-shadow:0 .25em .5em rgba(0,0,0,.1)`

- name: Owl Carousel pills below the slider
  source: https://cdn.jsdelivr.net/npm/owl.carousel@2.3.4/dist/assets/owl.theme.default.css
  look: under the slider, centered; small pills with 14px ‹ › text (each has a span aria-label "Previous"/"Next"); background #D6D6D6, white text, radius 3px, padding 4px 7px
  states: hover background #869791; disabled opacity .5
  motion: instant
  fits: simple content rows with low visual weight
  css_hint: `.owl-nav{text-align:center;margin-top:10px}.owl-prev{background:#D6D6D6;border-radius:3px;padding:4px 7px}`

- name: Glider.js bare glyph
  source: https://cdn.jsdelivr.net/npm/glider-js@1.7.9/glider.css (demo markup uses « »)
  look: outside at -23px, top 30%; 40px «/» text in #666, no background
  states: hover/focus color #a89cc8 (lavender); disabled opacity .25
  motion: `opacity .5s, color .5s cubic-bezier(.17,.67,.83,.67)`, a slow and soft fade
  fits: editorial or typographic layouts
  css_hint: `font-size:40px;color:#666;transition:color .5s cubic-bezier(.17,.67,.83,.67)`

- name: Keen-slider bold chevron
  source: https://github.com/rcbyr/keen-slider-sandboxes/blob/v6/navigation-controls/arrows-and-dots/javascript/styles.css
  look: overlay at 5px from each side; 30px solid white SVG chevron, no container
  states: disabled swaps the fill to grey
  motion: instant
  fits: full-bleed image sliders
  css_hint: `.arrow{width:30px;height:30px;top:50%;transform:translateY(-50%);fill:#fff}.arrow--disabled{fill:grey}`

- name: Embla outline circle under the viewport
  source: https://github.com/davidjerleke/embla-carousel/blob/master/website/src/content/v9/examples/examples-carousel-styles.ts
  look: a controls grid under the slides (arrows bottom-left, dots right, margin-top 1.8rem); 3.6rem circle (36px on their 62.5% root), transparent with an outline border; icon at 35% of the button
  states: disabled recolors the icon to the high-contrast detail color; the official guide snippet uses `opacity:.3;cursor:not-allowed`
  motion: none
  fits: content carousels that need clean edges with no overlay
  css_hint: `.embla__controls{display:grid;grid-template-columns:auto 1fr;margin-top:1.8rem}.embla__button{width:3.6rem;height:3.6rem;border-radius:50%;box-shadow:inset 0 0 0 .2rem #ccc}`

- name: Swiffy slider variant matrix
  source: https://cdn.jsdelivr.net/npm/swiffy-slider@1.6.0/dist/css/swiffy-slider.css
  look: full-height side zones with a 3rem masked SVG icon. Five icon options: default chevron, arrow, thin chevron, caret, filled caret. `round`/`square` modifiers put a 3rem white plate behind a 2rem dark long arrow. `dark` inverts the colors. `sm` scales to .75. `outside` / `outside-expand` move the arrows outside with a 3.5rem gutter.
  states: hidden (`visibility:hidden`) until the slider is hovered; opacity .8, 1 on arrow hover; `autohide` hides the arrow at the first/last slide; `nav-visible` always shows; `nav-touch` shows on devices without hover
  motion: `transition: visibility .1s, opacity .2s linear`; `filter: drop-shadow(0 0 .5rem rgba(0,0,0,.5))`
  fits: a prototyping kit for comparing variants side by side
  css_hint: `.slider-nav{visibility:hidden;opacity:.8;transition:visibility .1s,opacity .2s linear}.swiffy-slider:hover .slider-nav{visibility:visible}`

- name: Tiny Slider demo buttons
  source: https://github.com/ganlanyuan/tiny-slider/blob/master/demo/css/styles.css
  look: (a) default `.tns-controls`: text buttons above the slider, centered, 2.5em tall, background #66CCFF, radius 3px; (b) custom `.controls li`: 60px-tall image-arrow zones at the edges
  states: disabled background #B3B3B3, text #999, not-allowed cursor; custom zones get a #f2f2f2 background on hover
  motion: `transition: background 0.3s`
  fits: low-fi or utility UIs
  css_hint: `.controls li{height:60px;padding:0 15px;transition:background .3s}.controls li:hover{background:#f2f2f2}`

- name: Bootstrap 5 full-height side zones
  source: https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.css
  look: invisible hit zones covering 15% of the width at each edge, full height; a 2rem white chevron in the middle; `.carousel-dark` turns the icon black with `filter:invert(1) grayscale(100)`
  states: rest opacity .5, hover/focus .9; wraps by default, so the arrows are never disabled; `.visually-hidden` "Previous"/"Next"
  motion: `transition: opacity .15s ease`, turned off under prefers-reduced-motion
  fits: hero banners, where a big hit area matters
  css_hint: `.ctrl{position:absolute;top:0;bottom:0;width:15%;opacity:.5;transition:opacity .15s ease}.ctrl:hover{opacity:.9}`

- name: Webflow slider zones
  source: Webflow base CSS as served on a Webflow site — https://cdn.prod.website-files.com/5beab1239ac88487c3a6608f/css/flowbase-stage.shared.e97707000.min.css
  look: 80px-wide full-height zones (`inset:0;margin:auto`); white 40px icon-font chevron
  states: `:focus{outline:0}` (an a11y gap); no hover style by default
  motion: none
  fits: no-code hero sliders
  css_hint: `.w-slider-arrow-left{position:absolute;inset:0;right:auto;width:80px;color:#fff;font-size:40px}`

- name: Flowbite translucent plate inside a full-height zone
  source: https://github.com/themesberg/flowbite/blob/main/content/components/carousel.md
  look: the button is a transparent full-height zone (px-4) at each edge; inside it sits a 40px plate (rounded-base in the current docs), `bg-white/30` (dark mode `gray-800/30`), holding a 20px chevron with stroke 2
  states: group-hover plate `white/50`; group-focus `ring-4 ring-white`; sr-only "Previous"; flipped in RTL
  motion: instant (no transition class) (inferred)
  fits: Tailwind hero carousels on top of photos
  css_hint: `<span class="w-10 h-10 bg-white/30 group-hover:bg-white/50 group-focus:ring-4 ring-white">`

- name: DaisyUI btn-circle pair
  source: https://github.com/saadeghi/daisyui/blob/master/packages/docs/src/routes/(routes)/components/carousel/+page.md and https://github.com/saadeghi/daisyui/blob/master/packages/daisyui/src/components/button.css
  look: absolute flex row with `justify-between`, 20px in from each side (left-5/right-5), top 50%; two 40px circles with ❮ ❯; they are anchor links to #slideN and wrap around
  states: hover darkens the background by 7%; active nudges `translate:0 .5px` and drops the shadow; focus-visible 2px outline; disabled at 20% text color, transparent
  motion: color, background, border, shadow and transform over 0.2s `cubic-bezier(0,0,.2,1)`
  fits: CSS-only, no-JS carousels
  css_hint: `.btn:active{translate:0 .5px;box-shadow:none}`

- name: shadcn/ui outside outline circle
  source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/carousel.tsx (+ button.tsx)
  look: outside the slides at `-left-12` (48px), centered vertically; 32px rounded-full outline button (border, bg-background, shadow-xs); lucide ArrowLeft, a long arrow at 16px
  states: hover `bg-accent`; disabled (`!canScrollPrev`) gets opacity .5 and pointer-events none; focus-visible ring 3px `ring/50`; sr-only "Previous slide"; the region has `aria-roledescription="carousel"` and handles the ArrowLeft/Right keys
  motion: `transition-all`, Tailwind's default 150ms `cubic-bezier(.4,0,.2,1)`
  fits: app or dashboard UIs
  css_hint: `absolute size-8 rounded-full top-1/2 -left-12 -translate-y-1/2 border shadow-xs`

- name: Ark UI / Zag triggers + Chakra example
  source: https://github.com/chakra-ui/zag/blob/main/packages/machines/carousel/src/carousel.connect.ts and https://github.com/chakra-ui/chakra-ui/blob/main/apps/compositions/src/examples/carousel-basic.tsx
  look: headless. The Chakra example puts a centered control row under the slides, gap 4: [ghost xs IconButton ‹] [dots] [›]; xs size is 32px; Lu chevron 16px
  states: native `disabled` when it can't scroll, unless loop or autoplay is on; `aria-label` "Previous slide"; `aria-controls` points at the item group; `data-orientation`; ghost hover `bg colorPalette.subtle`; focus ring drawn outside
  motion: Chakra button uses `transitionDuration: "moderate"` (about 200ms, inferred from the token)
  fits: design systems that want correct behavior out of the box
  css_hint: `[data-part=prev-trigger]:disabled{opacity:.5}` (inferred)

- name: MUI TabScrollButton strip
  source: https://github.com/mui/material-ui/blob/master/packages/mui-material/src/TabScrollButton/TabScrollButton.js
  look: 40px-wide full-height strips at both ends of scrollable Tabs or chips; keyboard-arrow icon; 40px tall when vertical
  states: opacity .8; disabled sets opacity 0, so the arrow vanishes at the ends but keeps its space
  motion: press ripple (TouchRipple) 550ms easeInOut
  fits: chip, tab or filter bars
  css_hint: `.btn{width:40px;flex-shrink:0;opacity:.8}.btn.Mui-disabled{opacity:0}`

- name: Apple paddlenav, overlay that shows on hover
  source: https://www.apple.com/iphone/ (CSS: https://www.apple.com/v/iphone/home/cl/built/styles/overview.built.css)
  look: 36px circle (other sizes: elevated 56px, super 90px), 18px in from each side; alpha style uses a translucent grey background
  states: hover and active each set a slightly different background tint; disabled opacity .42 with pointer-events none; focus-visible `2px solid #0071e3` with 3px offset; the `with-paddlenav-onhover` variant sits at opacity 0 until the container is hovered (only on hover-capable fine pointers), and focus-visible also reveals it
  motion: `transition: background 100ms linear, color 100ms linear, opacity 100ms linear`
  fits: premium product galleries
  css_hint: `.arrow{width:36px;height:36px;border-radius:36px;background:rgba(210,210,215,.64);transition:all 100ms linear}`

- name: Apple scroll-gallery cluster, bottom-right
  source: https://www.apple.com/iphone/ (same CSS file)
  look: prev and next side by side in a sticky bar under the gallery (gap 18px); 36px alpha circles with a gradient scrim behind them; a centered variant also exists
  states: `aria-label="Previous item, Explore the lineup gallery"`; the bar starts hidden (`visibility:hidden;opacity:0`); disabled .42
  motion: 100ms linear on background/color
  fits: long horizontal shelves with the controls kept out of the content
  css_hint: `.nav ul{display:flex;gap:18px;justify-content:flex-end}`

- name: Netflix slide-in edge panel (logged-out Top 10 row)
  source: https://www.netflix.com/ (redirected to /kr/; computed styles from the live page)
  look: a black full-height panel on the right edge (padding-left 12px, z-index 3) holding a 24×120px tall pill, radius 8px, background rgba(255,255,255,.1), 24px chevron at rgba(255,255,255,.7)
  states: hover/focus-visible background .2 and a white icon; the prev panel only appears after you scroll; the wrapper has `aria-hidden="true"`
  motion: the panel enters with `translateX(100%)` to 0 over 400ms ease-in-out while the button fades opacity 0 to 1 over 400ms (exit reverses); hover changes background/color over 200ms ease-in-out; under reduced motion it fades instead of sliding
  fits: media rows on dark UIs
  css_hint: `.panel{transition:transform .4s ease-in-out}.panel.enter{transform:translateX(100%)}.btn{width:24px;height:120px;border-radius:8px}`

- name: Airbnb section-header pair
  source: https://www.airbnb.co.kr/ (computed)
  look: top-right of each row title, two 28px circles side by side, background #F2F2F2, 12px chevron with stroke 4
  states: disabled opacity .5; the label includes position ("showing 1–5 of 20 items"); focus gets a double ring `0 0 0 2px <inverse>, 0 0 0 4px <primary>`
  motion: hover scales to 1.0714 (28px to 30px), transform 250ms `cubic-bezier(.2,0,0,1)`; the background layer goes to #EBEBEB over 300ms on the same curve
  fits: browse rows with the controls kept off the images
  css_hint: `.btn{width:28px;height:28px;border-radius:50%;background:#f2f2f2;transition:transform .25s cubic-bezier(.2,0,0,1)}.btn:hover{transform:scale(1.07)}`

- name: Airbnb listing-card photo arrows
  source: https://www.airbnb.co.kr/s/Busan/homes (computed)
  look: on top of the card photo; 32px circle, background rgba(255,255,255,.9), 1px border rgba(0,0,0,.08), shadow `0 2px 4px rgba(0,0,0,.18)`, 12px chevron
  states: hidden by `clip-path: inset(100%)` on the wrapper until the card is hovered, so it stays focusable; no prev on the first photo; label "다음 사진: <listing name>" ("Next photo: <listing name>")
  motion: card hover removes the clip and they appear instantly; the button itself has transform 250ms `cubic-bezier(.2,0,0,1)`
  fits: thumbnail carousels inside cards
  css_hint: `.wrap{clip-path:inset(100%)}.card:hover .wrap,.wrap:focus-within{clip-path:none}`

- name: Airbnb floating edge arrow (promo card row)
  source: https://www.airbnb.co.kr/ (computed)
  look: 36px white circle overlapping the row edge; 1px border rgba(0,0,0,.08); shadow `0 8px 24px rgba(0,0,0,.1)`
  states: prev at the start is disabled with opacity 0
  motion: `opacity .15s linear`
  fits: card rows on a white background
  css_hint: `box-shadow:0 8px 24px rgba(0,0,0,.1);transition:opacity .15s linear`

- name: YouTube chip bar with edge fade
  source: https://www.youtube.com/results?search_query=ui+design (computed)
  look: arrow containers are absolute and full height at both ends (z-index 200); 40px transparent circle, icon #0F0F0F; the chips fade out under the arrows with `mask-image: linear-gradient(90deg, transparent 51px, #000 77px)`
  states: the arrow is `display:none` when the row is at the start or end; label "다음" ("Next")
  motion: hover layer fades opacity 0 to 1 and scales .9 to 1 over 300ms `cubic-bezier(.05,0,0,1)`, with fill rgba(0,0,0,.2)
  fits: filter or tag chip rows
  css_hint: `.scroller:not(.at-start){mask-image:linear-gradient(90deg,transparent 51px,#000 77px)}`

- name: Google Play floating action button
  source: https://play.google.com/store/games (computed)
  look: right edge of the shelf; 56px white circle (radius 28px); Material `chevron_right` icon, 24px, #5F6368; elevation shadow `0 1px 2px rgba(60,64,67,.3), 0 1px 3px 1px rgba(60,64,67,.15)`
  states: `display:none` until the row is hovered; only next shows at the start; hover raises the shadow to `0 2px 6px 2px` (.15); label "다음으로 스크롤" ("Scroll next")
  motion: `box-shadow .28s cubic-bezier(.4,0,.2,1), transform .27s cubic-bezier(0,0,.2,1)`
  fits: app or product shelves
  css_hint: `.fab{width:56px;height:56px;border-radius:28px;background:#fff;box-shadow:...;transition:box-shadow .28s cubic-bezier(.4,0,.2,1)}`

- name: App Store web slim tall paddle
  source: https://apps.apple.com/us/iphone/apps (computed)
  look: 6px in from each edge; 28×64px rounded rectangle (radius 6px); thin 8.5×30.5px chevron SVG; background rgb(220,220,220) in light mode, rgb(10,10,10) in dark; the right arrow is the left one mirrored with `scale:-1 1`
  states: hidden at opacity 0 until the shelf is hovered or focused inside; disabled opacity 0; hover/focus-visible and active each shift to a stronger system fill, and active also darkens the icon; pointer-events are off while it scrolls; labels "Previous Page" / "Next Page"
  motion: `background-color .25s linear, color .25s linear, opacity .25s linear`
  fits: dense grid shelves
  css_hint: `.arrow{width:28px;height:64px;border-radius:6px;opacity:0;transition:opacity .25s linear}.shelf:hover .arrow:not(:disabled){opacity:1}`

- name: Nike header-right pair
  source: https://www.nike.com/ (computed)
  look: top-right of each shelf header; 48px circles in #E5E5E5 with a 24px stroked chevron in #111
  states: hover #CACACB; disabled background #F5F5F5 and icon #9E9EA0, and it stays visible; focus ring `0 0 0 2px rgb(39,93,197)`; I saw no aria-label on these buttons (an a11y gap)
  motion: `background-color .25s cubic-bezier(.25,.1,.25,1)` (that curve is `ease`)
  fits: commerce product rails
  css_hint: `.icon{width:48px;height:48px;border-radius:24px;background:#E5E5E5;transition:background-color .25s ease}`

### Common patterns
- **Timing:** most hover and reveal effects run 100–300ms (Apple 100ms linear, Bootstrap and shadcn 150ms, Nike and App Store 250ms, YouTube 300ms). Slide-in panels take about 400ms (Netflix). Ease-out style curves are typical: `cubic-bezier(.2,0,0,1)` (Airbnb), `(0,0,.2,1)` (DaisyUI, Google Play), `(.4,0,.2,1)` (Material and Tailwind). Many libraries (Swiper, Splide, Slick, Flickity, Keen, Owl) have no transition at all.
- **Sizes:** circles cluster at 28–48px, with 36–44px the most common. Floating action buttons go to 56px. Full-height hit zones are 15% wide (Bootstrap) or 80px (Webflow). Thin variants are 24×120 (Netflix) or 28×64 (App Store). Icons are usually 12–24px inside the circle.
- **Placement:** there are four camps. Overlay at the vertical middle (most libraries). Outside the slides (shadcn, Slick, Glider). A pair under the slides or in the header (Embla, Owl, Airbnb, Nike, Apple's gallery). Edge strip or zone (Bootstrap, MUI, YouTube, Netflix).
- **Ends of the list:** either dim the arrow (opacity .25–.5: Swiper .35, Splide .3, Flickity .3, Airbnb header .5, Apple .42) or remove it (opacity 0 or display none: MUI, YouTube, App Store, Google Play, Airbnb). Looping carousels (Bootstrap, DaisyUI, Zag with loop) never disable.
- **Hover reveal:** pointer-only reveal is common (Apple, App Store, Google Play, Airbnb photos, Swiffy). The better versions also reveal on `:focus-within` or focus-visible, or hide with clip-path instead of display none, so the arrows stay reachable by keyboard.
- **Accessibility:** use real `<button>` elements with an aria-label ("Previous slide" or "Next slide"; Airbnb also adds the item count). Use native `disabled` at the ends. Give a visible focus ring (Apple 2px with 3px offset; Airbnb a double ring). Respect prefers-reduced-motion (Bootstrap, Netflix). Common gaps: Slick, Glide and Webflow remove the outline, and Nike has no label.
