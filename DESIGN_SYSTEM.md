# Design System — tanner-huseman.github.io

## Visual Identity

This portfolio belongs to a **former Broadway performer turned data platform engineer**. The design should reflect both worlds: the discipline and drama of live performance, and the precision of systems engineering. It should feel sophisticated, memorable, and distinctly NOT like a generic developer portfolio.

## Color Palette

Dark theme with a distinctive accent. Three options to choose from (finalize during development):

### Option A: Theatrical Purple + Gold (Recommended)
```css
:root {
  --color-bg: #0a0a0f;
  --color-surface: #14141f;
  --color-surface-hover: #1a1a28;
  --color-border: #252535;
  --color-text: #e8e8f0;
  --color-text-muted: #8888a0;
  --color-accent: #6c5ce7;         /* Deep purple — theatrical, distinctive */
  --color-accent-dim: rgba(108, 92, 231, 0.12);
  --color-highlight: #f5a623;       /* Warm gold — stage lighting feel */
  --color-highlight-dim: rgba(245, 166, 35, 0.10);
  --color-success: #00d2a0;
  --color-link: #4facfe;
}
```

### Option B: Emerald + Amber
```css
:root {
  --color-accent: #00d2a0;
  --color-highlight: #f5a623;
}
```

### Option C: Rose + Slate
```css
:root {
  --color-accent: #ff6b9d;
  --color-highlight: #6c5ce7;
}
```

## Typography

### Font Stack
```css
/* Display / Headings — distinctive, with character */
--font-display: 'Playfair Display', 'DM Serif Display', Georgia, serif;

/* Body — clean, readable */
--font-body: 'DM Sans', 'Satoshi', -apple-system, sans-serif;

/* Monospace — code and technical labels */
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale
```css
--text-xs: 0.75rem;    /* 12px — labels, captions */
--text-sm: 0.875rem;   /* 14px — secondary text, tech pills */
--text-base: 1rem;     /* 16px — body text */
--text-lg: 1.125rem;   /* 18px — lead paragraphs */
--text-xl: 1.25rem;    /* 20px — section intros */
--text-2xl: 1.5rem;    /* 24px — card headings */
--text-3xl: 2rem;      /* 32px — section titles */
--text-4xl: 2.5rem;    /* 40px — page titles */
--text-hero: 4rem;     /* 64px — hero headline (responsive, scales down) */
```

### Font Loading
Use `font-display: swap` for all custom fonts. Load via Google Fonts link in `<head>` with `preconnect`:
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=DM+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

## Spacing

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-24: 6rem;     /* 96px */
--space-32: 8rem;     /* 128px */
--space-section: 10rem; /* 160px — between major sections */
```

## Component Patterns

### Tech Stack Pills
```html
<span class="tech-pill">dbt Core</span>
```
```css
.tech-pill {
  font-family: var(--font-mono);
  font-size: var(--text-xs);
  font-weight: 500;
  padding: 3px 10px;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--color-text-muted);
}
```

### Project Cards
- Background: `var(--color-surface)`
- Border: `1px solid var(--border)` → `var(--color-accent)` on hover
- Border-radius: 14px
- Hover effect: subtle scale (1.02), glow shadow, parallax tilt (optional)
- Top accent stripe: 3px gradient bar at top of card (each project gets a unique gradient)

### Section Transitions
- Each major section has generous vertical padding (`var(--space-section)`)
- Sections transition via scroll-triggered fade + slide-up (GSAP)
- No hard visual dividers — the animation creates natural separation

## Photography Treatment

### Performance Photos (Met Opera, Broadway)
- Display large and cinematic — these are visual anchors
- Apply a subtle color grade to match the site palette:
  - Slightly desaturate (saturation: 80-85%)
  - Add a subtle tint matching the accent color
  - Increase contrast slightly for drama
- Use CSS `filter` or pre-process in an image editor
- Lazy-load all photos below the fold
- Serve WebP format with JPEG fallback

### Headshot (for orbiting logos scene)
- Circular crop
- Slightly larger than the orbiting logos
- Centered in the Three.js canvas
- Subtle glow/rim light effect in Three.js to separate from background

## Animation Tokens

```css
/* Durations */
--duration-fast: 0.2s;
--duration-normal: 0.4s;
--duration-slow: 0.8s;
--duration-dramatic: 1.2s;

/* Easing (GSAP equivalents) */
--ease-out: cubic-bezier(0.25, 0.46, 0.45, 0.94);
--ease-in-out: cubic-bezier(0.645, 0.045, 0.355, 1);
--ease-dramatic: cubic-bezier(0.19, 1, 0.22, 1); /* For hero reveals */
```

### GSAP Conventions
- All scroll animations use `ScrollTrigger` with `scrub: true` for scroll-linked movement
- Stagger value: `0.1` for lists, `0.15` for larger elements
- Default `from` state: `{ opacity: 0, y: 40 }`
- Default `to` state: `{ opacity: 1, y: 0 }`
- Pin duration: matched to content height so scroll feels natural

## Accessibility

- Color contrast: minimum 4.5:1 for body text, 3:1 for large text (WCAG AA)
- All images have descriptive `alt` text
- Keyboard navigation works for all interactive elements
- Focus states visible and styled
- Skip-to-content link at top of page
- `prefers-reduced-motion`: all animations disabled, content shown statically
- Semantic HTML: proper heading hierarchy, landmarks, ARIA labels where needed
