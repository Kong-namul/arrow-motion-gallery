# 모션 세트(세트감) 리서치 — 디자인 시스템 모션 토큰

> 리서치 에이전트 원문 보고서 (2026-11-26). 모든 항목은 실제 URL 확인. (inferred) = 추정값.

I pulled values from about 30 pages and assembled 4 motion sets for the button family. Most token values come from source code, because m3.material.io, the Apple HIG pages and easings.net don't render their values when fetched. Every value below comes from a URL I opened. Where I'm proposing something rather than quoting a source, I say so.

## 1. Token values by system

**Material 3: easing and duration** (Compose MotionTokens.kt, https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/MotionTokens.kt; matches MDC-Android, https://raw.githubusercontent.com/material-components/material-components-android/master/docs/theming/Motion.md)
- Emphasized `(0.2,0,0,1)`. That's the CSS stand-in; the true curve is a two-segment path, `M0,0 C0.05,0,0.133,0.06,0.167,0.4 C0.208,0.82,0.25,1,1,1`.
- Emphasized decelerate `(0.05,0.7,0.1,1)`; emphasized accelerate `(0.3,0,0.8,0.15)`.
- Standard `(0.2,0,0,1)`; standard decelerate `(0,0,0,1)`; standard accelerate `(0.3,0,1,1)`.
- Legacy `(0.4,0,0.2,1)`; linear `(0,0,1,1)`.
- Durations: short1–4 = 50/100/150/200ms; medium1–4 = 250/300/350/400; long1–4 = 450/500/550/600; extra-long1–4 = 700/800/900/1000.

**M3 Expressive springs** (damping ratio / stiffness)
- Standard scheme (https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/StandardMotionTokens.kt):
  - Spatial: fast 0.9/1400, default 0.9/700, slow 0.9/300.
  - Effects: fast 1.0/3800, default 1.0/1600, slow 1.0/800.
- Expressive scheme (https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/tokens/ExpressiveMotionTokens.kt):
  - Spatial: fast **0.6/800**, default **0.8/380**, slow 0.8/200.
  - Effects: same as the standard scheme.
- What the two schemes and two spring types are for (https://developer.android.com/reference/kotlin/androidx/compose/material3/MotionScheme):
  - Standard is for "utilitarian UI elements and recurring interactions". Expressive is "recommended… for prominent UI elements and hero interactions".
  - Spatial springs are for anything that changes shape or bounds. Effects springs are for color and alpha, so those never overshoot.
- M3 Expressive buttons change shape when pressed (`ButtonDefaults.pressedShape`, `shapes(shape, pressedShape)`): https://developer.android.com/reference/kotlin/androidx/compose/material3/ButtonDefaults

**M3 state layers**
- Flutter gen_defaults token data v6_1_0: hover **0.08**, focus **0.10**, pressed **0.10**, dragged **0.16** (https://raw.githubusercontent.com/flutter/flutter/master/dev/tools/gen_defaults/data/state.json).
- The older material-web v0_192 file still says focus and pressed are 0.12 (https://raw.githubusercontent.com/material-components/material-web/main/tokens/versions/v0_192/_md-sys-state.scss).
- I could not find ripple timing values; the M3 site didn't render.

**IBM Carbon** (https://carbondesignsystem.com/elements/motion/overview/)
- Productive curves: standard `(0.2,0,0.38,0.9)`, entrance `(0,0,0.38,0.9)`, exit `(0.2,0,1,0.9)`.
- Expressive curves: standard `(0.4,0.14,0.3,1)`, entrance `(0,0,0.3,1)`, exit `(0.4,0.14,1,1)`.
- Durations:
  - fast-01 **70ms** ("button and toggle"), fast-02 110ms (fade).
  - moderate-01 150ms, moderate-02 240ms.
  - slow-01 400ms, slow-02 700ms.
- Carbon says to "Reserve expressive motion for occasional, important moments."

**Microsoft Fluent 2**
- Durations (https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/durations.ts): ultraFast 50, faster 100, fast 150, normal 200, gentle 250, slow 300, slower 400, ultraSlow 500ms.
- Curves (https://raw.githubusercontent.com/microsoft/fluentui/master/packages/tokens/src/global/curves.ts):
  - Decelerate: Max `(0.1,0.9,0.2,1)`, Mid `(0,0,0,1)`, Min `(0.33,0,0.1,1)`.
  - Accelerate: Max `(0.9,0.1,1,0.2)`, Mid `(1,0,1,1)`, Min `(0.8,0,0.78,1)`.
  - EasyEase `(0.33,0,0.67,1)`, EasyEaseMax `(0.8,0,0.2,1)`, linear.
- The Fluent 2 site itself is qualitative: "quick, natural durations", stagger, and a no-motion setting (https://fluent2.microsoft.design/motion).

**Apple**
- Spring presets (SwiftUI `Spring` docs):
  - `smooth(duration: 0.5)`, base bounce **0** (https://developer.apple.com/tutorials/data/documentation/swiftui/spring/smooth(duration:extrabounce:).json).
  - `snappy(duration: 0.5)`, base bounce **0.15** (https://developer.apple.com/tutorials/data/documentation/swiftui/spring/snappy(duration:extrabounce:).json).
  - `bouncy(duration: 0.5)`, base bounce **0.3** (https://developer.apple.com/tutorials/data/documentation/swiftui/spring/bouncy(duration:extrabounce:).json).
  - Duration is a "perceptual duration".
- WWDC23 "Animate with springs" (https://developer.apple.com/videos/play/wwdc2023/10158/):
  - Bounce above about 0.4 "may feel too exaggerated for a UI element".
  - Springs are now SwiftUI's default animation.
  - Conversion: mass 1, stiffness = (2π/duration)².
- HIG (https://developer.apple.com/tutorials/data/design/human-interface-guidelines/motion.json):
  - "Aim for brevity and precision in feedback animations."
  - "Generally avoid adding motion to UI interactions that occur frequently."
  - "Let people cancel motion."
  - There's no numeric spec for button presses. Apple says standard controls already have subtle system animation.

**Atlassian** (https://atlassian.design/foundations/motion)
- Hover and press: **50–150ms**. Anything triggered dozens of times a day: **under 150ms**.
- Enter, exit and move: 150–400ms. Exits are faster than entrances.
- Curves: ease-out bold `(0,0.4,0,1)`, ease-in-out bold `(0.4,0,0,1)`, ease-in practical `(0.6,0,0.8,0.6)` for exits, ease-out practical `(0.4,1,0.6,1)` for popups and hover fades.
- With reduced motion on, motion is "off and instant".

**Shopify Polaris** (https://raw.githubusercontent.com/Shopify/polaris/main/polaris-tokens/src/themes/base/motion.ts)
- Durations: 0, 50, 100 … 500 in 50ms steps.
- `ease` `(0.25,0.1,0.25,1)`: "great default for any user interaction".
- `ease-out` `(0.19,0.91,0.38,1)`; `ease-in` `(0.42,0,1,1)`; `ease-in-out` `(0.42,0,0.58,1)`: "default for… system" transitions.
- Bounce keyframe: scale 1 → 0.85 → 1.05 → 1.

**GitHub Primer** (https://raw.githubusercontent.com/primer/primitives/main/src/tokens/base/motion/easing.json5 and timing.json5)
- Durations: 0, 50, 100, 200 … 1000ms.
- ease `(0.25,0.1,0.25,1)` for hover and micro-interactions.
- easeOut `(0.3,0.8,0.6,1)`, the recommended default for enters.
- easeIn `(0.7,0.1,0.75,0.9)`; easeInOut `(0.6,0,0.2,1)` for things that move or resize.

**Ant Design** (https://ant.design/docs/react/customize-theme)
- Durations: motionDurationFast 0.1s, Mid 0.2s, Slow 0.3s.
- EaseOutCirc `(0.08,0.82,0.17,1)`, EaseOutBack `(0.12,0.4,0.29,1.46)`, EaseOutQuint `(0.23,1,0.32,1)`, EaseInOut `(0.645,0.045,0.355,1)`, EaseOut `(0.215,0.61,0.355,1)`.

**Salesforce Lightning v1 "Kinetics"** (https://v1.lightningdesignsystem.com/kinetics/choreography/making-things-move/)
- Durations: xshort 75, short 150, normal 250, long 400, xlong 600ms.
- ease-out `(0,0.3,0.15,1)`, ease-in-out `(0.3,0,0.15,1)`, over `(0.3,1.75,0.3,1)`.
- "Don't apply easing to light changes". Use ease-out when the user triggers motion and ease-in-out when the system does.

**Adobe Spectrum 2**
- No published motion tokens; motion is "still being developed".
- The page does say a button scales down on press to confirm it registered (https://spectrum.adobe.com/page/motion/).

**Open Props** (https://raw.githubusercontent.com/argyleink/open-props/main/src/props.easing.js)
- ease-out-1…5 = `(0,0,.75,1)` → `(0,0,0,1)`.
- elastic-out-3 `(.5,1.25,.75,1.25)`.
- `--ease-spring-1…5` and `--ease-bounce-1…5` are `linear()` approximations.
- It also defines the classic named curves (quint-out `(.23,1,.32,1)`, expo-out `(.19,1,.22,1)`, circ-out `(.075,.82,.165,1)`). easings.net names these but doesn't print the values.

**Practitioners**
- Emil Kowalski, skill file (https://raw.githubusercontent.com/emilkowalski/skills/main/skills/emil-design-eng/SKILL.md):
  - Strong ease-out `(0.23,1,0.32,1)`; strong ease-in-out `(0.77,0,0.175,1)`; drawer `(0.32,0.72,0,1)`; `ease` for hover and color; never use ease-in.
  - Press feedback 100–160ms; press scale **0.97** (range 0.95–0.98).
  - Tooltips 125–200ms; dropdowns 150–250ms; modals 200–500ms.
  - Enter from scale(0.95) and opacity 0, never scale(0). Example pair: enter 250ms, exit 200ms.
  - Blur 2px during crossfades. Spring with bounce 0.1–0.3, `{type:"spring", duration:0.5, bounce:0.2}`.
  - Reduced motion: keep opacity and color, remove transforms. Gate hover with `(hover:hover) and (pointer:fine)`.
- Emil's articles (https://emilkowal.ski/ui/7-practical-animation-tips, https://emilkowal.ski/ui/you-dont-need-animations): keep UI animation under 300ms; a 180ms dropdown beats a 400ms one; never animate keyboard-initiated actions.
- Rauno (https://rauno.me/craft/interaction-design): no numbers. High-frequency motion becomes a burden; you can often skip animating mouse and keyboard interactions; make motion interruptible.
- Josh Comeau (https://www.joshwcomeau.com/animation/a-friendly-introduction-to-spring-physics/): uses springs for movement, not color or opacity; most of his springs aren't bouncy.
- Motion (framer-motion) (https://motion.dev/docs/react-transitions):
  - `bounce` default 0.25; `visualDuration` overrides `duration`.
  - Physics options (stiffness, damping, mass) override duration and bounce.
  - The docs list a stiffness default of "1", which looks like a docs error.
- Val Head (https://noti.st/valhead/OrOO13):
  - "Similar objects should animate similarly"; "Match velocities, not duration".
  - Calm motion uses "opacity, soft blurs, small deltas". Playful motion uses "Bounces, shape morphs".
- Vercel (https://vercel.com/design/guidelines):
  - Never use `transition: all`; animate transform and opacity.
  - Set transform-origin to where the motion starts; animations must be cancelable.
  - Loading: show-delay 150–300ms, minimum visible time 300–500ms, keep the original label.
- Linear: I found no motion values Linear published itself, so it's left out.

## 2. Four motion sets

The nudge distances are my proposals; no source specifies them. Everything else comes from the sources noted.

**SET A — "Crisp" (snappy / productive)**
- **Sources:** Carbon productive; Atlassian's under-150ms rule; Emil's 0.97 press and no-keyboard-animation rule.
- **Duration ladder:** 70 / 110 / 150 / 240ms (Carbon fast-01 → moderate-02).
- **Hover:** 70ms, `(0.2,0,0.38,0.9)`, color and state layer only.
- **Press:** scale **0.97**, 70ms, same curve.
- **Release:** 110ms, same curve.
- **Focus ring:** **0ms**, appears instantly.
- **Loading / success:** 150ms productive standard. Spinner after a 150ms show-delay, visible at least 300ms.
- **Popover enter:** 150ms, entrance curve `(0,0,0.38,0.9)`, scale 0.97 → 1 plus opacity, origin at the trigger.
- **Popover exit:** 110ms, exit curve `(0.2,0,1,0.9)`.
- **Arrow nudge:** **2px**, 70ms out, 110ms back.
- **Feel:** immediate and tool-like, no overshoot.
- **Use for:** dashboards, tables, admin UIs, keyboard-heavy apps, pagination arrows.

**SET B — "Silk" (soft / premium)**
- **Sources:** Emil's strong ease-out (the same curve as Ant EaseOutQuint and Open Props quint-out); Apple `.smooth` (bounce 0); Fluent durations.
- **Duration ladder:** 100 / 150 / 200 / 250 / 300ms (Fluent faster → slow).
- **Hover:** 200ms `ease` (Polaris and Primer default).
- **Press:** scale **0.98**, 150ms, `(0.23,1,0.32,1)`.
- **Release:** 300ms, same curve. Spring version: `.smooth(duration: 0.3)` or Motion `{type:'spring', visualDuration:0.3, bounce:0}`.
- **Focus ring:** 100ms opacity fade; offset 0 → 2px.
- **Loading / success:** 250ms, Fluent decelerateMid `(0,0,0,1)`. Label-to-spinner crossfade with blur(2px).
- **Popover enter:** 200ms, `(0.23,1,0.32,1)`, from scale 0.95 plus opacity, origin at the trigger.
- **Popover exit:** 150ms, same curve, about 0.75× the enter time.
- **Arrow nudge:** **3px**, 200ms strong ease-out.
- **Feel:** fast start, long soft settle, no bounce.
- **Use for:** premium consumer and fintech, settings, product CTAs, carousels.

**SET C — "Spring" (bouncy / playful)**
- **Sources:** M3 Expressive scheme; SwiftUI `.snappy`/`.bouncy`; Apple's ~0.4 bounce ceiling; Emil's 0.1–0.3 bounce range; Val Head's playful traits; Ant EaseOutBack and Open Props `--ease-spring-3` as CSS fallbacks.
- **Duration ladder:** springs instead of fixed times. Effects fast/default for color, spatial fast/default for transforms. CSS fallbacks 100 / 150 / 300 / 400ms.
- **Hover:**
  - Color uses the effects-fast spring (1.0/3800, about 150ms `ease` in CSS).
  - Optional scale 1.02 using the spatial-default spring, only where hover is supported (`hover:hover`).
- **Press:** scale **0.95** with spatial-fast spring (0.6/800). Corners morph on press, following M3 Expressive's `pressedShape`.
- **Release:** spatial-default spring (0.8/380), which overshoots slightly. Equivalents: Motion `{type:'spring', visualDuration:0.35, bounce:0.3}`; CSS 400ms `(0.12,0.4,0.29,1.46)`.
- **Focus ring:** appears instantly; offset springs 0 → 3px on spatial-fast.
- **Loading / success:** `.bouncy(duration: 0.5)` (bounce 0.3) for a checkmark scaling 0.8 → 1. Color changes use effects-default (1.0/1600).
- **Popover enter:** spatial-default spring from scale **0.9**; opacity on effects-default.
- **Popover exit:** effects-fast, no bounce.
- **Arrow nudge:** **4px** on spatial-fast, with about 1px of overshoot.
- **Feel:** tactile, alive, physical.
- **Use for:** consumer and social apps, onboarding, rewards, kids' products.
- **Don't use for:** dense data UIs. Destructive buttons should use effects springs only, so they don't overshoot (my proposal).

**SET D — "Editorial" (calm)**
- **Sources:** Carbon expressive curves; Val Head's calm traits ("opacity, soft blurs, small deltas"); Emil's note that marketing pages can run longer; Kinetics' ease-in-out for system-triggered motion.
- **Duration ladder:** 150 / 240 / 400 / 700ms (Carbon moderate-01 → slow-02).
- **Hover:** 240ms, `(0.4,0.14,0.3,1)`. Color plus an underline that grows (scaleX 0 → 1).
- **Press:** scale **0.99**, which is close to none. Feedback comes from the 10% state layer. 150ms.
- **Release:** 240ms, expressive standard.
- **Focus ring:** 150ms fade, fixed 2px offset.
- **Loading / success:** 400ms expressive standard, with a blur(2px) crossfade.
- **Popover enter:** 240ms, expressive entrance `(0,0,0.3,1)`. Opacity plus translateY 4px → 0, no scale.
- **Popover exit:** 150ms, `(0.4,0.14,1,1)`.
- **Arrow nudge:** **6px**, 400ms, expressive standard. It's an unhurried "read more →".
- **Feel:** quiet, gradual, no bounce.
- **Use for:** long-form reading, editorial and brand pages, low-frequency CTAs.

## 3. Rules that make each set feel like one family

1. **One easing family per set.** Never mix Carbon productive with expressive, or M3 standard with expressive. M3 calls a motion scheme "harmonious motion for components".
2. **Separate spatial from effects.** Color, opacity and the state layer never overshoot (M3 effects springs at damping 1.0; Comeau; Kinetics "no easing on light"). Only transforms get spatial curves or bounce.
3. **One press scale per set,** applied to every button type, including icon, arrow and toggle: 0.97 / 0.98 / 0.95 / 0.99 (Emil's range 0.95–0.98).
4. **One nudge distance and direction per set,** shared by every arrow, chevron and trailing icon, with the same timing. Val Head: "Similar objects should animate similarly."
5. **One duration ladder per set,** used in a fixed order: hover ≤ press/release < state change ≤ popover enter. Exits run about 0.75× the enter time (Atlassian: exits faster; Emil: 250/200).
6. **Same state-layer opacities in every set and every variant:** hover 8%, focus 10%, press 10%, drag 16% (M3 v6_1_0). Destructive buttons use the same opacities on the error color.
7. **Frequency cap.** Anything clicked dozens of times a day stays under 150ms (Atlassian). Keyboard-triggered changes aren't animated (Emil, Rauno). Hover effects only apply where hover is supported, `(hover:hover) and (pointer:fine)`.
8. **Shared loading contract:** show-delay 150–300ms, minimum visible 300–500ms, keep the label (Vercel).
9. **Same mechanics everywhere:**
   - Animate only transform and opacity, never `transition: all` (Vercel).
   - Popovers scale from their trigger.
   - Enter from scale ≥ 0.9 (Emil).
   - Motion can be interrupted (HIG, Vercel).
10. **One reduced-motion fallback for all 4 sets:**
    - Drop all transforms (scale, nudge, overshoot) and replace springs with 0ms.
    - Keep color and opacity at ≤150ms (Emil). Atlassian goes further and makes it fully instant.
    - Replace the spinning loader with a static "Loading…" label in an ARIA live region (Fluent).

## Caveats

- The M3 web pages and the HIG didn't render when fetched, so the M3 and Apple numbers come from Compose, MDC-Android, Flutter token source and Apple's doc JSON.
- I found no numeric M3 ripple spec, no Spectrum motion tokens, and no Linear motion values.
- Exits follow different camps. Carbon, Atlassian and Kinetics use ease-in exits; Emil says never use ease-in. Sets A and D follow Carbon; set B follows Emil.
