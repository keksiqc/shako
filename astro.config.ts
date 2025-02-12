import react from '@astrojs/react'
import tailwind from '@astrojs/tailwind'
import playformCompress from '@playform/compress'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), tailwind(), playformCompress()],
})
