# Responsive typography review

24 October 2026. This pass covers the whole portfolio, following the tablet layout adjustments.

## Changes

- Added a shared `reading-copy` class for narrative text and bullet lists, using native CSS text balancing. Headings also balance, while other paragraphs use `text-wrap: pretty` to discourage isolated final words. Browsers without these features retain ordinary text wrapping.
- Increased the hero copy's maximum measure from 50ch to 60ch. Its short second sentence now fits naturally on laptop layouts; narrower columns retain balanced multi-line text.
- Applied the same treatment to About, core areas, experience summaries and bullets, earlier experience, project descriptions and technical highlights, section introductions, education, leadership, and contact copy.
- Tightened the longer About paragraph and featured case-study description. Their meaning, technical details, benchmark, and professional claims remain intact.
- Allowed the mobile portrait column to shrink slightly when necessary so the process labels have enough room on 360–375px screens. The photo retains its natural aspect ratio and its 180px width when space permits.
- Preserved normal word spacing, left alignment, readable type sizes, the existing section backgrounds, project row alignment, and reduced-motion support.

There are no forced line breaks in descriptions, truncated lines, device-specific copies, resize handlers, new libraries, or stretched text justification.

## Validation

| Target | Emulated CSS viewports |
| --- | --- |
| 13–15-inch MacBook layouts and display scaling | 1366×768, 1440×900, 1470×956, 1512×982, 1680×1050, 1710×1107 |
| iPad Air 11-inch | 820×1048 portrait; 1180×688 landscape |
| iPad Air 13-inch | 1024×1234 portrait; 1366×892 landscape |
| iPad Pro 11-inch | 834×1078 portrait; 1210×702 landscape |
| iPad Pro 13-inch | 1032×1244 portrait; 1376×900 landscape |
| Large iPhone / Pro Max layouts | 440×824 portrait; 956×340 landscape |
| Additional phones and boundary widths | 320×568, 375×667, 393×852, 402×742, 430×800, 768×1024, 1100×900, 1920×1080 |

Tablet viewport heights reserve 132 CSS pixels for browser controls. Laptop viewports represent common browser widths and scaling choices rather than a guarantee for every display configuration. Large-iPhone checks include the default 440px portrait width used for the requested Pro Max layout; browser controls and text/zoom settings can change the available viewport. Apple references: [layout guidance](https://developer.apple.com/design/human-interface-guidelines/layout) and [iPhone 18 Pro Max display specifications](https://www.apple.com/iphone-18-pro/specs/).

Results:

- 24 viewport profiles × two themes × WebKit/Chrome: **96 checks passed**.
- No document overflow, clipped content, distorted portrait, repeated benchmark, or browser runtime errors in those checks.
- All tracked multi-line descriptions, experience bullets, and project highlights avoided a final line shorter than 30% of their column width in the tested layouts. Unchanged passages did not gain lines against the recorded baseline.
- Eight full axe scans across laptop, tablet, and phone profiles: **zero reported violations**.
- `npm run build`: passed without warnings. Dependencies were already installed; no package changes were needed.
- `git diff --check`: passed.

These are browser-emulation and visual checks, not tests on physical Apple devices or a guarantee of identical line endings at every zoom level. Text continues to reflow naturally between the tested widths.

Local screenshots and measurement output are in `/tmp/pranav-portfolio-hero-cleanup/`, with `type-final-` screenshot names and `wrapping-after.json`. No contact form was submitted during this pass.
