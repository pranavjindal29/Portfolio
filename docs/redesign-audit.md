# Portfolio audit — 17 October 2026

Completed before source edits. Baseline commit: `3f5b406`; working tree was clean.

## Architecture and deployment

- React 18 single-page application, Vite 5, Tailwind 3; five section modules composed in App. No router or framework migration needed.
- `src/data/portfolio.js` already centralizes most content, but section components hardcode additional professional copy and repeat focus statements.
- CSS variables define blue/cyan light and dark themes. Tailwind provides layout and typography. Manrope, Sora, and IBM Plex Mono are self-hosted with font-display swap.
- Shared Navbar, SocialSidebar, SectionHeading, and Reveal are useful reusable boundaries. Project and experience rendering can be extracted into simple reusable components.
- `/api/contact` uses a shared CommonJS Resend handler, exposed through Vite development/preview middleware and a Vercel-compatible function. Server secrets remain server-side. There is no checked-in CI or deployment configuration.

## Preserve

- React + Vite + Tailwind, section composition, central content file, blue/cyan identity, light/dark support, real portrait, resume download, public project/social links, local assets, and contact endpoint/honeypot.
- Real research history and measured Roorkee/DRDO outcomes; present them after systems engineering evidence.

## Positioning and duplication

- AI & ML Engineer appears in profile and SEO. Rotating AI roles and the image/mentorship/AWS hero statistics reinforce that identity.
- The hero explicitly leads with telecom research and 5G/6G. Bombay experience only describes infrastructure support and omits the supplied C/C++/Go implementation work.
- About repeats software/ML/telecom focus in overview tags, focus cards, snapshots, and exploration text. Experience summaries and bullets often repeat each other.
- Nine skill categories include evaluation metrics, overlapping languages/tools, and an oversized telecom taxonomy. C and Go are missing.
- Education includes school records, certificates have large nested cards, leadership has two panels, and contact repeats its invitation across several headings.

## Visual and responsive findings

- 21 outer surface panels plus many nested cards, pill labels, borders, shadows, gradients, and backdrop blurs make the site resemble a dashboard.
- Desktop container overrides expand to almost the full viewport at 1280/1536/1920px instead of keeping a consistent readable width. Fixed portrait widths and numerous breakpoint overrides complicate the hero.
- Skills hide content behind horizontal tabs on mobile and vertical category navigation on desktop, with custom drag-scroll behavior.
- At baseline, 1440px and 390px had no document overflow; page heights were approximately 6492px and 12949px. These are baseline checks, not proof that all intermediate widths work.
- Clickable project articles duplicate nested link actions. Navbar logo suppresses its focus outline. Manual smooth-scroll handlers ignore reduced motion.

## Complexity and performance

- About: 473 lines, multiple state/ref objects, manual scrollbar measurements, global pointer handlers, scroll/resize listeners, and hidden category content. Replace with static columns and four visible skill groups.
- Home: 254 lines, two typing intervals, repeated Framer animations, fixed-size nested portrait/status panels. Replace with immediately readable content and three compact metrics.
- App blocks first interaction for two seconds, hides main content, locks body scrolling, and stores loader state. Remove loader completely.
- App and Navbar separately listen to scrolling; active navigation repeatedly measures every section. Prefer IntersectionObserver and native anchor navigation.
- Framer Motion and offline Iconify collections enter the main bundle. Text skills and Lucide icons make both unnecessary.
- Portrait: 1091×1200 JPEG, about 244KB, with no responsive source set. Other unused public portraits add about 1.6MB to deployment assets.
- Font CSS repeats variable-font faces by weight. Keep local assets, consolidate matching font definitions, preload only the main Latin face.
- Baseline build passes with Vite CJS API deprecation warning: JS 446.30KB / 152.12KB gzip; CSS 50.14KB / 9.69KB gzip.
- Canonical/social URLs are initially empty and only filled client-side; use real production URLs in static HTML.

## Implementation direction

Retain the architecture and reusable section boundaries. Use typography, whitespace, dividers, a restrained portrait treatment, and a single featured systems case study. Make Software & Systems Engineer visible immediately. Use only supplied benchmark facts, without hardware, latency values, or private repository links. Preserve research as secondary breadth. Keep a compact working contact form and direct mail/social links, remove public phone UI/data, and verify responsive behavior, theme, keyboard access, reduced motion, contact states, and production build.

## Content requiring owner review

The existing PDF still describes a telecom-first role, calls the Bombay position Project Research Assistant, and includes a phone number. Preserve this supplied document rather than silently rewriting a resume; the website uses the user's explicitly confirmed Project Research Associate title. A replacement PDF should be provided/reviewed separately. Benchmark hardware, concurrency, latency values, and public source code were not supplied and must not be invented. Contact delivery depends on the existing server environment configuration.
