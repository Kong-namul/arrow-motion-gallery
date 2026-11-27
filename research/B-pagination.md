# 페이지네이션 화살표 리서치

> 리서치 에이전트 원문 보고서 (2026-11-26). 모든 항목은 실제 URL 확인. (inferred) = 추정값.

## Prev/next arrows in pagination: 27 verified items

I checked every item against a real URL: the docs page and, wherever I could, the component's shipped CSS or source (GitHub raw, unpkg). Values I could not confirm are marked "(inferred)".

- name: MUI Pagination (chevrons, circular pages, optional first/last)
  source: MUI — https://mui.com/material-ui/react-pagination/ (CSS: https://github.com/mui/material-ui/blob/master/packages/mui-material/src/PaginationItem/PaginationItem.js)
  look: NavigateBefore/Next chevrons; with showFirstButton/showLastButton, FirstPage/LastPage icons (chevron plus bar). Item is 32px (small 26, large 40) with border-radius 16 (a pill). Margin 0 3px, icon 20px. Variants: text or outlined, shape="rounded".
  states: hover action.hover. Selected uses action.selected, or a filled primary colour. Disabled uses action.disabledOpacity. Focus-visible uses an action.focus background (no ring). Prev/next are disabled at the ends, not hidden. Default labels: "go to previous page", "go to first page".
  motion: hover and select change color + background-color over 250ms (`duration.short`). Easing comes from the theme default, easeInOut cubic-bezier(0.4,0,0.2,1) (inferred).
  fits: general app lists. It is soft and round.
  css_hint: `.item{min-width:32px;height:32px;border-radius:16px;transition:background-color 250ms cubic-bezier(.4,0,.2,1),color 250ms}`

- name: MUI TablePagination (rows per page + range + < >)
  source: MUI — https://mui.com/material-ui/api/table-pagination/
  look: "Rows per page:" select (10/25/50/100), then "1–10 of 100", then chevron icon buttons. First/last buttons are optional.
  states: prev/next disabled at the ends. aria "Go to next page". When count is −1 the label reads "more than N".
  motion: icon-button ripple and hover background, using MUI's 250ms / easeInOut (inferred).
  fits: data-table footers.
  css_hint: footer flex, justify-end; `[select] [1–10 of 100] [‹][›]`, icon buttons 40px.

- name: Angular Material mat-paginator (Material table bar with tooltips)
  source: Angular Components — https://github.com/angular/components/blob/main/src/material/paginator/paginator.html (+ paginator.scss)
  look: bar is 56px tall (shrinks with density: 52/48/40). "Items per page" select 84px wide, range label (margin 0 32px 0 24px), 28px SVG icons. First-page icon is a chevron plus bar (`M18.41 16.59…M6 6h2v12H6z`).
  states: disabled icon is on-surface at 38%. Buttons use `disabledInteractive`, so focus is not lost when they become disabled at the end. A matTooltip sits above each button. Icons rotate 180° in RTL.
  motion: click → ripple. Enter 225ms, exit 150ms, cubic-bezier(0,0,0.2,1) (ripple-renderer.ts).
  fits: dense enterprise tables.
  css_hint: `.icon{width:28px;fill:var(--on-surface-variant)} [aria-disabled] .icon{fill:rgb(0 0 0/.38)}`

- name: Ant Design Pagination (square chevron items; simple "< 1 / 5 >" mode)
  source: Ant Design — https://ant.design/components/pagination (style: https://github.com/ant-design/ant-design/blob/master/components/pagination/style/index.ts)
  look: LeftOutlined/RightOutlined icons. Items 32px (SM 24, LG 40), radius from token.borderRadius, gap 8px (marginXS). Active item: white background, 1px #1677ff border and text, strong weight. Simple mode: prev, input, "/ N", next.
  states: hover colorBgTextHover, active colorBgTextActive. Disabled: colorTextDisabled, not-allowed cursor, transparent on hover. Focus-visible uses genFocusOutline. Prev/next stay visible.
  motion: hover → `transition: all 0.2s` (motionDurationMid). No easing given, so CSS default `ease` (inferred).
  fits: admin dashboards. It is crisp and boxy.
  css_hint: `.item{height:32px;min-width:32px;border-radius:6px;transition:all .2s} .item-active{border:1px solid #1677ff;color:#1677ff}`

- name: Ant Design jump-prev/next (ellipsis morphs into «»)
  source: Ant Design — same style/index.ts; Pagination.tsx uses DoubleLeftOutlined/DoubleRightOutlined
  look: the "•••" ellipsis and a colorPrimary, fontSizeSM double chevron are stacked in the same box (`item-container{position:relative}`). The title tooltip reads "Previous 5 Pages" / "Next 5 Pages" (rc-pagination locale). Clicking jumps 5 pages, or 3 with showLessItems.
  states: hover or focus-visible (`&:has(> :focus-visible)`) swaps icon to opacity 1 and ellipsis to opacity 0. Disabled keeps the ellipsis showing.
  motion: hover → cross-fade, opacity 0↔1 over 0.2s (`all motionDurationMid`), CSS default ease (inferred). Element Plus does the same swap with no transition (see below).
  fits: long page ranges where you want a hidden power-user jump.
  css_hint: `.icon,.ellipsis{position:absolute;inset:0;margin:auto;transition:opacity .2s}.jump:hover .icon{opacity:1}.jump:hover .ellipsis{opacity:0}`

- name: Atlassian Pagination (subtle chevron buttons)
  source: Atlassian — https://atlassian.design/components/pagination/examples (built source: https://unpkg.com/@atlaskit/pagination/dist/es2019/pagination.js)
  look: `@atlaskit/icon/core/chevron-left`/`chevron-right` inside a subtle Button: 32px tall, radius 6px, icon-only padding 0 2px. Default labels 'previous'/'next'/'page'. Pages beyond the limit truncate with "…".
  states: `isDisabled` at index 0 and at the last page, so the buttons stay visible. Selected page uses the button's isSelected style and aria-current. Disabled text #080F214A on a transparent background.
  motion: hover/press → background-color and border-color over 150ms cubic-bezier(0.4,1,0.6,1); box-shadow over 0.15s cubic-bezier(0.47,0.03,0.49,1.38), a slight overshoot.
  fits: Jira/Confluence-style quiet UI.
  css_hint: `button{height:32px;border-radius:6px;transition:background-color 150ms cubic-bezier(.4,1,.6,1)}`

- name: Shopify Polaris Pagination (segmented chevron pair + label; "table" type)
  source: Polaris — https://shopify.dev/docs/apps/build/app-home/migrate-from-polaris-react/pagination (CSS: https://unpkg.com/@shopify/polaris@12.0.0/build/esm/styles.css)
  look: a segmented ButtonGroup of ChevronLeftMinor/ChevronRightMinor icon buttons with an optional label between them. The table type uses 24px square buttons (`--p-space-600`) on bg-surface-secondary.
  states: hover tertiary-hover, active/focus tertiary-active plus an inset shadow. Disabled when `hasPrevious`/`hasNext` is false, with icon-disabled fill. Guidance: "Don't rely on arrow icons alone."
  motion: hover → background over 75ms cubic-bezier(0.19,0.91,0.38,1). Press → content translateY(1px) over 75ms. Disabled → `transition:none`.
  fits: commerce admin, compact "‹ › Page 2" with no number list.
  css_hint: `.btn{transition:background-color 75ms cubic-bezier(.19,.91,.38,1)}.btn:active .content{transform:translateY(1px)}`

- name: GitHub Primer Pagination ("‹ Previous 1 2 … Next ›")
  source: Primer — https://primer.style/product/components/pagination/ (CSS: https://github.com/primer/react/blob/main/packages/react/src/Pagination/Pagination.module.css)
  look: text links with 1em chevrons and a 4px icon gap, in accent blue. Pages are 32px min, radius medium, 4px gap. Current page is filled accent-emphasis with white text. `showPages={narrow:false}` keeps only Prev/Next on mobile.
  states: hover/focus background control-transparent-hover. Disabled ends stay visible in fgColor-disabled with aria-hidden and aria-disabled. Focus-visible: 2px accent outline at −2px offset. Current page adds an inset 3px white ring.
  motion: hover → background-color, 0.2s cubic-bezier(0.3,0,0.5,1) at rest and 0.1s while hovering, so it snaps in quickly and fades out more slowly.
  fits: developer and content lists.
  css_hint: `.page{transition:background-color .2s cubic-bezier(.3,0,.5,1)}.page:hover{transition-duration:.1s}`

- name: IBM Carbon Pagination (table bar, divider-separated caret buttons)
  source: Carbon — https://carbondesignsystem.com/components/pagination/usage/ (SCSS: https://github.com/carbon-design-system/carbon/blob/main/packages/styles/scss/components/pagination/_pagination.scss)
  look: items-per-page select, range text, page select, then square caret buttons. Each button is as wide as the bar is tall (xs 24 / sm 32 / md 40 default / lg 48), separated by `border-inline-start:1px $border-subtle`. On small breakpoints the selects drop but the arrows stay.
  states: hover $layer-hover. Disabled `--no-index` uses $icon-disabled fill and not-allowed cursor. Focus: 2px solid $focus with −2px offset (inset), and the divider is removed.
  motion: hover → background-color and outline over 110ms (duration-fast-02), cubic-bezier(0.2,0,0.38,0.9) (productive standard).
  fits: enterprise data tables.
  css_hint: `.btn{width:40px;height:40px;border-left:1px solid #c6c6c6;transition:background-color 110ms cubic-bezier(.2,0,.38,.9)}`

- name: IBM Carbon Pagination Nav (growing underline indicator)
  source: Carbon — https://github.com/carbon-design-system/carbon/blob/main/packages/styles/scss/components/pagination-nav/_mixins.scss
  look: caret direction buttons ($spacing-09, 48px), page numbers in body-compact-01. The active page gets weight 600 and a 4px-tall underline ($spacing-02), 16px wide ($spacing-05), centred.
  states: hover $background-hover. Disabled is text-secondary at 50% with pointer-events:none. A `loop` option replaces disabling the carets at the ends.
  motion: activate → underline width 0→16px from the centre, 110ms productive standard. Background and colour also move over 110ms. Turned off under prefers-reduced-motion.
  fits: article and gallery nav with a "selected tab" feel.
  css_hint: `.page::after{content:'';position:absolute;bottom:0;left:50%;height:4px;width:0;transition:width 110ms cubic-bezier(.2,0,.38,.9)}.active::after{width:16px;left:calc(50% - 8px)}`

- name: Adobe Spectrum "explicit" (counter variant: ‹ [1] of 89 pages ›)
  source: Spectrum CSS — https://github.com/adobe/spectrum-css/tree/main/components/pagination (index.css + stories/template.js)
  look: quiet ActionButtons with ChevronLeft100/Right100 icons (prev reuses the right icon rotated 180°), a text field, then "of 89 pages" in subdued colour.
  states: action-button hover/focus. RTL flips via `--spectrum-logical-rotation`.
  motion: border-color and box-shadow over 130ms ease-in-out (`--spectrum-animation-duration-100`).
  fits: viewers and long documents, where typing a page beats a number list.
  css_hint: `.prev .icon{transform:rotate(180deg)} .btn{transition:border-color 130ms ease-in-out}`

- name: Adobe Spectrum "listing" (Prev/Next outline pills + quiet numbers)
  source: Spectrum CSS — same template.js
  look: "Prev"/"Next" text in primary outline Buttons (pill), with quiet ActionButton page numbers between.
  states: Spectrum button states (inferred).
  motion: 130ms ease-in-out (inferred from the same token).
  fits: when text buttons need more weight than chevrons.
  css_hint: `.prev,.next{border:2px solid currentColor;border-radius:9999px;padding:0 14px}`

- name: Chakra UI v3 compact ("‹ 1 of 10 ›")
  source: Chakra — https://chakra-ui.com/docs/components/pagination (example: https://github.com/chakra-ui/chakra-ui/blob/main/apps/compositions/src/examples/pagination-compact.tsx)
  look: ghost sm IconButtons (32px) with HiChevronLeft/Right, plus `Pagination.PageText` reading "1 of 10". `format="long"` gives "1 - 5 of 50". Gap 16px. In the basic variant, page items switch from ghost to outline when selected.
  states: disabled uses layerStyle "disabled" (opacity ~0.5, inferred). focusVisibleRing is "outside".
  motion: hover → transitionProperty "common" over 200ms (duration `moderate`). Easing is the default (inferred).
  fits: mobile and card footers.
  css_hint: `button{width:32px;height:32px;transition:background-color 200ms,color 200ms}`

- name: Mantine Pagination (bordered squares, withEdges, responsive)
  source: Mantine — https://mantine.dev/core/pagination/ (CSS: https://github.com/mantinedev/mantine/blob/master/packages/@mantine/core/src/components/Pagination/Pagination.module.css)
  look: 1px gray-4 bordered controls on white, sized xs 22 / sm 26 / md 32 / lg 38 / xl 44 (input sizes 30–60). `withEdges` adds first/last. `layout="responsive"` uses a container query to collapse to "Page X of Y".
  states: hover gray-0. Active is filled primary with white text. Disabled opacity 0.4 with not-allowed cursor.
  motion: the module CSS has no transition, so colour changes are instant. Press → translateY(1px) via `.mantine-active:active`.
  fits: tactile, "physical button" pagination.
  css_hint: `.control{height:32px;min-width:32px;border:1px solid #ced4da}.control:active{transform:translateY(1px)}`

- name: shadcn/ui (Radix Slot + Lucide chevrons, label hides on mobile)
  source: shadcn — https://ui.shadcn.com/docs/components/pagination (source: https://github.com/shadcn-ui/ui/blob/main/apps/v4/registry/new-york-v4/ui/pagination.tsx)
  look: page links are ghost `size-9` (36px). Previous/Next are h-9 with a chevron and the words "Previous"/"Next" (`hidden sm:block`), so they become chevron-only on mobile. The ellipsis is a MoreHorizontal icon with sr-only "More pages".
  states: active page uses the outline variant with aria-current="page". Hover bg-accent. Focus-visible: 3px ring at ring/50. Disabled opacity 50%. aria "Go to previous page".
  motion: `transition-all`. Tailwind default 150ms cubic-bezier(0.4,0,0.2,1) (inferred).
  fits: modern SaaS with Tailwind.
  css_hint: `<a class="inline-flex h-9 gap-1 px-2.5 rounded-md hover:bg-accent transition-all"><ChevronLeft/>…`

- name: Bootstrap 5.3 (joined boxes, « » glyphs)
  source: Bootstrap — https://getbootstrap.com/docs/5.3/components/pagination/
  look: joined `.page-link` cells (−1px overlap, radius only on the outer ends), padding .375rem .75rem. Arrows use the `&laquo;`/`&raquo;` text glyphs with aria-label "Previous"/"Next". Sizes sm and lg.
  states: hover tertiary-bg. Active is primary bg with aria-current. Disabled uses secondary colour and bg; the docs recommend tabindex=-1 or a span. Focus: box-shadow 0 0 0 .25rem at 25% primary, z-index 3.
  motion: color, background-color, border-color and box-shadow over .15s ease-in-out.
  fits: classic web and CMS.
  css_hint: `.page-link{margin-left:-1px;transition:background-color .15s ease-in-out,box-shadow .15s ease-in-out}`

- name: Bulma (prev/next split to the edges, optional pill)
  source: Bulma — https://bulma.io/documentation/components/pagination/ (SCSS: https://github.com/jgthms/bulma/blob/main/sass/components/pagination.scss)
  look: on tablet and up, the list sits left and Previous/Next sit right; `is-centered`/`is-right` reorder this. Min-width is control height. `is-rounded` makes items 9999px pills. Soft two-layer drop shadow.
  states: hover/focus darken lightness by a delta. Active → inset shadow. `is-disabled` uses opacity .5 and no shadow. `is-current` is a link-colour fill.
  motion: background, border, box-shadow and color over 294ms (`$duration`). No timing function set, so CSS default ease (inferred).
  fits: friendly marketing or blog pages.
  css_hint: `.pagination-link{transition-property:background-color,border-color,box-shadow,color;transition-duration:294ms}`

- name: Flowbite (chevron-only, arrow + text, and table "Showing 1 to 10 of 100")
  source: Flowbite — https://github.com/themesberg/flowbite/blob/main/content/components/pagination.md (docs site returned 403)
  look: joined cells w-9/h-9 or h-10, `rounded-s-base`/`rounded-e-base`. Icon variant: 16px stroked chevron `m15 19-7-7 7-7`, stroke 2, with `rtl:rotate-180` and sr-only "Previous". Separate prev/next variant: long arrow with stem `M5 12h14M5 12l4-4` plus text, shadow-xs. Table variant: bold "Showing 1 to 10 of 100 Entries".
  states: hover bg-neutral-tertiary and heading text. Current page uses fg-brand text on a tertiary bg. focus:outline-none.
  motion: no transition classes in the markup, so changes are instant.
  fits: Tailwind dashboards. The long arrow reads well for "← Previous / Next →".
  css_hint: `<svg class="w-4 h-4 rtl:rotate-180" stroke-width="2"><path d="M5 12h14M5 12l4-4m-4 4 4 4"/></svg>`

- name: DaisyUI join (« Page 22 » and two-column Prev/Next)
  source: DaisyUI — https://daisyui.com/components/pagination/ (btn CSS: https://github.com/saadeghi/daisyui/blob/master/packages/daisyui/src/components/button.css)
  look: a `join` of `btn join-item`. Variants include « / "Page 22" / », and a `grid grid-cols-2` row of `btn-outline` "Previous page" / "Next". Sizes btn-xs to btn-xl.
  states: btn-active for the current page, btn-disabled for the ellipsis. Focus-visible: 2px solid outline at offset 2.
  motion: color, background, border, shadow and transform over 0.2s cubic-bezier(0,0,0.2,1). Press → `translate: 0 0.5px` and the shadow flattens.
  fits: playful or themeable UIs.
  css_hint: `.btn{transition:all .2s cubic-bezier(0,0,.2,1)}.btn:active{translate:0 .5px}`

- name: Element Plus (filled "background" squares; «» on hover with no fade)
  source: Element Plus — https://element-plus.org/en-US/component/pagination.html (pager.vue + theme-chalk pagination.scss on GitHub)
  look: ArrowLeft/ArrowRight icons, or `prev-text`/`next-text`. Buttons 32×32 (small 24, large 40), radius 2px, item gap 16px. With `background`, items are filled fill-color squares with margin 0 4px and a primary-filled active item. `layout:"prev, pager, next, jumper, ->, total"`.
  states: hover text turns primary. Disabled uses placeholder colour and not-allowed cursor. Focus-visible: 1px primary outline at −1px offset. The MoreFilled "…" becomes DArrowLeft/DArrowRight on mouseenter or focus. aria "prevPages".
  motion: no transition in pagination.scss, so the ellipsis-to-arrow swap is a hard cut (compare Ant's 0.2s fade).
  fits: Vue admin tools, where it should feel snappy.
  css_hint: `.btn-prev,.el-pager li{min-width:32px;height:32px;border-radius:2px;background:#f0f2f5}.is-active{background:#409eff;color:#fff}`

- name: KRDS (Korea Government Design System), "‹ 이전 … 다음 ›"
  source: KRDS — https://github.com/KRDS-uiux/krds-uiux/blob/main/resources/scss/component/_pagination.scss (markup: html/code/pagination.html)
  look: text-plus-icon pills "이전"/"다음". The `ico_angle` mask icon is rotated 90° for previous and −90° for next. Height token size-height-6 (4rem, so 40px if the root is 62.5%, inferred), radius 6px, gap 8px. Square page links. The current page is bold on an action-secondary-active fill with inverse text and sr-only "현재페이지". The ellipsis is an icon.
  states: hover and pressed backgrounds come from action-secondary tokens. Disabled previous is rendered as a `<span class="disabled">` in disabled colour. A high-contrast mode is included.
  motion: background over .4s ease-in-out (`$transition-base`), which is slow and soft. On mobile the row wraps: page links go full width and Previous/Next sit on their own row, with next's transition set to none.
  fits: Korean public-sector services that follow KRDS.
  css_hint: `.page-navi,.page-link{height:40px;border-radius:6px;transition:.4s ease-in-out}.prev::before{transform:rotate(90deg)}`

- name: Naver Search (circular arrow buttons pinned to the edges)
  source: Naver — https://search.naver.com/search.naver?where=web&query=pagination (CSS: https://ssl.pstatic.net/sstatic/search/pc/css/search1_261007.css)
  look: `btn_prev`/`btn_next` are 34px circles with a 1px #e9e9ec border on white, absolutely pinned left and right. A 12×12 sprite arrow sits inside, and next is the same sprite mirrored with `scaleX(-1)`. Number buttons are 36px tall, padding 0 10px, margin 0 6px, grey #77777a. Current page is Naver green #03aa5a, bold. Hidden "이전" and "페이지" text for screen readers.
  states: hover bg rgba(0,0,0,.05). At the first page prev keeps `aria-disabled="true"` (shown, not hidden) and the icon fades to opacity .2.
  motion: no transition in these rules, so changes are instant (inferred).
  fits: Korean search and list UIs; mirroring one sprite for both arrows is a cheap trick worth copying.
  css_hint: `.btn_prev{width:34px;height:34px;border-radius:50%;border:1px solid #e9e9ec}.btn_next .ico{transform:scaleX(-1)}[aria-disabled=true] .ico{opacity:.2}`

- name: GOV.UK pagination (numbered with arrows, or stacked "block" Previous/Next)
  source: GOV.UK — https://design-system.service.gov.uk/components/pagination/ (SCSS: https://github.com/alphagov/govuk-frontend/blob/main/packages/govuk-frontend/src/govuk/components/pagination/_mixin.scss)
  look: a 15×13 arrow SVG plus underlined "Previous"/"Next" text, with visually hidden " page". Targets are at least 45×45. Block variant: links stacked vertically with a subtitle label such as a page title.
  states: hover bg black tint-95 and a thicker underline. Current page is a link-blue fill with white text. Focus: the standard GOV.UK yellow (inferred) and the icon switches to focus-text colour. Previous is not shown on the first page and Next not on the last. No pagination at all for a single page.
  motion: none, by design.
  fits: accessibility-first public services.
  css_hint: `.govuk-pagination__link{min-width:45px;min-height:45px}.icon{width:15px;height:13px;fill:currentColor}`

- name: USWDS (removed at the ends, arrows hidden on mobile)
  source: USWDS — https://designsystem.digital.gov/components/pagination/ (SCSS: https://github.com/uswds/uswds/blob/develop/packages/usa-pagination/src/styles/_usa-pagination.scss)
  look: navigate_before/navigate_next 18px icons with "Previous"/"Next" labels. Bordered page buttons with a 40px target (`units(5)`), at most 7 slots, and a "…" overflow item.
  states: Previous is hidden on the first page. Current is a filled background with aria-current. Hover changes text and border to the link-hover colour. aria-labels: "Previous page", "Page 1", "Last page, page 24".
  motion: none.
  fits: government forms and search.
  css_hint: `.usa-pagination__arrow{display:none}@media(min-width:640px){.usa-pagination__arrow{display:inherit}}`

- name: PatternFly compact/mobile (summary at top, compact at bottom)
  source: PatternFly — https://www.patternfly.org/components/pagination/design-guidelines
  look: full version has a per-page toggle, first/prev/next/last, and a typed page field "of N". On mobile the top collapses to a non-interactive count and the bottom shows only prev, next and per-page. No first/last on mobile.
  states: bottom bar is sticky and centred on mobile.
  motion: (inferred) plain-button hover only.
  fits: responsive data tables.
  css_hint: mobile `position:sticky;bottom:0;display:flex;justify-content:center`

- name: Apple HIG page control (dots; tap either side = prev/next)
  source: Apple — https://developer.apple.com/design/human-interface-guidelines/page-controls
  look: equidistant small dots with a solid current dot. Edge dots shrink when there are more pages than fit. Background style is automatic, prominent or minimal (a translucent rounded rectangle). About 10 dots at most.
  states: tapping the leading or trailing side of the current dot goes to the previous or next page. Scrubbing (drag) moves through pages in order, and going past an edge jumps to the first or last.
  motion: tap → animated scroll. Apple says to avoid animating transitions during scrubbing and to use the scroll animation only for taps. Durations are system defaults (inferred).
  fits: dot plus arrow hybrids; the "tap side = arrow" idea works without visible arrows.
  css_hint: `.dot{width:8px;height:8px;border-radius:50%;opacity:.3}.dot.current{opacity:1}` (sizes inferred)

- name: Google Search, the "Goooogle" bar with "Next" (desktop) vs "More results" (mobile)
  source: 9to5Google — https://9to5google.com/2024/06/25/google-search-continuous-scroll/ ; MacRumors — https://www.macrumors.com/2024/06/26/google-scraps-continuous-scrolling-search-results/
  look: a logo whose o's stand in for page numbers, with a "Next" link. The bar returned on desktop on 2024-06-25. Mobile earlier used a "More results" button after continuous scroll, and was to drop continuous scroll "in the coming months".
  states: a page number link per "o".
  motion: none; a full page load.
  fits: a branded word-mark pagination; also the reference case for "Load more" versus page arrows.
  css_hint: an inline-flex row of letter glyphs, each "o" an `<a>` with the page number under it.

## Common patterns

- **Disabled or hidden at the ends.** Component libraries keep the arrows and disable them: MUI, Ant, Atlassian, Polaris, Primer, Carbon, Mantine, Bootstrap, Naver (icon opacity .2), Angular (`disabledInteractive`, so focus is kept). Government systems remove them instead: GOV.UK, and USWDS hides Previous on page 1 and hides the arrows on mobile. Carbon Nav can loop instead of disabling.
- **Accessible names.** `aria-label` "Go to previous page" (MUI, shadcn) or "Previous Page" (Primer), `aria-current="page"` on the current page, `nav aria-label="Pagination"`, hidden " page" or "페이지" text, and icons marked aria-hidden. Polaris: "Don't rely on arrow icons alone."
- **Sizes.** 32px is the default almost everywhere (MUI, Ant, Primer, Atlassian, Mantine, Element). shadcn uses 36, Carbon 40 (48 for large), USWDS 40, GOV.UK 45. Those fall short of the 44/48px touch target, so add hit padding on mobile.
- **Motion.** All of these are short colour fades: Polaris 75ms, Carbon 110ms with cubic-bezier(.2,0,.38,.9), Spectrum 130ms ease-in-out, Bootstrap 150ms, Atlassian 150ms with cubic-bezier(.4,1,.6,1), Ant/Chakra/Primer/DaisyUI 200ms, MUI 250ms, Bulma 294ms, KRDS 400ms. Flowbite, Element, GOV.UK, USWDS and Mantine have no transition. For reference, M3 tokens are standard cubic-bezier(0.2,0,0,1) and short4 200ms.
- **Signature details.** Ant's 0.2s cross-fade from ellipsis to «». Carbon's underline growing 0→16px. A 1px (or 0.5px) press-down on click in Polaris, Mantine and DaisyUI. Primer fades in quickly (0.1s) and out more slowly (0.2s).
- **Mobile.** Hide the "Previous"/"Next" words and keep the chevrons (shadcn, Primer), collapse to "1 of 10" or "Page X of Y" (Chakra, Mantine, PatternFly), or drop the arrows and keep the numbers (USWDS).
- **Not found or not checked.** I found no first-party pagination component in Fluent 2, Radix or Headless UI. Tailwind Plus is behind a login, Toss and Kakao had no public pagination docs, and the Material 2 data-table spec page did not render for fetching. Material is represented by MUI and Angular Material instead.
