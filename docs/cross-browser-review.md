# Icon consistency and browser compatibility

30 October 2026. Follow-up to the pre-commit review; no staging, commit, push, or deployment was performed.

## Changes

- Replaced the About section's Unicode arrow with the existing Lucide `ArrowUpRight` SVG. A system symbol font or emoji renderer no longer determines its shape.
- Kept the featured IIT Bombay case study's existing Lucide `Check` SVG and made its stroke and decorative/focus attributes explicit. The tick's 13px size and shape are preserved; About arrows are 16px. Neither marker can shrink in its flex row.
- Wrapped marker text in a separate, shrinkable span for reliable multi-line alignment. All markers remain decorative and hidden from assistive technology; the list text conveys their meaning.
- Replaced `AbortSignal.timeout()` in the contact form with `AbortController` and a cleared 15-second timer. Older browsers that lack the newer static timeout method can still submit. Timeouts preserve the visitor's draft and permit retrying. See [Mozilla's API documentation](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static).
- Added a shared media-query listener helper that prefers `addEventListener` and uses `addListener` only when necessary for older implementations. Both paths remove their listeners. See [Mozilla's compatibility guidance](https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList/addListener).
- Guarded optional intersection/animation and font-loading APIs. Without observers, sections stay visible and hash navigation updates the active link. Initial deep-link scrolling now uses the standard `auto` behavior.
- Retained progressive CSS: ordinary text wrapping and flex project cards remain available when balanced wrapping or subgrid is unsupported. The production CSS includes the WebKit mask prefix for the decorative hero pattern.

No new runtime dependencies, framework changes, or professional-content changes were introduced.

## Verification

- `npm test`: 4/4 server tests pass.
- `npm run build`: passes without warnings; approximately 181.54KB JavaScript / 57.39KB gzip and 28.64KB CSS / 6.86KB gzip.
- Chrome and WebKit: **88 responsive/theme combinations**, covering 22 phone/tablet/laptop/desktop viewports in both themes, passed.
- Checked all three arrows and seven case-study ticks in every configuration. Their SVG geometry, viewBox, explicit dimensions, stroke width, and decorative attributes matched across the two engines. No Unicode arrow remained in the About list.
- **12 full axe scans** reported zero violations; no browser runtime errors or failed static asset responses occurred.
- Navigation, legacy anchors, keyboard activation, resume downloads, themes, HTTP clipboard behavior, and mocked form success/failure passed.
- Additional feature-loss checks passed with legacy-only media-query listeners, absent intersection/animation/font-loading APIs, absent `AbortSignal.timeout`, and simulated CSS without subgrid or balanced wrapping. The contact deadline cancelled slow mocked requests, retained drafts, cleared timers, and allowed successful retrying. No real email was sent.
- `git diff --check`: passes.

## Testing limits

Firefox verification remains **uncompleted**. The available Firefox runner failed with profile initialization errors; an alternate Firefox build encountered macOS sandbox/rendering failures. No Firefox pass or failure of the website itself is inferred from those tool failures.

The portfolio targets modern browsers with progressive fallbacks. This is not a guarantee for every historical browser/OS release, embedded webview, or physical device. SVG fixes the marker geometry and removes system-font/emoji substitution; small rasterization differences, text wrapping, and accessibility color overrides can still vary by browser or device.

Screenshots and executable local verification are under `/tmp/pranav-portfolio-cross-browser/`, including `chromium-arrows.png`, `webkit-checks.png`, `results-chromium,webkit.json`, and the fallback verification script.
