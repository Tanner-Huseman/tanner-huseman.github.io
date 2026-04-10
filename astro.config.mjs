import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import mdx from '@astrojs/mdx';

export default defineConfig({
  site: 'https://tanner-huseman.github.io',
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
  ],
  output: 'static',
  vite: {
    ssr: {
      // These packages use CJS exports that break Astro's SSR pass
      noExternal: ['three', 'lenis', 'gsap'],
    },
  },
});
