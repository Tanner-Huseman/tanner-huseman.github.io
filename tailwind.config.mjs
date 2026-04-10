/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        surface: '#14141f',
        'surface-hover': '#1a1a28',
        border: '#252535',
        text: '#e8e8f0',
        muted: '#8888a0',
        accent: '#6c5ce7',
        'accent-dim': 'rgba(108, 92, 231, 0.12)',
        highlight: '#f5a623',
        'highlight-dim': 'rgba(245, 166, 35, 0.10)',
        success: '#00d2a0',
        link: '#4facfe',
      },
      fontFamily: {
        display: ['"Playfair Display"', '"DM Serif Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'Satoshi', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      fontSize: {
        hero: ['clamp(2.5rem, 7vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      spacing: {
        section: '10rem',
      },
      borderRadius: {
        card: '14px',
      },
    },
  },
  plugins: [],
};
