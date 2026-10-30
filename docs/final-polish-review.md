# Final critical review and polish

17 October 2026. This pass reviewed the implemented portfolio afresh, using the six requested perspectives. These are review lenses, not endorsements or a claim of affiliation with the named employers.

## Review findings and changes

| Perspective | Assessment | Targeted correction |
| --- | --- | --- |
| Google SDE recruiter | The role and C/C++/Go identity were clear, but the mobile portrait delayed the strongest engineering evidence. About repeated the hero. | Moved benchmark figures ahead of the mobile portrait, reduced the portrait footprint, tightened About, and removed the redundant language statistic. |
| Amazon SDE recruiter | Outcomes existed, but the current-role result was buried in a long bullet; an older ML percentage lacked a named metric. | Made the exact benchmark a separate result line. Removed the vague 15–20% model-performance claim from the website and kept earlier internships compact. |
| Backend hiring manager | Queue-based work and reliability details were credible but dense. Unit/integration/end-to-end testing was listed as a skill rather than tied clearly to the current job. | Shortened the Bombay bullets and made those testing levels explicit in its summary. Kept correlation, idempotency, retries, validation, stale events, and concurrency safeguards. |
| Systems / infrastructure engineer | The benchmark correctly counted complete cycles, but the hero omitted the approximation mark; gNBSIM needed context for readers outside the domain. | Added `~` to rounded hero throughput and described gNBSIM as a client simulator. Preserved duration, cycle count, synchronized statistics, shutdown safety, and operation-level latency profiling. |
| Senior product designer | Blue/cyan identity, bounded typography, flat sections, and the featured panel worked. Mobile scrolling and narrow tablet cards weakened scanning. | Preserved the design system, made skills wrap without boxes, tightened the hero, widened tablet project cards, and removed repeated impact text and weak-project descriptions. |
| Senior frontend engineer | Architecture, assets, and dependency cleanup were sound. Keyboard disclosure/focus behavior and accessible link naming needed closer checks. The contact API threw on non-text input. | Added section focus targets, menu close-on-focus-exit behavior, 44px navigation controls, accessible names that include visible text, mobile 16px form text, server validation, and four regression tests. |

## Content audit

- **Identity:** Software & Systems Engineer is the primary role in hero, metadata, profile data, and footer. The hero exposes C/C++, Go, asynchronous processing, concurrency, and load testing immediately. Backend/distributed systems remain the central narrative.
- **AI/CV breadth:** Roorkee, DRDO, the fourth skill group, and HarvestWatch retain genuine background. The two weaker ML projects are small secondary links. AI/ML is not the primary role or headline.
- **Telecom context:** Open5GS is an environment/codebase tag and domain exposure. gNBSIM is explained through client simulation and load testing. There is no generic RAN-development claim or telecom-first heading.
- **Current work:** Three short implementation bullets plus an explicit testing summary and a separate measured result make the Bombay experience easier to scan. The general recruiter can understand backend communication, reliability, and load testing without decoding network acronyms.
- **Exact result:** `111,679 complete cycles in 300 seconds (~372.3 cycles/sec)`. The arithmetic is checked: 111679 / 300 = 372.2633…, rounded to 372.3. It is one run, not two independent achievements. No request-throughput, production capacity, hardware, percentile-latency, worker-count, or cross-system comparison is inferred.
- **Other measurements:** The retained 50% calibration-effort and 60% annotation-effort reductions are taken from the supplied/repository facts. The less specific older model-performance percentage was removed. Professional measurements were not independently reproduced during this website task.
- **Projects:** Main order remains systems case study, PDF-IntelliExtract, Financial Transaction Monitoring, HarvestWatch. Financial record quarantine is a distinct implementation outcome; the PDF/mobile impact lines merely repeated their descriptions and were removed. Public repository and demo links remain.
- **Duplication:** Removed the repeated hero/About introductions, repeated C/C++/Go statistic, generic experience tagline, redundant case-study footer, duplicate project impact copy, unused `shortName` fields, and secondary-project descriptions.

## Design and UX audit

No further palette, framework, or layout-system redesign was warranted. The site retains its portrait, two primary CTAs, explicit resume download, GitHub/LinkedIn access, light/dark mode, consistent section rhythm, and one featured case-study panel. There is no glassmorphism or dashboard interaction pattern. Small project tags remain useful scan metadata.

The hero now has two benchmark statistics. Desktop retains the large portrait; mobile places the benchmark before a compact 120px portrait with its caption alongside it. Body copy stays bounded. Tablet projects use two columns instead of three narrow ones. No main CTA is forced to full width.

At 390px viewport width, compared with the first implementation:

| Evidence | Before polish | After polish |
| --- | ---: | ---: |
| Benchmark top position | ~1,029px | ~583px |
| Experience section top | ~2,706px | ~2,122px |
| Hero height | ~1,205px | ~881px |
| Total page height | ~8,717px | ~7,914px |

Both benchmark figures fit in the first 390×844 screen. At 1366×768, both values and supporting duration text are visible; the lower border is just below the fold. This is layout evidence, not a measured recruiter comprehension study or a guarantee of a specific reading time.

## Performance and code audit

- React + Vite + Tailwind and existing reusable section/component boundaries are preserved.
- No loader, typewriter, `heroRoles`, old About scrollbar logic, Iconify collections, Framer Motion, or old large skill categories remain in runtime code.
- No dependency install was necessary in this pass: the dependency tree was already current for the retained version ranges. The new tests use Node's built-in runner.
- Runtime state remains limited to theme, active navigation, mobile menu, and contact data/status. There are no per-scroll layout measurements. Native reveals remain short, nonblocking, and reduced-motion-aware; a new motion abstraction was unnecessary.
- Responsive local WebP sources remain 16,502/40,622 bytes. The source sizes now match the actual 120/260/300/340px portrait widths. The original JPEG fallback remains, with explicit image dimensions and high fetch priority.
- Navigation controls have 44px hit areas. Mobile form text is 16px, avoiding the small-input focus-zoom behavior on iOS.
- Contact field types are checked before trimming, and form length limits are enforced server-side. Malformed fields return HTTP 400 rather than throwing a server error. Honeypot and existing Resend delivery behavior remain.
- Production bundle: approximately **177.57KB JavaScript / 56.27KB gzip** and **22.50KB CSS / 5.60KB gzip**. The first implementation was 178.29KB / 56.45KB JS gzip and 21.75KB / 5.49KB CSS gzip. The small CSS increase adds responsive/focus/hit-area fixes; no runtime dependency was added.
- Runtime audit: zero vulnerabilities. Full audit still has nine development-toolchain findings (six high, three moderate) in the retained Vite 5/Tailwind 3 chains. npm's proposed forced fixes entail major upgrades; those migrations remain outside this polish pass.

## Accessibility and verification

Heading hierarchy, form labels, native link/button semantics, portrait alt text, focus rings, skip link, reduced motion, theme persistence, downloads, and contact success/failure behavior were checked again.

The broader axe scan found two **label-content-name-mismatch** problems missed by the earlier filtered scans. The logo's accessible name now includes its visible mark and name; the footer uses its visible name/role as its accessible name. The earlier rule filter omitted WCAG 2.1 A rules, so the final verification uses all available axe rules rather than repeating that incomplete filter.

Keyboard checks confirm that selecting a mobile anchor focuses its section, tabbing onward from View Work reaches project links, Escape returns focus to the menu control, and tabbing outside navigation closes the disclosure. The menu remains a disclosure rather than an unnecessary modal/focus trap.

Verification artifacts live in `/tmp/pranav-portfolio-polish/`, including the browser verification JSON and full-page light/dark screenshots. Automated checks supplement visual and keyboard review; they do not establish complete WCAG conformance or replace testing on physical devices.

Final results:

- `npm run build`: passes without warnings.
- `npm test`: 4/4 regression tests pass. No real email is sent.
- Ten viewport widths (320–1920px): zero document or element overflow.
- Six full axe scans across mobile/tablet/desktop and light/dark: zero violations.
- Keyboard navigation, focus transfer, menu dismissal, theme persistence, reduced motion, download, legacy anchors, and mocked form success/failure: pass.
- Real local HTTP requests for malformed fields and oversized content return 400; honeypot returns 200 without delivery.
- Browser: zero page errors and unexpected failed responses. Runtime dependency audit: clean.
- Current preview: `http://127.0.0.1:4174/`.

## Manual review remaining

1. **Existing resume PDF:** still has older telecom-oriented wording, the Research Assistant/Research Associate discrepancy, and a phone number. It was preserved for owner review rather than silently rewriting the professional document.
2. **Optional benchmark context:** hardware, exact lifecycle definition, concurrency, and latency values were not supplied. They would strengthen a future technical write-up if suitable for public release. The current portfolio deliberately makes no claims about them.
3. **Production contact delivery:** validation and delivery behavior were tested with mocks, plus real local HTTP checks for invalid and honeypot requests. No email was sent. Existing production environment variables and verified sender remain necessary.

No private code, restricted links, additional professional achievements, push, or deployment was introduced.
