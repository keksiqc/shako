import react from '@astrojs/react'
import compress from '@playform/compress'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'astro/config'

import config from './shako.config'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), compress()],
  redirects: config.page.redirects,
})
