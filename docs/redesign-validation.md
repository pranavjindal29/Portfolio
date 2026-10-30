# Redesign delivery and validation

17 October 2026. Local repository: `/Users/pranav/P_Academics/projects/pranav-portfolio`.

## What changed

The portfolio now leads with **Software & Systems Engineer**, C/C++, Go, backend and distributed workflows, concurrency, performance instrumentation, and load testing. AI/CV remains secondary breadth. Open5GS appears as environment/codebase context, and gNBSIM appears as workload simulation/testing tooling.

- Immediate, static hero with the existing portrait, two primary CTAs, optional GitHub/LinkedIn links, and two measured benchmark statistics.
- Two-column About and four visible skill groups; no category carousel, custom scrollbar, snapshots, or personality cards.
- Experience replaces Resume in navigation. Bombay has three specific implementation bullets and the supplied benchmark. Roorkee and DRDO are concise. Earlier internships receive less visual weight.
- Featured Engineering leads with the Go/gNBSIM case study, followed by PDF-IntelliExtract, Financial Transaction Monitoring, and HarvestWatch. Churn and movie projects remain linked in More Projects.
- Education includes only VIT BTech CSE, 2021–2025, 8.22/10. AWS and Meta certificates are compact; leadership is one line.
- Contact has direct email, LinkedIn, GitHub, and a compact form with the existing endpoint and honeypot. Public phone/GFG UI and phone data are removed.
- Static production canonical, Open Graph/Twitter metadata, branded 1200×630 PNG, robots.txt, and sitemap.

## Files changed

| Area | Files |
| --- | --- |
| Content | `src/data/portfolio.js` |
| Composition | `src/App.jsx` |
| Reused/refined UI | `src/components/Navbar.jsx`, `SocialSidebar.jsx`, `Reveal.jsx`, `SectionHeading.jsx` |
| New reusable UI | `src/components/ExperienceEntry.jsx`, `ProjectCard.jsx`, `SkillGroup.jsx` |
| Sections | `src/sections/Home.jsx`, `About.jsx`, `Projects.jsx`, `Contact.jsx`; new `Experience.jsx` replaces `Resume.jsx` |
| Design system | `src/index.css`; existing `tailwind.config.js` preserved |
| SEO | `index.html`, new `public/robots.txt`, `sitemap.xml`, `social-preview.png` |
| Portrait | New `public/profile-portrait-480.webp`, `profile-portrait-800.webp`; original JPEG retained as fallback |
| Fonts | `public/fonts/google-fonts.css`, removed unused IBM Plex Mono 600 subsets |
| Dependencies | `package.json`, `package-lock.json` |
| Tooling | `vite.config.js` renamed `vite.config.mjs`; `scripts/vendor-web-assets.mjs` now manages fonts only |
| Documentation | `README.md`, `docs/redesign-audit.md`, this file |
| Removed dead code/assets | `LoadingScreen.jsx`, `src/lib/iconify.jsx`, eight unused Iconify JSON files, unused `public/profile.jpg` and `profile1.jpg` |

React, Vite, Tailwind, the existing resume PDF, favicon, real public links, and contact server/function remain. The contact handler now rejects non-text fields and enforces form length limits; verification uses mocked delivery without sending mail.

## UX and design

A 1120px maximum container replaces viewport-wide desktop overrides. Typography, dividers, and whitespace replace the previous glass panels. The featured case study is the primary bordered container; project entries, experience, skills, education, and contact no longer use nested cards. Blue/cyan accents and light/dark modes remain.

The hero is readable without waiting for timers or animations. Desktop portrait width is bounded; mobile shows a compact 120px portrait beside its caption, after the benchmark, and stacks sections. Tablet skill groups use two columns. Navigation uses native anchors, closes the mobile menu after selection/Escape/outside click, and keeps the resume download separate. Direct section links wait for local fonts before scrolling; legacy `#resume` links resolve to Experience.

## Performance evidence

Production build sizes, before → after:

| Asset | Before | After |
| --- | ---: | ---: |
| JavaScript | 446.30 KB | 177.57 KB |
| JavaScript gzip | 152.12 KB | 56.27 KB |
| CSS | 50.14 KB | 22.50 KB |
| CSS gzip | 9.69 KB | 5.60 KB |

JavaScript transfer size falls about 63% when gzipped. This is a bundle comparison, not a measured production load-time guarantee.

- Responsive portrait: 16,502 bytes at 480px, 40,622 bytes at 800px, versus the original 248,199-byte JPEG. Browser selects an appropriate source for viewport/device density.
- Framer Motion and Iconify removed; skill text needs no icon collection registration or network requests.
- Two-second loader, typing timers, scroll locks, per-scroll section measurements, scrollbar pointer handlers, permanent will-change, and repeated backdrop blurs removed.
- Reveals are short native animations with visible content throughout; no delayed or hidden sections.
- Font weights share variable-font definitions; body font is preloaded. Existing language subsets and font-display swap are preserved.
- Unused alternative portraits and icon collections removed from deployment/source.

## Accessibility

One h1, ordered section headings, explicit form labels, portrait alt text, semantic articles/lists, real links for navigation/downloads, and visible keyboard focus. A skip link focuses main content. Project articles no longer impersonate links around nested anchors. Theme and mobile-menu controls have accessible labels/state. The honeypot is hidden from rendering, focus, and accessibility navigation. Form outcomes use a live status region and preserve drafts on failure. Reduced motion disables reveals, hover displacement, and smooth scrolling.

Final automated accessibility checks use all available axe rules, including the previously omitted WCAG 2.1 A label-in-name checks. Automated scans complement the keyboard and visual checks; they do not establish complete WCAG conformance.

## Verification

- `npm install`: completed.
- `npm test`: four contact regression tests pass, including invalid input, length limits, honeypot handling, and mocked delivery.
- `npm run build`: passes without build warnings. The Vite CommonJS warning was resolved by the `.mjs` config; compatible dependency updates also refreshed stale browser data.
- `git diff --check` and asset-vendoring script syntax: pass.
- `npm audit --omit=dev`: zero vulnerabilities.
- Local Chrome/Playwright responsive checks at 320, 360, 390, 640, 768, 820, 1024, 1366, 1440, and 1920px: no document or element overflow. Portrait sources select correctly.
- axe scans at 390, 768, 1440, and 1920px in light mode and 390/1440px in dark mode: zero violations across all available axe rules.
- Mobile menu open/close, Escape and focus return, outside click, native section anchors, top link, persisted theme, keyboard skip link, reduced motion, resume download, and legacy #resume navigation: pass. Active navigation also handles end-of-page Contact and upward navigation without per-scroll listeners.
- Mocked form success: trimmed payload is submitted and fields reset. Mocked failure: draft remains and submit is re-enabled. No real email sent.
- Shared server handler checks: method rejection, malformed JSON, required fields, invalid email, honeypot, missing configuration, mocked Resend success with HTML escaping/reply-to, and mocked rate limiting: pass.
- Browser: zero page errors and zero unexpected failed responses. Assets are self-hosted; no external requests during page loading.
- Final screenshots and machine-readable browser results are available locally in `/tmp/pranav-portfolio-polish/`: `final-1440-light.png`, `final-1440-dark.png`, `final-390-light.png`, `final-390-dark.png`, `final-768-light.png`, `final-1366-light.png`, `final-1920-light.png`, and `verification.json`.
- Preview server: `http://127.0.0.1:4174/`. Verification tooling was kept outside the repository rather than added to runtime dependencies.

## Dependency findings

Compatible updates reduced the full npm audit from 19 findings to 9: 6 high and 3 moderate, all in development dependencies. Remaining chains include Tailwind 3's braces/glob/selector parsing dependencies and Vite 5's esbuild. npm proposes Tailwind 4 and Vite 8 as forced fixes. Those major tooling migrations are outside this content/design change and were not forced. Runtime dependency audit is clean. No claim is made that the entire development dependency tree is clean.

## Assumptions and owner review

- Professional claims use only the supplied brief and repository/resume. Dates, project URLs, education, and existing accurate metrics are preserved.
- 111,679 complete cycles in 300 seconds is one supplied run; ~372.3 cycles/sec is its rounded throughput. It is not represented as request throughput, a production capacity limit, or a cross-hardware comparison.
- No latency numbers, worker counts, hardware specifications, private source links, or private research implementation details are invented or exposed.
- The supplied benchmark is treated as suitable for public summary. Only the high-level facts explicitly supplied in the brief are displayed.
- **Resume PDF needs owner review:** it retains the older telecom framing, the Research Assistant title, and a phone number. The website uses the user-confirmed Project Research Associate. The PDF was preserved rather than silently rewriting a professional document.
- **Email delivery:** form success/failure and server handling are tested with mocks; no real email is sent. Production delivery still depends on the existing Resend/Vercel environment and verified sender.
- **Deployment:** changes are implemented locally. No push or deployment was requested/performed. Static social/canonical URLs intentionally use the provided production domain.

## Hiring/design review

- SDE recruiter: role, C/C++/Go, current institute, work CTA, and benchmark appear in the first screen.
- Backend hiring manager: asynchronous processing, correlation, idempotency, retries, validation, state management, and service communication appear in the current role.
- Systems/infrastructure engineer: concurrent workload execution, synchronized statistics, shutdown safety, load testing, and latency instrumentation are backed by the supplied benchmark without unsupported capacity claims.
- Frontend/product designer: readable bounded layout, consistent typography/spacing, explicit link actions, calm motion, both themes, and responsive layouts replace the dashboard interaction patterns.
- AI/CV and telecom: research remains credible context without defining the primary role. No new achievements or confidential details are added.

The subsequent [critical review and polish pass](final-polish-review.md) records the six review perspectives, additional accessibility findings, content decisions, and mobile before/after evidence.
