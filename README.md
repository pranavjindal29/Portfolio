# Pranav Jindal — Software & Systems Engineer

A content-first portfolio for backend, distributed systems, infrastructure, and performance engineering roles. C/C++ and Go work at IIT Bombay leads the narrative; computer vision, edge AI, and research at IIT Roorkee and DRDO provide secondary breadth.

Built with **React 18 + Vite 5 + Tailwind CSS 3**, with self-hosted Manrope, Sora, and IBM Plex Mono, tree-shaken Lucide icons, native section reveals, and persistent light/dark themes.

## Local development

```bash
npm install
npm run dev
```

```bash
npm run build
npm test
npm run preview
```

The production output is `dist/`. The Vite config uses `.mjs` to avoid the deprecated CommonJS Node API. No framework migration is required.

`npm test` checks contact validation, honeypot handling, and mocked email delivery using Node's built-in test runner. It never sends a real email.

## Content and components

`src/data/portfolio.js` is the source of truth for profile, navigation, hero, about, skills, experience, projects, education, certifications, leadership, contact, and social links. The supplied benchmark is defined once and reused; it counts **complete cycles**, not individual requests. No hardware configuration or numeric latency claims are inferred.

```text
src/
  App.jsx                 Theme, active section, page composition
  components/
    Navbar.jsx            Desktop/mobile navigation and resume link
    SocialSidebar.jsx     GitHub, LinkedIn, email, LeetCode
    SectionHeading.jsx    Shared section typography
    Reveal.jsx            Nonblocking, reduced-motion-aware native reveals
    SkillGroup.jsx        Static, visible skill lists
    ExperienceEntry.jsx   Reusable employment entry
    ProjectCard.jsx       Reusable project with explicit links
  data/portfolio.js       Professional content
  sections/               Home, About, Experience, Projects, Contact
  index.css               Theme tokens and responsive design system
api/contact.js            Vercel function entry
server/contact-handler.cjs Shared Resend handler
vite.config.mjs           Vite + local/preview contact middleware
public/                   Fonts, responsive portraits, PDF, social image
```

Native hash links support navigation, sharing, keyboard access, and reduced motion. Legacy `#resume` links scroll to Experience. The readable container is capped at 1120px; mobile uses stacked content, tablet uses compact grids, and desktop adds the social sidebar from 1280px.

## Contact and deployment

The compact form posts to `/api/contact`; direct email and social links remain available. A hidden honeypot is preserved. Both local Vite modes and Vercel reuse the existing handler.

Email buttons in the sidebar and Contact section copy the address and show a green confirmation. HTTPS uses the Clipboard API; plain-HTTP network previews use a text-selection fallback when available. Copy failures show an error instead of a success message.

Create `.env` from `.env.example` for local sending. On Vercel, configure these as **server environment variables**, without `VITE_` prefixes:

```dotenv
RESEND_API_KEY=
CONTACT_FROM_EMAIL="Pranav Portfolio <portfolio@yourdomain.com>"
CONTACT_TO_EMAIL=jindalpranav944@gmail.com
```

Use a sender verified in Resend. The production platform must run the function in `api/contact.js`; deploying only `dist/` to a static-only host will not provide email delivery. No deployment is triggered by the redesign.

SEO metadata, canonical URL, and social-image URLs are present in static `index.html` for `https://pranavjindal.vercel.app/`. Update them if the production domain changes. `public/social-preview.png` is a 1200×630 branded social card. `public/robots.txt` points to the production sitemap.

## Assets and motion

- Local WOFF2 fonts use `font-display: swap`; variable font weights share face definitions. The main Latin body font is preloaded.
- Font copyright notices and SIL Open Font Licenses are included in `public/fonts/licenses/` and refreshed by the asset-vendoring script.
- The hero uses responsive 480px/800px WebP sources with the original JPEG as fallback. The image has explicit dimensions and high fetch priority.
- Skill lists need no external icon service. Framer Motion and Iconify are no longer runtime dependencies.
- Reveals use IntersectionObserver and the Web Animations API. Content is visible before animation, with no loader, typing timers, scroll lock, or persistent will-change layers. Reduced motion disables reveals and smooth scrolling.
- Refresh self-hosted fonts with `node scripts/vendor-web-assets.mjs`.

## Review notes

The latest [pre-commit review](docs/precommit-review.md) records the final checks, fixes, and remaining follow-ups. Earlier reports below describe their respective checkpoints.

The subsequent [cross-browser review](docs/cross-browser-review.md) records the consistent SVG markers, browser feature fallbacks, and verification limits. The portfolio targets modern browsers; unsupported decorative CSS and optional animation features fall back to usable content. An exhaustive guarantee for all historical browser/OS versions is not implied.

The [final critical review](docs/final-polish-review.md) records the six review perspectives and targeted polish. The [pre-edit audit](docs/redesign-audit.md) records the original architecture, strengths, content problems, complexity, performance, and responsive baseline. [Validation notes](docs/redesign-validation.md) describe checks, results, remaining dependency findings, and owner review items.

The resume download uses the latest owner-supplied PDF at `public/Pranav_Jindal_Resume.pdf`; both navigation and hero downloads reference that file through the profile data. To update it, replace the PDF at that path. The website's social/contact UI does not publish a phone number.
