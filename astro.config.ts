import react from '@astrojs/react'
import compress from '@playform/compress'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, fontProviders } from 'astro/config'

import config from './shako.config'

// https://astro.build/config
export default defineConfig({
  fonts: [
    {
      name: 'Geist',
      cssVariable: '--font-geist',
      provider: fontProviders.google(),
      weights: ['100 900'],
      styles: ['normal'],
      subsets: [
        'latin',
        'latin-ext',
        'cyrillic',
        'cyrillic-ext',
        'vietnamese',
      ],
      fallbacks: ['system-ui', 'sans-serif'],
    },
    {
      name: 'Geist Mono',
      cssVariable: '--font-geist-mono',
      provider: fontProviders.google(),
      weights: ['100 900'],
      styles: ['normal'],
      subsets: [
        'latin',
        'latin-ext',
        'cyrillic',
        'cyrillic-ext',
        'vietnamese',
        'symbols2',
      ],
      fallbacks: ['monospace'],
    },
  ],
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  integrations: [
    react(),
    compress(),
  ],
  redirects: config.page?.redirects ?? {},
})
