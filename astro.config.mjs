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
      // three.js and lenis are client-only
      noExternal: ['three', 'lenis'],
    },
  },
});
