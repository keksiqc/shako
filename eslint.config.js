// eslint.config.js
import { defineConfig } from 'eslint-config-hyoban'

export default defineConfig({
  ignores: ['README.md', '.agents/**'],
  stylistic: true,
  react: true,
  astro: true,
  tailwindcss: {
    settings: {
      entryPoint: 'src/styles/global.css',
    },
  },
})
