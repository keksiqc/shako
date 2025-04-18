// @ts-check
import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu({
  pnpm: true,
  vue: true,
  formatters: true,
}).append(nuxt())
