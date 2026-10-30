# Pre-commit review

30 October 2026. Reviewed the current working tree and production build before the owner's requested commit. Nothing was staged, committed, pushed, or deployed.

## Fixes made

1. **Email copying on network previews:** reproduced the failure on a plain-HTTP LAN origin, where `navigator.clipboard` was unavailable. Added a text-selection fallback shared by both email buttons. It restores focus and selection, removes its temporary field, and shows the green toast only after a successful copy. Failure retains the existing error toast.
2. **Compatible dependency patch:** updated the transitive `postcss-selector-parser` from 6.1.4 to 6.1.5 using npm's non-forced audit fix. No framework or major dependency migration was made.
3. **Resume documentation:** removed the stale README claim that the old resume was still served. The downloaded PDF exactly matches `/Users/pranav/Downloads/Pranav_Jindal.pdf` (SHA-256 `d181b343871b6d3faf48af3ffcd0d5263c149462c22e66a1844fe0c9eff4c776`).
4. **Font notices:** added upstream copyright notices and SIL Open Font Licenses for the three self-hosted font families. The asset-vendoring script now also retrieves those files. Sources: [Manrope](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt), [Sora](https://raw.githubusercontent.com/google/fonts/main/ofl/sora/OFL.txt), [IBM Plex Mono](https://raw.githubusercontent.com/google/fonts/main/ofl/ibmplexmono/OFL.txt). Font binaries and appearance were preserved.

## Verification

| Check | Result |
| --- | --- |
| `npm test` | 4/4 contact-handler tests pass; delivery is mocked |
| `npm run build` | Passes without warnings |
| `git diff --check` | Passes |
| Runtime dependency audit | Zero reported vulnerabilities |
| Responsive browser checks | 88 passes: 22 viewports × two themes × Chrome/WebKit |
| Full axe accessibility scans | 12 scans, zero reported violations |
| Browser errors / failed static asset responses | Zero |
| Resume downloads | Correct filename and byte-for-byte match with the supplied PDF |
| Metadata and assets | Title, social metadata, canonical, social image, fonts, portrait sources, PDF, favicon, robots and sitemap checked |
| Secret handling | `.env` is ignored and untracked; configured Resend API key is absent from the built output |

Viewport coverage includes 320–440px phones, large-phone landscape, iPad Air/Pro 11- and 13-inch portrait/landscape, 1366–1710px laptop layouts, and 1920px desktop. The shorter tablet viewports reserve space for browser controls. There was no detected horizontal overflow, distorted portrait, or footer background discontinuity. Benchmark count and throughput appear once in visible page text, in the case study.

Functional checks covered:

- Skip link, mobile menu ordering and Escape dismissal, hash navigation, legacy `#resume`, theme persistence, reduced motion, and resume downloads.
- Contact required-field validation, in-flight disabled controls, mocked success/reset behavior, and mocked failure with the visitor's draft retained.
- Actual HTTP clipboard fallback in Chrome and WebKit, including keyboard activation. Chrome clipboard read-back matched the email address. Modern Clipboard API handling, permission rejection with fallback, failed-copy messaging, and temporary-field cleanup were also checked.
- Safari/WebKit link navigation used its Option-Tab convention. Focus restoration was verified through keyboard activation of the copy button.
- Real local contact requests for malformed input, wrong field types, unsupported methods, and honeypot submissions returned the expected status codes without attempting email delivery.
- GitHub profile/project links and the PDF project demo returned HTTP 200. LinkedIn and LeetCode returned automated-access blocks (999/403); those links retain the owner's URLs and still need an ordinary browser check if desired.

## Remaining follow-ups

- The complete npm audit retains **two development-tool findings**: one high and one moderate in Vite/esbuild. npm proposes a breaking Vite upgrade; this was not forced into the redesign. Runtime dependencies have no reported findings. A tooling upgrade should receive its own compatibility review.
- No real email was sent. Verify the production Resend environment variables and one real message after deployment; local variables being present does not establish production delivery.
- Checks used browser emulation and supplement visual review; they do not replace testing on physical devices or establish complete WCAG conformance.

Production output: approximately 180.84KB JavaScript (57.19KB gzip) and 28.64KB CSS (6.86KB gzip). There is no blocking loader, new runtime dependency, or resize-measurement logic introduced by this pass.

Browser screenshots, check results, and mocked functional verification are saved locally under `/tmp/pranav-portfolio-precommit-review/`. The production preview is available at `http://127.0.0.1:5174/` while its process remains running.
