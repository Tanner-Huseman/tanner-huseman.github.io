# Architecture — tanner-huseman.github.io

## Site Architecture

```
tanner-huseman.github.io/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro          # HTML shell, meta tags, font loading
│   ├── pages/
│   │   ├── index.astro               # Main single-page scrolling experience
│   │   └── projects/
│   │       ├── dbt-platform.astro    # Project detail pages (or MDX)
│   │       ├── ai-agents.astro
│   │       ├── k8s-platform.astro
│   │       ├── serverless-api.astro
│   │       └── how-i-built-this.mdx  # The meta-article
│   ├── components/
│   │   ├── Hero.astro                # Hero section (static, fast)
│   │   ├── StoryTimeline.tsx         # React island — scroll-triggered career timeline
│   │   ├── OrbitingLogos.tsx         # React island — Three.js / R3F orbiting tech logos
│   │   ├── SkillsCarousel.tsx        # React island — horizontal scroll skills section
│   │   ├── ProjectGrid.astro         # Project cards grid (static)
│   │   ├── ProjectCard.astro         # Individual project card
│   │   ├── ArticleList.astro         # Writing/blog section
│   │   ├── Footer.astro              # Connect section
│   │   └── Nav.astro                 # Sticky nav with scroll progress
│   ├── content/
│   │   ├── projects/                 # MDX files for project writeups
│   │   └── articles/                 # MDX files for blog posts
│   ├── styles/
│   │   └── global.css                # Tailwind base + custom CSS variables
│   ├── lib/
│   │   ├── animations.ts             # GSAP ScrollTrigger configurations
│   │   └── three-scene.ts            # Three.js scene setup (if not using R3F)
│   └── assets/
│       ├── images/
│       │   ├── headshot.jpg          # Professional headshot for orbiting scene
│       │   ├── met-opera-*.jpg       # Performance photos
│       │   ├── phantom-*.jpg
│       │   └── project-previews/     # Screenshots/diagrams for project cards
│       └── logos/                    # Tech stack logo SVGs/PNGs for orbit
│           ├── aws.svg
│           ├── dbt.svg
│           ├── kubernetes.svg
│           ├── docker.svg
│           ├── airflow.svg
│           ├── python.svg
│           ├── bigquery.svg
│           ├── snowflake.svg
│           └── sql.svg
├── public/
│   ├── favicon.svg
│   └── og-image.png                  # Social share image
├── .github/
│   └── workflows/
│       └── deploy.yml                # GitHub Actions: build + deploy to GH Pages
├── CLAUDE.md                         # Project context for Claude Code
├── docs/
│   ├── ARCHITECTURE.md               # This file
│   ├── DESIGN_SYSTEM.md              # Design tokens, typography, colors
│   └── PROJECTS.md                   # Detailed project specs
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

## Key Architectural Decisions

### Why Astro (not Next.js, Gatsby, etc.)
- **Zero JS by default**: Pages ship as static HTML with no JavaScript unless a component explicitly opts in. This is critical for Lighthouse 95+ scores
- **React islands**: Interactive components (Three.js scene, scroll animations) are hydrated as isolated React islands — the rest of the page stays static
- **Built-in MDX support**: Project writeups and articles are authored in MDX
- **GitHub Pages friendly**: Static output mode, simple deployment
- **Fast builds**: Significantly faster than Next.js for content-heavy static sites

### Why GSAP for Animations (not Framer Motion, CSS-only, etc.)
- **ScrollTrigger**: The most mature and performant scroll-triggered animation library. Apple.com uses it
- **Pinning**: Native support for pinning sections while content animates (e.g., the horizontal skills scroll)
- **Timeline control**: Complex choreographed animations (staggered reveals, sequenced entrances) are straightforward
- **Performance**: GPU-accelerated transforms, will-change management, 60fps
- **Reduced motion**: Easy to disable all animations via `prefers-reduced-motion` media query

### Why Three.js for 3D Elements (not CSS 3D, Canvas 2D, etc.)
- **The orbiting logos scene** is the visual signature of the site. Three.js gives us real 3D with lighting, depth, and interactivity
- **React Three Fiber (R3F)** is the recommended approach if using React islands — it makes Three.js declarative
- **Performance consideration**: Lazy-load the Three.js scene, use sprite-based or low-poly logos, and simplify to 2D/static on mobile

### Static vs. Dynamic
- The entire site is statically generated at build time
- No server-side rendering, no API routes, no database
- Interactive elements (Three.js, GSAP) run client-side only
- This means: fast load times, free hosting on GitHub Pages, zero infrastructure to manage

## Deployment Pipeline

```
Push to main → GitHub Actions triggers →
  1. npm run build (Astro static build)
  2. Run Lighthouse CI (fail if < 90 performance)
  3. Deploy dist/ to gh-pages branch
  4. GitHub Pages serves from gh-pages
```

## Mobile Strategy

| Desktop | Mobile |
|---------|--------|
| Three.js 3D orbiting logos | Static 2D logo grid or simplified CSS animation |
| Horizontal scroll skills section | Vertical card stack |
| Full parallax effects | Reduced parallax (or none) |
| Text split animations | Simple fade-in |
| Cursor-responsive interactions | Touch-friendly, no hover states |
| Lenis smooth scroll | Native scroll (Lenis can cause issues on some mobile browsers) |

All decisions gated by:
```css
@media (prefers-reduced-motion: reduce) { /* disable all animations */ }
@media (max-width: 768px) { /* mobile simplifications */ }
```
